import React, { useState } from "react";
import { Link } from "react-router-dom";
import Logo from "../../../images/logo.png";
import { CgProfile, CgMenuLeftAlt, CgCloseR } from "react-icons/cg";

const Header = () => {
  const [mblNavOpen, setMblNavOpen] = useState(false);
  return (
    <div className="bg-[#06AED5]">
      {/* ============= mobile navbar ============= */}
      <div className="md:hidden">
        <div className="w-11/12 mx-auto py-3 flex justify-between items-center">
          {mblNavOpen ? (
            <CgCloseR
              className="text-white text-2xl cursor-pointer"
              onClick={() => setMblNavOpen(false)}
            />
          ) : (
            <CgMenuLeftAlt
              className="text-white text-2xl cursor-pointer"
              onClick={() => setMblNavOpen(true)}
            ></CgMenuLeftAlt>
          )}

          <CgProfile className="text-white text-2xl cursor-pointer"></CgProfile>
        </div>

        <div
          className={`w-11/12 mx-auto pb-3 ${mblNavOpen ? "block" : "hidden"}`}
        >
          <div className="bg-[#e70e8024] text-white  flex flex-col justify-between w-2/3 p-3 rounded-md mb-6">
            <Link
              to="/home"
              className="py-1 px-3 rounded-lg hover:bg-[#e70e80de]"
            >
              Home
            </Link>
            <Link
              to="/product"
              className="py-1 px-3 rounded-lg hover:bg-[#e70e80de]"
            >
              Product
            </Link>
            <Link
              to="/about"
              className="py-1 px-3 rounded-lg hover:bg-[#e70e80de]"
            >
              About
            </Link>
            <Link
              to="/login"
              className="py-1 px-3 rounded-lg hover:bg-[#e70e80de]"
            >
              Log/Reg
            </Link>
          </div>

          <div className="form-control w-1/2">
            <div className="input-group">
              <input
                type="text"
                placeholder="Search…"
                className="input border-0 focus:outline-none w-full"
              />
              <button className="btn btn-square bg-secondary hover:bg-secondary border-none">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-6 w-6"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                  />
                </svg>
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* ============= desktop navbar ============== */}
      <div className="hidden md:block">
        <div className="w-10/12 mx-auto flex items-center justify-between">
          <img src={Logo} alt="logo" className="w-24" />

          <div className="flex justify-between items-center basis-1/4 text-white font-medium">
            <Link to="/home" className="block py-9 px-1 mx-2">
              Home
            </Link>
            <Link to="/product" className="block py-9 px-1 mx-2">
              Product
            </Link>
            <Link to="/about" className="block py-9 px-1 mx-2">
              About
            </Link>
            <Link to="/login" className="block py-9 px-1 mx-2">
              Log/Reg
            </Link>
          </div>

          <div className="form-control">
            <div className="input-group">
              <input
                type="text"
                placeholder="Search…"
                className="input border-0 focus:outline-none md:w-36 lg:w-auto"
              />
              <button className="btn btn-square bg-secondary hover:bg-secondary border-none">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-6 w-6"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                  />
                </svg>
              </button>
            </div>
          </div>

          <div>
            <CgProfile className="text-white text-3xl cursor-pointer" />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Header;
