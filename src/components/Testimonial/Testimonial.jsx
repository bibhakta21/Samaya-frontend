import React from "react";
import Slider from "react-slick";
import user1 from "../../assets/test.png";
import user2 from "../../assets/sandip.jpg";
import user3 from "../../assets/man.png";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

const TestimonialsData = [
  {
    id: 1,
    name: "Bibhakta",
    location: "Kathmandu",
    text: "Don’t waste time, just order! This is the best website to purchase watches. Best e-commerce site in Nepal. I liked the service of Samaya.",
    img: user1,
  },
  {
    id: 2,
    name: "Manish",
    location: "Lalitpur",
    text: "Smooth checkout, great customer support and beautiful watches. Highly recommend Samaya to everyone looking for quality timepieces.",
    img: user2,
  },
  {
    id: 3,
    name: "Sandip",
    location: "Bhaktapur",
    text: "Best user experience I’ve had on a watch site. Their delivery is super fast and the packaging is also classy. Loved it!",
    img: user3,
  },
];

const Testimonial = () => {
  const settings = {
    dots: true,
    arrows: false,
    infinite: true,
    speed: 500,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 4000,
    cssEase: "ease-in-out",
    pauseOnHover: true,
    responsive: [
      {
        breakpoint: 1280,
        settings: { slidesToShow: 3 },
      },
      {
        breakpoint: 1024,
        settings: { slidesToShow: 2 },
      },
      {
        breakpoint: 768,
        settings: { slidesToShow: 1 },
      },
    ],
  };

  return (
    <div className="py-14 bg-white">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-10">
          <h2 className="text-3xl font-bold text-gray-800">What People Say About Us</h2>
          <p className="text-gray-500 mt-2 text-sm md:text-base">
            Real reviews from our happy customers
          </p>
        </div>

        <Slider {...settings}>
          {TestimonialsData.map((item) => (
            <div key={item.id} className="px-3 sm:px-5">
              <div className="bg-gray-100 rounded-2xl shadow-lg p-6 h-full flex flex-col justify-between transition duration-300 ease-in-out">
                <div className="flex items-center gap-4 mb-4">
                  <img
                    src={item.img}
                    alt={item.name}
                    className="w-16 h-16 object-cover rounded-full border border-gray-300"
                  />
                  <div>
                    <p className="text-lg font-semibold text-gray-800">{item.name}</p>
                    <p className="text-gray-500 text-sm">{item.location}</p>
                  </div>
                </div>
                <p className="text-gray-700 text-sm mb-4 leading-relaxed">{item.text}</p>
                <div className="text-yellow-500 text-base sm:text-lg">★★★★★</div>
              </div>
            </div>
          ))}
        </Slider>
      </div>
    </div>
  );
};

export default Testimonial;
