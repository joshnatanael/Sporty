import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { hideLoad, registerAccount, showLoad } from '../store/actions/actionCreator';

function Register() {

  const dispatch = useDispatch();
  const [register, setRegister] = useState({
    username: "",
    email: "",
    password: "",
    phoneNumber: "",
    address: "",
    // role: "admin"
  });

  const onChangeHandler = (e) => {
    const newAccount = { ...register, [e.target.name]: e.target.value }
    setRegister(newAccount);
  }

  const onSubmitHandler = (e) => {
    e.preventDefault();
    dispatch(showLoad());
    dispatch(registerAccount(register))
      .then(_=>{
        setRegister({
          username: "",
          email: "",
          password: "",
          phoneNumber: "",
          address: "",
          // role: ""
        })
        dispatch(hideLoad());
      })
  }

  return (
    <section id="add-product-section">
      <div className="mx-auto max-w-screen-xl px-4 py-16 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-lg">
          <h1 className="text-center text-2xl font-bold sm:text-3xl">
            Create New Account
          </h1>

          <form onSubmit={onSubmitHandler} className="mt-6 mb-0 space-y-4 rounded-lg p-8 shadow-2xl">

            <div>
              <label htmlFor="username" className="text-sm font-medium">Username</label>

              <div className="relative mt-1">
                <input
                  type="text"
                  id="username"
                  name="username"
                  className="w-full rounded-lg border-gray-200 p-4 pr-12 text-sm shadow-sm"
                  placeholder="Enter Username"
                  value={register.username}
                  onChange={onChangeHandler}
                />
              </div>
            </div>

            <div>
              <label htmlFor="email" className="text-sm font-medium">Email</label>

              <div className="relative mt-1">
                <input
                  type="email"
                  id="email"
                  name="email"
                  className="w-full rounded-lg border-gray-200 p-4 pr-12 text-sm shadow-sm"
                  placeholder="Enter Email"
                  value={register.email}
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
                  placeholder="Enter Password"
                  value={register.password}
                  onChange={onChangeHandler}
                />
              </div>
            </div>

            {/* <div>
              <label htmlFor="role" className="text-sm font-medium">Role</label>

              <div className="relative mt-1">
                <input
                  type="text"
                  id="role"
                  name="role"
                  className="w-full rounded-lg border-gray-200 p-4 pr-12 text-sm shadow-sm"
                  placeholder="Enter Role"
                  value={register.role}
                  onChange={onChangeHandler}
                />
              </div>
            </div> */}

            <div>
              <label htmlFor="phoneNumber" className="text-sm font-medium">Phone Number</label>

              <div className="relative mt-1">
                <input
                  type="phoneNumber"
                  id="phoneNumber"
                  name="phoneNumber"
                  className="w-full rounded-lg border-gray-200 p-4 pr-12 text-sm shadow-sm"
                  placeholder="Enter Phone Number"
                  value={register.phoneNumber}
                  onChange={onChangeHandler}
                />
              </div>
            </div>

            <div>
              <label htmlFor="address" className="text-sm font-medium">Address</label>

              <div className="relative mt-1">
                <input
                  type="text"
                  id="address"
                  name="address"
                  className="w-full rounded-lg border-gray-200 p-4 pr-12 text-sm shadow-sm"
                  placeholder="Enter Address"
                  value={register.address}
                  onChange={onChangeHandler}
                />
              </div>
            </div>

            <button
              type="submit"
              className="block w-full rounded-lg bg-black px-5 py-3 text-sm font-medium text-white"
            >
              Save
            </button>
          </form>
        </div>
      </div>

    </section>

  );
}

export default Register;