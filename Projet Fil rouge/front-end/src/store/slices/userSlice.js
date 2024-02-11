import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import axios from 'axios'

export const authenticateUser = createAsyncThunk(
  'user/authenticate',
  async ({ email, password }, { rejectWithValue }) => {
    try {
      const response = await axios.post('http://localhost:3000/api/login', {
        email,
        password
      })
      localStorage.setItem('token', response.data.token)
      return response.data
    } catch (error) {
      return rejectWithValue({
        message: error.response.data.message,
        status: error.response.status
      })
    }
  }
)

export const getUserData = createAsyncThunk(
  'user/getUserData',
  async function (_, { rejectWithValue }) {
    const token = localStorage.getItem('token')
    if (token) {
      try {
        const response = await axios.get(
          'http://localhost:3000/api/users/profile',
          {
            headers: {
              Authorization: `Bearer ${token}`
            }
          }
        )
        return response.data
      } catch (error) {
        return rejectWithValue({
          message: error.response
            ? error.response.data.message
            : 'An unknown error occurred',
          status: error.response ? error.response.status : 500
        })
      }
    }
    return rejectWithValue({
      message: 'No token found',
      status: 'Authorization Required'
    })
  }
)

const initialState = {
  userData: null,
  status: null,
  error: null
}

export const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    removeUserData: state => {
      state.userData = null
      state.status = null
      state.error = null
      localStorage.removeItem('token')
    }
  },
  extraReducers: builder => {
    builder
      .addCase(authenticateUser.pending, state => {
        state.status = 'loading'
      })
      .addCase(authenticateUser.fulfilled, (state, action) => {
        state.userData = action.payload
        state.status = 'succeeded'
      })
      .addCase(authenticateUser.rejected, (state, action) => {
        state.error = action.payload
        state.status = 'failed'
      })
      .addCase(getUserData.pending, state => {
        state.userData = null
        state.status = 'loading'
        state.error = null
      })
      .addCase(getUserData.fulfilled, (state, action) => {
        state.userData = action.payload
        state.status = 'succeeded'
        state.error = null
      })
      .addCase(getUserData.rejected, (state, action) => {
        state.userData = null
        state.status = 'failed'
        state.error = action.error.message
      })
  }
})

export const { removeUserData } = userSlice.actions
export default userSlice.reducer
