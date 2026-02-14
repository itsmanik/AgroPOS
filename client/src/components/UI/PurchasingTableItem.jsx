import { CircleX } from "lucide-react";

const PurchasingTableItem = ({ slNo, hsn, name, sp, mrp, gst, qty }) => {
  const taxable = sp * qty;
  const gst_amount = (taxable * gst) / 100;
  const total = taxable + gst_amount;
  return (
    <div className="grid grid-cols-[2rem,1fr,5rem,5rem,5rem,5rem,5rem,5rem,5rem,2rem] bg-white shadow px-2 rounded-md">
      <span className="px-2 py-1">{slNo}</span>
      <span className="px-2 py-1 border-l">{name}</span>
      <span className="px-2 py-1 border-l">{hsn}</span>
      <span className="px-2 py-1 border-l">{sp}</span>
      
      {/* CGST column - shows both rate and dummy amount */}
      <span className="px-2 py-1 border-l">{qty}</span>
      
      {/* SGST column - shows both rate and dummy amount */}
      <span className="px-2 py-1 border-l">{taxable}</span>
      
      {/* IGST column - shows both rate and dummy amount */}
      <span className="px-2 py-1 border-l flex flex-col items-start">
        <span className="text-xs text-gray-500">{gst}%</span>
        <span className="text-sm font-medium">{gst_amount.toFixed(2)}</span>
      </span>
      
      
      <span className="px-2 py-1 border-l h-full w-full">
        <input
          type="number"
          className="w-full outline-none bg-inherit"
          defaultValue={0}
          min={1}
        />
      </span>
      
      <span className="px-2 py-1 border-l">{total}</span>
      
      <span className="pl-2 py-1 border-l">
        <button className="h-full w-full flex justify-center items-center hover:bg-gray-100 rounded transition-colors">
          <CircleX color="#8f0b0b" size={18} />
        </button>
      </span>
    </div>
  );
};

export default PurchasingTableItem;