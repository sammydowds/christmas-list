/* This is a database connection function*/
import mongoose from 'mongoose'

const connection: any = {} /* creating connection object*/

async function dbConnect(): Promise<void> {
  /* check if we have connection to our databse*/
  if (connection.isConnected) {
    return
  }

  /* connecting to our database */
  const db = await mongoose.connect(process.env.MONGODB_URI as string, {})

  connection.isConnected = db.connections[0].readyState
}

export default dbConnect
