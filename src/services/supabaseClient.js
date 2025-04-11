import "react-native-url-polyfill/auto";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { createClient } from "@supabase/supabase-js";

// Initialize Supabase client
const supabaseUrl = "https://khfcrlqphlkzmdnkdjdp.supabase.co";
const supabaseAnonKey =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImtoZmNybHFwaGxrem1kbmtkamRwIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDQzNzU5MDAsImV4cCI6MjA1OTk1MTkwMH0.qXOqe95sYll_wi5xfQwoqwv_EqWa7rUN_TqYKrStRIc";

export const supabase = createClient(supabaseUrl, supabaseAnonKey, {
  auth: {
    storage: AsyncStorage,
    autoRefreshToken: true,
    persistSession: true,
    detectSessionInUrl: false,
  },
});
