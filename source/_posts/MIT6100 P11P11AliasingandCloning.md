---
title: MIT6100 P11P11AliasingandCloning
---

1
00:00:00,000 --> 00:00:16,719
So, let's get started with lists and mutability.

2
00:00:16,719 --> 00:00:22,960
So last lecture we talked a lot about what it means to have these mutable data structures

3
00:00:22,960 --> 00:00:23,960
lists.

4
00:00:23,960 --> 00:00:26,160
Today, we're not off the hook.

5
00:00:26,160 --> 00:00:29,560
We will continue talking about the idea of mutability.

6
00:00:29,639 --> 00:00:35,239
We're going to do it in the context of removing items from lists and some of the pitfalls that

7
00:00:35,239 --> 00:00:36,839
come with that.

8
00:00:36,839 --> 00:00:42,600
And then we'll go into along the way ideas about cloning or making copies of lists and

9
00:00:42,600 --> 00:00:48,359
aliasing, making another name for the same object in memory.

10
00:00:48,359 --> 00:00:56,280
So first, let's quickly talk about making a copy of a list because so far when we're dealing

11
00:00:56,280 --> 00:01:04,200
with these mutable objects, we notice that it's sometimes inconvenient to mutate the

12
00:01:04,200 --> 00:01:05,200
list.

13
00:01:05,200 --> 00:01:08,200
And it's hard to keep track of the fact that we're mutating a list.

14
00:01:08,200 --> 00:01:12,879
And there are some problems for when it does make sense to make a copy of our list so

15
00:01:12,879 --> 00:01:20,920
that we can mutate the copy or mutate the original while still having those original items

16
00:01:20,920 --> 00:01:23,719
in saved somewhere else.

17
00:01:23,719 --> 00:01:29,840
So you can ask Python to make a copy of a list and basically behind the scenes, it creates

18
00:01:29,840 --> 00:01:35,239
a new list object for us in memory and copies over every single element from the list you'd

19
00:01:35,239 --> 00:01:38,920
like to copy into the new list.

20
00:01:38,920 --> 00:01:43,159
So the syntax for doing a copy of a list is as follows.

21
00:01:43,159 --> 00:01:48,719
So we've got a list that's already made called L and we want to make a copy of it.

22
00:01:48,719 --> 00:01:52,680
So the syntax is L, square brackets with a colon inside it.

23
00:01:52,680 --> 00:01:57,920
And behind the scenes, Python makes this list inside memory and then we save that new list

24
00:01:57,920 --> 00:02:04,700
that has the exact same elements as L into a list named L copy.

25
00:02:04,700 --> 00:02:09,240
And so in memory the way this looks, so if I have this code here where I name my list

26
00:02:09,240 --> 00:02:14,800
L original, again I'm choosing a different name than L just to show you that whatever list

27
00:02:14,800 --> 00:02:17,719
object I have, that's the name I need a reference.

28
00:02:17,719 --> 00:02:23,800
So if I have L original is 4, 5, 6, and memory, if I want to make a copy of my list, I just

29
00:02:23,800 --> 00:02:28,719
say L original, square brackets with a colon inside it, that means copy every single element

30
00:02:28,719 --> 00:02:34,879
from beginning to end of this list and bind it to the name L new.

31
00:02:34,879 --> 00:02:40,039
So notice in memory now I have two list objects, they're referenced by different names and

32
00:02:40,039 --> 00:02:44,240
so if I change one of them, the other one will not change, right?

33
00:02:44,240 --> 00:02:49,080
So there are now completely separate objects.

34
00:02:49,080 --> 00:02:53,400
So we're starting this lecture off with a quick little exercise just to kind of get you

35
00:02:53,400 --> 00:02:58,000
to remember what we did last time and to practice writing a little bit of code with mutable

36
00:02:58,000 --> 00:03:00,600
function or with mutable objects.

37
00:03:00,600 --> 00:03:05,120
So I would like you to write this function called remove all.

38
00:03:05,120 --> 00:03:08,200
This is going to feel very similar to something we did last lecture.

39
00:03:08,200 --> 00:03:12,600
So last lecture I asked you to write a similar function which took in a list L and an element

40
00:03:12,599 --> 00:03:20,359
E. And that function from last lecture created a new list and then basically populated that

41
00:03:20,359 --> 00:03:26,439
new list with all the elements from, it had all the same elements as L except for omitting

42
00:03:26,439 --> 00:03:29,840
the ones that were equal to E.

43
00:03:29,840 --> 00:03:34,400
This version that I would like you to write for me is not going to create a new list and

44
00:03:34,400 --> 00:03:36,479
return this new list.

45
00:03:36,479 --> 00:03:45,199
It will mutate my input L such that you're going to only keep the elements from L that

46
00:03:45,199 --> 00:03:51,879
do not match E. So I'm going to give you a hint for how to do this.

47
00:03:51,879 --> 00:03:58,479
So the process for this is going to make use of this thing that we just saw which is I want

48
00:03:58,479 --> 00:04:02,639
you to first save the list as is into a copy.

49
00:04:02,639 --> 00:04:07,959
And then at the end of last lecture we saw a way for us to mutate a list to empty it out

50
00:04:07,959 --> 00:04:09,159
of all the elements.

51
00:04:09,159 --> 00:04:13,359
So we still have that object in memory but we're just essentially clearing it out.

52
00:04:13,359 --> 00:04:15,479
We remove all the elements from it.

53
00:04:15,479 --> 00:04:18,360
So first make a copy and save the elements.

54
00:04:18,360 --> 00:04:26,719
Then clear the list we want to mutate L and then iterate through the copy and add all

55
00:04:26,719 --> 00:04:30,560
of the elements that do not equal E back into L.

56
00:04:30,560 --> 00:04:32,000
So that should be the process.

57
00:04:32,000 --> 00:04:37,639
And in the end when we call this remove all function the thing that we're passing in will

58
00:04:37,639 --> 00:04:41,399
have been mutated we don't have anything to return.

59
00:04:41,399 --> 00:04:44,600
We're just mutating the thing that's being passed in.

60
00:04:44,600 --> 00:04:49,160
So I'll give you a couple of minutes to work on that and you can start writing it on

61
00:04:49,160 --> 00:04:54,160
around line 30.

62
00:04:54,160 --> 00:04:57,040
Okay.

63
00:04:57,040 --> 00:05:00,240
Does anyone have some code to start with?

64
00:05:00,240 --> 00:05:01,240
Yes.

65
00:05:01,240 --> 00:05:02,240
Yeah.

66
00:05:02,240 --> 00:05:05,439
Initialize a new list.

67
00:05:05,439 --> 00:05:07,720
Yep.

68
00:05:07,720 --> 00:05:08,720
What do you want to call it?

69
00:05:08,720 --> 00:05:09,720
L new.

70
00:05:09,720 --> 00:05:10,720
Good name.

71
00:05:10,720 --> 00:05:11,720
L new equals.

72
00:05:11,720 --> 00:05:16,200
How do we make a copy and what do we copy?

73
00:05:16,200 --> 00:05:25,960
So what we'd like to do is mutate L. Right?

74
00:05:25,959 --> 00:05:30,039
But L already contains a bunch of items in it.

75
00:05:30,039 --> 00:05:33,079
So that's why we first want to make a copy of it.

76
00:05:33,079 --> 00:05:36,279
So just like in the syntax from the slides.

77
00:05:36,279 --> 00:05:41,560
This will essentially save for us everything that we already have in L in a new list called

78
00:05:41,560 --> 00:05:43,560
L new.

79
00:05:43,560 --> 00:05:44,560
Okay.

80
00:05:44,560 --> 00:05:47,159
So now that we have that does anyone.

81
00:05:47,159 --> 00:05:48,159
Yeah.

82
00:05:48,160 --> 00:05:55,680
So L dot clear does not take a parameter in.

83
00:05:55,680 --> 00:05:58,760
It's just a function that empties out L fully.

84
00:05:58,760 --> 00:06:02,760
So it'll basically drop every single element in L. Okay.

85
00:06:02,760 --> 00:06:07,760
But we will see some function that will remove elements.

86
00:06:07,760 --> 00:06:14,040
So if we do L dot clear, then L becomes the empty list.

87
00:06:14,040 --> 00:06:15,720
L just becomes this.

88
00:06:15,720 --> 00:06:20,760
So now that I've mutated my object to contain none of my elements in it, how do I add back

89
00:06:20,760 --> 00:06:25,720
in the elements that satisfy the condition?

90
00:06:25,720 --> 00:06:32,760
Yeah.

91
00:06:32,760 --> 00:06:36,400
So for N in L new, right?

92
00:06:36,400 --> 00:06:39,920
So I'm iterating over the list that actually contains stuff.

93
00:06:39,920 --> 00:06:43,000
The thing I've copied.

94
00:06:43,000 --> 00:06:47,959
And then you can see like if you have not even been in your appendix account.

95
00:06:47,959 --> 00:06:48,959
Yeah, exactly.

96
00:06:48,959 --> 00:06:49,959
L dot append.

97
00:06:49,959 --> 00:06:59,240
So notice I am, yeah, E. I am appending to L, but I'm iterating over L new.

98
00:06:59,240 --> 00:07:01,040
L new has all of these elements in it.

99
00:07:01,040 --> 00:07:04,279
I want to touch each element to see what value it has.

100
00:07:04,279 --> 00:07:10,079
If it's not equal to the one from the parameter E, then I add it to my list L.

101
00:07:10,079 --> 00:07:12,279
The one that's currently empty.

102
00:07:12,839 --> 00:07:18,079
And then do I need to return anything?

103
00:07:18,079 --> 00:07:23,879
We don't need to return, it won't hurt to return L, but L will already be mutated by virtue

104
00:07:23,879 --> 00:07:25,599
of this function.

105
00:07:25,599 --> 00:07:28,719
So we don't need to return any L.

106
00:07:28,719 --> 00:07:28,919
Right?

107
00:07:28,919 --> 00:07:31,759
L is my parameter that I've passed in.

108
00:07:31,759 --> 00:07:33,119
So there's nothing to return.

109
00:07:33,119 --> 00:07:38,839
It's just being mutated in the function.

110
00:07:38,839 --> 00:07:41,959
So when I make my function call here, right?

111
00:07:41,959 --> 00:07:43,599
I'm passing an L in.

112
00:07:43,599 --> 00:07:51,439
I'm just making a call to remove all with this L in object, which is this one here.

113
00:07:51,439 --> 00:07:56,079
And notice there's no, I'm not saving the return from this function to anything, right?

114
00:07:56,079 --> 00:08:00,359
Because this function will just mutate whatever I passed in.

115
00:08:00,359 --> 00:08:06,560
And then if I just print the value of L in after this function call, it'll print the mutated

116
00:08:06,560 --> 00:08:07,560
value.

117
00:08:07,560 --> 00:08:14,800
Yes, sorry, we should append N, not E. Thank you.

118
00:08:14,800 --> 00:08:17,000
Yep, and that looked weird.

119
00:08:17,000 --> 00:08:18,519
Perfect.

120
00:08:18,519 --> 00:08:24,920
And so if I run the other two examples, here I'm removing one, so it should just show me

121
00:08:24,920 --> 00:08:26,920
a list with all twos.

122
00:08:26,920 --> 00:08:29,680
And here I'm removing zero.

123
00:08:29,680 --> 00:08:37,360
And zero doesn't even exist, so it doesn't mutate that input list at all.

124
00:08:37,360 --> 00:08:39,800
Okay.

125
00:08:39,800 --> 00:08:46,919
So now we can start talking about other operations on lists, which deal with removing lists, making

126
00:08:46,919 --> 00:08:48,560
the lists smaller.

127
00:08:48,560 --> 00:08:52,320
So we're actually going to take elements away from the list.

128
00:08:52,320 --> 00:08:58,800
And this is similar to kind of what the suggestion was, instead of kind of to clear out an element,

129
00:08:58,800 --> 00:09:00,440
a specific element, right?

130
00:09:00,440 --> 00:09:02,680
But the clear function removes all the elements.

131
00:09:02,680 --> 00:09:06,800
However, these functions will remove certain elements from our lists.

132
00:09:06,799 --> 00:09:09,679
So there's three different ways that are on this slide.

133
00:09:09,679 --> 00:09:14,039
And I'm going to show you an example with this list L, and I'm showcasing what each one

134
00:09:14,039 --> 00:09:15,039
of these functions do.

135
00:09:15,039 --> 00:09:17,039
But first, I'll just explain them.

136
00:09:17,039 --> 00:09:21,919
So one option for removing an item from a list is if you know the index of the item you

137
00:09:21,919 --> 00:09:25,359
want to remove, like you want to remove the very first one in the list, or the last one

138
00:09:25,359 --> 00:09:30,000
in the list, or the halfway point, or something like that, you can tell Python to remove the

139
00:09:30,000 --> 00:09:35,679
item from list L at a particular index with this del parenthesis.

140
00:09:35,679 --> 00:09:42,639
So this function del, and you pass in L at whatever index you want to remove.

141
00:09:42,639 --> 00:09:47,839
Now sometimes you want to remove the item all the way at the end of the list.

142
00:09:47,839 --> 00:09:49,839
So the farthest, most right.

143
00:09:49,839 --> 00:09:56,399
In that case, there's an operation called pop, and you call pop on list L. So if you just

144
00:09:56,399 --> 00:10:01,319
say L dot pop with nothing in the parentheses, Python will automatically grab that last value

145
00:10:01,319 --> 00:10:04,959
from the list and drop it from the list.

146
00:10:04,960 --> 00:10:10,840
Now pop is a little bit interesting because it has a return value.

147
00:10:10,840 --> 00:10:16,040
We're using this dot notation, which we used with append and clear and a bunch of other

148
00:10:16,040 --> 00:10:17,200
things from last lecture.

149
00:10:17,200 --> 00:10:22,840
But here, this pop not only does it have the side effect of mutating my list by dropping

150
00:10:22,840 --> 00:10:26,120
the last element from it, but it also returns something.

151
00:10:26,120 --> 00:10:32,320
So this function call here will return for me the value of the element that got dropped,

152
00:10:32,320 --> 00:10:37,080
just in case you want to do something with it.

153
00:10:37,080 --> 00:10:41,320
And lastly, if you know the element you'd like to remove specifically, so if you have a

154
00:10:41,320 --> 00:10:45,920
list of a bunch of names and you want to remove Anna from that list and you know the string

155
00:10:45,920 --> 00:10:51,480
ANA is what you'd like to remove, you do that using the function L dot remove.

156
00:10:51,480 --> 00:10:56,120
So whatever list your names are part of, you say that list dot remove, and then you'd

157
00:10:56,120 --> 00:11:01,360
pass it in the string Anna or the number five or whatever actual element you'd like to

158
00:11:01,360 --> 00:11:02,360
remove.

159
00:11:02,360 --> 00:11:09,480
Now, if there are many elements that match that value, right, if there's many Anna's in

160
00:11:09,480 --> 00:11:13,360
my list of names, it will only remove the first one it finds.

161
00:11:13,360 --> 00:11:18,639
So from index zero, all the other ones will remain, you'll have to call that function again.

162
00:11:18,639 --> 00:11:20,120
So let's look at this example here.

163
00:11:20,120 --> 00:11:26,399
I've got this list of seven elements within it.

164
00:11:26,399 --> 00:11:29,639
Let's do a few of these operations all in a row.

165
00:11:29,639 --> 00:11:32,199
So each one of these operations will mutate my list.

166
00:11:32,199 --> 00:11:37,080
So the operation right after it will work on the mutated list.

167
00:11:37,080 --> 00:11:43,039
So let's start with this L. If we say L dot remove two, Python will look for the element

168
00:11:43,039 --> 00:11:44,600
whose value is two.

169
00:11:44,600 --> 00:11:46,039
Well, there it is.

170
00:11:46,039 --> 00:11:47,399
It's at the front of my list.

171
00:11:47,399 --> 00:11:48,639
That's fine.

172
00:11:48,639 --> 00:11:50,240
And Python will remove that element.

173
00:11:50,240 --> 00:11:54,519
So this list will now be one element less shorter, right?

174
00:11:54,519 --> 00:11:55,960
And that two is going to be gone.

175
00:11:55,960 --> 00:12:00,759
So the list L will now be mutated to be one, three, six, three, seven, zero.

176
00:12:00,759 --> 00:12:01,759
All right.

177
00:12:01,759 --> 00:12:04,440
Well, what if we remove three now, right?

178
00:12:04,440 --> 00:12:06,600
So we've done the operation to remove two.

179
00:12:06,600 --> 00:12:08,920
We've ended up with this mutated list.

180
00:12:08,920 --> 00:12:12,759
Now what if we remove three from this mutated list?

181
00:12:12,759 --> 00:12:15,440
There's two of them in there, right?

182
00:12:15,440 --> 00:12:19,000
The element that's going to be removed is the first one it finds.

183
00:12:19,000 --> 00:12:21,480
So just this one here.

184
00:12:21,480 --> 00:12:24,480
And again, this is an operation that mutates my list.

185
00:12:24,480 --> 00:12:32,320
So this list here that I've started with would be one less element shorter.

186
00:12:32,320 --> 00:12:33,840
And that three will have been removed, right?

187
00:12:33,840 --> 00:12:39,159
So now I've got one, six, three, seven, zero.

188
00:12:39,159 --> 00:12:39,680
All right.

189
00:12:39,680 --> 00:12:43,399
What if we want to delete an element at a particular index?

190
00:12:43,399 --> 00:12:48,240
So now again, we're working with the mutated list, one, six, three, seven, zero.

191
00:12:48,240 --> 00:12:54,440
This del function takes an index in a specific list and removes the element

192
00:12:54,480 --> 00:12:55,960
that is there.

193
00:12:55,960 --> 00:12:59,440
So in this case, I want to remove the element at index one.

194
00:12:59,440 --> 00:13:03,920
So in this list here, the element at index one is the six, right?

195
00:13:03,920 --> 00:13:05,640
This is zero, this is one.

196
00:13:05,640 --> 00:13:07,800
So the six will be removed.

197
00:13:07,800 --> 00:13:15,160
And my list will be mutated to just contain these four elements, one, three, seven, and zero.

198
00:13:15,160 --> 00:13:22,720
And lastly, if we pop, that function will just remove the element at the end of the list.

199
00:13:22,720 --> 00:13:25,600
The element at the end of the list is this zero.

200
00:13:25,600 --> 00:13:33,360
So the list through this side effect of pop, right, is going to be mutated to contain just the three elements,

201
00:13:33,360 --> 00:13:35,279
except for the last one.

202
00:13:35,279 --> 00:13:37,639
So contain one, three, and seven.

203
00:13:37,639 --> 00:13:44,320
And additionally, if I'd like to save the value of the element that got removed from the end of the list,

204
00:13:44,320 --> 00:13:50,320
the zero, you can, because this function called here, l.pop,

205
00:13:50,320 --> 00:13:55,960
you can save the return value into a variable.

206
00:13:55,960 --> 00:14:01,760
None of the other ones, del, or remove, have any return, right?

207
00:14:01,760 --> 00:14:06,960
So if you saved a variable from that function, the function called to a variable,

208
00:14:06,960 --> 00:14:08,840
that variable will be none.

209
00:14:08,840 --> 00:14:14,320
Pop is special because it actually grabs that variable value and returns it.

210
00:14:16,320 --> 00:14:19,680
So all of these operations mutate the list, right?

211
00:14:19,679 --> 00:14:24,959
So that means as we did operation after operation, we were working with the mutated list.

212
00:14:27,239 --> 00:14:28,559
Okay.

213
00:14:28,559 --> 00:14:30,079
Yes, there was a question.

214
00:14:30,079 --> 00:14:35,359
Yeah, it's coming out one, the proof of the last one.

215
00:14:35,359 --> 00:14:36,239
I'm sorry, say again.

216
00:14:36,239 --> 00:14:38,919
Like in the third one, it's like, it's like, it's going to be element.

217
00:14:38,919 --> 00:14:40,399
L at index one.

218
00:14:40,399 --> 00:14:44,399
Yeah, so the L at index one here works on the list we had just mutated.

219
00:14:44,399 --> 00:14:47,919
So this one, the element at index one is the six.

220
00:14:47,919 --> 00:14:48,599
Oh, yeah.

221
00:14:49,040 --> 00:14:49,879
No worries.

222
00:14:51,879 --> 00:14:57,879
Okay, so let's look at the code we just wrote in the UTIAN exercise and try to rewrite it using this remove operation.

223
00:14:59,000 --> 00:15:05,399
Well, the way we can think of it is we'd like to remove the element that is e, right?

224
00:15:05,399 --> 00:15:08,440
So we know the value of the element we'd like to remove.

225
00:15:08,440 --> 00:15:11,680
It's three or five or one or two or whatever.

226
00:15:11,680 --> 00:15:17,240
So that's e and we know of an operation that can remove the element from the list.

227
00:15:17,240 --> 00:15:20,000
It's called remove unsurprisingly.

228
00:15:20,000 --> 00:15:24,840
So what we can do is we can say L dot remove e, right?

229
00:15:24,840 --> 00:15:27,480
And that would remove the first instance of the element in the list.

230
00:15:27,480 --> 00:15:31,639
But I might have many of these elements in my list.

231
00:15:31,639 --> 00:15:35,320
So we can just write a little while loop around this operation.

232
00:15:35,320 --> 00:15:40,279
And we say while we still have this value in our list, remove it.

233
00:15:42,279 --> 00:15:44,159
So that's what this while loop is doing.

234
00:15:44,159 --> 00:15:46,680
E and L is going to be their true or false.

235
00:15:46,679 --> 00:15:50,279
Whether the number five or whatever is in my list.

236
00:15:50,279 --> 00:15:56,679
And as long as I still have a five in my list, call L dot remove on five or whatever is.

237
00:15:58,959 --> 00:16:03,719
So a nice little two liner here to solve the same problem.

238
00:16:05,879 --> 00:16:10,759
Now, what if we rewrote that code in a slightly different way, again using remove,

239
00:16:10,759 --> 00:16:13,759
but let's say maybe we didn't realize we could use a while loop.

240
00:16:13,759 --> 00:16:18,679
And instead we used a for loop to iterate over each element in L.

241
00:16:18,679 --> 00:16:22,319
And if that element is equal to e, remove it.

242
00:16:24,399 --> 00:16:25,279
Seems reasonable.

243
00:16:26,319 --> 00:16:28,600
So what would happen?

244
00:16:28,600 --> 00:16:31,360
And I can run it for you guys.

245
00:16:31,360 --> 00:16:36,639
So if we run it with this code here, this is the one from the slides.

246
00:16:38,879 --> 00:16:41,559
Just to show you that I'm not making it up.

247
00:16:41,559 --> 00:16:43,559
So if this is the code that we wrote,

248
00:16:43,559 --> 00:16:46,279
I tried to remove the two from the list.

249
00:16:46,279 --> 00:16:50,919
And when I printed the result, it actually printed one comma two.

250
00:16:50,919 --> 00:16:54,239
So I have two elements left in my list.

251
00:16:54,239 --> 00:16:57,559
It looks like it didn't correctly remove a two.

252
00:17:03,239 --> 00:17:09,440
And at first, it's surprising why this is right because the code seems to,

253
00:17:09,440 --> 00:17:10,240
it looks right.

254
00:17:10,240 --> 00:17:12,399
It seems to work just fine.

255
00:17:12,400 --> 00:17:17,960
But let's step through this memory diagram and see exactly what happens step by step.

256
00:17:17,960 --> 00:17:20,080
So with each iteration of our for loop.

257
00:17:21,600 --> 00:17:25,560
So originally, I've got L containing one, two, two, two.

258
00:17:25,560 --> 00:17:26,480
So far so good.

259
00:17:26,480 --> 00:17:29,040
That's just us doing this line here.

260
00:17:29,040 --> 00:17:31,680
And then I make a function called to remove all.

261
00:17:31,680 --> 00:17:34,000
So I want to remove the number two from my list.

262
00:17:35,920 --> 00:17:39,560
I've got a for loop where my loop variable is called LM.

263
00:17:39,559 --> 00:17:44,759
And it will iterate through each element in my sequence,

264
00:17:44,759 --> 00:17:47,960
where my sequence is all the elements in L.

265
00:17:47,960 --> 00:17:54,519
So first it'll be one, then it'll be the next value in a sequence two and then two and then two.

266
00:17:54,519 --> 00:17:58,399
So here, I've just got LM initialized to the first value in the sequence.

267
00:17:58,399 --> 00:18:02,200
If LM equal E, well, the one does not equal the two.

268
00:18:02,200 --> 00:18:04,279
So then we do not remove anything.

269
00:18:05,399 --> 00:18:09,079
Next, the for loop goes on to the next value in my sequence, the two.

270
00:18:10,039 --> 00:18:12,599
So now LM is two.

271
00:18:12,599 --> 00:18:19,039
And if LM equal to, it does equal to, what am I going to do?

272
00:18:19,039 --> 00:18:21,839
Well, I need to do L dot remove E.

273
00:18:21,839 --> 00:18:25,720
So this is where bad things happen.

274
00:18:25,720 --> 00:18:28,759
I'm going to remove an element from my list.

275
00:18:28,759 --> 00:18:30,799
So I still have those three twos in there.

276
00:18:30,799 --> 00:18:35,759
But as soon as I drop one of the twos, all the elements beyond that two,

277
00:18:35,759 --> 00:18:36,679
shift over.

278
00:18:40,119 --> 00:18:44,519
But Python doesn't know that it should also shift over the pointer.

279
00:18:45,720 --> 00:18:50,240
It's still pointing to that element that it's currently at.

280
00:18:50,240 --> 00:18:53,720
It's not going to shift itself backward just because you removed an element.

281
00:18:54,919 --> 00:19:02,480
And so Python just finished removing the element and now it says I finished this loop through.

282
00:19:02,480 --> 00:19:08,440
So I need to go back up here and make element be the next value in my sequence, the next two.

283
00:19:09,639 --> 00:19:14,759
So I've essentially skipped over one thing that I needed to remove

284
00:19:14,759 --> 00:19:19,720
because when I remove the item, everything else shifted over as well.

285
00:19:19,720 --> 00:19:21,799
But my pointer didn't decrement.

286
00:19:24,279 --> 00:19:25,639
So this is a big problem.

287
00:19:25,639 --> 00:19:30,200
I mean, we can finish off here, but we've already seen the problem.

288
00:19:31,200 --> 00:19:36,240
The last time through the loop, Python sees well, is this two equal to the thing I want to remove?

289
00:19:36,240 --> 00:19:37,000
It is.

290
00:19:37,000 --> 00:19:37,879
So it removes it.

291
00:19:38,840 --> 00:19:39,880
And this is the end.

292
00:19:39,880 --> 00:19:45,960
It has no more values left to go through in the sequence because it's already, its pointer is already out of the bounds.

293
00:19:49,240 --> 00:19:50,680
Is everyone okay with that issue?

294
00:19:51,960 --> 00:19:59,080
So the problem here with remove is that we're iterating over a list as we're mutating it.

295
00:19:59,080 --> 00:19:59,560
Right?

296
00:19:59,560 --> 00:20:03,480
And so removing these items can cause unpredictable behavior.

297
00:20:03,480 --> 00:20:07,720
Something like this could still happen if we were adding items.

298
00:20:07,720 --> 00:20:12,120
It's to accept that we're usually adding items to the end of the list, right, with a pen.

299
00:20:12,120 --> 00:20:17,480
If we were adding items somewhere in the middle or somewhere around where our pointer is supposed to be,

300
00:20:18,200 --> 00:20:23,799
I think we could theoretically run into the same issue when we're adding items, where we might skip elements,

301
00:20:23,799 --> 00:20:25,559
or we might see an element twice.

302
00:20:26,360 --> 00:20:28,680
It's just more apparent when we're removing items.

303
00:20:31,160 --> 00:20:34,600
So this is the big thing that we're going to talk about in this lecture.

304
00:20:34,599 --> 00:20:36,279
So I'm going to go through another example.

305
00:20:36,279 --> 00:20:40,439
This is trick example number four, where we're going to do a very similar thing,

306
00:20:40,439 --> 00:20:46,759
but we're going to have a loop iterating over L's elements directly, just like we did,

307
00:20:47,719 --> 00:20:49,159
but doing a different task.

308
00:20:49,159 --> 00:20:51,799
Just so we're not doing that same remove all task.

309
00:20:53,639 --> 00:20:56,039
So let's look at a slightly different problem.

310
00:20:56,839 --> 00:21:00,199
This will be in the context of a function called remove duplicates.

311
00:21:00,680 --> 00:21:04,200
This function will take in two lists.

312
00:21:04,200 --> 00:21:09,000
So as an example here, I've got a list with 10, 20, 30, and 40 in it,

313
00:21:09,000 --> 00:21:11,720
and I've got another list with 10, 20, 50, and 60 in it.

314
00:21:12,840 --> 00:21:16,840
The purpose of this function is to mutate L1.

315
00:21:18,759 --> 00:21:28,279
And the way I want to mutate L1 is such that if an element in L1 is also in L2, I want to remove it.

316
00:21:28,279 --> 00:21:32,920
So the 10 and the 20 notice are common to L1 and L2.

317
00:21:32,920 --> 00:21:36,440
So I would like to remove the 10 and the 20 from L1.

318
00:21:37,399 --> 00:21:41,160
The 30 and the 40 stay because there's no 30 or 40 in L2.

319
00:21:44,119 --> 00:21:45,160
So that's our task.

320
00:21:45,799 --> 00:21:49,319
And this is the code that supposedly does this.

321
00:21:49,319 --> 00:21:52,440
So I've got a loop that goes through each element in L1,

322
00:21:52,440 --> 00:21:54,759
so 10, 20, 30, and 40.

323
00:21:55,559 --> 00:22:01,559
And I ask if the element is in L2, so here they are, there's two of them here,

324
00:22:01,559 --> 00:22:03,000
then remove it from L1.

325
00:22:04,039 --> 00:22:05,559
Very similar thing to what we just did.

326
00:22:07,079 --> 00:22:09,720
This code doesn't work because if we actually run it,

327
00:22:10,440 --> 00:22:17,000
the in the end Python will mutate L1 to contain the 20 and the 30 and the 40,

328
00:22:17,799 --> 00:22:20,440
whereas we only wanted to keep the 30 and the 40.

329
00:22:21,160 --> 00:22:24,279
Because the 20 also appeared in L2, so why in the world did we keep it?

330
00:22:25,640 --> 00:22:28,920
Well, we kept it because of the same issue that we just saw.

331
00:22:28,920 --> 00:22:33,720
We're mutating a list as we're iterating over it.

332
00:22:33,720 --> 00:22:37,799
And we're doing a removal, so we're again skipping over an element.

333
00:22:37,799 --> 00:22:41,079
So let's just step through this one, just to show you again what can happen.

334
00:22:41,079 --> 00:22:47,160
So here I've got 10, 20, 30, 40 for L1 and 10, 20, 50, 60 for L2.

335
00:22:48,119 --> 00:22:52,519
In my loop, my variable is E, so first it'll be 10.

336
00:22:53,400 --> 00:22:59,240
And we ask if 10 is in L2, that's true, remove it from L1.

337
00:22:59,240 --> 00:23:01,480
So you can see what's going to happen.

338
00:23:02,279 --> 00:23:06,119
My 10 is removed, everything else shifts over by 1,

339
00:23:06,119 --> 00:23:09,480
but my loop index is stays fixed.

340
00:23:12,039 --> 00:23:21,559
Next, Python says I'm going to increment my variable, E, to go to the next item in my sequence.

341
00:23:21,639 --> 00:23:23,240
So E becomes the 30.

342
00:23:24,200 --> 00:23:29,240
And already I've skipped over one element that I was interested in removing.

343
00:23:31,079 --> 00:23:35,879
So here when we're pointing to the 30, Python says, well, the 30 is not in L2,

344
00:23:35,879 --> 00:23:37,399
so we don't do anything.

345
00:23:37,399 --> 00:23:41,559
And then it points to the 40, the 40 is not in L2, so we don't do anything.

346
00:23:41,559 --> 00:23:43,079
And then the code is done.

347
00:23:43,079 --> 00:23:48,839
And we've erroneously finished with mutating L1 to just be the 20, 30, and the 40.

348
00:23:49,319 --> 00:23:58,359
Okay. So let's try to rewrite the code to actually work by using copies.

349
00:23:59,319 --> 00:24:02,199
So we certainly could use the same trick we did previous,

350
00:24:02,839 --> 00:24:08,039
we had the first you tried exercise, where we could make a copy, clear L1,

351
00:24:08,039 --> 00:24:10,359
and then add the elements back.

352
00:24:10,359 --> 00:24:11,720
We could do that.

353
00:24:11,720 --> 00:24:16,039
But we can also do a slightly different version of that where again we make a copy.

354
00:24:16,039 --> 00:24:20,279
So here I've got L1 copy equals L1 square bracket colon.

355
00:24:21,799 --> 00:24:25,399
And then the key thing here is we're iterating over the copy, right?

356
00:24:27,399 --> 00:24:31,319
So if we iterate over the copy, we're not going to mutate the copy,

357
00:24:31,319 --> 00:24:32,759
but we will mutate L1.

358
00:24:33,399 --> 00:24:40,920
So for the for loop variable goes over the copy, but the removal is done from L1.

359
00:24:41,880 --> 00:24:45,880
So to visualize that, this is what happens.

360
00:24:45,880 --> 00:24:47,960
So I've got L1 and L2 as before.

361
00:24:48,840 --> 00:24:55,160
So when I make my function call here, I have L1 copy equals L1 square bracket colon.

362
00:24:55,160 --> 00:25:00,200
So this makes for me a new variable inside memory, which is an exact duplicate

363
00:25:00,200 --> 00:25:02,360
copy or clone of L1.

364
00:25:04,279 --> 00:25:07,320
Okay. So every one of my elements is now saved.

365
00:25:07,879 --> 00:25:13,960
So I can do whatever I'd like to L1 and know that I can still have a way to iterate

366
00:25:13,960 --> 00:25:17,079
and look at each variable from the original L1.

367
00:25:19,559 --> 00:25:25,399
So now my loop variable E goes over elements in L1 copy.

368
00:25:28,599 --> 00:25:32,359
So first we look at the 10 and I say if the 10 is in L2, it is

369
00:25:33,079 --> 00:25:34,279
remove it from L1.

370
00:25:34,279 --> 00:25:39,159
So notice I have just mutated L1 not the copy to be one element less.

371
00:25:41,559 --> 00:25:45,079
Then the loop variable E goes to the next value in my sequence.

372
00:25:45,079 --> 00:25:48,679
So I'm not skipping anything here because I didn't mutate L1 copy.

373
00:25:48,679 --> 00:25:51,639
So now we look at the 20 correctly this time, right?

374
00:25:52,519 --> 00:25:54,439
So now we ask is the 20 in L2?

375
00:25:55,079 --> 00:25:56,919
It is. So we remove it from L1.

376
00:25:57,799 --> 00:26:00,119
And then the 30 and the 40, we do nothing.

377
00:26:02,839 --> 00:26:04,519
Questions about this.

378
00:26:04,519 --> 00:26:07,000
Is this okay? Is this too fast? Is this too slow?

379
00:26:12,439 --> 00:26:23,959
Okay. So that's using copies or aka clones to help you keep track of values in an original list

380
00:26:23,959 --> 00:26:27,399
without overriding them or without removing them accidentally.

381
00:26:27,959 --> 00:26:32,119
Now I want to talk about aliases because this is a very important topic

382
00:26:32,119 --> 00:26:34,039
when we have these mutable data structures.

383
00:26:34,839 --> 00:26:39,079
So let's do a quick overview of what an aliases.

384
00:26:39,079 --> 00:26:42,839
So we think about city for example Boston.

385
00:26:43,559 --> 00:26:47,879
An aliase for Boston is basically any other name that refers to the same city,

386
00:26:47,879 --> 00:26:49,399
right? The same object.

387
00:26:49,879 --> 00:26:53,879
So Boston also known as the Haber being town or Athens of America.

388
00:26:54,919 --> 00:26:58,439
All of these names refer to the same inherent city, right?

389
00:26:58,519 --> 00:27:01,559
So if I say Boston is small in tech savvy,

390
00:27:02,279 --> 00:27:07,480
then those two attributes or properties refer to this object itself, right?

391
00:27:07,480 --> 00:27:12,759
The city. So the hub is small in tech savvy or being town is small in tech savvy, right?

392
00:27:12,759 --> 00:27:18,039
It doesn't matter what I refer, what name I refer to this object as.

393
00:27:18,039 --> 00:27:20,680
It's the same set of properties still apply to it.

394
00:27:21,480 --> 00:27:26,440
And so if I add an attribute or if I take away an attribute through one of these aliases,

395
00:27:26,440 --> 00:27:31,400
through one of these names, well, if it's suddenly snowing in Boston,

396
00:27:31,400 --> 00:27:34,680
then yes, it's snowing in the hub or it's snowing in being town, right?

397
00:27:34,680 --> 00:27:38,039
Because these are just names for the same object.

398
00:27:38,600 --> 00:27:45,480
And so that idea is also something that comes up when we deal with these mutable objects.

399
00:27:47,720 --> 00:27:52,519
If you don't explicitly tell Python, you'd like to make a copy of a list,

400
00:27:52,599 --> 00:28:00,039
and you just use the equal sign between a mutable object and another name for this mutable object,

401
00:28:00,839 --> 00:28:04,279
then Python only creates an alias for that object.

402
00:28:05,240 --> 00:28:09,079
So notice we had to say explicitly I want to make a copy with the square brackets colon.

403
00:28:10,039 --> 00:28:14,519
If we write code that looks like this, so here the only difference I've done,

404
00:28:15,400 --> 00:28:17,079
so the code on the right is the one that worked.

405
00:28:17,079 --> 00:28:21,240
The code on the left is me not making a copy of my L1.

406
00:28:21,240 --> 00:28:24,279
I'm only using the equal sign directly.

407
00:28:26,519 --> 00:28:29,880
And in Python using this assignment operator, the equal sign,

408
00:28:32,680 --> 00:28:37,960
means that you're making an alias for that same object in memory.

409
00:28:38,599 --> 00:28:41,960
So it's just another name to refer to that same object.

410
00:28:42,680 --> 00:28:44,599
If you mutate that object through L1,

411
00:28:45,319 --> 00:28:50,440
L1 copy will also have been mutated because it's pointing to the same object

412
00:28:50,440 --> 00:28:51,160
and vice versa.

413
00:28:52,120 --> 00:28:59,320
So really, this particular code on the left here is not any better than saying for E in L1

414
00:28:59,320 --> 00:29:03,080
because L1 copy is pointing to the exact same object in memory.

415
00:29:04,600 --> 00:29:11,960
So let me show you exactly what this means and the Cloud diagram that we've been doing.

416
00:29:13,240 --> 00:29:17,480
So this is the code that creates an alias, not a copy.

417
00:29:18,039 --> 00:29:23,559
So I've got L1 equals 10, 20, 30, 40, L2 is 10, 20, 50, 60, just like before.

418
00:29:25,160 --> 00:29:31,240
The code up here, so L1 copy equals L1, I just named it copy, but it's not actually making a copy.

419
00:29:31,240 --> 00:29:35,960
Right? Because I know where did I say explicitly to make a copy using the square brackets colon.

420
00:29:36,759 --> 00:29:44,279
So the alias in memory means that it's just another name pointing to that exact same object.

421
00:29:45,240 --> 00:29:53,480
Okay? So then the for loop for E in L1 copy is iterating through this object here,

422
00:29:53,480 --> 00:29:56,759
which is being pointed to by L1 copy and L1.

423
00:29:57,720 --> 00:30:02,440
Okay? So if I'm iterating through and removing elements as I'm doing so,

424
00:30:02,680 --> 00:30:07,240
this is just the original buggy code that we had that iterated through L1.

425
00:30:07,720 --> 00:30:11,319
Right? So I'm removing the 10, incrementing the element,

426
00:30:11,960 --> 00:30:18,279
the E variable to the next element, and then not doing anything with the 30 and not doing anything with the 40.

427
00:30:20,519 --> 00:30:22,759
Does that make sense? Alias is? Is that all right?

428
00:30:24,519 --> 00:30:30,200
Okay. So the big idea that we'll kind of tie a couple things together

429
00:30:31,799 --> 00:30:35,639
is related to functions, formal parameters and actual parameters.

430
00:30:36,600 --> 00:30:45,240
So when we make a function definition, right, the things inside the parameters inside the function definition

431
00:30:45,240 --> 00:30:49,080
are called formal parameters, right? We're just writing the function assuming that these will

432
00:30:49,080 --> 00:30:54,440
eventually get some actual values associated with them. When we make a function call,

433
00:30:54,440 --> 00:31:01,000
that's when we pass actual values. And when we have mutable objects being passed into a function,

434
00:31:01,000 --> 00:31:09,000
the formal parameter actually becomes an alias for the actual parameter in the function call.

435
00:31:10,119 --> 00:31:16,920
So here's our function once again. The difference between what we've been seeing so far,

436
00:31:16,920 --> 00:31:23,000
this is the code that we had just seen, the difference that I've done in this particular code is not

437
00:31:23,000 --> 00:31:29,000
name this L1 and L2 like it was named up here, right? Because it doesn't have to be named L1 and L2.

438
00:31:29,799 --> 00:31:37,559
I named it L-A and L-B. And this will sort of bring the point home. So when I make my function call to

439
00:31:37,559 --> 00:31:45,000
remove duplicates with L-A and L-B, Python takes this object and this object and passes them in as

440
00:31:45,000 --> 00:31:52,680
parameters. So in my memory diagram, I've got L-A is 1020, 3040 and L-B 1020, 5060, right? That's what I

441
00:31:52,680 --> 00:32:00,360
have down here. As soon as I make my function call, remember Python maps out, right? Formal parameters

442
00:32:00,360 --> 00:32:08,039
to actual parameters. But when we're dealing with these mutable objects, L1 and L2 are aliases

443
00:32:08,840 --> 00:32:20,039
for the things being passed in. So L1 will point to, you tell me. Yes, exactly. So here, I've got

444
00:32:20,039 --> 00:32:27,960
the same name for the same object and L2 will point to L-B, right? Two different names pointing to

445
00:32:27,960 --> 00:32:34,680
the same object. And that's why when I'm iterating through and doing whatever I am doing to these

446
00:32:35,240 --> 00:32:43,799
formal parameters here, Python actually mutates the objects that were passed in. Yes.

447
00:32:52,600 --> 00:33:01,160
L-A and L1 will have the same IDs. Yeah, yeah, exactly. Yeah, using the ID function we did last time.

448
00:33:01,160 --> 00:33:07,640
Exactly. I invite you to try it too. But I think they should because they're modifying the same

449
00:33:07,640 --> 00:33:15,480
object. Everyone okay so far? Two names aliases for that same object. And so that's why when we're

450
00:33:15,480 --> 00:33:22,519
mutating L1 here, this L-A and L-B that we passed in will be mutated, right? So here's my L1 copy as

451
00:33:22,519 --> 00:33:28,200
well. So I've got three names for this particular object. And then we do the thing where we mutate

452
00:33:28,200 --> 00:33:35,000
the thing, right? And then at the end of the function, when it's done, this entire thing has no

453
00:33:35,000 --> 00:33:43,640
return, it returns none. But when we print L-A, the thing we're printing is this object here. It's

454
00:33:43,640 --> 00:33:55,319
whatever L-A points to. And it's this thing that was mutated through L1. Yes, no, thumbs up, thumbs down.

455
00:33:55,319 --> 00:34:05,879
Is it good? This is very cool, you guys. Okay, this was a nice loosen to tie up. Okay, so the last

456
00:34:06,599 --> 00:34:16,199
10 minutes, I want to talk about what happens when we have lists that contain lists themselves,

457
00:34:16,199 --> 00:34:22,360
right? So so far the examples we've been working with are lists that just contain, you know,

458
00:34:22,360 --> 00:34:29,720
strings or integers or things that are immutable. But what exactly happens behind the scenes when we

459
00:34:29,720 --> 00:34:38,680
have elements that are mutable themselves? So we're going to do an example. We're going to go through

460
00:34:38,680 --> 00:34:44,840
in a lot of in all of these slides, working through an example where we start out with this old list

461
00:34:44,840 --> 00:34:52,280
that looks something like this. So we have a list that contains three elements, right? The first one

462
00:34:52,280 --> 00:35:00,120
is another list, the second is another list, and the third is another list. I don't care what elements

463
00:35:00,120 --> 00:35:08,200
those lists have for now. All I know is at the top level, old list contains three things. Okay, so

464
00:35:08,200 --> 00:35:14,039
let's do aliasing and then we'll do a shallow copy of this list and then we'll do a deep copy of

465
00:35:14,039 --> 00:35:20,039
this list and show you what happens. So in this example, what we're going to do is just to straight

466
00:35:20,039 --> 00:35:27,480
up alias of old list. So we're going to make old list and new list be aliases for the exact same

467
00:35:27,480 --> 00:35:36,039
object this thing here. So I do that with just the plain old assignment operator. So inside memory,

468
00:35:36,039 --> 00:35:40,840
the way we're going to represent this old list is here is by list with three elements in it,

469
00:35:40,840 --> 00:35:47,880
and because each element is itself a list, so a mutable object, I'm not going to plop it in here,

470
00:35:48,840 --> 00:35:55,640
but instead Python generally tends to make a pointer to that mutable object somewhere else in memory.

471
00:35:57,079 --> 00:36:01,960
You'll see why in a couple slides. But for now, I mean, it will, it will look cluttered if I did so,

472
00:36:01,960 --> 00:36:07,400
but for now it helps to visualize the structure. So old list contains three elements,

473
00:36:07,400 --> 00:36:13,320
and each one of those elements are kind of pointed to over here. So if I say new list equals old list,

474
00:36:13,320 --> 00:36:20,599
Python will make another name for the same thing in memory. When I do this line here where I index

475
00:36:20,599 --> 00:36:28,920
new list at index two, so that's zero, one, two, and then I follow it to index one over here, right?

476
00:36:28,920 --> 00:36:38,360
So this guy here, the six, I have changed the string food to be six, and now new list and old list

477
00:36:38,360 --> 00:36:44,440
both are pointing to the same object, so it will have been mutated to contain that six in that

478
00:36:44,440 --> 00:36:56,200
sum list. Okay, so that's aliasing. Now what we can do is we can create copies of mutable objects,

479
00:36:56,199 --> 00:37:02,519
and we can create either something called a shallow copy or a deep copy. The shallow copy is

480
00:37:02,519 --> 00:37:08,839
equivalent to what we've been doing with the square brackets colon, and that's perfectly okay if

481
00:37:08,839 --> 00:37:16,919
we're dealing with lists that just contain immutable things. But as soon as we create a shallow copy

482
00:37:16,919 --> 00:37:23,719
of a list that can contain other lists or other mutable things, interesting things happen. Only the

483
00:37:23,719 --> 00:37:31,639
top level gets copied, but anything that's mutable at a deeper level than that top level does not

484
00:37:31,639 --> 00:37:37,079
get copied. Okay, because if it did and you had many, many levels deep of all these mutable things,

485
00:37:37,079 --> 00:37:43,159
that would be a lot of things for Python to copy. Okay, so what we're doing with this particular code

486
00:37:43,159 --> 00:37:48,679
is we're going to create this old list here, so it's one, two, as first element, three, four,

487
00:37:48,679 --> 00:37:54,039
as a second element, and five, six as the last element. We're going to create something called a

488
00:37:54,039 --> 00:37:59,079
shallow copy, and we could have also said old lists square brackets colon, it would be equivalent.

489
00:38:00,199 --> 00:38:09,079
And in this shallow copy, Python only creates a copy of the top level. So notice new list is pointing

490
00:38:09,079 --> 00:38:17,719
to a list with three elements in it, but anything that's at a deeper level than that top level does

491
00:38:17,719 --> 00:38:24,199
not get copied. So all these mutable things that are my elements, this list and this list and

492
00:38:24,199 --> 00:38:31,559
this list, these are three mutable elements, they do not get their own copies because we've only made a

493
00:38:31,559 --> 00:38:41,719
shallow copy. So what this means is at the top level, sorry, so this is just what it prints out.

494
00:38:42,679 --> 00:38:49,559
So at the top level, we can add elements to old list and it won't interfere with the top level

495
00:38:49,559 --> 00:38:58,599
of new list. So as an example here, we're going to add this seven, eight list to old list.

496
00:38:59,879 --> 00:39:06,359
So we follow old list and we add another element to the end of it. Okay, so there it is,

497
00:39:06,360 --> 00:39:15,720
but that element didn't get added to new list, right, because we only added it to the top level of old list.

498
00:39:17,800 --> 00:39:23,880
So now question is, what happens if we go in and mutate one of these three shared items?

499
00:39:24,840 --> 00:39:30,920
So old list and new list is as we would expect. So let's do one more operation. So instead of

500
00:39:30,920 --> 00:39:36,440
a pending or in addition to a pending the seven and the eight, like we do over here, let's also

501
00:39:36,440 --> 00:39:42,119
mutate one of those shared items. So here it is, this is what we just did on the previous slide,

502
00:39:42,119 --> 00:39:48,519
there's my seven and eight. And now let's go into old list at index one, so zero one, that's this

503
00:39:48,519 --> 00:39:56,119
middle one here, and at index one in that, so that's zero one, the four over here, let's change the

504
00:39:56,119 --> 00:40:07,000
four to the nine. Okay, well when we print new list, we're going to be printing a list with three

505
00:40:07,000 --> 00:40:12,920
things in it. The first one is the list one, two, the second one is three, nine, we just mutated that.

506
00:40:13,559 --> 00:40:23,559
And the last one is five, six. And when we print old list, this one will also have that nine over

507
00:40:23,559 --> 00:40:31,239
there, because those middle elements are shared, but we will also have an extra element at the top

508
00:40:31,239 --> 00:40:41,880
level, the seven comma eight that we just added only to old list. Okay, thoughts on this example,

509
00:40:41,880 --> 00:40:55,720
what is confusing? Yeah. Yeah, why does the nine get added or get changed to the new list?

510
00:40:55,720 --> 00:41:04,440
Yeah, so the operation called copy from this library, which is also named copy, only creates a

511
00:41:04,440 --> 00:41:11,160
shallow copy of the list. So a shallow copy means that if you have a list with some elements within

512
00:41:11,159 --> 00:41:17,960
it, right? So here in this case, you know, we have those three elements in it. All you're doing is

513
00:41:17,960 --> 00:41:24,440
copying the top structure, right? So this structure here. But if you have any elements that are

514
00:41:24,440 --> 00:41:30,359
themselves mutable, they don't get their own copies. So really inside the memory, if this one is

515
00:41:30,359 --> 00:41:39,000
pointing to some object, like it does to that list one comma, one comma, two, the copy is also going

516
00:41:39,000 --> 00:41:47,639
to point to that same sub object, sub structure. And so if you're mutating this sub structure through

517
00:41:47,639 --> 00:41:54,199
one name, if you're accessing it through the other name, that other name is still accessing the

518
00:41:54,199 --> 00:42:01,719
thing that was mutated. Does that make sense? Is that okay? Yeah. And so this shallow copy is just

519
00:42:01,719 --> 00:42:07,400
copying the top structure here. So you can see at the top level, we have these two different lists.

520
00:42:07,400 --> 00:42:14,200
So that means to this one, I can add another item to the end of it, right? And that item will not be

521
00:42:14,200 --> 00:42:20,360
duplicated up here because this is one thing, this is one other thing. But the middle ones or any

522
00:42:20,360 --> 00:42:25,559
levels that are beyond that top level are shared. They're not copies. Yeah.

523
00:42:25,559 --> 00:42:33,000
So if you edited it through the new list, what is it in your troll? I get it wrong. Yes, yes, exactly.

524
00:42:33,000 --> 00:42:39,239
Great question. So if you edited, if we edited this number one here through the new list, then yeah,

525
00:42:39,239 --> 00:42:46,519
the old list will still see the edits because they're both pointing to these shared things. But if I

526
00:42:46,519 --> 00:42:54,519
edit the seven and eight, it will only be edited through old list because that seven eight is only seen

527
00:42:54,519 --> 00:43:03,159
by old list. Okay, that's basically what I've sent here. And so if you really, really,

528
00:43:03,159 --> 00:43:09,239
really want to copy every single mutable object or every single object at all the different levels,

529
00:43:09,239 --> 00:43:13,719
we would have to create something called a deep copy. So we do this using copy.deepcopy.

530
00:43:14,519 --> 00:43:21,400
Okay. And so this is exact same example except that we've just changed copy.copy to copy.deepcopy.

531
00:43:21,400 --> 00:43:28,039
And so here we've got our old list exactly as we had before. And if we deep copy old list,

532
00:43:28,039 --> 00:43:36,119
Python will make copies of every single object at every single level in, you know, from old list.

533
00:43:36,119 --> 00:43:42,920
So everything becomes its own object. So now if I mutate old list to pen seven and eight,

534
00:43:42,920 --> 00:43:49,000
that only gets added to old list. And if I mutate old list to have this element be a nine,

535
00:43:49,000 --> 00:43:55,480
that only gets mutated through old list. So old list contains the changed values, but new list

536
00:43:55,480 --> 00:44:01,639
remains untouched because I've made copies at every level. Yes. So this copy.copy kind of like doing

537
00:44:01,639 --> 00:44:08,519
old list square bracket with a column. Yes, but then it goes further down at every single level.

538
00:44:08,519 --> 00:44:16,039
So the regular copy.copy does the square bracket colon. And the deep copy goes further to all the

539
00:44:16,039 --> 00:44:27,880
other levels. Okay. So lots of ideas in this lecture and last, I would highly suggest going

540
00:44:27,880 --> 00:44:33,239
through the Python tutor and all these examples just to so you see them in a kind of different way

541
00:44:33,239 --> 00:44:38,119
to see exactly how, you know, it'll be the same sort of memory diagram that, but we've done except

542
00:44:38,119 --> 00:44:44,119
that, you know, through the Python tutor. So it will be very helpful for you, I think. I would give

543
00:44:44,119 --> 00:44:48,440
that a try as you're setting for the quiz. I think what's important to realize is that we have

544
00:44:48,440 --> 00:44:54,599
objects in memory and we have names that point to these objects. And so if you kind of get that

545
00:44:54,599 --> 00:45:00,279
and keep that straight in your in your mind, it will be very, very helpful to understanding what's

546
00:45:00,279 --> 00:45:05,319
an alias, what's a clone when you're iterating over certain objects and things like that. And the

547
00:45:05,319 --> 00:45:12,759
big idea here is just side effects. Okay. Every one of these operations has some sort of side effect

548
00:45:12,840 --> 00:45:16,680
and it's important to make sure that you're not changing something you don't want to be changing.

549
00:45:17,960 --> 00:45:24,760
Okay. I guess I just had one last thing to say about lists of tuples. I guess we've seen both of them.

550
00:45:25,400 --> 00:45:30,600
When do you want to use tuples and not lists? When you want something that shouldn't be changed. So

551
00:45:30,600 --> 00:45:37,320
if you have something that might accidentally get changed, do not save it as a list. If you,

552
00:45:37,320 --> 00:45:44,039
okay. And then on the other side, why would you use a list but not a tuple? You would use a list

553
00:45:44,039 --> 00:45:50,280
because you don't want to be creating copies all the time. So when you have, again, these large

554
00:45:50,280 --> 00:45:55,080
databases, every time you want to make a change to it, you don't want to make a copy of everything

555
00:45:55,080 --> 00:46:01,800
with that small change in it. And so mutating an object is good for that respect. Okay. So that wraps

556
00:46:01,800 --> 00:46:07,800
up lists and univ. Next lecture will just tie up a bunch more loose ends and then we'll get into

557
00:46:07,800 --> 00:46:09,000
a new topic.

