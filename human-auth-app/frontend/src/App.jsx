import { useState, useEffect, useRef } from "react";
import logo from "./assets/logo.png";
import Slider from "./components/Slider";

const App = () => {
  const [showSlider, setShowSlider] = useState(false);
  const dataRef = useRef([]);
  const userIdRef = useRef(Date.now());
  const sessionIdRef = useRef(Date.now() + Math.floor(Math.random() * 1e5));

  const handleVerifyClick = () => setShowSlider(true);
  const handleReset = () => setShowSlider(false);

  const downloadCSV = () => {
    const data = dataRef.current;
    if (!data.length) return;

    const csvContent =
      "data:text/csv;charset=utf-8," +
      `user_id,session_id,timestamp,x,y\n` +
      data
        .map(([t, x, y]) => `${userIdRef.current},${sessionIdRef.current},${t},${x},${y}`)
        .join("\n");

    const encodedUri = encodeURI(csvContent);
    const link = document.createElement("a");
    link.setAttribute("href", encodedUri);
    link.setAttribute("download", `cursor_data_${Date.now()}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  useEffect(() => {
    const data = dataRef.current;
    let interval;

    const trackPosition = () => {
      interval = setInterval(() => {
        const x = window.mouseX ?? 0;
        const y = window.mouseY ?? 0;
        data.push([Date.now(), x, y]);
      }, 16); // 60Hz
    };

    const mouseMoveHandler = (e) => {
      window.mouseX = e.clientX;
      window.mouseY = e.clientY;
    };

    document.addEventListener("mousemove", mouseMoveHandler);
    window.addEventListener("cursor-export", downloadCSV);
    window.addEventListener("beforeunload", downloadCSV); // <--- this line ensures export on close/reload

    trackPosition();

    return () => {
      clearInterval(interval);
      document.removeEventListener("mousemove", mouseMoveHandler);
      window.removeEventListener("cursor-export", downloadCSV);
      window.removeEventListener("beforeunload", downloadCSV); // <--- clean up
    };
  }, []);

  return (
    <div className="min-h-screen bg-black text-white relative">
      <button
        onClick={handleReset}
        className="absolute top-4 left-4 text-xl font-semibold tracking-wide hover:underline"
      >
        pixelblot.ai
      </button>
      <div className="flex items-center justify-center h-screen px-4">
        {!showSlider ? (
          <div className="flex flex-col items-center space-y-10 w-full max-w-3xl">
            <img
              src={logo}
              width={400}
              height={300}
              alt="Logo"
              onClick={handleVerifyClick}
              className="w-64 h-64 object-contain cursor-pointer"
            />
            <button
              onClick={handleVerifyClick}
              className="w-52 text-center py-4 px-8 border-t-2 border-purple-500 text-white text-xl font-bold transition-all"
            >
              Are you human?
            </button>
          </div>
        ) : (
          <Slider />
        )}
      </div>
    </div>
  );
};

export default App;