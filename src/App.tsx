import React, { useEffect, useState } from 'react'
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
  const storedTodos = JSON.parse(localStorage.getItem('todos')) || [
    {
      id:uuidv4(),
      text:"Welcome to Todo App",
      isCompleted:false,
      createdAt: new Date().toLocaleString()
    },
    {
      id:uuidv4(),
      text:"This is a completed task",
      isCompleted:true,
      createdAt: new Date().toLocaleString()
    }
  ];

  const [todos, setTodos] = useState<Todo[]| (() => Todo[])>(storedTodos);
  const [todoText, setTodoText] = useState<string>('');
  const [checked, setChecked] = useState<number[]>([]);

  useEffect(() => {
    localStorage.setItem('todos', JSON.stringify(todos));
  }, [todos]); 

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

  const deleteTodo = (todoId: string) => {
    const updateTodos = todos.filter(todo => todoId !== todo.id)
    setTodos(updateTodos);
  }

  return (
    <>
      <Container maxWidth="sm" sx={{border:"1px solid #000", padding:{ xs: 3, sm: 7 },borderRadius:2,boxShadow:"0px 30px 30px rgba(0, 0, 0, 0.1)", marginTop:5}}>
        <form onSubmit={handleSubmit} style={{marginBottom:"30px"}}>
          <Stack>
            <TextField fullWidth label="Add Todo" variant="outlined" value={todoText} onChange={(e) => setTodoText(e.target.value)}>
            </TextField>
            <Button sx={{ marginTop: { xs: 1, sm: "15px" }, fontWeight:"bold" }} type="submit" variant="contained" color="primary">Add Todo</Button>
          </Stack>
        </form>
        <List sx={{ width: '100%', bgcolor: 'background.paper',display:"flex",flexDirection:"column", gap:"10px"}}>
          {todos.map((todo,index) => {
            const labelId = `checkbox-list-label-${index}`
            return(
              <React.Fragment key={index}>              
                <ListItem
                secondaryAction={
                  <IconButton edge="end" aria-label="comments" onClick={() => deleteTodo(todo.id)}>
                    <DeleteTwoToneIcon />
                  </IconButton>
                }
                disablePadding
                >
                  <ListItemButton onClick={handleToggle(index)} dense>
                    <ListItemIcon>
                      <Checkbox
                        edge="start"
                        checked={checked.indexOf(index) !== -1 || todo.isCompleted}
                        tabIndex={-1}
                        disableRipple
                        inputProps={{ 'aria-labelledby': labelId }}
                      />
                    </ListItemIcon>
                    <ListItemText id={labelId} primary={<span className='todoText' style={{ textDecoration: todo.isCompleted ? "line-through" : "none"}}>{todo.text}</span>} secondary={`${todo.createdAt}`} />
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
