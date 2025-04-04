import { myWebflowClient, sideId } from "./webflowClient";
import { WebflowCollection } from "@/types/w_collections";

export async function getWebflowCollections(): Promise<WebflowCollection[] | null> {
  try {
    if (!myWebflowClient || !sideId) {
      return null;
    }
    
    const collectionsData = await myWebflowClient.collections.list(sideId);
    const collections = collectionsData.collections as WebflowCollection[];
    
    return collections;
  } catch (error) {
    return null;
  }
}