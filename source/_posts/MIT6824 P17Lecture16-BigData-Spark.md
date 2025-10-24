---
title: MIT6824 P17Lecture16 BigData Spark
---

1
00:00:00,000 --> 00:00:04,000
we're talking about is Spark.

2
00:00:04,000 --> 00:00:08,480
And so this goes back to almost the beginning of the semester.

3
00:00:08,480 --> 00:00:11,200
We talked a quite a bit about MapReduce.

4
00:00:11,200 --> 00:00:15,839
In fact, you implement MapReduce.

5
00:00:15,839 --> 00:00:21,359
So really, what's informally Spark is basically

6
00:00:21,359 --> 00:00:28,879
the successor to Hadub.

7
00:00:28,879 --> 00:00:38,719
And Hadub is the sort of open-source version of MapReduce.

8
00:00:38,719 --> 00:00:46,799
So I think today people typically will use Spark instead of Hadub.

9
00:00:46,799 --> 00:00:48,320
And so it's really widely used.

10
00:00:52,799 --> 00:00:56,039
And it's widely used for data science computation.

11
00:00:56,039 --> 00:00:58,679
So people that have lots and lots of data

12
00:00:58,679 --> 00:01:01,479
that need to run some computation over it, require

13
00:01:01,479 --> 00:01:03,320
ton of machines.

14
00:01:03,320 --> 00:01:08,039
Spark is designed for that particular case.

15
00:01:08,039 --> 00:01:10,280
It is commercialized by a company called Databricks.

16
00:01:14,039 --> 00:01:17,480
Matei Sahariya, who is the main offer of this paper,

17
00:01:17,480 --> 00:01:21,079
his PhD thesis started with a number of other people

18
00:01:21,079 --> 00:01:25,879
with company Databricks, which commercializes Spark.

19
00:01:25,879 --> 00:01:33,079
But it also supports the Apache open-source Spark version.

20
00:01:33,079 --> 00:01:36,359
There's a pretty popular open-source project,

21
00:01:36,359 --> 00:01:39,480
or very popular open-source project.

22
00:01:39,480 --> 00:01:44,680
It is, one reason has replaced the use of Adub is because it's

23
00:01:44,680 --> 00:01:49,400
actually supports a wider range of applications

24
00:01:49,400 --> 00:01:52,520
that is MapReduce.

25
00:01:52,520 --> 00:01:57,160
And the particular is going to be very good at these iterative

26
00:01:57,160 --> 00:01:57,800
what happened there.

27
00:02:01,000 --> 00:02:04,360
Let me see something that will be next year or no crash.

28
00:02:04,360 --> 00:02:05,160
Hold on a second.

29
00:02:19,400 --> 00:02:35,400
Okay.

30
00:02:35,400 --> 00:02:37,400
Okay.

31
00:02:37,400 --> 00:02:41,400
Fortunately, I have a good check.

32
00:02:41,400 --> 00:02:45,400
Okay, so it supports a wider range of applications.

33
00:02:45,400 --> 00:02:47,400
And the particular is good at these iterative applications.

34
00:02:47,400 --> 00:02:51,400
So applications were multiple rounds of MapReduce operations.

35
00:02:51,400 --> 00:02:55,400
So if you have an application that requires sort of one set of MapReduce,

36
00:02:55,400 --> 00:02:57,400
followed by another set of MapReduce, followed by another MapReduce,

37
00:02:57,400 --> 00:02:59,400
followed by another series of competition, Spark is really good at it.

38
00:02:59,400 --> 00:03:03,400
And the reason it's so good at it is because basically it keeps the intermediate results in memory.

39
00:03:03,400 --> 00:03:07,400
And that's really good support, programming support for doing so.

40
00:03:07,400 --> 00:03:15,400
And in some ways, if there's any connection at all between the previous paper and this paper,

41
00:03:15,400 --> 00:03:25,400
which basically is not, but they're all both targeted to sort of in memory competitions.

42
00:03:25,400 --> 00:03:31,400
For data sets that basically fit in memory, in the previous paper,

43
00:03:31,400 --> 00:03:35,400
and the farm paper is all about the database fitting in memory.

44
00:03:35,400 --> 00:03:41,400
Here is the data set of the data science competition for the data science competition that you want to do.

45
00:03:41,400 --> 00:03:47,400
Of course, since 2012, when you were this paper was published, a lot of things didn't happen.

46
00:03:47,400 --> 00:03:55,400
The Spark is not really tight to Scala, as I sort of described in this paper,

47
00:03:55,400 --> 00:03:57,400
but there are other language frontends, for example.

48
00:03:57,400 --> 00:04:10,400
But probably more importantly, the RDDs, as defined in this paper, are slightly deprecated and replaced by data frames.

49
00:04:10,400 --> 00:04:18,399
But data frames, the way to think about it, the way I think about it, is basically column is an RDD with explicit columns.

50
00:04:18,399 --> 00:04:24,399
And all the good ideas of RDDs are also true for data frames.

51
00:04:24,399 --> 00:04:28,399
And so from the rest of the lecture, I'm just going to talk about RDDs,

52
00:04:28,399 --> 00:04:36,399
and think about them as equivalently to data frames.

53
00:04:36,399 --> 00:04:46,399
Any questions before I proceed?

54
00:04:46,399 --> 00:04:50,399
And then quick out of point, maybe this research is really quite successful.

55
00:04:50,399 --> 00:05:00,399
And you're certainly going to use, also, but they're going to receive the ACM Doctoral Feuses award for it.

56
00:05:00,399 --> 00:05:04,399
Or it is feces that basically is all about Spark.

57
00:05:04,399 --> 00:05:16,399
So it's quite unusual, actually, for, you know, doctoral feces that have that kind of impact.

58
00:05:16,399 --> 00:05:18,399
Okay.

59
00:05:18,399 --> 00:05:28,399
So the way I want to talk about Spark is by just looking at the, so many examples, because I think you get the best.

60
00:05:28,399 --> 00:05:32,399
You understand the programming model.

61
00:05:32,399 --> 00:05:40,399
And that is based on RDDs, best by just, I think, looking at examples.

62
00:05:40,399 --> 00:05:44,399
And you get the best idea of what actually an RDD is.

63
00:05:44,399 --> 00:05:48,399
So let me pull up some of the examples that are in the paper.

64
00:05:48,399 --> 00:05:52,399
And then we'll walk through those.

65
00:05:52,399 --> 00:05:56,399
So let's start here.

66
00:05:56,399 --> 00:05:58,399
Very simple example.

67
00:05:58,399 --> 00:06:02,399
And so, you know, the idea is that.

68
00:06:02,399 --> 00:06:08,399
In this example is, you know, first of all, you can sort of use.

69
00:06:08,399 --> 00:06:14,399
Spark interactively, you can see that they start up Spark in your workstation, where you're locked up.

70
00:06:14,399 --> 00:06:18,399
And start interacting with Spark.

71
00:06:18,399 --> 00:06:22,399
And then the way, you know, you can type in commands like this.

72
00:06:22,399 --> 00:06:24,399
And so, what does this command do?

73
00:06:24,399 --> 00:06:32,399
You know, this basically creates an RDD, you know, called, this is RDDs, lines is an RDD.

74
00:06:32,399 --> 00:06:36,399
And it just represents the RDD that actually stored in HTFS.

75
00:06:36,399 --> 00:06:44,399
And you know, the HTFS, you know, might be have money, partitions, you know, for this particular file.

76
00:06:44,399 --> 00:06:53,399
And then, you know, the first, you know, thousands of million records, they're on like partition one, the next million living partition two and the next male live to in partition three.

77
00:06:53,399 --> 00:07:00,399
And this RDD, lines basically represents, you know, that, that set of petitions.

78
00:07:00,399 --> 00:07:07,399
When you run this line, where you type in this line, and you return, hit return, basically nothing really happens.

79
00:07:07,399 --> 00:07:11,399
And so this is what the paper refers to as lazy computations.

80
00:07:11,399 --> 00:07:15,399
In fact, the computation is executed some point later and see in the second one.

81
00:07:15,399 --> 00:07:24,399
But at this particular point, the only thing that actually happened is that there is a line, lines object that happens to be an RDD.

82
00:07:24,399 --> 00:07:30,399
And an RDD, you know, supports sort of a wide range of operations.

83
00:07:30,399 --> 00:07:34,399
We can actually look in a little bit at some of the operations that supports.

84
00:07:34,399 --> 00:07:41,399
Yeah, so it just as an RDD has an API.

85
00:07:41,399 --> 00:07:47,399
And it turns out that the methods on the API or the methods on the RDD follow to two classes.

86
00:07:47,399 --> 00:07:56,399
One, RDD, our actions and actions are really operations that will actually cause computation to happen.

87
00:07:56,399 --> 00:08:01,399
And so all the lazily sort of build up computation really happens at the point that you run an action.

88
00:08:01,399 --> 00:08:09,399
And that's an example you run count to collect, then the, the, the, the spark computation action is executed.

89
00:08:09,399 --> 00:08:14,399
All the other API or methods are transformations.

90
00:08:14,399 --> 00:08:18,399
And they basically take one RDD and turn it into another RDD.

91
00:08:18,399 --> 00:08:23,399
It turns out that every RDD is actually read only or immutable.

92
00:08:23,399 --> 00:08:26,399
So you can't modify an RDD.

93
00:08:26,399 --> 00:08:31,399
You can only basically generate new RDDs for an existing one.

94
00:08:31,399 --> 00:08:37,399
And so if we look at the second line, this basically creates a second RDD, the RDD errors.

95
00:08:37,399 --> 00:08:44,399
And that one is created by running a filter on the lines RDD.

96
00:08:44,399 --> 00:08:52,399
So the lines are the reason we don't need, if we don't need the, you can run this method to filter on it, in which in this case basically filters out.

97
00:08:52,399 --> 00:08:58,399
All the records that start with, or all the lines that start with the message error with a string error.

98
00:08:58,399 --> 00:09:01,399
And that really represents a new RDD.

99
00:09:01,399 --> 00:09:04,399
And again, at this point, nothing actually is really being computed.

100
00:09:04,399 --> 00:09:20,399
It's usually like a recipe or a built over like almost like a data flow or what the paper calls a linear graph off the computation.

101
00:09:21,399 --> 00:09:30,399
Also, when the computation actually starts running, it hasn't run yet, but when it will start running, these operations are pipeline.

102
00:09:30,399 --> 00:09:44,399
And with that, they mean that, so for example, in stage one, you know, the, this computation of the lines, the stage one will read some set of records, you know, from this first partition.

103
00:09:45,399 --> 00:09:54,399
And then do its processing on it, if there's anything and then the hand it off to stage two, you know, which is stage two is basically doing this filter.

104
00:09:54,399 --> 00:10:06,399
And so in stage two, you know, the, the, this filter will run and so grab out the lines that actually are that match.

105
00:10:07,399 --> 00:10:17,399
And then you know, basically produce with that new RDD that just contains, you know, the lines, you know, strings with that start with lines that start with the string error.

106
00:10:17,399 --> 00:10:25,399
And while the sort of second RDD or second stage runs, you know, the first stage, you know, grabs the next set of records from the file system.

107
00:10:25,399 --> 00:10:27,399
And then you know, feeds them again to states to.

108
00:10:27,399 --> 00:10:33,399
And so as you go further further, you have more and more stages in your pipeline or your, your.

109
00:10:33,399 --> 00:10:45,399
Linus graph, you know, all those stages are going to be running in sort of parallel and that's what I mean with like sort of pipelining the transformations.

110
00:10:46,399 --> 00:10:47,399
Okay, so.

111
00:10:48,399 --> 00:10:57,399
So here this, so this, you know, this line basically describes how to create the RDD error, the RDD errors, RDD.

112
00:10:57,399 --> 00:11:08,399
And then this line basically says like, tell Spark to basically keep a copy of this RDD in memory. So a subsequent.

113
00:11:08,399 --> 00:11:11,399
Compotations run that you know, do more stuff with errors.

114
00:11:11,399 --> 00:11:16,399
Spark will actually keep the original RDD actually in memory.

115
00:11:16,399 --> 00:11:22,399
So that it can be shared with later computation. So, for example, we wanted to reuse the error file.

116
00:11:22,399 --> 00:11:34,399
Then, you know, that error file will be in memory. It doesn't have to be reconstructed from the files that represent the native HDFS and allows you to run the second computation.

117
00:11:34,399 --> 00:11:43,399
And here, for example, one already, you know, even in this simple example, you see those are sort of a big difference between this and reproduce where can the macraduce job.

118
00:11:43,399 --> 00:11:55,399
You know, you run the computation, it ends. And then if you want to read, you know, redo something with the data, you have to re-read it in from the file system and using this sort of persistent method.

119
00:11:55,399 --> 00:12:02,399
Spark can avoid, you know, having to re-read that data from the disk and you know, save a lot of time.

120
00:12:05,399 --> 00:12:07,399
Any questions so far?

121
00:12:07,399 --> 00:12:16,399
So when the error file gets extracted from p1, let's say, and then there's another error file that gets extracted from p2.

122
00:12:16,399 --> 00:12:18,399
So my understanding is that this happened in parallel.

123
00:12:18,399 --> 00:12:19,399
Yes.

124
00:12:19,399 --> 00:12:24,399
So you can think about it like, you know, there's going to be many worker, like in the macraduce.

125
00:12:24,399 --> 00:12:27,399
And the workers work on each partition.

126
00:12:27,399 --> 00:12:33,399
So basically, you know, the scheduler will send a job, you know, through each of the workers.

127
00:12:33,399 --> 00:12:38,399
And a job is sort of task, you know, pertains to a particular partition.

128
00:12:38,399 --> 00:12:45,399
And the worker start working on one of these tasks and basically start running.

129
00:12:45,399 --> 00:12:51,399
So you get parallelism between the petitions and you get parallelism between the stages into pipeline.

130
00:12:51,399 --> 00:12:53,399
Hi, Steve.

131
00:12:53,399 --> 00:12:55,399
Thank you.

132
00:12:55,399 --> 00:12:58,399
So, what's the.

133
00:12:58,399 --> 00:12:59,399
So, can you hear me?

134
00:12:59,399 --> 00:13:05,399
What's the difference between the lineage and the like, just the log of transactions that we've seen before?

135
00:13:05,399 --> 00:13:09,399
Like, is it just the granularity of the operations?

136
00:13:09,399 --> 00:13:12,399
So we'll see lineage, you know, log is strictly linear.

137
00:13:12,399 --> 00:13:13,399
Right.

138
00:13:13,399 --> 00:13:21,399
And the examples that we've seen so far, the, the, the, the lineage is also linear, but we'll see later examples where, you know, we have four.

139
00:13:21,399 --> 00:13:25,399
And we're one stage depends on multiple.

140
00:13:25,399 --> 00:13:31,399
Different RDDs and, you know, not just not represented in a log, right?

141
00:13:31,399 --> 00:13:38,399
You know, there's share some similarities in the sense that like you started in the beginning state, only operations are deterministic.

142
00:13:38,399 --> 00:13:44,399
And then you will end up in some, and if you apply all those operations, you will end in some deterministic and state.

143
00:13:44,399 --> 00:13:50,399
So in that sense, you know, there's some similarity, but I think the, you know, they're quite different.

144
00:13:51,399 --> 00:13:53,399
I also have a question.

145
00:13:53,399 --> 00:13:54,399
Yeah.

146
00:13:54,399 --> 00:13:55,399
Filter.

147
00:13:55,399 --> 00:14:04,399
It just, so it works by just the blind filter on each partition, but sometimes like I see the transformations also contain join or sort.

148
00:14:04,399 --> 00:14:08,399
Yeah, yeah, let's talk about this a little bit. I'll talk about sort and join in a second.

149
00:14:08,399 --> 00:14:09,399
Yeah.

150
00:14:09,399 --> 00:14:13,399
They're clear much more complicated.

151
00:14:13,399 --> 00:14:19,399
So is, do we, like, this persists is when we start like computing?

152
00:14:19,399 --> 00:14:25,399
No, nothing has been computed yet. You're still all the descriptions. So let's talk a little bit further.

153
00:14:25,399 --> 00:14:30,399
Let's look at actually something that actually generates a computation.

154
00:14:30,399 --> 00:14:32,399
So.

155
00:14:32,399 --> 00:14:38,399
So here are two commands that actually result in computation.

156
00:14:38,399 --> 00:14:44,399
So this commands will result in computation because it contains count, which is an action.

157
00:14:44,399 --> 00:14:50,399
And this command will result in a competition, collect is an action.

158
00:14:50,399 --> 00:14:52,399
And so.

159
00:14:52,399 --> 00:15:01,399
And so you can, and so really look at literally, and so the reason that they show two commands is because to demonstrate that they can reuse errors.

160
00:15:01,399 --> 00:15:04,399
And so if you look at this.

161
00:15:04,399 --> 00:15:13,399
A computation, then you can draw the lineage graph, right? So the start with lines.

162
00:15:13,399 --> 00:15:19,399
That was a filter that we ran.

163
00:15:19,399 --> 00:15:28,399
Oops, sorry, let me write this like you differently. There was a filter in lines that we just saw that produces errors.

164
00:15:28,399 --> 00:15:34,399
Or that's the description how to get errors. Then there's an in this case, there's another filter.

165
00:15:34,399 --> 00:15:37,399
It's the filter on HTFS.

166
00:15:37,399 --> 00:15:42,399
And that basically produces another RDD, you know, that RDD is not explicitly named here.

167
00:15:42,399 --> 00:15:47,399
But you know, it does produce another RDD. So I'm just going to call it HTFS.

168
00:15:47,399 --> 00:15:50,399
Because it filters on HTFS.

169
00:15:50,399 --> 00:15:54,399
And then we see there's a map.

170
00:15:54,399 --> 00:16:02,399
And that produces yet another RDD. Again, this RDD doesn't really have a name here, but so anonymous.

171
00:16:02,399 --> 00:16:06,399
But I'm just going to give it the name. That's time.

172
00:16:06,399 --> 00:16:16,399
Because it basically splits the wider line into three pieces and graphs the first piece out of that line. And that happens to be the time.

173
00:16:16,399 --> 00:16:21,399
And then there's a final operation.

174
00:16:21,399 --> 00:16:27,399
So this is actually a result of the RDD produced in the time RDD.

175
00:16:27,399 --> 00:16:39,399
Okay. So this. So this is actually at this point when you know the return to return here in the user interface or in the interactive user interface.

176
00:16:39,399 --> 00:16:45,399
It is an at that point, basically, spark.

177
00:16:45,399 --> 00:16:51,399
Now we'll collect a lot of a set of workers.

178
00:16:51,399 --> 00:16:58,399
Split, send them the jobs or basically inform the scheduler that the job needs to be executed.

179
00:16:58,399 --> 00:17:03,399
And the description of the task that needs to be executed is this linear scrap.

180
00:17:03,399 --> 00:17:22,400
And so we can sort of think a little bit about exactly how the execution happens. So let me draw a picture.

181
00:17:22,400 --> 00:17:27,400
And so the picture is just follows because there's what's called the driver does the user thing.

182
00:17:27,400 --> 00:17:31,400
And the program that the user typed into.

183
00:17:31,400 --> 00:17:38,400
It starts off collecting a bunch of workers, you know, a bunch of machines.

184
00:17:38,400 --> 00:17:43,400
One with the same way, like as in map produce.

185
00:17:43,400 --> 00:17:55,400
And you know, there's going to be an HDVS. There's this lines file that actually has partitions, so p1, p2, whatever.

186
00:17:55,400 --> 00:17:59,400
And typically the number of petitions is larger than the number of workers.

187
00:17:59,400 --> 00:18:03,400
I'm sorry, the number of yes, the number of petitions is larger than the number of workers.

188
00:18:03,400 --> 00:18:06,400
You know, you know, gets low balance.

189
00:18:06,400 --> 00:18:12,400
If like one petition small and the other one is big, you know, you don't want to have workers lying sitting around idle.

190
00:18:12,400 --> 00:18:18,400
And basically the scheduler, you know, the scheduler.

191
00:18:18,400 --> 00:18:25,400
That runs, you know, basically the computation that X has the information that has the lineage graph.

192
00:18:25,400 --> 00:18:31,400
And so work is basically checking the driver X sensing the code.

193
00:18:31,400 --> 00:18:34,400
The spark program, and I would just construct it.

194
00:18:34,400 --> 00:18:39,400
And then the work is going to go basically to the schedule and say, please, you know, which petition should I work.

195
00:18:39,400 --> 00:18:46,400
And then they run basically a part of the pipelines.

196
00:18:46,400 --> 00:18:49,400
And so we look at this, let me actually draw this slightly differently.

197
00:18:49,400 --> 00:18:52,400
So a little bit more space here.

198
00:18:52,400 --> 00:18:55,400
So we saw there's a whole bunch of stages.

199
00:18:55,400 --> 00:19:02,400
And then the last stage was the, the last operation was to collect stage.

200
00:19:02,400 --> 00:19:14,400
So in this, in this scenario that we just looked at the collect stage, of course, needs to collect data from all the petitions.

201
00:19:14,400 --> 00:19:24,400
So we, in principle, you know, draw the green line, you know, basically everything of this, you know, sort of executed on an independent partition.

202
00:19:24,400 --> 00:19:35,400
So every worker gets one of these tasks from the scheduler runs, you know, the thing that produces in the end on time.

203
00:19:35,400 --> 00:19:48,400
RDD, and when this kind of scalar, you know, determines that basically all the time, you know, like all these stages, this is called the stage.

204
00:19:48,400 --> 00:19:59,400
If all the stages have completed, and so all the time our petitions have reproduced, then it actually will run, you know, the collect action to basically do the addition.

205
00:19:59,400 --> 00:20:10,400
And you know, retrieve information from every petition to actually complete the collect or actually this is not collect into its account.

206
00:20:10,400 --> 00:20:15,400
Sorry about that.

207
00:20:15,400 --> 00:20:28,400
And so one sort of thing to think about this is that this is sort of like, almost like a map reduce where you have the map phase and then you have a sort of a shuffle and then you run the reduced phase and.

208
00:20:28,400 --> 00:20:39,400
The count is almost similar in that fashion and in the paper, the way they refer to this is to this dependency before there's a white dependency.

209
00:20:39,400 --> 00:21:06,400
Because the action or the transformation is dependent on a number of petitions and these are called narrow particular narrow dependencies because this RDD to make that RDD is only dependent on one other only at the only dependent on the parent partition only one parent partition to actually be able to compute it.

210
00:21:06,400 --> 00:21:17,400
And generally, you would prefer a competition that can have narrow dependencies because they can just run locally without any communication before white dependency, you might have to collect.

211
00:21:17,400 --> 00:21:26,400
You might have to collect petitions from the parent or you may have to collect petitions from the parent RDD from all the machines.

212
00:21:26,400 --> 00:21:44,400
Professor, yeah, I had a question. So in the paper, it says narrow dependencies where each partition of the parent RDD is used by the most one partition of the child RDD.

213
00:21:44,400 --> 00:22:01,400
But it doesn't say anything about the contrary, like the reverse, like it doesn't say like a child partition needs to use it most one parent.

214
00:22:01,400 --> 00:22:08,400
That's correct because then partition and then yeah, if a child uses multiple parent partition, then it's a white dependency.

215
00:22:08,400 --> 00:22:21,400
If a parent, sorry, if if the child needs the petitions of if the petition for multiple multiple parent petitions, then it's a white dependency.

216
00:22:21,400 --> 00:22:31,400
So for example, in the count case, correct, you know, you have time, time, petitions, right.

217
00:22:31,400 --> 00:22:37,400
So if the count operation is going to collect data from all of them, right.

218
00:22:37,400 --> 00:22:47,400
And so if count were an RDD, it isn't, but like it's just an action, but even where an RDD then basically, you know, that would require interaction with all the parents.

219
00:22:47,400 --> 00:23:00,400
So what I'm saying is I think, I think it's as the opposite, right. I think this might like, I mean, I, I was actually confused.

220
00:23:00,400 --> 00:23:12,400
Like with the paper on this specific issue, but like it says, like each partition of the parent RDD is used by most one partition of the child.

221
00:23:12,400 --> 00:23:17,400
But it doesn't say one partition of the child uses it most.

222
00:23:17,400 --> 00:23:25,400
I'm not going to censure exactly why you're accused of it, but this so let me give you a can we could postpone this and come back to it.

223
00:23:25,400 --> 00:23:26,400
Sure.

224
00:23:26,400 --> 00:23:27,400
Sure.

225
00:23:27,400 --> 00:23:38,400
I think the key thing to the question is, the basically two types of dependency white ones and there are once and white ones basically, you know, basically involve communication because they have to talk to the

226
00:23:38,400 --> 00:23:47,400
community that collected the information from the day from the parents that traditions.

227
00:23:47,400 --> 00:23:48,400
Okay.

228
00:23:48,400 --> 00:23:50,400
Thanks.

229
00:23:50,400 --> 00:23:53,400
I actually have a question on the interface.

230
00:23:53,400 --> 00:23:54,400
Yes.

231
00:23:54,400 --> 00:24:00,400
And like the previous like one or two slides, what happens if you don't call errors stop persist?

232
00:24:00,400 --> 00:24:12,400
If you do not, then the you would the second computation like this computation would recompute errors from the beginning.

233
00:24:12,400 --> 00:24:22,400
So if you run this workflow, this spark in a computation, it would recompute errors from the starting file.

234
00:24:22,400 --> 00:24:25,400
Got it. Thank you.

235
00:24:25,400 --> 00:24:44,400
So I actually have a question about this point. So for the partitions that we don't call persist on in the map reduce case, we basically stored them in intermediate files, but we nonetheless stored them in a local file system, let's say, in the case of

236
00:24:44,400 --> 00:24:55,400
a do we actually store intermediate files here that we don't persist in some persistent storage or we just keep the whole flow in memory throughout the whole by default.

237
00:24:55,400 --> 00:25:01,400
The whole flow is in memory, except you can provide to you.

238
00:25:01,400 --> 00:25:08,400
There's one exception. I'll talk about a little bit more in detail in a second hopefully, which is.

239
00:25:08,400 --> 00:25:15,400
You see this persist here. This persist can take another flag thing is called reliable.

240
00:25:15,400 --> 00:25:22,400
And then that said is actually stored in HTFS and basically called as a checkpoint.

241
00:25:22,400 --> 00:25:26,400
I see. Thank you.

242
00:25:26,400 --> 00:25:45,400
I have a quick question about the partitioning that with partitioning the RDDs initially, is it initially HTFS who partitions them for each worker to operate on or is is spark handling all of them.

243
00:25:45,400 --> 00:25:54,400
So this lines are you best, you know, the petition is defined basically by the files that are actually in HTFS.

244
00:25:54,400 --> 00:26:03,400
You can re partition and we'll see in a second that actually might be then it takes you to do so, for example, using this hash partition trick.

245
00:26:03,400 --> 00:26:12,400
And you can define also your own petitioner, there's a petitioner object or extraction that you can supply.

246
00:26:12,400 --> 00:26:18,400
So it's already handled by HTFS, but if you want to do it again through spark, then you can.

247
00:26:18,400 --> 00:26:33,400
Yeah, and in some sense, of course, these files are also created by this this files, presumably, you're created by some logging system that sits on the side and just produce different petitions or you know, you can reshovel if you want to make sense. Thank you.

248
00:26:33,400 --> 00:26:39,400
Okay.

249
00:26:39,400 --> 00:26:48,400
So, so that's the execution model in I want to talk a little bit about fault tolerance.

250
00:26:48,400 --> 00:26:57,400
And so let's go back to this. So this is sort of fault tolerance and the thing that we worry about in fault tolerance is that maybe one of these workers.

251
00:26:57,400 --> 00:26:59,400
You know, my crash.

252
00:26:59,400 --> 00:27:05,400
The worker is executing some petition and so we need to re execute that.

253
00:27:05,400 --> 00:27:11,400
And that is basically this plan is sort of the same as in MapReduce, right?

254
00:27:11,400 --> 00:27:21,400
We're if a worker crashes, we need to in MapReduce, you know, the map tasks need to be re executed and perhaps maybe a reduced task has to be re executed.

255
00:27:21,400 --> 00:27:25,400
And here the task is slightly more complicated because they're basically like these stages.

256
00:27:25,400 --> 00:27:31,400
And so it means that it won worker fails. We may have to re-compute the stage.

257
00:27:31,400 --> 00:27:34,400
So let's talk a little bit more about that.

258
00:27:34,400 --> 00:27:39,400
That's sort of the perspective of fault tolerance. That's what we're trying to achieve.

259
00:27:39,400 --> 00:27:48,400
This is really different than like the fault homes that were you implemented in lab, you can to free or taxes and you know, stable storage and all that kind of stuff.

260
00:27:48,400 --> 00:27:56,400
And here really what we're worried about is the crash of the worker.

261
00:27:56,400 --> 00:28:01,400
The worker loses its memory.

262
00:28:01,400 --> 00:28:04,400
Lost memory.

263
00:28:04,400 --> 00:28:11,400
The needs of losses partition.

264
00:28:11,400 --> 00:28:16,400
And later parts of the competition are probably dependent on that partition.

265
00:28:16,400 --> 00:28:21,400
And so we need to re re read or re compute this partition.

266
00:28:21,400 --> 00:28:29,400
And so the solution is like exactly like in MapReduce, you know, basically the scalar notice at some point that doesn't get an answer.

267
00:28:29,400 --> 00:28:44,400
And then re runs the stage for that partition.

268
00:28:44,400 --> 00:28:57,400
And you know, and what is the cool part exactly as in MapReduce, all of you look at all these transformations that are sitting here in the API, all these transformations are functional.

269
00:28:57,400 --> 00:29:03,400
And so they basically take one input. They take an RDD as an input. They produce another RDD as output.

270
00:29:03,400 --> 00:29:06,400
And just completely deterministic.

271
00:29:06,400 --> 00:29:12,400
And so like with MapReduce, you know, these maps and the reduced were functional operations.

272
00:29:12,400 --> 00:29:20,400
If you restart a stage for a sequence of transformations from the same input, then you will produce the same output.

273
00:29:20,400 --> 00:29:26,400
And so you recreate, you know, the same partition.

274
00:29:26,400 --> 00:29:34,400
And so you can recreate the same partition.

275
00:29:34,400 --> 00:29:38,400
We can recreate the partition.

276
00:29:38,400 --> 00:29:41,400
Okay.

277
00:29:41,400 --> 00:29:44,400
Sorry, is this why they're immutable.

278
00:29:44,400 --> 00:29:49,400
There's also the reason I think they were randomly immutable. Yes.

279
00:29:49,400 --> 00:29:54,400
So the tricky case though, which I want to talk about.

280
00:29:54,400 --> 00:29:58,400
So the full tone space before the narrow case.

281
00:29:58,400 --> 00:30:13,400
It's the same sort of as we sell it before in MapReduce, but you know, the tricky case is actually the white dependencies.

282
00:30:13,400 --> 00:30:20,400
Let's say, you know, we have some transformations.

283
00:30:20,400 --> 00:30:31,400
And one of these transformations is dependent on a, you know, uses like sort of you have one worker, we have another worker, we have another worker.

284
00:30:31,400 --> 00:30:43,400
And one of these stages is actually dependent on a number of parent partitions.

285
00:30:43,400 --> 00:30:49,400
So let's say whatever maybe this is a join or we'll see later other operations.

286
00:30:49,400 --> 00:31:00,400
We're going to we're actually collecting information for lots of partitions and, you know, create a new RDD from that, from that RDD that might be used again by maps or whatever.

287
00:31:00,400 --> 00:31:08,400
So, let's say, you know, we're, you know, we're a worker and, you know, we crash here.

288
00:31:08,400 --> 00:31:16,400
And we need to reconstruct this RDD.

289
00:31:16,400 --> 00:31:24,400
And, you know, we sort of followed that means that we have to, you know, re also re compute this RDD to re compute this RDD on this worker.

290
00:31:24,400 --> 00:31:28,400
So we also need the partitions on the other workers.

291
00:31:28,400 --> 00:31:47,400
And so the, and the reconstructed the re execution of a computation on a particular worker, a particular petition may actually result that actually these ones also need to be re computed.

292
00:31:47,400 --> 00:31:58,400
Now, of course you can do this partially in parallel. You can just ask, you know, please, you know, start to get a re compute this guy, we can see that guy and, you know, produce and the final RDD again.

293
00:31:58,400 --> 00:32:09,400
But, you know, certainly, you know, a, a family of one worker might result in the re computation of many, many partitions.

294
00:32:09,400 --> 00:32:14,400
So, you know, slightly, and that could be slightly costly.

295
00:32:14,400 --> 00:32:23,400
And so the solution is that as a programmer, you can say, you can actually check point or persist.

296
00:32:23,400 --> 00:32:27,400
RDDs on stable storage.

297
00:32:27,400 --> 00:32:32,400
And so you might decide, you know, for example, this is an RDD that,

298
00:32:32,400 --> 00:32:48,400
that you don't want to re compute in the case of a failure because it requires, you know, re computing all the different partitions, you know, you may want to check point this RDD.

299
00:32:48,400 --> 00:33:03,400
And then, you know, this kind of stage when it actually, when this, you know, computation needs to be re executed, then we're going to actually read, you know, the result of the partitions from the checkpoint instead of actually having to re compute them from scratch.

300
00:33:03,400 --> 00:33:17,400
And so this is why spark supports checkpoints and other sort of their fault on the story for white dependencies.

301
00:33:17,400 --> 00:33:20,400
Any questions about this?

302
00:33:20,400 --> 00:33:25,400
I had one question.

303
00:33:25,400 --> 00:33:35,400
So there was, so you persist, right, just in general, but they also mentioned the reliable flag.

304
00:33:35,400 --> 00:33:41,400
So I was wondering, like, what's the difference between just persisting and using a reliable flag?

305
00:33:41,400 --> 00:33:47,400
Persist just means you're going to keep that RDD in memory and you're not going to throw it away.

306
00:33:47,400 --> 00:34:05,400
So that you can reuse it in later computations in, and then just in memory, the checkpoint or the liability flag basically means you actually write a copy of the whole RDD to HDFS.

307
00:34:05,400 --> 00:34:11,400
And HDFS is a persistent or stable storage file system.

308
00:34:11,400 --> 00:34:12,400
Okay.

309
00:34:12,400 --> 00:34:16,400
Is there a way to tell spark to unpersist something?

310
00:34:16,400 --> 00:34:29,400
Because otherwise, like, for example, if you persist an RDD, and you do a lot of computations, but like those later computations never use the RDD, you might just have it sticking around in memory forever.

311
00:34:29,400 --> 00:34:30,400
Yeah.

312
00:34:30,400 --> 00:34:34,400
So I presume you can.

313
00:34:34,400 --> 00:34:42,400
There's a general strategy that spark uses, and they talk a little bit about this, is that they have really no space anymore.

314
00:34:42,400 --> 00:34:48,400
They might spill some RDDs to HDFS or remove them.

315
00:34:48,400 --> 00:34:54,400
The papers like you dig in the exactly what their plan for that is.

316
00:34:54,400 --> 00:35:11,400
And you, of course, when the computation ends and as a user, you log out, or you stop your driver, then I think those RDDs are definitely gone from memory.

317
00:35:11,400 --> 00:35:14,400
Okay.

318
00:35:14,400 --> 00:35:21,400
So that is almost the story of spark.

319
00:35:21,400 --> 00:35:23,400
We've seen what an RDD is.

320
00:35:23,400 --> 00:35:29,400
We've seen how for the execution works, and we've seen how the fault homes plan works.

321
00:35:29,400 --> 00:35:37,400
The thing that I want to really want to talk about is another example to really show off where spark shines.

322
00:35:37,400 --> 00:35:40,400
And that is an iterative example.

323
00:35:40,400 --> 00:35:46,400
So in computation that has an iterative structure.

324
00:35:46,400 --> 00:35:54,400
And the particular one I want to talk about is page rank.

325
00:35:54,400 --> 00:36:01,400
I assume that most of you are familiar with page ranking some form, basically, and it's a plan to.

326
00:36:01,400 --> 00:36:06,400
Now we're going to give weight or importance to web pages.

327
00:36:06,400 --> 00:36:10,400
And it's dependent on the number of links that put point to a particular webpage.

328
00:36:10,400 --> 00:36:14,400
So for example, if you have a webpage you want.

329
00:36:14,400 --> 00:36:16,400
I may point to itself.

330
00:36:16,400 --> 00:36:19,400
You know, maybe a webpage you free.

331
00:36:19,400 --> 00:36:27,400
So I'll use an example and a web page you to you to has a link to itself and to you free.

332
00:36:27,400 --> 00:36:30,400
You know, you free has a link to you want.

333
00:36:30,400 --> 00:36:35,400
And then basically page rank is an algorithm that you know, based on these connectivities.

334
00:36:35,400 --> 00:36:38,400
Our computer is the importance of a webpage.

335
00:36:38,400 --> 00:36:46,400
And page rank for sort of the early out of the algorithms that really drove the Google search machine.

336
00:36:46,400 --> 00:36:53,400
In the sense that if you had a search result, the way you rent search results is that you have a search results.

337
00:36:53,400 --> 00:36:56,400
And then you have a search results on a more important webpage.

338
00:36:56,400 --> 00:36:59,400
And that results gets promoted to higher in the list.

339
00:36:59,400 --> 00:37:12,400
And I'm running the reason that in the early days of Google, the Google search machine actually produced better search results where I made the more important information actually or the more important web pages were at top.

340
00:37:12,400 --> 00:37:27,400
And so the paper talks about shows off the implementation of page rank in spark.

341
00:37:27,400 --> 00:37:35,400
So here's the implementation of the spark implementation of the page rank.

342
00:37:35,400 --> 00:37:41,400
And as before, you know, this is just a description. So we look at the individual lines.

343
00:37:41,400 --> 00:37:48,400
You know, these are just the sort of the recipe to actually how to compute page rank.

344
00:37:48,400 --> 00:37:54,400
And only when like, you know, this particular case, if you do say ranks collect at the very end.

345
00:37:54,400 --> 00:37:59,400
Then actually the computation would run on, you know, the cluster of machines.

346
00:37:59,400 --> 00:38:04,400
And using sort of the execution pattern that we have seen so far.

347
00:38:04,400 --> 00:38:16,400
And so I want to walk through this example in a little bit more detail to get a sense, you know, what the get a better sense why sparks are shines in the iterative case.

348
00:38:16,400 --> 00:38:20,400
So, so there are two RDDs here.

349
00:38:20,400 --> 00:38:30,400
And also going to talk about some optimization that are cool in spark one is this links are these and links is basically you know represents the connection of the graphs.

350
00:38:30,400 --> 00:38:34,400
And so presumably it probably has a line.

351
00:38:34,400 --> 00:38:42,400
I was going to write it like that is line per URL. So here you want and it has two outgoing links.

352
00:38:42,400 --> 00:38:52,400
And you want you to you free.

353
00:38:52,400 --> 00:38:54,400
Actually I miss one link here.

354
00:38:54,400 --> 00:39:05,400
And then there's a you to entry for you to which has now gone link to you to you to you free.

355
00:39:05,400 --> 00:39:13,400
And entry you know you free going to you want.

356
00:39:13,400 --> 00:39:17,400
So this is basically description of you will the you know the worldwide web.

357
00:39:17,400 --> 00:39:21,400
And so of course, you know, my tiny little example I have free web ages.

358
00:39:21,400 --> 00:39:26,400
But if you know we're running this at the scale of Google you would have a billion web agents right.

359
00:39:26,400 --> 00:39:33,400
And so this follows gigantic and is partitioned in the predictions.

360
00:39:33,400 --> 00:39:35,400
So that's links.

361
00:39:35,400 --> 00:39:43,400
And then ranks is a sort of similar file that contains the current ranks with these web pages.

362
00:39:43,400 --> 00:39:46,400
And so you can think about this is going to you won.

363
00:39:46,400 --> 00:39:48,400
Now comma, you know, it's rank.

364
00:39:48,400 --> 00:39:52,400
And let's assume that the ranks are initialized at 1.0.

365
00:39:52,400 --> 00:39:55,400
And then you know, years 1.0.

366
00:39:55,400 --> 00:40:00,400
And you know, you two 1.0.

367
00:40:00,400 --> 00:40:05,400
You you three 1.0.

368
00:40:05,400 --> 00:40:11,400
And we see actually that the links that the links are these is actually persistent in memory.

369
00:40:11,400 --> 00:40:17,400
That's presumably like in the same way as the error file that we saw before or the error and already.

370
00:40:17,400 --> 00:40:20,400
And then ranks.

371
00:40:20,400 --> 00:40:25,400
You know, say initialized you know through something and then basically there's this sort of.

372
00:40:25,400 --> 00:40:32,400
A description of number of iterations to produce a new ranks.

373
00:40:32,400 --> 00:40:33,400
RDD.

374
00:40:33,400 --> 00:40:37,400
And you can see a little bit you know how this actually plays out.

375
00:40:37,400 --> 00:40:43,400
And one of the things to notice is that links gets reused in every iteration.

376
00:40:43,400 --> 00:40:47,400
And links actually gets joined with ranks.

377
00:40:47,400 --> 00:40:55,400
What means what does mean to actually do this join up this this this operation this this operation basically creates an RDD.

378
00:40:55,400 --> 00:41:00,400
Right. And what is that RDD look like? Well that RDD is going to look like you won.

379
00:41:00,400 --> 00:41:04,400
And then the join of the ranks in the.

380
00:41:04,400 --> 00:41:05,400
And the links file.

381
00:41:05,400 --> 00:41:07,400
So it's going to be you won.

382
00:41:07,400 --> 00:41:12,400
You won you two because those are the are you three outgoing links plus the rank.

383
00:41:12,400 --> 00:41:17,400
For you one, which I'm just going to go right as rank one.

384
00:41:17,400 --> 00:41:27,400
And that's sort of the RDD that's being produced here. And so same thing for you know whatever you do and the one for you free is whatever you want.

385
00:41:27,400 --> 00:41:30,400
And you know.

386
00:41:30,400 --> 00:41:32,400
Or free rank free.

387
00:41:32,400 --> 00:41:38,400
Basically it's merges you to literally joins the two files based on key.

388
00:41:38,400 --> 00:41:40,400
Okay.

389
00:41:40,400 --> 00:41:47,400
And then you know it runs a computation of flat map on this and that flat map itself internally has a map overlinks.

390
00:41:47,400 --> 00:42:00,400
So basically it's going to run over like this group is going to run over these lists and basically a partition or divide up the rank, you know, to the outgoing URLs.

391
00:42:00,400 --> 00:42:06,400
And so it will you know create triples off the form.

392
00:42:06,400 --> 00:42:10,400
You know, let me write this in green and you know you won.

393
00:42:10,400 --> 00:42:15,400
R1 divided by two.

394
00:42:15,400 --> 00:42:27,400
And you won or you were free over the outgoing link. So it gave one to you one one to you three here you three are one divided over two.

395
00:42:27,400 --> 00:42:40,400
So it creates triples of this kind of form. So basically you know compute the way you get it to divides the rank across the outgoing edges and gives you know the values of these ranks, you know, to the outgoing edges.

396
00:42:40,400 --> 00:42:46,400
So the outgoing edges. So we're going to get a big you know RDD that has no this form.

397
00:42:46,400 --> 00:42:50,400
And that's produced basically not as the contributions.

398
00:42:50,400 --> 00:42:53,400
RDD.

399
00:42:53,400 --> 00:42:58,400
Then there's a final step in the thing at first, we're reduced by key.

400
00:42:58,400 --> 00:43:12,400
So basically graph all the you once you know together and it's some so much so basically this will result is that you know all the weight or the the fractional weights, you know that you want is going to receive are being added up.

401
00:43:12,400 --> 00:43:20,400
So you want of course going to receive weights from itself this one is going to relate to you free.

402
00:43:20,400 --> 00:43:29,400
And so you know, we'll sum them up. It's going to be R1 divided by two and R3 divided by one.

403
00:43:29,400 --> 00:43:33,400
And that is basically the sum has been computed.

404
00:43:33,400 --> 00:43:42,400
And so that gives you a list of sums and then actually they're added up and computed into a final value.

405
00:43:42,400 --> 00:43:54,400
And that produces the new ranks RDD which has this same shape as the one that we saw before mainly this shape for every web page.

406
00:43:54,400 --> 00:44:00,400
Does that make sense?

407
00:44:00,400 --> 00:44:10,400
And so it's interesting to you know that's sort of the description. So first of all, you can see that the actually the description of page rank is quite precise.

408
00:44:10,400 --> 00:44:19,400
And there's one of the examples this is like if you had to run this in a map, you do style, then that would mean at every iteration, you know, this loop.

409
00:44:19,400 --> 00:44:29,400
At the end of the iteration, you would store the results in the file system and then you re-read the iteration from the result for the next iteration.

410
00:44:29,400 --> 00:44:40,400
And in this spark system, every iteration runs straight out of memory, it leaves the results in memory so that the next iteration can pick it up right there.

411
00:44:40,400 --> 00:44:46,400
And for the more, you know, these links file is shared among all the iterations.

412
00:44:46,400 --> 00:44:52,400
Okay, so to get a little bit more sense of like, you know, why is also cool.

413
00:44:52,400 --> 00:45:00,400
The way to look at it is to actually look at the lineage graph for this particular complication.

414
00:45:00,400 --> 00:45:16,400
So here's the lineage graph for the for patron.

415
00:45:16,400 --> 00:45:26,400
And so the couple things I want to point out, the first of all, so the lineage graph is like dynamic almost directly looks.

416
00:45:26,400 --> 00:45:31,400
You know, just keeps growing with the number of iterations.

417
00:45:31,400 --> 00:45:42,400
And so ask the scheduler, you know, basically, computes and does new stages, then it keeps going. And you know, we can see what the stages are going to be correct because.

418
00:45:42,400 --> 00:45:46,400
The sort of, you know, every iteration.

419
00:45:46,400 --> 00:45:56,400
Often look is one stage and will basically append parts of transformations to the lineage graph.

420
00:45:56,400 --> 00:46:06,400
So we see here's the input file, we use the links and as we saw, like links are actually created once, then persistent in memory, not on this persistent in memory.

421
00:46:06,400 --> 00:46:12,400
And it's being reused many, many times, like in every lib iteration, basically, ranks is being reused.

422
00:46:12,400 --> 00:46:17,400
And so again, you know, compare to a map reduced if you have to write this into map reduced style, you don't get that reuse.

423
00:46:17,400 --> 00:46:32,400
And so that's of course, and like tremendously preferable performance because links, you know, as we said before, is like a gigantic file that basically corresponds to one line for every web page in the universe.

424
00:46:32,400 --> 00:46:41,400
Another interesting thing to observe here is that we see your white dependencies here, right, this is a white dependency.

425
00:46:41,400 --> 00:46:47,400
It could be a white dependency, we a little bit more sophisticated about this in a second.

426
00:46:47,400 --> 00:46:56,400
Because basically this contributions, you know, when we contribute the intermediate result, it is a join across ranks and links.

427
00:46:56,400 --> 00:47:12,400
So it needs the partitions from links and it needs partitions for own ranks to basically compute a partition for contribute for the contribute contribute, contribute, contribute, contribute, RDD, sorry.

428
00:47:12,400 --> 00:47:17,400
And so that might require, you know, from a never communication.

429
00:47:17,400 --> 00:47:25,400
And so that's what we're talking about. They have sort of a clever optimization.

430
00:47:25,400 --> 00:47:30,400
And this is in response to an earlier question about like partitioning.

431
00:47:30,400 --> 00:47:40,400
You can specify that you want to partition an RDD using a hash partition.

432
00:47:40,400 --> 00:47:48,400
The main thing is that the links and ranks file, you know, these two RDDs are going to be partitioned in the same way.

433
00:47:48,400 --> 00:48:02,400
They're going to actually partition by key or by the hash of the key. So we go look back, you know, at an RDD picture, you know, the keys for ranks, you know, RDD, you want you to do your free.

434
00:48:02,400 --> 00:48:14,400
And this is for the links, okay, sorry, the keys for ranks, you want you to free the keys for links are also you want you to free free.

435
00:48:14,400 --> 00:48:28,400
And basically the clever optimization, and this is a standard optimization from the database literature is that if you partition links and ranks by key, then, you know, this one is going to have you one on one machine.

436
00:48:28,400 --> 00:48:32,400
That maybe this is you to one machine.

437
00:48:32,400 --> 00:48:45,400
Then ranks is going to have the same thing is going to have you one on one machine. And in fact, you know, it's going to have you one on the same machine as the links one and saying for you to and your free.

438
00:48:45,400 --> 00:49:12,400
So even though this join is exceptionally white dependency, it can be executed like a narrow dependency because basically to compute, you know, the joint of these two for the you one, you know, for the first partition for the p1, you only have to look at the partition p1 of links and p1 of ranks because, you know, that keys are hatched in the same way through the same machine.

439
00:49:12,400 --> 00:49:25,400
And so the scheduler or the programmer can actually specify these hatch petitions, the scheduler sees, you know, the join actually uses these hatch petitions, the hatch petitions that are the same.

440
00:49:25,400 --> 00:49:35,400
And therefore, and actually don't have to do this white dependency, I don't have to do sort of a complete barrier as you may have to reduce, but I can just treat this as a narrow dependency.

441
00:49:35,400 --> 00:49:39,400
So that's pretty cool.

442
00:49:39,400 --> 00:49:51,400
Then, you know, again, if a machine fails correct, we talked a little bit about this earlier, that might be painful because you may have to re execute many loops or one iterations.

443
00:49:51,400 --> 00:50:02,400
And so, you know, if you would probably write this real, then the programmer will probably say like maybe after you know 10 iterations.

444
00:50:02,400 --> 00:50:11,400
You know, basically check point.

445
00:50:11,400 --> 00:50:16,400
So that you don't have to re compute the computation all the way from the from the beginning.

446
00:50:16,400 --> 00:50:22,400
Oh, so we don't actually re compute links or anything each time, right? Like we don't persist it. Sorry.

447
00:50:22,400 --> 00:50:25,400
We don't persist it. No, not at all.

448
00:50:25,400 --> 00:50:31,400
The only thing that was persistent is we're the only ones with links, correct? This is the only thing that was had a persistent call.

449
00:50:31,400 --> 00:50:34,400
We do persisted links. We do.

450
00:50:34,400 --> 00:50:36,400
Okay.

451
00:50:36,400 --> 00:50:39,400
But not the intermediate Rdds.

452
00:50:39,400 --> 00:50:46,400
Because they're basically new Rdds every time. Like rings one is a new Rdd, ranks two is a new Rdd, right?

453
00:50:46,400 --> 00:50:59,400
But you may want to persist them, you know, occasionally, and then store them really nice to you. So that if you have to a failure, you don't have to go back to iteration, the iteration zero to execute everything.

454
00:50:59,400 --> 00:51:03,400
Okay. Does this make sense?

455
00:51:03,400 --> 00:51:12,400
I'm sorry. The different contrips can maybe compute it in parallel on different petitions. Yes.

456
00:51:12,400 --> 00:51:16,400
Because there, there's like this line that goes vertically down.

457
00:51:16,400 --> 00:51:19,400
If it's going down, it's pipeline.

458
00:51:19,400 --> 00:51:26,400
Correct. And then there's sort of just two types of parallelism. There's stage parallelism. And there is sort of parallelism between different petitions.

459
00:51:26,400 --> 00:51:45,400
And we can think about this thing, you know, this whole thing, like running many, many times on different petitions.

460
00:51:45,400 --> 00:51:51,400
So in this case, the collect at the very end will be the only place where we have a wide.

461
00:51:51,400 --> 00:51:59,400
Exactly, exactly. The collect is the only one that's going to, you know, whatever year we have more petitions correct.

462
00:51:59,400 --> 00:52:09,400
I make a mess of this picture, but that is going to have to get them from everyone.

463
00:52:09,400 --> 00:52:14,400
Okay. I hope the director was overseas. This is actually pretty cool.

464
00:52:14,400 --> 00:52:19,400
I'm going to use by expressing these computations and sort of a lineage graph or a data flow computation.

465
00:52:19,400 --> 00:52:26,400
The scheduler has a bit of room for optimizations like these like exploding has petitions.

466
00:52:26,400 --> 00:52:36,400
The, you know, we get a lot of parallelism. We get also a lot of reuse. You know, we can keep the results of one RTV and memory so that we can reuse it for the next iteration.

467
00:52:36,400 --> 00:52:43,400
And you can sort of see that these techniques can buy. You know, I'm going to give you a significant performance optimization.

468
00:52:43,400 --> 00:52:52,400
And it allows you to expand and express more powerful or more instant computations.

469
00:52:52,400 --> 00:53:04,400
So maybe with that, I will summarize this lecture.

470
00:53:04,400 --> 00:53:07,400
So a couple of things.

471
00:53:07,400 --> 00:53:20,400
You know, some RTVs are made by functional transformations.

472
00:53:20,400 --> 00:53:27,400
They're grouped together in sort of a lineage graph, which you can think about as a data flow graph.

473
00:53:27,400 --> 00:53:32,400
This, the, you know, this allows reuse.

474
00:53:32,400 --> 00:53:42,400
Those allow some clever optimizations by the scheduler.

475
00:53:42,400 --> 00:53:52,400
And basically allows also more extra is more expressiveness.

476
00:53:52,400 --> 00:53:58,400
Then, you know, map reduced by itself.

477
00:53:58,400 --> 00:54:14,400
And which results basically in good performance because like a lot of the data just stays in memory.

478
00:54:14,400 --> 00:54:18,400
And so if you actually are excited about this, you can try it out.

479
00:54:18,400 --> 00:54:25,400
You download, you know, Spark play around in the right programs for you know, go to data bricks.com and you're creating accounts.

480
00:54:25,400 --> 00:54:30,400
And then you can run Spark competitions on their on their clusters.

481
00:54:30,400 --> 00:54:35,400
So you're excited about this and want to try it out. You know, it's pretty easy to do so.

482
00:54:35,400 --> 00:54:38,400
Like, unlike farm, you can just like not play with.

483
00:54:38,400 --> 00:54:41,400
But this actually you can actually go out and try out.

484
00:54:41,400 --> 00:54:46,400
Okay, with that, I want to stop for today.

485
00:54:46,400 --> 00:54:51,400
And the people that want to hang around and ask more questions, please feel free to do so.

486
00:54:51,400 --> 00:54:59,400
The only thing I want to remind people of is that kind of the deadline for 4B is a little bit away.

487
00:54:59,400 --> 00:55:04,400
But I just want to remind people that 4B is a pretty tricky, requires a bit of design.

488
00:55:04,400 --> 00:55:06,400
So don't start to late.

489
00:55:06,400 --> 00:55:09,400
And with that, I'll see you on Tuesday.

490
00:55:11,400 --> 00:55:14,400
Thank you.

491
00:55:14,400 --> 00:55:17,400
Thank you.

492
00:55:17,400 --> 00:55:20,400
Thank you.

493
00:55:20,400 --> 00:55:24,400
I had a question about the checkpoints.

494
00:55:24,400 --> 00:55:33,400
I think it's very mentioned automatic checkpoints using data about how longage computation took.

495
00:55:33,400 --> 00:55:37,400
And I wasn't really sure what they mean by this.

496
00:55:37,400 --> 00:55:41,400
What are they going to be optimizing for?

497
00:55:41,400 --> 00:55:46,400
I get a little bit of the whole checkpoints is correct. There's an optimization between.

498
00:55:46,400 --> 00:55:49,400
Taking checkpoints is expensive.

499
00:55:49,400 --> 00:55:51,400
And so that takes time.

500
00:55:51,400 --> 00:55:57,400
But you know, re execution. If there's a machine failure, also takes a lot of time.

501
00:55:57,400 --> 00:56:02,400
And so, for example, if you take never check point, then you basically have to re execute the computation from the beginning.

502
00:56:02,400 --> 00:56:11,400
But if you take periodically checkpoints, you know, you don't have to repeat, you know, the computation that you did before the checkpoint, but the check taking the checkpoint takes time.

503
00:56:11,400 --> 00:56:18,400
So if you take very frequent checkpoints, you know, it has to recompute a lot, but you spend only a time taking checkpoints.

504
00:56:18,400 --> 00:56:22,400
And so there's sort of an optimization problem here.

505
00:56:22,400 --> 00:56:27,400
You know, you want to take the checkpoints and some regular interval.

506
00:56:27,400 --> 00:56:32,400
And you're willing to take to re compute.

507
00:56:32,400 --> 00:56:37,400
Okay, so maybe like compute checkpoints only for very large computations.

508
00:56:37,400 --> 00:56:45,400
Yeah, like an example in the case of page wrong, you know, maybe you know, do it every 10 iterations.

509
00:56:45,400 --> 00:56:46,400
Thank you.

510
00:56:46,400 --> 00:56:52,400
It depends of course, of the size of the check point, right? But the size of the check point is small. You can check more frequently.

511
00:56:52,400 --> 00:56:57,400
But in the case of this page rank, you know, that check one's going to be pretty big.

512
00:56:57,400 --> 00:57:03,400
There's going to be a line or record, you know, per web page.

513
00:57:03,400 --> 00:57:05,400
That makes sense. Thank you.

514
00:57:05,400 --> 00:57:07,400
You want to.

515
00:57:07,400 --> 00:57:10,400
I have a question about the driver.

516
00:57:10,400 --> 00:57:17,400
Yes, the application is like, does the driver is the driver on the client side or is this.

517
00:57:17,400 --> 00:57:25,400
If it's conscious, we lose like the whole graph. And that's fine because that's like application.

518
00:57:25,400 --> 00:57:33,400
Yeah, I don't exactly know what happens because the, the, the, the schedule has a two.

519
00:57:33,400 --> 00:57:35,400
And the schedule is full powered.

520
00:57:35,400 --> 00:57:40,400
So I don't know exactly what you know what happens. Maybe you can reconnect. I don't know.

521
00:57:40,400 --> 00:57:52,400
I had a question about the Y dependency optimization. You mentioned that did you like the hash partitioning. How does that work?

522
00:57:52,400 --> 00:57:56,400
Okay, I can say a little bit more. So this is not a, you know, has petition is not something that they invent.

523
00:57:56,400 --> 00:57:59,400
It's actually something that is.

524
00:57:59,400 --> 00:58:04,400
It's a standard database partitioning scheme.

525
00:58:04,400 --> 00:58:10,400
And it is cool because if you need to computer join, you don't have to do a lot of communication.

526
00:58:10,400 --> 00:58:20,400
So let me actually, I can maybe start a new slide because it's a little bit hard to read. So have a kitchen.

527
00:58:20,400 --> 00:58:29,400
If you have two datasets, use dataset one, use dataset two, they have keys regularly, you know, he won P2.

528
00:58:29,400 --> 00:58:32,400
But they have the same set of keys.

529
00:58:32,400 --> 00:58:40,400
Then what you do by hash partitioning the partition to dataset and number of petitions. So boom, boom, boom.

530
00:58:40,400 --> 00:58:45,400
And you have to keep.

531
00:58:45,400 --> 00:58:51,400
And you have to keep the same hash, K1, you have K2 and that actually determines the partition ends up it.

532
00:58:51,400 --> 00:59:00,400
And so all the keys that actually have the same hash went up in the same place. So like this is machine one is machine two is machine three.

533
00:59:00,400 --> 00:59:09,400
So you take whatever you hash K1 that goes in here. You know, you hash, you know, whatever K2, maybe somewhere else in the file, who knows where it is.

534
00:59:09,400 --> 00:59:17,400
And you have to keep the same hash partition. You do the same thing here for the other datasets. So there's dataset one.

535
00:59:17,400 --> 00:59:21,400
There's dataset two.

536
00:59:21,400 --> 00:59:32,400
Like links and ranks. And you know, what will happen is that all the records in this dataset that have the same keys records in the other dataset.

537
00:59:32,400 --> 00:59:41,400
And these keys or those records will end up in the same machine. So here you're going to petition this guy and basically K1 will end up here too.

538
00:59:41,400 --> 00:59:44,400
On the same machine.

539
00:59:44,400 --> 00:59:50,400
Correct. And same for the other keys because you basically used the same hash function and you have the same set of keys.

540
00:59:50,400 --> 00:59:56,400
And so this allows you to take a dataset, you know, partition them both in the same way using this hatching trick.

541
00:59:56,400 --> 01:00:07,400
And this is cool because now if you need to do a join over these two datasets, quite if you need to do a join over these two datasets, then basically you can just join the petitions.

542
01:00:07,400 --> 01:00:09,400
And you don't have to communicate.

543
01:00:09,400 --> 01:00:21,400
You know each of these machines doesn't have to communicate with any other machine because it knows it has all the keys that you know that the other dataset has and they're all on the same machine.

544
01:00:21,400 --> 01:00:26,400
And it's just trying to sort not sort but like bucket the different.

545
01:00:26,400 --> 01:00:27,400
Yeah, exactly.

546
01:00:27,400 --> 01:00:29,400
In the same machine so that it does not communicate.

547
01:00:29,400 --> 01:00:30,400
Yeah, exactly.

548
01:00:30,400 --> 01:00:32,400
Just a bucket in trick.

549
01:00:32,400 --> 01:00:34,400
Okay, great. Thank you so much.

550
01:00:34,400 --> 01:00:35,400
You're welcome.

551
01:00:35,400 --> 01:00:42,400
So this means that the hash function has to make sure that there are no links that would have to be like.

552
01:00:42,400 --> 01:00:50,400
Use the computation on another machine, right? Like, for instance, yeah, well, there's since they used the same hash function and they have the same keys, you know, that will happen.

553
01:00:50,400 --> 01:00:56,400
Yeah.

554
01:00:56,400 --> 01:01:03,400
I had a question. I actually want to come back to the question asked before.

555
01:01:03,400 --> 01:01:05,400
Yeah, yeah, yeah.

556
01:01:05,400 --> 01:01:08,400
So let me open up.

557
01:01:08,400 --> 01:01:11,400
Yeah, let me also open the paper again.

558
01:01:11,400 --> 01:01:16,400
Any other people that have questions, if there's maybe this will take a little bit of time.

559
01:01:16,400 --> 01:01:21,400
So I have a question on the fault tolerance of farm.

560
01:01:21,400 --> 01:01:25,400
So, so just to clarify what happens.

561
01:01:25,400 --> 01:01:31,400
So if a failure occurs before the decision point.

562
01:01:31,400 --> 01:01:33,400
Then the entire thing is aborted.

563
01:01:33,400 --> 01:01:43,400
But if it occurs after the decision point, then after the failed computers come back up, they have to re-ass the coordinator for whether not they should commit.

564
01:01:43,400 --> 01:01:49,400
And then they re-ask, right? Like the what what happens is they're after failure, there's a recovery process runs.

565
01:01:49,400 --> 01:01:58,400
And the repartured process looks basically and all the logs are drained and and then the recovery process looks at the state of the system.

566
01:01:58,400 --> 01:02:04,400
And based on the state of the system, it decides what to do with the transaction either the board should or commits it.

567
01:02:04,400 --> 01:02:18,400
The key aspect here in this protocol is to ensure that at the point when the transaction coordinator actually have reported to the application that the transaction succeeded committed.

568
01:02:18,400 --> 01:02:27,400
And it has to be the case that there's sort of enough pieces of evidence left around in the system so that during the recovery process that transaction is definitely committed.

569
01:02:27,400 --> 01:02:31,400
And that's not sort of the plan.

570
01:02:31,400 --> 01:02:36,400
And the reason that there's enough evidence is because there's this log records lying around.

571
01:02:36,400 --> 01:02:43,400
There's this command backup record right lying around and there's this one commit record.

572
01:02:43,400 --> 01:02:52,400
I see. So if something, for example, if a failure occurs on a primary before it gets the commit primary.

573
01:02:52,400 --> 01:02:54,400
What happens there?

574
01:02:54,400 --> 01:03:02,400
So there's enough backup records correct to basically decide that every backup that every chart actually has committed.

575
01:03:02,400 --> 01:03:07,400
And so that's enough information for the recovery process to say, yeah, yeah, I'm going to run for it.

576
01:03:07,400 --> 01:03:11,400
That transaction because it could have committed.

577
01:03:11,400 --> 01:03:13,400
Got it. So it doesn't need the primary in that case.

578
01:03:13,400 --> 01:03:17,400
It can use the backups because the backups have the commit.

579
01:03:17,400 --> 01:03:20,400
Exactly.

580
01:03:20,400 --> 01:03:22,400
So I'm going to try to thank you.

581
01:03:22,400 --> 01:03:25,400
And what happens if the backup fails?

582
01:03:25,400 --> 01:03:30,400
Well, the one of the backup fails, presumably that means that we commit records are still there.

583
01:03:30,400 --> 01:03:35,400
And then again, that there's enough information to decide that actually the transaction needs to commit.

584
01:03:35,400 --> 01:03:41,400
And there's enough backups around to actually know what the new values, but there's also the log entries, which actually contain.

585
01:03:41,400 --> 01:03:49,400
So if a primary is up and we'll have a log entry, it will be commit entry plus there's enough backup to actually finish the transaction.

586
01:03:50,400 --> 01:03:52,400
Thank you.

587
01:03:52,400 --> 01:03:54,400
Sorry to follow up on that.

588
01:03:54,400 --> 01:04:01,400
If you said that the primary failed, then you could use the backups to complete the transaction.

589
01:04:01,400 --> 01:04:02,400
There's enough of them.

590
01:04:02,400 --> 01:04:06,400
Or would you need to elect a new primary?

591
01:04:06,400 --> 01:04:10,400
I think this is all happened during the.

592
01:04:10,400 --> 01:04:13,400
Basically, you can think of the recovery process as a primary.

593
01:04:13,400 --> 01:04:16,400
And I just finished is everything off.

594
01:04:16,400 --> 01:04:19,400
Oh, so a cover does the recovery is the primary?

595
01:04:19,400 --> 01:04:22,400
Yeah.

596
01:04:22,400 --> 01:04:23,400
Okay.

597
01:04:23,400 --> 01:04:24,400
Makes sense.

598
01:04:24,400 --> 01:04:25,400
Thank you.

599
01:04:25,400 --> 01:04:27,400
I don't think explicitly they promote a primary.

600
01:04:27,400 --> 01:04:30,400
You just just like go ahead and do it.

601
01:04:30,400 --> 01:04:32,400
And what is like enough backups?

602
01:04:32,400 --> 01:04:35,400
Well, we have f plus one.

603
01:04:35,400 --> 01:04:36,400
Right.

604
01:04:36,400 --> 01:04:40,400
And so it means that, you know, so long as one is left.

605
01:04:40,400 --> 01:04:42,400
And we were good.

606
01:04:42,400 --> 01:04:45,400
So we can have more than f plus one failures.

607
01:04:45,400 --> 01:04:48,400
We can only have f failures in this particular drawing.

608
01:04:48,400 --> 01:04:51,400
F is one.

609
01:04:51,400 --> 01:04:56,400
So there has to be per shard, you know, one machine left.

610
01:04:56,400 --> 01:04:57,400
Okay. That makes sense.

611
01:04:57,400 --> 01:04:58,400
Thank you.

612
01:04:58,400 --> 01:05:02,400
You're welcome.

613
01:05:02,400 --> 01:05:06,400
I can't believe it's just me and you.

614
01:05:06,400 --> 01:05:09,400
Well, I'm not as anyone else has questions.

615
01:05:09,400 --> 01:05:11,400
I'm not a person.

616
01:05:11,400 --> 01:05:13,400
I'm not a person.

617
01:05:13,400 --> 01:05:15,400
I'm not a person.

618
01:05:15,400 --> 01:05:16,400
Yeah.

619
01:05:16,400 --> 01:05:19,400
So it's it's page.

620
01:05:19,400 --> 01:05:22,400
The explainer page six.

621
01:05:22,400 --> 01:05:24,400
Yeah, yeah.

622
01:05:24,400 --> 01:05:26,400
Right below table three.

623
01:05:26,400 --> 01:05:28,400
Yep.

624
01:05:28,400 --> 01:05:29,400
So bear.

625
01:05:29,400 --> 01:05:32,400
It starts the most interesting question, right?

626
01:05:32,400 --> 01:05:35,400
It goes on to define.

627
01:05:35,400 --> 01:05:37,400
ρηabчикin double either.

628
01:05:37,400 --> 01:05:40,400
Right i'm not a person.

629
01:05:40,400 --> 01:05:42,400
What's that used?

630
01:05:42,400 --> 01:05:43,400
It goes on to quite famously.

631
01:05:43,400 --> 01:05:45,400
That's not usually the question, but it says.

632
01:05:45,400 --> 01:05:46,400
That's.

633
01:05:46,400 --> 01:05:48,400
The answer for the reason.

634
01:05:48,400 --> 01:05:49,400
Now.

635
01:05:49,400 --> 01:05:53,400
If we were to replace the two candidate Philanithotto.

636
01:05:53,400 --> 01:05:54,400
Okay.

637
01:05:54,400 --> 01:05:57,400
If we were to replace him for four or five years.

638
01:05:57,400 --> 01:05:59,400
You know, one of the questions is.

639
01:05:59,400 --> 01:06:03,400
The answer is incorrect.

640
01:06:03,400 --> 01:06:05,400
Right.

641
01:06:05,400 --> 01:06:07,400
Good.

642
01:06:07,400 --> 01:06:12,400
That's the narrow. This is the narrow case.

643
01:06:12,400 --> 01:06:16,400
Right. But,

644
01:06:16,400 --> 01:06:19,400
I think like the,

645
01:06:19,400 --> 01:06:23,400
the example I was taking off as, you know,

646
01:06:23,400 --> 01:06:29,400
each parent is used by at most.

647
01:06:29,400 --> 01:06:32,400
One partition of the child.

648
01:06:32,400 --> 01:06:35,400
Right.

649
01:06:35,400 --> 01:06:38,400
That doesn't say anything about like it says,

650
01:06:38,400 --> 01:06:41,400
right, like it doesn't necessarily mean it's a one to one relationship.

651
01:06:41,400 --> 01:06:42,400
Right.

652
01:06:42,400 --> 01:06:44,400
Well, because more or less have to,

653
01:06:44,400 --> 01:06:45,400
like just let me,

654
01:06:45,400 --> 01:06:47,400
let's say we have a white one correct.

655
01:06:47,400 --> 01:06:49,400
So then.

656
01:06:49,400 --> 01:06:52,400
Here we have parent.

657
01:06:52,400 --> 01:06:55,400
Partition one.

658
01:06:55,400 --> 01:06:59,400
Here we have, you know, maybe it has end of them correct.

659
01:06:59,400 --> 01:07:02,400
Right.

660
01:07:02,400 --> 01:07:03,400
Right.

661
01:07:03,400 --> 01:07:07,400
In the white one.

662
01:07:07,400 --> 01:07:10,400
The child is.

663
01:07:10,400 --> 01:07:12,400
Right.

664
01:07:12,400 --> 01:07:14,400
What, what I, what I was saying is,

665
01:07:14,400 --> 01:07:18,400
I think, you know, based on the definition given the paper,

666
01:07:18,400 --> 01:07:24,400
this could be a narrow partition.

667
01:07:24,400 --> 01:07:25,400
And in fact, I mean, like,

668
01:07:25,400 --> 01:07:28,400
if you look at,

669
01:07:28,400 --> 01:07:30,400
like a join with inputs,

670
01:07:30,400 --> 01:07:31,400
a quote partition,

671
01:07:31,400 --> 01:07:33,400
like you have.

672
01:07:33,400 --> 01:07:36,400
Yeah, the expectation that actually the white one turns into an arrow one.

673
01:07:36,400 --> 01:07:37,400
Right.

674
01:07:37,400 --> 01:07:39,400
But, but you still have,

675
01:07:39,400 --> 01:07:41,400
like a partition,

676
01:07:41,400 --> 01:07:43,400
a child partition, getting like,

677
01:07:43,400 --> 01:07:46,400
and like being computed from several.

678
01:07:46,400 --> 01:07:47,400
Parent partition.

679
01:07:47,400 --> 01:07:48,400
Yeah.

680
01:07:48,400 --> 01:07:49,400
Parent partitions.

681
01:07:49,400 --> 01:07:50,400
Yeah.

682
01:07:50,400 --> 01:07:51,400
I think they,

683
01:07:51,400 --> 01:07:53,400
they explicitly mentioned that, right?

684
01:07:53,400 --> 01:07:56,400
I think they have a very similar example.

685
01:07:56,400 --> 01:07:58,400
Yeah, but like.

686
01:07:58,400 --> 01:08:00,400
I think the type of sentence, right?

687
01:08:00,400 --> 01:08:07,400
I, I mean, I'm not, I'm not sure if it's, yeah, I'm not sure like if it's,

688
01:08:07,400 --> 01:08:11,400
what they meant to like write or.

689
01:08:11,400 --> 01:08:14,400
Well, we know we conclude, this is the two cases.

690
01:08:14,400 --> 01:08:15,400
Like I got.

691
01:08:15,400 --> 01:08:16,399
Yeah.

692
01:08:16,399 --> 01:08:18,399
I guess there are no other cases.

693
01:08:18,399 --> 01:08:19,399
Well,

694
01:08:19,399 --> 01:08:21,399
we can go for every operation, correct?

695
01:08:21,399 --> 01:08:24,399
And then we can see whether it's a narrower white one.

696
01:08:24,399 --> 01:08:25,399
Right.

697
01:08:25,399 --> 01:08:26,399
Right.

698
01:08:26,399 --> 01:08:27,399
So,

699
01:08:27,399 --> 01:08:28,399
and the ones that are,

700
01:08:28,399 --> 01:08:31,399
and it's the job of the programmer that defines these operations to actually indicate whether

701
01:08:31,399 --> 01:08:33,399
there's a white partition or an arrow,

702
01:08:33,399 --> 01:08:34,399
which white depends,

703
01:08:34,399 --> 01:08:36,399
you are a narrow dependency, correct?

704
01:08:36,399 --> 01:08:39,399
That's what the figure of a table for you to about.

705
01:08:39,399 --> 01:08:40,399
Uh-huh.

706
01:08:40,399 --> 01:08:41,399
Yeah.

707
01:08:41,399 --> 01:08:44,399
Like what I'm saying is like usually like,

708
01:08:44,399 --> 01:08:46,399
like the way like I saw it through the paper,

709
01:08:46,399 --> 01:08:47,399
like a, like,

710
01:08:47,399 --> 01:08:49,399
your example on the right would be,

711
01:08:49,399 --> 01:08:52,399
uh, could, would be a narrow dependency on less,

712
01:08:52,399 --> 01:08:53,399
right?

713
01:08:53,399 --> 01:08:57,399
Like you have several child and the parent partitions are like,

714
01:08:57,399 --> 01:08:58,399
uh, okay.

715
01:08:58,399 --> 01:09:00,399
So in general, okay, it is the case of court.

716
01:09:00,399 --> 01:09:02,399
Like if there's another child partition here,

717
01:09:02,399 --> 01:09:04,399
okay, so I'll maybe just wipe them, try to get it.

718
01:09:04,399 --> 01:09:08,399
So let's just separate the real picture that actually draws this.

719
01:09:08,399 --> 01:09:12,399
There is another child partition and basically operations.

720
01:09:12,399 --> 01:09:17,399
Uh, the transformations are.

721
01:09:17,399 --> 01:09:19,399
Exactly. Yeah.

722
01:09:19,399 --> 01:09:21,399
And that's narrow for sure.

723
01:09:21,399 --> 01:09:22,399
Really.

724
01:09:22,399 --> 01:09:25,399
This on the right side, this is why that's white.

725
01:09:25,399 --> 01:09:26,399
Yeah, yeah, that's what I meant.

726
01:09:26,399 --> 01:09:28,399
That that for sure is white.

727
01:09:28,399 --> 01:09:32,399
Yeah, the one you know what I drew is also white, I believe.

728
01:09:32,399 --> 01:09:33,399
Okay.

729
01:09:33,399 --> 01:09:36,399
If you do a, if you do an action like,

730
01:09:36,399 --> 01:09:38,399
collect the variant,

731
01:09:38,399 --> 01:09:40,399
yeah, it's a white dependency.

732
01:09:40,399 --> 01:09:41,399
Okay.

733
01:09:41,399 --> 01:09:42,399
It does it saying that it does the same.

734
01:09:42,399 --> 01:09:43,399
It has to come from different RUDs.

735
01:09:43,399 --> 01:09:45,399
It just says like it has to come from different partitions.

736
01:09:45,399 --> 01:09:47,399
So this is narrow.

737
01:09:47,399 --> 01:09:50,399
So I think narrow is only the case where there's one to one.

738
01:09:50,399 --> 01:09:51,399
Okay.

739
01:09:51,399 --> 01:09:55,399
There is like narrow means no communication.

740
01:09:55,399 --> 01:09:56,399
Right.

741
01:09:56,399 --> 01:10:03,399
Okay.

742
01:10:03,399 --> 01:10:07,399
Yeah.

743
01:10:07,399 --> 01:10:13,399
Yeah, I think I think the case where I was confused was like the like.

744
01:10:13,399 --> 01:10:19,399
Yeah.

745
01:10:19,399 --> 01:10:21,399
And many to one like.

746
01:10:21,399 --> 01:10:23,399
I think based on the definition of them like of the paper,

747
01:10:23,399 --> 01:10:25,399
like the many to one relation is still.

748
01:10:25,399 --> 01:10:26,399
It's still narrow.

749
01:10:26,399 --> 01:10:28,399
No, I think they mean it to be.

750
01:10:28,399 --> 01:10:29,399
I mean, yeah, yeah, yeah.

751
01:10:29,399 --> 01:10:31,399
But like strictly like if you read like.

752
01:10:31,399 --> 01:10:34,399
Yeah, I think maybe like an implementation.

753
01:10:34,399 --> 01:10:35,399
You'll see like.

754
01:10:35,399 --> 01:10:37,399
Yeah, what are you saying? Right?

755
01:10:37,399 --> 01:10:38,399
Like it's white.

756
01:10:38,399 --> 01:10:40,399
I was just like, I think if you read like the.

757
01:10:40,399 --> 01:10:41,399
Yeah, you could be confusing.

758
01:10:41,399 --> 01:10:43,399
Yeah, you can get confused.

759
01:10:43,399 --> 01:10:45,399
Like the many you want to relate to that.

760
01:10:45,399 --> 01:10:47,399
The one to many is clearly why.

761
01:10:47,399 --> 01:10:48,399
Yeah.

762
01:10:48,399 --> 01:10:50,399
But yeah, okay.

763
01:10:50,399 --> 01:10:51,399
Sounds good.

764
01:10:51,399 --> 01:10:52,399
Okay.

765
01:10:52,399 --> 01:10:54,399
Yeah, that was.

766
01:10:54,399 --> 01:10:58,399
I think the paper is easier to understand in general.

767
01:10:58,399 --> 01:10:59,399
Okay.

768
01:10:59,399 --> 01:11:00,399
Good.

769
01:11:00,399 --> 01:11:01,399
Okay.

770
01:11:01,399 --> 01:11:04,399
That is what we need to understand paper does the farm.

771
01:11:04,399 --> 01:11:05,399
Oh, yeah.

772
01:11:05,399 --> 01:11:06,399
Yeah.

773
01:11:06,399 --> 01:11:07,399
Yeah, I think.

774
01:11:07,399 --> 01:11:15,399
I think those were probably the most too heavy duty papers that we'll all seem to start.

775
01:11:15,399 --> 01:11:16,399
Okay.

776
01:11:16,399 --> 01:11:17,399
Nice.

777
01:11:17,399 --> 01:11:18,399
Farm is spanner.

778
01:11:18,399 --> 01:11:21,399
I think the remaining ones are a little bit more.

779
01:11:21,399 --> 01:11:22,399
More.

780
01:11:22,399 --> 01:11:24,399
I'm going to say straight forward, but.

781
01:11:24,399 --> 01:11:27,399
Perhaps a few are moving pieces.

782
01:11:27,399 --> 01:11:29,399
Nice.

783
01:11:29,399 --> 01:11:31,399
Okay. Awesome.

784
01:11:31,399 --> 01:11:32,399
Thanks for testing.

785
01:11:32,399 --> 01:11:34,399
Can I ask one last question?

786
01:11:34,399 --> 01:11:37,399
I just realized that I have.

787
01:11:37,399 --> 01:11:39,399
It was about the conversation.

788
01:11:39,399 --> 01:11:40,399
You can paralyze it.

789
01:11:40,399 --> 01:11:41,399
If.

790
01:11:41,399 --> 01:11:44,399
If it's on different predictions, but if it's also.

791
01:11:44,399 --> 01:11:46,399
You said if it's.

792
01:11:46,399 --> 01:11:48,399
Yeah, it's a stage, the stages, right?

793
01:11:48,399 --> 01:11:50,399
You know, there's sort of.

794
01:11:50,399 --> 01:11:54,399
What is like streaming parallelism, if you will, or pipeline parallelism.

795
01:11:54,399 --> 01:11:57,399
Let me see if I can find a picture.

796
01:11:57,399 --> 01:11:59,399
As one of them.

797
01:11:59,399 --> 01:12:02,399
Boom.

798
01:12:02,399 --> 01:12:05,399
I got to find a lineage graph.

799
01:12:05,399 --> 01:12:06,399
No.

800
01:12:06,399 --> 01:12:07,399
No.

801
01:12:07,399 --> 01:12:09,399
Here's what a lineage graph.

802
01:12:09,399 --> 01:12:10,399
Greg.

803
01:12:10,399 --> 01:12:13,399
Maybe here's a picture that we can modify.

804
01:12:13,399 --> 01:12:15,399
Do you see it?

805
01:12:15,399 --> 01:12:16,399
Yes.

806
01:12:16,399 --> 01:12:17,399
Okay.

807
01:12:17,399 --> 01:12:20,399
So basically, this is the lineage graph.

808
01:12:20,399 --> 01:12:21,399
He was to collect.

809
01:12:21,399 --> 01:12:25,399
And so this is like one stage work.

810
01:12:25,399 --> 01:12:27,399
And just guys are runs one of these stages.

811
01:12:27,399 --> 01:12:29,399
And each worker.

812
01:12:29,399 --> 01:12:30,399
For each petition.

813
01:12:30,399 --> 01:12:31,399
Right.

814
01:12:31,399 --> 01:12:33,399
So each.

815
01:12:33,399 --> 01:12:35,399
Worker.

816
01:12:35,399 --> 01:12:39,399
Runs a stage on the petition.

817
01:12:39,399 --> 01:12:48,399
So basically all these petitions are all these stages running parallel on different workers.

818
01:12:48,399 --> 01:12:51,399
Then within a stage that we're going to do.

819
01:12:51,399 --> 01:12:53,399
And then there's only.

820
01:12:53,399 --> 01:12:57,399
Because the stage is running parallel on different workers.

821
01:12:57,399 --> 01:13:05,399
Then within a stage, there's also parallelism because, you know, every filter.

822
01:13:05,399 --> 01:13:06,399
Is pipeline.

823
01:13:06,399 --> 01:13:12,399
Without, you know, they mean, like you really need to like the first end records.

824
01:13:12,399 --> 01:13:15,399
And then you apply the filter operation.

825
01:13:15,399 --> 01:13:16,399
And then.

826
01:13:16,399 --> 01:13:18,399
I'll produce this.

827
01:13:18,399 --> 01:13:24,960
and records. And then the next filter processed those and records,

828
01:13:24,960 --> 01:13:28,960
while it's processing those and records, the first filter reads the next end.

829
01:13:30,559 --> 01:13:36,000
And then produces them and passes them on and then makes them results in some number of records.

830
01:13:36,000 --> 01:13:45,279
And again, it goes on and on. And so basically all these transformations are pipeline.

831
01:13:45,279 --> 01:13:51,920
And so they're almost running concurrently. You're running not truly concurrently,

832
01:13:51,920 --> 01:13:57,920
but they're running in a pipeline fashion. Oh, I just said this is the batch thing that they were talking about.

833
01:13:59,599 --> 01:14:04,079
So things are passing badges and basically every stage of the pipeline processes batch.

834
01:14:05,519 --> 01:14:10,159
Okay, okay, yeah, that makes it super clear. Yeah, thank you so much. That was that was an interesting

835
01:14:10,159 --> 01:14:15,359
lecture. Thank you. Okay, you're welcome. Glad you enjoyed it. It's a cool system.

836
01:14:23,760 --> 01:14:29,599
Sorry, sorry, can you hear me now? Yeah, yeah, I didn't hear. I'm wondering what did you just check that?

837
01:14:29,599 --> 01:14:35,199
No problem. No, I'm sorry about that. I, yeah, sorry, I was listening. I um,

838
01:14:35,199 --> 01:14:39,599
I don't know. I realized we'd be going late. I'm going to try to make this question very quick.

839
01:14:39,599 --> 01:14:46,399
I've gotten to use Spark before. I've adjusted my schedule. Thank you. Thank you so much.

840
01:14:46,399 --> 01:14:54,000
So yeah, yeah, I really, really appreciate this lecture. Spark is actually something that I'm going to use in my future job.

841
01:14:54,000 --> 01:15:01,439
So I appreciate you teaching this to me. Just one thing probably, I'm not sure this lecture will really help you writing Spark programs.

842
01:15:01,439 --> 01:15:09,439
No, I, I mean, I did it as an intern really not knowing what I was doing, but like this has helped me give, like,

843
01:15:09,439 --> 01:15:17,759
get more context with it. So I guess the, the quick question with Spark programs that I, um, the way that I've

844
01:15:17,759 --> 01:15:26,239
understood Spark jobs is how Spark constructs a directed, a directed acyclic graph of all the tasks and.

845
01:15:26,239 --> 01:15:31,840
This is what you talked about with the wide partitions and narrow partitions.

846
01:15:31,840 --> 01:15:36,239
So, yeah, I guess they're called dependencies, not partitions, but.

847
01:15:36,239 --> 01:15:48,239
Oh, yep, sorry. Okay. Okay. Okay. Sorry. Um, that with, with RDDs, then I guess like, okay, this is different terminology between.

848
01:15:48,639 --> 01:16:00,239
The dependencies are like these tasks and the directed acyclic graph of all the tasks, but the RDDs that like each task in this graph is not represented by this RDD.

849
01:16:00,239 --> 01:16:04,239
Let me actually go back. So maybe dispatchers that are right.

850
01:16:04,239 --> 01:16:09,239
Yeah. And oh gosh, I appreciate you sitting here. Please let me know if you have to go.

851
01:16:09,239 --> 01:16:12,239
No, no, no, no, no, this point. Yeah, you have some more time. Yeah, yeah.

852
01:16:12,239 --> 01:16:16,239
Thank you. Um, so.

853
01:16:16,239 --> 01:16:19,239
Okay, so this is sort of an RDD, correct?

854
01:16:19,239 --> 01:16:23,239
Let me draw another color so we can agree.

855
01:16:23,239 --> 01:16:25,239
This is an RDD.

856
01:16:25,239 --> 01:16:28,239
Okay, an RDD has a bunch of partitions.

857
01:16:28,239 --> 01:16:33,239
And here's another RDD.

858
01:16:33,239 --> 01:16:35,239
Okay. Yep.

859
01:16:35,239 --> 01:16:40,239
And then the arrows are basically as sort of like a near same story.

860
01:16:40,239 --> 01:16:45,239
Let me actually finish this picture too on the site here's more partitions.

861
01:16:45,239 --> 01:16:51,239
Here's the RDDs from room, RDD, room, RDD.

862
01:16:51,239 --> 01:16:57,239
And then the transformations basically between RDDs, correct? And so in the arrows.

863
01:16:57,239 --> 01:17:01,239
Let me pick another color. These errors.

864
01:17:01,239 --> 01:17:04,239
Those are transformations.

865
01:17:04,239 --> 01:17:09,239
And then the only thing is like some of these arrows are white and some of them are narrow.

866
01:17:09,239 --> 01:17:13,239
And the graph from the graph, he can't really tell.

867
01:17:13,239 --> 01:17:19,239
Which ones are narrow or which ones are, which transformations are certain narrow transformations.

868
01:17:19,239 --> 01:17:21,239
And white transformations.

869
01:17:21,239 --> 01:17:23,239
You're talking about the transformation.

870
01:17:23,239 --> 01:17:24,239
Yeah, I'm not sure.

871
01:17:24,239 --> 01:17:25,239
I'm not sure.

872
01:17:25,239 --> 01:17:26,239
I'm not sure.

873
01:17:26,239 --> 01:17:27,239
I'm not sure.

874
01:17:27,239 --> 01:17:28,239
I'm not sure.

875
01:17:28,239 --> 01:17:29,239
I'm not sure.

876
01:17:29,239 --> 01:17:30,239
I'm not sure.

877
01:17:30,239 --> 01:17:31,239
I'm not sure.

878
01:17:31,239 --> 01:17:34,239
And white transformations.

879
01:17:34,239 --> 01:17:38,239
You're talking about the graph as the spark program actually shows you in there.

880
01:17:38,239 --> 01:17:40,239
Yeah, there's lineage graph.

881
01:17:40,239 --> 01:17:41,239
You can't tell.

882
01:17:41,239 --> 01:17:42,239
Gotcha.

883
01:17:42,239 --> 01:17:43,239
Okay.

884
01:17:43,239 --> 01:17:44,239
And that's the here.

885
01:17:44,239 --> 01:17:45,239
So here.

886
01:17:45,239 --> 01:17:47,239
Look at this lineage graph.

887
01:17:47,239 --> 01:17:50,239
This transformation, that transformation, that transformation, all that transformation.

888
01:17:50,239 --> 01:17:52,239
No, I would like narrow, because it's a single arrow.

889
01:17:52,239 --> 01:17:54,239
But it's not really true. Right?

890
01:17:54,239 --> 01:17:58,239
Like the last one, for example, must be a white one.

891
01:17:58,239 --> 01:18:00,239
Because there's more collective information from all of that.

892
01:18:00,239 --> 01:18:01,239
That's it.

893
01:18:03,239 --> 01:18:04,239
Okay.

894
01:18:04,239 --> 01:18:19,239
Then I guess I was wondering, like, do you have recommendations on resources for things that can show me how spark figures out how to construct the directed acyclic graph to do all these tasks.

895
01:18:19,239 --> 01:18:20,239
Yeah.

896
01:18:20,239 --> 01:18:22,239
Look at this.

897
01:18:22,239 --> 01:18:25,239
It's really a disclaimer that does all the right.

898
01:18:25,239 --> 01:18:33,239
And yeah, reading the paper, like, I, you know, I was trying to comprehend the paper as best as I could, but it's, you know, it's difficult to put.

899
01:18:33,239 --> 01:18:34,239
Yeah.

900
01:18:34,239 --> 01:18:35,239
I know all these papers are difficult to read.

901
01:18:35,239 --> 01:18:43,239
So the scheduler, I think I would go back first to my case thesis, my case doctoral thesis. I'm sure you have to cap around the scheduler.

902
01:18:43,239 --> 01:18:44,239
Gotcha.

903
01:18:44,239 --> 01:18:48,239
All right. All right. All good. And that, that'll show me just how spark figures out how to make this graph.

