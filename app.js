const commands = {
  start: {
    title: "/start 选题立项",
    extra: "",
    build: s => `使用 short-drama 技能，执行 /start，帮我完成短剧项目立项。

请基于以下信息做选题引导和项目初始化，并生成 .drama-state.json：
- 剧名：${v(s.title) || "待定"}
- 题材：${v(s.genre)}
- 平台：${v(s.platform)}
- 目标受众：${v(s.audience)}
- 总集数：${v(s.episodes)} 集
- 单集时长：${v(s.duration)}
- 调性：${v(s.tone)}
- 商业目标：${v(s.business)}
- 一句话梗概：${v(s.logline)}
- 特殊要求：${v(s.requirements)}

输出要求：
1. 先判断这个选题的爆款潜力和风险。
2. 给出 3 个可选强化方向。
3. 确认最终方案后，生成可继续执行 /plan 的项目状态。`
  },
  plan: {
    title: "/plan 创作方案",
    build: s => `使用 short-drama 技能，执行 /plan，为这个短剧生成完整创作方案，并保存为 creative-plan.md。

项目参数：
${summary(s)}

请包含：
1. 一句话梗概和核心卖点
2. 目标用户与平台策略
3. 世界观 / 背景设定
4. 主线冲突与情绪主线
5. 80集节奏阶段，或按我填写的总集数调整
6. 付费 / 留存钩子设计
7. 前3集强开篇策略
8. 内容合规风险提醒`
  },
  characters: {
    title: "/characters 角色设计",
    build: s => `使用 short-drama 技能，执行 /characters，生成完整角色档案，并保存为 characters.md。

项目参数：
${summary(s)}

请设计：
1. 主角：身份、表层困境、隐藏优势、核心欲望、人物弧光
2. 反派：动机、资源、压迫方式、失败路径
3. 爱情 / 亲情 / 事业关键关系
4. 配角功能表
5. 角色关系图文字版
6. 每个核心角色的代表台词`
  },
  outline: {
    title: "/outline 分集目录",
    build: s => `使用 short-drama 技能，执行 /outline，生成完整分集目录，并保存为 episode-directory.md。

项目参数：
${summary(s)}

请为 ${v(s.episodes) || 80} 集设计：
1. 每集标题
2. 每集核心冲突
3. 每集爽点 / 情绪点
4. 每集结尾钩子
5. 付费转化节点
6. 前5集要特别强化黄金3秒和连续追更动机`
  },
  episode: {
    title: "/episode 分集剧本",
    extra: `<div class="grid"><label>集数范围<input id="episodeRange" placeholder="例如：1 或 2-5 或 next"></label><label>剧本细度<select id="episodeDepth"><option>可拍摄完整剧本</option><option>分场大纲</option><option>导演分镜提示</option></select></label></div>`,
    build: s => `使用 short-drama 技能，执行 /episode ${v(s.episodeRange) || "1"}，撰写${v(s.episodeDepth) || "可拍摄完整剧本"}。

项目参数：
${summary(s)}

请遵循：
1. 竖屏短剧节奏，单集 ${v(s.duration)}
2. 开头承接上集或直接强钩子
3. 每 15-30 秒出现冲突或信息增量
4. 场景、动作、台词、音乐/音效提示清晰
5. 结尾必须留下下一集钩子
6. 输出到 episodes/epXXX.md`
  },
  review: {
    title: "/review 质量审查",
    extra: `<div class="grid"><label>审查对象<input id="reviewTarget" placeholder="例如：1、3-5 或 all"></label><label>审查重点<select id="reviewFocus"><option>五维度综合评分</option><option>开篇钩子</option><option>节奏与留存</option><option>付费转化</option><option>台词冲突</option></select></label></div>`,
    build: s => `使用 short-drama 技能，执行 /review ${v(s.reviewTarget) || "all"}，进行${v(s.reviewFocus) || "五维度综合评分"}。

项目参数：
${summary(s)}

请输出：
1. 评分表，总分 50 分
2. 具体问题清单
3. 每个问题的修改建议
4. 可直接替换的优化片段
5. 是否建议进入下一步创作`
  },
  compliance: {
    title: "/compliance 合规审核",
    build: s => `使用 short-drama 技能，执行 /compliance，对当前短剧项目做内容合规审核，并生成 compliance-report.md。

项目参数：
${summary(s)}

请重点检查：
1. 暴力、违法、低俗、封建迷信、价值观风险
2. 霸总/复仇/逆袭桥段是否有平台审核风险
3. 标题、封面、台词、情节高风险点
4. 给出低风险改写方案`
  },
  export: {
    title: "/export 导出整剧",
    build: s => `使用 short-drama 技能，执行 /export，把当前项目整理成完整剧本文档。

项目参数：
${summary(s)}

请导出：
1. 项目简介
2. 创作方案
3. 角色档案
4. 分集目录
5. 已完成分集剧本
6. 合规报告摘要
7. 保存到 export/ 目录`
  },
  overseas: {
    title: "/overseas 海外模式",
    build: s => `使用 short-drama 技能，执行 /overseas，将当前项目切换为海外短剧模式。

项目参数：
${summary(s)}

请调整：
1. 英文剧名和 logline
2. 海外观众可理解的人设和冲突
3. ReelShort / TikTok 适配节奏
4. INT./EXT. 剧本格式
5. 付费节点和 cliffhanger 设计`
  }
};

const ids = ["title", "genre", "platform", "audience", "episodes", "duration", "tone", "business", "logline", "requirements"];
let current = "start";

const $ = id => document.getElementById(id);
const v = value => (value || "").toString().trim();

function collect() {
  const state = { command: current };
  ids.forEach(id => state[id] = $(id)?.value || "");
  document.querySelectorAll("#dynamicFields input, #dynamicFields select, #dynamicFields textarea").forEach(el => state[el.id] = el.value);
  return state;
}

function summary(s) {
  return `- 剧名：${v(s.title) || "待定"}
- 题材：${v(s.genre)}
- 平台：${v(s.platform)}
- 目标受众：${v(s.audience)}
- 总集数：${v(s.episodes)} 集
- 单集时长：${v(s.duration)}
- 调性：${v(s.tone)}
- 商业目标：${v(s.business)}
- 一句话梗概：${v(s.logline)}
- 特殊要求：${v(s.requirements)}`;
}

function renderCommand(name) {
  current = name;
  document.querySelectorAll(".cmd").forEach(btn => btn.classList.toggle("active", btn.dataset.command === name));
  $("commandTitle").textContent = commands[name].title;
  $("dynamicFields").innerHTML = commands[name].extra || "";
  generate();
}

function generate() {
  const state = collect();
  $("promptOutput").value = commands[current].build(state);
}

function save() {
  localStorage.setItem("shortDramaStudioState", JSON.stringify(collect(), null, 2));
  $("status").textContent = "已保存 " + new Date().toLocaleTimeString();
}

function load() {
  const raw = localStorage.getItem("shortDramaStudioState");
  if (!raw) return;
  try {
    const state = JSON.parse(raw);
    ids.forEach(id => { if ($(id) && state[id] != null) $(id).value = state[id]; });
    renderCommand(state.command || "start");
    setTimeout(() => {
      Object.keys(state).forEach(id => { if ($(id)) $(id).value = state[id]; });
      generate();
    });
    $("status").textContent = "已载入本地状态";
  } catch {
    $("status").textContent = "状态读取失败";
  }
}

async function copyPrompt() {
  const text = $("promptOutput").value;
  try {
    await navigator.clipboard.writeText(text);
    $("status").textContent = "指令已复制";
  } catch {
    $("promptOutput").focus();
    $("promptOutput").select();
    document.execCommand("copy");
    $("status").textContent = "指令已选中/复制";
  }
}

function downloadState() {
  const blob = new Blob([JSON.stringify(collect(), null, 2)], { type: "application/json;charset=utf-8" });
  const url = URL.createObjectURL(blob);
  const a = document.createElement("a");
  a.href = url;
  a.download = "short-drama-project.json";
  a.click();
  URL.revokeObjectURL(url);
}

document.querySelectorAll(".cmd").forEach(btn => btn.addEventListener("click", () => renderCommand(btn.dataset.command)));
document.querySelectorAll("input, select, textarea").forEach(el => el.addEventListener("input", generate));
$("dynamicFields").addEventListener("input", generate);
$("regenerate").addEventListener("click", generate);
$("saveState").addEventListener("click", save);
$("copyPrompt").addEventListener("click", copyPrompt);
$("downloadState").addEventListener("click", downloadState);

load();
generate();
