# Hospital Horse
http://hannahripley.com/hospitalhorse/

This is a small project I did to learn websockets. It is a fake news feed based on comedian John Mulaney's bit "horse in a hospital". 

The server, hosted on Heroku, posts randomly generated posts at random times. The number of posts made is the same regardless of the number of clients. 

Each client randomly generates comments that are sent to the server and broadcast to everyone. The more clients there are, the more comments go out.

![Screenshot of homepage](https://github.com/HannahRipley17/horseinhospital/blob/master/hospitalhorsescreenshot.png)