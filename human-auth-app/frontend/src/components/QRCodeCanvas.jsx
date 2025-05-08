import { useEffect, useRef } from "react";
import QRCode from "qrcode";

const QRCodeCanvas = () => {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    const width = canvas.width;
    const height = canvas.height;

    const qrData = `pixelblot-auth-${Math.random().toString(36).slice(2)}`;

    // Generate QR code matrix
    const qr = QRCode.create(qrData, {
      errorCorrectionLevel: 'H',
      version: 8
    });

    const cellCount = qr.modules.size;
    const qrSize = 180;
    const cellSize = qrSize / cellCount;
    const offsetX = (width - qrSize) / 2;
    const offsetY = (height - qrSize) / 2;

    ctx.clearRect(0, 0, width, height);

    // Fill background
    ctx.fillStyle = "black";
    ctx.fillRect(0, 0, width, height);

    // Draw rounded square modules
    for (let r = 0; r < cellCount; r++) {
      for (let c = 0; c < cellCount; c++) {
        if (qr.modules.get(c, r)) {
          const x = offsetX + c * cellSize;
          const y = offsetY + r * cellSize;
          const radius = 1.5;

          ctx.fillStyle = "#8b5cf6"; // Tailwind purple-500

          // Rounded rectangle module
          ctx.beginPath();
          ctx.moveTo(x + radius, y);
          ctx.lineTo(x + cellSize - radius, y);
          ctx.quadraticCurveTo(x + cellSize, y, x + cellSize, y + radius);
          ctx.lineTo(x + cellSize, y + cellSize - radius);
          ctx.quadraticCurveTo(x + cellSize, y + cellSize, x + cellSize - radius, y + cellSize);
          ctx.lineTo(x + radius, y + cellSize);
          ctx.quadraticCurveTo(x, y + cellSize, x, y + cellSize - radius);
          ctx.lineTo(x, y + radius);
          ctx.quadraticCurveTo(x, y, x + radius, y);
          ctx.closePath();
          ctx.fill();
        }
      }
    }

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

export default QRCodeCanvas;