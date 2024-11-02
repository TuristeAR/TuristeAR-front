export const AddActivityCalendar = ({ eventName, setEventName, handleClose, handleSave }) => {
  return (
    <>
      <div className="flex justify-center items-center fixed top-0 left-0 w-[100%] h-[100%] z-20 bg-black/80">
        <div className="flex flex-col gap-y-2 bg-white p-5 rounded-lg shadow-md text-center w-80 h-36 relative">
          <span
            className="absolute top-0 right-4 text-[24px] cursor-pointer text-black font-bold"
            onClick={handleClose}
          >
            &times;
          </span>
          <h2 className="font-semibold text-xl">Nueva actividad</h2>
          <input
            className="border border-gray-300 rounded-md p-1 outline-none border-primary"
            type="text"
            placeholder="Título del evento"
            value={eventName}
            onChange={(e) => setEventName(e.target.value)}
            autoComplete="off"
          />
          <button className="btn-question" onClick={handleSave}>
            Guardar
          </button>
        </div>
      </div>
    </>
  );
};
