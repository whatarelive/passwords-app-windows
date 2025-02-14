import type { FC } from "react";

interface IWebFormTitle {
  title: string;
  subtitle: string;
}

export const WebFormTitle: FC<IWebFormTitle> = ({ title, subtitle }) => {
  return (
    <div className="flex flex-col items-center mt-10 mb-12 select-none">
      <h3 className="text-3xl text-green-500 font-bold">
        { title }
      </h3>
      <p className="text-gray-300 text-center">
        { subtitle }
      </p>
    </div>
  )
}