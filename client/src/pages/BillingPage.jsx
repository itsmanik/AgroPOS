import ProductsList from "../components/ProductsList/ProductsList";
import Billing from "../components/Billing/Billing";
import PurchasingTable from "../components/PurchasingTable/PurchasingTable";
import { useState, useRef } from "react";
import api from "../utils/axios";

const BillingPage = () => {
  const [billingItems, setBillingItems] = useState([]);
  const [extraDiscount, setExtraDiscount] = useState(0);
  const billRef = useRef(null);

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

const handlePrint = (payload) => {
  if (!payload) return;

  const { customer, items, summary } = payload;

  // Formatting separators
  const divider = "-----------------------------------";
  const thickDivider = "=================================";

  // Header Section
  let msg = `🏪 *SHREE VEERBHADRESHWAR DISTRIBUTORS*\n`;
  msg += `📍 Opp SBI Bank, Gunj Road Kalburgi - 585 104\n`;
  msg += `📞 +91 98765 43210\n`; 
  msg += `🔖 GST: 29ACPPH9544K2ZS\n`;
  msg += `${thickDivider}\n`;
  msg += `            *TAX INVOICE*\n`;
  msg += `${thickDivider}\n\n`;

  // Invoice & Customer Info
  msg += `🧾 *INV NO:* #${summary.invoice_no || '23'}\n`;
  msg += `📅 *DATE:* ${new Date().toLocaleDateString("en-IN")}\n`;
  msg += `👤 *CUST:* ${(customer?.name || "Walk-in").toUpperCase()}\n`;
  if (customer?.phone_number) {
    msg += `📱 *CELL:* ${customer.phone_number}\n`;
  }
  
  msg += `\n📦 *ORDER DETAILS*\n`;
  msg += `${divider}\n`;

  // Item List
  items.forEach((item, index) => {
    const qty = Number(item.qty || 0);
    const rate = Number(item.selling_price || item.rate || 0);
    const gstPercent = Number(item.gst || item.gst_percent || 18);
    const lineTotal = (qty * rate * (1 + gstPercent / 100)).toFixed(2);

    msg += `${index + 1}. *${item.name.toUpperCase()}*\n`;
    if (item.hsn_code) {
      msg += `   HSN: ${item.hsn_code}\n`;
    }
    msg += `   ${qty} ${item.unit || 'Nos'} x ₹${rate.toFixed(2)} (+${gstPercent}%)\n`;
    msg += `   *Amount: ₹${lineTotal}*\n\n`;
  });

  msg += `${divider}\n`;
  
  // Financial Summary
  const grandTotal = Number(summary.grand_total || 0);
  const cgst = Number(summary.cgst_amount || 0);
  const sgst = Number(summary.sgst_amount || 0);
  
  msg += `Subtotal  : ₹${Number(summary.subtotal || 0).toFixed(2)}\n`;
  if (cgst > 0) {
    msg += `CGST (9%) : ₹${cgst.toFixed(2)}\n`;
    msg += `SGST (9%) : ₹${sgst.toFixed(2)}\n`;
  }
  msg += `GST Total : ₹${(cgst + sgst).toFixed(2)}\n`;
  msg += `${thickDivider}\n`;
  msg += `💰 *GRAND TOTAL: ₹${grandTotal.toFixed(2)}*\n`;
  msg += `${thickDivider}\n\n`;
  
  msg += `💳 *Payment:* ${(summary.payment_mode || "CASH").toUpperCase()}\n\n`;
  msg += `🙏 *THANK YOU! VISIT AGAIN!* 🙏`;

  // Send Logic using your preferred link style
  const phone = customer?.phone_number?.replace(/\D/g, "");
  if (phone) {
    const encodedMsg = encodeURIComponent(msg);
    const link = `https://api.whatsapp.com/send?phone=91${phone}&text=${encodedMsg}`;
    window.open(link, "_blank");
  } else {
    alert("Phone number missing!");
  }
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
    handlePrint(billPayload);
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
export default BillingPage;
