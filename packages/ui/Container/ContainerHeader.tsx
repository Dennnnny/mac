import { MouseEvent, useState } from "react";
import { AiOutlineClose, AiOutlineMinus } from "react-icons/ai";
import { TiArrowUnsorted } from "react-icons/ti";
import styled from "styled-components";
import { RootContainerHeaderLayoutProps } from "utils/types";

const RootContainerHeaderLayout = styled.div.withConfig({
  componentId: "RootContainerHeaderLayout",
})<RootContainerHeaderLayoutProps>`
  box-sizing: border-box;
  width: 100%;
  line-height: 100%;
  display: grid;
  grid-template-columns: 60px 1fr 10%;
  color: #fefefe;
  background-color: #202124;
  border-radius: 0.25rem 0.25rem 0 0;

  div.header-area {
    width: 100%;
    height: 24px;
    position: absolute;
    border-radius: 0.25rem;
    box-sizing: border-box;
    z-index: ${({ press }) => (press ? 1 : -1)};

    ${({ press }) =>
      press &&
      `
        width: 200vw;
        height: 200vh;
        transform: translate(-50%,-50%);
      `};
  }

  div.title {
    text-align: center;
    font-size: 12px;
    padding: 0.25rem 0;
  }
  div.left-area {
    display: flex;
    justify-content: space-evenly;
    align-items: center;
    position: relative;
    z-index: 10;
    :hover,
    :active {
      > .circle svg {
        visibility: visible;
      }
    }

    .circle {
      width: 10px;
      height: 10px;
      border-radius: 50%;
      :active {
        filter: brightness(1.2);
      }

      svg {
        width: 100%;
        height: 100%;
        visibility: hidden;
      }

      &.red {
        background-color: #ff5a53;
        svg {
          transform: translateY(-4px) scale(0.75);
          color: darkred;
        }
      }
      &.yellow {
        background-color: #e6c02a;
        svg {
          transform: translateY(-4px) scale(0.95);
          color: brown;
        }
      }
      &.green {
        background-color: #53c32b;
        svg {
          transform: translateY(-4px) rotate(45deg) scale(0.95);
          color: green;
        }
      }
    }
  }
`;

export default function RootContainerHeader({
  name,
  size = "sm",
  handleDragging,
  handleEnlargeMaximumSize,
}: {
  name: string;
  size?: string;
  handleDragging: Function;
  handleEnlargeMaximumSize: Function;
}) {
  const [press, setPress] = useState(false);
  const [tempPos, setTempPos] = useState({ x: 0, y: 0 });

  return (
    <RootContainerHeaderLayout
      press={press}
      onMouseDown={(e: MouseEvent) => {
        setPress(true);
        setTempPos({ x: e.clientX, y: e.clientY });
      }}
      onDoubleClick={() => handleEnlargeMaximumSize()}
    >
      <div
        className="header-area"
        onMouseUp={() => {
          setPress(false);
        }}
        onMouseMove={(e) => {
          if (press) {
            handleDragging("moving", [tempPos.x - e.clientX, tempPos.y - e.clientY]);
            setTempPos({ x: e.clientX, y: e.clientY });
          }
        }}
        onMouseOut={() => {
          setPress(false);
        }}
      ></div>

      <div className="left-area">
        <div className="circle red">
          <AiOutlineClose />
        </div>
        <div className="circle yellow">
          <AiOutlineMinus />
        </div>
        <div
          className="circle green"
          onClick={() => {
            handleEnlargeMaximumSize();
            setPress(false);
          }}
        >
          <TiArrowUnsorted />
        </div>
      </div>
      <div className="title">{name}</div>
    </RootContainerHeaderLayout>
  );
}
