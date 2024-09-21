import React from 'react';
import Carousel from './Carousel';
interface Image {
    id: number;
    src: string;
}
interface ArticleCardProps {
    title: string;
    images: Image[];
    description: string;
    link: string;
}

const ArticleCard: React.FC<ArticleCardProps> = ({ title, images, description, link }) => {
    return (
        <div className="max-w-xs bg-white border  border-primary-3 rounded-lg shadow">
            <Carousel>
                {
                    images.map((item, index) => {
                        return (
                            <a href={link}>
                                <img className="rounded-t-lg" src={item.src} alt={title} />
                            </a>
                        )
                    })
                }
            </Carousel>

            <div className="p-5">
                <a href={link}>
                    <h5 className="mb-2 text-2xl font-bold tracking-tight text-gray-900">{title}</h5>
                </a>
                <p className="mb-3 font-normal text-gray-700">{description}</p>
                <div className='flex gap-1'>
                    <a href={link} className="border inline-flex items-center px-1 py-1 text-[10px] font-medium text-center text-primary bg-blue-700 rounded-lg hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300">
                        Teatro Colon
                    </a>
                    <a href={link} className="border inline-flex items-center px-3 py-1 text-[10px] font-medium text-center text-primary bg-blue-700 rounded-lg hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300">
                        Caba
                    </a>
                    <svg className='items-end ml-auto' xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 -960 960 960" width="24px" fill="#49A2EC"><path d="m223-107 68-292L64-596l300-25 116-276 117 276 299 25-227 197 68 292-257-155-257 155Z"/></svg><span className='text-primary font-medium'>4.5</span>
                </div>

            </div>
        </div>
    );
};

export default ArticleCard;
