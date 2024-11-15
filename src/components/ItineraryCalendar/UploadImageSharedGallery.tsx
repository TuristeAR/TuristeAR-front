import React, {useState } from 'react';
import Lottie from 'lottie-react';
import logoAnimado from '../../assets/logoAnimado.json';
import { uploadImage } from '../../utilities/uploadImage';

export const UploadImageSharedGallery = (props : {activities : any[]}) => {
  const {activities} = props;
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [formData, setFormData] = useState({
    activityId: null,
    images: [] as File[] | null,
  });
  const [error, setError] = useState<string | null>(null);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    // @ts-ignore
    const { name, value, type, files } = e.target;
    if (type === 'file') {
      setFormData(prevData => ({
        ...prevData,
        images: files ? files : null
      }));
    } else {
      setFormData(prevData => ({
        ...prevData,
        [name]: value,
      }));
    }
  };

  const addImagesToActivity = async (e)=>{
    e.preventDefault();
    setError(null);

    if (!formData.activityId) {
      setError("Seleccione una actividad!");
      return;
    }

    if (formData.images.length<1) {
      setError("Selecciones imágenes!");
      return;
    }

    setIsLoading(true);
    try {
      let imagesUrl=[]

      for (const image of formData.images) {
        const imageUrl = formData.images ? await uploadImage(image) : "";
        imagesUrl.push(imageUrl);
      }

    const response = await fetch(`${process.env.VITE_API_URL}/addImagesToActivity`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          activityId: formData.activityId,
          images: imagesUrl,
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
  }

  return (
    <>
      {isLoading ? (
        <div className="fixed inset-0 flex items-center justify-center bg-white z-50 border border-gray-50 rounded-lg">
          <h2 className="text-4xl text-center text-primary-4 mx-auto mb-6 md:mb-8">
            Cargando imágenes...
          </h2>
          <Lottie className="w-[16rem] md:w-[18rem] mx-auto" animationData={logoAnimado} />
        </div>
      ) : (
        <>
          <button
            onClick={() => setIsOpen(true)}
            className="fixed bottom-4 right-4 bg-[#49a2ec] rounded-full flex flex-col justify-evenly z-40"
            id={'crearForum'}
          >
            <svg
              className={'lg:w-[35px] lg:h-[35px] w-[27px] h-[27px] m-6'}
              fill={'#000'}
              viewBox="-0.52 0 15.07 15.07"
              xmlns="http://www.w3.org/2000/svg"
            >
              <g id="SVGRepo_bgCarrier" strokeWidth="0"></g>
              <g id="SVGRepo_tracerCarrier" strokeLinecap="round" strokeLinejoin="round"></g>
              <g id="SVGRepo_iconCarrier">
                <g id="Layer_2" data-name="Layer 2">
                  <g id="Layer_1-2" data-name="Layer 1">
                    <path d="M3,15.07A4,4,0,0,1,.15,13.89a.5.5,0,0,1,0-.71.5.5,0,0,1,.7,0,3,3,0,0,0,4.3,0l7-7a3,3,0,0,0,0-4.29,3.11,3.11,0,0,0-4.3,0L2.1,7.64A1.27,1.27,0,1,0,3.9,9.43L9.65,3.68a.5.5,0,0,1,.7,0,.5.5,0,0,1,0,.71L4.6,10.14a2.31,2.31,0,0,1-3.2,0,2.26,2.26,0,0,1,0-3.21L7.15,1.18A4,4,0,0,1,14,4a4,4,0,0,1-1.19,2.85l-7,7A4,4,0,0,1,3,15.07Z"></path>
                  </g>
                </g>
              </g>
            </svg>
          </button>
          {isOpen && (
            <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50 border border-gray-50 rounded-lg">
              <div className="bg-white rounded-2xl p-10 flex flex-col justify-evenly relative">
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
                <h2 className="text-2xl text-center font-bold mb-4">Subir imágenes</h2>
                <form onSubmit={addImagesToActivity} className={'flex flex-col'}>
                  <div className={'flex flex-col gap-6'}>
                    <div className={'grid grid-cols-1 gap-y-6'}>
                      <div className={'flex flex-col'}>
                        <label className="text-lg font-semibold">Actividad</label>
                        <select
                          className={'border border-[#999999] pl-2 rounded-xl'}
                          name={'activityId'}
                          onChange={handleChange}
                        >
                          <option value={'0'}>Seleccionar</option>
                          {activities.map((activity) => (
                            <option value={activity.id} key={activity.id}>
                              {activity.name}
                            </option>
                          ))}
                        </select>
                      </div>
                      <div className={'flex flex-col'}>
                        <label className="text-lg font-semibold">Imágenes</label>
                        <input
                          name={'images'}
                          onChange={handleChange}
                          type={'file'}
                          accept={'image/*'}
                          multiple={true}
                        />
                      </div>
                    </div>
                  </div>
                  <div className={'flex justify-center mt-8'}>
                    <button type={'submit'} className={'btn-blue'}>
                      Subir imágenes
                    </button>
                  </div>
                </form>
                {error && <div className="text-danger text-center mt-4">{error}</div>}
              </div>
            </div>
          )}
        </>
      )}
    </>
  );
}