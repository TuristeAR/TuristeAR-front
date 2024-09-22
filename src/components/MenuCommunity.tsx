import logo from '/assets/logo.svg';
function MenuCommunity() {
  return (
    <>
      <div className="flex flex-col gap-4 text-l font-semibold">
        <div className="flex flex-row items-center gap-2">
          <img src={logo} alt="logo" className="h-8 w-8 object-cover" />
          <h6>Publicaciones</h6>
        </div>
        <div className="flex flex-row items-center gap-2">
          <img src={logo} alt="logo" className="h-8 w-8 object-cover" />
          <h6>Foro y preguntas</h6>
        </div>
        <div className="flex flex-row items-center gap-2">
          <img src={logo} alt="logo" className="h-8 w-8 object-cover" />
          <h6>Ofertas de trabajo</h6>
        </div>
      </div>
    </>
  );
}

export default MenuCommunity;
