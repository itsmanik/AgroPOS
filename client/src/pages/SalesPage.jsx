import ProductsList from "../components/ProductsList/ProductsList";
import Billing from "../components/Billing/Billing";
import PurchasingTable from "../components/PurchasingTable/PurchasingTable";
import { useState } from "react";
import api from "../utils/axios";

const Sales = () => {
  const [billingItems, setBillingItems] = useState([]);
  const [extraDiscount, setExtraDiscount] = useState(0);

  const addItemToBill = (product) => {
    setBillingItems((prevItems) => {
      const existingItem = prevItems.find((item) => {
        return item.id === product.id;
      });
      if (existingItem) {
        return prevItems.map((item) => {
          if (item.id === product.id) {
            return { ...item, qty: item.qty + 1 };
          } else {
            return item;
          }
        });
      } else {
        return [...prevItems, { ...product, qty: 1 }];
      }
    });
  };

  const changeUnitPrice = (id, price) => {
    console.log("running");
    setBillingItems((prevItems) => {
      return prevItems.map((item) => {
        if (item.id == id) {
          return { ...item, selling_price: price };
        } else {
          return item;
        }
      });
    });
  };

  // Use memo recommended, learn that later and implement
  const calculateTotal = () => {
    const total = billingItems.reduce((sum, item) => {
      const taxable = item.selling_price * item.qty;
      const gstAmount = (taxable * item.gst) / 100;
      const total = taxable + gstAmount;
      return sum + total;
    }, 0);
    return total - extraDiscount;
  };

  const sendBill = async (
    name,
    phoneNumber,
    location,
    subtotal,
    totalGST,
    extraDiscount,
    grandTotal,
    paymentMode
  ) => {
    const billPayload = {
      customer: {
        name: name,
        phone_number: phoneNumber,
        address: location,
      },
      items: billingItems,
      summary: {
        subtotal: subtotal,
        cgst_amount: (totalGST / 2).toFixed(2),
        sgst_amount: (totalGST / 2).toFixed(2),
        igst_amount: 0,
        discount: extraDiscount,
        grand_total: grandTotal,
        payment_mode: paymentMode,
      },
    };
    try {
      const response = await api.post("/sales", billPayload);
      console.log(response.data);
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <main className="grid my-6 mx-4 gap-4 gap-y-3 grid-cols-[10fr,6fr] grid-rows-[60%,40%] h-[82vh]">
      <ProductsList
        addItemToBill={addItemToBill}
        classname={"row-span-1 col-span-1 shadow bg-white rounded-lg"}
      />
      <Billing
        total={calculateTotal()}
        extraDiscount={extraDiscount}
        setExtraDiscount={setExtraDiscount}
        classname={"rounded-lg flex flex-col"}
        billingItems={billingItems}
        sendBill={sendBill}
      />
      <PurchasingTable
        purchasingItems={billingItems}
        classname={"h-full col-span-2 flex flex-col"}
        changeUnitPrice={changeUnitPrice}
      />
    </main>
  );
};
export default Sales;
