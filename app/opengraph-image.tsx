import { ImageResponse } from 'next/og';

export const runtime = 'edge';
export const alt = 'JuniorSpark — Online English Classes for Kids';
export const size = { width: 1200, height: 630 };
export const contentType = 'image/png';

export default async function Image() {
  return new ImageResponse(
    (
      <div
        style={{
          width: '1200px',
          height: '630px',
          display: 'flex',
          flexDirection: 'column',
          background: 'linear-gradient(135deg, #1a4fa8 0%, #2b7cee 50%, #1e6cd4 100%)',
          position: 'relative',
          overflow: 'hidden',
          fontFamily: 'sans-serif',
        }}
      >
        {/* Background decorative circles */}
        <div style={{
          position: 'absolute', top: '-80px', right: '-80px',
          width: '400px', height: '400px', borderRadius: '50%',
          background: 'rgba(255,255,255,0.06)', display: 'flex',
        }} />
        <div style={{
          position: 'absolute', bottom: '-120px', left: '-60px',
          width: '500px', height: '500px', borderRadius: '50%',
          background: 'rgba(255,255,255,0.04)', display: 'flex',
        }} />
        <div style={{
          position: 'absolute', top: '200px', right: '200px',
          width: '200px', height: '200px', borderRadius: '50%',
          background: 'rgba(255,184,0,0.12)', display: 'flex',
        }} />

        {/* Main content */}
        <div style={{
          display: 'flex', flexDirection: 'column',
          justifyContent: 'center', height: '100%',
          padding: '60px 80px', position: 'relative', zIndex: 1,
        }}>
          {/* Badge */}
          <div style={{
            display: 'flex', alignItems: 'center', marginBottom: '28px',
          }}>
            <div style={{
              background: '#ffb800', color: '#1a1a1a',
              padding: '8px 20px', borderRadius: '100px',
              fontSize: '18px', fontWeight: 700, letterSpacing: '0.05em',
              textTransform: 'uppercase', display: 'flex',
            }}>
              ✨ 100% Free Demo Class
            </div>
          </div>

          {/* Brand name */}
          <div style={{
            fontSize: '72px', fontWeight: 900, color: 'white',
            lineHeight: 1.05, marginBottom: '20px', display: 'flex',
          }}>
            Junior<span style={{ color: '#ffb800' }}>Spark</span>
          </div>

          {/* Tagline */}
          <div style={{
            fontSize: '32px', color: 'rgba(255,255,255,0.88)',
            fontWeight: 500, marginBottom: '44px',
            maxWidth: '680px', lineHeight: 1.35, display: 'flex',
          }}>
            Live Online English Classes for Kids Aged 5–15
          </div>

          {/* Stats row */}
          <div style={{ display: 'flex', gap: '40px' }}>
            {[
              { value: '4,000+', label: 'Happy Parents' },
              { value: '100+',   label: 'Cities' },
              { value: '1:4',    label: 'Batch Ratio' },
              { value: '4.9★',   label: 'Rating' },
            ].map((stat) => (
              <div key={stat.label} style={{
                display: 'flex', flexDirection: 'column',
                alignItems: 'flex-start',
              }}>
                <div style={{
                  fontSize: '36px', fontWeight: 800, color: '#ffb800',
                  lineHeight: 1, display: 'flex',
                }}>
                  {stat.value}
                </div>
                <div style={{
                  fontSize: '16px', color: 'rgba(255,255,255,0.7)',
                  marginTop: '4px', fontWeight: 500, display: 'flex',
                }}>
                  {stat.label}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Right side card */}
        <div style={{
          position: 'absolute', right: '70px', top: '50%',
          transform: 'translateY(-50%)',
          background: 'white', borderRadius: '24px',
          padding: '36px 40px', width: '300px',
          boxShadow: '0 20px 60px rgba(0,0,0,0.25)',
          display: 'flex', flexDirection: 'column', alignItems: 'center',
          gap: '16px',
        }}>
          <div style={{
            fontSize: '20px', fontWeight: 700, color: '#1e293b',
            textAlign: 'center', display: 'flex',
          }}>
            Book Your Free Demo
          </div>
          {[
            '✅ No credit card needed',
            '✅ Expert certified teachers',
            '✅ Small batches (max 5 kids)',
            '✅ 100% Refund guarantee',
          ].map((item) => (
            <div key={item} style={{
              fontSize: '15px', color: '#475569',
              fontWeight: 500, width: '100%', display: 'flex',
            }}>
              {item}
            </div>
          ))}
          <div style={{
            background: '#2b7cee', color: 'white',
            padding: '14px 28px', borderRadius: '12px',
            fontSize: '17px', fontWeight: 700, marginTop: '8px',
            width: '100%', textAlign: 'center', display: 'flex',
            justifyContent: 'center',
          }}>
            juniorsparkweb.vercel.app
          </div>
        </div>

        {/* Bottom strip */}
        <div style={{
          position: 'absolute', bottom: 0, left: 0, right: 0,
          height: '6px',
          background: 'linear-gradient(90deg, #ffb800 0%, #f97316 50%, #ffb800 100%)',
          display: 'flex',
        }} />
      </div>
    ),
    { ...size }
  );
}
