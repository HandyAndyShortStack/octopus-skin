(function() {

  OctopusSkin.skin = skin;

  function skin(svg) {

    var color = OctopusSkin.color();

    var el = svg.append('rect')
        .attr('x', 0 - (OctopusSkin.width / 2))
        .attr('y', 0 - (OctopusSkin.height / 2))
        .attr('width', OctopusSkin.width)
        .attr('height', OctopusSkin.height)
        .attr('stroke-width', 0)

    return({
      el: el,
      color: color,
      setColor: setColor.bind(null, el)
    });
  };

  function setColor(el, color) {
    el.attr('fill', color.hex);
  }
})();
