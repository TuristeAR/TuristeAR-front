import { Header } from '../components/Header/Header';
import { LeftCommunity } from '../components/Community/LeftCommunity';

import { CreatePublications } from '../components/Community/CreatePublications';
import { ItineraryCard } from '../components/ImageGallery/ItineraryCard';

export const Jobs = () => {
  return (
    <>
      <Header containerStyles={' relative top-0 z-[60]'} />
      <div className="flex justify-between h-[160vh] ">
        <LeftCommunity vista={'jobs'} activeItem={'posts'} categorySelected={null} handleClick={null} setCategorySelected={null} />
        <div className="lg:w-[80%] pt-10 pb-10 overflow-scroll scrollbar-hidden ">
          <div className="lg:w-[80%] w-[90%] mx-auto rounded-xl mb-10 shadow-[0_10px_25px_-10px_rgba(0,0,0,4)] ">
            <CreatePublications />
          </div>
          <div className="flex flex-col gap-6 lg:w-[80%] w-[90%] mx-auto" >

          </div>
        </div>
      </div>
    </>
  );
};
