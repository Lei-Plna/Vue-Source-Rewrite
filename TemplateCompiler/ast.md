# ast: Abstract Syntax Tree 抽象语法树

## 抽象语法树案例
以下是一个简单的函数的抽象语法树
```js
{
  "type": "Program",
  "body": [
    {
      "type": "FunctionDeclaration",
      "id": {
        "type": "Identifier",
        "name": "fn"
      },
      "params": [],
      "body": {
        "type": "BlockStatement",
        "body": []
      },
      // generator: 是否是生成器函数
      "generator": false,
      // expression: 是否是表达式
      "expression": false,
      // async: 是否是异步函数
      "async": false
    }
  ],
  "sourceType": "script"
}
```

## 虚拟DOM节点

```js
{
  tag: 'div',
  type: 1,
  attrs: [
    {
      name: 'class',
      value: 'container'
    }
  ],
  children: [
    {
      tag: 'span',
      type: 1,
      children: [
        {
          tag: 'text',
          type: 3,
          text: 'hello'
        }
      ]
    }
  ]
}
```