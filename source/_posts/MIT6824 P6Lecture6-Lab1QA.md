---
title: MIT6824 P6Lecture6 Lab1QA
---

1
00:00:00,000 --> 00:00:11,279
All right. Well, it's five after so I'll just go ahead and get started. So today's lecture

2
00:00:11,279 --> 00:00:18,480
is a Q&A on the first lab, the MapReduce lab, and also some just general coding Q&A's

3
00:00:18,480 --> 00:00:24,000
for go programming that might help in future labs. So feel free to stop at any time or put questions

4
00:00:24,000 --> 00:00:30,480
in the chat and I'll be checking it out occasionally. And I'm sure like other QAs can also tell

5
00:00:30,480 --> 00:00:35,840
this well. If you are unmuted and typing, it would be helpful if you meet yourself.

6
00:00:37,759 --> 00:00:43,039
But yeah. All right. So agenda for today, the first thing I'm going to do is actually walk

7
00:00:43,039 --> 00:00:49,359
through a solution of lab one. And this is my personal solution. It's probably not perfect,

8
00:00:49,359 --> 00:00:55,119
but it's an example of what you could have done. So I think we're going to discuss some alternative

9
00:00:55,119 --> 00:01:04,799
solution designs. So I'm just still typing. Jay, stop typing. Or if it's not supposed to be

10
00:01:06,560 --> 00:01:12,400
nervous. Third, we're going to discuss some of the Coleman design mistakes and some of the bugs that

11
00:01:12,400 --> 00:01:19,760
you guys had in your solutions for just go over some general tips. And then finally, we're going

12
00:01:19,760 --> 00:01:26,719
to, if there's time, go through some Q&As both questions you might have right now. And also

13
00:01:26,719 --> 00:01:34,880
questions that you submitted before lecture. So first, for the lab solution walk through,

14
00:01:35,839 --> 00:01:40,000
let me know if the font is too small. I'll just stick with this.

15
00:01:40,959 --> 00:01:48,879
All right. So I basically went step by step and I'll show how I developed my solution.

16
00:01:48,879 --> 00:01:57,120
So the first thing I did was this is rtc.go. And the first thing I did was figure out the API in

17
00:01:57,120 --> 00:02:04,399
which I wanted my workroom coordinator to communicate. And so the first thing I did was define

18
00:02:04,480 --> 00:02:10,560
what types of tests there are. And so they are mapping, reduce tests. And in order to signal that

19
00:02:10,560 --> 00:02:16,640
the coordinator has things that John has done, there's a done test. And so these are the types of

20
00:02:16,719 --> 00:02:20,319
tests that I've done. So I'm going to talk about the top. Can you zoom in a bit? Can you zoom in a bit?

21
00:02:20,319 --> 00:02:27,759
Oh yeah. The fonts. Yeah. So that good? All right. Yeah. Thanks.

22
00:02:29,119 --> 00:02:32,239
Cool. Yeah, it's hard for me to tell how it looks.

23
00:02:34,239 --> 00:02:44,319
So hopefully this is good. And so there are two rpcs I decided to implement. The first is a worker

24
00:02:44,319 --> 00:02:49,840
asking the coordinator to give it a task. So one of map, reduce or done and please exit.

25
00:02:50,479 --> 00:02:54,719
And basically there's like the arguments you don't really have to

26
00:02:54,719 --> 00:03:01,439
point out arguments are just asking for a task. And the coordinator replies with what task is this

27
00:03:01,439 --> 00:03:09,439
which task of that type to do do. And also some extra data that's needed for the map or

28
00:03:09,439 --> 00:03:14,079
reduce tasks such as the number of map tasks in the system or the number of reduced tasks.

29
00:03:15,439 --> 00:03:21,919
And the second rpc is a finished task rpc that the worker uses to notify the coordinator

30
00:03:21,919 --> 00:03:28,879
that it has finished the task. And it passes in as arguments which task it has finished. And they

31
00:03:28,879 --> 00:03:34,560
don't actually really need to get a reply for this. So that's the first step of the implementation.

32
00:03:35,439 --> 00:03:45,599
So hi. All right. So as a second step, why did is implement the handlers for all these rpcs.

33
00:03:46,159 --> 00:03:52,879
And so that's an coordinator. So first I had to actually populate the coordinator with the

34
00:03:52,879 --> 00:03:58,080
coordinator state. And so there's the mutex which protects the state from concurrent access because

35
00:03:58,080 --> 00:04:05,120
the coordinator will have multiple threads running concurrently. Then the second part is to keep

36
00:04:05,120 --> 00:04:09,760
track of just like the files that we need for map tests and the number of map and reduced tasks.

37
00:04:10,720 --> 00:04:18,400
And this metadata is used to track which tasks have we issued and which tasks has finished.

38
00:04:20,240 --> 00:04:24,879
The ones that we've issued we keep track of a timestamps that we know if these tasks haven't

39
00:04:24,879 --> 00:04:32,079
completed within a certain amount of time to reissue them. And finally we have the like has all

40
00:04:32,639 --> 00:04:42,560
has the coordinator finished Boolean. So to handle the get task rpc we have a handler that essentially

41
00:04:42,560 --> 00:04:50,159
what it does is it will set the reply fields. Right now I haven't yet implemented the part that

42
00:04:50,160 --> 00:04:56,000
actually issues the tests. And if all the map and reduced tests are done it will send a

43
00:04:56,000 --> 00:05:06,960
done task to the worker and then we have the handler for the finished task rpc. And what this does

44
00:05:06,960 --> 00:05:16,160
is it basically depending on what task it was sets that flag to true that has that task has finished.

45
00:05:16,560 --> 00:05:21,120
So that's the second step which is implementing the handlers for the rpcs.

46
00:05:24,160 --> 00:05:30,880
So the third step I have is actually sending the rpcs. And so that

47
00:05:32,640 --> 00:05:36,160
is the work here. So

48
00:05:36,160 --> 00:05:48,560
the top of this book we provided it does is it starts up the loop that basically for every elube it

49
00:05:48,560 --> 00:05:55,200
calls the handler for get task in the coordinator. And depending on what task it gets it will either

50
00:05:55,200 --> 00:06:00,879
perform the map task with the relevant data or admitted data that needs perform the reduced

51
00:06:00,879 --> 00:06:06,560
task or in the case of done it will exit. And so that's very simple and once it's finished that

52
00:06:06,560 --> 00:06:14,959
task it will send a finished task rpc to the coordinator. So this is just the skeleton code for

53
00:06:15,600 --> 00:06:22,879
the worker sending rpcs. Right so we have rpcs we have the handlers we have the senders and so now

54
00:06:22,879 --> 00:06:34,959
let's actually implement some stuff. So in step 4 I just added a ton of handlers to manage this

55
00:06:34,959 --> 00:06:42,399
intermediate file stuff which a lot of you also did. And basically that uses OS rename it gets

56
00:06:42,399 --> 00:06:50,240
a temporary file so it's not super interesting. And then the next step let's actually implement

57
00:06:50,319 --> 00:06:58,079
some of the worker functionality. So we're back in the worker and now let's implement the perform

58
00:06:58,079 --> 00:07:07,840
map function. And what this does is as many of you have to do is read the file, maps them to keys,

59
00:07:07,840 --> 00:07:14,079
and then create separate files, read them to the intermediate files, and then we use an atomic

60
00:07:14,399 --> 00:07:19,439
rename to ensure that maps aren't conflicting as they process the keys and write them.

61
00:07:20,639 --> 00:07:26,959
So this is pretty much taken from the sequential implementation and how you would apply the map

62
00:07:26,959 --> 00:07:37,519
function. And then similarly we implement the reduced function. So here's a format and then we

63
00:07:37,519 --> 00:07:43,839
have perform reduced. And so what that does is it gets all the intermediate files with the appropriate

64
00:07:45,039 --> 00:07:52,240
from all the map tests for this reduced task and sorts them. So the sorting happens in the

65
00:07:53,759 --> 00:08:00,879
in the worker because the worker needs the reducer needs access to all keys of that type and then

66
00:08:00,879 --> 00:08:07,120
to sort them. I wouldn't make sense for the mapper to sort them before because the mapper only

67
00:08:07,120 --> 00:08:13,439
has access to a subset of the keys. And then we apply the reduced function to all values of the same

68
00:08:13,439 --> 00:08:19,040
key and then we automatically rename the temporary reduced file to the final reduced file.

69
00:08:20,560 --> 00:08:29,199
So now the loop we've implemented basically the actual performance of the task and we're basically

70
00:08:29,199 --> 00:08:35,519
done with the worker implementation. So one last step remains and that's actually implementing

71
00:08:35,519 --> 00:08:43,279
how this coordinator tells the worker which task to do. And this is probably where you ran into

72
00:08:43,279 --> 00:08:50,319
the most complexity with synchronization in the coordinator. So let's go back to the coordinator.

73
00:08:51,519 --> 00:08:57,919
So nothing has changed in the state. So but now what we've done is we've added a loop in the

74
00:08:57,919 --> 00:09:07,199
coordinator that handles sending the tests to the worker. And when we're issuing the map tests,

75
00:09:07,199 --> 00:09:14,959
so first we want to issue all the map tests. And so essentially what this loop does here is until

76
00:09:14,959 --> 00:09:23,199
there's a task to issue, the coordinator will just iterate through this loop and if we're done with

77
00:09:23,200 --> 00:09:28,800
all the map tests, then we'll break out the loop. And then if all the map tests are done, then we

78
00:09:28,800 --> 00:09:40,879
issue a reduced test, which is what's done here. So oh yeah, I have I guess I have one last step,

79
00:09:40,879 --> 00:09:48,640
which is actually what we do when the maps are the reduces, when there's no test to issue. And so

80
00:09:48,639 --> 00:09:54,879
what we want to do then is the coordinator should just wait for a test to issue. And once it

81
00:09:55,679 --> 00:10:00,799
there's a test issue, it'll do another iteration to the loop and then actually issue the task.

82
00:10:01,840 --> 00:10:04,879
And I'll continue until all the map or all the reduced tests are done.

83
00:10:06,799 --> 00:10:10,720
And if they're done, it'll return again. So let's go to

84
00:10:10,879 --> 00:10:12,879
the next one.

85
00:10:14,399 --> 00:10:23,279
So in order to support that waiting, what my solution does is it uses a condition variable.

86
00:10:26,240 --> 00:10:34,639
And essentially what that does is if there are no map tests to issue, but the mavers,

87
00:10:35,519 --> 00:10:42,240
but they're because we've assigned all them, for example, and we're waiting for them, and they

88
00:10:42,240 --> 00:10:49,360
haven't timed out yet, then what we want to do is wait because we cannot issue a reduced task if

89
00:10:49,360 --> 00:10:55,600
all the mavers have not finished. So we're just going to wait here. And then once we get some type

90
00:10:55,600 --> 00:11:00,559
of signal, we're just going to go back to the top of the loop and check whether we can issue a task

91
00:11:00,719 --> 00:11:09,119
again. Similarly, if all the reducers aren't done, but we can't actually issue the worker a task,

92
00:11:09,119 --> 00:11:14,559
we're going to wait for there to be some type of signal. So when does the signal actually happen?

93
00:11:15,359 --> 00:11:22,959
Well, we want to signal anytime either a task has gone on for too long and we haven't heard

94
00:11:23,040 --> 00:11:29,920
back, so there might have been a failure. Or if the if a worker has actually completed a task,

95
00:11:29,920 --> 00:11:34,160
because for example, that might mean all the map tests have finished and we can move on to a reduced

96
00:11:34,160 --> 00:11:51,200
task. So in order to do that, what we have are we have a guroutine here that's kind of spun off

97
00:11:51,200 --> 00:11:56,080
immediately as the coordinator starts. And what this does is every once in a while,

98
00:11:57,520 --> 00:12:04,400
after some maybe every second or so, when a task might not have finished, or maybe this is 10

99
00:12:04,400 --> 00:12:08,720
seconds I can't remember. Actually, it doesn't really matter. It just wants to wake up the coordinator

100
00:12:08,720 --> 00:12:14,160
every so often so that the coordinator will do another check to see whether there's a task to issue.

101
00:12:14,160 --> 00:12:19,600
And so this just loops around and every second it'll broadcast to wake up the coordinator.

102
00:12:21,680 --> 00:12:29,280
And the other time we want to signal is when a task is finished. So that's actually going to happen

103
00:12:29,280 --> 00:12:36,960
in this handle finished task, which is called when a worker like sends a I finished a task RPC.

104
00:12:37,759 --> 00:12:47,040
And so here we have a broadcast right after we set the fields to done or to complete it to done.

105
00:12:47,759 --> 00:12:54,319
And when the coordinator goes back to go check one of these loops and see whether there's a task to

106
00:12:54,319 --> 00:13:05,519
finish, it will see that updated done status. So that's essentially my solution. It uses convars and

107
00:13:05,519 --> 00:13:12,799
mutexes to protect shared state of the coordinator. So this is only one possible solution.

108
00:13:13,519 --> 00:13:21,759
And I'll get back to here. And so this is the kind of layout of the steps I took.

109
00:13:23,199 --> 00:13:27,199
Are there any questions on that particular solution before I move on?

110
00:13:31,039 --> 00:13:35,039
Can you please elaborate a little more on the conditional variable?

111
00:13:35,919 --> 00:13:50,480
Sure. So I guess like a conditional variable is very useful for when you want to wait for a

112
00:13:50,480 --> 00:13:58,959
particular predicate or particular condition to become true. So in this case, a condition variable

113
00:13:58,960 --> 00:14:08,879
is a natural, let me just go to wherever I use this. It's a natural way to implement waiting

114
00:14:08,879 --> 00:14:19,280
for there to be a task available because it's a particular condition and it occurs asynchronously.

115
00:14:19,280 --> 00:14:28,080
So for example, a task is available when a worker has finished a task or a task might be available

116
00:14:28,879 --> 00:14:39,360
when a failure occurs and we need to reissue the task. So you can think of any case in which

117
00:14:42,639 --> 00:14:47,759
you need to wait for a particular condition. That's where condition variables become very helpful.

118
00:14:49,200 --> 00:14:52,960
Does that help a little bit? Yeah, thank you.

119
00:14:53,120 --> 00:15:02,160
You can also like all of these higher level like channels, condition variables.

120
00:15:03,040 --> 00:15:08,000
All these higher level synchronization primitives are actually built on top of locks.

121
00:15:08,000 --> 00:15:14,080
So they're all implemented using locks. It's just they're kind of like a higher level way of

122
00:15:14,080 --> 00:15:17,920
thinking about synchronization that allows you to reason, for example, about conditions.

123
00:15:18,000 --> 00:15:29,120
Would that have the same effect as for example, sleeping in that loop that you have in the

124
00:15:30,479 --> 00:15:39,199
get task function instead of like having a condition variable that makes their loop run every second?

125
00:15:40,319 --> 00:15:45,679
I guess. Yeah, so it is like it's essentially the same as sleeping.

126
00:15:45,759 --> 00:16:01,679
So the loop here, the timeout loop here, the difference is that for example, the condition variable

127
00:16:01,679 --> 00:16:08,559
or you could be woken up by a task that has completed. Whereas in a loop in which you sleep,

128
00:16:08,559 --> 00:16:15,679
for example, a second every single loop, you have to wait a second. Whereas with a condition variable,

129
00:16:15,679 --> 00:16:21,119
you could be woken up after like 10 milliseconds because the worker has completed a task.

130
00:16:21,679 --> 00:16:25,519
So it potentially has better live-ness properties.

131
00:16:28,159 --> 00:16:35,599
But in this case, we do like say if every task always takes over like five seconds or something,

132
00:16:35,600 --> 00:16:41,680
then yes, this is essentially very similar to sleeping for one second every loop.

133
00:16:43,680 --> 00:16:47,600
Thanks. I have a question. I think I missed a part where you will

134
00:16:48,879 --> 00:16:55,840
how you handle when a request comes for a task, but you're like there's no tasks to give out currently.

135
00:16:55,840 --> 00:17:01,759
Like do you, how do you tell the worker to like sort of either come back or do you keep them waiting?

136
00:17:01,840 --> 00:17:10,480
And sort of tangentially to that, I'm curious why you chose this like sleep way of doing it instead of

137
00:17:10,480 --> 00:17:17,519
just like checking the time when you get a request for tasks and seeing like when you get a request,

138
00:17:17,519 --> 00:17:23,359
what has timed out and re-issuing it then instead of like possibly checking.

139
00:17:24,559 --> 00:17:29,759
Yeah, okay. So yeah, so I'll just your first question first.

140
00:17:29,920 --> 00:17:42,079
So basically how I handle the, I've completed the task is once all map tasks have finished,

141
00:17:42,079 --> 00:17:49,200
once all reduced tasks have finished, then the task that we return to the worker because the

142
00:17:49,200 --> 00:17:55,440
worker has called us, task for a task, is this extra task type that I called done.

143
00:17:55,759 --> 00:18:04,559
And then I also said the coordinator is done to true. And so in the worker, so I'll go to the worker now.

144
00:18:05,519 --> 00:18:15,279
In the worker, we have this loop that basically as the worker is asking for tasks, if it gets

145
00:18:15,279 --> 00:18:22,480
returned to tasks is a done task, then it exits. So that's how I handle conveying to the worker that

146
00:18:22,480 --> 00:18:28,880
it should exit. I guess I was asking like, sorry, if, you know, let's say you're still finishing

147
00:18:28,880 --> 00:18:34,640
up all your map tasks and you get requests for a task and you still can't give out your reduced

148
00:18:34,640 --> 00:18:45,279
tasks, how do you tell the worker? Oh, so that's a lot of you are, an alternative design is to,

149
00:18:45,920 --> 00:18:52,160
basically if the worker, if there's no task to give the worker, then the coordinator returns

150
00:18:52,160 --> 00:18:58,560
or apply to the worker immediately and the worker sleeps in that's loop. But you can see here,

151
00:18:58,560 --> 00:19:06,240
right, the worker loop, there is no sleep. And the reason for this is because this call will block

152
00:19:06,240 --> 00:19:14,320
until the coordinator replies. And in my solution, going back to the coordinator, for example,

153
00:19:14,399 --> 00:19:23,679
if you look at map done, in this solution, the coordinator handler will not return that,

154
00:19:23,679 --> 00:19:32,879
reply to that call unless it has a task to return. So we're waiting in the coordinator rather than

155
00:19:32,879 --> 00:19:41,359
in the worker. So the coordinator is the one that is constantly checking to see whether there's a task

156
00:19:41,359 --> 00:19:49,039
and sleeping, whereas the worker just simply walks on this call until the coordinator returns to it.

157
00:19:49,679 --> 00:19:54,319
Is there any advantage to doing it in the coordinator?

158
00:19:59,759 --> 00:20:09,119
So I think one advantage is that all the workers aren't constantly sending RPCs.

159
00:20:09,599 --> 00:20:15,919
You send an RPC, it's one RPC per task, right? Whereas if the worker is constantly

160
00:20:15,919 --> 00:20:19,679
living and sleeping and constantly replying, you have a lot more network traffic.

161
00:20:20,559 --> 00:20:27,439
Okay. Yeah. I think that's, but definitely both solutions are feasible and they both work.

162
00:20:28,559 --> 00:20:38,479
Right. I had one other question, which is I see you use a deferred for the for unlocking quite a bit.

163
00:20:39,919 --> 00:20:47,199
While I was doing my implementation, I realized, I mean, in a straightforward function, it's clear

164
00:20:47,199 --> 00:20:58,559
when it gives out control of the lock, but for example, if you have a go routine created from within the

165
00:20:58,559 --> 00:21:07,759
function, it's not very clear when it gives up control. So a go routine runs on a separate thread.

166
00:21:07,759 --> 00:21:13,519
So the go routine never starts with the lock acquired, even if you spin off the go routine while you

167
00:21:13,519 --> 00:21:23,039
hold the lock. Okay. Yeah. If we issue like a go, if we create a go routine, it'll just spin up a thread

168
00:21:23,039 --> 00:21:29,440
and from the beginning, it will not have a lock, right? Yeah. Yeah. It's essentially just like, you know,

169
00:21:29,440 --> 00:21:34,000
you can think about another thread just starting to run that go like go funk that function.

170
00:21:34,720 --> 00:21:43,920
Okay. Yeah. Then yeah. Go on the defer on locks at any return, like any return statement or

171
00:21:44,720 --> 00:21:53,200
yep. Yeah. It's pushed onto a like basically like the functions to run when the there's a stack of

172
00:21:53,200 --> 00:22:01,839
functions that the returning from like handle get task will run. So I also have this in the slide.

173
00:22:01,839 --> 00:22:07,199
So you'll be else referred to this later, but the fur just ensures that when this function exits,

174
00:22:07,759 --> 00:22:11,759
you will over you'll run a lock and then I could also do something like

175
00:22:15,039 --> 00:22:25,439
like unlocking and like I could just do something like before the last project or print one. So

176
00:22:26,160 --> 00:22:32,000
these are all pushed onto a stack and then they're popped off in a five four. No, like.

177
00:22:36,559 --> 00:22:46,000
First in first out. No, they're run in last and first out. Yeah. So the stack, right? So

178
00:22:48,000 --> 00:22:54,240
this will run before unlocking, which won't actually run before the lock. So if you're right to

179
00:22:54,240 --> 00:22:59,920
use multiple deferers, just be careful in order to use them. But deferring the unlock at least

180
00:22:59,920 --> 00:23:11,279
is a very useful strategy that will come in handy. Okay. So the last thing is if we call up function within

181
00:23:14,400 --> 00:23:20,480
within our function where we acquired the lock, it doesn't return the lock, right?

182
00:23:21,440 --> 00:23:27,680
when it goes to the other function, the other function returns to this function and then until we

183
00:23:27,680 --> 00:23:32,400
like the thread keeps the lock through like jumping around. Yeah.

184
00:23:34,960 --> 00:23:40,559
Yeah. So like a function that's just like a normal function called within one thread will be called

185
00:23:40,639 --> 00:23:51,119
with the lock held. Yes. Thanks. Yep. All right. So you guys have already kind of discussed some

186
00:23:51,119 --> 00:23:56,319
of the alternate synchronization designs like waiting in the worker rather than the coordinator.

187
00:23:56,319 --> 00:24:01,119
And we've talked about some of the pros and cons of that using time. Actually, I think you covered all

188
00:24:01,119 --> 00:24:07,759
of these except for channels maybe. So just one thing I wanted to know because there are a couple

189
00:24:07,759 --> 00:24:14,799
questions about this. So waiting for map tasks to be done or like any synchronization that we've shown

190
00:24:15,359 --> 00:24:21,279
is on a single server. So cross-server communication between the worker and the coordinator

191
00:24:22,319 --> 00:24:28,079
are there only it's only done ever by RPCs. So for example, like locking in the coordinator has

192
00:24:28,079 --> 00:24:33,359
nothing to do with locking on the worker or on interactive implementation locking on different servers

193
00:24:34,000 --> 00:24:38,399
like don't interfere with each other. So I just wanted to be clear about that.

194
00:24:39,679 --> 00:24:47,119
So one thing I thought would be interesting is for you to see a kind of an example using channels

195
00:24:47,119 --> 00:24:54,639
because there are also some questions using channels about using channels. So this is kind of it's a

196
00:24:55,600 --> 00:25:04,080
not complete implementation of using channels but it's a potential way to that you could think about

197
00:25:04,080 --> 00:25:11,440
having used channels in MapReduce. And so in this example, the input to the coordinator actually

198
00:25:11,440 --> 00:25:21,120
includes a channel in which the coordinator is told of what workers exist. And this is to handle

199
00:25:22,079 --> 00:25:28,639
the possibility that workers are failing. And then some client is telling the coordinator,

200
00:25:28,639 --> 00:25:33,279
hey, this other worker joined our cluster. Here's a new worker that you can give tasks to.

201
00:25:33,279 --> 00:25:36,719
So that's slightly different than what we had in the lab.

202
00:25:39,119 --> 00:25:49,439
So the coordinator has two channels. One in which it will send tasks to workers or it won't send

203
00:25:49,440 --> 00:25:53,920
tasks to workers. It will send tasks to a thread that will issue tasks to workers.

204
00:25:54,880 --> 00:26:03,519
And then it has a done channel. So again, just like I know I said something a little strange,

205
00:26:03,519 --> 00:26:07,840
which is I was like, oh, you can send tasks to workers over the channel, but you actually can't.

206
00:26:07,840 --> 00:26:12,559
The channel is only on the coordinator server. And we'll see how that works in a second.

207
00:26:13,519 --> 00:26:20,399
So the first thread of the coordinator that we create is a go routine that basically will for

208
00:26:20,399 --> 00:26:31,279
every worker start the issue worker task thread. So what this does is as workers are coming and going

209
00:26:31,279 --> 00:26:36,480
because they're failing and then restarting, this channel basically says, okay, we want to for

210
00:26:36,559 --> 00:26:45,039
every of these workers start a thread that will issue this worker tasks. So this is one go routine here.

211
00:26:46,640 --> 00:26:52,240
Then the coordinator, what it does is it for all the tasks that we're given, it'll just push those

212
00:26:52,240 --> 00:26:58,319
tasks onto this task channel. And this task channel, we actually made it a buffer channel.

213
00:26:58,880 --> 00:27:06,240
So we know it will hold exactly non-task tasks, which are the, that's the limit of the number of tasks.

214
00:27:06,640 --> 00:27:12,960
That will exist on the system. So what this also means is that we can push the number of tasks

215
00:27:14,000 --> 00:27:20,480
tasks onto this channel without blocking. So the coordinator will not block on pushing tasks to

216
00:27:20,480 --> 00:27:29,759
the task channel. And then the coordinator will read from this done channel until it has done so

217
00:27:29,759 --> 00:27:36,160
number of tasks times, in which case it knows it's done. In this case, I'm not separating

218
00:27:36,160 --> 00:27:40,799
map and reduce tasks. Let's just imagine that there are some number of tasks that the coordinator

219
00:27:40,799 --> 00:27:47,599
needs to run. And once it's knows the task, all the tasks have finished, it closes the task channel.

220
00:27:48,480 --> 00:27:59,519
And then basically will exit. And so the, whereas some of the interesting part comes in is these

221
00:27:59,519 --> 00:28:06,240
worker tasks threads, which I've separated out into a function here. So these all run on

222
00:28:06,240 --> 00:28:14,319
separate go routines. And what it does is for as long as there are tasks in the task queue,

223
00:28:14,960 --> 00:28:25,839
it will pull a task out. And then, oops, I didn't mean to that. And then call basically an RPC that

224
00:28:25,839 --> 00:28:33,119
will send the tasks to the worker. So note that this channel actually is talking to another thread

225
00:28:33,119 --> 00:28:40,799
of the coordinator. And that thread is actually the one that's in charge of calling the worker.

226
00:28:42,399 --> 00:28:49,519
And then once it's done with the task, it says it's done. If it's not able to, if the call fails

227
00:28:49,519 --> 00:28:56,160
for some reason, for example, it times out, then what this loop does is it'll push that task back

228
00:28:56,160 --> 00:29:01,839
onto the task channel. So another worker, or potentially this thread again, could pick up that task.

229
00:29:03,359 --> 00:29:09,839
So just to clarify how the channel communication works, so the worker sends tasks on the task channel,

230
00:29:09,839 --> 00:29:18,319
which is read through these loops. And this loop will exit when the coordinator closes the channel.

231
00:29:20,319 --> 00:29:28,639
Done. It's sent on these worker issue worker threads. And it's read by the coordinator, the original

232
00:29:28,639 --> 00:29:36,160
coordinator thread. And this exit equals true, will basically tell the coordinator like, oh, I don't

233
00:29:36,160 --> 00:29:43,119
need to listen for anymore workers coming or workers starting up. So it'll cause this other go routine

234
00:29:43,119 --> 00:29:49,039
to exit. So I know that this is a pretty complex example. It's also not quite what we

235
00:29:50,479 --> 00:29:55,039
specified in the lab, but it's an example of how channels could be used to implement something

236
00:29:55,039 --> 00:30:03,679
like MapReduce, or something similar to MapReduce. That is a question in the chat about where is exit

237
00:30:03,680 --> 00:30:15,039
defined in this code? That is a good question. It's not. So it will be exactly the same thing is

238
00:30:15,039 --> 00:30:25,360
done. You'll just be another channel that's a Boolean. Yeah. That's a good catch.

239
00:30:27,039 --> 00:30:32,480
Oh, can I ask you how do you add things to the worker channel, or when do you add things to the

240
00:30:32,480 --> 00:30:39,759
worker's channel? How would you handle them this gives? Yeah. So in this case, the worker's channel is

241
00:30:39,759 --> 00:30:47,920
provided to the coordinator. So imagine that, for example, in how your coordinator was actually

242
00:30:47,920 --> 00:30:58,880
called or created by the MR coordinator in Maine in the back folder. So we would imagine that

243
00:30:59,520 --> 00:31:06,800
in an MR coordinator, we would create a worker's channel. And MR coordinator would basically

244
00:31:06,800 --> 00:31:15,200
be in charge of tracking when workers crash and when workers join. So this is, for example, in a case

245
00:31:15,200 --> 00:31:22,400
where maybe new servers are added to our cluster at some later point, or some worker crash and then

246
00:31:22,400 --> 00:31:30,000
came back. And MR coordinator would be constantly sending like these worker IDs to our coordinator

247
00:31:30,960 --> 00:31:36,880
in order to tell it, hey, like there's new worker, you should start issuing a test. So that part

248
00:31:36,880 --> 00:31:43,840
is not shown. Got it. Yeah. I just, I just, uh, was wondering like, so it's really cool. I was

249
00:31:43,840 --> 00:31:49,600
just wondering like inside like the lab one, like how, I think it's like call worker and you've

250
00:31:49,599 --> 00:31:54,319
decided RPC to the worker. If that's something we could have done in the lab one.

251
00:31:57,119 --> 00:32:04,079
It's possible, but it definitely was not what we pushed you toward. Because you would basically

252
00:32:04,079 --> 00:32:09,599
insist setting up the coordinator as being the RPC server, you would have to set up like RPC servers

253
00:32:09,599 --> 00:32:18,399
on the workers. You could also think of in this implementation, call worker could have handlers

254
00:32:18,480 --> 00:32:26,000
actually for each worker. And each worker could be sending the coordinator, like get task RPCs.

255
00:32:26,000 --> 00:32:33,360
That's a little, that's a little funky. So in this example, it's actually more natural to imagine

256
00:32:33,360 --> 00:32:39,840
that call worker, that the coordinator is a client and the workers are the ones that are handling

257
00:32:39,919 --> 00:32:48,720
RPCs. Got it. Yeah. Okay. Thanks. Really cool. I have two questions. First is just a general,

258
00:32:48,720 --> 00:32:55,519
like go question. So in that second for loop on the left, at the bottom, if you don't use I will go

259
00:32:55,519 --> 00:33:07,679
complain or in a for loop. Uh, so I run like all the go, linter and all that stuff. And it's fine. I think,

260
00:33:07,680 --> 00:33:16,480
like in this case, you do need to have I because you're incrementing and keeping the state of I

261
00:33:16,480 --> 00:33:23,920
around through the, can you do the same thing with like a, like just a, like a while loop, like a

262
00:33:23,920 --> 00:33:32,799
just for empty for loop with a select, where it's like popping off of done. So

263
00:33:33,359 --> 00:33:42,399
you can't actually, well, you still need to keep track of how many times you've read from done,

264
00:33:42,399 --> 00:33:48,559
right? Because you can't just read once. You have to read number of tasks times.

265
00:33:52,079 --> 00:33:59,200
I see. Yeah. So you do need some type of state that will track that.

266
00:34:02,799 --> 00:34:06,720
And then it's for the for the one on the right, like the where you're like reading from

267
00:34:06,720 --> 00:34:13,920
ask and repopulating it. Is there like any downside to that or if you're like just constantly reading

268
00:34:13,920 --> 00:34:23,119
and adding back and forth the same channel? Uh, I don't, I can't think of it off the top of my head. So

269
00:34:23,119 --> 00:34:29,279
in this case, at least, you won't block because every time you read it, you're popping something off

270
00:34:29,280 --> 00:34:36,160
the channel, every time you, um, add it, you're putting something. So because we have that,

271
00:34:36,160 --> 00:34:44,720
the task is a buffer channel, like you'll never block on that. So in terms of like performance,

272
00:34:45,440 --> 00:34:51,680
I think, I mean, channels are built using locks. So locks are usually more lightweight.

273
00:34:52,880 --> 00:34:58,560
But I don't think, I don't think you'll see like a huge performance impact. I'm doing something

274
00:34:58,559 --> 00:35:04,079
like this. Okay. I guess I have like a, sorry, just like a general question of like,

275
00:35:04,799 --> 00:35:11,840
what's your like calculus for choosing between mutex's and channels or like a hybrid or like at the very

276
00:35:11,840 --> 00:35:19,759
beginning? Yeah. So mutex's are very natural for just protecting a piece of state. So like,

277
00:35:20,320 --> 00:35:26,239
your coordinator or like your rough servers have a log. I want to protect every time I append to the

278
00:35:26,239 --> 00:35:34,079
log. Um, that seems very difficult or it seems very unnatural to try and do using channels.

279
00:35:34,719 --> 00:35:40,159
Because essentially, you'd be using the channels lock. You'd want to ensure that no one else is

280
00:35:40,159 --> 00:35:45,199
modifying the state while you're modifying it. And then you would have to essentially before you

281
00:35:45,199 --> 00:35:50,479
modify it, try to read on the channel to ensure that no one else or like someone would have to

282
00:35:50,479 --> 00:35:54,799
send something on the channel to show that they've done, they've been finished modifying and so on

283
00:35:54,880 --> 00:36:01,120
so forth. So in that case, it's actually very hard to imagine how you would do a channels, whereas

284
00:36:01,120 --> 00:36:08,640
mutex's would make that completely straightforward. Uh, where channels come in very handy is like,

285
00:36:08,640 --> 00:36:14,960
I think our implementation already has this like apply channel is where you have to wait for

286
00:36:16,880 --> 00:36:23,360
in some ways, it's like almost like a specific instance of a condition variable. And what you

287
00:36:23,360 --> 00:36:34,800
want to wait for something to be ready, or a, um, like a very specific type of command to be finished.

288
00:36:36,320 --> 00:36:42,480
So for something like issuing tasks, it's actually not a bad example. Or something like

289
00:36:43,440 --> 00:36:49,120
blocking until you have something on a queue. It like, you can almost think of it as like a queueing

290
00:36:49,119 --> 00:36:55,759
system. Or at least that's how I like to think about it. But for almost all modifications to shared

291
00:36:55,759 --> 00:37:03,759
state or like the race conditions, you'll encounter locks are much simpler and in some ways a lot

292
00:37:03,759 --> 00:37:14,159
easier to reason about. But yeah. Thank you. Sorry, I have a follow up question to this slide.

293
00:37:14,319 --> 00:37:22,000
Um, what happens if the, so you call the go issue worker task thread, which spins up another go

294
00:37:22,000 --> 00:37:28,639
routine, I mean it goes through all the tasks in the channel. What if it fails when it's, what if

295
00:37:28,639 --> 00:37:42,079
the go routine fails when it's sitting on the if call worker? So if it fails, then I guess you've

296
00:37:42,079 --> 00:37:54,799
taken a task out and not put it back. Hmm, I'm actually not sure that seems like a, like you're not,

297
00:37:54,799 --> 00:38:01,440
you're saying like the entire thread crashes, rather than has call worker not like returning

298
00:38:01,440 --> 00:38:07,759
falls or something. Yeah, like the go routine crashes. Or is that possible for us,

299
00:38:07,840 --> 00:38:11,920
single go routine to fail or what like the entire thing just blow up?

300
00:38:14,160 --> 00:38:20,000
So you've run Cena? I think the model you should have is that if go routine crashes to process crashes.

301
00:38:21,760 --> 00:38:34,240
Yeah, that would solve it. Oh, sorry. So if just the worker crashes, then you pick a different task,

302
00:38:34,239 --> 00:38:42,559
but should you, I guess you would still have the same worker, like worker number.

303
00:38:44,719 --> 00:38:48,959
So we still connect to the same worker, even though they have failed.

304
00:38:49,919 --> 00:38:54,399
Yeah, so in this case, basically call worker, we're just continued returning falls.

305
00:38:55,119 --> 00:39:01,279
And you know, this go routine that's specific for this worker, we just continue to loop.

306
00:39:01,440 --> 00:39:09,840
And eventually when the, when the coordinator has determined that all the tasks have finished,

307
00:39:09,840 --> 00:39:16,160
it'll close the channel and then this go routine will exit. So there could potentially like if all your

308
00:39:16,160 --> 00:39:21,600
workers continue crashing, you have like hundreds of new workers joining, like you could potentially

309
00:39:21,600 --> 00:39:26,320
have a lot of go routines just that are just like, I can't contact my worker, I can't contact my worker.

310
00:39:26,800 --> 00:39:30,640
But once the task has finished, this all them will exit.

311
00:39:31,200 --> 00:39:31,760
Carverly.

312
00:39:39,519 --> 00:39:47,120
Cool. All right. So that's an example with channels. And now let's move on to some of the more like

313
00:39:47,680 --> 00:39:52,720
your questions and bugs and things like that. So some common but casting design mistakes that we saw

314
00:39:52,959 --> 00:39:58,239
was pushing too much work to the coordinator. So essentially making the coordinator bottleneck.

315
00:39:59,039 --> 00:40:05,279
And this included both like the coordinator and sorting the results or the coordinator,

316
00:40:05,279 --> 00:40:11,439
like reading file contents, whereas a lot of the kind of beauty of MACReduce is that

317
00:40:12,159 --> 00:40:19,279
all the state, all the computation happens on the workers. And another common,

318
00:40:19,280 --> 00:40:25,280
it's not really a mistake, but potentially something that you could think about is how many RPCs

319
00:40:25,280 --> 00:40:32,800
are you sending? And like, do you really need to send that many RPCs? So for example, sending an RPC

320
00:40:32,800 --> 00:40:38,240
to check whether there's a MAC task available and then sending another RPC to ask like, give me a task,

321
00:40:38,800 --> 00:40:46,080
is a little overdone and you want to try and like reduce the number and types of like, reduce the

322
00:40:46,079 --> 00:40:53,279
API between the master or the coordinator and the worker. But these were like they would pass the test

323
00:40:53,279 --> 00:41:01,039
and it's just things we wanted to point out. So now, okay, cool. We're about like halfway through

324
00:41:01,039 --> 00:41:07,920
lecture. So for the next say like five, six minutes, why don't we're going to do breakout rooms?

325
00:41:08,880 --> 00:41:13,200
Let me stop sharing actually. All right, so we'll do breakout rooms and

326
00:41:14,000 --> 00:41:23,200
Oh shoot. Let's see. I think Sam just crashed on me.

327
00:41:28,000 --> 00:41:34,480
We can still hear you. I'll see you. All right, I'm back. Yeah, I upgraded to do right

328
00:41:34,480 --> 00:41:38,240
before this lecture. That was a bad idea. But all right, for the next five or six minutes,

329
00:41:38,800 --> 00:41:44,719
you should talk about just like, you know, any interesting bugs or observations you had about

330
00:41:44,719 --> 00:41:50,320
love or you could, you know, complain about how long it took you to find a certain bug or ask

331
00:41:50,320 --> 00:41:56,240
questions to each other and then we'll come back and go over some of your questions. All right.

332
00:41:56,239 --> 00:42:04,319
All right. All right. Let's see you in a bit.

333
00:42:27,199 --> 00:42:30,239
Oh, so I start here with Franz. Do you want me to review somewhere else?

334
00:42:30,879 --> 00:42:36,159
Probably best. Let me see if I can do it myself. Okay, I'm going to be right back.

335
00:49:26,559 --> 00:49:38,399
All right. All right.

336
00:49:39,199 --> 00:49:49,679
Are we mostly back? Thanks. All right. Cool. All right. So I hope that was pretty fun. Or at least

337
00:49:49,679 --> 00:49:52,319
you got to talk about some of your observations. Thank you, Billette.

338
00:49:52,480 --> 00:49:58,000
Yeah. So for the rest of the lecture, we're going to go through, oh, right.

339
00:49:58,000 --> 00:50:02,880
First, before questions, some general tips that you'll want to look out for for future lots.

340
00:50:04,320 --> 00:50:10,800
So first of all, the one thing you'll find very handy for debugging is just, you know,

341
00:50:10,800 --> 00:50:16,640
classic printups. And so you can have conditional printups, which only print when you want to

342
00:50:16,640 --> 00:50:20,800
debug. So for example, you don't have to go through your code and comment them all out before you

343
00:50:20,800 --> 00:50:28,560
submit or something like that. And so in the Wrath Lab, we provide this deep printf in the utils.go file.

344
00:50:29,680 --> 00:50:36,080
And you can modify that to, for example, also print out like the server ID every single time you

345
00:50:36,080 --> 00:50:42,160
call it deep printf or something like that. So, you know, customize it to, you know, print out in

346
00:50:42,160 --> 00:50:48,160
different colors for different RPCs, things like that. And also, like redirecting your output to

347
00:50:48,159 --> 00:50:54,879
files just so that you can like search for the files will come in handy. Another trick that you

348
00:50:54,879 --> 00:51:01,039
probably want to keep in mind is you can look at all the go routines to see where and their, like,

349
00:51:01,039 --> 00:51:07,119
execution they're running. And so just type control backslash in order to do that.

350
00:51:08,319 --> 00:51:13,119
And the final thing which we've already sort of talked about are these to first. And these slides

351
00:51:13,119 --> 00:51:20,400
will be uploaded also so you can refer back to them. But essentially you can push multiple functions

352
00:51:20,400 --> 00:51:26,400
to run right before the function returns. And they just be careful of the ordering.

353
00:51:28,000 --> 00:51:34,639
All right, so now let's get to some of your questions. A lot of you submitted also questions

354
00:51:34,639 --> 00:51:41,359
about Wrath. So those will get to for like the Wrath Q&A or like maybe office hours or even the

355
00:51:41,360 --> 00:51:46,000
on Piazza. But I'm going to focus mostly on the ones from MapReduce or maybe you have time

356
00:51:46,000 --> 00:51:54,160
then we can also get to the Wrath questions. All right, so the first category of questions kind of

357
00:51:54,160 --> 00:52:02,160
falls under questions specifically about MapReduce. So some more complex tasks that you might want to

358
00:52:02,160 --> 00:52:08,480
use MapReduce for. It's actually used a lot in ML or like data mining statistical applications.

359
00:52:09,280 --> 00:52:16,559
I linked here to Piazza, which is the implements MapReduce and a lot of people use it to run

360
00:52:16,559 --> 00:52:26,639
these type of tasks. And for example, here's a simple or maybe not so simple but basically matrix

361
00:52:26,639 --> 00:52:34,400
multiplication example of how you would run that using MapReduce. So I need like you for full

362
00:52:34,400 --> 00:52:42,000
tolerance with the coordinator. The paper booth is a very simple check pointing mechanism in which

363
00:52:42,000 --> 00:52:47,760
you'll just start up the a new coordinator using the last checkpointed state. And in some ways this

364
00:52:47,760 --> 00:52:54,880
is a very natural design for MapReduce because everything is deterministic. There's no. The coordinator

365
00:52:54,880 --> 00:52:58,559
really doesn't have that much state to hold. All it needs to know is like which tasks have finished and

366
00:52:58,559 --> 00:53:06,239
which tasks have happened. So you could use Wrath of course to like enable full tolerance and have

367
00:53:07,759 --> 00:53:14,000
set of coordinators that all agree on like the commands that is issued so far and their current state.

368
00:53:14,000 --> 00:53:22,400
But in some ways this is a little overkill for the coordinator for something that's more

369
00:53:22,400 --> 00:53:28,320
stateful. It's like a key value store or something. It's much more natural to use like Wrath.

370
00:53:31,039 --> 00:53:36,320
So some other questions about MapReduce, the shuffle or combine or step when does it happen and

371
00:53:36,320 --> 00:53:42,000
what does it do. So combining occurs like right after the map functions applied. For example,

372
00:53:42,000 --> 00:53:47,280
in combining the word counts of a particular word because having a lot of entries that you know like

373
00:53:47,280 --> 00:53:56,080
the one you could combine them and then write only that to the immediate file or intermediate file.

374
00:53:57,120 --> 00:54:02,160
Sorting occurs at the reduce after all the outputs of the map are read by the reducer.

375
00:54:04,080 --> 00:54:09,040
Let's see, a successor to MapReduce. Yeah, so actually I'm not super familiar with it but you

376
00:54:09,039 --> 00:54:17,119
can look at stuff like Google Cloud Data Flow and other sort of directed graph computations where

377
00:54:17,119 --> 00:54:22,320
inputs flow into a node. So you can think of it as a graph and then they might flow out to other

378
00:54:22,320 --> 00:54:28,400
nodes and that node in the middle that performs for example on map computation and produces intermediate

379
00:54:28,400 --> 00:54:35,440
data that is then sent to other like reducer nodes in the graph. So it's a interesting way,

380
00:54:35,440 --> 00:54:42,639
it's like a data flow way to think about MapReduce. And I'm sure that there's others that I'm not

381
00:54:42,639 --> 00:54:48,400
necessarily like that word. One of them is Spark which we'll read later about.

382
00:54:52,880 --> 00:54:58,320
Yeah, so but I like the graph way of thinking about MapReduce because right now we're only

383
00:54:58,320 --> 00:55:04,720
really thinking about like a two-step operation where it could actually be like you know many many steps.

384
00:55:06,880 --> 00:55:14,000
Oh yeah, and then how our inputs partition and practice so usually because the input space is

385
00:55:14,000 --> 00:55:19,600
very application specific and the output space is also application specific. It's really up to the

386
00:55:19,599 --> 00:55:32,559
programmer to specify. There's sometimes our natural inputs for example like maybe the local

387
00:55:33,199 --> 00:55:39,679
matrix computations and you want to combine them or so on and so forth. Or you could if it's just

388
00:55:39,679 --> 00:55:45,440
like an enormous document or like enormous text files you can just split it up into a reasonable

389
00:55:45,440 --> 00:55:50,400
size of the work so that you know like applying the map function isn't going to take forever. And

390
00:55:50,400 --> 00:55:53,760
also it depends on the size of your cluster. So how many workers you have.

391
00:55:57,280 --> 00:56:02,720
So some further MapReduce questions. Why do macros for files locally? So in the paper,

392
00:56:02,720 --> 00:56:09,840
this is because at that time the network bandwidth was their bottleneck. That's why they don't

393
00:56:09,840 --> 00:56:20,079
use GFS and they only use GFS to write the yeah to write the output files. Our leaders necessary

394
00:56:20,079 --> 00:56:27,519
for distributed systems not necessarily. They're like think of Bitcoin or like other decentralized

395
00:56:27,519 --> 00:56:32,880
systems in which all the nodes sort of perform computation and some random node or like some node

396
00:56:32,880 --> 00:56:37,920
in the network is responsible for committing that. So they're definitely more like egalitarian designs.

397
00:56:40,160 --> 00:56:44,880
But yeah, and then our challenge was actually to run MapReduce on like actual different servers

398
00:56:44,880 --> 00:56:52,320
rather than what we kind of had you do in the lab. And so in order to do this like you would just

399
00:56:52,960 --> 00:57:00,720
instead of using sockets to communicate over for like the RPCs, you would use like TZPID basically

400
00:57:00,720 --> 00:57:08,880
like normal like over the network communication. And you would use a share file system like

401
00:57:08,960 --> 00:57:15,360
GFS. So the equivalent I think all of you have access to Athena if at least if you're MIT and you could

402
00:57:16,400 --> 00:57:23,440
association to multiple Athena machines and use AFS which is the share file system that Athena uses

403
00:57:23,440 --> 00:57:30,800
to. Basically you can access your files on Athena from any machine. Similarly, you could do the

404
00:57:30,800 --> 00:57:38,559
same thing by renting AWS instances and using S3. But we didn't expect you to spend any money to

405
00:57:39,280 --> 00:57:47,599
run our lab. Right, so some questions that came up about just like general code design. So some of

406
00:57:47,599 --> 00:57:54,960
these we've discussed as well. So lab one was pretty small. Lab two is going to be much louder

407
00:57:55,599 --> 00:58:00,880
especially as you get to the later stages and as lab three and lab four come along as well.

408
00:58:01,760 --> 00:58:08,880
And one thing that I personally find very handy is to separate different chunks of code by their

409
00:58:08,880 --> 00:58:18,559
purpose. So and also in how I implement each step of my code. So separating them out by for example

410
00:58:18,559 --> 00:58:25,920
RPCs and the sellers and handlers and feel free to actually separate these out like physically in

411
00:58:26,000 --> 00:58:33,760
different files. That won't like that's fine for a test and it will probably help you like not have

412
00:58:33,760 --> 00:58:41,840
thousands of lines of code in one gigantic file. I personally like to put all definitions of state

413
00:58:41,840 --> 00:58:48,000
together and then functions are like sort of separate but that's my personal preference.

414
00:58:48,960 --> 00:59:00,639
So for example, every single RPC you will get in RAP you need to check for a sale term. So putting

415
00:59:00,639 --> 00:59:05,360
all that logic so that we set all the state properly and everything into one function that you

416
00:59:05,360 --> 00:59:11,679
just call will help because you know you don't want to accidentally forget just like reset your

417
00:59:11,679 --> 00:59:18,000
election timer like we said voted for or something. Although you should have reset the

418
00:59:18,000 --> 00:59:24,639
election timer so don't do that. That was an example I pulled off the top of my head. And also finally

419
00:59:24,639 --> 00:59:29,759
having a good environment with like autocomplete or like being able to search for certain keywords

420
00:59:29,759 --> 00:59:36,399
in your code and so forth can help a lot. So if you need any help setting this up like comes

421
00:59:36,400 --> 00:59:42,720
off as ours or this tons of tutorials online you can look up you know a good editor but it's

422
00:59:42,720 --> 00:59:49,599
not necessary it's definitely not necessary but it does help. And then oh yeah so someone asked

423
00:59:49,599 --> 00:59:54,160
how's using Go decreased the amount of time students spend debugging. So I've never actually

424
00:59:54,160 --> 01:00:01,680
implemented the labs in C++ but according to friends like well the one huge advantage of Go

425
01:00:01,679 --> 01:00:07,359
is it's memory management. So it uses garbage collection and you don't have to deal with like you know

426
01:00:08,319 --> 01:00:12,719
there are pointers but you don't have to deal with them in the same way that you would in C or C++

427
01:00:13,839 --> 01:00:19,839
so like I don't know how many of you run into cycle so far but I'm guessing very few of you or

428
01:00:19,839 --> 01:00:27,599
they were very easy to fix and this definitely makes it easier to debug or they're just certain types

429
01:00:27,599 --> 01:00:34,079
of bugs that you don't need to worry about. Sorry I have a question. Yeah and this is like a more

430
01:00:34,079 --> 01:00:41,440
go specific question but when you have a function that can take in let's say you have like a

431
01:00:41,440 --> 01:00:46,960
you have like that pen entries arc and you also have like the request vote arc both of them have

432
01:00:46,960 --> 01:00:53,119
a term variable inside but when you pass it to a function how do you tell the function that's like

433
01:00:53,119 --> 01:01:05,679
hey I expect a struct that has a term field. Is that possible? So you you define the types right

434
01:01:05,679 --> 01:01:12,880
so it's like any other type you're when you pass it into the function the function expects

435
01:01:12,880 --> 01:01:19,839
an argument of a particular type and those types yeah yeah let's say I want to share one function

436
01:01:19,840 --> 01:01:25,519
across both types. I believe you can use an interface but I'm not sure. Oh yeah.

437
01:01:26,640 --> 01:01:32,240
So I tried using it. Yeah I tried using it. But when I do dot term it says I don't know this field

438
01:01:32,240 --> 01:01:38,160
or like it doesn't want to say. I think you need to convert it or you need to still have casting

439
01:01:38,160 --> 01:01:43,840
I can't ever but there's a way to coerce. You have to type catch the back you know to whatever

440
01:01:43,840 --> 01:01:53,360
you want to access. Like you basically need to tell go that by the time I actually use this

441
01:01:53,360 --> 01:01:59,519
variable it is of a particular type. Got it thank you. So one thing if you want to reuse the

442
01:01:59,519 --> 01:02:05,280
function for multiple different types you can pass in an interface but you might also need to pass

443
01:02:05,280 --> 01:02:12,960
in for example a like a enamel or a bull or something that tells it like hey this is going to be

444
01:02:12,960 --> 01:02:17,599
this type and then you need to cast that interface into the right type before you use it.

445
01:02:19,920 --> 01:02:26,159
I think the way people usually handle this is by putting setters and getters in the interface

446
01:02:26,159 --> 01:02:31,760
so you don't actually need to know which type it is in actuality you can just access the variable

447
01:02:31,760 --> 01:02:42,720
using interface. Yeah but yeah I don't think it you should need to use interfaces

448
01:02:42,960 --> 01:02:48,720
that much in raft like I don't think I used it all other than the command which is provided.

449
01:02:53,440 --> 01:02:59,119
Yeah like I guess Dr. Neal column pieces of code is good unless it adds additional complexity.

450
01:03:02,159 --> 01:03:09,039
Or like I wouldn't try and force your types to all be able to run the same function like it might

451
01:03:09,039 --> 01:03:15,119
just be simpler to two slightly different functions. Or if the only like shared piece you're using

452
01:03:15,119 --> 01:03:20,320
is the term you can have like the same function taken just the term and in both cases pass in the

453
01:03:20,320 --> 01:03:30,559
dot term of the structure we're using. Yeah. All right some other code design questions. This is your

454
01:03:30,559 --> 01:03:37,279
two museum point. Once separating the code into multiple files is their naming conventional

455
01:03:38,000 --> 01:03:43,840
required because when we make the lab it seems like it's copying the source file so is there any

456
01:03:43,840 --> 01:03:51,600
naming commission? Yeah. I mean I would put them in raft the raft folder but there's no naming

457
01:03:51,600 --> 01:03:57,840
convention like you can name your files whatever you want. Okay. Our grading script will replace

458
01:03:57,840 --> 01:04:05,519
anything that's necessary or like anything that belongs to the testing framework. So the config file

459
01:04:05,599 --> 01:04:09,679
or like the test file anything that you change in there will be wiped out.

460
01:04:12,480 --> 01:04:18,159
Yeah there's like also be slightly careful about using external dependencies.

461
01:04:20,239 --> 01:04:26,559
I ran into a couple of issues with grading some scripts that had external dependencies like

462
01:04:26,559 --> 01:04:33,440
using some GitHub package, go package but those were I was able to like fix it just be a little

463
01:04:33,440 --> 01:04:38,800
careful if you do that. But yeah create as many dog go files and raft is one.

464
01:04:42,000 --> 01:04:48,480
Yeah so a pointer versus a value while passing by reference can be cheaper because go won't

465
01:04:48,480 --> 01:04:57,519
just like copy the struct. This was this question was asked in particular for why call takes the

466
01:04:57,599 --> 01:05:04,639
arguments and the reply as pointers and so yeah those could be potentially extremely large and

467
01:05:04,639 --> 01:05:09,440
so good doesn't have to copy them when you call the function that's the main reason. Using

468
01:05:09,440 --> 01:05:15,280
bug lots and channels are possible yes you'll use them both in raft so you will definitely see

469
01:05:15,280 --> 01:05:23,360
how it's possible. Oh yeah and then we're getting a lot of questions about timeouts. So in math

470
01:05:24,079 --> 01:05:29,200
the map reduced a lot the timeout was sort of what we gave you a set 10 seconds for the worker

471
01:05:29,200 --> 01:05:33,599
task when they fail but in terms of like how long do you sleep and stuff you were pretty much

472
01:05:33,599 --> 01:05:39,280
able to choose anything under that. For raft you have to choose timeouts a little more carefully

473
01:05:39,280 --> 01:05:45,120
and our tests are like kind of sensitive but not super sensitive like you'll be always

474
01:05:45,120 --> 01:05:50,559
for example probably be within a range of like one to 100 to 200 milliseconds and be fine.

475
01:05:51,519 --> 01:06:02,159
Yeah in terms of choosing them it probably helps to first think about why you're waiting at all

476
01:06:03,440 --> 01:06:11,840
and for example in the for raft your leader is sending hard beads and your timeout is to detect

477
01:06:11,840 --> 01:06:19,679
when the leader is dead. So you kind of want to give the leader a couple chances to tell you that

478
01:06:19,679 --> 01:06:27,440
it's alive otherwise you'll just continuously think it's dead. So depending on what you set your

479
01:06:27,440 --> 01:06:32,159
heartbeat timeout to be or your heartbeat interval to be which I think we give you some guidelines

480
01:06:32,159 --> 01:06:38,960
if it can't be more than 10 times per second or sign like that. Depending on what you set your

481
01:06:38,960 --> 01:06:43,599
heartbeat to be you'll want your timeout to be something like pretty reasonable like maybe allow

482
01:06:44,319 --> 01:06:50,880
the chance to get two to three hard beads and then you'll have to randomize some like range

483
01:06:50,880 --> 01:06:56,319
because you don't want all your service to start elections at the same time and to do that you can

484
01:06:57,119 --> 01:07:06,880
you know like a range of maybe like two to five hard beads some timeout between there is reasonable

485
01:07:07,599 --> 01:07:14,480
but in terms of the test you'll see whether you're sending too many RPCs or too many bites are going

486
01:07:14,480 --> 01:07:21,680
over the network as the test goes in later lives and you can tweak your timeouts very easily. It's

487
01:07:22,240 --> 01:07:29,920
slightly implementation dependent so I can't tell you like what's the perfect number for you

488
01:07:29,920 --> 01:07:36,559
but think of it in terms of like why am I timing out in the first place and how many RPCs do I want

489
01:07:36,559 --> 01:07:41,440
to get from like other servers before I timeout is a good metric to keep in mind.

490
01:07:43,920 --> 01:07:50,079
Hopefully that helps a little timeouts. Okay yeah so some implementation questions that

491
01:07:51,279 --> 01:07:59,119
came up about the MapReduce Lab and also the labs in general. So some people actually did

492
01:07:59,119 --> 01:08:03,679
implement backup tests which is pretty cool and we definitely did not require that for this lab.

493
01:08:04,399 --> 01:08:09,759
And I think something that that was important to keep in mind is that the paper

494
01:08:10,399 --> 01:08:17,519
has makes a distinction between starting restarting a task because a worker has failed and

495
01:08:18,720 --> 01:08:26,399
issuing the task again to speed up a lagging task that the worker hasn't failed but you want the

496
01:08:26,399 --> 01:08:31,759
task to complete faster. And so backup tasks are used for the latter when tasks aren't

497
01:08:31,759 --> 01:08:38,879
haven't failed yet but they're they're just slow and timeouts we start tasks when workers are

498
01:08:38,879 --> 01:08:45,039
actually detected to fail. So in the paper the coordinator actually gets heartbeat from the workers

499
01:08:45,759 --> 01:08:52,559
whereas in the design that we propose for your lab we use timeouts both to detect that worker

500
01:08:52,560 --> 01:08:59,600
has probably failed and also to detect slow tasks. So in some ways we make that just we don't have

501
01:08:59,600 --> 01:09:05,360
that distinction. We just assume that like if this task hasn't completed in this set of time

502
01:09:05,360 --> 01:09:09,760
that you know like probably the worker has failed or maybe it's just insanely slow and let's reissue

503
01:09:09,760 --> 01:09:20,640
it. So that's why our labs don't really mention backup tasks. So and then yeah so this is again

504
01:09:20,640 --> 01:09:26,320
going back to the confusion the next question about like synchronization if the servers are in

505
01:09:26,320 --> 01:09:32,560
different machines so the servers are on different machines and they only communicate using RPCs.

506
01:09:32,560 --> 01:09:37,280
All synchronization is just protecting or like synchronizing the threads on one server.

507
01:09:38,880 --> 01:09:40,880
I just wanted to emphasize that one more time.

508
01:09:40,960 --> 01:09:53,840
Common sources of race conditions just you know locking. In some ways I think someone's talking about

509
01:09:53,840 --> 01:09:59,440
like you know how do you know when to lock and how do you know when to you know using synchronization.

510
01:09:59,440 --> 01:10:06,720
So anytime you're modifying the state of the you know like your RAP server or the coordinator

511
01:10:06,720 --> 01:10:12,400
anytime you modify the state you want to lock and what you'll notice is that

512
01:10:14,000 --> 01:10:20,720
for almost every function in your RAP implementation for example you will have a lock and then

513
01:10:20,720 --> 01:10:27,520
a defer a lock like right after that. The only times you need to make sure that you're not locked

514
01:10:27,520 --> 01:10:35,440
is when you make a call that might block. So sending an RPC you know sending something over a channel

515
01:10:36,079 --> 01:10:40,719
those type of operations you shouldn't lock around because then your that thread will just be

516
01:10:40,719 --> 01:10:46,399
blocked and hold the lock and stop the server any thread on the server from making progress.

517
01:10:48,479 --> 01:10:53,839
Yeah and then there are also some questions about like there are some data races that have been

518
01:10:53,839 --> 01:10:59,439
iron like for example you could set is done to be true and you know like you don't really need

519
01:10:59,439 --> 01:11:05,519
to lock around up but the race detector is complaining. You could use an atomic pool which has the

520
01:11:05,519 --> 01:11:11,919
same behavior as like walking before and unlocking after but even though you might think this data

521
01:11:11,919 --> 01:11:19,039
races benign it's undefined behavior so it just so happens that you know eventually the next read

522
01:11:19,679 --> 01:11:25,039
like your read might miss the fact that it's done but the next time you call is done it'll say true

523
01:11:25,039 --> 01:11:32,159
and then you're fine but undefined behavior could technically be implemented as anything like it's

524
01:11:32,159 --> 01:11:37,680
just so happens that you're compiler and you're a processor does something reasonable when there's

525
01:11:37,680 --> 01:11:43,359
a data race so you should handle them especially when they're this simple and they don't really

526
01:11:43,359 --> 01:11:54,319
affect performance that much. Another thing is well in in theory you could have this like is done

527
01:11:54,319 --> 01:12:00,880
data race could potentially mean that your process would never exit because you know the right to

528
01:12:00,880 --> 01:12:07,199
is done setting it to true might never actually propagate to the thread that's reading what whether

529
01:12:07,199 --> 01:12:12,319
it's true or not because it could be stored in some like buffer and never flushed. What locks and

530
01:12:12,319 --> 01:12:22,799
sure is that you're right the next thread that reads is done we'll see the last right to is done

531
01:12:22,800 --> 01:12:27,680
and it'll actually flush it from for example a potential buffer that the right could be stored in

532
01:12:28,480 --> 01:12:34,239
so yeah that's just emphasizing like you don't want data races even if you think that they're really

533
01:12:34,239 --> 01:12:44,880
friendly. Clean way to exit so sending exit RBC from a coordinator to worker works also like the

534
01:12:45,840 --> 01:12:53,119
Quonco like messy exits where the worker like tries to send an RBC and sees the socket is closed like those are

535
01:12:53,119 --> 01:13:04,800
also fine we like both solutions are equally acceptable and then I'm expected end of file errors so

536
01:13:05,680 --> 01:13:10,800
you can look I have a link here that shows when it's invoked in the client but it's a little

537
01:13:10,800 --> 01:13:18,159
confusing as to when that actually happens so I would not worry about it too much if anyone has

538
01:13:18,159 --> 01:13:27,039
insights into if they got this error at a very like strange moment then we could look into it

539
01:13:27,039 --> 01:13:31,680
but I think it's a very specific on your implementation so I would have to look at that in particular

540
01:13:31,680 --> 01:13:39,119
where we got a bunch of questions about that. Yeah I think so that's basically most of the questions

541
01:13:39,119 --> 01:13:45,920
that came up and I think now if you have any questions about you know go map reduce or if you

542
01:13:45,920 --> 01:13:52,880
want to ask some stuff about the labs. I had a question about the clean way to exit

543
01:13:55,119 --> 01:14:00,319
so you're saying like send an X to RBC I was just wondering if there were like if there was like

544
01:14:00,960 --> 01:14:07,840
a case where like a worker for some reason just takes a very like a very long time to reach the

545
01:14:07,840 --> 01:14:16,560
server right like how does the server know like when to like shut down because because the

546
01:14:16,560 --> 01:14:22,159
coordinator shuts down at some point right like when when it says like done when done returns true

547
01:14:23,920 --> 01:14:30,800
it shuts down and so it stops replying to the workers. How does it decide when to do that if

548
01:14:30,800 --> 01:14:40,320
it's waiting for for workers to to shut down themselves? Oh so in this case the coordinator

549
01:14:40,960 --> 01:14:47,279
isn't oh I guess so send us the wrong word the coordinator isn't waiting for the workers to

550
01:14:47,279 --> 01:14:54,400
respond the coordinator is it's not sending it's replying to the request from workers with a

551
01:14:55,039 --> 01:15:01,359
like the task is done please exit. So the coordinator isn't actually waiting for the workers

552
01:15:01,359 --> 01:15:07,119
at all and so in this case the coordinator could actually still exit before the workers and cause

553
01:15:07,119 --> 01:15:15,839
the workers to like you know have a disconnected socket error and exit. Yeah I guess that was my

554
01:15:15,840 --> 01:15:23,680
question right like like if if it like the coordinator is replying to workers right that are

555
01:15:23,680 --> 01:15:32,640
like potentially like asking for get task but what happens if the worker shuts down or say

556
01:15:32,640 --> 01:15:39,279
or shy the coordinator shuts down before it gets a reply got a request I get a get task RPC from

557
01:15:39,279 --> 01:15:44,400
the worker. Well then the next time that the worker tries to contact the coordinator the worker

558
01:15:44,399 --> 01:15:52,319
will see that the connection is closed and then exit. Okay yeah that's as clean a shut down as well

559
01:15:52,319 --> 01:16:01,519
get essentially I mean you could imagine that you know if you could set up the workers to be

560
01:16:02,239 --> 01:16:07,759
RBC servers and then you would actually have the coordinator be sending these like please exit

561
01:16:07,760 --> 01:16:16,480
and the coordinator would have to wait for the worker to exit but it's not or it doesn't seem like

562
01:16:16,480 --> 01:16:28,640
you would get any utility of that. Yeah Cat I see you Hagar. Yeah something that I was wondering

563
01:16:28,640 --> 01:16:33,440
about is for the future labs are we allowed to have more files visiting explicitly in the map

564
01:16:33,439 --> 01:16:39,759
produce lab we were only supposed to have three and it didn't read something where it was like

565
01:16:39,759 --> 01:16:46,399
hey you should have all of your stuff contained in one. Oh yeah so you can definitely have more files

566
01:16:47,439 --> 01:16:56,159
but that's like I would almost encourage that. Did we say that about that for days? I don't I can't

567
01:16:56,159 --> 01:17:01,439
remember whether we did. What was it you couldn't edit any of the other main files? Yeah you

568
01:17:01,439 --> 01:17:08,479
could edit the files and yeah okay I misread that thanks this makes me feel a lot better. Yeah yeah

569
01:17:09,759 --> 01:17:19,039
but definitely like bring your code will be useful. I have a question about the benign data races.

570
01:17:21,039 --> 01:17:26,319
I guess like because sometimes there's for example a raft you just want to like read the current state

571
01:17:26,880 --> 01:17:34,960
of the raft server. Why would multiple routes, multiple routes, writing to it and one reading.

572
01:17:34,960 --> 01:17:41,039
So why would a read and a write to the same variable end up cause undefined behavior because

573
01:17:41,039 --> 01:17:49,679
the read either comes before or after the write. So one thing that can happen and most processors

574
01:17:49,680 --> 01:17:59,920
don't do this but every time you have a like so any thread can run on it like a separate core

575
01:18:01,520 --> 01:18:09,600
and every core has a buffer for the data that it's reading or writing or writing I guess like a

576
01:18:09,600 --> 01:18:18,880
store buffer. So for example thread one could write one value to the state and thread two could try

577
01:18:18,880 --> 01:18:26,079
to read it or like multiple threads could be writing and thread one without a lock so locks

578
01:18:26,079 --> 01:18:34,400
essentially flush the buffer without that lock this write might just like stay in thread ones

579
01:18:35,199 --> 01:18:44,000
like store buffer forever and the read will never return the updated value. So this behavior

580
01:18:44,239 --> 01:18:50,159
doesn't quite happen in practice but it's an allowable behavior because you do not have the lock.

581
01:18:51,279 --> 01:18:57,760
Sorry so what happens if the write has a lock but the read doesn't like doesn't read always need a lock?

582
01:19:03,279 --> 01:19:07,199
Yes because

583
01:19:07,199 --> 01:19:18,000
I think I'll read. I googled it a little bit and people are like yeah don't even try

584
01:19:18,000 --> 01:19:22,399
lock less shared data but I don't really understand why that would be a problem.

585
01:19:25,599 --> 01:19:30,559
Go ahead. You could like be doing something that assumes the thing was true and then like when

586
01:19:30,560 --> 01:19:37,360
you read it's not actually true yet like there might be multiple things right. That's why you don't

587
01:19:37,360 --> 01:19:46,400
want to lock this read. So the only time you might be able to even get away with this is if you

588
01:19:46,400 --> 01:19:54,560
only read a single word and that's all the thread does and it never does multiple reads but I think

589
01:19:54,560 --> 01:20:05,920
you still have some issues with one of the other things is if you're reading more than one piece of

590
01:20:05,920 --> 01:20:14,000
data like if on one thread you take a lock assign a assign b another thread it doesn't take a lock

591
01:20:14,000 --> 01:20:20,080
might see b the new value of b before it sees the new value of a the ordering like in that stuff

592
01:20:20,159 --> 01:20:27,920
and so if you read like a term from one that from one variable and like whether or not the

593
01:20:27,920 --> 01:20:34,079
leader from another variable you might read a pair of values that never actually existed because

594
01:20:35,119 --> 01:20:40,800
there are sort of art the guarantees like when you're working with concurrent systems you need to

595
01:20:40,800 --> 01:20:46,239
build everything based off what the guarantees are the platform provides to you and if you don't there's

596
01:20:46,239 --> 01:20:54,719
all kinds of weird edge cases that can throw you off and yeah. Yeah so I think the only case in which

597
01:20:54,719 --> 01:21:02,559
you can even like try to reason about this is that is if there's only ever one like you know word in

598
01:21:02,559 --> 01:21:09,840
the system that you're ever trying to read and write to as soon as you try to write or read multiple

599
01:21:10,800 --> 01:21:15,840
pieces of data then it's like you won't be all too reason about anything without locks.

600
01:21:17,680 --> 01:21:24,000
Basically if you want to play games with this you have to really understand the compiler the

601
01:21:24,000 --> 01:21:29,600
whole coding language and memory model the processor you're using and it's like member go here and see

602
01:21:29,600 --> 01:21:37,199
system it gets complicated incredibly quickly. Yeah it's also like I mean this is all undefined

603
01:21:37,199 --> 01:21:42,720
behavior so even if it works now like you know I could someone could write just like a new compiler

604
01:21:42,720 --> 01:21:49,439
and then you're like that's where the whole thing about like demons can fly up your nose like it can

605
01:21:49,439 --> 01:21:53,760
literally do anything if you have a data race because it's like oh this program's like doesn't

606
01:21:53,760 --> 01:21:59,679
have any semantic so we can like you know go crazy so I would I would not risk it.

607
01:21:59,680 --> 01:22:08,000
Okay it makes sense thank you. So even when we're accessing like anything just reading like let's

608
01:22:08,000 --> 01:22:14,480
say a raf server state we should still wrap it in a lock. Yeah it just gets annoying sometimes

609
01:22:14,480 --> 01:22:22,079
because you have to like wrap the single read in a lock and unlock but I'm not sure if like

610
01:22:22,559 --> 01:22:32,640
that shouldn't happen super often. Like I mean maybe if you want to for example check that you're

611
01:22:32,640 --> 01:22:43,439
so leader and if you're not ex there or something like that but yeah I don't like I forget do you use

612
01:22:43,519 --> 01:22:51,839
like atomic goals for like killed state for example. But like you could use an atomic goal which

613
01:22:51,839 --> 01:23:00,319
essentially is like locking in a locking right before accessing it and right after but yeah I

614
01:23:03,919 --> 01:23:11,039
I think you'll like having in some ways very like coarse grain locks and knowing that you're the only

615
01:23:11,039 --> 01:23:16,399
one touching a piece of state will become very handy as you reason about your limitations.

616
01:23:17,920 --> 01:23:28,159
Thank you. I have a question about the channels so when you make a channel it's only between

617
01:23:28,159 --> 01:23:35,359
two threads right or it can be between multiple threads but like if you not if you don't have it

618
01:23:35,519 --> 01:23:41,839
um buffered it can potentially just lock and block forever right so for example if you want to do

619
01:23:41,839 --> 01:23:47,599
something raf and then you have like election you have a channel that like does something about

620
01:23:47,599 --> 01:23:53,199
election timeouts you would need a buffer channel that's like the size of the amount of servers correct

621
01:23:53,199 --> 01:23:59,279
because like you could like send something and then like it blocks because you can be you can have

622
01:23:59,359 --> 01:24:07,039
multiple like election things election messages sent between the channels correct so if you want

623
01:24:07,039 --> 01:24:12,319
a on-buffered channel it should only between it should only be between two threads only correct.

624
01:24:13,439 --> 01:24:17,920
Um I mean not necessarily like if two threads are consumers and one threads are produced at the back

625
01:24:20,239 --> 01:24:24,000
okay but multiple producers I guess that you would need that correct.

626
01:24:24,000 --> 01:24:31,039
Well not necessarily I mean if the consumer is you know just doing a loop and constantly

627
01:24:31,039 --> 01:24:40,720
reading then all the producers would just like I guess it depends on how they're scheduled but if

628
01:24:41,600 --> 01:24:46,720
you like you would eventually have someone reading from the channel so you can have multiple

629
01:24:46,720 --> 01:24:55,039
producers and one consumer. Actually does anyone know about the like run cell um do you know about

630
01:24:55,039 --> 01:24:58,880
the ordering guarantees of channels like is there a live miss guarantee or are you

631
01:25:02,560 --> 01:25:08,240
I feel like there is an aliveness guarantee so I guess if you have uh it's kind of like locks right

632
01:25:08,240 --> 01:25:11,280
like if you're always trying to acquire the locks and another thread is like

633
01:25:11,359 --> 01:25:17,359
also spending and like trying to acquire the lock there's no guarantee that you will ever acquire it

634
01:25:17,359 --> 01:25:20,880
which is why like randomization might be necessary in that case.

635
01:25:26,079 --> 01:25:32,319
Also I realize I think lecture is technically over. I am holding office hours right now so if you

636
01:25:32,319 --> 01:25:37,359
have questions on love too or want to continue asking questions I'll be there um and I think like

637
01:25:37,359 --> 01:25:44,719
maybe Franz if you want to stick around or other others but I will move to to office hours now

638
01:25:46,719 --> 01:25:53,519
so thank you all so much for coming. Thank you. Thank you.

639
01:25:59,519 --> 01:26:01,599
Oh can I just ask a quick question?

640
01:26:01,600 --> 01:26:07,360
Yeah. Alright Franz you're the host now so I'm going to just hop off to my office.

641
01:26:07,360 --> 01:26:12,960
Thanks Lily what's the theme? I'm the Do you have an event? Oh what's the theme?

642
01:26:12,960 --> 01:26:18,000
Like my color scheme? Yeah. That's a good question. I'm not actually sure.

643
01:26:19,680 --> 01:26:20,400
Let me check.

644
01:26:24,800 --> 01:26:25,520
Peak C.

645
01:26:25,520 --> 01:26:29,920
It's all time in the chat.

