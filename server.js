const express = require ('express');
const app = express ();


app.use(express.json());

const MongoClient = require('mongodb').MongoClient;
let db;
MongoClient.connect('mongodb+srv://danvella02:Rapmap02@projects.qeyey.mongodb.net/Coursework2?retryWrites=true&w=majority',
(err, client) =>{

    db = client.db('Coursework2')
});

app.param('collectionName', (req, res, next, collectionName) => {
    req.collection = db.collection(collectionName)
    res.header("Access-Control-Allow-Origin"
,
"*");
// allow different header fields
res.header("Access-Control-Allow-Headers"
,
"*");
    return next()
})

app.get('/', function (req, res) {
    res.send('Select a collection, e.g., /collection/messages')
    res.header("Access-Control-Allow-Origin"
,
"*");
// allow different header fields
res.header("Access-Control-Allow-Headers"
,
"*");

})

app.get('/collection/:collectionName', (req, res) => {
    req.collection.find({}).toArray((e, results) => {
        if (e) return next(e)
        res.send(results)
        res.header("Access-Control-Allow-Origin"
,
"*");
// allow different header fields
res.header("Access-Control-Allow-Headers"
,
"*");

    })
})

// retreive an object by mongodb ID
const ObjectID = require('mongodb').ObjectID;
app.get('/collection/:collectionName/:id',(req, res, next) => {
    req.collection.findOne(
        { _id: new ObjectID(req.params.id)},
        (e, result) => {
            if (e) return next (e)
            res.send(result)
            res.header("Access-Control-Allow-Origin"
,
"*");
// allow different header fields
res.header("Access-Control-Allow-Headers"
,
"*");

        })
})

//add an object
app.post ('/collection/:collectionName', (req, res, next) => {
    req.collection.insert(req.body, (e, results) => {
        if (e) return next (e)
        res.send (results.ops)
       res.header("Access-Control-Allow-Origin"
,
"*");
// allow different header fields
res.header("Access-Control-Allow-Headers"
,
"*");

    })
})

//update an object by ID
app.put('/collection/:collectionName/:id', (req, res, next) => {
    req.collection.update(
        {_id: new ObjectID(req.params.id)},
        {$set: req.body},
        {safe: true, multi: false},
        (e, result) => {
            if (e) return next (e)
            res.send((result.result.n ===1)?
           res.header("Access-Control-Allow-Origin"
,
"*");
// allow different header fields
res.header("Access-Control-Allow-Headers"
,
"*");

            {msg: 'success'}:{msg: 'error'})
        })
})
// delete an object by ID
app.delete('/collection/:collectionName/:id', (req, res, next) => {
    req.collection.deleteOne(
        { _id: ObjectID(req.params.id) },
        (e, result) => {
            if (e) return next(e)
            res.send((result.result.n === 1) ?
                     res.header("Access-Control-Allow-Origin"
,
"*");
// allow different header fields
res.header("Access-Control-Allow-Headers"
,
"*");

                {msg: 'success'} : {msg: 'error'})
    })
})



const port = process.env.PORT || 3000
app.listen(port)
