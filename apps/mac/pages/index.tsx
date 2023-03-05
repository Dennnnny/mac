import { useRef, useState, MouseEvent, useEffect, useMemo, useCallback } from "react";
import { checkRectCollision, getRect, useMouse } from "utils/tool";
import { SelectRect, DesktopContainer, DesktopApp } from "ui";
import { Menu, mockMenus } from "ui/Desktop/Menu";
import { DesktopContext } from "./_app";
import { AppProps } from "utils/types";
import { DesktopHeader } from "ui/Desktop/Header";
import { DesktopFooter } from "ui/Desktop/Footer";
import Image from "next/image";

export default function Web() {
  const ref = useRef(null);
  const mouse = useMouse(ref);
  const mousePos = useMemo(() => ({ x: mouse.docX, y: mouse.docY }), [mouse]);

  const [startPos, setStartPos] = useState<{ x: number; y: number } | null>(null);
  const apps = DesktopContext.useSelector((state) => state.context.apps);
  const contextMenu = DesktopContext.useSelector((state) => state.context.contextMenu);
  const [state, send] = DesktopContext.useActor();

  const currentMovement = DesktopContext.useSelector((state) => state.context.currentMovement);

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

  const handleContextMenu = useCallback(
    (event: Event) => {
      event.preventDefault();
      const target = event.target as Element;
      if (target?.matches(".HeaderLayout") || target?.matches(".belong-footer")) return;
      send({
        type: "contextMenu.setting",
        pos: mousePos,
        menus: mockMenus,
      });
    },
    [mousePos, send]
  );

  useEffect(() => {
    document.addEventListener("contextmenu", handleContextMenu);
    return () => {
      document.removeEventListener("contextmenu", handleContextMenu);
    };
  }, [handleContextMenu]);

  function onMouseDownDesktop(e: MouseEvent<HTMLDivElement>) {
    const target = e.target as Element;
    if (target === e.currentTarget) {
      setStartPos(() => mousePos);
      send({ type: "app.unfocusAll" });
    }

    if (!target.parentElement?.matches(".belong-menu")) {
      send({ type: "contextMenu.clear" });
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
    <DesktopContainer ref={ref} onMouseUp={onMouseUpDesktop} onMouseDown={onMouseDownDesktop}>
      <SelectRect startPos={startPos} mouse={mousePos} />
      {apps.map((app, index) => {
        return (
          <DesktopApp
            name={app.name}
            key={`${app.name}-${index}`}
            icon={app.icon}
            posX={app.posX}
            posY={app.posY}
            isActived={app.isActived}
            handleDragging={handleDragging(app)}
            handleAppStatus={() => {
              if (!app.isActived) {
                send({ type: "app.singleAppFocus", target: app.name });
              }
            }}
          />
        );
      })}
      <DesktopHeader />
      <Menu open={contextMenu.open} pos={contextMenu.pos} menus={contextMenu.menus} />
      <DesktopFooter />
      <Image
        src="/bg.jpeg"
        alt="background"
        fill={true}
        loading="eager"
        style={{
          objectFit: "cover",
          objectPosition: "center",
          zIndex: -1,
          pointerEvents: "none",
        }}
      />
    </DesktopContainer>
  );
}
