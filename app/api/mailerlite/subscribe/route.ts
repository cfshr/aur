import { type NextRequest, NextResponse } from "next/server"

export async function POST(request: NextRequest) {
  try {
    const { email } = await request.json()

    // TODO: Replace with your actual MailerLite API key and group ID
    const MAILERLITE_API_KEY = process.env.MAILERLITE_API_KEY
    const MAILERLITE_GROUP_ID = process.env.MAILERLITE_JEWELER_WAITLIST_GROUP_ID

    if (!MAILERLITE_API_KEY || !MAILERLITE_GROUP_ID) {
      throw new Error("MailerLite configuration missing")
    }

    // MailerLite API call
    const response = await fetch(`https://api.mailerlite.com/api/v2/groups/${MAILERLITE_GROUP_ID}/subscribers`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "X-MailerLite-ApiKey": MAILERLITE_API_KEY,
      },
      body: JSON.stringify({
        email: email,
        fields: {
          source: "jeweler_waitlist_popup",
        },
      }),
    })

    if (!response.ok) {
      throw new Error(`MailerLite API error: ${response.status}`)
    }

    const data = await response.json()

    return NextResponse.json({
      success: true,
      message: "Successfully subscribed to waitlist",
      data,
    })
  } catch (error) {
    console.error("MailerLite subscription error:", error)

    return NextResponse.json(
      {
        success: false,
        message: "Failed to subscribe to waitlist",
      },
      { status: 500 },
    )
  }
}
