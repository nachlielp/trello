import { useCallback, useRef } from "react";
import { showInfomationMsg } from "../services/event-bus.service";
export default function CloudinaryUpload({ onAttachUrl, anchorEl }) {
  const fileInputRef = useRef(null);

  const handleFileChange = useCallback(
    async (event) => {
      showInfomationMsg("Uploading file...");
      const file = event.target.files[0];
      if (!file) return;

      try {
        const formData = new FormData();
        formData.append("file", file);
        formData.append(
          "upload_preset",
          import.meta.env.VITE_CLOUDINARY_UPLOAD_PRESET
        );

        const response = await fetch(
          `https://api.cloudinary.com/v1_1/${
            import.meta.env.VITE_CLOUDINARY_CLOUD_NAME
          }/image/upload`,
          {
            method: "POST",
            body: formData,
          }
        );

        if (!response.ok) {
          const errorData = await response.json();
          throw new Error(`Upload failed: ${errorData.error.message}`);
        }

        const data = await response.json();
        onAttachUrl(data);
      } catch (error) {
        console.error("CloudinaryUpload.error: ", error);
        // Handle error (e.g., show error message to user)
        alert(`Upload failed: ${error.message}`);
      }
    },
    [onAttachUrl]
  );

  const handleClick = () => {
    // console.log("CloudinaryUpload.handleClick");
    fileInputRef.current.click();
  };

  return (
    <>
      <input
        type="file"
        ref={fileInputRef}
        style={{ display: "none" }}
        onChange={handleFileChange}
      />
      <label onClick={handleClick}>{anchorEl}</label>
    </>
  );
}
