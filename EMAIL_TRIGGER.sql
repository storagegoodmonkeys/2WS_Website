-- Enable the pg_net extension (for HTTP requests from database)
CREATE EXTENSION IF NOT EXISTS pg_net;

-- Create the trigger function to send email notification
CREATE OR REPLACE FUNCTION notify_new_contact()
RETURNS TRIGGER AS $$
BEGIN
  PERFORM
    net.http_post(
      url := 'https://kjhhwrvduqxprweqxhbo.supabase.co/functions/v1/send-contact-email',
      headers := '{"Content-Type": "application/json", "Authorization": "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImtqaGh3cnZkdXF4cHJ3ZXF4aGJvIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NjQ2OTAwNjIsImV4cCI6MjA4MDI2NjA2Mn0.GFAmIDb1E_2UnFczUsHv4mTwGCT057CNlSLatsP2g2w"}'::jsonb,
      body := jsonb_build_object('record', row_to_json(NEW))
    );
  RETURN NEW;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Drop existing trigger if exists
DROP TRIGGER IF EXISTS on_new_contact ON public.waitlist;

-- Create the trigger
CREATE TRIGGER on_new_contact
  AFTER INSERT ON public.waitlist
  FOR EACH ROW
  EXECUTE FUNCTION notify_new_contact();

