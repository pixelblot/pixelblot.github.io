import { useEffect, useRef } from "react";

const SignatureCanvas = () => {
  const canvasRef = useRef(null);
  const isDrawing = useRef(false);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    ctx.strokeStyle = "rgba(250,250,250,0.2)";
    ctx.lineWidth = 4;
    ctx.lineJoin = "round";
    ctx.lineCap = "round";

    const start = (e) => {
      isDrawing.current = true;
      ctx.beginPath();
      ctx.moveTo(e.offsetX, e.offsetY);
    };
    const draw = (e) => {
      if (!isDrawing.current) return;
      ctx.lineTo(e.offsetX, e.offsetY);
      ctx.stroke();
    };
    const stop = () => {
      isDrawing.current = false;
      ctx.closePath();
    };

    const getTouchPos = (touchEvent) => {
      const rect = canvas.getBoundingClientRect();
      return {
        x: touchEvent.touches[0].clientX - rect.left,
        y: touchEvent.touches[0].clientY - rect.top,
      };
    };

    const startTouch = (e) => {
      e.preventDefault();
      const { x, y } = getTouchPos(e);
      isDrawing.current = true;
      ctx.beginPath();
      ctx.moveTo(x, y);
    };
    const moveTouch = (e) => {
      e.preventDefault();
      if (!isDrawing.current) return;
      const { x, y } = getTouchPos(e);
      ctx.lineTo(x, y);
      ctx.stroke();
    };
    const stopTouch = (e) => {
      e.preventDefault();
      isDrawing.current = false;
      ctx.closePath();
    };

    canvas.addEventListener("mousedown", start);
    canvas.addEventListener("mousemove", draw);
    canvas.addEventListener("mouseup", stop);
    canvas.addEventListener("mouseleave", stop);

    canvas.addEventListener("touchstart", startTouch, { passive: false });
    canvas.addEventListener("touchmove", moveTouch, { passive: false });
    canvas.addEventListener("touchend", stopTouch);

    return () => {
      canvas.removeEventListener("mousedown", start);
      canvas.removeEventListener("mousemove", draw);
      canvas.removeEventListener("mouseup", stop);
      canvas.removeEventListener("mouseleave", stop);

      canvas.removeEventListener("touchstart", startTouch);
      canvas.removeEventListener("touchmove", moveTouch);
      canvas.removeEventListener("touchend", stopTouch);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      width={400}
      height={300}
      className="bg-black rounded-none"
    />
  );
};

export default SignatureCanvas;