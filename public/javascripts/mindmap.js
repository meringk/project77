

var w = 1000,
    h = 879,
    circleWidth = 2;

var boxPo = "0 150 1000 400",
    circle_s = 40,
    circle_m = 50,
    circle_l = 50

if (skel.vars.mobile) {
    boxPo = "150 100 700 1000";
    circle_s = 50,
        circle_m = 60,
        circle_l = 80
}

var palette = {
    "lightgray": "#E5E8E8",
    "gray": "#708284",
    "mediumgray": "#536870",
    "blue": "#3B757F"
}

var colors = d3.scale.category20();

var nodes = [
    { name: "Skills", target: [0], etc: "능력" },
    { name: "Personal", target: [1], etc: "사생활" },
    { name: "AWS", target: [0], value: circle_m, etc: "클라우드서버" },
    { name: "HTML5", target: [0], value: circle_m, etc: "HTML5" },
    { name: "CSS3", target: [0], value: circle_s, etc: "CSS" },
    { name: "jQuery", target: [0], value: circle_m, etc: "jQuery" },
    { name: "TRIP", target: [1], value: circle_m, etc: "여행" },
    { name: "ALCHOLE", target: [1], value: circle_m, etc: "술" },
    { name: "CALENDAR", target: [1], value: circle_m, etc: "달력, 일정" },
];

var links = [];

for (var i = 0; i < nodes.length; i++) {
    if (nodes[i].target !== undefined) {
        for (var x = 0; x < nodes[i].target.length; x++)
            links.push({
                source: nodes[i],
                target: nodes[nodes[i].target[x]]
            });
    };
};



var myChart = d3.select('#mindmap')
    .append("div")
    .classed("svg-container", true)
    .append('svg')
    .attr("preserveAspectRatio", "xMinYMin meet")
    .attr("viewBox", boxPo)
    .classed("svg-content-responsive", true)


var force = d3.layout.force()
    .nodes(nodes)
    .links([])
    .gravity(0.1)
    .charge(-1000)
    .size([w, h]);

var link = myChart.selectAll('line')
    .data(links).enter().append('line')
    .attr('stroke', '#dadada')
    .attr('strokewidth', '1');

var node = myChart.selectAll('circle')
    .data(nodes).enter()
    .append('g')
    .call(force.drag);

var colorInfo = ["white", "white", "#9b59b6", "#1abc9c", "#2ecc71", "#3498db", "#f1c40f", "#f39c12", "#d35400"];
node.append('circle')
    .attr('cx', function (d) { return d.x; })
    .attr('cy', function (d) { return d.y; })
    .attr('r', function (d, i) {
        if (i > 1) {
            //원 크기 초기화
            return circleWidth + d.value;
        } else {
            return circleWidth + 80;
        }
    })
    .attr('fill', function (d, i) {
        return colorInfo[i];
        // if (i > 1) {
        //     return colorInfo[i];
        // } else {
        //     return '#fff';
        // }
    })
    .attr('strokewidth', function (d, i) {
        if (i > 1) {
            return '3';
        } else {
            return '4';
        }
    })
    .attr('stroke', function (d, i) {
        if (i > 1) {
            return '';
        } else {
            return '#dadada';
        }
    })
    .attr('cursor', function (d, i) {
        return 'Move';
    })



force.on('tick', function (e) {

    node.attr('transform', function (d, i) {
        return 'translate(' + d.x + ',' + d.y + ')'
    })

    link
        .attr('x1', function (d) { return d.source.x; })
        .attr('y1', function (d) { return d.source.y; })
        .attr('x2', function (d) { return d.target.x; })
        .attr('y2', function (d) { return d.target.y; })
});


var mindmapInfo = $('#mindmapInfo'),
    mindmapBack = $('.mindmapBack'),
    one = $('#one');

node.on('click', function (e) {
    force
        .alpha(0.8)

    for (var i = 0; i < 9; i++) {
        if (node[0][i].__data__.target) {
            if (node[0][i].__data__.target[0] != this.__data__.target) {
                //내가 누른 반대편 타겟을 0.2로 해줌
                node[0][i].childNodes[0].style.fillOpacity = "0.1";
                node[0][i].childNodes[1].style.fillOpacity = "0.2";
                //console.dir(link);
            } else {
                node[0][i].childNodes[0].style.fillOpacity = "1";
                node[0][i].childNodes[1].style.fillOpacity = "1";
            }

            if(link[0][i].__data__.target.target[0] != this.__data__.target){
                link[0][i].style.stroke = "rgba(239, 239, 239, 0.4)";
            }else{
                link[0][i].style.stroke = "rgb(119, 119, 119)";
                link[0][i].style.strokewidth = "3px";
            }
        }

    }

    // console.dir(this.__data__.etc)
    // console.log(this.__data__.target);
    // console.dir(this)
    // console.dir(this.childNodes[0].attributes[1].value);
    // console.dir(link);
    // console.dir(force);


    mindmapInfo.addClass("mindmapInfo_on");
    mindmapInfo[0].style.backgroundColor = this.childNodes[0].attributes[1].value;
    mindmapInfo[0].style.filter = "alpha(opacity=10)";

    console.log(this.childNodes[0].attributes[1].value)
    mindmapBack[0].style.backgroundColor = this.childNodes[0].attributes[1].value;

    //one[0].style.fillOpacity= "0.1";



    mindmapInfo[0].innerHTML = "<div>" + this.__data__.etc + "</div>";
});


node.append('text')
    .text(function (d) { return d.name; })
    .attr('font-family', 'Raleway', 'Helvetica Neue, Helvetica')
    .attr('fill', function (d, i) {
        console.log(d.value);
        if (i > 1 && d.value < 10) {
            return palette.mediumgray;
        } else if (i > 1 && d.value > 10) {
            return palette.lightgray;
        } else {
            return palette.blue;
        }
    })
    .attr('text-anchor', function (d, i) {
        return 'middle';
    })
    .attr('font-size', function (d, i) {
        if (i > 1) {
            return '20px';
        } else {
            return '40px';
        }
    })
    .attr('cursor', function (d, i) {
        return 'Move';
    });

force.start();


// mindmap
$('#two')
    .scrollex({
        leave: function () {
            // console.log(force)
        }
    });



//실시간 브라우저 크기에 따라 마인드맵 좌표 수정
$(window).resize(function () {
    if (skel.vars.mobile) return;
    if (window.innerWidth > 1740) {
        boxPo = "-150 150 1000 570";
    } else {
        boxPo = "0 150 1000 570";
    }
    myChart
        .attr("viewBox", boxPo)

}).resize();