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
//        const res = await fetch(``, {})
//        const json = await res.json()
        // 5. 結果を表示する
        const json = {
  "id": 1296269,
  "node_id": "MDEwOlJlcG9zaXRvcnkxMjk2MjY5",
  "name": "Hello-World",
  "full_name": "octocat/Hello-World",
  "owner": {
    "login": "octocat",
    "id": 1,
    "node_id": "MDQ6VXNlcjE=",
    "avatar_url": "https://github.com/images/error/octocat_happy.gif",
    "gravatar_id": "",
    "url": "https://api.github.com/users/octocat",
    "html_url": "https://github.com/octocat",
    "followers_url": "https://api.github.com/users/octocat/followers",
    "following_url": "https://api.github.com/users/octocat/following{/other_user}",
    "gists_url": "https://api.github.com/users/octocat/gists{/gist_id}",
    "starred_url": "https://api.github.com/users/octocat/starred{/owner}{/repo}",
    "subscriptions_url": "https://api.github.com/users/octocat/subscriptions",
    "organizations_url": "https://api.github.com/users/octocat/orgs",
    "repos_url": "https://api.github.com/users/octocat/repos",
    "events_url": "https://api.github.com/users/octocat/events{/privacy}",
    "received_events_url": "https://api.github.com/users/octocat/received_events",
    "type": "User",
    "site_admin": false
  },
  "private": false,
  "html_url": "https://github.com/octocat/Hello-World",
  "description": "This your first repo!",
  "fork": false,
  "url": "https://api.github.com/repos/octocat/Hello-World",
  "archive_url": "https://api.github.com/repos/octocat/Hello-World/{archive_format}{/ref}",
  "assignees_url": "https://api.github.com/repos/octocat/Hello-World/assignees{/user}",
  "blobs_url": "https://api.github.com/repos/octocat/Hello-World/git/blobs{/sha}",
  "branches_url": "https://api.github.com/repos/octocat/Hello-World/branches{/branch}",
  "collaborators_url": "https://api.github.com/repos/octocat/Hello-World/collaborators{/collaborator}",
  "comments_url": "https://api.github.com/repos/octocat/Hello-World/comments{/number}",
  "commits_url": "https://api.github.com/repos/octocat/Hello-World/commits{/sha}",
  "compare_url": "https://api.github.com/repos/octocat/Hello-World/compare/{base}...{head}",
  "contents_url": "https://api.github.com/repos/octocat/Hello-World/contents/{+path}",
  "contributors_url": "https://api.github.com/repos/octocat/Hello-World/contributors",
  "deployments_url": "https://api.github.com/repos/octocat/Hello-World/deployments",
  "downloads_url": "https://api.github.com/repos/octocat/Hello-World/downloads",
  "events_url": "https://api.github.com/repos/octocat/Hello-World/events",
  "forks_url": "https://api.github.com/repos/octocat/Hello-World/forks",
  "git_commits_url": "https://api.github.com/repos/octocat/Hello-World/git/commits{/sha}",
  "git_refs_url": "https://api.github.com/repos/octocat/Hello-World/git/refs{/sha}",
  "git_tags_url": "https://api.github.com/repos/octocat/Hello-World/git/tags{/sha}",
  "git_url": "git:github.com/octocat/Hello-World.git",
  "issue_comment_url": "https://api.github.com/repos/octocat/Hello-World/issues/comments{/number}",
  "issue_events_url": "https://api.github.com/repos/octocat/Hello-World/issues/events{/number}",
  "issues_url": "https://api.github.com/repos/octocat/Hello-World/issues{/number}",
  "keys_url": "https://api.github.com/repos/octocat/Hello-World/keys{/key_id}",
  "labels_url": "https://api.github.com/repos/octocat/Hello-World/labels{/name}",
  "languages_url": "https://api.github.com/repos/octocat/Hello-World/languages",
  "merges_url": "https://api.github.com/repos/octocat/Hello-World/merges",
  "milestones_url": "https://api.github.com/repos/octocat/Hello-World/milestones{/number}",
  "notifications_url": "https://api.github.com/repos/octocat/Hello-World/notifications{?since,all,participating}",
  "pulls_url": "https://api.github.com/repos/octocat/Hello-World/pulls{/number}",
  "releases_url": "https://api.github.com/repos/octocat/Hello-World/releases{/id}",
  "ssh_url": "git@github.com:octocat/Hello-World.git",
  "stargazers_url": "https://api.github.com/repos/octocat/Hello-World/stargazers",
  "statuses_url": "https://api.github.com/repos/octocat/Hello-World/statuses/{sha}",
  "subscribers_url": "https://api.github.com/repos/octocat/Hello-World/subscribers",
  "subscription_url": "https://api.github.com/repos/octocat/Hello-World/subscription",
  "tags_url": "https://api.github.com/repos/octocat/Hello-World/tags",
  "teams_url": "https://api.github.com/repos/octocat/Hello-World/teams",
  "trees_url": "https://api.github.com/repos/octocat/Hello-World/git/trees{/sha}",
  "clone_url": "https://github.com/octocat/Hello-World.git",
  "mirror_url": "git:git.example.com/octocat/Hello-World",
  "hooks_url": "https://api.github.com/repos/octocat/Hello-World/hooks",
  "svn_url": "https://svn.github.com/octocat/Hello-World",
  "homepage": "https://github.com",
  "organization": null,
  "language": null,
  "forks": 9,
  "forks_count": 9,
  "stargazers_count": 80,
  "watchers_count": 80,
  "watchers": 80,
  "size": 108,
  "default_branch": "master",
  "open_issues": 0,
  "open_issues_count": 0,
  "is_template": true,
  "license": {
    "key": "mit",
    "name": "MIT License",
    "url": "https://api.github.com/licenses/mit",
    "spdx_id": "MIT",
    "node_id": "MDc6TGljZW5zZW1pdA==",
    "html_url": "https://api.github.com/licenses/mit"
  },
  "topics": [
    "octocat",
    "atom",
    "electron",
    "api"
  ],
  "has_issues": true,
  "has_projects": true,
  "has_wiki": true,
  "has_pages": false,
  "has_downloads": true,
  "archived": false,
  "disabled": false,
  "visibility": "public",
  "pushed_at": "2011-01-26T19:06:43Z",
  "created_at": "2011-01-26T19:01:12Z",
  "updated_at": "2011-01-26T19:14:43Z",
  "permissions": {
    "admin": false,
    "push": false,
    "pull": true
  },
  "allow_rebase_merge": true,
  "template_repository": null,
  "temp_clone_token": "ABTLWHOULUVAXGTRYU7OC2876QJ2O",
  "allow_squash_merge": true,
  "allow_auto_merge": false,
  "delete_branch_on_merge": true,
  "allow_merge_commit": true,
  "subscribers_count": 42,
  "network_count": 0
}
        //document.getElementById('response').textContent = JSON.stringify(json)
        document.getElementById('response').value = JSON.stringify(json)
        document.getElementById('repository-link').textContent = json.name
        document.getElementById('repository-link').setAttribute('href', json.url)
        //document.getElementById('owner-repo-split').style.visibility = 'hidden'
        document.getElementById('owner-repo-split').style.visibility = 'visible'
        document.getElementById('owner-link').textContent = json.owner.login
        document.getElementById('owner-link').setAttribute('href', json.owner.url)
        document.getElementById('http-status-code').textContent = res.status
        document.getElementById('http-status-text').textContent = res.statusText
    })
});
window.addEventListener('beforeunload', (event) => {
    console.debug('beforeunload!!');
});

