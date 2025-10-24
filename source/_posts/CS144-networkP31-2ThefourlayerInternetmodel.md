---
title: CS144 NetworkP31 2ThefourlayerInternetmodel
---

1
00:00:00,000 --> 00:00:05,120
In the last video you learned how a variety of different applications such as

2
00:00:05,120 --> 00:00:09,320
BitTorrent, Skype and the web all communicate over the internet using a very

3
00:00:09,320 --> 00:00:14,599
similar model basically a bidirectional reliable byte string. It takes a lot of

4
00:00:14,599 --> 00:00:18,559
different pieces working together to create this reliable communication model for

5
00:00:18,559 --> 00:00:23,519
our applications but even though we use a huge variety of different internet

6
00:00:23,519 --> 00:00:27,480
applications sending many kinds of data at very different speeds there are

7
00:00:27,480 --> 00:00:31,679
surprisingly strong similarities in the way applications send and receive

8
00:00:31,679 --> 00:00:35,960
data. For example applications want to send and receive data without having

9
00:00:35,960 --> 00:00:40,880
to worry about the path or route that the data takes across the internet and

10
00:00:40,880 --> 00:00:44,320
almost all applications want to be confident that their data is correctly

11
00:00:44,320 --> 00:00:48,799
received with any lost or corrupted data automatically retransmitted until

12
00:00:48,799 --> 00:00:54,480
it's received correctly. The early internet pioneers created the four layer

13
00:00:54,479 --> 00:00:58,159
internet model to describe the hierarchy of operations that make up the

14
00:00:58,159 --> 00:01:02,239
internet so that applications can reuse the same building blocks over and over

15
00:01:02,239 --> 00:01:06,000
again without having to create them from scratch for every new application.

16
00:01:06,000 --> 00:01:10,079
Layering is really important and frequently used concept in networking and we'll

17
00:01:10,079 --> 00:01:13,799
be seeing it many many times throughout this course. There's even a video devoted

18
00:01:13,799 --> 00:01:18,159
just to the concept of layering. Let's look at what each layer of the four layer

19
00:01:18,159 --> 00:01:22,599
internet model does. It helps to remember that all four layers are there to enable

20
00:01:22,599 --> 00:01:27,280
applications in the end hosts to communicate reliably. To explain how it works

21
00:01:27,280 --> 00:01:30,759
I'm going to start at the bottom layer. We'll see that each layer has a

22
00:01:30,759 --> 00:01:34,319
different responsibility with each layer building a service on top of the one

23
00:01:34,319 --> 00:01:38,679
below all the way to the top where we have the bidirectional reliable byte stream

24
00:01:38,679 --> 00:01:43,079
communication between applications. Okay let's start with the link layer. The

25
00:01:43,079 --> 00:01:47,919
internet is made up of end hosts links and routers. Data is delivered hot by

26
00:01:47,960 --> 00:01:52,560
hop over each link in turn. Data is lit delivered in packets. A packet is a

27
00:01:52,560 --> 00:01:56,480
self-contained unit consisting of the data we want to be delivered along with a

28
00:01:56,480 --> 00:02:00,439
header that tells the network where the packet is to be delivered where it came

29
00:02:00,439 --> 00:02:06,840
from and so on. The link layers job is to carry the data over one link at a time.

30
00:02:06,840 --> 00:02:10,800
You've probably heard of Ethernet and Wi-Fi. These are two examples of

31
00:02:10,800 --> 00:02:17,599
different link layers. The next layer up is for us the most important layer the

32
00:02:17,599 --> 00:02:23,000
network layer. The network's layers job is to deliver packets end to end across

33
00:02:23,000 --> 00:02:27,159
the internet from the source to the destination. A packet is an important

34
00:02:27,159 --> 00:02:30,560
building block in the network. A packet is the name we give to that collection of

35
00:02:30,560 --> 00:02:34,079
data with a header and a header that describes what the data is where it's going

36
00:02:34,079 --> 00:02:37,959
and where it came from as we saw in the last slide. You'll often see packets

37
00:02:37,959 --> 00:02:44,560
drawn like this. Network layer packets are called data grams. They consist of

38
00:02:44,560 --> 00:02:49,879
some data and a header containing the two and from addresses just like we put

39
00:02:49,879 --> 00:02:55,719
the two and from addresses in a letter. The network hands the data gram to the

40
00:02:55,719 --> 00:03:00,479
link layer telling it to send the data gram over the first link. In other

41
00:03:00,479 --> 00:03:04,360
words the link layer is providing a service to the network layer. Essentially

42
00:03:04,360 --> 00:03:08,879
the link layer is saying if you give me a data gram to send I'll transmit it

43
00:03:08,879 --> 00:03:15,280
over one link for you. At the other end of the link is a router. The link layer

44
00:03:15,280 --> 00:03:19,199
of the router accepts the data gram from the link and hands it up to the

45
00:03:19,199 --> 00:03:23,560
network layer inside the router. The network layer on the router examines the

46
00:03:23,560 --> 00:03:27,039
destination address of the data gram and is responsible for routing the

47
00:03:27,039 --> 00:03:31,400
data gram one hopper to time towards its eventual destination. It does this by

48
00:03:31,400 --> 00:03:38,439
sending it to the link layer again to carry it over the next link which is passed

49
00:03:38,439 --> 00:03:42,960
to the network layer at the next router and so on until it reaches the network

50
00:03:42,960 --> 00:03:48,879
layer at the destination eventually. Notice that the network layer does not need

51
00:03:48,879 --> 00:03:52,719
to concern itself with how the link layer sends the data gram over each link.

52
00:03:52,719 --> 00:03:56,759
In fact different link layers work in very different ways. Ethernet and

53
00:03:56,759 --> 00:03:59,400
Wi-Fi are clearly very different and we're going to be learning about them in

54
00:03:59,400 --> 00:04:04,000
more detail later. This separation of concerns between the network layer and the

55
00:04:04,000 --> 00:04:08,039
link layer allows each to focus on its job without worrying about how the other

56
00:04:08,039 --> 00:04:12,840
layer works. It also means that a single network layer has a common way to talk

57
00:04:12,840 --> 00:04:17,000
to many different link layers by simply handing them data grams to send. This

58
00:04:17,000 --> 00:04:21,719
separation of concerns is made possible by the modularity of each layer and a

59
00:04:21,719 --> 00:04:29,039
common well-defined API to the layer below. In the internet the network layer is

60
00:04:29,039 --> 00:04:33,279
special. When we send packets into the internet we must use the internet

61
00:04:33,279 --> 00:04:37,920
protocol. It is the internet protocol or IP that holds the internet together

62
00:04:37,920 --> 00:04:42,080
We'll learn more about the details of IP in later videos but for now it's good

63
00:04:42,080 --> 00:04:48,960
to know some basic facts about IP. First of all IP makes a best effort attempt to

64
00:04:48,960 --> 00:04:54,439
deliver our data grams to the other end but it makes no promises. Second, IP

65
00:04:54,439 --> 00:04:58,560
data grams can get lost. They can be delivered out of order and they can be corrupted.

66
00:04:58,560 --> 00:05:05,680
There are no guarantees. This may come as a surprise. You might be asking how

67
00:05:05,680 --> 00:05:09,959
could the internet work at all when the packets are not guaranteed to be delivered?

68
00:05:09,959 --> 00:05:14,240
Well, if an application wants a guarantee that its data will be

69
00:05:14,240 --> 00:05:18,680
retransmitted when necessary and will be delivered to the application in order and

70
00:05:18,680 --> 00:05:23,680
without corruption then it needs another protocol running on top of IP. That's

71
00:05:23,680 --> 00:05:31,199
the job of the transport layer. The most common transport layer is TCP or the

72
00:05:31,199 --> 00:05:35,199
transmission control protocol. You've probably heard of TCP IP which is when an

73
00:05:35,199 --> 00:05:41,759
application uses both TCP and IP together. TCP's job is to make sure that the

74
00:05:41,759 --> 00:05:45,959
data sent by an application at one end of the internet is correctly delivered in

75
00:05:45,959 --> 00:05:49,920
the right order to the application at the other end of the internet. If the

76
00:05:49,920 --> 00:05:54,599
network layers drop some data grams, TCP will transmit them multiple times if

77
00:05:54,599 --> 00:05:59,399
need be. If the network delivers them out of order, perhaps because two packets

78
00:05:59,399 --> 00:06:03,360
follow a different path to their destination, TCP will put the data back into

79
00:06:03,360 --> 00:06:08,319
the correct order again. In later videos you'll learn a lot about TCP and how it

80
00:06:08,319 --> 00:06:13,280
works. For now, the main thing you need to remember is that TCP provides a service

81
00:06:13,280 --> 00:06:17,960
to an application that guarantees correct in order delivery of data running on

82
00:06:17,960 --> 00:06:22,720
top of the network layer service. The network layer is providing an unreliable

83
00:06:22,720 --> 00:06:28,960
data gram delivery service underneath. As I'm sure you can imagine, applications

84
00:06:28,959 --> 00:06:33,879
such as a web client or an email client find TCP very useful indeed. By

85
00:06:33,879 --> 00:06:37,479
employing TCP to make sure data is delivered correctly, they don't have to

86
00:06:37,479 --> 00:06:41,279
worry about implementing all of the mechanisms inside the application. They

87
00:06:41,279 --> 00:06:44,560
can take advantage of the huge effort that other developers have put into

88
00:06:44,560 --> 00:06:48,719
correctly implementing TCP over the years and then reuse it to deliver data

89
00:06:48,719 --> 00:06:56,319
correctly. Reuse is a big advantage of layering. But not all applications need

90
00:06:56,319 --> 00:07:00,759
data to be delivered correctly. For example, if a video conference application is

91
00:07:00,759 --> 00:07:04,159
sending a snippet of video in a packet, there may be no point waiting for the

92
00:07:04,159 --> 00:07:08,560
packet to be retransmitted multiple times. Better to just move on. Some

93
00:07:08,560 --> 00:07:13,480
applications just don't need the TCP service. If an application doesn't need

94
00:07:13,480 --> 00:07:18,079
reliable delivery, it can use the much simpler UDP or use the data gram protocol

95
00:07:18,079 --> 00:07:23,039
instead. UDP is an alternative transport layer that bundles up application data

96
00:07:23,040 --> 00:07:26,960
and hands it to the network layer for delivery to the other end. UDP offers

97
00:07:26,960 --> 00:07:32,640
no delivery guarantees at all. In other words, an application has the choice of

98
00:07:32,640 --> 00:07:37,240
at least two different transport layer services, TCP and UDP. There are in

99
00:07:37,240 --> 00:07:40,960
fact many other choices too, but these are the most commonly used transport layer

100
00:07:40,960 --> 00:07:47,480
services. Finally, we have the application layer at the top of the four layer

101
00:07:47,480 --> 00:07:52,040
model. There are of course many thousands of applications using the internet.

102
00:07:52,040 --> 00:07:57,200
While each application is different, it can reuse the transport layer by using

103
00:07:57,200 --> 00:08:02,760
the well-defined API from the application layer to the TCP or UDP service beneath.

104
00:08:02,760 --> 00:08:07,640
As we saw in the last video, applications typically want a bidirectional

105
00:08:07,640 --> 00:08:12,160
reliable byte stream between two endpoints. They can send whatever byte stream

106
00:08:12,160 --> 00:08:16,000
they want, and applications have their own protocol to define the syntax and

107
00:08:16,000 --> 00:08:22,199
semantics of data flowing between the two endpoints. For example, as we saw in

108
00:08:22,199 --> 00:08:26,959
the last video, when a web client requests a page from a web server, the web

109
00:08:26,959 --> 00:08:30,839
client sends a get request. This is one of the commands of the Hypertext

110
00:08:30,839 --> 00:08:36,440
Transfer Protocol or HTTP. HTTP dictates that the get command is sent as an

111
00:08:36,440 --> 00:08:42,799
ASCII string along with the URL of the page being requested. As far as the

112
00:08:42,799 --> 00:08:47,279
application layer is concerned, the get request is sent directly to its peer at

113
00:08:47,279 --> 00:08:53,559
the other end, the web server application. The application doesn't need to know

114
00:08:53,559 --> 00:08:58,479
how the data got there or how many times it needed to be retransmitted. At the

115
00:08:58,479 --> 00:09:02,279
web client, the application layer hands the get request to the TCP layer, which

116
00:09:02,279 --> 00:09:06,199
provides the service of making sure it is reliably delivered. It does this using

117
00:09:06,199 --> 00:09:09,279
the services of the network layer which in turn uses the services of the

118
00:09:09,279 --> 00:09:14,000
link layer. We say that each layer communicates with its peer layer. It's as if each

119
00:09:14,000 --> 00:09:17,399
layer is only communicating with the same layer at the other end of the link

120
00:09:17,399 --> 00:09:23,279
or internet, without regard for how the layer below gets the data there.

121
00:09:24,279 --> 00:09:28,919
Putting it all together then, network engineers find it convenient to arrange all

122
00:09:28,919 --> 00:09:32,839
the functions that make up the internet into layers. At the top is the

123
00:09:32,839 --> 00:09:36,600
application such as BitTorrent or Skype or the World Wide Web, which talks to

124
00:09:36,600 --> 00:09:40,920
its peer layer at the destination. When the application has data descend, it

125
00:09:40,920 --> 00:09:44,639
hands the data to the transport layer, which has the job of delivering the data

126
00:09:44,639 --> 00:09:49,600
reliably or not to the other end. The transport layer sends data to the other end

127
00:09:49,600 --> 00:09:53,600
by handing it to the network layer, which has the job of breaking the data into

128
00:09:53,600 --> 00:09:56,639
packets each with the correct destination address. Finally, the packets are

129
00:09:56,639 --> 00:09:59,240
handed to the link layer, which has the responsibility of delivering the

130
00:09:59,240 --> 00:10:04,040
packet from one hop to the next along its path. The data makes its way hop by

131
00:10:04,039 --> 00:10:07,199
hop from one router to the next. The network layer forwards it to the next

132
00:10:07,199 --> 00:10:10,959
router, one at a time until it reaches the destination. There the data is passed

133
00:10:10,959 --> 00:10:18,039
up the layers until it reaches the application. So in summary, applications by

134
00:10:18,039 --> 00:10:21,519
directional reliable byte stream between applications, typically but not always,

135
00:10:21,519 --> 00:10:25,599
and they use application specifics of the semantics, which we'll be learning

136
00:10:25,599 --> 00:10:31,120
about later, such as HTTP or BitTorrent. The transport layer typically guarantees

137
00:10:31,120 --> 00:10:35,399
correct in order delivery of data end to end and controls congestion. Although

138
00:10:35,399 --> 00:10:38,200
some applications don't need this and so they can use a different transport

139
00:10:38,200 --> 00:10:43,840
layer instead. The network layer delivers data grams end to end. It's providing a

140
00:10:43,840 --> 00:10:47,440
best effort delivery service with no guarantees. We must use the Internet

141
00:10:47,440 --> 00:10:51,519
protocol. The link layer delivers data over a single link between an end host

142
00:10:51,519 --> 00:10:57,879
and a router or between two routers. There's two extra things I'd like you to

143
00:10:57,879 --> 00:11:03,679
know. The first is that IP is often referred to as the thin waste of the

144
00:11:03,679 --> 00:11:08,840
Internet. This is because if we want to use the Internet, we have to use the

145
00:11:08,840 --> 00:11:13,600
Internet protocol. We have no choice. But we have lots of choices for link layers.

146
00:11:13,600 --> 00:11:19,320
IP runs over many, many different link layers such as Ethernet, Wi-Fi, DSL, 3G

147
00:11:19,320 --> 00:11:24,879
cellular and so on. And on top of the IP layer, we can choose between many

148
00:11:24,879 --> 00:11:29,519
different transport layers. We already heard about TCP and UDP. There's also

149
00:11:29,519 --> 00:11:33,759
RTP for real-time data and many others too. And of course there are tens of

150
00:11:33,759 --> 00:11:40,200
thousands of different applications sitting on top. The second thing I want you

151
00:11:40,200 --> 00:11:44,399
to know is that in the 1980s, the International Standards Organization or ISO

152
00:11:44,399 --> 00:11:50,159
created a seven layer model to represent any type of network. It was called the

153
00:11:50,159 --> 00:11:55,559
seven layer open systems interconnection or OSI model. We don't need to spend any

154
00:11:55,559 --> 00:11:58,439
time and all in this course because it's been replaced by the four layer

155
00:11:58,439 --> 00:12:02,639
Internet model for all intents and purposes. But if you're interested, you'll find

156
00:12:02,639 --> 00:12:06,919
any networking textbook and Wikipedia describes the seven layers in lots and

157
00:12:06,919 --> 00:12:12,959
lots of detail. The seven layer model defines layers that were combined in the

158
00:12:12,959 --> 00:12:18,319
four layer Internet model later. For example, what we call the link that link

159
00:12:18,320 --> 00:12:23,120
layer today was separated into the link layer that defined the framing format

160
00:12:23,120 --> 00:12:27,080
and the physical layer that defined things like the voltage levels on the

161
00:12:27,080 --> 00:12:32,920
cable or the physical dimensions of a connector. The network layer is pretty

162
00:12:32,920 --> 00:12:38,480
much the same in both models. The transport and applications layer is each

163
00:12:38,480 --> 00:12:44,680
represented by two layers in the OSI models. These are examples of commonly

164
00:12:44,679 --> 00:12:50,199
used Internet protocols. For example, HTTP which passes most of its data in the

165
00:12:50,199 --> 00:12:56,799
protocol in ASCII and how they map to the OSI numbering scheme. Today, the only

166
00:12:56,799 --> 00:13:00,479
real legacy of the seven layer OSI model that you need to know about is the

167
00:13:00,479 --> 00:13:04,319
numbering system. You'll often hear network engineers refer to the network

168
00:13:04,319 --> 00:13:09,519
layer as layer three, even though it's the second layer up from the bottom in

169
00:13:09,519 --> 00:13:15,480
the Internet model. Similarly, you'll hear people refer to Ethernet as link

170
00:13:15,480 --> 00:13:22,360
the layer two and you'll hear application referred to as layer seven.

