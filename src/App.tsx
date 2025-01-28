import { HashRouter } from "react-router";
import AppRouter from "./router/AppRouter";

function App() {
  return (
    <HashRouter>
      <AppRouter/>
    </HashRouter>
  )
}

export default App;