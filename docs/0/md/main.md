# GitHubリポジトリを作成する

## 引数

<form>
<fieldset><legend>必須</legend>
<label for="access_token"></label><input type="text" id="access_token">
<label for="name"></label><input type="text" id="name">
</fieldset>
<fieldset><legend>任意</legend>
	<fieldset><legend></legend>
	<label for="description"></label><input type="text" id="description">
	<label for="homepage"></label><input type="text" id="homepage">
	<label for="private"></label><input type="checkbox" id="private">
	</fieldset>
	<fieldset><legend></legend>
	<label for="auto_init"></label><input type="checkbox" id="auto_init">
	<label for="gitignore_template"></label><input type="text" id="gitignore_template">
	<label for="license_template"></label><input type="text" id="license_template">
	</fieldset>
	<fieldset><legend></legend>
	<label for="has_issues"></label><input type="checkbox" id="has_issues" checked>
	<label for="has_projects"></label><input type="checkbox" id="has_projects" checked>
	<label for="has_wiki"></label><input type="checkbox" id="has_wiki" checked>
	<label for="has_discussions"></label><input type="checkbox" id="has_discussions">
	<label for="has_downloads"></label><input type="checkbox" id="has_downloads" checked>
	</fieldset>
	<fieldset><legend></legend>
	<label for="is_template"></label><input type="checkbox" id="is_template">
	<label for="team_id"></label><input type="text" id="team_id">
	</fieldset>
	<fieldset><legend></legend>
	<label for="allow_squash_merge"></label><input type="checkbox" id="allow_squash_merge" checked>
	<label for="allow_merge_commit"></label><input type="checkbox" id="allow_merge_commit" checked>
	<label for="allow_rebase_merge"></label><input type="checkbox" id="allow_rebase_merge" checked>
	<label for="allow_auto_merge"></label><input type="checkbox" id="allow_auto_merge">
	<label for="delete_branch_on_merge"></label><input type="checkbox" id="delete_branch_on_merge">
	<label for="allow_squash_merge"></label><input type="checkbox" id="allow_squash_merge" checked>

	<label for="squash_merge_commit_title"></label><select id="squash_merge_commit_title"><option value="PR_TITLE">PR_TITLE</option><option value="COMMIT_OR_PR_TITLE">COMMIT_OR_PR_TITLE</option></select>
	<label for="squash_merge_commit_message"></label><select id="squash_merge_commit_message"><option value="PR_BODY">PR_BODY</option><option value="COMMIT_MESSAGES">COMMIT_MESSAGES</option><option value="BLANK">BLANK</option></select>
	<label for="merge_commit_title"></label><select id="merge_commit_title"><option value="PR_TITLE">PR_TITLE</option><option value="MERGE_MESSAGE">MERGE_MESSAGE</option></select>
	<label for="merge_commit_message"></label><select id="merge_commit_message"><option value="PR_BODY">PR_BODY</option><option value="PR_TITLE">PR_TITLE</option><option value="BLANK">BLANK</option></select>
	</fieldset>
</fieldset>
</form>

## 結果

<div id="repository-link"><a href=""></a></div>
<div id="result"><span id="http-status-code"></span><span id="status-text"></span></div>
<pre><code id="response"></code></pre>

## 情報源

* [GitHub API Repositories Create]
	* `gitignore_template`: [GitHub gitignore][]
	* `license_template`: [GitHub license][]

[GitHub API Repositories Create]:https://docs.github.com/ja/rest/repos/repos?apiVersion=2022-11-28#create-a-repository-for-the-authenticated-user
[GitHub gitignore]:https://github.com/github/gitignore
[GitHub license]:https://github.com/github/choosealicense.com/tree/gh-pages/_licenses


```md
GitHubリポジトリを作成する

引数
　必須
　　AccessToken [      ]　？　どうやって取得するか
　　name        [      ]　？　使える文字は何か
　任意
　　description [      ]
　　homepage    [      ]
　　☐private

　　☐auto_init
　　gitignore_template [    ▼]
　　license_template   [    ▼]

　　☑has_issues
　　☑has_projects
　　☑has_wiki
　　☐has_discussions
　　☑has_downloads

　　☐is_template
　　team_id     [      ]

　　☑allow_squash_merge
　　☑allow_merge_commit
　　☑allow_rebase_merge
　　☐allow_auto_merge
　　☐delete_branch_on_merge
　　squash_merge_commit_title   [PR_TITLE,COMMIT_OR_PR_TITLE]
　　squash_merge_commit_message [PR_BODY,COMMIT_MESSAGES,BLANK]
　　merge_commit_title          [PR_TITLE,MERGE_MESSAGE]
　　merge_commit_message        [PR_BODY,PR_TITLE,BLANK]

結果

　[リポジトリ名][URL]

HTTPステータスコード
\`\`\`json
{...}
\`\`\`


201|作成した
304|未修正
400|要求の形式が正しくありません
401|認証が必要です
403|禁断
404|リソースが見つかりません
422|検証に失敗したか、エンドポイントにスパムが送信されました。

[GitHub API Repositories Create][]
```
