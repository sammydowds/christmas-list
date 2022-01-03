import type { NextApiRequest, NextApiResponse } from 'next'
import User from '../../models/User'
import { withIronSessionApiRoute } from 'iron-session/next'
import { ironOptions } from '../../utils/ironOptions'

export default withIronSessionApiRoute(presentRoute, ironOptions)

async function presentRoute(
  req: NextApiRequest,
  res: NextApiResponse,
) {
  const { method } = req
  switch (method) {
    case 'POST':
      const { id, to, from, description } = req.body
      // if id exists update, if not create present
      if (id) {
        // update present
        // if updating from - then assign or remove from your shopping list
      } else {
        // create present 
        // assign present to user wishlist
      }
      break
  }
}
