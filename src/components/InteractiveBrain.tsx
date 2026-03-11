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
    const brainScale = Math.min(width, height) * 0.35;

    // Brain outline points using parametric curves
    const brainPoints: [number, number][] = [];

    // Left hemisphere
    for (let t = 0; t < Math.PI * 2; t += 0.08) {
      // Main brain shape — two overlapping ellipses
      const lx = Math.cos(t) * 0.9 - 0.15;
      const ly = Math.sin(t) * 1.1;
      brainPoints.push([centerX + lx * brainScale * 0.5, centerY + ly * brainScale * 0.45]);
    }

    // Right hemisphere (slightly offset)
    for (let t = 0; t < Math.PI * 2; t += 0.08) {
      const rx = Math.cos(t) * 0.9 + 0.15;
      const ry = Math.sin(t) * 1.1;
      brainPoints.push([centerX + rx * brainScale * 0.5, centerY + ry * brainScale * 0.45]);
    }

    // Internal structure — folds/gyri
    for (let i = 0; i < 5; i++) {
      const yOffset = -0.8 + i * 0.4;
      for (let t = -0.7; t < 0.7; t += 0.1) {
        const wave = Math.sin(t * 4 + i) * 0.08;
        brainPoints.push([
          centerX + t * brainScale * 0.45,
          centerY + (yOffset + wave) * brainScale * 0.4,
        ]);
      }
    }

    // Brain stem
    for (let t = 0; t < 6; t++) {
      brainPoints.push([
        centerX + (Math.random() - 0.5) * brainScale * 0.08,
        centerY + brainScale * 0.45 + t * brainScale * 0.04,
      ]);
    }

    // Fill interior with scattered particles
    for (let i = 0; i < 120; i++) {
      const angle = Math.random() * Math.PI * 2;
      const r = Math.random() * 0.85;
      const px = centerX + Math.cos(angle) * r * brainScale * 0.42;
      const py = centerY + Math.sin(angle) * r * brainScale * 0.38;
      brainPoints.push([px, py]);
    }

    // Create particles from points
    brainPoints.forEach(([px, py]) => {
      particles.push({
        x: px + (Math.random() - 0.5) * 4,
        y: py + (Math.random() - 0.5) * 4,
        originX: px,
        originY: py,
        vx: 0,
        vy: 0,
        size: 1 + Math.random() * 2,
        alpha: 0.3 + Math.random() * 0.7,
        connections: [],
      });
    });

    // Precompute connections (nearby particles)
    const connectionDist = brainScale * 0.18;
    for (let i = 0; i < particles.length; i++) {
      for (let j = i + 1; j < particles.length; j++) {
        const dx = particles[i].originX - particles[j].originX;
        const dy = particles[i].originY - particles[j].originY;
        if (dx * dx + dy * dy < connectionDist * connectionDist) {
          if (particles[i].connections.length < 4) {
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

    const animate = () => {
      const rect = canvas.parentElement?.getBoundingClientRect();
      if (!rect) return;

      const w = rect.width;
      const h = rect.height;
      ctx.clearRect(0, 0, w, h);

      const particles = particlesRef.current;
      const mouse = mouseRef.current;
      const mouseRadius = 120;
      time += 0.01;

      // Update particles
      for (let i = 0; i < particles.length; i++) {
        const p = particles[i];

        // Mouse repulsion
        const dx = p.x - mouse.x;
        const dy = p.y - mouse.y;
        const dist = Math.sqrt(dx * dx + dy * dy);

        if (dist < mouseRadius && dist > 0) {
          const force = (mouseRadius - dist) / mouseRadius;
          p.vx += (dx / dist) * force * 2;
          p.vy += (dy / dist) * force * 2;
        }

        // Spring back to origin with gentle float
        const floatX = Math.sin(time + i * 0.1) * 0.3;
        const floatY = Math.cos(time * 0.8 + i * 0.15) * 0.3;

        p.vx += (p.originX + floatX - p.x) * 0.04;
        p.vy += (p.originY + floatY - p.y) * 0.04;

        // Damping
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
          const maxDist = 80;
          if (dist < maxDist) {
            const alpha = (1 - dist / maxDist) * 0.15;
            ctx.beginPath();
            ctx.moveTo(p.x, p.y);
            ctx.lineTo(q.x, q.y);
            ctx.strokeStyle = `hsla(215, 70%, 60%, ${alpha})`;
            ctx.lineWidth = 0.5;
            ctx.stroke();
          }
        }
      }

      // Draw particles
      for (const p of particles) {
        // Proximity to mouse = brighter
        const dx = p.x - mouse.x;
        const dy = p.y - mouse.y;
        const dist = Math.sqrt(dx * dx + dy * dy);
        const proximity = Math.max(0, 1 - dist / 200);
        const alpha = p.alpha * 0.5 + proximity * 0.5;
        const size = p.size + proximity * 1.5;

        // Glow
        if (proximity > 0.2) {
          ctx.beginPath();
          ctx.arc(p.x, p.y, size * 3, 0, Math.PI * 2);
          ctx.fillStyle = `hsla(215, 80%, 65%, ${proximity * 0.08})`;
          ctx.fill();
        }

        ctx.beginPath();
        ctx.arc(p.x, p.y, size, 0, Math.PI * 2);
        ctx.fillStyle = `hsla(215, 70%, 70%, ${alpha})`;
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
