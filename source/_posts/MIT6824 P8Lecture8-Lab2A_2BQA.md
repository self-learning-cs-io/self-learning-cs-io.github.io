---
title: MIT6824 P8Lecture8 Lab2A_2BQA
---

1
00:00:00,000 --> 00:00:07,000
Okay, good afternoon. Sound check.

2
00:00:07,000 --> 00:00:15,000
Yeah, we know good. Okay, great. Good afternoon. Good evening. Good morning. Where we are.

3
00:00:15,000 --> 00:00:22,000
So today I want to talk about a lot to A and B. And then this is really a question and answering session.

4
00:00:22,000 --> 00:00:32,000
So feel free to interrupt anytime. Ask questions as much as you like. It's really this today's lecture is really dedicated to your questions.

5
00:00:32,000 --> 00:00:35,000
I summarized.

6
00:00:35,000 --> 00:00:43,000
Many of the questions that came up or either wants a multiple times in the email on the on the right side here of this on the board.

7
00:00:43,000 --> 00:00:57,000
Hopefully we'll get through them as I walk through my solutions. And so I'm going to basically cover four topics related to the solution.

8
00:00:57,000 --> 00:01:01,000
One, I'm going to first talk a little bit about voting.

9
00:01:01,000 --> 00:01:09,000
Or like the voting code, basically, the hard beats.

10
00:01:09,000 --> 00:01:18,000
Now, I'll talk about start and commit.

11
00:01:18,000 --> 00:01:20,000
And this sort of follows, I think the.

12
00:01:20,000 --> 00:01:30,000
Yes, and that we made in the lab, like how you should get started. Like first get voting to work, you know, then get hard beats to work once you got hard beats to work, you can actually start taking commands from clients.

13
00:01:30,000 --> 00:01:34,000
And then, of course, and yet you're, you got to commit them, supplied them on the applied channel.

14
00:01:34,000 --> 00:01:41,000
So there's roughly the order I'm planning to go through. But again, I feel free to interrupt at any particular time.

15
00:01:41,000 --> 00:01:55,000
But before diving or looking at my particular solutions or the solution I wrote this year, I want to talk a little bit about debugging because I was the problem with the question that came up most in the.

16
00:01:55,000 --> 00:01:58,000
In all your in the submitted in the submitted questions.

17
00:01:58,000 --> 00:02:05,000
So let me tell you a little bit at a very high level about debugging.

18
00:02:05,000 --> 00:02:10,000
And this is a clearly topic that we could spend a whole lecture on.

19
00:02:10,000 --> 00:02:17,000
And, but I'm just going to give you sort of my high level approach that, you know, I typically use, you need to address.

20
00:02:17,000 --> 00:02:20,000
You know, to basically pass the labs.

21
00:02:20,000 --> 00:02:26,000
And basically, it starts out, I just started, basically, we run the first test case.

22
00:02:26,000 --> 00:02:35,000
And of course, if I have not written any code, I'm going to fail it. But at least I have some, you know, starting point where I can start writing some code for.

23
00:02:35,000 --> 00:02:41,000
And so, you know, think about the first test case, you know, started writing, you know, look at the hints and write some code.

24
00:02:41,000 --> 00:02:44,000
And while writing the code.

25
00:02:44,000 --> 00:02:58,000
And I found it, you know, convenient in this lab to, or these, the set of labs actually any lab in the eight to four to log all messages.

26
00:02:58,000 --> 00:03:03,000
And you know, typically use, you know, that the deep print F function in the new toe logo.

27
00:03:03,000 --> 00:03:07,000
And I'm pretty, pretty systematic of logging messages.

28
00:03:07,000 --> 00:03:12,000
And the reason that I do this is for debugging purposes.

29
00:03:12,000 --> 00:03:20,000
And so I wrote my code, I'm going to run the test code fails, writes code to actually try to pass the test case.

30
00:03:20,000 --> 00:03:31,000
And, you know, there's sort of two scenarios, you know, one, you know, I pass, which then I immediately move on to the next test case or a fail.

31
00:03:31,000 --> 00:03:43,000
In that case, the first thing I do is, you know, study the test case a little bit more in detail, and try to figure out like what actually the test case is trying to test.

32
00:03:43,000 --> 00:03:52,000
And you know, the name of the test case is often there suggestive of like what the particular scenario or what sort of set of scenarios, you know, the test case is trying to cover.

33
00:03:52,000 --> 00:04:02,000
And then I try to sort of formally for myself, hypothesis, not why, you know, my code, my not test that pass the test case.

34
00:04:02,000 --> 00:04:08,000
And so basically this is sort of a moment of like reflection and thinking.

35
00:04:08,000 --> 00:04:20,000
And to sort of like understand what the, like constructing my head, the scenario that there seems to fit the test case, you know, think about my code and what it actually could be your problem.

36
00:04:20,000 --> 00:04:28,000
And once I have a sort of hypothesis, then the next thing to do is to study, you know, basically try to confirm the hypothesis.

37
00:04:28,000 --> 00:04:37,000
Whether, you know, my explanation part, why I'm passing the test case might be right or wrong. And so to do that, then basically I studied the log.

38
00:04:37,000 --> 00:04:58,000
So if I have a print, you know, and trace of all the messages, you know, being sent to the part of the protocol, I can look at the, you know, trace and kind of the sea, you know, where things go wrong and sort of work where back works and, you know, in that way sort of test and refine my hypothesis about why my code might be wrong.

39
00:04:58,000 --> 00:05:17,000
Sometimes, you know, that might require, you know, going back and basically run the test case to basically get more detailed log out boots, although early on, like tend to be very systematic and, you know, don't really have to add any print statements, but in some cases, that there's necessary.

40
00:05:17,000 --> 00:05:26,000
And then you know, that gives me that more information and I can sort of really zoom in on a scenario that, you know, my code doesn't handle.

41
00:05:26,000 --> 00:05:37,000
And once I sort of have a hypothesis, I've verified with the log that there are indeed that hypothesis to be correct and that that is short or bugging my code, I can just go fix the code.

42
00:05:37,000 --> 00:05:42,000
And then run the test case.

43
00:05:42,000 --> 00:05:57,000
And so this is a bit of a process run test case, you fail, study test case and study log, you know, perform a late hypothesis, you know, try to confirm hypothesis and then move on fix the code and then move on to the next one.

44
00:05:57,000 --> 00:06:00,000
And that tend to be reasonable systematic in this.

45
00:06:01,000 --> 00:06:17,000
And so often I watch right down in a file and text by what my hypothesis is and sort of try to collect evidence or counter evidence, you know, to either prove a dispute my hypothesis and I really have a good reason to fix the code.

46
00:06:17,000 --> 00:06:31,000
I think any approach that basically is not very systematic, you know, where, example, you think something is not really 100% right, you know, maybe you'll change that and then see you pass the test cases, tends to be not work that well, I think that takes a lot of time.

47
00:06:31,000 --> 00:06:44,000
Because you might be wrong or and worse, you might be wrong and actually pass the test case and think you're right, but it turned out like, you know, basically you're just shifted the bug from one corner to another corner and it will show up later again.

48
00:06:45,000 --> 00:06:51,000
So at a very high level, this is the sort of the approach that I take.

49
00:06:51,000 --> 00:06:58,000
And you can see what the key here is really logging the messages.

50
00:06:58,000 --> 00:07:09,000
Any questions were comments on this, this approach, I know it's a very high level, but at least if you some sense that like how I approach this.

51
00:07:09,000 --> 00:07:11,000
So the messages here are the RPC.

52
00:07:11,000 --> 00:07:14,000
Okay.

53
00:07:14,000 --> 00:07:19,000
Okay, so some so do a quick question.

54
00:07:19,000 --> 00:07:20,000
Go ahead.

55
00:07:20,000 --> 00:07:28,000
So what's a good like approach for deciding the granularity of what to log and what not to log and that's a very good.

56
00:07:28,000 --> 00:07:38,000
I just a great question of hoping that someone was asked is I tend to be long things are the pretty fine grain clarinet and log everything.

57
00:07:38,000 --> 00:07:51,000
And then I use, you know, whatever I pulled the basically blog in the editor or I use unique activities like rap to basically pull out the things that are actually really interested in.

58
00:07:51,000 --> 00:08:01,000
And the reason I'm doing that is, you know, sometimes I don't know what level granularity I want to study something and I don't want to go back and run the test case again.

59
00:08:01,000 --> 00:08:06,000
I just collect everything and then you know, filter to stop out that I don't that I care about.

60
00:08:06,000 --> 00:08:18,000
And this brings me on so some people write quite a bit of infrastructure for debugging the using the logs or making the logs more easier to understand.

61
00:08:18,000 --> 00:08:30,000
I'm pretty primitive, you know, deep enough and lots of information, although I structure my brain is in this sort of a clear matter sort of like I can see what the source of the destination is.

62
00:08:30,000 --> 00:08:33,000
And what the RPC itself is.

63
00:08:33,000 --> 00:08:43,000
And so I can sort of figure a graph and filter very quickly because all the text lines have a particular format.

64
00:08:43,000 --> 00:08:49,000
And then people spend quite a bit of time building some infrastructure to make it all easier.

65
00:08:49,000 --> 00:08:59,000
If you come to one of the TAs, the Jose, when you took the class, he actually built some software to make it a little bit of a personal script section, easier to actually part of locks.

66
00:08:59,000 --> 00:09:03,000
And I thought it may be interesting to see what he did.

67
00:09:03,000 --> 00:09:12,000
So I'm going to stop sharing and ask Jose to share and maybe demo like how his long structure works.

68
00:09:12,000 --> 00:09:14,000
I have a follow up question.

69
00:09:14,000 --> 00:09:21,000
So how do you make the debugging prints go into a log rather than the standard out.

70
00:09:21,000 --> 00:09:26,000
Oh, you're bigger than two and I output it to file.

71
00:09:26,000 --> 00:09:29,000
So so do you just pipe everything into a file.

72
00:09:29,000 --> 00:09:31,000
Yes, I pipe everything into a file.

73
00:09:31,000 --> 00:09:35,000
Got it. Thank you.

74
00:09:35,000 --> 00:09:39,000
So I can use Jose screen and Jose go ahead.

75
00:09:39,000 --> 00:09:42,000
And then I can hear him again.

76
00:09:42,000 --> 00:09:44,000
Yeah, I can hear it.

77
00:09:44,000 --> 00:09:45,000
Okay. Awesome.

78
00:09:45,000 --> 00:09:49,000
And I'll say as I kind of agree on all kinds of points.

79
00:09:49,000 --> 00:09:54,000
I think it's very similar to like how France was describing them a pretty aggressive bloggers.

80
00:09:54,000 --> 00:09:59,000
I try to kind of just walk every single event that that is going on.

81
00:09:59,000 --> 00:10:04,000
And again, I also have like a kind of like a format that I follow.

82
00:10:04,000 --> 00:10:09,000
And I went about making my life easier going and passing through the logs.

83
00:10:09,000 --> 00:10:14,000
The high level idea is I do very simple structuring in go.

84
00:10:14,000 --> 00:10:23,000
And then I usually dump that the standard out or to a file and then I use Python scripts to actually do the kind of like all the coloring and the structuring.

85
00:10:23,000 --> 00:10:29,000
Since that's much easier to do in Python that in that it go.

86
00:10:29,000 --> 00:10:33,000
And so here's for example, what I get out of when I run a testing goal.

87
00:10:33,000 --> 00:10:39,000
So when I enable the bribalsity, I just get like an output that looks something like this.

88
00:10:39,000 --> 00:10:48,000
And here what I'm logging is kind of like the number of milliseconds is the first column that's pretty useful when you're trying to the back timer events.

89
00:10:48,000 --> 00:10:52,000
Things like that or trying to see how long an RPC takes to fail.

90
00:10:52,000 --> 00:10:56,000
Then the second column is what I like to call topics.

91
00:10:56,000 --> 00:11:02,000
They are not levels because they are no there's no hierarchy between them. They're just related to different events in rock.

92
00:11:02,000 --> 00:11:07,000
Probably a lot of you right now have realized that in rather is a lot of things going on.

93
00:11:07,000 --> 00:11:14,000
Like timers, there's elections, there's like log things being applied communication with the same machine.

94
00:11:14,000 --> 00:11:17,000
And all of those events happen with a slightly different frequencies.

95
00:11:17,000 --> 00:11:29,000
So if you want to later just like select some of them or like decide to ignore the more verbose ones, it's really handy to just have like that in that you're either.

96
00:11:29,000 --> 00:11:39,000
And then the third column probably a lot of you have something like this is with server like who is saying this message because without that is really hard to which and what is going on.

97
00:11:39,000 --> 00:11:45,000
And the rest is just like a free for message that explain kind of like what this message is about.

98
00:11:45,000 --> 00:11:54,000
And even though this is kind of just the very initial test that you run the one that just test that you can do an election.

99
00:11:54,000 --> 00:11:59,000
You actually have to like read to follow what the logic is going on here.

100
00:11:59,000 --> 00:12:25,000
And I made this easier in kind of like first approach. And this is what I think when I took the class was just convert all the topics into colors like most more internal supports like why the way of color support and again by doing this in Python, you can use some fantastic libraries that do all the heavy lifting so you don't have to get in the in the weeds of doing this.

101
00:12:25,000 --> 00:12:36,000
And here I just have included different events with different colors. And as you get more familiar with the colors, for example, here all the time, there's events and gray so maybe they're easier to ignore.

102
00:12:36,000 --> 00:12:43,000
We are looking for when someone is voting, we can look at like C and which related to both.

103
00:12:43,000 --> 00:12:53,000
And that like we'll just encode visually things that are much easier to pick up like for example here, Jello is when we in next election you leader.

104
00:12:53,000 --> 00:13:03,000
We still have to decide who is saying what and in order to do that what I incorporate is just having different columns.

105
00:13:03,000 --> 00:13:19,000
And again, what I'm doing is just running here like what I'm doing just running this standard best script and then just typing that into like the script that I wrote in this case, I'm specifying that I have three columns because of like three years in this test case.

106
00:13:19,000 --> 00:13:31,000
I have now decided to ignore the timer like the events with the timer topic because there are like too many of them and if time in logic is working, we probably don't need them to the back what is going on.

107
00:13:31,000 --> 00:13:51,000
And if you look at this law compared to what we did playing text log is fairly easy to see that what's going on is like three servers are starting the last one is becoming a candidate that their two are voting for that it's becoming a leader as soon as it gets the first vote and then it's just hard bits through the rest of the test.

108
00:13:51,000 --> 00:14:01,000
And there's nothing else to look at here, but now again, compared to this kind of like an order of magnitude easier to pick up what is going on.

109
00:14:01,000 --> 00:14:05,000
And as you tweak that to your liking it becomes more and more efficient.

110
00:14:05,000 --> 00:14:32,000
And as you move to like harder test because a lot of you have probably have had to look at the logs of the backup at this in the to be loud, there will be lots and lots of events going on and even kind of even if you log what you need it might become like a daunting tasks going through like thousands of lines of logs just searching for the point of failure and trying to reach out what's going on.

111
00:14:32,000 --> 00:15:01,000
Again, if we look just like make this up kind of like a simpler format to visualize we can quickly see what's going on we just have like five different servers that are starting the first one is becoming a candidate, the other ones are voting for it becoming a leader and by looking at the different columns against, for example, all like purple encodes whenever something is committed or applied so we can see that a new entry is.

112
00:15:01,000 --> 00:15:29,000
And this this servers are receiving it and because backup and two has like a very very boss log I have and a lot of drop RPCs i'm also ignoring those topics here and as the test goes on we can start reaching in about what's going on so so fairly helpful to just have like some print statements of the back statement in the test code you just can modify there.

113
00:15:29,000 --> 00:15:53,000
To know what the test is doing for example here the test that takes the first server as you is the leader and then disconnects s2 through s4 which are like the three on the right side and that's pretty much what happens we just get like a stream of entries that won't be committed because there's only two servers that can talk to each other and then after a while.

114
00:15:53,519 --> 00:16:02,000
We see that the first two are now disconnected and the the three on the right are reconnected and now they come form a majority.

115
00:16:02,600 --> 00:16:18,519
And that's what we will see like the last one becomes a candidate that tips a majority and kind of repeatedly we see this color pattern of like green purple purple kind of like this staircase signifying that oh yeah receiving an entry.

116
00:16:18,919 --> 00:16:35,279
i'm propagating it through the other servers and the disconnected servers here converting to a candidate and hopefully i've convinced you by now by just slightly changing the presentation of your logs kind of like the mental effort to like go to them.

117
00:16:35,360 --> 00:16:55,959
Can significantly decrease and even though this is like really fancy there's no lot of like fancy going on i just use some of the self python libraries really rich and kind of all fits in our like a hundred lines of python script and if you're interested i.

118
00:16:56,519 --> 00:17:15,200
Roll like a block pause that will be linking on the website on the apps about kind of like the the steps to build a tool like this and kind of how it all fit together some like some like the sign decisions related to that and anyone has like any questions specific to this happy to answer them.

119
00:17:23,600 --> 00:17:24,200
Any questions for.

120
00:17:26,279 --> 00:17:36,840
Yeah, I have a question what about general logging so I know that I had some bugs that when I put in the logging there were no longer there.

121
00:17:38,000 --> 00:17:44,240
Because of some timing issue or perhaps a concurrency issue so what what do we do then.

122
00:17:44,599 --> 00:17:58,960
Okay, so there's a couple things I do, first of all, one reason I log it's sort of a fine grain always at the same level of granularity and the fine grained lever in the early so I always have a trace of everything and I generally don't have to go back.

123
00:18:00,400 --> 00:18:13,000
The other thing to do is I do run the test many, many, many times and they save all logs and then once I hit the wrong one once I hit a bug then you know study that particular log.

124
00:18:15,079 --> 00:18:23,359
And so for example, if I run something overnight I just save all the logs from all the runs overnight and then grab the one that you know failed.

125
00:18:28,039 --> 00:18:33,480
Any further questions on the topic of logging.

126
00:18:38,000 --> 00:18:41,000
Okay, good let me proceed.

127
00:18:41,000 --> 00:18:56,000
But before again, you know looking at code I want to talk a little bit about the structure that my particular solution has and this is definitely not the only structure you can do with many, many different ways and you're free to actually do it in many different ways.

128
00:18:57,000 --> 00:19:09,000
And the fact that every year when I teach a class, you know, I actually try to rewrite write implement the labs again and often experiment with different types of ways of implementing it.

129
00:19:09,960 --> 00:19:22,119
So the one I will share you with you today is one that I wrote over IP, you know, sort of getting ready for eight to four and then has the following structure and some pretty standard structure.

130
00:19:23,000 --> 00:19:31,400
You know, when you draw a box, you know, signifying the draft library, you know, there's two basically.

131
00:19:32,400 --> 00:19:42,400
API calls great one start to initiate an append entries and initiate a logging operation in one to actually.

132
00:19:43,400 --> 00:19:47,400
And output, you know, that goes through the apply channel.

133
00:19:49,400 --> 00:19:57,400
And then in, you know, the one that we're showing you have basically one, essentially one structure, the draft structure.

134
00:19:58,400 --> 00:20:10,400
That basically has all the state of the of the graph library, you know, the all the sort of variables that are in the bigger two and basically have one lock on this guy.

135
00:20:12,400 --> 00:20:26,400
And basically all my, so you quite course rate walking, you know, all my RC handlers, all my, you know, start take basically this one lock, do whatever their stuff they need to be do, do and then.

136
00:20:27,400 --> 00:20:37,400
Release the lock on so there's a couple of frets that sort of running around one, of course, is the ticker for it that we sort of gave you.

137
00:20:38,400 --> 00:20:53,400
And you know that just waits as I'll show you in a second that will wait for you know some number of milliseconds 50 milliseconds and then run and then check you know periodically if any time out election time has gone off and then does whatever needs to be done.

138
00:20:54,400 --> 00:21:04,400
I have one threat dedicated to writing on the apply channel, so no other threat actually writes to the apply channel there's only single one and a basically sleeps on a condition variable.

139
00:21:04,400 --> 00:21:32,400
And so when for example, a new append entry comes in from the leader and the commit index goes up, then you know the thread that thread will wake up on the signal in the condition variable that will wake up the thread that actually looks at the apply that writes on the apply channel, it will grab whatever entry out of the log and stick them on the apply channel.

140
00:21:35,400 --> 00:21:44,400
And so that's one and the reason I have a single thread is that of course you can't hold locks while writing across the apply channel release you know like in cars, some problems later.

141
00:21:45,400 --> 00:21:49,400
And so I just have a single thread that actually writes on the apply channel.

142
00:21:50,400 --> 00:22:13,400
Then the course you know number of things coming in from the outside required messages coming in and of course each message or each RPC you know start your own threat or go well, you know, RPC library will basically start a threat for every incoming message and basically the way I process every incoming messages and the first thing that graph the log on the raster.

143
00:22:14,400 --> 00:22:25,400
It reads a right you know the raster and then when it's done you have to release the log and maybe lock and maybe in between it will update you know signal in the condition variable to.

144
00:22:27,400 --> 00:22:38,400
Then you know of course like start itself runs on a particular thread so it jumps into the rath library you know the same thing you know acquire the lock and then let me.

145
00:22:39,400 --> 00:23:02,400
A Penti entry if it's the leader you know append it to the log in the lock structure and then sends off you know the sent RPC the append RPCs and since I want to do the append RPCs in parallel basically what it works is that you know for every RPC I start a separate thread.

146
00:23:02,400 --> 00:23:18,400
And that art and that thread actually is responsible for sending it reserving the response and in the response you know doing any updating that is necessary to the rath structure so response handler or when the response comes in you know we'll grab the.

147
00:23:18,400 --> 00:23:35,400
Rath lock and then do whatever update necessary to the rath state and then release the lock so so there's a bunch of threats quite a number of threats that can be running around right because of message and maybe late you know and so there may be many many many many friends here.

148
00:23:35,400 --> 00:23:43,400
And there might be you know multiple starts there might be a start outstanding and so they might be multiple friends there and of course the ticker you know also start.

149
00:23:43,400 --> 00:23:52,400
So, uh, uh, may send hard beats and those hard beats know again again you know turn into a separate threat.

150
00:23:52,400 --> 00:23:54,400
But all those threats are basically.

151
00:23:54,400 --> 00:24:08,400
Surreledged by the rath lock or my rath lock serializes.

152
00:24:08,400 --> 00:24:19,400
And so when I create a print network law and messages you know of course that is inside you know done by holding the rath lock and since you know sort of every front runs one by one.

153
00:24:19,400 --> 00:24:25,400
And all the log messages will make a lot of sense you know they do they all serialize to.

154
00:24:25,400 --> 00:24:29,400
Similar I make all our sea handlers.

155
00:24:29,400 --> 00:24:48,400
Atomic or serialized so no fine drain locking and that helps and I'll talk about it in a second and then the only sort of thing that you know you have to be a little bit careful with if you do sort of this core spade locking is that you can get into dead locks and particularly you can have a dead lock if you hold locks across.

156
00:24:48,400 --> 00:24:58,400
RPCs and so I never hold no locks across RPCs.

157
00:24:58,400 --> 00:25:06,400
And as partially achieved your as a surprise as a cheese this is side effect of really starting a new threat for every RPC.

158
00:25:06,400 --> 00:25:22,400
So that's sort of the overall structure of this particular solution that I will share in a second with you again other structures are possible but hopefully it's good for you some some ideas any questions about this.

159
00:25:22,400 --> 00:25:30,400
What were the threads on the right on the right these guys yeah those are the incoming messages.

160
00:25:30,400 --> 00:25:36,400
So like a pen RPC a photo pen RPC request or a vote request.

161
00:25:36,400 --> 00:25:40,400
I think it's only to.

162
00:25:40,400 --> 00:25:43,400
I also have a question.

163
00:25:43,400 --> 00:25:52,400
What's the is there a benefit of having a single thread sleeping on the condition variable and then.

164
00:25:52,400 --> 00:26:02,400
So having only that thread a thread sending to apply channel compared to having each RPC thread.

165
00:26:02,400 --> 00:26:10,400
Send to the apply channel well you everything has to go in order from the apply channel right so the whole log that you are made.

166
00:26:10,400 --> 00:26:16,400
The entire structure has to be sent on the apply channel exactly in order as the entries are in the log.

167
00:26:16,400 --> 00:26:22,400
And so that's just more easier to do I find it easier to do with the single thread.

168
00:26:22,400 --> 00:26:28,400
Is that that basically goes through the path log and just sticks to one by one the entries onto the apply channel.

169
00:26:28,400 --> 00:26:32,400
And there's no further coordination necessary.

170
00:26:32,400 --> 00:26:34,400
That makes sense.

171
00:26:34,400 --> 00:26:37,400
You know, it's like if you will you know.

172
00:26:37,400 --> 00:26:45,400
This goes like up into the service that actually uses the right library.

173
00:26:45,400 --> 00:26:52,400
Okay, so one more word about this sort of fine grain versus coarse grain.

174
00:26:52,400 --> 00:27:01,400
Some of you like a common mistake early on you know when you haven't done that much you know a parallel programming.

175
00:27:01,400 --> 00:27:06,400
You might like if you have your RPC struct.

176
00:27:06,400 --> 00:27:15,400
You know maybe you have like the log and some other fields and you know some people or sometimes you know there's a temptation or not unreasonable.

177
00:27:15,400 --> 00:27:22,400
You have multiple walks so instead of having a single.

178
00:27:22,400 --> 00:27:25,400
Or even have a single one.

179
00:27:25,400 --> 00:27:36,400
But not really hold it for a long time.

180
00:27:36,400 --> 00:27:39,400
And.

181
00:27:39,400 --> 00:27:43,400
And I think in general that my reasoning about the code a little bit hard.

182
00:27:43,400 --> 00:27:50,400
So so example of common thing that you know that you might do it in is like if you have a hard PC handler like like this.

183
00:27:50,400 --> 00:27:53,400
And then where.

184
00:27:53,400 --> 00:27:56,400
Whatever hard is.

185
00:27:56,400 --> 00:27:58,400
You know, reply.

186
00:27:58,400 --> 00:28:00,400
I'm just catching this out.

187
00:28:00,400 --> 00:28:05,400
You know, and you might you know, you might do like you know whatever you walk.

188
00:28:05,400 --> 00:28:15,400
Do something you know with the arguments maybe you know update some state you know in the raft structure and do a new unlock.

189
00:28:15,400 --> 00:28:24,400
And then you do some other stuff that is not maybe directly related to the raft structure and then basically maybe grab the lock again.

190
00:28:24,400 --> 00:28:29,400
And then you know whatever update and read maybe the raft structure again and then the unlock.

191
00:28:29,400 --> 00:28:33,400
And all your sort of in a single RPC handler.

192
00:28:33,400 --> 00:28:36,400
And.

193
00:28:36,400 --> 00:28:43,400
Just as a sort of thought exercise again what is risky about this sort of style of fine rate walking.

194
00:28:43,400 --> 00:28:54,400
And then this is a little bit artificial, but you know, just a reasonable common sort of early mistake that you know you might make.

195
00:28:54,400 --> 00:29:00,400
You have to like recheck your assumptions before locking again every time right.

196
00:29:00,400 --> 00:29:02,400
Yeah, you know, basically this executes.

197
00:29:02,400 --> 00:29:07,400
It's automatically this executes it, it's automatically a lot of things can happen in between right.

198
00:29:07,400 --> 00:29:11,400
So, for example, new RPCs might have been coming in.

199
00:29:11,400 --> 00:29:20,400
And they might be running to and they might actually have been updating the raft struct or the raft state between you know these two critical sections.

200
00:29:20,400 --> 00:29:22,400
And team one and two.

201
00:29:22,400 --> 00:29:31,400
And so by the time you know to the you start running critical section two, the raft structure might be completely different and how it can make completely different content.

202
00:29:31,400 --> 00:29:35,400
And sort of to avoid you know those kinds of situations.

203
00:29:35,400 --> 00:29:42,400
You know my general approach is to basically you know basically have this to be one critical one critical section.

204
00:29:42,400 --> 00:29:49,400
So I don't have to recheck any I don't have to reset the state at the new one the second.

205
00:29:49,400 --> 00:29:53,400
Critical section starts.

206
00:29:53,400 --> 00:29:56,400
Does that make sense?

207
00:29:56,400 --> 00:29:59,400
And this problem shows up in different you know.

208
00:29:59,400 --> 00:30:04,400
Or this problem can show up in different fashion in different ways.

209
00:30:04,400 --> 00:30:10,400
But you know sort of doing or lying problems always the same you know you do a lot of fine grain blocking you're going to have additional interleavings.

210
00:30:10,400 --> 00:30:16,400
And you have to consider and make sure that there that you don't have a incorrect.

211
00:30:16,400 --> 00:30:22,400
And the living that result in incorrect behavior.

212
00:30:22,400 --> 00:30:34,400
I want to ask is it but it's not possible to avoid rechecking conditions after you send an RPC right inside the RPC thread.

213
00:30:34,400 --> 00:30:44,400
Yeah, you you you cannot hold the lock while sending correct so like you should not you know year you should not call whatever you know send RPC.

214
00:30:44,400 --> 00:30:53,400
Because you can't do that while holding a lock because they can easily result in deadlock right you holding the lock you send it to appear and RPC while still holding the lock to peer actually.

215
00:30:53,400 --> 00:31:09,400
Since it RPC to you but you're holding you know the you wrote the leader already holds the lock on our structure so the response cannot be processed and maybe you know the two are interdependent and when you have a deadlock.

216
00:31:09,400 --> 00:31:25,400
One thing that's worth noting is something I saw some people doing is that they spin off a thread they have to send an RPC in that thread they take the lock to prepare the arguments for the RPC and then they send the RPC without lock.

217
00:31:25,400 --> 00:31:38,400
And you can do that but it's often there's often fewer interleavings if you generate the arguments for the RPC before you spit off the thread that actually sends it.

218
00:31:38,400 --> 00:31:42,400
Good point I will see you will show you this will show up in a second actually and.

219
00:31:42,400 --> 00:31:59,400
But doesn't that cause so sometimes it's actually depending on the implementation I think it's beneficial for other RPCs to see the changes like for example if other RPCs made progress you want to start off from the most recent last log index.

220
00:31:59,400 --> 00:32:09,400
Perhaps it depends on exactly what you do and how your implementation works.

221
00:32:09,400 --> 00:32:19,400
I don't do that at least I don't think I do what you're suggesting when I send an RPC to all the peers all the peer from going to get exactly the same arguments.

222
00:32:19,400 --> 00:32:26,400
No changes in between.

223
00:32:26,400 --> 00:32:36,400
Okay, good. So let me then talk a little bit about the implementation can people read can people read the screen.

224
00:32:36,400 --> 00:32:39,400
Sorry, I have a follow up.

225
00:32:39,400 --> 00:32:46,400
So I think you mentioned that we shouldn't lock around sending things over the plie channel.

226
00:32:46,400 --> 00:33:05,400
Although I let me it's risky because like while you're holding the lock right and you send on the apply channel you might also block on sending on the apply channel because the service you must the other side must be reading correct before your own walk.

227
00:33:05,400 --> 00:33:13,400
Of course you have buffer can unbuffered you know that changes a little bit but let's say we have a not a buffer channel was just an unbuffered channel.

228
00:33:13,400 --> 00:33:16,400
But the reader.

229
00:33:16,400 --> 00:33:18,400
If there's no reader.

230
00:33:18,400 --> 00:33:21,400
Then this writer will block.

231
00:33:21,400 --> 00:33:31,400
And maybe holding the lock and that might be you know, may lead to problems later and lead to deathlocks.

232
00:33:31,400 --> 00:33:44,400
So I think that is isn't this all right like like the apply channel will never like the client who's calling raft won't ever hold the lock right there like.

233
00:33:44,400 --> 00:33:46,400
You don't not not true.

234
00:33:46,400 --> 00:33:54,400
Actually, these are sort of service quick sitting on top calling start and reading from the apply channel.

235
00:33:54,400 --> 00:34:03,400
But it's called start and start is just going to be depending on how you do it's going to start is a threat comes into with that threat into the raft library and you're at least in my invitation.

236
00:34:03,400 --> 00:34:10,400
The first thing that the start function does is actually grab the raft lock.

237
00:34:10,400 --> 00:34:17,400
And it can't grab the lock raft lock if it actually either the apply Fred is already holding it's trying to get something on the apply channel.

238
00:34:17,400 --> 00:34:21,400
But the server is now won't read from the apply channel depending on how you set it up.

239
00:34:21,400 --> 00:34:25,400
But I mean, as you're saying, there is a risk here you've got to be a little bit careful.

240
00:34:25,400 --> 00:34:29,400
So would the solution be just to like create a new thread.

241
00:34:29,400 --> 00:34:32,400
Yes, there's all kinds of possible solutions here.

242
00:34:32,400 --> 00:34:42,400
So I'm warning you that you know, there's learning you that you have to think a little bit about how you range this.

243
00:34:42,400 --> 00:34:44,400
Okay.

244
00:34:44,400 --> 00:34:55,400
Well, isn't isn't using a single thread not sufficient because the thread that puts it onto the apply channel will still be looking at date right so long it still need to acquire the lock.

245
00:34:55,400 --> 00:35:06,400
But let me look back off in your middle it's easy to see that the deadlocks here correct like if you're in the apply channel you're not reading from the apply channel because you're causing your calling start.

246
00:35:06,400 --> 00:35:09,400
Like maybe I get because there's a.

247
00:35:09,400 --> 00:35:18,400
And start can run because the guy actually hold the lock that they can't actually unlock because they can't write to the fly channel because there's no reader.

248
00:35:18,400 --> 00:35:21,400
There's easy to construction areas where you can get into the deadlocks.

249
00:35:21,400 --> 00:35:31,400
Of course, you can avoid all these deadlocks that that's the whole goal and one way to avoiding these deadlocks is actually not the whole block while writing on the channel.

250
00:35:31,400 --> 00:35:34,400
There are other ways of doing it too.

251
00:35:34,400 --> 00:35:41,400
I just don't tell you in my implementation, you know, I find a convenient not to have the whole box while writing on a channel.

252
00:35:41,400 --> 00:35:50,400
I think in general it's bad practice.

253
00:35:50,400 --> 00:35:56,400
Okay, back to crude.

254
00:35:56,400 --> 00:35:57,400
Okay, good.

255
00:35:57,400 --> 00:36:05,400
So I'm going to show you one particular implementation and again, you know, this is an implementation that I wrote over January to get ready for the class.

256
00:36:05,400 --> 00:36:08,400
So there's nothing particularly special about it.

257
00:36:08,400 --> 00:36:15,400
I'm purely for myself and I'm sure you know there are things in it that you were to violently object to.

258
00:36:15,400 --> 00:36:18,400
But you know it gives you sense you know what I did.

259
00:36:18,400 --> 00:36:19,400
So here I go.

260
00:36:19,400 --> 00:36:24,400
So in terms of the raft structure, I basically you know copy figure two.

261
00:36:24,400 --> 00:36:28,400
Usually see in the code that's going to be a lot of figure two in the code.

262
00:36:28,400 --> 00:36:39,400
And you know the here's the main thing you may probably the main thing to point out is like here's the big new text is the rap lock that my code will acquire or release all over the place, but in a very coarse rate manner.

263
00:36:39,400 --> 00:36:46,400
And the rest is just, you know, exactly as you expect, you know, the persistent state of all text state, the leader state and some snapshot state.

264
00:36:46,400 --> 00:36:52,400
I won't talk much about snapshot at all since you know that was really due for Friday.

265
00:36:52,400 --> 00:36:54,400
And that's basically it.

266
00:36:54,400 --> 00:37:12,400
Then the interesting I'm just going to go bottom off sort of like in the beginning, you know what happens. So at some point the tester.

267
00:37:12,400 --> 00:37:19,400
So I'm going to go to the next one.

268
00:37:19,400 --> 00:37:21,400
I'll go to the next one.

269
00:37:21,400 --> 00:37:23,400
I'm going to go to the next one.

270
00:37:23,400 --> 00:37:25,400
And here's the last one.

271
00:37:25,400 --> 00:37:26,400
And here's the last one.

272
00:37:26,400 --> 00:37:28,400
And here's my.

273
00:37:28,400 --> 00:37:30,400
Basically the make call.

274
00:37:30,400 --> 00:37:33,400
It constructs, you know, the raft state.

275
00:37:33,400 --> 00:37:36,400
You know, apply channel, the condition variable that I mentioned.

276
00:37:36,400 --> 00:37:37,400
It sets itself to a follower.

277
00:37:37,400 --> 00:37:40,400
Initially some other parts, you know, make an empty log.

278
00:37:40,400 --> 00:37:46,400
And then basically for stuff to go routines, want to do a prior.

279
00:37:46,400 --> 00:37:49,400
That's the the threat that actually writes in the apply channel.

280
00:37:49,400 --> 00:37:58,400
And then I got my the ticker that we basically gave you to the basically runs the ticker code.

281
00:37:58,400 --> 00:38:01,400
So nothing particularly exciting going on here.

282
00:38:01,400 --> 00:38:05,400
So let's look at the ticker goat.

283
00:38:05,400 --> 00:38:11,400
So some people ask, you know, should you structure everything in a single file multiple files.

284
00:38:11,400 --> 00:38:15,400
Of course, it all up to you what actually is most convenient for you to actually find your goats.

285
00:38:15,400 --> 00:38:18,400
In this case, I structured with multiple files and a half.

286
00:38:18,400 --> 00:38:25,400
Basically, vote the go deals with all the election part.

287
00:38:25,400 --> 00:38:29,400
So let's look at the ticker.

288
00:38:29,400 --> 00:38:32,400
So the ticker basically runs every 50 milliseconds.

289
00:38:32,400 --> 00:38:35,400
And it calls this function tick.

290
00:38:35,400 --> 00:38:38,400
And the function tick is like right up here.

291
00:38:38,400 --> 00:38:48,400
It grips, you know, you'll see that all over the place it graphs the graph log calls uses deferred to make sure that like no matter way I leave the function.

292
00:38:48,400 --> 00:38:51,400
The lock actually will be released.

293
00:38:51,400 --> 00:38:54,400
And then you know checks what it is the leader.

294
00:38:54,400 --> 00:38:58,400
And it is a leader does one thing. It's not a leader that means that's a faller.

295
00:38:58,400 --> 00:39:03,400
And it just checks what are actually the election time has passed.

296
00:39:03,400 --> 00:39:08,400
And so basically the way a compute that is like I get the current time.

297
00:39:08,400 --> 00:39:12,400
And see if the current time is actually past the.

298
00:39:12,400 --> 00:39:17,400
If now is now past the election time.

299
00:39:17,400 --> 00:39:20,400
And if that is the case, I'll start the election.

300
00:39:20,400 --> 00:39:24,400
And well, first I'll set the election time out again.

301
00:39:24,400 --> 00:39:26,400
As required by figure two.

302
00:39:26,400 --> 00:39:29,400
And then they'll start the election.

303
00:39:29,400 --> 00:39:32,400
In terms of setting the election time out.

304
00:39:32,400 --> 00:39:40,400
So the first thing, you know, the way I do it, you know, I election time out of the set to one second, which is what I got from.

305
00:39:40,400 --> 00:39:42,400
I can hold on a second on the L.

306
00:39:42,400 --> 00:39:44,400
That's a good reason.

307
00:39:44,400 --> 00:39:47,400
And then I can hold on a second from the chat.

308
00:39:47,400 --> 00:39:50,400
The, the.

309
00:39:50,400 --> 00:39:52,400
The selection time is one second.

310
00:39:52,400 --> 00:39:58,400
And then of course, you know, you need to randomize, you know, the peers across the interval.

311
00:39:58,400 --> 00:40:02,400
And I use an interval from zero to 300 milliseconds.

312
00:40:02,400 --> 00:40:04,400
And add that to the election time out.

313
00:40:04,400 --> 00:40:09,400
And so basically every peer likely has to have has a slightly different election time out.

314
00:40:09,400 --> 00:40:15,400
And so they will call take a different stages and you know, we had a bit of luck.

315
00:40:15,400 --> 00:40:19,400
Only one or a few actually will start the election.

316
00:40:19,400 --> 00:40:21,400
I have a question.

317
00:40:21,400 --> 00:40:26,400
So you're only like checking every like 50 milliseconds, right?

318
00:40:26,400 --> 00:40:29,400
Doesn't that lead to like contest of like elections?

319
00:40:29,400 --> 00:40:33,400
Like because you're essentially like, it doesn't just like limit.

320
00:40:33,400 --> 00:40:38,400
Like, you know, you technically can like get.

321
00:40:38,400 --> 00:40:43,400
Anywhere from three to like zero to 300 right like.

322
00:40:43,400 --> 00:40:51,400
Like you get from one second to 300 and one second to any value between 1000 milliseconds of 1300 milliseconds.

323
00:40:51,400 --> 00:40:52,400
Right.

324
00:40:52,400 --> 00:41:00,400
So, but at the end of the day, like, because you're like only checking every 50 milliseconds doesn't that just give it like.

325
00:41:00,400 --> 00:41:03,400
I just more course rate, but it's good enough.

326
00:41:03,400 --> 00:41:04,400
Okay.

327
00:41:04,400 --> 00:41:06,400
I mean, basically too constraints here, correct?

328
00:41:06,400 --> 00:41:09,400
You know, you don't want to be too slow.

329
00:41:09,400 --> 00:41:13,400
And because that means that you're takes a long time before you start a new election.

330
00:41:13,400 --> 00:41:17,400
And you don't want to be too fast because you know, then you start too many elections.

331
00:41:17,400 --> 00:41:21,400
And you need to allow for some time for an election to lose some, you know,

332
00:41:21,400 --> 00:41:23,400
some votes may get delayed.

333
00:41:23,400 --> 00:41:32,400
And you don't want to restart it before, you know, you have a chance before the candidate has chance to sort of do a couple of rounds of communication with the followers.

334
00:41:32,400 --> 00:41:35,400
Okay.

335
00:41:35,400 --> 00:41:39,400
So, somebody or people are speculating about my capital L.

336
00:41:39,400 --> 00:41:42,400
This was just an experiment, you know, for this implementation.

337
00:41:42,400 --> 00:41:48,400
I follow the convention and I probably broke it in some places, but I followed the consumption that.

338
00:41:48,400 --> 00:41:57,400
If the caller or the colleague assumes that the lock is held, then I put a capital L behind the function.

339
00:41:57,400 --> 00:42:08,400
And I thought I would start election, the assumes that the caller actually is required to lock and basically any function or structure of an L has that particular, you know, assumes that convention.

340
00:42:08,400 --> 00:42:12,400
And so this is purely a coding convention for myself.

341
00:42:12,400 --> 00:42:15,400
And I thought it was sort of interesting to write it up in this implementation.

342
00:42:15,400 --> 00:42:21,400
I not always do that, but I just did it in this one.

343
00:42:21,400 --> 00:42:23,400
Any questions?

344
00:42:23,400 --> 00:42:29,400
Okay.

345
00:42:29,400 --> 00:42:35,400
Okay. Well, let's look at the election part and you'll see here start election.

346
00:42:35,400 --> 00:42:42,400
So, you know, it doesn't require a lock, but because I assume the caller holds it and basically just follows figure two.

347
00:42:42,400 --> 00:42:48,400
So, first, you know, the rule is you have to increment the current term by once I do that.

348
00:42:48,400 --> 00:42:58,400
I set the state to candidates, you know, also dictated by figure two, basically, I record that I voted for myself. This is also part of figure two.

349
00:42:58,400 --> 00:43:08,400
And then, you know, this is for lap C, you know, to see you ready to know that like whenever you change, basically state that's to be persistent, you have to persist at right after.

350
00:43:08,400 --> 00:43:19,400
So, that's it. And basically here in here, you see my debugging messages, like, you know, what Jose says, you know, I always have to source at the beginning and just simplifies my life.

351
00:43:19,400 --> 00:43:31,400
And I have a bunch of other sort of, I don't have a perilscript or reply transcript is nicely used Jose, but I have a bunch of sort of unique scripts that I use to parse the law and create a process it.

352
00:43:31,400 --> 00:43:37,400
And then, you know, we call request votes and request votes is right up here.

353
00:43:37,400 --> 00:43:48,400
And we'll see in second, you know, how this is all going to work out, but basically it as sales said, you know, we construct the arguments once, you know, upfront.

354
00:43:48,400 --> 00:43:53,400
And let me, so let's look at the request for the votes arguments.

355
00:43:53,400 --> 00:44:07,400
And basically, you know, your data here, and you know, basically it contains exactly, you know, what, you know, basically figure two says that you contain the term the candidate ID, the last block index and the last block term.

356
00:44:07,400 --> 00:44:20,400
And system struct and one thing maybe worth pointing out is I do try to write these string functions that, you know, allow go, you know, when you type in percent fee, you know, we'll call that string function on this struct.

357
00:44:20,400 --> 00:44:27,400
And it allows you to format, you know, the, the structure, the request in a sort of a nice way.

358
00:44:27,400 --> 00:44:31,400
And again, that helps with me, that helps me processing my law.

359
00:44:31,400 --> 00:44:37,400
And so basically every request argument that I have, I print in one standard way.

360
00:44:37,400 --> 00:44:46,400
And again, to simplify log processing.

361
00:44:46,400 --> 00:44:58,400
And then I put back to studying elections. So multiple followers who started at the same time, you know, they become one of them is hopefully starts first it becomes candidate.

362
00:44:58,400 --> 00:45:08,400
And it does request votes and here I construct the arguments, I put the current term in here, it's going to be one if this is the first time for the election, you know, who I am.

363
00:45:08,400 --> 00:45:17,400
And that's just one index is, you know, which usually is zero or one, whatever the, you know, it's going to be zero, I guess.

364
00:45:17,400 --> 00:45:24,400
And then the term in that entry, which is the term zero.

365
00:45:24,400 --> 00:45:33,400
Because, you know, what we're doing, correct, if we're running an election for one and you need to show what the previous ones were.

366
00:45:33,400 --> 00:45:42,400
Okay, so then here, this is sort of my standard way of sending RPCs, you just go for all the peers skipping myself.

367
00:45:42,400 --> 00:45:46,400
Of course, I have to count that I voted for myself. So I said the number votes to one.

368
00:45:46,400 --> 00:45:55,400
And then I basically fork off and Fred that basically is going to do actually the sending the RPC to each individual peer.

369
00:45:55,400 --> 00:46:07,400
The first argument is the peer to which the RPC sent they all get the same arguments and also passing the address with the votes so they can have a shared vote count.

370
00:46:07,400 --> 00:46:10,400
Any questions about this.

371
00:46:10,400 --> 00:46:18,400
So for request votes, the lock is being held and then you're sending the RPC.

372
00:46:18,400 --> 00:46:22,400
Yeah, so in request vote here is the lock XE health.

373
00:46:22,400 --> 00:46:25,400
So the first one is the one that's inside of dysfunction.

374
00:46:25,400 --> 00:46:28,400
No, right, because it's a new thread.

375
00:46:28,400 --> 00:46:29,400
Yeah, it's a new.

376
00:46:29,400 --> 00:46:36,400
So it doesn't hold the lock and you see my naming convention hints at that because it doesn't have an L there.

377
00:46:36,400 --> 00:46:41,400
Okay, so reused request votes and request votes when it actually is done running.

378
00:46:41,400 --> 00:46:48,400
It has no walks because only the parent held the lock and this guy this red actually hasn't acquired the lock yet.

379
00:46:48,400 --> 00:46:51,400
So I have a lock.

380
00:46:51,400 --> 00:46:57,400
So yeah, so so basically one Fred runs for each of these requests votes for each peer.

381
00:46:57,400 --> 00:47:05,400
It allocates a reply structure and then basically it sends off the RPC right and this is all done without holding the lock.

382
00:47:05,400 --> 00:47:08,400
And then at some point we get a response back.

383
00:47:08,400 --> 00:47:17,400
And then at that point in the response handler, I grabbed the lock right at the beginning and do whatever response handling that is necessary.

384
00:47:17,400 --> 00:47:28,400
And as you can see, yeah, you said earlier that you shouldn't hold the lock when you're doing like when you're doing a RPC call you mean like basically it's okay to.

385
00:47:28,400 --> 00:47:34,400
It's okay for the RPC call itself in the RPC call to do to hold a lock but not like while you're calling.

386
00:47:34,400 --> 00:47:39,400
Yeah, not not across this like why are you sending it across and cross sending it over to network.

387
00:47:39,400 --> 00:47:42,400
But it's okay if you're doing it within the RPC.

388
00:47:42,400 --> 00:47:52,400
So the reply handler like think about this is like ways through the reply handler running like so the response came back and now there's a reply and I have to process the reply.

389
00:47:52,400 --> 00:48:02,400
Oh no, I'm talking about like say in the request vote like the capital R requests capsule V votes that's okay to hold locks in there at least.

390
00:48:02,400 --> 00:48:04,400
Where you want to hold locks.

391
00:48:04,400 --> 00:48:08,400
So like so like capsule request votes here.

392
00:48:08,400 --> 00:48:10,400
Yeah, that's what I'm talking about.

393
00:48:10,400 --> 00:48:12,400
This one.

394
00:48:12,400 --> 00:48:14,400
No, like the function here.

395
00:48:14,400 --> 00:48:22,400
So it's request vote but it's I think it's capital R. Yeah.

396
00:48:22,400 --> 00:48:27,400
So like you probably have a method right it's the RPC call.

397
00:48:27,400 --> 00:48:30,400
I think you mean on the RPC on the receiver side.

398
00:48:30,400 --> 00:48:31,400
Okay, the other.

399
00:48:31,400 --> 00:48:37,400
Yeah, yeah, yeah, we'll look at it in a second of course that will run on the completely you know way to think about it runs on a totally different machine.

400
00:48:37,400 --> 00:48:39,400
Yeah, yeah, absolutely.

401
00:48:39,400 --> 00:48:48,400
So so basically it's two plays of our hope the lock like in the handler in the request handler and in the reply handler.

402
00:48:48,400 --> 00:48:50,400
Hey, thank you.

403
00:48:50,400 --> 00:48:55,400
Sorry, sorry for being confused and glad we clarified that.

404
00:48:55,400 --> 00:49:01,400
Okay, so grab the lock then put a print statement in the logs that I can know what's later on I can study it.

405
00:49:01,400 --> 00:49:09,400
And then of course you know the basic checks you know that you know you're actually figure two different things much about it.

406
00:49:09,400 --> 00:49:13,400
But you know this is the rule that applies to all.

407
00:49:13,400 --> 00:49:20,400
Service correct the term is bigger than the reply term is better than the current term.

408
00:49:20,400 --> 00:49:27,400
Then you got to switch to the follower state and to the term of the.

409
00:49:27,400 --> 00:49:29,400
And then you have to respond to you.

410
00:49:29,400 --> 00:49:31,400
I'll look at that in a second.

411
00:49:31,400 --> 00:49:43,400
So that basically you know if this is the candidate and it was talking to appear that actually was in a higher term and basically backs off and becomes a follower.

412
00:49:43,400 --> 00:49:45,400
Okay, so.

413
00:49:45,400 --> 00:49:53,400
So if you know the follow respond that saying that I'm granting my vote then I increment you know number votes that the shared vote got by one.

414
00:49:53,400 --> 00:49:57,400
It's totally safe to do correct because you know I'm holding the raft lock.

415
00:49:57,400 --> 00:50:09,400
And so this is a serialized so multiple thing that will happen correct this multiple responses will come back and they may run in parallel, but they will be serialized because of the raft lock.

416
00:50:09,400 --> 00:50:16,400
So add up the votes if the votes is longer than the you know if I have a majority of the votes then.

417
00:50:16,400 --> 00:50:24,400
And if I'm still in the same term as the start when I started out actually running the election.

418
00:50:24,400 --> 00:50:29,400
Then I'm going to become a leader and I'll send out you know the first round of heart beats.

419
00:50:29,400 --> 00:50:32,400
So I'll look in a second.

420
00:50:32,400 --> 00:50:37,400
I want to look at two things. Let's see what become leader is become leader you know right up here.

421
00:50:37,400 --> 00:50:44,400
You know has capital L because it's you know already holds the lock basically sets the state to the leader state.

422
00:50:44,400 --> 00:50:48,400
And initializes the next index.

423
00:50:48,400 --> 00:50:53,400
And the next index is a settling last lecture is basically guess and it's an optimistic guess.

424
00:50:53,400 --> 00:50:57,400
You know I just said it to whatever my last index is plus one.

425
00:50:57,400 --> 00:51:00,400
So basically I'm assuming that all the followers are up to date.

426
00:51:00,400 --> 00:51:04,400
And if they're not you know we'll see later they will back off.

427
00:51:04,400 --> 00:51:10,400
I'll back off on the appendentry sorry I reply.

428
00:51:10,400 --> 00:51:12,400
Okay good.

429
00:51:12,400 --> 00:51:14,400
So that's become leader.

430
00:51:14,400 --> 00:51:17,400
Let me look at new term.

431
00:51:17,400 --> 00:51:27,400
So new term is nothing really you know too exciting it basically says again we'll go to the next term that we supplied by the collar.

432
00:51:27,400 --> 00:51:41,400
I said voted for to minus one because I haven't voted yet in this term and I changed to my state to follow her because this is going to state that needs to be persistent I call persistent.

433
00:51:41,400 --> 00:51:55,400
Okay so this is sort of the candidate site and now we want to look at the fall arrest site or perhaps another candidate as I was running a election in parallel.

434
00:51:55,400 --> 00:52:05,400
So so here's the request vote handler and this is sort of running so this is the piece of code that runs on the other machine if you will correct or where.

435
00:52:05,400 --> 00:52:09,400
Where I just was confused about a little bit and answering that question.

436
00:52:09,400 --> 00:52:21,400
And you know you just could see the first thing it does this is a vote by the RPC library system correct and with its own thread and the first thing it does it actually grabs the lock on the raft structure.

437
00:52:21,400 --> 00:52:39,400
You know this follows literally the rules figure two you know this the rule for all servers correct if the term the argument the term in the argument is higher than my current term then I should switch you know to this new term and that's it.

438
00:52:39,400 --> 00:52:57,400
Then you're sort of the you know the instinct piece correct this is all related to figure eight see what it means to be or not eight see figure seven what it means to be up to date great you can only become a leader if you're up to date so I compute you know the up to date function and.

439
00:52:57,400 --> 00:53:11,400
And that's basically based on the last index work and the term in the last index and so it says up the date is my our the term in the arguments is equal to my term in the.

440
00:53:11,400 --> 00:53:22,400
The call the color the candidate has a last login that just equal a higher to my index so basically to turn for equal the longer lock should win.

441
00:53:22,400 --> 00:53:31,400
And or if you know the candidates is in a higher term period then he always wins the candidate wins.

442
00:53:31,400 --> 00:53:50,400
So that means to be up to date so compute up to date and then basically go through the different cases if the terms smaller than the current term that means that the color is behind and so I vote granted to false and then in the other case if I haven't voted or I voted you know already voted for this candidate.

443
00:53:50,400 --> 00:54:02,400
And you know the candidates is up to date then I give my vote and and reset the election time at.

444
00:54:02,400 --> 00:54:13,400
So why why is this the second case here the or the R voted for is our candidate ID.

445
00:54:13,400 --> 00:54:20,400
Because the the candidate may resend maybe the RPC was delayed.

446
00:54:20,400 --> 00:54:24,400
Yeah we're doing it or actually never made it right.

447
00:54:24,400 --> 00:54:34,400
And so you know this is basically checking so this allows me to vote twice for the same candidate but I can't vote for any other candidate.

448
00:54:34,400 --> 00:54:54,400
So just to double check the logic here so if we have the candidate has a term that is bigger than the current term we obviously have to convert to follower and update the term to the term of the candidate but we don't automatically grant them vote unless their log is at least is up to date.

449
00:54:54,400 --> 00:54:55,400
Yeah.

450
00:54:55,400 --> 00:54:58,400
I talked about that.

451
00:54:58,400 --> 00:55:03,400
I'm also wondering is voted for every set to minus one.

452
00:55:03,400 --> 00:55:10,400
Yep when they go to new term ever always I knew said it always whenever you go to the new term.

453
00:55:10,400 --> 00:55:11,400
Okay.

454
00:55:11,400 --> 00:55:16,400
I said it's the one place where this happens.

455
00:55:16,400 --> 00:55:24,400
Any questions.

456
00:55:24,400 --> 00:55:32,400
So this is probably a reasonable good sense about the overall structure and everything else falls to sort of roughly the same structure.

457
00:55:32,400 --> 00:55:41,400
And so let's go back and go here so let's see you know let's assume this guy actually the leader or the candidate wins the election.

458
00:55:41,400 --> 00:55:44,400
So it started the election go trace back.

459
00:55:44,400 --> 00:55:47,400
So we started the election.

460
00:55:47,400 --> 00:55:50,400
So we got the votes.

461
00:55:50,400 --> 00:56:03,400
And we won the election and we became the leader and then the first thing that the figure truth tells you to do is like send a heartbeat to every peer.

462
00:56:03,400 --> 00:56:08,400
And so basically this is going to be the standard code for sending a pants.

463
00:56:08,400 --> 00:56:23,400
In fact, you know the heartbeat code is identical to the cent a pen entry code except you know the heartbeat often will may have a no entry or no entries in the log that is being sent to the followers.

464
00:56:23,400 --> 00:56:28,400
Okay. So since the pens falls the same structure as send votes.

465
00:56:28,400 --> 00:56:38,400
So cycle over all the peers and the peers not equal to me then basically send a different.

466
00:56:38,400 --> 00:56:43,400
And so here is the cent a pen.

467
00:56:43,400 --> 00:56:52,400
And you know basically we're keeping track right of who what the next log entry that the peer should have.

468
00:56:52,400 --> 00:56:56,400
So we're going to get the initialized to an optimistic guest in equal to ours.

469
00:56:56,400 --> 00:57:01,400
So basically in this case there's going to be no log entries that are going to be sent.

470
00:57:01,400 --> 00:57:03,400
So I can skip all this stuff for now.

471
00:57:03,400 --> 00:57:07,400
Now we'll come back to it when we're looking actually at start.

472
00:57:07,400 --> 00:57:10,400
I fill in the append entry arguments.

473
00:57:10,400 --> 00:57:17,400
And we can look at the structure if you'd like to, but you know it is exactly as in figure two.

474
00:57:17,400 --> 00:57:21,400
The only thing is a little bit we can carefully you got to be a little bit careful about is.

475
00:57:21,400 --> 00:57:29,400
I allocate a slice you know to hold the entries that need to be sent in this particular case number of entries is zero.

476
00:57:29,400 --> 00:57:41,400
Because we're assuming that everybody's up to date and then a copy you know the parts from the slices from the log in the raft structure to the.

477
00:57:41,400 --> 00:57:44,400
To the entries in the arguments.

478
00:57:44,400 --> 00:57:49,400
And so I have to really my own copy at this point of the log.

479
00:57:49,400 --> 00:57:53,400
There's a little bit of a danger correct that like slices share memory.

480
00:57:53,400 --> 00:57:56,400
So this is why the copy needs to happen.

481
00:57:56,400 --> 00:58:04,400
So I copy the entries out of the raft structure that I hold the log on into my private argument structure.

482
00:58:04,400 --> 00:58:15,400
And once done is done basically I sent you know I started go function or go go go routine for every peer and in that no go function in that.

483
00:58:15,400 --> 00:58:26,400
And in that function I send the RPC and then in the reply handler you know I grabbed the log just reply handler of the RPC I grabbed the log and then process the reply.

484
00:58:26,400 --> 00:58:30,400
The append reply.

485
00:58:30,400 --> 00:58:34,400
Does all make sense.

486
00:58:34,400 --> 00:58:38,400
Yeah, yeah, go ahead.

487
00:58:38,400 --> 00:58:47,400
One little question. So in send a pencil we have we have the loop in which we call RF.CenderPendel.

488
00:58:47,400 --> 00:58:58,400
And we assume the lock is held through that call but we do the you know any thread at which point the thread let's go to the lock right.

489
00:58:58,400 --> 00:59:08,400
Okay, so like there's an other loop correct where somebody to call our holds the lock and basically it calls send a pen L you know n times correct where n is the number of peers minus one.

490
00:59:08,400 --> 00:59:18,400
And for every one of them for every iteration of that loop you know we're going to create a new go function that go function runs without holding the locks right.

491
00:59:18,400 --> 00:59:25,400
So it will send its RPC about all in the locks and at the same time a new go function might be started by the caller.

492
00:59:25,400 --> 00:59:28,400
That actually also is going to do send RPC.

493
00:59:28,400 --> 00:59:33,400
No, the sent RPC is going parallel to the followers. The followers respond.

494
00:59:33,400 --> 00:59:45,400
And so all the responses come back in that will so that will return you know when the follower response comes in that returns from send RPC and at that point I grabbed the log you know to process through the plot.

495
00:59:45,400 --> 01:00:00,400
So if the caller were still busy sending RPCs to the followers then basically you know the reply hand will block correct until the caller is done sending all the RPCs.

496
01:00:00,400 --> 01:00:15,400
Yeah, so my question was I assumed why that happens is because you had a we had a differ RF that lock and lock is that's why it doesn't hold the lock when it starts to thread right.

497
01:00:15,400 --> 01:00:20,400
Or is that just when you start a friend you don't hold any locks.

498
01:00:20,400 --> 01:00:31,400
Yeah, yeah, like whatever it is, even if we don't have like that, like even if we tried to hold the lock right before the go call it wouldn't hold it.

499
01:00:31,400 --> 01:00:33,400
That's right.

500
01:00:33,400 --> 01:00:35,400
Yeah, yeah, yeah.

501
01:00:35,400 --> 01:00:37,400
I was sort of follow up.

502
01:00:37,400 --> 01:00:46,400
So in the if okay block, where's the defer being like called from from the return statement of that method.

503
01:00:46,400 --> 01:00:53,400
And this block exits when this block exits then the defer the new unlock will be called.

504
01:00:53,400 --> 01:01:03,400
So the defer the defer is called when the surrounding basic block exits or not just return statements not just return statements that's correct.

505
01:01:03,400 --> 01:01:04,400
Okay.

506
01:01:04,400 --> 01:01:05,400
Cool.

507
01:01:05,400 --> 01:01:06,400
That's cool.

508
01:01:06,400 --> 01:01:07,400
It's very heavy.

509
01:01:07,400 --> 01:01:15,400
Can you repeat that so when does the defer ex it like defer is called like so when this defer or this unlock runs when this basic block.

510
01:01:15,400 --> 01:01:20,400
Exits or returns or goes out whatever would turn all you want to run.

511
01:01:20,400 --> 01:01:27,400
So if you return from this basic block, this unlock will happen.

512
01:01:27,400 --> 01:01:39,400
Sorry, why you need to check if the current term is still the term that you thought you were in because some requests can be slow and you might receive a response.

513
01:01:39,400 --> 01:01:40,400
Yep.

514
01:01:40,400 --> 01:01:41,400
Okay.

515
01:01:41,400 --> 01:01:45,400
So here, let's look at process a pen reply.

516
01:01:45,400 --> 01:01:48,400
I think this is what you're asking like what does it do.

517
01:01:48,400 --> 01:01:50,400
And we haven't looked at it yet.

518
01:01:50,400 --> 01:01:52,400
So we can look at it.

519
01:01:52,400 --> 01:01:56,400
And actually reasonable complicated.

520
01:01:56,400 --> 01:01:59,400
It follows the general rule for all service.

521
01:01:59,400 --> 01:02:06,400
If the reply term is big on my current term, then you know, I got switched to becoming a follower and you know going to a new term.

522
01:02:06,400 --> 01:02:10,400
If it is actually equal to my term, correct. This is where you're asking.

523
01:02:10,400 --> 01:02:18,400
If I do the reply comes in in the same term that I sent it in, you know, my arcs, term, then I'm going to do.

524
01:02:18,400 --> 01:02:25,400
I have a different function that actually does all the processing assuming that at least the terms are matching.

525
01:02:25,400 --> 01:02:26,400
Oh, sorry, sorry.

526
01:02:26,400 --> 01:02:29,400
I'm ending the leader when it receives a response to have.

527
01:02:29,400 --> 01:02:32,400
You had like a check for the.

528
01:02:32,400 --> 01:02:35,400
Yeah, I'm basically having a year to it's like the same check here.

529
01:02:35,400 --> 01:02:36,400
I see.

530
01:02:36,400 --> 01:02:37,400
I see.

531
01:02:37,400 --> 01:02:41,400
Okay.

532
01:02:41,400 --> 01:02:46,400
Okay. So you know, basically you this is then the.

533
01:02:46,400 --> 01:02:49,400
A pen entries reply code.

534
01:02:49,400 --> 01:02:52,400
So what the handler that runs in response to a reply.

535
01:02:52,400 --> 01:02:57,400
We know that the term matches and we check reply success.

536
01:02:57,400 --> 01:03:04,400
If you reply success, you know, we update our match indexes and.

537
01:03:04,400 --> 01:03:10,400
And next index following exactly the rules of figure two.

538
01:03:10,400 --> 01:03:16,400
If there's a conflict valid, you know, then you know, I process the conflict.

539
01:03:16,400 --> 01:03:21,400
And so this is the piece of code that's going to deal with like backing off fast.

540
01:03:21,400 --> 01:03:24,400
And.

541
01:03:24,400 --> 01:03:31,400
And if there's no conflict information available, then I get back off by one.

542
01:03:31,400 --> 01:03:32,400
Okay.

543
01:03:32,400 --> 01:03:36,400
Is it a question about how we back off by one.

544
01:03:36,400 --> 01:03:40,400
Is it not problem that I was thinking about this.

545
01:03:40,400 --> 01:03:44,400
I think it wasn't true, but I had fully convinced myself.

546
01:03:44,400 --> 01:03:50,400
But isn't it possible that RF.nxt index pure changed between.

547
01:03:50,400 --> 01:03:54,400
And when we sent it and when we're processing this response.

548
01:03:54,400 --> 01:03:55,400
Yeah, problematic.

549
01:03:55,400 --> 01:03:58,400
Did that command kind of using a potential.

550
01:03:58,400 --> 01:04:00,400
A value that's potentially changed.

551
01:04:00,400 --> 01:04:01,400
Probably not, right?

552
01:04:01,400 --> 01:04:03,400
Because I think your risk.

553
01:04:03,400 --> 01:04:05,400
Your concern is valid.

554
01:04:05,400 --> 01:04:08,400
Because certainly, you know, the raft structure might have completely changed.

555
01:04:08,400 --> 01:04:11,400
By the time this response comes in.

556
01:04:11,400 --> 01:04:14,400
And in the fact, you know.

557
01:04:14,400 --> 01:04:18,400
Although unlikely, of course, because this is the response to the same here.

558
01:04:18,400 --> 01:04:28,400
So there's a, you know, but I might have multiple RPCs outstanding to that particular peer.

559
01:04:28,400 --> 01:04:34,400
And so those reply handlers near my drone in some order.

560
01:04:34,400 --> 01:04:35,400
So I have a question.

561
01:04:35,400 --> 01:04:43,400
So why do we increment the next index by one if there's no conflict?

562
01:04:43,400 --> 01:04:47,400
I think this has to do that maybe at some point I hadn't implemented the conflict.

563
01:04:47,400 --> 01:04:51,400
The conflict term stuff yet.

564
01:04:51,400 --> 01:04:56,400
I don't remember whether this actually is essential or not.

565
01:04:56,400 --> 01:05:00,400
You know, of course, like you have changed my coach multiple times.

566
01:05:00,400 --> 01:05:03,400
And you know, as I go along, implementing the.

567
01:05:03,400 --> 01:05:07,400
In response to the test.

568
01:05:07,400 --> 01:05:10,400
I don't think there's harm in it.

569
01:05:10,400 --> 01:05:19,400
And I think the downside could be that I may send too many entries on the RPC or send more entries on the RPC that I really have to.

570
01:05:19,400 --> 01:05:24,400
On the next event.

571
01:05:24,400 --> 01:05:28,400
Okay, any questions.

572
01:05:28,400 --> 01:05:32,400
Okay, good. Let me talk a little bit about the commit.

573
01:05:32,400 --> 01:05:38,400
So we might have learned correct that the follower actually has.

574
01:05:38,400 --> 01:05:43,400
Has committed some entries that we didn't know before and the match index is updated.

575
01:05:43,400 --> 01:05:44,400
And so.

576
01:05:44,400 --> 01:05:53,400
So basically I always check after, you know, processing and apply and whatever I should advance, you know, the commit point.

577
01:05:53,400 --> 01:06:03,400
And this is basically the, you know, the, this code corresponds to the last bullet of the leaders in figure two.

578
01:06:03,400 --> 01:06:07,400
Literally, influence what actually you're supposed to be happening there.

579
01:06:07,400 --> 01:06:13,400
And probably the only thing that's sort of interesting in here is this particular point.

580
01:06:13,400 --> 01:06:16,400
And this has to do with figure eight.

581
01:06:16,400 --> 01:06:27,400
Right. The scenario is that you're a leader is not allowed to commit a previous term unless at least has committed one entry in its current term.

582
01:06:27,400 --> 01:06:32,400
So this is this is exactly that one check that describe this section 5.4.

583
01:06:32,400 --> 01:06:43,400
It checks whether the current walk entry that I want about to be in the entry that I'm about to commit, whether that actually has a term to different than the current term.

584
01:06:43,400 --> 01:06:45,400
And if that's the case, I just skip it.

585
01:06:45,400 --> 01:06:56,400
Now happens if there's another log entry following that term in my term for which I have a majority of the phones, then I'll basically commit that newer one.

586
01:06:56,400 --> 01:07:03,400
And then automatically it will also commit the previous one.

587
01:07:03,400 --> 01:07:07,400
So that's that figure eight problem.

588
01:07:07,400 --> 01:07:19,400
And then I signal the supplier and the supplier, you know, me run if there's actually, you know, let's look at the supplier threat.

589
01:07:19,400 --> 01:07:22,400
Here's the supplier threat.

590
01:07:22,400 --> 01:07:28,400
And it's basically a fire threat to wake it up when maybe it advanced the commit point.

591
01:07:28,400 --> 01:07:39,400
It has a last applied first graphs log has last applied and then you know basically go through here and dust to check.

592
01:07:39,400 --> 01:07:41,400
You know, that is the rule for all servers.

593
01:07:41,400 --> 01:07:51,400
Now when you commit something and it just follows that rule and then basically write something to the applied channel. And as you can see here, I unlock before writing to the applied channel.

594
01:07:51,400 --> 01:08:05,400
Then if there's nothing anymore to nothing more to supply and give on the applied channel, I just do a way down the condition variable.

595
01:08:05,400 --> 01:08:10,400
And again, different ways of writing this, but this is the way I happen to do it.

596
01:08:10,400 --> 01:08:13,400
So what are you using the broadcast?

597
01:08:13,400 --> 01:08:17,399
Yeah, I know why instead of signal. Yeah, no, no, no, good reason.

598
01:08:17,399 --> 01:08:19,399
There's only one.

599
01:08:19,399 --> 01:08:25,399
Yeah, there's no arm, you know, broadcast signal will in this case do exactly the same thing.

600
01:08:25,399 --> 01:08:28,399
For the supplier.

601
01:08:28,399 --> 01:08:35,399
So you're using a condition variable and it seems like, like, probably natural to do that.

602
01:08:35,399 --> 01:08:47,399
And it does advantage to doing it on it, like, on sleeping, like sleeping for a time interval, then like, you know, watching everything together.

603
01:08:47,399 --> 01:08:52,399
I, I, I, I, I, this light code with random sleeps in them.

604
01:08:52,399 --> 01:08:56,399
I think that was generally that style of writing code.

605
01:08:56,399 --> 01:08:59,399
And so I don't do that.

606
01:08:59,399 --> 01:09:02,399
And that's why I do sleep is in the ticker.

607
01:09:02,399 --> 01:09:05,399
And that's the way it plays where you have to.

608
01:09:05,399 --> 01:09:07,399
Otherwise, I should never do that.

609
01:09:07,399 --> 01:09:13,399
Actually, that's, is there any disadvantage to doing it with the ticker?

610
01:09:13,399 --> 01:09:14,399
Sorry.

611
01:09:14,399 --> 01:09:20,399
Is there any disadvantage of like checking and like, like, updating, like, alongside with the ticker?

612
01:09:20,399 --> 01:09:23,399
Yeah, you could do that.

613
01:09:23,399 --> 01:09:25,399
I find that harder to reason about.

614
01:09:25,399 --> 01:09:30,399
I do, you know, so I have one thread, we charge, there's one thing and then the ticker thread and one thing.

615
01:09:30,399 --> 01:09:35,399
You know, I think there are people that basically do everything in the ticker thread.

616
01:09:35,399 --> 01:09:39,399
And you know, one of, you know, from me, it's hard to reason about.

617
01:09:39,399 --> 01:09:49,399
But that's more a question of, you know, personal taste than anything.

618
01:09:49,399 --> 01:09:54,399
Okay.

619
01:09:54,399 --> 01:10:00,399
Any further questions?

620
01:10:00,399 --> 01:10:06,399
Okay. I want to quickly look then at start because basically there's nothing really left to discuss anymore.

621
01:10:06,399 --> 01:10:09,399
You know, we talked a bit voting, we talked about appending.

622
01:10:09,399 --> 01:10:16,399
I haven't really discussed exactly what happens on the follower site when it gets you in a pen request.

623
01:10:16,399 --> 01:10:20,399
But basically follows figure two and we have time left.

624
01:10:20,399 --> 01:10:22,399
We can look at that too.

625
01:10:22,399 --> 01:10:25,399
Here's the start command.

626
01:10:25,399 --> 01:10:30,399
So this is like the service calls this to a pen or an entry to the log.

627
01:10:30,399 --> 01:10:33,399
And I get a meal grabs the log.

628
01:10:33,399 --> 01:10:37,399
Checks with a resilble leader, if not, will return false.

629
01:10:37,399 --> 01:10:42,399
Otherwise, we create an entry and we pen it to the log.

630
01:10:42,399 --> 01:10:45,399
And log has to be persistent so we're persistent.

631
01:10:45,399 --> 01:10:47,399
And then we send the applies.

632
01:10:47,399 --> 01:10:49,399
And this is exactly the same or we sent the appends.

633
01:10:49,399 --> 01:10:54,399
And this is exactly the same code as the hard beats.

634
01:10:54,399 --> 01:11:05,399
Except in like in the hard beats, you know, most likely now it's going to actually send the entry that is that just has been appended to the log.

635
01:11:05,399 --> 01:11:08,399
Okay.

636
01:11:09,399 --> 01:11:22,399
You noticed that probably many places have this log dot less index log that that's something and that's because of like sort of extracted the log away into its own structure.

637
01:11:22,399 --> 01:11:32,399
Here's the log actually it has just a log of entries slice of entries and the index zero and this is really for part 2D.

638
01:11:32,399 --> 01:11:37,399
And basically you're going to cut up the beginning of the log the sort of global log.

639
01:11:37,399 --> 01:11:45,399
And you need to keep track of what the index is of the first entry that actually you have recorded in your log.

640
01:11:45,399 --> 01:11:53,399
And you know to hide most of those details away, you know, basically have an abstracted that way in this file log dot go.

641
01:11:53,399 --> 01:11:59,399
And they're basically functions for depending to get the start of the log, you know to cut the end to cut the cut the start.

642
01:11:59,399 --> 01:12:05,399
And then it slides out of it, get the last index, get the particular entry or get the last entry.

643
01:12:05,399 --> 01:12:16,399
And that might be convenient for 2D, although there's many other ways of doing it.

644
01:12:16,399 --> 01:12:22,399
Okay, let me go back for a second to sort of some of the questions that people asked.

645
01:12:22,399 --> 01:12:32,399
I'm going to take, you know, hopefully I've answered many of them by now, but if not, let me just review a quickly to go through them.

646
01:12:32,399 --> 01:12:44,399
So I think we talked quite extensively about the election timeout, you know how to compute it, how to check where the time out is passed.

647
01:12:44,399 --> 01:12:53,399
The question about always when receiving a message from the leader, you know, I only reset it when I receive a message from the leader that actually is in my current term.

648
01:12:53,399 --> 01:12:56,399
Or in my new term, I become a follower.

649
01:12:56,399 --> 01:13:01,399
But not for somebody that's behind in terms of terms.

650
01:13:01,399 --> 01:13:08,399
When to send the append entries, you know, there are different ways of doing it. You can do it only in the hard beats, you know, some people done that.

651
01:13:08,399 --> 01:13:13,399
So I've never sent anything in start. That's like I showed me as I showed in the code.

652
01:13:13,399 --> 01:13:17,399
And sometimes you people do also do it in the response.

653
01:13:17,399 --> 01:13:24,399
If, for example, the follower is behind, you know, send immediately the remaining entries.

654
01:13:24,399 --> 01:13:37,399
I don't do that. I never send anything in response, although I had an implementation of dust that the risk is that I think you swamp the follower in later laps or in test for 2C and 2D.

655
01:13:37,399 --> 01:13:52,399
You do in only some people I think just sent our sent entries only in the hard beats. So that means like every, you know, you're not allowed to send a hard be more than 10 times a second in the rules of the game for the laps.

656
01:13:52,399 --> 01:14:00,399
So that means that you will do a sent our paint entries once every, you know, on the milliseconds or maybe a little bit faster.

657
01:14:00,399 --> 01:14:11,399
That may be running to problems in lap 3 where we actually see if you make a fast enough progress.

658
01:14:11,399 --> 01:14:15,399
So basically I do it in the hard beats and I do it in start.

659
01:14:15,399 --> 01:14:18,399
I think we talked quite extensively about debugging.

660
01:14:18,399 --> 01:14:24,399
I've talked a bunch about code organization. I think we talked quite a bit about concurrency.

661
01:14:24,399 --> 01:14:33,399
There's a number of questions about like why 3.5 is 7 servers and they have more. I think this is the reason that is the case because I think it reflects how raft is actually used in practice.

662
01:14:33,399 --> 01:14:39,399
And really that 3.5 is 7 is based on the computation of known what the meantime between failures are.

663
01:14:39,399 --> 01:14:45,399
Right. And in the raft paper, it's assumed that the meantime between the failures are rough, you know, couple, couple of months.

664
01:14:45,399 --> 01:14:54,399
So if you run with free servers and one goes down, you know, you have plenty of time to actually rebuild a third server and get it back online.

665
01:14:54,399 --> 01:14:59,399
And so get back to free before hopefully the next failure happens.

666
01:14:59,399 --> 01:15:08,399
So that's why you know this small number of servers.

667
01:15:08,399 --> 01:15:11,399
We talked a little bit about when to persist.

668
01:15:11,399 --> 01:15:18,399
There's a number of good questions about like, and what happens if you crash while writing to stable storage.

669
01:15:18,399 --> 01:15:22,399
And so you may write partial state and that would be a disaster.

670
01:15:22,399 --> 01:15:28,399
And so typically what people do is actually to make sure that when they write to stable stores that is an atomic operation.

671
01:15:28,399 --> 01:15:41,399
You know, this does show up in the tester because the tester basically sort of simulates a persistent storage and basically updates the the persistent storage, atomically, within a real system that actually has a disk.

672
01:15:41,399 --> 01:15:54,399
You might like like a trick like the map reduce library did where the atomic reading refers right in temporary file, everything's written and then you're talking to reading or use a lot right and logging system.

673
01:15:54,399 --> 01:16:05,399
But yeah, you have to that be a disaster if the crash over the persistent state to stable storage becomes inconsistent.

674
01:16:05,399 --> 01:16:09,399
Let me stop here so that like it does maybe a little bit more time to ask questions.

675
01:16:09,399 --> 01:16:14,399
And of course, I'll stay around and as always, and I can answer more questions.

676
01:16:14,399 --> 01:16:22,399
I see there's also a ton of discussion that chat. I'm not I'm unfortunately not able probably I didn't keep up with all of it.

677
01:16:22,399 --> 01:16:31,399
Okay, good.

678
01:16:31,399 --> 01:16:35,399
Okay, so yeah, any more questions.

679
01:16:35,399 --> 01:16:38,399
I have a question about the log.

680
01:16:38,399 --> 01:16:42,399
You're in your code for the log.

681
01:16:42,399 --> 01:16:46,399
The index zero, it is.

682
01:16:46,399 --> 01:16:54,399
I guess in the underlying array, what the start of the log is, is that right?

683
01:16:54,399 --> 01:17:04,399
So this is basically for lap 2d, not for no in laps a b and c index zero would be all the always zero.

684
01:17:04,399 --> 01:17:12,399
And lap 2d where you take snapshots, you know, the index zero would know the index not about the snapshot.

685
01:17:12,399 --> 01:17:15,399
Because you're going to cut the beginning of the log.

686
01:17:15,399 --> 01:17:23,399
Okay, so if you take a snapshot index 10, you know, you're going to cut 0 for 9 and index zero will be 10.

687
01:17:23,399 --> 01:17:30,399
Oh, this is the end of the snapshot.

688
01:17:30,399 --> 01:17:35,399
So basically everything through to until index zero is actually included in a snapshot.

689
01:17:35,399 --> 01:17:45,399
So there's no reason to maintain that and that's take any more into log.

690
01:17:45,399 --> 01:17:51,399
Any other questions.

691
01:17:51,399 --> 01:17:58,399
I hope this was useful, particularly still and time for, you know, to see in 2d.

692
01:17:58,399 --> 01:18:06,399
And maybe there's some ideas here that might be useful for you in implementing those laps.

693
01:18:06,399 --> 01:18:15,399
I have a question about like what kind of ranges for election timeouts people used.

694
01:18:15,399 --> 01:18:27,399
I think I use like, you know, the lower the limit of like 100 milliseconds for the heartbeat and then time out anywhere between like 300 and 700 milliseconds.

695
01:18:27,399 --> 01:18:37,399
I don't know if that's like totally reasonable. I usually live a bigger number correct like the stranger we gave you is that you know, you should be able to elect a leader in the five seconds.

696
01:18:37,399 --> 01:18:43,399
And that means you should count on and you may have to run the election couple times.

697
01:18:43,399 --> 01:18:51,399
And so you know, the numbers you pick seems reasonable.

698
01:18:51,399 --> 01:19:11,399
Any people that want to share a particular annoying bug that they have actually there were a number of questions where people are asking, what does the most nasty bug that people have seen.

699
01:19:11,399 --> 01:19:16,399
I had a pretty annoying bug in my implantation.

700
01:19:16,399 --> 01:19:25,399
I didn't take my own advice and sort of did a like weird implantation of a timer where I like spawn off.

701
01:19:25,399 --> 01:19:36,399
I had a new thread to sleep for something and then send a message back at the end. It was not particularly great design. And I had two different timers one for heart beats and one for election timers.

702
01:19:36,399 --> 01:19:42,399
And I was forgetting to stop the one of those timers when the server shut down.

703
01:19:42,399 --> 01:19:54,399
One of them was fine. And one of them wasn't. And it meant I would slowly gain like a number of go routines over the course of a long running test until it ran out and the race sector crashed everything.

704
01:19:54,399 --> 01:20:01,399
And it was incredibly embarrassing because it was literally just that I forgot to stop a timer.

705
01:20:01,399 --> 01:20:18,399
So, but it took a very long time to debug because I couldn't figure out I think I thought there was a bug in the lab RPC code and know there wasn't no there's probably no bugs in the lab RPC code. It was just me and misinterpreting data.

706
01:20:18,399 --> 01:20:20,399
Yep.

707
01:20:20,399 --> 01:20:34,399
I'm talking about election timeouts. I have an issue on where the one call is called from config.co that were occasionally fails to reach agreement.

708
01:20:34,399 --> 01:20:54,399
I realized that if I increase my election timeouts to have like the random interval go up to like 1500 milliseconds that like greatly decreases the frequency at which this happens, but I'm wondering if I should go even higher than that for the random interval that this is indicative of another bug I have.

709
01:20:54,399 --> 01:20:57,399
I think it's integrated with another bug you have.

710
01:20:57,399 --> 01:21:05,399
Well, my first guess and I got you know, of course I don't know for sure at all, but like you don't have to be able to run that kind of long time.

711
01:21:05,399 --> 01:21:08,399
To pass.

712
01:21:08,399 --> 01:21:19,399
Yeah, most of the time when people are tweaking their timeouts, it's not actually fixing their bugs. It's just changing how often they show up.

713
01:21:19,399 --> 01:21:22,399
Okay, thanks.

714
01:21:22,399 --> 01:21:24,399
Here's a bug in the channel.

715
01:21:24,399 --> 01:21:29,399
On the chat channel, I was just bug ahead was that I forgot to initialize the channel.

716
01:21:29,399 --> 01:21:34,399
How did that manifest itself as a bug?

717
01:21:34,399 --> 01:21:41,399
Oh, like basically when I was sending something when you able to receive it.

718
01:21:41,399 --> 01:21:46,399
And I wonder what was going on. It turns out it was just that they didn't ever make this blind.

719
01:21:46,399 --> 01:21:50,399
So it's like the normal channel.

720
01:21:50,399 --> 01:21:52,399
Hmm.

721
01:21:52,399 --> 01:21:56,399
I don't really know what the semantics are over writing to a new channel.

722
01:21:56,399 --> 01:22:01,399
I can't recall the top of my head. I know the rules for that, but I don't remember what the rule is.

723
01:22:01,399 --> 01:22:09,399
Do you have a comment on the previous point regarding the election timeouts and setting them high?

724
01:22:09,399 --> 01:22:14,399
Should we try and aim thus to set them a little bit low?

725
01:22:14,399 --> 01:22:18,399
So that if there are any bugs, we can expose them.

726
01:22:18,399 --> 01:22:20,399
Oh, yeah, not a bad plan.

727
01:22:20,399 --> 01:22:28,399
I think it's always good to like push the boundaries and see if you have any other bugs when I'm learning.

728
01:22:28,399 --> 01:22:32,399
So the boundaries should be something akin to what the paper suggests.

729
01:22:32,399 --> 01:22:37,399
Limit higher because the way we set up the tests are slightly different.

730
01:22:37,399 --> 01:22:42,399
You know, the intersection of each has a discussion on this, correct?

731
01:22:42,399 --> 01:22:46,399
And actually the rough paper kind of has guidelines.

732
01:22:46,399 --> 01:22:50,399
And even if they have like a specific value, they set the value based on their guidelines.

733
01:22:50,399 --> 01:22:58,399
And the guidelines said that you should have kind of elected a leader with like an order of magnitude more time, but what the hype it interval is.

734
01:22:58,399 --> 01:23:00,399
Yeah, exactly.

735
01:23:00,399 --> 01:23:05,399
Like 100, like, for example, like if you go to like 800 to a second, like things will work out.

736
01:23:05,399 --> 01:23:09,399
It's fine even if those are high because that's kind of the guidelines.

737
01:23:09,399 --> 01:23:20,399
It all changes because we just make you change the kind of like they innermost, hard bit frequency because of the RPC that.

738
01:23:20,399 --> 01:23:26,399
Sorry, can I actually see the hard bit timer in the code?

739
01:23:26,399 --> 01:23:34,399
Yeah, sure.

740
01:23:34,399 --> 01:23:49,399
Basically, you know, every 50 milliseconds, the ticker comes off, the ticker comes tick and if I a leader, I'll basically send an RPC, this comes down to basically a heartbeat.

741
01:23:49,399 --> 01:23:58,399
So here my implementation every 50 milliseconds, I'm sending a heartbeat.

742
01:23:58,399 --> 01:24:00,399
I had a question.

743
01:24:00,399 --> 01:24:12,399
So you were saying like, it should be like timeout should be like an order of magnitude, like greater than heartbeat, right?

744
01:24:12,399 --> 01:24:16,399
But I started like playing to see how low it could get.

745
01:24:16,399 --> 01:24:29,399
And you know, I could like with 100 millisecond timeout, you know, it could go down to like three to 500 milliseconds and still work like, you know, without a pitch.

746
01:24:29,399 --> 01:24:34,399
And I was wondering like, it's that like why.

747
01:24:34,399 --> 01:24:38,399
Like how low, you know, how low can they get.

748
01:24:38,399 --> 01:24:45,399
And why are we making them so much greater than the, like in timeout or than that hard bit time?

749
01:24:45,399 --> 01:24:55,399
Because we need to really, we need to keep the candidate a shot actually becoming the leader and some of the messages might be delayed for a long time.

750
01:24:55,399 --> 01:24:59,399
But we're dropped.

751
01:24:59,399 --> 01:25:01,399
Yeah.

752
01:25:01,399 --> 01:25:11,399
I have a question. I think I missed this part, which is how you're like, which appendentries are sending from start and which ones from the heartbeat.

753
01:25:11,399 --> 01:25:15,399
They're the same. It's the same code.

754
01:25:15,399 --> 01:25:16,399
Okay.

755
01:25:16,399 --> 01:25:23,399
There's nothing different. I only have one. If you look here at this, here, send the pants. Right. This is a little from the ticker.

756
01:25:23,399 --> 01:25:24,399
Yeah.

757
01:25:24,399 --> 01:25:32,399
And if you look at the API code, the start function calls the same function.

758
01:25:32,399 --> 01:25:40,399
But in this case, which which ones are like, if you're sending all of them from start, which ones are going to be sent from the ticker.

759
01:25:40,399 --> 01:25:44,399
The ticker probably sends mostly NT.

760
01:25:44,399 --> 01:25:46,399
A pants.

761
01:25:46,399 --> 01:25:47,399
Okay.

762
01:25:47,399 --> 01:25:50,399
So the bulk are coming from start.

763
01:25:50,399 --> 01:25:53,399
The one is coming from the ticker.

764
01:25:53,399 --> 01:25:56,399
Or like the actual log entries.

765
01:25:56,399 --> 01:26:04,399
The actual log entries are all sitting in the struct raft. Right. So they're coming out of the raft struct.

766
01:26:04,399 --> 01:26:08,399
And if you look at start, the only thing start does.

767
01:26:08,399 --> 01:26:16,399
Hold on. Let me go pull up start again. This is a good question. Like you pull start up basically it depends into the log here.

768
01:26:16,399 --> 01:26:26,399
And that's all it does. And like the only difference basically between ticker and start is that start actually depends something to the log and the ticker doesn't do that.

769
01:26:26,399 --> 01:26:30,399
And send the pants basically grabs, you know, whatever.

770
01:26:30,399 --> 01:26:33,399
So this is the look for all of them.

771
01:26:33,399 --> 01:26:37,399
So here's the individual.

772
01:26:37,399 --> 01:26:50,399
Here's the individual one that you sent to one peer and it basically grabs the right log entries out of the, out of the log right here.

773
01:26:50,399 --> 01:26:55,399
Your cocktails it out of the log into the arcs entries.

774
01:26:55,399 --> 01:27:02,399
And so if it's a heartbeat, most likely, this always be zero, not always correct because you might either might have the follow might have missed some.

775
01:27:02,399 --> 01:27:10,399
But in the case when start calls this, you know, you always be sending the thing that actually just has been a pendant.

776
01:27:10,399 --> 01:27:16,399
Okay, because I did it that I'm such that I'm sending everything in the heart beats like all the entries.

777
01:27:16,399 --> 01:27:27,399
And for some of the two CSS sometimes I'll like fail to reach agreement. I'm wondering if that's why because here you're, it seems like the bulk of the entries are being sent in start.

778
01:27:27,399 --> 01:27:40,399
Okay, that's might not be the reason why you, I don't think it will affect reaching agreements from the not dependent on the number of entries you send in the number of walk entries you're sending in the end of the seat.

779
01:27:40,399 --> 01:27:43,399
No, no.

780
01:27:43,399 --> 01:27:51,399
Yeah, I was able to make it all the way through lab 2 with only ever sending appendories from the heartbeat timer.

781
01:27:51,399 --> 01:28:03,399
You never in promise, slow things down though, like it definitely, it can't seem slow down to be clear. I don't recommend doing this, but like you can get through lab 2 with just sending from the heart beats.

782
01:28:03,399 --> 01:28:07,399
So if you're right, that's not so.

783
01:28:07,399 --> 01:28:12,399
How do the time out or how do the limits on heart beats work?

784
01:28:12,399 --> 01:28:20,399
Like are the limit on heart beats like the same as a limit on appendentries, RPC or they come to different.

785
01:28:20,399 --> 01:28:30,399
The heart beats are different. You can send, you know, you have to send it, you know, a principal soon that ever start can reach all in a pen entry call.

786
01:28:30,399 --> 01:28:32,399
Right.

787
01:28:32,399 --> 01:28:36,399
And you're not allowed to send more than 10 hard beats.

788
01:28:36,399 --> 01:28:40,399
How do you like differentiate that?

789
01:28:40,399 --> 01:28:43,399
Hard beats have no entries most typically.

790
01:28:43,399 --> 01:28:45,399
Okay.

791
01:28:45,399 --> 01:28:54,399
So you literally go in and check like, oh, we don't really literally check, but we basically see if you make more progress than 10 times a second.

792
01:28:54,399 --> 01:29:03,399
Like one of the tests in lottery checks if you go quick enough.

793
01:29:03,399 --> 01:29:05,399
Exactly for this reason.

794
01:29:05,399 --> 01:29:13,399
We're being limited to know you're basically in a real application, correct if you delayed, you know, your depends, you know, by 10 mil by 50 milliseconds before you do anything.

795
01:29:13,399 --> 01:29:23,399
If a client, you know, imagine a client's meeting through your service, you know, basically it's going to get one append operation through every 50 milliseconds.

796
01:29:23,399 --> 01:29:30,399
That would be not a very desirable service to use.

797
01:29:30,399 --> 01:29:38,399
I had a question about accessing parts of the RF struct without lock.

798
01:29:38,399 --> 01:29:46,399
So in centiped entries, you are, you're reading the peer peers.

799
01:29:46,399 --> 01:29:48,399
Yeah.

800
01:29:48,399 --> 01:30:01,399
I guess slides, but I know that it is, it is static, but there, it could be that multiple threads read the same thing twice, right.

801
01:30:01,399 --> 01:30:09,399
So is, is there a danger of the race, the texture complaining about this?

802
01:30:09,399 --> 01:30:12,399
Yeah, some echo, sorry, sorry.

803
01:30:12,399 --> 01:30:17,399
Let me see.

804
01:30:17,399 --> 01:30:20,399
So let me see.

805
01:30:20,399 --> 01:30:24,399
So I guess I don't hold the walk on RF, RF peers.

806
01:30:24,399 --> 01:30:27,399
Yeah.

807
01:30:27,399 --> 01:30:31,399
Yeah, the race protectors not complaining.

808
01:30:31,399 --> 01:30:49,399
So there's a race detector.

809
01:30:49,399 --> 01:30:54,399
Sorry, what is that question about whether iterating over peers could cause races.

810
01:30:54,399 --> 01:30:56,399
Yeah, yeah.

811
01:30:56,399 --> 01:31:01,399
Accesses it without holding the lock and right.

812
01:31:01,399 --> 01:31:04,399
Never know.

813
01:31:04,399 --> 01:31:06,399
New words right.

814
01:31:06,399 --> 01:31:09,399
You can't get the race protectors won't complain.

815
01:31:09,399 --> 01:31:13,399
What about our dot killed.

816
01:31:13,399 --> 01:31:14,399
Sorry.

817
01:31:14,399 --> 01:31:19,399
RF dot killed.

818
01:31:19,399 --> 01:31:22,399
That is a problem.

819
01:31:22,399 --> 01:31:25,399
I guess it was just an obscure scenario.

820
01:31:25,399 --> 01:31:30,399
If you kill it at the same time as doing something else, I'm not sure.

821
01:31:30,399 --> 01:31:33,399
But that was not like I'll modify.

822
01:31:33,399 --> 01:31:43,399
Killed still doesn't modify peers.

823
01:31:43,399 --> 01:31:44,399
Yeah.

824
01:31:44,399 --> 01:31:46,399
Okay. Thank you.

825
01:31:46,399 --> 01:31:49,399
I'll see how you do the applied channel thing again.

826
01:31:49,399 --> 01:31:50,399
You talked about it earlier.

827
01:31:50,399 --> 01:31:53,399
How you needed to have a walk with the apply channel.

828
01:31:53,399 --> 01:31:56,399
Not a walk the opposite or sorry.

829
01:31:56,399 --> 01:31:58,399
What is it?

830
01:31:58,399 --> 01:31:59,399
Conditioned variable.

831
01:31:59,399 --> 01:32:01,399
Yeah, condition variable.

832
01:32:01,399 --> 01:32:03,399
Oh,

833
01:32:03,399 --> 01:32:05,399
Oh, huh.

834
01:32:05,399 --> 01:32:06,399
So you have a.

835
01:32:06,399 --> 01:32:09,399
Oh, what do you do with the condition variable?

836
01:32:09,399 --> 01:32:11,399
I brought a signal on it.

837
01:32:11,399 --> 01:32:13,399
So like when.

838
01:32:13,399 --> 01:32:15,399
When the.

839
01:32:15,399 --> 01:32:19,399
Match index is updated and a new entry needs to be committed.

840
01:32:19,399 --> 01:32:22,399
That threat will call signal.

841
01:32:22,399 --> 01:32:26,399
And that will wake up the apply a threat and apply a threat.

842
01:32:26,399 --> 01:32:30,399
We'll see if there's anything that needs to be pushed on the.

843
01:32:30,399 --> 01:32:32,399
Apply channel, which is the checks here.

844
01:32:32,399 --> 01:32:35,399
And if so, we will push it on the apply channel.

845
01:32:35,399 --> 01:32:37,399
Oh, okay.

846
01:32:37,399 --> 01:32:39,399
And if there's nothing to be pushed on the apply channel anymore,

847
01:32:39,399 --> 01:32:41,399
we'll have to sleep.

848
01:32:41,399 --> 01:32:42,399
Okay.

849
01:32:48,399 --> 01:32:50,399
Okay.

850
01:32:50,399 --> 01:32:59,399
Maybe this is it for today.

851
01:32:59,399 --> 01:33:00,399
Okay.

