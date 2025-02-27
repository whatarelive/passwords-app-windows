import { ImFilesEmpty } from "react-icons/im";

export const EmptyData = () => {
  return (
    <div className="flex flex-col h-[550px] items-center">
      <ImFilesEmpty className="w-40 h-40 mt-28 opacity-40"/>
      
      <h1 className="text-2xl font-semibold mt-5">
        No hay información que mostrar
      </h1>
      
      <p className="text-center mt-2">         
        No tienes ninguna cuenta web registrada. Puedes agregar una nueva cuenta haciendo clic en el botón de Agregar.
      </p>
    </div>
  )
}
