import dotenv from 'dotenv';
dotenv.config(); 

import { Client } from '@elastic/elasticsearch';

const client = new Client({ node: process.env.ELASTICSEARCH_HOST });

export async function searchEmails(req, res) {
    const { query } = req.query;
    const result = await client.search({
        index: 'emails',
        body: {
            query: { match: { body: query } }
        }
    });

    res.json(result.hits.hits);
}
