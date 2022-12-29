const express = require('express')
const Joi = require("joi");
const { validateSignup } = require("./validator");
const { validateAddProduct } = require("./validator");

const app = express()

app.use(express.json())

const products = [
    { productName: 'Laptop', price: 27, email: 'laptop@product.com' },
    { productName: 'Charger', price: 32 },
    { productName: 'mobile phone', price: 45 },
]

app.get('/', (req, resp) => {
    resp.send('This is the Products API')
})


app.post("/signup", (req, res) => {
    const { error, value } = validateSignup(req.body);

    if (error) {
        console.log(error);
        return res.send(error.details);
    }

    res.send("Successfully signed up!");
});

//get list of products
app.get('/api/product', (req, resp) => {
    resp.send(products)
})

//get list of products by price
app.get('/api/product/price/:price', (req, resp) => {
    const product = products.find(v => v.price === parseInt(req.params.price))
    if (!products) resp.status(404).send('Data not found.')
    resp.send(product)
})


//add new product
app.post('/api/product/addProduct', (req, res) => {

    const { error, value } = validateAddProduct(req.body);

    if (error) {
        console.log(error);
        return res.send(error.details);
    }

    products.push(value)
    res.send("Product added Successfully!");
})

//update changes in product list
app.put('/api/product/add/:price', (req, resp) => {
    const product = products.find(v => v.price === parseInt(req.params.price))
    if (!products) resp.status(404).send('Data not found.')

    product.productName = req.body.productName
    resp.send(product)
})

//delete product by price
app.delete('/api/product/:price', (req, resp) => {
    const product = products.find(v => v.price === parseInt(req.params.price))
    if (!products) resp.status(404).send('Data not found.')
    const index = products.indexOf(product)
    products.splice(index, 1)
    resp.send(product)
})

//delete product by name
app.delete('/api/product/name/:productName', (req, resp) => {
    const product = products.find(p => p.productName === req.params.productName)
    if (!products) resp.status(404).send('Data not found.')
    const index = products.indexOf(product)
    products.splice(index, 1)
    resp.send(product)
})


app.listen(8080)