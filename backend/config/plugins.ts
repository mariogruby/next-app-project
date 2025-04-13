export default () => ({
    'strapi-neon-tech-db-branches': {
        enabled: true,
        config: {
          neonApiKey: "napi_t1jjwa8qi82chw63xi8qkyb9lhhgorlk1q0hebw43e3daa1gqei94xugr1osd863", // get it from here: https://console.neon.tech/app/settings/api-keys
          neonProjectName: "ecommerce", // the neon project under wich your DB runs
          neonRole: "neondb_owner", // create it manually under roles for your project first
          gitBranch: "main" // branch can be pinned via this config option. Will not use branch from git then. Usefull for preview/production deployment
        }
      },
});
