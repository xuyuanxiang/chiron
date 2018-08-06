import posthtml from 'posthtml';

function WXMLPlugin(tree: any) {
  console.log(tree);

  return tree;
}

export function html(strings: TemplateStringsArray, ...values: any[]) {
  const source = strings[0];
  if (!source) return '';
  return posthtml([WXMLPlugin]).process(source, {
    sync: true,
  }).html;
}
