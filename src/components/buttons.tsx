import { MouseEventHandler, ReactNode } from "react";

export const BasicButton = ({
  className = "",
  children,
  ...props
}: {
  onClick: MouseEventHandler<HTMLButtonElement>;
  children: ReactNode;
  className?: string;
}) => {
  return <button onClick={props.onClick} className={`${className} transition bg-white rounded px-2 hover:bg-white/70`}>{children}</button>;
};
