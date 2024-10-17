import { ChangeEvent, useState } from 'react';

export const ModalActivity = ({ handleClose, editEvent, deleteActivity, eventInfo }) => {
  const [isEditing, setIsEditing] = useState(false); // Estado para controlar si estamos editando
  const [newName, setNewName] = useState(eventInfo.event.title); // Estado para el nuevo nombre del evento

  const handleSave = () => {
    editEvent(Number(eventInfo.event.id), newName); // Llama a la función `editEvent` con el nuevo nombre
    setIsEditing(false); // Salir del modo de edición
  };

  const handleEvent = (e: ChangeEvent<HTMLInputElement>) => {
    setNewName(e.target.value);
  };

  return (
    <>
      <div className="flex justify-center items-center fixed top-0 left-0 w-[100%] h-[100%] z-50 bg-black/80">
        <div className="flex flex-col gap-y-2 bg-white p-8 rounded-lg shadow-md text-center w-auto h-auto relative">
          <span
            className="absolute top-0 right-4 text-[24px] cursor-pointer text-black font-bold"
            onClick={handleClose}
          >
            &times;
          </span>
          {isEditing ? (
            <input
              className="border border-gray-300 z-50 rounded-md p-1 outline-none text-black border-primary"
              type="text"
              value={newName}
              onChange={(e) => handleEvent(e)}
              autoFocus // Esto enfoca automáticamente el input al entrar en modo edición
            />
          ) : (
            <span className="text-[11px] md:text-sm font-semibold whitespace-normal break-words text-black">
              {eventInfo.event.title.replace(/ - \d{1,2} \w+\./, '')}
            </span>
          )}

          <span className="text-[11px] md:text-sm font-semibold whitespace-normal break-words text-black">
            {eventInfo.event.start && eventInfo.event.start.toLocaleDateString()}{' '}
            {eventInfo.event.start && eventInfo.event.start.toLocaleTimeString()}{' '}
          </span>
          <div className="flex gap-x-2 justify-between mt-1 overflow-hidden ">
            {isEditing ? (
              <button onClick={handleSave} className="btn-question">
                Guardar
              </button>
            ) : (
              <button onClick={() => setIsEditing(true)} className="btn-question">
                Editar actividad
              </button>
            )}
            <button
              onClick={() => deleteActivity(Number(eventInfo.event.id))}
              className="btn-question"
            >
              Borrar actividad
            </button>
          </div>
        </div>
      </div>
    </>
  );
};
