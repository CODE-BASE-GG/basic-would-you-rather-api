import { Hono } from "hono";
import ratherList from "../rathers_list.ts"

const app = new Hono();

app.get('/', (c) => {
  return c.json(ratherList[getRandomInt(0, 29)]);
})

function getRandomInt(min: number, max: number): number {
  const minCeiled = Math.ceil(min);
  const maxFloored = Math.floor(max);
  return Math.floor(Math.random() * (maxFloored - minCeiled + 1)) + minCeiled;
}

export default app;
