import { NextRequest, NextResponse } from 'next/server';
import { supabase } from '@/lib/supabase';

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { 
      message,
      userName
    } = body;

    // Validate required fields
    if (!message) {
      return NextResponse.json(
        { error: 'Message is required' },
        { status: 400 }
      );
    }

    // Log to Supabase using the flyer_messages table
    const { data, error } = await supabase
      .from('flyer_messages')
      .insert([
        {
          message: message,
          user_name: userName || null,
        }
      ])
      .select();

    if (error) {
      console.error('Supabase error:', error);
      return NextResponse.json(
        { error: 'Failed to log message', details: error.message },
        { status: 500 }
      );
    }

    return NextResponse.json({
      success: true,
      data: data,
      message: 'Message logged successfully'
    });

  } catch (error: any) {
    console.error('Error logging message:', error);
    return NextResponse.json(
      { 
        error: 'Failed to log message',
        details: error.message 
      },
      { status: 500 }
    );
  }
}

