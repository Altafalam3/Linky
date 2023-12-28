import { v2 as cloudinary } from 'cloudinary';

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
  secure: true // Enabling secure uploads
});

export async function POST(req) {
  const formData = await req.formData();

  if (formData.has('file')) {
    const file = formData.get('file');
    const fileBuffer = await file.arrayBuffer();


    try {
      const uploadResponse = await cloudinary.uploader.upload_stream({}, async (error, result) => {
        if (error) {
          console.error('Error uploading to Cloudinary:', error);
          return new Response('Error uploading image', { status: 500 });
        }
        if (result && result.secure_url) {
          return Response.json(result.secure_url);
        }
      }).end(fileBuffer);

      return uploadResponse; // Return the response from Cloudinary
    } catch (error) {
      console.error('Error during upload:', error);
      return new Response('Error uploading image', { status: 500 });
    }
  }
}
