import { createMachine, assign } from "xstate";
import { AppProps, MenuItemType, MenuProps, Pos, FolderProps } from "../types";
import { desktopApps } from "./desktop-apps";
import { desktopFolders } from "./desktop-folders";

export const desktopMachine = createMachine(
  {
    tsTypes: {} as import("./index.typegen").Typegen0,
    predictableActionArguments: true,
    schema: {
      context: {} as {
        apps: AppProps[];
        currentMovement: Pos;
        contextMenu: MenuProps;
        folders: FolderProps[];
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
        | { type: "folder.resize"; payload: string; distance: number },
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
          "folder.resize": {
            target: "idle",
            actions: ["setFolderSize"],
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
      setFolderSize: assign((context, event) => {
        const currentFolder = context.folders[0];

        const restFolders = context.folders.filter((folder, index) => index !== 0);

        const { width, height } = currentFolder.size;
        const { pos } = currentFolder;
        const type = event.payload;
        const distance = event.distance;

        switch (type) {
          case "top":
            return {
              ...context,
              folders: [
                {
                  ...currentFolder,
                  size: { width, height: height + distance },
                  pos: { ...pos, y: pos.y - distance },
                },
                ...restFolders,
              ],
            };
          case "bottom":
            return {
              ...context,
              folders: [
                { ...currentFolder, size: { width, height: height + distance } },
                ...restFolders,
              ],
            };
          case "left":
            return {
              ...context,
              folders: [
                {
                  ...currentFolder,
                  size: { width: width + distance, height },
                  pos: { ...pos, x: pos.x - distance },
                },
                ...restFolders,
              ],
            };
          case "right":
            return {
              ...context,
              folders: [
                { ...currentFolder, size: { width: width + distance, height } },
                ...restFolders,
              ],
            };
          default:
            return { ...context };
        }

        // return {
        //   ...context,
        //   folders: [
        //     { ...currentFolder, size: { width: width + distance, height } },
        //     ...restFolders,
        //   ],
        // };
      }),
    },
  }
);
