import { Header } from '../components/Header/Header';
import { LandingHero } from '../components/LandingHero';
import { LandingFeatures } from '../components/LandingFeatures';
import { LandingTestimonial } from '../components/LandingTestimonial';

export const Home = () => {
  return (
    <>
      <Header containerStyles={'absolute bg-transparent'}></Header>
      <LandingHero></LandingHero>
      <LandingFeatures></LandingFeatures>
      <LandingTestimonial></LandingTestimonial>
    </>
  );
};
