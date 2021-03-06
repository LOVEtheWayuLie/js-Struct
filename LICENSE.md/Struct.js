/*=======================*/
/*js数据结构*/
"use strict";
(function ()
{/*
  缩写解释
  t = type 数据类型
  s = struct 数据结构
  p = param 参数
*/
  function getType(obj)
  {
     //tostring会返回对应不同的标签的构造函数
     var toString = Object.prototype.toString;
     var map = {
        '[object Boolean]'  : 'boolean',
        '[object Number]'   : 'number',
        '[object String]'   : 'string',
        '[object Function]' : 'function',
        '[object Array]'    : 'array',
        '[object Date]'     : 'date',
        '[object RegExp]'   : 'regExp',
        '[object Undefined]': 'undefined',
        '[object Null]'     : 'null',
        '[object Object]'   : 'object'
    };
    if(obj instanceof Element) {
         return 'element';
    }
    return map[toString.call(obj)];
  }
  function isFunction(fn)
  {/*判断function*/
     return getType(fn)=== 'function';
  }
  function isString(fn)
  {/*判断字符串*/
     return getType(fn)=== 'string';
  }
  function isNumber(fn)
  {/*判断数字*/
     return getType(fn)=== 'number' && !isNaN(fn);
  }
  function isBoolean(fn)
  {/*判断布尔*/
     return getType(fn)=== 'boolean]';
  }
  function isArray(fn)
  {/*判断数组*/
     return getType(fn)=== 'array';
  }
  function isObject(fn)
  {/*判断为object对象*/
     return getType(fn)=== 'object';
  }
  function isJsonString(fn)
  {/*判断json字符串*/
     return isObject(JSON.parse(fn))=== true;
  }
  function deepClone(data)
  {/*深度拷贝*/
     var type = getType(data);
     var obj;
     if(type === 'array'){
         obj = [];
     } else if(type === 'object'){
         obj = {};
     } else {
         //不再具有下一层次
         return data;
     }
     if(type === 'array'){
         for(var i = 0, len = data.length; i < len; i++){
             obj.push(deepClone(data[i]));
         }
     } else if(type === 'object'){
         for(var key in data){
             obj[key] = deepClone(data[key]);
         }
     }
     return obj;
  }
  function s (structure)
  {/*数据结构*/
    if (this instanceof s === false)
    {
      return new s();
    }
    var self = this;
    self._structure = structure;
  };
  s.prototype._check = function (operation, st, data, k_name)
  {/*operation 有2中 formatData or validate*/
    var result = true
      , errors = []
      , new_data = deepClone(data)
      , now_data = new_data;
    check(operation, st, data, k_name);
    for (var i=0; i<errors.length; i++)
    {
      console.log(errors[i]);
    }
    self.errors = errors;
    if (operation === 'validate') return result;
    if (operation === 'formatData') return new_data;
    function check(operation, st, data, k_name)
    {/*开始检查*/
      for (var key in st)
      {/*遍历结构*/
        var type = st[key]
          , v = data[key];
        if (st[key] instanceof t)
        {/*先判断是有效的type类型*/
          for (var i=0; i<type._tasks.length; i++)
          {/*遍历需要判断的类型*/
            if (type._tasks[i](v) === false)
            {
              var name = type._tasks[i].__name__
                , er = (k_name !== undefined? k_name + '.': '') + key + ' : ' + s.errorMap[name]
                , df = type._default;
              now_data[key] = df;
              errors.push(er);
              result = false;
            }
          }
        } else if (isObject(st[key]))
        {/*object深度遍历*/
          var d= isObject(data[key]) === false ? {}: data[key];
          if (isObject(data[key]) === false)
          {
            new_data[key] = {};
          };
          now_data = new_data[key];
          check(operation, st[key], d, k_name !== undefined? k_name + '.'+ key : key);
        }
      }
    }
  };
  s.prototype.formatData = function (data)
  {/*根据default格式化数据*/
    var self = this;
    return self._check('formatData', self._structure, data);
  };
  s.prototype.validate = function (data)
  {/*验证数据*/
    var self = this
      , struct = self._structure
      , result = true;
    result = self._check('validate', struct, data);
    return result;
  };
  var t = function ()
  {/*数据类型*/
    if (this instanceof t === false)
    {
      return new t();
    }
    var self = this;
    self._tasks = [];
    self._default = undefined;
  };
  Object.defineProperty(t.prototype, 'default',
  {/*定义默认值*/
    enumerable: true,
    configurable: false,
    get: function ()
    {
      return function(p)
      {
        this._default = p;
        return this;
      }
    }
  });
  t.method = function (name, checker, hasParam)
  {/*注册类型*/
    if (hasParam === true)
    {/*有参数类型*/
      Object.defineProperty(t.prototype, name,
      {
        enumerable: true,
        configurable: false,
        get: function ()
        {
          if (!isFunction(checker())) throw 'The type that defines a parameter must be function return function';
          return function ()
          {
            var _c = checker.apply(null, arguments);
            _c.__name__ = name;
            this._tasks.push(_c);
            return this;
          };
        }
      })
    } else
    {/*无参数类型*/
      Object.defineProperty(t.prototype, name,
      {
        enumerable: true,
        configurable: false,
        get: function ()
        {
          checker.__name__ = name;
          this._tasks.push(checker);
          return this;
        }
      })
    }
  };
  t.method('enum', function ()
  {/*枚举*/
    var arr = Array.prototype.slice.apply(arguments);
    return function (param)
    {
      return arr.indexOf(param) > -1;
    }
  }, true);
  t.method('string', function (p)
  {/*字符串*/
    return isString(p) === true;
  });
  t.method('number', function (p)
  {/*字符串*/
    return isNumber(p) === true;
  });
  t.method('int', function (p)
  {/*整型*/
    return isNumber(p) && (p%1 === 0);
  });
  t.method('bool', function (p)
  {/*布尔true or false*/
    return isBoolean(p) === true;
  });
  t.method('array', function (p)
  {/*数组*/
    return isArray(p) === true;
  });
  t.method('jsonString', function (p)
  {/*json*/
    return isJsonString === true;
  });
  t.errorMap = {
  /*错误对照表*/
    'enum': 'The parameter must be a member of the enum',
    'string': 'The parameter must be a string',
    'number': 'The parameter must be a number and not NaN',
    'int': 'The parameter must be a int',
    'bool': 'The parameter must be a bool',
    'array': 'The parameter must be a array',
    'jsonString': 'The parameter must be a jsonString'
  };
  Object.defineProperty(s, 'type',
  {
    enumerable: true,
    configurable: false,
    get: function ()
    {
      return new t();
    }
  });
  s.define = t.method; //开放自定义接口
  s.errorMap = t.errorMap; //错误对照表
  window.Struct = s;
})();
