import { NavLink } from "react-router-dom";

function HeaderHome() {
  return (
    <section
      className="-mt-16 overflow-hidden bg-[url(https://images.unsplash.com/photo-1525896650794-60ad4ec40d0e?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1740&q=80)] bg-cover bg-center bg-no-repeat"
    >
      <div className="bg-black/25 p-8 md:p-12 lg:px-16 lg:py-24">
        <div className="max-w-lg text-center sm:text-left">
          <h2 className="text-2xl font-bold text-white sm:text-3xl md:text-5xl">
            Find the best Sporty<sup>&#174;</sup> products!
          </h2>

          <div className="mt-4 sm:mt-8">
            <NavLink
              to="/"
              className="inline-flex items-center rounded-full bg-black px-8 py-3 text-white shadow-lg transition hover:bg-gray-600 focus:outline-none focus:ring"
            >
              <span className="text-sm font-medium"> Order Now </span>

              <svg
                className="ml-3 h-5 w-5"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M17 8l4 4m0 0l-4 4m4-4H3"
                />
              </svg>
            </NavLink>
          </div>
        </div>
      </div>
    </section>

  );
}

export default HeaderHome;