export const ContinueWithGoogle = () => {
  const goToGoogleAuth = () => {
    window.location.href = 'https://api-turistear.koyeb.app/auth/google';
  };

  return (
    <button
      onClick={goToGoogleAuth}
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
