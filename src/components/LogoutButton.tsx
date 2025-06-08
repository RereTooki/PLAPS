import { useNavigate } from "react-router-dom";

const LogoutButton = () => {
  const navigate = useNavigate();

  const handleLogout = () => {
    // Clear local storage
    localStorage.removeItem("user_id");
    localStorage.removeItem("name");

    // Redirect to login/auth page
    navigate("/");
  };

  return (
    <>
      <button
        onClick={handleLogout}
        className="text-center text-sm  transition ease-in-out duration-500 delay-10 cursor-pointer hover:scale-[1.02] fixed bottom-2 lg:bottom-4 underline underline-offset-2 text-[#94d8df] right-4"
      >
        Logout
      </button>
    </>
  );
};

export default LogoutButton;
