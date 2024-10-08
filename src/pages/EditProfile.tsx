import { Header } from '../components/Header/Header';
import { useEffect, useState } from 'react';
import provinciasData from '../data/provinces-data.json';

type Province = {
  id: string;
  name: string;
};

const provinces: Province[] = provinciasData;


const EditProfile = () => {
  type User={
    id: number;
    name: string,
    profilePicture: string,
  }

  const [user, setUser] = useState<User | null>(null);

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
      .catch((err) => {
        window.location.href = '/';
      });
  }, []);

  return (
    <>
      <Header containerStyles={'relative top-0 z-[60]'} />
      <div className={'bg-gray-50 p-10 rounded-2xl w-[60%] mx-auto mt-16 flex flex-col gap-y-10'}>
        <h1 className={'text-center text-5xl'}>Editar perfil</h1>
        <form className={'grid grid-cols-2 gap-y-4'}>
          <div className={'flex flex-col gap-y-2'}>
            <label htmlFor="{'description'}">Descripcion</label>
            <textarea
              name={'description'}
              className={'border border-[#999999] rounded-xl px-4 py-2 w-[90%]'}
            />
          </div>
          <div className={'flex flex-col gap-y-2'}>
            <label htmlFor="{'location'}">Ubicación</label>
            <select
              name={'location'}
              className={'border border-[#999999] rounded-xl px-4 py-2 w-[90%]'}
            >
              {provinces.map((item, index) => {
                return (
                  <option value={item.id}>
                    {item.name}
                  </option>
                );
              })}
            </select>
          </div>
          <div className={'flex flex-col gap-y-2'}>
            <label htmlFor="{'birthdate'}">Fecha de nacimiento</label>
            <input
              type={'date'}
              name={'birthdate'}
              className={'border border-[#999999] rounded-xl px-4 py-2 w-[90%]'}
            />
          </div>
          <div className={'flex flex-col gap-y-2'}>
            <label htmlFor="{'coverPhoto'}">Foto de portada</label>
            <input type={'file'} name={'coverPhoto'} className={'py-2 w-[90%]'} />
          </div>
          <button type={'submit'} className={'btn-blue rounded-2xl col-span-2 mx-auto'}>
            Guardar cambios
          </button>
        </form>
      </div>
    </>
  );
};

export default EditProfile;
