# js-Struct
js下的数据结构定义工具

## 水平有限,它还在成长, 欢迎留言交流提建议。

### 开发原因
 - 在开发中，经常遇到数据校验，需要一个简单的，精准,优雅的数据校验库对一些数据进行校验。
 - 场景如下:
    + 配置文件校验， 尤其是多层次复杂object结构。
    + 与他人对接的数据校验
    + 接口参数的校验
    + 格式化出一个符合要求的数据结构
    + and so on...

### 数据结构
您可以使用Struct.type 查看内置的数据类型.
 
  > 已有的数据类型
  * enum
  * string
  * number
  * int
  * bool
  * array
  * jsonString
  * 也可以使用Struct.define(name, function(){})自定义.


### 使用方式
```js
  var s = new Struct({
      code: Struct.type.enum(1,2).default(1), 
      deep: {
          msg: Struct.type.string.default('默认值')
      }
  });
  s.validate({code: 2}); //false， deep.msg: The parameter must be a string
  
  // 如上定义了一个object结构。 code只允许1或者2， msg必须是string。
  
  s.formatData({}); // {code: 1, deep: {msg: '默认值'}} 根据数据结构返回默认数据结构, 若未设置default则该位置返回undefined.
```

### 进阶用法

你可能希望将结构分别定义，然后组装起来。

```js
  var s1 = new Struct({
      code: Struct.type.enum(1).default(1)
  });
  var b = new Struct({
      parent: Struct.type.int.default(0), ss: s1
  });
  b.formatData(); // {parent: 0, ss: {code: 1}}
```

### 可能会遇到疑惑

我想固定一个值, 比如我下希望{'statu说明': '0关闭, 1打开'}。

直接写上你希望的结果就可以了。

你可以借用这种形式来作为数据结构的代码注释。

```js
   var a = new Struct({
      statu: Struct.type.enum(0, 1).default(0),
      'statuExplain': '0关闭, 1打开'
  });
  a.formatData(); // {statu: 0, 'statuExplain': '0关闭, 1打开'}
```

如果你传的值符合定义的结构，就会被保留下来。
