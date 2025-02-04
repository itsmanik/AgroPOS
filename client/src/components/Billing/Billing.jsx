import QRCode from "react-qr-code";
import Total from "./Total";
import CustomerInfo from "./CustomerInfo";

const Billing = ({ classname }) => {
  return (
    <div className={classname}>
      <h2 className="text-xl font-bold text-gray-700 mb-2">Billing</h2>
      <div className="rounded-md bg-white p-4 shadow grid grid-cols-[2fr,2fr,1fr] grid-rows-1 h-full overflow-hidden">
        <div className="border-r-2 flex-grow">
          <CustomerInfo />
        </div>
        <div className="overflow-hidden">
          <QRCode
            className="h-full w-full p-3"
            value="upi://pay?pa=nehamaravanthe@okicici&pn=VE&am=8200&cu=INR"
            fgColor="#2e2e2e"
          />
        </div>
        <Total />
      </div>
    </div>
  );
};
export default Billing;
