---
title: CMU15721 P12S202411 User DefinedFunctionOptimizationsCMUAdvancedDatabaseSystems
---

1
00:00:00,000 --> 00:00:06,000
Canneke-Melen University's advanced database systems courses

2
00:00:06,000 --> 00:00:09,000
filming front of the live studio audience?

3
00:00:09,000 --> 00:00:11,000
I don't know why I don't want that in the club.

4
00:00:11,000 --> 00:00:13,000
I don't want that in the club.

5
00:00:13,000 --> 00:00:14,000
I don't want that in the club.

6
00:00:14,000 --> 00:00:15,000
Nobody knows.

7
00:00:15,000 --> 00:00:16,000
Money is just there.

8
00:00:16,000 --> 00:00:20,000
OK, so today's class is a little bit different than what we talked about

9
00:00:20,000 --> 00:00:23,000
throughout the semester because so far we've most been discussing about

10
00:00:23,000 --> 00:00:25,000
OK, here's the internals of a database system

11
00:00:25,000 --> 00:00:31,000
at the lowest levels and how to make queries run faster.

12
00:00:31,000 --> 00:00:37,000
And so today's me a different topic where we're going to be further up

13
00:00:37,000 --> 00:00:39,000
the stack now in the system.

14
00:00:39,000 --> 00:00:43,000
We're going to do a bunch of tricks up in the, before we even get to the query optimizer,

15
00:00:43,000 --> 00:00:47,000
when the SQL query shows up, and how to make a query runs faster,

16
00:00:47,000 --> 00:00:50,000
given the architecture we design below.

17
00:00:50,000 --> 00:00:53,000
And so this will then be from this point going into the semester,

18
00:00:53,000 --> 00:00:56,000
like for this lecture, a next lecture will be about getting things in and out

19
00:00:56,000 --> 00:00:58,000
of the database quickly.

20
00:00:58,000 --> 00:01:01,000
And the next week will spend a lot more time on the query optimizer.

21
00:01:01,000 --> 00:01:04,000
And I know I need to update, finally, post the papers we're reading next week,

22
00:01:04,000 --> 00:01:07,000
but I'll take care of that today or tomorrow.

23
00:01:07,000 --> 00:01:09,000
So this can remind her before the break.

24
00:01:09,000 --> 00:01:12,000
We spent two lectures discussing join algorithms.

25
00:01:12,000 --> 00:01:16,000
And we discussed how to do parallel hash joins because I said that's what,

26
00:01:16,000 --> 00:01:19,000
you know, every database system needs to do it with hash joins.

27
00:01:19,000 --> 00:01:22,000
Right, if you're relational, it's pretty SQL, you need joins.

28
00:01:22,000 --> 00:01:24,000
And hash joins always is going to be the fastest.

29
00:01:24,000 --> 00:01:27,000
And then we spent a whole lecture talking about worst case optimal joins.

30
00:01:27,000 --> 00:01:31,000
And although very, very few systems do this now,

31
00:01:31,000 --> 00:01:35,000
this is something they're all going to need to sport within the next decade,

32
00:01:35,000 --> 00:01:40,000
as people start doing more graph-like things on their databases.

33
00:01:40,000 --> 00:01:46,000
All right, so today's lecture, again, we're really focusing on how to embed more complicated things

34
00:01:46,000 --> 00:01:50,000
inside of a database system to execute queries.

35
00:01:50,000 --> 00:01:55,000
Now, loosely categorize these as embedded database logic.

36
00:01:55,000 --> 00:02:01,000
And so we made the assumption that the scenario that we're supporting in our conceptual database system

37
00:02:01,000 --> 00:02:07,000
is that there is an application or some tool that the user is using.

38
00:02:07,000 --> 00:02:10,000
And they're interacting with the application,

39
00:02:10,000 --> 00:02:13,000
they're either typing all SQL queries in or they're using a dashboard.

40
00:02:13,000 --> 00:02:18,000
And then the application is sending over SQL queries that we then compute in their entirety

41
00:02:18,000 --> 00:02:20,000
and then send back the result.

42
00:02:20,000 --> 00:02:26,000
And so the scope of what that query, those queries, can execute or operate on,

43
00:02:26,000 --> 00:02:33,000
the computation they can perform on our data is limited to whatever the database system itself actually supports.

44
00:02:33,000 --> 00:02:37,000
And so in some cases, very common, especially in the Python Pandas world,

45
00:02:37,000 --> 00:02:42,000
you'll see people just do select star queries to get all the data out of the data system,

46
00:02:42,000 --> 00:02:45,000
then bring it into your Jupyter Notebook or Pandas, whatever you want,

47
00:02:45,000 --> 00:02:50,000
then do some additional computation on it and then push the result back to the database server.

48
00:02:50,000 --> 00:02:54,000
And so if we can avoid that, some cases we can, some cases we cannot.

49
00:02:54,000 --> 00:03:00,000
If we can avoid that, then obviously the database system will have a complete view of what you're trying to do in your query on your data

50
00:03:00,000 --> 00:03:05,000
and it can optimize accordingly, assuming you have some of the techniques that we'll talk about today.

51
00:03:05,000 --> 00:03:09,000
But it's always going to be a better position to, you know,

52
00:03:09,000 --> 00:03:14,000
it's always better to operate on the data where it resides rather than then always having to bring it out to an external application.

53
00:03:15,000 --> 00:03:18,000
So this is what we end up by embedding the database logic.

54
00:03:18,000 --> 00:03:20,000
So the benefits are kind of obvious, right?

55
00:03:20,000 --> 00:03:26,000
Fear network around trips, as I said, like if I can just do one query, have all the computation I need for whatever the result I'm looking for,

56
00:03:26,000 --> 00:03:30,000
the met single query request, then that's fantastic, rather than having to go back and forth.

57
00:03:31,000 --> 00:03:38,000
Obviously, if now, if, you know, if I'm incorporating changes, this maybe not so much matters in the lake house world,

58
00:03:39,000 --> 00:03:46,000
we're talking about, but like rather than me having sort of a stale snapshot of my data that I'm processing locally,

59
00:03:46,000 --> 00:03:52,000
if I'm going to push all my computation to the database server, then as new things arrive, new data arrives, then I'll see those updates immediately.

60
00:03:53,000 --> 00:04:00,000
And we're not going to have transactions, but think, you know, if you, if you're in a transaction word, if I call it begin, run a query,

61
00:04:00,000 --> 00:04:04,000
get back result, do some processing on the application side, the database server is holding locks.

62
00:04:05,000 --> 00:04:11,000
While I'm doing that computation, so if I can push all my computation to the database server, then I don't have to go to those, go to those around trips.

63
00:04:11,000 --> 00:04:22,000
This one is, is debatable whether like you, you're not, you're not allowed your developers to be, to not have to implement functionality by using a better database logic.

64
00:04:22,000 --> 00:04:32,000
And I say it's debatable because oftentimes in the, in sort of large corporations or enterprises, the people that write the application build that software,

65
00:04:33,000 --> 00:04:41,000
aren't the same people managing the database servers. So the application developers might be on one sort of engineering cycle, but the database, database developers are usually very conservative.

66
00:04:41,000 --> 00:04:51,000
And you may say, hey, here's my new, my new user defined function, UDF, or service teacher, but the DBA is like, well, I got a vet this, it's going to take a couple weeks for this to actually happens.

67
00:04:51,000 --> 00:04:56,000
So you end up having developers just re-evolving the same thing, just in different code bases.

68
00:04:57,000 --> 00:05:06,000
We certainly saw that in the case of the, the Velox paper, right, they talked about how there's 11 implementations of substring in all of Facebook.

69
00:05:06,000 --> 00:05:14,000
And then this last one again, this is, this is a compass is all of this, but now we're going to be able to extend the function out of the data system to go beyond what the built in capabilities is.

70
00:05:14,000 --> 00:05:25,000
And this last one here is what the, one of the original motivations of user defined types, the user defined functions, that Stoenberger likes to talk about, like when he was building, when he built, they built ingress, they started giving,

71
00:05:25,000 --> 00:05:35,000
trying to start selling it to a bunch of banks, but all the banks were computing interest for accounts on the Julling calendar, whereas, you know, the rest of the world is running the Gagorean calendar.

72
00:05:35,000 --> 00:05:38,000
So in ingress at the time, they didn't have a Julling date type.

73
00:05:38,000 --> 00:05:42,000
So that meant the developers had to go modify the data system to add this new date type.

74
00:05:42,000 --> 00:05:52,000
But if you can, all of them support, you define types, you define functions and other things, then the developers can extend the system without having to recompile the binary.

75
00:05:52,000 --> 00:05:57,000
So the type on, there's different categories of types of embedded database logic.

76
00:05:57,000 --> 00:06:01,000
The most common two are going to be user defined functions and store procedures.

77
00:06:01,000 --> 00:06:09,000
There are conceptually the same thing, like it's a function of some kind of procedural code in, that you can run in your database server.

78
00:06:09,000 --> 00:06:15,000
The, the difference is that in a sort of procedure, you don't need to, you don't, you can invoke it outside of a SQL query.

79
00:06:15,000 --> 00:06:21,000
Like I can call execute and then the name of the function and I'll just run it like an RPC call.

80
00:06:21,000 --> 00:06:27,000
Whereas in the EDF, it has to be embedded inside of a, inside of a, you know, select statement or a SQL query.

81
00:06:27,000 --> 00:06:33,000
In some systems like SQL server, they make the distinction that user defined functions cannot update tables.

82
00:06:33,000 --> 00:06:35,000
Like you can't call insert update delete in the EDF.

83
00:06:35,000 --> 00:06:37,000
Periscuss doesn't let you do that.

84
00:06:37,000 --> 00:06:42,000
Whereas an instructor, a seizure and SQL server, you can only, that's where you can call update queries.

85
00:06:42,000 --> 00:06:49,000
Right, so again, a bunch of these should be mostly from very with, but the one we're going to care about today is user defined functions.

86
00:06:49,000 --> 00:06:58,000
And this survey comes from the, a follow up paper from the four paper you guys read, where they actually did a survey of real customer databases and Azure.

87
00:06:58,000 --> 00:07:02,000
And it is, it is counted, you know, what, what a real EDF and store procedures look like.

88
00:07:02,000 --> 00:07:07,000
And that's where they came up with this pie chart like this.

89
00:07:07,000 --> 00:07:11,000
All right, so user defined function, this can, this should be review for everyone here.

90
00:07:11,000 --> 00:07:21,000
Your defined function is basically, it's going to be a function that's rewritten by the application developer that allows us to extend the functionality of the database system beyond its built in operations, built in functions.

91
00:07:21,000 --> 00:07:30,000
Right, so the SQL standard specifies there's a substring function and every system that, you know, most support SQL standard is going to have their own implementation of it.

92
00:07:30,000 --> 00:07:43,000
But if I have some weird, weird wonky substring version that I want to use for whatever reason, right, it's not realistic for me to assume that my database server is going to have that, but I can write it as a user defined function that have the exact capabilities that I want.

93
00:07:43,000 --> 00:07:46,000
And then I can put my application technically anywhere.

94
00:07:46,000 --> 00:07:53,000
A lot of times when you see people that have like migration services, well, like, I'm running an Oracle and I want to switch to Postgres.

95
00:07:53,000 --> 00:08:05,000
I'm running a terror data when I switch to Postgres or something, they'll take whatever the custom functions you're using from the different prepared, prepared database servers and they'll re implement them as user defined functions to ensure compatibility.

96
00:08:05,000 --> 00:08:17,000
All right, so the function is pretty straightforward, right, you're taking some input arguments, always as scalers, you can perform some kind of computation on it and then you can return result either as a scalar or a table.

97
00:08:17,000 --> 00:08:30,000
For our purposes here, we're going to assume that the UDFs are not pure functions, another neighbor, but basically you can't, they're not going to call it outside things.

98
00:08:30,000 --> 00:08:34,000
In some database servers, you can actually make RPC calls to remote services.

99
00:08:34,000 --> 00:08:42,000
To keep things simple today, we're going to assume that everything is going to run inside of the function itself and doesn't escape.

100
00:08:42,000 --> 00:08:46,000
Although we can call one function can call other functions.

101
00:08:46,000 --> 00:08:50,000
All right, so again, conceptually looks like this. This is our application.

102
00:08:50,000 --> 00:08:59,000
We want to execute some SQL that has some kind of program logic, where conditional clauses, whatever, calling whatever libraries at once, execute more SQL and then some program logic and so forth.

103
00:08:59,000 --> 00:09:08,000
So what would happen is that if we can take maybe these two portions here and then embed them as functions inside the database server,

104
00:09:08,000 --> 00:09:13,000
then now we can rewrite our application just to invoke the queries and the functions like this.

105
00:09:13,000 --> 00:09:22,000
Then now there isn't this back and forth, where maybe pulling a bunch of data, processing it, and then passing it on the next query, so forth, I could keep everything always on the server side.

106
00:09:22,000 --> 00:09:29,000
And obviously for some things, like if we call machine learning libraries, like PyTorch, this doesn't quite make sense.

107
00:09:29,000 --> 00:09:44,000
To express everything as a UDF in the native language of the database server, there are tools, there are extensions to Postgres and other systems where you can make calls into PyTorch.

108
00:09:44,000 --> 00:09:50,000
They basically have UDF wrappers for that. Like I said, we're going to ignore that for today.

109
00:09:50,000 --> 00:09:58,000
So today we're talking about the background of the challenges of the UDFs. Then we'll talk about three techniques to optimize them.

110
00:09:58,000 --> 00:10:09,000
The first one is going to be the inlining approach from Microsoft that you guys read. Then there'll be a follow-up work from other sets of Germans to convert UDFs into common table expressions or CTEs with lateral joins.

111
00:10:09,000 --> 00:10:16,000
And then we'll finish off with bashing and some numbers about which systems can support these various techniques.

112
00:10:16,000 --> 00:10:27,000
All right, so I've already said this. Use the function basically is going to be, you know, take some input, do some processing, compute the output.

113
00:10:27,000 --> 00:10:41,000
But there's, there's broadly two categories of UDFs that we're going to care about. The first of these SQL functions where the inside of the function is literally just going to be queries, one after another, separate by sending columns.

114
00:10:41,000 --> 00:10:51,000
And then the output of whatever this, the function will be when you invoke it, whatever the output of the last query is. Right.

115
00:10:51,000 --> 00:11:05,000
And so, here's input arguments, you know, take integers. There is this return argument which defines which can return. So in this case, we're going to return a, a, a, a, the two pulls from the table that have the same scheme as the table foo.

116
00:11:05,000 --> 00:11:17,000
And then we have our computation, the function body down here. So for this example here, I can either invoke it in the, as a, as a query without a from clause or embedded inside the from clause stuff.

117
00:11:17,000 --> 00:11:23,000
Or some of the cases I can put in the where clause, you can put these function calls calls anywhere.

118
00:11:23,000 --> 00:11:44,000
So this is not that interesting from our perspective today because we can make more of this cheap. This is like a macro. So like in this, in this case here, you know, the calling get food inside the select query, I can, the Davies over literally would take all the SQL queries inside the function body and just embed it injected inside of this thing instead of an nested query.

119
00:11:45,000 --> 00:12:05,000
Right. And then at that point, they optimize the nose nose nose when it's operating on because it's dealing with SQL queries. I can do whatever once. Now you see why SQL server doesn't allow you to do update queries because I update queries inside of this thing that can certainly change the order which I actually thinks and if it's a select query with updates inside of it, then things get weird.

120
00:12:06,000 --> 00:12:18,000
The types of you that we're going to care about today are going to be ones that are written in a external programming language. So the SQL standard specifies something called SQL PSM as persistence store modules.

121
00:12:18,000 --> 00:12:21,000
And that goes back to like the night. Yes, question.

122
00:12:21,000 --> 00:12:31,000
So, like, when updates are permitted in the sequential SQL bucket, yes, does the media must be forced like strict ordering on the answer to?

123
00:12:31,000 --> 00:12:38,000
It's question is whether the data system enforce strict ordering when you update queries. I think yes, like a literally blind leads copy it in. Yes.

124
00:12:39,000 --> 00:12:46,000
I actually don't know what postgres does you have updated in there? Well, they'll just blindly copy it in. It's almost like a view.

125
00:12:47,000 --> 00:12:55,000
In that case, there's rewrite it was on postgres. They literally drop it in but they have a big query. I don't know what they do. But yeah, you wouldn't keep the order incorrect.

126
00:12:55,000 --> 00:13:06,000
All right. Again, so the SQL standard specifies the thing called SQL PSM. And as all cases in SQL, there's a standard. But nobody exactly follows it. Everyone's going to do slightly slightly different.

127
00:13:07,000 --> 00:13:24,000
But at a high level, they're all going to look the same. All these the built in or the standard programming language for UDS is going to look very similar to Ada because the story goes the guy that invented store or UDS to serve as teachers was really into Ada.

128
00:13:24,000 --> 00:13:36,000
If you've never heard Ada, it's like a modern variant at Pascal. Right. It's an older language in the 70s or so. But that's why you have the clear declarative variables in the beginning. It's all very archaic.

129
00:13:36,000 --> 00:13:47,000
But so the SQL standard specifies SQL PSM. All of course got their own PL SQL postgres has their their their own dialect of PL SQL called PL PG SQL.

130
00:13:47,000 --> 00:13:57,000
It has some postgres idioms in there. DB2 has had their own UDF language. But now I think you can stall SQL PL modules that look like the Oracle one.

131
00:13:57,000 --> 00:14:04,000
And then one more time. Most of the time talking about today is this thing called transact SQL from originally from Sybase.

132
00:14:04,000 --> 00:14:16,000
Again, it's going to look a lot like the SQL PL SQL or SQL PSM in the SQL standard. There's those at signs are going to use everywhere to declare variables. Right. Where is the SQL PL SQL doesn't have that.

133
00:14:16,000 --> 00:14:28,000
So again, for more circle circle background, Sybase came first. Sybase was at 1980s. I think they were the first I think they were one of the first things to support UDS.

134
00:14:28,000 --> 00:14:38,000
Ingress had UDTs in the 70s. But Sybase had had UDS. Microsoft bought a license to the source code of Sybase in the early 90s.

135
00:14:38,000 --> 00:14:47,000
Deported to Windows NT to competing as IBM. And then since then they've they've had they forked the hard fork of the source code.

136
00:14:47,000 --> 00:14:56,000
SQL Server has basically been rewritten. Sybase is still around. There's still making a lot of money. But like no news chart. I'm going to use Sybase. It's used a lot of the banks.

137
00:14:56,000 --> 00:15:02,000
But for historical reasons because Sybase had transact SQL, that's why SQL Server has transact SQL.

138
00:15:02,000 --> 00:15:10,000
There's other programming language you can get like in Postgres you can get like you can get tickle, you can get Python, you can get Pearl, you get PGS and any arbitrary language.

139
00:15:10,000 --> 00:15:23,000
If you're crazy you can get you can get you write UDS in C, which is a bad idea, right? Because if you're operating the data system because now you're linking in a shared object in C, which can touch anything in your dress space.

140
00:15:23,000 --> 00:15:33,000
And for security reasons it's a nightmare and obviously for stability reasons it's a nightmare. So in some cases like in Oracle for example, you can write UDS in C.

141
00:15:33,000 --> 00:15:44,000
But then again they transpile them to Postgres C, which is their dialect. And then they run you as a separate process. So if you crash you take down the UDF and not the whole system.

142
00:15:44,000 --> 00:15:52,000
So this is an example here of what a PL SQL look like or sorry a UDF written in in this case here is transact SQL.

143
00:15:52,000 --> 00:16:03,000
So this is a really simple UDF where we're going to take a customer ID and a customer key. And then we're going to discount the number orders that they pay for over the lifetime of being a customer.

144
00:16:03,000 --> 00:16:10,000
And then depending whether they spend a certain amount of money they'll get a platinum level or they're like a regular customer.

145
00:16:11,000 --> 00:16:27,000
And so in this case here we're invoking the UDF inside of the projection output of the select statement. So you sort of think of this as like a for loop iterating every single customer and then they're going to vote this customer level function by passing in that customer key.

146
00:16:27,000 --> 00:16:39,000
And again in this because it's based on Adal Pascal we declare our variables in the beginning and then the at sign tells us that it's transact SQL.

147
00:16:39,000 --> 00:16:54,000
So a lot of these already said right UDF so great because they're going to allow us to to break up complex logic in our application into separate functions and potentially allow different parts of the code in our application be able to reuse that those capabilities.

148
00:16:54,000 --> 00:17:04,000
Some scenarios also too some you see applications written in different languages like there's the mobile app and then there's the the the web server app.

149
00:17:04,000 --> 00:17:16,000
In that case they're usually always talking to a student application server but in some cases you can go directly to the server and now set up having to re implement logic in the different program languages and if they're all UDFs and you can just reuse that.

150
00:17:16,000 --> 00:17:31,000
We've already talked about reducing network round trips and then for some things where you just can be very helpful is that you'll be easier to write some complex logic in UDS versus like SQL.

151
00:17:31,000 --> 00:17:34,000
So data analysis stuff is very common with this.

152
00:17:34,000 --> 00:17:50,000
All right so this all sounds great. Why aren't UDS maybe more common then? Well the number one problem that we're going to face is that the query optimizers if the UDF is written in an external programming language like PL SQL or PLBG SQL doesn't know what's inside of that function.

153
00:17:50,000 --> 00:18:08,000
Again SQL is declarative so it's the SQL query itself is specifying here's the answer I want. Now the data system optimizer can reason about the expressions the operators within that query plan to make estimations on selectivities of these different computational steps in the query plan.

154
00:18:08,000 --> 00:18:37,000
But now if I had this function that I'm calling in some language that isn't SQL what is the cost of things right so if I have like my workles where value equals my UDF123 will say UDF123 this my UDF is written in C right even PL you know PL SQL do I know what the selectivity of what you know what whether we'll pretend that I'm going to imagine this you don't because you don't know what's inside of the function.

155
00:18:37,000 --> 00:19:06,000
So that's going to be the number one number one we're going to face. The other challenges is going to be that we're going to be hard for us to paralyze our UDS and take advantage of the vectorized query processing model or even running the query across multiple threads because again we don't know what's inside of the function right it may just be like we may is doing an implicit nested loop nested loop.

156
00:19:06,000 --> 00:19:19,000
And that's a nested loop join because the outer queries invoking the function once per tuple inside of that now I'm just doing another look up inside of that function to another table it's basically doing a join.

157
00:19:19,000 --> 00:19:32,000
And because there's a separation between the SQL side and the UDS side the optimizer can't have a holistic view of the entire query itself and you know do all the optimizations we knew how to do about switching the hash joins and so forth.

158
00:19:33,000 --> 00:19:56,000
Well the things get really nasty but fortunately they're not that common is that some UDS actually will construct a string inside of the UDS like they're incrementally built up a select statement and then invoke it you're allowed to do that in PL SQL being like declare string select like what's the condition I'm adding a pending literary sequel to it and then I execute it.

159
00:19:56,000 --> 00:20:04,000
In that case you have no idea what you possibly could possibly do it because you don't know what the SQL query is going to be into actually run the function to your screw.

160
00:20:04,000 --> 00:20:13,000
And for this one here no one's going to solve this again we did a survey where we scraped GitHub and we try to see how common this was it's less than 5% it's not that common.

161
00:20:13,000 --> 00:20:22,000
At least again that's for a static evaluation of just looking at the UDS we don't have numbers say how often they're invoked but we don't think they're very common.

162
00:20:23,000 --> 00:20:48,000
So the related to what I was saying before about this parallelization stuff so if you can't figure out what's inside the UDS and now you're just going to be looping over the outer table or the calling SQL query and for every single two point inside the outer query you're invoking the function you're literally calling the UDS one at a time right for every single record.

163
00:20:48,000 --> 00:20:53,000
So in the Microsoft world they call this row by agonizing row bar bar.

164
00:20:53,000 --> 00:21:10,000
And as I said if you don't inside of UDS you're invoking other queries that you can't see to actually run it then the atmosphere has no way to be able to say oh these are just a join let me let me combine these together or I'm executing the same query over again let me cash it and leave it over you.

165
00:21:11,000 --> 00:21:38,000
Right so the so this is sort of been well known for a while that UDS are bad all right they're going to make your queries on slower so there's this sort of semi-famous blog article from 2006 where they're very very blunt and say T SQL that's transact SQL scale of functions are evil in SQL server and they give a bunch of examples that site a bunch of the problems that I just talked about right.

166
00:21:38,000 --> 00:21:49,000
So here's one query that takes you know 2,000 2,600 milliseconds so that's 2.6 seconds but then if you add the UDS it goes to 38 seconds right just by adding a UDS.

167
00:21:49,000 --> 00:21:59,000
So so they the sort of the developers and DBAs of SQL server and other other systems right this is not just a SQL server problem the all every system has this problem.

168
00:21:59,000 --> 00:22:17,000
You know this is sort of a month for a while and then Microsoft actually just came out and said it themselves in 2008 so few years after this one so this is an updated article where they introduced a new way to do compiled UDS but in here they basically use the term like oh yeah R bar the row by exiting row that's going to make your queries go slow.

169
00:22:17,000 --> 00:22:29,000
So I think SQL and carnit or something or evil incarnate like evil personified they're very blunt so Microsoft is trying to solve this problem for a while.

170
00:22:29,000 --> 00:22:44,000
So again this is like what I'm telling you is not like any big secret people have known this for a long time and like UDS are so important and make developers lives like easier than we want to figure out a way to try to optimize them.

171
00:22:45,000 --> 00:23:13,000
So here's another example from Microsoft this is from the the fluid paper this is from TPCH query 12 and they basically took the where clause that is just checking to see the customer key is null or and they just they made a UDF that just does a look up on the customer table and to see whether returns back a valid customer key right so this is like contrived example because you're taking the original TPCH query that didn't have this UDF and you're adding this one piece here.

172
00:23:14,000 --> 00:23:27,000
And so without this UDF the query is going to take 0.8 seconds so 800 milliseconds but if you add in just this UDF which is really not doing that much then it goes to 13 hours.

173
00:23:28,000 --> 00:23:56,000
Right because again the database server doesn't know that for this I'm working as function and I'm just checking to see what the output is null what's the customer key right I'm doing look on the customer table here no it's the customer key from the order table it's not going to be null right but because it doesn't know what the computation is inside of this thing the optimizer just gives his hands you know throws up his hands says okay well I probably need to I'm just going to execute this for every single row.

174
00:23:56,000 --> 00:24:19,000
And then now you get the overhead of you know that's pretty significant. So we'll see Freud in a second Freud is going to be able to take this in line and back into this function and get this query back down to 900 milliseconds so not exactly as it was without the you know without introducing the not exactly what it was before you added this piece here but certainly not the 13 hours that they're getting before yes.

175
00:24:26,000 --> 00:24:44,000
Yes same as this example here is a SQL DF but I don't think that this example here I don't think because I'm declaring variables and I'm a return clause this is not considered a SQL UDF a SQL UDF you don't have variables returns it's just the SQL queries in by themselves.

176
00:24:45,000 --> 00:24:58,000
So in that case yes if I got rid of the declare got rid of their term just got rid of this assignment to the variable and if it was just this then that would get in line and the optimizer could figure that out.

177
00:24:59,000 --> 00:25:25,000
Okay so how are we not going to optimize this well there's basically there's four basic approaches compilation we've talked about before right we can just take our interpreted you know take our UDF we normally interpret it we could compile it into native code and that'll run faster doesn't solve our optimizer problem because now we have all the function now compiled is me much faster it's you know it's it's still going to be a black box to the query optimizer.

178
00:25:26,000 --> 00:25:31,000
I said Oracle does this and SQL server already does this now I mean it did it since 2016.

179
00:25:32,000 --> 00:25:45,000
Another approach is to extend the the probing language for the UDF to introduce pragmas or directives or other hints to the database server that could tell it what portions the query could be optimized.

180
00:25:46,000 --> 00:26:06,000
So SQL store or sorry SQL single store has has their own variant of the PL SQL called came out when they were called mems equals was called MPL mems SQL programming language but they have a parallel version where you can write UDFs and you can use them and that's additionally hints to the optimizer figure how to parallel stuff.

181
00:26:06,000 --> 00:26:10,000
But again as far as I know for that programming language the optimizer still sees a black box with the UDF.

182
00:26:12,000 --> 00:26:27,000
Inlining the person that we're going to talk about today is how to convert the UDF into some kind of declarative form that is that we can natively embed into our query plan as if it was just much SQL queries and then let the optimizer optimize that accordingly.

183
00:26:28,000 --> 00:26:45,000
And then the last one is a is actually predates inlining but it was rediscovered by us and other Germans a few years ago you basically take the UDF and you convert it into a bunch of SQL queries that run in batch or multiple tools at a time.

184
00:26:46,000 --> 00:26:54,000
And then now you don't have the invocation cost of invoking this single function and you're sort of operating things all together again I'll show examples of that as we go along.

185
00:26:54,000 --> 00:27:01,000
So today's class we're going to focus on these two because again this is quite different than everything we've talked about so far.

186
00:27:02,000 --> 00:27:03,000
Okay.

187
00:27:04,000 --> 00:27:12,000
So you definitely inlining again the idea here from Freud again we'll use the term Freud described because that's what it's called in the paper.

188
00:27:12,000 --> 00:27:20,000
I think in the obviously in the when you pay for SQL server down the SQL server it's not called Freud if you look for Freud in the documentation you're not going to see it.

189
00:27:20,000 --> 00:27:27,000
I think they call it the UDF inlining but again the research name of the project was Freud.

190
00:27:27,000 --> 00:27:41,000
So the idea is that we're going to take our UDS and we're going to convert them to relational algebra expressions that we can then inline into the SQL queries themselves and we're going to do this before we get to the actually cost based search for the joins or in other parts of the query optimizer.

191
00:27:41,000 --> 00:27:58,000
So you can think of the static transformation rules that we can do this conversion transformation of the UDF into relational algebra without needing a cost model because we'll just let the query optimizer handle as if it was any other query.

192
00:27:59,000 --> 00:28:10,000
So as I said we're going to do this before we get to the cost based optimizer because our cost based optimizer in theory in theory level cover this later.

193
00:28:10,000 --> 00:28:17,000
So you should be able to handle the sub queries effectively. SQL server is not going to be able to do that.

194
00:28:17,000 --> 00:28:28,000
The hyper umbra germans can do this. Dr. B can do this because we did a forum. We'll cover that in a second.

195
00:28:28,000 --> 00:28:35,000
Let's talk about these other queries again. I'm not going to say how to do it exactly the German way to do it.

196
00:28:35,000 --> 00:28:55,000
But this is going to be the challenge. This is what the inlining approaches are going to leverage because they're going to assume that the optimizer will be able to take care of these these these that's the sub queries and then we're going to introduce lateral joins because that's how we're going to change these things together to ensure that things execute in order that need to execute in UDF.

197
00:28:55,000 --> 00:29:08,000
But again things will fall apart if it gets too complicated. So again sub queries basic idea this is just a refresher from the interclass that we just have a nested query like a select query inside of that there's another select query.

198
00:29:08,000 --> 00:29:15,000
It can be anywhere. It can be the projection output can be the from clause, me the where clause can be having like group by anywhere you want.

199
00:29:16,000 --> 00:29:40,000
And so the two ways to handle them is to rewrite the query to decorate a flatten them to joins. And this will be the best case scenario. This is what you always want to do, but not not everyone can or you just pull out the nested query. Run it once, put its results to a temp table and then join that temp table against the the calling table or the calling query.

200
00:29:41,000 --> 00:29:56,000
And some systems do this. I think if I have my where clause I have something that wants to aggregate like the max value of a column. I can run that once we sterilize that as a the temp table and then just join against it later on.

201
00:29:56,000 --> 00:30:08,000
And people you have to do this when you don't we can't support DAGs in your query plan. Again we'll cover how to do this all more thoroughly next week in the and we'll talk with crew opposition for the Germans.

202
00:30:08,000 --> 00:30:18,000
Question sorry. All right, so rewriting is a table before we take this guy. This is some query and we have inside of our where clause we have nested query.

203
00:30:18,000 --> 00:30:27,000
And then we can pull this out and basically do a join and we see that we're doing a join on the order table with the user table.

204
00:30:27,000 --> 00:30:37,000
And this guy this person here we would recognize that there's a we know the relationship between the order table and the user table and we realize, oh, we don't even need to access the user table because everything we need is in the order table itself.

205
00:30:37,000 --> 00:30:47,000
So in this case here is the best case scenario that we went from a nested query. Instead of having to invoke this nested query for every single row, every single record on the order table, we can just remove the accessing the order table entirely.

206
00:30:47,000 --> 00:30:52,000
So the user table entirely. And that'll be a big win.

207
00:30:53,000 --> 00:31:00,000
All right, so the other thing we're going to rely on in addition to nest queries is through lateral joins. I think we covered that also in interclass as well. I think the first homework required it.

208
00:31:00,000 --> 00:31:17,000
And the idea here a lateral joint is that it's going to allow a sub query in our from clause to reference a values or attributes in other nested queries at the same sort of nesting level.

209
00:31:18,000 --> 00:31:29,000
Again, you can't do this in joins, right? Typically if you have a sub query join a sub query, those two sub queries can't can't peek into each each other and see what they're actually what they have.

210
00:31:29,000 --> 00:31:36,000
A lateral joint allows you to do that. And this is how going to be able to guarantee that again will execute the queries in the order that they're specified in the EDF.

211
00:31:37,000 --> 00:31:46,000
So this thing of that is like a much like sort of sort of for loops where for each each clause in the lateral join, I'm iterating over every single tuple.

212
00:31:46,000 --> 00:31:54,000
And if necessary, I can then invoke and look to lookups on the the previous join or the previous table.

213
00:31:54,000 --> 00:32:00,000
So look at example like this. So here I'm just fine that I have an inner inner join with a lateral.

214
00:32:01,000 --> 00:32:08,000
And then inside of this nested query here, you can see that I'm allowed to reference the the select query up here.

215
00:32:08,000 --> 00:32:14,000
I can reference like the the order user ID and other things up up in here.

216
00:32:14,000 --> 00:32:20,000
Right? So this reference here, oh, I U.S.D. is this one up here and this first order is this one up there.

217
00:32:21,000 --> 00:32:29,000
And again, the query optimizer just knows that okay, the binder needs to figure out, okay, I'm referencing these things here.

218
00:32:29,000 --> 00:32:34,000
And a lateral joint allows me to get a peak up to the one above me and be able to see what they have.

219
00:32:34,000 --> 00:32:40,000
This example is a bit abstract when we walk through the UDF, I think it'll make more sense.

220
00:32:40,000 --> 00:32:43,000
All right, let's go through the five steps of fluid.

221
00:32:44,000 --> 00:32:51,000
So the very first thing we did do is take our UDF and we're going to transform the T-seq statements or PLC statements, whatever is written in into SQL queries.

222
00:32:51,000 --> 00:33:02,000
And for everything that's in the SQL standard, some exceptions are like you can't use exceptions, you can't use other constructs.

223
00:33:02,000 --> 00:33:10,000
In case of Freud, they're not able to have how wild loops or conditional loops, but if calls and other things, you've been convert all those things into the corresponding SQL queries.

224
00:33:11,000 --> 00:33:14,000
Then we're going to break our UDF up into regions.

225
00:33:14,000 --> 00:33:19,000
It allows a reason about their contents and understand the dependencies between those regions.

226
00:33:19,000 --> 00:33:23,000
Because their dependencies are then going to express through these lateral joints.

227
00:33:23,000 --> 00:33:37,000
Then we're going to go and merge the expressions based on trying to combine the multiple expressions within one region and then we're going to link them together with lateral joints.

228
00:33:38,000 --> 00:33:51,000
And then we take our UDF that we put together through lateral joints, or take our SQL query that we generated with all the lateral joints, and then embed that now to the calling query, the thing that was invoking the UDF, so we're doing it at runtime.

229
00:33:51,000 --> 00:33:54,000
And then we run this now through our query optimizer.

230
00:33:54,000 --> 00:34:02,000
So in all my examples here, I'm going to show it through SQL statements, or like the conversions will be from the UDF statements into SQL.

231
00:34:03,000 --> 00:34:08,000
As I said, in Freud, there are going to be based on relational algebra, but the upflow approach will see afterwards.

232
00:34:08,000 --> 00:34:11,000
They're going to do everything at the SQL level.

233
00:34:13,000 --> 00:34:24,000
So this is that example we have in the beginning where given some custom ID, we're going to look up and say, how much money they spent with us and then what customer status are we going to give them.

234
00:34:24,000 --> 00:34:34,000
So again, the first step is we're just trying to transform the contents of the UDF, the literally the lines of code with semicolons into corresponding SQL queries.

235
00:34:34,000 --> 00:34:39,000
So in the case, the first case here, we're declaring a variable called level, and we'll set it the value to regular.

236
00:34:39,000 --> 00:34:49,000
Well, that's just a select query without a from clause where we pass the constant string regular and assign it to an attribute called level.

237
00:34:50,000 --> 00:34:52,000
Nothing special there.

238
00:34:52,000 --> 00:35:03,000
In this case here, the next query, we're taking, we're taking the, the, the aggregation on the order table and we'll assign it to the, to the, the total variable.

239
00:35:03,000 --> 00:35:12,000
That's the same thing as just taking the nested, the query in here, just nest again inside of a select query, and then just assigning the, re naming the output to be total.

240
00:35:12,000 --> 00:35:17,000
Then that assigns it to the variable total.

241
00:35:17,000 --> 00:35:22,000
And the last one here, SQL itself does not have if clauses, it has case wins.

242
00:35:22,000 --> 00:35:27,000
I think my SQL might break that, my SQL might have if statements, but case wins in the SQL standard.

243
00:35:27,000 --> 00:35:34,000
So I can convert this if clause into a case when, you know, in total is greater than million, then to get platinum.

244
00:35:34,000 --> 00:35:41,000
Otherwise, we set the, the output to null, and again, then we assign that to the level variable.

245
00:35:41,000 --> 00:35:42,000
Yes.

246
00:35:43,000 --> 00:35:49,000
It's question should be lateral doing all these. Yes, we're not there yet. Two more steps.

247
00:35:49,000 --> 00:36:00,000
Right. So this part seems pretty simple, right? Like I can, I can, I can conceptually see how I can map things like, oh, a variable name of that's just an attribute name in my projection output, my select, select statement.

248
00:36:00,000 --> 00:36:08,000
So in this example here, it's, it's basically one to one mapping between like a statement in the UDF to a SQL query.

249
00:36:08,000 --> 00:36:20,000
It doesn't have to be that way. It can be multiple statements could get combined into a single SQL query, or you could have one SQL statement, sorry, one UDF statement, get, you know, split out across multiple SQL queries.

250
00:36:20,000 --> 00:36:26,000
For our purposes here to keep it simple, it's, we're just assuming one to one.

251
00:36:26,000 --> 00:36:46,000
All right. So next thing is now we want to take this UDF and break it up into regions, right? And then for each region, we're going to do the transformation I just showed where we're converting the statement inside the, the statements inside of that UDF, or that the statements inside that portion of the UDF region into corresponding SQL queries.

252
00:36:46,000 --> 00:36:56,000
So in this case here, I declare two variables total and, and level, and then I have this necessary query here where I signed the output of the aggregation to the total variable.

253
00:36:56,000 --> 00:37:12,000
Well, that's the same thing as in my, I joined a SQL query where first I, I assigned level, the level variable to null, and then I have this, this, this necessary here where I'm going to compute the aggregation, and then I signed that to total.

254
00:37:12,000 --> 00:37:20,000
And then now for this region, I'm going to assign the output of this nested portion of the query to this temp table called ER1, right?

255
00:37:20,000 --> 00:37:29,000
It's an ephemeral temp table in theory should, should reside entirely in memory, right? It's not persistent catalog. It disappears once the query is over.

256
00:37:29,000 --> 00:37:34,000
So I can assign it into this. It's like a table A L this in a query.

257
00:37:34,000 --> 00:37:48,000
Do the same thing with this next, the next region here, right? Convert this into this case when statement, and then do the same thing and then sign the output into, into this temp table ER2.

258
00:37:48,000 --> 00:37:59,000
But notice here now that my, I had this variable total that I'm now referencing in, in the region above me, right?

259
00:38:00,000 --> 00:38:06,000
So that's where the, this is where the lateral join is going to help us because I have basically now two, two, two nested queries, two, two separate queries here.

260
00:38:06,000 --> 00:38:14,000
But one of them needs to reference the other one has a dependency going up. So the lateral joins is how we're going to connect them together.

261
00:38:14,000 --> 00:38:28,000
Same thing, same thing for level here. And then I have this, this next piece here, again, the, the else clause, and it's just the inverse of that where, where, if the total is less than a million, less than equal to million, than I, than my status is regular.

262
00:38:28,000 --> 00:38:38,000
Right? Same thing, total can reference the one up there, and then level, this level here is actually referencing what was passed before us, in that one.

263
00:38:39,000 --> 00:38:49,000
Are we done at this point? What's the last one? Return, exactly, yes. So how are we going to handle that?

264
00:38:50,000 --> 00:38:51,000
Well, what's that?

265
00:38:51,000 --> 00:39:00,000
Finger, he's a slick level, yes. It's just another slick, another nested query. So we can take all these now regions, we can turn to SQL statements, and we put them all together into one giant SQL query now.

266
00:39:00,000 --> 00:39:12,000
Right? And so, yes, I know I just talked about lateral joins in the SQL standard, in the SQL standard, it's not lateral join, the SQL standard is apply or cross apply, SQL server uses cross apply,

267
00:39:12,000 --> 00:39:34,000
and SQL light and Oracle, they all use lateral join, they're basically the same thing. Right? So, as she said, like, the last step was to do the, the return clause, but again, that's just a return, sorry, that's just the output of the select statement above that wraps all this together.

268
00:39:35,000 --> 00:39:44,000
And again, in this case here, at the very top, I'm referencing ER3, and that's generated down here for this nested query here, and they're linked together through the lateral joints.

269
00:39:48,000 --> 00:39:49,000
Yes.

270
00:39:49,000 --> 00:39:51,000
Why is the else block a different region?

271
00:39:51,000 --> 00:39:57,000
This question is, why is the else block a different region, because I think basically I suppose goes like, in theory, it should just be this, right?

272
00:39:58,000 --> 00:40:06,000
Because in this, they're trying to be pedantic in this example, like showing you the different regions, but also too, you could have going back to the original UDF, right?

273
00:40:06,000 --> 00:40:15,000
You could have arbitrary things inside of this, right? That you could then not, you couldn't be able to express through a, through the case one exactly.

274
00:40:15,000 --> 00:40:25,000
But yes, in that, in this case here, I think there's being overly rebose, because they're also, they're going to say later on, once I get it to this form, to my query optimizer,

275
00:40:26,000 --> 00:40:38,000
the query optimizer can figure out, oh, this is referencing this, and here's this case statement, and here's this case statement, well, they're just, you know, they're disjoint regions, I could just merge these together.

276
00:40:38,000 --> 00:40:42,000
Because the optimizer already knows how to do that for where it causes anyway.

277
00:40:42,000 --> 00:40:45,000
But they just sent it like this.

278
00:40:45,000 --> 00:40:48,000
Other questions?

279
00:40:49,000 --> 00:40:58,000
I have you guys read this paper, we'll see the, the app felt paper in a second. This one I feel like I can understand, right? Because it's transforming SQL, that's all fine and any.

280
00:40:58,000 --> 00:41:09,000
The, the alpha one is being, we're complicated because this is basically converted to IR, IR that's used in compilers, and that, and PL stuff, which is not my area.

281
00:41:10,000 --> 00:41:32,000
Okay, so now we want to actually inline the expression, so this is the original calling query, they call this UDF, right? So when, when this thing shows up, we then just wrap this, this customer level invocation, that just basically gets replaced with the entire, you know, this entire block here, which is the, the converter form of the UDF, yes.

282
00:41:33,000 --> 00:41:46,000
I don't know why you would ever do this, but it goes to the previous example and in the hit condition, right? If you actually go to the DC pool, right? So instead of having that else that, I should say we remove the ads, we say we always set levels right.

283
00:41:46,000 --> 00:42:00,000
Of course, you would never do that in terms of, as long as people do stupid things. So yeah, so how would that work? Because you would not know which levels you're up to, right? Because there's a year to level and there's a year, three levels.

284
00:42:01,000 --> 00:42:06,000
So you're saying, so if I give it this, this else calls, and it's just, yes.

285
00:42:09,000 --> 00:42:15,000
Yes. Then you said, yes. And then you set it to level, equal regular, always.

286
00:42:15,000 --> 00:42:24,000
No, no, so in that, oh, so you should be given to the else and just had this be without it. And so it's a no matter what, you just overwrite it.

287
00:42:30,000 --> 00:42:47,000
So it would be this. It would just take set level equals regular and I would generate this regular as level. So then now in here, from my third region here, I would have that select regular as level and then as ER3.

288
00:42:48,000 --> 00:42:51,000
So no matter what happens here, then it just gets overwritten.

289
00:42:52,000 --> 00:42:59,000
The question is the compiler, sorry, is the query out the most smart enough to figure out? Oh, this, this thing, whatever happens here, gets overwritten by this.

290
00:43:00,000 --> 00:43:02,000
We have to open circles or run two down.

291
00:43:07,000 --> 00:43:14,000
But it's still not to use ER2 level of this. It needs to be.

292
00:43:15,000 --> 00:43:23,000
No, no, it literally will be select regular, select constant regular as level as ER3, ER3.

293
00:43:23,000 --> 00:43:28,000
No, no, no. So in the else, in that log, exactly where the query goes.

294
00:43:28,000 --> 00:43:39,000
No, this case when goes away, if you, if your example, it's just set set level as regular, this goes away. It's it's this. It's this query up here.

295
00:43:40,000 --> 00:43:41,000
Select regular as level.

296
00:43:42,000 --> 00:43:44,000
Then just overwrite it.

297
00:43:44,000 --> 00:43:49,000
And then going forward, when I put it all together here,

298
00:43:49,000 --> 00:43:53,000
then as I do my select ER3 level,

299
00:43:53,000 --> 00:43:55,000
well, that's just whatever came out of this one.

300
00:44:01,000 --> 00:44:04,000
OK.

301
00:44:04,000 --> 00:44:06,000
So now, if you do this with the query app,

302
00:44:06,000 --> 00:44:08,000
you need to see what they were.

303
00:44:08,000 --> 00:44:11,000
What you end up with is all this cross-supplies,

304
00:44:11,000 --> 00:44:17,000
get turned out and simplified into just a left-out or join

305
00:44:17,000 --> 00:44:21,000
against the order table.

306
00:44:21,000 --> 00:44:26,000
So you're looping every single customer record,

307
00:44:26,000 --> 00:44:30,000
and then you do a left-out or join to compute the maximum number

308
00:44:30,000 --> 00:44:34,000
of the total amount of items that they bought.

309
00:44:34,000 --> 00:44:36,000
If they don't have them bought anything,

310
00:44:36,000 --> 00:44:38,000
you get null, that's fine.

311
00:44:38,000 --> 00:44:42,000
Otherwise, you didn't compute what the true output is.

312
00:44:45,000 --> 00:44:48,000
Pretty cool.

313
00:44:48,000 --> 00:44:51,000
Again, I'll say this next week, for most things,

314
00:44:51,000 --> 00:44:56,000
SQL Server will have the best query app miser in the world.

315
00:44:56,000 --> 00:44:59,000
Not for some things, right?

316
00:44:59,000 --> 00:45:03,000
For joins, for nest queries, the umbral hyper ones will be better,

317
00:45:03,000 --> 00:45:06,000
and Dr. B is getting there.

318
00:45:06,000 --> 00:45:10,000
I'll give a preview of what we'll talk about next week

319
00:45:10,000 --> 00:45:12,000
at the end of this class today.

320
00:45:12,000 --> 00:45:15,000
So in this case here now, what do we have?

321
00:45:15,000 --> 00:45:20,000
There was an implicit join in our UDF

322
00:45:20,000 --> 00:45:24,000
that because we converted it into this cross-supply,

323
00:45:24,000 --> 00:45:29,000
this lateral join contraption here,

324
00:45:29,000 --> 00:45:31,000
that the query app miser was able to figure out,

325
00:45:31,000 --> 00:45:35,000
oh, it's actually, it is a join against the order table,

326
00:45:35,000 --> 00:45:37,000
between the orders and customer table.

327
00:45:37,000 --> 00:45:39,000
And in particular, it's a left-outer join,

328
00:45:39,000 --> 00:45:42,000
because I may not always have an order record for a customer.

329
00:45:42,000 --> 00:45:46,000
And so now I can just inline or do a join,

330
00:45:46,000 --> 00:45:48,000
as I normally would, do the hash join really quickly,

331
00:45:48,000 --> 00:45:50,000
but we know how to do.

332
00:45:50,000 --> 00:45:53,000
All of the operations that were previously a black box inside

333
00:45:53,000 --> 00:45:56,000
of our UDF are now embedded as SQL,

334
00:45:56,000 --> 00:45:58,000
and the query optimizer can use all the statistics

335
00:45:58,000 --> 00:46:00,000
and other information that it has to be able to reason

336
00:46:00,000 --> 00:46:03,000
about the selectivity estimates for our query.

337
00:46:03,000 --> 00:46:07,000
It's paralysable now, because we know there's no weird dependencies

338
00:46:07,000 --> 00:46:12,000
between invoking this query from one record to the next.

339
00:46:12,000 --> 00:46:16,000
So all my threads can be running this in parallel at the same time.

340
00:46:16,000 --> 00:46:20,000
There's no function call overhead of setting up the call stack

341
00:46:20,000 --> 00:46:23,000
to go into some function for every single record.

342
00:46:23,000 --> 00:46:26,000
Furthermore, though, they claim that in the Freud paper,

343
00:46:26,000 --> 00:46:28,000
one of the big advantages of their approaches

344
00:46:28,000 --> 00:46:30,000
didn't require any engineering changes or changes

345
00:46:30,000 --> 00:46:32,000
to the query optimizer itself.

346
00:46:32,000 --> 00:46:36,000
That's a whole complicated piece of a machinery inside the Davis server,

347
00:46:36,000 --> 00:46:39,000
and then if you can avoid having to modify that,

348
00:46:39,000 --> 00:46:43,000
and therefore you know there won't be any regressions for anybody else,

349
00:46:43,000 --> 00:46:48,000
then this is fantastic.

350
00:46:48,000 --> 00:46:51,000
So if your query optimizer is very sophisticated,

351
00:46:51,000 --> 00:46:53,000
in the case of SQL Server 1 is,

352
00:46:53,000 --> 00:46:55,000
you actually get a lot of same optimization advantages

353
00:46:55,000 --> 00:46:58,000
you would get in a what I'll call traditional optimizer,

354
00:46:58,000 --> 00:47:01,000
or compiler, optimizing compiler,

355
00:47:01,000 --> 00:47:05,000
like for Clang or GCC, you basically get the same benefits

356
00:47:05,000 --> 00:47:08,000
in now inside your UDF.

357
00:47:08,000 --> 00:47:10,000
So let's say I have a really simple UDF,

358
00:47:10,000 --> 00:47:13,000
giving some integer, and I return back whether it's a high value,

359
00:47:13,000 --> 00:47:15,000
the string high value or low value.

360
00:47:15,000 --> 00:47:18,000
So I would invoke it as select get value as passing

361
00:47:18,000 --> 00:47:21,000
in some kind of constant here.

362
00:47:21,000 --> 00:47:24,000
So if I Freud this mofo, I'm going to get,

363
00:47:24,000 --> 00:47:26,000
at least in the first version, something like this.

364
00:47:26,000 --> 00:47:29,000
We have the case when statement, if the value is greater than 1,000,

365
00:47:29,000 --> 00:47:32,000
set up high, otherwise give it low,

366
00:47:32,000 --> 00:47:36,000
and then we do an outer apply, we can know what that is on that,

367
00:47:36,000 --> 00:47:40,000
and we get, you know, we return back the string high value, low value.

368
00:47:40,000 --> 00:47:45,000
Well, in a query optimizer, a traditional optimizer,

369
00:47:45,000 --> 00:47:49,000
it would be to recognize that because I'm invoking this with a constant value

370
00:47:49,000 --> 00:47:52,000
of what was it? 5,000?

371
00:47:52,000 --> 00:47:54,000
Yes, yeah, 5,000.

372
00:47:54,000 --> 00:47:56,000
That I can do dynamic slicing and identify,

373
00:47:56,000 --> 00:48:00,000
but I'm never going to go down the else clause for low value,

374
00:48:00,000 --> 00:48:03,000
and I just remove that dead code entirely.

375
00:48:03,000 --> 00:48:04,000
Right?

376
00:48:04,000 --> 00:48:08,000
In the case of the SQL query, it's the same thing as I've removed my case when,

377
00:48:08,000 --> 00:48:14,000
and I just have, you know, just spit out the constant value high.

378
00:48:14,000 --> 00:48:17,000
And furthermore, I can do constant propagation and folding.

379
00:48:17,000 --> 00:48:20,000
Again, a traditional compiler optimizer would recognize that,

380
00:48:20,000 --> 00:48:25,000
well, I don't need to concatenate high and value as separate steps,

381
00:48:26,000 --> 00:48:30,000
I can just put them two together at the very beginning by propagating the constant up.

382
00:48:30,000 --> 00:48:34,000
Same thing in our SQL query, the query optimizer could figure out,

383
00:48:34,000 --> 00:48:36,000
oh, well, this is just taking high,

384
00:48:36,000 --> 00:48:42,000
appending it to the string vowel, so why do that as an outer apply with separate SQL queries,

385
00:48:42,000 --> 00:48:45,000
and we just do it in one statement.

386
00:48:45,000 --> 00:48:48,000
In further, you do more dead code elimination,

387
00:48:48,000 --> 00:48:53,000
saying, well, I don't need to declare an outer query return value

388
00:48:54,000 --> 00:48:56,000
or setting up the variable and then returning it,

389
00:48:56,000 --> 00:48:59,000
it's just select high value.

390
00:49:01,000 --> 00:49:05,000
So again, you get all the same benefits as if it was a traditional optimizer,

391
00:49:05,000 --> 00:49:07,000
but the query optimizer is doing this,

392
00:49:07,000 --> 00:49:09,000
because it already can do this for queries today.

393
00:49:09,000 --> 00:49:12,000
SQL Server can not everyone can.

394
00:49:12,000 --> 00:49:16,000
I don't think Postgres can do this.

395
00:49:18,000 --> 00:49:19,000
Right?

396
00:49:19,000 --> 00:49:20,000
Yes.

397
00:49:20,000 --> 00:49:22,000
So what does this work so well?

398
00:49:22,000 --> 00:49:25,000
Can you just stop teaching people, see, and pull in these media.

399
00:49:25,000 --> 00:49:27,000
Stabbing is, if this works so well,

400
00:49:27,000 --> 00:49:30,000
could we just stop teaching people SQL and use you desks or everything?

401
00:49:30,000 --> 00:49:32,000
So again, it doesn't support everything.

402
00:49:32,000 --> 00:49:34,000
So in 2019, this is what you can do.

403
00:49:34,000 --> 00:49:37,000
You can do clairs and sets, you have select queries,

404
00:49:37,000 --> 00:49:40,000
if then else, or if else, else if,

405
00:49:40,000 --> 00:49:44,000
if return clause in multiple locations of the function,

406
00:49:44,000 --> 00:49:46,000
which they can handle that,

407
00:49:46,000 --> 00:49:48,000
and they can do all basic relational operators,

408
00:49:48,000 --> 00:49:50,000
out of operators, exist, not exist,

409
00:49:50,000 --> 00:49:54,000
is null in any and so forth.

410
00:49:54,000 --> 00:49:56,000
They don't support exceptions,

411
00:49:56,000 --> 00:49:58,000
they don't support dynamic SQL queries,

412
00:49:58,000 --> 00:50:00,000
and they don't support updates.

413
00:50:00,000 --> 00:50:02,000
Again, in SQL Server, that's not a big deal,

414
00:50:02,000 --> 00:50:05,000
but in Postgres and other queries,

415
00:50:05,000 --> 00:50:07,000
or other data systems, you could.

416
00:50:07,000 --> 00:50:08,000
So the original question is,

417
00:50:08,000 --> 00:50:09,000
why do we need SQL,

418
00:50:09,000 --> 00:50:11,000
instead of just using UDS?

419
00:50:11,000 --> 00:50:14,000
You want you to still need both, right?

420
00:50:14,000 --> 00:50:16,000
There are certain things you would not,

421
00:50:16,000 --> 00:50:19,000
like, to do the things you would want to,

422
00:50:19,000 --> 00:50:22,000
we do in a, on your database server,

423
00:50:22,000 --> 00:50:26,000
like your UDS is going to start making SQL query calls in it.

424
00:50:26,000 --> 00:50:28,000
Right?

425
00:50:28,000 --> 00:50:33,000
So SQL doesn't go away.

426
00:50:33,000 --> 00:50:37,000
So this is the result they had in the paper that they share,

427
00:50:37,000 --> 00:50:41,000
where they had a bunch of different workloads

428
00:50:41,000 --> 00:50:43,000
that are real from real customers,

429
00:50:43,000 --> 00:50:46,000
and I think they got permission to extract out the UDS

430
00:50:46,000 --> 00:50:48,000
and sample the data,

431
00:50:48,000 --> 00:50:52,000
and they showed what benefit they're getting for a bunch of UDS

432
00:50:52,000 --> 00:50:54,000
by inlining it with Freud.

433
00:50:54,000 --> 00:50:58,000
So for the first workload, it had 90 UDS,

434
00:50:58,000 --> 00:51:02,000
and 82 of them could be, could be in line with Freud,

435
00:51:02,000 --> 00:51:05,000
and the second one was 178 UDS,

436
00:51:05,000 --> 00:51:07,000
and 150 work of battle.

437
00:51:07,000 --> 00:51:10,000
And so, you can sort of see the long tail here,

438
00:51:10,000 --> 00:51:13,000
with only one UDF actually had a regression,

439
00:51:13,000 --> 00:51:16,000
and I think it's going to be because the SQL server

440
00:51:16,000 --> 00:51:19,000
is going to choke on the, you know,

441
00:51:19,000 --> 00:51:23,000
going to choke on, and handling a large amount of lateral joins,

442
00:51:23,000 --> 00:51:25,000
the same thing for the little one here.

443
00:51:25,000 --> 00:51:27,000
But like, this is pretty significant, right?

444
00:51:27,000 --> 00:51:31,000
Some customers are getting almost 1,000 X speed up, right?

445
00:51:31,000 --> 00:51:33,000
That's huge. That's insane.

446
00:51:33,000 --> 00:51:35,000
Like, that almost never happens in databases,

447
00:51:35,000 --> 00:51:37,000
unless you, like, rewrite your application,

448
00:51:37,000 --> 00:51:39,000
or like switch vendors, go from like, you know,

449
00:51:39,000 --> 00:51:41,000
a row store to a column store.

450
00:51:41,000 --> 00:51:44,000
Without having to make any changes to the UDF itself,

451
00:51:44,000 --> 00:51:48,000
just with Freud in inlining, the performance win is significant.

452
00:51:48,000 --> 00:51:49,000
Right?

453
00:51:49,000 --> 00:51:51,000
And the inventor of Freud, this guy, Carthick,

454
00:51:51,000 --> 00:51:53,000
he was a Pichestudent IAT Bombay,

455
00:51:53,000 --> 00:51:55,000
which is the best database school in India,

456
00:51:55,000 --> 00:51:58,000
and then he was at the Gray Systems Lab

457
00:51:58,000 --> 00:52:01,000
in Madison, Wisconsin, with Gignesh,

458
00:52:01,000 --> 00:52:04,000
and where he worked at Microsoft on this.

459
00:52:04,000 --> 00:52:09,000
He got it, the paper came out, I think, in 2016, 2017.

460
00:52:09,000 --> 00:52:11,000
You know, that he, the paper predates it,

461
00:52:11,000 --> 00:52:13,000
but they got it shipped in SQL Server in 2019,

462
00:52:13,000 --> 00:52:15,000
in like, three years, which is insane.

463
00:52:15,000 --> 00:52:17,000
So there's a bunch of his tweets that shows it, like,

464
00:52:17,000 --> 00:52:19,000
people are talking about how, like, the benefit they're getting

465
00:52:19,000 --> 00:52:21,000
with Freud is, you know, 20X faster, you know,

466
00:52:21,000 --> 00:52:23,000
it's significantly more.

467
00:52:23,000 --> 00:52:26,000
Or this case, the query went from four minutes to nine seconds,

468
00:52:26,000 --> 00:52:29,000
but just turning on the flags says, use Freud.

469
00:52:29,000 --> 00:52:31,000
Again, that's a huge win without having

470
00:52:31,000 --> 00:52:34,000
to make any change your application, right?

471
00:52:34,000 --> 00:52:37,000
I think in the paper, they talk about the overall compatibility

472
00:52:37,000 --> 00:52:43,000
or support for UDS in all of the top 100 Azure databases,

473
00:52:43,000 --> 00:52:45,000
I think was about like 60%.

474
00:52:45,000 --> 00:52:50,000
So 60% of the UDS could be converted into, could be in line with Freud.

475
00:52:55,000 --> 00:52:57,000
All right, so this is one approach.

476
00:52:57,000 --> 00:53:00,000
This is like, this is how to again, take the UDF,

477
00:53:00,000 --> 00:53:04,000
convert it into relation algebra, and then inline that.

478
00:53:04,000 --> 00:53:07,000
And I showed how to do it through SQL.

479
00:53:07,000 --> 00:53:09,000
So here's another, yes, question.

480
00:53:09,000 --> 00:53:13,000
So what are the challenges that you've been in the same approach

481
00:53:13,000 --> 00:53:16,000
with effectively UDS? Why is the UDS?

482
00:53:16,000 --> 00:53:18,000
A question.

483
00:53:18,000 --> 00:53:20,000
What are the challenges that you're doing with scale UDS?

484
00:53:20,000 --> 00:53:22,000
Where's the vector UDS?

485
00:53:22,000 --> 00:53:24,000
Well, I'm sorry for scale UDS.

486
00:53:24,000 --> 00:53:26,000
We've roomed the scope of scale UDS.

487
00:53:26,000 --> 00:53:28,000
What are the additional challenges that prevent

488
00:53:28,000 --> 00:53:30,000
from going into vector?

489
00:53:30,000 --> 00:53:34,000
Scale UDS is a construct in UDS.

490
00:53:34,000 --> 00:53:37,000
Like they return a single value.

491
00:53:37,000 --> 00:53:40,000
If you return multiple values, they're called table value functions.

492
00:53:40,000 --> 00:53:42,000
Sorry, I made the problem.

493
00:53:42,000 --> 00:53:44,000
Yeah.

494
00:53:44,000 --> 00:53:48,000
So actually, it's like, why can't you do this for everything?

495
00:53:51,000 --> 00:53:54,000
I don't know.

496
00:53:55,000 --> 00:53:57,000
Yes, of course. I don't remember.

497
00:53:57,000 --> 00:54:01,000
Most functions out there are scale UDS anyway.

498
00:54:01,000 --> 00:54:02,000
Yes.

499
00:54:02,000 --> 00:54:05,000
Are there any restrictions on UDS to make sure they always terminate?

500
00:54:05,000 --> 00:54:07,000
The question is, are there restrictions on UDS to make sure

501
00:54:07,000 --> 00:54:08,000
they always terminate?

502
00:54:08,000 --> 00:54:12,000
That's usually a construct of the execution engine itself,

503
00:54:12,000 --> 00:54:14,000
like how long a query can run.

504
00:54:14,000 --> 00:54:18,000
So you set your time out to say, the query can run for one minute.

505
00:54:18,000 --> 00:54:21,000
The data system doesn't care whether you're spending all your time in UDF or not.

506
00:54:22,000 --> 00:54:24,000
So yes, could you write an infinite loop in UDF?

507
00:54:24,000 --> 00:54:25,000
Yes.

508
00:54:25,000 --> 00:54:27,000
Why did it convert for loop for one minute?

509
00:54:27,000 --> 00:54:29,000
The question is, is that why they can't convert for loops?

510
00:54:29,000 --> 00:54:33,000
I don't think it's a limitation of what a time out.

511
00:54:33,000 --> 00:54:36,000
I think the discussion of limitation of the paper,

512
00:54:36,000 --> 00:54:38,000
and they have a cursor for the code,

513
00:54:38,000 --> 00:54:42,000
so they can get out of the volume to point the areas with the limitation

514
00:54:42,000 --> 00:54:46,000
that they're setting the common memory and they don't want the UDS to end.

515
00:54:46,000 --> 00:54:48,000
There's a follow-up paper we're not going to cover call it Agify,

516
00:54:48,000 --> 00:54:53,000
where they show how to do aggregations, like loops in an UDF.

517
00:54:53,000 --> 00:54:57,000
For that one, they're actually going to rewrite your portion of the UDF

518
00:54:57,000 --> 00:55:00,000
as a user-writing aggregate and evoke that.

519
00:55:00,000 --> 00:55:03,000
That's doing transpiration.

520
00:55:03,000 --> 00:55:06,000
We don't want to focus on that.

521
00:55:06,000 --> 00:55:09,000
And that, as far as I know, didn't make a production.

522
00:55:12,000 --> 00:55:14,000
Exceptions are the other way or one, too, because they didn't know that it's a sport.

523
00:55:14,000 --> 00:55:16,000
That's literally like, it's like a go-to statement.

524
00:55:16,000 --> 00:55:19,000
You're jumping to another part and they don't support that.

525
00:55:19,000 --> 00:55:25,000
All right, so I want to talk about how to do SQL or UDF into SQL,

526
00:55:25,000 --> 00:55:30,000
using the app file approach from other set of Germans at Toburgin,

527
00:55:30,000 --> 00:55:33,000
and then when I finish up talking about batching,

528
00:55:33,000 --> 00:55:36,000
which is another alternative to inlining.

529
00:55:36,000 --> 00:55:40,000
So for this app file approach, what they're going to do is they're going to take your UDS

530
00:55:40,000 --> 00:55:45,000
and they're going to vert them into commentable expressions.

531
00:55:45,000 --> 00:55:47,000
Basically, SQL statements.

532
00:55:47,000 --> 00:55:50,000
And this is going to allow them to do the looping that Freud can't do

533
00:55:50,000 --> 00:55:53,000
and additional constructs that Freud can't handle.

534
00:55:53,000 --> 00:55:56,000
So instead of actually embedding this and having the database server,

535
00:55:56,000 --> 00:56:01,000
they actually wrote this as a separate middleware, as a standalone compiler.

536
00:56:01,000 --> 00:56:03,000
I can give it a quick demo.

537
00:56:03,000 --> 00:56:09,000
So if you go to that website here, you have on one side you have the UDF.

538
00:56:09,000 --> 00:56:12,000
I think you're going to need to make a false name.

539
00:56:12,000 --> 00:56:14,000
So what's that?

540
00:56:14,000 --> 00:56:15,000
The core natural.

541
00:56:15,000 --> 00:56:17,000
Yeah, they're always going to have the core lateral,

542
00:56:17,000 --> 00:56:20,000
but they're going to recruit the CTs for this as well.

543
00:56:20,000 --> 00:56:22,000
So again, so this is the original UDF,

544
00:56:22,000 --> 00:56:24,000
and then this is what it'll spit out.

545
00:56:24,000 --> 00:56:27,000
And you see a lot of lateral joins and mess acquires.

546
00:56:27,000 --> 00:56:30,000
So I can do something really stupid.

547
00:56:30,000 --> 00:56:32,000
You know, x.

548
00:56:37,000 --> 00:56:39,000
And then it spits it out.

549
00:56:39,000 --> 00:56:41,000
Now, like, it's including x variable.

550
00:56:41,000 --> 00:56:43,000
And it's doing some of the same things.

551
00:56:43,000 --> 00:56:47,000
Like it's setting up the variables in the same way that we saw before.

552
00:56:47,000 --> 00:56:49,000
So I change this to 99.

553
00:56:49,000 --> 00:56:50,000
Right?

554
00:56:50,000 --> 00:56:52,000
Then you get the same.

555
00:56:52,000 --> 00:56:54,000
It's very similar to what we saw in Freud.

556
00:56:54,000 --> 00:56:57,000
And then if I actually run this, though,

557
00:56:57,000 --> 00:57:00,000
so this is Postgres.

558
00:57:00,000 --> 00:57:01,000
So I've already installed it.

559
00:57:01,000 --> 00:57:04,000
So here's the real simple function.

560
00:57:04,000 --> 00:57:07,000
And then I execute it as.

561
00:57:08,000 --> 00:57:10,000
You can't see.

562
00:57:10,000 --> 00:57:13,000
Right?

563
00:57:13,000 --> 00:57:15,000
So if I run it out,

564
00:57:15,000 --> 00:57:18,000
it takes about half a second to do the original UDF.

565
00:57:18,000 --> 00:57:22,000
But if I run there, giant,

566
00:57:22,000 --> 00:57:25,000
the lateral join one like this,

567
00:57:25,000 --> 00:57:29,000
that's how it's going to install it.

568
00:57:29,000 --> 00:57:30,000
That was a great function.

569
00:57:30,000 --> 00:57:34,000
So now I invoke it.

570
00:57:34,000 --> 00:57:37,000
Now we're taking what two milliseconds?

571
00:57:37,000 --> 00:57:38,000
Yeah.

572
00:57:38,000 --> 00:57:39,000
So in this case here,

573
00:57:39,000 --> 00:57:44,000
the UDF call in Postgres is actually faster than using the Freud one.

574
00:57:48,000 --> 00:57:50,000
Totally explained.

575
00:57:50,000 --> 00:57:51,000
Yep.

576
00:57:51,000 --> 00:57:53,000
Yep, yep, yep, yep, I got it.

577
00:57:53,000 --> 00:57:57,000
This is why I always use my laptop and I give demos in the class.

578
00:57:57,000 --> 00:57:58,000
I want to keep it quick.

579
00:57:58,000 --> 00:57:59,000
Right?

580
00:57:59,000 --> 00:58:00,000
In this case here,

581
00:58:00,000 --> 00:58:03,000
there's the cause just invoking that function.

582
00:58:03,000 --> 00:58:04,000
Right?

583
00:58:04,000 --> 00:58:08,000
You see how Postgres at the optimization level can expand the SQL query

584
00:58:08,000 --> 00:58:11,000
because it's in bed inside that UDF.

585
00:58:11,000 --> 00:58:13,000
Right?

586
00:58:13,000 --> 00:58:17,000
And again, the link in the slides if you guys want to play with it.

587
00:58:17,000 --> 00:58:18,000
All right.

588
00:58:18,000 --> 00:58:20,000
So this is a great little PLE and capyla-y.

589
00:58:20,000 --> 00:58:21,000
So bear with me.

590
00:58:21,000 --> 00:58:23,000
And again, I'm not an expert in this area.

591
00:58:23,000 --> 00:58:26,000
So like, I know enough how it maps to the SQL stuff,

592
00:58:26,000 --> 00:58:28,000
but beyond this,

593
00:58:28,000 --> 00:58:30,000
you know, this is all,

594
00:58:30,000 --> 00:58:31,000
you know,

595
00:58:31,000 --> 00:58:32,000
I can't go too deep in this.

596
00:58:32,000 --> 00:58:35,000
So the idea is that we take our UDF

597
00:58:35,000 --> 00:58:41,000
and we're going to convert this into a phone call SSA.

598
00:58:41,000 --> 00:58:44,000
A static single assignment form.

599
00:58:44,000 --> 00:58:49,000
And this is going to allow us to basically convert the arbitrary code

600
00:58:49,000 --> 00:58:53,000
that we had in our UDF into some form that's going to use go-tos

601
00:58:53,000 --> 00:58:55,000
to define blocks of things.

602
00:58:55,000 --> 00:58:58,000
And then we're going to take this SSA thing and convert it into

603
00:58:58,000 --> 00:59:00,000
administrative normal form,

604
00:59:00,000 --> 00:59:03,000
which is going to use mutually-tailed recursive functions that

605
00:59:03,000 --> 00:59:06,000
allows again to simplify the blocks of the regions themselves.

606
00:59:06,000 --> 00:59:09,000
Then we convert the administrative normal form

607
00:59:09,000 --> 00:59:12,000
with using mutual recursion into direct conversion,

608
00:59:12,000 --> 00:59:13,000
recursion,

609
00:59:13,000 --> 00:59:20,000
and then that gets converted into SQL using with recursive CTEs.

610
00:59:20,000 --> 00:59:23,000
And then we, that produces our SQL query and we run it through our query optimizer.

611
00:59:23,000 --> 00:59:24,000
So buckle up.

612
00:59:24,000 --> 00:59:26,000
We'll go through the list.

613
00:59:26,000 --> 00:59:29,000
So let's say we have a really simple function, this PAL function,

614
00:59:29,000 --> 00:59:30,000
given an x, given an n,

615
00:59:30,000 --> 00:59:33,000
we're just going to have this part we care about as this loop here.

616
00:59:33,000 --> 00:59:37,000
We can add our every i and multiply x by itself,

617
00:59:37,000 --> 00:59:40,000
right, by some power.

618
00:59:40,000 --> 00:59:41,000
So in the first step,

619
00:59:41,000 --> 00:59:43,000
we want to convert this to SSA form.

620
00:59:43,000 --> 00:59:46,000
It's going to look something like this where we define these blocks

621
00:59:46,000 --> 00:59:51,000
with these labels and then we're using go-tos to jump around where we need.

622
00:59:51,000 --> 00:59:52,000
Right?

623
00:59:52,000 --> 00:59:53,000
You're happy.

624
00:59:53,000 --> 00:59:54,000
Look how happy you are.

625
00:59:54,000 --> 00:59:55,000
Right?

626
00:59:55,000 --> 00:59:56,000
See me on the ground.

627
00:59:56,000 --> 00:59:57,000
Yeah.

628
00:59:57,000 --> 00:59:58,000
All right.

629
00:59:58,000 --> 01:00:01,000
This is what they do to you.

630
01:00:01,000 --> 01:00:03,000
All right.

631
01:00:03,000 --> 01:00:04,000
So again,

632
01:00:04,000 --> 01:00:07,000
in SSA form,

633
01:00:07,000 --> 01:00:08,000
as far as they know,

634
01:00:08,000 --> 01:00:10,000
we're only defined each variable once.

635
01:00:10,000 --> 01:00:11,000
We're all shaking their head.

636
01:00:11,000 --> 01:00:12,000
Yes, same, same.

637
01:00:12,000 --> 01:00:13,000
Yes.

638
01:00:13,000 --> 01:00:16,000
And this is what the traditional compiler would do on the inside.

639
01:00:16,000 --> 01:00:20,000
So then now we're going to take our SSA form

640
01:00:20,000 --> 01:00:22,000
and we're going to convert this into administrative normal form.

641
01:00:22,000 --> 01:00:25,000
And this is going to allow us to have a tail of recursion,

642
01:00:25,000 --> 01:00:30,000
meaning in the last statement of every sort of function that we can call another function,

643
01:00:30,000 --> 01:00:34,000
and we're allowed to call recursively ourselves and other functions,

644
01:00:34,000 --> 01:00:36,000
and those functions can then call us back.

645
01:00:36,000 --> 01:00:37,000
Right?

646
01:00:37,000 --> 01:00:40,000
So you have this, you can have cycles in this.

647
01:00:40,000 --> 01:00:41,000
Right?

648
01:00:41,000 --> 01:00:42,000
So in this case here,

649
01:00:42,000 --> 01:00:43,000
for our while loop,

650
01:00:43,000 --> 01:00:45,000
we're going to loop through and do our computation,

651
01:00:45,000 --> 01:00:47,000
and then we're recursively calling ourselves,

652
01:00:47,000 --> 01:00:49,000
but then when we want to finish the last one,

653
01:00:49,000 --> 01:00:50,000
then we break out.

654
01:00:50,000 --> 01:00:51,000
Right?

655
01:00:51,000 --> 01:00:56,000
And then whatever the return result is whatever the last iteration was.

656
01:00:56,000 --> 01:00:57,000
Yes.

657
01:00:57,000 --> 01:00:58,000
So this is your tail of recursion.

658
01:00:58,000 --> 01:01:02,000
It's just like the calls to do the other labels that is recursive.

659
01:01:02,000 --> 01:01:05,000
You're still allowed to computation before the calls.

660
01:01:05,000 --> 01:01:06,000
Yes.

661
01:01:06,000 --> 01:01:07,000
Yeah.

662
01:01:07,000 --> 01:01:09,000
And the question is,

663
01:01:09,000 --> 01:01:11,000
are we allowed to do computation before we have the calls?

664
01:01:11,000 --> 01:01:13,000
Yes, so that's what this is.

665
01:01:13,000 --> 01:01:14,000
Down here.

666
01:01:14,000 --> 01:01:15,000
Right?

667
01:01:15,000 --> 01:01:17,000
So again, this is doing mutual recursion,

668
01:01:17,000 --> 01:01:19,000
meaning one function can call other function,

669
01:01:19,000 --> 01:01:21,000
and that function can call you back.

670
01:01:21,000 --> 01:01:24,000
We want to convert this to direct recursion,

671
01:01:24,000 --> 01:01:27,000
and that's just doing another transformation,

672
01:01:27,000 --> 01:01:29,000
and that's going to basically now,

673
01:01:29,000 --> 01:01:31,000
where we only have recursive calls in the,

674
01:01:31,000 --> 01:01:34,000
as the tail is the last thing we do within our function,

675
01:01:34,000 --> 01:01:36,000
and then the, the,

676
01:01:36,000 --> 01:01:39,000
the, the, the embedding of recursion calls can only get in one direction.

677
01:01:39,000 --> 01:01:41,000
So run can call run,

678
01:01:41,000 --> 01:01:42,000
pow can call run,

679
01:01:42,000 --> 01:01:44,000
but run cannot call pow.

680
01:01:44,000 --> 01:01:47,000
And the reason why we're going to do this is because we care about,

681
01:01:47,000 --> 01:01:50,000
getting the last output of what the,

682
01:01:50,000 --> 01:01:51,000
of whatever this,

683
01:01:51,000 --> 01:01:52,000
in our tail recursion calls,

684
01:01:52,000 --> 01:01:53,000
call stack,

685
01:01:53,000 --> 01:01:54,000
and that then gets,

686
01:01:54,000 --> 01:01:56,000
as produces the output to the,

687
01:01:56,000 --> 01:01:59,000
the, the, the select statement within our,

688
01:01:59,000 --> 01:02:02,000
in our, in our, in our nested queries, right?

689
01:02:02,000 --> 01:02:04,000
This is the outermost query is going to,

690
01:02:04,000 --> 01:02:05,000
is going to, is to produce the output,

691
01:02:05,000 --> 01:02:06,000
and that's going to be the,

692
01:02:06,000 --> 01:02:08,000
the, the intermost recursive call.

693
01:02:08,000 --> 01:02:09,000
So, all right,

694
01:02:09,000 --> 01:02:12,000
so then we take this thing,

695
01:02:12,000 --> 01:02:14,000
and now we convert this into SQL.

696
01:02:14,000 --> 01:02:16,000
So again, I'm not going to go through all the details,

697
01:02:17,000 --> 01:02:18,000
what it's all this, but,

698
01:02:18,000 --> 01:02:19,000
basically, a thing of like,

699
01:02:19,000 --> 01:02:21,000
here's the, the, the,

700
01:02:21,000 --> 01:02:22,000
the setup, all the variables.

701
01:02:22,000 --> 01:02:23,000
Well, that's, this,

702
01:02:23,000 --> 01:02:25,000
this nested query inside of this.

703
01:02:25,000 --> 01:02:27,000
Uh, and then we have our,

704
01:02:27,000 --> 01:02:28,000
our, our if and else,

705
01:02:28,000 --> 01:02:30,000
and then this, this recursion calls here, right?

706
01:02:30,000 --> 01:02:31,000
And that corresponds to this,

707
01:02:31,000 --> 01:02:33,000
this, this SQL statement like this.

708
01:02:33,000 --> 01:02:34,000
Right?

709
01:02:34,000 --> 01:02:38,000
And then compiler magic happens,

710
01:02:38,000 --> 01:02:39,000
and then, and then this works.

711
01:02:39,000 --> 01:02:44,000
All right, so,

712
01:02:44,000 --> 01:02:46,000
does it make a difference?

713
01:02:46,000 --> 01:02:48,000
Well, in, uh,

714
01:02:48,000 --> 01:02:49,000
for this one, they didn't,

715
01:02:49,000 --> 01:02:51,000
they, they didn't have Freud,

716
01:02:51,000 --> 01:02:53,000
uh, so they can't compare against, you know,

717
01:02:53,000 --> 01:02:54,000
is their approach better than what,

718
01:02:54,000 --> 01:02:56,000
what Microsoft is doing.

719
01:02:56,000 --> 01:02:58,000
They just compare to how much faster they're

720
01:02:58,000 --> 01:02:59,000
approach using all these,

721
01:02:59,000 --> 01:03:00,000
and SSTTEs,

722
01:03:00,000 --> 01:03:02,000
or his versus, uh,

723
01:03:02,000 --> 01:03:03,000
you know,

724
01:03:03,000 --> 01:03:04,000
just letting,

725
01:03:04,000 --> 01:03:05,000
postgres, just, you know,

726
01:03:05,000 --> 01:03:06,000
call the UDF,

727
01:03:06,000 --> 01:03:08,000
uh, as it normally does.

728
01:03:08,000 --> 01:03:10,000
And in my example before,

729
01:03:10,000 --> 01:03:11,000
I showed how the,

730
01:03:11,000 --> 01:03:12,000
my, my,

731
01:03:12,000 --> 01:03:13,000
the trial just showed before,

732
01:03:13,000 --> 01:03:15,000
like, for that really simple function,

733
01:03:15,000 --> 01:03:16,000
it's actually faster,

734
01:03:16,000 --> 01:03:17,000
just call the UDF,

735
01:03:17,000 --> 01:03:18,000
and sure, for real simple things,

736
01:03:18,000 --> 01:03:19,000
this doesn't make sense.

737
01:03:19,000 --> 01:03:20,000
But if you're getting,

738
01:03:20,000 --> 01:03:21,000
if you're going to evoke the,

739
01:03:21,000 --> 01:03:22,000
the UDF over,

740
01:03:22,000 --> 01:03:24,000
over a very large table,

741
01:03:24,000 --> 01:03:25,000
then now you can start to see

742
01:03:25,000 --> 01:03:28,000
the divergence between the different approaches.

743
01:03:28,000 --> 01:03:29,000
I would say also too,

744
01:03:29,000 --> 01:03:30,000
that the,

745
01:03:30,000 --> 01:03:31,000
I would,

746
01:03:31,000 --> 01:03:33,000
I would say that the reason why this is not,

747
01:03:33,000 --> 01:03:34,000
the,

748
01:03:34,000 --> 01:03:35,000
the performance gap is not as more significant,

749
01:03:35,000 --> 01:03:36,000
it's because,

750
01:03:36,000 --> 01:03:37,000
and the postgres query out of my,

751
01:03:37,000 --> 01:03:38,000
is not as sophisticated as,

752
01:03:38,000 --> 01:03:39,000
as micr saws.

753
01:03:39,000 --> 01:03:40,000
So therefore,

754
01:03:40,000 --> 01:03:42,000
it's not going to be able to do all the,

755
01:03:42,000 --> 01:03:43,000
the,

756
01:03:43,000 --> 01:03:45,000
all the optimizations that I was showing before,

757
01:03:45,000 --> 01:03:46,000
breaking it down,

758
01:03:46,000 --> 01:03:47,000
removing dead code and,

759
01:03:47,000 --> 01:03:48,000
and other things.

760
01:03:48,000 --> 01:03:49,000
All right,

761
01:03:49,000 --> 01:03:53,000
so the last one of the project I'm going to show you is bashing.

762
01:03:53,000 --> 01:03:54,000
Again, so the background here,

763
01:03:54,000 --> 01:03:56,000
this actually came out of a 721 project,

764
01:03:56,000 --> 01:03:57,000
uh,

765
01:03:57,000 --> 01:03:58,000
that Sam and,

766
01:03:58,000 --> 01:03:59,000
and another student

767
01:03:59,000 --> 01:04:00,000
were working on last year,

768
01:04:00,000 --> 01:04:01,000
um,

769
01:04:01,000 --> 01:04:02,000
and the,

770
01:04:02,000 --> 01:04:03,000
the,

771
01:04:03,000 --> 01:04:04,000
the,

772
01:04:04,000 --> 01:04:05,000
and the,

773
01:04:05,000 --> 01:04:06,000
the CMU undergrad,

774
01:04:06,000 --> 01:04:07,000
sort of independently,

775
01:04:07,000 --> 01:04:08,000
uh,

776
01:04:08,000 --> 01:04:09,000
developed this,

777
01:04:09,000 --> 01:04:10,000
this technique,

778
01:04:10,000 --> 01:04:11,000
and then we found a,

779
01:04:11,000 --> 01:04:14,000
a master's thesis from the Germans that did app fell,

780
01:04:14,000 --> 01:04:15,000
that's,

781
01:04:15,000 --> 01:04:16,000
they invented this bashing technique,

782
01:04:16,000 --> 01:04:17,000
but then we found another paper from,

783
01:04:17,000 --> 01:04:18,000
from the,

784
01:04:18,000 --> 01:04:19,000
Freud guys,

785
01:04:19,000 --> 01:04:20,000
P.C.

786
01:04:20,000 --> 01:04:21,000
advisor from 2008,

787
01:04:21,000 --> 01:04:22,000
who actually invented before anyone else,

788
01:04:22,000 --> 01:04:23,000
but in that version 2008,

789
01:04:23,000 --> 01:04:25,000
required changes to the query optimizer itself,

790
01:04:25,000 --> 01:04:26,000
to make this all work,

791
01:04:26,000 --> 01:04:29,000
in our version that they developed here,

792
01:04:29,000 --> 01:04:30,000
uh,

793
01:04:30,000 --> 01:04:31,000
and with the,

794
01:04:31,000 --> 01:04:32,000
with the,

795
01:04:33,000 --> 01:04:34,000
with the,

796
01:04:34,000 --> 01:04:35,000
the toy gun Germans,

797
01:04:35,000 --> 01:04:36,000
the app fell Germans,

798
01:04:36,000 --> 01:04:38,000
you don't have to make any changes to the optimizer, right?

799
01:04:38,000 --> 01:04:39,000
So the idea here is that,

800
01:04:39,000 --> 01:04:41,000
we're going to translate the,

801
01:04:41,000 --> 01:04:43,000
a UDF into a series of

802
01:04:43,000 --> 01:04:45,000
update statements.

803
01:04:45,000 --> 01:04:47,000
We're not connecting them together with lateral joins,

804
01:04:47,000 --> 01:04:48,000
it's literally like,

805
01:04:48,000 --> 01:04:50,000
it's going to be one query evoked after another.

806
01:04:50,000 --> 01:04:52,000
And what they're going to do is,

807
01:04:52,000 --> 01:04:53,000
they're going to do some amount of computation

808
01:04:53,000 --> 01:04:55,000
in the set clauses,

809
01:04:55,000 --> 01:04:57,000
to then set values in a state table,

810
01:04:57,000 --> 01:04:58,000
that's going to be,

811
01:04:58,000 --> 01:04:59,000
as if we're maintaining those,

812
01:04:59,000 --> 01:05:00,000
the,

813
01:05:01,000 --> 01:05:03,000
the equipment to the variables that are in the UDF,

814
01:05:03,000 --> 01:05:04,000
uh,

815
01:05:04,000 --> 01:05:05,000
uh, UDF itself.

816
01:05:05,000 --> 01:05:06,000
So when we evoke the UDF,

817
01:05:06,000 --> 01:05:07,000
we first create this temp table,

818
01:05:07,000 --> 01:05:09,000
we instantiate all the,

819
01:05:09,000 --> 01:05:12,000
the attributes for each variables that are in the UDF,

820
01:05:12,000 --> 01:05:13,000
then we have a series of updates,

821
01:05:13,000 --> 01:05:15,000
that then update these variables,

822
01:05:15,000 --> 01:05:18,000
corresponding to the computation that would be in the UDF.

823
01:05:18,000 --> 01:05:20,000
So we're doing that same translation we saw,

824
01:05:20,000 --> 01:05:21,000
with Freud,

825
01:05:21,000 --> 01:05:23,000
of converting the UDF procedural statements

826
01:05:23,000 --> 01:05:24,000
into, uh,

827
01:05:24,000 --> 01:05:26,000
corresponding SQL queries.

828
01:05:26,000 --> 01:05:29,000
So this is going to be useful for any database system,

829
01:05:30,000 --> 01:05:31,000
which we'll see in a second,

830
01:05:31,000 --> 01:05:33,000
that is not able to do the decorrelation stuff

831
01:05:33,000 --> 01:05:34,000
that,

832
01:05:34,000 --> 01:05:36,000
that Freud and Optel rely on.

833
01:05:36,000 --> 01:05:37,000
I mean, I'm going to convert these lateral joins

834
01:05:37,000 --> 01:05:39,000
and get them down into V,

835
01:05:39,000 --> 01:05:40,000
uh,

836
01:05:40,000 --> 01:05:42,000
to nested queries.

837
01:05:42,000 --> 01:05:44,000
So this is a,

838
01:05:44,000 --> 01:05:45,000
uh,

839
01:05:45,000 --> 01:05:46,000
this is a UDF from Procbench,

840
01:05:46,000 --> 01:05:47,000
we'll talk about in a second.

841
01:05:47,000 --> 01:05:48,000
This is the,

842
01:05:48,000 --> 01:05:49,000
this is the,

843
01:05:49,000 --> 01:05:50,000
a paper,

844
01:05:50,000 --> 01:05:51,000
a follow-up paper that the,

845
01:05:51,000 --> 01:05:52,000
Freud guys put out,

846
01:05:52,000 --> 01:05:54,000
of a real benchmark that's based on,

847
01:05:54,000 --> 01:05:56,000
all these UDFs they were seeing in,

848
01:05:56,000 --> 01:05:57,000
in real customers.

849
01:05:57,000 --> 01:05:58,000
So it's sort of,

850
01:05:58,000 --> 01:06:00,000
it's a synthetic version of,

851
01:06:00,000 --> 01:06:01,000
of what UDFs look like.

852
01:06:01,000 --> 01:06:02,000
So this is from,

853
01:06:02,000 --> 01:06:03,000
from their example here.

854
01:06:03,000 --> 01:06:04,000
The, the,

855
01:06:04,000 --> 01:06:05,000
the gist of it is that you're,

856
01:06:05,000 --> 01:06:07,000
you're, you're doing a look-up on a,

857
01:06:07,000 --> 01:06:08,000
uh,

858
01:06:08,000 --> 01:06:11,000
on an item ID to figure out what manufacturer has,

859
01:06:11,000 --> 01:06:13,000
has sold the most of it.

860
01:06:13,000 --> 01:06:14,000
Right?

861
01:06:14,000 --> 01:06:15,000
So you have this,

862
01:06:15,000 --> 01:06:16,000
like, select query here.

863
01:06:16,000 --> 01:06:17,000
I say this,

864
01:06:17,000 --> 01:06:18,000
this is,

865
01:06:18,000 --> 01:06:19,000
there's three portions here.

866
01:06:19,000 --> 01:06:20,000
There's three nested,

867
01:06:20,000 --> 01:06:21,000
uh, select queries here,

868
01:06:21,000 --> 01:06:22,000
in these different blocks.

869
01:06:22,000 --> 01:06:23,000
And then say this is the call and query,

870
01:06:23,000 --> 01:06:24,000
that's going to invoke it, right?

871
01:06:24,000 --> 01:06:25,000
And so inside of this,

872
01:06:25,000 --> 01:06:26,000
you have the,

873
01:06:26,000 --> 01:06:27,000
uh,

874
01:06:27,000 --> 01:06:29,000
you have some additional computation you're doing.

875
01:06:29,000 --> 01:06:31,000
And then for every single record within this,

876
01:06:31,000 --> 01:06:32,000
this query here,

877
01:06:32,000 --> 01:06:33,000
because you're trying to get all the,

878
01:06:33,000 --> 01:06:35,000
all the, um,

879
01:06:35,000 --> 01:06:37,000
the first 25,000 most bought items,

880
01:06:37,000 --> 01:06:38,000
then you,

881
01:06:38,000 --> 01:06:40,000
you're, you're going to book the UDF up above.

882
01:06:40,000 --> 01:06:41,000
So,

883
01:06:41,000 --> 01:06:43,000
I'm not going to go through all this,

884
01:06:43,000 --> 01:06:44,000
in a little bit of detail,

885
01:06:44,000 --> 01:06:45,000
but you think of this as like,

886
01:06:45,000 --> 01:06:47,000
the combination of the UDF,

887
01:06:47,000 --> 01:06:48,000
plus the calling SQL query,

888
01:06:48,000 --> 01:06:51,000
will get converted into a sequence of,

889
01:06:51,000 --> 01:06:53,000
of SQL queries like this.

890
01:06:53,000 --> 01:06:54,000
And you can almost treat this as,

891
01:06:54,000 --> 01:06:55,000
like,

892
01:06:55,000 --> 01:06:56,000
again, like,

893
01:06:56,000 --> 01:06:57,000
like a SQL function,

894
01:06:57,000 --> 01:06:58,000
although it has updates in it.

895
01:06:58,000 --> 01:06:59,000
Like, just think of like a macro,

896
01:06:59,000 --> 01:07:00,000
this thing would get embedded,

897
01:07:00,000 --> 01:07:01,000
when you call,

898
01:07:01,000 --> 01:07:03,000
when you call the out query like this.

899
01:07:03,000 --> 01:07:04,000
So, in the first step here at the top,

900
01:07:04,000 --> 01:07:06,000
here's that temp table we're creating.

901
01:07:06,000 --> 01:07:07,000
And inside of that,

902
01:07:07,000 --> 01:07:09,000
you see that we're declaring attributes,

903
01:07:09,000 --> 01:07:10,000
inside our temp table,

904
01:07:10,000 --> 01:07:11,000
to correspond to,

905
01:07:11,000 --> 01:07:13,000
all the variables that we defined, right?

906
01:07:13,000 --> 01:07:14,000
So, we defined about,

907
01:07:14,000 --> 01:07:15,000
a man variable,

908
01:07:15,000 --> 01:07:16,000
count one, count two,

909
01:07:16,000 --> 01:07:19,000
all those are getting defined in the,

910
01:07:19,000 --> 01:07:21,000
in the create table itself.

911
01:07:21,000 --> 01:07:23,000
But then we're also going to have this special return,

912
01:07:23,000 --> 01:07:24,000
Boolean,

913
01:07:24,000 --> 01:07:25,000
that's going to tell us whether this,

914
01:07:25,000 --> 01:07:27,000
we want the value of this,

915
01:07:27,000 --> 01:07:29,000
we want this record within this temp table,

916
01:07:29,000 --> 01:07:31,000
corresponding to a tuple that was passed into us,

917
01:07:31,000 --> 01:07:33,000
should get returned.

918
01:07:33,000 --> 01:07:36,000
Or not, right?

919
01:07:36,000 --> 01:07:38,000
So, you can sort of think as like the,

920
01:07:38,000 --> 01:07:40,000
every single tuple in the,

921
01:07:40,000 --> 01:07:41,000
the temp table,

922
01:07:41,000 --> 01:07:43,000
is going to correspond to a tuple

923
01:07:43,000 --> 01:07:45,000
that would get passed into the UDF.

924
01:07:45,000 --> 01:07:46,000
So, I have a thousand tuples,

925
01:07:46,000 --> 01:07:47,000
like a thousand,

926
01:07:47,000 --> 01:07:49,000
what is this?

927
01:07:49,000 --> 01:07:50,000
Web sales of,

928
01:07:50,000 --> 01:07:51,000
a thousand Web sale items,

929
01:07:51,000 --> 01:07:52,000
or item IDs,

930
01:07:52,000 --> 01:07:54,000
that I have a thousand items

931
01:07:54,000 --> 01:07:56,000
in my, in my temp table.

932
01:07:56,000 --> 01:07:58,000
I'm just basically updating this giant state table,

933
01:07:58,000 --> 01:08:00,000
as I go along.

934
01:08:00,000 --> 01:08:02,000
And now, when I do all my computations,

935
01:08:02,000 --> 01:08:04,000
these, these, you know,

936
01:08:04,000 --> 01:08:07,000
what was done at sort of one record at a time,

937
01:08:07,000 --> 01:08:08,000
in my original UDF,

938
01:08:08,000 --> 01:08:10,000
I can now invoke across all of the,

939
01:08:10,000 --> 01:08:12,000
the, the tuples that are being passed into the UDF,

940
01:08:12,000 --> 01:08:13,000
at the same time.

941
01:08:13,000 --> 01:08:18,000
And they're all independently updating their state table.

942
01:08:18,000 --> 01:08:19,000
And so, the way I would invoke this,

943
01:08:19,000 --> 01:08:21,000
this generate series is in SQLStandard.

944
01:08:21,000 --> 01:08:23,000
Basically, you can generate a,

945
01:08:23,000 --> 01:08:25,000
a list of numbers from one to whatever,

946
01:08:25,000 --> 01:08:26,000
or zero for whatever.

947
01:08:26,000 --> 01:08:28,000
And it's doing a lot of doing that.

948
01:08:28,000 --> 01:08:29,000
So, sort of,

949
01:08:29,000 --> 01:08:32,000
seeding the computation to invoke the,

950
01:08:32,000 --> 01:08:34,000
the, the,

951
01:08:34,000 --> 01:08:35,000
to generate the result that I'm looking for,

952
01:08:35,000 --> 01:08:36,000
and produce the output that, that I need.

953
01:08:36,000 --> 01:08:38,000
And that's equivalent to invoking it,

954
01:08:38,000 --> 01:08:40,000
the original UDF.

955
01:08:40,000 --> 01:08:41,000
Yes.

956
01:08:41,000 --> 01:08:44,000
Become a real public audience for every single,

957
01:08:44,000 --> 01:08:46,000
like, your balance is,

958
01:08:46,000 --> 01:08:47,000
I don't think that's going to work out,

959
01:08:47,000 --> 01:08:48,000
because I'm not a real guy,

960
01:08:48,000 --> 01:08:50,000
but I'm not a real public audience for every UDF.

961
01:08:50,000 --> 01:08:51,000
Same as,

962
01:08:51,000 --> 01:08:52,000
it's not going to work for every,

963
01:08:52,000 --> 01:08:53,000
work out for every UDF.

964
01:08:53,000 --> 01:08:54,000
I think it does,

965
01:08:54,000 --> 01:08:56,000
because even exceptions,

966
01:08:56,000 --> 01:08:59,000
you could handle that through the state table.

967
01:08:59,000 --> 01:09:01,000
I think it's a more generalizable than,

968
01:09:01,000 --> 01:09:03,000
than, for later, I felt.

969
01:09:03,000 --> 01:09:05,000
Uh,

970
01:09:05,000 --> 01:09:06,000
because again,

971
01:09:06,000 --> 01:09:07,000
so you,

972
01:09:07,000 --> 01:09:08,000
actually, you could,

973
01:09:08,000 --> 01:09:10,000
you could potentially handle dynamic queries,

974
01:09:10,000 --> 01:09:12,000
because you just put the string that you're

975
01:09:12,000 --> 01:09:13,000
concatenating to the SQL,

976
01:09:13,000 --> 01:09:15,000
you could put that in the state table.

977
01:09:15,000 --> 01:09:16,000
It's a little weird,

978
01:09:16,000 --> 01:09:18,000
but you could do it.

979
01:09:18,000 --> 01:09:21,000
Okay.

980
01:09:21,000 --> 01:09:23,000
So,

981
01:09:23,000 --> 01:09:25,000
I think I've already mentioned this, right?

982
01:09:25,000 --> 01:09:26,000
So the,

983
01:09:26,000 --> 01:09:28,000
these are slides from Sam from last year, right?

984
01:09:28,000 --> 01:09:30,000
So the Microsoft guys wrote the Freud paper,

985
01:09:30,000 --> 01:09:31,000
they wrote the follow-up paper to Agify,

986
01:09:31,000 --> 01:09:32,000
and then they put together the certain source bench,

987
01:09:32,000 --> 01:09:33,000
like, the SQL Procbench.

988
01:09:33,000 --> 01:09:35,000
That was, you know,

989
01:09:35,000 --> 01:09:36,000
they argued was a,

990
01:09:36,000 --> 01:09:37,000
faith representation of what the,

991
01:09:37,000 --> 01:09:39,000
what real UDFs actually looked like,

992
01:09:39,000 --> 01:09:40,000
because prior to this,

993
01:09:40,000 --> 01:09:41,000
it wasn't anything.

994
01:09:41,000 --> 01:09:43,000
And you sort of classify the,

995
01:09:43,000 --> 01:09:46,000
the UDFs into sort of two categories in the Procbench.

996
01:09:47,000 --> 01:09:48,000
The first are going to be,

997
01:09:48,000 --> 01:09:51,000
UDFs without any input parameters, right?

998
01:09:51,000 --> 01:09:53,000
So select max return,

999
01:09:53,000 --> 01:09:55,000
reason web, right?

1000
01:09:55,000 --> 01:09:56,000
Nothing gets passed into it,

1001
01:09:56,000 --> 01:09:58,000
and I'm just invoking this once.

1002
01:09:58,000 --> 01:10:00,000
And so in this case here,

1003
01:10:00,000 --> 01:10:02,000
there isn't actually any advantage using inlining or,

1004
01:10:02,000 --> 01:10:05,000
or batching because this UDF is just invoked once.

1005
01:10:05,000 --> 01:10:08,000
And there's really nothing special about it, right?

1006
01:10:08,000 --> 01:10:10,000
The ones that matter the most is you have things like,

1007
01:10:10,000 --> 01:10:11,000
where you,

1008
01:10:11,000 --> 01:10:12,000
where we told before,

1009
01:10:12,000 --> 01:10:15,000
where you are passing in some kind of input value,

1010
01:10:15,000 --> 01:10:17,000
that you're iterating over in the,

1011
01:10:17,000 --> 01:10:18,000
in the calling query,

1012
01:10:18,000 --> 01:10:20,000
in the outside, right?

1013
01:10:20,000 --> 01:10:24,000
So I think that when Sam did his analysis,

1014
01:10:24,000 --> 01:10:26,000
looking for a Procbench,

1015
01:10:26,000 --> 01:10:30,000
despite Microsoft inventing the inlining technique with Freud,

1016
01:10:30,000 --> 01:10:33,000
they could only inline a small portion of within their benchmark

1017
01:10:33,000 --> 01:10:34,000
of these queries,

1018
01:10:34,000 --> 01:10:35,000
because a bunch of them just,

1019
01:10:35,000 --> 01:10:36,000
it couldn't reason about,

1020
01:10:36,000 --> 01:10:38,000
and it wasn't able to handle it.

1021
01:10:38,000 --> 01:10:39,000
Or in some cases,

1022
01:10:39,000 --> 01:10:40,000
it did do it,

1023
01:10:40,000 --> 01:10:41,000
it didn't actually get it,

1024
01:10:41,000 --> 01:10:42,000
and it got to perform its benefit,

1025
01:10:42,000 --> 01:10:43,000
because it wasn't able to,

1026
01:10:43,000 --> 01:10:44,000
to do that decorelation.

1027
01:10:44,000 --> 01:10:45,000
The sub queries, yes.

1028
01:10:45,000 --> 01:10:47,000
The question to Sam, actually.

1029
01:10:47,000 --> 01:10:51,000
So was it because the if conditions were to complex,

1030
01:10:51,000 --> 01:10:52,000
or was it,

1031
01:10:52,000 --> 01:10:54,000
there was something that it just didn't,

1032
01:10:54,000 --> 01:10:55,000
like, there was declared set,

1033
01:10:55,000 --> 01:10:56,000
and there was something,

1034
01:10:56,000 --> 01:10:57,000
that was in DC,

1035
01:10:57,000 --> 01:10:58,000
one that they did not support,

1036
01:10:58,000 --> 01:10:59,000
Freud didn't support.

1037
01:10:59,000 --> 01:11:01,000
Yeah, so I guess,

1038
01:11:01,000 --> 01:11:02,000
and you can explain this,

1039
01:11:02,000 --> 01:11:04,000
but essentially the problem is that,

1040
01:11:04,000 --> 01:11:05,000
when you get into the,

1041
01:11:05,000 --> 01:11:07,000
and then you inline it,

1042
01:11:07,000 --> 01:11:09,000
you get a very complicated sub query

1043
01:11:09,000 --> 01:11:11,000
in a bunch of languages.

1044
01:11:11,000 --> 01:11:12,000
And then,

1045
01:11:13,000 --> 01:11:15,000
when you put that into the people sub and optimize them,

1046
01:11:15,000 --> 01:11:18,000
it's unable to be calling that sub query,

1047
01:11:18,000 --> 01:11:20,000
and then you get that in that column.

1048
01:11:20,000 --> 01:11:21,000
Oh, yeah.

1049
01:11:21,000 --> 01:11:23,000
In ways that you use the German way,

1050
01:11:23,000 --> 01:11:25,000
if you call it a sub query,

1051
01:11:25,000 --> 01:11:27,000
you can be calling any sub query,

1052
01:11:27,000 --> 01:11:29,000
and you get really good sub query to the line.

1053
01:11:29,000 --> 01:11:30,000
Yes.

1054
01:11:30,000 --> 01:11:31,000
We'll cover that.

1055
01:11:31,000 --> 01:11:34,000
We'll cover this in more detail next week as well.

1056
01:11:34,000 --> 01:11:38,000
All right, so this is the table we had in the paper,

1057
01:11:38,000 --> 01:11:41,000
that we just came out two months ago,

1058
01:11:41,000 --> 01:11:43,000
and we compared it against SQL Server Oracle,

1059
01:11:43,000 --> 01:11:44,000
DuckDB, and Postgres.

1060
01:11:44,000 --> 01:11:45,000
So Postgres, again,

1061
01:11:45,000 --> 01:11:47,000
can't handle any of these things, right?

1062
01:11:47,000 --> 01:11:50,000
Because the optimizer is not as sophisticated as the commercial ones.

1063
01:11:50,000 --> 01:11:52,000
Oracle will just ignore,

1064
01:11:52,000 --> 01:11:54,000
but in the case of here DuckDB,

1065
01:11:54,000 --> 01:11:55,000
well DuckDB got,

1066
01:11:55,000 --> 01:11:57,000
you could handle everything.

1067
01:11:57,000 --> 01:11:58,000
How's that in the case?

1068
01:11:58,000 --> 01:12:00,000
Well, because last year,

1069
01:12:00,000 --> 01:12:02,000
the SAM 721 project with two other master students

1070
01:12:02,000 --> 01:12:05,000
added support for flattening Nesr-Laddle joins

1071
01:12:05,000 --> 01:12:08,000
so that they can support the inlining and the bashing stuff

1072
01:12:08,000 --> 01:12:10,000
that we've been talking about.

1073
01:12:10,000 --> 01:12:11,000
Oh, sorry.

1074
01:12:11,000 --> 01:12:14,000
And furthermore, they actually submitted the PR to DuckDB,

1075
01:12:14,000 --> 01:12:15,000
that actually got merged.

1076
01:12:15,000 --> 01:12:16,000
When you download DuckDB,

1077
01:12:16,000 --> 01:12:19,000
you're getting SAMs and other 721 students code

1078
01:12:19,000 --> 01:12:22,000
to handle the inlining stuff, right?

1079
01:12:22,000 --> 01:12:24,000
Well, what about Microsoft, right?

1080
01:12:24,000 --> 01:12:30,000
So inlining, you can see for these select UDS in Procbench,

1081
01:12:30,000 --> 01:12:32,000
then the Microsoft benchmark base on their UDS,

1082
01:12:32,000 --> 01:12:34,000
they can only handle two of them.

1083
01:12:34,000 --> 01:12:36,000
So what's going on?

1084
01:12:36,000 --> 01:12:37,000
And the issue is that,

1085
01:12:37,000 --> 01:12:39,000
because, as Sam already said,

1086
01:12:39,000 --> 01:12:42,000
they are not as sophisticated as,

1087
01:12:42,000 --> 01:12:44,000
their approach to decorulating subquers

1088
01:12:44,000 --> 01:12:45,000
is not as sophisticated as,

1089
01:12:45,000 --> 01:12:48,000
this German approach of which we keep alluding to.

1090
01:12:48,000 --> 01:12:51,000
And so they're going to basically have these handwritten rules

1091
01:12:51,000 --> 01:12:54,000
that allow you to do the rewriting inside the query optimizer

1092
01:12:54,000 --> 01:12:57,000
for different use cases,

1093
01:12:57,000 --> 01:12:59,000
but not all of them.

1094
01:12:59,000 --> 01:13:02,000
And this paper came out in 2001.

1095
01:13:02,000 --> 01:13:05,000
It's before Freud and these computer-generated,

1096
01:13:05,000 --> 01:13:07,000
you know, monstrosity queries

1097
01:13:07,000 --> 01:13:10,000
and all these lateral drawings existed.

1098
01:13:10,000 --> 01:13:12,000
So they didn't, I guess they didn't,

1099
01:13:12,000 --> 01:13:15,000
they didn't know, these things at the time,

1100
01:13:15,000 --> 01:13:17,000
they didn't try to cover them in their rule base,

1101
01:13:17,000 --> 01:13:19,000
and they haven't updated it since then.

1102
01:13:19,000 --> 01:13:21,000
So in this case here, Microsoft is simply,

1103
01:13:21,000 --> 01:13:25,000
the sequencer, we simply can't handle the kind of monstrosity queries

1104
01:13:25,000 --> 01:13:29,000
that something like Freud or Opfel is going to generate.

1105
01:13:29,000 --> 01:13:31,000
And so the German approach,

1106
01:13:31,000 --> 01:13:32,000
which we'll see next week,

1107
01:13:32,000 --> 01:13:36,000
it can handle any possible, you know,

1108
01:13:36,000 --> 01:13:39,000
de-query relation for subquers,

1109
01:13:39,000 --> 01:13:41,000
because one, they're going to be able to,

1110
01:13:41,000 --> 01:13:44,000
there's a more DAGs instead of trees in the query plans,

1111
01:13:44,000 --> 01:13:46,000
because allows them reuse the computation

1112
01:13:46,000 --> 01:13:49,000
for one nested query for another part of a query,

1113
01:13:49,000 --> 01:13:52,000
and they'll introduce these additional constructs

1114
01:13:52,000 --> 01:13:54,000
like a dependent join to keep track of the dependencies

1115
01:13:54,000 --> 01:13:57,000
between, you know, two different ware clauses

1116
01:13:57,000 --> 01:13:58,000
from clauses and so forth.

1117
01:13:58,000 --> 01:14:01,000
And therefore they can take any possible subquery combination

1118
01:14:01,000 --> 01:14:03,000
you can think of, and throw it at the query optimizer,

1119
01:14:03,000 --> 01:14:06,000
and it'll be able to handle this.

1120
01:14:06,000 --> 01:14:09,000
Dr. Bee can do this, because they're based off of what,

1121
01:14:09,000 --> 01:14:11,000
what Umbra did, or hyper did,

1122
01:14:11,000 --> 01:14:13,000
and then Sam and his team came along and extended

1123
01:14:13,000 --> 01:14:16,000
for the lateral join stuff that we needed.

1124
01:14:16,000 --> 01:14:19,000
So that's the preview for next week, right?

1125
01:14:19,000 --> 01:14:20,000
We're going to talk about why,

1126
01:14:20,000 --> 01:14:24,000
how this works in hyper.

1127
01:14:24,000 --> 01:14:28,000
So the main takeaway, going back to, you know,

1128
01:14:28,000 --> 01:14:29,000
this table here,

1129
01:14:29,000 --> 01:14:31,000
inlining is fantastic,

1130
01:14:31,000 --> 01:14:34,000
but if your database server query optimizer can handle

1131
01:14:34,000 --> 01:14:37,000
the large queries that these things are going to spit out,

1132
01:14:37,000 --> 01:14:41,000
and few can.

1133
01:14:41,000 --> 01:14:45,000
Okay, so, again, I said this before,

1134
01:14:45,000 --> 01:14:48,000
but like this is a big deal if you can get,

1135
01:14:48,000 --> 01:14:50,000
if your query optimizer can handle the kind of things

1136
01:14:50,000 --> 01:14:52,000
that that outfell or forward is going to generate,

1137
01:14:52,000 --> 01:14:55,000
then you get a huge win for speeding up a UDS

1138
01:14:55,000 --> 01:14:58,000
without making any changes to your application code.

1139
01:14:58,000 --> 01:15:01,000
And that rarely happens in the world CS or, you know,

1140
01:15:01,000 --> 01:15:03,000
software.

1141
01:15:03,000 --> 01:15:04,000
So that's a big deal, but again, you need to be,

1142
01:15:04,000 --> 01:15:06,000
sort of, the German style, the Umbra style,

1143
01:15:06,000 --> 01:15:09,000
a de-coilation.

1144
01:15:09,000 --> 01:15:12,000
The, we talked a little bit about how to compile the machine code.

1145
01:15:12,000 --> 01:15:14,000
This is going to help some,

1146
01:15:14,000 --> 01:15:16,000
some, some performance slow down,

1147
01:15:16,000 --> 01:15:18,000
but again, since it's still going to look at a black box

1148
01:15:18,000 --> 01:15:20,000
to the optimizer, it's, you know,

1149
01:15:20,000 --> 01:15:21,000
it's not going to be the,

1150
01:15:21,000 --> 01:15:24,000
not going to get the best performance.

1151
01:15:24,000 --> 01:15:27,000
All right, any questions?

1152
01:15:27,000 --> 01:15:28,000
Yes.

1153
01:15:28,000 --> 01:15:30,000
So, this is some, some, some, some time.

1154
01:15:30,000 --> 01:15:32,000
Can I ask a question about the code that we looked at

1155
01:15:32,000 --> 01:15:34,000
for the conversion?

1156
01:15:34,000 --> 01:15:35,000
Sure, yes.

1157
01:15:35,000 --> 01:15:37,000
I mean, this one?

1158
01:15:37,000 --> 01:15:38,000
Yes?

1159
01:15:38,000 --> 01:15:40,000
No, actually the one that we do get from this,

1160
01:15:40,000 --> 01:15:41,000
the Freud example.

1161
01:15:41,000 --> 01:15:44,000
Oh.

1162
01:15:46,000 --> 01:15:48,000
So they're going, going back to like this?

1163
01:15:48,000 --> 01:15:49,000
Yeah.

1164
01:15:49,000 --> 01:15:52,000
I was thinking this might actually not be possible if we have,

1165
01:15:52,000 --> 01:15:53,000
instead of that else clause, right there,

1166
01:15:53,000 --> 01:15:54,000
the third one.

1167
01:15:54,000 --> 01:15:58,000
If we replace that else with a simple if condition,

1168
01:15:58,000 --> 01:16:02,000
like that just says if at total is less than a million,

1169
01:16:02,000 --> 01:16:04,000
I can not move here, a million.

1170
01:16:04,000 --> 01:16:08,000
In that case, if you look at the block over there,

1171
01:16:08,000 --> 01:16:10,000
it says ER2.level,

1172
01:16:10,000 --> 01:16:13,000
it won't be able to do ER2.level.

1173
01:16:13,000 --> 01:16:15,000
It will need to do ER1 or ER2,

1174
01:16:15,000 --> 01:16:18,000
depending on when that condition is true.

1175
01:16:18,000 --> 01:16:20,000
So it will become,

1176
01:16:20,000 --> 01:16:23,000
it won't easily translate from the left to the right.

1177
01:16:24,000 --> 01:16:26,000
So the statement is, if you have it now inside of this,

1178
01:16:26,000 --> 01:16:28,000
another if it's nested if calls.

1179
01:16:28,000 --> 01:16:29,000
No, not nested.

1180
01:16:29,000 --> 01:16:31,000
You should replace the else with this,

1181
01:16:31,000 --> 01:16:32,000
this is the place the else is.

1182
01:16:32,000 --> 01:16:34,000
Oh, so this if ends.

1183
01:16:34,000 --> 01:16:35,000
No.

1184
01:16:35,000 --> 01:16:36,000
Then you have another if.

1185
01:16:36,000 --> 01:16:37,000
Yes.

1186
01:16:37,000 --> 01:16:39,000
And then in that case,

1187
01:16:39,000 --> 01:16:43,000
if it's less than a million,

1188
01:16:43,000 --> 01:16:45,000
set it to regular.

1189
01:16:45,000 --> 01:16:46,000
Right.

1190
01:16:46,000 --> 01:16:48,000
And then in that case, implicitly then,

1191
01:16:48,000 --> 01:16:52,000
the value is ER1, which is null.

1192
01:16:52,000 --> 01:16:55,000
It happens, or it gets confused.

1193
01:16:55,000 --> 01:16:57,000
And that's how it's actually successful,

1194
01:16:57,000 --> 01:16:59,000
because you don't know anything about the initial.

1195
01:16:59,000 --> 01:17:01,000
More of the exhaust flow trenches,

1196
01:17:01,000 --> 01:17:03,000
and you have an initialized,

1197
01:17:03,000 --> 01:17:04,000
or a bubble action.

1198
01:17:04,000 --> 01:17:05,000
Exactly.

1199
01:17:05,000 --> 01:17:06,000
How will it happen?

1200
01:17:06,000 --> 01:17:07,000
But the initial,

1201
01:17:07,000 --> 01:17:09,000
the level is initialized as null.

1202
01:17:09,000 --> 01:17:12,000
At the top, so you just manage to return null.

1203
01:17:17,000 --> 01:17:18,000
Okay.

1204
01:17:18,000 --> 01:17:20,000
You see what I know that is that ER2,

1205
01:17:20,000 --> 01:17:21,000
right?

1206
01:17:21,000 --> 01:17:22,000
Yes.

1207
01:17:22,000 --> 01:17:23,000
One problem is that ER2.

1208
01:17:23,000 --> 01:17:24,000
No, I'm getting that.

1209
01:17:24,000 --> 01:17:25,000
Yes.

1210
01:17:25,000 --> 01:17:29,000
That one will have some full-length change.

1211
01:17:29,000 --> 01:17:30,000
Yeah, that's okay.

1212
01:17:30,000 --> 01:17:31,000
You can call it ER1.

1213
01:17:31,000 --> 01:17:35,000
But that's not the logic that the UDF would

1214
01:17:35,000 --> 01:17:37,000
be trying to represent here, right?

1215
01:17:37,000 --> 01:17:39,000
So if level less than a million,

1216
01:17:39,000 --> 01:17:41,000
set the regular, right?

1217
01:17:41,000 --> 01:17:45,000
So that would just be similar to this.

1218
01:17:45,000 --> 01:17:46,000
Right.

1219
01:17:46,000 --> 01:17:49,000
I see what you're saying,

1220
01:17:49,000 --> 01:17:50,000
because there would be...

1221
01:17:50,000 --> 01:17:52,000
It's changed in ER2.

1222
01:17:52,000 --> 01:17:54,000
And we want to activate ER2 if...

1223
01:17:54,000 --> 01:17:55,000
Yeah.

1224
01:17:55,000 --> 01:17:56,000
The division is true.

1225
01:17:56,000 --> 01:17:58,000
Or we want to access ER1.

1226
01:17:58,000 --> 01:17:59,000
Level if a different division.

1227
01:17:59,000 --> 01:18:01,000
I understand your point.

1228
01:18:01,000 --> 01:18:04,000
Do you get to imagine...

1229
01:18:04,000 --> 01:18:05,000
I don't know if it does this.

1230
01:18:05,000 --> 01:18:08,000
Do you get to imagine it's combining them if and else?

1231
01:18:08,000 --> 01:18:09,000
I can't guess it.

1232
01:18:09,000 --> 01:18:10,000
Go for it.

1233
01:18:10,000 --> 01:18:11,000
Yes.

1234
01:18:11,000 --> 01:18:14,000
So basically the idea is you'll have one table

1235
01:18:14,000 --> 01:18:16,000
which will have the column with normal.

1236
01:18:16,000 --> 01:18:17,000
Right.

1237
01:18:17,000 --> 01:18:19,000
And then you have another table,

1238
01:18:19,000 --> 01:18:20,000
which is going to say,

1239
01:18:20,000 --> 01:18:22,000
okay, if this condition is true,

1240
01:18:22,000 --> 01:18:24,000
then it's just due to our use.

1241
01:18:24,000 --> 01:18:27,000
Otherwise, it's the level from the previous table.

1242
01:18:27,000 --> 01:18:28,000
Right.

1243
01:18:28,000 --> 01:18:31,000
And you can follow and currently keep doing this.

1244
01:18:31,000 --> 01:18:34,000
So each thing is just a region that returns to the column

1245
01:18:34,000 --> 01:18:35,000
from the previous table.

1246
01:18:35,000 --> 01:18:38,000
So it's basically doing the opposite.

1247
01:18:38,000 --> 01:18:40,000
Okay.

1248
01:18:40,000 --> 01:18:42,000
And use another case within this lecture.

1249
01:18:42,000 --> 01:18:44,000
We can choose between those.

1250
01:18:44,000 --> 01:18:45,000
Okay.

1251
01:18:45,000 --> 01:18:46,000
Right.

1252
01:18:46,000 --> 01:18:47,000
Okay.

1253
01:18:47,000 --> 01:18:48,000
We are over time.

1254
01:18:48,000 --> 01:18:51,000
So let me jump to...

1255
01:18:51,000 --> 01:18:53,000
All right.

1256
01:18:53,000 --> 01:18:54,000
So next class, which is what...

1257
01:18:54,000 --> 01:18:55,000
Debate is doing the conducting protocols.

1258
01:18:55,000 --> 01:19:00,000
And the reason why I'm doing this after UDS is because this UDF idea is like,

1259
01:19:00,000 --> 01:19:02,000
okay, I have my application logic.

1260
01:19:02,000 --> 01:19:04,000
Let me try to embed that in the database server.

1261
01:19:04,000 --> 01:19:06,000
The arrow guys and ductyb guys are saying,

1262
01:19:06,000 --> 01:19:08,000
no, no, no, no, it's actually the opposite.

1263
01:19:08,000 --> 01:19:12,000
Embed your database system inside of your application.

1264
01:19:12,000 --> 01:19:16,000
And then use something like arrow to get the data in and out very quickly.

1265
01:19:16,000 --> 01:19:17,000
Okay.

1266
01:19:17,000 --> 01:19:20,000
So the paper you'll read is from the ductyb guys.

1267
01:19:20,000 --> 01:19:23,000
I think it's on Monday to be like, before ductyb was invented.

1268
01:19:23,000 --> 01:19:27,000
But it's basically showing how terrible existing networking protocols are for database servers

1269
01:19:27,000 --> 01:19:30,000
and how that, for OLAB queries, it's not the ideal.

1270
01:19:30,000 --> 01:19:35,000
And then we'll see how arrow will fix this and then another project out of size.

1271
01:19:35,000 --> 01:19:37,000
So, I'm going to project out of Simon Frage of University.

1272
01:19:37,000 --> 01:19:38,000
Okay?

1273
01:19:38,000 --> 01:19:39,000
All right guys.

1274
01:19:39,000 --> 01:19:40,000
See ya.

1275
01:20:05,000 --> 01:20:07,000
Okay.

