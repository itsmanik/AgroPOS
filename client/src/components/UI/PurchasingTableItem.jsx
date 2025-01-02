import { CircleX } from "lucide-react";

const PurchasingTableItem = ({ slNo, name, price, quantity, subTotal }) => {
  return (
    <div className="grid grid-cols-[0.6fr,3fr,1fr,1fr,1fr,0.5fr] bg-white shadow px-2 rounded-md">
      <span className="px-2 py-1">{slNo}</span>
      <span className="px-2 py-1 border-l">{name}</span>
      <span className="px-2 py-1 border-l">{price}</span>
      <span className="px-2 py-1 border-l h-full w-full">
        <input
          type="number"
          className="w-full outline-none bg-inherit"
          defaultValue={quantity}
          min={1}
        />
      </span>
      <span className="px-2 py-1 border-l">{subTotal}</span>
      <span className="pl-2 py-1 border-l"><button className="h-full w-full flex justify-center items-center"><CircleX color="#8f0b0b" size={18} /></button></span>
    </div>
  );
};
export default PurchasingTableItem;
