import { BrowserRouter, Routes, Route } from "react-router-dom"
import Home from "./Home"
import Login from './Authentication/Login'
import Registration from "./Authentication/Registration"
import Joinroom from "./Component/Room/Joinroom"
import Createroom from "./Component/Room/Createroom"
import Screen from "./Component/Screen"
import Chat from "./Component/Chat"


function App() {

  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="Login" element={<Login />} />
          <Route path="Registration" element={<Registration />} />
          <Route path="Joinroom" element={<Joinroom />} />
          <Route path="Createroom" element={<Createroom />} />
          <Route path="Screen" element={<Screen />} />
          <Route path="Chat" element={<Chat />} />
        </Routes>
      </BrowserRouter>
    </>
  )
}

export default App
