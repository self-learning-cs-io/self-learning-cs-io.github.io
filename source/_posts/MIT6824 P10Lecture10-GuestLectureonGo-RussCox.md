---
title: MIT6824 P10Lecture10 GuestLectureonGo RussCox
---

1
00:00:00,000 --> 00:00:08,000
Good afternoon. Good morning. Good evening. Good night. Wherever you are. Let's get started again.

2
00:00:08,000 --> 00:00:14,000
So today we have a guest lecture and probably speaker needs little introduction.

3
00:00:14,000 --> 00:00:23,000
I'm a guest with Russ Cox. We've won up the co-leads on the go project and we'll talk a lot more about it.

4
00:00:23,000 --> 00:00:26,000
Let me say a couple of words.

5
00:00:26,000 --> 00:00:29,000
And not to write to him there's Russ too much.

6
00:00:29,000 --> 00:00:33,000
Russ has a long experience with distributed systems.

7
00:00:33,000 --> 00:00:41,000
He was a developer and distributor to plan nine when he was a high school student and an undergrad at Harvard.

8
00:00:41,000 --> 00:00:47,000
He joined the PZ program at MIT, which we met up.

9
00:00:47,000 --> 00:00:56,000
And probably if you've taken any sort of you know P docks class, if you will, there's going to be you will see Russ's touches on it.

10
00:00:56,000 --> 00:01:04,000
And certainly in A to four, you know, the go switch to go for us has been wonderful thing.

11
00:01:04,000 --> 00:01:12,000
But if you divert in opinion, of course feel free to ask Russ questions and make suggestions.

12
00:01:12,000 --> 00:01:18,000
He's always welcome to entertain any ideas. So without Russ.

13
00:01:18,000 --> 00:01:22,000
Great. Thanks. Can you still see the slides? Is that working?

14
00:01:22,000 --> 00:01:29,000
Okay. Great. So, so we will go to support writing the sort of distributed systems that we were building at Google.

15
00:01:29,000 --> 00:01:36,000
And that made go a great fit for you know what came next, which is now called cloud software and also a great fit for 84.

16
00:01:36,000 --> 00:01:42,000
So in this lecture, I'm going to try to explain how I think about writing through programs and go.

17
00:01:42,000 --> 00:01:49,000
And I'm going to walk through the sort of design and implementation of programs for four different patterns that I see come up often.

18
00:01:49,000 --> 00:01:56,000
And along the way, I'm going to try to highlight some hints or rules of thumb that you keep in mind when designing your own go programs.

19
00:01:56,000 --> 00:02:01,000
And I'm going to try to set up some of the links to older version of these slides. So, you know, you might have seen them already.

20
00:02:01,000 --> 00:02:06,000
I hope that the lecture form is a bit more intelligible than just sort of looking at the slides.

21
00:02:06,000 --> 00:02:19,000
And I hope that in general, these patterns are like common enough that, you know, maybe they'll be helpful by themselves, but also that, you know, you'll, you'll, the hints will help you prepare for whatever it is you need to implement.

22
00:02:19,000 --> 00:02:34,000
So to start is important to distinguish between concurrency and parallelism and concurrency is about how you write your programs about being able to compose independently executing control flows, whether you want to call them processes or threads or go routines.

23
00:02:34,000 --> 00:02:40,000
So that your program can be dealing with lots of things at once without turning into a giant mess.

24
00:02:40,000 --> 00:02:52,000
On the other hand, parallelism is about how the programs get executed about allowing multiple computations to run simultaneously so that the program can be doing lots of things at once, not just dealing with lots of things at once.

25
00:02:52,000 --> 00:03:07,000
And so concurrency lends itself naturally to parallel execution, but today the focus is on how to use goes concurrency support to make your programs clearer, not to make them faster if they do they are faster, that's wonderful, but, but that's not the point today.

26
00:03:07,000 --> 00:03:17,000
So I said I'd walk through the design and implementation of some programs for four common concurrency concurrency patterns that I see often.

27
00:03:17,000 --> 00:03:27,000
But before we get to those, I want to start with what seems like a really trivial problem, but that illustrates one of the most important points about what it means to use concurrency to structure programs.

28
00:03:27,000 --> 00:03:38,000
A decision that comes up over and over when you design concurrent programs is whether to represent states as code or as data and by as code, I mean the control flow in the program.

29
00:03:38,000 --> 00:03:44,000
So suppose we're reading characters from a file and we need to scan over a C style quoted string.

30
00:03:44,000 --> 00:03:46,000
Oh, well, it's a fly darn change.

31
00:03:46,000 --> 00:03:47,000
Yeah, it will.

32
00:03:47,000 --> 00:03:51,000
Well, it will. Can you see pro log board cancer state right now?

33
00:03:51,000 --> 00:03:52,000
No, we see the title slide.

34
00:03:52,000 --> 00:04:00,000
Oh, no. Yeah, I was wondering about that because there was like a border around this thing when I started and then it went away.

35
00:04:00,000 --> 00:04:04,000
So let me, let me just unshare and reshare.

36
00:04:04,000 --> 00:04:11,000
I have to figure out how to do that in zoom.

37
00:04:11,000 --> 00:04:16,000
Unfortunately, the keynote menu wants to be up and I don't know how to get to the zoom menu.

38
00:04:16,000 --> 00:04:25,000
Um, my screen sharing is paused. Why is my screen sharing paused?

39
00:04:25,000 --> 00:04:28,000
Can I resume? There we go.

40
00:04:28,000 --> 00:04:36,000
All right, I don't know. The zoom box says your screen sharing is paused. So if that now the board is back. So I'll watch that.

41
00:04:36,000 --> 00:04:42,000
All right. So, um, see, I was back here. So, so you know, we're talking about reading a string.

42
00:04:42,000 --> 00:04:49,000
It's not a parallel program. It's reading one character at a time. So there's no opportunity for parallelism, but there is a good opportunity for concurrency.

43
00:04:49,000 --> 00:04:56,000
So if we don't actually care about the exact escape sequences in the string, the what we need to do is match this regular expression.

44
00:04:56,000 --> 00:05:03,000
And we don't have to worry about understanding it exactly. We'll come back to what it means. But, but that's basically all you have to do is, is influence this regular expression.

45
00:05:03,000 --> 00:05:07,000
And so, you know, you probably all know you can turn a regular expression to a state machine.

46
00:05:07,000 --> 00:05:11,000
And so we might use a tool that that generates this code.

47
00:05:11,000 --> 00:05:17,000
And in this code, there's a single variable state that's the state of the machine. And the loop goes over the state.

48
00:05:17,000 --> 00:05:23,000
One character at a time reads a character, depending on the state and the character changes to a different state until it gets to the end.

49
00:05:23,000 --> 00:05:30,000
And so like this is a completely unreadable program. But it's the kind of thing that, you know, an auto generated program might look like.

50
00:05:30,000 --> 00:05:36,000
And the important point is that the program state is stored in data in this variable that's called state.

51
00:05:36,000 --> 00:05:42,000
And so, you can change it to store the state in code that's often clearer.

52
00:05:42,000 --> 00:05:44,000
So here's what I mean.

53
00:05:44,000 --> 00:05:50,000
Suppose we duplicate the read car calls into each case of the switch. So we haven't made any semantic changes here.

54
00:05:50,000 --> 00:05:54,000
We just took the read carat of the top and we moved it into the middle.

55
00:05:54,000 --> 00:06:02,000
Now, instead of setting state and then immediately doing the switch again, we can change those into go to.

56
00:06:02,000 --> 00:06:09,000
And then we can simplify a little bit further. There's a go to state one that's right before the state one label. We can get rid of that.

57
00:06:09,000 --> 00:06:15,000
Then there's a, I guess, yeah. So then there's, you know, there's only one way to get to state to.

58
00:06:15,000 --> 00:06:19,000
So we might as well pull the state to code up and put it inside the if where the go to appears.

59
00:06:19,000 --> 00:06:25,000
And then, you know, both sides of that if now end in go to state one. So we can hoist that out.

60
00:06:25,000 --> 00:06:32,000
And now what's left is actually a pretty simple program at you know state zero is never jumped to so it just begins there.

61
00:06:32,000 --> 00:06:38,000
And then state one is just a regular loop. So we might as well make that look like a regular loop.

62
00:06:38,000 --> 00:06:46,000
And now like this is, you know, looking like a program. And then finally we can, you know, get rid of some variables and simplify a little bit further.

63
00:06:46,000 --> 00:06:54,000
And, and we can rotate the loop so that, you know, we don't do a return true in the middle of the loop. We do the return true at the end.

64
00:06:54,000 --> 00:06:59,000
And so now we've got this program that is actually, you know, reasonably nice.

65
00:06:59,000 --> 00:07:04,000
And it's worth mentioning that it's possible to clean up, you know, much less egregious examples.

66
00:07:04,000 --> 00:07:10,000
You know, if you would try to write this by hand, your first attempt might have been the thing on the left where you've got this extra piece of state.

67
00:07:10,000 --> 00:07:20,000
And then you can apply the same kinds of transformations to move that state into the actual control flow and end up at the same program that we have on the right that's cleaner.

68
00:07:20,000 --> 00:07:24,000
So this is, you know, a useful transformation to keep in mind.

69
00:07:24,000 --> 00:07:33,000
Anytime you have state that kind of looks like it might be just reiterating what's what's happening in the program counter.

70
00:07:33,000 --> 00:07:40,000
And so, you know, you can see this if the, the original, in the original state, like if state equals zero, the program counter is at the beginning of the function.

71
00:07:40,000 --> 00:07:49,000
And if state equals one, or if an escape equals false and the other version, the program counter is just inside the for loop and state equals two is, you know, further down in the for loop.

72
00:07:49,000 --> 00:08:00,000
And the benefit of writing it this way instead of with the states is that it's much easier to understand, like I can actually just walk through the code and explain it to you, you know, if you just read through the code, you read an opening quote.

73
00:08:00,000 --> 00:08:11,000
And then you start looping and then until you find the closing quote, you read a character and if it's a backslash, you stick the next character and that's it, right, you can just read that off the page, which you couldn't do in the original.

74
00:08:11,000 --> 00:08:17,000
This version also happens to run faster, although that doesn't really matter for us.

75
00:08:17,000 --> 00:08:22,000
But as I mentioned, I'm going to highlight what I think are kind of important lessons as hints for designing your own go programs.

76
00:08:22,000 --> 00:08:28,000
And this is the first one to convert data state into code state when it makes your programs clearer.

77
00:08:28,000 --> 00:08:38,000
And again, like these are all hints, you should, you should, you know, for all of these, you should consider it as, you know, only if it helps, you can decide.

78
00:08:38,000 --> 00:08:45,000
So one problem with this hint is that not all programs have the luxury of having complete control over their control flow.

79
00:08:45,000 --> 00:08:57,000
So, you know, here's a different example, instead of having a read care function that can be called, this code is written to have a process care method that you have to hand the character to one at a time.

80
00:08:57,000 --> 00:09:07,000
And then process care has no choice really, but to, you know, encoded state in an explicit state variable, because after every character has to return back out.

81
00:09:07,000 --> 00:09:14,000
And so it can't save the state in the program counter and the stack, it has to have the state in an actual variable.

82
00:09:14,000 --> 00:09:21,000
But in go, we have another choice, right, because we can't save the state on that stack and in that program counter.

83
00:09:21,000 --> 00:09:26,000
But, you know, we can make another go routine to hold that state for us.

84
00:09:26,000 --> 00:09:33,000
And so, the closing, we already have this debug read string function that we really don't want to rewrite in this other way.

85
00:09:33,000 --> 00:09:38,000
We just want to reuse it. It works. Maybe it's really big and hairy. It's much more complicated than the thing we saw.

86
00:09:38,000 --> 00:09:45,000
We just want to reuse it. And so the way we can do that and go is we can start a new go routine that does the read string part.

87
00:09:45,000 --> 00:09:49,000
And it's the same read string code as before. We pass in the character reader.

88
00:09:50,000 --> 00:10:00,000
The, you know, the init method makes this this go routine to do the character reading. And then every time the process carer method is called.

89
00:10:00,000 --> 00:10:05,000
We send a message to the go routine on the car channel that says, here's the next character.

90
00:10:05,000 --> 00:10:16,000
And then we receive a message back that says, like, tell me the current status and the current status is always either I need more input or, you know, it basically, you know, was it okay or not.

91
00:10:17,000 --> 00:10:27,000
And so, you know, this lets us move the, the program counter that we couldn't do on the first stack into the other stack of the go routine.

92
00:10:27,000 --> 00:10:42,000
And so using additional go routines is a great way to hold additional code state and give you the ability to do these kinds of clean ups, even if the original structure, the problem makes it look like you can't.

93
00:10:42,000 --> 00:10:43,000
Go ahead.

94
00:10:43,000 --> 00:10:46,000
I'm assuming you're fine with that. People asking questions.

95
00:10:46,000 --> 00:10:48,000
Yeah, absolutely. I just wanted to make sure that.

96
00:10:48,000 --> 00:10:51,000
Yeah, yeah, definitely. Please interrupt.

97
00:10:51,000 --> 00:10:57,000
And so, so the hint here is to use additional go routines to hold additional code state.

98
00:10:57,000 --> 00:11:03,000
And there's, there's one caveat to this and then it's not free to just make go routines, right?

99
00:11:03,000 --> 00:11:07,000
You have to actually make sure that they exit because otherwise you'll just accumulate them.

100
00:11:07,000 --> 00:11:13,000
And so you do have to think about, you know, why does the go routine exit like, you know, is it going to get cleaned up?

101
00:11:13,000 --> 00:11:22,000
And in this case, we know that, you know, q dot parse is going to return, where do you get a pars go?

102
00:11:22,000 --> 00:11:25,000
Sorry, that's not right.

103
00:11:25,000 --> 00:11:32,000
Oh, sorry, the read string here, read string is going to return anytime it sends a message that says need more input.

104
00:11:32,000 --> 00:11:33,000
Where to go?

105
00:11:33,000 --> 00:11:39,000
There's something missing from this slide.

106
00:11:39,000 --> 00:11:44,000
Sorry, I went through this last night.

107
00:11:44,000 --> 00:11:50,000
So, so as we go in, we go into a net, we kick off this go routine that's going to call read care a bunch of times.

108
00:11:50,000 --> 00:11:59,000
And then we read the status once and that that first status is going to happen because the, the first call to read care from read string is going to send I need more input.

109
00:11:59,000 --> 00:12:02,000
And then we're going to send a character back.

110
00:12:02,000 --> 00:12:05,000
We're going to send the character back and process care.

111
00:12:05,000 --> 00:12:08,000
And then every time process car gets called, it returns a status.

112
00:12:08,000 --> 00:12:15,000
And so up until you get, you know, need more input, you're going to get the.

113
00:12:15,000 --> 00:12:17,000
Sorry, this is not working.

114
00:12:17,000 --> 00:12:21,000
You're going to get a need more input for every time you want to read a character.

115
00:12:21,000 --> 00:12:28,000
And then when it's done reading characters, what I haven't shown you here, what seems to be missing somehow is when things exit.

116
00:12:28,000 --> 00:12:31,000
And when things exit, let's see if it's on this slide.

117
00:12:31,000 --> 00:12:35,000
Yeah, so there's a return success and a return bad input that I'd forgotten about.

118
00:12:35,000 --> 00:12:39,000
And so, you know, these return a different status and then they're done.

119
00:12:39,000 --> 00:12:49,000
So when process care, you know, in the read string version, when it returns, you know, bad input or success, we say that, you know, it's done.

120
00:12:49,000 --> 00:12:54,000
So as long as the caller is going through.

121
00:12:54,000 --> 00:13:00,000
And, you know, calling until it gets something that's not need more input, then the goal routine will finish.

122
00:13:00,000 --> 00:13:08,000
But, you know, maybe if we stop early, if the caller like hits an E O F and stops on its own without telling us that it's done, there's a goal routine left over.

123
00:13:08,000 --> 00:13:10,000
And so that could be a problem.

124
00:13:10,000 --> 00:13:15,000
And so you just, you need to make sure that you know when and why each goal routine will exit.

125
00:13:15,000 --> 00:13:21,000
And the nice thing is that if you do make a mistake and you leave go routine stuck, they just sit there.

126
00:13:21,000 --> 00:13:27,000
It's like the best possible bug in the world because they just sit around waiting for you to look at them and all you have to do is remember to look for them.

127
00:13:27,000 --> 00:13:30,000
And so, you know, here's a very simple program.

128
00:13:30,000 --> 00:13:33,000
It leaves go routines and it runs an HCP server.

129
00:13:33,000 --> 00:13:41,000
And so, you know, if we run this, it kicks off a whole bunch of F go routines and they all block trying to send to a channel and then it makes the HCP server.

130
00:13:41,000 --> 00:13:44,000
And so if I run this program, it just sits there.

131
00:13:44,000 --> 00:13:51,000
And if I type control backslash on a unit system, I get a sig quit, which makes it crash and dump all the stacks of the go routines.

132
00:13:51,000 --> 00:13:54,000
And you can see on this slide that, you know, it's going to print over and over again.

133
00:13:54,000 --> 00:13:59,000
Here's the go routine and H called from G called from F and in the channel send.

134
00:13:59,000 --> 00:14:03,000
And if you look at the line numbers, you can see exactly where they are.

135
00:14:03,000 --> 00:14:07,000
Another option is that since we're in an HCP server.

136
00:14:07,000 --> 00:14:18,000
And the HCP server imports the net HCP P-PROF package, you can actually just visit the HCP server is debug P-PROF go routine URL, which gives you the stacks of all the running go routines.

137
00:14:18,000 --> 00:14:24,000
And unlike the crash dump, it takes a little more effort and it deduplicates the go routines based on their stacks.

138
00:14:24,000 --> 00:14:28,000
And so, and then it sorts them by how many there are of each stack.

139
00:14:28,000 --> 00:14:31,000
And so if you have a go routine week, the leak shows up at the very top.

140
00:14:31,000 --> 00:14:35,000
So in this case, you've got 100 go routines stock in age called from G called from F.

141
00:14:35,000 --> 00:14:39,000
And then we can see there's like one of a couple other go routines and we don't really care about them.

142
00:14:39,000 --> 00:14:48,000
And so, you know, this is a new hint that it's just it's really, really useful to look for stuck go routines by just going to this end point.

143
00:14:48,000 --> 00:14:51,000
All right, so that was kind of the warm up.

144
00:14:51,000 --> 00:14:56,000
Now I want to look at the first real concurrency pattern, which is a publish subscribe server.

145
00:14:57,000 --> 00:15:05,000
So, publish subscribe is a way of structuring a program that you decouple the parts that are publishing interesting events from the things that are subscribing to them.

146
00:15:05,000 --> 00:15:15,000
And there's a publish subscriber pubs of server in the middle that connects those so that the individual publishers and the individual subscribers don't have to be aware of exactly who the other ones are.

147
00:15:15,000 --> 00:15:25,000
So, you know, I'm your Android phone and at might publish a make a phone call event and then the the dialer might subscribe to that and actually start and you know help dial.

148
00:15:25,000 --> 00:15:33,000
And so in a real pubs of server there are ways to filter events based on like what kind they are so that when you publish a make a phone call event like it doesn't go to your email program.

149
00:15:33,000 --> 00:15:41,000
But you know, for now we're just going to assume that the filtering is taken care of separately and we're just worried about the actual publish and subscribe.

150
00:15:41,000 --> 00:15:43,000
And the concurrency of that.

151
00:15:43,000 --> 00:15:46,000
So, here's an API we want to implement.

152
00:15:46,000 --> 00:15:54,000
Any number of clients that can call subscribe with a channel and afterwards events that are published will be sent on that channel.

153
00:15:54,000 --> 00:16:02,000
And then when a client is no longer interested, it can call cancel and pass in the same channel to say stop sending the events on that channel.

154
00:16:02,000 --> 00:16:17,000
And the way that cancel will signal that it really is done sending events on that channel is it will close the channel so that the receive the caller can keep receiving events until it sees the channel get closed and then it knows that the cancel is taking effect.

155
00:16:18,000 --> 00:16:37,000
So notice that the information is only flowing one way on the channel right you can send to the channel and then the receiver can receive from it and the information flows from the sender to the receiver and it never goes the other way so closing is also a signal from the sender to the receiver that all the sending is over.

156
00:16:37,000 --> 00:16:44,000
And the receiver cannot close the channel to tell the sender like I don't want you to send anymore because that's information going the opposite direction.

157
00:16:44,000 --> 00:17:05,000
And it's just a lot easier to reason about if the information only goes one way and of course if you need communication in both directions you can use a pair of channels and it often turns out to be the case that those different directions may have different types of data flowing like before we saw that there were ruins going in one direction and status updates going in the other direction.

158
00:17:05,000 --> 00:17:33,000
So how do we implement this API here's a pretty basic implementation that you know it could be good enough we have a server and the server state is a map of registered subscriber channels protected by a lock we initialize the server by just allocating the map and then to publish the event we just send it to every registered channel to subscribe a new channel we just add it to the map and to cancel we take it out of the map.

159
00:17:33,000 --> 00:17:39,000
Because these are all methods that might be called from multiple go routines.

160
00:17:39,000 --> 00:17:52,000
We need to call lock and unlock around these to protect the map and notice that I wrote defer unlock right after the lock so I don't have to remember to unlock it later.

161
00:17:52,000 --> 00:18:03,000
I'll see this you know it's sort of a nice idiom to just do the lock unlock and then you know have a blank line and have that be its own kind of paragraph in the code.

162
00:18:03,000 --> 00:18:19,000
One thing I want to point out is that using defer make sure that the mutex gets unlocked even if you have multiple returns from the function so you can't forget but it also make sure that it gets unlocked if you have a panic like in subscribing cancel where there's you know panics for misuse.

163
00:18:19,000 --> 00:18:31,000
And there is a subtlety here about if you might not want to unlock the mutex if the panic happened while the thing that was locked is in some inconsistent state but I'm going to ignore that for now in general.

164
00:18:31,000 --> 00:18:38,000
You try to avoid having the things that might panic happen while you're you know potentially an inconsistent state.

165
00:18:39,000 --> 00:18:54,000
And I shall also point out that the use of panic at all in subscribing and cancel implies that you really trust your clients not to misuse the interface that it is a program error worth you know tearing down the entire program potentially for that to happen.

166
00:18:54,000 --> 00:18:58,000
And in a bigger program where other clients were using this API.

167
00:18:58,000 --> 00:19:11,000
And I probably want to return an error instead and not have the possibility of taking down the whole program but panicking simplifies things for now and you know error handling in general is kind of not the topic today.

168
00:19:11,000 --> 00:19:19,000
A more important concern with this code than than panics is what happens if a girl teen is slow to receive events.

169
00:19:19,000 --> 00:19:26,000
So all the operations here are done holding the mutex which means all the clients kind of have to proceed in lockstep.

170
00:19:26,000 --> 00:19:42,000
So during publish there's a loop that's sending on the channels sending the event to every channel and if one subscriber falls behind the next subscriber doesn't get the event until that slow subscriber wakes up and actually gets the event off of that channel.

171
00:19:42,000 --> 00:19:59,000
So the most subscriber can slow down everyone else and you know forcing them to proceed in lockstep this way is not always a problem if you've you know documented the restriction and for whatever reason you know how the clients are written and you know that they won't ever fall too far behind this could be totally fine.

172
00:19:59,000 --> 00:20:09,000
It's a really simple implementation and and it has nice properties like on return from publish you know that the event has actually been handed off to each of the other girl routines.

173
00:20:09,000 --> 00:20:16,000
You don't know that they've started processing it but you know it's been handed off and so you know maybe that's good enough and you could stop here.

174
00:20:16,000 --> 00:20:30,000
A second option is that if you need to tolerate just a little bit of slowness on the subscribers then you could say that they need to give you a buffer channel with room for a couple events in the buffer so that you know when you're publishing.

175
00:20:30,000 --> 00:20:45,000
You know as long as they're not too far behind there always be room for the you know new event to go into the channel buffer and then the actual publish won't walk for too long and again maybe that's good enough if you're sure that they won't ever fall too far behind you get to stop there.

176
00:20:45,000 --> 00:20:59,000
But in a really big program you do want to cope more gracefully with arbitrarily arbitrarily slow subscribers and so then the question is what do you do and so you know in general you have three options you can slow down the event generator with the number of people who are in the same way.

177
00:20:59,000 --> 00:21:15,000
So you know what is the event generator which is what the previous solutions implicitly do because publish stops until the subscribers catch up or you can drop events or you can queue an arbitrary number of past events those are pretty much your only options.

178
00:21:15,000 --> 00:21:20,000
So we talked about you know publish and slowing down the event generator.

179
00:21:20,000 --> 00:21:38,000
So you know you can't just go down where you coalesce the events or you drop them so that you know the subscriber might find out that you know hey you missed some events and I can't tell you what they were because I didn't save them but I'm at least going to tell you you missed five events and then maybe it can do something else to try to catch up.

180
00:21:38,000 --> 00:22:00,000
So this is the kind of approach that that we take in the profiler so in the profiler if you've used it if there's a go routine that fills the profile on a signal handler actually with profiling events and then there's a separate go routine whose job is to read the data back out and like write it to disk or send it to a HTTP request or whatever it is you're doing the profile data.

181
00:22:00,000 --> 00:22:16,000
So the buffer in the middle and if the receiver from the profile data falls behind when the buffer fills up we start adding entries to a final profile entry that just has a single entry that's a function called runtime dot lost profile data.

182
00:22:16,000 --> 00:22:26,000
If you go look at the profile you see like hey the program spent five percent of its time and lost profile data that just means you know the the profile reader was too slow and it didn't catch up.

183
00:22:26,000 --> 00:22:40,000
And we lost some of the profile but we're clear about exactly you know what the error rate is in the profile and you pretty much never see that because all the readers actually do keep up but just in case they didn't you have a pretty clear signal.

184
00:22:40,000 --> 00:22:54,000
An example of purely dropping the events is the OS signal package where you have to pass in a channel that will be ready to receive the signal signal like sighop or sig quit.

185
00:22:54,000 --> 00:23:05,000
And when the signal comes in the runtime tries to send to each of the channels that subscribe to that signal and if it can't send to it it just doesn't it's just gone because you know we're in a signal handler we can't wait.

186
00:23:05,000 --> 00:23:32,000
And so what the callers have to do is they have to pass in a buffer channel and if they pass in a buffer channel that has you know length at least one buffer length at least one and they only register that channel to a single signal then you know that if a signal comes in you're definitely going to get told about it if it comes in twice you might only get told about it once but that's actually the same semantics that Unix gives to processes for signals anyway so that's fine.

187
00:23:32,000 --> 00:23:36,000
So those are both examples of dropping or coalescing events.

188
00:23:36,000 --> 00:23:58,000
And then the third choice is that you might actually just really not want to lose any events it might just be really important that you never lose anything in which case you know you can queue an arbitrary number of events you can somehow arrange for the program to just save all the events that the slow subscriber hasn't seen yet somewhere and give them to the subscriber later.

189
00:23:58,000 --> 00:24:19,000
And it's really important to think carefully before you do that because an distributed system you know there's always slow computers always computers that we have fallen off line or whatever and they might be gone for a while and so you don't want to introduce unbounded queuing in general you want to think very carefully before you do that and think well you know how unbounded is it really and can I tolerate that.

190
00:24:19,000 --> 00:24:29,000
And so like that's a reason why channels don't have just an unbounded buffering it's really almost never the right choice and if it is the right choice you probably want to build it very carefully.

191
00:24:31,000 --> 00:24:34,000
And so but we're going to build one just to see what it would look like.

192
00:24:35,000 --> 00:24:48,000
And before we do that I just want to adjust the program a little bit so we have this mutex in the code and the mutex is an example of keeping the state whether you're locked or not in a state variable.

193
00:24:49,000 --> 00:24:55,000
But we can also move that into a program counter variable by putting it in a different go routine and so.

194
00:24:56,000 --> 00:25:07,000
In this case we can start a new go routine that runs a program function called s dot loop and it handles requests sent on three new channels published subscribe and cancel.

195
00:25:08,000 --> 00:25:18,000
And so in a knit we make the channels and then we kick off s dot loop and s dot loop is sort of the amalgamation of the previous method bodies and it just received.

196
00:25:19,000 --> 00:25:35,000
From any of the three channels a request a publish of subscriber cancel request and it does whatever was asked and now that map the subscriber map can be just a local variable in s dot loop and and so you know it's the same code.

197
00:25:36,000 --> 00:25:42,000
But now that data is clearly owned by s dot loop nothing else could even get to it because it's a local variable.

198
00:25:42,000 --> 00:26:09,000
And then we just need to change the original methods to send the work over to the loop go routine so uppercase publish now sends on lowercase publish the channel the event that it wants to publish and similarly subscribe and cancel they create a request that has a channel that we want to subscribe and also a channel to get the answer back and they send that into the loop and then the loop sends back the answer.

199
00:26:12,000 --> 00:26:24,000
And so I referred to transforming the program this way is like converting the mutex into a go routine because we took the data state of the mutex there's like a lock bit inside it and now that lock bit is implicit in the program counter of the loop.

200
00:26:26,000 --> 00:26:35,000
It's very clear that you can't ever have you know a publish and subscribe happening at the same time because it's just single threaded code and just you know executes and sequence.

201
00:26:36,000 --> 00:26:52,000
On the other hand the original version had a kind of like clarity of state where you could sort of inspect it and and reason about well this is the important state and it's harder in the the go routine version to see like what's important state and what's kind of incidental state from just having a go routine.

202
00:26:53,000 --> 00:27:18,000
And in a given situation you know one might be more important than the other so a couple years ago I did all the labs for the class when it first switched to go and and raft is a good example of where you probably prefer the state with the mutex is because raft is is so different from most concurrent programs and that like each replica is just kind of profoundly uncertain of its state right like the state transitions.

203
00:27:19,000 --> 00:27:40,000
You know one moment you think you're the leader and the next moment you've been deposed like one moment your log has 10 entries and next moment you find actually know it only has two entries and so being able to manipulate that state directly rather than having to you know somehow get it in an out of the program counter makes a lot more sense for raft but that's pretty unique in most situations it cleans things up to the state in the program counter.

204
00:27:40,000 --> 00:28:09,000
All right so in order to deal with the slow subscribers now we're going to add some helper go routines and their job is to manage a particular subscribers backlog and keep the overall program from blocking and so this is the helper go routine and the main loop go routine will send the events to the helper which we then trust because we wrote it not to fall arbitrarily behind and then the helpers job is to this few events if needed and send them off to the subscriber.

205
00:28:11,000 --> 00:28:28,000
All right so this actually has two problems the first is that if there's nothing in the queue then the select is actually wrong to try to offer queue of zero and in fact just evaluating queue of zero at the start of the select panic because the queue is empty and so we can fix these.

206
00:28:28,000 --> 00:28:39,000
By setting up the arguments separately from the select and in particular we need to make a channel send out that's going to be nil which is never able to proceed in a select.

207
00:28:40,000 --> 00:28:53,000
As we nil when we don't want to send and it's going to be the actual out channel when we do want to send and then we have to have a separate variable that holds the event that we're going to send you will only you know actually read from queue of zero if there's something in the queue.

208
00:28:54,000 --> 00:29:05,000
The second thing that's wrong is that we need to handle closing of the channel of the input channel because when the input channel closes we need to flush the rest of the queue and then we need to close the output channel.

209
00:29:06,000 --> 00:29:19,000
So to check for that we change the select from just doing e equals receive from in to e comma OK equals receive from in in the comma OK will be told whether or not the channel is actually sending real data or else it's closed.

210
00:29:19,000 --> 00:29:27,000
And so when OK is false we can set into nil to say let's stop trying to receive from in there's nothing there we're just going to keep getting told that it's closed.

211
00:29:28,000 --> 00:29:48,000
And then when the loop is fine when the queue is finally empty we can exit the loop and so we changed the four condition to say when we want to keep asking you to loop as long as there actually still is an input channel and there's something to write back to the output channel and then once both of those are not true anymore it's time to close it's time to exit the loop and we close the output channel.

212
00:29:49,000 --> 00:29:55,000
And we're done and so now we've correctly propagated the closing of the input channel to the output channel.

213
00:29:56,000 --> 00:30:00,000
So that was the helper and the server loop used to look like this.

214
00:30:01,000 --> 00:30:09,000
And to update it we just changed the subscription map before it was a map from subscribe channels to bulls it was just basically a set.

215
00:30:09,000 --> 00:30:24,000
And now it's a map from subscribe channel to helper channel and every time we get a new subscription we make a helper channel we kick off a helper go routine and we record the helper channel in the subscription map instead of the actual channel.

216
00:30:25,000 --> 00:30:31,000
And then the rest of the the loop actually barely changes at all.

217
00:30:31,000 --> 00:31:00,000
So I do want to point out that like if you wanted to have a different strategy for you know what you do with clients that fall too far behind that can all go in the helper go routine the code on the screen right now is completely unchanged so we've completely separated the published subscribe maintaining the actual list of subscribers map from the what you do when things get too slow map or problem and so it's really nice that you've got this clean separation of concerns into completely different ways of doing it.

218
00:31:01,000 --> 00:31:07,000
So that's a general hint is that you can use go routines a lot of the time to separate independent concerns.

219
00:31:09,000 --> 00:31:10,000
All right.

220
00:31:12,000 --> 00:31:15,000
So the second pattern for today is a work scheduler.

221
00:31:16,000 --> 00:31:19,000
And you did one of these in lab one from app reviews and I'm just kind of you know build up to that.

222
00:31:19,000 --> 00:31:27,000
And this doesn't do all the RPC stuff it just kind of assumes that there's kind of channel channel based interfaces to all the servers.

223
00:31:28,000 --> 00:31:43,000
So you know we have this function scheduled it takes a fixed list of servers has a number of tasks to run and it has just this abstracted function call that you you call to run the task on a specific server and you can imagine it was doing the RPCs underneath.

224
00:31:43,000 --> 00:31:48,000
So we're going to need some way to keep track of which servers are available to execute tasks.

225
00:31:49,000 --> 00:31:57,000
And so one option is to use our own stack or queue implementation but another option is to use a channel because it's a good synchronized queue.

226
00:31:58,000 --> 00:32:04,000
And so we can send into the channel to add to the queue and receive from it to pop something off.

227
00:32:04,000 --> 00:32:12,000
And in this case we'll make the queue be a queue of servers and we'll start off it's a queue of idle servers servers that aren't doing any work for us right now.

228
00:32:13,000 --> 00:32:17,000
And we'll start off by just initializing it by sending all the known servers into the idle list.

229
00:32:19,000 --> 00:32:28,000
And then we can loop over the tasks and for every task we kick off a go routine and its job is to pull a server off the idle list run the task and then put the server back on.

230
00:32:28,000 --> 00:32:41,000
And this loop body is another example of the earlier to use go routines like independent things run independently because each task is running as a separate concern they're all running in parallel.

231
00:32:42,000 --> 00:32:45,000
Unfortunately, there are two problems with this program.

232
00:32:46,000 --> 00:32:51,000
The first one is that the closure that's running as a new go routine refers to the loop iteration variable which is task.

233
00:32:51,000 --> 00:32:58,000
And so by the time the go routine starts exiting, you know, the loop has probably continued and done a task plus plus and so it's actually getting the wrong value of task.

234
00:32:59,000 --> 00:33:01,000
You've probably seen this by now.

235
00:33:02,000 --> 00:33:05,000
And of course, the best way to catch this is to run the race detector.

236
00:33:06,000 --> 00:33:17,000
And at Google we even encourage teams to set up the canary servers that run the race detector and split off something like 0.1% of their traffic to it just to catch races that might be in the production system.

237
00:33:17,000 --> 00:33:23,000
And you know finding a bug with the race detector is way better than having to debug some corruption later.

238
00:33:24,000 --> 00:33:26,000
So there are two ways to fix this race.

239
00:33:27,000 --> 00:33:30,000
The first way is to give the closure an explicit parameter and pass it in.

240
00:33:31,000 --> 00:33:44,000
And the go statement requires a function call specifically for this reason so that you can set specific arguments that get evaluated in the context of the original go routine and then get copied to the new go routine.

241
00:33:44,000 --> 00:33:49,000
And so in this case, we can declare a new argument task two, we can pass task to it.

242
00:33:50,000 --> 00:33:54,000
And then inside the go routine task two is a completely different copy of task.

243
00:33:55,000 --> 00:33:58,000
And I only named it task two to make it easier to talk about.

244
00:33:59,000 --> 00:34:06,000
But of course, there's a bug here and the bug is that I forgot to update task inside the function to refer to task two instead of task.

245
00:34:06,000 --> 00:34:19,000
And so we basically never do that. What we do instead is we just give it the same name so that it's impossible now for the code inside the go routine to refer to the wrong copy of task.

246
00:34:20,000 --> 00:34:27,000
That was the first way to fix the race. There's a second way, which is sort of cryptic the first time you see it, but it amounts to the same thing.

247
00:34:28,000 --> 00:34:31,000
And that is that you just make a copy of the variable inside the loop body.

248
00:34:31,000 --> 00:34:36,000
So every time colon equals happens, that creates a new variable.

249
00:34:37,000 --> 00:34:44,000
So in the for loop in the outer for loop, there's a colon equals at the beginning and there's not one the rest of the loop. So that's all just one variable for the entire loop.

250
00:34:45,000 --> 00:34:50,000
Whereas if we put a colon equals inside the body, every time we run an iteration of the loop, that's a different variable.

251
00:34:51,000 --> 00:34:56,000
So if the go if the go function closure captures that variable, those will all be distinct.

252
00:34:56,000 --> 00:35:04,000
So we can do the same thing we do task two and this time I remember to update the body, but you know, just like before it's too easy to forget to update the body.

253
00:35:05,000 --> 00:35:10,000
And so typically you write task colon equals task, which looks kind of magical the first time you see it, but but that's what it's for.

254
00:35:11,000 --> 00:35:16,000
All right, so I said there were two bugs in the program. The first one was this race on task.

255
00:35:17,000 --> 00:35:24,000
And the second one is that we didn't actually do anything after we skipped off all the tasks. We're not waiting for them to be done.

256
00:35:25,000 --> 00:35:37,000
And in particular, we're kicking them off way too fast because you know, if there's like a million tasks, you're going to kick off a million guard teams and they're all just going to sit waiting for one of the five servers, which is kind of inefficient.

257
00:35:37,000 --> 00:35:45,000
And so what we can do is we can pull the fetching of the the next idle server up out of the go or team.

258
00:35:46,000 --> 00:35:52,000
And we pull it up out of the go or team now will only kick off a go or team when there is a next server to use.

259
00:35:53,000 --> 00:36:05,000
And then we can kick it off and and you know, use that server and put it back and the using the server and put it back runs concurrently, but doing the fetch of the idle server inside the loop slows things down so that you can get the server.

260
00:36:05,000 --> 00:36:13,000
And then the server inside the loop slows things down so that there's only ever now number of servers go or teams running instead of number of tasks.

261
00:36:14,000 --> 00:36:19,000
And that receive is essentially creating some back pressure to slow down the loop so it doesn't get too far ahead.

262
00:36:20,000 --> 00:36:23,000
And then I mentioned we have to wait for the task to finish.

263
00:36:23,000 --> 00:36:33,000
And so we can do that by just at the end of the loop going over the list again and pulling all the servers out when we've pulled, you know, the right number of servers out of the idle list, that means they're all done.

264
00:36:33,000 --> 00:36:36,000
So that's the full program.

265
00:36:37,000 --> 00:36:47,000
Now to me, the most important part of this is that you still get to write a for loop to iterate over the tasks. There's lots of other languages where you have to do this with state machines or some sort of callbacks.

266
00:36:48,000 --> 00:36:51,000
And you don't get the luxury of encoding this in the control flow.

267
00:36:51,000 --> 00:36:56,000
And so this is a much cleaner way where you can just use a regular loop.

268
00:36:56,000 --> 00:36:59,000
And then we have to do some changes we can make some improvements.

269
00:36:59,000 --> 00:37:06,000
And so one improvement is to notice that there's only one go or team that makes requests of a server at a particular time.

270
00:37:06,000 --> 00:37:15,000
So instead of having one go or team for task, maybe we should have one go or team per server because there are probably going to be fewer servers than tasks.

271
00:37:15,000 --> 00:37:22,000
And to do that, we have to change from having a channel of idle servers to a channel of, you know, yet to be done tasks.

272
00:37:22,000 --> 00:37:25,000
So we have to do an idle channel to work.

273
00:37:25,000 --> 00:37:33,000
And then we also need a done channel to count, you know, how many tasks are done so that we know when we're completely finished.

274
00:37:33,000 --> 00:37:38,000
And so here, there's a new function run tasks and that's going to be the per server function.

275
00:37:38,000 --> 00:37:49,000
And we kick off one of them for each server and run tasks as job is just to loop over the work channel, run the tasks. And when the server is done, we send true to done.

276
00:37:49,000 --> 00:37:52,000
But, you know, the server tells us that, you know, it's done.

277
00:37:52,000 --> 00:37:58,000
And the server exits when the work channel gets closed. That's what makes that for loop actually stop.

278
00:37:58,000 --> 00:38:06,000
So then, you know, having kicked off the servers, we can then just sit there in a loop and send each task to the work channel.

279
00:38:06,000 --> 00:38:11,000
Close the work channel and say, hey, there's no more work coming. All the servers, you should finish and then, and then exit.

280
00:38:11,000 --> 00:38:15,000
And then wait for all the servers to tell us that they're done.

281
00:38:15,000 --> 00:38:21,000
So in the lab, there were a couple of complications. One was that, you know, you might get new servers at any given time.

282
00:38:21,000 --> 00:38:27,000
And so we could change that by saying the servers come in on a channel of strings.

283
00:38:27,000 --> 00:38:36,000
And that actually fits pretty well into the current structure where, you know, when you get a new server, you just kick off a new run tasks go routine.

284
00:38:36,000 --> 00:38:47,000
And so the only thing we have to change here is to put that loop into its own go routine so that while we're sending tasks to servers, we can still accept new servers and kick off the helper go routines.

285
00:38:47,000 --> 00:38:54,000
But now we have this problem that we don't really have a good way to tell when all the servers are done because we don't know how many servers there are.

286
00:38:54,000 --> 00:39:00,000
And so we could try to like maintain that number as servers come in, but it's a little tricky.

287
00:39:00,000 --> 00:39:11,000
And so instead we can count the number of tasks that have finished. So we just move the done sending true to done up a line so that instead of doing it per server, we now do it per task.

288
00:39:11,000 --> 00:39:17,000
And then the end of the loop or at the end of the function, we just have to wait for the right number of tasks to be done.

289
00:39:17,000 --> 00:39:23,000
And so, so now again, we sort of know why these are going to finish.

290
00:39:23,000 --> 00:39:37,000
And so, we have a lot of tasks still. And that is that if the number of tasks is is too big, actually, I think always, you'll get a deadlock. And if you run this, you know, you get this nice thing where the door, it tells you like, hey, your go routines are stuck.

291
00:39:37,000 --> 00:39:42,000
And the problem is that, you know, we have this run task server loop.

292
00:39:42,000 --> 00:39:50,000
And the server loop is trying to say, hey, I'm done. And you're trying to say, hey, like, here's some more work. So if you have more than one task, you'll run into this deadlock.

293
00:39:50,000 --> 00:40:02,000
You're trying to send the next task to a server. I guess it's a few more tasks than servers. You're trying to send the next task to a server and all the servers are trying to say, hey, I'm done with the previous task. But you're not there to receive from the done channel.

294
00:40:02,000 --> 00:40:10,000
And so again, you know, it's really nice that the the go routines just hang around and wait for you to look at them. And we can fix this.

295
00:40:10,000 --> 00:40:21,000
One way to fix this would be to add a separate loop that actually does a select that either sends some work or accounts for some of the work being done. That's fine.

296
00:40:21,000 --> 00:40:39,000
But a clear way to do this is to take the the work sending loop, the tasks sending loop and put it in its own go routine. So now it's running independently of the counting loop and the counting loop can run and, you know, unblock servers that are done with certain tasks while other tasks are still being sent.

297
00:40:40,000 --> 00:40:48,000
But the simplest possible fix for this is to just make the work channel big enough that you're never going to run out of space.

298
00:40:48,000 --> 00:41:00,000
Because we might decide that, you know, having a go routine for task is, you know, a couple kilobytes for task. But, you know, an extra into the channel is eight bytes. So probably you can spend eight bytes per task.

299
00:41:01,000 --> 00:41:11,000
And so if you can, you just make the work channel big enough that you know that all the sends on work are going to never block and you'll always get down to the counting loop at the end pretty quickly.

300
00:41:12,000 --> 00:41:23,000
And so doing that actually sets us up pretty well for the other wrinkle in the lab, which is that sometimes calls can time out and here I've modeled it by the call returning a false, I just say it didn't work.

301
00:41:24,000 --> 00:41:45,000
And so, you know, in run task is really easy to say like if it's really easy to say like if the call fails, then, or sorry, if the call succeeds, then you're done. But if it fails, just put the task back on the work list. And because it's a queue, not a stack, putting it back on the work list is very likely to hand it to some other server.

302
00:41:46,000 --> 00:41:58,000
And so that will, you know, probably succeed because it's some other server and this is all kind of hypothetical, but it's a really, you know, it fits really well into the structure that we've created.

303
00:41:59,000 --> 00:42:08,000
All right, and the final change is that because the server guratees are sending on work, we do have to wait to close it until we know that they're done sending.

304
00:42:09,000 --> 00:42:13,000
And because again, you can't close before they finish sending.

305
00:42:14,000 --> 00:42:18,000
And so we just have to move the close until after we've counted that all the tasks are done.

306
00:42:19,000 --> 00:42:29,000
And you know, sometimes we get to this point and people ask like, why can't you just kill guratees? Like why not just be able to say, look, hey, kill all the server guratees at this point, we know that they're not needed anymore.

307
00:42:30,000 --> 00:42:44,000
And the answer is that, you know, the gurateen has state and it's interacting with the rest of the program. And if you don't have a sudden just stops, it's sort of like it hung right and maybe it was holding a lock, maybe it was in the middle of some sort of communication with some other gurateen that was kind of expecting an answer.

308
00:42:45,000 --> 00:42:54,000
So we need to find some way to tear them down more gracefully and that's by telling them explicitly, hey, you know, you're done, you can go away and then they can clean up, however, they need to clean up.

309
00:42:55,000 --> 00:43:16,000
You know, speaking of cleaning up, there's actually one more thing we have to do, which is to shut down the loop that's watching for new servers. And so we do have to put a select in here where, you know, the thing that's waiting for new servers on the server channel, we have to tell it, okay, we're done, just like stop watching for new servers because all the servers are gone.

310
00:43:18,000 --> 00:43:21,000
And we could make this the colors problem, but this is actually fairly easy to do.

311
00:43:25,000 --> 00:43:30,000
So here's pattern number three, which is a client for a replicated server service.

312
00:43:32,000 --> 00:43:38,000
So here's the interface that we want to implement. We have some service that we want that is replicated for reliability.

313
00:43:39,000 --> 00:43:53,000
And it's okay for a client to talk to any one of these servers. And so the replicated client is given a list of servers, the arguments to init is a list of servers and a function that lets you call one of the servers.

314
00:43:54,000 --> 00:43:57,000
And then it's with a particular argument set and get a reply.

315
00:43:59,000 --> 00:44:09,000
And then being given that during init, the replicated client then provides a call method that doesn't tell you what server it's going to use, it just finds a good server to use.

316
00:44:10,000 --> 00:44:15,000
And it keeps the same keeps using the same server for as long as it can until it finds out that that server is no good.

317
00:44:16,000 --> 00:44:19,000
So in this situation, there's almost no shared state that you need to isolate.

318
00:44:19,000 --> 00:44:25,000
And so like the only state that persists from one call to the next is what server did I use last time because I'm going to try to use that again.

319
00:44:26,000 --> 00:44:33,000
So in this case, that's totally fine for mutex. I'm just going to leave it there. It's always okay to use mutex if that's the cleanest way to write the code.

320
00:44:34,000 --> 00:44:39,000
You know, some people get the wrong impression from how much we talk about channels, but it's always okay to use a mutex if that's all you need.

321
00:44:40,000 --> 00:44:49,000
So now we need to implement this replicated call method whose job is to try sending to lots of different servers, right, but first to try the original server.

322
00:44:50,000 --> 00:44:59,000
So what does it mean if you know the try fails? Well, there's like no clear way for it to fail above. It just always returns a reply.

323
00:45:00,000 --> 00:45:05,000
And so the only way it can fail is if it's taking too long. So we'll assume that if it takes too long, that means it failed.

324
00:45:06,000 --> 00:45:13,000
So in order to deal with timeouts, we have to run that code in the background and a different go achieve. So we can do something like this.

325
00:45:15,000 --> 00:45:31,000
Where we set a timeout, we create a timer, and then we use a go to send in the background. And then at the end, we wait and either we get the timeout or we get the actual reply. If we get the actual reply, we return it. And we get the timeout, we have to do something. We'll have to figure out what to do.

326
00:45:32,000 --> 00:45:41,000
It's worth pointing out that you have to call t dot stop because otherwise the timer sits in a timer queue that you know it's going to go off in one second.

327
00:45:42,000 --> 00:45:53,000
And so you know if this call took a millisecond and you have this timer that's going to sit there for the next second, and then you do this on a loop, you get a thousand timers sitting in that that that queue before they start actually, you know, disappearing.

328
00:45:54,000 --> 00:45:59,000
And so this is kind of a war in the API, but it's been there forever and we've never fixed it.

329
00:46:00,000 --> 00:46:02,000
And so you just have to remember to call stop.

330
00:46:04,000 --> 00:46:07,000
And then you know, now we have to figure out what do we do in the case of the timeout.

331
00:46:08,000 --> 00:46:18,000
And so in the case of the timeout, we're going to need to try a different server. So we'll write a loop and we'll start at the ID that ID zero, it says.

332
00:46:19,000 --> 00:46:26,000
And you know, if your apply comes in, that's great. And otherwise we'll reset the timeout and go around the loop again and try sending to a different server.

333
00:46:27,000 --> 00:46:35,000
And notice there's only one done channel in this program. And so you know on the third iteration of the loop, we might be waiting.

334
00:46:36,000 --> 00:46:40,000
And then finally the first server gives us a reply. That's totally fine. We'll take that reply. That's great.

335
00:46:42,000 --> 00:46:44,000
And so then we'll stop and return it.

336
00:46:45,000 --> 00:46:53,000
And but if we get all the way through the loop, it means that we sent the request to every single server. In which case, there's no more timeouts. We just have to wait for one of them to come back.

337
00:46:53,000 --> 00:46:56,000
And so that's the plane receive and the return at the end.

338
00:46:58,000 --> 00:47:08,000
And then it's important to notice that the done channel is buffered now. So that if you know you've sent the result to three different servers, you're going to take the first reply and return.

339
00:47:09,000 --> 00:47:11,000
But the others are going to want to send responses to.

340
00:47:12,000 --> 00:47:21,000
And we don't want those go routines to just sit around forever trying to send to a channel that we're not reading from. So we make the buffer big enough that they can send into the buffer and then go away. And then the channel just gets garbage collected.

341
00:47:24,000 --> 00:47:26,000
We both question in the chat. Yeah. Yeah.

342
00:47:26,000 --> 00:47:28,000
Sorry. I can't give you the chat. Go ahead.

343
00:47:28,000 --> 00:47:37,000
That says like, why can't the timer just be garbage collected when nobody's referencing it instead of having to wait when it goes off when you said that you have multiple waiting if it goes off in one one.

344
00:47:37,000 --> 00:47:43,000
Yeah. The problem is the timer is referenced by the runtime. It's in the list of active timers.

345
00:47:44,000 --> 00:47:47,000
And so calling stop takes it out of the list of active timers.

346
00:47:47,000 --> 00:47:56,000
And so like that's arguably kind of a wart in that like in the specific case of a timer that's like only going to ever get used in this channel way.

347
00:47:56,000 --> 00:48:02,000
Like we could have special case that by like having the channel because inside the timer is this T.C. channel. Right.

348
00:48:02,000 --> 00:48:08,000
So we could have had like a different kind of channel implementation that inside had a bit that's an hey, I'm a timer channel right.

349
00:48:08,000 --> 00:48:12,000
And and and then like the select on it would like know to just wait.

350
00:48:12,000 --> 00:48:15,000
But if you just let go of it, it would just disappear.

351
00:48:15,000 --> 00:48:21,000
We've kind of like thought about doing that for a while, but we never did. And so this is like the state of the world.

352
00:48:21,000 --> 00:48:24,000
But but you know the garbage collector can't distinguish between.

353
00:48:24,000 --> 00:48:30,000
And so you know the reference inside the runtime and the reference and the rest of the program. It's all just references.

354
00:48:30,000 --> 00:48:38,000
And so until we like special case that channel in some way like we can't actually get rid of that.

355
00:48:38,000 --> 00:48:39,000
Thank you.

356
00:48:39,000 --> 00:48:40,000
Sure.

357
00:48:40,000 --> 00:48:48,000
So so then the only thing we have left is to have this preference where we try to use the same ID that we did the previous time.

358
00:48:48,000 --> 00:48:51,000
And then we do that preference.

359
00:48:51,000 --> 00:48:56,000
We had to serve ID coming back in the reply anyway in the result channel.

360
00:48:56,000 --> 00:49:04,000
And so you know we do the same sort of loop, but we loop over an offset from the actual ID we're going to use, which is the the preferred one.

361
00:49:04,000 --> 00:49:10,000
And then when we get an answer, we set the preferred one to where we got the answer from and then we reply.

362
00:49:10,000 --> 00:49:15,000
And you'll notice that I used a go to statement that's okay if you need to go to it's fine.

363
00:49:15,000 --> 00:49:18,000
So that's what I'm going to do.

364
00:49:18,000 --> 00:49:21,000
So I'm going to do that sort of there's no zealotry here.

365
00:49:21,000 --> 00:49:23,000
All right.

366
00:49:23,000 --> 00:49:25,000
So the fourth one.

367
00:49:25,000 --> 00:49:27,000
And then we'll do some questions.

368
00:49:27,000 --> 00:49:29,000
Is a protocol multiplexer.

369
00:49:29,000 --> 00:49:32,000
And this is kind of the logic of a core of any RPC system.

370
00:49:32,000 --> 00:49:33,000
And this comes up a lot.

371
00:49:33,000 --> 00:49:37,000
I feel like I wrote a lot of these in grad school and sort of years after that.

372
00:49:37,000 --> 00:49:44,000
And so the basic API of a protocol multiplexer is that it sits in front some service, which we're going to pass to the init method.

373
00:49:44,000 --> 00:49:51,000
And having been initialized with a service, you can call and you can call call and give it a message or request message.

374
00:49:51,000 --> 00:49:54,000
And then it'll give you back the reply message at some point.

375
00:49:54,000 --> 00:50:03,000
And the things it needs from the service to do multiplexing is that given a message, it has to be able to pull out the tag that uniquely identifies the message.

376
00:50:03,000 --> 00:50:07,000
And will identify the reply because it will come back in with a mask matching tag.

377
00:50:07,000 --> 00:50:12,000
And then it needs to be able to send the message out and to receive, you know, a message.

378
00:50:12,000 --> 00:50:17,000
And then we'll send and receive our arbitrary messages that are not matched.

379
00:50:17,000 --> 00:50:22,000
It's the multiplexer job to actually match.

380
00:50:22,000 --> 00:50:31,000
So to start with, we'll have a go routine that's in charge of calling send and another go routine that's in charge of calling receive both in just a simple loop.

381
00:50:31,000 --> 00:50:36,000
And so to initialize the service will set up the structure and then we'll kick off the send loop and the receive loop.

382
00:50:36,000 --> 00:50:48,000
And then we also have a map of pending requests and the map maps from the tag that we saw the ID number in the messages to a channel where the reply is supposed to go.

383
00:50:48,000 --> 00:50:50,000
The send loop is fairly simple.

384
00:50:50,000 --> 00:50:53,000
You just range over the things that need to be sent and you send them.

385
00:50:53,000 --> 00:51:03,000
And this just has the effect of serializing the calls to send because we're not going to force the service implementation to deal with us sending, you know, from multiple routines at once.

386
00:51:03,000 --> 00:51:11,000
And then we're going to use the same method that we're going to use to serialize it so that it can just be thinking of sending one packet at a time.

387
00:51:11,000 --> 00:51:15,000
And then the receive loop is a little bit more complicated.

388
00:51:15,000 --> 00:51:18,000
It pulls a receive it pulls a reply off the service.

389
00:51:18,000 --> 00:51:22,000
And again, they're serialized so only reading one at a time.

390
00:51:22,000 --> 00:51:25,000
And then it pulls the tag out of the reply.

391
00:51:25,000 --> 00:51:28,000
And then it says, I need to find the channel to send this to.

392
00:51:28,000 --> 00:51:34,000
It takes it out of the pending map so that, you know, if we accidentally get another one, we won't try to send it.

393
00:51:34,000 --> 00:51:37,000
And then it sends the reply.

394
00:51:37,000 --> 00:51:43,000
And then to do a call, you just have to set yourself up in the map and then hand it to send and wait for the reply.

395
00:51:43,000 --> 00:51:46,000
So we start off, we get the tag out.

396
00:51:46,000 --> 00:51:48,000
We make our own done channel.

397
00:51:48,000 --> 00:51:52,000
We insert the tag into the map after first checking for bugs.

398
00:51:52,000 --> 00:51:56,000
And then we send the argument message to send.

399
00:51:56,000 --> 00:51:58,000
And then we wait for the reply to come in on done.

400
00:51:58,000 --> 00:51:59,000
It's very, very simple.

401
00:51:59,000 --> 00:52:05,000
I mean, like, I used to write these sort of things and see and it was much, much worse.

402
00:52:05,000 --> 00:52:08,000
So that was all the patterns that I wanted to show.

403
00:52:08,000 --> 00:52:14,000
And, you know, I hope that those end up being useful for you in whatever mutual program you're writing.

404
00:52:14,000 --> 00:52:19,000
And I hope that they're, you know, just sort of good ideas, even in non-go programs.

405
00:52:19,000 --> 00:52:24,000
And I hope that, you know, thinking about them and go can help you when you go to do other things as well.

406
00:52:24,000 --> 00:52:26,000
So I'm going to put them all back up.

407
00:52:26,000 --> 00:52:31,000
And then I have some questions that Fran said that were, you know, from all of you.

408
00:52:31,000 --> 00:52:36,000
And we'll probably have some time for, you know, questions from the chat as well.

409
00:52:36,000 --> 00:52:39,000
I have no idea in zoom where the chat window is.

410
00:52:39,000 --> 00:52:43,000
So when we get to that, people can just speak up.

411
00:52:43,000 --> 00:52:47,000
I don't use zoom on a daily basis, unfortunately.

412
00:52:47,000 --> 00:52:55,000
And normally I know how to use zoom like regularly, but with the presentation, it's like zoom is in this minimized thing that doesn't have half the things I'm used to.

413
00:52:55,000 --> 00:52:58,000
Anyway, someone asked how long go took.

414
00:52:58,000 --> 00:53:01,000
And so far it's been about 13 and a half years.

415
00:53:01,000 --> 00:53:05,000
We started discussions in late September 2007.

416
00:53:05,000 --> 00:53:09,000
I joined full time in August 2008 when I finished at MIT.

417
00:53:09,000 --> 00:53:13,000
We did the initial open source launch November 2009.

418
00:53:13,000 --> 00:53:18,000
We released go one, the sort of first stable version in October 2011.

419
00:53:18,000 --> 00:53:22,000
Sorry, the plan was October 2011, go on itself was March 2012.

420
00:53:22,000 --> 00:53:26,000
And then we've just been on, you know, a sort of regular schedule since then.

421
00:53:26,000 --> 00:53:29,000
The next major change, of course, is going to be generics.

422
00:53:29,000 --> 00:53:37,000
And adding generics. And that's probably going to be go one 18, which is going to be next February.

423
00:53:37,000 --> 00:53:42,000
So someone asked, you know, how big a team does it take to build a language like go.

424
00:53:42,000 --> 00:53:45,000
And you know, for those first two years, there were just five of us.

425
00:53:45,000 --> 00:53:52,000
And that was enough to get us to, you know, something that we released that actually could run in production.

426
00:53:52,000 --> 00:53:54,000
But it was fairly primitive.

427
00:53:54,000 --> 00:53:57,000
You know, it was it was a good prototype. It was a solid working prototype.

428
00:53:57,000 --> 00:54:00,000
But it wasn't like what it is today.

429
00:54:00,000 --> 00:54:02,000
And over time, we've expanded a fair amount.

430
00:54:02,000 --> 00:54:08,000
And we've got to something like 50 people employed directly, or employed by Google to work directly on go.

431
00:54:08,000 --> 00:54:11,000
And then there's tons of open source contributors.

432
00:54:11,000 --> 00:54:15,000
I mean, there's literal cast of thousands that have helped us over the last 13 years.

433
00:54:15,000 --> 00:54:24,000
And there's absolutely no way we could have done it, even with 50 people, without all the different contributions from the outside.

434
00:54:24,000 --> 00:54:27,000
Someone asked about design priorities.

435
00:54:27,000 --> 00:54:29,000
And motivations.

436
00:54:29,000 --> 00:54:32,000
And so we built it for us, right?

437
00:54:32,000 --> 00:54:35,000
The priority was to build something that was going to help Google.

438
00:54:35,000 --> 00:54:37,000
And it just turned out that Google was like a couple years ahead.

439
00:54:37,000 --> 00:54:41,000
We were just in a really lucky spot where Google was a couple years ahead of the rest of the industry.

440
00:54:41,000 --> 00:54:43,000
On having to write distributed systems, right?

441
00:54:43,000 --> 00:54:49,000
Now everyone using cloud software is writing programs that talk to other programs and sending messages.

442
00:54:49,000 --> 00:54:53,000
And you know, there's hardly any single machine programs anymore.

443
00:54:53,000 --> 00:55:02,000
So, you know, we sort of locked into at some level, you know, building the language that we, that the rest of the world needed a couple years later.

444
00:55:02,000 --> 00:55:07,000
And then the other thing that was really a priority was making it work for large numbers of programmers.

445
00:55:07,000 --> 00:55:12,000
And because you know, Google had a very large number of programmers working in one code base.

446
00:55:12,000 --> 00:55:19,000
And now we have open source where, you know, even if you're a small team, you're depending on code that's written by a ton of other people usually.

447
00:55:19,000 --> 00:55:25,000
And so a lot of the, the issues that come up with just having many programmers still come up in that context.

448
00:55:25,000 --> 00:55:28,000
So those were really the things we were trying to solve.

449
00:55:28,000 --> 00:55:35,000
And, you know, for all of these things, we took a long time before we were willing to actually commit to putting something in the language.

450
00:55:35,000 --> 00:55:39,000
Like everyone basically had to agree in the core original group.

451
00:55:39,000 --> 00:55:44,000
And, and so that meant that it took us a while to sort of get the pieces exactly the way we wanted them.

452
00:55:44,000 --> 00:55:50,000
But once we got them there, they've actually been very stable and solid and really nice and they work together well.

453
00:55:50,000 --> 00:55:57,000
And the same thing is kind of happening with generics now where we actually feel, I feel personally really good about generics.

454
00:55:57,000 --> 00:56:09,000
I feel like it feels like the rest of go and that just wasn't the case for the proposals that we had, you know, even a couple years ago, much less the early ones.

455
00:56:09,000 --> 00:56:15,000
Someone said they really like defer, which is unique to language and I do too. Thank you.

456
00:56:15,000 --> 00:56:20,000
But I wanted to point out that, you know, we did absolutely create defer over go.

457
00:56:20,000 --> 00:56:29,000
But Swift has adopted it. And I think there's a proposal for C++ to adopt it as well. So, you know, hopefully it kind of moves out a little bit.

458
00:56:29,000 --> 00:56:34,000
There was a question about go and using capitalization for exporting.

459
00:56:34,000 --> 00:56:40,000
And which I know is like something that, you know, sort of is jarring when you first see it.

460
00:56:40,000 --> 00:56:44,000
And the story behind that is that well, we needed something and we knew that we would need something.

461
00:56:44,000 --> 00:56:49,000
But like at the beginning, we just said, look, everything's export everything's publicly visible. We'll deal with it later.

462
00:56:49,000 --> 00:56:56,000
And after about a year, it was like clear that we needed some way to, you know, let programmers hide things from other programmers.

463
00:56:56,000 --> 00:57:11,000
And, you know, C++ has this public colon and private colon. And in a large struct, it's actually really annoying that like you're looking, you're looking at definitions and you have to scroll backwards and try to find where the like most recent public colon or private colon was.

464
00:57:11,000 --> 00:57:17,000
And if it's really big, it can be hard to find one. And so it's like hard to tell whether a particular definition is public or private.

465
00:57:17,000 --> 00:57:25,000
And then in Java, of course, it's at the beginning of every single field. And that seemed kind of excessive too. It's just too much typing.

466
00:57:25,000 --> 00:57:32,000
And so we looked around some more and someone pointed out to us that well, Python has this convention where you put an underscore in front to make something hidden.

467
00:57:32,000 --> 00:57:39,000
And that seemed interesting, but you probably don't want the default to be not hidden. You want the default to be hidden.

468
00:57:39,000 --> 00:57:44,000
And then we thought about well, we could put like a plus in front of names.

469
00:57:44,000 --> 00:57:51,000
And then someone suggested, well, like what about uppercase could be exported. And it seemed like a dumb, terrible idea.

470
00:57:51,000 --> 00:57:56,000
It really did. But as you think about it, like I really didn't like this idea.

471
00:57:56,000 --> 00:58:02,000
And I have like very clear memory of sitting of like the room and what I was staring at as we discussed this.

472
00:58:02,000 --> 00:58:10,000
But I had no logical argument against it. And it turned out it was fantastic. It was like it seemed bad. It just like aesthetically.

473
00:58:10,000 --> 00:58:17,000
But it is one of my favorite things now about go that when you look at a use of something, you can see immediately you get that bit of,

474
00:58:17,000 --> 00:58:28,000
is this something that other people can access or not at every use? Because you know, you see code calling a function to do, you know, whatever it is that it does, you think, oh, wow, like can it can other people do that.

475
00:58:28,000 --> 00:58:38,000
And you know, your brain sort of takes care of that. But now I go to C++ and I see calls like that. And I get really worried. I'm like, wait, is that is that something other classes can get at.

476
00:58:38,000 --> 00:58:43,000
And having that data actually turns out to be really useful for reading code.

477
00:58:43,000 --> 00:58:50,000
A couple of people asked about generics. If you don't know, we have an active proposal for generics. We're actively working on implementing it.

478
00:58:50,000 --> 00:58:59,000
We hope that the release later in the year towards the end of the year will actually have, you know, a full version of generics that you can actually use.

479
00:58:59,000 --> 00:59:11,000
The, that'll be like a preview release. The real release that we hope it will be in is go on 18, which is February of next year. So maybe next class will actually get to use generics. We'll see.

480
00:59:11,000 --> 00:59:24,000
But I'm certainly looking forward to having like a generic minute max. The reason we don't have those is that you'd have to pick which type they were for or you have like a whole suite of them and it just seem silly. It seemed like we should wait for generics.

481
00:59:24,000 --> 00:59:35,000
Someone asked, is there any area of programming where go may not be the best language, but it's still used. And, and the answer is like absolutely like that happens all the time with every language.

482
00:59:35,000 --> 00:59:50,000
I think go is actually really good all around language. But you know, you might use it for something that's not perfect for just because the rest of your program is written and go and you want to interoperate with the rest of the program. So, you know, there's this website called the online encyclopedia of integer sequences.

483
00:59:50,000 --> 00:59:55,000
It's a search engine. You type in like two, three, five, seven, eleven and it tells you those are the primes.

484
00:59:55,000 --> 01:00:05,000
And it turns out that the backend for that is all written and go. And if you type in a sequence, it doesn't know it actually does some pretty sophisticated math on the numbers, all with big numbs and things like that.

485
01:00:05,000 --> 01:00:15,000
And all of that is written and go to because it was too annoying to shell out to maple and math, and and sort of do that cross language thing, even though you'd much rather implement in those languages.

486
01:00:15,000 --> 01:00:23,000
So, you know, you run into those sorts of compromises all the time and that's fine.

487
01:00:23,000 --> 01:00:36,000
And that's the last about, you know, go is supposed to be simple. So that's why there's like no generics and those sets. But isn't also for software developers and don't software developers need all this stuff and you know, it's silly to reconstruct it.

488
01:00:36,000 --> 01:00:51,000
And I think that's, it's true that there's someone intention, but but simplicity in the sense of leaving things out was not ever the goal. So like for sets, you know, it just seemed like maps are so close to sets. You just have a set a map where the value is empty or a Boolean.

489
01:00:51,000 --> 01:01:03,000
So that's a set. And for generics, like you have to remember that when we started go in 2007, Java was like just finishing a true fiasco of a rollout of generics.

490
01:01:03,000 --> 01:01:14,000
And so like we were really scared of that. We knew that if we just tried to do it, you know, we would get it wrong. And we knew that we could write a lot of useful programs without generics. And so that was what we did.

491
01:01:14,000 --> 01:01:24,000
And then we came back to it when you know, we felt like, okay, we've, you know, spent enough time writing other programs. We kind of know a lot more about what we need from from generics for go.

492
01:01:24,000 --> 01:01:35,000
And we can take the time to talk to real experts. And I think that, you know, it would have been nice to have them five or 10 years ago, but we wouldn't have had the really nice ones that we're going to have now.

493
01:01:35,000 --> 01:01:40,000
So I think it was probably the right decision.

494
01:01:40,000 --> 01:01:47,000
So there was a question about go routines and the relation to the plan nine thread library, which, which was all cooperatively scheduled.

495
01:01:47,000 --> 01:01:51,000
And whether go routines wherever corporally scheduled and like if that caused problems.

496
01:01:51,000 --> 01:02:00,000
And it is absolutely the case that like go and the go routine runtime were sort of inspired by previous experience on plan nine.

497
01:02:00,000 --> 01:02:08,000
There was actually a different language called aliph on an early version plan nine that was compiled. It had channels. It had select.

498
01:02:08,000 --> 01:02:15,000
It had things we called tasks which were a little bit like go routines, but it didn't have a garbage collector. And that made things really annoying in a lot of cases.

499
01:02:15,000 --> 01:02:23,000
And also the way that tasks work, they were tied to a specific thread. So you might have three tasks in one thread and two tasks in another thread.

500
01:02:23,000 --> 01:02:31,000
And in the three tasks in the first thread, they only won ever ran at a time and they could only rescheduled during a channel operation.

501
01:02:31,000 --> 01:02:35,000
And so you would write code where those three tasks were all operating on the same data structure.

502
01:02:35,000 --> 01:02:46,000
And you just knew because it was in your head when you wrote it that you know it was okay for these two different tasks to be scribbling over the same data structure because they could never be running at the same time.

503
01:02:46,000 --> 01:02:51,000
And then you would be working while you know in the other thread, you've got the same situation going on with different data and different tasks.

504
01:02:51,000 --> 01:02:57,000
And then you come back to the same program like six months later and you totally forget which tasks could write to different pieces of data.

505
01:02:57,000 --> 01:03:08,000
And I'm sure that we had tons of races. I mean, it was just it was a nice model for small programs and it was a terrible model for for programming over a long period of time or having a big program that other people had to work on.

506
01:03:08,000 --> 01:03:16,000
So, so that was never the model for go. The model for go was always it's good to have these lightweight go routines, but they're going to all be running independently.

507
01:03:16,000 --> 01:03:23,000
And if they're going to share anything they need to use locks and they need to use channels to communicate and coordinate explicitly.

508
01:03:23,000 --> 01:03:28,000
And that that is definitely scaled a lot better than any of the plan nine stuff I ever did.

509
01:03:28,000 --> 01:03:35,000
You know, sometimes people hear that go routines are cooperatively scheduled and they think, you know, something more like that.

510
01:03:35,000 --> 01:03:41,000
It's it's true that early on the go routines were not as preemptively scheduled as you would like.

511
01:03:41,000 --> 01:03:51,000
So in the very, very early days, the only preemption points when you called into the runtime shortly after that, the preemption points where anytime you enter to function.

512
01:03:51,000 --> 01:03:59,000
And if you were in a tight loop for a very long time, that would never preempt and that would cause like garbage collector delays because garbage collector need to stop all the go routines.

513
01:03:59,000 --> 01:04:04,000
And there be some go routines stuck in a tight loop and it would take forever to finish the loop.

514
01:04:04,000 --> 01:04:12,000
And so actually in the last couple releases, we finally started, we figured out how to get unique signals to deliver to threads and just the right way so that.

515
01:04:12,000 --> 01:04:17,000
And we can have the right bookkeeping to actually be able to use that as a preemption mechanism.

516
01:04:17,000 --> 01:04:31,000
And so now things are, I think, I think the preemption delays for garbage collection are actually bounded finally, but from the start, the model has been that, you know, they're running preemptively and they don't get control over when they get preempted.

517
01:04:31,000 --> 01:04:38,000
As a sort of follow on questions, someone else asked, you know, where they can look to in the source tree to learn more about go routines.

518
01:04:38,000 --> 01:04:49,000
And the go routine scheduler. And the answer is that this is basically a little operating system, like it's a little operating system that sits on top of the other operating system, instead of on top of CPUs.

519
01:04:49,000 --> 01:05:03,000
And so the first thing to do is like take 6828, which is like, I mean, I worked on 6828 and an XV6, like literally like the year or two before I went and did the go runtime. And so like there's a huge amount of 6828 in the go runtime.

520
01:05:03,000 --> 01:05:11,000
And in the actual go runtime directory, there's a file called proc.go, which is, you know, proc stands for process because like that's what it is in the operating systems.

521
01:05:11,000 --> 01:05:18,000
And I would start there like that's the file to start with and then sort of pull on strings.

522
01:05:18,000 --> 01:05:27,000
Someone asked about Python sort of negative indexing where you can write X of minus one. And that comes up a lot, especially from Python programmers.

523
01:05:27,000 --> 01:05:34,000
And it seems like a really great idea. You write these like really nice elegant programs where like you want to get the last element, you just say X of minus one.

524
01:05:34,000 --> 01:05:41,000
But the real problem is that like you have X of I and you have a loop that's like counting down from, you know, end to zero.

525
01:05:41,000 --> 01:05:51,000
And you have an off by one somewhere and like now X of minus one instead of being, you know, X of I when I is minus one instead of being an error where you see like immediately say, hey, there's a bug. I need to find that.

526
01:05:51,000 --> 01:05:58,000
It just like silently grabs the element off the other end of the array. And and that's where you know that sort of Python.

527
01:05:58,000 --> 01:06:10,000
And so that's why we left it out because it was it was going to hide bugs too much we bought.

528
01:06:10,000 --> 01:06:17,000
You know, you could imagine something where you say like X of dollar minus one or lend minus one not lend of X, but just lend.

529
01:06:17,000 --> 01:06:22,000
But you know, it seemed like too much of a special case and it really it doesn't come up enough.

530
01:06:22,000 --> 01:06:27,000
So I don't want to ask about, you know, what aspect of go was hardest to implement.

531
01:06:27,000 --> 01:06:36,000
And honestly, like a lot of this is not very hard. We've done most of this before we've written operating systems and writing libraries and channel implementations.

532
01:06:36,000 --> 01:06:39,000
And so like doing all of that again was fairly straightforward.

533
01:06:39,000 --> 01:06:42,000
The hardest thing was probably the garbage collector.

534
01:06:42,000 --> 01:06:48,000
But go is unique among garbage collected languages in that it gets programmers a lot more control over memory layout.

535
01:06:48,000 --> 01:06:53,000
So if you want to have a struct with two different other structs inside it, that's just one big chunk of memory.

536
01:06:53,000 --> 01:06:56,000
It's not a struct with pointers to two other chunks of memory.

537
01:06:56,000 --> 01:07:01,000
And because of that and you can take the address of like the second field in the struct and pass that around.

538
01:07:01,000 --> 01:07:07,000
And that means the garbage collector has to be able to deal with a pointer that could point into the middle of an allocated object.

539
01:07:07,000 --> 01:07:11,000
And that's just something that Java and list and other things just don't do.

540
01:07:11,000 --> 01:07:16,000
And so that makes the garbage collector a lot more complicated in how it maintains its data structures.

541
01:07:16,000 --> 01:07:22,000
And we also knew from the start that you really want low latency because if you're handling network requests.

542
01:07:22,000 --> 01:07:29,000
You can't, you know, just pause for 200 milliseconds while and block all of those in progress requests to do a garbage collection.

543
01:07:29,000 --> 01:07:33,000
It really needs to be in, you know, low latency and not stop things.

544
01:07:33,000 --> 01:07:39,000
And we thought that multi core would be a good, the good opportunity there because we could have the garbage collector sort of doing one core.

545
01:07:39,000 --> 01:07:45,000
And the go program using the other cores and that might work really well. And that actually did turn out to work really well.

546
01:07:45,000 --> 01:07:52,000
But it required hiring a real expert in garbage collection to like figure out how to do it.

547
01:07:52,000 --> 01:07:56,000
And make it work. But but now it's really great.

548
01:07:56,000 --> 01:07:58,000
I have a quick question. Yeah.

549
01:07:58,000 --> 01:08:03,000
You said like if a struct like is declared inside another struct.

550
01:08:03,000 --> 01:08:06,000
It actually is all a big chunk of memory.

551
01:08:06,000 --> 01:08:11,000
Yeah. Why did why did you implement it like that? What's the reason behind that?

552
01:08:11,000 --> 01:08:20,000
Um, I, well, so there's a couple reasons one is for a garbage collector. Right. It's a service and the load on the garbage collector is proportional to the number of objects you allocate.

553
01:08:20,000 --> 01:08:24,000
And so if you have, you know, a struct with five things in it and you can make that one allocation.

554
01:08:24,000 --> 01:08:29,000
That's like a fifth of the load on the garbage collector and that turns out to be really important.

555
01:08:29,000 --> 01:08:32,000
But the other thing that's really important is casual quality.

556
01:08:32,000 --> 01:08:38,000
Like if you have the processor is pulling in chunks of memory in like, you know, 64 byte chunks or whatever it is.

557
01:08:38,000 --> 01:08:42,000
And it's much better reading memory that's altogether than reading memory that's scattered.

558
01:08:42,000 --> 01:08:48,000
And so, you know, we have a get server at Google called Garrett that is written Java.

559
01:08:48,000 --> 01:08:52,000
And it was just starting at the time that that go was, you know, so just coming out.

560
01:08:52,000 --> 01:08:57,000
And we just missed like Garrett being written and go, I think, by like a year.

561
01:08:57,000 --> 01:09:05,000
And he said that the guy who had written Garrett and he said that like one of the biggest problems in Garrett was like, you have really shot one hashes.

562
01:09:05,000 --> 01:09:09,000
And just having the idea of 20 bytes is like impossible to have in Java.

563
01:09:09,000 --> 01:09:11,000
You can't just have 20 bytes in a struct.

564
01:09:11,000 --> 01:09:13,000
You have to have a pointer to an object.

565
01:09:13,000 --> 01:09:17,000
And the object like, you know, you can't even have 20 bytes in the object, right.

566
01:09:17,000 --> 01:09:21,000
You have to declare like five different ins or something like that to get 20 bytes.

567
01:09:21,000 --> 01:09:29,000
And so, you know, no good way to do it. And it's just the overhead of just a simple thing like that really adds up.

568
01:09:29,000 --> 01:09:36,000
And so, you know, we thought giving programmers control over memory was really important.

569
01:09:36,000 --> 01:09:41,000
So another question was about automatic parallelization like for loops and things like that.

570
01:09:41,000 --> 01:09:44,000
We don't do anything like that in the standard go tool chain.

571
01:09:44,000 --> 01:09:48,000
So we start go compilers for go front ends for GCC and LLVM.

572
01:09:48,000 --> 01:09:55,000
And so to the extent that those do those kind of loop optimizations and see, I think, you know, we get the same from the go friends for those.

573
01:09:55,000 --> 01:09:59,000
But it's not the kind of parallelization that we typically need at Google.

574
01:09:59,000 --> 01:10:03,000
It's more, you know, lots of servers running different things.

575
01:10:03,000 --> 01:10:09,000
And so, you know, that sort of, you know, like the sort of big vector math kind of stuff doesn't come up as much.

576
01:10:09,000 --> 01:10:13,000
So it just hasn't been that important to us.

577
01:10:13,000 --> 01:10:21,000
And then the last question I have written down is that someone asked about like how do you decide when to acquire release locks and why don't you have reentered locks.

578
01:10:21,000 --> 01:10:25,000
And for that, I want to go back a slide. Let me see.

579
01:10:25,000 --> 01:10:33,000
Yeah, here. So like, you know, during the lecture, I said things like the lock, like new protects the map or protects the data.

580
01:10:33,000 --> 01:10:41,000
But what we really mean at that point is that we're saying that the lock protects some collection of invariants that apply to the data or that are true of the data.

581
01:10:41,000 --> 01:10:51,000
And the reason that we have a lock is to protect the operations that depend on the invariants and that sometimes temporarily invalidate the invariants from each other.

582
01:10:51,000 --> 01:10:57,000
And so when you call lock, what you're saying is I need to make use of the invariants that this lock protects.

583
01:10:57,000 --> 01:11:00,000
And when you call unlock what you're saying is I don't need them anymore.

584
01:11:00,000 --> 01:11:09,000
And if I temporarily invalid invalidated them, I have put them back so that the next person who calls lock will see, you know, correct invariants.

585
01:11:09,000 --> 01:11:15,000
So in the mux, you know, we want the invariant that each registered pending channel gets it most one reply.

586
01:11:15,000 --> 01:11:21,000
And so to do that, when we take done out of the map, we also delete it from the map before we unlock it.

587
01:11:21,000 --> 01:11:29,000
And if there was some separate kind of cancel operation that was directly implying the map as well, it could lock the, it could call lock.

588
01:11:29,000 --> 01:11:32,000
It could take the thing out, call unlock.

589
01:11:32,000 --> 01:11:38,000
And then, you know, if it actually found one, it would know, no one is going to send to that anymore because I took it out.

590
01:11:38,000 --> 01:11:56,000
Whereas if you know, we had written this code to have, you know, an extra unlock and re lock between the done equals pending of tag and the delete, then you wouldn't have that, you know, protection of the invariants anymore because you would have put things back, you unlock and re locked while the invariants were broken.

591
01:11:56,000 --> 01:12:02,000
And so it's really important to, you know, correctness to think about locks is protecting invariants.

592
01:12:02,000 --> 01:12:16,000
And, and so if you have reentrant locks, all that goes out the window without the reentrant lock, when you call lock on the next line, you know, okay, the lock just got acquired all the invariants are true.

593
01:12:16,000 --> 01:12:25,000
If you have a reentrant lock, all you know is, well, all the invariants were true for whoever locked this the first time, who like might be way up here on my call stack.

594
01:12:25,000 --> 01:12:27,000
And, and you really know nothing.

595
01:12:27,000 --> 01:12:31,000
And so that makes it a lot harder to reason about like, what can you assume?

596
01:12:31,000 --> 01:12:36,000
And, and so I think reentrant locks are like a really unfortunate part of Java's legacy.

597
01:12:36,000 --> 01:12:46,000
And another big problem with reentrant locks is that if you have code where, you know, you call something and it is depending on a reentrant lock for, you know, something where you've acquired the lock up above.

598
01:12:46,000 --> 01:12:54,000
And, and then at some point you say, you know what, actually, I want to like have a time out on this or I want to do it, you know, in some other go routine while I wait for something else.

599
01:12:54,000 --> 01:13:02,000
When you move that code to a different go routine, reentrant always means locked on the same stack. That's like the only plausible thing it could possibly mean.

600
01:13:02,000 --> 01:13:13,000
And so if you move the code that was doing the reentrant lock onto a different stack, then it's going to deadlock because it's going to the lock is now actually going to be a real lock acquire and it's going to be waiting for you to let go of the lock.

601
01:13:13,000 --> 01:13:17,000
And you're not going to let go of it because you know you think that code needs to finish running.

602
01:13:17,000 --> 01:13:24,000
So it's actually like completely fundamentally incompatible with restructuring where you take code and run it in different threads or different routines.

603
01:13:24,000 --> 01:13:36,000
And so anyway, like my advice there is to just think about locks protecting invariants and then you just avoid depending on reentrant locks. It really just doesn't scale well to real programs.

604
01:13:36,000 --> 01:13:42,000
So I'll put this list back up. Actually, you know, we have that up long enough. I can try to figure out how to stop presenting.

605
01:13:42,000 --> 01:13:47,000
And then I can take a few more questions.

606
01:13:47,000 --> 01:13:50,000
I had a question.

607
01:13:50,000 --> 01:13:59,000
And I mean, I think coming from Python, like it's very useful, right? It's very common to use like standard functional operations, right?

608
01:13:59,000 --> 01:14:06,000
Like map or filter stuff like that, like list comprehension.

609
01:14:06,000 --> 01:14:18,000
And when you know I switch over to go and started programming, it's use I looked it up and people say like you shouldn't do this. Do this with no right? I was wondering why?

610
01:14:18,000 --> 01:14:24,000
Well, I mean, one is that you can't do it the other way. So you might as well do the way you can do it.

611
01:14:24,000 --> 01:14:28,000
But you know, a bigger issue is that.

612
01:14:28,000 --> 01:14:42,000
So that was one answer. The other answer is that, you know, if you do it that way, you actually end up creating a lot of garbage. And if you care about like not putting too much load on the garbage collector, that kind of is another way to avoid that.

613
01:14:42,000 --> 01:14:54,000
You know, so if you've got like a map and then a filter and then another map, like you can make that one loop over the data instead of three loops over the data each of which generate a new piece of garbage.

614
01:14:54,000 --> 01:15:04,000
So now that we have generic coming, you'll actually be able to write those functions like you couldn't actually write what the types of those functions were before. And so like you literally couldn't write them.

615
01:15:04,000 --> 01:15:17,000
And Python gets away with this because there's no, you know, static types. But now we're actually going to have a way to do that. And I totally expect that once new arcs go in, there will be a package slices and if you import slices, you can do slices that map and slices that filter.

616
01:15:17,000 --> 01:15:26,000
And if you want to make a leak or something like that. And I think those will all happen. And you know, if if that's the right thing, then that's great.

617
01:15:26,000 --> 01:15:30,000
Thanks.

618
01:15:30,000 --> 01:15:40,000
But one of the hints that you had, it was about running go routines that are independent, like concurrently.

619
01:15:40,000 --> 01:15:45,000
And some of the examples of the code, I think I couldn't understand.

620
01:15:45,000 --> 01:15:53,000
It seemed to me like you can just like call the function in the same thread rather than in different thread.

621
01:15:53,000 --> 01:15:57,000
And I was not sure why you would call it in a different thread.

622
01:15:57,000 --> 01:16:11,000
Usually it's because you want them to proceed independently. So, so in one of the, one of the examples we had, like, the, there was a loop that was sending, you know, tasks to the work queue.

623
01:16:11,000 --> 01:16:21,000
But there was the servers were running in different go routines and reading from the work you and doing work. But then when they were done, they would send, you know, hey, I'm done now to the done channel.

624
01:16:21,000 --> 01:16:34,000
But ascending go doesn't complete until they receive actually matches with it. And so if the thing that's sending on the work queue is not going to start receiving from the done channel until it's done sending to all the work cues.

625
01:16:34,000 --> 01:16:44,000
Or sending all the work into all the tasks and to work you. Then now you have a deadlock because the main thread, the main goal routine is trying to send new work to the servers.

626
01:16:44,000 --> 01:16:58,000
The servers are not taking new work. They're trying to tell the main thread that they're done. But the main thread's not going to actually start at like reading from the done channel until it finishes giving out all the work. And so there's just they're just staring at each other waiting for different things to happen.

627
01:16:58,000 --> 01:17:05,000
Whereas if we take that loop that if we just put the little go routine around the loop that's sending the work, then that can go somewhere else.

628
01:17:05,000 --> 01:17:17,000
And then it can proceed independently. And while it's stuck waiting for the servers to send to take more work, the servers are stuck waiting for the main go routine to, you know, acknowledge that it finished some work.

629
01:17:17,000 --> 01:17:25,000
And now the main go routine actually gets down to the loop that you know pulls that finishes that actually acknowledges that it finished the work that reads from the done channel.

630
01:17:25,000 --> 01:17:31,000
And so it's just a way to separate out, you know, these are two different things that logically they didn't have to happen one after the other.

631
01:17:31,000 --> 01:17:38,000
And because they were happening one after the other that caused a deadlock and by taking one out and moving it, let it run independently.

632
01:17:38,000 --> 01:17:42,000
That removes the deadlock.

633
01:17:42,000 --> 01:17:44,000
Thank you so much.

634
01:17:44,000 --> 01:17:45,000
Sure.

635
01:17:45,000 --> 01:17:49,000
So let's talk a little bit about how it goes, race, sector is implemented.

636
01:17:49,000 --> 01:17:52,000
Sure, it is the LVM race detector.

637
01:17:52,000 --> 01:17:58,000
And so I probably doesn't help, but but it is exactly the thing that LVM calls thread sanitizer.

638
01:17:58,000 --> 01:18:05,000
And so we actually have a little binary blob that you know we link against because we don't want to depend on all of the M.

639
01:18:05,000 --> 01:18:07,000
But it's the LVM race detector.

640
01:18:07,000 --> 01:18:12,000
And the way the LVM race detector works is that it allocates a ton of extra virtual memory.

641
01:18:12,000 --> 01:18:26,000
And then based on the address of the thing being read or written, it has this other, you know, spot in virtual memory where it records information about like the last thread, you know, it thinks of threats, but they're go routines.

642
01:18:26,000 --> 01:18:36,000
And then also every time a synchronizing event happens like you know a communication from one go routine to another.

643
01:18:36,000 --> 01:18:40,000
That counts as establishing a happens before edge between two different go routines.

644
01:18:40,000 --> 01:18:45,000
And if you ever get something where you have a read and a write.

645
01:18:45,000 --> 01:18:53,000
And they're not properly sequenced right like so if you have a read and then it happens before something in another go routine, which then you know later does the right that's fine.

646
01:18:53,000 --> 01:18:57,000
So reading a right and there's no happens before sequence that connects them.

647
01:18:57,000 --> 01:18:59,000
Then that's a race.

648
01:18:59,000 --> 01:19:07,000
And it actually has some pretty clever ways to dynamically figure out quickly, you know, did this read happen.

649
01:19:07,000 --> 01:19:10,000
Is there happens before path between this reading straight as they happen.

650
01:19:10,000 --> 01:19:13,000
And it slows down the program by like maybe 10X.

651
01:19:13,000 --> 01:19:18,000
But you know if you just divert a small amount of traffic there, that's probably fine.

652
01:19:18,000 --> 01:19:24,000
And it's it's way better than like not finding out about the races. So it's totally worth it.

653
01:19:24,000 --> 01:19:32,000
And honestly, 10 or 20X is fantastic. The original thread sanitizer was more like 100 or 1000 X and that was not good enough.

654
01:19:32,000 --> 01:19:35,000
What's the race detector called LRVN?

655
01:19:35,000 --> 01:19:45,000
It's called thread sanitizer, but it's part of LLVM, which is the Clang C compiler, the one that almost everyone uses now.

656
01:19:45,000 --> 01:19:55,000
And it's part of the LLVM project.

657
01:19:55,000 --> 01:20:02,000
Can you talk about slices and like the design choices having them as views on a race, which like confused me at first.

658
01:20:02,000 --> 01:20:06,000
Yeah, yeah, it is a little confusing at first.

659
01:20:06,000 --> 01:20:14,000
The main thing is that you want it to be efficient to kind of walk through an array or to like, you know, if you couldn't quick sort or merge sort or something where you have an array of things.

660
01:20:14,000 --> 01:20:17,000
And now you want to say, well, now sort this half and sort the other half.

661
01:20:17,000 --> 01:20:23,000
You want to be able to efficiently say like here, this is half of the previous one, like, you know, sort that.

662
01:20:23,000 --> 01:20:30,000
And so in C, the way you do that is you just pass in, you know, the pointer to the first element and the number of elements.

663
01:20:30,000 --> 01:20:32,000
And that's basically all a slice is.

664
01:20:32,000 --> 01:20:39,000
And then the other pattern that comes up a lot when you're, you know, trying to be efficient with arrays is you have to grow them.

665
01:20:39,000 --> 01:20:45,000
And so you don't want to read call realloc on every single new element, you want to amortize that.

666
01:20:45,000 --> 01:20:53,000
And so the way you do that in in C again is that you have a base pointer, you have the length that you're using right now and you have the length that you allocated.

667
01:20:53,000 --> 01:20:58,000
And then to add one you check and see if the length is bigger than the amount you allocated.

668
01:20:58,000 --> 01:21:01,000
And otherwise you just keep bumping it forward.

669
01:21:01,000 --> 01:21:08,000
And slices are really just an encoding of those idioms because those are kind of the most efficient way to manage the memory.

670
01:21:08,000 --> 01:21:14,000
And so in any kind of like C++ vector or sort of thing like that, that's what's going on underneath.

671
01:21:14,000 --> 01:21:23,000
But it makes it a lot harder to like the C++ vector because of ownership reasons, you know, the vector is tied to the actual underlying memory.

672
01:21:23,000 --> 01:21:29,000
And it's a lot harder to get like a sub vector that's just the view on to like the second half for merge sort.

673
01:21:29,000 --> 01:21:36,000
So that's sort of the ideas that it just like there are all these patterns for accessing memory officially that came from C.

674
01:21:36,000 --> 01:21:43,000
And we tried to make them fit into go in an idiomatic way in a safe way.

675
01:21:43,000 --> 01:21:51,000
So look at how you decided to implement the go like remote module system where you import directly from a URL.

676
01:21:51,000 --> 01:21:53,000
Yeah.

677
01:21:53,000 --> 01:22:00,000
I mean, I just didn't want to run a service and like, like, you know, a lot of the things like Ruby gems and those like we're not as.

678
01:22:00,000 --> 01:22:04,000
For the front of my mind at the time, just because they were newer.

679
01:22:04,000 --> 01:22:07,000
But like I used Pearl for a while and like C pan.

680
01:22:07,000 --> 01:22:12,000
And I just thought it was it was insane that like everyone was fighting over these short names like DB, you know.

681
01:22:12,000 --> 01:22:18,000
There probably shouldn't be an argument over like who gets to make the DB package.

682
01:22:18,000 --> 01:22:22,000
And so putting domain names in the front seemed like a good way to decentralize it.

683
01:22:22,000 --> 01:22:30,000
And it was also a good way for us not to run any server because you know, we could just say while we don't recognize the host name and then and then go grab it from source control.

684
01:22:30,000 --> 01:22:32,000
From someone else's server.

685
01:22:32,000 --> 01:22:35,000
And that turned out to be a really great idea, I think.

686
01:22:35,000 --> 01:22:40,000
Because we just we don't have that kind of same infrastructure that other things depend on.

687
01:22:40,000 --> 01:22:44,000
Like in the Java world, it's actually really problematic. There are multiple.

688
01:22:44,000 --> 01:22:48,000
There's no sort of standard registry, but they all use these short names.

689
01:22:48,000 --> 01:22:54,000
And so like Maven can be configured to build from multiple different registries.

690
01:22:54,000 --> 01:23:00,000
And you if you're an open source software package provider, you actually have to go around and be sure that you uploaded to all the different registries.

691
01:23:00,000 --> 01:23:05,000
Because if you don't if you miss one and it becomes popular, someone else will upload different code to that one.

692
01:23:05,000 --> 01:23:09,000
And and then like Maven actually just takes which everyone comes back first.

693
01:23:09,000 --> 01:23:12,000
It just like sends a request to all of them and whatever comes back first.

694
01:23:12,000 --> 01:23:18,000
So like, you know, if someone wants to make a malicious copy of your package, all I do is find some registry other people use that you forgot to upload it to.

695
01:23:18,000 --> 01:23:21,000
And like, you know, they get to win the race sometimes.

696
01:23:21,000 --> 01:23:29,000
So it's like, it's a real problem. Like I think having the domain name there really helps split up the ownership in a really important way.

697
01:23:29,000 --> 01:23:30,000
Thank you.

698
01:23:30,000 --> 01:23:35,000
Sure.

699
01:23:35,000 --> 01:23:38,000
So what the name is you take a quick pause here.

700
01:23:38,000 --> 01:23:42,000
I was people that have to go and go. I'm sure Russ is willing to stick around for a little bit longer.

701
01:23:42,000 --> 01:23:43,000
Yeah.

702
01:23:43,000 --> 01:23:47,000
And answer any questions. But I do want to think Russ for giving this lecture.

703
01:23:47,000 --> 01:23:52,000
Hopefully this will help you running more good per go programs.

704
01:23:52,000 --> 01:23:56,000
DC patterns and so thank you Russ.

705
01:23:56,000 --> 01:24:00,000
Welcome. It's nice to be here.

706
01:24:00,000 --> 01:24:03,000
And then more questions feel free to ask questions.

707
01:24:03,000 --> 01:24:04,000
Yeah.

708
01:24:04,000 --> 01:24:07,000
Oh, just a little logistical thing.

709
01:24:07,000 --> 01:24:13,000
The slides that are on the 6824 website are not the exactly the same as Russ's slides.

710
01:24:13,000 --> 01:24:14,000
People.

711
01:24:14,000 --> 01:24:16,000
Yeah, well, I'll get friends and new PDF.

712
01:24:16,000 --> 01:24:19,000
Yeah.

713
01:24:19,000 --> 01:24:26,000
So I have a question about when is writing a new language like the best solution to a phone.

714
01:24:26,000 --> 01:24:31,000
That's a great question. It's almost never the best solution.

715
01:24:31,000 --> 01:24:38,000
But you know, at the time we had just an enormous number of programmers like thousands of programmers working in one code base.

716
01:24:38,000 --> 01:24:47,000
And the compilations were just taking forever because C++ was just not not meant for, you know, efficient incremental compilation.

717
01:24:47,000 --> 01:24:53,000
And so, and furthermore, at the time, like threading libraries were really awful.

718
01:24:53,000 --> 01:24:54,000
Like people just didn't use threads.

719
01:24:54,000 --> 01:24:57,000
I remember the like one of the first days I was at MIT and talking to Robert.

720
01:24:57,000 --> 01:25:03,000
And Robert said to me, like in 2001, he said to me, like, well, we don't use threads here because threads are slow.

721
01:25:03,000 --> 01:25:08,000
And that was like totally normal. Like that was just the way the world at the time.

722
01:25:08,000 --> 01:25:14,000
And at Google, we were having a lot of trouble because it was all event based, like little callbacks and C++.

723
01:25:14,000 --> 01:25:22,000
And there were these multi core machines. And we actually didn't know how to get things to work on them because like Linux threads were not something you could really rely on to work.

724
01:25:22,000 --> 01:25:31,000
And so we ended up like, if you had a four core machine, you just run four different process into completely independent processes of the web server and just treat it as like four machines.

725
01:25:31,000 --> 01:25:39,000
And that was clearly like not very efficient. So like there were a lot of good reasons to like try something.

726
01:25:39,000 --> 01:25:46,000
But you know, it's a huge amount of work to get to the point where go is today. And I think that so much is not the language, right.

727
01:25:46,000 --> 01:25:51,000
Like there were important things that we made didn't the language that enabled other considerations.

728
01:25:51,000 --> 01:26:00,000
But so much of the successful languages, the egos and like I built up around it and the tooling that we built and the go command and like all these like not the language things.

729
01:26:00,000 --> 01:26:15,000
So, you know, programming language, people who are like focus on the language itself. I think sometimes get distracted by all the stuff around it.

730
01:26:15,000 --> 01:26:25,000
Can I ask a full often that I was wondering how it's working on go different now since it's more mature than it was before.

731
01:26:25,000 --> 01:26:37,000
Oh, that's a great question. You know, in the early days, it was so easy to make changes. And now it's really hard to make changes. I think that's the number one thing.

732
01:26:37,000 --> 01:26:52,000
You know, in the early days, like everything was in one source code repository, literally all the go code in the world was in one source code repository. And so like there were days where we changed the syntax like you used to have a star before Chan every time you set a channel, because it was a pointer underneath and it was all kind of exposed.

733
01:26:52,000 --> 01:27:01,000
So you'd always say star Chan int instead of Chan int and similarly for maps. And at some point we realized like this is done. Like you have to say the star. Let's just take it out.

734
01:27:01,000 --> 01:27:17,000
And so like we made the change to the compiler. And I opened up literally like the couple hundred go source files in the world in my editor and like the entire team stood behind me and like I typed some regular expressions and we looked at the effect on the files. If you have that looks right, save it, you know, compile it. We're done.

735
01:27:17,000 --> 01:27:35,000
And like today, you know, we can't make backwards, but the compatible changes at all. And even making new changes like it affects a lot of people. And so, you know, you sort of propose something and you know, people, well, this won't work for me and you try to like adjust that maybe.

736
01:27:35,000 --> 01:27:44,000
It's just it's a lot harder. We estimate there's at least a million, maybe two million go programmers in the world and is very different from when they were four or five.

737
01:27:47,000 --> 01:27:58,000
And so, you know, I'm sure if this is a valid question, but what languages go written in? Is it written in go also or no?

738
01:27:58,000 --> 01:28:04,000
Now it is. Now it is. The original compiler runtime or written C, but a few years ago we went through a big.

739
01:28:04,000 --> 01:28:18,000
We actually wrote a program to translate C to go that only worked for our C code, but still it was good enough so that we wouldn't lose kind of all the sort of encoded knowledge in that code about why things were the way they were and like how things works. We got to start from scratch.

740
01:28:18,000 --> 01:28:28,000
But now it's all written in go and you know, a little bit of assembly. And that means that people can, you know, people who know go can help on the go project.

741
01:28:28,000 --> 01:28:43,000
That's before like, if you wanted to work on the compiler or the runtime, you had to know C really well and like, we weren't getting a lot of people new C really well, like there's not actually that many of them proportionally and and furthermore like aren't our user bases go programmers not see programmers so moving to go with.

742
01:28:43,000 --> 01:28:46,000
It was a really big deal.

743
01:28:46,000 --> 01:28:56,000
I was wondering how do you prioritize what features to have to link with that like this point like an all generate sort of like a lot of where we're like asking for that like.

744
01:28:56,000 --> 01:28:59,000
You don't know like how you choose what to work on.

745
01:28:59,000 --> 01:29:05,000
I mean, we've considered language mostly frozen for a while and and so we haven't been adding much.

746
01:29:05,000 --> 01:29:16,000
There was a long period where we said we were not anything and then we added a little bit of things in the last couple years to lead up to Jericho's kind of shake the rust off. I'm like all the like what breaks when you change something in the language.

747
01:29:16,000 --> 01:29:21,000
So like you can put underscores between digits and long numbers now things like that.

748
01:29:21,000 --> 01:29:27,000
But you know generics has clearly been the next thing that needed to happen and we just had to figure out how.

749
01:29:27,000 --> 01:29:33,000
In general, we try to only add things that don't have weird kind of interference with other features.

750
01:29:33,000 --> 01:29:50,000
And we try to add things that are really important that will help a lot of people for the kinds of programs that we're trying to target with go which is like distributed systems and that sort of thing.

751
01:29:50,000 --> 01:29:52,000
Cool.

752
01:29:52,000 --> 01:29:56,000
Oh, I had a question actually.

753
01:29:56,000 --> 01:30:04,000
So I noticed that like, you know, go doesn't have like basic functions like men or max for like.

754
01:30:04,000 --> 01:30:11,000
Yeah, so is that like something that you're considering like say adding with like the generic stuff. Maybe is that why you didn't.

755
01:30:11,000 --> 01:30:13,000
Yeah, exactly right. Because like you can't have a man.

756
01:30:13,000 --> 01:30:18,000
You'd have min and then you could have minimum date, but those that have different names and that was kind of annoying.

757
01:30:18,000 --> 01:30:23,000
So now we can light just a generic name over any type that has a less than operator.

758
01:30:23,000 --> 01:30:28,000
Yeah, that'll be good. And you know, honestly, like for the specific case of min and max.

759
01:30:28,000 --> 01:30:30,000
It's not that hard to call that.

760
01:30:30,000 --> 01:30:38,000
I know I was going to say I'm starting to feel like we should just make them built in like like you know print things like that so that you know you can just always have them.

761
01:30:38,000 --> 01:30:42,000
But even if we don't like you'll be math thought man and that'll be there at least.

762
01:30:42,000 --> 01:30:49,000
Yeah, we really didn't want to make them built in until we could like express their types and we couldn't do that until generics happen.

763
01:30:49,000 --> 01:30:52,000
Because there is actually a min for like floating points actually.

764
01:30:52,000 --> 01:30:59,000
Yeah, I know it's kind of weird. It's because it's because the math library is basically copied from the C math dot H set of things.

765
01:30:59,000 --> 01:31:05,000
Yeah, so that's a good point like we can't actually put them in math because they're already there.

766
01:31:05,000 --> 01:31:12,000
Okay, but yeah, we'll figure it out. Like I think we should probably just put them in the language, but we have to get generic through first.

767
01:31:12,000 --> 01:31:18,000
And another thing actually noticed that you did usaco like competitive programming to actually.

768
01:31:18,000 --> 01:31:25,000
Oh, yeah, so how did you so actually I included this in one of the questions that I submitted. Let me pull it up.

769
01:31:25,000 --> 01:31:45,000
So my question was like, how did how was like how did you go from doing competitive programming to like doing what you you're doing now at Google looking on going how's the transition between competitive programming to systems also finally what made you decide to go into systems and how did it really.

770
01:31:45,000 --> 01:31:46,000
Programming company.

771
01:31:46,000 --> 01:31:59,000
I mean, competitive program at the time that I did it was not as all consuming as I gather it is now like, you know, you could just like be able to implement a simple dynamic programming like little two for loops and that was fine.

772
01:31:59,000 --> 01:32:03,000
And now you have to go like complex hall algorithms and all that stuff that I can't do.

773
01:32:03,000 --> 01:32:07,000
So like, at some point like some of them like it was different.

774
01:32:07,000 --> 01:32:16,000
You know, I was actually more interested in the sort of systems you kind of stuff from the start and the program concepts were just like something fun to do on the side.

775
01:32:16,000 --> 01:32:18,000
So there wasn't like a huge transition there.

776
01:32:18,000 --> 01:32:24,000
I was never into like implementing complex hall algorithms and that max flow and all those sorts of things.

777
01:32:24,000 --> 01:32:31,000
On the other hand, like when you start a new language, you actually if you get to write a lot of core things, right.

778
01:32:31,000 --> 01:32:36,000
Like someone has to write the sort function and has to be a good general sort function.

779
01:32:36,000 --> 01:32:44,000
Like I spent a while last month like looking into dip algorithms and that's like, you know, sort of matches that background pretty well.

780
01:32:44,000 --> 01:32:46,000
So it does come up.

781
01:32:46,000 --> 01:32:49,000
But you know, it's just it's just a different kind of program.

782
01:32:49,000 --> 01:32:56,000
Oh, so you thought of it as more of a side thing back then not like it was definitely not the sort of main thing I did when I was writing programs.

783
01:32:56,000 --> 01:32:59,000
Yeah, because like today it's effectively like the main thing.

784
01:32:59,000 --> 01:33:03,000
If you don't do it full time like there's just no way you can.

785
01:33:03,000 --> 01:33:08,000
If you they just want that many people who cared you know in 1995.

786
01:33:08,000 --> 01:33:15,000
Well, yeah, 20 years later.

787
01:33:15,000 --> 01:33:18,000
I'm going to ask her later question to that.

788
01:33:18,000 --> 01:33:24,000
So how'd you decide to go from from like academic work into.

789
01:33:24,000 --> 01:33:32,000
And I was your work is still like a little bit more different than like the usual like software and anything but still.

790
01:33:32,000 --> 01:33:34,000
Yeah, yeah.

791
01:33:34,000 --> 01:33:35,000
You know, I got lucky.

792
01:33:35,000 --> 01:33:43,000
I grew up near Bell Labs in New Jersey. And so like that was how I ended up working on playing the eye in a little bit in high school in college.

793
01:33:43,000 --> 01:33:51,000
And so, you know, I sort of knew I was going to go to grad school and you know, the plan was to go back to Bell Labs, but it kind of imploded while I was in grad school.

794
01:33:51,000 --> 01:33:54,000
And you have to focus

795
01:33:54,000 --> 01:33:56,000
ไป, like, online or proprietary or fly example?

796
01:33:56,000 --> 01:33:58,000
ada. com boom and the. com crash.

797
01:33:58,000 --> 01:34:00,000
And so like, you know Google was sort of a,

798
01:34:00,000 --> 01:34:11,000
just vacuuming up PhDs systems PhDs of the time.

799
01:34:11,000 --> 01:34:13,000
And and doing really interesting things.

800
01:34:13,000 --> 01:34:14,000
I mean, it's probably.

801
01:34:14,000 --> 01:34:17,000
There's things like Spanner and.

802
01:34:17,000 --> 01:34:18,680
to be able to go to that too.

803
01:34:20,680 --> 01:34:25,720
And at the time I graduated, I was also looking at industrial research labs like Microsoft Research

804
01:34:25,720 --> 01:34:32,039
and places like that. So there's definitely an opportunity there for researchy things but not

805
01:34:32,039 --> 01:34:37,159
in academia if that's what you want. It's a little harder to find now. I mean, most of the places

806
01:34:37,159 --> 01:34:45,319
that like Microsoft Research imploded to a couple years later. But it's still an option.

807
01:34:45,319 --> 01:34:52,679
And it's just a slightly different path. The differences I see from academia is you end up

808
01:34:52,679 --> 01:34:57,399
carrying a ton more about actually making things work a hundred percent time and supporting them

809
01:34:57,399 --> 01:35:01,960
for a decade or more. Whereas you finish your paper and you get to put it off to the side.

810
01:35:01,960 --> 01:35:09,799
And that's really nice actually at some level. It's definitely strange to me to be editing

811
01:35:09,800 --> 01:35:16,920
source files that I wrote. In some cases, actually 20 years ago, because I used a bunch of code

812
01:35:16,920 --> 01:35:21,640
that I'd already written when we started go. And it's very weird to think that I've been keeping

813
01:35:21,640 --> 01:35:42,680
this program running for 20 years. Thank you.

