import { v2 as cloudinary } from 'cloudinary';
cloudinary.config({
  cloud_name: process.env.CLOUDINARY_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET
})

export async function POST(req) {
  try {
    const formData = await req.formData();

    if (formData.has('file')) {
      const file = formData.get('file');
      const fileBuffer = await file.arrayBuffer();
      const buffer = new Uint8Array(fileBuffer);

      let uploadResponse;
      console.log("1-----------------")

      uploadResponse = await new Promise((resolve, reject) => {
        cloudinary.uploader.upload_stream({}, (error, result) => {
          if (error) {
            reject(error);
            return;
          }
          resolve(result);
        }).end(buffer);
      })
      console.log("2-----------------")
      console.log(uploadResponse.secure_url)

      return Response.json(uploadResponse.secure_url);
    }
  } catch (error) {
    console.log("3-----------------")
    console.error('Error during upload:', error);
    return new Response('Error uploading image', { status: 500 });
  }

}