import React, { useState, useEffect, useContext } from "react";
import { FaCartPlus, FaHeart } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { toast } from "react-hot-toast";
import { UserContext } from "../../context/UserContext";

const backendURL = "http://localhost:3000";

// --------- Product Card Component ---------
const ProductCard = ({ product, isBookmarked, onToggleBookmark, onAddToCart }) => {
  const navigate = useNavigate();

  const defaultImage = product.imageCombinations.find(
    (combo) => combo.dialColor === "black" && combo.bandColor === "black"
  )?.imageUrl;

  const imageUrl = defaultImage
    ? (defaultImage.startsWith("/") ? `${backendURL}${defaultImage}` : defaultImage)
    : product.imageCombinations.length > 0
    ? (product.imageCombinations[0].imageUrl.startsWith("/")
        ? `${backendURL}${product.imageCombinations[0].imageUrl}`
        : product.imageCombinations[0].imageUrl)
    : "";

  const handleCardClick = () => {
    navigate(`/product/${product._id}`);
  };

  const handleBookmarkClick = (e) => {
    e.stopPropagation();
    onToggleBookmark(product._id);
  };

  return (
    <div
      onClick={handleCardClick}
      className="bg-white rounded-xl p-4 relative group shadow-md hover:shadow-lg transition duration-300 w-full max-w-[260px] mx-0"
    >
      <div className="relative">
        <img
          src={imageUrl}
          alt={product.shortName}
          className="rounded-lg mx-auto w-[180px] h-[180px] object-contain"
        />
        <div className="absolute top-4 right-4 flex flex-col gap-2 z-10">
          <button
            className="bg-blue-600 text-white p-2 rounded-full hover:scale-110 transition"
            onClick={(e) => {
              e.stopPropagation();
              onAddToCart(product);
            }}
          >
            <FaCartPlus />
          </button>
          <button
            onClick={handleBookmarkClick}
            className={`p-2 rounded-full hover:scale-110 transition ${
              isBookmarked ? "bg-red-500 text-white" : "bg-gray-300 text-gray-600"
            }`}
          >
            <FaHeart />
          </button>
        </div>
      </div>

      <div className="text-center mt-4 space-y-1">
        <h3 className="text-base font-semibold">{product.shortName}</h3>
        <div className="text-yellow-400 text-sm">{"★".repeat(product.rating || 4)}</div>
        <div className="text-base font-medium">
          <span className="line-through text-gray-400 mr-2">
            RS{product.price.toFixed(2)}
          </span>
          <span className="text-black font-bold">
            RS{(product.discountPrice || product.price).toFixed(2)}
          </span>
        </div>
      </div>
    </div>
  );
};

// --------- Main Component ---------
const NumberCounter = () => {
  const { user } = useContext(UserContext);
  const [products, setProducts] = useState([]);
  const [bookmarkedIds, setBookmarkedIds] = useState(new Set());
  const token = localStorage.getItem("token");

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const res = await axios.get(`${backendURL}/api/products`);
        setProducts(res.data.slice(0, 6)); // show only 6 products
      } catch (err) {
        console.error("Failed to fetch products:", err.message);
      }
    };

    const fetchBookmarks = async () => {
      if (!user) return;
      try {
        const res = await axios.get(`${backendURL}/api/bookmarks`, {
          headers: { Authorization: `Bearer ${token}` },
        });
        const ids = new Set(res.data.map((product) => product._id));
        setBookmarkedIds(ids);
      } catch (err) {
        console.error("Failed to fetch bookmarks:", err.message);
      }
    };

    fetchProducts();
    fetchBookmarks();
  }, [user]);

  const toggleBookmark = async (productId) => {
    if (!user) {
      toast.error("Please login to bookmark products");
      return;
    }

    try {
      const res = await axios.post(
        `${backendURL}/api/bookmarks/${productId}`,
        {},
        { headers: { Authorization: `Bearer ${token}` } }
      );

      if (res.data.message === "Product bookmarked") {
        setBookmarkedIds((prev) => new Set(prev).add(productId));
        toast.success("Product added to favorites");
      } else if (res.data.message === "Bookmark removed") {
        setBookmarkedIds((prev) => {
          const newSet = new Set(prev);
          newSet.delete(productId);
          return newSet;
        });
        toast.success("Product removed from favorites");
      }
    } catch (err) {
      toast.error("Failed to update favorites");
      console.error(err);
    }
  };

  const handleAddToCart = async (product) => {
    if (!user) {
      toast.error("Please login to buy");
      return;
    }

    const defaultCombo =
      product.imageCombinations.find(
        (combo) => combo.dialColor === "black" && combo.bandColor === "black"
      ) || product.imageCombinations[0];

    try {
      await axios.post(
        `${backendURL}/api/bookings`,
        {
          productId: product._id,
          quantity: 1,
          productImage: defaultCombo?.imageUrl || "",
          productShortName: product.shortName,
          price: product.discountPrice || product.price,
          dialColor: defaultCombo?.dialColor || null,
          bandColor: defaultCombo?.bandColor || null,
          addressOne: null,
          country: null,
          number: null,
          paymentType: null,
        },
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );
      toast.success("Product added to cart");
    } catch (err) {
      console.error("Booking failed:", err);
      toast.error("Failed to add to cart");
    }
  };

  return (
    <section className="py-12 px-4 sm:px-6 lg:px-10 mt-3">
      <div className="text-center max-w-xl mx-auto mb-10">
        <h2 className="text-3xl font-bold mb-2">Our Latest Products</h2>
      </div>
      <div className="max-w-7xl mx-auto">
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3 justify-items-center">
          {products.map((product) => (
            <ProductCard
              key={product._id}
              product={product}
              isBookmarked={bookmarkedIds.has(product._id)}
              onToggleBookmark={toggleBookmark}
              onAddToCart={handleAddToCart}
            />
          ))}
        </div>
      </div>
    </section>
  );
};

export default NumberCounter;
