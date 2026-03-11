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
}

const InteractiveBrain = ({ className = "" }: { className?: string }) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const mouseRef = useRef({ x: -1000, y: -1000 });
  const particlesRef = useRef<Particle[]>([]);
  const animFrameRef = useRef<number>(0);

  const initParticles = useCallback((width: number, height: number) => {
    const particles: Particle[] = [];
    const centerX = width * 0.5;
    const centerY = height * 0.4;
    const scale = Math.min(width, height) * 0.38;

    // Helper: check if point is roughly inside brain silhouette
    const inBrain = (nx: number, ny: number): boolean => {
      // Brain is wider than tall, two hemispheres
      // Left hemisphere center (-0.15, 0), right (0.15, 0)
      const lDist = Math.sqrt((nx + 0.13) ** 2 / 0.42 + ny ** 2 / 0.52);
      const rDist = Math.sqrt((nx - 0.13) ** 2 / 0.42 + ny ** 2 / 0.52);
      const inHemi = lDist < 1 || rDist < 1;
      // Brain stem
      const inStem = Math.abs(nx) < 0.06 && ny > 0.4 && ny < 0.7;
      return inHemi || inStem;
    };

    // Dense cloud of particles scattered in brain shape
    // More particles at edges (outline) and scattered inside
    const totalParticles = 600;

    for (let i = 0; i < totalParticles; i++) {
      let nx: number, ny: number;
      let attempts = 0;

      // Random sampling within brain shape
      do {
        nx = (Math.random() - 0.5) * 1.6;
        ny = (Math.random() - 0.5) * 1.6;
        attempts++;
      } while (!inBrain(nx, ny) && attempts < 50);

      if (attempts >= 50) continue;

      const px = centerX + nx * scale;
      const py = centerY + ny * scale;

      // Distance from center determines brightness
      const distFromCenter = Math.sqrt(nx * nx + ny * ny);
      const edgeFactor = Math.min(1, distFromCenter / 0.6);

      particles.push({
        x: px + (Math.random() - 0.5) * 3,
        y: py + (Math.random() - 0.5) * 3,
        originX: px,
        originY: py,
        vx: 0,
        vy: 0,
        // Smaller particles scattered, larger at edges
        size: 0.5 + Math.random() * 2 + edgeFactor * 1.5,
        // Brighter at edges, dimmer inside for depth
        alpha: 0.15 + Math.random() * 0.4 + edgeFactor * 0.2,
      });
    }

    // Extra dense outline particles along brain edge
    for (let t = 0; t < Math.PI * 2; t += 0.03) {
      // Left hemisphere outline
      const lx = Math.cos(t) * 0.58 - 0.13;
      const ly = Math.sin(t) * 0.68;
      const scatter = () => (Math.random() - 0.5) * scale * 0.06;
      particles.push({
        x: 0, y: 0,
        originX: centerX + lx * scale + scatter(),
        originY: centerY + ly * scale + scatter(),
        vx: 0, vy: 0,
        size: 0.4 + Math.random() * 1.2,
        alpha: 0.2 + Math.random() * 0.3,
      });

      // Right hemisphere outline
      const rx = Math.cos(t) * 0.58 + 0.13;
      const ry = Math.sin(t) * 0.68;
      particles.push({
        x: 0, y: 0,
        originX: centerX + rx * scale + scatter(),
        originY: centerY + ry * scale + scatter(),
        vx: 0, vy: 0,
        size: 0.4 + Math.random() * 1.2,
        alpha: 0.2 + Math.random() * 0.3,
      });
    }

    // Scattered outer particles (dispersing from brain — like the original)
    for (let i = 0; i < 80; i++) {
      const angle = Math.random() * Math.PI * 2;
      const r = 0.6 + Math.random() * 0.5; // outside brain
      const nx = Math.cos(angle) * r;
      const ny = Math.sin(angle) * r * 0.75;

      particles.push({
        x: 0, y: 0,
        originX: centerX + nx * scale,
        originY: centerY + ny * scale,
        vx: 0, vy: 0,
        size: 0.3 + Math.random() * 1,
        alpha: 0.05 + Math.random() * 0.15,
      });
    }

    // Initialize positions
    for (const p of particles) {
      if (p.x === 0 && p.y === 0) {
        p.x = p.originX + (Math.random() - 0.5) * 2;
        p.y = p.originY + (Math.random() - 0.5) * 2;
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
      mouseRef.current = { x: e.clientX - rect.left, y: e.clientY - rect.top };
    };
    const handleMouseLeave = () => {
      mouseRef.current = { x: -1000, y: -1000 };
    };
    canvas.addEventListener("mousemove", handleMouseMove);
    canvas.addEventListener("mouseleave", handleMouseLeave);

    let time = 0;

    const rootStyle = getComputedStyle(document.documentElement);
    const glowRaw = rootStyle.getPropertyValue("--glow").trim() || "215 80% 60%";
    const [gH = "215", gS = "80%", gL = "60%"] = glowRaw.split(/\s+/);
    const col = (a: number) => `hsla(${gH}, ${gS}, ${gL}, ${Math.min(1, Math.max(0, a))})`;
    // Brighter variant for highlights
    const brightCol = (a: number) => `hsla(${gH}, 90%, 72%, ${Math.min(1, Math.max(0, a))})`;

    const animate = () => {
      const rect = canvas.parentElement?.getBoundingClientRect();
      if (!rect) return;
      const w = rect.width;
      const h = rect.height;
      ctx.clearRect(0, 0, w, h);

      const particles = particlesRef.current;
      const mouse = mouseRef.current;
      const mouseRadius = 120;
      time += 0.005;

      // Update
      for (let i = 0; i < particles.length; i++) {
        const p = particles[i];
        const mdx = p.x - mouse.x;
        const mdy = p.y - mouse.y;
        const mDist = Math.sqrt(mdx * mdx + mdy * mdy);

        if (mDist < mouseRadius && mDist > 0) {
          const force = (mouseRadius - mDist) / mouseRadius;
          p.vx += (mdx / mDist) * force * 1.5;
          p.vy += (mdy / mDist) * force * 1.5;
        }

        // Gentle organic float
        const floatX = Math.sin(time * 1.2 + i * 0.07) * 1;
        const floatY = Math.cos(time * 0.9 + i * 0.11) * 1;

        p.vx += (p.originX + floatX - p.x) * 0.03;
        p.vy += (p.originY + floatY - p.y) * 0.03;
        p.vx *= 0.92;
        p.vy *= 0.92;
        p.x += p.vx;
        p.y += p.vy;
      }

      // Draw particles — soft glow dots like original
      for (const p of particles) {
        const mdx = p.x - mouse.x;
        const mdy = p.y - mouse.y;
        const mDist = Math.sqrt(mdx * mdx + mdy * mdy);
        const proximity = Math.max(0, 1 - mDist / 200);

        const size = p.size + proximity * 1;

        // Outer soft glow
        ctx.beginPath();
        ctx.arc(p.x, p.y, size * 3.5, 0, Math.PI * 2);
        ctx.fillStyle = col(p.alpha * 0.08);
        ctx.fill();

        // Mid glow
        ctx.beginPath();
        ctx.arc(p.x, p.y, size * 1.8, 0, Math.PI * 2);
        ctx.fillStyle = col(p.alpha * 0.15);
        ctx.fill();

        // Core dot
        ctx.beginPath();
        ctx.arc(p.x, p.y, size, 0, Math.PI * 2);
        ctx.fillStyle = proximity > 0.3
          ? brightCol(p.alpha * 0.7 + proximity * 0.3)
          : col(p.alpha * 0.55);
        ctx.fill();

        // Bright center for larger particles
        if (p.size > 2) {
          ctx.beginPath();
          ctx.arc(p.x, p.y, size * 0.4, 0, Math.PI * 2);
          ctx.fillStyle = brightCol(p.alpha * 0.3);
          ctx.fill();
        }
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
