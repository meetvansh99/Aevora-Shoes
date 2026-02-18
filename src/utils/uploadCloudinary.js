import imageCompression from 'browser-image-compression';

const uploadToCloudinary = async (file) => {
  // 👇 SAKHT COMPRESSION SETTINGS
  const options = {
    maxSizeMB: 0.6,             // 👈 Yahan humne 600KB ka limit set kar diya hai
    maxWidthOrHeight: 1080,    // Resolution ko 1080p tak limit kiya
    useWebWorker: true,
    initialQuality: 0.5,       // Quality 50% se start hogi taaki size turant drop ho
    alwaysKeepResolution: false,
    fileType: 'image/jpeg'     // Best compression ratio ke liye
  };

  try {
    const originalSize = (file.size / 1024 / 1024).toFixed(2);
    console.log(`Original: ${originalSize} MB`);

    // 2. COMPRESS PROCESS
    const compressedFile = await imageCompression(file, options);
    
    const compressedSize = (compressedFile.size / 1024).toFixed(2);
    console.log(`Final Compressed: ${compressedSize} KB`);

    // 3. UPLOAD TO CLOUDINARY
    const formData = new FormData();
    formData.append("file", compressedFile);
    formData.append("upload_preset", import.meta.env.VITE_CLOUDINARY_UPLOAD_PRESET); 

    const response = await fetch(
      `https://api.cloudinary.com/v1_1/${import.meta.env.VITE_CLOUDINARY_CLOUDNAME}/image/upload`,
      {
        method: "POST",
        body: formData,
      }
    );

    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.error?.message || "Upload error");
    }

    const data = await response.json();
    
    // Cloudinary side formatting (Auto format and good quality)
    return data.secure_url.replace('/upload/', '/upload/q_auto:good,f_auto/');

  } catch (error) {
    console.error("Compression Error:", error);
    throw error;
  }
};

export default uploadToCloudinary;