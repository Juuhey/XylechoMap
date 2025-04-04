import { WebflowClient } from "webflow-api";

const token = `${process.env.WEBFLOW_CMS_TOKEN}`;

if (!token) {
  throw new Error("❌ WEBFLOW_CMS_TOKEN is missing in .env");
}

export const myWebflowClient = new WebflowClient({ accessToken: token });
export const sideId = `${process.env.WEBFLOW_SITE_ID}`;