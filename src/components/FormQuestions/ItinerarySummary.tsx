const ItinerarySummary = ({
  formData,
  resumedItinerary,
  selectedProvinces,
  renderPriceLevel,
  questions,
  submitFormData
}) => {
  if (!resumedItinerary) return null;

  return (
    <>
      <h2 className="mb-4 md:mb-16 text-center text-2xl sm:text-5xl font-semibold text-primary-4">
        Resumen de tu viaje
      </h2>
      <div className="flex flex-col">
        {selectedProvinces && (
          <span className="text-center text-xl my-1">
            Provincias:{' '}
            <strong>
              {selectedProvinces.map((province, index) => (
                <strong key={province.id}>
                  {province.name}
                  {index < selectedProvinces.length - 2
                    ? ', '
                    : index === selectedProvinces.length - 2
                      ? ' y '
                      : ''}
                </strong>
              ))}
            </strong>
          </span>
        )}
        <span className="text-center text-xl my-1">
          Lugares a visitar:{' '}
          {formData.localities.map((locality, index) => (
            <strong key={locality.name}>
              {locality.name}
              {index < formData.localities.length - 1 && ', '}
            </strong>
          ))}
        </span>
        <span className="text-center text-xl my-1">
          Fecha de inicio:{' '}
          <strong>{new Date(formData.fromDate).toLocaleDateString('es-ES')}</strong>
        </span>
        <span className="text-center text-xl my-1">
          Fecha de finalización:{' '}
          <strong>{new Date(formData.toDate).toLocaleDateString('es-ES')}</strong>
        </span>
        <span className="text-center text-xl my-1">
          Duración:{' '}
          <strong>
            {Math.ceil(
              (new Date(formData.toDate).getTime() - new Date(formData.fromDate).getTime()) /
                (1000 * 60 * 60 * 24),
            )}{' '}
            días
          </strong>
        </span>
        <div className="flex flex-wrap justify-center gap-5 my-2">
          {renderPriceLevel()}
          {formData.types.map((type) => {
            const option = questions[3].options.find((option) => option.data.toString() === type);
            return (
              <div
                key={type}
                className="w-40 h-40 flex flex-col items-center justify-center gap-y-2 mx-2 border border-gray"
              >
                {option?.src}
                {option?.alt}
              </div>
            );
          })}
          <div
            key="company"
            className="w-40 h-40 flex flex-col items-center justify-center gap-y-2 mx-2 p-2 border border-gray"
          >
            {questions[4].options.find((option) => option.data === formData.company)?.src}
            {questions[4].options.find((option) => option.data === formData.company)?.alt}
          </div>
        </div>
      </div>
      <div className="w-full flex justify-center my-2">
        <button type="button" className="btn-question" onClick={submitFormData}>
          Finalizar
        </button>
      </div>
    </>
  );
};

export default ItinerarySummary;
