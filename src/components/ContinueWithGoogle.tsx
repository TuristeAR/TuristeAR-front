import { get } from '../utilities/http.util';

export const ContinueWithGoogle = () => {
  const goToGoogleAuth = async () => {
    const headers = {
      'Content-Type': 'application/json',
    };

    const response = await get(`${import.meta.env.VITE_API_URL}/auth/google`, headers);

    if (response.redirected) {
      window.location.href = response.url;
    } else {
      console.error('Error:', response);
    }
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
