import { useState } from "react";

const CreateProductPage = () => {
  const [selectedCategory, setSelectedCategory] = useState("General");
  const [selectedUnit, setSelectedUnit] = useState("Kilograms");
  const [image, setImage] = useState(null);

  const categories = ["General", "Fertilizers", "Seeds", "Pesticides", "Tools", "Machinery"];
  const units = ["Kilograms", "Liters", "Packets", "Units"];

  const handleImageUpload = (event) => {
    const file = event.target.files[0];
    if (file) {
      setImage(URL.createObjectURL(file));
    }
  };

  return (
    <div className="mb-10">
      <h2 className="text-2xl text-gray-700 pt-5 px-7 font-bold mb-6">Add a new product</h2>
      <div className="bg-gray-100">
        <div className="bg-white p-8 rounded-lg shadow-md mx-8">
          <h2 className="text-xl font-semibold text-green-900 mb-6">General Information</h2>
          <div className="grid px-4 grid-cols-1 md:grid-cols-2 gap-6 mb-8">
            <div>
              <label className="block text-gray-700">Name</label>
              <input type="text" placeholder="Enter name" className="w-full mt-1 p-2 border border-gray-300 rounded-md" />
            </div>
            <div>
              <label className="block text-gray-700">Nick Name</label>
              <input type="text" placeholder="Enter nick name" className="w-full mt-1 p-2 border border-gray-300 rounded-md" />
            </div>
            <div>
              <label className="block text-gray-700">Brand Name</label>
              <input type="text" placeholder="Enter brand name" className="w-full mt-1 p-2 border border-gray-300 rounded-md" />
            </div>
            <div>
              <label className="block text-gray-700">Category</label>
              <select value={selectedCategory} onChange={(e) => setSelectedCategory(e.target.value)} className="w-full mt-1 p-2 border border-gray-300 rounded-md">
                {categories.map((category) => (
                  <option key={category} value={category}>{category}</option>
                ))}
              </select>
            </div>
            <div>
              <label className="block text-gray-700">Unit</label>
              <select value={selectedUnit} onChange={(e) => setSelectedUnit(e.target.value)} className="w-full mt-1 p-2 border border-gray-300 rounded-md">
                {units.map((unit) => (
                  <option key={unit} value={unit}>{unit}</option>
                ))}
              </select>
            </div>  
            <div className="flex items-center gap-4">
              {image && <img src={image} alt="Uploaded" className="h-24 w-24 object-cover rounded-md" />}
              <label className="p-2 border-2 w-full border-dashed border-green-900 text-green-900 rounded-md text-center cursor-pointer text-sm">
                Upload
                <input type="file" accept="image/*" onChange={handleImageUpload} className="hidden" />
              </label>
            </div>
          </div>
          <h2 className="text-xl font-semibold text-green-900 mb-6">Pricing and GST</h2>
          <div className="grid px-4 grid-cols-1 md:grid-cols-2 gap-6 mb-8">
            <div>
              <label className="block text-gray-700">Maximum Retail Price</label>
              <input type="text" placeholder="Enter MRP" className="w-full mt-1 p-2 border border-gray-300 rounded-md" />
            </div>
            <div className="grid grid-cols-3 gap-6">
              <div>
                <label className="block text-gray-700">CGST</label>
                <input type="text" placeholder="%" className="w-full mt-1 p-2 border border-gray-300 rounded-md" />
              </div>
              <div>
                <label className="block text-gray-700">SGST</label>
                <input type="text" placeholder="%" className="w-full mt-1 p-2 border border-gray-300 rounded-md" />
              </div>
              <div>
                <label className="block text-gray-700">IGST</label>
                <input type="text" placeholder="%" className="w-full mt-1 p-2 border border-gray-300 rounded-md" />
              </div>
            </div>
            <div>
              <label className="block text-gray-700">Selling Price</label>
              <input type="text" placeholder="Enter Selling Price" className="w-full mt-1 p-2 border border-gray-300 rounded-md" />
            </div>
            <div>
              <label className="block text-gray-700">HSN Code</label>
              <input type="text" placeholder="Enter HSN" className="w-full mt-1 p-2 border border-gray-300 rounded-md" />
            </div>
          </div>
          <div className="flex w-full justify-center">
            <button className="bg-green-900 w-full text-white py-3 px-6 rounded-md">Add Product</button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CreateProductPage;
