const aws = require('aws-sdk');
const { storage } = require('../servicos/storage');

const endpoint = new aws.Endpoint(storage.endpoint);

const s3 = new aws.S3({
    endpoint,
    credentials: {
        accessKeyId: storage.accessKeyId,
        secretAccessKey: storage.secretAccessKey,
    },
    sslEnabled: false,
    s3ForcePathStyle: true,
});

const upload = async (path, buffer, mimetype) => {
    const arquivo = await s3.upload({
        Bucket: storage.bucket,
        Key: path,
        Body: buffer,
        ContentType: mimetype,
    }).promise();

    return {
        url: arquivo.Location,
        path: arquivo.Key,
    };
};

const excluir = async (path) => {
    await s3.deleteObject({
        Bucket: storage.bucket,
        Key: path,
    }).promise();
};

module.exports = {
    upload,
    excluir,
};