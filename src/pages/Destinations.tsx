import { Header } from '../components/Header';

const Destinations = () => {
  return (
    <div>
      <Header containerStyles="bg-primary" />
      <section className="">
        <div className="bg-[#E6E6E6] w-full h-[120px]">
          <div className="container mx-auto h-full flex flex-col items-center justify-center gap-y-4 ">
            <p className="px-8 lg:px-0 max-w-[600px] text-center font-semibold tracking-tight   ">
              Si ya sabes cual es tu destino seleccionalo para descubrir los mejores lugares y
              actividades
            </p>
            <div>
              <form action="" className="flex items-center relative ">
                <input
                  className=" w-[250px] md:w-[400px]  rounded outline-none text-sm p-1  pr-10"
                  type="text"
                  placeholder="Buscar por provincia, localidad o tipo de lugar..."
                />
                <img src="/assets/search.svg" className="absolute right-2" alt="" />
              </form>
            </div>
          </div>
        </div>

        <div className="flex  ">
          <div className="flex-1 hidden md:block">
            <svg width="500" height="500" viewBox="305 275 463 696">
              <g>
                <path
                  className="hover:fill-[#fff] "
                  stroke="#555"
                  strokeOpacity="1"
                  strokeWidth="1"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  fill="#18a0fb"
                  fillOpacity="1"
                  fillRule="evenodd"
                  d="M498 662L496 664L498 663zM454 671L454 691L465 694L469 692L472 693L473 690L466 688L454 676L456 673zM507 665L510 666L511 664L509 664L515 662L513 660L515 660L512 659L512 661L512 659L509 658L508 663L507 662L505 664L507 668L507 665zM502 659L503 660L500 659L500 661L502 662L501 661L500 662L502 662L500 662L500 664L497 665L499 667L502 664L504 664L507 659L503 659zM478 691L476 691L479 692L481 690L479 691zM504 658L506 659L504 658zM504 666L504 666zM504 667L504 668zM589 0z   "
                  aria-describedby="leaflet-tooltip-835"
                ></path>
                <path
                  className="hover:fill-[#E88E20] transition-all duration-300"
                  stroke="#555"
                  strokeOpacity="1"
                  strokeWidth="1"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  fill="#18a0fb"
                  fillOpacity="1"
                  fillRule="evenodd"
                  d="M456 556L456 548L448 545L443 538L439 542L439 550L441 557L438 558L436 564L437 565L435 567L435 573L438 574L440 573L439 572L441 570L445 569L446 565L448 565L455 558L457 558L456 556z"
                  aria-describedby="leaflet-tooltip-997"
                ></path>
                <path
                  className="hover:fill-[#E88E20] transition-all duration-300"
                  stroke="#555"
                  strokeOpacity="1"
                  strokeWidth="1"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  fill="#18a0fb"
                  fillOpacity="1"
                  fillRule="evenodd"
                  d="M465 509L461 509L462 520L465 523L465 536L474 537L473 517L475 512L473 512L473 510L471 509L465 509z"
                  aria-describedby="leaflet-tooltip-793"
                ></path>
                <path
                  className="hover:fill-[#E88E20] transition-all duration-300"
                  stroke="#555"
                  strokeOpacity="1"
                  strokeWidth="1"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  fill="#18a0fb"
                  fillOpacity="1"
                  fillRule="evenodd"
                  d="M509 483L493 483L491 499L492 501L490 508L492 517L486 526L493 526L498 520L501 519L498 513L499 508L505 501L505 493L509 484z"
                  aria-describedby="leaflet-tooltip-816"
                ></path>
                <path
                  className="hover:fill-[#E88E20] transition-all duration-300"
                  stroke="#555"
                  strokeOpacity="1"
                  strokeWidth="1"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  fill="#18a0fb"
                  fillOpacity="1"
                  fillRule="evenodd"
                  d="M472 497L468 489L466 489L467 488L465 485L462 486L456 484L453 481L448 485L452 489L451 494L455 494L461 500L463 507L465 509L469 509L471 499z"
                  aria-describedby="leaflet-tooltip-844"
                ></path>
                <path
                  className="hover:fill-[#E88E20] transition-all duration-300"
                  stroke="#555"
                  strokeOpacity="1"
                  strokeWidth="1"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  fill="#18a0fb"
                  fillOpacity="1"
                  fillRule="evenodd"
                  d="M468 472L467 471L466 473L464 471L466 467L464 465L454 465L454 472L456 476L454 478L453 477L451 481L461 486L465 485L466 488L470 491L472 497L475 495L475 488L473 488L474 484L469 481L468 472z"
                  aria-describedby="leaflet-tooltip-845"
                ></path>
                <path
                  className="hover:fill-[#E88E20] transition-all duration-300"
                  stroke="#555"
                  strokeOpacity="1"
                  strokeWidth="1"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  fill="#18a0fb"
                  fillOpacity="1"
                  fillRule="evenodd"
                  d="M477 472L468 472L468 478L471 483L474 482L477 473z"
                  aria-describedby="leaflet-tooltip-815"
                ></path>
                <path
                  className="hover:fill-[#E88E20] transition-all duration-300"
                  stroke="#555"
                  strokeOpacity="1"
                  strokeWidth="1"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  fill="#18a0fb"
                  fillOpacity="1"
                  fillRule="evenodd"
                  d="M512 476L496 462L494 462L494 460L489 458L489 460L483 468L493 468L493 483L509 483L511 478L510 477L512 476z"
                  aria-describedby="leaflet-tooltip-842"
                ></path>
                <path
                  className="hover:fill-[#E88E20] transition-all duration-300"
                  stroke="#555"
                  strokeOpacity="1"
                  strokeWidth="1"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  fill="#18a0fb"
                  fillOpacity="1"
                  fillRule="evenodd"
                  d="M512 476L513 471L517 467L514 464L509 463L506 460L497 456L490 450L490 448L489 458L494 460L494 462L496 462L512 476z"
                  aria-describedby="leaflet-tooltip-841"
                ></path>
                <path
                  className="hover:fill-[#E88E20] transition-all duration-300"
                  stroke="#555"
                  strokeOpacity="1"
                  strokeWidth="1"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  fill="#18a0fb"
                  fillOpacity="1"
                  fillRule="evenodd"
                  d="M459 612L437 612L435 614L435 623L434 622L434 624L432 624L433 625L431 629L433 631L432 634L431 633L431 637L429 637L428 640L426 639L425 647L428 654L430 652L433 653L432 661L435 663L435 665L446 665L455 668L452 661L448 661L452 660L451 655L449 656L451 654L451 651L455 648L453 646L454 644L454 646L457 647L460 638L464 633L466 633L470 629L468 627L467 628L470 625L470 623L463 620L460 617L460 613z"
                  aria-describedby="leaflet-tooltip-843"
                ></path>
                <path
                  className="hover:fill-[#E88E20] transition-all duration-300"
                  stroke="#555"
                  strokeOpacity="1"
                  strokeWidth="1"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  fill="#18a0fb"
                  fillOpacity="1"
                  fillRule="evenodd"
                  d="M474 581L433 582L433 586L437 594L435 598L440 601L438 603L434 603L438 606L437 609L436 608L436 612L459 612L463 606L467 604L471 605L470 602L473 599L472 595L474 590L478 588L474 586L477 585L479 586L479 588L482 587L481 581L478 583L480 583L479 584L477 584L474 581z"
                  aria-describedby="leaflet-tooltip-790"
                ></path>
                <path
                  className="hover:fill-[#E88E20] transition-all duration-300"
                  stroke="#555"
                  strokeOpacity="1"
                  strokeWidth="1"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  fill="#18a0fb"
                  fillOpacity="1"
                  fillRule="evenodd"
                  d="M461 512L457 510L453 512L451 509L448 510L445 514L445 518L447 518L447 524L445 526L444 531L442 532L444 534L443 537L448 545L452 547L453 546L455 548L455 537L465 537L466 534L466 529L464 527L465 522L462 519L461 512z"
                  aria-describedby="leaflet-tooltip-783"
                ></path>
                <path
                  className="hover:fill-[#E88E20] transition-all duration-300"
                  stroke="#555"
                  strokeOpacity="1"
                  strokeWidth="1"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  fill="#18a0fb"
                  fillOpacity="1"
                  fillRule="evenodd"
                  d="M491 499L488 498L487 495L474 493L475 495L472 497L470 503L470 509L475 511L474 530L483 530L483 526L486 526L492 517L493 515L490 510L492 501z"
                  aria-describedby="leaflet-tooltip-788"
                ></path>
                <path
                  className="hover:fill-[#E88E20] transition-all duration-300"
                  stroke="#555"
                  strokeOpacity="1"
                  strokeWidth="1"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  fill="#18a0fb"
                  fillOpacity="1"
                  fillRule="evenodd"
                  d="M512 523L511 520L514 516L513 509L515 501L511 497L509 497L504 500L505 501L499 508L498 513L503 520L512 523z"
                  aria-describedby="leaflet-tooltip-839"
                ></path>
                <path
                  className="hover:fill-[#E88E20] transition-all duration-300"
                  stroke="#555"
                  strokeOpacity="1"
                  strokeWidth="1"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  fill="#18a0fb"
                  fillOpacity="1"
                  fillRule="evenodd"
                  d="M448 486L446 490L447 497L444 500L444 504L443 503L445 514L448 512L448 510L451 509L452 512L456 510L461 512L462 508L465 509L459 498L451 493L452 490L448 486z"
                  aria-describedby="leaflet-tooltip-836"
                ></path>
                <path
                  className="hover:fill-[#E88E20] transition-all duration-300"
                  stroke="#555"
                  strokeOpacity="1"
                  strokeWidth="1"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  fill="#18a0fb"
                  fillOpacity="1"
                  fillRule="evenodd"
                  d="M473 446L468 444L462 450L462 456L465 459L468 454L468 457L472 461L476 461L479 459L479 455L475 455L475 453L472 450L473 446z"
                  aria-describedby="leaflet-tooltip-936"
                ></path>
                <path
                  className="hover:fill-[#E88E20] transition-all duration-300"
                  stroke="#555"
                  strokeOpacity="1"
                  strokeWidth="1"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  fill="#18a0fb"
                  fillOpacity="1"
                  fillRule="evenodd"
                  d="M493 483L493 468L478 468L473 487L475 489L475 493L487 495L488 498L491 499z"
                  aria-describedby="leaflet-tooltip-837"
                ></path>
                <path
                  className="hover:fill-[#E88E20] transition-all duration-300"
                  stroke="#555"
                  strokeOpacity="1"
                  strokeWidth="1"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  fill="#18a0fb"
                  fillOpacity="1"
                  fillRule="evenodd"
                  d="M458 548L456 548L457 557L448 565L446 565L446 567L443 570L441 570L439 574L435 573L436 580L474 581L473 573L475 571L480 574L487 573L483 571L483 561L480 558L468 556L467 557L460 553L458 551L458 548z"
                  aria-describedby="leaflet-tooltip-791"
                ></path>
                <path
                  className="hover:fill-[#E88E20] transition-all duration-300"
                  stroke="#555"
                  strokeOpacity="1"
                  strokeWidth="1"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  fill="#18a0fb"
                  fillOpacity="1"
                  fillRule="evenodd"
                  d="M525 479L521 481L512 478L509 480L509 484L505 492L505 498L511 497L515 501L515 499L528 484L525 479zM520 479L521 480L520 479zM517 479L517 479zM521 480L521 480zM520 480L520 480z"
                  aria-describedby="leaflet-tooltip-838"
                ></path>
                <path
                  className="hover:fill-[#E88E20] transition-all duration-300"
                  stroke="#555"
                  strokeOpacity="1"
                  strokeWidth="1"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  fill="#18a0fb"
                  fillOpacity="1"
                  fillRule="evenodd"
                  d="M527 484L529 484L539 476L538 468L533 468L532 474L527 479L525 479L527 483z"
                  aria-describedby="leaflet-tooltip-840"
                ></path>
                <path
                  className="hover:fill-[#E88E20] transition-all duration-300"
                  stroke="#555"
                  strokeOpacity="1"
                  strokeWidth="1"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  fill="#18a0fb"
                  fillOpacity="1"
                  fillRule="evenodd"
                  d="M489 448L487 446L482 445L480 445L478 451L476 446L472 448L475 455L479 455L479 459L476 462L472 460L471 461L470 458L468 457L468 454L465 459L462 456L461 458L454 462L455 465L464 465L466 467L464 471L466 473L468 471L470 473L470 471L478 471L478 468L482 468L489 460z"
                  aria-describedby="leaflet-tooltip-814"
                ></path>
                <path
                  className="hover:fill-[#E88E20] transition-all duration-300"
                  stroke="#555"
                  strokeOpacity="1"
                  strokeWidth="1"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  fill="#18a0fb"
                  fillOpacity="1"
                  fillRule="evenodd"
                  d="M483 530L474 530L474 537L455 537L456 548L459 549L458 551L460 553L467 557L468 556L480 558L483 561z"
                  aria-describedby="leaflet-tooltip-792"
                ></path>
                <path
                  className="hover:fill-[#E88E20] transition-all duration-300"
                  stroke="#555"
                  strokeOpacity="1"
                  strokeWidth="1"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  fill="#18a0fb"
                  fillOpacity="1"
                  fillRule="evenodd"
                  d="M512 523L507 522L501 518L497 520L493 526L483 526L483 571L487 573L490 572L489 565L491 563L491 560L489 560L489 556L491 558L508 556L515 553L522 543L521 540L518 538L518 531L512 527L511 528L512 523zM491 559L492 559zM491 558L491 558zM490 568L491 569zM491 559L491 559zM490 569L490 570zM512 524L512 524z"
                  aria-describedby="leaflet-tooltip-789"
                ></path>
                <path
                  className="hover:fill-[#E88E20] transition-all duration-300"
                  stroke="#555"
                  strokeOpacity="1"
                  strokeWidth="1"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  fill="#18a0fb"
                  fillOpacity="1"
                  fillRule="evenodd"
                  d="M512 527L511 528L512 527z"
                  aria-describedby="leaflet-tooltip-846"
                ></path>
              </g>
            </svg>
          </div>

          <div className="flex-1 flex  flex-col gap-y-6 border-l-[1px]  border-gray-50  px-4">
            {/* Info */}
            <div className="flex flex-col gap-y-4 m-4">
              <h1>Buenos Aires</h1>
              <p className="font-light text-gray-500  ">
                Lorem, ipsum dolor sit amet consectetur adipisicing elit. Esse corrupti laborum
                possimus ad eligendi iusto, perferendis atque accusantium consequatur facere.
              </p>
              <p className="font-light text-gray-500  ">
                Lorem, ipsum dolor sit amet consectetur adipisicing elit. Esse corrupti laborum
                possimus ad eligendi iusto, perferendis atque accusantium consequatur facere.
              </p>
              <div className="flex my-6 gap-2 ">
                <div className="w-[200px] h-[200px] bg-gray"></div>
              </div>
              <div>
                <button className="btn-blue">Ver más</button>
              </div>
            </div>
            {/* Publicaciones */}
            <div className="bg-gray-50/50 rounded-lg flex flex-col mb-4 gap-y-4">
              <div className="m-4 ">
                <div className="flex justify-between">
                  <div className="flex justify-center  gap-4 text-gray">
                    <div>Foto</div>
                    <p>usuario</p>
                  </div>
                  <p className="text-gray">26 Sep 2024</p>
                </div>
                <p className="font-light text-gray-500  ">
                  Lorem, ipsum dolor sit amet consectetur adipisicing elit. Esse corrupti laborum
                  possimus ad eligendi iusto, perferendis atque accusantium consequatur facere.
                </p>
                <p className="font-light text-gray-500  ">
                  Lorem, ipsum dolor sit amet consectetur adipisicing elit. Esse corrupti laborum
                  possimus ad eligendi iusto, perferendis atque accusantium consequatur facere.
                </p>
                <div className="flex  my-6 gap-2">
                  <div className="w-[200px] h-[200px] bg-gray"></div>
                </div>
                <div>
                  <button className="btn-blue">Ver más publicaciones</button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Destinations;
