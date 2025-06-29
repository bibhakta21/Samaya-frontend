// import { useContext, useEffect, useRef, useState } from "react";
// import { FiHeart, FiMenu, FiSearch, FiShoppingBag, FiUser, FiX } from "react-icons/fi";
// import { Link, useLocation, useNavigate } from "react-router-dom";
// import { UserContext } from "../../context/UserContext";

// const Navbar = () => {
//   const { user, logout, setUser } = useContext(UserContext);
//   const navigate = useNavigate();
//   const location = useLocation();

//   const [menuOpen, setMenuOpen] = useState(false);
//   const [searchOpen, setSearchOpen] = useState(false);
//   const [profileOpen, setProfileOpen] = useState(false);
//   const [editModalOpen, setEditModalOpen] = useState(false);
//   const [error, setError] = useState("");

//   const profileRef = useRef();
//   const [editData, setEditData] = useState({ username: "", email: "" });

//   useEffect(() => {
//     const handleClickOutside = (e) => {
//       if (profileRef.current && !profileRef.current.contains(e.target)) {
//         setProfileOpen(false);
//       }
//     };
//     document.addEventListener("mousedown", handleClickOutside);
//     return () => document.removeEventListener("mousedown", handleClickOutside);
//   }, []);

//   const handleLogout = () => {
//     logout();
//     navigate("/login");
//   };

//   const handleEditOpen = () => {
//     if (user) {
//       setEditData({
//         username: user.username || "",
//         email: user.email || "",
//       });
//       setError("");
//       setEditModalOpen(true);
//     }
//   };

//   const validateForm = () => {
//     if (!editData.username.trim()) {
//       setError("Username cannot be empty.");
//       return false;
//     }
//     if (!/^\S+@\S+\.\S+$/.test(editData.email)) {
//       setError("Invalid email format.");
//       return false;
//     }
//     return true;
//   };

//   const handleSaveProfile = async () => {
//     if (!validateForm()) return;
//     try {
//       const token = localStorage.getItem("token");
//       const response = await fetch("http://localhost:3000/api/users/me", {
//         method: "PUT",
//         headers: {
//           "Content-Type": "application/json",
//           Authorization: `Bearer ${token}`,
//         },
//         body: JSON.stringify(editData),
//       });

//       const data = await response.json();
//       if (!response.ok) {
//         setError(data.error || "Failed to update profile.");
//         return;
//       }

//       setUser(data.user);
//       setEditModalOpen(false);
//       setProfileOpen(false);
//     } catch (err) {
//       setError("Something went wrong. Please try again.");
//     }
//   };

//   const handleScroll = (id) => {
//     if (location.pathname !== "/") {
//       navigate("/", { replace: true });
//       setTimeout(() => scrollToSection(id), 100);
//     } else {
//       scrollToSection(id);
//     }
//   };

//   const scrollToSection = (id) => {
//     const section = document.getElementById(id);
//     if (section) section.scrollIntoView({ behavior: "smooth" });
//   };

//   return (
//     <nav className="sticky top-0 z-50 w-full bg-white shadow-md">
//       <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 flex items-center justify-between">
//         <div className="text-4xl font-extrabold text-gray-900">
//           Samaya<span className="text-orange-500">.</span>
//         </div>

//         <ul className="hidden md:flex space-x-10 text-base font-medium text-gray-700">
//           <li className="text-blue-600 cursor-pointer" onClick={() => navigate("/")}>Home</li>
//           {user?.role === "admin" && (
//             <li className="cursor-pointer hover:text-blue-600" onClick={() => navigate("/dashboard")}>Dashboard</li>
//           )}
//           <li className="cursor-pointer hover:text-blue-600" onClick={() => navigate("/product")}>Products</li>
//           <Link to="/about"><li className="cursor-pointer hover:text-blue-600">About</li></Link>
//           <Link to="/contact"><li className="cursor-pointer hover:text-blue-600">Contact</li></Link>
//         </ul>

//         <div className="hidden md:flex items-center space-x-6 text-xl text-gray-700 relative">
//           <div className="relative flex items-center space-x-2">
//             {searchOpen ? (
//               <div className="relative flex items-center">
//                 <input
//                   type="text"
//                   className="border border-gray-300 rounded-md px-3 py-2 text-sm w-48 focus:outline-none focus:ring-2 focus:ring-blue-400"
//                   placeholder="Search..."
//                 />
//                 <button
//                   onClick={() => setSearchOpen(false)}
//                   className="ml-3 text-gray-600 hover:text-red-500 text-xl"
//                 >
//                   <FiX />
//                 </button>
//               </div>
//             ) : (
//               <FiSearch onClick={() => setSearchOpen(true)} className="cursor-pointer" />
//             )}
//           </div>
//           {user && <FiShoppingBag className="cursor-pointer" onClick={() => navigate("/cart")} />}
//           <FiHeart className="cursor-pointer" />
//           <FiUser className="cursor-pointer" onClick={() => setProfileOpen(!profileOpen)} />
//         </div>

//         <div className="md:hidden text-3xl text-gray-700">
//           <button onClick={() => setMenuOpen(!menuOpen)}>{menuOpen ? <FiX /> : <FiMenu />}</button>
//         </div>
//       </div>

//       {menuOpen && (
//         <div className="md:hidden px-4 pb-4 space-y-4 text-base text-gray-700 font-medium">
//           <ul className="space-y-3">
//             <li onClick={() => navigate("/")} className="text-blue-600">Home</li>
//             {user?.role === "admin" && (
//               <li onClick={() => navigate("/dashboard")}>Dashboard</li>
//             )}
//             <li onClick={() => navigate("/product")}>Products</li>
//             <li onClick={() => handleScroll("about")}>About</li>
//             <li onClick={() => handleScroll("contact")}>Contact</li>
//           </ul>
//           <div className="flex space-x-6 mt-3 text-xl">
//             <FiSearch onClick={() => setSearchOpen(true)} className="cursor-pointer" />
//             {user && <FiShoppingBag onClick={() => navigate("/cart")} className="cursor-pointer" />}
//             <FiHeart className="cursor-pointer" />
//             <FiUser className="cursor-pointer" onClick={() => setProfileOpen(!profileOpen)} />
//           </div>
//         </div>
//       )}

//       {profileOpen && (
//         <div ref={profileRef} className="absolute top-[90px] right-4 w-64 bg-white shadow-lg rounded-lg p-5 border border-gray-100 z-50">
//           {user ? (
//             <>
//               <p className="text-sm mb-1 truncate"><span className="font-semibold">Username:</span> {user.username}</p>
//               <p className="text-sm mb-4 truncate max-w-[15rem]"><span className="font-semibold">Email:</span> {user.email}</p>
//               <div className="space-y-2 text-sm">
//                 <button onClick={handleEditOpen} className="w-full border border-gray-300 py-2 rounded-md hover:bg-gray-100 font-medium">Edit Profile</button>
//                 <button onClick={() => navigate("/changepass")} className="w-full border border-gray-300 py-2 rounded-md hover:bg-gray-100 font-medium">Change Password</button>
//                 <button onClick={handleLogout} className="w-full border border-gray-300 py-2 rounded-md text-red-600 hover:bg-gray-100 font-medium">Logout</button>
//               </div>
//             </>
//           ) : (
//             <div className="flex flex-col space-y-3">
//               <Link to="/login" className="w-full bg-blue-600 text-white py-2 rounded-md hover:bg-blue-700 text-center">Login</Link>
//               <Link to="/register" className="w-full border border-blue-600 text-blue-600 py-2 rounded-md hover:bg-blue-50 text-center">Sign Up</Link>
//             </div>
//           )}
//         </div>
//       )}

//       {editModalOpen && (
//         <div className="fixed inset-0 z-50 bg-black bg-opacity-30 flex items-center justify-center">
//           <div className="bg-white rounded-lg shadow-xl p-6 w-96">
//             <h2 className="text-lg font-semibold mb-4">Edit Profile</h2>
//             {error && <p className="text-red-500 text-sm mb-2 text-center">{error}</p>}
//             <div className="space-y-3">
//               <div>
//                 <label className="block text-sm font-medium mb-1">Full Name</label>
//                 <input
//                   type="text"
//                   value={editData.username}
//                   onChange={(e) => setEditData({ ...editData, username: e.target.value })}
//                   className="w-full border border-gray-300 px-3 py-2 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
//                 />
//               </div>
//               <div>
//                 <label className="block text-sm font-medium mb-1">Email</label>
//                 <input
//                   type="email"
//                   value={editData.email}
//                   onChange={(e) => setEditData({ ...editData, email: e.target.value })}
//                   className="w-full border border-gray-300 px-3 py-2 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
//                 />
//               </div>
//               <div className="flex justify-end space-x-3 pt-4">
//                 <button onClick={() => setEditModalOpen(false)} className="px-4 py-2 text-sm text-gray-600 border border-gray-300 rounded-md hover:bg-gray-100">Cancel</button>
//                 <button onClick={handleSaveProfile} className="px-4 py-2 text-sm bg-blue-600 text-white rounded-md hover:bg-blue-700">Save</button>
//               </div>
//             </div>
//           </div>
//         </div>
//       )}
//     </nav>
//   );
// };

// export default Navbar;
import { useContext, useEffect, useRef, useState } from "react";
import {
  FiHeart,
  FiMenu,
  FiSearch,
  FiShoppingBag,
  FiUser,
  FiX,
} from "react-icons/fi";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { UserContext } from "../../context/UserContext";

const Navbar = () => {
  const { user, logout, setUser } = useContext(UserContext);
  const navigate = useNavigate();
  const location = useLocation();

  const [menuOpen, setMenuOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const [profileOpen, setProfileOpen] = useState(false);
  const [editModalOpen, setEditModalOpen] = useState(false);
  const [error, setError] = useState("");
  const [activeNav, setActiveNav] = useState("home");

  const profileRef = useRef();
  const [editData, setEditData] = useState({ username: "", email: "" });

  useEffect(() => {
    const handleClickOutside = (e) => {
      if (profileRef.current && !profileRef.current.contains(e.target)) {
        setProfileOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handleLogout = () => {
    logout();
    navigate("/login");
  };

  const handleEditOpen = () => {
    if (user) {
      setEditData({
        username: user.username || "",
        email: user.email || "",
      });
      setError("");
      setEditModalOpen(true);
    }
  };

  const validateForm = () => {
    if (!editData.username.trim()) {
      setError("Username cannot be empty.");
      return false;
    }
    if (!/^\S+@\S+\.\S+$/.test(editData.email)) {
      setError("Invalid email format.");
      return false;
    }
    return true;
  };

  const handleSaveProfile = async () => {
    if (!validateForm()) return;
    try {
      const token = localStorage.getItem("token");
      const response = await fetch("http://localhost:3000/api/users/me", {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(editData),
      });

      const data = await response.json();
      if (!response.ok) {
        setError(data.error || "Failed to update profile.");
        return;
      }

      setUser(data.user);
      setEditModalOpen(false);
      setProfileOpen(false);
    } catch (err) {
      setError("Something went wrong. Please try again.");
    }
  };

  const handleScroll = (id) => {
    setActiveNav(id);
    if (location.pathname !== "/") {
      navigate("/", { replace: true });
      setTimeout(() => scrollToSection(id), 100);
    } else {
      scrollToSection(id);
    }
  };

  const scrollToSection = (id) => {
    const section = document.getElementById(id);
    if (section) section.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <nav className="sticky top-0 z-50 w-full bg-white shadow-md">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 flex items-center justify-between">
        <div className="text-4xl font-extrabold text-gray-900">
          Samaya<span className="text-orange-500">.</span>
        </div>

        <ul className="hidden md:flex space-x-10 text-base font-medium text-gray-700">
          <li
            className={`cursor-pointer ${
              activeNav === "home" ? "text-blue-600" : "hover:text-blue-600"
            }`}
            onClick={() => {
              setActiveNav("home");
              navigate("/");
            }}
          >
            Home
          </li>

          {user?.role === "admin" && (
            <li
              className={`cursor-pointer ${
                activeNav === "dashboard"
                  ? "text-blue-600"
                  : "hover:text-blue-600"
              }`}
              onClick={() => {
                setActiveNav("dashboard");
                navigate("/dashboard");
              }}
            >
              Dashboard
            </li>
          )}

          <li
            className={`cursor-pointer ${
              activeNav === "product" ? "text-blue-600" : "hover:text-blue-600"
            }`}
            onClick={() => {
              setActiveNav("product");
              navigate("/product");
            }}
          >
            Products
          </li>

          <Link to="/about">
            <li
              className={`cursor-pointer ${
                activeNav === "about" ? "text-blue-600" : "hover:text-blue-600"
              }`}
              onClick={() => setActiveNav("about")}
            >
              About
            </li>
          </Link>

          <Link to="/contact">
            <li
              className={`cursor-pointer ${
                activeNav === "contact"
                  ? "text-blue-600"
                  : "hover:text-blue-600"
              }`}
              onClick={() => setActiveNav("contact")}
            >
              Contact
            </li>
          </Link>
        </ul>

        <div className="hidden md:flex items-center space-x-6 text-xl text-gray-700 relative">
          {searchOpen ? (
            <div className="relative flex items-center">
              <input
                type="text"
                className="border border-gray-300 rounded-md px-3 py-2 text-sm w-48 focus:outline-none focus:ring-2 focus:ring-blue-400"
                placeholder="Search..."
              />
              <button
                onClick={() => setSearchOpen(false)}
                className="ml-3 text-gray-600 hover:text-red-500 text-xl"
              >
                <FiX />
              </button>
            </div>
          ) : (
            <FiSearch onClick={() => setSearchOpen(true)} className="cursor-pointer" />
          )}
          {user && (
            <FiShoppingBag className="cursor-pointer" onClick={() => navigate("/cart")} />
          )}
          <Link to="/bookmark"><FiHeart className="cursor-pointer" /></Link>
          <FiUser className="cursor-pointer" onClick={() => setProfileOpen(!profileOpen)} />
        </div>

        <div className="md:hidden text-3xl text-gray-700">
          <button onClick={() => setMenuOpen(!menuOpen)}>
            {menuOpen ? <FiX /> : <FiMenu />}
          </button>
        </div>
      </div>

      {menuOpen && (
        <div className="md:hidden px-4 pb-4 space-y-4 text-base text-gray-700 font-medium">
          <ul className="space-y-3">
            <li
              onClick={() => {
                setActiveNav("home");
                navigate("/");
              }}
              className={activeNav === "home" ? "text-blue-600" : ""}
            >
              Home
            </li>
            {user?.role === "admin" && (
              <li
                onClick={() => {
                  setActiveNav("dashboard");
                  navigate("/dashboard");
                }}
                className={activeNav === "dashboard" ? "text-blue-600" : ""}
              >
                Dashboard
              </li>
            )}
            <li
              onClick={() => {
                setActiveNav("product");
                navigate("/product");
              }}
              className={activeNav === "product" ? "text-blue-600" : ""}
            >
              Products
            </li>
            <li
              onClick={() => handleScroll("about")}
              className={activeNav === "about" ? "text-blue-600" : ""}
            >
              About
            </li>
            <li
              onClick={() => handleScroll("contact")}
              className={activeNav === "contact" ? "text-blue-600" : ""}
            >
              Contact
            </li>
          </ul>
          <div className="flex space-x-6 mt-3 text-xl">
            <FiSearch onClick={() => setSearchOpen(true)} className="cursor-pointer" />
            {user && <FiShoppingBag onClick={() => navigate("/cart")} className="cursor-pointer" />}
           <Link to="/bookmark"><FiHeart className="cursor-pointer" /></Link>
            <FiUser className="cursor-pointer" onClick={() => setProfileOpen(!profileOpen)} />
          </div>
        </div>
      )}

      {profileOpen && (
        <div
          ref={profileRef}
          className="absolute top-[90px] right-4 w-64 bg-white shadow-lg rounded-lg p-5 border border-gray-100 z-50"
        >
          {user ? (
            <>
              <p className="text-sm mb-1 truncate">
                <span className="font-semibold">Username:</span> {user.username}
              </p>
              <p className="text-sm mb-4 truncate max-w-[15rem]">
                <span className="font-semibold">Email:</span> {user.email}
              </p>
              <div className="space-y-2 text-sm">
                <button
                  onClick={handleEditOpen}
                  className="w-full border border-gray-300 py-2 rounded-md hover:bg-gray-100 font-medium"
                >
                  Edit Profile
                </button>
                <button
                  onClick={() => navigate("/changepass")}
                  className="w-full border border-gray-300 py-2 rounded-md hover:bg-gray-100 font-medium"
                >
                  Change Password
                </button>
                <button
                  onClick={handleLogout}
                  className="w-full border border-gray-300 py-2 rounded-md text-red-600 hover:bg-gray-100 font-medium"
                >
                  Logout
                </button>
              </div>
            </>
          ) : (
            <div className="flex flex-col space-y-3">
              <Link to="/login" className="w-full bg-blue-600 text-white py-2 rounded-md hover:bg-blue-700 text-center">
                Login
              </Link>
              <Link to="/register" className="w-full border border-blue-600 text-blue-600 py-2 rounded-md hover:bg-blue-50 text-center">
                Sign Up
              </Link>
            </div>
          )}
        </div>
      )}

      {editModalOpen && (
        <div className="fixed inset-0 z-50 bg-black bg-opacity-30 flex items-center justify-center">
          <div className="bg-white rounded-lg shadow-xl p-6 w-96">
            <h2 className="text-lg font-semibold mb-4">Edit Profile</h2>
            {error && (
              <p className="text-red-500 text-sm mb-2 text-center">{error}</p>
            )}
            <div className="space-y-3">
              <div>
                <label className="block text-sm font-medium mb-1">Full Name</label>
                <input
                  type="text"
                  value={editData.username}
                  onChange={(e) => setEditData({ ...editData, username: e.target.value })}
                  className="w-full border border-gray-300 px-3 py-2 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
                />
              </div>
              <div>
                <label className="block text-sm font-medium mb-1">Email</label>
                <input
                  type="email"
                  value={editData.email}
                  onChange={(e) => setEditData({ ...editData, email: e.target.value })}
                  className="w-full border border-gray-300 px-3 py-2 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
                />
              </div>
              <div className="flex justify-end space-x-3 pt-4">
                <button onClick={() => setEditModalOpen(false)} className="px-4 py-2 text-sm text-gray-600 border border-gray-300 rounded-md hover:bg-gray-100">Cancel</button>
                <button onClick={handleSaveProfile} className="px-4 py-2 text-sm bg-blue-600 text-white rounded-md hover:bg-blue-700">Save</button>
              </div>
            </div>
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
