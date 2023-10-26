const aws = require('aws-sdk');

const endpoint = new aws.Endpoint(process.env.ENDPOINT_S3)

const s3 = new aws.S3({
    endpoint,
    credentials: {
    accessKeyId: process.env.KEY_ID,
    secretAccessKey: process.env.KEY_APP
    }
});

const imagemProduto = async (req, res) => {
   const { file } = req
   try {
        const arquivo = await s3.upload({
            Bucket: process.env.BLACKBLAZE_BUCKET,
            Key: file.originalname,
            Body: file.buffer,
            ContentType: file.mimetype
        }).promise()
        return res.json(arquivo)
   } catch (error) {
    console.log(error)
        return res.status(500).json({mensagem: 'Erro interno do servidor'})
   }

};




module.exports = imagemProduto
