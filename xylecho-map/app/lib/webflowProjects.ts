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
      
    try {
        const projectsList = await myWebflowClient.collections.items.listItemsLive(
            `${collectionProjects?.id}`
        );

        const projects: Project[] = projectsList.items?.map((item: WebflowProject) => new Project(item)) || [];

        // projectsList.items?.forEach((item) => {
        //     console.log(item.fieldData.name);
        // });
        
        return projects;

      } catch {
        return null;

    }} catch {
    return null;
  }
}