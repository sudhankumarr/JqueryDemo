/*Application logic*/
'use strict';

// start of accordion
	$('.accordion-body').slideUp();

	$('.accordion-header > a').click(function(){
		var current_body = $(this).parent().next('.accordion-body');
		var not_current_body = $('.accordion-header > a').not(this).parent().next('.accordion-body');
		var current_header_plus = current_body.prev('.accordion-header').find('a > .fa-plus-circle');
		var current_header_minus = current_body.prev('.accordion-header').find('a > .fa-minus-circle');
		not_current_body.slideUp();
		current_body.slideToggle();

		not_current_body.prev('.accordion-header').find('a > .fa-plus-circle').removeClass('hide');
		not_current_body.prev('.accordion-header').find('a > .fa-minus-circle').addClass('hide').removeClass('show');

		if(current_header_plus.is('.hide')){
			console.log('one');
			current_header_plus.removeClass('hide');
			current_header_minus.addClass('hide');
		}
		else {
			console.log('two');
			current_header_minus.removeClass('hide');
			current_header_plus.addClass('hide');
		}
	});

	$('.accordion-body > a').click(function(){
		$(this).parent('.accordion-body').slideUp();
		$(this).parent('.accordion-body').prev('.accordion-header').find('a > .fa-plus-circle').removeClass('hide');
		$(this).parent('.accordion-body').prev('.accordion-header').find('a > .fa-minus-circle').addClass('hide').removeClass('show');
	});
// end of accordion

/*product category carousel*/

	/*carousel slider functionality*/
	$('.js-pager-left').addClass('hide-pager').removeClass('show-pager');
	$('.js-pager-right').addClass('show-pager').removeClass('hide-pager');

	$('.js-pager-left').click(function(){
		$('.carousel-container').each(function(i){
			if(i==0 || i==2){
				$('.carousel-container').eq(i)
					.addClass('show')
					.removeClass('hide');
			}
			else{
				$('.carousel-container').eq(i)
					.addClass('hide')
					.removeClass('show');
			}
		});
		$('.js-pager-left').addClass('hide-pager').removeClass('show-pager');
		$('.js-pager-right').addClass('show-pager').removeClass('hide-pager');

	});

	$('.js-pager-right').click(function(){
		$('.carousel-container').each(function(i){
			if(i==1 || i==3){
				$('.carousel-container').eq(i)
					.addClass('show')
					.removeClass('hide');
			}
			else{
				$('.carousel-container').eq(i)
					.addClass('hide')
					.removeClass('show');
			}
		});
		$('.js-pager-right').addClass('hide-pager').removeClass('show-pager');
		$('.js-pager-left').addClass('show-pager').removeClass('hide-pager');
	});
	/*End of carousel slider functionality*/

	/*Ajax call for loading json*/
	$.ajax({
		type: "GET",
        url: './json/product.json',
        dataType: 'json',
        contentType: 'application/json',
        success:function(data) {
            var length = data.productSet.length;
            var $container_desktop = $('.product-container.hidden-xs').find('.carousel-container');
            var $container_mobile = $('.product-container.visible-xs').find('.carousel-container');

            for(var i=0; i<length; i++){
            	if(i<9){
                	console.log("i="+i);
                	/*mobile*/
                	if(i%2 == 0){
                		$container_mobile.eq(0).append('<div class="row"></div>');
                	}
                	$container_mobile.eq(0).append('<div class="col-md-4 col-xs-6 products"><div class="thumbnail"><img class="product-image" src="./images/products/'+data.productSet[i].image+'.jpg"><div class="caption"><h3 class="product-title">'+data.productSet[i].title+'</h3><p class="product-description" id="">'+data.productSet[i].description+'</p></div></div></div>');
                	/*End of mobile*/

                	/*Desktop*/
                	if(i%3 == 0){
                		$container_desktop.eq(0).append('<div class="row"></div>');
                	}
	                $container_desktop.eq(0).append('<div class="col-md-4 col-xs-6 products"><div class="thumbnail"><img class="product-image" src="./images/products/'+data.productSet[i].image+'.jpg"><div class="caption"><h3 class="product-title">'+data.productSet[i].title+'</h3><p class="product-description" id="">'+data.productSet[i].description+'</p></div></div></div>');
	                /*End of desktop*/
                }
                else{
                	var j = i-1;
                	/*mobile*/
                	if( j%2 == 0){
                		//console.log("i="+i);
                		$container_mobile.eq(1).append('<div class="row"></div>');
                	}
                	$container_mobile.eq(1).append('<div class="col-md-4 col-xs-6 products"><div class="thumbnail"><img class="product-image" src="./images/products/'+data.productSet[i].image+'.jpg"><div class="caption"><h3 class="product-title">'+data.productSet[i].title+'</h3><p class="product-description" id="">'+data.productSet[i].description+'</p></div></div></div>');
                	/*End of mobile*/

                	/*Desktop*/
                	if(i%3 == 0 ){
                		//console.log("i="+i);
                		$container_desktop.eq(1).append('<div class="row"></div>');
                	}
	                $container_desktop.eq(1).append('<div class="col-md-4 col-xs-6 products"><div class="thumbnail"><img class="product-image" src="./images/products/'+data.productSet[i].image+'.jpg"><div class="caption"><h3 class="product-title">'+data.productSet[i].title+'</h3><p class="product-description" id="">'+data.productSet[i].description+'</p></div></div></div>');
	                /*End of desktop*/
                }
            }
        }
      });
	/*End of ajax call for loading json*/
/*End of product category carousel*/


	$('.js-gender').attr('checked', false);

	/*Phone number tabbing functionality*/
	function phone_number_tabbing(){
		for(var i=1; i<=3; i++){
			$('.js-phone-number'+i).keyup(function (e) {
				if ($(this).val().length == parseInt($(this).attr("maxlength"))) {
					$(this).next().focus();
				}
			});
		}
	}
	/*End of Phone number tabbing functionality*/

/*start of form validation*/
	$('.js-phone-number1').focus(function(){
		phone_number_tabbing();
	});

	/*REGULAR EXPRESSION FUNCTIONS*/
	function validate_name(field_value){
		var reg_exp = /^[a-zA-Z]{2,100}$/;
		var result = reg_exp.test(field_value);
		return result;
	}
	function validate_email(field_value){
		var reg_exp = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
		var result = reg_exp.test(field_value);
		return result;
	}
	function validate_phone_number(field_value){
		var reg_exp = /^\(?([0-9]{3})\)?[-. ]?([0-9]{3})[-. ]?([0-9]{4})$/;
		var result = reg_exp.test(field_value);
		return result;
	}
	function validate_password(field_value){
		var reg_exp = /^[a-zA-Z0-9@#&*$!()]{5,10}$/;
		var result = reg_exp.test(field_value);
		return result;
	}
	function validate_date(field_value){
		var reg_exp = /^(?:(?:31(\/|-|\.)(?:0?[13578]|1[02]))\1|(?:(?:29|30)(\/|-|\.)(?:0?[1,3-9]|1[0-2])\2))(?:(?:1[6-9]|[2-9]\d)?\d{2})$|^(?:29(\/|-|\.)0?2\3(?:(?:(?:1[6-9]|[2-9]\d)?(?:0[48]|[2468][048]|[13579][26])|(?:(?:16|[2468][048]|[3579][26])00))))$|^(?:0?[1-9]|1\d|2[0-8])(\/|-|\.)(?:(?:0?[1-9])|(?:1[0-2]))\4(?:(?:1[6-9]|[2-9]\d)?\d{2})$/;
		var result = reg_exp.test(field_value);
		return result;
	}

	/*END OF REGULAR EXPRESSION FUNCTIONS*/

	/*VALIDATION FUNCTION*/
	function validate(field,formName){
		//validation for account page
		if(formName == 'account'){
			var value = field.val();
			var label = field.parents('.form-group').find('label');
			var error = false;

			if(field.hasClass('js-name')){
				var result = validate_name(value);
				if(result == false) {
					field.addClass('error-field');
					label.addClass('error-label');
					error = true;
				}
				else {
					field.removeClass('error-field');
					label.removeClass('error-label');
					error = false;
					console.log('js-name');
				}
			}

			if(field.hasClass('js-email')){
				var result = validate_email(value);
				if(result == false) {
					field.addClass('error-field');
					label.addClass('error-label');
					error = true;
				}
				else {
					field.removeClass('error-field');
					label.removeClass('error-label');
					error = false;
					console.log('js-email');
				}
			}

			if(field.hasClass('js-input-date')){
				var check = $('.js-input-date').parents('.field-group-wrapper');
				var result = true;
				var month,day,year;
				if(check.css('display') != 'none'){
					//mobile view
					var value = $('.js-input-date').val();
					result = validate_date(value);
				}
				else{
					//desktop view
					 month = $('.js-select-month').val();
					 day = $('.js-select-day').val();
					 year = $('.js-select-year').val();
					 field = $('.js-select-month, .js-select-day, .js-select-year');
					 label = field.parentsUntil('.form-group').find('label');
					 if(month == 'default' || day == 'default' || year == 'default'){
						result = false;
					 }
					 else {
						result = true;
					 }
				}

				if(result == false) {
					field.addClass('error-field');
					label.addClass('error-label');
					error = true;
				}
				else {
					field.removeClass('error-field');
					label.removeClass('error-label');
					error = false;
				}
			}

			if(field.hasClass('js-phone-number3') || field.hasClass('js-phone-number4')){
				var phone_number;
				var field;
				var check = $('.phone-number').parents('.field-group-wrapper.hidden-xs');
				if(check.css('display') != 'none'){
					//desktop view
					field = $('.js-phone-number1,.js-phone-number2,.js-phone-number3');
					phone_number = $('.js-phone-number1').val() + $('.js-phone-number2').val() + $('.js-phone-number3').val();
				}
				else{
					//mobile view
					field = $('.js-phone-number4');
					phone_number = $('.js-phone-number4').val();
				}
				var result = validate_phone_number(phone_number);
				if(result == false) {
					field.addClass('error-field');
					label.addClass('error-label');
					error = true;
				}
				else {
					field.removeClass('error-field');
					label.removeClass('error-label');
					error = false;
					console.log('phone');
				}

			}

			return !error;
		}
		//validation for login in header
		if(formName=='login'){
			var value = field.val();
			var error = false;
			if(field.hasClass('js-email')){
				var result = validate_email(value);
				if(result == false) {
					field.addClass('error-field');
					error = true;
				}
				else {
					field.removeClass('error-field');
					error = false;
				}
			}
			if(field.hasClass('js-password')){
				var result = validate_password(value);
				if(result == false) {
					field.addClass('error-field');
					error = true;
				}
				else {
					field.removeClass('error-field');
					error = false;
				}
			}
			return !error;
		}
	}
	/*END OF VALIDATION FUNCTION*/

	$('.js-validate-field').blur(function(e){
		validate($(this),'account');
	});

	/*FORM ACCOUNT SUBMIT*/
	$('form.account').submit(function(e){
		var result1;
		$('form').find('.js-validate-field').each(function(event){
			result1 = validate($(this),'account');
		});

		var month = $('.js-select-month').val();
		var day = $('.js-select-day').val();
		var year = $('.js-select-year').val();
		var field = $('.js-select-month, .js-select-day, .js-select-year');
		var label = field.parentsUntil('.form-group').find('label');

		var result2 = $('.js-gender').prop('checked');
		if(result2 == false){
			$('.js-gender').next('label').addClass('error-label');
			$('.js-gender').parents('.form-group').find('legend').addClass('error-label');
		}

		if(!(result1 && result2)){
			e.preventDefault();
		}

	});
	/*END OF FORM ACCOUNT SUBMIT*/

	$('.js-login-validate-field').blur(function(e){
		validate($(this),'login');
	});

	$('.js-gender').click(function(){
		$('.js-gender').next('label').removeClass('error-label');
		$('.js-gender').parents('.form-group').find('legend').removeClass('error-label');
	});

	$('form.login').submit(function(e){
		var result;
		$('form').find('.js-login-validate-field').each(function(event){
			result = validate($(this),'login');
		});
		if(result == false){
			e.preventDefault();
		}

	});

	$('.js-card-payment').submit(function(e){
		e.preventDefault();
	});

	$('.gender').click(function(){
		$('.js-gender-wrapper').removeClass('hide');
	});
/*end of form validation*/

/*Setting URL functionality for pages*/
	$('.main-menu').find('a').each(function(){
		var main_menu = $(this).attr('href').split(' ').join('_');
		$(this).attr('href',main_menu)
	});
/*End of Setting URL functionality for pages*/

/*navigation func*/
	$('button.menu').click(function(){
		$('ul.nav').slideToggle('fast');
	});
/*End of navigation func*/