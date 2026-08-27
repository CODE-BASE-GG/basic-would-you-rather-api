import { serve } from '@hono/node-server'
import { Hono } from 'hono'

// import routes
import rathersRoutes from "./routes/rathers.ts"

const app = new Hono()

app.get('/', (c) => {
  return c.json({"message": "Hello world!"});
})

app.route('/rathers', rathersRoutes);

serve({
  fetch: app.fetch,
  port: 3000
}, (info) => {
  console.log(`Server is running on http://localhost:${info.port}`)
})
