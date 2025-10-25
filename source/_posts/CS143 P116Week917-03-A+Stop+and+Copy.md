---
title: CS143 P116Week917 03 A+Stop+and+Copy
---

1
00:00:00,000 --> 00:00:11,720
In this video, we're going to look at a second garbage collection technique, stop and copy.

2
00:00:11,720 --> 00:00:15,240
In stop and copy garbage collection, memory is organized into two areas.

3
00:00:15,240 --> 00:00:19,940
We have an old space that's used for allocation, and so all of the data that the program is

4
00:00:19,940 --> 00:00:23,039
currently using lives in this area called the old space.

5
00:00:23,039 --> 00:00:26,800
And then there's a new space, which is reserved for the garbage collector.

6
00:00:26,800 --> 00:00:31,600
And so this is not used by the programs, this is just for the GC.

7
00:00:31,600 --> 00:00:36,000
And so the first decision in stop and copy garbage collection is that the program can only

8
00:00:36,000 --> 00:00:38,719
use half the space.

9
00:00:38,719 --> 00:00:43,000
And there are some techniques, more advanced techniques for stop and copy garbage collection

10
00:00:43,000 --> 00:00:48,280
that allow the program to use more than half the space, so this isn't as bad as it sounds,

11
00:00:48,280 --> 00:00:52,679
but fundamentally, the fairly significant fraction of the space has to be reserved for

12
00:00:52,679 --> 00:00:54,320
the garbage collector.

13
00:00:54,320 --> 00:01:00,560
Now, the way allocation works is that there's a heat pointer here in the old space, and

14
00:01:00,560 --> 00:01:04,000
everything to the left of the heat pointer is currently in use.

15
00:01:04,000 --> 00:01:07,799
This is where all the objects have already been allocated in this area that I just shaded

16
00:01:07,799 --> 00:01:09,920
here in red.

17
00:01:09,920 --> 00:01:14,900
And then when it comes time to allocate a new object, we simply allocate it at the heat

18
00:01:14,900 --> 00:01:15,900
pointer.

19
00:01:15,900 --> 00:01:22,120
So the heat pointer will simply bump up and some block of space will be allocated to the

20
00:01:22,120 --> 00:01:23,400
next object that we want to do.

21
00:01:23,400 --> 00:01:29,880
And it'll just keep marching through the old space allocating as you allocate more objects.

22
00:01:29,880 --> 00:01:32,040
Okay, so allocation just advances the heat pointer.

23
00:01:32,040 --> 00:01:39,600
So one of the advantages actually of stopping copy is a very simple and fast allocation strategy.

24
00:01:39,600 --> 00:01:43,439
Now eventually, of course, if we allocate over and over again, we're going to fill up the

25
00:01:43,439 --> 00:01:44,439
old space.

26
00:01:44,439 --> 00:01:50,840
And so a garbage collection will start GC, we'll start when the old space is full.

27
00:01:50,840 --> 00:01:54,600
And what's it going to do is going to copy all the reachable objects, all of the reachable

28
00:01:54,600 --> 00:01:57,960
objects from the old space into the new space.

29
00:01:57,960 --> 00:02:01,340
And the beauty of this idea is that when you copy the reachable objects, the garbage is

30
00:02:01,340 --> 00:02:02,340
left behind.

31
00:02:02,340 --> 00:02:07,240
So you simply pick up all the data that you're using and move it over to the new space and

32
00:02:07,240 --> 00:02:12,920
all the junk that you didn't need anymore is left behind in the old space.

33
00:02:12,920 --> 00:02:18,400
And then after you've copied stuff to the new space, first of all, since you left the

34
00:02:18,480 --> 00:02:21,760
garbage behind, you're using less space than you did before the collection.

35
00:02:21,760 --> 00:02:25,640
So there's some space available now in the new space for allocating new objects.

36
00:02:25,640 --> 00:02:29,480
And then you simply swap the roles of the old and new space.

37
00:02:29,480 --> 00:02:31,840
So the old new spaces are reversed.

38
00:02:31,840 --> 00:02:39,439
What was old becomes the new and what was new becomes the old and then the program resumes.

39
00:02:39,439 --> 00:02:43,000
So let's take a look at a quick example here just to get the idea of how this works.

40
00:02:43,000 --> 00:02:45,879
Now let's say we have our old space over here.

41
00:02:45,879 --> 00:02:52,280
This is the old space and we have one root which is this object A. And so what are we going

42
00:02:52,280 --> 00:02:53,280
to do?

43
00:02:53,280 --> 00:02:56,199
Well we're going to make a copy of all the objects reachable from A and we're going to

44
00:02:56,199 --> 00:02:58,240
move them over to the new space.

45
00:02:58,240 --> 00:02:59,400
And what's that going to look like?

46
00:02:59,400 --> 00:03:02,080
Well here it is afterwards, but let's trace it out.

47
00:03:02,080 --> 00:03:06,479
So we started A and we follow pointers from A and we can see there's a pointer to C.

48
00:03:06,479 --> 00:03:11,639
Okay, so C is going to be reachable and then there's a pointer to F. Okay, and then F points

49
00:03:11,639 --> 00:03:15,439
back to A and that's all the reachable objects.

50
00:03:15,439 --> 00:03:20,519
So we copy them and notice when we copy them we also copy their pointers and now the pointers

51
00:03:20,519 --> 00:03:22,199
have all been changed.

52
00:03:22,199 --> 00:03:28,879
So in the copy of A it now points to the copy of C. Okay, and of course C will point to

53
00:03:28,879 --> 00:03:32,319
the copy of F and there's a little issue here.

54
00:03:32,319 --> 00:03:34,159
This line is not in the right place.

55
00:03:34,159 --> 00:03:36,560
So it should look like that.

56
00:03:36,560 --> 00:03:40,639
And then F points back to the copy of A.

57
00:03:40,639 --> 00:03:44,119
So we now only move the object, we move their pointers and we adjust them so that we

58
00:03:44,119 --> 00:03:47,839
have really copied the whole graph of objects over to the new space.

59
00:03:47,839 --> 00:03:50,799
Now we're using less space and so there's some free space here.

60
00:03:50,799 --> 00:03:53,599
Okay, and now this will become the old space.

61
00:03:53,599 --> 00:04:00,479
This is now our old space and this is now the new space which we will use for the next

62
00:04:00,479 --> 00:04:01,639
garbage collection.

63
00:04:01,639 --> 00:04:05,639
So somewhere I have to the discussion so far.

64
00:04:05,639 --> 00:04:10,119
One of the essential problems in stopping copy is to make sure that we find all the reachable

65
00:04:10,120 --> 00:04:14,719
objects and we saw this same problem with Mark and sweep garbage collection.

66
00:04:14,719 --> 00:04:18,920
Now the thing that really distinguishes stopping copy is that we're going to copy these

67
00:04:18,920 --> 00:04:19,920
objects.

68
00:04:19,920 --> 00:04:23,240
So when we find a reachable object we copy it into the new space.

69
00:04:23,240 --> 00:04:28,600
And that means that we have to find and fix all the pointers that point to that object.

70
00:04:28,600 --> 00:04:31,519
And this is actually not obvious how to do.

71
00:04:31,519 --> 00:04:36,879
Okay, because when you find an object of course you can't see all the pointers that point

72
00:04:36,879 --> 00:04:38,199
into that object.

73
00:04:38,199 --> 00:04:39,199
So how are we going to do that?

74
00:04:39,199 --> 00:04:41,199
Well here is an idea.

75
00:04:41,199 --> 00:04:45,000
When we copied the object we're going to store in the old version of it.

76
00:04:45,000 --> 00:04:48,800
It was called a forwarding pointer to the new copy.

77
00:04:48,800 --> 00:04:52,519
So let's take a look at what that would, how that looks like.

78
00:04:52,519 --> 00:04:54,959
So we have our old space, we have our new space.

79
00:04:54,959 --> 00:05:01,039
And let's say we've discovered some reachable object A in the old space.

80
00:05:01,039 --> 00:05:04,159
So what we're going to do is we're going to make a copy of it over here in the new space

81
00:05:04,159 --> 00:05:06,839
and that's easy enough to do.

82
00:05:06,839 --> 00:05:11,079
But now what we're going to do is we're going to take A and we're going to reuse its space

83
00:05:11,079 --> 00:05:14,159
and we're going to store what's called a forwarding pointer in it.

84
00:05:14,159 --> 00:05:18,959
So we're going to, first of all we're going to mark somehow that this has been copied.

85
00:05:18,959 --> 00:05:22,719
So this will have some special mark on it which I'll just you know indicate here with

86
00:05:22,719 --> 00:05:25,479
a little purple bar or something.

87
00:05:25,479 --> 00:05:27,439
This is where I'm marking in some way.

88
00:05:27,439 --> 00:05:30,479
So we can tell that this object has already been copied.

89
00:05:30,479 --> 00:05:33,879
And then at an distinguished location in the object we're going to store the forwarding

90
00:05:33,879 --> 00:05:34,879
pointer.

91
00:05:34,879 --> 00:05:36,879
And this is like a forwarding address.

92
00:05:36,879 --> 00:05:42,040
So if you know where somebody lives you can go to their house and if they have moved you

93
00:05:42,040 --> 00:05:46,319
can ask for the forwarding address and that's exactly and then you can go off to their new

94
00:05:46,319 --> 00:05:50,279
house wherever they've been going to and presently find them.

95
00:05:50,279 --> 00:05:51,839
And so that's what's going to happen here.

96
00:05:51,839 --> 00:05:58,240
If we have a pointer that points into this object later on and maybe much later on in

97
00:05:58,240 --> 00:06:00,719
the garbage collection we may discover this pointer.

98
00:06:00,720 --> 00:06:05,000
You may follow this pointer, find out the points of this object, realize that this object

99
00:06:05,000 --> 00:06:10,160
has moved because we've marked it and then we can use the forwarding pointer to find out

100
00:06:10,160 --> 00:06:16,400
where the new object is and then update this pointer wherever it is to point to the new

101
00:06:16,400 --> 00:06:19,720
object.

102
00:06:19,720 --> 00:06:25,640
Now just like with Mark and sweep we still have the issue of how to implement the traversal

103
00:06:25,640 --> 00:06:28,760
of the object graph without using any extra space.

104
00:06:28,759 --> 00:06:34,399
Again, when you use garbage like algorithms they only get used, they only get run in low

105
00:06:34,399 --> 00:06:40,399
memory situations and you can't assume that you can build unbounded data structures to

106
00:06:40,399 --> 00:06:41,719
use with the garbage collectors.

107
00:06:41,719 --> 00:06:46,480
The garbage collector really needs to work in constant space.

108
00:06:46,480 --> 00:06:51,719
And now here is the idea that will, that is used in stopping copy algorithms to solve

109
00:06:51,719 --> 00:06:52,719
the problem.

110
00:06:52,719 --> 00:06:57,159
So we're going to partition the new space and this is just the new space here into three

111
00:06:57,160 --> 00:06:59,520
contiguous regions.

112
00:06:59,520 --> 00:07:03,200
We're going to have, let's fire with the one at the far right, we're going to have the

113
00:07:03,200 --> 00:07:08,480
empty region where we're allocating a new object and there's an allocation pointer that

114
00:07:08,480 --> 00:07:09,960
points to the beginning of that region.

115
00:07:09,960 --> 00:07:13,800
So this is the region that we're filling up with objects that we're copying over and

116
00:07:13,800 --> 00:07:16,240
this is just empty on new space.

117
00:07:16,240 --> 00:07:22,800
Now immediately to the left of that region are the objects that have already been copied

118
00:07:22,800 --> 00:07:24,840
but not scanned.

119
00:07:24,879 --> 00:07:28,759
Okay, this is copied and not scanned.

120
00:07:28,759 --> 00:07:32,719
And what does that mean?

121
00:07:32,719 --> 00:07:37,319
Well that means the object has been copied over and so we've actually made a copy of the

122
00:07:37,319 --> 00:07:40,599
object into the new space but we haven't yet looked at its pointers.

123
00:07:40,599 --> 00:07:44,120
We haven't looked at the pointers inside the object to see where they go.

124
00:07:44,120 --> 00:07:48,039
And then to the left of that are the objects that have been copied and scanned.

125
00:07:48,039 --> 00:07:51,559
These are objects that have been copied over and we've also processed all the pointers

126
00:07:51,559 --> 00:07:53,479
inside of those objects.

127
00:07:53,480 --> 00:07:57,960
So you can think of this area here between the scan pointer and the allocation pointer,

128
00:07:57,960 --> 00:08:00,560
this is the work list.

129
00:08:00,560 --> 00:08:04,280
So these are the objects that still need to be processed.

130
00:08:04,280 --> 00:08:08,720
These are the objects that have been copied over but might yet still point to objects that

131
00:08:08,720 --> 00:08:09,720
haven't been copied.

132
00:08:09,720 --> 00:08:12,800
And so these are the objects where we have to look at their pointers to see whether they

133
00:08:12,800 --> 00:08:20,800
point to something that still needs to be copied over to finish the garbage collection.

134
00:08:20,800 --> 00:08:24,920
Starting to our little example, I'm now going to walk through how a stopping copy garbage

135
00:08:24,920 --> 00:08:28,800
collector would collect this particular heap step by step.

136
00:08:28,800 --> 00:08:33,360
So notice that we only have one root object and it's A. Okay, and I just want to point

137
00:08:33,360 --> 00:08:39,799
out that A has one pointer which points to object C. All right, so the very first step

138
00:08:39,799 --> 00:08:46,840
what we're going to do is we're going to copy the A object over to the new space.

139
00:08:46,840 --> 00:08:49,399
And this is literally a bit for bit copy.

140
00:08:49,399 --> 00:08:56,240
So we just take the bits of A and we do a copy without doing any inspection of the interior

141
00:08:56,240 --> 00:08:59,759
of the object over to the new space.

142
00:08:59,759 --> 00:09:00,759
And how's that work?

143
00:09:00,759 --> 00:09:07,079
Of course our allocation pointer is initially right here at the beginning of the new space

144
00:09:07,079 --> 00:09:11,799
and then we copy this one object over and that means allocating an object because not

145
00:09:11,799 --> 00:09:17,079
the allocation pointer points to the first word of memory beyond the object we disallocated.

146
00:09:17,079 --> 00:09:18,079
Okay.

147
00:09:18,080 --> 00:09:22,360
Now what happens when we copy it over because this is just a bit for bit copy.

148
00:09:22,360 --> 00:09:25,800
All the pointers and A still point to the objects that they pointed to before which are the

149
00:09:25,800 --> 00:09:27,080
objects in the old space.

150
00:09:27,080 --> 00:09:33,280
So notice now that this copy of A points to the object C in the old space.

151
00:09:33,280 --> 00:09:37,960
The other thing we do is we leave a forwarding pointer in the old copy of A. So we mark A

152
00:09:37,960 --> 00:09:38,960
as having been copied.

153
00:09:38,960 --> 00:09:39,960
That's why it's grayed out.

154
00:09:39,960 --> 00:09:42,680
In the case that this object has already been moved.

155
00:09:42,679 --> 00:09:48,120
And in this dotted line here indicates that somewhere in A we've stored a pointer to

156
00:09:48,120 --> 00:09:49,799
the new copy of A.

157
00:09:49,799 --> 00:09:52,079
And now we're ready to begin the algorithm.

158
00:09:52,079 --> 00:09:59,479
So notice that we have some objects here that have been copied but not scanned.

159
00:09:59,479 --> 00:10:00,879
So this is our work list.

160
00:10:00,879 --> 00:10:04,399
So now we're just going to repeatedly work off of those objects.

161
00:10:04,399 --> 00:10:06,479
And how do we know there are objects in there?

162
00:10:06,479 --> 00:10:09,719
Well, we just compare the scan and the allocation pointers.

163
00:10:09,720 --> 00:10:14,879
So if they are different, if there's an object in between the scan and the allocation pointers

164
00:10:14,879 --> 00:10:17,840
at least one object in between the two, then there's work to do.

165
00:10:17,840 --> 00:10:23,519
There's an object that needs to be scanned and possibly resulting in more objects being

166
00:10:23,519 --> 00:10:26,960
moved and allocated.

167
00:10:26,960 --> 00:10:27,960
So what happens next?

168
00:10:27,960 --> 00:10:36,600
So we process A. So we walk over A and find all the pointers in A. And we copy any objects

169
00:10:36,600 --> 00:10:39,279
that A points to that haven't already been moved.

170
00:10:39,279 --> 00:10:46,600
And so before we said, this copy of A pointed to the old copy of C. So now when we discover

171
00:10:46,600 --> 00:10:50,279
the C object, it hasn't been moved, it's still in the old space.

172
00:10:50,279 --> 00:10:56,879
So we copy it over and we update the pointer in A to point to the new copy of C.

173
00:10:56,879 --> 00:11:00,920
Now of course, and then the scan pointer moves over A. We've scanned all the pointers in

174
00:11:00,920 --> 00:11:06,519
A. And the allocation pointer also moves because we had to allocate space for C.

175
00:11:07,519 --> 00:11:11,000
And of course, C is just a bit for a bit copy of what was in the old space.

176
00:11:11,000 --> 00:11:15,879
And so any pointers that it has, the point to objects that haven't been moved yet,

177
00:11:15,879 --> 00:11:18,039
just point back into the old space.

178
00:11:18,039 --> 00:11:22,879
So in this case, the object C points to the object F in the old space.

179
00:11:22,879 --> 00:11:26,679
And I probably should indicate here, here's the original dividing line.

180
00:11:26,679 --> 00:11:31,240
This is the old space over here and this is the new space over there.

181
00:11:31,240 --> 00:11:36,720
And then finally, we mark C as having been copied, as having been moved to the new space.

182
00:11:36,720 --> 00:11:41,560
And we left a forwarding pointer to it in case we can fix any pointers at point to C

183
00:11:41,560 --> 00:11:43,560
that we come across in the future.

184
00:11:43,560 --> 00:11:50,480
And now we have to continue scanning objects that have been copied but not scanned.

185
00:11:50,480 --> 00:11:54,120
And we can see that there is an object between the scan and the allocation pointer, namely

186
00:11:54,120 --> 00:11:59,399
C. And so when I'll process all the pointers in C.

187
00:11:59,399 --> 00:12:05,240
Next we scan C and we discover that it points to F, which hasn't been moved yet.

188
00:12:05,240 --> 00:12:10,279
And so we copy F over into the new space and we update the pointer in C.

189
00:12:10,279 --> 00:12:13,279
And now C has been copied and scanned.

190
00:12:13,279 --> 00:12:19,639
Okay, so the scan pointer moves past C. And of course, F again is a bit for a bit copy.

191
00:12:19,639 --> 00:12:25,039
And so all its pointers into old space are still pointing to old space in particular F points

192
00:12:25,039 --> 00:12:29,159
to A. And the allocation pointer is moved again because we moved F.

193
00:12:29,159 --> 00:12:35,879
All right, and now we have to process F. And this will be the last object that we move.

194
00:12:35,879 --> 00:12:36,679
And what happens?

195
00:12:36,679 --> 00:12:44,240
Well, we discover that F points to A. Okay, and A is already marked as having been moved.

196
00:12:44,240 --> 00:12:45,959
And it has a forwarding pointer.

197
00:12:45,959 --> 00:12:52,199
So instead of copying A again, we simply update the pointer in F that pointed to the old

198
00:12:52,200 --> 00:12:58,560
version of A to point to the copy of A. Okay, and so now F is completely scanned.

199
00:12:58,560 --> 00:13:00,600
All the pointers in F have been processed.

200
00:13:00,600 --> 00:13:02,560
We didn't allocate any new objects.

201
00:13:02,560 --> 00:13:04,120
So the allocation pointer didn't move.

202
00:13:04,120 --> 00:13:07,480
And now the scan pointer and the allocation pointer are equal.

203
00:13:07,480 --> 00:13:09,440
There are no objects in between them.

204
00:13:09,440 --> 00:13:14,360
And so our work list is empty and this is the garbage collected heat.

205
00:13:14,360 --> 00:13:20,640
This is a complete copy, I should say, of the graph of reachable objects from the old

206
00:13:20,640 --> 00:13:21,640
space.

207
00:13:22,600 --> 00:13:28,120
So now we're done and we simply swap the role of the new and old space and we resume

208
00:13:28,120 --> 00:13:29,120
the program.

209
00:13:29,120 --> 00:13:34,600
So when the program starts running again, it will allocate out of this area and beyond

210
00:13:34,600 --> 00:13:39,399
the allocation pointer until it fills up what is now the old space.

211
00:13:39,399 --> 00:13:44,679
And then this will be the new space that we use for the next garbage collection.

212
00:13:44,679 --> 00:13:51,600
Here's a pseudo code algorithm outlining how stopping copy garbage collections

213
00:13:51,600 --> 00:13:52,600
should work.

214
00:13:52,600 --> 00:13:55,720
So while the scan and allocation pointers are different, remember we keep running until

215
00:13:55,720 --> 00:14:00,080
the scan pointer catches up with the allocation pointer and they're equal, what we're going

216
00:14:00,080 --> 00:14:03,960
to do is we're going to look at the object that is at the scan pointer that we call that

217
00:14:03,960 --> 00:14:07,639
object O. And then for every pointer, we're going to do the following.

218
00:14:07,639 --> 00:14:11,480
We're going to find the object O prime that that pointer points to.

219
00:14:11,480 --> 00:14:13,399
And then there are two cases.

220
00:14:13,399 --> 00:14:15,879
One is that there is no forwarding pointer.

221
00:14:15,879 --> 00:14:20,759
And if there's no forwarding pointer, then we have to copy that object to new space and

222
00:14:20,759 --> 00:14:25,200
they'll involve allocating a new object and updating the allocation pointer.

223
00:14:25,200 --> 00:14:28,960
Then we're going to set, here it says the first word, it really shouldn't emphasize the

224
00:14:28,960 --> 00:14:30,600
first word, set a word.

225
00:14:30,600 --> 00:14:31,799
So it's a distinguished word.

226
00:14:31,799 --> 00:14:32,799
That's what's important.

227
00:14:32,799 --> 00:14:35,519
We have to know which word we're going to use and will always be the same word.

228
00:14:35,519 --> 00:14:40,360
Anyway, we set a word of the old object to point to the new copy.

229
00:14:40,360 --> 00:14:48,799
We mark the old object as copied, mark old object as copied.

230
00:14:48,799 --> 00:14:53,359
So that's so we can tell, if we ever come to a pointer to it again, we know it's already

231
00:14:53,359 --> 00:14:54,679
been moved.

232
00:14:54,679 --> 00:15:00,120
And then we change the pointer to point to the new copy of O prime.

233
00:15:00,120 --> 00:15:04,399
So if that's what we do, if there's no forwarding pointer, and if there is a forwarding pointer,

234
00:15:04,399 --> 00:15:10,479
then we simply update the pointer to point to the same place as the forwarding pointer.

235
00:15:10,479 --> 00:15:17,799
And we just repeat this loop over and over again until we've scanned all the copied objects.

