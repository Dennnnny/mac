import { useRef, useState, MouseEvent, useEffect, useMemo } from "react";
import { checkRectCollision, getRect, useMouse } from "utils/tool";
import { Button, SelectRect, DesktopContainer, DesktopApp } from "ui";
import { DesktopContext } from "./_app";
import { AppProps } from "utils/types";

export default function Web() {
  const ref = useRef(null);
  const mouse = useMouse(ref);
  const mousePos = useMemo(() => ({ x: mouse.docX, y: mouse.docY }), [mouse]);

  const [startPos, setStartPos] = useState<{ x: number; y: number } | null>(
    null
  );
  const apps = DesktopContext.useSelector((state) => state.context.apps);
  const [state, send] = DesktopContext.useActor();

  const currentMovement = DesktopContext.useSelector(
    (state) => state.context.currentMovement
  );

  useEffect(() => {
    if (!startPos) return;

    const deaktopSelectRange = getRect({ start: startPos, end: mousePos });
    apps.forEach((app) => {
      const appRange = getRect({
        start: { x: app.posX, y: app.posY },
        end: { x: app.posX + 50, y: app.posY + 50 },
      });
      const isCollision = checkRectCollision(appRange, deaktopSelectRange);
      if (isCollision && !app.isActived) {
        send({ type: "app.focus", target: app.name });
      } else if (!isCollision && app.isActived) {
        send({ type: "app.unfocus", target: app.name });
      }
    });
  }, [mousePos, startPos, apps, send]);

  function onMouseDownDesktop(e: MouseEvent<HTMLDivElement>) {
    if (e.target === e.currentTarget) {
      setStartPos(() => mousePos);
      send({ type: "app.unfocusAll" });
    }
  }

  function onMouseUpDesktop(e: MouseEvent<HTMLDivElement>) {
    setStartPos(() => null);
  }

  function handleDragging(app: AppProps): (e: MouseEvent<HTMLElement>) => void {
    return (e: MouseEvent<HTMLElement>) => {
      if (e.type === "dragstart") {
        const tempX = e.clientX - app.posX;
        const tempY = e.clientY - app.posY;

        send({ type: "app.moving", tempX, tempY });
      }

      if (e.type === "dragend" && currentMovement != null) {
        const dX = e.clientX - currentMovement.x - app.posX;
        const dY = e.clientY - currentMovement.y - app.posY;

        send({
          type: "app.placed",
          dX,
          dY,
        });
      }
    };
  }

  return (
    <DesktopContainer
      ref={ref}
      onMouseUp={onMouseUpDesktop}
      onMouseDown={onMouseDownDesktop}
    >
      <SelectRect startPos={startPos} mouse={mousePos} />
      {apps.map((app, index) => {
        return (
          <DesktopApp
            name={app.name}
            key={`${app.name}-${index}`}
            posX={app.posX}
            posY={app.posY}
            isActived={app.isActived}
            handleDragging={handleDragging(app)}
            handleAppStatus={() => {
              send({ type: "app.focus", target: app.name });
            }}
          />
        );
      })}

      <h1>Web</h1>
      <Button />
    </DesktopContainer>
  );
}
