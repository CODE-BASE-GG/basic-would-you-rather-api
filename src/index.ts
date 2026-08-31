import { serve } from '@hono/node-server'
import { Hono } from 'hono'
import { connectToDatabase } from './lib/db.ts'
import ratherList from "./rathers_list.ts"

// import routes
import rathersRoutes from "./routes/rathers.ts"

const app = new Hono()

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

// Routes
app.route('/rathers', rathersRoutes);

serve({
  fetch: app.fetch,
  port: 3000
}, (info) => {
  console.log(`Server is running on http://localhost:${info.port}`)
})
