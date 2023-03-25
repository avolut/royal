export const SideMobile = () => {
  return (
    <div
      // className={`fixed inset-0 z-40 flex lg:hidden ${cx(
      //   !lay.mobile.side,
      //   "hidden"
      // )}`}
      role="dialog"
      aria-modal="true"
    >
      <div
        className="fixed inset-0 bg-gray-600 bg-opacity-75"
        aria-hidden="true"
        onClick={() => {
          // lay.mobile.side = false;
          // lay.render();
        }}
      />
      <div className="relative flex flex-col flex-1 w-full max-w-xs pt-5 pb-4 bg-white">
        <div className="absolute top-0 right-0 pt-2 -mr-12">
          <button
            type="button"
            className="flex items-center justify-center w-10 h-10 ml-1 rounded-full focus:outline-none focus:ring-2 focus:ring-inset focus:ring-white"
            onClick={() => {
              // lay.mobile.side = false;
              // lay.render();
            }}
          >
            <span className="sr-only">Close sidebar</span>
            <svg
              className="w-6 h-6 text-white"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              aria-hidden="true"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M6 18L18 6M6 6l12 12"
              />
            </svg>
          </button>
        </div>
        <div className="flex items-center flex-shrink-0 px-4">
          <img className="w-auto h-8" src="/logo-wordmark.svg" alt="Onechat" />
        </div>
        <div className="flex-1 h-0 mt-5 overflow-y-auto">
          <nav className="px-2">
            <div className="space-y-1">
              {/* {lay.menu.map((e) => {
                return <Link e={e} key={e.url} />;
              })} */}
            </div>
          </nav>
        </div>
      </div>
      <div className="flex-shrink-0 w-14" aria-hidden="true">
        {/* Dummy element to force sidebar to shrink to fit close icon */}
      </div>
    </div>
  );
};

// const Link = ({ e }: { e: MenuItem }) => {
//   return (
//     <a
//       href={e.url}
//       className={cx(
//         e.url === location.pathname
//           ? "text-gray-900 bg-gray-200 rounded-md group"
//           : "text-gray-700 rounded-md hover:text-gray-900 hover:bg-gray-50 group",
//         `flex items-center px-2 py-2 text-sm font-medium `
//       )}
//       aria-current="page"
//     >
//       <div
//         className={cx(
//           css`
//             svg {
//               width: 16px;
//               height: 16px;
//             }
//           `,
//           "p-1 pr-2"
//         )}
//       >
//         {e.icon}
//       </div>
//       <span>{e.label}</span>
//     </a>
//   );
// };
