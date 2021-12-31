import mongoose from 'mongoose'

export interface Present {
    description: string,
    to: string,
    from: string,
    isBought: boolean
}

/* PetSchema will correspond to a collection in your MongoDB database. */
const PresentSchema = new mongoose.Schema<Present>({
  description: {
    /* Description of the present */

    type: String,
    required: [true, 'Please provide a name for this pet.'],
    maxlength: [20, 'Name cannot be more than 60 characters'],
  },
  to: {
    /* Recipient of this present */

    type: String,
    maxlength: [20, 'Name cannot be more than 60 characters'],
  },
  from: {
    /* Giver of this present */

    type: String,
    maxlength: [20, 'Name cannot be more than 60 characters'],
  },
  isBought: {
    /* Giver has purchased this present */

    type: Boolean,
  },
})

export default mongoose.models.Present || mongoose.model('Present', PresentSchema)
