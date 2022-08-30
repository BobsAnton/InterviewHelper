import express from "express";
import path from "path";
const app = express();
const port = 8080;

app.get( "/", ( req, res ) => {
    res.sendFile('index.html', {root: path.join(__dirname, "..") });
} );

app.listen( port, () => {
    console.log( `server started at http://localhost:${ port }` );
} );