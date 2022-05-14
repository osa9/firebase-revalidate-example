import type {NextApiHandler} from 'next'
import {firebase_revalidate} from "@/lib/server/firebase";

const handler: NextApiHandler = async (req, res) => {
   try {
     await firebase_revalidate('/')
     res.status(200).end()
   } catch(err) {
     console.error(err)
     res.status(500).end()
   }
}

export default handler
