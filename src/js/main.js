
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

// ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~ ВЫПАДАЮЩИЙ СПИСОК
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

// ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~ МОБИЛЬНОЕ МЕНЮ

const mMenu = () => {
	const gamburger = document.querySelector(".gamburger")
	const mMenu = document.querySelector('.m-menu')
	
	mMenu.style.height = 0

	gamburger.addEventListener("click", function () {
		this.classList.toggle("is-open")
		if(this.classList.contains('is-open')){
			mMenu.style.height = 'calc(100vh - 60px)'
			mMenu.querySelector('.m-menu__inner').style.maxHeight = mMenu.scrollHeight + 'px'
		} else {
			mMenu.style.height = 0
		}
	})

}

// ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~ ВЫПАДАЮЩИЙ СПИСОК В ШАПКЕ
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

// ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~ ПРОКРУТКА ВВЕРХ В ТАБЛИЦЕ
const topToTableHead = () => {
	const btn = document.querySelector('.js-topToTableHead')
	const table = document.querySelector('.table__scroll')
	btn.addEventListener('click', function() {

		table.scroll({top: 0, left: 0, behavior: 'smooth' });
		
	})
}

// ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~ КАЛЕНДАРЬ 
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

// ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~ ЛОГИКА МОДАЛЬНЫХ ОКОН (ВСЕ МОДАЛКИ ДОЛЖНЫ ЛЕЖАТЬ ВНЕ ТЕГА MAIN !!!)
const popup = ()=> {
    const popup = document.querySelectorAll('.popup')
	/*все кнопки, вызывающие попап, должны иметь атрибут data-popup="popup"*/
    const popupBtn = document.querySelectorAll("[data-popup='popup']") 
	/*перебираем все попапы*/  
    popup.forEach(item => {
		/* в каждом из них находим элементы с классом js-popupClose */ 
        const closePopupBtn = item.querySelectorAll('.js-popupClose')
		/*перебираем эти элементы*/ 
        closePopupBtn.forEach(elem => {
			/*кликаем по ним*/ 
            elem.addEventListener('click', function(){
				/*данный попап закрываем*/ 
                item.classList.remove('is-open')
				/*если это десктоп, разрешаем прокрутку документа*/ 
				if(document.documentElement.clientWidth > 992){
					document.documentElement.classList.remove('popup-open')
				}
				/*если это мобилка, возвращаем весь контент, лежащий в теге main*/ 
				if(document.documentElement.clientWidth < 992){
					const mainContent = item.closest('body').querySelector('.main')
					mainContent.style.display = 'flex'
				}
            })
        })
    })
	/*перебираем кнопки вызова*/
    popupBtn.forEach(item => { 
		/*кликаем по одной из них*/
        item.addEventListener('click', function(e){ 
            e.preventDefault()
			/*вызывать попап может либо ссылка с атрибутом href="#modalName" 
			либо любой элемент с атрибутом data-src="#modalName"*/
            const hrefPopupBtn = item.getAttribute('href') || item.getAttribute('data-src') 
			/*на десктопе при вызове попап запрещаем прокрутку документу (на моб. прокрутка будет)*/
			if(document.documentElement.clientWidth > 992){
				document.documentElement.classList.add('popup-open')
			}
			/*перебираем все попапы и закрываем их*/
            popup.forEach(item => {
                item.classList.remove('is-open')
            })
			/*открываем только то окно, id которого соответствует атрибуту у кликнутой кнопки*/
            document.querySelector(hrefPopupBtn).classList.add('is-open')
			/*на мобилке скрываем весь контент, лежащий в теге main, и его заменяет попап, 
			который становится position: static*/
			if(document.documentElement.clientWidth < 992){
				/*при открытии скроллим страницу вверх*/
				document.documentElement.scroll({top: 0, left: 0, behavior: 'smooth' });
				const mainContent = item.closest('body').querySelector('.main')
				mainContent.style.display = 'none'
			}
        })
    })
}

// ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~ ФОРМА АВТОРИЗАЦИИ
const auth = ()=> {
	const btn = document.querySelectorAll('.js-authToggleBtn')
	const content = document.querySelectorAll('.js-authToggleContent')

	btn[0].classList.add('is-active')
	content.forEach(c => {
		c.style.display = 'none'
	})
	content[0].style.display = 'block'

	btn.forEach(item => {
		item.addEventListener('click', (e)=> {
			btn.forEach(elem => {
				elem.classList.remove('is-active')
			})
			e.target.classList.add('is-active')

			content.forEach(c => {
				c.style.display = 'none'
			})
			document.querySelector(`#${item.dataset.name}`).style.display = 'block'
		})
	})

	// ~~~~~~~~~~~~~~~~ password
	const passwordsBox = document.querySelectorAll('.js-passwordInputBox')
	passwordsBox.forEach(item => {
		const btn = item.querySelector('.js-passwordBtn')
		const input = item.querySelector('.js-passwordInput')
		btn.addEventListener('click', ()=> {
			item.classList.toggle('is-visible')
			if(item.classList.contains('is-visible')){
				input.setAttribute('type', 'text')
			} else {
				input.setAttribute('type', 'password')
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
if(document.querySelector('.header-lk')){
	lkMenuToggle()
}
if(document.querySelector('.js-topToTableHead')){
	topToTableHead()
}
dataPicker()
popup()
if(document.querySelector('.auth')){
	auth()
}


