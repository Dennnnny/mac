import { AppProps } from "next/app";
import { createActorContext } from "@xstate/react";
import { desktopMachine } from "utils/machine";

export const DesktopContext = createActorContext(desktopMachine);

function App({ Component, pageProps }: AppProps) {
  return (
    <DesktopContext.Provider>
      <Component {...pageProps} />
    </DesktopContext.Provider>
  );
}

export default App;
