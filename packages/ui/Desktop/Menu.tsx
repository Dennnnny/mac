import { MouseEvent, useState } from "react";
import { IconType } from "react-icons";
import { FaCaretRight } from "react-icons/fa";
import styled from "styled-components";
import { MenuConfig } from "./Header";

export function HeaderMenu({
  open = false,
  config,
}: {
  open?: boolean;
  config?: MenuConfig | null;
}) {
  console.log({ config, open });
  const menus = [
    {
      "About this": {
        type: "actions",
        action: "",
        icon: "",
      },
      restart: {},
      preference: {
        type: "structure",
        structure: {},
      },
    },
    {
      Abouddd: {
        type: "actions",
        action: "",
        icon: "",
      },
      testing: {},
      preference: {},
    },
  ];

  return open ? (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        border: "1px solid red",
        position: "absolute",
        top: "24px",
        left: `${config!.posX}px`,
      }}
    >
      {menus.map((menuitem, index) => (
        <div
          key={`menulist-${index}`}
          // style={index > 0 ? {} : {}}
          style={index > 0 ? { borderTop: "2px solid blue" } : {}}
        >
          {Object.entries(menuitem).map(([key, value], index) => {
            return <div key={`menuitem-${index}`}>{key}</div>;
          })}
        </div>
      ))}
    </div>
  ) : null;
}

/////////////////////////

type MenuLayoutProps = {
  pos?: { x: number; y: number } | null;
  type?: "default" | "header";
};

const MenuLayout = styled.div.withConfig({
  componentId: "MenuLayout",
})<MenuLayoutProps>`
  color: #fff;
  user-select: none;
  background-color: #323232cc;
  padding-left: 1rem;
  border: 0.1px solid #ccc;
  box-sizing: border-box;
  width: fit-content;
  box-shadow: 0px 0px 10px rgba(10, 10, 10, 0.5);
  position: absolute;
  transform: ${({ pos }) => `translate(${pos?.x}px,${pos?.y}px)`};
  ${({ type }) =>
    type === "header"
      ? `border-radius: 0 0 0.3rem 0.3rem;`
      : `border-radius: 0.3rem;`};

  .menu-section {
    padding: 0.2rem 0 0.25rem;
    margin-left: -1rem;
  }

  .menu-item {
    &:hover:not(.disabled) {
      background-color: #0561cb;
    }

    > * {
      margin-left: 1rem;
    }

    p {
      padding: 0.2rem 1rem 0.2rem 0;
      font-size: 14px;
    }

    > div.with-icon {
      display: flex;
      justify-content: space-between;
      align-items: center;
      gap: 2rem;

      > span {
        display: flex;
        padding-right: 0.4rem;
      }
    }

    > div.disabled {
      color: #7f7f7f;
    }
  }
`;

const mockMenus: MenuItemType[] = [
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
      icon: () => <></>,
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
            action: "",
            icon: () => <></>,
          },
          拍照: {
            type: "actions",
            action: "",
            icon: () => <></>,
          },
          掃描文件: {
            type: "actions",
            action: "",
            icon: () => <></>,
          },
        },
      ],
    },
  },
  {
    更改桌面背景: { type: "actions", action: "", icon: () => <></> },
    使用堆疊: { type: "actions", action: "", icon: () => <></> },
    排序方式: {
      type: "nested",
      icon: () => <FaCaretRight />,
    },
    整理: { type: "actions", action: "", icon: () => <></> },
    整理方式: {
      type: "nested",
      icon: () => <FaCaretRight />,
    },
    打開顯示方式選項: { type: "actions", action: "", icon: () => <></> },
  },
];

type MenuItemType = {
  [key: string]: {
    type?: "actions" | "nested" | "disabled";
    action?: string;
    icon: () => JSX.Element;
    menus?: MenuItemType[];
  };
};
type MenuProps = {
  open: boolean;
  menus?: MenuItemType[];
  pos: { x: number; y: number } | null;
  type?: "default" | "header";
};

type nestedMenuType = {
  open: boolean;
  pos: { x: number; y: number } | null;
  menus?: MenuItemType[];
};

export function Menu({
  open,
  pos,
  menus = mockMenus,
  type = "default",
}: MenuProps) {
  const [nestedMenu, setNestedMenu] = useState<nestedMenuType | null>({
    open: false,
    pos: null,
    menus: [],
  });

  const mouseEnter = (menus: MenuItemType[]) => (e: MouseEvent) => {
    const { x, width, y } = e.currentTarget.getBoundingClientRect();

    setNestedMenu((prev) => ({
      ...prev,
      open: true,
      pos: { x: x + width, y: y - 3.5 },
      menus,
    }));
  };

  const mouseEnterNull = () => {
    setNestedMenu(null);
  };

  return open && menus.length > 0 ? (
    <>
      <MenuLayout pos={pos} type={type}>
        {menus.map((menuitem, index) => (
          <div
            className="menu-section"
            key={`menulist-${index}`}
            style={index > 0 ? { borderTop: "2px solid #ccc" } : {}}
          >
            {Object.entries(menuitem).map(([key, value], index) => {
              return (
                <div
                  className={`menu-item ${value.type}`}
                  key={`menuitem-${index}`}
                >
                  {value.type === "nested" ? (
                    <div
                      className="with-icon"
                      onMouseEnter={mouseEnter(value.menus ?? [])}
                    >
                      <p>{key}</p>
                      <span>{value.icon()}</span>
                    </div>
                  ) : (
                    <div
                      onMouseEnter={mouseEnterNull}
                      className={`${
                        value.type === "disabled" ? "disabled" : "actions"
                      }`}
                    >
                      <p>{key}</p>
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        ))}
      </MenuLayout>
      {nestedMenu && (
        <Menu
          open={nestedMenu!.open}
          pos={nestedMenu!.pos}
          menus={nestedMenu!.menus ?? []}
        />
      )}
    </>
  ) : null;
}
