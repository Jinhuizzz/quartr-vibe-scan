import { useEffect, useRef } from "react";

const InteractiveBrain = ({ className = "" }: { className?: string }) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const resize = () => {
      const dpr = window.devicePixelRatio || 1;
      canvas.width = canvas.offsetWidth * dpr;
      canvas.height = canvas.offsetHeight * dpr;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    };
    resize();
    window.addEventListener("resize", resize);

    const w = () => canvas.offsetWidth;
    const h = () => canvas.offsetHeight;

    // Chart data — a rising chart with dips to feel organic, overall upward
    const basePoints = [
      0.18, 0.22, 0.19, 0.25, 0.23, 0.30, 0.28, 0.35, 0.32, 0.38,
      0.36, 0.42, 0.39, 0.45, 0.43, 0.50, 0.47, 0.54, 0.51, 0.58,
      0.55, 0.62, 0.58, 0.65, 0.61, 0.68, 0.64, 0.72, 0.69, 0.76,
      0.73, 0.78, 0.75, 0.82, 0.79, 0.85, 0.83, 0.88, 0.86, 0.92,
    ];

    let animProgress = 0;
    let animId: number;

    const draw = () => {
      const W = w();
      const H = h();
      ctx.clearRect(0, 0, W, H);

      // Animate the chart drawing in
      animProgress = Math.min(animProgress + 0.008, 1);
      const easedProgress = 1 - Math.pow(1 - animProgress, 3); // ease-out cubic
      const visibleCount = Math.floor(basePoints.length * easedProgress);

      if (visibleCount < 2) {
        animId = requestAnimationFrame(draw);
        return;
      }

      const marginLeft = W * 0.08;
      const marginRight = W * 0.08;
      const marginTop = H * 0.15;
      const marginBottom = H * 0.2;
      const chartW = W - marginLeft - marginRight;
      const chartH = H - marginTop - marginBottom;

      const getX = (i: number) => marginLeft + (i / (basePoints.length - 1)) * chartW;
      const getY = (v: number) => marginTop + chartH * (1 - v);

      // Glow color from CSS
      const glowColor = "hsl(215, 80%, 60%)";
      const glowColorDim = "hsla(215, 80%, 60%, 0.08)";
      const glowColorMid = "hsla(215, 80%, 60%, 0.15)";
      const glowColorLine = "hsla(215, 80%, 60%, 0.6)";
      const glowColorBright = "hsla(215, 80%, 65%, 0.9)";

      // Fill area under curve
      ctx.beginPath();
      ctx.moveTo(getX(0), getY(basePoints[0]));
      for (let i = 1; i < visibleCount; i++) {
        const x0 = getX(i - 1), y0 = getY(basePoints[i - 1]);
        const x1 = getX(i), y1 = getY(basePoints[i]);
        const cx = (x0 + x1) / 2;
        ctx.bezierCurveTo(cx, y0, cx, y1, x1, y1);
      }
      ctx.lineTo(getX(visibleCount - 1), marginTop + chartH);
      ctx.lineTo(getX(0), marginTop + chartH);
      ctx.closePath();

      const grad = ctx.createLinearGradient(0, marginTop, 0, marginTop + chartH);
      grad.addColorStop(0, glowColorMid);
      grad.addColorStop(0.5, glowColorDim);
      grad.addColorStop(1, "transparent");
      ctx.fillStyle = grad;
      ctx.fill();

      // Main line with glow
      // Outer glow
      ctx.beginPath();
      ctx.moveTo(getX(0), getY(basePoints[0]));
      for (let i = 1; i < visibleCount; i++) {
        const x0 = getX(i - 1), y0 = getY(basePoints[i - 1]);
        const x1 = getX(i), y1 = getY(basePoints[i]);
        const cx = (x0 + x1) / 2;
        ctx.bezierCurveTo(cx, y0, cx, y1, x1, y1);
      }
      ctx.strokeStyle = glowColorLine;
      ctx.lineWidth = 6;
      ctx.shadowColor = glowColor;
      ctx.shadowBlur = 20;
      ctx.stroke();

      // Core line
      ctx.beginPath();
      ctx.moveTo(getX(0), getY(basePoints[0]));
      for (let i = 1; i < visibleCount; i++) {
        const x0 = getX(i - 1), y0 = getY(basePoints[i - 1]);
        const x1 = getX(i), y1 = getY(basePoints[i]);
        const cx = (x0 + x1) / 2;
        ctx.bezierCurveTo(cx, y0, cx, y1, x1, y1);
      }
      ctx.strokeStyle = glowColorBright;
      ctx.lineWidth = 2;
      ctx.shadowColor = glowColor;
      ctx.shadowBlur = 10;
      ctx.stroke();
      ctx.shadowBlur = 0;

      // Dot at the leading edge
      if (visibleCount > 0) {
        const lastI = visibleCount - 1;
        const dx = getX(lastI);
        const dy = getY(basePoints[lastI]);

        // Pulse ring
        const pulse = 0.5 + 0.5 * Math.sin(Date.now() * 0.004);
        ctx.beginPath();
        ctx.arc(dx, dy, 6 + pulse * 4, 0, Math.PI * 2);
        ctx.fillStyle = `hsla(215, 80%, 60%, ${0.15 + pulse * 0.1})`;
        ctx.fill();

        // Core dot
        ctx.beginPath();
        ctx.arc(dx, dy, 3, 0, Math.PI * 2);
        ctx.fillStyle = glowColorBright;
        ctx.shadowColor = glowColor;
        ctx.shadowBlur = 12;
        ctx.fill();
        ctx.shadowBlur = 0;
      }

      // Subtle horizontal grid lines
      ctx.strokeStyle = "hsla(220, 12%, 16%, 0.4)";
      ctx.lineWidth = 0.5;
      for (let i = 0; i < 5; i++) {
        const y = marginTop + (chartH / 4) * i;
        ctx.beginPath();
        ctx.moveTo(marginLeft, y);
        ctx.lineTo(marginLeft + chartW, y);
        ctx.stroke();
      }

      if (animProgress < 1) {
        animId = requestAnimationFrame(draw);
      } else {
        // Keep pulsing the dot
        animId = requestAnimationFrame(draw);
      }
    };

    animId = requestAnimationFrame(draw);

    return () => {
      window.removeEventListener("resize", resize);
      cancelAnimationFrame(animId);
    };
  }, []);

  return (
    <div className={`absolute inset-0 w-full h-full ${className}`}>
      <canvas
        ref={canvasRef}
        className="w-full h-full"
        style={{ background: "transparent" }}
      />
    </div>
  );
};

export default InteractiveBrain;
