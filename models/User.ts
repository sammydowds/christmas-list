import mongoose from 'mongoose'
import bcrypt from 'bcrypt'

export interface ApiUser {
    username: string,
    wishlist: number[],
    shoppingList: number[],
    family: number,
    password: string
}

/* PetSchema will correspond to a collection in your MongoDB database. */
const UserSchema = new mongoose.Schema<ApiUser>({
  username: {
    /* Name of the user*/

    type: String,
    required: [true, 'Please provide a name for this pet.'],
    maxlength: [20, 'Name cannot be more than 60 characters'],
  },
  wishlist: {
    type: [Number]
  },
  shoppingList: {
    type: [Number]
  },
  family: {
    type: Number
  },
  password: {
    type: String,
    required: [true, 'Please provide a password']
  }
})

// middleware to encrypt password
UserSchema.pre('save', (next) => {
  const user:any = this
  if (user && !user.isModified('password')) return next();
  bcrypt.genSalt(10, (err, salt) => {
    if (err) return next(err)
    bcrypt.hash(user?.password, salt, (err, hash) => {
      if (err) return next(err);
      user.password = hash;
      next();
    })
  })
})

// method to compare password
UserSchema.methods.comparePassword = (candidatePassword, cb) => {
  if (this) {
    const user: any = this
    bcrypt.compare(candidatePassword, user.password, (err, isMatch) => {
      if(err) return cb(err);
      cb(null, isMatch);
    });
  }
}
  

export default mongoose.models.User || mongoose.model('User', UserSchema)
