function restart(){
	let method = document.getElementById("init_config").value
	let temp = document.getElementById("temperatura").value
	let count = document.getElementById("count").value
	console.log(method, temp, count)
	if (method == "rand")
		if (count>500) alert("Za duża iloć!")
		else initRandomParticles(count,temp)
	else if (method == "grid")
		if (count>15) alert("Za duża iloć!")
		else initGrid(count,count,0,0)

}