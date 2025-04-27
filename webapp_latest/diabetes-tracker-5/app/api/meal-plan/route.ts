import { NextResponse } from 'next/server';

export async function POST(request: Request) {
  try {
    const { glucose_reading, plan_type } = await request.json();

    // Replace with your actual API endpoint and logic
    const response = await fetch('http://localhost:5000/generate_meal_plan', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ glucose_reading, plan_type }),
    });

    if (!response.ok) {
      throw new Error(`Failed to fetch meal plan: $${response.status} $${response.statusText}`);
    }

    const data = await response.json();
    return NextResponse.json(data);
  } catch (error: any) {
    console.error('Error fetching meal plan:', error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}