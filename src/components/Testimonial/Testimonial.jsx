import React from "react";
import Slider from "react-slick";

const TestimonialsData = [
  {
    id: 1,
    name: "Bibhakta",
    location: "Kathmandu",
    text: "Don’t waste time, just order! This is the best website to purchase watches. Best e-commerce site in the Nepal. I liked the service of samaya",
    img: "https://picsum.photos/seed/pic1/100",
  },
  {
    id: 2,
    name: "Manish",
    location: "Kathmandu",
    text: "Don’t waste time, just order! This is the best website to purchase watches. Best e-commerce site in the Nepal. I liked the service of samaya",
    img: "https://picsum.photos/seed/pic1/100",
  },
  {
    id: 3,
    name: "Sandip",
    location: "Kathmandu",
    text: "Don’t waste time, just order! This is the best website to purchase watches. Best e-commerce site in the Nepal. I liked the service of samaya",
    img: "https://picsum.photos/seed/pic1/100",
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
    autoplaySpeed: 3000,
    cssEase: "linear",
    pauseOnHover: true,
    responsive: [
      {
        breakpoint: 10000,
        settings: { slidesToShow: 3 },
      },
      {
        breakpoint: 1024,
        settings: { slidesToShow: 2 },
      },
      {
        breakpoint: 640,
        settings: { slidesToShow: 1 },
      },
    ],
  };

  return (
    <div className="py-12 mb-10">
      <div className="container mx-auto px-6">
        <div className="text-center max-w-xl mx-auto mb-10">
          <h2 className="text-3xl font-bold mb-2">What People Say About Us</h2>
        </div>

        <Slider {...settings}>
          {TestimonialsData.map((item) => (
            <div key={item.id} className="px-10 flex justify-center">
              <div className="bg-gray-100 w-[400px] h-[270px] p-6 rounded-2xl shadow-md flex flex-col gap-4">
                {/* Top: Image and Info */}
                <div className="flex items-center gap-4">
                  <img
                    src={item.img}
                    alt={item.name}
                    className="w-20 h-20 object-cover rounded-xl"
                  />
                  <div>
                    <p className="text-xl font-bold">{item.name}</p>
                    <p className="text-gray-600">{item.location}</p>
                  </div>
                </div>

                {/* Review */}
                <p className="text-gray-600 text-sm leading-relaxed">
                  {item.text}
                </p>

                {/* Stars */}
                <div className="text-black text-lg">★★★★★</div>
              </div>
            </div>
          ))}
        </Slider>
      </div>
    </div>
  );
};

export default Testimonial;
