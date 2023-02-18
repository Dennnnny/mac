import { useRef, useState, MouseEvent } from "react";
import { useMouse } from "utils/tool";
import { Button, SelectRect, DesktopContainer, DesktopApp } from "ui";
import { DesktopContext } from "./_app";
export default function Web() {
  const ref = useRef(null);
  const mouse = useMouse(ref);
  const [startPos, setStartPos] = useState<{ x: number; y: number } | null>(
    null
  );
  const apps = DesktopContext.useSelector((state) => state.context.apps);
  function onMouseDownDesktop(e: MouseEvent<HTMLDivElement>) {
    console.log(e.target, e.currentTarget, e.target === e.currentTarget);
    if (e.target === e.currentTarget) {
      setStartPos(() => ({ x: mouse.docX, y: mouse.docY }));
    }
  }
  // console.log({ apps });
  function onMouseUpDesktop(e: MouseEvent<HTMLDivElement>) {
    setStartPos(() => null);
  }

  function handleDrag(e: MouseEvent<HTMLElement>) {
    // e.preventDefault();
    console.log(e.type);

    if (e.type === "dragstart") {
      console.log("s", { e });
    }
  }

  function handleDragEnd(e: MouseEvent<HTMLElement>) {
    e.preventDefault();
    console.log(e.type);

    if (e.type === "dragend") {
      console.log("end", { e });
    }
  }

  return (
    <DesktopContainer
      ref={ref}
      onMouseUp={onMouseUpDesktop}
      onMouseDown={onMouseDownDesktop}
      onDragStart={handleDrag}
      onDragEnd={handleDragEnd}
      // onMouseMove={handleDragOver}
    >
      <SelectRect
        startPos={startPos}
        mouse={{ x: mouse.docX, y: mouse.docY }}
      />
      {apps.map((app, index) => {
        return (
          <DesktopApp
            name={app.name}
            key={`${app.name}-${index}`}
            posX={`${app.position.x}`}
            posY={`${app.position.y}`}
            startPos={startPos}
            mouse={{ x: mouse.docX, y: mouse.docY }}
            handleDragging={() => {
              console.log("dragging");
              // return false;
            }}
            // handleApp={}
          />
        );
      })}

      <h1>Web</h1>
      <Button />
    </DesktopContainer>
  );
}
