import express from "express"
const app = express()
app.use(express.json())

const PORT = 3000

app.get("/ping", (_req, res)=>{
    res.send("hello")
})

app.listen(PORT, () => {
    console.log(`app is running at ${PORT}`)
})