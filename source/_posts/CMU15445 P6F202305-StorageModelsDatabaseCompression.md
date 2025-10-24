---
title: CMU15445 P6F202305 StorageModelsDatabaseCompression
---

1
00:00:00,600 --> 00:00:03,899
ized

2
00:00:03,899 --> 00:00:27,820
All right, let's get started.

3
00:00:27,820 --> 00:00:29,820
DJ JPL.

4
00:00:29,820 --> 00:00:34,820
I know you got a live show coming up.

5
00:00:34,820 --> 00:00:36,820
We'll talk about that in a second.

6
00:00:36,820 --> 00:00:38,820
So quickly, for you guys in the class,

7
00:00:38,820 --> 00:00:41,820
again, homework one is do this Friday on the 15th.

8
00:00:41,820 --> 00:00:45,820
Project one is out and be due on October 1st.

9
00:00:45,820 --> 00:00:47,820
Even though we haven't discussed what a buffer pool is yet,

10
00:00:47,820 --> 00:00:50,820
buffer manager is, you can get started if you want.

11
00:00:50,820 --> 00:00:54,820
Again, it's where you're going to allocate memory that gets you written out the disk.

12
00:00:54,820 --> 00:00:55,820
Okay.

13
00:00:55,820 --> 00:00:59,820
The upcoming events next Monday,

14
00:00:59,820 --> 00:01:01,820
a day event Aiken will be giving a talk with us.

15
00:01:01,820 --> 00:01:03,820
You see me, alumni, you see me, you see me,

16
00:01:03,820 --> 00:01:09,819
this group of alumni, giving a talk at our seminar series on the...

17
00:01:09,819 --> 00:01:10,819
Oh, you ****.

18
00:01:10,819 --> 00:01:16,819
The show is here, giving a talk at a seminar series on Zoom on Monday.

19
00:01:16,819 --> 00:01:23,819
And then, before that, DJ JPL is having a concert this Saturday at 9 pm on campus

20
00:01:23,819 --> 00:01:26,819
in Ragnos in the...

21
00:01:26,819 --> 00:01:28,819
You see it, right?

22
00:01:28,819 --> 00:01:30,819
Are you letting you sign autographs or no?

23
00:01:30,819 --> 00:01:33,819
I mean, like, CBS is still haggling all the price.

24
00:01:33,819 --> 00:01:34,819
Okay, yeah.

25
00:01:34,819 --> 00:01:35,819
Just the days.

26
00:01:35,819 --> 00:01:36,819
CNU is kind of weird.

27
00:01:36,819 --> 00:01:39,819
They won't let him, like, it's a big show and they won't let him sign autographs afterwards.

28
00:01:39,819 --> 00:01:41,819
It's some stupid...

29
00:01:41,819 --> 00:01:42,819
Yeah.

30
00:01:42,819 --> 00:01:43,819
Well, I'm going to do that.

31
00:01:43,819 --> 00:01:45,819
So, we'll not discuss today.

32
00:01:45,819 --> 00:01:47,819
Let's jump right into it.

33
00:01:47,819 --> 00:01:52,819
So, last class, we were talking about alternative approaches to the two-poor.

34
00:01:52,819 --> 00:01:57,819
To the two-poor oriented or Slot of Page storage scheme that we presented last week.

35
00:01:57,819 --> 00:02:02,819
And in particular, we've spent a lot of time talking about the log structured storage method

36
00:02:02,819 --> 00:02:05,819
where instead of storing the actual two-poels, the store...

37
00:02:05,819 --> 00:02:10,819
The log entries of the changes you've made to two-poels.

38
00:02:10,819 --> 00:02:14,819
And I said that was popular in sort of modern systems that are more right-intensive.

39
00:02:14,819 --> 00:02:17,819
So, the three approaches we talked about,

40
00:02:17,819 --> 00:02:22,819
so that the two-poor oriented Slot of Pages, the log structured storage, the index-organized storage.

41
00:02:22,819 --> 00:02:28,819
These storage approaches are ideal for workloads that are right-heavy.

42
00:02:28,819 --> 00:02:32,819
Meaning, if you're doing a lot of inserts, updates, or deletes, right?

43
00:02:32,819 --> 00:02:37,819
The log structure one is obviously better for this because you just begin your pending to the log.

44
00:02:37,819 --> 00:02:40,819
And for a lot of applications, or most applications when you start off,

45
00:02:40,819 --> 00:02:41,819
this is...

46
00:02:41,819 --> 00:02:45,819
You're going to be a more potentially right-heavy workload.

47
00:02:46,819 --> 00:02:49,819
But there's going to be some applications, or some environments, or some workloads

48
00:02:49,819 --> 00:02:53,819
where maybe you don't care about getting the best performance for rights.

49
00:02:53,819 --> 00:02:57,819
What you really want to do is get the best performance for reads.

50
00:02:57,819 --> 00:03:03,819
And therefore, these approaches may not be the best way to approach it.

51
00:03:03,819 --> 00:03:06,819
So, I'm going to spend a little time talking about what sort of broad categories

52
00:03:06,819 --> 00:03:08,819
of data applications look like.

53
00:03:08,819 --> 00:03:12,819
And then that'll be motivation for why we want to look at an alternative storage scheme

54
00:03:12,819 --> 00:03:15,819
where maybe we don't want to store everything that's just rows,

55
00:03:15,819 --> 00:03:19,819
like the two tables with all the attributes together.

56
00:03:19,819 --> 00:03:22,819
So, this is a rough categorization.

57
00:03:22,819 --> 00:03:26,819
But in industry, if you study sort of these three approaches,

58
00:03:26,819 --> 00:03:28,819
you say you're one of these three approaches,

59
00:03:28,819 --> 00:03:31,819
people roughly know what you mean.

60
00:03:31,819 --> 00:03:34,819
So, the first category of applications are called OLEDTP,

61
00:03:34,819 --> 00:03:36,819
or online transaction processing.

62
00:03:36,819 --> 00:03:41,819
And these are applications where you're ingesting new data from the outside world

63
00:03:41,819 --> 00:03:45,819
and you're serving a lot of users at the same time.

64
00:03:45,819 --> 00:03:49,819
So, again, the example application I always like to use is Amazon.

65
00:03:49,819 --> 00:03:53,819
When you go to the Amazon website, you look at products,

66
00:03:53,819 --> 00:03:56,819
then you click things, you add them to your cart, and then you purchase them.

67
00:03:56,819 --> 00:04:00,819
Maybe you go to your account information, and you go update your mailing address,

68
00:04:00,819 --> 00:04:02,819
or payment information.

69
00:04:02,819 --> 00:04:08,819
Those are all considered OLEDTP style workloads because you're making changes

70
00:04:08,819 --> 00:04:11,819
to a small subset of the database.

71
00:04:11,819 --> 00:04:15,819
Like you're going updating your cart, going updating your payment information.

72
00:04:15,819 --> 00:04:19,819
So, think of posting things on Reddit or hacker news.

73
00:04:19,819 --> 00:04:22,819
Those are making small changes, which potentially could be a large database,

74
00:04:22,819 --> 00:04:26,819
but the amount of change each query or operation is making is small.

75
00:04:26,819 --> 00:04:28,819
The amount of data that they're reading is small.

76
00:04:28,819 --> 00:04:31,819
They're reading for a single entity.

77
00:04:31,819 --> 00:04:35,819
So, contrast this with online analytical processing or OLAP workloads,

78
00:04:35,819 --> 00:04:40,819
and this is where I want to use, I'm going to run queries that are an extract

79
00:04:40,819 --> 00:04:45,819
or extrapolate new information across the entire data set.

80
00:04:45,819 --> 00:04:47,819
So, this would be like Amazon running a query that says,

81
00:04:47,819 --> 00:04:52,819
find me the number one sold product in the state of Pennsylvania on a Saturday

82
00:04:52,819 --> 00:04:55,819
when the temperature is above 80 degrees.

83
00:04:55,819 --> 00:04:59,819
It's not looking at a single person or looking at a single entity,

84
00:04:59,819 --> 00:05:01,819
but looking across the entire table.

85
00:05:01,819 --> 00:05:07,819
Potentially doing a lot of joins also with additional information,

86
00:05:07,819 --> 00:05:12,819
so let me turn to the things you guys have done in homework one.

87
00:05:12,819 --> 00:05:17,819
So, in these OLAP workloads, they're going to be primarily re-heavy or read only.

88
00:05:17,819 --> 00:05:23,819
I'm not doing single updates, I'm going doing large scans of and joins of our big tables.

89
00:05:23,819 --> 00:05:30,819
And this last one is sort of a buzzword from the industry analyst or Gartner called HTAB.

90
00:05:30,819 --> 00:05:34,819
And this is basically, there's some applications where you want to do both the OLAP

91
00:05:34,819 --> 00:05:38,819
workloads and the OLAP workloads, potentially in the same system.

92
00:05:38,819 --> 00:05:41,819
So, instead of having to meet, take all my transactional data,

93
00:05:41,819 --> 00:05:45,819
put it into a separate data warehouse, and then do my analytics on there,

94
00:05:45,819 --> 00:05:49,819
maybe I could do some analytics directly as the data comes in.

95
00:05:49,819 --> 00:05:52,819
We'll discuss this sort of throughout the semester,

96
00:05:52,819 --> 00:05:57,819
but the main two ones you want to focus on are OLAP.

97
00:05:57,819 --> 00:06:02,819
Another way to think about the distinction between them is sort of a simple grid like this,

98
00:06:02,819 --> 00:06:07,819
where along the X-axis, I'm saying whether the workload is meet right heavy,

99
00:06:07,819 --> 00:06:11,819
versus read heavy, and then the Y-axis says how complex the queries are.

100
00:06:11,819 --> 00:06:13,819
So, you can sort of divide it up like this.

101
00:06:13,819 --> 00:06:17,819
OTP would be down in this corner because we're doing potentially a lot of updates,

102
00:06:17,819 --> 00:06:20,819
but the queries are going to execute are going to be really simple.

103
00:06:20,819 --> 00:06:26,819
Like, go select single, you know, go select star from the count table where your ID equals Andy.

104
00:06:26,819 --> 00:06:29,819
Right, it's going getting single things.

105
00:06:29,819 --> 00:06:32,819
OLAP would be on the opposite end of the spectrum here,

106
00:06:32,819 --> 00:06:37,819
where we're doing mostly writes, and the writes are mostly reads,

107
00:06:37,819 --> 00:06:43,819
and the reads, the select queries are going to be executing are going to be much more complex

108
00:06:43,819 --> 00:06:45,819
than we do in the OLP2B world.

109
00:06:45,819 --> 00:06:48,819
Think of like Q9, Q10 in homework 1.

110
00:06:48,819 --> 00:06:53,819
So, OLAP, the OLP term, it goes back to the 80s.

111
00:06:53,819 --> 00:06:57,819
OLAP comes from the 90s, this guy that named Jim Gray,

112
00:06:57,819 --> 00:07:01,819
his famous database teacher, who invented a lot of stuff when we talked about this semester,

113
00:07:01,819 --> 00:07:06,819
he wrote an article saying, hey, there's this new category of workloads in the early 90s,

114
00:07:06,819 --> 00:07:08,819
called OLAP, and we should pay attention to it.

115
00:07:08,819 --> 00:07:13,819
Turns out he was actually getting paid by a company who was trying to sell OLAP database system product

116
00:07:13,819 --> 00:07:17,819
in the early 90s, and the paper got retracted, but the name still stuck around.

117
00:07:17,819 --> 00:07:21,819
And then Jim Gray won the touring word in databases in I think 96, right?

118
00:07:21,819 --> 00:07:24,819
It's a very famous database researcher.

119
00:07:24,819 --> 00:07:29,819
And has anybody heard of the story node? Has anybody heard of Jim Gray before?

120
00:07:29,819 --> 00:07:30,819
It's one, sort of.

121
00:07:30,819 --> 00:07:35,819
So, he famously got lost at C in the San Francisco Bay in 2006.

122
00:07:35,819 --> 00:07:38,819
He was out sailing by himself, he was not a joke, he was out sailing by himself,

123
00:07:38,819 --> 00:07:41,819
and his boat disappeared.

124
00:07:41,819 --> 00:07:44,819
And this is actually one of the early examples of crowdsourcing,

125
00:07:44,819 --> 00:07:48,819
because they actually moved satellites to take pictures of the San Francisco Bay

126
00:07:48,819 --> 00:07:53,819
and try to, you know, people look at the images, try to find the boat, and they never found them.

127
00:07:53,819 --> 00:07:54,819
All right?

128
00:07:54,819 --> 00:08:00,819
And so then, that's a weird tangent, but I never met him, but like, a lot of the,

129
00:08:00,819 --> 00:08:04,819
you know, we talked about, like, you know, going to Plutov versus reading the book in front of you,

130
00:08:04,819 --> 00:08:08,819
you know, that was a Jim Gray metaphor. He had a lot of interesting things like that.

131
00:08:08,819 --> 00:08:10,819
All right, so, Hdat would be sort of the metal.

132
00:08:10,819 --> 00:08:17,819
So, today, I want to spend time talking about why the things we talked about so far

133
00:08:17,819 --> 00:08:21,819
and the pre-stue lectures, they're going to be good for OTP and not O-Lap,

134
00:08:21,819 --> 00:08:27,819
and then we'll design a storage scheme that is better for O-Lap.

135
00:08:27,819 --> 00:08:31,819
So, to do this, we're going to do a real simple example using a real database.

136
00:08:31,819 --> 00:08:36,819
So, this is roughly what the WikiPedia database looks like.

137
00:08:36,819 --> 00:08:41,819
It runs a software called MediaWiki, it runs off of my SQL and PHP.

138
00:08:41,820 --> 00:08:47,820
Like, it's open source, you can go look at it, and the schema roughly looks like this.

139
00:08:47,820 --> 00:08:50,820
Right? There'll be user accounts, people that are actually making changes.

140
00:08:50,820 --> 00:08:55,820
There'll be pages, like the articles in WikiPedia, and then there'll be revisions for those articles.

141
00:08:55,820 --> 00:08:58,820
And so, there's a foreign key reference for a revision.

142
00:08:58,820 --> 00:09:05,820
You have the user that created the change, and then the, an ID to the actual, the page itself.

143
00:09:05,820 --> 00:09:10,820
But all the text itself is going to go in the revision part.

144
00:09:10,820 --> 00:09:18,820
Right? And there's a, there's a, there's a funky going back from the page to revisions so you can find the latest, latest revision.

145
00:09:18,820 --> 00:09:25,820
So, I said this before, and I'll say it again, the relational model does not define or specify that,

146
00:09:25,820 --> 00:09:29,820
anything about how we should store the data in a table.

147
00:09:29,820 --> 00:09:32,820
Right? And so, in all the examples I've shown so far, we're just showing the two,

148
00:09:32,820 --> 00:09:34,820
but every table, all the attributes, one after another.

149
00:09:34,820 --> 00:09:39,820
Yes, we said there was overflow pages for large attributes, but you know, that's, that's, that's, that's,

150
00:09:39,820 --> 00:09:43,820
in general, all the, all the, the smaller attributes will store together.

151
00:09:43,820 --> 00:09:46,820
But there's nothing about, again, the relational model says you have to do that,

152
00:09:46,820 --> 00:09:48,820
just sort of what we as humans came up with first.

153
00:09:48,820 --> 00:09:51,820
It's easy for us to conceptually think about.

154
00:09:51,820 --> 00:09:54,820
But again, for OLAP workloads, this may not be the best thing.

155
00:09:54,820 --> 00:09:58,820
So, let's see how it works for, for, for OLTP. Right?

156
00:09:58,820 --> 00:10:02,820
For, again, for OLTP, it's going to be a bunch of small queries that are going, sorry,

157
00:10:02,820 --> 00:10:07,820
it's going to be a lot of queries that are going to be real simple, and they're going to read or write a small amount of data,

158
00:10:07,820 --> 00:10:10,820
relative to all the data in the database. Right?

159
00:10:10,820 --> 00:10:15,820
So, the first query here is just going get the, for a given page, given, given its page ID,

160
00:10:15,820 --> 00:10:18,820
go get me the latest revision for it.

161
00:10:18,820 --> 00:10:22,820
So, it's a join against the revision table, but it's one page and one revision.

162
00:10:22,820 --> 00:10:24,820
It's, it's retrieving that.

163
00:10:24,820 --> 00:10:28,820
The next one is the update query is somebody logging in, you know, you have a user ID,

164
00:10:28,820 --> 00:10:33,820
assuming they've been authenticated, and you update the user count with the time step of the last time they logged in,

165
00:10:33,820 --> 00:10:36,820
and the host name from where they logged in from.

166
00:10:36,820 --> 00:10:41,820
Or if I do an insert into the revision table, it's inserting a single row. Right?

167
00:10:41,820 --> 00:10:44,820
And this is what usually people end up with when they build a brand new application,

168
00:10:44,820 --> 00:10:49,820
like if you're, you know, if you're going to create a startup and you start building some online service,

169
00:10:49,820 --> 00:10:53,820
you usually end up with something level like this because you don't have any data in the beginning,

170
00:10:53,820 --> 00:10:58,820
you need to get it and you make a website and then your website is going to run these kind of queries.

171
00:10:58,820 --> 00:11:06,820
Again, for, and for, oh, that, we're going to do more complicated things that requires to look at larger portions of the table.

172
00:11:06,820 --> 00:11:13,820
So, this is actually a rough approximation of a real query where people were running,

173
00:11:13,820 --> 00:11:20,820
you would look at the user accounts in Wikipedia, and you find all the, the, the login attempts from,

174
00:11:21,820 --> 00:11:26,820
from users that had an IP address or a host name that ended with .gov. Right?

175
00:11:26,820 --> 00:11:34,820
Because there was like a, there was a scandal late 2000s, early 2010s where like people in Congress are having their staff go update Wikipedia

176
00:11:34,820 --> 00:11:38,820
to say more flattering things about, you know, the congressman or congresswoman, right?

177
00:11:38,820 --> 00:11:43,820
Like pens did this, Joe Biden did this, right? So this query could find all people that were doing that.

178
00:11:43,820 --> 00:11:49,820
So we basically were paying government employees to go update Wikipedia, and I shouldn't have. Right?

179
00:11:49,820 --> 00:11:58,820
Again, so this is queries we're going to execute on data of app we've already collected it from, from sort of the old to be portion of the application.

180
00:11:58,820 --> 00:12:03,820
So the thing we need to talk about now is what I'll call the, the storage model.

181
00:12:03,820 --> 00:12:15,820
And this is going to be how the database is going to physically organize tuples in, in disk and in memory relative to their other tuples in their own attributes.

182
00:12:15,820 --> 00:12:23,820
And so up until now, again, I've been assuming that all of the attributes are contiguous for a tuple, and that's sort of roughly called a, a, a row store.

183
00:12:23,820 --> 00:12:29,820
But again, for O that, that actually may not be the best thing, and we'll see why in a, in a second.

184
00:12:29,820 --> 00:12:41,820
And the reason why we have to discuss this part of a system because there is a clear distinction in the marketplace now or in, in, in the database world, between a row store system and a column store system.

185
00:12:41,820 --> 00:12:47,820
With a row store system, you'd want to use that for OTP, and for column store system, you'd want to use that for OLAB.

186
00:12:47,820 --> 00:12:55,820
And then anybody tries to say, hey, I've got a fast row store that you can use for analytics, you know, you should be very skeptical.

187
00:12:55,820 --> 00:13:04,820
All right, so the three choices to do are the, the anary storage model or NSM, that's the row store decomposition storage model, DSM, that's the column store.

188
00:13:04,820 --> 00:13:12,820
And then a hybrid approach is actually, this is the most common one for column stores. Well, we'll see why in a second. It's called packs or partition attribute across.

189
00:13:12,820 --> 00:13:22,820
And most time people say they have a column store, they really have the packs one, but it's, it's, it's, it's not a major major major major difference.

190
00:13:22,820 --> 00:13:26,820
All right, let's start with the first one, the NSM row store.

191
00:13:26,820 --> 00:13:36,820
Again, this is what we've already said so far this semester. We assume that almost all the attributes for a given tuple are going to be stored continuously in a single page, you know, one attribute after another.

192
00:13:36,820 --> 00:13:47,820
And the idea is, again, you're going across in the page and you're laying out all the data for a given tuple, and you don't start anything, you don't lay down any bits for the next tuple until you finish the current tuple.

193
00:13:48,820 --> 00:13:58,820
And the reason why this is going to be better for an OTP system is, as I already said before, OTP application is that most of the queries are going to be accessing a single entry or single tuple.

194
00:13:58,820 --> 00:14:07,820
Right? And so now I can go to a single page and get all the data I need for that single attribute. And that's, that's really all I need for to satisfy that query.

195
00:14:08,820 --> 00:14:13,820
We're already talking about page sizes, but again, it's always been some months multiple of hard pages.

196
00:14:13,820 --> 00:14:21,820
So this is basically the same layout that we saw before, right? That we have some database page, we have a header in the front with a slot array.

197
00:14:21,820 --> 00:14:36,820
And then as we start scanning through our table and want to start or just getting through the application, what starts inserting data, it's just going to go append the entries to the end and keep adding adding more and then till it does think it's filled up, right?

198
00:14:37,820 --> 00:14:50,820
And again, now if any query comes along, says select star from this table, where ID equals something, we did go to get this one page, jumped at the offset as defined the slot array, and we get all the data that we need.

199
00:14:50,820 --> 00:14:54,820
So let's see now in how this works in a Wikipedia example.

200
00:14:55,820 --> 00:15:01,820
Say we have a query here, where someone wants to log in, they're passing in a username and a password, we're just checking to see whether that matches.

201
00:15:01,820 --> 00:15:08,820
This is roughly how you log into a database back application, or if you do authentication database, it roughly looks like this.

202
00:15:08,820 --> 00:15:19,820
And again, to be able to ignore how we actually find the data that we want for one given user, but assume there's some kind of index, hash table, B plus tree, it doesn't matter, we'll cover that and let's generate.

203
00:15:19,820 --> 00:15:25,820
And then the way to say for this user account, here's the record ID and offset.

204
00:15:25,820 --> 00:15:38,820
So now we go into our page directory and we find a page that has the data we're looking for, we look in the slot array, we jump to some offset, and now we have all the data that we need for this query query, and we can produce the result.

205
00:15:38,820 --> 00:15:42,820
Again, so this is the idea for OTP because all the data is just continuous.

206
00:15:42,820 --> 00:15:54,820
Same thing we want to do in insert, all we need to do is look in our page directory, find a page that has a free slot, go bring it memory, assume it's this one, and then append it to the end of it.

207
00:15:54,820 --> 00:15:56,820
That's fine.

208
00:15:56,820 --> 00:16:06,820
But now if I try to run that query before, again, when I'm trying to find all the, get the number of times you log in per month if they end with a hostname with .gov,

209
00:16:06,820 --> 00:16:14,820
now you see in this case here, I got to scan all the pages in the table because I need to look at everything, all the user accounts.

210
00:16:14,820 --> 00:16:26,820
And then when I bring a page in, the way we're going to roughly execute the query, we haven't got to have a new query execution yet, but the roughly right idea is that we got this wear clause thing that's looking up on hostname.

211
00:16:26,820 --> 00:16:33,820
So we need to go find the tuples in the page that, where that that predicate on the hostname is satisfied.

212
00:16:33,820 --> 00:16:40,820
So the only data we really need to look at is just the hostname here.

213
00:16:40,820 --> 00:16:46,820
Then we got to do the aggregate on the last log in for the group by.

214
00:16:46,820 --> 00:16:53,820
And so that means the only data we really need to look at for that push in the query is just these attributes here.

215
00:16:53,820 --> 00:16:57,820
So what's the obvious problem?

216
00:16:58,820 --> 00:17:03,820
Get through all the rows and you brought a bunch of data and you actually don't need, right?

217
00:17:03,820 --> 00:17:13,820
So in order to get just the attributes I needed, I had to bring in the entire page, but the entire page brings on a bunch of attributes, user ID, user name, user pass, that I don't need for this query.

218
00:17:13,820 --> 00:17:21,820
So I'm basically doing useless IO. I'm fetching data in from disk and I don't even need it at all.

219
00:17:21,819 --> 00:17:26,819
So not only is that slow, but in some systems you pay per disk IOPS.

220
00:17:26,819 --> 00:17:33,819
In Aurora on Amazon, if you read something from disk, you pay per the number of IO operations you're doing for a query.

221
00:17:33,819 --> 00:17:40,819
So in this case here, I'd be paying for data that I don't actually even need.

222
00:17:40,819 --> 00:17:43,819
So that's the obvious problem with NSM.

223
00:17:43,819 --> 00:17:49,819
Again, great for inserts update, it's great for queries that need to get the entire, all the data for a single entity in the database.

224
00:17:49,819 --> 00:17:59,819
But if you want to scan large portions of a table and you only need a subset of the attributes which most OLAP queries only need, right?

225
00:17:59,819 --> 00:18:05,819
It's very rare if you call a select star on a really wide, huge table because you're basically dumping the whole thing out.

226
00:18:05,819 --> 00:18:08,819
There's utilities to make that go faster other than the select star.

227
00:18:08,819 --> 00:18:14,819
So this can be bad for OLAP because we're bringing in data that we don't need.

228
00:18:14,819 --> 00:18:26,819
This is a low level detail, but going back to this portion here, if you think about how you would actually execute the query to do this, to run this predicate,

229
00:18:26,819 --> 00:18:31,819
I'm jumping around to different locations in memory to do my scan.

230
00:18:31,819 --> 00:18:38,819
So I've got to read this header for the first tuple, figure out how far I need to jump over to get the host name.

231
00:18:38,819 --> 00:18:42,819
Then I can maybe look at the last log and I'm computing the aggregate as I go along.

232
00:18:42,819 --> 00:18:48,819
But then I jump down to the next tuple and then jump over to get to the, you know, it's a host name attribute.

233
00:18:48,819 --> 00:19:02,819
So in a modern super scale, I see, this is terrible because there's a bunch of these non-sequential operations that could also be non-deterministic where my memory locations that I'm accessing is going to be sort of,

234
00:19:02,819 --> 00:19:11,819
it's not random because you're always going in an increasing order, but it's not going to be like, I'm just reading strides of memory and crunching through it very quickly.

235
00:19:11,819 --> 00:19:17,819
That's a low level detail that we don't really cover in this semester, but it's at least worth discussing.

236
00:19:17,819 --> 00:19:26,819
And then we'll see this at, we'll cover compression later in this lecture, but in this case here, we're not going to be able to get a compression rate if you want to reduce the amount of,

237
00:19:26,819 --> 00:19:41,819
pack in more data within a single page because all the attributes for a given table are just thrown together in that page and there's no, there's going to be less chance for repeatability or less chance for identifying, hey, these values are the same, I can compress them really well.

238
00:19:41,819 --> 00:19:54,819
Right, again, it's going back, we have, we have a user ID, that's going to be integer, user names can be random string, user pass random string, right, it's going to be all sort of different value domains and that's not going to be ideal for compression.

239
00:19:54,819 --> 00:20:18,819
So the alternative approach is the DSM, the columnar storage, the composition storage model, and the idea here is that instead of storing all the attributes for a single tuple together in a page, we're going to store all the attributes for all tuples, sorry, for all tuples, we're going to store a single attribute in a single page, right, I just had that last log in field, instead of having all intermixed with the other attributes within a single page, we're going to store all the attributes for a single page.

240
00:20:18,819 --> 00:20:28,819
Right, I just had that last log in field, instead of having all intermixed with the other attributes within a single page, we're only just had that last log in attribute.

241
00:20:28,819 --> 00:20:47,819
And this is going to be ideal now for OLAP queries because they're going to scan the entire table and only for only a subset of the attributes, and now when I go fetch a page from disk, I'm only getting data, I know I'm only getting data for the has attributes that actually need, and not for other things that just sort of gets carried along for the right.

242
00:20:48,819 --> 00:21:00,819
So the, again, the benefit of a declared language like SQL is that you don't have to know, not to care whether you're running on a row store system versus a column store system, your same SQL query works just fine, this is the same.

243
00:21:00,819 --> 00:21:15,819
But now it's the database system for responsibility, meaning us, people actually building it, it's our responsibility to take data, split it up into separate columns, separate attributes, and then stitch it back together to when we need to produce results.

244
00:21:18,819 --> 00:21:22,819
All right, so this is just another the same diagram I showed before.

245
00:21:22,819 --> 00:21:28,819
Again, the way to think about this is that for the first column here, for its attribute column A, we will have a separate file with a bunch of pages.

246
00:21:28,819 --> 00:21:32,819
It'll have a header now just to tell us what's inside the page.

247
00:21:32,819 --> 00:21:46,819
And then now we'll have the null bitmap for all the columns, sorry, for all the values within that within within this column, followed by now the continuous values for all the two tables in the table.

248
00:21:47,819 --> 00:21:51,819
And we just do it for the next one and the next one.

249
00:21:51,819 --> 00:21:53,819
All right.

250
00:21:53,819 --> 00:22:02,819
And so these are still, these files are still be broken up as database pages like we talked about before, so either 4 kilobytes, 8 kilobytes, whatever, whatever the system supports.

251
00:22:02,819 --> 00:22:09,819
But the file itself will contain, again, just just the data for a single attribute.

252
00:22:10,819 --> 00:22:29,819
And now the metadata overhead for these different files is actually much less than a row store because I don't have to keep track of like every single column, whether it could be null or not, the different information about the offsets or what to find things.

253
00:22:29,819 --> 00:22:40,819
Right. These are all going to be the metadata at the store because it's just all the same value domains are all the same attribute type is we much less than a row store.

254
00:22:40,819 --> 00:22:53,819
All right. So the idea here again, so we go back to our Wikipedia example, we just take the the every column for for our table and then we're going to store that as a separate page.

255
00:22:54,819 --> 00:23:03,819
Right. So if you go back to the, you know, for the host name example, within a single page, again, we're only storing values for the host name column.

256
00:23:03,819 --> 00:23:07,819
And we'll have separate pages for all all our attributes.

257
00:23:07,819 --> 00:23:17,819
So now if you go back to this, this, this, the other lab query here again, we're doing the look up the counting number logins per month with the from government addresses.

258
00:23:17,819 --> 00:23:32,819
The first part X, unit query is going get the host name, well, that's assuming it's, it's one page per attribute that's going fetching that one page and then doing the scan is ripping through the column and identifying all the matches for that, for that host name.

259
00:23:32,819 --> 00:23:40,819
And again, I have 100 complete utilization of all the data that I brought in because I'm only bringing in the data I need for, for this query.

260
00:23:40,819 --> 00:23:49,819
I'm not bringing in attributes that I don't care about. And then now we'll talk about this later how we do, we talk about query execution, how we, how we match things up.

261
00:23:49,819 --> 00:23:55,819
But assuming I keep track of a list of here's the offsets of the tuples within this column that match my predicate.

262
00:23:55,819 --> 00:24:15,819
Then I go to now to the last log in page, go fetch that again, that only has data that we need. And then now I know how to jump to the different offsets of the matching host names to find the right offset for the log in the log in time stamp and then compute whatever I need for the query.

263
00:24:15,819 --> 00:24:18,819
So this is clear.

264
00:24:18,819 --> 00:24:23,819
Who here is here to column storms before today? Less than 10%.

265
00:24:23,819 --> 00:24:37,819
Again, so this is a, it sort of seems obvious now. This is clear the way you want to do this, but up to like 15 years ago, I mean 20 years ago, this is not how any Davies system was actually built. It was very, very rare.

266
00:24:37,819 --> 00:24:38,819
Yes.

267
00:24:38,819 --> 00:24:56,819
So your question is, if I go back to the, the road store example.

268
00:24:56,819 --> 00:25:01,819
This one here, your question is what, sorry, if even in this one, do I have to.

269
00:25:01,819 --> 00:25:09,819
I was like, this one.

270
00:25:09,819 --> 00:25:14,819
Oh, like this, this one. Yeah, yeah, literally this, okay, yes. Why is it?

271
00:25:14,819 --> 00:25:16,819
How do you know the index from like that?

272
00:25:16,819 --> 00:25:22,819
Where? How does it know where that you can password equals?

273
00:25:22,819 --> 00:25:31,819
Oh, okay. This question is, I said there's some index. I didn't say what it was. There's some magic way to say, look at the wear clause where it says username equals something, right?

274
00:25:31,819 --> 00:25:39,819
Because you would go to index and username. And I magically got to the single record, again, the record ID page ID and offset. How did I do that?

275
00:25:39,819 --> 00:25:44,819
That's what the index does. That's next week. Right? It's just a key value.

276
00:25:44,819 --> 00:25:54,819
You can think of a key value map or associative array for giving key, the username, give be the record ID or record IDs if it's non unique. That matched this.

277
00:25:54,819 --> 00:26:01,819
Then I, then so I get that. My next gives me the record ID. I look at my page directory, said, okay, I need page 123. Where's that?

278
00:26:01,819 --> 00:26:08,819
It's on here. It's either in memory or in disk. I go get it. And now I have the slot number from the record ID and I look in that page and jump to that slot.

279
00:26:08,819 --> 00:26:15,819
So that allows me to jump exactly to the page I need. And then within that page, go to get exactly the record I need.

280
00:26:15,819 --> 00:26:23,819
But again, like I only need one one assuming user names are unique. I only need one username.

281
00:26:23,819 --> 00:26:28,819
So when I had to go fetch all these other rows, I don't actually need.

282
00:26:28,819 --> 00:26:29,819
Yes.

283
00:26:29,819 --> 00:26:40,819
So just to understand like the only difference between a column base, like the only disadvantage of column base would have is slightly more implementation on the DBMS side.

284
00:26:40,819 --> 00:26:42,819
What do you like slight more imitation?

285
00:26:42,819 --> 00:26:49,819
I mean, your DBMS has to be more intelligent because now it has to keep map of different columns and stitch them together.

286
00:26:49,819 --> 00:26:58,819
Where in a row base, you don't really care. You want to have the access of the whole row. You can compare the host name. You can compare the login at a single instance.

287
00:26:58,819 --> 00:27:08,819
Where if you are doing it column based, you will have to have some more intelligence to understand what I'm putting out because I'm matching two different columns.

288
00:27:08,819 --> 00:27:10,819
I would say they're equally as hard.

289
00:27:10,819 --> 00:27:17,819
If you don't care about other, but much other protections like we're not going to transactions, but like.

290
00:27:18,819 --> 00:27:24,819
If you don't care about those things, then yeah, I would agree that like a row store would be easier to.

291
00:27:24,819 --> 00:27:35,819
It's again, you just like, everything's here. I assume it all packs in then yeah, then assuming that every record can fit into a single page ignoring overflows, then a row store would be potentially easier.

292
00:27:35,819 --> 00:27:36,819
Yes.

293
00:27:36,819 --> 00:27:37,819
Yes.

294
00:27:37,819 --> 00:27:44,819
So the fact that like a data store and like a row, then it will come from very different, considerable by the whole word, which it can probably have in the title.

295
00:27:44,819 --> 00:27:52,819
So this question is, is the fact that a, should the data system store is a row store versus a column store?

296
00:27:52,819 --> 00:27:56,819
Is this something that's configurable by table or is this, it's sort of all there nothing?

297
00:27:56,819 --> 00:28:04,819
So most systems are going to be row only or column only, right?

298
00:28:05,819 --> 00:28:09,819
The HTAP stuff, the hybrid stuff, sort of tries to do sort of, sort of, both.

299
00:28:13,819 --> 00:28:20,819
So typically you would say, yeah, so in most systems you would say, I know I'm using this system, it's going to be a column store.

300
00:28:20,819 --> 00:28:22,819
So I'll store everything in there, right?

301
00:28:22,819 --> 00:28:25,819
The tables will be column, column up.

302
00:28:26,819 --> 00:28:38,819
Now, even though I said like the, like, even though it's a column store and we're going to be optimized for read only queries, people obviously want to update data, right?

303
00:28:38,819 --> 00:28:52,819
And so the way you typically get around that is these systems would have a sort of row store buffer area and it typically is log structure, where if I have any updates, I apply them to that row portion.

304
00:28:53,819 --> 00:28:56,819
And then periodically I would then merge them into the column store, right?

305
00:28:56,819 --> 00:28:58,819
That's one approach to this.

306
00:28:58,819 --> 00:29:09,819
Oracle does a different approach where the row store is considered the primary storage location of the database, but then they'll make a copy of your tables in a column store format.

307
00:29:09,819 --> 00:29:12,819
And they, they're responsible for keeping the sort of things updated for you.

308
00:29:12,819 --> 00:29:21,819
So different approach to these different things, but typically, if the system supports, I want a row store versus a column store, you could define it on a portable basis, but most systems don't do that.

309
00:29:22,819 --> 00:29:23,819
Yes.

310
00:29:23,819 --> 00:29:33,819
Many of you think column store systems have the data if you have the number of as many disks that you have applied for every column.

311
00:29:33,819 --> 00:29:36,819
Would you have the right to update the abstractivable system?

312
00:29:36,819 --> 00:29:48,819
This question is, if I have as many disks as I have columns, assuming I break up in a column store or a table, and every attribute goes to a separate disk, would that be as fast as a row store?

313
00:29:49,819 --> 00:29:55,819
Well, no, because you have to, you still have to do that, that's splitting apart and writing it all out, right?

314
00:29:55,819 --> 00:30:03,819
And then you also would have more pressure in memory because, because again, say I have a thousand attributes.

315
00:30:03,819 --> 00:30:14,819
So now, if I have to update a thousand pages, I have to have a thousand pages in my buffer pool to do the update to put, you know, the each, updating each of them with the new instant attribute, and then write them all out.

316
00:30:15,819 --> 00:30:25,819
Typically, again, doing updates in a column store system without this sort of buffer thing I just mentioned is always going to be slow.

317
00:30:25,819 --> 00:30:26,819
Yes.

318
00:30:31,819 --> 00:30:36,819
Her question is, what is the null bitmap in the recurrence in Roasters?

319
00:30:37,819 --> 00:30:43,819
Yeah, we discussed this last class. It basically, it's a way to represent which attribute is null, right?

320
00:30:43,819 --> 00:30:52,819
So I'm not drawing here, but they had the diagram last class. In the header of every row, there'll be a bitmap that says which attribute is null or not.

321
00:30:52,819 --> 00:31:00,819
That's one approach to do it. That's in this common one, right? You could do this, we had to talk about the special value, or each attribute could have a little flag in front of it.

322
00:31:00,819 --> 00:31:05,819
But the null bitmap basically says, for this two, what attribute one is null, attribute two is null.

323
00:31:05,819 --> 00:31:13,819
And so, think of that instead of having that bitmap per in the header per tuple, in the comms store, it's just for the entire column, here's the null bitmap.

324
00:31:16,819 --> 00:31:17,819
Yes.

325
00:31:17,819 --> 00:31:25,819
If word index in a comms store is it instead of here, where to find this one, where to find these 10 columns?

326
00:31:25,819 --> 00:31:31,819
This question is, in a comms store, what does the index actually do?

327
00:31:31,819 --> 00:31:36,819
So some systems, some O-Lat systems that are comms stores, you don't get any indexes.

328
00:31:36,819 --> 00:31:43,819
I don't think Snowflake gives you an index. You can't create one. It might have changed. Vertica, you couldn't have an indexes, right?

329
00:31:44,819 --> 00:31:51,819
Because again, they're not trying to do point queries or single thing lookups, right? It's to do complete scans.

330
00:31:52,819 --> 00:31:58,819
And so now, you're at the point in your correct, you could have indexes that are range indexes, right?

331
00:31:58,819 --> 00:32:03,819
So here's where to go find, if your ID is when 0 and 100 go to this page, right?

332
00:32:03,819 --> 00:32:12,819
Or there's things like that. There's inverted indexes, like find me all the records where the keyword Andy exists, right?

333
00:32:13,819 --> 00:32:21,819
And that doesn't look like a tree structure that's usually hashable. Like there's different types of indexes, but you would not, maybe you wouldn't have the index of the point query lookups.

334
00:32:26,819 --> 00:32:28,819
All right, cool.

335
00:32:29,819 --> 00:32:32,819
So let's jump back.

336
00:32:33,819 --> 00:32:52,819
All right, so I was kind of hand wavy about this part here, where I said, okay, let me go fetch the page that has the host name, run my where calls, I'll get a bunch of matches, and then let me go fetch the last log in page, and then I had a magic way finding the matches there.

337
00:32:52,819 --> 00:32:56,819
Right? How did I do that? Well, there's two approaches.

338
00:32:57,819 --> 00:33:09,819
The most common one is to do fixed length offsets, and that means that the, the, you identify rows not by a slot number, but you identify unique tuples.

339
00:33:09,819 --> 00:33:17,819
This is why I don't want to say row versus like instead of two borders record, because like, what does a row look like in a comm store, right?

340
00:33:17,819 --> 00:33:26,819
It's two pulls the better term, but the unique idea for a for a tuple is going to be its offset within the table.

341
00:33:26,819 --> 00:33:37,819
So now if I'm at like offset three in one column, I would then know how to jump to the offset three in another column, and then I can stitch that tuple back together.

342
00:33:37,819 --> 00:33:51,819
Again, this only works if the values are fixed length. Of course, what breaks that assumption? Very length, varchar strings, blobs, texts, right? So we'll talk about how to handle that in a second.

343
00:33:51,819 --> 00:33:56,819
So that, that, this approach, the fixed length column one, that's the most, that's the most common one.

344
00:33:56,819 --> 00:34:11,819
So a legacy approach is to use embedded IDs where with every single value, you have some unique tuple identifier, like, you know, sort of like the log structure stuff, like some counter encummented by one.

345
00:34:11,819 --> 00:34:20,819
And then there's some index structure, and I'm not showing here where for a given record ID, for a given column, it tells you where to jump to this.

346
00:34:20,820 --> 00:34:32,820
This is rare. You're probably shouldn't even mention it, but like, it is one way to do it. There was some system I forget in the old days that did do this because they were kind of like contorting a rose toward to make it a column store.

347
00:34:32,820 --> 00:34:41,820
But everyone that uses fixed length offsets, of course, the problem you got to deal with now again is the, is how to convert variable length values into fixed length values.

348
00:34:41,820 --> 00:34:45,820
And we think I guess how you do that.

349
00:34:45,820 --> 00:34:48,820
He says pointers, pointers to what?

350
00:34:48,820 --> 00:34:55,820
For some other place, let me have been sure that for every column, the data is also contiguous.

351
00:34:55,820 --> 00:34:59,820
Yeah, see, for every comment, sure, every data is also contiguous.

352
00:34:59,820 --> 00:35:07,820
Yeah, that would, that actually would potentially work. The problem with that one is like, if you do like, in place updates, right?

353
00:35:07,820 --> 00:35:16,820
If you're packing all the data in, if it's not, if it's immutable, you don't have this problem, but if it is immutable, then you have, you could have fragmentation.

354
00:35:16,820 --> 00:35:17,820
So slot arrays again?

355
00:35:17,820 --> 00:35:20,820
He says slot arrays.

356
00:35:20,820 --> 00:35:22,820
But what's the pointy to?

357
00:35:22,820 --> 00:35:33,820
Yeah, so there, so slot array you have an array with at the start of every page, and then that has the starting address of every column entry.

358
00:35:33,820 --> 00:35:35,820
So how be hard?

359
00:35:35,820 --> 00:35:37,820
Yeah, yeah, yeah, yeah, yeah.

360
00:35:37,820 --> 00:35:45,820
That's sort of similar to what he was saying, that would potentially work.

361
00:35:45,820 --> 00:35:47,820
Compression.

362
00:35:47,820 --> 00:35:54,820
Right? So the, the, the, the point approach that would work, I don't think everybody does that.

363
00:35:54,820 --> 00:35:57,820
You could just pat things out, but that's going to be wasteful as we said before.

364
00:35:57,820 --> 00:36:00,820
But this is basically how dictionary compression works. Right?

365
00:36:00,820 --> 00:36:10,820
Dictionary compression is replacing some, some very length value with a, with the integer code, which is, which is going to be fixed length in usually 32 bits.

366
00:36:10,820 --> 00:36:16,820
That we can use to, to, to then do some predicates on the dictionary code.

367
00:36:16,820 --> 00:36:22,820
And if necessary, if it matches something we're looking for, go do a look up and find, find what the actual value is.

368
00:36:22,820 --> 00:36:26,820
And that's a typo, it's not more in this next week, it's more in this, more in this hour.

369
00:36:26,820 --> 00:36:28,820
Like we'll discuss this now, so sorry.

370
00:36:28,820 --> 00:36:31,820
Right? So that's how we're going to be able to get, solve this problem.

371
00:36:31,820 --> 00:36:35,820
And this, pretty much the way everyone does it in a modern system.

372
00:36:35,820 --> 00:36:40,820
So this comms or idea is not new.

373
00:36:40,820 --> 00:36:46,820
According to the literature, the very first version of this, goes back to 1970s.

374
00:36:46,820 --> 00:36:51,820
There is this project out of the, the Swedish Defense Ministry called Cantor.

375
00:36:51,820 --> 00:36:54,820
It was more of a file system than a, than a database system.

376
00:36:54,820 --> 00:36:59,820
But this is considered to be the first documented, like, proposal for a column store system.

377
00:36:59,820 --> 00:37:02,820
And I don't know whether it, it, it, it exists today.

378
00:37:02,820 --> 00:37:10,820
In the 1980s, there was a paper that actually sort of mapped out the theoretical properties of what the decomposition storage model looked like.

379
00:37:10,820 --> 00:37:14,820
But again, it was still mostly only, only an academia.

380
00:37:15,820 --> 00:37:22,820
The roughly was considered the first commercial implementation of a column store system was this thing called Sybase IQ.

381
00:37:22,820 --> 00:37:26,820
But it wasn't really a full-fledged database system.

382
00:37:26,820 --> 00:37:28,820
It was more like a query accelerator.

383
00:37:28,820 --> 00:37:31,820
And so it's sort of similar to what I was saying before about Oracle.

384
00:37:31,820 --> 00:37:34,820
They make a copy of your Rostor into a, in a memory column store.

385
00:37:34,820 --> 00:37:37,820
This is basically what Sybase was doing back in the 1990s.

386
00:37:37,820 --> 00:37:38,820
So your query would show up.

387
00:37:38,820 --> 00:37:43,820
And then Sybase would figure out, should I go to the, the Rostor and maybe do something there,

388
00:37:43,820 --> 00:37:48,820
or should I run the query only on the, on the, on the, in the recall store.

389
00:37:48,820 --> 00:37:52,820
And the 2000s went is when the comms are still really took off.

390
00:37:52,820 --> 00:38:00,820
And the three sort of key systems in the space were Vertica, which is, and it was found by my, my peachy, peachy advisors, Stan Zanodak, and my, my, my snowbreaker.

391
00:38:00,820 --> 00:38:06,820
Dr. Wise was a, out of, there's a four-community B, but now that, that was out of CWI.

392
00:38:06,820 --> 00:38:12,820
And, and MoodyDB was, was, was a major economic project at CWI as well.

393
00:38:12,820 --> 00:38:14,820
DuckDB is from CWI.

394
00:38:14,820 --> 00:38:19,820
So the, the first version of DuckDB was actually called MoodyDB Lite.

395
00:38:19,820 --> 00:38:24,820
They threw all the code away and then started ducking even scratch after learning with the, with MoodyDB Lite.

396
00:38:24,820 --> 00:38:29,820
The act of Wise was started by some people that I worked on MoodyDB.

397
00:38:29,820 --> 00:38:35,820
And then the, the, the two main people I vectorized, one of them left and was a co-founder of Snowflake.

398
00:38:35,820 --> 00:38:38,820
Right, so a lot of the early ideas that vectorized developed is in Snowflake.

399
00:38:38,820 --> 00:38:45,820
And then the other guy Peter Bonds, he went back to CWI and then he, you know, helped him advise the, the DuckDB project.

400
00:38:45,820 --> 00:38:51,820
So there was a bunch of other systems at the time, but I've considered these the three major ones, and, and the pioneers in the space.

401
00:38:51,820 --> 00:39:03,820
And actually how this all sort of came out, the way Mike tells it was, or Strenberger tells it, he was consulting for Walmart Labs in the early 2000s.

402
00:39:03,820 --> 00:39:08,820
And they were struggling trying to scale their, uh, teradata database, which at the time was a row store.

403
00:39:08,820 --> 00:39:12,820
Right, I think Walmart was, it was, it was, it was, you know, multiple petabytes.

404
00:39:12,820 --> 00:39:14,820
It was, it was a database of every single transaction.

405
00:39:14,820 --> 00:39:19,820
And sometimes somebody bought something at a store, like Scansman to Cash Usher, it was in that database.

406
00:39:19,820 --> 00:39:24,820
And they were struggling to get teradata and run fast. And then Mike was like, oh, we should make this a column store.

407
00:39:24,820 --> 00:39:29,820
And then he, you know, and then he found the C store project that became Vertica.

408
00:39:29,820 --> 00:39:33,820
And then, you know, it was a pretty famous project.

409
00:39:33,820 --> 00:39:35,820
Now pretty much everybody does this.

410
00:39:35,820 --> 00:39:42,820
So, you know, this is just a sample of the, a bunch of your database systems that are out there that, that are considered column stores.

411
00:39:42,820 --> 00:39:50,820
Um, but the two key things that are also interesting about the 2010s is there's these open source file formats, Parquet and Ork.

412
00:39:50,820 --> 00:39:54,820
Parquet came out of Dremio and somebody else I'm forgetting.

413
00:39:54,820 --> 00:40:01,820
Uh, and then Ork came out of Facebook. Right, these are open source file formats that are columnar based.

414
00:40:01,820 --> 00:40:09,820
And now you can build database systems that can read and write, uh, yeah, Parquet and Ork files.

415
00:40:09,820 --> 00:40:21,820
Right. So the advantages for the, the columnar or the, the composition storage model is that we're going to greatly reduce the amount of waste of IO we have to do for analytical queries because we're only reading the exact data that we need.

416
00:40:21,820 --> 00:40:35,820
Right. Um, and we're going to get better cash reuse and better locality for our access patterns because again, we're literally just going to rip through columns one after another and not have to jump around, uh, within, within memory, which is better for CPUs.

417
00:40:35,820 --> 00:40:50,820
And again, we'll get better compression, which we're coming up to because the downside is going to be it's going to slow for point queries, slow for insert updates delete because we're going to have to split things up and write out multiple, you know, data to multiple locations and then bring it back in if you want to put it back together.

418
00:40:50,820 --> 00:40:52,820
Yes.

419
00:40:52,820 --> 00:40:59,820
The previous slide that this really did subway build their own database question is that subway a builder in database. No.

420
00:40:59,820 --> 00:41:08,820
It's a, consider that each rig. Um, but pancake DB is real. That's a real system.

421
00:41:08,820 --> 00:41:34,820
So one thing to point out though is that in my, my earlier example, the way I showed I ran that that one query, I did the scan on the, on the, on the, the hosting, you know, the column, then I ran the scan portion of the query on the, uh, on the log in one.

422
00:41:34,820 --> 00:41:42,820
And you sort of think of that like it was, I did one and then I moved on to another. A lot of cases, though queries, you actually want to look at multiple columns at the same time.

423
00:41:42,820 --> 00:41:52,820
Right. My wear clause only had was only reference one attribute. But as you've seen in the queries you've written for homework one, oftentimes you have multiple columns or multiple attributes referenced in your wear clause.

424
00:41:52,820 --> 00:42:05,820
And so it would be kind of, kind of expensive, a cumbersome to sort of now me maintaining, uh, as I'm scanning along one column, fetching another column at the same time and trying to patch things together.

425
00:42:05,820 --> 00:42:25,820
And so we still want to, we want to be able to have data or we want to wait and have the attributes that are so much that are going to use together so much close to each other on disk and in our files, but still get all the benefit of a, of a comm store layout.

426
00:42:26,820 --> 00:42:30,820
Right. And so this is what the Pax model model is.

427
00:42:30,820 --> 00:42:39,820
Well, again, and as I said, in most systems, they say they're a comm store, they're really doing this. Parking or are really, really doing this.

428
00:42:39,820 --> 00:42:52,820
And the idea is not like, you know, mind blowing, it's just basically saying instead of having a separate file for every single at column, actually by itself, I'll have the, I'll break them up into chunks,

429
00:42:52,820 --> 00:42:58,820
uh, into row groups and have data that are within the same tuple close to each other.

430
00:42:58,820 --> 00:43:04,820
You know, in the same file, just sort of spaced out in separate pages.

431
00:43:04,820 --> 00:43:13,820
Right. So we go back to our sort of mock example here. All we're going to do is just horizontally partition the table into, to row groups.

432
00:43:13,820 --> 00:43:17,820
And then within that row group, we're going to partition it based on columns.

433
00:43:17,820 --> 00:43:25,820
Right. So you think of this, the first three rows here, I'll have some portion in my giant file, my, uh, define the row group.

434
00:43:25,820 --> 00:43:37,820
I have a header for that row group. And then I have all the extra to column A together, then all the batch of these column, or all the values for column A, all of that ones come B followed by all the values of column C.

435
00:43:37,820 --> 00:43:50,820
Right. So now again, if I have a wear clause that needs to access, you know, both column A and column C, when I go fetch these pages for this row group, I, you know, I have all the data for the, that I need close to each other.

436
00:43:50,820 --> 00:44:01,820
But I'm also getting the benefit of a scrunch or IO because this row group is going to be, you know, in the tens of megabytes instead of like, you know, four kilobyte or eight kilobyte pages.

437
00:44:01,820 --> 00:44:13,820
Right. Same thing for the next guy and so forth. And so this is roughly how park a work. There's a lot of diagrams or, you know, presentations about parking or look like that.

438
00:44:13,820 --> 00:44:29,820
And again, they're basically using all the same language that we're using here. Right. And here they say the default size of a page is one megabyte because they want to have, you know, group things together and have as much scrunch or IOs again. And then a row group is going to be 128 megabytes.

439
00:44:30,820 --> 00:44:32,820
All right. Yes.

440
00:44:32,820 --> 00:44:38,820
One of the things from like the same problem where you're still in the field of IOs, I think it's the same thing.

441
00:44:38,820 --> 00:44:44,820
The statement is, couldn't this also have those, you're still going to have the problem where you have a much useless IOs if you're doing a full table scan.

442
00:44:44,820 --> 00:44:52,820
So the header tells you where things are. Right. And because it's so huge, like I can bring in, I bring in this first header here.

443
00:44:52,820 --> 00:45:03,820
Actually, I'm showing the header, but like in real systems on parking or it's actually at the footer because assuming the files immutable. So I don't know what, like, I don't know what where everything's going to be until I finish writing it.

444
00:45:03,820 --> 00:45:06,820
So it's in the footer. That's a, that's a, that's on the side.

445
00:45:06,820 --> 00:45:16,820
So his statement is, don't have the same problem as a row store here if I'm doing this packs thing because now if I bring this entire row group in, am I going to read a bunch of stuff I don't need.

446
00:45:16,820 --> 00:45:32,820
So you don't bring the whole row group in, you bring the header in, and you say, okay, here's the offsets now of where my attributes are. And then I can go ahead and fetch those.

447
00:45:32,820 --> 00:45:46,820
Actually, here you can see here, here's the, you see the footer here. This is, is that of the header saying the metadata was in here, like the file, row group and column metadata, like what the offsets are, is that of the header. It's just in the footer for park.

448
00:45:46,820 --> 00:45:49,820
Or is the same way.

449
00:45:50,820 --> 00:46:09,820
All right, so as you say, multiple times, I always, always been the main bottleneck we have, especially for analytical queries. And if we assume the data is on the press, that means like the, you know, whatever the exact size of a tuple for in, you know, in a table.

450
00:46:09,820 --> 00:46:26,820
Every page that is going to bring exactly that data in. And so the most obvious way to reduce the, well, speed up queries, you can, you can, you can basically skip data or you can make the data do fetch, bring more things into memory.

451
00:46:26,820 --> 00:46:38,820
So skipping data is what the comm store stuff helps with because you avoid having to read, meet attributes you don't need. Compression is another way to say, okay, for every page I fetch, I get more tuples than I would if it was uncompressed.

452
00:46:38,820 --> 00:46:48,820
Now, there's going to be this trade-off between speed up and the pressure ratio. Obviously, this is going to be potentially slower than CPU, especially in the cloud setting.

453
00:46:48,820 --> 00:46:59,820
And so I'm willing to pay the extra cost of having to decompress and compress data because now again, it'll reduce my amount of IOPS, amount of time and wasting on IOPS to bring the fetch things in.

454
00:47:00,820 --> 00:47:15,820
Things are slightly getting the sort of the difference between this speed and CPU speed is getting smaller where in some cases, this is actually getting so fast lately where maybe you don't want things to be compressed.

455
00:47:15,820 --> 00:47:22,820
There will be some other benefits we'll see in a second where we do keep things compressed, the data system actually can run faster when it actually processes things in memory.

456
00:47:22,820 --> 00:47:30,820
And we'll cover that in a few weeks. But in general, for most systems, compressing things on disk is always going to be a win.

457
00:47:32,820 --> 00:47:36,820
So any compression scheme we need to use has to produce fixed length values.

458
00:47:36,820 --> 00:47:42,820
As we said before, because if you want to store this in a column store, we want to make sure that we always have fixed length all sets.

459
00:47:43,820 --> 00:47:51,820
In some cases, too, we want to delay when we actually decompress things or as long as possible while we execute queries.

460
00:47:51,820 --> 00:48:11,820
And we'll see this again. We'll talk about this more when we talk about query execution. But the idea here is that if I have a bunch of these one megabyte strings that are in my table, but I can convert them to 32-bit integers, I want to process 32-bit integers for as long as possible because I have to copy data from one operative in the next as I execute the query.

461
00:48:12,820 --> 00:48:23,820
If it's a distributed system copied over the network, I want to keep things compressed as long as possible and only decompress it when I actually have to show something back to something needs it, DB decompressed or the user needs the output.

462
00:48:23,820 --> 00:48:27,820
Joins makes that harder, but we'll cover that later in a second.

463
00:48:27,820 --> 00:48:34,820
And then the obvious most important thing we need for any compression scheme in our data system is we need to ensure that we're using a lossless scheme.

464
00:48:34,820 --> 00:48:36,820
And they know what that means.

465
00:48:37,820 --> 00:48:39,820
Lossy versus lossless. Yes.

466
00:48:39,820 --> 00:48:45,820
There's no information loss when you're decompressed things, right? Or decompress them, right?

467
00:48:45,820 --> 00:48:58,820
So a lossy scheme would be like MP3, MP4, JPEG, where they're doing some tricks about how the human perceives audio data or visual data to compress things down to a much smaller size.

468
00:48:58,820 --> 00:49:08,820
So that means if you have the raw image you took or the raw sound file you took, when you compress it, you're not going to get back the same values, if you will, when you decompress it.

469
00:49:08,820 --> 00:49:14,820
We don't want to do that in a database system because, as we said before, people don't want losing data.

470
00:49:14,820 --> 00:49:23,820
If you have $100 in your bank account and then they compress the data and when it gets decompressed and now you have $90, you're going to notice you're going to complain.

471
00:49:23,820 --> 00:49:32,820
So typically, you know, most systems will not use a lossy scheme just because, you know, you don't have problems.

472
00:49:32,820 --> 00:49:40,820
You can do lossy compression yourself, right? So think of like, I mean, like the application could do this.

473
00:49:40,820 --> 00:49:53,820
If I have a keeping track of the temperature of this room every second, right, and I do this for 10 years, do I really need to know what the exact temperature was at a one second interval, you know, a year from now?

474
00:49:53,820 --> 00:49:58,820
No, I can maybe compress it down to, here's the average temperature per minute, right?

475
00:49:58,820 --> 00:50:04,820
So I can't get back the original data because it's been compressed or aggregated and that might be okay.

476
00:50:04,820 --> 00:50:09,820
But again, that's something you, as a user in the application, a humus to know whether that's an okay thing to do.

477
00:50:09,820 --> 00:50:14,820
The data system doesn't, therefore the database system is always going to be using a lossless scheme.

478
00:50:14,820 --> 00:50:20,820
So now the question is, you know, what do we actually want to compress? And there's a couple of different choices.

479
00:50:20,820 --> 00:50:27,820
One is we can compress a single page or a block of data. So that's all the two balls within the same table.

480
00:50:27,820 --> 00:50:32,820
We can compress a single tool by itself if it's a a Rostor system.

481
00:50:32,820 --> 00:50:40,820
We can go even more fine grain that we can say, all compress within one, two, well, one single attribute and compress that.

482
00:50:40,820 --> 00:50:53,820
So think of like the overflow tables we said before, if you're storing, you know, huge text attributes or like in Wikipedia, the revisions, it's the, you know, it could be a lot of text.

483
00:50:53,820 --> 00:50:58,820
I forget what the largest Wikipedia article is. And it's like someone with Star Wars, right?

484
00:50:58,820 --> 00:51:05,820
So like that's, you know, it could be kilobytes of text data. I could compress just for that, you know, that one entry.

485
00:51:05,820 --> 00:51:08,820
I'm post-ghosted, there's a bunch of other systems do this.

486
00:51:08,820 --> 00:51:15,820
Or alternatively, I could compress for a single column if it's a column source system.

487
00:51:15,820 --> 00:51:18,820
So let's talk about how you can do this for the block level.

488
00:51:19,820 --> 00:51:26,820
And then we'll spend most of our time talking about the column level because that that matters the most for in a columnar system.

489
00:51:26,820 --> 00:51:30,820
So to do it at a block level, we essentially need to use a naive compression scheme.

490
00:51:30,820 --> 00:51:39,820
And by naive, I mean that the, it's the database system is making a call to like a third party library like GZIP.

491
00:51:39,820 --> 00:51:47,820
You wouldn't want to use that because it's slow, but it's a third party library that's going to take the page and then compress it down to some binary form where the database is going to be.

492
00:51:47,820 --> 00:51:55,820
Where the database system has no way to interpret or can do any introspection into the compressed version of the block.

493
00:51:55,820 --> 00:52:01,820
Right? Again, so I call, you know, call GZIP on a file.

494
00:52:01,820 --> 00:52:04,820
The data center doesn't know how to go read inside that compressed file.

495
00:52:04,820 --> 00:52:08,820
It has to decompress it in order to get back the original version of it.

496
00:52:08,820 --> 00:52:09,820
Right?

497
00:52:09,820 --> 00:52:12,820
So again, you wouldn't want to use GZIP. There's a bunch of these faster alternatives.

498
00:52:12,820 --> 00:52:19,820
And that sort of all came out with LZO was a sort of big breakthrough in the 1990s.

499
00:52:19,820 --> 00:52:24,820
Z standard is considered the state of the art compression scheme now from Facebook.

500
00:52:24,820 --> 00:52:27,820
They're actually working on a new version. It's not public yet.

501
00:52:30,820 --> 00:52:33,820
It's even faster and better. I've got a thun out yet.

502
00:52:33,820 --> 00:52:36,820
But Z standards would you should be using?

503
00:52:36,820 --> 00:52:39,820
So let's see how my SQL does this.

504
00:52:39,820 --> 00:52:42,820
So my SQL act you can support table compression.

505
00:52:42,820 --> 00:52:44,820
You declare it on a per table basis.

506
00:52:44,820 --> 00:52:46,820
It's I don't think it's owned by default.

507
00:52:46,820 --> 00:52:54,820
And the way it works is that all your pages when they're written a disk, they're going to be compressed into some multi,

508
00:52:54,820 --> 00:53:02,820
a page size that's going to be some multiple of four or two up to eight kilobytes.

509
00:53:03,820 --> 00:53:10,820
And then each page, they're going to have a header portion called the mod log where it's sort of like the row store thing I mentioned before,

510
00:53:10,820 --> 00:53:16,820
where I can do a bunch of rights and make changes to the page without having to decompress it first.

511
00:53:16,820 --> 00:53:20,820
So there's a little extra space in the beginning.

512
00:53:22,820 --> 00:53:27,820
And obviously also too. Say, if your pages, like when the after is compressed, it's six kilobytes.

513
00:53:28,820 --> 00:53:32,820
They'll pat it up to the next highest value within one, two, four, eight.

514
00:53:32,820 --> 00:53:38,820
And this ensures that you have, you don't have any fragmentation in your layout on disk.

515
00:53:38,820 --> 00:53:40,820
And when you bring things into memory.

516
00:53:40,820 --> 00:53:44,820
So say I query runs and wants to read something in page zero.

517
00:53:44,820 --> 00:53:52,820
Right? If I'm doing a blind right, like an insert or a delete or even update assuming I have the values,

518
00:53:53,820 --> 00:53:57,820
I don't need to decompress the page. I just write that change to the mod log.

519
00:53:57,820 --> 00:53:59,820
And again, it's just log structure, like we talked about before.

520
00:53:59,820 --> 00:54:02,820
I said we were going to see this idea throughout the rest of the semester.

521
00:54:02,820 --> 00:54:06,820
Right? You can think the mod log is just the log structure storage we talked about before.

522
00:54:07,820 --> 00:54:15,820
And in some cases too, I can do reads on the mod log because if the data I need was just inserted and within the mod log,

523
00:54:15,820 --> 00:54:18,820
I don't have to decompress the rest of the page.

524
00:54:19,820 --> 00:54:22,820
But then if I do need to read the page, though decompress it,

525
00:54:22,820 --> 00:54:29,820
store it as a regular 16 kilobite page in memory in the buffer pool because that's the default size for my SQL.

526
00:54:29,820 --> 00:54:32,820
And then I can do whatever reads I want on that.

527
00:54:32,820 --> 00:54:35,820
Right? But I still keep the compressed version around.

528
00:54:35,820 --> 00:54:41,820
And I think also to when it gets decompressed, they apply the changes to the mod log to the page there.

529
00:54:41,820 --> 00:54:42,820
Right?

530
00:54:44,820 --> 00:54:46,820
This is a good idea or a bad idea?

531
00:54:49,820 --> 00:54:51,820
Postgres doesn't do this.

532
00:54:56,820 --> 00:54:57,820
Yes?

533
00:54:57,820 --> 00:54:59,820
I would say you're reading itself to the grade.

534
00:54:59,820 --> 00:55:01,820
You said it's a reading, it's not super great. Why?

535
00:55:01,820 --> 00:55:08,820
Well, because everything on the computer is one thing, you'll have to decompress a bunch of stuff.

536
00:55:08,820 --> 00:55:12,820
Not necessarily. Like, if, like, going back here,

537
00:55:13,820 --> 00:55:17,820
if I do an insert and it lands on the mod log, right?

538
00:55:17,820 --> 00:55:19,820
I don't have to decompress it.

539
00:55:19,820 --> 00:55:22,820
My index, like, there's some bookkeeping and doing saying, okay,

540
00:55:22,820 --> 00:55:26,820
like, I updated the index now so the record ID points to this page and then you look in the mod log,

541
00:55:26,820 --> 00:55:30,820
oh, for that slot number, that record ID, it's really in the mod log and the full page.

542
00:55:30,820 --> 00:55:32,820
So you don't have to decompress it.

543
00:55:35,820 --> 00:55:37,820
All right, let's say I actually think it's a decent idea.

544
00:55:37,820 --> 00:55:41,820
And I say Postgres doesn't do it, not because, like, oh, Postgres,

545
00:55:41,820 --> 00:55:43,820
like Postgres is not the gospel, right?

546
00:55:43,820 --> 00:55:46,820
Postgres doesn't do something, doesn't mean like, you shouldn't be doing it.

547
00:55:46,820 --> 00:55:51,820
Postgres is actually an amazing front end, the back end is actually pretty terrible, right?

548
00:55:51,820 --> 00:55:55,820
Because a lot of the design is remnants from the 1980s.

549
00:55:55,820 --> 00:55:58,820
And it's not how you would vote a modern system today.

550
00:55:58,820 --> 00:56:03,820
So, and they don't support compression for pages, you know, for regular data pages like this,

551
00:56:03,820 --> 00:56:05,820
only for toast tables, the overflow pages.

552
00:56:05,820 --> 00:56:07,820
So this is actually a decent idea.

553
00:56:07,820 --> 00:56:08,820
Right?

554
00:56:08,820 --> 00:56:10,820
It does have some challenges though, right?

555
00:56:10,820 --> 00:56:18,820
Because my SQL is a row store, that's why you have to use a 90-degree compression scheme,

556
00:56:18,820 --> 00:56:23,820
because you can't do anything fancy, because the values you're storing in the tables themselves,

557
00:56:23,820 --> 00:56:26,820
or sorry, in the pages of cell, from all the different attributes,

558
00:56:26,820 --> 00:56:30,820
and you're not going to be able to do all the native compression scheme we'll see in a second.

559
00:56:30,820 --> 00:56:31,820
Right?

560
00:56:31,820 --> 00:56:36,820
And again, because we're just using, I think they use snappy or Z-standard,

561
00:56:37,820 --> 00:56:40,820
because you're using a general-purpose compression algorithm,

562
00:56:40,820 --> 00:56:45,820
the datacent doesn't know how to interpret what those compressed bytes actually mean.

563
00:56:45,820 --> 00:56:48,820
And the spoiler is, all those compression items are talking about four,

564
00:56:48,820 --> 00:56:53,820
they're basically doing some variant of dictionary compression.

565
00:56:53,820 --> 00:56:54,820
Right?

566
00:56:54,820 --> 00:56:57,820
It's going to build its own dictionary of repeated byte sequences.

567
00:56:57,820 --> 00:57:00,820
But again, my SQL doesn't know how to read that dictionary,

568
00:57:00,820 --> 00:57:03,820
and so it has to decompress the whole thing.

569
00:57:04,820 --> 00:57:08,820
So for some workloads, I think this is actually a good idea,

570
00:57:08,820 --> 00:57:12,820
and I kind of wish Postgres did do some compression.

571
00:57:12,820 --> 00:57:13,820
Right?

572
00:57:13,820 --> 00:57:21,820
So, if we're doing OLAP, ideally, we want to be able to run our query directly in the compressed data

573
00:57:21,820 --> 00:57:23,820
without having to decompress it first.

574
00:57:23,820 --> 00:57:27,820
So say something I like this, I have my salary, 2PL salary,

575
00:57:27,820 --> 00:57:30,820
assuming I have some compression algorithm, I'm not saying what it is,

576
00:57:30,820 --> 00:57:33,820
but I have a compressed form of the database.

577
00:57:33,820 --> 00:57:36,820
Well, if my query shows up, or I want to get my salary,

578
00:57:36,820 --> 00:57:42,820
I do some kind of magic that converts the query to convert this constant string

579
00:57:42,820 --> 00:57:48,820
andy into the compressed form, and then now I can do a direct lookup on my compressed table

580
00:57:48,820 --> 00:57:53,820
using my compressed constant, and not have to decompress every single page as I'm going along.

581
00:57:55,820 --> 00:57:58,820
Now I'm going to do some IOA at the due,

582
00:57:58,820 --> 00:58:04,820
because I'm fetching in compressed pages, I don't have to decompress them in order to do a lookups into them.

583
00:58:07,820 --> 00:58:13,820
So this is ideally what we want, and the easiest way to do this is going to be in a columnar system.

584
00:58:15,820 --> 00:58:20,820
So this is just a quick overview of a bunch of different compression algorithms you could possibly have.

585
00:58:21,820 --> 00:58:24,820
Again, the spouter is going to be dictionary compression,

586
00:58:24,820 --> 00:58:27,820
and dictionary encoding is the default choice for most systems.

587
00:58:27,820 --> 00:58:34,820
But what you can do, you may not want to compress a single column using these other schemes,

588
00:58:34,820 --> 00:58:37,820
and we'll see what see some examples where it does make sense.

589
00:58:37,820 --> 00:58:43,820
But after you do dictionary encoding, you can apply all of these other compression schemes on the dictionary itself,

590
00:58:43,820 --> 00:58:47,820
or you're still dictionary coded values, and get even further compression.

591
00:58:47,820 --> 00:58:50,820
So you can get sort of a multiple-plicative effect where you do compression one way,

592
00:58:50,820 --> 00:58:53,820
and then you run another compression algorithm on the compressed data and get even better compression.

593
00:58:53,820 --> 00:59:02,820
And it's still done in a way where the data system can natively interpret what those bytes actually mean in the compressed form without having to decompress it first.

594
00:59:03,820 --> 00:59:08,820
And again, this is why the data is going to do everything, and don't want the OS to do anything or anybody else to do anything,

595
00:59:08,820 --> 00:59:13,820
because again, because we can do this native compression.

596
00:59:15,820 --> 00:59:17,820
So let's do some quick examples here.

597
00:59:18,820 --> 00:59:31,820
So one approach you do is called run length encoding RLE, and this is the basic idea here is that if we have contiguous runs of values that are the same thing,

598
00:59:31,820 --> 00:59:36,820
or literally the same value, instead of starting that value over and over again for every single tuple,

599
00:59:36,820 --> 00:59:46,820
all instead store a compressed summary that says, for this value, at this offset, here's how many currencies it has.

600
00:59:47,820 --> 00:59:53,820
Now, this works great if your data is sorted based on whatever the column you're trying to compress.

601
00:59:53,820 --> 01:00:02,820
You can't always do this, but again, if you sort things, then you can maximize the amount of the maximized of the repeated runs.

602
01:00:02,820 --> 01:00:08,820
Let's say I have a single table where it has an ID field, and then has a column that says whether somebody's dead or not, yes or no,

603
01:00:08,820 --> 01:00:12,820
it's yes or no, there's no null, there's no maybe.

604
01:00:13,820 --> 01:00:15,820
So we can compress this guy here.

605
01:00:15,820 --> 01:00:27,820
So a compressed form would just take, essentially just scanning through the column, and finding the contiguous attributes or contiguous tuples that have the same value,

606
01:00:27,820 --> 01:00:33,820
and then converting it into this triplet that says, here's the value, we're at this offset, and here's the size of the run.

607
01:00:34,820 --> 01:00:48,820
And so now, if I have a query that comes along, like, count the number of people that are dead versus not dead, I can just rip through that is dead column,

608
01:00:48,820 --> 01:00:57,820
and compute my aggregation by just summing up the length of the run, and then along with the value there.

609
01:00:58,820 --> 01:01:02,820
I actually can do even better.

610
01:01:02,820 --> 01:01:10,820
So I have this little part here, I have somebody's not dead, and then they're dead, and then not dead.

611
01:01:10,820 --> 01:01:15,820
So I have now these three triplets here where the run size is one.

612
01:01:15,820 --> 01:01:23,820
So in this case here, I'm actually doing worse because I'm storing a triplet when I could just store a single value by itself.

613
01:01:24,820 --> 01:01:33,820
So if I sort the data based on whether somebody's dead or not, now my RL compression only has, you know, compressed column only has two entries.

614
01:01:33,820 --> 01:01:37,820
Here's all the dead people, and here's all the non-dead people.

615
01:01:37,820 --> 01:01:41,820
And this greatly reduces the amount of data that's stored now.

616
01:01:41,820 --> 01:01:49,820
So maybe the case, and say I have, always thinking of the extremes, my example is that the fit them on the slides, I have 10, 8 or 9 tuples here,

617
01:01:50,820 --> 01:02:03,820
if I have a billion tuples or a billion people, I can compress now down, you know, keeping track of like, you know, whose ever a billion people is dead or not dead into a small number of bytes, and that'll fit on one page.

618
01:02:06,820 --> 01:02:18,820
You need the length in the triplet because again, assuming that we always have fixed length offsets, this allows you to figure out, okay, like if I need to find for a single tuple, a single entry, or they dead or not,

619
01:02:18,820 --> 01:02:24,820
like it allows you to do the math, to reverse it back and say, okay, I would be at this offset if I was uncompressed.

620
01:02:24,820 --> 01:02:26,820
And that's just simple arithmetic.

621
01:02:29,820 --> 01:02:32,820
Now the compression scheme you can do is called bitpacking.

622
01:02:32,820 --> 01:02:43,820
And the idea here is that people oftentimes declare attributes or columns in a certain type that is larger than they actually need.

623
01:02:44,820 --> 01:02:54,820
So, an idea would be like, if I have a column where I'm keeping track of some number, and I declare it as an integer type, that's in SQL, that's a 32 bit integer.

624
01:02:54,820 --> 01:03:00,820
So that means that even if it's a small value, I'm still going to allocate 32 bits to store it.

625
01:03:00,820 --> 01:03:06,820
So for these numbers here, none of them are very big, but I'm always going to store it as 32 bits.

626
01:03:06,820 --> 01:03:12,820
So in this case here, to store these 8 or 9 numbers, 8 numbers have to store 26 bits.

627
01:03:13,820 --> 01:03:21,820
But again, the only thing that matters is actually these lower portion of the bits here, because this is the actual data that they need.

628
01:03:21,820 --> 01:03:29,820
All this other stuff, the other 24 bits is just waste of space.

629
01:03:29,820 --> 01:03:38,820
So instead, what I can do is, even though you declare it as a 32 bit integer, I'm going to store it as an 8 bit integer.

630
01:03:39,820 --> 01:03:44,820
And then now that greatly reduces the size down by a factor of 4.

631
01:03:45,820 --> 01:03:49,820
So I was able to go again from 26 bits to 64 bits.

632
01:03:49,820 --> 01:04:00,820
And you can do a bunch of tricks with bit shifting operators and SIMD, which we can tell at LinusMester, to actually now, as I'm scanning along and sitting trying to find matches on a certain number,

633
01:04:01,820 --> 01:04:11,820
because these are now 8 bit integers, I could put them into a single 32 bit integer, and I'm keeping track of inside my system, oh, it's really at this offset, it's these different values.

634
01:04:11,820 --> 01:04:16,820
And then with now a single CPU instruction, I can operate on 4 values at once.

635
01:04:20,820 --> 01:04:21,820
What's the problem with this? Yes.

636
01:04:22,820 --> 01:04:25,820
What happens if you add a 32 bit integer to the database?

637
01:04:25,820 --> 01:04:27,820
Boom. Okay, excellent. Thank you.

638
01:04:28,820 --> 01:04:34,820
So his statement is, well, what happens if I have a number that can't be stored in those 8 bits that I'm trying to pack them into?

639
01:04:34,820 --> 01:04:45,820
And so the way you get around this is a technique from Amazon for Redshift, called mostly encoding, where you say, the idea is basically to say, most of the data in my comms is going to be small enough.

640
01:04:45,820 --> 01:04:51,820
But in the cases where it's not, they will keep track of that and store that as a separate dictionary.

641
01:04:51,820 --> 01:04:56,820
So again, I have these 32 bit numbers, but I have this 19999 here that's really big.

642
01:04:56,820 --> 01:05:11,820
So all stores still store them as 8 bits, but then I'll have a special marker value, thinking like all the bits are set to 1, and then I have a separate table that says, for a given offset, here's what the original value should be.

643
01:05:12,820 --> 01:05:21,820
So now as I'm scanning along this column, if I see my special marker value, I know that I should look in this offset table and find out what the real value should have been.

644
01:05:23,820 --> 01:05:24,820
Yes.

645
01:05:25,820 --> 01:05:34,820
So the triplets where you just say the next couple things are 4 bits, the next couple are 8 or the next couple are 3 bits.

646
01:05:34,820 --> 01:05:49,820
Yes, so the same as, couldn't you do something with the triplets where, instead of just saying, everything's always eat bits, could you say, I have 1000 values that are contiguous that are, you store them as 4 bits, then I can store them as 12 bits or whatever.

647
01:05:49,820 --> 01:05:55,820
So that going back to the packs thing, because they break it up into row groups, each row group could have its own compression scheme.

648
01:05:55,820 --> 01:05:57,820
So you could do something like that.

649
01:05:59,820 --> 01:06:05,820
I think parquet is more aggressive compression than orc, it's more complicated, or maybe the other way around.

650
01:06:05,820 --> 01:06:09,820
One of them is very simple, one of them has a bunch of the various tricks you're talking about.

651
01:06:10,820 --> 01:06:35,820
So in this example here, the original size is 256 bits, but then if I do the most thing coding, I just have to store 8 by 8 bits for the most 8 column, and then assuming that I only need 16 bits for the offset and the 32 bits for the value for this lookup table, which is not true, because obviously I'll locate more for additional metadata, but assuming you get it down to that, it's 112 bits.

652
01:06:36,820 --> 01:06:38,820
So that's pretty good.

653
01:06:40,820 --> 01:07:04,820
Another trick you knew is called bitmap encoding, and the idea here is that if you have an attribute that has low card inality, meaning it has a small number of unique values, where now instead of storing for every single tuple in a column, here's the actual value, what I'm stagnant to do is maintain bitmaps, where I have one bitmap for every possible value I could have in the column,

654
01:07:04,820 --> 01:07:13,820
and the bit is set to one based on whether the column or the attribute the tuple at that offset has that particular value.

655
01:07:14,820 --> 01:07:25,820
So there are some database systems that provide bitmap indexes that essentially give the same things, you still have the original column, but then they maintain bitmap indexes that will do the same technique that we're seeing here.

656
01:07:26,820 --> 01:07:34,820
There's a company that's going to come talk about their data, some later this semester, I think it's either feature based or feature form.

657
01:07:35,820 --> 01:07:43,820
There's two different databases, the same mean feature in them. One of them only stores bitmap indexes. You can't actually store real data or the base data.

658
01:07:44,820 --> 01:07:51,820
So the idea is here, so say we go back to our is dead column, right? Again, there's only two possible values, either dead or not dead.

659
01:07:52,820 --> 01:08:08,820
So instead of storing actual single values themselves, I have two bitmaps. One says, for yes, one says no, and then there's a bit here that's set in this bitmap that corresponds to whether the original value has that bitmap or not.

660
01:08:09,820 --> 01:08:10,820
Or has that particular value or not.

661
01:08:11,820 --> 01:08:25,819
So I only need now two eight bits, 16 bits to store the yes or no, and then now my bitmap is just 18 bits, because I have nine values and I need two bits each.

662
01:08:26,819 --> 01:08:28,819
So I can get this down down to 34 bits.

663
01:08:31,819 --> 01:08:33,819
What's an obvious problem with this approach?

664
01:08:34,819 --> 01:08:35,819
Yes.

665
01:08:36,819 --> 01:08:43,819
If your data is high-carbonality, this is a terrible idea. Indeed, yes, it is. Let's look at an example.

666
01:08:44,819 --> 01:08:47,819
So the same, we have a customer table like this, and we have this zip code column.

667
01:08:48,819 --> 01:08:54,819
How many zip codes are in the United States? I'm going to give you a guess. I hear 10,000 now more.

668
01:08:55,819 --> 01:09:00,819
100,000 less. Now we're doing binary search. It's 43,000.

669
01:09:01,819 --> 01:09:10,819
Assuming we have a table with 10 million rows, and I'm going to build a bitmap for every single unique possible zip code I have, well, I'm going to need...

670
01:09:12,819 --> 01:09:27,819
Let's just store the data. Assuming the raw data, assuming we can sort the zip code as 32 bits, the raw data is 40 megabytes, but if I had to have a 10 million size bitmap for every single zip code, now we're at 53 gigs.

671
01:09:28,819 --> 01:09:30,819
So clearly, this is a bad idea.

672
01:09:32,819 --> 01:09:41,819
Furthermore, every time somebody adds a new tuple, I have to extend that bitmap because all of us have to match. I keep adding more to it.

673
01:09:42,819 --> 01:09:44,819
So I have to do that for every possible bitmap.

674
01:09:45,819 --> 01:09:52,819
So bitmap indexes can make a huge difference, but it's really for when you have a really small number card or not, like less than maybe 10.

675
01:09:53,819 --> 01:09:58,819
You'd want to do this. And then again, most systems don't do this by default.

676
01:10:00,819 --> 01:10:19,819
Delta coding, the idea here is that if the values from one attribute to the next, from one tuple to the next, sorry, if they're close enough to each other, maybe again, I don't need to store the entire value for one tuple, I just need to store the difference of the delta between the previous value.

677
01:10:20,819 --> 01:10:28,819
So let's say again, I have a sensor reading where I'm keeping track of the temperature in the room and every minute I'm storing the temperature.

678
01:10:29,819 --> 01:10:38,819
So at this timestamp column here, assuming that we're storing 64 bits, we know that the time is always incrementing by one.

679
01:10:39,819 --> 01:10:46,819
Furthermore, assuming that it came track of the temperature in the room or outside, from one minute to the next, there's not going to be dramatic temperature swings.

680
01:10:47,819 --> 01:10:52,819
We're not going to go from like 99 degrees to zero degrees within a minute.

681
01:10:53,819 --> 01:11:00,819
And so what I can just do now is to store from one tuple to the next, what was the difference between the previous one here?

682
01:11:02,819 --> 01:11:11,819
So in the time stamp, it's just plus one adding a minute, in case the temperature is a decimal difference between the previous one.

683
01:11:12,819 --> 01:11:18,819
I compress this even further now, because what do I have in this first column here at the time stamp, what do I have?

684
01:11:19,819 --> 01:11:22,819
A bunch of plus ones, how can we compress that?

685
01:11:24,819 --> 01:11:26,819
Run length encoding, right?

686
01:11:27,819 --> 01:11:39,819
So we can compress this even further now and convert this into, you know, convert the combination of the delta encoding and the run length encoding to tell you how many plus ones I have afterwards.

687
01:11:42,819 --> 01:11:52,819
So this is a good example, again, we can have this multiple clicker effect where we can compress the compressed data even further, because we're putting it to a form that can take advantage of it.

688
01:11:53,819 --> 01:12:06,819
So if you go back to our original data size, just for the time stamp column itself, we were at 320 bits, but if we do the delta encoding followed by the earlier coding, we get it down to 96 bits.

689
01:12:07,819 --> 01:12:15,819
Again, I'm showing six or seven tuples here, it's not that big, but again, think of it extreme, think of like a billion records. This would be a massive savings.

690
01:12:19,819 --> 01:12:26,819
The last one discussed is dictionic oppression, because again, I said this is the most common one, this is how most systems are going to compress data.

691
01:12:27,819 --> 01:12:29,819
Even for things that aren't strings, right?

692
01:12:30,819 --> 01:12:37,819
In some cases, there are some columnar systems will compress integer data, flow data, and putting them to dictionary codes.

693
01:12:38,819 --> 01:12:50,819
The idea here is that if we have vows that we see over and over again, instead of storing that value repeatedly within a column, we're going to convert that into some 32 bit integer.

694
01:12:51,819 --> 01:13:01,819
And then we maintain a mapping data structure, the dictionary, that knows how to take that dictionary code, the 32 bit integer, and convert it back into an original value.

695
01:13:02,819 --> 01:13:19,819
Typically, we're going to have, it's a one-to-one correspondence, for one value, we'll have one dictionary code. There is some techniques, I don't think any commercial system does this, where you can say, if I see multiple attributes that the patterns together, I'll convert the combination, the two of them, or three of them into a single dictionary code.

696
01:13:20,819 --> 01:13:25,819
I don't think any further compression, but again, I've only seen that in the academic literature.

697
01:13:26,819 --> 01:13:33,819
And then we need a way to do fast encoding and decoding on the fly that allows us to do both range and point queries.

698
01:13:34,819 --> 01:13:42,819
So point queries are obvious, like I want to be able to say, the string-and-e maps to code 101, I know how to do that exact click-ups in those.

699
01:13:42,819 --> 01:13:47,819
But ideally, I want to be able to also be able to do range queries on compressed data.

700
01:13:47,819 --> 01:13:53,819
And so I want my dictionary code to have the same ordering that the original values actually did, too.

701
01:13:54,819 --> 01:13:56,819
And we'll see how to do that in a second.

702
01:13:57,819 --> 01:14:00,819
So say this is my original data, a bunch of names of my former students.

703
01:14:02,819 --> 01:14:10,819
Then the compressed version of this could be, again, I have my original column, convert those into 32 bit integers.

704
01:14:10,819 --> 01:14:21,819
And then I just have this mapping table here that converts the last video lookups to say, for a given code, what's the original value, or for a given original value, what's the code, and that's the dictionary.

705
01:14:22,819 --> 01:14:36,819
So now we can go back to my example that I had in the very beginning with me, and DJ2PL, where select star from users, where name equals Andy, I can convert the string-and-e into the dictionary code by doing a lookup first in the dictionary.

706
01:14:37,819 --> 01:14:43,819
Then now I scan through my column and just do lookups or do comparisons based on the integers.

707
01:14:44,819 --> 01:14:53,819
So I don't need to go through as I'm scanning along. If I don't compress my constant, then as I scan along, I got to go decompress each of these one by one, and then do my lookups.

708
01:14:54,819 --> 01:14:57,819
I'm basically losing all the benefit of any compression.

709
01:14:57,819 --> 01:15:03,819
And that's what my SQL has to do, because they can't interpret what's actually in the dictionary. They can't interpret what the compressed bytes actually mean.

710
01:15:04,819 --> 01:15:19,819
But in this case here, because we're the data system, we built the dictionary, we control it, we know how to read and interpret it, and we can, and in SQL, so we know what the query wants to do, we know how to take that constant, convert it to the dictionary code, then do our scan directly on the compressed data.

711
01:15:20,819 --> 01:15:34,819
So how do we actually do this? Do the encoding and decoding? Well, again, for a given, given, given, unquest value, we know how to go, go, get, press form, and then reverse it.

712
01:15:34,819 --> 01:15:38,819
So the key thing you point out is there's not going to be a magic hash function that can do this for us.

713
01:15:39,819 --> 01:15:51,819
Right? Any reverse will hash function is going to generate something that's going to be much larger likely than the original value, or so they not get it down to a 30-bit integer.

714
01:15:51,819 --> 01:15:57,819
So we're going to have to build a data structure that we maintain that allows us to do this.

715
01:15:58,819 --> 01:16:12,819
And as I said, we want something that's going to be preserved the ordering of the original values such that the compressed data, the compressed dictionary codes, those things have the same ordering electrographically or, yeah, as the original data does.

716
01:16:13,819 --> 01:16:34,819
So going back here, right, if I have, again, I have a bunch of these names, I want the dictionary that I'm generating to the codes that have this such that if one, if the original value comes before in the ordering before another original value is dictionary code should come before it as well.

717
01:16:35,819 --> 01:16:41,819
So I would have my dictionary is basically sorted. So now this allows me to do queries like this.

718
01:16:41,819 --> 01:16:46,819
Slackstar from users were named like Andy, A&D, followed by the wildcard.

719
01:16:46,819 --> 01:16:57,819
And so if we operate directly on the compressed data, we can convert this like clause into a between clause, because we can look up in the dictionary,

720
01:16:57,819 --> 01:17:15,819
and run the like portion just on the dictionary values, find the ones that match, find the min and max values for the matching values, and then rewrite the like into a between clause, and then now rip through my column while it's still compressed.

721
01:17:16,819 --> 01:17:32,819
Again, we can do this because it's SQL, we know what the, we know it's in the where clause, it's not arbitrary Python code or C code, we know exactly what the, what the, what the where clause wants to do, and we can be smart, intelligent, and convert this into, you know, do the rewriting for us.

722
01:17:32,819 --> 01:17:46,819
And again, you as the application program, or not you guys, but some JavaScript program, they don't have to know what the hell's going on in the covers, right, data's right, the like clause, and the data system can be smart and we write it for you and get better performance.

723
01:17:49,819 --> 01:17:58,819
So in some cases here, you still have to do questions, whether it's, you know, still in the performance and original column.

724
01:17:58,819 --> 01:18:10,819
In this case here, since I need the, I need the output of the, of the name attribute, I still have to go rip through the column and actually look at them.

725
01:18:10,819 --> 01:18:21,819
In some cases though, the data system can even even smarter and it can answer queries without actually looking at the compressed data, but just operate directly on the dictionary.

726
01:18:22,819 --> 01:18:32,819
So instead of saying select name from users, if it was distinct name from users, where I don't need to get the actual tuples themselves, I just need to get the actual values that are unique.

727
01:18:32,819 --> 01:18:48,819
Then for this query here, after I do my conversion to the, you know, converting to the between, or convert the, this, this wildcard here into the dictionary values, I only need to know what, what values actually exist in the dictionary.

728
01:18:49,819 --> 01:19:03,819
And I don't need to go look at the actual column for this query here with a distinct, you know, assuming I only have four names in my, in my table, but I have a billion rows, I only need to look at four rows in the dictionary to answer it.

729
01:19:04,819 --> 01:19:12,819
And again, I'm set this multiple times, we can do this because the data, because the data is responsible for compressing this.

730
01:19:13,819 --> 01:19:21,819
Now, parking or one of the big limitations that they have is they don't actually expose the dictionary to you when you use their, their libraries and utilities.

731
01:19:21,819 --> 01:19:30,819
So you can't do this trick, I'm talking about here if you're using parking or, right, parking or or decompress the data when it gives it back to you, you can't operate directly on compressed data.

732
01:19:30,819 --> 01:19:35,819
And that's actually one of the biggest limitations of my, my opinion of those two formats.

733
01:19:35,819 --> 01:19:40,819
But again, other systems that do native compression without parking or can, can, can do this trick.

734
01:19:41,819 --> 01:19:47,819
All right, so what, what is the data, what, what, what, what, what, what is the data, what we're going to use for our dictionary?

735
01:19:47,819 --> 01:19:50,819
So the most common approach is going to be a really simple array.

736
01:19:50,819 --> 01:20:00,819
And this works great if it, if it follows our meta, because I build the array once and I never to resize things and, in, certain things in, in, in place and, in, to move things around, I can just build on once that I'm done.

737
01:20:01,819 --> 01:20:06,819
If you need something that's dynamic and can support updates, you need either hash table or B plus tree.

738
01:20:06,819 --> 01:20:11,819
These are, hash table is, is, I think less common. There is, actually, these things are less common.

739
01:20:11,819 --> 01:20:17,819
Most people do the array and, and assume the, the blocks are going to be, the compressed blocks are going to be immutable.

740
01:20:17,819 --> 01:20:21,819
And only if I need to, to, to rebuild it, then I'll rebuild the array.

741
01:20:21,819 --> 01:20:24,819
And I realize them over time. Let me show, roughly what it looks like.

742
01:20:25,819 --> 01:20:30,819
So basically you have your original data in your column. So the first thing you do is, is build your dictionary.

743
01:20:30,819 --> 01:20:35,819
And again, all that's going to be is a sorted list of the, of the values you have.

744
01:20:35,819 --> 01:20:42,819
And then the, and you store the length of the, of the, of the string.

745
01:20:42,819 --> 01:20:48,819
And then now the dictionary code is going to be, it's just an offset into this, this array here.

746
01:20:49,819 --> 01:20:55,819
So my compressed data would look, look like this. And these are just offsets, the byte offset into the array.

747
01:20:55,819 --> 01:21:05,819
And so now when I'm doing a scan, and I want to say, okay, if I, if I have, if I, if I, if that's the second one, the second entry, it's 17.

748
01:21:05,819 --> 01:21:14,819
I jumped a byte, offset at 17. And I can look in the, it's down here. I can look in the, in the header and tell me how big is the string afterwards.

749
01:21:15,819 --> 01:21:19,819
So the dictionary itself is literally just an array packed of bytes like that.

750
01:21:19,819 --> 01:21:20,819
Okay.

751
01:21:21,819 --> 01:21:27,819
All right. So, to finish up, the, we, you know, this row store versus comms are going to be really important.

752
01:21:27,819 --> 01:21:31,819
And we'll see this show up when we talk about query execution and other things.

753
01:21:31,819 --> 01:21:38,819
Mostly before, before the midterm, because again, the, the distinction of the difference between a row store and a comms store system,

754
01:21:38,819 --> 01:21:47,819
have ramifications through, throughout all other parts of the database system, how you do recovery, how you could do query execution, how you want to run transactions, how you want to optimize your queries.

755
01:21:47,819 --> 01:21:55,819
And so it's really important to understand this now. And we'll, we'll, we'll see the trade-offs between the two approaches again and again throughout the entire semester.

756
01:21:55,819 --> 01:22:02,819
And then most database systems to get the best compression ratio, you want to do it natively, you want to do yourself, and dictionary coding is Ms. Common One.

757
01:22:02,819 --> 01:22:07,819
So, I show this three, three lectures ago that there was sort of two problems with the data storage.

758
01:22:07,819 --> 01:22:11,819
First, how are we going to represent data on disk? We've covered that so far.

759
01:22:11,819 --> 01:22:17,819
So starting next week, now tell me, okay, when we bring things into memory, what do we do with it?

760
01:22:17,819 --> 01:22:24,819
How do we store it? And how do we write things back out safely when, when we make changes? Okay? All right. Hit it.

761
01:22:55,819 --> 01:23:01,819
I got a block on tap, the Feds can't trace that. Style is like temp, but proof. You can't lace that at the Dominican.

762
01:23:01,819 --> 01:23:08,819
Oh, you could call me Dominican. Black, Skelly, Black, another, Black, Swade, Timberlands. My old Black, Dirty Eight, send you to the Purdy Gates.

763
01:23:08,819 --> 01:23:13,819
You get your zombie trying to skate, and that's your first mistake. I ain't lying for that cake, you're famous, see your weight.

764
01:23:13,819 --> 01:23:19,819
My grants is heavy weight, the Randthorough Ebbe State. When they actin' how I'm livin', I tell them I'm livin' great.

