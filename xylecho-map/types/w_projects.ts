export interface WebflowProject {
    id?: string;
    isArchived?: boolean;
    isDraft?: boolean;
    [key: string]: any;
    fieldData?: {
        name?: string;
        object?: string;
        ville?: string;
        latitude?: string;
        longitude?: string;
        slug?: string;
        [key: string]: any;
    };
    mapOnly?: boolean;
  }
  