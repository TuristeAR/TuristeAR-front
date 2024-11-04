import React, { useEffect, useState } from 'react';
import Lottie from 'lottie-react';
import logoAnimado from '../../assets/logoAnimado.json';
import 'react-responsive-carousel/lib/styles/carousel.min.css';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import 'swiper/css/scrollbar';

type Category = {
    id: number,
    name: string,
};

type Province = {
    id: number,
    name: string,
    categories: Category[]
};

type Place = {
    id: number,
    name: string,
    googleId: string,
    place: Province
};

type Activity = {
    id: number,
    name: string,
    place: Place
    images: string[]
};

type Itinerary = {
    id: number,
    name: string,
    activities: Activity[]
};

export const CreateEvent = () => {

    const [isOpen, setIsOpen] = useState<boolean>(false);
    const [isLoading, setIsLoading] = useState<boolean>(false);

    const [name, setName] = useState<string | null>(null);
    const [fromDate, setFromDate] = useState<string | null>(null);
    const [toDate, setToDate] = useState<string | null>(null);
    const [province, setProvince] = useState<string | null>(null);
    const [locality, setLocality] = useState<string | null>(null);
    const [eventImages, setEventImages] = useState<FileList | null>(null);
    const [description, setDescription] = useState<string | null>(null);

    const [error, setError] = useState<string | null>(null);


    const createEvent = async (e: React.FormEvent) => {
        e.preventDefault();
        setError(null);


        if (fromDate && toDate && new Date(fromDate) > new Date(toDate)) {
            setError("La fecha de inicio no puede ser posterior a la fecha de fin.");
            return;
        }



        setIsLoading(true);
        console.log(
            " name: " + name +
            " \n fromDate: " + fromDate +
            " \n toDate: " + toDate +
            " \n province: " + province +
            " \n locality: " + locality +
            " \n description: " + description
        )
        
        try {
            const response = await fetch('http://localhost:3000/createEvent', {
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
                    description: description
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
                        className="createEventButton right-4"
                    >
                        <img
                            src={'/assets/calendar-svgrepo-com.svg'}
                            className={'lg:w-[55px] w-[45px] lg:m-6 m-3'}
                            alt={'Crear post'}
                            onClick={() => setIsOpen(true)}
                        />
                    </div>
                    {isOpen && (
                        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 lg:z-[50] z-[80] border border-gray-50 rounded-lg">
                            <div className="divContentCreateEvent bg-white rounded-2xl md:py-6 py-4 lg:px-10 px-6 flex flex-col justify-evenly relative md:max-w-[70%] max-w-[90%] max-h-[90%]">
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

                                <form onSubmit={createEvent}>
                                    <div className="formDivCreateEvent">
                                        <label id="name">Nombre del evento</label>
                                        <input
                                            type="text"
                                            name="name"
                                            id="name"
                                            required
                                            onChange={(e) => setName(e.target.value)}
                                        />
                                    </div>

                                    <div className="formDivCreateEvent">
                                        <label id="fromDate">Fecha de inicio</label>
                                        <input
                                            type="datetime-local"
                                            name="fromDate"
                                            id="fromDate"
                                            required
                                            onChange={(e) => setFromDate(e.target.value)}
                                        />
                                    </div>

                                    <div className="formDivCreateEvent">
                                        <label id="toDate">Fecha de fin</label>
                                        <input
                                            type="datetime-local"
                                            name="toDate"
                                            id="toDate"
                                            required
                                            onChange={(e) => setToDate(e.target.value)}
                                        />
                                    </div>

                                    <div className="formDivCreateEvent">
                                        <label id="province">Provincia</label>
                                        <select
                                            name="province"
                                            id="province"
                                            required
                                            onChange={(e) => setProvince(e.target.value)}
                                        >
                                            <option value="1">Buenos Aires</option>
                                        </select>
                                    </div>

                                    <div className="formDivCreateEvent">
                                        <label id="locality">Localidad</label>
                                        <select
                                            name="locality"
                                            id="locality"
                                            required
                                            onChange={(e) => setLocality(e.target.value)}
                                        >
                                            <option value="1">San Justo</option>
                                        </select>
                                    </div>

                                    <div className="formDivCreateEvent">
                                        <label>Subir imagen del evento</label>
                                        <input
                                            type="file"
                                            multiple
                                            onChange={(e) => setEventImages(e.target.files)}
                                        />
                                    </div>

                                    <div className="formDivCreateEvent m-0">
                                        <label id="description">Descripcion</label>
                                        <textarea
                                            name="description"
                                            id="description"
                                            rows={3}
                                            placeholder="Ingrese una descripcion del evento"
                                            onInput={(e) => setDescription(e.currentTarget.value)}
                                        ></textarea>
                                    </div>

                                    <div className={`flex flex-col lg:mt-6 mt-4 lg:gap-2`}>
                                        <button
                                            type="submit"
                                            className="btn-blue lg:w-[60%] w-[90%] mx-auto"
                                        >
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
