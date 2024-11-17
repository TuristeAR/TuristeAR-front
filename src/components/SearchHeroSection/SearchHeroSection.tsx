import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

const SearchHeroSection = ({
  onSearch,
  title,
}: {
  onSearch: (value: { localidad: string; provincia: string }) => void;
  title: string;
}) => {
  const navigate = useNavigate();
  const [query, setQuery] = useState('');
  const [provincias, setProvincias] = useState([]);
  const [localidades, setLocalidades] = useState([]);
  const [provinciasFiltradas, setProvinciasFiltradas] = useState([]);
  const [localidadesFiltradas, setLocalidadesFiltradas] = useState([]);

  useEffect(() => {
    const fetchProvincias = async () => {
      try {
        const response = await fetch('https://apis.datos.gob.ar/georef/api/provincias');
        const data = await response.json();
        setProvincias(data.provincias);
      } catch (error) {
        console.error('Error al obtener las provincias:', error);
      }
    };

    const fetchLocalidades = async () => {
      try {
        const response = await fetch('https://apis.datos.gob.ar/georef/api/localidades?max=5000');
        const data = await response.json();
        setLocalidades(data.localidades);
      } catch (error) {
        console.error('Error al obtener las localidades:', error);
      }
    };

    fetchProvincias();
    fetchLocalidades();
  }, []);

  const handleInputChange = (e) => {
    const value = e.target.value;
    setQuery(value);
    if (value == '') {
      setProvinciasFiltradas([]);
      setLocalidadesFiltradas([]);
    } else {
      // Filtrar provincias
      const filteredProvincias = provincias.filter((provincia) =>
        provincia.nombre
          .toLowerCase()
          .normalize('NFD')
          .replace(/[\u0300-\u036f]/g, '')
          .includes(value.toLowerCase()),
      );
      setProvinciasFiltradas(filteredProvincias);

      // Filtrar localidades
      const filteredLocalidades = localidades.filter((localidad) =>
        localidad.nombre
          .toLowerCase()
          .normalize('NFD')
          .replace(/[\u0300-\u036f]/g, '')
          .includes(value.toLowerCase()),
      );
      setLocalidadesFiltradas(filteredLocalidades);
    }
  };

  // Manejar provincia
  const handleSelectProvincia = (provincia) => {
    setQuery(provincia.nombre);
    setProvinciasFiltradas([]);
    setLocalidadesFiltradas([]);
    onSearch({ localidad: '', provincia: provincia.nombre });
    navigate(`/lugares/${provincia.nombre}`);
  };

  // Manejar localidad
  const handleSelectLocalidad = (localidad) => {
    setQuery(
      `${localidad.nombre} - ${localidad.provincia.nombre} - ${localidad.departamento.nombre}`,
    );
    setProvinciasFiltradas([]);
    setLocalidadesFiltradas([]);
    onSearch({ localidad: localidad.nombre, provincia: localidad.provincia.nombre });
    const localidadData = {
      localidad: localidad.nombre,
      departamento: localidad.departamento.nombre,
    };
    localStorage.setItem('selectedLocalidad', JSON.stringify(localidadData));

    navigate(`/lugares/${localidad.provincia.nombre}`);
  };

  return (
    <div className="bg-custom-whiteBlue15 w-full h-[120px] md:h-[140px]">
      <div className="container mx-auto h-full flex flex-col items-center justify-center gap-y-4">
        <p className="px-8 lg:px-0 w-full max-w-[800px] text-md md:text-lg text-center font-semibold tracking-tight">
          {title}
        </p>
        <div>
          <form className="flex items-center relative" onSubmit={(e) => e.preventDefault()}>
            <input
              value={query}
              onChange={handleInputChange}
              className="w-[350px] md:w-[540px] rounded outline-none text-sm md:text-md pl-2 py-4 pr-10"
              type="text"
              placeholder="Buscar por provincia, localidad o tipo de lugar..."
              autoComplete="off"
            />
            <button className="absolute right-2" type="submit">
              <img src="/assets/search.svg" alt="Buscar" />
            </button>
          </form>
          <div className="absolute z-20">
            {/* Lista de sugerencias de provincias */}
            {provinciasFiltradas.length > 0 && (
              <>
                <div className="bg-slate-50 overflow-y-auto w-[350px] md:w-[400px] italic font-light">
                  Provincia
                </div>
                <ul className="bg-slate-50 overflow-y-auto w-[350px] md:w-[400px]">
                  {provinciasFiltradas.map((provincia) => (
                    <li
                      key={provincia.id}
                      onClick={() => handleSelectProvincia(provincia)}
                      className="mb-3 mx-2 cursor-pointer hover:bg-orange hover:text-white"
                    >
                      {provincia.nombre}
                    </li>
                  ))}
                </ul>
              </>
            )}

            {/* Lista de sugerencias de localidades */}
            {localidadesFiltradas.length > 0 && (
              <>
                <div className="bg-slate-50 overflow-y-auto w-[350px] md:w-[400px] italic font-light">
                  Localidad
                </div>

                <ul className="bg-slate-50 overflow-y-auto w-[350px] md:w-[400px]">
                  {localidadesFiltradas.map((localidad) => (
                    <li
                      key={localidad.id}
                      onClick={() => handleSelectLocalidad(localidad)}
                      className="mb-3 mx-2 cursor-pointer hover:bg-orange hover:text-white"
                    >
                      {localidad.nombre} - {localidad.provincia.nombre} -{' '}
                      {localidad.departamento.nombre}
                    </li>
                  ))}
                </ul>
              </>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default SearchHeroSection;
