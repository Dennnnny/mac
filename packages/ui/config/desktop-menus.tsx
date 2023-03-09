import { FaCaretRight } from "react-icons/fa";
import { MenuItemType } from "utils/types";

export const desktopMenu: MenuItemType[] = [
  {
    新增檔案夾: {
      type: "actions",
      action: "",
      icon: () => <></>,
    },
  },
  {
    取得資訊: {
      type: "actions",
      action: "",
      icon: null,
    },
  },
  {
    "從「iphone」中輸入": {
      type: "nested",
      action: "",
      icon: () => <FaCaretRight />,
      menus: [
        {
          Dennnny: {
            type: "disabled",
            action: "Denny",
            icon: () => <></>,
          },
          拍照: {
            type: "actions",
            action: "photo",
            icon: () => <></>,
          },
          掃描文件: {
            type: "actions",
            action: "scan",
            icon: () => <></>,
          },
        },
      ],
    },
  },
  {
    更改桌面背景: { type: "actions", action: () => {}, icon: () => <></> },
    使用堆疊: { type: "actions", action: () => {}, icon: () => <></> },
    排序方式: {
      type: "nested",
      icon: () => <FaCaretRight />,
      action: () => {},
    },
    整理: { type: "actions", action: "", icon: () => <></> },
    整理方式: {
      type: "nested",
      icon: () => <FaCaretRight />,
      action: () => {},
    },
    打開顯示方式選項: {
      type: "actions",
      action: () => {},
      icon: () => <></>,
    },
  },
];
