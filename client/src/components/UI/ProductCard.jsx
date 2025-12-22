import PropTypes from "prop-types";

const ProductCard = ({ classname, name, imgUrl, price, onClick }) => {
  return (
    <div
      className={`${classname} flex cursor-pointer flex-col items-center border rounded-lg bg-primary shadow-lg`}
    >
      <div className="w-full h-full" onClick={onClick}>
        <img src={imgUrl} className="h-full w-fullobject-cover rounded-t-lg" alt="Product Image" />
      </div>
      <div className="p-3 text-center text-white">
        <h2 className="mb-2">{name}</h2>
        <span className="border-white border rounded px-3 py-[4px] text-[13px]">
          ₹{price}
        </span>
      </div>
    </div>
  );
};

ProductCard.propTypes = {
  classname: PropTypes.string,
  name: PropTypes.string,
  imgUrl: PropTypes.string,
  price: PropTypes.string
}

export default ProductCard;
