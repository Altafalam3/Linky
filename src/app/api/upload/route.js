import { v2 as cloudinary } from 'cloudinary';

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
  secure: true
})

export async function POST(req) {
  const formData = await req.formData();

  if (formData.has('file')) {
    const file = formData.get('file');
    const fileBuffer = await file.arrayBuffer(); // Convert File object to a buffer
    // console.log(fileBuffer)
    try {
      let mime = file.type;
      let encoding = 'base64';
      let base64Data = Buffer.from(fileBuffer).toString('base64');
      let fileUri = 'data:' + mime + ';' + encoding + ',' + base64Data;

      console.log("1----------", fileUri);
      const uploadToCloudinary = () => {
        return new Promise((resolve, reject) => {

          let result = cloudinary.uploader.upload(fileUri, {
            invalidate: true
          })
            .then((result) => {
              console.log(result);
              resolve(result);
            })
            .catch((error) => {
              console.error("2------------", error);
              reject(error);
            });
        });
      };

      let uploadResponse = await uploadToCloudinary();
      console.log("3------------------");
      console.log(uploadResponse);
      return Response.json(uploadResponse.secure_url);
    } catch (error) {
      console.error('Error during upload:', error);
      return new Response('Error uploading image', { status: 500 });
    }


  }
}