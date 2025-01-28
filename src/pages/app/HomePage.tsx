import { NavLink } from "react-router";

function HomePage() {
  return (
    <div>
      <h1 className="text-green-400">HomePage</h1>
      <NavLink className="bg-green-400 p-2 rounded font-semibold" to="/auth/login">Login</NavLink>
    </div>
  )
}

export default HomePage;