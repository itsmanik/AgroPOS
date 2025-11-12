import { useState } from "react";
import api from "../../utils/axios";

const CreateProductPage = () => {
  const [name, setName] = useState("");
  const [nickname, setNickname] = useState("");
  const [brandName, setBrandName] = useState("");
  const [mrp, setMrp] = useState("");
  const [cgst, setCgst] = useState("");
  const [sgst, setSgst] = useState("");
  const [igst, setIgst] = useState("");
  const [sellingPrice, setSellingPrice] = useState("");
  const [hsnCode, setHsnCode] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("General");
  const [selectedUnit, setSelectedUnit] = useState("Kilograms");
  const [image, setImage] = useState(null);

  const categories = [
    "General",
    "Fertilizers",
    "Seeds",
    "Pesticides",
    "Tools",
    "Machinery",
  ];
  const units = ["Kilograms", "Liters", "Packets", "Units"];

  const handleImageUpload = (event) => {
    const file = event.target.files[0];
    if (file) {
      setImage(file);
    }
  };

  const handleSubmit = async () => {
    const formData = new FormData();
    formData.append("name", name);
    formData.append("nickname", nickname);
    formData.append("brand_name", brandName);
    formData.append("category", selectedCategory);
    formData.append("unit", selectedUnit);
    formData.append("mrp", mrp);
    formData.append("cgst", cgst);
    formData.append("sgst", sgst);
    formData.append("igst", igst);
    formData.append("selling_price", sellingPrice);
    formData.append("hsn_code", hsnCode);
    if (image) {
      formData.append("image", image);
    }
    try {
      const response = await api.post("/products/", formData);
      console.log(response.data);
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div className="mb-10">
      <h2 className="text-2xl text-gray-700 pt-5 px-7 font-bold mb-6">
        Add a new product
      </h2>
      <div className="bg-gray-100">
        <div className="bg-white p-8 rounded-lg shadow-md mx-8">
          <h2 className="text-xl font-semibold text-green-900 mb-6">
            General Information
          </h2>
          <div className="grid px-4 grid-cols-1 md:grid-cols-2 gap-6 mb-8">
            <div>
              <label className="block text-gray-700">Name</label>
              <input
                type="text"
                placeholder="Enter name"
                className="w-full mt-1 p-2 border border-gray-300 rounded-md"
                value={name}
                onChange={(e) => setName(e.target.value)}
              />
            </div>
            <div>
              <label className="block text-gray-700">Nick Name</label>
              <input
                type="text"
                placeholder="Enter nick name"
                className="w-full mt-1 p-2 border border-gray-300 rounded-md"
                value={nickname}
                onChange={(e) => setNickname(e.target.value)}
              />
            </div>
            <div>
              <label className="block text-gray-700">Brand Name</label>
              <input
                type="text"
                placeholder="Enter brand name"
                className="w-full mt-1 p-2 border border-gray-300 rounded-md"
                value={brandName}
                onChange={(e) => setBrandName(e.target.value)}
              />
            </div>
            <div>
              <label className="block text-gray-700">Category</label>
              <select
                value={selectedCategory}
                onChange={(e) => setSelectedCategory(e.target.value)}
                className="w-full mt-1 p-2 border border-gray-300 rounded-md"
              >
                {categories.map((category) => (
                  <option key={category} value={category}>
                    {category}
                  </option>
                ))}
              </select>
            </div>
            <div>
              <label className="block text-gray-700">Unit</label>
              <select
                value={selectedUnit}
                onChange={(e) => setSelectedUnit(e.target.value)}
                className="w-full mt-1 p-2 border border-gray-300 rounded-md"
              >
                {units.map((unit) => (
                  <option key={unit} value={unit}>
                    {unit}
                  </option>
                ))}
              </select>
            </div>
            <div className="flex items-center gap-4">
              {image && (
                <img
                  src={image}
                  alt="Uploaded"
                  className="h-24 w-24 object-cover rounded-md"
                />
              )}
              <label className="p-2 border-2 w-full border-dashed border-green-900 text-green-900 rounded-md text-center cursor-pointer text-sm">
                Upload
                <input
                  type="file"
                  accept="image/*"
                  onChange={handleImageUpload}
                  className="hidden"
                />
              </label>
            </div>
          </div>
          <h2 className="text-xl font-semibold text-green-900 mb-6">
            Pricing and GST
          </h2>
          <div className="grid px-4 grid-cols-1 md:grid-cols-2 gap-6 mb-8">
            <div>
              <label className="block text-gray-700">
                Maximum Retail Price
              </label>
              <input
                type="text"
                placeholder="Enter MRP"
                className="w-full mt-1 p-2 border border-gray-300 rounded-md"
                value={mrp}
                onChange={(e) => setMrp(e.target.value)}
              />
            </div>
            <div className="grid grid-cols-3 gap-6">
              <div>
                <label className="block text-gray-700">CGST</label>
                <input
                  type="text"
                  placeholder="%"
                  className="w-full mt-1 p-2 border border-gray-300 rounded-md"
                  value={cgst}
                  onChange={(e) => setCgst(e.target.value)}
                />
              </div>
              <div>
                <label className="block text-gray-700">SGST</label>
                <input
                  type="text"
                  placeholder="%"
                  className="w-full mt-1 p-2 border border-gray-300 rounded-md"
                  value={sgst}
                  onChange={(e) => setSgst(e.target.value)}
                />
              </div>
              <div>
                <label className="block text-gray-700">IGST</label>
                <input
                  type="text"
                  placeholder="%"
                  className="w-full mt-1 p-2 border border-gray-300 rounded-md"
                  value={igst}
                  onChange={(e) => setIgst(e.target.value)}
                />
              </div>
            </div>
            <div>
              <label className="block text-gray-700">Selling Price</label>
              <input
                type="text"
                placeholder="Enter Selling Price"
                className="w-full mt-1 p-2 border border-gray-300 rounded-md"
                value={sellingPrice}
                onChange={(e) => setSellingPrice(e.target.value)}
              />
            </div>
            <div>
              <label className="block text-gray-700">HSN Code</label>
              <input
                type="text"
                placeholder="Enter HSN"
                className="w-full mt-1 p-2 border border-gray-300 rounded-md"
                value={hsnCode}
                onChange={(e) => setHsnCode(e.target.value)}
              />
            </div>
          </div>
          <div className="flex w-full justify-center">
            <button
              className="bg-green-900 w-full text-white py-3 px-6 rounded-md"
              onClick={handleSubmit}
            >
              Add Product
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CreateProductPage;
