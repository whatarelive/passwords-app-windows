import { mockData } from "@/data/mockData";
import WebAccountCard from "@/components/webs/WebAccountCard";

import "@/styles/scrollbar-style.css";

const WebAccountsList = () => {
  return (
    <ul className="relative space-y-4 max-h-[560px] overflow-y-auto elegant-scrollbar">
      {
        mockData.map((account) => (
          <li key={account.id} className="mr-1">
            <WebAccountCard account={account}/>
          </li>
        ))
      }
    </ul>
  )
}

export default WebAccountsList;