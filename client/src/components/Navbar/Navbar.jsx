import { Expand, Calendar1, Clock2 } from "lucide-react";
import { useState } from "react";

const Navbar = () => {
  const [time, setTime] = useState(new Date().toLocaleTimeString());
  setInterval(() => {
    setTime(new Date().toLocaleTimeString());
  }, 1000);
  return (
    <nav className="bg-[#F4F4F4] w-full flex justify-between items-center py-3 px-6 shadow fixed top-0 z-20">
      <span className="font-bold text-xl italic text-primary">AgroPOS</span>
      <div className="flex items-center">
        <span className="ml-4 text-md border px-3 py-1 rounded-md font-medium text-gray-700 flex items-center">
          <Calendar1 size={20} />
          <span className="ml-2">{new Date().toLocaleDateString()}</span>
        </span>
        <span className="ml-4 text-md flex items-center bg-[#dbeadb] px-3 py-1 rounded-md font-medium text-gray-700">
          <Clock2 size={20} />
          <span className="ml-2">{time}</span>
        </span>
        <button
          className="ml-4"
          onClick={() => {
            if (!document.fullscreenElement) {
              document.documentElement.requestFullscreen();
            } else {
              document.exitFullscreen();
            }
          }}
        >
          <Expand size={20} />
        </button>
      </div>
    </nav>
  );
};
export default Navbar;
