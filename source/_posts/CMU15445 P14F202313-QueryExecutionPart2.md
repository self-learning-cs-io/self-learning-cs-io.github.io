---
title: CMU15445 P14F202313 QueryExecutionPart2
---

1
00:00:00,000 --> 00:00:28,960
Alright, so I have a question for Shubham.

2
00:00:28,960 --> 00:00:30,960
How do you get into Wu-Tang?

3
00:00:30,960 --> 00:00:34,960
To be honest, I was not that much into Wu-Tang before I met Andy.

4
00:00:34,960 --> 00:00:36,960
I mean, I had an idea.

5
00:00:36,960 --> 00:00:42,960
I used to listen to some build-up like old school stuff because my brother used to listen to it.

6
00:00:42,960 --> 00:00:44,960
But I mean Andy is the one who's got it.

7
00:00:44,960 --> 00:00:46,960
Okay, okay. So he's corrupted into that.

8
00:00:46,960 --> 00:00:47,960
So awesome.

9
00:00:47,960 --> 00:00:51,960
Yeah, add one to the list of long list of things that he's done.

10
00:00:51,960 --> 00:00:56,960
Alright, welcome everyone back from the fall break.

11
00:00:56,960 --> 00:01:04,960
I know a lot of you have seen your exam scores on grade scope.

12
00:01:04,960 --> 00:01:11,960
And let's just jump into what the announcements are.

13
00:01:11,960 --> 00:01:12,960
It requests.

14
00:01:12,960 --> 00:01:18,960
So the usual protocol, but if you have questions, come talk to me and Andy during our office hours.

15
00:01:18,960 --> 00:01:23,960
I know some of you already told me that you felt like the exam was a little tough.

16
00:01:23,959 --> 00:01:29,959
And I gave a couple of tips to people who came into my office hours to as to how you might take such exams.

17
00:01:29,959 --> 00:01:30,959
Right. So three things.

18
00:01:30,959 --> 00:01:34,959
First is you don't have to answer the question in the order in which they end the paper.

19
00:01:34,959 --> 00:01:39,959
So for example, you say I glance to the topic storage management is something I'm really good at.

20
00:01:39,959 --> 00:01:41,959
Go to that question first.

21
00:01:41,959 --> 00:01:49,959
Second is as you read the question because they all have a little bit of a setup as to what's the background that you need to know before you can answer the detailed question.

22
00:01:49,959 --> 00:01:51,959
Don't rush through it.

23
00:01:51,959 --> 00:01:57,959
Try to skim through that question really quickly to get an understanding as to what someone what that question is about.

24
00:01:57,959 --> 00:02:08,959
And as you write the as you assimilate that information, free free to use your pen or pencil and mark like for example, hey, these guys said, is a primary key that may be important.

25
00:02:08,959 --> 00:02:10,959
So just note down what you have.

26
00:02:10,959 --> 00:02:12,959
And 30 space yourself, right?

27
00:02:12,960 --> 00:02:21,960
So if you get stuck on something, if you think that question number four is really difficult and you hit it right now, just if you think that's really tough, go to the easy stuff.

28
00:02:21,960 --> 00:02:22,960
Right. So you can make those changes.

29
00:02:22,960 --> 00:02:26,960
So a little bit of what we are seeing is that there's also some of that.

30
00:02:26,960 --> 00:02:30,960
How do I take an exam and for modality that people are trying to get through.

31
00:02:30,960 --> 00:02:32,960
So they're going to be multiple components to this.

32
00:02:32,960 --> 00:02:34,960
But hopefully that gives you.

33
00:02:34,960 --> 00:02:36,960
Give you some idea. But come talk to me and Andy.

34
00:02:36,960 --> 00:02:43,960
Alright, so today we are going to talk about query execution and picking up on what we discussed in the last class.

35
00:02:43,960 --> 00:02:55,960
If you remember in the last class, we talked about how queries get converted into this internal representation of having operators that execute individual portions of that query.

36
00:02:55,960 --> 00:03:04,960
And the data flows from these operators and each of these operators as we had discussed, you can think of that as being a producer consumer kind of a pipeline.

37
00:03:04,960 --> 00:03:13,960
For example, here you have a selection and you have a projection and you can think of that as being of select project pipeline.

38
00:03:13,960 --> 00:03:20,960
You'll pick up on query execution. So as you can see over here, for example, this was an operator fee that you had looked at.

39
00:03:20,960 --> 00:03:26,960
You can think of each pair of operators here as having a producer followed by a consumer right.

40
00:03:26,960 --> 00:03:35,960
And the join is consuming input from the selection, but for it's parent, the projection, it becomes a producer and the projection is the consumer right.

41
00:03:35,960 --> 00:03:45,960
So operators like that are going to have this dual role. They're going to consume from things that are below them and produce for the operators that are above them in this free representation.

42
00:03:45,960 --> 00:03:52,960
Okay, so you're going to go into the different ways in which you can deal with query execution.

43
00:03:52,960 --> 00:03:58,960
And before we go into that, what are the different ways in which you can execute these queries.

44
00:03:58,960 --> 00:04:13,960
So the first question is what else do we need to worry about? Well, yes, what do you need to worry about, which is processors these days, any computing platform these days today is going to have a lot of far from available at the heart rate.

45
00:04:13,960 --> 00:04:21,960
So here's a chart. It's a little complicated, but the main part to focus on are these orange lines which stays from 1970 to this decade.

46
00:04:21,960 --> 00:04:25,960
How much is in the word transistors that we be adding on processors.

47
00:04:25,960 --> 00:04:38,960
And the y-axis is on exponential scale. So you can see that exponential growth continues where that's basically at the heart of what most law in the not scaling is for those of you who can in pocket at that class.

48
00:04:38,959 --> 00:04:44,959
And if you haven't probably need to know is for the longest time, you should have processor transistor scaling happen, which is that orange line.

49
00:04:44,959 --> 00:05:00,959
And the thing that has really changed is is the other two lines, which is single thread performance, which is how much can each thread of compute to as basically that blue line has started to flatten out, especially over the last decade.

50
00:05:00,959 --> 00:05:11,959
Okay, so we will need a model to be able to deal with the hardware in which each single core is sort of become static in terms of what you can get out of it.

51
00:05:11,959 --> 00:05:27,959
But what these extra transistor budgets allow you to do what the processor guys to do is this black line here, which still before this point middle of the early part of the century like 2005 or so, processors were largely single core.

52
00:05:27,959 --> 00:05:34,959
And every generation of processor was doubling the clock frequency with stall because of our considerations.

53
00:05:34,959 --> 00:05:42,959
And now what you start to see is a lot more cores, where we are now starting to get to tens of cores and maybe the trend will probably continue.

54
00:05:42,959 --> 00:05:49,959
So today you can buy a processor that doesn't have multiple cores, even your phone has multiple processing books.

55
00:05:49,959 --> 00:06:03,959
So now we have to say how do we run all of this very processing machinery that we know in this hardware that by default now is going to be a parallel machine. So every processor is now a parallel data machine.

56
00:06:03,959 --> 00:06:08,959
Okay, so we need to harness the full power of that hardware.

57
00:06:08,959 --> 00:06:25,959
Things are also a little bit more complicated in the sense that we even within each processing core and within the context of each computing environment that we have, you have all kinds of different hardware parameters in there and not going to the details of this.

58
00:06:25,959 --> 00:06:42,959
But just what you'll be aware, this is a chart that is a reincarnation of various other charts that was started by Jeff Dean in 2017 and he was going around Google and looking at the new engineers and realizing they don't really know how processors were and what are the trade offs includes a data access.

59
00:06:42,959 --> 00:06:47,959
If you don't know what the trade offs are, you won't design the software correctly.

60
00:06:47,959 --> 00:06:51,959
So let's look at a couple elements of the chart.

61
00:06:51,959 --> 00:07:00,959
Elbow cash is the small cash that sits right next to the processor, right? The processors and registers in which things get pulled in to compute.

62
00:07:00,959 --> 00:07:07,959
But below that is the Elbow cash and accessing that is like one nano set, roughly a cycle or so.

63
00:07:07,959 --> 00:07:17,959
And then as you get further down to run access, which is the D RAM, which is the above food sense, that's going to be two hours of magnitude slower.

64
00:07:17,959 --> 00:07:25,959
So if you have to fetch data from the buffer pool, it will get pulled into the cash is the value cash and the end one cash, which was its gets process.

65
00:07:25,959 --> 00:07:34,959
And the difference over there is that far. So there's need to have locality that you do in your great processing algorithms that you maintain across these cash.

66
00:07:34,959 --> 00:07:40,959
And a lot of those algorithmic details we talk about in the advanced database class if you happen to think that in the spring semester.

67
00:07:40,959 --> 00:07:46,959
But for today, what I need you to know is that memory is too much of magnitude away from the processor.

68
00:07:46,959 --> 00:07:50,959
Okay, everything that you've done so far works of the buffer pool and that's great.

69
00:07:50,959 --> 00:07:58,959
But look at what happens to if you have to read data from an SSD and the buffer pool when you evict a page, it goes into this.

70
00:07:58,959 --> 00:08:15,959
That this could be an SSD if you have high performance, high cost storage or it could be a disk which is at this level and between the RAM access, which is 100 nanoseconds and reading from an SSD that is 100 microseconds, you can see there's three orders of magnitude difference.

71
00:08:15,959 --> 00:08:25,959
So just three orders of having to slower to access something from memory, then it is to access it from SSD and four orders of magnitude that we have to go to a screen.

72
00:08:26,959 --> 00:08:34,960
And so now we can start to see by this bubble pool is super important and by the way, so much time obsessing about bubble pool efficiency and things like that.

73
00:08:34,960 --> 00:08:53,960
But as you go further down if your data processing hardware is not just a single process of which has multiple cores, but it is multiple machines as you talk about when you discuss today about talent and distributed systems, you may have to communicate across those different machines.

74
00:08:53,960 --> 00:09:03,960
And sending data over the network, that's about 10 microseconds right little bit faster than showing to the SSD one order of magnitude faster communicating from a node to node.

75
00:09:03,960 --> 00:09:19,960
And now you have newer technologies like CSL, which allows a single node to access the data memory of the garden. So that's going to go much faster than reading from a local disk even, but still going to be slower very likely that reading from the lab, directly from your local name.

76
00:09:19,960 --> 00:09:22,960
Memory hierarchies are getting more complex.

77
00:09:22,960 --> 00:09:34,960
Communicating to another machine is what's going to be needed when we talk about talent and distributed database systems, distributed systems are going to communicate across servers that are much further about sometimes geographically spread apart.

78
00:09:34,960 --> 00:09:38,960
And that's what it's going to cost you to go to different.

79
00:09:38,960 --> 00:09:50,960
100 milliseconds and see the big difference between that and the ran access right one, two, three, four, five, six orders of quantity difference across that.

80
00:09:50,960 --> 00:10:06,960
So now you can start to see why we need to understand this overall picture to really start to make high performance database systems, whether it's on a single machine, we need to exploit all the course, but in parallel database machines, we need to be aware of these different costs.

81
00:10:06,960 --> 00:10:09,960
Questions.

82
00:10:09,960 --> 00:10:16,960
All right, so that's why we care about parallel database machines, we need to exploit all of this hardware and do that well.

83
00:10:16,960 --> 00:10:27,960
And if you do that expectation of that hardware, we are well, it also reduces the cost of ownership, because you may need fewer machines, for example, to serve that same workload.

84
00:10:27,960 --> 00:10:38,960
And so there are multiple benefits for being efficient with the hardware you have, including fewer machines, smaller physical, and of course that comes with huge environmental benefit.

85
00:10:38,960 --> 00:10:51,960
When we talk about improving the performance, we distinguish between latency improvement, how fast can we make a single query go as opposed to throughput improvements in which we say how fast can we make a batch of queries call.

86
00:10:51,960 --> 00:11:04,960
And we're seeking mechanisms that allow us to get both of those if you remember last class, we talked about the scheduler which broke everything into smaller units and allowed you to break up a query into even smaller chunks.

87
00:11:04,960 --> 00:11:20,960
We'll talk about some of the things that commercial systems do today, and then I would encourage you after this lecture to go back to that last part of last class's discussion for the scheduler proposal that for the scheduler idea that we had mentioned from the quick set project, because that's perhaps a more modern way to build a scheduler.

88
00:11:20,960 --> 00:11:36,960
And there aren't many systems who do that, quick step built it and hyper is another system that uses that type of scheduling, but the systems we'll talk about today for scheduling and are going to be more traditional systems and I encourage you to go and compare and contrast that as after this class.

89
00:11:37,960 --> 00:12:00,960
So we talk about these terms parallel and distributed data platforms and they both they're different terms will distinguish what's the set what's the separation between those two in the next slide, but the commentalities across both of that is instead of having a database system work on a single server, a single node, you go you have a collection of these nodes.

90
00:12:00,960 --> 00:12:08,960
And the database management system has to provide the illusion of a single node system to that end user to that end application.

91
00:12:08,960 --> 00:12:18,960
So the end application is still going to send queries and the system now has to figure out how to break up that query and harvest the collective resources for the cross all of these machines.

92
00:12:19,960 --> 00:12:43,960
So from the users perspective, it should feel like I'm just sitting a query I'm getting my answers faster lower latency, I have a whole batch of queries that I've sent all of them come back the queries are coming back a lot faster the queries per second the rate at which the system is retiring queries are producing answers to queries measured often as queries per second or queries per hour that's a throughput measure is happening faster.

93
00:12:43,960 --> 00:13:02,960
And then if you take the advanced database class, we talk about how there are certain properties about what that means of some sort of proportionality that these notion of linear scale up and linear speed up which have to do with terms like if I throw twice as hard work at the problem and expect my performance measures to get twice as fast.

94
00:13:02,960 --> 00:13:12,960
And how do we get that linear linear behavior all of that we defer to the spring semester advanced database class today we just say how can we get some of this machinery off the ground.

95
00:13:14,960 --> 00:13:31,960
So you'll often hear the term parallel databases and distributed databases those names often come from technical jargon that evolved in the 80s and the 90s when these were getting separated today the distinction between that is a little arbitrary when people say some of these are not.

96
00:13:32,960 --> 00:13:45,960
So I have a scalable cloud data platform like a snowflake or a data breaks or many of the Azure or AWS and Google data platforms they're going to use a combination of both of these techniques.

97
00:13:46,960 --> 00:14:01,960
So what's the distinction the commonalities we talked about both of them want to work on a collection of machines and provide to the user the illusion that there's a single machine that's much faster than each individual machine in a parallel system typically those machines are more closely connected.

98
00:14:02,960 --> 00:14:27,960
So the same data center they may be on the same rack so the communication between them is going to be if you go back to the previous slide here in a parallel database system you're probably when you're communicating across different servers or different notes it's going to be in that 10 millisecond range and with C Excel it's probably at the RAM layer you're accessing the remote memory so it's going to be even faster.

99
00:14:27,960 --> 00:14:46,960
The distinction between the parallel and distributed system is that in a parallel system you have multiple machines but they're close together they're very fast network and you will assume that the network is reliable that means if I send a message or affect something from the from another node that that's going to happen I don't have to worry about oh did my message get lost.

100
00:14:47,960 --> 00:14:56,960
And you know you'll assume that the hardware kind of takes care of that in a distributed system the servers might be geographically distributed so you're operating in this space you're communicating to something else.

101
00:14:57,960 --> 00:15:26,960
Modern cloud scenarios if you have snowflake installed or Databricks it's only a cloud database like that you are essentially going to get a combination of both of it maybe that some of your nodes are local there might be georeplicated to some of the nodes and you might have a combination of that so quite processing tends to get even more sophisticated because that connectivity picture between the nodes is not just that I'm here or I'm at the network level it is a combination of that it's asymmetric network communication.

102
00:15:26,960 --> 00:15:34,960
So everything we talk about today gets even more complicated again that's advanced database topic that gets covered in the spring semester graduate database class.

103
00:15:35,960 --> 00:15:55,960
Okay so that's the distinction between parallel and distributed database systems and that that whole trend is merging but the key part is in a distributed system you will assume that the communication costs are hired you do different algorithmic design differently and the messages could get lost as you're going to build some sort of a reliable communication layer that if I'm sending to another node and saying hey.

104
00:15:55,960 --> 00:16:10,960
Once you go process the selection query on the data fragment that you have you want to assume they got it you have to check with that you have to have layers about in your data layer in your database platform to be able to have that reliable communication and check with that.

105
00:16:10,960 --> 00:16:39,960
Okay also things get more complicated as you talk about transactions which is coming in five wish lectures from now you have to commit the updates that are happening because in a parallel distributed system updates might have happened to data sitting on node here another in this other node they may be geographically spread how do you commit that transaction so that all those changes get committed and the state of the database is correct and you still have this illusion of a single large database that is being served by a collection of machines.

106
00:16:40,960 --> 00:16:52,960
Okay so don't worry about the distinction but you should be aware when someone says parallel is distributed they're probably using these two terms in that sense.

107
00:16:52,960 --> 00:17:08,960
So yeah so good example is a family database system is something that you would use for example if I've got you know hundreds of nodes sitting around in a single cluster I really get about high performance my data fits into all the nodes sitting in a rack.

108
00:17:08,960 --> 00:17:33,960
A rack can take about 40-ish computers these days let's say each computer each node in that rack might have a terabyte of memory might have tens of terabytes of storage and I can get to close to a half of that a by birth or a petabyte in fact there are models where people taking appliances like article has this appliance called exadata which is essentially a big rack they'll roll that into a data center they just announce a partnership that Azure.

109
00:17:33,960 --> 00:17:55,960
So you can get your Oracle parallel database system running in a rack in their specialized hardware plugged into the Azure network service by Azure for other things and distributed system would be where you end up a big for a distributed system that this wouldn't survive is let's say I've got my banking transaction data that master source for what's in each and every account.

110
00:17:55,960 --> 00:18:10,960
Changes are happening to that all the time you're swiping cards you're debiting money from it new deposits are coming into that I can keep that on a single node in a single rack in a single so let's say that sitting in which word what did that data center catches on fire.

111
00:18:10,960 --> 00:18:38,960
Orch bit sitting in California no one was data centers in California necessary use to expensive at times but there's been in the middle of the desert like Arizona stuff like that or in ice to end you know that power is cheap usually data centers these days can be created by that but I can you can still have a single rack feel which is not a very low probability of that you have the entire center fail in the sense that network would get disconnected and even though probably even but not as evil probably.

112
00:18:38,960 --> 00:18:45,960
And some of these things are not six in my life they can happen more often like a single node failure is a lot is very coffee.

113
00:18:45,960 --> 00:19:04,960
And so I can need a copy of my data for my bank account which maybe it's not a massive database of me not be affected by database it may be a terrible database but I want to keep three copies of it so I may keep one copy in Pittsburgh one in Arizona perhaps you know one in Minnesota and that way one feels like I can recover that.

114
00:19:04,960 --> 00:19:20,960
When 911 happened a lot of the data was in those towers but most of nearly all of it was georeplicated and you could recover all of that information from the path of said like no one noticed anything different with the bank accounts that because replication was.

115
00:19:20,960 --> 00:19:34,960
And then geographically spread across obviously it will be distributed because it has to be physically spread across for you to have this property of single site completely failing for some due some some environmental factors that coming to.

116
00:19:34,960 --> 00:19:35,960
Okay.

117
00:19:35,960 --> 00:19:49,960
And of course if you have a copy of the data you have queries running you probably want to use it sometimes you have copies of data you have this distributed stuff happening even for analytic work room so the whole world is changing paddle distributed hybrid systems like that is essentially what happened.

118
00:19:49,960 --> 00:19:52,960
Is essentially what happens all the time.

119
00:19:52,960 --> 00:19:56,960
Great question other questions.

120
00:19:56,960 --> 00:20:18,960
Okay so we're going to go into the process model the execution level parallelism and IOPadalism so the process model is a term that we refer to to talk about how is the system going to deal with this simple free representation that we talked about in the past class with the producer consumer stuff but now you.

121
00:20:18,960 --> 00:20:47,960
Multiple levels of multiple foundation that's available in the hardware and you're going to call this thing of work you can think of worker as a unit of work in which some of the process same happens and then we talk about process model I say how is that worker allocated is that worker allocated to do we allocate it to a process is one worker map to a process every time a new worker to.

122
00:20:47,960 --> 00:20:55,960
To start a new process like far from a new processing my code or is that worker thread.

123
00:20:55,960 --> 00:21:16,960
Do you have a you had just started a new feature or do you have a collection of features and I just find one of the presets available and give it work is that a worker or an embedded system in which i'm running my code like in a Python notebook i've got some processing happening isn't data be system running in that same context that's called an embedded data.

124
00:21:16,960 --> 00:21:19,960
Okay, and you talk about all these three different models right.

125
00:21:19,960 --> 00:21:33,960
So let's start with the process for worker this is the simplest model and those databases are not working the panel in this unit database system started in the 80s a lot of it was before friends were popular.

126
00:21:33,960 --> 00:22:02,960
So in that form feature as a fact it's been quite exist and so at that time the way in which you would start a query and you would start the processing as we talked about briefly i'm going to go back to slide number two here remember in the first query execution perhaps when we talked about we talked about how you can start this operator tree bottom up or top down and so the process model is like I start the process there that makes it call.

127
00:22:02,960 --> 00:22:12,960
To another process maybe through some rdc mechanism or something like that and then that calls another process in the whole process free setup.

128
00:22:12,960 --> 00:22:22,960
So that's what the process model is it's going to be a single process for each of those workers and in this case i'm just assuming a single worker per node.

129
00:22:22,960 --> 00:22:34,960
So we're going to start out into an intra query operation parallelism in which we might have multiple workers for each of those operations but the basic idea is that I get a query.

130
00:22:34,960 --> 00:22:45,960
From an application that connects to the database system there's a dispatcher i'm not calling it a scheduler dispatcher which is much simpler it's going to call the worker process.

131
00:22:45,960 --> 00:22:58,960
If one needs to be started up or if there's a pool of process just waiting around for work to be given to them pull from that pool and then the work gets done work for that operator like a selection a projection a join an aggregation.

132
00:22:58,960 --> 00:23:12,960
Okay so really simple add all the traditional database systems that have been around for a while including db2 oracle post press because they all started before p threads was popular will have this worker model.

133
00:23:12,960 --> 00:23:28,960
What do modern data platforms do and you can see the longer list of systems that are over here including these traditional systems and pretty much every that slide over there the thread model we can fill up pretty much all the system that are out here today that are more modern.

134
00:23:28,960 --> 00:23:49,960
The idea now is that instead of having a process which is a much more heavyweight abstraction for doing work use threads and threads are much cheaper compared to a process like spinning up a process and getting on the process is very more expensive than starting a new thread and.

135
00:23:49,960 --> 00:24:04,960
So here the idea would be I have this operating systems gives me this process model which is heavyweight but within that process I can use p threads which is now pretty standard and spin up as many threads I want.

136
00:24:04,960 --> 00:24:18,960
I can even control how many threads I want so if I'm working on a 40 core processor I might spin a 40 threads if I want to use something like hyper threading which allows multiple threads to work on a single core at the same time I might spin up 80 threads on a 40 core blocks.

137
00:24:19,960 --> 00:24:33,960
Okay so now I just use the worker the process mechanism that the operating system gives me as a container and my parallelism that I'm orchestrating is inside the process by using threading.

138
00:24:33,960 --> 00:24:52,960
Okay so pretty straightforward and it's simpler from the perspective is lighter weight than the process model one downside to that is that if a thread crashes it could take the entire process down if I've got 40 threads running 100 crashes as a sit kill or a simple the entire process.

139
00:24:52,960 --> 00:24:57,960
Unless you do special stuff to catch it and get you yet but you have to write that code.

140
00:24:58,960 --> 00:25:02,960
Okay questions so far on these two models.

141
00:25:02,960 --> 00:25:16,960
Okay and basically as the slide says you know every database has been created since p threads that became popular since about 20 years now uses a thread model because it just has way more advantage compared to the process model.

142
00:25:17,960 --> 00:25:29,960
All right so and the idea is a similar application comes in now that unit of work is at the thread level and not at the process level.

143
00:25:29,960 --> 00:25:45,960
Now some systems like SQL server which has been around Microsoft SQL server has been around for a little while they have to go through this pain point going from the process model to the worker model and doing different things and all of these systems are equal and SQL server and DB2 they now have.

144
00:25:46,960 --> 00:25:51,960
This balance between the thread model and the worker model but what I wanted to zoom down into.

145
00:25:51,960 --> 00:26:11,960
SQL server and talk about what they did at the dispatcher level and as you remember in the last class we talked about scheduling and and that unit based scheduling this is simpler than that but it's practically what Microsoft did right so the idea is for each 20 plan.

146
00:26:11,960 --> 00:26:30,960
The database system has to decide how to execute and you have to decide how many tasks in how many workers are going to get involved and you're going to make that decision based on how many CPU cores you have and you might also decide which core should execute which task right and there's sometimes advantages to picking the core as opposed to saying hey.

147
00:26:30,960 --> 00:26:52,960
The thread manager or the operating system decide where this needs to be allocated and the big reason is the database system often knows a lot more than the operating system about the context so for example if I got a selection operator that had just produced the results and it was running on four four and now I need to schedule a subsequent aggregate operation.

148
00:26:52,960 --> 00:27:10,960
I probably and court four is free I want to schedule that next worker on court or because very likely the data sits in the cash is like the L2 cash is for example right as you saw from the slide and two cash is an order of 92 cheaper to access then.

149
00:27:10,960 --> 00:27:31,960
And often in most modern systems as an L3 cash and something that looks like a gigantic and four cash some of the newer internal and these systems have like a gate of S ran level four like cash sitting on the processor so the gate of that which is an amazing about so localities important and you want to take that into account yep.

150
00:27:31,960 --> 00:27:59,960
Yeah some of them are L1 L2 typically are individual to each core and some of the bigger ones like the L3 or what looks like an L4 often shared cash is yep but even if you but you know often you also multiple processors right you buy a server today typically will have four processors and so you want to at least make sure it goes to the right process even if you're using a low level cash question.

151
00:27:59,960 --> 00:28:28,960
So the question is why don't we just build a database system without the operating system and that's been a perennial debate in the community including Mike Stronberger wrote a paper about 40 years ago say how database operating system just gets in the way but the practical reality is that you have a server.

152
00:28:28,960 --> 00:28:42,960
It has to do a lot of low level device management stuff people write device drivers and tested at the operating system level so you want your networking card to work you want to storage device to work that service going to run a lot of applications databases maybe just one of them.

153
00:28:42,960 --> 00:28:55,960
So you still need a layer that does the stuff that operating system does now the question the part of what the operating system does like a file crash that gets in the way for database systems because we like to do a buff a cool.

154
00:28:55,960 --> 00:29:13,960
So often what database systems will do they will use some mechanism like direct map of file where the data is sitting in the file system for the operating from the operating systems perspective and tell us don't cash any of this stuff I got a cash in there so the operating system does get in the way of things like.

155
00:29:13,960 --> 00:29:42,960
Caching which the buffer pool does a much better job than the file system does it does get in the way of locking because the operating system will do its own types of stock you know locking at the five level is what you see is most Linux system for the one final grade locking as you talk about at the transaction that I've been talking about transactions so that gets in the way some of the mechanisms related to scheduling sometimes get in the way to operating systems have been getting much better by allowing the dispatcher to get.

156
00:29:42,960 --> 00:29:44,960
Dispatcher to give this about.

157
00:29:44,960 --> 00:29:55,960
But certainly there are portion of the operating system need me and most databases to state the stuff that they know don't want the operating system but the operating system gets in the way and build it that starts a couple points of the exact.

158
00:29:55,960 --> 00:30:09,960
But that's an ongoing debate as to what should that boundary yeah if it's the case the model like take the viewing what we're doing the operating system yeah different you could see especially since like apparently it's faster like yeah.

159
00:30:09,960 --> 00:30:30,960
Yeah I would rephrase your question as saying why are operating systems so monolithic why can't they be much simpler and this place has an tremendous history in researching that with the macOS and micro colonels and stuff like that awesome ideas and more and more absolutely means to happen in the operating system coming to be have what we have right now some of those ideas are there and be smell for but not in that.

160
00:30:30,960 --> 00:30:36,960
Ultimate vision of operating systems in very modular and lightweight so you can just pick the faster.

161
00:30:36,960 --> 00:30:48,960
Yeah I still an ongoing research topic and I encourage you to take the operating systems class if you're interested in that they spend a fair amount of time talking about that stuff great question other questions.

162
00:30:48,960 --> 00:30:53,960
Cool alright so yep you had a question.

163
00:30:53,960 --> 00:31:14,960
Yeah we'll get to that so we'll talk talk about that we have a ton to cover so hold that question if I don't answer it in 15 seconds stop me again so I'm going to go through the sequel the West part that Microsoft did very fast just to give you an idea on to say time for the core topic but what they did is essentially this type of an idea you remember Microsoft.

164
00:31:14,960 --> 00:31:43,960
They're very recently was only selling windows server everything work on windows windows and team the windows server stuff like that and so they had in mid 90s decided that they needed to build the database system because that was one of the most important applications for enterprises and so they started to build SQL server and the research certain point where they had to go make changes to SQL server and they added the SQL OS layer.

165
00:31:43,960 --> 00:32:02,960
We're learning some of the discussion we just had over here is like what's the boundary and roles and responsibilities that we should allocate between the operating system and the database engine and they had the benefit of having gone through that debate a bunch of times so since they started in the mid 90s.

166
00:32:02,960 --> 00:32:32,960
They had learned a bunch of lessons from before and so what they did is they had built something called SQL OS and that one they didn't build in the first version of SQL server that happened much later and that was essentially an abstraction between the database engine and what it needs of the operating system and what the operating system that implements internally for that operating system and one of the big advantages of that was you know so these this management included things like Ios I'm going to send an I or request but don't know what I'm going to do is I'm going to send an I or request but don't know what I'm going to do is I'm going to send an I or request but don't know what I'm going to do is I'm going to send an I or request but don't know what I'm going to do is I'm going to send an I or request but don't know what I'm going to do is I'm going to send an I or request but don't know what I'm going to do is I'm going to do is I'm going to

167
00:32:32,960 --> 00:32:58,960
don't directly call the windows driver or the windows layer directly have an abstraction and have it call it and the big advantage of stuff like that was that when they had to move to Linux because we must in the cloud that's what the servers run they lost me one Linux and Microsoft haven't even before that with the subtraction there to address exactly the types of problems we just discussed.

168
00:33:02,960 --> 00:33:29,960
That that moving over to Linux that massive piece of code was relatively easy to still a ton of work that was relatively easy essentially the key take a ways that it is an extremely good idea to have in your database layer of well defined interface to the operating system so that you can make that work in the ways that you want, especially as a boundary between what the operating system does and the database system is continually getting reimagined.

169
00:33:29,960 --> 00:33:47,960
I'm not sure if you can understand what the SQL essence is a formal kernel by points with more so to be there in a base generic interface so it's like I won't call the I.O. Scheduler directly at the operating system level I'm going to call an internal schedule that does its own behavior for example it says I'm going to put all my requests into the I.O.

170
00:33:47,960 --> 00:33:56,960
And before I actually call the operating system I'm going to see if there are eight features that are continuous in the physical this address space and make my I.O.

171
00:33:56,960 --> 00:34:05,960
So now we can do all that type of algorithms in that layer as opposed to saying what the operating system does the right thing for.

172
00:34:05,960 --> 00:34:20,960
Prefetching is another example scheduling affinities scheduling stuff like that are other examples of that but anyways the details are not as important as say yes that layer matters and it should be something we should consider.

173
00:34:20,960 --> 00:34:32,960
I'll go really quickly through that there's one interesting design they made which I'm not sure makes a ton of sense now but you know they didn't have the hindsight there is they still needed to figure out they had the process model.

174
00:34:32,960 --> 00:35:01,960
I want to figure out how to make this process model work in the world ad-art faction you remember the discussion from last lecture where people this world order based on when he's single worker was occupied with giving the value of the entire selection offer for a single operation the whole time which is operating on a block at the time of the day giving up themselves and saying tell me what to do next so they won't like say I've got to find a file I'll do the selection I'm starting now check back with me in an hour or two of the time right.

175
00:35:01,960 --> 00:35:30,960
We're not blocking the whole system blocking themselves from doing something else that was very short right that was what we discussed in the last class here what it is was something different because they didn't have that luxury they actually went into the code for example if you're doing a simple selection this is what sort of the code would look like right a for loop it reading over each record applying the evaluation predicate and emitting the record if it needed to so they actually went to each of the operators and put stuff in like this which is a lot of things that I'm going to do.

176
00:35:30,960 --> 00:35:59,960
This which is to say every once in a while check how much time you've spent in that inner loop and yield explicitly so that the control can be given up obviously when they did this you know they didn't have the advanced engineering mechanism that we talked about in the last class but that was a way they could not have a single worker block and you had this more agile way of building this system now I would suggest that what we talked about in the last class is the better way to go do this now but at least they got this thing to work.

177
00:36:00,960 --> 00:36:30,940
In a way that makes sense for them okay so we talked about the process model you talked about the thread model the last model is an embedded database model and this is literally you can imagine the database is written as a library and you can imagine just calling that library to your code and essentially the database engine runs inside your application code and you think of just making calls to the database saying hey create a

178
00:36:30,960 --> 00:36:51,960
table yes the schema is our records to a selection and the stuff. The database code is a library on embedded databases in the database lingo and effectively runs in the same worker space at the application so in a threat that the application is running.

179
00:36:51,960 --> 00:37:19,960
And there are lots of examples of that the most famous example of that is SQLite but there was a database system called Berkeley DB that started about 5 10 years ago for SQLite at the toward the end of last century but SQLite is used in a large number of applications you probably have dozens of copies of SQLite compiled into applications on your phone most apps will have compiled that into the application right so it's the most deployed database engine there are estimated.

180
00:37:19,960 --> 00:37:45,960
10 billion copies of SQLite running across the plan because everyone's carrying phones and many of them in a multiple copies of SQLite most apps when they need a database layer they embed it they just link into SQL library it's pretty interesting if you go to SQLite they have a version of distribution which you get one single C file with the entire database system it's very cool and you just compile that into your code and now you run that's your database system.

181
00:37:45,960 --> 00:37:57,960
Okay we could spend a whole lecture talking about SQLite and how it interacts with the OS and we've actually worked on SQLite and some of the code from the optimization stuff that we've developed in my research group ships and SQLite so all of you guys are running our code.

182
00:37:57,960 --> 00:37:58,960
Okay question.

183
00:37:58,960 --> 00:38:02,960
There is one I say for why isn't dynamically linked more commonly.

184
00:38:02,960 --> 00:38:16,960
I don't think that is impossible I think you some applications might even be doing that I don't know why you would not be able to quite do that this is notion of a global offer locking mechanism in there but that should still work with with dynamic.

185
00:38:17,960 --> 00:38:26,960
Well no they have a buffer pool that they maintain and so I have to go and look at that and see if the buffer pool is allocated together it becomes a shared buffer pool which you may not want.

186
00:38:26,960 --> 00:38:34,960
I think people compile it in because a lot of the assumptions probably don't work if you start sharing the buffer pool across applications.

187
00:38:34,960 --> 00:38:41,960
Okay cool okay all right so.

188
00:38:42,960 --> 00:38:50,960
Just a summary of the process model we have these three different process models if you're in the embedded space you're really looking for a lightweight engine that makes sense.

189
00:38:50,960 --> 00:39:02,960
The process model the workers with sitting a single process is essentially something that existed in the past but really most modern database systems use threads which is the better model to use.

190
00:39:02,960 --> 00:39:29,960
What is not on this slide is that if you look at cloud databases what they often do is they'll have a different notion for unit of note they effectively have essentially these containers like in where you are locating some compute container that might be four or eight codes that might be virtualized on top of a given hardware and you impose that on top of that.

191
00:39:29,960 --> 00:39:37,960
The bottom line is that in the cloud environment is the most final range when in reality as to where are those resource coming from and people are going to allocate containers.

192
00:39:37,960 --> 00:39:53,960
This containers might be units of two or four cores from a physical machine underlying that might have 64 cores of 100 cores that means sliced up virtually and in that you can put your process model thread model so there's one more level of abstraction that you often see when you're deploying in the cloud.

193
00:39:53,960 --> 00:39:59,960
Okay, there's just for you to know you still have to figure out within that container what brought what model are you going to use.

194
00:39:59,960 --> 00:40:04,960
So the sign is that this is not by the giving us important to carry.

195
00:40:04,960 --> 00:40:16,960
Yes, so we talk about intra quenny parallelism next which is just because someone is using threads doesn't mean they have intra operator parallelism or inter operator parallelism which is exactly what we are going to talk about next.

196
00:40:16,960 --> 00:40:27,960
So how far is that just wait for okay, so so far we talked about other questions related to the process model.

197
00:40:27,960 --> 00:40:33,960
Okay, so so far we've said I need to do some work like on a selection operation.

198
00:40:33,960 --> 00:40:44,960
Where do I make that allocation do I spin up a process do I use a thread or is it embedded to throw the embedded on the site for the thread in the process model.

199
00:40:44,960 --> 00:40:55,960
I still have to decide oh, I have the selection operation should just one worker you got selection also that have 10 workers spin up and work on that selection.

200
00:40:55,960 --> 00:41:05,960
You know, seeing a five with a million pages maybe a spin up 10 workers at each one of them work on the fence of the day that maybe interrupt operator path.

201
00:41:05,960 --> 00:41:10,960
Okay, but I will get then millions of work for that selection operation.

202
00:41:10,960 --> 00:41:16,960
I still have to decide whether that worker each worker now is a trigger process which we already discussed.

203
00:41:16,960 --> 00:41:27,960
So now the discussion is what we're going to teach operator and throw more of the workers many workers at intra operator paleness and inter query.

204
00:41:27,960 --> 00:41:38,960
So how do I execute the operations so inter quit sorry for getting about intra operator right now we talk about intra query which will put the break it down into intra operator in a second.

205
00:41:38,960 --> 00:41:50,960
So intra query is for a given query do I use multiple workers to do its work and inter query is if I've got multiple queries that are sent to my system.

206
00:41:50,960 --> 00:42:04,960
Do I use multiple workers to go with that the simplest model would be I have one worker be the process or thread every if I've got 10 queries come into the system I'll take the first query running on that worker till it's done and take the second one.

207
00:42:04,960 --> 00:42:08,960
Now you can go in two ways, once you say I've got 10 workers.

208
00:42:08,960 --> 00:42:15,960
And they could either be speeding up a single query at a time or they could be speeding up.

209
00:42:15,960 --> 00:42:25,960
So a collection of these ways together and of course there are things in between as we will see so let's start with intra query far nism.

210
00:42:25,960 --> 00:42:42,960
Basically we have multiple queries that are presented to the system and the are going to figure out how to read them to run and pass it requires a read only then this is an embarrassingly parallel task right if I've got 10 queries that are presented to the system or what 10 workers.

211
00:42:42,960 --> 00:42:58,960
And each worker takes a query take one of the queries and start working on and that's all fine that can go really well if some of those query shared the same set of data pages like all the queries start by reading the same table then one of them might bring into the bubble pool then everyone else.

212
00:42:58,960 --> 00:43:07,960
And the bubble pool goes under this LRU to LRU key and I policy and that's what you build it so that it's sufficient to respect your sketch.

213
00:43:07,960 --> 00:43:18,960
So might this right as long as everything is real only if there are multiple queries running simultaneously one is trying to read all the bank accounts and try to figure out what's the total deposit for the bank.

214
00:43:18,960 --> 00:43:34,960
The other one is trying to add interest to certain accounts they're interfering with each other one is reading the other one is writing potential to that same data and there you have to start to worry about how to do that correctly and that's we will cover all of the topic when we talk about transactions.

215
00:43:34,960 --> 00:43:36,960
Okay.

216
00:43:36,960 --> 00:43:38,960
So.

217
00:43:38,960 --> 00:43:46,960
The buffer pool stuff that we talked about you and we'll get into some of the more details about that in lecture 15.

218
00:43:46,960 --> 00:43:50,960
Now, intro query pattern is.

219
00:43:50,960 --> 00:43:57,960
I want to make it go faster by using more than one.

220
00:43:57,960 --> 00:43:59,960
Okay, so how do I go do that?

221
00:43:59,960 --> 00:44:21,960
So if you remember an operator free we've cast it as a producer consumer paradigm between each pairs of operators and we can now take each of the operators and to give it more than one worker so we'll look at that next which is called intro operator patternism and the other part we can do is we can do multiple operators in parallel.

222
00:44:21,960 --> 00:44:26,960
So before we go into the details of that let's just take a simple example.

223
00:44:26,960 --> 00:44:40,960
You can ask hash store in a specific flavor of hash store and if you remember in that what we did is we said you're going to take the two tables that are being joined or in S.

224
00:44:40,960 --> 00:44:51,960
We're going to partition them to create partitions of R, HD, zero, one, two, up to some number of partitions.

225
00:44:51,960 --> 00:44:59,960
We're going to apply that same hash function h1 to the S slide get corresponding partitions in the second phase we're going to join the partition pairs.

226
00:44:59,960 --> 00:45:06,960
So we've been the hash table or partition zero or and probe it with S and basically we can get the whole joint using that divide and conquer that.

227
00:45:06,960 --> 00:45:09,960
You know that there's no like key lectures.

228
00:45:09,960 --> 00:45:21,960
Right. So now if you want to take an operator like that there's parallelism that you could exploit in that and you could basically say hey after I've done the partitioning step.

229
00:45:21,960 --> 00:45:35,960
The first partition could be joined by worker one second partition could be joined by worker two and I can keep doing that in parallel right so we'll take that and go further into that and break it down into these different level of parallelism.

230
00:45:35,960 --> 00:45:43,960
Okay now you're focused on this intra query parallelism a single query more than one worker is available how do you make that query.

231
00:45:43,960 --> 00:45:52,960
You can think of it as I want to primarily reduce the latency of this way.

232
00:45:52,960 --> 00:46:04,960
So we talk about intra operator parallelism which is using multiple operators to for example do that hash join better and you can think of it as a horizontal way to speed things up.

233
00:46:04,960 --> 00:46:18,960
The other one we'll talk about is vertical parallelism which is to look at the operators in a tree and do multiple operator simultaneously that's orthogonal to it that will be the vertical way and the textbook talks about something called the bushy way which is like you can do a hybrid of both.

234
00:46:18,960 --> 00:46:35,960
Really the first two ones are what's important and if you look at the scheduler stuff we talked about in the last class it naturally will do both of those but we'll very briefly talked about bushy just to keep it consistent with what the textbook says but you really need to know about intra and inter operator parallelism.

235
00:46:35,960 --> 00:47:03,960
Okay all right so let's start with the intra operator parallelism and the way to do this is to these in the hatching case as you saw we broke the table up into multiple pieces that divide these then allow it to conquer and do the individual foundation pairs and that hunger piece was the one in which we go exploit the balance.

236
00:47:03,960 --> 00:47:22,960
Control multiple workers they were independent pieces of work and they could be done if that will without the future and so trying to take the structure whether divide in some of the work and then after that each of the pieces of work can be done independently at its own pace after all of that work is done we can get the final result.

237
00:47:22,960 --> 00:47:32,960
Okay now how do you introduce that in a systematic way into your query operator tree which might have all kinds of complicated operations for him on.

238
00:47:32,960 --> 00:48:01,960
So there's a beautiful paper from good scruffy that talks about this exchange operator and i'll just show that to you with an example postress by the way calls it a gather operation but here is how it works take the simplest case where I want to apply selection on a table again the table might have a large number of paper pages let's say just five over here and i've got three units of hard work I want to exploit basically I can spin up key workers at the same time.

239
00:48:01,960 --> 00:48:17,960
So what you can do is spin up worker one two and three and tell worker one go and work on page one independently of telling worker to go and work on page two and essentially there's no interference in the work that is done by.

240
00:48:17,960 --> 00:48:46,960
My each of these workers because what we do is we'll introduce that exchange operator at the top postress calls a gather which probably might make more sense as a term it's going to take the work that is done by each of these workers which of these workers will operate on an independent page apply the selection and then send that across and in the operator model if you're doing this tree in a top down fashion the exchange will call the selection which will call the next which will call the next step.

241
00:48:46,960 --> 00:49:01,960
And then start producing data for page one and it throws out the exchange slash gather operation is just going to collect that result and then send it upstream to the next operator.

242
00:49:01,960 --> 00:49:26,960
And so right now this exchange is very simple we'll build it up into something a little bit more complex and just go walk through this example worker one starts a one goes and does its work the others can start in parallel so at this point in time if I look at the machine these three workers are working on three independent pages and getting more.

243
00:49:26,960 --> 00:49:42,960
As did is getting produced they're all getting sent to that exchange operator that's combining and collecting that producing its own pages for output that is going to create right so exchanges consuming from these three workers and then we'll become a producer in a little bit.

244
00:49:42,960 --> 00:50:11,960
These three workers can get done and then they can start to work on these other pages so in this example one and two got done maybe the few few records on that page to process for example and please work on it but that's okay one and two are done so they can be allocated for in five because a selection is naturally divided by the pages so we didn't have to do an explicit divide stack the conquer stuff is what we are doing over here in parallel and so.

245
00:50:12,960 --> 00:50:22,960
So at the second instance in time now worker one and worker two are working on pages four and five worker three will eventually finish up and the exchange operator will get all of its result.

246
00:50:23,960 --> 00:50:31,960
Okay the exchange operator has finished consuming that result but now it has to send it and do something upstream and so.

247
00:50:31,960 --> 00:50:40,960
That simple version of exchange you can think of it as a pure gather operation right just gathering stuff and could send all of its stuff as a single output.

248
00:50:40,960 --> 00:50:51,960
Now there's a different type of an exchange which is a distance between so what we saw in the previous slide was just a simple gather version of the exchange operation.

249
00:50:51,960 --> 00:51:09,960
It's to be a portion of that operation says the following i'm going to take something as input and I'm going to distribute it across multiple outputs to get imagine the distance operation for example leads a table R applies that hash function h1 and produces the coefficients for k.

250
00:51:10,960 --> 00:51:21,960
And the different distributes different distribute operator does the same for s and that's how you would think the part is instead of that race hash.

251
00:51:21,960 --> 00:51:29,960
So this is the opposite of gathered right the funnel is inverted a gather is going to take multiple inputs produce one output.

252
00:51:29,960 --> 00:51:33,960
The distributors going to do the opposite.

253
00:51:33,960 --> 00:51:48,960
Okay and when it does a distribution until use some function a hash function or round robin or range function again those will talk about when we get into both details in the advanced graduate class.

254
00:51:48,960 --> 00:51:57,960
Then there's a V partition component which is a combination of these two if I take a whole bunch of inputs.

255
00:51:57,960 --> 00:52:08,960
Gather them but instead of saying I gather and I have a separate distributes out in which I like to pass data cost to operators I can just lend that function into one is more efficient.

256
00:52:08,960 --> 00:52:14,960
What that will do is it might take input from three input workers.

257
00:52:14,960 --> 00:52:21,960
I might produce output to do different work so it might apply a totally hash function for example.

258
00:52:21,960 --> 00:52:32,960
Repotitions function is very general it could have inputs and outputs and now you can control the shape of that free and how parallel this needs to be.

259
00:52:32,960 --> 00:52:50,960
And so that's essentially the different flavors of the exchange operator that you see and of course if you look at the original paper exchange largely referred to that last portion and you can say if I have that operator the other two cases are special cases of it right which is a perfectly legitimate way to look at.

260
00:52:50,960 --> 00:52:55,960
Right questions.

261
00:52:55,960 --> 00:53:00,960
Where is all this which part of the database is where all of these files.

262
00:53:00,960 --> 00:53:03,960
Yeah.

263
00:53:03,960 --> 00:53:05,960
Yeah.

264
00:53:05,960 --> 00:53:06,960
Yeah.

265
00:53:06,960 --> 00:53:09,960
The dispensary no of all of this.

266
00:53:09,960 --> 00:53:14,960
Yeah great question so who decides on this degree of parallelism my m versus n.

267
00:53:14,960 --> 00:53:33,960
And it's a complex question I'll give you a quick answer which will be incomplete the optimizer often starts to make some of these first decisions and the trend more and more is to have smarter schedules like we talked about in the last class that can decide based on what hardware parallelism is available and the degree of hardware parallelism is also often changing on the fly.

268
00:53:33,960 --> 00:53:35,960
Okay.

269
00:53:35,960 --> 00:53:36,960
Great question.

270
00:53:36,960 --> 00:53:37,960
Yep.

271
00:53:37,960 --> 00:53:44,960
So we've taken this together effectively function as a signation from the send me.

272
00:53:44,960 --> 00:53:46,960
Yeah, three of these finish then.

273
00:53:46,960 --> 00:53:54,960
It does but we till I talk about the intro query parallelism because it can probably start to send in some cases things out but the simplest view of it is the.

274
00:53:54,960 --> 00:54:03,960
So the question was whether it's a synchronization barrier like primitive the simplest view of the exchange operator can be thought of that that's a barrier stops all of the flow below.

275
00:54:03,960 --> 00:54:09,960
So we talk about intro operator parallelism in some cases you get don't need to do that you could pass things along if it is safe to do that.

276
00:54:09,960 --> 00:54:13,960
So in a similar bank in the repetition.

277
00:54:13,960 --> 00:54:20,960
Can it like receive one input is like oh that's enough for this output so you know like it can it can synchronize on one thing and send one of the output.

278
00:54:20,960 --> 00:54:28,960
Yeah so the question is can repotation take some input and send it to one and finish that before it does the other or no if it's done.

279
00:54:28,960 --> 00:54:50,960
The answer is that's often hard because you don't know where all of the input is if the repetition was repining a hash function and you knew everything below it was already hashed then yes you could do something like that but the need for something like that is probably low it's better to do things in the smart scheduler like I was telling you in the last class which no one does except for a few systems but that would be the better way to do it.

280
00:54:50,960 --> 00:54:56,960
So if you want to do that you could just add the what would be the output to the the change in place.

281
00:54:56,960 --> 00:55:05,960
Yeah and that's right so the question is like effectively all these questions about can I shape the fan out and fan in of these exchange operators in general.

282
00:55:05,960 --> 00:55:16,960
Absolutely does the use implication on performance how to do that right burning questions especially in new environments where in a cloud environment a query may come you may have 10 notes to work on.

283
00:55:16,960 --> 00:55:32,960
So if the query is running maybe it's going to take a day to run it might have been given five of those resources might have been taken away 100 more have been added for a little bit of time and you have to work in that dynamic environment so lots of open research issues and we talk about a bunch of those in the database class.

284
00:55:32,960 --> 00:55:33,960
Yep.

285
00:55:33,960 --> 00:55:36,960
So operator on the same level.

286
00:55:36,960 --> 00:55:41,960
Operating well I'm working on the same level operator on the same operation.

287
00:55:41,960 --> 00:55:46,960
Yeah workers on the same level in that operator tree will be operating on the same operation.

288
00:55:46,960 --> 00:55:48,960
Yes is that the question.

289
00:55:48,960 --> 00:55:49,960
Yeah.

290
00:55:49,960 --> 00:55:53,960
Combining like results from true development have like different.

291
00:55:53,960 --> 00:55:57,960
It's like Java and you know, yeah good question.

292
00:55:57,960 --> 00:56:06,960
So I have a hash join for example I will have an exchange for the build site I will have an exchange for the pro site they'll then go into the hash let me just go to that.

293
00:56:06,960 --> 00:56:19,960
So here is a selection followed by a hash join let's say we start three we have three units of parallelism for the a side and we start that they start producing the output we have.

294
00:56:19,960 --> 00:56:31,960
In this case the projection has been pushed down below the joint which you can do query optimization when we talk about that will discuss that so here my pipeline is do the selection then the projection.

295
00:56:31,960 --> 00:56:45,960
And now I'm going and sticking all of that into the big side of the hash did because I'm partitioning that and so I will have something on the build site I will go and exchange that feed that into the joint.

296
00:56:45,960 --> 00:56:59,960
I can start the b site in a similar way and in this case is a three by three inputs on the exchange idea we're having two different for them and the sheep of the three depending on the behavior panels and you are to allocate across the different operators.

297
00:56:59,960 --> 00:57:12,960
The all legitimate and the end of the day however the join needs to end up having the input with a certain partition strategy if it doesn't then has to re partition internally in the operator.

298
00:57:12,960 --> 00:57:21,960
Again lots of interesting stuff many of those will be covered in the advanced database class let me keep moving.

299
00:57:21,960 --> 00:57:35,960
So the other approach to things benefit from families and it's going to come from what we just talk about that in drop operator of families and throwing more operate throwing more workers.

300
00:57:35,960 --> 00:57:47,960
The giving off using this exchange offering for to make all of that pre logic work for us with those two mechanisms you get the most out of the hardware that you have.

301
00:57:47,960 --> 00:58:04,960
Now a secondary mechanism which often gets used in streaming environments with this becomes a primary mechanism and it's giving environment the application for these are cases they they just floating in for example you're getting ticker prices you know you're getting paper update for all for thousands of.

302
00:58:04,960 --> 00:58:06,960
How is it so.

303
00:58:06,960 --> 00:58:25,960
Access coming in every and every millisecond and every second and if I would compute a sliding window aggregate for that right in that case the work that you do is not a lot but you have lots and lots of pieces of information do work for that entire party look at all the figure prices and you'll be out with you are

304
00:58:25,960 --> 00:58:33,960
effectively a convenient environment called stealing a garden where I see what comes in your producing the output and the unit of work is somewhere so.

305
00:58:33,960 --> 00:58:53,960
So this is just like storm play Kafka and I worked on both storm and heron that will do dead main parallelism is going to come from a combination of interim inter operator parallelism so what is this inter operator parallelism look like it's essentially also called pipeline parallelism.

306
00:58:53,960 --> 00:59:16,960
So if you know you next pipes you can connect to processes connect them by a process one is sending stuff is before it is finishing everything process to start working on what it is being sent to it both processes are operating on this free one data and you're not waiting for everything to be done by the first process before saying same idea same idea here so if I've got this operator tree or

307
00:59:16,960 --> 00:59:39,960
talking to doing all the inter operator parallelism what I can also do here is effectively say wrong let's see a threat if I'm in the federal model that's going to effectively go and do this joint but as it produces the joint after it gets a result over here the first time it produces a result it hasn't finished.

308
00:59:39,960 --> 01:00:08,960
So the first result is just send it and if that that operator over there will project the output and send it up so I don't have to wait for all of this to be done to see my first result and now you can see how in the streaming environment this would be extremely useful and even in a regular system it helps because you can use and the other worker the doing one thing the projection is not sitting idle it can start to do it work while the downstream work is still happening.

309
01:00:09,960 --> 01:00:17,960
So both of these are orthogonal mechanisms and you can use both of them in parallel but they're very distinct mechanisms.

310
01:00:18,960 --> 01:00:37,960
I'm just going to glance over there's the text book talks about a bushy pipe parallelism which is a hybrid of both of those there's really no magic to it is even unclear if you should call it that I think they're the only ones who call it a bushy parallelism no other text but if you read the text book I don't want you to get confused the main idea is if I've got three

311
01:00:38,960 --> 01:01:07,960
often freeze of this time where you're joining speeding into other joins is called the bushy three that you got those two joins up there feeling into an exchange operator right so the exchange is getting input from two different join operations and effectively what this is saying is I could do interoperator parallelism at some level like in the first join I could be using interoperator parallelism I could also be doing pipelining across each of these individual branches of the tree I can be working on multiple branches at the same time.

312
01:01:08,960 --> 01:01:36,960
So it's just a combination I don't spend too much time on that but basically you could do that essentially if you look at the scheduler that we talked about in the previous class all of these that the bushy type of parallelism just implicitly comes for free so you don't have to over engineer it there's no rocket science to do it here okay and just hold that question till the end of the class I think I know what you're going to ask but I don't spend too much time on the bushy tree just want to dot the eye and cross the tea on that.

313
01:01:36,960 --> 01:02:05,960
So what have we talked about so far that we want to have to use all the hardware parallelism that we and to do that we have all these complex worker models but now we're going to look at go from that level to a slightly lower level which is you know so far essentially everything we've talked about is essentially say I've got 40 cores how do I use them oh I've got 100 nodes sitting in my rack how do I use them now.

314
01:02:06,960 --> 01:02:35,960
But when an IO needs to get request said it needs to be sent to the IO subsystem more often than not that IO subsystem is going to be a complicated system might have multiple disks in it and so we're going to start talking about IO parallelism right so we are now one level down and starting to make requests on the IO subsystem and they two are going to different parallel system right is the IO subsystem parallelism and a little different than some people.

315
01:02:36,960 --> 01:02:39,960
So I think it's going to be a little different than the one that we have to work together.

316
01:02:40,960 --> 01:02:42,960
Does that make sense?

317
01:02:42,960 --> 01:02:50,960
Because I'm not running on a single disk and probably running even on given server with a bunch of disks and this parallelism there too.

318
01:02:50,960 --> 01:02:53,960
So this idea sorry.

319
01:02:53,960 --> 01:03:05,960
And here to make these a parallel parallel parallelism you're going to have some notion of how we have made out data across the different disks that we have.

320
01:03:05,960 --> 01:03:14,960
There many ways of doing it I could say I may have four disks and four databases each database gets a disk obviously that's pretty hard right.

321
01:03:14,960 --> 01:03:24,960
I might say I've got you know four disks and every table sits on his own disk and some disks might have multiple tables and just write about a single database for example.

322
01:03:24,960 --> 01:03:31,960
I could have multiple disks for database and then one of these or I could go to the extreme and say everything can be partitioned whichever way.

323
01:03:31,960 --> 01:03:44,960
All I need to worry about is for each table if I've got four disks doesn't go to four disks or three disks or two disks or one disk and I can control that and then I have mechanisms to go deal with that level of parallelism.

324
01:03:44,960 --> 01:03:57,960
See if all the data was sitting only in one one disk and I thought worker threads running on it through interoperator parallelism they're all going to hit that disk right that will become my bottle.

325
01:03:57,960 --> 01:04:06,960
Okay so that's why I was in important because if you don't pay attention to that everything that you're trying to do in that compute layer is going to get brought in a tier next.

326
01:04:06,960 --> 01:04:11,960
Does that make sense how these two are connected.

327
01:04:11,960 --> 01:04:16,960
Okay all right so what can we do.

328
01:04:16,960 --> 01:04:27,960
So first is there's a whole class that talks about things like data on disk doesn't last forever.

329
01:04:27,960 --> 01:04:35,960
I'm going to just present the high level over here and hopefully teach you take classes in the tunnel research that rush me does over here on duration coding.

330
01:04:35,960 --> 01:04:45,960
It all has to do with this massive area say I'm stored data on a disk where the SSD or spinning this and bad things happen to it.

331
01:04:45,960 --> 01:05:04,960
There are billions of bits sitting on these devices and some bits are going to get corrupted and maybe running some sort of checks on and stuff like that at the page level but disks but bits in a disk rock is called bit rotting and just like actual fungus and rot that rot tends to spread.

332
01:05:04,960 --> 01:05:25,960
So essentially I have stored data on disk but I need to be able to get data back and it better be the data I wrote I don't want to lose data I don't get wrong information and I nearly always in the survey environment won't have a single disk for the collection of disk that collectively behave like an IO subsystem so I need to work with that.

333
01:05:25,960 --> 01:05:37,960
So there are three competing dimensions I want high performance if I've got four disks and I'm going to make a call to that can I get the collective power of those four disks on a single scan that performance.

334
01:05:37,960 --> 01:05:52,960
You have lady I know disks are going to lose some bits are going to rot other bad things are going to happen to disk I want to replicate in that layer so that if something's bad I can get the coffee and I need to keep the coffee consistent in just the IO subsystem.

335
01:05:52,960 --> 01:06:19,960
So I want to use as much of the capacity of the disc collective storage capacity I have while getting these other properties and obviously they compete with each other as I said this is a whole area by itself so I can do justice to it but just want to appreciate have you appreciate that when you talk to an IO subsystem even on the local server is this this is the IO level and we need to be aware of it.

336
01:06:19,960 --> 01:06:30,960
So I want to talk to you in the final or distributed system the IO subsystem is spread across and the cloud environment often the whole storage there is it's in a different cloud and there's a compute cloud and a storage cloud.

337
01:06:30,960 --> 01:06:40,960
Okay, so it gets even more complicated but let's just keep it simple so you can appreciate the basic and then gets you set up to do more advanced work in that area.

338
01:06:40,960 --> 01:07:09,960
So I want to talk about a file of six pages to the database system this is a logical view I start a scan on this file I will say get me page one page two page three it comes to the buffer pool the buffer pool just gets about these page IDs but at the file system level or if we decide that we are going to take that over from the operating system we have to figure out how to lay these things out in many database systems will take this part over from the operating system and they things out you have certain properties at the database there.

339
01:07:09,960 --> 01:07:14,960
Okay, okay, those are things we'll talk about in the advanced class I just want to give you a flavor of that.

340
01:07:14,960 --> 01:07:29,960
So imagine I've got three disks, three physical disks I could take those those pages and spread them across in the following grade one to three I'm just typing in a rob robin fashion first page on person second on the second and so on.

341
01:07:29,960 --> 01:07:39,960
Another person say scan page one I start worker one to scan worker page one worker to start to work on page two worker people work on page.

342
01:07:39,960 --> 01:07:58,960
I'm going to be able to leverage the entire panelism in the in the dissups system this disk and scan key pages at a given time because each this can serve up a single page I'm going to get that are your families and if I don't pay attention to this and if I said for the first worker is going to page one same word is going to be page two that this could be the bottom.

343
01:07:59,960 --> 01:08:14,960
But now perhaps this typing scheme which there used to be this old subsystem called rate which has been superseded by erasure codes this used to be called rate zero it's simple striping other technical term for that is striping I'm just striping across the disk.

344
01:08:14,960 --> 01:08:24,960
Okay, now I can get high performance high capacity but what do I not get durability page one is rotted I lost that information.

345
01:08:25,960 --> 01:08:39,960
Okay, the other way is oh I really care about durability I'm going to mirror everything I'm really fine right about it or some of the form of the device getting corrupted and I'm going to make copy of page one three times.

346
01:08:39,960 --> 01:09:08,960
And so every base has three pockets now we can still get time with them so if worker one starts I can say you go get it from here worker two starts and which we say you go work here worker three you can say go use this so I can still get performance I can get durability but I cannot get my capacity my capacity is good by a third because I'm making three copies now as I said this is a very simple technique two of the earlier numbers in rate mirroring and striping the more than we could do it is to work with the other person.

347
01:09:09,960 --> 01:09:30,960
And this used to be done all in the hardware there's to be hardware rate device drivers that do that that's still deployed in the wild right now but the modern need to do it is to do all of this in software connecting to a question that was asked here is that you know take that over you know have this nice a boundary division of labor between hardware and software much better to write that stuff in software that to it.

348
01:09:31,960 --> 01:09:46,960
And you can also do things like in software I don't need a device driver that is tied to three controllers or four controllers that software could actually be controlling this set us spread across the planet in a distributed system and can build all kinds of fancy stuff at that.

349
01:09:46,960 --> 01:09:55,960
They're called racial codes they'll do parity bits and then there's a question of how many parity bits to a need for copy of the data to balance that trifecta of competing goals.

350
01:09:55,960 --> 01:10:06,960
So again there's a whole class on that and some cutting edge research happening here at CMU on how to do that well and I noticed this camera has been off the whole time now yep go for it.

351
01:10:07,960 --> 01:10:15,960
Question yep does for example the these processing with BTRFS in ZFS to use a region.

352
01:10:16,960 --> 01:10:27,960
Some of them use some version of that and have to look at the details for that but erasure codes are used all across in cloud file systems that's the way modern cloud file systems are all right yeah.

353
01:10:28,960 --> 01:10:30,960
Okay other questions.

354
01:10:33,960 --> 01:10:40,960
Okay and make sure I get you guys out of here in time but as I said lots of really open and interesting questions here.

355
01:10:41,960 --> 01:10:53,960
And most of the time when this is done at the file system or often there are these entire subsystems that do this software storage architecture.

356
01:10:54,960 --> 01:10:58,960
This is often transferred to the database system but as I.

357
01:10:58,960 --> 01:11:19,960
I do appreciate it is if the database system mean kind of what this was it can probably do a better job with what that allocation is so again this is one of those things that is still evolving say how transfer it should this be from the database system many of the storage vendors are right now building it as being pretty transparent but that battle is being fought as people try to figure out what's that right control.

358
01:11:20,960 --> 01:11:21,960
Okay.

359
01:11:23,960 --> 01:11:24,960
All right.

360
01:11:24,960 --> 01:11:25,960
Okay.

361
01:11:26,960 --> 01:11:34,960
Database partitioning this relates to what we just talked about and should control the layout of that data of this.

362
01:11:34,960 --> 01:11:48,960
Okay that's a little bit of talk with you how many copies to any for the duty aspect and how do we piece all of these competing goals about of course databases by doing where the data is because that allows us to do things with locality.

363
01:11:49,960 --> 01:12:12,960
And so many database systems will allow you that work in this parallel distributed environment will allow you to specify where this data goes either through hints or explicit mechanisms certainly in the embedded system you will be looking at allocating that in the local file system and post recipe install it will tell you hey which is the directory in the local file system because it's just single node.

364
01:12:12,960 --> 01:12:31,960
Do I store all my stuff that's very simple but you know there are more complex mechanisms and database systems are going to use the buffer pool manager to map the pages to a disk in some sense insulating ourselves from that little pain saying oh if the I only are hasn't given me control over where the pages are or knowing the location.

365
01:12:31,960 --> 01:12:47,960
Fine at least if the pages are reactivized over and over again they're in my buffer pool and I can insulate myself first I get a lot more efficiency because it's way faster to access data in the buffer pool but it can mitigate some of that other challenges that come from not knowing precisely where things are.

366
01:12:47,960 --> 01:13:16,960
When we talk about recovery and transactions you'll notice that things like the recovery log that's a place where we keep track of what changes have we made to records and pages in a transaction and that needs to be that needs to hit the storage device before that query that transaction query can be declared done and their complications over there too if that recovery log is in the file system and it gets cached in the file system but not actually.

367
01:13:17,960 --> 01:13:29,960
Put to this we haven't really committed the transaction and so there's going to be that interplay that also happens between the file system and we'll cover that as we talk about those discussions in.

368
01:13:29,960 --> 01:13:46,960
When we get to the transactions are component of this class partitioning is is a rich topic you can take a table you'll see many systems which will tell which will allow you to say things like here's the table hash partition all the records in this class.

369
01:13:47,960 --> 01:14:00,960
So, you can take a table based on certain set of keys I think that it's relatively support that or partitioning may be transferred to the application and when you have a parallel distributed database system that will be a digital richness in the SQL schema that allows you to specify.

370
01:14:00,960 --> 01:14:18,960
So, we'll specify actually some of these partitioning countries and they obviously have big impact on what that performance of that end to end system looks like but those will get covered in the advanced database class so again this is a plug for those of you are really interested to take that in the next semester.

371
01:14:18,960 --> 01:14:21,960
Okay, so we covered a lot today.

372
01:14:21,960 --> 01:14:31,960
All of these techniques that we discussed are addressing the point that other families in this every bit you cannot buy a single core machine anymore.

373
01:14:31,960 --> 01:14:47,960
The cloud system it's a huge set of families in that's a little bit locally in a single note single server to a customer service in Iraq, the rack sitting in a data center data centers being spread across the globe and how do we exploit all of this parallelism.

374
01:14:47,960 --> 01:15:10,960
We need mechanisms for doing scheduling we talked about that in the previous class we need mechanisms to change the operator to introduce the exchange operator need to have interoperator table is in the big work force for getting a lot more performance of the hardware and of course we need to better understand how partitioning works so that we can work better with that underlying layer.

375
01:15:10,960 --> 01:15:19,960
And so with that this is what we'll talk about the next class will start going to query optimization and talk about the different steps for what makes a query optimizer works.

