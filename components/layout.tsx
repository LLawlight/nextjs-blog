import Head from "next/head";
import styles from "./layout.module.css";
import utilStyles from "../styles/utils.module.css";
import Link from "next/link";
import Image from "next/image";

const name = "L·Lawliet";
export const siteTitle = "小翔日记";

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
      </Head>
      <header className={styles.header}>
        {home ? (
          <>
            <Image
              src="/images/profile.jpg"
              className={utilStyles.borderCircle}
              alt={name}
              width={128}
              height={128}
              objectFit="cover"
            />
            <h1 className={utilStyles.heading2Xl}>{name}</h1>
          </>
        ) : (
          <>
            <Link href="/">
              <a>
                <Image
                  src="/images/profile.jpg"
                  className={utilStyles.borderCircle}
                  alt={name}
                  width={64}
                  height={64}
                  objectFit="cover"
                />
              </a>
            </Link>
            <h2 className={utilStyles.headingLg}>
              <Link href="/">
                <a className={utilStyles.colorInherit}>{name}</a>
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
          <Link href="/friends">友人帐</Link>
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
