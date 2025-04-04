import { Project } from "@/app/models/Projects";

export function plainifyProjects(projects: Project[]): Project[] {
  return projects.map(project => Object.assign({}, project));
}
