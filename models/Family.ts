import mongoose from 'mongoose'

export interface Family {
    passcode: string,
    members?: mongoose.Schema.Types.ObjectId[]
}

const FamilySchema = new mongoose.Schema<Family>({
  passcode: {
    type: String,
    required: [true, 'Please provide a passcode for the family.'],
    minlength: [20, 'Passcode must be greater than 20 characters.'],
  },
  members: {
    type: [{
      type: mongoose.Schema.Types.ObjectId,
      ref: "User"
    }]
  }
})

export default mongoose.models.Family|| mongoose.model('Family', FamilySchema)
