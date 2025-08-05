import { Link } from "react-router-dom";
import { useAppDispatch } from "../types/interfaces";
import { useNavigate } from "react-router-dom";
import { logout } from "../features/auth/authSlice";
import { useState } from "react";

const UppperHome = () => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const [selectedSec, setSelectedSec] = useState("tasklist");

  return (
    <div className="bg-green-950 ">
      <div className=" flex justify-between p-5 md:flex-row flex-col items-center">
        <div>
          <h1 className="font-bold-poppins text-xl text-[#fff]">Tasko</h1>
        </div>
        <div className="flex gap-4 items-center">
          <Link
            to="tasklist"
            className={`text-[${
              selectedSec === "tasklist" ? "#60E5AE" : "#fff"
            }]`}
            onClick={() => {
              setSelectedSec("tasklist");
            }}
          >
            Task List
          </Link>
          <Link
            to="spins"
            className={`text-[${selectedSec === "spins" ? "#60E5AE" : "#fff"}]`}
            onClick={() => {
              setSelectedSec("spins");
            }}
          >
            Spin
          </Link>
        </div>
        <div>
          <button
            className="hover:text-[#60E5AE] text-[#fff]"
            onClick={() => {
              dispatch(logout());
              navigate("/");
            }}
          >
            Logout
          </button>
        </div>
      </div>
      <div className="p-5">
        <h1 className="text-[#60E5AE] text-[24px]">Hi</h1>
        <h3 className="text-[#FFFFFF] text-[40px] font-poppins ">
          Welcome to dashpoard
        </h3>
      </div>
    </div>
  );
};

export default UppperHome;
