import NavBar from "./NavBar";
import Footer from "./Footer";
import { Outlet, ScrollRestoration } from "react-router-dom";
import HeaderHome from "./HeaderHome";
import Loader from "./Loader";
import { useSelector } from 'react-redux'

function Root() {

  const isLoad = useSelector((state) => state.other.isLoad)

  return (
    <>
    <ScrollRestoration/>
    {isLoad? <Loader/> : <></>}
    <NavBar/>
    <HeaderHome/>
    <Outlet/>
    <Footer/>
    </>
  );
}

export default Root;