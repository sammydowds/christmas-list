import mongoose from 'mongoose'

export interface Family {
    name: string,
    members: number[],
}

const FamilySchema = new mongoose.Schema<Family>({
  name: {
    type: String,
    required: [true, 'Please provide a name for this pet.'],
    maxlength: [20, 'Name cannot be more than 60 characters'],
  },
  members: {
    type: [Number]
  }
})

export default mongoose.models.Family|| mongoose.model('Family', FamilySchema)
