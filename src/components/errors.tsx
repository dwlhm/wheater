import { ReactNode } from "react";

export const BasicError = ({
  error,
  children,
  className = ""
}: {
  error: Error;
  children?: ReactNode;
  className?: string;
}) => {
  return (
    <div className={`${className} bg-red-500 border border-solid border-red-900 rounded text-center italic m-2 p-2 flex gap-2`}>
      <p className="flex-grow">{error.message}</p>
      <div>{children}</div>
    </div>
  );
};
