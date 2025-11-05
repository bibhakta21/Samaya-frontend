import React, { useEffect, useState, useContext } from "react";
import axios from "axios";
import { FaCartPlus, FaHeart, FaFilter } from "react-icons/fa";
import { toast } from "react-hot-toast";
import { useNavigate, useLocation } from "react-router-dom";
import { UserContext } from "../../context/UserContext";

const backendURL = "http://localhost:3000";

const ProductCard = ({ product, isBookmarked, onToggleBookmark }) => {
  const navigate = useNavigate();
  const { user, fetchCartCount } = useContext(UserContext);
  const token = localStorage.getItem("token");

  if (!product || !Array.isArray(product.imageCombinations)) {
    console.warn("Invalid product data:", product);
    return null;
  }

  const defaultCombo =
    product.imageCombinations.find(
      (combo) => combo.dialColor === "black" && combo.bandColor === "black"
    ) || product.imageCombinations[0];

  const imageUrl = defaultCombo?.imageUrl?.startsWith("/")
    ? `${backendURL}${defaultCombo.imageUrl}`
    : defaultCombo?.imageUrl;

  const handleCardClick = () => {
    navigate(`/product/${product._id}`);
  };

  const handleBookmarkClick = (e) => {
    e.stopPropagation();
    onToggleBookmark(product._id);
  };

  const handleAddToCart = async (e) => {
    e.stopPropagation();
    if (!user) {
      toast.error("Please login to buy");
      setTimeout(() => {
        navigate("/login");
      }, 1000);
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
      console.error("Booking failed:", err);
      toast.error("Failed to add to cart");
    }
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
        <div className="absolute top-4 right-4 flex flex-col gap-2 z-10">
          <button
            className="bg-blue-600 text-white p-2 rounded-full hover:scale-110 transition"
            onClick={handleAddToCart}
          >
            <FaCartPlus />
          </button>
          <button
            onClick={handleBookmarkClick}
            className={`p-2 rounded-full hover:scale-110 transition ${
              isBookmarked ? "bg-red-500 text-white" : "bg-gray-300 text-gray-600"
            }`}
            aria-label={isBookmarked ? "Remove from favorites" : "Add to favorites"}
          >
            <FaHeart />
          </button>
        </div>
      </div>

      <div className="text-center mt-4 space-y-1">
        <h3 className="text-base font-semibold">{product.shortName}</h3>
        <div className="text-yellow-400 text-sm">{"★".repeat(product.rating || 4)}</div>
        <div className="text-base font-medium">
          {product.discountPrice ? (
            <>
              <span className="line-through text-gray-400 mr-2">
                RS{product.price.toFixed(2)}
              </span>
              <span className="text-black font-bold">
                RS{product.discountPrice.toFixed(2)}
              </span>
            </>
          ) : (
            <span className="text-black font-bold">
              RS{product.price.toFixed(2)}
            </span>
          )}
        </div>
      </div>
    </div>
  );
};

const Product = () => {
  const { user } = useContext(UserContext);
  const [products, setProducts] = useState([]);
  const [bookmarkedIds, setBookmarkedIds] = useState(new Set());
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [inStockOnly, setInStockOnly] = useState(false);
  const [priceRange, setPriceRange] = useState(0);
  const [maxPrice, setMaxPrice] = useState(100000);
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  const location = useLocation();
  const token = localStorage.getItem("token");

  const searchQuery =
    new URLSearchParams(location.search).get("search")?.toLowerCase() || "";

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        setLoading(true);
        const start = Date.now();

        const res = await axios.get(`${backendURL}/api/products`);
        setProducts(res.data);

        const prices = res.data.map((p) => p.discountPrice || p.price);
        const max = Math.max(...prices);
        setMaxPrice(max);
        setPriceRange(max);

        const uniqueCategories = [...new Set(res.data.map((p) => p.type))];
        setCategories(uniqueCategories);

        // Force minimum 1.5s loading duration
        const elapsed = Date.now() - start;
        const delay = Math.max(1500 - elapsed, 0);
        setTimeout(() => {
          setLoading(false);
        }, delay);
      } catch (err) {
        console.error("Failed to fetch products:", err.message);
        setLoading(false);
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
  }, [user, token]);

  const toggleBookmark = async (productId) => {
    if (!user) {
      toast.error("Please login to bookmark products");
      setTimeout(() => navigate("/login"), 1000);
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

  const filteredProducts = products.filter((product) => {
    const categoryMatch =
      selectedCategory === "All" || product.type === selectedCategory;
    const stockMatch = !inStockOnly || product.inStock;
    const price = product.discountPrice || product.price;
    const priceMatch = price <= priceRange;
    const nameMatch = product.shortName.toLowerCase().includes(searchQuery);
    return categoryMatch && stockMatch && priceMatch && nameMatch;
  });

  return (
    <section className="py-12 px-4 sm:px-6 lg:px-10">
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-[250px_1fr] gap-10 items-start">
          {/* Sidebar Filters */}
          <aside className="space-y-6">
            <div className="flex items-center gap-2 text-xl font-semibold">
              <FaFilter />
              <span>Filters</span>
            </div>

            {/* Applied Filters */}
            <div>
              <h4 className="text-lg font-semibold border-b pb-2 mb-3">
                Applied Filters
              </h4>
              <div className="flex flex-wrap gap-2 text-sm">
                {selectedCategory !== "All" && (
                  <span className="bg-gray-200 px-3 py-1 rounded-full">
                    {selectedCategory}
                  </span>
                )}
                {inStockOnly && (
                  <span className="bg-gray-200 px-3 py-1 rounded-full">
                    In Stock
                  </span>
                )}
                {searchQuery && (
                  <span className="bg-gray-200 px-3 py-1 rounded-full">
                    Search: {searchQuery}
                  </span>
                )}
                <span
                  className="text-blue-500 cursor-pointer"
                  onClick={() => {
                    setSelectedCategory("All");
                    setInStockOnly(false);
                    setPriceRange(maxPrice);
                  }}
                >
                  Clear All
                </span>
              </div>
            </div>

            {/* Category Filter */}
            <div>
              <h4 className="text-lg font-semibold mb-2">Category</h4>
              <div className="space-y-2 text-sm">
                {["All", ...categories].map((cat) => (
                  <label key={cat} className="flex items-center gap-2 cursor-pointer">
                    <input
                      type="radio"
                      name="category"
                      checked={selectedCategory === cat}
                      onChange={() => setSelectedCategory(cat)}
                      className="accent-black"
                    />
                    {cat}
                  </label>
                ))}
              </div>
            </div>

            {/* Stock Status Filter */}
            <div>
              <h4 className="text-lg font-semibold mb-2">Stock Status</h4>
              <label className="flex items-center gap-2 text-sm cursor-pointer">
                <input
                  type="checkbox"
                  checked={inStockOnly}
                  onChange={() => setInStockOnly(!inStockOnly)}
                  className="accent-black"
                />
                In Stock
              </label>
            </div>

            {/* Price Range Filter */}
            <div>
              <h4 className="text-lg font-semibold mb-2">
                Max Price: RS{priceRange}
              </h4>
              <input
                type="range"
                min="100"
                max={maxPrice}
                step="100"
                value={priceRange}
                onChange={(e) => setPriceRange(Number(e.target.value))}
                className="w-full accent-black"
              />
            </div>
          </aside>

          {/* Product Grid or Loading */}
          <div>
            {loading ? (
              <div className="text-center w-full py-20">
                <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-black mx-auto"></div>
                <p className="mt-4 text-gray-500">Loading products...</p>
              </div>
            ) : filteredProducts.length === 0 ? (
              <p className="text-gray-500">No products match the selected filters.</p>
            ) : (
              <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3 justify-items-center">
                {filteredProducts.map((product) => (
                  <ProductCard
                    key={product._id}
                    product={product}
                    isBookmarked={bookmarkedIds.has(product._id)}
                    onToggleBookmark={toggleBookmark}
                  />
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  );
};

export default Product;
