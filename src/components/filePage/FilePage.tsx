import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import supabase from "../supabaseClient";

const FilePage = () => {
  const { id } = useParams<string>();
  const [fileName, setFileName] = useState<string>();
  const [fileBlob, setFileBlob] = useState<Blob | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        if (typeof id === "string") {
          //List files (there should be only one) in folder
          const { data: listData, error: listError } = await supabase.storage
            .from("files")
            .list(id);
          if (listError) {
            console.error("Error fetching data:", listError);
          } else if (listData && listData.length > 0) {
            setFileName(listData[0].name);
            console.log(listData);
          }

          // Download a file
          if (fileName) {
            const { data: downloadData, error: downloadError } =
              await supabase.storage
                .from("files")
                .download(`${id}/${fileName}`);

            if (downloadError) {
              console.error("Error downloading file:", downloadError);
            } else {
              console.log(downloadData);
              setFileBlob(downloadData);
            }
          }
        }
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, [fileName, id]);
  if (id) {
    return (
      <>
        {fileBlob ? (
          <>
            <a href={URL.createObjectURL(fileBlob)} download={fileName}>
              Download
            </a>

            {fileBlob.type.startsWith("image/") ? (
              <img src={URL.createObjectURL(fileBlob)} alt="" />
            ) : fileBlob.type.startsWith("video/") ? (
              <video src={URL.createObjectURL(fileBlob)} controls />
            ) : fileBlob.type.startsWith("audio/") ? (
              <audio src={URL.createObjectURL(fileBlob)} controls />
            ) : null}
          </>
        ) : (
          "404 site not found"
        )}
      </>
    );
  }
};

export default FilePage;
