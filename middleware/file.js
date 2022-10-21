import multer from 'multer'

const storage = multer.diskStorage({
    destination(req, file, cb) {
        cb(null, 'public/Image/Cars/')
    },
    filename(req, file, cb) {
        cb(null, file.originalname)
    }
})

const types = ['image/png', 'image/jpeg', 'image/jpg']

const fileFilter = (req, file, cb) => {
    if(types.includes(file.mimetype)){
        cb(null, true)
    } else {
        cb(null, false)
    }
}

export default multer({storage: storage, fileFilter})