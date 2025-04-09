import { myWebflowClient, sideId } from "./webflowClient";
import { getWebflowCollections } from "./webflowCollections";
import { Project } from "../models/Projects";
import { WebflowProject } from "@/types/w_projects";

export async function getWebflowProjects() {
  try {
    if (!myWebflowClient || !sideId) {
      return null;
      }
        
    const collections = await getWebflowCollections();
    const collectionProjects = collections?.find((project) => project.displayName === "Projects");
    const collectionMapProjects = collections?.find((project) => project.displayName === "Projects Maps");
      
    try {
        const projectsList = await myWebflowClient.collections.items.listItemsLive(
            `${collectionProjects?.id}`
      );
      
        const otherMapProjetcsList = await myWebflowClient.collections.items.listItemsLive(
          `${collectionMapProjects?.id}`
        );
      
        const projects: Project[] = [
          ...(projectsList.items?.map((item: WebflowProject) => new Project(item)) || []),
          ...(otherMapProjetcsList.items?.map((item: WebflowProject) => new Project(item)) || [])
      ];
      
        return projects;

      } catch {
        return null;

    }} catch {
    return null;
  }
}