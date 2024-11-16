import { useState } from 'react';

const useSelection = (questions: any, formData: any, setFormData: React.Dispatch<React.SetStateAction<any>>) => {

  const handleMultipleSelection = (option: string) => {
    // Si es múltiple, se añade o elimina la opción del array
    const newSelection = formData.types.includes(option)
      ? formData.types.filter((item: string) => item !== option)
      : [...formData.types, option];

    setFormData((prevData: any) => ({ ...prevData, types: newSelection }));
  };

  const handleSingleSelection = (questionName: string, option: number) => {
    // Si es selección única, se actualiza el valor directamente
    setFormData((prevData: any) => ({
      ...prevData,
      [questionName]: option,
    }));
  };

  return { handleMultipleSelection, handleSingleSelection };
};

export default useSelection;
