const QRResults = () => {
    const verificationURL = "https://pixelblot.ai/verify/4e7f92ac2";
  
    return (
      <div className="relative w-[400px] h-[300px] bg-black text-white flex flex-col justify-between px-6 py-4 rounded-none">
        {/* Top: Stats and Header */}
        <div>
          <p className="text-lg font-semibold text-purple-400 mb-6">You are 80% human!</p>
  
          <div className="grid grid-cols-2 gap-y-2 text-sm opacity-80">
          <span>Last score:</span>
          <span className="text-right">60%</span>
            <span>Average score:</span>
            <span className="text-right">75%</span>
            <span>Attempts:</span>
            <span className="text-right">3</span>
            <span>Last:</span>
            <span className="text-right">X days ago</span>
          </div>
        </div>
  
        {/* Bottom: Verification link */}
        <div className="text-xs opacity-60 mt-6">
          <span className="block mb-1">Verification link:</span>
          <a
            href={verificationURL}
            target="_blank"
            rel="noopener noreferrer"
            className="text-purple-400 underline break-all"
          >
            {verificationURL}
          </a>
        </div>
      </div>
    );
  };
  
  export default QRResults;