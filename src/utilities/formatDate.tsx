export const formatDate = (dateString: string): string => {
  const [day, month, year] = dateString.split('-');

  const date = new Date(Number(year), Number(month) - 1, Number(day));

  if (isNaN(date.getTime())) {
    return 'Fecha inválida';
  }

  const options: Intl.DateTimeFormatOptions = { day: 'numeric', month: 'long' };
  return date.toLocaleDateString('es-ES', options);
};
