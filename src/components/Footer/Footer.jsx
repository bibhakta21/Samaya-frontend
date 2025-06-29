import {
  FaFacebookF,
  FaInstagram,
  FaTwitter,
  FaYoutube,
} from "react-icons/fa";

const Footer = () => {
  return (
    <div className="bg-black text-white">
      <div className="max-w-7xl mx-auto px-4 py-12 grid md:grid-cols-4 gap-y-12 gap-x-16">
        {/* Brand & Testimonial */}
        <div>
          <h1 className="text-3xl font-bold">
            Samaya<span className="text-orange-400">.</span>
          </h1>
          <p className="mt-4 text-sm leading-relaxed text-[#8b8e99]">
            Don’t waste time, just order! This is the best website to purchase
            watches. Best e-commerce site in Nepal. I liked the service of
            samaya.
          </p>
                  <div className="flex gap-4 mt-6">
          <a href="#" className="bg-[#1d4ed8] w-8 h-8 flex items-center justify-center rounded-full">
            <FaFacebookF className="text-white text-base" />
          </a>
          <a href="#" className="bg-[#1d4ed8] w-8 h-8 flex items-center justify-center rounded-full">
            <FaTwitter className="text-white text-base" />
          </a>
          <a href="#" className="bg-[#1d4ed8] w-8 h-8 flex items-center justify-center rounded-full">
            <FaInstagram className="text-white text-base" />
          </a>
          <a href="#" className="bg-[#1d4ed8] w-8 h-8 flex items-center justify-center rounded-full">
            <FaYoutube className="text-white text-base" />
          </a>
        </div>

        </div>

        {/* Support */}
        <div>
          <h2 className="text-lg font-semibold mb-4">Support</h2>
          <p className="text-sm text-[#8b8e99]">Kalanki, Kathmandu</p>
          <p className="text-sm mt-2 text-[#8b8e99]">samaya@info.com</p>
          <p className="text-sm mt-2 text-[#8b8e99]">+977-9813056161</p>
          <p className="text-sm mt-2 text-[#8b8e99]">Frequently Asked Questions</p>
        </div>

        {/* Quick Links */}
        <div>
          <h2 className="text-lg font-semibold mb-4">Quick Links</h2>
          <ul className="space-y-2 text-sm text-[#8b8e99]">
            <li><a href="#" className="hover:text-orange-400">Home</a></li>
            <li><a href="#" className="hover:text-orange-400">Products</a></li>
            <li><a href="#" className="hover:text-orange-400">About</a></li>
            <li><a href="#" className="hover:text-orange-400">Contacts</a></li>
          </ul>
        </div>

        {/* Google Map */}
        <div>
          <h2 className="text-lg font-semibold mb-4">Google Maps</h2>
          <iframe
            title="Google Map"
            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3532.207617926562!2d85.28493277462759!3d27.70895527619113!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x39eb198ed174aef5%3A0x37c163c2ea2e267b!2sKalanki!5e0!3m2!1sen!2snp!4v1688229345211!5m2!1sen!2snp"
            width="100%"
            height="150"
            style={{ border: 0 }}
            allowFullScreen=""
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
          ></iframe>
        </div>
      </div>

      {/* Copyright */}
      <div className="border-t border-gray-700 text-center py-4 text-sm text-white/80">
        Copyright @ 2025 | Samaya
      </div>
    </div>
  );
};

export default Footer;
