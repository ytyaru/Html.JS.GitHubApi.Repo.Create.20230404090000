window.addEventListener('DOMContentLoaded', async(event) => {
    // 0-1. ラベルをセットする
    for (let e of document.querySelectorAll('form label')) {
        const method = ('checkbox'===e.children[0].getAttribute('type')) ? e.append : e.prepend
        method.call(e, document.createTextNode(e.children[0].id))
    }
    // 0-2. オプションのラベルをセットする
    for (let e of document.querySelectorAll('form select option[value]')) { e.textContent = e.value }
    // 0-3. オートコンプリートをoffにする
    for (let e of document.querySelectorAll('form input[type=text]')) { e.setAttribute('autocomplete', 'off') }
    // 0-4. 入力候補を作成・セットする
    // 0-4-1. 言語・プラットフォーム名一覧作成
    // git clone https://github.com/github/gitignore
    // cd gitignore
    // find -maxdepth 1 -name '*.gitignore' | sort | sed 's/^\.\///g' | sed 's/\.gitignore//g' | sed "s/^/'/g" |  sed "s/$/'/g" | tr '\n', ',' | sed 's/,$//g'
    const langs = ['AL','Actionscript','Ada','Agda','Android','AppEngine','AppceleratorTitanium','ArchLinuxPackages','Autotools','C++','C','CFWheels','CMake','CUDA','CakePHP','ChefCookbook','Clojure','CodeIgniter','CommonLisp','Composer','Concrete5','Coq','CraftCMS','D','DM','Dart','Delphi','Drupal','EPiServer','Eagle','Elisp','Elixir','Elm','Erlang','ExpressionEngine','ExtJs','Fancy','Finale','FlaxEngine','ForceDotCom','Fortran','FuelPHP','GWT','Gcov','GitBook','Go','Godot','Gradle','Grails','Haskell','IGORPro','Idris','JBoss','JENKINS_HOME','Java','Jekyll','Joomla','Julia','KiCad','Kohana','Kotlin','LabVIEW','Laravel','Leiningen','LemonStand','Lilypond','Lithium','Lua','Magento','Maven','Mercury','MetaProgrammingSystem','Nanoc','Nim','Node','OCaml','Objective-C','Opa','OpenCart','OracleForms','Packer','Perl','Phalcon','PlayFramework','Plone','Prestashop','Processing','PureScript','Python','Qooxdoo','Qt','R','ROS','Racket','Rails','Raku','RhodesRhomobile','Ruby','Rust','SCons','Sass','Scala','Scheme','Scrivener','Sdcc','SeamGen','SketchUp','Smalltalk','Stella','SugarCRM','Swift','Symfony','SymphonyCMS','TeX','Terraform','Textpattern','TurboGears2','TwinCAT3','Typo3','Unity','UnrealEngine','VVVV','VisualStudio','Waf','WordPress','Xojo','Yeoman','Yii','ZendFramework','Zephir']
    // 0-4-2. ライセンス名一覧作成
    // git clone https://github.com/github/choosealicense.com
    // cd choosealicense.com/_licenses
    // find -maxdepth 1 -name '*.txt' | sort | sed 's/^\.\///g' | sed 's/\.txt//g' | sed "s/^/'/g" |  sed "s/$/'/g" | tr '\n', ',' | sed 's/,$//g'
    const licenses = ['0bsd','afl-3.0','agpl-3.0','apache-2.0','artistic-2.0','bsd-2-clause','bsd-3-clause-clear','bsd-3-clause','bsd-4-clause','bsl-1.0','cc-by-4.0','cc-by-sa-4.0','cc0-1.0','cecill-2.1','cern-ohl-p-2.0','cern-ohl-s-2.0','cern-ohl-w-2.0','ecl-2.0','epl-1.0','epl-2.0','eupl-1.1','eupl-1.2','gfdl-1.3','gpl-2.0','gpl-3.0','isc','lgpl-2.1','lgpl-3.0','lppl-1.3c','mit-0','mit','mpl-2.0','ms-pl','ms-rl','mulanpsl-2.0','ncsa','odbl-1.0','ofl-1.1','osl-3.0','postgresql','unlicense','upl-1.0','vim','wtfpl','zlib']
    // 0-4-3. datalist作成
    function createDatalist(targetId, list) {
        if (document.getElementById(`dl_${targetId}`)) { return }
        const datalist = document.createElement('datalist')
        datalist.id = `dl_${targetId}`
        for (let id of list) {
            const option = document.createElement('option')
            option.value = id
            datalist.append(option)
        }
        document.body.append(datalist)
        document.getElementById(targetId).setAttribute('list', datalist.id)
    }
    createDatalist('gitignore_template', langs)
    createDatalist('license_template', licenses)
    // 0-5. デフォルト値を保持する
    function getFormValues() {
        const kvs = [...document.querySelectorAll('form input,form select,form textarea')].map(e=>[e.id, (('checkbox'===e.getAttribute('type')) ? e.checked : e.value)])
        return Object.assign(...kvs.map(([k,v]) => ({[k]:v})))
    }
    const defaultParams = getFormValues()
    console.debug('デフォルト値', defaultParams)
    document.getElementById('create').addEventListener('click', async(event) => {
        // バリデートする。パラメータを取得する。引数JSONを作る。fetchでpostする。結果を表示する。
        // 1. バリデートする
        if (!document.querySelector('form').checkValidity()) { document.querySelector('form').reportValidity(); return; }
        // 2. パラメータを取得する
        const params = getFormValues()
        console.debug('全入力値', params)
        // 3. 引数JSONを作る
        const token = params.access_token
        delete params.access_token
        console.debug('AccessToken', token)
        // 3-1. デフォルト値との差分
        const changedParamsKeys = Object.keys(params).filter(k=>params[k]!==defaultParams[k])
        const changedParams = {}
        for (let k of changedParamsKeys) { changedParams[k] = params[k] }
        console.debug('送信値', changedParams);
        // 4. fetchでpostする
        const res = await fetch(`https://api.github.com/user/repos`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/vnd.github+json',
                'Authorization': `Bearer ${token}`,
            },
            body: JSON.stringify(changedParams)
        })
        const json = await res.json()
        console.debug(res)
        console.debug(json)
        // 5. 結果を表示する
        document.getElementById('http-status-code').textContent = res.status
        document.getElementById('http-status-text').textContent = res.statusText
        document.getElementById('response').value = JSON.stringify(json)
        if (res.ok) {
            document.getElementById('result').classList.add('succeed');
            document.getElementById('result').classList.remove('failed');
            document.getElementById('result-link').style.display = 'inline-block'
            document.getElementById('repository-link').textContent = json.name
            document.getElementById('repository-link').setAttribute('href', json.html_url)
            document.getElementById('owner-repo-split').style.visibility = 'visible'
            document.getElementById('owner-link').textContent = json.owner.login
            document.getElementById('owner-link').setAttribute('href', json.owner.html_url)
        } else {
            document.getElementById('result').classList.remove('succeed');
            document.getElementById('result').classList.add('failed');
            document.getElementById('result-link').style.display = 'none'
            const messages = json.errors.map(err=>err.message)
            if (json.hasOwnProperty('message')) { messages.unshift(json['message']) }
            if (res.statusText) {  messages.unshift(res.statusText) }
            document.getElementById('http-status-text').innerHTML = messages.join('<br>')
        }
    })
});
window.addEventListener('beforeunload', (event) => {
    console.debug('beforeunload!!');
});

