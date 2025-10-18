import { v2 as cloudinary, type UploadApiErrorResponse, type UploadApiResponse } from 'cloudinary';

interface CloudinaryResource {
  public_id: string;
  version: number;
  width: number;
  height: number;
  format: string;
  resource_type: string;
  created_at: string;
  tags: string[];
  bytes: number;
  type: string;
  url: string;
  secure_url: string;
  [key: string]: any; // allow extra fields
}

// Configuration
cloudinary.config({ 
    cloud_name: process.env.CLOUDINARY_NAME as string, 
    api_key: process.env.CLOUDINARY_API_KEY as string, 
    api_secret: process.env.CLOUDINARY_API_SECRET as string // Click 'View API Keys' above to copy your API secret
});

export const DEFAULT_PLACEHOLDER = "https://blocks.astratic.com/img/general-img-landscape.png";

/**
 * Uploads an image to Cloudinary.
 * @param imagePath URL or local path to the image
 * @param publicId Optional public ID to assign in Cloudinary
 * @returns UploadApiResponse or undefined if upload fails
 */
export async function uploadImage(
    file: Express.Multer.File,
    publicId: string
): Promise<string | undefined> {
    try {
        const base64 = `data:${file.mimetype};base64,${file.buffer.toString("base64")}`;

        // Upload to Cloudinary
        const result: UploadApiResponse = await cloudinary.uploader.upload(base64, {
            public_id: publicId,
            folder: "apiaries", // optional folder
        });
        
        return result.secure_url;
    } catch (error) {
        const typedError = error as UploadApiErrorResponse;
        console.error("Cloudinary upload failed:", typedError.message);
        return undefined;
    }
}

export async function getImage(publicId: string): Promise<string> {
    try {
        const resource = (await cloudinary.api.resource(publicId)) as CloudinaryResource;
        return resource.secure_url
    } catch (error) {
        console.error("Image not found:", error);
        return DEFAULT_PLACEHOLDER; // image does not exist
    }
}

