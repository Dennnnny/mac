import { FiUmbrella } from "react-icons/fi";
import { IoBatteryChargingOutline } from "react-icons/io5";
import Image from "next/image";
import { MdList } from "react-icons/md";

export const UmbrellaIcon = () => (
  <div style={{ transform: `rotate(-45deg) translateY(2px)` }}>
    <FiUmbrella />
  </div>
);

export const Battery = () => (
  <div style={{ display: "flex", alignItems: "center" }}>
    <span style={{ fontSize: "12px", marginRight: "0.2rem" }}>97%</span>
    <IoBatteryChargingOutline size={24} />
  </div>
);

export const LetterA = () => (
  <div
    style={{
      width: "16px",
      height: "16px",
      lineHeight: "16px",
      borderRadius: "0.15rem",
      background: "white",
      color: "#181d26",
      fontSize: "13px",
      fontFamily: "sans-serif",
      textAlign: "center",
    }}
  >
    A
  </div>
);

export const DateAndTime = () => {
  const weekday = new Intl.DateTimeFormat("cn", { weekday: "short" }).format(new Date());
  const time = new Intl.DateTimeFormat("cn", { timeStyle: "short" }).format(new Date());
  return (
    <div style={{ fontSize: "14px" }}>
      {weekday} {time}
    </div>
  );
};

export const Siri = () => (
  <Image alt="siri" src="/siri.png" width={18} height={18} style={{ pointerEvents: "none" }} />
);

export const HeaderDrawer = () => <MdList size={24} style={{ paddingRight: "1rem" }} />;
