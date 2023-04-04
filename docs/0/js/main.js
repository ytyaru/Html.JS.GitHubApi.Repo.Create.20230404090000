window.addEventListener('DOMContentLoaded', async(event) => {
    console.log('aaaaaaaaaDOMContentLoaded!!');
    // 0-1. ラベルをセットする
    for (let e of document.querySelectorAll('form label')) {
        const method = ('checkbox'===e.children[0].getAttribute('type')) ? e.append : e.prepend
        method.call(e, document.createTextNode(e.children[0].id))
    }
    // 0-2. オプションのラベルをセットする
    for (let e of document.querySelectorAll('form select option[value]')) { e.textContent = e.value }
    // 0-3. オートコンプリートをoffにする
    for (let e of document.querySelectorAll('form input[text]')) { e.setAttribute('autocomplete', 'off') }
    document.getElementById('create').addEventListener('click', async(event) => {
        // バリデートする。パラメータを取得する。引数JSONを作る。fetchでpostする。結果を表示する。
        // 1. パラメータを取得する
        const kvs = [...document.querySelectorAll('form input, form select')].map(e=>[e.id, (('checkbox'===e.type) ? ((e.checked) ? 'true' : 'false') : e.value)])
        const params = Object.assign(...kvs.map(([k,v]) => ({[k]:v})))
        const token = params.access_token
        delete params.access_token
        console.log(kvs)
        console.log(params)
        console.log(token)
        // 2. バリデートする
        for (let e of document.querySelectorAll('form input')) {
            if (e.valid) { continue }
        }
        if (!token) { alert('AccessTokenを入力してください。'); return; }
        if (!params.name) { alert('nameを入力してください。'); return; }
        // 3. 引数JSONを作る
        // 4. fetchでpostする
        const res = await fetch(``, {})
        const json = await res.json()
        // 5. 結果を表示する
        document.getElementById('response').textContent = json

    })
});
window.addEventListener('beforeunload', (event) => {
    console.log('beforeunload!!');
});

