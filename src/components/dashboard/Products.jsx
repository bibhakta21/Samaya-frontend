import React, { useEffect, useState } from "react";
import axios from "axios";

const Products = () => {
  const [products, setProducts] = useState([]);
  const [modalOpen, setModalOpen] = useState(false);
  const [isUpdateMode, setIsUpdateMode] = useState(false);
  const [updateProductId, setUpdateProductId] = useState(null);

  const [productData, setProductData] = useState({
    shortName: "",
    fullName: "",
    price: "",
    discountPrice: "",
    description: "",
    type: "digital",
    inStock: true,
  });

  const [imageInputs, setImageInputs] = useState([
    { dialColor: "", bandColor: "", image: null },
  ]);
  const [token] = useState(localStorage.getItem("token"));

  useEffect(() => {
    fetchProducts();
  }, []);

  const fetchProducts = async () => {
    try {
      const res = await axios.get("http://localhost:3000/api/products");
      setProducts(res.data);
    } catch (err) {
      console.error(err);
    }
  };

  const handleImageInputChange = (index, field, value) => {
    const updated = [...imageInputs];
    updated[index][field] = value;
    setImageInputs(updated);
  };

  const resetForm = () => {
    setProductData({
      shortName: "",
      fullName: "",
      price: "",
      discountPrice: "",
      description: "",
      type: "digital",
      inStock: true,
    });
    setImageInputs([{ dialColor: "", bandColor: "", image: null }]);
    setUpdateProductId(null);
    setIsUpdateMode(false);
  };

  const handleSubmit = async () => {
    try {
      const formData = new FormData();
      Object.entries(productData).forEach(([key, value]) => {
        formData.append(key, value);
      });

      imageInputs.forEach((input) => {
        formData.append("dialColor[]", input.dialColor);
        formData.append("bandColor[]", input.bandColor);
        if (input.image) {
          formData.append("images", input.image);
        }
      });

      if (isUpdateMode && updateProductId) {
        // Update existing product
        await axios.put(
          `http://localhost:3000/api/products/${updateProductId}`,
          formData,
          {
            headers: {
              "Content-Type": "multipart/form-data",
              Authorization: `Bearer ${token}`,
            },
          }
        );
        alert("Product updated!");
      } else {
        // Create new product
        const res = await axios.post("http://localhost:3000/api/products", formData, {
          headers: {
            "Content-Type": "multipart/form-data",
            Authorization: `Bearer ${token}`,
          },
        });
        alert("Product uploaded!");
        setProducts((prev) => [...prev, res.data.product]);
      }

      fetchProducts();
      setModalOpen(false);
      resetForm();
    } catch (err) {
      alert("Error submitting product");
      console.error(err);
    }
  };

  const handleDelete = async (id) => {
    if (!window.confirm("Are you sure you want to delete this product?")) return;
    try {
      await axios.delete(`http://localhost:3000/api/products/${id}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      setProducts(products.filter((p) => p._id !== id));
      alert("Product deleted successfully");
    } catch (err) {
      alert("Failed to delete product");
    }
  };

  const handleUpdate = (product) => {

    setProductData({
      shortName: product.shortName || "",
      fullName: product.fullName || "",
      price: product.price || "",
      discountPrice: product.discountPrice || "",
      description: product.description || "",
      type: product.type || "digital",
      inStock: product.inStock ?? true,
    });

  
    const combos = product.imageCombinations?.map((combo) => ({
      dialColor: combo.dialColor || "",
      bandColor: combo.bandColor || "",
      image: null, 
    })) || [{ dialColor: "", bandColor: "", image: null }];

    setImageInputs(combos);
    setIsUpdateMode(true);
    setUpdateProductId(product._id);
    setModalOpen(true);
  };

  return (
    <div className="p-6">
      <h1 className="text-xl font-semibold mb-4">Product Management</h1>

      <button
        className="bg-blue-600 text-white px-4 py-2 rounded mb-4"
        onClick={() => {
          resetForm();
          setModalOpen(true);
        }}
      >
        Add Product
      </button>

      
      <div className="overflow-x-auto">
        <table className="w-full border text-sm">
          <thead>
            <tr className="bg-gray-100 text-left">
              <th className="border p-2">Short Name</th>
              <th className="border p-2">Price</th>
              <th className="border p-2">Discount</th>
              <th className="border p-2">Stock</th>
              <th className="border p-2">Rating</th>
              <th className="border p-2">Combinations</th>
              <th className="border p-2">Action</th>
            </tr>
          </thead>
          <tbody>
            {products.map((p) => (
              <tr key={p._id} className="text-center border-t">
                <td className="border p-2">{p.shortName}</td>
                <td className="border p-2">Rs {p.price}</td>
                <td className="border p-2">{p.discountPrice ? `Rs ${p.discountPrice}` : "N/A"}</td>
                <td className="border p-2">
                  <span className={p.inStock ? "text-green-600 font-semibold" : "text-red-500 font-semibold"}>
                    {p.inStock ? "Yes" : "No"}
                  </span>
                </td>
                <td className="border p-2">{p.rating || 0}</td>
                <td className="border p-2">{p.imageCombinations?.length || 0}</td>
                <td className="border p-2 space-x-2">
                  <button
                    onClick={() => handleUpdate(p)}
                    className="bg-yellow-400 px-3 py-1 rounded text-white"
                  >
                    Update
                  </button>
                  <button
                    onClick={() => handleDelete(p._id)}
                    className="bg-red-600 px-3 py-1 rounded text-white"
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

    
      {modalOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-40 flex justify-center items-center z-50">
          <div className="bg-white p-6 rounded-lg w-[500px] overflow-y-auto max-h-[80vh]">
            <h2 className="text-lg font-semibold mb-4">{isUpdateMode ? "Update Product" : "Add Product"}</h2>
            {["shortName", "fullName", "price", "discountPrice", "description"].map((field) => (
              <input
                key={field}
                type={field.includes("price") ? "number" : "text"}
                placeholder={field}
                value={productData[field]}
                onChange={(e) =>
                  setProductData({ ...productData, [field]: e.target.value })
                }
                className="w-full border mb-2 p-2 rounded"
              />
            ))}

            <select
              className="w-full border mb-2 p-2 rounded"
              value={productData.type}
              onChange={(e) => setProductData({ ...productData, type: e.target.value })}
            >
              <option value="digital">Digital</option>
              <option value="analog">Analog</option>
            </select>

            <select
              className="w-full border mb-4 p-2 rounded"
              value={productData.inStock}
              onChange={(e) =>
                setProductData({ ...productData, inStock: e.target.value === "true" })
              }
            >
              <option value="true">In Stock</option>
              <option value="false">Out of Stock</option>
            </select>

            <label className="block mb-2">Combinations:</label>
            {imageInputs.map((input, index) => (
              <div key={index} className="flex items-center gap-2 mb-2">
                <input
                  type="text"
                  placeholder="Dial Color"
                  value={input.dialColor}
                  onChange={(e) => handleImageInputChange(index, "dialColor", e.target.value)}
                  className="border p-1 rounded w-1/3"
                />
                <input
                  type="text"
                  placeholder="Band Color"
                  value={input.bandColor}
                  onChange={(e) => handleImageInputChange(index, "bandColor", e.target.value)}
                  className="border p-1 rounded w-1/3"
                />
                <input
                  type="file"
                  onChange={(e) => handleImageInputChange(index, "image", e.target.files[0])}
                  className="w-1/3"
                />
              </div>
            ))}

            <button
              onClick={() =>
                setImageInputs([...imageInputs, { dialColor: "", bandColor: "", image: null }])
              }
              className="text-blue-500 underline mb-2"
            >
              + Add another combination
            </button>

            <div className="flex justify-end gap-2">
              <button
                onClick={() => {
                  setModalOpen(false);
                  resetForm();
                }}
                className="px-4 py-2 border rounded"
              >
                Cancel
              </button>
              <button onClick={handleSubmit} className="bg-blue-600 text-white px-4 py-2 rounded">
                {isUpdateMode ? "Update" : "Upload"}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Products;
