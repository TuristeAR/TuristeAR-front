import logo from '/assets/logo.svg';
function MenuCommunity() {
  return (
    <>
      <div className="flex flex-col gap-4 text-l font-semibold">
        <div className="flex flex-row items-center gap-2 hover:bg-[#d9d9d9] rounded-xl">
          <img src={logo} alt="logo" className="h-8 w-8 object-cover" />
          <a href="/publications">Publicaciones</a>
        </div>
        <div className="flex flex-row items-center gap-2 hover:bg-[#d9d9d9] rounded-xl">
          <img src={logo} alt="logo" className="h-8 w-8 object-cover" />
          <a href="/foro">Foro y preguntas</a>
        </div>
        <div className="flex flex-row items-center gap-2 hover:bg-[#d9d9d9] rounded-xl">
          <img src={logo} alt="logo" className="h-8 w-8 object-cover" />
          <a href="/trabajo">Ofertas de trabajo</a>
        </div>
      </div>
    </>
  );
}

export default MenuCommunity;
