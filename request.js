$(function() {
    function countAlert(){
        alert('Минимальное количество к заказу 1!');
        $("input[name='col']").val(1);
    };
    function throwMessage(text, delay){
        $('.response').text(text);
        $('.hidden').removeClass('hidden');
        setTimeout(function(){
            $('.message').addClass('hidden');
            $('.arrow').addClass('hidden');
        }, delay);
    };
    function disableSubmit(delay){
        $(".submit").attr("disabled", true);
        $(".submit").addClass("inative")
        setTimeout(function(){
            $(".submit").attr("disabled", false);
            $(".submit").removeClass("inative")
        }, delay);
    };
    function sendAjax(){
        var $form = $('#Form');
        $.ajax({
            type:$form.attr('method'),
            url:$form.attr('action'),
            data:$form.serialize()
        }).done(function(data) {
            console.log('Ajax request success');
            console.log(JSON.parse(data));
            throwMessage(JSON.parse(data).textReply, 3000)
        }).fail(function(){
            console.log('Ajax request failed');
        });
    };
    $('.submit').click(function(e){
        sendAjax();
        e.preventDefault();
        });
    $("input[name='col']").keyup(function(keypress){
        if (keypress.key == "Enter"){
            keypress.preventDefault();
            console.log("enter");
            sendAjax();
        };
    });
    $('button.minus').click(function(minus){
        console.log('minus')
        var currentValue = parseInt($("input[name='col']").val());
        if ((currentValue - 1) > 0){
            $("input[name='col']").val(currentValue - 1);
            console.log('minus')
        } else {
            countAlert();
            disableSubmit(3000);
        };
        minus.preventDefault();
        });
    $('button.plus').click(function(plus){
        var currentValue = parseInt($("input[name='col']").val());
        $("input[name='col']").val(currentValue + 1);
        plus.preventDefault();
    });
    $("input[name='col']").change(function() {
        var value = parseInt(this.value)
        if (value <= 0){
            countAlert();
            disableSubmit(3000);
        }else if (!Number.isInteger(this.value)) {
            this.value = value;
        }
    });
    });