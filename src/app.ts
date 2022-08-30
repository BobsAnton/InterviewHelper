import express from "express";
import mongoose from "mongoose";
import path from "path";
const app = express();
const port = 8080;

app.get( "/", async (req, res) => {
    mongoose.connect('mongodb://localhost:27017/', async function(err) {
        if (err) throw err;

        const customerSchema = new mongoose.Schema({
            name: String,
            address: String
        });
    
        const Customer = mongoose.model('Customer', customerSchema);

        const customer1 = new Customer({ name: 'John', address: 'Highway 71'});
        await customer1.save();
        console.log(await Customer.find());

        res.sendFile('index.html', {root: path.join(__dirname, "..") });
    });
} );

app.listen( port, () => {
    console.log( `server started at http://localhost:${ port }` );
} );