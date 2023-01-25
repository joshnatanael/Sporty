import { NavLink, useNavigate } from "react-router-dom";
import Swal from 'sweetalert2';

function NavBar() {

  const navigate = useNavigate();

  const logoutHandler = (e) => {
    e.preventDefault();
    localStorage.removeItem("access_token");
    Swal.fire({
      position: 'top-end',
      icon: 'success',
      toast: true,
      title: "Successfully logged out",
      showConfirmButton: false,
      timer: 1500
    });
    navigate('login');
  }

  return (
    <header aria-label="Site Header" className="bg-black sticky top-0 z-40">
      <div
        className="mx-auto flex h-16 max-w-screen-xl items-center gap-8 px-4 sm:px-6 lg:px-8"
      >
        <NavLink to="/" className="block text-teal-600">
          <span className="sr-only">Home</span>
          <img src="https://cdn-icons-png.flaticon.com/512/2741/2741280.png"
            className="h-12 rounded-full p-1 bg-white"
            viewBox="0 0 28 24"
            fill="none"
            alt="logo"
          />
          {/* <p className="text-white -mt-4 text-sm text-center">Sporty</p> */}
        </NavLink>

        <div className="flex flex-1 items-center justify-end md:justify-between">
          <nav aria-label="Site Nav" className="hidden md:block">
            <ul className="flex items-center gap-8 font-bold">
              <li>
                <NavLink to="/" className="text-white transition hover:font-extrabold" href="/">
                  Dashboard
                </NavLink>
              </li>

              <li>
                <NavLink to="/products" className="text-white transition hover:font-extrabold" href="/">
                  Products
                </NavLink>
              </li>

              <li>
                <NavLink to="/categories" className="text-white transition hover:font-extrabold" href="/">
                  Categories
                </NavLink>
              </li>

              <li>
                <NavLink to="/register" className="text-white transition hover:font-extrabold" href="/">
                  Register
                </NavLink>
              </li>

            </ul>
          </nav>

          <div className="flex items-center gap-4">
            <div className="sm:flex sm:gap-4">

              <a
                className="cursor-pointer hidden rounded-md bg-gray-100 px-5 py-2.5 text-sm font-medium transition hover:bg-black hover:text-white sm:block"
                onClick={logoutHandler}
              >
                Logout
              </a>
            </div>
          </div>
        </div>
      </div>
    </header>

  );
}

export default NavBar;