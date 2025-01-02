import ProductsList from "../components/ProductsList/ProductsList";
import Billing from "../components/Billing/Billing";
import PurchasingTable from "../components/PurchasingTable/PurchasingTable";

const Sales = () => {
  return (
    <main className="grid my-6 mx-4 gap-4 gap-y-3 grid-cols-2 grid-rows-2 h-[82vh]">
      <ProductsList classname={"row-span-2 shadow-md bg-white rounded-lg"} />
      <PurchasingTable classname={"shadow-md bg-white rounded-lg"}/>
      <Billing classname={"shadow-md flex-1 bg-white rounded-lg"}/>
    </main>
  );
};
export default Sales;
