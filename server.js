const express = require("express");
const app = express();
const port = 3000;

// store logs
let logs = [];

app.use((req, res, next) => {
    const data = {
        ip: req.headers['x-forwarded-for'] || req.socket.remoteAddress,
        host: req.headers.host,
        url: req.originalUrl,
        method: req.method,
        userAgent: req.headers['user-agent']
    };

    logs.push(data);
    console.log(data);

    next();
});

// dashboard
app.get("/", (req, res) => {
    let html = `
    <h2>🌐 URL Logger Dashboard</h2>
    <table border="1" cellpadding="5">
        <tr>
            <th>IP</th>
            <th>Host</th>
            <th>URL</th>
            <th>Method</th>
        </tr>
    `;

    logs.forEach(log => {
        html += `
        <tr>
            <td>${log.ip}</td>
            <td>${log.host}</td>
            <td>${log.url}</td>
            <td>${log.method}</td>
        </tr>
        `;
    });

    html += "</table>";

    res.send(html);
});

// catch all requests
app.get("*", (req, res) => {
    res.send("OK");
});

app.listen(port, () => {
    console.log(`Server running on http://localhost:${port}`);
});
