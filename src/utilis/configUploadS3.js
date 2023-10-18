const aws = require('aws-sdk')
const knex = require('../bancoDeDados/conexão')
const url = require('url')

const endpoint = new aws.Endpoint(process.env.ENDPOINT)

const s3 = new aws.S3({
    endpoint,
    region: process.env.MY_REGION,
    credentials: {
        accessKeyId: process.env.KEY_ID,
        secretAccessKey: process.env.APP_KEY,
    },
})

const uploadArquivo = async (req, id) => {
    try {
        const { file } = req
        const imagem = await s3
            .upload({
                Bucket: process.env.BUCKET_NAME,
                Key: `produtos/${id}/${file.originalname}`,
                Body: file.buffer,
                ContentType: file.mimetype,
            })
            .promise()
    } catch (error) {
        return res.status(500).json({ message: error.message })
    }
}

const atualizarArquivo = async (req, id) => {
    try {
        const { file } = req
        const imagem = await s3
            .putObject({
                Bucket: process.env.BUCKET_NAME,
                Key: `produtos/${id}/${file.originalname}`,
                ContentType: file.mimetype,
                Body: file.buffer,
            })
            .promise()
    } catch (error) {
        return res.status(500).json({ message: error.message })
    }
}

module.exports = {
    s3,
    uploadArquivo,
    atualizarArquivo,
}
