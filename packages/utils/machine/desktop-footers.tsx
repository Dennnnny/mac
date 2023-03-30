import { FooterType } from "utils/types";
import { FaCaretRight } from "react-icons/fa";

export const desktopFooters: FooterType[] = [
  {
    title: "Finder",
    icon: "/finder.svg",
    type: "folder",
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
    type: "folder",
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
    type: "folder",
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
    type: "folder",
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
    type: "folder",
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
    type: "folder",
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
    type: "folder",
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
    type: "link",
    url: "https://www.linkedin.com/in/wanyang-chang-75514213a/",
    menus: [
      {
        開啟: {
          type: "link",
          icon: null,
          url: "https://www.linkedin.com/in/wanyang-chang-75514213a/",
        },
      },
      {
        關於: {
          type: "folder",
          target: "Linkedin_about",
          icon: null,
        },
      },
    ],
    isActived: false,
  },
  {
    title: "GitHub",
    icon: "/github.svg",
    type: "link",
    url: "https://github.com/Dennnnny",
    menus: [
      {
        開啟: {
          type: "link",
          action: "",
          icon: null,
          url: "https://github.com/Dennnnny",
        },
      },
      {
        關於: {
          type: "folder",
          target: "GitHub_about",
          icon: null,
        },
      },
    ],
    isActived: false,
  },
  {
    title: "App Stores",
    icon: "/app-store.svg",
    type: "folder",
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
    type: "folder",
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
    type: "folder",
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
    type: "folder",
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
    type: "folder",
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
