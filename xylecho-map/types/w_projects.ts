export interface WebflowProject {
    id?: string;
    lastPublished?: string;
    lastUpdated?: string;
    createdOn?: string;
    isArchived?: boolean;
    isDraft?: boolean;
    fieldData?: {
        name?: string;
        object?: string;
        ville?: string;
        latitude?: string;
        longitude?: string;
        [key: string]: any;
    };
  }
  