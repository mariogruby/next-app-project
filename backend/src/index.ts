import fetch from 'node-fetch';

const PING_INTERVAL = 10 * 60 * 1000;
const URL = process.env.SERVER_URL || 'https://next-app-project-70d6.onrender.com';

const keepAlive = () => {
  fetch(URL)
    .then((res) => {
      if (res.ok) {
        console.log(`Ping successfully: ${res.status}`);
      } else {
        console.log(`Ping failed with status: ${res.status}`);
      }
    })
    .catch((err) => console.error("Error in ping:", err));
};

export default {
  register(/* { strapi }: { strapi: Core.Strapi } */) {},

  bootstrap(/* { strapi }: { strapi: Core.Strapi } */) {
    console.log("Initializing Keep-alive for Render...");
    keepAlive();
    setInterval(keepAlive, PING_INTERVAL);
  },
};
