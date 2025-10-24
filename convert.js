const fs = require('fs');
const path = require('path');
const yaml = require('js-yaml'); // npm install js-yaml

// 配置路径
const POSTS_DIR = path.join(__dirname, 'source', '_posts');
const EXTENSIONS = ['.md', '.markdown'];

// 主函数
function updateTitles() {
  if (!fs.existsSync(POSTS_DIR)) {
    console.error(`文章目录不存在: ${POSTS_DIR}`);
    return;
  }

  const files = fs.readdirSync(POSTS_DIR);
  files.forEach(file => {
    const filePath = path.join(POSTS_DIR, file);

    // 只处理 Markdown 文件
    if (!EXTENSIONS.some(ext => file.toLowerCase().endsWith(ext))) {
      return;
    }

    const content = fs.readFileSync(filePath, 'utf8');

    let body = content;
    let frontMatter = {};
    let hasFrontMatter = false;

    // 检查是否有 Front-matter (--- 开头)
    const frontMatterMatch = content.match(/^---\s*[\r\n]+([\s\S]*?)[\r\n]+---/);
    if (frontMatterMatch) {
      hasFrontMatter = true;
      try {
        frontMatter = yaml.load(frontMatterMatch[1]) || {};
      } catch (e) {
        console.warn(`解析 Front-matter 失败 (${file}):`, e.message);
        return;
      }
      body = content.substring(frontMatterMatch[0].length); // 去掉 front-matter
    }

    // 如果已有 title，跳过
    if (frontMatter.title) {
      console.log(`✅ 已有标题，跳过: ${file}`);
      return;
    }

    // 从文件名提取标题（去掉日期和扩展名）
    // 支持格式如：2025-10-13-my-title.md 或 my-title.md
    const nameWithoutExt = path.parse(file).name; // 移除 .md
    const parts = nameWithoutExt.split('-');

    // 尝试跳过前三个部分如果是日期（YYYY-MM-DD）
    let titleWords = parts;
    if (parts.length >= 3 && /^\d{4}$/.test(parts[0]) && /^\d{2}$/.test(parts[1]) && /^\d{2}$/.test(parts[2])) {
      titleWords = parts.slice(3); // 去掉日期
    }

    if (titleWords.length === 0) {
      titleWords = [nameWithoutExt]; // 如果没内容，用整个名字
    }

    const extractedTitle = titleWords
      .map(word => word.charAt(0).toUpperCase() + word.slice(1)) // 首字母大写
      .join(' ');

    // 更新 frontMatter
    frontMatter.title = extractedTitle;

    // 构造新的 Front-matter
    const newFrontMatter = '---\n' + yaml.dump(frontMatter, { lineWidth: -1 }).trim() + '\n---\n';
    const newContent = newFrontMatter + (body.startsWith('\n') ? body : '\n' + body);

    // 写回文件
    fs.writeFileSync(filePath, newContent, 'utf8');
    console.log(`📝 已添加标题: "${extractedTitle}" -> ${file}`);
  });
}

// 运行脚本
updateTitles();