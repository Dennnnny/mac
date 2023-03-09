import { FcFile, FcSearch } from "react-icons/fc";
import { setFullscreen } from "../tool";
import { AppProps } from "../types";

export const desktopApps: AppProps[] = [
  {
    name: "click to fullpage",
    posX: 100,
    posY: 100,
    isActived: false,
    icon: <FcSearch />,
    action: () => setFullscreen(),
    menus: [],
  },
  {
    name: "tester",
    posX: 200,
    posY: 50,
    isActived: false,
    icon: <FcFile />,
    action: "tester 2.0",
    menus: [],
  },
];
