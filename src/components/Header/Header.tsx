import { useState } from 'react';
import { NavMobile } from '../NavMobile/NavMobile';
import { Nav } from '../Nav/Nav';
import { NavTriggerBtn } from '../NavMobile/NavTriggerBtn';

export const Header = ({ containerStyles }: { containerStyles: any }) => {
  const [navActive, setNavActive] = useState(false);

  return (
    <>
      <header className={`${containerStyles} w-full text-gray-600 body-font`}>
        <div className="container mx-auto flex flex-wrap p-5 md:flex-row items-center justify-between">
          {navActive ? <NavMobile /> : <Nav />}
          <NavTriggerBtn navActive={navActive} setNavActive={setNavActive} />
        </div>
      </header>
    </>
  );
};
