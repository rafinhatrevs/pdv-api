const storage = {
    bucket: process.env.S3_BUCKET,
    endpoint: process.env.S3_ENDPOINT,
    accessKeyId: process.env.S3_ACCESS_KEY_ID,
    secretAccessKey: process.env.S3_SECRET_ACCESS_KEY,
};

module.exports = {
    storage
};