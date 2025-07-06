import React, { useEffect, useState } from "react";
import axios from "axios";

const Products = () => {
  
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

      {/* Product Table */}
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

      {/* Modal */}
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
