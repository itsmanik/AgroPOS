/* eslint-disable no-unused-vars */
import { useState, useRef, useMemo } from "react";
import QRCode from "react-qr-code";
import {
  Printer,
  CreditCard,
  DollarSign,
  Clock,
  RotateCcw,
  X,
} from "lucide-react";

const Billing = ({
  classname,
  billingItems = [],
  extraDiscount,
  setExtraDiscount,
}) => {
  const [paymentMode, setPaymentMode] = useState("cash");
  const [name, setName] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [location, setLocation] = useState("");
  const [amountReceived, setAmountReceived] = useState("");
  const [showQRModal, setShowQRModal] = useState(false);
  const billRef = useRef(null);

  // Calculate totals from billing items
  const calculations = useMemo(() => {
    let subtotal = 0;
    let totalGST = 0;

    billingItems.forEach((item) => {
      const itemTotal = (item.selling_price || 0) * (item.qty || 1);
      subtotal += itemTotal;

      // Calculate GST on the item total
      const gstRate = (item.gst || 0) / 100;
      totalGST += itemTotal * gstRate;
    });

    const discount = Number(extraDiscount) || 0;
    const grandTotal = subtotal + totalGST - discount;

    return {
      subtotal,
      totalGST,
      grandTotal: Math.max(0, grandTotal),
    };
  }, [billingItems, extraDiscount]);

  const { subtotal, totalGST, grandTotal } = calculations;

  // Round to nearest integer
  const handleRound = () => {
    // Get the decimal part (paise) from grand total
    const decimalPart = grandTotal - Math.floor(grandTotal);

    // Add the decimal part to extra discount to make grand total round
    const newDiscount = Number(extraDiscount) + decimalPart;
    setExtraDiscount(newDiscount.toFixed(2));
  };

  const changeReturn = () => {
    if (paymentMode !== "cash") return 0;
    const received = Number(amountReceived) || 0;
    return Math.max(0, received - grandTotal);
  };

  const handlePrint = () => {
    if (billRef.current) {
      billRef.current.handlePrint();
    }
  };

  // Handle online payment click
  const handleOnlinePayment = () => {
    setPaymentMode("online");
    setShowQRModal(true);
  };

  return (
    <div className={classname}>
      <div className="rounded-md flex flex-col bg-white p-4 shadow h-full overflow-y-auto">
        {/* Customer Information */}
        <div className="mb-2">
          <div className="space-y-1">
            <div className="grid grid-cols-2 gap-2">
              <input
                type="text"
                placeholder="Customer Name"
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="p-2 border rounded focus:ring-1 focus:ring-blue-500"
              />
              <input
                type="text"
                placeholder="Phone Number"
                value={phoneNumber}
                onChange={(e) => setPhoneNumber(e.target.value)}
                className="p-2 border rounded focus:ring-1 focus:ring-blue-500"
              />
            </div>
            <input
              type="text"
              placeholder="Address"
              value={location}
              onChange={(e) => setLocation(e.target.value)}
              className="p-2 border rounded w-full focus:ring-1 focus:ring-blue-500"
            />
          </div>
        </div>

        {/* Extra Discount with Round Button */}
        <div className="mb-3">
          <div className="flex items-center gap-2">
            <div className="flex items-center border rounded overflow-hidden flex-1">
              <span className="bg-gray-100 px-3 py-1 text-s border-r whitespace-nowrap">
                Extra Disc
              </span>
              <input
                type="number"
                className="w-full p-1 text-sm outline-none"
                value={extraDiscount}
                onChange={(e) => setExtraDiscount(e.target.value)}
                placeholder="0"
                min="0"
                step="any"
              />
              <span className="bg-gray-100 px-3 py-1 text-sm border-l">₹</span>
            </div>
            <button
              onClick={handleRound}
              className="p-1 px-4 bg-[#ddffef] text-[#2B5D45] rounded border border-[#2B5D45] hover:bg-[#89dbb3] flex items-center gap-1"
              title="Round to nearest rupee"
            >
              <RotateCcw size={13} />
              <span className="text-xs font-medium">Round</span>
            </button>
          </div>
        </div>

        {/* Payment Mode - Boxes */}
        <div className="grid grid-cols-3 gap-2 mb-3">
          <button
            onClick={() => setPaymentMode("cash")}
            className={`p-1 rounded border flex items-center justify-center gap-2
              ${
                paymentMode === "cash"
                  ? "border-green-500 bg-green-50 text-green-700"
                  : "border-gray-200 bg-gray-50 text-gray-600"
              }`}
          >
            <DollarSign size={16} />
            <span className="text-sm font-medium">Cash</span>
          </button>
          <button
            onClick={handleOnlinePayment}
            className={`p-1 rounded border flex items-center justify-center gap-2
              ${
                paymentMode === "online"
                  ? "border-blue-500 bg-blue-50 text-blue-700"
                  : "border-gray-200 bg-gray-50 text-gray-600"
              }`}
          >
            <CreditCard size={16} />
            <span className="text-sm font-medium">Online</span>
          </button>
          <button
            onClick={() => setPaymentMode("unpaid")}
            className={`p-1 rounded border flex items-center justify-center gap-2
              ${
                paymentMode === "unpaid"
                  ? "border-yellow-500 bg-yellow-50 text-yellow-700"
                  : "border-gray-200 bg-gray-50 text-gray-600"
              }`}
          >
            <Clock size={16} />
            <span className="text-sm font-medium">Due</span>
          </button>
        </div>

        {/* Cash Section */}
        {paymentMode === "cash" && (
          <div className="grid grid-cols-2 gap-2 mb-3">
            <input
              type="number"
              value={amountReceived}
              onChange={(e) => setAmountReceived(e.target.value)}
              className="p-2 border rounded"
              placeholder="Amount received"
              min="0"
              step="any"
            />
            {amountReceived && (
              <div className="p-2 bg-green-100 rounded text-green-700 font-bold text-center">
                Change: ₹{changeReturn().toFixed(2)}
              </div>
            )}
          </div>
        )}

        {/* Online QR Modal */}
        {showQRModal && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
            <div className="bg-white rounded-lg p-6 max-w-sm w-full mx-4">
              <div className="flex justify-between items-center mb-4">
                <h3 className="text-lg font-semibold text-gray-800">Scan to Pay</h3>
                <button
                  onClick={() => setShowQRModal(false)}
                  className="p-1 hover:bg-gray-100 rounded"
                >
                  <X size={20} />
                </button>
              </div>
              
              <div className="flex flex-col items-center">
                <QRCode
                  value={`upi://pay?pa=nehamaravanthe@okicici&pn=AgroShop&am=${grandTotal.toFixed(
                    2
                  )}&cu=INR`}
                  size={200}
                  fgColor="#2B5D45"
                />
                
                <div className="mt-4 text-center">
                  <p className="text-sm text-gray-600 mb-1">Amount to pay:</p>
                  <p className="text-2xl font-bold text-[#2B5D45]">₹{grandTotal.toFixed(2)}</p>
                </div>

                <div className="mt-4 w-full">
                  <button
                    onClick={() => setShowQRModal(false)}
                    className="w-full bg-[#2B5D45] text-white py-2 rounded-lg hover:bg-[#23553d] transition-colors"
                  >
                    Done
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Unpaid */}
        {paymentMode === "unpaid" && (
          <div className="bg-yellow-50 p-2 rounded border border-yellow-200 text-center text-yellow-700 mb-3">
            ⚠ Amount will be added to pending dues
          </div>
        )}

        {/* Text Summary - With proper calculations */}
        <div className="text-sm text-gray-600 border-t border-gray-200 pt-3 mb-3 space-y-1">
          <div className="flex justify-between">
            <span>Subtotal:</span>
            <span className="font-medium">₹{subtotal.toFixed(2)}</span>
          </div>
          <div className="flex justify-between">
            <span>Total GST:</span>
            <span className="font-medium">₹{totalGST.toFixed(2)}</span>
          </div>
          {Number(extraDiscount) > 0 && (
            <div className="flex justify-between text-green-600">
              <span>Extra Discount:</span>
              <span className="font-medium">
                - ₹{Number(extraDiscount).toFixed(2)}
              </span>
            </div>
          )}
        </div>

        {/* Print Button */}
        <button
          onClick={handlePrint}
          className="flex items-center justify-between mt-auto bg-[#2B5D45] text-white rounded-lg p-2 hover:bg-[#23553d] transition-colors"
        >
          <div className="flex items-center gap-2">
            <span className="text-sm font-medium"></span>
            <Printer size={22} />
          </div>
          <span className="font-bold text-lg">₹{grandTotal.toFixed(2)}</span>
        </button>
      </div>
    </div>
  );
};

export default Billing;