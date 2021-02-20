import {LinkedList} from './LinkedList'
// Where the main definition of the datapoints come from for the visualizer
export const dataPoints = {
	streamAverage : new LinkedList(),
	bufferData : {},
	frequencies : {},

	// Non Data 
	shouldPlay : 'nonResponsive',
	change : true
}

// The scene manager object
export const SceneScaffold = {
	'responsive' : [],
	'nonResponsive' : [],
}