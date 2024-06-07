import { createClient } from "@supabase/supabase-js";

const supabaseUrl = "https://epfohmcrglauvkdyscph.supabase.co";
const supabaseKey =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImVwZm9obWNyZ2xhdXZrZHlzY3BoIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MTY5OTcyMzMsImV4cCI6MjAzMjU3MzIzM30.T0BErTRR8xQAt3MOkDfLrfbsqMPW7KWcLqPM6_hR0K8";
const supabase = createClient(supabaseUrl, supabaseKey);

export default supabase;
