import { useEffect } from "react";
import { NavLink } from "react-router";
import { MdAdd } from "react-icons/md";
import { useAuthStore } from "@/store/auth-store";
import { useAccountsStore } from "@/store/accounts-store";
import Search from "@/components/global/Search";
import WebAccountsList from "@/components/webs/WebAccountsList";
import ErrorModal from "@/components/global/ErrorModal";
import SucessModal from "@/components/global/SucessModal";

function ListAccountPage() {
  const userId = useAuthStore((state) => state.session?.userId);
  const { view, message, getAccounts, disableView } = useAccountsStore();

  useEffect(() => {
    if (!userId) return;
    getAccounts(userId);
  }, []);

  useEffect(() => {
    if (!userId) return;
    getAccounts(userId);
  }, [message]);

  return (
    <>
      { 
        view === "ERROR" && (
          <ErrorModal title="Error de Eliminación" message={message!} disableView={disableView}/>
        )
      }
      {
        view === "SUCESS" && (
          <SucessModal title="Cuenta eliminada" message={message!} disableView={disableView}/>
        )
      }
      <section className="w-full h-[701px] px-6 py-8">
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
    </>
  )
}

export default ListAccountPage;