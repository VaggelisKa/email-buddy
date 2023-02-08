import { msalInstance } from "src/pages/_app";
import { loginRequest } from "./microsoft-auth";

export type EmailAddress = {
  name: string;
  address: string;
};

export type MicrosoftEmail = {
  "@odata.etag": string;
  id: string;
  createdDateTime: string;
  lastModifiedDateTime: string;
  changeKey: string;
  categories: string[];
  receivedDateTime: string;
  sentDateTime: string;
  hasAttachments: boolean;
  internetMessageId: string;
  subject: string;
  bodyPreview: string;
  importance: string;
  parentFolderId: string;
  conversationId: string;
  conversationIndex: string;
  isDeliveryReceiptRequested?: boolean;
  isReadReceiptRequested: boolean;
  isRead: boolean;
  isDraft: boolean;
  webLink: string;
  inferenceClassification: string;
  body: {
    contentType: string;
    content: string;
  };
  sender: {
    emailAddress: EmailAddress;
  };
  from: {
    emailAddress: EmailAddress;
  };
  toRecipients: EmailAddress[];
  ccRecipients: string[];
  bccRecipients: string[];
  replyTo: string[];
  flag: {
    flagStatus: string;
  };
};

const baseUrl = "https://graph.microsoft.com/v1.0";

const getAccessToken = async () => {
  const account = msalInstance.getActiveAccount();

  if (!account) {
    throw new Error("No active account");
  }

  const tokenRes = await msalInstance.acquireTokenSilent({
    scopes: loginRequest.scopes,
    account,
  });

  if (!tokenRes) {
    throw new Error("No access token");
  }

  return tokenRes;
};

export const getHeaders = async () => {
  const tokenData = await getAccessToken();

  const headers = new Headers();

  headers.append("Content-Type", "application/json");
  headers.append("Authorization", `Bearer ${tokenData.accessToken}`);

  return headers;
};

export const fetchEmails = async () => {
  try {
    const emailsData = (await (
      await fetch(`${baseUrl}/me/messages`, {
        method: "GET",
        headers: await getHeaders(),
      })
    ).json()) as { value: MicrosoftEmail[] };

    return emailsData ?? [];
  } catch (error) {
    return { value: [] };
  }
};
