import express from 'express'
import 'dotenv/config'

const app = express();

const port = process.env.port || 3001;
app.use(express.json())



app.get('/', (req, res) => {
    res.send('Hello World!')
});

const arr = [];
let nextId = 1;

app.post('/teas', (req, res) => {
    const { name, price } = req.body;
    const newTea = { id: nextId++, name, price };
    arr.push(newTea);
    res.status(201).send(newTea);
})

app.get("/teas", (req, res) => {
    res.status(200).send(arr);
})

app.get("/teas/:id", (req, res) => {
    const d = arr.find(t => t.id == parseInt(req.params.id));
    if (!d) {
        res.status(404).send('result not found');
    }
    res.status(200).send(d);
})

//Update tea
app.put("/teas/:id", (req, res) => {
    const d = arr.find(t => t.id == parseInt(req.params.id));
    if (!d) {
        return res.status(404).send('not found');
    }
    const { name, price } = req.body;
    d.name = name;
    d.price = price;
    res.status(200).send(d);
});

app.delete("/teas/:id", (req, res) => {
    const i = arr.findIndex(t => t.id === parseInt(req.params.id))
    if (i === -1) {
        return res.status(404).send('not found');
    }
    arr.splice(i, 1);
    res.status(200).send(arr);
});

app.listen(port, () => {
    console.log(`Server listening on port ${port}`)
})