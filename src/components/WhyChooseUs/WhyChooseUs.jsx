import React from "react";
import { FaShippingFast, FaHeadphonesAlt, FaRegMoneyBillAlt } from "react-icons/fa";

const whyChooseUsData = [
  {
    id: 1,
    icon: <FaShippingFast className="text-white text-2xl" />,
    title: "Free And Fast Delivery",
    subtitle: "Free delivery for all orders over $140",
  },
  {
    id: 2,
    icon: <FaHeadphonesAlt className="text-white text-2xl" />,
    title: "24/7 CUSTOMER SERVICE",
    subtitle: "Friendly 24/7 customer support",
  },
  {
    id: 3,
    icon: <FaRegMoneyBillAlt className="text-white text-2xl" />,
    title: "MONEY BACK GUARANTEE",
    subtitle: "We return money within 30 days",
  },
];

const WhyChooseUs = () => {
  return (
    <div className="py-16 px-4 bg-white">
       <div className="text-center max-w-xl mx-auto mb-10">
          <h2 className="text-3xl font-bold mb-2">Why Choose Us</h2>
        </div>
      <div className="max-w-7xl mx-auto grid gap-8 md:grid-cols-2 lg:grid-cols-3 text-center">
        {whyChooseUsData.map((item) => (
          <div key={item.id} className="flex flex-col items-center gap-4">
            {/* Icon circle */}
            <div className="bg-black p-4 rounded-full border-4 border-gray-300">
              {item.icon}
            </div>
            {/* Title & Subtitle */}
            <h3 className="text-lg font-semibold">{item.title}</h3>
            <p className="text-gray-500 text-sm">{item.subtitle}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default WhyChooseUs;
