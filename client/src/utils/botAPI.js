export const simulateBotApi = (currentBots = []) => {
  return new Promise((resolve) => {
    setTimeout(() => {
      const bots = Array.from({ length: 10 }, (_, i) => {
        const existing = currentBots[i]; // keep previous bot state

        // If bot already exists, preserve its busy state & task
        if (existing && existing.status === "busy") {
          return {
            ...existing,
            battery: Math.max(5, existing.battery - Math.floor(Math.random() * 5)),
            lastUpdated: new Date().toISOString(),
          };
        }

        // Otherwise randomize
        return {
          id: i + 1,
          battery: Math.floor(Math.random() * 100),
          status: ["idle", "charging", "error"][Math.floor(Math.random() * 3)], // removed busy
          currentTask: "None",
          speed: (Math.random() * 5).toFixed(2),
          lastUpdated: new Date().toISOString(),
        };
      });
      console.log(bots);
      resolve(bots);
    }, 500);
  });
};
