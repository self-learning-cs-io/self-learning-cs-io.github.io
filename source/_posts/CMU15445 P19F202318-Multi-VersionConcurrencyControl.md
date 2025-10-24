---
title: CMU15445 P19F202318 Multi VersionConcurrencyControl
---

1
00:00:00,000 --> 00:00:28,480
So, all right, that's good.

2
00:00:28,480 --> 00:00:32,480
Thank you for that and any announcements that you have?

3
00:00:32,480 --> 00:00:36,480
I'm DJing on Friday for the Diwali party at 1U.

4
00:00:36,480 --> 00:00:39,480
Okay. By the way, I'm sold out now.

5
00:00:39,480 --> 00:00:42,480
If you can get tickets, please do the monthly high to me.

6
00:00:42,480 --> 00:00:48,480
Okay, that sounds great. It's sold out, but you have a few Swift Lite tickets in the back that you said on the secondary market.

7
00:00:48,480 --> 00:00:52,480
Yeah. Okay.

8
00:00:52,480 --> 00:00:54,480
Okay, that sounds great.

9
00:00:54,479 --> 00:00:58,479
So, let's get started. We have a bunch to cover.

10
00:00:58,479 --> 00:01:09,479
I'm going to start by going back to the OCC stuff that we rushed through in the last class and a few things that are needed to go correct from that.

11
00:01:09,479 --> 00:01:14,479
First thing is, let's go back to this chart over here.

12
00:01:14,479 --> 00:01:18,479
I've updated the slides to correct one of the arrows in the figure.

13
00:01:18,479 --> 00:01:23,479
It didn't change in a big material way, but to be true to what was present over there.

14
00:01:23,480 --> 00:01:29,480
Let's see if we can understand why this works. Remember, there were three conditions.

15
00:01:29,480 --> 00:01:35,480
And when a transaction is in the validation phase, it checks against these three conditions.

16
00:01:35,480 --> 00:01:43,480
And the best way to think about this is that the ultimate check that needs to happen is between two pairs of transaction, T, i and T, j.

17
00:01:43,480 --> 00:01:47,480
And i is checking with all j's that are in the future.

18
00:01:47,480 --> 00:01:51,480
Right? So, it's just looking at it from that direction. If everyone does that, everything works out.

19
00:01:51,480 --> 00:02:02,480
So, the first part of that, and some of that was a little confusing in the last class because I skirted on the issue of precisely when some of these transaction IDs get assigned.

20
00:02:02,480 --> 00:02:18,480
But the first part of that is that T i and T j are assigned these transaction numbers so that i precede j in the equilibrium and cvl schedule that we are trying to enforce with this protocol.

21
00:02:18,479 --> 00:02:24,479
So, effectively, let's start from the bottom here, case 3, which is in some sense the most difficult case.

22
00:02:24,479 --> 00:02:31,479
But it's the arrow is from the end of the read phase of T i, which is kind of when the transaction work all ended.

23
00:02:31,479 --> 00:02:35,479
Right? The rest of it is, can I commit and stuff like that?

24
00:02:35,479 --> 00:02:42,479
So, T i to T j goes in that direction. This means that the read right dependencies are all going from i to j. Right? Just by that.

25
00:02:42,479 --> 00:02:52,479
Because the right phase of T j is going to come way later. So, the objects only become visible in the global database to anyone else when the right phase happens.

26
00:02:52,479 --> 00:03:01,479
Remember, in OCC, all the changes are being made to the local copy of the objects. Right? So, this becomes trivial.

27
00:03:01,479 --> 00:03:15,479
We can't really from just this schematic diagram to say anything about the other two anomalies, the WR and the WW.

28
00:03:15,479 --> 00:03:21,479
And so for that, we are going to in the validation phase check that those two sets don't intersect.

29
00:03:21,479 --> 00:03:27,479
So, if you understand this part, the rest of it follows, it sort of gets weaker in terms of the checks you have to do.

30
00:03:27,479 --> 00:03:36,479
Because if you say the right phase follows the right phase, you can basically not have to check the WW because that is implicit by the definition of that condition.

31
00:03:36,479 --> 00:03:42,479
So, what it means is that if transaction i is getting ready to commit, it will say, what are all the j's that I need to worry about?

32
00:03:42,479 --> 00:03:47,479
And there's some state kept in the system that keeps track of all the active transactions.

33
00:03:47,479 --> 00:03:57,479
So, I will and transactions get assigned these transaction IDs. So, I know it needs to only go check from its point on to everything that is in the future.

34
00:03:57,479 --> 00:04:02,479
And that future, every transaction at some point gets assigned a transaction ID.

35
00:04:02,479 --> 00:04:08,479
And that comes from as we talked about transaction IDs get assigned by the simplest ways. There's a global counter.

36
00:04:08,479 --> 00:04:16,480
Everyone does an atomic increment to that and gets a transaction ID. So, I know everyone that it needs to go and be concerned about.

37
00:04:16,480 --> 00:04:23,480
And then it does that check. The other two checks are easier. So, if you get case three, the rest of it will just follow from that.

38
00:04:23,480 --> 00:04:34,480
And thanks for pointing out that arrow bug from that paper that certainly helps, but it also made sense to start from case three rather than case one.

39
00:04:34,480 --> 00:04:39,480
And if you get that, everything is simpler.

40
00:04:39,480 --> 00:04:53,480
All right. So, we're going to keep marching on. The second thing I want to mention is I've told a couple times over the last few weeks that 721, the advanced database class is going to cover advanced transactions.

41
00:04:53,480 --> 00:05:01,480
That is not true. Two years ago, that's what 721 did. I know many of you are starting to figure out what to register for.

42
00:05:01,480 --> 00:05:12,480
But the earlier version of that this year in spring of 23 was all analytics. And the coming version is also going to be all analytics.

43
00:05:12,480 --> 00:05:24,480
Now, that means if you are still interested in transactions and things like that, if you want to pursue something, you can still do some sort of undergraduate research project come talk to me and Andy and we can figure that out.

44
00:05:24,480 --> 00:05:34,480
That's really where your heart is in. But I do want to correct if you're registering for 721. It's going to follow the curriculum of spring 23. So, it's going to be all analytics.

45
00:05:34,480 --> 00:05:44,480
Questions on that. I know that came up multiple times in questions even after class, especially after last class.

46
00:05:44,480 --> 00:05:58,480
All right. So, we are going to go and look at the rest of the OCC in relative quick relatively quickly.

47
00:05:58,480 --> 00:06:07,480
So far, we've looked at that read phase. We were in that validation phase, which is what that diagram is. A transaction has validated itself.

48
00:06:07,480 --> 00:06:19,480
And now is ready to say I've been given the green signal to write all my stuff to the global database. And it's only when you write your stuff all of that was happening in the local copy will it become visible to everyone else.

49
00:06:19,480 --> 00:06:27,480
So now multiple transactions could be entering the right phase at the same time.

50
00:06:27,480 --> 00:06:42,480
And you want to make sure correct things happen. I'm going to only go through it at a very high level here. There's a full fleshed paper on this that I put a copy of that the exact paper that refers to that was the htconk paper.

51
00:06:42,480 --> 00:06:49,480
You saw the image in the slides. So, you should go and read that paper if you want more details of what I'm going to tell you next.

52
00:06:49,480 --> 00:06:59,480
So, I'm certainly happy to talk about it offline. So, the simplest way to get correctness in the right phase is to say we are all going to have a serial order of doing the rights.

53
00:06:59,480 --> 00:07:08,480
And any transaction that wants to get into the right phase is going to grab a latch in memory and say I'm the one that's writing everyone else, please wait for me.

54
00:07:08,480 --> 00:07:16,480
It finishes all the rights which we take a long time because the transaction may have updated a million objects and now it has to write it out to disk.

55
00:07:16,480 --> 00:07:34,480
And once it is done, the other transactions can proceed. This advanced protocol that allows parallel rights to happen and at a very high level what it's going to do is going to play off that condition three and say I'm doing a lot of these checks between the read and write sets.

56
00:07:34,480 --> 00:07:43,480
And it's going to even do a couple things where it's going to delay the transaction number assignment and the readers will not even get a transaction number.

57
00:07:43,480 --> 00:07:52,480
So, this means there are fewer transactions to check against if you're a writer because it's sort of like reads go free and we'll hit that theme again as we talk about NBC which is the bulk of today's lecture.

58
00:07:52,480 --> 00:08:02,480
And then even for the writers, you will go make that check happen in succession without being in a critical section for as long as you can avoid doing that.

59
00:08:02,480 --> 00:08:11,480
So, effectively some of the ideas that are mechanisms that apply in other places too is if a lot of us are writing together and we are rights could interfere with each other.

60
00:08:11,480 --> 00:08:19,480
If we establish some sort of an order saying I'm going to go always every object has an object ID and we are always going to go from the low to the high.

61
00:08:19,480 --> 00:08:28,480
You can start to play games where you can start to do quote unquote unsafe stuff with the right but not get into each other's way because you're establishing a certain order.

62
00:08:28,480 --> 00:08:39,480
I just leave it at that. I know you probably have a million questions. I'll take that offline but there's a you know it takes about 30, 40 minutes to go and really deeply understand that battle coming protocol.

63
00:08:39,480 --> 00:08:48,480
The main thing I want you to know is that the right phase itself you need parallelism and if you're not careful all the work that we did in validation we can't just override each other's stuff right.

64
00:08:48,480 --> 00:09:06,480
If ti finishes before tj ti's right set has to be written before tj's because you don't want the other way around because that would basically mean that some later transaction some newer transaction some older transaction over rights and newer transaction right so you have to follow that order.

65
00:09:06,480 --> 00:09:33,480
Okay so optimistic on currency control versus pessimistic on currency control this I do want you to understand and fair material for exam right intent is when do we think one works better than the other so there are tradeoffs as with every of these mechanisms that we've been talking about see optimistic on currency control doesn't do locking.

66
00:09:33,480 --> 00:10:02,480
And as a result it can start to do really well when locking would have become the bottom like in having the transaction do its work but the cost that it has to pay is that it's it's going to make a whole bunch of copies of that data set and that's going to be expensive as I alluded to the transactions that are read only can actually go through without getting in the way of everyone else and they can pass behind even writers and this will you'll see MVCC which is similar traits.

67
00:10:02,480 --> 00:10:31,480
Of it's a mechanism it's not a full flesh concurrency control mechanism it will get paid with other things like OCC and 2PL and things like that but the same kind of things of allowing readers to go through will apply right so essentially all these copies are going to get expensive so if I have a workload in which there are lots of updates happening and the updates are happening to large portions of the database obviously OCC is going to run into trouble because it's going to have to make all of those copies.

68
00:10:31,480 --> 00:10:52,480
For the more if there are real conflicts between these transactions real conflicts you can't avoid that which means some of bots need to happen in OCC if that validation phase have to abort the work and imagine I've done the work I've been I'm a transaction I've been running for an hour I've made a ton of changes I go to validate have to throw all that work away.

69
00:10:53,480 --> 00:11:12,480
In the two phase locking the pessimistic approach all of that wasted work doesn't happen because the first time to transactions try to step on each other's toes we'll stop them right we'll stop them the downside is you are acquiring locks all along and you read locks and S locks and here you can kind of make readers just pass by.

70
00:11:12,480 --> 00:11:30,480
So that's the trade off and in some workloads this is going to be better some workloads the pessimistic approach is going to be better right depend upon specifically these types of characteristics how much contention is there and how much work to you have to undo if there's contention and do abort a transaction.

71
00:11:30,480 --> 00:11:57,480
I just want to track one to a fourth happen. No it can happen like I face validation for two PL a bots can happen when you have dead locks yep exactly yeah yeah and I'm scouting a little bit sometimes if you have locked upgrades and stuff like that and you're trying to do funky stuff then there might be other reasons for it but by and large into PL the a bots will be on the dead locks.

72
00:11:57,480 --> 00:12:09,480
Yeah and cascading a bot right we talked about that but let's leave that aside but those there was a the other tricky situation but that's where the abort caused other problems to happen.

73
00:12:09,480 --> 00:12:38,480
All right we have so far as you in everything we've been talking for about two weeks now that we have database objects that are real they're physical like pages and records that we are doing something with making a copy of or acquiring locks on but in real life you can also have transactions that are creating new things we have completely scorted the issue of what happens when something is getting created.

74
00:12:38,480 --> 00:12:51,480
We've kind of pushed aside on the site and by and large everything we talked about with locking and stuff like that will work but there's an interesting problem that comes into play when you have creating you have to worry about one more thing that we haven't worried about so far.

75
00:12:51,480 --> 00:13:19,480
We talked about the different anomalies that we have unrepeatable reads and dirty reads and all that all that kind of stuff there's one more anomaly that we have to now worry about and then anomaly has to do with the fact that all these protocols are doing things on physical objects that are present in the database and so if there's a transaction that's creating new stuff you will never have seen it and we're trying to acquire a lock of making copies so let me illustrate that with an example.

76
00:13:19,480 --> 00:13:47,480
So here are two transactions now instead of having read write calls is I've just put the sequel query in there and you can kind of see what's happening there the first sequel query is trying to find how many records are there in this people's table with the status call it and it's going to repeat that after a little while but in between a new record got created that new record should be in the answer but the first query is not going to see it because when it ran that record is going to be a new record.

77
00:13:47,480 --> 00:14:09,480
Because when it ran that record didn't exist when this then runs again this exists now that could have grabbed a read level lock on all the pages or records and this would follow two faced locking protocol if the locking was done at that granularity of pages or records and you would essentially get the wrong answer.

78
00:14:09,480 --> 00:14:22,480
Now if the locking were all done at the database or the table level for this query it would be fine but then you're not going to have that granular locking right we were trying to get this granular locking to allow parallelism to happen.

79
00:14:23,480 --> 00:14:45,480
So this is called the phantom problem and the reason why it's called the phantom problem is you know here for example assume the first query returns 99 the second one should have returned should return a will return 100 and that just feels like that is obviously not serialized about the repeatable read type of semantics is basically getting violated.

80
00:14:46,480 --> 00:14:52,480
So does that make sense? I'm sure it is not.

81
00:14:56,480 --> 00:15:14,480
Yeah yeah yeah yeah so what exactly counts as a transaction and you talked about this a few times before it's worth repeating a transaction you can in SQL actually put in an explicit begin call right a bunch of SQL queries and end it with a commit or in a bot you could even put an explicit a bot so that's the other case you might have an explicit a bot.

82
00:15:15,480 --> 00:15:31,480
Or if you don't put that in your SQL assignments you never put a begin and a commit in the assignments that you did so far in which case this database engine when implicitly put the begin at the start of the SQL query and put a commit at the end of it.

83
00:15:31,480 --> 00:15:40,480
Okay unless you get a bot it for all these reasons we talked about so these are explicit transaction boundaries that get put into the system.

84
00:15:45,480 --> 00:16:14,480
Got it yeah yeah so the question is can I if I understood your question correctly can I write an application code says begin and then do a nested begin transaction the answer is no there are models that allow you to do these types of nested transactions but in practice you can only do one begin you can do these things called save points that we talked about we say begin save point save point save point so when you say oops I want to roll back something explicitly in the user transaction you can say roll back only to the last save point.

85
00:16:15,480 --> 00:16:34,480
Or the second last or the third last save point so you won't explicitly nest that database systems can't quite do that but it's not they can do that there been models that will use that type of idea in other ways but SQL and practical database systems will not let you nest it in that way was there a question here.

86
00:16:34,480 --> 00:17:03,480
Maybe it was the same one okay alright so you get why this happened this happened because the first transaction was locking only existing records and it didn't see it won't see the new record that is getting created after it started to run even if you're using OCC is going to make copies of everything it has read it's just going to read from that because it thinks that's all the records that corresponded with that status is equal to net.

87
00:17:03,480 --> 00:17:23,480
So OCC two face commit both of them two face locking sorry will both have this problem where they will face the phantom with all the mechanisms that we talked about so far okay so we need a little bit more if you want to prevent this type of a problem this type of an anomaly to happen.

88
00:17:23,480 --> 00:17:35,480
Can you think of what might be ways we might avoid this.

89
00:17:35,480 --> 00:18:04,480
Yeah exactly but the question is how do you know that someone else is going to be interfering with you so does that mean so the answer was if the first transaction required a table level lock a shared lock then this wouldn't happen you're absolutely right but how do I know when I should not do that or should I always do that if I always do it then I don't have as much parallelism as I want in the system.

90
00:18:04,480 --> 00:18:21,480
Yeah no no I get that but what I'm saying is if the protocol we change the two face locking protocol to say you will always grab an S lock on the table and you will not do any find a granularity of locking then you reduce the parallelism in the system.

91
00:18:21,480 --> 00:18:23,480
So that is not what I was saying.

92
00:18:23,480 --> 00:18:30,480
Yeah the reason means to say that whenever you're trying to insert something you take a right lock on the path.

93
00:18:30,480 --> 00:18:41,480
Got it okay okay sorry I missed her what you said so you're saying when I'm trying to write something I should grab a read lock on the table on the original table that I'm reading.

94
00:18:41,480 --> 00:18:49,480
Yeah on the right lock but that means if a reader is in progress I will have to solve.

95
00:18:49,480 --> 00:19:05,480
Yeah so I was just going to go to that compatibility matrix let me see if I can find it really quick otherwise you know basically these are all the games that you could play in that the right lock will basically not be allowed right because even if I have an IS lock I think it was in the previous text so I'm just going to let it go.

96
00:19:05,480 --> 00:19:18,480
So that would run into trouble because you are now going to that update will not happen right here what we are trying to do is to is to see what happens when we want to allow maximum parallelism in the system.

97
00:19:18,480 --> 00:19:31,480
So we don't want to take so harsh an approach like put a right lock for even one record update because that means I'm blocking everything off and that transaction is doing more locking out more areas of the database and you need to.

98
00:19:31,480 --> 00:19:46,480
But you are on the right lines that we can do something akin to that right so there are you can logically do stuff like that and the way you could logically do that and get around that is is this thing called predicate locking but let's start with the re execute scans.

99
00:19:46,480 --> 00:20:00,480
Yep question the database objects like records and just think of it as records for now.

100
00:20:00,480 --> 00:20:14,480
So if you had no updates right why did we start out on this that saying we have a dynamic database in which new inserts are coming in or things are getting deleted.

101
00:20:14,480 --> 00:20:43,480
So far everything we talked about updates to an existing record is allowed but if I the example I showed you for the phantom was with an insert same thing will happen for a delete so if you have inserts and deletes then you start running into trouble and so that's kind of what we are trying to prevent so one way to do that there are three approaches and this is going to be the theme throughout today's lecture and and the next lecture is for every little problem there will be multiple mechanisms they're going to have trade offs and so the first scheme is to say.

102
00:20:43,480 --> 00:21:12,480
I whenever I have to go finish the transaction I will go and reread all the stuff that I needed to read as specified by the query and check if I got the same thing so this is easiest if you have OCC because I keep track of all the objects I've read so when I'm done I will go and reread it i'm done imagine I'm in the validation face and just as I'm trying to get into the validation face I will go read read everything and say whoops is my reach set changed from.

103
00:21:12,480 --> 00:21:29,480
What I did when I actually ran this stuff if so then you're going to say that set up happen there's the and we'll talk about that in a little bit more detail in the next slide predicate locking says this would not have happened if I just keep in track of all the predicate status is equal to lit and anyone who tries to write.

104
00:21:30,480 --> 00:21:41,480
That covers the records logically by the specification of the predicate I need to do some special handling for that so predicate locking is the first solution that was proposed when the spantom problem was detected in the 17th grade.

105
00:21:42,480 --> 00:21:51,480
So I'm not going to use these but as we'll talk about it it's really hard to do and no one does it because it's an NP complete problem it's bullying satisfiability for those of you who are theoreticians.

106
00:21:52,480 --> 00:22:08,480
The approach that end up getting used is to use an index lock and we have to make changes to how we allow we use the index to go do this locking because an index points to actual things but it can point to ranges of things so it kind of can simulate a predicate lock.

107
00:22:08,480 --> 00:22:11,480
So let's just jump into these details and see how this works.

108
00:22:11,480 --> 00:22:26,480
The simplest part way to do this is to re-execute the scan as we talked about I just go re-read stop and say is it exactly what I saw when I read it in that case that we looked at the second time we go and re-read that table we'll see something different.

109
00:22:27,480 --> 00:22:37,480
In that case it was an update but it was a delete we will see that and we'll say whoops can't go ahead and do this if I want phantom protection I'm basically stuck and I'll have to stop.

110
00:22:38,480 --> 00:22:59,480
But that requires an expensive check that re-execute requires an expensive check going through the system and the place where this gets used is there is a subclass of transactional systems that work on data that sits in memory because practically today you can get like a photo terabyte main memory server and a lot of even big heavy weight.

111
00:22:59,480 --> 00:23:25,480
Transactional workers can just be in memory so this in memory OLTP is a big thing just talking to some of the folks at Oracle recently at a retreat that's kind of very ran to after the class and you'd be surprised a four or eight rack Oracle system is what runs massive things like the New York stock exchange it's not a big cluster large memory small cluster that runs that.

112
00:23:25,480 --> 00:23:54,480
And I know we won't talk about it in the advanced database class but I'm happy to do this offline is a really cool paper that's a transactional systems if you add more notes actually get slower and you can prove that they get quadratically worse unlike analytics system where if I add more notes I can do partitioning and all this stuff and I can get faster there's a huge incentive to keep fewer nodes in an analytic system because more things trying to do stuff start to get into each other's way and that contention and having to resolve that.

113
00:23:55,480 --> 00:23:58,480
Cross quote radically.

114
00:23:58,480 --> 00:24:11,480
I'll leave it at that and happy to talk about that offline so the re execute scan works for when your data is in memory because it's much faster right if you're going to disc you'd be waiting a long time to re execute the scan.

115
00:24:11,480 --> 00:24:40,480
The golden way to do this is through predicate locking which is to say every time I have a query so I look at the warehouse of the select I look at the warehouse of my update in certain delete queries these are the ones that are trying to make changes and imagine I could look at all of those predicates and resolve by just looking at the predicate logically do the interfere if yes I can actually go solve this problem by just looking at the predicate and that's beautiful because I really don't need to mess around with this.

116
00:24:40,480 --> 00:25:09,480
I need to mess around with objects and lock tables and stuff like that I can just look at the query predicates now this turns out to be really hard to do because just checking for overlap between the predicates because the predicates could be complex right you could have conjunctions disjunctions in the warehouse turns out to be the same as a sat problem obviously that's pretty hard and most people don't do that though this was the original solution that was proposed.

117
00:25:09,480 --> 00:25:38,480
So this is a new system not new anymore but it's a really cool system that came out of Germany has this notion of predicate lock and one of my students who is just graduating had worked on using predicate locks in a limited setting for OLTP recognizing that they have a certain structure and because they have a certain structure you can actually do predicate locking for an important class of OLTP workloads but not completely in a general way that the general way still requires solving this sat problem was there a question.

118
00:25:39,480 --> 00:26:08,480
Yeah, you'll do that separately and so the question there's the other part and this will again go maybe an offline discussion if you could do predicate locking correctly you may not need the other types of locks and you know we discussed that in that paper but we could only get a limited class of OLTP working with it was a class that we didn't think could be made to work before but in the general case it is still super hard that's why no one uses it but happy to talk to you offline about that or point you to that paper.

119
00:26:08,480 --> 00:26:26,480
So how intuitively how is predicate lock and going to work you're going to have to create some sort of a structure to find out which predicate is overlap one very simple thing is to say imagine I'm creating like a two dimensional structure or some sort of a hierarchical structure we'll just take a hierarchical structure here.

120
00:26:26,480 --> 00:26:56,480
The first query here says the predicate is simple it just status is equal to let right I have no conjunction and disjunctions but we know that that's what happens in real life and a lot more complexity comes in so just taking to the simple example I can say everything that I'm doing is is this predicate so all the it's effectively like defining that range for it and then the second predicate that comes in is a subset of that so that's what you're trying to determine like what is a subset of each other where that overlap is and just doing it one predicate is

121
00:26:56,480 --> 00:27:25,480
sounds pretty easy but imagine doing it with conjunctions and disjunctions in the general case that's where all the hardness comes in but in the simple case you'd say OK I see status is a field and on that there are different predicate status is equally lit is one of the predicate and status fields and then within that I'm a subset of that so I can say oh the first query covers the sets of records that I am touching anytime there's a lot of things.

122
00:27:26,480 --> 00:27:46,480
So in the overall it's unsafe right the red stuff is the dynamic database update insert or delete query and you can start to make these checks so you get this general idea that you can do this with predicate locking but it is a very hard problem right so doing this predicate chalk system yep question

123
00:27:46,480 --> 00:28:15,480
how many locks do you have so in this case I'm just showing the predicates ignore the lock as being a lock it's just the predicate so it's not like you're grabbing a lock on the predicate per se it is called predicate lock you're simulating that by basically saying I'm covering this range so you can imagine this data structure not sitting in a lock table type of a structure but sitting in the traditional lock table that we talked about but in some sort of a predicate lock table in which it is keeping track of these data structures so it's not a lock table entity in the traditional way that we've talked about so far.

124
00:28:16,480 --> 00:28:19,480
Great yep.

125
00:28:25,480 --> 00:28:43,480
Yeah just hold on to that question for a little bit you could certainly view it in that way and you can and effectively the way to evolve is that people said can we try to make predicate locking working and realize oh my gosh yeah we are not going to prove it is equal to np or make the database system so slow that can never come back.

126
00:28:43,480 --> 00:28:58,480
So index locking is a cheap way of doing predicate locking with a little bit of more complexity than this but it becomes practical that's that's a short answer and you'll see that in a second other questions yep.

127
00:28:58,480 --> 00:29:11,480
Yeah what happens if the reexecute scans don't match yep you were then aboard that's correct yep other questions.

128
00:29:11,480 --> 00:29:19,480
I was wondering if we actually can't get it but for the people you can say it's like a full stack of checks so we can take it.

129
00:29:19,480 --> 00:29:44,480
Yeah yeah so what happens if I insert the object and delete the object assume objects have an object ID that you can hold on to for simplicity and so there'll be some we'll come to a version of that when we talk about NBC see as to what happens if it's the same record got deleted and got reborn again the values are the same but you know it's a different record what do I do with it so hold on to that the mechanisms are going to be similar to what we just talk about in a bit yeah.

130
00:29:44,480 --> 00:30:13,480
Okay all right so that's predicate locking awesome idea very hard to do now we get to how people actually do it and you're going to muck around with the beatries okay and immediately I'm going to tell you that if you don't have a beatry on the predicate you're trying to protect you can do this so you'll have to build a beatry on all the predicate that show up that you want to protect with the predicate lock otherwise you have to do stuff like this which is grabs things at the table level X and S locks to do that.

131
00:30:13,480 --> 00:30:39,480
So assume for now that every predicate of interest that is that we're trying to protect against the phantom has a beatry on it okay and so with that we're then going to go into the next lock and by the way that's not an unreasonable assumption because O L T P workloads often tend to have updates the warehouses in the update in certain deletes are usually going to be along very specific keys.

132
00:30:39,480 --> 00:31:08,480
I'm updating the record the home address of a customer ID your shopping cart application is going to have where customer ID is equal to one that you present it's basically going to be that so it's not even if the customer record has hundreds of columns in it it's basically coming down on these update queries on one or two columns right so it's not unreasonable to say that you're going to have these beatries okay and these beatries also help because it helps you identify in this case the customer ID of interest that's what trees do so it kind of matches nice.

133
00:31:09,480 --> 00:31:21,480
So I just need that you're going to have this synergy happen with this index okay but you need the index to do everything we are going to talk about next so.

134
00:31:21,480 --> 00:31:38,480
Remember now is been a while more than a month but hopefully still remember the beatries right they have at the lead node it looks like a sorted keys and of course with the keys we are pointing out to the records right so not showing the pointers over here but they represent ranges.

135
00:31:38,480 --> 00:32:07,480
And now we know how to do physical locking also we know how to read physical things in OCC and stuff we know how to make all of this work with physical stuff the problem is this ghost record that showed up in the example we don't know how to protect against that so if you know how to do physical stuff imagine a lock table so far was saying I can lock a page I can lock a record I can lock a table can also say I can lock a key in a beatry right so we can easily make that extension in the lock table it's a new type.

136
00:32:07,480 --> 00:32:10,480
And you type of thing that is lockable.

137
00:32:10,480 --> 00:32:22,480
Okay so now what you can say is I can actually grab a lock on the key 14 which is in the index that protects anyone else from touching key 14.

138
00:32:22,480 --> 00:32:36,480
While I'm working on it I'll grab it as I'm standing the index doing my range predicate and as I touch each of the keys I'm going to grab put locks around someone else try to do something in that key it won't work immediately you're going to say this doesn't solve the problem.

139
00:32:36,480 --> 00:32:53,480
This doesn't solve the problem because the problem is not the key itself but the stuff between the keys that didn't exist so I've got 14 and 16 and someone's trying to insert 15 what I just told you won't work so I have to also protect the gaps and this is really cool type of lock that's called a gap lock.

140
00:32:53,480 --> 00:33:03,480
Okay so I can acquire a gap lock that says whatever is the gap after 14 that I'm protecting.

141
00:33:04,480 --> 00:33:21,480
Okay and now we're going to do a little bit more and we're going to do this thing called the key range lock so we're going to take those doing gradients we can lock keys and you can lock the gap between keys bring it home and we'll do these key range locks so imagine.

142
00:33:21,480 --> 00:33:45,480
In the simple example we had where status is equal to let just the key lock would work right because there wasn't a range but now let's make the example a little bit more complicated and say the regular SQL query the select query was trying to do read all records between 14 and 16 and we didn't want a record 15 to show up in middle because that might cause that same Phantom problem that we discussed.

143
00:33:45,480 --> 00:34:14,480
So what we'll do is we'll do a key range lock which is the key 14 and everything that is to the right of it okay that's called a next key lock and logically what it says I'm locking 14 but it's a different special type of a lock that says is 14 and everything that is to the right of me till real value shows up and if I wanted to if my predicate was let's say 12 to 16 or greater than 14 I will grab 14 16 and everything after that right so I can.

144
00:34:15,480 --> 00:34:27,480
Depends on whatever range I want and effectively this saying it is inclusive of 14 and exclusive interval of 16 so anything between 14 and just shy of 16 right that's the range.

145
00:34:28,079 --> 00:34:34,480
Does it make sense that's an interval lock here we are we are basically just creating an interval yep.

146
00:34:34,679 --> 00:34:36,480
Why not just get the lock on.

147
00:34:37,480 --> 00:34:47,480
Because it won't so the question is why not grab the lock on 14 if someone's trying to insert a new key 15 however protected myself they will never see the 14 lock they'll just go ahead and make the change.

148
00:34:48,480 --> 00:35:01,480
If my query was exactly equal to 14 then I would be fine with what you propose like status is equal to lit and I was protecting the lit value in the status column I would be fine but if I'm doing a range I will need to protect this gap.

149
00:35:01,480 --> 00:35:04,480
So why did you get the next.

150
00:35:04,480 --> 00:35:15,480
Yeah yeah so that's coming up next great so there are two ways to do it one way is to say I have a next there's a completely symmetric way to say I might have a prior lock.

151
00:35:15,480 --> 00:35:30,480
Now you will implement only one of these mechanisms not both others you'll end up with deadlock remember we just talked about everyone swim in one direction so it'll depend upon how am I going to access my beatry a beatry typically comes down from the lowest key when you're doing a range and then you typically go.

152
00:35:31,480 --> 00:35:51,480
Scan the leaf from low to high you could do a completely different way of go high to low but most people go low to high whatever is that access path you have for your beatry is what you're going to do so if you're going to low to high you'll say my system implement the next key mechanism right so it's to it's got to match the way in which you're doing this to be to be natural.

153
00:35:51,480 --> 00:36:03,480
You could make it the other way round to but it's just more natural to do it in one but you will not do both you will not do you will not say some transactions will do prior key and some will do the next key then you can start to run into trouble.

154
00:36:03,480 --> 00:36:20,480
But okay so in my given I said I implement the prior key yeah yeah if you no no no if you wanted to protect 14 and 16 with the prior key you'd have come down on 16 and that the prior to 16 to 14.

155
00:36:20,480 --> 00:36:49,480
Regardless you so it's really simple it's not that confusing you either do the prior key or the next key lock it okay if you and depending on that you're going to set what my intro will is you're going to say in this case it is everything greater than 12 just greater than 12 up to an including 14 right that's my interval and in the other case it would be the other way so whichever gap you want to protect now you can protect as long as everyone's protecting the gap in the same direction.

156
00:36:49,480 --> 00:37:18,480
Okay I think I'm going to go back to you. Yeah is it that you would implement both the prior key? No no I just said that you would only implement one of them in your implementation if you do both you'll run into trouble with dead locks so you pick which one you want to implement only implement that and then use the same way in which you protect ranges so you shouldn't say one range one query that wants to protect 12 to 16 is going to go left to right the other one goes right to left don't do that just go back to the other one.

157
00:37:18,480 --> 00:37:30,480
Don't do that just go all in one direction. No no you can only implement one of the two locking modes.

158
00:37:30,480 --> 00:37:38,480
If I have prior key locking and I want to stop something in between 14 or 16. Yeah we just talked about that you would do 16 and prior key.

159
00:37:38,480 --> 00:38:05,480
You do 16 if you wanted to also include 14 so let's take the three cases that are possible I want everything the my predicate is greater than 14 and include 16 so 15 and 16 is kind of if this is integer keys what I want to protect right then I can basically do 16 and the gap that I want to protect in in between.

160
00:38:05,480 --> 00:38:34,480
Now you might say okay what if I don't have so the question might be can I have next key locking like we are seen on the screen screen over here and it only protects the gap and 16 does it kind of look like a prior key yeah it does but you don't want to do that so in this case you might say I'm actually going to lock a little bit more because that's all I have so I will do 14 15 and 16 even though 14 is not my true conflict because that's the granularity at which I can do that so I think that's where you're getting hung up.

161
00:38:34,480 --> 00:38:40,480
It's like okay I may be locking a little bit more than I need on the edge cases and that's true.

162
00:38:40,480 --> 00:38:45,480
So the kind of thing is the same thing as this prior to the box 16 as well.

163
00:38:45,480 --> 00:38:58,480
Yes yes so yeah exactly no matter what you pick it's very simple you just pick one of those and implement that you will that edge case that you think about is very legitimate you will have you will be locking something for a little while but no more than one value right so you're okay with that.

164
00:38:58,480 --> 00:39:00,480
Yeah only either next key or fine key.

165
00:39:00,480 --> 00:39:04,480
Yeah for the gap lock over the key value box.

166
00:39:04,480 --> 00:39:12,480
The question is would you implement should you do only one of next key and prior key yes can you do gap locks and the other locks too.

167
00:39:12,480 --> 00:39:18,480
The answer is yes but generally your implementation could get very complicated so you'd probably just do one of them right.

168
00:39:18,480 --> 00:39:21,480
There is a reason and as I said that doesn't mean systems don't do that.

169
00:39:21,480 --> 00:39:26,480
For Beatriz are so important they will do all of this stuff and make it make it work.

170
00:39:26,480 --> 00:39:36,480
So yeah you could even do up your gap lock you could just say I'm just going to 14 and gap I can just do the regular value locks and gap locks because what we are talking about here is a composition of that.

171
00:39:36,480 --> 00:39:39,480
Is it going to go in one direction you can make all of that work.

172
00:39:39,480 --> 00:39:47,480
How do you manage the lock lock because it seems like each type of lock lock is all that?

173
00:39:47,480 --> 00:39:56,480
Yeah so all of these will have some representation in the lock manager right so you these are locks so they will be requested from the lock manager because it has to check that.

174
00:39:56,480 --> 00:40:03,480
And so then the question is what do I put into that lock manager and it will basically say something like yes key 14.

175
00:40:03,480 --> 00:40:11,480
It will basically talk about that interval saying it is you know 14 to 16 that I'm trying to protect and the lock manager can have different ways of representing that.

176
00:40:11,480 --> 00:40:20,480
Yeah and there are details for that again we can talk offline about what makes sense but that's not super complicated but there are some some interesting issues there too.

177
00:40:20,480 --> 00:40:23,480
Okay great.

178
00:40:23,480 --> 00:40:33,480
I was hoping to finish MVCC today so that will keep us here till 6 p.m. No I'm just kidding we'll figure out how to adjust the material for the rest of the class.

179
00:40:33,480 --> 00:41:02,480
Great so the other part that we have to worry about is can we use the fun stop that we had with granularities of locking with I X mode and the intention modes to I'm scanning a beatry I'm reading it and then only some of things that I read I may want to update should I grab the X lock first as we said that's will not allow in a parallelism everything we talked about in hierarchical two phase locking actually beautifully applies over here.

180
00:41:02,480 --> 00:41:18,480
Because all hierarchical two phase locking needs is some sort of a containment hierarchy right as you're coming down you can say here is stuff is a bunch of things I need to read with need to operate on and that's organized into smaller sets of stuff and I've got a beautiful containment hierarchy you kind of have that here.

181
00:41:18,480 --> 00:41:47,480
So imagine I have a query that is just reading stuff from 10 including 10 up to 15 and not including 16 it can grab an I X lock on that that's the predicate and if some of it after looking at the record right it may have got 14 chased it down looked at something and said yeah now I need to go update this 14 key to something else it can only grab that X lock on that and some of the transaction that was getting an I X lock and that same range but I'm not going to get that.

182
00:41:47,480 --> 00:41:54,480
So I can go to the lock and that same range but was updating a different key like 12 is allowed and compatible it can go forward at the same time.

183
00:41:54,480 --> 00:42:16,480
So you can do all of this locks that we talked about in with the gap locks and the prior and next key locks you could have the lock mode also follow all the lock modes that we talked about right the lock modes are orthogonal to what we are locking and what we are locking that resource if it's got a hierarchy you can apply all of those principles inside a B tree.

184
00:42:16,480 --> 00:42:22,480
Beautiful that that whole theory holds up here to you allow more parallelism in the system as a result.

185
00:42:22,480 --> 00:42:45,480
We talked about this if you don't have an index then you'll have to do something else like lock every page in which stuff of interest exists and kind of use that or lock at the table level which will be the other way to do it but the trade off over there is you will not have as much parallelism that you allow you have more transactions that are blocking each other then you will have a lot of time.

186
00:42:45,480 --> 00:42:52,480
I don't expect from you but along with other than you were but some of these more advanced games.

187
00:42:52,480 --> 00:43:04,480
Alright so far we've talked about everything assuming we wanted this conflict sea li usable just view serializable schedule.

188
00:43:04,480 --> 00:43:07,000
If you just thought about the way we do that,

189
00:43:07,000 --> 00:43:07,840
you're missing phantom,

190
00:43:07,840 --> 00:43:10,240
so we are gonna add that phantom protection.

191
00:43:10,240 --> 00:43:13,159
But in practice, it turns out that many times you need

192
00:43:13,159 --> 00:43:16,440
even weaker forms of protections.

193
00:43:16,440 --> 00:43:20,159
An example is I've got a database operation

194
00:43:20,159 --> 00:43:23,800
that wants to read all the records to build statistics

195
00:43:23,800 --> 00:43:26,039
for the catalogs that the optimizer can use

196
00:43:26,039 --> 00:43:27,960
to figure out how many records there are,

197
00:43:27,960 --> 00:43:29,440
what these histograms are.

198
00:43:29,440 --> 00:43:32,960
Remember, now again, a month or so back or six weeks ago,

199
00:43:32,960 --> 00:43:35,320
we talked about histograms that optimizers need

200
00:43:35,320 --> 00:43:39,720
to produce cost to cost the plants that they're sourcing through.

201
00:43:39,720 --> 00:43:40,559
Where do they come from?

202
00:43:40,559 --> 00:43:42,159
So imagine building a histogram,

203
00:43:42,159 --> 00:43:43,960
I've got a petabyte table,

204
00:43:43,960 --> 00:43:45,840
I have to scan that petabyte table.

205
00:43:45,840 --> 00:43:47,960
It's gonna take a very long time.

206
00:43:47,960 --> 00:43:49,240
Even if you've got a massive cluster,

207
00:43:49,240 --> 00:43:52,240
it may take days or hours.

208
00:43:52,240 --> 00:43:53,320
And so what do you do?

209
00:43:53,320 --> 00:43:54,880
Do you grab a S-slok on that?

210
00:43:54,880 --> 00:43:56,840
You will block everything else out.

211
00:43:56,840 --> 00:43:59,760
So what you'll do is you'll say this transaction

212
00:43:59,760 --> 00:44:02,400
is okay if it sees like dirty reads and stuff like that.

213
00:44:02,400 --> 00:44:04,480
I'm just building an approximation structure.

214
00:44:04,480 --> 00:44:07,760
It can run in a very low transaction month.

215
00:44:07,760 --> 00:44:11,200
So that's a good example of how you might have

216
00:44:11,200 --> 00:44:13,039
these weaker forms of isolation.

217
00:44:14,079 --> 00:44:16,320
So essentially we might say,

218
00:44:16,320 --> 00:44:18,280
I'm allowed, I'm okay.

219
00:44:18,280 --> 00:44:20,639
Don't want to get myself protected against all these anomalies.

220
00:44:20,639 --> 00:44:23,079
We've talked about dirty reads, unrepeatable reads,

221
00:44:24,960 --> 00:44:26,519
phantom reads and so on.

222
00:44:26,519 --> 00:44:28,880
And I can get these different isolation levels.

223
00:44:29,840 --> 00:44:31,440
Sequel has a standard.

224
00:44:31,440 --> 00:44:33,320
Where it defines these isolation levels

225
00:44:33,320 --> 00:44:35,200
with specific terms,

226
00:44:35,200 --> 00:44:37,000
it turns out that these terms are confusing,

227
00:44:37,000 --> 00:44:38,840
have a bonus slide that talks about

228
00:44:38,840 --> 00:44:41,400
if you really want to get into the details,

229
00:44:41,400 --> 00:44:43,679
the experts in the world who understand this,

230
00:44:43,679 --> 00:44:46,360
wrote a paper saying how sequels definition is all wrong.

231
00:44:46,360 --> 00:44:47,920
So we'll kind of cheat a little bit,

232
00:44:47,920 --> 00:44:49,159
stay with the definition.

233
00:44:49,159 --> 00:44:51,599
I really wanted to understand that SQL has definitions.

234
00:44:51,599 --> 00:44:53,639
And you can actually start a transaction

235
00:44:53,639 --> 00:44:55,679
when you install a database system,

236
00:44:55,679 --> 00:44:58,159
many database systems will have default isolation levels

237
00:44:58,159 --> 00:45:00,039
and we'll see a slide in that.

238
00:45:00,039 --> 00:45:01,759
And you can even after transaction level

239
00:45:01,759 --> 00:45:04,679
in most systems, pick different levels.

240
00:45:04,679 --> 00:45:06,880
Everything we've talked about is kind of serializable

241
00:45:06,880 --> 00:45:08,759
with what we've built up so far.

242
00:45:08,759 --> 00:45:11,119
Perfect, well, everything is serializable,

243
00:45:11,119 --> 00:45:12,880
phantoms are protected again.

244
00:45:12,880 --> 00:45:15,400
So that's called serializable schedule.

245
00:45:15,400 --> 00:45:18,880
Okay, that red stuff is actually a keyword in SQL.

246
00:45:18,880 --> 00:45:20,840
The other one is repeatable read.

247
00:45:20,840 --> 00:45:22,880
Everything we talked about is phantoms.

248
00:45:22,880 --> 00:45:24,400
So it's like, yeah, you'll get repeatable reads,

249
00:45:24,400 --> 00:45:25,480
all this other stuff,

250
00:45:25,480 --> 00:45:28,279
but phantoms you won't protect yourself against.

251
00:45:28,280 --> 00:45:31,320
And many database systems, that's a default level.

252
00:45:31,320 --> 00:45:33,160
And you're kind of giving up and saying,

253
00:45:33,160 --> 00:45:36,240
I want more parallelism, I know kind of what I'm getting into.

254
00:45:36,240 --> 00:45:37,080
I'm okay with that.

255
00:45:39,320 --> 00:45:41,120
Read committed is where phantoms

256
00:45:41,120 --> 00:45:43,600
and unrepeatable reads may happen.

257
00:45:43,600 --> 00:45:48,280
So kind of the histogram query very likely runs at that.

258
00:45:48,280 --> 00:45:50,960
So it's like fine, I don't care about phantoms.

259
00:45:50,960 --> 00:45:53,080
That's just a small change to the database.

260
00:45:53,080 --> 00:45:56,800
If I've read a record, someone updates it or removes it,

261
00:45:56,800 --> 00:45:58,880
I don't get a repeatable read on that table scan.

262
00:45:58,880 --> 00:46:01,320
I'm okay with it, I'm just building a histogram.

263
00:46:01,320 --> 00:46:04,120
Okay, and then read commit it is all of them can happen

264
00:46:04,120 --> 00:46:07,039
and you're on your own, basically at that point.

265
00:46:08,280 --> 00:46:11,280
And some of this, and they pulled up this,

266
00:46:11,280 --> 00:46:13,600
I'm just using this example from Andy Slides,

267
00:46:13,600 --> 00:46:18,120
which was many years ago, like 2012 or something,

268
00:46:18,120 --> 00:46:19,519
there was this thing called Silk Road

269
00:46:19,519 --> 00:46:21,960
that used to do all kinds of shady things.

270
00:46:21,960 --> 00:46:23,440
But the technology wasn't shady.

271
00:46:23,440 --> 00:46:25,760
The use of the technology for selling stuff for shady,

272
00:46:25,760 --> 00:46:28,240
but I think the intent for setting it up was shady.

273
00:46:28,240 --> 00:46:29,600
But it all got shut down.

274
00:46:29,600 --> 00:46:32,480
And then there was one big thing that started to bring

275
00:46:32,480 --> 00:46:37,480
all of this down is because the behind every data platform

276
00:46:38,680 --> 00:46:41,760
or any application of any serious wealth

277
00:46:41,760 --> 00:46:44,040
is going to be a database system.

278
00:46:44,040 --> 00:46:47,400
So they had a database system in which it was super easy to hack

279
00:46:47,400 --> 00:46:49,920
and someone figured that up and they effectively said,

280
00:46:49,920 --> 00:46:51,560
I can do Bitcoin transactions.

281
00:46:51,560 --> 00:46:53,600
So imagine I've got one Bitcoin in my account

282
00:46:53,599 --> 00:46:55,799
and I'm going to withdraw that one Bitcoin.

283
00:46:55,799 --> 00:46:58,039
But I'm going to have like 100 transactions

284
00:46:58,039 --> 00:46:59,719
drew it at exactly the same time.

285
00:46:59,719 --> 00:47:01,880
If you were run at one of the lower isolation level

286
00:47:01,880 --> 00:47:04,480
and didn't pay attention, all of them will go through

287
00:47:04,480 --> 00:47:06,920
like the debit card account, the transaction

288
00:47:06,920 --> 00:47:08,799
that we started the beginning when we started talking

289
00:47:08,799 --> 00:47:09,719
about asset, right?

290
00:47:09,719 --> 00:47:13,039
You and your significant are trying to withdraw at the same time.

291
00:47:13,039 --> 00:47:15,679
If you are not running with the right isolation level,

292
00:47:15,679 --> 00:47:18,119
your database system is going to let it go

293
00:47:18,119 --> 00:47:20,159
and that all started the huge collapse.

294
00:47:20,159 --> 00:47:23,079
So something like billions of dollars worth of Bitcoins,

295
00:47:23,079 --> 00:47:26,799
one guy would remove by just firing of the same query

296
00:47:26,799 --> 00:47:28,599
and just making it all go at the same time.

297
00:47:29,639 --> 00:47:30,480
It's not that hard.

298
00:47:30,480 --> 00:47:32,039
You could say, begin transaction, fire my query,

299
00:47:32,039 --> 00:47:33,440
begin transaction, fire my query.

300
00:47:33,440 --> 00:47:35,519
So it's not like you have to time it too much either, right?

301
00:47:35,519 --> 00:47:37,759
You could put explicit begin and time it.

302
00:47:37,759 --> 00:47:39,679
So you can do all kinds of crazy stuff.

303
00:47:39,679 --> 00:47:40,840
All right.

304
00:47:40,840 --> 00:47:43,400
So in terms of these four isolation levels

305
00:47:43,400 --> 00:47:46,799
that are the ones in SQL, I'm not going to go into the details

306
00:47:46,799 --> 00:47:47,639
of all of this.

307
00:47:47,639 --> 00:47:49,159
I'll let you look at the slides.

308
00:47:49,159 --> 00:47:50,840
It should be pretty manageable.

309
00:47:50,840 --> 00:47:55,000
But this tells you precisely what is protected against

310
00:47:55,000 --> 00:47:56,079
like serialized as well,

311
00:47:56,079 --> 00:47:58,920
will guarantee that no dirty reads happen,

312
00:47:58,920 --> 00:48:01,519
no unrepeatable reads happen, no phantoms happen.

313
00:48:01,519 --> 00:48:03,880
And as you can start to see read uncompainted as

314
00:48:03,880 --> 00:48:05,920
is like all of those may happen.

315
00:48:05,920 --> 00:48:08,000
So you better know what you're doing.

316
00:48:08,000 --> 00:48:08,840
Okay.

317
00:48:11,480 --> 00:48:15,160
There's also a way to map these into locking protocols.

318
00:48:15,160 --> 00:48:17,840
Again, I'm going to go through that at a very high level.

319
00:48:17,840 --> 00:48:20,200
Serializable basically says lock,

320
00:48:20,200 --> 00:48:22,680
obtain all the locks first plus the index locks

321
00:48:22,680 --> 00:48:25,039
and use strong strict to P L.

322
00:48:25,039 --> 00:48:26,480
So all the stuff we talked about,

323
00:48:26,480 --> 00:48:28,240
if you really wanted that stuff,

324
00:48:28,240 --> 00:48:29,880
you're going to do all of that.

325
00:48:29,880 --> 00:48:31,680
Repeatable reads says all of this stuff

326
00:48:31,680 --> 00:48:35,320
till like the last 30 minutes of what we talked about, right?

327
00:48:35,320 --> 00:48:36,519
You'll do a strong strict,

328
00:48:36,519 --> 00:48:38,760
but don't have these index locks.

329
00:48:39,720 --> 00:48:42,640
Read committed is weird to get read committed

330
00:48:42,640 --> 00:48:44,480
if you're using two-phase locking.

331
00:48:44,480 --> 00:48:48,320
You'll do everything as about except for the S locks,

332
00:48:48,320 --> 00:48:50,559
where after you read something,

333
00:48:50,559 --> 00:48:53,159
you won't hold on to the S lock, you will release it.

334
00:48:53,159 --> 00:48:57,119
So you're not doing strict to phase locking in that sense,

335
00:48:57,119 --> 00:48:57,960
right?

336
00:48:57,960 --> 00:48:59,480
You're not holding the locks till the end,

337
00:48:59,480 --> 00:49:01,719
but that means that's how you get,

338
00:49:01,719 --> 00:49:04,079
you know, I release the locks and I get

339
00:49:04,079 --> 00:49:06,840
this unrepeatable read behavior.

340
00:49:06,840 --> 00:49:07,679
Okay.

341
00:49:07,679 --> 00:49:10,159
Phantom went away because we weren't doing this index stuff.

342
00:49:10,159 --> 00:49:11,599
And so I'll let you buy a sub,

343
00:49:11,599 --> 00:49:13,000
go through this and figure this out,

344
00:49:13,000 --> 00:49:15,920
but it'll map very nicely if you've understood everything so far.

345
00:49:15,920 --> 00:49:18,320
It'll be trivial to understand these slides.

346
00:49:18,320 --> 00:49:21,159
And read committed says the only thing I'll protect against

347
00:49:21,159 --> 00:49:26,159
is you know, writers on records interfering with each other,

348
00:49:26,639 --> 00:49:28,119
but there are no S locks.

349
00:49:28,119 --> 00:49:30,920
I can read dirty stuff happening at any point in time.

350
00:49:30,920 --> 00:49:33,199
So you read it just no one now?

351
00:49:33,199 --> 00:49:34,920
No, there's still right locks.

352
00:49:34,920 --> 00:49:35,760
Yeah.

353
00:49:35,760 --> 00:49:38,880
Why do you, because of data races and stuff like that?

354
00:49:38,880 --> 00:49:39,719
Exactly.

355
00:49:39,719 --> 00:49:41,480
And I'll point you to a paper where you can look at it

356
00:49:41,480 --> 00:49:43,119
and go read details and understand that.

357
00:49:43,119 --> 00:49:45,599
So it's not there no locks in read committed.

358
00:49:45,599 --> 00:49:47,840
You'll still do the right locks.

359
00:49:47,840 --> 00:49:48,679
Okay.

360
00:49:48,679 --> 00:49:51,920
As I said, you can explicitly set these isolation levels in SQL.

361
00:49:51,920 --> 00:49:52,920
SQL supports that.

362
00:49:52,920 --> 00:49:55,480
Those are the red stuff that we saw in the previous slide

363
00:49:55,480 --> 00:50:01,039
is the terms and some of them will differ in terms of when do you need to set it?

364
00:50:01,039 --> 00:50:04,119
In some systems, it's like you have to declare your isolation level.

365
00:50:04,119 --> 00:50:06,360
If you don't want to use the default one at the begin,

366
00:50:06,360 --> 00:50:07,960
in others, it can be done at the end.

367
00:50:07,960 --> 00:50:09,920
I think my sequel is at the end.

368
00:50:09,920 --> 00:50:11,360
Postgres is at the begin.

369
00:50:11,360 --> 00:50:15,840
And you'll see, you'll have to be careful about which system you're using

370
00:50:15,840 --> 00:50:20,000
because it's not uniformly implemented in that way.

371
00:50:20,000 --> 00:50:23,000
Not all database systems support all the isolation levels.

372
00:50:23,000 --> 00:50:27,160
So Andy loves to collect details like this, which is awesome.

373
00:50:27,160 --> 00:50:31,880
And so this is basically he's collected a number of different database systems.

374
00:50:31,880 --> 00:50:35,079
And what's the default level, which is that middle column?

375
00:50:35,079 --> 00:50:37,200
And what's the highest level they support?

376
00:50:37,199 --> 00:50:42,359
And as you can see, most of the popular databases that you've probably played around with

377
00:50:42,359 --> 00:50:45,879
are used don't start with serializable.

378
00:50:45,879 --> 00:50:47,480
They start one level lower.

379
00:50:47,480 --> 00:50:51,960
And so if you really want serializable, you're going to have to do it in the transactions

380
00:50:51,960 --> 00:50:54,359
and put that call in there.

381
00:50:54,359 --> 00:50:58,039
And some of them don't even support full serializable.

382
00:50:58,039 --> 00:51:02,719
Oracle gets pretty close to that, but not quite.

383
00:51:02,719 --> 00:51:05,559
It does something called snapshot isolation, which basically says,

384
00:51:05,559 --> 00:51:08,960
every transaction you can imagine, I'm going to give you a full copy of the database.

385
00:51:08,960 --> 00:51:10,519
I'm going to simulate that.

386
00:51:10,519 --> 00:51:15,519
Imagine I check out the whole copy of database whenever my transaction gets to run.

387
00:51:15,519 --> 00:51:16,960
I get my transaction ID.

388
00:51:16,960 --> 00:51:18,000
And then I make changes to it.

389
00:51:18,000 --> 00:51:21,320
And then I put it back in a safe way.

390
00:51:21,320 --> 00:51:23,719
But that's called snapshot isolation.

391
00:51:23,719 --> 00:51:25,480
And we'll talk about that in a little bit.

392
00:51:25,480 --> 00:51:27,480
It does not do full serializable.

393
00:51:27,480 --> 00:51:32,039
So it won't have all the other stuff we talked about like phantom protection and things.

394
00:51:32,039 --> 00:51:37,000
Interestingly, many of the newer systems, including Cockroach DB and Google Spanner,

395
00:51:37,000 --> 00:51:38,519
Google Spanner is even stricter.

396
00:51:38,519 --> 00:51:41,079
They all start with a higher isolation mode.

397
00:51:41,079 --> 00:51:45,920
Because we know that you give application programmers rope to hang themselves.

398
00:51:45,920 --> 00:51:47,920
They will hang themselves.

399
00:51:47,920 --> 00:51:48,679
OK?

400
00:51:48,679 --> 00:51:51,840
So it's like, yes, it comes at a cost for terrorism.

401
00:51:51,840 --> 00:51:53,880
But can you make the protocols better?

402
00:51:53,880 --> 00:51:57,599
And the prime example where someone goes even further than that, like what we've talked about

403
00:51:57,599 --> 00:52:00,679
in this class, is strict serializable.

404
00:52:00,679 --> 00:52:05,960
So far, remember, we've skirted this issue of, say, let's imagine I issue two transactions

405
00:52:05,960 --> 00:52:08,279
at the same time, T1 and T2.

406
00:52:08,279 --> 00:52:12,480
Or I issue T1 first and then T2 right after that.

407
00:52:12,480 --> 00:52:16,519
So let's say I've just split it up right after that.

408
00:52:16,519 --> 00:52:20,480
Everything we've talked about, including phantom protection, says as long as the database

409
00:52:20,480 --> 00:52:24,879
returns this back in some order, it could be that the database serial schedule that it

410
00:52:24,879 --> 00:52:26,639
admitted was T2 followed by T1.

411
00:52:26,639 --> 00:52:28,399
All of that is still OK.

412
00:52:28,400 --> 00:52:32,960
The serializable stuff does not prohibit us from doing that.

413
00:52:32,960 --> 00:52:36,320
The Google guys wanted a even stronger guarantee for the ad system.

414
00:52:36,320 --> 00:52:39,400
And it's a globally distributed system, Spanner.

415
00:52:39,400 --> 00:52:41,440
And it kind of gets weird.

416
00:52:41,440 --> 00:52:45,039
If for example, you ask the report for saying, what are my ad impressions?

417
00:52:45,039 --> 00:52:47,160
And you get a report with a timestamp.

418
00:52:47,160 --> 00:52:49,639
And then someone else asks for ad impressions.

419
00:52:49,639 --> 00:52:53,079
And they don't follow the time order.

420
00:52:53,079 --> 00:52:56,559
If the second report with the later timestamp looks like it had fewer impressions, you're

421
00:52:56,559 --> 00:52:57,559
going to freak out.

422
00:52:57,559 --> 00:53:00,559
Like, whoa, how did he go back in that?

423
00:53:00,559 --> 00:53:05,119
So for that, they have an even stricter form, which is called strict serializable.

424
00:53:05,119 --> 00:53:07,079
And that name has evolved over time.

425
00:53:07,079 --> 00:53:11,799
If any of you are like systems or distributed systems, people you might have heard of linearizable

426
00:53:11,799 --> 00:53:13,079
stuff, which has that property.

427
00:53:13,079 --> 00:53:17,320
But for a single object, this does it for the database, right?

428
00:53:17,320 --> 00:53:18,880
Which may be multiple objects.

429
00:53:18,880 --> 00:53:25,679
And so the timestamp order of what you get back on, the commit follows the serial schedule.

430
00:53:25,679 --> 00:53:30,239
The serial schedule is true to the commit timestamp, the commit timestamp when the query

431
00:53:30,239 --> 00:53:31,239
comes back.

432
00:53:31,239 --> 00:53:33,319
Again, there's a full paper on that.

433
00:53:33,319 --> 00:53:35,319
I won't talk a lot more about that.

434
00:53:35,319 --> 00:53:38,799
This is weird thing called course stability, which is we haven't talked about.

435
00:53:38,799 --> 00:53:40,279
It's a weaker form.

436
00:53:40,279 --> 00:53:42,119
Old systems like DB2 start with that.

437
00:53:42,119 --> 00:53:43,599
They protect even less.

438
00:53:43,599 --> 00:53:46,279
So if you're using that, just be careful.

439
00:53:46,279 --> 00:53:50,480
And hopefully now you have enough tools to go, look some of this stuff and understand it

440
00:53:50,480 --> 00:53:51,719
as you read the papers, right?

441
00:53:51,719 --> 00:53:53,719
It's like teacher person how to fish.

442
00:53:53,719 --> 00:53:56,719
That's what we are trying to do right now with all this transaction stuff.

443
00:53:56,719 --> 00:54:00,959
Because it could take, you know, there are people who even to this day will spend six years

444
00:54:00,959 --> 00:54:03,119
and write a thesis on making this better.

445
00:54:03,119 --> 00:54:04,119
This is not yet done.

446
00:54:04,119 --> 00:54:06,439
There are ways you can make all of this better.

447
00:54:06,439 --> 00:54:07,439
Okay?

448
00:54:07,439 --> 00:54:08,439
All right?

449
00:54:08,439 --> 00:54:13,980
Because you have all kinds of crazy things like CXL, RDMA, memory, storage hierarchy and

450
00:54:13,980 --> 00:54:15,139
processors are changing.

451
00:54:15,139 --> 00:54:17,039
So it's like, we'll keep revisiting this.

452
00:54:17,039 --> 00:54:21,839
So if you understand transactions or query optimization, you'll have a job for life.

453
00:54:21,840 --> 00:54:22,840
This is a very simple diagram.

454
00:54:22,840 --> 00:54:29,720
Again, I'm just going to toss it up over there where the highest form of isolation level is

455
00:54:29,720 --> 00:54:30,960
at the top as you go down.

456
00:54:30,960 --> 00:54:31,960
It becomes weaker.

457
00:54:31,960 --> 00:54:35,400
And you can say repeatable reads and snapshot isolation don't have an arrow.

458
00:54:35,400 --> 00:54:36,720
They're not quite comparable.

459
00:54:36,720 --> 00:54:38,600
Certain things that will allow versus not.

460
00:54:38,600 --> 00:54:41,280
We can see snapshot isolation is lower than even serializable.

461
00:54:41,280 --> 00:54:42,280
Okay?

462
00:54:42,280 --> 00:54:46,039
And again, I'm going to just leave it at that.

463
00:54:46,039 --> 00:54:51,240
And there's a, there are two more slides on this before we move on.

464
00:54:51,239 --> 00:54:56,919
And we did a survey asking a bunch of database admins as to what is the default isolation

465
00:54:56,919 --> 00:54:59,399
level in the database system.

466
00:54:59,399 --> 00:55:06,319
And as you can see, serializable, not very popular.

467
00:55:06,319 --> 00:55:13,719
And read commented, which is one level below is the default as you saw in the previous slide.

468
00:55:13,719 --> 00:55:15,119
And that's the world.

469
00:55:15,119 --> 00:55:18,719
So if you're going to do any database stuff and even if you're not going to build the

470
00:55:18,719 --> 00:55:24,879
intervals of a database system, you could make all kinds of crazy problems for yourself

471
00:55:24,879 --> 00:55:28,319
and for your application if you're not careful about this stuff.

472
00:55:28,319 --> 00:55:32,679
So hopefully you're getting that through in terms of how important it is to know how these

473
00:55:32,679 --> 00:55:36,279
protocols work, why they work and what you're getting in return, what are you trying to

474
00:55:36,279 --> 00:55:37,279
protect against?

475
00:55:37,279 --> 00:55:38,279
Okay?

476
00:55:38,279 --> 00:55:40,079
All right.

477
00:55:40,079 --> 00:55:44,119
So every concurrency control protocol can be broken down into the basic concepts we've

478
00:55:44,119 --> 00:55:45,119
talked about.

479
00:55:45,519 --> 00:55:47,119
You know, there's a full fledged up.

480
00:55:47,119 --> 00:55:48,839
This is my bonus slide.

481
00:55:48,839 --> 00:55:54,839
If you look at this paper, which was written in the late 90s that criticized the ANSI SQL

482
00:55:54,839 --> 00:56:00,039
standard, which defined these isolation levels, but they defined it in a way, way.

483
00:56:00,039 --> 00:56:01,039
Standards done by committees.

484
00:56:01,039 --> 00:56:04,719
It's like Oracle's going to try to get its form in and call it serializable.

485
00:56:04,719 --> 00:56:07,079
You know, DV2 is going to try to get its stuff in.

486
00:56:07,079 --> 00:56:11,000
Ultimately, it comes out in some form that doesn't look like anything that's reasonable.

487
00:56:11,000 --> 00:56:13,039
And this paper is beautiful.

488
00:56:13,039 --> 00:56:18,480
It's written by the five star gurus who understand isolation levels of which they're only a handful

489
00:56:18,480 --> 00:56:22,480
on the whole planet, including people we've talked about like Jim Gray and Phil Bernstein

490
00:56:22,480 --> 00:56:29,559
and a whole bunch of others that talked about how the definition there is way get times.

491
00:56:29,559 --> 00:56:33,679
And that leads to all kinds of problems is like when database vendor A says serializable,

492
00:56:33,679 --> 00:56:35,280
does it mean the same as the other one?

493
00:56:35,280 --> 00:56:39,880
And you define it more precisely and they do a fantastic job of doing that.

494
00:56:39,880 --> 00:56:43,760
And up with even more complicated graphs than what I just showed you over there, with all

495
00:56:43,760 --> 00:56:48,160
kinds of very precise stuff saying on this art to that art, this is exactly what gets

496
00:56:48,160 --> 00:56:49,160
violated.

497
00:56:49,160 --> 00:56:54,320
It's a beautiful paper if you ever want to get deeper into all this isolation level stuff.

498
00:56:54,320 --> 00:56:55,320
That's a must read paper.

499
00:56:55,320 --> 00:56:56,320
It's a bonus paper.

500
00:56:56,320 --> 00:57:03,079
We obviously not going to ask you questions on that in the exam, but think of it as an apology

501
00:57:03,079 --> 00:57:06,559
from my side for telling you many times that 721 will cover that.

502
00:57:06,559 --> 00:57:08,400
But you know, this paper will definitely cover that.

503
00:57:08,400 --> 00:57:13,280
So happy to talk to you offline about what you find in this paper if you go read it.

504
00:57:13,280 --> 00:57:14,280
Okay?

505
00:57:14,280 --> 00:57:15,880
All right.

506
00:57:15,880 --> 00:57:20,880
Next class is already here and this class is nearly over, but let's get started.

507
00:57:20,880 --> 00:57:23,200
Great.

508
00:57:23,200 --> 00:57:28,320
I think we might make up some time in the next two lectures and Andy, I will talk about

509
00:57:28,320 --> 00:57:32,880
and figure out how we're going to do the rest of it.

510
00:57:32,880 --> 00:57:34,480
Okay.

511
00:57:34,480 --> 00:57:42,880
And really fun stuff now is multi version, Concurrency Control.

512
00:57:42,880 --> 00:57:45,519
We've talked about two face locking.

513
00:57:45,519 --> 00:57:50,000
We've talked about time order protocol, which we said is just theoretical, just getting

514
00:57:50,000 --> 00:57:51,000
you used to timestamps.

515
00:57:51,000 --> 00:57:52,639
We'll start to use that today.

516
00:57:52,639 --> 00:57:56,199
And we talked about optimistic concurrency control, which was very different, right?

517
00:57:56,199 --> 00:58:00,519
I'm checking out objects very much like GitHub style and I'm checking that back in, making

518
00:58:00,519 --> 00:58:05,320
some validation protocol that checks for conflicts and like GitHub way of to fix the conflicts

519
00:58:05,320 --> 00:58:06,320
by yourself.

520
00:58:06,320 --> 00:58:07,320
You know, database guys are nice.

521
00:58:07,320 --> 00:58:10,519
They try to fix it for you with the validation protocol.

522
00:58:10,519 --> 00:58:15,559
And then you basically start to get into this next thing called multi version, Concurrency

523
00:58:15,559 --> 00:58:17,559
Control Protocol.

524
00:58:17,559 --> 00:58:23,960
And the best way to think about it is that it's a protocol that's going to have at a high

525
00:58:23,960 --> 00:58:26,559
level two components to it.

526
00:58:26,559 --> 00:58:28,920
And I changed things.

527
00:58:28,920 --> 00:58:30,960
How do I manage that change?

528
00:58:30,960 --> 00:58:33,960
So far, what we've said is there are two ways to do it.

529
00:58:33,960 --> 00:58:39,239
One is I'm going to go and update in place in the two face locking stuff that was implicit

530
00:58:39,239 --> 00:58:42,639
and I'm going to grab a lock or write lock so that no one else can touch it while I go

531
00:58:42,639 --> 00:58:44,440
make changes there.

532
00:58:44,440 --> 00:58:45,440
Right?

533
00:58:45,440 --> 00:58:46,639
In OCC, it was like I'm going to make copies.

534
00:58:46,639 --> 00:58:47,799
I'm going to do everything here.

535
00:58:47,799 --> 00:58:50,519
Ultimately, I'm going to write it when I go to that right face.

536
00:58:50,519 --> 00:58:51,519
Right?

537
00:58:51,519 --> 00:58:55,360
And in there in OCC, we were making copies in our own local space, right?

538
00:58:55,360 --> 00:58:58,640
And we all the transactions have their own workspace.

539
00:58:58,640 --> 00:59:03,440
So now I'm going to start to play around with some of those ideas and then see how we can

540
00:59:03,440 --> 00:59:09,120
bring all of that together and figure out how we do that in the global database.

541
00:59:09,120 --> 00:59:12,880
So all this workspace checking out, checking in stuff is too much.

542
00:59:12,880 --> 00:59:16,200
And we're going to try to do all of that in the global master database.

543
00:59:16,200 --> 00:59:18,519
We'll use timestamps and stuff like that.

544
00:59:18,519 --> 00:59:21,599
And we'll keep version chains around so that we can go back and forth.

545
00:59:21,599 --> 00:59:27,519
And really interestingly, what we'll do is we will make the readers go by without doing

546
00:59:27,519 --> 00:59:28,679
much work.

547
00:59:28,679 --> 00:59:32,799
We will still need two parts to this.

548
00:59:32,799 --> 00:59:37,679
One is how do we manage the versions, the MV part, and the CC part is about we will

549
00:59:37,679 --> 00:59:45,360
still need something like 2PL or OCC or something like that or T.O. to go and protect two writers

550
00:59:45,360 --> 00:59:47,679
essentially from writing on each other's stuff.

551
00:59:47,679 --> 00:59:49,920
But readers will allow them to go through.

552
00:59:49,920 --> 00:59:55,280
So what I'm going to look at today is based on the thesis that came out of MIT in 78 and

553
00:59:55,280 --> 00:59:58,760
they'll hold huge rich history behind that.

554
00:59:58,760 --> 01:00:03,119
And for a while, it wasn't like people were getting super excited about MVCC as a way

555
01:00:03,119 --> 01:00:04,119
to do these things.

556
01:00:04,119 --> 01:00:07,599
But essentially every modern database now goes about and does that.

557
01:00:07,599 --> 01:00:14,280
And Andy has a little story about how that database, this whole idea that came out, Jim

558
01:00:14,280 --> 01:00:19,760
Starkley started a bunch of companies that had this type of implementation.

559
01:00:19,760 --> 01:00:22,400
He's also the founder of new DB.

560
01:00:22,400 --> 01:00:27,360
And then eventually that these companies they go and get sold a bunch of times, eventually

561
01:00:27,360 --> 01:00:31,000
became this product called Firebase which is still sold to this day.

562
01:00:31,000 --> 01:00:37,360
And you can actually go to the website and see all the stuff that's available.

563
01:00:37,360 --> 01:00:46,320
But when Mozilla ended and wanted to give their new browser and the new company a name,

564
01:00:46,320 --> 01:00:48,840
they wanted to call it Phoenix first but they couldn't do it.

565
01:00:48,840 --> 01:00:52,640
Then they wanted to call it Firebird but because this database is called Firebird, they ended

566
01:00:52,640 --> 01:00:53,640
up calling it Firefox.

567
01:00:53,640 --> 01:01:00,200
So database guy's influenced Firefox's name, you know, copyright infringement or trademark

568
01:01:00,200 --> 01:01:01,840
infringement.

569
01:01:01,840 --> 01:01:05,720
So little tidbit.

570
01:01:06,599 --> 01:01:13,679
So what are the main ideas behind multi-version concurrency control?

571
01:01:13,679 --> 01:01:18,279
We will set things up so that the writers do not block readers.

572
01:01:18,279 --> 01:01:20,679
Effectively we'll create new versions.

573
01:01:20,679 --> 01:01:26,359
And as a result, what we'll do is readers do not block writers and readers can slide by.

574
01:01:26,359 --> 01:01:29,959
We will use this notion and you see that with an example in the next slide.

575
01:01:29,959 --> 01:01:34,879
We will use this notion of a snapshot which is kind of what we were getting when we were

576
01:01:34,880 --> 01:01:39,360
doing this, checking out, checking in business with the OCC kind of protocols.

577
01:01:39,360 --> 01:01:43,960
It's like seeing, I'm imagine I could make a copy of a database every time a transaction

578
01:01:43,960 --> 01:01:47,240
started, not like literally but logically.

579
01:01:47,240 --> 01:01:50,920
And effectively I get a snapshot and I can work on it which means others are not interfering

580
01:01:50,920 --> 01:01:52,160
with what I saw at the beginning.

581
01:01:52,160 --> 01:01:53,160
It's as it.

582
01:01:53,160 --> 01:01:55,400
Everything I did in the database was at the beginning.

583
01:01:55,400 --> 01:01:59,079
And then of course when I go to make rights, I have to go follow all these validation style

584
01:01:59,079 --> 01:02:02,840
protocols to figure out what the next snapshot needs to look like.

585
01:02:02,840 --> 01:02:09,519
But that's the whole idea behind the snapshot idea and the specific, there's a specific name

586
01:02:09,519 --> 01:02:11,480
for that called snapshot isolation.

587
01:02:11,480 --> 01:02:16,360
If you look at that little tidbit I had in the last bonus slide, that snapshot isolation

588
01:02:16,360 --> 01:02:20,600
wasn't well defined and that paper actually defined that as an isolation with very specific

589
01:02:20,600 --> 01:02:22,400
properties.

590
01:02:22,400 --> 01:02:27,079
So if I have that notion and I'm making versions, I can also do things like time travel

591
01:02:27,079 --> 01:02:28,720
which we'll see in a second.

592
01:02:28,720 --> 01:02:31,760
So let's just jump into MVCC as a method.

593
01:02:31,760 --> 01:02:37,560
So we'll just look at a simple example where I've got two transactions and now I've got

594
01:02:37,560 --> 01:02:44,080
this database in the database, I'm actually going to keep track of the value that value

595
01:02:44,080 --> 01:02:46,840
think of it as a record for now.

596
01:02:46,840 --> 01:02:51,200
And in a little bit I'll tell you when that value is not a record and it becomes a column

597
01:02:51,200 --> 01:02:52,200
value.

598
01:02:52,200 --> 01:02:55,760
And I'm going to have a beginning and time stamp associated with it.

599
01:02:55,760 --> 01:02:59,600
We kind of saw this already previously in the time order protocols and other stuff, right?

600
01:02:59,599 --> 01:03:04,679
It's just going to say when did someone do something to me and when did someone end?

601
01:03:04,679 --> 01:03:08,319
And you saw previously in some of the protocols we had read and write timestamps here, it's

602
01:03:08,319 --> 01:03:16,559
just beginning and end, which lastly says I am valid from the begin time till the end time.

603
01:03:16,559 --> 01:03:22,599
And then in the diagrams here there's also this first column which is called version A0.

604
01:03:22,599 --> 01:03:25,839
That's just to make the slides easier.

605
01:03:25,840 --> 01:03:29,800
Look up it as essentially saying I'm record A and then the zero-thousand of it.

606
01:03:29,800 --> 01:03:33,640
That just allows us to refer to the examples in a far easier way.

607
01:03:33,640 --> 01:03:37,920
And if you look at the slide, I have a bonus slide from one of Andy's paper that says here's

608
01:03:37,920 --> 01:03:41,840
a sample example of what an actual record would look like when you're doing stuff like this.

609
01:03:41,840 --> 01:03:46,880
So this is a schematic representation of what that would look like, the begin and time

610
01:03:46,880 --> 01:03:51,079
stamps are what we care about mostly and version numbers make it easier for us to refer to

611
01:03:51,079 --> 01:03:52,840
that in the examples.

612
01:03:52,840 --> 01:03:56,480
And again these timestamps are not, could be any one of these things that we talked about

613
01:03:56,480 --> 01:03:57,680
when transactions were doing this.

614
01:03:57,680 --> 01:04:02,559
It could be a logical timestamp, a counter that we are grabbing and often it's some mix

615
01:04:02,559 --> 01:04:06,680
of that plus an implicit transaction number.

616
01:04:06,680 --> 01:04:09,360
And you'll see that with a couple of examples as we go through it.

617
01:04:09,360 --> 01:04:13,360
So here's the version number, the beginning timestamp, let's get going.

618
01:04:13,360 --> 01:04:19,240
Transaction T1, let's assume we are assigning transactions there, transaction numbers up front.

619
01:04:19,240 --> 01:04:20,880
Let's just keep life simple.

620
01:04:20,880 --> 01:04:24,280
So now the transaction number is going to be a proxy for the timestamp.

621
01:04:24,280 --> 01:04:25,280
Okay?

622
01:04:25,280 --> 01:04:30,920
And imagine I just read a global counter, I read it and increment it atomically and I get

623
01:04:30,920 --> 01:04:35,599
transaction one T1 and two other transaction numbers.

624
01:04:35,599 --> 01:04:37,000
Start with the read.

625
01:04:37,000 --> 01:04:40,840
Read is going to go and look at the value here.

626
01:04:40,840 --> 01:04:44,240
It's trying to read the record A and there's only one version of it.

627
01:04:44,240 --> 01:04:48,599
So it's going to go look at it and say it will check the begin timestamp and says I'm

628
01:04:48,599 --> 01:04:51,679
allowed to read this.

629
01:04:51,679 --> 01:04:55,519
The end timestamp is infinity here as indicated by the hyphen.

630
01:04:55,519 --> 01:04:59,960
Essentially that's saying right now as the state of the database, the snapshot as we

631
01:04:59,960 --> 01:05:05,319
are seeing right now is this value is started at time zero, sometime in the past.

632
01:05:05,319 --> 01:05:08,079
And as far as I can tell right now it's going to continue in the future till someone else

633
01:05:08,079 --> 01:05:09,799
does something to it.

634
01:05:09,799 --> 01:05:10,880
Which means one can read it.

635
01:05:10,880 --> 01:05:13,119
It's in that range of the beginning and end time.

636
01:05:13,119 --> 01:05:15,119
So it can go read it.

637
01:05:15,119 --> 01:05:17,239
And then T2 starts context switches over.

638
01:05:17,239 --> 01:05:18,239
It has to write.

639
01:05:18,239 --> 01:05:24,880
So now is then the fun stuff is going to begin and the slight the big differences.

640
01:05:24,880 --> 01:05:31,440
It's actually going to create a copy of that record in that same table.

641
01:05:31,440 --> 01:05:36,400
And as you'll see it could be in the table a separate table and a diff table, but logically

642
01:05:36,400 --> 01:05:38,319
assume it's creating it in the same table.

643
01:05:38,319 --> 01:05:43,839
There are three different ways to do it, but they all amount to behaving this way logically.

644
01:05:43,840 --> 01:05:50,720
I did not override the old stuff, but now I'm transaction to I need to fix something with

645
01:05:50,720 --> 01:05:54,240
the old stuff and say you ended at two.

646
01:05:54,240 --> 01:06:01,360
So any transaction that has a timestamp less than two will read the first version.

647
01:06:01,360 --> 01:06:05,640
Anything that is two and greater will read the new version, but that's not visible yet.

648
01:06:05,640 --> 01:06:07,840
I'm not done.

649
01:06:07,840 --> 01:06:12,360
When I'm done and put an end time stamp in it every one after a transaction time stamp

650
01:06:12,360 --> 01:06:14,680
of two will have to read this version.

651
01:06:14,680 --> 01:06:19,280
So the version is just evolving and it's like GitHub history on a specific file, right?

652
01:06:19,280 --> 01:06:22,360
Saying what was valid for what time it's very precise, right?

653
01:06:22,360 --> 01:06:25,440
You take any point in time, point to a version chain.

654
01:06:25,440 --> 01:06:28,280
You'll get only one version that you're allowed to read.

655
01:06:28,280 --> 01:06:30,920
Okay.

656
01:06:30,920 --> 01:06:34,920
Now we are maintaining that in this table, not in a separate workspace.

657
01:06:34,920 --> 01:06:39,559
And along with this, we need a little bit additional machinery, which is a transaction

658
01:06:39,559 --> 01:06:44,759
table that keeps track of what's happening to that transaction.

659
01:06:44,759 --> 01:06:50,719
For example, if I come in and start to read the a one value, the one the a one version of

660
01:06:50,719 --> 01:06:56,320
the record a, I need to know is two still alive or is it committed or subordered because

661
01:06:56,320 --> 01:06:59,159
the transaction could be in a boarding phase.

662
01:06:59,159 --> 01:07:00,840
In which case it's like it's invalid.

663
01:07:00,840 --> 01:07:03,279
If it's committed, then I can go and refer to that.

664
01:07:03,279 --> 01:07:08,039
So in addition to that number, which is that transaction number, a proxy for time.

665
01:07:08,039 --> 01:07:11,639
In this case, I will also need a transaction table in which I'll keep track of what's

666
01:07:11,639 --> 01:07:15,960
happening to that transaction transaction start out by being active.

667
01:07:15,960 --> 01:07:20,519
And then as they make progress, they could go into a commit phase or they could be in a

668
01:07:20,519 --> 01:07:21,519
board phase.

669
01:07:21,519 --> 01:07:23,719
And that commit in a board may take some time.

670
01:07:23,719 --> 01:07:27,119
If it's a boarding, it has to clean stuff up so it won't immediately get out of the

671
01:07:27,119 --> 01:07:28,119
system.

672
01:07:28,119 --> 01:07:29,759
It'll update its status as a board.

673
01:07:29,759 --> 01:07:34,079
I mean, if it's committing, it'll commit, but it still may have some stuff to do.

674
01:07:34,079 --> 01:07:35,400
It'll set itself as commit.

675
01:07:35,400 --> 01:07:41,039
So think of it as just saying, as I, a new transaction trying to access these version

676
01:07:41,039 --> 01:07:45,320
chains, I'll see these ranges begin and end, which will tell me am I allowed to see it,

677
01:07:45,320 --> 01:07:51,119
but I also need to know if the stuff that has made changes to it, if it's in that range,

678
01:07:51,119 --> 01:07:54,519
like that number two, is it like is that transaction committed or not?

679
01:07:54,519 --> 01:07:58,840
And I don't want to stick that in the table there because that's happening for record, right?

680
01:07:58,840 --> 01:08:01,559
So that's why you stick it outside.

681
01:08:01,559 --> 01:08:04,200
So now our records have already gotten a little factor, right?

682
01:08:04,199 --> 01:08:08,879
The record has a beginning and end time stamp and a little bit more as you'll see in that

683
01:08:08,879 --> 01:08:09,879
bonus slide.

684
01:08:09,879 --> 01:08:12,039
I don't want to have that transaction table all be there.

685
01:08:12,039 --> 01:08:15,000
By the way, I still want the transaction status to be only one place.

686
01:08:15,000 --> 01:08:20,800
So when the transaction changes status, I just go and change the transaction table and

687
01:08:20,800 --> 01:08:21,800
make that change.

688
01:08:21,800 --> 01:08:26,079
That transaction table is basically sitting in memory, okay?

689
01:08:26,079 --> 01:08:27,319
All right.

690
01:08:27,319 --> 01:08:31,279
And we won't need the transaction table in great detail, but just want you to know that

691
01:08:31,439 --> 01:08:34,359
you need that additional piece of information to go figure things out.

692
01:08:34,359 --> 01:08:36,079
All right.

693
01:08:36,079 --> 01:08:42,639
The next operation here is a read up A. And so this transaction can go ahead and read that.

694
01:08:42,639 --> 01:08:44,880
But now notice what it's going to do.

695
01:08:44,880 --> 01:08:49,159
It's not going to read the new version, which is not yet visible that transaction T2 has

696
01:08:49,159 --> 01:08:50,159
committed.

697
01:08:50,159 --> 01:08:54,679
It's going to read its old version because now, remember previously when that read happened

698
01:08:54,679 --> 01:08:58,079
for that same transaction T1, the state was zero to infinity.

699
01:08:58,079 --> 01:08:59,800
So it had to just go pick that.

700
01:08:59,800 --> 01:09:05,400
Now it will actually encounter that version chain and say, oh, I have to pick A0 because

701
01:09:05,400 --> 01:09:07,400
one is between zero and two.

702
01:09:07,400 --> 01:09:08,400
Okay?

703
01:09:08,400 --> 01:09:11,600
What T1 gets assigned to?

704
01:09:11,600 --> 01:09:12,600
Yeah.

705
01:09:12,600 --> 01:09:18,400
If the question is what happens if T1 gets assigned to and T2 gets assigned one?

706
01:09:18,400 --> 01:09:23,000
T2 would have a graph below all of this is locking is happening.

707
01:09:23,000 --> 01:09:27,440
The T2 would be, we'll have locked the version that has been stamped as two and that will

708
01:09:27,440 --> 01:09:28,440
stop.

709
01:09:28,439 --> 01:09:31,919
So there are variants of this where you can delay assigning one and two still as late as

710
01:09:31,919 --> 01:09:33,199
possible.

711
01:09:33,199 --> 01:09:35,559
And again, the ignore it if you don't get it.

712
01:09:35,559 --> 01:09:39,199
And in many cases, in some cases with the specific implementation of these protocols,

713
01:09:39,199 --> 01:09:41,159
like MVCC is not one protocol.

714
01:09:41,159 --> 01:09:42,159
It's a mechanism.

715
01:09:42,159 --> 01:09:44,439
You can do all kinds of fun stuff with it.

716
01:09:44,439 --> 01:09:49,479
You could even allow the readers to go by without being registered in the system.

717
01:09:49,479 --> 01:09:50,479
So ignore that.

718
01:09:50,479 --> 01:09:57,759
But if it were two followed by one, your specific question, then the one which now becomes

719
01:09:57,760 --> 01:10:02,440
two will not be able to go forward till that's till the outcome of the other transaction

720
01:10:02,440 --> 01:10:03,960
is figured out.

721
01:10:03,960 --> 01:10:04,960
Okay?

722
01:10:04,960 --> 01:10:06,960
All right.

723
01:10:06,960 --> 01:10:11,720
So this case T1 reads the version that it saw before, right?

724
01:10:11,720 --> 01:10:13,360
So it's getting repeatable read.

725
01:10:13,360 --> 01:10:18,720
The whole illustration is that because you're carving up from the lifecycle of a record,

726
01:10:18,720 --> 01:10:23,239
as time evolves, it has very specific points when it changes its state.

727
01:10:23,239 --> 01:10:27,960
So you always know at a given time in point, my transaction number, which version I should

728
01:10:27,960 --> 01:10:31,000
read, there's no ambiguity about which version I should read.

729
01:10:31,000 --> 01:10:32,000
Okay?

730
01:10:32,000 --> 01:10:33,000
And that version is invisible.

731
01:10:33,000 --> 01:10:34,319
Like in this case, I have to wait.

732
01:10:34,319 --> 01:10:37,119
There is in this case a right lock that will happen on that.

733
01:10:37,119 --> 01:10:39,800
So the version mechanism is just a mechanism.

734
01:10:39,800 --> 01:10:44,880
You still have to have a concurrency control protocol to prevent the right path.

735
01:10:44,880 --> 01:10:51,039
Here's a slightly different example, a little bit more complicated, where you have now T1

736
01:10:51,039 --> 01:10:52,159
string a little bit more.

737
01:10:52,159 --> 01:10:54,000
It's reading as before.

738
01:10:54,000 --> 01:10:58,600
So T1 starts, when it starts, it gets an entry in the transaction status table, becomes

739
01:10:58,600 --> 01:11:04,840
active, puts a read in there, doesn't have to make any changes to the database yet.

740
01:11:04,840 --> 01:11:08,800
But when it writes, it has to do exactly what happened before that T2 was doing.

741
01:11:08,800 --> 01:11:12,519
So this is like a close approximation, the question that you just asked.

742
01:11:12,519 --> 01:11:15,960
And then it goes and creates that value.

743
01:11:15,960 --> 01:11:18,159
One fixes the chain, right?

744
01:11:18,159 --> 01:11:22,000
The chain is fixed by fixing the end time stamp on the old version.

745
01:11:22,000 --> 01:11:27,880
Now you can imagine logically a single linked list is formed for this record A.

746
01:11:27,880 --> 01:11:34,199
And now T2 begins, T2 begins, it became active so that it got an entry in the transaction

747
01:11:34,199 --> 01:11:37,519
table, a transaction status table.

748
01:11:37,519 --> 01:11:43,760
And then it reads version A0 in this case.

749
01:11:43,760 --> 01:11:47,599
And that is allowed because T1 hasn't committed yet.

750
01:11:47,600 --> 01:11:50,120
But you'll see what happens next.

751
01:11:50,120 --> 01:11:55,960
It now goes to the right face and that will not be allowed because it has to go create a

752
01:11:55,960 --> 01:12:01,120
new entry in the version chain and you can't quite do that just yet because someone is creating

753
01:12:01,120 --> 01:12:03,920
that additional list.

754
01:12:03,920 --> 01:12:09,440
So essentially what will happen is that the right path is going to catch it or the objects

755
01:12:09,440 --> 01:12:15,280
as it happens and you'll basically go and stop it at that point.

756
01:12:15,280 --> 01:12:17,000
Okay.

757
01:12:17,000 --> 01:12:21,800
So what signals do you kind of feel that you saw?

758
01:12:21,800 --> 01:12:24,359
Transaction, yeah.

759
01:12:24,359 --> 01:12:27,520
There's a lock on A2, like a physical lock.

760
01:12:27,520 --> 01:12:29,479
You can imagine that's the simplest mechanism.

761
01:12:29,479 --> 01:12:34,319
And when T2 wants to write it says someone have a right lock on it.

762
01:12:34,319 --> 01:12:40,159
So you still need to protect the chain that is getting updated with locks.

763
01:12:40,159 --> 01:12:42,239
So MVCC is just maintaining versions.

764
01:12:42,239 --> 01:12:47,800
You'll still need a two-phase locking type of protocol for example to go protect that.

765
01:12:47,800 --> 01:12:52,079
But what it gives you is that it's going to allow the readers.

766
01:12:52,079 --> 01:12:57,079
So now for example, if someone were like this stuff over here, right?

767
01:12:57,079 --> 01:13:00,800
This stuff over here, when I was just reading stuff, the right came in.

768
01:13:00,800 --> 01:13:02,199
I could still go through.

769
01:13:02,199 --> 01:13:03,199
Right.

770
01:13:03,199 --> 01:13:07,319
If I'm just doing read, right, stop, the writer wouldn't go.

771
01:13:07,319 --> 01:13:11,679
I could go through because I made a copy of stuff effectively like the OCC stuff was

772
01:13:11,720 --> 01:13:15,079
doing and I got that parallelism in there.

773
01:13:15,079 --> 01:13:16,079
Okay.

774
01:13:16,079 --> 01:13:21,640
So what's the reason we need to go to 10 times the draw is going to be the beginning

775
01:13:21,640 --> 01:13:25,520
file that I can go to the reference that I always do.

776
01:13:25,520 --> 01:13:29,039
That it's basically a logical way of making that chain happen.

777
01:13:29,039 --> 01:13:32,760
So you think can I skip the end time stamp, but then I would have to imagine I'm trying

778
01:13:32,760 --> 01:13:35,240
to figure out is A0 version that I'm allowed to read.

779
01:13:35,240 --> 01:13:38,880
If I didn't have two and I'm transaction one, I'll also have to read the next thing.

780
01:13:38,880 --> 01:13:40,520
It's basically forming a singly linked list.

781
01:13:40,520 --> 01:13:44,920
I'll have to read the next entry in the linked list, perhaps an IO to go figure it out.

782
01:13:44,920 --> 01:13:47,520
So that's the trade of your making here.

783
01:13:47,520 --> 01:13:52,680
So I saw you do the repeatable reads and then have different values because sometimes

784
01:13:52,680 --> 01:13:58,040
that can get some in from it and now you're no longer able to read the word over it.

785
01:13:58,040 --> 01:13:59,040
Yeah.

786
01:13:59,040 --> 01:14:03,640
If the transaction that comes and commits, it will not, okay.

787
01:14:03,640 --> 01:14:05,320
So just wait for it for a little bit.

788
01:14:05,320 --> 01:14:10,000
We are not going to, so if T2 came in and this is like similar to the question where T2

789
01:14:10,000 --> 01:14:17,239
came T1, what happens and is too going to read that and it will have to go and figure

790
01:14:17,239 --> 01:14:18,239
some of that stuff.

791
01:14:18,239 --> 01:14:21,239
So just hold it for a little bit and then we'll get to that and if I don't answer it,

792
01:14:21,239 --> 01:14:24,239
then ask me again.

793
01:14:24,239 --> 01:14:31,560
Yeah.

794
01:14:31,560 --> 01:14:34,760
As I said, we'll ignore the transaction status table.

795
01:14:34,760 --> 01:14:38,720
I'm just putting up there for completeness when you do the full protocol and I can point

796
01:14:38,720 --> 01:14:42,400
you to a couple of papers where it actually is important to have that because you need

797
01:14:42,400 --> 01:14:46,600
to understand what's happening to that transaction table and there's more technical stuff that

798
01:14:46,600 --> 01:14:47,600
happens.

799
01:14:47,600 --> 01:14:53,680
Sometimes the end timestamp is a dual representation.

800
01:14:53,680 --> 01:14:58,079
Think of it as a union type between being a timestamp and being a transaction ID like

801
01:14:58,079 --> 01:15:02,320
the higher order bit will decide that and that allows you to say, I'm not a real timestamp

802
01:15:02,320 --> 01:15:03,320
yet.

803
01:15:03,320 --> 01:15:08,440
I don't have a timestamp yet but I'm identified right now by my transaction number.

804
01:15:08,439 --> 01:15:13,519
So there are all these little tricks that you can play with that and those happen when

805
01:15:13,519 --> 01:15:15,000
you do actual implementations.

806
01:15:15,000 --> 01:15:16,000
Yep.

807
01:15:16,000 --> 01:15:17,000
Yeah.

808
01:15:17,000 --> 01:15:25,239
The right-right will get blocked and read right will depend upon how you're trying to implement

809
01:15:25,239 --> 01:15:29,079
that for the Conqueror's Control Protocol allows and doesn't allow.

810
01:15:29,079 --> 01:15:32,359
Just think of it as a mechanism that allows you to do other things and gives you this nice

811
01:15:32,359 --> 01:15:36,799
property of saying, I get versions that are maintained inside the table and I will still

812
01:15:37,360 --> 01:15:38,600
have my locking protocol.

813
01:15:38,600 --> 01:15:40,480
So here's what I'm going to do.

814
01:15:40,480 --> 01:15:45,560
I'm going to go all the way up to the very end and we'll come back to it but there's

815
01:15:45,560 --> 01:15:47,760
a whole mesh of this.

816
01:15:47,760 --> 01:15:54,440
You can take the multi-version, the MV part of it and then combine it with all kinds of

817
01:15:54,440 --> 01:15:58,119
things with it to get a whole blend of things.

818
01:15:58,119 --> 01:16:03,400
So again as I said, this will go well beyond everything we can cover in the four minutes

819
01:16:03,399 --> 01:16:07,000
that I have to cover 50 slides but we won't do that.

820
01:16:07,000 --> 01:16:10,679
I just want you to understand what the version mechanism means, the chain mechanism means

821
01:16:10,679 --> 01:16:15,199
what it means to access it and data structures associated with that and then we can talk

822
01:16:15,199 --> 01:16:20,439
offline about these different sets of protocols and there's also a bonus slide that I have

823
01:16:20,439 --> 01:16:25,079
that talks about bonus means won't be material for the exam but answer all the questions

824
01:16:25,079 --> 01:16:28,399
that you're asking and I'm happy to take questions offline.

825
01:16:28,399 --> 01:16:31,359
What is in this data structure, what does a record structure look like?

826
01:16:31,359 --> 01:16:33,079
This is one of Andy's paper.

827
01:16:33,079 --> 01:16:37,600
It's a beautiful paper I'd recommend reading that and then there's a hackathon paper that

828
01:16:37,600 --> 01:16:40,039
actually has a very simple protocol.

829
01:16:40,039 --> 01:16:45,960
It came from Microsoft and it showed how to do MVCC along with SQL Server which is on

830
01:16:45,960 --> 01:16:46,960
disk system.

831
01:16:46,960 --> 01:16:52,239
So hackathon is an in-memory system as we just talked about and has a beautiful protocol

832
01:16:52,239 --> 01:16:55,600
that is really simple and it's optimized even further than what we'll talk about for the

833
01:16:55,600 --> 01:16:57,279
in-memory case.

834
01:16:57,279 --> 01:16:59,399
And I had a chance to work with some of the guys at hackathon.

835
01:16:59,399 --> 01:17:04,319
I don't think I contributed to any of that stuff besides the experimental session but

836
01:17:04,319 --> 01:17:06,079
I learned to turn from them.

837
01:17:06,079 --> 01:17:08,759
So all the questions you're asking makes sense.

838
01:17:08,759 --> 01:17:14,199
All I want us to go and cover today is to think about that multi-version part and all

839
01:17:14,199 --> 01:17:18,479
the data structures and other things that we'll have to go worry about to make that happen.

840
01:17:18,479 --> 01:17:19,479
Okay?

841
01:17:19,479 --> 01:17:22,119
There are different combinations of making all of this stuff happen and they'll give you

842
01:17:22,119 --> 01:17:26,799
different ways of combining all of this stuff and all the isolation level mess and stuff

843
01:17:26,799 --> 01:17:28,799
like that.

844
01:17:29,800 --> 01:17:30,800
All right.

845
01:17:30,800 --> 01:17:42,560
So going back to the MV part of it, we are going to address one more issue which is the

846
01:17:42,560 --> 01:17:44,039
snapshot isolation stuff.

847
01:17:44,039 --> 01:17:49,079
I already alluded to as we looked at that picture about different isolation level.

848
01:17:49,079 --> 01:17:54,000
So snapshot isolation level was one level lower than the serializable level.

849
01:17:54,000 --> 01:17:55,199
So what was it missing?

850
01:17:55,199 --> 01:17:57,720
It is missing something called the right skew.

851
01:17:58,199 --> 01:18:03,440
So this is one more anomaly that you need to know besides the ones that we talked about,

852
01:18:03,440 --> 01:18:09,480
you know, repeatable reads and dirty reads and phantoms and stuff like that.

853
01:18:09,480 --> 01:18:14,760
So the right skew is the following.

854
01:18:14,760 --> 01:18:19,840
And this is also beautifully explained in that paper that I flashed as the bonus stuff

855
01:18:19,840 --> 01:18:23,199
in the previous lecture's material.

856
01:18:23,199 --> 01:18:28,279
So imagine I've got a database and this is an example that Jim Gray used to use and

857
01:18:28,279 --> 01:18:31,960
cite to explain people in like 30 seconds what right skew is.

858
01:18:31,960 --> 01:18:36,239
I will probably take three minutes because he was based smarter.

859
01:18:36,239 --> 01:18:37,239
But here's the example.

860
01:18:37,239 --> 01:18:41,279
Imagine I've got database of marbles and there are two black marbles and two white marbles.

861
01:18:41,279 --> 01:18:42,800
We'll finish this slide and stop, right?

862
01:18:42,800 --> 01:18:46,519
So I promise I won't have you here till six o'clock.

863
01:18:46,519 --> 01:18:50,800
And transaction one wants to change all the white marbles to black and the other transaction

864
01:18:50,800 --> 01:18:52,199
wants to do the other.

865
01:18:52,199 --> 01:18:55,000
If I just it snapshot isolation, I will make a copy.

866
01:18:55,000 --> 01:18:59,319
I will make a copy at the same time perhaps.

867
01:18:59,319 --> 01:19:07,239
And then the first transaction will change its copy to flip things over to be all black,

868
01:19:07,239 --> 01:19:09,639
the white marbles to black and the black marbles to white.

869
01:19:09,639 --> 01:19:13,399
And what you'll end up happening when you put those things back, the conflict is only

870
01:19:13,399 --> 01:19:18,559
have the first transaction only changed the bottom two and the first transaction only

871
01:19:18,560 --> 01:19:20,280
changed the top two marbles.

872
01:19:20,280 --> 01:19:25,960
And so the diff that will merge is going to basically be that state.

873
01:19:25,960 --> 01:19:30,880
And that's obviously wrong because it's not serializable because if transaction one and

874
01:19:30,880 --> 01:19:35,080
happen before transaction two, you'd end up with all white marbles or the white saucer

875
01:19:35,080 --> 01:19:37,039
would be all black marbles.

876
01:19:37,039 --> 01:19:43,720
So right skew can happen and snapshot isolation basically if you just take it in this literal

877
01:19:43,720 --> 01:19:46,200
way is going to end up with this right skew.

878
01:19:46,199 --> 01:19:50,119
And then we'll pick up is get deeper into this multi version concurrency protocol in the

879
01:19:50,119 --> 01:19:53,279
next class and we'll go and start working with it.

