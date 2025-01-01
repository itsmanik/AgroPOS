import {SidebarContext} from "./Sidebar";
import { useContext } from "react";

const SidebarItem = ({ icon, text, active, isExpanded }) => {
  const context = useContext(SidebarContext);
  return (
    <li
      className={`flex items-center py-2 px-3 my-1 font-medium rounded-md cursor-pointer transition-colors text-gray-600 
      ${active ? "bg-[#2B5D45] text-white" : ""} `}
    >
      {icon}
      <span
        className={`overflow-hidden transition-all ${
          context ? "w-44 ml-3" : "w-0"
        }`}
      >
        {text}
      </span>
    </li>
  );
};
export default SidebarItem;
