OctopusSkin.dot = function(svg) {

  var radius = OctopusSkin.width / 10;
  var segments = 12;

  var controlShortSide = (4 / 3) * Math.tan(Math.PI / (2 * segments)) * radius;
  var controlRadius = Math.pow(Math.pow(controlShortSide, 2) + Math.pow(radius, 2), 0.5);
  var controlAngle = Math.asin(controlShortSide / controlRadius);

  var segmentAngle = (2 * Math.PI) / segments;

  var points = [];
  for (var i = 0; i < segments; i += 1) {
    var pointAngle = segmentAngle * i;
    var point = OctopusSkin.polarToCart(radius, pointAngle);

    point.ca = OctopusSkin.polarToCart(controlRadius, pointAngle + controlAngle);
    point.cb = OctopusSkin.polarToCart(controlRadius, pointAngle + segmentAngle - controlAngle);
    
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
        point.cb.x + ' ' + point.cb.y + ', ' +
        nextPoint.x + ' ' + nextPoint.y;
  }

  return svg.append('path')
      .attr('stroke', 'black')
      .attr('fill', 'transparent')
      .attr('d', path);
};
