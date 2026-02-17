import { useState } from "react";
import api from "../../utils/axios";

const CreateProductPage = () => {
  const [name, setName] = useState("");
  const [gst, setGST] = useState("");
  const [sellingPrice, setSellingPrice] = useState("");
  const [hsnCode, setHsnCode] = useState("");
  
  // Optional fields
  const [nickname, setNickname] = useState("");
  const [brandName, setBrandName] = useState("");
  const [mrp, setMrp] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("General");
  const [selectedUnit, setSelectedUnit] = useState("Unit");
  const [stockQuantity, setStockQuantity] = useState("");
  const [image, setImage] = useState(null);
  const [imagePreview, setImagePreview] = useState(null);
  
  // Simple toggle
  const [gstIncluded, setGstIncluded] = useState(false);
  
  // Form validation errors
  const [errors, setErrors] = useState({});

  const categories = [
    "General",
    "Fertilizers",
    "Seeds",
    "Pesticides",
    "Tools",
    "Machinery",
  ];
  
  const units = ["Unit", "Kilograms", "Liters", "Packets", "Meters", "Boxes"];

  const handleImageUpload = (event) => {
    const file = event.target.files[0];
    if (file) {
      setImage(file);
      setImagePreview(URL.createObjectURL(file));
    }
  };

  // const getCustomerPrice = () => {
  //   if (!sellingPrice || !gst) return null;
  //   const price = parseFloat(sellingPrice);
  //   const gstPercent = parseFloat(gst);
    
  //   if (gstIncluded) {
  //     return price.toFixed(2);
  //   } else {
  //     return (price * (1 + gstPercent / 100)).toFixed(2);
  //   }
  // };

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
    
    if (mrp && (isNaN(mrp) || parseFloat(mrp) <= 0)) {
      newErrors.mrp = "Invalid MRP";
    }
    
    if (stockQuantity && (isNaN(stockQuantity) || parseInt(stockQuantity) < 0)) {
      newErrors.stockQuantity = "Invalid";
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async () => {
    if (!validateForm()) return;
    
    const formData = new FormData();
    formData.append("name", name);
    formData.append("nickname", nickname);
    formData.append("brand_name", brandName);
    formData.append("category", selectedCategory);
    formData.append("unit", selectedUnit);
    formData.append("mrp", mrp || 0);
    formData.append("gst", gst || 0);
    
    const basePrice = getBasePrice();
    formData.append("selling_price", basePrice);
    
    formData.append("hsn_code", hsnCode);
    formData.append("stock_quantity", stockQuantity || 0);
    
    if (image) {
      formData.append("image", image);
    }
    
    try {
      const response = await api.post("/products/", formData);
      console.log(response.data);
      alert("Product added successfully!");
      
      // Reset form
      setName("");
      setNickname("");
      setBrandName("");
      setMrp("");
      setGST("");
      setSellingPrice("");
      setHsnCode("");
      setSelectedCategory("General");
      setSelectedUnit("Unit");
      setStockQuantity("");
      setImage(null);
      setImagePreview(null);
      setGstIncluded(false);
      setErrors({});
      
    } catch (err) {
      console.log(err);
      alert("Error adding product. Please try again.");
    }
  };

  return (
    <div className="mb-10">
      <h2 className="text-2xl text-gray-700 pt-5 px-7 font-bold mb-6">
        Add New Product
      </h2>
      <div className="bg-gray-100">
        <div className="bg-white p-8 rounded-lg shadow-md mx-8">
          
          {/* 2-column layout */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            
            {/* Left Column */}
            <div className="space-y-5">
              <h3 className="text-lg font-medium mb-2" style={{ color: '#2b5d45' }}>
                Basic Information
              </h3>
              
              <div className="grid grid-cols-2 gap-4">
                <div className="col-span-2">
                  <label className="block text-gray-700 font-medium">
                    Product Name <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="text"
                    placeholder="Enter product name"
                    className={`w-full mt-1 p-3 border rounded-md ${
                      errors.name ? "border-red-500" : "border-gray-300"
                    }`}
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                  />
                  {errors.name && <p className="text-red-500 text-xs mt-1">{errors.name}</p>}
                </div>
                
                <div>
                  <label className="block text-gray-700 font-medium">Nick Name</label>
                  <input
                    type="text"
                    placeholder="Optional"
                    className="w-full mt-1 p-3 border border-gray-300 rounded-md"
                    value={nickname}
                    onChange={(e) => setNickname(e.target.value)}
                  />
                </div>
                
                <div>
                  <label className="block text-gray-700 font-medium">Brand Name</label>
                  <input
                    type="text"
                    placeholder="Optional"
                    className="w-full mt-1 p-3 border border-gray-300 rounded-md"
                    value={brandName}
                    onChange={(e) => setBrandName(e.target.value)}
                  />
                </div>
                
                <div>
                  <label className="block text-gray-700 font-medium">Category</label>
                  <select
                    value={selectedCategory}
                    onChange={(e) => setSelectedCategory(e.target.value)}
                    className="w-full mt-1 p-3 border border-gray-300 rounded-md"
                  >
                    {categories.map((category) => (
                      <option key={category} value={category}>{category}</option>
                    ))}
                  </select>
                </div>
                
                <div>
                  <label className="block text-gray-700 font-medium">Unit</label>
                  <select
                    value={selectedUnit}
                    onChange={(e) => setSelectedUnit(e.target.value)}
                    className="w-full mt-1 p-3 border border-gray-300 rounded-md"
                  >
                    {units.map((unit) => (
                      <option key={unit} value={unit}>{unit}</option>
                    ))}
                  </select>
                </div>
                
                <div>
                  <label className="block text-gray-700 font-medium">Stock Quantity</label>
                  <input
                    type="number"
                    placeholder="Optional"
                    className={`w-full mt-1 p-3 border rounded-md ${
                      errors.stockQuantity ? "border-red-500" : "border-gray-300"
                    }`}
                    value={stockQuantity}
                    onChange={(e) => setStockQuantity(e.target.value)}
                    min="0"
                  />
                  {errors.stockQuantity && <p className="text-red-500 text-xs mt-1">{errors.stockQuantity}</p>}
                </div>
                
                <div>
                  <label className="block text-gray-700 font-medium">MRP (₹)</label>
                  <input
                    type="number"
                    placeholder="Optional"
                    className={`w-full mt-1 p-3 border rounded-md ${
                      errors.mrp ? "border-red-500" : "border-gray-300"
                    }`}
                    value={mrp}
                    onChange={(e) => setMrp(e.target.value)}
                    step="0.01"
                    min="0"
                  />
                  {errors.mrp && <p className="text-red-500 text-xs mt-1">{errors.mrp}</p>}
                </div>
              </div>
            </div>
            
            {/* Right Column */}
            <div className="space-y-5">
              <h3 className="text-lg font-medium mb-2" style={{ color: '#2b5d45' }}>
                Pricing & GST
              </h3>
              
              <div className="grid grid-cols-2 gap-4">
                <div className="col-span-2 md:col-span-1">
                  <label className="block text-gray-700 font-medium">
                    HSN Code <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="text"
                    placeholder="4 digits"
                    maxLength="4"
                    className={`w-full mt-1 p-3 border rounded-md ${
                      errors.hsnCode ? "border-red-500" : "border-gray-300"
                    }`}
                    value={hsnCode}
                    onChange={(e) => setHsnCode(e.target.value.replace(/\D/g, ''))}
                  />
                  {errors.hsnCode && <p className="text-red-500 text-xs mt-1">{errors.hsnCode}</p>}
                </div>
                
                <div className="col-span-2 md:col-span-1">
                  <label className="block text-gray-700 font-medium">
                    GST (%) <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="number"
                    placeholder="18"
                    className={`w-full mt-1 p-3 border rounded-md ${
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
                
                {/* Selling Price Card - Takes full width in right column */}
                <div className="col-span-2 mt-2">
                  <div className="border rounded-lg p-5 bg-gray-50">
                    <label className="block text-gray-700 font-medium mb-3">
                      Selling Price <span className="text-red-500">*</span>
                    </label>
                    
                    <div className="grid grid-cols-5 gap-4">
                      <div className="col-span-2 md:col-span-2">
                        <input
                          type="number"
                          placeholder="Enter price"
                          className={`w-full p-3 border rounded-md ${
                            errors.sellingPrice ? "border-red-500" : "border-gray-300"
                          }`}
                          value={sellingPrice}
                          onChange={(e) => setSellingPrice(e.target.value)}
                          step="0.01"
                          min="0"
                        />
                        {errors.sellingPrice && <p className="text-red-500 text-xs mt-1">{errors.sellingPrice}</p>}
                      </div>
                      
                      <div className="col-span-2 md:col-span-3">
                        <div className="flex items-center gap-4 bg-white p-3 rounded-md border h-full">
                          <span className="text-gray-700 text-nowrap">Includes GST?</span>
                          <div className="flex gap-4">
                            <label className="flex items-center gap-2 cursor-pointer">
                              <input
                                type="radio"
                                checked={!gstIncluded}
                                onChange={() => setGstIncluded(false)}
                                className="w-4 h-4"
                                style={{ accentColor: '#2b5d45' }}
                              />
                              <span>No</span>
                            </label>
                            <label className="flex items-center gap-2 cursor-pointer">
                              <input
                                type="radio"
                                checked={gstIncluded}
                                onChange={() => setGstIncluded(true)}
                                className="w-4 h-4"
                                style={{ accentColor: '#2b5d45' }}
                              />
                              <span>Yes</span>
                            </label>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                
                {/* Image Upload - Now in right column, below pricing */}
                <div className="col-span-2">
                  <h3 className="text-lg font-medium mb-3" style={{ color: '#2b5d45' }}>
                    Product Image
                  </h3>
                  <div className="flex items-center gap-6">
                    {imagePreview && (
                      <img
                        src={imagePreview}
                        alt="Preview"
                        className="h-20 w-20 object-cover rounded-md border border-gray-200"
                      />
                    )}
                    <label className="flex-1 p-4 border-2 border-dashed rounded-md text-center cursor-pointer transition hover:bg-gray-50"
                      style={{ borderColor: '#2b5d45', color: '#2b5d45' }}
                    >
                      <span className="block">
                        {imagePreview ? "Change image" : "Upload product image"}
                      </span>
                      <span className="text-xs text-gray-500 mt-1 block">
                        PNG, JPG up to 5MB
                      </span>
                      <input
                        type="file"
                        accept="image/*"
                        onChange={handleImageUpload}
                        className="hidden"
                      />
                    </label>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Submit Button */}
          <div className="flex w-full justify-center mt-8">
            <button
              className="w-full text-white py-4 px-6 rounded-md transition hover:opacity-90 disabled:opacity-50 disabled:cursor-not-allowed text-lg font-medium"
              style={{ backgroundColor: '#2b5d45' }}
              onClick={handleSubmit}
              disabled={!name || !sellingPrice || !gst || !hsnCode}
            >
              Add Product
            </button>
          </div>
          
          {(!name || !sellingPrice || !gst || !hsnCode) && (
            <p className="text-sm text-center text-gray-500 mt-3">
              * Required fields: Name, HSN (4 digits), GST, Selling Price
            </p>
          )}
        </div>
      </div>
    </div>
  );
};

export default CreateProductPage;