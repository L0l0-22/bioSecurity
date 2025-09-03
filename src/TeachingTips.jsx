import {
  FaClock,
  FaListAlt,
  FaSmile,
  FaVideo,
  FaRegPauseCircle,
  FaFileAlt,
  FaCheckCircle,
} from "react-icons/fa";
import { MdOutlineSpellcheck } from "react-icons/md";
import { IoMdCheckmarkCircleOutline } from "react-icons/io";

const tips = [
  {
    icon: <FaClock />,
    text: "Keep your session under 20 minutes to maximize attention.",
    color: "text-sec",
  },
  {
    icon: <FaListAlt />,
    text: "Start with a quick summary of what students will learn today.",
    color: "text-sec",
  },
  {
    icon: <FaSmile />,
    text: "Speak slowly, smile, and use simple visual examples.",
    color: "text-sec",
  },
  {
    icon: <FaVideo />,
    text: "Record in a quiet place with consistent lighting.",
    color: "text-sec",
  },
  {
    icon: <FaRegPauseCircle />,
    text: "Pause between sections to give students room to think.",
    color: "text-forth",
  },
  {
    icon: <FaFileAlt />,
    text: "Name your files clearly, e.g. Lecture3_ConditionalStatements.pdf.",
    color: "text-forth",
  },
  {
    icon: <IoMdCheckmarkCircleOutline />,
    text: "Upload both slides and a short summary if possible.",
    color: "text-forth",
  },
  {
    icon: <MdOutlineSpellcheck />,
    text: "Check that the file opens correctly before publishing.",
    color: "text-forth",
  },
  {
    icon: <FaCheckCircle />,
    text: "End each session with 1 takeaway and 1 question for students.",
    color: "text-forth",
  },
];

export default function TeachingTips() {
  return (
    <div className="bg-gray-100 h-screen">
    <div className="max-w-4xl mx-auto pt-20 ">
        <div className="bg-white p-6 md:p-12 rounded-lg shadow-md border">
            <h1 className="text-3xl md:text-4xl font-bold mb-10 text-sec text-center">Teaching Tips</h1>
            <ul className="space-y-6">
                {tips.map((tip, index) => (
                <li key={index} className="flex items-start gap-4">
                    <span className={`text-xl md:text-2xl mt-1 ${tip.color}`}>{tip.icon}</span>
                    <p className="text-gray-800 text-base md:text-lg">{tip.text}</p>
                </li>
                ))}
            </ul>
        </div>
    </div>
    </div>
  );
}
