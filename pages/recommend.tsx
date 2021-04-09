import Head from "next/head";
import Layout from "../components/layout";
import utilStyles from "../styles/utils.module.css";

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
      {data.map((item) => {
        return (
          <div key={item.id} className="job">
            <div className="name">{item.name}</div>
            <div className="tags">
              {item.city} | {item.type}
            </div>
            <details className="content">
              <summary>岗位要求</summary>
              {item.content}
            </details>
          </div>
        );
      })}
      <style jsx>
        {`
          .job {
            padding: 8px 10px;
          }

          .name {
            font-size: 18px;
            font-weight: 700;
          }

          .tags {
            margin-top: 8px;
            font-size: 14px;
            color: #afb9c7;
          }

          .content {
            margin-top: 9px;
            color: #646a73;
            font-size: 14px;
            line-height: 28px;
            white-space: pre-wrap;
          }

          summary {
            outline: none;
          }
        `}
      </style>
    </Layout>
  );
}

export const getServerSideProps = async () => {
  const res = await fetch("https://job.getui.com/data/recruit/2020/job/list", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      pageNum: 1,
      pageSize: 999,
    }),
  });
  const data = await res.json();

  return {
    props: {
      data: data?.data?.list || [],
    },
  };
};
