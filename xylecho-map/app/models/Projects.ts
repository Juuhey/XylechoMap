import { WebflowProject } from "@/types/w_projects";

export class Project {
  id?: string;
  slug?: string;
  year?: string;
  name?: string;
  object?: string;
  ville?: string;
  latitude?: string;
  longitude?: string;
  mapOnly?: boolean;

    constructor(item: WebflowProject) {
      this.id = item.id;
      this.slug = item.fieldData?.slug;
      this.year = item.fieldData?.year;
      this.name = item.fieldData?.name;
      this.object = item.fieldData?.object;
      this.ville = item.fieldData?.ville;
      this.latitude = item.fieldData?.latitude;
      this.longitude = item.fieldData?.longitude;
      this.mapOnly = item.mapOnly;
  }
}
