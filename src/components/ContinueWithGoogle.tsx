export const ContinueWithGoogle = () => {
  const goToGoogleAuth = () => {
    console.log(`${import.meta.env.VITE_API_URL}/auth/google`);
    window.location.href = `${import.meta.env.VITE_API_URL}/auth/google`;
  };

  return (
    <button
      onClick={goToGoogleAuth}
      className="px-4 py-2 border flex gap-2 border-slate-200 rounded-lg text-slate-700 hover:border-slate-400 hover:text-slate-900 hover:shadow transition duration-150"
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
