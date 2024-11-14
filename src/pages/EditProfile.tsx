import { Header } from '../components/Header/Header';
import React, { useEffect, useState } from 'react';
import provinciasData from '../data/provinces-data.json';
import Lottie from 'lottie-react';
import logoAnimado from '../assets/logoAnimado.json';
import { UseFetchSession } from '../utilities/useFetchSession';
import { uploadImage } from '../utilities/uploadImage';

type Province = {
  id: string;
  name: string;
};

const provinces: Province[] = provinciasData;

const EditProfile = () => {
  const { user } = UseFetchSession();
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [formData, setFormData] = useState({
    description: '',
    location: '',
    birthdate: '',
    profilePicture: null as File | null,
    coverPicture: null as File | null,
  });
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (user) {
      setFormData({
        description: user.description,
        location: user.location,
        birthdate: user.birthdate.slice(0, 10),
        profilePicture: null,
        coverPicture: null,
      });
    }
  }, [user]);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>,
  ) => {
    const { name, value, type, files } = e.target as HTMLInputElement;

    if (type === 'file' && files) {
      setFormData((prevData) => ({
        ...prevData,
        [name]: files[0],
      }));
    } else {
      setFormData((prevData) => ({
        ...prevData,
        [name]: value,
      }));
    }
  };

  const editProfile = async (e: React.FormEvent) => {
    e.preventDefault();

    setIsLoading(true);
    try {
      const profilePictureUrl = formData.profilePicture
        ? await uploadImage(formData.profilePicture)
        : '';
      const coverPictureUrl = formData.coverPicture ? await uploadImage(formData.coverPicture) : '';

      const response = await fetch(`https://api-turistear.koyeb.app/editProfile`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          description: formData.description,
          location: formData.location,
          birthdate: formData.birthdate,
          profilePicture: profilePictureUrl,
          coverPicture: coverPictureUrl,
        }),
        credentials: 'include',
      });

      if (!response.ok) {
        throw new Error('Error en la solicitud');
      }

      window.location.href = '/profile';
    } catch (err: any) {
      setError(err.message);
    }
  };

  return (
    <>
      {isLoading ? (
        <>
          <div className="fixed inset-0 flex items-center justify-center bg-white z-50 border border-gray-50 rounded-lg">
            <h2 className="text-4xl text-center text-primary-4 mx-auto mb-6 md:mb-8">
              Actualizando perfil...
            </h2>
            <Lottie className="w-[16rem] md:w-[18rem] mx-auto" animationData={logoAnimado} />
          </div>
        </>
      ) : (
        <>
          <Header containerStyles={'relative top-0 z-[60]'} />
          <div
            className={
              'rounded-2xl shadow-[0_10px_25px_-10px_rgba(0,0,0,4)] p-10 w-[60%] mx-auto m-10 flex flex-col gap-y-10'
            }
          >
            <h1 className={'text-center text-5xl'}>Editar perfil</h1>
            <form className={'flex flex-col gap-y-4'} onSubmit={editProfile}>
              <div>
                <label htmlFor="description" className={'font-semibold'}>
                  Descripción
                </label>
                <textarea
                  name={'description'}
                  className={'border border-[#999999] text-black rounded-xl px-4 py-2 w-[100%]'}
                  value={formData.description}
                  onChange={handleChange}
                />
              </div>
              <div className={'grid grid-cols-2 gap-y-4'}>
                <div className={'flex flex-col gap-y-2'}>
                  <label htmlFor="location" className={'font-semibold'}>
                    Ubicación
                  </label>
                  <select
                    name={'location'}
                    className={'border border-[#999999] text-black rounded-xl px-4 py-2 w-[90%]'}
                    value={formData.location}
                    onChange={handleChange}
                  >
                    {provinces.map((item, index) => (
                      <option key={index} value={item.name}>
                        {item.name}
                      </option>
                    ))}
                  </select>
                </div>
                <div className={'flex flex-col gap-y-2'}>
                  <label htmlFor="birthdate" className={'font-semibold'}>
                    Fecha de nacimiento
                  </label>
                  <input
                    type={'date'}
                    name={'birthdate'}
                    className={'border border-[#999999] text-black rounded-xl px-4 py-2 w-[100%]'}
                    value={formData.birthdate}
                    onChange={handleChange}
                  />
                </div>
                <div className={'flex flex-col gap-y-2'}>
                  <label htmlFor={'profilePicture'} className="text-lg font-semibold">
                    Foto de perfil
                  </label>
                  <input
                    name={'profilePicture'}
                    onChange={handleChange}
                    type={'file'}
                    accept={'image/*'}
                  />
                </div>
                <div className={'flex flex-col gap-y-2'}>
                  <label htmlFor={'coverPicture'} className="text-lg font-semibold">
                    Foto de portada
                  </label>
                  <input
                    name={'coverPicture'}
                    onChange={handleChange}
                    type={'file'}
                    accept={'image/*'}
                  />
                </div>
              </div>
              <div className={'flex justify-center mt-4'}>
                <button type={'submit'} className={'btn-blue rounded-2xl'}>
                  Guardar cambios
                </button>
              </div>

              {error && <div className="text-red-500">{error}</div>}
            </form>
          </div>
        </>
      )}
    </>
  );
};

export default EditProfile;
