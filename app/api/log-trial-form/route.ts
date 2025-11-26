import { NextRequest, NextResponse } from 'next/server';
import { getSupabase } from '@/lib/supabase';

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const {
      name,
      studioName,
      email,
      instagramHandle
    } = body;

    // Validate required fields
    if (!name || !email) {
      return NextResponse.json(
        { error: 'Name and email are required' },
        { status: 400 }
      );
    }

    // Log to Supabase using the free_trial_requests table
    const { data, error } = await getSupabase()
      .from('free_trial_requests')
      .insert([
        {
          name,
          studio_name: studioName || null,
          email,
          instagram_handle: instagramHandle || null,
        }
      ])
      .select();

    if (error) {
      console.error('Supabase error:', error);
      return NextResponse.json(
        { error: 'Failed to log form submission', details: error.message },
        { status: 500 }
      );
    }

    return NextResponse.json({
      success: true,
      data: data,
      message: 'Form submission logged successfully'
    });

  } catch (error: any) {
    console.error('Error logging form submission:', error);
    return NextResponse.json(
      { 
        error: 'Failed to log form submission',
        details: error.message 
      },
      { status: 500 }
    );
  }
}

