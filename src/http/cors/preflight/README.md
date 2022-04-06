### 起因

1. 公司之前所有的接口都走统一的网关【卡门】
2. 不知道什么原因，负责卡门的一堆人离职了， 卡门无人维护了
3. 顺便为了解决之前网关存在的问题，公司新开发新的网关 【彩虹桥】
4. 为了推广【彩虹桥】，所以禁止后端再在【卡门】上编辑。 意味着，卡门接口开始进入全面废弃状态
5. 我这次开发中涉及到了整个收银最核心的一块【开单】，如果这个接口有问题， 基本意味着故障了，我们错误分为线上 bug【online】，是必须要日清的， 比【online】更严重的就是【故障】
6. 由于【开单】接口需要增加字段， 而【卡门】 不在允许编辑，导致我们只能迁移【彩虹桥】**最后还是回归到卡门了**

### 问题

1. 数据结构发生改变。 比如原来返回的数据类型是这样的【其实是不太合理的，但是接口比较老】

   ```JavaScript
   [camen]
   //正确返回
   {
     resposne: xxx
   }
   // 错误返回
   {
     errorMessage: xxx
   }
   [rainbow]
   {
     code: xxx,
     message:xxx,
     data:{
       xxx:xxx
     }
   }
   ```

2. 理论上，彩虹桥返回的接口才是标准类型， 但是这个老的接口涉及面非常的广，异常处理很多【上面的演示只是很少的一部分】，所以，如果直接迁移新接口， 会导致回归面非常的广。测试投入是有问题的。

3. 彩虹桥会把原来后端返回 list 类型的值给初始化， 比如一个数组， 原来是空就不返回， 现在为空 返回空数组

### 解决上述问题

1. 商量了下， 为了减少前端这边异常处理的代码， 【返回的 code 是不确定的】， 所以我们和【彩虹桥】的后端协商， 决定采用【兼容模式】，**在请求头加一个字段， 获取和原来卡门一样的接口** 【是后端为了兼容老接口做的一次努力】 【事实证明是失败的】

2. 也就是增加请求头，类似于， 'access-compatibility-mode':true, 可以，没问题， 我们封装的 api 请求是可以加请求头的， 类似于

   ```JavaScript
   api.post('url', {
     data: {

     },
     header: {
        'access-compatibility-mode':true
     },
     extraoption: {

     }
   })
   ```

### 喜出望外&丢死人了

1. 折腾了很久，【在处理彩虹桥异常模式】【其实是我想多了， 处理异常不应该在业务中处理，应该在通用接口中处理，这样其实很快】， 高高兴兴，一调接口，跑通了
2. 测试投入， 发现，接口报错， 所有请求都发不出去【我开发能发出去了， 是因为我浏览器插件】
3. ![](https://tva1.sinaimg.cn/large/007S8ZIlgy1gegfcl0lspj30i404y0t9.jpg)

并且 我明明是 post 请求，在浏览器里面查看发现就变成了 option 请求，我一脸懵， 到处问人【真的丢人，菜的丢人】

4. 针对第三点，先补充的只是【[get 和 post 的区别](https://github.com/YJD199798/Daily-Study/tree/master/topic/http/methods/get-post)】
5. 然后真正重要的是， 浏览器的预检模式
6. 以下内容，参考以下三篇博客
   1. <https://developer.mozilla.org/zh-CN/docs/Web/HTTP/Access_control_CORS>
   2. <https://stackoverflow.com/questions/32500073/request-header-field-access-control-allow-headers-is-not-allowed-by-itself-in-pr>
   3. <https://www.ruanyifeng.com/blog/2016/04/cors.html>

### 预检模式

#### 一些基础

1. 由于 ajax 只能同源请求，【所以后面才有 jsonp，nginx 反向代理这些操作】， 所以出现了 cors【w3c 标准】【cross-origin resource shareing】 跨域资源共享。 允许浏览器向跨源浏览器，发出 xmlhttprequest 请求
2. 需要浏览器和客户端同事支持。，目前，基本所有浏览器都支持，兼容性杠杠的， 【ie 不做讨论，我负责的业务线不需要考虑 ie】
3. cors 过程，由浏览器自动完成， 不需要用户参与， 开发者正常调用。**但是，浏览器一旦发现跨域，就会发送一些额外的请求头数据， 甚至多出一次请求【用户无感知】**
4. ps， 还有一些其他的情况需要 cors
   1. web 字代替， css 中通过@font-size 请求跨站自提
   2. webgl 贴图
   3. drawImage 把 image 画面会知道 canvas

#### 两种请求--简单请求和非简单请求

1. 简单请求，满足下面的两大条件【同时满足， 是与的关系， 不是或的关系】
   1. 请求方法属于
      - head
      - get
      - post
   2. http 头信息不超过下面几种
      - accept
      - accept-language
      - content-language
      - last-event-id
      - content-type 是以下三个值之一
        - Application/x-www-form-urlencoded
        - Multipart/form-data
        - Text/plain
2. 不属于上面条件的， 就是非简单请求

#### 简单请求

1. 浏览器发现是简单请求的时候，会在请求头中加一个 origin 字段，类似于

   ```javascript
   GET /cors HTTP/1.1
   Origin: http://api.bob.com
   Host: api.alice.com
   Accept-Language: en-US
   Connection: keep-alive
   User-Agent: Mozilla/5.0...
   ```

   origin 说明这个请求是来自于哪个源【协议+域名+端口】，服务器根据这个值，决定是否允许本次请求

   如果不在服务器的允许范围之内， 就会返回一个正常的 HTTP 回应， 这个回应信息里没有 Access-Contril-Allow-Origin 字段， 就会抛出一个错误， 由浏览器捕获， 在 console 中可以看到【js 代码层面是无法知道具体什么地方出错，必须在控制台中查看】

   如果服务端在服务器的允许范围内， 那么就会返回正常的数据， 并多几个响应头信息字段

   ```JavaScript
   Access-Control-Allow-Origin: http://api.bob.com
   Access-Control-Allow-Credentials: true
   Access-Control-Expose-Headers: FooBar
   Content-Type: text/html; charset=utf-8
   ```

   前三个响应头字段都和 cors 有关

2. Access-Control-Allow-Origin,这个字段是必须的， 要么是请求来源的 origin，要么是\*，代表所有域名的请求都可以接受

3. Access-Control-Allow-Credentials,这个字段是可选的， 代表是否允许发送 cookie。默认请求下， 是不会带着 cookie 一起发送的， 这个值只能设置为 true， 如果不需要， 只需要删除这个字段就可以了【反正我自己在做毕设的时候， 折腾了很久，我肯定是要 cookie 的呀， 不带 cookie 我怎么做额外的校验】

4. Access-Contorl-Expose-Headers,这个字段可选， 因为 xmlhttpRequest 对象的 getResponseHeader 方法只能拿到留个字段， 其它的额外字段， 就需要在 Access-Control-Expose-Header 中指定，

#### withCredentials

1. 因为 cors 是默认不带 cookie 传递的， 如果需要带，那么一方面要服务器支持， 设置 Access-Control-Allow-Credentials 属性为 true， 另一方面需要在发送球球的时候，指定 withCredentials 为 true，否则即使客户端允许， 也发不过去。

   **重要的在这里， 一旦允许发送 cookie， Access-Contril-Allow-Origin 就不允许设置为\*号， 必须指定明确的和请求网页一致的域名。 **【我当时就因为不知道这个怎么处理， 最后本地开发的时候用了 webpack 的 devserver 的 proxy】

#### 非简单请求

其实前面都是铺垫这里

1.

2. 简单的说， 不满足简单请求，就是非简单请求【这句话简直是智障】

3. 比如请求方法是 put，delete， 比如 content-type 字段的类型是 application/json，比如请求头加了一些额外的字段【比如我加的兼容模式的头】

4. 非简单请求会在正式通信之前，发送一次额外的 http 查询请求，也就是预检【preflight】，提前检查一次

5. 浏览器就问， 客户端大爷呀， 我的这个域名在您的白名单里面吗？ 我的方法可以用吗？ 可以的话我就请求啦。不可以的话， 就让渣渣金达去想办法吧。

6. 只有客户端允许，才会发出正式的请求，不允许，直接报错 【这里额外说一下， 跨域请求， 不是请求没法出去， 而是返回了数据被浏览器拦截了。所以你拿不到， 如果开发硬要拿到，可以装一些插件。。。】

7. 非简单请求的演示

   ```JavaScript

   var url = 'http://api.alice.com/cors';
   var xhr = new XMLHttpRequest();
   xhr.open('PUT', url, true);
   xhr.setRequestHeader('X-Custom-Header', 'value');
   xhr.send();
   ```

   一方面，方法是 put，另一方面，header 加了额外的字段。所以是非简单请求

   ```JavaScript
   OPTIONS /cors HTTP/1.1
   Origin: http://api.bob.com
   Access-Control-Request-Method: PUT
   Access-Control-Request-Headers: X-Custom-Header
   Host: api.alice.com
   Accept-Language: en-US
   Connection: keep-alive
   User-Agent: Mozilla/5.0...
   ```

   增加了额外的两个请求头

#### Access-Control-Request-Method 必须，代表浏览器的 cores 请求会用到哪几种方法

#### Access-Control-Request-Headers 必须，是用逗号分割的字符串，代表 cors 会额外发送的头信息

#### 回应

服务器收到"预检"请求以后，检查了`Origin`、`Access-Control-Request-Method`和`Access-Control-Request-Headers`字段以后，确认允许跨源请求，就可以做出回应。

> ```http
> HTTP/1.1 200 OK
> Date: Mon, 01 Dec 2008 01:15:39 GMT
> Server: Apache/2.0.61 (Unix)
> Access-Control-Allow-Origin: http://api.bob.com
> Access-Control-Allow-Methods: GET, POST, PUT
> Access-Control-Allow-Headers: X-Custom-Header
> Content-Type: text/html; charset=utf-8
> Content-Encoding: gzip
> Content-Length: 0
> Keep-Alive: timeout=2, max=100
> Connection: Keep-Alive
> Content-Type: text/plain
> ```

上面的 HTTP 回应中，关键的是`Access-Control-Allow-Origin`字段，表示`http://api.bob.com`可以请求数据。该字段也可以设为星号，表示同意任意跨源请求。

> ```http
> Access-Control-Allow-Origin: *
> ```

如果服务器否定了"预检"请求，会返回一个正常的 HTTP 回应，但是没有任何 CORS 相关的头信息字段。这时，浏览器就会认定，服务器不同意预检请求，因此触发一个错误，被`XMLHttpRequest`对象的`onerror`回调函数捕获。控制台会打印出如下的报错信息。

> ```bash
> XMLHttpRequest cannot load http://api.alice.com.
> Origin http://api.bob.com is not allowed by Access-Control-Allow-Origin.
> ```

服务器回应的其他 CORS 相关字段如下。

> ```http
> Access-Control-Allow-Methods: GET, POST, PUT
> Access-Control-Allow-Headers: X-Custom-Header
> Access-Control-Allow-Credentials: true
> Access-Control-Max-Age: 1728000
> ```

**（1）Access-Control-Allow-Methods**

该字段必需，它的值是逗号分隔的一个字符串，表明服务器支持的所有跨域请求的方法。注意，返回的是所有支持的方法，而不单是浏览器请求的那个方法。这是为了避免多次"预检"请求。

**（2）Access-Control-Allow-Headers**

如果浏览器请求包括`Access-Control-Request-Headers`字段，则`Access-Control-Allow-Headers`字段是必需的。它也是一个逗号分隔的字符串，表明服务器支持的所有头信息字段，不限于浏览器在"预检"中请求的字段。

**（3）Access-Control-Allow-Credentials**

该字段与简单请求时的含义相同。

**（4）Access-Control-Max-Age**

该字段可选，用来指定本次预检请求的有效期，单位为秒。上面结果中，有效期是 20 天（1728000 秒），即允许缓存该条回应 1728000 秒（即 20 天），在此期间，不用发出另一条预检请求。

### 浏览器的正常请求

1. 一旦通过了预检模式，就开始正常的发送请求了，头信息的 origin 字段是浏览器自动添加的，

### 与 jsonp 的区别

比 Jsonp 更加强大，Jsonp 只支持 get 请求

#### 如何解决 cors 预检错误

1. 实际请求变成简单请求【我们不行， 必要要走兼容模式，要不异常处理有点多】
2. 服务端去除预检请求的重定向【我们也不行，彩虹桥是整个公司用的， 不可能单独为我们开口子【一旦开了口，后面刹不住，绝对不行，哪怕我一个前端都觉得不太行】】

### 最终解决

1. 长期解决方案， 如果【彩虹桥】已经成为唯一选择【不用如果了，真的是唯一了】，我们就需要在请求的时候统一处理， 针对不同状态码， 获取不同的数据， 向下透传， 统一处理错误信息

   ```JavaScript
   {
     code:200,
     message:'success',
     data: {

     }
   }
   判断是200的时候，把data和相关code传递给业务层面
   如果不是200，根据不同错误码，抛错【状态码已经规定了】
   ```

2. 短期解决，强行在卡门上配置。。。嘿嘿嘿。。

#### 总而言之，言而总之。 真丢人
