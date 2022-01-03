import type { NextApiRequest, NextApiResponse } from 'next'
import { withIronSessionApiRoute } from 'iron-session/next'
import { ironOptions } from '../../utils/ironOptions'
import Family from '../../models/Family'

export default withIronSessionApiRoute(familyRoute, ironOptions)

async function familyRoute(
  req: NextApiRequest,
  res: NextApiResponse,
) {
  const familyId = req.session.user?.family
  if (familyId) {
    Family.findOne({ id: familyId }).exec(function(err, data) {
        if (err) {
            res.status(400).json({ error: 'Error while fetching family'})
        } 
        if (data) {
            res.status(200).json(data)
        }
    })
  } else {
      res.status(401).json({ error: 'Not authorized' })
  }
}