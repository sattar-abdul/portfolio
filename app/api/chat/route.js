import { NextResponse } from "next/server";
import resumeBio from "@/data/resumeData";

export async function POST(req) {
  const apiKey = process.env.API_KEY; // .env.local → API_KEY=hf_xxx

  const { message } = await req.json();

  const response = await fetch("https://router.huggingface.co/v1/chat/completions", {
    method: "POST",
    headers: {
      Authorization: `Bearer ${apiKey}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      model: "HuggingFaceH4/zephyr-7b-alpha:featherless-ai",
      messages: [
        {
          role: "system",
          content: `You are a friendly and helpful assistant for Md Abdul Sattar. Use the following bio to answer questions about him:\n\n${resumeBio}`,
        },
        {
          role: "user",
          content: message,
        },
      ],
    }),
  });

  if (!response.ok) {
    const errText = await response.text();
    return NextResponse.json({
      response: "Sorry, something went wrong with the API.",
      error: errText,
    });
  }

  const data = await response.json();
  const reply = data.choices?.[0]?.message?.content || "Sorry, I didn't understand that.";

  return NextResponse.json({ response: reply.trim() });
}
