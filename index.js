console.clear()
import {createServer} from 'http';
import "/"

const httpServer = createServer((req, res) => {
    console.log("PETICION");

    res.end("recibido")
})

httpServer.listen(3000);