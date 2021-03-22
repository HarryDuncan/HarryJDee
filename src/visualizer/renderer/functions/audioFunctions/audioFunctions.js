import {fractionate, avg, max, modulate} from './../'


// Gets the data points need based on the scene to perform the animations
export const getDataPoints = (framework) => {

//	console.log(framework.scene.name)
	 framework.analyserNode.getByteFrequencyData(framework.data);

	  let av =  avg(framework.data);
	 let maxP = max(framework.data);

	 // Gets base frequencies
	 let lowerHalfArray = framework.data.slice(0, (framework.data.length/2) - 1);
	 // Gets trebel frequencies
     let upperHalfArray = framework.data.slice((framework.data.length/2) - 1, framework.data.length - 1);

	
	let lowerMax = max(lowerHalfArray);
    let lowerAvg = avg(lowerHalfArray);
    let upperMax = max(upperHalfArray);
    let upperAvg = avg(upperHalfArray);
	

	let lowerMaxFr = lowerMax / lowerHalfArray.length;
    let lowerAvgFr = lowerAvg / lowerHalfArray.length;
    let upperMaxFr = upperMax / upperHalfArray.length;
    let upperAvgFr = upperAvg / upperHalfArray.length;
    let bassFr = modulate(lowerMaxFr, 0, 1, 0.5, 2)
    let trebelFr =  modulate(upperAvgFr, 0, 1, 0.5, 2)
	// Use a linked list to store an buffer array of the last bit
	framework.streamData.streamAverage.insertFirst(av)
	
	if(framework.streamData.streamAverage.size >= 20){
		framework.streamData.bufferData = getBufferDataPoints(framework.streamData.streamAverage)
		framework.streamData.bufferData.average = av

		framework.streamData.bufferData.lowerMax = lowerMax
		framework.streamData.bufferData.lowerAvg = lowerAvg
		framework.streamData.bufferData.upperMax = upperMax
		framework.streamData.bufferData.upperAvg = upperAvg

		framework.streamData.bufferData.upperMaxFr = upperMaxFr
		framework.streamData.bufferData.upperAvgFr = upperAvgFr
		framework.streamData.bufferData.lowerMaxFr = lowerMaxFr
		framework.streamData.bufferData.lowerAvgFr = lowerAvgFr
		
		
		framework.streamData.frequencies.bassFr = bassFr
		framework.streamData.frequencies.trebelFr = trebelFr





		// Removes the last element in the linked list - for performance
		framework.streamData.streamAverage.removeLast()
	
	}

	if(framework.streamData.bufferData.maxDelta > 3){
		framework.streamData.shouldPlay = 'responsive'
	}else{
		framework.streamData.shouldPlay = 'nonResponsive'
	}

	if(framework.streamData.bufferData.average  + 3 > framework.streamData.bufferData.peak){
		framework.streamData.toggleKey = !framework.streamData.toggleKey
		framework.streamData.change = true
	}else{
		framework.streamData.change = false
	}
	
	
	

}
export const getKey = (data) => {

}



// Get max delta returns the biggest delta over a buffer range - this determines what type of visualizer should play
const getBufferDataPoints = (streamD) => {
	let delta = 0
	let peak = 0
	let trough = null
	let point = streamD.head
	if(point){
		while(point.next){
			let tempD = Math.abs(point.data - point.next.data)
			if(tempD > delta){
				delta = tempD
			}
			if(point.data > peak){

				peak = point.data
			}
			if(trough === null || trough > point.data){
				trough = point.data
			}
			point = point.next
		}
	}
	return {'maxDelta' : delta, 'peak' : peak, 'trough' : trough} 
}