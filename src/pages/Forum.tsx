import { Header } from '../components/Header';
import LeftCommunity from '../components/LeftCommunity';
import RightCommunity from '../components/RightCommunity';
import React from 'react';
import ImageGallery from '../components/ImageGallery';
import CreatePost from '../components/CreatePost';

const infoComments=[
  {
    user : "Camila Ibarra",
    day : "25 sep 2024",
    comment: 'Lorem, ipsum dolor sit amet consectetur adipisicing elit. Esse corrupti laborum possimus' +
      ' ad eligendi iusto, perferendis atque accusantium consequatur facere.',
    imgPerson: "/assets/person.svg",
    imgs:[]
  },
  {
    user : "Abigail Suriani",
    day : "25 sep 2024",
    comment: 'Lorem, ipsum dolor sit amet consectetur adipisicing elit. Esse corrupti laborum possimus' +
      ' ad eligendi iusto, perferendis atque accusantium consequatur facere.',
    imgPerson: "/assets/person.svg",
    imgs:[
      {id : 1, src : "/assets/san-nicolas-buenos-aires.webp" },
      {id : 2, src : "/assets/san-nicolas-buenos-aires.webp" },
      {id : 3, src : "/assets/san-nicolas-buenos-aires.webp" },
    ]
  },
  {
    user : "Abigail Suriani",
    day : "25 sep 2024",
    comment: 'Lorem, ipsum dolor sit amet consectetur adipisicing elit. Esse corrupti laborum possimus' +
      ' ad eligendi iusto, perferendis atque accusantium consequatur facere.',
    imgPerson: "/assets/person.svg",
    imgs:[
      {id : 1, src : "/assets/san-nicolas-buenos-aires.webp" },
      {id : 2, src : "/assets/san-nicolas-buenos-aires.webp" },
      {id : 3, src : "/assets/san-nicolas-buenos-aires.webp" },
    ]
  }
]

const Forum = () => {
  return (
    <>
      <Header containerStyles={'bg-primary relative top-0 z-[60]'} />
      <div className="flex justify-between h-[160vh] ">
        <LeftCommunity />
        <div className="w-[64%] p-10 overflow-scroll ">
          <div className="border border-[#999999] rounded-3xl flex flex-col gap-y-6">
            {infoComments.map((info, index) => {
              return (
                <>
                  <div key={index} className="flex p-4">
                    <div className="w-[10%]">
                      <img src={info.imgPerson} alt="Person" />
                    </div>
                    <div className="w-[90%] flex flex-col gap-4">
                      <div className="flex justify-between items-center text-[#999999] text-xl">
                        <p>{info.user}</p>
                        <p>{info.day}</p>
                      </div>
                      <p>
                        {info.comment}
                      </p>
                      <ImageGallery images={info.imgs} />
                    </div>
                  </div>
                </>
              )
            })}
            <div className="border border-black rounded-b-3xl">
              <CreatePost />
            </div>

          </div>
        </div>
        <RightCommunity />
      </div>
    </>
  );
};

export default Forum;
