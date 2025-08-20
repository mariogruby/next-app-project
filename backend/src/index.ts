import fetch from 'node-fetch';

const PING_INTERVAL = 10 * 60 * 1000;
const URL = process.env.SERVER_URL || 'https://next-app-project-70d6.onrender.com';

// Variable global para no crear múltiples intervals
let keepAliveInterval: NodeJS.Timer | null = null;

const keepAlive = async () => {
  try {
    const res = await fetch(URL);

    // Consumir el body para que no quede en memoria
    await res.text();

    if (res.ok) {
      console.log(`Ping successfully: ${res.status}`);
    } else {
      console.log(`Ping failed with status: ${res.status}`);
    }
  } catch (err) {
    console.error("Error in ping:", err);
  }
};

export default {
  register() {},

  bootstrap() {
    console.log("Initializing Keep-alive for Render...");

    // Evitar crear múltiples intervals
    if (!keepAliveInterval) {
      keepAlive();
      keepAliveInterval = setInterval(keepAlive, PING_INTERVAL);
    }
  },
};
