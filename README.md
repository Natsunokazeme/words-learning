#project planning

## 项目规划

缺失单词数据库

1. 导入单词到收藏集
2. 显示模式 可通过 config 是否显示汉语，是否显示英语，是否显示英语翻译.
3. 不显示的用灰色区块覆盖，悬浮时去掉区块显示
4. 单词行 选择 输入单词 单词(隐藏，悬浮显示) 英语释义(悬浮显示,点击显示) 汉语翻译(悬浮显示) 英语发音(悬浮显示) 词根&用法(悬浮显示)
5. 收藏集板块
6. 语音发音
7. 搜索系统
8. random 模式，随机选词测试
9. 默写模式，根据汉语或发音写词
10. 近义词

11. gif 图生成(要求压缩到 1m 以内，微信表情包大小限制)
    todo: 支持日语学习，
12. 微信截图生成 mock
13. 支持两个图片上传到合适位置并生存一张图片
14. 支持图片裁剪
15. 支持上传视频
16. 支持视频裁剪

17. 笔记模式
18. 数据库结构 标题/问题 内容/答案 关键词/标签 时间/日期 分类/收藏
19. 单个输入 excel 导入
20. 随机 10 个，搜索支持

21. midjourny 项目 api 集成
22. xoxp-5593807935527-5608347157234-5610918124132-b25c1a50cac526b8a7aabe629fe76e37
23. U05JL1UCRFS
24. 注册 md5 加密 过期时间 邮箱验证
25. 根据功能拆分成不同页面和不同路由，创造页面：midjourny 和 Claude；语言学习页面：语言学习和单词本；个人中心页面：个人中心和登录注册；微信页面：微信和微信截图生成；笔记页面：八股 (P1)
26. 登录后显示头像并且可以点击进入个人中心 (P3)
27. 修改密码功能，需要通过邮箱验证 (P2)
28. 头像可以上传，上传裁剪，并且限制图片大小或后端压缩图片大小 (P4)
29. 个人中心页面可以修改个人信息，包括昵称，邮箱，头像，密码 (P4)

tech stack: react react-router tailwindcss scss cropper react-cropper mui canvas gif.js md5 axios generate-react-cli

$ npx generate-react-cli component CreationPage --type=page
