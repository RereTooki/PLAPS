import { useNavigate } from "react-router-dom";

interface InsightCardProps {
  title: string;
  value: string;
  icon: string;
  linkTo?: string;
}

const InsightCard = ({ title, value, icon, linkTo }: InsightCardProps) => {
  const navigate = useNavigate();

  return (
    <div
      onClick={() => linkTo && navigate(linkTo)}
      className="bg-neutral-800 hover:bg-neutral-700 cursor-pointer rounded-lg p-6 shadow-md transition"
    >
      <div className="flex items-center space-x-4">
        <div className="text-3xl">{icon}</div>
        <div>
          <p className="text-sm text-gray-400">{title}</p>
          <h2 className="text-lg font-bold">{value}</h2>
        </div>
      </div>
    </div>
  );
};

export default InsightCard;
