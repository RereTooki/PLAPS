import React from "react";
import "../App.css";
import AuthPage from "./AuthPage";
import { Link } from "react-router-dom";

const Homepage = () => {
  return (
    <div className="min-h-screen bg-black/80 text-white flex flex-col items-center justify-center p-8 selection:bg-white selection:text-neutral-900">
      {/* Logo and Site Title */}
      <h1
        className="text-4xl md:text-5xl lg:text-8xl font-bold mb-4 tracking-wide hover:scale-[1.04] transition ease-in-out duration-500 delay-10 sborder-2 xl:hidden"
        data-aos="zoom-in"
        data-aos-duration="1500"
      >
        PLAPS
      </h1>{" "}
      <h1
        className="text-4xl md:text-5xl lg:text-8xl xl:text-5xl xxl:text-6xl xl:w-[80%] font-bold mb-4 tracking-wide hover:scale-[1.04] transition ease-in-out duration-500 delay-10 border-2s hidden xl:block text-center"
        data-aos="zoom-in"
        data-aos-duration="1500"
      >
        PLAPS - Personalised Learning Academic Predictions System
      </h1>
      {/* Tagline */}
      <p
        className="text-gray-400 text-center lg:text-lg max-w-md lg:max-w-lg mb-8 hover:scale-[1.04] transition ease-in-out duration-500 delay-10"
        data-aos="fade-up"
        data-aos-duration="1800"
      >
        Empowering students with personalized academic insights. Predict your
        success, optimize your learning journey.
      </p>
      {/* Buttons */}
      <div
        className="flex gap-6 lg:text-lg"
        data-aos="fade-up"
        data-aos-duration="2200"
      >
        <Link
          to="/login"
          className="px-6 py-3 rounded-md bg-white text-neutral-900 font-semibold hover:bg-[#94d8df] hover:text-white curosr-pointer hover:scale-[1.04] transition ease-in-out duration-500 delay-10 selection:text-[#94d8df]"
        >
          Login
        </Link>
        <Link
          to="/signup"
          className="px-6 py-3 rounded-md border border-white bg-white text-neutral-900 font-semibold hover:text-neutral-900 hover:bg-[#94d8df] hover:text-white curosr-pointer hover:scale-[1.04] transition ease-in-out duration-500 delay-10 selection:text-[#94d8df]"
        >
          Sign Up
        </Link>
      </div>
      <div className="fixed bottom-0 left-0 ml-[2vw] lg:ml-[1vw]  pb-[1.2vw] text-light-cyans underline-offset-2 nxl:underline-offset-4 md:pb-[1.2vw] text-[2vw] nsm:text-[1.2vw] xl:text-[1vw] select-none hover:scale-[1.04] transition ease-in-out duration-500 delay-10">
        © 2025{" "}
        <a
          href="https://www.linkedin.com/in/rerel-oluwa-tooki-cnvp-b53396253/"
          target="_blank"
          className="underline text-[#94d8df] tracking-wide"
          title="About Subomi Ibukun"
        >
          Subomi Ibukun
        </a>
      </div>
    </div>
  );
};

export default Homepage;
