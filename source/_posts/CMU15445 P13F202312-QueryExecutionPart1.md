---
title: CMU15445 P13F202312 QueryExecutionPart1
---

1
00:00:00,000 --> 00:00:19,120
This is P

2
00:00:19,120 --> 00:00:30,080
Alright, let's give it up for DVN Shroom Bomb.

3
00:00:30,080 --> 00:00:38,120
E and I are both from Bombay and while the music was playing, how much of the population

4
00:00:38,120 --> 00:00:40,120
of Bombay go up by in that two minutes?

5
00:00:40,120 --> 00:00:42,120
I guess 100,000?

6
00:00:42,120 --> 00:00:43,120
Yeah, something like that.

7
00:00:43,120 --> 00:00:46,120
It's like a city of 15, 20 million.

8
00:00:46,119 --> 00:00:49,119
Every time I go back every few years, there's like a million more.

9
00:00:49,119 --> 00:00:53,119
I don't know how they keep packing all of that stuff up, but that's great.

10
00:00:53,119 --> 00:00:54,119
Alright.

11
00:00:54,119 --> 00:00:55,119
20 million.

12
00:00:55,119 --> 00:00:56,119
20 million.

13
00:00:56,119 --> 00:00:58,119
This stuff counting.

14
00:00:58,119 --> 00:01:00,119
Yeah, yeah, that makes sense.

15
00:01:00,119 --> 00:01:01,119
So great.

16
00:01:01,119 --> 00:01:02,119
Alright.

17
00:01:02,119 --> 00:01:06,120
Today, we are going to talk about very execution.

18
00:01:06,120 --> 00:01:09,120
We'll start with a couple announcements.

19
00:01:09,120 --> 00:01:14,120
The first one is that you already know,

20
00:01:14,120 --> 00:01:21,120
homework, please do on October 8th and project, please do an October 29th.

21
00:01:21,120 --> 00:01:23,120
The big thing is the midterms.

22
00:01:23,120 --> 00:01:28,120
Hopefully none of your surprised is the next lecture in class.

23
00:01:28,120 --> 00:01:36,120
The material for that is everything that we covered till last week, including the two lectures from last week.

24
00:01:36,120 --> 00:01:41,120
So today's lecture is not material for the midterm, but it's obviously material for the final exam.

25
00:01:41,120 --> 00:01:47,120
So don't stop paying attention today, but you don't have to worry excessively about this lecture just yet.

26
00:01:47,120 --> 00:01:50,120
You worry about it during your final exam.

27
00:01:50,120 --> 00:01:54,120
Questions on the midterm?

28
00:01:54,120 --> 00:01:55,120
Okay.

29
00:01:55,120 --> 00:02:00,120
Alright, so we'll get started and look at.

30
00:02:00,120 --> 00:02:03,120
Yeah, for the midterm, do you get a cheat?

31
00:02:03,120 --> 00:02:05,120
Yes, I was going to announce that all in the end.

32
00:02:05,120 --> 00:02:10,120
The quick answer is yes, you get a cheat sheet that you can write on both sides, but handwritten.

33
00:02:10,120 --> 00:02:14,120
So you don't put in like six point font and come with binoculars and stuff like that.

34
00:02:14,120 --> 00:02:25,120
So ultimately look, by philosophy is that if you need a cheat sheet just to have to get yourself from worrying about what formula's I need to remember, that's what a cheat sheet is for.

35
00:02:25,120 --> 00:02:27,120
It should not stop you.

36
00:02:27,120 --> 00:02:30,120
It should not be the way you say I'm going to pass the exam.

37
00:02:30,120 --> 00:02:31,120
It will be a pretty bad idea.

38
00:02:31,120 --> 00:02:39,120
We really want you to understand the material in this course so that if you're an interviewer talking to someone who understands databases and they ask you question.

39
00:02:39,120 --> 00:02:44,120
If you don't say, wait a minute, I need to get my two page and written cheat sheet before I answer that question.

40
00:02:44,120 --> 00:02:46,120
Okay, so that's not the goal.

41
00:02:46,120 --> 00:02:49,120
It's it's just a safety measure.

42
00:02:49,120 --> 00:02:51,120
It's not the way you pass the exam.

43
00:02:51,120 --> 00:02:57,120
And I'll talk about more about it when we get to that portion of the talk towards the after we finish today's material.

44
00:02:57,120 --> 00:02:58,120
Okay.

45
00:02:58,120 --> 00:03:01,120
Alright, and some of you in the classroom, I know you like to talk with each other.

46
00:03:01,120 --> 00:03:02,120
That's great.

47
00:03:02,120 --> 00:03:08,120
If you do, if you intend to talk to each other a lot, at least in the back room, being a student a long time ago.

48
00:03:08,120 --> 00:03:12,120
I know if someone in front of you is talking a lot, the people behind you get disturbed.

49
00:03:12,120 --> 00:03:15,120
So if you think you're going to talk a lot, then just stay in the back seat.

50
00:03:15,120 --> 00:03:16,120
It's just easier.

51
00:03:16,120 --> 00:03:20,120
And I'm okay with that as long as you don't disturb everyone else.

52
00:03:20,120 --> 00:03:21,120
Okay.

53
00:03:21,120 --> 00:03:22,120
Great.

54
00:03:22,120 --> 00:03:27,120
We'll talk about processing models today, which is how does a query get processed?

55
00:03:27,120 --> 00:03:31,120
We'll dig into the details of the different methods and mechanisms.

56
00:03:31,120 --> 00:03:44,120
Then talk about these things called access methods, which is the way in which the query operators will start touching the data, sitting in memory or in disks for the first time before it feeds into the rest of the query.

57
00:03:44,120 --> 00:03:50,120
Then talk about things that you might have to make changes to when you worry about deletes and update types of queries.

58
00:03:50,120 --> 00:03:56,120
We'll look at expression evaluation, then do a very quick midterm review and hopefully we'll have enough time for that.

59
00:03:56,120 --> 00:03:57,120
Okay.

60
00:03:58,120 --> 00:04:07,120
All right. So the processing model is what defines how a database system implement the execution of the different queries.

61
00:04:07,120 --> 00:04:19,120
And the best way to think about the processing model is to say, if I were to write a database engine from scratch and you're already working with bus stop so you know a whole bunch of how that works.

62
00:04:19,120 --> 00:04:31,120
But imagine you have to start writing something from scratch and say how do I execute a query, which as we know from previous lectures comes in the form of a relational algebra operator, plant tree.

63
00:04:31,120 --> 00:04:35,120
And data is going to flow from the bottle and the results come out at the top.

64
00:04:35,120 --> 00:04:48,120
So how do I write that code? How would I write that code for that operator to make all of that happen because the shape of the tree can be arbitrary, but the code you're going to write for each operator and code specific algorithms like a hash join for a joint operator.

65
00:04:48,120 --> 00:04:53,120
Or a shortboard join or index nested loops or block nested loops.

66
00:04:53,120 --> 00:05:02,120
And the inputs for that operator when it's running either one of these algorithms is going to be some other portion of the query plan that's doing its own thing.

67
00:05:02,120 --> 00:05:07,120
You're assembling this flow on the fly and what are the different ways in which you can bring it together.

68
00:05:07,120 --> 00:05:15,120
So really the best way to understand these processing models is to say, how would I write the code for a database engine from scratch.

69
00:05:15,120 --> 00:05:20,120
If I had to do that, that's the best way to try and understand the operator model.

70
00:05:20,120 --> 00:05:29,120
And hopefully you'll get that appreciation in a bit. There are three different operator models will go through each one of those in turn.

71
00:05:29,120 --> 00:05:35,120
The iterator model is the simplest and we look at an example next.

72
00:05:35,120 --> 00:05:57,120
Three functions, imagine defining a canonical function definition for each of these operators, whether it's a scan that reads a file or an index selection or a join or an aggregate or a projection, right, all the stuff that you know from what are nodes in an operator tree.

73
00:05:57,120 --> 00:06:08,120
Each of those operators, we want them to have the same signature. The code is there is going to be dependent upon the algorithm that it implements, but you want the signature to be the same so you can mix and match.

74
00:06:08,120 --> 00:06:19,120
What does that signature look like? The three key components of the signature are there's an open and close start the operator close it like a constructor and destructor for a class.

75
00:06:19,120 --> 00:06:34,120
And the key component of that, the main part that's how it interacts with everything else is going to be this next this next call in the iterator model, which is the first of the three models we are looking at is simply going to say I'm doing whatever I'm doing.

76
00:06:34,120 --> 00:06:55,120
If I'm a selection operation, I'm trying to look at the data, apply the predicate see if it passes that predicate and if so, I'm going to do something with it next is basically say what's the next record that I send to someone else who needs that input who needs my output as a report.

77
00:06:55,120 --> 00:07:16,120
So next you can cast all of this in very much like the iterators that you see in C++ and other languages, right. You are iterating over a range of values except in the operator model, you're iterating over the records that are getting produced, you don't know where the start and end is that's going to be dependent on the semantics of that operator and what it does.

78
00:07:16,120 --> 00:07:25,120
So it's not a predefined you don't know how many next functions are going to be called, but you know you'll keep calling next if I'm talking to an operator and consuming from it.

79
00:07:25,120 --> 00:07:34,120
You keep calling next till the operator returns an end of file saying I don't have anything else and then processing everything I need and that's your end of it, right, a marker.

80
00:07:34,120 --> 00:07:38,120
Okay, the open and close adjust to tear up and tear down stuff as you need to.

81
00:07:38,120 --> 00:07:43,120
So the next function is bringing in data or is it returning next function is bringing in data.

82
00:07:43,120 --> 00:07:53,120
Okay, and then of course the person who's implementing it has to output the data for the function to call so as an implementer, the next is to output the record as someone calling next is to consume that.

83
00:07:53,120 --> 00:07:55,120
Okay.

84
00:07:56,120 --> 00:08:07,120
And of course operators will take things from other operators and output stuff so they'll call nest next and they will also go and have the nest function so it'll all become clear in this light.

85
00:08:07,120 --> 00:08:12,120
So imagine a very simple query which we're going to use as a running example so let's get to know it.

86
00:08:12,120 --> 00:08:15,120
It's got two tables are a nest that's a sequel.

87
00:08:15,120 --> 00:08:21,120
This is the relational algebra representation for that query now hopefully all these operators are very familiar to you.

88
00:08:21,120 --> 00:08:26,120
If not you've got less than 48 hours to brush it up with some exam.

89
00:08:26,120 --> 00:08:38,120
You'll apply a selection here where the criteria is value is greater than 100 to a natural join between the R and S records produce the joint records and only key the two IDs.

90
00:08:38,120 --> 00:08:47,120
Now of course an optimizer which we'll see later on is going to try and do other types of things like it when most of the projection for the down this stuff like that ignore all of that.

91
00:08:47,120 --> 00:08:52,120
Today we're just going to try and run this query with these three different processing models.

92
00:08:52,120 --> 00:08:54,120
Okay.

93
00:08:54,120 --> 00:08:59,120
So start by opening up all these operators.

94
00:08:59,120 --> 00:09:10,120
So what just happened is we just initiated each of the operators instances right so we just called new on the operator whose code implements each one of that.

95
00:09:10,120 --> 00:09:13,120
Let's see what each of the code looks like.

96
00:09:13,120 --> 00:09:17,120
Let's start with the simplest one here which is a simple scan.

97
00:09:17,120 --> 00:09:38,120
What this is saying is for each record T tuple in the relation S so that's the database file it will open up and it's end to simply going to emit T right so it's just reading from the five consuming from it and outputing that this operator is saying and we connect all up in in a second is say I'm going to read from here.

98
00:09:38,120 --> 00:09:47,120
To this loop we're going to call the next on the child so that's the question that he just asked and I'm going to evaluate that predicate which is a selection.

99
00:09:47,120 --> 00:09:54,120
And this is effective either next call it implement that next call calls the next forest child.

100
00:09:54,120 --> 00:10:03,120
So imagine now we opened all of it and I'm not going to show how the connections are made we'll talk about the scheduler towards end of the lecture and we'll make that a little bit more explicit.

101
00:10:03,120 --> 00:10:15,120
So all opens have been called and as part of the open calls it's been set up that the root node has one child the child has two.

102
00:10:15,120 --> 00:10:30,120
Operator instances it's talking to the left and the right and the this over here has one more entry okay so the tree have been set up and effectively you can think about the talk mode having a function pointer to this when the open happened and in turn.

103
00:10:30,120 --> 00:10:52,120
That open call this open that open call this open and that second open for call this okay so the open setup all that point so implicit in this diagram is that these things have been set up in the order in which we did that right so watch this again start with the top it opens opens another one open open open and all of those things are called up so now.

104
00:10:52,120 --> 00:11:10,120
So at runtime in your system you've got the top corresponding to the root of this tree and as you'll see in a little bit the database engine is just going to call next on that one is going to invoke the next function on that which in turn will.

105
00:11:10,120 --> 00:11:26,120
We'll apply the next call all the way down to go and start evaluating this girl okay this makes sense so far as to what we just did we just open the connections that set up the function connections has the same shape as the tree and now we get started we're ready now.

106
00:11:26,120 --> 00:11:39,120
So this is the open function of the next function the open function was implicit when this the boxes came up so this you can think about what shown over here as the implementation of the next function okay the main part the open happened as the boxes opened up.

107
00:11:39,120 --> 00:12:08,120
And the pointers was set up okay and the close will be tell down I'm not even going to show the close anyone said allocated intermediate structure will remove it typically the operator themselves written as classes if you've written it in a language like C plus class so you'll call the destructor of that class which implements usually the close function but often there's a separate close function for cleanup but that's details you talk about that in the advanced class if you want to keep some of these running especially if you're in the streaming environment but that's a.

108
00:12:08,120 --> 00:12:21,120
But that's a site note there's sometimes in some database systems since streaming environments you might keep them around forever okay and just close it but keep the state around all right other questions.

109
00:12:21,120 --> 00:12:37,120
What does child represents it's children child right so for me and child basically say something called the next off my child which is this not that makes sense right and this has basically a left and a right which are the left and the right children.

110
00:12:37,120 --> 00:13:06,120
So look at that pass code it says hash hash join implementation is what's shown here it's going to say get everything from this site on which I'm going to build a hash table so it has to first read everything from this site then once a half table is built it has to go and read from this site which in turn will call all of this up and then produce the pro okay and then it can send it stuff up so here's the animation for it so we'll start by calling the top most next.

111
00:13:06,120 --> 00:13:35,120
The top most next function gets called at the very top that in turn calls the next function here okay that code starts to run for T1 building left next so it's going to call the next year right and now when it calls that next year it goes and so that call that call calls this next year so we are here everyone with me as to what's happened so far right all of this is set up in memory function state has been set up now for the first time we.

112
00:13:35,120 --> 00:14:04,120
Now for the first time we start touching data this starts reading records from the table all right it starts to run and starts emitting the record as soon as it finds it it returns back the next as soon as it finds the record okay internally to keep track for where it is in that relation are so the next time it's called it would fetch the next one haven't shown all that state stuff but you can imagine that status get here so now one record has been fetched from the bottom and then it returns that.

113
00:14:05,120 --> 00:14:26,120
So in this simple iterator model each next call returns one record okay now it comes back up over there and obviously the hash one code can't do anything else to the first two lines are one which is building the hash table so guess what's going to happen in someone helping what will happen next in this cold floor yeah.

114
00:14:26,120 --> 00:14:55,120
Yeah yeah got me again so this will look and this will look till how long someone from this side of the room I'm noticing the class and most of the hands are raised here so I'm going to try and spread this load out and maybe next time you can shuffle around yeah read the entire table exactly all the our records will be read and eventually then end of file indicator will come to this new over here at which point the code is allowed to proceed to that second for loop okay so.

115
00:14:55,120 --> 00:15:25,080
Okay so that will go on till you get to that but one record at a time and then this part gets involved now we stop touching data for the first time on the s side and same thing happens but this time that loop goes up to that next child the record gets selected if it passes that predicate and if it does it goes in there and the query runs till it's done eventually now if something hits in the hash table it gets output it there so that next.

116
00:15:25,120 --> 00:15:55,080
Call that was called from the root a long time ago now gets its first result after an entire hash table has been built and the pro side has been fed to it that selection of records that passes selection and hit in the hash table okay and what does it get as output at the root one record the first record from the output relation okay alright so this is a simplest model all databases started by implementing this you know.

117
00:15:55,120 --> 00:16:05,560
Many of the database is that we see today at the older ones had the roots in the 1970s and 80s and as you can imagine as a programmer this was the easiest thing to do.

118
00:16:05,799 --> 00:16:25,080
And the single record at the time interface was not a big deal because you're pretty much at that time the memories won't that large your book of rules was really small thousand pages 10,000 pages pretty tiny most of the time you are going out to this and so the cost for this was very reasonable and this was such an easy implementation right you can see as a.

119
00:16:25,120 --> 00:16:28,679
Programmer it's a very easy code to write.

120
00:16:28,679 --> 00:16:35,159
Okay now what do you think of the downsides of this what do you think is inefficient about this.

121
00:16:35,159 --> 00:16:40,440
It seems like because you have an iterator on everything you can't really realize super easy.

122
00:16:40,440 --> 00:16:53,480
You can't capitalize super easy that's true though the three were a bushy tree then you could start the left side right side you could do stuff like that really right so super easy to capitalize but hold on hold on yep I'm coming to you guys next stop thinking.

123
00:16:53,480 --> 00:17:02,600
I have been done operations which are like at the base of the tree but yeah to keep running this for the you can't do these kinds of optimization.

124
00:17:02,600 --> 00:17:11,839
You mean like the S is being stand multiple times with different parts of the tree yes yeah for example like if you do like multiple ware causes or different.

125
00:17:11,839 --> 00:17:12,240
Yeah.

126
00:17:12,240 --> 00:17:25,200
Yeah that's true that will happen in all the models but that's a good thought hold on to that thought when you talk about expressions which you're right there's certain optimizations you could do.

127
00:17:25,200 --> 00:17:33,079
When there are patterns spread across the different trees but that will be true for all the other models right there's an even bigger problem here.

128
00:17:33,079 --> 00:17:35,599
Okay.

129
00:17:35,599 --> 00:17:52,279
Is it that you can use a static hash table but the bigger problem is that most operate you know the I'll go to that part over here and then come back to the previous slide is that you are whoops.

130
00:17:52,279 --> 00:18:03,719
You're going to be calling a lot of these function calls over and over again and what's the sequence that's happening in the situator model I call a function do a work get one.

131
00:18:03,720 --> 00:18:23,240
Record back so how many times do you think I'm switching context between these operators like take this slow here this code runs goes all the way down function switched over to a different function that needs to be run then that function ran it did it stop and then one record got.

132
00:18:23,240 --> 00:18:31,079
So when this that there are billion records flying it will be billion times three loops to that one record at a time so that's slow.

133
00:18:31,079 --> 00:18:52,279
A lots of function calls they can be pretty expensive especially if your data fits in memory all of a sudden that's a cost that adds up second is sometimes if you have lots of functions been called other queries running stuff like that you know your function code is not getting a chance to stay in the instruction cash it's getting swapped out.

134
00:18:52,279 --> 00:19:11,599
So instruction cash is where your code that is being run stays in the highest level of the process a cash human functions which is generally not good for it so that lots of reasons why this is inefficient is for every little thing you have to go back right it's too low level every record involves going through a loop that you're seeing in this call.

135
00:19:11,759 --> 00:19:23,439
Okay so it starts to get really inefficient and as I said most database systems have that in fact you see a list of database systems over here some that are massive big database systems billion dollar companies are more.

136
00:19:23,879 --> 00:19:30,439
And they still have this model because it's super easy to implement and reason about okay also pretty easy to debug the code.

137
00:19:31,319 --> 00:19:35,919
Because you can you know at any point as to what's happening it's a much more easier flow to reason about.

138
00:19:36,360 --> 00:19:47,039
All right so all of this made sense in the 1980s or so but then memory started to get bigger and there are other models that were there.

139
00:19:47,720 --> 00:20:05,880
This is a second model which is called the materialization model and what this says is that i'm going to when an operator is called imagine the next saying what i'm going to do in my next stuff is produce the entire output and then return it back up to my color.

140
00:20:06,880 --> 00:20:18,759
Okay so that way each operator is getting called once at the root at the base of the tree of the operator tree returns its whole output and then it's done.

141
00:20:20,200 --> 00:20:28,240
Okay so here's what it looks like same tree as before the code looks a little different now but the code component of it is still the same.

142
00:20:28,759 --> 00:20:44,319
And the main part which you can see is now there's this out so this scan on r is adding to an internal area think of it is getting in memory but sometimes it can be spilled to this too for the focus of the lecture we just say it's kept in memory.

143
00:20:44,680 --> 00:20:55,000
And then once it is done returns the whole array which is all the records in the table r so it's a copy of the table are in an array that is sent to the parent right so the flow now looks like this.

144
00:20:55,599 --> 00:21:04,680
Same way set things up this gets called a return which is all the records that's it that looks going to be run that do three loop is run once.

145
00:21:05,759 --> 00:21:10,559
Okay not once per record once per record in the art table is just run once for the query.

146
00:21:12,559 --> 00:21:12,880
Okay.

147
00:21:13,880 --> 00:21:34,880
All right now as you can imagine then the second piece of that hash join code hash join is a blocking operator it needs to see everything from one side before it can do anything else as you can see i've called the hash even in this scenario the next call call to it a long time ago it still has to get all of this stuff then start crossing the other side before it can do that right.

148
00:21:34,880 --> 00:21:54,880
Unlike something like this which can start doing its work as soon as it's called it's not dependent on anything it can just stream through it it doesn't have a blocking component hash join sorting aggregates and naturally blocking they have to see all or most of the input for the hash join it as to see all of the left side before it can start emitting anything else to its parent.

149
00:21:55,880 --> 00:22:03,880
Okay same thing here no rocket science here all arrows flowing up ascending entire tables for the whole thing.

150
00:22:04,880 --> 00:22:06,880
What the result of that operator.

151
00:22:08,880 --> 00:22:28,880
Okay now where does it work well this works well when your queries don't have large tables that need to be sent across which happens in OLTP environment that are transactional workloads i'm updating a record or you log into Amazon and you have a customer ID just need to look up your profile information to start populating the web page right stuff like that.

152
00:22:28,880 --> 00:22:57,880
So very few records are passed along that entire query plan tree so the tables that are in between are relatively small in which case this is a pretty easy implementation and it requires the least number of calls that you need to make to these operators right because the operators get called once they do all the work and send stuff out it's pretty efficient for the short queries that happens in these OLTP environment where the workload largely consists of small transactional stuff that touch on very small fraction of the data.

153
00:22:58,880 --> 00:23:27,880
Either to read a few records from a gigantic table or to basically update a few records right and we'll talk about updates in a little bit one of the databases that you see your whole DB and the ad worked on that before and from what I understand he wrote one of the first operator models based on the materialization approach it's also pretty easy code based to reason about you could put a break point in any operator and look at what the input output is to say hey did the logic below work well.

154
00:23:27,880 --> 00:23:56,880
So easier to implement this was a life till about two decades ago when processor started to get really fancy before this till the late 90s processes did it was in the 90s that processor started to have cashes and then you could start to do all kinds of interesting things with that where you have to worry about the cashes and the cost started to become different where the CPU cycle started to become more and more precious and memories were starting to grow right so now your data is starting to grow.

155
00:23:56,880 --> 00:24:09,880
Right so now your data is coming from memory into the processor not this which is you know three orders of magnitude away at times from memory and so the CPU cost and other components and the switching costs started to become a big deal.

156
00:24:09,880 --> 00:24:25,880
So one of the earliest examples of switching over to this is a vectorization model that came through was to basically recognize that there are two things we want to play on one is we don't want we want to intermediate ground between fetching all the records between each of these operator called.

157
00:24:25,880 --> 00:24:53,880
Or fetching just one topple to get something a little bit smaller and also if I can get a batch of records right not the entire result but not one batch being more than one I can also vectorize that so if I'm doing a selection so let's just go through with an example here same thing is before slightly different code basically now start to see more the output which is the way database people say what's the size of that output in terms of the data.

158
00:24:53,880 --> 00:25:22,880
So it's the size of that output in terms of number of records is greater than and then I am experiencing my batch sizes in so we'll start doing this here start doing that now that return call will return a batch of records so this loop will get call as many times as there are batches to be provided so if we've got a thousand records and my batch is a hundred this will be 1000 divided by 100 this loop will be called 10 times.

159
00:25:22,880 --> 00:25:51,880
Not once so it's a little balanced in between and the other advantage of that especially when you're doing things like that operator for is that if I get like a hundred records here I can get this inner part like the predicate eval potion and evaluate that using these instructions that are started to show up in a lot of machines where you could do multiple how many of you have heard of Cindy single instruction multiple data right so that type of hardware.

160
00:25:52,880 --> 00:26:17,880
Where which says I'm going to add one to every number you could write a simple loop that says add one if I've got four numbers and that loop will run four times but there are instructions there architectures in which you can say if you can upload four numbers together you get that in an array in one instruction you can add four to each one independent single instruction on multiple data you can apply that apply that parallelism in in one cycle.

161
00:26:17,880 --> 00:26:46,880
So all of that hardware does very well with the creation because if that operation is to do things like compare a predicate I can vectorize that if my vector size is eight then in one cycle I can evaluate eight values and decide whether the predicate applies or not and you'll see techniques like that in subsequent classes when we go a little bit deeper into some of this but that plus finding that middle ground between how big the batches because with the full materialization model if one of this input for example in this algorithm.

162
00:26:47,880 --> 00:27:13,880
The four was a billion rows now I need to allocate that billion rows and memory and that's a lot of space right where's that space going to come from it's the same memory pool that's competing for the buffer pool and stuff like that if I just start allocating that when buffer pool is going to get squeezed and I can start running into trouble okay I could put in the buffer pool but I'm taking space away from something else okay so the decoration model has a nice balance ground yep.

163
00:27:13,880 --> 00:27:42,880
What is with the materialization model like I understand better for else but why is it like function call over there yeah the materialization model is better when you have very small so the question was when some materialization model better it's when the records are the tables are relatively small and you just materializing the whole thing so you could argue why don't I vectorize it even for that you could potentially and that's a very relevant question to ask say if my bad size is big enough do I need the materialization model.

164
00:27:43,880 --> 00:28:12,880
It can I just do the vectorization model the shot answer is vectorization gives you a nice middle ground between the best of both worlds and you can always control the vector size if the database implementer has given you that option and you can span that spectrum so we can good point that that could cover the case where materialization is better so I'm trying to ask is why is this ever faster than the iterative model why is this ever faster than the iterator model.

165
00:28:12,880 --> 00:28:41,880
The materialization model it's because if I have a hundred each of these arrows two three if you have to be run let's say a thousand times versus to be run only once it's probably better for me to just run that three function once past that the three thousand values to the join operator in that build site and I'm not making all these thousand function calls over and over again and not so much more than that.

166
00:28:42,880 --> 00:29:11,880
So if you're able to in line the lower function is for it. Yeah, we come to that not in this class a lot gets discussed in the other one pieces are done at runtime so inlining is difficult but there are methods that say so the question was can I inline all these functions and their methods that now say can I take the entire query and convert that into code at runtime with all types of inlining I'll briefly talk about in 30 seconds in a little bit we'll talk about but the advanced database class talks about that so that's a good point.

167
00:29:12,880 --> 00:29:17,880
I'm afraid to think about can I do something special for stuff like that and absolutely people are playing those games.

168
00:29:17,880 --> 00:29:40,880
Yep on for the latter two models does that stop you from like let's say we're part of the way through a query and we discovered that we have enough does that does like materialization which reads the entire thing does that it sort of is an inefficiency with the model that you have to read everything even if we have like some filter and we have like some like only return of them that match this filter right does it like stop us from not reading the entire table if we find which model which model I'm going to do is that it's not going to be a lot of things that I'm going to do.

169
00:29:40,880 --> 00:30:02,880
So the question is if in materialization of the vectorized model if the vector is big enough should you stop and make that are you asking in the vectorization model let's be more specific in the vectorization model would it benefit to make the vector size dynamic.

170
00:30:02,880 --> 00:30:20,880
I guess I'm asking is like does it does it stop us from checking like if you had a really big vector size yeah let's say we read a thousand people but we only use read 10 of them and then we would have been like we have a we have a thing in our period so the only way up to 10.

171
00:30:20,880 --> 00:30:31,880
Oh I see I see so the question is if I had a limit clause at the top yes what can I do yes if there's a limit clause at the top of the query in many cases you can push that down but if it's limit 10 that doesn't mean you could say.

172
00:30:31,880 --> 00:30:43,880
Limit 10 at the bottom level you can do limit 10 in this case at the hash joined level but you may still have to read in even with the limit clause you still have to do the entire build site here.

173
00:30:43,880 --> 00:31:00,880
Yeah but something like the iterator model it can if we have a limit clause and we have like a where clause that it can find 10 match absolutely so if there's a limit clause that's an optimization problem where the optimizer could make the code to three and four to be different so that doesn't have to read the next can return and read.

174
00:31:00,880 --> 00:31:10,880
The next can return end of file sooner when it is at the safe boundary absolutely yeah yeah there was a question here is that still on the table.

175
00:31:10,880 --> 00:31:27,880
Okay so that's great you guys are getting that there's all kinds of optimization you can do the main thing I want to do get across is that the vectorization model has this nice balance down and if you were to do a new engine from scratch my recommendation would be to do this vectorization model that batch size okay.

176
00:31:27,880 --> 00:31:56,880
Alright a little minor detail I mentioned the open call sets of the tree now that tree could be set up in a top down fashion or you could choose to set it up in a bottom up fashion it's more natural if you're writing the iterator model or any of these models to set it up in a top down fashion but you can also do it in the other way so nothing really dramatic over here but you have to set up the tree and that could be a top down versus.

177
00:31:56,880 --> 00:32:25,880
Bottom up approach now one advantage of the bottom up approach is that as you're setting things up there might be opportunities for some optimization putting in special optimization tricks that you could do but we'll talk about that in the scheduler those things become more interesting and relevant if you do it at the scheduler level the main point over here is that you can set up the tree top down a bottom up there's a setup cost which hopefully you got from that earlier discussion okay that setting up that function pointers across the tree.

178
00:32:25,880 --> 00:32:54,880
When I call next what am I calling right because that hash joins next on one side was calling the file scan the other side was calling something that was looking at the predicate in evaluating that predicate right at you don't know what your operator is till you start the silly query is run right and that same hash showing code sometimes is it's children are different operators right so it depends on the context of the query.

179
00:32:54,880 --> 00:33:23,880
Every tree at the bottom the root nodes of the operator tree are the places where you go access the actual data everything else is feeding stuff up from intermediate data that's been produced so concerning that bottom part of that tree we have to decide how are we going to access the records in that underlying file and the technical term for that is called access method it comes from system R which was one of the earliest relational systems that was in the last time we got to the next one.

180
00:33:24,880 --> 00:33:46,880
So it was built by IBM in the 1970s and the early days of the relational model after code imp proposed this model IBM started to work on the relational system called system R a lot of the optimization and things like that we'll talk about come from system R and at the same time stone breaker in Berkeley you know IBM was in San Jose Berkeley.

181
00:33:46,880 --> 00:34:15,880
So the other side and stone breaker and steam were implementing ingress and that ingress eventually became post stress right so the access method term comes from the system are days it's a way of saying how we're going to access that underlying file and the dominant methods are a sequential scan as you saw the left note in the tree that we saw or it could be an index scan which is to say I've got an index on this predicate that I need to apply let me use the index because it's a more efficient way to do it.

182
00:34:16,880 --> 00:34:33,880
So I'm going to fetch the records and hence the name access right the query has to access these records from this and hence the name access methods and we'll talk about this multi index scan if I've got multiple predicates on the same table can I do something more interesting use two different indices and combine that.

183
00:34:33,880 --> 00:34:41,880
Okay so it's concerns how are we fetching data from that how are we accessing the base records in the base tables.

184
00:34:41,880 --> 00:35:10,880
No rocket science here in this case we've already seen that the access method term applies to the RNS those two operators sequential scan pretty straightforward we already saw that with the our relation in the previous example just go and fetch one page from the table that you're trying to scan and start reading all the records on that page once you're done go fetch the next page that operator the sequential scan operator needs to keep some state around which is to say.

185
00:35:10,880 --> 00:35:39,880
Which page have I read so that the next time it is called it knows do I still read in this page or do I go to that next page right so it has to keep track of something called the cursor which basically says which record on which page am I reading and that record ID is typically a combination of the page ID and some offset in that page ID you've seen that from the buffer pool right that record ID is what it has to keep track off and every time if it's in the iterator model.

186
00:35:39,880 --> 00:36:08,880
The state tells you which record are you at so the next time it's called you're fetching the next record right you don't repeat and send back again to the consumer of that operator of the sequential scan operator a record that's already in fetch the query result would be wrong right so for correctness that some state that is kept in that sequential scan operator and you'll hear this term cursor which is a way to say I've got a marker on the record position in a file.

187
00:36:08,880 --> 00:36:24,880
And I can advance the cursor this notion of a marker a cursor on a file also applies when you're consuming the output of a SQL query as a database programmer right that was one of your projects.

188
00:36:25,880 --> 00:36:47,880
And you're writing code through your favorite or maybe SQL outcome or something you call a SQL query and you're fetching records back what you'll get back from the or M layer is a cursor object which allows you to fetch the next record the next record the next record so that next idea also applies all the way into the application space and the course is just a way of keeping track of which record you're at.

189
00:36:47,880 --> 00:37:03,880
Okay, so you just get the result and each record in the result only once and not multiple times for correct semantics so it's here that word cursor also applied in that application space and in how people refer to code inside the database system same concept does that make sense.

190
00:37:03,880 --> 00:37:32,880
Okay, so now sequential scan can be optimized and we've already seen some of this optimization so even if I'm scanning the rate the data sequentially you could pre fetch the next page right for your waiting and processing records on that page we've seen that before in lecture six you could do buffer pool bypass next class you talk about parallelism where you could do a fixed multiple records in parallel we've seen deep classroom in lecture.

191
00:37:33,880 --> 00:38:02,880
It's a great materialization which you just saw in the last class right don't fetch the don't particular record just keep the record IDs and fetch the values corresponding to the record IDs later so there are all kinds of optimization you could do with that right sequential scan to return the value or do a material as late just return the record IDs and there are interesting trade offs but the one that you haven't seen or won't see that you have to talk about today is the data skipping component and the data skipping component is the same as the data skipping component.

192
00:38:03,880 --> 00:38:27,880
So this is basically a way to execute and you can do this in one of few different ways one is this approximate queries which is lost us and the other one is using zone maps and so the lossy approach gets using examples like vintage and redshift and stuff like that is to execute the queries on the subset of the entire table to produce an approximate result and that's used in cases where approximate results are okay.

193
00:38:27,880 --> 00:38:56,880
So typically not in the environments that you've seen so I'm going to find an average sales amount across all the products all I don't run the whole query I'm okay if you give me some sort of an approximation and there are ways to go to that and talk about that in the advanced database class we'll talk about where you're trying to get the correct result but do that faster using these things called the zone map okay and I'll just talk about it with the with an example and walk through that.

194
00:38:57,880 --> 00:39:20,880
So imagine I've got a column with integer values here and on this imagine I'm going to be asking a lot of selection queries I'm looking for values let's say between 100 and 200 another query might look for values that are less than 400 so I've got lots of scan predicates coming on this integer column.

195
00:39:20,880 --> 00:39:49,880
Okay if I'm just doing a sequential scan I have to scan everything every time okay and now my data is broken up into pages right so now you can generalize that to say I'm going to organize my file into zones that zone could be a page often in many systems as this notion of a block which is typically much bigger many megabytes big and so in many systems you'll have that much bigger concept but regardless of what you divide that data you'll take that whole file break it up into part two.

196
00:39:50,880 --> 00:40:11,880
So if you want to ask horizontally call them zones and now before scanning all the records in a zone you can create certain aggregates on it certain pieces of information on it that give you effectively an idea as to what is the value in that zone for the records in that zone.

197
00:40:11,880 --> 00:40:22,880
Here we can create what we call as a zone map and say in this zone of five values the minimum is 100 max is 400 just the average is the sum and here's the color.

198
00:40:22,880 --> 00:40:31,880
Of course to make it fit on the slide there five values but you can imagine there may be 5000 or 50,000 values depending upon what you said about the zone size.

199
00:40:31,880 --> 00:40:44,880
Now if someone says find me everything that is greater than 400 all you need to do is fetch the zone map and say I don't even need to look at the actual values.

200
00:40:44,880 --> 00:41:00,880
So by looking at the zone map you can decide whether it is worth looking at the actual values we finished this slide i'll take your question in a second and this obviously is implemented in many systems and as you can see value greater than 600 I will only look at the zone map now the zone maps are much smaller right so in the end.

201
00:41:00,880 --> 00:41:11,880
So in this case the zone map has just got quite integer values and as I said for this example the data also has five values but imagine it is 5000 values of 50,000 values.

202
00:41:11,880 --> 00:41:25,880
So this is many orders of magnitude smaller in size and that allows you to go and filter stuff up now the zone maps can sometimes we kept with the zone page itself the zone data itself in which case you have to fetch the data to filter it.

203
00:41:25,880 --> 00:41:35,880
So you don't get the IO benefit but you get the CPU benefit but you could also keep the zone map outside and you have to make sure if updates happen here the zone map has also been updated.

204
00:41:35,880 --> 00:41:50,880
Okay and then two different ways of doing that the external method is harder to keep track to keep synchronized but it's obviously much more efficient because you don't need to actually fetch the data you could just skip it you can get both IO and CPU optimization right question.

205
00:41:50,880 --> 00:42:07,880
So this the user of the database set this up was no usually just set up by the DBMS you as a DBMS implementer will decide whether to implement zone maps or not and then sometimes the system may have certain options when you create the table or set up the database to say.

206
00:42:07,880 --> 00:42:23,880
What type of zone maps to build should you only do min max which is the most common is it's the smallest number of smallest zone map that you could create that as a maximum value average and other things have less utility but they do in some cases right.

207
00:42:23,880 --> 00:42:50,880
So it depends upon whether it is automatic or whether controls given but the implement or will implement that and then provide some ways to set this up and it could be fully automated or the database and mister could provide hints to it sometimes when you're creating the tables you might set up what the zone map how aggressive the zone map should be so it's all over the place in there right it's not a sequel standard it's something that will get exposed to the database programmer depending upon that system.

208
00:42:50,880 --> 00:43:19,880
But a lot of systems use it including Oracle DB to and pretty much all the modern systems use it including your snowflakes and data breaks so now zone maps this is really hard to see I don't know why it looks great on my screen here but this is a paper that's from more than 20 years ago by this guy.

209
00:43:19,880 --> 00:43:33,880
By this guy called Gido for Kentel and he's an amazing German researcher and this tells you you know more than a decade after he wrote the paper to say why zone maps are important and why you should use it.

210
00:43:33,880 --> 00:43:40,880
It took the industry to go and implement this so research on this was way ahead of where it started to show up in products.

211
00:43:40,880 --> 00:44:02,880
Okay it's a beautiful paper and if you are interested in it and can find the paper let me know the research term for that is small materialized aggregate it's what a beautiful name right it's a materialized aggregate you're doing min max some count stuff it's an aggregate and they're small sms is what it is called so very tourist name very memorable name yep.

212
00:44:02,880 --> 00:44:09,880
But the industry guys had to call it zone maps because they have to market it differently so I don't know why they didn't call it sms.

213
00:44:09,880 --> 00:44:38,880
So you would have one zone map per zone and how big is a zone depends again on the database implementation so the question was like how big is the zone map the zone map is one map per zone so if I've got a file let's say I'm building it at the page level relating back to buster I could build a zone map at the page level if my file has.

214
00:44:38,880 --> 00:45:00,880
A hundred pages and a hundred zone maps now where do I keep that zone map I could keep it in the page in some place or I could keep it outside the page and I have to keep it synchronized okay it's pretty small even for a small 4k 8k page you can see the utility of this being really high yes.

215
00:45:00,880 --> 00:45:04,880
You're like.

216
00:45:04,880 --> 00:45:08,880
I'm sorry.

217
00:45:08,880 --> 00:45:20,880
You certainly as a database implementer you could do whatever so you can safely do min max on anything that is sort of including strings and for strings you have to be careful about

218
00:45:20,880 --> 00:45:49,880
collation order I think Andy talked about that right collation order says what's the right way to sort a string especially if you have a product that's international the sort order for English language is different than for Mandarin different for a congee and stuff like that so anything that is sortable strings are sortable with the right correlation order you could do min max on and then you could decide if in the min max for strings you want to keep the entire min string and the max string or just a prefix and then use it in a safe way.

219
00:45:49,880 --> 00:46:06,880
As a user of the system can I make those decisions most likely not most systems will give you the ability to tell you that turn on zone maps or not most systems do this automatically internally.

220
00:46:06,880 --> 00:46:25,880
So you can zone maps we implemented alongside indices absolutely and fact they often are what zone maps to is reduce the need for indexing on extremely large data sets that's how they become so popular especially on the very large old app stuff because now the need for index is a lot less.

221
00:46:25,880 --> 00:46:54,880
And so yes if the zone maps are outside you're taking a maintenance problem it's like an index problem right and if I've got a zone map if I've got 10 columns in the table I'll keep I could decide to pick a zone map on five of the columns what's super interesting is I could decide I'm creating a zone map only on the first hundred pages that have been loaded the last hundred pages that were just loaded don't have a zone maps so if you don't find a zone map you're going to fetch the five so it's not zero or nothing.

222
00:46:55,880 --> 00:47:03,880
You could do all kinds of interesting things especially if you've got data coming in you you got you have it's a very flexible and powerful mechanism.

223
00:47:04,880 --> 00:47:22,880
Okay it's beautiful yep let's assume for the sake of our indexes or something yeah so I just you only zone map so the question is if I hate indices with the the student in the first row seems to hate indices now I'm just kidding absolutely and.

224
00:47:22,880 --> 00:47:33,880
System some of the newer systems like snowflake are very aggressive users of zone maps does reduce the need for them to index as much is there ever why something you can only do with indexing or you just want to.

225
00:47:34,880 --> 00:47:51,880
So really with the indices you can get much finer values right if I said by the way there's nothing there are systems there's a research system called quick set that we build in which we use zone maps at the top level and indices inside the zone you could do that to maybe you can come talk to me later I don't know if anyone else that does it it was a research.

226
00:47:52,880 --> 00:47:59,880
I'm not a type but they're so that's an open question where you can combine that the people are doing it I at least don't know that right now but you could combine stuff.

227
00:48:00,880 --> 00:48:21,880
What is it I just think you are are they decide the ones to keep the coins yeah it's based on use it and experience but pretty much everyone will keep minbacks and then maybe some independence upon you know how often does some get come you could argue like average is probably not that important because if I was selection followed by an average aggregate then the average is not that important.

228
00:48:22,880 --> 00:48:47,880
The average is useless right because I have to do the selection first so it will depend but min max is typically used and sometimes you'll hear the term min max indices and that's used for just saying that version of the zone maps or SMAs with just the min max portion okay so this is crazy right as I said this is like more than 20 year old ideas only in the last 10 years people started to get excited about zone maps but academics have known that this is a very good idea long time ago.

229
00:48:48,880 --> 00:48:49,880
Yep.

230
00:48:49,880 --> 00:48:54,880
Those don't have some fields once fine and then this guy before the government.

231
00:48:54,880 --> 00:49:16,880
Just like an index you have to update it if you want to keep it around so zone maps if I update that page that's I would have to update that many systems what they do and update to a page is marked as a delete on the page when you get to transactions you see that new records get put over here so this is just marked as you are no longer valid and so in that case.

232
00:49:16,880 --> 00:49:24,880
If it's like that notion of a block of a of a zone being immutable and only gets updated when you merge things together.

233
00:49:24,880 --> 00:49:45,880
For that there are other models that apply so LSM trees you remember when you guys talked about LSM data structure where they grow in one direction is a merge phase so you could start to do interesting stuff for this it depends upon what's your underlying storage model is where the updates are in place or somewhere else and that will have implications for indices in general zone maps will have the same thing they're like indices but a very interesting different type of indices.

234
00:49:46,880 --> 00:49:53,880
Right and as I said you could keep the zone map outside the zone and then it looks different.

235
00:49:53,880 --> 00:49:56,880
Okay it looks like an index.

236
00:49:56,880 --> 00:50:15,880
All right okay let's keep moving so index scan is basically a scan I've got a predicate let's just look at it with an example I've got the square where on a table I've got a predicate on age department and country.

237
00:50:15,880 --> 00:50:34,880
And imagine I've got indices build on ancient department so obviously I could do a file scan and apply each of those predicates and that's one way but if I've got an index on ancient department I could decide what I want to do with it so if there are 99 people under the age of 30 but only two people in the CS department.

238
00:50:34,880 --> 00:50:43,880
If you if you have the department index you probably want to use the department index for that right you only have two records on which you need to check the rest of the predicates.

239
00:50:43,880 --> 00:50:54,880
Right and vice versa if the scenario are different then you can flip the index around the question of course is do I I don't know this distribution.

240
00:50:54,880 --> 00:51:08,880
When I want to use the index so that again is something that an optimizer typically tries to decide when to use an index what to use an index statically and it has statistics to keep track of it we talk about that when we discuss the optimization work.

241
00:51:08,880 --> 00:51:24,880
But assume that you know that you can see how you might switch between which index to use right you want to use the most selective index force because that reduces the predicate evaluation for the rest of the predicates because you only will apply it to the ones that pass through first.

242
00:51:24,880 --> 00:51:34,880
Now if you have multiple indices like we do in that case there's something else that you can also do it's called a multi index can.

243
00:51:34,880 --> 00:51:53,880
I can apply both predicates only on the index which is pretty small right I can do that check I won't fetch the records I'll just look at the index so I haven't hit the data pages yet and then I'll merge the in the hits I get from both indices to then fetch which records I need to go and build out right.

244
00:51:53,880 --> 00:52:21,880
It gets called by different names like multi index can bitmap scan and index merge and basically the way it works if you look at this example is you're going to start with it and then look at both of these cases will look at the first index on each and retrieve the record IDs that hit we haven't fetch the records yet so delay that don't retrieve it just yet then go and I'll just let you know that I'm going to do that.

245
00:52:21,880 --> 00:52:50,880
Then go and get the record IDs from the blue side in this case where department is equal to CS merge those record IDs you could represent the record IDs as a set and merge it or you could represent that as a bitmap and use bitmaps to filter stuff up you know those details don't really the matter in the implementation but essentially trying to do some sort of set intersection and then only the common record IDs is the one that you will go and use to retrieve back.

246
00:52:50,880 --> 00:52:53,880
From the system. Okay.

247
00:52:53,880 --> 00:53:00,880
So you can use multiple indices to go and make that search better.

248
00:53:00,880 --> 00:53:10,880
All right questions and for some reason my camera started to misbehave let me just go reset that here.

249
00:53:10,880 --> 00:53:20,880
There we go. Oh, it stops tracking after a little while.

250
00:53:20,880 --> 00:53:23,880
But you'll only notice in the video recording but.

251
00:53:23,880 --> 00:53:24,880
All right.

252
00:53:24,880 --> 00:53:25,880
Yep question.

253
00:53:25,880 --> 00:53:27,880
But question about multi index in.

254
00:53:27,880 --> 00:53:31,880
Yeah, how would you use the most selected one first like once you have the record.

255
00:53:31,880 --> 00:53:32,880
What do you do?

256
00:53:32,880 --> 00:53:36,880
So the question is what do I do with the record IDs in this multi index scan.

257
00:53:36,880 --> 00:53:39,880
Like after like if you're using the more flat index.

258
00:53:39,880 --> 00:53:51,880
Yeah, so in this case we'll use the most selective index first it won't matter if I'm using if I decide I'm going to use both the red and the blue index for doing this multi index scan.

259
00:53:51,880 --> 00:53:55,880
Assume the optimizer said please use both indices somehow it knew.

260
00:53:55,880 --> 00:54:01,880
Then you do the red index search first then the blue index search next I could have flipped the order cost will be the same.

261
00:54:01,880 --> 00:54:05,880
I find the intersection and then it's only those record IDs that I fetch.

262
00:54:05,880 --> 00:54:07,880
So the.

263
00:54:07,880 --> 00:54:09,880
If you're only one.

264
00:54:09,880 --> 00:54:10,880
That's correct.

265
00:54:10,880 --> 00:54:11,880
Yeah. Yeah.

266
00:54:11,880 --> 00:54:16,880
So if I were to use only one index the question was when does the index selectivity matter.

267
00:54:16,880 --> 00:54:24,880
If I were to decide and use only one index then I will need to know whether the red index is selective or the blue index is selective and picked that one.

268
00:54:24,880 --> 00:54:25,880
Okay.

269
00:54:25,880 --> 00:54:26,880
Yep.

270
00:54:26,880 --> 00:54:32,880
Why is this more efficient than using the most selective index?

271
00:54:32,880 --> 00:54:41,880
Imagine age less than 30s are most selective index and department greater than CS is less selective the first fetch is a million record IDs.

272
00:54:41,880 --> 00:54:47,880
The second fetches 10 million record IDs but the intersection is only two.

273
00:54:47,880 --> 00:54:50,880
Okay, because they could be independent.

274
00:54:50,880 --> 00:54:54,880
So if both the predicates are completely correlated then it wouldn't matter.

275
00:54:54,880 --> 00:54:55,880
You're right.

276
00:54:55,880 --> 00:54:58,880
But if they're not correlated then it'll matter a lot.

277
00:54:58,880 --> 00:55:00,880
Good question.

278
00:55:00,880 --> 00:55:06,880
Why would you ever want to use like if you have an index on both of them.

279
00:55:06,880 --> 00:55:08,880
Why would you ever only use one?

280
00:55:08,880 --> 00:55:09,880
Yeah, because the opposite.

281
00:55:09,880 --> 00:55:10,880
So I'll flip around.

282
00:55:10,880 --> 00:55:11,880
Yeah.

283
00:55:11,880 --> 00:55:14,880
So the question is why would I use when could this be worse.

284
00:55:14,880 --> 00:55:15,880
It's the opposite right.

285
00:55:15,880 --> 00:55:19,880
So it depends on whether they're correlated or not correlated.

286
00:55:19,880 --> 00:55:23,880
And so now you could ask the question is how do you know they're correlated or not correlated.

287
00:55:23,880 --> 00:55:26,880
That's one of the big reasons the optimizers don't quite work.

288
00:55:26,880 --> 00:55:29,880
We'll talk about that in query optimization in the advanced class.

289
00:55:29,880 --> 00:55:34,880
So we'll talk about why the optimizations fail all the time.

290
00:55:34,880 --> 00:55:41,880
And Andy and I are trying to start a new project in which we make optimization even less important.

291
00:55:41,880 --> 00:55:47,880
If you're interested in what you can do to make optimization less important because optimizers make these mistakes all the time.

292
00:55:47,880 --> 00:55:52,880
Go to my webpage at the top is a paper that talks about how if you do adaptiveness.

293
00:55:52,880 --> 00:55:56,880
It's better than trying to spend cycles in developing optimization.

294
00:55:56,880 --> 00:56:00,880
So at the point of view, I could be wrong, but that's the current point of view that I have.

295
00:56:00,880 --> 00:56:02,880
So these are great questions optimizer.

296
00:56:02,880 --> 00:56:05,880
You're assuming it knows how to do this correlation.

297
00:56:05,880 --> 00:56:08,880
Okay, questions.

298
00:56:08,880 --> 00:56:10,880
All right.

299
00:56:10,880 --> 00:56:17,880
Now there's a little tricky situation that you have to consider when you're looking at modification queries.

300
00:56:17,880 --> 00:56:19,880
And you've seen that in SQL.

301
00:56:19,880 --> 00:56:22,880
They are your insert, delete and update queries.

302
00:56:22,880 --> 00:56:29,880
So how components we have to consider about one is what is it that gets returned by the query.

303
00:56:29,880 --> 00:56:34,880
So imagine I say insert into an a full SQL sentence below it.

304
00:56:34,880 --> 00:56:40,880
That sequel is going to run produce a bunch of records that I'm inserting into a new table.

305
00:56:40,880 --> 00:56:46,880
Okay, that sequel query that is run the operator that is producing that final output.

306
00:56:46,880 --> 00:56:49,880
Of course, there's a full operator tree below that.

307
00:56:49,880 --> 00:56:53,880
I like to say I'm only going to pass materialize the entire record.

308
00:56:53,880 --> 00:56:58,880
Right. So for inserts, you could materialize the entire records inside the operator.

309
00:56:58,880 --> 00:57:05,880
And then pass that along or the operator inserts any record passed to it from the child operator.

310
00:57:05,880 --> 00:57:07,880
You're basically getting it to that next call.

311
00:57:07,880 --> 00:57:11,880
So it's very similar to what we talked about that materialization versus inserts.

312
00:57:11,880 --> 00:57:14,880
And you have that similar type of choice that you need to make.

313
00:57:14,880 --> 00:57:15,880
Okay.

314
00:57:15,880 --> 00:57:27,880
Now, the more interesting part, which is very subtle is that when you're doing updates, you have to keep track of the record IDs for the target tuples.

315
00:57:27,880 --> 00:57:34,880
And this is to avoid a problem that is called the Halloween problem, which was discovered by IBM decades ago.

316
00:57:34,880 --> 00:57:38,880
IBM was at the front front of for many of these relational systems on Halloween night.

317
00:57:38,880 --> 00:57:41,880
So here is the query.

318
00:57:41,880 --> 00:57:44,880
So I'll let you assimilate that a little bit.

319
00:57:44,880 --> 00:57:49,880
What we have here is an index on salary.

320
00:57:49,880 --> 00:57:58,880
And we're updating all the people whose salary is less than 1100 giving them a hundred dollar salary raise.

321
00:57:58,880 --> 00:57:59,880
Okay.

322
00:57:59,880 --> 00:58:02,880
Now this query, the operator tree for that.

323
00:58:02,880 --> 00:58:06,880
As you can see at the bottom is using the index to retrieve the appropriate records.

324
00:58:06,880 --> 00:58:10,880
The appropriate records are those where the salary is less than 1100.

325
00:58:10,880 --> 00:58:15,880
So now we start here and fetch the records go apply that.

326
00:58:15,880 --> 00:58:20,880
So imagine we fetch the first record and that happens to be Andy.

327
00:58:20,880 --> 00:58:21,880
I'm using Andy slide.

328
00:58:21,880 --> 00:58:24,880
You know, as you can see he's trying to do something sneaky here.

329
00:58:24,880 --> 00:58:25,880
We always watch out for that.

330
00:58:25,880 --> 00:58:28,880
But he also made this slide to say watch out for this slide.

331
00:58:28,880 --> 00:58:32,880
So that gets called.

332
00:58:32,880 --> 00:58:35,880
Imagine you're using the iterator model one record at a time.

333
00:58:35,880 --> 00:58:38,880
And now Andy has a hundred dollar race.

334
00:58:38,880 --> 00:58:41,880
But that is inserted back into the table, right?

335
00:58:41,880 --> 00:58:43,880
It's updated.

336
00:58:43,880 --> 00:58:52,880
So it now goes into the index a few distance away where the new salary is a hundred and a one thousand and nine dollars.

337
00:58:52,880 --> 00:58:56,880
And now what happens as the index keeps getting called at some point.

338
00:58:56,880 --> 00:59:01,880
That record is going to get fetched again the 1099 record the new update.

339
00:59:01,880 --> 00:59:02,880
Right?

340
00:59:02,880 --> 00:59:05,880
This is what we just updated the record to.

341
00:59:05,880 --> 00:59:07,880
And now that we get another hundred dollar raise.

342
00:59:07,880 --> 00:59:09,880
So Andy is really honest.

343
00:59:09,880 --> 00:59:10,880
So he doesn't want that.

344
00:59:10,880 --> 00:59:11,880
Right.

345
00:59:11,880 --> 00:59:13,880
So he said we should not make this happen.

346
00:59:13,880 --> 00:59:17,880
He'd rather have the two hundred dollars raise a big let up front to him.

347
00:59:17,880 --> 00:59:21,880
And so this is the type of stuff that happened as you can imagine in the first implementation.

348
00:59:21,880 --> 00:59:22,880
People didn't think about it.

349
00:59:22,880 --> 00:59:24,880
And so it was buggy code.

350
00:59:24,880 --> 00:59:26,880
People started to realize whoops.

351
00:59:26,880 --> 00:59:28,880
The someone's getting a lot of raises.

352
00:59:28,880 --> 00:59:30,880
And that was the Halloween problem.

353
00:59:30,880 --> 00:59:33,880
There's a whole Wikipedia article associated with it that you can look at.

354
00:59:33,880 --> 00:59:34,880
The question.

355
00:59:34,880 --> 00:59:36,880
You're right.

356
00:59:36,880 --> 00:59:39,880
This wouldn't happen if materialization was in place.

357
00:59:39,880 --> 00:59:40,880
That is correct.

358
00:59:40,880 --> 00:59:43,880
If everything were materialized completely and you never went back.

359
00:59:43,880 --> 00:59:49,880
You had all the record IDs from the index produced once and sent across this wouldn't happen.

360
00:59:49,880 --> 00:59:50,880
Okay.

361
00:59:50,880 --> 00:59:55,880
It seems like it goes against all like concurrency rules like.

362
00:59:55,880 --> 00:59:57,880
We're modifying some data structure.

363
00:59:57,880 --> 00:59:58,880
We're not actually hoping.

364
00:59:58,880 --> 00:59:59,880
Yes, correct.

365
00:59:59,880 --> 01:00:01,880
So the question is does it.

366
01:00:01,880 --> 01:00:05,880
It seems like we are going against all kinds of concurrency rules.

367
01:00:05,880 --> 01:00:08,880
We are modifying a data but not holding a lock on it.

368
01:00:08,880 --> 01:00:09,880
That is true.

369
01:00:09,880 --> 01:00:10,880
A lock would be too expensive.

370
01:00:10,880 --> 01:00:12,880
So you'll see what we'll do is a little bit simpler.

371
01:00:12,880 --> 01:00:13,880
Okay.

372
01:00:13,880 --> 01:00:14,880
That's right.

373
01:00:14,880 --> 01:00:15,880
That's exactly right.

374
01:00:15,880 --> 01:00:18,880
It is something that you would end up having to do.

375
01:00:18,880 --> 01:00:23,880
So what you end up doing is the following is you keep track of the solution is pretty simple.

376
01:00:23,880 --> 01:00:26,880
Keep track of all the modified record IDs.

377
01:00:26,880 --> 01:00:27,880
Right.

378
01:00:27,880 --> 01:00:30,880
So if you see that new record again, you say, oh, I've already processed it.

379
01:00:30,880 --> 01:00:32,880
I'm just going to skip over it.

380
01:00:32,880 --> 01:00:36,880
Even though as you scan the index that new record ID is now in a different location.

381
01:00:36,880 --> 01:00:37,880
You are going to simply skip that.

382
01:00:37,880 --> 01:00:41,880
Or if everything were materialized, you would not have this problem as was just pointed out.

383
01:00:41,880 --> 01:00:42,880
Right.

384
01:00:42,880 --> 01:00:43,880
You're not going back again to the index scan.

385
01:00:43,880 --> 01:00:45,880
The index scan happened only once.

386
01:00:45,880 --> 01:00:46,880
You got everything.

387
01:00:46,880 --> 01:00:47,880
Then you're going to be fine too.

388
01:00:47,880 --> 01:00:50,880
And then you put everything back as the updated values.

389
01:00:50,880 --> 01:00:51,880
Okay.

390
01:00:51,880 --> 01:00:53,880
And then we told you to go back to the index scan.

391
01:00:53,880 --> 01:00:56,880
And you put everything back as the updated values.

392
01:00:56,880 --> 01:00:57,880
Okay.

393
01:00:57,880 --> 01:00:58,880
And then we talk about transactions.

394
01:00:58,880 --> 01:01:02,880
You'll see we'll do other things so that if there are concurrent requests happening to the index.

395
01:01:02,880 --> 01:01:04,880
They don't interfere with each other.

396
01:01:04,880 --> 01:01:09,880
Here, we're just trying to make a single queries action not interfere with itself.

397
01:01:09,880 --> 01:01:15,880
And transactions will deal with the other problem of multiple queries interfering with each other.

398
01:01:15,880 --> 01:01:16,880
Okay.

399
01:01:16,880 --> 01:01:19,880
Question.

400
01:01:19,880 --> 01:01:28,880
I have a question about how to insert one materialized people inside of the operator.

401
01:01:28,880 --> 01:01:32,880
Another is how to insert and how to transfer the data to you.

402
01:01:32,880 --> 01:01:34,880
Yeah.

403
01:01:34,880 --> 01:01:38,880
So the question is when I materialize the tuples inside the operator.

404
01:01:38,880 --> 01:01:47,880
Do I bring all of the tuples together like the joint has to bring the tuples together materialize it before I send it across or I'm just going to pass that.

405
01:01:47,880 --> 01:01:48,880
Yeah.

406
01:01:48,880 --> 01:01:50,880
So I'm going to put the tuple across and do that.

407
01:01:50,880 --> 01:01:53,880
So it's very similar to what we talked about with the different ways.

408
01:01:53,880 --> 01:01:54,880
Yep.

409
01:01:54,880 --> 01:01:56,880
Just the iterator versus materialization, yeah.

410
01:01:56,880 --> 01:01:57,880
Yep.

411
01:01:57,880 --> 01:01:58,880
Yeah.

412
01:01:58,880 --> 01:01:59,880
Good question.

413
01:01:59,880 --> 01:02:00,880
How do you track the record IDs?

414
01:02:00,880 --> 01:02:01,880
You could just keep it in memory.

415
01:02:01,880 --> 01:02:08,880
As I said, each operator has a state, so you can imagine the insert operator has a state which says here are the record IDs.

416
01:02:08,880 --> 01:02:12,880
Now typically inserts don't, you know, even if I've got a billion rows, I'm not changing all the billion rows.

417
01:02:12,880 --> 01:02:13,880
So it's usually small.

418
01:02:13,880 --> 01:02:15,880
So that's, that's often okay.

419
01:02:15,880 --> 01:02:17,460
That's often OK.

420
01:02:17,460 --> 01:02:20,200
OK?

421
01:02:20,200 --> 01:02:21,039
All right.

422
01:02:21,039 --> 01:02:23,960
We've got to keep moving a little bit.

423
01:02:23,960 --> 01:02:25,119
So I had to rush a little bit up.

424
01:02:25,119 --> 01:02:28,480
I'll pause again for questions in a few minutes.

425
01:02:28,480 --> 01:02:33,280
So expression evaluation, this question was asked.

426
01:02:33,280 --> 01:02:35,079
When we started talking about efficiency

427
01:02:35,079 --> 01:02:38,160
in the vectorization model, here's a query which

428
01:02:38,160 --> 01:02:41,760
has a bunch of expressions in it.

429
01:02:41,760 --> 01:02:45,640
The query when it is formed by the SQL parser

430
01:02:45,639 --> 01:02:48,159
is going to get converted into the expression portion

431
01:02:48,159 --> 01:02:50,759
or if it will get converted into something that looks like this.

432
01:02:50,759 --> 01:02:52,279
There's an hand on one side.

433
01:02:52,279 --> 01:02:54,679
There's a join cause, the join predicate.

434
01:02:54,679 --> 01:02:56,519
The other one is a selection predicate.

435
01:02:56,519 --> 01:02:59,119
And so that's what these expression trees look like.

436
01:02:59,119 --> 01:03:00,599
Why are they important?

437
01:03:00,599 --> 01:03:04,359
Is because evaluating this tree can take time.

438
01:03:04,359 --> 01:03:05,599
It's done for each record.

439
01:03:05,599 --> 01:03:10,440
So here, I'm looking at the simple expression tree

440
01:03:10,440 --> 01:03:11,639
where value is equal to 1.

441
01:03:11,639 --> 01:03:13,759
I'm just checking that predicate.

442
01:03:13,760 --> 01:03:17,520
Pull up a record and instantiate the attribute value.

443
01:03:17,520 --> 01:03:20,240
Then the constant is always set for this query.

444
01:03:20,240 --> 01:03:22,000
And I'm going to evaluate the operator.

445
01:03:22,000 --> 01:03:24,880
So as you can imagine, if I just implement this

446
01:03:24,880 --> 01:03:28,800
in the expression tree form, it's a whole bunch of function

447
01:03:28,800 --> 01:03:32,240
calls for the equal operator that has to look at its left side,

448
01:03:32,240 --> 01:03:35,960
bind it to the value for the record at hand, then compare it,

449
01:03:35,960 --> 01:03:37,080
and do that.

450
01:03:37,080 --> 01:03:40,080
This is this technique called just in time compilation,

451
01:03:40,080 --> 01:03:43,400
which says this expression tree's constant for the whole query

452
01:03:43,400 --> 01:03:48,200
instead of running this code in this form, which

453
01:03:48,200 --> 01:03:50,280
is a whole bunch of code that is generic,

454
01:03:50,280 --> 01:03:54,079
for the query, take that, convert it into an instruction,

455
01:03:54,079 --> 01:03:57,119
type instruction code, effectively materialize a function

456
01:03:57,119 --> 01:04:01,599
on the fly just for this predicate and call that function,

457
01:04:01,599 --> 01:04:03,800
which is going to be a lot more efficient.

458
01:04:03,800 --> 01:04:05,519
OK, I'm not going to go into a ton of detail.

459
01:04:05,519 --> 01:04:09,639
The advanced database class talks about that a fair amount.

460
01:04:09,639 --> 01:04:12,720
But over here, I just want to be aware that there's

461
01:04:12,719 --> 01:04:16,000
just in time compilation post-press ships with it

462
01:04:16,000 --> 01:04:20,279
allows you to evaluate each expression efficiently,

463
01:04:20,279 --> 01:04:22,719
because otherwise, if there's a billion records,

464
01:04:22,719 --> 01:04:26,039
the traditional way of doing it is going to be so,

465
01:04:26,039 --> 01:04:29,159
because it's a generic equality operator that is getting called,

466
01:04:29,159 --> 01:04:35,199
as opposed to one for just that value for just that column type.

467
01:04:35,199 --> 01:04:39,119
And so that code's going to be a lot fewer instructions per record.

468
01:04:39,119 --> 01:04:42,239
So it's like compiling the predicate code on the fly

469
01:04:42,239 --> 01:04:44,359
and running the compile code, but that compilation

470
01:04:44,359 --> 01:04:47,279
is happening as the queryization.

471
01:04:47,279 --> 01:04:49,959
OK, in post-press hazards, we can play around with it

472
01:04:49,959 --> 01:04:51,679
and take a look at it.

473
01:04:51,679 --> 01:04:54,799
Database systems also have this notion of,

474
01:04:54,799 --> 01:04:57,000
I've got a query that's run over and over again.

475
01:04:57,000 --> 01:04:59,439
So here's a query that is adding nine values.

476
01:04:59,439 --> 01:05:05,039
So it's like, here's some additional incentive

477
01:05:05,039 --> 01:05:07,119
that's given to new account holders.

478
01:05:07,119 --> 01:05:08,799
We add $9 to their account.

479
01:05:08,799 --> 01:05:11,879
It's a query that's going to be run for every new account creation.

480
01:05:11,880 --> 01:05:15,480
And so instead of saying, I'm going to issue that query

481
01:05:15,480 --> 01:05:18,280
every time that button is pressed in the application,

482
01:05:18,280 --> 01:05:21,519
you can say, I know this query template is the same.

483
01:05:21,519 --> 01:05:25,519
All I might change is the account value $1.

484
01:05:25,519 --> 01:05:27,960
So it's kind of like saying, I've got the function,

485
01:05:27,960 --> 01:05:31,000
SQL query is now like a function.

486
01:05:31,000 --> 01:05:34,000
Everything in the function is known except for one parameter

487
01:05:34,000 --> 01:05:37,800
that $1, and I'm going to compile that entire query.

488
01:05:37,800 --> 01:05:40,519
And it's called a prepared statement.

489
01:05:40,519 --> 01:05:42,920
It has a name, let's call it XXX.

490
01:05:42,920 --> 01:05:44,679
And when that button is pressed,

491
01:05:44,679 --> 01:05:46,320
we'll just call the function XXX

492
01:05:46,320 --> 01:05:47,880
and pass in the value 991.

493
01:05:47,880 --> 01:05:51,400
991 will then get bound to the $1 value

494
01:05:51,400 --> 01:05:54,519
because that's the account value and it gets evaluated.

495
01:05:54,519 --> 01:05:57,320
So essentially it's pre-compiling the whole query now,

496
01:05:58,759 --> 01:06:01,960
not just an expression, and then calling that whole query.

497
01:06:01,960 --> 01:06:04,639
So it's, and that pre-compile query could be pre-optimized

498
01:06:04,639 --> 01:06:07,559
all of that stuff, but at runtime when the user is calling

499
01:06:07,559 --> 01:06:10,559
that function, it doesn't have to pay all that extra cost

500
01:06:10,559 --> 01:06:12,360
in some much efficient piece of code.

501
01:06:12,360 --> 01:06:15,000
And you can actually do the just-in-time compilation

502
01:06:15,000 --> 01:06:18,400
to generate a lower level assembly language code

503
01:06:18,400 --> 01:06:21,159
for the entire query too, and this jit idea

504
01:06:21,159 --> 01:06:23,119
applies to entire queries too.

505
01:06:23,119 --> 01:06:25,759
Again, there are full lectures in the advanced database class

506
01:06:25,759 --> 01:06:27,199
where we talk about this stuff,

507
01:06:27,199 --> 01:06:30,119
but he just wanted you to know that the performance game

508
01:06:30,119 --> 01:06:33,559
has now moved on to where this just-in-time compilation

509
01:06:33,559 --> 01:06:37,159
is pretty prevalent databases that care about performance.

510
01:06:37,159 --> 01:06:38,960
And Postgres has it and you can play with it.

511
01:06:40,440 --> 01:06:41,279
Okay?

512
01:06:41,279 --> 01:06:42,759
So that's just saying instead of doing this,

513
01:06:42,759 --> 01:06:45,239
traverse the tree on every record,

514
01:06:45,239 --> 01:06:47,239
this is all going to be very tight code

515
01:06:47,239 --> 01:06:48,559
and that's just gonna be right.

516
01:06:51,239 --> 01:06:56,239
So I'm gonna very quickly talk about something called

517
01:06:56,239 --> 01:06:57,399
the scheduler.

518
01:06:57,399 --> 01:07:00,480
And if you open up pretty much any database textbook,

519
01:07:00,480 --> 01:07:02,599
it will not talk about the scheduler at all,

520
01:07:03,839 --> 01:07:07,000
which to me is one of the most interesting things

521
01:07:07,000 --> 01:07:09,840
that you have to explicitly pay attention to

522
01:07:09,840 --> 01:07:12,199
for a good runtime system.

523
01:07:12,199 --> 01:07:13,480
And most people hack and scheduler

524
01:07:13,480 --> 01:07:15,119
without knowing they build a scheduler,

525
01:07:15,119 --> 01:07:17,239
but keeping it as a separate system infrastructure

526
01:07:17,239 --> 01:07:18,880
in a system is super important

527
01:07:18,880 --> 01:07:20,599
and only some of the new modern systems

528
01:07:20,599 --> 01:07:22,280
are starting to do that.

529
01:07:22,280 --> 01:07:25,800
So why is the scheduler important as an explicit module?

530
01:07:26,960 --> 01:07:29,239
So far, everything we've talked about is the data flow, right?

531
01:07:29,239 --> 01:07:30,840
Records flowing in and we're talking about

532
01:07:30,840 --> 01:07:32,639
whether the records flow one record at a time

533
01:07:32,639 --> 01:07:35,360
or entire tables or in batches.

534
01:07:36,200 --> 01:07:38,440
We very briefly talked about the control flow

535
01:07:38,440 --> 01:07:40,160
and even when we talked about the control flow,

536
01:07:40,160 --> 01:07:41,960
we said that the control flow is like once

537
01:07:41,960 --> 01:07:44,360
at the start of the query, then you tear down.

538
01:07:44,360 --> 01:07:45,960
But if you have a scheduler,

539
01:07:45,960 --> 01:07:48,039
then you can start to do really interesting things

540
01:07:48,039 --> 01:07:49,599
and I'll talk about this research prototype

541
01:07:49,599 --> 01:07:52,000
that we build called QuickSep and some companies

542
01:07:52,000 --> 01:07:53,400
are now starting to look at it

543
01:07:53,400 --> 01:07:55,400
and say should we be building explicit schedulers?

544
01:07:55,400 --> 01:07:56,640
And some companies do,

545
01:07:56,640 --> 01:07:59,079
but they haven't really brought that out very clearly.

546
01:07:59,079 --> 01:08:01,480
So here's the traditional data flow graph

547
01:08:01,480 --> 01:08:03,240
that we've seen before, right?

548
01:08:03,239 --> 01:08:06,359
So I've got two selections in the query and the join

549
01:08:06,359 --> 01:08:08,199
and records are going to flow through.

550
01:08:08,199 --> 01:08:09,359
That's what we've been talking about

551
01:08:09,359 --> 01:08:12,679
since the beginning of the lecture today.

552
01:08:12,679 --> 01:08:15,559
And imagine there are two pages in R

553
01:08:15,559 --> 01:08:18,639
and the selection makes it only one page of output

554
01:08:18,639 --> 01:08:20,439
and that goes to the join.

555
01:08:20,439 --> 01:08:25,000
Four pages on the green side, two pages at the end of selection.

556
01:08:25,000 --> 01:08:27,679
They get joined, the output has two pages,

557
01:08:27,679 --> 01:08:30,479
but the records are much bigger right there combined.

558
01:08:30,479 --> 01:08:32,559
So if you have an explicit scheduler,

559
01:08:32,560 --> 01:08:36,120
then typically what gets done is it works well

560
01:08:36,120 --> 01:08:37,200
with this batch mode,

561
01:08:37,200 --> 01:08:39,320
especially the vectorization model.

562
01:08:39,320 --> 01:08:41,160
And then the scheduler is explicit,

563
01:08:41,160 --> 01:08:44,200
it will create something called a scheduling component

564
01:08:44,200 --> 01:08:46,080
of in QuickSep we called it work orders,

565
01:08:46,080 --> 01:08:48,000
but there are other ways to call it.

566
01:08:48,000 --> 01:08:50,280
And so you'll bring the data into the buffer pool,

567
01:08:50,280 --> 01:08:53,600
buffer pool operates under normal conditions.

568
01:08:53,600 --> 01:08:56,680
And now you are not calling that operator tree

569
01:08:56,680 --> 01:08:57,720
from top to bottom,

570
01:08:57,720 --> 01:09:00,039
but instead what you're doing is you're walking the tree

571
01:09:00,039 --> 01:09:02,480
and putting scheduling work in the scheduler queue

572
01:09:02,479 --> 01:09:05,079
with that black portion here, which is a pending queue.

573
01:09:05,079 --> 01:09:06,959
So you start walking the tree and say,

574
01:09:06,959 --> 01:09:09,959
I need to apply a selection on all the records

575
01:09:09,959 --> 01:09:10,959
in page R1.

576
01:09:10,959 --> 01:09:15,000
So that's the work that's been put on the scheduler queue.

577
01:09:15,000 --> 01:09:17,119
And you can fill up the scheduler queue

578
01:09:17,119 --> 01:09:18,879
with all the work that needs to be done

579
01:09:18,879 --> 01:09:20,199
as you're walking through the tree,

580
01:09:20,199 --> 01:09:22,399
whichever operator is ready to work.

581
01:09:22,399 --> 01:09:26,159
And then the worker threads are effectively stateless

582
01:09:26,159 --> 01:09:29,000
and they just run select code and join code whatever.

583
01:09:29,000 --> 01:09:30,839
They don't remember much.

584
01:09:30,839 --> 01:09:32,319
So that way you can distribute that,

585
01:09:32,840 --> 01:09:35,079
they could be spread across different machines

586
01:09:35,079 --> 01:09:38,119
and you can be very flexible about who does what.

587
01:09:38,119 --> 01:09:42,920
And it's very land alike in its execution for each operator.

588
01:09:42,920 --> 01:09:45,159
And then you send it across whatever network

589
01:09:45,159 --> 01:09:47,920
that a worker picks up and applies the first selection

590
01:09:47,920 --> 01:09:49,399
it fetches the records.

591
01:09:49,399 --> 01:09:51,559
And then when it does it produces its output

592
01:09:51,559 --> 01:09:52,960
in the SCHR prime,

593
01:09:52,960 --> 01:09:54,799
which is half a page worth of data.

594
01:09:54,799 --> 01:09:58,399
Let's say puts it into the buffer pool and goes on.

595
01:09:58,399 --> 01:10:00,880
So the scheduler is at any point in time

596
01:10:00,880 --> 01:10:03,119
just filled up with stuff that needs to be pulled up.

597
01:10:03,119 --> 01:10:05,840
Anyone can pull it, it's very dynamic.

598
01:10:05,840 --> 01:10:08,840
And allows the system to go execute that.

599
01:10:08,840 --> 01:10:12,600
So this filled up that first blue page and so on.

600
01:10:12,600 --> 01:10:13,840
And jumping ahead a little bit,

601
01:10:13,840 --> 01:10:15,279
once the selections are done,

602
01:10:15,279 --> 01:10:17,840
which is the bottom of the trees now done,

603
01:10:17,840 --> 01:10:20,680
you now put work orders to say go build the hash table

604
01:10:20,680 --> 01:10:25,680
on R prime, the output of that first scan on R.

605
01:10:26,000 --> 01:10:29,400
That gets scheduled, hash table gets built.

606
01:10:29,399 --> 01:10:31,159
And quick step, we built it in the buffer pool too.

607
01:10:31,159 --> 01:10:33,359
So there's only one pool to manage.

608
01:10:33,359 --> 01:10:38,119
And then you go and apply put into the scheduler saying,

609
01:10:38,119 --> 01:10:40,920
now I'm ready to schedule the probe operators.

610
01:10:40,920 --> 01:10:41,960
And you put that in.

611
01:10:41,960 --> 01:10:44,359
So effectively, this becomes a very different way

612
01:10:44,359 --> 01:10:48,759
of putting explicit breakpoints in the control flow.

613
01:10:48,759 --> 01:10:51,319
The data flow is through the vectorization model.

614
01:10:51,319 --> 01:10:52,319
But with this control flow,

615
01:10:52,319 --> 01:10:55,199
what you can now do is you can start to say,

616
01:10:55,199 --> 01:10:57,119
all kinds of interesting things like,

617
01:10:57,119 --> 01:10:59,279
I've got four queries running in the system,

618
01:10:59,279 --> 01:11:01,319
query one is already halfway through,

619
01:11:01,319 --> 01:11:04,719
but query four just came in and it's a very high priority.

620
01:11:04,719 --> 01:11:07,439
And all you do is take all of query fours work

621
01:11:07,439 --> 01:11:09,119
and put it to the front of the queue

622
01:11:09,119 --> 01:11:10,880
and the high priority queries just start to take

623
01:11:10,880 --> 01:11:13,800
over the entire system and come down.

624
01:11:13,800 --> 01:11:16,319
Furthermore, if the pool of workers is just,

625
01:11:16,319 --> 01:11:18,319
let's say I've got 10 threads there,

626
01:11:18,319 --> 01:11:19,840
I want to grow it to 40.

627
01:11:19,840 --> 01:11:22,399
The system will elastically scale back and forth

628
01:11:22,399 --> 01:11:24,519
and you don't have to do anything.

629
01:11:24,519 --> 01:11:26,599
In the traditional way of starting the operators,

630
01:11:26,599 --> 01:11:27,759
when you start the operator, you'll say,

631
01:11:27,760 --> 01:11:30,600
oh, I'm going to run you as a two way parallelism.

632
01:11:30,600 --> 01:11:31,880
But once I start that operator,

633
01:11:31,880 --> 01:11:33,360
let's say the hash join operator,

634
01:11:33,360 --> 01:11:35,199
till it's done, I can change it.

635
01:11:35,199 --> 01:11:38,000
Here, the workers are all stateless, so very elastic.

636
01:11:38,000 --> 01:11:40,119
You can do all kinds of fun stuff with priorities

637
01:11:40,119 --> 01:11:43,760
and stuff like that and it provides a much cleaner abstraction.

638
01:11:43,760 --> 01:11:45,239
And again, I'm not going to go into the details

639
01:11:45,239 --> 01:11:47,360
of this, the advanced database class talks about that,

640
01:11:47,360 --> 01:11:49,280
but if you're talking about query execution,

641
01:11:49,280 --> 01:11:51,840
you want to know about what schedulers do

642
01:11:51,840 --> 01:11:55,039
and a modern way to do that is to make the scheduler explicit

643
01:11:55,039 --> 01:11:57,159
and put a ton of smarts in that.

644
01:11:57,159 --> 01:12:00,439
That is, student whose entire thesis was on scheduler.

645
01:12:00,439 --> 01:12:02,039
And so I'll just leave it at that.

646
01:12:02,039 --> 01:12:04,399
You can basically see diagrams in the paper

647
01:12:04,399 --> 01:12:06,720
that talk about, you have two queries in the system,

648
01:12:06,720 --> 01:12:08,079
and the green query comes in.

649
01:12:08,079 --> 01:12:09,399
It takes over all the resources

650
01:12:09,399 --> 01:12:11,119
and everything just picks up automatically.

651
01:12:11,119 --> 01:12:12,800
You don't have to write any extra code.

652
01:12:12,800 --> 01:12:14,920
The system just magically adjusts

653
01:12:14,920 --> 01:12:16,599
in the elastic and flexible way.

654
01:12:17,840 --> 01:12:20,199
All right, I'm going to skip that part.

655
01:12:20,199 --> 01:12:24,119
So hopefully what we talked about today makes sense

656
01:12:24,119 --> 01:12:26,639
in terms of how do queries actually execute

657
01:12:26,640 --> 01:12:28,840
inside database engines.

658
01:12:28,840 --> 01:12:32,680
And you went from different processing models

659
01:12:32,680 --> 01:12:35,079
to all kinds of optimizations associated with it,

660
01:12:35,079 --> 01:12:37,000
including doing just in time compilation

661
01:12:37,000 --> 01:12:40,119
for just the predicate portion or the entire query.

662
01:12:41,480 --> 01:12:43,400
So I'm going to take the next few minutes to talk about,

663
01:12:43,400 --> 01:12:46,039
the next class we'll talk about parallel query execution,

664
01:12:46,039 --> 01:12:48,240
which is going back to the big thing on everyone's mind,

665
01:12:48,240 --> 01:12:50,880
the midterm, two days from now,

666
01:12:50,880 --> 01:12:53,560
in this classroom at this time,

667
01:12:53,560 --> 01:12:56,600
you must have seen the midterm guide

668
01:12:56,600 --> 01:12:58,280
with sample questions and answers.

669
01:12:58,280 --> 01:13:00,039
So please take a look at that.

670
01:13:00,039 --> 01:13:02,240
Bring your ID, you will check your ID.

671
01:13:02,240 --> 01:13:04,080
Don't send your friend to take your exam,

672
01:13:04,080 --> 01:13:04,920
we will catch it.

673
01:13:05,920 --> 01:13:07,400
You can bring a calculator.

674
01:13:07,400 --> 01:13:08,920
If you need a calculator,

675
01:13:10,160 --> 01:13:11,360
you shouldn't need a calculator,

676
01:13:11,360 --> 01:13:13,320
but bring it if you really want to.

677
01:13:15,120 --> 01:13:18,360
One 8.5 by 11 age paper,

678
01:13:18,360 --> 01:13:22,000
on which you can handwrite, double-sided.

679
01:13:22,000 --> 01:13:23,760
Again, as I talked earlier,

680
01:13:23,760 --> 01:13:25,720
this is just a way for you to feel comfortable

681
01:13:25,720 --> 01:13:28,159
that you don't have to memorize a bunch of stuff,

682
01:13:28,159 --> 01:13:30,319
but don't be the way in which you're going to study

683
01:13:30,319 --> 01:13:31,159
for the exam, right?

684
01:13:31,159 --> 01:13:33,640
This is just a way for you to feel comfortable,

685
01:13:33,640 --> 01:13:36,800
which you still have the knowledge in your head, okay?

686
01:13:37,760 --> 01:13:39,439
Andy told me that in previous classes,

687
01:13:39,439 --> 01:13:42,319
some students brought in live animals.

688
01:13:42,319 --> 01:13:44,079
If you need a pet to calm down,

689
01:13:45,359 --> 01:13:47,159
work with your pet before you get into the classroom,

690
01:13:47,159 --> 01:13:48,960
don't bring your pet in.

691
01:13:48,960 --> 01:13:50,960
I've been told that one time someone brought in

692
01:13:50,960 --> 01:13:53,680
vet laundry and candles, don't do all of that stuff, right?

693
01:13:53,680 --> 01:13:55,800
Just come with your calculator, your ID,

694
01:13:55,800 --> 01:13:57,960
and your two-page stuff,

695
01:13:57,960 --> 01:14:00,880
and drink a bunch of coffee if that works for you.

696
01:14:01,800 --> 01:14:04,159
The material is everything that we've talked about

697
01:14:04,159 --> 01:14:07,000
so far in class, including the relational model,

698
01:14:07,000 --> 01:14:09,279
relational algebra, integrity constraints,

699
01:14:09,279 --> 01:14:13,239
how they form the foundation of what is SQL

700
01:14:13,239 --> 01:14:15,199
in its declarative form,

701
01:14:15,199 --> 01:14:16,800
then the core parts of SQL,

702
01:14:16,800 --> 01:14:19,119
including the different operators select,

703
01:14:19,119 --> 01:14:21,159
insert, update, delete,

704
01:14:21,159 --> 01:14:24,319
you want you to know what the SQL query looks like,

705
01:14:24,319 --> 01:14:26,439
we want you to be able to look at a SQL query

706
01:14:26,439 --> 01:14:28,760
and tell what it does, right?

707
01:14:28,760 --> 01:14:31,039
We're not going to test you in intricate details

708
01:14:31,039 --> 01:14:34,239
and try to tell you to write a 10-level nested SQL query, okay?

709
01:14:34,239 --> 01:14:36,039
So that's not what we are trying to do,

710
01:14:36,039 --> 01:14:37,279
but you shouldn't have to say,

711
01:14:37,279 --> 01:14:39,519
oh, I don't know what a having clause is,

712
01:14:39,519 --> 01:14:41,239
or I don't know what a nested query looks like.

713
01:14:41,239 --> 01:14:42,880
You should be able to look at query

714
01:14:42,880 --> 01:14:45,599
and write simple queries in the class, okay?

715
01:14:45,599 --> 01:14:49,000
Without needing a debugger to go and figure things out.

716
01:14:49,000 --> 01:14:50,920
Not checking for details, syntax, and stuff

717
01:14:50,920 --> 01:14:52,840
like that just want to know how you think

718
01:14:52,840 --> 01:14:55,199
and at least read queries correctly.

719
01:14:55,199 --> 01:14:58,680
You should be aware of joins, aggregates, CTEs,

720
01:14:58,680 --> 01:15:00,479
and window functions, okay?

721
01:15:00,479 --> 01:15:02,039
All the stuff that you've talked about

722
01:15:02,039 --> 01:15:04,560
is advanced components in SQL.

723
01:15:04,560 --> 01:15:05,800
You build a buffer manager,

724
01:15:05,800 --> 01:15:09,000
so hopefully that part of the exam will be easy for you,

725
01:15:09,000 --> 01:15:11,279
you need to know about different replacement policies,

726
01:15:11,279 --> 01:15:13,039
what are the pros and cons, right?

727
01:15:13,039 --> 01:15:15,039
What works better when,

728
01:15:15,039 --> 01:15:16,960
know about the disk layout

729
01:15:16,960 --> 01:15:18,439
and the different methods we talked about,

730
01:15:18,439 --> 01:15:20,439
slotted pages, LASNs,

731
01:15:20,439 --> 01:15:22,720
someone asked this question earlier about this merging stuff,

732
01:15:22,720 --> 01:15:25,480
so revise that from the discussion

733
01:15:25,480 --> 01:15:27,880
from the log structured file system,

734
01:15:27,880 --> 01:15:31,079
different types of hashing that we've discussed in class, right?

735
01:15:31,079 --> 01:15:33,720
And the pros and cons for each one of those,

736
01:15:33,720 --> 01:15:37,960
linear probing, Robinhood, and Google hashing,

737
01:15:37,960 --> 01:15:39,600
and then the dynamic hashing structures,

738
01:15:39,600 --> 01:15:42,720
we looked at two extendable hashing and linear hashing,

739
01:15:42,720 --> 01:15:44,600
and you have a project on one of that.

740
01:15:44,600 --> 01:15:47,640
So I'm sure you're getting to know that well too.

741
01:15:47,640 --> 01:15:49,960
Beatrice, in search of CELIGE,

742
01:15:49,960 --> 01:15:52,720
you started with the tri-stuff as your first assignment,

743
01:15:52,720 --> 01:15:54,560
so you kind of already have been spending

744
01:15:54,560 --> 01:15:56,240
a fair amount of time on three structures,

745
01:15:56,240 --> 01:15:58,760
so Beatrice has this magical, balanced,

746
01:15:58,760 --> 01:16:02,120
logarithmic cost data structures,

747
01:16:02,120 --> 01:16:04,800
in search of CELIGE, there's specific algorithms for that,

748
01:16:04,800 --> 01:16:07,360
so, learn that well, I know there was a question on Piazza

749
01:16:07,360 --> 01:16:09,840
that was asking about some of the key rotations,

750
01:16:09,840 --> 01:16:12,280
so read that well, it's very logical,

751
01:16:12,280 --> 01:16:14,560
but you have to read it to get that into your head,

752
01:16:14,600 --> 01:16:16,680
what happens on splits and merges,

753
01:16:16,680 --> 01:16:19,080
the difference with the older Beatrice

754
01:16:19,080 --> 01:16:20,840
and latch-crabbing and coupling

755
01:16:20,840 --> 01:16:24,120
to make all of that work well in concurrent environments.

756
01:16:24,120 --> 01:16:26,480
We looked at sorting, two different types of sorting,

757
01:16:26,480 --> 01:16:29,160
external merge sort, the general merge sort,

758
01:16:29,160 --> 01:16:32,280
the N-weight tree, what were we trying to do

759
01:16:32,280 --> 01:16:34,320
with the different optimizations to that,

760
01:16:35,840 --> 01:16:38,440
with double buffering and all of that stuff.

761
01:16:39,400 --> 01:16:41,440
Last lecture, you looked at different join algorithms

762
01:16:41,440 --> 01:16:43,920
from very simple ones, nested loop stripes,

763
01:16:43,920 --> 01:16:46,199
sort merge, different types of hash joins,

764
01:16:46,199 --> 01:16:48,760
what are the pros and cons of those

765
01:16:48,760 --> 01:16:50,560
and the execution cost, right?

766
01:16:50,560 --> 01:16:51,920
That's basically, what's the cost of each

767
01:16:51,920 --> 01:16:54,359
on those under different circumstances?

768
01:16:55,279 --> 01:16:58,319
And this is not, the quake processing models

769
01:16:58,319 --> 01:17:01,319
is what we talked about today, it's not in the exam,

770
01:17:01,319 --> 01:17:04,039
so I think Matt announced last time

771
01:17:04,039 --> 01:17:05,600
that joins is the last thing, correct?

772
01:17:08,039 --> 01:17:09,399
Is that right? Is that ready announced?

773
01:17:09,399 --> 01:17:12,279
Yep, okay, so ignore this part,

774
01:17:12,439 --> 01:17:14,439
then we'll talk about panel query execution.

775
01:17:14,439 --> 01:17:16,079
I'll check with Matt, if he didn't announce that,

776
01:17:16,079 --> 01:17:18,079
then quake processing model will be part of that.

777
01:17:18,079 --> 01:17:20,759
I'll send in a via some message about that.

778
01:17:20,759 --> 01:17:22,279
I think he announced that it's not in the class,

779
01:17:22,279 --> 01:17:26,479
so go with that as a default unless we post something otherwise.

780
01:17:26,479 --> 01:17:29,639
All right, questions, last questions?

781
01:17:30,880 --> 01:17:32,880
Okay, all right, go for it.

782
01:17:32,880 --> 01:17:34,880
Let's see this thing stuff.

783
01:17:34,880 --> 01:17:36,880
That boy's a gangster.

784
01:17:36,880 --> 01:17:39,880
That ain't nothing but gangster.

785
01:17:39,880 --> 01:17:41,880
Yeah, yeah, now listen.

786
01:17:41,880 --> 01:17:44,880
I'm gonna pop you with the motherfucking hog.

787
01:17:44,880 --> 01:17:46,880
28 gram, depending on if it's the cop.

788
01:17:46,880 --> 01:17:49,880
You ain't hit him up yet, still got your shirt up.

789
01:17:49,880 --> 01:17:51,880
I smack you with the bottom of the cliff,

790
01:17:51,880 --> 01:17:54,880
and tell you, look up, show me what it's safe set.

791
01:17:54,880 --> 01:17:57,880
For I blow your face, I'm gonna pop you up.

792
01:17:57,880 --> 01:17:59,880
I'm gonna pop you up, I'm gonna pop you up.

793
01:17:59,880 --> 01:18:01,880
I'm gonna pop you up, I'm gonna pop you up.

794
01:18:01,880 --> 01:18:04,880
For I blow your face back, I got a block on top.

795
01:18:04,880 --> 01:18:05,880
The feds can't trace that.

796
01:18:05,880 --> 01:18:07,880
Style is like tamper poop.

797
01:18:07,880 --> 01:18:09,880
You can't lace that at the Dominican.

798
01:18:09,880 --> 01:18:11,880
Oh, you could call me Dominican.

799
01:18:11,880 --> 01:18:13,880
Black Skelly, black leather, black sweat, dimmelins.

800
01:18:13,880 --> 01:18:16,880
My poor black 38, I send you to the perigates.

801
01:18:16,880 --> 01:18:19,880
You kick a zombie, try to skate, and that's your first mistake.

802
01:18:19,880 --> 01:18:21,880
I ain't lying for that cake, you're famous, see you wait.

803
01:18:21,880 --> 01:18:24,880
My grandson's happy, wait, the rant, the webby steak.

804
01:18:24,880 --> 01:18:27,880
When he asked me how I'm living, I tell him I'm living great.

805
01:18:31,880 --> 01:18:34,880
I'm gonna pop you up, I'm gonna pop you up.

