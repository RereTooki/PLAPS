import { useEffect, useState } from "react";
import axios from "axios";
import PredictionChart from "../components/PredictionChart";
import SuggestionBox from "../components/SuggestionBox";
import { useNavigate } from "react-router-dom";

interface Course {
  course_name: string;
}

interface ResultData {
  course_name: string;
  predicted_grade: number;
  study_hours_per_week: number;
  personalized_advice: string;
}

const Results = () => {
  const [courses, setCourses] = useState<Course[]>([]);
  const [selectedCourse, setSelectedCourse] = useState<string | null>(null);
  const [result, setResult] = useState<ResultData | null>(null);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const userId = localStorage.getItem("user_id");

  useEffect(() => {
    const fetchCourses = async () => {
      try {
        const response = await axios.get<Course[]>(
          `https://subomi-api.onrender.com/courses/${userId}`
        );
        setCourses(response.data);
      } catch (err) {
        console.error("Failed to fetch courses", err);
      }
    };

    fetchCourses();
  }, [userId]);

  const handleCourseClick = async (courseName: string) => {
    setSelectedCourse(courseName);
    setLoading(true);
    try {
      const response = await axios.get<ResultData>(
        `https://subomi-api.onrender.com/users/${userId}/predictions/${courseName}`
      );
      setResult(response.data);
    } catch (error) {
      console.error("Failed to fetch result data", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-black/80 text-neutral-800 p-8">
      <div className="max-w-7xl mx-auto">
        <header className="mb-12 border-b pb-8">
          <div className="flex justify-between items-center">
            <h1 className="text-4xl lg:text-6xl font-bold text-center text-[#94d8df] w-full xl:hidden">
              PLAPS - Prediction Results
            </h1>{" "}
            <h1 className="text-4xl lg:text-6xl font-bold text-center text-[#94d8df] w-full hidden xl:block">
              PLAPS - Personalised Learning Academic Predictions System
              Prediction Results
            </h1>
          </div>
          <p className="text-center text-gray-200 mt-4">
            Curious about how you’re predicted to perform in your courses? Click
            any subject below to get an AI-generated performance overview, study
            hours, and actionable advice tailored just for you.
          </p>
        </header>{" "}
        {!selectedCourse ? (
          <button
            className="mb-8 text-white bg-[#94d8df] px-4 py-2 rounded-md hover:scale-[1.02] transition ease-in-out duration-500 delay-10 cursor-pointer"
            onClick={() => navigate("/dashboard")}
          >
            ← Back to Dashboard
          </button>
        ) : (
          <button
            className="mb-6 text-white bg-[#94d8df] px-4 py-2 rounded-md hover:scale-[1.02] transition ease-in-out duration-500 delay-10 cursor-pointer"
            onClick={() => setSelectedCourse(null)}
          >
            ← Back to Results
          </button>
        )}
        {!selectedCourse ? (
          <div className="flex flex-wrap justify-center gap-8">
            {courses.map((course, idx) => (
              <div
                key={idx}
                onClick={() => handleCourseClick(course.course_name)}
                className="bg-[#f0f9fa] border-4 border-double border-[#94d8df] shadow-xl rounded-xl p-6 transition ease-in-out duration-500 delay-10 cursor-pointer hover:scale-[1.02] sflex flex-col justify-center items-center"
              >
                <h2 className="capitalize text-2xl font-bold mb-4 text-[#0077b6]">
                  📊{course.course_name}
                </h2>
                <p className="text-sm text-gray-600 mt-2 text-center">
                  Tap to see predicted score and study tips.
                </p>
              </div>
            ))}
          </div>
        ) : loading ? (
          <p className="text-center text-gray-200 mt-10">
            Fetching prediction...
          </p>
        ) : result ? (
          <div className="space-y-10">
            <h2 className="text-3xl font-bold text-center capitalize text-[#94d8df]">
              Results for {result.course_name}
            </h2>

            <div className="grid lg:grid-cols-3 gap-8 justify-center">
              <div className="bg-[#f0f9fa] p-6 rounded-xl border-4 border-double border-[#94d8df] shadow-xl transition ease-in-out duration-500 delay-10 hover:scale-[1.02] flex flex-col justify-center items-center">
                <h3 className="text-lg font-medium mb-2">🎯 Predicted Grade</h3>
                <PredictionChart grade={result.predicted_grade} />
                <p className="mt-2 text-gray-600 text-sm text-center">
                  Based on your academic profile and inputs.
                </p>
              </div>

              <div className="bg-[#f0f9fa] p-6 rounded-xl border-4 border-double border-[#94d8df] shadow-xl transition ease-in-out duration-500 delay-10 hover:scale-[1.02] flex flex-col justify-center items-center">
                <h3 className="text-lg font-medium mb-2">
                  ⏳ Suggested Weekly Study Time
                </h3>
                <p className="text-4xl font-semibold text-blue-600">
                  {result.study_hours_per_week.toFixed(1)} hrs/week
                </p>
                <p className="text-sm text-gray-600 mt-2 text-center">
                  To improve or maintain this predicted performance.
                </p>
              </div>

              <div className="bg-[#f0f9fa] p-6 rounded-xl border-4 border-double border-[#94d8df] shadow-xl transition ease-in-out duration-500 delay-10 hover:scale-[1.02] flex flex-col justify-center items-center">
                <SuggestionBox advice={result.personalized_advice} />
              </div>
            </div>

            <div className="text-center text-sm text-gray-300 mt-10">
              Note: These results are AI-generated estimates based on current
              study habits, course difficulty, and other personal factors.
            </div>
          </div>
        ) : (
          <p className="text-center text-red-400">Failed to load prediction.</p>
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

export default Results;
