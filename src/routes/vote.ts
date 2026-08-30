import { Hono } from "hono";
import { connectToDatabase } from "../lib/db.ts";

const app = new Hono();

app.post('/left/:index', async (c) => {
  const index  = c.req.param('index');
  const target_index = parseInt(index, 10);

  // Check if offset is a number
  if (isNaN(target_index) && target_index !== Number(index))
    return c.json({ isSuccess: false, message: "This shit not a number fam" }, 400);

  // Check for negative numbers
  if (target_index < 0) 
    return c.json({ isSuccess: false, message: "Negative numbers are not allowed fam" }, 400);

  // Connect to database
  const { db } = await connectToDatabase();

  // Check if skipping too much
  const get_latest_index = await db.collection('tests').find({ id_ender: 1 }).toArray();
  const latest_index = get_latest_index[0].latest_index;

  if (target_index >= latest_index) 
    return c.json({ isSuccess: false, message: "You can't vote this shit fam" }, 400);

  const get_rather = await db.collection('tests').updateOne({ id_index: target_index }, { $inc: { total_left_votes: 1 } });

  //let ratherIndex = getRandomInt(0, 29);
  return c.json({ isSuccess: get_rather.acknowledged || false, rather: get_rather });
})

app.post('/right/:index', async (c) => {
  const index  = c.req.param('index');
  const target_index = parseInt(index, 10);

  // Check if offset is a number
  if (isNaN(target_index) && target_index !== Number(index))
    return c.json({ isSuccess: false, message: "This shit not a number fam" }, 400);

  // Check for negative numbers
  if (target_index < 0) 
    return c.json({ isSuccess: false, message: "Negative numbers are not allowed fam" }, 400);

  // Connect to database
  const { db } = await connectToDatabase();

  // Check if skipping too much
  const get_latest_index = await db.collection('tests').find({ id_ender: 1 }).toArray();
  const latest_index = get_latest_index[0].latest_index;

  if (target_index >= latest_index) 
    return c.json({ isSuccess: false, message: "You can't vote this shit fam" }, 400);

  const get_rather = await db.collection('tests').updateOne({ id_index: target_index }, { $inc: { total_right_votes: 1 } });

  //let ratherIndex = getRandomInt(0, 29);
  return c.json({ isSuccess: get_rather.acknowledged || false, rather: get_rather });
})

export default app;
