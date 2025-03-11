import { createAsyncThunk } from "@reduxjs/toolkit";
import { SERVER_PORT } from "../config/env";

const fetchGetProject = createAsyncThunk(
  'project/getProject',
  async (_, { rejectWithValue }) => {
    try {
      const response = await fetch(`${SERVER_PORT}/user/project`,
        {
          method: 'GET',
          headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json',
          }
        });
      if (!response) {
        new Error('Fail to get project')
      }

      return await response.json();

    } catch (error: any) {
      return rejectWithValue(error.message);
    }
  }
);


export {fetchGetProject}