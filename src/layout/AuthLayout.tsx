import { Outlet } from "react-router";

function AuthLayout() {
  return (
    <main className="flex w-full h-[761px] pt-16 justify-center bg-[#1F1F27]">
      <Outlet/>
    </main>
  )
}

export default AuthLayout;