import { NextResponse } from 'next/server';

export async function POST(request: Request) {
  try {
    const { meal_plan, glucose_reading } = await request.json();

    // Replace with your actual API endpoint and logic
    const response = await fetch('http://localhost:5000/glucose_impact_analysis', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ meal_plan, glucose_reading }),
    });

    if (!response.ok) {
      throw new Error(`Failed to fetch glucose analysis: $${response.status} $${response.statusText}`);
    }

    const data = await response.json();
    return NextResponse.json(data);
  } catch (error: any) {
    console.error('Error fetching glucose analysis:', error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}