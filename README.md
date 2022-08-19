![](https://i.imgur.com/gLAH9Sl.png)

# AmphiTweet - frontend

Check us out on: http://amphitweet.ga

To run the code:
    
    npm i
    npm run dev

Backend Part of this project

AmphiTweet is a web platform that help users convert Tweets to engaging videos and host them for other users to discover. Think of it like a short-form video creation and generation platform solely based on Twitter.

Written in Next.js

This project was build for the Chirp Dev hackathon 2022

### The Platform
Amphitweet houses the created amphis. It is a place where people can discover and post their content.


### The Editor
This project features an Editor that helps in the creation of the video on the web.
There's a lot we can do with the editor currently:
1. Add Text
2. Add Images
3. Add Tweets
4. Add TTS Tweets
5. Add Background video/audio

We can scale, rotate and move these items freely in the boundaries of the canvas. We can also remove elements.
### The TTS element
We get snapshots of tweets from the Twitter API v2 after the editor of the video enters the tweet ID.
We also use multi speaker speech synthesis to create engaging and almost human like TTS.

Follow the usage guide which contains all instructions to use the editor and the known bugs in the current system

HERE:
https://github.com/yajatvishwak/at-frontend/blob/main/EDITOR-USAGE-GUIDE.md


