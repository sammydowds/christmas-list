import mongoose from 'mongoose'

export interface Family {
    name: string,
    members: number[],
}

/* PetSchema will correspond to a collection in your MongoDB database. */
const FamilySchema = new mongoose.Schema<Family>({
  name: {
    /* Name of the family */

    type: String,
    required: [true, 'Please provide a name for this pet.'],
    maxlength: [20, 'Name cannot be more than 60 characters'],
  },
  members: {
    type: [Number]
  }
})

export default mongoose.models.Family|| mongoose.model('Family', FamilySchema)
