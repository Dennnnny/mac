import { MouseEvent, useRef, useState } from "react";
import styled from "styled-components";

import { useOnClickOutside } from "utils/tool";
import { DesktopHeaderType } from "utils/types";
import { headerLeftArea, headerRightArea } from "../config/header-menus";
import { Menu } from "./Menu";

const HeaderLayout = styled.div.withConfig({ componentId: "HeaderLayout" })`
  div.header {
    height: 24px;
    background: #181d26;
    padding: 0 0 0 1rem;
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
      .textItem,
      .actionItem {
        cursor: default;
        display: flex;
        align-items: center;
        padding: 1px 6px;
        box-sizing: border-box;
        height: 100%;

        &.actived {
          background-color: #0661cb;
        }
        &:active {
          background-color: #0661cb;
        }
      }
    }
  }
`;

export type MenuConfig = {
  pos?: { x: number; y: number };
  id?: string;
  index?: number;
} & DesktopHeaderType;

export function DesktopHeader() {
  const [collect, setCollect] = useState<MenuConfig | null>(null);

  const [leftActive, setLeftActive] = useState(false);

  const mouseOver = (data: DesktopHeaderType, index: number) => (e: MouseEvent) => {
    if (leftActive) {
      setCollect({
        ...data,
        pos: { x: e.currentTarget.getBoundingClientRect().x, y: 24 },
        index,
      });
    }
  };

  const myClick = (data: MenuConfig, index: number) => (e: MouseEvent) => {
    if (leftActive) {
      setCollect(null);
    } else {
      setCollect({
        ...data,
        pos: { x: e.currentTarget.getBoundingClientRect().x, y: 24 },
        index,
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
    <HeaderLayout ref={ref}>
      <div className="header">
        <div
          className={`leftarea ${leftActive ? "actived" : ""}`}
          onClick={() => setLeftActive((t) => !t)}
        >
          {headerLeftArea.map((item, index) => {
            const leftyIndex = `lefty-${index}`;
            const ITEMS = { ...item, id: leftyIndex };
            return item.type === "text" ? (
              <div
                key={leftyIndex}
                className={`textItem ${collect?.id === leftyIndex ? "actived" : ""}`}
                onMouseEnter={mouseOver(ITEMS, index)}
                onMouseDown={myClick(ITEMS, index)}
              >
                <>{item.display}</>
              </div>
            ) : (
              <div
                key={leftyIndex}
                className={`iconItem ${collect?.id === leftyIndex ? "actived" : ""}`}
                onMouseEnter={mouseOver(ITEMS, index)}
                onMouseDown={myClick(ITEMS, index)}
              >
                <>{item.display}</>
              </div>
            );
          })}
        </div>
        <div className="rightarea">
          {headerRightArea.map((item, index) => {
            const rightyIndex = `righty-${index}`;
            const ITEMS = { ...item, id: rightyIndex };

            return item.type === "action" ? (
              <div key={rightyIndex} className={`actionItem`} onClick={rightSideClick(ITEMS)}>
                <>{item.display}</>
              </div>
            ) : (
              <div
                key={rightyIndex}
                className={`iconItem ${collect?.id === rightyIndex ? "actived" : ""}`}
                onMouseDown={rightSideClick(ITEMS)}
              >
                <>{item.display}</>
              </div>
            );
          })}
        </div>
      </div>
      <Menu
        open={(collect && collect?.type.length !== 0) || false}
        pos={collect?.pos ?? { x: 0, y: 0 }}
        menus={collect?.menus ?? []}
        index={collect?.index}
        type="header"
        handleCloseMenu={() => {
          setCollect(null);
          setLeftActive(false);
        }}
      />
    </HeaderLayout>
  );
}
