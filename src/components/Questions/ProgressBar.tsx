export const ProgressBar = ({ currentStep }: { currentStep: number }) => {
  const steps = ['Inicio', 'Presupuesto', 'Clima', 'Tipo de actividades', 'Compañeros de viaje'];

  return (
    <div className="progress-bar">
      {steps.map((step, index) => (
        <div key={index} className={`step ${currentStep === index + 1 ? 'active' : ''}`}> {/* Se suma index + 1 xq el array comienza en 0 y currentStep comienza en 1 */}
          <span>{step}</span>
        </div>
      ))}
    </div>
  );
};
