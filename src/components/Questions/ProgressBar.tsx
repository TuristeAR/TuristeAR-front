export const ProgressBar = ({ currentStep }: { currentStep: number }) => {
  const steps = ['Destino', 'Fecha', 'Presupuesto', 'Tipo de actividades', 'Compañeros de viaje'];

  return (
    <div className="progress-bar">
      {steps.map((step, index) => (
        <div key={index} className={`step ${currentStep === index + 1 ? 'active' : ''}`}>
          <span>{step}</span>
        </div>
      ))}
    </div>
  );
};
