import multer, {diskStorage} from 'multer';

const storageConfig = diskStorage({
    destination: (req, file, cb) => {
        cb(null, "../public/uploads/")
    },
    filename: (req, file, cb) => {
        const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9)
        cb(null, file.fieldname + '-' + uniqueSuffix)
    }
})

const fileLimit = {fileSize: 1024 * 1024 * 10}

const fileFilter = (req, file, cb) => {
    if (file.mimetype === 'image/jpeg' || file.mimetype === 'image/png') {
        cb(null, true)
    } else {
        cb(false, false)
    }
}

const upload = multer({
    storage: storageConfig, 
    fileSize: fileLimit, 
    fileFilter: fileFilter
})

export default upload