// Copyright (c) 2019 ml5
//
// This software is released under the MIT License.
// https://opensource.org/licenses/MIT

/* ===
ml5 Example
Webcam Image Classification using a pre-trained customized model and p5.js
This example uses p5 preload function to create the classifier
=== */

// Classifier Variable
let classifier;
// Model URL
let imageModelURL = "https://teachablemachine.withgoogle.com/models/7gLJHauvk/";

// Video
let video;
let flippedVideo;
// To store the classification
let label = "";

let laughing;
let question;
let sad;
let bored;
let fade;

// Load the model first
async function preload() {
	classifier = await ml5.imageClassifier(imageModelURL + "model.json");
	laughing = loadImage("laughing.png");
	sad = loadImage("sad.png");
	bored = loadImage("bored.png");
	question = loadImage("question.png");
}

async function setup() {
	createCanvas(1280, 720);
	// Create the video
	video = createCapture(VIDEO);
	video.size(width, height);
	video.hide();

	flippedVideo = ml5.flipImage(video);
	// Start classifying
	await classifyVideo();
}

function draw() {
	background(0);
	// Draw the video
	image(flippedVideo, 0, 0);

	// Draw the label
	fill(255);
	textSize(16);
	textAlign(CENTER);
	text(label, width / 2, height - 4);

	if (label !== "Background") {
		fade = 255;
	}

	if (fade > 0) {
		if (label === "Laughing") {
			tint(255, fade);
			image(laughing, 0, 0, 300, 300);
			fade -= 10;
		} else if (label === "Question") {
			tint(255, fade);
			image(question, 0, 0, 300, 300);
			fade -= 10;
		} else if (label === "Sad") {
			tint(255, fade);
			image(sad, 0, 0, 300, 300);
			fade -= 10;
		} else if (label === "Bored") {
			tint(255, fade);
			image(bored, 0, 0, 300, 300);
			fade -= 10;
		}
	}
}

// Get a prediction for the current video frame
async function classifyVideo() {
	flippedVideo = await ml5.flipImage(video);
	classifier.classify(flippedVideo, gotResult);
}

// When we get a result
function gotResult(error, results) {
	// If there is an error
	if (error) {
		console.error(error);
		return;
	}
	// The results are in an array ordered by confidence.
	// console.log(results[0]);
	label = results[0].label;
	// Classifiy again!
	classifyVideo();
}
