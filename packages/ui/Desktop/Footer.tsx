import styled from "styled-components";
import { MenuItemType } from "utils/types";
import Image from "next/image";

const FooterLayout = styled.div.withConfig({ componentId: "FooterLayout" })`
  width: 100%;
  display: flex;
  justify-content: center;
  position: absolute;
  bottom: -3.95rem;
  transition: bottom 0.2s linear;

  :hover {
    bottom: 0;
    > .footer-container {
      border-color: #44505e;
    }
  }

  div.footer-container {
    bottom: -3.9rem;
    height: 4rem;
    border: 1px solid transparent;
    display: flex;
    gap: 0.5rem;
    background: transparent;
    backdrop-filter: blur(30px);
    border-radius: 0.3rem 0.3rem 0 0;
    padding: 0.5rem 0.5rem 0.75rem 0.5rem;
    box-sizing: border-box;
    transition: all 0.2s linear;
  }

  div.footer-item {
    position: relative;
    display: flex;
    justify-content: center;
    align-items: center;
    text-align: center;
    width: 40px;

    .app-icon {
      width: 100%;
      height: 100%;
    }

    .app-title {
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
      > div.app-title {
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
`;

type FooterType = {
  title: string;
  icon: string;
  menus: MenuItemType[];
  isActived: boolean;
};
const mockFooter: FooterType[] = [
  {
    title: "Finder",
    icon: "/finder.svg",
    menus: [],
    isActived: false,
  },
  {
    title: "Safari",
    icon: "/safari.svg",
    menus: [],
    isActived: false,
  },
  {
    title: "Docker",
    icon: "/docker.svg",
    menus: [],
    isActived: false,
  },
  {
    title: "Firefox",
    icon: "/firefox.svg",
    menus: [],
    isActived: true,
  },
  {
    title: "Chrome",
    icon: "/chrome.svg",
    menus: [],
    isActived: false,
  },
  { title: "Slack", icon: "/slack.svg", menus: [], isActived: true },
  {
    title: "YouTube",
    icon: "/youtube.svg",
    menus: [],
    isActived: true,
  },
  {
    title: "Linkedin",
    icon: "/linkedin.svg",
    menus: [],
    isActived: false,
  },
  {
    title: "GitHub",
    icon: "/github.svg",
    menus: [],
    isActived: false,
  },
  {
    title: "App Stores",
    icon: "/app-store.svg",
    menus: [],
    isActived: false,
  },
  {
    title: "系統偏好設定",
    icon: "/setting.svg",
    menus: [],
    isActived: false,
  },
  {
    title: "Visual Studio Code",
    icon: "/vscode.svg",
    menus: [],
    isActived: false,
  },
  {
    title: "終端機",
    icon: "/terminal.svg",
    menus: [],
    isActived: false,
  },
  {
    title: "垃圾桶",
    icon: "/trashcan.svg",
    menus: [],
    isActived: false,
  },
];

export function DesktopFooter() {
  return (
    <FooterLayout>
      <div className="footer-container belong-footer">
        {mockFooter.map((app, index) => {
          return (
            <div
              key={index}
              className={`footer-item belong-footer ${app.isActived ? "actived" : ""}`}
            >
              <div className="app-title ">{app.title}</div>
              <div className="app-icon">
                <Image
                  className="belong-footer"
                  fill={true}
                  src={app.icon}
                  alt={`${app.title}-icon`}
                />
              </div>
            </div>
          );
        })}
      </div>
    </FooterLayout>
  );
}

function FooterIcon() {
  return <div>{/* {icons()} */}</div>;
}
