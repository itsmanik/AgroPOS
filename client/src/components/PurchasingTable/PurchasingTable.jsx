import PurchasingTableItem from "../UI/PurchasingTableItem";

const PurchasingTable = ({ classname, purchasingItems }) => {
  return (
    <div className={classname}>
      <h2 className="text-xl font-bold text-gray-700 mb-2">Purchasing</h2>
      <div className="rounded-md bg-white overflow-scroll overflow-x-hidden p-3 shadow flex-grow">
        <div className="bg-primary text-white grid grid-cols-[2rem,1fr,4rem,3.5rem,3.5rem,3.5rem,3rem,4rem,4rem,2rem] grid-rows-1 rounded-lg px-2 text-sm">
          <span className="p-2">No</span>
          <span className="p-2 border-l border-white">Product</span>
          <span className="p-2 border-l border-white">Cost</span>
          <span className="p-2 border-l border-white">CGST</span>
          <span className="p-2 border-l border-white">SGST</span>
          <span className="p-2 border-l border-white">IGST</span>
          <span className="p-2 border-l border-white">Qty</span>
          <span className="p-2 border-l border-white">Disc</span>
          <span className="p-2 border-l border-white">Total</span>
        </div>
        <div className="flex flex-col gap-1 mt-2">
          {purchasingItems.map((item, index) => {
            return <PurchasingTableItem key={index} slNo={index + 1} name={item.name} mrp={item.mrp} cgst={item.cgst} sgst={item.sgst} igst={item.igst} />
          })}
        </div>
      </div>
    </div>
  );
};
export default PurchasingTable;
