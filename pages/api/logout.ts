import type { NextApiRequest, NextApiResponse } from 'next'
import User from '../../models/User'
import { withIronSessionApiRoute } from 'iron-session/next'
import { ironOptions } from '../../utils/ironOptions'

export default withIronSessionApiRoute(logoutRoute, ironOptions)

async function logoutRoute(
  req: NextApiRequest,
  res: NextApiResponse,
) {
  req.session.destroy();
  res.json({});
}
