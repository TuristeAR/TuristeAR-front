import { Header } from '../components/Header';

const Profile = () => {
  return (
    <section className="h-screen xl:h-[1600px] overflow-x-clip relative">
      <Header containerStyles={'bg-primary fixed top-0 left-0 right-0 z-10'} />
      <div className="grid grid-cols-[250px_1fr_300px]  gap-4 h-full mt-20">
        {/* Left Column */}
        <aside className="col-span-1  p-4">
          {/*  */}
          <div className="flex flex-col h-full">
            <div className="flex flex-col justify-center gap-y-2 border-b border-gray mb-4 h-full max-h-[100px]">
              <p>Perfil</p>
              <p>Configuracion</p>
              <p>Cerrar sesion</p>
            </div>
            {/*  */}
            <div className="flex flex-col gap-4 h-full">
              <h2 className="font-semibold tracking-[-0.5px] leading-none">Categorias seguidas</h2>
              <input
                type="text"
                placeholder="Buscar categoria"
                className="p-1 block w-full border border-gray rounded-md outline-none"
              />
              <div className="w-full flex flex-col gap-2 mb-2">
                <div className="flex items-center w-full gap-2">
                  <div className="bg-gray-50 w-20 h-7 rounded-lg"></div>
                  <p> General</p>
                  <button className="block w-full text-right">❤</button>
                </div>
                <div className="flex items-center w-full gap-2">
                  <div className="bg-gray-50 w-20 h-7 rounded-lg"></div>
                  <p> General</p>
                  <button className="block w-full text-right">❤</button>
                </div>
                <div className="flex items-center w-full gap-2">
                  <div className="bg-gray-50 w-20 h-7 rounded-lg"></div>
                  <p> General</p>
                  <button className="block w-full text-right">❤</button>
                </div>
                <div className="flex items-center w-full gap-2">
                  <div className="bg-gray-50 w-20 h-7 rounded-lg"></div>
                  <p> General</p>
                  <button className="block w-full text-right">❤</button>
                </div>
                <div className="flex items-center w-full gap-2">
                  <div className="bg-gray-50 w-20 h-7 rounded-lg"></div>
                  <p> General</p>
                  <button className="block w-full text-right">❤</button>
                </div>
              </div>
              <div className="border-b  border-gray pb-4  h-auto">
                <p>Descubrir más</p>
              </div>
            </div>
          </div>
        </aside>

        {/* Middle Column (Main Content) */}
        <main className="col-span-1 container mx-auto flex justify-center flex-1">
          <div className="flex flex-col h-full">
            <div className="w-[650px]  h-full max-h-[80px] bg-primary flex"></div>
            <div className="bg-primary-2 h-auto flex w-full mb-4">
              <div className='flex flex-col gap-y-4'>
                <p className='text-primary-3 '>
                  Nombre completo <span className='text-primary-4'>Nombre de usuario</span>
                </p>
                <p className='w-[500px]'>Lorem ipsum dolor sit amet consectetur, adipisicing elit. Quas, quasi.</p>
                <div className="flex gap-x-4 text-gray">
                  <p>Ubicacion</p>
                  <p>fecha de nacimiento</p>
                </div>
              </div>
              <div className="relative z-[60] w-full">
                <div className="bg-gray-50 w-[90px] h-[90px] absolute -top-8 right-8"></div>
              </div>
            </div>
            <div>
              <div className=" border-b border-gray mb-2 h-full max-h-[100px]">
                <p>Mis publicaciones</p>
              </div>
            </div>
          </div>
        </main>

        {/* Right Column (Sidebar) */}
        <aside className="col-span-1 p-4 bg-primary-3">
          {/* Content for the right sidebar */}
          <p>Right Sidebar content</p>
        </aside>
      </div>
    </section>
  );
};

export default Profile;
