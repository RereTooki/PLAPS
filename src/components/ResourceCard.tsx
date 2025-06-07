interface ResourceCardProps {
  title: string;
  type: "Video" | "Article";
  link: string;
  description: string;
}

const ResourceCard = ({
  title,
  type,
  link,
  description,
}: ResourceCardProps) => {
  return (
    <div className="bg-neutral-800 p-6 rounded-lg shadow-lg hover:shadow-xl transition-shadow">
      <h3 className="text-xl font-semibold mb-2">{title}</h3>
      <p className="text-sm text-gray-500 mb-4">Type: {type}</p>
      <p className="text-gray-300 mb-4">{description}</p>
      <a
        href={link}
        target="_blank"
        rel="noopener noreferrer"
        className="text-blue-400 hover:underline"
      >
        View Resource
      </a>
    </div>
  );
};

export default ResourceCard;
