import React, { useState, useEffect } from "react";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const Contacts = () => {
  const [contacts, setContacts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [deleteContactId, setDeleteContactId] = useState(null); // State for delete confirmation modal

  const token = localStorage.getItem("token");

  // ✅ Fetch contacts on component mount
  useEffect(() => {
    const fetchContacts = async () => {
      try {
        const response = await fetch("http://localhost:3000/api/contact", {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        const data = await response.json();

        if (Array.isArray(data)) {
          setContacts(data);
        } else {
          setError("Invalid response format.");
        }
        setLoading(false);
      } catch (err) {
        setError("Failed to fetch contacts. Please try again later.");
        setLoading(false);
      }
    };

    fetchContacts();
  }, [token]);

  // ✅ Handle deleting a contact
  const handleDeleteContact = async () => {
    try {
      const response = await fetch(`http://localhost:3000/api/contact/${deleteContactId}`, {
        method: "DELETE",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      if (response.ok) {
        setContacts((prevContacts) => prevContacts.filter((contact) => contact._id !== deleteContactId));
        toast.success("Contact deleted successfully", { position: "top-right" });
      } else {
        const errorData = await response.json();
        toast.error(errorData.error || "Failed to delete contact");
      }
    } catch (err) {
      console.error("Error:", err);
      toast.error("Something went wrong. Please try again.");
    } finally {
      setDeleteContactId(null); // Close modal after delete operation
    }
  };

  if (loading) return <div className="text-center py-20">Loading...</div>;
  if (error) return <div className="text-center py-20 text-red-500">{error}</div>;

  return (
    <div className="bg-white p-6 rounded-lg shadow overflow-x-auto">
      <h2 className="text-lg font-semibold mb-4">Contact Requests</h2>

      {/* Contacts Table */}
      <div className="overflow-x-auto">
        <table className="w-full border min-w-max">
          <thead>
            <tr className="bg-gray-100 text-left">
              <th className="border px-4 py-2">Name</th>
              <th className="border px-4 py-2">Email</th>
              <th className="border px-4 py-2">Phone</th>
              <th className="border px-4 py-2">Message</th>
              <th className="border px-4 py-2">Actions</th>
            </tr>
          </thead>
          <tbody>
            {Array.isArray(contacts) && contacts.length > 0 ? (
              contacts.map((contact) => (
                <tr key={contact._id} className="border">
                  <td className="border px-4 py-2">{contact.name}</td>
                  <td className="border px-4 py-2">{contact.email}</td>
                  <td className="border px-4 py-2">{contact.phone}</td>
                  <td className="border px-4 py-2">{contact.message}</td>
                  <td className="border px-4 py-2">
                    <button
                      onClick={() => setDeleteContactId(contact._id)}
                      className="bg-red-500 text-white px-2 py-1 rounded"
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="5" className="border px-4 py-2 text-center">
                  No contacts found
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      {/* Delete Confirmation Modal */}
      {deleteContactId && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center">
          <div className="bg-white p-6 rounded-lg w-96">
            <h3 className="text-lg font-semibold mb-4">Are you sure you want to delete this contact?</h3>
            <div className="flex justify-between">
              <button
                onClick={() => setDeleteContactId(null)}
                className="bg-gray-500 text-white px-4 py-1 rounded"
              >
                Cancel
              </button>
              <button
                onClick={handleDeleteContact}
                className="bg-red-500 text-white px-4 py-1 rounded"
              >
                Delete
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Contacts;
