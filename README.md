# Email Buddy

## What is this app?

This app allows you to connect to your Microsoft outlook account and after selecting an email, it will generate a response for you.

## How does it work?

Email Buddy uses the [Microsoft Graph API](https://learn.microsoft.com/en-us/graph/use-the-api) to connect to your outlook account. It then extracts the email's subject and feeds it into ChatGPT to get back a human-like response.

![image](https://user-images.githubusercontent.com/63293880/221406688-f00fd84d-5022-4fc4-95ac-7dea191ffbda.png)

## Some technologies used

1. [Microsoft Graph API](https://learn.microsoft.com/en-us/graph/use-the-api) and Azure.
2. [Next.js](https://nextjs.org/) for the web.
3. [TRPC](https://trpc.io/) for the API and it's typesafety.
4. [Tailwind CSS](https://tailwindcss.com/) for the styling.
5. [ChatGPT API](https://openai.com/api/) for the response generation.
