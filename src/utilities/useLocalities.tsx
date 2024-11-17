import { useState } from 'react';
import { Locality } from './types';

export const useLocalities = (setFormData, formData) => {
  const [searchLocality, setSearchLocality] = useState('');
  const [selectedLocalities, setSelectedLocalities] = useState<Locality[]>([]);

  const handleLocalitySelection = (locality: Locality) => {
    setSelectedLocalities((prev) =>
      prev.some((loc) => loc.name === locality.name)
        ? prev.filter((loc) => loc.name !== locality.name)
        : [...prev, locality],
    );
    setFormData({
      ...formData,
      localities: [...selectedLocalities, locality],
    });
  };

  return {
    searchLocality,
    setSearchLocality,
    selectedLocalities,
    handleLocalitySelection,
  };
};
