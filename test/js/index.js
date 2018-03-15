// 图表的宽度和高度
var width = 600;
var height = 600;

var dataset = [['Chrome', 72.5], ['IE', 5.3], ['Firefox', 16.3], ['Safari', 3.5], ['Opera', 1.0], ['Others', 1.4]];

var pie = d3.pie()
            .sort(null)
            .value(function(d){
              return d[1];
            });
var piedata = pie(dataset);

var outerRadius = width / 4;
var innerRadius = 0;

var arc = d3.arc()
            .outerRadius(outerRadius)
            .innerRadius(innerRadius);

var colors = d3.schemeCategory10;

var svg = d3.select('body')
			.append('svg')
			.attr('width', width)
			.attr('height', height);

var arcs = svg.selectAll('g')
              .data(piedata)
              .enter()
              .append('g')
              .attr('transform', 'translate(' + width / 2 + ',' + height / 2 + ')');

arcs.append('path')
    .attr('fill', function(d, i){
      return colors[i];
    })
    .attr('d', function(d){
      return arc(d);
    });

arcs.append('text')
		.attr('transform', function(d, i){
			var x = arc.centroid(d)[0] * 2.8;
			var y = arc.centroid(d)[1] * 2.8;
			if(i === 4) {
				return 'translate(' + (x * 1.2) + ', ' + (y * 1.2) + ')';
			} else if(i === 3) {
			  return 'translate(' + (x - 40) + ', ' + y + ')';
			} else if(i === 5) {
				return 'translate(' + (x + 40) + ', ' + y + ')';
			}
			return 'translate(' + x + ', ' + y + ')';
		})
		.attr('text-anchor', 'middle')
		.text(function(d){
			var percent = Number(d.value) / d3.sum(dataset, function(d){
				return d[1];
			}) * 100;
			return d.data[0] + ' ' + percent.toFixed(1) + '%';
		})

arcs.append('line')
		.attr('stroke', 'black')
		.attr('x1', function(d){ return arc.centroid(d)[0] * 2; })
		.attr('y1', function(d){ return arc.centroid(d)[1] * 2; })
		.attr('x2', function(d, i){
			if(i === 4) {
				return arc.centroid(d)[0] * 3.2;
			}
			return arc.centroid(d)[0] * 2.5;
		})
		.attr('y2', function(d, i){
			if(i === 4) {
				return arc.centroid(d)[1] * 3.2;
			}
			return arc.centroid(d)[1] * 2.5;
		});