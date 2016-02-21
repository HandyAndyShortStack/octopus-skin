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

    return svg.append('path')
        .attr('stroke', 'black')
        .attr('fill', 'transparent')
        .attr('d', path);
  }

  function polarToCart(distance, angle) {
    var x = Math.cos(angle) * distance;
    var y = Math.sin(angle) * distance;
    return {
      x: x,
      y: y
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
})();