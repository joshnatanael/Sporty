import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { useNavigate } from "react-router-dom";
import { hideLoad, loginHandler, showLoad } from '../store/actions/actionCreator';

function Login() {

  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [login, setLogin] = useState({
    email: "",
    password: ""
  });

  const onChangeHandler = (e) => {
    const accountData = { ...login, [e.target.name]: e.target.value }
    setLogin(accountData);
  }

  const onSubmitHandler = (e) => {
    e.preventDefault();
    dispatch(showLoad());
    dispatch(loginHandler(login))
      .then(data=>{
        localStorage.setItem("access_token", data.access_token);
        navigate('/');
        setLogin({
          email: "",
          password: ""
        })
        dispatch(hideLoad());
      })
  }

  return (

    <section id="login-section">
      <header aria-label="Site Header" className="bg-black">
        <div
          className="mx-auto flex h-16 max-w-screen-xl items-center gap-8 px-4 sm:px-6 lg:px-8"
        >
          <a className="block text-teal-600">
            <span className="sr-only">Home</span>
            <img src="https://cdn-icons-png.flaticon.com/512/2741/2741280.png"
              className="h-12 rounded-full p-1 bg-white"
              viewBox="0 0 28 24"
              fill="none"
              alt="logo"
            />
            {/* <p className="text-white -mt-4 text-sm text-center">Sporty</p> */}
          </a>

          
        </div>
      </header>
      <div className="mx-auto max-w-screen-xl px-4 py-16 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-lg">
          <h1 className="text-center text-2xl font-bold sm:text-3xl mb-12">
            Sign In
          </h1>
          <form onSubmit={onSubmitHandler} className="mt-6 mb-0 space-y-4 rounded-lg p-8 shadow-2xl">
            <p className="text-lg font-medium">Sign in to your account</p>

            <div>
              <label htmlFor="email" className="text-sm font-medium">Email</label>

              <div className="relative mt-1">
                <input
                  type="email"
                  id="email"
                  name="email"
                  className="w-full rounded-lg border-gray-200 p-4 pr-12 text-sm shadow-sm"
                  placeholder="Enter email"
                  value={login.email}
                  onChange={onChangeHandler}
                />

              </div>
            </div>

            <div>
              <label htmlFor="password" className="text-sm font-medium">Password</label>

              <div className="relative mt-1">
                <input
                  type="password"
                  id="password"
                  name="password"
                  className="w-full rounded-lg border-gray-200 p-4 pr-12 text-sm shadow-sm"
                  placeholder="Enter password"
                  value={login.password}
                  onChange={onChangeHandler}
                />

              </div>
            </div>

            <button
              type="submit"
              className="block w-full rounded-lg bg-black px-5 py-3 text-sm font-medium text-white"
            >
              Sign in
            </button>
          </form>
        </div>
      </div>
    </section>
  );
}

export default Login;