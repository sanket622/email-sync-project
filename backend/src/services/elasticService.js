import elasticClient from '../config/elasticConfig.js';

export async function connectToElasticsearch() {
    try {
        await elasticClient.ping();
        console.log('✅ Connected to Elasticsearch');
    } catch (error) {
        console.error('❌ Elasticsearch connection failed:', error);
    }
}

export async function indexEmail(email) {
    try {
        await elasticClient.index({
            index: 'emails',
            id: email._id.toString(), 
            body: {
                from: email.from,
                to: email.to,
                subject: email.subject,
               body: email.body ? email.body.substring(0, 50) : 'No Content',
                folder: email.folder,
                category: email.category,
                receivedAt: email.receivedAt
            }
        });
        
    } catch (error) {
        console.error('❌ Elasticsearch Indexing Error:', error);
    }
}
