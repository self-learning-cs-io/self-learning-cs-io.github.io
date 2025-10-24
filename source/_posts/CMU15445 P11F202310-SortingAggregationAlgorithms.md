---
title: CMU15445 P11F202310 SortingAggregationAlgorithms
---

1
00:00:00,000 --> 00:00:26,640
Good morning.

2
00:00:26,640 --> 00:00:33,039
I'm Jignesh Patel and I am going to be teaching this class for the month of October.

3
00:00:33,039 --> 00:00:39,679
Andy will be back in November. In additional changes that on Wednesday, both Andy and I are

4
00:00:39,679 --> 00:00:45,359
traveling. So Matt is going to run the class on Wednesday. Matt is Andy's student.

5
00:00:46,159 --> 00:00:51,840
This is a re-recording of the class that happened on Monday. So those of you who worry class on Monday

6
00:00:51,840 --> 00:00:56,240
and see a different background, see a few different set of notes, it's because they're

7
00:00:56,240 --> 00:01:00,560
recording on Monday didn't work. So let's get started with the few announcements first.

8
00:01:01,760 --> 00:01:08,080
We have the database seminar series as many of you know and there are two lectures,

9
00:01:08,080 --> 00:01:12,879
VBate, which just happened yesterday. There's a recording for that. You can find that from the CMU

10
00:01:12,879 --> 00:01:20,960
database page. There's feature form. That's a feature store that works with machine learning models

11
00:01:21,039 --> 00:01:25,839
and stores those features helps you manage the entire retraining pipeline. Their

12
00:01:26,719 --> 00:01:31,919
presentation is on the coming Monday. So if you're interested in data-related things,

13
00:01:31,919 --> 00:01:36,239
outside traditional relational databases, but where databases meet machine learning,

14
00:01:36,239 --> 00:01:39,839
the seminar series is a great event and hope you can come to it.

15
00:01:41,519 --> 00:01:48,639
Few announcements. Homebook 3 is due on Sunday at midnight and the midterms coming up on Wednesday,

16
00:01:48,640 --> 00:01:53,519
October 13. So start brushing up on the material that we've been discussing in class since the

17
00:01:53,519 --> 00:01:58,400
start of the semester. And of course come to our office hours and ask questions if some things are

18
00:01:58,400 --> 00:02:05,200
not clear. So with that, let's get started. Today we are going to talk about executing queries inside

19
00:02:05,200 --> 00:02:10,879
a database engine. And you see the structure of the database engine on the right side. You've seen

20
00:02:10,879 --> 00:02:17,199
this before. And the part that we're going to focus on today is that operator execution engine.

21
00:02:17,199 --> 00:02:23,280
So at this point in the lifecycle of a query, the query has started. The query has been planned,

22
00:02:23,280 --> 00:02:30,479
basically optimized. And you end up with this situation now where you have to go and execute

23
00:02:30,479 --> 00:02:35,439
the operators in that query. There's a sequence of four lectures starting today where we look at

24
00:02:35,439 --> 00:02:40,799
algorithms that are used for executing these operators. And they will end up using the access

25
00:02:40,800 --> 00:02:47,280
methods, might scan a file, it might end up using a B3. Stuff that you know from before. Though

26
00:02:47,280 --> 00:02:52,560
the data that gets fetched from disk gets pulled into the buffer manager. And you know how buffer

27
00:02:52,560 --> 00:03:01,520
managers work. That was your first project assignment. And essentially the goal is to fetch data from

28
00:03:01,520 --> 00:03:07,040
the disk. Keep all the hot stuff in the buffer pool for as long as possible so that you can

29
00:03:07,039 --> 00:03:13,120
re-access any data pages that you need to re-access from memory, which is far cheaper than going to

30
00:03:13,120 --> 00:03:22,239
the disk. All right, so let's jump into it and look at what happens to the query after it's been

31
00:03:22,239 --> 00:03:30,479
passed. So here's a SQL query, which does a joint between two tables. There's a selection on one

32
00:03:30,479 --> 00:03:36,799
of the tables S and projects out a column from each of the tables. After this query is presented

33
00:03:36,800 --> 00:03:41,840
to the database engine, it's going to get checked through a syntactical parser. And then it's going to

34
00:03:41,840 --> 00:03:47,920
get converted into a relational algebraic representation. And that representation is what gets optimized. We'll

35
00:03:47,920 --> 00:03:54,560
talk about optimization later on in the class. But for today, we just assume that we've got some

36
00:03:54,560 --> 00:04:02,080
tree-like representation for the query. And in the tree are nodes that are operators. So here you've

37
00:04:02,080 --> 00:04:08,000
got the relation R that's feeding into a joint operator where the condition for the joint is looking

38
00:04:08,000 --> 00:04:19,199
for equality between the ID fields on the R and the S tables records. The S table is being scanned

39
00:04:19,199 --> 00:04:24,960
and only the records that have value greater than 10 are sent to this joint operator. Now here,

40
00:04:24,960 --> 00:04:29,520
if there's an index built on the value that will get used and you know how those indices work from

41
00:04:29,519 --> 00:04:34,799
the last lecture. The output of the joint goes into a projection operator where these two columns

42
00:04:34,799 --> 00:04:40,560
are projected, producing the output of the result. And so that's really what the query tree looks like.

43
00:04:40,560 --> 00:04:45,359
And a tables are flowing through it and you can think of a query tree as a data flow graph where the

44
00:04:45,359 --> 00:04:51,120
records flowing from the bottom, they go through the operators where they get processed based upon

45
00:04:51,120 --> 00:04:56,240
the semantics of each of those operators, a selection, a joint, a projection in this case,

46
00:04:56,319 --> 00:05:02,720
and eventually you produce the output over here that satisfies all the conditions that are in the

47
00:05:02,720 --> 00:05:10,639
query. Okay. What we are seeing over here is a tree form for this query, but in general, this can be

48
00:05:10,639 --> 00:05:15,519
a DAC where it may be that there's a portion of the query where the output of this joint gets fed into

49
00:05:15,519 --> 00:05:20,879
another tree and all of those come together before you produce the final output. When you have nested

50
00:05:20,959 --> 00:05:28,959
queries, you have CTEs, often you'll end up with a structure that looks like a DAC and not a regular tree

51
00:05:28,959 --> 00:05:36,159
like you see over here, which never a graph is the complexity in the worst case is going to be a DAC.

52
00:05:36,159 --> 00:05:41,120
Things are going to flow in and come out with one node at the top, which is going to be the output

53
00:05:41,120 --> 00:05:49,839
of that query. Okay. All right. Now let's jump into what I'll be trying to do with the algorithms

54
00:05:49,839 --> 00:05:56,079
for these operators. So the first thing is databases need to work with large amounts of data. So

55
00:05:57,119 --> 00:06:04,719
we want our operator algorithms to work on data that cannot fit in memory. So we want to be able to

56
00:06:04,719 --> 00:06:11,439
deal with data that is far bigger than the memory that we have available. Second, we want to use the

57
00:06:11,439 --> 00:06:16,479
memory that is available and that's in the form of the buffer pool. We want that memory to be used

58
00:06:16,480 --> 00:06:22,480
as efficiently as possible. And this is where we will bring pages into the buffer pool. We'll apply

59
00:06:22,480 --> 00:06:30,560
some sort of a buffer replacement policy. You've implemented LREA2 in the last assignment. And so

60
00:06:30,560 --> 00:06:35,360
you know how those things work. And that's what we are trying to do. We are trying to avoid going to

61
00:06:35,360 --> 00:06:42,160
the disk as much as possible because accessing a page in the buffer pool in memory is orders of

62
00:06:42,160 --> 00:06:47,120
magnitude cheaper than going to the disk. Okay. And now things get even more complicated and cloud

63
00:06:47,120 --> 00:06:52,000
settings. We both delve into that in this class. But the advanced database class goes into that in

64
00:06:52,000 --> 00:06:56,800
much more detail. Sometimes the data is not coming from this that is local. It may come from cloud

65
00:06:56,800 --> 00:07:01,680
storage that is remote, which could be even more expensive. Sometimes there are configurations where

66
00:07:01,680 --> 00:07:06,800
the data is coming from memory from a different node in which case it's not as expensive as going

67
00:07:06,879 --> 00:07:12,639
to a disk, but it's still more expensive than accessing data in local memory. So regardless of where

68
00:07:12,639 --> 00:07:17,600
the data is coming from, there's a hierarchy for where the data lives. And you want to use the buffer

69
00:07:17,600 --> 00:07:22,080
pool, which is sitting in DRAM that is closest to where things are getting processed as efficiently

70
00:07:22,080 --> 00:07:28,080
as possible. But we also want our algorithms to work on large amounts of data. And generally,

71
00:07:28,080 --> 00:07:35,840
when we have to go and fetch something from the disk, we want the IO access pattern to be sequential

72
00:07:35,839 --> 00:07:43,919
because generally disks are better if you ask them for a bunch of pages sequentially than random

73
00:07:43,919 --> 00:07:50,479
me. So if you need to go to the disk and fetch 10 pages, and if your access pattern, your operator

74
00:07:50,479 --> 00:07:57,039
is asking for those 10 pages at random locations on the disk compared to asking for 10 pages that are

75
00:07:57,039 --> 00:08:02,479
contiguous or sequential together on disk, the latter is nearly always going to be faster. So we want

76
00:08:03,040 --> 00:08:09,200
our algorithms to use the buffer pool efficiently. And when we have to go to disk, do that in a way

77
00:08:09,200 --> 00:08:16,480
that minimizes the time that might need to go fetch those pages from disk. So how do we do that?

78
00:08:16,480 --> 00:08:22,160
We'll go through SOR and aggregation operations in today's lecture and we'll continue with

79
00:08:22,160 --> 00:08:28,560
joins and other operations in the subsequent lectures. So starting with SOR, the first question that

80
00:08:28,560 --> 00:08:34,639
might come to mind is the relational model, which is based on relational algebra, is based on set theory

81
00:08:35,200 --> 00:08:41,840
and sets are not sorted. So why do we need SOR? Now SQL has that, so we need sorting for a number of

82
00:08:41,840 --> 00:08:49,039
reasons. One is SQL has an order by clause and that order by clause requires that the data be produced,

83
00:08:49,039 --> 00:08:54,879
the final result be produced sorted by the column set is specified in the order by clause.

84
00:08:55,519 --> 00:09:00,639
And sometimes you need SQL, you need sorting to be able to apply operations like distinct and we'll

85
00:09:00,639 --> 00:09:06,080
see that aggregations can also be done using sorting. And as we get into aggregations in the

86
00:09:06,080 --> 00:09:12,000
second half of this lecture today, we'll see that there are SOR based methods to evaluate the

87
00:09:12,000 --> 00:09:17,360
aggregate operator, but they also hash based methods to do that. And we'll see that duality

88
00:09:17,360 --> 00:09:23,440
between sorting and hashing, they're like siblings that are rivaling with each other in terms of

89
00:09:23,440 --> 00:09:29,040
when is sorting better for evaluating a specific operations versus hashing. Generally hashing is

90
00:09:29,040 --> 00:09:33,200
going to be better and that's well known now, but there was a time in the community where that was

91
00:09:33,200 --> 00:09:38,400
an active debate. SORting still helps in many cases and we'll talk about that. Those cases are

92
00:09:38,400 --> 00:09:43,840
largely going to be centered around when data is already pre-sorted, then you can, the SOR based

93
00:09:43,840 --> 00:09:48,640
methods will likely win over the hash based methods. And of course, if you have to produce records

94
00:09:48,639 --> 00:09:53,519
because there's an order by you will have to do a sorting for that final result. Okay, but

95
00:09:54,399 --> 00:09:59,840
many of these algorithms we're going to look at aggregation, joins in later classes, they'll have

96
00:09:59,840 --> 00:10:04,639
a SOR based approach and a hash based approach and they're constantly dwelling with each other for

97
00:10:04,639 --> 00:10:12,639
higher performance. So let's start with very basic in-memory sorting. If the data fits in memory,

98
00:10:12,639 --> 00:10:18,000
then we can use a standard algorithm like quicksort. And all of you guys have looked at a number of

99
00:10:18,000 --> 00:10:23,440
in-memory sorting algorithms and yesterday in class many of you volunteered the different types

100
00:10:23,440 --> 00:10:30,240
of algorithms, some of the other algorithms that you looked at including bubble SOR and insertion SOR.

101
00:10:31,759 --> 00:10:36,480
Most database systems when they have to do an in-memory SOR, remember we are also going to figure out

102
00:10:36,480 --> 00:10:41,519
how to sort things that are much larger than memory so that we can sort extremely large data

103
00:10:42,000 --> 00:10:46,799
requiring all of that fit in memory. But there will be a portion of that master

104
00:10:47,439 --> 00:10:52,879
external SOR algorithm for which you need to sort in memory. And so you need an in-memory SOR

105
00:10:52,879 --> 00:10:57,519
algorithm and most database systems are going to use quicksort for this in-memory SOR algorithm.

106
00:10:58,159 --> 00:11:04,000
It's not quite true. Most database systems will use quicksort for that in-memory SOR algorithm,

107
00:11:04,000 --> 00:11:09,759
but in quicksort you find a pivot point and you sort on both sides. But if one of the sides becomes

108
00:11:09,759 --> 00:11:14,240
really small then they might end up using something like insertion SOR because it's just much

109
00:11:14,240 --> 00:11:20,720
faster when you have really small number of records like maybe 10 or 20 and that number really

110
00:11:20,720 --> 00:11:26,559
depends also on the hardware and which you're running on. In data platform, most notably Python,

111
00:11:26,559 --> 00:11:30,799
which is very popular in the data science world, then many of those data science notebooks that you

112
00:11:30,799 --> 00:11:36,639
see often get connected to a relational database to go pull stuff. So it's like the extension in many

113
00:11:36,639 --> 00:11:41,439
cases of the database platform for doing data science work and Python's the language in which a lot

114
00:11:41,439 --> 00:11:47,679
of these things get done. Python, you can pull data into Python data structures and there's a

115
00:11:47,679 --> 00:11:54,319
default SOR mechanism in Python and that uses something called TimSOR, which is a combination of

116
00:11:54,319 --> 00:12:00,960
insertion SOR and binary SOR. So there's a lot of in-memory SORting algorithms and it's really fun

117
00:12:00,960 --> 00:12:05,759
to go and look at them and think about that and what combination of algorithms works best

118
00:12:06,240 --> 00:12:11,840
is changing even today because the hardware is changing some of the considerations change and

119
00:12:11,840 --> 00:12:16,159
sometimes depending upon the data distribution which algorithm is going to do better for this in-memory

120
00:12:16,159 --> 00:12:23,360
SOR component also changes. So let's go and take a quick look at a couple SORT algorithms and visualize

121
00:12:23,360 --> 00:12:28,399
them. I'm not going to go into the details of all the SORT algorithms but let me just pull up this

122
00:12:28,399 --> 00:12:33,600
web page and bear with me as I try to bring that window back into focus in zoom here.

123
00:12:34,320 --> 00:12:40,320
And so as you can see here this is a page in which we can look at a number of different SORT algorithms.

124
00:12:41,600 --> 00:12:48,320
Again we are focusing just on in-memory SORT methods here and the key point over here is that

125
00:12:48,320 --> 00:12:54,159
which algorithm wins is going to depend upon things like the data distribution and also the inherent

126
00:12:54,159 --> 00:13:00,160
properties of the algorithm. So let's take a look at random and let's go and bump this up so that

127
00:13:00,159 --> 00:13:03,839
we have 50 data points so that we can see the simulation happen for a little bit longer.

128
00:13:04,399 --> 00:13:10,639
I'm going to run random and just watch this. This is in-s ocean SORT here. This is a merge SORT. We'll use

129
00:13:10,639 --> 00:13:16,240
something quite that later on as a primitive for building the external SORT method. We are going to

130
00:13:16,240 --> 00:13:21,039
talk about it in a second and then here is quick SORT and this is quick SORT that spits it up into

131
00:13:21,039 --> 00:13:27,360
three parts. Let's just go run that and you can see things are getting sorted and this is random

132
00:13:27,360 --> 00:13:32,000
data so these algorithms here on this right side which are more complex are going to do a lot better.

133
00:13:32,000 --> 00:13:38,240
You can see heap SORT is nearly done there, quick SORT is getting there, shell SORT is done and all

134
00:13:38,240 --> 00:13:43,279
these five algorithms here on the right are done and these most simpler algorithms insert

135
00:13:43,279 --> 00:13:48,399
shouldn't selection and bubble SORT are still working on it. Now let's change the scenario a little

136
00:13:48,399 --> 00:13:54,000
bit. We let that complete on the top over there. Let's go to the scenario where the data is nearly

137
00:13:54,799 --> 00:13:59,679
sorted and let's now go and play through that and watch how quickly the simpler algorithms finish up

138
00:14:00,399 --> 00:14:04,399
and as you can see the more complex algorithms on the right they're still working on it but the

139
00:14:04,399 --> 00:14:10,480
first column insertion SORT is already done. Hopefully that illustrates how these sorting algorithms work

140
00:14:10,480 --> 00:14:15,440
and why there is this constant interest even in database systems is to find the right in memory

141
00:14:15,440 --> 00:14:22,159
SORT algorithms and people are constantly re-evaluating that. I'm also very briefly going to go into

142
00:14:22,159 --> 00:14:31,039
this other site which is the link is in the slide deck and let's go to that site and also take a

143
00:14:31,039 --> 00:14:38,559
look at a different way of looking at sorting. So let's see I might just type that in.

144
00:14:38,799 --> 00:14:53,519
There we go. Okay and I'm going to switch this over to exploration mode and this is really a

145
00:14:54,639 --> 00:15:01,759
cute way of looking at algorithms where effectively it's like a debugger and as you can see we'll

146
00:15:01,759 --> 00:15:07,839
start with quickSORT which has this you pick a pivot and then sort on both sides right it's

147
00:15:07,840 --> 00:15:12,399
a divide and conquer algorithm and let's go ahead and sort that and the nice thing about this is

148
00:15:12,399 --> 00:15:18,240
you can see what that code for quickSORT looks like and it's walking through the elements and it's

149
00:15:18,240 --> 00:15:24,480
a very nice way to connect the algorithm in that code centric way with what's happening visually.

150
00:15:24,480 --> 00:15:29,440
So I encourage you to play around with this if you have forgotten in memory SORT algorithms you should

151
00:15:29,440 --> 00:15:35,120
at least know the basic algorithms like quickSORT and insertion SORT and just go and refresh that

152
00:15:35,919 --> 00:15:40,799
you're probably going to need it if you're going to interview it's a fundamental question that gets

153
00:15:40,799 --> 00:15:47,759
asked many times. Alright let's get back to a slide so I'm going to close this and let you play

154
00:15:47,759 --> 00:15:55,200
with the algorithms on this site by yourself. So moving along we're going to start into the

155
00:15:55,200 --> 00:16:01,360
SORT operation start with something simple called the top-end top-end heapSORT and that shows up

156
00:16:01,440 --> 00:16:07,440
when you have an order by as we just discussed SQL has an order by clause and when that's present

157
00:16:07,440 --> 00:16:12,879
in the SQL query you have to present the results sorted by the columns in that order by here you have

158
00:16:12,879 --> 00:16:19,600
to output the records from the enroll table ordered by the student ID. There's a few additional

159
00:16:19,600 --> 00:16:27,440
components that SQL allows you to do so here we are asking the system to send us only the first four

160
00:16:27,440 --> 00:16:33,680
rows sorted by student ID of course so the first four in that sorted order and this is extra

161
00:16:33,680 --> 00:16:40,400
optional clause that says which ties so if there are any ties in the top four give me all the ties

162
00:16:40,960 --> 00:16:48,560
so in this case if this table has more than four records the output of this will be at least

163
00:16:48,560 --> 00:16:55,280
forward but it could be more so if one of those top four student IDs is repeated that repeated

164
00:16:55,279 --> 00:17:01,839
value will be shown back to us. Okay so let's see how that works we will use a version of heap

165
00:17:01,839 --> 00:17:09,920
SORT called the top-end heapSORT and here's how it works here we are going to go and look at the

166
00:17:09,920 --> 00:17:15,519
records so assume the student IDs these values we're going to start by fetching the first student ID

167
00:17:15,519 --> 00:17:22,160
which is three and we're going to build in memory a heap and we'll start by allocating a heap of

168
00:17:22,160 --> 00:17:27,600
size four and obviously a heap is a sorted data structure its code implementation is that of an array

169
00:17:27,600 --> 00:17:32,480
and so I'm just going to show that array representation I'm going to assume you know how our heap works

170
00:17:32,480 --> 00:17:37,360
and if you've forgotten then you can quickly go look that up so I'm just going to show that array

171
00:17:37,360 --> 00:17:42,160
in a sorted order as we insert elements because ultimately that's what a heap does so we'll fetch three

172
00:17:42,720 --> 00:17:47,759
insert that into the heap then we'll fetch four insert that into the heap in sorted order

173
00:17:47,759 --> 00:17:53,920
this heap I'm going to show sorted from right to left so three is smaller than four and so the

174
00:17:53,920 --> 00:18:01,920
heap's growing in this direction then go to six that's added to the heap so three four six now add two

175
00:18:01,920 --> 00:18:08,960
and we have a heap that is four now we come to this value nine and we have to decide what we want to

176
00:18:08,960 --> 00:18:13,759
do with it so yesterday in class I paused the lecture and asked like what would you do with nine

177
00:18:13,759 --> 00:18:18,160
there were a bunch of answers that were given out in terms of what you could do the simple answer was

178
00:18:18,160 --> 00:18:24,400
add nine to the heap and grow the heap which is correct but there's a better way to do it when you

179
00:18:24,400 --> 00:18:33,599
are doing this top four evaluation and the insight is the following I've already seen that there are

180
00:18:33,599 --> 00:18:41,839
phone numbers in the data have scanned so far that are all less than nine if I only have to retrieve

181
00:18:41,839 --> 00:18:47,759
the first four rows the first four smallest values because it's ordered by the student ID

182
00:18:49,119 --> 00:18:55,279
there is no way I would ever output nine because I already have four values that are smaller than nine

183
00:18:55,279 --> 00:19:00,879
so nine does not even need to be processed because I have four values each of which are smaller than

184
00:19:00,879 --> 00:19:09,519
nine so anytime in my heap I've got enough values for in this case and I see a value that is greater

185
00:19:09,519 --> 00:19:15,839
than the largest value in the heap six in this case I can simply toss it so now you can start to see

186
00:19:15,839 --> 00:19:21,200
how when you implement things like in memory sorting in the database context where you have these

187
00:19:21,200 --> 00:19:27,519
semantics you can do very interesting things you can modify those algorithms to make it more efficient

188
00:19:27,519 --> 00:19:33,200
and we'll see that with external merge sort is the algorithms that you know and you love for sorting

189
00:19:33,200 --> 00:19:38,000
hashing other kinds of things when you start to make that in databases in in memory case like this

190
00:19:38,000 --> 00:19:43,279
with top and semantics or external memory you make these subtle changes and make that magic work so

191
00:19:43,279 --> 00:19:50,079
you can do things in a more efficient way and do these operations on much larger data sets much

192
00:19:50,079 --> 00:19:55,039
larger than the amount of memory that you have okay so let me just pause let you take that in

193
00:19:55,039 --> 00:20:00,960
make sure you understand why we can skip nine okay it is greater than six and we are guaranteed

194
00:20:00,960 --> 00:20:08,160
we are not going to need it in the final answer then we come to one which is interesting we have to

195
00:20:08,160 --> 00:20:15,279
put that in the heap but as you might notice there was previously two three four six as I put one I no

196
00:20:15,279 --> 00:20:20,319
longer need to keep six around and I can toss that out again that same reasoning that I've got four

197
00:20:20,319 --> 00:20:27,200
numbers that are the smallest I've seen so far I only need to output four I can now toss away six

198
00:20:27,200 --> 00:20:33,440
which had scanned a few records ago okay so again we are making these optimizations to the algorithm

199
00:20:34,480 --> 00:20:39,840
now because we have these width ties we're going to come to this number four and we have to decide

200
00:20:39,840 --> 00:20:44,640
what we do we can't throw it away because four is one of the smallest number and we have width ties

201
00:20:44,640 --> 00:20:49,039
if we didn't have width ties we could toss it away but in this case we need to keep it we have no

202
00:20:49,039 --> 00:20:53,840
choice but to grow the heap and you can grow the heap in multiple ways it's often an array data

203
00:20:53,839 --> 00:21:00,879
structure that is used to write the heap data structure and so we would generally double that so

204
00:21:00,879 --> 00:21:06,159
that's what we're going to do to here double the size of the heap add four to the sorted heap go to

205
00:21:06,159 --> 00:21:12,079
the next element which is also four then we come to this last element which is eight and as we

206
00:21:12,079 --> 00:21:17,199
discussed in class ask for questions as to what you would do with eight at that point when you

207
00:21:17,199 --> 00:21:22,559
of you volunteered and knew that you would skip eight and that totally makes sense because just like

208
00:21:22,559 --> 00:21:27,599
nine we are guaranteed we don't need eight four is the smallest number in the heap right now

209
00:21:27,599 --> 00:21:33,440
we have four distinct values here we can skip and we can simply output the sorted heap

210
00:21:34,240 --> 00:21:40,639
okay so a modified version of heap sort far more efficient in memory but allows you to go

211
00:21:40,639 --> 00:21:46,960
to the fetching of the first end rows of width ties and the different variants of this in C

212
00:21:46,960 --> 00:21:53,039
colon terms of how you can specify which rows to fetch and this type of a structure works for

213
00:21:53,039 --> 00:22:00,799
with some modification but that's the overall idea all right now we're going to get into the more

214
00:22:00,799 --> 00:22:06,400
interesting part of today's lecture and probably something you haven't seen before which is

215
00:22:06,400 --> 00:22:14,640
how do you sort a table of records when the table is much larger than the amount of memory that you have

216
00:22:15,600 --> 00:22:22,160
as you'll see a theme for many of the algorithms they're called external the memory algorithms

217
00:22:22,880 --> 00:22:28,800
they are based on the idea of divide and conquer you're going to take that big problem that we have

218
00:22:28,800 --> 00:22:34,560
did is too large to fit into memory split it up into smaller chunks in such a way that processing

219
00:22:34,560 --> 00:22:40,320
each chunk individually guarantees that we can produce the final output in aggregate okay so let's

220
00:22:40,319 --> 00:22:49,599
see how this works before we go as we do sorting we are going to take multiple passes on the data that

221
00:22:49,599 --> 00:22:56,720
we are sorting and we will have to write records out in intermediate files and the question is what

222
00:22:56,720 --> 00:23:02,720
do we write in those intermediate files so we are sorting on some key so that's the k value shown here

223
00:23:02,720 --> 00:23:09,519
k1k2 or two distinct key values here and we could either take the entire record along with the key

224
00:23:09,519 --> 00:23:14,480
and store that in these intermediate form that's called only materialization or we could do something

225
00:23:14,480 --> 00:23:20,400
called late materialization where we just take the key and store a pointer to the record obviously

226
00:23:20,400 --> 00:23:27,039
if I'm sorting a table in which each record is a thousand bytes long and I'm just sorting on an

227
00:23:27,039 --> 00:23:33,200
int for key you will this payload here this key if you think of everything here as a key value pair

228
00:23:33,200 --> 00:23:38,639
the value portion is going to be a thousand bytes and if this record ID is let's say eight bytes

229
00:23:38,640 --> 00:23:44,320
that's the space that's this number of bytes that you need to represent the pointer on disk and

230
00:23:44,320 --> 00:23:48,000
you saw what those pointers look like right they're the same type of pointers that read the leaf node

231
00:23:48,000 --> 00:23:55,680
of a B tree eight bytes here for the pointer to the record versus storing the actual record

232
00:23:55,680 --> 00:24:01,040
obviously this is going to be far more efficient space-wise so if we are writing stuff this will take

233
00:24:01,040 --> 00:24:07,520
fewer number of bytes that we need to write to the disk as we are doing multiple passes on the file

234
00:24:08,079 --> 00:24:12,400
but at the end when we are done sorting we have to go retrieve all these records and there may be a

235
00:24:12,400 --> 00:24:19,759
whole bunch of random miles generally what happens is uh roasters will use this format column

236
00:24:19,759 --> 00:24:23,920
stores are naturally in the format where the keys have not been brought together and they ultimately

237
00:24:23,920 --> 00:24:29,680
need to be pulled in and so might as well keep the record IDs or some logical version of that around

238
00:24:29,680 --> 00:24:34,319
because you know this records haven't been stitched together to begin with might as well delay

239
00:24:34,319 --> 00:24:39,359
that stitching till later on so roasters often will use this format column stores will often use

240
00:24:39,359 --> 00:24:44,399
this format for how they represent the internal sort stuff obviously this is way more space-efficient

241
00:24:47,119 --> 00:24:54,879
all right so let's go into the setup for the moodsot we have a data that is end pages

242
00:24:56,000 --> 00:25:02,000
and we have a buffer point that is B pages and is much larger than B and we'll start with a very

243
00:25:02,000 --> 00:25:07,759
simple version of the external moodsot in which we are going to merge things two ways and then we'll

244
00:25:07,759 --> 00:25:14,079
see how we can generalize that so the two is the degree of the merge tree and I'll show you that next

245
00:25:14,880 --> 00:25:19,279
I'll come back to this in a little bit but let me just go to the diagram and show you how it works

246
00:25:20,079 --> 00:25:27,920
so here's a pictorial way of looking at moodsot imagine we are starting with a file in which there are

247
00:25:27,920 --> 00:25:34,240
eight pages the first page has two records just to keep the diagram manageable obviously a page

248
00:25:34,240 --> 00:25:39,680
will have a lot more than two records often hundreds or if you're using bigger block sizes maybe even

249
00:25:39,680 --> 00:25:45,600
many thousands but in this case just to keep things simple here is a page which has only two records

250
00:25:45,600 --> 00:25:50,080
three and four and three and four is really the key only chance sorting and not showing all the

251
00:25:50,080 --> 00:25:55,440
payload of all the entire record or the key point repairs that we might keep around this is just the

252
00:25:55,440 --> 00:26:01,039
key values and then the second page has six and two and so on we want to sort all of this of course

253
00:26:01,039 --> 00:26:07,200
when we sorted the in the final output file the first record will be one dead two and so on but we

254
00:26:07,200 --> 00:26:13,360
want to get to that and we'll do this by using only three pages right just to show how you can do

255
00:26:13,920 --> 00:26:17,840
sorting of files that are much bigger than the amount of memory that you have so assume you have

256
00:26:17,840 --> 00:26:23,920
only three pages right pretty small and we've got seven pages in this file there's an extra dummy

257
00:26:23,920 --> 00:26:28,800
page put over here to just indicate the end of file that's just for convenience and also in this

258
00:26:28,800 --> 00:26:33,360
case makes it a power of two you don't need to actually allocate a page you could just remember that

259
00:26:33,360 --> 00:26:39,039
this is the last page but this is just shown for visual clarity over here okay so let's see what

260
00:26:39,039 --> 00:26:45,440
happens in the first pass we're going to make multiple passes on the data and at in each pass we

261
00:26:45,440 --> 00:26:51,360
will read what we had in the previous pass and then write new data and when we write that data we'll

262
00:26:51,359 --> 00:26:57,919
either use that materialized format or that key and record ID format so in the first pass the input

263
00:26:57,919 --> 00:27:03,759
data is the original file so we start there and that's the eUF marker as we talked about and then

264
00:27:03,759 --> 00:27:11,439
we'll bring one page into memory this page sorted and write that back to a new file as the first

265
00:27:11,439 --> 00:27:16,000
page and in this case three four was already sorted that's okay we'll write that back so this is a

266
00:27:16,000 --> 00:27:24,079
new page a copy of that page made in a new file okay we'll take the second page which is six two

267
00:27:24,720 --> 00:27:30,079
and then sort that in memory and we'll use quicksort or any of your favorite in memory sort

268
00:27:30,079 --> 00:27:38,400
method to do that and then write that two six on to the second page of this new file we are creating

269
00:27:38,400 --> 00:27:44,640
and then we keep going on so you have four nine then seven eight basically each page is getting

270
00:27:44,640 --> 00:27:51,440
sorted and you finally end up having this file in which you have what we call as one page runs

271
00:27:52,080 --> 00:27:56,240
basically in this file there are as many pages as there are in the input file

272
00:27:58,240 --> 00:28:05,280
and each page in this file each one page is sorted and this one page seems all right now but just

273
00:28:05,280 --> 00:28:11,040
hold on till what happens in the second pass in the second pass here's what we'll do we will start

274
00:28:11,039 --> 00:28:15,839
merging and this is where the two way merge comes in we're going to merge two pages at the records

275
00:28:15,839 --> 00:28:21,519
in each page are sorted so we'll bring this page into the buffer pool so now we've used one page in our

276
00:28:21,519 --> 00:28:27,200
three page buffer manager we'll bring the second page into the buffer pool second page is gone

277
00:28:27,200 --> 00:28:31,920
we'll reserve the third page for the output and I don't know why those bubbles came up I think

278
00:28:31,920 --> 00:28:36,879
zoom is trying to get too smart and did that automatically hopefully you enjoyed that

279
00:28:37,840 --> 00:28:43,920
so we bring the first page and the second page into memory and then we'll hold a cursor on

280
00:28:43,920 --> 00:28:49,920
the smallest value in the first page hold a pointer and that points to three we'll hold a

281
00:28:49,920 --> 00:28:55,840
pointer to two which is the smallest record on the second page and then compare those two

282
00:28:56,400 --> 00:29:01,280
and then output the smaller of those two which is two and as we do that we will move

283
00:29:02,240 --> 00:29:07,039
the cursor on the second page to six so in the next step we'll compare three and six

284
00:29:07,039 --> 00:29:13,359
output three and so on and so effectively we'll start producing these output as soon as that

285
00:29:13,359 --> 00:29:18,000
output buffer page which was a third page becomes full we'll write it to disk so not that output

286
00:29:18,000 --> 00:29:23,200
buffer page is free so we can fill it up again with the next page so as you can see as I do this

287
00:29:23,200 --> 00:29:30,639
merge step in this second pass which is called pass number one because we started the first pass

288
00:29:30,640 --> 00:29:39,759
was label zero in pass number one we will have created a sequence of two pages and the records across

289
00:29:39,759 --> 00:29:45,440
those two pages are fully sorted and so that's called a two page run you can take a sequence of two

290
00:29:45,440 --> 00:29:50,560
pages and across that the records are sorted and so the two three gets written out to disk then four

291
00:29:50,560 --> 00:29:54,880
six and I'm just gonna draw it in a slightly different way this file created at the end of pass one

292
00:29:54,880 --> 00:30:00,320
still has seven pages as before eight if you add that dummy page but now I'm just gonna draw the

293
00:30:00,320 --> 00:30:05,360
sequence of two pages each pair vertically like that just to show that they're sorted right it's a

294
00:30:05,360 --> 00:30:12,480
two page run the first two pages in this file have what you see here the second two pages will also

295
00:30:12,480 --> 00:30:20,880
be merged and there'll be a second two page run for the second for the 49 and 78 page that we had

296
00:30:20,880 --> 00:30:27,280
written out at the end of pass zero okay so now you can start to see first we started with data

297
00:30:27,280 --> 00:30:32,720
was completely unsorted then we said everything on a single page is sorted now we are seeing in this

298
00:30:32,720 --> 00:30:40,000
new file that is produced every pair of pages the records across data are sorted now we'll repeat

299
00:30:40,000 --> 00:30:46,160
this process again using three buffer pool pages and what we'll do is we'll create this four page run

300
00:30:46,480 --> 00:30:51,200
file we'll do that by doing the following we'll bring page two three into memory again now we use

301
00:30:51,759 --> 00:30:57,360
one buffer pool page for that we'll bring the page four seven into memory second page is gone

302
00:30:57,360 --> 00:31:03,040
that's used for the smallest page on the two runs we are trying to run merge and then the output

303
00:31:03,040 --> 00:31:07,840
pages before it's the same algorithm that we did before we'll find the smallest between what's in

304
00:31:07,840 --> 00:31:14,000
memory we'll compare two and four output two move the cursor to three compare three and four

305
00:31:14,000 --> 00:31:20,640
output three fill up that page in the output buffer keep going at any point in time we just need one

306
00:31:20,640 --> 00:31:27,839
input page from either side from these one input page from the two runs that we are merging and one

307
00:31:27,839 --> 00:31:34,160
output page and we effectively create this new file at the end of pass two surprise surprise now

308
00:31:34,160 --> 00:31:40,400
this is called a four page run because in this file there are again seven plus one dummy eight page

309
00:31:40,400 --> 00:31:45,440
but the first four pages now are fully sorted the first the records across the first four page you

310
00:31:45,440 --> 00:31:51,519
start from the first to the last and it's in the right sort of order do the last thing which is

311
00:31:52,640 --> 00:31:59,519
do one more merge and you're basically done so as you can see if you think about what's the cost

312
00:32:00,000 --> 00:32:07,920
of doing this operation the cost is going to be two times the number of pages and is the number of

313
00:32:07,920 --> 00:32:14,720
pages in each pass because in each pass we are reading it and writing it so hence this two n and how

314
00:32:14,720 --> 00:32:20,560
many passes to be half that's the depth of this tree this is effectively a binary tree and so the

315
00:32:20,560 --> 00:32:26,000
depth is going to be log off into the base two and the ceiling stuff is just to take care of the

316
00:32:26,000 --> 00:32:30,960
fact that the number of pages may not be exact power of two but he can't take half a pass we have to

317
00:32:30,960 --> 00:32:37,200
take a full pass and that's what we do there's an excellent question that was asked in class yesterday

318
00:32:37,200 --> 00:32:45,680
about why do we go about merging this way could we have in pass one done this merge then done this

319
00:32:45,680 --> 00:32:53,120
merge and before doing the merge of the five six and one three to create the this two page run

320
00:32:53,120 --> 00:32:59,920
could we have merged these two to create this in the first place so instead of doing the

321
00:33:00,400 --> 00:33:08,400
processing effectively level by level could we go go down the depth of the tree as much as we can

322
00:33:08,400 --> 00:33:14,400
and then keep coming back so effectively what you could do is produce this in pass one pause the rest

323
00:33:14,400 --> 00:33:20,720
of the processing of pass one go to pass two and so on that was an excellent question the answer is yes

324
00:33:20,799 --> 00:33:29,279
you can do that and there's an advantage to that is you could you process this you process these two

325
00:33:30,160 --> 00:33:37,200
page runs and do that you can delete this page this set of four pages from disk and you basically

326
00:33:37,200 --> 00:33:43,440
just have this portion here but so you're not allocating as much space on this because at that point

327
00:33:43,440 --> 00:33:48,720
you could be tossing this away in the other case you will have twice as many pages allocated on this

328
00:33:48,720 --> 00:33:53,839
so if your disk is getting full then that might help generally disks these days have plenty of space

329
00:33:53,839 --> 00:33:58,160
so it's not a problem but that's definitely a way to think about it and those are the ways in which

330
00:33:58,160 --> 00:34:03,200
people are still constantly improving external sort it's still a blood sport people compete very

331
00:34:03,200 --> 00:34:10,079
heavily on how fast they can sort and ideas like that and ideas like trying to improve the in-memory

332
00:34:10,079 --> 00:34:14,720
sort for specific hardware trying to make this work in an environment where your data is coming from

333
00:34:14,719 --> 00:34:20,079
a cloud storage device and can you do things faster all of this is still interesting topic in

334
00:34:20,079 --> 00:34:28,559
other words external mood sort is still a research topic that is work for sewing okay now let's go

335
00:34:28,559 --> 00:34:34,319
and see how we can make what we have better so I'll go back now to the macro perspective of what

336
00:34:34,319 --> 00:34:40,159
the algorithm does right we have pass zero where we were reading one page into memory sought that into

337
00:34:40,159 --> 00:34:45,519
a one page run then in pass one two three onwards recursively merge all of these pairs still be a

338
00:34:45,519 --> 00:34:52,239
finally done right pretty standard divide and conquer and the everything is great so far we are now

339
00:34:52,239 --> 00:34:59,119
able to sort stuff that's extremely fast but if you had a petabyte file and you just had a hundred

340
00:34:59,119 --> 00:35:04,000
pages in the buffer pool or three or just three pages in the buffer pool like we were doing here

341
00:35:04,000 --> 00:35:09,679
you will eventually finish sorting that file but it will take a very very long time it may take

342
00:35:09,679 --> 00:35:14,399
decades or a century depending on the hardware you have before you are done so can we do better

343
00:35:14,399 --> 00:35:20,079
can we do better especially if we have larger amounts of buffer pool so imagine you know today

344
00:35:20,079 --> 00:35:26,000
gigabyte memory is very feasible in fact many database servers high end servers run with terabytes of

345
00:35:26,000 --> 00:35:31,679
main memory so imagine I give you a lot more than three buffer pool pages can we make this go a lot

346
00:35:31,679 --> 00:35:37,599
faster so what can we do to make this go faster we can change this to end right in each pass we

347
00:35:37,599 --> 00:35:44,000
are going to have to do that that many ios what we can do is try and reduce this cost which is

348
00:35:44,000 --> 00:35:49,279
basically this okay and effectively you can't do something with this number one you really have to

349
00:35:49,279 --> 00:35:56,000
focus on what you can do here this is basically determine that log of n to the base two is determined

350
00:35:56,000 --> 00:36:01,039
by the shape of the tree so you can do two things if I told you in this case I'm going to give you

351
00:36:01,039 --> 00:36:08,880
five pages what could you do you could drop this tree so instead of starting with a one page run

352
00:36:08,880 --> 00:36:13,440
you could immediately go to something like a four page or a five page run you know if I give you

353
00:36:13,440 --> 00:36:18,800
five pages or let's just start with four pages bring all the four pages in memory

354
00:36:19,519 --> 00:36:25,039
sort them and immediately you get this right right so effectively what you can do is take this

355
00:36:25,039 --> 00:36:31,279
tree and you can chalk the base of the tree so that you can reduce the number of passes by jumping

356
00:36:31,279 --> 00:36:35,920
from here to there right but because you have a lot more memory so if I've got four pages I can just

357
00:36:35,920 --> 00:36:41,440
bring those four goes straight here didn't have to do these two passes save two passes second

358
00:36:41,440 --> 00:36:45,360
thing you can do if you have more pages there's no reason to do a two way merge I could do a three

359
00:36:45,360 --> 00:36:51,360
way merge or a four way merge or you know how many ever pages that I have if I've got three buffer

360
00:36:51,360 --> 00:36:56,880
pages I always need one page for the output and I could do a three minus one way merge and that

361
00:36:56,880 --> 00:37:02,960
basically widens the tree so we're going to chop the tree and widen the tree that dramatically reduces

362
00:37:02,960 --> 00:37:10,400
the number of passes and in practice you rarely see even on very large data sets because if you have

363
00:37:10,400 --> 00:37:15,599
a petabyte data set you're probably going to get terabytes of main memory to sort that you rarely

364
00:37:15,599 --> 00:37:21,120
need more than two passes to sort data maybe three if you're doing something crazy crazy big and

365
00:37:21,119 --> 00:37:26,400
don't have a lot of memory but the number of passes are not going to be a lot more than two or three

366
00:37:26,400 --> 00:37:34,480
in practice and it's because of this technique so how does this work we are that idea is essentially

367
00:37:34,480 --> 00:37:39,119
what I told you captured over here in a little bit more detail start by using all the buffer pool pages

368
00:37:39,119 --> 00:37:44,319
all the b pages don't have to leave one for the output bring everything into those b pages sorted

369
00:37:44,319 --> 00:37:50,880
and write these sorted runs so that will produce and divided by b take the ceiling function to get

370
00:37:50,880 --> 00:37:58,800
that nice integer number sorted runs and each of them is b pages long then merge in a b minus

371
00:37:58,800 --> 00:38:05,200
way the final equation becomes log to the base of b minus one right massive reduction in the number

372
00:38:05,200 --> 00:38:11,599
of passes because of that or another big reduction because you're starting with a much smaller number

373
00:38:11,599 --> 00:38:16,640
of nodes in that tree that you have right so this is a b minus way fan out tree where the number of

374
00:38:16,639 --> 00:38:25,440
leaves in that tree is n divided by b with the ceiling function okay all right just to put that

375
00:38:25,440 --> 00:38:31,920
in perspective imagine we want to sort a file with 108 pages and have five buffer pool pages

376
00:38:32,480 --> 00:38:39,440
bring five pages at a time into memory sort that so you get a five page run file and the number

377
00:38:39,440 --> 00:38:47,519
of a sorted runs in that is going to be 108 divided by five rounded up 22 and that's how many

378
00:38:47,519 --> 00:38:53,119
runs you have now each of these 22 runs have to be merged but you have b pages so you can do a

379
00:38:53,119 --> 00:38:59,440
four way merge remember we still need one page for the output and so the output of that is going

380
00:38:59,440 --> 00:39:06,960
to be a file that is five times four which should have 20 pages in each run so it's a 20 page run

381
00:39:06,960 --> 00:39:13,679
file and the number of runs in that is going to be six which you merge one more time and basically

382
00:39:13,679 --> 00:39:19,119
you're done as an exercise try to look at different values try to see what happens when b is equal to

383
00:39:19,119 --> 00:39:24,880
three try to make n equal to a million which is not very unusual to find in databases to have a

384
00:39:24,880 --> 00:39:30,159
a million page file in the large databases and you'll see why everything we are doing with the

385
00:39:30,159 --> 00:39:39,519
larger fan out and this merge can happen okay and happens fast all right okay now there's an

386
00:39:39,519 --> 00:39:46,319
optimization that you can do with external merge where you play on this idea that if you plot this

387
00:39:46,319 --> 00:39:54,159
log function you'll see that for large values of n if I increase n the number of passes is not going

388
00:39:54,159 --> 00:40:00,719
to change significantly right it's going to jump in in a step function and if that is the case

389
00:40:00,719 --> 00:40:06,319
effectively even if I give you p pages or give you half of those pages the number of passes might

390
00:40:06,319 --> 00:40:13,359
remain the same for a whole range of n values so in many of those cases it makes sense to do this

391
00:40:13,359 --> 00:40:21,039
optimization call double buffering and double buffering does the following it's going to try and

392
00:40:21,039 --> 00:40:26,880
use the buffer pool and instead of using all the pages it has only used part of it to do one

393
00:40:27,679 --> 00:40:32,880
pass while the other stuff is getting ready let me explain what I mean so assume we have

394
00:40:33,440 --> 00:40:38,320
the table that we want to be sorted is sitting on disk and there's a bunch of pages I've

395
00:40:38,320 --> 00:40:43,440
all pages are equal I've just colored it into light and dark to make this animation work and so far

396
00:40:43,440 --> 00:40:47,840
everything we've talked about what are we going to do if I've got four buffer pool pages bring three

397
00:40:47,840 --> 00:40:54,720
pages in do a three-day merge and write those output into the into this sorted run that we are

398
00:40:54,720 --> 00:41:00,880
creating on disk okay so now with double buffering assume we have a lot more pages we have

399
00:41:01,680 --> 00:41:05,840
eight pages and the number of passes remains the same because there's going to be a whole range of

400
00:41:05,840 --> 00:41:11,760
n values for which that's going to happen now what's happening right now with the way we are doing

401
00:41:11,760 --> 00:41:16,880
things is we could have gone to an eight way merge and that will certainly help and we can we

402
00:41:16,880 --> 00:41:20,960
should obviously consider that when we try to optimize this operation but another thing we can

403
00:41:20,960 --> 00:41:28,400
consider is to try and play with the observation here that right now the sequential nature of this

404
00:41:28,400 --> 00:41:35,200
processing is that if I look at the CPU and the disk when I'm bringing the pages into the buffer pool

405
00:41:35,200 --> 00:41:41,360
the CPU is doing nothing it's just idle my IO bus is busy and then when I start processing the

406
00:41:41,360 --> 00:41:47,120
disk buses and is not doing anything and it's only the CPU that's doing so at any point in time if I

407
00:41:47,120 --> 00:41:52,320
look at the CPU resource and the disk resource one of them is basically idling so what if you wanted

408
00:41:52,320 --> 00:41:58,480
to use all of that and we had this extra buffer space and the way you could deal with that is the

409
00:41:58,480 --> 00:42:03,360
following you do double buffering so we'll start the same thing except we'll create a shadow buffer

410
00:42:03,360 --> 00:42:07,680
page for each actual buffer page that we're doing so we're still going to do a three-day merge

411
00:42:07,679 --> 00:42:13,919
but as this data is brought in same as before and it's getting merged I'm going to start fetching

412
00:42:13,919 --> 00:42:21,279
the other pages to get it ready for the next merge phase okay or the next creation of the sorted

413
00:42:21,279 --> 00:42:28,480
run phase and so now when I'm done with merging together these three pages that I have into the

414
00:42:28,480 --> 00:42:34,719
red runs the CPU was really busy but the disk was also busy because it was fetching the next set of

415
00:42:34,719 --> 00:42:40,000
pages that needs to be processed we finished writing this red run and then we start working on the

416
00:42:40,000 --> 00:42:45,439
darker pages that we brought in here to create that blue run and we'll keep toggling between those

417
00:42:45,439 --> 00:42:49,919
buffer pages is effectively like you've got the buffer pool you've divided into two there's a shadow

418
00:42:49,919 --> 00:42:55,039
version of the pool and one is operating and the shadow is fetching data from disk and you keep

419
00:42:55,039 --> 00:43:00,559
flipping which one is active and which is the shadow version okay and obviously with this we'll get

420
00:43:00,559 --> 00:43:07,119
far better resource utilization for the disk and IO and you can overlap the computation you'll get

421
00:43:07,119 --> 00:43:14,000
a reduction in the response time and the other the downside of that is the effective being the

422
00:43:14,000 --> 00:43:19,039
equations we had before is half of what we had but as I said there's a log function and a ceiling

423
00:43:19,039 --> 00:43:23,920
function so in many cases it won't matter won't increase the number of passes so this this could

424
00:43:23,920 --> 00:43:28,799
certainly help reduce that response time because you are using both the disk and CPU in parallel

425
00:43:30,639 --> 00:43:35,119
it may not change the throughput you could get a response time reduction but you've got a lot of

426
00:43:35,119 --> 00:43:39,679
sort operations happening in parallel obviously the throughput may not change right so it's a trade-off

427
00:43:39,679 --> 00:43:43,679
that you make but it's a cool technique especially if you want to get the latency of that sort

428
00:43:43,679 --> 00:43:53,119
operation down you can play around with techniques like that all right one little tidbit of information

429
00:43:53,119 --> 00:44:00,239
deep down in the sort core we are doing a comparison between two values and often it helps

430
00:44:00,239 --> 00:44:05,279
to write specialized codes so that that comparison can be fast you know especially for

431
00:44:06,079 --> 00:44:13,519
types that might be complex types like date time or even for integer types if I can write the code

432
00:44:13,519 --> 00:44:19,599
if I can write a sort function where the type of the keys is predefined as opposed to have to

433
00:44:19,599 --> 00:44:24,959
infer the type on the fly if I have to infer the type on the fly I have to pass into the sort function

434
00:44:24,960 --> 00:44:31,519
of a pointer to a function to compare the value and in equal it'd be better if I could just use

435
00:44:31,519 --> 00:44:39,519
native in equal and so often what systems do is they will write the sort code in a generic way

436
00:44:39,519 --> 00:44:44,639
and if you're in C++ you can write that using template programming and then instantiate the

437
00:44:44,639 --> 00:44:51,440
template when you're compiling the code for all the data types that you care about that you need to

438
00:44:51,440 --> 00:44:59,119
go fast and usually those data types have to be fixed data types like ints int2 int4 int8 and so on

439
00:44:59,119 --> 00:45:02,960
you can do a few more things with strings but this code specialization we're going to say I have a

440
00:45:02,960 --> 00:45:08,000
generic sort function maybe I'm looking at the quicksort component written quicksort once I don't

441
00:45:08,000 --> 00:45:13,360
want to write quicksort for int2 quicksort for int4 quicksort for int8 and so on I write it once using

442
00:45:13,360 --> 00:45:18,480
template meta programming compiled it so now I have a specialized version of int2 and that inner loop

443
00:45:18,480 --> 00:45:24,320
might be optimized the comparison predicate is optimized to make int2 or int4 get go really fast

444
00:45:24,320 --> 00:45:28,320
but it might be that even some parts of that inner loop with as a loop the compiler may be

445
00:45:28,320 --> 00:45:34,719
able to unroll at compilation time because it has perfect type information so that code specialization

446
00:45:34,719 --> 00:45:39,679
is applied in a bunch of database systems through a variety of methods in C++ written databases it's

447
00:45:39,679 --> 00:45:45,440
often done through template mechanism and compilation of those templates that are instantiated

448
00:45:45,440 --> 00:45:53,039
explicitly to make that that code go fast if I'm doing sorting on

449
00:45:54,480 --> 00:46:00,000
their car keys basically string keys then I could do a simple thing and just do a comparison on

450
00:46:00,000 --> 00:46:04,639
the entire string but if the strings are long they might be 100 characters long I'm going to need a

451
00:46:04,639 --> 00:46:09,679
lot of cycles to just do individual key comparison and we're doing a lot of these key comparisons as we do

452
00:46:09,679 --> 00:46:17,279
this sort so one alternative popular technique that gets used is to get a representation of the key

453
00:46:17,279 --> 00:46:24,159
in some encoded fixed-length form usually something like a 64 bit encoded version of that string

454
00:46:24,559 --> 00:46:29,119
and which has a property such that it could be basically just the prefix of the string so if I

455
00:46:29,119 --> 00:46:35,679
compare that bit encoded 64 bit version that I can just read like a 64 bit int and use int comparison

456
00:46:35,679 --> 00:46:40,480
which is faster than doing string comparison I can tell whether something is less than

457
00:46:41,359 --> 00:46:47,440
another string and it's only when the that prefix is equal to have to go into a full string comparison

458
00:46:47,440 --> 00:46:52,960
and so I don't need to do a full string comparison for many of these operations and these comparison

459
00:46:52,960 --> 00:46:59,599
operations are getting used a lot so when you're sorting on strings you should very rarely be sorting

460
00:46:59,599 --> 00:47:04,399
using a equality function or comparison function on the native strings you could use that if the

461
00:47:04,400 --> 00:47:08,639
strings are really small and you know that but if it's variable character strings then you generally

462
00:47:08,639 --> 00:47:14,079
want to go use a technique that looks like that and this type of idea of taking keys and using a

463
00:47:14,079 --> 00:47:19,360
suffix of it as a surrogate for getting correct comparison and only having to look at the full string

464
00:47:20,240 --> 00:47:26,720
if you need to is used all over the place Beatrice that have string keys often in the inner nodes are

465
00:47:26,720 --> 00:47:31,280
going to have that suffix representation in the case because they're smaller and they're all kinds

466
00:47:31,280 --> 00:47:36,960
of interesting things that you can play around with string Beatrice so this suffix idea is used

467
00:47:36,960 --> 00:47:43,519
shows up all over now some of you might be thinking as we've been talking about sorting that there's

468
00:47:43,519 --> 00:47:49,280
a lot of connection between sorting and what you guys learned for Beatrice and could we use the Beatrice

469
00:47:49,280 --> 00:47:53,920
for sorting and there are two cases to consider and the answer is yes you can use Beatrice for sorting

470
00:47:53,920 --> 00:47:59,519
but you have to be careful about what type of Beatrice it is so Beatrice come in two form clustered

471
00:47:59,519 --> 00:48:05,280
and unclustered clustered means the record IDs in the leaf level of the Beatrice shown by this gray

472
00:48:05,280 --> 00:48:11,360
area over here they will generally follow the record ID of the pages that are stored in the disc

473
00:48:11,360 --> 00:48:19,280
so if I have a clustered Beatrice then I could just sort the keys so if a Beatrice is built on student

474
00:48:19,280 --> 00:48:25,360
ID the example we've been using before and someone and the query says order by student ID don't need to

475
00:48:25,360 --> 00:48:31,039
sort you could just go look at start with the leftmost leaf node go chase the

476
00:48:32,960 --> 00:48:38,079
records in that leaf node from left to right pull up the pointer and effectively you're going to get

477
00:48:38,079 --> 00:48:42,800
I sort it out but right because the keys already sorted at the lowest level of the Beatrice just

478
00:48:42,800 --> 00:48:48,800
fritchy the records the records are clustered so the first three keys over here all belong to page

479
00:48:49,600 --> 00:48:55,360
page 101 and so you're only accessing each page once basically in a single scan of the file

480
00:48:55,360 --> 00:48:59,920
and a scan of the lowest level of the Beatrice you're going to get sorted which is going to be

481
00:48:59,920 --> 00:49:05,120
faster than the external sort merge however if it's an unclustered Beatrice probably a bad

482
00:49:05,120 --> 00:49:11,200
idea to use it unless you've got a range selection predicate also on the Beatrice or zoom we're just

483
00:49:11,200 --> 00:49:17,039
saying order by student ID the Beatrice is built on student ID and it's the leaf level then it's a

484
00:49:17,039 --> 00:49:21,360
bad idea to use an unclustered Beatrice because as you can see here you're going to chase the key

485
00:49:21,360 --> 00:49:26,159
down you're going to fetch this page the second key here goes to a second page and later on you're

486
00:49:26,159 --> 00:49:31,679
going to refetch this page so it's at random IOs and in this case not just random IOs but also

487
00:49:31,679 --> 00:49:37,199
re-accessing the same page multiple times this is going to be pretty expensive you are going to be

488
00:49:37,199 --> 00:49:42,880
better off having done that external merge on so if you have to sort you have a clustered Beatrice

489
00:49:42,960 --> 00:49:48,160
on the sort key you can use that otherwise if it's an unclustered Beatrice you can avoid that and

490
00:49:48,160 --> 00:49:52,800
these are the types of decisions that an optimizer can make as they're picking the right algorithm

491
00:49:52,800 --> 00:50:01,280
or the access tab all right switching gears from the sort operator to the aggregation operator

492
00:50:02,559 --> 00:50:07,519
we can start to now look at different algorithms for it and also start to think about hashing

493
00:50:08,400 --> 00:50:14,000
so aggregation basically involves you've seen aggregation before so let's just go look at it with

494
00:50:14,000 --> 00:50:20,239
an example so here's a query in which on this en-roll table which has student ID column ID and great

495
00:50:20,880 --> 00:50:27,119
we are looking for only those students that are that have a grade of B and C and as I joked about

496
00:50:27,119 --> 00:50:32,480
this in class yesterday obviously this is not a query you would run in CMU because probably it

497
00:50:32,480 --> 00:50:38,719
comes out empty everyone gets an aid I'm just kidding but here we are selecting records that

498
00:50:38,719 --> 00:50:46,159
fit this criteria ordering it by the column ID and then selecting this distinct so it's a very simple

499
00:50:46,159 --> 00:50:52,079
aggregate we will bring group buys in in a little bit distinct count IDs is an aggregate and we'll

500
00:50:52,079 --> 00:50:56,559
see how we can do that with a sort based method and we'll also see the hash based version after that

501
00:50:57,440 --> 00:51:01,920
so first thing we'll do in the square E3 I'm not going to draw that tree as you saw before but this

502
00:51:01,920 --> 00:51:06,880
is the bottom level of the tree you apply the selection on this table and you keep just the records

503
00:51:06,880 --> 00:51:12,800
that have B's and C's now you go to that second operator in that tree which is to project and remove

504
00:51:12,800 --> 00:51:17,039
the columns keeping just the column ID so just this column that's what you produce at that second

505
00:51:17,039 --> 00:51:22,960
operator in that query tree and then we sort it and you can use external sort merge if this file

506
00:51:22,960 --> 00:51:27,360
were really large I know it's a small example here four records but imagine it were four million

507
00:51:27,440 --> 00:51:31,840
you would sort that using external memory if you didn't have enough space in the buffer pool

508
00:51:31,840 --> 00:51:37,120
it's a small file you'll sort it using an memory sort regardless you get a sorted output and now what

509
00:51:37,120 --> 00:51:43,120
you can do is to eliminate the duplicates just scan over this file from top to bottom and only

510
00:51:43,120 --> 00:51:48,960
output the values ones that you see so here we'll output four four five the first record skip over

511
00:51:48,960 --> 00:51:53,599
the second one because it's duplicate the duplicates will always be next to each other so at any point

512
00:51:53,599 --> 00:51:58,400
in time you just remember output this value remember that value go to the next record if it's

513
00:51:58,400 --> 00:52:05,119
the same value skip over okay this is a little optimization you can do this idea of skipping stuff

514
00:52:06,000 --> 00:52:11,920
of having dropped this if you go back to where we were many slides ago with that merge tree up

515
00:52:11,920 --> 00:52:17,679
over here you could imagine that you could fold in some of that optimization to this level imagine

516
00:52:17,679 --> 00:52:23,119
you had to do a distinct on the keys here and imagine instead of this two there was a three here

517
00:52:24,079 --> 00:52:27,920
and there was another and what you could do at that point when you're doing this merge you could

518
00:52:27,920 --> 00:52:31,599
have written the three only ones you can have dropped that tree earlier because you're just looking

519
00:52:31,599 --> 00:52:37,279
for distinct so if new you were doing sorting to do distinct you can actually go change the core

520
00:52:37,279 --> 00:52:42,480
sort algorithm to do that distinct earlier using essentially that same ideas that when you have

521
00:52:42,480 --> 00:52:49,360
distinct you just need to keep one copy of that record and you could push that optimization that

522
00:52:49,360 --> 00:52:56,079
we just saw here on this slide where we skipped over that second duplicate value up ahead in that

523
00:52:56,079 --> 00:53:02,320
operator tree so now you can see if I can unpack the full semantics of the SQL query in the operator

524
00:53:02,320 --> 00:53:07,760
that same external sort merge operator that we are looking at I can actually modify that operator

525
00:53:07,760 --> 00:53:15,680
within the context of the rest of the query and do even better okay now as I started earlier on

526
00:53:15,679 --> 00:53:20,879
and told you that you'll see this duality between sort based methods and hash based methods and

527
00:53:20,879 --> 00:53:27,919
it's like the sibling library that happens we now can start to unpack that and look at aggregation

528
00:53:28,480 --> 00:53:34,000
and look at the hash based aggregation so imagine we don't need the data to be ordered because

529
00:53:34,000 --> 00:53:39,519
we have a group by order distinct right so that opens up the chance to go use a hash based aggregation

530
00:53:40,079 --> 00:53:45,440
and hashing is nearly always going to be a better alternative in this scenario okay

531
00:53:45,440 --> 00:53:49,760
when it may not be a better option is that if I have a B3 that is built on the group by column

532
00:53:49,760 --> 00:53:55,039
because I could and it's a clustered B3 I could potentially use that and get a faster operation

533
00:53:55,039 --> 00:54:00,079
and again and optimize if we consider that so in a hash based aggregate I'm just going to go

534
00:54:00,079 --> 00:54:04,639
through this with an example it's going to be two phases divide and conquer in the divide phase we

535
00:54:04,639 --> 00:54:10,639
are going to break up the file partition it into two two more pieces and then we want each piece to be

536
00:54:10,639 --> 00:54:14,960
processed individually to get the final answer and we want each of those partitions to be small enough

537
00:54:15,039 --> 00:54:20,000
that we can do things with it in memory right files too big to fit in memory break it up into small

538
00:54:20,000 --> 00:54:25,679
parts so that each small part can be worked on in memory so breaking up is the first phase rehashing

539
00:54:25,679 --> 00:54:30,000
which is working on each of those partition in this case is going to be that second phase that you

540
00:54:30,000 --> 00:54:38,400
work in memory okay so we'll use the two hash functions h1 and h2 we'll assume we've got B buffer pages

541
00:54:39,039 --> 00:54:42,559
and now for this hash based aggregation we'll have to keep one page for the output

542
00:54:43,279 --> 00:54:48,239
and we'll start in the following way so assume this query where we have to do this distinct core

543
00:54:48,239 --> 00:54:54,079
side I don't have a group byte but just hold on to that this example is simplified and there are

544
00:54:54,079 --> 00:55:00,079
again optimizations you could do here to fold in some early elimination of distinct values but

545
00:55:01,119 --> 00:55:05,679
don't worry about it in this example it's an inefficient example but just to show you how

546
00:55:05,679 --> 00:55:09,679
hashing works okay after you look at it this side multiple times you'll say I could have done this

547
00:55:09,679 --> 00:55:15,359
hashing earlier but just to show a partition phase while keeping the same type of example we had

548
00:55:15,359 --> 00:55:20,480
before for the sort based stuff so now we have a whole bunch of records here assume that there are

549
00:55:20,480 --> 00:55:26,879
lots of lots more data in here and we'll apply the filter we get a file it has these four records but

550
00:55:26,879 --> 00:55:32,559
also a lot more here because now a data is much larger and we'll remove the columns we get a long

551
00:55:32,559 --> 00:55:39,119
list of column IDs again assume that's really big and it can't fit in memory now we'll apply

552
00:55:39,119 --> 00:55:45,759
a hash function to create different partition files we'll create b-1 partition files so we'll

553
00:55:45,759 --> 00:55:52,719
bring in a record we'll use one buffer page for the input we'll allocate b-1 pages for the

554
00:55:52,719 --> 00:55:59,199
b-1 output partition files as we read a record we'll apply the hash function put it into the

555
00:55:59,199 --> 00:56:03,839
output buffer page for that partition as that fills up we will write it to disk we just need

556
00:56:03,840 --> 00:56:09,920
one output page for each partition but the end of it what we end up having is we'll have a whole

557
00:56:09,920 --> 00:56:14,800
bunch of pages in the first partition I'm just showing one here but there could be a whole bunch as

558
00:56:14,800 --> 00:56:24,160
that spills over and we'll break up the input file in this case column IDs into b-1 chunks

559
00:56:24,160 --> 00:56:32,160
partitions where in each partition all the keys have the property that if they they hashed the same

560
00:56:32,159 --> 00:56:37,440
value using this h1 function and why is that important because if I've got two duplicates like

561
00:56:37,440 --> 00:56:42,719
here I've got a duplicate here and a duplicate here a duplicate if I apply the same hash function

562
00:56:42,719 --> 00:56:49,119
will hash to the same position always will hash to bucket 0 the partition 0 here and hence I

563
00:56:49,119 --> 00:56:54,799
will bring all the duplicates together so that's my divide strategy and the second part all I do

564
00:56:54,799 --> 00:57:00,000
is process each partition to eliminate duplicates I'm guaranteed because I've applied h1 here for

565
00:57:00,000 --> 00:57:07,039
partitioning that if two records are the same they will be in the same partition so by dividing

566
00:57:07,039 --> 00:57:12,639
the file into smaller pieces these partitions and then processing each partition individually for

567
00:57:12,639 --> 00:57:18,719
that piece we use an in-memory algorithm we are guaranteed we've done the entire operation efficiently

568
00:57:19,440 --> 00:57:26,400
in this two passes partition pass and then in merge pass and then a rehash pass okay so that's

569
00:57:26,400 --> 00:57:30,320
the second page in that partition as we are scanning through it just showing that partition can have

570
00:57:30,320 --> 00:57:35,840
multiple pages so now in this rehash will apply a second hash function let's go and see visually what

571
00:57:35,840 --> 00:57:44,000
that looks like so imagine these are pages that we've got across all these partitions so that first

572
00:57:44,000 --> 00:57:49,519
partition has two pages and then we've got a bunch of other partitions that are in here as we pull

573
00:57:49,519 --> 00:57:56,320
that in we will apply the hash function and so we will take the first record put that into that

574
00:57:56,320 --> 00:58:01,599
in-memory hash table then when we take the second record and apply a hash function to a disordered

575
00:58:01,599 --> 00:58:05,679
there so we'll just toss it out that's how we're eliminating duplicates because it's hashing to

576
00:58:05,679 --> 00:58:13,119
the same value at the end when we are done sorry in this example this is the second page in that

577
00:58:13,119 --> 00:58:20,079
same partition so we'll hash that here so we are still in the first partition and you put that

578
00:58:20,079 --> 00:58:24,799
into the hash table and at the end of it when you're done processing all the records in that partition

579
00:58:24,799 --> 00:58:29,359
we will output the results look through the hash table anything that is a value will fill that up

580
00:58:29,920 --> 00:58:35,119
so we're done with processing all the records in this partition now we'll clear up the hash table

581
00:58:35,839 --> 00:58:40,000
then do the same thing again for records in the other partition and output those keep upending

582
00:58:40,079 --> 00:58:45,679
to this final result so second partition that we are starting to process clear up the hash table

583
00:58:46,559 --> 00:58:52,480
use that space now to do the same thing as we did before that rehash function and keep doing that

584
00:58:52,480 --> 00:58:58,960
till you've done with all the partitions okay so very simple divide and conquer where you first

585
00:58:58,960 --> 00:59:02,960
break it up into partitions so this is the first partition this is the second partition and

586
00:59:02,960 --> 00:59:09,760
they'd be many more because when you apply h1 all the records that have duplicates will hash to

587
00:59:09,760 --> 00:59:15,840
the same bucket because of that in this case four for five records and that way your guaranteed

588
00:59:15,840 --> 00:59:23,040
you can eliminate duplicates okay and in this case if you've gotten the partition right so one question

589
00:59:23,040 --> 00:59:28,560
might arise is hey what happens if let's say this partition had a lot of duplicate values and

590
00:59:28,560 --> 00:59:33,600
this hash table doesn't fit in memory what would you do at that point you could do one of several things

591
00:59:33,679 --> 00:59:39,519
you could take this partition and re partition it or what you could do as you could say

592
00:59:40,400 --> 00:59:48,000
there are too many records over here if I haven't output any records already I can take this partition

593
00:59:48,880 --> 00:59:53,679
and I can use a sort based algorithm for this partition so you can mix and match some you

594
00:59:53,679 --> 00:59:58,400
apply the first space of partition everything using a hash function but each individual partition

595
00:59:58,400 --> 01:00:03,039
you could decide whether they're going to use a hash based approach for eliminating duplicates or you

596
01:00:03,039 --> 01:00:08,239
could use a sort based approach and many times when you've created the partition you know how many

597
01:00:08,239 --> 01:00:12,719
keys there are in each of the partition files so you could decide how to choose but they also adaptive

598
01:00:12,719 --> 01:00:17,119
techniques that can adapt on the fly the advanced database course talks about that but just want you

599
01:00:17,119 --> 01:00:23,360
to be aware that sometimes you may need to deal with overflows of the data structure because

600
01:00:23,360 --> 01:00:30,559
hashing is not perfect and it may be that when we were doing h1 or the data is such that a lot of

601
01:00:30,639 --> 01:00:35,599
duplicates are there a lot of values that map to the first partition you go first partition here

602
01:00:35,599 --> 01:00:40,400
that you might have to do something else when you start to do the rehash the rehash table

603
01:00:40,400 --> 01:00:45,519
hash table doesn't fit in memory but there are details just want to be aware that you may need to do

604
01:00:45,519 --> 01:00:54,719
something else and you can look things up if you need to if you hit that case all right so essentially

605
01:00:55,439 --> 01:01:01,679
we've looked at how we can do hashing using sort based and hash based methods now let's cover this

606
01:01:01,679 --> 01:01:06,879
last scenario and aggregation but the aggregation is a little bit more complex you know instead of

607
01:01:06,879 --> 01:01:11,279
the distinct count which is the simplest aggregate you can think of you've got a group by

608
01:01:11,279 --> 01:01:17,839
this is a join and then we are computing the average so now in this case imagine we are creating

609
01:01:17,839 --> 01:01:24,000
the buckets as we did before we applying the hash function as we did before you know ignore how we

610
01:01:24,000 --> 01:01:29,199
did the h1 stuff before the first phase that's exactly the same as before what matters is in that

611
01:01:29,199 --> 01:01:35,760
rehash phase when we are processing each individual partition we will store now in the hash table

612
01:01:35,760 --> 01:01:42,559
not just the key but also a value in this case if I've got two records in that first partition

613
01:01:43,119 --> 01:01:49,280
and they have two different GPAs right what I store in the value is the running count of how many

614
01:01:49,280 --> 01:01:56,560
records have hashed to this value how many 445 records I've seen too what's the running sum of those

615
01:01:56,560 --> 01:02:03,920
GPAs 7.2 because I'm computing an average if instead I just stored the average here I would be

616
01:02:03,920 --> 01:02:08,800
averaging the averages in a continuous form and that's not precise average of averages is not the

617
01:02:08,800 --> 01:02:14,320
true average and so here we'll do the sum and the count as two different things we keep around and

618
01:02:14,320 --> 01:02:18,400
when we are done with scanning all the records in that partition we'll output the aggregate by

619
01:02:18,400 --> 01:02:24,559
dividing this value 7.32 by the count which is two and after the correct average so two things

620
01:02:24,559 --> 01:02:30,639
are happening a hash table now has the key and a value the second is the value may not be the final

621
01:02:30,639 --> 01:02:36,400
value but maybe some intermediate running data structure that allows us to calculate the final value

622
01:02:36,400 --> 01:02:43,840
as you can see with average okay now of course if the aggregate is of average it will min then what

623
01:02:43,840 --> 01:02:47,680
we put in the value space would just be min because min of min is guaranteed to be min

624
01:02:47,759 --> 01:02:54,159
same thing with maximum count averages different databases often also support statistical aggregates

625
01:02:54,159 --> 01:02:59,759
like median and mode and the different ways of dealing with that here take the advanced database class

626
01:03:00,399 --> 01:03:05,199
we talk about how do you deal with most sophisticated statistical aggregation and what are their

627
01:03:05,199 --> 01:03:09,679
properties when is something easy when is something hard and in some cases you have to keep all the

628
01:03:09,679 --> 01:03:14,319
values around and that is complicated but the ways of trying to work around that or to at least

629
01:03:14,320 --> 01:03:20,880
reduce the effect of that statistical aggregates are present in database systems you can ask for

630
01:03:20,880 --> 01:03:25,680
those in SQL and they will require some additional modification and that's the main thing we want you

631
01:03:25,680 --> 01:03:32,800
to know in this material all right so in this case final result is being outputted for that average

632
01:03:32,800 --> 01:03:38,800
pretty straightforward and so with that we conclude today's lecture hopefully you've seen that

633
01:03:39,760 --> 01:03:44,560
there's a huge emphasis database systems on these operator algorithms that work with large amounts

634
01:03:44,560 --> 01:03:49,519
of data even when it doesn't fit in memory they require a rethinking of basic algorithms that you

635
01:03:49,519 --> 01:03:53,519
might think you already know and there are all kinds of interesting optimizations that you can bring

636
01:03:53,519 --> 01:03:58,560
to the table and the jury is not yet completely done on can you optimize it more the answer is yes

637
01:03:58,560 --> 01:04:03,200
people are constantly making all kinds of supple and interesting changes especially as you start

638
01:04:03,200 --> 01:04:07,920
moving things to the cloud you have new hardware that changes a lot of the trade-offs and opens up

639
01:04:07,920 --> 01:04:15,440
opportunities for new algorithmic innovations we saw that there are hash and sort-based methods

640
01:04:15,440 --> 01:04:21,200
that duality between these two methods will continue as we go into the next lecture and we start

641
01:04:21,199 --> 01:04:23,199
talking about joins and other algorithms

