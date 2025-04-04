import MapComponent from "@/components/MapComponent";
import { getWebflowProjects } from "./lib/webflowProjects";
import { plainifyProjects } from "./utils/plainifyProjects";

export default async function MapPage() {
  const projects = await getWebflowProjects();

  // conversion ici projects to play objects
  const plainProjects = projects ? plainifyProjects(projects) : [];
  return <MapComponent projects={plainProjects} />;
}