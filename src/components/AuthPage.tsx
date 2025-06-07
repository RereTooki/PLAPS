import { useState } from "react";
import LoginForm from "./LoginForm";
import RegisterForm from "./RegisterForm";
import { Link } from "react-router-dom";

const AuthPage = () => {
  const [isLogin, setIsLogin] = useState(true);

  return (
    <div className="flex flex-col gap-10 items-center justify-center min-h-screen  px-4 bg-black/80 select-none">
      <Link
        to="/" // Link to Home Page
      >
        <h1
          className="text-4xl md:text-5xl font-bold mb-4 tracking-wide hover:scale-[1.04] transition ease-in-out duration-500 delay-10 text-white "
          data-aos="zoom-in"
          data-aos-duration="1200"
        >
          PLAPS - Personalised Learning Academic Predictions System
        </h1>
      </Link>

      <div
        className="bg-white shadow-lg shadow-white/50 rounded-lg p-8 w-full max-w-md"
        data-aos="zoom-in"
        data-aos-duration="1200"
      >
        <h1 className="text-2xl font-bold mb-6 text-center">
          {isLogin ? "Login" : "Register"}
        </h1>

        {isLogin ? <LoginForm /> : <RegisterForm />}

        <p className="text-center mt-4 text-sm hover:scale-[1.04] transition ease-in-out duration-500 delay-10">
          {isLogin ? "Don't have an account?" : "Already have an account?"}
          <button
            onClick={() => setIsLogin(!isLogin)}
            className="text-[#94d8df] hover:underline ml-2"
          >
            {isLogin ? "Register" : "Login"}
          </button>
        </p>
      </div>
      <div className="fixed bottom-0 left-0 ml-[2vw] lg:ml-[1vw]  pb-[1.2vw] text-light-cyans underline-offset-2 nxl:underline-offset-4 md:pb-[1.2vw] text-[2vw] nsm:text-[1.2vw] xl:text-[1vw] select-none hover:scale-[1.04] transition ease-in-out duration-500 delay-10  text-white">
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

export default AuthPage;
