import React, { useState, useEffect } from "react";
import axios from "axios"; // Import axios for API calls
import { ToastContainer, toast } from "react-toastify"; // Import toast for feedback
import "react-toastify/dist/ReactToastify.css"; // Import toastify CSS

import {
  Users,
  ShoppingBag,
  DollarSign,
  TrendingUp,
  User,
  Package,
  AlertCircle,
  BarChart3,
  CheckCircle,
  Loader2,
  Info,
  Ban,
  Clock,
  Eye, // Used for screenshot view
  Edit, // For Edit User icon
  Trash2, // For Delete User icon
  Save, // For Save icon in edit modal
  XCircle, // For error messages
} from "lucide-react";

// Import Recharts components for graphs
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";

// --- Dummy Data (Non-User related, still static) ---
// Dummy Orders Data
const DUMMY_ORDERS = [
  {
    id: "ORD001",
    orderId: "ORD001",
    name: "Ahmed Khan",
    email: "ahmed.k@example.com",
    service: "Instagram Followers",
    requiredFollowers: 5000,
    date: "Jan 15, 2024, 10:00:00 AM",
    createdAt: "2024-01-15T10:00:00Z",
    status: "Completed",
    platform: "Instagram",
    postLink: "https://instagram.com/p/abc1",
    price: "PKR 1500",
  },
  {
    id: "ORD002",
    orderId: "ORD002",
    name: "Fatima Ali",
    email: "fatima.a@example.com",
    service: "TikTok Likes",
    requiredFollowers: 10000,
    date: "Feb 01, 2024, 02:30:00 PM",
    createdAt: "2024-02-01T14:30:00Z",
    status: "In Progress",
    platform: "TikTok",
    postLink: "https://tiktok.com/v/def2",
    price: "PKR 2500",
  },
  {
    id: "ORD003",
    orderId: "ORD003",
    name: "Usman Tariq",
    email: "usman.t@example.com",
    service: "YouTube Subscribers",
    requiredFollowers: 1000,
    date: "Mar 10, 2024, 09:00:00 AM",
    createdAt: "2024-03-10T09:00:00Z",
    status: "Pending",
    platform: "YouTube",
    postLink: "https://youtube.com/watch?v=ghi3",
    price: "PKR 5000",
  },
  {
    id: "ORD004",
    orderId: "ORD004",
    name: "Aisha Bibi",
    email: "aisha.b@example.com",
    service: "Facebook Page Likes",
    requiredFollowers: 2000,
    date: "Apr 05, 2024, 04:00:00 PM",
    createdAt: "2024-04-05T16:00:00Z",
    status: "Completed",
    platform: "Facebook",
    postLink: "https://facebook.com/page/jkl4",
    price: "PKR 1000",
  },
  {
    id: "ORD005",
    orderId: "ORD005",
    name: "Zainab Hassan",
    email: "zainab.h@example.com",
    service: "Twitter Retweets",
    requiredFollowers: 500,
    date: "May 20, 2024, 11:00:00 AM",
    createdAt: "2024-05-20T11:00:00Z",
    status: "Cancelled",
    platform: "Twitter",
    postLink: "https://twitter.com/status/mno5",
    price: "PKR 700",
  },
  {
    id: "ORD006",
    orderId: "ORD006",
    name: "Imran Khan",
    email: "imran.k@example.com",
    service: "Instagram Likes",
    requiredFollowers: 7500,
    date: "Jun 01, 2024, 01:00:00 PM",
    createdAt: "2024-06-01T13:00:00Z",
    status: "Completed",
    platform: "Instagram",
    postLink: "https://instagram.com/p/pqr6",
    price: "PKR 2000",
  },
  {
    id: "ORD007",
    orderId: "ORD007",
    name: "Sana Javed",
    email: "sana.j@example.com",
    service: "TikTok Followers",
    requiredFollowers: 2000,
    date: "Jul 10, 2024, 03:00:00 PM",
    createdAt: "2024-07-10T15:00:00Z",
    status: "Payment Pending",
    platform: "TikTok",
    postLink: "https://tiktok.com/v/stu7",
    price: "PKR 1800",
  },
  {
    id: "ORD008",
    orderId: "ORD008",
    name: "Ahmed Khan",
    email: "ahmed.k@example.com",
    service: "YouTube Views",
    requiredFollowers: 50000,
    date: "Aug 01, 2024, 09:00:00 AM",
    createdAt: "2024-08-01T09:00:00Z",
    status: "Completed",
    platform: "YouTube",
    postLink: "https://youtube.com/watch?v=vwx8",
    price: "PKR 3000",
  },
  {
    id: "ORD009",
    orderId: "ORD009",
    name: "Fatima Ali",
    email: "fatima.a@example.com",
    service: "Instagram Comments",
    requiredFollowers: 100,
    date: "Sep 15, 2024, 10:00:00 AM",
    createdAt: "2024-09-15T10:00:00Z",
    status: "Failed",
    platform: "Instagram",
    postLink: "https://instagram.com/p/yza9",
    price: "PKR 500",
  },
  {
    id: "ORD010",
    orderId: "ORD010",
    name: "Usman Tariq",
    email: "usman.t@example.com",
    service: "Facebook Shares",
    requiredFollowers: 300,
    date: "Oct 01, 2024, 02:00:00 PM",
    createdAt: "2024-10-01T14:00:00Z",
    status: "Refunded",
    platform: "Facebook",
    postLink: "https://facebook.com/post/abc10",
    price: "PKR 800",
  },
];

// Dummy Payments Data
const DUMMY_PAYMENTS = [
  {
    _id: "PAY001",
    orderId: "ORD001",
    clientEmail: "ahmed.k@example.com",
    amount: 1500,
    paymentMethod: "Bank Transfer",
    transactionId: "TXN123456789",
    screenshotUrl:
      "https://placehold.co/400x300/000000/FFFFFF?text=Payment+Screenshot+1",
    status: "Approved",
    paymentDate: "2024-01-14T09:30:00Z",
  },
  {
    _id: "PAY002",
    orderId: "ORD002",
    clientEmail: "fatima.a@example.com",
    amount: 2500,
    paymentMethod: "Easypaisa",
    transactionId: "EPY987654321",
    screenshotUrl:
      "https://placehold.co/400x300/000000/FFFFFF?text=Payment+Screenshot+2",
    status: "Pending",
    paymentDate: "2024-01-31T10:00:00Z",
  },
  {
    _id: "PAY003",
    orderId: "ORD003",
    clientEmail: "usman.t@example.com",
    amount: 5000,
    paymentMethod: "JazzCash",
    transactionId: "JAZZ11223344",
    screenshotUrl:
      "https://placehold.co/400x300/000000/FFFFFF?text=Payment+Screenshot+3",
    status: "Approved",
    paymentDate: "2024-03-09T08:45:00Z",
  },
  {
    _id: "PAY004",
    orderId: "ORD007",
    clientEmail: "sana.j@example.com",
    amount: 1800,
    paymentMethod: "Bank Transfer",
    transactionId: "TXN555666777",
    screenshotUrl:
      "https://placehold.co/400x300/000000/FFFFFF?text=Payment+Screenshot+4",
    status: "Pending",
    paymentDate: "2024-07-09T14:00:00Z",
  },
  {
    _id: "PAY005",
    orderId: "ORD009",
    clientEmail: "fatima.a@example.com",
    amount: 500,
    paymentMethod: "Easypaisa",
    transactionId: "EPY123123123",
    screenshotUrl:
      "https://placehold.co/400x300/000000/FFFFFF?text=Payment+Screenshot+5",
    status: "Rejected",
    paymentDate: "2024-09-14T09:00:00Z",
  },
];

// Dummy Refund Requests Data
const DUMMY_REFUND_REQUESTS = [
  {
    _id: "REF001",
    orderId: "ORD005",
    clientEmail: "zainab.h@example.com",
    amount: 700,
    reason: "Order cancelled before processing.",
    status: "Pending",
    createdAt: "2024-05-21T09:00:00Z",
    adminRemarks: "",
  },
  {
    _id: "REF002",
    orderId: "ORD010",
    clientEmail: "usman.t@example.com",
    amount: 800,
    reason: "Service not delivered as expected.",
    status: "Approved",
    createdAt: "2024-10-02T10:00:00Z",
    adminRemarks: "Refund processed successfully.",
  },
  {
    _id: "REF003",
    orderId: "ORD009",
    clientEmail: "fatima.a@example.com",
    amount: 500,
    reason: "Order failed, requesting refund.",
    status: "Rejected",
    createdAt: "2024-09-16T11:00:00Z",
    adminRemarks: "Reason for failure was client-side error.",
  },
];

// Base URL for your backend API
const API_BASE_URL = "http://localhost:5000/api"; // Make sure this matches your backend server URL

// Helper function to format dates for display
const formatDate = (dateString) => {
  if (!dateString) return "N/A";
  try {
    const date = new Date(dateString);
    if (isNaN(date.getTime())) {
      return "Invalid Date";
    }
    const options = {
      year: "numeric",
      month: "short",
      day: "numeric",
      hour: "2-digit",
      minute: "2-digit",
      second: "2-digit",
      hour12: true,
    };
    return date.toLocaleDateString("en-US", options);
  } catch (e) {
    console.error("Error formatting date:", e);
    return "Invalid Date";
  }
};

// Main Dashboard Component
const AdminDashboard = () => {
  const [activeTab, setActiveTab] = useState("overview");
  // State for managing users data fetched from API
  const [usersData, setUsersData] = useState([]);
  const [loadingUsers, setLoadingUsers] = useState(true);
  const [errorUsers, setErrorUsers] = useState(null);

  // States for Edit User Modal
  const [showEditUserModal, setShowEditUserModal] = useState(false);
  const [editingUser, setEditingUser] = useState(null);
  const [editForm, setEditForm] = useState({});
  const [loadingEdit, setLoadingEdit] = useState(false);

  // States for Delete User Modal
  const [showDeleteUserModal, setShowDeleteUserModal] = useState(false);
  const [deletingUserId, setDeletingUserId] = useState(null);
  const [loadingDelete, setLoadingDelete] = useState(false);

  // Fetch all users from the API
  const fetchUsers = async () => {
    setLoadingUsers(true);
    setErrorUsers(null);
    try {
      const token = localStorage.getItem("token"); // Get token from local storage
      if (!token) {
        setErrorUsers("Authentication token not found. Please log in.");
        setLoadingUsers(false);
        return;
      }

      const response = await axios.get(`${API_BASE_URL}/users`, {
        headers: {
          Authorization: `Bearer ${token}`, // Send token in Authorization header
        },
      });
      setUsersData(response.data);
    } catch (err) {
      console.error("Error fetching users:", err);
      setErrorUsers("Failed to fetch users. Please try again.");
      toast.error("Failed to fetch users!");
    } finally {
      setLoadingUsers(false);
    }
  };

  // useEffect to fetch users when the component mounts or when a user operation occurs
  useEffect(() => {
    fetchUsers();
  }, [activeTab]); // Refetch users when activeTab changes to 'users' or after an operation

  // --- Derived Stats from UsersData (now dynamic) ---
  const totalUsers = usersData.length;
  const totalOrders = DUMMY_ORDERS.length; // Still using dummy for orders
  const totalRevenuePKR = DUMMY_ORDERS.reduce((sum, order) => {
    const price = parseFloat(order.price?.replace("PKR ", "")) || 0;
    return order.status === "Completed" ? sum + price : sum;
  }, 0).toFixed(2);

  // Calculate Revenue Growth (MoM) - still using dummy for orders
  const getMonthlyRevenue = (ordersArray, year, month) => {
    return ordersArray.reduce((sum, order) => {
      const orderDate = new Date(order.createdAt);
      if (
        orderDate.getFullYear() === year &&
        orderDate.getMonth() === month &&
        order.status === "Completed"
      ) {
        return sum + (parseFloat(order.price?.replace("PKR ", "")) || 0);
      }
      return sum;
    }, 0);
  };

  const today = new Date();
  const currentYear = today.getFullYear();
  const currentMonth = today.getMonth(); // 0-indexed

  let prevMonth = currentMonth - 1;
  let prevYear = currentYear;
  if (prevMonth < 0) {
    prevMonth = 11;
    prevYear -= 1;
  }

  const revenueCurrentMonth = getMonthlyRevenue(
    DUMMY_ORDERS,
    currentYear,
    currentMonth
  );
  const revenuePreviousMonth = getMonthlyRevenue(
    DUMMY_ORDERS,
    prevYear,
    prevMonth
  );

  let revenueGrowth = 0;
  if (revenuePreviousMonth > 0) {
    revenueGrowth =
      ((revenueCurrentMonth - revenuePreviousMonth) / revenuePreviousMonth) *
      100;
  } else if (revenueCurrentMonth > 0) {
    revenueGrowth = 100; // Infinite growth from zero, represent as 100%
  }
  revenueGrowth = revenueGrowth.toFixed(2);

  // Order Status Counts (still using dummy for orders)
  const completedOrdersCount = DUMMY_ORDERS.filter(
    (o) => o.status === "Completed"
  ).length;
  const inProgressOrdersCount = DUMMY_ORDERS.filter(
    (o) => o.status === "In Progress"
  ).length;
  const pendingOrdersCount = DUMMY_ORDERS.filter(
    (o) => o.status === "Pending" || o.status === "Payment Pending"
  ).length;
  const cancelledOrdersCount = DUMMY_ORDERS.filter(
    (o) => o.status === "Cancelled"
  ).length;
  const refundedOrdersCount = DUMMY_ORDERS.filter(
    (o) => o.status === "Refunded"
  ).length;
  const failedOrdersCount = DUMMY_ORDERS.filter(
    (o) => o.status === "Failed"
  ).length;

  // Service Distribution (still using dummy for orders)
  const serviceDistribution = DUMMY_ORDERS.reduce((acc, order) => {
    const serviceName = order.service || "Unknown Service";
    acc[serviceName] = (acc[serviceName] || 0) + 1;
    return acc;
  }, {});

  // Revenue by Service (still using dummy for orders)
  const revenueByService = DUMMY_ORDERS.reduce((acc, order) => {
    const serviceName = order.service || "Unknown Service";
    const price = parseFloat(order.price?.replace("PKR ", "")) || 0;
    acc[serviceName] = (acc[serviceName] || 0) + price;
    return acc;
  }, {});
  const revenueByServiceChartData = Object.entries(revenueByService).map(
    ([serviceName, revenue]) => ({
      name: serviceName,
      revenue: parseFloat(revenue.toFixed(2)),
    })
  );

  // Data for Recharts graphs (still using dummy for orders)
  const orderStatusChartData = [
    { name: "Completed", count: completedOrdersCount, fill: "#10B981" }, // green-500
    { name: "In Progress", count: inProgressOrdersCount, fill: "#3B82F6" }, // blue-500
    { name: "Pending", count: pendingOrdersCount, fill: "#F59E0B" }, // yellow-500 (combined)
    { name: "Cancelled", count: cancelledOrdersCount, fill: "#EF4444" }, // red-500
    { name: "Refunded", count: refundedOrdersCount, fill: "#6B7280" }, // gray-500
    { name: "Failed", count: failedOrdersCount, fill: "#DC2626" }, // red-700
  ];

  // Returns Tailwind CSS classes for status badges based on status string
  const getStatusBadgeClass = (status) => {
    switch (status) {
      case "Completed":
      case "Approved":
        return "bg-green-100 text-green-800";
      case "In Progress":
        return "bg-blue-100 text-blue-800";
      case "Pending":
      case "Payment Pending":
        return "bg-yellow-100 text-yellow-800";
      case "Cancelled":
      case "Failed":
      case "Rejected":
      case "Refunded":
        return "bg-red-100 text-red-800";
      default:
        return "bg-gray-100 text-gray-800";
    }
  };

  // Returns an appropriate icon color based on the badge background color
  const getIconColorForBadge = (statusClass) => {
    if (statusClass.includes("green")) return "#10B981";
    if (statusClass.includes("blue")) return "#3B82F6";
    if (statusClass.includes("yellow")) return "#F59E0B";
    if (statusClass.includes("red")) return "#EF4444";
    return "#6B7280";
  };

  // Dashboard statistics cards data
  const stats = [
    {
      label: "Total Users",
      value: totalUsers.toString(),
      icon: <Users className="h-6 w-6" />,
      color: "text-blue-600",
    },
    {
      label: "Total Orders",
      value: totalOrders.toString(),
      icon: <ShoppingBag className="h-6 w-6" />,
      color: "text-green-600",
    },
    {
      label: "Revenue (PKR)",
      value: `PKR ${totalRevenuePKR}`,
      icon: <DollarSign className="h-6 w-6" />,
      color: "text-purple-600",
    },
    {
      label: "Growth (MoM)",
      value: `${revenueGrowth}%`,
      icon: <TrendingUp className="h-6 w-6" />,
      color: parseFloat(revenueGrowth) >= 0 ? "text-green-600" : "text-red-600",
    },
  ];

  // --- User Management Functions (API Integrated) ---

  const handleEditClick = (user) => {
    setEditingUser(user);
    // Copy relevant fields for editing. Avoid copying sensitive fields like password.
    setEditForm({
      _id: user._id,
      name: user.name,
      email: user.email,
      role: user.role,
      phoneNumber: user.phoneNumber, // Include phone number for editing
    });
    setShowEditUserModal(true);
  };

  const handleDeleteClick = (userId) => {
    setDeletingUserId(userId);
    setShowDeleteUserModal(true);
  };

  const handleEditFormChange = (e) => {
    const { name, value } = e.target;
    setEditForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleSaveUser = async () => {
    setLoadingEdit(true);
    try {
      const token = localStorage.getItem("token");
      if (!token) {
        toast.error("Authentication token not found. Please log in.");
        setLoadingEdit(false);
        return;
      }

      // Prepare data for update. Only send fields that can be updated.
      const updatePayload = {
        name: editForm.name,
        email: editForm.email,
        role: editForm.role,
        phone: editForm.phoneNumber, // Map phoneNumber to phone for backend
      };

      const response = await axios.put(
        `${API_BASE_URL}/users/${editingUser._id}`,
        updatePayload,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      toast.success(response.data.message || "User updated successfully!");
      fetchUsers(); // Re-fetch users to update the table
      setShowEditUserModal(false);
      setEditingUser(null);
    } catch (err) {
      console.error("Error updating user:", err.response?.data || err);
      toast.error(err.response?.data?.error || "Failed to update user!");
    } finally {
      setLoadingEdit(false);
    }
  };

  const confirmDeleteUser = async () => {
    setLoadingDelete(true);
    try {
      const token = localStorage.getItem("token");
      if (!token) {
        toast.error("Authentication token not found. Please log in.");
        setLoadingDelete(false);
        return;
      }

      const response = await axios.delete(
        `${API_BASE_URL}/users/${deletingUserId}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      toast.success(response.data.message || "User deleted successfully!");
      fetchUsers(); // Re-fetch users to update the table
      setShowDeleteUserModal(false);
      setDeletingUserId(null);
    } catch (err) {
      console.error("Error deleting user:", err.response?.data || err);
      toast.error(err.response?.data?.error || "Failed to delete user!");
    } finally {
      setLoadingDelete(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <ToastContainer
        position="top-right"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
      />
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header Section */}
        <div className="bg-white rounded-2xl shadow-lg p-8 mb-8">
          <div className="flex items-center">
            <div className="w-16 h-16 bg-red-600 rounded-full flex items-center justify-center">
              <User className="h-8 w-8 text-white" />
            </div>
            <div className="ml-6">
              <h1 className="text-3xl font-bold text-gray-900">
                EmpowerUp Dashboard
              </h1>
              <p className="text-gray-600">
                Manage users, orders, and system analytics
              </p>
            </div>
          </div>
        </div>

        {/* Tabs for Navigation */}
        <div className="bg-white rounded-2xl shadow-lg overflow-hidden">
          <div className="border-b border-gray-200">
            <nav className="-mb-px flex overflow-x-auto">
              {[
                {
                  id: "overview",
                  name: "Overview",
                  icon: <BarChart3 className="h-5 w-5" />,
                },
                {
                  id: "users",
                  name: "Manage Users",
                  icon: <Users className="h-5 w-5" />,
                },
                {
                  id: "orders",
                  name: "Manage Orders",
                  icon: <Package className="h-5 w-5" />,
                },
                {
                  id: "payments",
                  name: "Payment Details",
                  icon: <DollarSign className="h-5 w-5" />,
                },
                {
                  id: "refunds",
                  name: "Refund Requests",
                  icon: <AlertCircle className="h-5 w-5" />,
                },
                {
                  id: "analytics",
                  name: "Analytics",
                  icon: <TrendingUp className="h-5 w-5" />,
                },
              ].map((tab) => (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`${
                    activeTab === tab.id
                      ? "border-red-500 text-red-600"
                      : "border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300"
                  } whitespace-nowrap py-4 px-6 border-b-2 font-medium text-sm flex items-center`}
                >
                  {tab.icon}
                  <span className="ml-2">{tab.name}</span>
                </button>
              ))}
            </nav>
          </div>

          {/* Tab Content Area */}
          <div className="p-8">
            {/* Overview Tab Content */}
            {activeTab === "overview" && (
              <div>
                <h2 className="text-2xl font-bold text-gray-900 mb-6">
                  Dashboard Overview
                </h2>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
                  {stats.map((stat, index) => (
                    <div
                      key={index}
                      className="bg-white rounded-xl shadow-lg p-6 border border-gray-200"
                    >
                      <div className="flex items-center">
                        <div className={`${stat.color} mr-4`}>{stat.icon}</div>
                        <div>
                          <div className="text-2xl font-bold text-gray-900">
                            {stat.value}
                          </div>
                          <div className="text-gray-600 text-sm">
                            {stat.label}
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>

                <h3 className="text-xl font-bold text-gray-900 mb-4">
                  Recent Orders
                </h3>
                {DUMMY_ORDERS.length === 0 ? (
                  <div className="text-center text-gray-500 py-8 flex flex-col items-center">
                    <Info className="h-10 w-10 mb-2" />
                    <p>No recent orders found.</p>
                  </div>
                ) : (
                  <div className="overflow-x-auto rounded-lg shadow border border-gray-200">
                    <table className="min-w-full text-sm text-left divide-y divide-gray-200">
                      <thead className="bg-gray-100">
                        <tr>
                          <th className="py-3 px-4">Order ID</th>
                          <th className="py-3 px-4">Client Email</th>
                          <th className="py-3 px-4">Service</th>
                          <th className="py-3 px-4">Status</th>
                          <th className="py-3 px-4">Date</th>
                        </tr>
                      </thead>
                      <tbody className="bg-white divide-y divide-gray-200">
                        {DUMMY_ORDERS.slice(0, 5).map((order) => (
                          <tr key={order.id} className="hover:bg-gray-50">
                            <td className="py-3 px-4">
                              #{order.orderId.substring(0, 8)}...
                            </td>
                            <td className="py-3 px-4">{order.email}</td>
                            <td className="py-3 px-4">{order.service}</td>
                            <td className="py-3 px-4">
                              <span
                                className={`px-2 py-1 rounded-full text-xs font-medium ${getStatusBadgeClass(
                                  order.status
                                )}`}
                              >
                                {order.status}
                              </span>
                            </td>
                            <td className="py-3 px-4">{order.date}</td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                )}
              </div>
            )}

            {/* Users Tab Content */}
            {activeTab === "users" && (
              <div>
                <h2 className="text-2xl font-bold text-gray-900 mb-6">
                  User Management
                </h2>
                {loadingUsers ? (
                  <div className="text-center text-blue-600 py-16 flex flex-col items-center">
                    <Loader2 className="h-12 w-12 animate-spin mb-4" />
                    <p className="text-lg">Fetching users...</p>
                  </div>
                ) : errorUsers ? (
                  <div className="text-center text-red-600 py-16 flex flex-col items-center">
                    <XCircle className="h-12 w-12 mb-4" />
                    <p className="text-lg">{errorUsers}</p>
                    <button
                      onClick={fetchUsers}
                      className="mt-4 px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600"
                    >
                      Retry
                    </button>
                  </div>
                ) : usersData.length === 0 ? (
                  <div className="text-center text-gray-500 py-16 flex flex-col items-center">
                    <Info className="h-12 w-12 mb-4" />
                    <p className="text-lg">No users found.</p>
                    <p className="text-md mt-2">
                      There are no registered users yet.
                    </p>
                  </div>
                ) : (
                  <div className="overflow-x-auto rounded-lg shadow">
                    <table className="min-w-full text-sm text-left divide-y divide-gray-200">
                      <thead className="bg-gray-100">
                        <tr>
                          <th className="py-3 px-4">User ID</th>
                          <th className="py-3 px-4">Name</th>
                          <th className="py-3 px-4">Email</th>
                          <th className="py-3 px-4">Role</th>
                          <th className="py-3 px-4">Registered On</th>
                          <th className="py-3 px-4 text-center">Actions</th>
                        </tr>
                      </thead>
                      <tbody className="bg-white divide-y divide-gray-200">
                        {usersData.map((userItem) => (
                          <tr
                            key={userItem._id}
                            className="border-t hover:bg-gray-50"
                          >
                            <td className="py-3 px-4">
                              #{userItem._id.substring(0, 8)}...
                            </td>
                            <td className="py-3 px-4">{userItem.name}</td>
                            <td className="py-3 px-4">{userItem.email}</td>
                            <td className="py-3 px-4">
                              {userItem.role === "admin" ? "Admin" : "User"}
                            </td>
                            <td className="py-3 px-4">
                              {formatDate(userItem.createdAt)}
                            </td>
                            <td className="py-3 px-4 text-center">
                              <div className="flex items-center justify-center space-x-2">
                                <button
                                  onClick={() => handleEditClick(userItem)}
                                  className="p-2 rounded-full bg-blue-100 text-blue-600 hover:bg-blue-200 transition-colors"
                                  title="Edit User"
                                >
                                  <Edit className="h-4 w-4" />
                                </button>
                                <button
                                  onClick={() =>
                                    handleDeleteClick(userItem._id)
                                  }
                                  className="p-2 rounded-full bg-red-100 text-red-600 hover:bg-red-200 transition-colors"
                                  title="Delete User"
                                >
                                  <Trash2 className="h-4 w-4" />
                                </button>
                              </div>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                )}
              </div>
            )}

            {/* Orders Tab Content */}
            {activeTab === "orders" && (
              <div>
                <h2 className="text-2xl font-bold text-gray-900 mb-6">
                  Order Management
                </h2>
                {DUMMY_ORDERS.length === 0 ? (
                  <div className="text-center text-gray-500 py-16 flex flex-col items-center">
                    <Info className="h-12 w-12 mb-4" />
                    <p className="text-lg">No orders found.</p>
                    <p className="text-md mt-2">
                      Looks like there are no orders to manage yet.
                    </p>
                  </div>
                ) : (
                  <div className="overflow-x-auto rounded-lg shadow">
                    <table className="min-w-full text-sm text-left divide-y divide-gray-200">
                      <thead className="bg-gray-100">
                        <tr>
                          <th className="py-3 px-4">Order ID</th>
                          <th className="py-3 px-4">Client Name</th>
                          <th className="py-3 px-4">Client Email</th>
                          <th className="py-3 px-4">Platform</th>
                          <th className="py-3 px-4">Service</th>
                          <th className="py-3 px-4">Quantity</th>
                          <th className="py-3 px-4">Price (PKR)</th>
                          <th className="py-3 px-4 text-center">Status</th>
                          <th className="py-3 px-4">Date</th>
                        </tr>
                      </thead>
                      <tbody className="bg-white divide-y divide-gray-200">
                        {DUMMY_ORDERS.map((order) => {
                          const badgeClass = getStatusBadgeClass(order.status);
                          const iconColor = getIconColorForBadge(badgeClass);

                          let statusIcon;
                          switch (order.status) {
                            case "Completed":
                              statusIcon = (
                                <CheckCircle
                                  className="h-4 w-4"
                                  style={{ color: iconColor }}
                                />
                              );
                              break;
                            case "In Progress":
                              statusIcon = (
                                <Loader2
                                  className="h-4 w-4 animate-spin"
                                  style={{ color: iconColor }}
                                />
                              );
                              break;
                            case "Payment Pending":
                            case "Pending":
                              statusIcon = (
                                <Clock
                                  className="h-4 w-4"
                                  style={{ color: iconColor }}
                                />
                              );
                              break;
                            case "Cancelled":
                            case "Failed":
                            case "Refunded":
                              statusIcon = (
                                <Ban
                                  className="h-4 w-4"
                                  style={{ color: iconColor }}
                                />
                              );
                              break;
                            default:
                              statusIcon = (
                                <Info
                                  className="h-4 w-4"
                                  style={{ color: iconColor }}
                                />
                              );
                          }

                          return (
                            <tr
                              key={order.id}
                              className="border-t hover:bg-gray-50"
                            >
                              <td className="py-3 px-4 font-medium text-gray-900">
                                #{order.orderId}
                              </td>
                              <td className="py-3 px-4">{order.name}</td>
                              <td className="py-3 px-4">{order.email}</td>
                              <td className="py-3 px-4">{order.platform}</td>
                              <td className="py-3 px-4">{order.service}</td>
                              <td className="py-3 px-4">
                                {order.requiredFollowers.toLocaleString()}
                              </td>
                              <td className="py-3 px-4">{order.price}</td>
                              <td className="py-3 px-4 text-center">
                                <div className="flex items-center justify-center space-x-2">
                                  <span
                                    className={`px-2 py-1 rounded-full text-xs font-medium flex items-center ${badgeClass}`}
                                  >
                                    {statusIcon}
                                    <span className="ml-1">{order.status}</span>
                                  </span>
                                </div>
                              </td>
                              <td className="py-3 px-4">{order.date}</td>
                            </tr>
                          );
                        })}
                      </tbody>
                    </table>
                  </div>
                )}
              </div>
            )}

            {/* Payment Details Tab Content */}
            {activeTab === "payments" && (
              <div>
                <h2 className="text-2xl font-bold text-gray-900 mb-6">
                  Payment Details
                </h2>
                {DUMMY_PAYMENTS.length === 0 ? (
                  <div className="text-center text-gray-500 py-16 flex flex-col items-center">
                    <Info className="h-12 w-12 mb-4" />
                    <p className="text-lg">No payment records found.</p>
                    <p className="text-md mt-2">
                      Payments will appear here once submitted by clients.
                    </p>
                  </div>
                ) : (
                  <div className="overflow-x-auto rounded-lg shadow">
                    <table className="min-w-full text-sm text-left divide-y divide-gray-200">
                      <thead className="bg-gray-100">
                        <tr>
                          <th className="py-3 px-4">Payment ID</th>
                          <th className="py-3 px-4">Order ID</th>
                          <th className="py-3 px-4">Client Email</th>
                          <th className="py-3 px-4">Amount (PKR)</th>
                          <th className="py-3 px-4">Method</th>
                          <th className="py-3 px-4">Transaction ID</th>
                          <th className="py-3 px-4">Screenshot</th>
                          <th className="py-3 px-4">Status</th>
                          <th className="py-3 px-4">Payment Date</th>
                        </tr>
                      </thead>
                      <tbody className="bg-white divide-y divide-gray-200">
                        {DUMMY_PAYMENTS.map((payment) => {
                          const badgeClass = getStatusBadgeClass(
                            payment.status
                          );
                          return (
                            <tr key={payment._id} className="hover:bg-gray-50">
                              <td className="py-3 px-4 font-medium text-gray-900">
                                #{payment._id.substring(0, 8)}...
                              </td>
                              <td className="py-3 px-4">
                                {payment.orderId ? (
                                  <span className="text-blue-600">
                                    #{payment.orderId.substring(0, 8)}...
                                  </span>
                                ) : (
                                  "N/A"
                                )}
                              </td>
                              <td className="py-3 px-4">
                                {payment.clientEmail}
                              </td>
                              <td className="py-3 px-4">
                                PKR {payment.amount?.toFixed(0) || "0"}
                              </td>
                              <td className="py-3 px-4">
                                {payment.paymentMethod}
                              </td>
                              <td className="py-3 px-4 break-all">
                                {payment.transactionId || "N/A"}
                              </td>
                              <td className="py-3 px-4">
                                {payment.screenshotUrl ? (
                                  <a
                                    href={payment.screenshotUrl}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="text-blue-600 hover:underline flex items-center justify-center"
                                  >
                                    <Eye className="h-4 w-4 mr-1" /> View
                                  </a>
                                ) : (
                                  "N/A"
                                )}
                              </td>
                              <td className="py-3 px-4">
                                <span
                                  className={`px-2 py-1 rounded-full text-xs font-medium ${badgeClass}`}
                                >
                                  {payment.status}
                                </span>
                              </td>
                              <td className="py-3 px-4">
                                {formatDate(payment.paymentDate)}
                              </td>
                            </tr>
                          );
                        })}
                      </tbody>
                    </table>
                  </div>
                )}
              </div>
            )}

            {/* Refund Requests Tab Content */}
            {activeTab === "refunds" && (
              <div>
                <h2 className="text-2xl font-bold text-gray-900 mb-6">
                  Refund Requests
                </h2>
                {DUMMY_REFUND_REQUESTS.length === 0 ? (
                  <div className="text-center text-gray-500 py-16 flex flex-col items-center">
                    <Info className="h-12 w-12 mb-4" />
                    <p className="text-lg">No refund requests at this time.</p>
                    <p className="text-md mt-2">
                      This section will display pending refund requests.
                    </p>
                  </div>
                ) : (
                  <div className="overflow-x-auto rounded-lg shadow">
                    <table className="min-w-full text-sm text-left divide-y divide-gray-200">
                      <thead className="bg-gray-100">
                        <tr>
                          <th className="py-3 px-4">Request ID</th>
                          <th className="py-3 px-4">Order ID</th>
                          <th className="py-3 px-4">Client Email</th>
                          <th className="py-3 px-4">Amount (PKR)</th>
                          <th className="py-3 px-4">Reason</th>
                          <th className="py-3 px-4">Status</th>
                          <th className="py-3 px-4">Requested On</th>
                        </tr>
                      </thead>
                      <tbody className="bg-white divide-y divide-gray-200">
                        {DUMMY_REFUND_REQUESTS.map((request) => {
                          const badgeClass = getStatusBadgeClass(
                            request.status
                          );
                          return (
                            <tr key={request._id} className="hover:bg-gray-50">
                              <td className="py-3 px-4 font-medium text-gray-900">
                                #{request._id.substring(0, 8)}...
                              </td>
                              <td className="py-3 px-4">
                                {request.orderId ? (
                                  <span className="text-blue-600">
                                    #{request.orderId.substring(0, 8)}...
                                  </span>
                                ) : (
                                  "N/A"
                                )}
                              </td>
                              <td className="py-3 px-4">
                                {request.clientEmail}
                              </td>
                              <td className="py-3 px-4">
                                PKR {request.amount?.toFixed(0) || "0"}
                              </td>
                              <td className="py-3 px-4">{request.reason}</td>
                              <td className="py-3 px-4">
                                <span
                                  className={`px-2 py-1 rounded-full text-xs font-medium ${badgeClass}`}
                                >
                                  {request.status}
                                </span>
                              </td>
                              <td className="py-3 px-4">
                                {formatDate(request.createdAt)}
                              </td>
                            </tr>
                          );
                        })}
                      </tbody>
                    </table>
                  </div>
                )}
              </div>
            )}

            {/* Analytics Tab Content */}
            {activeTab === "analytics" && (
              <div>
                <h2 className="text-2xl font-bold text-gray-900 mb-6">
                  System Analytics
                </h2>
                {DUMMY_ORDERS.length === 0 ? (
                  <div className="text-center text-red-600 py-16 flex flex-col items-center">
                    <Info className="h-12 w-12 mb-4" />
                    <p className="text-lg">
                      Cannot display analytics without order data.
                    </p>
                    <p className="text-md text-gray-500 mt-2">
                      Please add some dummy orders to see analytics.
                    </p>
                  </div>
                ) : (
                  <>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
                      {/* Order Status Distribution Chart */}
                      <div className="bg-white rounded-xl shadow-lg p-6 border border-gray-200">
                        <h3 className="text-lg font-semibold text-gray-900 mb-4">
                          Order Status Distribution
                        </h3>
                        {orderStatusChartData.length > 0 ? (
                          <ResponsiveContainer width="100%" height={300}>
                            <BarChart data={orderStatusChartData}>
                              <CartesianGrid strokeDasharray="3 3" />
                              <XAxis dataKey="name" />
                              <YAxis />
                              <Tooltip />
                              <Legend />
                              <Bar dataKey="count" />
                            </BarChart>
                          </ResponsiveContainer>
                        ) : (
                          <div className="text-center text-gray-500 py-8">
                            No order status data to display.
                          </div>
                        )}
                      </div>

                      {/* Revenue by Service Chart */}
                      <div className="bg-white rounded-xl shadow-lg p-6 border border-gray-200">
                        <h3 className="text-lg font-semibold text-gray-900 mb-4">
                          Revenue by Service (PKR)
                        </h3>
                        {revenueByServiceChartData.length > 0 ? (
                          <ResponsiveContainer width="100%" height={300}>
                            <BarChart data={revenueByServiceChartData}>
                              <CartesianGrid strokeDasharray="3 3" />
                              <XAxis dataKey="name" />
                              <YAxis
                                tickFormatter={(value) => `PKR ${value}`}
                              />
                              <Tooltip
                                formatter={(value) => [
                                  `PKR ${value}`,
                                  "Revenue",
                                ]}
                              />
                              <Legend />
                              <Bar dataKey="revenue" fill="#8884d8" />
                            </BarChart>
                          </ResponsiveContainer>
                        ) : (
                          <div className="text-center text-gray-500 py-8">
                            No revenue by service data to display.
                          </div>
                        )}
                      </div>
                    </div>

                    {/* Additional Stats */}
                    <div className="bg-white rounded-xl shadow-lg p-6 border border-gray-200 mb-6">
                      <h3 className="text-lg font-semibold text-gray-900 mb-4">
                        Detailed Order Status Counts
                      </h3>
                      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-4 text-center">
                        <div className="p-3 bg-green-50 rounded-lg">
                          <p className="text-2xl font-bold text-green-700">
                            {completedOrdersCount}
                          </p>
                          <p className="text-sm text-gray-600">Completed</p>
                        </div>
                        <div className="p-3 bg-blue-50 rounded-lg">
                          <p className="text-2xl font-bold text-blue-700">
                            {inProgressOrdersCount}
                          </p>
                          <p className="text-sm text-gray-600">In Progress</p>
                        </div>
                        <div className="p-3 bg-yellow-50 rounded-lg">
                          <p className="text-2xl font-bold text-yellow-700">
                            {pendingOrdersCount}
                          </p>
                          <p className="text-sm text-gray-600">Pending</p>
                        </div>
                        <div className="p-3 bg-red-50 rounded-lg">
                          <p className="text-2xl font-bold text-red-700">
                            {cancelledOrdersCount}
                          </p>
                          <p className="text-sm text-gray-600">Cancelled</p>
                        </div>
                        <div className="p-3 bg-gray-50 rounded-lg">
                          <p className="text-2xl font-bold text-gray-700">
                            {refundedOrdersCount}
                          </p>
                          <p className="text-sm text-gray-600">Refunded</p>
                        </div>
                        <div className="p-3 bg-red-500/10 rounded-lg">
                          <p className="text-2xl font-bold text-red-800">
                            {failedOrdersCount}
                          </p>
                          <p className="text-sm text-gray-600">Failed</p>
                        </div>
                      </div>
                    </div>

                    <div className="bg-white rounded-xl shadow-lg p-6 border border-gray-200">
                      <h3 className="text-lg font-semibold text-gray-900 mb-4">
                        Service Distribution
                      </h3>
                      {Object.keys(serviceDistribution).length > 0 ? (
                        <ul className="list-disc list-inside text-gray-700">
                          {Object.entries(serviceDistribution).map(
                            ([service, count]) => (
                              <li key={service}>
                                <strong>{service}:</strong> {count} orders
                              </li>
                            )
                          )}
                        </ul>
                      ) : (
                        <div className="text-center text-gray-500 py-4">
                          No service distribution data.
                        </div>
                      )}
                    </div>
                  </>
                )}
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Edit User Modal */}
      {showEditUserModal && editingUser && (
        <div className="fixed inset-0 bg-gray-600 bg-opacity-75 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-xl shadow-2xl p-8 w-full max-w-lg">
            <h3 className="text-2xl font-bold text-gray-900 mb-6">Edit User</h3>
            <form
              onSubmit={(e) => {
                e.preventDefault();
                handleSaveUser();
              }}
            >
              <div className="mb-4">
                <label
                  htmlFor="name"
                  className="block text-gray-700 text-sm font-bold mb-2"
                >
                  Name
                </label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  value={editForm.name || ""}
                  onChange={handleEditFormChange}
                  className="shadow appearance-none border rounded-lg w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                />
              </div>
              <div className="mb-4">
                <label
                  htmlFor="email"
                  className="block text-gray-700 text-sm font-bold mb-2"
                >
                  Email
                </label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  value={editForm.email || ""}
                  onChange={handleEditFormChange}
                  className="shadow appearance-none border rounded-lg w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                />
              </div>
              <div className="mb-4">
                <label
                  htmlFor="phoneNumber"
                  className="block text-gray-700 text-sm font-bold mb-2"
                >
                  Phone Number
                </label>
                <input
                  type="text"
                  id="phoneNumber"
                  name="phoneNumber"
                  value={editForm.phoneNumber || ""}
                  onChange={handleEditFormChange}
                  className="shadow appearance-none border rounded-lg w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                />
              </div>
              <div className="mb-6">
                <label
                  htmlFor="role"
                  className="block text-gray-700 text-sm font-bold mb-2"
                >
                  Role
                </label>
                <select
                  id="role"
                  name="role"
                  value={editForm.role || ""}
                  onChange={handleEditFormChange}
                  className="shadow appearance-none border rounded-lg w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                >
                  <option value="user">User</option>
                  <option value="admin">Admin</option>
                </select>
              </div>
              <div className="flex justify-end space-x-3">
                <button
                  type="button"
                  onClick={() => {
                    setShowEditUserModal(false);
                    setEditingUser(null);
                    setEditForm({});
                  }}
                  className="px-4 py-2 bg-gray-200 text-gray-800 rounded-md hover:bg-gray-300 transition-colors"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={loadingEdit}
                  className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors flex items-center"
                >
                  {loadingEdit ? (
                    <Loader2 className="h-4 w-4 mr-2 animate-spin" />
                  ) : (
                    <Save className="h-4 w-4 mr-2" />
                  )}
                  Save Changes
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Delete User Confirmation Modal */}
      {showDeleteUserModal && (
        <div className="fixed inset-0 bg-gray-600 bg-opacity-75 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-xl shadow-2xl p-8 w-full max-w-sm text-center">
            <XCircle className="h-16 w-16 text-red-500 mx-auto mb-4" />
            <h3 className="text-xl font-bold text-gray-900 mb-4">
              Confirm Deletion
            </h3>
            <p className="text-gray-600 mb-6">
              Are you sure you want to delete this user? This action cannot be
              undone.
            </p>
            <div className="flex justify-center space-x-4">
              <button
                onClick={() => {
                  setShowDeleteUserModal(false);
                  setDeletingUserId(null);
                }}
                className="px-6 py-2 bg-gray-200 text-gray-800 rounded-md hover:bg-gray-300 transition-colors"
              >
                Cancel
              </button>
              <button
                onClick={confirmDeleteUser}
                disabled={loadingDelete}
                className="px-6 py-2 bg-red-600 text-white rounded-md hover:bg-red-700 transition-colors flex items-center"
              >
                {loadingDelete ? (
                  <Loader2 className="h-4 w-4 mr-2 animate-spin" />
                ) : (
                  <Trash2 className="h-4 w-4 mr-2" />
                )}
                Delete
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default AdminDashboard;
