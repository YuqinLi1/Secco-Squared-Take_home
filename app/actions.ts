"use server";
import { supabase } from "@/utils/supabase";

export async function submitLead(formData: FormData) {
  const data = Object.fromEntries(formData.entries());

  const { error } = await supabase.from("leads").insert([
    {
      full_name: data.fullName,
      email: data.email,
      company: data.company,
      source: data.source,
      message: data.message,
    },
  ]);

  // deal with error
  if (error) throw new Error(error.message);

  fetch("https://webhook-receiver-flax.vercel.app/api/lead-webhook", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "X-Candidate-Name": "Yuqin Li",
    },
    body: JSON.stringify(data),
  }).catch(console.error);

  return { success: true };
}
