import type { FC } from "react";
import { useCardMenuStore } from "@/store/menu-store";
import { DropMenu } from "@/components/webs/card/DropMenu";
import { TextRow } from "@/components/webs/card/TextRow";
import type { WebAccount } from "@/interfaces";

interface Props {
  account: WebAccount;
}

const WebAccountCard: FC<Props> = ({ account }) => {
  const { idKey, setOpen } = useCardMenuStore();

  return (
    <article 
      className="border rounded border-neutral-100" 
      onClick={() => idKey === account.id && setOpen(null)}
    >
      {/* Title bar */}
      <div className="flex justify-between items-center py-3 px-4 bg-neutral-100">
        <h3 className="font-bold text-xl text-black">
          {account.webName}
        </h3>

        <DropMenu id={account.id} webUrl={account.webUrl}/>
      </div>

      {/* Content */}
      <div className="p-4 space-y-2">
        {/* User row */}
        <div className="flex items-center justify-between">
          <h4 className="font-semibold">Usuario:</h4>
          
          <TextRow value={account.webUser}/>
        </div>

        {/* Password row */}
        <div className="flex items-center justify-between">
          <h4 className="font-semibold">Password:</h4>

          <TextRow value={account.webPassword}/>
        </div>
      </div>

    </article>
  )
}

export default WebAccountCard;