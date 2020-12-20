$(function () {
    // Объявление переиспользуемых функций
    // функция отображения сообщений
    function throwMessage(text, delay) {
        $('.response').text(text);
        $('.hidden').removeClass('hidden');
        setTimeout(function () {
            $('.message').addClass('hidden');
            $('.arrow').addClass('hidden');
        }, delay);
    };
    // функция контроля минимального колличества
    function countAlert() {
        throwMessage('Минимальное количество к заказу 1!', 3000);
        $("input[name='col']").val(1);
    };
    // функция временной блокировки отправки формы
    function disableSubmit(delay) {
        $(".submit").attr("disabled", true);
        $(".submit").addClass("inative")
        setTimeout(function () {
            $(".submit").attr("disabled", false);
            $(".submit").removeClass("inative")
        }, delay);
    };
    // функция отправки Ajax запроса
    function sendAjax() {
        var $form = $('#Form');
        $.ajax({
            type: $form.attr('method'),
            url: $form.attr('action'),
            data: $form.serialize(),
            // вывод в консоль GET запроса
            beforeSend: function () {
                console.log(this.url);
            }
        }).done(function (data) {
            console.log('Ajax request success');
            // вывод в консоль response из PHP
            console.log(JSON.parse(data));
            throwMessage(JSON.parse(data).textReply, 3000)
        }).fail(function () {
            console.log('Ajax request failed');
        });
    };
    // Действия на события
    // Нажатие кнопки "КУПИТЬ"
    $('.submit').click(function (submit) {
        var currentValue = parseInt($("input[name='col']").val());
        if (currentValue > 0) {
            sendAjax();
            disableSubmit(3000);
        }
        else {
            countAlert();
            disableSubmit(3000);
        }
        submit.preventDefault();
    });
    // Нажатие кнопки минус
    $('a.minus').click(function (minus) {
        var currentValue = parseInt($("input[name='col']").val());
        if ((currentValue - 1) > 0) {
            $("input[name='col']").val(currentValue - 1);
        } else {
            countAlert();
            disableSubmit(3000);
        };
        minus.preventDefault();
    });
    // Нажатие кнопки плюс
    $('a.plus').click(function (plus) {
        var currentValue = parseInt($("input[name='col']").val());
        $("input[name='col']").val(currentValue + 1);
        plus.preventDefault();
    });
    // Проверка значения при ручном вводе на отрицательные и не целые числа(округление в меньшую сторону)
    $("input[name='col']").change(function () {
        var currentValue = parseInt(this.value)
        if (currentValue <= 0) {
            countAlert();
            disableSubmit(3000);
        }
        else {
            $("input[name='col']").val(currentValue);
        };
    });
});