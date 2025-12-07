import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { simulateBotApi } from "../../utils/botAPI";

export const fetchbots = createAsyncThunk(
  "bots/fetchbots",
  async (_, { getState }) => {
    const { bots } = getState().bots;
    const updated = await simulateBotApi(bots);
    return updated;
  }
);

const botsSlice = createSlice({
  name: "bots",
  initialState: {
    bots: [],
    loading: false,
  },
  reducers: {
    updateBots: (state, action) => {
      state.bots = action.payload;
    },

    assignTaskToBot: (state, action) => {
      const { botId, taskId, taskDuration = 8000 } = action.payload;

      const bot = state.bots.find((b) => b.id === botId || b.status === "idle");
      if (!bot) return;

      bot.status = "busy";
      bot.currentTask = `Task ${taskId}`;
      bot.lastUpdated = new Date().toISOString();
      console.log(`🟢 Bot ${bot.id} assigned Task ${taskId}`);
    },
    // Schedule bot to become idle after taskDuration
    completeTaskForBot: (state, action) => {
      const { botId } = action.payload;
      const bot = state.bots.find((b) => b.id === botId);
      if (!bot) return;
      bot.status = "idle";
      bot.currentTask = "None";
      bot.lastUpdated = new Date().toISOString();
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchbots.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchbots.fulfilled, (state, action) => {
        state.loading = false;
        state.bots = action.payload;
      })
      .addCase(fetchbots.rejected, (state) => {
        state.loading = false;
      });
  },
});
export const { updateBot, assignTaskToBot,completeTaskForBot } = botsSlice.actions;
export default botsSlice.reducer;
