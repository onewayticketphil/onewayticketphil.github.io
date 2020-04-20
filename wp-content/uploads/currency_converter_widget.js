var delay = (function(){
  var timer = 0;
  return function(callback, ms){
    clearTimeout (timer);
    timer = setTimeout(callback, ms);
  };
})();

function updatePage() {
//console.log('working in js file');
$(document).ready(function() {
	
	var thbv = $('#THB').val();
	var vndv = $('#VND').val();
	var lakv = $('#LAK').val();
	var myrv = $('#MYR').val();
	var khrv = $('#KHR').val();
	var phpv = $('#PHP').val();
	var mmkv = $('#MMK').val();
	var idrv = $('#IDR').val();
	var usdv = $('#USD').val();
	var varv = $('#variableCurrency').val();
	
	var currencyValues = [thbv,vndv,lakv,myrv,khrv,phpv,mmkv,idrv,usdv,varv];
	//console.log(currencyValues);
	function convert(currencyFromCurrency,enteredValue,variableCurrency){
		
		//console.log("variable currency: "+variableCurrency);
		var currencyArray = ["THB","VND","LAK","MYR","KHR","PHP","MMK","IDR","USD",variableCurrency];

		var usdValues = [rates.THB,rates.VND,rates.LAK,rates.MYR,rates.KHR,rates.PHP,rates.MMK,rates.IDR,1,rates[variableCurrency]/*VARIABLE CURRENCY*/];
		//console.log(usdValues);
		
		for (var i = 0; i < currencyArray.length; i += 1) {
			if(currencyFromCurrency == currencyArray[i]){
				var usdAmount = enteredValue/usdValues[i];
				//console.log("usdAmount: "+usdAmount);
				//console.log("usdValues[i]: "+usdValues[i]);
				break;
			}
		}
		
		for (var i = 0; i < currencyArray.length; i += 1) {
			//console.log("currency: "+currencyArray[i]);
			//console.log("currencyFromcurrency: "+currencyFromCurrency);
			//console.log("enteredvalue: "+enteredValue);
			if(currencyFromCurrency != currencyArray[i]){
				var amount = Math.round(usdAmount * usdValues[i] * 100)/100;
				//console.log("amount: "+amount);
				currencyValues[i] = amount;
				if(i != currencyArray.length-1){
					$('#'+currencyArray[i]).val(amount);
					$('#'+currencyArray[i]).css('color','black');
				}else{
					$('#variableCurrency').val(amount);
					$('#variableCurrency').css('color','black');
				}
			}else{
				currencyValues[i] = enteredValue;
				//console.log("enterdValue: "+enteredValue);
			}
		 }
		//console.log("values: "+currencyValues);
	}
	function isNumber(enteredValue){
		if (isNaN(enteredValue)) {
			return false;
		}else{return true;}
	}
	
	$('select#currencyFrom').change(function(){
		delay(function(){
			var currencyFromCurrency = $('select#currencyFrom').val();
			var enteredValue = $('#variableCurrency').val();
			convert(currencyFromCurrency,enteredValue,currencyFromCurrency);
		}, 1000 );
	});
	var currencyNames = ['THB','VND','LAK','MYR','KHR','PHP','MMK','IDR','USD','variableCurrency'];

	$("form :input").keyup(function(){
		delay(function(){
			var currencyFromCurrency = "no";
			var enteredValue = 1;
			for (var i = 0; i < currencyNames.length; i += 1) {
				var classCurrency = '#'+currencyNames[i];
				if($(classCurrency).val() != currencyValues[i]){
					if(i != currencyNames.length-1){
						currencyFromCurrency = currencyNames[i];
					}else{
						currencyFromCurrency = $('select#currencyFrom').val();
					}
					enteredValue = $(classCurrency).val();
					variableCurrency = $('select#currencyFrom').val();
					if(isNumber(enteredValue)){
						$(classCurrency).css('color','black');
						if(i != currencyNames.length){
							convert(currencyFromCurrency,enteredValue,variableCurrency);
							break;
						}else{
							convert(currencyFromCurrency,enteredValue,currencyFromCurrency);
							break;
						}
					}else{
						$('#error').show();
						$('#error').html('Whoa, whoa, calm down. Numbers only please.');$('#error').fadeOut(4000);
						$(classCurrency).css('color','red');
						currencyValues[i] = 'invalid';
					}
				}
			}
		}, 1000 );
	});
});
}