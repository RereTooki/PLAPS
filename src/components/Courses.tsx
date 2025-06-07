import { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

interface Course {
  course_name: string;
  hours_for_lecture: number;
  learning_type: number;
  difficulty_level: number;
  predicted_performance: number;
  study_time: number;
  publisher: string;
  textbooks: string;
  youtube_URL: string;
  advice: string;
}

const Courses = () => {
  const [courses, setCourses] = useState<Course[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchCourses = async () => {
      try {
        const userId = localStorage.getItem("user_id");
        if (!userId) throw new Error("User not logged in");

        const response = await axios.get<Course[]>(
          `https://subomi-api.onrender.com/courses/${userId}`
        );
        setCourses(response.data);
      } catch (err: any) {
        setError("Failed to fetch courses.");
      } finally {
        setLoading(false);
      }
    };

    fetchCourses();
  }, []);

  return (
    <div className="min-h-screen bg-black/80 text-white p-8">
      <div className="mmax-w-7xl mx-auto">
        <header className="mb-12 border-b pb-8">
          <h1 className="text-4xl lg:text-6xl font-bold text-center text-[#94d8df] xl:hidden">
            PLAPS - Tracked Courses
          </h1>
          <h1 className="text-4xl xl:text-5xl font-bold text-center text-[#94d8df] hidden xl:block">
            PLAPS - Personalised Learning Academic Predictions System Tracked
            Courses
          </h1>
          <p className="text-center text-gray-200 mt-4">
            These are your currently tracked courses along with predicted
            outcomes and helpful resources.
          </p>
        </header>
        <button
          className="mb-8 text-white bg-[#94d8df] px-4 py-2 rounded-md hover:scale-[1.02] transition ease-in-out duration-500 delay-10 cursor-pointer"
          onClick={() => navigate("/dashboard")}
        >
          ← Back to Dashboard
        </button>
        {loading ? (
          <p className="text-center text-gray-300">Loading courses...</p>
        ) : error ? (
          <p className="text-center text-red-500">{error}</p>
        ) : (
          <div className="grid gap-10 sjustify-center">
            {courses.map((course, index) => (
              <div
                key={index}
                className="bg-[#f0f9fa] p-2 tab:p-8 rounded-xl border-4 border-double border-[#94d8df] shadow-xl transition ease-in-out duration-500 delay-10 cursor-pointer hover:scale-[1.02] smax-w-3xl w-full mb-8"
              >
                {" "}
                <div
                  key={index}
                  className="bg-neutral-800 p-6 rounded-xl shadow-lg hover:shadow-xl transition-all duration-300"
                >
                  <h2 className="text-2xl font-semibold mb-3 capitalize">
                    {course.course_name}
                  </h2>
                  <div className="space-y-1 text-sm lg:text-md text-gray-200">
                    <p>
                      🎓 <strong>Lecture Hours:</strong>{" "}
                      {course.hours_for_lecture}
                    </p>
                    <p>
                      📈 <strong>Predicted Performance:</strong>{" "}
                      {course.predicted_performance}/100
                    </p>
                    <p>
                      📚 <strong>Study Time:</strong> {course.study_time}{" "}
                      hrs/week
                    </p>
                    <p>
                      🔥 <strong>Difficulty Level:</strong>{" "}
                      {course.difficulty_level}/10
                    </p>
                    <p>
                      🏢 <strong>Publisher:</strong> {course.publisher}
                    </p>
                  </div>

                  <div className="mt-5 space-y-4">
                    <details className="bg-white rounded-lg px-4 py-2 transition ease-in-out duration-500 delay-10 cursor-pointer hover:scale-[1.01]">
                      <summary className="font-medium text-black">
                        📖 View Textbooks
                      </summary>
                      <p className="mt-2 text-gray-800 whitespace-pre-line capitalize underline underline-offset-2">
                        {course.textbooks}
                      </p>
                    </details>

                    <details className="bg-white rounded-lg px-4 py-2 transition ease-in-out duration-500 delay-10 cursor-pointer hover:scale-[1.01]">
                      <summary className="font-medium text-black">
                        ▶️ View YouTube Links
                      </summary>
                      <ul className="mt-2 list-disc ml-6 text-blue-600 whitespace-pre-line">
                        {course.youtube_URL.split("\n").map((url, i) => (
                          <li key={i}>
                            <a
                              href={url.trim()}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="underline"
                            >
                              {url.trim()}
                            </a>
                          </li>
                        ))}
                      </ul>
                    </details>

                    <details className="bg-white rounded-lg px-4 py-2 transition ease-in-out duration-500 delay-10 cursor-pointer hover:scale-[1.01]">
                      <summary className="font-medium text-black">
                        🧠 View Study Advice
                      </summary>
                      <p className="mt-2 text-gray-800 whitespace-pre-line">
                        {course.advice}
                      </p>
                    </details>
                  </div>
                </div>
              </div>
            ))}
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

export default Courses;
