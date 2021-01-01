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
  - loses: Number -->
<!-- - selfIntroduction: String -->
<!-- - isPrivateAccount: Boolean -->
<!-- - smashmateRating: Number -->
<!-- - voicechats: Array [discord, line, nintendo online, skype] -->

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
