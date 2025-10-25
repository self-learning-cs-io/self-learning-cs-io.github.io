---
title: MIT6100 P15P15Recursion
---

1
00:00:00,000 --> 00:00:17,300
All right.

2
00:00:17,300 --> 00:00:21,219
So let's get started on today's lecture.

3
00:00:21,219 --> 00:00:26,500
So today we're going to be doing one of two lectures on the topic of recursion.

4
00:00:26,500 --> 00:00:28,899
And you may or may not have heard of recursion.

5
00:00:28,899 --> 00:00:36,100
It's a programming technique and a way to algorithmically solve problems.

6
00:00:36,100 --> 00:00:43,179
It's not something that's going to come easy because it's going to force our brain to think

7
00:00:43,179 --> 00:00:48,420
about problems that we've seen in a completely different way.

8
00:00:48,420 --> 00:00:53,659
So you don't have to use recursion if you don't want to, but there will be problems where

9
00:00:53,659 --> 00:00:59,619
the idea of recursion and applying or writing recursive code is going to come a lot more

10
00:00:59,619 --> 00:01:04,259
naturally than writing code that we have been so far.

11
00:01:04,259 --> 00:01:07,819
But I'm just warning you, it's going to take a little bit of kind of forgetting everything

12
00:01:07,819 --> 00:01:13,159
we've learned about loops and things like that to train our brain to think recursively

13
00:01:13,159 --> 00:01:15,340
for the next two lectures.

14
00:01:15,340 --> 00:01:19,340
To help you, we will have an interactive portion of today's lecture.

15
00:01:19,340 --> 00:01:24,780
So think about whether you want to come up on stage or whatever this is the front and

16
00:01:24,780 --> 00:01:27,980
be a part of the interaction.

17
00:01:27,980 --> 00:01:34,820
You'll be forever immortalized in the open course where, awesome, I love it, on the open

18
00:01:34,820 --> 00:01:38,780
course where it videos.

19
00:01:38,780 --> 00:01:41,020
All right.

20
00:01:41,020 --> 00:01:47,180
So let's think about iterative algorithms that we've seen so far.

21
00:01:47,180 --> 00:01:52,100
So iterative algorithm basically means we are writing code that has a loop within it,

22
00:01:52,100 --> 00:01:53,100
right?

23
00:01:53,100 --> 00:01:57,100
So either a for loop or a while loop, writing code with these for loops or while loops

24
00:01:57,100 --> 00:01:58,780
lead to iterative algorithms.

25
00:01:58,780 --> 00:02:05,620
So things that do some task, some for some repetition.

26
00:02:05,620 --> 00:02:11,980
So the idea of iterative algorithm is that there are some variables that capture the state

27
00:02:11,980 --> 00:02:13,379
of the computation.

28
00:02:13,379 --> 00:02:18,819
So each time through the loop, these variables will change their value, essentially capturing

29
00:02:18,819 --> 00:02:22,099
what the values are at each step in the loop.

30
00:02:22,099 --> 00:02:26,579
So when we're writing these iterative algorithms, we basically think about what is something

31
00:02:26,579 --> 00:02:30,539
that's changing each time through the loop, like we keep running some, like that's the

32
00:02:30,539 --> 00:02:32,859
easiest example, right?

33
00:02:32,859 --> 00:02:38,259
What is a variable that's changing each time through the loop, kind of like a counter that

34
00:02:38,259 --> 00:02:41,780
keeps track of how many times we've been through a loop?

35
00:02:41,780 --> 00:02:42,780
And do you stop?

36
00:02:42,780 --> 00:02:47,780
So for for loops, you stop after you've exhausted a sequence for while loops, you stopped when

37
00:02:47,780 --> 00:02:50,180
you have a condition that becomes false.

38
00:02:50,180 --> 00:02:54,420
And then at the end of the loop, you have some sort of result that you've been storing

39
00:02:54,420 --> 00:02:57,939
and accumulating or changing each time through the loop.

40
00:02:57,939 --> 00:03:02,500
So that's an iterative algorithm and we've been working with these a lot.

41
00:03:02,500 --> 00:03:08,780
So to show you, we're going to go through the next few slides showing you an iterative algorithm

42
00:03:08,780 --> 00:03:10,099
to do multiplication.

43
00:03:10,099 --> 00:03:16,859
It's going to be very, very simple, but we're also then after going to look at the same

44
00:03:16,859 --> 00:03:21,620
problem, which is doing multiplication, but in the context of recursion.

45
00:03:21,620 --> 00:03:26,019
And hopefully that gives you a sense for how we think about the exact same problem we're

46
00:03:26,019 --> 00:03:31,659
trying to solve, multiplying two numbers together in a completely different way.

47
00:03:31,659 --> 00:03:34,379
So this is not the function that I want to write with iteration.

48
00:03:34,379 --> 00:03:39,539
I don't want to create a function named molt and then return a star B, right?

49
00:03:39,539 --> 00:03:41,579
I don't want to use the built-in function.

50
00:03:41,579 --> 00:03:46,780
I want to assume that I don't know how to do a star, a multiplication.

51
00:03:46,780 --> 00:03:51,500
And so instead, what I'm going to do is I'm going to rely on, let's say I know how to

52
00:03:51,500 --> 00:03:52,899
do addition.

53
00:03:52,899 --> 00:03:59,659
I'm going to rely on the idea of addition to actually write my multiplication function.

54
00:03:59,659 --> 00:04:03,659
So let's think about how to make multiplication iterative.

55
00:04:03,659 --> 00:04:05,780
We can have a loop, right?

56
00:04:05,780 --> 00:04:10,500
That adds a to itself b times, right?

57
00:04:10,500 --> 00:04:13,500
That is the definition of multiplication.

58
00:04:13,500 --> 00:04:16,860
So let's write a function that does this using a for loop.

59
00:04:16,860 --> 00:04:19,540
Then we'll write it using a while loop.

60
00:04:19,540 --> 00:04:23,420
With a for loop, we're going to write this iterative algorithm.

61
00:04:23,420 --> 00:04:27,740
It's capturing the state of the computation, just like we said we should.

62
00:04:27,740 --> 00:04:33,540
So the for loop will iterate, will have my sort of range of values being from zero

63
00:04:33,540 --> 00:04:37,460
to B. So we're going to repeat this loop b times.

64
00:04:37,460 --> 00:04:41,980
The variable total is capturing my state of the computation, right?

65
00:04:41,980 --> 00:04:46,500
It's keeping track of what the total is at each step through my loop.

66
00:04:46,500 --> 00:04:50,100
At the end of the loop, I return the total.

67
00:04:50,100 --> 00:04:54,259
So very, very simple iterative function here.

68
00:04:54,259 --> 00:04:56,340
Now let's think about another iterative solution.

69
00:04:56,340 --> 00:05:03,500
Instead of keeping a loop variable b that goes from zero all the way up to b, or

70
00:05:03,500 --> 00:05:04,500
what was my loop variable?

71
00:05:04,500 --> 00:05:08,139
And I think, yeah, instead of keeping a loop variable and that goes from zero to b,

72
00:05:08,139 --> 00:05:09,620
let's work our way backward.

73
00:05:09,620 --> 00:05:12,180
And this time let's use a while loop just for fun.

74
00:05:12,180 --> 00:05:16,980
Let's say that I'm going to start at b and count down to zero.

75
00:05:16,980 --> 00:05:22,620
So again, repeating some task b times.

76
00:05:22,620 --> 00:05:27,459
So what I'm going to do is I'm going to have some counter that starts at b and

77
00:05:27,459 --> 00:05:30,019
decreases down to zero.

78
00:05:30,019 --> 00:05:32,939
Again, within my loop, I have to keep track of

79
00:05:32,939 --> 00:05:33,939
the result.

80
00:05:33,939 --> 00:05:38,579
So my total in the previous code is now being called result in this code.

81
00:05:38,579 --> 00:05:42,939
And so what I'm going to do is my iteration will start right at zero and

82
00:05:42,939 --> 00:05:47,259
then I'm going to keep adding a to itself b times.

83
00:05:47,259 --> 00:05:49,980
So the code looks like this.

84
00:05:49,980 --> 00:05:52,939
I've got my while loop this time instead of a for loop.

85
00:05:52,939 --> 00:05:59,819
I'm going to start out with knowing what b is and I'm going to decrease b by one each time through the loop.

86
00:05:59,819 --> 00:06:02,899
So here I've got b equals b minus 1.

87
00:06:02,899 --> 00:06:06,699
So that's capturing the state of the counter at each iteration.

88
00:06:06,699 --> 00:06:11,740
The result just like the total in the previous slide is capturing the state of my sum at

89
00:06:11,740 --> 00:06:13,540
each time through the iteration.

90
00:06:13,540 --> 00:06:15,659
And at the end, I return result.

91
00:06:15,659 --> 00:06:21,779
So hopefully, very simple, very review code here.

92
00:06:21,779 --> 00:06:27,060
But now let's look at the code in a recursive sense.

93
00:06:27,060 --> 00:06:29,659
So here, let's not look at the code yet.

94
00:06:29,660 --> 00:06:36,060
But let's think about, is there some thing that we're repeating over and over and over again?

95
00:06:36,060 --> 00:06:40,140
If we recognize it, we can think recursively.

96
00:06:40,140 --> 00:06:43,780
So let's try to figure out this recursive pattern.

97
00:06:43,780 --> 00:06:47,500
So I work best with example, like actual numbers.

98
00:06:47,500 --> 00:06:54,740
So instead of using an abstract a and b, let's use a as five and b as four as an example.

99
00:06:54,740 --> 00:06:59,819
So let's say I want to use the star operator, that's basically the function I'm trying to implement,

100
00:06:59,819 --> 00:07:03,860
the star operator between five and four.

101
00:07:03,860 --> 00:07:10,220
So in the iterative sense, we said that's five plus five plus five plus five, adding five four times.

102
00:07:10,220 --> 00:07:15,500
The idea of recursion is that we're trying to take our original problem, which is using

103
00:07:15,500 --> 00:07:23,819
the star operator between two numbers and try to solve a very similar problem, if not the

104
00:07:23,819 --> 00:07:28,139
same, but in a slightly changed way.

105
00:07:28,139 --> 00:07:36,379
So instead of saying I'm going to multiply five by four, what I will do is recognize that five times four,

106
00:07:36,379 --> 00:07:44,300
which is my original problem, can be rewritten by extracting out one of my fives.

107
00:07:44,300 --> 00:07:51,180
So I'm going to take a five out and add it to five times three.

108
00:07:51,180 --> 00:07:53,459
So this is my recursive pattern.

109
00:07:53,459 --> 00:08:00,019
I'm using the star operator between five and some number, but if I extract a five out,

110
00:08:00,019 --> 00:08:09,740
I can use the star operator between five and a slightly smaller number, one less than four.

111
00:08:09,740 --> 00:08:13,099
Well, what if I do the, what about five times three?

112
00:08:13,099 --> 00:08:16,019
Can I do the same thing again?

113
00:08:16,019 --> 00:08:17,219
I can, right?

114
00:08:17,219 --> 00:08:21,740
For five times three, I can again notice that I can extract the five out again,

115
00:08:21,740 --> 00:08:25,420
and I have five plus five times two.

116
00:08:25,420 --> 00:08:31,379
And then I can do the same thing again to figure out what five times two is, I can again extract a five out

117
00:08:31,379 --> 00:08:36,220
and be left with five times one or five star one, right?

118
00:08:36,220 --> 00:08:41,299
And so notice the thing inside the box is, is basically me solving my original problem,

119
00:08:41,299 --> 00:08:48,779
which is using the star operator between five and some number, but that number is changing each time,

120
00:08:48,779 --> 00:08:51,139
you know, on each line.

121
00:08:51,139 --> 00:08:55,460
At some point, I can say this problem is so easy that I know the answer.

122
00:08:55,460 --> 00:09:00,699
So five star one, so a number multiplied with one, is just the number itself.

123
00:09:00,699 --> 00:09:06,899
And so at that point, I can say I don't need to continue dividing my problem into smaller and smaller pieces.

124
00:09:06,899 --> 00:09:13,100
So just to bring the point home, let's use parentheses to illustrate sort of which pieces I'm replacing where.

125
00:09:13,100 --> 00:09:17,620
So I've got my original problem, five, applying the star operator,

126
00:09:17,620 --> 00:09:20,220
the multiplication on five and four.

127
00:09:20,220 --> 00:09:27,820
I extract the five out, and I recognize that I can have five plus and solving five star three.

128
00:09:27,820 --> 00:09:32,779
I need to have some trust here, right?

129
00:09:32,779 --> 00:09:38,299
I don't know what five star three is, but if I decompose that problem in the exact same way,

130
00:09:38,299 --> 00:09:43,460
I can extract the five out of that, right?

131
00:09:43,460 --> 00:09:46,500
And add it to five star two.

132
00:09:46,500 --> 00:09:49,539
Right? So the thing in the box is our equivalent.

133
00:09:49,539 --> 00:09:54,299
And then again, five star two, I'm going to recognize this is the same problem I've been trying to solve.

134
00:09:54,299 --> 00:10:04,299
Let's apply the same solution, which is to extract a five out and add it to the multiplication of five star one less.

135
00:10:04,299 --> 00:10:07,179
So again, the two boxes are equivalent.

136
00:10:07,179 --> 00:10:13,419
So this idea here where we're recognizing the same problem and kind of dividing it, dividing it,

137
00:10:13,419 --> 00:10:25,019
having this trust that at some point we're going to divide it so much that we've reached a fundamental fact that we can solve is this divide step.

138
00:10:25,019 --> 00:10:30,979
So we're going to divide it all the way down here where I've got five plus five star one.

139
00:10:30,979 --> 00:10:36,139
At this point, I can say, well, five star one is going to be five.

140
00:10:36,139 --> 00:10:39,059
This is a basic fact that I can just solve.

141
00:10:39,059 --> 00:10:42,980
I don't need to divide this problem any further.

142
00:10:42,980 --> 00:10:47,539
So once I solve this fact, I can start building back up my answer, right?

143
00:10:47,539 --> 00:10:55,820
And I can start passing the answer back up the chain of multiplication calls, right?

144
00:10:55,820 --> 00:11:01,379
So if I'm at this step here and I figured out that this is five star one, this five star one is equal to five,

145
00:11:01,379 --> 00:11:04,259
I can just replace it with the five.

146
00:11:04,259 --> 00:11:11,620
And then I can build up the solution to this five star two because now five star two is just five plus five.

147
00:11:13,980 --> 00:11:16,899
So this is going to be 10, right?

148
00:11:16,899 --> 00:11:18,500
It's just simple addition, right?

149
00:11:18,500 --> 00:11:23,100
There's no more multiplication, which is the thing that we were trying to avoid.

150
00:11:23,100 --> 00:11:30,860
So then the five star two gets replaced with 10 and I'm still building back up my solution until I get to the five star four.

151
00:11:30,860 --> 00:11:38,580
So I was trying to figure out what five star three is, but before I could do that, I had to solve the rest of the two lines beneath it.

152
00:11:38,580 --> 00:11:40,019
But now I can finally solve it.

153
00:11:40,019 --> 00:11:42,100
It's just five plus 10.

154
00:11:42,100 --> 00:11:44,860
Right? That's the similar problem I was trying to solve.

155
00:11:44,860 --> 00:11:48,620
So I can replace the five star three with 15.

156
00:11:48,620 --> 00:12:00,820
And finally, my original problem was trying to figure out five star four and now I can finally solve it because I finally built back up my solution as five plus 15.

157
00:12:00,820 --> 00:12:05,700
Any questions about these steps should be pretty straightforward.

158
00:12:05,700 --> 00:12:11,980
I know it's a weird roundabout way of figuring out what the answer is, but what I'm trying to get at is trying to recognize

159
00:12:11,980 --> 00:12:18,740
the problem that we're trying to solve and then solving a very similar problem just slightly changed.

160
00:12:18,740 --> 00:12:24,940
In this case, we're multiplying five star one less than what we were just trying to figure out.

161
00:12:24,940 --> 00:12:36,580
So in terms of the recursion for this particular problem, multiplying A with B, we recognize that A star B is going to be A plus A plus A plus A plus A plus B times.

162
00:12:36,580 --> 00:12:48,980
If we extract an A out just like when we extracted the five out and added it to something else, we'll recognize that that's just A plus A plus A plus A plus A plus A plus A plus A plus A B minus one times.

163
00:12:48,980 --> 00:12:50,500
Right?

164
00:12:50,500 --> 00:12:51,860
Okay?

165
00:12:51,860 --> 00:13:01,740
Well, that A plus A plus A plus A B minus one times is just our original problem, just multiplying A with B minus one.

166
00:13:01,740 --> 00:13:04,419
So this is my recursive step.

167
00:13:04,419 --> 00:13:09,220
We recognize that A star B is equal to A plus A star B minus one.

168
00:13:09,220 --> 00:13:18,460
So I'm using the same operation I'm trying to find here, down here in my, in my quote unquote solution.

169
00:13:18,460 --> 00:13:27,340
But this is not the end of recursion because if I just had this as my definition, then I would have infinite recursion.

170
00:13:27,340 --> 00:13:29,220
I don't have a way to stop.

171
00:13:29,220 --> 00:13:40,220
And so this recursive step in conjunction with a base case, something that is fun, that we know fundamentally about the star operator is going to give us our solution.

172
00:13:40,220 --> 00:13:45,820
So we knew on the previous slide when we multiply A with one, we just get back A.

173
00:13:45,820 --> 00:13:48,100
So our base case, right?

174
00:13:48,100 --> 00:13:53,460
Very simple case of multiplication between A and B is going to be one B is one.

175
00:13:53,460 --> 00:13:57,740
And that's going to be A times B is equal to A.

176
00:13:57,740 --> 00:14:04,060
So these might look like the mathematical definitions that you might come up with in a math class.

177
00:14:04,060 --> 00:14:05,500
And we have them right here, right?

178
00:14:05,500 --> 00:14:10,419
So if B is not equal to one, A times B is A plus A times B minus one.

179
00:14:10,419 --> 00:14:15,820
And then the base case, right, is when B is equal to one, A times B is equal to A.

180
00:14:15,820 --> 00:14:27,580
So with these two lines, we can actually come up with the code, the programming version of this function.

181
00:14:27,580 --> 00:14:32,780
So here we're creating a function named Moltreker.

182
00:14:32,780 --> 00:14:35,460
And its parameters are going to be A and B, right?

183
00:14:35,460 --> 00:14:38,180
So I'm multiplying A with B.

184
00:14:38,180 --> 00:14:44,420
And I have to encode these two cases when B is one and otherwise.

185
00:14:44,420 --> 00:14:46,500
So we usually start with the base case.

186
00:14:46,500 --> 00:14:48,620
It's the simplest to think about.

187
00:14:48,620 --> 00:14:51,740
So when B is one, A times B is equal to A, right?

188
00:14:51,740 --> 00:14:56,420
So when if B is equal to one, then what is A times B?

189
00:14:56,419 --> 00:14:57,579
It's just A, right?

190
00:14:57,579 --> 00:15:02,620
So the function can just immediately, immediately, return A.

191
00:15:02,620 --> 00:15:05,219
Else, so that's our base case.

192
00:15:05,219 --> 00:15:09,259
Else, this is going to be our recursive step.

193
00:15:09,259 --> 00:15:13,579
We're not going to return A, but we will return this, right?

194
00:15:13,579 --> 00:15:16,539
A plus A star B minus one.

195
00:15:16,539 --> 00:15:19,740
Well, the A is just A plus.

196
00:15:19,740 --> 00:15:23,779
And this, the star operator between A and B minus one,

197
00:15:23,779 --> 00:15:25,779
is just the function again.

198
00:15:29,500 --> 00:15:31,100
Isn't that really cool?

199
00:15:31,100 --> 00:15:35,940
We're using the function name in the body of this function

200
00:15:35,940 --> 00:15:38,419
that we're defining.

201
00:15:38,419 --> 00:15:41,980
And it's not a problem because the parameter to the one

202
00:15:41,980 --> 00:15:45,940
at the bottom and the recursive step is changing, right?

203
00:15:45,940 --> 00:15:49,019
I'm not calling Moltreker with A comma B again.

204
00:15:49,019 --> 00:15:51,299
That would be very silly of me because that

205
00:15:51,299 --> 00:15:52,579
would lead to infinite recursion.

206
00:15:52,579 --> 00:15:55,340
I'm not making any progress towards a base case.

207
00:15:55,340 --> 00:15:58,419
But I am calling it with B minus one.

208
00:15:58,419 --> 00:16:02,779
So this function will just keep calling Moltreker with A

209
00:16:02,779 --> 00:16:05,460
with B, B minus one, B minus two, B and three, and so on,

210
00:16:05,460 --> 00:16:06,980
until it gets to B as one.

211
00:16:06,980 --> 00:16:09,059
And then it'll build back up the solution just

212
00:16:09,059 --> 00:16:11,539
like we had in the slides with all the parentheses

213
00:16:11,539 --> 00:16:14,659
that we were replacing.

214
00:16:14,659 --> 00:16:16,939
So let's step through the Python tutor.

215
00:16:16,940 --> 00:16:19,380
And I will show you how it actually

216
00:16:19,380 --> 00:16:21,420
looks when we make all these function calls.

217
00:16:21,420 --> 00:16:24,220
And then we'll do another example.

218
00:16:24,220 --> 00:16:29,100
So here I've got Moltreker with A is, I think I ran it,

219
00:16:29,100 --> 00:16:31,820
yet with five and four, just like the one

220
00:16:31,820 --> 00:16:33,540
we've been looking at.

221
00:16:33,540 --> 00:16:36,220
So this is going to be my main function.

222
00:16:36,220 --> 00:16:40,700
It makes a function called to Moltreker, excuse me, five,

223
00:16:40,700 --> 00:16:41,780
comma four.

224
00:16:41,780 --> 00:16:45,460
So my A is five and my B is four.

225
00:16:45,460 --> 00:16:47,220
This is this little blue thing here

226
00:16:47,220 --> 00:16:49,820
is one function environment.

227
00:16:49,820 --> 00:16:52,580
Like when I draw boxes on my slides that are orange,

228
00:16:52,580 --> 00:16:53,379
they do them in blue.

229
00:16:57,220 --> 00:17:00,060
Now in this function call, what do we do?

230
00:17:00,060 --> 00:17:01,660
Is B1?

231
00:17:01,660 --> 00:17:02,300
No.

232
00:17:02,300 --> 00:17:06,980
So we go in the else case and we return five plus.

233
00:17:06,980 --> 00:17:08,019
What happens next?

234
00:17:08,019 --> 00:17:08,539
Does anyone know?

235
00:17:08,539 --> 00:17:13,539
Yeah.

236
00:17:13,539 --> 00:17:17,539
Moltreker is going to run again with A is five.

237
00:17:17,539 --> 00:17:18,859
Yes.

238
00:17:18,859 --> 00:17:21,659
Moltreker will run again with A is five and B is three.

239
00:17:21,659 --> 00:17:22,700
Exactly.

240
00:17:22,700 --> 00:17:25,539
It is a function call, right?

241
00:17:25,539 --> 00:17:28,139
So as a function call, we are going

242
00:17:28,139 --> 00:17:31,059
to create a new environment.

243
00:17:31,059 --> 00:17:34,420
So here's another box.

244
00:17:34,420 --> 00:17:39,220
My previous box is currently hung up.

245
00:17:39,220 --> 00:17:41,740
It cannot finish because it's trying

246
00:17:41,740 --> 00:17:46,340
to figure out what A, what five plus the result of this function

247
00:17:46,340 --> 00:17:46,779
call is.

248
00:17:46,779 --> 00:17:48,420
But this one's not done yet, right?

249
00:17:48,420 --> 00:17:53,259
It's still figuring out it's result.

250
00:17:53,259 --> 00:17:55,180
So we've put that one on hold.

251
00:17:55,180 --> 00:17:58,019
And now we're trying to figure out Moltreker, five, comma three.

252
00:17:58,019 --> 00:17:59,700
Well, what is Moltreker, five, comma three?

253
00:17:59,700 --> 00:18:01,940
It's going to be B is not one.

254
00:18:01,940 --> 00:18:05,820
So this one will also go in its else.

255
00:18:05,820 --> 00:18:11,140
And it will return five plus what?

256
00:18:16,620 --> 00:18:18,140
Exactly.

257
00:18:18,140 --> 00:18:21,420
The function call when B becomes two, exactly.

258
00:18:21,420 --> 00:18:24,940
But notice, it is another function call, right?

259
00:18:24,940 --> 00:18:28,340
So here I have, boom, another box.

260
00:18:28,339 --> 00:18:32,339
Now I've got two function calls, this original one back here,

261
00:18:32,339 --> 00:18:36,099
which was waiting on this one that I've highlighted here.

262
00:18:36,099 --> 00:18:38,339
But now this one that I've highlighted here

263
00:18:38,339 --> 00:18:41,779
had to make another function call down here.

264
00:18:41,779 --> 00:18:45,179
So I've got currently three function calls in the works

265
00:18:45,179 --> 00:18:49,179
that are trying to figure out what their results are.

266
00:18:49,179 --> 00:18:51,419
Finally, this Moltreker, five, comma two,

267
00:18:51,419 --> 00:18:53,899
is going to make another function call.

268
00:18:53,899 --> 00:18:55,099
So it's B is not one.

269
00:18:55,099 --> 00:18:56,819
So we're going to go into the else.

270
00:18:59,339 --> 00:19:01,819
And what is its else going to say?

271
00:19:01,819 --> 00:19:06,059
We're going to return five plus.

272
00:19:06,059 --> 00:19:09,339
And it's another function call.

273
00:19:09,339 --> 00:19:12,059
So now I'm four function calls deep.

274
00:19:12,059 --> 00:19:17,339
And I haven't done any sort of visible work, right?

275
00:19:17,339 --> 00:19:20,740
I've just kept kind of kicking the can down the road

276
00:19:20,740 --> 00:19:23,779
to try to figure out what the values are.

277
00:19:23,779 --> 00:19:25,980
And everybody's waiting for somebody else

278
00:19:25,980 --> 00:19:29,380
to finally return a value.

279
00:19:29,380 --> 00:19:33,220
So this first one is waiting for the one right underneath it

280
00:19:33,220 --> 00:19:34,460
to return a value.

281
00:19:34,460 --> 00:19:36,460
But this one is waiting for the one underneath it

282
00:19:36,460 --> 00:19:37,700
to return a value.

283
00:19:37,700 --> 00:19:39,900
And this one is waiting for the one underneath it

284
00:19:39,900 --> 00:19:40,660
to return a value.

285
00:19:40,660 --> 00:19:42,900
That's the chain of calls.

286
00:19:42,900 --> 00:19:44,579
What's this last one going to do?

287
00:19:44,579 --> 00:19:47,819
Is it going to make another function environment?

288
00:19:47,819 --> 00:19:48,420
No.

289
00:19:48,420 --> 00:19:51,860
It's going to return A, which is five.

290
00:19:51,859 --> 00:19:57,379
OK, there's my return value five.

291
00:19:57,379 --> 00:20:01,379
So this one will return the five to whoever called it.

292
00:20:01,379 --> 00:20:03,500
And whoever called it was this one here.

293
00:20:03,500 --> 00:20:06,179
We'll recur five comma two, right?

294
00:20:06,179 --> 00:20:11,500
Five comma two was trying to figure out what five plus this bottom

295
00:20:11,500 --> 00:20:13,740
function call was.

296
00:20:13,740 --> 00:20:17,539
Well, now it can figure out that it's going to be five plus five.

297
00:20:17,539 --> 00:20:20,339
So its return will be 10.

298
00:20:20,339 --> 00:20:24,539
This one returns a value up one level to whoever called it.

299
00:20:24,539 --> 00:20:26,740
And that was molt recur five comma three.

300
00:20:26,740 --> 00:20:30,539
And now molt recur five comma three can finish its job.

301
00:20:30,539 --> 00:20:34,220
It was trying to figure out what five plus its function

302
00:20:34,220 --> 00:20:36,539
call was, which is we figured out as 10.

303
00:20:36,539 --> 00:20:39,619
So this one can figure out its 15.

304
00:20:39,619 --> 00:20:42,779
And finally, this last value can return back up

305
00:20:42,779 --> 00:20:46,939
to the original function call five comma four.

306
00:20:46,940 --> 00:20:50,460
And five comma four will return five plus the 15 that got

307
00:20:50,460 --> 00:20:51,900
returned, which is 20.

308
00:20:55,019 --> 00:20:58,420
OK, questions about what just happened?

309
00:21:01,420 --> 00:21:03,620
Does everything make sense?

310
00:21:03,620 --> 00:21:04,900
All right.

311
00:21:04,900 --> 00:21:09,019
OK, so let's look at one more example.

312
00:21:09,019 --> 00:21:11,180
I mean, we'll look at a few more examples this lecture.

313
00:21:11,180 --> 00:21:14,380
But let's look at a real world example for now.

314
00:21:14,380 --> 00:21:16,900
This one will hopefully illustrate the difference

315
00:21:16,900 --> 00:21:20,340
between iterative algorithms and recursive algorithms

316
00:21:20,340 --> 00:21:22,300
in a more real life setting.

317
00:21:22,300 --> 00:21:27,100
So let's assume that in this real world setting,

318
00:21:27,100 --> 00:21:29,300
a student asks for regrade for an exam.

319
00:21:32,260 --> 00:21:36,540
In an iterative setting, we have basically one function call,

320
00:21:36,540 --> 00:21:38,820
right, regrade or whatever you want to call it.

321
00:21:38,820 --> 00:21:40,980
There's my student.

322
00:21:40,980 --> 00:21:44,380
How is the student going to iteratively get the regrade?

323
00:21:44,380 --> 00:21:47,980
Well, the student will be in charge of basically looping

324
00:21:47,980 --> 00:21:51,539
through each staff member, right?

325
00:21:51,539 --> 00:21:54,660
So the student goes to the instructor and says,

326
00:21:54,660 --> 00:21:56,819
can I have a regrade please?

327
00:21:56,819 --> 00:21:59,299
OK, the instructor may have graded one problem.

328
00:21:59,299 --> 00:22:01,860
Maybe they didn't, but they will regrade the problem

329
00:22:01,860 --> 00:22:05,059
that maybe they were in charge of.

330
00:22:05,059 --> 00:22:09,500
Then the student will go to the next person on staff, the TA.

331
00:22:09,500 --> 00:22:11,619
Can I have a regrade please?

332
00:22:11,619 --> 00:22:14,339
Let's say the TA maybe regrades the problem they were in charge

333
00:22:14,339 --> 00:22:15,940
of, maybe they didn't, but in any case,

334
00:22:15,940 --> 00:22:20,779
they'll give the score back or they'll answer the students' request.

335
00:22:20,779 --> 00:22:24,380
But the student then goes to the next person on staff,

336
00:22:24,380 --> 00:22:26,740
the lab assistant.

337
00:22:26,740 --> 00:22:27,700
Can I have a regrade please?

338
00:22:27,700 --> 00:22:29,539
The lab assistant might regrade the problem

339
00:22:29,539 --> 00:22:31,779
later in charge of, you know, whatever,

340
00:22:31,779 --> 00:22:33,420
gives the grade back to the student.

341
00:22:33,420 --> 00:22:36,460
The student is keeping track of all these regrades scores

342
00:22:36,460 --> 00:22:37,859
that they're getting to figure out

343
00:22:37,859 --> 00:22:39,659
what their new total score is.

344
00:22:39,659 --> 00:22:44,059
And finally, the student might go to the grader,

345
00:22:44,059 --> 00:22:46,259
who did probably most of the work,

346
00:22:46,259 --> 00:22:48,339
asks for the regrade, the grader will,

347
00:22:48,339 --> 00:22:51,139
do the fee, agree to do the regrade,

348
00:22:51,139 --> 00:22:53,500
and pass back the values.

349
00:22:53,500 --> 00:22:56,219
So here, notice the student is in charge

350
00:22:56,219 --> 00:23:00,059
of iteratively going to every single person on staff

351
00:23:00,059 --> 00:23:02,219
and getting the result back.

352
00:23:02,219 --> 00:23:04,979
And the student is keeping track of what their new score is.

353
00:23:04,979 --> 00:23:06,500
Obviously, the staff members will too

354
00:23:06,500 --> 00:23:08,099
for the purposes of assigning grades,

355
00:23:08,099 --> 00:23:10,779
but the student is as well.

356
00:23:10,779 --> 00:23:13,539
So the student's basically adding up all these values.

357
00:23:13,539 --> 00:23:15,059
But there is only one function call.

358
00:23:15,059 --> 00:23:18,380
So I've denoted the function call using just this black circle

359
00:23:18,380 --> 00:23:20,380
here.

360
00:23:20,380 --> 00:23:21,859
OK, so that's iteration.

361
00:23:21,859 --> 00:23:22,700
We know how to do that.

362
00:23:22,700 --> 00:23:25,539
We've been doing this for a really long time in this class.

363
00:23:25,539 --> 00:23:29,500
But now let's look at the same problem recursively.

364
00:23:29,500 --> 00:23:33,579
So in recursion, we've got these two steps, right?

365
00:23:33,579 --> 00:23:37,179
There's the problem of decreasing our original problem

366
00:23:37,179 --> 00:23:41,539
into smaller problems, right, until we reach sub sort of base

367
00:23:41,539 --> 00:23:43,539
case.

368
00:23:43,539 --> 00:23:46,619
And then at that point, we have the task

369
00:23:46,619 --> 00:23:50,539
of building back up our answer.

370
00:23:50,539 --> 00:23:52,179
So in the recursive setting, again,

371
00:23:52,179 --> 00:23:54,339
I've got my one function called to regrade

372
00:23:54,339 --> 00:23:56,699
on behalf of the student.

373
00:23:56,699 --> 00:24:00,339
But the student will only interact with one person,

374
00:24:00,339 --> 00:24:02,579
maybe the instructor.

375
00:24:02,579 --> 00:24:05,460
The student will not interact with anybody else in staff.

376
00:24:05,460 --> 00:24:07,259
The student will just go up to the instructor and say,

377
00:24:07,259 --> 00:24:10,500
hey, I would like your regrade for this exam.

378
00:24:10,500 --> 00:24:15,019
OK, now the student is going to wait, right?

379
00:24:15,019 --> 00:24:19,259
The instructor is also a function call to regrade.

380
00:24:19,259 --> 00:24:21,899
So maybe the instructor didn't do any of the grading.

381
00:24:21,899 --> 00:24:24,099
But the instructor will make their own function

382
00:24:24,099 --> 00:24:25,139
call to the TA.

383
00:24:25,139 --> 00:24:28,579
Can you please regrade this exam?

384
00:24:28,579 --> 00:24:30,259
The TA may be graded one problem.

385
00:24:30,259 --> 00:24:32,059
They'll keep track of the problem they need to grade.

386
00:24:32,059 --> 00:24:33,980
But there are other problems that need to be graded.

387
00:24:33,980 --> 00:24:37,579
So the TA will then ask make their own function call

388
00:24:37,579 --> 00:24:38,980
to the lab assistant.

389
00:24:38,980 --> 00:24:41,419
Maybe the lab assistant graded some problems.

390
00:24:41,419 --> 00:24:45,460
And then the lab assistant will also make further the request

391
00:24:45,460 --> 00:24:48,259
sort of passing along the function call to the grader.

392
00:24:48,259 --> 00:24:51,419
So we have the task of doing the regrading as a function

393
00:24:51,419 --> 00:24:55,700
being passed along all of the staff members.

394
00:24:55,700 --> 00:24:57,419
When we reach the base case, which

395
00:24:57,419 --> 00:24:59,980
is the last, the grader, that needs

396
00:24:59,980 --> 00:25:05,819
that probably knows or probably graded the last question,

397
00:25:05,819 --> 00:25:08,259
we've got the answer being passed back up

398
00:25:08,259 --> 00:25:11,059
the chain of function calls, right?

399
00:25:11,059 --> 00:25:13,460
So the grader will say, all right, I've graded my problem.

400
00:25:13,460 --> 00:25:15,140
There's nobody else I need to ask.

401
00:25:15,140 --> 00:25:16,980
So here's my score.

402
00:25:16,980 --> 00:25:19,539
So this score is being passed back up the chain of function

403
00:25:19,539 --> 00:25:21,220
calls to the lab assistant.

404
00:25:21,220 --> 00:25:24,860
The lab assistant will take that score and add it to their score.

405
00:25:24,860 --> 00:25:28,099
Passes it back up the chain of function calls

406
00:25:28,099 --> 00:25:30,459
to the teaching assistant.

407
00:25:30,459 --> 00:25:33,740
The teaching assistant adds that score to their score.

408
00:25:33,740 --> 00:25:34,939
Maybe they graded a problem.

409
00:25:34,939 --> 00:25:36,059
Maybe they didn't.

410
00:25:36,059 --> 00:25:37,980
But anyway, they're compiling the result

411
00:25:37,980 --> 00:25:41,339
little by little back up until passes it to the instructor.

412
00:25:41,339 --> 00:25:42,939
And then the instructor says, here you go.

413
00:25:42,939 --> 00:25:44,419
This is your score.

414
00:25:44,419 --> 00:25:45,659
So you see the difference, right?

415
00:25:45,659 --> 00:25:48,139
The student is the iteration.

416
00:25:48,139 --> 00:25:50,299
They ask everybody on staff.

417
00:25:50,299 --> 00:25:52,659
So they interact with everybody on staff.

418
00:25:52,659 --> 00:25:56,219
But in recursion, the student is basically hung up waiting

419
00:25:56,220 --> 00:26:00,980
for an answer until we've gone down all these chain of function

420
00:26:00,980 --> 00:26:03,420
calls and the answer has been built back up.

421
00:26:03,420 --> 00:26:06,700
So the student is not keeping track of the answer at all.

422
00:26:06,700 --> 00:26:11,059
They only get the final answer at the end.

423
00:26:11,059 --> 00:26:12,940
Would that help at all?

424
00:26:12,940 --> 00:26:14,740
I refine this example a couple of times.

425
00:26:14,740 --> 00:26:18,059
Hopefully this is good.

426
00:26:18,059 --> 00:26:20,019
So the big idea in recursion here is

427
00:26:20,019 --> 00:26:22,620
got, I've got these, quote unquote, earlier function calls,

428
00:26:22,620 --> 00:26:22,819
right?

429
00:26:22,819 --> 00:26:25,860
The ones I've made way back at the beginning,

430
00:26:25,859 --> 00:26:30,819
these function calls are just waiting on results to come back.

431
00:26:30,819 --> 00:26:33,419
They're not doing any useful work at the beginning.

432
00:26:33,419 --> 00:26:37,500
They only do useful work when they're assembling the results

433
00:26:37,500 --> 00:26:41,899
after getting a return back from later function calls.

434
00:26:41,899 --> 00:26:47,019
So hopefully that gives you a sense of how we can apply recursion.

435
00:26:47,019 --> 00:26:48,899
Now, what exactly is recursion?

436
00:26:48,899 --> 00:26:51,579
So algorithmically, it's a way for us

437
00:26:51,579 --> 00:26:54,019
to come up with some solutions to some problems

438
00:26:54,019 --> 00:26:57,420
in this dividing conquer approach or decrease in conquer approach.

439
00:26:57,420 --> 00:26:59,019
You have your original problem.

440
00:26:59,019 --> 00:27:03,059
You divide it so much into the same problem just slightly

441
00:27:03,059 --> 00:27:05,299
changed until you reach a base case.

442
00:27:05,299 --> 00:27:08,259
That base case can kick off the conquer step

443
00:27:08,259 --> 00:27:10,539
and start passing back a value that you

444
00:27:10,539 --> 00:27:15,740
can start assembling from your earlier function calls.

445
00:27:15,740 --> 00:27:18,099
Now, semantically, as we saw in the example

446
00:27:18,099 --> 00:27:21,099
where we multiplied the functions, we've got a function that calls

447
00:27:21,099 --> 00:27:22,299
itself.

448
00:27:22,299 --> 00:27:25,460
Obviously, it's not calling itself with the exact same parameters

449
00:27:25,460 --> 00:27:27,299
because that would lead to infinite recursion.

450
00:27:27,299 --> 00:27:28,899
And that's not what we want.

451
00:27:28,899 --> 00:27:32,980
We're going to call ourselves with a slight change in our parameters

452
00:27:32,980 --> 00:27:37,180
in such a way that we will reach our base case.

453
00:27:37,180 --> 00:27:39,339
And once we reach the base case, then again,

454
00:27:39,339 --> 00:27:42,379
we kick off the conquer step and we can start reassembling back.

455
00:27:42,379 --> 00:27:48,220
And you saw how the function calls do that when they help each other back up.

456
00:27:48,220 --> 00:27:50,220
I'm going to give you a couple of minutes to try this.

457
00:27:50,220 --> 00:27:53,019
So complete the function that calculates

458
00:27:53,019 --> 00:27:54,740
n to the power of p for these variables.

459
00:27:54,740 --> 00:27:57,339
So if you come up with the mathematical definition,

460
00:27:57,339 --> 00:28:01,700
it will be a pretty straight translation to code.

461
00:28:01,700 --> 00:28:04,220
I did include two base cases here.

462
00:28:04,220 --> 00:28:09,180
So maybe a base case is when n is 0 and another base case is when n is 1.

463
00:28:09,180 --> 00:28:11,420
Figure out what you should return and then how

464
00:28:11,420 --> 00:28:13,500
to write this recursive step.

465
00:28:13,500 --> 00:28:24,460
So I've got line 50-ish is where I can type in the code.

466
00:28:24,460 --> 00:28:25,259
All right.

467
00:28:25,259 --> 00:28:28,779
What's my first base case?

468
00:28:28,779 --> 00:28:29,299
Yeah.

469
00:28:32,380 --> 00:28:33,380
Yep.

470
00:28:33,380 --> 00:28:37,380
If p is equal to 0, then we can return 1.

471
00:28:37,380 --> 00:28:38,059
Oops.

472
00:28:38,059 --> 00:28:39,099
Just one time.

473
00:28:39,099 --> 00:28:40,140
That's another base case.

474
00:28:43,819 --> 00:28:46,619
P is 1.

475
00:28:46,619 --> 00:28:50,579
We can return n.

476
00:28:50,579 --> 00:28:51,700
Awesome.

477
00:28:51,700 --> 00:28:52,700
How about my recursive step?

478
00:29:01,220 --> 00:29:01,460
Yep.

479
00:29:01,460 --> 00:29:10,019
We can return n times like this.

480
00:29:10,019 --> 00:29:12,660
Now let's assume I don't know how to do star star.

481
00:29:12,740 --> 00:29:16,019
How do you rewrite this in terms of the thing we're trying to write?

482
00:29:16,019 --> 00:29:17,980
There was a solution back there.

483
00:29:17,980 --> 00:29:20,460
How are the score would occur anywhere?

484
00:29:20,460 --> 00:29:20,940
Yep.

485
00:29:20,940 --> 00:29:21,860
We can do that too.

486
00:29:21,860 --> 00:29:23,060
Yep, exactly.

487
00:29:23,060 --> 00:29:27,900
So here we're assuming that we don't know the star star operator.

488
00:29:27,900 --> 00:29:31,220
Otherwise, this would be a very easy function to write.

489
00:29:31,220 --> 00:29:33,940
We are trying to define the star star operator ourselves

490
00:29:33,940 --> 00:29:37,100
using this function in power recur.

491
00:29:37,100 --> 00:29:42,060
So we're just going to call it again down here with n and p minus 1.

492
00:29:42,059 --> 00:29:44,859
So if we run it, this will give us 8.

493
00:29:49,659 --> 00:29:49,859
Yep.

494
00:29:49,859 --> 00:29:50,659
Yeah.

495
00:29:50,659 --> 00:29:56,139
What is the assessment of having the p is 1 of the p?

496
00:29:56,139 --> 00:29:56,659
Yes.

497
00:29:56,659 --> 00:29:57,379
Great question.

498
00:29:57,379 --> 00:29:58,859
What is the necessity of this?

499
00:29:58,859 --> 00:30:00,379
There is no necessity.

500
00:30:00,379 --> 00:30:02,419
I actually just included it there to just

501
00:30:02,419 --> 00:30:05,379
show you how we can have two base cases.

502
00:30:05,379 --> 00:30:10,139
So in this particular case, we would actually never hit this one.

503
00:30:10,140 --> 00:30:15,460
n is greater than 1, because we always stop here.

504
00:30:15,460 --> 00:30:18,500
If the user gives us 0, we would just return that one.

505
00:30:18,500 --> 00:30:22,820
But it would work if we completely removed that as well.

506
00:30:22,820 --> 00:30:23,500
Great question.

507
00:30:28,700 --> 00:30:32,060
OK, let's look at one more example.

508
00:30:32,060 --> 00:30:35,940
And this one is the one that I'm going to ask for some participation.

509
00:30:35,940 --> 00:30:38,780
I would like four of you to come down with me.

510
00:30:38,779 --> 00:30:42,899
But before we do that, let's think about factorial.

511
00:30:42,899 --> 00:30:48,740
So the definition of n factorial is n times n minus 1 times n minus 2 times n minus 3

512
00:30:48,740 --> 00:30:50,379
down to 1.

513
00:30:50,379 --> 00:30:51,619
What is a base case?

514
00:30:51,619 --> 00:30:54,819
What is the simplest thing that we know the factorial of?

515
00:30:54,819 --> 00:30:55,619
You guys tell me.

516
00:30:59,500 --> 00:31:02,700
What is 0 factorial?

517
00:31:02,700 --> 00:31:03,059
1.

518
00:31:03,059 --> 00:31:03,779
Good.

519
00:31:03,779 --> 00:31:04,539
I chose 1.

520
00:31:04,539 --> 00:31:05,579
But both could work.

521
00:31:05,579 --> 00:31:07,139
Yeah.

522
00:31:07,140 --> 00:31:09,580
If n is equal to 0, we can also return 1.

523
00:31:09,580 --> 00:31:12,900
Or we can do n is equal to 1, return 1.

524
00:31:12,900 --> 00:31:15,060
What's our recursive step?

525
00:31:15,060 --> 00:31:18,500
Do you recognize the recursive pattern here?

526
00:31:18,500 --> 00:31:29,140
And factorial equals n times n minus 1 factorial.

527
00:31:29,140 --> 00:31:33,380
If we extract the first n out, n minus 1 times n minus 2 times n minus 3.

528
00:31:33,380 --> 00:31:36,300
And so on is just n minus 1 factorial.

529
00:31:36,299 --> 00:31:43,099
And so our recursive step just says it's n times the same function factorial with n minus

530
00:31:43,099 --> 00:31:44,099
1.

531
00:31:44,099 --> 00:31:45,859
Does everyone OK with that?

532
00:31:45,859 --> 00:31:47,379
Cool.

533
00:31:47,379 --> 00:31:47,899
OK.

534
00:31:47,899 --> 00:31:51,940
So let's look through this example with some participation.

535
00:31:51,940 --> 00:31:53,539
So four people.

536
00:31:53,539 --> 00:31:54,539
One, yes.

537
00:31:54,539 --> 00:31:57,019
And you'll be on OCW forever, you guys, too.

538
00:31:57,019 --> 00:31:57,779
Yep.

539
00:31:57,779 --> 00:32:00,460
Two more.

540
00:32:00,460 --> 00:32:01,099
Yes.

541
00:32:01,099 --> 00:32:02,740
Thank you.

542
00:32:02,740 --> 00:32:03,339
Thank you.

543
00:32:03,339 --> 00:32:04,299
Awesome.

544
00:32:04,299 --> 00:32:04,899
OK.

545
00:32:04,900 --> 00:32:08,900
And I'll have you guys stand right here.

546
00:32:08,900 --> 00:32:15,900
I'll ask you guys to come in one at a time as we are working through this exam.

547
00:32:15,900 --> 00:32:20,220
So we're just going to demonstrate sort of once again what happens when we make function

548
00:32:20,220 --> 00:32:21,220
calls.

549
00:32:21,220 --> 00:32:23,220
You want to just stand right here beside behind my computer.

550
00:32:23,220 --> 00:32:24,220
Thank you.

551
00:32:24,220 --> 00:32:25,220
Yep.

552
00:32:25,220 --> 00:32:26,220
Behind my computer.

553
00:32:26,220 --> 00:32:27,220
Cool.

554
00:32:27,220 --> 00:32:28,220
OK.

555
00:32:28,220 --> 00:32:29,220
Perfect.

556
00:32:29,220 --> 00:32:30,220
OK.

557
00:32:30,220 --> 00:32:34,340
So I'll just stand here.

558
00:32:34,339 --> 00:32:37,740
So I am going to be the main program.

559
00:32:37,740 --> 00:32:40,379
I am you run this code.

560
00:32:40,379 --> 00:32:43,139
I am going to be the main program.

561
00:32:43,139 --> 00:32:52,579
I am going to keep track of the variables and everything that's in this global scope.

562
00:32:52,579 --> 00:32:53,579
OK.

563
00:32:53,579 --> 00:32:58,379
So in the global scope, just like we have it in the past, I've got a definition for my

564
00:32:58,379 --> 00:33:01,980
factorial function here.

565
00:33:01,980 --> 00:33:03,259
And this is just some code.

566
00:33:03,259 --> 00:33:04,740
At this point, I've just defined it.

567
00:33:04,740 --> 00:33:07,099
I don't care what it actually is.

568
00:33:07,099 --> 00:33:08,860
But I have one function call.

569
00:33:08,860 --> 00:33:12,740
So my one and only job is to print the result of factorial four.

570
00:33:12,740 --> 00:33:13,740
Right.

571
00:33:13,740 --> 00:33:15,299
I have a pretty easy job.

572
00:33:15,299 --> 00:33:16,539
So what happens?

573
00:33:16,539 --> 00:33:21,380
You guys audience tell me what happens when I've got factorial four.

574
00:33:21,380 --> 00:33:22,980
What is this?

575
00:33:22,980 --> 00:33:26,259
Do I just know right off the bat what factorial four is?

576
00:33:26,259 --> 00:33:27,259
No.

577
00:33:27,259 --> 00:33:29,460
It is a function call, right?

578
00:33:29,460 --> 00:33:37,299
So as a function call, what do I need to do?

579
00:33:37,299 --> 00:33:38,299
Exactly.

580
00:33:38,299 --> 00:33:39,980
I need to create an environment.

581
00:33:39,980 --> 00:33:43,380
So you will be my first environment.

582
00:33:43,380 --> 00:33:44,380
Hello.

583
00:33:44,380 --> 00:33:45,380
My name is you can put it on.

584
00:33:45,380 --> 00:33:46,380
There you go.

585
00:33:46,380 --> 00:33:47,380
Hello.

586
00:33:47,380 --> 00:33:48,380
My name is.

587
00:33:48,380 --> 00:33:49,380
And then you can step right over there.

588
00:33:49,380 --> 00:33:50,579
So you are my first function call.

589
00:33:50,579 --> 00:33:52,620
Your name is fact for factorial.

590
00:33:52,620 --> 00:33:53,620
Awesome.

591
00:33:53,620 --> 00:33:58,460
So I have just called you.

592
00:33:58,460 --> 00:33:59,420
What is your job?

593
00:33:59,420 --> 00:34:05,500
So you guys tell me what is factorial four's job is from running the code.

594
00:34:05,500 --> 00:34:08,260
Are they going to do the if or the else?

595
00:34:08,260 --> 00:34:08,780
The else.

596
00:34:08,780 --> 00:34:09,780
So this is your job.

597
00:34:09,780 --> 00:34:10,619
You keep track of that.

598
00:34:10,619 --> 00:34:12,460
Your end is going to be four.

599
00:34:12,460 --> 00:34:15,860
And your job is to return four times factorial of three.

600
00:34:15,860 --> 00:34:18,700
Do you know what factorial of three is right now?

601
00:34:18,700 --> 00:34:19,019
No.

602
00:34:19,019 --> 00:34:21,460
So what do you need to do?

603
00:34:21,460 --> 00:34:21,860
Yes.

604
00:34:21,860 --> 00:34:23,139
Please call somebody else.

605
00:34:23,139 --> 00:34:25,380
Who are you going to call?

606
00:34:25,380 --> 00:34:26,460
Next.

607
00:34:26,460 --> 00:34:27,860
What is your name going to be?

608
00:34:28,860 --> 00:34:31,980
Your name is also factorial exactly.

609
00:34:31,980 --> 00:34:35,059
And you are going to be called with n is equal to three.

610
00:34:35,059 --> 00:34:39,539
So you can stand right beside factorial of four.

611
00:34:39,539 --> 00:34:40,300
Very nice.

612
00:34:40,300 --> 00:34:47,500
So now notice we've got two function calls, both of their names are factorial,

613
00:34:47,500 --> 00:34:48,700
right?

614
00:34:48,700 --> 00:34:51,500
But they are completely separate function calls.

615
00:34:51,500 --> 00:34:53,900
They are completely in different environments.

616
00:34:53,900 --> 00:34:55,620
They have their own end values.

617
00:34:55,620 --> 00:34:57,820
They have their own jobs to do.

618
00:34:58,380 --> 00:35:02,059
Just because their name is factorial for both of them

619
00:35:02,059 --> 00:35:05,820
does not mean that they'll interfere with each other's variables, right?

620
00:35:05,820 --> 00:35:08,260
Very, very important point to make.

621
00:35:08,260 --> 00:35:09,460
factorial three.

622
00:35:09,460 --> 00:35:12,300
Do you know what factorial two is?

623
00:35:12,300 --> 00:35:12,539
No.

624
00:35:12,539 --> 00:35:14,420
So what do you need to do?

625
00:35:14,420 --> 00:35:15,100
Exactly.

626
00:35:15,100 --> 00:35:15,980
Who are you going to call?

627
00:35:15,980 --> 00:35:18,019
I'm factorial.

628
00:35:18,019 --> 00:35:19,100
Here you go.

629
00:35:19,100 --> 00:35:22,500
What is your name going to be?

630
00:35:22,500 --> 00:35:25,019
factorial at n is equal to two?

631
00:35:25,019 --> 00:35:25,900
Yes, we are at two.

632
00:35:25,900 --> 00:35:26,380
Exactly.

633
00:35:26,380 --> 00:35:29,740
So your name is also factorial.

634
00:35:29,740 --> 00:35:32,460
And you are going to be with called with n is equal to two.

635
00:35:32,460 --> 00:35:36,180
Again, now I have three factorial calls.

636
00:35:36,180 --> 00:35:40,700
They're all to the name factorial, but they're all independent function calls.

637
00:35:40,700 --> 00:35:43,539
So your job is to return two times factorial of one.

638
00:35:43,539 --> 00:35:45,700
Do you know what factorial of one is?

639
00:35:45,700 --> 00:35:46,700
Yes.

640
00:35:46,700 --> 00:35:48,700
Wait.

641
00:35:48,700 --> 00:35:50,420
As a human you do.

642
00:35:50,420 --> 00:35:52,500
But as factorial you do not.

643
00:35:52,500 --> 00:35:53,820
What do you need to do?

644
00:35:53,820 --> 00:35:55,019
Oh, call her.

645
00:35:55,019 --> 00:35:55,900
Call her exactly.

646
00:35:55,900 --> 00:35:56,659
Here you go.

647
00:35:56,659 --> 00:35:58,619
Your name is also factorial.

648
00:35:58,619 --> 00:36:01,340
You can stand beside our lovely other factorials.

649
00:36:01,340 --> 00:36:04,820
So your job, audience, I've already given away.

650
00:36:04,820 --> 00:36:10,539
Your last job is to return one.

651
00:36:10,539 --> 00:36:11,900
OK, excellent.

652
00:36:11,900 --> 00:36:14,980
So here is your return value.

653
00:36:14,980 --> 00:36:18,340
Now, factorial of one.

654
00:36:18,340 --> 00:36:21,980
Are you going to return that value to me?

655
00:36:21,980 --> 00:36:24,219
Which one will you return it to?

656
00:36:24,219 --> 00:36:25,219
Exactly.

657
00:36:25,219 --> 00:36:27,539
So factorial with n is equal to two can now

658
00:36:27,539 --> 00:36:31,179
replace their factorial one function with one.

659
00:36:31,179 --> 00:36:35,259
So what is your return value going to be factorial of two?

660
00:36:35,259 --> 00:36:36,259
I got it right.

661
00:36:36,259 --> 00:36:37,459
Two, exactly.

662
00:36:37,459 --> 00:36:40,099
So where do you pass your value along to?

663
00:36:40,099 --> 00:36:42,379
OK, now one thing we forgot.

664
00:36:42,379 --> 00:36:47,019
As soon as you made the return value, you disappear.

665
00:36:47,019 --> 00:36:48,500
You had a very simple job.

666
00:36:48,500 --> 00:36:50,299
I'm sorry, but it was really important.

667
00:36:50,299 --> 00:36:51,339
You were our base case.

668
00:36:51,340 --> 00:36:55,180
Without you, we would have had infinite recursion.

669
00:36:55,180 --> 00:36:57,700
OK, so you've passed along your value.

670
00:36:57,700 --> 00:37:00,780
So as a function that's done its job, what do you do?

671
00:37:00,780 --> 00:37:01,300
Disappear.

672
00:37:01,300 --> 00:37:01,860
Exactly.

673
00:37:01,860 --> 00:37:02,620
Thank you.

674
00:37:02,620 --> 00:37:04,740
All right, factorial of where are we?

675
00:37:04,740 --> 00:37:05,940
Three, exactly.

676
00:37:05,940 --> 00:37:08,500
What is your value going to be now?

677
00:37:08,500 --> 00:37:09,380
Six, exactly.

678
00:37:09,380 --> 00:37:11,380
So here's your return value.

679
00:37:11,380 --> 00:37:12,260
You give it to me.

680
00:37:12,260 --> 00:37:12,980
There you go.

681
00:37:12,980 --> 00:37:15,820
And as, exactly, very good.

682
00:37:15,820 --> 00:37:16,500
We disappear.

683
00:37:16,500 --> 00:37:18,579
So we've got three function calls that disappear

684
00:37:18,579 --> 00:37:20,460
as soon as they return to value.

685
00:37:20,460 --> 00:37:23,699
And finally, four times six, 24.

686
00:37:23,699 --> 00:37:26,139
And who do you give your value?

687
00:37:26,139 --> 00:37:27,340
I mean, which I just gave you.

688
00:37:27,340 --> 00:37:28,900
Sorry, yeah, that was confusing.

689
00:37:28,900 --> 00:37:31,019
Thank you so much, you guys.

690
00:37:31,019 --> 00:37:36,579
That illustrated a couple of things you guys can head back.

691
00:37:36,579 --> 00:37:37,539
Thank you so much.

692
00:37:37,539 --> 00:37:39,179
APPLAUSE

693
00:37:42,219 --> 00:37:44,460
So we illustrated a couple of things here.

694
00:37:44,460 --> 00:37:47,099
I'm going to do it on the slides as well.

695
00:37:47,099 --> 00:37:49,940
Just to bring the point home.

696
00:37:49,940 --> 00:37:51,900
But let's go through it.

697
00:37:51,900 --> 00:37:54,059
So I've got factorial four.

698
00:37:54,059 --> 00:37:57,139
Every time I make a function call, even though it's

699
00:37:57,139 --> 00:38:00,900
the same name, all factorial, it's a completely separate

700
00:38:00,900 --> 00:38:02,539
environment.

701
00:38:02,539 --> 00:38:05,019
Happens to have the same name, but they're just in charge

702
00:38:05,019 --> 00:38:06,659
of doing their own job.

703
00:38:06,659 --> 00:38:11,779
So here I've got factorial four calling four times factorial

704
00:38:11,779 --> 00:38:13,139
of three.

705
00:38:13,139 --> 00:38:15,739
As soon as I see factorial of three, this creates another

706
00:38:15,739 --> 00:38:17,099
environment.

707
00:38:17,099 --> 00:38:21,099
This is going to be returning three times factorial of two.

708
00:38:21,099 --> 00:38:22,819
Again, another environment.

709
00:38:22,819 --> 00:38:25,899
This returns two times factorial of one

710
00:38:25,899 --> 00:38:27,579
and a final environment, right?

711
00:38:27,579 --> 00:38:31,259
Our most important environment is

712
00:38:31,259 --> 00:38:32,899
that last one with the base case.

713
00:38:32,899 --> 00:38:36,500
It allows us to kickstart our conquer step.

714
00:38:36,500 --> 00:38:40,859
So this base step will return the value one to whoever called it.

715
00:38:40,859 --> 00:38:43,619
Again, we're not skipping around.

716
00:38:43,619 --> 00:38:47,259
We only return the value to the function that called us.

717
00:38:47,259 --> 00:38:49,859
And I know it gets really confusing because everything

718
00:38:49,859 --> 00:38:52,339
is called fact in this particular case.

719
00:38:52,339 --> 00:38:56,299
But we just have to remember which function called us.

720
00:38:56,299 --> 00:38:59,219
And so we return the one back up here.

721
00:38:59,219 --> 00:39:01,099
This becomes two times one.

722
00:39:01,099 --> 00:39:03,420
And they can finish their job, right?

723
00:39:03,420 --> 00:39:06,659
So notice at this point, we were one, two, three, four

724
00:39:06,659 --> 00:39:09,659
functions just kind of hung up and waiting for values

725
00:39:09,659 --> 00:39:11,219
to be passed back to us.

726
00:39:11,219 --> 00:39:14,299
But now we can finally finish our jobs one by one.

727
00:39:14,299 --> 00:39:16,419
So this one returns a two.

728
00:39:16,419 --> 00:39:18,299
This one returns the six.

729
00:39:18,299 --> 00:39:22,379
This one returns the 24.

730
00:39:22,379 --> 00:39:26,379
And the 24 gets printed out.

731
00:39:26,379 --> 00:39:30,819
So big idea here.

732
00:39:30,819 --> 00:39:33,099
We've got each function called, even though it

733
00:39:33,099 --> 00:39:36,059
has the same name, is completely separate, right?

734
00:39:36,059 --> 00:39:41,179
Completely independent environment with their own parameters.

735
00:39:41,500 --> 00:39:45,019
Those parameters can change within those environments.

736
00:39:45,019 --> 00:39:46,059
And that's totally OK.

737
00:39:46,059 --> 00:39:48,379
They won't interfere with any parameters

738
00:39:48,379 --> 00:39:49,899
in any other environments.

739
00:39:54,339 --> 00:39:57,739
So let's do the Python tutor link.

740
00:39:57,739 --> 00:40:00,019
And then again, we can just do one more time

741
00:40:00,019 --> 00:40:02,019
just to show you what this looks like in terms

742
00:40:02,019 --> 00:40:03,299
of the Python tutor.

743
00:40:03,299 --> 00:40:06,819
So here I've got my factorial with n is equal to 4.

744
00:40:06,819 --> 00:40:08,859
Calls n is equal to 3.

745
00:40:08,860 --> 00:40:11,460
Calls factorial with n is equal to 2.

746
00:40:11,460 --> 00:40:13,980
Calls factorial with n is equal to 1.

747
00:40:13,980 --> 00:40:16,940
At this point, just like with the multiplication,

748
00:40:16,940 --> 00:40:19,780
I've got all these factorials in the works.

749
00:40:19,780 --> 00:40:22,220
But we can start returning values back to whoever

750
00:40:22,220 --> 00:40:27,099
called us until we get back to the original function call.

751
00:40:30,260 --> 00:40:32,900
So this is another recap of the observations

752
00:40:32,900 --> 00:40:35,220
that we've seen right each different function call

753
00:40:35,220 --> 00:40:37,260
has its own environment.

754
00:40:37,260 --> 00:40:39,180
The variables within these environments

755
00:40:39,180 --> 00:40:41,340
are specific to those environments.

756
00:40:41,340 --> 00:40:44,340
They don't interfere with each other.

757
00:40:44,340 --> 00:40:48,620
And the flow of control, so when we make a function call,

758
00:40:48,620 --> 00:40:51,860
all we know is the function that we call next.

759
00:40:51,860 --> 00:40:53,140
We don't skip around.

760
00:40:53,140 --> 00:40:55,900
All we know is who we call next and who we need

761
00:40:55,900 --> 00:40:57,300
to give the value back up to.

762
00:41:01,740 --> 00:41:03,260
One last thing I wanted to point out.

763
00:41:03,260 --> 00:41:08,020
So here I've got the code for factorial, the iterative

764
00:41:08,020 --> 00:41:11,820
version, and the recursive version.

765
00:41:11,820 --> 00:41:14,500
So the one on the left is, or sorry, the one on the right

766
00:41:14,500 --> 00:41:15,980
is what we already wrote.

767
00:41:15,980 --> 00:41:18,260
So it's factorial recursive.

768
00:41:18,260 --> 00:41:20,540
And the one on the left is the iterative version.

769
00:41:20,540 --> 00:41:25,900
So I personally think the one on the right

770
00:41:25,900 --> 00:41:29,980
is more readable, because it's very similar to the way

771
00:41:29,980 --> 00:41:33,659
that we would write the expression mathematically.

772
00:41:33,659 --> 00:41:37,179
But if you had a little bit of time to think about it,

773
00:41:37,179 --> 00:41:39,900
you can just as easily come up with code that does

774
00:41:39,900 --> 00:41:42,300
the exact same job iteratively.

775
00:41:42,300 --> 00:41:44,860
So remember, in iteration, we've got our loop.

776
00:41:44,860 --> 00:41:47,860
There's no other function calls.

777
00:41:47,860 --> 00:41:51,099
We have a loop that iterates some number of times.

778
00:41:51,099 --> 00:41:53,699
There's some sort of loop variable or loop counter.

779
00:41:53,699 --> 00:41:56,619
And there is a state variable that keeps track of the answer

780
00:41:56,619 --> 00:41:57,139
of interest.

781
00:41:57,139 --> 00:42:00,379
In this particular case, the product from one all the way up

782
00:42:00,379 --> 00:42:03,139
to and including it.

783
00:42:03,139 --> 00:42:06,099
So I want to end today's lecture with just a couple

784
00:42:06,099 --> 00:42:07,179
of observations.

785
00:42:07,179 --> 00:42:11,460
So today we saw some really simple examples of recursion.

786
00:42:11,460 --> 00:42:15,259
But I think it outlined some really, really tricky ideas

787
00:42:15,259 --> 00:42:18,579
that people usually have trouble grasping

788
00:42:18,579 --> 00:42:19,699
when you first see recursion.

789
00:42:19,699 --> 00:42:22,059
And that's because you basically write a function

790
00:42:22,059 --> 00:42:23,420
in terms of itself.

791
00:42:23,420 --> 00:42:25,539
And that can be a little bit confusing.

792
00:42:25,539 --> 00:42:28,219
So of course, we applied recursion to some really, really

793
00:42:28,219 --> 00:42:29,380
simple things.

794
00:42:29,380 --> 00:42:32,139
We did multiplication.

795
00:42:32,139 --> 00:42:33,340
And we did factorial.

796
00:42:35,860 --> 00:42:38,500
Depending on how you feel, the recursive version

797
00:42:38,500 --> 00:42:40,539
or the iterative version might be more intuitive for you.

798
00:42:40,539 --> 00:42:42,380
And certainly, for these examples,

799
00:42:42,380 --> 00:42:46,460
you did not need to write them recursively.

800
00:42:46,460 --> 00:42:47,820
There's a lot of code out there

801
00:42:47,820 --> 00:42:50,659
that you actually don't need to implement recursively.

802
00:42:50,659 --> 00:42:53,179
The iterative solution is far more intuitive,

803
00:42:53,179 --> 00:42:56,539
especially since you guys were first introduced to iteration.

804
00:42:56,539 --> 00:42:57,899
You introduced for loops in a while,

805
00:42:57,899 --> 00:43:01,099
loops back in lecture, like three or something like that.

806
00:43:01,099 --> 00:43:03,299
So if that's the first thing you saw,

807
00:43:03,299 --> 00:43:05,099
that's usually the first thing that's

808
00:43:05,099 --> 00:43:05,899
going to be your go-to.

809
00:43:05,899 --> 00:43:08,059
But there are several problems that

810
00:43:08,059 --> 00:43:11,460
are more intuitive to write using recursion.

811
00:43:11,460 --> 00:43:14,940
So a couple of examples where recursion is more intuitive

812
00:43:14,940 --> 00:43:19,299
is any time when you need to repeat a task that, for which

813
00:43:19,299 --> 00:43:23,019
you don't know how deep you need to go.

814
00:43:23,019 --> 00:43:24,980
In which case, the recursive calls

815
00:43:24,980 --> 00:43:27,619
will take care of making calls to itself,

816
00:43:27,619 --> 00:43:28,940
to itself, to itself, to itself,

817
00:43:28,940 --> 00:43:30,259
until it reaches the base case.

818
00:43:30,259 --> 00:43:33,219
You don't need to think about that in your iteration.

819
00:43:33,219 --> 00:43:36,179
So an example of that is this classic one

820
00:43:36,179 --> 00:43:40,099
where we have a file inside a file system.

821
00:43:40,099 --> 00:43:43,780
Someone, if we're looking for a piece at .text,

822
00:43:43,780 --> 00:43:47,500
we can have a student whose piece at .text

823
00:43:47,500 --> 00:43:52,460
is straight under their users slash piece at .text folder.

824
00:43:52,460 --> 00:43:55,740
But we might have another person whose piece at .text

825
00:43:55,740 --> 00:43:58,380
is going to be within their users or documents,

826
00:43:58,380 --> 00:44:01,980
their schools, their MIT, their classes, their 600L,

827
00:44:01,980 --> 00:44:06,220
their piece at one slash piece at .text.

828
00:44:06,220 --> 00:44:08,579
So that uncertainty for how far deep

829
00:44:08,579 --> 00:44:10,500
you need to search the file system

830
00:44:10,500 --> 00:44:12,260
in order to get to the file of interest

831
00:44:12,260 --> 00:44:14,940
is a perfect place to apply recursion.

832
00:44:14,940 --> 00:44:17,539
Another one is where you have an expression.

833
00:44:17,539 --> 00:44:19,619
If you're building your own calculator in code,

834
00:44:19,619 --> 00:44:21,579
and you have order of expressions.

835
00:44:21,579 --> 00:44:25,139
Sorry, order of operations using parentheses.

836
00:44:25,139 --> 00:44:27,179
Again, you don't know how many parentheses

837
00:44:27,179 --> 00:44:30,099
you might need to have a loop go through in order

838
00:44:30,099 --> 00:44:32,539
to get to that base expression, right,

839
00:44:32,539 --> 00:44:34,980
to figure out the one that you need to do first.

840
00:44:34,980 --> 00:44:39,940
And so that's another case where using recursion

841
00:44:39,940 --> 00:44:42,420
is very useful.

842
00:44:42,420 --> 00:44:44,340
So in the next lecture, what we're

843
00:44:44,340 --> 00:44:46,420
going to do is a recap of recursion

844
00:44:46,420 --> 00:44:49,739
using another example, Fibonacci sequence.

845
00:44:49,739 --> 00:44:51,500
And then we're going to start looking

846
00:44:51,500 --> 00:44:55,259
at recursion applied to lists.

847
00:44:55,259 --> 00:44:58,259
And specifically, if we have lists within lists,

848
00:44:58,259 --> 00:44:59,819
within lists, within lists.

849
00:44:59,819 --> 00:45:03,379
And we don't know how many nested lists we might have,

850
00:45:03,379 --> 00:45:05,979
recursion's going to be a perfect example for that.

851
00:45:05,979 --> 00:45:06,979
OK.

