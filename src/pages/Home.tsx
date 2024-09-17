import { Header } from '../components/Nav';
import { LandingHero } from '../components/LandingHero';
import { LandingFeatures } from '../components/LandingFeatures';

export const Home = () => {
  return (
    <>
      <Header></Header>
      <LandingHero></LandingHero>
      <LandingFeatures></LandingFeatures>
    </>
  );
};
