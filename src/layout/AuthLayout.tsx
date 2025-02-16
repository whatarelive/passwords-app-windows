import { Outlet } from "react-router";

function AuthLayout() {
  return (
    <main className="flex w-full h-[761px] pt-16 justify-center bg-primary">
      <Outlet/>
    </main>
  )
}

export default AuthLayout;