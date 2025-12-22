import ProductsList from "../components/ProductsList/ProductsList";
import Billing from "../components/Billing/Billing";
import PurchasingTable from "../components/PurchasingTable/PurchasingTable";
import { useState } from "react";

const Sales = () => {
  const [billingItems, setBillingItems] = useState([]);
  const addItemToBill = (product) => {
    setBillingItems((prevItems) => {
      return [...prevItems, product];
    });
  };

  const calculateTotal = () => {
    const subTotal = billingItems.reduce((sum, item) => sum + Number(item.mrp), 0);
    return subTotal;
  };

  return (
    <main className="grid my-6 mx-4 gap-4 gap-y-3 grid-cols-[6fr,10fr] grid-rows-[60%,40%] h-[82vh]">
      <ProductsList
        addItemToBill={addItemToBill}
        classname={"row-span-2 shadow bg-white rounded-lg"}
      />
      <PurchasingTable
        purchasingItems={billingItems}
        classname={"h-full flex flex-col"}
      />
      <Billing
        total={calculateTotal()}
        classname={"rounded-lg flex flex-col"}
      />
    </main>
  );
};
export default Sales;
