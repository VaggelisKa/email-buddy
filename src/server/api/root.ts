import { createTRPCRouter } from "./trpc";
import { chatGptRouter } from "./routers/chat-gpt";

export const appRouter = createTRPCRouter({
  chatGpt: chatGptRouter,
});

export type AppRouter = typeof appRouter;
