import { NavLink } from "react-router-dom";

function NavBar() {
  return (
    <header aria-label="Site Header">
      <div
        className="mx-auto flex h-16 max-w-screen-xl items-center gap-8 px-4 sm:px-6 lg:px-8"
      >
        <NavLink to="/" className="block text-teal-600">
          <span className="sr-only">Home</span>
          <img src="https://cdn-icons-png.flaticon.com/512/2741/2741280.png"
          className="h-12 rounded-full p-1 bg-white"
          viewBox="0 0 28 24"
          fill="none"
          />
          {/* <p className="text-white -mt-4 text-sm text-center">Sporty</p> */}
        </NavLink>

        <div className="flex flex-1 items-center justify-end md:justify-between">
          <nav aria-label="Site Nav" className="hidden md:block">
            <ul className="flex items-center gap-8 text-lg">
              <li>
                <NavLink to="/" className="text-white transition hover:font-bold" href="/">
                  Products
                </NavLink>
              </li>

              <li>
                <NavLink to="/categories" className="text-white transition hover:font-bold" href="/">
                  Categories
                </NavLink>
              </li>

              
            </ul>
          </nav>

          {/* <div className="flex items-center gap-4">
            <div className="sm:flex sm:gap-4">
              <NavLink to="/"
                className="block rounded-md bg-black px-5 py-2.5 text-sm font-medium text-white transition hover:bg-gray-100 hover:text-black"
                href="/"
              >
                Login
              </NavLink>

              <NavLink to="/"
                className="hidden rounded-md bg-gray-100 px-5 py-2.5 text-sm font-medium transition hover:bg-black hover:text-white sm:block"
                href="/"
              >
                Register
              </NavLink>
            </div>
          </div> */}
        </div>
      </div>
    </header>

  );
}

export default NavBar;