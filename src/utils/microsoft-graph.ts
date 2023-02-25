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
  headers.append("Prefer", "outlook.body-content-type=text");
  headers.append("Authorization", `Bearer ${tokenData.accessToken}`);

  return headers;
};

export const fetchEmails = async () => {
  const filter =
    "$filter=receivedDateTime ge 2022-01-01T00:00:00Z and not(contains(from/emailAddress/address, 'microsoft.com') or contains(from/emailAddress/address, 'no-reply'))";

  try {
    const emailsData = (await (
      await fetch(
        `${baseUrl}/me/mailFolders/inbox/messages?$orderby=receivedDateTime desc&$count=true&$top=20&${filter}`,
        {
          method: "GET",
          headers: await getHeaders(),
        }
      )
    ).json()) as { value: MicrosoftEmail[]; "@odata.count": number };

    return emailsData ?? [];
  } catch (error) {
    return { value: [], "@odata.count": 0 };
  }
};
