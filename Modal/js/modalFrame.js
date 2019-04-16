var ModalFrame = {
    containerClass: 'outermost_container',
    templateText: {
        title: 'Titel',
        content: 'Content',
        okBtn: '确认',
        cancelBtn: '取消'
    },
    getAlertTemplate: function () {
        return '<div class="modal fade" role="dialog">' +
            '<div class="modal_dialog">' +
            '<div class="modal_content">' +
            '<div class="modal_header">' + this.templateText.title + '</div>' +
            '<div class="modal_body">' + this.templateText.content + '</div>' +
            '<div class="modal_footer">' +
            '<button class="modal_ok_btn">' + this.templateText.okBtn + '</button>' +
            '</div>' +
            '</div>' +
            '</div>' +
            '</div>';
    },
    alert: function (parameter) {
        this.templateText.title = parameter.title || this.templateText.title;
        this.templateText.content = parameter.content || this.templateText.content;
        this.templateText.okBtn = parameter.okBtn || this.templateText.okBtn;

        var box = document.createElement('div');
        _this = this;
        box.className = this.containerClass;
        box.innerHTML = this.getAlertTemplate();
        document.body.appendChild(box);

        var okBtn = document.getElementsByClassName('modal_ok_btn')[0];
        okBtn.focus();
        okBtn.onclick = function(){
            _this.removeContainer();
        }
    },
    removeContainer: function () {
        var box = document.getElementsByClassName(this.containerClass)[0];
        document.body.removeChild(box);
    }
}