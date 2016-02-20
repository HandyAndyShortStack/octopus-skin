(function() {

  var radius = OctopusSkin.width / 10;
  var segments = 12;
  var distortionRange = radius / 4;

  var controlShortSide = (4 / 3) * Math.tan(Math.PI / (2 * segments)) * radius;
  var controlRadius = Math.pow(Math.pow(controlShortSide, 2) + Math.pow(radius, 2), 0.5);
  var controlAngle = Math.asin(controlShortSide / controlRadius);

  var segmentAngle = (2 * Math.PI) / segments;

  window.OctopusSkin.dot = function(svg) {

    var points = [];
    for (var i = 0; i < segments; i += 1) {
      var pointAngle = segmentAngle * i;
      var dv = distortionVector();

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
  };

  function polarToCart(distance, angle) {
    var x = Math.cos(angle) * distance;
    var y = Math.sin(angle) * distance;
    return {
      x: x,
      y: y
    };
  }

  function distortionVector() {
    return {
      x: (Math.random() * distortionRange) - (distortionRange / 2),
      y: (Math.random() * distortionRange) - (distortionRange / 2)
    };
  }

  function sumPoints(a, b) {
    return {
      x: a.x + b.x,
      y: a.y + b.y
    };
  };
})();
