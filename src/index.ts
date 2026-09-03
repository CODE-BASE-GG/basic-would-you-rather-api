import { serve } from '@hono/node-server'
import { Hono } from 'hono'
import { cors } from "hono/cors";
import { handle } from 'hono/vercel'
import { connectToDatabase } from './lib/db.ts'
import ratherList from "./rathers_list.ts"

// import routes
import rathersRoutes from "./routes/rathers.ts"

const app = new Hono()


app.use('*', cors({
  origin: [
    'http://localhost:5050',
    'https://wyr-banacount.netlify.app'
  ],
  allowMethods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
  allowHeaders: ['Content-Type', 'Authorization'],
  maxAge: 600,
}))

/*
app.post('/add_test', async (c) => {
  const { db } = await connectToDatabase();
  let insertedIdList: number[] = [];

  // Loop through the list
  ratherList.map(async (item, ind) => {
    const test_res = await db.collection('tests').insertOne({
      "id_index": ind,
      "left_rather": item.left,
      "right_rather": item.right,
      "total_left_votes": 0,
      "total_right_votes": 0,
      "date": new Date()
    });

    insertedIdList.push(test_res.insertedId);
  });

  return c.json({ "didFail": false, "ids": insertedIdList });
})
*/
app.get('/', (c) => {
  return c.json({ wonderful_message: "It works fammy goodluck!" }, 200)
});

// Routes
app.route('/rathers', rathersRoutes);

// Run local server ONLY when not executing on Vercel
if (process.env.NODE_ENV !== 'production' && !process.env.VERCEL) {
  serve({
    fetch: app.fetch,
    port: 3000
  }, (info) => {
    console.log(`Server is running on http://localhost:${info.port}`)
  })
}

// Export for Vercel
export default app
