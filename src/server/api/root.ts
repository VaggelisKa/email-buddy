import { createTRPCRouter } from "./trpc";
import { exampleRouter } from "./routers/example";
import { chatGptRouter } from "./routers/chat-gpt";

export const appRouter = createTRPCRouter({
  example: exampleRouter,
  chatGpt: chatGptRouter,
});

export type AppRouter = typeof appRouter;
