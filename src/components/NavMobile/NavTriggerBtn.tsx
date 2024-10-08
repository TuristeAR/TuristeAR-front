export const NavTriggerBtn = ({
  navActive,
  setNavActive,
}: {
  navActive: boolean;
  setNavActive: (active: boolean) => void;
}) => {
  return (
    <button
      onClick={() => setNavActive(!navActive)}
      className="w-8 h-6 md:hidden text-white absolute top-9 right-6 flex items-center justify-center z-[60] outline-none "
    >
      {/* 1 */}
      <span
        className={`w-full h-[1.5px] bg-white absolute left-0 will-change-transform transition-transform duration-300 ${
          navActive ? 'top-1/2 rotate-45' : 'top-0 translate-y-0'
        }`}
      ></span>
      {/* 2 */}
      <span
        className={`w-full h-[1.5px] bg-white absolute left-0 transition-opacity duration-300 ${
          navActive ? 'opacity-0' : 'top-1/2'
        }`}
      ></span>
      {/* 3 */}
      <span
        className={`w-full h-[1.5px] bg-white absolute left-0 will-change-transform transition-transform duration-300 ${
          navActive ? 'top-1/2 -rotate-45' : 'bottom-0 translate-y-0'
        }`}
      ></span>
    </button>
  );
};
