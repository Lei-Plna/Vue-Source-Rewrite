import { parseHtmlToAst } from "./parseHtml";

function compilerToRenderFunction (template) {
  const ast = parseHtmlToAst(template);
  console.log(ast);
}

export {
  compilerToRenderFunction
}