var delay = (function(){
  var timer = 0;
  return function(callback, ms){
    clearTimeout (timer);
    timer = setTimeout(callback, ms);
  };
})();

function updatePage() {
$(document).ready(function() {

	var liCountries = ['THB','VND','LAK','MYR','KHR','PHP','MMK','IDR','SGD','JPY','CNY','KRW','HKD','INR','USD'];
	var liVisibleCountries = {
	"USD":'<li class="currency" id="currencyUSD" style="display:none" draggable="true"><div class="inputandflag"><div class="input_text"><input type="text" name="USD" id="USD" class="number" value="0" /></div><div class="flag handle United_States"></div></div><div class="label"><label for="currency" class="currencylabel">US Dollar - USD</label></div></li>',
	"KHR":'<li class="currency" id="currencyKHR" style="display:none" draggable="true"><div class="inputandflag"><div class="input_text"><input type="text" name="KHR" id="KHR" class="number" value="0" /></div><div class="flag handle Cambodia"></div></div><div class="label"><label for="currency" class="currencylabel">Cambodian Riel - KHR</label></div></li>',
	"CNY":'<li class="currency" id="currencyCNY" style="display:none" draggable="true"><div class="inputandflag"><div class="input_text"><input type="text" name="CNY" id="CNY" class="number" value="0" /></div><div class="flag handle China"></div></div><div class="label"><label for="currency" class="currencylabel">Chinese Yuan Renminbi - CNY</label></div></li>',
	"HKD":'<li class="currency" id="currencyHKD" style="display:none" draggable="true"><div class="inputandflag"><div class="input_text"><input type="text" name="HKD" id="HKD" class="number" value="0" /></div><div class="flag handle Hong_Kong"></div></div><div class="label"><label for="currency" class="currencylabel">Hong Kong Dollar - HKD</label></div></li>',
	"INR":'<li class="currency" id="currencyINR" style="display:none" draggable="true"><div class="inputandflag"><div class="input_text"><input type="text" name="INR" id="INR" class="number" value="0" /></div><div class="flag handle India"></div></div><div class="label"><label for="currency" class="currencylabel">Indian Rupee - INR</label></div></li>',
	"IDR":'<li class="currency" id="currencyIDR" style="display:none" draggable="true"><div class="inputandflag"><div class="input_text"><input type="text" name="IDR" id="IDR" class="number" value="0" /></div><div class="flag handle Indonesia"></div></div><div class="label"><label for="currency" class="currencylabel">Indonesian Rupiah - IDR</label></div></li>',
	"JPY":'<li class="currency" id="currencyJPY" style="display:none" draggable="true"><div class="inputandflag"><div class="input_text"><input type="text" name="JPY" id="JPY" class="number" value="0" /></div><div class="flag handle Japan"></div></div><div class="label"><label for="currency" class="currencylabel">Japanese Yen - JPY</label></div></li>',
	"LAK":'<li class="currency" id="currencyLAK" style="display:none" draggable="true"><div class="inputandflag"><div class="input_text"><input type="text" name="LAK" id="LAK" class="number" value="0" /></div><div class="flag handle Laos"></div></div><div class="label"><label for="currency" class="currencylabel">Lao Kip - LAK</label></div></li>',
	"MYR":'<li class="currency" id="currencyMYR" style="display:none" draggable="true"><div class="inputandflag"><div class="input_text"><input type="text" name="MYR" id="MYR" class="number" value="0" /></div><div class="flag handle Malaysia"></div></div><div class="label"><label for="currency" class="currencylabel">Malaysian Ringgit - MYR</label></div></li>',
	"MMK":'<li class="currency" id="currencyMMK" style="display:none" draggable="true"><div class="inputandflag"><div class="input_text"><input type="text" name="MMK" id="MMK" class="number" value="0" /></div><div class="flag handle Myanmar"></div></div><div class="label"><label for="currency" class="currencylabel">Myanmar Kyat - MMK</label></div></li>',
	"PHP":'<li class="currency" id="currencyPHP" style="display:none" draggable="true"><div class="inputandflag"><div class="input_text"><input type="text" name="PHP" id="PHP" class="number" value="0" /></div><div class="flag handle Philippines"></div></div><div class="label"><label for="currency" class="currencylabel">Philippine Peso - PHP</label></div></li>',
	"SGD":'<li class="currency" id="currencySGD" style="display:none" draggable="true"><div class="inputandflag"><div class="input_text"><input type="text" name="SGD" id="SGD" class="number" value="0" /></div><div class="flag handle Singapore"></div></div><div class="label"><label for="currency" class="currencylabel">Singapore Dollar - SGD</label></div></li>',
	"KRW":'<li class="currency" id="currencyKRW" style="display:none" draggable="true"><div class="inputandflag"><div class="input_text"><input type="text" name="KRW" id="KRW" class="number" value="0" /></div><div class="flag handle South_Korea"></div></div><div class="label"><label for="currency" class="currencylabel">South Korean Won - KRW</label></div></li>',
	"THB":'<li class="currency" id="currencyTHB" style="display:none" draggable="true"><div class="inputandflag"><div class="input_text"><input type="text" name="THB" id="THB" class="number" value="0" /></div><div class="flag handle Thailand"></div></div><div class="label"><label for="currency" class="currencylabel">Thai Baht - THB</label></div></li>',
	"VND":'<li class="currency" id="currencyVND" style="display:none" draggable="true"><div class="inputandflag"><div class="input_text"><input type="text" name="VND" id="VND" class="number" value="0" /></div><div class="flag handle Vietnam"></div></div><div class="label"><label for="currency" class="currencylabel">Vietnamese Dong - VND</label></div></li>'}
	var currencyListText = '<li class="currency" id="disabledItem"><div class="inputandflag"><div class="input_text"><input type="text" name="variableCurrency" id="variableCurrency" class="number" value="0" /></div></div><div id="currencyFrom"><select id="currencyFrom" class="currencyFrom" size="1" tabindex="2"><option value="AUD">Australian Dollar - AUD</option><option value="CAD">Canadian Dollar - CAD</option><option value="CHF">Swiss Franc - CHF</option><option value="DKK">Danish Krone - DKK</option><option value="EUR" selected="selected">Euro - EUR</option><option value="GBP">British Pound - GBP</option><option value="HUF">Hungarian Forint - HUF</option><option value="MXN">Mexican Peso - MXN</option><option value="NOK">Norwegian Krone - NOK</option><option value="NZD">New Zealand Dollar - NZD</option><option value="RUB">Russian Ruble - RUB</option><option value="SEK">Swedish Krona - SEK</option><option value="TRY">Turkish Lira - TRY</option><option value="ZAR">South African Rand - ZAR</option></select></div></li>';
	for(var i = 0; i < countryList.length; i += 1) {
		currencyListText += liVisibleCountries[countryList[i]];
		var index = liCountries.indexOf(countryList[i]);
		liCountries.splice(index,1);
	}
	for(var i = 0; i < liCountries.length; i += 1) {
		currencyListText += liVisibleCountries[liCountries[i]];
	}
	$('#currencyList').html(currencyListText);
	
	
	$('.currencyFrom').val(variableCoin).attr('selected', true);//variableCoin from php
	
	var thbv = $('#THB').val();
	var vndv = $('#VND').val();
	var lakv = $('#LAK').val();
	var myrv = $('#MYR').val();
	var khrv = $('#KHR').val();
	var phpv = $('#PHP').val();
	var mmkv = $('#MMK').val();
	var idrv = $('#IDR').val();
	var sgdv = $('#SGD').val();
	var jpyv = $('#JPY').val();
	var cnyv = $('#CNY').val();
	var krwv = $('#KRW').val();
	var hkdv = $('#HKD').val();
	var inrv = $('#INR').val();
	var usdv = $('#USD').val();
	var varv = $('#variableCurrency').val();
	
	var currencyValues = [thbv,vndv,lakv,myrv,khrv,phpv,mmkv,idrv,sgdv,jpyv,cnyv,krwv,hkdv,inrv,usdv,varv];
	//console.log(currencyValues);
	function convert(fromCurrency,enteredValue,variableCurrency){
		
		//console.log("variable currency: "+variableCurrency);
		var currencyArray = ["THB","VND","LAK","MYR","KHR","PHP","MMK","IDR","SGD","JPY","CNY","KRW","HKD","INR","USD",variableCurrency];

		var usdValues = [rates.THB,rates.VND,rates.LAK,rates.MYR,rates.KHR,rates.PHP,rates.MMK,rates.IDR,rates.SGD,rates.JPY,rates.CNY,rates.KRW,rates.HKD,rates.INR,1,rates[variableCurrency]/*VARIABLE CURRENCY*/];
		//console.log(usdValues);
		
		for (var i = 0; i < currencyArray.length; i += 1) {
			if(fromCurrency == currencyArray[i]){
				var usdAmount = enteredValue/usdValues[i];
				//console.log("usdAmount: "+usdAmount);
				//console.log("usdValues[i]: "+usdValues[i]);
				break;
			}
		}
		
		for (var i = 0; i < currencyArray.length; i += 1) {
			//console.log("currency: "+currencyArray[i]);
			//console.log("fromcurrency: "+fromCurrency);
			//console.log("enteredvalue: "+enteredValue);
			if(fromCurrency != currencyArray[i]){
				var amount = Math.round(usdAmount * usdValues[i] * 100)/100;
				//var amount = Math.round(((xrates[currencyArray[i]] / xrates[fromCurrency]) * enteredValue) * 100) / 100;
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
			var fromCurrency = $('select#currencyFrom').val();
			var enteredValue = $('#variableCurrency').val();
			convert(fromCurrency,enteredValue,fromCurrency);
		}, 1000 );
	});
	var currencyNames = ['THB','VND','LAK','MYR','KHR','PHP','MMK','IDR','SGD','JPY','CNY','KRW','HKD','INR','USD','variableCurrency'];

	$("form :input").keyup(function(){
		delay(function(){
			var fromCurrency = "no";
			var enteredValue = 1;
			for (var i = 0; i < currencyNames.length; i += 1) {
				var classCurrency = '#'+currencyNames[i];
				if($(classCurrency).val() != currencyValues[i]){
					if(i != currencyNames.length-1){
						fromCurrency = currencyNames[i];
					}else{
						fromCurrency = $('select#currencyFrom').val();
					}
					enteredValue = $(classCurrency).val();
					variableCurrency = $('select#currencyFrom').val();
					if(isNumber(enteredValue)){
						$(classCurrency).css('color','black');
						if(i != currencyNames.length){
							convert(fromCurrency,enteredValue,variableCurrency);
							break;
						}else{
							convert(fromCurrency,enteredValue,fromCurrency);
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
	
	$('div.flag').click(function(){
		var currencyname = $(this).closest("li.currency").attr("id");
		$(this).closest("li.currency").hide("slow");
		var flagName = "#unused"+currencyname.substring(8);
		$(flagName).show('slow');
		$('#bookmarkInput').hide("slow");
	});
	$('li.unusedFlag').click(function(){
		var currencyname = $(this).attr("id");
		$(this).hide("slow");
		var flagName = "#currency"+currencyname.substring(6);
		$(flagName).show('slow');
		$('#bookmarkInput').hide("slow");
	});
	
	//Initialize flag visibility
	for(var i = 0; i < countryList.length; i += 1) {
		$('li#unused'+countryList[i]).hide();//hide Used flags
		$("#currency"+countryList[i]).show();//show ON flags
	}
	
	$('#bookmarkButton').click(function(){
		$('#bookmarkInput').val("");
		//CHANGE URL WHEN GO LIVE
		var bookmarkUrl = "http://www.onewayticketphil.com/southeast-asian-currency-converter/?";
		var chosenCountries = [];
		$("li.currency").each(function() {
			if($(this).is(":visible")){
				chosenCountries.push($(this).attr("id")) 
			}
		});
		variableCoin = $('.currencyFrom').find(":selected").val();
		for(var i = 1; i < chosenCountries.length; i += 1) {
			bookmarkUrl += "country[]=" + chosenCountries[i].substring(8) + "&";
		}
		bookmarkUrl = bookmarkUrl.slice(0,-1);
		bookmarkUrl += "&variable="+variableCoin;
		$('#bookmarkInput').val(bookmarkUrl).show("slow");
	});
	
	var loadScript = function(src, callbackfn) {
			var newScript = document.createElement("script");
			newScript.type = "text/javascript";
			newScript.setAttribute("async", "true");
			newScript.setAttribute("src", src);
			
			if(newScript.readyState) {
				newScript.onreadystatechange = function() {
					if(/loaded|complete/.test(newScript.readyState)) callbackfn();
				}
			} else {
				newScript.addEventListener("load", callbackfn, false);
			}
			
			document.documentElement.firstChild.appendChild(newScript);
		}
		if (Modernizr.draganddrop) {
		  loadScript("http://onewayticketphil.com/wp-content/themes/skirmish/js/jquery.sortable.js", function() { 
			$('.sortable').sortable({
				handle: '.handle',
				items: ':not(#disabledItem)'
			});
			$(".handle").css('cursor','move');
			$(".unusedFlag").css('cursor','pointer');
		  });
		} else {
			
		}

});
}















