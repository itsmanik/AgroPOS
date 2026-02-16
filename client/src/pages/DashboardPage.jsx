import { useState, useEffect } from "react";
import { useNavigate } from "react-router";
import api from "../utils/axios.js";

const DashboardPage = () => {
  const navigate = useNavigate();

  // State for dashboard data (ready for API)
  const [dashboardData, setDashboardData] = useState({
    summary: {
      billsToday: 0,
      salesToday: 0,
      gstToday: 0,
    },
    recentBills: [],
    lowStock: [],
  });

  // API fetch function
  const fetchDashboardData = async () => {
    try {
      const response = await api.get("/dashboard");
      setDashboardData(response.data);
    } catch (error) {
      console.error("Error fetching dashboard data:", error);
    }
  };

  useEffect(() => {
    fetchDashboardData();
  }, []);

  // Payment badge component with colors
  const PaymentBadge = ({ mode }) => {
    const colors = {
      cash: "bg-emerald-50 text-emerald-700 border-emerald-200",
      card: "bg-blue-50 text-blue-700 border-blue-200",
      upi: "bg-purple-50 text-purple-700 border-purple-200",
      credit: "bg-amber-50 text-amber-700 border-amber-200",
    };

    return (
      <span
        className={`px-3 py-1 rounded-full text-xs font-medium capitalize border ${
          colors[mode?.toLowerCase()] ||
          "bg-gray-50 text-gray-700 border-gray-200"
        }`}
      >
        {mode || "N/A"}
      </span>
    );
  };

  // Severity badge for low stock
  const SeverityBadge = ({ stock }) => {
    const isCritical = stock <= -5;
    return (
      <span
        className={`px-2 py-1 rounded-full text-xs font-medium ${
          isCritical
            ? "bg-red-100 text-red-600 border border-red-200"
            : "bg-orange-100 text-orange-600 border border-orange-200"
        }`}
      >
        {isCritical ? "Critical" : "Low"} ({Math.abs(stock)})
      </span>
    );
  };

  // Format date to "X ago" function
  const timeAgo = (dateString) => {
    const date = new Date(dateString);
    const now = new Date();
    const diffInSeconds = Math.floor((now - date) / 1000);
    
    if (diffInSeconds < 60) {
      return `${diffInSeconds} sec ago`;
    }
    
    const diffInMinutes = Math.floor(diffInSeconds / 60);
    if (diffInMinutes < 60) {
      return `${diffInMinutes} min ago`;
    }
    
    const diffInHours = Math.floor(diffInMinutes / 60);
    if (diffInHours < 24) {
      return `${diffInHours} hour${diffInHours > 1 ? 's' : ''} ago`;
    }
    
    const diffInDays = Math.floor(diffInHours / 24);
    if (diffInDays < 7) {
      return `${diffInDays} day${diffInDays > 1 ? 's' : ''} ago`;
    }
    
    const diffInWeeks = Math.floor(diffInDays / 7);
    if (diffInWeeks < 4) {
      return `${diffInWeeks} week${diffInWeeks > 1 ? 's' : ''} ago`;
    }
    
    const diffInMonths = Math.floor(diffInDays / 30);
    if (diffInMonths < 12) {
      return `${diffInMonths} month${diffInMonths > 1 ? 's' : ''} ago`;
    }
    
    const diffInYears = Math.floor(diffInDays / 365);
    return `${diffInYears} year${diffInYears > 1 ? 's' : ''} ago`;
  };

  // Stats Card Component with your color
  const StatCard = ({ title, value, icon, subtitle }) => {
    const primaryColor = "#2b5d45";

    return (
      <div
        className="bg-white rounded-xl shadow-sm p-6 border-l-4 hover:shadow-md transition-all duration-200"
        style={{ borderColor: primaryColor }}
      >
        <div className="flex justify-between items-start">
          <div>
            <p className="text-gray-500 text-sm mb-1">{title}</p>
            <h3 className="text-2xl font-bold text-gray-800">
              {typeof value === "number" ? `₹${value.toLocaleString()}` : value}
            </h3>
            {subtitle && (
              <span className="text-sm" style={{ color: primaryColor }}>
                {subtitle}
              </span>
            )}
          </div>
          <div
            className="w-12 h-12 rounded-lg flex items-center justify-center text-2xl"
            style={{
              backgroundColor: `${primaryColor}15`,
              color: primaryColor,
            }}
          >
            {icon}
          </div>
        </div>
      </div>
    );
  };

  return (
    <>
      {/* Stats Grid */}
      <div className="p-6 pt-8 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-4">
        <StatCard
          title="Today Sales"
          value={dashboardData.summary.salesToday}
          icon="💰"
          subtitle="↑ 8% from yesterday"
        />
        <StatCard
          title="Bills Today"
          value={dashboardData.summary.billsToday}
          icon="🧾"
          subtitle="↑ 12 from yesterday"
        />
        <StatCard
          title="GST Collected"
          value={dashboardData.summary.gstToday}
          icon="📊"
          subtitle="Includes CGST & SGST"
        />
        <StatCard
          title="Low Stock Alert"
          value={`${dashboardData.lowStock.length} items`}
          icon="⚠️"
          subtitle="Need reorder"
        />
      </div>

      {/* Recent Bills & Low Stock Items - Scrollable */}
      <div className="grid px-6 grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Recent Bills - Scrollable */}
        <div className="lg:col-span-2">
          <div className="bg-white rounded-xl shadow-sm p-6">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-lg font-semibold text-gray-800">
                Recent Bills
              </h2>
              <button
                className="text-sm font-medium hover:underline"
                style={{ color: "#2b5d45" }}
                onClick={() => navigate("/sales")}
              >
                View All
              </button>
            </div>

            <div className="overflow-y-auto max-h-[400px] pr-2">
              <table className="w-full">
                <thead className="sticky top-0 bg-white">
                  <tr className="text-left text-gray-500 text-sm border-b">
                    <th className="pb-3">Invoice</th>
                    <th className="pb-3">Customer</th>
                    <th className="pb-3">Amount</th>
                    <th className="pb-3">Payment</th>
                    <th className="pb-3">Time</th>
                  </tr>
                </thead>
                <tbody className="divide-y">
                  {dashboardData.recentBills.map((bill) => (
                    <tr
                      key={bill.id}
                      className="hover:bg-gray-50 cursor-pointer transition"
                      onClick={() => navigate(`/sales/${bill.id}`)}
                    >
                      <td className="py-3 font-medium">{bill.invoice_no}</td>
                      <td className="py-3">
                        <div className="flex items-center space-x-2">
                          <div className="w-6 h-6 rounded-full bg-gray-100 flex items-center justify-center text-xs">
                            {(bill.customer_name || "W").charAt(0)}
                          </div>
                          <span>{bill.customer_name || "Walk-in"}</span>
                        </div>
                      </td>
                      <td className="py-3 font-medium">
                        ₹{bill.grand_total.toLocaleString()}
                      </td>
                      <td className="py-3">
                        <PaymentBadge mode={bill.payment_mode} />
                      </td>
                      <td className="py-3 text-gray-500 text-sm">
                        {timeAgo(bill.created_at)}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>

        {/* Low Stock Items - Scrollable */}
        <div className="lg:col-span-1">
          <div className="bg-white rounded-xl shadow-sm p-6 h-full">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-lg font-semibold text-gray-800">
                Low Stock Items
              </h2>
              <button
                className="text-sm font-medium hover:underline"
                style={{ color: "#2b5d45" }}
                onClick={() => navigate("/inventory")}
              >
                Manage
              </button>
            </div>

            <div className="overflow-y-auto max-h-[350px] pr-2 space-y-3">
              {dashboardData.lowStock.map((item) => (
                <div
                  key={item.id}
                  className="border rounded-lg p-3 hover:shadow-md transition cursor-pointer"
                  onClick={() => navigate(`/inventory/${item.id}`)}
                >
                  <div className="flex justify-between items-start mb-2">
                    <h3 className="font-medium text-sm line-clamp-1">
                      {item.name}
                    </h3>
                    <SeverityBadge stock={item.stock_quantity} />
                  </div>
                  <div className="flex justify-between items-center">
                    <div>
                      <p className="text-xs text-gray-500">
                        Current: {item.stock_quantity} {item.unit}
                      </p>
                      <p className="text-xs text-gray-500">
                        Price: ₹{item.selling_price}
                      </p>
                    </div>
                    <span className="text-xs text-gray-400">
                      {item.category}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default DashboardPage;