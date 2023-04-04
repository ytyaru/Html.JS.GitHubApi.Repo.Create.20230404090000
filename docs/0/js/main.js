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

