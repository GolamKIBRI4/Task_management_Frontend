import { createSlice, createAsyncThunk, type PayloadAction } from '@reduxjs/toolkit';
import type { Todo } from '../../types/interfaces';
import todoService from '../../services/todo-service';




// Fetch all todos
export const fetchTodos = createAsyncThunk('todos/fetchTodos', async () => {
  const { request } = todoService.getAll<Todo>();
  const response = await request;

  // Normalize _id to id
  return response.data.map((todo: Todo ) => ({
    ...todo,
    id: (todo._id),
  }));
});

// Add a new todo
export const addTodoAsync = createAsyncThunk('todos/addTodo', async (todo: Omit<Todo, 'id'>) => {
  const response = await todoService.Add(todo); // POST /todos
  return {
    ...response.data,
    id: response.data._id,
  };
});

// Update an existing todo
export const updateTodoAsync = createAsyncThunk('todos/updateTodo', async (todo: Todo) => {
  const response = await todoService.Update({ ...todo, id: String(todo.id) }); // PUT /todos/:id
  return {
    ...response.data,
    id: response.data._id,
  };
});

// Delete a todo by ID
export const deleteTodoAsync = createAsyncThunk('todos/deleteTodo', async (id: string) => {
  await todoService.Delete(id); // DELETE /todos/:id
  return id;
});

const todoSlice = createSlice({
  name: 'todos',
  initialState: [] as Todo[],
  reducers: {
    toggleTodo: (state, action: PayloadAction<string>) => {
      const todo = state.find(t => String(t.id) === String(action.payload));
      if (todo) {
        todo.completed = !todo.completed;
      }
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchTodos.fulfilled, (_, action) => action.payload)
      .addCase(addTodoAsync.fulfilled, (state, action) => {
        state.push(action.payload);
      })
      .addCase(updateTodoAsync.fulfilled, (state, action) => {
        const index = state.findIndex(t => t.id === action.payload.id);
        if (index !== -1) {
          state[index] = action.payload;
        }
      })
.addCase(deleteTodoAsync.fulfilled, (state, action) => {
  const index = state.findIndex(t => String(t.id) === String(action.payload));
  if (index !== -1) {
    state.splice(index, 1); 
  }
});

  },
});

export const { toggleTodo } = todoSlice.actions;
export default todoSlice.reducer;
