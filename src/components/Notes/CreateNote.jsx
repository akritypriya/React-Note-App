// import * as React from 'react';
// import Box from '@mui/material/Box';
// import Modal from '@mui/material/Modal';
// import Button from '@mui/material/Button';
// import Typography from '@mui/material/Typography';
// import TextField from '@mui/material/TextField';
// import styles from "./createNote.module.css";



// function CreateNote() {
//   const [open, setOpen] = React.useState(false);
//   const [groupName, setGroupName] = React.useState('');
//   const [selectedColor, setSelectedColor] = React.useState('');
//   const colors = ['#A78BFA', '#F472B6', '#67E8F9', '#FDBA74', '#1D4ED8', '#6366F1'];

//   const handleOpen = () => setOpen(true);
//   const handleClose = () => setOpen(false);
  
//   const handleCreate = () => {
//     if (groupName) {
//       console.log('Group Created:', { name: groupName, color: selectedColor });
//       handleClose();
//     } 
//         throw new Error('Please enter a group name');
    
//   };

//   return (
//     <div>
//       <button className={styles.noteButton} onClick={handleOpen}>+</button>
//       <Modal
//         aria-labelledby="create-group-modal-title"
//         aria-describedby="create-group-modal-description"
//         open={open}
//         onClose={handleClose}
//       >
//         <Box className={styles.modalStyle}>
//           <Typography id="create-group-modal-title" variant="h6" component="h2" sx={{ fontWeight: 'bold', mr: 2 }}>
//             Create New Group
//           </Typography>

//           <div className={styles.formRow}>
//             <Typography sx={{ fontWeight: 'bold', mr: 2 }}>Group Name</Typography>
//             <TextField
//               variant="outlined"
//               value={groupName}
//               onChange={(e) => setGroupName(e.target.value)}
//               placeholder="Enter group name"
//               size="small"
//               className={styles.groupNameInput}
//             />
//           </div>
//           <div className={styles.formRow}>
//           <Typography sx={{ fontWeight: 'bold', mr: 2 }}>Choose Colour</Typography>
//           <div className={styles.colorContainer}>
//             {colors.map((color) => (
//               <span
//                 key={color}
//                 onClick={() => setSelectedColor(color)}
//                 className={styles.colorCircle}
//                 style={{
//                   backgroundColor: color,
//                   border: selectedColor === color ? '3px solid #6691FF' : 'none'
//                 }}
//               />
//             ))}
//           </div>
//           </div>
//           <Button
//             variant="contained"
//             onClick={handleCreate}

//             className={styles.createButton}>
//             Create
//           </Button>
//         </Box>
//       </Modal>
//     </div>
//   );
// }

// export default CreateNote;



import * as React from 'react';
import Box from '@mui/material/Box';
import Modal from '@mui/material/Modal';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import TextField from '@mui/material/TextField';
import styles from "./createNote.module.css";

function CreateNote({onFormSubmit}) {
  const [open, setOpen] = React.useState(false);
  const [groupName, setGroupName] = React.useState('');
  const [selectedColor, setSelectedColor] = React.useState('');
  const [noteinfo ,setNoteInfo] = React.useState(" ")
  const [notesinfo, setNotesInfo] = React.useState([]);
  const colors = ['#A78BFA', '#F472B6', '#67E8F9', '#FDBA74', '#1D4ED8', '#6366F1'];

  const handleOpen = () => setOpen(true);
  const handleClose = () => {
    setGroupName('');
    setSelectedColor('');
    setOpen(false);
  };

  const handleCreate = () => {
    if (groupName && selectedColor) {
      const newGroup = { groupName, selectedColor };
      
      // Retrieve existing groups from local storage
      const existingGroups = JSON.parse(localStorage.getItem('NotesInfo')) || {};;
      existingGroups[groupName]= {infogn:newGroup};
      
      // Save updated groups back to local storage
      localStorage.setItem('NotesInfo', JSON.stringify(existingGroups));
      
      setNotesInfo([...notesinfo, newGroup]);
      setNoteInfo("");
      onFormSubmit({ groupName, selectedColor });  //use in another component
      console.log('Group Created:', newGroup);
      handleClose();
    } else {
      alert('Please enter all the details'); // Changed from throw to alert for user feedback
    }
  };
 
  return (
    <div>
      <button className={styles.noteButton} onClick={handleOpen}>+</button>
      <Modal
        aria-labelledby="create-group-modal-title"
        aria-describedby="create-group-modal-description"
        open={open}
        onClose={handleClose}
      >
        <Box className={styles.modalStyle}>
          <Typography id="create-group-modal-title" variant="h6" component="h2" sx={{ fontWeight: 'bold', mr: 2 }}>
            Create New Group
          </Typography>

          <div className={styles.formRow}>
            <Typography sx={{ fontWeight: 'bold', mr: 2 }}>Group Name</Typography>
            <TextField
              variant="outlined"
              value={groupName}
              onChange={(e) => setGroupName(e.target.value)}
              placeholder="Enter group name"
              size="small"
              className={styles.groupNameInput}
            />
          </div>
          <div className={styles.formRow}>
            <Typography sx={{ fontWeight: 'bold', mr: 2 }}>Choose Colour</Typography>
            <div className={styles.colorContainer}>
              {colors.map((color) => (
                <span
                  key={color}
                  onClick={() => setSelectedColor(color)}
                  className={styles.colorCircle}
                  style={{
                    backgroundColor: color,
                    border: selectedColor === color ? '3px solid #6691FF' : 'none'
                  }}
                />
              ))}
            </div>
          </div>
          <Button
            variant="contained"
            onClick={handleCreate}
            className={styles.createButton}>
            Create
          </Button>
        </Box>
      </Modal>
    </div>
  );
}

export default CreateNote;
