---
title: CS144 NetworkP1429 8DanBonehInterview
---

1
00:00:00,000 --> 00:00:06,000
Great. So here I have Dan Boenne, some of you I hope know,

2
00:00:06,000 --> 00:00:12,000
follow faculty, effects senior in the department who researches cryptography and security.

3
00:00:12,000 --> 00:00:16,000
So Dan, well, how did you get into cryptography and security and computer systems?

4
00:00:16,000 --> 00:00:18,000
Well, first of all, I'm sure background.

5
00:00:18,000 --> 00:00:22,000
Oh, thanks Phil. First of all, it's a pleasure to do this. I'm happy to help with this.

6
00:00:22,000 --> 00:00:26,000
Let's see, I fell in love with crypto at a very, very young age.

7
00:00:26,000 --> 00:00:32,000
I think it's one of these things where like for God knows why, but like my dad for some reason,

8
00:00:32,000 --> 00:00:36,000
taught me the RSA algorithm when I was like nine years old.

9
00:00:36,000 --> 00:00:40,000
And I just got completely fascinated by this. You know, these big numbers and all of a sudden they're at these codes.

10
00:00:40,000 --> 00:00:46,000
And then I went in and kind of encrypted a message to my friend with RSA and he thought I was completely nuts.

11
00:00:46,000 --> 00:00:52,000
But that kind of stuck with me. And then as I got to college and I learned more about crypto,

12
00:00:52,000 --> 00:00:58,000
I just realized it's such a fantastic field. You know, it's an area where you get to use really deep math.

13
00:00:58,000 --> 00:01:04,000
Literally 20th century math is like as advanced as the mathematics is using computer science gets.

14
00:01:04,000 --> 00:01:10,000
And at the same time, we get to use it for real world applications. So people really do care about the results.

15
00:01:10,000 --> 00:01:18,000
In fact, you know, when you communicate with Google updates, the key exchange that you're doing is using what's called elliptic curve D. Fee Hellman.

16
00:01:18,000 --> 00:01:24,000
And I'm using extremely advanced mathematics. As I said, 20th century mathematics.

17
00:01:24,000 --> 00:01:30,000
And it's amazing. This is like people use this all day long every day without even realizing that they're doing it.

18
00:01:30,000 --> 00:01:36,000
So for me, it's just a lot of fun to kind of work on an area that involves both, you know, deep math.

19
00:01:36,000 --> 00:01:43,000
And yet has real world applications. I should say more broadly. I mean, I do, you know, there are two parts to my work.

20
00:01:43,000 --> 00:01:49,000
So I'm on cryptography as one half. And then I also do a lot of work on computer security more broadly.

21
00:01:49,000 --> 00:01:53,000
Photography is just a small part of computer security.

22
00:01:53,000 --> 00:02:06,000
The problem of security software is much, much larger than just cryptography. And I should tell you that computer security in general is also a fantastic, fantastic area to work in.

23
00:02:06,000 --> 00:02:08,000
So the career path, it's a terrific career.

24
00:02:08,000 --> 00:02:14,000
It's tremendous job security and security. Yeah, you know, if I go to sleep now, you wake me up in a hundred years.

25
00:02:14,000 --> 00:02:18,000
The first thing I'll ask is, you know, is computer security still a problem?

26
00:02:18,000 --> 00:02:27,000
I guarantee you a computer security will only be worse than it is today because we will be depending on computers and networks so much more than we do today.

27
00:02:27,000 --> 00:02:33,000
Well, so the students in class have covered actually network address translators a bit, you know, NATs, so they're wireless routers.

28
00:02:33,000 --> 00:02:42,000
You've done some work on the security of these wireless NATs today and some of the issues. You just want to say a little bit about some of the crazy holes that you found out.

29
00:02:42,000 --> 00:02:48,000
Yeah, sure, sure. So we did a lot of work on security, for example, of embedded devices.

30
00:02:48,000 --> 00:02:52,000
So when you build an embedded device, these days, so what is an embedded device?

31
00:02:52,000 --> 00:03:02,000
So I'm talking about things like security cameras, folder frames, you know, these are frames that you put on grandma's desk and you can upload pictures to it so she can see grandkids.

32
00:03:02,000 --> 00:03:31,000
So, you know, when you build a web application, you would use rails or jangle or a lamp stack in general, but a lamp stack doesn't fit on a tiny little security camera.

33
00:03:31,000 --> 00:03:42,000
So what they end up doing is they end up building their own web application and their own infrastructure basically for making configuration possible.

34
00:03:42,000 --> 00:03:48,000
And as you, well, hopefully you will take one of our security classes, which I'm plugging in.

35
00:03:48,000 --> 00:03:51,000
Yeah, it's 255. That's what it does in just a minute.

36
00:03:51,000 --> 00:04:07,000
But you'll learn from those that in fact, building a secure web application is non-trivial. It actually takes quite an effort to secure web applications, even from basic attacks, things like cross-site scripting, things like, you know, request for injuries and so on.

37
00:04:07,000 --> 00:04:17,000
And so we looked, we had like we bought like 20 of these embedded devices and we started looking one by one at a different application web applications and data on devices.

38
00:04:17,000 --> 00:04:23,000
So it turns out that basically all had various sorts of home available. Again, there's basically a hardware company.

39
00:04:23,000 --> 00:04:26,000
And so somebody hacked my picture frame. Why should I care?

40
00:04:26,000 --> 00:04:37,000
Ah, okay. So you should really care about that because if you're an enterprise and now one of your employees put a picture frame on their desk in their office, that picture frame is going to be connected to a corporate network.

41
00:04:37,000 --> 00:04:39,000
So I'm glad I'm not an enterprise. There you go.

42
00:04:39,000 --> 00:04:42,000
Okay. So I don't care. But you can pretty much guess the rest.

43
00:04:42,000 --> 00:04:46,000
Yeah, I'm scant first computer systems or high-pollot time that I'm not concerned about.

44
00:04:46,000 --> 00:04:48,000
I'm concerned about the work owner ability.

45
00:04:48,000 --> 00:04:51,000
Yeah, I'm not the kind of person you cater to.

46
00:04:51,000 --> 00:04:55,000
I see. I see. I see. Okay. Well, anyhow, it's basically these devices are used as stepping stones.

47
00:04:55,000 --> 00:05:04,000
It happens to larger, larger attacks. If you have a security camera at home, that security camera, or you know, even think of the nest, like a thermal staff that is controlled remotely.

48
00:05:04,000 --> 00:05:12,000
Those devices, if they're not properly secured, the nest we haven't looked at. So I don't know if it's, I don't know the security status of that.

49
00:05:12,000 --> 00:05:19,000
But those devices could be used as a stepping stone into a larger attack on your home network, on your corporate Nashink in the army.

50
00:05:19,000 --> 00:05:20,000
Exactly. Exactly.

51
00:05:20,000 --> 00:05:27,000
And by the way, all the attacks, all the way all the attacks work today is basically as using stepping stones.

52
00:05:27,000 --> 00:05:38,000
So they break into one machine from that machine. They start to do a lateral transversal to try and find other machines that can be broken into from that other machine that they've now taken control.

53
00:05:38,000 --> 00:05:40,000
They try to get an administrator account.

54
00:05:40,000 --> 00:05:48,000
And so on, they move slowly from one machine to another until they get the crown jewels like the database or the after directory.

55
00:05:48,000 --> 00:05:52,000
And then they just dump all the data from there and, you know, away they go.

56
00:05:52,000 --> 00:06:00,000
Well, so this past weekend there's the CS faculty retreat and you gave a talk kind of about some of the revelations from the stoke from the stodens, leaks, etc.

57
00:06:00,000 --> 00:06:08,000
And one of the things you talked about is how there's might be some suggestions that certain crypto systems might be weaker than we thought.

58
00:06:08,000 --> 00:06:12,000
So that's why the details kind of going forward given what we've learned from stodens.

59
00:06:12,000 --> 00:06:26,000
If I want to design a secure system, then what other some extra steps I should take or there's some things that we thought might be okay, but aren't now and what are going forward to do something slightly differently or yeah, they're basically to to advice bits to keep in mind.

60
00:06:26,000 --> 00:06:36,000
Well, first there's a zero advice bits, which you will learn, which would be drilled into you once you take the crypto class CS25, which is you never design your own crypto.

61
00:06:36,000 --> 00:06:44,000
And not only should you not design your own crypto, you should not even implement your own crypto because I guarantee you if you implement your own crypto, it's going to be vulnerable to tiny attack.

62
00:06:44,000 --> 00:06:49,000
It's probably going to have bad randomness and it's going to be vulnerable to other side channel attacks and so on.

63
00:06:49,000 --> 00:06:52,000
So you should use kind of existing innovate.

64
00:06:52,000 --> 00:06:59,000
I wouldn't quite say it that way. I would say use kind of existing standards and existing open source well that it implementations.

65
00:07:00,000 --> 00:07:27,000
So that's a zero through the first rule that I would say that that's a result of the revelations from the summer is make sure that whatever you build is agile in the sense that it's crypto agile in the sense that if we discover at some point that there's a vulnerability in particular algorithm, it's not going to take you six months to then go ahead and on, you know, under fire, go ahead and build new algorithm in your system, qA tested and then deploy it.

66
00:07:27,000 --> 00:07:33,000
That's, you know, it's a long process, which when you do under fire is a bad idea from a security point of view.

67
00:07:33,000 --> 00:07:43,000
The idea is to kind of make your system agile to begin with crypto agile to begin with so that the system will support multiple algorithms back deployment time.

68
00:07:43,000 --> 00:07:52,000
And then if one algorithm turns out to be a secure, then all you have to do is just flip a configuration switch and the system just moves to the other algorithm and everything, everything works fine.

69
00:07:53,000 --> 00:07:59,000
Now in the client server model that actually is more difficult because you have to change both the clients and the servers, but you know, we've got to start somewhere.

70
00:07:59,000 --> 00:08:13,000
So for example, if you build a web server, make sure that the web server can support multiple algorithms, right? It's not it's not baked in, you know, the algorithm being used is not baked in somehow hardwired into the web server.

71
00:08:14,000 --> 00:08:24,000
When you build a very common example is a software upgrade mechanism. So when you ship software upgrades to your clients, those software updates need to be signed.

72
00:08:24,000 --> 00:08:34,000
So that not anyone can ship an update on your behalf. Well, you can't imagine how many companies when they build software update mechanisms, they just hardwired RSA as a signature mechanism, right?

73
00:08:35,000 --> 00:08:47,000
And my point is try to make it so that even like software update mechanism, something that has been ironed is that actually is agile in the sense that you know there's easy way to update the algorithm on the fly.

74
00:08:47,000 --> 00:08:53,000
So that, you know, just a matter of simple configuration and boom, you move to signatures using a different algorithm.

75
00:08:53,000 --> 00:08:57,000
So that's the first piece of advice, agile.

76
00:08:57,000 --> 00:09:17,000
The second piece of advice is in particular, when you build an SSL based server, today many websites use what's called the RSA mechanism, which is the browser chooses around them, pre master secrets, encrypts the pre master secret using the servers public RSA key.

77
00:09:17,000 --> 00:09:22,000
And since the results over to the server, the server decrypts and recovers the pre master secrets.

78
00:09:22,000 --> 00:09:26,000
Yeah, this is what I thought when we covered TLS works and it's basic exchange.

79
00:09:26,000 --> 00:09:30,000
Fantastic. So this is what I would call the basic RSA key exchange.

80
00:09:30,000 --> 00:09:42,000
And the problem with that mechanism is it doesn't provide, let's call forward secrecy. So what do I mean by that? Well, imagine that today someone recorded the interaction between you and the web server.

81
00:09:42,000 --> 00:09:53,000
So they recorded the RSA encryption of the pre master secrets. Now a year from now, somehow they were able to break into the web server and recover the RSA secret key.

82
00:09:53,000 --> 00:10:03,000
What that key would allow them to do then is go back to what they recorded a year before, decrypt the encrypted pre master secrets and now they can recover the interaction.

83
00:10:03,000 --> 00:10:15,000
So the basic RSA mechanism doesn't have what's called forward secrecy. There is another key exchange mechanism in SSL. It's called, well, it's a mechanism that supports forward secrecy.

84
00:10:15,000 --> 00:10:27,000
And that's a mechanism that's based on DC Helm. So there are multiple names for it. It's called a femoral DC Helm in open SSL and inferred it is DHE or ECDHD will get to the differences between those in a second.

85
00:10:27,000 --> 00:10:39,000
And the idea there is that the key exchange actually uses the DHEA Helm on protocol instead of using RSA. So what happens is each side, the browser sends to the server, it's part of the DHEA Helm exchange.

86
00:10:39,000 --> 00:10:49,000
The server sends to the browser, it's part of the DHEA Helm exchange. And the server's RSA key, it's only purpose, it's just to authenticate the server's DHEA Helm method.

87
00:10:49,000 --> 00:10:58,000
So the server's RSA key is used for signing, not for encryption. So even if the server's RSA key is stolen a year from now, it doesn't matter.

88
00:10:58,000 --> 00:11:06,000
And so the forward secrecy means that even if somebody in the future cracks something that I'm still secure going forward in time.

89
00:11:06,000 --> 00:11:11,000
If the session was secure today, it will secure a year from now, even if you lose your secret keys.

90
00:11:12,000 --> 00:11:20,000
So forward secrecy is a pretty important concept. It's a good thing to do, especially protects you from using stolen and such.

91
00:11:20,000 --> 00:11:27,000
It also limits the amount of time in which a particular key is used because your session really now depends only on that particular DHEA Helm exchange.

92
00:11:27,000 --> 00:11:32,000
Unlike the RSA key where the server has to get a new certificate, etc.

93
00:11:33,000 --> 00:11:40,000
But the point is that someone breaks your RSA key, somehow not by stealing the private key, but somehow by a brute force attack.

94
00:11:40,000 --> 00:11:50,000
If they break your RSA key, they would recover all sessions. With DHEA Helm, they would have to break every single individual DHEA Helm exchange to recover the session, which is a lot more work.

95
00:11:50,000 --> 00:11:59,000
So it's clear going forward that network applications, the internet are increasingly important, that more and more applications are just on the internet network, interconnected.

96
00:12:00,000 --> 00:12:11,000
And correspondingly, security is increasingly important. So in terms of classes going forward, what are the classes that students could take to learn more about this?

97
00:12:11,000 --> 00:12:16,000
Because in 10 years, not knowing something about security is going to make you dead in the water.

98
00:12:16,000 --> 00:12:18,000
Exactly. That's an excellent question.

99
00:12:20,000 --> 00:12:25,000
So the security classes are kind of vital to undergraduate education and computer science.

100
00:12:26,000 --> 00:12:38,000
We get many complaints from industry about universities, not us, but other universities, graduating students who know nothing about security, and the result, as a result, the code they write causes a lot of problems down the road.

101
00:12:38,000 --> 00:12:44,000
So the classes that we offer are 1 CS155. I would argue that needs to be a required class.

102
00:12:45,000 --> 00:12:55,000
So the point of CS155 is, A, to teach you a lot of defensive programming, but more importantly, it's to get you into the security mindset.

103
00:12:55,000 --> 00:13:02,000
And the way we do that is we teach you a lot of attacks. So the only way to learn how to defend against attacks is to know how to do the attacks yourself.

104
00:13:02,000 --> 00:13:08,000
So we teach you how to break things, but more importantly, we then draw lessons and teach you how to defend against those attacks.

105
00:13:09,000 --> 00:13:16,000
And kind of getting into the security mindset whenever you write code, think about how that code can be exploited and what would go wrong if the code is exploited.

106
00:13:16,000 --> 00:13:25,000
So the security mindset, general principles for writing secure code, things like defense and depth, police privilege, and so on.

107
00:13:25,000 --> 00:13:31,000
These are things that we just go on and on and give many, many examples of those issues in CS155.

108
00:13:31,000 --> 00:13:36,000
So that's offered in the spring. It's caught up by myself and John Mitchell.

109
00:13:36,000 --> 00:13:42,000
Another class that's worth taking is the crypto class. If you're more interested in learning how cryptography works.

110
00:13:42,000 --> 00:13:49,000
And I can tell you, the interesting thing is that there are many companies who actually use crypto, but they have very little crypto expertise.

111
00:13:49,000 --> 00:13:56,000
And so by kind of taking that class, you know, you'll know what needs to be known about crypto in order to use it properly.

112
00:13:56,000 --> 00:14:04,000
And whatever job you go to, you would actually become the go to person at that company to deal with any crypto life issue.

113
00:14:04,000 --> 00:14:09,000
So it's a valuable, valuable knowledge to have. I'm convincing you I should go back to school.

114
00:14:09,000 --> 00:14:11,000
I haven't taken one.

115
00:14:11,000 --> 00:14:14,000
Okay. Well, yeah, please do. Yeah, it's a fun class.

116
00:14:14,000 --> 00:14:23,000
Awesome. Well, any other last comments you think her thoughts about what's going on in security, they and computer systems are we could be talking about this for our own.

117
00:14:23,000 --> 00:14:34,000
Yeah, I don't know. How long do you want to make this? Well, why don't we nice these students and make them find out in one of the K5 or 255?

118
00:14:34,000 --> 00:14:37,000
Thanks a lot, then. See you in the future courses.

