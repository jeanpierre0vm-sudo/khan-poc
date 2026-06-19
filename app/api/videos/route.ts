const NOTION_DATABASE_ID = "d0d059c7-724f-4f28-aa41-e6eefd38c12b";
const NOTION_API_URL = `https://api.notion.com/v1/databases/${NOTION_DATABASE_ID}/query`;

function extractRichText(prop: any): string {
  return prop?.rich_text?.map((t: any) => t.plain_text).join("") ?? "";
}

function extractTitle(prop: any): string {
  return prop?.title?.map((t: any) => t.plain_text).join("") ?? "";
}

export async function GET() {
  const token = process.env.NOTION_TOKEN;

  if (!token) {
    console.error("[/api/videos] NOTION_TOKEN is not set");
    return Response.json({ error: "NOTION_TOKEN not configured" }, { status: 500 });
  }

  console.log("[/api/videos] NOTION_TOKEN present, querying database:", NOTION_DATABASE_ID);

  try {
    const results: any[] = [];
    let cursor: string | undefined;

    do {
      const body: Record<string, any> = { page_size: 100 };
      if (cursor) body.start_cursor = cursor;

      const res = await fetch(NOTION_API_URL, {
        method: "POST",
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
          "Notion-Version": "2022-06-28",
        },
        body: JSON.stringify(body),
        cache: "no-store",
      });

      if (!res.ok) {
        const text = await res.text();
        console.error(`[/api/videos] Notion API returned ${res.status}:`, text);
        return Response.json(
          { error: `Notion API error: ${res.status}`, detail: text },
          { status: res.status }
        );
      }

      const data = await res.json();
      console.log(`[/api/videos] Received ${data.results?.length ?? 0} pages, has_more: ${data.has_more}`);

      for (const page of data.results) {
        const p = page.properties;
        results.push({
          id: page.id,
          videoName: extractTitle(p["Video Name"]),
          title: extractRichText(p["Title"]),
          description: extractRichText(p["Description"]),
          tags: extractRichText(p["Tags"]),
          timestamps: extractRichText(p["Timestamps"]),
          qaStatus: p["QA Status"]?.select?.name ?? null,
          videoUrl: p["Video URL"]?.url ?? null,
          processingCost: extractRichText(p["Processing Cost"]),
          duration: extractRichText(p["Duration"]),
        });
      }

      cursor = data.has_more ? data.next_cursor : undefined;
    } while (cursor);

    console.log(`[/api/videos] Returning ${results.length} total records`);
    return Response.json(results);
  } catch (err) {
    const message = err instanceof Error ? err.message : "Unknown error";
    console.error("[/api/videos] Caught exception:", message);
    return Response.json({ error: message }, { status: 500 });
  }
}
