import { Project } from "@/app/models/Projects";

export function plainifyProjects(projects: Project[]): Record<string, any>[] {
  return projects.map(project => Object.assign({}, project));
}
