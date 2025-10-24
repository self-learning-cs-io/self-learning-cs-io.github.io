---
title: CMU15445 P16F202315 ConcurrencyControlTheory
---

1
00:00:00,000 --> 00:00:29,560
I'm going to be playing at Borymark in Lawrenceville and I'll set up a

2
00:00:29,559 --> 00:00:36,359
new information on Wednesday. So if you're free, come down. So I'll be 11 to 1 at night.

3
00:00:36,359 --> 00:00:43,879
Okay, and you said you have a bouncer that's going to ignore the IDs or you have fake IDs that you're

4
00:00:43,879 --> 00:00:48,519
going to hand out on the side as a business. That all of that information I cannot say in this class.

5
00:00:48,519 --> 00:00:53,480
Okay, please don't do that. Please don't do that. Okay, great. Excellent. And we'll have a

6
00:00:53,479 --> 00:00:58,919
trip report. Some of you guys make it to that. So all right, sorry about taking a little bit of

7
00:00:58,919 --> 00:01:03,879
time to get started. I had a bunch of people at the office hours. But we're going to talk about

8
00:01:04,599 --> 00:01:11,239
Concurrency Control today. And let's just jump right into it. All right, so let's get into this.

9
00:01:11,879 --> 00:01:17,560
You've seen this diagram of what a database engine looks like as a modular architecture for the

10
00:01:17,560 --> 00:01:24,280
different components. We are going to talk today about Concurrency Control mechanisms that

11
00:01:24,280 --> 00:01:28,920
hit across these different layers, which largely has the operator execution and the access method

12
00:01:28,920 --> 00:01:33,640
layers. In two classes from now, we'll talk about recovery methods, which is at the Buffipool

13
00:01:33,640 --> 00:01:38,680
and disk manager layers. Now, all of this will become a lot more clear as we jump into what that

14
00:01:38,680 --> 00:01:46,439
transaction management mean, what does recovery mean. So let's go straight to that. So transaction

15
00:01:46,439 --> 00:01:53,159
management allows us to do things safely in a database system in situations where multiple

16
00:01:53,159 --> 00:02:00,920
things are getting updated out at the same time. Let's start with a simple example. Here is a

17
00:02:01,799 --> 00:02:07,319
schematic of database operations. These could be fired through a SQL query. From the perspective of

18
00:02:07,319 --> 00:02:12,680
the transaction management component, we are largely going to look at the operations that happen

19
00:02:12,680 --> 00:02:17,960
at the object level. So imagine we fired up a transaction and that ends up reading an object,

20
00:02:17,960 --> 00:02:23,000
could be a record, could be a page, we're just going to refer to them as objects here. In this class,

21
00:02:23,000 --> 00:02:29,159
does some checking of that value, does some action like pay, and then updates that A by subtracting

22
00:02:29,159 --> 00:02:35,800
25 from it and eventually writes that. For the purpose of the discussion for transaction management,

23
00:02:35,800 --> 00:02:41,800
we are largely concerned with the read and write operations that happen with each of these database

24
00:02:42,600 --> 00:02:47,400
you can think of them as records, pages, tables, what have you, it won't matter, just

25
00:02:47,400 --> 00:02:52,680
assume the reads and writes for objects that are in the database is what we care about. And we want

26
00:02:52,680 --> 00:02:57,960
to have certain properties about these reads and write to ensure notions of correctness as we

27
00:02:57,960 --> 00:03:02,920
will define it and that's what transaction management does. So what could go wrong, right? This is a

28
00:03:02,920 --> 00:03:09,640
simple set of actions that are presented to the database in response to a query that an application

29
00:03:09,719 --> 00:03:15,399
might have sent and a couple things could go wrong. So here on the right side, you see the bank

30
00:03:15,399 --> 00:03:22,119
balance starts out has a value of 100. The first thing that happens is does that check and

31
00:03:22,119 --> 00:03:28,359
everything looks okay. It says yes, that check passes so there's sufficient balance to pay $25. So

32
00:03:28,359 --> 00:03:36,199
this is you going to an ATM asking for a withdrawal and pays you that $25 so you now have it and

33
00:03:36,199 --> 00:03:41,079
the new balance is calculated and that balance now gets written to your bank account okay. So after

34
00:03:41,079 --> 00:03:46,839
the new balance gets calculated that last action of bank balance of 75 is that write operation that

35
00:03:46,839 --> 00:03:56,039
you see in that code on the left side. But now what if after the ATM machine spitted out the $25

36
00:03:57,719 --> 00:04:02,759
you went and yanked that ATM machines power parts so that it could not send the right back okay,

37
00:04:02,759 --> 00:04:09,799
imagine you were that fast or there's a natural power failure. So the paying action and the

38
00:04:09,799 --> 00:04:13,799
right to the databases not atomic right they're happening in different systems they might even be

39
00:04:13,799 --> 00:04:19,879
geographically spread across and that things could happen in between those actions. So how do we

40
00:04:19,879 --> 00:04:24,519
make sure that this transaction is correct? Obviously we don't want that here bank would be very upset

41
00:04:24,519 --> 00:04:29,879
if that's how database systems work because they would be losing money if this happens. So we want

42
00:04:29,879 --> 00:04:34,759
this type of stuff to be protected and we'll talk about how. Here's another scenario a different

43
00:04:34,759 --> 00:04:39,800
scenario showing a different type of problems that we also need to worry about. So this is not a

44
00:04:39,800 --> 00:04:45,879
power failure or things of that sort but concurrent actions. So imagine you and your significant other

45
00:04:45,879 --> 00:04:51,159
both share this bank account and you have individual debit cards that allow you to debit from that same

46
00:04:51,159 --> 00:04:58,040
bank account and you both go to two separate ATM simultaneously run this transaction so both of

47
00:04:58,040 --> 00:05:05,640
you are running these sequence of actions to withdraw $25 and sufficient balance is checked on

48
00:05:05,640 --> 00:05:12,920
both sides you get paid ATM spits out $25 your significant other gets paid but now because both of

49
00:05:12,920 --> 00:05:18,759
them read the original bank balance both of them have calculated the new balance as being 75 right

50
00:05:18,759 --> 00:05:25,240
because everything looks correct and then the first one writes the second one over writes that

51
00:05:25,319 --> 00:05:31,720
and now the bank is short $25 again this is not a ideal situation for the banks banks would never

52
00:05:31,720 --> 00:05:36,360
use database systems or enterprises wouldn't use database systems if these types of things are allowed

53
00:05:36,360 --> 00:05:43,639
to happen. So semantically what we wanted is that we wanted the database application was sending

54
00:05:43,639 --> 00:05:48,519
this read and write request right that was written by some application code that is firing up the

55
00:05:48,519 --> 00:05:53,879
SQL queries to the database system and now to no fault of the application code writer right that's

56
00:05:53,879 --> 00:05:58,680
what the application code writer is doing effectively writing the code that ends up sending those read

57
00:05:58,680 --> 00:06:03,480
write operations to the database it feels the database system is just corrupting the data so that's

58
00:06:03,480 --> 00:06:08,839
obviously not what we want of a database system we wanted to be well behaved we want the final

59
00:06:08,839 --> 00:06:16,519
balance in this case to be $50 okay so how do we deal with these bad system systems behavior

60
00:06:17,399 --> 00:06:22,199
and have the database be coherent because ultimately the database is the keeper of the record

61
00:06:22,199 --> 00:06:27,479
sets the master copy of what you have in the bank account and it has to be consistent in spite of

62
00:06:27,479 --> 00:06:33,079
all these different failure scenarios. So one system way assuming that you don't have power failure

63
00:06:33,079 --> 00:06:38,360
is to say okay the second type of option that I had where congruent actions were corrupting each other

64
00:06:39,159 --> 00:06:44,279
is to say I'm going to have a very simple database system even if two people requested the queries

65
00:06:44,279 --> 00:06:49,159
at the same time I will only run the one query at a time I'm going to queue everything up all the

66
00:06:49,160 --> 00:06:56,439
requests I get I will run one query at a time and I can get a sensible correct behavior for the

67
00:06:56,439 --> 00:07:01,480
scenario we just talked about I can also start to do things like before transaction starts I can make

68
00:07:01,480 --> 00:07:07,640
a copy of the entire database make all the changes there and if the transaction complete successfully

69
00:07:07,640 --> 00:07:12,440
so didn't have a power failure all of that other kinds of stuff I will override it with a new copy

70
00:07:13,080 --> 00:07:18,040
both of these are really bad from they will give you some form of correctness but they're really bad

71
00:07:18,040 --> 00:07:26,040
from a performance perspective because it would be a very very slow database system and you won't

72
00:07:26,040 --> 00:07:30,439
be able to quite use that right today when you go to amazon and you're checking out your shopping

73
00:07:30,439 --> 00:07:35,640
card you know ultimately something's going and issuing database transaction records to debit from

74
00:07:35,640 --> 00:07:40,920
your to add to your shopping card eventually another transaction gets there sent to your credit card

75
00:07:40,920 --> 00:07:45,560
account to record that that amount needs to be depended and all of that works correctly even if

76
00:07:45,560 --> 00:07:50,600
multiple people multiple account holders on the same credit card are doing the transactions at

77
00:07:50,600 --> 00:07:55,079
the same time multiple shopping cards are getting created so we really want to be able to do this at

78
00:07:55,079 --> 00:08:00,040
scale we don't want to do one transaction at a time you want to be doing thousands tens of thousands

79
00:08:00,040 --> 00:08:04,439
if not millions of billions of transactions at a time okay so how do we do that that's a really

80
00:08:04,439 --> 00:08:10,040
hard problem okay we want better utilization for the database hardware we want higher throughput

81
00:08:10,040 --> 00:08:15,160
better response times and of course we wanted to be correct so that the right thing happens and

82
00:08:15,160 --> 00:08:21,240
we'll define what that notion of correctness is and in many cases you also wanted to be fair so if

83
00:08:21,240 --> 00:08:25,800
multiple transactions come at the same time you want all of them to be given that equal chance to

84
00:08:25,800 --> 00:08:30,680
complete and not just say I'm going to hold two of you in the back forever and just let the other

85
00:08:30,680 --> 00:08:36,680
others go forward right that's not fair you want to have some notion of fairness okay and some

86
00:08:36,680 --> 00:08:40,360
systems may not have that sometimes you have priorities where you say I want high priorities

87
00:08:40,360 --> 00:08:44,600
for transactions to go through but assuming you want fairness you at least one the capability of having

88
00:08:44,600 --> 00:08:49,000
fairness how you balance that in terms of partitioning your workload to let higher priority

89
00:08:49,000 --> 00:08:54,920
stuff go is a different issue right but you do want the mechanism of fairness to be built into the

90
00:08:54,920 --> 00:09:06,680
database system okay questions so far in terms of what we are trying to achieve yep we will try to

91
00:09:06,680 --> 00:09:12,120
we will solve all the issues except the power failure ratio and the power failure issue will be

92
00:09:12,120 --> 00:09:17,480
solved in you we get to all of that solution later on where the power there's a very subtle issue

93
00:09:17,480 --> 00:09:21,799
in the power failure stuff which is with all the stuff we'll talk about in the next few lectures we

94
00:09:21,799 --> 00:09:28,120
can make sure that the database record ends up in the right state but if the bank has paid you $25

95
00:09:28,120 --> 00:09:34,200
and there's a power failure there's extra action that is needed because that $25 has been a

96
00:09:34,200 --> 00:09:40,200
physical action everything else is a digital action and to undo that action of paying you $25

97
00:09:40,200 --> 00:09:44,840
when they should not have paid the bank would have to then do a separate transaction and physical

98
00:09:44,840 --> 00:09:48,840
space where they'll send you a letter saying whoops we accidentally paid you $25 but here's

99
00:09:48,840 --> 00:09:53,879
what's what your bank account is right so there are other ways to do that we won't we will be able to

100
00:09:53,879 --> 00:09:59,480
undo all the reads and writes if we don't want them to happen but you know if the transaction is

101
00:09:59,480 --> 00:10:04,520
paid $25 there's a physical action you can't undo it you'll undo that by doing other physical actions

102
00:10:04,520 --> 00:10:08,680
in the physical work okay similarly if there's a transaction that fired a missile you can't undo

103
00:10:08,679 --> 00:10:12,519
that missile you can't bring that missile back you have to send an apology letter or something else

104
00:10:12,519 --> 00:10:19,959
like that right so or something really bad so it's like the undo for physical actions in transactions

105
00:10:19,959 --> 00:10:25,159
will require undo in the physical world which we won't cover and there are mechanisms to do that

106
00:10:25,159 --> 00:10:29,799
that are business related actions you'll sometimes get a letter from your company saying whoops we made

107
00:10:29,799 --> 00:10:34,599
a mistake sorry about that here's what really happened oh and by the way he's a $10 gift card

108
00:10:34,680 --> 00:10:40,360
to make up for a mistake but all the digital actions the reads and writes we will cast them into a

109
00:10:40,360 --> 00:10:46,519
very strict structure to guarantee very well to find properties of correctness that we will hold

110
00:10:46,519 --> 00:10:51,320
to the mechanisms we'll talk about today and going into the next few lectures okay great question

111
00:10:52,840 --> 00:11:03,160
other questions all right so we want these arbitrary interleaving of operations and be correct

112
00:11:03,719 --> 00:11:08,839
so before we go a little bit further just want to solidify the notion of transactions

113
00:11:08,839 --> 00:11:14,600
we're going to carry out these operations and the database as we just talked about is only concerned

114
00:11:14,600 --> 00:11:19,399
about the read and write operations to the database objects right these physical world actions

115
00:11:19,399 --> 00:11:26,679
of paying an amount or you know starting this is fighting for missiles stuff like that those

116
00:11:27,319 --> 00:11:34,359
we won't be able to repair if bad things happen okay and there's a in the advanced database class

117
00:11:34,359 --> 00:11:37,879
depending upon the material that's there's sometimes we'll talk about stuff like that and what are

118
00:11:37,879 --> 00:11:43,159
compensating transactions and stuff like that that might happen and what people might do as other ways

119
00:11:43,159 --> 00:11:48,759
so but for the purpose of this class we'll just look at in this in this many ways of more limited scope

120
00:11:49,799 --> 00:11:55,240
reiterating what we talked about we'll think primarily about read and write operations you notice

121
00:11:55,240 --> 00:11:59,159
that in the code that I had there was also a check there was a subtraction there was math and

122
00:11:59,159 --> 00:12:03,720
stuff like that from the perspective of what we want to cover today for transaction management

123
00:12:03,720 --> 00:12:09,000
all we care about is didn't object get written did it get read and do those reads and writes end up

124
00:12:09,000 --> 00:12:13,560
interfering with each other in bad ways what are those bad ways and how do we prevent those bad ways

125
00:12:14,680 --> 00:12:21,240
okay and how do we prevent those bad ways while allowing the maximum number of transactions to work

126
00:12:21,240 --> 00:12:25,799
on the system concurrently that's the hard part right because you already saw there's an easy way

127
00:12:25,799 --> 00:12:31,000
which is to just to one transaction at a time if you want to do better than that all right so it's only

128
00:12:31,000 --> 00:12:36,600
these objects which will just refer to as variables a b and c but if you want to have a simple model

129
00:12:36,600 --> 00:12:41,480
you can think of it as a record but inside a database system in this we cover in the advanced

130
00:12:41,480 --> 00:12:47,480
database class that a could be a column which is doing things at a final level of granularity

131
00:12:47,480 --> 00:12:52,840
all could be a page all could be a file all could be a database some early versions of databases

132
00:12:53,560 --> 00:12:59,159
like Mongo at one point to do concurrency would lock the entire database they don't do that now

133
00:12:59,159 --> 00:13:07,080
but the the the the size of that object or the a b's and c just refer to database objects right

134
00:13:07,080 --> 00:13:11,800
for the purpose of today you can think about them as records and everything today and the next two

135
00:13:11,799 --> 00:13:17,639
classes will make a lot more sense if you wanted to pick a mental model for that okay all right

136
00:13:19,719 --> 00:13:25,240
how does the database system know that a transaction has started and transaction has ended in

137
00:13:25,240 --> 00:13:30,120
SQL you can explicitly put a begin transaction statement and an end transaction statement to tell

138
00:13:30,120 --> 00:13:35,079
the database system all the stuff that happened in between is a transaction and in between could be

139
00:13:35,079 --> 00:13:40,919
multiple SQL queries if you don't have a begin an transaction like all the stuff you've been doing

140
00:13:40,919 --> 00:13:45,479
in your homework when you fire up a SQL query implicitly the database system will put a begin

141
00:13:45,479 --> 00:13:49,719
at the beginning of the query and an end at the end of the query but a transaction could be multi

142
00:13:49,719 --> 00:13:55,079
queries right you can explicitly put begin and end you could also put an explicit abort statement

143
00:13:55,079 --> 00:14:00,199
which is to say so and instead of end it is called a commit which is to say everything I've done

144
00:14:00,199 --> 00:14:05,879
from the begin to here please commit it and make its changes permanent the other way to end that

145
00:14:05,879 --> 00:14:11,639
transaction is to say abort so it may be I'm trying to make vacation plans so I do a transaction

146
00:14:11,639 --> 00:14:16,759
to book flight tickets then I do a little bit of search in the code to find hotel reservations and

147
00:14:16,759 --> 00:14:21,960
find whoops don't have a hotel so I could say oh abort this transaction then abort says I did some

148
00:14:21,960 --> 00:14:27,240
work reads and writes but I don't think I can go further something doesn't look right about this

149
00:14:27,240 --> 00:14:31,399
transaction and you could the application could be trying again which you could explicitly

150
00:14:31,399 --> 00:14:36,279
abort the transaction and sometimes it may be that the database aborts for you because multiple

151
00:14:36,279 --> 00:14:41,159
transactions are happening at the same time it detects some unsafe condition and says whoops I'm

152
00:14:41,159 --> 00:14:46,600
going to abort this transaction for you and you get an abort code from the transaction manager's

153
00:14:46,600 --> 00:14:52,039
perspective the module that we are trying to understand and build today it will be presented with

154
00:14:52,039 --> 00:14:57,559
a begin transaction bunch of read write actions and eventually it will get a commit or an abort

155
00:14:58,199 --> 00:15:05,000
action and that's what we have to build in the system code to do transactions right so transactions

156
00:15:05,000 --> 00:15:09,319
could end by committing or they could end by aborting a botting means undo everything that might

157
00:15:09,319 --> 00:15:15,559
be done commit says everything I did make it permanent okay so they can end in those two ways

158
00:15:16,279 --> 00:15:20,759
and the abort could be self-inflicted as we talked about application could have explicitly put

159
00:15:20,759 --> 00:15:25,879
in a bot call or it could be that the database system has to abort for some reason to do all the

160
00:15:25,879 --> 00:15:30,519
safety guarantee that we talked about and we'll look at different ways in which a bot happens inside

161
00:15:30,519 --> 00:15:37,799
a database system over the next couple lectures okay many of you might have heard of this thing called

162
00:15:37,799 --> 00:15:45,080
acid it's a cool acronym that was that the community came up with the couple guys who came up with

163
00:15:47,480 --> 00:15:53,720
to say what are the properties we want of these transactions okay and the properties are

164
00:15:53,720 --> 00:15:59,960
atomicity consistency isolation and durability so let's go through each one of those

165
00:16:00,519 --> 00:16:08,519
atomicity says I have a transaction that did a whole bunch of read writes and when I say commit

166
00:16:08,519 --> 00:16:13,399
everything should have committed to the database or if I say abort nothing should have happened so

167
00:16:13,399 --> 00:16:17,800
it's like I want this all or nothing property of this transaction even though lots of reason

168
00:16:17,800 --> 00:16:22,920
rights might have happened in this in this transaction right it should feel like it's a

169
00:16:22,919 --> 00:16:29,719
atomic right so it's very much like what you see with atomic instructions in in processors but now

170
00:16:29,719 --> 00:16:35,000
this is for multiple reads and writes those reads and writes may be spilling data to disk so it's a much

171
00:16:35,000 --> 00:16:42,599
higher granularity right so much harder problem consistency says consistency is a little weird one

172
00:16:42,599 --> 00:16:48,039
and I'm actually going to go to that last let me go to isolation and I come back to consistency

173
00:16:48,039 --> 00:16:53,559
isolation says if two transactions like we have those two debit transactions happening

174
00:16:53,559 --> 00:16:59,480
we draw a lot of $25 from the bank account for you and your significant other we want those to

175
00:16:59,480 --> 00:17:04,039
not interfere with each other it should feel like each transaction happened by itself so even though

176
00:17:04,039 --> 00:17:09,079
we don't want to run one transaction at a time we want the illusion of the system running one

177
00:17:09,079 --> 00:17:13,720
transaction at a time it should feel like when my transaction ran I had the whole system to myself

178
00:17:14,200 --> 00:17:20,039
and nothing else interfered with me okay is that make sense so it's like I should feel no one

179
00:17:20,039 --> 00:17:27,319
interfered with my work durability says that if the database comes back to me and says I've committed

180
00:17:27,319 --> 00:17:35,160
your transaction after that even if there's some failure the disk fails or the memory fails I should

181
00:17:35,160 --> 00:17:44,360
be able to recover that state of the database with all the commit information in that so if I

182
00:17:44,360 --> 00:17:50,120
had changed the final value of that bank account to 75 the database said I've committed your transaction

183
00:17:50,120 --> 00:17:55,640
right that commit call came back with the green signal and then there's a power failure when I

184
00:17:55,640 --> 00:18:02,040
bring back the machine I should see 75 in there not 100 which was the value it started with okay

185
00:18:02,920 --> 00:18:08,039
now going back to consistency and I'll wait it for that because I'll just put a little labels around

186
00:18:08,039 --> 00:18:14,680
how we go about doing things like that consistency is this weird thing that says if the database starts

187
00:18:14,680 --> 00:18:22,359
consistent as per some definition then it should end in that same consistent state now that

188
00:18:22,359 --> 00:18:28,680
also seems vague right so what does it mean that the database started consistent in SQL there are

189
00:18:28,680 --> 00:18:33,400
things like you can define a primary key for in key right you've already done that SQL also has

190
00:18:33,400 --> 00:18:40,440
these things called constraints where you can say at all and things called checks so check might say

191
00:18:40,440 --> 00:18:45,960
the price I've got a price field in the table and that price should never be greater than 100

192
00:18:47,400 --> 00:18:51,880
okay and the databases required whenever any updates happen to the database system to make sure

193
00:18:51,880 --> 00:18:59,400
those things hold true so consistently really says if the application has specified in the SQL

194
00:18:59,400 --> 00:19:07,800
DDL all the things that they want the database to hold correct then the database transaction shouldn't

195
00:19:07,800 --> 00:19:13,240
mess that up and the main ways in which that happens is by checks primary keys and you can also define

196
00:19:14,920 --> 00:19:20,920
checks outside tables and other ways of defining constraints and you really want all of that to hold

197
00:19:21,480 --> 00:19:28,200
okay so it's sort of weird but it says if the application has defined the structure of the database

198
00:19:28,200 --> 00:19:33,160
correctly using everything that SQL allows with these checks the transaction management

199
00:19:33,880 --> 00:19:39,000
everything that we do here shouldn't mess that up if I said a plus b must always equal to 100

200
00:19:39,000 --> 00:19:45,720
and someone modified a and modified b in the appropriate way so that it is still equal to 100

201
00:19:46,279 --> 00:19:51,720
in a single transaction the transaction shouldn't violate anything and change that constraint so

202
00:19:51,720 --> 00:19:56,440
it should maintain that correctness okay and we'll come back to it it sounds a little vague but

203
00:19:57,079 --> 00:20:01,880
in many ways that C was fitted into that acid definition because the real key things that the database

204
00:20:01,880 --> 00:20:08,039
done is AID but if the acronym was AID then it didn't sound as good as acid and this was done when

205
00:20:08,039 --> 00:20:13,400
hippies were ruling the Bay Area and Europe and they wanted acid everywhere so that's the

206
00:20:13,400 --> 00:20:20,200
uh uh uh uh that's my understanding of how C was plugged in we'll talk about different mechanisms

207
00:20:20,200 --> 00:20:26,120
and those are what you see in those blue bubble atomicity and durability will require this mechanism

208
00:20:26,120 --> 00:20:31,160
to redo and undo stuff oh I've changed A and I've pushed it out to disk I've pushed it out from

209
00:20:31,160 --> 00:20:38,200
my buffer pool to disk oh but I need to abort that transaction uh so how do I undo that oh I committed

210
00:20:38,200 --> 00:20:42,680
a transaction with a new value of A but it's still sending my buffer pool it didn't make it to disk

211
00:20:42,680 --> 00:20:48,680
I need to redo the disk copy so the redo and undo mechanisms is what the A and D provides we'll use

212
00:20:48,680 --> 00:20:54,519
things that we'll see today and in the next lecture that cover that as I said consistency is provided

213
00:20:54,519 --> 00:20:59,799
by making sure there are integrity constraints defined in a SQL DDL and the transaction management

214
00:20:59,799 --> 00:21:04,920
system shouldn't violate that isolation is done by something called concurrency control which we

215
00:21:04,920 --> 00:21:09,400
which we will also look at right and locking another mechanisms will come into play there so we're

216
00:21:09,400 --> 00:21:15,080
going to dig into each one of these so let's get started all right so that's our agenda dive into

217
00:21:15,080 --> 00:21:23,400
each of these four components so atomicity of transactions uh there are uh two possible outcomes

218
00:21:23,400 --> 00:21:28,600
for executing a transaction it either commits or it aborts right and aborts could be explicitly

219
00:21:29,320 --> 00:21:34,519
triggered by the application or it could be something where the database says something's unsafe

220
00:21:34,519 --> 00:21:39,480
I need to abort you okay and then that transaction could restart and reissue that SQL statement

221
00:21:40,200 --> 00:21:45,559
and the DBMS needs to provide this all on nothing slash atomic property of these transactions

222
00:21:46,920 --> 00:21:50,519
so let's make it a little bit more concrete we've been playing around with examples so we'll look

223
00:21:50,519 --> 00:21:55,639
at a couple scenarios as we dig into this we take hundred dollars out of an account uh but the

224
00:21:55,639 --> 00:22:01,960
database system aborts the transaction before we transfer it right so we want to make sure uh uh uh

225
00:22:01,960 --> 00:22:06,600
that that is reflected correctly scenario two is we take hundred dollars out of an account but then

226
00:22:06,600 --> 00:22:10,519
there's a power failure before we transfer that we've kind of seen both of these transactions but

227
00:22:10,519 --> 00:22:15,319
just giving you more examples of what that should be and you know we have determined what's the

228
00:22:15,319 --> 00:22:21,880
correct state of the account after both these uh transaction aborts so how can we do some of this

229
00:22:21,880 --> 00:22:28,440
stuff uh the atomicity part can be done in one of two ways logging and shadowing one way is to

230
00:22:28,440 --> 00:22:34,759
log everything that we do so if I'm recording all my actions the minute I change a value

231
00:22:35,320 --> 00:22:40,519
from hundred to seventy five I can record that my value was hundred I change it to seventy five

232
00:22:40,519 --> 00:22:46,279
before value was hundred after value is seventy five now I can take those logs and I can maintain

233
00:22:46,279 --> 00:22:53,400
those log records and I can store those log records in memory and then appropriate points move it

234
00:22:53,400 --> 00:22:58,680
out to disk once it moves into disk I know it is going to be there it will survive that power failure

235
00:22:59,240 --> 00:23:03,720
if I don't think I can trust a single disk to hold that log many times people will use disk

236
00:23:03,720 --> 00:23:08,040
mirroring remember we talked about disk mirroring a couple lectures ago so that there are two discs

237
00:23:08,040 --> 00:23:13,880
that will have a copy of that same file I write but it's actually being written in twice in two places

238
00:23:13,880 --> 00:23:18,600
so that if one fails I still have that other copy that if both fail you'd have to make a third copy

239
00:23:18,679 --> 00:23:24,279
and so on so you have to decide what failure you can tolerate but once a log hits the disk you kind

240
00:23:24,279 --> 00:23:29,319
of know you can recover from that and reconstruct the state of the database and we'll talk about

241
00:23:29,319 --> 00:23:35,399
the protocol Aries as we uh in two lectures from now how we go at make that happen but logging is

242
00:23:35,399 --> 00:23:41,319
the mechanism that most database systems will use to go and record the changes that are happening

243
00:23:42,199 --> 00:23:48,439
okay all right does that make sense questions yeah uh how does it relate

244
00:23:48,839 --> 00:23:55,399
to like sorry like at the storage level sorry sorry great is this sort of no no don't confuse

245
00:23:55,399 --> 00:23:59,159
this with log structured file system is that what you are thinking it will look like that

246
00:23:59,159 --> 00:24:06,279
but it's different so a lot of this originated in the 70s and 80s it's a file of records but the

247
00:24:06,279 --> 00:24:11,799
records are going to be variable length and the structure will have a certain set of common fields

248
00:24:12,599 --> 00:24:20,119
but think of it as a file with a bunch of variable with some fixed length components and a whole bunch

249
00:24:20,119 --> 00:24:25,000
of variable it's sitting in a file that will often be called the log file and it's basically

250
00:24:25,000 --> 00:24:29,319
going to be written sequentially from first to the end and it'll be it'll have its own buffer

251
00:24:29,319 --> 00:24:34,839
management so it'll the recent pages will be in the buffer pool at certain points we will have to

252
00:24:34,839 --> 00:24:41,079
tell that the buffer pool to say I cannot commit this transaction till this page you have here in

253
00:24:41,079 --> 00:24:47,079
memory that needs to hit to disk before I can commit this transaction so we might hold the

254
00:24:47,079 --> 00:24:51,960
transactions commit we won't return it till we have but you can think of it as a file of records

255
00:24:52,679 --> 00:25:04,759
just like a regular file which got its special structure in schema yeah so the question is if I

256
00:25:04,759 --> 00:25:10,759
have a log structured file system do I need logging a log structured file system just works for that

257
00:25:10,759 --> 00:25:15,240
file so in a database system I may have a hundred tables a transaction we have updated in five different

258
00:25:15,240 --> 00:25:20,920
places I need a global log logging mechanism to deal with that so traditionally what will be done I

259
00:25:20,920 --> 00:25:26,279
have a log file which is going to keep these changes for all the changes that are happening across

260
00:25:26,279 --> 00:25:31,000
not just for a single file so log structured file system does make sense they have similar elements

261
00:25:31,000 --> 00:25:36,200
to the types of mechanisms that you're trying to do redo and undo type of things but they are on a

262
00:25:36,200 --> 00:25:40,359
poor file basis they may not be the right structure for it they don't necessarily have all the buffer

263
00:25:40,359 --> 00:25:44,359
stuff so it's good for certain applications in file system but for database systems we're going to

264
00:25:44,359 --> 00:25:50,759
need something different and we need it across different files right you might prove no operations too

265
00:25:50,759 --> 00:25:54,599
so we'll talk about all of that as we go into details but that's a good point why am I you know

266
00:25:54,599 --> 00:25:59,319
why do the operating systems guys talk about log structured file systems they're very similar elements

267
00:25:59,319 --> 00:26:06,119
to that can we use that we we need to worry about transactions that update records across multiple

268
00:26:06,119 --> 00:26:10,359
different tables which may be in multiple different files sitting in the file system and still be

269
00:26:10,359 --> 00:26:14,759
atomic across those files so it's different so we in many ways we have to do a little bit we have a

270
00:26:14,759 --> 00:26:24,679
harder problem to solve okay great question though other questions okay all right so logging is used

271
00:26:25,559 --> 00:26:32,039
by nearly every database system what's the alternative you might ask in the very early days before

272
00:26:32,039 --> 00:26:38,359
logging and all the details about logging were really worked out a very easy way to kind of do this

273
00:26:38,359 --> 00:26:43,000
stuff was to do shadow paging it's like copy on right type of thing right and you'll see that

274
00:26:43,000 --> 00:26:47,159
in many applications you'll see similar concepts by the way those of you've taken operating systems

275
00:26:47,159 --> 00:26:52,440
or a dug into that are going to find a lot of common things between database systems and operating

276
00:26:52,440 --> 00:26:57,000
systems we already hit latches and locks they try to different things but a lot of database

277
00:26:57,000 --> 00:27:02,680
things are going to be on larger things lots of files lots of data and in some said the mechanisms

278
00:27:02,680 --> 00:27:08,920
are going to be different and in my view often richer okay so shadowing is okay I'm going to make

279
00:27:09,960 --> 00:27:14,519
change to a record on a page you know what I'm just going to make a new copy of the page and make

280
00:27:14,519 --> 00:27:19,240
the changes there that way if I need to undo stuff I'll just go back to the old page and I've got

281
00:27:19,240 --> 00:27:25,799
both my before and after copy for the entire page now of course some systems still do that but it's

282
00:27:25,799 --> 00:27:31,879
not a good idea it's less efficient right if I just want to do change one bite in one page I'm

283
00:27:31,879 --> 00:27:36,359
going to make an entire copy of the page so that's obviously based on I still need to go and

284
00:27:36,359 --> 00:27:42,039
clean things up and merge things up others before you know it if I've got one page which has got a hot

285
00:27:42,039 --> 00:27:48,759
record and let's say it's the counter that says how many skews to a half for the pink Barbie doll

286
00:27:48,759 --> 00:27:53,319
that's really popular every time someone buys that Barbie doll that counter will change I'm going to

287
00:27:53,319 --> 00:27:57,240
make copies and copies of the page right so if I've got a million Barbie dolls I'll have a million

288
00:27:57,240 --> 00:28:03,240
copies okay by the way counters in database systems on captack way they are done with more semantic

289
00:28:03,240 --> 00:28:07,720
components using commutative action that's just a side common also an encouragement to take the

290
00:28:07,720 --> 00:28:13,720
advanced database class to talk about more complex mechanisms to make transactions go even faster and

291
00:28:13,720 --> 00:28:20,359
better okay but you get the idea that shadow paging can very quickly it's a cheap mechanism easy

292
00:28:20,359 --> 00:28:25,479
to implement but is problematic logging is superior and that's what most database systems use

293
00:28:27,159 --> 00:28:32,199
so let's get to the C part which has always been a little difficult to explain but hopefully

294
00:28:32,199 --> 00:28:36,839
with this slide it'll start to become better it's essentially saying I have a contract between the

295
00:28:36,839 --> 00:28:42,839
database system and I as an application programmer have a contract with you the database system that

296
00:28:42,839 --> 00:28:48,119
I'll tell you what I want in the application through my SQL statement my primary key constraints

297
00:28:48,119 --> 00:28:54,279
my checks and other things that I want in the system and don't mess it up if those constraint

298
00:28:54,279 --> 00:28:59,639
held before the transaction started then the transaction ran and it may have touched a million

299
00:28:59,639 --> 00:29:05,639
objects read and write millions of objects across hundreds of tables once you say it's committed

300
00:29:05,639 --> 00:29:12,279
all those constraints must still be true okay if one of my constraints was the sum of all the

301
00:29:12,279 --> 00:29:20,839
columns in this a in the price field is less than 100 that should still be true if I said all the

302
00:29:20,839 --> 00:29:26,279
column A should add up to be a million and exactly be a million and lots of changes happened to

303
00:29:26,279 --> 00:29:33,559
different values in that column 8 that should still hold true that sum should still be a

304
00:29:33,559 --> 00:29:37,879
million at the end of it and I've specified that through my constraint that should still hold true

305
00:29:38,840 --> 00:29:45,320
okay now the transaction management is not going to do anything different as you'll see

306
00:29:45,320 --> 00:29:51,400
we just have to make sure that the atomicity holds the AID components hold and constraint

307
00:29:51,400 --> 00:29:56,600
consistency will just get taken care of right we don't mess that up so that's why it sees kind of

308
00:29:56,600 --> 00:30:00,840
like plugged into this asset stuff the transaction mechanisms we'll talk about today in the next

309
00:30:00,840 --> 00:30:05,720
two lectures I'm going to directly address see it's the responsibility of the application programmer

310
00:30:05,720 --> 00:30:12,920
to define those constraints correctly to make matters even more confusing a little while back close

311
00:30:12,920 --> 00:30:21,000
to a decade ago there's all this excitement about this thing called eventual consistency even though

312
00:30:21,000 --> 00:30:24,759
it has a word consistency it has nothing to do with the consistency that we just defined here as a

313
00:30:24,759 --> 00:30:31,640
C in asset that consistency was a model saying oh this transactions are hard in distributed systems

314
00:30:31,800 --> 00:30:35,560
it becomes very tough to do that though now we have figured things out and how to do things in

315
00:30:35,560 --> 00:30:40,920
distributed systems well too but that time when people were building these systems and largely

316
00:30:40,920 --> 00:30:44,840
the systems were being built by people who hadn't taken the database course that was the problem

317
00:30:45,480 --> 00:30:49,880
they said the best way we can make this happen is to be eventually consistent so let the changes

318
00:30:49,880 --> 00:30:56,840
happen and then eventually if A two transactions made changes to A eventually they would be the same

319
00:30:56,839 --> 00:31:01,879
so if that $25 withdrawal from two accounts happening simultaneously it's like eventually they

320
00:31:01,879 --> 00:31:07,319
will end up to be 50 but for a while even though both have been paid $25 you read the value you will

321
00:31:07,319 --> 00:31:13,799
see 75 so the eventual consistency model is don't trust the value eventually it will be right but the

322
00:31:13,799 --> 00:31:18,679
question from the application perspective is how long do I have to wait for it and how do I know

323
00:31:18,679 --> 00:31:23,480
when something is right or not and there were early days when people were building these

324
00:31:23,480 --> 00:31:27,960
applications with the eventual consistency where you have your Facebook app you'd post a message

325
00:31:28,599 --> 00:31:33,000
and your friend would see it you would refresh here and it would be gone because eventually it

326
00:31:33,000 --> 00:31:37,319
would be there but it just fetched from a different server that hadn't gotten your message right

327
00:31:37,319 --> 00:31:41,480
your first connection was made to server one second connection for refresh went to something else

328
00:31:41,480 --> 00:31:46,680
it hasn't gotten the update so as you can imagine that became very hard for application programmers

329
00:31:46,680 --> 00:31:51,640
to do the whole point of having database systems or data platforms deal with transactions

330
00:31:51,640 --> 00:31:57,720
is so i as an application programmer don't have to deal with it so it's now universally accepted

331
00:31:57,720 --> 00:32:02,680
that it's a pretty bad idea unless there's you've got very strict requirements for performance that

332
00:32:02,680 --> 00:32:09,080
require you to do nothing but just that okay but it is not the go-to way to build data platforms by

333
00:32:09,080 --> 00:32:16,920
saying you the application person start worrying about transactions the bunch of systems still use

334
00:32:16,920 --> 00:32:23,160
eventual such but i'll briefly flash the standard paper which globally is using things that are

335
00:32:23,160 --> 00:32:28,279
even stronger than acid and then again if you take the advanced database class we talk about stuff

336
00:32:28,279 --> 00:32:33,800
like that over there is there so it's not that systems don't use that today i'm just saying

337
00:32:34,360 --> 00:32:39,560
in my view it's not a good idea to use that as a default way to build a data platform there's still

338
00:32:39,560 --> 00:32:43,320
some reasons why you may want to do that but it's not the way you should say i'm going to make my

339
00:32:43,319 --> 00:32:48,839
database by design eventual consistency because i didn't think of doing other ways of doing full

340
00:32:48,839 --> 00:32:53,000
transactions their performance obviously you can get more performance with eventual consistency let's

341
00:32:53,000 --> 00:33:00,200
know down about that close my ears everyone close their ears now basically the question is like

342
00:33:03,000 --> 00:33:08,279
eventual consistency says eventually all the values will be the right values so it will feel like

343
00:33:08,279 --> 00:33:12,039
you got your transactions but for a while you may see inconsistent values so that's what eventual

344
00:33:12,039 --> 00:33:17,960
consistency is so an application gets there like it's between the view hasn't much to run yeah as

345
00:33:17,960 --> 00:33:22,839
i said you may see 75 per a while when it should be 50 both of you are you're standing next to each

346
00:33:22,839 --> 00:33:28,519
other on two side by side ATM machines both of you got your 25 bucks and you will say oops 75 is

347
00:33:28,519 --> 00:33:33,240
in the bank which is not true and the bank will say you know what it was actually 50 we sent you

348
00:33:33,240 --> 00:33:38,039
that eventually it will be the right amount right but as you can see it's hard right you don't want

349
00:33:38,039 --> 00:33:47,879
that in your application yep another another question no there are the dynamo has eventual

350
00:33:47,879 --> 00:33:59,000
consistency other systems to have eventual consistency models put this term out yes but but

351
00:33:59,000 --> 00:34:04,039
there there was a whole time where people were saying we don't need sequel we don't need transactions

352
00:34:04,039 --> 00:34:10,519
no sequel eventual consistency that hasn't quite worked out for those people okay so i'm not

353
00:34:10,519 --> 00:34:14,759
saying there's no fault for eventual consistency i'm saying that's not what you should design for

354
00:34:14,759 --> 00:34:18,519
by default unless you know what you're getting into and now you're going to have to put the

355
00:34:18,519 --> 00:34:25,159
complexity in the application okay so there is still some place for it but not like that's not the

356
00:34:25,159 --> 00:34:34,440
default setting so all right let's go find my mouse again there we go all right so isolation of

357
00:34:34,440 --> 00:34:39,399
transactions so we are still on i use submit transaction each transaction executes as if it is running

358
00:34:39,399 --> 00:34:45,079
by itself and obviously an easier programming model as we talked about and the dbms it's going to

359
00:34:45,079 --> 00:34:53,480
do its stuff to give this one at a time or isolation as a principle so how does it do that

360
00:34:53,639 --> 00:34:59,880
there are two classes of methods and again today i'm just going to outline it at a high level we'll

361
00:34:59,880 --> 00:35:05,639
get into the details of it in the next lecture the two classes one is pessimistic which is to say

362
00:35:06,519 --> 00:35:10,840
even before i let a read and write happen i'm going to be pessimistic if i think something bad

363
00:35:10,840 --> 00:35:15,000
is going to happen i'm going to hold you back hold you that transaction that i think is going to start

364
00:35:15,000 --> 00:35:19,880
this bad action back okay and we'll see how that happens in a little bit with with a couple of

365
00:35:19,880 --> 00:35:30,920
mechanisms the second way is basically to do something called optimistic concurrence which is to

366
00:35:30,920 --> 00:35:37,079
say i think every life is good i'm going to let every transaction go through i'll still provide the

367
00:35:37,079 --> 00:35:42,440
isolation principle so that they don't interfere with each other but i'm going to do that by checking

368
00:35:42,440 --> 00:35:46,360
assuming everything is going to go well so it's like everyone go to your reads and writes i'll keep

369
00:35:46,360 --> 00:35:50,920
track off it go make your changes but before you're ready to commit i will do some checks to see if

370
00:35:50,920 --> 00:35:54,920
you guys interfere with each other all of you guys all of you transactions that we're running together

371
00:35:54,920 --> 00:36:01,000
simultaneously so optimistic says most transactions don't conflict with each other so i can get a

372
00:36:01,000 --> 00:36:07,079
higher performance system by being optimistic that most things will work out it will still be correct

373
00:36:07,079 --> 00:36:14,519
so to make sure bad things don't happen which is a different philosophy okay all right so

374
00:36:16,519 --> 00:36:24,440
let's start digging into a couple examples now as we know transactions are going to be

375
00:36:24,920 --> 00:36:29,720
cast in terms of these read write operations and now you're starting to see some of the big in

376
00:36:29,720 --> 00:36:35,000
and commit calls that are coming in so t1 is a transaction that subtracted that moving $100

377
00:36:35,000 --> 00:36:41,880
from bank account a to bank account b and t2 is a transaction that's adding 6% interest to all the

378
00:36:41,880 --> 00:36:48,360
bank accounts and assume this is a small bank so it just has two bank accounts okay also keeps the

379
00:36:48,360 --> 00:36:55,880
examples and what's the possible outcome of running these two the two possible outcomes one is

380
00:36:57,640 --> 00:37:06,519
assume both a and b start with $1,000 if i run a followed by b or b followed by a i'm going to get

381
00:37:06,599 --> 00:37:16,519
two different execution strategies but eventually a plus b should be 2000 and 6% of that means that

382
00:37:16,519 --> 00:37:25,960
the total bank account across those two banks should be 2120 right so that's what we want to end up

383
00:37:25,960 --> 00:37:35,159
now what we are going to look at next i'm just going to jump into this is with just these two

384
00:37:35,159 --> 00:37:42,279
transactions i could have a correct isolation property being held by either running the first

385
00:37:42,279 --> 00:37:47,879
transaction first and running the second transaction first right there two possible outcomes t1

386
00:37:47,879 --> 00:37:54,839
runs first followed by t2 or vice versa and so here you can see one example where the value of a

387
00:37:55,559 --> 00:38:01,879
is 950 for and b is 166 that will correspond to having done the $100 transfer first then adding

388
00:38:01,880 --> 00:38:08,599
6% and the other one is doing it the other way around okay so either one of those by the isolation

389
00:38:08,599 --> 00:38:13,800
principle is correct if both transactions are in the system at the same time we are okay we as a

390
00:38:13,800 --> 00:38:19,160
transaction management system are okay in picking that order so let's just look at it more visually

391
00:38:19,160 --> 00:38:25,400
and that might make sense this is notion of a serial execution and the serial execution diagram that

392
00:38:25,400 --> 00:38:32,039
we'll see in the next 10 of 15 slides all are going to have time going from top to the bottom so

393
00:38:32,039 --> 00:38:37,960
imagine you are the machine and you're watching transactions come at you and isolation basically

394
00:38:37,960 --> 00:38:44,840
says if this execution is such that you can show me prove to me that no matter what you do whichever

395
00:38:44,840 --> 00:38:48,840
order you allow the transaction it feels like one happened before the other and that one happened

396
00:38:48,840 --> 00:38:54,039
before the other could be all of t1 happened followed by t2 in this case which is the example on the

397
00:38:54,039 --> 00:39:00,599
lap which is when you end up with a is equal to 954 and b is 1166 or t2 followed by that both of them

398
00:39:00,599 --> 00:39:05,960
are correct but if you are going to interleave these reads and writes for these two transactions the

399
00:39:05,960 --> 00:39:13,239
database better end up with one of these two correct end states which one doesn't matter but it should

400
00:39:13,239 --> 00:39:19,880
be one of those two not not something else question why we love to do to do exactly

401
00:39:19,960 --> 00:39:27,800
obviously this is like an example but like it would be like one of them would have a service right

402
00:39:27,800 --> 00:39:31,640
no that's a whole point so the question is why are we doing this in parallel that's the whole point

403
00:39:32,280 --> 00:39:36,920
right now this is serial execution so t1 is happening after t2 in time but what you want to do is to

404
00:39:37,480 --> 00:39:43,320
imagine I've got two cores in this server and today servers have 40 cores and database machines

405
00:39:43,320 --> 00:39:47,400
sometimes have hundreds of machines I don't want to be just running one transaction at a time I want

406
00:39:47,400 --> 00:39:52,599
to be able to do as many actions at any given point in time I want to do as many things as possible

407
00:39:53,320 --> 00:39:57,240
right because I want to use all the hardware I have access to that way I can get more transactions

408
00:39:57,240 --> 00:40:02,440
in the system higher throughput and lower latency potentially basically lowering the

409
00:40:03,639 --> 00:40:07,960
no no no we will not lower the standard so hold on we will not lower the standard we are

410
00:40:08,599 --> 00:40:15,240
definitely changing the standard a little bit to say any permutation of t1 followed by t2 is

411
00:40:15,239 --> 00:40:21,559
allowed t2 t1 and t2 can be interchange as long as we can prove one did all of its work before

412
00:40:21,559 --> 00:40:26,599
the other so hold on for two slides you're right it's like why is that not only one possible way

413
00:40:26,599 --> 00:40:32,679
that t1 should be followed by t2 if we did that then we would allow less parallelism in the system

414
00:40:32,679 --> 00:40:38,039
okay so you're going to relax the strict nosing of what is correct and this is where there's this

415
00:40:38,039 --> 00:40:45,880
notion of strict serializable which will say the transactions should feel like they retard in the

416
00:40:45,880 --> 00:40:50,840
way in which they happen in the physical world we'll talk about that in the next class a little bit

417
00:40:50,840 --> 00:40:56,119
and we'll talk about it a lot more in the advanced database class okay first let's get a little bit

418
00:40:56,119 --> 00:41:02,039
right and this is by the way what most database systems do today they will take this slight liberty

419
00:41:02,039 --> 00:41:06,119
of rechanging it because it's also like t1 and t2 issued at the same time what does it even mean

420
00:41:06,119 --> 00:41:10,759
for it to be issued at the same time there may be in different cities if you're sitting next to each

421
00:41:10,759 --> 00:41:14,920
of this not as if you would be pressing the button exactly at the same second because that doesn't

422
00:41:14,920 --> 00:41:19,400
happen right so it's like what does simultaneous mean so we're going to be a little bit more relaxed

423
00:41:19,400 --> 00:41:24,839
all we have is to say for us to be have this proper isolation the final values should be one of

424
00:41:24,839 --> 00:41:33,319
these two not a third value look at this slide here first yep so here t t1 starts and does its

425
00:41:33,320 --> 00:41:39,960
subtraction of 100 so now a has the hundred dollars already removed t2 starts and gives 6%

426
00:41:39,960 --> 00:41:46,760
interest to the two bank accounts but the bank account value for a that it is looking at is a

427
00:41:46,760 --> 00:41:53,160
hundred dollar short and so it ends up with a value of 2114 as a sum total which is six dollars

428
00:41:53,160 --> 00:41:59,080
off from what that original about should be okay so what we want to allow is these two the

429
00:41:59,079 --> 00:42:03,880
interleaving in the previous slide that is safe where you end up with the correct value even though

430
00:42:03,880 --> 00:42:08,920
there's interleaving but this is an example of an unsafe interleaving where you ended up with the

431
00:42:08,920 --> 00:42:17,079
wrong value right so this is fine sorry I was here on the wrong slide here this is fine and the

432
00:42:17,079 --> 00:42:22,360
question is how do we determine that this is okay this type of interleaving of actions across

433
00:42:22,360 --> 00:42:29,960
different transactions is okay but this one is not okay so let's look at how we go about doing that

434
00:42:29,960 --> 00:42:36,519
so this is form and notion of serial schedule that says a schedule that does not interleave any of

435
00:42:36,519 --> 00:42:41,720
the actions so we saw that right a serial example of a serial schedule was one where you just had

436
00:42:42,599 --> 00:42:49,720
all the t1s like here is a serial schedule if we go back this is serial schedule t1 followed by t2

437
00:42:49,799 --> 00:42:58,839
or t2 followed by t1 okay now the thing that we are trying to get to the hardware part is an

438
00:42:58,839 --> 00:43:09,159
equivalent schedule so here was a schedule that we saw that was correct it is not serial but as we

439
00:43:09,159 --> 00:43:16,679
will see this is correct and we want to look at this schedule and say the one on the left is

440
00:43:16,679 --> 00:43:22,039
equivalent to the serial schedule on the right we want to be able to show that happens and in which

441
00:43:22,039 --> 00:43:27,960
case we will say that schedule is safe and that's allowed so the notion of equivalent schedule says

442
00:43:27,960 --> 00:43:32,919
allow some interleaving and as long as you can prove that this interleaving is safe

443
00:43:34,519 --> 00:43:39,639
and the proof of safety is going to be by saying all these actions are equivalent to some

444
00:43:39,639 --> 00:43:46,119
serial schedule in this case one of those two t1 followed by t2 or t2 followed by t1 you are okay you

445
00:43:46,119 --> 00:43:52,679
will end up with the correct answer okay so it sounds like magic but there's a very simple way to go

446
00:43:53,960 --> 00:43:59,000
figure that out and this is the part that you were asking about it's like okay but why are the two

447
00:43:59,000 --> 00:44:03,960
correct states of the database and that's really what we are relaxing a little bit in this notion of

448
00:44:03,960 --> 00:44:08,440
serializable and as I said this is social of strict serializable where that real world effect is taken

449
00:44:08,440 --> 00:44:14,440
into place and it's stricter but for the purpose of this class we are going to work with this notion

450
00:44:14,440 --> 00:44:19,240
that we just have to prove it equivalent to one of the many equivalent serial schedules and if you

451
00:44:19,240 --> 00:44:24,679
have two transactions there are only two possible outcomes if there were three t1 t2 t3 it could be

452
00:44:25,320 --> 00:44:30,119
first transaction could be either one of those there are three possible combinations then two

453
00:44:30,119 --> 00:44:36,840
then one right so you you get that factorial effect we are going to think about these rewrites in terms

454
00:44:36,840 --> 00:44:43,720
of conflicting actions that can happen between these objects like the a's and the b's and the c's

455
00:44:44,599 --> 00:44:51,320
so we are going to have we call these things anomalies and there are three different types

456
00:44:51,320 --> 00:44:58,519
a read could interfere with a transaction reads an object and something else writes to it or a

457
00:44:58,519 --> 00:45:04,840
transaction writes an object and someone else reads that object the third one is two transaction one

458
00:45:04,840 --> 00:45:09,480
writes to an object and the other transaction also writes to that object what is missing from this

459
00:45:09,480 --> 00:45:14,360
combination is read read right which is obviously not a conflict if I am just reading this two

460
00:45:14,360 --> 00:45:18,679
transactions if I have just got a copy that's read only many transactions could read it you are not

461
00:45:18,679 --> 00:45:24,920
going to conflict with each other right it's a read only copy all right so let's take these read

462
00:45:24,920 --> 00:45:33,480
write conflicts and go look at that here is the schedule in which there is a read of an object a

463
00:45:33,480 --> 00:45:40,440
followed by a write of an object a as these actions got interleaved and so that would be an

464
00:45:40,440 --> 00:45:48,599
example of a read write conflict there are other conflicts in the schedule too but what's the

465
00:45:48,599 --> 00:45:57,800
downside of this read write object conflict transaction one read the value a t2 ran and then t1

466
00:45:57,800 --> 00:46:04,360
reads that value and got a different value right so it was 10 to 4 t2 made it 19 t1 reads it again

467
00:46:04,360 --> 00:46:08,920
and obviously it is not seen the isolation principle right in the same transaction if I read the

468
00:46:08,920 --> 00:46:14,280
value twice I should see the same value unless someone else interfered with me so it violates the

469
00:46:14,280 --> 00:46:26,840
isolation principle and so this is bad okay all right let's look at the and so that's called

470
00:46:26,840 --> 00:46:31,240
unrepeatable read because when you have a read write conflict same transaction reads the value twice

471
00:46:31,240 --> 00:46:38,039
is going to see different values a dirty read is a reader value let's say this 10 write it to be 12

472
00:46:38,600 --> 00:46:45,160
someone else reads the value which is 12 so far no problem but what happens a little bit later

473
00:46:45,160 --> 00:46:50,760
is that transaction t1 the bots and when transaction t1 the bots that value 12 should never have been read

474
00:46:50,760 --> 00:46:54,840
because it didn't get committed to the database it was an intermediate value which is getting thrown

475
00:46:54,840 --> 00:47:01,720
away right that's what the bot should do and so now transaction t2 when it was reading the value a

476
00:47:01,720 --> 00:47:07,320
read a dirty value which should have never been in the database because of that a bot so that's

477
00:47:07,320 --> 00:47:17,000
called a dirty read right a write write conflict is t1 is writing a value t2 is also writing that

478
00:47:17,000 --> 00:47:27,239
value and when t1 writes another value b t1 it feels like it's writing $10 imagine a and b are now

479
00:47:27,239 --> 00:47:35,719
columns and it's updating a record where dollar 10 is in Alice's account and its column 1 is 10 the

480
00:47:35,719 --> 00:47:42,199
account yeah amount and b is the name of the person it thinks it's adding 10 to Alice but the

481
00:47:42,199 --> 00:47:48,119
other conflict over there is writing to that same record 19 and Bob so you have 10 in there 19

482
00:47:48,119 --> 00:47:54,839
and Bob got written to that same record and then you have this Alice beat that is written that update

483
00:47:54,839 --> 00:48:01,399
of 19 and Bob just got overwritten so transaction 2 did its work but its values just got overwritten

484
00:48:01,399 --> 00:48:10,919
so it lost its update it never got made it made it to the database okay so the we'll use these

485
00:48:10,920 --> 00:48:19,880
properties to then define how to go make this equivalent schedule work the two types of

486
00:48:21,079 --> 00:48:26,760
serializability conflict serializability which we'll talk about next something called view serializability

487
00:48:26,760 --> 00:48:30,599
since we are running out of time I might just totally go skip that piece but I'll briefly

488
00:48:30,599 --> 00:48:36,680
allude to what that does okay won't grill you with exam questions on view serializability okay so

489
00:48:36,759 --> 00:48:41,480
it's okay if you don't totally get that conflict serializability is what database systems implement

490
00:48:41,480 --> 00:48:47,480
and let's just jump into that then let me just go with this graph form here to make it even more

491
00:48:47,480 --> 00:48:52,679
easier to understand so what we'll do is the following we'll take operations that we have

492
00:48:53,719 --> 00:49:00,919
and here's the schedule that we have we will start going through that and enumerate all possible

493
00:49:00,920 --> 00:49:08,840
conflicts read right right right and right read okay those three conflicts we'll create a graph

494
00:49:08,840 --> 00:49:14,039
called the dependence graph so I've got two nodes in that graph t1 and t2 every time a transaction

495
00:49:14,039 --> 00:49:18,360
comes in a new node will be added so the graph will have as many transactions that are active in the

496
00:49:18,360 --> 00:49:25,000
system at any point in time now I'll just start going through the schedule and start marking all the

497
00:49:25,000 --> 00:49:32,599
conflicts and I start with the first conflict that I see which is a read right doesn't matter what

498
00:49:32,599 --> 00:49:37,719
the conflict is as soon as I have one of those three types of conflict read right right right or

499
00:49:37,719 --> 00:49:46,920
right read I'm going to put an arrow there so the first conflict a is on the subject a and it goes

500
00:49:46,920 --> 00:49:54,119
from t1 to t2 because t1 happens before t2 in the schedule right so I'll draw a directed arc from

501
00:49:54,119 --> 00:50:02,039
t1 to t2 okay does that make sense so really simple I'm going to just walk through this for every

502
00:50:02,039 --> 00:50:06,679
conflict that I have I'll draw a directed graph in the order in which this conflict is happening

503
00:50:08,519 --> 00:50:18,039
right now I go and find the next conflict which is this right followed by read and I will do that

504
00:50:18,599 --> 00:50:29,800
so the proof is really simple you take a schedule if you walk through it and draw a line for every

505
00:50:30,759 --> 00:50:39,719
read right right right or right read conflict and if it there's a cycle in that graph you have a

506
00:50:39,719 --> 00:50:47,400
bad schedule that schedule will violate the isolation principle that schedule should never have been

507
00:50:47,400 --> 00:50:52,680
allowed to run in the database system in the next class we'll see mechanisms that you can use

508
00:50:52,680 --> 00:50:58,599
to prevent that from ever happening okay does that make sense if you didn't get anything else because

509
00:50:58,599 --> 00:51:02,920
of that bug in the slide that's the main thing I want you to get from this isolation principle

510
00:51:05,960 --> 00:51:11,800
the edges go in the time order see so look at the right followed by read the red line that is

511
00:51:11,800 --> 00:51:18,519
shown here right now it's going from t1 to t2 right the read the right in a happened before the

512
00:51:18,519 --> 00:51:26,680
read in t2 so I will draw a directed line from t1 to t2 saying some action in t1 happens before

513
00:51:26,680 --> 00:51:32,760
the action in t2 which means t2 better not do stuff that is the other way around because now

514
00:51:32,760 --> 00:51:39,080
I've got a contradictory state that I'm going to end up with okay so the serial schedule is a

515
00:51:40,039 --> 00:51:44,599
the time on the left side is the order in which the databases see those actions and it's going to

516
00:51:44,599 --> 00:51:49,639
construct this graph and what we'll see in the next classes the minute it starts to say this second

517
00:51:49,639 --> 00:51:55,719
stuff which is going to cause this art to complete it'll stop it won't let it will basically not let

518
00:51:55,719 --> 00:52:01,319
this thing proceed beyond the right of v because it says if I allow this right to happen this

519
00:52:01,319 --> 00:52:07,400
art to form I will have a conflict so this line it will pause that it will stop transaction t1

520
00:52:07,400 --> 00:52:16,360
from proceeding with the techniques we'll talk about in the next class okay yep does it need to

521
00:52:16,360 --> 00:52:23,000
what yeah and then it may need to abort something or delay something so we'll we'll talk about that

522
00:52:23,000 --> 00:52:26,440
right so there are the sometimes where it may just say you know what I need to abort

523
00:52:27,480 --> 00:52:33,720
and I can't go any further all right so it's really that simple we will construct this graph

524
00:52:33,719 --> 00:52:40,519
and now we have this beautiful proof that says how do I have correct isolation property

525
00:52:41,959 --> 00:52:48,519
all right so here is three transactions just to show this in a slightly more complicated way

526
00:52:50,599 --> 00:52:56,039
as I walk down the first conflict is that read to write there are other conflicts in there there's

527
00:52:56,039 --> 00:53:02,039
a w a and t1 to read in a I'm not showing every possible conflict in there but both of them

528
00:53:02,039 --> 00:53:10,279
induce arc from t1 to t2 right it's just a hazard and then there are other conflicts but that will

529
00:53:10,279 --> 00:53:15,719
just redo that same line you don't have to redraw that line multiple types one arc is one arc is

530
00:53:15,719 --> 00:53:22,039
enough right that's all this is showing as you go further down we see another conflict from t2 to t1

531
00:53:23,000 --> 00:53:34,039
okay and that's all there is in here so this basically says in this schedule even though there's

532
00:53:34,039 --> 00:53:39,400
a bunch of interleaving going on between the three transactions this you can prove to be correct

533
00:53:40,920 --> 00:53:47,719
and can you guess what's the correct serial schedule look at the graph

534
00:53:48,039 --> 00:53:58,119
yeah it's going to be the order of that graph t2 it's like t2 happened first then t1 happened

535
00:53:58,919 --> 00:54:04,919
then t3 happened looks it's as if that was the serial order in which they were executed and we

536
00:54:04,919 --> 00:54:11,399
were just running one transaction at a time and that's the whole idea now if you get why this graph

537
00:54:11,399 --> 00:54:14,839
makes sense it's trivial but it took a little while for people to figure this out it wasn't that

538
00:54:14,840 --> 00:54:19,240
trivial and that's what's been you have these beautiful ideas are they seem simple only in retrospect

539
00:54:20,840 --> 00:54:26,760
okay so for ever everything I said with that bug in the slide this if you get it you understand

540
00:54:26,760 --> 00:54:42,600
how isolation works okay yep yeah and we'll talk about a bots and other kinds of special handling

541
00:54:42,599 --> 00:54:47,400
in there but what is true is that even before the about if you start to see a cycle you know you

542
00:54:47,400 --> 00:54:55,400
will end up in a bad situation so you need to stop it right because time is evolving I as the

543
00:54:55,400 --> 00:55:01,000
database transaction manager if I'm at this point in time and I've been told should I admit this

544
00:55:01,000 --> 00:55:05,880
read of B I have to make a decision if I'm the pessimistic transaction management system

545
00:55:05,880 --> 00:55:10,920
pessimistic isolation management if I I will have to decide whether to let that happen or not

546
00:55:10,920 --> 00:55:14,280
if I'm optimistic I'll say let it go and in the end I will figure out right so that's the

547
00:55:14,280 --> 00:55:20,920
difference between the pessimistic and the optimistic yep so is this going to be created before it

548
00:55:20,920 --> 00:55:25,320
happens or like it is being created while it's happening right so you can imagine something like

549
00:55:25,320 --> 00:55:32,360
this is happening in the system uh third step is run uh we start with the begin on p1 then read of

550
00:55:32,360 --> 00:55:38,760
a is done right of a is done systems is I can let you go then when the right of a comes system is say

551
00:55:38,760 --> 00:55:43,560
you know what I need to put an arc in this graph so as time is progressing these arcs are being done

552
00:55:43,560 --> 00:55:52,760
the uh region rights are being presented to the system at time evolves and that's the difference

553
00:55:52,760 --> 00:55:58,120
between the pessimistic method and the optimistic pessimistic will say first time I think there's a

554
00:55:58,120 --> 00:56:04,040
problem I'm going to stop you and we'll see how in the next class and optimistic says I'll let

555
00:56:04,040 --> 00:56:08,440
everything go but I know how to get you back to a safe place if bad things had happened okay

556
00:56:08,760 --> 00:56:14,600
this is not optimistic it's just saying how do I detect that something is good or bad

557
00:56:14,600 --> 00:56:24,600
but this is the mechanism yep if it is a cycle it is not okay how do I find the cycle when do I

558
00:56:24,600 --> 00:56:30,360
find the cycle is where the difference is do I find the cycle as soon as it is formed or do I find

559
00:56:30,360 --> 00:56:37,160
the cycle after I let everything go yeah so that's basically the whole theory of saying is this

560
00:56:37,159 --> 00:56:45,719
equivalent to that order or not so here is another example and this is where we are getting into this

561
00:56:45,719 --> 00:56:53,159
new serializability and kind of what is happening over here in here what's happening is A is getting

562
00:56:54,119 --> 00:57:00,039
10 dollars removed from it and there's a some that is being calculated that's getting printed out

563
00:57:00,039 --> 00:57:05,639
over here of course there are problems with this transaction because that one causes the arc from

564
00:57:05,639 --> 00:57:11,400
t1 to t2 and then you have this transaction so this is not serializable but if instead of

565
00:57:11,879 --> 00:57:16,759
the second transaction doing a sum of the two transactions if the code in there was only about

566
00:57:16,759 --> 00:57:21,960
saying find the number of transactions that have values account value is greater than 100 the fact

567
00:57:21,960 --> 00:57:27,639
that it is a cycle doesn't matter from the semantics of that second transaction at a very high level

568
00:57:27,639 --> 00:57:32,679
that's what view serializability is it'll if you knew something about the semantics of what was

569
00:57:32,679 --> 00:57:37,960
happening you will admit a few more types of schedules that you would not otherwise and as I said

570
00:57:37,960 --> 00:57:43,079
that's all I want you to know for this class if you didn't get that that's okay let it go we're not

571
00:57:43,079 --> 00:57:48,839
going to talk too much about view serializability it will just allow certain types of cycles because

572
00:57:48,839 --> 00:57:54,599
it says I think the application is okay all right and there's a formal definition of it if you're

573
00:57:54,599 --> 00:58:00,359
interested in looking at it in terms of what it allows it basically allows a few more schedules

574
00:58:00,360 --> 00:58:05,800
than a strictly serial schedule will allow all right so config serializability is the main thing

575
00:58:05,800 --> 00:58:14,200
that we want you to know about all right pictorially here's the universal all possible schedules

576
00:58:14,200 --> 00:58:20,120
including the bad ones the ones we don't want to happen sorry serial schedule is that strict

577
00:58:20,120 --> 00:58:24,039
serial stuff which we talked about even followed by t2 and that's the only thing that allow

578
00:58:24,039 --> 00:58:29,000
config serializable is if we are allowing a few more combinations and view serializable is where

579
00:58:29,000 --> 00:58:35,880
you might have a little bit more by way of this application performance okay and there are many more

580
00:58:35,880 --> 00:58:40,760
layers in there and we'll uncover some of those in later classes and again a lot more in the detail

581
00:58:40,760 --> 00:58:46,840
class so we still have one more letter to cover which is the d which is the durability right we did

582
00:58:46,840 --> 00:58:53,000
atomicity consistency isolation which is where we spend most of the time today and the last one is

583
00:58:53,000 --> 00:59:00,199
durability which will cover really fast durability we have a full lecture coming on it on this in

584
00:59:00,199 --> 00:59:08,920
took the second class from now which is about making sure that the changes that we make to the system

585
00:59:08,920 --> 00:59:15,480
we're making changes to A's the B's and the C's and stuff like that just in memory right if you're

586
00:59:15,480 --> 00:59:21,960
updating a column value or a record that's sitting in the buffer pool but what happens if you have a

587
00:59:21,960 --> 00:59:28,119
power loss and memory is volatile so those changes never made it to this but you might have committed

588
00:59:28,119 --> 00:59:36,440
that transaction so durability is the aspect that says if the database commits a transaction oh by the

589
00:59:36,440 --> 00:59:41,960
way the database is allowed to use a buffer pool because that's an efficient way to build data processing

590
00:59:41,960 --> 00:59:46,519
systems right you don't want to go to disk every time you want a buffer pool because buffer pool

591
00:59:46,519 --> 00:59:51,960
accessing data in buffer pool is just so much faster than accessing things on this but if the

592
00:59:51,960 --> 00:59:58,360
database is it's committed you want to make sure that if there's power failure you can get the

593
00:59:58,360 --> 01:00:04,360
right values in the database so durability will do that by making sure when the commit happens

594
01:00:05,000 --> 01:00:10,039
it's going to make sure certain things get written to disk and it'll try to do very small amounts

595
01:00:10,039 --> 01:00:17,000
of forced right to disk so that it can provide this durability property okay and as I said in

596
01:00:17,000 --> 01:00:22,119
two lectures from now we'll talk about that so that's basically what acid looks like

597
01:00:24,759 --> 01:00:31,239
yeah we can talk about that offline the answer is the principles will probably apply is like I

598
01:00:31,239 --> 01:00:36,599
have volatile storage and non-volatile storage and I can apply this principle of durability across

599
01:00:36,599 --> 01:00:44,039
any of those systems yeah yeah the same principles to apply yep the logs sorry

600
01:00:46,519 --> 01:00:50,759
yeah the logs will be kept in memory we'll get to that in two lectures from now the log records

601
01:00:50,759 --> 01:00:55,319
that we create will be kept in memory too but at appropriate times we will actually flush them out

602
01:00:55,319 --> 01:01:01,880
to disk to guarantee the durability property so what happens is we we'll talk about that what happens

603
01:01:01,880 --> 01:01:06,680
if the log fails that's the whole lecture two lectures from now it's a full lecture I can give you

604
01:01:06,680 --> 01:01:12,519
a 10 second answer the 10 second answer is that we will make sure that absolutely what must be written

605
01:01:12,519 --> 01:01:17,400
to disk is written and if we write the wrong thing we will look at the value and undo if we need to

606
01:01:17,400 --> 01:01:21,720
we'll do one of two things with stuff we write on disk either redo the operation because it's

607
01:01:21,720 --> 01:01:26,440
inconsistent with what was in memory or undo it because we wrote something that we should not have

608
01:01:26,440 --> 01:01:34,119
written okay so we'll do we do an undoologic on on those okay so here's the conclusions

609
01:01:35,079 --> 01:01:39,559
concurrency control and recovery amongst the most important functions the transactions are super

610
01:01:39,559 --> 01:01:45,240
important that's a put a social definition component of database systems and if you go back to

611
01:01:45,240 --> 01:01:50,360
the early days of database systems that's why they started getting adopted in enterprises because

612
01:01:50,360 --> 01:01:55,720
they allowed all this record keeping now I need five minutes to go over a couple things but

613
01:01:55,720 --> 01:02:01,880
before that we've talked about this a few times that there are there's still a lot more things you

614
01:02:01,880 --> 01:02:06,840
can do with transactions this is breakthrough paper that came out from Google called stanner by the

615
01:02:06,840 --> 01:02:11,079
way before that they were doing eventual consistency stuff in many parts and they realized wow

616
01:02:11,079 --> 01:02:16,680
application programmers can't quite do that so they actually build a very hard thing which is a

617
01:02:16,679 --> 01:02:21,960
globally distributed system that can do transactions whether transactions could be touching objects

618
01:02:22,759 --> 01:02:27,559
in their database which is distributed so it might touch an object in London touch an object in

619
01:02:27,559 --> 01:02:34,519
the US and commit that transaction across the globe as one transaction and do that fast and efficiently

620
01:02:34,519 --> 01:02:39,799
and the reason they did that is if they kept the eventual consistency stuff all kinds of application

621
01:02:39,799 --> 01:02:44,440
programmer bugs were showing up like the ad system would report wrong things it would tell

622
01:02:44,440 --> 01:02:49,240
the same advertiser proctor and gamble for example in London this is how many impressions we showed

623
01:02:49,240 --> 01:02:53,320
and the same campaign in US would show a different number and these two guys get on the phone and say

624
01:02:53,320 --> 01:02:57,880
what are exasperating what impressions it would be really show you want that answer to be precise

625
01:02:57,880 --> 01:03:02,760
for someone's paying money for it that was one of the big reasons why they invented that it's a

626
01:03:02,760 --> 01:03:08,519
beautiful system requires atomic clocks where you need satellite sinking across the data centers so

627
01:03:08,519 --> 01:03:14,280
that the two clocks are not out of sync cockroach DB was formed by people from Google who

628
01:03:15,239 --> 01:03:20,440
worked on this and have a version of it that doesn't require satellite clocks but the fascinating

629
01:03:20,440 --> 01:03:25,639
field there's still a lot of new things that are happening bonus time I leave this link in the

630
01:03:25,639 --> 01:03:30,599
slides if you want to we've talked about all kinds of different models and levels of consistency but

631
01:03:30,599 --> 01:03:34,840
there's a lot more and you can play around with that chart but I want to spend a couple minutes on

632
01:03:35,559 --> 01:03:43,240
project 3 which is on query execution and the overview of this project is we essentially have

633
01:03:45,240 --> 01:03:49,960
these are the different components of bus stop as you've gotten to know and love over time project

634
01:03:49,960 --> 01:03:55,720
3 is related to the optimizer and the query execution and project 4 that's coming will be

635
01:03:55,720 --> 01:04:01,240
query execution in the transaction management piece okay so what is project 3 you're going to

636
01:04:01,719 --> 01:04:09,399
add access methods two different access methods sequential scan and index scan you will also do insert

637
01:04:09,399 --> 01:04:13,719
delete and updates so these are the operator stuff that you're going to add you're going to add

638
01:04:13,719 --> 01:04:19,959
these as new operators that are in the system two different types of joints nested loops join

639
01:04:19,959 --> 01:04:26,039
and hash join and there's some miscellaneous window aggregation function limit sort and top

640
01:04:27,000 --> 01:04:34,199
you'll also touch the optimizer so there's already an optimizer in bus stop and to convert a query

641
01:04:34,199 --> 01:04:39,239
if a query has both an order by an limit you can convert it to a with a simple transformation

642
01:04:39,239 --> 01:04:44,039
into a top-k query right so that'll give you a chance to look at how do optimizers work

643
01:04:44,840 --> 01:04:49,159
if you see a nested loops that's often a bad idea so in the optimizer you will write a rule

644
01:04:49,159 --> 01:04:54,599
to convert nested loops to hash join okay because those are typically much faster and similarly

645
01:04:54,599 --> 01:04:59,639
with sequential scan to index scan if an index exists don't do a sequential scan go use an index scan

646
01:04:59,639 --> 01:05:04,839
these are think of it as the heuristic stuff that we talked about in the optimization stuff right not

647
01:05:04,839 --> 01:05:13,079
cost-based heuristics just rules based okay the leaderboard will require making deeper changes to

648
01:05:13,079 --> 01:05:17,559
the optimizer so even if you have awesome code from project 1 and project 2 you're guaranteed not

649
01:05:17,559 --> 01:05:22,679
to get good high stats on the leaderboard unless you go add new optimization rules and you

650
01:05:23,159 --> 01:05:27,960
that's all described in the project you'll be adding rules to winder aggregation and top-k

651
01:05:29,399 --> 01:05:35,079
quick tips start with the easy stuff the insert and sequential scan that's the easiest stuff get it

652
01:05:35,079 --> 01:05:46,279
right before you go do other things with it and the key thing is now you can actually go and run

653
01:05:46,280 --> 01:05:54,840
bus stop in uh in the browser so i'm going to close this here and whoops

654
01:05:58,200 --> 01:06:06,120
pit power point don't need that anymore and if you go look at bus stop now you can actually

655
01:06:07,080 --> 01:06:15,400
uh go and run bus stop in the browser let me go find the link here yep uh

656
01:06:15,400 --> 01:06:21,160
she who's just an awesome programmer has written this version which completely runs in

657
01:06:21,160 --> 01:06:26,599
vassam code in the browser and it's already loaded with some tables in there and you can start to

658
01:06:26,599 --> 01:06:34,440
do things like uh select star uh from the mock table and do things like that whoops there's my

659
01:06:34,440 --> 01:06:40,119
semi colon and you can start to run stuff so you can use this to test if your code works our solution

660
01:06:40,119 --> 01:07:05,880
is sitting behind that yep yeah so the use this as a reference don't use grade scope as a way

661
01:07:05,880 --> 01:07:12,840
of doing your debugging write your tests others you will not do well in this project okay so hopefully

662
01:07:12,840 --> 01:07:16,680
it's a fun project start with the simple stuff it may seem like a lot start with the simple stuff

663
01:07:16,680 --> 01:07:21,960
it will be surprised how quickly you start knocking things off okay all right thank you tj shubham

664
01:07:21,960 --> 01:07:22,519
hit it

665
01:07:36,840 --> 01:07:39,640
You

666
01:07:57,079 --> 01:08:03,440
say i'm the poppee with the motherfucking hoppa 28 Shangri-Wok

667
01:08:03,440 --> 01:08:05,099
we gonna try to build a

668
01:08:05,099 --> 01:08:06,940
I smack you with the bottom of the cliff

669
01:08:06,940 --> 01:08:07,940
I'll tell you, little bug

670
01:08:07,940 --> 01:08:09,219
Show me what it's safe set

671
01:08:09,219 --> 01:08:10,539
For I blow your face back

672
01:08:10,539 --> 01:08:11,860
I got a block on tap

673
01:08:11,860 --> 01:08:13,299
The fets can't trace that

674
01:08:13,299 --> 01:08:14,860
Style is like tent for proof

675
01:08:14,860 --> 01:08:16,779
You can't lace that at the Dominican

676
01:08:16,779 --> 01:08:18,619
Oh you could call me Dominican

677
01:08:18,619 --> 01:08:20,019
Black Skelly, black, nothing

678
01:08:20,019 --> 01:08:21,260
Blacks, weight, dimmelings

679
01:08:21,260 --> 01:08:24,140
My poor black 38 is sent you to the perigates

680
01:08:24,140 --> 01:08:25,659
You get the zombie trying to skate

681
01:08:25,659 --> 01:08:26,859
And that's your first instinct

682
01:08:26,859 --> 01:08:28,220
I ain't lying for that cake

683
01:08:28,220 --> 01:08:29,420
You're famous, see you wait

684
01:08:29,420 --> 01:08:30,579
My grandson's happy wait

685
01:08:30,579 --> 01:08:31,739
The rant do every state

686
01:08:31,739 --> 01:08:33,059
When they acting how I'm living

687
01:08:33,059 --> 01:08:34,539
I tell them I'm living great

688
01:08:35,100 --> 01:08:36,539
I tell them I'm living great

689
01:08:36,539 --> 01:08:37,340
I tell them I'm living great

690
01:08:37,340 --> 01:08:38,539
I tell them I'm living great

691
01:08:38,539 --> 01:08:39,340
I tell them I'm living great

692
01:08:39,340 --> 01:08:40,340
I tell them I'm living great

693
01:08:40,340 --> 01:08:41,340
I tell them I'm living great

694
01:08:41,340 --> 01:08:42,340
I tell them I'm living great

695
01:08:42,340 --> 01:08:43,340
I tell them I'm living great

696
01:08:43,340 --> 01:08:44,340
I tell them I'm living great

697
01:08:44,340 --> 01:08:45,340
I tell them I'm living great

698
01:08:45,340 --> 01:08:46,340
I tell them I'm living great

699
01:08:46,340 --> 01:08:47,340
I tell them I'm living great

700
01:08:47,340 --> 01:08:48,340
I tell them I'm living great

701
01:08:48,340 --> 01:08:49,340
I tell them I'm living great

702
01:08:49,340 --> 01:08:50,340
I tell them I'm living great

703
01:08:50,340 --> 01:08:51,340
I tell them I'm living great

704
01:08:51,340 --> 01:08:52,340
I tell them I'm living great

705
01:08:52,340 --> 01:08:53,340
I tell them I'm living great

706
01:08:53,340 --> 01:08:54,340
I tell them I'm living great

707
01:08:54,340 --> 01:08:55,340
I tell them I'm living great

708
01:08:55,340 --> 01:08:56,340
I tell them I'm living great

709
01:08:56,340 --> 01:08:57,340
I tell them I'm living great

710
01:08:57,340 --> 01:08:58,340
I tell them I'm living great

711
01:08:58,340 --> 01:08:59,340
I tell them I'm living great

