import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router";
import api from "../utils/axios";


const ProductDetails = () => {
  const BASE_URL = import.meta.env.VITE_API_URL;
  const navigate = useNavigate();
  const { id } = useParams();
  const primaryColor = "#2b5d45";

  const fetchProduct = async () => {
    try {
      const result = await api.get("/products/" + id);
      setProduct(result.data);
    } catch(err) {
      console.error("Error fetching product details", err);
    }
  }

  useEffect(() => {
    fetchProduct();
  }, []);

  const [product, setProduct] = useState();
  const [showDeleteModal, setShowDeleteModal] = useState(false);

  const handleDelete = () => {
    // API call to delete product
    console.log("Deleting product:", product.id);
    navigate("/products");
  };

  if (!product) return null;

  return (
    <div className="p-6 max-w-6xl mx-auto">
      {/* Header with navigation */}
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center space-x-4">
          <button
            onClick={() => navigate("/products")}
            className="p-2 hover:bg-gray-100 rounded-lg transition"
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
            </svg>
          </button>
          <h1 className="text-2xl font-bold text-gray-800">Product Details</h1>
        </div>
        {/* <div className="flex space-x-3">
          <button
            onClick={() => navigate(`/products/${id}/edit`)}
            className="px-4 py-2 border rounded-lg text-sm font-medium hover:bg-gray-50 transition"
          >
            Edit Product
          </button>
          <button
            onClick={() => setShowDeleteModal(true)}
            className="px-4 py-2 bg-red-500 text-white rounded-lg text-sm font-medium hover:bg-red-600 transition"
          >
            Delete Product
          </button>
        </div> */}
      </div>

      {/* Main Content Card */}
      <div className="bg-white rounded-xl shadow-sm overflow-hidden">
        {/* Product Header with Image */}
        <div className="border-b border-gray-100 p-8">
          <div className="flex items-start gap-8">
            {/* Product Image */}
            <div className="w-48 h-48 bg-gray-50 rounded-xl overflow-hidden flex items-center justify-center flex-shrink-0">
              {product.img_url ? (
                <img
                  src={BASE_URL + "/uploads" + product.img_url}
                  alt={product.name}
                  className="w-full h-full object-cover"
                />
              ) : (
                <div className="text-center">
                  <div 
                    className="w-20 h-20 mx-auto rounded-full flex items-center justify-center text-3xl mb-2"
                    style={{ backgroundColor: `${primaryColor}15`, color: primaryColor }}
                  >
                    📦
                  </div>
                  <p className="text-gray-400 text-xs">No image</p>
                </div>
              )}
            </div>

            {/* Product Title Info */}
            <div className="flex-1">
              <div className="flex items-start justify-between">
                <div>
                  <h2 className="text-2xl font-bold text-gray-800 mb-2">{product.name}</h2>
                  <div className="flex items-center gap-3 mb-4">
                    <span 
                      className="inline-block px-3 py-1 rounded-full text-xs font-medium"
                      style={{ backgroundColor: `${primaryColor}15`, color: primaryColor }}
                    >
                      {product.category || "General"}
                    </span>
                  </div>
                </div>
                <span className="text-sm text-gray-400">ID: #{product.id}</span>
              </div>

              {/* Selling Price Display */}
              <div>
                <p className="text-sm text-gray-500 mb-1">Selling Price</p>
                <p 
                  className="text-3xl font-bold"
                  style={{ color: primaryColor }}
                >
                  ₹{product.selling_price?.toLocaleString()}
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Details Grid */}
        <div className="p-8">
          <h3 className="text-sm font-semibold text-gray-500 uppercase tracking-wider mb-6">
            Product Information
          </h3>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            <div className="flex items-start space-x-3">
              <span className="text-xl" style={{ color: primaryColor }}>💰</span>
              <div>
                <p className="text-xs text-gray-500 mb-1">MRP</p>
                <p className="font-medium text-gray-800">₹{product.mrp?.toLocaleString() || "N/A"}</p>
              </div>
            </div>

            <div className="flex items-start space-x-3">
              <span className="text-xl" style={{ color: primaryColor }}>📦</span>
              <div>
                <p className="text-xs text-gray-500 mb-1">Stock</p>
                <p className="font-medium text-gray-800">
                  {product.stock_quantity || 0} {product.unit || 'Nos'}
                </p>
              </div>
            </div>

            <div className="flex items-start space-x-3">
              <span className="text-xl" style={{ color: primaryColor }}>🏷️</span>
              <div>
                <p className="text-xs text-gray-500 mb-1">HSN Code</p>
                <p className="font-medium text-gray-800">{product.hsn_code || "Not specified"}</p>
              </div>
            </div>

            <div className="flex items-start space-x-3">
              <span className="text-xl" style={{ color: primaryColor }}>📊</span>
              <div>
                <p className="text-xs text-gray-500 mb-1">GST Rate</p>
                <p className="font-medium text-gray-800">{product.gst || 0}%</p>
              </div>
            </div>

            <div className="flex items-start space-x-3">
              <span className="text-xl" style={{ color: primaryColor }}>📏</span>
              <div>
                <p className="text-xs text-gray-500 mb-1">Unit</p>
                <p className="font-medium text-gray-800">{product.unit || "Nos"}</p>
              </div>
            </div>

            <div className="flex items-start space-x-3">
              <span className="text-xl" style={{ color: primaryColor }}>📁</span>
              <div>
                <p className="text-xs text-gray-500 mb-1">Category</p>
                <p className="font-medium text-gray-800">{product.category || "General"}</p>
              </div>
            </div>

            <div className="flex items-start space-x-3">
              <span className="text-xl" style={{ color: primaryColor }}>📅</span>
              <div>
                <p className="text-xs text-gray-500 mb-1">Created On</p>
                <p className="font-medium text-gray-800">
                  {new Date(product.created_at).toLocaleDateString('en-IN', {
                    day: 'numeric',
                    month: 'short',
                    year: 'numeric'
                  })}
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Delete Confirmation Modal */}
      {showDeleteModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-xl p-6 max-w-md w-full mx-4">
            <h3 className="text-lg font-semibold text-gray-800 mb-2">Delete Product</h3>
            <p className="text-gray-600 mb-6">
              Are you sure you want to delete {product.name}? This action cannot be undone.
            </p>
            <div className="flex space-x-3">
              <button
                onClick={() => setShowDeleteModal(false)}
                className="flex-1 px-4 py-2 border rounded-lg font-medium hover:bg-gray-50 transition"
              >
                Cancel
              </button>
              <button
                onClick={handleDelete}
                className="flex-1 px-4 py-2 bg-red-500 text-white rounded-lg font-medium hover:bg-red-600 transition"
              >
                Delete
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ProductDetails;