export default () => ({
    'strapi-neon-tech-db-branches': {
        enabled: true,
        config: {
          neonApiKey: "napi_uwt38omy00upv0ed8sy2icdwunbunfs1aoamqt470ux1jbqyn21uda1lrz8o4718", // get it from here: https://console.neon.tech/app/settings/api-keys
          neonProjectName: "ecommerce", // the neon project under wich your DB runs
          neonRole: "neondb_owner", // create it manually under roles for your project first
          gitBranch: "main" // branch can be pinned via this config option. Will not use branch from git then. Usefull for preview/production deployment
        }
    },
});
