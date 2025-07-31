// Supabase connection
const SUPABASE_URL = 'https://wtsrujqzdqgrvfqbhbis.supabase.co';
const SUPABASE_ANON_KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Ind0c3J1anF6ZHFncnZmcWJoYmlzIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTM5MTQ2MDksImV4cCI6MjA2OTQ5MDYwOX0.IO7HCUhS8a6kLmMeydPawsfMZOjldoI5T6Uy-dVuw6U';

// Simple Supabase client
async function request(path, options = {}) {
  const res = await fetch(`${SUPABASE_URL}/rest/v1/${path}`, {
    headers: {
      'apikey': SUPABASE_ANON_KEY,
      'Content-Type': 'application/json'
    },
    ...options
  });
  return await res.json();
}

// Login
async function login(email, password) {
  const data = { email, password };
  const res = await fetch(`${SUPABASE_URL}/auth/v1/token?grant_type=password`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(data)
  });

  if (res.ok) {
    alert('Login successful!');
    window.location.href = 'dashboard.html';
  } else {
    const err = await res.json();
    document.getElementById('error').textContent = err.message;
  }
}

// Save booking
async function saveBooking(data) {
  const res = await request('appointments', {
    method: 'POST',
    body: JSON.stringify({ ...data, status: 'scheduled' })
  });

  if (res.error) {
    alert('Error: ' + res.error.message);
  } else {
    document.getElementById('result').innerHTML = '<p>✅ Booking saved!</p>';
    document.getElementById('bookingForm').reset();
  }
}
