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
  layer: "globe" | "brain"; // which visual layer
}

const InteractiveBrain = ({ className = "" }: { className?: string }) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const mouseRef = useRef({ x: -1000, y: -1000 });
  const particlesRef = useRef<Particle[]>([]);
  const animFrameRef = useRef<number>(0);
  const rotationRef = useRef(0);

  const initParticles = useCallback((width: number, height: number) => {
    const particles: Particle[] = [];
    const centerX = width * 0.5;
    const centerY = height * 0.45;
    const radius = Math.min(width, height) * 0.32;

    // === GLOBE WIREFRAME LAYER ===
    // Latitude lines
    for (let lat = -3; lat <= 3; lat++) {
      const phi = (lat / 3) * (Math.PI * 0.45);
      const r = Math.cos(phi) * radius;
      const yOff = Math.sin(phi) * radius * 0.95;
      for (let t = 0; t < Math.PI * 2; t += 0.12) {
        particles.push({
          x: 0, y: 0,
          originX: centerX + Math.cos(t) * r,
          originY: centerY + yOff,
          vx: 0, vy: 0,
          size: 0.8 + Math.random() * 0.5,
          alpha: 0.12 + Math.abs(lat) * 0.02,
          connections: [],
          layer: "globe",
        });
      }
    }

    // Longitude lines (meridians)
    for (let lon = 0; lon < 8; lon++) {
      const theta = (lon / 8) * Math.PI * 2;
      for (let t = -Math.PI * 0.48; t < Math.PI * 0.48; t += 0.1) {
        const r = Math.cos(t) * radius;
        particles.push({
          x: 0, y: 0,
          originX: centerX + Math.cos(theta) * r,
          originY: centerY + Math.sin(t) * radius * 0.95,
          vx: 0, vy: 0,
          size: 0.6 + Math.random() * 0.5,
          alpha: 0.1 + Math.random() * 0.06,
          connections: [],
          layer: "globe",
        });
      }
    }

    // === BRAIN NEURAL LAYER (inside the globe) ===
    const brainR = radius * 0.85;

    // Left hemisphere outline
    for (let t = 0; t < Math.PI * 2; t += 0.07) {
      const lx = Math.cos(t) * 0.85 - 0.12;
      const ly = Math.sin(t) * 1.05;
      const px = centerX + lx * brainR * 0.5;
      const py = centerY + ly * brainR * 0.42;
      // Only add if inside globe
      const dx = px - centerX, dy = py - centerY;
      if (dx * dx + dy * dy < radius * radius) {
        particles.push({
          x: 0, y: 0, originX: px, originY: py,
          vx: 0, vy: 0,
          size: 1.2 + Math.random() * 1.5,
          alpha: 0.25 + Math.random() * 0.35,
          connections: [], layer: "brain",
        });
      }
    }

    // Right hemisphere
    for (let t = 0; t < Math.PI * 2; t += 0.07) {
      const rx = Math.cos(t) * 0.85 + 0.12;
      const ry = Math.sin(t) * 1.05;
      const px = centerX + rx * brainR * 0.5;
      const py = centerY + ry * brainR * 0.42;
      const dx = px - centerX, dy = py - centerY;
      if (dx * dx + dy * dy < radius * radius) {
        particles.push({
          x: 0, y: 0, originX: px, originY: py,
          vx: 0, vy: 0,
          size: 1.2 + Math.random() * 1.5,
          alpha: 0.25 + Math.random() * 0.35,
          connections: [], layer: "brain",
        });
      }
    }

    // Brain folds / gyri
    for (let i = 0; i < 6; i++) {
      const yOffset = -0.8 + i * 0.32;
      for (let t = -0.7; t < 0.7; t += 0.08) {
        const wave = Math.sin(t * 5 + i * 1.3) * 0.09;
        const px = centerX + t * brainR * 0.45;
        const py = centerY + (yOffset + wave) * brainR * 0.4;
        const dx = px - centerX, dy = py - centerY;
        if (dx * dx + dy * dy < radius * radius * 0.85) {
          particles.push({
            x: 0, y: 0, originX: px, originY: py,
            vx: 0, vy: 0,
            size: 1 + Math.random() * 1.8,
            alpha: 0.3 + Math.random() * 0.4,
            connections: [], layer: "brain",
          });
        }
      }
    }

    // Central fissure
    for (let t = -0.85; t < 0.65; t += 0.08) {
      particles.push({
        x: 0, y: 0,
        originX: centerX + Math.sin(t * 3) * brainR * 0.015,
        originY: centerY + t * brainR * 0.4,
        vx: 0, vy: 0,
        size: 1 + Math.random(),
        alpha: 0.2 + Math.random() * 0.3,
        connections: [], layer: "brain",
      });
    }

    // Interior scattered neurons
    for (let i = 0; i < 150; i++) {
      const angle = Math.random() * Math.PI * 2;
      const r = Math.pow(Math.random(), 0.7) * brainR * 0.42;
      const hemi = (Math.random() > 0.5 ? 1 : -1) * brainR * 0.04;
      const px = centerX + Math.cos(angle) * r + hemi;
      const py = centerY + Math.sin(angle) * r * 0.85;
      const dx = px - centerX, dy = py - centerY;
      if (dx * dx + dy * dy < radius * radius * 0.8) {
        particles.push({
          x: 0, y: 0, originX: px, originY: py,
          vx: 0, vy: 0,
          size: 0.8 + Math.random() * 2,
          alpha: 0.2 + Math.random() * 0.5,
          connections: [], layer: "brain",
        });
      }
    }

    // Initialize positions
    for (const p of particles) {
      p.x = p.originX + (Math.random() - 0.5) * 2;
      p.y = p.originY + (Math.random() - 0.5) * 2;
    }

    // Precompute connections (brain particles only)
    const brainParticles = particles.reduce<number[]>((acc, p, i) => {
      if (p.layer === "brain") acc.push(i);
      return acc;
    }, []);

    const connDist = brainR * 0.18;
    for (let a = 0; a < brainParticles.length; a++) {
      const i = brainParticles[a];
      for (let b = a + 1; b < brainParticles.length; b++) {
        const j = brainParticles[b];
        const dx = particles[i].originX - particles[j].originX;
        const dy = particles[i].originY - particles[j].originY;
        if (dx * dx + dy * dy < connDist * connDist) {
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
    // Dimmer version for globe wireframe
    const dimCol = (a: number) => `hsla(${gH}, ${gS}, 45%, ${Math.min(1, Math.max(0, a))})`;

    const animate = () => {
      const rect = canvas.parentElement?.getBoundingClientRect();
      if (!rect) return;
      const w = rect.width;
      const h = rect.height;
      ctx.clearRect(0, 0, w, h);

      const particles = particlesRef.current;
      const mouse = mouseRef.current;
      const mouseRadius = 140;
      time += 0.006;
      rotationRef.current += 0.002;
      const rot = rotationRef.current;

      const cX = w * 0.5;
      const cY = h * 0.45;

      // Update particle positions
      for (const p of particles) {
        // Globe particles rotate slowly
        if (p.layer === "globe") {
          const dx = p.originX - cX;
          const cos = Math.cos(0.002);
          const sin = Math.sin(0.002);
          p.originX = cX + dx * cos;
          // Keep originY stable for latitude lines
        }

        const mdx = p.x - mouse.x;
        const mdy = p.y - mouse.y;
        const mDist = Math.sqrt(mdx * mdx + mdy * mdy);

        if (mDist < mouseRadius && mDist > 0) {
          const force = (mouseRadius - mDist) / mouseRadius;
          p.vx += (mdx / mDist) * force * 1.5;
          p.vy += (mdy / mDist) * force * 1.5;
        }

        const floatX = Math.sin(time + p.originX * 0.01) * (p.layer === "brain" ? 1.5 : 0.5);
        const floatY = Math.cos(time * 0.7 + p.originY * 0.01) * (p.layer === "brain" ? 1.5 : 0.5);

        p.vx += (p.originX + floatX - p.x) * 0.05;
        p.vy += (p.originY + floatY - p.y) * 0.05;
        p.vx *= 0.88;
        p.vy *= 0.88;
        p.x += p.vx;
        p.y += p.vy;
      }

      // --- Draw globe wireframe (dim, behind) ---
      for (const p of particles) {
        if (p.layer !== "globe") continue;
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
        ctx.fillStyle = dimCol(p.alpha);
        ctx.fill();
      }

      // Globe equator ring (animated)
      const globeR = Math.min(w, h) * 0.32;
      ctx.beginPath();
      ctx.arc(cX, cY, globeR, 0, Math.PI * 2);
      ctx.strokeStyle = dimCol(0.08);
      ctx.lineWidth = 1;
      ctx.stroke();

      // --- Draw brain connections ---
      for (const p of particles) {
        if (p.layer !== "brain") continue;
        for (const j of p.connections) {
          const q = particles[j];
          const dx = p.x - q.x;
          const dy = p.y - q.y;
          const dist = Math.sqrt(dx * dx + dy * dy);
          const maxDist = 65;
          if (dist < maxDist) {
            const alpha = (1 - dist / maxDist) * 0.22;
            ctx.beginPath();
            ctx.moveTo(p.x, p.y);
            ctx.lineTo(q.x, q.y);
            ctx.strokeStyle = col(alpha);
            ctx.lineWidth = 0.5;
            ctx.stroke();
          }
        }
      }

      // --- Draw brain particles ---
      for (const p of particles) {
        if (p.layer !== "brain") continue;
        const mdx = p.x - mouse.x;
        const mdy = p.y - mouse.y;
        const mDist = Math.sqrt(mdx * mdx + mdy * mdy);
        const proximity = Math.max(0, 1 - mDist / 220);
        const size = p.size + proximity * 1.2;

        // Ambient glow
        ctx.beginPath();
        ctx.arc(p.x, p.y, size * 2.5, 0, Math.PI * 2);
        ctx.fillStyle = col(0.03);
        ctx.fill();

        // Mouse proximity glow
        if (proximity > 0.1) {
          ctx.beginPath();
          ctx.arc(p.x, p.y, size * 4, 0, Math.PI * 2);
          ctx.fillStyle = col(proximity * 0.08);
          ctx.fill();
        }

        // Core particle
        ctx.beginPath();
        ctx.arc(p.x, p.y, size, 0, Math.PI * 2);
        ctx.fillStyle = col(p.alpha * 0.6);
        ctx.fill();
      }

      // Pulsing energy ring at globe edge
      const pulseAlpha = 0.04 + Math.sin(time * 3) * 0.02;
      ctx.beginPath();
      ctx.arc(cX, cY, globeR + 2, 0, Math.PI * 2);
      ctx.strokeStyle = col(pulseAlpha);
      ctx.lineWidth = 1.5;
      ctx.stroke();

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
