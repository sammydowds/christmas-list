import mongoose from 'mongoose'

export interface Present {
    description: string,
    to: mongoose.Schema.Types.ObjectId,
    from: mongoose.Schema.Types.ObjectId,
    isBought: boolean
}

const PresentSchema = new mongoose.Schema<Present>({
  description: {
    type: String,
    required: [true, 'Please provide a name for this pet.'],
    maxlength: [20, 'Name cannot be more than 60 characters'],
  },
  to: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
  },
  from: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
  },
  isBought: {
    type: Boolean,
  },
})

export default mongoose.models.Present || mongoose.model('Present', PresentSchema)
