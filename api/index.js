let logs = [];

export default function handler(req, res) {
    const data = {
        time: new Date().toLocaleString(),
        ip: req.headers["x-forwarded-for"] || "unknown",
        host: req.headers.host,
        url: req.url,
        method: req.method,
        ua: req.headers["user-agent"]
    };

    logs.push(data);

    // Dashboard
    if (req.url === "/") {
        let html = `
        <h2>🔥 DINUWH URL LOGGER</h2>
        <table border="1" cellpadding="6">
        <tr>
            <th>Time</th>
            <th>IP</th>
            <th>Host</th>
            <th>URL</th>
            <th>Method</th>
        </tr>
        `;

        logs.reverse().forEach(log => {
            html += `
            <tr>
                <td>${log.time}</td>
                <td>${log.ip}</td>
                <td>${log.host}</td>
                <td>${log.url}</td>
                <td>${log.method}</td>
            </tr>
            `;
        });

        html += "</table>";
        return res.status(200).send(html);
    }

    // Default response
    res.status(200).json({
        status: "captured",
        data: data
    });
}
