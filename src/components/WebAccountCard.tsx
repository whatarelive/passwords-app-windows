import { useState, type FC } from "react";
import { MdCopyAll, MdVisibility, MdVisibilityOff } from "react-icons/md";

interface WebAccount {
  id: string,
  webName: string,
  webUser: string,
  webPassword: string,
  webUrl: string 
}

interface Props {
  account: WebAccount;
}

const WebAccountCard: FC<Props> = ({ account }) => {
  const [showUser, setShowUser] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  return (
    <article>
      {/* Title bar */}
      <div>
        <h3>
          {account.webName}
        </h3>

        
      </div>

      {/* Content */}
      <div>
        {/* User row */}
        <div className="flex justify-between">
          <h4>Usuario:</h4>
          
          <div className="flex gap-2">
            <input 
              id="user"
              name="user"
              value={account.webUser}
              disabled
              type={showUser ? "text" : "password"}
            />
            <button onClick={() => setShowUser(!showUser)}>
              {     
                showUser 
                  ? <MdVisibility size={24}/> 
                  : <MdVisibilityOff size={24}/> 
              }
            </button>
            <button>
              <MdCopyAll size={24}/>
            </button>
          </div>
        </div>

        {/* Password row */}
        <div className="flex justify-between">
          <h4>Password:</h4>

          <div className="flex gap-2">
            <input 
              id="user"
              name="user"
              value={account.webPassword}
              disabled
              type={showPassword ? "text" : "password"}
              className=""
            />
            <button onClick={() => setShowPassword(!showPassword)}>
              {     
                showPassword 
                  ? <MdVisibility size={24}/> 
                  : <MdVisibilityOff size={24}/> 
              }
            </button>
            <button>
              <MdCopyAll size={24}/>
            </button>
          </div>
        </div>
      </div>
    </article>
  )
}

export default WebAccountCard;