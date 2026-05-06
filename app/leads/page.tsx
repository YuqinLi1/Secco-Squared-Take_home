import { createClient } from "@supabase/supabase-js";

export const dynamic = "force-dynamic";

// use Service Role Key
const supabaseAdmin = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.SUPABASE_SERVICE_ROLE_KEY!
);

export default async function LeadsPage() {
  const { data: leads, error } = await supabaseAdmin
    .from("leads")
    .select("*")
    .order("created_at", { ascending: false });

  if (error) {
    console.error("Fetch error:", error.message);
  }

  return (
    <main className="p-8 max-w-4xl mx-auto text-black">
      <h1 className="text-2xl font-bold mb-6">Leads</h1>
      <div className="overflow-x-auto bg-white shadow-md rounded">
        <table className="min-w-full text-left border-collapse">
          <thead>
            <tr className="bg-gray-100 border-b">
              <th className="p-4">Name</th>
              <th className="p-4">Email</th>
              <th className="p-4">Company</th>
              <th className="p-4">Source</th>
              <th className="p-4">Date</th>
            </tr>
          </thead>
          <tbody>
            {leads?.map((lead) => (
              <tr key={lead.id} className="border-b">
                <td className="p-4">{lead.full_name}</td>
                <td className="p-4">{lead.email}</td>
                <td className="p-4">{lead.company}</td>
                <td className="p-4">{lead.source}</td>
                <td className="p-4">
                  {new Date(lead.created_at).toLocaleDateString()}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </main>
  );
}
