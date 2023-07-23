// ================================================== исключение по наименованию страницы
// const contactsPage = window.location.pathname == '/contacts.html'
// if(contactsPage){
//     ...
// }

// ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~ ПРОКРУТКА, ШАПКА
// document.addEventListener('DOMContentLoaded', function () {
//     // СКРОЛЛ К НУЖНОЙ СЕКЦИИ ПО КЛИКУ НА ПУНКТАХ МЕНЮ
//     $('.menu__link').click(function () {
//         var scroll_elem = $(this).attr('href');
//         $('html, body').animate({
//             scrollTop: $(scroll_elem).offset().top
//         }, 1000);
//     });
//     // ДОБАВЛЯЕМ АКТИВНЫЙ КЛАСС ШАПКЕ
//     function headerActiveToggle() {
//         const scrollSize = window.pageYOffset
//         scrollSize > 1 ? header.classList.add('active') : header.classList.remove('active')
//     }
//     window.addEventListener('load', headerActiveToggle) // ПРИ ПЕРЕЗАГРУЗКЕ СТРАНИЦЫ ЕСЛИ СТРАНИЦА УЖЕ ПРОСКРОЛЛЕНА
//     window.addEventListener('scroll', headerActiveToggle) // ПРИ СКРОЛЛЕ
// });

// ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~ МАСКА ДЛЯ ИНПУТОВ (https://github.com/RobinHerbots/Inputmask)
const inputMask = () => {
	$(".js-maskPhone").inputmask({
		mask: "+7 (999) 999 99-99",
		clearIncomplete: true,
	});
	$(".email").inputmask({
		mask: "*{1,20}[.*{1,20}]@*{1,20}.*{2,4}",
		clearIncomplete: true,
		//     greedy: false,
		//     onBeforePaste: function (pastedValue, opts) {
		//         pastedValue = pastedValue.toLowerCase();
		//         return pastedValue.replace("mailto:", "");
		//     },
		//     definitions: {
		//         '*': {
		//             validator: "[0-9A-Za-z-а-я-]",
		//             casing: "lower"
		//         }
		//     }
	});
	$(".js-maskDate").inputmask({
		mask: "99/99/9999",
		clearIncomplete: true,
		placeholder: "dd/mm/yyyy",
	});
};

// ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~ СЛАЙДЕР SWIPER (https://swiperjs.com/get-started)
const sliders = () => {
	const swiper = new Swiper(".swiper", {
		// Optional parameters
		direction: "vertical",
		loop: true,

		// If we need pagination
		pagination: {
			el: ".swiper-pagination",
		},

		// Navigation arrows
		navigation: {
			nextEl: ".swiper-button-next",
			prevEl: ".swiper-button-prev",
		},

		// And if we need scrollbar
		scrollbar: {
			el: ".swiper-scrollbar",
		},
	});
};

// ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
function customSelect(parent, header, item, current, value, activeClass) {
	document.querySelectorAll(parent).forEach((select) => {
		let selectHeader = select.querySelectorAll(header),
			selectItem = select.querySelectorAll(item),
			currentItem = select.querySelector(current),
			selectInput = select.querySelector(value);
		selectHeader.forEach((item) => {
			item.addEventListener("click", selectToggle);
		});
		selectItem.forEach((item) => {
			item.addEventListener("click", selectChoose);
		});
		function selectToggle() {
			this.parentElement.classList.toggle(activeClass);
		}
		function selectChoose() {
			let selectOption = this.innerText,
				thisSelect = this.closest(parent);
			currentItem.innerHTML = selectOption;
			selectInput.value = selectOption;
			selectItem.forEach((item) => {
				item.classList.remove(activeClass);
			});
			this.classList.add(activeClass);
			thisSelect.classList.remove(activeClass);
		}
		document.addEventListener("click", (e) => {
			if (!select.contains(e.target)) {
				select.classList.remove(activeClass);
			}
		});
	});
}

// ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~

const mMenu = () => {
	const gamburger = document.querySelector(".gamburger")
	const mMenu = document.querySelector('.m-menu')
	
	mMenu.style.height = 0

	gamburger.addEventListener("click", function () {
		this.classList.toggle("is-open")
		if(this.classList.contains('is-open')){
			mMenu.style.height = 'calc(100vh - 60px)'
		} else {
			mMenu.style.height = 0
		}
	})

}

// ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
const lkMenuToggle = () => {
	const btn = document.querySelector('.js-lkMenuToggle')
	const lkMenu = document.querySelector('.header-lk__menu')
	document.documentElement.addEventListener('click', function(e){
		let target = e.target
		const itsBtn = target == btn || btn.contains(target)
		const itsLkMenu = target == lkMenu || lkMenu.contains(target)
		const openLkMenu = lkMenu.classList.contains('is-open')
		if(itsBtn){
			lkMenu.classList.toggle('is-open')
			btn.classList.toggle('is-active')
		}
		else if(!itsBtn && !itsLkMenu && openLkMenu){
			lkMenu.classList.remove('is-open')
			btn.classList.remove('is-active')
		}
	})
}

// ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
const topToTableHead = () => {
	const btn = document.querySelector('.js-topToTableHead')
	const table = document.querySelector('.table__scroll')
	btn.addEventListener('click', function() {

		table.scroll({top: 0, left: 0, behavior: 'smooth' });
		
	})
}

// ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
const dataPicker = () => {
	$.datepicker.regional['ru'] = {
		closeText: 'Закрыть',
		prevText: 'Предыдущий',
		nextText: 'Следующий',
		currentText: 'Сегодня',
		monthNames: ['Январь','Февраль','Март','Апрель','Май','Июнь','Июль','Август','Сентябрь','Октябрь','Ноябрь','Декабрь'],
		monthNamesShort: ['Янв','Фев','Мар','Апр','Май','Июн','Июл','Авг','Сен','Окт','Ноя','Дек'],
		dayNames: ['воскресенье','понедельник','вторник','среда','четверг','пятница','суббота'],
		dayNamesShort: ['вск','пнд','втр','срд','чтв','птн','сбт'],
		dayNamesMin: ['Вс','Пн','Вт','Ср','Чт','Пт','Сб'],
		weekHeader: 'Не',
		dateFormat: 'dd.mm.yy',
		firstDay: 1,
		isRTL: false,
		showMonthAfterYear: false,
		yearSuffix: ''
	};
	$.datepicker.setDefaults($.datepicker.regional['ru']);
	$(".js-dataPicker").datepicker();
}

// ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
const popup = ()=> {
    const popup = document.querySelectorAll('.popup')
    const popupBtn = document.querySelectorAll("[data-popup='popup']")  /*все кнопки, вызывающие попап, должны иметь атрибут data-popup="popup"*/
    popup.forEach(item => {
        const closePopupBtn = item.querySelectorAll('.js-popupClose')
        closePopupBtn.forEach(elem => {
            elem.addEventListener('click', function(){
                item.classList.remove('is-open')
				if(document.documentElement.clientWidth > 992){
					document.documentElement.classList.remove('popup-open')
				}
				if(document.documentElement.clientWidth < 992){
					const mainContent = item.closest('body').querySelector('.main')
					mainContent.style.display = 'flex'
				}
            })
        })
    })
    popupBtn.forEach(item => {
        item.addEventListener('click', function(e){
            e.preventDefault()
            const hrefPopupBtn = item.getAttribute('href') || item.getAttribute('data-src')
			if(document.documentElement.clientWidth > 992){
				document.documentElement.classList.add('popup-open')
			}
            popup.forEach(item => {
                item.classList.remove('is-open')
            })
            document.querySelector(hrefPopupBtn).classList.add('is-open')
			if(document.documentElement.clientWidth < 992){
				const mainContent = item.closest('body').querySelector('.main')
				mainContent.style.display = 'none'
			}
        })
    })
}

// ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~ КАРТА, ОТЛОЖЕННАЯ ЗАГРУЗКА (ЧТОБЫ УЛУЧШИТЬ ПОКАЗАТЕЛИ - PageSpeed Insights)
const map = () => {
	setTimeout(function () {
		var headID = document.getElementsByTagName("body")[0];
		var newScript = document.createElement("script");
		newScript.type = "text/javascript";
		newScript.src = "https://api-maps.yandex.ru/2.1/?lang=ru_RU";
		headID.appendChild(newScript);
	}, 3000);
	setTimeout(function () {
		var myMap = new ymaps.Map(
			"map",
			{
				center: [55.917879, 37.806326],
				zoom: 13,
				controls: ["smallMapDefaultSet"],
			},
			{
				searchControlProvider: "yandex#search",
			}
		);

		myGeoObject = new ymaps.GeoObject({
			geometry: {
				type: "Point",
			},
		});
		myMap.geoObjects.add(myGeoObject).add(
			new ymaps.Placemark(
				[55.917879, 37.806326],
				{
					balloonContent: "<strong></strong>",
					iconCaption: "М.О., г. Королев, ул. Ленина 12",
				},
				{
					preset: "islands#blueCircleDotIconWithCaption",
					iconCaptionMaxWidth: "200",
				}
			)
		);

		myMap.setType("yandex#publicMap");

		myMap.behaviors.disable("scrollZoom");
		//на мобильных устройствах... (проверяем по userAgent браузера)
		if (
			/Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(
				navigator.userAgent
			)
		) {
			//... отключаем перетаскивание карты
			myMap.behaviors.disable("drag");
		}
	}, 4000);
};

// ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
inputMask()
customSelect('.select', '.select__header', '.select__item', '.select__current', '.select__value', 'is-active')
customSelect('.table-select', '.table-select__header', '.table-select__item', '.table-select__current', '.table-select__value', 'is-active')
mMenu()
lkMenuToggle()
if(document.querySelector('.js-topToTableHead')){
	topToTableHead()
}
dataPicker()
popup()


