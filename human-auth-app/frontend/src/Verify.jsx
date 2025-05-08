import { useParams, useNavigate } from "react-router-dom";

const Verify = () => {
  const { token } = useParams();
  const navigate = useNavigate();

  // MOCKED RESULT — replace with real API call later
  const result = {
    confidence: 82,
    last_score: 66,
    avg_score: 74,
    attempts: 4,
    last_seen: "2025-05-08",
  };

  return (
    <div className="min-h-screen bg-black text-white relative flex items-center justify-center px-6">
      {/* Top-left nav */}
      <button
        onClick={() => navigate("/")}
        className="absolute top-4 left-4 text-xl font-semibold tracking-wide hover:underline"
      >
        pixelblot.ai
      </button>

      {/* Stylized frame */}
      <div className="relative w-[400px] h-[300px] bg-black flex flex-col justify-between px-6 py-4">
        {/* Animated frame corners (same as Slider) */}
        <div className="absolute top-0 left-0 w-[30px] h-[2px] bg-white transition-all" />
        <div className="absolute top-0 left-0 w-[2px] h-[30px] bg-white transition-all" />
        <div className="absolute bottom-0 right-0 w-[30px] h-[2px] bg-white transition-all" />
        <div className="absolute bottom-0 right-0 w-[2px] h-[30px] bg-white transition-all" />

        {/* Content */}
        <div>
          <p className="text-lg font-semibold text-purple-400 mb-6">
            This person is {result.confidence}% human!
          </p>
          <div className="grid grid-cols-2 gap-y-2 text-sm opacity-80">
            <span>Last score:</span>
            <span className="text-right">{result.last_score}%</span>
            <span>Average score:</span>
            <span className="text-right">{result.avg_score}%</span>
            <span>Attempts:</span>
            <span className="text-right">{result.attempts}</span>
            <span>Last seen:</span>
            <span className="text-right">{result.last_seen}</span>
          </div>
        </div>

        {/* Token */}
        <div className="text-xs opacity-60 mt-6">
          <span className="block mb-1">Verification ID:</span>
          <code className="text-purple-400 break-all">{token}</code>
        </div>
      </div>
    </div>
  );
};

export default Verify;