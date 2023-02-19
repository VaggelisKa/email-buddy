import { createTRPCRouter, publicProcedure } from "../trpc";
import z from "zod";

export const chatGptRouter = createTRPCRouter({
  generateReply: publicProcedure
    .input(z.object({ subject: z.string(), manner: z.string() }))
    .mutation(({ input }) => {
      console.log("From trpc", input);
    }),
});
