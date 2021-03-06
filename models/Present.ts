import mongoose from 'mongoose'

export interface Present {
    description: string,
    to: mongoose.Schema.Types.ObjectId,
    from: mongoose.Schema.Types.ObjectId,
    isBought: boolean
    familyId?: mongoose.Schema.Types.ObjectId
}

const PresentSchema = new mongoose.Schema<Present>({
  description: {
    type: String,
    required: [true, 'Please provide a name for this pet.'],
    maxlength: [20, 'Name cannot be more than 60 characters'],
  },
  to: {
    type: String,
  },
  from: {
    type: String,
  },
  isBought: {
    type: Boolean,
  },
  familyId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Family"
  }
})

export default mongoose.models.Present || mongoose.model('Present', PresentSchema)
