import type { FC } from "react";

interface Props {
    title: string;
    subtitle: string;
}

const UserCardTitle: FC<Props> = ({ title, subtitle }) => {
  return (
    <div className="flex flex-col">
        <h2 className="">
            { title }
        </h2>
        <p className="">
            { subtitle }
        </p>
    </div>
  )
}

export default UserCardTitle;