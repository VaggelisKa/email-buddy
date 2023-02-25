import z from "zod";
import { createTRPCRouter, publicProcedure } from "../trpc";
import { Configuration, OpenAIApi } from "openai";
import { env } from "src/env/server.mjs";

const configuration = new Configuration({
  organization: "org-PEQemAV1ce4XtgMFnNBBoPih",
  apiKey: env.OPENAI_API_KEY,
});
const openai = new OpenAIApi(configuration);

export const chatGptRouter = createTRPCRouter({
  generateReply: publicProcedure
    .input(
      z.object({
        subject: z.string(),
        manner: z.string(),
        name: z.string().optional(),
      })
    )
    .mutation(async ({ input }) => {
      const prompt = `Given the context that you are an email chatbot reply to the following message ${
        input.subject
      }, The manner of the email should be ${
        input.manner
      }, Always add an email closing with from the following name ${
        input.name || ""
      }, You should never reveal that you are a chatbot. If the email can be clasified as welcome, spam, promotional or security notification then do not generate a reply and instead mention that 'This reply service is not meant to be used for this type of email'`;

      try {
        const response = await openai.createCompletion({
          model: "text-davinci-003",
          prompt,
          max_tokens: 250,
          temperature: 0,
          top_p: 1,
          n: 1,
          stream: false,
          logprobs: null,
        });

        return { success: true, ...response.data };
      } catch (error) {
        throw new Error("Something went wrong");
      }
    }),
});
