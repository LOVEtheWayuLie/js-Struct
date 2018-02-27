# js-Struct
js下的数据结构定义工具

## 水平有限,它还在成长, 欢迎提建议。

### 开发原因
 - 在开发中，经常遇到数据校验，需要一个简单的，精准的优雅校验数据库对一些数据进行校验。
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
  s.validate({code: 2}); //false， 提示deep.msg: 必须是字符串
  
  // 如上定义了一个object结构。 code只允许1或者2， msg必须是string。
  
  s.formatData({}); // {code: 1, deep: {msg: '默认值'}} 根据数据结构返回默认数据结构, 若未设置default则该位置返回undefined.
```
