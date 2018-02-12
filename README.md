# js-Struct
js下的数据结构定义工具
水平有限,欢迎交流,轻喷。

### 数据结构
您可以使用Struct.type 查看内置的数据结构.
也可以使用Struct.define(name, function(){})自定义.


### 使用方式
var s = new Struct({code: Struct.type.enum(1,2).default(1), deep: {msg: Struct.type.string.default('默认值')}});
如上定义了一个object结构。 code只允许1或者2， msg必须是string。
s.validate({code: 2}); 返回false。提示deep.msg: 必须是字符串
