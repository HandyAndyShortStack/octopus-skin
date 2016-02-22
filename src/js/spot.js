(function() {

  window.OctopusSkin.spot = spot;

  var defaults = {
    radius: 20,
    segments: 12,
    distortionCoefficient: 0.1
  };

  function spot(svg, config) {

    if (typeof config === 'undefined') {
      config = {};
    }

    for (var key in defaults) {
      if (Object.prototype.hasOwnProperty.call(defaults, key) &&
          typeof config[key] === 'undefined') {
        config[key] = defaults[key];
      }
    }

    var radius = config.radius;
    var segments = config.segments;

    var distortionRange = radius * config.distortionCoefficient;
    var controlShortSide = (4 / 3) * Math.tan(Math.PI / (2 * segments)) * radius;
    var controlRadius = Math.pow(Math.pow(controlShortSide, 2) + Math.pow(radius, 2), 0.5);
    var controlAngle = Math.asin(controlShortSide / controlRadius);

    var segmentAngle = (2 * Math.PI) / segments;

    var points = [];
    for (var i = 0; i < segments; i += 1) {
      var pointAngle = segmentAngle * i;
      var dv = distortionVector(distortionRange);

      var point = sumPoints(polarToCart(radius, pointAngle), dv);

      point.cb = sumPoints(polarToCart(controlRadius, pointAngle - controlAngle), dv);
      point.ca = sumPoints(polarToCart(controlRadius, pointAngle + controlAngle), dv);
      
      points.push(point);
    }

    var el = svg.append('path')
        .attr('stroke', 'black')
        .attr('fill', 'transparent')
        .attr('d', getPath(points, segments));

    return {
      el: el,
      resize: resize.bind(null, el, points, segments),
      setColor: setColor.bind(null, el),
      setStrokeWidth: setStrokeWidth.bind(null, el)
    };
  }

  function polarToCart(distance, angle) {
    var x = Math.cos(angle) * distance;
    var y = Math.sin(angle) * distance;
    return {
      x: x,
      y: y
    };
  }

  function cartToPolar(x, y) {
    return {
      distance: Math.sqrt(Math.pow(x, 2) + Math.pow(y, 2)),
      angle: Math.atan2(y, x)
    };
  }

  function distortionVector(range) {
    return {
      x: (Math.random() * range) - (range / 2),
      y: (Math.random() * range) - (range / 2)
    };
  }

  function sumPoints(a, b) {
    return {
      x: a.x + b.x,
      y: a.y + b.y
    };
  };

  function getPath(rawPoints, segments, size) {
    if (typeof size === 'undefined') {
      size = 1;
    }

    var points = rawPoints.map(function(point) {
      var main = scalePoint(point.x, point.y, size);
      var ca = scalePoint(point.ca.x, point.ca.y, size);
      var cb = scalePoint(point.cb.x, point.cb.y, size);
      return {
        x: main.x,
        y: main.y,
        ca: ca,
        cb: cb
      };
    });

    var path = 'M ' + points[0].x + ' ' + points[0].y;
    for (var i = 0; i < segments; i += 1) {
      var point = points[i];
      var nextPoint = points[i + 1];
      if (typeof nextPoint === 'undefined') {
        nextPoint = points[0];
      }
      path += ' C ' +
          point.ca.x + ' ' + point.ca.y + ', ' +
          nextPoint.cb.x + ' ' + nextPoint.cb.y + ', ' +
          nextPoint.x + ' ' + nextPoint.y;
    }

    return path;
  }

  function scalePoint(x, y, size) {
    var polar = cartToPolar(x, y);
    return polarToCart(polar.distance * size, polar.angle);
  }

  function resize(el, points, segments, size) {
    return el.attr('d', getPath(points, segments, size));
  }

  function setColor(el, color) {
    return el.attr('fill', color.hex);
  }

  function setStrokeWidth(el, width) {
    return el.attr('stroke-width', width);
  }
})();
