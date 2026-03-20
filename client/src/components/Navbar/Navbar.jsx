import { Expand, Calendar1, Clock2 } from "lucide-react";
import { useState } from "react";

const Navbar = ({ isReal, setIsReal }) => {
  const [time, setTime] = useState(new Date().toLocaleTimeString());
  setInterval(() => {
    setTime(new Date().toLocaleTimeString());
  }, 1000);

  return (
    <nav className="bg-[#F4F4F4] w-full flex justify-between items-center py-3 px-6 shadow fixed top-0 z-20">
      <span className="font-bold text-xl italic text-primary">AgroPOS</span>
      <div className="flex items-center">
        <div className="flex items-center gap-3">
          <span
            className={`text-sm font-medium ${
              !isReal ? "text-green-600" : "text-gray-400"
            }`}
          >
            DEMO
          </span>

          <button
            onClick={() => {
              setIsReal(!isReal);
            }}
            className={`relative inline-flex h-6 w-12 items-center rounded-full transition ${
              isReal ? "bg-red-500" : "bg-green-500"
            }`}
          >
            <span
              className={`inline-block h-5 w-5 transform rounded-full bg-white transition ${
                isReal ? "translate-x-6" : "translate-x-1"
              }`}
            />
          </button>

          <span
            className={`text-sm font-medium ${
              isReal ? "text-red-600" : "text-gray-400"
            }`}
          >
            REAL
          </span>
        </div>
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
