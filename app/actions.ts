"use server";
import { supabase } from "@/utils/supabase";

export async function submitLead(formData: FormData) {
  const data = Object.fromEntries(formData.entries());

  try {
    const { error } = await supabase.from("leads").insert([
      {
        full_name: data.fullName,
        email: data.email,
        company: data.company,
        source: data.source,
        message: data.message,
      },
    ]);

    // deal with duplicate emails error
    if (error) {
      if (error.code === "23505")
        return { error: "This email is already registered." };
      return { error: error.message };
    }

    try {
      const res = await fetch(
        "https://webhook-receiver-flax.vercel.app/api/lead-webhook",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            "X-Candidate-Name": "Yuqin Li",
          },
          body: JSON.stringify(data),
        }
      );
      if (!res.ok) console.error("Webhook status error:", res.status);
    } catch (err) {
      console.error("Webhook network error:", err);
    }

    return { success: true };
  } catch (err) {
    return { error: "Network failure. Please try again." };
  }
}
