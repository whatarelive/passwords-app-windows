import WebAccountCard from "@/components/webs/WebAccountCard";
import { useAccountsStore } from "@/store/accounts-store";

import "@/styles/scrollbar-style.css";

const WebAccountsList = () => {
  const accounts = useAccountsStore((state) => state.accounts); 

  return (
    <ul className="relative space-y-4 max-h-[560px] overflow-y-auto elegant-scrollbar">
      {
        accounts!.map((account) => (
          <li key={account.id} className="mr-1">
            <WebAccountCard account={account}/>
          </li>
        ))
      }
    </ul>
  )
}

export default WebAccountsList;