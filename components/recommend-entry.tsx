import Link from "next/link";

export default function RecommendEntry() {
  return (
    <>
      <section className="recommend-section">
        <Link href="/recommend">
          <a className="recommend-card">
            <div className="recommend-icon">🚀</div>
            <div className="recommend-content">
              <h3 className="recommend-title">加入我们 · 每日互动（个推）</h3>
              <p className="recommend-desc">
                寻找优秀的你，共同探索数据智能的无限可能。技术、产品、销售多岗位热招中！
              </p>
            </div>
            <div className="recommend-arrow">→</div>
          </a>
        </Link>
      </section>

      <style jsx>{`
        .recommend-section {
          margin: 2rem 0 4rem;
        }

        .recommend-card {
          display: flex;
          align-items: center;
          padding: 2rem;
          background: linear-gradient(135deg, #2c3e50 0%, #34495e 100%);
          border-radius: 16px;
          color: white !important;
          text-decoration: none;
          box-shadow: 0 10px 30px rgba(44, 62, 80, 0.2);
          transition: all 0.3s cubic-bezier(0.25, 0.8, 0.25, 1);
          border-bottom: none !important;
          position: relative;
          overflow: hidden;
        }

        .recommend-card:hover {
          transform: translateY(-4px) scale(1.02);
          box-shadow: 0 20px 40px rgba(44, 62, 80, 0.3);
        }

        .recommend-card::before {
          content: "";
          position: absolute;
          top: -50%;
          left: -50%;
          width: 200%;
          height: 200%;
          background: radial-gradient(
            circle,
            rgba(255, 255, 255, 0.1) 0%,
            transparent 60%
          );
          transform: rotate(30deg);
          pointer-events: none;
        }

        .recommend-icon {
          font-size: 3rem;
          margin-right: 1.5rem;
          filter: drop-shadow(0 2px 4px rgba(0, 0, 0, 0.2));
        }

        .recommend-content {
          flex: 1;
        }

        .recommend-title {
          margin: 0 0 0.5rem;
          font-family: var(--font-serif);
          font-size: 1.5rem;
          color: white !important;
        }

        .recommend-desc {
          margin: 0;
          font-size: 0.95rem;
          opacity: 0.9;
          line-height: 1.5;
        }

        .recommend-arrow {
          font-size: 1.5rem;
          margin-left: 1.5rem;
          opacity: 0.8;
          transition: transform 0.3s ease;
        }

        .recommend-card:hover .recommend-arrow {
          transform: translateX(6px);
          opacity: 1;
        }
      `}</style>
    </>
  );
}
