const axios = require("axios");
const express = require("express");
const cors = require("cors");
require("dotenv").config();

const API_URL = process.env.API_URL;
const API_KEY = process.env.API_KEY;
const PORT = process.env.PORT;
const fs = require("fs");

const app = express();

app.use(express.json());
app.use(cors());

async function classifyImage(imageURL) {
    try {
        const response = await axios.post(API_URL, imageURL, {
            headers: {
                "Authorization": `Bearer ${API_KEY}`,
                "Content-Type": "image"
            }
        });

        // return response.data;

        let ans = "Couldn't classify.. try again";
        let maxScore = -1;
        response.data.map((object) => {
            if(object.score > maxScore) {
                maxScore = object.score;
                ans = object.label;
            }
        });

        console.log(ans);
        return ans;
    } catch (error) {
        console.log(error.message);
        return error.message;
    }
}


// classifyImage("https://cdn.pixabay.com/photo/2023/08/18/15/02/dog-8198719_640.jpg");

app.post("/api/v1/label", async (req, res) => {
    const {imageUrl} = req.body;
    console.log(imageUrl);
    const ans = await classifyImage(imageUrl);
    res.status(200).json({label: ans, success: true});
});


app.get("/", (req, res) => {
    res.send("UP");
});
app.listen(PORT, () => {
    console.log("Running at port ", PORT); 
});
