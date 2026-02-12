import Head from "next/head";
import Layout, { siteTitle } from "../components/layout";
import utilStyles from "../styles/utils.module.css";
import { getSortedPostsData } from "../lib/posts";
import Link from "next/link";
import Date from "../components/date";
import { GetStaticProps } from "next";
import { getSortedPPTData } from "../lib/ppt";
import OpenScreen from "../components/open-screen";
import RecommendEntry from "../components/recommend-entry";

export default function Home({
  allPostsData,
  allPPTData,
}: {
  allPostsData: {
    date: string;
    title: string;
    id: string;
  }[];
  allPPTData: any;
}) {
  return (
    <Layout home>
      <Head>
        <title>{siteTitle}</title>
      </Head>
      <OpenScreen />

      {/* 醒目的内推入口 */}
      <RecommendEntry />

      <section className={`${utilStyles.headingMd} ${utilStyles.padding1px}`}>
        <h2 className={`${utilStyles.headingLg} blog-heading`}>Blog</h2>
        <ul className={utilStyles.list}>
          {allPostsData.map(({ id, date, title }) => (
            <li className={utilStyles.listItem} key={id}>
              <Link href={`/posts/${id}`}>
                <a className="blog-card">
                  <span className="blog-title">{title}</span>
                  <small className={utilStyles.lightText}>
                    <Date dateString={date} />
                  </small>
                </a>
              </Link>
            </li>
          ))}
        </ul>
      </section>

      <style jsx>{`
        /* Blog Card Styles */
        .blog-card {
          display: block;
          padding: 1.5rem;
          background: #fff;
          border-radius: 12px;
          border: 1px solid #f0f0f0;
          transition: all 0.3s ease;
          text-decoration: none !important;
          border-bottom: none !important;
          height: 100%;
        }

        .blog-card:hover {
          transform: translateY(-2px);
          box-shadow: 0 8px 20px rgba(0, 0, 0, 0.06);
          border-color: transparent;
        }

        .blog-title {
          display: block;
          font-family: var(--font-serif);
          font-size: 1.25rem;
          font-weight: 700;
          color: #2c3e50;
          margin-bottom: 0.5rem;
          line-height: 1.4;
          transition: color 0.2s;
        }

        .blog-card:hover .blog-title {
          color: #c0392b;
        }

        .blog-heading {
          margin-bottom: 2rem !important;
        }
      `}</style>

      {/* <section className={`${utilStyles.headingMd} ${utilStyles.padding1px}`}>
        <h2 className={utilStyles.headingLg}>PPT</h2>
        <ul className={utilStyles.list}>
          {allPPTData.map(({ id, date, title }) => (
            <li className={utilStyles.listItem} key={id}>
              <Link href={`/ppt/${id}`}>
                <a>{title}</a>
              </Link>
              <br />
              <small className={utilStyles.lightText}>
                <Date dateString={date} />
              </small>
            </li>
          ))}
        </ul>
      </section> */}
    </Layout>
  );
}

export const getStaticProps: GetStaticProps = async () => {
  const allPostsData = getSortedPostsData();
  const allPPTData = getSortedPPTData();
  return {
    props: {
      allPostsData,
      allPPTData,
    },
  };
};
