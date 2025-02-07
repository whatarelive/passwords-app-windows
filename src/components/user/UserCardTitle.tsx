import type { FC } from "react";

interface Props {
  title: string;
  subtitle: string;
}

const UserCardTitle: FC<Props> = ({ title, subtitle }) => {
  return (
    <div className="flex flex-col px-5 pt-5">
      <h2 className="text-2xl font-semibold">
        { title }
      </h2>
      <p className="text-neutral-400">
        { subtitle }
      </p>
    </div>
  )
}

export default UserCardTitle;