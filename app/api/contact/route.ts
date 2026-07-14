import { NextResponse } from "next/server";
import { contactFormSchema } from "@/lib/validators/contact";

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const parsed = contactFormSchema.safeParse(body);

    if (!parsed.success) {
      return NextResponse.json(
        {
          ok: false,
          message: "Form doğrulaması başarısız.",
          errors: parsed.error.flatten().fieldErrors,
        },
        { status: 400 },
      );
    }

    console.log("[contact]", {
      receivedAt: new Date().toISOString(),
      ...parsed.data,
    });

    return NextResponse.json({ ok: true });
  } catch {
    return NextResponse.json(
      { ok: false, message: "Geçersiz istek." },
      { status: 400 },
    );
  }
}
