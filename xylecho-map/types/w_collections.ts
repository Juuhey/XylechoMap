export interface WebflowCollection {
    id: string;
    displayName: string;
    singularName: string;
    slug: string;
    createdOn: string; // Peut être transformé en Date après parsing
    lastUpdated: string; // Peut être transformé en Date après parsing
  }
  
  export interface WebflowCollectionsResponse {
    collections: WebflowCollection[];
  }
