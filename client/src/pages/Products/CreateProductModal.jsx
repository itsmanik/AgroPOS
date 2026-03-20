import { useState } from "react";
import api from "../../utils/axios";

const CreateProductModal = ({isOpen, onClose}) => {
  const [name, setName] = useState("");
  const [gst, setGST] = useState("");
  const [sellingPrice, setSellingPrice] = useState("");
  const [hsnCode, setHsnCode] = useState("");
  
  // Simple toggle
  const [gstIncluded, setGstIncluded] = useState(false);
  
  // Form validation errors
  const [errors, setErrors] = useState({});

  const validateForm = () => {
    const newErrors = {};
    
    if (!name.trim()) newErrors.name = "Required";
    if (!hsnCode.trim()) newErrors.hsnCode = "Required";
    else if (!/^\d{4}$/.test(hsnCode)) newErrors.hsnCode = "4 digits only";
    
    if (!sellingPrice) newErrors.sellingPrice = "Required";
    else if (isNaN(sellingPrice) || parseFloat(sellingPrice) <= 0) {
      newErrors.sellingPrice = "Invalid price";
    }
    
    if (!gst) newErrors.gst = "Required";
    else if (isNaN(gst) || parseFloat(gst) < 0 || parseFloat(gst) > 100) {
      newErrors.gst = "0-100 only";
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const getBasePrice = () => {
    if (!sellingPrice || !gst) return null;
    const price = parseFloat(sellingPrice);
    const gstPercent = parseFloat(gst);
    
    if (gstIncluded) {
      return (price / (1 + gstPercent / 100)).toFixed(2);
    } else {
      return price.toFixed(2);
    }
  };

  const handleSubmit = async () => {
    if (!validateForm()) return;
    
    const formData = new FormData();
    formData.append("name", name);
    formData.append("gst", gst || 0);
    
    const basePrice = getBasePrice();
    formData.append("selling_price", basePrice);
    formData.append("hsn_code", hsnCode);
    
    try {
      const response = await api.post("/products/", formData);
      console.log(response.data);
      alert("Product added successfully!");
      
      // Reset form
      setName("");
      setGST("");
      setSellingPrice("");
      setHsnCode("");
      setGstIncluded(false);
      setErrors({});
      onClose();
      
    } catch (err) {
      console.log(err);
      alert("Error adding product. Please try again.");
    }
  };

  const handleCancel = () => {
    setName("");
    setGST("");
    setSellingPrice("");
    setHsnCode("");
    setGstIncluded(false);
    setErrors({});
    onClose();
  };

  if (!isOpen) return null;
  
  return (
    <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50">
      <div className="bg-white p-6 rounded-lg shadow-md w-full max-w-3xl">
        <h2 className="text-xl font-bold mb-5" style={{ color: '#2b5d45' }}>
          Add New Product
        </h2>
        
        {/* 2-column layout */}
        <div className="grid grid-cols-2 gap-4">
          {/* Product Name */}
          <div className="col-span-2">
            <label className="block text-gray-700 font-medium text-sm">
              Product Name <span className="text-red-500">*</span>
            </label>
            <input
              type="text"
              placeholder="Enter product name"
              className={`w-full mt-1 p-2.5 border rounded-md text-sm ${
                errors.name ? "border-red-500" : "border-gray-300"
              }`}
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
            {errors.name && <p className="text-red-500 text-xs mt-1">{errors.name}</p>}
          </div>

          {/* HSN Code */}
          <div>
            <label className="block text-gray-700 font-medium text-sm">
              HSN Code <span className="text-red-500">*</span>
            </label>
            <input
              type="text"
              placeholder="4 digits"
              maxLength="4"
              className={`w-full mt-1 p-2.5 border rounded-md text-sm ${
                errors.hsnCode ? "border-red-500" : "border-gray-300"
              }`}
              value={hsnCode}
              onChange={(e) => setHsnCode(e.target.value.replace(/\D/g, ''))}
            />
            {errors.hsnCode && <p className="text-red-500 text-xs mt-1">{errors.hsnCode}</p>}
          </div>

          {/* GST Percentage */}
          <div>
            <label className="block text-gray-700 font-medium text-sm">
              GST (%) <span className="text-red-500">*</span>
            </label>
            <input
              type="number"
              placeholder="18"
              className={`w-full mt-1 p-2.5 border rounded-md text-sm ${
                errors.gst ? "border-red-500" : "border-gray-300"
              }`}
              value={gst}
              onChange={(e) => setGST(e.target.value)}
              step="0.1"
              min="0"
              max="100"
            />
            {errors.gst && <p className="text-red-500 text-xs mt-1">{errors.gst}</p>}
          </div>

          {/* Selling Price with GST Toggle - Takes full width */}
          <div className="col-span-2">
            <div className="border rounded-lg p-4 bg-gray-50">
              <label className="block text-gray-700 font-medium text-sm mb-2">
                Selling Price <span className="text-red-500">*</span>
              </label>
              
              <div className="grid grid-cols-2 gap-3">
                <input
                  type="number"
                  placeholder="Enter price"
                  className={`p-2.5 border rounded-md text-sm ${
                    errors.sellingPrice ? "border-red-500" : "border-gray-300"
                  }`}
                  value={sellingPrice}
                  onChange={(e) => setSellingPrice(e.target.value)}
                  step="0.01"
                  min="0"
                />
                
                <div className="flex items-center gap-3 bg-white p-2 rounded-md border">
                  <span className="text-gray-700 text-sm whitespace-nowrap">Includes GST?</span>
                  <div className="flex gap-3">
                    <label className="flex items-center gap-1.5 cursor-pointer text-sm">
                      <input
                        type="radio"
                        checked={!gstIncluded}
                        onChange={() => setGstIncluded(false)}
                        className="w-3.5 h-3.5"
                        style={{ accentColor: '#2b5d45' }}
                      />
                      <span>No</span>
                    </label>
                    <label className="flex items-center gap-1.5 cursor-pointer text-sm">
                      <input
                        type="radio"
                        checked={gstIncluded}
                        onChange={() => setGstIncluded(true)}
                        className="w-3.5 h-3.5"
                        style={{ accentColor: '#2b5d45' }}
                      />
                      <span>Yes</span>
                    </label>
                  </div>
                </div>
              </div>
              {errors.sellingPrice && <p className="text-red-500 text-xs mt-1">{errors.sellingPrice}</p>}
            </div>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex gap-3 mt-6">
          <button
            className="flex-1 text-gray-700 py-2.5 px-4 rounded-md border border-gray-300 transition hover:bg-gray-50 font-medium text-sm"
            onClick={handleCancel}
          >
            Cancel
          </button>
          <button
            className="flex-1 text-white py-2.5 px-4 rounded-md transition hover:opacity-90 disabled:opacity-50 disabled:cursor-not-allowed font-medium text-sm"
            style={{ backgroundColor: '#2b5d45' }}
            onClick={handleSubmit}
            disabled={!name || !sellingPrice || !gst || !hsnCode}
          >
            Add Product
          </button>
        </div>
        
        {(!name || !sellingPrice || !gst || !hsnCode) && (
          <p className="text-xs text-center text-gray-500 mt-3">
            * Required fields: Name, HSN (4 digits), GST, Selling Price
          </p>
        )}
      </div>
    </div>
  );
};

export default CreateProductModal;