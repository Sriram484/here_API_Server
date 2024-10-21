const express = require('express');
const axios = require('axios');
const cors = require('cors');

const app = express();
const PORT = 5000;

app.use(cors());
app.use(express.json()); // Middleware to parse JSON bodies

app.post('/api/traffic-data', async (req, res) => {
    const apiKey = 'COl_ApwN9DUPu1LjJnVzEu3Zv44KywbXuUQmvH43uco'; // Replace with your actual API key
    const { bbox } = req.body; // Get bbox from request body

    // Corrected this line with proper backticks for string interpolation
    const trafficApiUrl = `https://data.traffic.hereapi.com/v7/flow?locationReferencing=shape&in=bbox:${bbox}&apiKey=${apiKey}`;

    try {
        const response = await axios.get(trafficApiUrl);
        const trafficData = response.data.results;

        // Process the traffic data here (optional)
        res.json(trafficData);  // Send traffic data back to Python script
    } catch (error) {
        console.error('Error fetching traffic data:', error);
        res.status(500).send(error.message);
    }
});

app.listen(PORT, () => {
    console.log(`Server running at http://localhost:${PORT}`);
});
