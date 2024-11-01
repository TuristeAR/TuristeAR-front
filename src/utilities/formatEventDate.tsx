const formatFromDateAndToDate = (fromDate: string, toDate: string) => {
  const from = new Date(fromDate);
  const to = new Date(toDate);

  const options: Intl.DateTimeFormatOptions = { day: 'numeric', month: 'long' };

  if (
    !toDate ||
    fromDate === toDate ||
    (from.getDate() === to.getDate() && from.getMonth() === to.getMonth())
  ) {
    return from.toLocaleDateString('es-ES', options);
  }

  const fromDay = from.getDate();
  const toDay = to.getDate();
  const fromMonth = from.toLocaleDateString('es-ES', { month: 'long' });
  const toMonth = to.toLocaleDateString('es-ES', { month: 'long' });

  if (from.getMonth() !== to.getMonth()) {
    return `${fromDay} de ${fromMonth} a ${toDay} de ${toMonth}`;
  }

  return `${fromDay} a ${toDay} de ${fromMonth}`;
};

export default formatFromDateAndToDate;
