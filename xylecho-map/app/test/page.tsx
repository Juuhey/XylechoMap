import { getWebflowCollections } from "../lib/webflowCollections";
import { WebflowCollection } from "@/types/w_collections";
import { getWebflowProjects } from "../lib/webflowProjects";

export default async function Page() {
  const data = await getWebflowCollections();
  const otherData = await getWebflowProjects();
  console.log("Data from getProjets : ", otherData);
  console.log("raw data : ", data);
  
  if (!data) {
    return <p>Erreur lors du chargement des collections Webflow.</p>;
  }
  
  return (
    <div>
      <h1>Collections Webflow</h1>
      <ul>
        {data.map((collection: WebflowCollection) => (
          <li key={collection.id}>{collection.displayName}</li>
        ))}
      </ul>
    </div>
  );
}