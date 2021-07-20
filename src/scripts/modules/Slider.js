const slider = document.querySelector(".slider");

if (slider) {
  const sliderWrap = slider.querySelector(".slider__wrap");
  const arrow = document.querySelector(".solve .arrow");
  const mobileBlocks = document.querySelector(".section__content--mobile");
  const firstBlock = document.querySelector(".solve .section__content .blocks .block.active");

  function setWidth() {
    const sliderWidth = slider.clientWidth;
    const mobileBlocksWidth = mobileBlocks.clientWidth;

    arrow.style.top = `${firstBlock.offsetTop + firstBlock.clientHeight / 2}px`;

    sliderWrap.querySelectorAll(".item").forEach(item => {
      item.style.minWidth = `${sliderWidth}px`;
      item.style.maxWidth = `${sliderWidth}px`;
    });
    mobileBlocks.querySelectorAll(".item").forEach(item => {
      item.style.minWidth = `${mobileBlocksWidth}px`;
      item.style.maxWidth = `${mobileBlocksWidth}px`;
    });
  }

  setWidth();

  window.addEventListener('resize', () => {
    setWidth();
  });


  const blocksButtons = document.querySelectorAll(".solve .blocks .block");

  for (let i = 0; i < blocksButtons.length; i++) {
    const block = blocksButtons[i];

    block.addEventListener('click', function () {
      arrow.style.top = `${block.offsetTop + block.clientHeight/2}px`;
      document.querySelector(".solve .blocks .block.active").classList.remove("active");
      block.classList.add("active");
      sliderWrap.style.transform = `translate(-${20 * i}%, -50%)`;
    });
  }
}
