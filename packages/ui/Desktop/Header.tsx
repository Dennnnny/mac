import { MouseEvent, useRef, useState } from "react";
import { FaApple, FaDocker } from "react-icons/fa";
import styled from "styled-components";

import { useOnClickOutside } from "utils/tool";
import { MenuItemType } from "utils/types";
import { Menu } from "./Menu";

const HeaderLayout = styled.div.withConfig({ componentId: "HeaderLayout" })`
  height: 24px;
  background: #181d26;
  padding: 0 1rem;
  color: #fff;
  position: absolute;
  right: 0;
  left: 0;
  z-index: 15;

  display: flex;
  align-items: center;
  justify-content: space-between;

  font-family: "system-ui";

  div.rightarea,
  div.leftarea {
    display: flex;
    align-items: center;
    height: 100%;
    user-select: none;
    &.actived {
      > div {
        :hover {
          background-color: #0661cb;
        }
      }
    }

    > div {
      /* border: 1px dashed #ccc; */
    }

    .iconItem,
    .textItem {
      cursor: default;
      display: flex;
      align-items: center;
      padding: 1px 6px;
      box-sizing: border-box;
      height: 100%;

      &.actived {
        background-color: #0661cb;
      }
    }
  }
`;

type DesktopHeaderType = {
  type: string;
  display: JSX.Element | string;
  menus?: MenuItemType[];
  iconAlt?: string;
};

export type MenuConfig = {
  pos?: { x: number; y: number };
  id?: string;
} & DesktopHeaderType;

export function DesktopHeader() {
  const leftArea: DesktopHeaderType[] = [
    {
      type: "icon",
      display: <FaApple />,
      iconAlt: "apple",
      menus: [
        {
          "關於這台 Mac": {
            type: "actions",
            icon: () => <></>,
          },
        },
        {
          系統偏好設定: {
            type: "actions",
            icon: () => <></>,
          },
          "App store": {
            type: "actions",
            icon: () => <></>,
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
          },
          "restart to update": {
            type: "actions",
            icon: () => <></>,
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
          },
          "restart to update": {
            type: "actions",
            icon: () => <></>,
          },
          "New Window": {
            type: "actions",
            icon: () => <></>,
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

  const rightArea: DesktopHeaderType[] = [
    {
      type: "icon",
      display: <FaDocker />,
      menus: [],
    },
    {
      type: "text",
      display: "Denny",
      menus: [],
    },
  ];

  const [collect, setCollect] = useState<MenuConfig | null>(null);

  const [leftActive, setLeftActive] = useState(false);

  const mouseOver = (data: DesktopHeaderType) => (e: MouseEvent) => {
    if (leftActive) {
      setCollect({
        ...data,
        pos: { x: e.currentTarget.getBoundingClientRect().x, y: 24 },
      });
    }
  };

  const myClick = (data: MenuConfig) => (e: MouseEvent) => {
    if (leftActive) {
      setCollect(null);
    } else {
      setCollect({
        ...data,
        pos: { x: e.currentTarget.getBoundingClientRect().x, y: 24 },
      });
    }
  };

  const rightSideClick = (data: MenuConfig) => (e: MouseEvent) => {
    setLeftActive(false);
    setCollect({
      ...data,
    });
  };

  const ref = useRef(null);

  useOnClickOutside(ref, () => {
    setCollect(null);
    setLeftActive(false);
  });

  return (
    <>
      <HeaderLayout ref={ref}>
        <div
          className={`leftarea ${leftActive ? "actived" : ""}`}
          onClick={() => setLeftActive((t) => !t)}
        >
          {leftArea.map((item, index) => {
            const leftyIndex = `lefty-${index}`;
            const ITEMS = { ...item, id: leftyIndex };
            return item.type === "text" ? (
              <div
                key={index}
                className={`textItem ${collect?.id === leftyIndex ? "actived" : ""}`}
                onMouseEnter={mouseOver(ITEMS)}
                onMouseDown={myClick(ITEMS)}
              >
                <div>{item.display}</div>
              </div>
            ) : (
              <div
                key={index}
                className={`iconItem ${collect?.id === leftyIndex ? "actived" : ""}`}
                onMouseEnter={mouseOver(ITEMS)}
                onMouseDown={myClick(ITEMS)}
              >
                {item.display}
              </div>
            );
          })}
        </div>
        <div className="rightarea">
          {rightArea.map((item, index) => {
            const rightyIndex = `righty-${index}`;
            const ITEMS = { ...item, id: rightyIndex };

            return item.type === "text" ? (
              <div
                className={`textItem ${collect?.id === rightyIndex ? "actived" : ""}`}
                onMouseDown={rightSideClick(ITEMS)}
              >
                <div>{item.display}</div>
              </div>
            ) : (
              <div
                className={`iconItem ${collect?.id === rightyIndex ? "actived" : ""}`}
                onMouseDown={rightSideClick(ITEMS)}
              >
                {item.display}
              </div>
            );
          })}
        </div>
      </HeaderLayout>
      <Menu
        open={(collect && collect?.type.length !== 0) || false}
        pos={collect?.pos ?? { x: 0, y: 0 }}
        menus={collect?.menus ?? []}
        type="header"
      />
    </>
  );
}
