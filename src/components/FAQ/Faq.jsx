import React from "react";
import { Link as ScrollLink, Element } from "react-scroll";

const faqs = [
  {
    question: "How do I return my item?",
    id: "return-item",
    answer: `Returning your item is simple and hassle-free. If you're not completely satisfied with your watch, you can initiate a return within 14 days of delivery...`,
  },
  
];

export default function FAQPage() {
  return (
    <div className="flex flex-col md:flex-row p-6 md:p-12  gap-10">
    
      <div className="md:w-1/3 space-y-6">
        {faqs.map((faq) => (
          <ScrollLink
            key={faq.id}
            to={faq.id}
            smooth={true}
            duration={500}
            offset={-80}
            className="cursor-pointer text-lg font-medium text-gray-800 hover:text-blue-600 border-b border-dotted border-gray-400 pb-2 block"
          >
            {faq.question}
          </ScrollLink>
        ))}
      </div>

   
    </div>
  );
}
