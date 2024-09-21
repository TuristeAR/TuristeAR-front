import {Header} from "../components/Header";
import logo from "/assets/logo.svg";

const userStories = [
    {
        imgPerson: '/assets/person.svg',
        user: 'Pablo Ramirez',
        imgStory : '/assets/logo.svg',
    },
    {
        imgPerson: '/assets/person.svg',
        user: 'Patricia Gonzalez',
        imgStory : '/assets/logo.svg',
    },
    {
        imgPerson: '/assets/person.svg',
        user: 'Diana Morales',
        imgStory : '/assets/logo.svg',
    },
    {
        imgPerson: '/assets/person.svg',
        user: 'Luis Hernandez',
        imgStory : '/assets/logo.svg',
    },
];

const categories=[
    {
        imgPerson: '/assets/person.svg',
        name : 'General'
    },
    {
        imgPerson: '/assets/person.svg',
        name : 'Buenos Aires'
    },
    {
        imgPerson: '/assets/person.svg',
        name : 'Córdoba'
    },
    {
        imgPerson: '/assets/person.svg',
        name : 'Salta'
    },
    {
        imgPerson: '/assets/person.svg',
        name : 'Rosario'
    },
    {
        imgPerson: '/assets/person.svg',
        name : 'La Plata'
    },
    {
        imgPerson: '/assets/person.svg',
        name : 'Bariloche'
    },
    {
        imgPerson: '/assets/person.svg',
        name : 'Barrio chino'
    },
]

const Publications = () => {
    return (
        <>
            <Header containerStyles={'bg-primary relative top-0 z-[60] '} />
            <div className='flex justify-between h-[100vh]'>
                <div className='flex flex-col w-[20%] border border-black p-6 gap-6'>
                    <div className="flex flex-col gap-4 text-xl font-semibold">
                        <div className='flex flex-row gap-2'>
                            <img src={logo} alt="logo" className="h-8 w-8 object-cover"/>
                            <h6>Publicaciones</h6>
                        </div>
                        <div className='flex flex-row gap-2'>
                            <img src={logo} alt="logo" className="h-8 w-8 object-cover"/>
                            <h6>Foro y preguntas</h6>
                        </div>
                        <div className='flex flex-row gap-2'>
                            <img src={logo} alt="logo" className="h-8 w-8 object-cover"/>
                            <h6>Ofertas de trabajo</h6>
                        </div>
                    </div>
                    <hr className="border border-[#999999]"></hr>
                    <div className="flex flex-col gap-4">
                        <h3 className="text-xl font-semibold">Filtrar por categoría</h3>
                        <form className='flex flex-col gap-4'>
                            <input type="text" className="border border-[#999999] pl-2" placeholder="Buscar categoría"/>
                        </form>
                        <div className="flex flex-col gap-y-2">
                            {categories.map((item, index) => {
                                return (
                                    <div key={index} className="flex justify-between items-center">
                                        <div className="flex gap-2 items-center">
                                            <img className='w-[35px]' src={item.imgPerson} alt="Imagen"/>
                                            <p className="font-light text-gray-500 text-sm md:text-base lg:text-lg text-start">
                                                {item.name}
                                            </p>
                                        </div>
                                        <img src={logo} className="w-[30px]"/>
                                    </div>
                                )
                            })}
                        </div>
                    </div>
                </div>
                <div className='w-[60%] border border-black p-6 flex flex-col gap-10'>
                    {/* Stories */}
                    <div className="flex gap-2">
                        <div className={`bg-cover bg-center h-[230px] w-full border border-black rounded-2xl flex flex-col justify-between p-2`}>
                        </div>
                        {userStories.map((item, index) => {
                            return (
                                <div key={index}
                                     className={`bg-[url(${item.imgStory})] bg-cover bg-center h-[230px] w-full border border-black rounded-2xl flex flex-col justify-between p-2`}>
                                    <div className="rounded-full border border-black w-[35px] h-[35px] flex items-center justify-center">
                                        <img src={item.imgPerson} alt="Imagen" className="h-8 w-8 object-cover"/>
                                    </div>
                                    <h2 className="text-center font-semibold">{item.user}</h2>
                                </div>
                            );
                        })}
                    </div>
                    {/* Create posts */}
                    <div className="border border-black rounded-xl">
                        <div className="flex justify-around items-center p-2 pt-4 pb-4">
                            <div className="w-[20%]">
                                <img src={logo} alt="logo" className="h-8 w-8 object-cover mx-auto"/>
                            </div>
                            <input type="text" className="border border-black w-[60%] p-2 rounded-3xl" placeholder="Escribe tu experiencia"/>
                            <div className="w-[20%]">
                                <img src={logo} alt="logo" className="h-8 w-8 object-cover mx-auto"/>
                            </div>
                        </div>
                        <div className="grid grid-cols-4 p-2 border-t border-black">
                        <div className="flex gap-2 items-center mx-auto">
                                <img src={logo} alt="logo" className="h-8 w-8 object-cover"/>
                                <p className="">Imagen</p>
                            </div>
                            <div className="flex gap-2 items-center mx-auto">
                                <img src={logo} alt="logo" className="h-8 w-8 object-cover"/>
                                <p className="">Itinerario</p>
                            </div>
                            <div className="flex gap-2 items-center mx-auto">
                                <img src={logo} alt="logo" className="h-8 w-8 object-cover"/>
                                <p className="">Categoría</p>
                            </div>
                            <div className="flex gap-2 items-center mx-auto">
                                <img src={logo} alt="logo" className="h-8 w-8 object-cover"/>
                                <p className="">Ubicación</p>
                            </div>
                        </div>
                    </div>
                </div>
                <div className='w-[20%] border border-black'>
                </div>
            </div>
        </>
    );
};

export default Publications;
