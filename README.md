# 病例墙的透视窗 | Clinical Case Perspective Window

> 医患并非对立，而是携手并肩、共同对抗疾病的同盟。

![病例墙的透视窗](https://trae-forum-cdn.trae.com.cn/prod/original/3X/5/b/5bca1c38fd1ff79a172d73c9700c0dd63b0aae1c.jpeg)

## 在线体验

立即访问部署的网站进行游玩：

**[https://clinical-case-perspective-window-e8.vercel.app/](https://clinical-case-perspective-window-e8.vercel.app/)**

> 建议在电脑端浏览器中体验，以获得最佳交互效果。

---

## 项目简介

在当下的医疗环境中，医患之间隔着一道墙。

- **患者看不见医生**：觉得"就发个烧还要查血拍片，想多收钱？"
- **医生看不见患者**：面对"排3小时只看3分钟"的抱怨，只能抓准核心症状快速判断

患者对医生决策的不信任，医生对患者不信任导致的防御性医疗，让两者之间形成了厚重的墙壁。你看不见我，我看不见你，火药味愈发浓厚。

本项目通过沉浸式互动体验，让用户分别站在患者和医生的视角，亲身感受这种信息差，从而理解医患双方的立场，打破认知隔阂。

---

## 核心功能

### 1. 医患对话沉浸式体验

- 双视角对话系统（患者 / 医生）
- 语音同步字幕播放
- 认知冲突可视化呈现
- 知识卡片科普宣教
- 多阶段交互流程（思考链 → 对话 → 劝说 → 墙体消散）

![主页面展示](https://trae-forum-cdn.trae.com.cn/prod/original/3X/2/f/2f91d7b1b6524e89811b2ca03fe8b155b5dcbd7a.jpeg)

![医患对话](https://trae-forum-cdn.trae.com.cn/prod/original/3X/7/c/7c2884d8221a05ca9a9ca5629079fc89622e8d8c.jpeg)

### 2. 临床病例交互式问答

- 模拟**真实临床场景**的病例展示
- **多选项决策机制**（选项中无正确答案，引导思考）
- 红字补充关键信息，揭示**诊断盲区**
- 三个独立病例：症状误判、病史遗漏、非感染性发热

![案例引入](https://trae-forum-cdn.trae.com.cn/prod/original/3X/0/c/0ca883f401293f9e8d8c9d11054dde2f77c3bc7f.jpeg)

![临床真实病例决策](https://trae-forum-cdn.trae.com.cn/prod/original/3X/3/2/32e5ecbeb64b866fc5ac271a8a44e71e7e09f9ef.jpeg)

### 3. 主题升华动画

- 文字墙推墙互动（误解 / 猜疑 / 信息差 / 不信任）
- 患者与医生合力破墙
- 全屏核心感悟展示与语音播放

![医患破墙时刻](https://trae-forum-cdn.trae.com.cn/prod/original/3X/f/9/f9e33e4c669244fee56539952f7706ce7801092a.jpeg)

![主题升华](https://trae-forum-cdn.trae.com.cn/prod/original/3X/b/e/bedca3edc7489e3c5c1dde3f0403b42a8d9d77bb.jpeg)

---

## 面向谁

- **普通大众**：对医学知识感兴趣的健康人群
- **患者及家属**：希望了解就医流程和沟通技巧的群体
- **医疗教育受众**：医学院学生、基层医护人员

---

## 技术栈

- **前端框架**：React 18 + TypeScript
- **构建工具**：Vite
- **样式方案**：TailwindCSS
- **路由管理**：React Router
- **音频处理**：Web Audio API
- **部署平台**：Vercel + GitHub

## 快速开始

### 环境要求

- Node.js >= 18
- npm >= 9

### 安装与运行

```bash
# 安装依赖
npm install

# 启动开发服务器
npm run dev

# 构建生产版本
npm run build
```

启动后访问 http://localhost:5173/

## 页面路由

| 页面 | 路由 | 说明 |
|------|------|------|
| 序幕页 | `/` | 医患对话序幕，认知冲突引入 |
| 主页面 | `/main` | 病例墙主界面，9个病历单入口 |
| 特别会诊详情 | `/fever-case-detail` | 发热病例完整交互流程 |
| 主页面调试 | `/main-debug` | 素材位置可视化调整工具 |
| 病例调试 | `/fever-case-debug` | 弹窗尺寸调整工具 |
| 主题调试 | `/theme-debug` | 破墙动画调试工具 |

## 项目结构

```
src/
├── components/
│   ├── Main/
│   │   ├── ClinicalQuiz.tsx       # 临床问答组件
│   │   ├── FeverCaseDetail.tsx    # 发热病例核心交互
│   │   ├── FeverCaseModal.tsx     # 病例详情弹窗
│   │   └── ThemeRevelation.tsx    # 主题升华动画
│   └── Prologue/
│       ├── ProloguePage.tsx       # 序幕页面
│       ├── PatientColumn.tsx      # 患者侧对话
│       ├── DoctorColumn.tsx       # 医生侧对话
│       └── MedicalRecordModal.tsx # 病历单弹窗
├── pages/
│   ├── MainPage.tsx               # 主页面
│   ├── MainPageDebug.tsx          # 主页面调试
│   ├── FeverCaseDebug.tsx         # 病例调试
│   └── ThemeDebug.tsx             # 主题调试
├── hooks/
│   ├── useAnimationSequence.ts    # 动画序列控制
│   └── useTheme.ts                # 主题管理
├── data/
│   └── conflicts.ts               # 对话内容数据
└── utils/
    └── soundEffects.ts            # 音效工具
```

## 交互流程

```
序幕页（医患对话）
    ↓
主页面（病例墙）
    ↓ 点击发热待查
特别会诊详情
    ├─ 背景介绍（字幕+语音）
    ├─ 患者思考链
    ├─ 医生诊断思维
    ├─ 墙体点击 → 认知差距提示
    ├─ 医生劝说 → 患者回复
    ├─ 墙体消散动画
    ├─ 结局展示（检查后续）
    └─ 你以为结束了？ → 临床问答
         ├─ 病例一：症状误判
         ├─ 病例二：病史遗漏
         ├─ 病例三：非感染性发热
         └─ 主题升华（医患破墙）
```

## 三个临床病例

| 病例 | 主题 | 核心启示 |
|------|------|----------|
| 病例一 | 症状误判 | 流感被误认为普通感冒，遗漏基础病史 |
| 病例二 | 病史遗漏 | 患者未提及养鹦鹉，导致鹦鹉热误诊 |
| 病例三 | 非感染性发热 | 发热不一定都是感染，自身免疫病也会发热 |

每个病例提供3个看似合理但有漏洞的选项，用户提交后以红字补充关键信息，揭示诊断盲区。

---

## 设计理念

- **非说教式**：通过"你以为结束了？"的悬念设计，让用户主动探索和思考，而非被动接受知识
- **沉浸体验**：语音同步、动画过渡、角色扮演增强代入感
- **真实案例**：基于真实临床案例改编，具有更强的说服力和教育意义
- **双向理解**：同时呈现患者和医生两个视角的思考过程

## 开发工具

项目内置三个可视化调试页面，支持实时调整素材位置和尺寸：

- 滑块 + 数值输入双重调节方式
- 可拖拽控制面板
- 实时预览效果

## 部署

项目已部署至 Vercel，代码托管于 GitHub：

- **在线体验**：[https://clinical-case-perspective-window-e8.vercel.app/](https://clinical-case-perspective-window-e8.vercel.app/)
- **GitHub 仓库**：[Clinical-Case-Perspective-Window](https://github.com/lizhouhua123/Clinical-Case-Perspective-Window)

## License

MIT
