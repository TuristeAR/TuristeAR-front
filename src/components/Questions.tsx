import React, { useState } from 'react';

const Question = ({ question }: { question: any }) => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="w-full mb-4 ">
      <button
        type="button"
        className="flex items-center justify-between w-full p-5 font-medium rtl:text-right text-gray-500 border border-b-2 border-gray-200 rounded-t-xl focus:ring-4 focus:ring-gray-200 hover:bg-gray-100 gap-3"
        onClick={() => setIsOpen(!isOpen)}
      >
        <span className="flex items-center">{question.question}</span>
        <svg
          data-accordion-icon
          className="w-3 h-3 rotate-180 shrink-0"
          aria-hidden="true"
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 10 6"
        >
          <path
            stroke="currentColor"
            stroke-linecap="round"
            stroke-linejoin="round"
            stroke-width="2"
            d="M9 5 5 1 1 5"
          />
        </svg>
      </button>

      {isOpen && (
        <div className="p-2 bg-gray-100 rounded font-light text-gray-500 text-md text-start">
          {question.options.map((option: any, index: number) => (
            <label key={index} className="flex gap-x-2">
              <input type="radio" name={question.question} value={option} />
              {option}
            </label>
          ))}
        </div>
      )}
    </div>
  );
};

export default Question;
