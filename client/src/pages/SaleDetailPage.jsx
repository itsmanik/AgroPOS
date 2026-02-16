import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router";
import api from "../utils/axios";

const SaleDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const [sale, setSale] = useState(null);
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(true);

  // 🔥 fetch sale
  useEffect(() => {
    const fetchSale = async () => {
      try {
        const res = await api.get(`/sales/${id}`);
        console.log(res.data);
        setSale(res.data.saleDetails);
        setItems(res.data.saleItems);
      } catch (err) {
        console.error("Failed to load sale", err);
      } finally {
        setLoading(false);
      }
    };

    fetchSale();
  }, [id]);

  // 🎨 Payment badge component
  const PaymentBadge = ({ mode }) => {
    const colors = {
      cash: 'bg-emerald-50 text-emerald-700 border-emerald-200',
      card: 'bg-blue-50 text-blue-700 border-blue-200',
      upi: 'bg-purple-50 text-purple-700 border-purple-200',
      credit: 'bg-amber-50 text-amber-700 border-amber-200',
    };
    
    return (
      <span className={`px-3 py-1 rounded-full text-xs font-medium capitalize border ${colors[mode?.toLowerCase()] || 'bg-gray-50 text-gray-700 border-gray-200'}`}>
        {mode || 'N/A'}
      </span>
    );
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center h-96">
        <div className="animate-pulse flex flex-col items-center">
          <div className="w-16 h-16 border-4 border-gray-200 border-t-4 rounded-full animate-spin" style={{ borderTopColor: '#2b5d45' }}></div>
          <span className="mt-4 text-gray-500">Loading invoice...</span>
        </div>
      </div>
    );
  }

  if (!sale) {
    return (
      <div className="flex flex-col items-center justify-center h-96">
        <span className="text-6xl mb-4 opacity-30">🔍</span>
        <h2 className="text-xl font-semibold text-gray-700 mb-2">Sale Not Found</h2>
        <p className="text-gray-500 mb-6">The invoice you are looking for does not exist</p>
        <button
          onClick={() => navigate('/sales')}
          className="px-6 py-2 text-white rounded-lg hover:opacity-90 transition"
          style={{ backgroundColor: '#2b5d45' }}
        >
          Back to Sales
        </button>
      </div>
    );
  }

  // Calculate totals
  const subtotal = Number(sale.subtotal) || 0;
  const gstTotal = Number(sale.cgst_total || 0) + Number(sale.sgst_total || 0) + Number(sale.igst_total || 0);
  const discount = Number(sale.discount) || 0;
  const grandTotal = Number(sale.grand_total) || 0;

  return (
    <div className="p-6 max-w-7xl mx-auto">
      {/* Header with actions */}
      <div className="flex justify-between items-center mb-6">
        <button
          onClick={() => navigate(-1)}
          className="flex items-center space-x-2 text-gray-600 hover:text-gray-900 transition group"
        >
          <span className="text-xl group-hover:-translate-x-1 transition-transform">←</span>
          <span>Back</span>
        </button>
        
        <div className="flex space-x-3">
          <button 
            onClick={() => window.print()}
            className="px-4 py-2 border border-gray-200 rounded-lg hover:bg-gray-50 transition flex items-center space-x-2"
          >
            <span>🖨️</span>
            <span>Print</span>
          </button>
          <button 
            onClick={() => navigate(`/sales/${id}/edit`)}
            className="px-4 py-2 text-white rounded-lg hover:opacity-90 transition flex items-center space-x-2"
            style={{ backgroundColor: '#2b5d45' }}
          >
            <span>✏️</span>
            <span>Edit</span>
          </button>
        </div>
      </div>

      {/* Invoice Card */}
      <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
        {/* Invoice Header */}
        <div className="p-6 border-b border-gray-100 bg-gradient-to-r from-gray-50 to-white">
          <div className="flex justify-between items-start">
            <div>
              <div className="flex items-center space-x-3 mb-2">
                <span className="text-2xl">🧾</span>
                <h1 className="text-2xl font-bold text-gray-800">Invoice #{sale.invoice_no}</h1>
              </div>
              <p className="text-gray-500">
                Generated on {new Date(sale.created_at).toLocaleDateString('en-IN', {
                  weekday: 'long',
                  year: 'numeric',
                  month: 'long',
                  day: 'numeric',
                  hour: '2-digit',
                  minute: '2-digit'
                })}
              </p>
            </div>
            <PaymentBadge mode={sale.payment_mode} />
          </div>
        </div>

        {/* Customer & Store Info */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 p-6 border-b border-gray-100">
          <div>
            <h3 className="text-xs font-semibold text-gray-400 uppercase tracking-wider mb-3">Customer Details</h3>
            <div className="space-y-2">
              <div className="flex items-center space-x-3">
                <div className="w-10 h-10 rounded-full bg-gray-100 flex items-center justify-center text-lg">
                  {(sale.customer_name || 'W').charAt(0)}
                </div>
                <div>
                  <p className="font-medium text-gray-800">{sale.customer_name || "Walk-in Customer"}</p>
                  {sale.customer_phone && (
                    <p className="text-sm text-gray-500">{sale.customer_phone}</p>
                  )}
                </div>
              </div>
            </div>
          </div>
          
          <div>
            <h3 className="text-xs font-semibold text-gray-400 uppercase tracking-wider mb-3">Store Details</h3>
            <div className="space-y-1 text-sm">
              <p className="font-medium text-gray-800">Your Store Name</p>
              <p className="text-gray-500">GST: 22AAAAA0000A1Z5</p>
              <p className="text-gray-500">123 Business Street, City - 400001</p>
            </div>
          </div>
        </div>

        {/* Items Table */}
        <div className="p-6 border-b border-gray-100">
          <h3 className="text-xs font-semibold text-gray-400 uppercase tracking-wider mb-4">Order Items</h3>
          
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="text-left text-gray-500 text-xs border-b border-gray-200">
                  <th className="pb-3 font-medium">Item</th>
                  <th className="pb-3 font-medium">HSN</th>
                  <th className="pb-3 font-medium text-right">Rate</th>
                  <th className="pb-3 font-medium text-right">Qty</th>
                  <th className="pb-3 font-medium text-right">GST</th>
                  <th className="pb-3 font-medium text-right">Total</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100">
                {items.map((item, index) => (
                  <tr key={item.id} className="hover:bg-gray-50/50 transition">
                    <td className="py-3 font-medium text-gray-800">
                      <div className="flex items-center space-x-2">
                        <span className="text-gray-400 text-xs">{String(index + 1).padStart(2, '0')}</span>
                        <span>{item.product_name}</span>
                      </div>
                    </td>
                    <td className="py-3 text-gray-600">{item.hsn_code || '-'}</td>
                    <td className="py-3 text-right text-gray-600">₹{Number(item.rate).toFixed(2)}</td>
                    <td className="py-3 text-right">
                      <span className="px-2 py-1 bg-gray-100 rounded-full text-xs">
                        {item.qty}
                      </span>
                    </td>
                    <td className="py-3 text-right">
                      <span className="text-gray-600">{item.gst_percent}%</span>
                    </td>
                    <td className="py-3 text-right font-medium text-gray-800">
                      ₹{Number(item.line_total).toFixed(2)}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Summary */}
        <div className="p-6 bg-gray-50/50">
          <div className="max-w-sm ml-auto">
            <div className="space-y-2">
              <div className="flex justify-between text-sm">
                <span className="text-gray-600">Subtotal</span>
                <span className="font-medium text-gray-800">₹{subtotal.toFixed(2)}</span>
              </div>
              <div className="flex justify-between text-sm">
                <span className="text-gray-600">GST (CGST + SGST + IGST)</span>
                <span className="font-medium text-gray-800">₹{gstTotal.toFixed(2)}</span>
              </div>
              {discount > 0 && (
                <div className="flex justify-between text-sm">
                  <span className="text-gray-600">Discount</span>
                  <span className="font-medium text-red-600">- ₹{discount.toFixed(2)}</span>
                </div>
              )}
              <div className="flex justify-between text-base font-bold pt-3 border-t border-gray-200">
                <span className="text-gray-800">Grand Total</span>
                <span className="text-xl" style={{ color: '#2b5d45' }}>₹{grandTotal.toFixed(2)}</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Footer Actions */}
      <div className="mt-6 flex justify-end space-x-3">
        <button 
          onClick={() => navigate('/sales')}
          className="px-4 py-2 border border-gray-200 rounded-lg hover:bg-gray-50 transition"
        >
          Back to Sales
        </button>
        <button 
          onClick={() => navigate(`/sales/${id}/invoice`)}
          className="px-4 py-2 text-white rounded-lg hover:opacity-90 transition"
          style={{ backgroundColor: '#2b5d45' }}
        >
          Download Invoice
        </button>
      </div>
    </div>
  );
};

export default SaleDetails;