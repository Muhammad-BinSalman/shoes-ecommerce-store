import { ImageResponse } from 'next/og';

export default async function OpengraphImage({ title = process.env.SITE_NAME }: { title?: string } = {}) {
  // Skip opengraph image generation during build to avoid Next.js 15 canary issues
  if (process.env.NODE_ENV === 'production' && process.env.NEXT_PHASE === 'phase-production-build') {
    return new Response('OpenGraph image skipped during build', { status: 200 });
  }

  try {
    return new ImageResponse(
      <div
        style={{
          height: '100%',
          width: '100%',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          backgroundColor: 'black',
        }}
      >
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            border: '2px solid #404040',
            borderRadius: '24px',
            width: '160px',
            height: '160px'
          }}
        >
          <svg width="64" height="58" viewBox="0 0 32 32">
            <path d="M16 2 L30 8 L30 24 L16 30 L2 24 L2 8 L16 2 Z" fill="white" />
          </svg>
        </div>
        <p
          style={{
            marginTop: '48px',
            fontSize: '48px',
            fontWeight: 'bold',
            color: 'white'
          }}
        >
          {title}
        </p>
      </div>,
      {
        width: 1200,
        height: 630
      }
    );
  } catch (error) {
    // Fallback for build issues with @vercel/og in Next.js 15
    console.warn('OpenGraph image generation failed:', error);
    return new Response('OpenGraph image generation failed', { status: 500 });
  }
}
