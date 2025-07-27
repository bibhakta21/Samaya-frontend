import axios from "axios";
import { useContext, useEffect, useState } from "react";
import toast, { Toaster } from "react-hot-toast";
import { FaCartPlus, FaHeart } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import { UserContext } from "../../context/UserContext";

const backendURL = "http://localhost:3000";

// ---------- ProductCard ----------
const ProductCard = ({ product, onToggleBookmark, onAddToCart }) => {
  const navigate = useNavigate();

  const defaultCombo =
    product.imageCombinations.find(
      (combo) => combo.dialColor === "black" && combo.bandColor === "black"
    ) || product.imageCombinations[0];

  const imageUrl = defaultCombo?.imageUrl
    ? defaultCombo.imageUrl.startsWith("/")
      ? `${backendURL}${defaultCombo.imageUrl}`
      : defaultCombo.imageUrl
    : "";

  const handleToggleBookmark = (e) => {
    e.stopPropagation();
    onToggleBookmark(product._id); // tell parent to toggle
  };

  const handleAddToCartClick = (e) => {
    e.stopPropagation();
    onAddToCart(product, defaultCombo);
  };

  const handleCardClick = () => {
    navigate(`/product/${product._id}`);
  };

  return (
    <div
      onClick={handleCardClick}
      className="bg-white rounded-xl p-4 relative group shadow-md hover:shadow-lg transition duration-300 w-full max-w-[260px] mx-0 cursor-pointer"
    >
      <div className="relative">
        <img
          src={imageUrl}
          alt={product.shortName}
          className="rounded-lg mx-auto w-[180px] h-[180px] object-contain"
        />
        <div className="absolute top-4 right-4 flex flex-col gap-2">
          <button
            className="bg-blue-600 text-white p-2 rounded-full hover:scale-110 transition"
            onClick={handleAddToCartClick}
            title="Add to cart"
          >
            <FaCartPlus />
          </button>
          <button
            className="bg-red-500 text-white p-2 rounded-full hover:scale-110 transition"
            onClick={handleToggleBookmark}
            title="Remove from bookmarks"
          >
            <FaHeart />
          </button>
        </div>
      </div>

      <div className="text-center mt-4 space-y-1">
        <h3 className="text-base font-semibold">{product.shortName}</h3>
        <div className="text-yellow-400 text-sm">
          {"★".repeat(product.rating || 4)}
        </div>
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

// ---------- Bookmark Component ----------
const Bookmark = () => {
  const [bookmarkedProducts, setBookmarkedProducts] = useState([]);
  const { setCartCount } = useContext(UserContext);

  const token = localStorage.getItem("token");

  const fetchBookmarks = async () => {
    try {
      const res = await axios.get(`${backendURL}/api/bookmarks`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      setBookmarkedProducts(res.data);
    } catch (err) {
      toast.error("Failed to load bookmarks");
      console.error("Bookmark fetch error:", err.message);
    }
  };

  const handleToggleBookmark = async (productId) => {
    try {
      const res = await axios.post(
        `${backendURL}/api/bookmarks/${productId}`,
        {},
        { headers: { Authorization: `Bearer ${token}` } }
      );
      toast.success(res.data?.message || "Bookmark updated");
      fetchBookmarks(); // refresh list after toggle
    } catch (err) {
      toast.error(err.response?.data?.error || "Failed to update bookmark");
    }
  };

  const fetchCartCount = async () => {
    try {
      const res = await axios.get(`${backendURL}/api/bookings`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      const unconfirmed = res.data.filter((item) => !item.addressOne);
      setCartCount(unconfirmed.length);
    } catch (err) {
      console.error("Cart fetch failed:", err);
    }
  };

  const handleAddToCart = async (product, defaultCombo) => {
    if (!token) {
      toast.error("Please login to buy");
      return;
    }

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
      fetchCartCount();
    } catch (err) {
      console.error("Add to cart failed:", err);
      toast.error("Failed to add to cart");
    }
  };

  useEffect(() => {
    fetchBookmarks(); // load on mount
  }, []);

  return (
    <section className="py-12 px-4 sm:px-6 lg:px-10">
      <Toaster position="top-right" toastOptions={{ style: { marginTop: "60px" } }} />
      <div className="max-w-7xl mx-auto">
        <h2 className="text-2xl font-semibold mb-6">My Bookmarks</h2>
        {bookmarkedProducts.length === 0 ? (
          <p className="text-gray-500">No items in bookmark.</p>
        ) : (
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3 justify-items-center">
            {bookmarkedProducts.map((product) => (
              <ProductCard
                key={product._id}
                product={product}
                onToggleBookmark={handleToggleBookmark}
                onAddToCart={handleAddToCart}
              />
            ))}
          </div>
        )}
      </div>
    </section>
  );
};

export default Bookmark;
