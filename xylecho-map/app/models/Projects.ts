import { WebflowProject } from "@/types/w_projects";

export class Project {
    id?: string;
    lastPublished?: string;
    lastUpdated?: string;
    name?: string;
    object?: string;
    ville?: string;
    latitude?: string;
    longitude?: string;

    constructor(item: WebflowProject) {
        this.id = item.id;
        this.lastPublished = item.lastPublished;
        this.lastUpdated = item.lastUpdated;
        this.name = item.fieldData?.name;
        this.object = item.fieldData?.object;
        this.ville = item.fieldData?.ville;
        this.latitude = item.fieldData?.latitude;
        this.longitude = item.fieldData?.longitude;
  }
}
