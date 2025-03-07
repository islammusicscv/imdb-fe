import './App.css'
import {Route, Routes} from "react-router-dom";
import Home from "./pages/Home.tsx";
import Register from "./pages/Register.tsx";
import Login from "./pages/Login.tsx";
import Wrapper from "./commponents/Wrapper.tsx";
import Movies from "./pages/Movies.tsx";

function App() {
  return (
      <>
          <Wrapper>
              <Routes>
                  <Route path="/" element={<Home />} />
                  <Route path="/register" element={<Register />} />
                  <Route path="/login" element={<Login />} />
                  <Route path="/movies" element={<Movies />} />
              </Routes>
          </Wrapper>
      </>
  )
}

export default App
