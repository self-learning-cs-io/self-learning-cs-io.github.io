---
title: CS143 P78Week611 03 Activation Records
---

1
00:00:00,000 --> 00:00:08,599
In the previous video, we talked about activations, but we never said what information we actually

2
00:00:08,599 --> 00:00:10,400
need to keep for an activation.

3
00:00:10,400 --> 00:00:15,880
That's the topic of this video.

4
00:00:15,880 --> 00:00:22,080
An activation record is all the information that's needed to manage the execution of one

5
00:00:22,080 --> 00:00:24,120
procedure activation.

6
00:00:24,120 --> 00:00:27,320
And often this is also called a frame.

7
00:00:27,320 --> 00:00:29,760
That means exactly the same thing as activation records.

8
00:00:29,760 --> 00:00:34,920
These are just two names for the same thing.

9
00:00:34,920 --> 00:00:40,439
Now one interesting fact about procedure activations is that they have more information in them

10
00:00:40,439 --> 00:00:41,439
than you might expect.

11
00:00:41,439 --> 00:00:47,359
So in particular, when a procedure F calls a procedure G, the activation record for G

12
00:00:47,359 --> 00:00:53,240
will actually have information not only about G, but very frequently also about the calling

13
00:00:53,240 --> 00:00:54,240
function F.

14
00:00:54,240 --> 00:00:59,120
So typically the activation record for a procedure will contain a mixture of information

15
00:00:59,159 --> 00:01:05,959
both about that procedure and about the procedure that called it.

16
00:01:05,959 --> 00:01:10,679
Now up to this point, we haven't said why we need to keep information about activations

17
00:01:10,679 --> 00:01:11,920
at all.

18
00:01:11,920 --> 00:01:16,479
And the reason is that there is some state associated with each procedure activation that

19
00:01:16,479 --> 00:01:19,239
is needed in order to properly execute the procedure.

20
00:01:19,239 --> 00:01:21,039
And we have to track that somewhere.

21
00:01:21,039 --> 00:01:23,079
And that's what the activation record is going to be for.

22
00:01:23,079 --> 00:01:27,680
It's going to be to hold the information needed to properly execute the procedure.

23
00:01:27,920 --> 00:01:30,040
So let's look at that in a little bit more detail.

24
00:01:30,040 --> 00:01:35,600
Let's consider the situation where procedure F calls procedure G.

25
00:01:35,600 --> 00:01:36,920
And what is going to happen?

26
00:01:36,920 --> 00:01:41,120
So conceptually what happens when F calls G is that F is suspended.

27
00:01:41,120 --> 00:01:44,520
F is going to stop executing while G is running.

28
00:01:44,520 --> 00:01:49,440
So G is going to be using the processor and all the resources of the machine.

29
00:01:49,440 --> 00:01:52,480
But when G completes, we want to start executing F again.

30
00:01:52,480 --> 00:01:54,000
F is going to resume.

31
00:01:54,000 --> 00:01:59,920
And so in between while G is running, we have to save the state of the procedure activation

32
00:01:59,920 --> 00:02:03,319
of F somewhere so that we can resume it properly.

33
00:02:03,319 --> 00:02:06,519
And that's again what the activation record is for.

34
00:02:06,519 --> 00:02:13,360
And so G's activation record is going to have to have information in it that will help

35
00:02:13,360 --> 00:02:15,360
us to complete the execution of G.

36
00:02:15,360 --> 00:02:19,639
So there will be some information about G that we just need in order to run G.

37
00:02:19,639 --> 00:02:24,559
But also G's activation record is going to have to store whatever we need to be able

38
00:02:24,559 --> 00:02:27,399
to resume the execution of procedure F.

39
00:02:29,879 --> 00:02:31,759
So let's work through an example.

40
00:02:31,759 --> 00:02:36,159
Here's one of the programs that we looked at in the last video.

41
00:02:36,159 --> 00:02:41,959
And here is a design for a concrete activation record for the procedure F.

42
00:02:41,959 --> 00:02:44,959
So we'll have one position for the result of F.

43
00:02:44,959 --> 00:02:49,560
That will hold the return value after we've finished execution of F.

44
00:02:49,560 --> 00:02:52,599
So there will be a position here for the argument to F.

45
00:02:52,599 --> 00:02:54,400
So F only takes one parameter.

46
00:02:54,400 --> 00:02:59,879
So I only need one word here to hold the argument to the function.

47
00:02:59,879 --> 00:03:04,560
There will be a control link, so a pointer to the previous or the caller's activation.

48
00:03:04,560 --> 00:03:08,319
And we'll also have a slot for the return address.

49
00:03:08,319 --> 00:03:13,520
So the address in memory or the address of the instruction that we are supposed to jump

50
00:03:13,520 --> 00:03:17,480
to after the execution of F completes.

51
00:03:17,479 --> 00:03:26,039
So now let's just execute this program by hand and work out what the activation records

52
00:03:26,039 --> 00:03:27,959
will look like on the stack.

53
00:03:27,959 --> 00:03:32,959
So when the program is first invoked, it will call main.

54
00:03:32,959 --> 00:03:36,000
There will be an activation record for main.

55
00:03:36,000 --> 00:03:38,759
Okay, but we're not going to worry about that.

56
00:03:38,759 --> 00:03:39,959
We're just going to focus on F.

57
00:03:39,959 --> 00:03:45,000
So there's some stuff for main, but we're not going to talk about that.

58
00:03:45,000 --> 00:03:48,240
And then main is going to call F.

59
00:03:48,240 --> 00:03:54,080
All right, and so when main calls F, an activation record will be pushed onto the stack.

60
00:03:54,080 --> 00:04:01,360
We'll have four slots or four fields for values.

61
00:04:01,360 --> 00:04:04,080
And what will go in those while the first slot is for the result?

62
00:04:04,080 --> 00:04:05,879
Well, it's just starting to run.

63
00:04:05,879 --> 00:04:07,120
F is just beginning execution.

64
00:04:07,120 --> 00:04:09,599
So there's nothing to put there at the moment.

65
00:04:09,599 --> 00:04:12,319
That gets filled in when F returns.

66
00:04:12,319 --> 00:04:15,639
The second position will hold the argument to F.

67
00:04:15,639 --> 00:04:18,399
So that'll be the number three.

68
00:04:18,399 --> 00:04:21,839
The third slot will hold the control links.

69
00:04:21,839 --> 00:04:26,079
That's going to point back to the activation for main.

70
00:04:26,079 --> 00:04:29,000
And the fourth position will hold the return address.

71
00:04:29,000 --> 00:04:34,480
And this is actually not completely trivial because F is called in multiple places.

72
00:04:34,480 --> 00:04:38,000
So if you look at the program, there's a call to F in main.

73
00:04:38,000 --> 00:04:42,639
And there's a call to F inside of F itself.

74
00:04:42,639 --> 00:04:46,639
And so depending on where the function is called from,

75
00:04:46,639 --> 00:04:50,319
after that function completes, we want to return to a different address.

76
00:04:50,319 --> 00:04:55,360
In the case of main, when this called F completes, we want to return to the,

77
00:04:55,360 --> 00:04:58,160
whatever instruction comes after the call to F,

78
00:04:58,160 --> 00:05:01,399
which is just going to be something that wraps up the execution of the program.

79
00:05:01,399 --> 00:05:05,600
Since it's the exit point of main, inside of F,

80
00:05:05,600 --> 00:05:08,760
it's going to be the conclusion of the conditional.

81
00:05:08,760 --> 00:05:11,640
So this point double star here is going to be,

82
00:05:11,640 --> 00:05:15,200
you know, whatever is left of the conditional and then the return for math.

83
00:05:15,200 --> 00:05:20,640
So depending on where F is called from, we want to return to one of two different places.

84
00:05:20,640 --> 00:05:24,960
Okay. So in this case, F is being called from main.

85
00:05:24,960 --> 00:05:32,439
And so we'll put the single star address in that position of the activation record.

86
00:05:32,439 --> 00:05:33,200
All right.

87
00:05:33,199 --> 00:05:35,800
So then F is called second time.

88
00:05:35,800 --> 00:05:40,399
The body of F executes the argument three is not zero.

89
00:05:40,399 --> 00:05:42,439
And so we wind up calling F again.

90
00:05:42,439 --> 00:05:47,319
What that means is another activation record will be pushed under the stack.

91
00:05:47,319 --> 00:05:49,360
This will also have four slots.

92
00:05:49,360 --> 00:05:51,959
It's an activation record for F. I should label these.

93
00:05:51,959 --> 00:05:53,919
So that's an activation of F.

94
00:05:53,919 --> 00:05:57,399
This is also an activation of F.

95
00:05:57,399 --> 00:06:03,079
And what goes in this one, well, again, the result doesn't have anything initially in it.

96
00:06:03,079 --> 00:06:05,879
And the argument in this case would be two.

97
00:06:05,879 --> 00:06:10,719
The control link in this case will point back to the previous activation of F.

98
00:06:10,719 --> 00:06:14,839
And the return address in this case will be the point double star.

99
00:06:14,839 --> 00:06:15,839
All right.

100
00:06:15,839 --> 00:06:22,399
So after two calls to F, this is what the stack will look like with this particular activation

101
00:06:22,399 --> 00:06:25,680
record design.

102
00:06:25,680 --> 00:06:28,919
So here's the same picture just drawn a bit more neatly.

103
00:06:28,920 --> 00:06:33,680
There's one additional thing I'd like to point out, which is at this stack of activation

104
00:06:33,680 --> 00:06:34,680
records.

105
00:06:34,680 --> 00:06:41,840
And let me delineate the activation records here is not as abstract as the kinds of stacks

106
00:06:41,840 --> 00:06:47,200
you were probably taught about in a data structures class if you've had such a class.

107
00:06:47,200 --> 00:06:51,560
So here there are distinct activation records on the stack and we treat them as such and

108
00:06:51,560 --> 00:06:53,800
the runtime system will treat them as such.

109
00:06:53,800 --> 00:06:56,160
But this is also like one gigantic array.

110
00:06:56,160 --> 00:06:59,760
All of this data is just laid out in continuous memory.

111
00:06:59,760 --> 00:07:02,240
These are all contiguous addresses.

112
00:07:02,240 --> 00:07:09,160
And one is activation record here just follows on to the next address immediately after the

113
00:07:09,160 --> 00:07:11,440
previous activation record.

114
00:07:11,440 --> 00:07:18,720
And compiler writers will often play tricks to exploit the fact that these activations are

115
00:07:18,720 --> 00:07:20,360
adjacent to each other in memory.

116
00:07:20,360 --> 00:07:27,080
And we'll see one such potential trick in just a moment.

117
00:07:27,080 --> 00:07:32,439
To summarize some of the highlights of this example so far, I want to repeat that main is

118
00:07:32,439 --> 00:07:33,439
not very interesting.

119
00:07:33,439 --> 00:07:37,639
So it has no arguments or local variables and as result is never used.

120
00:07:37,639 --> 00:07:41,879
And so while it does have an activation record, we're just not focusing on that and we're

121
00:07:41,879 --> 00:07:45,600
not concerning ourselves with what goes in that activation record.

122
00:07:45,600 --> 00:07:49,680
We're just focusing on the activation record for F.

123
00:07:50,680 --> 00:07:56,240
Just to be sure this is clear, the star and double star that I use in the example, these

124
00:07:56,240 --> 00:07:57,600
are addresses in memory.

125
00:07:57,600 --> 00:08:01,840
These are actual memory addresses and they refer to addresses of code.

126
00:08:01,840 --> 00:08:07,879
Those are the addresses of the instructions that come after the call to F, it's as a place

127
00:08:07,879 --> 00:08:10,960
where F would return to.

128
00:08:10,960 --> 00:08:17,040
And finally, I want to stress that this really is only one of many possible activation record

129
00:08:17,040 --> 00:08:18,040
designs.

130
00:08:18,040 --> 00:08:24,439
A different activation record for F that had different information in it that would work

131
00:08:24,439 --> 00:08:28,520
just fine depending on the structure of the rest of the code generator and the runtime

132
00:08:28,520 --> 00:08:29,720
system.

133
00:08:29,720 --> 00:08:35,519
So in particular, many compilers don't use a control link because they don't need an

134
00:08:35,519 --> 00:08:41,560
explicit link to be able to find the calling, the activation record of the calling procedure.

135
00:08:41,560 --> 00:08:47,800
And in fact, in your class project, the cool compiler, you won't be using a control link.

136
00:08:48,359 --> 00:08:54,399
Most activation records won't have the return value in the activation record because it

137
00:08:54,399 --> 00:08:58,279
would be more efficient and convenient to return it to in a register.

138
00:08:58,279 --> 00:09:04,879
All right, so this is just one possible design and you could design other activation records

139
00:09:04,879 --> 00:09:06,039
that would work just fine.

140
00:09:06,039 --> 00:09:11,000
The important point about an activation record is that it just has to have sufficient information

141
00:09:11,000 --> 00:09:19,480
in it to enable the generated code to properly execute the procedure that's being called

142
00:09:19,480 --> 00:09:25,320
and also to resume execution of the calling procedure.

143
00:09:25,320 --> 00:09:28,679
So far, we've only looked at the procedure call for this activation record.

144
00:09:28,679 --> 00:09:33,759
We haven't talked about what happens when activations return.

145
00:09:33,759 --> 00:09:38,720
So let's consider what happens in our example after the second call to F that's this one,

146
00:09:38,720 --> 00:09:41,120
this activation down here returns.

147
00:09:41,120 --> 00:09:45,440
So what's going to happen is we're going to make the caller, the current activation,

148
00:09:45,440 --> 00:09:47,320
so it will actually become the top of the stack.

149
00:09:47,320 --> 00:09:53,759
So I've got this big, fat green arrow here to indicate that this is now the current activation,

150
00:09:53,759 --> 00:09:56,000
this one up here.

151
00:09:56,000 --> 00:09:58,200
Okay, so this is the call.

152
00:09:58,200 --> 00:10:03,120
This is the, what was the caller and it's not going to resume executing.

153
00:10:03,120 --> 00:10:08,680
And the interesting thing here is to note that like I said before, this isn't as abstract

154
00:10:08,719 --> 00:10:11,399
as a stack in a data structures course.

155
00:10:11,399 --> 00:10:17,719
So while we have restored this as the active procedure, this data down here, this activation

156
00:10:17,719 --> 00:10:20,839
that was running is still there in memory.

157
00:10:20,839 --> 00:10:24,279
And in fact, we can go and look at it if we want to.

158
00:10:24,279 --> 00:10:30,239
And the way I set this example up, in fact, we need to because the result of the procedure

159
00:10:30,239 --> 00:10:36,839
that we called is now stored here in the first word of this activation.

160
00:10:36,840 --> 00:10:44,160
All right, so when F begins executing again, it's going to have to look up that result

161
00:10:44,160 --> 00:10:48,639
in order to know what the result was of the procedure that was called.

162
00:10:48,639 --> 00:10:52,399
So the advantage of placing the return value in the first position in the frame is that

163
00:10:52,399 --> 00:10:55,879
the caller can find it at a fixed offset from its own frame.

164
00:10:55,879 --> 00:10:57,960
Let's back up and just see that.

165
00:10:57,960 --> 00:11:06,480
So here when the second call to F has returned and the first call here has resumed executing,

166
00:11:07,480 --> 00:11:13,600
this call, the code for this call, will know that the size of this activation record is 4.

167
00:11:13,600 --> 00:11:16,840
And there are four words in this activation record.

168
00:11:16,840 --> 00:11:22,519
And so it can find the result of the procedure that it called in the 4 plus 1 position.

169
00:11:22,519 --> 00:11:25,279
And five words passed the top of the frame.

170
00:11:25,279 --> 00:11:29,080
So in particular, it will be able to find this word in memory.

171
00:11:29,080 --> 00:11:32,639
And even though this has been popped off the stack, as I said before, that data is still there,

172
00:11:32,639 --> 00:11:35,159
at least until another procedure is called.

173
00:11:35,439 --> 00:11:41,240
And so if we immediately read the result of the function call after we return from the function,

174
00:11:41,240 --> 00:11:47,120
we'll be able to pick up that result and then use it in the continuation of the execution of the calling procedure.

175
00:11:50,319 --> 00:11:53,439
And once again, I just want to stress, I know I've said this a couple of times,

176
00:11:53,439 --> 00:11:57,360
but it's very important that there's absolutely nothing magic about this organization.

177
00:11:57,360 --> 00:12:00,360
We could rearrange the order of the elements in the frame.

178
00:12:00,360 --> 00:12:04,240
We could divide the responsibility between the caller and colleague differently.

179
00:12:04,240 --> 00:12:08,279
And really, the only metric here is that one organization is better than another

180
00:12:08,279 --> 00:12:12,000
if it results in faster code or in a simpler code generator.

181
00:12:14,000 --> 00:12:17,240
And I know I also mentioned this before, but it's also an important point.

182
00:12:17,240 --> 00:12:22,519
In a production compiler, we would put as much of the frame contents as possible in registers.

183
00:12:22,519 --> 00:12:26,200
And in particular, there'd be a special effort to pass the method result

184
00:12:26,200 --> 00:12:30,080
and the method arguments in registers because those are accessed so frequently.

185
00:12:31,080 --> 00:12:36,080
Finally, to sum up our discussion of activations and activation records.

186
00:12:36,080 --> 00:12:40,080
The issue is that the compiler has to determine at compile time,

187
00:12:40,080 --> 00:12:44,080
so this happens statically, the layout of the activation record

188
00:12:44,080 --> 00:12:50,080
and also has to generate code that correctly accesses the locations in that activation record.

189
00:12:50,080 --> 00:12:55,080
And what does this mean? This means that the activation record layout and the code generator

190
00:12:55,080 --> 00:12:57,080
have to be designed together.

191
00:12:58,080 --> 00:13:01,080
So you can't just design your code generator and then figure out later

192
00:13:01,080 --> 00:13:03,080
what your activation record layout is going to be.

193
00:13:03,080 --> 00:13:06,080
Or vice versa. These two things need to be designed together

194
00:13:06,080 --> 00:13:09,080
because they depend on each other.

