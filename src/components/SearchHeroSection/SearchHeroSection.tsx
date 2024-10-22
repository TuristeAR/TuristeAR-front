import { useEffect, useState } from 'react';

const SearchHeroSection = ({
  onSearch,
  title,
}: {
  onSearch: (value: { localidad: string; provincia: string }) => void;
  title: string;
}) => {
  const [query, setQuery] = useState('');
  const [provincias, setProvincias] = useState([]);
  const [provinciasFiltradas, setProvinciasFiltradas] = useState([]);
  const [localidadesSugerencias, setLocalidadesSugerencias] = useState([]);

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

    fetchProvincias();
  }, []);

  const handleInputChange = (e) => {
    const value = e.target.value;
    setQuery(value);

    const filteredProvincias = provincias.filter((provincia) =>
      provincia.nombre.toLowerCase().normalize("NFD").replace(/[\u0300-\u036f]/g, "").includes(value.toLowerCase()),
    );
    setProvinciasFiltradas(filteredProvincias);

    if (value.length >= 1) {
      fetchLocalidades(value);
    } else {
      setLocalidadesSugerencias([]);
      setProvinciasFiltradas([])
    }
  };

  const fetchLocalidades = async (value) => {
    try {
      const localidadesResponse = await fetch(
        `https://apis.datos.gob.ar/georef/api/localidades?nombre=${value}&max=14`,
      );
      const localidadesData = await localidadesResponse.json();
      setLocalidadesSugerencias(localidadesData.localidades);
    } catch (error) {
      console.error('Error al obtener las localidades:', error);
    }
  };

  // Manejar selección de una provincia
  const handleSelectProvincia = (provincia) => {
    setQuery(provincia.nombre);
    setProvinciasFiltradas([]);
    setLocalidadesSugerencias([]);
    onSearch({ localidad: '', provincia: provincia.nombre });
  };

  // Manejar selección de una localidad
  const handleSelectLocalidad = (localidad) => {
    setQuery(
      `${localidad.nombre} - ${localidad.provincia.nombre} - ${localidad.departamento.nombre}`,
    );
    setProvinciasFiltradas([]); // Oculta las sugerencias de provincias
    setLocalidadesSugerencias([]); // Limpia las sugerencias de localidades
    onSearch({ localidad: localidad.nombre, provincia: localidad.provincia.nombre });
  };

  return (
    <div className="bg-custom-whiteBlue15 w-full h-[120px]">
      <div className="container mx-auto h-full flex flex-col items-center justify-center gap-y-4">
        <p className="px-8 lg:px-0 max-w-[600px] text-center font-semibold tracking-tight">
          {title}
        </p>
        <div>
          <form className="flex items-center relative" onSubmit={(e) => e.preventDefault()}>
            <input
              value={query}
              onChange={handleInputChange}
              className="w-[350px] md:w-[400px] rounded outline-none text-sm md:text-md p-1 pr-10"
              type="text"
              placeholder="Buscar por provincia, localidad o tipo de lugar..."
            />
            <button className="absolute right-2" type="submit">
              <img src="/assets/search.svg" alt="Buscar" />
            </button>
          </form>
          <div className="absolute z-20">
            {/* Lista de sugerencias de provincias */}
            {provinciasFiltradas.length > 0 && (
              <ul className="bg-white overflow-y-auto w-[350px] md:w-[400px]">
                {provinciasFiltradas.map((provincia) => (
                  <li
                    key={provincia.id}
                    onClick={() => handleSelectProvincia(provincia)}
                    className="mb-3 mx-2  cursor-pointer hover:bg-slate-50 h-[2rem]"
                  >
                    {provincia.nombre}
                  </li>
                ))}
              </ul>
            )}

            {/* Lista de sugerencias de localidades */}
            {localidadesSugerencias.length > 0 && (
              <ul className="bg-white overflow-y-auto w-[350px] md:w-[400px]">
                {localidadesSugerencias.map((localidad) => (
                  <li
                    key={localidad.id}
                    onClick={() => handleSelectLocalidad(localidad)}
                    className="mb-3 mx-2 cursor-pointer hover:bg-slate-50"
                  >
                    {localidad.nombre} - {localidad.provincia.nombre} -{' '}
                    {localidad.departamento.nombre}
                  </li>
                ))}
              </ul>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default SearchHeroSection;
