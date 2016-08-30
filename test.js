function string2int(s) {
	return s.split("").reduce(function(x, y) {
		return x * 10 + (y - 0);
	});
}

 //     return s.split("").map(Number).reduce(function(x, y) {
 //   return x * 10 + y;
 // });
 console.log(Math.abs(~2016));
 alert(string2int('132'));