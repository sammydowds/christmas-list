import mongoose, { Schema, Document } from 'mongoose'
import bcrypt from 'bcrypt'

export interface IUser extends Document {
    email: string,
    wishlist?: number[],
    shoppingList?: number[],
    family?: number,
    password: string,
    comparePasswords(candidatePassword: string, cb: (err: Error | null, isMatch: boolean | null) => void): void;
}

const UserSchema = new Schema<IUser>({
  email: {
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
UserSchema.pre('save', function(next) {
  if (!this.isModified('password')) return next();
  bcrypt.genSalt(10, (err, salt) => {
    if (err) return next(err)
    bcrypt.hash(this.password, salt, (err, hash) => {
      if (err) return next(err);
      this.password = hash;
      next();
    })
  })
})

// method to compare password
UserSchema.methods.comparePasswords = function (candidatePassword, cb) {
  bcrypt.compare(candidatePassword, this.password, (err, isMatch) => {
    if(err) return cb(err);
    cb(null, isMatch);
  });
}
  

export default mongoose.model<IUser>('User', UserSchema)
