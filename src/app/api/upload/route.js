import { v2 as cloudinary } from 'cloudinary';

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET
})

export async function POST(req) {
  const formData = await req.formData();

  if (formData.has('file')) {
    const file = formData.get('file');
    const fileBuffer = await file.arrayBuffer(); // Convert File object to a buffer
    // console.log(fileBuffer)
    const buffer = new Uint8Array(fileBuffer);
    // console.log(buffer)

    let uploadResponse;

    await new Promise((resolve, reject)=>{
      cloudinary.uploader.upload_stream({}, (error, result) => {
        if(error){
          reject(error);
          return;
        }
        uploadResponse = result;
        resolve(result);
      }).end(buffer);
    })

    // console.log(uploadResponse);

    return Response.json(uploadResponse.secure_url);
  }
}