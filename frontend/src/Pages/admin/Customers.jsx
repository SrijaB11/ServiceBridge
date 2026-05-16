// import React, { useEffect, useState } from "react";
// import { useDispatch, useSelector } from "react-redux";
// import {
//   fetchCustomers,
//   updateCustomer,
//   deleteCustomer,
// } from "../../redux/customers/customerSlice";

// const Customers = () => {
//   const dispatch = useDispatch();
//   const { list = [] } = useSelector((state) => state.customers || {});

//   const [editId, setEditId] = useState(null);
//   const [form, setForm] = useState({ name: "", email: "" });

//   useEffect(() => {
//     dispatch(fetchCustomers());
//   }, [dispatch]);

//   // EDIT
//   const handleEdit = (customer) => {
//     setEditId(customer.id);
//     setForm({ name: customer.name, email: customer.email });
//   };

//   // CANCEL EDIT
//   const handleCancel = () => {
//     setEditId(null);
//     setForm({ name: "", email: "" });
//   };

//   // UPDATE
//   const handleUpdate = () => {
//     dispatch(updateCustomer({ id: editId, data: form }));
//     setEditId(null);
//     setForm({ name: "", email: "" });
//   };

//   return (
//     <div className="p-4 md:p-6">
//       <h2 className="text-2xl font-bold mb-4">Customers</h2>

//       {/* EMPTY STATE */}
//       {list.length === 0 ? (
//         <p className="text-gray-500">No customers found</p>
//       ) : (
//         <div className="grid gap-4">
//           {list.map((c) => (
//             <div
//               key={c.id}
//               className="bg-white shadow rounded-xl p-4 flex flex-col md:flex-row justify-between"
//             >
//               {/* INFO */}
//               <div className="flex-1">
//                 {editId === c.id ? (
//                   <div className="space-y-2">
//                     <input
//                       className="border p-2 rounded w-full"
//                       value={form.name}
//                       onChange={(e) =>
//                         setForm({ ...form, name: e.target.value })
//                       }
//                     />

//                     <input
//                       className="border p-2 rounded w-full"
//                       value={form.email}
//                       onChange={(e) =>
//                         setForm({ ...form, email: e.target.value })
//                       }
//                     />
//                   </div>
//                 ) : (
//                   <>
//                     <h3 className="font-semibold">{c.name}</h3>

//                     <p className="text-gray-500">{c.email}</p>
//                   </>
//                 )}
//               </div>

//               {/* ACTIONS */}
//               <div className="flex gap-2 mt-3 md:mt-0">
//                 {editId === c.id ? (
//                   <>
//                     <button
//                       onClick={handleUpdate}
//                       className="bg-green-500 text-white px-3 py-1 rounded"
//                     >
//                       Save
//                     </button>

//                     <button
//                       onClick={handleCancel}
//                       className="bg-gray-400 text-white px-3 py-1 rounded"
//                     >
//                       Cancel
//                     </button>
//                   </>
//                 ) : (
//                   <button
//                     onClick={() => handleEdit(c)}
//                     className="bg-blue-500 text-white px-3 py-1 rounded"
//                   >
//                     Edit
//                   </button>
//                 )}

//                 <button
//                   onClick={() => dispatch(deleteCustomer(c.id))}
//                   className="bg-red-500 text-white px-3 py-1 rounded"
//                 >
//                   Delete
//                 </button>
//               </div>
//             </div>
//           ))}
//         </div>
//       )}
//     </div>
//   );
// };

// export default Customers;
import React from "react";

const Customers = () => {
  const list = [
    { id: 1, name: "John Doe", email: "john@test.com" },
    { id: 2, name: "Sara Ali", email: "sara@test.com" },
    { id: 3, name: "Mike Ross", email: "mike@test.com" },
  ];

  return (
    <div>
      <h1 className="text-2xl font-bold mb-4">Customers (Static)</h1>

      <div className="grid gap-4">
        {list.map((c) => (
          <div
            key={c.id}
            className="bg-white p-4 shadow rounded flex justify-between"
          >
            <div>
              <h2>{c.name}</h2>
              <p className="text-gray-500">{c.email}</p>
            </div>

            <div className="flex gap-2">
              <button className="bg-blue-500 text-white px-3 py-1 rounded">
                Edit
              </button>
              <button className="bg-red-500 text-white px-3 py-1 rounded">
                Delete
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Customers;
