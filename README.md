# zero-to-tech-4-5 · Next.js 版（模块 4.5 配套代码）

4.5 的终点成品：把 4.4 的 React 项目整体搬到 Next.js。网站长相不变；变的是路由层（手搓 `useRoute` → 文件夹路由）和入口（`index.html` + `main.jsx` + `App.jsx` → `app/`）。

## 跑起来

```bash
npm install
npm run dev          # http://localhost:3000   （Next 默认端口是 3000）
```

## 把你的 4.4 项目（`zero-to-tech`）迁成这样：整包替换

1. 把 `~/zero-to-tech` 里**除隐藏的 `.git` 外的所有文件删掉**。
2. 把本 demo 下的所有文件拷进去（`node_modules`、`.next` 不用拷）。
3. 跑起来确认还是那个网站：
   ```bash
   npm install
   npm run dev          # http://localhost:3000
   ```
4. 确认无误后 `git add` / `commit` / `push`。

## 后端：使用 DeepSeek 分析情感

在项目根目录执行（使用你的 Python 虚拟环境）：

```bash
python -m pip install -r backend/requirements.txt
```

新建 `backend/.env`，参照 `backend/deepseek.env.example` 填写：

```dotenv
DEEPSEEK_API_KEY=你的DeepSeek密钥
DEEPSEEK_MODEL=deepseek-flash
```

密钥在 DeepSeek 开放平台创建，仅供后端使用。`.env` 已被 Git 忽略，
不要把密钥放进前端代码或 `NEXT_PUBLIC_` 变量。配置后启动或重启后端：

```bash
python -m uvicorn backend.main:app --reload
```

`POST /api/analyze` 将文本发送到 DeepSeek（需要联网，按 API 用量计费），
让模型返回 `{"score": 0.85}`。后端检查分数在 0～1 之间，再按原来的阈值生成标签，
仍返回 `text`、`score`、`label`、`pinyin`，前端无需更换接口。
分数是模型依据提示词给出的积极程度评价，不是经过校准的概率，也不与 SnowNLP 分数直接等价。

## 项目目录

```
app/                     ← 文件夹 = 路由
  layout.jsx             ← 全站外壳（页面包裹 + import 8 个 css）
  page.jsx               ← /         → 渲染 <HomeView />
  text-lab/page.jsx      ← /text-lab → 渲染 <TextLabView />
components/
  Nav.jsx                ← <Link> + usePathname（"use client"）
  HomeView.jsx           ← 4.4 的 HomePage 改名
  TextLabView.jsx        ← 4.4 的 TextLabPage 改名
  PageHeading.jsx        ← 同 4.4
  InputCard.jsx          ← 同 4.4（"use client"）
  ResultCard.jsx         ← 同 4.4（"use client"）
  AnimatedCardGrid.jsx   ← 同 4.4（"use client"）
css/                     ← 8 个 css，同 4.4
data/site.js             ← 同 4.4
next.config.mjs          ← 空 {}
```

相比 4.4，没了 `index.html`、`src/main.jsx`、`src/App.jsx`、`src/router/useRoute.js`——这一坨被 `app/` 取代了。
