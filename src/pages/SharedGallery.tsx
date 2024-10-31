import { useParams } from 'react-router-dom';
import useFetchItinerary from '../utilities/useFetchItinerary';
import { Header } from '../components/Header/Header';
import Carousel from '../components/Destinations/Carousel';
import { FeaturedImageGalleryModal } from '../components/GalleryViewer/GalleryViewer';
import React, { useState } from 'react';
import { ImageGallery } from '../components/ImageGallery/ImageGallery';

export const SharedGallery = () => {
  const { itineraryId } = useParams();
  const { itinerary, activities } = useFetchItinerary(itineraryId || null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const closeModal = () => {
    setIsModalOpen(false);
  };

  return (
    <>
      <Header />
      <div className={'flex flex-col gap-10'}>
        {activities.map((activity, index) => (
          <div key={index} className={'flex flex-col gap-4'}>
            <h1 className={'text-3xl'}>{activity.name}</h1>
            <div className={''}>
              <div onClick={() => setIsModalOpen(true)}>
                {activity.images.length > 0 ? (
                  <ImageGallery images={activity.images} height={70}></ImageGallery>
                ) : (
                  ''
                )}
              </div>
              {isModalOpen && (
                <FeaturedImageGalleryModal closeModal={closeModal} photos={activity.images} />
              )}
            </div>
          </div>
        ))}
      </div>
    </>
  );
}