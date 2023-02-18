import { createMachine, assign } from "xstate";

export const desktopMachine = createMachine({
  id: "desktop",
  context: {
    apps: [
      {
        name: "testing_app",
        position: { x: 100, y: 100, tempX: 0, tempY: 0 },
        isActived: false,
        image: null,
      },
    ],
  },
  on: {
    "apps.moving": {
      actions: [],
    },
  },
});
