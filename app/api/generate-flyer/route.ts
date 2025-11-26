import { GoogleGenAI } from '@google/genai';
import { NextRequest, NextResponse } from 'next/server';

export async function POST(request: NextRequest) {
  try {
    // Parse the request body
    const body = await request.json();
    const { prompt, businessName, eventDetails } = body;

    // Validate input
    if (!prompt) {
      return NextResponse.json(
        { error: 'Prompt is required' },
        { status: 400 }
      );
    }

    // Check if API key is configured
    if (!process.env.GEMINI_API_KEY) {
      return NextResponse.json(
        { error: 'Gemini API key is not configured' },
        { status: 500 }
      );
    }

    // Initialize Gemini AI
    // API key is read from GEMINI_API_KEY environment variable automatically
    const ai = new GoogleGenAI({});

    // Use the prompt directly as it's already well-structured from the frontend
    // The frontend now sends detailed specifications including:
    // - Design style (modern pastel with geometric blocks, drop shadows, etc.)
    // - Content (main title, subtitle, feature list, date/time)
    // - Color scheme
    // - Aspect ratio (9:16 for Instagram Stories)
    const fullPrompt = prompt;

    // Generate image using Gemini
    const response = await ai.models.generateContent({
      model: 'gemini-2.5-flash-image',
      contents: fullPrompt,
    });

    // Extract image and text from response
    let imageData: string | null = null;
    let text = '';
    
    if (response.candidates && response.candidates[0]?.content?.parts) {
      for (const part of response.candidates[0].content.parts) {
        console.log('Part type:', Object.keys(part));
        if (part.text) {
          text += part.text;
        } else if (part.inlineData && part.inlineData.data) {
          // Extract base64 image data
          imageData = part.inlineData.data;
          console.log('Found image data! Length:', imageData.length);
        }
      }
    } else {
      throw new Error('No valid response from Gemini API');
    }
    
    // Return the generated flyer
    return NextResponse.json({
      success: true,
      data: {
        image: imageData,
        description: text || 'Flyer generated successfully',
        prompt: fullPrompt
      },
      message: 'Flyer image generated successfully'
    });

  } catch (error: any) {
    console.error('Error generating flyer:', error);
    
    return NextResponse.json(
      { 
        error: 'Failed to generate flyer content',
        details: error.message 
      },
      { status: 500 }
    );
  }
}

// Handle GET requests (optional - for testing)
export async function GET() {
  return NextResponse.json({
    message: 'Flyer Generator API',
    status: 'active',
    method: 'POST',
    endpoint: '/api/generate-flyer',
    description: 'Generates promotional flyer images using Google Gemini AI',
    requiredFields: ['prompt'],
    optionalFields: ['businessName', 'eventDetails'],
    promptFormat: {
      mainTitle: 'e.g., PICKLEBALL & PILATES',
      subtitle: 'e.g., REGGAETON VS AFROBEATS',
      featureList: 'e.g., LIVE DJ · MAT PILATES · MIMOSAS',
      dateTime: 'e.g., DEC 25, 6PM',
      colorScheme: 'e.g., Hot Pink & Navy',
      aspectRatio: '9:16 (Instagram Story - 1080x1920px)',
      designStyle: 'Modern pastel with bold layered text, drop shadows, geometric blocks'
    }
  });
}

