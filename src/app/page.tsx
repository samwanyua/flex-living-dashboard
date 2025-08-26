// src/app/page.tsx
import Link from 'next/link';

export default function Home() {
  return (
    <div style={{ display: 'flex', flexDirection: 'column', minHeight: '100vh' }}>

      {/* Centered Main Content */}
      <main style={{ flex: 1, display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center', textAlign: 'center', padding: 20 }}>
        <h1>Flex Living Dashboard</h1>
        <p style={{ fontSize: '18px', marginTop: '20px', color: '#555' }}>
          Track property performance, explore guest feedback, and uncover insights—all in one place.
        </p>
      </main>
    </div>
  );
}
