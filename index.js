const Cloudinary = require('cloudinary').v2
const util = require('util')



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

const main = async () => {
    const resources = await getAllResource()
    
}

main()