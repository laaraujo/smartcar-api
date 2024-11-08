import { z } from "zod";
import dotenv from "dotenv";

dotenv.config();

const EnvSettings = z.object({
  PORT: z.optional(z.number()).default(3000),
  GM_API_URL: z.string().url(),
});

export default EnvSettings.parse(process.env);
