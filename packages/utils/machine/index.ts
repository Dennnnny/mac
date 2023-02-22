import { createMachine, assign } from "xstate";
import { AppProps, Pos } from "../types";

export const desktopMachine = createMachine(
  {
    tsTypes: {} as import("./index.typegen").Typegen0,
    predictableActionArguments: true,
    schema: {
      context: {} as { apps: AppProps[]; currentMovement: Pos },
      events: {} as
        | { type: "app.focus"; target?: string }
        | { type: "app.unfocus"; target: string }
        | { type: "app.unfocusAll" }
        | { type: "app.moving"; tempX: number; tempY: number }
        | { type: "app.placed"; dX: number; dY: number },
    },
    id: "desktop",
    initial: "idle",
    context: {
      apps: [
        {
          name: "testing",
          posX: 100,
          posY: 100,
          isActived: false,
          img: "null",
        },
        {
          name: "tester",
          posX: 200,
          posY: 50,
          isActived: false,
          img: "none",
        },
      ],
      currentMovement: null,
    },
    states: {
      idle: {
        on: {
          "app.focus": {
            target: "idle",
            actions: ["setFocus"],
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
    },
  }
);
