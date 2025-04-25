import { myWebflowClient, siteId } from "./webflowClient";
import { getWebflowCollections } from "./webflowCollections";
import { Project } from "../models/Projects";

export async function getWebflowProjects() {
  try {
    if (!myWebflowClient || !siteId) {
      return null;
      }
        
    const collections = await getWebflowCollections();
    const collectionProjects = collections?.find((project) => project.id === `${process.env.WEBFLOW_COLLECTION_PROJETS_ID}`);
    const collectionMapProjects = collections?.find((project) => project.id === `${process.env.WEBFLOW_COLLECTION_PROJETSMAP_ID}`);
      
    try { 
        const projectsList = await myWebflowClient.collections.items.listItemsLive(
            `${collectionProjects?.id}`
      );
      
        const otherMapProjetcsList = await myWebflowClient.collections.items.listItemsLive(
          `${collectionMapProjects?.id}`
        );
      
        const projects = [
          ...(projectsList.items?.map(item => ({ ...new Project(item), mapOnly: false })) || []),
          ...(otherMapProjetcsList.items?.map(item => ({ ...new Project(item), mapOnly : true})) || [])
        ];
        
      
        return projects;

      } catch {
        return null;

    }} catch {
    return null;
  }
}