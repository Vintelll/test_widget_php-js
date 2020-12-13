$(function() {
    $('.submit').click(function(e){
        var $form = $('#Form');
        $.ajax({
            type:$form.attr('method'),
            url:$form.attr('action'),
            data:$form.serialize()
        }).done(function(data) {
            console.log('success');
            console.log(JSON.parse(data));
            $('.response').text(JSON.parse(data).textReply);
            $('.message').removeClass('hidden');
            $('.arrow').removeClass('hidden');
            setTimeout(function(){
                $('.message').addClass('hidden');
                $('.arrow').addClass('hidden');
            }, 3000);
        }).fail(function(){
            console.log('fail');
        });
        e.preventDefault();
        });
    $('button.minus').click(function(minus){
        var currentValue = parseInt($("input[name='col']").val());
        if ((currentValue - 1) > 0){
            $("input[name='col']").val(currentValue - 1);
        } else {
            alert('Минимальное количество к заказу 1!');
            $("input[name='col']").val(1);
        }
        minus.preventDefault();

        });
    $('button.plus').click(function(plus){
        var currentValue = parseInt($("input[name='col']").val());
        if ((currentValue) > 0){
            $("input[name='col']").val(currentValue + 1);
        } else {
            alert('Минимальное количество к заказу 1!');
            $("input[name='col']").val(1);
        }

        plus.preventDefault();
        });
    });