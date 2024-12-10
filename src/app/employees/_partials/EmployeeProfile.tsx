import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { Upload, User } from "lucide-react";
import Image from "next/image";
import { useState } from "react";

interface ProfileImageUploadProps {
  imagePath? : string | null
  onImageUpload? : (file : File) => void
}

const ProfileImageUpload: React.FC<ProfileImageUploadProps> = ({
  imagePath,
  onImageUpload,
}) => {
  const [imageFile, setImageFile] = useState<File | null>(null);
  const [previewUrl, setPreviewUrl] = useState<string | null>(imagePath || null);
  const [isLoading, setIsLoading] = useState(false);

  const handleImageUpload = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) return;

    setImageFile(file);
    setPreviewUrl(URL.createObjectURL(file));

    if (onImageUpload) {
      setIsLoading(true);
      try {
        await onImageUpload(file);
      } catch (error) {
        console.error('Error uploading image:', error);
      } finally {
        setIsLoading(false);
      }
    }
  };

  return (
    <div className="flex items-start bg-gray-50 dark:bg-[#030711] p-4 rounded-lg">
      {/* Profile Image or Placeholder */}
      <div className="mr-4">
        {previewUrl ? (
          <Image
            src={previewUrl}
            alt="Profile Picture"
            width={64}
            height={64}
            className="w-16 h-16 rounded-full object-cover"
          />
        ) : (
          <div className="w-16 h-16 flex items-center justify-center bg-gray-200 rounded-full">
            <User className="text-gray-500" size={32} />
          </div>
        )}
      </div>

      {/* File Input and Details */}
      <div>
        <h3 className="font-semibold">{imagePath ? 'Change' : 'Upload'} Profile Image</h3>
        <p className="text-gray-500 text-xs mb-4">Image should be below 4 MB</p>
        <div className="mt-2 flex items-center">
          <label
            htmlFor="image-upload"
            className={cn(
              'bg-primary  hover:opacity-90 text-white dark:text-black px-4 py-1 rounded cursor-pointer',
              isLoading && 'opacity-50 cursor-not-allowed'
            )}
          >
            {isLoading ? 'Uploading...' : <div className="flex items-center gap-2">
              <Upload className="w-4 h-4" />{imagePath ? 'Change' : 'Upload'}</div>}
          </label>
          <input
            id="image-upload"
            type="file"
            accept="image/*"
            className="sr-only"
            disabled={isLoading}
            onChange={handleImageUpload}
          />

          <button
            type="button" // Fix added here
            className="text-gray-500 hover:text-gray-600 ml-4 px-4 py-2"
            onClick={() => {
              setImageFile(null);
              setPreviewUrl(imagePath || null);
            }}
          >
            Cancel
          </button>
        </div>
      </div>
    </div>
  );
};

export default ProfileImageUpload;
