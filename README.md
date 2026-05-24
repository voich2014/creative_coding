# creative_coding

このリポジトリは、ぼいち（[@voich2014](https://twitter.com/voich2014)）が過去に  
プライベートホームページ上で公開していた  **ジェネラティブアート作品**を  
整理・再公開していくための場所です。  
（プライベートHPはプロバイダのHPサービス終了により公開停止されました）  

HTML / CSS / JavaScript などのWeb技術を用いた作品を、フォルダごとにまとめています。  
時間を見つけて、今後新しい作品も追加予定です。  

これらの作品は趣味の作品で、ゆるーく開発していく目的のものですので、  
issueやプルリクエストは受け付けません。あらかじめご了承下さい。  

また、ソースは初心者の方でも見やすいように、なるべくひとつのhtmlファイルに  
まとめるようにしています。  
よく使う共通の処理は `vlib/` フォルダにまとめています。  
（試行錯誤しながら少しずつ整理中です）  

---

## 📁 構成について

このリポジトリ内の作品は、`src/` フォルダ以下に整理されています：

```
creative_coding/
├── src/
│   ├── vlib/     ← 共通ライブラリ
│   ├── prac1/    ← 作品1（例：円弧の華 スクロール版）
│   └── prac2/    ← 作品2（今後追加予定）
```

- 各作品はそれぞれ `index.html` を持ち、GitHub Pages から直接閲覧できます。
- `vlib/` 以下には共通のCSSやJavaScriptライブラリを配置しています。

---

## 🌐 公開URL（GitHub Pages）

> ※準備が整い次第、以下に各作品の公開URLを追加していきます。

- 001.`prac1`：[円弧の華（スクロール版）](https://voich2014.github.io/creative_coding/src/prac1/index2.html)
- 002.`prac2`：[光る砂の滝](https://voich2014.github.io/creative_coding/src/prac2/index1.html)
- 003.`prac4`：[円弧の奇跡](https://voich2014.github.io/creative_coding/src/prac4/index1.html)
- 004.`prac5`：[ShinyFlowField](https://voich2014.github.io/creative_coding/src/prac5/index2.html)
- 005.`prac7`：[文字でキラキラ](https://voich2014.github.io/creative_coding/src/prac7/index1.html)

- 006.`tkw`：[パパの綺麗なやつ](https://voich2014.github.io/creative_coding/src/tkw/index2.html)
- 007.`tkw2`：[パパの綺麗な重ね合わせ](https://voich2014.github.io/creative_coding/src/tkw2/index1.html)
- 008.`tkw3`：[パパのブルームブロック](https://voich2014.github.io/creative_coding/src/tkw3/index1.html)
- 009.`tkw4`：[パパのブロックシャワー](https://voich2014.github.io/creative_coding/src/tkw4/index2.html)

- 010.`bw`：[パパの刺繍円](https://voich2014.github.io/creative_coding/src/bw/index1.html)
- 011.`lsys2`：[パパのにょきにょき(L-System練習2)](https://voich2014.github.io/creative_coding/src/lsys2/index1.html)
- 012.`stat`：[パパのストレンジアトラクター](https://voich2014.github.io/creative_coding/src/stat/index1.html)
- 013.`kirafw`：[パパのキラキラ花火](https://voich2014.github.io/creative_coding/src/kirafw/index2.html)
- 014.`infkira`：[パパの無限大キラキラ](https://voich2014.github.io/creative_coding/src/infkira/index1.html)
- 015.`sparf`：[パパのキラキラフラワー](https://voich2014.github.io/creative_coding/src/sparf/index1.html)
- 016.`spir`：[パパの螺旋キラキラ](https://voich2014.github.io/creative_coding/src/spir/index1.html)
- 017.`bez`：[パパのキラキラワームホール](https://voich2014.github.io/creative_coding/src/bez/index1.html)
- 018.`bez2`：[パパのキラキラの壺](https://voich2014.github.io/creative_coding/src/bez2/index1.html)
- 019.`crys`：[パパのキラキラ宝石箱](https://voich2014.github.io/creative_coding/src/crys/index2.html)
- 020.`nazo`：[パパの謎のいきものたち](https://voich2014.github.io/creative_coding/src/nazo/index1.html)
- 021.`nazo2`：[パパの謎のいきものたちver.Walk](https://voich2014.github.io/creative_coding/src/nazo2/index1.html)
- 022.`warp`：[パパの無限ワープ](https://voich2014.github.io/creative_coding/src/warp/index1.html)
- 023.`alcube`：[パパのAlphaLineCube](https://voich2014.github.io/creative_coding/src/alcube/index1.html)
- 024.`sphr`：[パパのキラキラ回転水晶v3](https://voich2014.github.io/creative_coding/src/sphr/index_cr3.html)
- 025.`rope`：[パパのキラキラロープ](https://voich2014.github.io/creative_coding/src/rope/index1.html)
- 026.`kirat`：[パパのキラキラ反射文字](https://voich2014.github.io/creative_coding/src/kirat/index1.html)
- 027.`agete`：[パパの無限瑪瑙](https://voich2014.github.io/creative_coding/src/agate/index1.html)
- 028.`rose`：[パパのkawaiiバラ曲線](https://voich2014.github.io/creative_coding/src/rose/index4.html)
- 029.`gmo2`：[パパのポイントキラキラ](https://voich2014.github.io/creative_coding/src/gmo2/index1.html)
- 030.`awave2`：[パパのAlphaWave2](https://voich2014.github.io/creative_coding/src/awave2/index6.html)
- 031.`att`：[パパのウロボロスドラゴンテイル](https://voich2014.github.io/creative_coding/src/att/index2.html)
- 032.`mand`：[パパのマンデルブロ集合](https://voich2014.github.io/creative_coding/src/mand/index4.html)
 - 033.`julia`：[パパのジュリア集合](https://voich2014.github.io/creative_coding/src/julia/index2.html)
 - 034.`lenti`：[パパのレンチキュラー](https://voich2014.github.io/creative_coding/src/lenti/index2.html)
 - 035.`csph`：[パパの間違った球体](https://voich2014.github.io/creative_coding/src/csph/index1.html)
 - 036.`boo`：[パパのミニチュアぶーぶー](https://voich2014.github.io/creative_coding/src/boo/index1.html)
 - 037.`bb`：[パパの脳がバグるやつ](https://voich2014.github.io/creative_coding/src/bb/index1.html)
 - 038.`imp`：[パパの不可能図形](https://voich2014.github.io/creative_coding/src/imp/index1.html)
 - 039.`md`：[パパの数学デッサン](https://voich2014.github.io/creative_coding/src/md/index3.html)
 - 040.`earth`：[パパの球体テクスチャ](https://voich2014.github.io/creative_coding/src/earth/index1.html)
 - 041.`maze`：[パパのちっちゃい迷路](https://voich2014.github.io/creative_coding/src/maze/index1.html)
 - 042.`idomi`：[パパの無限ドミノ](https://voich2014.github.io/creative_coding/src/idomi/index5.html)
 - 043.`cube`：[パパののびるCube](https://voich2014.github.io/creative_coding/src/cube/index4.html)
 - 044.`tortun`：[パパのトーラストンネル](https://voich2014.github.io/creative_coding/src/tortun/index3.html)
 - 045.`slit`：[パパのスリットアニメ](https://voich2014.github.io/creative_coding/src/slit/index1.html)
 - 046.`wire2`：[パパのぐるぐる正方形](https://voich2014.github.io/creative_coding/src/wire2/index5.html)
 - 047.`noise`：[パパのノイズ練習１](https://voich2014.github.io/creative_coding/src/noise/index1.html)
 - 048.`noise2`：[パパのノイズ練習２](https://voich2014.github.io/creative_coding/src/noise/index2.html)
 - 049.`wire`：[パパのワイヤーフレームっぽいの](https://voich2014.github.io/creative_coding/src/wire/index3.html)
 - 050.`train`：[パパのAA Train](https://voich2014.github.io/creative_coding/src/train/index1.html)
 - 051.`mzabyss`：[パパのリアルタイムマンデルブロ深層ズーム](https://voich2014.github.io/mandel_zoom_abyss/src/)

---

## 📄 ライセンス

- 本リポジトリ内の **ソースコード（HTML/CSS/JavaScript）** は MIT ライセンスで公開されています。  
  → `LICENSE` ファイルを参照してください。

- **生成されるビジュアル作品（Canvas等のアート）** は、以下のライセンスに準拠します：  
  [CC BY-NC-SA 4.0（表示・非営利・継承）](https://creativecommons.org/licenses/by-nc-sa/4.0/)

- 引用や参考にした他の作品がある場合は、各作品の公開ライセンスに従ってください。

---

## 📫 作者

- X（旧Twitter）：[@voich2014](https://twitter.com/voich2014)  
- Bluesky：[@voich2014.bsky.social](https://bsky.app/profile/voich2014.bsky.social)  
- YouTube：[voichannel](https://www.youtube.com/@voichannel)
- BOOTH：[ぼいちWORKS](https://voichworks.booth.pm/)

