import type { FC } from "react";
import type { Activity } from "@/interfaces";

interface Props {
    activity: Activity
}

const UserActivityElement: FC<Props> = ({ activity }) => {
  return (
    <div className="bg-[#1f1f21] py-2 px-4">
        <div className="flex justify-between">
            <h3>
                { activity.action }
            </h3>
            <p>
                { activity.date.toString() }
            </p>
        </div>

        <div>
            <p>
                {activity.details}
            </p>
        </div>
    </div>
  )
}

export default UserActivityElement;