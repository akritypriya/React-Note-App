import arrow from "/src/assets/Arrow.svg";
import { useState, useEffect } from "react";
import "../CSS/noteSection.css";
import logo from "../../assets/mainLogo.png";
import lock from "/src/assets/lock.svg";

const NoteSection = ({ selectedX }) => {
  const [note, setNote] = useState(""); // single note
  const [notes, setNotes] = useState([]); // array
  const [key, setKey] = useState(""); // State to manage the key
  const [yValue, setYValue] = useState("");
  const screenWidth = window.innerWidth;
  // Function to handle form submission
  const handleSubmit = (e) => {
    e.preventDefault();

    if (note.trim() !== "") {
      const currentDate = new Date();
      const formattedTime = currentDate.toLocaleString("en-US", {
        hour: "numeric",
        minute: "numeric",
        hour12: true,
      });

      const formattedDate = currentDate.toLocaleDateString("en-GB", {
        day: "numeric",
        month: "short",
        year: "numeric",       
      });

      const timestamp = `${formattedDate}\n${formattedTime}`;

      const newNote = { text: note, timestamp: timestamp };

      // Save the note in local storage
      const storedNotesInfo =
        JSON.parse(localStorage.getItem("NotesInfo")) || {};

      // Check if the key already exists, if not, initialize an empty object
      if (!storedNotesInfo[key]) {
        storedNotesInfo[key] = { infogn: {}, notesgn: [] };
      }

      // Ensure that "notesgn" is an array and add the new note
      if (!Array.isArray(storedNotesInfo[key].notesgn)) {
        storedNotesInfo[key].notesgn = [newNote];
      } else {
        storedNotesInfo[key].notesgn.push(newNote);
      }

      localStorage.setItem("NotesInfo", JSON.stringify(storedNotesInfo)); // store the array back to local storage

      setNotes([...notes, newNote]);
      setNote("");
    }
  };
  

  useEffect(() => {
    const storedNotesInfo = JSON.parse(localStorage.getItem("NotesInfo")) || {};
    console.log("selectedX.x:", selectedX.x);
    // Check if the key (selectedX.x) already exists, and if so, load the notes for that key
    if (
      storedNotesInfo[selectedX.x] &&
      Array.isArray(storedNotesInfo[selectedX.x].notesgn)
    ) {
      setNotes(storedNotesInfo[selectedX.x].notesgn);
    } else {
      setNotes([]); // Initialize with an empty array if the key doesn't exist or notesgn is not an array
      setKey(null);
    }
    setKey(selectedX.x);
    setYValue(selectedX.y);
  }, [selectedX]);
  const handlearrow = () => {
    const popupbody = document.querySelector(".notemainbody"); //enable notesadder
    const sideb = document.querySelector(".sidebarmain"); //disable sidebar notesadder
    setKey("");

    if (screenWidth < 701) {   
      sideb.style.display = 'block';
      popupbody.style.display = 'none';
     }
    
  };
  return (
    <div className="notemainbody">
      
      <div className="maintextarea">
          {key === "" && (<div className="subtextarea" >
          <div className="bgImg">
            <img src={logo} />
            <h1>Pocket Notes</h1>
            <p>
              Send and receive messages without keeping your phone online.<br /> Use
              Pocket Notes on up to 4 linked devices and 1 mobile phone
            </p>
            
              <img src={lock} alt="" />{" "}<span>end-to-end encrypted

            </span>
          </div>
          </div>)};
          </div>
      
      <div className="notesadder">
        <div className="notesInfolist">
          <div className="arrowback notesadders" onClick={handlearrow}>
            {/* <img id = "imgarr" src={arrow} /> */}
          </div>
          <div
            className="initials"
            style={{ backgroundColor: `${selectedX.y}` }}
          >
            {selectedX.x.slice(0, 2).toUpperCase()}
          </div>
          <div className="notesInitial">{key}</div>
        </div>
      </div>
      <div className="Notesadd">
        {notes.map((note, index) => (
          <div className="timeandnotes" key={index}>
            <div className="timeadder">{note.timestamp}</div>
            <div className="timeaddernone">{note.text}</div>
          </div>
        ))}
      </div>
      <form onSubmit={handleSubmit} className="formofnotes">
        <textarea
          className="notestext"
          type="textarea"
          placeholder="Enter your note..."
          value={note}
          onChange={(e) => setNote(e.target.value)}
        />
        <button className="notesbutton" type="submit">
          <img src={arrow} />
        </button>
      </form>
    </div>
  );
};



export default NoteSection;