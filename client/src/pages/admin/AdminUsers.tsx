import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "../../lib/api";
import { Trash2, ArrowLeft } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

// 1. Define Interfaces
interface User {
  _id: string;
  name?: string;
  email: string;
  isPremium: boolean;
}

interface ToastState {
  show: boolean;
  message: string;
  type: "success" | "error" | "";
}

export default function AdminUsers(): React.JSX.Element {
  const [users, setUsers] = useState<User[]>([]);
  const [modalOpen, setModalOpen] = useState<boolean>(false);
  const [selectedUser, setSelectedUser] = useState<User | null>(null);
  const [toast, setToast] = useState<ToastState>({ show: false, message: "", type: "" });
  const [loading, setLoading] = useState<boolean>(true);
  
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) {
      navigate("/admin/login");
      return;
    }

    const fetchUsers = async () => {
      try {
        setLoading(true);
        const { data } = await api.get<User[] | { items: User[] }>("/admin/users");
        
        // Handle different API response structures
        if (Array.isArray(data)) {
          setUsers(data);
        } else if (data && typeof data === 'object' && 'items' in data) {
          setUsers(data.items);
        } else {
          setUsers([]);
        }
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      } catch (err: any) {
        console.error("Failed to fetch users:", err);
        if (err.response?.status === 401) {
          localStorage.removeItem("token");
          navigate("/admin/login");
        }
      } finally {
        setLoading(false);
      }
    };

    fetchUsers();
  }, [navigate]);

  const confirmDelete = (user: User): void => {
    setSelectedUser(user);
    setModalOpen(true);
  };

  const handleDelete = async (): Promise<void> => {
    if (!selectedUser) return;

    try {
      await api.delete(`/admin/users/${selectedUser._id}`);
      setUsers((prev) => prev.filter((u) => u._id !== selectedUser._id));
      setToast({ show: true, message: "User deleted successfully!", type: "success" });
    } catch (err) {
      console.error("Failed to delete user:", err);
      setToast({ show: true, message: "User could not be deleted.", type: "error" });
    } finally {
      setModalOpen(false);
      setSelectedUser(null);
      setTimeout(() => setToast({ show: false, message: "", type: "" }), 3000);
    }
  };

  return (
    <div className="min-h-screen w-full relative text-[#2F3E46] font-poppins">
      {/* Background */}
      <div
        className="absolute inset-0 z-0 pointer-events-none"
        style={{
          background: "linear-gradient(135deg, #ffffff 0%, #FFFFFF 100%)",
        }}
      />

      <div className="relative z-10 max-w-6xl mx-auto px-6 pt-24 pb-16">
        {/* Header */}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8">
          <div className="flex flex-col gap-6">
            <button
              onClick={() => navigate(-1)}
              className="inline-flex items-center gap-2 text-sm text-[#2F3E46] hover:text-[#1ABC9C] transition-colors"
            >
              <ArrowLeft size={18} /> Back
            </button>
            <div>
              <h1 className="text-3xl md:text-4xl font-bold leading-tight">
                Manage Users
              </h1>
              <p className="text-sm text-gray-500">
                View, check status, and remove platform users.
              </p>
            </div>
          </div>
        </div>

        {/* Table Container */}
        <div className="overflow-x-auto rounded-2xl border border-[#E7E7E3] bg-white shadow-sm hover:shadow-md transition-shadow">
          <table className="w-full text-sm md:text-base table-auto">
            <thead>
              <tr className="text-left text-[#09332C] border-b border-[#E7E7E3] bg-[#F9FAFB]">
                <th className="px-5 py-3 font-semibold tracking-wide">#</th>
                <th className="px-5 py-3 font-semibold tracking-wide">Name</th>
                <th className="px-5 py-3 font-semibold tracking-wide">Email</th>
                <th className="px-5 py-3 font-semibold tracking-wide">Status</th>
                <th className="px-5 py-3 font-semibold tracking-wide">Actions</th>
              </tr>
            </thead>
            <tbody>
              {loading ? (
                <tr>
                  <td colSpan={5} className="px-5 py-10 text-center">
                    <div className="flex justify-center">
                      <div className="w-6 h-6 border-2 border-[#1ABC9C] border-t-transparent rounded-full animate-spin"></div>
                    </div>
                  </td>
                </tr>
              ) : users.length > 0 ? (
                users.map((user, idx) => (
                  <tr
                    key={user._id}
                    className="border-b border-[#E7E7E3] hover:bg-[#F4FFF9] transition-colors"
                  >
                    <td className="px-5 py-3 text-gray-600">{idx + 1}</td>
                    <td className="px-5 py-3 font-medium">{user.name || "N/A"}</td>
                    <td className="px-5 py-3 text-gray-600">{user.email}</td>
                    <td className="px-5 py-3">
                      {user.isPremium ? (
                        <span className="inline-flex items-center px-3 py-1 text-xs font-semibold rounded-full bg-green-100 text-green-700">
                          🌟 Premium
                        </span>
                      ) : (
                        <span className="inline-flex items-center px-3 py-1 text-xs font-semibold rounded-full bg-gray-200 text-gray-700">
                          Free
                        </span>
                      )}
                    </td>
                    <td className="px-5 py-3">
                      <button
                        onClick={() => confirmDelete(user)}
                        className="text-red-600 hover:text-red-700 flex items-center gap-1 text-sm font-medium transition-colors"
                      >
                        <Trash2 size={16} /> Delete
                      </button>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan={5} className="px-5 py-10 text-center text-gray-500 text-sm">
                    No users found.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* Confirmation Modal */}
      <AnimatePresence>
        {modalOpen && (
          <motion.div
            className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center z-50 p-4"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            <motion.div
              className="bg-[#2F3E46] border border-white/10 rounded-3xl p-8 max-w-md w-full text-center text-white shadow-2xl"
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
            >
              <h2 className="text-xl font-bold mb-4">Confirm Deletion</h2>
              <p className="text-gray-300 mb-6">
                Are you sure you want to delete{" "}
                <span className="text-[#1ABC9C] font-semibold">{selectedUser?.name || selectedUser?.email}</span>?
                This action is permanent.
              </p>
              <div className="flex justify-center gap-4">
                <button
                  onClick={() => setModalOpen(false)}
                  className="px-6 py-2 rounded-xl bg-white/10 hover:bg-white/20 transition-colors"
                >
                  Cancel
                </button>
                <button
                  onClick={handleDelete}
                  className="px-6 py-2 rounded-xl bg-red-600 hover:bg-red-700 transition-colors shadow-lg shadow-red-900/20"
                >
                  Delete User
                </button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Custom Toast Notification */}
      <AnimatePresence>
        {toast.show && (
          <motion.div
            className={`fixed bottom-8 right-8 px-6 py-3 rounded-xl font-semibold shadow-2xl ${
              toast.type === "success" ? "bg-green-600" : "bg-red-600"
            } text-white z-60`}
            initial={{ opacity: 0, y: 50, x: 20 }}
            animate={{ opacity: 1, y: 0, x: 0 }}
            exit={{ opacity: 0, scale: 0.95 }}
          >
            {toast.message}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}