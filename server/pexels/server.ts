import express, { Request, Response } from 'express';
import axios from 'axios';
import cors from 'cors';

const app = express();
const PORT = 3000;

app.use(cors({ origin: 'http://localhost:5173' })); // Adjust the port if necessary


// pexels API key
const PEXELS_API_KEY = 'UR3ulVQekKy8xHa3dRt9s51wAyatfMS0Qr21ogHT7A858beywtQBEKDy'

// endpoint to get space iamge
app.get('/space-image', async (req: Request, res: Response) => {
    try {
        const response = await axios.get('https://api.pexels.com/v1/search', {
            headers: {
                Authorization: PEXELS_API_KEY
            },
            params: {
                query: 'space background',
                per_page: 25
            }
        })

        if (response.data.photos.length > 0) {
            const randomIndex = Math.floor(Math.random() * response.data.photos.length);
            const randomPhoto = response.data.photos[randomIndex];


            const backgroundImage = randomPhoto.src.original;
            res.json({ backgroundImage });
        } else {
            res.status(404).json({ error: 'No space background image found' });
        } 
    // console.log(response.data);
    }
        catch (error) {
            console.error('Error fetching space background:', error)
            res.status(500).json({ error: 'Error fetching space background' });
        }
        console.log('hello')
      
});



app.use(express.static('public'));

app.listen(PORT, () => {
    console.log(`server is running on http://localhost:${PORT}`)
});


