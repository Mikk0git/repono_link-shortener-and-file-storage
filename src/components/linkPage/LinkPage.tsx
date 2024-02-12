import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import supabase from "../supabaseClient";

const LinkPage = () => {
  const { id } = useParams<string>();
  const [originalUrl, setOriginalUrl] = useState<string | null>();

  useEffect(() => {
    const fetchData = async () => {
      try {
        if (typeof id === "string") {
          const trimmedId = id?.replace("+", "");
          const { data, error } = await supabase
            .from("links")
            .select("original_url")
            .eq("id", trimmedId);

          if (error) {
            console.error("Error fetching data:", error.message);
          } else {
            setOriginalUrl(data[0]?.original_url);
            console.log(originalUrl);
            if (originalUrl && id.charAt(id.length - 1) != "+") {
              console.log("Redirecting to:", originalUrl);
              window.location.href = originalUrl;
            }
          }
        }
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, [id, originalUrl]);
  if (id) {
    return (
      <>
        {id.charAt(id.length - 1) != "+" ? (
          <div>
            <h1>Redirecting</h1>
            <p>Please wait a moment</p>
          </div>
        ) : null}
        {originalUrl ? (
          <a href={originalUrl}>{originalUrl}</a>
        ) : (
          "404 site not found"
        )}
      </>
    );
  }
};

export default LinkPage;
