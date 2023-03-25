import { page } from "web-init";

export default page({
  url: "/login",
  component: ({}) => {
    return (
      <>
        <div
          className={cx(
            "min-h-full flex-1 flex flex-col justify-center sm:px-6 lg:px-0 w-full bg-[#9B4AAF] bg-cover bg-right "
          )}
        >
          Hello World
        </div>
      </>
    );
  },
});
