$(function() {
	$(".g-form").submit(function (event) {
		event.preventDefault();

		// Ссылка, которую получили на этапе публикации приложения
		let appLink = "https://script.google.com/macros/s/AKfycbxkq27LaUsnnKnoliGnL4LgGJUIzM494yu6PoA80uR-u5kkdCLTbSwmrcxZSVwhD4d5/exec";

		// Сообщение при успешной отправке данных
		let successRespond = 'Successfully sent. <br> The term for issuing a checkmark is from 24 hours to 7 days';

		// Сообщение при ошибке в отправке данных
		let errorRespond = 'Failed to send message. Contact the site administrator <a href="tg://resolve?domain=the_dise">@the_dise</a>';

		// Id текущей формы
		let form = $('#' + $(this).attr('id'))[0];

		// h2 с ответом формы
		let formRespond = $(this).find('.g-form__title_respond');

		// h2 с заголовком формы
		let formTitle = $(this).find('.g-form__title_main');

		// Блок прелоадера
		let preloader = $(this).find('.g-form__preloader');

		// Кнопка отправки формы
		let submitButton = $(this).find('.g-form__button');


		// FormData
		let fd = new FormData(form);


		$.ajax({

			url: appLink,
			type: "POST",
			data: fd,
			processData: false,
			contentType: false,
			beforeSend: function(){

				if(fd.get('honeypot').length) {
					return false;
				} else {
					fd.delete('honeypot');
				}

  		// Показываем прелоадер
  		preloader.css('opacity', '1');

  		// Делаем неактивной кнопку отправки
  		submitButton.prop('disabled', true);

  		// валидация других полей.

  	},

  }).done(function(res, textStatus, jqXHR) {

  	if(jqXHR.readyState === 4 && jqXHR.status === 200) {

		// Прячем заголовок формы
		formTitle.css({
			'display': 'none'
		});

		// Прячем прелоадер
		preloader.css('opacity', '0');

		// Выводим ответ формы.
		formRespond.html(successRespond).css('color', '#37b599');
		
		// Возвращаем активность кнопке отправки
		submitButton.prop('disabled', false);

	  	// Очищаем поля формы
	  	form.reset();

	  } else {
	  	formTitle.css({
	  		'display': 'none'
	  	});
	  	formRespond.html(errorRespond).css('color', '#c64b4b');
	  	preloader.css('opacity', '0');
	  	setTimeout( () => {
	  		formRespond.css({
	  			'display': 'none'
	  		});
	  		formTitle.css({
	  			'display': 'block'
	  		});

	  		submitButton.prop('disabled', false);
	  	}, 5000);

	  	console.log('Гугл не ответил статусом 200');
	  }
	}).fail(function(res, textStatus, jqXHR) {
		formTitle.css({
			'display': 'none'
		});
		preloader.css('opacity', '0');
		formRespond.html('Failed to send message. Contact the site administrator in another way').css('color', '#c64b4b');
		setTimeout( () => {
			formRespond.css({
				'display': 'none'
			});
			formTitle.css({
				'display': 'block'
			});
			submitButton.prop('disabled', false); 
		}, 5000);

		console.log('Не удалось выполнить запрос по указанному в скрипте пути');
	}); 
});
}(jQuery));