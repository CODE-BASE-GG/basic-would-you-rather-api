## Initial commit
```
npm install
npm run dev
```

```
hosted in:
http://localhost:3000
```

request the would you rathers in the `/rathers/get/{offset_number}` route.<br/>

request left side vote using the id_index `/rathers/vote/left/{rather_index}` route.<br/>

request right side vote using the id_index `/rathers/vote/right/{rather_index}` route.<br/>

request to write a new would you rather to the server `/rathers/request_add_rather?left_rather={RATHER_LEFT}&right_rather={RATHER_RIGHT}`.<br/>
