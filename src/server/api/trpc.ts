/* eslint-disable @typescript-eslint/no-unused-vars */
import { type CreateNextContextOptions } from "@trpc/server/adapters/next";
import { initTRPC } from "@trpc/server";
import superjson from "superjson";

type CreateContextOptions = Record<string, never>;

const createInnerTRPCContext = (_opts: CreateContextOptions) => {
  return {};
};

export const createTRPCContext = (_opts: CreateNextContextOptions) => {
  return createInnerTRPCContext({});
};

const t = initTRPC.context<typeof createTRPCContext>().create({
  transformer: superjson,
  errorFormatter({ shape }) {
    return shape;
  },
});

export const createTRPCRouter = t.router;
export const publicProcedure = t.procedure;
