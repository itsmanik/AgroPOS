// import React, {
//   useRef,
//   useState,
//   forwardRef,
//   useImperativeHandle,
// } from "react";

// const Invoice = forwardRef((props, ref) => {
//   const [showBill, setShowBill] = useState(false);

//   const enterFullScreen = () => {
//     const elem = document.documentElement;
//     if (elem.requestFullscreen) {
//       elem.requestFullscreen();
//     } else if (elem.mozRequestFullScreen) {
//       elem.mozRequestFullScreen();
//     } else if (elem.webkitRequestFullscreen) {
//       elem.webkitRequestFullscreen();
//     } else if (elem.msRequestFullscreen) {
//       elem.msRequestFullscreen();
//     }
//   };

//   useImperativeHandle(ref, () => ({
//     handlePrint: () => {
//       console.log("test");
//       handlePrint();
//     },
//   }));

//   const handlePrint = () => {
//     setShowBill(true); // Show the bill before printing
//     setTimeout(() => {
//       window.print();
//       setShowBill(false); // Hide the bill after printing
//     }, 500);
//     setTimeout(() => enterFullScreen(), 1000);
//   };

//   const billData = {
//     companyName: "ABC Hardware Store",
//     companyAddress: "123 Main Street, City, Country",
//     gstNumber: "GST123456789",
//     billNumber: "INV-001",
//     date: "2025-02-02",
//     items: [
//       { name: "Hammer", quantity: 2, price: 150 },
//       { name: "Nails (1kg)", quantity: 1, price: 100 },
//       { name: "Drill Machine", quantity: 1, price: 2500 },
//     ],
//     subtotal: 2750,
//     tax: 250,
//     total: 3000,
//   };

//   return (
//     <div className="bg-white rounded-lg shadow-md max-w-lg mx-auto">
//       {/* Hidden Bill Section */}
//       {showBill && (
//         <div
//           id="printable-bill"
//           className="p-4 border border-gray-300 md:block absolute top-[-100%]"
//         >
//           <h2 className="text-xl font-bold text-center">
//             {billData.companyName}
//           </h2>
//           <p className="text-center text-sm">{billData.companyAddress}</p>
//           <p className="text-center text-sm">GST: {billData.gstNumber}</p>
//           <hr className="my-2" />

//           <p>
//             <strong>Bill No:</strong> {billData.billNumber}
//           </p>
//           <p>
//             <strong>Date:</strong> {billData.date}
//           </p>
//           <hr className="my-2" />

//           <table className="w-full text-sm">
//             <thead>
//               <tr className="border-b">
//                 <th className="text-left">Product</th>
//                 <th className="text-center">Qty</th>
//                 <th className="text-right">Price</th>
//               </tr>
//             </thead>
//             <tbody>
//               {billData.items.map((item, index) => (
//                 <tr key={index} className="border-b">
//                   <td>{item.name}</td>
//                   <td className="text-center">{item.quantity}</td>
//                   <td className="text-right">₹{item.price}</td>
//                 </tr>
//               ))}
//             </tbody>
//           </table>

//           <hr className="my-2" />
//           <p className="text-right">
//             <strong>Subtotal:</strong> ₹{billData.subtotal}
//           </p>
//           <p className="text-right">
//             <strong>Tax:</strong> ₹{billData.tax}
//           </p>
//           <p className="text-right text-lg font-bold">
//             <strong>Total:</strong> ₹{billData.total}
//           </p>
//         </div>
//       )}
//     </div>
//   );
// });

// export default Invoice;
