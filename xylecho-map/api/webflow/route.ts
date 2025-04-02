import { WebflowClient } from "webflow-api";
import { WebflowCollectionsResponse, WebflowCollection } from "@/types/w_collections";

const token = `${process.env.WEBFLOW_CMS_TOKEN}`;
const siteId = `${process.env.SITE_ID}`
    
export default async function getWebflowData(): Promise<WebflowCollectionsResponse | null> {
  try {
    const client = new WebflowClient({ accessToken: token });
    const collectionsData = await client.collections.list(siteId);

    const collections: WebflowCollection[] = collectionsData as WebflowCollection[];

    return { collections };
  } catch (error) {
    console.error("There was an error:", error);
    return null;
  }
}
