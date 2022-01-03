import type { NextApiRequest, NextApiResponse } from 'next'
import User from '../../../models/User'
import { withIronSessionApiRoute } from 'iron-session/next'
import { ironOptions } from '../../../utils/ironOptions'

export default withIronSessionApiRoute(unbuyRoute, ironOptions)

async function unbuyRoute(
  req: NextApiRequest,
  res: NextApiResponse,
) {
  const { method } = req
  switch (method) {
    case 'POST':
      const { id } = req.body
      // if id exists update, if not create present
      if (id) {
        // find present 
        // toggle isBought to false
        // save
      } else {
        // 400 please provide id
      }
      break
  }
}
