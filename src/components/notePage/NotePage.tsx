import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import supabase from "../supabaseClient";

const LinkPage = () => {
  const { id } = useParams<string>();
  const [noteTitle, setNoteTitle] = useState<string | null>();
  const [noteText, setNoteText] = useState<string | null>();

  useEffect(() => {
    const fetchData = async () => {
      try {
        if (typeof id === "string") {
          const trimmedId = id?.replace("+", "");
          const { data, error } = await supabase
            .from("notes")
            .select("title,text")
            .eq("id", trimmedId);

          if (error) {
            console.error("Error fetching data:", error.message);
          } else {
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
    return (
      <>
        {noteTitle ? (
          <div>
            <h1>{noteTitle}</h1>
            <p>{noteText} </p>
          </div>
        ) : (
          <h1>404 site not found</h1>
        )}
      </>
    ); //todo Make it look 🌟nice🌟
  }
};

export default LinkPage;
