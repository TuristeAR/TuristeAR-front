import React from 'react';

function CreatePost(props : {
  options: string[];
}) {
  const {options} = props
  return (
    <>
      <div className="flex justify-around items-center lg:p-2 pt-4 pb-4">
        <div className="w-[20%]">
          <img src="/assets/person.svg" alt="logo" className="h-8 w-8 object-cover mx-auto" />
        </div>
        <input
          type="text"
          className="border border-black w-[60%] lg:p-4 p-2 lg:rounded-3xl rounded-2xl"
          placeholder="Escribe tu experiencia"
        />
        <div className="w-[20%]">
          <img src="/assets/send.svg" alt="logo" className="w-[50px] mx-auto" />
        </div>
      </div>
      <div className="lg:flex lg:justify-around grid grid-cols-2 p-4 border-t border-black">
        {options.map((item, index) => {
          return (
            <div key={index} className="flex gap-2 items-center mx-auto">
              <img src="/assets/add.svg" alt="Agregar" className="lg:w-8 w-[20px] object-cover" />
              <p className="">{item}</p>
            </div>
          );
        })}
      </div>
    </>
  );
}

export default CreatePost;
