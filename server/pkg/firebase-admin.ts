import admin from 'firebase-admin'
import * as fs from 'fs'
import { getFirestore } from 'firebase-admin/firestore'

const config = useRuntimeConfig()
// read json file from FileSystem and parse it as json object
if (config.firebase_admin.certPath) {
  const credential = JSON.parse(
    fs.readFileSync(config.firebase_admin.certPath, 'utf8')
  )
  admin.initializeApp({
    credential: admin.credential.cert(credential as admin.ServiceAccount)
  })
} else {
  // if certPath is not set, run initializeApp without any arguments.
  // inside Cloud Run, the application will use the default service account
  admin.initializeApp()
}

// databaseID is hardcoded here to avoid using default database
const firestore = getFirestore('lumos-2024')

export default firestore
