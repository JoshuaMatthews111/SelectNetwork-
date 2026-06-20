"use client";

import Image from "next/image";

export default function SNBrandVideo() {
  return (
    <section className="sn-front-video-band" aria-label="The Select Network Member Group brand video">
      <div className="sn-front-video-shell">
        <div className="sn-front-video-mark">
          <Image
            src="/assets/select-network/select-network-logo.png"
            alt="The Select Network Member Group"
            width={460}
            height={224}
            priority
          />
          <div className="sn-front-video-line">Trust · Privacy · Excellence</div>
        </div>

        <div className="sn-front-video-frame">
          <video
            className="sn-front-video"
            autoPlay
            loop
            muted
            playsInline
            preload="metadata"
            poster="/assets/select-network/hero-video-poster.jpg"
            aria-label="The Select Network Member Group motion logo"
          >
            <source src="/assets/select-network/hero-video.mp4" type="video/mp4" />
          </video>
        </div>
      </div>

      <style jsx>{`
        .sn-front-video-band {
          background: linear-gradient(180deg, #fff 0%, #fffdf8 62%, #fbf8f1 100%);
          border-bottom: 1px solid #ece6da;
          overflow: hidden;
        }
        .sn-front-video-shell {
          max-width: 1180px;
          margin: 0 auto;
          padding: 24px 40px 26px;
          display: grid;
          grid-template-columns: minmax(260px, 0.78fr) minmax(360px, 1.22fr);
          gap: 28px;
          align-items: center;
        }
        .sn-front-video-mark {
          display: flex;
          flex-direction: column;
          align-items: flex-start;
          gap: 8px;
          min-width: 0;
        }
        .sn-front-video-mark :global(img) {
          width: min(360px, 100%);
          height: auto;
          display: block;
        }
        .sn-front-video-line {
          color: #a07c1e;
          font-size: 11px;
          font-weight: 800;
          letter-spacing: 0.16em;
          text-transform: uppercase;
        }
        .sn-front-video-frame {
          position: relative;
          width: 100%;
          aspect-ratio: 16 / 9;
          border-radius: 12px;
          overflow: hidden;
          border: 1px solid rgba(189, 142, 40, 0.35);
          background: #fff;
          box-shadow: 0 16px 38px rgba(5, 20, 45, 0.12);
        }
        .sn-front-video {
          position: absolute;
          inset: 0;
          width: 100%;
          height: 100%;
          object-fit: cover;
          display: block;
        }
        @media (max-width: 820px) {
          .sn-front-video-shell {
            grid-template-columns: 1fr;
            padding: 18px 20px 22px;
            gap: 18px;
          }
          .sn-front-video-mark {
            align-items: center;
            text-align: center;
          }
          .sn-front-video-mark :global(img) {
            width: min(300px, 86vw);
          }
          .sn-front-video-frame {
            border-radius: 10px;
            box-shadow: 0 10px 26px rgba(5, 20, 45, 0.1);
          }
        }
      `}</style>
    </section>
  );
}
