import { createMachine, assign } from "xstate";
import { uniqueId } from "xstate/lib/utils";
import { AppProps, MenuItemType, MenuProps, Pos, FolderProps, FooterType } from "../types";
import { desktopApps } from "./desktop-apps";
import { desktopFolders, folderConfig } from "./desktop-folders";
import { desktopFooters } from "./desktop-footers";
export const desktopMachine = createMachine(
  {
    tsTypes: {} as import("./index.typegen").Typegen0,
    predictableActionArguments: true,
    preserveActionOrder: true,
    schema: {
      context: {} as {
        apps: AppProps[];
        currentMovement: Pos;
        contextMenu: MenuProps;
        folders: FolderProps[];
        footers: FooterType[];
      },
      events: {} as
        | { type: "app.focus"; target?: string }
        | { type: "app.singleAppFocus"; target?: string }
        | { type: "app.unfocus"; target: string }
        | { type: "app.unfocusAll" }
        | { type: "app.moving"; tempX: number; tempY: number }
        | { type: "app.placed"; dX: number; dY: number }
        | { type: "contextMenu.setting"; pos: Pos; menus: MenuItemType[] }
        | { type: "contextMenu.clear" }
        | { type: "footer.actived"; target: string; index: number }
        | { type: "folder.open"; target: string }
        | { type: "folder.close"; index: number; order: number }
        | { type: "folder.focus"; order: number },
    },
    id: "desktop",
    initial: "idle",
    context: {
      apps: desktopApps,
      currentMovement: null,
      contextMenu: {
        open: false,
        pos: { x: 0, y: 0 },
        menus: [],
      },
      folders: desktopFolders,
      footers: desktopFooters,
    },
    states: {
      idle: {
        on: {
          "app.focus": {
            target: "idle",
            actions: ["setFocus"],
          },
          "app.singleAppFocus": {
            target: "idle",
            actions: ["setAllAppsUnfocus", "setFocus"],
          },
          "app.unfocus": {
            target: "idle",
            actions: ["setUnfocus"],
          },
          "app.unfocusAll": {
            target: "idle",
            actions: ["setAllAppsUnfocus"],
          },
          "app.moving": {
            target: "idle",
            actions: ["setTempPosition"],
          },
          "app.placed": {
            target: "idle",
            actions: ["setNewPosition"],
          },
          "contextMenu.setting": {
            target: "idle",
            actions: ["setContextMenu"],
          },
          "contextMenu.clear": {
            target: "idle",
            actions: ["clearContextMenu"],
          },
          "footer.actived": {
            target: "idle",
            actions: ["setFooterActive"],
          },
          "folder.open": {
            target: "idle",
            actions: ["setFolderArray"],
          },
          "folder.focus": {
            target: "idle",
            actions: ["setFolderReorder"],
          },
          "folder.close": {
            target: "idle",
            actions: ["setFolderClose"],
          },
        },
      },
    },
  },
  {
    actions: {
      setFocus: assign((context, event) => {
        const { target } = event;

        const targetApp = context.apps
          .filter((app) => app.name === target)
          .map((app) => ({ ...app, isActived: true }));

        const restApps = context.apps.filter((app) => app.name !== target);

        return {
          ...context,
          apps: [...restApps, ...targetApp],
        };
      }),
      setAllAppsUnfocus: assign((context, _) => {
        const unfocusApps = context.apps.map((app) => ({
          ...app,
          isActived: false,
        }));

        return {
          ...context,
          apps: unfocusApps,
        };
      }),
      setUnfocus: assign((context, event) => {
        const { target } = event;

        const unfocusApp = context.apps
          .filter((app) => app.name === target)
          .map((app) => ({
            ...app,
            isActived: false,
          }));

        const restApps = context.apps.filter((app) => app.name !== target);

        return {
          ...context,
          apps: [...restApps, ...unfocusApp],
        };
      }),
      setTempPosition: assign((context, event) => {
        const { tempX, tempY } = event;

        return { ...context, currentMovement: { x: tempX, y: tempY } };
      }),
      setNewPosition: assign((context, event) => {
        const { dX, dY } = event;

        const targetApps = context.apps
          .filter((app) => app.isActived)
          .map((app) => ({
            ...app,
            posX: app.posX + dX,
            posY: app.posY + dY,
          }));

        const restApps = context.apps.filter((app) => !app.isActived);

        return { ...context, apps: [...restApps, ...targetApps] };
      }),
      setContextMenu: assign((context, event) => {
        const { pos, menus } = event;

        return { ...context, contextMenu: { open: true, pos, menus } };
      }),
      clearContextMenu: assign((context, event) => {
        return {
          ...context,
          contextMenu: { open: false, pos: null, menus: [] },
        };
      }),
      setFooterActive: assign((context, event) => {
        const { target, index } = event;

        const targetFooter = context.footers
          .filter((footer) => footer.title === target)
          .map((footer) => ({ ...footer, isActived: true }));

        const restApps = context.footers.filter((footer) => footer.title !== target);

        return {
          ...context,
          footers: [...restApps.slice(0, index), ...targetFooter, ...restApps.slice(index)],
        };
      }),
      setFolderArray: assign((context, event) => {
        const { target } = event;

        const targetFolder = folderConfig[target];

        const currentFolders = context.folders;

        const newFolders = [
          ...currentFolders,
          { ...targetFolder, id: uniqueId(), order: currentFolders.length },
        ];

        return { ...context, folders: newFolders };
      }),
      setFolderReorder: assign((context, event) => {
        const currentOrder = event.order;

        const newFolders = context.folders.map((folder) => {
          if (folder.order === currentOrder)
            return {
              ...folder,
              order: 0,
            };
          return {
            ...folder,
            order:
              (folder.order as number) < currentOrder ? (folder.order as number) + 1 : folder.order,
          };
        });

        return { ...context, folders: newFolders };
      }),
      setFolderClose: assign((context, event) => {
        const removedIndex = event.index;
        const removedOrder = event.order;

        const prevFolders = [...context.folders];

        const currentFolders = prevFolders
          .slice(0, removedIndex)
          .concat(prevFolders.slice(removedIndex + 1));

        const removedFolders = currentFolders.map((folder) => ({
          ...folder,
          order:
            (folder.order as number) > removedOrder ? (folder.order as number) - 1 : folder.order,
        }));

        return { ...context, folders: removedFolders };
      }),
    },
  }
);
