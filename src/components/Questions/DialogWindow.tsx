import { ContinueWithGoogle } from '../Login/ContinueWithGoogle';

export const DialogWindow = ({ isOpen, onClose }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50 border border-gray-50 rounded-lg">
      <div className="bg-white rounded-lg p-6 w-96 h-72 flex flex-col justify-evenly relative">
        <button
          onClick={onClose}
          className="absolute top-2 right-2 text-gray-600 hover:text-gray-900"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-6 w-6"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M6 18L18 6M6 6l12 12"
            />
          </svg>
        </button>
        <h2 className="text-2xl text-center font-semibold mb-4">Iniciar sesión</h2>
        <span className="text-lg text-center text-gray-500 my-4">
          ¡Tenés que iniciar sesión para disfrutar todas las funciones de TuristeAR!
        </span>
        <ContinueWithGoogle />
      </div>
    </div>
  );
};
