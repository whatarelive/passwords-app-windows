import clsx from "clsx";
import { useState, type FC } from "react";
import { MdContentCopy, MdVisibility, MdVisibilityOff } from "react-icons/md";
import { WebAccountDropMenu } from "@/components/webs/WebAccountDropMenu";
import type { WebAccount } from "@/interfaces";
import { useCardMenuStore } from "@/store/menu-store";

interface Props {
  account: WebAccount;
}

const UserRow: FC< Pick<WebAccount, 'webUser'>> = ({ webUser }) => {
  const [showUser, setShowUser] = useState(false);

  return (
    <div className="flex gap-4">
      <input 
        id="user"
        name="user"
        value={webUser}
        disabled
        type={showUser ? "text" : "password"}
        className="text-right"
      />
      <button 
        onClick={() => setShowUser(!showUser)}
        className={clsx(
          "p-1.5 rounded cursor-pointer",
          {
            "hover:text-red-500" : showUser,
            "hover:text-blue-400" : !showUser
          }
        )}
      >
        {     
          !showUser 
            ? <MdVisibility size={24}/> 
            : <MdVisibilityOff size={24}/> 
        }
      </button>
      <button className="p-1.5 rounded cursor-pointer hover:text-green-400">
        <MdContentCopy size={22}/>
      </button>
    </div>
  )
}

const PasswordRow: FC< Pick<WebAccount, 'webPassword'>> = ({ webPassword }) => {
  const [showPassword, setShowPassword] = useState(false);

  return (
    <div className="flex gap-4">
      <input 
        id="user"
        name="user"
        value={webPassword}
        disabled
        type={showPassword ? "text" : "password"}
        className="text-right"
      />
      <button 
        onClick={() => setShowPassword(!showPassword)}
        className={clsx(
          "p-1.5 rounded cursor-pointer",
          {
            "hover:text-red-500" : showPassword,
            "hover:text-blue-400" : !showPassword
          }
        )}
      >
        {     
          !showPassword 
            ? <MdVisibility size={24}/> 
            : <MdVisibilityOff size={24}/> 
        }
      </button>
      <button className="p-1.5 rounded cursor-pointer hover:text-green-400">
        <MdContentCopy size={24}/>
      </button>
    </div>
  )
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

        <WebAccountDropMenu id={account.id} webUrl={account.webUrl}/>
      </div>

      {/* Content */}
      <div className="p-4 space-y-2">
        {/* User row */}
        <div className="flex items-center justify-between">
          <h4 className="font-semibold">Usuario:</h4>
          
          <UserRow webUser={account.webUser}/>
        </div>

        {/* Password row */}
        <div className="flex items-center justify-between">
          <h4 className="font-semibold">Password:</h4>

          <PasswordRow webPassword={account.webPassword}/>
        </div>
      </div>

    </article>
  )
}

export default WebAccountCard;