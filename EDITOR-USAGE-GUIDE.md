# AmphiTweet Editor Guide

## Inserting Images in your scene
Amphitweet currently runs on low server resources. Thus, we need to leverage other services to store some of our data. This however will change in the near future, as the platform grows.
Currently, Amphitweet editor supports only remote images (images hosted by a service provider). 
There are a lot of free cloud image hosting services out there.

### Current Workaround
    1. Create a free tier account on https://dropbox.com
    2. Upload your file
![upload](https://i.imgur.com/4CHyBjA.png)

    3. Copy Link
![copy](https://i.imgur.com/NFoOkkL.png)

    4. Replace the dropbox.com and dl.dropboxusercontent.com in the url
From this:
![oldurl](https://i.imgur.com/cSlGPvh.png)
<br>
To This:
![newurl](https://i.imgur.com/zbdGo1o.png)


> As an alternative you can use, Imgur.com or any other platform that provides a direct link to your image/video



# Inserting Background Video/Music

Follow the same steps as Images


# Gotchas and Limitations
Amphitweet is far from being stable. The current version of the app has a *few* bugs. Some of the known bugs include:
1. You **HAVE** to play the TTS Tweet for the time to update correctly
2. Since we are using a single core VPS and video rendering is computationally intense, Render process takes a long time. Usually, 10 sec video takes about 1 min to render. We can fix this with multicore video rendering as the infrastructure grows.