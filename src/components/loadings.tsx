import { ReactNode } from "react";

export const BasicLoading = ({ children }: { children?: ReactNode }) => {
  return (
    <p className="animate-pulse text-center italic m-2 p-2 bg-white rounded">
      {children || `loading ...`}
    </p>
  );
};
