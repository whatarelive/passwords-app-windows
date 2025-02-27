import clsx from 'clsx';
import { useAccountsStore } from "@/store/accounts-store";
import { EmptyData } from '@/components/webs/EmptyData';
import WebAccountCard from "@/components/webs/WebAccountCard";

import "@/styles/scrollbar-style.css";

const WebAccountsList = () => {
  const accounts = useAccountsStore((state) => state.accounts); 

  return (!accounts || accounts.length === 0) 
    ? (
      <EmptyData/>
    ) : (
      <ul className={clsx(
        "relative space-y-4 max-h-[560px]",
        {
          "overflow-y-scroll elegant-scrollbar": accounts.length > 3,
          "overflow-hidden": accounts.length <= 3,
        }
      )}>
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