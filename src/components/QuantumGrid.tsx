import { motion } from "framer-motion";
import { useEffect, useState } from "react";

interface Particle {
  id: number;
  x: number;
  y: number;
  size: number;
  delay: number;
  duration: number;
}

interface Connection {
  id: number;
  x1: number;
  y1: number;
  x2: number;
  y2: number;
  delay: number;
}

const QuantumGrid = () => {
  const [particles, setParticles] = useState<Particle[]>([]);
  const [connections, setConnections] = useState<Connection[]>([]);
  const [mousePosition, setMousePosition] = useState({ x: 50, y: 50 });

  useEffect(() => {
    const newParticles: Particle[] = Array.from({ length: 40 }, (_, i) => ({
      id: i,
      x: Math.random() * 100,
      y: Math.random() * 100,
      size: 1 + Math.random() * 2.5,
      delay: Math.random() * 3,
      duration: 4 + Math.random() * 6,
    }));
    setParticles(newParticles);

    const newConnections: Connection[] = Array.from({ length: 12 }, (_, i) => ({
      id: i,
      x1: 10 + Math.random() * 80,
      y1: 10 + Math.random() * 80,
      x2: 10 + Math.random() * 80,
      y2: 10 + Math.random() * 80,
      delay: i * 0.4,
    }));
    setConnections(newConnections);
  }, []);

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      setMousePosition({
        x: (e.clientX / window.innerWidth) * 100,
        y: (e.clientY / window.innerHeight) * 100,
      });
    };
    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, []);

  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none">
      {/* Deep layered gradient background */}
      <motion.div
        className="absolute inset-0"
        animate={{
          background: [
            "radial-gradient(ellipse 60% 50% at 20% 30%, rgba(255,255,255,0.04) 0%, transparent 60%), radial-gradient(ellipse 40% 60% at 80% 70%, rgba(255,255,255,0.02) 0%, transparent 50%)",
            "radial-gradient(ellipse 60% 50% at 70% 60%, rgba(255,255,255,0.04) 0%, transparent 60%), radial-gradient(ellipse 40% 60% at 30% 20%, rgba(255,255,255,0.02) 0%, transparent 50%)",
            "radial-gradient(ellipse 60% 50% at 50% 40%, rgba(255,255,255,0.04) 0%, transparent 60%), radial-gradient(ellipse 40% 60% at 60% 80%, rgba(255,255,255,0.02) 0%, transparent 50%)",
            "radial-gradient(ellipse 60% 50% at 20% 30%, rgba(255,255,255,0.04) 0%, transparent 60%), radial-gradient(ellipse 40% 60% at 80% 70%, rgba(255,255,255,0.02) 0%, transparent 50%)",
          ],
        }}
        transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
      />

      {/* Subtle vignette */}
      <div
        className="absolute inset-0"
        style={{
          background:
            "radial-gradient(ellipse 70% 70% at 50% 50%, transparent 30%, rgba(0,0,0,0.4) 100%)",
        }}
      />

      {/* Grid lines */}
      <svg className="absolute inset-0 w-full h-full opacity-[0.05]">
        <defs>
          <pattern id="grid" width="80" height="80" patternUnits="userSpaceOnUse">
            <path
              d="M 80 0 L 0 0 0 80"
              fill="none"
              stroke="currentColor"
              strokeWidth="0.5"
              className="text-foreground"
            />
          </pattern>
        </defs>
        <rect width="100%" height="100%" fill="url(#grid)" />
      </svg>

      {/* Mouse follower glow — larger and softer */}
      <motion.div
        className="absolute w-96 h-96 rounded-full pointer-events-none"
        style={{
          background:
            "radial-gradient(circle, rgba(255,255,255,0.06) 0%, rgba(255,255,255,0.02) 40%, transparent 70%)",
          left: `${mousePosition.x}%`,
          top: `${mousePosition.y}%`,
          transform: "translate(-50%, -50%)",
        }}
        animate={{ scale: [1, 1.15, 1] }}
        transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
      />

      {/* Floating particles */}
      {particles.map((particle) => (
        <motion.div
          key={particle.id}
          className="absolute rounded-full bg-foreground"
          style={{
            left: `${particle.x}%`,
            top: `${particle.y}%`,
            width: particle.size,
            height: particle.size,
          }}
          animate={{
            y: [0, -50, 0],
            x: [0, 12 * Math.sin(particle.id), 0],
            opacity: [0.08, 0.45, 0.08],
            scale: [1, 1.6, 1],
          }}
          transition={{
            duration: particle.duration,
            repeat: Infinity,
            delay: particle.delay,
            ease: "easeInOut",
          }}
        />
      ))}

      {/* Pulsing quantum nodes */}
      {[...Array(6)].map((_, i) => (
        <motion.div
          key={`node-${i}`}
          className="absolute"
          style={{
            left: `${12 + i * 16}%`,
            top: `${18 + (i % 3) * 28}%`,
          }}
        >
          <motion.div
            className="w-1.5 h-1.5 rounded-full bg-foreground/30"
            animate={{
              scale: [1, 2.5, 1],
              opacity: [0.2, 0.7, 0.2],
            }}
            transition={{
              duration: 2.5 + i * 0.5,
              repeat: Infinity,
              delay: i * 0.5,
            }}
          />
          <motion.div
            className="absolute inset-0 w-1.5 h-1.5 rounded-full border border-foreground/15"
            animate={{
              scale: [1, 5, 1],
              opacity: [0.4, 0, 0.4],
            }}
            transition={{
              duration: 2.5 + i * 0.5,
              repeat: Infinity,
              delay: i * 0.5,
            }}
          />
        </motion.div>
      ))}

      {/* Animated connecting lines */}
      <svg className="absolute inset-0 w-full h-full">
        <defs>
          <linearGradient id="lineGradient" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="currentColor" stopOpacity="0" />
            <stop offset="50%" stopColor="currentColor" stopOpacity="0.2" />
            <stop offset="100%" stopColor="currentColor" stopOpacity="0" />
          </linearGradient>
        </defs>
        {connections.map((conn) => (
          <motion.line
            key={conn.id}
            x1={`${conn.x1}%`}
            y1={`${conn.y1}%`}
            x2={`${conn.x2}%`}
            y2={`${conn.y2}%`}
            stroke="url(#lineGradient)"
            strokeWidth="0.8"
            className="text-foreground"
            initial={{ pathLength: 0, opacity: 0 }}
            animate={{
              pathLength: [0, 1, 1, 0],
              opacity: [0, 0.25, 0.25, 0],
            }}
            transition={{
              duration: 5,
              delay: conn.delay,
              repeat: Infinity,
              repeatDelay: 2.5,
            }}
          />
        ))}
      </svg>
    </div>
  );
};

export default QuantumGrid;
