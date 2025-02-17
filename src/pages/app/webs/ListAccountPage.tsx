import { useEffect } from "react";
import { NavLink } from "react-router";
import { MdAdd } from "react-icons/md";
import { useAuthStore } from "@/store/auth-store";
import { useAccountsStore } from "@/store/accounts-store";
import Search from "@/components/global/Search";
import WebAccountsList from "@/components/webs/WebAccountsList";

function ListAccountPage() {
  const userId = useAuthStore((state) => state.session?.userId);
  const getAccounts = useAccountsStore((state) => state.getAccounts);

  useEffect(() => {
    if (!userId) return;
    getAccounts(userId);
  }, []);

  return (
    <section className="w-full h-[701px] px-6 py-8 bg-auxiliar">
      {/* Add and Seacrh section */}
      <div className="flex gap-4 mb-8">
        <Search/>
        <NavLink 
          to="/add"
          className={`flex items-center font-semibold py-1 gap-1 px-3 rounded-md cursor-pointer 
          bg-green-500 text-auxiliar hover:bg-white`}
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

export default ListAccountPage;