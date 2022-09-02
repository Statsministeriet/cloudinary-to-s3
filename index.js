const Cloudinary = require('cloudinary').v2
const AWS = require('aws-sdk')
const util = require('util')
const axios = require('axios').default;
const configs = require("./configs.json")

const S3Service = new AWS.S3({
    credentials: {
        accessKeyId: configs.aws_access_key_id,
        secretAccessKey: configs.aws_secret_access_key
    }
})

const getResource = util.promisify(Cloudinary.api.resources)

const getAllResource = async () => {
    let next_cursor;
    let resources = [];

    while (true) {
        const result = await getResource({ next_cursor })
        if (result && result.next_cursor) {
            next_cursor = result.next_cursor
            console.log("Next key: " + result.next_cursor)
            resources = [...resources, ...result.resources]
        } else {
            console.log("Found " + resources.length + " resources")
            return resources;
        }
    }
}

const uploadFile = async (resource) => {

    const response = await axios({
        url: resource.url,
        method: 'GET',
        responseType: 'arraybuffer'
    })
    const fileName = resource.public_id +'.'+resource.format
    const out = await S3Service.upload({
        ACL: "public-read",
        Bucket: configs.bucket,
        Key: fileName,
        Body: response.data,
        ContentType: resource.resource_type
    }).promise()
    console.log(out)
}

const main = async () => {
    const resources = await getAllResource()
    for (let index = 0; index < resources.length; index++) {
        const element = resources[index];
        await uploadFile(element) 
    }
}

main()