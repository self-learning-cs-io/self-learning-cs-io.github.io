---
title: MIT6100 P16P16RecursiononNon Numerics
---

1
00:00:00,000 --> 00:00:19,080
Let's get started, everybody.

2
00:00:19,080 --> 00:00:23,879
So last lecture we began talking about this topic of recursion.

3
00:00:23,879 --> 00:00:30,719
And it hopefully solidified a few sort of really fundamental ideas about recursion that

4
00:00:30,719 --> 00:00:33,879
we're going to use in today's lecture.

5
00:00:33,879 --> 00:00:40,640
Today's lecture, the first half of it ish, we're going to talk about recursion just kind

6
00:00:40,640 --> 00:00:44,120
of to review on some actual numerical examples.

7
00:00:44,120 --> 00:00:48,340
But then the second half, which is the main event for today, is going to be recursion on

8
00:00:48,340 --> 00:00:49,340
non-numeric.

9
00:00:49,340 --> 00:00:51,920
So specifically recursion on lists.

10
00:00:51,920 --> 00:00:56,400
The techniques we'll see on lists can be applied to other things that are non-numeric

11
00:00:56,400 --> 00:00:59,960
as well, like two pulls or strings or things like that.

12
00:00:59,960 --> 00:01:04,799
So let's start the review of a little bit of review of what we talked about last time

13
00:01:04,799 --> 00:01:07,400
and some of the big ideas by looking at this example.

14
00:01:07,400 --> 00:01:11,879
So we're going to write a recursive function for the Fibonacci sequence.

15
00:01:11,879 --> 00:01:16,480
And the Fibonacci sequence exists in nature in a lot of places.

16
00:01:16,480 --> 00:01:24,760
One specific place is you can model a mating of rabbits using Fibonacci sequence.

17
00:01:24,760 --> 00:01:26,480
But we won't be setting that in depth today.

18
00:01:26,480 --> 00:01:28,640
We're just going to be looking at the sequence itself.

19
00:01:28,640 --> 00:01:35,320
So just to remind you, the idea behind Fibonacci is we start out with two sort of basic values.

20
00:01:35,320 --> 00:01:38,960
Fibonacci of one is one and Fibonacci of two is one.

21
00:01:38,960 --> 00:01:42,560
So in my table here, I've got these two starting values.

22
00:01:42,560 --> 00:01:47,400
And we can fill in the remainder of the table by basically saying Fibonacci of n is Fibonacci

23
00:01:47,400 --> 00:01:50,680
of n minus 1 plus Fibonacci of n minus 2.

24
00:01:50,680 --> 00:01:52,920
So Fibonacci of three will be 1 plus 1.

25
00:01:52,920 --> 00:01:55,120
Fibonacci of four will be 2 plus 1.

26
00:01:55,120 --> 00:01:56,920
Fibonacci of five is 3 plus 2.

27
00:01:56,920 --> 00:01:59,000
Fibonacci of six is 5 plus 3.

28
00:01:59,000 --> 00:02:01,200
And Fibonacci of seven is 8 plus 5.

29
00:02:01,200 --> 00:02:05,359
That's the sequence we all know and love.

30
00:02:05,359 --> 00:02:09,960
Okay, so our two base cases, if we're going to put this in sort of mathematical terms,

31
00:02:09,960 --> 00:02:11,680
our Fibonacci of one is one.

32
00:02:11,680 --> 00:02:13,920
Fibonacci of two is one.

33
00:02:13,920 --> 00:02:20,240
And our recursive step, in terms of the math and slash programming,

34
00:02:20,240 --> 00:02:26,960
Lingo is going to be the Fibonacci of n is equal to Fibonacci of n minus 1 plus Fibonacci of n minus 2.

35
00:02:26,960 --> 00:02:29,240
So we put that in our function.

36
00:02:29,240 --> 00:02:35,280
So we slap a definition around that code and turn it into a nice function that we can run.

37
00:02:35,280 --> 00:02:38,680
If x is 1 or x is 2, those are our two base cases.

38
00:02:38,680 --> 00:02:41,000
We just return 1 right off the bat.

39
00:02:41,000 --> 00:02:43,400
Nothing to call, no functions to call.

40
00:02:43,400 --> 00:02:44,840
There are base cases.

41
00:02:44,840 --> 00:02:48,719
But otherwise, we're going to return a value.

42
00:02:48,719 --> 00:02:54,520
And the thing we're going to return is it call to Fibonacci of n minus 1 plus Fibonacci of n minus 2.

43
00:02:54,520 --> 00:02:58,159
Just like the mathematical definition said to do.

44
00:02:58,159 --> 00:03:01,400
Okay, so this is different than what we saw last lecture,

45
00:03:01,400 --> 00:03:03,200
last lecture in our recursive step.

46
00:03:03,200 --> 00:03:06,840
We had basically just one function called to ourselves.

47
00:03:06,840 --> 00:03:13,560
So whatever function we had to find up here, we only had return some variation of that function down here

48
00:03:13,560 --> 00:03:18,400
with something else tacked onto it, like an addition of some value or something else.

49
00:03:18,400 --> 00:03:22,800
In this case, we actually have the function being called twice.

50
00:03:22,800 --> 00:03:29,280
Okay, so we're going to see what implications this has as we trace through the code.

51
00:03:29,280 --> 00:03:35,960
And so as I trace through the code, I'll remind you of some of the big ideas that we learned last lecture.

52
00:03:35,960 --> 00:03:39,760
So let's say that we wanted to calculate Fibonacci of 6.

53
00:03:39,760 --> 00:03:48,120
And so I'm going to illustrate a function call just by the name of the function with the parameter that I'm calling.

54
00:03:48,120 --> 00:03:55,719
So one of the big ideas from last lecture was that when you make a function call to a function that's recursive,

55
00:03:55,719 --> 00:04:01,480
you're going to trace through that function call and then environment for that function just as you normally would.

56
00:04:01,479 --> 00:04:07,719
But as soon as you see another function call, so in this case, Fibonacci of 6 doesn't enter the base cases,

57
00:04:07,719 --> 00:04:10,639
it goes up into the recursive step.

58
00:04:10,639 --> 00:04:16,959
And it says, I'm going to calculate Fibonacci of x minus 1 plus Fibonacci of x minus 2.

59
00:04:16,959 --> 00:04:23,639
So for this Fibonacci of 6 function call, let's follow along and say, well, Fibonacci of 6,

60
00:04:23,639 --> 00:04:29,800
we'll say, I want to calculate Fibonacci of 5.

61
00:04:29,800 --> 00:04:39,000
Is it, this is my question to you, is it going to now calculate Fibonacci of 4?

62
00:04:39,000 --> 00:04:41,400
No, very good.

63
00:04:41,400 --> 00:04:45,400
Because Fibonacci of 5 is a function call, right?

64
00:04:45,400 --> 00:04:52,120
We need to explore what this function will return before Fibonacci of 6 can add the result of this,

65
00:04:52,120 --> 00:04:56,000
the return of this to Fibonacci of 4.

66
00:04:56,000 --> 00:05:04,000
So that means that this new Fib 5 is an entirely new environment calling Fibonacci with n is equal to 5,

67
00:05:04,000 --> 00:05:07,360
completely separate than our original Fibonacci of 6 call.

68
00:05:07,360 --> 00:05:09,839
So let's explore what Fibonacci of 5 is going to do.

69
00:05:09,839 --> 00:05:13,800
Well, in its function call, it's going to again go in the recursive step.

70
00:05:13,800 --> 00:05:16,759
It's going to figure out Fibonacci of 4.

71
00:05:16,759 --> 00:05:18,199
And then it's going to pause there, right?

72
00:05:18,199 --> 00:05:22,439
Because it needs to figure out what Fibonacci of 4 is before it finishes its other half, right?

73
00:05:22,439 --> 00:05:25,079
To do Fibonacci of 3.

74
00:05:25,079 --> 00:05:27,680
So Fibonacci of 4 will now create a new environment.

75
00:05:27,680 --> 00:05:30,199
And now it has to explore its result of return.

76
00:05:30,199 --> 00:05:37,240
So it figures out Fibonacci of 4 is again going into the recursive step to calculate Fibonacci of 3 plus something.

77
00:05:37,240 --> 00:05:42,319
But we don't know what that something is yet, because we have to explore what Fibonacci of 3 is, right?

78
00:05:42,319 --> 00:05:46,399
So already where 4 function calls deep and we haven't really done any work,

79
00:05:46,399 --> 00:05:49,399
and any work that we can see the result of, right?

80
00:05:49,399 --> 00:05:51,680
There's no values being passed back.

81
00:05:51,680 --> 00:05:58,800
All we're doing is exploring this path down until we get to some sort of base case that will kick off our,

82
00:05:58,800 --> 00:06:02,879
our sort of conquer step where we pass values back up the chain.

83
00:06:04,079 --> 00:06:08,319
So Fibonacci of 3 again is going to look at Fibonacci of 2.

84
00:06:08,319 --> 00:06:13,040
And finally, we've reached a base case.

85
00:06:13,040 --> 00:06:15,680
So Fibonacci of 2 will immediately return, right?

86
00:06:15,680 --> 00:06:17,600
It doesn't make another function call.

87
00:06:17,600 --> 00:06:19,920
So Fibonacci of 2 will return a value.

88
00:06:19,920 --> 00:06:27,920
And then Fibonacci of 3 in its function call has the result for Fibonacci of 2.

89
00:06:27,920 --> 00:06:32,759
And then it's going to do plus that value plus Fibonacci of 1, right?

90
00:06:32,759 --> 00:06:33,920
Three minus 2.

91
00:06:33,920 --> 00:06:35,400
So that's this one here.

92
00:06:35,400 --> 00:06:42,520
It can easily grab the, do that addition and return the value back up to Fibonacci of 3.

93
00:06:42,520 --> 00:06:49,879
So now Fibonacci of 3 has its first half ready, right?

94
00:06:49,920 --> 00:06:56,600
So Fibonacci of 4, sorry, so Fibonacci of 4 has its first half ready, Fibonacci of 3.

95
00:06:56,600 --> 00:07:01,719
So Fibonacci of 4 was trying to figure out what Fib 3 was and it did, right?

96
00:07:01,719 --> 00:07:03,839
It was Fib 2 plus Fib 1, too.

97
00:07:03,839 --> 00:07:12,600
So now it has a value for its first half here and it needs to add that value to Fibonacci of 2, 4 minus 2.

98
00:07:12,600 --> 00:07:16,360
So it will explore that path, that's a base case.

99
00:07:16,360 --> 00:07:23,319
So all it does is return the value immediately and now Fibonacci of 4 has its value, whatever Fib 3 was,

100
00:07:23,319 --> 00:07:25,360
that we figured out plus Fib 2.

101
00:07:25,360 --> 00:07:32,240
Okay. Now Fib 4, we have a value for it when we called Fib 5.

102
00:07:32,240 --> 00:07:37,439
So Fib 5 is now halfway happy because it knows what Fib 4 is.

103
00:07:37,439 --> 00:07:41,040
But it needs to add that to Fib 3.

104
00:07:41,040 --> 00:07:44,639
So Fib 5 is still halted, right?

105
00:07:44,639 --> 00:07:48,919
It can't return anything because it now it needs to explore what Fib 3 is.

106
00:07:48,919 --> 00:07:53,039
Well, Fib 3 is going to be,

107
00:07:55,199 --> 00:07:57,199
do another function call, right?

108
00:07:57,199 --> 00:08:01,599
So it's going to call Fib 2 and Fib 1, which are two base cases,

109
00:08:01,599 --> 00:08:04,319
which easily return the value back up to Fib 3.

110
00:08:04,319 --> 00:08:09,399
And now Fib 5 is happy because it knows this value and now it knows this value.

111
00:08:09,399 --> 00:08:14,599
It can add them together and Fib 5 now has a value that it can keep track of.

112
00:08:14,640 --> 00:08:18,400
And now finally, Fib 6, we're not even close to being done.

113
00:08:18,400 --> 00:08:24,960
You guys, Fib 6 has a Fib 5 value, so it has half of the things it needs to figure out what Fib 6 is.

114
00:08:24,960 --> 00:08:27,879
Because now it has to figure out what Fib 4 is.

115
00:08:27,879 --> 00:08:30,280
And already you can tell what we're going to do next.

116
00:08:30,280 --> 00:08:33,879
We're going to start exploring the exact same way like we did before.

117
00:08:33,879 --> 00:08:36,200
Fib 4 needs to calculate Fib 3.

118
00:08:36,200 --> 00:08:40,920
It can't do Fib 2 yet because Fib 3 needs to calculate Fib 2 and Fib 1, right?

119
00:08:40,919 --> 00:08:42,559
Pass back up the value.

120
00:08:42,559 --> 00:08:46,919
Fib 4 can now finish its job by calculating Fib 3 and Fib 2.

121
00:08:46,919 --> 00:08:48,199
Pass up the value.

122
00:08:48,199 --> 00:08:51,719
And now finally, Fib 6 has its two halves here.

123
00:08:51,719 --> 00:08:56,240
Fib 5 and Fib 4, and it can add them together and return the value.

124
00:08:56,240 --> 00:08:57,279
OK.

125
00:08:57,279 --> 00:09:04,599
So a super inefficient algorithm, because there's a lot of sort of stuff going on,

126
00:09:04,599 --> 00:09:08,039
but not much work being done until the end, right?

127
00:09:08,039 --> 00:09:10,199
We've got a bunch of base cases we get to.

128
00:09:10,200 --> 00:09:13,360
And then we can start building back up our result.

129
00:09:13,360 --> 00:09:18,280
And the reason why I say it's inefficient is because, well, we're exploring these paths.

130
00:09:18,280 --> 00:09:25,440
And as we go along the way, right, we figure out what Fib 3 is and what Fib 4 is, right?

131
00:09:25,440 --> 00:09:30,560
But then when we explore the right half of Fib 6 over here,

132
00:09:30,560 --> 00:09:34,320
we're actually recalculating these values all over again.

133
00:09:34,320 --> 00:09:36,160
That's why I said we're not even halfway done.

134
00:09:36,160 --> 00:09:39,879
Because when we got Fib 5, we had to explore Fib 4.

135
00:09:39,879 --> 00:09:45,879
And Fib 4, this branch down here, is basically a copy of this one down here.

136
00:09:45,879 --> 00:09:46,480
OK.

137
00:09:46,480 --> 00:09:52,439
So there's a lot of work being done here, where you just do the same thing over and over again.

138
00:09:52,439 --> 00:09:58,840
And so that leads me to say, well, what if we didn't have to do all this work all over again?

139
00:09:58,840 --> 00:09:59,360
Right?

140
00:09:59,360 --> 00:10:04,799
If only there was some sort of data structure that we could use to keep track of things

141
00:10:04,799 --> 00:10:07,159
as we calculate them, right?

142
00:10:07,159 --> 00:10:08,159
Right?

143
00:10:08,159 --> 00:10:10,639
To basically map one thing to another.

144
00:10:10,639 --> 00:10:16,519
So if we already calculated Fib 4 to be some value, why don't we just look it up?

145
00:10:16,519 --> 00:10:23,839
So anytime we use things like keeping track of and looking things up, that should ring a

146
00:10:23,839 --> 00:10:27,679
little bell that says dictionaries can help us do that.

147
00:10:27,679 --> 00:10:33,600
And so what we can do is actually write a more efficient Fibonacci recursive Fibonacci function

148
00:10:33,600 --> 00:10:41,600
that uses, it's still recursive, but it uses dictionaries to keep track of values as we calculate them.

149
00:10:41,600 --> 00:10:42,600
OK.

150
00:10:42,600 --> 00:10:46,519
And so this is the Fibonacci efficient function.

151
00:10:46,519 --> 00:10:49,040
So my name is Fib efficient.

152
00:10:49,040 --> 00:10:52,159
Notice we're still calculating Fibonacci of some n.

153
00:10:52,159 --> 00:10:55,680
But we're going to pass in another parameter, a dictionary.

154
00:10:55,680 --> 00:11:00,360
And this dictionary will keep track of the Fibonacci values as we calculate them.

155
00:11:00,360 --> 00:11:01,399
Calculate them.

156
00:11:01,399 --> 00:11:05,720
So the key will be the n, and the value will be Fib of that n.

157
00:11:05,720 --> 00:11:06,720
OK.

158
00:11:06,720 --> 00:11:14,720
And so down here you can see we're going to initialize a dictionary that has Fib of 1 maps to 1, and Fib of 2 maps to 1.

159
00:11:14,720 --> 00:11:18,559
Those are our base cases.

160
00:11:18,559 --> 00:11:24,519
So let's take a look at our Fibonacci recursive function now that uses dictionaries.

161
00:11:24,519 --> 00:11:30,840
No longer do we need to think about the base cases as Fibonacci of 1 is this and Fibonacci of 2 is this.

162
00:11:30,840 --> 00:11:35,840
Now all we need to do is say, well, let's look up the value in our dictionary.

163
00:11:35,840 --> 00:11:38,519
That's what our base case will be.

164
00:11:38,519 --> 00:11:43,480
And we don't need to make a call to ourselves if the item is already in the dictionary.

165
00:11:43,480 --> 00:11:53,800
So we can just return the value associated with n in dictionary D if that n is already in the dictionary.

166
00:11:53,800 --> 00:11:58,560
So our two base cases down here will initially be in our dictionary.

167
00:11:58,559 --> 00:12:02,479
And as we figure out the values of Fibonacci will add them to the dictionary.

168
00:12:02,479 --> 00:12:05,679
And that's exactly what the recursive step will do.

169
00:12:05,679 --> 00:12:11,079
So else, the values not in our dictionary, so unfortunately we have to calculate it, right?

170
00:12:11,079 --> 00:12:11,879
Which is fine.

171
00:12:11,879 --> 00:12:17,319
We'll basically do that the first time through that sort of exploring the left half of our path.

172
00:12:17,319 --> 00:12:20,679
But that's pretty much the only times that we're going to calculate it.

173
00:12:20,679 --> 00:12:23,639
All the other times we'll just look it up.

174
00:12:23,639 --> 00:12:26,720
So this is going to be a little different than what we've seen before,

175
00:12:26,720 --> 00:12:33,519
because I'm not right off the bat returning Fibonacci of 1 plus Fibonacci of 2.

176
00:12:33,519 --> 00:12:39,840
I'm actually still running the same recursive step Fibonacci of 1 plus Fibonacci of 2.

177
00:12:39,840 --> 00:12:41,639
But I'm saving it in a variable.

178
00:12:41,639 --> 00:12:45,080
And that's totally fine to do.

179
00:12:45,080 --> 00:12:49,360
And then before I actually return this value, let me add it to my dictionary.

180
00:12:49,360 --> 00:12:54,080
So this is simply just saying this dictionary at this particular end,

181
00:12:54,080 --> 00:12:57,600
for this particular function, is equal to this thing that I just calculated.

182
00:12:57,600 --> 00:13:01,919
Just a straight up dictionary addition, adding this item to the dictionary.

183
00:13:03,279 --> 00:13:07,720
And then after I've added it to my dictionary, I can return that value.

184
00:13:07,720 --> 00:13:12,399
So still passing it back up the chain of function calls, but we'll save it first.

185
00:13:14,240 --> 00:13:15,320
Everyone okay with this code?

186
00:13:16,320 --> 00:13:24,080
Okay, so then this is the dictionary I mentioned where we initialize our two base cases,

187
00:13:24,080 --> 00:13:26,120
and then we can print the function.

188
00:13:26,120 --> 00:13:31,720
So let's trace through the code to see what exactly happens with these function calls now.

189
00:13:31,720 --> 00:13:35,640
So we're initializing our dictionary where we have N1,

190
00:13:35,640 --> 00:13:39,320
Fibonacci of 1 is 1, and N2, Fibonacci of 2 is 1, right?

191
00:13:39,320 --> 00:13:40,280
Our base cases.

192
00:13:40,280 --> 00:13:44,880
Fibonacci of 6 again, we're doing the same function calls, right?

193
00:13:44,879 --> 00:13:48,439
So that means there's nothing stored for Fib 5,

194
00:13:48,439 --> 00:13:52,120
so we still have to explore what value it will be.

195
00:13:52,120 --> 00:13:55,639
Nothing stored for Fib 4, we're still exploring, nothing stored for Fib 3,

196
00:13:55,639 --> 00:13:58,600
we're still exploring, we've reached a base case.

197
00:13:58,600 --> 00:14:03,559
So now, the first thing we do is check if it's in the dictionary.

198
00:14:03,559 --> 00:14:06,759
It is, so we just return the one directly.

199
00:14:06,759 --> 00:14:09,639
Check if the other half is in the dictionary, return the one directly,

200
00:14:09,639 --> 00:14:12,440
and now we've got a value for Fib 3.

201
00:14:12,440 --> 00:14:15,760
Before returning it, let's store it in our dictionary.

202
00:14:15,760 --> 00:14:18,080
So I just calculated what Fib 3 was.

203
00:14:18,080 --> 00:14:23,080
Let's put it in, the key is 3, and Fib 3 is 2.

204
00:14:23,080 --> 00:14:27,680
Okay? So far so good, it's pretty similar what we've done before,

205
00:14:27,680 --> 00:14:30,120
except that we're storing this value in the dictionary.

206
00:14:30,120 --> 00:14:33,520
So now we explore the right half of this Fib 4, right?

207
00:14:33,520 --> 00:14:36,720
Fib 3 plus Fib 2, it's already in the dictionary,

208
00:14:36,720 --> 00:14:40,280
so it immediately returns this addition.

209
00:14:40,279 --> 00:14:44,079
Now we know what Fib 4 is, so we added to our dictionary.

210
00:14:44,079 --> 00:14:47,039
Fib 4 is 3.

211
00:14:47,039 --> 00:14:49,399
Explore the right part of Fib 5, right?

212
00:14:49,399 --> 00:14:53,319
So Fib 4 plus Fib 3, do we go further now?

213
00:14:53,319 --> 00:14:55,839
Right? In the previous case, we explored 2 and 1.

214
00:14:55,839 --> 00:14:58,000
In this case, do we keep exploring?

215
00:14:58,000 --> 00:15:00,199
No, exactly, because our base case says,

216
00:15:00,199 --> 00:15:02,319
if 3 is already in the dictionary,

217
00:15:02,319 --> 00:15:04,919
simply return the value associated with it.

218
00:15:04,919 --> 00:15:06,279
So, yep, there it is right there.

219
00:15:06,279 --> 00:15:07,679
We added it a while ago.

220
00:15:07,679 --> 00:15:12,120
We just return the 2 immediately, no need to go down this path.

221
00:15:12,120 --> 00:15:16,519
Okay? So now Fib 5 is done pretty quickly, so the right half,

222
00:15:16,519 --> 00:15:18,639
so that means we have the value for Fib 5,

223
00:15:18,639 --> 00:15:20,479
and we added to a dictionary.

224
00:15:20,479 --> 00:15:22,879
We explore the right half of Fib 6.

225
00:15:22,879 --> 00:15:25,719
Remember beforehand, I said, when we were not done,

226
00:15:25,719 --> 00:15:28,599
we don't need to explore this Fib 4 anymore,

227
00:15:28,599 --> 00:15:32,000
because we added it to our dictionary long ago.

228
00:15:32,000 --> 00:15:35,759
So now all we need to do is look up the value associated with 4,

229
00:15:35,759 --> 00:15:37,159
from our dictionary.

230
00:15:38,120 --> 00:15:42,279
So, boom, there it is, and then we can just add Fib 5 and Fib 4 together,

231
00:15:42,279 --> 00:15:44,439
and get the value for Fib 6,

232
00:15:44,439 --> 00:15:46,879
store it in the dictionary, and this case,

233
00:15:46,879 --> 00:15:49,719
it's the end, we don't need to do anything else with this value,

234
00:15:49,719 --> 00:15:51,360
passing it back or anything like that.

235
00:15:51,360 --> 00:15:56,480
Okay? So, we're not recalculating anything else, right?

236
00:15:56,480 --> 00:15:58,799
We're just checking the dictionary, and if need be,

237
00:15:58,799 --> 00:15:59,719
we calculated.

238
00:15:59,719 --> 00:16:04,720
So, it's an improvement, but how much of an improvement is it,

239
00:16:04,720 --> 00:16:06,079
actually?

240
00:16:06,080 --> 00:16:09,560
So, if we run this function, and it's in the Python code,

241
00:16:09,560 --> 00:16:11,480
you can play around with it yourself.

242
00:16:11,480 --> 00:16:15,639
If you run the function that we originally wrote, Fib,

243
00:16:15,639 --> 00:16:18,759
the one where we don't store anything in dictionary,

244
00:16:18,759 --> 00:16:21,639
if we try to calculate Fib 1acci of 34,

245
00:16:23,360 --> 00:16:26,720
it results in 11.5 million function calls.

246
00:16:28,080 --> 00:16:30,160
That's a lot of function calls,

247
00:16:30,160 --> 00:16:34,160
because even Fib 6 had Fib 3 being called twice,

248
00:16:34,159 --> 00:16:36,919
Fib 3 being called three times,

249
00:16:36,919 --> 00:16:39,279
Fib 4 being called twice, and so on.

250
00:16:39,279 --> 00:16:42,759
So, can you imagine how many times Fib 3 will be called

251
00:16:42,759 --> 00:16:45,120
when we are trying to calculate Fib 34?

252
00:16:45,120 --> 00:16:48,360
Probably thousands, if not more.

253
00:16:48,360 --> 00:16:51,799
Right? So, overall, the number of function calls we're making

254
00:16:51,799 --> 00:16:54,559
is 11.5 million with our original code,

255
00:16:54,559 --> 00:16:59,559
but the efficient version only makes 65.

256
00:16:59,559 --> 00:17:03,360
It's not like we went from 11.5 million to,

257
00:17:03,360 --> 00:17:05,240
like, two million.

258
00:17:05,240 --> 00:17:09,519
Right? We went from the order of millions to tens,

259
00:17:09,519 --> 00:17:13,160
which is really, really impressive in terms of speed.

260
00:17:13,160 --> 00:17:14,519
So, if you try to run this program,

261
00:17:14,519 --> 00:17:17,279
it'll take a couple seconds for Fib 34,

262
00:17:17,279 --> 00:17:20,120
but the efficient one will be instant.

263
00:17:20,120 --> 00:17:23,440
And all of these function calls have some overhead, right?

264
00:17:23,440 --> 00:17:25,319
You need to create an environment in Python,

265
00:17:25,319 --> 00:17:27,120
and it needs to pass these parameters.

266
00:17:27,120 --> 00:17:30,279
So, all of these function calls take a lot of time,

267
00:17:30,279 --> 00:17:34,240
whereas a dictionary lookup is basically instantaneous, right?

268
00:17:34,240 --> 00:17:38,359
So, in this particular case, we've given up some of our memory

269
00:17:38,359 --> 00:17:40,519
to store values, right?

270
00:17:40,519 --> 00:17:43,839
The dictionary is storing 34 entries, which is not much,

271
00:17:43,839 --> 00:17:47,559
but there are applications where you can't spare 34 entries,

272
00:17:47,559 --> 00:17:50,440
right, in your memory, in which case,

273
00:17:50,440 --> 00:17:54,559
you might, you know, spare some time to continue calculating

274
00:17:54,559 --> 00:17:55,680
without taking up some memory.

275
00:17:55,680 --> 00:17:57,000
So, there's a little bit of trade-off

276
00:17:57,000 --> 00:17:58,799
between these two programs, right?

277
00:17:58,799 --> 00:18:01,119
One of them doesn't store anything but is slow.

278
00:18:01,119 --> 00:18:03,599
The other one stores things, but is fast.

279
00:18:04,720 --> 00:18:05,720
Okay.

280
00:18:05,720 --> 00:18:10,440
Let's look at one more example where we do Fibonacci on numerics,

281
00:18:10,440 --> 00:18:13,159
and this, I don't know when you'd use Fibonacci

282
00:18:13,159 --> 00:18:17,200
in your real life, but knowing all the possible ways

283
00:18:17,200 --> 00:18:18,839
you can make a score of X,

284
00:18:18,839 --> 00:18:21,359
it basketball is a little bit more useful.

285
00:18:21,359 --> 00:18:24,559
So, let's think about this problem recursively.

286
00:18:24,559 --> 00:18:26,680
Certainly, we could do it iteratively

287
00:18:26,680 --> 00:18:29,720
and brute force our way through all the possible combinations

288
00:18:29,720 --> 00:18:31,279
of scores, right?

289
00:18:31,279 --> 00:18:34,480
So, in basketball, you can make a basket that's worth 1.2,

290
00:18:34,480 --> 00:18:35,400
points or three points.

291
00:18:35,400 --> 00:18:37,279
So, you can think about all the possible combinations

292
00:18:37,279 --> 00:18:40,320
you can make to give you some score of X.

293
00:18:42,200 --> 00:18:44,440
We're gonna think about this problem recursively, right?

294
00:18:44,440 --> 00:18:47,200
So, let's start with our base cases.

295
00:18:47,200 --> 00:18:48,680
Okay.

296
00:18:48,680 --> 00:18:50,759
Base cases, we've got three of them.

297
00:18:51,759 --> 00:18:54,279
So, if we think about a score of one,

298
00:18:54,279 --> 00:18:55,640
so if X is equal to one,

299
00:18:55,640 --> 00:18:58,640
so that means if we have a score of one in basketball,

300
00:18:58,640 --> 00:19:01,440
what are all the possible ways we could have made a one?

301
00:19:01,440 --> 00:19:04,800
Well, you could just score one point, and then that's it, right?

302
00:19:04,800 --> 00:19:06,840
I just did one plus C or just emphasized

303
00:19:06,840 --> 00:19:08,800
that we're just scoring one in nothing.

304
00:19:09,800 --> 00:19:11,920
If we make a basket, that's worth two points,

305
00:19:11,920 --> 00:19:13,880
or if we have two points in basketball,

306
00:19:13,880 --> 00:19:17,000
what are all the possible ways we could have made two?

307
00:19:17,000 --> 00:19:19,360
Well, we could have scored a one and a one,

308
00:19:19,360 --> 00:19:21,440
or we could have just scored two right off the bat.

309
00:19:21,440 --> 00:19:25,120
So, that's two possible ways to make a score of two, right?

310
00:19:25,920 --> 00:19:28,000
And similarly, to make a score of three,

311
00:19:28,000 --> 00:19:29,320
what are all the possible ways?

312
00:19:29,320 --> 00:19:32,000
Well, we could have scored a one, then a one, then a one.

313
00:19:32,000 --> 00:19:33,680
We could have scored a two and a one,

314
00:19:33,680 --> 00:19:35,560
or we could have scored a three right off the bat.

315
00:19:35,560 --> 00:19:37,880
So, that's three different ways you can make a score

316
00:19:37,880 --> 00:19:39,720
of three in basketball.

317
00:19:42,360 --> 00:19:43,600
Everyone with me so far.

318
00:19:43,600 --> 00:19:45,080
These are our base cases, okay?

319
00:19:46,400 --> 00:19:49,200
Because the recursive step will be very,

320
00:19:49,200 --> 00:19:51,400
will blow your minds, it's so simple, okay?

321
00:19:51,400 --> 00:19:54,840
So, the recursive step looks like this.

322
00:19:56,240 --> 00:19:57,240
Okay.

323
00:19:57,240 --> 00:20:02,080
Now, somebody give me, what's a reasonable basketball score?

324
00:20:02,080 --> 00:20:04,560
Like, for a team, 87?

325
00:20:04,560 --> 00:20:05,800
Okay.

326
00:20:05,800 --> 00:20:09,480
It's been probably 25 years since I've played

327
00:20:09,480 --> 00:20:11,480
pro basketball in grade five, you guys.

328
00:20:11,480 --> 00:20:14,200
So, I forgot what's a reasonable score.

329
00:20:14,200 --> 00:20:15,800
All right, so 87.

330
00:20:15,800 --> 00:20:18,640
So, let's say now, we're not dealing with our base case.

331
00:20:18,640 --> 00:20:21,680
We're dealing with some number that's bigger

332
00:20:21,680 --> 00:20:23,600
than one of these base cases.

333
00:20:23,599 --> 00:20:25,879
How do we think about this problem recursively?

334
00:20:27,399 --> 00:20:30,279
Well, there's three possibilities, right?

335
00:20:30,279 --> 00:20:32,439
If I have a final score of 87,

336
00:20:33,279 --> 00:20:38,279
let's say that I think about the score of 86, right?

337
00:20:40,839 --> 00:20:44,559
If I know all the possible ways I can make a score of 86,

338
00:20:45,399 --> 00:20:50,279
all I need to do is add one to that score, right?

339
00:20:50,279 --> 00:20:53,079
It'll give me 87, right?

340
00:20:53,079 --> 00:20:56,159
So, that's one possibility here.

341
00:20:56,159 --> 00:20:59,639
But that's not the only possibility, right?

342
00:20:59,639 --> 00:21:03,159
Because I could have a score of 85,

343
00:21:04,119 --> 00:21:08,279
and if I add two to that 85, not two counts, right?

344
00:21:08,279 --> 00:21:09,119
Just the score.

345
00:21:09,119 --> 00:21:11,119
If I have an original score of 85,

346
00:21:11,119 --> 00:21:13,159
if I just add two to that score,

347
00:21:13,159 --> 00:21:16,480
it gives me my desired score of 87.

348
00:21:16,480 --> 00:21:20,359
So, if I know the possible combinations to make 85,

349
00:21:20,359 --> 00:21:22,240
then I know that all I need to do

350
00:21:22,240 --> 00:21:26,079
is, you know, add a two to my score, and that'll give me 87.

351
00:21:26,079 --> 00:21:32,079
And then the last possibility is to know all the possible ways

352
00:21:32,400 --> 00:21:34,960
to make 84, a score of 84,

353
00:21:34,960 --> 00:21:37,160
because then I would just add a score,

354
00:21:37,160 --> 00:21:41,000
I would take that score and add a three to it to give me 87, right?

355
00:21:41,000 --> 00:21:46,000
So, I'm sort of using my base cases to guide my recursive step.

356
00:21:46,599 --> 00:21:50,759
So, the number of ways I can make a score of 87

357
00:21:50,759 --> 00:21:54,519
is the sum of all the possible ways I can make 86,

358
00:21:54,519 --> 00:21:58,160
or 85, or 84, right?

359
00:21:59,400 --> 00:22:01,640
Because if I made 86, I would just add one to it,

360
00:22:01,640 --> 00:22:03,039
if I made 85, I had two to it,

361
00:22:03,039 --> 00:22:05,519
and if I made 84, I'd add three to the score.

362
00:22:07,000 --> 00:22:11,319
So, that's essentially what this recursive step is doing, right?

363
00:22:11,319 --> 00:22:14,920
I've got, these are all the possible ways I can make a score of 80,

364
00:22:14,920 --> 00:22:16,720
you know, x minus one, right?

365
00:22:16,720 --> 00:22:18,000
So, 87, 86.

366
00:22:18,880 --> 00:22:21,240
And that's just me calling my function, right?

367
00:22:21,240 --> 00:22:23,759
So, score count x minus one, score count x.

368
00:22:24,759 --> 00:22:27,440
Plus all the possible ways to make a score of x minus two.

369
00:22:28,640 --> 00:22:31,559
Plus all the possible ways to make a score of x minus three.

370
00:22:31,559 --> 00:22:34,400
So, if I add all these three ways together,

371
00:22:34,400 --> 00:22:38,319
I would get all the possible ways I can make a score of x.

372
00:22:40,920 --> 00:22:41,640
Does that make sense?

373
00:22:43,880 --> 00:22:44,400
Okay.

374
00:22:45,640 --> 00:22:47,319
So, that's it, right?

375
00:22:47,319 --> 00:22:48,639
It's pretty clean code.

376
00:22:48,639 --> 00:22:50,480
It looks really nice.

377
00:22:50,480 --> 00:22:52,960
If we were to write this iteratively, it would be a mess.

378
00:22:53,960 --> 00:22:56,799
Because we probably have a whole bunch of nested loops

379
00:22:56,799 --> 00:22:59,359
to try to brute force all the possible combinations

380
00:22:59,359 --> 00:23:00,519
of scores that we can make.

381
00:23:01,480 --> 00:23:04,879
And it wouldn't look very, very nice, very pithonic.

382
00:23:08,519 --> 00:23:12,079
So, let's do a trace of this code, just to, you know,

383
00:23:12,079 --> 00:23:13,879
to bring it all together.

384
00:23:13,879 --> 00:23:16,559
The trace will be very similar to the Fibonacci trace.

385
00:23:16,559 --> 00:23:19,480
Except that now we have three paths to explore

386
00:23:19,480 --> 00:23:22,159
before having a return value, right?

387
00:23:22,159 --> 00:23:27,079
So, for a score of six, I would explore how can I make a score of five?

388
00:23:27,079 --> 00:23:30,879
And of course, I will explore how can I make a score of four in three,

389
00:23:30,879 --> 00:23:33,079
but I'm not there yet, right?

390
00:23:33,079 --> 00:23:35,039
First, I need to explore how to make a score of five,

391
00:23:35,039 --> 00:23:36,480
which is a function call.

392
00:23:36,480 --> 00:23:39,000
This one will explore how to make a score of four,

393
00:23:39,000 --> 00:23:42,000
and of course, a three and a two, but not just yet.

394
00:23:42,000 --> 00:23:45,599
A score of four will lead us to our base cases.

395
00:23:45,599 --> 00:23:48,759
It's just how to make a score of three in a two and a one.

396
00:23:48,759 --> 00:23:50,199
These are base cases.

397
00:23:50,199 --> 00:23:53,240
They immediately return, and we know how to make a score of four.

398
00:23:53,240 --> 00:23:55,039
A score of three is also base case,

399
00:23:55,039 --> 00:23:56,639
and a score of two is also base case.

400
00:23:56,639 --> 00:23:59,719
So, these ones will immediately return to give us the score of five.

401
00:24:00,959 --> 00:24:02,519
So, now we know how to make a score of five.

402
00:24:02,519 --> 00:24:05,159
We need to follow through how to make a score of four,

403
00:24:05,159 --> 00:24:07,240
which is just three and two and one.

404
00:24:07,240 --> 00:24:09,240
Oops, I should change that to be a one.

405
00:24:10,240 --> 00:24:12,799
And then how to make a score of three,

406
00:24:12,799 --> 00:24:15,000
and that's just a base case.

407
00:24:15,119 --> 00:24:18,920
So, very similar trace as the Fibonacci code.

408
00:24:21,599 --> 00:24:24,720
All right, questions about those examples.

409
00:24:25,880 --> 00:24:26,720
Are they okay?

410
00:24:26,720 --> 00:24:28,799
Do they make sense?

411
00:24:28,799 --> 00:24:29,640
Okay.

412
00:24:30,960 --> 00:24:34,519
So, there is one exercise in the Python file.

413
00:24:34,519 --> 00:24:37,000
It's for at home.

414
00:24:37,000 --> 00:24:40,359
I would like you to try to memoize this code.

415
00:24:40,359 --> 00:24:43,640
So, memoize means basically try to use a memo,

416
00:24:43,640 --> 00:24:47,840
a dictionary, to store values as you calculate them.

417
00:24:47,840 --> 00:24:50,400
Because you see that it's going to be just as inefficient

418
00:24:50,400 --> 00:24:51,920
as the Fibonacci code, right?

419
00:24:51,920 --> 00:24:54,480
So, here we're calculating score of four again,

420
00:24:54,480 --> 00:24:58,200
where we had calculated it way back here, right?

421
00:24:58,200 --> 00:25:02,520
And so, try your hand at adding a dictionary to this code

422
00:25:02,520 --> 00:25:04,640
to try to speed it up.

423
00:25:06,840 --> 00:25:10,680
Okay, so the next, the second half of this lecture,

424
00:25:10,680 --> 00:25:14,160
we're now going to move away from recursion on numbers

425
00:25:14,160 --> 00:25:17,519
and sort of having these nice mathematical operations

426
00:25:17,519 --> 00:25:20,080
that we can just translate to code easily,

427
00:25:20,080 --> 00:25:25,160
and start looking at recursion on numerical things.

428
00:25:25,160 --> 00:25:26,920
And we're just going to look at lists.

429
00:25:26,920 --> 00:25:30,000
But again, as I said, you can apply these very similar codes

430
00:25:30,000 --> 00:25:33,160
to any sequences of values,

431
00:25:33,160 --> 00:25:35,640
tuples or strings or things like that.

432
00:25:37,000 --> 00:25:38,880
So, the reason why we're looking at lists

433
00:25:38,880 --> 00:25:40,800
is because lists are naturally recursive.

434
00:25:40,800 --> 00:25:44,600
So, one of the motivations I gave at the end of last lecture

435
00:25:44,600 --> 00:25:49,120
is that we have lists that can have elements that are other lists,

436
00:25:49,120 --> 00:25:50,920
that can have elements that are other lists,

437
00:25:50,920 --> 00:25:52,800
that can have elements as other lists.

438
00:25:52,800 --> 00:25:56,400
So, without knowing sort of how deep these lists

439
00:25:56,400 --> 00:26:00,600
within lists go, it's going to be really hard

440
00:26:00,600 --> 00:26:01,960
to write iterative code.

441
00:26:01,960 --> 00:26:04,560
It's possible, but it's going to be really hard.

442
00:26:04,560 --> 00:26:07,600
And instead, we're going to see that the recursive version

443
00:26:07,599 --> 00:26:11,159
of this code is going to be a lot more intuitive

444
00:26:11,159 --> 00:26:15,559
in the long run, maybe not right off the bat,

445
00:26:15,559 --> 00:26:20,039
but definitely it's a lot easier to write and to read.

446
00:26:21,639 --> 00:26:26,159
So, let's think about lists in a recursive way.

447
00:26:27,000 --> 00:26:28,439
So, if we were doing iteratively,

448
00:26:28,439 --> 00:26:31,359
what we'd say is we're going to loop through each element

449
00:26:31,359 --> 00:26:32,639
and do something.

450
00:26:32,639 --> 00:26:34,199
And the problem we're going to solve

451
00:26:34,199 --> 00:26:37,079
is figuring out the sum of all the elements in a list

452
00:26:37,079 --> 00:26:38,279
to begin with.

453
00:26:38,279 --> 00:26:39,960
So, iteratively, we just said, right,

454
00:26:39,960 --> 00:26:41,639
we loop over each element in the list

455
00:26:41,639 --> 00:26:43,759
and keep it in our result.

456
00:26:43,759 --> 00:26:47,079
So, I've got these state variables I talked about last time,

457
00:26:47,079 --> 00:26:48,919
right, result in e that keep track

458
00:26:48,919 --> 00:26:51,319
of which element we're at and what the value is.

459
00:26:52,599 --> 00:26:57,519
recursively, remember, we're going to make all these function calls

460
00:26:57,519 --> 00:27:00,039
until we get to a base case, at which point we're going

461
00:27:00,039 --> 00:27:02,679
to start to build up our result.

462
00:27:03,680 --> 00:27:08,400
So, how can we think about this list recursively?

463
00:27:08,400 --> 00:27:11,240
Well, let's say that we have a list

464
00:27:11,240 --> 00:27:13,320
and we want to find the sum of all these elements.

465
00:27:13,320 --> 00:27:14,840
That's our original problem.

466
00:27:16,720 --> 00:27:19,320
Now, let's say that we take the first element

467
00:27:20,279 --> 00:27:23,360
and we just extract it out, right?

468
00:27:23,360 --> 00:27:25,920
We know we have this list with a bunch of elements,

469
00:27:25,920 --> 00:27:28,200
let's take the first one, we know it's a 10.

470
00:27:29,200 --> 00:27:32,640
And then let's consider the remaining elements.

471
00:27:32,640 --> 00:27:37,640
So, the 20 onward, if I take my 10,

472
00:27:41,880 --> 00:27:45,360
and I know the answer to the sum of all the elements

473
00:27:45,360 --> 00:27:49,440
in 20 onward, right, then all I need to do

474
00:27:49,440 --> 00:27:52,360
to figure out the sum of my original list, right?

475
00:27:52,360 --> 00:27:56,200
This one here is to say it's the 10 plus the sum

476
00:27:56,200 --> 00:27:59,200
of whatever the sum of the 20 onward is.

477
00:28:01,000 --> 00:28:05,759
Now, the sum for elements 20 onward is the same problem again,

478
00:28:05,759 --> 00:28:07,720
right? It's the problem of finding the sum

479
00:28:07,720 --> 00:28:09,680
of all the elements in a list.

480
00:28:09,680 --> 00:28:13,840
It just so happens that our list is now our original list

481
00:28:13,840 --> 00:28:15,880
without that first element in it.

482
00:28:16,920 --> 00:28:18,960
Does everyone understand that, right?

483
00:28:18,960 --> 00:28:20,120
We've got our original problem

484
00:28:20,120 --> 00:28:22,400
and we've just made the same problem again,

485
00:28:22,400 --> 00:28:24,400
just a slightly different version of it.

486
00:28:24,400 --> 00:28:27,160
All the lists except for that first element.

487
00:28:27,160 --> 00:28:29,440
So now we do the same thing, right?

488
00:28:29,440 --> 00:28:31,640
Let's say this is our new list,

489
00:28:31,640 --> 00:28:34,280
we extract the first element from it,

490
00:28:34,280 --> 00:28:38,080
and we consider the elements except for that first one

491
00:28:38,080 --> 00:28:39,800
as a new list.

492
00:28:39,800 --> 00:28:43,080
And again, if I knew what the sum of 30 all the way

493
00:28:43,080 --> 00:28:46,000
on to 60 was, all I need to do is add it to the 20

494
00:28:46,000 --> 00:28:49,800
that I extracted and I would know the sum of this list.

495
00:28:49,800 --> 00:28:51,080
So we keep doing that, right?

496
00:28:51,080 --> 00:28:54,000
We take our list, extract the 30,

497
00:28:54,000 --> 00:28:57,480
and consider the remaining elements as a list.

498
00:28:57,480 --> 00:29:01,119
Same deal, if I knew what 40 plus 50 plus 60 was, right?

499
00:29:01,119 --> 00:29:02,640
The sum of all the elements in this list,

500
00:29:02,640 --> 00:29:06,759
I just added to the 30 and I have the answer to that problem.

501
00:29:06,759 --> 00:29:09,200
And we keep doing this, extracting an element

502
00:29:09,200 --> 00:29:11,039
and considering the remaining lists,

503
00:29:11,039 --> 00:29:13,279
all the way down to when we have a list

504
00:29:13,279 --> 00:29:15,559
with just one element in it.

505
00:29:15,559 --> 00:29:18,240
Well, this is a pretty simple problem to solve.

506
00:29:18,240 --> 00:29:19,960
If I have a list with one element in it,

507
00:29:19,960 --> 00:29:22,200
the sum of the elements within that list

508
00:29:22,200 --> 00:29:24,200
is just the value of that element, right?

509
00:29:24,200 --> 00:29:25,759
It's just 60.

510
00:29:25,759 --> 00:29:29,840
So a very simple problem, no need to keep sort of going further

511
00:29:29,840 --> 00:29:31,840
dividing this problem into smaller pieces.

512
00:29:31,840 --> 00:29:33,200
I already know the answer to this one.

513
00:29:33,200 --> 00:29:34,920
It's very simple.

514
00:29:34,920 --> 00:29:39,600
So this is our base case and we know the sum of the elements

515
00:29:39,600 --> 00:29:44,080
of in a list with the length one is that element.

516
00:29:44,080 --> 00:29:47,279
So once we reach the base case, we build back up our result,

517
00:29:47,279 --> 00:29:48,160
right?

518
00:29:48,160 --> 00:29:53,440
We take the 60 and we had extracted the 50 originally.

519
00:29:53,440 --> 00:29:56,519
So we're going to pass the sum back up to whoever called it,

520
00:29:56,519 --> 00:29:59,320
which was the function that extracted the 50.

521
00:29:59,320 --> 00:30:01,920
So now the 50 plus the 60 is 110.

522
00:30:01,920 --> 00:30:04,960
Now this 110 gets passed back up the chain.

523
00:30:04,960 --> 00:30:06,759
When we extracted the 40, we said,

524
00:30:06,759 --> 00:30:09,640
well, I'm going to add the 40 to the sum of the 50 and the 60,

525
00:30:09,640 --> 00:30:11,840
110, which is 150.

526
00:30:11,840 --> 00:30:13,640
Pass that answer back up the chain.

527
00:30:13,640 --> 00:30:16,080
When I extracted the 30, I said,

528
00:30:16,079 --> 00:30:18,480
I was just going to add the 30 with the sum of the remaining

529
00:30:18,480 --> 00:30:21,159
things, which I figured out is 150.

530
00:30:21,159 --> 00:30:22,119
The 20, right?

531
00:30:22,119 --> 00:30:25,559
I had extracted it, becomes 20 plus the sum of everybody else,

532
00:30:25,559 --> 00:30:26,599
which is 180.

533
00:30:26,599 --> 00:30:27,639
So the sum is 200.

534
00:30:27,639 --> 00:30:29,559
And then finally, my original question

535
00:30:29,559 --> 00:30:32,919
was to extract the 10, add it to everything else,

536
00:30:32,919 --> 00:30:34,799
which is the 200 that we figured out.

537
00:30:34,799 --> 00:30:35,759
So the full sum is 210.

538
00:30:38,759 --> 00:30:39,799
Does that make sense?

539
00:30:39,799 --> 00:30:41,480
This animation.

540
00:30:41,480 --> 00:30:44,399
So we've got the division, all the way down to the base case,

541
00:30:44,400 --> 00:30:46,440
and building back up the result.

542
00:30:46,440 --> 00:30:47,880
So let's try to write it.

543
00:30:47,880 --> 00:30:50,360
So we're going to write it in pieces.

544
00:30:50,360 --> 00:30:52,600
So the function is called total recur.

545
00:30:52,600 --> 00:30:54,840
It takes in a list L. We're going to recursively

546
00:30:54,840 --> 00:30:58,000
figure out the sum of all the elements in this list.

547
00:30:58,000 --> 00:31:00,759
So we can have a base case when the list is empty.

548
00:31:00,759 --> 00:31:03,360
We can return 0 up to you.

549
00:31:03,360 --> 00:31:04,920
Another base case, which is the one

550
00:31:04,920 --> 00:31:06,440
that I illustrated on the previous slide

551
00:31:06,440 --> 00:31:10,280
is when the length of the list is 1.

552
00:31:10,280 --> 00:31:13,440
So when the length of the list is 1, what's the sum going to be?

553
00:31:13,440 --> 00:31:14,480
No need for recursion.

554
00:31:14,480 --> 00:31:16,559
It's just that element.

555
00:31:16,559 --> 00:31:19,080
And so in these slides, what I've also included,

556
00:31:19,080 --> 00:31:21,840
in addition to the code, is an a little example.

557
00:31:21,840 --> 00:31:24,799
So it helps you think about what the function returns.

558
00:31:24,799 --> 00:31:27,360
So in this base case, when the length of the list is 1,

559
00:31:27,360 --> 00:31:29,400
the list would look something like this.

560
00:31:29,400 --> 00:31:33,160
And all I'd need to do is return L at index 0.

561
00:31:33,160 --> 00:31:33,960
So the 50.

562
00:31:33,960 --> 00:31:35,960
And that's my sum.

563
00:31:35,960 --> 00:31:39,600
And that's what I'm doing here, returning L at index 0.

564
00:31:39,600 --> 00:31:40,680
Cool.

565
00:31:40,680 --> 00:31:42,920
Now, the recursive step.

566
00:31:42,920 --> 00:31:46,320
Remember, in the recursive step, I extracted the first element.

567
00:31:46,320 --> 00:31:48,840
And I said, let me save this first element.

568
00:31:48,840 --> 00:31:52,519
So here it is being saved as L at index 0.

569
00:31:52,519 --> 00:31:54,240
And I'm going to add it to something.

570
00:31:54,240 --> 00:31:57,640
So in this example here, I've got this list that's

571
00:31:57,640 --> 00:31:59,039
longer than 1.

572
00:31:59,039 --> 00:32:01,240
I'm extracting the 30, L at index 0, and I'm

573
00:32:01,240 --> 00:32:04,160
going to add it to something.

574
00:32:04,160 --> 00:32:09,600
Well, that's something, based on the previous slide,

575
00:32:09,600 --> 00:32:11,560
where I did the animation, is going

576
00:32:11,559 --> 00:32:15,279
to be us putting our trust in the fact

577
00:32:15,279 --> 00:32:18,480
that we write this function correctly.

578
00:32:18,480 --> 00:32:23,319
That something is going to be us figuring out what the sum is

579
00:32:23,319 --> 00:32:25,720
of 40 and 50.

580
00:32:25,720 --> 00:32:27,519
It's the same problem we're trying to solve right now,

581
00:32:27,519 --> 00:32:29,279
the sum of 30, 40, 50.

582
00:32:29,279 --> 00:32:32,240
Except that now, I'm just going to take the sum of just the 40

583
00:32:32,240 --> 00:32:34,240
and the 50.

584
00:32:34,240 --> 00:32:37,799
So that something becomes the same function we're writing right

585
00:32:37,799 --> 00:32:41,039
now, total recur.

586
00:32:41,039 --> 00:32:44,639
Except that I'm not calling it on L, not the whole thing all

587
00:32:44,639 --> 00:32:45,200
over again.

588
00:32:45,200 --> 00:32:46,240
That would be bad.

589
00:32:46,240 --> 00:32:49,119
But I'm going to call it on L from index 1 onwards.

590
00:32:49,119 --> 00:32:53,480
So essentially, removing that first element.

591
00:32:53,480 --> 00:32:54,559
Is everyone OK with that?

592
00:32:58,639 --> 00:32:59,879
So that's it.

593
00:32:59,879 --> 00:33:00,759
That's the function.

594
00:33:00,759 --> 00:33:03,079
Nothing else to write, no loop.

595
00:33:03,079 --> 00:33:04,919
We've basically written a function,

596
00:33:04,919 --> 00:33:07,680
assuming that we wrote the function correctly.

597
00:33:08,200 --> 00:33:12,120
Which is a very strange way to think about recursion.

598
00:33:12,120 --> 00:33:13,360
But that's essentially what it is.

599
00:33:13,360 --> 00:33:16,600
You're trusting yourself to write this function correctly

600
00:33:16,600 --> 00:33:19,480
such that your recursive step leads you to the base case

601
00:33:19,480 --> 00:33:22,360
so that you can build back up the result correctly.

602
00:33:22,360 --> 00:33:23,759
So there's a lot of trust involved

603
00:33:23,759 --> 00:33:25,160
in writing these functions recursive.

604
00:33:30,799 --> 00:33:32,680
OK, so I'm not going to go through the Python tutor,

605
00:33:32,680 --> 00:33:35,759
but you should definitely go through it on your own

606
00:33:35,759 --> 00:33:39,480
as a practice for the quiz, things like that.

607
00:33:39,480 --> 00:33:41,680
Let's have you write this then.

608
00:33:41,680 --> 00:33:43,559
So it's going to be a slight modification

609
00:33:43,559 --> 00:33:45,839
to the code we just wrote.

610
00:33:45,839 --> 00:33:50,039
So it's going to take in a list as its parameter.

611
00:33:50,039 --> 00:33:52,519
And instead of summing the elements in the list,

612
00:33:52,519 --> 00:33:55,160
like we did 10 plus 20 plus 30, whatever,

613
00:33:55,160 --> 00:33:59,079
I would like you to sum the lengths of the elements in the list.

614
00:33:59,079 --> 00:34:00,759
So if I pass it in this function,

615
00:34:00,759 --> 00:34:04,200
it's going to sum the length of this 2 plus the length of this 1

616
00:34:04,200 --> 00:34:05,720
plus the length of this 5.

617
00:34:05,720 --> 00:34:07,759
2 plus 1 plus 5.

618
00:34:07,759 --> 00:34:09,920
So it'll be a very slight modification

619
00:34:09,920 --> 00:34:12,039
to the code that we just looked at.

620
00:34:12,039 --> 00:34:15,720
And here it is online, 70-ish.

621
00:34:15,720 --> 00:34:17,920
So think about the base case.

622
00:34:17,920 --> 00:34:21,039
If you have a list with one element in it, what do you return?

623
00:34:21,039 --> 00:34:22,760
And if you have a list with many elements,

624
00:34:22,760 --> 00:34:24,280
how can you put your trust in something

625
00:34:24,280 --> 00:34:29,599
that you just wrote to help you get to the answer?

626
00:34:29,599 --> 00:34:31,599
All right, what do you guys have for me?

627
00:34:31,599 --> 00:34:34,840
So let's start with the base case.

628
00:34:34,840 --> 00:34:36,680
And if you're having trouble, I encourage you

629
00:34:36,680 --> 00:34:39,760
to just in a little comment, just write down

630
00:34:39,760 --> 00:34:42,039
sort of what that base case looks like, right?

631
00:34:42,039 --> 00:34:43,440
Like I did in the slides.

632
00:34:43,440 --> 00:34:45,400
It looks like this.

633
00:34:45,400 --> 00:34:49,120
So what would I return if I have a list with one element in it?

634
00:34:49,120 --> 00:34:50,120
Yeah.

635
00:34:53,280 --> 00:34:55,079
Yep, exactly.

636
00:34:55,079 --> 00:34:57,480
So we would turn the length of that element, right?

637
00:34:57,480 --> 00:35:01,360
So the length of whatever this is, a, b, whatever.

638
00:35:01,360 --> 00:35:02,519
Awesome.

639
00:35:02,519 --> 00:35:04,079
How do we do the recursive step?

640
00:35:06,840 --> 00:35:07,360
Yeah.

641
00:35:14,199 --> 00:35:15,800
Yes, exactly.

642
00:35:15,800 --> 00:35:20,800
Total, land, recur, with what list?

643
00:35:24,559 --> 00:35:26,239
Yep, so we're going to extract that first one.

644
00:35:26,239 --> 00:35:29,719
So this will give us some of the links of everybody else.

645
00:35:32,840 --> 00:35:33,400
Exactly.

646
00:35:33,400 --> 00:35:40,039
So we also need to add it to, yeah, L, C, right?

647
00:35:40,039 --> 00:35:42,360
So it's fine to do it even before or after,

648
00:35:42,360 --> 00:35:43,960
because we're just summing these two values.

649
00:35:43,960 --> 00:35:45,960
So does it matter if you're the order

650
00:35:45,960 --> 00:35:48,159
that you're summing them?

651
00:35:48,159 --> 00:35:50,599
So that's perfect.

652
00:35:50,599 --> 00:35:52,039
Any questions about this code?

653
00:35:55,119 --> 00:35:56,800
Yes, all right.

654
00:35:56,800 --> 00:36:19,039
So in terms of efficiency, this function will be slightly less

655
00:36:19,039 --> 00:36:21,000
efficient, I would say.

656
00:36:21,000 --> 00:36:25,200
Yeah, because there's a little overhead in actually making a function

657
00:36:25,199 --> 00:36:29,000
called, whereas if you use a built-in operator,

658
00:36:29,000 --> 00:36:32,719
it's been optimized to work pretty fast.

659
00:36:32,719 --> 00:36:33,239
Yeah.

660
00:36:33,239 --> 00:36:34,399
I thought it was pretty good.

661
00:36:34,399 --> 00:36:37,519
That's equals, you're not doing the piece of the button.

662
00:36:37,519 --> 00:36:38,039
No.

663
00:36:38,039 --> 00:36:39,960
And when it's doing plus equals, it's definitely

664
00:36:39,960 --> 00:36:42,039
not doing this in the background, exactly.

665
00:36:42,039 --> 00:36:43,239
Yep.

666
00:36:43,239 --> 00:36:46,559
But this is just, I mean, where I'm trying

667
00:36:46,559 --> 00:36:49,599
to show your recursion on something

668
00:36:49,599 --> 00:36:52,799
that you wouldn't typically use recursion on just

669
00:36:52,800 --> 00:36:56,039
to help illustrate the idea of recursion.

670
00:36:56,039 --> 00:36:58,039
Certainly, you can use an iterative algorithm,

671
00:36:58,039 --> 00:37:00,720
obviously, to calculate the sum of these elements.

672
00:37:00,720 --> 00:37:02,400
And it's more intuitive, more in line

673
00:37:02,400 --> 00:37:03,840
with what we've been learning so far.

674
00:37:07,080 --> 00:37:08,080
OK.

675
00:37:11,039 --> 00:37:11,720
Excellent.

676
00:37:11,720 --> 00:37:17,760
So now let's look at a slightly different problem.

677
00:37:17,760 --> 00:37:21,039
So instead of finding the sum of all the elements in a list,

678
00:37:21,039 --> 00:37:23,079
let's tackle the problem of looking

679
00:37:23,079 --> 00:37:24,599
for an element in a list.

680
00:37:24,599 --> 00:37:26,519
I can completely different, but we're still doing some sort

681
00:37:26,519 --> 00:37:28,960
of list operations.

682
00:37:28,960 --> 00:37:31,639
We're going to start with an implementation that's not quite

683
00:37:31,639 --> 00:37:32,480
right.

684
00:37:32,480 --> 00:37:34,679
And you will see why in a little bit.

685
00:37:34,679 --> 00:37:37,039
So let's follow the same sort of pattern

686
00:37:37,039 --> 00:37:38,599
that we've seen in the previous one.

687
00:37:38,599 --> 00:37:42,639
So let's consider a list of length 1.

688
00:37:42,639 --> 00:37:46,440
In this particular case, if I have a list with only one element

689
00:37:46,440 --> 00:37:50,239
in it, how do I know if that element is the one I'm looking for?

690
00:37:50,239 --> 00:37:53,839
Well, I'm just going to return this Boolean, right?

691
00:37:53,839 --> 00:37:57,479
Whether L at index 0, that element is the one I'm looking for,

692
00:37:57,479 --> 00:38:02,079
the E. So notice this in list is passing in the list itself

693
00:38:02,079 --> 00:38:04,039
and the element I'm looking for.

694
00:38:04,039 --> 00:38:05,039
OK.

695
00:38:12,879 --> 00:38:16,919
So then let's look at the recursive step.

696
00:38:16,919 --> 00:38:18,919
The recursive step, in this particular case,

697
00:38:18,920 --> 00:38:22,400
let's say it says, well, L's, right?

698
00:38:22,400 --> 00:38:26,400
We might think to say, well, if it's not the one I'm looking for,

699
00:38:26,400 --> 00:38:29,360
then let's look at the remainder of the list.

700
00:38:29,360 --> 00:38:31,760
So like we did in the previous case,

701
00:38:31,760 --> 00:38:35,280
let's apply the same function we're writing right now

702
00:38:35,280 --> 00:38:38,280
to all the elements except for the first one.

703
00:38:38,280 --> 00:38:42,360
And we're still looking for element E in those remaining

704
00:38:42,360 --> 00:38:44,280
elements.

705
00:38:44,280 --> 00:38:45,480
OK.

706
00:38:45,480 --> 00:38:47,240
So we can test it out.

707
00:38:47,239 --> 00:38:48,879
And if we actually run it again, please,

708
00:38:48,879 --> 00:38:50,599
I encourage you to do Python to run your own.

709
00:38:50,599 --> 00:38:55,039
But we can test it out and say, if we

710
00:38:55,039 --> 00:38:59,199
in this particular case, 2581, if I actually run this code,

711
00:38:59,199 --> 00:39:00,159
it will give me true.

712
00:39:00,159 --> 00:39:06,799
So it found the one inside the list 2581, which is good.

713
00:39:06,799 --> 00:39:09,079
It's exactly what we wanted.

714
00:39:09,079 --> 00:39:12,399
But if I change my input list slightly, right?

715
00:39:12,399 --> 00:39:16,279
And I've got to 158, the element I'm looking for is here.

716
00:39:17,239 --> 00:39:20,319
The code will actually give me false, the one that I just wrote,

717
00:39:20,319 --> 00:39:21,399
which is not OK.

718
00:39:21,399 --> 00:39:23,159
I see the one is right over there.

719
00:39:25,959 --> 00:39:28,159
And so what exactly is going on?

720
00:39:28,159 --> 00:39:33,439
So we can run the code here.

721
00:39:33,439 --> 00:39:36,839
So this is this code here.

722
00:39:36,839 --> 00:39:38,839
If you see that, it gives you the incorrect value.

723
00:39:38,839 --> 00:39:40,639
One thing you could do when you're doing recursion

724
00:39:40,639 --> 00:39:45,359
is to put a print statement within the function itself.

725
00:39:45,360 --> 00:39:48,840
So we can print maybe the list we're currently at,

726
00:39:48,840 --> 00:39:50,920
and the element we're looking for,

727
00:39:50,920 --> 00:39:52,559
and see exactly what's going on.

728
00:39:52,559 --> 00:39:56,120
So if I run it, it will say, well, first time

729
00:39:56,120 --> 00:39:59,800
through the function call, I'm looking for the number one

730
00:39:59,800 --> 00:40:01,200
in this list.

731
00:40:01,200 --> 00:40:03,960
The next time I'm looking for the one in this list,

732
00:40:03,960 --> 00:40:07,519
the next time I'm looking for the one in this list,

733
00:40:07,519 --> 00:40:09,840
and the last time for my function call,

734
00:40:09,840 --> 00:40:13,840
I'm looking for the one in this list.

735
00:40:13,840 --> 00:40:16,240
And already we see something went wrong,

736
00:40:16,240 --> 00:40:21,079
because as I was looking through these lists,

737
00:40:21,079 --> 00:40:26,559
I'm basically skipping over important elements.

738
00:40:26,559 --> 00:40:30,160
What this code is actually doing is only checking

739
00:40:30,160 --> 00:40:34,760
if the last element is the one you're looking for.

740
00:40:34,760 --> 00:40:39,640
Because it basically ignores that first element in the code.

741
00:40:39,640 --> 00:40:43,440
The code here, yes, it extracts that first element,

742
00:40:43,440 --> 00:40:44,920
but it doesn't do anything with it.

743
00:40:48,119 --> 00:40:50,679
So that's our problem.

744
00:40:50,679 --> 00:40:54,000
What we want to do is still look at further elements

745
00:40:54,000 --> 00:40:56,679
in the list, so that part of the code is correct.

746
00:40:56,679 --> 00:40:59,599
But we only want to do it in a certain situation.

747
00:40:59,599 --> 00:41:04,360
And that situation is when the element that we just extracted,

748
00:41:04,360 --> 00:41:08,880
L at index 0, is not the one we're looking for.

749
00:41:08,880 --> 00:41:12,000
That little else case.

750
00:41:12,000 --> 00:41:14,599
So we still want to extract the first element

751
00:41:14,599 --> 00:41:17,760
if we have a list with more than one element in it.

752
00:41:17,760 --> 00:41:22,239
But as we've extracted it, check if it's the one we're looking for.

753
00:41:22,239 --> 00:41:24,960
If it is returned true, no need to keep searching

754
00:41:24,960 --> 00:41:27,159
the rest of the elements in the list.

755
00:41:27,159 --> 00:41:30,480
If it's not the one we're looking for, this else here,

756
00:41:30,480 --> 00:41:33,679
then we can look at the remaining elements in the list

757
00:41:33,679 --> 00:41:35,880
and run the exact same function we're writing,

758
00:41:35,880 --> 00:41:40,000
to check if the elements is in the remaining list.

759
00:41:40,000 --> 00:41:41,199
Does this code make sense?

760
00:41:41,199 --> 00:41:42,639
Is it all right?

761
00:41:42,639 --> 00:41:44,800
OK.

762
00:41:44,800 --> 00:41:48,599
So the way I wrote this code is sort of how I personally

763
00:41:48,599 --> 00:41:50,840
think about the problem.

764
00:41:50,840 --> 00:41:53,719
And if we run the code again, it'll give me

765
00:41:53,719 --> 00:41:55,480
the correct answers each time.

766
00:41:55,480 --> 00:41:58,039
But I wanted to mention that we can actually

767
00:41:58,039 --> 00:41:59,800
clean up the code a little bit and write it

768
00:41:59,800 --> 00:42:04,000
a little bit more pisonically.

769
00:42:04,000 --> 00:42:07,079
So it's a little bit nicer to read.

770
00:42:07,079 --> 00:42:08,039
It's more cleaned up.

771
00:42:08,039 --> 00:42:11,800
But one of the things that was confusing for me

772
00:42:11,800 --> 00:42:13,639
when I first started learning recursion

773
00:42:13,639 --> 00:42:18,199
is that I would always see these beautiful, cleaned up versions

774
00:42:18,199 --> 00:42:21,639
of code that do the recursion.

775
00:42:21,639 --> 00:42:25,719
And that's not sort of how we approach thinking about the problem.

776
00:42:25,719 --> 00:42:29,440
I can't come up with this nice form right off the bat.

777
00:42:29,440 --> 00:42:32,119
And this is one example, but there are certainly other examples

778
00:42:32,119 --> 00:42:34,039
of more complicated code where you see it,

779
00:42:34,039 --> 00:42:35,599
and it looks beautiful.

780
00:42:35,599 --> 00:42:38,000
And yes, if I look at it, I can figure it out.

781
00:42:38,000 --> 00:42:39,719
And I say, OK, yeah, that makes sense.

782
00:42:39,719 --> 00:42:43,079
But I personally could never come up with it on my own.

783
00:42:43,079 --> 00:42:44,719
So I was writing these lectures.

784
00:42:44,719 --> 00:42:47,360
I thought, well, how do I actually think about the problem?

785
00:42:47,360 --> 00:42:49,199
So I just went back one slide.

786
00:42:49,199 --> 00:42:50,880
And the way I think about the problem

787
00:42:50,880 --> 00:42:56,840
is to kind of separate it into a bunch of different base cases,

788
00:42:56,840 --> 00:42:58,679
or a bunch of different cases.

789
00:42:58,679 --> 00:43:00,960
And so that's what I've been trying to do in this particular

790
00:43:00,960 --> 00:43:02,800
lecture to help you guys understand recursion.

791
00:43:02,800 --> 00:43:05,760
It's, think about the case when we have a list with one

792
00:43:05,760 --> 00:43:07,519
element in it.

793
00:43:07,519 --> 00:43:09,440
How would you solve that problem?

794
00:43:09,440 --> 00:43:10,759
And then think about the case when

795
00:43:10,759 --> 00:43:12,079
you have a list with many elements in it.

796
00:43:12,079 --> 00:43:14,519
How would you solve that problem?

797
00:43:14,519 --> 00:43:15,440
Yes, it's true.

798
00:43:15,440 --> 00:43:18,880
There are some pieces here that are repeating.

799
00:43:18,880 --> 00:43:23,039
So we've got L at 0 equal E is in a couple places.

800
00:43:23,039 --> 00:43:25,519
But you can do that clean up later.

801
00:43:25,519 --> 00:43:28,800
So here I've got two test cases that return 2 cases that

802
00:43:28,800 --> 00:43:32,559
return L at 0, so we can pop them into the same test case

803
00:43:32,559 --> 00:43:33,320
here.

804
00:43:33,320 --> 00:43:35,880
And then we can check if the length of the list is 0.

805
00:43:35,880 --> 00:43:38,320
We can add that test case and else we check the remainder

806
00:43:38,320 --> 00:43:39,519
of the list.

807
00:43:39,519 --> 00:43:40,599
That's totally fine.

808
00:43:40,599 --> 00:43:42,760
And if it helps you think about the problem this way,

809
00:43:42,760 --> 00:43:44,200
that's OK.

810
00:43:44,200 --> 00:43:44,880
2.

811
00:43:44,880 --> 00:43:46,640
But personally, for me, it was a lot easier

812
00:43:46,640 --> 00:43:49,360
to think about the problem in terms of a list with one element

813
00:43:49,360 --> 00:43:52,320
in it, and then a list with many elements in it.

814
00:43:52,320 --> 00:43:55,960
But it's totally fine to write a little bit

815
00:43:55,960 --> 00:44:00,599
quote unquote inefficient looking code to begin.

816
00:44:00,599 --> 00:44:02,720
Certainly don't hard code all the base cases.

817
00:44:02,720 --> 00:44:04,119
If length is 0, do this.

818
00:44:04,119 --> 00:44:05,320
If length is 1, do this.

819
00:44:05,320 --> 00:44:07,360
If length is 2, do this.

820
00:44:07,360 --> 00:44:10,720
But some reasonable base cases are OK to do.

821
00:44:10,720 --> 00:44:14,600
So this is just showing the simplified code.

822
00:44:14,600 --> 00:44:16,320
One thing that I wanted to mention,

823
00:44:16,320 --> 00:44:18,680
and hopefully you've noticed this already,

824
00:44:18,680 --> 00:44:21,960
is the function that you're writing,

825
00:44:21,960 --> 00:44:25,240
all of the returns from this function

826
00:44:25,240 --> 00:44:28,080
need to have the same type.

827
00:44:28,080 --> 00:44:30,720
When we wrote, I'll go back a couple slides.

828
00:44:30,720 --> 00:44:33,400
When we wrote the function that calculated the sum of all

829
00:44:33,400 --> 00:44:35,039
the elements in the list.

830
00:44:35,039 --> 00:44:37,759
So that's this one here.

831
00:44:37,759 --> 00:44:38,920
What were we returning?

832
00:44:38,920 --> 00:44:41,400
Here, we were returning an actual number.

833
00:44:41,400 --> 00:44:44,039
And then here, we were assuming that this function

834
00:44:44,039 --> 00:44:48,320
returned an actual number that we can add to this actual number.

835
00:44:48,320 --> 00:44:50,920
So every single return statement needs

836
00:44:50,920 --> 00:44:53,800
to return the same type of object.

837
00:44:53,800 --> 00:44:59,000
Because if you're assuming that the base case returns a list,

838
00:44:59,000 --> 00:45:00,840
but then at some point in the code,

839
00:45:00,840 --> 00:45:05,000
you're going to be working with a number or a Boolean.

840
00:45:05,000 --> 00:45:07,039
Then Python, as soon as it gets that base case,

841
00:45:07,039 --> 00:45:09,559
is going to say, hey, you're trying to add a Boolean to a list.

842
00:45:09,559 --> 00:45:11,360
What's up?

843
00:45:11,360 --> 00:45:14,280
And so in the summing of the list elements,

844
00:45:14,280 --> 00:45:17,559
all the test cases returned a number.

845
00:45:17,559 --> 00:45:19,639
And in this case, where we are trying

846
00:45:19,639 --> 00:45:22,840
to return the, whether the element is in a list or not,

847
00:45:22,840 --> 00:45:25,480
notice every single one of my returns

848
00:45:25,480 --> 00:45:26,840
is going to return a Boolean.

849
00:45:26,840 --> 00:45:31,039
So here, Boolean, here, Boolean, and here in the recursive step,

850
00:45:31,039 --> 00:45:33,719
I'm assuming that I'm just passing this Boolean back up

851
00:45:33,719 --> 00:45:35,639
the chain of command.

852
00:45:35,639 --> 00:45:37,439
So a very, very important thing.

853
00:45:37,439 --> 00:45:39,839
Again, something that was not made clear to me

854
00:45:39,839 --> 00:45:41,519
when I first started recursion.

855
00:45:41,519 --> 00:45:45,359
But once I knew this, it just made so much more sense

856
00:45:45,359 --> 00:45:49,480
and it helped me write my code better, more perfectly,

857
00:45:49,480 --> 00:45:51,799
right off the bat.

858
00:45:51,799 --> 00:45:53,879
Let's look at a slightly different example now.

859
00:45:53,879 --> 00:45:56,559
So we've looked at taking the sum of all the elements

860
00:45:56,559 --> 00:45:57,199
in the list.

861
00:45:57,199 --> 00:45:59,799
We've looked at figuring out whether an element is in the list.

862
00:45:59,799 --> 00:46:02,759
Let's do something completely different.

863
00:46:02,760 --> 00:46:04,320
Still working with lists.

864
00:46:04,320 --> 00:46:08,560
Let's say that we now have an input list that looks like this.

865
00:46:08,560 --> 00:46:10,080
So we've got a list.

866
00:46:10,080 --> 00:46:14,120
This is my list beginning an end.

867
00:46:14,120 --> 00:46:18,080
And this list only has list elements within it.

868
00:46:18,080 --> 00:46:21,600
So no integers, but its elements are lists.

869
00:46:21,600 --> 00:46:23,160
So here's one list element.

870
00:46:23,160 --> 00:46:24,960
Here's another list element.

871
00:46:24,960 --> 00:46:27,960
And here's another list element.

872
00:46:27,960 --> 00:46:31,920
So in this example, I've got a list with three list elements.

873
00:46:32,920 --> 00:46:36,400
What I'd like to do is to flatten this list, which

874
00:46:36,400 --> 00:46:41,240
means that I want to remove any semblance of sublists

875
00:46:41,240 --> 00:46:45,080
and take just all the elements of the sublists

876
00:46:45,080 --> 00:46:46,800
and put them top level.

877
00:46:50,360 --> 00:46:53,480
Does this task make sense?

878
00:46:53,480 --> 00:46:54,640
OK.

879
00:46:54,640 --> 00:46:57,360
So I'm not assuming I've got lists within lists.

880
00:46:57,360 --> 00:47:00,720
I'm just assuming I've got lists with list elements that

881
00:47:00,719 --> 00:47:04,319
have integers or whatever.

882
00:47:04,319 --> 00:47:05,439
OK.

883
00:47:05,439 --> 00:47:08,679
So again, let's think about the base case.

884
00:47:08,679 --> 00:47:11,159
Let's think about the case when we have a list with one

885
00:47:11,159 --> 00:47:12,239
element in it.

886
00:47:12,239 --> 00:47:15,279
And then we can figure out the recursive step.

887
00:47:15,279 --> 00:47:17,399
So if I have a list with one element in it,

888
00:47:17,399 --> 00:47:20,279
again, I've got an example here on the right-hand side.

889
00:47:20,279 --> 00:47:24,239
It's a list with one list element in it.

890
00:47:24,239 --> 00:47:27,199
That's why I've got the double square brackets.

891
00:47:27,199 --> 00:47:30,279
If I wanted to flatten this, what could I do?

892
00:47:31,719 --> 00:47:35,159
I could just grab the element at index 0.

893
00:47:35,159 --> 00:47:39,039
Because the element at index 0 is this inner list,

894
00:47:39,039 --> 00:47:42,359
and it is a flattened version of my list.

895
00:47:46,839 --> 00:47:48,879
Else, what am I going to do?

896
00:47:48,879 --> 00:47:50,519
Well, let's do the same pattern.

897
00:47:50,519 --> 00:47:52,879
It seems to have worked so far for us.

898
00:47:52,879 --> 00:47:56,039
Let's do the pattern of extracting that first element.

899
00:47:56,039 --> 00:47:58,799
So grab element at index 0.

900
00:47:58,880 --> 00:48:04,880
So here, we would grab something like square brackets 1, 2,

901
00:48:04,880 --> 00:48:08,120
and concatenate it with something.

902
00:48:08,120 --> 00:48:10,960
Remember, when we concatenate a list with another list,

903
00:48:10,960 --> 00:48:13,920
it gives us a big list with all the elements in it.

904
00:48:13,920 --> 00:48:15,600
Exactly what we're looking for, right,

905
00:48:15,600 --> 00:48:17,960
when we want to flatten a list.

906
00:48:17,960 --> 00:48:24,320
So the something we're going to add this L at index 0 with is

907
00:48:24,760 --> 00:48:28,960
just us flattening the remainder of our list.

908
00:48:28,960 --> 00:48:32,519
Again, same pattern we've been seeing already, right?

909
00:48:32,519 --> 00:48:34,680
So if I extract, in this example here,

910
00:48:34,680 --> 00:48:39,920
the 1, 2 as a list, I'm going to concatenate it with the

911
00:48:39,920 --> 00:48:42,440
assumption that the function I'm writing will work

912
00:48:42,440 --> 00:48:47,320
correctly to flatten 3, 4, and 9, 8, 7.

913
00:48:47,320 --> 00:48:51,120
So if I flatten that, this will give me just a list with

914
00:48:51,120 --> 00:48:53,840
3, 4, 9, 8, 7, all to fit it.

915
00:48:53,840 --> 00:48:57,120
And if I concatenate 1, 2 with 3, 4, 9, 8, 7, that just

916
00:48:57,120 --> 00:48:58,640
gives me 3, 4, 9, 8, 7.

917
00:49:01,600 --> 00:49:03,600
Everyone with me is that all right?

918
00:49:03,600 --> 00:49:04,079
OK, good.

919
00:49:04,079 --> 00:49:06,880
I see some nods, so that's actually pretty good sign.

920
00:49:06,880 --> 00:49:07,400
OK.

921
00:49:10,079 --> 00:49:11,800
You are with me, right?

922
00:49:11,800 --> 00:49:14,320
Because now it is your turn.

923
00:49:14,320 --> 00:49:20,000
So we're going to write a variation of whether an

924
00:49:20,000 --> 00:49:22,160
element is in a list.

925
00:49:22,159 --> 00:49:25,119
So I'm going to give you a very similar scenario to this

926
00:49:25,119 --> 00:49:25,879
flatten one.

927
00:49:25,879 --> 00:49:29,879
So I'm going to give you a list that contains list elements.

928
00:49:29,879 --> 00:49:31,480
So here's my list.

929
00:49:31,480 --> 00:49:34,239
That contains list elements in it.

930
00:49:34,239 --> 00:49:37,599
And what I'd like you to do is write a recursive function

931
00:49:37,599 --> 00:49:41,000
that checks whether this element, whatever the second

932
00:49:41,000 --> 00:49:47,079
parameter of the function call is in these list elements.

933
00:49:47,079 --> 00:49:50,719
So not at the top level, like we wrote the last code to

934
00:49:50,719 --> 00:49:53,079
check if an element is in the list.

935
00:49:53,079 --> 00:49:58,599
But in these sublists, just to show you the difference,

936
00:49:58,599 --> 00:50:04,319
if I check whether 3 is in 1, 2, 3, that will be true.

937
00:50:04,319 --> 00:50:08,839
But if I check whether 3 is in the list containing the list

938
00:50:08,839 --> 00:50:12,319
1, 2, 3, that's false, because it's checking whether the

939
00:50:12,319 --> 00:50:14,959
3 is equal to this list.

940
00:50:14,959 --> 00:50:17,519
It's just doing a top level equality here.

941
00:50:18,519 --> 00:50:25,759
So let's have you write this code down online 166.

942
00:50:25,759 --> 00:50:31,280
You may use the inoperator to check if an element is in a

943
00:50:31,280 --> 00:50:32,159
list itself.

944
00:50:32,159 --> 00:50:35,519
But obviously, you won't be able to use the inoperator, nor

945
00:50:35,519 --> 00:50:37,360
should you, because then we're not writing a recursive

946
00:50:37,360 --> 00:50:42,360
function, to check if the element is within a list element.

947
00:50:42,720 --> 00:50:49,360
So have you worked on it for a couple minutes, and then we

948
00:50:49,360 --> 00:50:51,360
can write it together.

949
00:50:51,360 --> 00:50:54,360
All right, does anyone have a start?

950
00:50:54,360 --> 00:50:58,360
So let's look at the case where we have one element in it.

951
00:50:58,360 --> 00:51:04,360
How do you check whether that element is within the list inside?

952
00:51:04,360 --> 00:51:11,360
So if, this is our case with one element in the list.

953
00:51:12,360 --> 00:51:18,360
The length of L equals 1.

954
00:51:18,360 --> 00:51:21,360
Yeah.

955
00:51:21,360 --> 00:51:30,360
Yeah, exactly.

956
00:51:30,360 --> 00:51:37,360
E and L is the correct thing to do, L at index 0, right?

957
00:51:38,360 --> 00:51:41,360
So if this is our L, that's why I added this little example

958
00:51:41,360 --> 00:51:43,360
here, so it can help us.

959
00:51:43,360 --> 00:51:47,360
So L at index 0 is this guy here, and all I need to do is check

960
00:51:47,360 --> 00:51:50,360
if E is in L at index 0.

961
00:51:50,360 --> 00:51:57,360
And I can just return that right off the bat.

962
00:51:57,360 --> 00:52:02,360
I could do if E in L 0 return true, Ls return false, but E in L 0

963
00:52:02,360 --> 00:52:06,360
is already a Boolean, so I can just return that directly.

964
00:52:07,360 --> 00:52:14,360
Okay, Ls, we have a list with more than one element in it, right?

965
00:52:15,360 --> 00:52:19,360
So what do we do here?

966
00:52:19,360 --> 00:52:26,360
Remember, extract the first element, and then do the rest.

967
00:52:30,360 --> 00:52:32,360
So let's say this.

968
00:52:32,360 --> 00:52:35,360
Let's say the first element is L at index 0, right?

969
00:52:35,360 --> 00:52:40,360
Let's help us think about it a little bit.

970
00:52:40,360 --> 00:52:44,360
So before looking at the remainder of the list, right, and calling our recursive function,

971
00:52:44,360 --> 00:52:49,360
what did we do when we checked if an element was in the list when we just had a plain list?

972
00:52:49,360 --> 00:53:02,360
We just said if, you know, E is in first, return true, Ls return false, right?

973
00:53:06,360 --> 00:53:12,360
But we don't want to do else return false because that's not quite true.

974
00:53:12,360 --> 00:53:19,360
Ls, we want to look at the remainder of the list, right?

975
00:53:19,360 --> 00:53:26,360
We want to see if the element, obviously, if the element is not in the first thing that I just extracted, right?

976
00:53:26,360 --> 00:53:34,360
This list here, then I would like to say is it in the rest of this list?

977
00:53:35,360 --> 00:53:39,360
Which is us calling the function that we're just writing all over again.

978
00:53:39,360 --> 00:53:50,360
So we can return the name of this function in lists of lists,

979
00:53:51,360 --> 00:53:58,360
and then L from one onward with the same element we're trying to find.

980
00:53:59,360 --> 00:54:04,360
And of course, we can simplify this just like we could simplify the previous one,

981
00:54:04,360 --> 00:54:12,360
but it helps to think about it in these two cases, a list with one element and a list with many elements.

982
00:54:12,360 --> 00:54:21,360
Okay. Any questions about this? Yes.

983
00:54:29,360 --> 00:54:35,360
This one? This one we're considering a list with one list inside it.

984
00:54:35,360 --> 00:54:45,360
Yeah. We could include another base case, I suppose, if the length of L is zero return false, that would also work.

985
00:54:45,360 --> 00:54:50,360
Because obviously if the list is empty, then there's, it's not in there.

986
00:54:50,360 --> 00:54:55,360
Okay. So what do we use recursion? Obviously, a lot of the examples we've seen here,

987
00:54:55,360 --> 00:54:58,360
they're very intuitive to write iteratively.

988
00:54:58,360 --> 00:55:05,360
But I mentioned a couple examples last time, where it's more intuitive to use recursion.

989
00:55:05,360 --> 00:55:12,360
And specifically, I wanted to draw a little bit of a parallel to this thing when we learned about while loops.

990
00:55:12,360 --> 00:55:17,360
We said, well, what if we tried to code a little game that just used if and else's?

991
00:55:17,360 --> 00:55:23,360
I said that we would have a bunch of nested if L statements, right, without a while loop.

992
00:55:23,360 --> 00:55:29,360
Because we don't know how deep to make these if, L, if, you know, if statements.

993
00:55:29,360 --> 00:55:35,360
And so a very similar idea exists with recursion and when to use recursion.

994
00:55:35,360 --> 00:55:41,360
So if I had a list where the whole bunch of lists in it and those lists could have lists within it and so on and so on,

995
00:55:41,360 --> 00:55:47,360
I don't know how long I need to, how deep I need to make my code go, right?

996
00:55:47,360 --> 00:55:52,360
So an example using a for loop would be to say for each element in L.

997
00:55:52,360 --> 00:55:55,360
Right? I'm going to say I'm going to look at each element.

998
00:55:55,360 --> 00:55:59,360
I'm going to say, well, if you're not a list, then I can deal with you directly.

999
00:55:59,360 --> 00:56:03,360
But if you are a list, then I need to iterate over you.

1000
00:56:03,360 --> 00:56:09,360
And so I've got this other iteration here for each j and i, right, from one of those lists.

1001
00:56:09,360 --> 00:56:12,360
Again, I would say, are you a list? If not, I'll deal with you directly.

1002
00:56:12,360 --> 00:56:16,360
L, you are a list. So I do need to iterate over you.

1003
00:56:16,360 --> 00:56:20,360
And you can see this nested idea now comes into play here.

1004
00:56:20,360 --> 00:56:28,360
We could try to use a while loop to optimize the code a little bit, say, you know, while this element type is not a list to do this, you know, things like that.

1005
00:56:28,360 --> 00:56:33,360
But it leads to some reliever, both and verbose code.

1006
00:56:33,360 --> 00:56:38,360
And so recursion is a way for us to deal with these lists within lists within lists.

1007
00:56:38,360 --> 00:56:43,360
And of course, when you have data structures that you don't know how long, or how deep they go.

1008
00:56:43,360 --> 00:56:46,360
So we've got a lot of things written in the list.

1009
00:56:46,360 --> 00:56:50,360
And we've got a lot of data, a lot of things that are not mentioned, file systems, and a set of operations, last lecture has really nice places to use recursion.

1010
00:56:50,360 --> 00:56:55,360
ScubiDue gang looking for, you know, their, their culprit.

1011
00:56:55,360 --> 00:56:59,360
We don't, rooms that have doors that lead to other rooms that have doors lead to other rooms.

1012
00:56:59,360 --> 00:57:04,360
They don't know how many doors they need to go through to get to a room without doors obviously recursion.

1013
00:57:04,360 --> 00:57:09,360
They should use. And then a bunch of other fun examples of places to use recursion.

1014
00:57:09,360 --> 00:57:17,760
bit of class, I would like to work through this example where we're going to see the code

1015
00:57:17,760 --> 00:57:22,000
to solve lists within lists within lists within lists.

1016
00:57:22,000 --> 00:57:29,280
But before we do that, we're going to do that example in the context of reversing a list.

1017
00:57:29,280 --> 00:57:33,599
But before we look at a list that has all these different sub lists within it, let's look

1018
00:57:33,599 --> 00:57:36,720
at a list that has just integers.

1019
00:57:36,719 --> 00:57:43,079
How would we think about this problem recursively to reverse all the elements in this list?

1020
00:57:43,079 --> 00:57:44,279
Okay.

1021
00:57:44,279 --> 00:57:48,959
So again, we're going to use the very same pattern we've been using all throughout today when

1022
00:57:48,959 --> 00:57:50,679
we've been dealing with lists.

1023
00:57:50,679 --> 00:57:55,480
We're going to take out the first element, extract it, and we're going to deal with the

1024
00:57:55,480 --> 00:58:00,959
remainder of the list, basically by running the same function we're writing on the remainder

1025
00:58:00,959 --> 00:58:02,759
of the list.

1026
00:58:02,760 --> 00:58:07,160
So let's say I have my original list and I look at my first element, just like before,

1027
00:58:07,160 --> 00:58:09,240
I'm going to extract it out.

1028
00:58:09,240 --> 00:58:17,400
If I take this first element and I pop it at the end and then I consider the remainder

1029
00:58:17,400 --> 00:58:22,920
list, right, everything except for that first element that I put at the end, I can just call

1030
00:58:22,920 --> 00:58:27,440
the same function I'm writing right now to reverse the remaining list.

1031
00:58:28,440 --> 00:58:29,440
Okay.

1032
00:58:29,440 --> 00:58:33,920
Which means that I'm going to take this remaining list, grab the first element, pop it at the

1033
00:58:33,920 --> 00:58:38,519
end, and deal with the remaining list.

1034
00:58:38,519 --> 00:58:42,679
Again, take the first element, pop it at the end, deal with the remaining list, until I have

1035
00:58:42,679 --> 00:58:45,240
a list with length 1.

1036
00:58:45,240 --> 00:58:49,559
How do I ever reverse a list that only has one element in it?

1037
00:58:49,559 --> 00:58:51,079
It's just that list, right?

1038
00:58:51,079 --> 00:58:55,360
I just, you know, reversing a list L is just L.

1039
00:58:56,360 --> 00:58:57,360
Right?

1040
00:58:57,360 --> 00:58:58,360
Okay.

1041
00:58:58,360 --> 00:58:59,360
Good.

1042
00:58:59,360 --> 00:59:01,360
So that's the idea.

1043
00:59:01,360 --> 00:59:08,559
And notice that when we're building back up the result, we took that first element and

1044
00:59:08,559 --> 00:59:10,519
we tacked it onto the end.

1045
00:59:10,519 --> 00:59:15,320
So we're going to do another list concatenation kind of deal, except that the thing that I'm

1046
00:59:15,320 --> 00:59:19,360
concatenating now, the first element will be at the end, right?

1047
00:59:19,360 --> 00:59:21,360
It'll be the second part of my plus.

1048
00:59:21,360 --> 00:59:22,360
Okay.

1049
00:59:22,360 --> 00:59:24,039
So I'm just giving you a heads up.

1050
00:59:24,039 --> 00:59:25,800
That's what it will look like.

1051
00:59:25,800 --> 00:59:26,880
So let's write the code.

1052
00:59:26,880 --> 00:59:29,160
If the length of the list is 1, right?

1053
00:59:29,160 --> 00:59:35,280
If I'm reversing a list with one element in it, just return that list.

1054
00:59:35,280 --> 00:59:36,280
Easy peasy, right?

1055
00:59:36,280 --> 00:59:38,079
It's just the list itself.

1056
00:59:38,079 --> 00:59:39,079
Okay.

1057
00:59:39,079 --> 00:59:40,720
L's.

1058
00:59:40,720 --> 00:59:43,280
And this is where the fun comes in, right?

1059
00:59:43,280 --> 00:59:51,599
I've got something, so I'm going to do something concatenated with something else.

1060
00:59:51,599 --> 00:59:54,119
So I'm extracting the first element.

1061
00:59:54,119 --> 00:59:58,059
There it is, L at index zero, but it's sitting somewhere funny that we haven't seen it sit

1062
00:59:58,059 --> 00:59:59,559
before.

1063
00:59:59,559 --> 01:00:03,000
It's sitting on the second, to the right of the concatenation.

1064
01:00:03,000 --> 01:00:06,639
And that's fine because what we want to do is take the element from the first, the beginning

1065
01:00:06,639 --> 01:00:10,480
of the list, and tack it onto the end, right?

1066
01:00:10,480 --> 01:00:12,799
And there's something else that's funny about it.

1067
01:00:12,799 --> 01:00:15,239
I've put it in square brackets.

1068
01:00:15,239 --> 01:00:17,239
Okay.

1069
01:00:17,239 --> 01:00:21,039
Now I, again, I'm including this example to help us think about it.

1070
01:00:21,039 --> 01:00:24,119
Why are those square brackets there?

1071
01:00:24,119 --> 01:00:27,320
Think about what we want this function to return.

1072
01:00:27,320 --> 01:00:29,360
Is it returning a number?

1073
01:00:29,360 --> 01:00:31,159
No, is there a training of Boolean?

1074
01:00:31,159 --> 01:00:34,400
No, it's returning a list, right?

1075
01:00:34,400 --> 01:00:40,079
This function I want to take in a list and give me back a list, but where my elements

1076
01:00:40,079 --> 01:00:42,159
are in reverse order.

1077
01:00:42,159 --> 01:00:47,079
So what I want to do, right, you can already see this return over here is returning a list,

1078
01:00:47,079 --> 01:00:48,079
right?

1079
01:00:48,079 --> 01:00:51,400
So I want to take a list of square brackets, 10, or whatever.

1080
01:00:51,400 --> 01:01:00,480
In my recursive step, if I'm concatenating, I want to concatenate this thing here, which

1081
01:01:00,480 --> 01:01:02,719
I'll tell you about in the next slide.

1082
01:01:02,719 --> 01:01:04,239
But I'm going to concatenate it with.

1083
01:01:04,239 --> 01:01:06,519
It's going to be a list with some other list, right?

1084
01:01:06,519 --> 01:01:12,719
If I concatenate a list with a number, that L at zero is, L at zero is a 10, right?

1085
01:01:12,719 --> 01:01:16,599
So if I concatenate a list with a number, Python will yell at me.

1086
01:01:16,599 --> 01:01:17,599
Okay.

1087
01:01:17,599 --> 01:01:23,279
So what I need to do is make that number that I just extracted L at zero be a list.

1088
01:01:23,279 --> 01:01:27,559
So I'm just going to slap a square bracket around it and say, hey, Python, this is a list

1089
01:01:27,559 --> 01:01:30,679
with one element in it.

1090
01:01:30,679 --> 01:01:32,159
Does that make sense?

1091
01:01:32,159 --> 01:01:33,159
Cool.

1092
01:01:33,159 --> 01:01:37,000
So then what that means is I've got this 10 that I extracted.

1093
01:01:37,000 --> 01:01:39,199
I'm going to concatenate something with that 10.

1094
01:01:39,199 --> 01:01:44,440
And that something is me putting my trust into the function I'm writing to say that something

1095
01:01:44,440 --> 01:01:49,119
is going to be the 20, 30, 40 successfully reversed, right?

1096
01:01:49,119 --> 01:01:50,760
40, 30, 20.

1097
01:01:50,760 --> 01:01:55,519
If I can do that, 40, 30, 20, and I concatenate it with a 10, my job is done.

1098
01:01:55,519 --> 01:01:59,720
I've successfully reversed 10, 20, 30, 40 to be 40, 30, 20, 10.

1099
01:01:59,720 --> 01:02:00,720
Okay.

1100
01:02:00,720 --> 01:02:04,200
And so let's just do that.

1101
01:02:04,200 --> 01:02:07,119
That's me putting my trust in this function I'm writing.

1102
01:02:07,119 --> 01:02:11,400
I'm calling the same function again saying, hey, I would like to reverse the remainder of

1103
01:02:11,400 --> 01:02:13,639
the list.

1104
01:02:13,639 --> 01:02:16,559
Maybe as we have been in the past, right?

1105
01:02:16,559 --> 01:02:21,239
Super weird to think about still because we're trusting something that we're writing.

1106
01:02:21,239 --> 01:02:22,239
Cool.

1107
01:02:22,239 --> 01:02:24,119
So then let's test it out.

1108
01:02:24,119 --> 01:02:25,119
Let's run it.

1109
01:02:25,119 --> 01:02:32,119
So if I run it with list 12 ABC, Python will reverse my list, right?

1110
01:02:32,119 --> 01:02:37,119
So it will print ABC then the two then the one.

1111
01:02:37,119 --> 01:02:40,319
Let's say I run it now with something slightly different.

1112
01:02:40,319 --> 01:02:42,839
So I run it with this list here.

1113
01:02:42,840 --> 01:02:45,720
How many elements does this list have?

1114
01:02:45,720 --> 01:02:47,600
Test.

1115
01:02:47,600 --> 01:02:49,600
You guys tell me.

1116
01:02:49,600 --> 01:02:50,600
Three, exactly.

1117
01:02:50,600 --> 01:02:54,600
The first one is an integer, the second one is a list, and the last one is a list that's

1118
01:02:54,600 --> 01:02:56,440
got a bunch of garbage in it.

1119
01:02:56,440 --> 01:03:01,680
But as test, I don't care because I just care that I have three elements inside.

1120
01:03:01,680 --> 01:03:07,680
And so when I run this function on test, it will reverse just the top level because that's

1121
01:03:07,680 --> 01:03:08,680
what this is doing, right?

1122
01:03:08,679 --> 01:03:13,919
Nowhere in here, did I say I want to reverse lists within lists, right?

1123
01:03:13,919 --> 01:03:19,639
I didn't say if you're a list also reverse yourself, I just said top level, take this element,

1124
01:03:19,639 --> 01:03:20,719
put it at the end.

1125
01:03:20,719 --> 01:03:26,440
So when I reverse test, this funky looking test over here, it will take that first element,

1126
01:03:26,440 --> 01:03:30,239
put it at the end, the middle element stays where it is.

1127
01:03:30,239 --> 01:03:34,719
And the last element comes first.

1128
01:03:34,719 --> 01:03:36,199
As everyone okay so far.

1129
01:03:36,199 --> 01:03:38,239
I'm worried there aren't many more questions.

1130
01:03:38,239 --> 01:03:42,719
So okay.

1131
01:03:42,719 --> 01:03:46,919
All right, so that's good.

1132
01:03:46,919 --> 01:03:52,359
But this is now not really what I'd like, right?

1133
01:03:52,359 --> 01:03:58,799
What I'd like is if I have lists within lists within lists within lists, and those lists

1134
01:03:58,799 --> 01:04:01,399
have some sort of elements within them, right?

1135
01:04:01,399 --> 01:04:06,000
At the lowest level, I've got a list that's going to have some integer string or whatever

1136
01:04:06,000 --> 01:04:07,000
in it.

1137
01:04:07,000 --> 01:04:11,599
What I would like to do is to reverse those elements as well.

1138
01:04:11,599 --> 01:04:19,119
So really what I would have liked to have if I passed in this list here is to say, well,

1139
01:04:19,119 --> 01:04:21,719
why don't you reverse everything?

1140
01:04:21,719 --> 01:04:30,039
So I would like to have had gf as a list and then the e and then the d and then the one.

1141
01:04:30,039 --> 01:04:35,199
And so this is where we're going to do that.

1142
01:04:35,199 --> 01:04:37,239
So let's say I now have a list.

1143
01:04:37,239 --> 01:04:43,359
So each one of these blue squares is my list or my list elements and my top level.

1144
01:04:43,359 --> 01:04:48,199
And they happen to have some sort of lists within them.

1145
01:04:48,199 --> 01:04:49,559
How do I do this?

1146
01:04:49,559 --> 01:04:56,559
Well now that I have potential list elements, I need to have my recursive function test

1147
01:04:56,559 --> 01:05:01,559
where the element I'm currently considering is a list or not.

1148
01:05:01,559 --> 01:05:06,159
If it's not like the three and the four, I can treat them in the exact same way that

1149
01:05:06,159 --> 01:05:09,440
we treated them in this case.

1150
01:05:09,440 --> 01:05:15,400
But if it is a list as this one is, right, this is a list element and this is also a list

1151
01:05:15,400 --> 01:05:17,519
element that has lists elements within it.

1152
01:05:17,519 --> 01:05:19,159
So that's even funcier.

1153
01:05:19,159 --> 01:05:22,039
Then we need to consider them separately.

1154
01:05:22,039 --> 01:05:28,239
So let's take the code that we wrote in the previous slide because it's a good start, extract

1155
01:05:28,239 --> 01:05:32,679
the first element, right, put it at the end.

1156
01:05:32,679 --> 01:05:35,000
That's what we did before.

1157
01:05:35,000 --> 01:05:43,039
But before leaving, let's say if you are a list, right, if you are a list, then also reverse

1158
01:05:43,039 --> 01:05:45,959
yourself.

1159
01:05:45,959 --> 01:05:51,279
So not only do I want top level, that list, you know, that element to go to the end, I also

1160
01:05:51,279 --> 01:05:53,639
want to consider what you are, right?

1161
01:05:53,639 --> 01:05:55,959
I don't want this last element to be 1 comma 2.

1162
01:05:55,960 --> 01:05:59,159
I want to reverse its elements to be 2 comma 1.

1163
01:05:59,159 --> 01:06:04,960
So in the end, what I want this to give me is 8, 7, 6, 5, 4, 3, 2, 1.

1164
01:06:04,960 --> 01:06:05,960
All right.

1165
01:06:05,960 --> 01:06:10,639
So that deals with that first element being popped at the end there.

1166
01:06:10,639 --> 01:06:12,240
Now I consider my new list.

1167
01:06:12,240 --> 01:06:15,559
Again, this is going to be a recursive step.

1168
01:06:15,559 --> 01:06:18,440
The element at the front, again, I extract it.

1169
01:06:18,440 --> 01:06:19,760
It's just a number, right?

1170
01:06:19,760 --> 01:06:21,000
Nothing special here.

1171
01:06:21,000 --> 01:06:23,880
So you just go to the end, right?

1172
01:06:23,880 --> 01:06:25,039
Just like before.

1173
01:06:25,039 --> 01:06:28,159
I'm going to consider nothing to reverse for that 3.

1174
01:06:28,159 --> 01:06:32,840
Again, the 4, just like before, it goes to the end.

1175
01:06:32,840 --> 01:06:37,440
And now, what about this list with lists within it and so on?

1176
01:06:37,440 --> 01:06:41,079
Well, we've reached sort of this Quarancourt base case.

1177
01:06:41,079 --> 01:06:45,759
So there's nothing to put at the end, but you can imagine being put at the end if it was,

1178
01:06:45,759 --> 01:06:48,119
if there were other elements within it.

1179
01:06:48,119 --> 01:06:50,639
So this one is going to stay as is, sorry about that.

1180
01:06:50,639 --> 01:06:52,559
This one is going to stay as is.

1181
01:06:52,559 --> 01:06:55,639
So what we're going to do is going to say, well, you are a list.

1182
01:06:55,639 --> 01:06:57,199
Just like this one was a list, right?

1183
01:06:57,199 --> 01:06:59,480
It was a list with two numbers in it.

1184
01:06:59,480 --> 01:07:02,920
So you are also a list with two elements in it.

1185
01:07:02,920 --> 01:07:06,639
So the first step I would like you to do is reverse yourself.

1186
01:07:06,639 --> 01:07:10,960
So the 7, 8 will come to the front and the 5, 6 will go after it.

1187
01:07:13,960 --> 01:07:19,199
But it's elements also our lists.

1188
01:07:19,199 --> 01:07:26,000
So not only do I want to reverse you, but I want you to tell all your elements to reverse themselves.

1189
01:07:26,000 --> 01:07:35,239
So the 5, 6 should reverse to be a comma 6, 5, and the 7, 8 should reverse itself to become a 8, 7.

1190
01:07:38,519 --> 01:07:40,519
Okay, does that make sense?

1191
01:07:40,519 --> 01:07:42,679
Conceptually, I think we got it.

1192
01:07:42,679 --> 01:07:43,719
Okay.

1193
01:07:43,719 --> 01:07:49,199
So we want to reverse as far deep as we can until we get to some numbers.

1194
01:07:49,199 --> 01:07:50,199
Okay.

1195
01:07:50,199 --> 01:07:55,079
Okay. So let's write the code.

1196
01:07:55,079 --> 01:07:59,679
Okay. We're going to do a very similar thing to what we've done in the past, right?

1197
01:07:59,679 --> 01:08:03,639
All of these examples following the exact same pattern.

1198
01:08:03,639 --> 01:08:08,919
Consider a list with one element in it, and then consider a list with many elements in it.

1199
01:08:08,920 --> 01:08:18,199
If I have a list with one element in it, so here, here's a list, right?

1200
01:08:18,199 --> 01:08:21,640
It's going to have only one element in it.

1201
01:08:21,640 --> 01:08:30,359
If the list is a, if that element within that list is a number, I'm going to do something

1202
01:08:30,359 --> 01:08:36,880
different than if the element within this list is a list, right?

1203
01:08:36,880 --> 01:08:43,359
So what I actually want to do inside this, if LnL is equal to 1, is have two subparts,

1204
01:08:43,359 --> 01:08:44,359
right?

1205
01:08:44,359 --> 01:08:46,199
Depending on whether it's a list or not.

1206
01:08:46,199 --> 01:08:51,600
Because if it's just a number, I'm happy to just leave it as is, right?

1207
01:08:51,600 --> 01:08:54,680
Like this number is already in place, right?

1208
01:08:54,680 --> 01:08:56,880
It's already reversed.

1209
01:08:56,880 --> 01:09:04,880
But if the element within it is a list, right?

1210
01:09:04,880 --> 01:09:12,640
This element is one element inside my list, is also a list, I want it to reverse itself.

1211
01:09:12,640 --> 01:09:17,680
So if the length of the list is one, I now check the type.

1212
01:09:17,680 --> 01:09:21,560
If it's not a list, I do exactly the same thing as I did before.

1213
01:09:21,560 --> 01:09:24,400
If it's not a list, you are already reversed.

1214
01:09:24,400 --> 01:09:25,800
No need to reverse anything else.

1215
01:09:25,800 --> 01:09:26,800
Yes, question?

1216
01:09:26,800 --> 01:09:33,119
I guess the element can be spelled by one element.

1217
01:09:33,119 --> 01:09:37,560
Yeah, so we're just dividing it into one element or two, or more than one.

1218
01:09:37,560 --> 01:09:44,680
So in the case where we have one element, right, this is my list, and this is the one element.

1219
01:09:44,680 --> 01:09:50,600
And if I have an element that's a list itself, then this is still one element.

1220
01:09:50,600 --> 01:09:51,600
Yep.

1221
01:09:51,600 --> 01:09:57,600
Let's say you raise the brackets on the outside of the...

1222
01:09:57,600 --> 01:09:58,600
Yep.

1223
01:09:58,600 --> 01:10:02,600
This is now a list with two elements in it.

1224
01:10:02,600 --> 01:10:05,520
Yep, yeah, exactly.

1225
01:10:05,520 --> 01:10:09,840
But I am considering the case where I have a list with one element, it happens to be another

1226
01:10:09,840 --> 01:10:10,840
list.

1227
01:10:10,840 --> 01:10:14,360
And what's inside it, I don't currently care, because yeah.

1228
01:10:14,359 --> 01:10:18,239
So if it's not a list, it's already reversed.

1229
01:10:18,239 --> 01:10:22,039
Otherwise, what do we do?

1230
01:10:22,039 --> 01:10:27,439
Well we want to ask it to reverse itself, and that's the function we're currently writing.

1231
01:10:27,439 --> 01:10:28,439
Okay.

1232
01:10:28,439 --> 01:10:32,439
Is that cool?

1233
01:10:32,439 --> 01:10:33,439
I guess.

1234
01:10:33,439 --> 01:10:34,439
Okay.

1235
01:10:34,439 --> 01:10:38,079
Again, a lot of trust going on here, you guys.

1236
01:10:38,079 --> 01:10:46,479
So we're calling deep reverse this function we are currently writing on this list element,

1237
01:10:46,479 --> 01:10:47,559
L at index zero, right?

1238
01:10:47,559 --> 01:10:50,079
It's our only element.

1239
01:10:50,079 --> 01:10:53,319
Okay.

1240
01:10:53,319 --> 01:11:05,519
And notice, again, I've got these square brackets around here, because this function is

1241
01:11:05,520 --> 01:11:09,520
supposed to return a list, right?

1242
01:11:09,520 --> 01:11:15,120
So just like in the previous case where I slapped on some square brackets around the number,

1243
01:11:15,120 --> 01:11:18,000
I have to do it here as well.

1244
01:11:18,000 --> 01:11:19,000
Okay.

1245
01:11:19,000 --> 01:11:20,960
Everyone okay with this case?

1246
01:11:20,960 --> 01:11:23,600
Because the recursive step is going to be even crazier.

1247
01:11:23,600 --> 01:11:24,600
Okay.

1248
01:11:24,600 --> 01:11:28,600
Else, we have a list with more than one element in it.

1249
01:11:28,600 --> 01:11:29,600
Okay.

1250
01:11:29,600 --> 01:11:35,480
So we have a list with some stuff here, and then I have potentially another list.

1251
01:11:35,479 --> 01:11:39,559
And a bunch of other stuff here.

1252
01:11:39,559 --> 01:11:49,279
So then what I would like to do is, again, according to our pattern that we've been looking

1253
01:11:49,279 --> 01:11:54,079
at, is to say, I'm going to extract the first element in the list, right?

1254
01:11:54,079 --> 01:11:59,839
So if I have a list with many elements, let's extract the first one and deal with it.

1255
01:11:59,840 --> 01:12:04,720
But again, I need to take care because that first element may be a number, or a string

1256
01:12:04,720 --> 01:12:08,520
or whatever, or it may be a list.

1257
01:12:08,520 --> 01:12:10,760
Okay.

1258
01:12:10,760 --> 01:12:13,680
And I deal with these two cases separately.

1259
01:12:13,680 --> 01:12:18,000
If it's just a number, so that's this if case here, so if the type of L at zero, the

1260
01:12:18,000 --> 01:12:23,680
thing that I've extracted as a list, then what I need to do is what I had in the previous

1261
01:12:23,680 --> 01:12:24,680
example.

1262
01:12:24,760 --> 01:12:29,880
I grab that first element, slap square brackets around it, and concatenate it with deeper

1263
01:12:29,880 --> 01:12:32,760
verse of the rest of it.

1264
01:12:32,760 --> 01:12:34,280
Exactly the same as the previous case, right?

1265
01:12:34,280 --> 01:12:35,360
Because it's just a number.

1266
01:12:35,360 --> 01:12:36,360
I do what I did before.

1267
01:12:36,360 --> 01:12:39,320
Plop it to the end and we're done.

1268
01:12:39,320 --> 01:12:44,159
And again, I'm making a function call here to myself.

1269
01:12:44,159 --> 01:12:46,000
Else, okay.

1270
01:12:46,000 --> 01:12:53,119
This thing here, this L at x zero that I've extracted, is a list, right?

1271
01:12:53,119 --> 01:13:01,099
So not only do I have to call deeper verse on these guys here, but everybody together,

1272
01:13:01,099 --> 01:13:06,000
we have to call deeper verse on the first element as well, right?

1273
01:13:06,000 --> 01:13:07,000
Because it's a list.

1274
01:13:07,000 --> 01:13:08,159
I can't just put it to the end.

1275
01:13:08,159 --> 01:13:11,640
I want to reverse it to reverse all of its elements.

1276
01:13:11,640 --> 01:13:12,640
Okay.

1277
01:13:12,640 --> 01:13:17,359
So this is the code to do that, right?

1278
01:13:17,359 --> 01:13:26,399
This bit here, deeper verse L1 colon, tells the remainder of the list to reverse itself.

1279
01:13:26,399 --> 01:13:28,399
Exactly like we did in the integer case.

1280
01:13:28,399 --> 01:13:29,960
That was the same.

1281
01:13:29,960 --> 01:13:36,039
But we concatenate that again by putting square brackets around it, because we want to concatenate

1282
01:13:36,039 --> 01:13:41,119
with a list, we concatenate that with deeper verseing our element at index zero, right?

1283
01:13:41,119 --> 01:13:45,759
So not only do we put this at the end to reverse it, but we need to it to reverse all of its

1284
01:13:45,759 --> 01:13:46,759
elements as well.

1285
01:13:46,760 --> 01:13:47,760
Okay.

1286
01:13:47,760 --> 01:13:55,760
There are no more lines to this code, but what are your thoughts?

1287
01:13:55,760 --> 01:13:56,760
I know.

1288
01:13:56,760 --> 01:13:57,760
Yeah.

1289
01:13:57,760 --> 01:14:06,560
So, yeah, so we put square brackets because we want to maintain the same structure of

1290
01:14:06,560 --> 01:14:08,560
what the original list was.

1291
01:14:08,560 --> 01:14:13,199
So if it's an integer, I guess the simplest case to explain it.

1292
01:14:13,199 --> 01:14:16,920
So if it's an integer, you can't concatenate the list with the integer, right?

1293
01:14:16,920 --> 01:14:17,920
It'll be a problem.

1294
01:14:17,920 --> 01:14:26,319
So you want to concatenate the list with the integer inside a list as the single element.

1295
01:14:26,319 --> 01:14:28,519
So what we can do is we can simplify the code.

1296
01:14:28,519 --> 01:14:33,000
Again, I personally think of this as a little bit easier to think about just kind of as I'm

1297
01:14:33,000 --> 01:14:39,920
extracting out the case where I have one list with one thing and the list with many things.

1298
01:14:39,920 --> 01:14:43,480
But you can certainly think of it like this.

1299
01:14:43,480 --> 01:14:46,440
So if I have an empty list, just return an empty list.

1300
01:14:46,440 --> 01:14:52,720
Else, I'm extracting the element and index zero directly and I deeperverse that the rest

1301
01:14:52,720 --> 01:14:55,239
of the list concatenated with that element at the end.

1302
01:14:55,239 --> 01:15:00,480
Again, it's noting that we are putting this element as a list.

1303
01:15:00,480 --> 01:15:07,079
And else, we can deeperverse the rest of the list concatenated with deeperversing this

1304
01:15:07,079 --> 01:15:08,079
guy here, right?

1305
01:15:08,079 --> 01:15:12,119
Only do we put it at the end, but we also reverse all of its elements.

1306
01:15:12,119 --> 01:15:16,680
This is the simplified version, the simplified code.

1307
01:15:16,680 --> 01:15:17,680
Okay.

1308
01:15:17,680 --> 01:15:24,519
So this recursion that we saw, all these examples here that we applied to lists can actually

1309
01:15:24,519 --> 01:15:28,399
be applied to any indexable ordered sequences, right?

1310
01:15:28,399 --> 01:15:30,279
The same code will work for tuples.

1311
01:15:30,279 --> 01:15:35,760
The same code will work for strings, except for the one where, because you can't have strings

1312
01:15:35,760 --> 01:15:37,479
within strings within strings.

1313
01:15:37,479 --> 01:15:41,039
Certainly, you know, summing the elements in a list and checking whether an element is

1314
01:15:41,039 --> 01:15:43,879
in a list will work for tuples as well.

1315
01:15:43,879 --> 01:15:47,000
And, you know, some of these will work for strings as long as you can do that operation

1316
01:15:47,000 --> 01:15:48,479
on the strings, right?

1317
01:15:48,479 --> 01:15:50,519
Because these are all indexable sequences, right?

1318
01:15:50,519 --> 01:15:54,599
So it shouldn't be a problem.

1319
01:15:54,599 --> 01:15:59,279
So lots of takeaways here with recursion.

1320
01:15:59,279 --> 01:16:03,759
This last example, namely, is it looks really nice in the cleaned up form.

1321
01:16:03,760 --> 01:16:07,560
And it's, you know, like five lines of code to solve this really kind of hard problem

1322
01:16:07,560 --> 01:16:12,480
that you would otherwise have to solve using Y loops and four loops and things like that.

1323
01:16:12,480 --> 01:16:16,520
So I definitely encourage you to take a look through the Python tutor links that I've

1324
01:16:16,520 --> 01:16:17,520
put in.

1325
01:16:17,520 --> 01:16:23,800
My two tips, so the two big takeaways on recursion is this thing about case, cases, right?

1326
01:16:23,800 --> 01:16:28,239
Anytime you have a return statement and you're writing a recursive function, make sure that

1327
01:16:28,239 --> 01:16:32,280
every single return statement is returning something that is of that same type.

1328
01:16:32,279 --> 01:16:35,719
Otherwise, you'll have type mismatches all over the place, okay?

1329
01:16:35,719 --> 01:16:40,840
And then the recursive step takes advantage of the fact that you are returning these kinds

1330
01:16:40,840 --> 01:16:41,840
of types, right?

1331
01:16:41,840 --> 01:16:45,920
So then those operations and the recursive step will work with those types.

1332
01:16:45,920 --> 01:16:50,479
And the second is the function doesn't have to be efficient on the first pass, right?

1333
01:16:50,479 --> 01:16:54,319
So the way we thought about the problem by separating it and list with one element and

1334
01:16:54,319 --> 01:17:00,519
many is easier for me to think about because I can wrap my head around the problem.

1335
01:17:00,520 --> 01:17:04,160
And you don't have to write the most efficient code write off the bat for recursion.

1336
01:17:04,160 --> 01:17:05,360
Certainly, no need to do that.

1337
01:17:05,360 --> 01:17:09,120
But you can definitely clean it up after you have something that works.

1338
01:17:09,120 --> 01:17:13,440
Many practice problems on the Python file for today.

1339
01:17:13,440 --> 01:17:15,240
Many, many practice problems.

1340
01:17:15,240 --> 01:17:18,360
Memoizing the basketball, obviously, I mentioned that.

1341
01:17:18,360 --> 01:17:22,360
An example, a little practice with no lists within lists.

1342
01:17:22,360 --> 01:17:26,360
An example or a practice with lists within lists within lists.

1343
01:17:26,359 --> 01:17:30,599
And then I included three buggy recursion implementations for you to try to fix.

1344
01:17:30,599 --> 01:17:34,119
So a little bit of debugging practice plus recursion practice.

1345
01:17:34,119 --> 01:17:35,119
All right.

1346
01:17:35,119 --> 01:17:36,359
Thanks all.

