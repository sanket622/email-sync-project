import { Client } from '@elastic/elasticsearch';
import dotenv from 'dotenv';

dotenv.config();

const elasticClient = new Client({
    node: process.env.ELASTICSEARCH_HOST,
    auth: {
        username: process.env.ELASTICSEARCH_USER || '',
        password: process.env.ELASTICSEARCH_PASS || ''
    }
});

export default elasticClient;
