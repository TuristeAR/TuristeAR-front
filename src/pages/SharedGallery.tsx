import { useParams } from 'react-router-dom';
import useFetchItinerary from '../utilities/useFetchItinerary';
import { Header } from '../components/Header/Header';
import Carousel from '../components/Destinations/Carousel';

export const SharedGallery = () => {
  const { itineraryId } = useParams();
  const { itinerary, activities } = useFetchItinerary(itineraryId || null);

  return (
    <>
      <Header />
      <div className={'flex flex-col gap-10'}>
        {activities.map((activity, index) => (
          <div key={index} className={'flex flex-col gap-4'}>
            <h1 className={'text-3xl'}>{activity.name}</h1>
            <div className={'grid grid-cols-2 col-span-2'}>
              <Carousel>
                {activity.images.map((image, index) => (
                  <img key={index} src={image} alt={'Imagen'} className={'rounded-2xl shadow-[0_10px_25px_-10px_rgba(0,0,0,4)]'}/>
                ))}
              </Carousel>
            </div>
          </div>
        ))}
      </div>
    </>
  );
}