interface SuggestionBoxProps {
  advice: string;
}

const SuggestionBox = ({ advice }: SuggestionBoxProps) => {
  return (
    <div className="bg-neutral-800 p-6 rounded-lg shadow-lg max-h-[70vh] overflow-y-scroll">
      <h2 className="text-xl font-semibold mb-4">💡 Personalized Advice</h2>
      <p className="text-gray-300 leading-relaxed">{advice}</p>
    </div>
  );
};

export default SuggestionBox;
