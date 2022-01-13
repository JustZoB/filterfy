window.addEventListener('load', function () {
  const sections = document.querySelectorAll('section');
  const content = document.querySelector('main');

  const thirdBlock = document.querySelector('.section__content--mobile .blocks');
  const thirdBlockItems = thirdBlock.querySelectorAll('.item');

  const documentWidth = document.documentElement.clientWidth;
  const documentHeight = document.documentElement.clientHeight;
  const aspectRatio = documentWidth / documentHeight;

  let spin_value = 0;
  let spin_horizontal = 0;
  let can_scroll = true;
  let isDrag = false;
  let isZoom = false;

  let canDragX = true;
  let canDragY = true;

  let clickX = 0;
  let clickY = 0;

  let percentDragX = 0;
  let percentDragY = 0;

  let percentScroll = 5;

  if (documentWidth >= 996) {
    percentScroll = 5;
  } else if (documentWidth >= 568) {
    percentScroll = 10;
  } else {
    percentScroll = 15;
  }

  initVerticalButtons();
  initHorizontalButtons();
  initHorizontalArrows();
  initVerticalArrow();

  initMouseEvents();
  initTouchEvents();
  initKeyEvents();

  function initVerticalButtons() {
    const buttons = document.querySelectorAll('.nav .nav__item');

    buttons[0].classList.add('active');
    sections[0].classList.add('active');

    document.querySelector('.logo').addEventListener('click', function () {
      document.querySelector('.nav__item.active').classList.remove('active');
      document.querySelector('section.active').classList.remove('active');
      buttons[0].classList.add('active');
      sections[0].classList.add('active');
      spin_value = 0;
      scroll_content(0);
    })

    for (let i = 0; i < buttons.length; i++) {
      buttons[i].addEventListener('click', function () {
        document.querySelector('.nav__item.active').classList.remove('active');
        document.querySelector('section.active').classList.remove('active');
        this.classList.add('active');
        sections[i].classList.add('active');
        spin_value = i;
        scroll_content(spin_value);
      });
    }
  }

  function initHorizontalButtons() {
    document.querySelector('.section__content--mobile').insertAdjacentHTML('beforeend',
      `<div class='buttons'></div>`
    );
    const buttons_horizontal = document.querySelector('.section__content--mobile .buttons');
    thirdBlockItems.forEach(item => {
      buttons_horizontal.insertAdjacentHTML('afterbegin',
        `<div class='buttons__item'></div>`
      );
    });
    buttons_horizontal.insertAdjacentHTML('beforeend',
      `<img class='activeImage' src='../images/list.svg'>`
    );
    const buttons_horizontal_items = document.querySelectorAll('.buttons__item');

    for (let i = 0; i < buttons_horizontal_items.length; i++) {
      buttons_horizontal_items[i].addEventListener('click', function () {
        document.querySelector('.buttons__item.active').classList.remove('active');
        document.querySelector('.section__content--mobile .blocks .item.active').classList.remove('active');
        this.classList.add('active');
        thirdBlockItems[i].classList.add('active');
        spin_horizontal = i;
        scroll_horizontal(spin_horizontal);
      });
    }

    thirdBlockItems[0].classList.add('active');
    buttons_horizontal.querySelectorAll('.buttons__item')[0].classList.add('active');
  }

  function initHorizontalArrows() {
    const arrowRight = document.querySelector('.section__content--mobile .arrow-right');
    const arrowLeft = document.querySelector('.section__content--mobile .arrow-left');

    function setPositionOfArrows() {
      let firstImageHeight = document.querySelector('.section__content--mobile .image').offsetHeight + 20;

      arrowRight.style.top = `${firstImageHeight / 2}px`;
      arrowLeft.style.top = `${firstImageHeight / 2}px`;
    }

    setPositionOfArrows();
    window.addEventListener('resize', () => {
      setPositionOfArrows();
    });

    arrowRight.addEventListener('click', function () {
      if (spin_horizontal < thirdBlockItems.length - 1) spin_horizontal += 1;
      scroll_horizontal(spin_horizontal);
    });

    arrowLeft.addEventListener('click', function () {
      if (spin_horizontal > 0) spin_horizontal -= 1;
      scroll_horizontal(spin_horizontal);
    });
  }

  function initVerticalArrow() {
    let arrowBottom = document.querySelector('.home .arrow-bottom');

    arrowBottom.addEventListener('click', function () {
      spin_value += 1;
      scroll_content(spin_value);
    });
  }

  function initMouseEvents() {
    window.addEventListener('mousedown', function (e) {
      dragOn(e.clientX, e.clientY);
    });

    window.addEventListener('mousemove', function (e) {
      dragStartMove(e.clientX, e.clientY);
      dragMoveX(e.clientX);
      dragMoveY(e.clientY);
    });

    window.addEventListener('mouseup', function (e) {
      dragOff();
    });

    const mouseWheel = (/Firefox/i.test(navigator.userAgent)) ? 'DOMMouseScroll' : 'mousewheel';

    window.addEventListener(mouseWheel, function (e) {
      if (can_scroll && !isDrag && !isZoom) {

        can_scroll = false;

        if (e.deltaY > 0 || e.detail > 0) {
          // scroll down
          if (spin_value < sections.length - 1) spin_value += 1;
        } else {
          // scroll up
          if (spin_value > 0) spin_value -= 1;
        }

        scroll_content(spin_value);
      }

      setTimeout(function () {
        can_scroll = true;
      }, 560);
    });
  }

  function initTouchEvents() {
    window.addEventListener('touchstart', function (e) {
      dragOn(e.changedTouches[0].clientX, e.changedTouches[0].clientY);
    });

    window.addEventListener('touchmove', function (e) {
      dragStartMove(e.changedTouches[0].clientX, e.changedTouches[0].clientY);
      dragMoveX(e.changedTouches[0].clientX);
      dragMoveY(e.changedTouches[0].clientY);
    });

    window.addEventListener('touchend', function (e) {
      dragOff();
    });
  }

  function initKeyEvents() {
    window.addEventListener('keydown', function (e) {
      if (e.key === 'Control') {
        isZoom = true;
      }
    });

    window.addEventListener('keyup', function (e) {
      if (can_scroll) {
        can_scroll = false;

        if (e.code === 'PageDown' || e.code === 'ArrowDown') {
          if (spin_value < sections.length - 1) spin_value += 1;
          scroll_content(spin_value);
        } else if (e.code === 'PageUp' || e.code === 'ArrowUp') {
          if (spin_value > 0) spin_value -= 1;
          scroll_content(spin_value);
        } else if (spin_value === 2 && (e.code === 'ArrowRight')) {
          if (spin_horizontal < thirdBlockItems.length - 1) spin_horizontal += 1;
          scroll_horizontal(spin_horizontal);
        } else if (spin_value === 2 && (e.code === 'ArrowLeft')) {
          if (spin_horizontal > 0) spin_horizontal -= 1;
          scroll_horizontal(spin_horizontal);
        }
      }

      if (e.key === 'Control') {
        isZoom = false;
      }

      setTimeout(function () {
        can_scroll = true;
      }, 560);
    });
  }

  function dragOn(x, y) {
    if (can_scroll) {
      clickX = x;
      clickY = y;
      isDrag = true;
      content.classList.add('drag');
    }
  }

  function dragStartMove(x, y) {
    if (can_scroll && isDrag) {
      if (canDragX === canDragY) {
        if (Math.abs(clickY - y) > 4) {
          canDragX = false;
          canDragY = true;
        } else if (spin_value === 2 && Math.abs(clickX - x) > 4) {
          canDragX = true;
          canDragY = false;
        }
      }
    }
  }

  function dragMoveY(y) {
    if (can_scroll && isDrag && canDragY) {
      percentDragY = (clickY - y) / documentHeight * 100;
      let moveY = Math.round(spin_value * 100 + percentDragY);

      if (moveY > ((sections.length - 1) * 100)) {
        moveY = (sections.length -1) * 100;
      } else if (moveY < 0) {
        moveY = 0;
      }

      let lastY = content.style.transform.match(/\d+/g);
      lastY = lastY === null ? 0 : lastY[0];

      if (moveY !== lastY) {
        setTransform(content, 'Y', moveY);
      }
    }
  }

  function dragMoveX(x) {
    if (can_scroll && isDrag && canDragX && spin_value === 2) {
      percentDragX = (clickX - x) / documentWidth * 100;
      let moveX = Math.round(spin_horizontal * 100 + percentDragX);

      if (moveX > ((thirdBlockItems.length - 1) * 100)) {
        moveX = (thirdBlockItems.length - 1) * 100;
      } else if (moveX < 0) {
        moveX = 0;
      }

      let lastX = thirdBlock.style.transform.match(/\d+/g);
      lastX = lastX === null ? 0 : lastX[0];

      if (moveX !== lastX) {
        setTransform(thirdBlock, 'X', moveX);
      }
    }
  }

  function dragOff() {
    if (can_scroll) {
      can_scroll = false;

      isDrag = false;

      content.classList.remove('drag');

      if (canDragY) {
        if (Math.abs(percentDragY) < percentScroll) {
          // don't scroll
          console.log('KEK');
          setTimeout(function () {
            can_scroll = true;
          }, 200);
        } else if (percentDragY > percentScroll) {
          // scroll down
          if (spin_value < sections.length - 1) spin_value += 1;
        } else {
          // scroll up
          if (spin_value > 0) spin_value -= 1;
        }
      }

      if (canDragX) {
        if (Math.abs(percentDragX) < percentScroll * aspectRatio) {
          // don't scroll
          console.log('KEK');
          setTimeout(function () {
            can_scroll = true;
          }, 200);
        } else if (percentDragX > percentScroll * aspectRatio) {
          // scroll right
          if (spin_horizontal < thirdBlockItems.length - 1) spin_horizontal += 1;
        } else {
          // scroll left
          if (spin_horizontal > 0) spin_horizontal -= 1;
        }
      }

      scroll_horizontal(spin_horizontal);
      scroll_content(spin_value);

      canDragX = true;
      canDragY = true;

      percentDragX = 0;
      percentDragY = 0;

      setTimeout(function () {
        can_scroll = true;
      }, 560);
    }
  }

  function scroll_content(count) {
    const buttons = document.querySelectorAll('.nav .nav__item');

    setTransform(content, 'Y', count * 100);

    document.querySelector('.nav__item.active').classList.remove('active');
    document.querySelector('section.active').classList.remove('active');
    buttons[count].classList.add('active');
    sections[count].classList.add('active');
  }

  function scroll_horizontal(count) {
    setTransform(thirdBlock, 'X', count * 100);

    document.querySelector('.buttons__item.active').classList.remove('active');
    document.querySelector('.section__content--mobile .blocks .item.active').classList.remove('active');
    thirdBlockItems[count].classList.add('active');

    scrollHorizontalButtons(count)
    scrollHorizontalArrows(count);
  }

  function scrollHorizontalButtons(count) {
    const buttons_horizontal = document.querySelector('.section__content--mobile .buttons');
    const buttons_horizontal_items = document.querySelectorAll('.buttons__item');

    buttons_horizontal_items[count].classList.add('active');
    buttons_horizontal.querySelector('.activeImage').style.left = `${buttons_horizontal_items[count].offsetLeft}px`;
  }

  function scrollHorizontalArrows(count) {
    const arrowRight = document.querySelector('.section__content--mobile .arrow-right');
    const arrowLeft = document.querySelector('.section__content--mobile .arrow-left');

    if (count === thirdBlockItems.length - 1) {
      arrowLeft.classList.remove('disabled');
      arrowRight.classList.add('disabled');
    } else if (count === 0) {
      arrowLeft.classList.add('disabled');
      arrowRight.classList.remove('disabled');
    } else {
      arrowLeft.classList.remove('disabled');
      arrowRight.classList.remove('disabled');
    }
  }

  function setTransform(block, direction, distance) {
    const directionRelative = direction === 'X' ? 'vw' : 'vh';
    block.setAttribute('style', `\
      -webkit-transform: translate${direction}(-${distance}${directionRelative});\
      -ms-transform: translate${direction}(-${distance}${directionRelative});\
      -o-transform: translate${direction}(-${distance}${directionRelative});\
      transform: translate${direction}(-'${distance}${directionRelative});\
    `);
  }
});
