$(function() {
    function throwMessage(text, delay){
        $('.response').text(text);
        $('.hidden').removeClass('hidden');
        setTimeout(function(){
            $('.message').addClass('hidden');
            $('.arrow').addClass('hidden');
        }, delay);
    };
    function countAlert(){
        throwMessage('Минимальное количество к заказу 1!', 3000);
        $("input[name='col']").val(1);
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
        disableSubmit(3000);
        e.preventDefault();
        });
    $('a.minus').click(function(minus){
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
    $('a.plus').click(function(plus){
        var currentValue = parseInt($("input[name='col']").val());
        $("input[name='col']").val(currentValue + 1);
        plus.preventDefault();
    });
    $("input[name='col']").change(function() {
        var currentValue = parseInt(this.value)
        if (currentValue <= 0){
            countAlert();
            disableSubmit(3000);
        }
        else{
            $("input[name='col']").val(currentValue);
        };
    });
    });