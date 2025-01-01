import {
  ChevronFirst,
  ChevronLast,
  EllipsisVertical,
  Layout,
  Store,
  Settings,
  ChartPie,
  LayoutDashboard,
  ReceiptIndianRupee,
} from "lucide-react";
import SidebarItem from "./SidebarItem";
import { createContext, useState } from "react";

const SidebarItems = [
  <SidebarItem
    icon={<ReceiptIndianRupee size={20} />}
    text="Sales"
  />,
  <SidebarItem
    icon={<LayoutDashboard size={20} />}
    text="Dashboard"
    active
  />,
  <SidebarItem
    icon={<Store size={20} />}
    text="Stock"
  />,
  <SidebarItem
    icon={<ChartPie size={20} />}
    text="Analytics"
  />,
  <SidebarItem
    icon={<Settings size={20} />}
    text="Settings"
  />,
];

export const SidebarContext = createContext();

const Sidebar = () => {
  const [isExpanded, setIsExpanded] = useState(true);
  return (
    <aside className="h-screen inline-block">
      <nav className="border-r h-full flex flex-col">
        <div className="flex p-4 justify-between items-center">
          {/* <img
            src="https://img.logoipsum.com/243.svg"
            className={`transition-all ${isExpanded ? "w-32" : "w-0"}`}
          /> */}
          <span className={`font-bold text-xl text-[#2B5D45] italic overflow-hidden transition-all ${isExpanded ? "w-32 ml-3" : "w-0"}`}>AgroPOS</span>
          <button
            onClick={() => {
              setIsExpanded((prevState) => !prevState);
            }}
            className="p-1.5 rounded-lg bg-gray-50 hover:bg-gray-100"
          >
            {isExpanded ? <ChevronFirst /> : <ChevronLast />}
          </button>
        </div>
        <SidebarContext.Provider value={isExpanded}>
          <ul className={`px-3 flex-1`}>{SidebarItems}</ul>
        </SidebarContext.Provider>

        <div className="border-t flex p-3">
          <img
            src="https://ui-avatars.com/api/?name=Manik+Hilalpure&background=D5E7DE&color=2B5D45&bold=true"
            className="h-10 w-10 rounded-md"
          />
          <div
            className={`flex items-center justify-between overflow-hidden transition-all ${
              isExpanded ? "w-44 ml-3" : "w-0"
            }`}
          >
            <div className="leading-4">
              <h4 className="font-semibold">Manik</h4>
              <span className="text-xs text-gray-600">
                manik.hilalpure@gmail.com
              </span>
            </div>
            <EllipsisVertical size={20} />
          </div>
        </div>
      </nav>
    </aside>
  );
};
export default Sidebar;
