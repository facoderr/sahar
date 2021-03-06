$(document).ready(function() {

	// Fullpage Event

	var delay = 300;
	var timeoutId;
	var animationIsFinished = false;
	$('#fullpage').fullpage({
		licenseKey: 'OPEN-SOURCE-GPLV3-LICENSE',
		//scrollingSpeed: 500,
		sectionSelector: '.page-section',
		normalScrollElements: '.overflow',
		verticalCentered: false,
		responsiveWidth: 1199,
		onLeave: function(origin, destination, direction) {
			if (direction == 'down') {
				$('.page-animation').addClass('animatedUp');
			} else if (direction == 'up') {
				$('.page-animation').addClass('animatedDown');
			}
			timeoutId = setTimeout(function(){
				animationIsFinished = true;
				fullpage_api.moveTo(destination.index + 1);
			}, delay);
			return animationIsFinished;
		},
		afterLoad: function(origin, destination, direction) {
			$('.page-full').each(function(){
				var current = $('.page-section').filter('.active').index() + 1,
						total = $('.page-section').length;
				$('.page-pagination-current').html(current);
				$('.page-pagination-total').html(total);
			});
			$('.page-animation').removeClass('animatedUp');
			$('.page-animation').removeClass('animatedDown');
			clearTimeout(timeoutId);
			animationIsFinished = false;
		}
	});

	//

	// Slider Event

	$('.worker-slider').slick({
		dots: true,
		arrows: false,
		infinite: true,
		slidesToShow: 5,
		slidesToScroll: 1,
		swipeToSlide: true,
		touchThreshold: 20,
		lazyLoad: 'ondemand',
		speed: 500
	});
	$('.program-slider').slick({
		dots: false,
		arrows: false,
		infinite: true,
		slidesToShow: 3,
		slidesToScroll: 1,
		speed: 500,
		responsive: [
			{
				breakpoint: 991,
				settings: {
					dots: true,
					slidesToShow: 2
				}
			},
			{
				breakpoint: 767,
				settings: {
					dots: true,
					slidesToShow: 1
				}
			}
		]
	});
	$('.interior-slider').slick({
		prevArrow: '<button type="button" class="slick-prev"><svg viewBox="0 0 11 20"><path d="M10.353,10.352 L1.353,19.352 L0.646,18.646 L9.293,9.999 L0.646,1.352 L1.353,0.645 L10.353,9.645 L10.000,9.999 L10.353,10.352 Z"/></svg></button>',
		nextArrow: '<button type="button" class="slick-next"><svg viewBox="0 0 11 20"><path d="M10.353,10.352 L1.353,19.352 L0.646,18.646 L9.293,9.999 L0.646,1.352 L1.353,0.645 L10.353,9.645 L10.000,9.999 L10.353,10.352 Z"/></svg></button>',
		dots: true,
		arrows: true,
		infinite: true,
		slidesToShow: 1,
		slidesToScroll: 1,
		speed: 500,
		lazyLoad: 'ondemand',
		responsive: [
			{
				breakpoint: 991,
				settings: {
					arrows: false
				}
			}
		]
	});

	//

	// Gallery Event

	$('.page-masters-gallery').each(function() {
		$(this).magnificPopup({
			delegate: 'a',
			type: 'image',
			closeOnContentClick: false,
			closeBtnInside: false,
			removalDelay: 300,
			mainClass: 'mfp-fade',
			image: {
				verticalFit: true
			},
			gallery: {
				enabled: true,
				preload: [0, 1]
			}
		});
	});

	//

	// Click Event

	$(document).on('click', '.js-welcome', function() {
		$('.welcome').toggleClass('open');
	});
	$(document).on('click', '.js-toggle', function() {
		$('.nav').addClass('open');
	});
	$(document).on('click', '.js-call', function() {
		$('.popup.for-call').addClass('open');
	});
	$(document).on('click', '.js-phone', function() {
		$('.popup.for-phone').addClass('open');
	});
	$(document).on('click', '.js-close', function() {
		$('.nav').removeClass('open');
		$('.popup').removeClass('open');
	});

	//

	// Accordion Event

	$(function() {
		var Accordion = function(el, multiple) {
			this.el = el || {};
			this.multiple = multiple || false;

			var links = this.el.find('.page-services-box-head');
			links.on('click', {
				el: this.el,
				multiple: this.multiple
			}, this.dropdown)
		}

		Accordion.prototype.dropdown = function(e) {
			var $el = e.data.el;
			$this = $(this),
			$next = $this.next();

			$next.slideToggle();
			$this.parent().toggleClass('open');

			if (!e.data.multiple) {
				$el.find('.page-services-box-body').not($next).slideUp().parent().removeClass('open');
			};
		}
		var accordion = new Accordion($('.page-services-accordion'), false);
	});

	//

	// Tab Event

	var clickedTab = $('.page-certificate-tabList .active');
	var tabWrapper = $('.page-certificate-tabWrap');
	var activeTab = tabWrapper.find('.open');
	var activeTabHeight = activeTab.outerHeight();
	
	activeTab.show();
	tabWrapper.height(activeTabHeight);

	function tabInit() {
		clickedTab = $('.page-certificate-tabList .active');
		activeTab.fadeOut(300, function() {
			$('.page-certificate-tabInfo').removeClass('open');
			var clickedTabIndex = clickedTab.index();
					clickedTabImg = clickedTab.find('img').attr('src');
			$('.page-certificate-tabInfo').eq(clickedTabIndex).addClass('open');
			$('.page-certificate-tabInfo').eq(clickedTabIndex).css('background-image', 'url(' + clickedTabImg + ')');
			activeTab = $('.page-certificate-tabWrap .open');
			activeTabHeight = activeTab.outerHeight();
			scroll = $('.page-certificate-tabWrap').offset().top;
			$('html, body').animate({
				scrollTop: scroll - 70
			}, 700);
			tabWrapper.stop().delay(50).animate({
				height: activeTabHeight
			}, 300, function() {
				activeTab.delay(50).fadeIn(300);
			});
		});
	}
	tabInit();
	$('.page-certificate-tabList').on('click', '.page-certificate-tabItem', function() {
		$('.page-certificate-tabItem').removeClass('active');
		$(this).addClass('active');
		tabInit();
	});

	//

	// IE 'object-fit: cover' fix

	function ObjectFitIt() {
		$('img.obj').each(function() {
			var imgSrc = $(this).attr('src');
			var fitType = 'cover';
			if ($(this).data('fit-type')) {
				fitType = $(this).data('fit-type');
			}
			$(this).parent().css({ 
				'background' : 'transparent url("' + imgSrc + '") no-repeat center center/' + fitType
			});
			$('img.obj').css('display','none'); 
		});
	}
	if ('objectFit' in document.documentElement.style === false) {
		ObjectFitIt();
	}

	//

	// Scroll Event

	$(window).bind('scroll', function() {
		$('.welcome').removeClass('open');
		if ($(document).scrollTop() > 300) {
			$('.totop').addClass('active');
		} else if ($(document).scrollTop() < 300) {
			$('.totop').removeClass('active');
		}
	});
	$(document).on('click', '.js-anchor', function() {
		var id = $(this).attr('href');
				scroll = $(id).offset().top;
		$('html, body').animate({
			scrollTop: scroll
		}, 1500);
		return false;
	});
	$(document).on('click', '.js-totop', function() {
		$('html, body').animate({
			scrollTop: 0
		}, 1500);
		return false;
	});

	//

	// Resize Event

	$(window).on('load', function() {
		if ($(this).width() <= 1199) {
			$('.head-toggle').prependTo('.head-row');
		} else {
			$('.head-toggle').prependTo('.head');
		}
		if ($(this).width() <= 991) {
			$('.page-certificate-tabOrder').appendTo('.page-certificate-row');
		} else {
			$('.page-certificate-tabOrder').appendTo('.page-certificate-tabList');
		}	
		if ($(this).width() <= 575) {
			if ($(document).scrollTop() > 80) {
				$('.head').addClass('fixed');
				$('.page-head').addClass('fixed');
			} else if ($(document).scrollTop() < 13) {
				$('.head').removeClass('fixed');
				$('.page-head').removeClass('fixed');
			}
			$(window).bind('scroll', function() {
				if ($(document).scrollTop() > 80) {
					$('.head').addClass('fixed');
					$('.page-head').addClass('fixed');
				} else if ($(document).scrollTop() < 13) {
					$('.head').removeClass('fixed');
					$('.page-head').removeClass('fixed');
				}
			});
		} else {
			if ($(document).scrollTop() > 135) {
				$('.head').addClass('fixed');
			} else if ($(document).scrollTop() < 30) {
				$('.head').removeClass('fixed');
			}
			$(window).bind('scroll', function() {
				if ($(document).scrollTop() > 135) {
					$('.head').addClass('fixed');
				} else if ($(document).scrollTop() < 30) {
					$('.head').removeClass('fixed');
				}
			});
			if ($(document).scrollTop() > 165) {
				$('.page-head').addClass('fixed');
			} else if ($(document).scrollTop() < 48) {
				$('.page-head').removeClass('fixed');
			}
			$(window).bind('scroll', function() {
				if ($(document).scrollTop() > 165) {
					$('.page-head').addClass('fixed');
				} else if ($(document).scrollTop() < 48) {
					$('.page-head').removeClass('fixed');
				}
			});
		}
	});
	$(window).on('resize', function() {
		if ($(this).width() <= 1199) {
			$('.head-toggle').prependTo('.head-row');
		} else {
			$('.head-toggle').prependTo('.head');
		}
		if ($(this).width() <= 991) {
			$('.page-certificate-tabOrder').appendTo('.page-certificate-row');
		} else {
			$('.page-certificate-tabOrder').appendTo('.page-certificate-tabList');
		}
		if ($(this).width() <= 575) {
			if ($(document).scrollTop() > 80) {
				$('.head').addClass('fixed');
				$('.page-head').addClass('fixed');
			} else if ($(document).scrollTop() < 13) {
				$('.head').removeClass('fixed');
				$('.page-head').removeClass('fixed');
			}
			$(window).bind('scroll', function() {
				if ($(document).scrollTop() > 80) {
					$('.head').addClass('fixed');
					$('.page-head').addClass('fixed');
				} else if ($(document).scrollTop() < 13) {
					$('.head').removeClass('fixed');
					$('.page-head').removeClass('fixed');
				}
			});
		} else {
			if ($(document).scrollTop() > 135) {
				$('.head').addClass('fixed');
			} else if ($(document).scrollTop() < 30) {
				$('.head').removeClass('fixed');
			}
			$(window).bind('scroll', function() {
				if ($(document).scrollTop() > 135) {
					$('.head').addClass('fixed');
				} else if ($(document).scrollTop() < 30) {
					$('.head').removeClass('fixed');
				}
			});
			if ($(document).scrollTop() > 165) {
				$('.page-head').addClass('fixed');
			} else if ($(document).scrollTop() < 48) {
				$('.page-head').removeClass('fixed');
			}
			$(window).bind('scroll', function() {
				if ($(document).scrollTop() > 165) {
					$('.page-head').addClass('fixed');
				} else if ($(document).scrollTop() < 48) {
					$('.page-head').removeClass('fixed');
				}
			});
		}
	});

	//

	// Warning Event

	function setCookie(cname, cvalue, exdays) {
		var d = new Date();
		d.setTime(d.getTime() + (exdays * 24 * 60 * 60 * 1000));
		var expires = 'expires=' + d.toGMTString();
		document.cookie = cname + '=' + cvalue + '; ' + expires;
	}
	function getCookie(cname) {
		var name = cname + '=';
		var ca = document.cookie.split(';');
		for (var i = 0; i < ca.length; i++) {
			var c = ca[i].trim();
			if (c.indexOf(name)==0) return c.substring(name.length,c.length);
		}
		return '';
	}
	if(getCookie('modalWarning') == '') {
		$(document).on('click', '.js-yes', function() {
			$('.warning').removeClass('open');
			setCookie('modalWarning', 'sessionexists', 1);
		});
		$('.warning').addClass('open');
	}

	//

	// Preloader Event

	$(window).on('load', function() {
		$('.js-pulse').fadeOut();
		$('.js-preloader').delay(400).fadeOut('slow');
		$('.nav-menu').clone().prependTo('.page-nav');
		$('.foot-socials-list a').clone().appendTo('.popup-phone-socials');
		$('.foot-socials-list a').clone().appendTo('.page-socials');
	});

	//
	
});