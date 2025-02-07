import UserCardTitle from "@/components/user/UserCardTitle";

const UserSegurity = () => {
  return (
    <div className="bg-[#3b3b3e] w-full h-[560px] rounded-xl">
       <UserCardTitle 
        title="Configuración de Seguridad" 
        subtitle="Gestiona tu contraseña y opciones de seguridad"
      />
    </div>
  )
}

export default UserSegurity;