import { useEffect, useState } from "react";
import styled from "styled-components";
import { AppProps, AppLayoutProps } from "utils/types";
import { Menu } from "./Menu";

const AppLayout = styled.div.withConfig({
  componentId: "AppLayout",
})<AppLayoutProps>`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  position: absolute;
  transform: ${({ posX, posY }) => `translate(${posX || "100"}px, ${posY || "100"}px)`};
  padding: 0.2rem 0 0 0;
  width: 80px;
  padding: 0.5rem 0 0 0;

  > * {
    box-sizing: border-box;
  }

  .icon {
    width: 20px;
    height: 20px;
    pointer-events: none;
    margin: 1px;
    ${({ actived }) =>
      actived &&
      `
        border: 1px solid #666;
        box-sizing: content-box;
        background: #202020;
        margin: 0px;
      `};

    &.dashed {
      border: 1px dashed #ccc;
    }
  }

  .name {
    display: -webkit-box;
    -webkit-line-clamp: 2;
    -webkit-box-orient: vertical;
    max-width: 80px;
    overflow: hidden;
    text-overflow: ellipsis;
    overflow-wrap: anywhere;
    text-align: center;
    color: #fff;
    margin: 0.2rem;
    padding: 0.1rem 0.2rem;
    pointer-events: none;
    font-size: 0.5rem;
    text-shadow: 1px 1px 5px #0c0c0c;
    ${({ actived }) =>
      actived &&
      `
        background-color: #0158d0;
        border-radius: 0.5rem;
      `};
  }

  > :is(.belong-menu) {
    width: max-content;
  }
`;

export const DesktopApp = (props: AppProps) => {
  const {
    posX = 100,
    posY = 100,
    name = "tester",
    isActived,
    handleDragging,
    handleAppStatus = () => {},
    handleDbClick = () => {},
    menus,
    mousePos,
    icon,
  } = props;

  const [appMenu, setAppMenu] = useState({ open: false, pos: { x: 0, y: 0 } });

  return (
    <AppLayout
      draggable={appMenu.open ? false : true}
      posX={posX}
      posY={posY}
      actived={isActived}
      onMouseDown={handleAppStatus}
      onDragStart={handleDragging}
      onDragEnd={handleDragging}
      onDoubleClick={handleDbClick}
      onContextMenu={() => {
        if (!appMenu.open) {
          setAppMenu({ open: true, pos: mousePos! });
        }
      }}
      className="apps"
    >
      {icon != null ? icon : <div className="icon dashed" />}
      <div className="name">{name}</div>
      <Menu
        type="app"
        open={appMenu.open}
        menus={menus}
        pos={{ x: appMenu.pos!.x - posX + 40, y: appMenu.pos!.y - posY + 55 }}
        handleCloseMenu={() => setAppMenu({ open: false, pos: { x: 0, y: 0 } })}
      />
    </AppLayout>
  );
};
