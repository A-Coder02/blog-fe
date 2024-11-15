import { createClient } from "@supabase/supabase-js";

const supabaseUrl = "https://bfrxlqlmbitmhbzdhrlg.supabase.co";
const supabaseKey =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImJmcnhscWxtYml0bWhiemRocmxnIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MzE2NzkxODYsImV4cCI6MjA0NzI1NTE4Nn0.e1-BvIbDVxMYMwBO68pa1qbBmuHregr8e7PW_CmGInA";

export const supabase = createClient(supabaseUrl, supabaseKey);
