interface Friend {
  avatar: string; // 头像链接
  name: string; // 用户 id
  link: string; // 博客链接
  title?: string; // 用户头衔
  tag?: string; // 用户标签
  color?: string; // 标签颜色
}

/**
 * TODO: 缺项处理
 * 在此处填写你的友情链接
 */
export const friendsInfo: Friend[] = [
  {
    avatar: "https://avatars.githubusercontent.com/u/87300894?v=4",
    name: "Anak1st",
    title: "🎈 ACMer (网瘾罢了😄)",
    link: "https://anak1st.github.io/blog/",
    tag: "夏老师",
    color: "green",
  },
  {
    avatar: "https://avatars.githubusercontent.com/u/28391387?v=4",
    name: "AsterZC19",
    title: "🌸 每个人的花期都不一样。",
    link: "https://starminus.uk",
    tag: "🐻神",
    color: "blue",
  },
];
