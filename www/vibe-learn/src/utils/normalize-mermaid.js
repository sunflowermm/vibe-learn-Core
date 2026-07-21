/**
 * Mermaid 源码规范化（课文渲染与 run 前共用）
 * - 兼容旧写法 `\\n`
 * - 给含特殊字符的节点 / participant 别名自动加引号
 */
export function normalizeMermaidSource(raw) {
  let s = String(raw || '')
    .replace(/^\uFEFF/, '')
    .replace(/\r\n/g, '\n')
    .replace(/\\n/g, '<br/>')
    .trim();

  s = quoteFlowchartNodes(s);
  s = quoteParticipantAliases(s);
  return s;
}

/** flowchart：A[标签] → A["标签"]（已有引号则跳过） */
function quoteFlowchartNodes(src) {
  return src.replace(/(\b[A-Za-z][\w]*)\[([^\]\n]+)\]/g, (all, id, content) => {
    const t = content.trim();
    if (t.startsWith('"') && t.endsWith('"')) return all;
    if (!needsQuotes(content)) return all;
    return `${id}["${t}"]`;
  });
}

/** sequenceDiagram：participant X as 别名 */
function quoteParticipantAliases(src) {
  return src.replace(
    /^([ \t]*participant\s+\w+\s+as\s+)([^\n]+)$/gm,
    (all, prefix, alias) => {
      const t = alias.trim();
      if ((t.startsWith('"') && t.endsWith('"')) || (t.startsWith("'") && t.endsWith("'"))) {
        return all;
      }
      if (!needsQuotes(t) && !/[/·≠<>|]/.test(t) && !/\s/.test(t)) return all;
      if (/[/·≠<>|\s]/.test(t)) return `${prefix}"${t}"`;
      return all;
    }
  );
}

function needsQuotes(content) {
  return (
    content.includes('<br/>') ||
    /[/·≠<>|]/.test(content) ||
    (/\s/.test(content) && content.trim().length > 4)
  );
}
