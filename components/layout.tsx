import Head from "next/head";
import styles from "./layout.module.css";
import utilStyles from "../styles/utils.module.css";
import Link from "next/link";
import Image from "next/image";

const name = "天道总司";
export const siteTitle = "华米兹之家";

export default function Layout({
  children,
  home,
}: {
  children: React.ReactNode;
  home?: boolean;
}) {
  return (
    <div className={styles.container}>
      <Head>
        <link rel="icon" href="/favicon.ico" />
        <meta name="description" content="赵宇翔的个人网站" />
        <meta name="og:title" content={siteTitle} />
        <meta
          name="viewport"
          content="width=device-width,initial-scale=1,minimum-scale=1,maximum-scale=1,user-scalable=no,viewport-fit=cover"
        ></meta>
      </Head>
      <header className={styles.header}>
        {home ? (
          <>
            <img
              src="/images/profile.jpg"
              className={utilStyles.borderCircle}
              alt={name}
              width={128}
              height={128}
              style={{ objectFit: "cover" }}
            />
            <h1 className={utilStyles.heading2Xl}>{siteTitle}</h1>
          </>
        ) : (
          <>
            <Link href="/">
              <a className={styles.avatarLink}>
                <img
                  src="/images/profile.jpg"
                  className={utilStyles.borderCircle}
                  alt={name}
                  width={64}
                  height={64}
                  style={{ objectFit: "cover" }}
                />
              </a>
            </Link>
            <h2 className={utilStyles.headingLg}>
              <Link href="/">
                <a className={utilStyles.colorInherit}>{siteTitle}</a>
              </Link>
            </h2>
          </>
        )}
      </header>
      <main>{children}</main>
      {!home && (
        <div className={styles.backToHome}>
          <Link href="/">
            <a>← Back to home</a>
          </Link>
        </div>
      )}
      <footer className={styles.footer}>
        <div>
          Made with <span className={styles.footerHeart}>❤</span> by L·Lawliet |{" "}
          <Link href="/friends">友人帐</Link> |{" "}
          <Link href="/recommend">内推</Link>
        </div>
        <div>
          © 1993 - {new Date().getFullYear()} |{" "}
          <a
            href="https://beian.miit.gov.cn"
            target="_blank"
            rel="noopener noreferrer"
          >
            浙ICP备18031309号-1
          </a>
        </div>
      </footer>
    </div>
  );
}
