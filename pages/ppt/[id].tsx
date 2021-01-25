import Layout from "../../components/layout";
import Head from "next/head";
import utilStyles from "../../styles/utils.module.css";
import Date from "../../components/date";
import { getAllPPTIds, getPPTData } from "../../lib/ppt";
import { GetStaticProps, GetStaticPaths } from "next";

export default function PPT({
  pptData,
}: {
  pptData: {
    title: string;
    date: string;
  };
}) {
  return (
    <Layout>
      <Head>
        <title>{pptData.title}</title>
        <link
          rel="stylesheet"
          href="https://cdn.jsdelivr.net/gh/highlightjs/cdn-release@10.5.0/build/styles/github.min.css"
        ></link>
      </Head>
      <article>
        <h1 className={utilStyles.headingXl}>{pptData.title}</h1>
        <div className={utilStyles.lightText}>
          <Date dateString={pptData.date} />
        </div>
        <iframe
          src={`https://view.officeapps.live.com/op/embed.aspx?src=${encodeURIComponent(
            `https://zhaoyuxiang.cn/ppt/${pptData.title}.pptx`
          )}&amp;wdAr=1.7777777777777777`}
          width="100%"
          height="367px"
          frameBorder="0"
          style={{ marginTop: "1em" }}
        ></iframe>
      </article>
    </Layout>
  );
}

export const getStaticPaths: GetStaticPaths = async () => {
  const paths = getAllPPTIds();
  return {
    paths,
    fallback: false,
  };
};

export const getStaticProps: GetStaticProps = async ({ params }) => {
  const pptData = await getPPTData(params.id as string);
  return {
    props: {
      pptData,
    },
  };
};
