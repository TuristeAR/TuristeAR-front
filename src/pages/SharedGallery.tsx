import { useParams } from 'react-router-dom';
import useFetchItinerary from '../utilities/useFetchItinerary';
import { Header } from '../components/Header/Header';
import Carousel from '../components/Destinations/Carousel';
import { UploadImageSharedGallery } from '../components/ItineraryCalendar/UploadImageSharedGallery';

export const SharedGallery = () => {
  const { itineraryId } = useParams();
  const { itinerary, activities } = useFetchItinerary(itineraryId || null);

  return (
    <>
      <Header />
      <UploadImageSharedGallery activities={activities} />

      <div className="border-b pb-2 border-gray-50 ">
        <h2 className="text-xl font-bold text-primary-3">{itinerary?.name}</h2>
      </div>
      <div className={'flex flex-col gap-10'}>
        {activities.map((activity, index) => (
          <details key={index} className={'flex flex-col gap-4'}>
            <summary className={'text-xl text-primary-3'}>{activity.name}</summary>
            <div className={'grid grid-cols-3 col-span-2'}>
              <div></div>
              <div className="rounded-2xl shadow-[0_10px_25px_-10px_rgba(0,0,0,4)]">
                <Carousel>
                  {activity.images.map((image, index) => (
                    <img key={index} src={image} alt={'Imagen'}
                         className={'rounded-2xl'} />
                  ))}
                </Carousel>
              </div>
            </div>
          </details>
        ))}
      </div>
    </>
  );
}