import { Resend } from 'resend'
import { NextRequest, NextResponse } from 'next/server'

const resend = new Resend(process.env.RESEND_API_KEY)

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const { name, email, phone, location, experience, message } = body

    // Validate required fields
    if (!name || !email || !phone || !location || !experience || !message) {
      return NextResponse.json(
        { error: 'All required fields must be filled' },
        { status: 400 }
      )
    }

    // Format experience labels
    const experienceLabels: Record<string, string> = {
      'none': 'No Experience',
      'some': 'Some Experience',
      'extensive': 'Extensive Experience',
      'franchise': 'Franchise Owner Experience',
    }

    // Send email using Resend
    const { data, error } = await resend.emails.send({
      from: 'Wrappy Franchise <onboarding@resend.dev>', // Update this with your verified domain
      to: process.env.FRANCHISE_EMAIL || 'franchise@wrappy.com', // Update with your email
      reply_to: email,
      subject: `New Franchise Inquiry from ${name}`,
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
          <h2 style="color: #0e0e0e; border-bottom: 2px solid #ff1e1e; padding-bottom: 10px;">
            New Franchise Inquiry
          </h2>
          
          <div style="margin-top: 20px; line-height: 1.6;">
            <p><strong>Name:</strong> ${name}</p>
            <p><strong>Email:</strong> <a href="mailto:${email}">${email}</a></p>
            <p><strong>Phone:</strong> ${phone}</p>
            <p><strong>Preferred Location:</strong> ${location}</p>
            <p><strong>Restaurant Experience:</strong> ${experienceLabels[experience] || experience}</p>
          </div>

          <div style="margin-top: 30px; padding: 20px; background-color: #f9f5ef; border-left: 4px solid #ff1e1e;">
            <h3 style="color: #0e0e0e; margin-top: 0;">Project Details:</h3>
            <p style="color: #333; white-space: pre-wrap;">${message}</p>
          </div>

          <div style="margin-top: 30px; padding-top: 20px; border-top: 1px solid #ddd; font-size: 12px; color: #666;">
            <p>This inquiry was submitted through the Wrappy franchise contact form.</p>
          </div>
        </div>
      `,
    })

    if (error) {
      console.error('Resend error:', error)
      return NextResponse.json(
        { error: 'Failed to send email' },
        { status: 500 }
      )
    }

    return NextResponse.json({ success: true, data }, { status: 200 })
  } catch (error) {
    console.error('API error:', error)
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    )
  }
}

