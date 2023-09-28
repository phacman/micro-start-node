import http from 'http';
import fs from 'fs';
import mime from 'mime';
import * as util from './util';
import apiData from './api/data.json';

require('dotenv').config();

const {
    PORT_INTERNAL,
    PORT_EXTERNAL
} = process.env;

const server = http.createServer(async (req, res) => {
    if (req.url === '/api') {
        res.writeHead(200, util.getHeader('application/json'));
        res.end(JSON.stringify(apiData, null, 2));
        return;
    }

    const filePath = util.getFilePath(req.url),
        contentType: string | null = mime.getType(filePath);

    if (util.isStatic(req.url)) {
        res.setHeader('Content-disposition', 'attachment');
    }

    fs.readFile(filePath, (err, content) => {
        let outCode;

        if (err && err.code === 'ENOENT') {
            outCode = 404;
        } else if (err) {
            outCode = 500;
            content = Buffer.from('Internal Server Error', 'utf8');
        } else {
            outCode = 200;
        }

        res.writeHead(outCode, util.getHeader(contentType));
        res.end(content);
    });
});
server.listen(PORT_INTERNAL, () => {
    console.log(`Server ports. External: ${PORT_EXTERNAL}. Internal: ${PORT_INTERNAL}.`);
});