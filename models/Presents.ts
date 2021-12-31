import mongoose from 'mongoose'

export interface Present {
    description: string,
    to: string,
    from: string,
    isBought: boolean
}

const PresentSchema = new mongoose.Schema<Present>({
  description: {
    type: String,
    required: [true, 'Please provide a name for this pet.'],
    maxlength: [20, 'Name cannot be more than 60 characters'],
  },
  to: {
    type: String,
    maxlength: [20, 'Name cannot be more than 60 characters'],
  },
  from: {
    type: String,
    maxlength: [20, 'Name cannot be more than 60 characters'],
  },
  isBought: {
    type: Boolean,
  },
})

export default mongoose.models.Present || mongoose.model('Present', PresentSchema)
