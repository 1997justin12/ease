<!DOCTYPE>
<html>
<head>
	<script type="text/javascript" src="{{asset('public/assets/js/jquery.min.js')}}"></script>
	<style type="text/css">
	body{
		overflow: hidden;
	}
		.test{
			visibility: hidden;
		}
	</style>
</head>
<body>
	<button onclick="test()">Test</button>
<div class="cc test">
<input type="hidden" value="{{ $x }}" id="value1">
<input type="hidden" value="{{ $y }}" id="value2">

	<div id="intrapersonalContainer" class="tab-pane active">
    </div>
    <div id="interpersonalContainer" class="tab-pane fade">
    </div>
    <div id="stressContainer" class="tab-pane fade">
    </div>
    <div id="adaptabilityContainer" class="tab-pane fade">
    </div>
    <div id="moodContainer" class="tab-pane fade">
    </div>


	<div id="interpersonalBarContainer"></div>
    <div id="intrapersonalBarContainer" ></div>
    <div id="stressBarContainer"></div>
    <div id="adaptabilityBarContainer"></div>
    <div id="moodBarContainer" ></div>

</div>
</body>
<script type="text/javascript">
	$(function(){

		compareGraph($("#value1").val(), $("#value2").val());


	});


</script>
<script type="text/javascript" src="{{asset('public/assets/chart.js/Chart.min.js')}}"></script>
<script type="text/javascript" src="{{asset('public/assets/js/filterstudents-extension.js')}}"></script>
<script type="text/javascript">
	function test(){
		$(".cc").removeClass("test")
		window.print();
	}
</script>
</html>