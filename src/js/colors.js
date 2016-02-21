(function() {

  OctopusSkin.color = color;

  function color(h, s, v) {
    if (typeof h === 'undefined') {
      h = Math.random();
    }

    if (typeof s === 'undefined') {
      s = 1;
    }

    if (typeof v === 'undefined') {
      v = 1;
    }

    var rgb = hsvToRgb(h, s, v);

    return {
      rgb: rgb,
      hex: rgbToHex.apply(null, rgb),
      opposite: opposite.bind(null, h, s, v)
    }
  }

  function opposite(h, s, v) {
    return color(circleAdd(h, 0.5), s, v);
  }

  function circleAdd(a, b) {
    var sum = a + b;
    while (sum > 1) {
      sum -= 1;
    }
    while (sum < 0) {
      sum += 1;
    }
    return sum;
  }

  function rgbToHex(r, g, b) {
    var str = "#" + ((1 << 24) + (r << 16) + (g << 8) + b).toString(16).slice(1);
    return str.substr(0, 7);
  }

  function hsvToRgb(h, s, v) {
    var r, g, b;

    var i = Math.floor(h * 6);
    var f = h * 6 - i;
    var p = v * (1 - s);
    var q = v * (1 - f * s);
    var t = v * (1 - (1 - f) * s);

    switch (i % 6) {
      case 0: r = v, g = t, b = p; break;
      case 1: r = q, g = v, b = p; break;
      case 2: r = p, g = v, b = t; break;
      case 3: r = p, g = q, b = v; break;
      case 4: r = t, g = p, b = v; break;
      case 5: r = v, g = p, b = q; break;
    }

    return [
      r * 255,
      g * 255,
      b * 255
    ];
  }
})();

