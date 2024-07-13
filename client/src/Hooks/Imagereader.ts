import React, { useState } from "react";
import { toast } from "react-toastify";
const ImageReader = () => {
  const [image, setImage] = useState<string | ArrayBuffer | null>(null);
  const convertimage = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file: File | null = e.target.files && e.target.files[0];
    const MAX_FILE_SIZE = 1 * 1024 * 1024;
    const filetype =  file && !file.type.startsWith("image/");
     if(filetype){
        toast.error("Please select a valid image file");
        return;
     
     }else if( file && file.size>MAX_FILE_SIZE){
        toast.error("File size should be less than 1MB");
        return;
     }
    const reader = new FileReader();
    reader.readAsDataURL(file!);
    reader.onload = () => {
      setImage(reader.result as ArrayBuffer);
    };
  };

  return { image, setImage, convertimage };
};

export default ImageReader;
