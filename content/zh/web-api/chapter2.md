---
title: '第2章 EndPoint設計與請求形式'
description: '第2章 EndPoint設計與請求形式'
position: 202
category: Web API的設計與開發
menuTitle: 'Chapter 02'
contributors: ['changemyminds', 'spyua']
---

## 2.1 設計通過API公開的功能

SNS在線服務功能

- 使用者註冊
- 登入
- 獲取自己的資訊
- 更新自己的資訊
- 取得使用者資訊
- 搜尋使用者
- 添加好友
- 刪除好友
- 取得好友列表
- 搜尋好友
- 發送消息
- 取得好友的訊息
- 編輯訊息
- 刪除訊息
- 好友動態列表
- 特定用的動態列表
- 發表動態訊息
- 編輯動態訊息
- 刪除動態訊息

## 2.2 API EndPoint的設計思想

#### EndPoint的基本設計

怎麼設計一個優秀的URI，有一個重要的原則

> 容易記憶，URI包含的功能一目了然
> 

💡**容易記憶的原則如下**

- 短小便於輸入的URI
- 人可以讀懂的URI
- 沒有大小寫混用的URI
- 修改方便的URI
- 不會曝露伺服器架構的URI
- 規則統一的URI

1. 短小便於輸入的URI

    💀 反例
    
    ```bash
    http://api.example.com/service/api/search
    ```
    
    💡 正例
    
    ```bash
    http://api.example.com/search
    ```
    
    ✅ 結論
    
    > 將URI使用短小、簡單的方式進行表達，更易於理解和記憶。
    > 

2. 人可以讀懂的URI

    💀 反例
    
    ```bash
    http://api.example.com/sv/u
    ```
    
    💡 正例
    
    ```bash
    http://api.example.com/products/12345
    ```
    
    📦 補充
    
    API的設計查詢時，該使用`search`還是`find`詞彙?
    
    通常使用`search`來表示，`search`表示在某個地方尋找，而`find`則是尋找某個特定物品。
    
    ✅ 結論
    
    > 盡量少用縮寫，適當的使用完整的英文單字來表示。
    > 

3. 沒有大小寫混用的URI

    💀 反例
    
    ```bash
    http://api.example.com/Users/12345
    http://example.com/API/getUserName
    ```
    
    💡 正例
    
    ```bash
    http://api.example.com/users/12345
    ```
    
    📦 補充
    
    如果遇到兩種大小寫的URI進行混用時，應該如何進行處理?
    
    ```bash
    http://example.com/USERS/12345
    http://example.com/users/12345
    ```
    
    在普通的Web網站下，如果採用了不論大小寫都會返回相同的結果會出現一種問題，會導致Google等搜尋引    擎會認為有多個頁面返回了相同的結果而導致網站排名進行下降。
    
    參考下列服務，當遇到大寫字母的URI時，會自動返回404
    在線服務     | 處理混有大寫字母的URL  |
    ------------|:-----:|
    Foursqare    | 出錯404 |
    Github       | 出錯404 |
    Tumblr       | 出錯404 |

    ✅ 結論
    
    > 盡量不要使用大小寫字母混用會造成API難以理解，一般標準的做法是，統一使用小寫的URI。
    >

4. 修改方便的URI

    修改方便在英語文語意為`Hackable`。修改方便的URI指的是能將某個URI非常容易修改為另外一個URI。    通常應用在獲取某種商品。
    
    💀 反例
    
    按照資料庫的資料表進行結構區分，例如: 1 ~ 300000儲存到alpha資表表內。
    
    ```bash
    # ID的範圍 1 ~ 300000
    http://api.example.com/v1/items/alpha/:id
    
    # ID的範圍 400001 ~ 500000
    http://api.example.com/v1/items/beta/:id
    
    # ID的範圍 500001 ~ 700000
    http://api.example.com/v1/items/gamma/:id
    
    # ID的範圍 700001 ~
    http://api.example.com/v1/items/delta/:id
    ```
    
    💡 正例
    
    ```bash
    http://api.example.com/v1/items/123456
    ```
    
    ✅ 結論
    
    > 盡量讓URI的延展性佳(這邊指的是/items/{id})，可以藉由輸入不同的編號，來修改URI，而不是必須    要去猜測。
    > 

5. 不會曝露伺服器架構的URI

    💀 反例
    
    ```bash
    http://api.example.com/cgi-bin/get_user.php?user=100
    ```
    
    💡 正例
    
    ```bash
    http://api.example.com/user/100
    ```
    
    ✅ 結論

    > 不要將無意義的資訊暴露出來。例如:  
    > 1. `cgi-bin`，可以猜測你可能是使用CGI的方式運行。
    > 2. `get_user.php`，可以猜測你可能是使用php進行撰寫。
    > 
6. 規則統一的URI

    💀 反例
    
    ```bash
    # 獲取好友資訊
    http://api.example.com/friends?id=100
    
    # 發送好友資訊
    http://api.example.com/friend/100/message
    ```
    
    💡 正例
    
    ```bash
    # 獲取好友資訊
    http://api.example.com/friends/100
    
    # 發送好友資訊
    http://api.example.com/friends/100/message
    ```
    
    ✅ 結論
    
    > 統一URI的設計，讓使用者易於理解。

## 2.3 HTTP方法和EndPoint

方法名稱     | 說明  |
------------|:-----:|
GET    | 獲取資源 |
POST       | 新增資源 |
PUT       | 更新已有資源 |
DELETE       | 刪除資源 |
PATCH       | 更新部分資源 |
HEAD       | 獲取資源的Metadata資訊 |

> Metedata為描述資料的資料，舉例：描述HTML5這份文件的資料。 <br>
> Metedata不會呈現在畫面上，只會給瀏覽器和搜尋引擎查看。 <br>
> https://ithelp.ithome.com.tw/articles/10237545 <br>

## 2.4 API端點的設計


目的     | EndPoint  | 方法 | 其他相同 |
------------|:-----:|:-----:|:-----:|
使用者註冊      | http://api.example.com/v1/users <br> http://api.example.com/v1/auth/sign <br> http://api.example.com/v1/auth/register | POST | 其他相同 |
登入           | http://api.example.com/v1/auth/login | POST | |
獲取自己的資訊  | http://api.example.com/v1/users/me <br> http://api.example.com/v1/auth/me | GET | |
更新自己的資訊  | http://api.example.com/v1/users/me <br> http://api.example.com/v1/auth/me | PUT | |
取得使用者資訊  | http://api.example.com/v1/users/:id <br> http://api.example.com/v1/users/{id} | GET | 搜尋使用者 |
取得使用者列表  | http://api.example.com/v1/users | GET | |
取得好友列表  | http://api.example.com/v1/users/:id/friends | GET | |
添加好友        | http://api.example.com/v1/users/:id/friends | POST | |
刪除好友        | http://api.example.com/v1/users/:id/friends/:id | DELETE | |
搜尋好友        | http://api.example.com/v1/users/:id/friends/:id | GET | |
發送消息        | http://api.example.com/v1/friends/:id/message | POST | |
取得好友的訊息        | http://api.example.com/v1/friends/:id | GET | |
編輯訊息        | http://api.example.com/v1/friends/:id | PUT | |
刪除訊息        | http://api.example.com/v1/friends/:id | DELETE | |
好友動態列表        | http://api.example.com/v1/users/:id/friends/updates | GET | |
取得特定使用者的動態訊息        | http://api.example.com/v1/users/:id/updates | GET | |
發表動態訊息        | http://api.example.com/v1/updates | POST | |
編輯動態訊息        | http://api.example.com/v1/updates/:id | PUT | |
刪除動態訊息        | http://api.example.com/v1/updates/:id | DELETE | |

 > `:id`為佔位符號

### 2.4.1 訪問資源的EndPoint設計的注意事項

1. 使用名詞的複數形式
    - `URI`表示資源的集合
    - `HTTP`方法表示一般動詞

2. 注意所用的單字<br>
    例如: `search`和`find`兩者中，該選用哪種比較好?
    
    > API一般設計採用`search`
      
    可以從👇網站查看各種API範例
    [ProgrammableWeb](https://www.programmableweb.com/)

3. 不使用空格以及需要編碼的字串<br>
    當URI裡存在無法直接使用的字串時，則需要使用到百分號編碼（英語：Percent-encoding），又稱：URL編碼（*URL encoding*）。
    例如： `%E3%81%82`。

4️. 使用連接符來連接多個單字，基本上連接字串的方式總共有三種寫法。

- S**pinal-Case寫法**

    一般稱為脊柱形命名法。
    
    ```
    http://api.example.com/v1/users/12345/profile-image
    ```

- Snake Case**寫法**

    一般稱為蛇型命名法。
    
    ```
    http://api.example.com/v1/users/12345/profile_image
    ```

- Camel Case寫法

    一般稱為駝峰命名法。
    
    ```
    http://api.example.com/v1/users/12345/profileImage
    ```
    
<aside>   

💡 這三種寫法中，網路上最推薦Spinal-Case的方法，其中一個原因是因為Google推薦使用。

</aside>

另外最好在URI中使用多個單字，例如不要使用`popular_users`，而是使用`users/popular`用路徑那樣子來劃分。

## 2.5 搜尋與查詢參數的設計

### 2.5.1 獲取資料量和獲取位置的查詢參數

當資料量很龐大的時候，例如 👇 使用者資料列表API，如果今天是FB等級的使用者，那可能有好幾億，這樣一次把所有數值吐回來是不可能達成的，因此可以採用分頁(Pagination)來處理。

```
http://api.example.com/v1/users
```

> 分頁的使用，一般可以透過SQL中`limit`和`offset`數值來產生。

- 各大服務查詢的方式
    - 資料量 使用`limit`、`count`、`per_page`
    - 資料位置 使用`page`、`offset`、`cursor`

![001](https://military-share-82c.notion.site/image/https%3A%2F%2Fs3-us-west-2.amazonaws.com%2Fsecure.notion-static.com%2F2d9a6bfd-d6c2-4c99-b6ed-843469653bad%2FUntitled.png?table=block&id=158287f6-0e24-4ad3-8da3-b761bdff3043&spaceId=7cddc0b4-9d6b-472a-acd3-0cab4ea53d17&width=1590&userId=&cache=v2)

<aside>

一般來說 `per_page` 和`page`會一起出現，而`limit`和`offset`會成對出現。

</aside>

- 分頁的舉例
1頁可以容納50條紀錄，當要取第三頁(從101開始)的資料時，該怎麼撰寫呢?
```
per_page=50&page=3

limit=50&offset=100
```

<aside>

💡 一般`page`從1開始(1-based)計數，而`offset`則從0開始(0-based)計數。

</aside>

### 2.5.2 使用相對位置存在的問題
當使用`offset`或`limit`來取得指定的資料位置時，其實都是要從頭開始數第幾條，每次都要從第1條資料開始計數，因此效能較差。

- 從頭開始計數
![002](https://military-share-82c.notion.site/image/https%3A%2F%2Fs3-us-west-2.amazonaws.com%2Fsecure.notion-static.com%2F4ac448fb-50c5-4c6e-91d5-9ddc8c249e69%2FUntitled.png?table=block&id=74605e3e-b17f-43a3-8d95-74de1f7a68a2&spaceId=7cddc0b4-9d6b-472a-acd3-0cab4ea53d17&width=1120&userId=&cache=v2)

- 當資料更新的頻率比較高的時候，會導致當前獲取資料出現一定的偏差。
![003](https://military-share-82c.notion.site/image/https%3A%2F%2Fs3-us-west-2.amazonaws.com%2Fsecure.notion-static.com%2Fd5d28ba3-3a36-418a-87c4-941043ce2cc8%2FUntitled.png?table=block&id=0c282def-8acc-4d50-b940-055399e49605&spaceId=7cddc0b4-9d6b-472a-acd3-0cab4ea53d17&width=1120&userId=&cache=v2)

### 2.5.3 使用絕對位置來取得資料
可以透過指"定某個ID之前"或"某個日期之前"等條件，來解決相對應位置取得資料的問題。

例如：Twiiter的API中的`max_id`、YouTube中的`publishedBefore`。

### 2.5.4 使用參數來過濾
以下例子使用Linkedin的People Search API舉例。

```
http://api.linkedin.com/v1/people-search?first-name=Clair

http://api.linkedin.com/v1/people-search?last-name=Clair

http://api.linkedin.com/v1/people-search?school-name=Shermer&20High%20School
```

### 2.5.5 查詢參數和路徑的使用區別
到底該把參數附加在查詢參數裡面? 還是放在路徑裡呢? 可以依據下列兩點來解釋

- 是否可以表示唯一資源所需的資訊

```
http://api.example.com/v1/users/10
```

- 是否可以省略


### 分頁的額外補充

- 請求
    - `perPage` 每個頁面的大小(每個頁面的項目)
    - `page` 目前頁面的編號

```
http://api.example.com/v1/users?page=3&perPage=50
```

- 回應
    - `currentPage` 目前頁面的編號
    - `pageSize` 每個頁面的大小(每個頁面的項目)
    - `totalPages` 頁面總數量
    - `totalItems`  項目的總數量
    - `items` 目前頁面上的項目