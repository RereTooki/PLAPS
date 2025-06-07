// src/pages/Profile.tsx
import { useNavigate } from "react-router-dom";

const Profile = () => {
  const userId = localStorage.getItem("user_id");
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-neutral-900 text-white p-10">
      <h1 className="text-3xl font-bold mb-6">👤 Profile</h1>
      <p className="text-lg">User ID: {userId}</p>
      <button
        onClick={() => navigate("/dashboard")}
        className="mt-6 bg-[#94d8df] px-6 py-2 rounded-md text-white hover:scale-105 transition"
      >
        Back to Dashboard
      </button>
    </div>
  );
};

export default Profile;
