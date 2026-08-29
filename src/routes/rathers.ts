import { Hono } from "hono";
import ratherList from "../rathers_list.ts"
import { getRandomInt } from "../utils.ts"
const app = new Hono();

app.get('/', (c) => {
  let ratherIndex = getRandomInt(0, 29);
  return c.json(ratherList[ratherIndex]);
})


export default app;
