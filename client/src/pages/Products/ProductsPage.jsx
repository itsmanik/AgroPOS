import FilteredProducts from "../../components/ProductsList/FilteredProducts";
import { Link } from "react-router";

const ProductsPage = () => {
  return (
    <div className="p-5 pt-10">
      {/* Buttons */}
      <Link to={"create"} className="inline-flex bg-white border-l-2 border-l-[#2B5D45] relative items-center py-8 rounded px-8 cursor-pointer shadow gap-5">
        <svg
          viewBox="0 0 576 512"
          className="h-11 w-11"
          fill="#2B5D45"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path d="m504.717 320h-293.145l6.545 32h268.418c15.401 0 26.816 14.301 23.403 29.319l-5.517 24.276c18.691 9.073 31.579 28.233 31.579 50.405 0 31.202-25.519 56.444-56.824 55.994-29.823-.429-54.35-24.631-55.155-54.447-.44-16.287 6.085-31.049 16.803-41.548h-209.648c10.377 10.166 16.824 24.327 16.824 40.001 0 31.813-26.528 57.431-58.67 55.938-28.54-1.325-51.751-24.385-53.251-52.917-1.158-22.034 10.436-41.455 28.051-51.586l-70.247-343.435h-69.883c-13.255 0-24-10.745-24-24v-16c0-13.255 10.745-24 24-24h102.529c11.401 0 21.228 8.021 23.513 19.19l9.166 44.81h392.782c15.401 0 26.816 14.301 23.403 29.319l-47.273 208c-2.483 10.927-12.197 18.681-23.403 18.681zm-96.717-152h-48v-40c0-8.837-7.163-16-16-16h-16c-8.837 0-16 7.163-16 16v40h-48c-8.837 0-16 7.163-16 16v16c0 8.837 7.163 16 16 16h48v40c0 8.837 7.163 16 16 16h16c8.837 0 16-7.163 16-16v-40h48c8.837 0 16-7.163 16-16v-16c0-8.837-7.163-16-16-16z" />
        </svg>
        <div>
          <h2 className="text-xl font-semibold text-gray-700">New Product</h2>
        </div>
        <span className="absolute right-0 bottom-0 bg-primary rounded-full h-10 w-10 text-2xl text-white flex justify-center items-center translate-x-[50%] translate-y-[30%]">
          +
        </span>
      </Link>
      {/* Products */}
      <div className="mt-10">
        <h2 className="text-xl font-bold text-gray-700 mb-2">All Products</h2>
        <FilteredProducts />
      </div>
    </div>
  );
};
export default ProductsPage;
