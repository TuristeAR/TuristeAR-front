import { Header } from '../components/Header/Header';
import React, { useEffect, useState } from 'react';
import provinciasData from '../data/provinces-data.json';

type Province = {
  id: string;
  name: string;
};

const provinces: Province[] = provinciasData;

const EditProfile = () => {
  type User = {
    id: number;
    username: string;
    name: string;
    profilePicture: string;
    description: string;
    birthdate: string;
    coverPicture: string;
    location: string;
  };
  const [user, setUser] = useState<User | null>(null);
  const [formData, setFormData] = useState({
    description: '',
    location: '',
    birthdate: '',
    profilePicture: null as File | null,
    coverPicture: null as File | null,
  });
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    fetch('https://api-turistear.koyeb.app/session', {
      method: 'GET',
      credentials: 'include',
    })
      .then((response) => {
        if (!response.ok) {
          window.location.href = '/';
        }
        return response.json();
      })
      .then((data) => {
        setUser(data.user);
      })
      .catch(() => {
        window.location.href = '/';
      });
  }, []);

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
        [name]: files[0], // Asigna el archivo al campo correspondiente (profilePicture o coverPicture)
      }));
    } else {
      setFormData((prevData) => ({
        ...prevData,
        [name]: value,
      }));
    }
  };

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
      console.log('Imagen subida:', result);
      return result.data.link; // Retorna el enlace de la imagen
    } catch (error) {
      console.error('Error en la carga de la imagen:', error);
      throw error;
    }
  };

  const editProfile = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      const profilePictureUrl = await uploadImage(formData.profilePicture); // Espera el resultado de la carga de la imagen
      const coverPictureUrl = await uploadImage(formData.coverPicture); // Espera el resultado de la carga de la imagen

      const response = await fetch(`https://api-turistear.koyeb.app/editProfile/${user.id}`, {
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
      <Header containerStyles={'relative top-0 z-[60]'} />
      <div
        className={
          'rounded-2xl shadow-[0_10px_25px_-10px_rgba(0,0,0,4)] p-10 w-[60%] mx-auto mt-16 flex flex-col gap-y-10'
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
              className={'border border-[#999999] text-black rounded-xl px-4 py-2 w-full'}
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
                className={'border border-[#999999] text-black rounded-xl px-4 py-2 w-full'}
                value={formData.birthdate}
                onChange={handleChange}
              />
            </div>
            <div className={'flex flex-col gap-y-2'}>
              <label htmlFor={'profilePicture'} className="text-lg font-semibold">
                Foto de perfil
              </label>
              <input name={'profilePicture'} onChange={handleChange} type={'file'} />
            </div>
            <div className={'flex flex-col gap-y-2'}>
              <label htmlFor={'coverPicture'} className="text-lg font-semibold">
                Foto de portada
              </label>
              <input name={'coverPicture'} onChange={handleChange} type={'file'} />
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
  );
};

export default EditProfile;
