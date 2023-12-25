// Custom scripts
// Мобильное меню бургер
function burgerMenu() {
  const burger = document.querySelector('.burger')
  const menu = document.querySelector('.menu')
  const navbar = document.querySelector('.navbar')
  const body = document.querySelector('body')
  burger.addEventListener('click', () => {
    if (!menu.classList.contains('active')) {
      menu.classList.add('active')
      navbar.classList.add('active')
      burger.classList.add('active-burger')
      body.classList.add('locked')
    } else {
      menu.classList.remove('active')
      navbar.classList.remove('active')
      burger.classList.remove('active-burger')
      body.classList.remove('locked')
    }
  })
  //снять классы при клике на элементы меню
  const menuItemLinks = document.querySelectorAll('.menu__item-link, .menu__subitem-link')

  menuItemLinks.forEach(item => {
    item.addEventListener('click', function () {
      menu.classList.remove('active')
      navbar.classList.remove('active')
      burger.classList.remove('active-burger')
      body.classList.remove('locked')
    })
  });

  // Вот тут мы ставим брейкпоинт навбара
  window.addEventListener('resize', () => {
    if (window.innerWidth > 991.98) {
      menu.classList.remove('active')
      navbar.classList.remove('active')
      burger.classList.remove('active-burger')
      body.classList.remove('locked')
    }
  })
}
burgerMenu();


// Вызываем эту функцию, если нам нужно зафиксировать меню при скролле.
function fixedNav() {
  const nav = document.querySelector('nav')

  // тут указываем в пикселях, сколько нужно проскроллить что бы наше меню стало фиксированным
  const breakpoint = 1
  if (window.scrollY >= breakpoint) {
    nav.classList.add('fixed__nav')
  } else {
    nav.classList.remove('fixed__nav')
  }
}
window.addEventListener('scroll', fixedNav);


function sublistView() {
  const items = document.querySelectorAll('[data-menu-item]');

  const remove = () => {
    items.forEach(item => {
      item.classList.remove('open');
    });
  }

  items.forEach(item => {
    const btn = item.querySelector('[data-menu-item-btn]');
    const list = item.querySelector('[data-menu-item-sublist]');

    btn.addEventListener('click', () => {
      if (!item.classList.contains('open')) {
        remove();
        item.classList.add('open');
      } else {
        item.classList.remove('open');
      }
    });
  });
}

sublistView();


function newsSlider() {
  const container = document.querySelector('.news')
  if (!container) {
    return null
  }

  const swiper = new Swiper('.news__slider', {
    // Default parameters
    slidesPerView: 1,
    spaceBetween: 10,

    pagination: {
      el: '.news__slider-pagination',
      type: 'bullets',
      clickable: true
    },

    // Responsive breakpoints
    breakpoints: {
      // when window width is >= 320px
      320: {
        slidesPerView: 1,
        spaceBetween: 20
      },
      // when window width is >= 640px
      767: {
        slidesPerView: 2.5,
        spaceBetween: 20
      },
      // when window width is >= 640px
      1200: {
        slidesPerView: 3.5,
        spaceBetween: 40
      }
    }
  })
}

newsSlider();

function faqAccardions() {
  const container = document.querySelector('.faq')
  if (!container) {
    return null
  }


  // Аккордеон
  const accordionItems = document.querySelectorAll('[data-accordion-item]');
  let openAccordion = null; // переменная для хранения ссылки на открытый аккордеон

  function toggleAccordion() {
    if (openAccordion && openAccordion !== this) {
      // Если есть открытый аккордеон, который не совпадает с текущим
      openAccordion.classList.remove('active'); // закрыть его
      const openAccordionContent = openAccordion.nextElementSibling;
      if (openAccordionContent) {
        // если у аккордеона есть содержимое
        openAccordionContent.style.maxHeight = null; // сбросить высоту контента
      }
    }

    this.classList.toggle('active'); // открыть или закрыть текущий аккордеон

    const content = this.nextElementSibling;
    if (content) {
      // если у аккордеона есть содержимое
      if (content.style.maxHeight) {
        // Если контент открыт, закрыть его
        content.style.maxHeight = null;
      } else {
        // Если контент закрыт, открыть его
        content.style.maxHeight = content.scrollHeight + "px";
      }
    }

    openAccordion = this; // запомнить ссылку на открытый аккордеон
  }


  accordionItems.forEach(item => item.addEventListener('click', toggleAccordion));
}


faqAccardions();

function modal() {
  const container = document.querySelector('.modal');
  if (!container) {
    return null
  }
  const openModalBtns = document.querySelectorAll('.open-modal-btn');
  const closeModalBtns = document.querySelectorAll('.close-modal-btn');
  const modals = document.querySelectorAll('.modal');
  const body = document.querySelector('body');

  openModalBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      const modalId = btn.dataset.modalId;
      const modal = document.getElementById(modalId);
      modal.classList.add('show');
      body.classList.add('locked');
    });
  });

  closeModalBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      const modal = btn.closest('.modal');
      modal.classList.remove('show');
      body.classList.remove('locked');
    });
  });

  window.addEventListener('click', (event) => {
    if (event.target.classList.contains('modal')) {
      event.target.classList.remove('show');
      body.classList.remove('locked');
    }
  });
}



modal();

document.addEventListener('DOMContentLoaded', function () {
  var customStopVideo = () => {
    var iframe = document.querySelectorAll('iframe');
    Array.prototype.forEach.call(iframe, (iframe) => {
      iframe.contentWindow.postMessage(
        JSON.stringify({
          event: 'command',
          func: 'stopVideo',
        }),
        '*'
      );
    });
  };

  var loadVideo = (element) => {
    var iframeSrc = element.getAttribute('data-iframe-src');
    var iframe = document.createElement('iframe');
    iframe.width = '560';
    iframe.height = '315';
    iframe.src = iframeSrc;
    iframe.title = 'YouTube video player';
    iframe.frameBorder = '0';
    iframe.allow =
      'accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share';
    iframe.allowFullscreen = true;

    // Replace the image with the iframe
    element.parentNode.replaceChild(iframe, element);

    // Add a click event listener to stop the video when clicked
    iframe.addEventListener('click', customStopVideo);
  };

  // document.querySelector('.close-modal-btn').onclick = function () {
  //   customStopVideo();
  // };

  document.addEventListener('click', function (event) {
    var modal = document.querySelector('.modal');
    if (event.target !== modal && !modal.contains(event.target)) {
      customStopVideo();
    }
  });

  // Add a click event listener to load the video on image click
  document.addEventListener('click', function (event) {
    if (event.target.hasAttribute('data-video-pic')) {
      loadVideo(event.target);
    }
  });
});

