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
- main: String fighterId
- sub: String fighterId
- winningPercentage: Object
  - matches: Number
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
