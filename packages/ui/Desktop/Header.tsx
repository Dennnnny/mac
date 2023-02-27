import { useRef, useState } from "react";
import { FaApple, FaDocker } from "react-icons/fa";
import styled from "styled-components";

import { useOnClickOutside } from "utils/tool";
import { HeaderMenu } from "./Menu";

const HeaderLayout = styled.div.withConfig({ componentId: "HeaderLayout" })`
  height: 24px;
  background: #1d1d1f;
  padding: 0 1rem;
  color: #fff;

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
          background-color: #1f4dd7;
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
        background-color: #1f4dd7;
      }
    }
  }
`;

type DesktopHeaderType = {
  type: string;
  display: JSX.Element | string;
  structure?: {};
  iconAlt?: string;
};

export type MenuConfig = {
  posX?: number;
  id?: string;
} & DesktopHeaderType;

export function DesktopHeader() {
  const leftArea: DesktopHeaderType[] = [
    {
      type: "icon",
      display: <FaApple />,
      iconAlt: "apple",
      structure: {},
    },
    {
      type: "text",
      display: "Code",
      structure: {},
    },
    {
      type: "text",
      display: "File",
      structure: {},
    },
    {
      type: "text",
      display: "Edit",
      structure: {},
    },
    {
      type: "text",
      display: "Selection",
      structure: {},
    },
  ];

  const rightArea: DesktopHeaderType[] = [
    {
      type: "icon",
      display: <FaDocker />,
      structure: {},
    },
    {
      type: "text",
      display: "Denny",
      structure: {},
    },
  ];

  const [collect, setCollect] = useState<MenuConfig | null>(null);

  const [leftActive, setLeftActive] = useState(false);

  const mouseOver = (data: any) => (e: any) => {
    if (leftActive) {
      setCollect({ ...data, posX: e.currentTarget.getBoundingClientRect().x });
    }
  };

  const myClick = (data: MenuConfig) => (e: any) => {
    if (leftActive) {
      setCollect(null);
    } else {
      setCollect({ ...data, posX: e.currentTarget.getBoundingClientRect().x });
    }
  };

  const rightSideClick = (data: MenuConfig) => (e: any) => {
    setLeftActive(false);
    setCollect({ ...data, posX: e.currentTarget.getBoundingClientRect().x });
  };

  const ref = useRef(null);

  useOnClickOutside(ref, () => {
    setCollect(null);
    setLeftActive(false);
  });

  return (
    <HeaderLayout ref={ref}>
      <div
        className={`leftarea ${leftActive ? "actived" : ""} `}
        onClick={() => setLeftActive((t) => !t)}
      >
        {leftArea.map((item, index) => {
          const leftyIndex = `lefty-${index}`;
          const ITEMS = { ...item, id: leftyIndex };
          return item.type === "text" ? (
            <div
              key={index}
              className={`textItem ${
                collect?.id === leftyIndex ? "actived" : ""
              }`}
              onMouseEnter={mouseOver(ITEMS)}
              onMouseDown={myClick(ITEMS)}
            >
              <div>{item.display}</div>
            </div>
          ) : (
            <div
              key={index}
              className={`iconItem ${
                collect?.id === leftyIndex ? "actived" : ""
              }`}
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
              className={`textItem ${
                collect?.id === rightyIndex ? "actived" : ""
              }`}
              onMouseDown={rightSideClick(ITEMS)}
            >
              <div>{item.display}</div>
            </div>
          ) : (
            <div
              className={`iconItem ${
                collect?.id === rightyIndex ? "actived" : ""
              }`}
              onMouseDown={rightSideClick(ITEMS)}
            >
              {item.display}
            </div>
          );
        })}
      </div>
      <HeaderMenu
        open={(collect && collect?.type.length !== 0) || false}
        config={collect}
      />
    </HeaderLayout>
  );
}
