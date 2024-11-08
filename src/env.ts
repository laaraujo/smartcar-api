import { z } from "zod";

const EnvSettings = z.object({
  PORT: z.optional(z.number()).default(3000),
});

export default EnvSettings.parse(process.env);
