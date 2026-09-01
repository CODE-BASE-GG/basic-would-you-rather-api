import { Hono } from "hono";
import { connectToDatabase } from "../lib/db.ts";
import { cors } from "hono/cors";

const app = new Hono();

app.get('/get/:offset', async (c) => {
  const offset  = c.req.param('offset');
  const skip = parseInt(offset, 10);

  // Check if offset is a number
  if (isNaN(skip) && skip !== Number(offset))
    return c.json({ isSuccess: false, message: "This shit not a number fam" }, 400);

  // Check for negative numbers
  if (skip < 0) 
    return c.json({ isSuccess: false, message: "Negative numbers are not allowed fam" }, 400);

  // Connect to database
  const { db } = await connectToDatabase();
  const per_count = 5, total_skip = skip * per_count;

  // Check if skipping too much
  const get_latest_index = await db.collection('tests').find({ id_ender: 1 }).toArray();
  const latest_index = get_latest_index[0].latest_index;

  if (total_skip >= latest_index) 
    return c.json({ isSuccess: false, message: "You're skipping too much fam" }, 400);

  const get_rathers = await db.collection('tests').find().skip(total_skip).limit(per_count).toArray();

  //let ratherIndex = getRandomInt(0, 29);
  return c.json({ isSuccess: true, rathers: get_rathers });
})


// Routes
import voteRoute from "./vote.ts";
app.route('/vote', voteRoute);

app.use('/*', cors({
  origin: [
    'http://localhost:5050',
  ],
}))

export default app;
