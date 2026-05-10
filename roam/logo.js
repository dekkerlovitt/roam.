/* roam. — logo background remover
   Strips white backgrounds from logo PNGs, preserving original colors.
   Footer logos use a higher threshold to keep the cream-colored logo. */
(function () {
  function stripBackground(img, threshold) {
    if (img.dataset.recolored) return;
    img.dataset.recolored = '1';

    var c = document.createElement('canvas');
    var ctx = c.getContext('2d');
    c.width  = img.naturalWidth;
    c.height = img.naturalHeight;
    ctx.drawImage(img, 0, 0);

    try {
      var d  = ctx.getImageData(0, 0, c.width, c.height);
      var px = d.data;
      for (var i = 0; i < px.length; i += 4) {
        var alpha = px[i + 3];
        var lum   = (px[i] + px[i + 1] + px[i + 2]) / 3;
        if (alpha < 128 || lum > threshold) {
          px[i + 3] = 0;
        }
      }
      ctx.putImageData(d, 0, 0);
      img.src = c.toDataURL('image/png');
    } catch (e) {
      // cross-origin fallback
    }
  }

  function init() {
    document.querySelectorAll('.logo-img, .hero-logo').forEach(function (img) {
      if (img.complete && img.naturalWidth > 0) {
        stripBackground(img, 200);
      } else {
        img.addEventListener('load', function () { stripBackground(img, 200); });
      }
    });
    document.querySelectorAll('.footer-logo-img').forEach(function (img) {
      if (img.complete && img.naturalWidth > 0) {
        stripBackground(img, 245);
      } else {
        img.addEventListener('load', function () { stripBackground(img, 245); });
      }
    });
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }
})();
