import { env } from "node:process";

const MODE = env.NODE_ENV;

export default {
  plugins: {
    tailwindcss: {},
    autoprefixer: {},
    ...(MODE === "production" ? { cssnano: { preset: "default" } } : null),
  },
};
