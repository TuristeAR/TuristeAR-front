import React, { useEffect, useState } from 'react';
import Lottie from 'lottie-react';
import logoAnimado from '../../assets/logoAnimado.json';
import 'react-responsive-carousel/lib/styles/carousel.min.css';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import 'swiper/css/scrollbar';

type User = {
    id: number;
    name: string;
    profilePicture: string;
    description: string;
    birthdate: string;
    coverPicture: string;
    location: string;
};

export const CreateEvent =  (props: {user: User}) => {

    const { user } = props;
    const [isOpen, setIsOpen] = useState<boolean>(false);
    const [isLoading, setIsLoading] = useState<boolean>(false);

    const [name, setName] = useState<string | null>(null);
    const [fromDate, setFromDate] = useState<string | null>(null);
    const [toDate, setToDate] = useState<string | null>(null);
    const [province, setProvince] = useState<string | null>(null);
    const [locality, setLocality] = useState<string | null>(null);
    const [description, setDescription] = useState<string | null>(null);
    const [error, setError] = useState<string | null>(null);


    const uploadImage = async (image: File) => {
        const formData = new FormData();
        formData.append('image', image);

        const url = 'https://api.imgur.com/3/image';
        const options = {
            method: 'POST',
            headers: {
                Authorization: 'Client-ID 523c9b5cf859dce',
            },
            body: formData,
        };

        try {
            const response = await fetch(url, options);
            if (!response.ok) {
                const errorData = await response.json();
                console.error('Error de respuesta:', errorData);
                throw new Error(errorData.data.error || 'Error al cargar la imagen');
            }
            const result = await response.json();
            return result.data.link;
        } catch (error) {
            console.error('Error en la carga de la imagen:', error);
            throw error;
        }
    };
    const createEvent = async (e: React.FormEvent) => {
        e.preventDefault();
        setError(null);

        if (fromDate && toDate && new Date(fromDate) > new Date(toDate)) {
            setError("La fecha de inicio no puede ser posterior a la fecha de fin.");
            return;
        }

        setIsLoading(true);

        try {
            const response = await fetch('https://api-turistear.koyeb.app/createEventTemp', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    name: name,
                    fromDate: fromDate,
                    toDate: toDate,
                    province: province,
                    locality: locality,
                    description: description,
                    image: null
                }),
                credentials: 'include',
            });

            if (!response.ok) throw new Error('Error en la solicitud');
            setError('');
            window.location.reload();
        } catch (err: any) {
            setError(err.message);
        } finally {
            setIsLoading(false);
            setIsOpen(false);
        }

    };

    return (
      <>
          {isLoading ? (
            <div className="fixed inset-0 flex items-center justify-center bg-white z-50 border border-gray-50 rounded-lg">
                <h2 className="text-4xl text-center text-primary-4 mx-auto mb-6 md:mb-8">
                    Creando evento...
                </h2>
                <Lottie className="w-[16rem] md:w-[18rem] mx-auto" animationData={logoAnimado} />
            </div>
          ) : (
            <>
                <div
                  onClick={() => setIsOpen(true)}
                  className="fixed bottom-32 right-4 bg-[#49a2ec] rounded-full flex flex-col justify-evenly z-[80] cursor-pointer"
                >
                    <img
                      src={'/assets/calendar.svg'}
                      className={'lg:w-[55px] w-[45px] lg:m-6 m-3'}
                      alt={'Crear post'}
                      onClick={() => setIsOpen(true)}
                    />
                </div>
                {isOpen && (
                  <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 lg:z-[90] z-[80] border border-gray-50 rounded-lg">
                      <div className="divContentCreateEvent bg-white rounded-2xl md:py-6 py-4 lg:px-10 px-6 flex flex-col justify-evenly relative md:max-w-[70%] max-w-[90%] min-w-[60%] max-h-[90%]">
                          <button
                            className="absolute top-2 right-2 text-gray-600 hover:text-gray-900"
                            onClick={() => setIsOpen(false)}
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
                          <h2 className="lg:text-2xl text-xl text-center font-bold lg:mb-4 mb-2">Crear evento</h2>

                          <form onSubmit={createEvent} className={'grid grid-cols-2 items-center gap-4'}>
                              <div>
                                  <label id="name" className={'font-semibold'}>Nombre del evento</label>
                                  <input
                                    className={'border border-[#999999] rounded-xl w-[100%] pl-2'}
                                    type="text"
                                    name="name"
                                    id="name"
                                    required
                                    onChange={(e) => setName(e.target.value)}
                                  />
                              </div>

                              <div>
                                  <label className={'font-semibold'}>Imágenes</label>
                                  <input
                                    className={'max-w-[100%]'}
                                    type="file"
                                  />
                              </div>

                              <div className="">
                                  <label id="fromDate" className={'font-semibold'}>Fecha de inicio</label>
                                  <input
                                    className={'border border-[#999999] rounded-xl px-2 w-[100%]'}
                                    type="datetime-local"
                                    name="fromDate"
                                    id="fromDate"
                                    required
                                    onChange={(e) => setFromDate(e.target.value)}
                                  />
                              </div>

                              <div className="flex flex-col">
                                  <label id="toDate" className={'font-semibold'}>Fecha de fin</label>
                                  <input
                                    className={'border border-[#999999] rounded-xl px-2'}
                                    type="datetime-local"
                                    name="toDate"
                                    id="toDate"
                                    required
                                    onChange={(e) => setToDate(e.target.value)}
                                  />
                              </div>



                              <div className={'flex flex-col'}>
                                  <label id="locality" className={'font-semibold'}>Localidad</label>
                                  <select
                                    className={'border border-[#999999] rounded-xl px-2'}
                                    name="locality"
                                    id="locality"
                                    required
                                    onChange={(e) => setLocality(e.target.value)}
                                  >
                                      <option value="San Justo">San Justo</option>
                                      <option value="Palermo">Palermo</option>
                                  </select>
                              </div>

                              <div className="flex flex-col">
                                  <label id="description" className={'font-semibold'}>Descripción</label>
                                  <textarea
                                    className={'border border-[#999999] rounded-xl px-2'}
                                    name="description"
                                    id="description"
                                    rows={3}
                                    placeholder="Ingrese una descripcion del evento"
                                    onInput={(e) => setDescription(e.currentTarget.value)}
                                  ></textarea>
                              </div>

                              <div className={`flex flex-col mt-4 lg:gap-2 col-span-2`}>
                                  <button type="submit" className="btn-blue lg:w-[60%] w-[90%] mx-auto">
                                      Crear evento
                                  </button>
                                  {error && (
                                    <div className="text-[#999999] text-sm text-center mt-2">{error}</div>
                                  )}
                              </div>
                          </form>

                      </div>
                  </div>
                )}
            </>
          )}
      </>
    );
};
