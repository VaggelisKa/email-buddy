// @ts-check
import { serverSchema, serverEnv } from "./schema.mjs";
import { env as clientEnv, formatErrors } from "./client.mjs";

const _serverEnv = serverSchema.safeParse(serverEnv);

if (!_serverEnv.success) {
  console.error(
    "Invalid environment variables:\n",
    ...formatErrors(_serverEnv.error.format())
  );
  throw new Error("Invalid environment variables");
}

for (let key of Object.keys(_serverEnv.data)) {
  if (key.startsWith("NEXT_PUBLIC_")) {
    console.warn("Exposing a server-side env-variable:", key);

    throw new Error("Exposing a server-side env-variable");
  }
}

export const env = { ..._serverEnv.data, ...clientEnv };
