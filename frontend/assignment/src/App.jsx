import UserLogin from "./components/userLogin";
import { BrowserRouter,Routes,Route } from "react-router-dom";
import UserRegister from "./components/UserRegister";

function App(){
  return (
    <>
        <BrowserRouter>
        <Routes>
          <Route path="/" element={<UserLogin/>}/>
          <Route path="register" element={<UserRegister/>}/>
        </Routes>
        </BrowserRouter>

    </>
  )
}

export default App;