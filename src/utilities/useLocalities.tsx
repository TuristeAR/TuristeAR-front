import { useState, useMemo } from "react";
import { Locality } from "./types"; // Define tus tipos

export const useLocalities = (localities: Locality[]) => {
  const [searchLocality, setSearchLocality] = useState("");
  const [selectedLocalities, setSelectedLocalities] = useState<Locality[]>([]);

  const filteredLocalities = useMemo(
    () =>
      localities.filter((locality) =>
        locality.name.toLowerCase().includes(searchLocality.toLowerCase())
      ),
    [searchLocality, localities]
  );

  const handleLocalitySelection = (locality: Locality) => {
    setSelectedLocalities((prev) =>
      prev.some((loc) => loc.name === locality.name)
        ? prev.filter((loc) => loc.name !== locality.name)
        : [...prev, locality]
    );
  };

  return {
    searchLocality,
    setSearchLocality,
    filteredLocalities,
    selectedLocalities,
    handleLocalitySelection,
  };
};
