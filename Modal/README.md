# 模态框  
> 使用模态框，通过 **new** 关键字就可以创建一个模态框，然后把这个新创建的模态框对象赋值给一个变量，就可以了，比如：**myModal**  

`var myModal = new Modal();`  

> 在Modal插件中创建了两个公共方法，**open()** 和 **close()**。如果要调用这两个方法，可以使用 **myModal.open()**。  
>>  但是这样会报错！  

> Modal 插件中提供了 **options(一些关于模态框插件的默认选项)**，需要给模态框传入一些参数，比如：  

```
var myModal = new Modal({
    content: '<p>这是一个模态框</p>'
});

myModal.open();
```

> 这样就可以正常使用了。

## Modal 配置  
|   选项    |   描述    |   默认状态    |   备注    |  
| --------- |:--------:| ------------- | -------- |
|autoOpen   |   是否自动打开弹窗    |   false   |  
|className  |   默认动画           |   fade-and-drap    |  
|closeBtn   |   关闭按钮           |    true    |  
|content    |   内容               |    空字符串    |  
|maxWidth   |   最大宽度           |    600 |   默认单位是px    |  
|minWidth   |   最小宽度           |    280 |   默认单位是px    |  
|overlay    |   是否开启蒙层        |   tue |  
