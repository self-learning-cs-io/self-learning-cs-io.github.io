---
title: MIT6824 P21Lecture20 Blockstack
---

1
00:00:00,000 --> 00:00:05,759
Okay, thank you. Okay, so that's good afternoon. Good morning. Good evening. Good night,

2
00:00:05,759 --> 00:00:11,839
wherever you are. And I guess I was welcome to the last week of the semester. So there's two more

3
00:00:11,839 --> 00:00:17,120
class meetings today, which we're going to be talking about block stack. And on first day,

4
00:00:17,920 --> 00:00:24,320
while we get a report from the different projects from the number of the project groups in 6, 8,

5
00:00:24,320 --> 00:00:34,399
2, 4. So today is basically the last paper discussion day. And so the topic is, you know,

6
00:00:34,399 --> 00:00:40,400
the system that we assigned for when I assigned for reading was block stack. And really,

7
00:00:40,399 --> 00:00:46,000
what block stack represents is an approach to building decentralized

8
00:00:49,280 --> 00:00:58,879
applications. And we've decentralized what we mean here is that unlike in centralized websites,

9
00:00:58,879 --> 00:01:04,719
you know, the sort of website, owns the data in decentralized application, the system is set up

10
00:01:04,719 --> 00:01:09,039
in a way that the users actually keep control over the data and not the websites.

11
00:01:09,840 --> 00:01:13,920
And so this form sort of a trend in the last, you know, is sort of the final lecture in this

12
00:01:13,920 --> 00:01:18,560
sort of series of three lectures on decentralized distributed systems. You know, we talked about

13
00:01:19,920 --> 00:01:25,439
logs and signing or sign logs as a way of constructing these decentralized storage systems.

14
00:01:26,160 --> 00:01:33,280
We saw Bitcoin to see as an example of how you can achieve consensus in a decentralized system

15
00:01:33,280 --> 00:01:38,640
with entrusted participants or business and participants. And so today we're sort of taking one

16
00:01:38,640 --> 00:01:42,960
more step off and actually look at like how you can actually build, you know, complete applications

17
00:01:42,960 --> 00:01:48,879
other than just crypto currency applications. And decentralized applications have a long history

18
00:01:49,840 --> 00:01:56,319
in the early 2000s and late 90s. There was a lot of to do around peer-to-peer applications,

19
00:01:57,599 --> 00:02:02,719
which had a decentralized architecture like Napster, you know, more reasonably,

20
00:02:03,519 --> 00:02:09,759
you know, you're probably familiar with Keybase, which has a decentralized design or a solid,

21
00:02:11,759 --> 00:02:17,680
and of course, BoxStank. And so there's a, no, quite a bit of activity in this space of decentralized

22
00:02:17,680 --> 00:02:24,319
applications. The blocks that is interesting from the perspective of actually running decentralized

23
00:02:24,319 --> 00:02:30,319
applications, but also is an example of sort of a non-currency use, non-money use,

24
00:02:32,719 --> 00:02:48,960
of Bitcoin, of the blockchain. And we'll see, you know, there are a number of aspects that

25
00:02:48,960 --> 00:02:54,159
are interesting in the block stack, but the key thing that the sort of paper focuses on is actually

26
00:02:54,159 --> 00:03:01,120
naming how to sort of build and distribute a decentralized naming system. And of course,

27
00:03:01,120 --> 00:03:07,280
our naming systems are widely used, you know, if you think of DNS, I think of a, you know,

28
00:03:07,280 --> 00:03:11,520
Peruvian roast, you know, there's tons and tons of different naming systems out there,

29
00:03:11,520 --> 00:03:15,439
you know, why we use, and this is just a different design than where the most interesting part of it

30
00:03:15,439 --> 00:03:25,840
again is it's decentralized. Now this lecture is a little bit different than sort of the

31
00:03:25,840 --> 00:03:29,120
preceding lectures or many of the preceding lectures, many of the preceding lectures sort of have

32
00:03:29,120 --> 00:03:33,120
to play here, well, here's a hard technical problem, here's the solution to solve that particular

33
00:03:33,120 --> 00:03:39,360
problem. And here we're in a slightly sort of different position, there's a hard technical problem

34
00:03:39,360 --> 00:03:44,640
and we have to build decentralized applications, but it's not, you know, 100% clear that there's

35
00:03:44,640 --> 00:03:48,080
exactly, you know, the right thing to do to build decentralized applications, when there's extremely

36
00:03:48,080 --> 00:03:54,640
intriguing. And it's not clear that like block stack is just the right solution to do so. And so

37
00:03:54,639 --> 00:03:59,919
it's much more experimental, you know, walkstrike does actually have a user community, and

38
00:04:00,639 --> 00:04:05,679
but, you know, it's not like yet an overwhelming success and a demonstration that this is the

39
00:04:05,679 --> 00:04:13,839
right way to go. So in that sense, this is, this paper in some sense is more fought-provoking

40
00:04:13,839 --> 00:04:18,560
than giving actually a definite answer to a particular technical problem. And so,

41
00:04:19,439 --> 00:04:26,720
in some ways, you know, this is a lower topic that sort of lends self to a larger debate about,

42
00:04:26,720 --> 00:04:32,639
you know, the different views on this kind of kind of design. And so, when we're doing lecture,

43
00:04:32,639 --> 00:04:38,000
if we get to, it would be perfectly fine actually, you know, to have quite a bit of discussion

44
00:04:38,800 --> 00:04:41,519
on different aspects. And I don't think there's going to be one right answer.

45
00:04:42,159 --> 00:04:48,959
And so, anytime you have a question about, or one is, are you about a particular aspect of

46
00:04:48,959 --> 00:04:58,799
sort of these decentralized app designs, you know, in the speak-up? Okay. So maybe before, you know,

47
00:04:58,799 --> 00:05:02,399
talking about decentralized apps, you know, this is a quick revisit, you know, actually, what's

48
00:05:02,399 --> 00:05:06,319
sort of the common paradigm to actually build websites, or build web applications, right? And that's

49
00:05:06,959 --> 00:05:15,439
really using centralized websites. The sites in my itself might be distributed across multiple

50
00:05:15,439 --> 00:05:20,079
data centers across the world, but the architecture of the design of the site is, you know, centralized,

51
00:05:20,079 --> 00:05:25,759
you know, where we have, you know, here's your, your typical website. It has, you know, some

52
00:05:25,759 --> 00:05:31,360
applications from code, you know, whatever, Gmail, you know, whatever Twitter or Facebook,

53
00:05:32,240 --> 00:05:39,040
and that operates on a database that contains, you know, user data.

54
00:05:42,879 --> 00:05:46,560
And we might actually have different users interacting, you know, with the

55
00:05:47,680 --> 00:05:54,639
sitting by the web browser, and user one, user two, they interact through the application

56
00:05:54,639 --> 00:05:58,560
with the website, you know, they create data, the data stored in the database,

57
00:05:59,280 --> 00:06:04,160
the user may view the data, and the application displays basically, you know, that data to,

58
00:06:04,879 --> 00:06:09,680
you know, inside of the web browser. Maybe, you know, the data might be, you know, block posts,

59
00:06:11,680 --> 00:06:12,160
tweets,

60
00:06:16,560 --> 00:06:24,879
piazza posts, photos, perhaps even more sort of sensitive, you know, medical records, medical records,

61
00:06:25,040 --> 00:06:32,639
et cetera. And basically, you know, the application we're running on the site, you know, to

62
00:06:32,639 --> 00:06:37,519
transform, you know, that data from all the different users into something that seems to look

63
00:06:37,519 --> 00:06:41,920
at the way I wear, and basically integrating, for example, the timeline of, you know, many users

64
00:06:41,920 --> 00:06:47,040
into a single timeline presented to the user, you know, organizing the tweets, you know, doing

65
00:06:47,120 --> 00:06:55,280
ups and downs, et cetera, et cetera. And, you know, one sort of distinction feature of this sort

66
00:06:55,280 --> 00:06:59,840
of design is that the application and the data are bundled, you know, they're only the control

67
00:06:59,840 --> 00:07:04,000
of the application site, you know, whether it's Facebook, Twitter, you know, Google or any,

68
00:07:04,000 --> 00:07:08,240
you know, website, and really the interface between the user or sort of the dividing line between

69
00:07:08,240 --> 00:07:19,120
the user, and the website is basically, you know, HTML or UI. The application basically computes,

70
00:07:19,120 --> 00:07:23,439
you know, whatever the user is going to see, and that's going to be displayed inside of the browser.

71
00:07:23,439 --> 00:07:27,120
Of course, the application might actually run inside of the browser, not like, you know,

72
00:07:27,120 --> 00:07:32,000
JavaScript, but as a result, it's not really proven into this particular discussion, you know,

73
00:07:32,000 --> 00:07:36,079
it's still the application, the solution to control of the website, you know, the programmers

74
00:07:36,079 --> 00:07:40,079
with the website, right, the application, and the application basically, you know, manipulates

75
00:07:40,079 --> 00:07:44,560
the DOM, you know, fields from inside of the web browser. And so from the user point of view,

76
00:07:45,199 --> 00:07:50,399
the interaction, the interface, you know, between the dividing interface between the website,

77
00:07:50,399 --> 00:08:00,079
and the browser is still sort of HTML. And so this, you know, this design clearly is

78
00:08:00,079 --> 00:08:06,399
overwhelmingly successful. You know, most websites, you probably, actually, probably all of the websites

79
00:08:06,399 --> 00:08:12,959
you probably use are, you know, following this particular design. And then one reason for,

80
00:08:12,959 --> 00:08:16,399
you know, this very successful design, as we'll talk a little bit more later is, you know, because of

81
00:08:16,399 --> 00:08:20,959
the tight integration between the application and the data from the different users. So the application

82
00:08:20,959 --> 00:08:26,079
is easy access to all users' data from different users, and then greater than the creative and

83
00:08:26,079 --> 00:08:33,519
interesting ways. But there are, you know, it's not completely perfect, you know, this design. And

84
00:08:33,519 --> 00:08:38,559
so there's sort of things that, you know, you might wish could be slightly better. And then

85
00:08:38,559 --> 00:08:43,759
sometimes decentralized applications is a response to those sort of things that are, and it might

86
00:08:43,759 --> 00:08:51,120
be not 100% desirable. So for one, there's a very simple oxidation. You can really not create another

87
00:08:51,120 --> 00:08:56,720
application. So the site decides actually how the app looks like, you know, that's the UI you're

88
00:08:56,720 --> 00:09:04,720
going to get. And which is sort of very different than, let's say, you're running application

89
00:09:04,720 --> 00:09:09,600
doing your laptop, for example, you want to modify and edit a text file, but you get to choose which

90
00:09:09,600 --> 00:09:14,320
browser or editor you're going to use. You know, you can use e-max, you know, then, you know, you can have

91
00:09:14,320 --> 00:09:18,480
a whole kinds of culture wars about which one is better than the other, but you get an option, you

92
00:09:18,639 --> 00:09:23,279
choose which one you want to use. And in this case, you know, that's just not the case. You're using

93
00:09:23,279 --> 00:09:28,480
Gmail, you know, where Gmail is not the best example. The Twitter, you know, Twitter is going to decide

94
00:09:28,480 --> 00:09:33,120
actually how the application is going to look like. The reason why Gmail might not be the best example

95
00:09:33,120 --> 00:09:37,200
is because you can actually download your email, maybe, you know, through IMAP and then run your own

96
00:09:38,159 --> 00:09:43,039
email program. But for many of that, you know, the user and the application data very controlled,

97
00:09:43,039 --> 00:09:50,159
and you have no control over it. The website, you know, may change the rules on who can see

98
00:09:50,159 --> 00:09:55,599
and what data. And you know, my ad actually do it without really telling you. And so you don't

99
00:09:55,599 --> 00:10:00,559
have to have full control over actually who sees your data. Furthermore, you know, the website

100
00:10:00,559 --> 00:10:05,599
actually might use your data to, you know, generate revenue, you know, whatever to site, which ads

101
00:10:05,599 --> 00:10:12,639
actually to display. And you know, basically swooping over your data, right? More in the worst case,

102
00:10:12,639 --> 00:10:18,159
you know, maybe that I believe actually just shoots over your data. And that's really sort of

103
00:10:18,159 --> 00:10:21,519
outside of your control. There's nothing we really can do about it. You're going to get the website

104
00:10:21,519 --> 00:10:30,879
the data that's there now. And so this is sort of the sort of pinpoint, you know, it makes people

105
00:10:30,879 --> 00:10:37,360
wondering, you know, is there a way of designing systems that really not don't follow this, you know,

106
00:10:37,360 --> 00:10:40,560
paradigm, but you know, follow this paradigm of decentralized applications.

107
00:10:55,919 --> 00:11:01,920
And so in this world view, you know, as everybody ever still have our internet, the cloud,

108
00:11:02,879 --> 00:11:09,439
but we have storage providers. And your storage providers are basically nothing really,

109
00:11:11,120 --> 00:11:16,719
you know, sophisticated where you know, really wrong app code, they just purely provide storage,

110
00:11:16,719 --> 00:11:24,159
you know, ways of maybe it's like Google Drive or whatever or Amazon S3, but basically they're sort of

111
00:11:24,159 --> 00:11:31,360
dumb, you know, bit holders. The data may be, you know, and usually probably wants to encrypt the data,

112
00:11:31,360 --> 00:11:35,680
but basically what the real goal here is that the user decides, you know, which storage for

113
00:11:35,680 --> 00:11:40,240
where the data lives and it keeps them into control of the user. So it made a very, you know,

114
00:11:40,240 --> 00:11:48,480
storage writer. S3 might have, you know, users one data. Now that storage provider might actually

115
00:11:48,480 --> 00:11:54,960
have user to use data, or stores, you know, data on behalf of user to use to use users. S3 may actually

116
00:11:54,960 --> 00:11:57,759
encrypt it, you know, so that the storage provider can actually not read it.

117
00:11:58,159 --> 00:12:07,360
And control like who can actually decrypt the data. And then the applications really are in the

118
00:12:07,360 --> 00:12:15,120
control of the user themselves. And so, you know, my user, user here, you want workstation or laptop,

119
00:12:15,120 --> 00:12:23,919
you know, runs in the application. And, you know, there's you two, there's also another application

120
00:12:23,919 --> 00:12:27,599
may actually you're looking at me did the same data, but like a slightly different version of the

121
00:12:27,599 --> 00:12:34,479
application, whatever one photo viewer and another photo viewer. And basically to construct, you know,

122
00:12:34,479 --> 00:12:39,839
the sort of what is actually shown to the user, you know, the application will fetch, you know, data,

123
00:12:39,839 --> 00:12:47,279
you know, from different usage, for example, if you do share the photos with you one, then, you know,

124
00:12:47,279 --> 00:12:54,240
the applications sort of integrate the photos you want into to by extracting or retrieving the

125
00:12:55,279 --> 00:13:00,639
the photos from the different storage providers. And here really about the sort of dividing

126
00:13:00,639 --> 00:13:10,879
line is between users and the dividing line is is really this, there's sort of a dividing line

127
00:13:10,879 --> 00:13:16,639
between the application and the store, so there's a storage API. Perhaps this sort of

128
00:13:16,960 --> 00:13:21,279
uniform because many different applications are going to use the same storage I divide and

129
00:13:21,279 --> 00:13:27,759
maybe use application, you know, creates to do lists, maybe it's a photo list, maybe it's a Twitter

130
00:13:27,759 --> 00:13:32,559
clone that is retrieved the tweets from different users and integrate them and presents them to the

131
00:13:32,559 --> 00:13:39,120
user. And, and it's really that sort of single storage API or that's the, that's the, that's the,

132
00:13:40,080 --> 00:13:45,759
that actually provide, you know, the dividing line between the applications and the data.

133
00:13:46,639 --> 00:13:50,319
Of course, that source API has to be quite general purpose can support multiple applications,

134
00:13:50,319 --> 00:13:54,720
but also has to allow sharing between different application, between different user and different

135
00:13:54,720 --> 00:14:03,039
applications, the modular or the permissions. And so, you know, let's say you wanted to build

136
00:14:04,399 --> 00:14:06,159
sort of a sure yard to do list,

137
00:14:06,639 --> 00:14:18,399
then, you know, between user one and user two, then let's look at this from the perspective of

138
00:14:18,399 --> 00:14:23,600
user one, you know, probably there would be some operation, some sharing operating to use

139
00:14:23,600 --> 00:14:28,159
a two and user one saying like, yeah, you know, here's the names of the might to do list.

140
00:14:29,120 --> 00:14:36,480
And, you know, user one can then download, you know, the user to do list, maybe check, you know,

141
00:14:36,480 --> 00:14:42,559
the signature on the file to do is to verify that data was indeed written by user two. And then,

142
00:14:42,559 --> 00:14:48,559
you know, integrate, you know, that we have its own to do list and, you know, present to user one,

143
00:14:49,279 --> 00:14:53,439
a shared to do list that contains both user ones and user two's to do items.

144
00:14:53,440 --> 00:15:01,040
So, that was sort of the general view of accidentally building these,

145
00:15:02,400 --> 00:15:14,880
these decentralized architecture for applications. Any questions so far?

146
00:15:15,360 --> 00:15:26,480
Okay, so, so, so far we're hopefully received, you know, the address is one of the sort of the

147
00:15:26,480 --> 00:15:31,919
major, you know, pingpoints for the centralized approach that basically the users know,

148
00:15:31,919 --> 00:15:37,439
stay in control of the data. It's not owned by a particular site anymore and the users decide

149
00:15:37,439 --> 00:15:43,919
who, well, which applications and who actually can access the data. I know that's a desirable

150
00:15:45,200 --> 00:15:51,039
property. But, you know, the, the, the, the whole design is also with its, you know, set of challenges.

151
00:15:51,039 --> 00:15:55,759
And so, let me lay out some of them and we'll focus in a few of them in the context of block stack.

152
00:16:01,039 --> 00:16:06,639
And so, there's sort of two, I think, broad categories of challenges. One sort of on the business site,

153
00:16:07,200 --> 00:16:14,240
you know, what is the revenue model? You know, what will, you know, get these applications

154
00:16:14,240 --> 00:16:18,320
actually being adopted and, you know, paid people money to actually develop the applications.

155
00:16:19,759 --> 00:16:26,720
And sort of that actually become really good. And, and, and, and, people are excited by using that.

156
00:16:27,680 --> 00:16:32,560
Well, not really going to, you know, kind of talk about that at all. But in a step, you know,

157
00:16:32,560 --> 00:16:34,399
one emotion focus on the technical challenges.

158
00:16:35,360 --> 00:16:37,360
And so, there's a lot of challenges.

159
00:16:43,360 --> 00:16:50,480
And the, the several of them. One is, you know, so we go back to this picture he before,

160
00:16:51,360 --> 00:16:57,039
you know, the storage API sort of the, you know, key interface. And, you know, the interface has to

161
00:16:57,039 --> 00:17:03,199
be minimal and has to be general purpose enough. But, and typically, it's actually, you know, it's not

162
00:17:03,200 --> 00:17:10,240
the same thing as the API that is sits here. You know, the application and the database.

163
00:17:11,920 --> 00:17:13,920
Let's do that. We'll have a second.

164
00:17:33,200 --> 00:17:35,200
Okay.

165
00:17:41,200 --> 00:17:44,640
Okay. Hopefully everybody has seen screened the watch again. Good.

166
00:17:48,080 --> 00:17:53,360
So, there's a couple of other technical challenges. You know, and what I was going to point out is that that storage API

167
00:17:54,080 --> 00:18:00,000
is typically not as powerful where that file system API is not as powerful as SQL.

168
00:18:00,000 --> 00:18:10,240
Yeah. And, and for the more, you know, not all the data sort of old uses is like handy in a single place that you can run

169
00:18:10,240 --> 00:18:14,960
your arbitrary careers on to integrate it in, you know, whatever application specific managed.

170
00:18:16,079 --> 00:18:22,960
So, that's sort of a challenge that's of application really rely on the power of being able to run arbitrary

171
00:18:22,960 --> 00:18:28,480
queries over all the user data that is in a decentralized application, a little bit hard to achieve because the data is spread out

172
00:18:28,720 --> 00:18:30,720
over maybe, maybe, different storage servers.

173
00:18:32,079 --> 00:18:37,440
There's also features that might be hard to implement. Like, for example, if you want to implement

174
00:18:37,440 --> 00:18:47,519
eBay, then users have to submit sort of bits, but, you know, we want to dumb disclose those bits immediately.

175
00:18:48,079 --> 00:18:54,480
So, there have to be some trusted, you know, aspect to that actually integrates these bits and then decides, you know, actually who's the winner

176
00:18:55,200 --> 00:18:57,360
without, you know, disclosing those bits beforehand.

177
00:18:59,120 --> 00:19:07,120
Similarly, there's a challenge, there's a random management, typically, you know, these decentralized applications, you know,

178
00:19:07,120 --> 00:19:09,120
involve, you know, crypto keys.

179
00:19:11,279 --> 00:19:21,519
And so, there has to be sort of, you know, that's often an Achilles heel, right? And some users lose their private key and then, you know, you can't use your, you can't get to your data anymore.

180
00:19:22,480 --> 00:19:27,039
And, or somebody actually steals your private key and then, you know, they can get your data.

181
00:19:28,000 --> 00:19:33,599
So, there's a sort of a series of technical challenge, you know, to make this actually work.

182
00:19:34,240 --> 00:19:39,039
And one of them, the one remaining one in which it was mostly the topic of this lecture is naming.

183
00:19:43,759 --> 00:19:50,399
And so, these broad set of challenges are basically, I think, you know, challenge for any sort of decentralized application infrastructure.

184
00:19:50,399 --> 00:19:53,759
And certainly also in the context of a block stack.

185
00:19:54,400 --> 00:20:02,079
But in a case of block stack, you know, we're going to mostly, you know, we'll see actually the importance of names and why naming actually is a challenge.

186
00:20:03,359 --> 00:20:06,720
Okay, so before continuing, I want to stop here for a second.

187
00:20:06,720 --> 00:20:17,039
They sort of people time to ask any questions, you know, to contrasting sort of these two different ways of building applications, whether it's, you know, centralized as in the sort of traditional model,

188
00:20:17,039 --> 00:20:20,799
but we're probably all familiar with, you know, or just decentralized model.

189
00:20:22,960 --> 00:20:25,200
So, what's the challenge exactly with BIDS?

190
00:20:26,639 --> 00:20:27,440
So, which challenge?

191
00:20:28,240 --> 00:20:28,960
With BIDS?

192
00:20:30,240 --> 00:20:39,599
Oh, you know, you need an application needs to have access to the user bits, but shouldn't disclose them, right, to other applications.

193
00:20:39,599 --> 00:20:46,639
And so, that means that the application, like, like, I'm you one, I'm submitting a bit.

194
00:20:47,680 --> 00:20:53,200
You know, get a few two's bit, but my applications didn't really disclose you two's bit, meaning to me, because it wouldn't be fair.

195
00:20:54,480 --> 00:21:00,319
And so, how would you do that? So, you need some sort of form form of a trusted party or whatever, some protocol that actually makes that happen.

196
00:21:03,759 --> 00:21:04,159
Thank you.

197
00:21:06,079 --> 00:21:10,879
Please, you know, the application runs on your work, so you can modify the work and the application, right.

198
00:21:11,440 --> 00:21:16,880
Sorry, in the previous slide, I think you mentioned also,

199
00:21:18,640 --> 00:21:22,400
app 1 being different from like the two apps being different.

200
00:21:24,160 --> 00:21:25,920
What do you mean exactly?

201
00:21:25,920 --> 00:21:29,520
Well, look, okay, we just do maintain allergies very crisp, this could be them.

202
00:21:30,560 --> 00:21:37,520
This could be E-Mex, and you want and you too, get the decide which application they're going to use to actually modify their, you know, data, right.

203
00:21:38,480 --> 00:21:49,599
And today, in sort of centralized model, and others not really possible, you know, you can't have basically two Twitter apps, you know, where you were like one way of interacting with the Twitter app, because somebody else likes to do it in a different way.

204
00:21:51,039 --> 00:21:52,240
Let's just do a Twitter app.

205
00:21:53,279 --> 00:21:54,240
I see. Thank you.

206
00:21:56,000 --> 00:22:00,799
I had a question just about like the design of the decentralized app, like model.

207
00:22:00,879 --> 00:22:11,119
Is it necessary for the app to be like on the client side, or could it, you know, could you have like these like the centralized apps on the like internet side.

208
00:22:11,119 --> 00:22:16,799
Yeah, you could have a principle in it, and it's like the key issue, and it doesn't really have to run on the user's workstation,

209
00:22:16,799 --> 00:22:20,000
and if there's going to run anywhere, but it is under the user's control.

210
00:22:21,200 --> 00:22:25,919
Of course, you have somebody who writes it, but the user gets to decide which app to run over what data.

211
00:22:26,880 --> 00:22:27,600
Right.

212
00:22:27,600 --> 00:22:38,000
So the important thing to hear is said, you know, app that you should choose as the app, and like, importantly, the app has access to any storage provider, right.

213
00:22:38,000 --> 00:22:38,480
Yep.

214
00:22:46,400 --> 00:22:47,360
Okay. Any other questions?

215
00:22:47,439 --> 00:22:57,439
Okay. So names. So, and this is getting a little bit more into block stack.

216
00:23:08,079 --> 00:23:12,559
And then let me sort of lay out like the role the names play.

217
00:23:12,960 --> 00:23:18,879
You know, first of all, you know, you have to do list and you want to share that with somebody else, you don't have to be able to name that user from sharing.

218
00:23:19,679 --> 00:23:22,079
And so there's a sort of mapping from name to user.

219
00:23:24,079 --> 00:23:25,039
That's an important role.

220
00:23:26,079 --> 00:23:29,599
There's a mapping sort of name to location of data.

221
00:23:30,000 --> 00:23:41,519
So I have my to do list app, I share, you know, to do list of user one with user two.

222
00:23:41,519 --> 00:23:54,079
And then, you know, I want to actually retrieve user one wants to use a to use data that needs to be away of actually naming users to do list and actually retrieving it.

223
00:23:55,039 --> 00:24:01,519
And then, you know, there's a, simply, there's a name to public key mapping.

224
00:24:02,079 --> 00:24:10,720
You know, when I do, you know, successfully retrieve user to use data, you know, probably want to verify that actually was written by user to you.

225
00:24:11,039 --> 00:24:20,159
And so I'll probably use user to use public key to verify the integrity of the data retrieved because the storage providers might be, you know, can them you untrust it.

226
00:24:20,720 --> 00:24:27,840
And what I require is that I can establish what actually uses to public key is in the right will matter.

227
00:24:29,519 --> 00:24:38,800
And so, you should think about it like in every step of these decentralized applications, you know, a name plays a crucial role.

228
00:24:39,759 --> 00:24:48,160
And the common name given in particular for, you know, the mapping from names to keys, which is a critical piece.

229
00:24:48,400 --> 00:24:51,040
This is to be called a public key infrastructure.

230
00:25:02,320 --> 00:25:07,840
And another, you know, building actually any public key infrastructure is quite challenging.

231
00:25:08,720 --> 00:25:13,519
You know, you might be familiar with like DNS sec, you know, is a particular way of pushing in the world.

232
00:25:13,519 --> 00:25:22,400
Web has a certificate has a whole public key infrastructure curve, us in this example of a public key infrastructure.

233
00:25:22,879 --> 00:25:28,400
And in some ways, with the, you know, the papers that said to do is just build yet another, you know, public key infrastructure.

234
00:25:28,639 --> 00:25:30,319
That is completely decentralized.

235
00:25:36,639 --> 00:25:42,480
And that's sort of the key aspect, you know, this.

236
00:25:42,960 --> 00:25:49,759
What's interesting about this naming scheme in in block stack, you know, that's actually provide to a decent life public key infrastructure.

237
00:25:51,200 --> 00:25:54,240
Let me try to explain a little bit why, you know, this is challenging.

238
00:25:56,160 --> 00:25:56,640
So,

239
00:25:59,039 --> 00:26:01,759
plan sort of paper refers to this in a couple places.

240
00:26:02,000 --> 00:26:04,559
And says, like, you know, there's free aspects that you want.

241
00:26:05,200 --> 00:26:10,319
If you want to sort of general purpose naming infrastructure, you want to be able to have unique names.

242
00:26:12,799 --> 00:26:14,640
To have a unique name for every user.

243
00:26:17,680 --> 00:26:22,640
So that you can identify, you know, the particular John, the particular Joe you're talking about.

244
00:26:25,039 --> 00:26:29,279
You, when human, human readable names.

245
00:26:32,880 --> 00:26:34,079
So that's easy to remember.

246
00:26:35,839 --> 00:26:36,880
And then in this case,

247
00:26:37,840 --> 00:26:41,760
and what blocks that also wants is decentralized.

248
00:26:46,800 --> 00:26:52,320
And you know, the paper, most of it, makes a point that it's easy to get two of the three.

249
00:26:52,320 --> 00:26:55,040
It's very difficult to get all three of them.

250
00:26:55,040 --> 00:27:00,080
And you know, maybe let's look at a couple naming systems to see which two they do you get.

251
00:27:00,320 --> 00:27:02,160
So let's think about like email dresses.

252
00:27:07,120 --> 00:27:08,880
Are they, you need names?

253
00:27:22,320 --> 00:27:23,120
Yes.

254
00:27:23,120 --> 00:27:24,400
Yep. Like a human readable.

255
00:27:25,440 --> 00:27:25,920
Yes.

256
00:27:26,640 --> 00:27:27,600
Are they decentralized?

257
00:27:28,240 --> 00:27:28,720
No.

258
00:27:29,040 --> 00:27:29,280
No.

259
00:27:29,280 --> 00:27:31,440
So these are, these are get two of these guys, correct?

260
00:27:31,440 --> 00:27:32,400
But not the third one.

261
00:27:33,200 --> 00:27:36,320
How about random public keys?

262
00:27:36,320 --> 00:27:41,600
Or maybe like if the paper uses hashish of the file content to actually get a name, correct?

263
00:27:41,600 --> 00:27:43,280
For the, for things.

264
00:27:43,280 --> 00:27:46,480
So basically, okay, so random public keys.

265
00:27:48,000 --> 00:27:51,680
Which I mean, just public keys get the random, but presumably random.

266
00:27:55,200 --> 00:27:56,960
So public keys are they unique?

267
00:27:59,280 --> 00:27:59,519
Yep.

268
00:27:59,519 --> 00:28:00,000
Yeah.

269
00:28:00,000 --> 00:28:00,480
Yeah.

270
00:28:00,799 --> 00:28:01,360
Yep.

271
00:28:01,360 --> 00:28:02,720
Are they a human readable?

272
00:28:03,360 --> 00:28:03,839
No.

273
00:28:03,839 --> 00:28:04,400
No.

274
00:28:04,400 --> 00:28:05,440
Are they decentralized?

275
00:28:06,000 --> 00:28:06,640
Yes.

276
00:28:06,640 --> 00:28:06,880
Yeah.

277
00:28:06,880 --> 00:28:12,160
You can generate them, you know, high probability in a unique manner, completely decentralized, correct?

278
00:28:13,920 --> 00:28:18,400
So I'm talking to you, you should have done that more in last three with these cleric IDs.

279
00:28:18,400 --> 00:28:22,640
So you're, we get like, again, two of the three, but not the human readable one.

280
00:28:23,360 --> 00:28:26,240
Let's see, can we actually get human readable and decentralized?

281
00:28:28,000 --> 00:28:28,960
You think of an example?

282
00:28:30,480 --> 00:28:31,440
Yeah.

283
00:28:34,799 --> 00:28:37,599
Is that like a peer-to-peer file sharing?

284
00:28:39,920 --> 00:28:40,400
Yeah.

285
00:28:40,400 --> 00:28:44,880
It's not whatever's unique, the files, but they're human readable and decentralized.

286
00:28:44,880 --> 00:28:45,839
Yeah, no, think simpler.

287
00:28:47,279 --> 00:28:48,559
You know, think about your phone.

288
00:28:54,160 --> 00:28:57,120
The example, you always use a good one, it's like you contact list.

289
00:29:01,440 --> 00:29:02,640
Yeah.

290
00:29:02,640 --> 00:29:04,880
The names in your contact list are you in remal.

291
00:29:04,880 --> 00:29:11,759
You know, decentralized, you know, you can have John, you know, in the entry for John one phone number.

292
00:29:11,759 --> 00:29:15,519
And I can have another phone number from my John entry.

293
00:29:15,519 --> 00:29:16,720
And they're probably different people.

294
00:29:17,519 --> 00:29:20,960
But, you know, the, you know, I can pick the names in a decentralized manner.

295
00:29:21,680 --> 00:29:23,120
And they're certainly human readable.

296
00:29:23,120 --> 00:29:23,759
Are they unique?

297
00:29:27,360 --> 00:29:28,079
No, right?

298
00:29:28,639 --> 00:29:33,759
Which is like, you have your list of names, I have my list of names and they may actually overlap

299
00:29:33,759 --> 00:29:35,119
and still talk about different people.

300
00:29:36,399 --> 00:29:40,799
So the year, sort of, what the paper is trying to get at that, actually getting too out of the free

301
00:29:41,599 --> 00:29:47,359
is quite common or very easy, but actually getting all free of them is hard.

302
00:29:52,000 --> 00:29:56,559
And the paper says like, well, we actually, we achieve all free of them.

303
00:29:56,720 --> 00:30:00,319
Maybe we get the unique names, we get you in redol and decentralized, right?

304
00:30:02,000 --> 00:30:09,279
And in the way, in some ways, they get this and it is to basically exploit the blockchain.

305
00:30:10,639 --> 00:30:11,200
So the

306
00:30:15,119 --> 00:30:16,319
So block stacks approach.

307
00:30:27,519 --> 00:30:32,319
And really the blood that they, they to be fair, is really not black, black,

308
00:30:32,879 --> 00:30:38,720
black stack superiors is really name coins approach that they sort of adopted.

309
00:30:40,240 --> 00:30:41,599
The basic idea is very simple.

310
00:30:42,720 --> 00:30:46,799
You know, we're going to take advantage of the existence of the Bitcoin block stack with the

311
00:30:46,799 --> 00:30:52,000
Bitcoin blockchain. And of course, you could use any other blockchain, but like, you know,

312
00:30:52,000 --> 00:30:55,519
just for concreteness, you know, we're going to think about the Bitcoin one.

313
00:30:56,000 --> 00:31:02,559
And so here we got our chain, you know, transactions that sit in Bitcoin,

314
00:31:03,920 --> 00:31:09,039
and I'm going to groove over time, you know, my news at new transactions.

315
00:31:09,039 --> 00:31:14,799
And the way we're going to basically create a naming system is we're going to just post

316
00:31:14,799 --> 00:31:18,720
transactions that sort of for different type that basically claim a name.

317
00:31:19,440 --> 00:31:24,000
And so for that ball, you know, we might actually have, you know, so these special transactions.

318
00:31:26,000 --> 00:31:30,400
Every transaction actually turns out in Bitcoin has a metadata field and you can basically

319
00:31:30,400 --> 00:31:36,079
stick anything in the metadata field you want. And so what we're going to stick in there is a name record.

320
00:31:36,639 --> 00:31:39,759
So we're going to have some transaction and then we're going to stick a name record in there.

321
00:31:41,440 --> 00:31:44,799
We'll see you little one in a second, but exactly the details of this name record is,

322
00:31:45,440 --> 00:31:50,480
but in the case of block stack, you know, it's basically a name like 684.

323
00:31:51,440 --> 00:31:55,279
And then, you know, maybe as we see later, a hash of the zone file.

324
00:31:56,960 --> 00:32:04,240
And in the basic rule in the scheme is going to be that the first one,

325
00:32:05,039 --> 00:32:08,880
the first, you know, user, the first name record basically wins.

326
00:32:14,240 --> 00:32:17,039
Right, so there might be a second, you know, somebody else creates, you know,

327
00:32:17,119 --> 00:32:18,480
the name 684 later.

328
00:32:20,000 --> 00:32:22,399
But because you know, the 6.684

329
00:32:24,319 --> 00:32:30,879
shows up later in the Bitcoin blockchain, we're going to basically ignore that one.

330
00:32:31,599 --> 00:32:38,240
And you know, only, you know, consider that the valid name record for 684.

331
00:32:38,240 --> 00:32:42,799
Right. And this completely, you know, plays off, you know, the fact that there is basically

332
00:32:42,799 --> 00:32:48,639
the blockchain is a wall of all the operations ever happened.

333
00:32:49,359 --> 00:32:52,639
They're in order, there's consensus in what order they happened.

334
00:32:53,119 --> 00:32:58,799
And so from that, you know, we've been basically construct, if you will, like a database,

335
00:32:58,799 --> 00:33:01,759
a database with all the names in the world, you know, we just go through the blockchain

336
00:33:01,759 --> 00:33:07,519
from the beginning of time, find all the valid transactions, name transactions,

337
00:33:07,519 --> 00:33:13,440
and use that to construct a database with all the, we've all developed names.

338
00:33:14,160 --> 00:33:19,039
And in some ways, you know, a number of people sort of pointed this out, like, isn't this exactly,

339
00:33:19,039 --> 00:33:23,359
you know, we've been doing like, LaFrie, where, you know, we have a log, like, raft, you know,

340
00:33:23,359 --> 00:33:29,680
provide to log, we stick operations in the log, you know, we run, you know, the operations

341
00:33:30,240 --> 00:33:34,639
and, and that's constructs, you know, a state, you know, where the state in this case would be

342
00:33:34,720 --> 00:33:40,480
a naming database. And there's, you know, I think it's exactly that kind of style in the same idea,

343
00:33:40,480 --> 00:33:43,920
except there's small differences here, right? You know, we're not using graph to get

344
00:33:43,920 --> 00:33:50,880
processes, we're again, we're using Bitcoin or Nakamoto to get Nakamoto consensus to actually achieve

345
00:33:52,240 --> 00:33:58,640
one single blockchain, but in spirit, you know, yes, you know, it's very similar.

346
00:33:58,720 --> 00:34:04,720
Okay, so let's think a little bit about it.

347
00:34:05,920 --> 00:34:11,360
Yeah, our free properties, you know, first of all, you know, do we get unique names?

348
00:34:18,079 --> 00:34:21,599
Yes. Yeah, we get unique names, correct? Because the first one wins.

349
00:34:21,599 --> 00:34:33,279
Is it decentralized? Yes. Yeah, it's decentralized, you know, by sort of virtue of Bitcoin, right?

350
00:34:36,559 --> 00:34:41,440
And the consensus and the log basically makes it sure that we can actually identify what the

351
00:34:41,440 --> 00:34:46,000
first name is so that we can actually pick a unique name. This is human readable.

352
00:34:46,719 --> 00:34:50,480
Can be. Yeah, I get exactly.

353
00:34:53,199 --> 00:34:57,199
Certainly my string 68 to 4 is hopefully unreadable.

354
00:35:02,239 --> 00:35:04,079
Okay, so it seems like it was sort of on the first,

355
00:35:05,280 --> 00:35:10,400
brought, you know, sweep, where it looks like indeed, you know, we got the free properties,

356
00:35:10,400 --> 00:35:14,159
right? A couple of new readable, we got the uniqueness, and we got the decentralized one.

357
00:35:14,879 --> 00:35:20,719
And I think a really name coin was sort of the first naming system demonstrated that

358
00:35:20,719 --> 00:35:26,079
could be achieved in this way. Now, you know, it's not completely perfect, right?

359
00:35:27,519 --> 00:35:31,519
Like, so example, even though we got sort of unique names and the unique readable,

360
00:35:31,519 --> 00:35:36,639
we don't really know like what 68 to 4 really means, correct? I don't know, like you see 68 to 4,

361
00:35:36,639 --> 00:35:43,759
and what does 68 to 4 refer to? It's like a part number, or is it a class number, or anything?

362
00:35:43,760 --> 00:35:47,440
We don't really know like how to interpret names, but you know, this field of unreadable.

363
00:35:47,440 --> 00:35:51,120
So it's not completely perfect. It's not like identifying uniquely some, you know,

364
00:35:51,120 --> 00:35:55,200
user in the world, right? Or even like, you know, whatever you were done,

365
00:35:55,200 --> 00:36:01,280
cash, that doesn't really uniquely identify one person, right? So whenever you see a name,

366
00:36:01,280 --> 00:36:05,120
you're just sort of still the issue of like who it actually really is.

367
00:36:07,520 --> 00:36:13,440
And also, there's sort of a similar, you know, related issue, why it's not completely perfect,

368
00:36:14,160 --> 00:36:20,880
which is like, how do you find somebody's name? And, you know, how do you find actually,

369
00:36:20,880 --> 00:36:26,160
you know, what a cash rich name? Or, and how do you, you know, how do you find that?

370
00:36:26,160 --> 00:36:31,200
I do know which record actually goes with which particular user. So, you know, although, so,

371
00:36:31,200 --> 00:36:35,920
although the system is quite cool because it has these decent,

372
00:36:35,920 --> 00:36:41,120
nice uniqueness and unreadable aspects to it, it's not completely perfect. These are generally

373
00:36:41,119 --> 00:36:46,400
issues with general naming systems, but certainly true here too. So it's not the case that, you know,

374
00:36:46,400 --> 00:36:52,719
we're, you know, we sort of solved all naming problems in one single swoop. We do have, you know,

375
00:36:52,719 --> 00:36:58,799
a good standing position to work with, but you know, it's not a, you know, to complete 100% hit.

376
00:37:01,759 --> 00:37:08,239
But so, yeah, just a question. So, name coin, all they did was add essentially this like record to the,

377
00:37:09,119 --> 00:37:11,759
the like, uh, transaction.

378
00:37:14,000 --> 00:37:16,799
I think we did a little bit more now, correct? I ran the room blockchain,

379
00:37:18,000 --> 00:37:24,559
independent of Bitcoin and, uh, and, and, and use that blockchain, they're purely for naming.

380
00:37:25,759 --> 00:37:30,879
And they had also bunch of rules about, like, you know, how much money, how many name coins

381
00:37:30,879 --> 00:37:36,000
you have to pay to get a particular name and, uh, there's all kinds of other extensions that

382
00:37:36,079 --> 00:37:41,199
I haven't really discussed yet, were mentioned, but they sort of, you know, followed this particular

383
00:37:41,199 --> 00:37:48,719
approach. And we're the first sort of to do so. In the many pragmatic issues, right, that, uh,

384
00:37:48,719 --> 00:37:56,880
the paper touches on, and I haven't mentioned it all yet. Any other questions?

385
00:37:57,360 --> 00:38:09,280
Okay. So, let's actually dive in a little bit on the, sort of, the practical issues,

386
00:38:10,000 --> 00:38:13,920
although there's a slightly different nature than we, we want to be just talked about. It really is, but

387
00:38:15,920 --> 00:38:24,720
how to actually implement, uh, decentralized apps, uh, and the naming system, uh, by leveraging, uh, Bitcoin.

388
00:38:27,599 --> 00:38:48,800
And the, the bunch of, uh, the bunch of, so just, you know, pragmatic issues, uh, there's

389
00:38:48,800 --> 00:38:50,800
limits on the amount of data you can put in a,

390
00:38:53,840 --> 00:39:02,560
on data size in a transaction. So, although maybe it's perfectly fine to have a name, uh,

391
00:39:02,560 --> 00:39:09,760
value, uh, binding into, uh, into the, uh, into a Bitcoin transaction, you know, we can't put like

392
00:39:09,760 --> 00:39:13,680
our to-do list inside of the transaction. And so, you know, we've got to have some plan,

393
00:39:14,400 --> 00:39:17,600
uh, for actually how that, you know, part is going to work out.

394
00:39:18,800 --> 00:39:24,560
It has slower rights. So, you know, from the last lecture, you know, it takes a while, you know,

395
00:39:24,560 --> 00:39:29,920
for rights actually, uh, were transactions to propagate. And, uh, before they, uh,

396
00:39:29,920 --> 00:39:34,480
presented to be, uh, really stable, like, cannot be, uh, forked off anymore. You know, we,

397
00:39:34,480 --> 00:39:39,360
when we were talking about, like, you know, four, five, six, uh, blocks later in the chain, you know,

398
00:39:39,360 --> 00:39:44,160
and you block us ten minutes, so, you know, an hour later, right? Uh, and so, this is really not so

399
00:39:44,159 --> 00:39:49,920
cool if you're sticker, uh, to-do list inside of the, uh, blockchain two, uh, because, you know, I

400
00:39:49,920 --> 00:39:54,879
will modify my blockchain, I'll modify my to-do list, and I'll, like, an hour later, maybe actually observe it.

401
00:39:54,879 --> 00:39:59,359
So, that seems not so good, and you want to go through more aggressive applications where, like,

402
00:39:59,359 --> 00:40:05,199
there's much more data that's manipulated, you know, we certainly, uh, a problem, you know, and, uh,

403
00:40:05,199 --> 00:40:09,119
and similarly, you know, in addition to slow rights, you know, there's also a low, low, low throughput,

404
00:40:09,119 --> 00:40:10,719
low bandwidth.

405
00:40:15,679 --> 00:40:17,599
In the numerous, there's only a few transactions.

406
00:40:19,519 --> 00:40:23,679
For seconds, correct? So, we're going to do a lot of rights, you know, through file, uh,

407
00:40:23,679 --> 00:40:28,559
at many times, even though we're also going running the, uh, the, the file operations through

408
00:40:28,559 --> 00:40:33,519
the blockchain. So, uh, so clearly, you know, you know, we got to be a little bit, if we want to really

409
00:40:33,519 --> 00:40:39,519
build a general purpose, uh, infrastructure for, uh, uh, decentralized applications, you know,

410
00:40:39,519 --> 00:40:45,119
there needs to be a more complete story that actually allows us to get, like, uh, fast rights,

411
00:40:45,119 --> 00:40:49,840
you know, high bandwidth rights, uh, and it gets us around, and, you know, basically, not running

412
00:40:49,840 --> 00:40:54,719
everything through the blockchain. The paper also talked about one other final problem, the ledger,

413
00:40:54,719 --> 00:41:00,079
ever-grown ledger, uh, and, uh, I'm not going to actually spend much time, I'm talking about

414
00:41:00,079 --> 00:41:04,239
that at all, uh, but that's clearly an also an issue that you wanted to, and, and, and, and,

415
00:41:04,239 --> 00:41:07,840
and you know, say, that you're putting the paper, you're, you're going to boot up, uh, block stack nodes,

416
00:41:08,480 --> 00:41:12,319
uh, if you do a sort of, uh, and the traditional sort of Bitcoin style, where, you know,

417
00:41:12,319 --> 00:41:15,920
you're going to run through all the Trekkings, there's actually one by one that will take a while before

418
00:41:15,920 --> 00:41:20,319
you actually have build up a complete naming record. And, in particular, in the case of block stackers,

419
00:41:20,319 --> 00:41:24,079
it's a little bit annoying because a lot of the transactions that are in the blockchain are

420
00:41:24,079 --> 00:41:28,079
completely in a relative to block stack. Right? There, uh, there are a lot of transactions for

421
00:41:28,079 --> 00:41:33,440
completing some different purpose, uh, and have nothing to do with, uh, the block stack, uh, approach,

422
00:41:33,440 --> 00:41:38,079
but, you know, block stack, if you really literally were using, uh, the Bitcoin blockchain, as you

423
00:41:38,079 --> 00:41:41,360
were following the main thing, you know, you would have to go through and interpret and over the M and C,

424
00:41:41,360 --> 00:41:47,679
which ones actually need to reply. Okay, so, I'm going to focus more on sort of these, these,

425
00:41:47,679 --> 00:41:52,719
the first couple, uh, challenges, which is like, you know, basically what we want to do is like,

426
00:41:52,719 --> 00:41:59,199
minimize the use of the, uh, blockchain, uh, yeah, so that we can, I know we actually get high,

427
00:41:59,199 --> 00:42:05,679
you know, like the ones right, so we're in decent bandwidth. Does that make sense?

428
00:42:11,359 --> 00:42:16,799
Good, and that sort of gets us to the core of the paper, uh, which is like, uh, the,

429
00:42:17,760 --> 00:42:20,560
we can pull up that diagram so we can look at it,

430
00:42:23,200 --> 00:42:28,720
and that's basically this diagram. And that sort of describes, you know, the general approach, uh,

431
00:42:28,720 --> 00:42:33,440
that, uh, the paper takes through the drastically, you know, the challenges that I just laid out

432
00:42:33,440 --> 00:42:42,160
on the previous board. Okay, so these are a complicated picture, and so let's go,

433
00:42:42,239 --> 00:42:45,599
sort of later by layer, we'll try to understand actually how things work.

434
00:42:50,399 --> 00:42:56,639
So at the, at the bottom, you know, is the, is the Bitcoin chain?

435
00:43:02,079 --> 00:43:07,920
Uh, and in the Bitcoin chain, there are lots and lots of transactions, and, uh, many of these

436
00:43:07,920 --> 00:43:13,840
transactions have absolutely nothing to do with, uh, the block stack, and the block stack,

437
00:43:19,280 --> 00:43:23,200
and the block stack transactions are sort of sort of sitting in, you know, a particular

438
00:43:23,200 --> 00:43:29,680
block in the blockchain. And then there's sort of the second layer, which is really the block stack

439
00:43:29,680 --> 00:43:35,440
notes that basically read all these transactions, that fish out the ones that are actually

440
00:43:35,440 --> 00:43:42,320
related to, uh, block stack interpret, you know, those operations and, you know, build up, uh,

441
00:43:42,320 --> 00:43:47,119
a block stack database with names to, uh, what turns out to be zone file hashers.

442
00:43:47,840 --> 00:43:52,720
So we look at these operations, what, and what's in there? So in every, uh, Bitcoin

443
00:43:52,720 --> 00:43:56,559
connection, as I mentioned earlier, you can have some metadata that sits in the, what's called

444
00:43:56,559 --> 00:44:02,320
the op, in the score return field. And in that op, on the score return field, uh, there is basically,

445
00:44:02,320 --> 00:44:10,240
uh, a, a, a name, say X, uh, plus, you know, the hash of zone file.

446
00:44:16,000 --> 00:44:21,920
And that's sort of the binding that sits in Bitcoin, and that, you know, basically block stack,

447
00:44:21,920 --> 00:44:27,200
which uses, uh, Bitcoin to basically make that binding from hand, from name to a zone file,

448
00:44:27,679 --> 00:44:38,559
uh, unique, uh, uh, uh, uh, in a decentralized manner. So as, you know, like in Latvry, or in any other,

449
00:44:38,559 --> 00:44:47,599
sort of logging system, uh, the, these, block stack nodes interpret these, uh, particular, uh, name,

450
00:44:47,599 --> 00:44:53,199
uh, transactions. Look at the op field, uh, see that this op field is for example to create a

451
00:44:53,199 --> 00:44:59,759
particular name, and basically store it in the database, the, you know, the, the, the binding from

452
00:44:59,759 --> 00:45:05,439
name, X, you know, to the hash of the zone file. And, you know, once a while, as you'll see,

453
00:45:05,439 --> 00:45:10,399
the second user may want to update the zone file. And so you might see multiple transactions for

454
00:45:10,399 --> 00:45:16,960
the same, uh, user, uh, updating basically the hash of the zone file. Of course, we want to minimize,

455
00:45:16,960 --> 00:45:22,079
you know, these, uh, changes because you know, every change, you know, through the, uh, would require,

456
00:45:23,440 --> 00:45:28,800
would require a modification, or posting a Bitcoin transaction, uh, and, you know, for many reasons

457
00:45:28,800 --> 00:45:32,320
that are on the previous slide, that's slow, which we like to try to avoid it, for the more, then it will

458
00:45:32,320 --> 00:45:36,720
cost a little bit of money. Uh, I mean, because these transactions, they actually need to be processed.

459
00:45:38,400 --> 00:45:45,840
And so, um, uh, so, uh, so the basic plan, so this, this, this, this, this, this node layer,

460
00:45:45,840 --> 00:45:52,079
this, the virtual chain layer basically builds this database of mappings for a name to hash zone file.

461
00:45:52,880 --> 00:45:58,400
Uh, yeah, of course, also filters out all the, uh, transactions that are invalid, or like, you know,

462
00:45:58,400 --> 00:46:06,079
a new access that being created after the first one. Uh, and then, uh, using the hash of the zone file,

463
00:46:06,079 --> 00:46:13,440
you know, which we got, uh, it locates, uh, an application can locate, um, the zone file.

464
00:46:13,440 --> 00:46:18,240
And the zone file can come out from anywhere, uh, and because we have to hash with the zone file,

465
00:46:18,240 --> 00:46:22,320
when we retrieve a file that claims to be the zone file, we can re-compute the hash,

466
00:46:22,320 --> 00:46:27,119
if the hash is identical to the one that we got sort of through, uh, indirectly through Bitcoin,

467
00:46:27,119 --> 00:46:31,280
then we know for sure that that is the, the zone file that goes with x.

468
00:46:33,280 --> 00:46:38,960
And so, okay, what is that in, uh, the zone files? Well, in, in the zone file is,

469
00:46:38,960 --> 00:46:45,039
maybe sort of, and yet another table, if you will, both mapping names, uh, to URIs. So,

470
00:46:45,039 --> 00:46:49,840
from sample, you know, you might have a zone file, which has, you know, like, maybe for the to-do app,

471
00:46:50,480 --> 00:46:55,280
that's an entry to-do, and, you know, it up points to a URI.

472
00:46:56,880 --> 00:47:00,000
Uh, we're actually the data is located for, you know, to, to-do list.

473
00:47:01,039 --> 00:47:06,480
Um, and, you know, there's sort of two types of zone files. One is what they're called immutable,

474
00:47:06,480 --> 00:47:11,519
and one is demutable. Demutable ones have URI plus a, a public key.

475
00:47:15,280 --> 00:47:22,079
So, uh, and this is a public key, you know, is the key to actually validate, uh, where the,

476
00:47:22,079 --> 00:47:25,519
whether the file was written by the user x. So, basically the user x, you know,

477
00:47:25,519 --> 00:47:32,400
publishes through the zone file a public key for him or herself. And later on, uh, when, you know,

478
00:47:32,400 --> 00:47:36,960
user 2 wants to look at user x, you know, it gets the hash of the zone file, the hash of,

479
00:47:36,960 --> 00:47:42,639
finds the zone file, double checks the to-zone file, you know, uh, hashes to the right value,

480
00:47:42,639 --> 00:47:49,680
looks as inside the, the, the zone file, finds the, you know, the public key of x, and, you know,

481
00:47:49,680 --> 00:47:58,079
the URI, you know, for the to-do file, uh, uses the URI to fetch, uh, the actual to-do file, uh, check,

482
00:47:58,079 --> 00:48:02,559
you know, the signature on the retreat file with the public key, and if it all checks out, then

483
00:48:02,559 --> 00:48:11,039
basically user 2 knows, you know, okay, I got, you know, user x, uh, zone file. And then it might be

484
00:48:11,039 --> 00:48:16,639
also like other names in this zone file, like whatever, you know, users to- you access tweets,

485
00:48:17,920 --> 00:48:22,480
et cetera, timeline, what, you know, for every application, there's probably an entry, and, you

486
00:48:22,480 --> 00:48:26,480
know, probably the applications sort of agree on like, you know, what name to use for a particular

487
00:48:26,480 --> 00:48:34,079
application. Um, so don't we lose the like data, your ability, guarantees where like, it's

488
00:48:34,079 --> 00:48:38,159
possible this data could be deleted, and then you wouldn't have the hash and data could just be lost.

489
00:48:38,880 --> 00:48:41,599
So it's, you mean like the, the zone file can get lost?

490
00:48:42,559 --> 00:48:46,719
Right, like, like with the chain, you can't lose data because it'll be replicated enough places

491
00:48:46,719 --> 00:48:50,159
but here, it's not gonna have a guarantee rate. Good, good, good. So, so, so, sometimes after zone

492
00:48:50,159 --> 00:48:54,159
files also replicated widely on the, basically, there's a course in a walkstack node to

493
00:48:54,159 --> 00:48:59,199
dole replicated, uh, the zone files are everybody. Um, and, uh, and then they're, they're,

494
00:48:59,199 --> 00:49:03,199
apparently, their zone files are a reasonable small like for, uh, for kilobytes or something in that

495
00:49:03,199 --> 00:49:09,119
order. And so they can be replicated everywhere, okay? Then for the, to do for a list,

496
00:49:09,119 --> 00:49:15,679
right, the, to do file, the UI, uh, the basic idea is that, you know, you might store the same data

497
00:49:15,679 --> 00:49:20,079
or, and multiple providers. So, example, you might want to have like, you replicated it as free,

498
00:49:20,719 --> 00:49:28,799
and maybe, you know, you also stick it in Google direct. And, uh, one reason that actually blocks

499
00:49:28,799 --> 00:49:33,759
that has storage, uh, service is not because actually they store the data, but basically,

500
00:49:33,759 --> 00:49:36,960
provide a uniform API to all these different storage providers.

501
00:49:43,199 --> 00:49:46,559
Okay, so there's, does that make sense?

502
00:49:50,400 --> 00:49:54,239
Okay, so then there's a, uh, there's a, there's a mention zone files in two ways.

503
00:49:54,239 --> 00:49:58,719
Uh, there's another, which is a called immutable storage, and that actually contains, you know,

504
00:49:58,719 --> 00:50:06,880
the URI, the name, URI, um, pop the key,

505
00:50:10,159 --> 00:50:18,719
and the hash of the data, with the file. And so you can basically verify, you know,

506
00:50:18,719 --> 00:50:24,799
is this indeed the latest version of the, uh, the file, uh, because in this scheme, you get to

507
00:50:24,799 --> 00:50:30,000
update, you know, X can update the file, but it's hard to tell, uh, for user two, whether that is

508
00:50:30,000 --> 00:50:33,919
actually the latest version, uh, the paper mentions that they're, you know, you probably want to stick

509
00:50:33,919 --> 00:50:37,919
version numbers in it. Uh, but if you really want to guarantee to be sort of the latest version for

510
00:50:37,919 --> 00:50:43,439
a particular name, uh, in a huge immutable storage, you know, then, uh, the mutable storage contains

511
00:50:43,440 --> 00:50:48,960
the hash of the file, and uh, that uniquely identifies a particular version of the paper data file.

512
00:50:49,599 --> 00:50:56,320
That does mean, like, if you update, you know, this record, then, uh, that really means you update the

513
00:50:56,320 --> 00:51:02,800
zone file, so that means you have to republish or recreate a log entry in the Bitcoin chain,

514
00:51:03,440 --> 00:51:07,440
mapping, you know, X to a new hash, uh, hash zone file.

515
00:51:07,440 --> 00:51:18,000
Okay, so this is sort of the overall picture, uh, for the, uh, for the system, and as you can see,

516
00:51:18,000 --> 00:51:24,880
you know, uh, particularly like, you know, in this to-do list site, uh, you know, the user, uh, X can

517
00:51:24,880 --> 00:51:32,000
actually update, uh, it's, uh, uh, he's a, uh, to the list, uh, without actually having to publish a

518
00:51:32,079 --> 00:51:38,079
new record in the, uh, in the Bitcoin chain. In fact, you know, the only thing that really has to be

519
00:51:38,079 --> 00:51:43,920
created in the Bitcoin chain is just, you know, X's name, uh, and X of course might have many other names

520
00:51:43,920 --> 00:51:51,199
that are sitting in the zone files, uh, in, uh, in, uh, but, you know, the, the, the, the, the, the,

521
00:51:51,920 --> 00:51:56,800
the system doesn't rely on, uh, for every operation on, uh, on the blockchain.

522
00:51:56,800 --> 00:52:02,480
And what you get is what, around, it gets us around a lot of these problems of, you know, flow rights,

523
00:52:02,480 --> 00:52:09,280
long bandwidth, uh, in the limits on the, uh, and the limits on the, uh, on the data that actually appear

524
00:52:09,280 --> 00:52:13,280
in a transaction record, because the only data really has to appear in this transaction record

525
00:52:13,280 --> 00:52:15,680
is this name, Blasch the hash of this zone file.

526
00:52:19,920 --> 00:52:23,519
I said, uh, how again do we find this zone file if you only have the hash?

527
00:52:24,320 --> 00:52:29,280
Huh, it's a very good question. We don't really care. Uh, where it comes from. And so in fact,

528
00:52:29,280 --> 00:52:33,519
you know, they call this the routing layer, right? This, basically the, you tell the learning writer,

529
00:52:33,519 --> 00:52:41,360
hey, I'm looking for a file that has the following hash. And then the routing layer, uh, has to produce

530
00:52:41,360 --> 00:52:45,920
that file and you can check whether you got the right file by recomputing the hash and see if it

531
00:52:45,920 --> 00:52:47,679
matches the one that you're asking for.

532
00:52:53,599 --> 00:52:59,519
Any other questions about this?

533
00:53:05,199 --> 00:53:11,360
So sorry, just to clarify, um, operations within this file storage or the zone files

534
00:53:11,360 --> 00:53:18,719
that's still limited by the underlying blockchain though, right? Uh, yes and no. Uh, what are you thinking?

535
00:53:18,879 --> 00:53:27,839
Or just like, because modifications or changes to like the file would need it like a new hash and

536
00:53:27,839 --> 00:53:33,599
therefore a new log entry within the blockchain. So you still have to wait for that to be

537
00:53:33,599 --> 00:53:39,279
couldn't co-accepted, which is like an hour, right? Yeah, although absolutely true. So when you

538
00:53:39,279 --> 00:53:44,879
make a change to the zone file, you know, that, that has to run through the TXN. But for example,

539
00:53:44,880 --> 00:53:49,920
updating the to-do list, uh, wouldn't have to require a big conscious action.

540
00:53:53,680 --> 00:53:56,960
You know, really update the zone file at all, you know, you're just, you know,

541
00:53:56,960 --> 00:54:02,720
updating the to-do list file and the zone file only contains the name to do and the URI plus

542
00:54:02,720 --> 00:54:11,599
the public key, but you're not updating any of those. I see, but doesn't, then we store also the hash

543
00:54:11,599 --> 00:54:15,839
of the file. So if we change the content, that's, that's not only, okay, there are two cases for

544
00:54:15,839 --> 00:54:22,639
the mutable, there's the mutable storage and the immutable storage. And uh, what they, uh,

545
00:54:22,639 --> 00:54:26,319
propose is that for immutable storage and like storage that you don't update, you can actually

546
00:54:26,319 --> 00:54:30,239
stick the hash of the file in there. Uh, but for mutable storage, you know, that's just going to see a

547
00:54:30,239 --> 00:54:34,000
lot of rights, you know, you shouldn't do that. You should use this scheme.

548
00:54:36,880 --> 00:54:41,360
I see. And then how's it possible to validate with mutable storage that you're getting the right

549
00:54:41,360 --> 00:54:46,960
data then? Yeah, so the presumably, uh, that's a very good question. Uh, well, you, you can validate whether

550
00:54:46,960 --> 00:54:51,120
you actually got data that actually was produced by X because you have to public key for X and you

551
00:54:51,120 --> 00:54:56,400
can verify whether it actually the signature on the to-do file, indeed, you know, checks out with the

552
00:54:56,400 --> 00:55:02,000
public key of X. So you least know that X has written it. Uh, you may not know of this most region

553
00:55:02,000 --> 00:55:07,120
version. And so the papers sort of, uh, doesn't really talk about these in great detail, but basically

554
00:55:07,519 --> 00:55:12,159
you probably have to stick version numbers in it. And so you least you can detect rollback,

555
00:55:13,199 --> 00:55:19,119
but there's a little bit of a, actually, I don't know how to, how to actually, uh, you can't

556
00:55:19,119 --> 00:55:24,480
really ensure that you actually got the latest version. But so where are the modifications to mutable

557
00:55:24,480 --> 00:55:30,400
storage coming into? Uh, you have to do file lives here, like in the, like, here's my to-do file.

558
00:55:32,079 --> 00:55:36,239
And if an application did my to-do list application wants to update to the to-do file,

559
00:55:36,239 --> 00:55:42,799
you just go to heaven does it. And, uh, and then signs it, you know, using the public key and sticks it in,

560
00:55:43,439 --> 00:55:49,199
uh, the, uh, and sticks it in for, uh, for to give you a ride.

561
00:55:50,319 --> 00:55:55,919
And would that be done through the, the routing layer as well? Because you want to find where

562
00:55:55,919 --> 00:56:02,719
in the storage? Yeah, so the usual two will retrieve, uh, X's zone file, correct? And once it has

563
00:56:02,719 --> 00:56:09,759
X's zone file, it knows where, uh, the file, the to-do file list because there's the URI sits in the zone file.

564
00:56:12,559 --> 00:56:17,039
And so again, and that could retrieve it and, uh, check the signature.

565
00:56:18,239 --> 00:56:26,159
About the URI order, is it only one URI per, uh, name in the zone file or, um,

566
00:56:26,239 --> 00:56:34,399
I don't know, uh, uh, unclear exactly how to work. Uh, I'm sorry, I'm not, you know, I didn't look, check out the source code and

567
00:56:34,399 --> 00:56:37,359
like look at the, uh, the form of the zone files.

568
00:56:42,480 --> 00:56:49,279
Uh, since we're publishing the public key together with the rest of the data in the zone file,

569
00:56:49,280 --> 00:56:57,920
doesn't mean I can just make up a private key, make a matching public key and just stick

570
00:56:57,920 --> 00:57:05,920
something in there and say, I'm user Z because I'm, because they to provide the public key, so

571
00:57:05,920 --> 00:57:13,600
can I not just lie? Well, you can't falsify the zone file, correct? Because the zone file, the hash of

572
00:57:13,599 --> 00:57:16,639
the zone file must match the hash that sits in the blockchain.

573
00:57:23,920 --> 00:57:31,199
So only the, uh, person that actually entered the blockchain record mapping x, you know,

574
00:57:31,199 --> 00:57:35,599
to that hash zone file, only that person could have reduced, you know, that zone file.

575
00:57:37,679 --> 00:57:39,279
I see. Thank you.

576
00:57:44,079 --> 00:57:51,599
Okay. Well, so this is basically the big picture and if you got this is the, uh, if you got this part,

577
00:57:51,599 --> 00:57:57,519
then usually the rest of the sort of details, uh, important, but maybe less important.

578
00:57:58,079 --> 00:58:05,360
This is the key thing to understand. Okay. Um, I guess a couple things I want to go over,

579
00:58:05,360 --> 00:58:08,799
particularly I want to talk a little bit more about name creation because there's a couple

580
00:58:08,800 --> 00:58:10,640
little details that actually interesting.

581
00:58:19,200 --> 00:58:25,200
So it turns out the name creation actually has two, uh, parts to it.

582
00:58:25,200 --> 00:58:28,720
Uh, the first of all, the user needs a half course on the bitcoins because you got to pay.

583
00:58:28,719 --> 00:58:42,159
The reason you have to have some bitcoins is because you got to convince, uh, one of the,

584
00:58:42,159 --> 00:58:46,000
uh, miners directly include your transaction in the Bitcoin ledger.

585
00:58:46,000 --> 00:58:50,959
And so it turns out there are sort of two transactions for every name that you create.

586
00:58:50,960 --> 00:58:59,360
And one is, uh, basically a pre-order transaction.

587
00:59:02,240 --> 00:59:07,039
And in the pre-order transaction, you don't really list the name, but actually the hash of the name.

588
00:59:11,760 --> 00:59:15,519
So anybody who sees the pre-order transaction doesn't know what the name is, but, you know,

589
00:59:16,079 --> 00:59:17,599
doesn't know what the hash of the name is.

590
00:59:18,159 --> 00:59:21,679
And then there's the second transaction we really register the name.

591
00:59:24,320 --> 00:59:27,519
And if that basically contains the actual name,

592
00:59:28,960 --> 00:59:33,119
yeah, where for which we first published the hash and the hash of the zone file.

593
00:59:33,440 --> 00:59:45,359
And, um, so why, why, why is this done?

594
00:59:45,359 --> 00:59:47,759
And this is actually something that, uh, name coin did.

595
00:59:48,400 --> 00:59:49,920
Uh, and they adopted it from name coin.

596
00:59:49,920 --> 00:59:51,199
Yeah, why do it in this way?

597
00:59:54,319 --> 00:59:59,199
Because if you directly announce the name, then someone else can raise you and, uh,

598
00:59:59,199 --> 01:00:02,400
try to register that name before you.

599
01:00:02,400 --> 01:00:04,000
Yeah, this is a common problem.

600
01:00:04,000 --> 01:00:05,680
It's called the front-runner problem, right?

601
01:00:06,480 --> 01:00:06,800
Uh,

602
01:00:09,360 --> 01:00:10,559
oops, there we go again.

603
01:00:10,559 --> 01:00:11,360
Sorry.

604
01:00:33,360 --> 01:00:37,519
So the front-runner problem is exactly described.

605
01:00:37,519 --> 01:00:40,400
Now, let's say, you know, you're trying to register at Google.com.

606
01:00:40,960 --> 01:00:43,519
And, uh, somebody sees you doing that.

607
01:00:43,519 --> 01:00:44,960
And of course, you submit it to transaction.

608
01:00:44,960 --> 01:00:46,400
It's not in the blockchain yet.

609
01:00:46,960 --> 01:00:49,200
For example, a minor might actually see you, there were, you know,

610
01:00:49,200 --> 01:00:52,559
somebody else that actually sits in the, the big point network.

611
01:00:52,559 --> 01:00:55,440
And just like, oh, hi, I'm going to run ahead and try to get my transaction

612
01:00:55,440 --> 01:01:00,800
that claiming their, uh, Google.com, uh, into the big point before you.

613
01:01:00,880 --> 01:01:03,360
And then I own Google.com.

614
01:01:03,360 --> 01:01:08,400
And so to avoid that problem, uh, you first actually have to enter the hash into the

615
01:01:08,400 --> 01:01:15,760
Bitcoin chain, uh, then you wait a while to make sure that, uh, that, that record sits in the

616
01:01:15,760 --> 01:01:18,160
Bitcoin, uh, blockchain, right?

617
01:01:18,160 --> 01:01:20,560
You have six, whatever, 10 walks.

618
01:01:20,560 --> 01:01:24,640
And then after that, you sure that like, you know, the sort of, you, the burn the name in the,

619
01:01:25,360 --> 01:01:27,280
what's they call in the blockchain.

620
01:01:28,080 --> 01:01:30,240
That point you actually do the actual registration of the name.

621
01:01:31,680 --> 01:01:33,120
I got a question regarding that.

622
01:01:34,080 --> 01:01:34,240
Yeah.

623
01:01:35,120 --> 01:01:39,040
So what, why is it not possible for an attacker to say,

624
01:01:39,040 --> 01:01:41,840
pre-comput internally, the hash of Google.com.

625
01:01:41,840 --> 01:01:46,080
And then look through the blockchain and see if someone posted a hash of Google.

626
01:01:46,080 --> 01:01:47,600
Yeah, yeah, yeah, yeah, yeah, absolutely.

627
01:01:47,600 --> 01:01:50,880
So, uh, presumably, you know, there's a slightly more sophisticated than this,

628
01:01:50,880 --> 01:01:52,320
you know, just purely the hash.

629
01:01:52,320 --> 01:01:54,240
There's presumably a bunch of other arguments that go into it,

630
01:01:54,240 --> 01:01:55,360
including the nonsense or something.

631
01:01:58,240 --> 01:01:59,920
Otherwise, you could just make a dictionary, correct?

632
01:02:06,720 --> 01:02:10,000
And in some ways, this is like really not their adventure, but it's just, uh,

633
01:02:10,000 --> 01:02:12,000
you know, as I said before, came out of, uh,

634
01:02:13,920 --> 01:02:16,320
uh, came out of, uh, uh, name point.

635
01:02:22,880 --> 01:02:23,280
Okay.

636
01:02:23,280 --> 01:02:26,480
Um, so let's, you know, go back to, uh,

637
01:02:27,280 --> 01:02:30,160
you know, the sort of collaborative apps or, you know, collaborative,

638
01:02:35,120 --> 01:02:37,840
collaborative, uh, decentralized applications.

639
01:02:46,240 --> 01:02:49,920
Um, so it would just go back to our to-do list as an example.

640
01:02:50,880 --> 01:02:54,240
Uh, and just to see, you know, how it really would work, uh, you know,

641
01:02:54,240 --> 01:02:56,080
sort of sketch out again how it would work.

642
01:02:56,719 --> 01:03:00,239
Uh, so basically, you know, with two users, correct, you know, running, you know,

643
01:03:00,239 --> 01:03:01,279
the to-do list app.

644
01:03:05,759 --> 01:03:08,000
Well, if you won, you know, with YouTube.

645
01:03:14,400 --> 01:03:17,279
And they basically exchanged, you know, some information with each other.

646
01:03:17,279 --> 01:03:21,440
They're basically saying, uh, in some way, your one has learned about YouTube's name,

647
01:03:21,440 --> 01:03:23,279
and YouTube has learned about the one's name.

648
01:03:24,160 --> 01:03:27,760
And then sort of that, that step, of course, has to happen.

649
01:03:27,760 --> 01:03:29,200
It has to happen securely.

650
01:03:29,200 --> 01:03:33,200
And in a sense that you want to really need to know that that actually is YouTube's name.

651
01:03:33,200 --> 01:03:39,360
Then they can, YouTube one, or, uh, you want to can look up YouTube's name.

652
01:03:42,800 --> 01:03:44,560
You know, get the zone file from that.

653
01:03:47,200 --> 01:03:50,880
Like, find the entry for say, the to-do list in the zone file.

654
01:03:54,240 --> 01:03:57,280
Uh, get a zone file also contains, you know, and the public key.

655
01:04:00,560 --> 01:04:03,519
And it just might be not like, you know, YouTube might have many

656
01:04:03,519 --> 01:04:07,920
public keys, uh, private keys, uh, because you probably don't want to have like one master

657
01:04:07,920 --> 01:04:11,440
private key that you use for everything because you use that one, one master

658
01:04:11,440 --> 01:04:13,840
private key or somebody still, it's, you know, you're in that shape.

659
01:04:14,320 --> 01:04:18,080
And so typically, I think in the block, in the block stack, there's sort of a

660
01:04:18,080 --> 01:04:19,600
public private key per application.

661
01:04:20,559 --> 01:04:24,719
So, you know, the, you want basically, you can get to has YouTube's name,

662
01:04:24,719 --> 01:04:29,199
looks up the zone file, that's a to-do list, the public key, uh, and the URI.

663
01:04:31,360 --> 01:04:37,440
You know, through the block stack file system, which attracts away the different storage providers,

664
01:04:37,440 --> 01:04:41,839
you know, and actually, the retrieves, you know, the actual name, uh, the actual file.

665
01:04:43,839 --> 01:04:48,719
You know, checks the signal here on the file, maybe version no merge, uh, and, uh, and then,

666
01:04:48,719 --> 01:04:54,480
basically, use that to construct, you know, the, the, the, to-do list, uh, from YouTube and

667
01:04:54,480 --> 01:04:58,319
worked out with you once. And similarly, you know, you basically YouTube is the exactly the same

668
01:04:58,319 --> 01:05:05,359
way I think, you know, and as you once name, and room and goes off, and, uh, you know, retrieves,

669
01:05:05,359 --> 01:05:10,959
you use one, you, you want to do list, and, you know, that way they can, uh, have a collaborative,

670
01:05:12,239 --> 01:05:18,639
application. And so, for example, when YouTube updates, uh, it's file, then, uh, you know,

671
01:05:18,639 --> 01:05:23,599
periodically, you once ask, you know, uh, go, and retrieve the new, uh,

672
01:05:23,599 --> 01:05:26,719
retrieve the, the, the to-do list, and just use it in the new updates.

673
01:05:30,799 --> 01:05:31,679
Does that sort of make sense?

674
01:05:34,639 --> 01:05:39,119
And you see here, I think there's like one of these, the central points with the central applications,

675
01:05:40,000 --> 01:05:44,960
uh, is these applications are building, you know, there's quite a different way than, uh,

676
01:05:44,960 --> 01:05:48,239
the ones that we're talking about very early on, correct? I think we go back to this picture,

677
01:05:48,719 --> 01:05:54,960
of the centralized, uh, site that we're building, uh, to-do list application, correct? But in the

678
01:05:54,960 --> 01:06:03,759
database, yeah, there would be your ones to do list, and you choose to do list,

679
01:06:08,559 --> 01:06:12,159
and yeah, you know, like the to-do list app, you know, basically, you know,

680
01:06:12,159 --> 01:06:16,719
retrieve these, uh, the content of these, uh, to-do list, we have the simple SQL SQL query,

681
01:06:17,039 --> 01:06:19,519
and, you know, push them together and actually present them through the user.

682
01:06:20,159 --> 01:06:24,959
And we see that like in this decentralized, you know, scheme, you know, it's quite a lot more mechanism

683
01:06:24,959 --> 01:06:29,359
involved that actually make this happen, and, uh, in the program, it doesn't really have to,

684
01:06:29,359 --> 01:06:35,839
it's the same, uh, ease of, you know, the SQL interface, as, as in the centralized case.

685
01:06:36,799 --> 01:06:42,719
So I think this is one of the sort of maybe the sticking points of these decentralized applications,

686
01:06:42,719 --> 01:06:46,239
I'll clearly make them as easy to write as sort of decentralized versions.

687
01:06:52,480 --> 01:06:55,679
Okay, so I want to leave some time this time around, instead of being breakout rooms,

688
01:06:56,239 --> 01:07:00,399
maybe there's a leave some time around, time for, just questions or discussion,

689
01:07:00,399 --> 01:07:03,839
but since this is a little bit more of a, uh, yeah, I'm sort of, you know,

690
01:07:03,839 --> 01:07:10,079
far-provoking type exercise than, uh, an exercise in, well, years are, how technical problem

691
01:07:10,079 --> 01:07:13,119
here's the right solution, you know, there's learned a right solution and then use it.

692
01:07:14,000 --> 01:07:19,599
And so, uh, you know, just what they're hearing, you know, people's opinion or questions about,

693
01:07:19,599 --> 01:07:24,799
sort of any aspect of these decentralized applications for centralized, or the particular

694
01:07:24,799 --> 01:07:29,119
design for block stack or any other issue, and we can debate it together.

695
01:07:32,239 --> 01:07:39,679
Wait, so what's the, um, the main difficulty in, um, instead of using like a file system API to

696
01:07:39,679 --> 01:07:45,679
use like a relational database? Well, how do you write a, how do you present the world-wide,

697
01:07:46,879 --> 01:07:52,960
relational database? I think all these user files, all these files from the different users,

698
01:07:52,960 --> 01:07:59,440
leaving all kinds of different, uh, storage providers, um, and, uh, you know, you can't like

699
01:07:59,440 --> 01:08:05,759
room, do whatever, uh, you can't do a select across all the storage providers, bring them to crazy.

700
01:08:05,760 --> 01:08:12,160
You couldn't also download all the users data to your computer because that would be too expensive.

701
01:08:12,160 --> 01:08:21,520
What about like, uh, like, uh, like a link data, um, data database? Yeah, yeah, so I think this is like,

702
01:08:21,520 --> 01:08:26,320
uh, you know, you're interested in this, you know, I think there's renouncing research direction

703
01:08:26,320 --> 01:08:31,360
to the sort of pursuit, correct, but you could actually build, uh, sort of, uh, uh,

704
01:08:31,519 --> 01:08:36,079
scalable database infrastructure, uh, where users still control their own data, have the different

705
01:08:36,079 --> 01:08:39,519
locations, yeah, then they're gonna provide a sort of a relational data type interface.

706
01:08:41,279 --> 01:08:43,439
Certainly blocks out, blocks out, there's no arferies in you.

707
01:08:48,159 --> 01:08:53,519
I guess another question is, um, like, what are the benefits of this decentralized PKI versus like,

708
01:08:54,239 --> 01:08:59,519
web of trust PKI, which I guess is also decentralized? Yeah, so, so, so, totally other, you know,

709
01:08:59,520 --> 01:09:05,200
I guess, uh, yeah, maybe you should point to here, correct. Uh, you know, there's sort of the,

710
01:09:05,200 --> 01:09:07,920
there are other web of trust API, web of trust.

711
01:09:11,680 --> 01:09:18,080
PKI's, uh, you know, one of the most familiar with is, uh, is, uh,

712
01:09:18,720 --> 01:09:21,119
uh, uh, keybase.

713
01:09:24,960 --> 01:09:28,720
I think we've mentioned a couple of times before, uh, and, uh, I, you know,

714
01:09:28,720 --> 01:09:33,279
I, uh, keybase actually, uh, we haven't talked about this in a great detail, but, uh,

715
01:09:33,279 --> 01:09:37,039
one of the things that I was also challenging these kinds of systems is like, how do you represent

716
01:09:37,039 --> 01:09:41,680
groups of users? Like, we should have a little bit in the Sunderpaper, uh, where, you know,

717
01:09:41,680 --> 01:09:45,039
we have group names, you know, all the keys for the group names and, you know, how to create them,

718
01:09:45,039 --> 01:09:48,960
and I'll manage them and actually, you know, stick them in, you know, how do you incorporate those in,

719
01:09:49,760 --> 01:09:55,039
uh, in the, the chain of records name records, uh, and keybase, that's a really, really, really,

720
01:09:55,039 --> 01:10:00,399
a really thought out story for that. Uh, and, you know, actually, it's a very impressive, it's

721
01:10:00,399 --> 01:10:06,159
probably, you know, the sort of, uh, probably, uh, probably consider it the, sort of the best sort of

722
01:10:06,159 --> 01:10:11,439
decentralized, you know, PKI out there. And the most thought out is probably most widely used.

723
01:10:15,519 --> 01:10:23,039
So, other, any benefits of doing it of like block stacks method, or is it just more extensible?

724
01:10:23,920 --> 01:10:28,159
Well, one of the things that actually you block stack gets correct is, uh, it's this uniqueness,

725
01:10:28,880 --> 01:10:32,960
properties because the web of trust, there's basically not a global naming system, you know,

726
01:10:32,960 --> 01:10:39,760
like, you know, it is like my to do list or my contact list, uh, and, you know, whatever, who I name,

727
01:10:40,560 --> 01:10:46,480
if I have a name, John for some particular public key, that is my John. And, uh, if I send John

728
01:10:46,480 --> 01:10:50,560
to you, it's like a text, you know, stringed John, and it probably resolves differently,

729
01:10:50,560 --> 01:10:58,320
differently in your, uh, contact list than in mine. So, in fact, uh, so keybase is much more, uh,

730
01:10:58,320 --> 01:11:02,800
is decentralized, uh, but there is definitely really go for the sort of global unique names.

731
01:11:03,920 --> 01:11:09,199
Now, it is the case that, you know, keybase once in a while publishes the hash of all the names,

732
01:11:09,920 --> 01:11:14,159
of the complete, the miracle tree of all names in, in, in the blockchain too.

733
01:11:15,199 --> 01:11:18,640
So you can sort of verify whether keybase actually is not playing in games,

734
01:11:20,320 --> 01:11:24,400
but, you know, the, uh, it's a much more, it doesn't really have global unique dates.

735
01:11:30,000 --> 01:11:34,320
Sorry, just the clarification question. Earlier on in the lecture, you mentioned how

736
01:11:34,880 --> 01:11:38,960
users have the, basically they can choose who to show their data to,

737
01:11:39,359 --> 01:11:46,159
yeah, um, or who they give access to their data to, um, but I'm not quite sure I see how

738
01:11:46,159 --> 01:11:52,479
that's implemented within that system. Yeah, the, the, the, the, the, the, the, the, the,

739
01:11:52,479 --> 01:11:56,159
the way one way to do it in, uh, I don't know which actually, you know, what the, what the

740
01:11:56,159 --> 01:12:02,000
blockchain does is that you encrypt the same data, uh, for different users. So I think, uh,

741
01:12:02,000 --> 01:12:09,439
you want to, uh, share your data only with user one user two, uh, then, uh, you're encrypted,

742
01:12:09,439 --> 01:12:14,720
you know, with the, uh, public keys of user one user two, and then those are the only two that can

743
01:12:14,720 --> 01:12:20,639
decrypt it. And so that gives you sort of extra control lists.

744
01:12:20,640 --> 01:12:31,200
I see. So you'd have to, for each person you wanted to give the data to, you'd have to encrypt it

745
01:12:31,200 --> 01:12:36,480
with like their public key. Yeah. And you can get more sophisticated about this, you know,

746
01:12:36,480 --> 01:12:41,680
you can actually have group keys, and, you know, give, uh, group of users, you know, access to,

747
01:12:41,680 --> 01:12:48,240
you know, you have a lockbox that, uh, has a group key in it and you, uh, encrypt the lockbox with

748
01:12:48,399 --> 01:12:53,039
the different users, you know, public keys, and then they get access to that lockbox, they get the

749
01:12:53,039 --> 01:12:58,000
key out of it, and then they can decrypt the key. So you only have to encrypt the data only once

750
01:12:58,000 --> 01:13:03,359
instead of multiple times. And you only have to encrypt the, encrypt the lockbox multiple times.

751
01:13:04,559 --> 01:13:05,039
Thank you.

752
01:13:08,079 --> 01:13:12,800
Um, that would be done at the level of the content of this zone file, right?

753
01:13:13,760 --> 01:13:19,119
Uh, yeah, we've really, uh, we're, or maybe the key that is in the zone files will be the key for

754
01:13:19,119 --> 01:13:25,360
the lockbox if you will. And again, I'm not actually 100% sure exactly how, uh,

755
01:13:27,199 --> 01:13:27,440
uh,

756
01:13:30,480 --> 01:13:35,039
how well blocksec actually, uh, the, the blocksec file system does, uh, action control, when it does it

757
01:13:35,039 --> 01:13:39,760
all. But other people have done these kinds of designs.

758
01:13:39,920 --> 01:13:46,960
Do you think, uh, systems like this be able to compete with like the centralized model in terms of

759
01:13:46,960 --> 01:13:52,960
performance or scalability? And what would it take? I don't know. These are, uh, good,

760
01:13:54,320 --> 01:13:58,720
good questions. Uh, I don't know really no, the answer. At least the case, correct? Like even

761
01:13:58,720 --> 01:14:02,720
the centralized side is not that easy to scale. You know, we've written, written quite a number of

762
01:14:02,720 --> 01:14:08,640
pavers, right? You should have seen how, uh, how to make them, uh, scalable to millions of users.

763
01:14:10,000 --> 01:14:10,720
And so, you know,

764
01:14:12,960 --> 01:14:16,960
hope, uh, yeah, we're just getting anything to a large, large number of users is not easy.

765
01:14:17,920 --> 01:14:24,079
Uh, and, uh, certainly, uh, in the case of the decentralized apps, it's not going to be easy to,

766
01:14:24,079 --> 01:14:29,119
but the other hand, like if there's not wide sharing, like the user one actually, I only have a share

767
01:14:29,119 --> 01:14:32,560
to do is the 10 other users. I'm not sure if it'll probably not be a big issue,

768
01:14:32,560 --> 01:14:36,159
correct? Some ways you can think about the decentralized arduous architecture is basically

769
01:14:36,239 --> 01:14:47,359
sharded by user. And each app, you know, runs in one of users' computers. So, you know, you don't need

770
01:14:47,359 --> 01:14:59,119
to like data standards of cash. So, I don't know what the answer to that question actually is.

771
01:15:00,880 --> 01:15:02,559
I'm not be able to give you a different answer.

772
01:15:07,039 --> 01:15:10,479
It's clearly case that, you know, people have demonstrated a bigger scalability with sort of these,

773
01:15:12,720 --> 01:15:17,199
uh, centralized designs, uh, at least so far we've seen then in the decentralized ones, but,

774
01:15:17,199 --> 01:15:22,319
you know, one reason of that, of course, is that the, the, the centralized designs are like the,

775
01:15:22,319 --> 01:15:26,639
the widely used and most popular, uh, the most deployed, uh, cases.

776
01:15:28,399 --> 01:15:34,720
I think the, the, the, the, the decentralized design is just intriguing design. And, uh,

777
01:15:34,720 --> 01:15:37,119
that if it could make it to be work, you know, it would be pretty cool.

778
01:15:45,920 --> 01:15:47,920
And the other thoughts that people might have for,

779
01:15:51,760 --> 01:15:52,800
would like to argue about.

780
01:15:52,800 --> 01:16:08,000
I still feel like the storage aspect is like the thing that, that William Lowe was pointing out,

781
01:16:08,000 --> 01:16:14,960
where like you maybe have an immutable file that's the, the user information, but the mutable file

782
01:16:15,039 --> 01:16:24,319
that you have somewhere else is like a, a huge problem, um, in so much that like I, I don't really

783
01:16:24,319 --> 01:16:32,640
understand how you can assure redundancy for the, uh, large amount of mutable storage that

784
01:16:32,640 --> 01:16:36,880
you might have. Yeah, I think the, I think the, the, the, the, the, I think the answer to the

785
01:16:36,880 --> 01:16:42,239
redundancy may be not that tough. Uh, I think the user is responsible for redundancy. Uh, so you've

786
01:16:42,239 --> 01:16:46,719
utilized your, you're, you're to do this, you own it to do this file and you're dropped to

787
01:16:46,719 --> 01:16:51,599
replicate it, you know, multiple times. So the block stack storage servers do that for you,

788
01:16:52,239 --> 01:16:58,800
but you got to range, you know, basically for, uh, space and the different storage providers to, uh,

789
01:17:00,000 --> 01:17:05,199
do that. And so I think in the paper to talk about, like, oh, you replicated it, maybe, uh,

790
01:17:05,199 --> 01:17:10,159
Google Drive and the desk read. And presumably, the screen internally does its own replication,

791
01:17:10,159 --> 01:17:13,199
right? So hopefully, you know, maybe you just actually stored only at that screen. That should

792
01:17:13,199 --> 01:17:17,920
be pretty reliable. Probably more reliable than storing data on your SSD and your laptop.

793
01:17:22,000 --> 01:17:26,639
And the zone files are small. So they're just whitely replicated and you don't have to trust

794
01:17:26,639 --> 01:17:28,559
the, uh, the storage provider.

795
01:17:40,159 --> 01:18:02,079
And the other thought. I was thinking it's a little bit wasteful that you have in order to register

796
01:18:02,079 --> 01:18:10,399
a name and to use this name system, you have to pay. Um, yeah. So I was thinking, obviously on a,

797
01:18:10,399 --> 01:18:16,800
in a blockchain based system, you have to incentivize the miners, but I was, maybe there's a different

798
01:18:17,519 --> 01:18:26,079
cheaper way. I don't know. Yeah, I'm not sure. It seems in some ways that, that sort of the currency and

799
01:18:26,079 --> 01:18:31,439
this sort of, uh, very coupled. I said, a reason, exactly for the reason that you mentioned,

800
01:18:31,439 --> 01:18:36,079
because you don't have miners and you have to incentivize them. Now, I think in general, like,

801
01:18:36,079 --> 01:18:39,199
with these transactions, they're pretty cheap, you know, basically, you know, basically you have to

802
01:18:39,199 --> 01:18:43,199
just pay enough, correct, that the miners is just willing to do the transaction, include your transaction.

803
01:18:44,319 --> 01:18:49,839
Uh, and you know, today you also pay for, you know, if you want to register a name in, you know,

804
01:18:50,639 --> 01:18:54,799
in DNS, you know, you actually pay quite a bit of money. Stop free.

805
01:18:54,800 --> 01:19:03,840
I don't know exactly how the economics would work out, but, uh, it's not, obviously, clear that

806
01:19:03,840 --> 01:19:07,440
this is actually more expensive way of doing it, other than maybe, you know, you're burning the planet

807
01:19:07,440 --> 01:19:14,000
within electricity. Uh, it leads into Bitcoin case, but maybe you should use, uh, one of these

808
01:19:14,000 --> 01:19:24,000
state of work, uh, ledger should step up the, uh, which I, uh, uh, approve state,

809
01:19:24,000 --> 01:19:26,319
instead of these, we have proof of work, uh, ledger should.

810
01:19:29,920 --> 01:19:34,640
It'll be possible just to swap it out in place of where one.

811
01:19:34,640 --> 01:19:38,079
Yeah, I think this is like, I think this is what the papers argue, correct? Like, their particular

812
01:19:38,079 --> 01:19:43,359
designs really not very dependent on the, uh, on the line of watching, and they could easily switch

813
01:19:43,439 --> 01:19:46,799
to another blockchain. And in fact, you know, this is the second blockchain that worked on, correct?

814
01:19:46,799 --> 01:19:50,799
That first year's name coin, and then they switched to Bitcoin. And I think the argument

815
01:19:50,799 --> 01:19:57,839
into the paper's making on we could actually switch to another one, uh, uh, blockchain we wanted to.

816
01:19:57,840 --> 01:20:12,400
What in particular is stored in the name history?

817
01:20:12,400 --> 01:20:19,600
In the, uh, sorry, what, uh, what's the question, uh, really?

818
01:20:19,600 --> 01:20:22,960
Oh, sorry, the name history in the block stack database.

819
01:20:22,960 --> 01:20:27,279
Yeah, this, this, uh, yeah, I don't really mean like these three different guys.

820
01:20:28,079 --> 01:20:30,000
Yeah, different version of the zone file.

821
01:20:31,759 --> 01:20:34,319
Oh, so they're just like version numbers?

822
01:20:34,319 --> 01:20:37,599
Yeah, I think so. I'm not sure 100% sure about that.

823
01:20:38,479 --> 01:20:41,519
But like these correspond to the free updates to the zone file, correct?

824
01:20:41,519 --> 01:20:42,960
Here's number one, here's number two.

825
01:20:45,279 --> 01:20:47,519
And maybe they keep using versions of the zone file around.

826
01:20:57,759 --> 01:21:03,279
Any other topics that people want to bring up?

827
01:21:09,279 --> 01:21:11,679
Okay, so we're in sort of in election time anyway.

828
01:21:11,679 --> 01:21:13,199
Okay, so let's say I want to restock here.

829
01:21:13,199 --> 01:21:15,679
So people in the, uh, need to leave can leave.

830
01:21:15,679 --> 01:21:19,599
Uh, and I'll see you hopefully everybody on first day.

831
01:21:19,599 --> 01:21:21,759
Yeah, we're going to see, uh, eight.

832
01:21:21,759 --> 01:21:24,000
We had eight design, uh, eight projects.

833
01:21:24,479 --> 01:21:27,439
And so the eight teams will present the first day.

834
01:21:27,439 --> 01:21:32,079
What they've done instead of lap, uh, lap four.

835
01:21:32,079 --> 01:21:35,680
And it should be, and the, the project quite cool and interesting.

836
01:21:35,680 --> 01:21:38,319
So hopefully it'll be in, uh, it will be entertained.

837
01:21:39,199 --> 01:21:41,359
And that makes sure it includes this lecture.

838
01:21:41,359 --> 01:21:45,760
Hopefully, uh, after a bit of a goal was a little bit before performing.

839
01:21:45,760 --> 01:21:49,920
And you know, sort of talk about, uh, designs, uh,

840
01:21:49,920 --> 01:21:53,119
decentralized designs that have this nice property that the users own.

841
01:21:53,119 --> 01:21:57,680
Their data and, uh, you know, and we looked in the context of, uh,

842
01:21:57,680 --> 01:22:00,000
block stack at least one particular design.

843
01:22:00,640 --> 01:22:03,039
Uh, how they, uh, did naming in a way that, uh,

844
01:22:03,039 --> 01:22:07,279
gives global names, unique names, and human, uh, readable.

845
01:22:08,000 --> 01:22:10,159
Okay, so that's the end of this lecture.

846
01:22:10,159 --> 01:22:12,159
And hopefully we'll see you on first day,

847
01:22:12,159 --> 01:22:13,680
which is going to be our final class meeting.

848
01:22:18,239 --> 01:22:21,039
And if you have any questions, you can please feel free to stick around.

849
01:22:21,119 --> 01:22:23,039
And we can talk.

850
01:22:23,039 --> 01:22:25,439
Um, um, Professor,

851
01:22:25,439 --> 01:22:28,399
I'm really, uh, for the presentation, um,

852
01:22:28,399 --> 01:22:32,720
are we, are we supposed to do something more of a demo or should we have, like,

853
01:22:32,720 --> 01:22:34,640
slides prepared or combination both?

854
01:22:34,640 --> 01:22:36,800
Yeah, we put, uh, but we put a bunch of some instructions.

855
01:22:36,800 --> 01:22:41,519
Uh, in, um, uh, the down side is, you just get past some more.

856
01:22:41,519 --> 01:22:44,479
Yeah, sir. Uh, you're pretty, free to do, Shell.

857
01:22:44,479 --> 01:22:47,600
What you want to do, uh, you know, the thing you want to do is, uh,

858
01:22:47,600 --> 01:22:50,640
convince the class and not, you know, uh,

859
01:22:50,720 --> 01:22:52,240
what project you did in my school.

860
01:22:53,200 --> 01:22:54,560
Uh, so demos are a good idea.

861
01:22:55,039 --> 01:22:57,119
Uh, you don't have a ton of time.

862
01:22:57,119 --> 01:23:00,560
So I think the typical thing to do is, uh, people have a few slides,

863
01:23:00,560 --> 01:23:03,119
they're explaining what they did, and then maybe, uh,

864
01:23:03,119 --> 01:23:05,680
cook demos to see how it actually materialized.

865
01:23:06,960 --> 01:23:08,720
Great. Okay. Yeah. Thanks.

866
01:23:11,680 --> 01:23:15,039
Yeah, we don't expect you to do whatever in hours who prepare for this, correct?

867
01:23:15,920 --> 01:23:17,920
Uh, do we, you know, try to share what you've done?

868
01:23:20,640 --> 01:23:23,520
Okay. Thank you.

869
01:23:26,160 --> 01:23:30,000
I just wanted to ask, so it's, like, what is the

870
01:23:31,200 --> 01:23:38,320
reasoning behind just having, just using the same Bitcoin, like, the blockchain,

871
01:23:39,119 --> 01:23:44,079
and just putting the, the transactions for the naming on there,

872
01:23:44,800 --> 01:23:47,360
together with all the rest of the things, right?

873
01:23:47,360 --> 01:23:47,600
Yeah.

874
01:23:48,560 --> 01:23:50,560
I think there's the papers, uh,

875
01:23:52,240 --> 01:23:55,920
so they started out, they started out building a top of name coin,

876
01:23:56,480 --> 01:23:58,640
which is a special purpose ledger for naming.

877
01:23:59,280 --> 01:24:03,039
Um, and they discovered it basically, uh,

878
01:24:04,320 --> 01:24:07,440
we should have all kinds of security issues with, uh, name coin,

879
01:24:08,480 --> 01:24:11,200
and one of them being, uh, they are actually not many miners.

880
01:24:12,240 --> 01:24:16,000
And so, uh, they observed that they are basically, uh,

881
01:24:16,640 --> 01:24:22,159
minor pools that basically have more than 50% of the, uh, capacity

882
01:24:23,199 --> 01:24:24,880
and, uh, work capacity.

883
01:24:24,880 --> 01:24:27,600
And therefore, you know, could do anything they wanted to do to the, uh,

884
01:24:27,600 --> 01:24:28,640
to the principle to the lecture.

885
01:24:29,680 --> 01:24:30,960
And so they wanted to sit on, uh,

886
01:24:31,840 --> 01:24:36,640
uh, a blockchain that is widely used, very popular and not easy to overtake, uh, by the adversary.

887
01:24:38,560 --> 01:24:40,960
Okay. I remember they said 21%.

888
01:24:40,960 --> 01:24:42,000
Yeah. I remember.

889
01:24:42,960 --> 01:24:43,439
Okay.

890
01:24:43,519 --> 01:24:44,079
It makes sense.

891
01:24:45,039 --> 01:24:47,599
And I also wanted to ask about, um,

892
01:24:48,559 --> 01:24:50,399
the your rights, their your rights to,

893
01:24:51,599 --> 01:24:56,399
do the zone file storage system, they're not just like, um,

894
01:24:56,399 --> 01:24:58,159
S3 something, something, right?

895
01:24:58,159 --> 01:24:58,799
Yeah, it could be.

896
01:24:59,279 --> 01:25:02,079
Uh, the brownie was something a little bit more general because it's actually

897
01:25:02,079 --> 01:25:06,239
interpreted by the, uh, uh, by the block stack file system.

898
01:25:06,879 --> 01:25:12,079
Uh, uh, so, and the block of the stack file system has back ends for the different storage provider,

899
01:25:12,079 --> 01:25:14,720
where it's S3 or Google Drive or whatever.

900
01:25:15,760 --> 01:25:18,319
And so there's some naming scheme that, uh,

901
01:25:18,319 --> 01:25:23,359
that, that, that, that, uh, the block stack file system can interpret and then figure out

902
01:25:23,359 --> 01:25:28,880
how to retrieve the right file from the, uh, the correct, uh, back end.

903
01:25:31,119 --> 01:25:33,600
This is just to make them the same.

904
01:25:33,600 --> 01:25:34,000
Yeah.

905
01:25:34,000 --> 01:25:36,319
Exactly. Usually like an application writer doesn't really want to,

906
01:25:36,319 --> 01:25:37,199
doesn't want to care.

907
01:25:37,199 --> 01:25:37,439
Correct.

908
01:25:37,439 --> 01:25:39,119
Whether it's stored at S3 or Google Drive,

909
01:25:39,119 --> 01:25:40,079
we shouldn't be aware.

910
01:25:40,079 --> 01:25:41,600
There's usually you have to deal with that.

911
01:25:43,039 --> 01:25:43,519
All right.

912
01:25:43,519 --> 01:25:44,559
Thank you so much.

913
01:25:44,559 --> 01:25:45,119
You're welcome.

914
01:25:47,359 --> 01:25:51,600
I had a question about why Zucos Triangle is kind of like,

915
01:25:52,880 --> 01:25:54,239
I think that people think about a lot.

916
01:25:54,239 --> 01:25:57,519
Like it seems like you can have like a client side like interpret the human,

917
01:25:58,319 --> 01:26:02,239
uh, non-meaningful data that you can make kind of all the data human-meaningful,

918
01:26:02,239 --> 01:26:04,239
like on the client side to the, to the user.

919
01:26:04,880 --> 01:26:07,680
Um, and so I wasn't completely sure like what,

920
01:26:08,640 --> 01:26:12,079
like what the innovation here is or why like people,

921
01:26:12,720 --> 01:26:14,400
why this is necessarily like a trade-off.

922
01:26:15,680 --> 01:26:16,000
Yeah.

923
01:26:16,000 --> 01:26:16,480
Yeah.

924
01:26:16,480 --> 01:26:18,960
Well, I just, this is the best slide I can give you.

925
01:26:18,960 --> 01:26:21,520
We're, I can give you a whole bunch of naming examples that basically have

926
01:26:21,520 --> 01:26:22,720
200 free, but not all free.

927
01:26:23,680 --> 01:26:27,440
And, uh, and sort of example like, you know, uh,

928
01:26:28,960 --> 01:26:29,680
the, uh,

929
01:26:30,720 --> 01:26:32,320
you know, we talked about key base, great.

930
01:26:32,320 --> 01:26:34,079
There's decent like, you know, decentralized,

931
01:26:34,960 --> 01:26:36,240
uh, humanly, you're open, not unique.

932
01:26:38,000 --> 01:26:41,840
Uh, and now you're going to argue when it's that important to have global unique things.

933
01:26:42,640 --> 01:26:44,880
I get it's like, you know, whatever you got some global unique game like

934
01:26:44,880 --> 01:26:45,840
8, 6, 8, 2, 4.

935
01:26:45,840 --> 01:26:46,079
Yeah.

936
01:26:46,079 --> 01:26:46,640
What does it mean?

937
01:26:47,680 --> 01:26:49,119
And who's associated with it?

938
01:26:49,119 --> 01:26:51,840
So if you're coming from that angle, I think that's a very valid question.

939
01:27:00,079 --> 01:27:04,640
So one of the things that has always kind of bothered me when we're reading through these

940
01:27:04,720 --> 01:27:11,360
blockchain type of papers is like what happens in 100 years when the, the, the ledger gets to like

941
01:27:11,360 --> 01:27:15,039
multiple tar, I don't know if it, yeah, like the multiple terabytes or something.

942
01:27:18,400 --> 01:27:19,039
Uh, yeah.

943
01:27:19,039 --> 01:27:21,200
You're just like not, we're not having this scape plan.

944
01:27:21,200 --> 01:27:22,560
Like what's going to happen then?

945
01:27:23,680 --> 01:27:25,039
Uh, I don't know.

946
01:27:26,480 --> 01:27:30,320
Part two, uh, speculating on the user out into the future.

947
01:27:30,880 --> 01:27:35,759
I presume what you could do is like, you know, put a checkpoint in the, uh, uh, yeah, I get

948
01:27:35,759 --> 01:27:36,960
to imagine multiple schemes, right?

949
01:27:36,960 --> 01:27:37,920
They're getting out of this.

950
01:27:37,920 --> 01:27:42,159
Uh, one, you could then make a checkpoint, uh, off the state, you know,

951
01:27:42,159 --> 01:27:46,079
build on the ledger and include the hash with that checkpoint into the ledger.

952
01:27:46,719 --> 01:27:50,399
And then as long as you can replicate the checkpoint widely,

953
01:27:51,039 --> 01:27:54,479
and then you can basically start running from the checkpoint and cut out the beginning.

954
01:27:55,279 --> 01:27:58,159
This is like not unlike, you know, what we're doing in lap, you know,

955
01:27:58,159 --> 01:27:59,199
what graph is doing, correct?

956
01:28:01,279 --> 01:28:04,159
Well, the party that does that have to be trusted or,

957
01:28:05,759 --> 01:28:08,719
what we did, I did, uh,

958
01:28:10,719 --> 01:28:16,159
presumably declines want to go, I have to go along and you realize that they should get

959
01:28:16,159 --> 01:28:19,840
to get that checkpoint and be able to construct, you know, the current state of the world.

960
01:28:20,799 --> 01:28:24,880
So I presume that we require some critical change and presumably some fork then.

961
01:28:24,960 --> 01:28:26,960
And

962
01:28:28,960 --> 01:28:30,560
this is not a huge issue, correct?

963
01:28:30,560 --> 01:28:34,480
It leads with the rate of Bitcoin because like, you know, the number of transactions for,

964
01:28:34,480 --> 01:28:36,480
you know, second, you can do is actually small.

965
01:28:37,039 --> 01:28:40,560
And like, if you remember from the Bitcoin paper, there's some calculation like, you know,

966
01:28:40,560 --> 01:28:42,800
what the total size would be if you do this.

967
01:28:43,840 --> 01:28:47,920
Furthermore, if you remember correctly from the Bitcoin paper, there's a bunch of

968
01:28:47,920 --> 01:28:54,239
optimizations where you don't really have to remember every transaction, uh, for every coin,

969
01:28:54,239 --> 01:28:57,599
you basically have to remember the last transaction for every coin.

970
01:28:58,159 --> 01:29:03,439
And you could do that by just remembering the, uh, block headers instead of the complete block.

971
01:29:07,039 --> 01:29:09,599
So Bitcoin has sort of a built-in solution to this problem.

972
01:29:10,880 --> 01:29:16,079
I see. So the main bottleneck is more or less when new machines come up, they need to verify

973
01:29:16,079 --> 01:29:17,199
the hunch. Yeah.

974
01:29:17,199 --> 01:29:20,880
But after that, then things are relatively more optimized.

975
01:29:20,880 --> 01:29:21,760
Yeah, exactly.

976
01:29:23,199 --> 01:29:23,599
Thank you.

977
01:29:24,479 --> 01:29:25,279
Okay.

978
01:29:35,760 --> 01:29:36,960
Okay. That's for today.

979
01:29:39,439 --> 01:29:40,079
Thank you all.

980
01:29:40,079 --> 01:29:49,760
See you first day.

