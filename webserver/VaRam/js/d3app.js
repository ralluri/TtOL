var arc, svg, pie;

function drawD3(data) {

	var width = jQuery("#pieChart").width(),
	    height = 250,
	    radius = Math.min(width, height) / 2;

	var color = d3.scale.ordinal()
	    .range(["#98abc5", "#8a89a6", "#7b6888", "#6b486b", "#a05d56", "#d0743c", "#ff8c00"]);

	arc = d3.svg.arc()
	    .outerRadius(radius - 10)
	    .innerRadius(radius - 70);

	pie = d3.layout.pie()
	    .sort(null)
	    .value(function (d) {
	    return d.frequency;
	});



	svg = d3.select("#pieChart").append("svg")
	    .attr("width", width)
	    .attr("height", height)
	    .append("g")
	    .attr("transform", "translate(" + width / 2 + "," + height / 2 + ")");

	    var g = svg.selectAll(".arc")
	        .data(pie(data))
	        .enter().append("g")
	        .attr("class", "arc");

	    g.append("path")
	        .attr("d", arc)
	        .style("fill", function (d) {
	        return color(d.data.tagName);
	    }).each(function(d){
	    	this._current = d;
	    });

	    g.append("text")
	        .attr("transform", function (d) {
	        return "translate(" + arc.centroid(d) + ")";
	    })
	        .attr("dy", ".35em")
	        .style("text-anchor", "middle")
	        .text(function (d) {
	        return d.data.tagName;
	    });
}

function updatePie(newData) {
	var path = svg.selectAll("path");
	path.data(pie(newData));
    path.transition().duration(750).attrTween("d", arcTween); // redraw the arcs

    var text = svg.selectAll("text");
    text.data(pie(newData));
    text.transition().duration(750).attr("transform", function(d){
    	return "translate(" + arc.centroid(d) + ")";
    }); // redraw the arcs
}

function arcTween(a) {
    var i = d3.interpolate(this._current, a);
    this._current = i(0);
    return function(t) {
        return arc(i(t));
    };
}