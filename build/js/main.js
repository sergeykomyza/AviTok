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
function customSelect() {
	document.querySelectorAll(".select").forEach((select) => {
		let selectHeader = select.querySelectorAll(".select__header"),
			selectItem = select.querySelectorAll(".select__item"),
			currentItem = select.querySelector(".select__current"),
			selectInput = select.querySelector(".select__value");
		selectHeader.forEach((item) => {
			item.addEventListener("click", selectToggle);
		});
		selectItem.forEach((item) => {
			item.addEventListener("click", selectChoose);
		});
		function selectToggle() {
			this.parentElement.classList.toggle("is-active");
		}
		function selectChoose() {
			let selectOption = this.innerText,
				thisSelect = this.closest(".select");
			currentItem.innerHTML = selectOption;
			selectInput.value = selectOption;
			selectItem.forEach((item) => {
				item.classList.remove("is-active");
			});
			this.classList.add("is-active");
			thisSelect.classList.remove("is-active");
		}
		document.addEventListener("click", (e) => {
			if (!select.contains(e.target)) {
				select.classList.remove("is-active");
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
customSelect()
mMenu()
lkMenuToggle()
topToTableHead()


