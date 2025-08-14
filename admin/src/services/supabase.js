import { createClient } from "@supabase/supabase-js";
export const supabaseUrl = "https://wmdmtidukzbufqfallwu.supabase.co";
const supabaseKey =
    "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6IndtZG10aWR1a3pidWZxZmFsbHd1Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3MjY0NzY4NzksImV4cCI6MjA0MjA1Mjg3OX0.FuXOBup3C-h8SvbzZmmh68w-6hFUF6vgWwtBrp5UF7I";
const supabase = createClient(supabaseUrl, supabaseKey);

export default supabase;
