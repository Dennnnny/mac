import { useState } from "react";
import styled from "styled-components";
import { RootContainerProps, RootContainerLayoutProps } from "utils/types";
import Border from "./Board";
import { generateNewResize } from "utils/tool";
import Corner from "./Corner";
import RootContainerHeader from "./ContainerHeader";
import { maxLength } from "utils/tool/consts";

const RootContainerLayout = styled.div.withConfig({
  componentId: "RootContainerLayout",
})<RootContainerLayoutProps>`
  position: absolute;
  transform: ${({ pos }) => `translate(${pos?.x ?? 0}px,${pos?.y ?? 0}px)`};
  width: ${({ size }) =>
    typeof size?.width === "number" ? `${size?.width}px` : `${size?.width}` ?? "100px"};
  height: ${({ size }) =>
    typeof size?.height === "number" ? `${size?.height}px` : `${size?.height}` ?? "100px"};
  min-width: ${({ maxLength }) => `${maxLength}px`};
  min-height: ${({ maxLength }) => `${maxLength}px`};
  border: 1px solid #636465;
  border-radius: 0.25rem;
  box-shadow: 0px 0px 15px #080e19;
  z-index: ${({ order }) => (order ? 21 - order! : 21)};

  > .body {
    height: calc(100% - 24px);
    background: #2e2e2e;
    border-radius: 0 0 0.25rem 0.25rem;

    // put some style for now
    /* display: flex;
    justify-content: center;
    align-items: center; */
    color: white;
    overflow: scroll;
  }

  ::before {
  }
`;

export function RootContainer(props: RootContainerProps) {
  const { defaultSize, defaultPos, children, handleFolderAction, order, title } = props;

  const [resizeConfig, setResize] = useState({ pos: defaultPos, size: defaultSize });
  const [isElarge, setIsEnlarge] = useState(false);
  const [tempSizeConfig, setTempSizeCnnfig] = useState<typeof resizeConfig | null>(null);
  const { pos, size } = resizeConfig;

  function handleDragging(type: string, distance: number[]) {
    const { newPos, newSize } = generateNewResize(resizeConfig, type, distance);
    setResize({ pos: newPos, size: newSize });
  }

  function handleEnlargeMaximumSize() {
    if (isElarge) {
      setResize(tempSizeConfig!);
      setIsEnlarge(false);
    } else {
      setResize({
        pos: { x: 1, y: 25 },
        size: { width: window.innerWidth - 1, height: window.innerHeight - 25 },
      });
      setTempSizeCnnfig(resizeConfig);
      setIsEnlarge(true);
    }
  }

  return (
    <RootContainerLayout
      order={order}
      size={size}
      pos={pos}
      maxLength={maxLength}
      onMouseDown={() => {
        handleFolderAction && handleFolderAction!("folder.focus");
      }}
    >
      <Border pos={pos} type="top" size={size} handleDragging={handleDragging} />
      <Border pos={pos} type="right" size={size} handleDragging={handleDragging} />
      <Border pos={pos} type="bottom" size={size} handleDragging={handleDragging} />
      <Border pos={pos} type="left" size={size} handleDragging={handleDragging} />
      <Corner pos={pos} type="left-top" size={size} handleDragging={handleDragging} />
      <Corner pos={pos} type="right-top" size={size} handleDragging={handleDragging} />
      <Corner pos={pos} type="left-bottom" size={size} handleDragging={handleDragging} />
      <Corner pos={pos} type="right-bottom" size={size} handleDragging={handleDragging} />
      <RootContainerHeader
        name={title || "文件夾"}
        handleDragging={handleDragging}
        handleEnlargeMaximumSize={handleEnlargeMaximumSize}
        handleFolderAction={handleFolderAction}
      />
      <div className="body">{children}</div>
    </RootContainerLayout>
  );
}
