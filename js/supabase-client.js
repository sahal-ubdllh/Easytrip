// ======================================================================
// GANTI dua nilai di bawah ini dengan URL dan anon key project Supabase-mu.
// Ambil dari: Supabase Dashboard -> Project Settings -> API
// ======================================================================
const SUPABASE_URL = "https://wmvscehyxavwfkfjnyab.supabase.co";
const SUPABASE_ANON_KEY = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6IndtdnNjZWh5eGF2d2ZrZmpueWFiIiwicm9sZSI6ImFub24iLCJpYXQiOjE3ODkzMDUzMzMsImV4cCI6MjEwNDg4MTMzM30.4G9V-k8-6AiU2w2Sc5UpD8vEjrdDyweZRgI1WR0JVgU";

const supabaseClient = window.supabase.createClient(SUPABASE_URL, SUPABASE_ANON_KEY);
