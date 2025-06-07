import { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { Link } from "react-router-dom";

const LoginForm = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const response = await axios.post(
        "https://subomi-api.onrender.com/login",
        {
          email,
          password,
        }
      );

      const { user_id, name } = response.data;

      // Store user data locally (can also use context or redux)
      localStorage.setItem("user_id", user_id);
      localStorage.setItem("name", name);
      // Inside handleSubmit
      setLoading(true);
      // Example: storing user ID after login
      localStorage.setItem("userId", response.data.user_id); // Adjust based on your response structure

      // Navigate to dashboard
      navigate("/dashboard");
    } catch (error) {
      console.error("Login error", error);
      // after success or error
      setLoading(false);
      alert("Invalid credentials. Please try again.");
    }
  };

  return (
    <>
      {" "}
      <div className="flex flex-col gap-10 items-center justify-center min-h-screen  px-4 bg-black/80 select-none">
        <Link
          className="sborder-2"
          to="/" // Link to Home Page
        >
          <h1
            className="text-4xl md:text-5xl lg:text-8xl font-bold mb-4 tracking-wide hover:scale-[1.04] transition ease-in-out duration-500 delay-10 sborder-2 xl:hidden text-center text-white  "
            data-aoss="zoom-in"
            data-aoss-duration="1500"
          >
            PLAPS - Login
          </h1>{" "}
          <div className="w-full flex items-center justify-center h-full">
            <h1
              className="text-4xl md:text-5xl lg:text-8xl xl:text-5xl font-bold mb-4 tracking-wide hover:scale-[1.04] transition ease-in-out duration-500 delay-10 sborder-2 hidden xl:block text-center text-white   w-[80%]"
              data-aoss="zoom-in"
              data-aoss-duration="1500"
            >
              PLAPS - Personalised Learning Academic Predictions System Login
            </h1>
          </div>
        </Link>

        <div
          className="bg-white shadow-lg shadow-white/50 rounded-lg p-8 w-full max-w-md"
          data-aos="zoom-in"
          data-aos-duration="1200"
        >
          <h1 className="text-2xl font-bold mb-6 text-center">Login</h1>

          <form onSubmit={handleSubmit} className="space-y-4">
            <input
              type="email"
              placeholder="Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              className="w-full px-4 py-2 border rounded-md hover:scale-[1.02] transition ease-in-out duration-500 delay-10"
            />
            <input
              type="password"
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              className="w-full px-4 py-2 border rounded-md hover:scale-[1.02] transition ease-in-out duration-500 delay-10"
            />
            <button
              type="submit"
              className="w-full bg-[#94d8df]/80 hover:bg-[#94d8df] hover:scale-[1.02] transition ease-in-out duration-500 delay-10 text-white py-2 rounded-md transition"
            >
              Login!
            </button>
          </form>
          <Link
            to="/signup" // Link to signup Page
          >
            <p className="text-center mt-4 text-sm hover:scale-[1.04] transition ease-in-out duration-500 delay-10">
              Don't have an account?{" "}
              <button className="text-[#94d8df] hover:underline">
                Register
              </button>
            </p>
          </Link>
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
    </>
  );
};

export default LoginForm;
