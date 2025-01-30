import { NavLink } from "react-router";
import { MdAdd } from "react-icons/md";

import Search from "@/components/Search";
import WebAccountsList from "@/components/WebAccountsList";

function HomePage() {
  return (
    <section className="w-full h-[693px] px-6 py-8 bg-[#19191c]">
      {/* Add and Seacrh section */}
      <div className="flex gap-4 mb-8">
        <Search/>
        <NavLink 
          to="/add"
          className={`flex items-center font-semibold border py-1 gap-1 px-3 rounded-md cursor-pointer 
          bg-green-500 text-[#19191c] hover:bg-green-400`}
        >
          <MdAdd size={24}/>
          Agregar
        </NavLink>
      </div>

      {/* Accounts List */}
      <WebAccountsList/>
    </section>
  )
}

export default HomePage;