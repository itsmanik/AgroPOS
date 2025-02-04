import { useState } from "react";

const CustomerInfo = () => {
  const [name, setName] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [users, setUsers] = useState([
    { name: "Manik", phoneNumber: 1234567890 },
    { name: "Nigga", phoneNumber: 9898987678 },
    { name: "Satish", phoneNumber: 9448211110 },
    { name: "Neelambika", phoneNumber: 7865679845 },
    // Add more sample users to test scrolling
    { name: "Rahul", phoneNumber: 9876543210 },
    { name: "Priya", phoneNumber: 8765432109 },
    { name: "Aarav", phoneNumber: 7654321098 },
    { name: "Anika", phoneNumber: 6543210987 },
    { name: "Vikram", phoneNumber: 5432109876 },
  ]);
  const [filteredUsers, setFilteredUsers] = useState([]);

  const nameChangeHandler = (event) => {
    const value = event.target.value;
    setName(value);
    setFilteredUsers(
      users.filter((user) =>
        user.name.toLowerCase().includes(value.toLowerCase())
      )
    );
  };

  const handleSelectCustomer = (user) => {
    setName(user.name);
    setPhoneNumber(user.phoneNumber);
    setFilteredUsers([]);
  };

  return (
    <div className="max-w-md mx-auto p-3 bg-white rounded-lg">
      <p className="mb-2 text-gray-600 font-semibold">Customer Information</p>
      <form onSubmit={(e) => e.preventDefault()} className="flex flex-col gap-1">
        <input
          type="text"
          placeholder="Name"
          value={name}
          onChange={nameChangeHandler}
          className="p-1 border rounded w-full"
        />
        
        {/* Scrollable list container */}
        {name && filteredUsers.length > 0 && (
          <ul className="max-h-40 overflow-y-auto border rounded w-full">
            {filteredUsers.map((user) => (
              <li
                key={user.phoneNumber}
                onClick={() => handleSelectCustomer(user)}
                className="cursor-pointer p-2 hover:bg-gray-100"
              >
                {user.name} - {user.phoneNumber}
              </li>
            ))}
          </ul>
        )}

        <input
          type="text"
          placeholder="Ph No"
          value={phoneNumber}
          onChange={(e) => setPhoneNumber(e.target.value)}
          className="p-1 border rounded w-full"
        />
        <button
          type="button"
          onClick={() => {
            setName("");
            setPhoneNumber("");
            setFilteredUsers([]);
          }}
          className="mt-1 p-1 text-sm text-gray-600 bg-gray-200 rounded hover:bg-gray-300"
        >
          Clear
        </button>
      </form>
    </div>
  );
};

export default CustomerInfo;