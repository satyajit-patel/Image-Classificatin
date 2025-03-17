import { useEffect } from "react";
import {FileUploadDemo} from "./components/fileUpload/FileUploadDemo";
import axios from "axios";

function App() {

  useEffect(() => {
    const wakeUpCall = async () => {
      try {
        const VITE_BACKEND_URL = import.meta.env.VITE_BACKEND_URL;
        const response = await axios.post(`${VITE_BACKEND_URL}/api/v1/label`, {imageUrl: "https://cdn.pixabay.com/photo/2023/08/18/15/02/dog-8198719_640.jpg"});
        console.log(response.data.label);
      } catch (error) {
        console.error("Error fetching label:", error);
      }
    };

    wakeUpCall();
  }, []);


  return (
    <>
      <div>
        <div className="bg-black text-amber-100 m-4 p-4 rounded-md">
          COCO contains 330K images, with 200K images having annotations for object detection, and captioning tasks. 
          The dataset comprises 80 object categories, including common objects like cars, bicycles, and animals, as well as more specific categories such as umbrellas, handbags, and sports equipment.
        </div>
      </div>
      <FileUploadDemo />
    </>
  )
}

export default App
