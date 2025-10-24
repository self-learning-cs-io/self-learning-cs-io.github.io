---
title: CS144 NetworkP1419 7SanjitBiswasCEOofMerakiinterviewedbyNickM
---

1
00:00:00,000 --> 00:00:10,000
So I am here today with Sandjit Biswas, who is the CEO of Miraki, which last year was acquired by Cisco.

2
00:00:10,000 --> 00:00:29,000
Sandjit was a Stanford undergraduate, and that's how I met him originally before he escaped to MIT and then started a very famous research project in wireless networking for the RoofNet project, where they built and then operated a peer-to-peer network wireless system across Cambridge Massachusetts for the first time.

3
00:00:29,000 --> 00:00:45,000
And after that, Sandjit and his colleagues started Miraki, and Sandjit was the CEO for the duration of the company, and they build cloud-managed Wi-Fi networks.

4
00:00:45,000 --> 00:00:52,000
In fact, the Wi-Fi network in the Gates Computer Science Building at Stanford, then at many universities, is based on Miraki.

5
00:00:52,000 --> 00:00:57,000
And so it's a delight to have you here, Sandjit. How are you?

6
00:00:57,000 --> 00:00:59,000
Good. Thanks for having me, Nate.

7
00:00:59,000 --> 00:01:14,000
So let's get stuck in with some questions. In Unit 7 of the Introduction to Computer Networks class that we teach CS144, the students learn some of the basics about wireless networking, in particular they learn about how we work with the network.

8
00:01:14,000 --> 00:01:26,000
And the channel is different in different multi-path shadowing and so on, means that connections come and go, the data rate is always changing.

9
00:01:26,000 --> 00:01:33,000
Now you learned a lot about these things in the RoofNet project, and you had a lot of practical experience.

10
00:01:33,000 --> 00:01:41,000
So can you give us a quick overview of the RoofNet project at MIT and some of the things that you learned when you were deploying the real operational Wi-Fi network?

11
00:01:41,000 --> 00:01:54,000
Sure. So the basic idea behind RoofNet is we were trying to build a research prototype network that we could use to provide broadband to students across Cambridge, which is the city that has both Harvard and MIT in it.

12
00:01:54,000 --> 00:02:05,000
It was called RoofNet because we were installing these antennas on students' writing-mash-capping software that would wrap packets through the own network and essentially provide bandwidth from a small number of sources on campus.

13
00:02:05,000 --> 00:02:16,000
What was interesting about that project is it was very much real world. So we had real world links, as you mentioned, so we saw very interesting wireless behaviors, it was very different from what we saw in simulation.

14
00:02:16,000 --> 00:02:23,000
We had routing protocols, we had to write and deploy in a production environment, and then we had real students with real traffic.

15
00:02:23,000 --> 00:02:33,000
And all of those were interesting factors. So I think you touched on some of the most fascinating things that we saw, which is that links behave differently than people originally thought.

16
00:02:33,000 --> 00:02:43,000
I think the belief at the time, 10 years ago, was that links either worked or they didn't. So if you could receive an advertisement that a link was operational, then you could write traffic over it.

17
00:02:43,000 --> 00:03:01,000
What we discovered is many links would deliver 30% of their packets or 70%. And that number would change over time, it would change by modulation, it would change by interference. So if there's someone else in the network transmitting at that time, the link that used to deliver 80% of the packets would only deliver 20%. So there's self interference.

18
00:03:01,000 --> 00:03:19,000
So those are kind of fascinating link level issues. As we kind of moved up to stack, we noticed applications actually had a big impact on how the network behaved. So you'd have a student running BitTorrent, and all of a sudden, you know, 100 other students were affected because that one person was downloading a gigabyte file or something like that.

19
00:03:19,000 --> 00:03:31,000
So I think you had a kind of layering of issues, which made it for very fascinating research. I think that's what led us to a lot of the conclusions that you saw in the papers out of MIT in the Roofland Project.

20
00:03:31,000 --> 00:03:48,000
So you're your first product. If I remember right, was a was a mesh network where the packets were carried from essentially from laptop to laptop until they reached the edge of the network or reached a point where they would connect to a wireline into the into the public internet.

21
00:03:48,000 --> 00:04:01,000
And so that's how that's how Roofnet worked and then the first products of Miraki. That was pretty unusual at the time. People had talked about that for a while. And is that idea persisted?

22
00:04:01,000 --> 00:04:17,000
It has. So the the meshing concept is still in the product. Well, we noticed is over time that that was considered novel, especially from research perspective. As we commercialized what we built, we were getting asked to do other things that would be on the scope of mesh networking.

23
00:04:17,000 --> 00:04:33,000
So for example, making a network just simply easy to deploy and manage. And that's IP address saying user management remote monitoring all that kind of stuff is that where we ended up spending a lot more time, but our products even today still have mesh built in.

24
00:04:33,000 --> 00:04:46,000
And so if I remember right, the very early on you were man, you were essentially managing other people's networks for them. I think you're remember telling me that there was even a monastery somewhere in Tibet that you were that you were managing.

25
00:04:46,000 --> 00:04:52,000
So you've been a learn you really learn about how to remotely manage other people's networks for them, right?

26
00:04:52,000 --> 00:05:01,000
Yeah, exactly. And that's I think that actually started with Rufnet where we were the ISP and we as a strong word, we were going three of us who were grad students at the beginning.

27
00:05:01,000 --> 00:05:13,000
The team didn't get that large, but we were writing software, managing the network, teaching, kind of doing all those things. As we started Miraki, we were doing that on behalf of some of our really customers as well.

28
00:05:13,000 --> 00:05:22,000
So that's where we ended up building up a tool set that ended up being really valuable to network operators because we could appreciate the kind of problems they have.

29
00:05:22,000 --> 00:05:35,000
So nowadays, if I understand correctly, most of your customers, their network is managed remotely or at least configured remotely from one of your data centers in sunny VL and various other places around the world.

30
00:05:35,000 --> 00:05:45,000
What benefits do your customers get? What benefits do users get from having this sort of centrally cloud managed Wi-Fi network?

31
00:05:45,000 --> 00:05:58,000
Yeah, you know, when you have a single device management, it's not really a big concern. You configure it once you set it and you forget it. That's it. That's typically you know, most home routers like the links that are next to your app, or fit that kind of concept.

32
00:05:58,000 --> 00:06:09,000
When you have tens of devices, hundreds of thousands of devices, the configuration and management keeping them consistent between different access points or switches or routers ends up being a big deal.

33
00:06:09,000 --> 00:06:17,000
So that's really the benefit is the consistency and then being able to see what the network was doing even if you're a thousand miles away.

34
00:06:17,000 --> 00:06:27,000
So a lot of our customers today are in their schools with large campuses or their universe for sorry enterprises who have branch sites around the world.

35
00:06:27,000 --> 00:06:42,000
And for them to have centralized ITV able to very easily deploy and manage network is compelling just from a practicality perspective. They just don't have enough hours in the day to go, you know, SSH to remote devices and try to configure them across their fingers and hope to think works.

36
00:06:42,000 --> 00:06:52,000
So if I buy a big company like I don't know Ford Motor Company that has many offices around the world, it allows a central IT organization then to manage and maintain.

37
00:06:52,000 --> 00:07:11,000
That's exactly right. So from Detroit, they could manage all of their dealerships and make sure they have consistent guest Wi-Fi, their consistent policies. If they have a security update, they can deploy very easily those kinds of things, which in kind of previous years had been a real pain for a network of industry.

38
00:07:11,000 --> 00:07:17,000
So technically, how is that different from a traditional or a typical Wi-Fi network?

39
00:07:17,000 --> 00:07:29,000
Yeah, so I think the biggest difference is in implementation. So traditional Wi-Fi networks have what was known as a controller. So an appliance that we would install in a data center or a rack somewhere in the back of the office.

40
00:07:29,000 --> 00:07:38,000
That controller provided that centralized management configuration. That works fine if you have a single site. If you have dozens or hundreds of sites that sort of breaks down.

41
00:07:38,000 --> 00:07:45,000
And so what we did is by essentially providing virtualized web servers that did all of that for you, we eliminated that piece of complexity.

42
00:07:45,000 --> 00:07:56,000
The other is we handle all the upgrades, all the software management. So as we were coming out with new ideas, new traffic shaping policies and rules, all of our customer benefit from that.

43
00:07:56,000 --> 00:08:04,000
In the past, I would have required upgrading the controller appliance, which often just didn't get done. So networks would kind of get stuck in time at the point they were installed.

44
00:08:04,000 --> 00:08:13,000
And with the way things are changing so quickly, you know, a new Wi-Fi gets released and you need a new form of traffic management so you can provide a good experience for it.

45
00:08:13,000 --> 00:08:18,000
That was breaking down and becoming very brittle. So that's really the big difference. It's very practical.

46
00:08:18,000 --> 00:08:22,000
I see. So if I understand correctly, all of that functionality is in the access point.

47
00:08:22,000 --> 00:08:23,000
That's right.

48
00:08:23,000 --> 00:08:29,000
And then the access point, the only other entity is that the access point is connecting directly back to the...

49
00:08:29,000 --> 00:08:31,000
Yeah, I would manage it back in the...

50
00:08:31,000 --> 00:08:41,000
Exactly. So the data plane, all the traffic is being ported directly to the internet, all the kind of high-level management reporting statistics collection, that's all done in the cloud.

51
00:08:41,000 --> 00:08:47,000
And then the firmware on the device can be upgraded on a regular basis, so perhaps once every few months.

52
00:08:47,000 --> 00:08:51,000
And that kind of gives you the software defined nature, the edge.

53
00:08:51,000 --> 00:08:57,000
So if you come up with a new policy or a new firmware feature, you can easily deploy that.

54
00:08:57,000 --> 00:09:01,000
If we have a new UI feature, we can deploy that within a day and everyone sees it.

55
00:09:01,000 --> 00:09:13,000
I see. So with you having that sort of access or your servers having that access control of everybody's Wi-Fi access points, presumably some people get a little nervous about security and privacy and things like this.

56
00:09:13,000 --> 00:09:14,000
Right.

57
00:09:14,000 --> 00:09:18,000
Is that a common concern and how do you overcome those concerns?

58
00:09:18,000 --> 00:09:22,000
It is a common concern. I think it's a good one for customers to have.

59
00:09:22,000 --> 00:09:35,000
We're not the only cloud service most businesses use. In fact, whether they're using Gmail or Salesforce.com or one of these other services, I think customers these days are becoming wise to the ways that the cloud is asking the right question.

60
00:09:35,000 --> 00:09:43,000
So how do you retain your data? How much of this data is going into the cloud? Who can see it? Where are your data centers? How are they managed? All those kind of questions.

61
00:09:43,000 --> 00:09:55,000
What we do is we just try to shine a bright light on it and be as straightforward as possible. So we have a little website at marakiyak.com.st and the customer can learn about the architecture of the system.

62
00:09:55,000 --> 00:09:59,000
Who runs our data centers under the covers and all that.

63
00:09:59,000 --> 00:10:09,000
And so from a technical point of view, how does that work? So presumably you secure the connection between the access point and your service.

64
00:10:09,000 --> 00:10:18,000
You could think of it as an IP sac tunnel. It's running the equivalent of Google protocol buffers over it. So the amount of bandwidth is very small. It's about a kilobit per second.

65
00:10:18,000 --> 00:10:23,000
And that's in aggregate. It's all of the kind of statistics collection and so on.

66
00:10:23,000 --> 00:10:29,000
The real difference is that it is encrypted in the same way that you would expect with public key encryption.

67
00:10:29,000 --> 00:10:41,000
Yeah, okay. All right. And that's kind of interesting. So with all this sort of interest in SDN and in class, we Martin Kassato came and gave a talk.

68
00:10:41,000 --> 00:10:53,000
So everyone's up to speed. Software defined networking. So many, you know, many people believe more and more that networks are going to be managed remotely by software running at least outside the physical data plane.

69
00:10:53,000 --> 00:11:02,000
They may not be running in the cloud or at the may not be managed in the cloud, but they can be managed from somewhere outside of the data plane using to be doing that already.

70
00:11:02,000 --> 00:11:13,000
Do you think that all networks will be cloud managed in the future and that the software will be sort of this clean separation between the software control and the data plane.

71
00:11:13,000 --> 00:11:17,000
Is that kind of inevitable to think for Wi-Fi networks and.

72
00:11:17,000 --> 00:11:29,000
So networking is such a big market segment that it's it's hard to make a blanket statement at all, but I think most certainly will be and it's really again kind of practicality.

73
00:11:29,000 --> 00:11:41,000
We've seen people move from an on premise based email approach with Microsoft Exchange or you know running their own SMTP and IMAP servers and all that kind of stuff to moving things to you know Gmail or hosted approach on email.

74
00:11:41,000 --> 00:11:47,000
It makes logical sense that things like managing network infrastructure will move to the cloud as well.

75
00:11:47,000 --> 00:11:55,000
And what we're hearing from a lot of our customers, it could be big or small. They just find it simpler. So I think the world tends to prefer efficiency and simplicity.

76
00:11:55,000 --> 00:12:00,000
So the short answer is yes, I think most networks over the next five, 10 years will move to this cloud managed model.

77
00:12:00,000 --> 00:12:08,000
And if I understand correctly, it's not just Wi-Fi access points, it's switches physical switches for wired networks as well.

78
00:12:08,000 --> 00:12:18,000
That's right. So it switches and also routers or security appliances. So kind of the gateway device that connects between the service rider and the local area network.

79
00:12:18,000 --> 00:12:26,000
So what we discovered is originally we started out building wireless products. We built indoor outdoor products. We were kind of coming out there reshaped in size.

80
00:12:26,000 --> 00:12:37,000
And my customers were saying this is wonderful. I have a tremendous amount of visibility management on the wireless network, but I also have a lot of wired devices, whether they're PCs, point of sale terminals, printers, security.

81
00:12:37,000 --> 00:12:49,000
Camera's phones, that kind of stuff. Could you provide that the management over the wired network? And so now we just do all of it. And it works really well together because consistency is really what people are looking for.

82
00:12:49,000 --> 00:12:52,000
They want to set up policy and then just have it go across the entire business.

83
00:12:52,000 --> 00:13:03,000
So do you think this will start being the way that my home network, my Wi-Fi and general home network will be managed in future by outsourcing the management to the cloud?

84
00:13:03,000 --> 00:13:13,000
I think we didn't address that specific use case. The kinds of products and the way that consumers buy is a little different in the way businesses buy.

85
00:13:13,000 --> 00:13:20,000
So we ended up focusing on the enterprise or campus use case. I do think we will see more consumer products managed from the cloud.

86
00:13:20,000 --> 00:13:24,000
So I just recently installed a nest thermostat, which I think are becoming pretty popular.

87
00:13:24,000 --> 00:13:33,000
It's a really cool experience being able to remotely change the settings of your temperature. And if you go on vacation, you can turn it down and all that kind of stuff.

88
00:13:33,000 --> 00:13:38,000
It might make sense for people to do that with their bandwidth as well. It's only matter time.

89
00:13:38,000 --> 00:13:42,000
Hang on, I'm just logging in here to change the temperature of your bandwidth.

90
00:13:42,000 --> 00:13:44,000
Let's hope they're good at secured.

91
00:13:44,000 --> 00:13:46,000
Yeah, exactly.

92
00:13:46,000 --> 00:14:03,000
So when you're thinking about some of the problems that you have to solve, not only for Miraki, but networking in general and your part of Cisco now and part of a big company, what do you think there's some of the interesting problems to work on?

93
00:14:03,000 --> 00:14:07,000
You've clearly been working on a fascinating new problem for the last few years.

94
00:14:07,000 --> 00:14:11,000
What do you think some of the interesting problems in networking are over the next few years?

95
00:14:11,000 --> 00:14:16,000
Yeah, you know, it's fascinating. Network evolving, networking evolves so quickly.

96
00:14:16,000 --> 00:14:27,000
Between the time that we started Miraki, which is about seven years ago and today, our products have gotten roughly a hundred times faster, which is pretty incredible. Right? That's more of a lot of action.

97
00:14:27,000 --> 00:14:32,000
The other thing we've seen is the number of devices connecting behind our networks has grown considerably.

98
00:14:32,000 --> 00:14:39,000
And, you know, in 2006, the iPhone was just coming out as primarily PCs and laptops that were shown on these networks.

99
00:14:39,000 --> 00:14:42,000
Now it's really all these mobile devices.

100
00:14:42,000 --> 00:14:45,000
So I think the way things are headed is that's not going to stop.

101
00:14:45,000 --> 00:14:53,000
In fact, we talked about the mess earlier, but you see things like the Fitbit scale and, you know, other products connecting the Wi-Fi network.

102
00:14:53,000 --> 00:14:56,000
It's only matter of time before lots and lots of devices are connecting.

103
00:14:56,000 --> 00:15:04,000
And I think that's going to be interesting because these are devices that may not have a UI attached to them where you can click on the network and type in a password.

104
00:15:04,000 --> 00:15:11,000
So that's going to lead to interesting questions about how to do authenticate these sort of UI-less devices.

105
00:15:11,000 --> 00:15:12,000
Yeah.

106
00:15:12,000 --> 00:15:14,000
That's going to lead, of course, to capacity issues.

107
00:15:14,000 --> 00:15:18,000
When you have a thousand devices on a single network, there's always contention.

108
00:15:18,000 --> 00:15:20,000
So I think there's going to be interesting problems there.

109
00:15:20,000 --> 00:15:24,000
And then I think people always want these networks to be faster and more manageable.

110
00:15:24,000 --> 00:15:31,000
So all these problems, what's going on is the scaling of number of devices, the amount of bandwidth, the number of sites, all that kind of stuff.

111
00:15:31,000 --> 00:15:38,000
So whenever you see that such rapid expansion, I think it creates a lot of new research problems and problems for industry as well.

112
00:15:38,000 --> 00:15:43,000
So we have 200 people in the CS144 class at Stanford this year.

113
00:15:43,000 --> 00:15:52,000
So there's going to be lots of people sitting there that are going to go on to be entrepreneurs and start their own businesses.

114
00:15:52,000 --> 00:15:55,000
Some successful, some probably not.

115
00:15:55,000 --> 00:16:10,000
From your vantage point now with the experience that you've had as a researcher, becoming an entrepreneur, starting a company, being a CEO, and then taking that company to be very successful.

116
00:16:10,000 --> 00:16:21,000
What's the advice that you would offer to students sitting in class who would be thinking about doing this and doing what would have been the advice that would be useful to you to have heard at that time?

117
00:16:21,000 --> 00:16:31,000
Well, I think that the most interesting thing that I noticed about the journey was that we were able to figure out the challenges at every step along the way.

118
00:16:31,000 --> 00:16:40,000
You just outlined, I think, what it takes to go from a startup to a company that has a significant amount of revenue and sales and so on.

119
00:16:40,000 --> 00:16:42,000
Every year the challenges were different.

120
00:16:42,000 --> 00:16:48,000
And I think the way we learned to think in grad school and even in undergrad is we were learning about these kinds of problems.

121
00:16:48,000 --> 00:16:51,000
In engineering classes, I ended up applying to the way we built the business.

122
00:16:51,000 --> 00:16:54,000
So essentially figuring things out from first principles.

123
00:16:54,000 --> 00:17:00,000
I remember I think I was in the CS244 class where we had to write a TCP stack and an FTP clients and just make it work.

124
00:17:00,000 --> 00:17:03,000
And that's kind of what you're doing when you're building a business.

125
00:17:03,000 --> 00:17:05,000
You have an idea of what you're trying to build.

126
00:17:05,000 --> 00:17:08,000
You have an idea of what the interfaces are.

127
00:17:08,000 --> 00:17:11,000
And then you need to build an implementation.

128
00:17:11,000 --> 00:17:17,000
And a lot of times I think students think, oh, I need somebody who's been to business school or I need an expert in the field.

129
00:17:17,000 --> 00:17:22,000
And the reality is that folks at Stanford and other schools of similar caliber are very, very smart.

130
00:17:22,000 --> 00:17:25,000
And you'd be surprised that you can figure out on your own.

131
00:17:25,000 --> 00:17:29,000
So I wish I'd known that, but it wasn't going to be impossible.

132
00:17:29,000 --> 00:17:33,000
In many ways we also got lucky, but it's certainly what it's trying.

133
00:17:33,000 --> 00:17:36,000
And I think it's a great experience for everybody to give a shot.

134
00:17:36,000 --> 00:17:44,000
So have confidence in your own abilities and don't worry too much about others who have been struggling at the same problem for years.

135
00:17:44,000 --> 00:17:50,000
Just buckle in and pull down and the yeah, it's almost like don't look too much at the related work.

136
00:17:50,000 --> 00:17:55,000
Just go try to do something on your own and figure it out from first principles and you'd be surprised.

137
00:17:55,000 --> 00:18:00,000
I think a lot of people think that there's a lot of mastery required.

138
00:18:00,000 --> 00:18:04,000
And if you think about most of the very successful companies in Silicon Valley,

139
00:18:04,000 --> 00:18:08,000
a lot of them were founded by students who've never done it before.

140
00:18:08,000 --> 00:18:10,000
So it definitely can be done.

141
00:18:10,000 --> 00:18:12,000
Wonderful, that's great advice.

142
00:18:12,000 --> 00:18:13,000
So thank you very much.

143
00:18:13,000 --> 00:18:15,000
Really appreciate your time, Sanjit.

144
00:18:15,000 --> 00:18:16,000
Great, thanks.

145
00:18:16,000 --> 00:18:18,000
Bye right now.

