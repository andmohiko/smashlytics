# firestore 設計

- [users](#users)
- [records](#records)

## users

### 概要

- ユーザ
- ID: userId

### 詳細

- createdAt: Timestamp 作成した時間
- updatedAt: Timestamp 更新した時間
- userId: String
- authId: String
- username: String
- twitterId: String
<!-- - friendCode: String -->
- main: String fighterId
- sub: String fighterId
<!-- - winningPercentage: Object
  - wins: Number
  - loses: Number
- friendCode: String
- selfIntroduction: String
- smashmateRating: Number
- mainPlayingTime: String
- voiceChat: map
  - discord: Boolean
  - line: Boolean
  - nintendoOnline: Boolean
  - skype: Boolean
  - listenOnly: Boolean
  - ng: Boolean
<!-- - playStyle: map
  - 
  tournament/oneOnOne
  - items: String on/off -->
<!-- - privateSettings: Map
  - isPrivate: Boolean
  - showProfile: Boolean
  - showLatestGlobalSmashPower: Boolean
  - showWinningRate: Boolean
  - showAnalytics: Boolean -->


## records

### 概要

- 戦績
- ID: 自動id

### 詳細

- createdAt: Timestamp 作成した時間
- updatedAt: Timestamp 更新した時間
- userId: String ユーザ名
- fighter: String 自分のファイター
- fighterId: String 自分のファイターID
- opponent: String 自分のファイター
- opponentId: String 自分のファイターID
- result: Boolean 勝ち/負け
- stage: String ステージ
- globalSmashPower: Number 世界戦闘力
- isRepeat: Boolean 連戦かどうか
- isVip: Boolean VIPかどうか
<!-- - stocksTaken: map
  - own: number 自分のストックを落とされた数
  - opponent: number 相手のストックを落とした数
- roomType: String online|arena
- against: String 相手の名前
- againstUserId: String 相手のユーザID -->
