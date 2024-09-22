function CommunityFilters(props: {
  title: string;
  users: { imgPerson: string; user: string }[]; // Ajuste del tipo de `users`
  link: string;
}) {
  const { title, users, link } = props;

  return (
    <>
      <h2 className="text-xl font-bold">{title}</h2> {/* Muestra el título */}
      <form className="flex flex-col gap-4">
        <input type="text" className="border border-[#999999] pl-2" placeholder="Buscar" />
      </form>
      <div className="space-y-4">
        {users.map((friend, index) => (
          <div key={index} className="flex justify-between items-center">
            <button className="flex gap-2 items-center hover:bg-[#d9d9d9] rounded-xl w-[100%]">
              <img className="w-[35px]" src={friend.imgPerson} alt={`Imagen de ${friend.user}`} />
              <p className="font-light text-gray-500 text-sm md:text-base text-start ">
                {friend.user}
              </p>
            </button>
          </div>
        ))}
      </div>
      <div className="border-b border-[#999999] p-2 pr-0 hover:bg-[#d9d9d9] rounded-t-xl">
        <a href={link}>Descubrir más</a>
      </div>
    </>
  );
}

export default CommunityFilters;
