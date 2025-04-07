import { GoogleGenAI } from "@google/genai";
import dotenv from "dotenv";
import express from "express";
import bodyParser from "body-parser";
import cors from 'cors';

const app = express();
app.use(express.json());
app.use(bodyParser.json());
app.use(cors()); // Allow all origins to access your API


// Routes
app.get("/", (req, res) => {
    res.send("Hello, World!");
});

// Load environment variables
dotenv.config();

const ai = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY });

// const prompt = "what is the value of pi in maths?";
const generate = async (prompt) => {
    try {
        const response = await ai.models.generateContent({
            model: "gemini-2.0-flash",
            contents: prompt,
          });
          return response.text;
          console.log(response.text);
    } catch (error) {
        console.error("Error generating content:", error);
    }
}

// generate();
app.post("/api/content", async(req, res) => {
    try{
        const question = req.body.question;
        // Check if the question exists
        if (!question) {
            return res.status(400).json({ error: "Question is required" });
        }
        const result = await generate(question);
        res.send({
            success: true,
            result: result
        })
        
    }catch(err){
        console.error("Error:", err);
        res.status(500).json({ error: "An error occurred" });
    }
});

app.listen(3000, () => {
    console.log("Server is running on port 3000...");
})
