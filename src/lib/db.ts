import { MongoClient } from 'mongodb'

const uri = process.env.MONGODB_URI
let cachedClient:any = null
let cachedDb:any = null

export async function connectToDatabase() {
  // Reuse existing connection if function is warm
  if (cachedClient && cachedDb) {
    return { client: cachedClient, db: cachedDb }
  }

  if (!uri) {
    throw new Error('Please define the MONGODB_URI environment variable')
  }

  const client = new MongoClient(uri)
  await client.connect()
  const db = client.db('would_rathers') // Replace with your DB name

  cachedClient = client
  cachedDb = db

  return { client, db }
}
