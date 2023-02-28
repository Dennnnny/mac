// This file was automatically generated. Edits will be overwritten

export interface Typegen0 {
  "@@xstate/typegen": true;
  internalEvents: {
    "xstate.init": { type: "xstate.init" };
  };
  invokeSrcNameMap: {};
  missingImplementations: {
    actions: never;
    delays: never;
    guards: never;
    services: never;
  };
  eventsCausingActions: {
    clearContextMenu: "contextMenu.clear";
    setAllAppsUnfocus: "app.singleAppFocus" | "app.unfocusAll";
    setContextMenu: "contextMenu.setting";
    setFocus: "app.focus" | "app.singleAppFocus";
    setNewPosition: "app.placed";
    setTempPosition: "app.moving";
    setUnfocus: "app.unfocus";
  };
  eventsCausingDelays: {};
  eventsCausingGuards: {};
  eventsCausingServices: {};
  matchesStates: "idle";
  tags: never;
}
