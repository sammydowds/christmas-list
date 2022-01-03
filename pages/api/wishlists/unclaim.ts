import type { NextApiRequest, NextApiResponse } from 'next'
import User from '../../../models/User'
import { withIronSessionApiRoute } from 'iron-session/next'
import { ironOptions } from '../../../utils/ironOptions'

export default withIronSessionApiRoute(unclaimRoute, ironOptions)

async function unclaimRoute(
  req: NextApiRequest,
  res: NextApiResponse,
) {
  const { method } = req
  switch (method) {
    case 'POST':
      const { id, to, from, description, isBought } = req.body
      if (id) {
        // update present
        // update from to be from user.name
        // add present to wishlist of user
      } else {
        // 400 please provide present id 
      }
      break
  }
}
