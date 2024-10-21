import { ImageGallery } from '../ImageGallery/ImageGallery';
export function PostCard(props: {
  imgPerson: string;
  usuario: string;
  fecha: string;
  descripcion: string;
  province?: string;
  place?: string;
  img: string[];
  rating?: number;
}) {
  const { imgPerson, usuario, fecha, descripcion, img, province, place, rating } = props;

  return (
    <>
      <div className="flex flex-col mx-auto gap-y-4 h-fi bg-gray-2 border-primary-3  p-4 rounded-xl border-b max-w-xl shadow-[0_10px_25px_-10px_rgba(0,0,0,4)] ">
        <div className="flex justify-between items-center px-2 text-gray">
          <div className="flex items-center gap-2">
            <div className="rounded-full  border border-1 border-black">
              <img className="w-8 h-8" src={imgPerson} alt="person" />
            </div>
            <div className="flex flex-col">
              {rating ? (
                <div className="flex flex-nowrap max-w-fit justify-around gap-1">
                  {[...Array(Math.round(rating))].map((_, index) => (
                    <svg
                      key={index}
                      className="items-end ml-auto size-5"
                      xmlns="http://www.w3.org/2000/svg"
                      height="30px"
                      viewBox="0 -960 960 960"
                      width="24px"
                      fill="#49A2EC"
                    >
                      <path d="m223-107 68-292L64-596l300-25 116-276 117 276 299 25-227 197 68 292-257-155-257 155Z" />
                    </svg>
                  ))}
                </div>
              ) : (
                ''
              )}
              <p className="font-semibold">{usuario}</p>
            </div>
          </div>
          <p>{fecha}</p>
        </div>
        <p className="font-light px-2 text-gray-500 mb-auto md:text-base lg:text-lg text-start">
          {descripcion}
        </p>
        <p className="italic text-sm mt-auto font-light">
          {place}, {province}
        </p>
        <ImageGallery images={img.filter((i) => i != null)}></ImageGallery>
      </div>
    </>
  );
}
