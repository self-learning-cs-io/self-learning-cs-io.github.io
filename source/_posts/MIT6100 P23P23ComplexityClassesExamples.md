---
title: MIT6100 P23P23ComplexityClassesExamples
---

1
00:00:00,000 --> 00:00:14,880
All right, so let's get started with today's lecture.

2
00:00:14,880 --> 00:00:20,780
We're going to look at a lot more code where we basically figure out the complexity class

3
00:00:20,780 --> 00:00:22,760
of that given code.

4
00:00:22,760 --> 00:00:26,480
So first, let's remember what we learned at the end of the last lecture.

5
00:00:26,480 --> 00:00:33,939
So we introduced this theta notation as a notation to mark the order of growth of a particular

6
00:00:33,939 --> 00:00:36,640
function or a particular piece of code, right?

7
00:00:36,640 --> 00:00:42,100
And the theta, we preferred over big O notation because the theta allowed us to get this

8
00:00:42,100 --> 00:00:47,100
asymptotic upper bound on the worst case runtime of our function.

9
00:00:47,100 --> 00:00:50,600
So we wanted an asymptotic bound as opposed to an upper bound because that upper bound

10
00:00:50,600 --> 00:00:53,900
can be anything that grows faster than our function, right?

11
00:00:53,899 --> 00:00:57,960
So we preferred this theta as the asymptotic bound.

12
00:00:57,960 --> 00:01:02,979
So at the end of last lecture, we basically said that given some function, the theta for

13
00:01:02,979 --> 00:01:08,259
that function is going to be the dominant term of that function.

14
00:01:08,259 --> 00:01:12,579
So if we have a whole bunch of terms, we focus on the one that grows the most.

15
00:01:12,579 --> 00:01:18,140
We drop any additive constants, any multiplicative constants, and all the other terms that don't

16
00:01:18,140 --> 00:01:22,079
grow as fast as that one, as that biggest one, okay?

17
00:01:22,079 --> 00:01:25,799
So we ended up with some classes of algorithms that we're going to go over today.

18
00:01:25,799 --> 00:01:29,239
We're going to see a bunch of codes that fall within those classes of algorithms.

19
00:01:29,239 --> 00:01:35,599
But before we go into that, I wanted to just quickly recap sort of the end of last lecture.

20
00:01:35,599 --> 00:01:41,519
So we saw an example that was pretty similar to this one, if not the same.

21
00:01:41,519 --> 00:01:46,759
So we know that given some function, we can grab the theta of that function by focusing

22
00:01:46,759 --> 00:01:48,400
on that dominant term.

23
00:01:48,400 --> 00:01:50,759
But how do we get at that function?

24
00:01:50,760 --> 00:01:56,800
So given some piece of code, the idea to get at that function was to first start by looking

25
00:01:56,800 --> 00:01:58,680
at the inputs to the function.

26
00:01:58,680 --> 00:02:03,880
So we have three inputs in this particular case, L, L, L, L, and L2.

27
00:02:03,880 --> 00:02:09,200
Once we figure out the inputs to this function, we go on and look at everything within the

28
00:02:09,200 --> 00:02:12,200
code that depends on these input parameters.

29
00:02:12,200 --> 00:02:17,719
So they could be direct, like a loop that goes over something related to the input, or

30
00:02:17,719 --> 00:02:21,599
it could be indirect, as we're going to see in some examples later today.

31
00:02:21,599 --> 00:02:28,639
But we basically look at just the parts of the function that deal with this input.

32
00:02:28,639 --> 00:02:36,919
If we want to be exact, we start by finding out the exact number of operations that we

33
00:02:36,919 --> 00:02:38,919
do within this code.

34
00:02:38,919 --> 00:02:43,280
That's something that we did when we counted the number of operations given some function.

35
00:02:43,280 --> 00:02:50,719
So we're going to count the number of operations given this code in relation to L1, L2, and L.

36
00:02:50,719 --> 00:02:56,759
So we've got this relationship that we can come up with that relates the number of operations

37
00:02:56,759 --> 00:03:00,520
run as a function of L, L1, and L2.

38
00:03:00,520 --> 00:03:08,199
So the one over here is constant because we just have an assignment here for some variable.

39
00:03:08,199 --> 00:03:11,439
The next term here is not constant.

40
00:03:11,439 --> 00:03:17,199
There are five constant things that we're doing, assigning i to be a value in range, grabbing

41
00:03:17,199 --> 00:03:19,519
indexing into L at i.

42
00:03:19,519 --> 00:03:25,639
That's two, indexing until i, L1 at i, that's three, checking the equality that's four, and

43
00:03:25,639 --> 00:03:28,000
then setting an L1 to be true, that's five.

44
00:03:28,000 --> 00:03:32,519
So there's five operations, but these are repeated how many times?

45
00:03:32,520 --> 00:03:39,320
So they're repeated length L1 times because this loop goes through length L1.

46
00:03:39,320 --> 00:03:46,280
So this term here, this four loop here, is length L1 times five number of operations.

47
00:03:46,280 --> 00:03:51,480
Then the one here is this assignment over here, and then this loop down at the bottom is

48
00:03:51,480 --> 00:03:58,480
exactly the same as the loop up at the top, except that now this bottom loop repeats length

49
00:03:58,480 --> 00:04:00,000
L2 times.

50
00:04:00,000 --> 00:04:04,800
So as L2 gets bigger, this loop will take longer to run.

51
00:04:04,800 --> 00:04:06,400
That's how we think about that.

52
00:04:06,400 --> 00:04:11,000
And then lastly, the plus two at the end of that relationship is finding the end of these

53
00:04:11,000 --> 00:04:14,960
two variables and then doing a return.

54
00:04:14,960 --> 00:04:20,040
So that leads us to simplify it as five times length L1 plus five times length L2 plus

55
00:04:20,040 --> 00:04:25,160
three, and this becomes the function that we can then grab the theta of.

56
00:04:25,160 --> 00:04:30,480
So now we just use the regular rules of theta, law of addition and law of multiplication.

57
00:04:30,480 --> 00:04:35,640
If there's anything to add or multiply, in this particular case, let's say that L1 and

58
00:04:35,640 --> 00:04:40,160
L2 are all the same length, and then we can simplify the above function to 10 length L plus

59
00:04:40,160 --> 00:04:41,000
three.

60
00:04:41,000 --> 00:04:46,480
And then the theta of that becomes just theta of length L. Because we dropped the three,

61
00:04:46,480 --> 00:04:55,080
we dropped the 10 multiplying L, and then we just keep length L.

62
00:04:55,079 --> 00:04:59,159
So this is how we get at the theta of a particular function.

63
00:04:59,159 --> 00:05:01,159
This is when we looked at last time.

64
00:05:01,159 --> 00:05:05,959
But as we look at more functions today, we're going to get better at just identifying the

65
00:05:05,959 --> 00:05:10,159
parts of the code that just deal with our inputs.

66
00:05:10,159 --> 00:05:14,639
This in L1 equals false, this in L2 equals false, this return, this end.

67
00:05:14,639 --> 00:05:17,079
Those are all constant things that are happening.

68
00:05:17,079 --> 00:05:18,959
So we don't need to focus in on those.

69
00:05:18,959 --> 00:05:22,719
We just maybe glance at them really quickly to make sure there's nothing funky going

70
00:05:22,720 --> 00:05:25,880
on that's dependent on the length of our lists.

71
00:05:25,880 --> 00:05:30,320
But we can just basically say, well, we've got our inputs, we've got one for loop that

72
00:05:30,320 --> 00:05:33,360
goes through the length, another for loop that goes through the length.

73
00:05:33,360 --> 00:05:38,000
They're in series, so we use the law of addition to say that this function is theta of length

74
00:05:38,000 --> 00:05:40,000
L1 plus length L2.

75
00:05:40,000 --> 00:05:44,720
So then we can quickly tell the theta of that function just by looking at the parts that

76
00:05:44,720 --> 00:05:47,440
depend on the input.

77
00:05:47,439 --> 00:05:54,319
So at the end of last lecture, we ended up with looking at these, sorry, deciding that

78
00:05:54,319 --> 00:06:01,040
these are the complexity classes that we can categorize a lot of our functions in.

79
00:06:01,040 --> 00:06:06,319
So theta of 1 is constant, theta of log n is logarithmic, here n is assuming n is the

80
00:06:06,319 --> 00:06:08,279
input to my function.

81
00:06:08,279 --> 00:06:16,079
Theta of n is linear, theta of n log n is log linear, theta of n, if n is my input to

82
00:06:16,079 --> 00:06:21,599
some constant, like n squared and cubed runs in polynomial time, and then theta of some

83
00:06:21,599 --> 00:06:26,839
constant to the n, where n is my input, is going to be exponential, like 2 to the n, 3 to

84
00:06:26,839 --> 00:06:30,360
the n, those are all considered exponential time algorithms.

85
00:06:30,360 --> 00:06:38,240
And when we write our algorithms, we want to be up in this maybe top four, maybe top five,

86
00:06:38,240 --> 00:06:42,479
though polynomial is going to grow pretty quickly as our input gets big.

87
00:06:42,480 --> 00:06:47,080
So if we can take our code and just quickly glance at it and classify it within one of

88
00:06:47,080 --> 00:06:54,000
these algorithms, that can guide us towards deciding whether the algorithm we wrote was

89
00:06:54,000 --> 00:06:55,640
good or bad, right?

90
00:06:55,640 --> 00:06:59,680
If we glance at it and say, hey, this algorithm is exponential or this function that I wrote

91
00:06:59,680 --> 00:07:04,319
is exponential, maybe we want to rethink our approach to the problem and try to get it

92
00:07:04,319 --> 00:07:08,480
into one of the upper complexity classes.

93
00:07:08,480 --> 00:07:12,140
So what we're going to do the rest of this class is just go through a bunch of these

94
00:07:12,140 --> 00:07:16,160
complexity classes and we're going to see some codes that belong to these complexity

95
00:07:16,160 --> 00:07:22,840
classes and hopefully give you an idea of what code looks like that fits in one of these

96
00:07:22,840 --> 00:07:24,960
complexity classes.

97
00:07:24,960 --> 00:07:28,120
So the first one we'll look at is the constant complexity class.

98
00:07:28,120 --> 00:07:29,640
It's pretty simple.

99
00:07:29,640 --> 00:07:32,759
It's not really very interesting.

100
00:07:32,759 --> 00:07:37,160
If your code belongs in this constant complexity class, that means that it does not depend

101
00:07:37,160 --> 00:07:38,160
on the input at all.

102
00:07:38,160 --> 00:07:40,600
It always runs in constant time.

103
00:07:40,600 --> 00:07:47,880
So your code can have loops or it can have some sort of recursive structure, but that loop

104
00:07:47,880 --> 00:07:51,720
or that recursive structure doesn't depend on the input at all, right?

105
00:07:51,720 --> 00:07:53,040
So it's fine to have loops.

106
00:07:53,040 --> 00:07:57,440
It's just as long as it doesn't depend on the input, it's considered constant.

107
00:07:57,440 --> 00:08:00,920
So there are some built-in operations that are constant time.

108
00:08:00,920 --> 00:08:06,040
So if you see any of these operations like indexing into a list, a penning to a list,

109
00:08:06,040 --> 00:08:11,680
grabbing the value associated with the dictionary, those are all constant time.

110
00:08:11,680 --> 00:08:15,200
So if you see them in your code, you don't need to account for them at all.

111
00:08:15,200 --> 00:08:20,760
But we're going to see in a few slides that there are some operations on list and dictionaries

112
00:08:20,760 --> 00:08:24,160
that do add some non-constant complexity.

113
00:08:24,160 --> 00:08:25,840
So you can't just brush them off.

114
00:08:25,840 --> 00:08:29,280
All right, let's look at a couple examples of code.

115
00:08:29,280 --> 00:08:34,600
So here's a very simple function, add x,y, so x and y are my inputs.

116
00:08:34,600 --> 00:08:39,639
There is no loop or nothing recursive, nothing that takes time here, that nothing that

117
00:08:39,639 --> 00:08:41,360
repeats in this code.

118
00:08:41,360 --> 00:08:43,800
So the complexity of this code is theta of 1.

119
00:08:43,800 --> 00:08:45,920
Okay, that's it.

120
00:08:45,920 --> 00:08:46,920
Here's another example.

121
00:08:46,920 --> 00:08:49,200
This is our kilometer example.

122
00:08:49,200 --> 00:08:51,920
Taking in miles, all it does is a multiplication.

123
00:08:51,920 --> 00:08:53,440
Again, theta of 1.

124
00:08:53,440 --> 00:08:57,879
There's nothing interesting going on here, no loop, no recursive.

125
00:08:57,879 --> 00:09:01,759
Here's a function that does have a loop within it.

126
00:09:01,759 --> 00:09:04,200
The first thing we look at, though, is my input.

127
00:09:04,200 --> 00:09:06,000
What variables my input here?

128
00:09:06,000 --> 00:09:07,879
It's x, right?

129
00:09:07,879 --> 00:09:11,759
So which part of my code here depends on x?

130
00:09:11,759 --> 00:09:19,360
Well, there's something that I'm adding here, so I'm adding x onto some number.

131
00:09:19,360 --> 00:09:22,759
And I do have a loop, but does the loop depend on x?

132
00:09:22,759 --> 00:09:28,360
No, it depends on some number that is just a hundred within my function.

133
00:09:28,360 --> 00:09:34,680
If y equals x here, then this code wouldn't be constant, right?

134
00:09:34,680 --> 00:09:37,320
Because this loop will go through x times.

135
00:09:37,320 --> 00:09:41,960
But here y is just a hundred, so this code is theta of 1 complexity.

136
00:09:41,960 --> 00:09:46,120
There's nothing here that depends on x as x grows.

137
00:09:46,120 --> 00:09:50,399
All right, so not very interesting examples there.

138
00:09:50,399 --> 00:09:58,559
So let's move on to the next simplest class of functions, the linear complexity class.

139
00:09:58,559 --> 00:10:06,639
And these functions will be usually denoted by one loop, or maybe many loops in series

140
00:10:06,639 --> 00:10:08,319
or something like that.

141
00:10:08,319 --> 00:10:12,240
But these loops all depend just linearly on n.

142
00:10:12,240 --> 00:10:18,399
You could also have a recursive function that repeats that's also linearly an n.

143
00:10:18,399 --> 00:10:21,039
So we're going to see an example of a recursive function in a little bit.

144
00:10:21,039 --> 00:10:26,959
But first we'll start out with just some functions that loop linearly with it.

145
00:10:26,959 --> 00:10:32,079
There are some built-in operations though that are linear in time.

146
00:10:32,079 --> 00:10:38,079
So if we ever see these operations within our code, we can't ignore them.

147
00:10:38,079 --> 00:10:43,319
Because they will contribute a theta of n complexity to our code.

148
00:10:43,320 --> 00:10:44,840
So we have to account for them.

149
00:10:44,840 --> 00:10:51,400
Like if we have some e in n within some other loop, we can't just say this e in n is constant.

150
00:10:51,400 --> 00:10:56,760
We'd have to use the law of multiplication or something like that to account for it.

151
00:10:56,760 --> 00:11:01,000
So checking if an element is in a list obviously is linear because you have to look at each

152
00:11:01,000 --> 00:11:06,600
element in the list to determine that that e is in it or not.

153
00:11:06,600 --> 00:11:11,120
Making a copy of your list is also linear in time.

154
00:11:11,120 --> 00:11:14,399
But though we're making a copy of half of our list, right?

155
00:11:14,399 --> 00:11:23,320
So the first half of our list, it's still linear because copying 0.5 times length L is still

156
00:11:23,320 --> 00:11:24,759
theta of length L, right?

157
00:11:24,759 --> 00:11:28,600
That multiplicative constant on the front of our length L is 0.5.

158
00:11:28,600 --> 00:11:32,679
So if we drop it, that's still theta of length L.

159
00:11:32,679 --> 00:11:36,360
Checking for equality between two lists is also constant because you have to look at each

160
00:11:36,360 --> 00:11:40,879
element in the list, compare them to make sure that they're the same or not.

161
00:11:40,879 --> 00:11:45,519
Deleting an item in a list is also linear in time.

162
00:11:45,519 --> 00:11:47,879
Sorry, this one was constant.

163
00:11:47,879 --> 00:11:50,879
Sorry, this one was linear in time.

164
00:11:50,879 --> 00:11:55,360
This deletion is also linear in time just because of the way lists are stored in memory.

165
00:11:55,360 --> 00:12:01,480
So if you delete an item in the end of from your list, Python will count that as linear

166
00:12:01,480 --> 00:12:03,679
time complexity.

167
00:12:03,679 --> 00:12:05,279
So let's look at some examples.

168
00:12:05,279 --> 00:12:08,759
First we'll just start out with just some regular functions with loops and then we'll

169
00:12:08,759 --> 00:12:11,120
look at one recursive function.

170
00:12:11,120 --> 00:12:14,679
So here I've got multiply x by y.

171
00:12:14,679 --> 00:12:23,559
It loops through range y and it just adds x plus x plus x y times.

172
00:12:23,559 --> 00:12:25,120
So I've got two parameters here.

173
00:12:25,120 --> 00:12:29,879
So I need to think about the complexity of this function with regards to both of them.

174
00:12:29,879 --> 00:12:34,279
So the complexity with respect to y is theta of y, right?

175
00:12:34,279 --> 00:12:37,600
Because I've got one loop, that's a function of y.

176
00:12:37,600 --> 00:12:40,080
So this loop will repeat however big y is.

177
00:12:40,080 --> 00:12:45,159
So if y increases, the time this loop takes will also increase, right?

178
00:12:45,159 --> 00:12:51,000
So the theta complexity of this function is theta of y with respect to y.

179
00:12:51,000 --> 00:12:55,360
But what's the complexity of this function with respect to x?

180
00:12:55,360 --> 00:12:59,080
I have no looping structure here that's with respect to x, right?

181
00:12:59,080 --> 00:13:02,240
All I'm doing the x is just adding on to some number.

182
00:13:02,240 --> 00:13:05,320
So the complexity with respect to x is just theta of 1.

183
00:13:05,320 --> 00:13:09,400
So the overall complexity of this function is just going to be theta of y.

184
00:13:09,400 --> 00:13:15,320
x does not contribute anything to the runtime of this.

185
00:13:15,320 --> 00:13:20,400
All right, so this and the previous sort of loop function from the constant kind of tells

186
00:13:20,400 --> 00:13:23,800
us that we need to be careful about what the inputs are, right?

187
00:13:23,800 --> 00:13:29,760
When we report the complexity, we have to report it with respect to the inputs to our function.

188
00:13:29,760 --> 00:13:34,760
We don't always just say theta of n or theta of n squared or theta of length n, whatever

189
00:13:34,759 --> 00:13:37,879
it is, we have to relate it to the inputs to our function.

190
00:13:37,879 --> 00:13:43,840
And if we have more than one input, we have to be careful to account for all of the inputs

191
00:13:43,840 --> 00:13:45,519
that contribute to the complexity.

192
00:13:45,519 --> 00:13:49,080
All right, let's look at another example.

193
00:13:49,080 --> 00:13:53,919
So here's one where you take in a string s.

194
00:13:53,919 --> 00:13:57,039
We loop through each character in s.

195
00:13:57,039 --> 00:14:01,080
We cast each character to an integer.

196
00:14:01,080 --> 00:14:02,720
And then we add on to some value.

197
00:14:02,720 --> 00:14:08,480
So we're essentially just adding on all of the characters in s, in the string s.

198
00:14:08,480 --> 00:14:13,000
So this has one loop that loops through all the elements in s.

199
00:14:13,000 --> 00:14:17,320
Now, if s is a string, what's going to make this program slower?

200
00:14:17,320 --> 00:14:23,200
Is it that the string, so the numerical value of the string is bigger?

201
00:14:23,200 --> 00:14:29,160
No, because if I'm looping through the string 1, 0, 0, 0, it's going to take the same

202
00:14:29,160 --> 00:14:32,680
amount of time as if I'm looping through the string 9, 9, 9, 9.

203
00:14:32,679 --> 00:14:35,239
It's the length of the string that matters.

204
00:14:35,239 --> 00:14:37,199
So that's what this loop is doing, right?

205
00:14:37,199 --> 00:14:40,279
It's taking into account the length of the string.

206
00:14:40,279 --> 00:14:44,199
So if my string is longer, then it's going to take longer to run.

207
00:14:44,199 --> 00:14:47,959
So the complexity of this function is just theta of length s.

208
00:14:47,959 --> 00:14:52,120
That's the length of the string contributes to slowing down my function.

209
00:14:53,439 --> 00:14:55,000
Everything else that we do is constant.

210
00:14:55,000 --> 00:14:58,079
So the overall complexity is theta of length s.

211
00:14:58,080 --> 00:15:03,280
Or if it's simpler, you can just say theta of n, but then you have to say where n is

212
00:15:03,280 --> 00:15:04,879
something like the rest.

213
00:15:07,560 --> 00:15:08,840
All right, here's another example.

214
00:15:08,840 --> 00:15:13,480
This is a factorial program that does it iteratively.

215
00:15:13,480 --> 00:15:23,160
So it's going to use a loop to keep multiplying on i to calculate the factorial of some n.

216
00:15:23,160 --> 00:15:25,240
So in this case, my input is n.

217
00:15:25,240 --> 00:15:31,639
So now I'm going to look through my function to see what part of my function depends on n.

218
00:15:31,639 --> 00:15:33,680
So here n is just a number.

219
00:15:33,680 --> 00:15:37,399
And I'm looping through from two all the way up to n plus one.

220
00:15:37,399 --> 00:15:40,440
So I'm going to loop through n minus one times overall.

221
00:15:43,799 --> 00:15:47,799
Since I'm looping through n minus one times, there's nothing else really that's contributing

222
00:15:47,799 --> 00:15:49,120
to the complexity.

223
00:15:49,120 --> 00:15:52,279
So theta of n minus one is just theta of n.

224
00:15:53,279 --> 00:15:56,720
So the complexity of this function is just theta of n.

225
00:15:59,720 --> 00:16:01,679
Everyone, OK, so far.

226
00:16:01,679 --> 00:16:06,919
So very simple programs that just have one loop just depends on the input linear.

227
00:16:09,039 --> 00:16:14,120
OK, I will make a little note about the factorial because this is kind of something important.

228
00:16:14,120 --> 00:16:18,919
It's going to tell us kind of the difference between theory, which is what this class is mostly

229
00:16:18,919 --> 00:16:22,639
about, or the set of lectures, and the real world.

230
00:16:22,639 --> 00:16:26,959
So I actually ran the iterative version of factorial on the computer.

231
00:16:26,959 --> 00:16:30,120
And you can see here, I've multiplied the input by two.

232
00:16:30,120 --> 00:16:32,479
So 40, 80, 160, 320, and so on.

233
00:16:32,479 --> 00:16:39,240
So as I'm multiplying the input by two, if I'm expecting this function to be linearly related

234
00:16:39,240 --> 00:16:45,559
to the input, I'm expecting that the time that this function takes to run is going to be

235
00:16:45,559 --> 00:16:47,719
approximately twice as long.

236
00:16:47,719 --> 00:16:51,639
If the input increases by two, the time it takes for this program to run should just increase

237
00:16:51,639 --> 00:16:53,679
by two as well.

238
00:16:53,679 --> 00:16:55,199
And it does.

239
00:16:55,199 --> 00:16:59,399
It does all the way up to somewhere between 640 and 1280.

240
00:17:02,639 --> 00:17:07,720
So if we do the math, that's approximately times two each time minus, because we're just

241
00:17:07,720 --> 00:17:09,039
doing times here.

242
00:17:09,039 --> 00:17:15,079
But then, after somewhere within 640 and 1280, the time that it takes to run my

243
00:17:15,079 --> 00:17:19,119
program no longer follows this linear pattern.

244
00:17:19,119 --> 00:17:24,599
In fact, it starts to grow faster than linear, and from at a first glance, it looks like

245
00:17:24,599 --> 00:17:28,279
it grows squared, polynomial.

246
00:17:28,279 --> 00:17:33,839
So instead of, if you increase the input by two, it looks like the time it takes for

247
00:17:33,839 --> 00:17:39,559
this program to run increases by four, after some point.

248
00:17:39,559 --> 00:17:45,919
And that's because, in the real world, I've got Python running on the machine, there's

249
00:17:45,919 --> 00:17:53,480
only some set number of bits that my computer can hold, right, when it stores numbers.

250
00:17:53,480 --> 00:18:01,839
And the factorial of some number within between 640 and 1280 becomes so large that when Python

251
00:18:01,839 --> 00:18:08,399
and the machine is trying to deal with multiplying these big numbers by these big numbers altogether,

252
00:18:08,400 --> 00:18:13,400
it's just taking a really long time to run, because it can't store these big numbers as

253
00:18:13,400 --> 00:18:16,960
efficiently as it could store these smaller numbers.

254
00:18:16,960 --> 00:18:22,000
And so in the real world, what ends up happening is after some, you know, after I'm trying to

255
00:18:22,000 --> 00:18:27,600
store some really large value and doing the operations with some really large values,

256
00:18:27,600 --> 00:18:33,960
the time complexity goes down dramatically, right, and squared is a pretty big jump.

257
00:18:33,960 --> 00:18:38,559
And so this is, kind of, shows the difference between theory and the real world, right,

258
00:18:38,559 --> 00:18:44,920
so in the real world, we can't store these values as efficiently as they get big.

259
00:18:44,920 --> 00:18:59,160
Yeah, so if we use like a machine that had more bits to store values, then we'd be able

260
00:18:59,160 --> 00:19:02,519
to be more efficient farther along, right?

261
00:19:02,519 --> 00:19:06,119
Yeah, exactly.

262
00:19:06,119 --> 00:19:10,960
And we could, I guess we could, if we had a language that was maybe doing some smarter things

263
00:19:10,960 --> 00:19:15,559
and storing these big values in a much smarter way, that could also have an impact in the

264
00:19:15,559 --> 00:19:18,839
timing as well.

265
00:19:18,839 --> 00:19:23,000
But for the purposes of this class, we're just interested in the theoretical, you know,

266
00:19:23,000 --> 00:19:24,960
the theoretical happenings here, right?

267
00:19:24,960 --> 00:19:30,759
So as the input increases by x, we expect that the time that it takes to run the program

268
00:19:30,759 --> 00:19:34,640
will be x times as long, right, because we're looking at values that are really, really

269
00:19:34,640 --> 00:19:37,079
big in theory.

270
00:19:37,079 --> 00:19:40,680
Okay, so let's look at another example.

271
00:19:40,680 --> 00:19:45,680
So this is a factorial function that does it recursively.

272
00:19:45,680 --> 00:19:47,879
We've seen this function before.

273
00:19:47,879 --> 00:19:50,279
We just looked at the iterative version of factorial.

274
00:19:50,279 --> 00:19:53,359
Now we're looking at the recursive version of factorial.

275
00:19:53,359 --> 00:19:54,359
So what do we have?

276
00:19:54,359 --> 00:20:00,599
We have one base case, right, that our code will eventually get down to and a recursive

277
00:20:00,599 --> 00:20:06,519
step, which is just n times factorial and minus one.

278
00:20:06,519 --> 00:20:11,159
So how do we do the analysis of recursive algorithm?

279
00:20:11,159 --> 00:20:15,119
Because in this recursive algorithm, we don't have a loop, right?

280
00:20:15,119 --> 00:20:19,799
In the previous examples, we had a loop that we could definitively say, hey, this loop

281
00:20:19,799 --> 00:20:25,599
will repeat this many times, so clearly increasing and will increase the lot the time it takes

282
00:20:25,599 --> 00:20:27,319
for this loop to run.

283
00:20:27,319 --> 00:20:32,359
So when we're dealing with recursive functions, we think about how many times the recursive

284
00:20:32,359 --> 00:20:35,079
function is going to be called, right?

285
00:20:35,079 --> 00:20:40,359
Because when we call factorial, right, we have factorial of some, you know, five or whatever

286
00:20:40,359 --> 00:20:41,839
it is.

287
00:20:41,839 --> 00:20:46,839
And this calls factorial of four and this calls factorial of three, right?

288
00:20:46,839 --> 00:20:54,879
And so we have this chain of function calls where we get down to the base case.

289
00:20:54,880 --> 00:21:01,880
And once we get down to the base case, we start to kick off the step that returns the

290
00:21:01,880 --> 00:21:03,800
result one at a time.

291
00:21:03,800 --> 00:21:10,720
So when we're talking about recursive functions, what we really care about is how many times

292
00:21:10,720 --> 00:21:14,160
we call the function, okay?

293
00:21:14,160 --> 00:21:17,760
That's our quote unquote loop for recursive functions, right?

294
00:21:17,760 --> 00:21:22,680
It's just the function calling itself to ask itself to do the work.

295
00:21:22,680 --> 00:21:27,039
And it does the work with a slightly changed parameter, right?

296
00:21:27,039 --> 00:21:32,720
So what we need to do is think about how many times does this function call itself?

297
00:21:32,720 --> 00:21:37,920
And on top of that, is there some sort of overhead that's not constant?

298
00:21:37,920 --> 00:21:43,000
In this particular case, when we call factorial recursive, we're going to go essentially

299
00:21:43,000 --> 00:21:45,960
theta of n times, right?

300
00:21:45,960 --> 00:21:49,960
Because we start with n, then we do n minus 1, n minus 2, and minus 3 all the way up

301
00:21:49,960 --> 00:21:51,400
down to zero, right?

302
00:21:51,400 --> 00:21:55,960
So effectively, we've called ourselves about n times, so theta of n.

303
00:21:55,960 --> 00:22:00,780
And the overhead for each one of those calls is constant because all I'm doing to n is

304
00:22:00,780 --> 00:22:03,920
subtracting by 1, and that's a constant thing, right?

305
00:22:03,920 --> 00:22:08,640
And minus 1 is theta of 1, it's just constant.

306
00:22:08,640 --> 00:22:15,640
So the overall complexity of this is just theta of n, where n is just my input, okay?

307
00:22:15,640 --> 00:22:21,080
So what we notice is that the iterative and the recursive versions of factorial are both

308
00:22:21,079 --> 00:22:23,119
theta of n, right?

309
00:22:23,119 --> 00:22:28,919
Which means that, generally speaking, if we were trying to decide whether to implement factorial

310
00:22:28,919 --> 00:22:34,039
recursively or iteratively, it won't really matter in the long run, because the worst case

311
00:22:34,039 --> 00:22:37,439
complexity is theta of n, it's the same for both.

312
00:22:37,439 --> 00:22:40,359
So it would be your choice, which one to actually use.

313
00:22:40,359 --> 00:22:46,559
All right, so then it maybe comes down to readability or other factors.

314
00:22:46,559 --> 00:22:50,119
All right.

315
00:22:50,119 --> 00:22:51,759
Another example, so this is compound.

316
00:22:51,759 --> 00:22:56,719
We saw this last lecture, we actually timed it and counted how many, actually, I don't

317
00:22:56,719 --> 00:22:57,719
remember.

318
00:22:57,719 --> 00:23:01,879
I don't think we counted the number of operations, or maybe we did, but we definitely

319
00:23:01,879 --> 00:23:03,559
timed it.

320
00:23:03,559 --> 00:23:07,359
So this function took in three parameters.

321
00:23:07,359 --> 00:23:12,639
So we can have to be careful, which one of these parameters or which parameters of these

322
00:23:12,639 --> 00:23:15,000
actually contribute to my complexity?

323
00:23:15,000 --> 00:23:24,759
So this function calculates the amount of money I have if I invest some monthly amount

324
00:23:24,759 --> 00:23:28,960
at some monthly interest over some number of months.

325
00:23:28,960 --> 00:23:34,880
So the loop here iterates through number of months, and then everything else seems to

326
00:23:34,880 --> 00:23:35,880
be constant, right?

327
00:23:35,880 --> 00:23:38,039
I have gone one loop.

328
00:23:38,039 --> 00:23:40,400
So the inside of the loop is constant.

329
00:23:40,400 --> 00:23:43,440
I do have to double check that, but so far so good.

330
00:23:43,519 --> 00:23:45,039
It's not looping anything else.

331
00:23:45,039 --> 00:23:48,400
It's not a function of anything else.

332
00:23:48,400 --> 00:23:53,840
The loop itself though is theta of n months, right?

333
00:23:53,840 --> 00:23:58,519
So the overall complexity of this function is theta of n months, or we could say theta

334
00:23:58,519 --> 00:24:02,519
of n, where n is equal to n months.

335
00:24:02,519 --> 00:24:06,480
None of the other parameters contribute to my complexity, and that's exactly what we

336
00:24:06,480 --> 00:24:08,519
saw when we ran the code, right?

337
00:24:08,519 --> 00:24:13,120
We ran it by changing each one of the parameters, and we saw only n months contributed to a

338
00:24:13,119 --> 00:24:18,679
slowing program.

339
00:24:18,679 --> 00:24:25,319
If we really wanted to, we could have done this analysis in depth, right?

340
00:24:25,319 --> 00:24:29,399
As we've done last lecture to actually count the full number of operations, or as we did

341
00:24:29,399 --> 00:24:31,159
at the beginning of this lecture.

342
00:24:31,159 --> 00:24:38,119
So total equals zero is theta of one, the loop is theta of n months multiplied by four

343
00:24:38,119 --> 00:24:39,119
operations.

344
00:24:39,119 --> 00:24:48,119
So I, grabbing a value in range, taking multiplication, addition, and then saving that into total, that's

345
00:24:48,119 --> 00:24:54,319
four, multiplied by theta of n, where n is n months, plus theta of one to do the return.

346
00:24:54,319 --> 00:24:59,439
So that ends up being theta of one plus four and plus one, which just simplifies to theta

347
00:24:59,439 --> 00:25:01,159
of n, where n is n months.

348
00:25:01,159 --> 00:25:02,159
Yeah.

349
00:25:02,160 --> 00:25:17,640
So we're just looking at operations, right?

350
00:25:17,640 --> 00:25:23,360
We're doing calculations with interest and invest and multiplying it with total, right?

351
00:25:23,360 --> 00:25:28,360
But the fact that interest is bigger, like if the interest is one dollar, or if the interest

352
00:25:28,359 --> 00:25:34,199
is a thousand dollars, is this going to make that line of code much slower?

353
00:25:34,199 --> 00:25:35,959
No, right?

354
00:25:35,959 --> 00:25:39,279
Because all we're doing is a multiplication between two numbers, right?

355
00:25:39,279 --> 00:25:41,319
So that's why the inside is theta of one, right?

356
00:25:41,319 --> 00:25:45,959
But having a loop where we repeat this over and over again, is going to slow the program

357
00:25:45,959 --> 00:25:46,959
down.

358
00:25:46,959 --> 00:25:47,959
Yeah.

359
00:25:47,959 --> 00:25:48,959
Okay.

360
00:25:48,959 --> 00:25:54,479
How about this Fibonacci function?

361
00:25:54,479 --> 00:25:57,240
So this is an iterative version of Fibonacci.

362
00:25:57,240 --> 00:25:59,839
I don't know if we've seen this before.

363
00:25:59,839 --> 00:26:05,759
Again, we could do sort of a rough quick analysis where we just briefly glance at every

364
00:26:05,759 --> 00:26:11,920
single line and ask ourselves whether it's contributing theta of one or something worse

365
00:26:11,920 --> 00:26:17,200
to our total run time analysis.

366
00:26:17,200 --> 00:26:22,200
So we've got this first part here, which is just constant, state of one, right?

367
00:26:22,200 --> 00:26:24,079
Nothing here is loopy.

368
00:26:24,079 --> 00:26:26,639
There's no recursive going on.

369
00:26:26,639 --> 00:26:30,559
Nothing that depends on the input in a non-constant way.

370
00:26:30,559 --> 00:26:34,599
In the else, we've got this constant, again, just assigning two parameters.

371
00:26:34,599 --> 00:26:36,119
We've got a loop.

372
00:26:36,119 --> 00:26:41,039
So now this loop is going to be non-constant.

373
00:26:41,039 --> 00:26:44,679
The stuff inside the loop is constant, though, right?

374
00:26:44,679 --> 00:26:47,759
So the loop itself depends on n, my input.

375
00:26:47,759 --> 00:26:50,279
So that's going to be theta of n.

376
00:26:50,279 --> 00:26:53,199
But that theta of n is multiplied by theta of one.

377
00:26:53,200 --> 00:26:55,480
The stuff inside the loop is just constant.

378
00:26:55,480 --> 00:26:58,720
So that's theta of n times theta of one, which is just theta of n.

379
00:26:58,720 --> 00:27:01,920
And then the return, of course, is theta of one.

380
00:27:01,920 --> 00:27:05,920
So we could do a calculation like this, or you could just quickly scan and say, hey,

381
00:27:05,920 --> 00:27:10,279
I've just got a loop that depends on n, and that's theta of n.

382
00:27:10,279 --> 00:27:14,440
So the overall complexity of this, if we wanted to be detailed, is this, right?

383
00:27:14,440 --> 00:27:19,240
Theta of one plus theta of one plus theta of n times theta of one plus theta of one.

384
00:27:19,240 --> 00:27:23,920
But overall, that just gives us theta of n, because that loop is the only thing that

385
00:27:23,920 --> 00:27:26,000
depends on my input.

386
00:27:26,000 --> 00:27:27,000
OK?

387
00:27:27,000 --> 00:27:29,200
Everyone all right so far?

388
00:27:29,200 --> 00:27:31,480
OK.

389
00:27:31,480 --> 00:27:32,000
Perfect.

390
00:27:32,000 --> 00:27:36,839
So now, let's move on to the second easiest complexity to kind of identify.

391
00:27:36,839 --> 00:27:39,039
That's the polynomial complexity.

392
00:27:39,039 --> 00:27:45,960
So polynomial complexity generally deals with functions that have nested loops, right?

393
00:27:45,960 --> 00:27:51,279
So if we have two nested loops that linearly depend on my input, that's going to be a function

394
00:27:51,279 --> 00:27:53,000
that's n squared.

395
00:27:53,000 --> 00:27:56,799
If I've got three nested loops that all depend on my input linearly, that's going to be

396
00:27:56,799 --> 00:27:59,120
n cubed, right?

397
00:27:59,120 --> 00:28:02,319
So let's see some examples.

398
00:28:02,319 --> 00:28:06,039
So here I have a really simple nested loop situation.

399
00:28:06,039 --> 00:28:13,680
I've got a function called g, and it's going to take in an input n.

400
00:28:13,680 --> 00:28:17,120
So I'm going to look for everything that depends on n.

401
00:28:17,120 --> 00:28:22,680
Well, I've got a for loop here that's going to iterate n times, that's theta of n.

402
00:28:22,680 --> 00:28:24,840
And I've got an inner for loop.

403
00:28:24,840 --> 00:28:33,039
So for each thing in my outer for loop, I'm going to do the inner thing n times as well.

404
00:28:33,039 --> 00:28:36,880
And then the stuff inside my inner for loop is constant.

405
00:28:36,880 --> 00:28:41,560
So that's theta of n, and the stuff outside of my loops are, sorry, the stuff inside my

406
00:28:41,559 --> 00:28:46,159
inner for loop is theta of 1, and the stuff outside of any of the for loops are theta of

407
00:28:46,159 --> 00:28:47,159
1 as well.

408
00:28:47,159 --> 00:28:49,519
So they contribute nothing to this complexity.

409
00:28:49,519 --> 00:28:55,319
So the only thing that I need to account for is my outer loop, which is theta of n, and

410
00:28:55,319 --> 00:29:02,399
law of multiplication says my inner loop is going to be multiplied, it's complexity

411
00:29:02,399 --> 00:29:04,919
to my outer loop's complexity.

412
00:29:04,919 --> 00:29:08,519
So the overall complexity of this function is theta of n squared, because the number of

413
00:29:08,519 --> 00:29:15,519
times that I'm going to do this operation is going to be n squared times.

414
00:29:15,519 --> 00:29:16,519
Okay.

415
00:29:16,519 --> 00:29:17,519
Perfect.

416
00:29:17,519 --> 00:29:19,519
All right.

417
00:29:19,519 --> 00:29:22,519
So now let's look at some examples with lists.

418
00:29:22,519 --> 00:29:23,519
Right.

419
00:29:23,519 --> 00:29:25,519
We haven't seen those yet.

420
00:29:25,519 --> 00:29:27,519
So now we have to think about the input.

421
00:29:27,519 --> 00:29:30,519
In this case, it's going to be two lists.

422
00:29:30,519 --> 00:29:34,519
And when we're dealing with lists, one of the things that, sorry, the most common thing we're

423
00:29:35,019 --> 00:29:41,519
interested in is what happens to the behavior of the function as the lists get bigger.

424
00:29:41,519 --> 00:29:42,519
Right.

425
00:29:42,519 --> 00:29:49,039
As we saw in last lecture, the size of the elements within the list typically don't matter,

426
00:29:49,039 --> 00:29:54,039
but the fact that I have more elements to do stuff with does matter.

427
00:29:54,039 --> 00:29:55,039
Right.

428
00:29:55,039 --> 00:29:59,519
So if my list now has twice as many elements, this program, or most programs, will probably

429
00:29:59,519 --> 00:30:02,440
be twice as slow.

430
00:30:02,440 --> 00:30:08,240
So here's a function called is subset, takes in two lists, L1 and L2.

431
00:30:08,240 --> 00:30:13,279
I've added two little examples up here to help us figure out what this function does.

432
00:30:13,279 --> 00:30:18,840
So it's going to tell us whether the elements of L1 are in L2.

433
00:30:18,840 --> 00:30:19,840
Right.

434
00:30:19,840 --> 00:30:27,080
So in the first example here, elements in L1 are 3 and 5 and 2, and L2 does have the 3 and

435
00:30:27,080 --> 00:30:30,400
the 5 and the 2, but it also has other stuff.

436
00:30:30,400 --> 00:30:33,960
As totally fine, all the elements in L1 are in L2.

437
00:30:33,960 --> 00:30:39,120
So this function will return true for those examples, those L1 and L2.

438
00:30:39,120 --> 00:30:42,080
And then here's an example where it will return false.

439
00:30:42,080 --> 00:30:48,240
So the elements of L1 are 3 and 5 and 2, and L2 is missing the 3.

440
00:30:48,240 --> 00:30:49,920
So then that one will return false, right.

441
00:30:49,920 --> 00:30:53,800
The elements of L1 are not all in L2.

442
00:30:53,800 --> 00:30:55,280
So it's not a subset.

443
00:30:55,280 --> 00:30:56,280
All right.

444
00:30:56,280 --> 00:30:57,880
So what's this function doing?

445
00:30:57,880 --> 00:31:00,920
Well, it's iterating through all the elements in L1.

446
00:31:00,920 --> 00:31:04,320
So it's going to first look at the 3, then the 5, and the 2.

447
00:31:04,320 --> 00:31:09,480
It's going to look through each element in L2 for every one of those L1 elements.

448
00:31:09,480 --> 00:31:14,240
So it's going to look at the 3 and the 2, the 3 and the 3, the 3 and the 5, the 3 and the 9.

449
00:31:14,240 --> 00:31:18,240
Then it's going to look at the 5 and the 2, the 5 and the 3, 5 and 5, 5 and 9.

450
00:31:18,240 --> 00:31:18,560
Right.

451
00:31:18,560 --> 00:31:20,840
It's going to keep doing that.

452
00:31:20,839 --> 00:31:28,439
And it's going to keep track of this Boolean, matched, called matched.

453
00:31:28,439 --> 00:31:38,359
And it's going to, as long as it finds this element, E1 within my L2, it's going to save matched to be true.

454
00:31:38,359 --> 00:31:47,000
And it's going to keep doing this until it keeps finding matches.

455
00:31:47,000 --> 00:31:49,799
It's long, sorry, until it finds a match.

456
00:31:49,799 --> 00:31:55,240
As soon as it finds a match, it breaks because there's no need for it to keep looking at the remaining elements of L2.

457
00:31:55,240 --> 00:31:58,480
It already found one that matches.

458
00:31:58,480 --> 00:32:04,240
So this code could actually be rewritten by saying kind of the inverse.

459
00:32:04,240 --> 00:32:04,480
Right.

460
00:32:04,480 --> 00:32:10,680
If E1 is not equal to L2, we can just immediately return false.

461
00:32:10,680 --> 00:32:15,440
Because we've already found an element that, from L1, that's not an L2.

462
00:32:15,440 --> 00:32:17,600
So we could have rewritten this code in many different ways.

463
00:32:17,600 --> 00:32:21,080
But the ultimate analysis will be the same.

464
00:32:21,080 --> 00:32:25,080
So let's look at the analysis for this function.

465
00:32:25,080 --> 00:32:27,400
Well, we have two inputs.

466
00:32:27,400 --> 00:32:35,200
So we have to be careful about both of these inputs, which parts of this function depend on L1 and L2?

467
00:32:35,200 --> 00:32:38,000
Well, we've got an outer for loop.

468
00:32:38,000 --> 00:32:45,200
So what happens to the complexity with regards to this loop?

469
00:32:45,200 --> 00:32:50,519
Well, if I have more elements in L1, then this loop will go through more times.

470
00:32:50,519 --> 00:32:56,200
So this loop will be executed length L1 times.

471
00:32:56,200 --> 00:33:00,880
So the theta for this outer loop is going to be theta of length L1.

472
00:33:00,880 --> 00:33:02,400
But there is an inner loop.

473
00:33:02,400 --> 00:33:08,319
So for each element in my outer loop, I'm also going to do everything in this inner loop.

474
00:33:08,319 --> 00:33:08,519
Right.

475
00:33:08,519 --> 00:33:14,160
So in the worst case, I need to look through each element in L2 to find a match.

476
00:33:14,160 --> 00:33:20,360
So the inner loop will execute at most length L2 times, again, in the worst case.

477
00:33:20,360 --> 00:33:24,200
So the inner loop will be theta of length L2.

478
00:33:24,200 --> 00:33:29,600
So the overall complexity, since I've got this nested loop situation, law of multiplication,

479
00:33:29,600 --> 00:33:34,080
says that it's going to be the theta of my outer loop multiplied by the theta of my inner loop.

480
00:33:34,080 --> 00:33:38,759
So theta of length L1 times length L2.

481
00:33:38,759 --> 00:33:39,120
OK.

482
00:33:39,120 --> 00:33:40,960
Everyone, yeah, question?

483
00:33:40,960 --> 00:33:50,440
If you think that you have a linear e-slip, then it would be at g.

484
00:33:50,440 --> 00:33:51,960
Yes.

485
00:33:51,960 --> 00:34:04,200
So here, in this if, yes, if the if had something like using an in, right, which where in is linear,

486
00:34:04,200 --> 00:34:10,720
then yes, there would be another, like, it would be like there was another loop at the third level.

487
00:34:10,719 --> 00:34:12,439
Yeah, so then it would be un-cubed.

488
00:34:12,439 --> 00:34:19,119
Still polynomial, but un-cubed.

489
00:34:19,119 --> 00:34:26,439
So if L1 and L2 are the same length, which sometimes we put on to simplify the complexity,

490
00:34:26,439 --> 00:34:32,759
put this condition on to simplify the complexity, then we say that it's theta of length L1 squared.

491
00:34:32,759 --> 00:34:37,679
It's still polynomial complexity.

492
00:34:37,679 --> 00:34:38,679
OK.

493
00:34:38,679 --> 00:34:43,079
Let's look, sorry, question.

494
00:34:43,079 --> 00:34:49,319
Yes, if there were not the same length, you have to denote it in terms of the both.

495
00:34:49,319 --> 00:34:49,839
OK.

496
00:34:49,839 --> 00:34:51,679
Let's look at another example.

497
00:34:51,679 --> 00:34:57,399
So here's a function that grabs the intersect of two lists.

498
00:34:57,399 --> 00:35:02,359
So again, I've got a little example up here, example L1 and L2.

499
00:35:02,359 --> 00:35:07,039
So the intersect are going to be the common elements within L1 and L2, but I'm only going to,

500
00:35:07,039 --> 00:35:08,880
yeah, I'm not going to do duplicates.

501
00:35:08,880 --> 00:35:11,480
So I'm just going to keep the unique numbers.

502
00:35:11,480 --> 00:35:16,360
So here I've got L1 and L2 contain 352 and 2359.

503
00:35:16,360 --> 00:35:22,440
So notice the two and the three and the five both occur in both lists.

504
00:35:22,440 --> 00:35:27,320
So the intersect of these two lists is 23 and five.

505
00:35:27,320 --> 00:35:33,239
This example here on the right side is going to be a little bit trickier, right?

506
00:35:33,239 --> 00:35:36,960
It's kind of a unique edge case, but the code still works for that edge case.

507
00:35:36,960 --> 00:35:42,679
It's if I have L1 that has duplicates of some number and L2 that has duplicates of that same number,

508
00:35:42,679 --> 00:35:47,720
the returned list of the intersect should just be seven, right?

509
00:35:47,720 --> 00:35:49,360
That one number once.

510
00:35:52,360 --> 00:35:55,760
So how does the code achieve this?

511
00:35:55,760 --> 00:35:57,880
So you notice a nice little structure here.

512
00:35:57,880 --> 00:36:00,360
I've got kind of two blocks of code, right?

513
00:36:00,360 --> 00:36:06,720
I've got something here which is going to actually help us build this list of all of the

514
00:36:06,719 --> 00:36:09,679
elements that are common within the two lists.

515
00:36:09,679 --> 00:36:16,439
And then something down here where I'm going to call that list to keep only the unique values.

516
00:36:16,439 --> 00:36:22,599
So up here this has a nested loop situation, just like in the previous example.

517
00:36:22,599 --> 00:36:30,480
I have to look at all of the pairs from L1 and L2 to figure out which are common.

518
00:36:30,480 --> 00:36:35,879
So this for loop over L1 is going to go through the three, the five, and the two.

519
00:36:35,880 --> 00:36:42,360
And then the inner four loop through L2 is going to basically match, take a look at, does the three match the two?

520
00:36:42,360 --> 00:36:44,519
Does the three match the three? Does the three match the five?

521
00:36:44,519 --> 00:36:45,720
Does the three match the nine, right?

522
00:36:45,720 --> 00:36:49,079
And then the five match the two, five match the three, and so on.

523
00:36:49,079 --> 00:36:50,880
So that's what those loops are doing.

524
00:36:50,880 --> 00:36:56,519
And as soon as we find a match, we're going to append it to this temporary list.

525
00:36:56,519 --> 00:37:00,240
And it's okay if we have duplicates in this list.

526
00:37:00,239 --> 00:37:06,839
So if you look at the example on the right-hand side there with the seven duplicated many times,

527
00:37:06,839 --> 00:37:11,679
that's actually going to create a temporary list, right?

528
00:37:11,679 --> 00:37:15,439
That's going to contain nine times that seven.

529
00:37:15,439 --> 00:37:19,199
So it's going to look at the seven with the seven, and it's going to say, hey, that's a match.

530
00:37:19,199 --> 00:37:20,519
Let me add it.

531
00:37:20,519 --> 00:37:25,359
Then it's going to look at the seven with the middle seven and L2, and it's going to say, let me add that.

532
00:37:25,360 --> 00:37:30,840
And then it's going to look at the first seven and L1 with the last seven and L2, and it's going to say, let me add that.

533
00:37:30,840 --> 00:37:35,400
And then it's going to do that same thing all over again when it looks at the middle seven and L1,

534
00:37:35,400 --> 00:37:37,280
along with each element in L2.

535
00:37:37,280 --> 00:37:40,280
So it's going to add the seven three more times.

536
00:37:40,280 --> 00:37:45,480
And then again, when it looks at the last seven and L1, along with each seven and L2.

537
00:37:45,480 --> 00:37:46,480
So that's totally fine.

538
00:37:46,480 --> 00:37:48,720
That's just what this code is doing.

539
00:37:48,719 --> 00:37:56,959
And then the bottom part down here is going to take this temporary list that we created,

540
00:37:56,959 --> 00:37:59,639
and it's going to just keep the unique values within it, right?

541
00:37:59,639 --> 00:38:07,399
So it's going to create that unique list, and it's going to say, if I haven't seen this value in the unique, add it.

542
00:38:07,399 --> 00:38:09,559
And if I have, don't do anything.

543
00:38:09,559 --> 00:38:16,359
So in the end, this code down here is going to take that big list here and just keep the unique values.

544
00:38:18,959 --> 00:38:21,359
So let's do the analysis for this.

545
00:38:21,359 --> 00:38:30,639
So I've got my outer for loop and my inner for loop up in the top half of my code here that generates my temporary, long temporary list.

546
00:38:30,639 --> 00:38:32,639
Potentially long temporary list.

547
00:38:32,639 --> 00:38:37,959
So that we already know from the previous example is theta of length L1 times theta of length L2, right?

548
00:38:37,959 --> 00:38:39,199
Pretty simple.

549
00:38:39,199 --> 00:38:42,199
Now, what about this bottom half here?

550
00:38:42,199 --> 00:38:45,559
Because we have to be careful about this bottom half.

551
00:38:45,559 --> 00:38:50,199
This one could also contribute to the complexity, right?

552
00:38:50,199 --> 00:38:56,279
It's looping through a temporary variable, a list variable that we created.

553
00:38:56,279 --> 00:39:03,279
But this list is created by doing something to L1 and L2, right?

554
00:39:03,279 --> 00:39:06,279
By looking at elements in L1 and L2.

555
00:39:06,279 --> 00:39:11,159
So it's actually indirectly related to L1 and L2.

556
00:39:11,159 --> 00:39:19,719
So we can't just cast it aside because it could potentially contribute to the complexity of my program, right?

557
00:39:19,719 --> 00:39:26,079
And in the worst case, I create this temporary variable that looks like this, right?

558
00:39:26,079 --> 00:39:34,039
So in the worst possible case, my temporary variables length is going to be length L1 times length L2, right?

559
00:39:34,039 --> 00:39:39,319
I basically added that character every time I compared a value, right?

560
00:39:39,320 --> 00:39:44,960
So this list at worst case is length L1 times length L2 block.

561
00:39:44,960 --> 00:39:54,920
So if I'm iterating through that list, then the complexity of that second half is also theta of length L1 times length L2 in the worst case, right?

562
00:39:54,920 --> 00:40:06,920
So the overall complexity of the function is theta of length L1 times length L2 up here.

563
00:40:06,920 --> 00:40:11,159
Plus theta of length L1 times length L2 down here.

564
00:40:11,159 --> 00:40:17,519
So in this particular case, the fact that I'm iterating over temp didn't actually increase my complexity.

565
00:40:17,519 --> 00:40:25,400
You can imagine code where something doing something funky like this, where you indirectly reference,

566
00:40:25,400 --> 00:40:29,719
have some loop over something related to the input, could affect the complexity.

567
00:40:29,719 --> 00:40:35,960
So in this case, the overall complexity is still theta of length L1 times length L2.

568
00:40:35,960 --> 00:40:37,159
Questions about this one?

569
00:40:47,519 --> 00:40:48,519
Yeah.

570
00:40:48,519 --> 00:41:01,759
Why do you not, like again, because you're depending on certain number of loops, like how do you know this?

571
00:41:01,759 --> 00:41:03,960
Like if I just say a very brief problem.

572
00:41:03,960 --> 00:41:05,960
It varies for each problem, right?

573
00:41:05,960 --> 00:41:11,159
But in the analysis, we're interested in the worst case scenario, right?

574
00:41:11,159 --> 00:41:15,000
Like the asymptotic behavior of the worst case.

575
00:41:15,000 --> 00:41:21,599
And in the worst case, we've added this number length L1 times length L2 times.

576
00:41:21,599 --> 00:41:25,320
Most of the time, of course, it's not going to be this bad, right?

577
00:41:25,320 --> 00:41:29,320
It's just in this one particular case that it is this bad.

578
00:41:29,320 --> 00:41:30,519
Oh, I see the end.

579
00:41:30,519 --> 00:41:31,039
Yeah.

580
00:41:34,039 --> 00:41:36,440
Okay, let's look at one more function that's polynomial.

581
00:41:36,440 --> 00:41:37,519
So here's diameter.

582
00:41:37,519 --> 00:41:39,360
We saw this last lecture.

583
00:41:39,360 --> 00:41:45,320
Basically, if we have a bunch of points in a 2D plane, this function tells us the distance,

584
00:41:45,320 --> 00:41:48,559
sorry, the maximum distance between any two points, right?

585
00:41:48,559 --> 00:41:52,079
So I drew that picture in the 2D plane.

586
00:41:52,079 --> 00:41:57,960
So this one is going to have nested loops again.

587
00:41:57,960 --> 00:42:03,280
So the outer loop iterates through length L times.

588
00:42:03,280 --> 00:42:08,800
So remember, our L is just a list of two poles representing these x, y coordinates.

589
00:42:08,800 --> 00:42:14,720
So the outer loop easily goes through length L times, but what does the inner loop go through?

590
00:42:14,720 --> 00:42:19,360
The inner loop is actually starting at i, not zero, right?

591
00:42:19,360 --> 00:42:24,680
If it started at zero, the inner loop would be clearly theta of length L.

592
00:42:24,680 --> 00:42:25,680
But it's not, right?

593
00:42:25,680 --> 00:42:26,880
It starts at i.

594
00:42:28,160 --> 00:42:33,000
On average, though, how many times does that inner loop go through?

595
00:42:33,000 --> 00:42:38,760
Well, the first time it goes through that inner loop, it's going to look at length,

596
00:42:38,760 --> 00:42:41,840
L minus 1 elements.

597
00:42:41,840 --> 00:42:46,200
Next time, it's going to look at length L minus 2 elements.

598
00:42:46,200 --> 00:42:50,320
Next time, it's going to look at length L minus 3 elements, right?

599
00:42:50,320 --> 00:42:57,440
Until we get to the end where it's going to look at 1 and then zero elements.

600
00:42:57,440 --> 00:43:03,160
So if we think about how many times that inner loop actually iterates, it's going to be,

601
00:43:03,159 --> 00:43:09,559
what is it, like, length L minus 1 multiplied by length L over 2?

602
00:43:09,559 --> 00:43:12,079
Is that the function, I think, to add all these together?

603
00:43:12,079 --> 00:43:13,319
Something like that.

604
00:43:13,319 --> 00:43:18,679
Which is basically still something that's a function of length L, right?

605
00:43:18,679 --> 00:43:23,399
Like we can simplify it to be 0.5 length L, right?

606
00:43:23,399 --> 00:43:30,359
So it's still a function of length L, even because the coefficient in the front of that length L is 0.5, right?

607
00:43:30,360 --> 00:43:36,800
So the overall complexity of the inner loop is still theta of length L.

608
00:43:36,800 --> 00:43:37,000
Right?

609
00:43:37,000 --> 00:43:41,240
Everything else within this code is constant.

610
00:43:41,240 --> 00:43:50,680
So the overall complexity is just theta of length L squared.

611
00:43:50,680 --> 00:43:52,680
Yeah.

612
00:43:52,680 --> 00:43:53,180
Sorry.

613
00:43:53,180 --> 00:43:54,320
Where did the 1.5 come?

614
00:43:54,320 --> 00:44:00,519
Oh, it's the formula to add, like, if you add 1 plus 2 plus 3 plus 4 plus all the way up to n,

615
00:44:00,519 --> 00:44:01,840
like, what's the formula to do that?

616
00:44:01,840 --> 00:44:05,400
I think it's like n times n plus 1 over 2, something like that.

617
00:44:05,400 --> 00:44:12,080
So this is not exactly half, but it's like something on the order plus, I don't know, something, right?

618
00:44:12,080 --> 00:44:15,320
Whatever this calculates, too.

619
00:44:15,320 --> 00:44:21,640
But in effect, it's like something that's smaller than length L, but it's still a function of length L, right?

620
00:44:21,639 --> 00:44:27,759
And so that front coefficient on, right before length L just goes away, right?

621
00:44:27,759 --> 00:44:32,519
Even like if it was 10, we would still cast it away.

622
00:44:32,519 --> 00:44:35,679
In this case, it's 0.5 or whatever it is, right?

623
00:44:35,679 --> 00:44:41,119
So it's still less than 1, but we still cast it away because we're interested in the theta of this.

624
00:44:41,119 --> 00:44:42,119
Yeah.

625
00:44:42,119 --> 00:44:47,559
Is there any scenario with an S that's for this week, for the week?

626
00:44:47,559 --> 00:44:54,719
But would any e, an n squared, would the group?

627
00:44:54,719 --> 00:45:00,559
I mean, the inner loop could just not depend on the input at all.

628
00:45:00,559 --> 00:45:02,799
Right?

629
00:45:02,799 --> 00:45:07,359
Like, here it's n squared because both of the loops depend linearly on the input.

630
00:45:07,360 --> 00:45:12,640
But if the outer loop went through range length L squared,

631
00:45:12,640 --> 00:45:16,440
then the overall complexity would be length L cubed, in this case, right?

632
00:45:16,440 --> 00:45:20,680
Because it's length L squared times length L.

633
00:45:20,680 --> 00:45:25,280
Or if one of the loops doesn't depend on the input at all, then it contributes nothing constant,

634
00:45:25,280 --> 00:45:28,320
and it is nothing linear, so it's constant.

635
00:45:28,320 --> 00:45:29,320
Yeah.

636
00:45:29,320 --> 00:45:33,320
Okay.

637
00:45:33,320 --> 00:45:40,640
Let's have you think about this question for a bit.

638
00:45:40,640 --> 00:45:44,840
So think about the input, think about parts of the function that depend on the input,

639
00:45:44,840 --> 00:45:48,640
and then what is the complexity?

640
00:45:48,640 --> 00:45:49,160
Okay.

641
00:45:49,160 --> 00:45:56,519
What's the outer loop theta of?

642
00:45:56,519 --> 00:45:59,880
Yes.

643
00:45:59,880 --> 00:46:03,960
Yes, numbs is a list, so the outer loop is theta of length of numbs, correct?

644
00:46:03,960 --> 00:46:05,719
Good.

645
00:46:05,719 --> 00:46:11,159
What's the inner loop theta of?

646
00:46:11,159 --> 00:46:11,639
Yeah.

647
00:46:11,639 --> 00:46:12,559
Is that what you're going to say?

648
00:46:12,559 --> 00:46:13,079
Theta of 1.

649
00:46:13,079 --> 00:46:13,559
Exactly.

650
00:46:13,559 --> 00:46:16,840
It's the length of digits, but digits is not my input.

651
00:46:16,840 --> 00:46:18,519
Nums is my input.

652
00:46:18,519 --> 00:46:21,880
So the inner loop will always just iterate through 10 times.

653
00:46:21,880 --> 00:46:26,360
So in the eyes of the input, so the function, that's just constant.

654
00:46:26,360 --> 00:46:30,480
So the input is numbs, the outer loop is theta of numbs, the inner loop is theta of 1,

655
00:46:30,480 --> 00:46:33,880
so the overall complexity is theta of length of numbs.

656
00:46:33,880 --> 00:46:35,079
Perfect.

657
00:46:35,079 --> 00:46:38,240
How about this one?

658
00:46:38,240 --> 00:46:40,680
What are my inputs?

659
00:46:40,680 --> 00:46:45,200
Do any loops depend on these inputs?

660
00:46:45,200 --> 00:46:51,200
All right, what's the outer loop complexity?

661
00:46:51,200 --> 00:46:52,200
Yeah.

662
00:46:52,200 --> 00:46:53,120
What's the length of 1?

663
00:46:53,120 --> 00:46:56,000
Yeah, theta of length of 1, exactly.

664
00:46:56,000 --> 00:47:03,400
What's the inner loop complexity?

665
00:47:03,400 --> 00:47:04,960
Theta of length of L2, perfect.

666
00:47:04,960 --> 00:47:10,880
And is there anything else that contributes to the complexity here?

667
00:47:10,880 --> 00:47:12,679
What's that?

668
00:47:12,679 --> 00:47:13,519
The if statement.

669
00:47:13,519 --> 00:47:14,039
Yes.

670
00:47:14,039 --> 00:47:22,239
What about it is making you question that the complexity is not constant?

671
00:47:22,239 --> 00:47:22,880
Exactly.

672
00:47:22,880 --> 00:47:23,239
Yes.

673
00:47:23,239 --> 00:47:23,760
Very nice.

674
00:47:23,760 --> 00:47:26,840
So in, it errates through the length of L3.

675
00:47:26,840 --> 00:47:31,920
Looking for an element in L3, e1 and L3, is not constant.

676
00:47:31,920 --> 00:47:36,640
You have to look through the whole length of L3 to figure out where it's there or not.

677
00:47:36,640 --> 00:47:41,120
So this inner bit here is not constant.

678
00:47:41,120 --> 00:47:43,240
It's theta of length L3.

679
00:47:43,240 --> 00:47:46,920
In fact, it's two times length L3.

680
00:47:46,920 --> 00:47:53,520
So the overall complexity of this function is theta of length L1 times theta of length L2 times theta of length L3.

681
00:47:53,519 --> 00:47:56,360
Okay.

682
00:47:56,360 --> 00:47:59,559
Cool.

683
00:47:59,559 --> 00:48:01,400
Let's look at the exponential complexity.

684
00:48:01,400 --> 00:48:04,880
So this is a complexity that grows really, really quickly.

685
00:48:04,880 --> 00:48:09,079
We never want the algorithms that we write to land within this class.

686
00:48:09,079 --> 00:48:15,679
Unfortunately, there are just some problems in real life that we have to compute that are

687
00:48:15,679 --> 00:48:18,239
just naturally part of this complexity class.

688
00:48:18,239 --> 00:48:22,959
There are some techniques to deal with making these algorithms a little bit faster.

689
00:48:22,959 --> 00:48:28,319
But inherently, there are just exponential algorithms that we just can't do any better than

690
00:48:28,319 --> 00:48:32,719
exponential in solving these problems.

691
00:48:32,719 --> 00:48:33,719
All right.

692
00:48:33,719 --> 00:48:38,519
So let's look at Fibonacci again.

693
00:48:38,519 --> 00:48:42,239
We looked at Fibonacci a few slides ago, iterative version.

694
00:48:42,239 --> 00:48:46,159
And the iterative version was theta of n.

695
00:48:46,159 --> 00:48:50,960
But if we look at the recursive version of Fibonacci, it's not theta of n at all.

696
00:48:50,960 --> 00:48:57,039
In fact, as you can see, it's in this exponential set of slides, the recursive version of Fibonacci

697
00:48:57,039 --> 00:49:00,039
is actually exponential.

698
00:49:00,039 --> 00:49:03,079
So let's recall what this code is doing.

699
00:49:03,079 --> 00:49:05,079
So there's two base cases, right?

700
00:49:05,079 --> 00:49:06,920
Fibonacci of 0 and 1.

701
00:49:06,920 --> 00:49:12,319
And then the recursive step is Fibonacci of n minus 1 plus Fibonacci of n minus 2.

702
00:49:12,320 --> 00:49:20,519
So for every level that we go down, there's going to be times two more paths that we need

703
00:49:20,519 --> 00:49:24,280
to explore to grab the values from.

704
00:49:24,280 --> 00:49:29,480
So for the very first n, we've got just one value to grab.

705
00:49:29,480 --> 00:49:33,200
For the next n, we've got times two that value to grab.

706
00:49:33,200 --> 00:49:39,720
The next level for the next n, we've got two times more values to grab, and so on.

707
00:49:39,719 --> 00:49:46,279
So the fact that there are two recursive calls in this recursive step leads us to this

708
00:49:46,279 --> 00:49:49,679
little inverted tree kind of structure, right?

709
00:49:49,679 --> 00:49:55,480
And we even drew this when we looked at how many function calls are being run, right?

710
00:49:55,480 --> 00:50:01,759
Remember, when we're figuring out the complexity with a recursive function, we need to figure

711
00:50:01,759 --> 00:50:06,639
out how many of these, how many recursive calls are we actually doing, right?

712
00:50:06,639 --> 00:50:11,719
So because of this tree structure, every time we add a new level, we basically have two

713
00:50:11,719 --> 00:50:15,199
completely separate paths to explore further, right?

714
00:50:15,199 --> 00:50:18,839
And those two paths have their own two paths and so on.

715
00:50:18,839 --> 00:50:23,799
So this leads us to this tree structure, which is actually going to lead to the total number

716
00:50:23,799 --> 00:50:30,839
of recursive calls to be exponential, so theta of 2 to the n.

717
00:50:30,840 --> 00:50:37,480
Now, if we looked at the actual recursive call tree, right, we looked at this, and it looked

718
00:50:37,480 --> 00:50:43,800
something like this, right, a bunch of lectures ago, you might notice that the tree actually

719
00:50:43,800 --> 00:50:46,400
thins out a little bit to the right, right?

720
00:50:46,400 --> 00:50:50,240
It's not a full tree with the leaves nicely all the way down.

721
00:50:50,240 --> 00:50:56,280
That's because, well, the left path calculates 5, but the right path calculates 5, no 4,

722
00:50:56,280 --> 00:51:00,120
so n minus 1 of the left path.

723
00:51:00,119 --> 00:51:01,559
But that's fine.

724
00:51:01,559 --> 00:51:10,920
It's not that we are actually going to speed up anything by some sort of order of magnitude,

725
00:51:10,920 --> 00:51:11,920
right?

726
00:51:11,920 --> 00:51:16,359
Just because the tree thins out a little bit on the right hand side is not going to speed

727
00:51:16,359 --> 00:51:18,480
up the overall complexity of this function.

728
00:51:18,480 --> 00:51:24,279
It's going to be theta of 2 to the n minus some theta that's less than 2 to the n.

729
00:51:24,280 --> 00:51:30,400
So that subtraction is not going to really decrease the overall complexity of our function,

730
00:51:30,400 --> 00:51:33,200
so the order of this is still exponential.

731
00:51:33,200 --> 00:51:35,440
All right.

732
00:51:35,440 --> 00:51:39,080
Here's another example of an exponential code.

733
00:51:39,080 --> 00:51:46,080
So this is a function that is going to generate all the subsets of a list.

734
00:51:46,080 --> 00:51:50,519
So again, I've added a little example here to help us understand what it's doing.

735
00:51:50,519 --> 00:51:55,360
So here I've got three numbers, a list with three numbers, one, two, and three.

736
00:51:55,360 --> 00:52:01,400
And to generate subsets, what this means is that I'm going to create a new list of all

737
00:52:01,400 --> 00:52:09,239
of the possible combinations of numbers within my original list of all the possible lengths.

738
00:52:09,239 --> 00:52:10,239
Right?

739
00:52:10,239 --> 00:52:15,199
So first, one subset of this list could be just the empty list, so that's not taking any of

740
00:52:15,199 --> 00:52:17,800
my original numbers at all.

741
00:52:17,800 --> 00:52:23,440
The next one is a list with just one of the numbers in it, so either the one or the two

742
00:52:23,440 --> 00:52:24,920
or the three.

743
00:52:24,920 --> 00:52:32,360
Next subset of my list could be taking just two of the elements, so one and two, one and

744
00:52:32,360 --> 00:52:34,120
three and two and three.

745
00:52:34,120 --> 00:52:37,600
And then lastly, I can just grab all the elements, so one and the two and the three.

746
00:52:37,600 --> 00:52:38,800
I don't care about the order, right?

747
00:52:38,800 --> 00:52:43,640
I just care that I have all of these different combinations of all of the different lengths

748
00:52:43,640 --> 00:52:46,240
in my final list.

749
00:52:46,239 --> 00:52:50,359
So does everyone understand the goal of this function?

750
00:52:50,359 --> 00:52:52,199
So how do we achieve this?

751
00:52:52,199 --> 00:52:56,519
Well, you might not be surprised, we're going to do it recursively.

752
00:52:56,519 --> 00:53:01,759
That's really the only reasonable way to write this code.

753
00:53:01,759 --> 00:53:06,879
So I'm going to go through this slide just explaining what each line does, but on the

754
00:53:06,879 --> 00:53:11,959
next slide I'll have a little animation that shows step by step how the function creates

755
00:53:11,959 --> 00:53:14,399
this subset list.

756
00:53:14,400 --> 00:53:18,320
So first thing, it's recursive, so I've got my base case up there.

757
00:53:18,320 --> 00:53:24,320
It's if I have a list of length zero, then the subset of an empty list, right, is just

758
00:53:24,320 --> 00:53:28,519
going to be this list with the empty thing inside it.

759
00:53:28,519 --> 00:53:33,400
So if I have no elements, there's only one subset that's the empty list.

760
00:53:33,400 --> 00:53:40,599
Then if I have more than one element inside it, I'm going to do the same idea that we saw

761
00:53:40,599 --> 00:53:44,079
when we worked with lists back in the recursion lectures.

762
00:53:44,079 --> 00:53:47,360
I'm going to extract one of my elements.

763
00:53:47,360 --> 00:53:51,960
I'm going to work on the remaining list, and then I'm going to do something by taking that

764
00:53:51,960 --> 00:53:55,840
element and tacking it back onto the result.

765
00:53:55,840 --> 00:54:01,759
So in this particular case, the thing that I'm extracting is the last element in my list.

766
00:54:01,759 --> 00:54:07,400
So if my list is one, two, and three, at a step here, I'm going to extract the three

767
00:54:07,400 --> 00:54:09,559
and make it into its own list.

768
00:54:09,559 --> 00:54:11,400
Right, so that's what that step is doing.

769
00:54:11,400 --> 00:54:15,200
It extracts the last element in the list.

770
00:54:15,200 --> 00:54:22,720
Then I make a function call to generate subsets on everything except for that last element.

771
00:54:22,720 --> 00:54:29,400
So I say, hey, function, that I'm currently writing right now.

772
00:54:29,400 --> 00:54:35,720
If you can generate for me the subset of all the elements, right, the subset for this

773
00:54:35,720 --> 00:54:39,280
list, then you're going to come up with something that looks like this.

774
00:54:39,280 --> 00:54:45,120
It's going to be the empty list, the one, the two, and the one and the two together.

775
00:54:45,120 --> 00:54:51,360
Right, so the subset of this list is going to be this group of elements here.

776
00:54:51,360 --> 00:54:52,760
So that's what this is going to do.

777
00:54:52,760 --> 00:54:57,800
So this is, again, us trusting that the function we write will generate something that looks

778
00:54:57,800 --> 00:55:00,120
like this.

779
00:55:00,120 --> 00:55:06,480
If we've got to this point, then smaller is going to be a list that looks like this.

780
00:55:06,480 --> 00:55:13,119
So the next part of the code is going to take that little extra thing that I had saved

781
00:55:13,119 --> 00:55:14,920
previously.

782
00:55:14,920 --> 00:55:19,760
It's going to tack on that three to every element within this list.

783
00:55:19,760 --> 00:55:25,099
So then I'm going to basically say, I'm going to take this three and make a list with

784
00:55:25,099 --> 00:55:29,559
the three in it, a list with the one and the three in it, a list with the two and the

785
00:55:29,559 --> 00:55:33,800
three in it, and a list with the one and the two and the three in it.

786
00:55:33,800 --> 00:55:39,560
So I've just taken that three and added it to everything that resulted from this line

787
00:55:39,560 --> 00:55:44,320
of code here, from my function calling itself.

788
00:55:44,320 --> 00:55:48,800
And then all it does is return smaller plus new.

789
00:55:48,800 --> 00:55:53,680
So if I add these two together, this is going to generate for me my final subset that I

790
00:55:53,680 --> 00:55:54,680
was interested in.

791
00:55:54,680 --> 00:55:55,680
Right?

792
00:55:55,680 --> 00:55:56,680
I've got the empty thing.

793
00:55:56,680 --> 00:55:58,160
I've got the one, the two, and the three by itself.

794
00:55:58,160 --> 00:56:01,840
I've got the one, two, the one, three, and the two, three by itself, and then the one,

795
00:56:01,840 --> 00:56:02,840
two, three altogether.

796
00:56:03,840 --> 00:56:06,039
So that's the big idea here.

797
00:56:06,039 --> 00:56:10,920
So let's just go through step by step recursively calling ourselves.

798
00:56:10,920 --> 00:56:16,280
So this is me finding out the, kicking off my function call, saying, hey, generate the

799
00:56:16,280 --> 00:56:19,440
subsets for the list one, two, three.

800
00:56:19,440 --> 00:56:21,720
I'm going to keep the extra side.

801
00:56:21,720 --> 00:56:25,240
I need to make another function call because I'm not at my base case.

802
00:56:25,240 --> 00:56:29,480
So I'm going to call gen subsets on one comma two.

803
00:56:29,480 --> 00:56:30,960
This is also not my base case.

804
00:56:30,960 --> 00:56:35,559
So I'm going to take my last element, put it aside, and I'm going to call gen subsets

805
00:56:35,559 --> 00:56:38,240
on just the one.

806
00:56:38,240 --> 00:56:39,240
Still not the base case.

807
00:56:39,240 --> 00:56:43,480
I'm going to take this extra, put it aside, and I'm going to call gen subsets on the empty

808
00:56:43,480 --> 00:56:44,480
list.

809
00:56:44,480 --> 00:56:46,039
And this is where I reach my base case.

810
00:56:46,039 --> 00:56:48,280
So far, nothing has been returned at all.

811
00:56:48,280 --> 00:56:51,079
No work has been done.

812
00:56:51,079 --> 00:56:54,559
At my base case, Python will say, I know what this is.

813
00:56:54,559 --> 00:56:57,159
It's going to be the list with just the empty thing in it.

814
00:56:57,159 --> 00:56:58,159
All right?

815
00:56:58,159 --> 00:56:59,159
Cool.

816
00:56:59,399 --> 00:57:02,599
That gets returned, so this function call goes away.

817
00:57:02,599 --> 00:57:04,079
So now what is it going to do?

818
00:57:04,079 --> 00:57:09,799
Well, it's going to take that extra, I set aside, take the smaller list that I just

819
00:57:09,799 --> 00:57:14,039
returned, and basically double that smaller list.

820
00:57:14,039 --> 00:57:16,319
So this is my smaller list.

821
00:57:16,319 --> 00:57:20,359
And then I'm going to double that by saying, I'm going to put this one to the end of

822
00:57:20,359 --> 00:57:23,239
everything in my smaller list.

823
00:57:23,239 --> 00:57:27,239
Maybe this is not so apparent at this step, but let's go one more step and see what

824
00:57:27,239 --> 00:57:28,279
happens.

825
00:57:28,280 --> 00:57:30,120
So now this function also terminates.

826
00:57:30,120 --> 00:57:36,280
It returns this empty list and one in it and says, all right, here, with this function

827
00:57:36,280 --> 00:57:42,680
call, I had saved the two separately and said, I'm going to now tack on this two to the

828
00:57:42,680 --> 00:57:45,480
end of everything that I had just returned.

829
00:57:45,480 --> 00:57:47,400
So this is smaller.

830
00:57:47,400 --> 00:57:49,360
This is smaller over here.

831
00:57:49,360 --> 00:57:53,920
And all I'm going to do is take this extra thing and tack it on to the end of everything

832
00:57:53,920 --> 00:57:55,400
that was in smaller.

833
00:57:55,400 --> 00:57:57,720
So I'm going to tack it on to the end of this empty list.

834
00:57:57,720 --> 00:58:00,920
So it just gives me this two and tack it on to the end of this one.

835
00:58:00,920 --> 00:58:05,360
So it gives me the one comma two.

836
00:58:05,360 --> 00:58:08,880
So I've basically doubled my list at this stage.

837
00:58:08,880 --> 00:58:10,639
One more step.

838
00:58:10,639 --> 00:58:11,840
This gets returned.

839
00:58:11,840 --> 00:58:14,559
And now this is my original function call.

840
00:58:14,559 --> 00:58:16,880
The thing that I had extracted was the three.

841
00:58:16,880 --> 00:58:19,280
So now we're basically at this step here.

842
00:58:19,280 --> 00:58:21,000
I extracted the three.

843
00:58:21,000 --> 00:58:27,280
The function just below it returned this smaller.

844
00:58:27,280 --> 00:58:32,040
So that means that this three is going to get appended to the end of everything that

845
00:58:32,040 --> 00:58:33,519
was in smaller.

846
00:58:33,519 --> 00:58:37,000
So it's going to be appended to the end of this empty list to give me just the three,

847
00:58:37,000 --> 00:58:40,200
to the end of the one, to give me the one and the three, to the end of the two, to give

848
00:58:40,200 --> 00:58:45,240
me the two and the three, and to the end of the one two, to give me the one two three.

849
00:58:45,240 --> 00:58:47,760
Now this is the final answer.

850
00:58:47,760 --> 00:58:53,120
So I basically keep what I had returned from the previous function call and concatenate

851
00:58:53,120 --> 00:58:57,720
that with the thing that I had just created, where I tacked on my three.

852
00:58:57,720 --> 00:58:59,480
And this is my final answer.

853
00:58:59,480 --> 00:59:04,560
It's just sort of out of order to what we intuitively would have written by hand.

854
00:59:04,560 --> 00:59:08,960
But it hits on all of the elements that I wanted to have anyway.

855
00:59:08,960 --> 00:59:12,560
So I've got the empty list, everything with just one element in it, everything with

856
00:59:12,560 --> 00:59:16,760
the two elements in it, and everything with all three elements in it.

857
00:59:16,760 --> 00:59:19,960
So let's look at the complexity analysis of this.

858
00:59:19,960 --> 00:59:22,320
We've got two things going on here.

859
00:59:22,320 --> 00:59:26,880
One is how many of these function calls are actually being done, right?

860
00:59:26,880 --> 00:59:31,680
Like with the inverse tree structure, how many of those function calls do we need to do

861
00:59:31,680 --> 00:59:35,200
to get to the end of our, to our base case?

862
00:59:35,200 --> 00:59:40,840
And on top of that, that, sorry, that will tell us how many actual elements in the list

863
00:59:40,840 --> 00:59:42,120
we will have.

864
00:59:42,119 --> 00:59:47,199
And on top of that, we have actually a time complexity that's not constant, that's to

865
00:59:47,199 --> 00:59:50,559
copy our list.

866
00:59:50,559 --> 00:59:53,039
So copying a list is not constant, right?

867
00:59:53,039 --> 00:59:57,319
Because it takes some time to take all the elements in a list and make a copy of them.

868
00:59:57,319 --> 01:00:02,839
So if we think about the time it takes to make our list at each step, right?

869
01:00:02,839 --> 01:00:06,000
How many of these sub-elements we're creating?

870
01:00:06,000 --> 01:00:10,599
Well, at the very base case, we have one element.

871
01:00:10,599 --> 01:00:13,719
At the case just above it, we had two elements.

872
01:00:13,719 --> 01:00:16,280
At the case just above that, we had four elements.

873
01:00:16,280 --> 01:00:19,280
At the case just above that, we had eight elements.

874
01:00:19,280 --> 01:00:26,679
So at each step, the number of sub-lists that we were generating was basically twice as

875
01:00:26,679 --> 01:00:29,199
much as the previous step.

876
01:00:29,199 --> 01:00:34,440
So the overall number of subsets was on the order of two to the end.

877
01:00:34,440 --> 01:00:39,440
But there was also a time complexity to make a copy of the list within each one of those

878
01:00:39,440 --> 01:00:40,800
subsets.

879
01:00:40,800 --> 01:00:44,760
So we're multiplying the complexity it takes to make all those function calls and generate

880
01:00:44,760 --> 01:00:49,280
all those subsets by the time it takes to make a copy of the list.

881
01:00:49,280 --> 01:00:53,760
So the overall complexity is actually going to be theta of n times 2 to the n.

882
01:00:53,760 --> 01:01:00,200
Because it's a little bit harder, it's a little bit worse than exponential, just purely for

883
01:01:00,279 --> 01:01:07,199
the fact that we're copying the list at each step.

884
01:01:07,199 --> 01:01:08,919
All right.

885
01:01:08,919 --> 01:01:11,439
So let's move on to logarithmic complexity.

886
01:01:11,439 --> 01:01:15,319
This one's going to be a little bit tricky because right off the bat, we're not going

887
01:01:15,319 --> 01:01:22,039
to be able to see a direct relationship between the input and what loop we actually have.

888
01:01:22,039 --> 01:01:25,439
So here I've got a function called digit ad.

889
01:01:25,439 --> 01:01:27,239
It's going to take in a number.

890
01:01:27,239 --> 01:01:31,159
So 1, 2, 3, 4, something like that.

891
01:01:31,159 --> 01:01:33,559
Number 1,234.

892
01:01:33,559 --> 01:01:35,799
The code casts it to a string.

893
01:01:35,799 --> 01:01:39,399
So it takes in a pure numerical value.

894
01:01:39,399 --> 01:01:47,279
It makes a string out of it and then iterates through the string.

895
01:01:47,279 --> 01:01:54,239
So the function here in terms of time complexity is theta of length s.

896
01:01:54,239 --> 01:01:59,759
Here we're iterating through the string backward, basically 4, then 3, then 2, then 1.

897
01:01:59,759 --> 01:02:01,559
But what's my input?

898
01:02:01,559 --> 01:02:03,679
It's n. It's not s, right?

899
01:02:03,679 --> 01:02:12,039
So the time complexity of this function, while it's linear in s, s is not linear in n.

900
01:02:12,039 --> 01:02:16,319
Because when my number is 83, my loop only iterates twice.

901
01:02:16,319 --> 01:02:22,679
If my number as 4 digits in it, 4,271, my loop iterates 4 times.

902
01:02:22,679 --> 01:02:27,319
So this relationship is not linear.

903
01:02:27,319 --> 01:02:29,079
So what is it exactly?

904
01:02:29,079 --> 01:02:33,239
Well, let's think about what that loop is actually doing.

905
01:02:33,239 --> 01:02:41,480
If I have a number with 4 digits in it, something in the thousands, when I iterate through the

906
01:02:41,480 --> 01:02:50,359
number, by sort of backward, this number has a string, I'm basically taking that one and

907
01:02:50,360 --> 01:02:53,280
keeping it in my running sum.

908
01:02:53,280 --> 01:02:59,720
Then it's kind of like I divided that number by 10, I grabbed the remainder when I divided

909
01:02:59,720 --> 01:03:03,680
that number by 10, and that's the thing that I just added.

910
01:03:03,680 --> 01:03:09,160
The whole number left over when I divided by 10 is this bit here.

911
01:03:09,160 --> 01:03:14,519
So now, think of it like taking this last element here, it's like I take this number

912
01:03:14,519 --> 01:03:16,400
and divide by 10 again.

913
01:03:16,400 --> 01:03:20,760
I grabbed the remainder when I divide by 10 and added to my running total, and the whole

914
01:03:20,760 --> 01:03:24,840
number I'm left over when dividing by 10 is just this.

915
01:03:24,840 --> 01:03:30,480
One more time, I take the 2, the remainder when I divided that 42, what is 2, and the whole

916
01:03:30,480 --> 01:03:33,039
number I was left over with is 4.

917
01:03:33,039 --> 01:03:37,280
And then lastly, I can do that last thing again.

918
01:03:37,280 --> 01:03:42,920
So what's the relationship between the magnitude of n, right, this 4,000 something, or this

919
01:03:42,920 --> 01:03:49,119
80 something, to how many times I have to loop through to get every digit in my number?

920
01:03:49,119 --> 01:03:55,200
Well, the trick here is to think about taking my magnitude, my n, my magnitude of n, and

921
01:03:55,200 --> 01:03:59,400
dividing it by 10 a bunch of times.

922
01:03:59,400 --> 01:04:05,200
How many times do I divide by 10 to basically grab every single element, every single digit

923
01:04:05,200 --> 01:04:06,720
in my n?

924
01:04:06,720 --> 01:04:09,920
Well, length s times, right?

925
01:04:09,920 --> 01:04:14,320
It's kind of like taking each character one at a time, right?

926
01:04:14,320 --> 01:04:18,720
To take each character one at a time that's like dividing by 10 to grab the remainder, and

927
01:04:18,720 --> 01:04:21,079
then I've done that length s times, right?

928
01:04:21,079 --> 01:04:23,480
That's what this loop is doing.

929
01:04:23,480 --> 01:04:29,720
So the relationship between the magnitude of n, and how many times I go through the loop,

930
01:04:29,720 --> 01:04:35,960
is this, n divided by 10, some number times, length s times is equal to 1, that means I've

931
01:04:35,960 --> 01:04:41,760
finished going through this entire, this entire number, all the digits within the number.

932
01:04:41,760 --> 01:04:50,360
So the relationship between n and length s is length s is equal to log of n.

933
01:04:50,360 --> 01:04:54,720
And now that I have this nice relationship, well, I said that this function was linear

934
01:04:54,720 --> 01:04:59,760
in length s, so if it's theta of length s, it's going to be theta of log n.

935
01:04:59,760 --> 01:05:05,400
I just mapped those two together.

936
01:05:05,400 --> 01:05:13,240
And now, what's important to realize is that here there's kind of an indirect relationship

937
01:05:13,240 --> 01:05:17,320
between what's actually happening in the code and my input, right?

938
01:05:17,320 --> 01:05:20,039
It's not as clear cut.

939
01:05:20,039 --> 01:05:26,720
But there is some relationship which is not constant and not linear.

940
01:05:26,720 --> 01:05:32,440
Okay.

941
01:05:32,440 --> 01:05:36,679
So the overall complexity of this function is theta of log n, where I don't actually care

942
01:05:36,679 --> 01:05:41,440
about the base when I report the complexity in terms of log.

943
01:05:41,440 --> 01:05:49,280
In this case, it's base 10, but if it was base 2, it would be the same log n.

944
01:05:49,280 --> 01:05:56,840
Okay, so we saw some, a bunch of examples, just one of logarithmic complexity.

945
01:05:56,840 --> 01:06:02,320
But we're going to see next that searching for an element in the list will also be logarithmic

946
01:06:02,320 --> 01:06:03,320
complexity.

947
01:06:03,320 --> 01:06:04,320
Okay.

948
01:06:04,320 --> 01:06:10,880
Before we get to that, I'd like to just put this slide up to remind you that there are several

949
01:06:10,880 --> 01:06:16,720
functions built in functions with lists and dictionaries that aren't constant, right?

950
01:06:16,720 --> 01:06:22,120
So like that example you guys did, where we used the in operator, right?

951
01:06:22,120 --> 01:06:27,280
We had to be careful if you ever see these operations being done in the code, don't just

952
01:06:27,280 --> 01:06:28,280
push them aside.

953
01:06:28,280 --> 01:06:32,600
You have to account for them within the complexity analysis.

954
01:06:32,600 --> 01:06:35,080
Okay.

955
01:06:35,080 --> 01:06:39,760
So next, we're going to look at some searching algorithms.

956
01:06:39,760 --> 01:06:45,160
These algorithms, we're going to see a bunch of different codes that implement searching.

957
01:06:45,160 --> 01:06:50,160
These will, again, there'll be very similar to the ones that we actually timed last lecture.

958
01:06:50,160 --> 01:06:54,640
So we're going to look at searching for an element in a list.

959
01:06:54,639 --> 01:07:01,400
We're going to look at a bunch of different implementations of the plain brute force searching

960
01:07:01,400 --> 01:07:03,079
element in a list, right?

961
01:07:03,079 --> 01:07:07,559
Whether it's sorted or unsorted, as long as you just brute force your way from the beginning

962
01:07:07,559 --> 01:07:11,759
of the list to the end of the list, you'll be able to find the element you're looking for

963
01:07:11,759 --> 01:07:13,960
or say that it's not there.

964
01:07:13,960 --> 01:07:16,480
So we're going to look at some linear search functions.

965
01:07:16,480 --> 01:07:21,799
And then we're going to look at the bisection search, a couple bisection search implementations.

966
01:07:21,800 --> 01:07:25,920
And that's where we divide the list in half and discard one of the halves.

967
01:07:25,920 --> 01:07:32,360
And those implementations, though, will need our list to be sorted, right?

968
01:07:32,360 --> 01:07:36,080
So the brute forcing our way doesn't really matter whether it's sorted or not.

969
01:07:36,080 --> 01:07:41,039
But the bisection search only gives the correct answer if the list is sorted to begin with.

970
01:07:41,039 --> 01:07:42,039
All right.

971
01:07:42,039 --> 01:07:46,560
So first, let's look at linear search on an unsorted list.

972
01:07:46,560 --> 01:07:51,360
This is code that is going to search for element E in list L.

973
01:07:51,360 --> 01:07:57,480
It loops through the length of the list and keeps this Boolean flag in mind if it finds

974
01:07:57,480 --> 01:08:00,079
the element we're looking for, just sets the flag.

975
01:08:00,079 --> 01:08:04,200
And at the end of iterating through the whole list, it tells us whether it found it or

976
01:08:04,200 --> 01:08:05,640
not.

977
01:08:05,640 --> 01:08:11,720
So the worst case scenario analysis says that we have to look through the entire list to determine

978
01:08:11,720 --> 01:08:14,160
the element is there or not.

979
01:08:14,160 --> 01:08:19,920
So the theta of this particular function is theta of length L, right?

980
01:08:19,920 --> 01:08:21,600
There's only one loop.

981
01:08:21,600 --> 01:08:26,880
Depends on the length of L that nothing really special about this function.

982
01:08:26,880 --> 01:08:31,359
Now you might notice that there's something inefficient about this function and that once

983
01:08:31,359 --> 01:08:36,000
it finds an element, let's say at the beginning of the list, this function actually just sets

984
01:08:36,000 --> 01:08:39,760
the flag and keeps going through to the end of the list.

985
01:08:39,760 --> 01:08:46,199
So we can actually do a little bit of a speed up with this bit here and say that, hey, if

986
01:08:46,199 --> 01:08:48,680
we find it, just return true right away.

987
01:08:48,680 --> 01:08:52,200
We don't need to keep going to the end of the list.

988
01:08:52,200 --> 01:08:55,800
So what's the analysis for this code?

989
01:08:55,800 --> 01:09:00,800
Well, again, we're doing worst case analysis, so in the worst case, the element is not

990
01:09:00,800 --> 01:09:05,440
there, so we still have to search through every single element in the list beginning to

991
01:09:05,440 --> 01:09:08,360
end to determine it's not there.

992
01:09:08,360 --> 01:09:12,960
So the worst case, theta analysis for this function is that we still have to go through to

993
01:09:12,960 --> 01:09:17,440
the end of the list to determine it's not there, so it's still going to be, sorry, it's

994
01:09:17,439 --> 01:09:25,159
still going to be theta of length L, time.

995
01:09:25,159 --> 01:09:31,239
So this is on an unsorted list, but what if we look at a sorted list?

996
01:09:31,239 --> 01:09:35,199
So we can do a little something clever in our code.

997
01:09:35,199 --> 01:09:42,079
If the list is sorted, we can say, we're going to start at, let's say it's increasing

998
01:09:42,079 --> 01:09:43,079
sorted, right?

999
01:09:43,079 --> 01:09:47,119
We can start at the beginning of the list, look through each element.

1000
01:09:47,119 --> 01:09:53,199
If we find it, return true, if we reach an element that's bigger than the one we're looking

1001
01:09:53,199 --> 01:09:58,159
for, the list is sorted, so all the remaining elements in the list are also bigger than

1002
01:09:58,159 --> 01:10:00,479
the one we're looking for, right?

1003
01:10:00,479 --> 01:10:03,920
And then we can just return false right away.

1004
01:10:03,920 --> 01:10:08,960
Well we think we're pretty clever, but the worst case analysis says that the list is,

1005
01:10:08,960 --> 01:10:13,560
the element is not even in the list at all, so we still have to go through and look to

1006
01:10:13,560 --> 01:10:18,560
the end of the list to figure out that that element is not there, so we still have to touch

1007
01:10:18,560 --> 01:10:21,760
each element in the list to determine it's not there.

1008
01:10:21,760 --> 01:10:26,000
So the theta, worst case theta complexity analysis still says that this is theta of length

1009
01:10:26,000 --> 01:10:27,000
L, right?

1010
01:10:27,000 --> 01:10:32,000
Because everything else is constant.

1011
01:10:32,000 --> 01:10:38,439
Okay, so now let's look at bisecticers, so as far as we can tell, just doing a linear

1012
01:10:38,479 --> 01:10:44,839
brute force search way is not going to give us anything better than theta of n.

1013
01:10:44,839 --> 01:10:49,039
But when we looked at the timings in last lecture, we saw that this binary search, or

1014
01:10:49,039 --> 01:10:54,559
bisection search on an element in the list, was actually much faster, right?

1015
01:10:54,559 --> 01:10:59,399
It grew out of something faster rate than linear, but not quite constant.

1016
01:10:59,399 --> 01:11:05,119
So let's remember how that code looked, so we basically had a list with a bunch of elements

1017
01:11:05,119 --> 01:11:09,840
in it, we looked at the element at the middle of the list, and we said, are you the one

1018
01:11:09,840 --> 01:11:11,000
we're looking for?

1019
01:11:11,000 --> 01:11:13,039
In the worst case, it's not, right?

1020
01:11:13,039 --> 01:11:18,039
So then we have to ask, are you bigger or smaller than the one we're looking for?

1021
01:11:18,039 --> 01:11:22,119
If it's bigger, then we know we have to look in the lower half of the list.

1022
01:11:22,119 --> 01:11:25,000
If it's smaller, we look in the upper half of the list.

1023
01:11:25,000 --> 01:11:29,479
And now that we either look in the lower or the upper half, we notice we have the exact

1024
01:11:29,479 --> 01:11:31,680
same problem to solve.

1025
01:11:31,680 --> 01:11:36,440
So this should ring a little bell that says we should use recursion, right?

1026
01:11:36,440 --> 01:11:41,480
As now we have the same problem to solve, an element e in a slightly smaller list, is

1027
01:11:41,480 --> 01:11:43,440
it in that list?

1028
01:11:43,440 --> 01:11:47,640
So that's exactly what we're going to implement.

1029
01:11:47,640 --> 01:11:50,560
So visually speaking, this is what we're going to do.

1030
01:11:50,560 --> 01:11:55,320
We're going to have an original list with n elements in it.

1031
01:11:55,320 --> 01:11:59,000
We're going to look at the halfway point, worst case, it's not the one we're looking for,

1032
01:11:59,000 --> 01:12:03,000
so we're going to decide on one of the sides to next search through.

1033
01:12:03,000 --> 01:12:05,520
Now we have n over two elements to look through.

1034
01:12:05,520 --> 01:12:09,239
Again, it's not there, worst case, so we have to decide on which half to look through.

1035
01:12:09,239 --> 01:12:11,720
Now we have n over four elements to look through.

1036
01:12:11,720 --> 01:12:16,359
We keep doing this, we keep sort of having more and more recursive calls until we reach

1037
01:12:16,359 --> 01:12:18,039
a base case.

1038
01:12:18,039 --> 01:12:24,359
And the base case is that we now have a list with one element in it.

1039
01:12:24,359 --> 01:12:28,239
Either that element is the one we're looking for, or worst case, it's not.

1040
01:12:28,239 --> 01:12:34,679
And we've determined that the element we're looking for is not in these n elements at all.

1041
01:12:34,679 --> 01:12:41,319
So our base case is down here, and we started with n elements over here.

1042
01:12:41,319 --> 01:12:48,599
So the bisection search algorithm will repeat this task of dividing the list in half, let's

1043
01:12:48,599 --> 01:12:51,800
say i times.

1044
01:12:51,800 --> 01:12:55,239
So this is, quote unquote, how many iterations we would have made, right?

1045
01:12:55,239 --> 01:12:57,920
But since this is recursion, there's no iterations.

1046
01:12:57,920 --> 01:13:04,279
This is how many function calls we have until we reach the base case, i function calls.

1047
01:13:04,279 --> 01:13:11,239
So if we take our original n elements, and we divide them by two so many times that we

1048
01:13:11,239 --> 01:13:16,039
have only one element left to search for, that's when we found our answer.

1049
01:13:16,039 --> 01:13:23,920
So we now have a relationship between how many elements we had, originally n elements,

1050
01:13:23,920 --> 01:13:29,039
and how many times we had to divide our loop to get to our answer, right?

1051
01:13:29,039 --> 01:13:31,279
How many of these levels we have, right?

1052
01:13:31,279 --> 01:13:33,600
n divided by two to the i equals one.

1053
01:13:33,600 --> 01:13:35,239
That's our relationship.

1054
01:13:35,239 --> 01:13:40,560
So in the bisection search algorithm, how many times are we calling this recursive function

1055
01:13:40,560 --> 01:13:42,159
to get to the base case?

1056
01:13:42,159 --> 01:13:43,560
Well, i times.

1057
01:13:43,560 --> 01:13:45,840
So what is i in terms of n?

1058
01:13:45,840 --> 01:13:50,920
Well, the relationship between i and n is similar to the one we had over here, right?

1059
01:13:50,920 --> 01:13:52,880
Where we divided this number by 10 each time.

1060
01:13:52,880 --> 01:13:57,039
Except that now we're dividing a list of n elements by two each time.

1061
01:13:57,039 --> 01:14:01,039
So the relationship is still logarithmic, right?

1062
01:14:01,039 --> 01:14:06,279
It relates the number of elements I originally had, and with how many times I had to divide

1063
01:14:06,279 --> 01:14:12,640
my list to get to one element, whether it's the one I'm looking for or not.

1064
01:14:12,640 --> 01:14:19,239
So the complexity of just the pure bisection search algorithm is theta of log n, where n

1065
01:14:19,239 --> 01:14:21,079
is the length of the list, right?

1066
01:14:21,079 --> 01:14:25,640
That's how many subdivisions I need to do to get to one element to decide it's not the

1067
01:14:25,640 --> 01:14:28,039
one I'm looking for.

1068
01:14:28,039 --> 01:14:32,239
So now we're going to look at two different implementations of the code to do bisection

1069
01:14:32,239 --> 01:14:33,239
search.

1070
01:14:33,239 --> 01:14:35,079
One will be more efficient than the other.

1071
01:14:35,079 --> 01:14:39,640
Let's start with the one that's simpler to write, but less efficient.

1072
01:14:39,640 --> 01:14:45,359
So this code, you can see here, it looks for element e and list L, has two base cases

1073
01:14:45,359 --> 01:14:46,359
up there.

1074
01:14:46,359 --> 01:14:48,000
Those are both constant.

1075
01:14:48,000 --> 01:14:50,159
And one recursive step here, right?

1076
01:14:50,159 --> 01:14:51,800
So either we do this one or this one.

1077
01:14:51,800 --> 01:14:56,119
So this one is if we decided we need to look in the lower half, and this is if we decided

1078
01:14:56,119 --> 01:15:00,039
we need to look in the upper half for the element.

1079
01:15:00,039 --> 01:15:05,039
So this is just pure bisection search, which on the previous slide we decided is theta

1080
01:15:05,039 --> 01:15:10,159
of log of length of the list, theta of log n.

1081
01:15:10,159 --> 01:15:16,319
Now that's fine, but what do we have as a parameter here?

1082
01:15:16,319 --> 01:15:19,439
It's half of my list, right?

1083
01:15:19,439 --> 01:15:24,219
So in addition to doing bisection search and just doing the algorithm, having a bunch

1084
01:15:24,219 --> 01:15:29,679
of bisection search calls that take me to that list of one element, on top of that each

1085
01:15:29,679 --> 01:15:34,759
time I make that bisection search call, I'm copying my list.

1086
01:15:34,759 --> 01:15:37,479
So this is not constant.

1087
01:15:37,479 --> 01:15:40,159
It's theta of length L over 2, right?

1088
01:15:40,159 --> 01:15:42,599
I grab half of my list.

1089
01:15:42,600 --> 01:15:49,000
So the complexity of that code is theta of n times log n.

1090
01:15:49,000 --> 01:15:54,640
Theta of log n for the bisection search bit, but theta of n tacked on to each one of those

1091
01:15:54,640 --> 01:15:59,760
calls because I have to grab a copy of my list with each function call, right?

1092
01:15:59,760 --> 01:16:02,480
So it's not quite that efficient.

1093
01:16:02,480 --> 01:16:07,079
Now let's look at a slightly different implementation.

1094
01:16:07,079 --> 01:16:11,720
This particular one is going to use integers to keep track of endpoints.

1095
01:16:11,720 --> 01:16:16,440
So instead of copying my list, let me just keep track of a number for my low endpoint

1096
01:16:16,440 --> 01:16:19,480
and a number for my high endpoint.

1097
01:16:19,480 --> 01:16:23,960
The complexity analysis for the bisection search is going to be exactly the same because

1098
01:16:23,960 --> 01:16:27,039
even though I'm just keeping track of these high and low endpoints, I'm still dividing

1099
01:16:27,039 --> 01:16:29,760
the list in half with each call.

1100
01:16:29,760 --> 01:16:34,199
But I'm doing it by keeping track of integer indices.

1101
01:16:34,199 --> 01:16:37,159
So the size of the problem is still reduced by two at each step.

1102
01:16:37,159 --> 01:16:39,039
I'm keeping track of these integer indices.

1103
01:16:39,039 --> 01:16:41,640
I'm not copying the list at this point.

1104
01:16:41,640 --> 01:16:47,880
I'm just changing an integer value from 10 to 5 or whatever it is.

1105
01:16:47,880 --> 01:16:53,240
So the complexity analysis of the theta of the bisection search is theta of log n.

1106
01:16:53,240 --> 01:16:58,560
The code looks a little bit messier, but overall it still does the same sort of things.

1107
01:16:58,560 --> 01:17:05,320
It's messier because now I want bisection search to look for an element e in list L, but

1108
01:17:05,320 --> 01:17:09,760
I'd like my recursive call to keep track of two endpoints, right?

1109
01:17:09,760 --> 01:17:16,760
So I'm going to create another function that I kick off down here, which looks for an

1110
01:17:16,760 --> 01:17:22,760
element e in list L, but I'm also going to keep track of my low and high endpoints as parameter

1111
01:17:22,760 --> 01:17:26,760
to my bisection search function.

1112
01:17:26,760 --> 01:17:31,760
So bisection search helper here is now going to take in these four parameters.

1113
01:17:31,760 --> 01:17:36,760
The rest of the code, no, it's just details, but what's important is everything is constant

1114
01:17:36,760 --> 01:17:40,760
except for my two bisection search calls.

1115
01:17:40,760 --> 01:17:48,760
Here, I'm changing my high, if I want to look in the lower half of the list, and here I'm changing my low,

1116
01:17:48,760 --> 01:17:51,760
if I want to look in the upper half of the list.

1117
01:17:51,760 --> 01:17:57,760
So those bisection search calls are still going to be theta of log n, but what's the overhead now?

1118
01:17:57,760 --> 01:17:59,760
The overhead is nothing, right? It's constant.

1119
01:17:59,760 --> 01:18:01,760
This L is the same one.

1120
01:18:01,760 --> 01:18:03,760
I'm not making a copy of it.

1121
01:18:03,760 --> 01:18:05,760
I'm just passing it through.

1122
01:18:05,760 --> 01:18:10,760
E is just a number, low is just a number, and mid minus one is just a constant operation.

1123
01:18:10,760 --> 01:18:12,760
There's nothing being copied here.

1124
01:18:12,760 --> 01:18:18,760
So the overall complexity of this code, while it looks a little bit pissier, is just theta of log n, right?

1125
01:18:18,760 --> 01:18:23,760
Because the overhead is constant on each one of those function calls.

1126
01:18:23,760 --> 01:18:27,760
So that brings us to this final question, right?

1127
01:18:27,760 --> 01:18:31,760
Clearly, bisection search on a sorted list is faster.

1128
01:18:31,760 --> 01:18:36,760
It's theta of log n, then pure brute force search on a list.

1129
01:18:36,760 --> 01:18:38,760
That could be sorted or unsorted.

1130
01:18:38,760 --> 01:18:44,760
So the question is, when does it make sense to sort the list first?

1131
01:18:44,760 --> 01:18:51,760
So given an unsorted list, when do you sort the list and use this fast binary search,

1132
01:18:51,760 --> 01:18:55,760
versus just using a straight up linear search?

1133
01:18:55,760 --> 01:18:59,760
Well, that's when the time it takes to do the sort, right?

1134
01:18:59,760 --> 01:19:08,760
An initial sort, plus the complexity to do binary search, is less than doing the straight up linear search.

1135
01:19:08,760 --> 01:19:11,760
Because the list has to be sorted for this to work.

1136
01:19:11,760 --> 01:19:13,760
Well, when is that true?

1137
01:19:13,760 --> 01:19:21,760
Well, this implies that the time it takes to do the sort is less than theta of n.

1138
01:19:21,760 --> 01:19:29,760
So that means, what, can you sort a list without even looking at all the elements once?

1139
01:19:29,760 --> 01:19:30,760
No, right?

1140
01:19:30,760 --> 01:19:35,760
Like, you have to look at all the elements once to even say that, hey, this list is already sorted.

1141
01:19:35,760 --> 01:19:38,760
So this is actually never true.

1142
01:19:38,760 --> 01:19:39,760
Right?

1143
01:19:39,760 --> 01:19:40,760
So what does that mean?

1144
01:19:40,760 --> 01:19:45,760
Does that mean we never want to do binary search on a list, unless it's already sorted?

1145
01:19:45,760 --> 01:19:46,760
Kind of.

1146
01:19:47,760 --> 01:19:54,760
But in fact, you know, there are various situations when it does make sense to do the sort first, and then use binary search.

1147
01:19:54,760 --> 01:20:03,760
And that's the case where you, you're given a data set, and you want to do a whole bunch of searches on that data set.

1148
01:20:03,760 --> 01:20:09,760
So if you can take that sort, do it once, and then amortize the cost.

1149
01:20:09,760 --> 01:20:14,760
It took you to do that sort over K different searches.

1150
01:20:14,760 --> 01:20:23,760
Then it makes sense to pay the price to do the sort once, and then do it over, and then do the binary search over all these searches.

1151
01:20:23,760 --> 01:20:27,760
All these, yeah, all these searches.

1152
01:20:27,760 --> 01:20:32,760
And so as K gets really big, the time it takes for you to do the sort becomes irrelevant.

1153
01:20:32,760 --> 01:20:44,760
Right? The theta of doing this thing on the left becomes just the theta to do the search, the search logarithmically, then it does to do the search linear.

1154
01:20:44,760 --> 01:20:45,760
Okay.

1155
01:20:45,760 --> 01:20:50,760
So if you're only doing the search once, please do not sort your list, and then do a binary search.

1156
01:20:50,760 --> 01:20:56,760
That's going to take longer than just looking at the elements in your list straight through using brute force.

1157
01:20:56,760 --> 01:21:03,760
But if you're going to do a whole bunch of searches, make sense to do the sort, and then do the search.

1158
01:21:03,760 --> 01:21:05,760
All right. That's all I've got.

1159
01:21:05,760 --> 01:21:11,760
Next lecture, we're going to look at a bunch of different sorting algorithms, and we'll have a quiz.

