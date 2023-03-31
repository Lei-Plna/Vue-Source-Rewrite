import { parseHtmlToAst } from "./parseHtml";
import { generateRenderFunction } from "./generate";

function compilerToRenderFunction (template) {
  const ast = parseHtmlToAst(template),
    code = generateRenderFunction(ast),
    render = new Function(`
      with(this) {
        return ${code};
      }
    `);
  return render;
}

export {
  compilerToRenderFunction
}