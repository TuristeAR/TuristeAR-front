import ItinerarySummary from './ItinerarySummary'

const ProvisionalItinerary = ({ formData, resumedItinerary, selectedProvinces, renderPriceLevel, questions, submitFormData, setPendingItinerary, setResumedItinerary }) => {
  return (
    <div className="mx-auto">
                {resumedItinerary ? (
                  <ItinerarySummary
                    formData={formData}
                    resumedItinerary={resumedItinerary}
                    selectedProvinces={selectedProvinces}
                    renderPriceLevel={renderPriceLevel}
                    questions={questions}
                    submitFormData={submitFormData}
                  />
                ) : (
                  <>
                    <h2 className="mb-4 md:mb-16 text-center text-2xl sm:text-5xl font-semibold text-primary-4">
                      ¡Tenés un viaje pendiente!
                    </h2>
                    <p className="my-4 text-xl text-center sm:text-2xl">
                      Parece que tenés un viaje por realizar... ¿Querés continuar con el viaje
                      anterior o comenzar uno nuevo?
                    </p>
                    <div className="flex flex-col items-center justify-center md:flex-row gap-x-4 mt-4 md:mt-16">
                      <button
                        type="button"
                        className="btn-question mb-3 md:mb-0 w-72 md:w-96 text-sm md:text-md"
                        onClick={() => setPendingItinerary(false)}
                      >
                        Comenzar un nuevo viaje
                      </button>
                      <button
                        type="button"
                        className="btn-question mt-3 md:mt-0 w-72 md:w-96 text-sm md:text-md"
                        onClick={() => setResumedItinerary(true)}
                      >
                        Continuar con el viaje anterior
                      </button>
                    </div>
                  </>
                )}
              </div>
  )
}

export default ProvisionalItinerary