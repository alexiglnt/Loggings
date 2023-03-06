import { MongoClient, ObjectId } from 'mongodb';
import { NextApiRequest, NextApiResponse } from 'next';
import Log from '@/LogInterface';

const mongouri = "mongodb://localhost:27017";
const database = "loggings";

const client = new MongoClient(mongouri);

export default async function handler(req: NextApiRequest, res: NextApiResponse) {

    if (req.method === 'POST') {

        console.log("ICIIIII", req.body);
        const data = req.body;


        await client.connect();

        const db = client.db(database);
        const collection = db.collection<Log>("loggings");

        // On rempli les données manquante de la requête
        data.dateTime = new Date().toLocaleString('fr-FR');
        data.index = db.collection.length;
        data.type = req.body.type;
        data.error = req.body.error;

        const result = await collection.insertOne(data);


        res.status(201).json(data);

    }

}