import getWebflowData from "@/api/webflow/route";
import { WebflowCollection } from "@/types/w_collections";

export default async function Page() {
  const data = await getWebflowData();

  if (!data) {
    return <p>Erreur lors du chargement des collections Webflow.</p>;
  }

  return (
    <div>
      <h1>Collections Webflow</h1>
      <ul>
        {data.collections.map((collection: WebflowCollection) => (
          <li key={collection.id}>{collection.displayName}</li>
        ))}
      </ul>
    </div>
  );
}
