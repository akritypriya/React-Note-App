import { useState } from "react";
import "../CSS/CreateNote.css";

const CreateNote =  ({onFormSubmit,Notetogglepops}) => {
  
  const [card , setCard] = useState(false); //toggle hide

  const [groupName, setGroupName] = useState("");  //note name

  const [selectedColor, setSelectedColor] = useState(""); //color

  const [noteinfo ,setNoteInfo] = useState(" ");   //noteinfo

  const [notesinfo, setNotesInfo] = useState([]);

  const handleFormSubmit = (e) => {
    e.preventDefault();
    try {
      if (groupName === "" || selectedColor === "") {
        throw new Error("All the Fields Required");
      }
      const newNoteInfo = { groupName , selectedColor };
      
      
      // Save the note in local storage
      const storedNotesInfo = JSON.parse(localStorage.getItem("NotesInfo")) || {};    //fetch the array of notes in storedNotes
      
      storedNotesInfo[groupName] = {infogn:newNoteInfo};
      
      
      //storedNotesInfo.push(newNoteInfo);                                               
      
      localStorage.setItem("NotesInfo", JSON.stringify(storedNotesInfo));             

      setNotesInfo([...notesinfo, newNoteInfo]);
      setNoteInfo("");
      onFormSubmit({ groupName, selectedColor }); // Call the parent component's callback function to store the values
      togglecardstate(); // Close the popup after submission
      Notetogglepops();
    }
     catch (error) {
      console.error("An error caught");
      console.error("Error message: " + error.message);
      alert(error.message);
    }
  }


  const togglecardstate = () =>{
    Notetogglepops();
    setGroupName("");
    setSelectedColor("");
  }
  const stopPropagation = (event) => {
    event.stopPropagation(); // Prevent the click event from propagating to popupbody
  }

  return (
    
    <div className={`mainContainer ${card ? 'active-modal' : ''}`} onClick={togglecardstate}>


      <div className="noteContainer" onClick={stopPropagation} >
        <div className="noteHeader">
            <div className="noteSubheader" id="notesub">
              Create New group
            </div>
            <div className="noteSubheader">
              <label>
                Group Name <input type="text" name="myCheckbox" placeholder="Enter your group name..." value={groupName} onChange={(e) => setGroupName(e.target.value)}/>
              </label>
            </div>
            <div className="noteSubheader">
              <label>
                Choose colour 
                <input type="radio" name="myCheckbox" style={{backgroundColor : 'var(--c1)'}} onChange={() => setSelectedColor('var(--c1)')} />
                <input type="radio" name="myCheckbox" style={{backgroundColor : 'var(--c2)'}} onChange={() => setSelectedColor('var(--c2)')} />
                <input type="radio" name="myCheckbox" style={{backgroundColor : 'var(--c3)'}} onChange={() => setSelectedColor('var(--c3)')} />
                <input type="radio" name="myCheckbox" style={{backgroundColor : 'var(--c4)'}} onChange={() => setSelectedColor('var(--c4)')} />
                <input type="radio" name="myCheckbox" style={{backgroundColor : 'var(--c5)'}} onChange={() => setSelectedColor('var(--c5)')} />
                <input type="radio" name="myCheckbox" style={{backgroundColor : 'var(--c6)'}} onChange={() => setSelectedColor('var(--c6)')} />
                
              </label>
            </div>
        </div>
        <div className="noteHeader" id="noteheader">
            <button id="createBtn" onClick={handleFormSubmit}>Create</button>
        </div>
      </div>
    </div>
  );
};

export default CreateNote;
