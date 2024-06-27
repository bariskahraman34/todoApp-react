import React, { useState } from 'react'
import './App.css'
import { Button,TextField,Container,List,ListItem, IconButton, ListItemButton, ListItemIcon, Checkbox, ListItemText, Divider, Stack } from '@mui/material';
import DeleteTwoToneIcon from '@mui/icons-material/DeleteTwoTone';
import { v4 as uuidv4 } from 'uuid';

type Todo = {
  id: string,
  text: string,
  isCompleted: boolean,
  createdAt: string;
}

function App():JSX.Element {
  const [todos, setTodos] = useState<Todo[]>([]);
  const [todoText, setTodoText] = useState<string>('');
  const [checked, setChecked] = useState<number[]>([]);

  const handleSubmit = (e: { preventDefault: () => void; }) => {
    e.preventDefault();
    if(todoText.trim() === "") return;

    const newTodo = {id: uuidv4(), text:todoText, isCompleted:false , createdAt: new Date().toLocaleString()}
    
    setTodos(
      [...todos , newTodo]
    );
    setTodoText('');
  }

  const handleToggle = (index: number) => () => {
    const newChecked = [...checked];
    const todoToUpdate = todos[index];
    console.log('todoToUpdate  ', todoToUpdate)

    if (newChecked.includes(index)) {
      newChecked.splice(newChecked.indexOf(index), 1);
      todoToUpdate.isCompleted = false;
    } else {
      newChecked.push(index);
      todoToUpdate.isCompleted = true;
    }
    setChecked(newChecked);
    const updatedTodos = [...todos];
    updatedTodos[index] = todoToUpdate;
    setTodos(updatedTodos);
  };

  console.log(todos)
  
  return (
    <>
      <Container maxWidth="sm">
        <form onSubmit={handleSubmit}>
          <Stack>
            <TextField fullWidth label="Add Todo" variant="outlined" value={todoText} onChange={(e) => setTodoText(e.target.value)}>
            </TextField>
            <Button sx={{marginTop:"10px"}} type="submit" variant="contained" color="primary">Add Todo</Button>
          </Stack>
        </form>
        <List sx={{ width: '100%', bgcolor: 'background.paper' }}>
          {todos.map((todo,index) => {
            const labelId = `checkbox-list-label-${index}`
            return(
              <React.Fragment key={index}>              
                <ListItem
                secondaryAction={
                  <IconButton edge="end" aria-label="comments">
                    <DeleteTwoToneIcon />
                  </IconButton>
                }
                disablePadding
                >
                  <ListItemButton onClick={handleToggle(index)} dense>
                    <ListItemIcon>
                      <Checkbox
                        edge="start"
                        checked={checked.indexOf(index) !== -1}
                        tabIndex={-1}
                        disableRipple
                        inputProps={{ 'aria-labelledby': labelId }}
                      />
                    </ListItemIcon>
                    <ListItemText id={labelId} primary={<span style={{ textDecoration: todo.isCompleted ? "line-through" : "none" , fontSize: "20px"}}>{todo.text}</span>} secondary={`${todo.createdAt}`} />
                  </ListItemButton>
                </ListItem>
                <Divider />
              </React.Fragment>
            )
          })}
        </List>
      </Container>
    </>
  )
}

export default App
