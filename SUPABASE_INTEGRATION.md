# Supabase Integration - Setup Complete ✅

## Overview
All chat interactions and trial form submissions are now being logged to your Supabase database.

## Environment Variables
The following environment variables have been configured in your `.env` file:

```env
SUPABASE_URL='https://kbmwdgxybjmkbyomthjt.supabase.co'
SUPABASE_API_KEY='[your-anon-key]'
```

## Database Tables

### 1. `flyer_messages`
Logs all chat messages from the AI Flyer Generator.

**Columns:**
- `id` (UUID) - Primary key
- `message` (TEXT) - The user's message/prompt
- `user_name` (TEXT) - Optional studio/business name
- `created_at` (TIMESTAMPTZ) - Timestamp

**What gets logged:**
- Every message a user sends to generate a flyer
- The studio name (if provided in the form)

### 2. `free_trial_requests`
Logs all trial form submissions.

**Columns:**
- `id` (UUID) - Primary key
- `name` (TEXT) - User's name
- `studio_name` (TEXT) - Business/studio name
- `email` (TEXT) - User's email
- `instagram_handle` (TEXT) - Optional Instagram handle
- `created_at` (TIMESTAMPTZ) - Timestamp

**What gets logged:**
- Every trial form submission
- All form fields including name, email, studio name, and Instagram handle

## API Routes Created

### `/api/log-chat` (POST)
Logs flyer generator chat messages to `flyer_messages` table.

**Request Body:**
```json
{
  "message": "Create a flyer for our yoga class",
  "userName": "Zen Studio"
}
```

### `/api/log-trial-form` (POST)
Logs trial form submissions to `free_trial_requests` table.

**Request Body:**
```json
{
  "name": "John Doe",
  "studioName": "Zen Studio",
  "email": "john@example.com",
  "instagramHandle": "@zenstudio"
}
```

## How It Works

### Chat Logging
When a user:
1. Types a message in the AI Flyer Generator
2. Clicks "Send"
3. The message is sent to Gemini API
4. **Simultaneously**, the message is logged to Supabase `flyer_messages` table
5. If logging fails, it doesn't block the user experience

### Form Logging
When a user:
1. Fills out the trial form
2. Clicks "Start Free Trial"
3. The form data is sent to Supabase `free_trial_requests` table
4. A success/error message is shown to the user
5. The form is reset on successful submission

## Files Modified

1. **`lib/supabase.ts`** - Supabase client configuration
2. **`app/api/log-chat/route.ts`** - API route for logging chat messages
3. **`app/api/log-trial-form/route.ts`** - API route for logging form submissions
4. **`app/trial/page.tsx`** - Updated to call logging APIs

## Security

- **Row Level Security (RLS)** is enabled on both tables
- Public users can INSERT (anon role)
- Only authenticated users can READ data
- API calls use the anon key for inserts

## Viewing Your Data

You can view all logged data in your Supabase dashboard:

**Flyer Messages:**
```sql
SELECT * FROM flyer_messages ORDER BY created_at DESC;
```

**Trial Requests:**
```sql
SELECT * FROM free_trial_requests ORDER BY created_at DESC;
```

## Testing

1. Visit: http://localhost:3002/trial
2. Try the AI Flyer Generator - your message will be logged
3. Fill out the trial form - your submission will be logged
4. Check your Supabase dashboard to see the data

## Troubleshooting

If logging isn't working:

1. **Check environment variables:**
   ```bash
   echo $SUPABASE_URL
   echo $SUPABASE_API_KEY
   ```

2. **Check Supabase policies:**
   - Ensure anon users have INSERT permissions
   - Check RLS policies are enabled

3. **Check API routes:**
   - Visit: http://localhost:3002/api/log-chat (GET)
   - Should return 405 Method Not Allowed (expected)

4. **Check browser console:**
   - Open DevTools → Console
   - Look for any error messages when submitting

## Notes

- Logging happens in the background and doesn't block the UI
- If Supabase is down, the app continues to work
- All timestamps are in UTC
- The anon key is safe to use in client-side code for public operations

