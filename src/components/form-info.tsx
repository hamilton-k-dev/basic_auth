import { Info } from "lucide-react";
interface FormInfoProps {
  message?: string;
}

export const FormInfo = ({ message }: FormInfoProps) => {
  if (!message) {
    return null;
  }
  return (
    <div className="bg-blue-700/15 p-3 rounded-md flex items-center gap-x-2 text-sm text-blue-700">
      <Info size={20} />
      <p>{message}</p>
    </div>
  );
};
