const imageValidation = (images) => {

    let imagesArray = []

    if(Array.isArray(images)) {
        imagesArray = images
    } else {
        imagesArray.push(images)
    }
    const filetypes = /jpg|jpeg|png/

    for(let image of imagesArray) {

        const mimetype = filetypes.test(image.mimetype)
        if(!mimetype) {
            return { error: "Neispravan format slike!" }
        }
    }

    return { error: false }
}

module.exports = imageValidation