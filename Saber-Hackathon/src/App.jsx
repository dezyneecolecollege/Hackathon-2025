import { BrowserRouter, Route, Routes } from "react-router-dom"
import Header from "./component/Header"
import Footer from "./component/Footer"
import Layout from "./component/Layout"
import Hero from "./component/Outlet/Hero"
import About from "./component/Outlet/About"
import ExploreIcon from '@mui/icons-material/Explore';
import Gallery from "./component/Outlet/Gallery"
import Tips from "./component/Outlet/Tips"
import Contact from "./component/Outlet/Contact"

function App() {

  return (
    <BrowserRouter>

    <div className="flex flex-col justify-center bg-white min-h-[100vh]">
      
      <Routes>
        <Route path="/" element={<Layout/>}>
    <Route path="" element={<Hero/>}/>
    <Route path="/about" element={<About/>}/>
    <Route path="/contact" element={<Contact/>}/>
    <Route path="/tips" element={<Tips/>}/>
    <Route path="/gallery" element={<Gallery/>}/>
        </Route>
      </Routes>
    </div>
    </BrowserRouter>
  )
}

export default App
