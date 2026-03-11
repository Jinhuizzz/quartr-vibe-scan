import { useEffect, useRef, useCallback } from "react";

interface Particle {
  x: number;
  y: number;
  originX: number;
  originY: number;
  vx: number;
  vy: number;
  size: number;
  alpha: number;
  connections: number[];
}

const InteractiveBrain = ({ className = "" }: { className?: string }) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const mouseRef = useRef({ x: -1000, y: -1000 });
  const particlesRef = useRef<Particle[]>([]);
  const animFrameRef = useRef<number>(0);

  const initParticles = useCallback((width: number, height: number) => {
    const particles: Particle[] = [];
    const centerX = width * 0.5;
    const centerY = height * 0.45;
    const brainScale = Math.min(width, height) * 0.42;

    const brainPoints: [number, number][] = [];

    // Left hemisphere — denser outline
    for (let t = 0; t < Math.PI * 2; t += 0.05) {
      const lx = Math.cos(t) * 0.92 - 0.14;
      const ly = Math.sin(t) * 1.12;
      brainPoints.push([centerX + lx * brainScale * 0.52, centerY + ly * brainScale * 0.46]);
    }

    // Right hemisphere
    for (let t = 0; t < Math.PI * 2; t += 0.05) {
      const rx = Math.cos(t) * 0.92 + 0.14;
      const ry = Math.sin(t) * 1.12;
      brainPoints.push([centerX + rx * brainScale * 0.52, centerY + ry * brainScale * 0.46]);
    }

    // Internal folds — more detail
    for (let i = 0; i < 7; i++) {
      const yOffset = -0.9 + i * 0.3;
      for (let t = -0.8; t < 0.8; t += 0.06) {
        const wave = Math.sin(t * 5 + i * 1.2) * 0.1;
        brainPoints.push([
          centerX + t * brainScale * 0.48,
          centerY + (yOffset + wave) * brainScale * 0.42,
        ]);
      }
    }

    // Vertical central fissure
    for (let t = -0.9; t < 0.7; t += 0.06) {
      brainPoints.push([
        centerX + (Math.sin(t * 3) * 0.02) * brainScale,
        centerY + t * brainScale * 0.42,
      ]);
    }

    // Brain stem
    for (let t = 0; t < 10; t++) {
      brainPoints.push([
        centerX + (Math.random() - 0.5) * brainScale * 0.1,
        centerY + brainScale * 0.46 + t * brainScale * 0.035,
      ]);
    }

    // Dense interior fill
    for (let i = 0; i < 250; i++) {
      const angle = Math.random() * Math.PI * 2;
      const r = Math.pow(Math.random(), 0.6) * 0.88;
      const hemiOffset = (Math.random() > 0.5 ? 1 : -1) * 0.05;
      const px = centerX + (Math.cos(angle) * r * 0.48 + hemiOffset) * brainScale;
      const py = centerY + Math.sin(angle) * r * 0.42 * brainScale;
      brainPoints.push([px, py]);
    }

    // Create particles
    brainPoints.forEach(([px, py]) => {
      particles.push({
        x: px + (Math.random() - 0.5) * 3,
        y: py + (Math.random() - 0.5) * 3,
        originX: px,
        originY: py,
        vx: 0,
        vy: 0,
        size: 1 + Math.random() * 2.5,
        alpha: 0.4 + Math.random() * 0.6,
        connections: [],
      });
    });

    // Precompute connections
    const connectionDist = brainScale * 0.14;
    for (let i = 0; i < particles.length; i++) {
      for (let j = i + 1; j < particles.length; j++) {
        const dx = particles[i].originX - particles[j].originX;
        const dy = particles[i].originY - particles[j].originY;
        if (dx * dx + dy * dy < connectionDist * connectionDist) {
          if (particles[i].connections.length < 5) {
            particles[i].connections.push(j);
          }
        }
      }
    }

    particlesRef.current = particles;
  }, []);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const resize = () => {
      const rect = canvas.parentElement?.getBoundingClientRect();
      if (!rect) return;
      const dpr = window.devicePixelRatio || 1;
      canvas.width = rect.width * dpr;
      canvas.height = rect.height * dpr;
      canvas.style.width = `${rect.width}px`;
      canvas.style.height = `${rect.height}px`;
      ctx.scale(dpr, dpr);
      initParticles(rect.width, rect.height);
    };

    resize();
    window.addEventListener("resize", resize);

    const handleMouseMove = (e: MouseEvent) => {
      const rect = canvas.getBoundingClientRect();
      mouseRef.current = {
        x: e.clientX - rect.left,
        y: e.clientY - rect.top,
      };
    };

    const handleMouseLeave = () => {
      mouseRef.current = { x: -1000, y: -1000 };
    };

    canvas.addEventListener("mousemove", handleMouseMove);
    canvas.addEventListener("mouseleave", handleMouseLeave);

    let time = 0;

    const rootStyle = getComputedStyle(document.documentElement);
    const primaryHsl = rootStyle.getPropertyValue("--primary").trim();
    // Brighter variant for visibility against dark bg
    const glowHsl = rootStyle.getPropertyValue("--glow").trim() || "215 80% 60%";

    const animate = () => {
      const rect = canvas.parentElement?.getBoundingClientRect();
      if (!rect) return;

      const w = rect.width;
      const h = rect.height;
      ctx.clearRect(0, 0, w, h);

      const particles = particlesRef.current;
      const mouse = mouseRef.current;
      const mouseRadius = 140;
      time += 0.008;

      for (let i = 0; i < particles.length; i++) {
        const p = particles[i];

        const dx = p.x - mouse.x;
        const dy = p.y - mouse.y;
        const dist = Math.sqrt(dx * dx + dy * dy);

        if (dist < mouseRadius && dist > 0) {
          const force = (mouseRadius - dist) / mouseRadius;
          p.vx += (dx / dist) * force * 2.5;
          p.vy += (dy / dist) * force * 2.5;
        }

        const floatX = Math.sin(time + i * 0.1) * 1.2;
        const floatY = Math.cos(time * 0.7 + i * 0.15) * 1.2;

        p.vx += (p.originX + floatX - p.x) * 0.04;
        p.vy += (p.originY + floatY - p.y) * 0.04;

        p.vx *= 0.9;
        p.vy *= 0.9;

        p.x += p.vx;
        p.y += p.vy;
      }

      // Draw connections
      for (let i = 0; i < particles.length; i++) {
        const p = particles[i];
        for (const j of p.connections) {
          const q = particles[j];
          const dx = p.x - q.x;
          const dy = p.y - q.y;
          const dist = Math.sqrt(dx * dx + dy * dy);
          const maxDist = 70;
          if (dist < maxDist) {
            const alpha = (1 - dist / maxDist) * 0.2;
            ctx.beginPath();
            ctx.moveTo(p.x, p.y);
            ctx.lineTo(q.x, q.y);
            ctx.strokeStyle = `hsla(${primaryHsl}, ${alpha})`;
            ctx.lineWidth = 0.6;
            ctx.stroke();
          }
        }
      }

      // Draw particles
      for (const p of particles) {
        const dx = p.x - mouse.x;
        const dy = p.y - mouse.y;
        const dist = Math.sqrt(dx * dx + dy * dy);
        const proximity = Math.max(0, 1 - dist / 220);
        const alpha = p.alpha * 0.6 + proximity * 0.4;
        const size = p.size + proximity * 2;

        if (proximity > 0.15) {
          ctx.beginPath();
          ctx.arc(p.x, p.y, size * 4, 0, Math.PI * 2);
          ctx.fillStyle = `hsla(${primaryHsl}, ${proximity * 0.1})`;
          ctx.fill();
        }

        ctx.beginPath();
        ctx.arc(p.x, p.y, size, 0, Math.PI * 2);
        ctx.fillStyle = `hsla(${primaryHsl}, ${alpha})`;
        ctx.fill();
      }

      animFrameRef.current = requestAnimationFrame(animate);
    };

    animFrameRef.current = requestAnimationFrame(animate);

    return () => {
      cancelAnimationFrame(animFrameRef.current);
      window.removeEventListener("resize", resize);
      canvas.removeEventListener("mousemove", handleMouseMove);
      canvas.removeEventListener("mouseleave", handleMouseLeave);
    };
  }, [initParticles]);

  return (
    <canvas
      ref={canvasRef}
      className={`absolute inset-0 w-full h-full ${className}`}
      style={{ cursor: "default" }}
    />
  );
};

export default InteractiveBrain;
