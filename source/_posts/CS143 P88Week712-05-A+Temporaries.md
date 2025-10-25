---
title: CS143 P88Week712 05 A+Temporaries
---

1
00:00:00,000 --> 00:00:08,240
In the last couple of videos, we've talked about code generation for a simple programming

2
00:00:08,240 --> 00:00:09,400
language.

3
00:00:09,400 --> 00:00:14,640
And I mentioned at the end of the last video that realistic compilers do things a bit differently.

4
00:00:14,640 --> 00:00:20,000
And in particular, they do a better job of keeping values and registers and of managing the

5
00:00:20,000 --> 00:00:22,679
temporaries that have to be stored in the activation record.

6
00:00:22,679 --> 00:00:25,960
We're actually going to talk about both of those problems.

7
00:00:25,960 --> 00:00:29,480
In this particular video, we're only going to talk about the second one.

8
00:00:29,480 --> 00:00:38,240
And so we're going to be covering a better ways for compilers to manage temporary values.

9
00:00:38,240 --> 00:00:43,600
So the basic idea, which we've already seen, is to keep temporaries in the activation record.

10
00:00:43,600 --> 00:00:49,359
Now this is not as efficient as keeping temporaries in registers, but that's the subject of a

11
00:00:49,359 --> 00:00:50,359
future video.

12
00:00:50,359 --> 00:00:52,480
We're not going to talk about that today.

13
00:00:52,479 --> 00:00:56,399
But we're going to talk about as improving the way in which we manage temporaries that

14
00:00:56,399 --> 00:00:59,199
happen to be in the activation record for whatever reason.

15
00:00:59,199 --> 00:01:02,799
So why doesn't matter why we want them to be in the activation record, but given that

16
00:01:02,799 --> 00:01:06,479
they're there, what's the most efficient code that we can generate.

17
00:01:06,479 --> 00:01:10,920
And the improvement that we're going to make is to have the code generator assign a fixed

18
00:01:10,920 --> 00:01:15,759
location in the activation record for each temporary.

19
00:01:15,759 --> 00:01:21,120
So we're going to pre-allocate memory or spot in the activation record for each temporary.

20
00:01:21,120 --> 00:01:26,800
And then we will be able to save and restore the temporary without having to do the stack

21
00:01:26,800 --> 00:01:30,600
pointer manipulations.

22
00:01:30,600 --> 00:01:34,640
So let's take a look at the canonical program for our simple programming language.

23
00:01:34,640 --> 00:01:40,439
Here is the Fibonacci function again, and let me change colors to something that has more

24
00:01:40,439 --> 00:01:41,439
contrast.

25
00:01:41,439 --> 00:01:46,920
And let's think about how many temporaries we need to evaluate this function.

26
00:01:46,920 --> 00:01:51,560
So this function body, when it executes, will need a certain number of temporaries.

27
00:01:51,560 --> 00:01:56,760
And if we know how many temporaries it needs in advance, then we could allocate the space

28
00:01:56,760 --> 00:02:01,799
for those in the activation record rather than having to do pushing and popping from the

29
00:02:01,799 --> 00:02:04,480
stack at runtime.

30
00:02:04,480 --> 00:02:05,480
So let's take a look.

31
00:02:05,480 --> 00:02:10,560
And if that else is going to evolve a temporary because in order to do this predicate comparison

32
00:02:10,560 --> 00:02:14,840
here, we're going to have to evaluate the first argument to the predicate and then save

33
00:02:14,840 --> 00:02:19,360
the result of that while we evaluate the second argument to the predicate.

34
00:02:19,360 --> 00:02:21,360
So this will involve one temporary.

35
00:02:21,360 --> 00:02:23,800
We'll need one temporary for that predicate.

36
00:02:23,800 --> 00:02:28,400
Similarly for this predicate to evaluate it since it's a two argument operation in comparison,

37
00:02:28,400 --> 00:02:32,080
we will also need one temporary for that.

38
00:02:32,080 --> 00:02:36,000
And then there's this expression over here which is kind of complicated.

39
00:02:36,000 --> 00:02:38,039
How many temporaries will we need for this?

40
00:02:38,039 --> 00:02:39,480
Well, remember how this works.

41
00:02:39,479 --> 00:02:44,879
So we evaluate the first expression and then we save the result of that.

42
00:02:44,879 --> 00:02:48,560
So this will require one temporary for the result of the called fib.

43
00:02:48,560 --> 00:02:51,599
It has to be saved while we evaluate the plus.

44
00:02:51,599 --> 00:02:57,439
And now while we're evaluating the call to fib though, actually before we evaluate the

45
00:02:57,439 --> 00:03:01,759
call to fib, we have to evaluate the argument to fib and that involves the subtraction.

46
00:03:01,759 --> 00:03:05,079
So we also need one temporary here for this subtraction.

47
00:03:05,079 --> 00:03:06,079
Okay.

48
00:03:06,920 --> 00:03:12,960
And now what about the second side of this addition here?

49
00:03:12,960 --> 00:03:17,400
Well, this also involves a subtraction.

50
00:03:17,400 --> 00:03:18,400
Okay.

51
00:03:18,400 --> 00:03:25,680
So we have to have one temporary here to hold on to the value of x while we're evaluating

52
00:03:25,680 --> 00:03:30,080
the minus to compute the value of the argument before we call fib.

53
00:03:30,080 --> 00:03:30,880
Okay.

54
00:03:30,880 --> 00:03:34,320
So how many temporaries do we need in total?

55
00:03:34,319 --> 00:03:36,719
Well, we need one here for the predicate.

56
00:03:36,719 --> 00:03:42,000
But notice that once the predicate is decided, once we know the answer to whether this predicate

57
00:03:42,000 --> 00:03:44,359
is true or false, we don't need that temporary anymore.

58
00:03:44,359 --> 00:03:48,400
So in fact, that temporary can be reclaimed.

59
00:03:48,400 --> 00:03:53,240
We don't need the space for that temporary anymore by the time we get to the false branch.

60
00:03:53,240 --> 00:03:56,959
And again, once this predicate is evaluated, we don't need the space for that temporary

61
00:03:56,959 --> 00:03:57,959
anymore.

62
00:03:57,959 --> 00:03:58,959
Okay.

63
00:03:58,959 --> 00:04:01,240
So now we're down to the plus.

64
00:04:01,240 --> 00:04:05,719
The first thing that happens is we evaluate the argument to this first call to fib.

65
00:04:05,719 --> 00:04:09,200
Once as evaluated, we don't need the temporary for it anymore.

66
00:04:09,200 --> 00:04:13,600
Now the result of fib has to be saved somewhere while we do the plus.

67
00:04:13,600 --> 00:04:14,600
Okay.

68
00:04:14,600 --> 00:04:18,480
And then we're going to have to evaluate the argument to the second call to fib.

69
00:04:18,480 --> 00:04:23,319
And I'm noticing that this happens while we still need this temporary here.

70
00:04:23,319 --> 00:04:27,920
So in fact, we need both of these temporaries at the same time.

71
00:04:27,920 --> 00:04:28,920
Okay.

72
00:04:28,920 --> 00:04:32,680
Before evaluating this argument to the second call of fib, we still need to be holding on

73
00:04:32,680 --> 00:04:35,240
to the first argument to the plus.

74
00:04:35,240 --> 00:04:40,680
And so in fact, this particular function can be evaluated with just two temporaries.

75
00:04:40,680 --> 00:04:50,280
It's all the space we need to compute the value of this function body.

76
00:04:50,280 --> 00:04:56,040
So in general, we can define a function, nt of e, that computes a number of temporaries

77
00:04:56,040 --> 00:04:57,480
needed to evaluate e.

78
00:04:57,480 --> 00:04:59,720
And let's just talk about one example.

79
00:04:59,720 --> 00:05:04,920
Let's look at the number of temporaries needed to evaluate e1 plus e2.

80
00:05:04,920 --> 00:05:07,800
So that's going to need at least as many temporaries as e1.

81
00:05:07,800 --> 00:05:12,560
Okay. So if we need some number of temporaries k to evaluate e1, we'll have to have at least

82
00:05:12,560 --> 00:05:15,600
k temporaries to evaluate the whole expression.

83
00:05:15,600 --> 00:05:21,040
And then it'll also need at least as many temporaries as needed to evaluate e2 plus 1.

84
00:05:21,040 --> 00:05:24,920
Because we have to hold on to the value of e2 while we're evaluating.

85
00:05:24,920 --> 00:05:29,480
So we have to hold on to the value of e1 while we're evaluating e2.

86
00:05:29,480 --> 00:05:34,280
Okay. And it's going to be the maximum over these two.

87
00:05:34,280 --> 00:05:39,080
So it'll be the maximum number between the maximum number of temporaries needed to evaluate

88
00:05:39,080 --> 00:05:42,759
e1 and 1 plus the number of temporaries to evaluate e2.

89
00:05:42,759 --> 00:05:46,520
That'll be the total number of temporaries, the minimum number of temporaries needed

90
00:05:46,520 --> 00:05:49,240
to evaluate e1 plus e2.

91
00:05:49,240 --> 00:05:55,680
And the reason it's a max instead of a sum is that once we've evaluated e1, we don't

92
00:05:55,680 --> 00:06:00,960
need any of the space that was used to evaluate e1 anymore.

93
00:06:00,960 --> 00:06:01,960
All those temporaries are done.

94
00:06:01,960 --> 00:06:03,240
All we need is the answer.

95
00:06:03,240 --> 00:06:04,800
We don't need the intermediate results.

96
00:06:04,800 --> 00:06:10,920
And that means that the temporaries that were used to evaluate e1 can be reused to evaluate

97
00:06:10,920 --> 00:06:14,560
e2.

98
00:06:14,560 --> 00:06:19,879
So generalizing from that one example, here's a system of equations that describes the

99
00:06:19,879 --> 00:06:25,800
number of temporaries needed to evaluate every kind of expression in our little language.

100
00:06:25,800 --> 00:06:27,160
So let's take a look.

101
00:06:27,160 --> 00:06:29,720
So we already talked about e1 plus e2.

102
00:06:29,720 --> 00:06:34,000
It's just the max of over the number of temporaries to evaluate e1 and 1 plus the number

103
00:06:34,000 --> 00:06:36,360
of temporaries to evaluate e2.

104
00:06:36,360 --> 00:06:39,000
So e1 minus e2 is exactly the same thing.

105
00:06:39,000 --> 00:06:40,000
It has the same structure.

106
00:06:40,000 --> 00:06:41,959
It's a different computational operation.

107
00:06:41,959 --> 00:06:46,759
But it's a binary operation and we have to save the value of e1 while we evaluate e2.

108
00:06:46,759 --> 00:06:50,000
So it's the same formula.

109
00:06:50,000 --> 00:06:54,039
Now for an if-then-else, well, what do we need?

110
00:06:54,039 --> 00:06:58,079
We need one, I'm sorry, we need, it's going to be a max again.

111
00:06:58,079 --> 00:07:03,959
It's going to be a max over some number of different quantities.

112
00:07:03,959 --> 00:07:05,439
How many temporaries might we need?

113
00:07:05,439 --> 00:07:09,879
Well, we might need as many temporaries as are needed to evaluate e1.

114
00:07:09,879 --> 00:07:12,120
We certainly need at least that many.

115
00:07:12,120 --> 00:07:16,360
So if e1 takes a certain number of temporaries, the whole if-then-else is going to require at

116
00:07:16,360 --> 00:07:18,199
least that many temporaries.

117
00:07:18,199 --> 00:07:23,199
Now of course, once e1 is done evaluating, we don't need its temporaries anymore.

118
00:07:23,199 --> 00:07:25,839
And then we can evaluate e2.

119
00:07:25,839 --> 00:07:29,399
And while we're evaluating e2, we have to hold on to the result of e1.

120
00:07:29,399 --> 00:07:32,120
So that's where the 1 plus comes from.

121
00:07:32,120 --> 00:07:36,639
So while we're evaluating e2, we need 1 plus the number of temporaries to evaluate e2

122
00:07:36,639 --> 00:07:39,759
to hold all the temporaries of the computation.

123
00:07:39,759 --> 00:07:42,680
And then once the predicate is done, we don't need any of those temporaries anymore at

124
00:07:42,680 --> 00:07:43,680
all.

125
00:07:43,680 --> 00:07:46,240
And we're going to evaluate either e3 or e4.

126
00:07:46,240 --> 00:07:50,800
And so then we just need however many temporaries each of those requires.

127
00:07:50,800 --> 00:07:55,240
And whatever the max mids over these four quantities, that's the minimum number of temporaries

128
00:07:55,240 --> 00:07:59,879
we can get away with to evaluate the entire if-then-else.

129
00:07:59,879 --> 00:08:03,079
Let's take a look at a function call.

130
00:08:03,079 --> 00:08:08,920
So the space needed for a function call is the number of temporaries to the max over

131
00:08:08,920 --> 00:08:13,560
the number of temporaries to evaluate any one of the arguments.

132
00:08:13,560 --> 00:08:20,360
And this is actually an interesting case because notice that we don't have anywhere in this

133
00:08:20,360 --> 00:08:24,400
formula space for the results of e1 through vn.

134
00:08:24,400 --> 00:08:29,080
Of course, once we've evaluated e1, then we need to save it somewhere.

135
00:08:29,080 --> 00:08:34,759
And so you would think that we might see some numbers in here representing the temporary

136
00:08:34,759 --> 00:08:39,279
space needed to hold on to the results of evaluating each of these expressions.

137
00:08:39,279 --> 00:08:43,840
And the reason we don't have that in here is that even though those values are saved,

138
00:08:43,840 --> 00:08:45,480
they are indeed saved.

139
00:08:45,480 --> 00:08:48,159
They're not saved in the current activation record.

140
00:08:48,159 --> 00:08:54,720
The space for the result of e1 and the result of all any of the arguments, eI up to eN,

141
00:08:54,720 --> 00:08:59,080
is saved in the new activation record that we're building.

142
00:08:59,080 --> 00:09:04,419
And so the space for the results of e1 through eN, those values are stored in the new

143
00:09:04,419 --> 00:09:07,740
activation record, they're not stored in the current activation record.

144
00:09:07,740 --> 00:09:12,779
And we're trying to compute the number of temporaries needed to evaluate inside of the

145
00:09:12,779 --> 00:09:14,699
current activation.

146
00:09:14,699 --> 00:09:17,779
And then for an integer, that doesn't take any space at all, it doesn't require any

147
00:09:17,779 --> 00:09:18,779
temporaries I mean.

148
00:09:18,779 --> 00:09:21,539
So there's zero temporaries required for that.

149
00:09:21,539 --> 00:09:27,699
And also for a variable reference, those require no temporaries.

150
00:09:27,699 --> 00:09:32,620
So now let's go through our example and work out systematically using the equations,

151
00:09:32,620 --> 00:09:36,299
how many temporaries we will need.

152
00:09:36,299 --> 00:09:44,820
So here, for this if-then-else, remember, it was going to be the max over the number required

153
00:09:44,820 --> 00:09:47,899
to evaluate e1, well that's zero.

154
00:09:47,899 --> 00:09:53,580
One plus the number to evaluate e2, which is the second expression in the predicate.

155
00:09:53,580 --> 00:09:58,019
So that would be one, because the number one requires zero temporaries and the one and

156
00:09:58,019 --> 00:10:02,580
the, we have to have, we have one to hold on to x.

157
00:10:02,580 --> 00:10:04,180
And then the max over the branches.

158
00:10:04,180 --> 00:10:10,220
So to evaluate zero requires zero temporaries.

159
00:10:10,220 --> 00:10:13,900
And now we have to compute the number required here.

160
00:10:13,900 --> 00:10:19,980
Okay, so once again, to evaluate the first expression in this if-then-else requires zero

161
00:10:19,980 --> 00:10:21,460
temporaries.

162
00:10:21,460 --> 00:10:28,940
To evaluate the second one, we'll require one, one plus the number required, one plus zero.

163
00:10:28,940 --> 00:10:31,820
To evaluate that constant, we'll require zero temporaries.

164
00:10:31,820 --> 00:10:37,500
And now for the last expression, how many will this one require?

165
00:10:37,500 --> 00:10:45,620
Well, this is going to require zero for this guy, one for the second argument.

166
00:10:45,620 --> 00:10:49,860
So to evaluate fib is going to require one temporary.

167
00:10:49,860 --> 00:10:54,260
Okay, and then it's going to be one plus over here.

168
00:10:54,260 --> 00:10:58,300
We have to hold on to the result there.

169
00:10:58,299 --> 00:11:02,419
The value of x minus two, so what's that going to require?

170
00:11:02,419 --> 00:11:06,379
Well, that's going to require the max of zero and one plus zero.

171
00:11:06,379 --> 00:11:08,419
Okay, so this will be one.

172
00:11:08,419 --> 00:11:12,620
All right, so we have over here, we have one plus one is two.

173
00:11:12,620 --> 00:11:19,139
Okay, and now we're taking the max over two and one.

174
00:11:19,139 --> 00:11:20,139
So that's two.

175
00:11:20,139 --> 00:11:25,179
Okay, and this is the last expression in the outer if-then-else.

176
00:11:25,179 --> 00:11:28,500
So clearly this if-then-else here will require two temporaries.

177
00:11:28,500 --> 00:11:33,899
Okay, because the max over the number required for either part of the predicate, the then branch

178
00:11:33,899 --> 00:11:35,259
and the else branch.

179
00:11:35,259 --> 00:11:40,179
And now this whole expression requires two temporaries.

180
00:11:40,179 --> 00:11:43,739
And that'll be the max of the four components of the outer if-then-else.

181
00:11:43,739 --> 00:11:51,939
And so then for the entire expression, we get two temporaries.

182
00:11:51,940 --> 00:11:59,500
Once we've computed the number of temporaries required to evaluate a function body, we can

183
00:11:59,500 --> 00:12:02,060
add that much space to the activation record.

184
00:12:02,060 --> 00:12:08,100
So now our activation record is going to require two plus n plus nt of e elements.

185
00:12:08,100 --> 00:12:11,300
And so the two of course are for the return address and the frame pointer.

186
00:12:11,300 --> 00:12:13,780
The n is for the n arguments to the function.

187
00:12:13,780 --> 00:12:19,980
And then the rest of it is just the space required for the temporaries.

188
00:12:19,980 --> 00:12:23,420
Now we can talk about how we're going to lay out the activation record.

189
00:12:23,420 --> 00:12:25,100
We'll leave the first part of it the same.

190
00:12:25,100 --> 00:12:28,980
So everything up to the return address is laid out just before.

191
00:12:28,980 --> 00:12:35,060
First the callers frame pointer, then the n arguments in reverse order, and then the return

192
00:12:35,060 --> 00:12:36,899
address.

193
00:12:36,899 --> 00:12:43,820
And then after the return address, come the n locations or the nt of e, excuse me, locations

194
00:12:43,820 --> 00:12:44,820
for the temporaries.

