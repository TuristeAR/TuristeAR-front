export const ContinueWithGoogle = () => {
  const goToGoogleAuth = () => {
    window.location.href = 'https://api-turistear.koyeb.app/auth/google';
  };

  //obtener coordenadas del navegador 
   const getCoordinates = async () => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(async (position) => {
        const { latitude, longitude } = position.coords;

        sendCoordinates(latitude, longitude);
      });
    }
  };
//enviar coordenadas al back 
  const sendCoordinates= async (lat, lon) => {
    try {
     await fetch('https://api-turistear.koyeb.app/auth/google', { // Cambia la URL si es necesario ...
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ latitude: lat, longitude: lon }),
      });
    } catch (error) {
      console.error('Error sending coordinates to backend:', error);
    }
  };

  const handleClick = async () => {
    goToGoogleAuth();
    getCoordinates();
  };

  return (
    <button
      onClick={handleClick}
      className="w-full border border-gray-50 text-lg px-6 py-4 my-4 flex justify-center items-center gap-4 bg-white rounded-lg text-slate-700 hover:opacity-80 transition duration-150"
    >
      <img
        className="w-6 h-6"
        src="https://www.svgrepo.com/show/475656/google-color.svg"
        loading="lazy"
        alt="Google logo"
      />
      <span>Continuar con Google</span>
    </button>
  );
};
