import { json, type RequestHandler } from '@sveltejs/kit'
import * as otp from '$lib/otp'
import prisma from '$lib/prisma'

const POST: RequestHandler = async ({ request }) => {
  const { code, email } = await request.json()

  const counter = (await prisma.otp.findFirst({ where: { email } }))?.counter

  if (counter === undefined) {
    return json({
      success: false,
      body: {
        error:
          "We couldn't find a record of your email address. Please try signing up again."
      }
    })
  }

  const valid = otp.verify(email, counter, code)
  console.log('valid', valid)
  if (valid) {
    return json({ success: true })
  } else {
    return json({
      success: false,
      body: {
        error:
          "The code you entered doesn't seem to be correct. Try again or request a new code."
      }
    })
  }
}

export { POST }
