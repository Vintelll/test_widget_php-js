$(function() {
    $('#Form').submit(function(e){
        var $form = $(this);
        $.ajax({
            type:$form.attr('method'),
            url:$form.attr('action'),
            data:$form.serialize()
        }).done(function(data) {
            console.log('success');
            console.log(JSON.parse(data).time);
        }).fail(function(){
            console.log('fail');
        });
        e.preventDefault();
        });
    });