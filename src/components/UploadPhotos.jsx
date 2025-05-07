
import "./styles.css";
import { FirebaseUploads } from "./FirebaseUploads";

export const UploadPhotos = ({ className }) => {
  return <div className={className}>
    <FirebaseUploads />
  </div>
};
