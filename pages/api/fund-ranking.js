import axios from "axios";
import NextCors from 'nextjs-cors';

export default async function handler(req, res) {
    try {
        if (req.method === 'GET') {
            await NextCors(req, res, {
                // Options
                methods: ['GET', 'HEAD', 'PUT', 'PATCH', 'POST', 'DELETE'],
                origin: [process.env.endpoint, 'http://localhost:3000'],
                optionsSuccessStatus: 200, // some legacy browsers (IE11, various SmartTVs) choke on 204
            });
            const response = await axios.get(`https://storage.googleapis.com/finno-ex-re-v2-static-staging/recruitment-test/fund-ranking-${req.query.time}.json`);
            return res.status(200).send(response.data)
        } else {
            return res.status(404).send({ message: "not_found" })
        }
    } catch (e) {
        return res.status(500).send({ message: e.message })
    }
}
