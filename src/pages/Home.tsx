import { Header } from '../components/Header/Header';
import { LandingHero } from '../components/Landing/LandingHero';
import { LandingFeatures } from '../components/Landing/LandingFeatures';
import { LandingTestimonial } from '../components/Landing/LandingTestimonial';

export const Home = () => {
  return (
    <>
      <Header containerStyles={'absolute'} isHome={true}></Header>
      <LandingHero></LandingHero>
      <LandingFeatures></LandingFeatures>
      <LandingTestimonial></LandingTestimonial>
    </>
  );
};
