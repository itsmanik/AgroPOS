import ProductsList from "../components/ProductsList/ProductsList";
import Billing from "../components/Billing/Billing";
import PurchasingTable from "../components/PurchasingTable/PurchasingTable";

const Sales = () => {
  return (
    <main className="grid my-6 mx-4 gap-4 gap-y-3 grid-cols-[0.8fr,1fr] grid-rows-[50%,50%] h-[82vh]">
      <ProductsList classname={"row-span-2 shadow bg-white rounded-lg"} />
      <PurchasingTable classname={"h-full flex flex-col"} />
      <Billing classname={"bg-white rounded-lg"} />
    </main>
  );
};
export default Sales;
