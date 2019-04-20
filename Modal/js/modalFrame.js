// 创建一个立即调用的函数表达式来包装代码
(function () {
    // 定义构造器
    this.Modal = function () {
        // 创建引用的全局元素
        this.closeBtn = null;       // 关闭按钮
        this.modal = null;          // 模态弹出框
        this.overlay = null;        // 模态弹出框蒙层

        // 确定正确的私有前缀
        this.transitionEnd = transitionSelect();

        // 自定义默认选项
        var defaults = {
            autoOpen: false,                    // 是否自动打开弹窗
            className: 'fade-and-drap',         // 默认动画
            closeBtn: true,                     // 右上角关闭按钮
            content: '',                        // 内容
            maxWidth: 600,                      // 最大宽度
            minWidth: 280,                      // 最小宽度
            overlay: true,                      // 是否开启蒙层
            confirmBtn: false,                  // 是否开启确认按钮
            confirmFun: false,                  // 是否给确认按钮传入回调函数
            cancelBtn: false,                   // 是否开启取消按钮
            cancelFun: false                    // 是否给取消按钮传入回调函数
        }

        // 通过扩展 arguments 中传递的缺省值来创建选项
        if (arguments[0] && typeof arguments[0] === 'object') {
            this.options = extendDefaults(defaults, arguments[0]);
        }

        if (this.options.autoOpen === true) this.open();
    }

    // 公有方法
    // 打开弹框
    Modal.prototype.open = function () {
        // 创建Modal
        buildOut.call(this);

        // 初始化事件侦听器
        initialzeEvents.call(this);

        // 向DOM中添加元素之后，使用getComputedStyle强制浏览器重新计算并识别刚刚添加的元素，这样CSS动画就有了一个起点
        window.getComputedStyle(this.modal).height;

        // 检查Modal的高度是否比窗口高，如果是则添加modal-open 和 modal-anchored类名，否则添加modal-open类 
        this.modal.className = this.modal.className + (this.modal.offsetHeight > window.innerHeight ? ' modal-open modal-anchored' : ' modal-open');

        this.overlay.className = this.overlay.className + ' modal-open';
    }

    // 关闭弹框
    Modal.prototype.close = function () {
        // 存储this
        var $this = this;
        // 移除打开模态框时添加的类名
        this.modal.className = this.modal.className.replace(' modal-open', '');
        this.overlay.className = this.overlay.className.replace(' modal-open', '');

        // 监听css的transitionEnd事件，然后从DOM中删除节点
        this.modal.addEventListener(this.transitionEnd, function () {
            $this.modal.parentNode.removeChild($this.modal);
        });

        this.overlay.addEventListener(this.transitionEnd, function () {
            if ($this.overlay.parentNode) {
                $this.overlay.parentNode.removeChild($this.overlay);
            }
        });
    }

    // 私有方法
    // 根据自定义选项来构建一个模态框
    function buildOut() {
        var _this = this;
        var content, contentHolder, docFrag;

        // 判读内容是HTML，则追加HTML字符串；如果内容不是HTML，则追加内容
        if (typeof this.options.content === 'string') {
            content = this.options.content;
        } else {
            content = this.options.content.innerHTML;
        }

        // 创建一个 文档片段
        docFrag = document.createDocumentFragment();

        // 创建modal元素
        this.modal = document.createElement('div');
        this.modal.className = 'modal ' + this.options.className;
        this.modal.style.minWidth = this.options.minWidth + 'px';
        this.modal.style.maxWidth = this.options.maxWidth + 'px';

        // 判断cancelBtn的值如果为true，则添加取消按钮
        if (this.options.cancelBtn === true) {
            this.cancelBtn = document.createElement('button');
            this.cancelBtn.className = 'btn btn-text cancelBtn-location';
            this.cancelBtn.innerHTML = '取消';
            this.cancelBtn.addEventListener('click', function () {
                if (_this.options.cancelFun) {
                    _this.options.cancelFun();
                }
            });
            this.modal.appendChild(this.cancelBtn);
        }

        // 判断confirmBtn的值如果为true，则添加确认按钮
        if (this.options.confirmBtn === true) {
            this.confirmBtn = document.createElement('button');
            this.confirmBtn.className = 'btn btn-primary confirmBtn-location';
            this.confirmBtn.innerHTML = '确认';
            this.confirmBtn.addEventListener('click', function () {
                if (_this.options.confirmFun) {
                    _this.options.confirmFun();
                }
            });
            this.modal.appendChild(this.confirmBtn);
        }

        // 判断closeBtn的值如果为true则添加close按钮
        if (this.options.closeBtn === true) {
            this.closeBtn = document.createElement('button');
            this.closeBtn.className = 'modal-close close-button';
            this.closeBtn.innerHTML = '&#10006';
            this.modal.appendChild(this.closeBtn);
        }

        // 判断overlay的值如果为true，则添加蒙层
        if (this.options.overlay === true) {
            this.overlay = document.createElement('div');
            this.overlay.className = 'modal-overlay ' + this.options.className;
            docFrag.appendChild(this.overlay);
        }

        // 创建内容区域，并添加到modal中
        contentHolder = document.createElement('div');
        contentHolder.className = 'modal-content';
        contentHolder.innerHTML = content;
        this.modal.appendChild(contentHolder);

        // 把modal插入到文档片段中
        docFrag.appendChild(this.modal);

        // 把文档片段中插入body中
        document.body.appendChild(docFrag);
    }

    // 模态框过渡效果
    function transitionSelect() {
        var el = document.createElement('div');

        if (el.style.WebkitTransition) {
            return 'WebkitTransition';
        }
        return 'transitionend';
    }

    // 使用用户选扩展默认值的方法
    function extendDefaults(source, properties) {
        var proerty;
        for (proerty in properties) {
            if (properties.hasOwnProperty(proerty)) {
                source[proerty] = properties[proerty];
            }
        }
        return source;
    }

    // 初始化事件监听器
    function initialzeEvents() {
        // 右上角关闭按钮
        if (this.closeBtn) {
            this.closeBtn.addEventListener('click', this.close.bind(this));
        }
        // 蒙层
        if (this.overlay) {
            this.overlay.addEventListener('click', this.close.bind(this));
        }
        // 确认按钮
        if (this.confirmBtn) {
            this.confirmBtn.addEventListener('click', this.close.bind(this));
        }
        // 取消按钮
        if (this.cancelBtn) {
            this.cancelBtn.addEventListener('click', this.close.bind(this));
        }
    }
}())