export async function getCMSData() {
  try {
    const res = await fetch(`https://api.webflow.com/v2/sites/${process.env.SITE_ID}/collections`, {
      method: "GET",
      headers: {
        "Authorization": `Bearer ${process.env.WEBFLOW_CMS_TOKEN}`,
        "Accept": "application/json",
        "Content-Type": "application/json"
      }
    });

    if (!res.ok) {
      throw new Error(`Erreur API Webflow: ${res.status} ${res.statusText}`);
    }

    const data = await res.json();
    return data
  } catch (error) {
    return error;
  }
}
