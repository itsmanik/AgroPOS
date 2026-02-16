import { useEffect, useState } from "react";
import { useNavigate } from "react-router";
import api from "../utils/axios";

const SalesPage = () => {
  const navigate = useNavigate();
  const [sales, setSales] = useState([]);
  const [loading, setLoading] = useState(true);

  // 🔥 fetch sales
  useEffect(() => {
    const fetchSales = async () => {
      try {
        const res = await api.get("/sales");
        console.log(res);
        setSales(res.data);
      } catch (err) {
        console.error("Failed to load sales", err);
      } finally {
        setLoading(false);
      }
    };

    fetchSales();
  }, []);

  // 🟡 loading state
  if (loading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="animate-pulse flex flex-col items-center">
          <div className="w-12 h-12 border-4 border-gray-200 border-t-4 rounded-full" style={{ borderTopColor: '#2b5d45' }}></div>
          <span className="mt-4 text-gray-500">Loading sales...</span>
        </div>
      </div>
    );
  }

  // 🎨 Elegant status badge
  const PaymentBadge = ({ mode }) => {
    const colors = {
      cash: 'bg-emerald-50 text-emerald-700 border-emerald-200',
      card: 'bg-blue-50 text-blue-700 border-blue-200',
      upi: 'bg-purple-50 text-purple-700 border-purple-200',
      credit: 'bg-amber-50 text-amber-700 border-amber-200',
    };
    
    const defaultColor = 'bg-gray-50 text-gray-700 border-gray-200';
    
    return (
      <span className={`px-3 py-1 rounded-full text-xs font-medium capitalize border ${colors[mode?.toLowerCase()] || defaultColor}`}>
        {mode || 'N/A'}
      </span>
    );
  };

  return (
    <div className="p-6">
      {/* Header with stats */}
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-semibold text-gray-800">Sales</h1>
        
        {/* Quick stats */}
        <div className="flex items-center space-x-4">
          <div className="text-right">
            <p className="text-sm text-gray-500">Total Sales</p>
            <p className="text-lg font-bold" style={{ color: '#2b5d45' }}>
              ₹{sales.reduce((sum, sale) => sum + Number(sale.grand_total), 0).toLocaleString()}
            </p>
          </div>
          <button 
            onClick={() => navigate('/sales/new')}
            className="px-4 py-2 text-white rounded-lg hover:opacity-90 transition flex items-center space-x-2"
            style={{ backgroundColor: '#2b5d45' }}
          >
            <span>+</span>
            <span>New Sale</span>
          </button>
        </div>
      </div>

      {/* 🧾 Elegant table */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
        <table className="w-full text-sm">
          <thead>
            <tr className="bg-gray-50/80 text-gray-600 border-b border-gray-200">
              <th className="p-4 text-left font-medium">Invoice</th>
              <th className="p-4 text-left font-medium">Date</th>
              <th className="p-4 text-left font-medium">Customer</th>
              <th className="p-4 text-right font-medium">Amount</th>
              <th className="p-4 text-left font-medium">Payment</th>
              <th className="p-4 text-center font-medium">Action</th>
            </tr>
          </thead>

          <tbody className="divide-y divide-gray-100">
            {sales.length === 0 ? (
              <tr>
                <td colSpan="6" className="p-12 text-center">
                  <div className="flex flex-col items-center">
                    <span className="text-5xl mb-3 opacity-30">📭</span>
                    <p className="text-gray-500 mb-2">No sales yet</p>
                    <button 
                      onClick={() => navigate('/sales/new')}
                      className="text-sm hover:underline"
                      style={{ color: '#2b5d45' }}
                    >
                      Create your first sale →
                    </button>
                  </div>
                </td>
              </tr>
            ) : (
              sales.map((sale) => (
                <tr 
                  key={sale.id} 
                  className="hover:bg-gray-50/80 transition cursor-pointer group"
                  onClick={() => navigate(`/sales/${sale.id}`)}
                >
                  <td className="p-4">
                    <span className="font-medium text-gray-800 group-hover:text-indigo-600 transition">
                      {sale.invoice_no}
                    </span>
                  </td>

                  <td className="p-4 text-gray-600">
                    {new Date(sale.created_at).toLocaleDateString('en-IN', {
                      day: 'numeric',
                      month: 'short',
                      year: 'numeric',
                      hour: '2-digit',
                      minute: '2-digit'
                    })}
                  </td>

                  <td className="p-4">
                    <span className="flex items-center space-x-2">
                      <span className="w-7 h-7 rounded-full bg-gray-100 flex items-center justify-center text-xs">
                        {(sale.customer_name || 'W').charAt(0)}
                      </span>
                      <span className="text-gray-700">{sale.customer_name || "Walk-in"}</span>
                    </span>
                  </td>

                  <td className="p-4 text-right">
                    <span className="font-semibold text-gray-800">
                      ₹{Number(sale.grand_total).toLocaleString()}
                    </span>
                  </td>

                  <td className="p-4">
                    <PaymentBadge mode={sale.payment_mode} />
                  </td>

                  <td className="p-4 text-center">
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        navigate(`/sales/${sale.id}`);
                      }}
                      className="px-3 py-1.5 text-xs font-medium rounded-md transition opacity-0 group-hover:opacity-100"
                      style={{ 
                        backgroundColor: '#2b5d4510',
                        color: '#2b5d45'
                      }}
                    >
                      View Details
                    </button>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>

      {/* Bottom pagination (if needed) */}
      {sales.length > 0 && (
        <div className="mt-4 flex justify-between items-center text-sm text-gray-500">
          <span>Showing {sales.length} entries</span>
          <div className="flex space-x-2">
            <button className="px-3 py-1 border rounded hover:bg-gray-50">Previous</button>
            <button className="px-3 py-1 rounded text-white" style={{ backgroundColor: '#2b5d45' }}>1</button>
            <button className="px-3 py-1 border rounded hover:bg-gray-50">2</button>
            <button className="px-3 py-1 border rounded hover:bg-gray-50">Next</button>
          </div>
        </div>
      )}
    </div>
  );
};

export default SalesPage;