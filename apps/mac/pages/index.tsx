import { useRef, useState, MouseEvent, useEffect, useMemo, useCallback } from "react";
import { checkRectCollision, getRect, handleClickApps, useMouse } from "utils/tool";
import { desktopMenu } from "ui/config/desktop-menus";
import { DesktopContext } from "./_app";
import { AppProps } from "utils/types";
import {
  DesktopHeader,
  DesktopFooter,
  Menu,
  SelectRect,
  DesktopContainer,
  DesktopApp,
} from "ui/Desktop";
import { RootContainer } from "ui/Container/RootContainer";
import Image from "next/image";
import Head from "next/head";

export default function Web() {
  const ref = useRef(null);
  const mouse = useMouse(ref);
  const mousePos = useMemo(() => ({ x: mouse.docX, y: mouse.docY }), [mouse]);

  const [startPos, setStartPos] = useState<{ x: number; y: number } | null>(null);
  const apps = DesktopContext.useSelector((state) => state.context.apps);
  const folders = DesktopContext.useSelector((state) => state.context.folders);
  const footers = DesktopContext.useSelector((state) => state.context.footers);
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

      if (target.matches(".desktop")) {
        send({
          type: "contextMenu.setting",
          pos: mousePos,
          menus: desktopMenu,
        });
      }
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
    <>
      <Head>
        <title>Denny&apos;s Mac clone</title>
      </Head>
      <DesktopContainer ref={ref} onMouseUp={onMouseUpDesktop} onMouseDown={onMouseDownDesktop}>
        <SelectRect startPos={startPos} mouse={mousePos} />
        {folders.map((folder, index) => {
          return (
            <RootContainer
              key={`folder-${index}`}
              defaultPos={folder.pos}
              defaultSize={folder.size}
            >
              <>DEMO FOLDER</>
            </RootContainer>
          );
        })}
        {apps.map((app, index) => {
          return (
            <DesktopApp
              name={app.name}
              key={`${app.name}-${index}`}
              icon={app.icon}
              posX={app.posX}
              posY={app.posY}
              isActived={app.isActived}
              menus={app.menus}
              mousePos={mousePos}
              handleDragging={handleDragging(app)}
              handleAppStatus={() => {
                if (!app.isActived) {
                  send({ type: "app.singleAppFocus", target: app.name });
                }
              }}
              handleDbClick={() => handleClickApps(app)}
            />
          );
        })}
        <DesktopHeader />
        <Menu
          open={contextMenu.open}
          pos={contextMenu.pos}
          menus={contextMenu.menus}
          handleCloseMenu={() => send({ type: "contextMenu.clear" })}
        />
        <DesktopFooter
          isEnabled={!contextMenu.open}
          footers={footers}
          handleActive={(target: string, index: number) => {
            send({ type: "footer.actived", target, index });
          }}
        />
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
    </>
  );
}
