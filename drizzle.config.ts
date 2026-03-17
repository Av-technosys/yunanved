import { defineConfig, type Config } from "drizzle-kit";
import { DATABASE_URL } from "./env";

export default defineConfig({
    schema: "./db/*.ts",
    out: "./db/migrations",
    dialect: "postgresql",

    dbCredentials: {
        url: DATABASE_URL,
    },
} satisfies Config);
