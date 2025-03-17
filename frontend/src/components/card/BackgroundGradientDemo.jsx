import React, { useEffect, useState } from "react";
import { BackgroundGradient } from "./background-gradient";
import axios from "axios";

export function BackgroundGradientDemo({uploadedFile}) {
  const [preview, setPreview] = useState(null);
  const [label, setLabel] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const googleSearchUrl = `https://www.google.com/search?q=${encodeURIComponent(label)}`;

  useEffect(() => {
    if (uploadedFile) {
      const objectUrl = URL.createObjectURL(uploadedFile);
      setPreview(objectUrl);
      setIsLoading(true);
      setLabel("");
  
      const uploadImageAndGetURL = async () => {
        try {
          const formData = new FormData();
          formData.append("file", uploadedFile);
          formData.append("upload_preset", "my_preset"); // Replace with your Cloudinary preset
  
          // Upload image to Cloudinary
          const cloudinaryURL = import.meta.env.VITE_cloudinaryURL;
          const cloudinaryResponse = await axios.post(cloudinaryURL, formData
          );
  
          const imageUrl = cloudinaryResponse.data.secure_url; // Get public URL
          console.log(imageUrl);
  
          // Now send imageUrl to your backend
          const VITE_BACKEND_URL = import.meta.env.VITE_BACKEND_URL;
          const response = await axios.post(`${VITE_BACKEND_URL}/api/v1/label`, { imageUrl });
  
          setLabel(response.data.label);
          setIsLoading(false);
        } catch (error) {
          setLabel("Network err.. please try again");
          console.error("Network err.. please try again");
        }
      };
  
      uploadImageAndGetURL();
  
      return () => URL.revokeObjectURL(objectUrl);
    }
  }, [uploadedFile]);
  

  
  return (
    (<div className="flex justify-center">
      {uploadedFile && uploadedFile.type.startsWith("image/") ?
      <BackgroundGradient className="rounded-[22px] max-w-sm p-4 sm:p-10 bg-white dark:bg-zinc-900">
        <img
          // src={`/jordans.webp`}
          src={preview}
          alt="jordans"
          height="400"
          width="400"
          className="object-contain" />
        {label.length > 0 &&
          <p
            className="text-base sm:text-xl text-black mt-4 mb-2 dark:text-neutral-200">
            Look like {label}
          </p>
        }

        {isLoading && 
          <p
          className="text-base sm:text-xl text-black mt-4 mb-2 dark:text-neutral-200">
            Loading...
          </p>
        }

        {/* <p className="text-sm text-neutral-600 dark:text-neutral-400">
          The Air Jordan 4 Retro Reimagined Bred will release on Saturday,
          February 17, 2024. Your best opportunity to get these right now is by
          entering raffles and waiting for the official releases.
        </p> */}

        {label.length > 0 &&
          <p className="text-center">
            <button
              className="rounded-full pl-2 pr-2 py-1 text-white flex items-center space-x-1 bg-black mt-4 text-xs font-bold dark:bg-zinc-800">
                <a href={googleSearchUrl} target="_blank" rel="noopener noreferrer">
                  Search {label} on Google
                </a>
            </button>
          </p>
        }
      </BackgroundGradient> : <p className="text-center bg-red-300 rounded m-2 p-2">Please upload an image file</p>}
    </div>)
  );
}
