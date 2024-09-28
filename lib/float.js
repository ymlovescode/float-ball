class Float {
  el = null;
  //  拖动区域位置
  floatLeft = 0;
  floatTop = 0;
  floatRight = 0;
  floatBottom = 0;

  //   元素大小
  elementWidth = 0;
  elementHeight = 0;
  //  鼠标位置
  mouseX = 0;
  mouseY = 0;
  dragger = false;
  // 鼠标点击下去的时间点
  mouseDownTimeStamp = 0;
  // 时间间隔，用来区分点击还是拖动。
  timeInterval = 200;
  events = {
    click: null,
  };

  constructor(options) {
    this.handleInit(options);
  }

  handleInit(options) {
    if (!options.target) {
      console.error("target is required!");
      return;
    }
    options.events && (this.events = options.events);
    const element = document.querySelector(options.target);
    if (!element) {
      console.error("target element is required!");
      return;
    }
    this.el = element;
    const position = this.el.getBoundingClientRect();
    this.el.style.position = "fixed";
    this.floatLeft = position.left;
    this.floatTop = position.top;
    this.floatRight = position.right;
    this.floatBottom = position.bottom;
    this.elementWidth = position.width;
    this.elementHeight = position.height;
    this.initEvents();
    return true;
  }
  initEvents() {
    this.el.addEventListener("mousedown", this.handleMouseDown);
    document.addEventListener("mousemove", this.handleMouseMove);
    document.addEventListener("mouseup", this.handleMouseUp);
  }

  handleMouseMove = (e) => {
    if (!this.dragger) {
      return;
    }
    this.handlePositionChange(e);
  };

  handleMouseUp = (e) => {
    const currentTimeStamp = new Date().getTime();
    if (currentTimeStamp - this.mouseDownTimeStamp > this.timeInterval) {
      e.stopPropagation();
    } else {
      this.events.click && this.events.click();
    }

    this.dragger = false;
  };

  handleMouseDown = (e) => {
    this.mouseDownTimeStamp = new Date().getTime();
    this.dragger = true;
    e.preventDefault();
    this.handlePositionChange(e);
  };

  handlePositionChange(e) {
    // 元素中心
    const elementCenterX = this.floatLeft + this.elementWidth / 2;
    const elementCenterY = this.floatTop + this.elementHeight / 2;
    // 鼠标中心
    const mouseX = e.clientX;
    const mouseY = e.clientY;
    // 偏移量
    const offsetX = mouseX - elementCenterX;
    const offsetY = mouseY - elementCenterY;

    this.el.style.left = offsetX + this.floatLeft + "px";
    this.el.style.top = offsetY + this.floatTop + "px";

    const position = this.el.getBoundingClientRect();
    this.floatLeft = position.left;
    this.floatTop = position.top;
    this.floatRight = position.right;
    this.floatBottom = position.bottom;
  }

  reset() {
    this.el = null;
  }
}

export default Float;
