import { Link } from 'react-router-dom';
import { ArticleCard } from '../Destinations/ArticleCard';

const PlaceList = ({ places }) => {
  return (
    <section className="">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {Array.isArray(places) &&
            places.map((place, index) => (
              <Link to={`/lugar-esperado/${place.googleId}`}>
                <ArticleCard
                  key={index}
                  title={place.name}
                  image={place.reviews[0] ? place.reviews[0].photos[0] : ''}
                  rating={place.rating}
                  address={place.address}
                />
              </Link>
            ))}
        </div>
      </div>
    </section>
  );
};

export default PlaceList;
