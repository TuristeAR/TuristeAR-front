import { ContinueWithGoogle } from '../components/Login/ContinueWithGoogle';
import background from '../assets/login_wallpaper.jpg';
import logo from '../assets/TuristeAR-logo.png';

export const Login = () => {
  return (
    <>
      <section className="w-full h-screen overflow-hidden text-gray-600 body-font flex justify-center items-center rounded-sm">
        <img
          src={background}
          alt="Background"
          className="absolute top-0 left-0 w-full h-full object-cover -z-10"
        />
        <div className="relative w-[390px] h-[500px] mx-auto flex p-4 flex-col items-center justify-center">
          <div className="absolute inset-0 bg-black opacity-50 pointer-events-none"></div>
          <div className="z-10 h-full text-center flex flex-col justify-around items-center">
            <img src={logo} alt="TuristeAR" className="my-4" />
            <span className="my-4 text-2xl text-white">
              Iniciá sesión para disfrutar
              <br />
              todas las funciones de TuristeAR
            </span>
            <ContinueWithGoogle />
          </div>
        </div>
      </section>
    </>
  );
};
