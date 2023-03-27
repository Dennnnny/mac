import { MouseEvent, useEffect, useState } from "react";
import styled from "styled-components";
import { MenuItemType, MenuItemValueType, MenuProps } from "utils/types";
import { desktopMenu } from "../config/desktop-menus";

type MenuLayoutProps = {
  pos?: { x: number; y: number } | null;
  type?: "default" | "header" | "footer" | "app";
  open?: boolean;
};

const nestedMenuY = (type: string) => {
  switch (type) {
    case "footer":
      return "-100%";
    case "app":
    case "header":
    default:
      return "calc(0% - 0.25rem)";
  }
};

const menuOverrideConfig = (type: string, y: number, isNested: boolean) => {
  let config = "";
  if (isNested) {
    if (type?.match(/app|header|default/gi)) {
      config += `top: ${y}px; `;
    }
  } else {
    if (type === "footer") {
      config += `bottom: 70px; `;
    }
    if (type === "header") {
      config += "border-radius: 0 0 0.3rem 0.3rem; ";
    }
  }
  return config;
};

const MenuLayout = styled.div.withConfig({
  componentId: "MenuLayout",
})<MenuLayoutProps>`
  /* visibility: ${({ open }) => (open ? "visible" : "hidden")}; */
  opacity: ${({ open }) => (open ? 1 : 0)};
  z-index: ${({ open }) => (open ? 22 : 0)};
  pointer-events: ${({ open }) => (open ? "initial" : "none")};
  color: #fff;
  user-select: none;
  background-color: #263245;
  padding-left: 1rem;
  border: 0.1px solid #44505e;
  box-sizing: border-box;
  width: max-content;
  box-shadow: 0px 0px 10px rgba(10, 10, 10, 0.5);
  position: absolute;
  backdrop-filter: blur(5px);
  border-radius: 0.3rem;
  transform: ${({ pos, type, className }) =>
    className?.includes("nested")
      ? `translate(${pos?.x}px,${nestedMenuY(type!)})`
      : `translate(${pos?.x}px,${pos?.y}px)`};

  ${({ type, pos, className }) =>
    menuOverrideConfig(type!, pos!.y, className?.includes("nested")!)};

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

      > p {
        width: 100%;
      }

      > span {
        display: flex;
        padding-right: 0.4rem;
        flex-shrink: 1;
        padding-left: 1.5rem;
        > * {
          pointer-events: none;
        }
      }
    }

    > div.disabled {
      color: #7f7f7f;
    }
  }

  .menu-overlay {
    position: absolute;
    left: 0;
    top: 0;
    right: 0;
    bottom: 0;
    background-color: rgba(123, 234, 22, 0.5);
  }
`;

type nestedMenuType = {
  open: boolean;
  pos: { x: number; y: number } | null;
  menus?: MenuItemType[];
  index?: number;
};

export function Menu({
  open,
  pos,
  index,
  menus = desktopMenu,
  type = "default",
  handleCloseMenu = () => {},
  className,
}: MenuProps) {
  const menuClassName = className ? className : "";

  const [nestedMenu, setNestedMenu] = useState<nestedMenuType | null>({
    open: false,
    pos: null,
    menus: [],
  });

  const mouseEnter = (menus: MenuItemType[], index: number) => (e: MouseEvent) => {
    const { x, width, y, height, top, bottom, right, left } =
      e.currentTarget.getBoundingClientRect();

    console.log(top - pos!.y);

    setNestedMenu((prev) => ({
      ...prev,
      open: true,
      pos:
        type === "footer"
          ? { x: width + 1, y: 0 }
          : type.match(/app|header/gi)
          ? { x: width, y: top - pos!.y }
          : { x: width, y: top - pos!.y },
      menus,
      index,
    }));
  };

  const mouseEnterNull = () => {
    setNestedMenu(null);
  };

  useEffect(() => {
    if (!open) {
      setNestedMenu(null);
    }
  }, [open]);

  useEffect(() => {
    setNestedMenu(null);
  }, [index]);

  function handleClickMenu(item: MenuItemValueType) {
    if (!item) return null;
    if (item.type !== "actions") return null;

    if (typeof item.action === "function") {
      item.action();
      return;
    } else {
      console.log("click::", item.action);
      return;
    }
  }

  return menus.length > 0 ? (
    <>
      <MenuLayout pos={pos} type={type} open={open} className={`belong-menu ${menuClassName}`}>
        {menus.map((menuitem, index) => (
          <div
            className="menu-section"
            key={`menulist-${index}`}
            style={index > 0 ? { borderTop: "1.5px solid #4e5565" } : {}}
          >
            {Object.entries(menuitem).map(([key, value], index) => {
              const isIconExisted = value.icon != null;

              return (
                <div className={`menu-item ${value.type}`} key={`menuitem-${index}`}>
                  {value.type === "nested" ? (
                    <div
                      className="belong-menu with-icon"
                      onMouseEnter={mouseEnter(value.menus ?? [], index)}
                    >
                      <p>{key}</p>
                      {isIconExisted && <span>{value.icon!()}</span>}
                    </div>
                  ) : (
                    <div onMouseEnter={mouseEnterNull} className={`belong-menu ${value.type}`}>
                      <p
                        onClick={() => {
                          handleClickMenu(value);
                          handleCloseMenu();
                        }}
                      >
                        {key}
                      </p>
                      {isIconExisted && <span>{value.icon!()}</span>}
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        ))}
        {nestedMenu && (
          <Menu
            type={type}
            open={nestedMenu!.open}
            pos={nestedMenu!.pos}
            menus={nestedMenu!.menus ?? []}
            className="nested"
          />
        )}
      </MenuLayout>
      <MenuOverlay
        className={menuClassName}
        type={type}
        open={open}
        onClick={() => {
          handleCloseMenu();
        }}
        onContextMenu={() => {
          handleCloseMenu();
        }}
      />
    </>
  ) : null;
}

type OverlayProps = Omit<MenuLayoutProps, "pos">;

const MenuOverlay = styled.div.withConfig({ componentId: "MenuOverlay" })<OverlayProps>`
  display: ${({ open, className }) => (open && className !== "nested" ? "block" : "none")};
  position: absolute;
  width: 200vw;
  height: 200vh;
  transform: ${({ type }) => (type === "app" ? "translate(0%, -50%)" : "translate(-50%, -50%)")};
  /* background-color: rgba(122, 233, 211, 0.3); */
  z-index: 20;
  top: ${({ type }) => (type === "header" ? "calc(100% + 24px)" : 0)};
`;
