module.exports = {
    reactStrictMode: true,
    env: {
        BUCKET_NAME: process.env.NEXT_PUBLIC_S3_BUCKET_NAME,
        REGION: process.env.NEXT_PUBLIC_S3_REGION
    }
}