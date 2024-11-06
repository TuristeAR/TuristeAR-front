export const reorderDate = (dateString: string) => {
  const formatDate = (date) => {
    const [year, month, day] = date.split('-');
    return `${day}-${month}-${year}`;
  };

  return formatDate(dateString);
};
