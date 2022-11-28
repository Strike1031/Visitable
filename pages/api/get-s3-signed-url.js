import AWS from 'aws-sdk'

AWS.config.update({
  accessKeyId: process.env.ACCESS_KEY_ID,
  secretAccessKey: process.env.SECRET_ACCESS_KEY,
})

const S3_BUCKET = process.env.BUCKET_NAME
const REGION = process.env.REGION
const URL_EXPIRATION_TIME = 60 // in seconds

const myBucket = new AWS.S3({
  params: { Bucket: S3_BUCKET },
  region: REGION,
});

export default async function generatePreSignedPutUrl(req, res) {
  console.log('Get signed url', S3_BUCKET, REGION)
  if (req.method === 'POST') {
    const fileKey = req.body.fileKey
    const fileType = req.body.fileType
    myBucket.getSignedUrl(
      'putObject',
      {
        Key: fileKey,
        ContentType: fileType,
        Expires: URL_EXPIRATION_TIME,
        ACL: 'public-read'
      },
      (err, url) => {
        if (err) {
          console.log(err)
          return res.status(500).json({ msg: 'An error occured while trying to get signed url.' })
        } else {
          return res.status(200).json({ signedUrl: url })
        }
      },
    )
  } else {
    return res.status(405).json({ msg: 'This API endpoitn only accepts POST requests.' })
  }
}