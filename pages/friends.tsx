import Layout from "../components/layout";
import Head from "next/head";
import utilStyles from "../styles/utils.module.css";

export default function Friends() {
  return (
    <Layout>
      <Head>
        <title>友人帐</title>
      </Head>
      <div>
        <h2 className={utilStyles.headingMd}>友人帐</h2>
        <div className="friends">
          {[
            {
              avatar: "https://avatars.githubusercontent.com/u/9943164",
              name: "阿瓜",
              intro: "阿瓜阿瓜顶瓜瓜",
              link: "//digua.me",
            },
            {
              avatar: "https://avatars.githubusercontent.com/u/19499958",
              name: "阿绿",
              intro: "小米大佬欧阳浩",
              link: "//oyhfe.com/",
            },
            {
              avatar: "https://avatars.githubusercontent.com/u/13888962",
              name: "阿夜",
              intro: "靠聊天月入百万的宅男",
              link: "https://nightcat.win",
            },
            {
              avatar: "https://avatars.githubusercontent.com/u/16420974",
              name: "小温之家",
              intro: "行走在猿类世界",
              link: "//wenqy.com",
            },
            {
              avatar: "https://avatars.githubusercontent.com/u/15681693",
              name: "阿盖",
              intro: "很骚的老实人",
              link: "//xyxiao001.github.io/vue-blog/",
            },
            {
              avatar: "https://avatars.githubusercontent.com/u/3984824",
              name: "阿树",
              intro: "什么都会，还有一个美国女朋友",
              link: "//geeku.net",
            },
            {
              avatar: "https://avatars.githubusercontent.com/u/14882452",
              name: "阿丹",
              intro: "主职：歌手，副业：前端",
              link: "//funnycoder.lofter.com/",
            },
            {
              avatar: "https://avatars.githubusercontent.com/u/7876498",
              name: "阿鱼",
              intro: "everyone作者",
              link: "//blog.wanan.me/",
            },
            {
              avatar: "https://avatars.githubusercontent.com/u/5457564",
              name: "阿爆",
              intro: "爆栈大佬，尤其是PHP，爱哭的男子",
              link: "//www.daryl.red/",
            },
            {
              avatar: "https://ooo.0o0.ooo/2016/11/14/5829a44a23886.png",
              name: "阿兔",
              intro: "node大佬，著名暖男，钻石王者",
              link: "//www.noder.club/",
            },
            {
              avatar: "https://ooo.0o0.ooo/2016/11/14/5829a8cc9802d.png",
              name: "抽筋的葡萄",
              intro: "",
              link: "//www.choujindeputao.com",
            },
            {
              avatar: "https://ooo.0o0.ooo/2016/11/14/5829a8a2081fd.png",
              name: "花花丹",
              intro: "",
              link: "//daphnechang.github.io/",
            },
            {
              avatar: "https://ooo.0o0.ooo/2016/11/14/5829a6b91281c.jpg",
              name: "羡辙",
              intro: "",
              link: "//zhangwenli.com/",
            },
            {
              avatar: "https://avatars.githubusercontent.com/u/1856466",
              name: "Havee's Space",
              intro: "",
              link: "//havee.me/",
            },
          ].map((friend) => {
            return (
              <a
                href={friend.link}
                target="__blank"
                key={friend.name}
                rel="noopener noreferrer"
              >
                <img
                  src={friend.avatar}
                  alt={friend.name}
                  width={66}
                  height={66}
                />
                <div>
                  <div className="name">{friend.name}</div>
                  <div className="intro">{friend.intro}</div>
                </div>
              </a>
            );
          })}
        </div>
      </div>
      <style jsx>{`
        .friends {
          display: flex;
          flex-wrap: wrap;
          justify-content: space-between;
        }

        a {
          width: 50%;
          display: flex;
          margin-bottom: 20px;
        }

        img {
          object-fit: cover;
          border-radius: 50%;
          margin-right: 10px;
        }

        .name {
          color: black;
          font-size: 18px;
          font-weight: 700;
        }

        .intro {
          font-size: 14px;
          color: #646464;
        }
      `}</style>
    </Layout>
  );
}
