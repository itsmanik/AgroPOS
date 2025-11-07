import { Search } from "lucide-react";
import ProductCard from "../UI/ProductCard";
import { useState, useRef, useEffect } from "react";
import api from "../../utils/axios";

const ProductsList = ({ classname }) => {
  const [searchText, setSearchText] = useState("");
  const [products, setProducts] = useState([]);
  const scrollableProductsDivRef = useRef();

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await api.get("/inventory/products/");
        setProducts(response.data);
        console.log(response.data);
      } catch {
        console.log("Error fetching products");
      }
    }
    fetchProducts();
  }, []);

  const scrollToTop = () => {
    scrollableProductsDivRef.current.scrollTop = 0;
  }

  const filteredProducts = products.filter((product) => {
    return (
      product.name.toLowerCase().includes(searchText) ||
      product.price.toString().includes(searchText)
    );
  });

  return (
    <div className={`${classname} p-4 flex flex-col`}>
      {/* Search Bar */}
      <div className="flex justify-between rounded-md">
        <input
          type="text"
          value={searchText}
          onChange={(e) => {
            setSearchText(e.target.value.toLowerCase());
            scrollToTop();
          }}
          placeholder="Search by name or price"
          className="border-2 w-full px-2 rounded-l-md border-r-0 py-1 outline-primary"
        />
        <button className="bg-primary text-white px-2 min-h-full min-w-10 py-1 rounded-r-md flex items-center justify-center">
          <Search size={20} />
        </button>
      </div>
      {/* Products */}
      <div className="grid grid-cols-[1fr,1fr] gap-2 p-2 my-4 overflow-y-scroll" ref={scrollableProductsDivRef}>
        {filteredProducts.length > 0 ? filteredProducts.map((product, index) => {
          return (
            <ProductCard
              key={index}
              name={product.name}
              imgUrl={product.image}
              price={product.selling_price}
            />
          );
        }) : <span className="text-sm">No products found</span>}
      </div>
    </div>
  );
};
export default ProductsList;
