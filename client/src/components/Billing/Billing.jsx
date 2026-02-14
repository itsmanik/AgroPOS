/* eslint-disable no-unused-vars */
import QRCode from "react-qr-code";
import Total from "./Total";
import CustomerInfo from "./CustomerInfo";

const Billing = ({ classname, total, extraDiscount, setExtraDiscount, overrideTotal, setOverrideTotal }) => {
  return (
    <div className={classname}>
      <h2 className="text-xl font-bold text-gray-700 mb-2">Billing</h2>
      <div className="rounded-md flex flex-col justify-between bg-white p-4 shadow h-full overflow-hidden">
        <div className="border-r-2 flex-grow">
          <CustomerInfo />
        </div>
        {/* <div className="overflow-hidden">
          <QRCode
            className="h-full w-full p-3"
            value={`upi://pay?pa=nehamaravanthe@okicici&pn=VE&am=${total}&cu=INR`}
            fgColor="#2e2e2e"
          />
        </div> */}
        <Total extraDiscount={extraDiscount} setExtraDiscount={setExtraDiscount} total={total} />
      </div>
    </div>
  );
};
export default Billing;
