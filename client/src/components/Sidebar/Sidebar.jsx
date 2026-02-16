import {
  ChevronFirst,
  ChevronLast,
  EllipsisVertical,
  Store,
  Settings,
  ChartPie,
  LayoutDashboard,
} from "lucide-react";
import { FiBox, FiFileText, FiShoppingCart} from "react-icons/fi";
import SidebarItem from "./SidebarItem";
import { createContext, useState } from "react";

const SidebarItems = [
  <SidebarItem
    icon={<FiShoppingCart size={20} />}
    text="Billing"
    to="/billing"
    key={1}
  />,
  <SidebarItem
    icon={<FiFileText size={20} />}
    text="Sales"
    to="/sales"
    key={2}
  />,
  <SidebarItem
    icon={<LayoutDashboard size={20} />}
    text="Dashboard"
    to="/dashboard"
    key={3}
  />,
  <SidebarItem
    icon={<FiBox size={20} />}
    text="Products"
    to="/products"
    key={4}
  />,
  <SidebarItem icon={<Store size={20} />} text="Stock" to="/stock" key={4} />,
  <SidebarItem
    icon={<ChartPie size={20} />}
    text="Analytics"
    to="/analytics"
    key={5}
  />,
  <SidebarItem
    icon={<Settings size={20} />}
    text="Settings"
    to="/settings"
    key={6}
  />,
];

export const SidebarContext = createContext();

const Sidebar = () => {
  const [isExpanded, setIsExpanded] = useState(true);
  return (
    <aside className="h-screen shadow-lg inline-block sticky top-0 left-0 pt-14">
      <nav className="h-full flex flex-col">
        <div className="flex p-4 justify-between items-center">
          <span
            className={`font-medium text text-gray-600 overflow-hidden transition-all ${
              isExpanded ? "w-32 ml-3" : "w-0"
            }`}
          >
            Navigate
          </span>
          <button
            onClick={() => {
              setIsExpanded((prevState) => !prevState);
            }}
            className="p-1.5 rounded-lg bg-gray-50 hover:bg-gray-100"
          >
            {isExpanded ? (
              <ChevronFirst size={22} />
            ) : (
              <ChevronLast size={22} />
            )}
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
              isExpanded ? "w-36 ml-3" : "w-0"
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
