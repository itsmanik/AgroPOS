import PurchasingTableItem from "../UI/PurchasingTableItem";

const PurchasingTable = ({ classname }) => {
  return (
    <div className={classname}>
      <h2 className="text-xl font-bold text-gray-700 mb-2">Purchasing</h2>
      <div className="rounded-md bg-white overflow-scroll overflow-x-hidden p-3 shadow flex-grow">
        <div className="bg-primary text-white grid grid-cols-[0.6fr,3fr,1fr,1fr,1fr,0.5fr] grid-rows-1 rounded-lg px-2 text-sm">
          <span className="p-2">No</span>
          <span className="p-2 border-l border-white">Product</span>
          <span className="p-2 border-l border-white">Cost</span>
          <span className="p-2 border-l border-white">Qty</span>
          <span className="p-2 border-l border-white">Total</span>
        </div>
        <div className="flex flex-col gap-1 mt-2">
          <PurchasingTableItem
            slNo={1}
            name="Honda GX160 Engine"
            price={4500}
            quantity={2}
            subTotal={9000}
          />
          <PurchasingTableItem
            slNo={2}
            name="Centrifugal Water Pump"
            price={3200}
            quantity={1}
            subTotal={3200}
          />
          <PurchasingTableItem
            slNo={3}
            name="12V Lead Acid Battery"
            price={1500}
            quantity={5}
            subTotal={7500}
          />
          <PurchasingTableItem
            slNo={4}
            name="Portable Chemical Sprayer"
            price={3200}
            quantity={2}
            subTotal={6400}
          />
          <PurchasingTableItem
            slNo={5}
            name="Agricultural Greenhouse Net"
            price={800}
            quantity={10}
            subTotal={8000}
          />
          <PurchasingTableItem
            slNo={6}
            name="Tractor Battery (12V)"
            price={2200}
            quantity={3}
            subTotal={6600}
          />
          <PurchasingTableItem
            slNo={7}
            name="Hydraulic Cylinder"
            price={7000}
            quantity={1}
            subTotal={7000}
          />
          <PurchasingTableItem
            slNo={8}
            name="PTO Shaft for Tractor"
            price={2500}
            quantity={2}
            subTotal={5000}
          />
          <PurchasingTableItem
            slNo={9}
            name="Steel Plow Disc"
            price={1200}
            quantity={4}
            subTotal={4800}
          />
          <PurchasingTableItem
            slNo={10}
            name="Genuine Tractor Parts Set"
            price={5000}
            quantity={1}
            subTotal={5000}
          />
          <PurchasingTableItem
            slNo={11}
            name="Plastic Plant Pots (Set of 10)"
            price={300}
            quantity={15}
            subTotal={4500}
          />
          <PurchasingTableItem
            slNo={12}
            name="Agricultural Fertilizer (50kg)"
            price={2500}
            quantity={8}
            subTotal={20000}
          />
        </div>
      </div>
    </div>
  );
};
export default PurchasingTable;
