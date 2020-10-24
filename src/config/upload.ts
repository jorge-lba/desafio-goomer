import multer from 'multer'
import path from 'path'

const PATH = process.env.NODE_ENV ? 'uploads_test' : 'uploads'

export default {
  storage: multer.diskStorage({
    destination: path.join(__dirname, '..', '..', PATH),
    filename: (request, file, cb) => {
      const fileName = `${Date.now()}-${file.originalname.replace(/ /g, '_')}`

      cb(null, fileName)
    }
  })
}
