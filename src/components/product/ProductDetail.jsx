import React, { useEffect, useState, useContext } from "react";
import axios from "axios";
import { useParams, Link, useNavigate } from "react-router-dom";
import { toast, Toaster } from "react-hot-toast";
import { UserContext } from "../../context/UserContext";

const backendURL = "http://localhost:3000";

const ProductDetail = () => {
  const { id } = useParams();
  const [product, setProduct] = useState(null);
  const [bandColor, setBandColor] = useState("");
  const [dialColor, setDialColor] = useState("");
  const [selectedImage, setSelectedImage] = useState(null);
  const [thumbnailCombos, setThumbnailCombos] = useState([]);
  const [user, setUser] = useState(null);
  const [rating, setRating] = useState(5);
  const [comment, setComment] = useState("");
  const [editing, setEditing] = useState(false);
  const [quantity, setQuantity] = useState(1);

  const { cartCount, setCartCount, fetchCartCount } = useContext(UserContext);
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      const decoded = JSON.parse(atob(token.split(".")[1]));
      setUser(decoded);
    }
  }, []);

  const fetchProduct = async () => {
    try {
      const res = await axios.get(`${backendURL}/api/products/${id}`);
      const prod = res.data;
      setProduct(prod);

      if (prod.imageCombinations.length > 0) {
        // First try to find black/black combo
        const blackCombo = prod.imageCombinations.find(
          (combo) =>
            combo.dialColor.toLowerCase() === "black" &&
            combo.bandColor.toLowerCase() === "black"
        );

        const defaultCombo = blackCombo || prod.imageCombinations[0];

        setDialColor(defaultCombo.dialColor);
        setBandColor(defaultCombo.bandColor);
        setSelectedImage(
          defaultCombo.imageUrl.startsWith("/")
            ? `${backendURL}${defaultCombo.imageUrl}`
            : defaultCombo.imageUrl
        );

        const shuffled = [...prod.imageCombinations].sort(() => 0.5 - Math.random());
        setThumbnailCombos(shuffled.slice(0, 3));
      }

      if (user) {
        const existing = prod.reviews.find((r) => r.user === user.id);
        if (existing) {
          setRating(existing.rating);
          setComment(existing.comment);
          setEditing(true);
        }
      }
    } catch (err) {
      console.error("Failed to fetch product", err);
    }
  };

  useEffect(() => {
    fetchProduct();
  }, [id]);

  useEffect(() => {
    if (product && dialColor && bandColor) {
      const match = product.imageCombinations.find(
        (combo) =>
          combo.dialColor === dialColor && combo.bandColor === bandColor
      );
      if (match) {
        setSelectedImage(
          match.imageUrl.startsWith("/")
            ? `${backendURL}${match.imageUrl}`
            : match.imageUrl
        );
      }
    }
  }, [dialColor, bandColor, product]);

  const handleAddToCart = async () => {
    const token = localStorage.getItem("token");
    if (!token) {
      toast.error("Please login to buy");
      setTimeout(() => {
        navigate("/login");
      }, 1000);
      return;
    }

    if (quantity > 5) {
      toast.error("Only 5 in stock");
      return;
    }

    const selectedCombo = product.imageCombinations.find(
      (combo) => combo.dialColor === dialColor && combo.bandColor === bandColor
    );

    try {
      await axios.post(
        `${backendURL}/api/bookings`,
        {
          productId: product._id,
          quantity,
          productImage: selectedCombo?.imageUrl || "",
          productShortName: product.shortName,
          price: product.discountPrice || product.price,
          dialColor,
          bandColor,
          addressOne: null,
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
      console.error("Add to cart error:", err);
      toast.error("Failed to add to cart");
    }
  };

  const handleReviewSubmit = async (e) => {
    e.preventDefault();

    if (rating < 1 || rating > 5) {
      toast.error("Rating must be between 1 and 5 stars");
      return;
    }

    if (!comment.trim()) {
      toast.error("Comment cannot be empty");
      return;
    }

    const token = localStorage.getItem("token");
    if (!token) {
      toast.error("Please login to review");
      setTimeout(() => {
        navigate("/login");
      }, 1000);
      return;
    }

    try {
      if (editing) {
        await axios.put(
          `${backendURL}/api/products/${id}/reviews`,
          { rating, comment },
          { headers: { Authorization: `Bearer ${token}` } }
        );
        toast.success("Review updated");
      } else {
        await axios.post(
          `${backendURL}/api/products/${id}/reviews`,
          { rating, comment },
          { headers: { Authorization: `Bearer ${token}` } }
        );
        toast.success("Review added");
      }
      setComment("");
      setRating(5);
      setEditing(false);
      fetchProduct();
    } catch (err) {
      toast.error(err.response?.data?.error || "Review error");
    }
  };

  const handleDeleteReview = async (reviewId) => {
    const token = localStorage.getItem("token");
    try {
      await axios.delete(
        `${backendURL}/api/products/${id}/reviews/${reviewId}`,
        { headers: { Authorization: `Bearer ${token}` } }
      );
      toast.success("Review deleted");
      setRating(5);
      setComment("");
      setEditing(false);
      fetchProduct();
    } catch (err) {
      toast.error("Failed to delete review");
    }
  };

  if (!product) return <div className="text-center py-20">Loading...</div>;

  const uniqueDialColors = [...new Set(product.imageCombinations.map((c) => c.dialColor))];
  const uniqueBandColors = [...new Set(product.imageCombinations.map((c) => c.bandColor))];

  return (
    <div className="min-h-screen px-4 md:px-20 py-10 bg-white">
      <Toaster position="top-right" />
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-start">
          {/* Image Section */}
          <div className="flex flex-col items-center">
            {/* Breadcrumb */}
            <nav className="w-[360px] mb-2 text-sm text-gray-600 flex flex-wrap gap-1">
              <Link to="/" className="hover:underline text-blue-600">Home</Link>
              <span>/</span>
              <Link to="/product" className="hover:underline text-blue-600">Products</Link>
              <span>/</span>
              <span className="font-semibold truncate max-w-[220px]" title={product.fullName}>
                {product.fullName}
              </span>
            </nav>

            <div className="w-[360px] h-[360px] border rounded-lg shadow-sm flex items-center justify-center mb-4">
              <img src={selectedImage} alt="Selected Watch" className="w-full h-full object-contain" />
            </div>
            <div className="flex gap-4">
              {thumbnailCombos.map((combo, index) => {
                const thumbSrc = combo.imageUrl.startsWith("/") ? `${backendURL}${combo.imageUrl}` : combo.imageUrl;
                return (
                  <div
                    key={index}
                    className={`w-20 h-20 rounded border-2 cursor-pointer flex items-center justify-center ${
                      combo.dialColor === dialColor && combo.bandColor === bandColor
                        ? "border-black"
                        : "border-gray-300"
                    }`}
                    onClick={() => {
                      setDialColor(combo.dialColor);
                      setBandColor(combo.bandColor);
                    }}
                  >
                    <img src={thumbSrc} alt="Thumbnail" className="w-full h-full object-contain" />
                  </div>
                );
              })}
            </div>
          </div>

          {/* Product Info */}
          <div className="space-y-6">
            <p className="text-gray-600 text-sm">Brand: Omega</p>
            <h2 className="text-3xl md:text-4xl font-bold text-black">{product.fullName}</h2>
            <div className="flex items-center gap-4">
              <span className="line-through text-gray-400 text-xl">Rs {product.price}</span>
              <span className="text-2xl font-bold text-black">Rs {product.discountPrice || product.price}</span>
              <span className="text-yellow-500 text-lg">★ {product.rating || 5}</span>
            </div>

            <div>
              <h4 className="font-semibold text-lg">Description:</h4>
              <p className="text-gray-600 text-sm leading-relaxed">{product.description}</p>
            </div>

            {/* Quantity Selector */}
            <div className="mt-4">
              <h4 className="font-semibold text-base mb-2">Quantity</h4>
              <div className="flex items-center space-x-4">
                <button
                  onClick={() => quantity > 1 && setQuantity(quantity - 1)}
                  className="w-8 h-8 flex items-center justify-center text-xl border border-gray-400 rounded hover:bg-gray-100"
                >-</button>
                <span className="text-lg font-medium">{quantity}</span>
                <button
                  onClick={() => {
                    if (quantity < 5) setQuantity(quantity + 1);
                    else toast.error("Only 5 in stock");
                  }}
                  className="w-8 h-8 flex items-center justify-center text-xl border border-gray-400 rounded hover:bg-gray-100"
                >+</button>
              </div>
            </div>

            {/* Band & Dial Colors */}
            <div className="mt-4">
              <h4 className="font-semibold text-base mb-2">Band Color: {bandColor}</h4>
              <div className="flex gap-3">
                {uniqueBandColors.map((color) => (
                  <button
                    key={color}
                    className={`w-7 h-7 rounded-full border-2 ${
                      bandColor === color ? "border-black" : "border-gray-300"
                    }`}
                    style={{ backgroundColor: color }}
                    onClick={() => setBandColor(color)}
                  ></button>
                ))}
              </div>
            </div>

            <div className="mt-6">
              <h4 className="font-semibold text-base mb-2">Dial Color: {dialColor}</h4>
              <div className="flex gap-3">
                {uniqueDialColors.map((color) => (
                  <button
                    key={color}
                    className={`w-7 h-7 rounded-full border-2 ${
                      dialColor === color ? "border-black" : "border-gray-300"
                    }`}
                    style={{ backgroundColor: color }}
                    onClick={() => setDialColor(color)}
                  ></button>
                ))}
              </div>
            </div>

            <button
              onClick={handleAddToCart}
              className="mt-6 w-full md:w-auto bg-black text-white px-8 py-3 rounded hover:bg-gray-800 transition text-lg font-semibold"
            >
              Buy Now
            </button>
          </div>
        </div>

        {/* Review Form */}
        <div className="mt-12 max-w-2xl">
          <h3 className="text-xl font-semibold mb-4">Leave a Review</h3>
          <form onSubmit={handleReviewSubmit} className="space-y-4">
            <div>
              <label className="block mb-1 text-sm font-medium">Rating</label>
              <div className="flex gap-1">
                {[1, 2, 3, 4, 5].map((star) => (
                  <button
                    key={star}
                    type="button"
                    onClick={() => setRating(star)}
                    className="text-2xl focus:outline-none transition"
                  >
                    <span className={star <= rating ? "text-yellow-500" : "text-gray-300"}>★</span>
                  </button>
                ))}
              </div>
            </div>
            <div>
              <label className="block mb-1 text-sm font-medium">Comment</label>
              <textarea
                value={comment}
                onChange={(e) => setComment(e.target.value)}
                rows={3}
                className="w-full border px-3 py-2 rounded"
              />
            </div>
            <button
              type="submit"
              className="bg-blue-600 text-white px-6 py-2 rounded hover:bg-blue-700"
            >
              {editing ? "Update Review" : "Submit Review"}
            </button>
          </form>
        </div>

        {/* Reviews */}
        <div className="mt-10 max-w-3xl">
          <h3 className="text-xl font-semibold mb-4">Customer Reviews</h3>
          {product.reviews.length === 0 && <p>No reviews yet.</p>}
          <div className="space-y-6">
            {product.reviews.map((r) => (
              <div key={r._id} className="border p-4 rounded">
                <div className="flex justify-between items-center mb-2">
                  <span className="font-semibold text-sm">{r.username}</span>
                  <span className="text-yellow-500 text-sm">★ {r.rating}</span>
                </div>
                <p className="text-gray-700 text-sm">{r.comment}</p>
                {(user?.id === r.user || user?.role === "admin") && (
                  <button
                    onClick={() => handleDeleteReview(r._id)}
                    className="text-xs text-red-600 mt-2 hover:underline"
                  >
                    Delete Review
                  </button>
                )}
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductDetail;
