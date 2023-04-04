function setupParser() {
    // https://qiita.com/tkmtmkt/items/a6e981f2472455a4e4fb
    mermaid.initialize({startOnLoad:false});
    const renderer = new marked.Renderer();
    renderer.code = function (code, language) {
        if (language == 'mermaid') { return '<div class="mermaid">' + code + '\n</div>'; }  // mermaid.js
        else { return '<pre><code>\n' + hljs.highlightAuto(code).value + '\n</code></pre>'; } // highlight.js
    }
    marked.use({ renderer });
    const res = await fetch(`md/main.md`)
    const md = await res.text()
    document.body.append(marked.parse(md))
    mermaid.init();
}
