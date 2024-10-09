import { useState } from 'react';
import { NavMobile } from '../NavMobile/NavMobile';
import { Nav } from '../Nav/Nav';
import { NavTriggerBtn } from '../NavMobile/NavTriggerBtn';

export const Header = ( { containerStyles, isHome }: { containerStyles?: any , isHome?: boolean}) => {
  const [navActive, setNavActive] = useState(false);
  const backgroundClass = isHome ? 'bg-transparent' : 'bg-custom-gray';
  return (
    <>
      <header className={`w-full text-gray-600 body-font ${containerStyles}  ${backgroundClass}`}>
        <div className="container mx-auto relative flex flex-wrap p-2 md:flex-row items-center justify-between">
          {navActive ? <NavMobile /> : <Nav />}
          <NavTriggerBtn navActive={navActive} setNavActive={setNavActive} />
        </div>
      </header>
    </>
  );
};
