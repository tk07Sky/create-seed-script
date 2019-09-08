# create-seed-script
Ruby on Railsのseedを作成するスクリプトです。
[clasp](https://github.com/google/clasp)を使用し、ローカルでスクリプトを作成したあと、GASにデプロイして使います。

# setup

1. 新規でスプレッドシートファイルを作成し、スクリプトエディタを開いてください。

2. `script Id`を取得してください。

```
script Idを取得するには
Script editor → ファイル → プロジェクトのプロパティ → スクリプト ID
```

3. ローカルにこのスクリプトをクローンし、`clasp`の設定をしてください。

```bash
$ git clone git@github.com:tk07Sky/create-seed-script
$ yarn
$ cp .env.sample .env && vim .env
```

```
SCRIPT_ID= ← 取得したscriptIdを貼り付けて保存
```

```bash
$ yarn push
```

Yay :)


## using

※seed作成コマンドはスプレッドシートのタブに新規追加されます

### 新しくシートを作るには
```
seed作成コマンド → シート追加
```

### seedをファイルに書き出すには
```
seed作成コマンド → seed出力
```

## Q&A

### modeとは?
`seed`もしくは`seed_once`を設定してください（初期値は`seed`）
主キーに対応する値を一度だけ出力するか、何度も書き換えるかを指定します。
