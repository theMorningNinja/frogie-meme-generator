import { preloader } from './utils/preloader';
import huebee from './utils/huebee';

export default function app() {
  /**
   * Preloader
   */
  const preloaderItems = {
    // gif - preloader
    gif: document.querySelector('.preloader-item'),

    // preloader - overlay
    overlay: document.querySelector('.preloader-overlay'),

    content: document.getElementById('content-wrapper'),

    // section item class for intro animation
    itemsIntro: document.querySelectorAll('.item__intro'),
  };

  window.addEventListener('load', () => {
    preloader(
      preloaderItems.gif,
      preloaderItems.overlay,
      preloaderItems.content,
      preloaderItems.itemsIntro
    );
  });

  /**
   * Meme - generator
   */

  (function () {
    /**
     * Color picker - huebee
     */
    const textColorInput = document.getElementById('color__text-input');
    const strokeColorInput = document.getElementById('color__stroke-input');
    const colorTextHueb = new huebee(textColorInput, {
      setText: true,
      notation: 'hex',
      saturations: 2,
    });
    const strokeTextHueb = new huebee(strokeColorInput, {
      setText: true,
      notation: 'hex',
      saturations: 2,
    });

    /**
     * Meme - generator
     */
    // meme default properties

    const mediaQuery = window.matchMedia('screen and (max-width:1024px)');

    // Set canvas width depending on window width
    function checkMedia(canvasItem) {
      if (!mediaQuery.matches) {
        canvasItem.width = 500;
        canvasItem.height = 500;
      } else {
        canvasItem.width = 320;
        canvasItem.height = 320;
      }

      return canvasItem.width, canvasItem.height;
    }

    let canvas = document.createElement('canvas');
    let canvasWrapper = document.querySelector('.canvas__wrapper');
    canvasWrapper.appendChild(canvas);
    checkMedia(canvas);
    let ctx = canvas.getContext('2d');
    let topTextInput = document.querySelector('#text__top');
    let bottomTextInput = document.querySelector('#text__bottom');
    let img = document.createElement('img');
    let exportBtn = document.querySelector('#export__btn');
    let font = 'Arial';
    let fontSize = '30';
    let colorText = '#cc59d2';
    let strokeColor = '#6EA4BF';

    // Recreate canvas do untaint it / without this default img not showing
    img.onload = function (e) {
      canvas.outerHTML = '';
      canvas = document.createElement('canvas');
      canvasWrapper.appendChild(canvas);
      ctx = canvas.getContext('2d');

      draw();
    };

    // Image reader
    function reader() {
      const imgReader = new FileReader();
      imgReader.onload = function (e) {
        img = new Image();
        img.src = imgReader.result;

        img.onload = function () {
          ctx.drawImage(img, 0, 0, canvas.width, canvas.height);
        };
      };

      imgReader.readAsDataURL(this.files[0]);
    }

    //Add trigger on upload image button
    document.querySelector('#img__input').addEventListener('change', reader);

    //Add trigger for the text inputs
    document.querySelectorAll('.text-input').forEach(e => {
      e.addEventListener('keyup', function () {
        draw();
      });
    });

    // Draw img and text
    function draw() {
      checkMedia(canvas);

      img.width = canvas.width;
      img.height = canvas.height;

      ctx.clearRect(0, 0, canvas.width, canvas.height);
      ctx.drawImage(img, 0, 0, canvas.width, canvas.height);

      ctx.font = `bold ${fontSize}px ${font}`;
      ctx.strokeStyle = strokeColor;
      ctx.fillStyle = colorText;
      ctx.textAlign = 'center';
      ctx.lineWidth = 1;

      ctx.textBaseline = 'top';
      addText(
        topTextInput.value,
        canvas.width / 2,
        fontSize / 2,
        canvas.width,
        fontSize * 1.2,
        'push'
      );

      ctx.textBaseline = 'bottom';
      addText(
        bottomTextInput.value,
        canvas.width / 2,
        canvas.height - fontSize / 2,
        canvas.width,
        -(fontSize * 1.2),
        'unshift'
      );
    }

    // Write the texts
    function addText(text, x, y, allowedWidth, lh, method) {
      var lines = [];
      var line = '';
      var words = text.split(' ');

      for (var i = 0; i < words.length; i++) {
        var measuredLine = line + ' ' + words[i];
        var measuredWidth = ctx.measureText(measuredLine).width;

        if (measuredWidth > allowedWidth) {
          lines[method](line);
          line = words[i] + ' ';
        } else {
          line = measuredLine;
        }
      }

      lines[method](line);

      for (var j = 0; j < lines.length; j++) {
        ctx.fillText(lines[j], x, y + j * lh, allowedWidth);
        ctx.strokeText(lines[j], x, y + j * lh, allowedWidth);
      }
    }

    // Change default font
    document
      .querySelector('#font-option')
      .addEventListener('change', function () {
        font = this.value;
        draw();
      });

    // Change font size
    document
      .querySelector('#text__size-input')
      .addEventListener('change', function () {
        if (this.value < this.min) {
          this.value = this.min;
        } else if (this.value > this.max) {
          this.value = this.max;
        }

        fontSize = this.value;
        draw();
      });

    // Change text color
    colorTextHueb.on('change', function (color) {
      colorText = color;
      draw();
    });

    // Change stroke color
    strokeTextHueb.on('change', function (color) {
      strokeColor = color;
      draw();
    });

    // Convert Canvas to image and export
    exportBtn.addEventListener('click', function () {
      const imgLink = canvas.toDataURL('image/png');
      const link = document.createElement('a');
      link.download = 'my-meme.png';
      link.href = imgLink;
      link.click();
    });

    //Set values on inputs
    img.src =
      'https://drive.google.com/uc?export=view&id=1YWi5KrjCaRNi-zhd3M-sSQPJg2iurP5h';
    document.querySelector('#text__size-input').value = fontSize;
    document.querySelector('#color__text-input').style.backgroundColor =
      colorText;
    document.querySelector('#color__stroke-input').style.backgroundColor =
      strokeColor;
  })();
}
