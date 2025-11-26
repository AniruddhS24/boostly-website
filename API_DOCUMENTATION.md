# Flyer Generator API Documentation

## Endpoint

`POST /api/generate-flyer`

## Description

This endpoint uses Google's Gemini AI (`gemini-2.0-flash-exp` model) to generate professional flyer content for local businesses, specifically optimized for fitness, sports, and wellness businesses.

## Setup

1. **Get your Gemini API Key:**
   - Visit: https://aistudio.google.com/app/apikey
   - Sign in with your Google account
   - Create a new API key

2. **Configure the API Key:**
   - Copy the `.env.example` file to `.env`
   - Add your Gemini API key:
     ```
     GEMINI_API_KEY=your_actual_api_key_here
     ```

3. **Install dependencies:**
   ```bash
   npm install
   ```

4. **Restart your development server:**
   ```bash
   npm run dev
   ```

## Request

### Headers
```
Content-Type: application/json
```

### Body Parameters

| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| `prompt` | string | Yes | The user's request for the flyer (e.g., "Create a flyer for a yoga class") |
| `businessName` | string | No | Name of the business |
| `eventDetails` | string | No | Additional details about the event or promotion |

### Example Request

```javascript
const response = await fetch('/api/generate-flyer', {
  method: 'POST',
  headers: {
    'Content-Type': 'application/json',
  },
  body: JSON.stringify({
    prompt: 'Create a flyer for our new morning yoga class starting next Monday',
    businessName: 'Zen Fitness Studio',
    eventDetails: 'Mondays and Wednesdays at 6:30 AM, beginner-friendly'
  })
});

const data = await response.json();
console.log(data);
```

## Response

### Success Response (200)

```json
{
  "success": true,
  "message": "Flyer content generated successfully",
  "data": {
    "headline": "Rise & Shine with Morning Yoga",
    "subheadline": "Start your day energized with our beginner-friendly yoga classes",
    "bulletPoints": [
      "Mondays & Wednesdays at 6:30 AM",
      "Perfect for beginners",
      "Professional instructors",
      "Calm, welcoming environment",
      "First class free!"
    ],
    "callToAction": "Book Your Spot Today!",
    "additionalDetails": "Classes start next Monday. Limited spots available."
  }
}
```

### Error Responses

#### 400 - Bad Request
```json
{
  "error": "Prompt is required"
}
```

#### 500 - Server Error
```json
{
  "error": "Gemini API key is not configured"
}
```

or

```json
{
  "error": "Failed to generate flyer content",
  "details": "Error message details"
}
```

## Testing the API

### Using cURL

```bash
curl -X POST http://localhost:3001/api/generate-flyer \
  -H "Content-Type: application/json" \
  -d '{
    "prompt": "Create a flyer for a summer bootcamp",
    "businessName": "FitLife Gym",
    "eventDetails": "6-week program starting July 1st"
  }'
```

### Using the Browser Console

```javascript
fetch('/api/generate-flyer', {
  method: 'POST',
  headers: { 'Content-Type': 'application/json' },
  body: JSON.stringify({
    prompt: 'Create a promotional flyer for our new CrossFit class',
    businessName: 'Iron Will Fitness'
  })
})
.then(res => res.json())
.then(data => console.log(data));
```

## Rate Limits

- Google Gemini free tier: 60 requests per minute
- Consider implementing rate limiting for production use

## Notes

- The API uses the `gemini-pro` model
- Responses are optimized for fitness/sports/wellness businesses
- The AI attempts to return structured JSON, but will fall back to raw text if parsing fails
- Always validate and sanitize the generated content before displaying to users

## Integration Example

See the trial page (`/app/trial/page.tsx`) for an example of how to integrate this API with your frontend chat interface.

