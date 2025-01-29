import { mockData } from "@/data/mockData";
import WebAccountCard from "./WebAccountCard";

const WebAccountsList = () => {
  return (
    <ul>
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