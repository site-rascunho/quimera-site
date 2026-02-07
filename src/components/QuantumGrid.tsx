import { motion } from "framer-motion";
import { useEffect, useState, useRef } from "react";

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
  const containerRef = useRef<HTMLDivElement>(null);
  const [particles, setParticles] = useState<Particle[]>([]);
  const [connections, setConnections] = useState<Connection[]>([]);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });

  useEffect(() => {
    const newParticles: Particle[] = Array.from({ length: 40 }, (_, i) => ({
      id: i,
      x: Math.random() * 100,
      y: Math.random() * 100,
      size: 1.5 + Math.random() * 2.5,
      delay: Math.random() * 2,
      duration: 3 + Math.random() * 4,
    }));
    setParticles(newParticles);

    const newConnections: Connection[] = Array.from({ length: 12 }, (_, i) => ({
      id: i,
      x1: 10 + Math.random() * 80,
      y1: 10 + Math.random() * 80,
      x2: 10 + Math.random() * 80,
      y2: 10 + Math.random() * 80,
      delay: i * 0.3,
    }));
    setConnections(newConnections);
  }, []);

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      if (!containerRef.current) return;
      
      // Calcula a posição relativa ao container para precisão total
      const rect = containerRef.current.getBoundingClientRect();
      setMousePosition({
        x: e.clientX - rect.left,
        y: e.clientY - rect.top,
      });
    };
    
    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, []);

  return (
    <div ref={containerRef} className="absolute inset-0 overflow-hidden pointer-events-none">
      {/* Animated gradient background */}
      <motion.div
        className="absolute inset-0 opacity-40"
        animate={{
          background: [
            "radial-gradient(circle at 20% 30%, rgba(255,255,255,0.05) 0%, transparent 60%)",
            "radial-gradient(circle at 80% 70%, rgba(255,255,255,0.05) 0%, transparent 60%)",
            "radial-gradient(circle at 50% 50%, rgba(255,255,255,0.05) 0%, transparent 60%)",
            "radial-gradient(circle at 20% 30%, rgba(255,255,255,0.05) 0%, transparent 60%)",
          ],
        }}
        transition={{ duration: 15, repeat: Infinity, ease: "linear" }}
      />

      {/* Grid lines */}
      <svg className="absolute inset-0 w-full h-full opacity-[0.1]">
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

      {/* Mouse follower glow - Agora usa pixels exatos */}
      <motion.div
        className="absolute w-80 h-80 rounded-full pointer-events-none"
        style={{
          background: "radial-gradient(circle, rgba(255,255,255,0.08) 0%, transparent 70%)",
          left: mousePosition.x,
          top: mousePosition.y,
          transform: "translate(-50%, -50%)",
        }}
        animate={{
          scale: [1, 1.2, 1],
        }}
        transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
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
            y: [0, -40, 0],
            x: [0, 10 * Math.sin(particle.id), 0],
            opacity: [0.2, 0.7, 0.2],
            scale: [1, 1.5, 1],
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
      {[...Array(5)].map((_, i) => (
        <motion.div
          key={`node-${i}`}
          className="absolute"
          style={{
            left: `${15 + i * 18}%`,
            top: `${20 + (i % 3) * 25}%`,
          }}
        >
          <motion.div
            className="w-3 h-3 rounded-full bg-foreground/60"
            animate={{
              scale: [1, 2, 1],
              opacity: [0.3, 0.8, 0.3],
            }}
            transition={{
              duration: 2 + i * 0.5,
              repeat: Infinity,
              delay: i * 0.4,
            }}
          />
          <motion.div
            className="absolute inset-0 w-3 h-3 rounded-full border border-foreground/30"
            animate={{
              scale: [1, 4, 1],
              opacity: [0.5, 0, 0.5],
            }}
            transition={{
              duration: 2 + i * 0.5,
              repeat: Infinity,
              delay: i * 0.4,
            }}
          />
        </motion.div>
      ))}

      {/* Animated connecting lines */}
      <svg className="absolute inset-0 w-full h-full">
        <defs>
          <linearGradient id="lineGradient" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="currentColor" stopOpacity="0" />
            <stop offset="50%" stopColor="currentColor" stopOpacity="0.4" />
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
            strokeWidth="1.5"
            className="text-foreground"
            initial={{ pathLength: 0, opacity: 0 }}
            animate={{ 
              pathLength: [0, 1, 1, 0],
              opacity: [0, 0.4, 0.4, 0],
            }}
            transition={{ 
              duration: 4, 
              delay: conn.delay,
              repeat: Infinity,
              repeatDelay: 2,
            }}
          />
        ))}
      </svg>
      
      {/* LINHA DE SCANNER REMOVIDA AQUI */}
    </div>
  );
};

export default QuantumGrid;