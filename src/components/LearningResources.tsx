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

interface Book {
  "Book-Title": string;
  "Book-Author": string;
  Publisher: string;
  "Year-Of-Publication": number;
}

interface Video {
  0: string;
  1: string;
}

const LearningResources = () => {
  const [courses, setCourses] = useState<Course[]>([]);
  const [selectedCourse, setSelectedCourse] = useState<string | null>(null);
  const [books, setBooks] = useState<Book[]>([]);
  const [videos, setVideos] = useState<Video[]>([]);
  const [loading, setLoading] = useState(false);

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
      } catch (err) {
        console.error("Error fetching courses", err);
      }
    };

    fetchCourses();
  }, []);

  const handleCourseClick = async (courseName: string) => {
    setSelectedCourse(courseName);
    setLoading(true);
    try {
      const res = await axios.get(
        `https://subomi-api.onrender.com/recommendations/${courseName}`
      );
      setBooks(res.data.books);
      setVideos(res.data.videos);
    } catch (err) {
      console.error("Error fetching recommendations", err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-black/80 text-neutral-800 p-8">
      <div className="max-w-7xl mx-auto">
        <header className="mb-12 border-b pb-8">
          <h1 className="text-4xl lg:text-6xl font-bold text-center text-[#94d8df] xl:hidden">
            PLAPS - Learning Resources
          </h1>{" "}
          <h1 className="text-4xl xl:text-5xl font-bold text-center text-[#94d8df] hidden xl:block">
            PLAPS - Personalised Learning Academic Predictions System Learning
            Resources
          </h1>
          <p className="text-center text-gray-200 mt-4">
            Explore personalized learning resources curated to help you study
            smarter and perform better.
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
            ← Back to Courses
          </button>
        )}
        {!selectedCourse ? (
          <div className="flex flex-wrap justify-center gap-8">
            {courses.map((course, idx) => (
              <div
                key={idx}
                onClick={() => handleCourseClick(course.course_name)}
                className="bg-[#f0f9fa] border-4 border-double border-[#94d8df] shadow-xl rounded-xl p-6 w-full max-w-xs transition ease-in-out duration-500 delay-10 cursor-pointer hover:scale-[1.02]"
              >
                <h2 className="text-2xl font-bold mb-4 text-[#0077b6]">
                  📘 {course.course_name.toUpperCase()}
                </h2>
                <div className="text-base text-gray-800 space-y-2">
                  <p>🎯 Predicted Score: {course.predicted_performance}</p>
                  <p>⚙️ Difficulty: {course.difficulty_level}/10</p>
                  <p>⏱️ Study Time: {course.study_time} hrs/week</p>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div>
            <h2 className="text-3xl font-semibold text-[#94d8df] mb-6">
              📘 Books for {selectedCourse.toUpperCase()}
            </h2>
            {loading ? (
              <p className="text-white">Loading recommendations...</p>
            ) : (
              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                {books.map((book, idx) => (
                  <div
                    key={idx}
                    className="bg-[#f0f9fa] border-4 border-double border-[#94d8df] shadow-xl rounded-xl p-6 transition ease-in-out duration-500 delay-10 cursor-pointer hover:scale-[1.02]"
                  >
                    <h3 className="text-lg font-bold mb-2 capitalize">
                      {book["Book-Title"]}
                    </h3>
                    <p className="text-sm text-gray-700">
                      Author: {book["Book-Author"]}
                    </p>
                    <p className="text-sm text-gray-700">
                      Publisher: {book.Publisher}
                    </p>
                    <p className="text-sm text-gray-700">
                      Year: {book["Year-Of-Publication"]}
                    </p>
                  </div>
                ))}
              </div>
            )}
            <h2 className="text-3xl font-semibold text-[#94d8df] my-12 border-t pt-8">
              🎥 YouTube Resources
            </h2>{" "}
            <div className="space-y-4 mb-8">
              {videos.map((video, idx) => (
                <div
                  key={idx}
                  className="bg-[#f0f9fa] border-4 border-double border-[#94d8df] shadow-xl rounded-xl p-4 transition ease-in-out duration-500 delay-10 cursor-pointer hover:scale-[1.02]"
                >
                  <a
                    href={video[0]}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-gray-800 hover:underline underline-offset-2 font-semibold"
                  >
                    {video[1]}
                  </a>
                </div>
              ))}
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

export default LearningResources;
