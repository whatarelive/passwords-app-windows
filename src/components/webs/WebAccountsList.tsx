import { mockData } from "@/data/mockData";
import WebAccountCard from "@/components/webs/WebAccountCard";

const WebAccountsList = () => {
  return (
    <ul className="space-y-4">
      {
        mockData.map((account) => (
          <li key={account.id}>
            <WebAccountCard account={account}/>
          </li>
        ))
      }
    </ul>
  )
}

export default WebAccountsList;