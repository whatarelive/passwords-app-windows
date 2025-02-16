import type { FC } from "react";
import { MdCalendarToday } from "react-icons/md";
import type { Activity } from "@/interfaces";

interface Props {
    activity: Activity
}

const UserActivityElement: FC<Props> = ({ activity }) => {
  return (
    <div className="bg-primary rounded-md">
        <div className="flex bg-white text-black justify-between py-1 px-4 rounded-t-md">
            <h3 className="text-lg font-bold">
                { activity.action }
            </h3>
            <div className="inline-flex items-center gap-2">
                <MdCalendarToday/>
                <p className="font-medium">
                    { activity.date.toString() }
                </p>
            </div>
        </div>

        <div className="py-3 px-4">
            <p className="text-sm">
                {activity.details}
            </p>
        </div>
    </div>
  )
}

export default UserActivityElement;