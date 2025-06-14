interface SuggestionBoxProps {
  advice: string;
}

const SuggestionBox = ({ advice }: SuggestionBoxProps) => {
  if (!advice) {
    return (
      <div className="bg-neutral-800 p-6 rounded-lg shadow-lg">
        <h2 className="text-xl font-semibold mb-4">💡 Personalized Advice</h2>
        <p className="text-gray-400">No advice available.</p>
      </div>
    );
  }

  const aiAnalysisMatch = advice.match(
    /\[AI Analysis\]:([\s\S]*?)\[Learning Style-Based Recommendations]/
  );
  const aiAnalysis = aiAnalysisMatch?.[1]?.trim();

  const aiSummary = aiAnalysis?.match(
    /Based on your inputs, your predicted score in this course is [^.\n]*/
  )?.[0];

  const learningStyleIntroMatch = advice.match(
    /\[Learning Style-Based Recommendations\]:\s*(.*)/
  );
  const learningStyleIntro = learningStyleIntroMatch?.[1]
    ?.split("Textbooks:")[0]
    ?.trim();

  const suggestedType = aiAnalysis
    ?.match(/Suggested Learning Type.*?:\s*(.*?)(?:\.\s|$)/i)?.[1]
    ?.trim();
  const weeklyHours = aiAnalysis?.match(
    /studying this course for approximately\s*(\d+\.?\d*)\s*hours?/i
  )?.[1];

  const textbooksBlock = advice.match(
    /Textbooks:\s*([\s\S]*?)YouTube Videos:/
  )?.[1];
  const textbooks = textbooksBlock
    ?.split("\n")
    .map((line) => line.replace(/^\s*-\s*/, "").trim())
    .filter(Boolean);

  const videoBlock = advice.match(/YouTube Videos:\s*([\s\S]*)/)?.[1];
  const videos = videoBlock
    ?.split("\n")
    .map((line) => {
      const match = line.match(/-\s*(https?:\/\/\S+)\s*\((.*?)\)/);
      return match ? { url: match[1], title: match[2] } : null;
    })
    .filter((item): item is { url: string; title: string } => !!item);

  return (
    <div className="bg-neutral-800 p-6 rounded-lg shadow-lg max-h-[70vh] overflow-y-scroll">
      <h2 className="text-xl font-semibold mb-6 text-white">
        💡 Personalized Advice
      </h2>

      {aiSummary && (
        <div className="mb-8">
          <h3 className="text-lg font-semibold text-[#94d8df] mb-2">
            🧠 AI Analysis
          </h3>
          <p className="text-gray-300">{aiSummary}</p>
        </div>
      )}

      {suggestedType && (
        <div className="mb-8">
          <h3 className="text-lg font-semibold text-[#94d8df] mb-2">
            📌 Suggested Learning Type
          </h3>
          <p className="text-gray-300">{suggestedType}</p>
        </div>
      )}

      {weeklyHours && (
        <div className="mb-8">
          <h3 className="text-lg font-semibold text-[#94d8df] mb-2">
            ⏱️ Weekly Study Hours
          </h3>
          <p className="text-gray-300">{weeklyHours} hrs/week</p>
        </div>
      )}

      {learningStyleIntro && (
        <div className="mb-8">
          <h3 className="text-lg font-semibold text-[#94d8df] mb-2">
            🔍 Learning Style-Based Recommendations
          </h3>
          <p className="text-gray-300">{learningStyleIntro}</p>
        </div>
      )}

      {textbooks && textbooks.length > 0 && (
        <div className="mb-8">
          <h3 className="text-lg font-semibold text-[#94d8df] mb-2">
            📚 Textbooks
          </h3>
          <ul className="list-disc list-inside text-gray-300 space-y-2">
            {textbooks.map((book, idx) => (
              <li key={idx}>{book}</li>
            ))}
          </ul>
        </div>
      )}

      {videos && videos.length > 0 && (
        <div className="mb-2">
          <h3 className="text-lg font-semibold text-[#94d8df] mb-2">
            🎥 YouTube Videos
          </h3>
          <ul className="list-disc list-inside text-blue-400 space-y-2">
            {videos.map((video, idx) => (
              <li key={idx}>
                <a
                  href={video.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:underline"
                >
                  {video.title}
                </a>
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
};

export default SuggestionBox;
