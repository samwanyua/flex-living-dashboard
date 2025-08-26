// src/app/components/Navbar.tsx
import Link from 'next/link';
import HomeIcon from '@mui/icons-material/Home';

export default function Navbar() {
  return (
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
        <Link href="/properties/" style={{ textDecoration: 'none', fontWeight: 'bold', color: '#333' }}>
          Reviews
        </Link>
      </div>
    </nav>
  );
}
