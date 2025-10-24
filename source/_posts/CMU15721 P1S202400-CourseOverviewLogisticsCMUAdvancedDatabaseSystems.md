---
title: CMU15721 P1S202400 CourseOverviewLogisticsCMUAdvancedDatabaseSystems
---

1
00:00:00,000 --> 00:00:06,000
Caniki Mellon University's advanced database systems courses

2
00:00:06,000 --> 00:00:09,000
filming in front of a live studio audience.

3
00:00:13,000 --> 00:00:17,000
Guys, like I said, I can't be there for the first week of classes.

4
00:00:17,000 --> 00:00:22,000
Not here in California because somebody needed my help

5
00:00:22,000 --> 00:00:25,000
and had to come and ask for you to do something weird out here

6
00:00:25,000 --> 00:00:28,000
and so that's why I'm not in Pittsburgh for the first week.

7
00:00:28,000 --> 00:00:33,000
But it's always something, oh, you know, like, O'Annie knows how to deal with the

8
00:00:33,000 --> 00:00:36,000
****, go have him help us out or like, any of those amount of data

9
00:00:36,000 --> 00:00:38,000
we do, we go have help us.

10
00:00:38,000 --> 00:00:41,000
But it is what it is.

11
00:00:41,000 --> 00:00:48,000
So right now I'm out here in parking lot with like a hundred drifters

12
00:00:48,000 --> 00:00:50,000
and hanging out.

13
00:00:50,000 --> 00:00:53,000
But I figured now's the time to go through the class.

14
00:00:53,000 --> 00:00:54,000
Let's plath through this.

15
00:00:55,000 --> 00:00:59,000
So this lecture is not really going to be about the course material.

16
00:00:59,000 --> 00:01:02,000
It's really about what the course was going to be about.

17
00:01:02,000 --> 00:01:06,000
And then the logistics of like how the project is going to work out.

18
00:01:06,000 --> 00:01:10,000
Because that's going to be a big component about 15, 17, 21 this semester.

19
00:01:10,000 --> 00:01:13,000
I don't know what to spend time talking about that.

20
00:01:13,000 --> 00:01:19,000
It's just be different than the never thing, you know, the previous incarnations of the course.

21
00:01:19,000 --> 00:01:23,000
So I say it's always every semester or what should you take this course.

22
00:01:23,000 --> 00:01:29,000
And the straight answer is basically that databases are still in demand.

23
00:01:29,000 --> 00:01:34,000
They're super complicated to build, super complicated to maintain and optimize.

24
00:01:34,000 --> 00:01:38,000
And there's a lot of really interesting console problems in the end of the process.

25
00:01:38,000 --> 00:01:41,000
I'm running query and query and analytics.

26
00:01:41,000 --> 00:01:47,000
So this course is going to prepare you for, you know, career or research

27
00:01:47,000 --> 00:01:50,000
into data management systems.

28
00:01:51,000 --> 00:01:57,000
And the great thing about it is even if you don't want to go down that path of like doing database systems work.

29
00:01:57,000 --> 00:02:03,000
The things you're going to learn about, learn about in this semester are going to be valuable throughout the rest of your life.

30
00:02:03,000 --> 00:02:08,000
So, you know, if you can write code and database management system, you can write code and pretty much anything else.

31
00:02:08,000 --> 00:02:10,000
Anything else that's going to care about performance.

32
00:02:10,000 --> 00:02:17,000
If you really need to understand what data is, what the workload is, and how to take full advantage of hardware.

33
00:02:18,000 --> 00:02:22,000
And the way I think about it is also, too, is like, people pay you a lot of money for it.

34
00:02:22,000 --> 00:02:26,000
Part of the reason why I'm at your in California to deal with all that best.

35
00:02:26,000 --> 00:02:35,000
And if you don't believe me, here's a quick overview of some of the students have taken 721 for the last five, six years or so.

36
00:02:35,000 --> 00:02:38,000
And these are just the ones I can quickly remember off top of my head.

37
00:02:38,000 --> 00:02:43,000
And they all end up at awesome places getting paid a lot of money to work on database systems.

38
00:02:44,000 --> 00:02:50,000
So hopefully, you know, if you come over this this semester, you know, we'll put your photo up next year.

39
00:02:50,000 --> 00:02:57,000
So, and Databricks is surprisingly hired a lot of the best students were recently.

40
00:02:57,000 --> 00:03:01,000
But everyone goes everywhere, which is always good.

41
00:03:01,000 --> 00:03:11,000
So this course is really about the understanding and learning about the modern practices of how people build a data management system.

42
00:03:11,000 --> 00:03:18,000
And the techniques and the methods we're going to use to do systems programming to develop about these ideas.

43
00:03:18,000 --> 00:03:22,000
And this semester is going to talk about analytical workloads.

44
00:03:22,000 --> 00:03:26,000
So we're not going to really talk about transactions or doing right-heavy workloads.

45
00:03:26,000 --> 00:03:36,000
It's really about how do I have a large data sets and running queries on them quickly to extract new information and new knowledge from the databases or from that data.

46
00:03:36,000 --> 00:03:44,000
And so the goal is in addition to understanding all the methods and techniques of how people build a modern analytical database system.

47
00:03:44,000 --> 00:03:51,000
You'll learn how to write good code, that's how to for instance correct, how to write documentation and testing plans for that code.

48
00:03:51,000 --> 00:04:02,000
Because it's not just right, hey, here's our project we're done. When I have full-fledged testing methods and ways to ensure that things are operating correctly or things are producing correct results.

49
00:04:02,000 --> 00:04:07,000
There'll be a little bit of code reviews during the semester and then obviously working on a large code base.

50
00:04:07,000 --> 00:04:17,000
Maybe not entirely true for these projects in the beginning, but since we're doing semester-long projects this year, your code base is going to get quite large by the end.

51
00:04:17,000 --> 00:04:27,000
So we're really focusing here on student-based topics. We're not going to be rehashing stuff that we covered in the intro class or going through the textbook.

52
00:04:27,000 --> 00:04:37,000
It's really about looking at the latest research paper and the latest literature on building a modern system and then seeing how we can apply that to our...

53
00:04:37,000 --> 00:04:44,000
So at its core, the overarching model of the database system will be trying to build a developed...

54
00:04:44,000 --> 00:04:49,000
Well, at high level look a lot like the stuff we've covered in the intro class, it's got a classic database system.

55
00:04:49,000 --> 00:04:57,000
But it's really about how do we then infuse these ideas and these methods that have been developed for the last 10 years or so to accelerate query execution?

56
00:04:58,000 --> 00:05:07,000
So on that topic, these are the topics or these are the main ideas or sections we're going to cover throughout the semester.

57
00:05:07,000 --> 00:05:16,000
So first we're going to talk about what the data actually should look like, the data formats, how we're doing coding compression in such a way that they will speed up data access.

58
00:05:17,000 --> 00:05:24,000
But also reduce the footprint of radiators is also talking about different methods to accelerate query processing.

59
00:05:24,000 --> 00:05:34,000
So doing vectorized query execution or code generation query compilation, how to take a query plan, physical query plan and execute it most efficiently on the data.

60
00:05:34,000 --> 00:05:46,000
Then we'll look at a lot of larger view of the system, how we handle scheduling within a single query itself and over across the entire workload.

61
00:05:46,000 --> 00:05:56,000
How do we do... how to run general and run an algorithm sufficiently, how do we handle network protocols between the nodes and between the nodes and the client.

62
00:05:57,000 --> 00:06:05,000
We spend a lot of time talking about query optimization because again, it doesn't matter how fast we do our database system, if our query plan is sub optimal, we'll just garbage.

63
00:06:05,000 --> 00:06:10,000
Then all the stuff we're going to do before then doesn't actually matter. It's wasted time.

64
00:06:10,000 --> 00:06:20,000
And then we're going to spend a significant third of the lecture, a quarter of the lecture, a semester talking about or looking at real implementations of data systems.

65
00:06:21,000 --> 00:06:33,000
And this by reading the papers from the major players in industry and startups and sort of seeing how we can then apply or how they're applying all the techniques that we've been discussing in their particular systems.

66
00:06:33,000 --> 00:06:43,000
And essentially form a taxonomy, it'll say, okay, a system can do xyz and we then see how like snowflake does things or yellow brick does things.

67
00:06:43,000 --> 00:06:46,000
And so we'll cover that throughout the entire semester.

68
00:06:47,000 --> 00:06:56,000
So for this course, I'm assuming you are already taking the intercourse at CMU, 15445, 645 or something equipment in your undergraduate background.

69
00:06:56,000 --> 00:07:00,000
This is a graduate level course on modern data systems.

70
00:07:00,000 --> 00:07:09,000
We're talk about the classic algorithms, like how to do a hash join, but what's the way how to do it in a modern setting on today's hardware.

71
00:07:10,000 --> 00:07:17,000
So there's a bunch of things I'm not going to go over as background, a relational algebra, storage models, basic memory management, and so forth.

72
00:07:17,000 --> 00:07:29,000
Like all those things we're not going to discuss, I'm going to assume you already know them and it's really about, okay, how do you do a high performance modern parallel hash join, right, as cash contracts or so forth.

73
00:07:29,000 --> 00:07:35,000
So that's the flavor for the discussion throughout the semester.

74
00:07:35,000 --> 00:07:39,000
The course policies and schedule, please always refer to the course webpage.

75
00:07:39,000 --> 00:07:51,000
I've posted that this week and these we update a little bit with some of the readings later this semester will get changed a little bit, but for at least the first couple of weeks, the schedule is pretty set.

76
00:07:51,000 --> 00:07:56,000
And then the we'll talk about what's required for you are deliverables throughout the semester.

77
00:07:56,000 --> 00:08:03,000
But again, I'll just say as we go along, obviously don't don't plagiarize, don't try to steal things, don't cheat.

78
00:08:03,000 --> 00:08:12,000
And if you're not sure, please, please come talk to me, if we do catch you cheating in some kind of way, which again for a graduate level course, this should not be an issue, then we hope they're referred you to Warner Hall.

79
00:08:12,000 --> 00:08:15,000
And that's not that's not good for anybody.

80
00:08:15,000 --> 00:08:23,000
I'm going to have my office hours twice a week, immediately after class, 30 or 430 in my office and then I floor and gates.

81
00:08:23,000 --> 00:08:29,000
If there's this is this time is not convenient for you, send me an email and then we can try to figure out something else.

82
00:08:30,000 --> 00:08:39,000
So, you know, I'll say this every semester, what can we talk about when you come to office hours with me while we talk about, you know, your status on the project, how that's going.

83
00:08:39,000 --> 00:08:46,000
If you have questions about the papers, I want to know more about the particular topic that go beyond the things we discussed in class, happy to talk about those things.

84
00:08:46,000 --> 00:08:51,000
A lot of you going to want to get data based jobs and the semester, so we're talking about how we can facilitate that.

85
00:08:51,000 --> 00:08:57,000
And like I said, like I know how to handle the police, until so extent.

86
00:08:57,000 --> 00:09:02,000
Obviously, if you're, you try to, if you try to run from that, I can't help with that.

87
00:09:02,000 --> 00:09:09,000
But whatever, again, if you're going to involve in databases, you're going to be end up in a parking lot teaching classes at some point or doing something.

88
00:09:09,000 --> 00:09:14,000
So by all means, talk to me before we have problems later on.

89
00:09:14,000 --> 00:09:20,000
We have one teaching assistant this semester, that's my number one PGA student, William Zhang.

90
00:09:20,000 --> 00:09:32,000
So he's actually seeing me undergrad. He graduated 4.0. He actually took this class when he was a sophomore and crushed it in the way that's suspiciously good for a sophomore.

91
00:09:32,000 --> 00:09:39,000
But he's legit. So we asked him to stick around and he's continued with his PhD after spending a little time at single store.

92
00:09:39,000 --> 00:09:56,000
He's a dataless company and he's working with us now. He's fantastic. So he's the TA for, as a good further along the projects, he might, he might help me to come into us when we help each group with their implementations.

93
00:09:56,000 --> 00:10:06,000
He's Canadian. You know, it's, it's fine. He's been good to us. So we have, we have, we have, should we know issues with that for anybody in the course?

94
00:10:06,000 --> 00:10:10,000
If you have a problem with this, let me know.

95
00:10:10,000 --> 00:10:19,000
All right, all the discussion for the data operations, of course, and just as we go along in the projects, you know, we want to do the piata.

96
00:10:19,000 --> 00:10:23,000
If you have a technical question about the projects or anything, every again, post everything in piata.

97
00:10:23,000 --> 00:10:35,000
So we can, we can all continue to contribute as a class. If any personal questions or anything that's not related to project, any logistical things, send those emails directly to me.

98
00:10:36,000 --> 00:10:46,000
All right, so here's the breakdown for the grade of the semester. So there's going to be four parts. And as you can see at the bottom, the semester long project, that's obviously the bulk of the grade.

99
00:10:46,000 --> 00:10:56,000
And so if your PGA student is course counts for, I think the software systems are elected. And this is the reason why it's going to be, it's, we're heavily focused on the, in the projects.

100
00:10:56,000 --> 00:11:03,000
So I go, I go through each of these one, one by one, but I spend most of my time at the end talking about the semester long project.

101
00:11:04,000 --> 00:11:13,000
So for every class, except when the groups are presenting the project updates and so forth, there'll be a assigned reading.

102
00:11:13,000 --> 00:11:22,000
So in the, if you look at the schedule, there'll be one paper per class that has this crown next to it, the icon indicate that it's the primary reading.

103
00:11:22,000 --> 00:11:31,000
So this is the one that you're responsible for. If you want to go beyond the topics in the course, like if it's related to your project or just, you're just curious, the other readings are considered optional.

104
00:11:31,000 --> 00:11:51,000
And on some of them, I'll cover in the lecture, but like the assigned readings, the main one that's sort of like the canonical provides the sort of canonical description of the technique or trying to cover the most important version of the technique trying to cover.

105
00:11:52,000 --> 00:11:59,000
So for every, all these primary readings before class, you have to submit a synopsis through a Google form at the URL there.

106
00:11:59,000 --> 00:12:06,000
And the idea is here, you just, so you'd read the paper and then summarize what the, the paper's actually trying to tell us about.

107
00:12:06,000 --> 00:12:14,000
What method is it trying to show us? And by writing it down, it forces you to really think about, okay, do I really understand what the, what the paper's trying to say.

108
00:12:14,000 --> 00:12:22,000
So the synopsis is not meant to be like a really long book report. It's really just be like a quick summary of what the paper, the key parts of the paper is.

109
00:12:22,000 --> 00:12:34,000
So you have the first part of like three sentences, both main idea, what context they're trying to describe this particular method, and what are the key findings or takeaways from the paper.

110
00:12:34,000 --> 00:12:39,000
And then like a one sentence description of like what system they're going to use to enter by wishing.

111
00:12:39,000 --> 00:12:46,000
In some cases, it's obvious because it's like, oh, the paper's from snowflake. So they're talking about their everything in context of snowflake.

112
00:12:46,000 --> 00:12:55,000
Or maybe like they hacked up postgres or not DBE and put it on that. So like, just understanding what was being modified, what was being evaluated, that would be super useful.

113
00:12:55,000 --> 00:13:01,000
And then the last one is describing what workloads or benchmarks they're using in their valuation to test their particular ideas or method.

114
00:13:01,000 --> 00:13:10,000
And the reason why this last one is important because when it comes time to start testing and evaluating your projects, you know, I don't want you to come and say, hey, what workloads should it use.

115
00:13:10,000 --> 00:13:17,000
You should know because you're going to see a bunch of these things over and over again throughout the entire semester in these papers.

116
00:13:17,000 --> 00:13:21,000
So again, it's the half to be submitted before the class starts.

117
00:13:21,000 --> 00:13:28,000
And everyone is granted three, a lot of three skip workloads, skip three workloads during the

118
00:13:28,000 --> 00:13:30,000
the

119
00:13:30,000 --> 00:13:32,000
doing the

120
00:13:32,000 --> 00:13:34,000
next semester.

121
00:13:34,000 --> 00:13:40,000
Okay.

122
00:13:40,000 --> 00:13:45,000
So again, for these, again, the whole point is for you to learn from, you know,

123
00:13:45,000 --> 00:13:51,000
learn something from the papers. So it doesn't help you if you just go take the paper and dump it into chat GBT and that's what it's not.

124
00:13:51,000 --> 00:13:59,000
You don't get a thing out about it. So please don't do that. If there's some reason these papers that you find on the internet, just don't copy them in.

125
00:13:59,000 --> 00:14:06,000
Don't copy from your fellow classmates. Again, we will, we will have to go turn everybody into one all.

126
00:14:06,000 --> 00:14:10,000
If you get caught doing this, so don't be stupid.

127
00:14:10,000 --> 00:14:11,000
All right.

128
00:14:11,000 --> 00:14:20,000
In addition to the synopsis for every every every class is also going to be, each student is going to be required to write lecture notes.

129
00:14:20,000 --> 00:14:31,000
Think of this as like a longer version of the synopsis, but also covering all the ideas and other papers we're discussing in the class, which may not have included in the single paper assignment.

130
00:14:31,000 --> 00:14:38,000
Right. So the idea is like you watch the lecture and summarize the slides and the key things that we're talking about into.

131
00:14:38,000 --> 00:14:42,000
And I have examples how it would be so like we'll put everything on GitHub.

132
00:14:42,000 --> 00:14:47,000
We'll put everything on the course website. We'll make these available to both current students in the class.

133
00:14:47,000 --> 00:14:53,000
So it'll help them on the final exam, but also in future future years and people outside see you.

134
00:14:53,000 --> 00:15:00,000
So again, these notes should just be sort of limited to the things that we discuss in the slides.

135
00:15:00,000 --> 00:15:05,000
Oftentimes students will ask questions and I'll start saying crazy stuff.

136
00:15:05,000 --> 00:15:12,000
That does not be included. Again, anything about the slides is sort of the key thing there.

137
00:15:12,000 --> 00:15:17,000
So every student is going to be assigned to do this once per lecture.

138
00:15:17,000 --> 00:15:21,000
Problem is that we have more students in the lecture. So I got to figure out how to handle that.

139
00:15:21,000 --> 00:15:26,000
So right now there's a minute, the administration spreadsheet. There's an assigned lecture date with everybody's Android.

140
00:15:26,000 --> 00:15:31,000
That will be a, we got to figure out how to, how to load balance that accordingly.

141
00:15:31,000 --> 00:15:36,000
I don't care who does what. So if there's a top, you really want to cover and you want to swap somebody else by all means do that.

142
00:15:36,000 --> 00:15:41,000
You don't need to ask me to, for mission knew that just go ahead and do it.

143
00:15:41,000 --> 00:15:44,000
And for this one, you're a lot of use jet dbt or whatever you want.

144
00:15:44,000 --> 00:15:55,000
Because we don't care because it's really about like using as an assistive technology to help you flesh out the core ideas or things you want to capture in writing.

145
00:15:55,000 --> 00:16:01,000
So by all means, like if you want to take the transcripts from the videos and put that into jet dbt and let it summarize it for you,

146
00:16:01,000 --> 00:16:05,000
but then use it as the starting point to then flesh out further.

147
00:16:05,000 --> 00:16:14,000
Go ahead and do it. And in the end, you're ultimately responsible for what that lecture, what the lecture notes are going to say.

148
00:16:14,000 --> 00:16:22,000
So chat gbt starts going off the chain and start saying things like, actually one year said embedded, I embedded like com store stuff, which is not true.

149
00:16:22,000 --> 00:16:30,000
So if you have to start saying BS and you put that in there and turn those lecture notes, well now you didn't, you didn't, you didn't that that.

150
00:16:30,000 --> 00:16:36,000
And you read that for right. So obviously, again, be smart using the technology.

151
00:16:36,000 --> 00:16:44,000
Alright, there'll be a final exam that'll be take home long form. I'll give you out the questions at the last day of the class.

152
00:16:44,000 --> 00:16:48,000
And then you'll turn it in when we have the final exam final presentation during finals week.

153
00:16:48,000 --> 00:16:52,000
And again, this is not meant to be.

154
00:16:52,000 --> 00:16:57,000
It's not going to say, you know, the question's not going to be like, okay, what does this paper say about this particular thing?

155
00:16:57,000 --> 00:17:12,000
The idea is to see whether you can synthesize a bunch of different ideas from the various materials to talk about in the semester and then put them in a new context work, a new theoretical system, and so on.

156
00:17:12,000 --> 00:17:24,000
You can understand not just how individual ideas work, but how they all sort of fit together into a larger system, which is sort of the key thing that we want to focus on here.

157
00:17:24,000 --> 00:17:29,000
Alright, so the big part of the semester is going to be the semester long project.

158
00:17:29,000 --> 00:17:40,000
And the idea, the, you know, the high level idea what we want to do is we basically want to start building a, you know, a new database running system here at Carnegie Mellon, both myself and the other president of J. N. F. Patel.

159
00:17:40,000 --> 00:17:51,000
And so the course is going to basically be the sort of starting point for fleshing out some of these components we need in this larger system.

160
00:17:51,000 --> 00:18:00,000
And so one of the overarching themes we're going to have for how we design things going forward is a data activity.

161
00:18:00,000 --> 00:18:10,000
So not just the ideas like can the system automatically adjust a query wise running or throw us the self whites running based on the data that sees or different characteristics of the hardware.

162
00:18:10,000 --> 00:18:13,000
And can we do that incrementally over time?

163
00:18:13,000 --> 00:18:20,000
Again, I'll explain what that is as we go far that long, but that's the overarching theme is this is sort of in that direction.

164
00:18:20,000 --> 00:18:23,000
We decided to do everything in rust the semester.

165
00:18:23,000 --> 00:18:28,000
I, like I said, I did not, I did not know rust before the semester. And as I send the email to you guys.

166
00:18:28,000 --> 00:18:34,000
I know a lot of you don't as well. So we're not going to teach you rust. We'll just sort of pick it up as we go along.

167
00:18:34,000 --> 00:18:37,000
We don't know what we have a name for this system yet.

168
00:18:37,000 --> 00:18:43,000
But you know, which is always one of the hardest things to do in career science.

169
00:18:44,000 --> 00:18:52,000
So, but the idea is that we can take all these components to different projects, put them together and make a full-fledged system, maybe next semester in the fall or the summer.

170
00:18:52,000 --> 00:19:01,000
So I have a way to kind of name systems, but it's right now it's, you know, it's names should to be determined.

171
00:19:01,000 --> 00:19:09,000
So the way we're going to do this is that every group is very student is going to be assigned to a group and we have groups of three.

172
00:19:09,000 --> 00:19:13,000
And then there'll be five topics of components of this larger system, we're end up building.

173
00:19:13,000 --> 00:19:21,000
And the idea is that we have roughly 30 students, you do three groups of 10, sorry 10 groups of three.

174
00:19:21,000 --> 00:19:26,000
And you would have two groups assigned to build the, the same component.

175
00:19:26,000 --> 00:19:32,000
And so they'll have to collaborate a little bit, make sure that they figure out what the specification of that component is.

176
00:19:32,000 --> 00:19:38,000
Then they're also going to compete with that, that I'm going to try to build a faster or better implementation than that.

177
00:19:38,000 --> 00:19:48,000
At the end, we'll have a vote decide who gets, you know, which component of the two, the same top of which implementation, the same component and the same topic is, is the winner.

178
00:19:48,000 --> 00:19:54,000
And we'll, you know, we'll use that going forward in future research and future projects.

179
00:19:54,000 --> 00:19:58,000
So everything I said here is true, except for the optimizer group and that's why that's different.

180
00:19:58,000 --> 00:20:06,000
But the basic idea is because the query optimization is so hard and we only have a semester, it's unlikely anybody's going to build a query optimizer in a single semester.

181
00:20:06,000 --> 00:20:11,000
So whereas the other components we could build a working part of that fairly quickly in a small group.

182
00:20:11,000 --> 00:20:19,000
So the idea is that we will, the after the team, they'll have to collaborate together more so than the others.

183
00:20:20,000 --> 00:20:24,000
So there's five, there's five project areas, our project topics.

184
00:20:24,000 --> 00:20:30,000
The first four here are the ones where again, they will have two groups and we're trying to implement the same thing and compete against each other.

185
00:20:30,000 --> 00:20:37,000
So the first is going to be a scheduler. This is the part, the system that figures out, here's the queries I need to run.

186
00:20:37,000 --> 00:20:40,000
How do I break them up and send them to different nodes?

187
00:20:40,000 --> 00:20:48,000
And then as the queries are running, how do I keep feeding, or I say, as the queries are running, how do I keep feeding tasks to the nodes that keep them saturated in order to get the data?

188
00:20:48,000 --> 00:20:50,000
You've saturated and it was busy.

189
00:20:50,000 --> 00:20:58,000
The execution engine are the parts of the system that's going to take those tasks for the query plans and actually start executing process and data.

190
00:20:58,000 --> 00:21:04,000
To simplify things, we're going to assume that the execution engine will be a single node.

191
00:21:04,000 --> 00:21:12,000
The next component is the catalog service and this is going to be the internal database files and keep track of the database files in the schema.

192
00:21:12,000 --> 00:21:23,000
And this will then be fed into the query optimizer and the scheduler to figure out, okay, here's the data I have, here's the tables I have and had a journey like the physical plans for those.

193
00:21:23,000 --> 00:21:37,000
And the last one here will be the IO service, the thing that's actually responsible for going out to disk or an object store, retrieving the blocks of data that are needed by the system and then distributing them to the various nodes that need it.

194
00:21:37,000 --> 00:21:48,000
They can also maintain its own local, federal cache so that we don't have to do expensive calls to the object store to read writing from local disk.

195
00:21:48,000 --> 00:22:05,000
And it says the query optimizer for that piece, the idea is that SQL query shows up and then we want to use a combination of roll-based optimizations or heuristics and a call-space search to determine the best physical plan for that query.

196
00:22:05,000 --> 00:22:10,000
We do have an additional prototype now that a student worked on last semester called OPD.

197
00:22:10,000 --> 00:22:16,000
It's a fork of data fusion, which we'll explain that as we go along for the semester.

198
00:22:16,000 --> 00:22:27,000
So it follows the data, data fusion internal format for query plans, but it doesn't rely on them data fusion to do, you know, join, join ordering and other things.

199
00:22:27,000 --> 00:22:34,000
So again, the way in query optimizer is super, super hard. We're not going to get, you know, a telly, we're not going to get too far in a single semester.

200
00:22:34,000 --> 00:22:47,000
And so the idea is like instead of having two groups built over the new things for this part here, it makes sense for them to work collaboratively different parts of the system, different parts of the optimizer for working on a particular single code base.

201
00:22:48,000 --> 00:22:57,000
So for all the other projects, we want to implement this on scratch. We're okay with you taking heavy inspiration from open source things like data fusion.

202
00:22:57,000 --> 00:23:05,000
That's one thing we're looking at, particular, another one, Bellox from Facebook, our meta for their execution engine. That's the C++.

203
00:23:05,000 --> 00:23:16,000
So we're okay with you, you know, just looking these things, discussing them. If it's open source and if we figure out how to bar this idea and put it to her.

204
00:23:16,000 --> 00:23:28,000
So for this semester, it will be four projects, sorry, four milestones. So the first one coming up, we generate 31st will be the project proposal.

205
00:23:28,000 --> 00:23:40,000
And then the next one is the second, then it'll be two status updates once a month. And then at the end of the semester, whenever we're assigned a final, a final day in May, then we'll have the final presentation.

206
00:23:40,000 --> 00:23:46,000
And then everyone will be required to do the code drop on GitHub to turn in the system.

207
00:23:46,000 --> 00:23:53,000
But again, the idea here is that by having these incremental updates, and even in some classes at the end, we have extra time.

208
00:23:53,000 --> 00:24:02,000
And then we'll discuss how everyone's, you know, the progress everyone's doing on the projects and anything that is coming up, any problems and issues amongst, you know, amongst everyone.

209
00:24:02,000 --> 00:24:09,000
And that way, like, it's not like everyone disappears without any feedback and they show up at the end of May and be like, hey, you know, here's my project, how did I do?

210
00:24:09,000 --> 00:24:16,000
Like everyone's going to know how, how everyone else is doing. And we sort of see how all these things sort of fit together.

211
00:24:16,000 --> 00:24:23,000
So the first thing coming up on the 31st is in two weeks will be the project proposal. And this will have three parts.

212
00:24:23,000 --> 00:24:32,000
It'll have a plan, one or two pages of a markdown file describing how you're going to actually implement the thing that the part of the system you're working on.

213
00:24:32,000 --> 00:24:37,000
And then you give a five minute presentation of the class and say, here's the high level ideas of what we're trying to do.

214
00:24:37,000 --> 00:24:51,000
And a key thing which you want to describe is also not only how you're going to build your thing and what ideas and what what libraries and so forth, you're going to take advantage of, but actually how you're going to test your implementation to see that it's actually correct.

215
00:24:51,000 --> 00:24:55,000
Make sure there's no errors and problems that you go along.

216
00:24:55,000 --> 00:25:04,000
In addition to the project proposal itself, you're also going to turn in a specification proposal for what the API of your component is going to be.

217
00:25:04,000 --> 00:25:14,000
So you sort of think of these five projects as all sort of microservices. And though it's an internal API that is going to allow one project team to call your service to get whatever it needs.

218
00:25:14,000 --> 00:25:21,000
So like if the execution engine team, the obviously need a physical plan.

219
00:25:21,000 --> 00:25:31,000
So the query optimization team or the scheduled teams can have to give query plans in a format that the execution engine team can actually use.

220
00:25:31,000 --> 00:25:35,000
So we want to be up front and figure out what the API is ahead of time.

221
00:25:35,000 --> 00:25:39,000
So everyone knows how to talk to other parts, other parts of the system.

222
00:25:39,000 --> 00:25:45,000
So the API should cover like when the commands or operations you're going to expose what are the input and output and coding is going to be.

223
00:25:45,000 --> 00:25:52,000
So I accept for the OS at query plans or like, you know, if it's the I.O. service, what are the data blocks actually going to look like?

224
00:25:52,000 --> 00:25:55,000
Is it going to be parquet format or something else? Right.

225
00:25:55,000 --> 00:25:59,000
And then how we're going to handle status codes and error handling for these.

226
00:25:59,000 --> 00:26:03,000
I'm not going to care about authentication or any security stuff.

227
00:26:03,000 --> 00:26:06,000
Again, this is just a prototype for us.

228
00:26:06,000 --> 00:26:10,000
So all those things we don't have to worry about.

229
00:26:10,000 --> 00:26:19,000
And so now what's going to happen also to with this API justification is that the two groups that are building the same component have the same API.

230
00:26:19,000 --> 00:26:27,000
So the way this is going to work is each group is going to have to have designated one person as a liaison that's going to talk to the other group.

231
00:26:27,000 --> 00:26:33,000
And they have to get together to decide, okay, here's the, here's what the API needs to be.

232
00:26:33,000 --> 00:26:42,000
And so that way if we decide to choose one project versus another at the end of the semester, they'll implement the same API to everything that still work.

233
00:26:42,000 --> 00:26:55,000
And then the liaisons, when it may need to talk to liaisons and other groups, make sure that they understand what the, you know, what is expected of the data or the, the outputs that they're generating.

234
00:26:55,000 --> 00:27:07,000
So for the API is rather than write everything scratch because it's certainly two weeks is not enough to figure it all this out, especially for some of you that are like coming up to us, you know, from, from, you know, first time thinking about these things.

235
00:27:07,000 --> 00:27:11,000
We want to reuse as much existing APIs as possible.

236
00:27:11,000 --> 00:27:18,000
So example would be the catalog service should just reuse the Apache iceberg API.

237
00:27:18,000 --> 00:27:22,000
Expose that same, same interface and that'll save a bunch of trouble.

238
00:27:22,000 --> 00:27:29,000
So for the career optimizer team, the cal site would be another choice of any API we could use for execution engine.

239
00:27:29,000 --> 00:27:30,000
We could follow the logs or data.

240
00:27:30,000 --> 00:27:44,000
So by all means reach out to the, I would discuss this class reach out to the, the TAs and structures will figure out, okay, here's the, here's the API, you should be, you should be trying to follow these guides towards something to look at.

241
00:27:44,000 --> 00:27:55,000
The other cool thing actually to it if the two project teams also implement the same API, then you could do end to end high level testing and use the same infrastructure.

242
00:27:55,000 --> 00:28:10,000
So for example, like, if the API is the same, then like the catalog service you could have like, you get this table metadata, you could have testing code that could be reused for, for both those teams along the same API.

243
00:28:11,000 --> 00:28:15,000
So then throughout the, the later this semester, we'll have two status updates.

244
00:28:15,000 --> 00:28:20,000
And this is just a five minute presentation in class to everyone to say, here's the status of the project.

245
00:28:20,000 --> 00:28:25,000
Like, here's how far we've made it. Here's what's changed in our plan since the last time we presented.

246
00:28:25,000 --> 00:28:31,000
What are some of the surprises you've encountered of, you know, either how hard or how easy some sort of things are going to be.

247
00:28:31,000 --> 00:28:39,000
We'll talk more about this as go along, but we'll have, we'll enable like testing coverage checks and make sure like your tests are actually, you're writing code and it's actually being very, very important.

248
00:28:39,000 --> 00:28:43,000
And then you're going to be able to see how things are evolving over time.

249
00:28:43,000 --> 00:28:47,000
So you'll want to basically mean this is what you have to turn on the semester.

250
00:28:47,000 --> 00:28:55,000
So just keep maintaining this document as you go along so that it's not like you'd go right from scratch when it comes time for like for finals week.

251
00:28:55,000 --> 00:28:59,000
And then you can see how things are evolving over time.

252
00:28:59,000 --> 00:29:03,000
And then you can see that this is what you have to turn on the semester.

253
00:29:03,000 --> 00:29:10,000
So just keep maintaining this document as you go along so that it's not like you'd go right from scratch when it comes time for like for finals week.

254
00:29:10,000 --> 00:29:15,000
And again, the liaisons were want to talk to each other. So here's how we implement.

255
00:29:15,000 --> 00:29:21,000
Here's how I'm going to implement certain benchmarks and tests because at the end of the semester, we want to actually do comparisons in some way.

256
00:29:21,000 --> 00:29:28,000
So you can see what's the effectiveness or for API coverage or performance of these different parts.

257
00:29:28,000 --> 00:29:31,000
So how are you actually going to compare these guys?

258
00:29:31,000 --> 00:29:45,000
And then during the finals week, we'll have a final presentation and talk about here's what you implemented, what you accomplished, and then how to measure the performance differences between the two different implementations.

259
00:29:45,000 --> 00:29:54,000
For the final benchmarks that compare your implementation as the other groups, we'll have, we have nice dedicated machines here at CMU that you want to use for these valuation.

260
00:29:54,000 --> 00:30:00,000
So we'll coordinate this later, but the liaisons will be responsible for actually scheduling the time and running those benchmarks.

261
00:30:00,000 --> 00:30:06,000
So we have a true apples app, let's compare some between the different groups.

262
00:30:06,000 --> 00:30:16,000
And then lastly is that we're not going to say any project is completed until we get a final code drop. And that means all the comments and other code of use issues on GitHub, volume addressed.

263
00:30:16,000 --> 00:30:22,000
We have all proper test cases, we make sure everything's sort of working and we have nice documentation and comments in the source code.

264
00:30:22,000 --> 00:30:28,000
So you can set you hand it over to the next class and let them pick up where you left off.

265
00:30:28,000 --> 00:30:42,000
Or in some cases, some of you students are doing master's thesis or you know, capture projects, you know, when you come back in the spring semester or so the fall semester, you have something to pick up on and you know how to keep continuing things.

266
00:30:43,000 --> 00:30:52,000
Alright, so this one doesn't go to that saying, you don't want to plagiarize, don't copy code that's not yours without getting permission from structures.

267
00:30:52,000 --> 00:30:58,000
Again, for some things like parts of an execution engine, you can go look at data fusion and see how they do certain things.

268
00:30:58,000 --> 00:31:06,000
I'm not saying they do everything correctly, but the best way, but if you want to sort of pick high the ideas of how they set up the code, that's okay.

269
00:31:06,000 --> 00:31:11,000
But you know, obviously just don't wholesale copy things and try to pass it off as your own.

270
00:31:11,000 --> 00:31:21,000
We make sure that we know that the lineage of any source code that we're adding to this project, you know, where it came from and make sure that it's another right serving sense.

271
00:31:22,000 --> 00:31:28,000
Alright, so that's it for now. The sun's coming out. I got it going.

272
00:31:29,000 --> 00:31:40,000
So for next class, we'll have the first lecture on the first paper on sort of modern analytical systems. So this will be, I think from the data guys describing what they do.

273
00:31:42,000 --> 00:31:49,000
You'll want to submit the first reading review for this game before class starts and then use that link there and that'll take you to the Google form to fill it out.

274
00:31:50,000 --> 00:32:01,000
And I also talk a little more about project logistics. I'll put some on Piazza. Again, you're not in a group had a had to find a group and start getting the process of writing your project proposal, let's do it 31st.

275
00:32:02,000 --> 00:32:17,000
And then for the election notes, again, go check to see what your sign notes data is and for the ones that are where we have more, we have more students and lectures. Again, we'll figure out some alternative or something else to do to spread the vocal out of evening.

276
00:32:17,000 --> 00:32:22,000
Okay, guys, have that. See you in class of Monday next week.

277
00:32:47,000 --> 00:32:50,000
You

278
00:33:17,000 --> 00:33:20,000
You

