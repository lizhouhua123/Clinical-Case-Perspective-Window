interface BackgroundLayerProps {
  show: boolean;
}

export default function BackgroundLayer({ show }: BackgroundLayerProps) {
  return (
    <div
      className={`absolute inset-0 z-0 transition-opacity duration-[2000ms] ${
        show ? 'opacity-100' : 'opacity-0'
      }`}
    >
      <img
        src="https://trae-api-cn.mchost.guru/api/ide/v1/text_to_image?prompt=dimly%20lit%20hospital%20corridor%20at%20night%2C%20long%20perspective%2C%20dark%20gloomy%20atmosphere%2C%20fluorescent%20lights%2C%20muted%20colors%2C%20slightly%20blurred%2C%20cinematic%20mood&image_size=landscape_16_9"
        alt="hospital corridor"
        className="absolute inset-0 w-full h-full object-cover blur-[2px] scale-105"
        loading="eager"
      />

      <div className="absolute inset-0 bg-gradient-to-b from-wall-bg/80 via-wall-dark/70 to-wall-bg/90" />

      <div className="absolute inset-0 bg-gradient-to-r from-wall-bg/60 via-transparent to-wall-bg/60" />

      <div
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 animate-breath pointer-events-none"
        style={{
          width: '600px',
          height: '600px',
          background:
            'radial-gradient(circle, rgba(212,114,74,0.08) 0%, transparent 60%)',
          filter: 'blur(40px)',
        }}
      />

      <div className="vignette" />

      <div className="noise-overlay" />
    </div>
  );
}
