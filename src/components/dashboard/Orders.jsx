import axios from "axios";
import { useContext, useEffect, useState } from "react";
import { toast } from "react-hot-toast";
import { UserContext } from "../../context/UserContext";

const backendURL = "http://localhost:3000";

const Orders = () => {
  const { user } = useContext(UserContext);
  const token = localStorage.getItem("token");
  const [orders, setOrders] = useState([]);

  const fetchOrders = async () => {
    try {
      const res = await axios.get(`${backendURL}/api/bookings`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      setOrders(res.data);
    } catch (error) {
      console.error("Failed to fetch orders", error);
      toast.error("Failed to load orders");
    }
  };

  const updateStatus = async (id, action) => {
    try {
      const endpoint =
        action === "approve"
          ? `${backendURL}/api/bookings/${id}/approve`
          : `${backendURL}/api/bookings/${id}/cancel`;

      await axios.put(endpoint, {}, { headers: { Authorization: `Bearer ${token}` } });
      toast.success(`Order ${action}d`);
      fetchOrders();
    } catch (error) {
      console.error(`Failed to ${action} order`, error);
      toast.error(`Failed to ${action} order`);
    }
  };

  const deleteOrder = async (id) => {
    try {
      await axios.delete(`${backendURL}/api/bookings/${id}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      toast.success("Order deleted");
      fetchOrders();
    } catch (error) {
      console.error("Failed to delete order", error);
      toast.error("Failed to delete order");
    }
  };

  useEffect(() => {
    fetchOrders();
  }, []);

  return (
    <div className="p-8">
      <h2 className="text-2xl font-bold mb-6">All Orders</h2>
      {orders.length === 0 ? (
        <p>No orders found.</p>
      ) : (
        <div className="overflow-x-auto bg-white shadow rounded-lg">
          <table className="min-w-full text-sm text-left">
            <thead className="bg-gray-100 border-b text-gray-600 font-semibold">
              <tr>
                <th className="p-3">Image</th>
                <th className="p-3">Name</th>
                <th className="p-3">Price</th>
                <th className="p-3">Qty</th>
                <th className="p-3">Dial</th>
                <th className="p-3">Band</th>
                <th className="p-3">Address</th>
                <th className="p-3">Phone</th> {/* ✅ NEW */}
                <th className="p-3">Payment</th> {/* ✅ NEW */}
                <th className="p-3">User</th>
                <th className="p-3">Status</th>
                <th className="p-3">Actions</th>
              </tr>
            </thead>
            <tbody>
              {orders.map((order) => (
                <tr key={order._id} className="border-b hover:bg-gray-50">
                  <td className="p-3">
                    <img
                      src={
                        order.productImage?.startsWith("/")
                          ? `${backendURL}${order.productImage}`
                          : order.productImage
                      }
                      alt={order.productShortName}
                      className="w-12 h-12 object-contain rounded"
                    />
                  </td>
                  <td className="p-3">{order.productShortName}</td>
                  <td className="p-3">Rs {order.price}</td>
                  <td className="p-3">{order.quantity}</td>
                  <td className="p-3">{order.dialColor || "—"}</td>
                  <td className="p-3">{order.bandColor || "—"}</td>
                  <td className="p-3">{order.addressOne || "—"}</td>
                  <td className="p-3">{order.number || "—"}</td>
                  <td className="p-3">{order.paymentType || "—"}</td>
                  <td className="p-3">{order.user?.username || "—"}</td>
                  <td className="p-3 capitalize font-medium text-sm">
                    <span
                      className={`px-2 py-1 rounded-full ${
                        order.status === "pending"
                          ? "bg-yellow-100 text-yellow-800"
                          : order.status === "approved"
                          ? "bg-green-100 text-green-800"
                          : "bg-red-100 text-red-800"
                      }`}
                    >
                      {order.status}
                    </span>
                  </td>
                  <td className="p-3 space-x-2">
                    {order.status === "pending" && (
                      <>
                        <button
                          onClick={() => updateStatus(order._id, "approve")}
                          className="bg-green-600 text-white px-3 py-1 rounded hover:bg-green-700"
                        >
                          Approve
                        </button>
                        <button
                          onClick={() => updateStatus(order._id, "cancel")}
                          className="bg-yellow-600 text-white px-3 py-1 rounded hover:bg-yellow-700"
                        >
                          Cancel
                        </button>
                      </>
                    )}
                    <button
                      onClick={() => deleteOrder(order._id)}
                      className="bg-red-600 text-white px-3 py-1 rounded hover:bg-red-700"
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};

export default Orders;
