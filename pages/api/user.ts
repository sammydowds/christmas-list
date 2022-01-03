import { withIronSessionApiRoute } from "iron-session/next";
import { ironOptions } from "../../utils/ironOptions";
import { NextApiRequest, NextApiResponse } from "next";
import Family from "../../models/Family";
import User from "../../models/User";
import Present from '../../models/Present'
import dbConnect from "../../utils/dbConnect";

// TODO: type the User here

const generateFamilyPasscode = (length: number) => {
  let result = ''
  const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
  const charactersLength = characters.length
  for ( let i = 0; i < length; i++ ) {
    result += characters.charAt(Math.floor(Math.random() * charactersLength))
 }
 return result
}

export default withIronSessionApiRoute(userRoute, ironOptions);

async function userRoute(req: NextApiRequest, res: NextApiResponse) {
  const { method } = req
  switch (method) {
    case 'GET':
      const ironUser = req?.session?.user
      if (ironUser) {
        const wishlistPresents = await Present.find().where('_id').in(ironUser.wishlist).exec()
        const shoppingListPresents = await Present.find().where('_id').in(ironUser.shoppingList).exec()
        const family = await Family.findOne({ id: ironUser.family }).exec()
        res.status(200).json({...ironUser, wishlist: wishlistPresents, shoppinglist: shoppingListPresents, family: family})
      } else {
        res.json({});
      }
      break
    case 'POST':
      // get form data
      await dbConnect()
      const { email, password, passcode } = req.body

      // passcode exists only when trying to join a family
      if (passcode) {
        // find family with passcode
        Family.findOne({ passcode: passcode}).exec(async function(err, family) {
          if (err) {
            res.status(400).json({ error: 'Error while fetching Family info'})
          }

          if (family) {
            // relate family and user
            const newUser = new User({ email: email, password: password, family: family._id.toString()})
            await newUser.save()
            family.members.push(newUser._id.toString())
            await family.save()
            const ironUser = { isLoggedIn: true, ...newUser}
            req.session.user = ironUser
            await req.session.save()
            res.status(200).json(newUser)
          }
          res.status(400).json({ error: 'Family not found!'})
        })
        break
      } else {
        // create family
        const passcode = generateFamilyPasscode(25)
        const family = new Family({ passcode: passcode })
        await family.save()

        // relate family and user
        const familyId = family._id.toString()
        const newUser = new User({ email: email, password: password, family: familyId})
        await newUser.save()
        family.members = [newUser._id.toString()]
        await family.save()
        const ironUser = { isLoggedIn: true, ...newUser}
        req.session.user = ironUser
        await req.session.save()
        res.status(200).json(newUser)
        break
      }
  }
}
