$(function() {
	
var x = document.getElementById("myChart").getAttribute("value");

$.ajax({
            type: 'GET'
            , url: 'http://localhost/ease_itp_final/studentProfile/' +x +'/ffff'
            , dataType: 'json'
            , success: function (data) {

      var school_year = [];
      var gwa = [];

    $.each(data, function(keys, values){
    	school_year.push(values['year'] + " " + values['semester']);
    	gwa.push(values['gwa']);
    });

// 

 var studentdata =  {
 			labels:school_year,
        datasets: [{
        	lineTension:0,
            borderWidth: 3,
            pointBorderWidth:2,
            label: 'General Weighted Average',
            data: gwa,
            backgroundColor: 'rgba(193, 0, 0,0.7)',
            borderColor: 'rgba(193,0, 0,1)',
            
            pointBackgroundColor: 'rgba(193,0, 0,1)',

            pointBorderColor:'rgba(193, 0, 0,1)',

            pointHoverBorderColor:'rgba(0, 138, 230, 1)'
           
        }]
    };

    
 var options = {

 			maintainAspectRatio: true,
 			responsive: true,
 			bezierCurve: true,
 	    scales: {

          yAxes: [{ 
          	gridLines: {
          		lineWidth: 0,
          		color: 'rgba(0,0,0,1)'
        },
            ticks:
            	{	
                   beginAtZero:true,
                   reverse: true,
                   stepSize: 1,
                   max: 5,
                   min: 1,
                   autoskip:false,
                   fontSize:12
                }
            }],

       			 xAxes: [{


       			 	title:{
       			 		fontsize: 5
       			 	},
				autoSkip: false,
				gridLines: {
          		lineWidth: 0,
          		color: 'rgba(0,0,0,1)',


        }
				
       			 }]

          


       			 }


    	};


Chart.defaults.global.defaultFontStyle = 'Bold'

var ctx = document.getElementById("myChart").getContext("2d");
var myChart = new Chart(ctx, {
	
    type: 'line',
    data: studentdata,
    options: options,
   
});


}})
}); 