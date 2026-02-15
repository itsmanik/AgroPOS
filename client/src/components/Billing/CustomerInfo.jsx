import { useState } from "react";

const CustomerInfo = () => {


  const [users, setUsers] = useState([
    { name: "Manik", phoneNumber: 1234567890, location: "Bangalore" },
    { name: "Rahul", phoneNumber: 9876543210, location: "Mysore" },
    { name: "Priya", phoneNumber: 8765432109, location: "Hubli" },
    { name: "Satish", phoneNumber: 9448211110, location: "Belgaum" },
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
    setLocation(user.location || "");
    setFilteredUsers([]);
  };

  return (
    <div className="max-w-md mx-auto p-3 bg-white rounded-lg">
      

      <form
        onSubmit={(e) => e.preventDefault()}
        className="flex flex-col gap-1"
      >
        {/* Name */}
        

        {/* Suggestions */}
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

        {/* Phone */}
        

        {/* ✅ NEW: Location */}
        
      </form>
    </div>
  );
};

export default CustomerInfo;
