import { useState } from 'react';

const SearchHeroSection = ({ onSearch, title }: { onSearch: (value: string) => void; title: string }) => {
  const [searchTerm, setSearchTerm] = useState('');

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(e.target.value);
  };

  const handleSearch = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    onSearch(searchTerm);
  };

  return (
    <div className="bg-custom-whiteBlue15 w-full h-[120px]">
      <div className="container mx-auto h-full flex flex-col items-center justify-center gap-y-4">
        <p className="px-8 lg:px-0 max-w-[600px] text-center font-semibold tracking-tight">
          {title}
        </p>
        <div>
          <form className="flex items-center relative" onSubmit={handleSearch}>
            <input
              value={searchTerm}
              onChange={handleInputChange}
              className="w-[350px] md:w-[400px] rounded outline-none text-sm md:text-md p-1 pr-10"
              type="text"
              placeholder="Buscar por provincia, localidad o tipo de lugar..."
            />
            <button className="absolute right-2" type='submit'>
              <img src="/assets/search.svg" alt="Buscar" />
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default SearchHeroSection;
