import { useEffect, useState } from 'react';

const CategoryFilter = ({
  provinceName,
  types,
  selectedTypes,
  onTypeChange,
  localidad,
  departamento,
}) => {
  const [departamentos, setMunicipios] = useState([]);
  const [localidades, setLocalidades] = useState([]);
  const [selectedDepartment, setSelectedDepartment] = useState(departamento);
  const [selectedLocalidad, setSelectedLocalidad] = useState(localidad);

  useEffect(() => {
    const fetchMunicipios = async () => {
      try {
        const responseTotal = await fetch(
          `${process.env.VITE_GEOREF_API_URL}/departamentos?provincia=${provinceName}&campos=nombre&formato=json`,
        );
        if (!responseTotal.ok) {
          throw new Error('Error fetching data');
        }
        const dataTotal = await responseTotal.json();

        const totalDepartamentos = dataTotal.total;
        const response = await fetch(
          `${process.env.VITE_GEOREF_API_URL}/departamentos?provincia=${provinceName}&campos=id,nombre&formato=json&max=${totalDepartamentos}`,
        );
        if (!response.ok) {
          throw new Error('Error fetching data');
        }
        const data = await response.json();
        setMunicipios(data.departamentos);
        if (departamento) {
          handleDepartamentClick(departamento);
          setSelectedLocalidad(localidad);
        }
      } catch (err) {
        console.log(err.message);
      }
    };

    fetchMunicipios();
  }, [provinceName, localidad, departamento]);

  const fetchLocalidades = async (departamentoNombre) => {
    try {
      const responseTotal = await fetch(
        `${process.env.VITE_GEOREF_API_URL}/localidades?provincia=${provinceName}&departamento=${departamentoNombre}&campos=id&formato=json`,
      );
      const dataTotal = await responseTotal.json();

      const totalLocalidades = dataTotal.total;

      const response = await fetch(
        `${process.env.VITE_GEOREF_API_URL}/localidades?provincia=${provinceName}&departamento=${departamentoNombre}&formato=json&max=${totalLocalidades}`,
      );
      if (!response.ok) {
        throw new Error('Error fetching data');
      }
      const data = await response.json();
      setLocalidades(data.localidades);
    } catch (err) {
      console.log(err.message);
    }
  };

  const handleDepartamentClick = (departamentoNombre) => {
    fetchLocalidades(departamentoNombre);
    setSelectedLocalidad(null);
    setSelectedDepartment(departamentoNombre);
  };

  if (!departamentos) {
    return <p>...</p>;
  }
  return (
    <>
      <div className="col-span-12 md:col-span-3 w-full max-md:max-w-md max-md:mx-auto">
        <div className="relative w-full max-w-full mb-7">
          <svg
            className="absolute top-1/2 -translate-y-1/2 left-4 z-50"
            width="20"
            height="20"
            viewBox="0 0 20 20"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M16.5555 3.33203H3.44463C2.46273 3.33203 1.66675 4.12802 1.66675 5.10991C1.66675 5.56785 1.84345 6.00813 2.16004 6.33901L6.83697 11.2271C6.97021 11.3664 7.03684 11.436 7.0974 11.5068C7.57207 12.062 7.85127 12.7576 7.89207 13.4869C7.89728 13.5799 7.89728 13.6763 7.89728 13.869V16.251C7.89728 17.6854 9.30176 18.6988 10.663 18.2466C11.5227 17.961 12.1029 17.157 12.1029 16.251V14.2772C12.1029 13.6825 12.1029 13.3852 12.1523 13.1015C12.2323 12.6415 12.4081 12.2035 12.6683 11.8158C12.8287 11.5767 13.0342 11.3619 13.4454 10.9322L17.8401 6.33901C18.1567 6.00813 18.3334 5.56785 18.3334 5.10991C18.3334 4.12802 17.5374 3.33203 16.5555 3.33203Z"
              stroke="black"
              strokeWidth="1.6"
              strokeLinecap="round"
            />
          </svg>
          <select
            id="Offer"
            className="h-12 border border-gray-300 text-gray-900 pl-11 text-base font-normal leading-7 rounded-full block w-full py-2.5 px-4 appearance-none relative focus:outline-none bg-white transition-all duration-500 hover:border-gray-400 hover:bg-gray-50 focus-within:bg-gray-50"
          >
            <option>Ordenar</option>
            <option value="option 1">option 1</option>
            <option value="option 2">option 2</option>
            <option value="option 3">option 3</option>
            <option value="option 4">option 4</option>
          </select>
          <svg
            className="absolute top-1/2 -translate-y-1/2 right-4 z-50"
            width="16"
            height="16"
            viewBox="0 0 16 16"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M12.0002 5.99845L8.00008 9.99862L3.99756 5.99609"
              stroke="#111827"
              strokeWidth="1.6"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        </div>

        <div className="box rounded-xl border border-gray-300 bg-white p-6 w-full md:max-w-sm">
          <h6 className="font-medium text-base leading-7 text-black mb-5">
            Tipos de puntos de interés
          </h6>
          <div className="box flex flex-col gap-2">
            {types.map((t, index) => (
              <div key={index} className="flex items-center">
                <input
                  id="checkbox-default-1"
                  type="checkbox"
                  value={t.nombre}
                  className="w-5 h-5 appearance-none border border-gray-300  rounded-md mr-2 hover:border-indigo-500 hover:bg-indigo-100 checked:bg-no-repeat checked:bg-center checked:border-indigo-500 checked:bg-indigo-100 checked:bg-[url('https://pagedone.io/asset/uploads/1689406942.svg')]"
                  checked={selectedTypes.includes(t)}
                  onChange={() => onTypeChange(t)}
                />
                <label
                  htmlFor="checkbox-default-1"
                  className="text-xs font-normal text-gray-600 leading-4 cursor-pointer"
                >
                  {t}
                </label>{' '}
              </div>
            ))}
          </div>
        </div>

        <div className="mt-7 box rounded-xl border border-gray-300 bg-white p-6 w-full md:max-w-sm">
          <h6 className="font-medium text-base leading-7 text-black mb-5">Municipio</h6>
          <div className="box flex flex-col gap-2">
            {departamentos.map((d, index) => (
              <div
                key={index}
                className="flex items-center"
                onClick={() => handleDepartamentClick(d.nombre)}
              >
                <input
                  id="checkbox-default-1"
                  type="checkbox"
                  value={d.nombre}
                  className="w-5 h-5 appearance-none border border-gray-300  rounded-md mr-2 hover:border-indigo-500 hover:bg-indigo-100 checked:bg-no-repeat checked:bg-center checked:border-indigo-500 checked:bg-indigo-100 checked:bg-[url('https://pagedone.io/asset/uploads/1689406942.svg')]"
                  checked={selectedDepartment === d.nombre}
                />
                <label className="text-xs font-normal text-gray-600 leading-4 cursor-pointer">
                  {d.nombre}
                </label>{' '}
              </div>
            ))}
          </div>
        </div>

        <div className="mt-7 box rounded-xl border border-gray-300 bg-white p-6 w-full md:max-w-sm">
          <h6 className="font-medium text-base leading-7 text-black mb-5">Localidad</h6>
          <div className="box flex flex-col gap-2">
            {localidades.length === 0 ? (
              <p></p>
            ) : (
              localidades.map((l) => (
                <div
                  key={l.id}
                  className="flex items-center"
                  onClick={() => setSelectedLocalidad(l.nombre)}
                >
                  <input
                    id={`checkbox-localidad-${l.id}`}
                    type="checkbox"
                    value={l.nombre}
                    checked={selectedLocalidad === l.nombre}
                    className="w-5 h-5 appearance-none border border-gray-300 rounded-md mr-2 hover:border-indigo-500 hover:bg-indigo-100 checked:bg-no-repeat checked:bg-center checked:border-indigo-500 checked:bg-indigo-100 checked:bg-[url('https://pagedone.io/asset/uploads/1689406942.svg')]"
                  />
                  <label className="text-xs font-normal text-gray-600 leading-4 cursor-pointer">
                    {l.nombre}
                  </label>
                </div>
              ))
            )}
          </div>
        </div>
      </div>
    </>
  );
};

export default CategoryFilter;
