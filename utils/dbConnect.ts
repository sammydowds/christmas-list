import mongoose from 'mongoose'

const connection: any = {} /* creating connection object*/

async function dbConnect(): Promise<void> {
  if (connection.isConnected) {
    return
  }

  const db = await mongoose.connect(process.env.MONGODB_URI as string, {})

  connection.isConnected = db.connections[0].readyState
}

export default dbConnect
