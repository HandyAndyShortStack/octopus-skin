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
        .attr('fill', color.hex);

    return({
      el: el,
      color: color
    });
  };
})();
