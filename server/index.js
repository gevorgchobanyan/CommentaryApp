const express = require('express')
const bodyParser = require('body-parser')
const cors = require('cors')
const { getClient } = require('./db')
const app = express()
const ObjectId = require('mongodb').ObjectId



app.use(bodyParser.json())
app.use(cors())



app.post('/comments', async function (req, res) {
  const client = await getClient()
  const collection = client.collection('comments')
  const result = await collection.insertOne({
    ...req.body,
    votes: 0
  })
  res.send(result.ops[0])
})


app.get('/comments', async function (req, res) {
  const client = await getClient()
  const collection = client.collection('comments')
  const comments = await collection.find({}).toArray()
  res.send(comments)
})

app.post('/comments/:commentId/votes', async function (req, res) {
  const { commentId } = req.params
  const client = await getClient()
  const collection = client.collection('comments')
  const comment = await collection.findOne({
    _id: new ObjectId(commentId)
  })
  comment.votes = (comment.votes || 0) + 1

  await collection.updateOne(
    {
    _id: new ObjectId(commentId)
    },
    {$set: comment}
  )
  res.send(comment)
})

app.delete('/comments/:commentId/votes', async function (req, res) {
  const { commentId } = req.params
  const client = await getClient()
  const collection = client.collection('comments')
  const comment = await collection.findOne({
    _id: new ObjectId(commentId)
  })
  comment.votes = (comment.votes || 0) - 1

  await collection.updateOne(
    {
    _id: new ObjectId(commentId)
    },
    {$set: comment}
  )
  res.send(comment)
})




app.get("/", (req, res) => {
   res.send("Hello World")
})



app.listen(5000, () => {
  console.log('server running at 5000')
})