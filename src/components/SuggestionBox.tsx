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

  // Split the advice string into meaningful blocks
  const aiAnalysis = advice
    .match(/\[AI Analysis\]:([\s\S]*?)\[|$/)?.[1]
    ?.trim();
  const learningStyleBlock = advice
    .match(/\[Learning Style-Based Recommendations\]:([\s\S]*)/)?.[1]
    ?.trim();

  // Further extract parts inside the learning style block
  const textbooks = learningStyleBlock
    ?.match(/Textbooks:\s*([\s\S]*?)YouTube Videos:/)?.[1]
    ?.split("\n")
    .map((line) => line.replace(/^\s*-\s*/, "").trim())
    .filter(Boolean);

  const videos = learningStyleBlock
    ?.match(/YouTube Videos:\s*([\s\S]*)/)?.[1]
    ?.split("\n")
    .map((line) => {
      const match = line.match(/-\s*(https?:\/\/\S+)\s*\((.*?)\)/);
      return match ? { url: match[1], title: match[2] } : null;
    })
    .filter((item): item is { url: string; title: string } => !!item);

  return (
    <div className="bg-neutral-800 p-6 rounded-lg shadow-lg max-h-[70vh] overflow-y-scroll">
      <h2 className="text-xl font-semibold mb-4 text-white">
        💡 Personalized Advice
      </h2>

      {aiAnalysis && (
        <div className="mb-6">
          <h3 className="text-lg font-semibold text-[#94d8df] mb-2">
            🧠 AI Analysis
          </h3>
          <p className="text-gray-300 whitespace-pre-line">{aiAnalysis}</p>
        </div>
      )}

      {textbooks && textbooks.length > 0 && (
        <div className="mb-6">
          <h3 className="text-lg font-semibold text-[#94d8df] mb-2">
            📚 Recommended Textbooks
          </h3>
          <ul className="list-disc list-inside text-gray-300 space-y-1">
            {textbooks.map((book, idx) => (
              <li key={idx}>{book}</li>
            ))}
          </ul>
        </div>
      )}

      {videos && videos.length > 0 && (
        <div>
          <h3 className="text-lg font-semibold text-[#94d8df] mb-2">
            🎥 YouTube Videos
          </h3>
          <ul className="list-disc list-inside text-blue-400 space-y-1">
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
