import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import LogoutButton from "./LogoutButton";

const InputForm = () => {
  const [formData, setFormData] = useState({
    courseName: "",
    lectureHours: "",
    extracurricularHours: "",
    difficultyLevel: "",
    learningType: [] as string[], // updated to array
  });

  const navigate = useNavigate();

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const mapLearningTypeToInt = (types: string[]): number => {
    const key = types
      .map((t) => t.toLowerCase())
      .sort()
      .join(",");

    const mapping: Record<string, number> = {
      textual: 1,
      visual: 2,
      interactive: 3,
      "textual,visual": 4,
      "interactive,textual": 5,
      "interactive,visual": 6,
      "interactive,textual,visual": 7,
    };

    return mapping[key] ?? 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const userId = localStorage.getItem("userId");
    if (!userId) {
      alert("User ID not found. Please log in again.");
      navigate("/login");
      return;
    }

    try {
      const {
        courseName,
        lectureHours,
        extracurricularHours,
        difficultyLevel,
        learningType,
      } = formData;

      const mappedLearningType = mapLearningTypeToInt(learningType);
      console.log("Mapped learning_type to be sent:", mappedLearningType);

      await axios.post(
        `https://subomi-api.onrender.com/courses?user_id=${userId}`,
        {
          course_name: courseName,
          hours_for_lecture: parseInt(lectureHours),
          learning_type: mappedLearningType,
          difficulty_level: parseInt(difficultyLevel),
          extracurricular_activities: parseInt(extracurricularHours),
        }
      );

      alert("Data submitted successfully!");
      navigate("/dashboard");
    } catch (error) {
      console.error("Submission error", error);
      alert("Something went wrong. Try again.");
    }
  };

  return (
    <div className="min-h-screen bg-black/80 text-white p-8 flex items-center justify-center">
      <div className="max-w-7xl w-full">
        <header className="mb-12 border-b pb-8">
          <h1 className="text-4xl xl:text-5xl font-bold text-center text-[#94d8df] xl:hidden">
            PLAPS - Input Form
          </h1>
          <h1 className="text-4xl xl:text-5xl font-bold text-center text-[#94d8df] hidden xl:block">
            PLAPS - Personalised Learning Academic Predictions System Input Form
          </h1>
          <p className="text-center text-gray-200 mt-4">
            Help PLAPS personalize your learning journey.
          </p>
        </header>

        <button
          className="mb-8 text-white bg-[#94d8df] px-4 py-2 rounded-md hover:scale-[1.02] transition ease-in-out duration-500 delay-10 cursor-pointer"
          onClick={() => navigate("/dashboard")}
        >
          ← Back to Dashboard
        </button>

        <div
          className="bg-[#f0f9fa] p-2 md:p-4 tab:p-8 rounded-lg shadow-xl border-4 border-double border-[#94d8df] w-full max-w-3xl mx-auto transition ease-in-out duration-500 delay-10 hover:scale-[1.02] mb-10"
          data-aoss="fade-up"
          data-aoss-duration="1200"
        >
          <div className="bg-neutral-800 p-6 rounded-xl shadow-lg hover:shadow-xl transition-all duration-300">
            <form onSubmit={handleSubmit} className="space-y-6 text-lg">
              <div className="flex flex-col">
                <label className="text-sm mb-1" htmlFor="courseName">
                  Course Name
                </label>
                <input
                  type="text"
                  name="courseName"
                  id="courseName"
                  value={formData.courseName}
                  onChange={handleChange}
                  required
                  className="bg-white text-black rounded-md p-3 text-base"
                  placeholder="e.g., Calculus"
                />
              </div>

              <div className="flex flex-col">
                <label className="text-sm mb-1" htmlFor="lectureHours">
                  Hours of Lectures per Week
                </label>
                <input
                  type="number"
                  name="lectureHours"
                  id="lectureHours"
                  value={formData.lectureHours}
                  onChange={handleChange}
                  required
                  className="bg-white text-black rounded-md p-3 text-base"
                  placeholder="e.g., 2"
                />
              </div>

              <div className="flex flex-col">
                <label className="text-sm mb-1" htmlFor="extracurricularHours">
                  Number of Extracurricular Activities Done
                </label>
                <input
                  type="number"
                  name="extracurricularHours"
                  id="extracurricularHours"
                  value={formData.extracurricularHours}
                  onChange={handleChange}
                  required
                  className="bg-white text-black rounded-md p-3 text-base"
                  placeholder="e.g., 5"
                />
              </div>

              <div className="flex flex-col">
                <label className="text-sm mb-1" htmlFor="difficultyLevel">
                  Perceived Difficulty Level
                </label>
                <select
                  name="difficultyLevel"
                  id="difficultyLevel"
                  value={formData.difficultyLevel}
                  onChange={handleChange}
                  required
                  className="bg-white text-black rounded-md p-3 text-base"
                >
                  <option value="">Select</option>
                  {Array.from({ length: 10 }, (_, i) => (
                    <option key={i + 1} value={i + 1}>
                      {i + 1}
                    </option>
                  ))}
                </select>
              </div>

              <div className="flex flex-col">
                <label className="text-sm mb-1">
                  Preferred Learning Type{" "}
                  <span className="text-xs text-gray-400">
                    (Select one or more)
                  </span>
                </label>
                <div className="flex flex-wrap gap-4">
                  {["textual", "visual", "interactive"].map((type) => (
                    <label
                      key={type}
                      className="flex items-center gap-2 text-base"
                    >
                      <input
                        type="checkbox"
                        value={type}
                        checked={formData.learningType.includes(type)}
                        onChange={(e) => {
                          const { checked, value } = e.target;
                          setFormData((prev) => {
                            const updated = checked
                              ? [...prev.learningType, value]
                              : prev.learningType.filter((t) => t !== value);
                            return {
                              ...prev,
                              learningType: updated,
                            };
                          });
                        }}
                        className="accent-[#94d8df]"
                      />
                      {type.charAt(0).toUpperCase() + type.slice(1)}
                    </label>
                  ))}
                </div>
              </div>

              <button
                type="submit"
                className="bg-[#94d8df] text-white font-semibold py-3 rounded-md w-full transition ease-in-out duration-500 delay-10 hover:scale-[1.02] text-sm lg:text-base xl:text-lg"
              >
                Submit Data
              </button>
            </form>
          </div>
        </div>

        <footer className="text-center text-sm transition ease-in-out duration-500 delay-10 cursor-pointer hover:scale-[1.02] fixed bottom-2 lg:bottom-4 text-white">
          © 2025{" "}
          <a
            href="https://www.linkedin.com/in/rerel-oluwa-tooki-cnvp-b53396253/"
            target="_blank"
            className="underline underline-offset-2 text-[#94d8df]"
          >
            Subomi Ibukun
          </a>
        </footer>
        <LogoutButton />
      </div>
    </div>
  );
};

export default InputForm;
