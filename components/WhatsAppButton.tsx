'use client';

export default function WhatsAppButton() {
  return (
    <>
      <style>{`
        .wa-float {
          position: fixed;
          bottom: 24px;
          right: 24px;
          z-index: 9999;
          display: flex;
          align-items: center;
          justify-content: center;
          width: 60px;
          height: 60px;
          border-radius: 50%;
          background-color: #25D366;
          box-shadow: 0 4px 20px rgba(37,211,102,0.5);
          transition: transform 0.2s, box-shadow 0.2s;
          text-decoration: none;
        }
        .wa-float:hover {
          transform: scale(1.1);
          box-shadow: 0 6px 28px rgba(37,211,102,0.7);
        }
        @keyframes wa-pulse {
          0% { box-shadow: 0 0 0 0 rgba(37,211,102,0.6); }
          70% { box-shadow: 0 0 0 14px rgba(37,211,102,0); }
          100% { box-shadow: 0 0 0 0 rgba(37,211,102,0); }
        }
        .wa-float {
          animation: wa-pulse 2.5s infinite;
        }
        .wa-float:hover {
          animation: none;
        }
      `}</style>
      <a
        href="https://wa.me/917011254904?text=Hi%20JuniorSpark!%20I%20want%20to%20know%20more%20about%20the%20English%20classes%20for%20my%20child."
        target="_blank"
        rel="noopener noreferrer"
        aria-label="Chat on WhatsApp"
        className="wa-float"
      >
        <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 32 32" fill="white">
          <path d="M16 2C8.268 2 2 8.268 2 16c0 2.415.638 4.765 1.847 6.828L2 30l7.374-1.818A13.94 13.94 0 0 0 16 30c7.732 0 14-6.268 14-14S23.732 2 16 2zm0 25.5a11.44 11.44 0 0 1-5.82-1.587l-.418-.248-4.373 1.078 1.115-4.263-.272-.437A11.47 11.47 0 0 1 4.5 16C4.5 9.649 9.649 4.5 16 4.5S27.5 9.649 27.5 16 22.351 27.5 16 27.5zm6.29-8.61c-.345-.172-2.04-1.005-2.356-1.12-.316-.114-.546-.172-.776.173-.23.345-.89 1.12-1.09 1.35-.2.23-.4.258-.745.086-.345-.172-1.456-.537-2.773-1.71-1.025-.914-1.717-2.043-1.918-2.388-.2-.345-.021-.532.15-.703.155-.155.345-.403.518-.604.172-.2.23-.345.345-.575.114-.23.057-.432-.029-.604-.086-.172-.776-1.87-1.063-2.562-.28-.673-.564-.582-.776-.593l-.66-.011c-.23 0-.604.086-.92.432-.316.345-1.205 1.178-1.205 2.873s1.234 3.332 1.406 3.562c.172.23 2.428 3.706 5.882 5.197.823.355 1.465.567 1.966.726.826.263 1.578.226 2.172.137.662-.099 2.04-.834 2.328-1.639.287-.805.287-1.495.2-1.64-.086-.143-.316-.23-.661-.402z"/>
        </svg>
      </a>
    </>
  );
}
