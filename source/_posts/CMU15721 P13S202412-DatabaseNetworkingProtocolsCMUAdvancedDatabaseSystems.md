---
title: CMU15721 P13S202412 DatabaseNetworkingProtocolsCMUAdvancedDatabaseSystems
---

1
00:00:00,000 --> 00:00:06,000
Canneke Mellon University's advanced database systems courses

2
00:00:06,000 --> 00:00:09,000
filming front of the live studio boardies.

3
00:00:17,000 --> 00:00:18,000
We're all gonna die.

4
00:00:18,000 --> 00:00:19,000
Okay.

5
00:00:19,000 --> 00:00:21,000
In the meantime, let's do the databases.

6
00:00:21,000 --> 00:00:24,000
Alright, so today's class we're gonna talk about networking protocols.

7
00:00:24,000 --> 00:00:26,000
And then this will be the...

8
00:00:26,000 --> 00:00:28,000
We're sort of hitting the...

9
00:00:28,000 --> 00:00:30,000
We're called the second third...

10
00:00:30,000 --> 00:00:33,000
We're finishing up sort of the second third of the semester of the materials.

11
00:00:33,000 --> 00:00:37,000
So this week and then for the next two weeks we'll talk about query optimization.

12
00:00:37,000 --> 00:00:41,000
And then after that we'll go through and start reading the papers for

13
00:00:41,000 --> 00:00:44,000
you know, major systems and understanding, you know, how they work and putting...

14
00:00:44,000 --> 00:00:49,000
The things we talk about this semester start seeing how they're gonna be applied by the companies

15
00:00:49,000 --> 00:00:51,000
and the people building these various systems.

16
00:00:51,000 --> 00:00:52,000
Okay?

17
00:00:52,000 --> 00:00:56,000
So last class was all about how to take user-dried functions that some...

18
00:00:56,000 --> 00:01:00,000
The application level has written because they went in bed logic that would normally be in the application.

19
00:01:00,000 --> 00:01:04,000
They went in bed that directly inside of the database system and evoked through a query.

20
00:01:04,000 --> 00:01:11,000
And the idea was through inlining techniques we can convert the UDF constructs into...

21
00:01:11,000 --> 00:01:16,000
To SQL or the Azure Algebra and then have that be exposed to the query optimization

22
00:01:16,000 --> 00:01:21,000
or to figure out what the intent and what the user-dried function actually wanted to do.

23
00:01:21,000 --> 00:01:26,000
Alright, so this is an example again of pushing the application logic into the database system.

24
00:01:26,000 --> 00:01:34,000
So as I said at the end of last class, today's lecture is about how to sort of do the opposite of get data out of the database system

25
00:01:34,000 --> 00:01:39,000
and bring it over to the application so the application could process it and do what it wants.

26
00:01:39,000 --> 00:01:45,000
So we'll first talk about, you know, start off with talking about what these different database access APIs look like.

27
00:01:45,000 --> 00:01:50,000
Then we'll go into more details of what the network protocols look like and that was the paper you guys were assigned to read

28
00:01:50,000 --> 00:01:58,000
about actually what do the bits look like and how it's inefficient for in modern application scenarios

29
00:01:58,000 --> 00:02:04,000
where data scientists maybe working in pandas or some Python notebook and want to just want to do a select star

30
00:02:04,000 --> 00:02:08,000
and get a bunch of data out and then do all the processing on the client side.

31
00:02:08,000 --> 00:02:18,000
So we'll see how the sort of the major database system today, the existing protocols are insufficient or not designed for that kind of workload.

32
00:02:18,000 --> 00:02:23,000
The answer is going to be the end is going to be Apache Arrow is the solution.

33
00:02:23,000 --> 00:02:30,000
Right? So the paper you guys read came out before the arrow, the database connectivity library stuff was defined

34
00:02:30,000 --> 00:02:35,000
but they basically are reinventing the same thing and then ADBC and Arrow would do the same thing.

35
00:02:35,000 --> 00:02:37,000
We'll build up to that.

36
00:02:37,000 --> 00:02:43,000
Then we'll talk about additional optimizations we can do on the server side to make things run faster at the networking stack

37
00:02:43,000 --> 00:02:48,000
or potentially for other parts of the system by either doing kernel bypass or user space bypass

38
00:02:48,000 --> 00:02:54,000
and then we'll finish up quickly to talk about what some additional optimizations we can do on the client side

39
00:02:54,000 --> 00:03:00,000
if we know our Python program or whatever it is is talking to a database system and it's going to put some data into a data print.

40
00:03:00,000 --> 00:03:02,000
Right?

41
00:03:02,000 --> 00:03:10,000
So I would say some of the things we'll talk about today will be applicable for back end communication between the various database like the workers in your system.

42
00:03:10,000 --> 00:03:19,000
Like, you know, if it's a parallel system and one worker needs to communicate with another worker or needs to communicate with the optimizer service or the scheduler service.

43
00:03:19,000 --> 00:03:23,000
Right? A lot of these things we'll talk about in that environment will still matter.

44
00:03:23,000 --> 00:03:27,000
Certainly kernel bypass stuff could help or you use bypass stuff can help.

45
00:03:27,000 --> 00:03:35,000
But like the, you know, this is really, we're going to mostly focus on like how do we actually expose data to the client and have to make that

46
00:03:35,000 --> 00:03:46,000
that one efficiently. But we'll see when we go through the discussions of the real world systems where some, some, there are some optimization if you can apply it in the back end.

47
00:03:46,000 --> 00:03:56,000
All right. So last class, I showed a really quick demo of opening up the postgres terminal and, you know, writing a SQL query and hitting enter and then getting back some results.

48
00:03:56,000 --> 00:04:04,000
Right? That's, so that's sort of like the, you know, a basic AAP access method to the database system where you're, you know,

49
00:04:04,000 --> 00:04:11,000
send a SQL query and getting back results that are meant to be printed out on the screen. Right? Because it's meant to be interpretable by humans.

50
00:04:11,000 --> 00:04:15,000
But most, you know, most queries aren't going to run like that.

51
00:04:15,000 --> 00:04:24,000
Most queries are going to want data in a typically a binary form because it's going to be fed into some kind of application code that wants to do some additional processing on it.

52
00:04:24,000 --> 00:04:33,000
Right? So like in my example of the terminal, that's just plain text. In actually, in that case, the postgres is actually sending the same plain text data over the wire back to the client.

53
00:04:33,000 --> 00:04:39,000
We'll see one system in particular that actually does that no matter whether it's talking to an application or a terminal.

54
00:04:39,000 --> 00:04:44,000
But most systems are going to be doing binary data serialization.

55
00:04:44,000 --> 00:04:52,000
So you wouldn't actually want to write your application by just like piping out to to to P SQL or whatever the the command line terminal you want to use.

56
00:04:52,000 --> 00:04:55,000
Instead, you're going to write your application using one of these different methods.

57
00:04:56,000 --> 00:05:05,000
And these aren't these aren't mutually exclusive. Like you could at you know, depending on your application, maybe he's written in C sharp or C but flaws, you would use this if it's Python, use that and so forth.

58
00:05:05,000 --> 00:05:10,000
So various systems are going to support some of these, but we'll see when we when we go through it.

59
00:05:10,000 --> 00:05:17,000
The thing that we're really going to care about is it's like the low level never key PI of what the hell again how we're going to put bits on the wire.

60
00:05:17,000 --> 00:05:22,000
And then all of these methods except for maybe the last one can hide all that.

61
00:05:23,000 --> 00:05:33,000
So the first one is like this is this is sort of this is a proprietary API that the system exposes to you typically through like a C library.

62
00:05:33,000 --> 00:05:38,000
And it's like you wouldn't want to write this for your application.

63
00:05:38,000 --> 00:05:43,000
This is like if you're writing a driver for these other ones here, you would use kind of these kind of things.

64
00:05:43,000 --> 00:05:46,000
And you can look at the documentation for like my SQL and Postgres, right.

65
00:05:46,000 --> 00:05:51,000
You'll have information about the API for like in the low level C library.

66
00:05:51,000 --> 00:05:56,000
Like how do you open up a connection, how do you send a query, how do you do authentication and so forth, right.

67
00:05:56,000 --> 00:06:13,000
And you can use chat to BT to write this kind of stuff, right. You basically say, you know, write me a C program that uses a lib, lib pq which is the low level C API interface that you would use to program in Postgres.

68
00:06:13,000 --> 00:06:18,000
But again, like you typically don't write programs like this, you'll use some other abstraction.

69
00:06:18,000 --> 00:06:25,000
You need to use a higher level abstraction like an ORM like you can Django, Active Record, Ruby and Rails, SQL lives in Node.js, right.

70
00:06:25,000 --> 00:06:32,000
On either covers, they may be calling the C API, but use the application programmer, aren't writing coding as these things.

71
00:06:32,000 --> 00:06:35,000
So I want to focus now on these two.

72
00:06:35,000 --> 00:06:41,000
The Python one came later in the 90s, but you'll soon see how things get built up over time.

73
00:06:41,000 --> 00:06:48,000
And a lot of things we'll talk about for you as in JDBC, as a pickle for whatever the pick your favorite library.

74
00:06:48,000 --> 00:06:54,000
So I pick your favorite programming language that has a specification with how do you do connectivity and they would basically fall into the same thing.

75
00:06:55,000 --> 00:07:11,000
Because the big idea of what these APIs are going to do for us is that in theory, instead of programming against the low level like C API, like these things, instead we could program against these technically database system agnostic APIs.

76
00:07:11,000 --> 00:07:18,000
And then if we decided, you know, change what database system we want to use, we wouldn't have to change our any other application code.

77
00:07:18,000 --> 00:07:27,000
Of course, that's not entirely true if you're writing raw SQL, because as we said many times, the SQL dialect could be different from one system to the next, but we can ignore that.

78
00:07:27,000 --> 00:07:32,000
So the history for this goes back into the late 80s, early 90s.

79
00:07:32,000 --> 00:07:41,000
Basically, prior to something like JDBC, it was just these C libraries that all the various database system vendors provided.

80
00:07:41,000 --> 00:07:50,000
So things weren't portable. You would write again to a low level API talk to the database system that was very specific to the one database system you were using.

81
00:07:50,000 --> 00:08:02,000
And so there was early, people identify early on that would be nice that people writing a lot of applications, be nice to have a standard way to do database connectivity and to send queries, give back results.

82
00:08:02,000 --> 00:08:10,000
First attempt was in the late 80s from Sybase. They had something generically called DB library that was meant to be like an open source standard.

83
00:08:10,000 --> 00:08:13,000
I don't know if I actually have the sort of, it needed to be the standard everyone can implement.

84
00:08:13,000 --> 00:08:24,000
That didn't go anywhere. And then Microsoft teamed up with this other company called Sima Technologies in the early 1990s and they put forth this thing called UDBC.

85
00:08:24,000 --> 00:08:30,000
And so now pretty much every database system that you can think of today is going to have an ODBC implementation.

86
00:08:30,000 --> 00:08:38,000
Even if it's actually not a relational database system, it doesn't support SQL. Like MongoDB has an ODBC implementation.

87
00:08:38,000 --> 00:08:47,000
Because again, it's someone you have to put in the query command that you want to send over. And ODBC doesn't know, doesn't care whether it's SQL or not.

88
00:08:47,000 --> 00:08:54,000
Here's the thing I need to send to the server. But there's other APIs that are like iterative results sets, buying parameters to values and so forth.

89
00:08:54,000 --> 00:08:58,000
Our values to parameters are so forth. So the high level looks like this.

90
00:08:58,000 --> 00:09:09,000
So the ODBC is based on the device driver model. It's similar to how the hardware works in PCs, where if you buy like a graphics card, the vendor that sell you to the graphic card,

91
00:09:09,000 --> 00:09:15,000
they're also going to provide you with a driver that you can install in your OS, made about to communicate with the hardware.

92
00:09:15,000 --> 00:09:26,000
So the same idea. The database system vendor is going to be responsible for providing you with a driver that you can use based on the ODBC spec, then communicate with the database server.

93
00:09:26,000 --> 00:09:44,000
So the application wants to run some queries on the database. They go through the ODBC driver. And then the ODBC driver is responsible for sending the request over to the database server, getting the result, and then marshalling it back into the form that's required by the ODBC spec, then expose it to your application.

94
00:09:44,000 --> 00:09:56,000
So this can mean things like if my client is expecting everything to be 32 bit integers, but the database server sends back 64 bit integers, then the drivers are also converting that and cleaning things up.

95
00:09:56,000 --> 00:10:02,000
It also can do other things like there's certain features that are in the ODBC spec that the database system doesn't support.

96
00:10:02,000 --> 00:10:17,000
For example, like Postgres doesn't support cursors, like true cursors, then the driver can emulate that basically. Send the query over, give you back a cursor to it, and then use iterating over the results that are cached on the client side.

97
00:10:17,000 --> 00:10:29,000
So you can do a bunch of stuff in the driver. So the thing that we care about today is this piece here, the request going out and the response coming back, they weren't called the wire protocol, they never protocol the database system.

98
00:10:29,000 --> 00:10:32,000
So this is what we're going to focus on. Yes.

99
00:10:32,000 --> 00:10:39,000
The commands received by ODBC, for example, where do they get insured into the string?

100
00:10:39,000 --> 00:10:44,000
Do they run through the query optimizer? Is it just like it converted the SQL into everything?

101
00:10:44,000 --> 00:10:51,000
So the question is like, if I have a SQL query, where does that get, like trying to do a plan?

102
00:10:51,000 --> 00:10:57,000
My understanding is when you are using ODBC, you're using standard calls that don't have SQL.

103
00:10:57,000 --> 00:11:07,000
No, no, no, they, like, there'll be a, like, prepare statement command and you put a string in that'll be whatever the flavor is SQL, the database system supports.

104
00:11:07,000 --> 00:11:12,000
And that won't be, that can't, there's no way that can be universal across the database systems.

105
00:11:12,000 --> 00:11:17,000
But like the API call to say, here's the query I want to run and then execute it, get back result.

106
00:11:17,000 --> 00:11:27,000
Now iterate over the result set and give me the, for each row, the second attribute, and I want it as an integer, all that standardized.

107
00:11:27,000 --> 00:11:33,000
But the SQL itself just goes over the wire and then all the parsing, the planning, the optimizing, all that happens over here.

108
00:11:34,000 --> 00:11:40,000
Yeah, again, this is basically going to be calling typically the C API that an image move forward.

109
00:11:43,000 --> 00:11:53,000
Right, so let's talk about, so again, this was the first one, the big one that really took off and again, early to mid 90s, everybody was supporting ODBC at this point.

110
00:11:54,000 --> 00:12:07,000
And then Java comes along mid 90s and then some recognize that, you know, if you were to be on Java applications in the enterprise, they'd either talk about, talk about data systems or talk to data systems.

111
00:12:07,000 --> 00:12:11,000
So they had a support, you know, something similar to ODBC, but for Java.

112
00:12:11,000 --> 00:12:19,000
Right, and at the time again, ODBC was very much window specific, but since then it's, it's sort of generic and it's expanded.

113
00:12:20,000 --> 00:12:28,000
But again, but at the time, you know, it was, it was, it was, it was windows for static and for, and for C puzzle's applications.

114
00:12:28,000 --> 00:12:35,000
So it wouldn't work in, in the Java world. Right, and the same way that Russ is the hot thing now, Java was the hot thing in the mid 90s.

115
00:12:35,000 --> 00:12:41,000
But the idea was like, you write your program once and the GAMM can then run it anywhere, like that was mind blowing people back then.

116
00:12:41,000 --> 00:12:44,000
Go was the hot thing 10 years ago, there was some kind of fad.

117
00:12:45,000 --> 00:12:54,000
All right, so JTBC comes along and the, you can sort of think of this as like, again, it's basically the same thing as ODC, just now it's for Java instead of C.

118
00:12:54,000 --> 00:13:04,000
But because they were trying to bootstrap this, this new connectivity API to an existing ecosystem of a bunch of database systems that already spread to ODC,

119
00:13:04,000 --> 00:13:09,000
and they want to be able to people get up and running for any possible data systems as soon as possible.

120
00:13:10,000 --> 00:13:19,000
They have a different, different variations of how you can build it a native, or how to build a JTBC library or API or implementation of it.

121
00:13:20,000 --> 00:13:24,000
And they have various methods to like sort of bridge the gap between what was available at the time versus what came on later.

122
00:13:25,000 --> 00:13:34,000
So the, the four purges are, the first one is that there is no native JTBC implementation, a Java implementation of, of communicating with the data system.

123
00:13:34,000 --> 00:13:47,000
So instead what you provide is a, basically a bridge or a wrapper in Java that then invokes ODC, like the actual shared objects, the C code, that then that communicates with the database system.

124
00:13:48,000 --> 00:13:57,000
Right, so this was meant to be like, again, if you, if you have a database system that doesn't support JTBC yet, you could just wrap something around ODC and use that.

125
00:13:58,000 --> 00:14:11,000
The next approach was that you would use, have JTBC calls make JNI invocations down into the C code of, of, of, of, of, that's the C API and have that go over the wire to the database system.

126
00:14:11,000 --> 00:14:19,000
Right, and again, this is because, think of like taking the bytes, putting into buffers, all that was done in C, and then the thing was just copying the data into Java.

127
00:14:20,000 --> 00:14:29,000
Another approach is basically you have a separate middleware, like a separate server running that the JTBC thing then would talk to, and then that middleware then would use ODC to talk to your, your database system.

128
00:14:30,000 --> 00:14:32,000
Right, so sort of extra hop them to make the call you needed.

129
00:14:33,000 --> 00:14:48,000
And the last one is, is obviously going to be more ideal, is that you have a pure Java implementation that, if that calls, it makes the JTBC calls that you're, you provide them in the application directly into the, the, the vendor specific wire protocol commands.

130
00:14:49,000 --> 00:14:55,000
Right, so every single database has been at this point is going to have their own native Java, JTBC invocations.

131
00:14:55,000 --> 00:15:05,000
But again, think of how many times you come across something like in rust, or some car, you want to use, and there isn't a native implementation that's just calling in the C, that's really the top, the top thing up there.

132
00:15:05,000 --> 00:15:12,000
So the top one has been removed, and this is the one, this is the best one, and this is the most common one, at least for the most major data systems today.

133
00:15:13,000 --> 00:15:24,000
All right, so, as I was saying, the thing we care about is what's being sent over the wire to communicate from the client, whether it's ODC, GDC, or whatever it is, to the database server.

134
00:15:25,000 --> 00:15:39,000
And so every database system, for the most part, is going to implement their own proprietary wire protocol, typically over TCP, IP, and it's going to use that to begin to, to, to send the bytes back and forth and acknowledge this and get, take queries in and get responses back.

135
00:15:40,000 --> 00:15:50,000
If you're running on the same box, and it's in its Linux, you can use Unix domain sockets to get, get faster performance, because you're not going through the full TCP, IP stack, and the OS, both on the client side and the server side.

136
00:15:51,000 --> 00:15:58,000
You can do this in Postgres, but again, if you're running in the cloud, the DB server is like some far away location, you're not going to be able to do this.

137
00:15:59,000 --> 00:16:13,000
Those systems, I'm not aware of any system that uses UDP to communicate between the client and the server, TCP has overhead because you have to send the acknowledgments and back and forth, or UDP sort of throw it over and hope it makes it.

138
00:16:14,000 --> 00:16:27,000
So no system I'm aware of, we'll do this from between the client and the server. We'll see one system later on, Yellowbrick, they'll actually do this between the communicate, use UDP to communicate the backend servers, because it's just so much faster.

139
00:16:27,000 --> 00:16:36,000
And they basically have to do their own, you know, retry and acknowledgments on their own, but in that case, because they're trying to get the best performance possible, it was worth it for them to implement this.

140
00:16:37,000 --> 00:16:45,000
Postgres uses UDP to communicate between the stats collector and the different workers, but again, that's all in the backend on the same box. It's not between the client and the server.

141
00:16:46,000 --> 00:16:53,000
So typically what happens is the ways you would communicate with the data server is that the client comes along, connects to the data system.

142
00:16:53,000 --> 00:17:04,000
There's always going to be some kind of authentication process, right, or even giving a token that you've authenticated with something else, or you do username password or whatever the mechanism is.

143
00:17:05,000 --> 00:17:12,000
Ideally, you want this to be using SSL or TLS, but you don't need to own peer to sniff your packets.

144
00:17:12,000 --> 00:17:19,000
Then you send over the query, the data system will then block that connection, well, I'm not sure because you can do ASIC and stuff like that.

145
00:17:19,000 --> 00:17:25,000
It'll run that query, and then soon it starts getting results, it serializes them and sends them back over the wire.

146
00:17:26,000 --> 00:17:31,000
Now some systems can do cursors, for example, and start spooling you some of the results, even though the query starts running.

147
00:17:31,000 --> 00:17:40,000
The query is still running, but as far as I know, most of the cloud systems is like all, once you get all the results, then you can send things back.

148
00:17:40,000 --> 00:17:51,000
Obviously, it depends on the query too. If the root node in the query plan is like an order by with a limit on it, you need to see all the data before you need to start sending anything up.

149
00:17:52,000 --> 00:18:02,000
The thing we care about today is this step here, and we'll talk a little bit at the end of what we can do to speed that piece up faster.

150
00:18:02,000 --> 00:18:11,000
I always say also to the paper you guys read, they talk about how this part is actually not that big of a deal.

151
00:18:11,000 --> 00:18:17,000
We spent the whole semester before how to talk about how to build a fast database system, how to run queries really fast.

152
00:18:18,000 --> 00:18:23,000
Obviously, if you're reading pet by the data, I'm sure that's going to take a long time.

153
00:18:23,000 --> 00:18:37,000
But in the paper you guys read, and then this other work that came out on the single connector X, this thing is actually in this expensive part, sending that over the network in back to the client.

154
00:18:38,000 --> 00:18:44,000
The query themselves aren't going to be that big. The biggest SQL query that you can get is the top is going to be 10 megabytes.

155
00:18:44,000 --> 00:18:49,000
We have the SQL string. That's not expensive to send. It's sending the results back.

156
00:18:51,000 --> 00:19:00,000
Because it'll be very steps along the way because you made the copy in the form that the client or network protocol wants, and that may not be the same as your natively storing in the database.

157
00:19:00,000 --> 00:19:02,000
How would a SQL query be 10 megabytes?

158
00:19:03,000 --> 00:19:09,000
This is the example I actually come from Google. They told me that they had, it's not hard to imagine either.

159
00:19:09,000 --> 00:19:14,000
They had some dashboard where you can click a bunch of checkbox of what you want to visualize.

160
00:19:14,000 --> 00:19:21,000
All that's doing is concatenating search options in a giant in clause, and then before you know it, you got a 10 megabyte SQL string.

161
00:19:21,000 --> 00:19:27,000
It's rare. I'm not saying it's common, but you can imagine something like that.

162
00:19:28,000 --> 00:19:38,000
If we didn't really talk about tricks or how NICNs go faster, you basically, in that case, if your NCLAWS is huge, you basically go to hash table.

163
00:19:38,000 --> 00:19:44,000
On the expression itself, then you use that to probe when you do low-cups. It's like a join.

164
00:19:44,000 --> 00:19:51,000
It's like you think of NCLAWS as like materializing another temp table. If it's huge, if it's big.

165
00:19:51,000 --> 00:19:54,000
Other questions?

166
00:19:55,000 --> 00:19:57,000
Okay.

167
00:19:57,000 --> 00:20:04,000
So, if you're going to build a new database system today, you have two choices.

168
00:20:04,000 --> 00:20:17,000
You either can implement your own wire protocol by scratch, and then in which case, you have to write your JDBC, ODDC client libraries, the drivers to support talking to your database system.

169
00:20:18,000 --> 00:20:29,000
The more common thing to do now, though, is just use an existing wire protocol from existing database system, because then you can just inherit their driver ecosystem for free.

170
00:20:29,000 --> 00:20:38,000
It's not enough to say, okay, I speak the wire protocol to say you're compatible with another database system.

171
00:20:39,000 --> 00:20:48,000
That's the bare minimum. If you just spoke the wire protocol, the client drivers don't know, typically don't know, don't care what the SQL query looks like related to his question.

172
00:20:48,000 --> 00:20:57,000
They're not parsing on the client side to see, are you really sending me a postgres, you know, a postgres compatible query? They're just sort of sending the text over.

173
00:20:57,000 --> 00:21:02,000
So, if you want to be able to support more of the ecosystem, then you have to support the catalogs and other functionality.

174
00:21:02,000 --> 00:21:06,000
But the bare minimum you would need is just to say, I need a wire protocol.

175
00:21:06,000 --> 00:21:16,000
So, it's about 50-50 now. It didn't be, didn't use to be this way. But the two most common wire protocols that are going to be reused is we might seek on postgres.

176
00:21:16,000 --> 00:21:21,000
My SQL used to be number one postgres is actually becoming more, more, more popular.

177
00:21:21,000 --> 00:21:27,000
That's partly because there's a lot of, there's a lot of databases that are like forks of postgres, where they keep the sort of the top half, including the network layer.

178
00:21:27,000 --> 00:21:34,000
So you're speaking the wire protocol, and then they rewrite the bottom layer. That's what Neon does and redshift and others do.

179
00:21:34,000 --> 00:21:44,000
The third most common wire protocol is actually redis. This is because it's so simple. It's like just text-based, like getting sets and simple things like that.

180
00:21:44,000 --> 00:22:00,000
But again, if you support these existing protocols, someone can run against your new data system without having to rewrite their application or change what driver they're using, because you just piggyback off of the existing driver implementations.

181
00:22:00,000 --> 00:22:11,000
Snowflake interestingly did not do this. I think it's a different time. Snowflake decided we're going to write our own wire protocol from scratch, including their own SQL dialect from scratch.

182
00:22:11,000 --> 00:22:26,000
They started in 2011, 2012. I think if you're going to build a new system today, it'll be a hard decision to do that. Because there's just so much stuff you can reuse if you speak the postgres wire protocol.

183
00:22:26,000 --> 00:22:37,000
So the paper I had you guys read was about how to improve the wire protocol between these different data systems.

184
00:22:37,000 --> 00:22:41,000
And they sort of focused on four key design decisions.

185
00:22:41,000 --> 00:23:05,000
So the background of this paper is that this is from the Monet TV light project, which was a precursor to DuckDB. So Hanna and Mark, who are the authors of this paper, as part of the work they were doing when trying to make Monet TV be embeddable, they realize all the problems they were having of getting data in and out into pandas and R programs, even if you're still running on the same process.

186
00:23:05,000 --> 00:23:14,000
So this is sort of what led them to throw away the code and start putting DuckDB. So this again, it's the same team, but this before DuckDB came a thing.

187
00:23:14,000 --> 00:23:23,000
And again, this paper is focused on doing large data exports. So it's not complex queries are doing a bunch of joins and it much sophisticated aggregations.

188
00:23:23,000 --> 00:23:37,000
It's more or less like select star queries or you can get a subset of the columns projected out to then feed that into a pandas or Python program to do additional computation or trained machine learning models and so forth.

189
00:23:37,000 --> 00:23:42,000
So this is the paper is really about how to get data out of the server into the client.

190
00:23:43,000 --> 00:23:50,000
So now whatever, again, whatever organizations we're going to talk about today, you're going to have to also implement them in the client driver.

191
00:23:50,000 --> 00:23:59,000
Because if you start compressing things on the server side, send that over the wire, if the client doesn't know how to decompress them, then like the data is useless.

192
00:24:00,000 --> 00:24:12,000
Likewise, if I convert from the raw oriented format to a columnar format, if the client doesn't know how to do that, transpose, then it's all useless.

193
00:24:12,000 --> 00:24:27,000
And so typically client drivers are being very conservative and they're not going to want to have a lot of extended capabilities in them because now you have to support that for every single possible language you ever want to support.

194
00:24:28,000 --> 00:24:36,000
So if you have the C API and you just wrap that around the various different programming languages, then that's fine because you just sort of implement it once.

195
00:24:36,000 --> 00:24:43,000
But as I was saying before, ideally you want to have a native implementation of your client driver in whatever program language you're running in.

196
00:24:43,000 --> 00:24:50,000
So you don't have this copying over between C or whatever program language you want.

197
00:24:50,000 --> 00:24:58,000
So if now you have all these additional features in your client driver, well now everybody who, every programming language that implements your client driver has to implement the same thing.

198
00:24:58,000 --> 00:25:06,000
And that becomes, could become problematic, fractured, people don't implement all the same capabilities.

199
00:25:06,000 --> 00:25:11,000
So there's a trade-office, how sophisticated we can be versus what people are actually able to do when the client drivers.

200
00:25:12,000 --> 00:25:32,000
Furthermore, in a modern scenario, we haven't really talked about Lambda functions or serverless applications, but a very common scenario now is like the communication with the data server is like I spin up a Lambda function, which is say some Python thing that is run, it connects to the database server, does authentication, sends some queries, get back results, and then does some minor processing, and then goes away.

201
00:25:32,000 --> 00:25:44,000
So in that case, you're paying for the compute time on the serverless function, and you don't want to have a bunch of expensive decitalization if you have a very sophisticated, you know, a client protocol.

202
00:25:44,000 --> 00:25:49,000
And I think, and again, the answer is going to be Apache arrows, going to be the right solution to this, but that's sort of spoiler.

203
00:25:49,000 --> 00:25:54,000
So we're going to go through these to form major pieces, moment one, and see what the trade-offs are.

204
00:25:54,000 --> 00:26:00,000
Again, not just for performance, but also again for the engineering side of the client.

205
00:26:01,000 --> 00:26:08,000
So the first one is going to be kind of obvious, right, because we started off in the semester, Roastroir versus a column store.

206
00:26:08,000 --> 00:26:19,000
And ODBC and JDBC are, you know, by their nature, are Roast oriented APIs because they were developed in the 1990s, early 1990s before, a kilometer databases were a thing.

207
00:26:19,000 --> 00:26:25,000
The paper column on our databases is the first one in column stores is like 82, 83, but that's a theory paper.

208
00:26:25,000 --> 00:26:30,000
There was a Swedish system that was technically a column store, but like in the 70s, when no one has ever heard of that.

209
00:26:30,000 --> 00:26:36,000
Sybase IQ is probably the first one that came along with, it was a true column store invitation, but that's like 97, 98.

210
00:26:36,000 --> 00:26:40,000
So again, ODBC comes along in 1990, column stores aren't a thing.

211
00:26:40,000 --> 00:26:48,000
And most applications people are writing are like business applications that are like going fetching, you know, one order record, or, you know, single entities, single information.

212
00:26:49,000 --> 00:26:52,000
Right, so it was inherently Roast oriented.

213
00:26:52,000 --> 00:26:58,000
So in this world, what's going to happen is the server is going to take all the two pulls that it's getting part of the output.

214
00:26:58,000 --> 00:27:09,000
And even though the, on the server side, it may be storing them as a column store, it's going to stick them back together, materializing them back together because the client protocol, the wire protocol, once it in a Roast oriented manner.

215
00:27:10,000 --> 00:27:21,000
Because then you write applications and sort of pseudo JdBC stuff like this, we're going to iterate over the results set and get one tubal out of time and extract out the data you want Ro by Ro.

216
00:27:21,000 --> 00:27:37,000
But if we switch to a column format, then this tech can be bad too because if I ever need to get multiple data for a single tubal across multiple columns,

217
00:27:37,000 --> 00:27:44,000
then I have to write some weird code of like iterate over the columns and iterate over the next rows and try to put, you know, stitch things back together.

218
00:27:44,000 --> 00:27:48,000
Again, this is not real code. It's just some pseudo code here, right?

219
00:27:48,000 --> 00:27:51,000
So the solution is basically the same thing we talked about at the beginning.

220
00:27:51,000 --> 00:27:58,000
We want a packed space model because because now we can operate over batches of of tuples.

221
00:27:58,000 --> 00:28:13,000
And although we're going to be sending them the data out in a, you know, a columnar fashion, they'll group them together in row groups or small enough chunks where all the data we would need for a single tubal will be, will be close together.

222
00:28:13,000 --> 00:28:15,000
Right?

223
00:28:16,000 --> 00:28:20,000
So this is what Arrow does as we talked about.

224
00:28:20,000 --> 00:28:28,000
And so Arrow has this thing called the Arrow database connectivity and it's basically like JDBC or ABC.

225
00:28:28,000 --> 00:28:40,000
It's a specification programming API for to how to interact with a database system and operate over getting back, getting back vectors.

226
00:28:40,000 --> 00:28:53,000
So if now your database system supports ADBC, which some systems do, like snowflake, for example, then now I can make requests send a SQL query over to the database system and get it back in native arrow form.

227
00:28:53,000 --> 00:29:07,000
And then I can integrate that and use that in my application anyway that I want with one without having to do any copying or decilization because it's already in the vector format.

228
00:29:07,000 --> 00:29:18,000
So we're not going to go through like what ADBC is like it's not everyone actually supports it, but this is going to be, this is basically what Hanis and Mark are going to propose like, hey, we know this vector based API.

229
00:29:18,000 --> 00:29:22,000
And this is what this is what came out later.

230
00:29:22,000 --> 00:29:29,000
Right? Because the paper you guys read predates, predates ADBC.

231
00:29:29,000 --> 00:29:35,000
So now if we want to do in summing sending sending things back as vectors, how we want to support compression.

232
00:29:35,000 --> 00:29:52,000
And this basically is going to smell like again all the stuff we talked about before in storage of this trade off between having general purpose naive compression that was taking blocks of data and throwing gzip or snappy at it versus having a more lightweight encoding scheme that's specific to the actual data that I'm storing.

233
00:29:53,000 --> 00:29:58,000
So again, the easiest approach is to do just gzip or snappy or z standard.

234
00:29:58,000 --> 00:30:14,000
And this is basically you do all the same wire protocol construction of the map of the packets of messages that you would normally do, but right before you send it over the wire, you just run gzip or snap you wanted to compress it before it sends it over and the client basically does the reverse of it.

235
00:30:14,000 --> 00:30:17,000
So this is not that common.

236
00:30:17,000 --> 00:30:31,000
It's not owned by default for most systems, but I know for like Oracle and actually if you know if it can be owned by default, but like a real low light compression, but Oracle and my sequel and BigQuery, these are things you can go add on after the fact.

237
00:30:31,000 --> 00:30:37,000
BigQuery is doing this over HTTP. So I think it's part of the HTTP's client protocol, they're adding gzip.

238
00:30:38,000 --> 00:30:46,000
Oracle added this in, I think, 2013. My sequel has had it, I think, for a while.

239
00:30:46,000 --> 00:30:54,000
There was a patch to do this and add this in Postgres 2018, but that didn't go anywhere. So Postgres doesn't support this.

240
00:30:55,000 --> 00:31:05,000
And then the next approach is doing all the stuff we talked about before using dictionary coding, RLE, Dustin coding, frame of reference coding.

241
00:31:05,000 --> 00:31:18,000
And again, the idea is that you recognize the data type of the data you're sending back over the response and just runs this compression scheme, whatever you want on it.

242
00:31:19,000 --> 00:31:29,000
So nobody does this because again, it'd be a different arrow because you can't if it's arrow does dictionary coding, like that's the only coding scheme that I think supports out of the box.

243
00:31:29,000 --> 00:31:36,000
So like if you get if you get data back as arrow, it'd be already dictionary coded, but they're not doing the delta coding or at least up as well.

244
00:31:36,000 --> 00:31:42,000
Again, nobody does this because they were saying before you have to have all your client drivers also support this as well.

245
00:31:43,000 --> 00:31:51,000
And typically the way it works is like when your client connects to the data server, it's like when you do like an SSH handshake, you say, here's what I, here's the features I can support.

246
00:31:51,000 --> 00:32:02,000
And the client server then picked the sort of bare minimum they would have. So you could have like a bunch of old, you know, you have a bunch of clients showing up with old driver implementations and then not support any of these things.

247
00:32:02,000 --> 00:32:10,000
So things part of reason nobody does this. And again, from engineering side, you have to support this all the different type of limitations.

248
00:32:10,000 --> 00:32:19,000
Yes. Is it really either or can't you have for free? Like for where there's a bit of a lot of those?

249
00:32:19,000 --> 00:32:23,000
Yes, same as like it's not exclusive. Like you could do both. Yes.

250
00:32:23,000 --> 00:32:35,000
And then furthermore, depending on what how you like serialize the data, like if you're just doing text encoding when you pat things out, then this one's going to make a big, big difference versus like that's right.

251
00:32:35,000 --> 00:32:47,000
So they're not music. But I'm saying nobody would as far as I know other than air adbc nobody does this because I was saying the drivers have to support it.

252
00:32:47,000 --> 00:32:55,000
So basically everything I'm saying here is all things we talked about earlier when we talked about getting things from the object store from desk.

253
00:32:55,000 --> 00:33:14,000
When the communication channel between the storage or the between the client and the server is slow, then heavyweight compression is going to be much better because we're willing to pay that trade off of spending more CPU cycles to compress the data down to smaller, smaller sizes because then that'll speed things up as we send it over.

254
00:33:14,000 --> 00:33:24,000
Right. And obviously the larger the chunks of data were sending over the better compression ratio will get.

255
00:33:24,000 --> 00:33:29,000
Next is how do we want to send a heavyweight and sort of serialize and code the data we're sending over.

256
00:33:29,000 --> 00:33:46,000
So the first approach is the most common one we do binary encoding. And this is where the you're basically sending the data from the client to the server in the same loadable binary form that it's being represented in the in your database, at least ideally not always the case though.

257
00:33:47,000 --> 00:33:58,000
And in this case here, the client is responsible for dealing with any Indian issues like if the data is being stored in a little Indian and your client for some reason is running on a big Indian machine, then the clients responsible for doing that conversion.

258
00:33:58,000 --> 00:34:12,000
Because the idea there is the database servers just trying to get you data as fast as possible. And the clients can then since there's more clients than servers typically you can spread out the computational cost of doing that conversion across all the different clients.

259
00:34:13,000 --> 00:34:22,000
So another question is going to be, okay, if we want to use the binary encoding, how are we going to decide what serialization scheme we're going to use.

260
00:34:22,000 --> 00:34:41,000
And in the paper you guys read, they argue that rolling your own serialization format is better than using existing libraries because these existing libraries bring up a bunch of other infrastructure, other things that you may not actually care about that are add additional computation overhead and storage overhead or space overhead for the packet.

261
00:34:41,000 --> 00:34:57,000
So what do you mean by this? So you can write your own serialization format like how to take a result set of three attributes and integer floats and whatever and pack them down into the byte representation that you spend sending the wire.

262
00:34:57,000 --> 00:35:07,000
Or alternatively you use one of these libraries like protobuffers, thrift or flat buffers is the newer one, the better one. There's cat and proto, there's a bunch of these other ones.

263
00:35:07,000 --> 00:35:16,000
They basically provide you the capabilities to define the schema of the message you're sending and serialize it out.

264
00:35:17,000 --> 00:35:27,000
So one year somebody asked me why doesn't any, if we're going to be sending back data through protobuffs, why didn't the store protobuffs natively. And I was like, nobody does that, that sounds like a bad idea.

265
00:35:27,000 --> 00:35:40,000
Turns out somebody does do it because they email me later on. There is a system, I think it's like a toy project called ProfiniB where the wire protocol sends out protocol buffers and internally storage, they're storing everything as protocol buffers as well.

266
00:35:41,000 --> 00:35:48,000
Because it's just bytes, right? So in that case you don't do any serialization or resilization when someone requests something because you just send over the stuff you've already stored as protobuffs.

267
00:35:48,000 --> 00:36:01,000
I'm not saying it's a good idea, but it does exist. The other challenge also too is like with protobuffs that's least, that one is the separate enough from GRPC where you don't have to bring in all the infrastructure for GRPC.

268
00:36:02,000 --> 00:36:12,000
In Thrift as far as I remember, you bring in the threading models, thread pools, and buffer pools as well. This brings out way more infrastructure if you choose to use this.

269
00:36:12,000 --> 00:36:21,000
Flat buffers is like protoboffs. It's pretty simplistic and it's just the serialization format.

270
00:36:22,000 --> 00:36:29,000
There's other things that these guys provide you as well which may meant to be useful because they can find keep track of the versioning of your messages and so forth.

271
00:36:29,000 --> 00:36:42,000
So over time if you expand the capabilities or the internal data members of the packets of messages you're sending when you send that results to queries in protobuff will keep track of the different versions of it.

272
00:36:42,000 --> 00:36:45,000
So you know version of the API you're interacting with.

273
00:36:46,000 --> 00:37:04,000
The other approach is to do text encoding. This is like the simplest thing to do is you take no matter what the data is and you run the equivalent of like two string or stir on it to convert it from the binary form to a string form and then you just send it over as variable string to the client.

274
00:37:05,000 --> 00:37:18,000
And this one is nice because you don't have to worry about any in this because it's some ask your utf8 format. The client then takes your text and converts it back to the binary format and they can put it in whatever form that it wants.

275
00:37:20,000 --> 00:37:27,000
For missing values you could have a separate bitmap to keep track of what values are null. It's moaning to be, they just store the value null.

276
00:37:27,000 --> 00:37:30,000
The string null represent you have a null string.

277
00:37:30,000 --> 00:37:32,000
Yes.

278
00:37:32,000 --> 00:37:34,000
You mean either way is all the data right?

279
00:37:34,000 --> 00:37:45,000
Yeah, so yes. Well you need I to add to make it ask me and then reverse it with a do I. Yes.

280
00:37:45,000 --> 00:37:50,000
So is this a good idea or bad idea? Yes.

281
00:37:50,000 --> 00:37:56,000
So what happens if you have a string of your database that is not worth the word null?

282
00:37:56,000 --> 00:38:05,000
As he points out what if the string of literary is just null? What do you do? I don't know. This is moaning to be. I forgot they did.

283
00:38:05,000 --> 00:38:18,000
Is this a good idea? Other than his like like how do you store null? Is this a good idea or bad idea? Why? He says bad idea. Why?

284
00:38:18,000 --> 00:38:20,000
What is his hand gesture?

285
00:38:20,000 --> 00:38:22,000
What is the size of the data?

286
00:38:22,000 --> 00:38:24,000
The size of the data, huh?

287
00:38:24,000 --> 00:38:29,000
Why do we need to ask? Why do we need to ask? Why do we need to ask?

288
00:38:29,000 --> 00:38:37,000
Why do we usually say this is the start of the string is how long it is to treat the next couple of light of string.

289
00:38:37,000 --> 00:38:41,000
Why do you need like a translated at all?

290
00:38:41,000 --> 00:38:59,000
So like, it can be like this. If I have a 4 by 30 bit integer, 1, 2, 3, 4, 5, 6, when I send it over the wire to the client, I'm literally going to convert it into the string, the ASCII string, character 1, character 2, character 3, character 4, 5, 6.

291
00:38:59,000 --> 00:39:12,000
And I'll do what you said. I'll either store the length of the string in front of it or I can do null termination. But like every piece of data that I'm sending over in a record is going to be a string formula.

292
00:39:12,000 --> 00:39:16,000
But it binary was the difference.

293
00:39:16,000 --> 00:39:17,000
Was the difference?

294
00:39:17,000 --> 00:39:18,000
Yeah.

295
00:39:18,000 --> 00:39:19,000
So like, I can store.

296
00:39:19,000 --> 00:39:27,000
No, no, no, no. So like, this is storing, like, this is a, if you look at the bits, this will be 32 bits to store this number.

297
00:39:27,000 --> 00:39:28,000
So that number of numbers.

298
00:39:28,000 --> 00:39:35,000
Yes. This is going to be, each of these is going to be say, one byte to store the, sort of the character 1, the ASCII character 1.

299
00:39:35,000 --> 00:39:36,000
Right?

300
00:39:36,000 --> 00:39:38,000
Any of the sort of size to it.

301
00:39:38,000 --> 00:39:45,000
Any of the sort of size or the null terminator or he fix the line, which is the next one.

302
00:39:45,000 --> 00:39:46,000
So good idea, bad idea.

303
00:39:46,000 --> 00:39:54,000
That idea, figure, it's more data. And only if you're not going to use that and what happens to, you know, it spends what I put out to you.

304
00:39:54,000 --> 00:39:57,000
It also seems like compression income is the wrong direction.

305
00:39:57,000 --> 00:39:58,000
Yeah.

306
00:39:58,000 --> 00:40:01,000
Yeah. So he's going to go, instead of compressing this, you go in the wrong direction.

307
00:40:01,000 --> 00:40:07,000
But then if you do, if you put G zip on top of this, it's going to compress the hell out there and do fantastic.

308
00:40:07,000 --> 00:40:09,000
So.

309
00:40:10,000 --> 00:40:11,000
Potentially, yes.

310
00:40:19,000 --> 00:40:20,000
Yes.

311
00:40:24,000 --> 00:40:27,000
Because there's more things to compress.

312
00:40:27,000 --> 00:40:29,000
There's more bits.

313
00:40:35,000 --> 00:40:37,000
Well, look at the results on a second.

314
00:40:39,000 --> 00:40:45,000
What's that, Samian?

315
00:40:45,000 --> 00:40:50,000
So if you run the four bytes of threads, four bytes of them, what's it run?

316
00:40:50,000 --> 00:40:53,000
And I'll stick like to end result, which one is this small?

317
00:40:53,000 --> 00:40:54,000
It's correct.

318
00:40:54,000 --> 00:41:03,000
The statement is, if you compress the 30 bits of this versus whatever the six bytes plus the null terminator or the length,

319
00:41:03,000 --> 00:41:05,000
like is that thing ever going to be smaller than this?

320
00:41:06,000 --> 00:41:07,000
Now.

321
00:41:07,000 --> 00:41:09,000
You might be able to do a picture inside.

322
00:41:09,000 --> 00:41:10,000
Yes.

323
00:41:10,000 --> 00:41:17,000
It's really good data based notes better about how to serialize things, rather than just always doing the same.

324
00:41:17,000 --> 00:41:20,000
The statement is, the news says we want to know better whether to serialize this.

325
00:41:20,000 --> 00:41:22,000
Rather than just always doing the same thing.

326
00:41:22,000 --> 00:41:24,000
In theory, yes.

327
00:41:24,000 --> 00:41:27,000
Do you want to spend the time on the server side to do that?

328
00:41:27,000 --> 00:41:28,000
Figure that out.

329
00:41:31,000 --> 00:41:33,000
All right, we'll come back to this.

330
00:41:34,000 --> 00:41:43,000
So if you roll your own, those systems are going to do binary coding, but roll the own and not use one of these missing libraries.

331
00:41:43,000 --> 00:41:47,000
But then it's all the stuff we talked about before when we talked about data file formats.

332
00:41:47,000 --> 00:41:54,000
We have to do the null mass, keep track of data types, the sizes of the data and the messages.

333
00:41:54,000 --> 00:41:56,000
That's fine.

334
00:41:56,000 --> 00:41:59,000
We know how to write that stuff because we had to do it for storage anyway.

335
00:42:00,000 --> 00:42:03,000
It's just more work, whereas like ProDubuff gives you much stuff for free.

336
00:42:03,000 --> 00:42:06,000
But you, you, you, you, is all things in CSP across.

337
00:42:08,000 --> 00:42:09,000
All right, this one we've already talked about.

338
00:42:09,000 --> 00:42:12,000
How are you going to represent actually the length of strings?

339
00:42:12,000 --> 00:42:17,000
You could do the, the, the C style, have the null termiter byte at the end.

340
00:42:17,000 --> 00:42:22,000
And then can the client to just scan along and to what finds the null termiterances?

341
00:42:22,000 --> 00:42:24,000
Okay, and I've all the data that I need.

342
00:42:25,000 --> 00:42:29,000
This makes it harder than potentially do jumps into fixed length offsets.

343
00:42:29,000 --> 00:42:35,000
As we talked about before, if you're, if you're trying to do store things as, as, as sending things over vector batches.

344
00:42:35,000 --> 00:42:39,000
The most common ones we like, like prefix prefixes, which we, we were talking about for.

345
00:42:39,000 --> 00:42:43,000
And then some systems I think this was, I think, minute DB.

346
00:42:43,000 --> 00:42:49,000
They're just going to pat out the, the, the string with additional characters.

347
00:42:49,000 --> 00:42:53,000
To be whatever the, the max size of the edge could be.

348
00:42:53,000 --> 00:42:58,000
Like if I have a, if it's a bar chart 16, I have a bunch of four character strings.

349
00:42:58,000 --> 00:43:00,000
Just going to pat out the rest one bunch of spaces.

350
00:43:00,000 --> 00:43:01,000
Yes.

351
00:43:01,000 --> 00:43:02,000
Of course, it would be the best one.

352
00:43:02,000 --> 00:43:03,000
Say again.

353
00:43:03,000 --> 00:43:05,000
Of course, please tell us what it would be the best one.

354
00:43:05,000 --> 00:43:08,000
His question, it's, it's, it's, it's, it's, it's, it's going to be the best.

355
00:43:08,000 --> 00:43:09,000
Yeah.

356
00:43:09,000 --> 00:43:10,000
Why?

357
00:43:10,000 --> 00:43:15,000
So if it's fixed length, then if you are adding your battery for zero, so G-sickity can get that.

358
00:43:15,000 --> 00:43:16,000
Yes.

359
00:43:16,000 --> 00:43:20,000
And if it's fixed, you can jump around like fast if you want.

360
00:43:20,000 --> 00:43:24,000
You say it is, if it's, if it's fixed with, and you pat it with one to zero,

361
00:43:24,000 --> 00:43:25,000
it's G-sickity can compress that.

362
00:43:25,000 --> 00:43:28,000
But then also to, now everything be fixed length, you can jump around as needed.

363
00:43:28,000 --> 00:43:32,000
And you don't need to be close to, like, you don't need to press V to the end, then you can.

364
00:43:32,000 --> 00:43:33,000
Correct.

365
00:43:33,000 --> 00:43:37,000
So again, depends on, as all things, it depends on what, what the query wants to do with it.

366
00:43:37,000 --> 00:43:38,000
Right?

367
00:43:38,000 --> 00:43:41,000
And furthermore, also to it, if the column is like a bar chart 1024,

368
00:43:41,000 --> 00:43:46,000
and I have a bunch of one character strings in it, then that's wasting a ton of space.

369
00:43:46,000 --> 00:43:49,000
My question would be why would, why would, why would, why would people do that?

370
00:43:49,000 --> 00:43:52,000
People are stupid. You see all sorts of crazy things in real data, is this?

371
00:43:52,000 --> 00:43:53,000
Right?

372
00:43:53,000 --> 00:43:54,000
Yes.

373
00:43:54,000 --> 00:43:57,000
What is the first one, does it have any advantages?

374
00:43:57,000 --> 00:43:59,000
The first one has advantages.

375
00:43:59,000 --> 00:44:05,000
On the server side, you can reuse like, LibC's string functions.

376
00:44:05,000 --> 00:44:07,000
What?

377
00:44:07,000 --> 00:44:10,000
It's not what it is at all for.

378
00:44:10,000 --> 00:44:11,000
Yeah.

379
00:44:11,000 --> 00:44:15,000
So when we put our first system, like my second, third year, or second year at CMU,

380
00:44:15,000 --> 00:44:16,000
we did this.

381
00:44:16,000 --> 00:44:19,000
And then of course, then we go over the wire protocol, because you're sticking the, because wire protocol,

382
00:44:19,000 --> 00:44:25,000
personally didn't want an entrepreneur, didn't have a copy of the string and add the length in front of it.

383
00:44:25,000 --> 00:44:31,000
Do you have like one character in the back row, the column you write for?

384
00:44:31,000 --> 00:44:34,000
One gz if you get it back, if you're bounding everything.

385
00:44:34,000 --> 00:44:42,000
So, the same thing is, if you have the bar chart 1024, and you, and you pad it out, you know, you, you know,

386
00:44:42,000 --> 00:44:45,000
the small strings won't gz handle that for you.

387
00:44:45,000 --> 00:44:48,000
If you use gz, okay, yes.

388
00:44:48,000 --> 00:44:56,000
It takes time, but it also, if you use it, even snappy or z-standard will be fast, but like, you got, like, not all the,

389
00:44:56,000 --> 00:44:58,000
the day you set the server support that.

390
00:44:58,000 --> 00:45:00,000
I just said, Postgres doesn't support this.

391
00:45:00,000 --> 00:45:03,000
Postgres wire protocol itself has no notion of compression.

392
00:45:03,000 --> 00:45:09,000
You can hack it by like, tunneling all your traffic over SSH and compress that, but that's actually hot,

393
00:45:09,000 --> 00:45:11,000
and that's some, that sounds crazy.

394
00:45:11,000 --> 00:45:17,000
Like, the Postgres wire protocol, as far as I know, at least in 2024, does not have like a flag, say, this is going to be compressed.

395
00:45:17,000 --> 00:45:19,000
My, my sequel has it.

396
00:45:19,000 --> 00:45:20,000
Or a whole hasn't.

397
00:45:20,000 --> 00:45:24,000
Not, not, not, not, other systems do not.

398
00:45:24,000 --> 00:45:29,000
So, again, sometimes ones can be faster, sometimes, uh, twos can be faster.

399
00:45:29,000 --> 00:45:32,000
Um, no system is going to do both.

400
00:45:32,000 --> 00:45:37,000
Uh, no system is going to try to figure out, okay, based on what your, you know, what the data looks like and what your query looks like.

401
00:45:37,000 --> 00:45:38,000
I'm going to give you one versus the other.

402
00:45:38,000 --> 00:45:47,000
Because again, that's more engineering overhead that you got to support now on the, on the server side, and on the client side, and it's just not worth it.

403
00:45:47,000 --> 00:45:50,000
Right? This will be the fastest if your data set size is small.

404
00:45:50,000 --> 00:45:52,000
It's all char ones.

405
00:45:52,000 --> 00:45:54,000
This is going to be the fastest.

406
00:45:54,000 --> 00:45:59,000
Because you don't store the, the length.

407
00:45:59,000 --> 00:46:06,000
Okay, I'm going to show, um, let's say also to like, as all things we talked about for, these aren't independent, right?

408
00:46:06,000 --> 00:46:12,000
Like, if I, if I choose one of these, that'll affect whether, you know, how, what kind of complexity that want to use.

409
00:46:12,000 --> 00:46:16,000
That's very something to the stuff we talked about when we talked about data on disk.

410
00:46:16,000 --> 00:46:18,000
So, I'm going to show two graphs here.

411
00:46:18,000 --> 00:46:24,000
So, the first is going to be what happens when we just send one tuple from, from the data system to the client.

412
00:46:24,000 --> 00:46:34,000
And the idea is here just to look at what the overheads of like, just all the infrastructure around the messages of sending the query and getting, getting back to the result.

413
00:46:34,000 --> 00:46:40,000
So, and for all these systems, except for Hive, these are all going to be using O2BC.

414
00:46:40,000 --> 00:46:43,000
Hive is going to be using JDBC.

415
00:46:43,000 --> 00:46:48,000
I think, forget the reason why they did that.

416
00:46:48,000 --> 00:46:50,000
So, here's the numbers.

417
00:46:50,000 --> 00:46:55,000
Right? And they're, they're listed in order of, of, of performance.

418
00:46:55,000 --> 00:47:02,000
So, the first thing to point out here is that, here's, here's a MoneDB that's using the text encoding thing we've talked about before.

419
00:47:02,000 --> 00:47:08,000
And they're sending over, converting all the binary data into string form and sending that over.

420
00:47:08,000 --> 00:47:12,000
Right? All the other ones are using binary encoding.

421
00:47:12,000 --> 00:47:20,000
But yet, MoneDB is, is the, what, the second fastest or third fastest? Right?

422
00:47:20,000 --> 00:47:23,000
Why?

423
00:47:23,000 --> 00:47:25,000
Probably a g-zip.

424
00:47:25,000 --> 00:47:26,000
You said power g-zip.

425
00:47:26,000 --> 00:47:29,000
What's that?

426
00:47:29,000 --> 00:47:32,000
It might still seem to be faster without...

427
00:47:32,000 --> 00:47:33,000
Yep.

428
00:47:33,000 --> 00:47:35,000
So, that's what we're just going to do.

429
00:47:35,000 --> 00:47:38,000
G-zip, helping this, helping him here?

430
00:47:38,000 --> 00:47:39,000
No.

431
00:47:39,000 --> 00:47:42,000
So, all right. So, let's talk about why the other ones are slow. Right?

432
00:47:42,000 --> 00:47:44,000
So, so the slowest one is Hive. Right?

433
00:47:44,000 --> 00:47:49,000
The reason why that's, according to the paper, why that slow is, they're using Thrift.

434
00:47:49,000 --> 00:47:54,000
So, Thrift is going to do, you know, copying things in and out of, of Thrift buffers.

435
00:47:54,000 --> 00:47:59,000
So, that additional M-copies get data, you know, onto Thrift on the server side,

436
00:47:59,000 --> 00:48:02,000
and then on the client side, copying out of their buffers as well.

437
00:48:02,000 --> 00:48:10,000
And then Thrift is also going to, you know, sending over a bunch of different meta data about what the structure of the,

438
00:48:10,000 --> 00:48:18,000
of the, of the, of the structure of the message is going to be, you know, they're sending that over as well.

439
00:48:18,000 --> 00:48:26,000
So, the size of the, of the packet, the message for sending the same tuple as all those systems is just much, much higher.

440
00:48:26,000 --> 00:48:33,000
DB2 is, the second slowest because they're actually, I mean Oracle does this, as well, but for some reason it's, it's more

441
00:48:33,000 --> 00:48:37,000
pre-nicious than this one. They're actually also basically re-implementing

442
00:48:37,000 --> 00:48:44,000
acknowledgements on top of TCP IP. So, TCP IP is already going to be doing like, you know, sending acts back.

443
00:48:44,000 --> 00:48:49,000
They're going to be doing that as well above that to make sure that like, okay, I got your message for this,

444
00:48:49,000 --> 00:48:53,000
you know, the daily server, for this, you know, I got this packet, I'm ready to give me the next one.

445
00:48:53,000 --> 00:49:02,000
Right? So, the protocol itself is just way more chatty because for some reason they're implementing, re-implementing this idea of, you know, of acknowledgements, yes.

446
00:49:02,000 --> 00:49:05,000
Was it based on beauty of the idea? Is that what they're doing?

447
00:49:05,000 --> 00:49:07,000
His question is, is it based on UDP? I have no idea.

448
00:49:08,000 --> 00:49:13,000
Also, too, like, since it's a proprietary protocol, they can't see the implementation on the server side.

449
00:49:13,000 --> 00:49:16,000
This is what the payment is speculating. Yes.

450
00:49:16,000 --> 00:49:19,000
How is it possible for the so slow one?

451
00:49:19,000 --> 00:49:22,000
For one to, how many bits is that?

452
00:49:22,000 --> 00:49:24,000
How many bit's is that?

453
00:49:24,000 --> 00:49:27,000
At most, let's say, from TPCH?

454
00:49:27,000 --> 00:49:30,000
It's less than, let's have a kill right.

455
00:49:31,000 --> 00:49:33,000
So, let's take the whole script.

456
00:49:33,000 --> 00:49:40,000
I think also, too, like, this is, I think this is end to end time, right?

457
00:49:40,000 --> 00:49:42,000
And not just sending the message.

458
00:49:42,000 --> 00:49:51,000
So, like, this is like sending the query and then high basically converts the query into a map-reduced job, then it dispatches that, gets back to the results, sends it back.

459
00:49:51,000 --> 00:49:53,000
So, I think it includes that.

460
00:49:53,000 --> 00:49:56,000
But I had to double check.

461
00:49:56,000 --> 00:50:02,000
And this client on the same machine as the server, I see what else I say.

462
00:50:02,000 --> 00:50:08,000
The minimum query exact shoot time, they would query multiple times, the data system would cache the query plan and the result.

463
00:50:08,000 --> 00:50:10,000
So, I came back to what I said. It wasn't running the map-reduced job.

464
00:50:10,000 --> 00:50:14,000
In literally, it's just, like, how to get data in and out as fast as possible.

465
00:50:14,000 --> 00:50:15,000
Right?

466
00:50:15,000 --> 00:50:17,000
Okay, it's one second.

467
00:50:17,000 --> 00:50:19,000
It's wrong.

468
00:50:19,000 --> 00:50:21,000
How does not have a great system?

469
00:50:21,000 --> 00:50:30,000
There's a reason why Facebook ditched it and rewrote, pressed O.

470
00:50:30,000 --> 00:50:41,000
Hi, it was a stopgap solution in the late 2000s when, and I was sort of part of this, like, the map-reduced paper came out from Google.

471
00:50:41,000 --> 00:50:45,000
Yahoo took it, sort of re-impleanted the ideas as a Hadoop.

472
00:50:45,000 --> 00:50:51,000
Hadoop was like the hot thing. I was like, this is amazing. This is how you should be doing analytics and big data stuff.

473
00:50:51,000 --> 00:50:56,000
The relational database people, which I was a part of, you guys are all doing it wrong.

474
00:50:56,000 --> 00:51:01,000
You're re-venting stuff. It was a men in the 90s for parallel databases, distributed databases.

475
00:51:01,000 --> 00:51:05,000
And then, like, declarative languages like SQL is a good idea.

476
00:51:05,000 --> 00:51:11,000
Processing data on partition tables. That's a good idea.

477
00:51:11,000 --> 00:51:15,000
And then people realize, oh yeah, writing these map-reduced jobs in Java sucks.

478
00:51:15,000 --> 00:51:17,000
Be nice we had SQL.

479
00:51:17,000 --> 00:51:23,000
So then they built high, which is basically a translator from SQL, and it would then cogent a map-reduced Java program.

480
00:51:23,000 --> 00:51:29,000
So, yeah, you're making a face. It's not saying it's a good idea.

481
00:51:29,000 --> 00:51:32,000
Yeah, okay, for this, again, they were surprised at how slow DB2 was, again, as you were saying.

482
00:51:32,000 --> 00:51:39,000
It's such a small amount of data, but again, I think the protocol is just so chatting.

483
00:51:39,000 --> 00:51:42,000
All right, so let's now look, we'll send more data.

484
00:51:42,000 --> 00:51:45,000
So for this one, we're going to send a million tables from TPCH.

485
00:51:45,000 --> 00:51:49,000
And what they're going to do is they're going to scale along the X-axis.

486
00:51:49,000 --> 00:51:55,000
They're going to artificially slow down what the network latency is between the client and the server.

487
00:51:55,000 --> 00:52:00,000
And so the first line I want to show is just for my SQL with GZIP and my SQL without GZIP.

488
00:52:00,000 --> 00:52:05,000
So this basically corroborates what we talked about before with storage,

489
00:52:05,000 --> 00:52:08,000
getting things again from S3 or the object store, whatever.

490
00:52:08,000 --> 00:52:16,000
When the network's really fast, you don't want to compress the data because the CPU cost of doing that digital compression is just not worth the penalty,

491
00:52:16,000 --> 00:52:19,000
or it's not worth it because the network is so fast.

492
00:52:19,000 --> 00:52:24,000
And so that's why you see this gap here when the network's really fast, not using compression is the better way to go,

493
00:52:24,000 --> 00:52:26,000
even though you are sending more bytes.

494
00:52:26,000 --> 00:52:33,000
But then even though we are long scale here, but as we get to a slower speed, so 100 milliseconds for the latency,

495
00:52:33,000 --> 00:52:39,000
again, we're long scale, but the compression one actually is slightly better.

496
00:52:39,000 --> 00:52:48,000
Because in that case, the CPU is not the dominating factor of getting the data out.

497
00:52:48,000 --> 00:52:52,000
The compression over has bad when the trade-off of the network is fast.

498
00:52:52,000 --> 00:52:55,000
So now we bring back all the other ones.

499
00:52:55,000 --> 00:53:00,000
And they all basically convert or are moving along the same way as expected.

500
00:53:00,000 --> 00:53:07,000
The time it takes to get the data out of the database server goes up as the network gets slower.

501
00:53:07,000 --> 00:53:16,000
What's surprising here is that you kind of see that in the case of Oracle, they're one of the faster ones when the network gets fast,

502
00:53:16,000 --> 00:53:20,000
but then as the network gets slower, they're now the second slowest.

503
00:53:20,000 --> 00:53:22,000
DB2 is always the slowest.

504
00:53:22,000 --> 00:53:27,000
Hi, I've actually beat, yeah, hi, I've actually beat DB2 when the slower network.

505
00:53:27,000 --> 00:53:33,000
And so the Oracle is a, Oracle is a proprietary protocol.

506
00:53:33,000 --> 00:53:39,000
We can't see the implementation of it, but they speculate, they speculate again just like in the case of DB2,

507
00:53:39,000 --> 00:53:48,000
Oracle is also sending their own acknowledgments back and forth, and it just becomes more dominating cost with the network gets slower.

508
00:53:48,000 --> 00:53:57,000
So again, all of these except for hot, sorry, except for a mony DB are binary protocols,

509
00:53:57,000 --> 00:54:06,000
but a mony DB is actually what, is the third best after my SQL and my SQL and GZIP?

510
00:54:06,000 --> 00:54:08,000
Because it's simple, yes.

511
00:54:08,000 --> 00:54:13,000
Is the benefit from compression over the white daughter's often at my people?

512
00:54:13,000 --> 00:54:18,000
Question is, do you get the same benefit of compression for the other sets of as my SQL?

513
00:54:18,000 --> 00:54:22,000
I would assume yes, like Oracle, you could test it.

514
00:54:22,000 --> 00:54:28,000
I would say yes, because the Oracle wire protocol, it's, the actual bits themselves,

515
00:54:28,000 --> 00:54:32,000
maybe different than what my SQL is, but it's a binary based protocol like my SQL.

516
00:54:32,000 --> 00:54:34,000
So it'd probably be the same.

517
00:54:34,000 --> 00:54:37,000
Why do they only, if one of them is a bit of a white daughter?

518
00:54:37,000 --> 00:54:40,000
Exception, why do they only turn on GZIP for my SQL?

519
00:54:40,000 --> 00:54:41,000
I don't know.

520
00:54:41,000 --> 00:54:42,000
Yep.

521
00:54:45,000 --> 00:54:46,000
Okay.

522
00:54:46,000 --> 00:54:48,000
So I'm going to show another result from a different paper.

523
00:54:48,000 --> 00:54:53,000
This is a paper we wrote with one of my former master students,

524
00:54:53,000 --> 00:54:57,000
now a PhD student at MIT, and then West McKinney, the guy from Apache Arrow.

525
00:54:57,000 --> 00:55:02,000
So for this one, this is from our older system, Peloton, our noise page,

526
00:55:02,000 --> 00:55:07,000
and the idea was how fast can we get the line item table out of,

527
00:55:07,000 --> 00:55:09,000
or the line table out in TBCC, so I'll get, okay.

528
00:55:09,000 --> 00:55:14,000
Probably a seven gigabyte data, how can we fast clean get it to the client?

529
00:55:14,000 --> 00:55:19,000
So the client isn't doing any, any, any computation on it, which is how fast can you get it?

530
00:55:19,000 --> 00:55:23,000
And so the, our system is supported, the Postgres wire protocol,

531
00:55:23,000 --> 00:55:27,000
so this is like, this is the default like Postgres wire protocol without compression,

532
00:55:27,000 --> 00:55:29,000
row base, this is how fast you can get the data out.

533
00:55:30,000 --> 00:55:34,000
So natively our system was storing everything as Apache Arrow tables.

534
00:55:34,000 --> 00:55:37,000
So that, in our system, you can do transactions, then over time,

535
00:55:37,000 --> 00:55:41,000
as the data got cold and you weren't modifying anymore,

536
00:55:41,000 --> 00:55:46,000
it would just dim flips and bits around, and then it would be natively sorting Apache Arrow.

537
00:55:46,000 --> 00:55:53,000
So this next bar here is what you get from what they were posing in the paper you guys read,

538
00:55:53,000 --> 00:55:57,000
like here's the vectorized version of the, of the Postgres wire protocol,

539
00:55:57,000 --> 00:56:02,000
we were sending things as a PAX format rather than as road-wiring to it.

540
00:56:02,000 --> 00:56:06,000
But then the next approach is using, early precursor to ADBC,

541
00:56:06,000 --> 00:56:12,000
the arrow connectivity stuff, where this is like natively sending out a,

542
00:56:12,000 --> 00:56:17,000
the Apache Arrow data in its form without doing any translations,

543
00:56:17,000 --> 00:56:20,000
just natively shoving that to the Python application.

544
00:56:20,000 --> 00:56:23,000
And so it's faster because there's no conversion over the,

545
00:56:23,000 --> 00:56:26,000
to convert it into a different form, right?

546
00:56:26,000 --> 00:56:29,000
It's exactly for what, you know, we're sending the data, we're storing natively memory,

547
00:56:29,000 --> 00:56:32,000
we're just storing that shoving that, there's bytes right out.

548
00:56:32,000 --> 00:56:35,000
And so now the last one is RDMA, I'll cover what that is in the second.

549
00:56:35,000 --> 00:56:38,000
Basically this is like a network accelerator to do kernel bypass,

550
00:56:38,000 --> 00:56:40,000
to, to, to, to get the data out of memory,

551
00:56:40,000 --> 00:56:45,000
put it on the nick and send it out without having to copy things into the CPU first.

552
00:56:46,000 --> 00:56:50,000
And I forget we use, I think we used a fan of it for this one.

553
00:56:50,000 --> 00:56:54,000
But again, this one also is just sending out native arrow arrow blocks,

554
00:56:54,000 --> 00:56:56,000
rather than doing the conversion.

555
00:56:56,000 --> 00:57:00,000
So again, even though the paper you guys read didn't, didn't implement,

556
00:57:00,000 --> 00:57:04,000
you know, didn't have, you know, arrow at the time to send, send it out,

557
00:57:04,000 --> 00:57:08,000
the, the performance difference, I think, would look like this.

558
00:57:08,000 --> 00:57:12,000
So again, so I'm saying, something that ADBC just shoving data out as arrow

559
00:57:12,000 --> 00:57:15,000
is the right way to go if you're building a modern system today.

560
00:57:15,000 --> 00:57:16,000
Yes.

561
00:57:16,000 --> 00:57:18,000
Is there a cost of converting whatever it is,

562
00:57:18,000 --> 00:57:20,000
most of the arrow for this?

563
00:57:20,000 --> 00:57:22,000
It's questions, is there a cost of convert, whatever,

564
00:57:22,000 --> 00:57:23,000
postgres is into arrow?

565
00:57:23,000 --> 00:57:24,000
Yeah.

566
00:57:24,000 --> 00:57:25,000
I mean, certainly yes.

567
00:57:25,000 --> 00:57:28,000
So, doesn't, doesn't that want to keep, like,

568
00:57:28,000 --> 00:57:31,000
that shows the cost of converting, like, postgres,

569
00:57:31,000 --> 00:57:33,000
is the, whatever, format, the paper?

570
00:57:33,000 --> 00:57:37,000
No, this is the cost of converting arrow into the,

571
00:57:37,000 --> 00:57:41,000
a postgres compatible protocol that sends things in a vectorized format.

572
00:57:41,000 --> 00:57:46,000
This is like, I don't do any copying, I do literally shove the bytes out.

573
00:57:46,000 --> 00:57:51,000
And then the paper talks about it like, to do,

574
00:57:51,000 --> 00:57:55,000
like, to do something like this, to rewrite your right protocol,

575
00:57:55,000 --> 00:57:57,000
it'd be very unlikely that the date,

576
00:57:57,000 --> 00:57:59,000
you're storing that data in a navly anyway.

577
00:57:59,000 --> 00:58:04,000
So you, if you just have things, to convert things to arrow,

578
00:58:04,000 --> 00:58:06,000
or have things already be arrow internally,

579
00:58:06,000 --> 00:58:08,000
then that's a better way to do this.

580
00:58:08,000 --> 00:58:10,000
That's why you see some systems, like,

581
00:58:10,000 --> 00:58:12,000
you made a result going from one operator to the next,

582
00:58:12,000 --> 00:58:15,000
to the query planner, how they exchange data between the different workers,

583
00:58:15,000 --> 00:58:22,000
if everything's an arrow, then, like, you have the infrastructure to shove the data, like that.

584
00:58:22,000 --> 00:58:23,000
Okay.

585
00:58:23,000 --> 00:58:28,000
So, the, these, these, these members should show here,

586
00:58:28,000 --> 00:58:32,000
the, we talked about how, like, okay, the,

587
00:58:32,000 --> 00:58:34,000
the network protocol, like, you can press things,

588
00:58:34,000 --> 00:58:37,000
is it, how are you encoding the serialization format,

589
00:58:37,000 --> 00:58:38,000
how much metadata you're sending around?

590
00:58:38,000 --> 00:58:42,000
Like, that was what we focused on, but that isn't always going to be the,

591
00:58:42,000 --> 00:58:45,000
the major slowdown of sending things over the network.

592
00:58:45,000 --> 00:58:46,000
Right?

593
00:58:46,000 --> 00:58:49,000
As I said many times, the OS is going to be a problem for us.

594
00:58:49,000 --> 00:58:51,000
It's always going to try to ruin our lives,

595
00:58:51,000 --> 00:58:54,000
make things harder for us, break up our marriages, and whatever.

596
00:58:54,000 --> 00:58:56,000
Right? And in particular, TCPIP stack,

597
00:58:56,000 --> 00:58:58,000
it's just going to be super slow,

598
00:58:58,000 --> 00:59:00,000
and ideally, we want to try to avoid it.

599
00:59:00,000 --> 00:59:04,000
So why is it slow? Well, it's, it's, you know,

600
00:59:05,000 --> 00:59:08,000
the networking implementation is based on this model of interrupts.

601
00:59:08,000 --> 00:59:11,000
So, like, you know, they're requiring, they're assuming these interrupts

602
00:59:11,000 --> 00:59:13,000
are going to come along, and that's how it's going to trigger things like,

603
00:59:13,000 --> 00:59:15,000
hey, bytes are ready to go in and out, and that, you know,

604
00:59:15,000 --> 00:59:17,000
and you're going to do a context switch, like,

605
00:59:17,000 --> 00:59:18,000
all that becomes super expensive.

606
00:59:18,000 --> 00:59:20,000
Then you get data coming on the Nick,

607
00:59:20,000 --> 00:59:23,000
the OS wants to copy that in its own internal kernel buffers,

608
00:59:23,000 --> 00:59:25,000
and then, before it hands you that memory,

609
00:59:25,000 --> 00:59:27,000
it's going to copy into your user space buffers.

610
00:59:27,000 --> 00:59:28,000
Right?

611
00:59:28,000 --> 00:59:29,000
What was that face?

612
00:59:29,000 --> 00:59:30,000
What's that, what's wrong?

613
00:59:30,000 --> 00:59:31,000
What?

614
00:59:31,000 --> 00:59:32,000
Sorry.

615
00:59:33,000 --> 00:59:37,000
Yeah, this sucks. Yeah.

616
00:59:37,000 --> 00:59:39,000
It's a terrible.

617
00:59:39,000 --> 00:59:42,000
Furthermore, all right, so the kernel has got a bunch of threads coming down,

618
00:59:42,000 --> 00:59:44,000
and they're handling the interrupts, they're handling things coming over the,

619
00:59:44,000 --> 00:59:46,000
the Nicks and hardware and so forth.

620
00:59:46,000 --> 00:59:48,000
Well, those have to be scheduled.

621
00:59:48,000 --> 00:59:51,000
They have to maintain their own latches for their own internal data structures.

622
00:59:51,000 --> 00:59:54,000
All that is going to be problematic, right?

623
00:59:54,000 --> 00:59:59,000
So, we want to figure out a way that we can avoid the OS as much as possible.

624
00:59:59,000 --> 01:00:01,000
Yeah, we need the OS to survive.

625
01:00:01,000 --> 01:00:05,000
We need it to give us some memory and obviously schedule us,

626
01:00:05,000 --> 01:00:08,000
but after that, we want to avoid it as much as possible.

627
01:00:08,000 --> 01:00:11,000
And that's going to allow us our users to run faster.

628
01:00:11,000 --> 01:00:17,000
So, what I'll talk about next is going to be focusing primarily on for networking stuff,

629
01:00:17,000 --> 01:00:19,000
but this also applies for disk.

630
01:00:19,000 --> 01:00:23,000
You want to avoid the OS for disk as much as possible, too.

631
01:00:23,000 --> 01:00:25,000
All right, so the first approach to me,

632
01:00:25,000 --> 01:00:27,000
what I call kernel bypass.

633
01:00:27,000 --> 01:00:31,000
And the idea here is that we want to be able to get data directly from the hardware,

634
01:00:31,000 --> 01:00:34,000
in this case, the Nick, the thing that the American interface,

635
01:00:34,000 --> 01:00:38,000
we want to get that into our database system running in user space,

636
01:00:38,000 --> 01:00:40,000
into our memory up there without having to go through us,

637
01:00:40,000 --> 01:00:46,000
without doing any copying, ideally without having to talk to the OS TCP IP stack.

638
01:00:46,000 --> 01:00:48,000
All right?

639
01:00:48,000 --> 01:00:50,000
And so, there's three different ways you can do this.

640
01:00:50,000 --> 01:00:56,000
There's the DVDK, RDMA, and then IOU Ring is going to be the,

641
01:00:56,000 --> 01:00:58,000
the newer one, right?

642
01:00:58,000 --> 01:01:01,000
So, the way to think about this is like,

643
01:01:01,000 --> 01:01:04,000
OS Linux is a time sharing system,

644
01:01:04,000 --> 01:01:08,000
and that means it's going to rely on these slow, expensive interrupts to, again,

645
01:01:08,000 --> 01:01:11,000
tell it when there's something new showing up,

646
01:01:11,000 --> 01:01:13,000
and take away some, you know, take away,

647
01:01:13,000 --> 01:01:17,000
exuding some thread to go let now the kernel thread deal with whatever that,

648
01:01:17,000 --> 01:01:19,000
you know, the interrupt handler, right?

649
01:01:19,000 --> 01:01:21,000
And then all these additional threads on the inside,

650
01:01:21,000 --> 01:01:23,000
they're going to maintain their own latches,

651
01:01:23,000 --> 01:01:25,000
and all those things are going to be problematic for us.

652
01:01:25,000 --> 01:01:28,000
Linux has gotten a lot better in the last, I mean, the 10 years,

653
01:01:28,000 --> 01:01:32,000
or the 10 years it's gotten way better for handling with, you know,

654
01:01:32,000 --> 01:01:34,000
large amount of core counts.

655
01:01:34,000 --> 01:01:36,000
It's gotten way more scale than it used to be,

656
01:01:36,000 --> 01:01:39,000
but, you know, whenever there's contention,

657
01:01:39,000 --> 01:01:40,000
no matter how great your code is,

658
01:01:40,000 --> 01:01:42,000
everything's always going to fall over.

659
01:01:42,000 --> 01:01:44,000
We're going to avoid as much as possible.

660
01:01:44,000 --> 01:01:46,000
All right, so let's go through these one by one.

661
01:01:46,000 --> 01:01:49,000
So, the DVDK, the data plane development kit,

662
01:01:49,000 --> 01:01:51,000
this is from something from Intel.

663
01:01:51,000 --> 01:01:54,000
So, it's a set of libraries that allow your user space program

664
01:01:54,000 --> 01:01:56,000
to interact with the Nick directly.

665
01:01:56,000 --> 01:02:00,000
There's an equipment for, in the storage world,

666
01:02:00,000 --> 01:02:04,000
called the SBDK, the storage plane data kit, also from Intel.

667
01:02:04,000 --> 01:02:07,000
And the idea here is that you treat whatever,

668
01:02:07,000 --> 01:02:11,000
the harbor device you're trying to interact with as a raw device,

669
01:02:11,000 --> 01:02:14,000
meaning you're responsible for like reading the low, low bits

670
01:02:14,000 --> 01:02:18,000
in the memory space of that device and interacting with it.

671
01:02:18,000 --> 01:02:21,000
And this goes against the unit's philosophy where everything's a file,

672
01:02:21,000 --> 01:02:24,000
no matter whether it's a file on disk or it's a harbor device,

673
01:02:24,000 --> 01:02:26,000
you interact with these things that's files,

674
01:02:26,000 --> 01:02:29,000
you have your efforts and so forth.

675
01:02:29,000 --> 01:02:32,000
But this breaks this model entirely.

676
01:02:32,000 --> 01:02:39,000
So, now, because now the OS is removing the OS from the low level layers,

677
01:02:39,000 --> 01:02:42,000
like 3 and 4, that means that, and our database is,

678
01:02:42,000 --> 01:02:44,000
and we're responsible for doing a bunch of stuff

679
01:02:44,000 --> 01:02:46,000
that the OS would do for us.

680
01:02:46,000 --> 01:02:49,000
And ideally, we could do this better, but not always.

681
01:02:49,000 --> 01:02:52,000
So, the most obvious thing for doing this using the DBDK to do

682
01:02:52,000 --> 01:02:57,000
networking stuff, well now, since there isn't the TCP,

683
01:02:57,000 --> 01:03:01,000
the OS hasn't run the TCP IP stack for you on the device,

684
01:03:01,000 --> 01:03:03,000
we have to do that in our database system.

685
01:03:03,000 --> 01:03:07,000
You either write it by hand, or you can use open source library like F stack,

686
01:03:07,000 --> 01:03:10,000
they basically re-implement in user space TCP IP,

687
01:03:10,000 --> 01:03:13,000
like sending the sequence numbers, sending Mac, X,

688
01:03:13,000 --> 01:03:16,000
like all that we have to do ourselves, the OS isn't going to do this,

689
01:03:16,000 --> 01:03:18,000
and the harbor doesn't do it.

690
01:03:18,000 --> 01:03:20,000
The advantage is that we don't have any data copying,

691
01:03:20,000 --> 01:03:23,000
because we're now getting literally raw buffers of packets,

692
01:03:23,000 --> 01:03:27,000
we get to manage what those are off the device.

693
01:03:27,000 --> 01:03:31,000
We're not calling a read, excuse me, there's no syscalls,

694
01:03:31,000 --> 01:03:36,000
everything is done again, reading directly into memory.

695
01:03:36,000 --> 01:03:38,000
So, this sounds amazing, right?

696
01:03:38,000 --> 01:03:40,000
Well, it's not that common, right?

697
01:03:40,000 --> 01:03:44,000
As far as we know, there's only two systems that actually implement our used DBDK.

698
01:03:44,000 --> 01:03:49,000
The first is ScaliaDBs, and they have this framework called C-star,

699
01:03:49,000 --> 01:03:55,000
that they're built on top of ScaliaDB is a re-imlimitation of a patch of Cassandra and C++,

700
01:03:55,000 --> 01:03:58,000
with like code routines and DBDK and some other optimizations,

701
01:03:58,000 --> 01:04:00,000
on where Cassandra's entirely in Java.

702
01:04:00,000 --> 01:04:02,000
And then yellow brick will cover later on,

703
01:04:02,000 --> 01:04:04,000
they also use this as well.

704
01:04:04,000 --> 01:04:10,000
But they had the ScaliaDB guys gave a talk with us a few years ago during the pandemic,

705
01:04:10,000 --> 01:04:12,000
and they mentioned how in the C-star they yes,

706
01:04:12,000 --> 01:04:17,000
they use code routines as well, DBDK, but DBDK for them has been a total nightmare to deal with,

707
01:04:17,000 --> 01:04:19,000
and I think it's turned off by default at this point.

708
01:04:19,000 --> 01:04:22,000
I saw the yellow brick CTO a few weeks ago at Citer,

709
01:04:22,000 --> 01:04:26,000
and as far as I know, they're still using DBDK for their implementation.

710
01:04:26,000 --> 01:04:28,000
Again, they're doing this in the back end,

711
01:04:28,000 --> 01:04:32,000
not between the client and the server.

712
01:04:32,000 --> 01:04:33,000
Right, why is it so hard?

713
01:04:33,000 --> 01:04:36,000
Well, okay, because you have to implement a bunch of stuff that you also normally do for you,

714
01:04:36,000 --> 01:04:37,000
you have to implement it yourself.

715
01:04:37,000 --> 01:04:38,000
And we tried this in our system,

716
01:04:38,000 --> 01:04:41,000
we had one of my best master students try to use F-stack to speed up

717
01:04:42,000 --> 01:04:44,000
another project we were doing to make a Postgres Proxy Run faster,

718
01:04:44,000 --> 01:04:46,000
and we couldn't make it work.

719
01:04:46,000 --> 01:04:49,000
The engineering cost is just way too high.

720
01:04:49,000 --> 01:04:54,000
So it's a bit crude, but this is one of my favorite tweets of all time.

721
01:04:54,000 --> 01:04:56,000
So this guy's talking about the SBDK,

722
01:04:56,000 --> 01:04:58,000
which again, that's where the storage 98K,

723
01:04:58,000 --> 01:05:00,000
but the DBDK certainly applies here.

724
01:05:00,000 --> 01:05:02,000
So all this kernel bypass stuff is fantastic.

725
01:05:02,000 --> 01:05:04,000
You think you're going to get a big win,

726
01:05:04,000 --> 01:05:05,000
but it's like pin your pants, cut your cold,

727
01:05:05,000 --> 01:05:07,000
and then you regret it pretty quickly.

728
01:05:07,000 --> 01:05:09,000
Is this the guy who's the real Iaduring?

729
01:05:10,000 --> 01:05:11,000
Is it?

730
01:05:11,000 --> 01:05:12,000
Yeah.

731
01:05:12,000 --> 01:05:13,000
Okay, yeah.

732
01:05:13,000 --> 01:05:14,000
Thank you.

733
01:05:14,000 --> 01:05:15,000
Okay.

734
01:05:15,000 --> 01:05:18,000
All right, so the next approach is to do RDAB.

735
01:05:18,000 --> 01:05:20,000
And in this way, you have a,

736
01:05:20,000 --> 01:05:25,000
it's like NVMe, there's an API that the hardware provides,

737
01:05:25,000 --> 01:05:28,000
allows you to write directly into the hardware device

738
01:05:28,000 --> 01:05:34,000
and get access things on a machine as if it was local.

739
01:05:34,000 --> 01:05:36,000
So for this one's a bit more tricky,

740
01:05:36,000 --> 01:05:38,000
because now if you're reading right into memory addresses,

741
01:05:38,000 --> 01:05:40,000
on a run machine, you've got to be sure that, you know,

742
01:05:40,000 --> 01:05:42,000
what you're actually reading is what you're expecting to read.

743
01:05:42,000 --> 01:05:45,000
So there isn't more handshaking up to do to set this up.

744
01:05:45,000 --> 01:05:47,000
So there's typically, again, something you maybe

745
01:05:47,000 --> 01:05:49,000
want to use on the client in the server,

746
01:05:49,000 --> 01:05:50,000
you want to do this in the back end.

747
01:05:50,000 --> 01:05:53,000
But if you can pull this off, then you get a huge win.

748
01:05:53,000 --> 01:05:56,000
So it used to be you could only do this on a thinner band,

749
01:05:56,000 --> 01:05:59,000
which was sold by Melanox.

750
01:05:59,000 --> 01:06:03,000
I think the video bought Melanox recently, or at some point.

751
01:06:03,000 --> 01:06:06,000
The video is, you know, they have NVMe link as well,

752
01:06:06,000 --> 01:06:10,000
but like, and then Barraki is basically,

753
01:06:10,000 --> 01:06:14,000
Ardemy over, converged ethernet or something like that.

754
01:06:14,000 --> 01:06:16,000
This is more common now.

755
01:06:16,000 --> 01:06:19,000
So Ardemy is not used that often.

756
01:06:19,000 --> 01:06:21,000
Like the only system I know that does this,

757
01:06:21,000 --> 01:06:23,000
like the cell is used, Oracle for X-A-Data.

758
01:06:23,000 --> 01:06:25,000
Again, but that's like you buy the whole rack.

759
01:06:25,000 --> 01:06:28,000
You buy the rack of compute in the rack of storage,

760
01:06:28,000 --> 01:06:32,000
and they're using Ardemy to communicate with the compute in the storage.

761
01:06:32,000 --> 01:06:37,000
You can get Ardemy on Amazon, but like,

762
01:06:37,000 --> 01:06:40,000
you can't even only be able to do the communicate between your machines

763
01:06:40,000 --> 01:06:43,000
that have that, and it's a lot more work to get that set up.

764
01:06:43,000 --> 01:06:44,000
Yes.

765
01:06:44,000 --> 01:06:48,000
So how the source basically is that the client knows exactly what address,

766
01:06:48,000 --> 01:06:51,000
the state of storage on the server.

767
01:06:51,000 --> 01:06:52,000
Yes.

768
01:06:52,000 --> 01:06:54,000
It just says, give me two X-1, two, two, four.

769
01:06:54,000 --> 01:06:55,000
Yeah.

770
01:06:55,000 --> 01:06:56,000
So it's a statement as, and it's correct.

771
01:06:56,000 --> 01:06:59,000
Like the way this works is that the client,

772
01:06:59,000 --> 01:07:02,000
or it doesn't have to be again, the application could just be,

773
01:07:02,000 --> 01:07:04,000
the thing that's going to talk to you some of the machine,

774
01:07:04,000 --> 01:07:07,000
has to know what memory address it wants to read,

775
01:07:07,000 --> 01:07:10,000
assuming it has permissions, and then the request is,

776
01:07:10,000 --> 01:07:12,000
give me the contents of that memory.

777
01:07:12,000 --> 01:07:14,000
So the harbor knows how to go up to memory,

778
01:07:14,000 --> 01:07:16,000
get whatever you want, and pull it back down,

779
01:07:16,000 --> 01:07:18,000
and it doesn't notify the CPU that it's done that.

780
01:07:18,000 --> 01:07:19,000
Yes.

781
01:07:19,000 --> 01:07:21,000
Is there a security problem on the memory?

782
01:07:21,000 --> 01:07:23,000
The question is, is there a security problem for this?

783
01:07:23,000 --> 01:07:27,000
Sure, but like, you run this in your VPC,

784
01:07:27,000 --> 01:07:30,000
you're not letting, you're not letting, you don't expose this over,

785
01:07:30,000 --> 01:07:33,000
over the, the public internet.

786
01:07:33,000 --> 01:07:37,000
Again, if you're buying X-a-data, these things are like millions of dollars.

787
01:07:37,000 --> 01:07:40,000
You're running this on-prem, it's a locked cage.

788
01:07:40,000 --> 01:07:44,000
You know, the traffic is just between these two things.

789
01:07:44,000 --> 01:07:49,000
All right, so the last one is IOU ring,

790
01:07:49,000 --> 01:07:51,000
which I think some of you guys are familiar with.

791
01:07:51,000 --> 01:07:54,000
But this was an extension to, in Linux,

792
01:07:54,000 --> 01:07:59,000
to sort of clean up their asynchronous IO API,

793
01:07:59,000 --> 01:08:05,000
that allows you to, to, to do asynchronous requests to a harbor device,

794
01:08:05,000 --> 01:08:07,000
either storage or network.

795
01:08:07,000 --> 01:08:10,000
It was originally storage, and then they added networking two years ago.

796
01:08:10,000 --> 01:08:14,000
And basically, the idea is that you have these circular buffers,

797
01:08:14,000 --> 01:08:17,000
where you submit a request and say, I want this data from this,

798
01:08:17,000 --> 01:08:20,000
this storage device, or this, this harbor device,

799
01:08:20,000 --> 01:08:23,000
then you get like a callback, you provide it, say,

800
01:08:23,000 --> 01:08:26,000
okay, when it's available in my buffer, let me know.

801
01:08:26,000 --> 01:08:28,000
So you can make a bunch of these requests.

802
01:08:28,000 --> 01:08:32,000
I don't think it's, it's not entirely bypassing the kernel,

803
01:08:32,000 --> 01:08:35,000
it's just less, you're not paying the overhead on making the syscall,

804
01:08:35,000 --> 01:08:38,000
to, to, to, and block waiting for the, for the data.

805
01:08:38,000 --> 01:08:41,000
Right? So you make the request to do whatever it is,

806
01:08:41,000 --> 01:08:44,000
to read it right, and whatever the, the, on, on the memory that you provide,

807
01:08:44,000 --> 01:08:47,000
the, the OS, the OS does it for you in a kernel thread,

808
01:08:47,000 --> 01:08:51,000
and then once it completes the, the, the task you have to do,

809
01:08:51,000 --> 01:08:54,000
it puts the result in a queue, and then gives you, gives you a callback.

810
01:08:54,000 --> 01:09:00,000
Right? So again, these are, are the low-lane team way to avoid the overhead,

811
01:09:00,000 --> 01:09:03,000
or, or, or, of a full syscall, to talk to a harbor device,

812
01:09:03,000 --> 01:09:07,000
but you're still relying on the OS to do the low-level martian data in off the device.

813
01:09:07,000 --> 01:09:08,000
Yes?

814
01:09:08,000 --> 01:09:10,000
I thought you thought, but I thought those were called by,

815
01:09:10,000 --> 01:09:12,000
I thought you just checked the completion kit.

816
01:09:12,000 --> 01:09:13,000
The library, the library.

817
01:09:13,000 --> 01:09:14,000
Four different ways to do it.

818
01:09:14,000 --> 01:09:19,000
The library polling, like, you're checking, or, you can also lock if you want to,

819
01:09:19,000 --> 01:09:22,000
thinking, yeah, you don't have to have to put that.

820
01:09:22,000 --> 01:09:25,000
There's, there's much of these libraries,

821
01:09:25,000 --> 01:09:26,000
and you guys look them up for Rust.

822
01:09:26,000 --> 01:09:30,000
There's one in, uh, in Linux, or in C++,

823
01:09:30,000 --> 01:09:32,000
they, they provide different program APIs.

824
01:09:32,000 --> 01:09:34,000
I don't know which one's the most common.

825
01:09:34,000 --> 01:09:40,000
So, as far as I know, very few systems do this,

826
01:09:40,000 --> 01:09:41,000
although you guys are,

827
01:09:41,000 --> 01:09:45,000
Well, I knew, there's two more.

828
01:09:45,000 --> 01:09:46,000
Yeah.

829
01:09:46,000 --> 01:09:50,000
The first one is, is, uh, QuestDB.

830
01:09:50,000 --> 01:09:53,000
Uh, so they talk about in, with the 2022,

831
01:09:53,000 --> 01:09:56,000
how they, they added IU, IU-U ring.

832
01:09:56,000 --> 01:09:59,000
Um, and for this one, QuestDB is a Java,

833
01:09:59,000 --> 01:10:01,000
the top part of that is Java,

834
01:10:01,000 --> 01:10:03,000
and they use JNI to call it down C++ code.

835
01:10:03,000 --> 01:10:07,000
Um, Tiger Beetles, another one, um,

836
01:10:07,000 --> 01:10:09,000
and they're using IO ring,

837
01:10:09,000 --> 01:10:11,000
but this, this is for transactional stuff.

838
01:10:11,000 --> 01:10:13,000
This is actually written in Zig, um, not Rust.

839
01:10:13,000 --> 01:10:15,000
And so, I think there's some library in Zig

840
01:10:15,000 --> 01:10:17,000
that made this user from the do.

841
01:10:17,000 --> 01:10:20,000
Um, but, uh, it's in the student lab.

842
01:10:20,000 --> 01:10:21,000
Yeah.

843
01:10:21,000 --> 01:10:23,000
And we talked to somebody recently, or yesterday,

844
01:10:23,000 --> 01:10:26,000
who was like, uh, the implement of FastLanes in Zig,

845
01:10:26,000 --> 01:10:30,000
because the SIMD stuff was way better than, uh, then Rust.

846
01:10:30,000 --> 01:10:32,000
The interesting one though is Clickhouse.

847
01:10:32,000 --> 01:10:35,000
So, they came out with a blog article in 2021 about,

848
01:10:35,000 --> 01:10:37,000
hey, they're, they're adding IU ring, uh,

849
01:10:37,000 --> 01:10:39,000
in A-Circord IO to a Clickhouse.

850
01:10:39,000 --> 01:10:41,000
I think there is a, we had a guy give a talk,

851
01:10:41,000 --> 01:10:43,000
from, from the Postgres team,

852
01:10:43,000 --> 01:10:45,000
about adding IU ring to Postgres,

853
01:10:45,000 --> 01:10:47,000
but like, that's gonna be, I think, years away,

854
01:10:47,000 --> 01:10:50,000
because they're rewriting the whole store's layer in Postgres.

855
01:10:50,000 --> 01:10:51,000
And I think they're finally gonna get,

856
01:10:51,000 --> 01:10:53,000
get rid of the OS page gash, which is nice.

857
01:10:53,000 --> 01:10:55,000
But hey, so there's this blog article talks about, hey, look,

858
01:10:55,000 --> 01:10:56,000
here's what IU ring can do for us.

859
01:10:56,000 --> 01:10:58,000
Uh, it's gonna be a big win.

860
01:10:58,000 --> 01:10:59,000
He submitted the pull request.

861
01:10:59,000 --> 01:11:00,000
But then when you go look at the pull requests,

862
01:11:00,000 --> 01:11:02,000
loan behold, you come down here,

863
01:11:02,000 --> 01:11:04,000
and here's one, one of the original developers of, uh,

864
01:11:04,000 --> 01:11:06,000
of, uh, Clickhouse and, uh, in current CTO.

865
01:11:06,000 --> 01:11:08,000
He basically says like, yeah,

866
01:11:08,000 --> 01:11:11,000
they tried adding it, but it was marginal improvement,

867
01:11:11,000 --> 01:11:14,000
and, uh, it became an engineering nightmare.

868
01:11:14,000 --> 01:11:16,000
He says it became so complicated that even an experienced

869
01:11:16,000 --> 01:11:18,000
CTO engineer, the author of the code,

870
01:11:18,000 --> 01:11:20,000
cannot figure out why there are rare hangs of queries.

871
01:11:20,000 --> 01:11:22,000
Right, they found through their testing.

872
01:11:22,000 --> 01:11:25,000
So that was, so the blog article was 2021.

873
01:11:25,000 --> 01:11:28,000
This post is 2022, but then in the release of Postgres,

874
01:11:28,000 --> 01:11:33,000
of, of, of, of, of, of Clickhouse in February 2023,

875
01:11:33,000 --> 01:11:35,000
here's the same dude, giving a live stream,

876
01:11:35,000 --> 01:11:37,000
talking about how they've now added IU ring,

877
01:11:37,000 --> 01:11:39,000
so they did end up merging this code,

878
01:11:39,000 --> 01:11:41,000
and they're touting it how it's the,

879
01:11:41,000 --> 01:11:43,000
the magic pill to make IO less slow,

880
01:11:43,000 --> 01:11:45,000
right, in, in his webinar.

881
01:11:45,000 --> 01:11:48,000
But then you go look at the pull request again,

882
01:11:48,000 --> 01:11:50,000
and this is just a few weeks ago,

883
01:11:50,000 --> 01:11:52,000
uh, a few months ago,

884
01:11:52,000 --> 01:11:54,000
he's posting here, I didn't observe IOU ring to be much slower,

885
01:11:54,000 --> 01:11:56,000
but also I have no big expectations,

886
01:11:56,000 --> 01:11:58,000
because I wasn't able to find cases when it's faster,

887
01:11:58,000 --> 01:11:59,000
because he's responding to somebody up above

888
01:11:59,000 --> 01:12:01,000
that talks about how like,

889
01:12:01,000 --> 01:12:04,000
IOU ring when you enable that makes his queries run slow.

890
01:12:05,000 --> 01:12:09,000
So, uh, I think, huh?

891
01:12:09,000 --> 01:12:10,000
It's all in the way that the question is,

892
01:12:10,000 --> 01:12:11,000
yes, go ahead.

893
01:12:11,000 --> 01:12:12,000
All of these systems,

894
01:12:12,000 --> 01:12:13,000
none of them are like asynchronous,

895
01:12:13,000 --> 01:12:14,000
like they're all like,

896
01:12:14,000 --> 01:12:17,000
built like to be synchronous, like, blocking.

897
01:12:19,000 --> 01:12:20,000
Like, like, the,

898
01:12:20,000 --> 01:12:21,000
the rest of the framework is nice,

899
01:12:21,000 --> 01:12:25,000
like, the query execution code itself is blocking, yes.

900
01:12:25,000 --> 01:12:27,000
So it's like, how, how they ever get,

901
01:12:27,000 --> 01:12:28,000
I mean,

902
01:12:28,000 --> 01:12:29,000
before I said it,

903
01:12:29,000 --> 01:12:31,000
other than like, just batching the system.

904
01:12:31,000 --> 01:12:32,000
I, like, batching,

905
01:12:32,000 --> 01:12:34,000
and then, yeah, and then like,

906
01:12:34,000 --> 01:12:36,000
I need to read these 10 blocks,

907
01:12:36,000 --> 01:12:37,000
go batch bunch of stuff,

908
01:12:37,000 --> 01:12:38,000
go process someone that are available,

909
01:12:38,000 --> 01:12:39,000
and then in the background,

910
01:12:39,000 --> 01:12:40,000
you know, when it's available,

911
01:12:40,000 --> 01:12:41,000
I can process it.

912
01:12:41,000 --> 01:12:42,000
I think that,

913
01:12:42,000 --> 01:12:43,000
I think that,

914
01:12:43,000 --> 01:12:44,000
I think I was doing it.

915
01:12:44,000 --> 01:12:46,000
I don't know about QuestDB.

916
01:12:46,000 --> 01:12:48,000
QuestDB is like written by,

917
01:12:48,000 --> 01:12:50,000
uh, HFT guys that are London,

918
01:12:50,000 --> 01:12:51,000
and those dudes all sorts of,

919
01:12:51,000 --> 01:12:52,000
like, they know how to make Java,

920
01:12:52,000 --> 01:12:53,000
what really about,

921
01:12:53,000 --> 01:12:55,000
so I just, I don't know how they implement the virus.

922
01:12:58,000 --> 01:12:59,000
Inclodible,

923
01:12:59,000 --> 01:13:00,000
oh, they did it badly.

924
01:13:01,000 --> 01:13:03,000
They're using metamap,

925
01:13:03,000 --> 01:13:05,000
and then they switch to Iod here,

926
01:13:05,000 --> 01:13:06,000
and so, of course, they do that.

927
01:13:06,000 --> 01:13:07,000
Yes.

928
01:13:07,000 --> 01:13:08,000
So you, uh,

929
01:13:08,000 --> 01:13:09,000
so you,

930
01:13:09,000 --> 01:13:10,000
so you have a crappy MAP invitation,

931
01:13:10,000 --> 01:13:11,000
and then they're like,

932
01:13:11,000 --> 01:13:12,000
okay,

933
01:13:12,000 --> 01:13:13,000
it's basically like,

934
01:13:13,000 --> 01:13:14,000
if, like,

935
01:13:14,000 --> 01:13:15,000
if I chop my leg off,

936
01:13:15,000 --> 01:13:16,000
and I can barely walk,

937
01:13:16,000 --> 01:13:17,000
but I still have the leg back on,

938
01:13:17,000 --> 01:13:18,000
now I can walk.

939
01:13:18,000 --> 01:13:20,000
Like, it's, yeah, got it.

940
01:13:20,000 --> 01:13:21,000
Okay.

941
01:13:21,000 --> 01:13:23,000
All right, so I think,

942
01:13:23,000 --> 01:13:24,000
I, I don't want to comment,

943
01:13:24,000 --> 01:13:26,000
I think that Jury's still out.

944
01:13:26,000 --> 01:13:27,000
I think that,

945
01:13:27,000 --> 01:13:28,000
this is still pretty,

946
01:13:28,000 --> 01:13:29,000
bleeding edge,

947
01:13:29,000 --> 01:13:30,000
uh,

948
01:13:30,000 --> 01:13:32,000
but it's interesting when you guys come out.

949
01:13:32,000 --> 01:13:34,000
All right.

950
01:13:34,000 --> 01:13:36,000
So I'm going to quickly talk about two last things.

951
01:13:36,000 --> 01:13:37,000
Um,

952
01:13:37,000 --> 01:13:39,000
so these are all sort of user,

953
01:13:39,000 --> 01:13:41,000
sort of kernel bypass methods,

954
01:13:41,000 --> 01:13:42,000
um,

955
01:13:42,000 --> 01:13:44,000
but there's another alternative is,

956
01:13:44,000 --> 01:13:45,000
instead of trying to,

957
01:13:45,000 --> 01:13:47,000
avoid talking to the kernel,

958
01:13:47,000 --> 01:13:50,000
what if we put things in the kernel that we would want?

959
01:13:50,000 --> 01:13:51,000
Right?

960
01:13:51,000 --> 01:13:53,000
To avoid copying up into user space.

961
01:13:53,000 --> 01:13:54,000
So let's take a time,

962
01:13:54,000 --> 01:13:55,000
let me skip this.

963
01:13:55,000 --> 01:13:56,000
Um,

964
01:13:56,000 --> 01:13:58,000
so this, this is a technique called user bypass.

965
01:13:58,000 --> 01:13:59,000
Um,

966
01:13:59,000 --> 01:14:00,000
it's not a new idea,

967
01:14:00,000 --> 01:14:02,000
like people have done kernel modules and extendable,

968
01:14:02,000 --> 01:14:03,000
uh, uh,

969
01:14:03,000 --> 01:14:05,000
uh, OS kernels for, for decades.

970
01:14:05,000 --> 01:14:07,000
Um, what makes it different now is,

971
01:14:07,000 --> 01:14:08,000
we'll see in the next slide.

972
01:14:08,000 --> 01:14:10,000
But the idea here is that,

973
01:14:10,000 --> 01:14:12,000
instead of trying to get bypass,

974
01:14:12,000 --> 01:14:13,000
this part here,

975
01:14:13,000 --> 01:14:16,000
and pull a bunch of this logic up into the database system,

976
01:14:16,000 --> 01:14:18,000
what if we can put database system logic down in,

977
01:14:18,000 --> 01:14:19,000
in the, in the kernel,

978
01:14:19,000 --> 01:14:21,000
and so that when data comes in,

979
01:14:21,000 --> 01:14:23,000
we can process it or do whatever you want on it,

980
01:14:23,000 --> 01:14:24,000
it quickly is possible,

981
01:14:24,000 --> 01:14:25,000
without having to copy the user space,

982
01:14:25,000 --> 01:14:26,000
and then,

983
01:14:26,000 --> 01:14:27,000
if necessary,

984
01:14:27,000 --> 01:14:28,000
go back down to the Harvard

985
01:14:28,000 --> 01:14:30,000
to send things back immediately.

986
01:14:30,000 --> 01:14:33,000
So this makes sense when the,

987
01:14:33,000 --> 01:14:34,000
the data you're,

988
01:14:34,000 --> 01:14:35,000
that's,

989
01:14:35,000 --> 01:14:37,000
that's coming in with the network,

990
01:14:37,000 --> 01:14:38,000
or whatever it is,

991
01:14:38,000 --> 01:14:40,000
doesn't need to be retained for a long time,

992
01:14:40,000 --> 01:14:41,000
uh,

993
01:14:41,000 --> 01:14:43,000
like if, if it's a,

994
01:14:43,000 --> 01:14:45,000
if it's like a,

995
01:14:45,000 --> 01:14:46,000
say, a,

996
01:14:46,000 --> 01:14:47,000
a knowledge of message,

997
01:14:47,000 --> 01:14:49,000
and it's needed to keep track of that I got it,

998
01:14:49,000 --> 01:14:50,000
and then,

999
01:14:50,000 --> 01:14:51,000
I don't need to retain it,

1000
01:14:51,000 --> 01:14:52,000
then this,

1001
01:14:52,000 --> 01:14:53,000
this technique of,

1002
01:14:53,000 --> 01:14:54,000
potentially,

1003
01:14:54,000 --> 01:14:55,000
right?

1004
01:14:55,000 --> 01:14:56,000
So,

1005
01:14:56,000 --> 01:14:58,000
because you void all the overhead of copying buffers,

1006
01:14:58,000 --> 01:14:59,000
of sketching additional threads,

1007
01:14:59,000 --> 01:15:00,000
and making system calls,

1008
01:15:00,000 --> 01:15:02,000
because everything now is just running inside the kernel,

1009
01:15:02,000 --> 01:15:03,000
right?

1010
01:15:03,000 --> 01:15:05,000
Which is always going to be faster.

1011
01:15:05,000 --> 01:15:06,000
So,

1012
01:15:06,000 --> 01:15:07,000
as I said,

1013
01:15:07,000 --> 01:15:09,000
kernel modules are,

1014
01:15:09,000 --> 01:15:10,000
one way to do this,

1015
01:15:10,000 --> 01:15:11,000
but like,

1016
01:15:11,000 --> 01:15:12,000
if you've ever written a kernel module before,

1017
01:15:12,000 --> 01:15:13,000
you can ask you at GBT,

1018
01:15:13,000 --> 01:15:14,000
uh,

1019
01:15:14,000 --> 01:15:15,000
it's a pain in the ass,

1020
01:15:15,000 --> 01:15:16,000
it's super cumbersome,

1021
01:15:16,000 --> 01:15:17,000
if you crash,

1022
01:15:17,000 --> 01:15:18,000
what do you get?

1023
01:15:18,000 --> 01:15:19,000
Kernel panic,

1024
01:15:19,000 --> 01:15:20,000
you take everything down,

1025
01:15:20,000 --> 01:15:21,000
and then in some scenarios,

1026
01:15:21,000 --> 01:15:22,000
you can't even load kernel modules

1027
01:15:22,000 --> 01:15:23,000
for security reasons,

1028
01:15:23,000 --> 01:15:24,000
like the,

1029
01:15:24,000 --> 01:15:25,000
the horror won't let you,

1030
01:15:25,000 --> 01:15:26,000
you know,

1031
01:15:26,000 --> 01:15:28,000
and load a unsigned,

1032
01:15:28,000 --> 01:15:29,000
um, you know,

1033
01:15:29,000 --> 01:15:31,000
unsigned kernel module, right?

1034
01:15:31,000 --> 01:15:33,000
So, the thing that has changed,

1035
01:15:33,000 --> 01:15:35,000
where to make this actually viable now,

1036
01:15:35,000 --> 01:15:37,000
is something called ePBF.

1037
01:15:37,000 --> 01:15:38,000
At a curiosity,

1038
01:15:38,000 --> 01:15:39,000
here is sort of ePBF before,

1039
01:15:39,000 --> 01:15:40,000
while other than people

1040
01:15:40,000 --> 01:15:42,000
hang out in my student math, right?

1041
01:15:42,000 --> 01:15:43,000
So,

1042
01:15:43,000 --> 01:15:44,000
BBF is,

1043
01:15:44,000 --> 01:15:46,000
uh,

1044
01:15:46,000 --> 01:15:48,000
well, so what BBF knows what ePBF is?

1045
01:15:48,000 --> 01:15:50,000
BBF extends to the Berkeley packet filters,

1046
01:15:50,000 --> 01:15:51,000
so this is like,

1047
01:15:51,000 --> 01:15:53,000
in the early 90s,

1048
01:15:53,000 --> 01:15:54,000
they had, uh,

1049
01:15:54,000 --> 01:15:55,000
it was made for BSD,

1050
01:15:55,000 --> 01:15:57,000
they mentioned made it Linux,

1051
01:15:57,000 --> 01:15:58,000
but it was, um,

1052
01:15:58,000 --> 01:16:00,000
it was a way to specify, like,

1053
01:16:00,000 --> 01:16:01,000
packet forwarding rules,

1054
01:16:01,000 --> 01:16:03,000
uh, and filter rules,

1055
01:16:03,000 --> 01:16:04,000
like through a DSL,

1056
01:16:04,000 --> 01:16:06,000
you then load into, uh,

1057
01:16:06,000 --> 01:16:08,000
to the kernel, right?

1058
01:16:08,000 --> 01:16:09,000
And so,

1059
01:16:09,000 --> 01:16:11,000
ePBF,

1060
01:16:11,000 --> 01:16:12,000
not really about packet filter anymore,

1061
01:16:12,000 --> 01:16:14,000
but it's basically a way to take, uh,

1062
01:16:14,000 --> 01:16:16,000
write safe code,

1063
01:16:16,000 --> 01:16:18,000
uh, that then gets verified,

1064
01:16:18,000 --> 01:16:19,000
and then load that dynamically,

1065
01:16:19,000 --> 01:16:21,000
as a, as if it was a kernel module,

1066
01:16:21,000 --> 01:16:22,000
on the fly.

1067
01:16:22,000 --> 01:16:24,000
And the reason why I'm saying that,

1068
01:16:24,000 --> 01:16:25,000
it's sort of safe is that they,

1069
01:16:25,000 --> 01:16:26,000
they give you a limited API,

1070
01:16:26,000 --> 01:16:28,000
which are allowed to actually do,

1071
01:16:28,000 --> 01:16:29,000
in these kernel module programs,

1072
01:16:29,000 --> 01:16:30,000
that you're running, right?

1073
01:16:30,000 --> 01:16:31,000
So, you can't call MATLAQ,

1074
01:16:31,000 --> 01:16:33,000
you can't, you know,

1075
01:16:33,000 --> 01:16:35,000
you can't sit in an info loop forever, right?

1076
01:16:35,000 --> 01:16:36,000
Because they're ideally,

1077
01:16:36,000 --> 01:16:37,000
they're trying to avoid you from,

1078
01:16:37,000 --> 01:16:39,000
you know, taking down the kernel,

1079
01:16:39,000 --> 01:16:40,000
and breaking everything.

1080
01:16:40,000 --> 01:16:41,000
So, you write your code,

1081
01:16:41,000 --> 01:16:42,000
your BBF program,

1082
01:16:42,000 --> 01:16:43,000
in C code,

1083
01:16:43,000 --> 01:16:44,000
you run it through their compiler,

1084
01:16:44,000 --> 01:16:45,000
the generation's bytecode,

1085
01:16:45,000 --> 01:16:46,000
that then runs through a verifier,

1086
01:16:46,000 --> 01:16:48,000
it literally does basically,

1087
01:16:48,000 --> 01:16:49,000
branch expansion,

1088
01:16:49,000 --> 01:16:50,000
it figures out all the different possible paths,

1089
01:16:50,000 --> 01:16:51,000
you could go down in your code,

1090
01:16:51,000 --> 01:16:53,000
and counts the number of instructions,

1091
01:16:53,000 --> 01:16:54,000
that you would execute,

1092
01:16:54,000 --> 01:16:55,000
and then throws an error,

1093
01:16:55,000 --> 01:16:56,000
and throws back,

1094
01:16:56,000 --> 01:16:57,000
uh, and rejects it,

1095
01:16:57,000 --> 01:16:59,000
if you, if you have too many,

1096
01:16:59,000 --> 01:17:00,000
uh, too many instructions.

1097
01:17:00,000 --> 01:17:01,000
Right?

1098
01:17:01,000 --> 01:17:02,000
So, this is,

1099
01:17:02,000 --> 01:17:03,000
this is a wild thing,

1100
01:17:03,000 --> 01:17:04,000
because again,

1101
01:17:04,000 --> 01:17:06,000
this basically allows you to extend Linux,

1102
01:17:06,000 --> 01:17:08,000
without having to recapile Linux.

1103
01:17:08,000 --> 01:17:09,000
So, so,

1104
01:17:09,000 --> 01:17:10,000
this is heavily used,

1105
01:17:10,000 --> 01:17:12,000
like, Netflix for like observability,

1106
01:17:12,000 --> 01:17:13,000
to be able to, you know,

1107
01:17:13,000 --> 01:17:15,000
get metrics about what processes are running,

1108
01:17:15,000 --> 01:17:17,000
and get the data out.

1109
01:17:18,000 --> 01:17:19,000
But as, as the,

1110
01:17:19,000 --> 01:17:21,000
you know, since Matt's been working on it here,

1111
01:17:21,000 --> 01:17:22,000
the API is expanding,

1112
01:17:22,000 --> 01:17:23,000
so there's a lot more things

1113
01:17:23,000 --> 01:17:24,000
you can start doing now,

1114
01:17:24,000 --> 01:17:26,000
you can basically run the entire database system,

1115
01:17:26,000 --> 01:17:27,000
down in your,

1116
01:17:27,000 --> 01:17:28,000
in your kernel.

1117
01:17:28,000 --> 01:17:29,000
Whether or not,

1118
01:17:29,000 --> 01:17:30,000
that's a good idea or not,

1119
01:17:30,000 --> 01:17:31,000
that's what his,

1120
01:17:31,000 --> 01:17:32,000
his reach is just going to figure out,

1121
01:17:32,000 --> 01:17:33,000
but,

1122
01:17:33,000 --> 01:17:34,000
there are,

1123
01:17:34,000 --> 01:17:35,000
the idea is that,

1124
01:17:35,000 --> 01:17:36,000
can we start thinking about what part of the database is,

1125
01:17:36,000 --> 01:17:37,000
and that we're spending a lot of time on,

1126
01:17:37,000 --> 01:17:38,000
moving the data back and forth,

1127
01:17:38,000 --> 01:17:39,000
between the OS,

1128
01:17:39,000 --> 01:17:40,000
the hardware,

1129
01:17:40,000 --> 01:17:41,000
and the,

1130
01:17:41,000 --> 01:17:42,000
and the database system,

1131
01:17:42,000 --> 01:17:44,000
what can we start pushing down?

1132
01:17:45,000 --> 01:17:46,000
So, I'm going to show one graph

1133
01:17:46,000 --> 01:17:47,000
from his paper,

1134
01:17:47,000 --> 01:17:49,000
where he was re-implementing,

1135
01:17:49,000 --> 01:17:52,000
Postgres Wire Protocol Proxy.

1136
01:17:52,000 --> 01:17:54,000
So, the thing that a proxy was sitting in front of Postgres,

1137
01:17:54,000 --> 01:17:56,000
the client connects to it,

1138
01:17:56,000 --> 01:17:59,000
and the proxy maintains available connections

1139
01:17:59,000 --> 01:18:00,000
to the database system,

1140
01:18:00,000 --> 01:18:01,000
and just forward your packets along that.

1141
01:18:01,000 --> 01:18:03,000
So, in this scenario here,

1142
01:18:03,000 --> 01:18:05,000
packet shows up to send a query request,

1143
01:18:05,000 --> 01:18:07,000
and then the proxy just looks at it,

1144
01:18:07,000 --> 01:18:08,000
says, oh,

1145
01:18:08,000 --> 01:18:09,000
he needs to go to the server in this sense,

1146
01:18:09,000 --> 01:18:10,000
that's all it's really doing.

1147
01:18:10,000 --> 01:18:11,000
It's not, you know,

1148
01:18:11,000 --> 01:18:12,000
it's not doing any computation on it.

1149
01:18:12,000 --> 01:18:14,000
So, we're comparing its PG Bouncer,

1150
01:18:14,000 --> 01:18:16,000
which is the most common,

1151
01:18:16,000 --> 01:18:18,000
most common proxiedmitation used for Postgres.

1152
01:18:18,000 --> 01:18:20,000
Odyssey is out of the Andex,

1153
01:18:20,000 --> 01:18:21,000
and this is like doing,

1154
01:18:21,000 --> 01:18:23,000
runs in user space,

1155
01:18:23,000 --> 01:18:24,000
but they're using, like,

1156
01:18:24,000 --> 01:18:26,000
handwritten code routines,

1157
01:18:26,000 --> 01:18:27,000
written in assembly,

1158
01:18:27,000 --> 01:18:29,000
where the assembly overwrites the stacks

1159
01:18:29,000 --> 01:18:31,000
of other threads to put inject,

1160
01:18:31,000 --> 01:18:33,000
like, what the next thread to run,

1161
01:18:33,000 --> 01:18:34,000
is very impressive,

1162
01:18:34,000 --> 01:18:35,000
it's very complicated.

1163
01:18:35,000 --> 01:18:37,000
And then,

1164
01:18:37,000 --> 01:18:38,000
ours is based on,

1165
01:18:38,000 --> 01:18:40,000
it's a fork of PG Bouncer,

1166
01:18:40,000 --> 01:18:42,000
where all of the authentication stuff

1167
01:18:42,000 --> 01:18:43,000
happens up in the user space,

1168
01:18:44,000 --> 01:18:45,000
like, you know,

1169
01:18:45,000 --> 01:18:46,000
SSL, setup, and things like that,

1170
01:18:46,000 --> 01:18:47,000
all that,

1171
01:18:47,000 --> 01:18:48,000
or user password stuff,

1172
01:18:48,000 --> 01:18:49,000
all happens up there,

1173
01:18:49,000 --> 01:18:50,000
but then when packets show up,

1174
01:18:50,000 --> 01:18:51,000
just afford them,

1175
01:18:51,000 --> 01:18:52,000
all that's done down,

1176
01:18:52,000 --> 01:18:53,000
done down,

1177
01:18:53,000 --> 01:18:54,000
EPPF.

1178
01:18:54,000 --> 01:18:55,000
And so, the main takeaway here,

1179
01:18:55,000 --> 01:18:57,000
is if you run on a really small machine,

1180
01:18:57,000 --> 01:18:59,000
you're getting pretty significant

1181
01:18:59,000 --> 01:19:00,000
performance equipment,

1182
01:19:00,000 --> 01:19:01,000
because you're not paying the penalty

1183
01:19:01,000 --> 01:19:02,000
of copying things back and forth

1184
01:19:02,000 --> 01:19:03,000
between the kernel.

1185
01:19:03,000 --> 01:19:04,000
So,

1186
01:19:04,000 --> 01:19:06,000
I'm not saying BPPF can be solved

1187
01:19:06,000 --> 01:19:07,000
for all the things that we talked about today,

1188
01:19:07,000 --> 01:19:08,000
but I think this is,

1189
01:19:08,000 --> 01:19:09,000
this is,

1190
01:19:09,000 --> 01:19:10,000
this is going to be a better solution

1191
01:19:10,000 --> 01:19:12,000
than something like DPDK.

1192
01:19:13,000 --> 01:19:15,000
And potentially IOU ring for some things,

1193
01:19:15,000 --> 01:19:16,000
but not everything.

1194
01:19:18,000 --> 01:19:19,000
All right.

1195
01:19:19,000 --> 01:19:21,000
We got one minute left,

1196
01:19:21,000 --> 01:19:22,000
so let me just bang through this real cool key.

1197
01:19:22,000 --> 01:19:23,000
So,

1198
01:19:23,000 --> 01:19:25,000
soon we do all the amazations

1199
01:19:25,000 --> 01:19:26,000
to get things out of the server,

1200
01:19:26,000 --> 01:19:27,000
back to the client,

1201
01:19:27,000 --> 01:19:29,000
clients got to do something with it,

1202
01:19:29,000 --> 01:19:31,000
put it into the form that the application needs.

1203
01:19:31,000 --> 01:19:32,000
And as I said,

1204
01:19:32,000 --> 01:19:33,000
if it's JDBC.

1205
01:19:33,000 --> 01:19:34,000
What we see,

1206
01:19:34,000 --> 01:19:35,000
like, that's copying things

1207
01:19:35,000 --> 01:19:36,000
as a row into format,

1208
01:19:36,000 --> 01:19:37,000
that's, you know,

1209
01:19:37,000 --> 01:19:39,000
the overhead is not going to be that significant,

1210
01:19:39,000 --> 01:19:40,000
but if it's the scenario where

1211
01:19:41,000 --> 01:19:43,000
it's a data scientist trying to get things out of

1212
01:19:43,000 --> 01:19:44,000
the data system

1213
01:19:44,000 --> 01:19:46,000
and put it into pandas,

1214
01:19:46,000 --> 01:19:48,000
then that's going to be sloped.

1215
01:19:48,000 --> 01:19:49,000
So, this here,

1216
01:19:49,000 --> 01:19:52,000
this is an experiment they did where they took pandas,

1217
01:19:52,000 --> 01:19:55,000
ran a SQL query through pandas SQL API,

1218
01:19:55,000 --> 01:19:57,000
and went to post with my SQL,

1219
01:19:57,000 --> 01:19:58,000
got data back,

1220
01:19:58,000 --> 01:19:59,000
and then converted it into a data frame.

1221
01:19:59,000 --> 01:20:02,000
Data frame is like the table of traction in pandas

1222
01:20:02,000 --> 01:20:04,000
and a bunch of other Python systems.

1223
01:20:04,000 --> 01:20:06,000
So, in this case here,

1224
01:20:06,000 --> 01:20:07,000
the chart showing that

1225
01:20:07,000 --> 01:20:09,000
the query part is not that simple,

1226
01:20:09,000 --> 01:20:10,000
it's not that,

1227
01:20:10,000 --> 01:20:11,000
it's not, it's not,

1228
01:20:11,000 --> 01:20:12,000
it's not, it's not, it's not,

1229
01:20:12,000 --> 01:20:13,000
it's not taken a long time,

1230
01:20:13,000 --> 01:20:15,000
relative to all the cost of actually copying the data

1231
01:20:15,000 --> 01:20:16,000
off the bits we got

1232
01:20:16,000 --> 01:20:18,000
from the server

1233
01:20:18,000 --> 01:20:20,000
and converting it into the data frame.

1234
01:20:20,000 --> 01:20:21,000
Again,

1235
01:20:21,000 --> 01:20:22,000
JDBC and Aero solve this problem

1236
01:20:22,000 --> 01:20:23,000
because if your,

1237
01:20:23,000 --> 01:20:25,000
if your Python code can interact

1238
01:20:25,000 --> 01:20:27,000
natively operate on AeroData,

1239
01:20:27,000 --> 01:20:29,000
then you don't have to do this conversion.

1240
01:20:29,000 --> 01:20:30,000
But if your system doesn't support

1241
01:20:30,000 --> 01:20:32,000
the JDBC, like my SQL Postgres,

1242
01:20:32,000 --> 01:20:34,000
then you have to pay this penalty.

1243
01:20:34,000 --> 01:20:36,000
So, the just what they're doing

1244
01:20:36,000 --> 01:20:38,000
is that they have this thing called Connector X,

1245
01:20:39,000 --> 01:20:41,000
it is using folders

1246
01:20:41,000 --> 01:20:42,000
and a couple other systems,

1247
01:20:42,000 --> 01:20:44,000
I think as well, like moden.

1248
01:20:44,000 --> 01:20:47,000
And basically, your SQL query shows up

1249
01:20:47,000 --> 01:20:48,000
that you write in Python,

1250
01:20:48,000 --> 01:20:50,000
they, you then also provide some information

1251
01:20:50,000 --> 01:20:52,000
about how to split that query up into,

1252
01:20:52,000 --> 01:20:53,000
to sub queries,

1253
01:20:53,000 --> 01:20:54,000
or partition queries,

1254
01:20:54,000 --> 01:20:56,000
like range partitioning.

1255
01:20:56,000 --> 01:20:58,000
And then you send out multiple queries

1256
01:20:58,000 --> 01:20:59,000
at the same time from different threads

1257
01:20:59,000 --> 01:21:01,000
that are going to get a portion of the data

1258
01:21:01,000 --> 01:21:02,000
that you would want

1259
01:21:02,000 --> 01:21:04,000
to put into your Python program.

1260
01:21:04,000 --> 01:21:05,000
And then each thread then

1261
01:21:05,000 --> 01:21:07,000
going to populate the data frame

1262
01:21:07,000 --> 01:21:09,000
at different chunks.

1263
01:21:09,000 --> 01:21:10,000
So instead of taking one SQL query,

1264
01:21:10,000 --> 01:21:12,000
get back a giant result,

1265
01:21:12,000 --> 01:21:14,000
and then one thread populates the table,

1266
01:21:14,000 --> 01:21:15,000
they take one SQL query,

1267
01:21:15,000 --> 01:21:17,000
rewrite it by adding like additional expressions

1268
01:21:17,000 --> 01:21:18,000
in the where clause,

1269
01:21:18,000 --> 01:21:20,000
then send that out in parallel,

1270
01:21:20,000 --> 01:21:21,000
get back multiple results,

1271
01:21:21,000 --> 01:21:23,000
and then the threads put it together.

1272
01:21:23,000 --> 01:21:24,000
I just want to bring this up,

1273
01:21:24,000 --> 01:21:25,000
because it's an alternative

1274
01:21:25,000 --> 01:21:26,000
if you don't have ADBC,

1275
01:21:26,000 --> 01:21:28,000
that this is another portion to do this.

1276
01:21:28,000 --> 01:21:29,000
All right, well, well over time,

1277
01:21:29,000 --> 01:21:30,000
so I apologize.

1278
01:21:30,000 --> 01:21:31,000
All right, so,

1279
01:21:31,000 --> 01:21:33,000
that we can protocol matters a lot.

1280
01:21:33,000 --> 01:21:35,000
Criminal bypass can make a big difference,

1281
01:21:35,000 --> 01:21:36,000
but it's a pain to ask to use.

1282
01:21:36,000 --> 01:21:38,000
I think EPF is going to be the,

1283
01:21:38,000 --> 01:21:40,000
something that's going to get it

1284
01:21:40,000 --> 01:21:42,000
more up to in the next 10 years or so.

1285
01:21:42,000 --> 01:21:45,000
Okay, as EPF gets more expressive.

1286
01:21:45,000 --> 01:21:49,000
Okay, so next class will be on query optimization,

1287
01:21:49,000 --> 01:21:51,000
and we'll have three lectures on that,

1288
01:21:51,000 --> 01:21:52,000
and that'll be again,

1289
01:21:52,000 --> 01:21:54,000
the core material we need to understand

1290
01:21:54,000 --> 01:21:56,000
before we start looking at other real-world invitations.

1291
01:21:56,000 --> 01:22:00,000
And I know I haven't posted the updated reading list,

1292
01:22:00,000 --> 01:22:01,000
because I don't know what paper to read

1293
01:22:01,000 --> 01:22:02,000
for the first class,

1294
01:22:02,000 --> 01:22:04,000
because like, there really isn't a good one.

1295
01:22:04,000 --> 01:22:06,000
But we'll figure something out.

1296
01:22:06,000 --> 01:22:08,000
But I'll be the read list tonight.

1297
01:22:08,000 --> 01:22:09,000
Okay?

1298
01:22:09,000 --> 01:22:10,000
Any questions?

1299
01:22:10,000 --> 01:22:11,000
Take out, you know,

1300
01:22:11,000 --> 01:22:12,000
I'm ready to hide it.

1301
01:22:12,000 --> 01:22:13,000
You've got a belt to get the 40-ounce box.

1302
01:22:13,000 --> 01:22:14,000
Get a grip, take a sip,

1303
01:22:14,000 --> 01:22:15,000
and you'll be picking up bottles.

1304
01:22:15,000 --> 01:22:17,000
Ain't no puzzle, I'm just a person more man.

1305
01:22:17,000 --> 01:22:18,000
I'm down in the 40,

1306
01:22:18,000 --> 01:22:20,000
and I'm a 40, got four cans.

1307
01:22:20,000 --> 01:22:22,000
Stack six packs on a table.

1308
01:22:22,000 --> 01:22:24,000
And I'm able to see St. Aslan label.

1309
01:22:24,000 --> 01:22:26,000
No short, put the fuck you know what I got them.

1310
01:22:26,000 --> 01:22:27,000
I take off the cap,

1311
01:22:27,000 --> 01:22:28,000
my first attempt.

1312
01:22:28,000 --> 01:22:29,000
On the bottle.

1313
01:22:29,000 --> 01:22:30,000
Don't buy three in the freezer,

1314
01:22:30,000 --> 01:22:31,000
so I can kill it.

1315
01:22:31,000 --> 01:22:32,000
Careful with the bottle, baby.

1316
01:22:32,000 --> 01:22:33,000
I'm just throwing a pill.

1317
01:22:33,000 --> 01:22:34,000
Cause they knives and say the pain I've wet.

1318
01:22:34,000 --> 01:22:35,000
You drink it down with the gauze,

1319
01:22:35,000 --> 01:22:36,000
little byt of tape.

1320
01:22:36,000 --> 01:22:37,000
Take back the pack of drugs.

1321
01:22:37,000 --> 01:22:38,000
You gon' get your soul saved now

1322
01:22:38,000 --> 01:22:39,000
for drinking to the drugs.

1323
01:22:39,000 --> 01:22:40,000
Billy Dan's a chili tea,

1324
01:22:40,000 --> 01:22:41,000
so tell me to be with us.

1325
01:22:41,000 --> 01:22:42,000
Be a man to get a can of tape, huh?

1326
01:22:43,000 --> 01:22:44,000
You gon' get your soul saved now

1327
01:22:44,000 --> 01:22:45,000
for drinking to the drugs.

1328
01:22:45,000 --> 01:22:47,000
Billy Dan's a chili tea,

1329
01:22:47,000 --> 01:22:48,000
so tell me to be with us.

1330
01:22:48,000 --> 01:22:49,000
Be a man to get a can of tape, huh?

1331
01:22:49,000 --> 01:22:51,000
You gon' get your soul saved now

