import Image from "next/image";
import { WMO } from "./constant";
import { ReactNode } from "react";

export const WheaterModeToString = (
  wheater_mode: number
): {
  text: string;
  icon: ReactNode;
} => {
  const data = WMO[wheater_mode];
  return {
    text: data.text,
    icon: <Image className="animate-pulse" src={data.icon} alt={data.text} width={150} height={150} />,
  };
};
