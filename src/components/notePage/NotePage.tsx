import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import supabase from "../supabaseClient";

const LinkPage = () => {
  const { id } = useParams<string>();
  const [noteTitle, setNoteTitle] = useState<string | null>();
  const [noteText, setNoteText] = useState<string | null>();
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        if (typeof id === "string") {
          setIsLoading(true);

          const trimmedId = id?.replace("+", "");
          const { data, error } = await supabase
            .from("notes")
            .select("title,text")
            .eq("id", trimmedId);

          if (error) {
            console.error("Error fetching data:", error.message);
          } else {
            setIsLoading(false);
            setNoteTitle(data[0]?.title);
            setNoteText(data[0]?.text);
            console.log(noteTitle);
            console.log(noteText);
          }
        }
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, [id, noteText, noteTitle]);
  if (id) {
    return isLoading ? (
      "Loading"
    ) : noteTitle ? (
      <div>
        <h1>{noteTitle}</h1>
        <p>{noteText}</p>
      </div>
    ) : (
      "404 site not found"
    );
  }
};

export default LinkPage;
