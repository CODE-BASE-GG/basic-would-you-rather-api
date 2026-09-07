import { Hono } from "hono";
import { connectToDatabase } from "../lib/db.ts";

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

  const get_rathers = await db.collection('tests')
                      .find({ id_index: {"$type": "number"} })
                      .skip(total_skip).limit(per_count).toArray();

  //let ratherIndex = getRandomInt(0, 29);
  return c.json({ isSuccess: true, rathers: get_rathers });
})

app.get('/request_add_rather', async (c) => {
  const query = c.req.query();
  const ratherAddDelayInHours = 1;

  if (!query.left_rather || !query.right_rather) 
    return c.json({ message: "Lacking rather statement!", isSuccess: false }, 400);

  const { db } = await connectToDatabase();
  const get_last_add = await db.collection('tests').find({ id_ender: 1 }).toArray();
  const lastDateObj = get_last_add[0];

  const last_date = new Date(lastDateObj.lastAdded);
  const current_date = new Date();
  const diffInMs = current_date.getTime() - last_date.getTime();

  const msInHour = 1000 * 60 * 60;
  const diffInHours = diffInMs / msInHour;

  // Add the rather to the database if valid
  if (diffInHours >= 1) {
    const rather = await db.collection('tests').insertOne({
      "id_index": lastDateObj.latest_index,
      "left_rather": query.left_rather,
      "right_rather": query.right_rather,
      "total_left_votes": 0,
      "total_right_votes": 0,
      "date": new Date()
    });

    const updateLatestIndex = await db.collection('tests').updateOne({ id_ender: 1 }, { 
      $inc: { latest_index: 1 }, 
      $set: { lastAdded: new Date() } 
    });

    return c.json({ 
      message: "The rather has been added.", 
      isSuccess: true, 
      rather_id: rather.insertedId, 
    });
  }

  return c.json({ timeRemaining: ratherAddDelayInHours - diffInHours, isSuccess: true }, 200);
})

// Routes
import voteRoute from "./vote.ts";
app.route('/vote', voteRoute);

export default app;
