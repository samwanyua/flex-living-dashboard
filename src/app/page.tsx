// src/app/page.tsx
import Link from 'next/link';
import HomeIcon from '@mui/icons-material/Home';

export default function Home() {
  return (
    <div style={{ display: 'flex', flexDirection: 'column', minHeight: '100vh' }}>
      {/* Navbar */}
      <nav 
        style={{ 
          display: 'flex', 
          justifyContent: 'space-between', 
          alignItems: 'center',
          padding: '0 20px', 
          height: '60px',
          backgroundColor: '#f5f5f5', 
          boxShadow: '0 2px 4px rgba(0,0,0,0.1)' 
        }}
      >
        {/* Home icon on the left */}
        <Link href="/" style={{ display: 'flex', alignItems: 'center', color: '#333' }}>
          <HomeIcon fontSize="large" />
        </Link>

        {/* Links on the right */}
        <div style={{ display: 'flex', gap: '20px' }}>
          <Link href="/dashboard" style={{ textDecoration: 'none', fontWeight: 'bold', color: '#333' }}>
            Dashboard
          </Link>
          <Link href="/property/1" style={{ textDecoration: 'none', fontWeight: 'bold', color: '#333' }}>
            Sample Property
          </Link>
        </div>
      </nav>

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
