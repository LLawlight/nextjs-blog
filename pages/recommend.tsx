import Head from "next/head";
import Layout from "../components/layout";
import utilStyles from "../styles/utils.module.css";
import { useState } from "react";

const JobGroup = ({ type, items }) => {
  const [isExpanded, setIsExpanded] = useState(false);

  const isTech = type.includes("技术");
  const frontendKeywords = /前端|web|js|react|vue|node/i;

  let visibleJobs = items;
  let hiddenJobs = [];

  if (isTech) {
    const frontendJobs = items.filter((item) =>
      frontendKeywords.test(item.name)
    );
    if (frontendJobs.length > 0) {
      visibleJobs = frontendJobs;
      hiddenJobs = items.filter((item) => !frontendKeywords.test(item.name));
    }
  }

  const renderJob = (item) => (
    <div key={item.id} className="job">
      <div className="name">{item.name}</div>
      <div className="tags">
        {item.city} | {item.type}
      </div>
      <details className="content">
        <summary>岗位要求</summary>
        {item.content}
      </details>
      <style jsx>{`
        .job {
          padding: 1.5rem;
          background: #fff;
          border-radius: 12px;
          box-shadow: 0 2px 8px rgba(0, 0, 0, 0.04);
          margin-bottom: 1.5rem;
          transition: all 0.3s ease;
          border: 1px solid #f0f0f0;
        }

        .job:hover {
          transform: translateY(-2px);
          box-shadow: 0 8px 16px rgba(0, 0, 0, 0.08);
          border-color: transparent;
        }

        .name {
          font-size: 1.1rem;
          font-weight: 700;
          color: #333;
        }

        .tags {
          margin: 0.5rem 0 1rem;
          font-size: 0.85rem;
          color: #888;
        }

        .content {
          margin-top: 0;
          color: #555;
          font-size: 0.9rem;
          line-height: 1.8;
          white-space: pre-wrap;
        }

        summary {
          outline: none;
          cursor: pointer;
          color: #c0392b;
          font-weight: 600;
          font-size: 0.9rem;
          padding: 0.5rem 0;
          user-select: none;
          list-style: none;
          display: flex;
          align-items: center;
          transition: opacity 0.2s;
        }

        summary:hover {
          opacity: 0.8;
        }

        summary::-webkit-details-marker {
          display: none;
        }

        summary::after {
          content: "";
          display: inline-block;
          width: 0;
          height: 0;
          border-left: 5px solid transparent;
          border-right: 5px solid transparent;
          border-top: 6px solid #c0392b;
          margin-left: 8px;
          transition: transform 0.2s ease;
        }

        details[open] summary::after {
          transform: rotate(180deg);
        }

        details[open] summary {
          margin-bottom: 1rem;
          border-bottom: 1px dashed #eee;
          padding-bottom: 0.5rem;
        }
      `}</style>
    </div>
  );

  return (
    <div className="group">
      <h3 className="group-title">{type}</h3>
      {visibleJobs.map(renderJob)}
      {hiddenJobs.length > 0 && (
        <>
          {isExpanded && hiddenJobs.map(renderJob)}
          <div
            className="more-toggle"
            onClick={() => setIsExpanded(!isExpanded)}
          >
            <span>
              {isExpanded
                ? "收起"
                : `查看更多${type}岗位 (${hiddenJobs.length})`}
            </span>
            <span className={`arrow ${isExpanded ? "up" : "down"}`}></span>
          </div>
        </>
      )}
      <style jsx>{`
        .group {
          margin-bottom: 3rem;
        }

        .group-title {
          font-size: 1.5rem;
          color: #2c3e50;
          margin-bottom: 1.5rem;
          padding-bottom: 0.5rem;
          border-bottom: 2px solid #eaeaea;
          display: inline-block;
        }

        .more-toggle {
          cursor: pointer;
          text-align: center;
          padding: 0.75rem;
          background: #f8f9fa;
          color: #5d6d7e;
          border-radius: 8px;
          margin-top: 1rem;
          transition: all 0.2s;
          font-size: 0.9rem;
          display: flex;
          align-items: center;
          justify-content: center;
        }

        .more-toggle:hover {
          background: #eaf2f8;
          color: #2c3e50;
        }

        .arrow {
          display: inline-block;
          margin-left: 0.5rem;
          width: 0;
          height: 0;
          border-left: 5px solid transparent;
          border-right: 5px solid transparent;
          border-top: 6px solid currentColor;
          transition: transform 0.3s;
        }

        .arrow.up {
          transform: rotate(180deg);
        }
      `}</style>
    </div>
  );
};

export default function Recommend({ data }) {
  return (
    <Layout>
      <Head>
        <title>内推</title>
      </Head>
      <h2 className={utilStyles.headingMd}>每日互动（个推）</h2>
      <p>
        投递邮箱：<a href="mailto:me@zhaoyuxiang.cn">me@zhaoyuxiang.cn</a>
      </p>
      {Object.entries(
        data.reduce((acc, item) => {
          const type = item.type || "其他";
          if (!acc[type]) acc[type] = [];
          acc[type].push(item);
          return acc;
        }, {} as Record<string, typeof data>)
      )
        .sort(([typeA], [typeB]) => {
          const getPriority = (type: string) => {
            if (type.includes("技术")) return 1;
            if (type.includes("产品")) return 2;
            if (type.includes("设计")) return 3;
            if (type.includes("运营")) return 4;
            if (type.includes("销售")) return 99;
            return 50;
          };
          return getPriority(typeA) - getPriority(typeB);
        })
        .map(([type, items]) => (
          <JobGroup key={type} type={type} items={items} />
        ))}
    </Layout>
  );
}

export const getServerSideProps = async () => {
  const res = await fetch(
    "https://job.getui.com/data/recruit/social/2021/job/list",
    {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        pageNum: 1,
        pageSize: 999,
      }),
    }
  );
  const data = await res.json();

  return {
    props: {
      data: data?.data?.list || [],
    },
  };
};
