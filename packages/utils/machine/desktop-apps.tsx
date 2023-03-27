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
    menus: [
      {
        打開: { type: "actions", icon: null },
        打開檔案的應用程式: { type: "actions", icon: null },
      },
      { 丟到垃圾桶: { type: "actions", icon: null } },
      {
        取得資訊: { type: "actions", icon: null },
        重新命名: { type: "actions", icon: null },
        複製: { type: "actions", icon: null },
        分享: {
          type: "nested",
          icon: null,
          menus: [
            {
              郵件: { type: "actions", icon: null },
              訊息: { type: "actions", icon: null },
              AirDrop: { type: "actions", icon: null },
            },
          ],
        },
      },
    ],
  },
  {
    name: "DEMO",
    posX: 200,
    posY: 50,
    isActived: false,
    icon: <FcFile />,
    action: "open",
    target: "DEMO",
    menus: [
      {
        打開: { type: "actions", icon: null },
        打開檔案的應用程式: {
          type: "nested",
          icon: null,
          menus: [
            {
              郵件: { type: "actions", icon: null },
              訊息: { type: "actions", icon: null },
              AirDrop: { type: "actions", icon: null },
            },
          ],
        },
      },
      { 丟到垃圾桶: { type: "actions", icon: null } },
      {
        取得資訊: { type: "actions", icon: null },
        重新命名: { type: "actions", icon: null },
        複製: { type: "actions", icon: null },
        分享: {
          type: "nested",
          icon: null,
          menus: [
            {
              郵件: { type: "actions", icon: null },
              訊息: { type: "actions", icon: null },
              AirDrop: { type: "actions", icon: null },
            },
          ],
        },
      },
    ],
  },
];
