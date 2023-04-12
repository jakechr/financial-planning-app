import { useState } from 'react';
import ReusableCanvas from './ReusableCanvas';
import ReusableCanvasContent from './ReusableCanvasContent';
import GoalRow, { GoalHeader } from './tablerows/GoalRow';

import Dialog from '@mui/material/Dialog';
import TextField from '@mui/material/TextField';
import DialogTitle from '@mui/material/DialogTitle';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import Button from '@mui/material/Button';

export default function GoalsDashboard() {
  const canvasName = 'Goals';
  const canvasDescription = 'Track your spending goals here.';
  const canvasButton = 'Add New Goal';

  
  const [isDialogOpen, setDialogOpen] = useState(false);
  const handleClickOpen = () => setDialogOpen(true);
  const handleClose = () => setDialogOpen(false);

  const onAddButtonPress = () => {
    handleClickOpen();
  }

  let mockGoals = [
    {
      name: "Subaru",
      date: "10/1/2024",
      amount: 10000,
      description: "get a used car"
    },
    {
      name: "Better Subaru",
      date: "12/1/2025",
      amount: 25000,
      description: "get a nicer car"
    },
  ];

  const [goalsToShow, setGoalsToShow] = useState(mockGoals)

  const tableRows = goalsToShow.map((goal, index) => (
    <GoalRow key={index} goal={goal} />
  ));

  const canvasContent = <ReusableCanvasContent
    addButtonTitle={canvasButton}
    onAddButtonPress={onAddButtonPress}
    tableHeader={<GoalHeader/>}
    tableRows={tableRows}
  />;

  const [newGoalName, setNewGoalName] = useState('');
  const [newGoalDescription, setNewGoalDescription] = useState('');
  const [newGoalDate, setNewGoalDate] = useState('');
  const [newGoalAmount, setNewGoalAmount] = useState('');

  const addGoalFields = [
    {
        id: 'name',
        type: 'text',
        label: 'Name',
        setter: setNewGoalName
    },
    {
        id: 'description',
        type: 'text',
        label: 'Description',
        setter: setNewGoalDescription,
    },
    {
        id: 'date',
        type: 'date',
        label: '',
        setter: setNewGoalDate,
    },
    {
        id: 'amount',
        type: 'number',
        label: '$ Amount',
        setter: setNewGoalAmount,
    }
  ]

  const handleSubmit = () => {
      const newGoal = {
        name: newGoalName,
        description: newGoalDescription,
        date: newGoalDate,
        amount: parseInt(newGoalAmount)
      }

      // Hit the server, on success add goal
      
      mockGoals.push(newGoal)
      setGoalsToShow(mockGoals)

      setDialogOpen(false)
  }

  return (
    <>
        <ReusableCanvas
            canvasName={canvasName}
            canvasDescription={canvasDescription}
            canvasContent={canvasContent}
        />
        <AddGoalDialog isOpen={isDialogOpen} handleClose={handleClose} handleSubmit={handleSubmit} fields={addGoalFields}/>
    </>
  );
};


const AddGoalDialog = ({isOpen, fields, handleClose, handleSubmit}) => {
    return (
        <Dialog open={isOpen} onClose={handleClose} aria-labelledby="form-dialog-title">
            <DialogTitle id="form-dialog-title">New Goal</DialogTitle>

            <DialogContent>
                <DialogContentText>
                    Add your new goal, completion date, and amount you want to save up.
                </DialogContentText>

                {fields.map((field, i) => (
                    <TextField
                        key={i}
                        fullWidth
                        autoFocus={i === 0}
                        name={field.name}
                        type={field.type}
                        label={field.label}
                        margin="dense"
                        onChange={(event) => field.setter(event.target.value)}
                    />)
                )}
            </DialogContent>

            <DialogActions>
                <Button variant="outlined" color="secondary" onClick={handleClose}>
                    Cancel
                </Button>

                <Button onClick={handleSubmit} color="primary">
                    Add New
                </Button>
            </DialogActions>
        </Dialog>
    )
}