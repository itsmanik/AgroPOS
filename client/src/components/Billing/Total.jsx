import { Trash2, Scan, Printer, ArrowDown } from "lucide-react";
import Invoice from "../Invoice/Invoice";
import { useRef } from "react";

const Total = () => {
  const billRef = useRef(null);
  const handlePrint = () => {
    if (billRef.current) {
      billRef.current.handlePrint();
    }
  };

  return (
    <div className="border-l-2 px-5 text-nowrap py-2 flex flex-col justify-evenly items-center">
      <Invoice ref={billRef} />
      <div className="flex w-full justify-end">
        <span className="p-1 px-4">Sub Total:</span>
        <span className="flex border-2">
          <span className="w-20 p-1 px-2 outline-none">3420</span>
          <span className="p-1 border-l-2 min-w-7 flex justify-center">₹</span>
        </span>
      </div>
      <div className="flex w-full justify-end">
        <span className="p-1 px-4">Extra Disc:</span>
        <span className="flex border-2">
          <input
            type="number"
            className="w-20 p-1 px-2 outline-none"
            defaultValue={18}
          />
          <span className="p-1 border-l-2 min-w-7 flex justify-center">₹</span>
        </span>
      </div>
      <div className="flex justify-between w-full gap-2">
        <button className="text-red-900 flex-grow flex justify-center items-center border border-red-900 rounded p-1">
          <Trash2 size={14} />
          <span className="ml-1">Reset</span>
        </button>
        <button className="text-red-900 flex flex-grow justify-center items-center border border-red-900 rounded p-1">
          <ArrowDown size={14} />
          <span className="ml-1">Round</span>
        </button>
      </div>
      <div className="w-full">
        <button
          onClick={handlePrint}
          className="flex hover:bg-green-900 rounded w-full h-10 items-center justify-between bg-primary text-white text-center"
        >
          <span className="p-2 px-2 w-full text-center text-lg">8200.0</span>
          <span className="border-l-[2px] min-w-6 p-2 h-full flex items-center justify-center">
            <Printer size={22} className="" />
          </span>
        </button>
      </div>
    </div>
  );
};
export default Total;
