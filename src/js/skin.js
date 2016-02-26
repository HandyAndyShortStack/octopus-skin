(function() {

  OctopusSkin.skin = skin;

  function skin(svg) {

    var el = svg.append('rect')
        .attr('x', 0 - (OctopusSkin.width / 2))
        .attr('y', 0 - (OctopusSkin.height / 2))
        .attr('width', OctopusSkin.width)
        .attr('height', OctopusSkin.height)
        .attr('stroke-width', 0);

    return el;
  };
})();
