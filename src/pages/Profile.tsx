import { Header } from '../components/Header';

const Profile = () => {
  return (
    <section className="h-screen xl:h-[1600px] overflow-x-clip relative">
      <Header containerStyles={'bg-primary fixed top-0 left-0 right-0 z-[60]'} />
      <div className="grid grid-cols-1 md:grid-cols-[250px_1fr_300px]  gap-4 h-full mt-20">
        {/* Left Column */}
        <aside className="col-span-1  p-4 hidden md:flex">
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
          <div className="flex flex-col h-full mx-4 md:mx-0 md:w-[700px]">
            {/* Banner */}
            <div className="  h-full max-h-[120px] bg-primary flex"></div>
            {/* Usuario */}
            <div className="h-auto flex w-full my-4 ">
              <div className="flex flex-col gap-y-4">
                <p className="text-primary-3 text-[20px] ">
                  Antonio Medina <span className="text-primary-4">@antoniomedina234</span>
                </p>
                <p className="md:w-[500px] text-[14px]">
                  Explorador apasionado de nuevas culturas y destinos. Compartiendo experiencias
                  unicas de viajes, consejos útiles y las mejores rutas para descubrir el mundo.
                  !Acompáñame en esta aventura!
                </p>
                <div className="flex gap-x-4 text-gray text-sm">
                  <p>Ubicacion: Salta, Argentina</p>
                  <p>Fecha de nacimiento: 22 enero de 2000</p>
                </div>
              </div>
              <div className="hidden md:flex relative z-[10] w-full">
                <div className="bg-gray-2 border-[4px] border-gray-50 w-[120px] h-[120px] absolute -top-8 right-8"></div>
              </div>
            </div>
            {/* Publicaciones */}
            <div className="flex flex-col h-full gap-y-8">
              <div className=" border-b border-gray font-semibold">
                <p>Mis publicaciones</p>
              </div>
              {/* Crear publicacion */}
              <div className="h-[120px] shadow-xl rounded-md px-8">
                <div className="flex flex-col w-full h-full">
                  {/* Img, Input, Send */}
                  <div className="flex gap-x-4 px-4 justify-around  items-center h-full ">
                    <img src="" alt="img" className="rounded-full w-8 h-8" />
                    <input
                      type="text"
                      placeholder="Escribe tu experiencia"
                      className="outline-none rounded-full p-2 block w-full"
                    />
                    <div>Send</div>
                  </div>
                  {/* Img, Itinerario, Categoria, Ubicacion  */}
                  <div className="h-auto flex justify-between border-t mt-4 border-gray py-4">
                    <button>+Imagen</button>
                    <button>+Itinerario</button>
                    <button>+Categoria</button>
                    <button>+Ubicacion</button>
                  </div>
                </div>
              </div>
              {/* Publicacion */}
              <div className="h-auto shadow-xl rounded-md px-8">
                <div className="flex flex-col w-full h-full">
                  <p>
                    Hola mi nombre es Antonio, soy salteño y este invierno decidi hacer una escapada
                    a Buenos Aires por primera vez, visitando alguna de las ciudades mas iconicas.
                    Viajamos con unos amigos y la pasamos increible, no gastamos mucho y para el
                    poco tiempo que fuimos visitamos varios lugares.
                  </p>
                  <p>
                    Les comparto mi itinerario por si alguno le gustaria utilizarlo y comentenme que
                    les parece o que me recomiendan ver la proxima vez.
                  </p>
                  <div className="w-full h-[150px] bg-gray rounded-sm"></div>
                  {/* Like, Comentario, Rewittear, Fav  */}
                  <div className="h-auto flex justify-between border-t mt-4 border-gray py-4">
                    <button>+Like</button>
                    <button>+Comentario</button>
                    <button>+Rewittear</button>
                    <button>+Fav</button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </main>

        {/* Right Column (Sidebar) */}
        <aside className="hidden md:flex col-span-1 p-4">
          <div className="flex flex-col h-full w-full">
            {/* mis viajes */}
            <div className="flex flex-col gap-4 ">
              <h2 className="font-semibold tracking-[-0.5px] leading-none">Mis viajes</h2>
              <input
                type="text"
                placeholder="Buscar viaje"
                className="p-1 block w-full border border-gray rounded-md outline-none"
              />
              <div className="w-full flex flex-col gap-2 mb-2">
                <div className="flex items-center w-full gap-2">
                  <div className="bg-gray-50 w-10 h-7 rounded-lg"></div>
                  <p> Buenos Aires - 4 dias</p>
                </div>
                <div className="flex items-center w-full gap-2">
                  <div className="bg-gray-50 w-10 h-7 rounded-lg"></div>
                  <p> Buenos Aires - 4 dias</p>
                </div>
                <div className="flex items-center w-full gap-2">
                  <div className="bg-gray-50 w-10 h-7 rounded-lg"></div>
                  <p> Buenos Aires - 4 dias</p>
                </div>
                <div className="flex items-center w-full gap-2">
                  <div className="bg-gray-50 w-10 h-7 rounded-lg"></div>
                  <p> Buenos Aires - 4 dias</p>
                </div>
              </div>
              <div className="border-b  border-gray pb-4  h-auto">
                <p>Descubrir más</p>
              </div>
            </div>
            {/* Mis amigos */}
            <div className="flex flex-col gap-4 mt-4">
              <h2 className="font-semibold tracking-[-0.5px] leading-none">Mis viajes</h2>
              <input
                type="text"
                placeholder="Buscar viaje"
                className="p-1 block w-full border border-gray rounded-md outline-none"
              />
              <div className="w-full flex flex-col gap-2 mb-2">
                <div className="flex items-center w-full gap-2">
                  <div className="bg-gray-50  w-8 h-8 rounded-full"></div>
                  <p>Sofia Ramirez</p>
                </div>
                <div className="flex items-center w-full gap-2">
                  <div className="bg-gray-50 w-8 h-8 rounded-full"></div>
                  <p>Ana Martinez</p>
                </div>
                <div className="flex items-center w-full gap-2">
                  <div className="bg-gray-50 w-8 h-8 rounded-full"></div>
                  <p>German Riggiano</p>
                </div>
                <div className="flex items-center w-full gap-2">
                  <div className="bg-gray-50 w-8 h-8 rounded-full"></div>
                  <p>Camila Ibarra</p>
                </div>
              </div>
              <div className="border-b  border-gray pb-4  h-auto">
                <p>Descubrir más</p>
              </div>
            </div>
          </div>
        </aside>
      </div>
    </section>
  );
};

export default Profile;
