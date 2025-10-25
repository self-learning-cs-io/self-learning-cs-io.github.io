---
title: CS143 P123Week1018 03 Java Exceptions
---

1
00:00:00,000 --> 00:00:11,400
In this video, we're going to talk about program or defined exceptions.

2
00:00:11,400 --> 00:00:14,040
So think about the following typical program scenario.

3
00:00:14,040 --> 00:00:19,019
You're deep into some fairly complex section of code and you come to a place where you

4
00:00:19,019 --> 00:00:21,760
could experience an unexpected error.

5
00:00:21,760 --> 00:00:27,280
There could be something that could happen that would violate some important property of

6
00:00:27,280 --> 00:00:28,280
your program.

7
00:00:28,280 --> 00:00:31,600
For example, maybe you're going to discover that a place where you could be out of memory

8
00:00:31,600 --> 00:00:35,600
or there's some data structure that doesn't satisfy some invariant.

9
00:00:35,600 --> 00:00:38,880
So a list is supposed to be sorted, that is not, or something like that.

10
00:00:38,880 --> 00:00:40,439
And the question is, how do you handle these errors?

11
00:00:40,439 --> 00:00:46,120
How do you write code that will handle the error gracefully and not make your program really,

12
00:00:46,120 --> 00:00:48,799
really ugly?

13
00:00:48,799 --> 00:00:52,880
So a popular solution to this problem in many languages, including Java, is add a new

14
00:00:52,880 --> 00:00:56,880
kind of value to the language called an exception.

15
00:00:56,880 --> 00:01:00,320
And we'll have a couple of control constructs for dealing with exceptions.

16
00:01:00,320 --> 00:01:05,640
Here is the two that are probably the most popular and these are as they appear in Java.

17
00:01:05,640 --> 00:01:07,159
So we can throw exceptions.

18
00:01:07,159 --> 00:01:12,320
And what this does is it causes an exception to be created at this point wherever the throw

19
00:01:12,320 --> 00:01:14,040
occurs.

20
00:01:14,040 --> 00:01:17,120
And that exception will simply propagate out of the program.

21
00:01:17,120 --> 00:01:21,480
It'll basically halt the execution of the program at that point.

22
00:01:21,480 --> 00:01:27,400
And any containing constructs will also throw the exception.

23
00:01:27,400 --> 00:01:32,719
So the exception will simply propagate up out of the code that's currently executing until

24
00:01:32,719 --> 00:01:36,200
it hits a try catch.

25
00:01:36,200 --> 00:01:37,359
So how does this work?

26
00:01:37,359 --> 00:01:39,080
Well we can try something.

27
00:01:39,080 --> 00:01:40,920
We can execute some expression here.

28
00:01:40,920 --> 00:01:43,480
This will be some expression.

29
00:01:43,480 --> 00:01:48,560
And if this expression throws an exception, if a throw occurs somewhere inside this expression,

30
00:01:48,560 --> 00:01:50,879
then we will catch that exception.

31
00:01:50,879 --> 00:01:56,040
And there can be a binding here to say what we're going to call the exception value.

32
00:01:56,040 --> 00:01:57,040
So this is like a let.

33
00:01:57,040 --> 00:01:59,240
We'll grab the exception that comes out of here.

34
00:01:59,240 --> 00:02:00,799
We'll call it x.

35
00:02:00,799 --> 00:02:06,840
And then we can execute this piece of cleanup code to handle the exception in some way.

36
00:02:06,840 --> 00:02:14,800
And so the basic idea behind this design for handling exceptions is at the place where

37
00:02:14,800 --> 00:02:18,520
you have the exception, the place where you actually detect the exception might be somewhat

38
00:02:18,520 --> 00:02:23,800
somewhere deep inside the code and not a very good place for actually dealing with the exception.

39
00:02:23,800 --> 00:02:27,280
So what you want to do is get out of that part of the code, get back to some higher level

40
00:02:27,280 --> 00:02:33,360
point where you can clean things up, deal with the exception, and then retry perhaps some

41
00:02:33,360 --> 00:02:37,160
larger block of code.

42
00:02:37,160 --> 00:02:40,480
Here's a little example of using exceptions.

43
00:02:40,480 --> 00:02:42,400
So here we have our main method.

44
00:02:42,400 --> 00:02:44,200
And what are we going to do?

45
00:02:44,200 --> 00:02:47,080
We're going to have a try block that just calls a function x.

46
00:02:47,080 --> 00:02:51,280
And if that raises an exception, then we will catch the exception.

47
00:02:51,280 --> 00:02:53,160
In this case, we don't do anything with the exception.

48
00:02:53,160 --> 00:02:57,240
We just print out a message saying there was an error and we terminate the program.

49
00:02:57,240 --> 00:02:59,000
So we don't do anything very smart.

50
00:02:59,000 --> 00:03:03,560
But we do catch the exception and at least print out an error rather than just terminating.

51
00:03:03,560 --> 00:03:05,200
So what does x do?

52
00:03:05,200 --> 00:03:08,040
Well x simply throws an exception.

53
00:03:08,040 --> 00:03:13,920
So this function x allocates an exception object.

54
00:03:13,920 --> 00:03:14,920
This is just a value.

55
00:03:14,919 --> 00:03:18,479
It's just a class like everything else, but it has a special property that it can be thrown.

56
00:03:18,479 --> 00:03:23,679
So when we throw it, that's when x terminates abnormally and we end up in the catch block

57
00:03:23,679 --> 00:03:29,039
of the trichatch expression back in the main method.

58
00:03:29,039 --> 00:03:33,639
Now in the last couple of slides, I gave you a very informal description of how exceptions

59
00:03:33,639 --> 00:03:34,639
work.

60
00:03:34,639 --> 00:03:37,079
And it might not have been very clear.

61
00:03:37,079 --> 00:03:42,039
And in fact, it's hard, I think, to give a very clear description without some kind

62
00:03:42,039 --> 00:03:45,639
of formal description of how exceptions are supposed to behave.

63
00:03:45,639 --> 00:03:49,400
But fortunately, we've looked at operational semantics in this class and so now you're

64
00:03:49,400 --> 00:03:53,120
familiar with those kinds of descriptions of language behavior.

65
00:03:53,120 --> 00:03:58,919
And I can actually describe you pretty succinctly how trichatch actually really works.

66
00:03:58,919 --> 00:04:04,280
So we're going to give operational rules here for trichatch expressions.

67
00:04:04,280 --> 00:04:07,840
And I just noticed, I just point out here that I had some kind of font problem.

68
00:04:07,840 --> 00:04:11,039
And so I had to write in the turn styles by hand in this slide.

69
00:04:11,039 --> 00:04:16,759
So those handwritten characters are all supposed to be the turn style character.

70
00:04:16,759 --> 00:04:22,240
Now to more important things, there's a distinction with exceptions.

71
00:04:22,240 --> 00:04:26,399
There are two kinds of states that an exception object could be in.

72
00:04:26,399 --> 00:04:28,039
It could just be an ordinary value.

73
00:04:28,039 --> 00:04:33,240
So when I say new exception object in Java, say when I say something new that's of the exception

74
00:04:33,240 --> 00:04:35,959
class, it's just an ordinary value at that point.

75
00:04:35,959 --> 00:04:38,480
It just behaves like any other object.

76
00:04:38,480 --> 00:04:41,319
But then there's a distinction when the object is thrown.

77
00:04:41,319 --> 00:04:45,040
So when the exception is actually thrown, it becomes a special kind of value.

78
00:04:45,040 --> 00:04:47,040
And it gets treated differently.

79
00:04:47,040 --> 00:04:53,720
So we're going to distinguish between an ordinary object v and objects that have been thrown,

80
00:04:53,720 --> 00:04:57,520
which are then active exceptions.

81
00:04:57,520 --> 00:05:03,920
So let's take a look at some of the operational rules for the exception constructs.

82
00:05:03,920 --> 00:05:06,920
So here's one rule for it's a try catch block.

83
00:05:06,920 --> 00:05:12,520
And what this rule says is that if an expression evaluates to an ordinary value, if it doesn't

84
00:05:12,520 --> 00:05:17,080
throw an exception, then the result of the try catch block is just that value.

85
00:05:17,080 --> 00:05:22,319
So the way a try catch block works is you evaluate the expression in the try block.

86
00:05:22,319 --> 00:05:28,319
If that terminates normally with a value, then the result of the whole expression is just

87
00:05:28,319 --> 00:05:29,319
that value.

88
00:05:29,319 --> 00:05:30,319
All right.

89
00:05:30,560 --> 00:05:34,159
The other possibility is that you'll evaluate a try catch block.

90
00:05:34,159 --> 00:05:38,920
And when you go to evaluate the expression in the try block, e1, it will throw an exception.

91
00:05:38,920 --> 00:05:41,279
So it could result in a thrown exception.

92
00:05:41,279 --> 00:05:42,879
So this is this case.

93
00:05:42,879 --> 00:05:49,560
OK, that that, excuse me, is this case where e1 evaluates to one of these special values.

94
00:05:49,560 --> 00:05:51,759
It's been marked as a thrown exception.

95
00:05:51,759 --> 00:05:52,759
What do we do in that case?

96
00:05:52,759 --> 00:05:55,879
Well, we unwrap the exception.

97
00:05:55,879 --> 00:05:59,759
We pull out the value that's in the thrown exception.

98
00:05:59,759 --> 00:06:02,279
We bind it to some local name, all right.

99
00:06:02,279 --> 00:06:05,279
That's named in the catch expression.

100
00:06:05,279 --> 00:06:07,240
And then we evaluate the cleanup code.

101
00:06:07,240 --> 00:06:10,519
So with the exception value available, we evaluate e2.

102
00:06:10,519 --> 00:06:18,959
And whatever the result is of e2, that is the result of the try catch block.

103
00:06:18,959 --> 00:06:20,279
How does throw work?

104
00:06:20,279 --> 00:06:21,279
It's very simple.

105
00:06:21,279 --> 00:06:23,839
So throw just takes an expression.

106
00:06:23,839 --> 00:06:25,000
It evaluates that expression.

107
00:06:25,000 --> 00:06:26,519
It gets an value v.

108
00:06:26,519 --> 00:06:31,639
And then it marks that value as a thrown exception, as a thrown exception.

109
00:06:31,639 --> 00:06:34,759
So it wraps the value in this T thing.

110
00:06:34,759 --> 00:06:38,799
And that indicates that this exception now has been thrown.

111
00:06:38,799 --> 00:06:42,799
Now the only other thing we need to talk about is how the rest of the language, all the

112
00:06:42,799 --> 00:06:48,199
other constructs in the language, deal with these thrown exceptions.

113
00:06:48,199 --> 00:06:49,799
And that's very simple.

114
00:06:49,799 --> 00:06:55,279
We want those thrown exceptions to simply propagate out of any other kind of expression.

115
00:06:55,279 --> 00:06:59,519
So for example, we'll just do one example here because the idea is the same for every

116
00:06:59,519 --> 00:07:01,319
other language construct.

117
00:07:01,319 --> 00:07:05,879
Let's say that we're evaluating e1 plus e2.

118
00:07:05,879 --> 00:07:09,559
So the first thing we need to do of course is to evaluate e1.

119
00:07:09,559 --> 00:07:14,759
And if that happens to throw an exception, so something goes wrong in the evaluation of

120
00:07:14,759 --> 00:07:20,359
e1 and e1 evaluates to a thrown exception, well then we stop the evaluation of the plus

121
00:07:20,359 --> 00:07:21,359
right there.

122
00:07:21,359 --> 00:07:22,359
We don't even evaluate e2.

123
00:07:22,360 --> 00:07:25,960
Notice that e2 is not mentioned here above the line.

124
00:07:25,960 --> 00:07:28,000
It's one of the things to be evaluated.

125
00:07:28,000 --> 00:07:33,120
So if e1 terminates abnormally within an exception, then the result of the entire addition is

126
00:07:33,120 --> 00:07:34,520
that exception.

127
00:07:34,520 --> 00:07:40,160
And similarly for all the other constructs, if there's one of their sub-expressions results

128
00:07:40,160 --> 00:07:46,280
in an exception, in fact if as soon as one of their sub-expressions results in an exception,

129
00:07:46,280 --> 00:07:49,199
they stop evaluating and propagate that exception up.

130
00:07:49,199 --> 00:07:52,920
The only thing that will stop the exception from propagating all the way out to become

131
00:07:52,920 --> 00:08:00,199
the result of the whole program is if it is caught in a tri-catch block.

132
00:08:00,199 --> 00:08:05,079
There are many ways to implement exceptions and here is one simple way to do it.

133
00:08:05,079 --> 00:08:09,519
So when we encounter a tri-expression, we will mark the current location in the stack.

134
00:08:09,519 --> 00:08:12,439
So we will mark the position in the stack where we encounter the tri.

135
00:08:12,439 --> 00:08:16,839
So for example, here say is our stack.

136
00:08:16,839 --> 00:08:19,519
Let's say that the stack is going this way.

137
00:08:19,519 --> 00:08:21,799
We encounter a tri-expression here.

138
00:08:21,799 --> 00:08:26,199
So we put some kind of marker in the stack to indicate that there's a tri that was encountered

139
00:08:26,199 --> 00:08:27,199
there.

140
00:08:27,199 --> 00:08:31,239
And then we go on evaluating things inside of the tri, which might add more stuff to the

141
00:08:31,239 --> 00:08:32,240
stack.

142
00:08:32,240 --> 00:08:36,360
Now when we throw an exception, if down here all of a sudden the throw occurs when we're

143
00:08:36,360 --> 00:08:41,519
at this point in the execution, what's going to happen is we're going to unwind the

144
00:08:41,519 --> 00:08:42,519
stacks.

145
00:08:42,519 --> 00:08:44,399
We're going to knock everything off the stack.

146
00:08:44,399 --> 00:08:48,840
We're going to pop all of this stuff off the stack so it's all gone back to the first

147
00:08:48,840 --> 00:08:49,840
tri.

148
00:08:49,840 --> 00:08:51,919
And then we'll execute the corresponding catch.

149
00:08:51,919 --> 00:08:56,399
So here we have marked the place in the code where there was a tri and we can use that

150
00:08:56,399 --> 00:09:01,840
to find the expression, the piece of the code that has the corresponding catch block and

151
00:09:01,840 --> 00:09:05,759
we'll unwind the stack to that point and then begin evaluation at the catch.

152
00:09:05,759 --> 00:09:13,360
So this particular design has the disadvantage that tries actually costs something.

153
00:09:13,360 --> 00:09:19,159
So even if you don't throw an exception, you still pay something to execute a tri catch

154
00:09:19,159 --> 00:09:20,159
block.

155
00:09:20,159 --> 00:09:24,200
You have to at least mark the stack and remember to unmark it, of course, when you pop things

156
00:09:24,200 --> 00:09:26,919
off the stack when you leave the tri block.

157
00:09:26,919 --> 00:09:33,279
So more complex techniques tries reduce the cost of try and throw and also trade off between

158
00:09:33,279 --> 00:09:34,279
them.

159
00:09:34,279 --> 00:09:38,800
And generally, the thing you want to do is because exceptions are probably relatively rare

160
00:09:38,799 --> 00:09:44,079
in most programs is to make the cost of try as low as possible, possibly the expense

161
00:09:44,079 --> 00:09:50,240
of making throws slightly more expensive.

162
00:09:50,240 --> 00:09:53,519
Now here's a little trivia question about Java.

163
00:09:53,519 --> 00:09:59,479
So what happens to an uncought exception that's thrown during object finalization?

164
00:09:59,479 --> 00:10:04,319
So if you don't know what object finalization is, well, when an object is collected, when

165
00:10:04,320 --> 00:10:11,200
an object is garbage collected, it is possible to run a method on that object to clean it

166
00:10:11,200 --> 00:10:14,200
up before the garbage collector actually deallocates it.

167
00:10:14,200 --> 00:10:16,040
And this is called the finalization method.

168
00:10:16,040 --> 00:10:21,200
So objects can have finalization methods in Java and those methods are essentially invoked

169
00:10:21,200 --> 00:10:22,200
by the garbage collector.

170
00:10:22,200 --> 00:10:25,400
So when the garbage collector discovers that some object is garbage and it's going to clean

171
00:10:25,400 --> 00:10:28,720
it up, it'll first invoke the finalization method.

172
00:10:28,720 --> 00:10:30,280
And why would you want to do this?

173
00:10:30,559 --> 00:10:35,919
Well, let's say we have an object and it might have say a file handle.

174
00:10:35,919 --> 00:10:39,559
It might have a pointer to an open file or something like that.

175
00:10:39,559 --> 00:10:44,240
And now when this object becomes unreachable, it will be collected by the garbage collector.

176
00:10:44,240 --> 00:10:47,839
But if you don't close the file, well, that's going to cause problems having lots of open

177
00:10:47,839 --> 00:10:53,039
files that are hanging around with the program using them, it can cause problems later on,

178
00:10:53,039 --> 00:10:54,839
especially if you run out of file handles.

179
00:10:54,839 --> 00:10:59,720
Usually there's a fixed number of file handles available from the operating system.

180
00:10:59,720 --> 00:11:03,560
So the right thing to do is when this is garbage collector is to first close the file and

181
00:11:03,560 --> 00:11:09,240
essentially get rid of this pointer and then deallocate the object.

182
00:11:09,240 --> 00:11:11,480
And that is what the object finalization is for.

183
00:11:11,480 --> 00:11:17,080
So again, you can define a method in Java that will be run by the garbage collector to kind

184
00:11:17,080 --> 00:11:22,279
of clean up any resources the object has before it's actually deallocated.

185
00:11:22,279 --> 00:11:26,440
And now the question is, if that finalization method raises an exception, who catches it?

186
00:11:26,440 --> 00:11:30,560
Because it was invoked by the garbage collector, it's unpredictable when it's going to be invoked.

187
00:11:30,560 --> 00:11:34,120
And it's not clear where that exception should be handled.

188
00:11:34,120 --> 00:11:41,400
And the answer to the question is no one handles that method or nothing handles that method.

189
00:11:41,400 --> 00:11:43,840
Exception is simply dropped.

190
00:11:43,840 --> 00:11:49,320
And so any exceptions that happen during object finalizations that are not handled within the finalization method

191
00:11:49,320 --> 00:11:51,520
itself are simply thrown away.

192
00:11:52,519 --> 00:11:59,039
One of the nice innovations in Java is that exceptions are actually part of the method interface

193
00:11:59,039 --> 00:12:01,519
and they are checked by the compiler.

194
00:12:01,519 --> 00:12:07,279
So in the example that I gave at the beginning of this lecture, we had a method x that could raise

195
00:12:07,279 --> 00:12:12,879
an exception by exception and notice that the declaration of x actually declares that x can throw

196
00:12:12,879 --> 00:12:18,319
that exception. So it's part of the interface to x, part of the checked interface to x that it can

197
00:12:18,320 --> 00:12:22,000
raise a particular exception. And now why would you want to check this at compile time?

198
00:12:22,000 --> 00:12:28,480
Well, the observation that was made actually in the original Java project was that there were many

199
00:12:28,480 --> 00:12:33,920
exceptions that could be raised by Java programs and people easily lost track of what possible

200
00:12:33,920 --> 00:12:37,520
exceptions could be raised. They didn't know what exceptions they had to handle.

201
00:12:37,520 --> 00:12:43,120
And in fact, when they added this to the language, the compiler would actually enforce now

202
00:12:43,120 --> 00:12:46,160
that a method declared every exception it could raise.

203
00:12:46,159 --> 00:12:52,399
They discovered lots of places in the compiler where there were exceptions being raised but not

204
00:12:52,399 --> 00:12:58,799
properly handled it. So this led to better air handling in the Java compiler itself.

205
00:12:58,799 --> 00:13:05,839
And I think people generally agree that this has been a good idea because it helps programmers

206
00:13:05,839 --> 00:13:10,639
to write more robust code because they can see exactly which exceptions they have to handle.

207
00:13:10,639 --> 00:13:16,639
Now there are some exceptions to this rule. In particular, there are some kinds of runtime

208
00:13:16,639 --> 00:13:22,480
errors that don't have to be part of the method signature simply because it's very hard to check

209
00:13:22,480 --> 00:13:27,039
statically that the method would never raise them. So things like irreferencing null or integer overflow

210
00:13:28,000 --> 00:13:34,080
don't have to be handled and declared in the interface. But for the most part, any exception

211
00:13:34,960 --> 00:13:42,240
that a method can raise has to be declared as part of its interface in Java. And then there are

212
00:13:42,240 --> 00:13:47,600
other mundane type rules about the particular design for exceptions in Java. So for example,

213
00:13:47,600 --> 00:13:53,280
throw has to be applied to an object of type exception. It can't be applied to an object of an

214
00:13:53,280 --> 00:13:59,280
arbitrary type. But overall, exceptions are rather nicely done in Java and this particular idea

215
00:13:59,279 --> 00:14:13,439
of declaring the types of the exceptions that a method can raise was a new idea in Java.

