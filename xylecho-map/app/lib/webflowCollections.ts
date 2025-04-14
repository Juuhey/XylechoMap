import { myWebflowClient, siteId } from "./webflowClient";
import { WebflowCollection } from "@/types/w_collections";

export async function getWebflowCollections(): Promise<WebflowCollection[] | null> {
  try {
    if (!myWebflowClient || !siteId) {
      return null;
    }
    
    const collectionsData = await myWebflowClient.collections.list(siteId);
    const collections = collectionsData.collections as WebflowCollection[];
    
    return collections;
  } catch {
    return null;
  }
}