const { createClient } = require('@supabase/supabase-js');

const supabaseUrl = 'https://dfbyxityclgnivmbkupr.supabase.co';
const supabaseAnonKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImRmYnl4aXR5Y2xnbml2bWJrdXByIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MTczNTYyNjksImV4cCI6MjAzMjkzMjI2OX0.8OcevvyQHI6Cz9ZVLzQ-yLK6YoYy6zojNKhf-HqDY6k'; 
const supabase = createClient(supabaseUrl, supabaseAnonKey);

module.exports = supabase;