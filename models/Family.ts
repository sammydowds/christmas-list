import mongoose from 'mongoose'

export interface Family {
    name: string
    passcode: string,
    members?: mongoose.Schema.Types.ObjectId[]
}

const FamilySchema = new mongoose.Schema<Family>({
  passcode: {
    type: String,
    required: [true, 'Please provide a passcode for the family.'],
    minlength: [20, 'Passcode must be greater than 20 characters.'],
    unique: true
  },
  members: {
    type: [{
      type: mongoose.Schema.Types.ObjectId,
      ref: "User"
    }],
  },
  name: {
    type: String,
    required: [true, 'Please provide a name for your family.'],
  }
})

export default mongoose.models.Family || mongoose.model('Family', FamilySchema)
