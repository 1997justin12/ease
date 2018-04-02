
function compareGraph(){
	var year = $("#exampleFormControlSelect1").val();
	var yearToCompared = $("#exampleFormControlSelect2").val();

	var getDataForGraph = $.ajax({
		url: 'http://localhost/ease_itp_final/getFilterGraph/'+ year + '/'+ yearToCompared,
		method: 'get',
		dataType: 'json'
	});

		getDataForGraph.done(function(data){
			var firstYear = getStudentInfo(data['a']);
			var secondYear = getStudentInfo(data['b']);

			var FirstGWA = setDataSlice(firstYear, 'gwa');
			var SecondGWA = setDataSlice(secondYear, 'gwa');

			var firstInterpersonal   = setDataToAssign(firstYear,FirstGWA, 'interpersonal');
			var secondInterpersonal  = setDataToAssign(secondYear,SecondGWA, 'interpersonal');

			var firstIntrapersonal   = setDataToAssign(firstYear,FirstGWA, 'intrapersonal');
			var secondIntrapersonal  = setDataToAssign(secondYear,SecondGWA, 'intrapersonal');

			var firstStress          = setDataToAssign(firstYear,FirstGWA, 'stress');
			var secondStress         = setDataToAssign(secondYear,SecondGWA, 'stress');

			var firstAdapt           = setDataToAssign(firstYear,FirstGWA, 'adapt');
			var secondAdapt          = setDataToAssign(secondYear,SecondGWA, 'adapt');

			var firstMood            = setDataToAssign(firstYear,FirstGWA, 'mood');
			var secondMood           = setDataToAssign(secondYear,SecondGWA, 'mood');

			var correlatedInterpersonal = {
					first: pearsonResults(firstInterpersonal),
					second: pearsonResults(secondInterpersonal)
				};
			var correlatedIntrapersonal = {
					first: pearsonResults(firstIntrapersonal),
					second: pearsonResults(secondIntrapersonal)
				};
			var correlatedStress = {
					first: pearsonResults(firstStress),
					second: pearsonResults(secondStress),
				};
			var correlatedAdapt = {
					first: pearsonResults(firstAdapt),
					second: pearsonResults(secondAdapt)
				};
			var correlatedMood = {
					first: pearsonResults(firstMood),
					second: pearsonResults(secondMood)
				};

			console.log(correlatedIntrapersonal);

			var graphIntraPersonal = drawGraphScatter('intrapersonal', firstYear, secondYear);
			var graphInterPersonal = drawGraphScatter('interpersonal', firstYear, secondYear);
			var graphStress = drawGraphScatter('stress', firstYear, secondYear);
			var graphAdapt = drawGraphScatter('adaptability', firstYear, secondYear);
			var graphMood = drawGraphScatter('mood', firstYear, secondYear);

			var graphIntraPersonalBar = drawGraphBar('intrapersonal', firstYear, secondYear);
			var graphInterPersonalBar = drawGraphBar('interpersonal', firstYear, secondYear);
			var graphStressBar = drawGraphBar('stress', firstYear, secondYear);
			var graphAdaptabilityBar = drawGraphBar('adaptability', firstYear, secondYear);
			var graphMoodBar = drawGraphBar('mood', firstYear, secondYear);
			
		});

		getDataForGraph.fail(function(data){

		});
}

function getStudentInfo(info){
	var studentInfo = [];
	for(x=0; x<info.length; x++){
		var gwaAverage = 0;
		if(info[x+1] != null &&info[x]['student_id'] == info[x+1]['student_id']){
			gwaAverage += (info[x]['gwa'] + info[x+1]['gwa']) / 2;
			studentInfo.push({
				studentId : info[x]['student_id'],
				interpersonal : info[x]['interpersonal'],
				intrapersonal : info[x]['intrapersonal'],
				stress : info[x]['stress'],
				adaptability : info[x]['adapt'],
				mood : info[x]['mood'],
				gwa : gwaAverage
			});
			x += 1;
		}
	}	
	return studentInfo;
}

function pearsonResults(values) {
var n = values.length;
if (n == 0) return 0;

let meanX = 0;
let meanY = 0;
for (var i = 0; i < n; i++) {
meanX += values[i].x / n
meanY += values[i].y / n
}

let num = 0;
let den1 = 0;
let den2 = 0;

for (var i = 0; i < n; i++) {
let dx = (values[i].x - meanX);
let dy = (values[i].y - meanY);
num += dx * dy
den1 += dx * dx
den2 += dy * dy
}

const den = Math.sqrt(den1) * Math.sqrt(den2);

if (den == 0) return 0;

return num / den;
}

function setDataSlice(studentData, keyData){
    var dataSet = [];
    $.each(studentData, function(key, values){
        dataSet.push(values[keyData].toFixed(3));
    });

    var gwaSlice = dataSet.slice();


    return gwaSlice;
}

function setDataToAssign(studentData, gwa, keyData){
    var dataSet = [];
    $.each(studentData, function(key, values){
        dataSet.push(values[keyData]);
    });

    var copyDataSet = dataSet.slice();

    return assignXY(copyDataSet, gwa);
}

function assignXY(eq, gwa){
  var a = [];
     for(let i=0;i<eq.length;i++){
         var obj = {x:eq[i],y:parseFloat(gwa[i])};
         a.push(obj);
     }
  return a;
}



function drawGraphScatter(key, firstYear, secondYear){

	
	var xFirstData = [];
	var xSecondData = [];


	for(x=0; x<firstYear.length; x++){
		xFirstData.push({
			x: firstYear[x]['gwa'],
			y: firstYear[x][key]
		});
	}

	for(x=0; x<secondYear.length; x++){
		xSecondData.push({
			x: secondYear[x]['gwa'],
			y: secondYear[x][key]
		});
	}

	var options = {
       title: {
            display: true,
            text: 'Intrapersonal and GWA Scatterplot',
            fontSize: 20,
        },
        scales: {
            xAxes: [{
              ticks: {
                beginAtZero: true
              },
                scaleLabel: {
                  display: true,
                  labelString: 'General Weighted Average'
                            },
                scaleBeginAtZero : true,
                gridLines:{
               display:false, 
                lineWidth:0,
                color: "rgba(0,0,0,0.3)" 
              },
                type: 'linear',
                position: 'bottom',
            }],
            yAxes: [{
                ticks: {
                max: 200,
                beginAtZero: true
              },
                scaleLabel: {
                  display: true,
                  labelString: 'Intrapersonal'
                            },
                 gridLines:{display:false, lineWidth:0,color: "rgba(0,0,0,0.3)" }
            }]
        }
    }

var intraData = { 
      labels:["GWA","EQ"],

        datasets: [{
            pointBorderWidth:1,
            pointBorderColor: 'rgba(0,0,0,1)',
            pointBackgroundColor: 'rgba(0,0,0,1)',
            borderColor:'rgba(0,0,0,1)',
            BackgroundColor:'rgba(0,0,0,1)',

            label: $("#exampleFormControlSelect1").val(),
            data: xFirstData
        },{
            pointBorderWidth:1,
            pointBorderColor: 'rgba(0,0,0,1)',
            pointBackgroundColor: 'rgba(255,255,255,1)',
            borderColor:'rgba(0,0,0,1)',
            BackgroundColor:'rgba(0,0,0,1)',

            label: $("#exampleFormControlSelect2").val(),
            data: xSecondData
        }]
    };

$("#"+key+"Container").empty();
$("#"+key+"Container").append('<canvas id="'+key+'-Chart"></canvas>');
var ctx = document.getElementById(key+"-Chart").getContext("2d");
var scatterChart = new Chart(ctx, {
    type: 'scatter',
    data: intraData,
    options: options

});

}

function drawGraphBar(key, firstyear, secondyear){

	var xFirstData = [];
	var xSecondData = [];
	
	var x = [],sum=0,sum2=0,sum3=0;
    for(let i=0;i<firstyear.length;i++){
        if(firstyear[i][key]>=50 && firstyear[i][key]<=84){
            sum =sum +1;
        }else if(firstyear[i][key]>=85 && firstyear[i][key]<=114){
            sum2 =sum2 +1;
        }else if(firstyear[i][key]>=115 && firstyear[i][key]<=170){
            sum3 =sum3 +1;
        }
    }
    x.push(sum);
    x.push(sum2);
    x.push(sum3);



    var y = [],sum=0,sum2=0,sum3=0;
    for(let i=0;i<secondyear.length;i++){
        if(secondyear[i][key]>=50 && secondyear[i][key]<=84){
            sum =sum +1;
        }else if(secondyear[i][key]>=85 && secondyear[i][key]<=114){
            sum2 =sum2 +1;
        }else if(secondyear[i][key]>=115 && secondyear[i][key]<=170){
            sum3 =sum3 +1;
        }
    }
    y.push(sum);
    y.push(sum2);
    y.push(sum3);

var options = {
        scales: {
            yAxes: [{
                ticks: {
                    beginAtZero:true,
                    max: firstyear.length
                }
            }],
            xAxes: [{
            gridLines: {
                offsetGridLines: false
            }
        }]
        }
    }

var interData = { 
      labels:["LOW","AVERAGE","HIGH"],
        datasets: [{
            label: 'Summarized Interpersonal',
            data: x,
             backgroundColor: [
                'rgba(255, 99, 132, 0.2)',
                'rgba(255, 99, 132, 0.2)',
                'rgba(255, 99, 132, 0.2)'
            ],
            borderColor: [
                'rgba(255,99,132,1)',
                'rgba(255,99,132,1)',
                'rgba(255,99,132,1)'
            ],
            borderWidth: 1
        },
        {
            label: 'Summarized Interpersonal',
            data: y,
             backgroundColor: [
                'rgba(255, 99, 132, 1)',
                'rgba(255, 99, 132, 1)',
                'rgba(255, 99, 132, 1)'
            ],
            borderColor: [
                'rgba(255,99,132,1)',
                'rgba(255,99,132,1)',
                'rgba(255,99,132,1)'
            ],
            borderWidth: 1
        }]
    };
$("#"+key+"BarContainer").empty();
$("#"+key+"BarContainer").append('<canvas id="'+key+'-BarChart"></canvas>');
var ctx = document.getElementById(key+"-BarChart").getContext("2d");
var barChart = new Chart(ctx, {
    type: 'bar',
    data: interData,
    options: options

});



}