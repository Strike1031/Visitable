// Async function to upload images to S3 bucket.
// Firstly gets a S3 signed URL from server, which is then used to directly
// upload image to S3 from client.
// Args:
//  - albumName: The folder in the S3 bucket root
//  - fileId: The name to give file when uploaded to the folder.
//  - file: the File object to store
// Returns: none
export const handleFileUpload = async (albumName: string, fileId: string, file: File) => {
    if (file === null) return
    let signedUrl = null
    try {
      const res = await fetch('/api/get-s3-signed-url', {
        method: 'POST',
        body: JSON.stringify({ fileKey: `${albumName}/${fileId}`, fileType: file.type }),
        headers: {
          'Content-Type': 'application/json',
        },
      })
      const data = await res.json()
      signedUrl = data.signedUrl
      console.log({ signedUrl })
    } catch (error) {
      console.log(error)
    }

    if (signedUrl) {
      try {
        const s3Res = await fetch(signedUrl, {
          method: 'PUT',
          body: file,
          headers: {
            'Content-Type': `${file.type}`,
          },
        })
        console.log(s3Res)
      } catch (error) {
        console.log(error)
      }
    }
  }