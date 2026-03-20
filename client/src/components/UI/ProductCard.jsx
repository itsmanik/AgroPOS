const ProductCard = ({ classname, name, imgUrl, price, onClick }) => {
  return (
    <div
      className={`${classname} flex cursor-pointer flex-col items-center border rounded-lg bg-primary shadow-lg`}
      onClick={onClick}
    >
      <div className="w-full h-full">
        <img
          src={
            imgUrl ||
            "https://placehold.co/400x400/f8fafc/94a3b8?text=+No Image"
          }
          className="h-full w-full object-cover rounded-t-lg"
          alt="Product Image"
        />
      </div>
      <div className="p-3 text-center text-white">
        <h2 className="mb-2 text-xs">{name}</h2>
        <span className="border-white border rounded px-3 py-[4px] text-xs">
          ₹{price}
        </span>
      </div>
    </div>
  );
};

export default ProductCard;
