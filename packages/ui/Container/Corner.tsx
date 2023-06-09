import { MouseEvent, useState } from "react";
import styled from "styled-components";
import { getDistance } from "utils/tool";
import { maxLength } from "utils/tool/consts";
import { CornerProps, CornerLayoutProps } from "utils/types";

const cornerStyles = (width: number = 0, height: number = 0) => ({
  translate: {
    "left-top": ["0px", "0px"],
    "right-top": [`${width - 5}px`, "0px"],
    "left-bottom": ["0px", `${height - 5}px`],
    "right-bottom": [`${width - 5}px`, `${height - 5}px`],
  },
  cursor: {
    "left-top": "nwse-resize",
    "right-top": "nesw-resize",
    "left-bottom": "nesw-resize",
    "right-bottom": "nwse-resize",
  },
});

const CornerLayout = styled.div.withConfig({ componentId: "CornerLayout" })<CornerLayoutProps>`
  width: 6px;
  height: 6px;
  position: absolute;
  z-index: 20;

  ${({ type, size }) => `
    transform: translate(${cornerStyles(size!.width, size!.height).translate[type]});
    :hover {
      cursor: ${cornerStyles().cursor[type] ?? ""};
    }
  `};

  ${({ press }) =>
    press
      ? `
          width: 200vw;
          height: 200vh;
          transform: translate(-50%,-50%);
        `
      : ""};
`;

export default function Corner({ type, size, pos, handleDragging }: CornerProps) {
  const [press, setPress] = useState(false);
  return (
    <CornerLayout
      type={type}
      size={size}
      press={press}
      onMouseDown={() => {
        setPress(true);
      }}
      onMouseMove={(e: MouseEvent) => {
        if (press) {
          const [distanceX, distanceY] = getDistance({ e, type, size, pos });

          if (size.height + distanceY < maxLength || size.width + distanceX < maxLength) {
            const newDistance =
              size.height + distanceY < maxLength && size.width + distanceX < maxLength
                ? [0, 0]
                : size.height + distanceY < maxLength
                ? [distanceX, 0]
                : [0, distanceY];

            handleDragging!(type, newDistance);
            return;
          }

          // if (pos.y + distanceY < 24 || pos.x + distanceX <= 0) {
          //   console.log("2");

          //   handleDragging!(type, pos.y + distanceY < 24 ? [distanceX, 0 - 3] : [-3, distanceY]);
          //   return;
          // }

          handleDragging!(type, [distanceX, distanceY]);
        }
      }}
      onMouseOut={() => {
        setPress(false);
      }}
      onMouseUp={() => {
        setPress(false);
      }}
    />
  );
}
