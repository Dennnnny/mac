import { FaApple, FaDocker } from "react-icons/fa";
import { FiAirplay, FiVolume2, FiWifi } from "react-icons/fi";
import { HiOutlineSearch } from "react-icons/hi";
import { setFullscreen } from "utils/tool";
import { DesktopHeaderType } from "utils/types";
import { Battery, DateAndTime, HeaderDrawer, LetterA, Siri, UmbrellaIcon } from "./icons";

export const headerLeftArea: DesktopHeaderType[] = [
  {
    type: "icon",
    display: <FaApple />,
    iconAlt: "apple",
    menus: [
      {
        "關於這台 Mac": {
          type: "actions",
          icon: () => <></>,
          action: (value: any) => console.log("!!!", value),
        },
      },
      {
        系統偏好設定: {
          type: "actions",
          icon: () => <></>,
          action: "TESTER",
        },
        "App store": {
          type: "actions",
          icon: () => <></>,
          action: () => {},
        },
        全螢幕: {
          type: "actions",
          icon: () => <></>,
          action: () => setFullscreen(),
        },
      },
    ],
  },
  {
    type: "text",
    display: "Code",
    menus: [
      {
        "About this": {
          type: "actions",
          icon: () => <></>,
          action: "TT",
        },
        "restart to update": {
          type: "actions",
          icon: () => <></>,
          action: "QQ",
        },
      },
    ],
  },
  {
    type: "text",
    display: "File",
    menus: [
      {
        "About this": {
          type: "actions",
          icon: () => <></>,
          action: () => {},
        },
        "restart to update": {
          type: "actions",
          icon: () => <></>,
          action: () => {},
        },
        "New Window": {
          type: "actions",
          icon: () => <></>,
          action: () => {},
        },
      },
    ],
  },
  {
    type: "text",
    display: "Edit",
    menus: [],
  },
  {
    type: "text",
    display: "Selection",
    menus: [],
  },
];

export const headerRightArea: DesktopHeaderType[] = [
  {
    type: "icon",
    display: <FaDocker />,
    menus: [],
  },
  {
    type: "icon",
    display: <UmbrellaIcon />,
    menus: [],
  },
  {
    type: "icon",
    display: <FiAirplay />,
    menus: [],
  },
  {
    type: "icon",
    display: <FiWifi />,
    menus: [],
  },
  {
    type: "icon",
    display: <FiVolume2 />,
    menus: [],
  },
  {
    type: "icon",
    display: <Battery />,
    menus: [],
  },
  {
    type: "icon",
    display: <LetterA />,
    menus: [],
  },
  {
    type: "icon",
    display: <DateAndTime />,
    menus: [],
  },
  {
    type: "text",
    display: "Denny",
    menus: [],
  },
  {
    type: "action",
    display: <HiOutlineSearch />,
    menus: [],
  },
  {
    type: "action",
    display: <Siri />,
    menus: [],
  },
  {
    type: "action",
    display: <HeaderDrawer />,
    menus: [],
  },
];
