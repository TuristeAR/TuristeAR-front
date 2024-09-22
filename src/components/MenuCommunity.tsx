
function MenuCommunity() {
  return (
    <>
      <div className="flex flex-col gap-4 text-l font-semibold">
        <div className="flex flex-row items-center gap-2 hover:bg-[#d9d9d9] rounded-xl">
          <img src="/assets/home.svg" alt="Publicaciones" className="w-[25px]" />
          <a href="/publications">Publicaciones</a>
        </div>
        <div className="flex flex-row items-center gap-2 hover:bg-[#d9d9d9] rounded-xl">
          <img src="/assets/message.svg" alt="Foro y preguntas" className="w-[25px]"  />
          <a href="/forum">Foro y preguntas</a>
        </div>
        <div className="flex flex-row items-center gap-2 hover:bg-[#d9d9d9] rounded-xl">
          <img src="/assets/personBlue.svg" alt="Ofertas de trabajo" className="w-[25px]"  />
          <a href="/jobs">Ofertas de trabajo</a>
        </div>
      </div>
    </>
  );
}

export default MenuCommunity;
