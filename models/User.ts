import mongoose, { Schema } from 'mongoose'
import bcrypt from 'bcrypt'

export interface IUser {
    name: string
    email: string,
    wishlist: mongoose.Schema.Types.ObjectId[],
    shoppingList: mongoose.Schema.Types.ObjectId[],
    family: mongoose.Schema.Types.ObjectId,
    password: string,
    comparePasswords(candidatePassword: string, cb: (err: Error | null, isMatch: boolean | null) => void): void;
}

const UserSchema = new Schema<IUser>({
  name: {
    type: String,
    required: [true, 'Please provide a name.'],
    maxlength: [20, 'Name cannot be more than 20 characters'],
    unique: true
  },
  email: {
    type: String,
    required: [true, 'Please provide an email.'],
    maxlength: [20, 'Email cannot be more than 20 characters'],
    unique: true
  },
  wishlist: [{
      type: mongoose.Schema.Types.ObjectId,
      ref: "Present"
    }
  ],
  shoppingList: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: "Present"
  }
],
  family: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Family"
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
  

export default mongoose.models.User || mongoose.model<IUser>('User', UserSchema)
