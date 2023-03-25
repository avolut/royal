import { FC, ReactNode } from "react";

export const Loading: FC<{ children?: ReactNode }> = ({ children }) => {
  return (
    <>
      <div
        className="flex w-full h-full fixed items-center z-40 bg-gray-100 opacity-30"
        onContextMenuCapture={(e) => {
          e.preventDefault();
        }}
      ></div>
      <div
        onContextMenuCapture={(e) => {
          e.preventDefault();
        }}
        className="flex w-full h-full absolute items-center justify-center z-40"
      >
        <div className="flex items-center justify-center flex-col space-y-2">
          <div className="relative w-100 mx-auto z-50 bg-white px-3 py-1 rounded-lg">
            Loading...
          </div>
          <div className="text-sm">{children}</div>
        </div>
      </div>
    </>
  );
};
