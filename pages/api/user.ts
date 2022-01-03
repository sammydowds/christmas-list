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
        await dbConnect()
        const { wishlist, shoppingList } = await User.findById(ironUser._id).exec()

        // note: could break these out into separate GET requests
        const wishlistPresents = await Present.find().where('_id').in(wishlist).exec()
        const shoppingListPresents = await Present.find().where('_id').in(shoppingList).exec()
        const userFamily = await Family.findById(ironUser.family).exec()

        return res.status(200).json({...ironUser, wishlist: wishlistPresents, shoppingList: shoppingListPresents, family: userFamily})
      } else {
        return res.status(401).json({ error: 'Not authorized'});
      }
      break
    case 'POST':
      // get form data
      await dbConnect()
      const { email, password, passcode, name } = req.body

      // passcode exists only when trying to join a family
      if (passcode) {
        // find family with passcode
        Family.findOne({ passcode: passcode}).exec(async function(err, family) {
          if (err) {
            return res.status(400).json({ error: 'Error while fetching Family info'})
          }

          if (family) {
            // relate family and user
            const newUser = new User({ name: name, email: email, password: password, family: family._id.toString()})
            await newUser.save()
            family.members.push(newUser._id.toString())
            await family.save()
            const ironUser = { _id: newUser._id, isLoggedIn: true, name: newUser.name, family: newUser.family, email: newUser.email }
            req.session.user = ironUser
            await req.session.save()
            return res.status(200).json(newUser)
          }
          return res.status(400).json({ error: 'Family not found!'})
        })
        break
      } else {
        // create family
        const passcode = generateFamilyPasscode(25)
        const family = new Family({ passcode: passcode })
        await family.save()

        // relate family and user
        const familyId = family._id.toString()
        const newUser = new User({ name: name, email: email, password: password, family: familyId})
        await newUser.save()
        family.members = [newUser._id.toString()]
        await family.save()
        const ironUser = { _id: newUser._id, isLoggedIn: true, name: newUser.name, family: newUser.family, email: newUser.email }
        req.session.user = ironUser
        await req.session.save()
        return res.status(200).json(newUser)
        break
      }
    default:
      res.status(405).json({ error: 'Bad Request' })
      break
  }
}
