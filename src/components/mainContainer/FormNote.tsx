import { useEffect, useState } from "react";
import supabase from "../supabaseClient";
import styles from "./MainContainer.module.css";
interface FormFileProps {
  setFinalUrl: React.Dispatch<React.SetStateAction<string>>;
}
const FormNote: React.FC<FormFileProps> = ({ setFinalUrl }) => {
  const [noteTitle, setNoteTitle] = useState<string | null>();
  const [noteTitleBorder, setNoteTitleBorder] = useState<string>("black");
  const [noteText, setNoteText] = useState<string | null>();
  const [noteTextBorder, setNoteTextBorder] = useState<string>("black");
  const [activateBorders, setActivateBorders] = useState<boolean>(false);

  useEffect(() => {
    if (activateBorders) {
      if (!noteTitle) {
        setNoteTitleBorder("red");
      } else {
        setNoteTitleBorder("black");
      }
      if (!noteText) {
        setNoteTextBorder("red");
        return;
      } else {
        setNoteTextBorder("black");
      }
    }
  }, [activateBorders, noteText, noteTitle]);

  async function handleNewNote() {
    if (noteTitle && noteText) {
      const { data, error } = await supabase
        .from("notes")
        .insert([{ title: noteTitle, text: noteText }]) // todo After adding auth add user_id here
        .select();
      if (error) {
        console.error(error);
      } else {
        console.log(data);
        setFinalUrl(`${window.location.href}n/${data[0].id}`);
      }
    } else {
      setActivateBorders(true);
      setFinalUrl("Some values are missing");
    }
  }
  return (
    <div className={styles.mainForm} id={styles.formNote}>
      <input
        type="text"
        name=""
        placeholder="Title"
        onChange={(e) => setNoteTitle(e.target.value)}
        style={{ borderColor: noteTitleBorder }}
      />
      <input
        type="text"
        name=""
        id=""
        placeholder="Note"
        onChange={(e) => setNoteText(e.target.value)}
        style={{ borderColor: noteTextBorder }}
      />

      <button id={styles.submitButton} onClick={handleNewNote}>
        ⚡
      </button>
    </div>
  );
};
export default FormNote;
