function convert(srctxt) {
    if (!srctxt) {
        return '';
    }
    var prei = 0;
    var pres = [];
    var _src = srctxt;
    return '---\ntitle: \nexcerpt: \ncategories: \n- FE\n---\n\n' +
        _src
            .replace(/\s*<pre>\s*([\s\S]+?)\s*<\/pre>\s*/mg, function (m, p1) {
                pres.push(p1);
                return '${' + (prei++) + '}';
            })
            .replace(/^(\*+)\s*(.+?)\s*\n/mg, '$1 $2\n')
            .replace(/^(#+)\s*(.+?)\s*\n/mg, function (m, p1, p2) {
                return (p1.replace(/#/g, '-') + ' ' + p2 + '\n');
            })
            // .replace(/\n*<\/?pre>\n*/g, '\n```\n')
            .replace(/\n*\s*(=+)\s*(.+?)(\s*=+\s*)\n+/mg, function (m, p1, p2, p3) {
                return ('\n\n' + p1.replace(/=/g, '#') + ' ' + p2 + '\n');
            })
            .replace(/(?:\[{1,2}\s*)?((f|ht){1}(tp|tps):\/\/([\w-]+\.)+[\w-]+(\/[\w- ./?%&=]*)?)(?:\s*\]{1,2})?(?!\()/g, function (m, p1) {
                return '[' + p1 + '](' + p1 + ')';
            })
            .replace(/\[\[\s*(.+)\s*\]\]/g, function (m, p1) {
                return '[' + p1 + '](' + p1 + ')';
            })
            .replace(/\${(\d+)}/g, function (m, p1) {
                return '\n```\n' + pres[p1] + '\n```\n';
            });
}
