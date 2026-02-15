import PurchasingTableItem from "../UI/PurchasingTableItem";

const PurchasingTable = ({ classname, purchasingItems, changeUnitPrice }) => {
  return (
    <div className={classname}>
      <h2 className="text-xl font-bold text-gray-700 mb-2">Purchasing</h2>
      <div className="rounded-md bg-white overflow-scroll overflow-x-hidden p-3 shadow flex-grow">
        <div className="bg-primary text-white grid grid-cols-[2rem,1fr,5rem,5rem,5rem,5rem,5rem,5rem,5rem,2rem] grid-rows-1 rounded-lg px-2 text-sm">
          <span className="p-2">No</span>
          <span className="p-2 border-l border-white">Name</span>
          <span className="p-2 border-l border-white">HSN</span>
          <span className="p-2 border-l border-white">Rate</span>
          <span className="p-2 border-l border-white">Qty</span>
          <span className="p-2 border-l border-white">Taxable</span>
          <span className="p-2 border-l border-white">GST</span>
          <span className="p-2 border-l border-white">Disc</span>
          <span className="p-2 border-l border-white">Total</span>
        </div>
        <div className="flex flex-col gap-1 mt-2">
          {purchasingItems.map((item, index) => {
            return <PurchasingTableItem key={index} id={item.id} slNo={index + 1} hsn={item.hsn_code} name={item.name} sp={item.selling_price} mrp={item.mrp} gst={item.gst} qty={item.qty} changeUnitPrice={changeUnitPrice} />
          })}
        </div>
      </div>
    </div>
  );
};
export default PurchasingTable;
