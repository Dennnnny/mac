import { FooterType } from "utils/types";
import { FaCaretRight } from "react-icons/fa";

export const desktopFooters: FooterType[] = [
  {
    title: "Finder",
    icon: "/finder.svg",
    menus: [
      {
        新增Finder視窗: {
          type: "actions",
          action: () => {},
          icon: null,
        },
        新增智慧型檔案夾: {
          type: "actions",
          action: () => {},
          icon: null,
        },
        "尋找...": {
          type: "actions",
          action: () => {},
          icon: null,
        },
      },
      {
        前往檔案夾: {
          type: "actions",
          action: () => {},
          icon: null,
        },
        連結伺服器: {
          type: "actions",
          action: () => {},
          icon: null,
        },
      },
      {
        選項: {
          type: "nested",
          action: "",
          icon: () => <FaCaretRight />,
          menus: [
            {
              指定到: {
                type: "disabled",
                action: () => {},
                icon: null,
              },
              所有桌面: {
                type: "actions",
                action: () => {},
                icon: null,
              },
              此桌面: {
                type: "actions",
                action: () => {},
                icon: null,
              },
              無: {
                type: "actions",
                action: () => {},
                icon: null,
              },
            },
          ],
        },
      },
      {
        顯示所有視窗: {
          type: "actions",
          action: () => {},
          icon: null,
        },
        隱藏: {
          type: "actions",
          action: () => {},
          icon: null,
        },
      },
    ],
    isActived: false,
  },
  {
    title: "Safari",
    icon: "/safari.svg",
    menus: [
      {
        選項: {
          type: "nested",
          action: "",
          icon: () => <FaCaretRight />,
          menus: [
            {
              從Docker中移除: {
                type: "actions",
                action: () => {},
                icon: null,
              },
              在登入時打開: {
                type: "actions",
                action: () => {},
                icon: null,
              },
              顯示於Finder: {
                type: "actions",
                action: () => {},
                icon: null,
              },
            },
            {
              指定到: {
                type: "disabled",
                action: () => {},
                icon: null,
              },
              所有桌面: {
                type: "actions",
                action: () => {},
                icon: null,
              },
              此桌面: {
                type: "actions",
                action: () => {},
                icon: null,
              },
              無: {
                type: "actions",
                action: () => {},
                icon: null,
              },
            },
          ],
        },
      },
      {
        顯示最近使用過的項目: {
          type: "actions",
          action: () => {},
          icon: null,
        },
        打開: {
          type: "actions",
          action: () => {},
          icon: null,
        },
      },
    ],
    isActived: false,
  },
  {
    title: "Docker",
    icon: "/docker.svg",
    menus: [
      {
        開啟Docker: {
          type: "actions",
          action: () => {},
          icon: null,
        },
        選項: {
          type: "nested",
          action: () => {},
          icon: null,
          menus: [
            {
              指定到: {
                type: "disabled",
                action: () => {},
                icon: null,
              },
              所有桌面: {
                type: "actions",
                action: () => {},
                icon: null,
              },
              此桌面: {
                type: "actions",
                action: () => {},
                icon: null,
              },
              無: {
                type: "actions",
                action: () => {},
                icon: null,
              },
            },
          ],
        },
      },
    ],
    isActived: false,
  },
  {
    title: "Firefox",
    icon: "/firefox.svg",
    menus: [
      {
        選項: {
          type: "nested",
          action: "",
          icon: () => <FaCaretRight />,
          menus: [
            {
              從Docker中移除: {
                type: "actions",
                action: () => {},
                icon: null,
              },
              在登入時打開: {
                type: "actions",
                action: () => {},
                icon: null,
              },
              顯示於Finder: {
                type: "actions",
                action: () => {},
                icon: null,
              },
            },
            {
              指定到: {
                type: "disabled",
                action: () => {},
                icon: null,
              },
              所有桌面: {
                type: "actions",
                action: () => {},
                icon: null,
              },
              此桌面: {
                type: "actions",
                action: () => {},
                icon: null,
              },
              無: {
                type: "actions",
                action: () => {},
                icon: null,
              },
            },
          ],
        },
      },
      {
        顯示最近使用過的項目: {
          type: "actions",
          action: () => {},
          icon: null,
        },
        打開: {
          type: "actions",
          action: () => {},
          icon: null,
        },
      },
    ],
    isActived: false,
  },
  {
    title: "Chrome",
    icon: "/chrome.svg",
    menus: [
      {
        選項: {
          type: "nested",
          action: "",
          icon: () => <FaCaretRight />,
          menus: [
            {
              從Docker中移除: {
                type: "actions",
                action: () => {},
                icon: null,
              },
              在登入時打開: {
                type: "actions",
                action: () => {},
                icon: null,
              },
              顯示於Finder: {
                type: "actions",
                action: () => {},
                icon: null,
              },
            },
            {
              指定到: {
                type: "disabled",
                action: () => {},
                icon: null,
              },
              所有桌面: {
                type: "actions",
                action: () => {},
                icon: null,
              },
              此桌面: {
                type: "actions",
                action: () => {},
                icon: null,
              },
              無: {
                type: "actions",
                action: () => {},
                icon: null,
              },
            },
          ],
        },
      },
      {
        開新視窗: {
          type: "actions",
          action: () => {},
          icon: null,
        },
        打開: {
          type: "actions",
          action: () => {},
          icon: null,
        },
      },
    ],
    isActived: false,
  },
  {
    title: "Slack",
    icon: "/slack.svg",
    menus: [
      {
        選項: {
          type: "nested",
          action: "",
          icon: () => <FaCaretRight />,
          menus: [
            {
              從Docker中移除: {
                type: "actions",
                action: () => {},
                icon: null,
              },
              在登入時打開: {
                type: "actions",
                action: () => {},
                icon: null,
              },
              顯示於Finder: {
                type: "actions",
                action: () => {},
                icon: null,
              },
            },
            {
              指定到: {
                type: "disabled",
                action: () => {},
                icon: null,
              },
              所有桌面: {
                type: "actions",
                action: () => {},
                icon: null,
              },
              此桌面: {
                type: "actions",
                action: () => {},
                icon: null,
              },
              無: {
                type: "actions",
                action: () => {},
                icon: null,
              },
            },
          ],
        },
      },
      {
        顯示最近使用過的項目: {
          type: "actions",
          action: () => {},
          icon: null,
        },
        打開: {
          type: "actions",
          action: () => {},
          icon: null,
        },
      },
    ],
    isActived: false,
  },
  {
    title: "YouTube",
    icon: "/youtube.svg",
    menus: [
      {
        選項: {
          type: "nested",
          action: "",
          icon: () => <FaCaretRight />,
          menus: [
            {
              從Docker中移除: {
                type: "actions",
                action: () => {},
                icon: null,
              },
              在登入時打開: {
                type: "actions",
                action: () => {},
                icon: null,
              },
              顯示於Finder: {
                type: "actions",
                action: () => {},
                icon: null,
              },
            },
            {
              指定到: {
                type: "disabled",
                action: () => {},
                icon: null,
              },
              所有桌面: {
                type: "actions",
                action: () => {},
                icon: null,
              },
              此桌面: {
                type: "actions",
                action: () => {},
                icon: null,
              },
              無: {
                type: "actions",
                action: () => {},
                icon: null,
              },
            },
          ],
        },
      },
      {
        顯示最近使用過的項目: {
          type: "actions",
          action: () => {},
          icon: null,
        },
        打開: {
          type: "actions",
          action: () => {},
          icon: null,
        },
      },
    ],
    isActived: false,
  },
  {
    title: "Linkedin",
    icon: "/linkedin.svg",
    menus: [
      {
        選項: {
          type: "nested",
          action: "",
          icon: () => <FaCaretRight />,
          menus: [
            {
              從Docker中移除: {
                type: "actions",
                action: () => {},
                icon: null,
              },
              在登入時打開: {
                type: "actions",
                action: () => {},
                icon: null,
              },
              顯示於Finder: {
                type: "actions",
                action: () => {},
                icon: null,
              },
            },
            {
              指定到: {
                type: "disabled",
                action: () => {},
                icon: null,
              },
              所有桌面: {
                type: "actions",
                action: () => {},
                icon: null,
              },
              此桌面: {
                type: "actions",
                action: () => {},
                icon: null,
              },
              無: {
                type: "actions",
                action: () => {},
                icon: null,
              },
            },
          ],
        },
      },
      {
        顯示最近使用過的項目: {
          type: "actions",
          action: () => {},
          icon: null,
        },
        打開: {
          type: "actions",
          action: () => {},
          icon: null,
        },
      },
    ],
    isActived: false,
  },
  {
    title: "GitHub",
    icon: "/github.svg",
    menus: [
      {
        選項: {
          type: "nested",
          action: "",
          icon: () => <FaCaretRight />,
          menus: [
            {
              從Docker中移除: {
                type: "actions",
                action: () => {},
                icon: null,
              },
              在登入時打開: {
                type: "actions",
                action: () => {},
                icon: null,
              },
              顯示於Finder: {
                type: "actions",
                action: () => {},
                icon: null,
              },
            },
            {
              指定到: {
                type: "disabled",
                action: () => {},
                icon: null,
              },
              所有桌面: {
                type: "actions",
                action: () => {},
                icon: null,
              },
              此桌面: {
                type: "actions",
                action: () => {},
                icon: null,
              },
              無: {
                type: "actions",
                action: () => {},
                icon: null,
              },
            },
          ],
        },
      },
      {
        顯示最近使用過的項目: {
          type: "actions",
          action: () => {},
          icon: null,
        },
        打開: {
          type: "actions",
          action: () => {},
          icon: null,
        },
      },
    ],
    isActived: false,
  },
  {
    title: "App Stores",
    icon: "/app-store.svg",
    menus: [
      {
        選項: {
          type: "nested",
          action: "",
          icon: () => <FaCaretRight />,
          menus: [
            {
              從Docker中移除: {
                type: "actions",
                action: () => {},
                icon: null,
              },
              在登入時打開: {
                type: "actions",
                action: () => {},
                icon: null,
              },
              顯示於Finder: {
                type: "actions",
                action: () => {},
                icon: null,
              },
            },
            {
              指定到: {
                type: "disabled",
                action: () => {},
                icon: null,
              },
              所有桌面: {
                type: "actions",
                action: () => {},
                icon: null,
              },
              此桌面: {
                type: "actions",
                action: () => {},
                icon: null,
              },
              無: {
                type: "actions",
                action: () => {},
                icon: null,
              },
            },
          ],
        },
      },
      {
        顯示最近使用過的項目: {
          type: "actions",
          action: () => {},
          icon: null,
        },
        打開: {
          type: "actions",
          action: () => {},
          icon: null,
        },
      },
    ],
    isActived: false,
  },
  {
    title: "系統偏好設定",
    icon: "/setting.svg",
    menus: [
      {
        選項: {
          type: "nested",
          action: "",
          icon: () => <FaCaretRight />,
          menus: [
            {
              從Docker中移除: {
                type: "actions",
                action: () => {},
                icon: null,
              },
              在登入時打開: {
                type: "actions",
                action: () => {},
                icon: null,
              },
              顯示於Finder: {
                type: "actions",
                action: () => {},
                icon: null,
              },
            },
            {
              指定到: {
                type: "disabled",
                action: () => {},
                icon: null,
              },
              所有桌面: {
                type: "actions",
                action: () => {},
                icon: null,
              },
              此桌面: {
                type: "actions",
                action: () => {},
                icon: null,
              },
              無: {
                type: "actions",
                action: () => {},
                icon: null,
              },
            },
          ],
        },
      },
      {
        顯示最近使用過的項目: {
          type: "actions",
          action: () => {},
          icon: null,
        },
        打開: {
          type: "actions",
          action: () => {},
          icon: null,
        },
      },
    ],
    isActived: false,
  },
  {
    title: "Visual Studio Code",
    icon: "/vscode.svg",
    menus: [
      {
        選項: {
          type: "nested",
          action: "",
          icon: () => <FaCaretRight />,
          menus: [
            {
              從Docker中移除: {
                type: "actions",
                action: () => {},
                icon: null,
              },
              在登入時打開: {
                type: "actions",
                action: () => {},
                icon: null,
              },
              顯示於Finder: {
                type: "actions",
                action: () => {},
                icon: null,
              },
            },
            {
              指定到: {
                type: "disabled",
                action: () => {},
                icon: null,
              },
              所有桌面: {
                type: "actions",
                action: () => {},
                icon: null,
              },
              此桌面: {
                type: "actions",
                action: () => {},
                icon: null,
              },
              無: {
                type: "actions",
                action: () => {},
                icon: null,
              },
            },
          ],
        },
      },
      {
        顯示最近使用過的項目: {
          type: "actions",
          action: () => {},
          icon: null,
        },
        打開: {
          type: "actions",
          action: () => {},
          icon: null,
        },
      },
    ],
    isActived: false,
  },
  {
    title: "終端機",
    icon: "/terminal.svg",
    menus: [
      {
        選項: {
          type: "nested",
          action: "",
          icon: () => <FaCaretRight />,
          menus: [
            {
              從Docker中移除: {
                type: "actions",
                action: () => {},
                icon: null,
              },
              在登入時打開: {
                type: "actions",
                action: () => {},
                icon: null,
              },
              顯示於Finder: {
                type: "actions",
                action: () => {},
                icon: null,
              },
            },
            {
              指定到: {
                type: "disabled",
                action: () => {},
                icon: null,
              },
              所有桌面: {
                type: "actions",
                action: () => {},
                icon: null,
              },
              此桌面: {
                type: "actions",
                action: () => {},
                icon: null,
              },
              無: {
                type: "actions",
                action: () => {},
                icon: null,
              },
            },
          ],
        },
      },
      {
        顯示最近使用過的項目: {
          type: "actions",
          action: () => {},
          icon: null,
        },
        打開: {
          type: "actions",
          action: () => {},
          icon: null,
        },
      },
    ],
    isActived: false,
  },
  {
    title: "垃圾桶",
    icon: "/trashcan.svg",
    menus: [
      {
        選項: {
          type: "nested",
          action: "",
          icon: () => <FaCaretRight />,
          menus: [
            {
              從Docker中移除: {
                type: "actions",
                action: () => {},
                icon: null,
              },
              在登入時打開: {
                type: "actions",
                action: () => {},
                icon: null,
              },
              顯示於Finder: {
                type: "actions",
                action: () => {},
                icon: null,
              },
            },
            {
              指定到: {
                type: "disabled",
                action: () => {},
                icon: null,
              },
              所有桌面: {
                type: "actions",
                action: () => {},
                icon: null,
              },
              此桌面: {
                type: "actions",
                action: () => {},
                icon: null,
              },
              無: {
                type: "actions",
                action: () => {},
                icon: null,
              },
            },
          ],
        },
      },
      {
        顯示最近使用過的項目: {
          type: "actions",
          action: () => {},
          icon: null,
        },
        打開: {
          type: "actions",
          action: () => {},
          icon: null,
        },
      },
    ],
    isActived: false,
  },
];
