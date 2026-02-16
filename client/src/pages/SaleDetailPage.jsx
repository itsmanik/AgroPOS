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
      <span className={`px-3 py-1.5 rounded-full text-xs font-medium capitalize border ${colors[mode?.toLowerCase()] || 'bg-gray-50 text-gray-700 border-gray-200'}`}>
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
  const cgst = Number(sale.cgst_total) || 0;
  const sgst = Number(sale.sgst_total) || 0;
  const igst = Number(sale.igst_total) || 0;
  const gstTotal = cgst + sgst + igst;
  const discount = Number(sale.discount) || 0;
  const grandTotal = Number(sale.grand_total) || 0;

  return (
    <div className="p-6 max-w-8xl mx-auto">
      {/* Back button */}
      <button
        onClick={() => navigate(-1)}
        className="flex items-center space-x-2 text-gray-600 hover:text-gray-900 transition group mb-6"
      >
        <span className="text-xl group-hover:-translate-x-1 transition-transform">←</span>
        <span>Back to Sales</span>
      </button>

      {/* Invoice Card */}
      <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
        {/* Header - Redesigned */}
        <div className="p-6 border-b border-gray-100">
          {/* Top row - Invoice and Payment */}
          <div className="flex flex-wrap items-center justify-between gap-4 mb-4">
            <div className="flex items-center gap-3">
              <span className="text-3xl">🧾</span>
              <div>
                <h1 className="text-2xl font-bold text-gray-800">Invoice #{sale.invoice_no}</h1>
                <p className="text-sm text-gray-500">
                  {new Date(sale.created_at).toLocaleDateString('en-IN', {
                    day: '2-digit',
                    month: 'short',
                    year: 'numeric',
                    hour: '2-digit',
                    minute: '2-digit'
                  })}
                </p>
              </div>
            </div>
            <PaymentBadge mode={sale.payment_mode} />
          </div>

          {/* Bottom row - Customer details (full width) */}
          <div className="flex flex-wrap items-center gap-4 pt-3 border-t border-gray-100">
            <div className="flex items-center gap-2">
              <span className="text-gray-400">👤</span>
              <span className="font-medium text-gray-800">{sale.customer_name || "Walk-in Customer"}</span>
            </div>
            
            {sale.customer_phone && (
              <div className="flex items-center gap-2">
                <span className="text-gray-400">📞</span>
                <span className="text-sm text-gray-600">{sale.customer_phone}</span>
              </div>
            )}
            
            {sale.customer_address && (
              <div className="flex items-center gap-2">
                <span className="text-gray-400">📍</span>
                <span className="text-sm text-gray-600">{sale.customer_address}</span>
              </div>
            )}
          </div>
        </div>

        {/* Items Table */}
        <div className="p-6 border-b border-gray-100">
          <h3 className="text-sm font-semibold text-gray-700 mb-4 flex items-center gap-2">
            <span>📦</span>
            <span>Order Items</span>
            <span className="text-xs bg-gray-100 text-gray-600 px-2 py-0.5 rounded-full ml-2">{items.length} items</span>
          </h3>
          
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="text-left text-gray-500 text-xs border-b border-gray-200">
                  <th className="pb-3 font-medium">#</th>
                  <th className="pb-3 font-medium">Item</th>
                  <th className="pb-3 font-medium">HSN</th>
                  <th className="pb-3 font-medium text-right">Rate</th>
                  <th className="pb-3 font-medium text-right">Qty</th>
                  <th className="pb-3 font-medium text-right">Taxable</th>
                  <th className="pb-3 font-medium text-right">GST%</th>
                  <th className="pb-3 font-medium text-right">GST Amt</th>
                  <th className="pb-3 font-medium text-right">Total</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100">
                {items.map((item, index) => (
                  <tr key={item.id} className="hover:bg-gray-50/50 transition">
                    <td className="py-3 text-gray-400 text-xs">{String(index + 1).padStart(2, '0')}</td>
                    <td className="py-3 font-medium text-gray-800">{item.product_name}</td>
                    <td className="py-3 text-gray-600">{item.hsn_code || '-'}</td>
                    <td className="py-3 text-right text-gray-600">₹{Number(item.rate).toFixed(2)}</td>
                    <td className="py-3 text-right">
                      <span className="px-2 py-1 bg-gray-100 rounded-full text-xs">
                        {item.qty} {item.unit || 'pcs'}
                      </span>
                    </td>
                    <td className="py-3 text-right text-gray-600">₹{Number(item.taxable_amount).toFixed(2)}</td>
                    <td className="py-3 text-right">
                      <span className="text-gray-600">{item.gst_percent}%</span>
                    </td>
                    <td className="py-3 text-right text-gray-600">₹{Number(item.gst_amount).toFixed(2)}</td>
                    <td className="py-3 text-right font-medium text-gray-800">₹{Number(item.line_total).toFixed(2)}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Summary */}
        <div className="p-6 bg-gray-50/50">
          <div className="max-w-sm ml-auto">
            <div className="space-y-3">
              {/* Subtotal */}
              <div className="flex justify-between text-sm">
                <span className="text-gray-600">Subtotal</span>
                <span className="font-medium text-gray-800">₹{subtotal.toFixed(2)}</span>
              </div>

              {/* GST Breakdown */}
              <div className="space-y-2 pt-1">
                <div className="flex justify-between text-xs text-gray-500">
                  <span>CGST @9%</span>
                  <span>₹{cgst.toFixed(2)}</span>
                </div>
                <div className="flex justify-between text-xs text-gray-500">
                  <span>SGST @9%</span>
                  <span>₹{sgst.toFixed(2)}</span>
                </div>
                {igst > 0 && (
                  <div className="flex justify-between text-xs text-gray-500">
                    <span>IGST @18%</span>
                    <span>₹{igst.toFixed(2)}</span>
                  </div>
                )}
                <div className="flex justify-between text-sm pt-2 border-t border-gray-200 border-dashed">
                  <span className="text-gray-600">Total GST</span>
                  <span className="font-medium text-gray-800">₹{gstTotal.toFixed(2)}</span>
                </div>
              </div>

              {/* Discount */}
              {discount > 0 && (
                <div className="flex justify-between text-sm">
                  <span className="text-gray-600">Discount</span>
                  <span className="font-medium text-red-600">- ₹{discount.toFixed(2)}</span>
                </div>
              )}

              {/* Grand Total */}
              <div className="flex justify-between text-base font-bold pt-3 border-t border-gray-200">
                <span className="text-gray-800">Grand Total</span>
                <span className="text-xl" style={{ color: '#2b5d45' }}>₹{grandTotal.toFixed(2)}</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Footer Actions */}
      <div className="mt-6 flex justify-end gap-3">
        <button 
          onClick={() => window.print()}
          className="px-6 py-2.5 border border-gray-200 rounded-lg hover:bg-gray-50 transition flex items-center gap-2"
        >
          <span>🖨️</span>
          <span>Print</span>
        </button>
        <button 
          onClick={() => navigate(`/sales/${id}/invoice`)}
          className="px-6 py-2.5 text-white rounded-lg hover:opacity-90 transition flex items-center gap-2"
          style={{ backgroundColor: '#2b5d45' }}
        >
          <span>📄</span>
          <span>Download</span>
        </button>
      </div>
    </div>
  );
};

export default SaleDetails;