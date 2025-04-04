// app/page.tsx
import { getWebflowProjects } from "./lib/webflowProjects";
import { plainifyProjects } from "./utils/plainifyProjects";
import MapWrapper from "./components/mapWrapper";

export default async function MapPage() {
  const projects = await getWebflowProjects();
  const plainProjects = projects ? plainifyProjects(projects) : [];

  return <MapWrapper projects={plainProjects} />;
}
