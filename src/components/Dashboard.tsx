import { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate, Link } from "react-router-dom";

interface Resource {
  title: string;
  link: string;
}

interface DashboardResponse {
  user_id: number;
  name: string;
  courses: {
    course_name: string;
    predicted_grade: number;
    weekly_study_hours: number;
    resources: {
      textbooks: string[];
      videos: string[];
      publishers: string[];
    };
    advice: string;
  }[];
  overall_stats: {
    average_predicted_grade?: number;
    total_weekly_study_hours?: number;
    number_of_courses?: number;
    performance_trend?: string;
    recommendedHours?: number;
    resources?: Resource[];
  };
}

const Dashboard = () => {
  const [data, setData] = useState<DashboardResponse | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchDashboard = async () => {
      try {
        const userId = localStorage.getItem("user_id");
        if (!userId) {
          navigate("/auth");
          return;
        }

        const response = await axios.get<DashboardResponse>(
          `https://subomi-api.onrender.com/users/${userId}/dashboard`
        );

        setData(response.data);
      } catch (err: any) {
        if (axios.isAxiosError(err) && err.response?.status === 404) {
          setData(null);
        } else {
          console.error("Dashboard fetch failed:", err);
          setError("Failed to load dashboard data.");
        }
      } finally {
        setLoading(false);
      }
    };

    fetchDashboard();
  }, [navigate]);

  const handleInputClick = () => navigate("/input");
  const handleViewResults = () => navigate("/results");
  const handleCoursesClick = () => navigate("/courses");

  return (
    <div className="min-h-screen bg-black/80 text-neutral-800 p-8">
      <div className="max-w-7xl mx-auto">
        <header className="mb-12 border-b pb-8">
          <h1 className="text-4xl lg:text-6xl font-bold text-center text-[#94d8df] xl:hidden">
            PLAPS - Dashboard
          </h1>
          <h1 className="text-4xl xl:text-5xl font-bold text-center text-[#94d8df] hidden xl:block">
            PLAPS - Personalised Learning Academic Predictions System Dashboard
          </h1>
          <p className="text-center text-gray-200 mt-4">
            Welcome to your learning optimization center.
          </p>
        </header>

        <div className="flex flex-col lg:flex-row justify-between items-center mb-10 gap-6 lg:gap-0">
          <Link
            to="/resources"
            className="text-[#94d8df] hover:underline font-medium transition ease-in-out duration-500 delay-10 cursor-pointer hover:scale-[1.02]"
          >
            Go to Learning Resources
          </Link>
          <button
            onClick={handleInputClick}
            className="bg-[#94d8df] text-white font-semibold py-2 px-6 rounded-md hover:bg-[#6dc8d2] transition transition ease-in-out duration-500 delay-10 cursor-pointer hover:scale-[1.02]"
          >
            Fill Academic Details
          </button>
        </div>

        {loading ? (
          <p className="text-center text-gray-500">Loading dashboard...</p>
        ) : error ? (
          <p className="text-center text-red-500">{error}</p>
        ) : data === null ||
          data.overall_stats?.average_predicted_grade === undefined ? (
          <div className="text-center mt-20">
            <h2 className="text-2xl font-bold mb-4 text-gray-200">
              Hello there, Welcome{data?.name ? `, ${data.name}` : ""}! 👋
            </h2>
            <p className="text-gray-500 mb-6">
              To get started with your performance predictions, please fill in a
              few quick details.
            </p>
            <button
              onClick={handleInputClick}
              className="bg-[#94d8df] text-white px-6 py-2 rounded-md font-semibold hover:bg-[#6dc8d2] transition"
            >
              Go to Input Page
            </button>
          </div>
        ) : (
          <div className="space-y-12">
            <section className="grid gap-6 md:grid-cols-2 xl:grid-cols-4">
              <StatCard
                title="🎯 Avg Predicted Grade"
                value={`${data.overall_stats.average_predicted_grade}/100`}
              />
              <StatCard
                title="⏳ Total Study Hours"
                value={`${
                  data.overall_stats.total_weekly_study_hours ?? "N/A"
                } hrs/week`}
              />
              <div onClick={handleCoursesClick} className="cursor-pointer">
                <StatCard
                  title="📘 Courses Tracked"
                  value={`${data.overall_stats.number_of_courses ?? "N/A"}`}
                />
              </div>
              <StatCard
                title="📈 Performance Trend"
                value={data.overall_stats.performance_trend ?? "Not Available"}
              />
            </section>

            {data.overall_stats.resources?.length ? (
              <section className="border rounded-lg p-6 bg-[#f9fafa]">
                <h2 className="text-xl font-semibold text-[#333] mb-4">
                  📚 Top Resources
                </h2>
                <ul className="list-disc list-inside space-y-2 text-[#1e4f57]">
                  {data.overall_stats.resources.map((resource, idx) => (
                    <li key={idx}>
                      <a
                        href={resource.link}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="hover:underline"
                      >
                        {resource.title}
                      </a>
                    </li>
                  ))}
                </ul>
              </section>
            ) : null}

            <div className="text-center transition ease-in-out duration-500 delay-10 cursor-pointer hover:scale-[1.02]">
              <button
                onClick={handleViewResults}
                className="bg-[#94d8df] text-white px-8 py-3 rounded-md font-semibold hover:bg-[#6dc8d2] transition"
              >
                View Detailed Results
              </button>
            </div>
          </div>
        )}
      </div>

      <footer className="text-center text-sm  transition ease-in-out duration-500 delay-10 cursor-pointer hover:scale-[1.02] fixed bottom-2 lg:bottom-4 text-white ">
        © 2025{" "}
        <a
          href="https://www.linkedin.com/in/rerel-oluwa-tooki-cnvp-b53396253/"
          target="_blank"
          className="underline underline-offset-2 text-[#94d8df]"
        >
          Subomi Ibukun
        </a>
      </footer>
    </div>
  );
};

const StatCard = ({ title, value }: { title: string; value: string }) => (
  <div className="border-4 rounded-lg p-6 bg-[#f0f9fa] hover:shadow-lg transition shadow-xl border-double border-[#94d8df] transition ease-in-out duration-500 delay-10 cursor-pointer hover:scale-[1.02]">
    <h2 className="text-md font-medium text-[#555] mb-1">{title}</h2>
    <p className="text-2xl font-bold text-[#1c2c2e]">{value}</p>
  </div>
);

export default Dashboard;
