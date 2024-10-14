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
      <div className="flex flex-col gap-y-4 md:w-2/5 bg-gray-2 border-primary-3  p-4 rounded-xl border-b max-w-xl shadow-[0_10px_25px_-10px_rgba(0,0,0,4)] ">
        <div className="flex justify-between items-center px-2 text-gray">
          <div className="flex items-center gap-4">
            <div className="rounded-full  border border-1 border-black">
              <img className="w-8 h-8" src={imgPerson} alt="person" />
            </div>
            <p className="font-semibold">{usuario}</p>
          </div>
          <p>{fecha}</p>
        </div>
        <div className="flex px-2 text-primary">
          {rating ? (
            <>
              <span className="my-auto font-semibold text-xl">{rating}</span>
              <svg
                className="items-end "
                xmlns="http://www.w3.org/2000/svg"
                height="30px"
                viewBox="0 -960 960 960"
                width="24px"
                fill="#49A2EC"
              >
                <path d="m223-107 68-292L64-596l300-25 116-276 117 276 299 25-227 197 68 292-257-155-257 155Z" />
              </svg>
            </>
          ) : (
            ''
          )}
        </div>
        <p className="font-light px-2 text-gray-500 mb-auto md:text-base lg:text-lg text-start">
          {descripcion}
        </p>

        <p className="italic text-sm mt-auto font-light">
          {place}, {province}
        </p>
        <ImageGallery images={img.filter((i) => i != null)}></ImageGallery>
        <div>
          <div className="text-gray-500 dark:text-gray-400 flex  justify-between">
            <div className="flex items-center">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                height="20px"
                viewBox="0 -960 960 960"
                width="20px"
                fill="#000000"
              >
                <path d="m480-121-41-37q-105.77-97.12-174.88-167.56Q195-396 154-451.5T96.5-552Q80-597 80-643q0-90.15 60.5-150.58Q201-854 290-854q57 0 105.5 27t84.5 78q42-54 89-79.5T670-854q89 0 149.5 60.42Q880-733.15 880-643q0 46-16.5 91T806-451.5Q765-396 695.88-325.56 626.77-255.12 521-158l-41 37Zm0-79q101.24-93 166.62-159.5Q712-426 750.5-476t54-89.14q15.5-39.13 15.5-77.72 0-66.14-42-108.64T670.22-794q-51.52 0-95.37 31.5T504-674h-49q-26-56-69.85-88-43.85-32-95.37-32Q224-794 182-751.5t-42 108.82q0 38.68 15.5 78.18 15.5 39.5 54 90T314-358q66 66 166 158Zm0-297Z" />
              </svg>
              <span className="ml-3">615</span>
            </div>
            <div className="flex items-center">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                height="20px"
                viewBox="0 -960 960 960"
                width="20px"
                fill="#000000"
              >
                <path d="M480-80 376-237H140q-24.75 0-42.37-17.63Q80-272.25 80-297v-523q0-24.75 17.63-42.38Q115.25-880 140-880h680q24.75 0 42.38 17.62Q880-844.75 880-820v523q0 24.75-17.62 42.37Q844.75-237 820-237H584L480-80Zm0-108 72-109h268v-523H140v523h268l72 109Zm0-371Z" />
              </svg>
              <span className="ml-3">615</span>
            </div>
            <div className="flex items-center">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                height="20px"
                viewBox="0 -960 960 960"
                width="20px"
                fill="#000000"
              >
                <path d="M686-80q-47.5 0-80.75-33.25T572-194q0-8 5-34L278-403q-16.28 17.34-37.64 27.17Q219-366 194-366q-47.5 0-80.75-33.25T80-480q0-47.5 33.25-80.75T194-594q24 0 45 9.3 21 9.29 37 25.7l301-173q-2-8-3.5-16.5T572-766q0-47.5 33.25-80.75T686-880q47.5 0 80.75 33.25T800-766q0 47.5-33.25 80.75T686-652q-23.27 0-43.64-9Q622-670 606-685L302-516q3 8 4.5 17.5t1.5 18q0 8.5-1 16t-3 15.5l303 173q16-15 36.09-23.5 20.1-8.5 43.07-8.5Q734-308 767-274.75T800-194q0 47.5-33.25 80.75T686-80Zm.04-60q22.96 0 38.46-15.54 15.5-15.53 15.5-38.5 0-22.96-15.54-38.46-15.53-15.5-38.5-15.5-22.96 0-38.46 15.54-15.5 15.53-15.5 38.5 0 22.96 15.54 38.46 15.53 15.5 38.5 15.5Zm-492-286q22.96 0 38.46-15.54 15.5-15.53 15.5-38.5 0-22.96-15.54-38.46-15.53-15.5-38.5-15.5-22.96 0-38.46 15.54-15.5 15.53-15.5 38.5 0 22.96 15.54 38.46 15.53 15.5 38.5 15.5Zm492-286q22.96 0 38.46-15.54 15.5-15.53 15.5-38.5 0-22.96-15.54-38.46-15.53-15.5-38.5-15.5-22.96 0-38.46 15.54-15.5 15.53-15.5 38.5 0 22.96 15.54 38.46 15.53 15.5 38.5 15.5ZM686-194ZM194-480Zm492-286Z" />
              </svg>
              <span className="ml-3">615</span>
            </div>
            <div className="flex items-center">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                height="20px"
                viewBox="0 -960 960 960"
                width="20px"
                fill="#000000"
              >
                <path d="M200-120v-665q0-24 18-42t42-18h440q24 0 42 18t18 42v665L480-240 200-120Zm60-91 220-93 220 93v-574H260v574Zm0-574h440-440Z" />
              </svg>
              <span className="ml-3">615</span>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
