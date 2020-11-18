# Machine Learning Video Annotations

This web app uses a machine learnining model to classify images into categories of hand and facial gestures. It then paints a specified image onto the screen for each category. Using OBS Studio's virtual camera, you can use the browser window as your video feed in video conferencing applications and have annotations pop up in your meetings.

## Machine Learning Model

I use Google's [Teachable Machine](https://teachablemachine.withgoogle.com/) to train an image recognition model of me making various gestures and facial expressions and label them appropriately. Teachable Machine then allows you to upload this model and then you just plug in the URL in your code.

## Displaying Video to Browser

Speaking of code, this project uses p5.js to create a canvas in the browser that displays the video feed. You can then overlay images/GIFs/videos on top of your video feed when a gesture/facial expression is detected.
