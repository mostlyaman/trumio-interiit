import { type WebhookEvent } from '@clerk/nextjs/server'
import type { NextApiRequest, NextApiResponse } from 'next'
import { db } from '~/server/db'
type ResponseData = {
  message: string
}
 
export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<ResponseData>
) {
  if(req.method === 'POST') {
    const event = req.body as WebhookEvent
    switch(event.type) {
      case 'email.created':
        await db.user.create({ data: { id: event.data.id } })
    }
    res.status(200).json({ message: `User created: ${event.data.id}` })
  } else {
    res.status(405).json({ message: 'Method Not Allowed.' })
  }
}