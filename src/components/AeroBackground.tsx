export default function AeroBackground() {
  return (
    <div className="fixed inset-0 -z-10 bg-aero">
      {/* Decorative light blobs — slow ambient movement */}
      <div
        className="absolute rounded-full pointer-events-none"
        style={{
          width: 400, height: 400,
          top: '-5%', right: '-8%',
          background: 'radial-gradient(circle, rgba(255,255,240,0.4) 0%, transparent 70%)',
          filter: 'blur(60px)',
        }}
      />
      <div
        className="absolute rounded-full pointer-events-none"
        style={{
          width: 300, height: 300,
          bottom: '10%', left: '-5%',
          background: 'radial-gradient(circle, rgba(0,200,230,0.2) 0%, transparent 70%)',
          filter: 'blur(80px)',
        }}
      />
      <div
        className="absolute rounded-full pointer-events-none"
        style={{
          width: 250, height: 250,
          top: '40%', right: '10%',
          background: 'radial-gradient(circle, rgba(255,255,255,0.25) 0%, transparent 70%)',
          filter: 'blur(70px)',
        }}
      />
      <div
        className="absolute rounded-full pointer-events-none"
        style={{
          width: 200, height: 200,
          top: '20%', left: '15%',
          background: 'radial-gradient(circle, rgba(180,230,255,0.2) 0%, transparent 70%)',
          filter: 'blur(90px)',
        }}
      />
    </div>
  )
}
