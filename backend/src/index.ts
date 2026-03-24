import fetch from 'node-fetch';

const PING_INTERVAL = 10 * 60 * 1000; // 10 minutos
const URL = process.env.SERVER_URL || 'https://next-app-project-70d6.onrender.com';

let keepAliveInterval: NodeJS.Timeout | null = null;

const keepAlive = async () => {
  try {
    const controller = new AbortController();
    const timeout = setTimeout(() => controller.abort(), 10000); // timeout de 10s

    const res = await fetch(URL, { 
      signal: controller.signal,
      // Evita keep-alive del agente si no lo necesitas
      // agent: false 
    });

    await res.text(); // importante: consumir el body
    clearTimeout(timeout);

    console.log(`Ping OK: ${res.status}`);
  } catch (err: any) {
    if (err.name === 'AbortError') {
      console.error("Ping timeout");
    } else {
      console.error("Error in ping:", err.message);
    }
  }
};

export default {
  register() {},

  bootstrap() {
    console.log("Initializing Keep-alive for Render...");

    if (!keepAliveInterval) {
      keepAlive(); // primer ping inmediato
      keepAliveInterval = setInterval(keepAlive, PING_INTERVAL);
    }
  },
};