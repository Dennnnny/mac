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
    setAllAppsUnfocus: "app.unfocusAll";
    setFocus: "app.focus";
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
