import NavBar from "./NavBar";
import { Outlet, ScrollRestoration } from "react-router-dom";
import Loader from "./Loader";
import { useSelector } from 'react-redux'

function Root() {

  const isLoad = useSelector((state) => state.other.isLoad);

  return (
    <>
    <ScrollRestoration/>
    {isLoad? <Loader/>: <></>}
    <NavBar/>
    <Outlet />
    </>
  );
}

export default Root;