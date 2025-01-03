import QRCode from "react-qr-code";
import {Trash2,Scan} from "lucide-react";

const Billing = ({ classname }) => {
  return (
    <div className={classname}>
      <h2 className="text-xl font-bold text-gray-700 mb-2">Billing</h2>
      <div className="rounded-md bg-white p-4 shadow flex h-full overflow-hidden">
        <div className="grid flex-grow grid-cols-2 grid-rows-[1fr,auto,auto] gap-1 p-2 mr-4">
          <div className="col-span-2 flex justify-center pb-1 flex-col items-center overflow-hidden">
            <QRCode
              className="flex-grow"
              value="upi://pay?pa=nehamaravanthe@okicici&pn=VE&am=8200&cu=INR"
              fgColor="#2e2e2e"
            />
          </div>
          <button className="text-red-900 flex justify-center items-center border border-red-900 rounded p-1">
            <Trash2 size={14}/><span className="ml-1">Reset</span>
          </button>
          <button className="text-red-900 flex justify-center items-center border border-red-900 rounded p-1">
            <Scan size={14} /><span className="ml-1">OR Code</span>
          </button>
          <button className="text-white bg-primary p-2 col-span-2 rounded">
            Print & Pay
          </button>
        </div>
        <div className="border-l-2 px-5 text-nowrap py-2 flex flex-col justify-evenly items-center">
          <div className="flex w-full justify-end">
            <span className="p-1 px-4">Sub Total:</span>
            <span className="flex border-2">
              <input
                type="number"
                className="w-20 p-1 px-2 outline-none"
                defaultValue={3420}
              />
              <span className="p-1 border-l-2 min-w-7 flex justify-center">
                ₹
              </span>
            </span>
          </div>
          <div className="flex w-full justify-end">
            <span className="p-1 px-4">9% SGST:</span>
            <span className="flex border-2">
              <input
                type="number"
                className="w-20 p-1 px-2 outline-none"
                defaultValue={18}
              />
              <span className="p-1 border-l-2 min-w-7 flex justify-center">
                ₹
              </span>
            </span>
          </div>
          <div className="flex w-full justify-end">
            <span className="p-1 px-4">9% CGST:</span>
            <span className="flex border-2">
              <input
                type="number"
                className="w-20 p-1 px-2 outline-none"
                defaultValue={18}
              />
              <span className="p-1 border-l-2 min-w-7 flex justify-center">
                ₹
              </span>
            </span>
          </div>
          <div className="flex w-full justify-end">
            <span className="p-1 px-4">1% IGST:</span>
            <span className="flex border-2">
              <input
                type="number"
                className="w-20 p-1 px-2 outline-none"
                defaultValue={1}
              />
              <span className="p-1 border-l-2 min-w-7 flex justify-center">
                ₹
              </span>
            </span>
          </div>
          <div className="flex w-full justify-end items-center">
            <span className="p-1 px-4 font-bold">TOTAL:</span>
            <span className="flex border-2 bg-primary text-white text-center">
              <span className="w-20 p-1 px-2 font-bold text-lg">8200.0</span>
              <span className="p-1 border-l-2 min-w-7 flex justify-center text-lg">
                ₹
              </span>
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};
export default Billing;
