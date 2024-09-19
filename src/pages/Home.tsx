import { Header } from '../components/Header';
import { LandingHero } from '../components/LandingHero';
import { LandingFeatures } from '../components/LandingFeatures';

export const Home = () => {
  return (
    <>
      <Header containerStyles={'absolute'}></Header>
      <LandingHero></LandingHero>
      <LandingFeatures></LandingFeatures>
    </>
  );
};
