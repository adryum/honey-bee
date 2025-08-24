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

const {
    CLOUDINARY_NAME,
    CLOUDINARY_API_KEY,
    CLOUDINARY_API_SECRET,
} = process.env as {
    CLOUDINARY_NAME: string;
    CLOUDINARY_API_KEY: string;
    CLOUDINARY_API_SECRET: string;
};

// Configuration
cloudinary.config({ 
    cloud_name: CLOUDINARY_NAME, 
    api_key: CLOUDINARY_API_KEY, 
    api_secret: CLOUDINARY_API_SECRET // Click 'View API Keys' above to copy your API secret
});

const DEFAULT_PLACEHOLDER = "https://via.placeholder.com/500";

/**
 * Uploads an image to Cloudinary.
 * @param imagePath URL or local path to the image
 * @param publicId Optional public ID to assign in Cloudinary
 * @returns UploadApiResponse or undefined if upload fails
 */
export async function uploadImage(
  imagePath: string,
  publicId: string
): Promise<string | undefined> {
    try {
        const result: UploadApiResponse = await cloudinary.uploader.upload(imagePath, { public_id: publicId });
        
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

