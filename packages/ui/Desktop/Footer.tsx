import styled from "styled-components";
import Image from "next/image";
import { useEffect, useRef, useState } from "react";
import { DesktopFooterProps, FooterType, MenuItemValueType } from "utils/types";
import { Menu } from "./Menu";

type FooterLayoutProps = {
  isEnabled: boolean;
  shouldOpen: boolean;
};

function footerActions(item: FooterType | MenuItemValueType) {
  switch (item.type) {
    case "link":
      return item.url;
    case "folder":
      return item.target;
    default:
      return "";
  }
}

const FooterLayout = styled.div.withConfig({ componentId: "FooterLayout" })<FooterLayoutProps>`
  width: 100%;
  display: flex;
  justify-content: center;
  position: absolute;
  bottom: ${({ shouldOpen }) => (shouldOpen ? "0" : "-3.95rem")};
  transition: bottom 0.2s linear;

  ${({ isEnabled }) =>
    isEnabled
      ? `
        :hover {
          bottom: 0;
          > .footer-container {
              border-color: #44505e;
            }
        };
      `
      : ""};

  div.footer-container {
    bottom: -3.9rem;
    height: 4rem;
    border: 1px solid ${({ shouldOpen }) => (shouldOpen ? "#44505e" : "transparent")};
    display: flex;
    gap: 0.5rem;
    background: transparent;
    backdrop-filter: blur(30px);
    border-radius: 0.3rem 0.3rem 0 0;
    padding: 0.5rem 0.5rem 0.75rem 0.5rem;
    box-sizing: border-box;
    transition: all 0.2s linear;
    z-index: 100;

    > div.footer-item {
      position: relative;
      display: flex;
      justify-content: center;
      align-items: center;
      text-align: center;
      width: 40px;

      &.jump {
        animation: jumping 1s cubic-bezier(0.35, 0.15, 0.25, 0.95) 2;
      }

      .footer-icon {
        width: 100%;
        height: 100%;
      }

      .footer-title {
        position: absolute;
        top: -3rem;
        width: max-content;
        border: 1px solid #4b4b4b;
        padding: 0.3rem 1rem;
        display: none;
        background: #2b2b2b;
        color: #fff;
        border-radius: 0.2rem;
        font-size: 0.75rem;

        ::after {
          content: "";
          position: absolute;
          width: 10px;
          height: 10px;
          bottom: -6px;
          left: 50%;
          border: 1px solid #4b4b4b;
          transform: translate(-50%) rotate(45deg);
          border-top: 1px solid red;
          border-left: 1px solid red;
          clip-path: polygon(100% 0, 0 100%, 100% 100%);
          background: #2b2b2b;
          border-radius: 0 0 0.15rem 0;
        }
      }

      :hover {
        > div.footer-title:not(.not-hover) {
          display: block;
        }
      }

      &.actived {
        ::after {
          content: "";
          width: 0.25rem;
          height: 0.25rem;
          border-radius: 50%;
          background: #ccc;
          position: absolute;
          top: 100%;
          transform: translateY(100%);
        }
      }
    }
  }

  @keyframes jumping {
    0% {
      transform: translateY(0%);
    }
    50% {
      transform: translateY(-50%);
    }
    100% {
      transform: translateY(0%);
    }
  }
`;

export function DesktopFooter({
  footers,
  handleActive,
  isEnabled,
  handleAction,
}: DesktopFooterProps) {
  const [footerMenu, setFooterMenu] = useState<(FooterType & { index: number }) | null>(null);
  const [animateIcons, setAnimateIcons] = useState<FooterType[]>([]);

  const isFooterMenuExist = footerMenu !== null;

  const timerId = useRef<NodeJS.Timeout | null>(null);

  const handleFooterClick = (
    footer: FooterType,
    index: number,
    clickOnFooterMenu: boolean = false
  ) => {
    setAnimateIcons((prev) => {
      const prevArrayTitle = prev.map((footer) => footer.title);
      if (prevArrayTitle.includes(footer.title)) return [...prev];
      return [...prev, footer];
    });

    timerId.current = setTimeout(() => {
      handleActive(footer.title, index);
      handleAction(footer.type, footerActions(footer));
      clickOnFooterMenu && setFooterMenu(null);
    }, 2000);
  };

  useEffect(() => {
    return () => {
      if (timerId.current !== null) {
        clearTimeout(timerId.current);
      }
    };
  }, []);

  return (
    <FooterLayout isEnabled={isEnabled} shouldOpen={isFooterMenuExist}>
      <div className="footer-container belong-footer">
        {footers.map((footer, index) => {
          return (
            <div
              key={index}
              className={`footer-item belong-footer ${footer.isActived ? "actived" : ""} ${
                animateIcons.map((item) => item.title).includes(footer.title) ? "jump" : ""
              }`}
              onClick={() => {
                footer.isActived
                  ? handleAction(footer.type, footerActions(footer))
                  : handleFooterClick(footer, index);
              }}
              onContextMenu={(e) => {
                setFooterMenu({ ...footer, index });
              }}
            >
              <div className={`footer-title ${isFooterMenuExist ? "not-hover" : "hover"}`}>
                {footer.title}
              </div>
              <div className="footer-icon">
                <Image
                  className="belong-footer"
                  fill={true}
                  src={footer.icon}
                  alt={`${footer.title}-icon`}
                />
              </div>
            </div>
          );
        })}
        <Menu
          menus={footerMenu?.menus}
          open={isFooterMenuExist}
          pos={{ x: (footerMenu?.index ?? 0) * 48, y: 0 }}
          handleCloseMenu={() => {
            setFooterMenu(null);
          }}
          handleAction={(item: MenuItemValueType) => {
            // item.type link | folder | actions?
            footerMenu?.isActived
              ? (handleAction(item.type, footerActions(item)), setFooterMenu(null))
              : handleFooterClick(footerMenu!, footerMenu!.index, true);
          }}
          type="footer"
        />
      </div>
    </FooterLayout>
  );
}
