import multer from 'multer'
import path from 'path'

const PATH = process.env.NODE_ENV ? 'uploads_test' : 'uploads'

const config = (select:string) => {
  return {
    storage: multer.diskStorage({
      destination: path.join(__dirname, '..', '..', PATH, select),
      filename: (request, file, cb) => {
        const fileName = `${Date.now()}-${file.originalname.replace(/ /g, '_')}`

        cb(null, fileName)
      }
    })
  }
}

export default config
