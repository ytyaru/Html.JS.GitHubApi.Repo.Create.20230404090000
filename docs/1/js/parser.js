// https://qiita.com/tkmtmkt/items/a6e981f2472455a4e4fb
class _Parser { 
    async setup(path=`md/main.md`) {
        console.debug('start parser.setup()')
        //mermaid.initialize({startOnLoad: false});
        mermaid.initialize({startOnLoad: false, securityLevel: 'loose'})
        markmap.autoLoader.manual = true
        //mermaid.initialize({securityLevel: 'loose'});
        const renderer = new marked.Renderer();
        renderer.code = function (code, language) {
//            if (language in ['mermaid', 'markmap']) { return `<div class="${language}">${code}\n</div>`; }
            if (language == 'mermaid') { return '<div class="mermaid">' + code + '\n</div>'; }  // mermaid.js
            //else if (language == 'markmap') { return '<div class="markmap">' + markmap.autoLoader.renderAll() + '\n</div>'; }
            else if (language == 'markmap') { return '<div class="markmap">' + code + '\n</div>'; }
            else { return '<pre><code>\n' + hljs.highlightAuto(code).value + '\n</code></pre>'; } // highlight.js
        }
        marked.use({ renderer });
        const res = await fetch(path)
        const md = await res.text()
        //document.body.append(marked.parse(md))
        document.body.innerHTML = marked.parse(md)
        mermaid.init();
        markmap.autoLoader.renderAll()
        console.debug('end parser.setup()')
    }
}
console.debug('parser')
const Parser = new _Parser()
