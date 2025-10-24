---
title: CMU15445 P21F202320 DatabaseRecovery
---

1
00:00:00,000 --> 00:00:27,839
This is where we were at the last time.

2
00:00:27,839 --> 00:00:38,840
We were starting to look at the different logging schemes and looking at what we could do to what do we need to log to make the recovery protocols work.

3
00:00:38,840 --> 00:00:41,840
And there were three logging schemes.

4
00:00:41,840 --> 00:00:51,840
The one is physical logging, which you can say every time you make changes to a page, you will capture in the log the before and after image for the page.

5
00:00:51,840 --> 00:01:02,840
And one downside of that is that could get really large if there were logical moves of the records happening in the page just like rearrangements, the diff will be large even though the change that you made was really small.

6
00:01:02,840 --> 00:01:11,840
So the way around it might be to do some form of logical logging where you effectively say I'm going to log the operation that happened.

7
00:01:11,840 --> 00:01:16,840
And the simplest way of logical logging is to log the entire query that made the change.

8
00:01:16,840 --> 00:01:25,840
But of course, this means that when you want to apply the log, you have to read on the whole query and if that query was took a long time to run, you're going to have to do all of that stuff again.

9
00:01:25,840 --> 00:01:35,840
The preferred method at what systems use is called physiological logging and the way to understand that is this first line up over here.

10
00:01:35,840 --> 00:01:40,840
It is physical to a page and logical within a page.

11
00:01:40,840 --> 00:01:50,840
So imagine I've got a record that stands multiple pages, which can happen right records can span multiple pages and you made some changes to that record as a transaction.

12
00:01:50,840 --> 00:01:57,840
This means you updated one record, but you actually updated it bites across two pages in the database.

13
00:01:57,840 --> 00:02:07,840
So what you'll do in the physiological logging is you will create two logs one for each page. So every page gets a lock.

14
00:02:07,840 --> 00:02:17,840
So it's physical at that level, but within the page, you will use logical logging to simply say here is the slot number and within that slot number here, the bites that were changed in it.

15
00:02:17,840 --> 00:02:20,840
And so you get that best of both worlds.

16
00:02:20,840 --> 00:02:31,840
Okay, now of course that also applies when you have indices and stuff like that things get far more complicated with all of these components when you have indices in this course, we are going to ignore that.

17
00:02:31,840 --> 00:02:38,840
But again, if you're interested in that, I can recommend some papers and perhaps the best source for that would be Jim Gray and writers transaction book.

18
00:02:38,840 --> 00:02:44,840
And if you want, you can come and borrow it from me if you want to dig deeper into some of those issues.

19
00:02:44,840 --> 00:02:53,840
So physical versus logical locking, this is just re-trading what we've said is logical locking requires less amount of data to be written.

20
00:02:53,840 --> 00:02:57,840
So the logs are smaller. These logs occasionally will have to be flushed out to this.

21
00:02:57,840 --> 00:03:08,840
So having small things is better. It's difficult to implement recovery with a logical locking like imagine if I'm logging a query and have to undo the query.

22
00:03:08,840 --> 00:03:15,840
Now I really need an undo mechanism at some lower level, perhaps through version chaining and stuff like that to do that.

23
00:03:15,840 --> 00:03:29,840
So pure logical locking in the general case can become difficult in the case of a B tree turns out that if you want to do logical stuff within the B tree, it's not that hard because B trees have certain semantics as long as you preserve the semantics you're okay.

24
00:03:29,840 --> 00:03:35,840
So there are like not hard and fast rules, but you might actually use some combination for the purpose of this class.

25
00:03:35,840 --> 00:03:41,840
Just once you know the difference between these two and that and exactly what physiological logging means.

26
00:03:41,840 --> 00:03:47,840
Okay, so everyone clear in terms of what physiological locking means.

27
00:03:47,840 --> 00:03:49,840
Okay, all right.

28
00:03:49,840 --> 00:04:03,840
So last class I briefly mentioned that logging can sometimes be confused with does that mean using logging in a database system results in the log structured file system.

29
00:04:03,840 --> 00:04:14,840
No, when people say log structured file systems is just a different log different file organization, then a heap organization and you've seen that in the first half of the semester.

30
00:04:14,840 --> 00:04:31,840
However, there is a connection where if you look at log structured file systems, most of them will have something like a mem table, which is kept in memory where the changes are and eventually they will make it to the lower layers in the log structured file system, but for a little while.

31
00:04:31,840 --> 00:04:37,840
Actually data is simply going to sit in memory before it makes it right does that make sense.

32
00:04:37,839 --> 00:04:54,839
Now, if you wanted to protect changes that are happening in memory and we're doing logging and recovery to say that if I say something's written as the data platform and crashes of different types happen or failures of different types happen like we looked at earlier, we want to prevent that.

33
00:04:54,839 --> 00:05:08,839
So we imagine actually using recovery and logging mechanisms for the mem table stuff and being able to recover that so that you don't lose changes because a lot of this is related to saying I want to use an efficient mechanism to cash.

34
00:05:08,839 --> 00:05:18,839
We've looked at the buffer pool throughout this material for this lecture and we've said buffer pool is where you want to keep your data because that is fast, but it is volatile.

35
00:05:18,839 --> 00:05:36,839
And if a failure happens, you want to handle that volatile information correctly same thing with the mem table, so you could actually use all of these techniques for keeping the mem table safe past all of these types of failures that we talked about questions.

36
00:05:36,839 --> 00:05:47,839
Alright, I'm going to skip over the next two slides or skim through it really fast because we'll talk about checkpointing in great detail in the recovery component that we're going to start.

37
00:05:47,839 --> 00:06:05,839
So we are logging things we are following the right ahead logging protocol, which basically says anytime I flush a page from my buffer pool in memory to stable storage, non volatile storage, disk, those all terms are interchangeable.

38
00:06:05,839 --> 00:06:21,839
I will flush the logs before I flush the changes and at commit time I'm going to flush these commit log records to disk, but this right ahead log that we are creating is effectively a list of all the changes that we've ever made and that can grow really large.

39
00:06:21,839 --> 00:06:37,839
And so we use this mechanism called check pointing to help us with managing that log and if you did nothing for example let's say you started a database system get logging and logging it's a brand new system all the hardware was awesome, but after a year things started to fail.

40
00:06:37,839 --> 00:06:50,839
Now, unless you do something like checkpointing, we have to go and recover the system by replaying all the transactions through the log for a year that's too much right so we want to cap that amount of time that we need during recovery.

41
00:06:50,839 --> 00:07:03,839
So we'll use this mechanism called check pointing to get us to that point so things will still be correct without checkpointing but you're running to trouble with performance on recovery the recovery could take forever.

42
00:07:04,839 --> 00:07:25,839
So we'll talk about the different ways of doing check pointing next, but the main point is we're going to create a new log record, which is called a checkpoint record and as you'll see in a little bit we create a big and check point and an end check point record when we start doing something called fuzzy check pointing so that range of algorithms to make check pointing even better than a simple approach.

43
00:07:26,839 --> 00:07:53,839
And at a very high level for the simple way of doing check pointing we will pause all queries, flush all the logs to disk, flush all the modified pages to the disk to which is basically have everything in stable storage and then write the checkpoint now that's going to be very expensive if I've got a terabyte buffer pool and most of the pages were dirty this will the check pointing process itself could take a very long time so we look at ways in which we can make it better.

44
00:07:53,839 --> 00:08:02,839
But the general idea is this check pointing is used as a mechanism to make recovery go faster right it's not essential but without that you don't have a practical way to do database recovery.

45
00:08:04,839 --> 00:08:14,839
Okay so that's all we need for this class this is this is an example that just says you will go create this checkpoint will look at better examples of this in a little bit.

46
00:08:14,839 --> 00:08:34,839
But I do want to cover this last point before switching over to the recovery lecture which is there is an issue of saying how frequently do I take these checkpoints the checkpoint is going to do some work we try to make that work as small as possible but still going to do some work and you're going to pause the system for perhaps a very very small amount of time.

47
00:08:34,840 --> 00:09:03,840
But regardless it has to do IOs and stuff like that so the question is how frequently do you do checkpoint which means you're using the resources for making eventually this recovery go faster versus you know how long can you wait for this recovery process so sometimes there are requirements that say you know my system has to come back up from a failure within a minute and you can actually go and set up this checkpointing interval many database system most database systems have a way to say.

48
00:09:04,840 --> 00:09:24,840
How frequently do you take this checkpoint it may be every hour every day every week and you can then control what that recovery time is so the main point is database systems give you this parameter that lets you control different components of this checkpoint the most important one is the frequency with which you take this checkpoint.

49
00:09:25,840 --> 00:09:47,840
And that's all we'll talk about the checkpoint and setting that up just want you to be aware that you if you're ever running a database system you will have to ask yourself as to what's my tolerance to that recovery time because when the system is recovering noterunctions will be taken can be admitted and if you don't check point frequently enough then that recovery time could be very large.

50
00:09:47,840 --> 00:10:16,840
Alright so you're going to switch over to the material for today's talk and I feel pretty good today that if you interrupt me a lot I will still be alright so fire away today few announcements project for is on concurrency control that's a do you want to send the 10th and the second part is Andy is going to start teaching again the next week onwards so the last three lectures is going to be done.

51
00:10:17,840 --> 00:10:45,840
So this is going to teach so this probably the last time I'll see you this semester but I hope I see some of you especially if you are around the next semester and want to t a the database class so this class is going to get repeated next semester and I'm going to teach that and would love to get your help especially if you've done better in this class which I know everyone attending over here has and the one pitch I am hoping I'm taking notes so I have matched that stuff so so I think you guys are all good.

52
00:10:45,840 --> 00:11:14,840
I still don't know why so many people don't come to the classes which is like you know if you're paying this much tuition you know give the extra two hour 40 minutes for your investment of your time to learn this stuff so anyways I'll make a few changes next time perhaps to encourage people to come to class I've got a couple ideas but if you're a TA you can help me come up with some of those ideas the last yep extra credit for coming to class something like that probably is coming.

53
00:11:15,840 --> 00:11:44,840
So second send and the N I note and if you're on the edge maybe we might consider that right so maybe maybe but the real pages of all the lets I'm hoping some of you are most of your super excited about databases and all the things that we're learning all these mechanisms that we are learning are very general systems mechanisms that you're going to use all across so if you're excited about systems you should be excited about database.

54
00:11:45,840 --> 00:12:14,840
The reason why I got so except for databases when when I was off your age which is a long time ago was because in one place you could connect all of these mechanisms not as individual mechanisms as you often will learn in other classes operating systems distributed systems but here you actually have to say how do I bring all of that together into something together and it's not just learning each mechanism by itself but the interactions between that which makes it easy and I can't think of any other system but a database system.

55
00:12:15,840 --> 00:12:44,840
Where all of these things like concurrent signal troll query optimization recovery and all of that come together in one place so the long story is when you teach for the first time even though you think you've got the material really understood you'll be surprised how much deeper you understand the material when you actually have to tell someone and teach someone so that would be a real good reason especially if you're excited about databases and really understand these many things.

56
00:12:45,840 --> 00:12:55,840
So you have to explain it to someone and you'll be shocked by how much deeper you will get into it because you'll be forced to think about it at a level that you've never thought about before.

57
00:12:55,840 --> 00:13:11,840
If you get 100 on the exam I guarantee you haven't thought about it as deeply till you have to go and explain it to someone else and all of you guys are smart you'll ask all kinds of random questions most of them are really good most of them and that forces you to think and be prepared.

58
00:13:11,840 --> 00:13:24,840
So that's my last blog you can apply to this website where you can register if you're interested and then shoot me a mail so especially if you've taken this class and have attended and I'll pull you into the TA4.

59
00:13:24,840 --> 00:13:40,840
Okay. All right so enough of that let's get started with the meat of what the recovery mechanism has to do so far we've said that we've got this mechanism of logging with physiological log.

60
00:13:40,840 --> 00:14:03,840
Physiological logging with the logs are going to be relatively small in size right so if I've got a thousand bite record and I just changed four bites I will only log those four bites and I have in the log enough information to tell me how to reapply a change and to unapply or undo a change because I keep track of the before and after images.

61
00:14:03,840 --> 00:14:31,840
Okay but that's now still needs to put into this context of saying how am I going to recover from a crash and that's what we'll talk about today right so it's a second part you've seen the slide before and we've covered that first bullet point in that at the bottom now we're going to look at what is the algorithm that you used to recover and to guarantee that atomicity and durability and consistency comes because you're not messing up any of the integrity constraints.

62
00:14:31,840 --> 00:14:57,840
So just to reset and re-emphasize what we are operating under hopefully from the last lectures material we are all in agreement that we want to use a steel no force policy to get an efficient buffer manager where the buffer pool replacement policy is purely based upon things like the LRU timestamp and the buffer pool is allowed to steal pages.

63
00:14:57,840 --> 00:15:20,840
And as long as it is unpinned it can flush that out to disk even if a transaction is running and it is not required to force all changes of committed transaction to disk at commit time okay so that we've established as being the efficient way to run a buffer pool okay to we wanted a low latency high throughput transaction system we needed both of those for it.

64
00:15:20,840 --> 00:15:41,840
Now we have to think about how are we going to deal with two big classes of transactions the first one so imagine this is time going from left to right and transaction T1 started bees the begin log record sees the commit log record is an abort log record.

65
00:15:41,840 --> 00:16:10,840
So what we want to happen over here is when the crash happens at the very end the changes of T1 and T2 because when the commit happened we already told the outside world as soon as the commit log record as per the second aspect of right of the wall principle hits the stable storage we tell the world that this transaction is committed so T1 and T2 have committed but their changes may still be in the buffer pool have not been flushed out to disk.

66
00:16:11,840 --> 00:16:40,840
So we have to deal with that T3 is a transaction that explicitly aborted right either the applications issued in a bot call or there was a deadlock or some other form of failure but its status is known it was about it that abort was public lead was disclosed we told the external world that this is an aborted transaction even if it has dirty pages that have been flushed out to disk already we need to go and undo those changes and T4 is this transaction that had begun.

67
00:16:41,840 --> 00:17:06,840
It was running its final state was not determined but the crash happened and we are going to treat it like an aborted transaction so any transactions running at the time of the crash need to be undone about it treated like an aborted transaction and explicitly about the transactions needs to be about it and the committed work has to get recombined so that's the thing that we need to do with our recovery protocol.

68
00:17:06,839 --> 00:17:33,839
Okay, are we on okay with the setup here? All right, so the algorithm we are going to talk about is called aries and it was you know discovered by IBM the guy who did that was see Mohan who's a N.A. member national comedy Academy of Engineering primarily for this work and it's a beautiful protocol the paper however is very difficult to read it's a seventy page paper.

69
00:17:33,839 --> 00:17:51,839
The text book has a pretty much all textbooks have good treatment for the high level overview of this paper and that's what we'll talk about that's what everyone basically implements even if not exactly the way this paper talks about it but the mechanisms in here is essentially what everyone has.

70
00:17:51,839 --> 00:18:20,839
And it's key thing is going to have these different components to it we have the right-hate logging that we will follow under the steel low force policy and we'll do the two components of the right-hate logging which is flush logs to disk for before we flush the dirty page or we flush a page from the purple to disk and flush commit log records to disk and now the key part of this i'm just going to preview this diagram which we are going to look at in more detail in about eight slides from now is.

71
00:18:21,839 --> 00:18:44,839
There was lots of recovery protocols that came before that a reason gets its name that repeating part of it has a very interesting component to it called repeating history and what it does is it will do what seems like extra redundant work and it is redundant work but logically what it will do is it's going to make three passes the first passes in analysis space where it will start from some point.

72
00:18:44,839 --> 00:19:13,839
Looking ahead it's going to start from the checkpoint record and from that checkpoint record read all the logs forward so whenever you see an arrow in time for recovery purposes it basically means it's following the log in time order and as we'll see logs have that structure it will do a forward pass in the log essentially starting from the checkpoint replaying stuff to the forward pass at that point after the a pass is done the analysis pass it knows all the transactions that were running.

73
00:19:14,839 --> 00:19:43,839
At the time of the crash so it's kind of like it's figured out what all each of these transactions are you know are they a C or A or you know they were running and a little bit more information with them that will have reconstructed that state of where the world was and then in the redo pass it will go back and reapply all the changes in the log including changes of a boarded transaction and that's where the repeating history part comes from in case of a robust property as a result of that is that even if you crash one time and you're going to see a lot of the data that's going to be a lot of the same thing.

74
00:19:44,839 --> 00:20:10,839
When you are recovering it you still end up with the right state and the protocol becomes a lot simpler and then at the end of the recovery phase it has effectively the database we created as of the time of the crash and then it will undo all the quote unquote called loser transactions they are all the aborted transactions again these terms loser transactions is in literature so I'm using it it's 2023 so probably if you were doing this again you will call it something else.

75
00:20:10,839 --> 00:20:37,839
The repeating history part comes from the fact that that all part is going to get repeated it's going to start and do all the stuff the protocols before that they were trying to hyper optimize the recovery protocol and say I will do the least amount of work in recovery and they had subtle bugs in them all the time it was super hard to implement it's already super hard to implement aries and that is the beauty of this protocol is it's logically a very clean algorithm now okay.

76
00:20:37,839 --> 00:21:07,799
It seems like we're so you just go that to the point. Yeah, they're three different errors so just hold on this picture is a preview the main thing I want to get across right now is there three passes because as I start talking about these passes you wonder do I start optimizing this stuff hold on to your optimization questions will be finished the protocol but the main part is that the three passes the a and r passes are forward passes the you pass the

77
00:21:07,839 --> 00:21:26,839
backward pass okay and the algorithm becomes super simple because of this and you see that in about 30 minutes from now okay all right that picture is detailed version of that explanation is coming in a little bit but I just want you to get that that we need a way to go back and forth in

78
00:21:26,839 --> 00:21:55,839
the first time and sometimes we may have to go backward so we're going to have to do something special to make that happen in the logs so that's what we start with the log sequence numbers which is the next topic and then we'll go into what how do we create these logs what attention to detail to be have to pay to doing regular comment and about operations then we'll talk about different types of check pointing the one that everyone implements that's efficient is called fuzzy checkpointing but we'll talk about two that are simple to understand and they are just

79
00:21:55,839 --> 00:22:25,799
examples but inefficient examples and then we'll go into the actual recovery protocol okay so that's the four things we'll cover today so first we are going to talk about this very specific thing in the log call the log sequence number so far we've talked about this log records and they've information about what was the before and after image but now what we are going to do is add one more piece of information to these log records and as you'll see as the slides progress the

80
00:22:25,799 --> 00:22:55,759
class progresses you can add a little bit more little bit more to each of these log records and you'll see why but the first thing that everything will now need is called a log sequence number it's a logical proxy for time and you can think about just as we were doing in the version NBC see stuff we needed some time stamp based up and we said we could actually take a time stamp or we could have a number integer number a global number that you automatically grab an increment using atomic instruction.

81
00:22:55,799 --> 00:23:23,799
Log sequence numbers are like that they're going to be some number you do not take a time stamp for efficiency you're going to take this monotonically increasing variable and you're just going to grab that every time you want to go create a log record and you're going to put that as a log sequence number as a result the logs are always going to be created in the log sequence number order and it's going to be the history of time from the perspective of all the changes that were made okay.

82
00:23:25,799 --> 00:23:55,759
So don't confuse any of this log sequence number with the time stamps we were grabbing or the version number the transaction numbers we were grabbing their different variables okay this variable has nothing to do with that okay this is just for recovery purposes right okay now there's a lot of complexity in what we need to keep through even though I said a reason simple query optimization concurrency concurrency.

83
00:23:55,799 --> 00:24:11,799
So we're going to do a whole recovery or the three hardest part in database systems okay so a picture will help and again at the foreshad it may not be clear but it will become clear in a couple sites that I just want to throw a picture again to get your mental ideas to what's going on.

84
00:24:11,799 --> 00:24:41,799
So we've got different types of storage we've got DRAM also called wallet high storage which is your memory where your buffer pool sits there'll be some things that we keep track of in the DRAM called the flushed lesson it will become obvious in a little bit so these lessons they come from a global counter but they also get used in different ways and that's just introducing to you that there lots of lessons all come from that single global counter but we have to keep track of a bunch of other bookkeeping stuff in DRAM we are going to do a lot of things and we're going to do a lot of things and we're going to do a lot of things and we're going to do a lot of things and we're going to do a lot of things and we're going to do a lot of things and we're going to do a lot of things and we're going to do a lot of things and we're going to do a lot of things and we're going to do a lot of things and we're going to do a lot of things and we're going to

85
00:24:41,799 --> 00:25:11,799
keep track of this thing called flushed lesson on stable storage shown as this here this is the one that will survive a power failure we'll keep track of something called page lessons and the log file which is where the log records are stored they are typically stored on disk two but it could be a separate disk often that disk is mirrored so that if one disk fails you still have the other log if you lose the log everything is lost and in many cases especially as you start looking at distributed transactions that log can actually be stored on disk

86
00:25:11,799 --> 00:25:41,799
but it's somewhere remotely too so that you can have a copy of the log if there's a single site that fails but the important part for today's lecture is this additional part of this picture all pages the pages that you implemented for your buffer pool in your in your previous assignment will now have an extra field which is called the page lesson and that's going to record what was the record that updated that page let me be

87
00:25:41,799 --> 00:26:10,799
bringing all of this up yep great so the LSN counter is going to be grabbed anytime we need to write a log record and we write a log record anytime we are going to update a page we'll also grab that LSN for the begin transaction log record and transaction log record and commit transaction in a few other places but the most common reason we are going to grab and ask the LSN counter to give us a new LSN is because we are going to give us a new LSN

88
00:26:10,799 --> 00:26:35,799
is because we are updating a page when the update a page will of course create the log record for it now that log record has the LSN that we just grab that sitting in the log record but we'll also take that log record that LSN and put it in the page which is sitting in the buffer pool so inside each page is a special area where we are going to keep track of this thing called the page LSN

89
00:26:35,799 --> 00:27:05,799
if you have multiple LSN you have multiple LSN if you have multiple LSN if you have multiple LSN if you have multiple LSN if you have multiple LSN if you have multiple LSN if you have multiple LSN if you have multiple LSN if you have multiple LSN if you have multiple LSN if you have multiple LSN if you have multiple LSN if you have multiple LSN if you have multiple LSN if you have multiple LSN if you have multiple LSN if you have multiple LSN if you have multiple LSN if you have multiple LSN if you have multiple LSN if you have multiple LSN if you have multiple LSN if you have multiple LSN if you have multiple LSN if you have multiple LSN if you have multiple LSN if you have multiple LSN if you have multiple LSN if you have multiple LSN if you have multiple LSN if you have multiple LSN if you have multiple LSN if you have multiple LSN if you have multiple LSN if you have multiple LSN if you have multiple LSN

90
00:27:05,799 --> 00:27:11,539
that counter can also because balance can also be up at 16 to 12 gerade you can also because it could become count but can also become content

91
00:27:11,539 --> 00:27:12,779
you can even make content but can a fair value consider 1 so, it could become a Fair value consider 1 so, how do you compare to K surveying like you have multiple LN and Y bez

92
00:27:12,779 --> 00:27:27,480
if you have observations and Y bez

93
00:27:27,480 --> 00:27:35,319
If you have an LSN inflow for K surveying like you have multiple LN and Y bez

94
00:27:35,319 --> 00:27:39,519
Great. Other questions? All right.

95
00:27:39,519 --> 00:27:41,819
So in the page now,

96
00:27:41,819 --> 00:27:43,980
we'll keep an area for the page LSN,

97
00:27:43,980 --> 00:27:45,379
which is every time you update,

98
00:27:45,379 --> 00:27:47,740
you put the log record in the log buffer pool,

99
00:27:47,740 --> 00:27:49,379
which is in memory right now,

100
00:27:49,379 --> 00:27:51,220
and you'll record the page LSN.

101
00:27:51,220 --> 00:27:52,859
Keep a little room for something else called

102
00:27:52,859 --> 00:27:55,419
the rec LSN also on the page which is coming next,

103
00:27:55,419 --> 00:27:56,819
and you'll see why.

104
00:27:56,819 --> 00:27:59,059
We'll start making those changes.

105
00:27:59,059 --> 00:28:01,539
When the page is flushed out to disk,

106
00:28:01,539 --> 00:28:02,859
before that what will we do,

107
00:28:02,859 --> 00:28:05,619
we'll make sure its logs are written to disk first,

108
00:28:05,619 --> 00:28:07,899
and then we'll flush the page out to disk too.

109
00:28:07,899 --> 00:28:11,019
So pages are going to have page LSNs

110
00:28:11,019 --> 00:28:13,259
and rec LSNs coming in the next slide,

111
00:28:13,259 --> 00:28:16,139
on every page whether they're in the buffer pool or on disk.

112
00:28:16,139 --> 00:28:19,459
So it's a permanent change to the structure that we're going to make.

113
00:28:19,459 --> 00:28:22,959
We'll interpret these page and rec LSNs in a little bit.

114
00:28:22,959 --> 00:28:25,740
Now on this side up over here,

115
00:28:25,740 --> 00:28:30,019
you're seeing a pictorial representation of the log records.

116
00:28:30,019 --> 00:28:32,500
These log records are sitting in a log file,

117
00:28:32,500 --> 00:28:36,599
and they also have a little space called the log buffer pool.

118
00:28:36,599 --> 00:28:38,519
Sometimes it's the same buffer pool.

119
00:28:38,519 --> 00:28:40,180
Sometimes it's separate for a purpose.

120
00:28:40,180 --> 00:28:42,099
Let's assume it's a separate buffer pool.

121
00:28:42,099 --> 00:28:44,619
As the log records get written,

122
00:28:44,619 --> 00:28:47,900
they're written in memory sequentially.

123
00:28:47,900 --> 00:28:50,740
Ultimately, you're going to run out of

124
00:28:50,740 --> 00:28:53,740
that log buffer pool space and you need to manage that.

125
00:28:53,740 --> 00:28:55,500
But there's a simpler buffer pool management.

126
00:28:55,500 --> 00:28:57,059
There's no replacement policy here.

127
00:28:57,059 --> 00:28:59,420
You're simply going to keep flushing because

128
00:28:59,420 --> 00:29:00,779
this is sequential file,

129
00:29:00,779 --> 00:29:02,980
this is going to flush out the older pages.

130
00:29:02,980 --> 00:29:05,700
Internally, they get organized into pages too.

131
00:29:05,700 --> 00:29:07,779
They're block level storage.

132
00:29:07,779 --> 00:29:11,420
You keep track of something called the Flush LSN,

133
00:29:11,420 --> 00:29:17,340
which is where is that log records boundary between what's sitting on disk,

134
00:29:17,340 --> 00:29:19,539
the black portion is sitting on disk,

135
00:29:19,539 --> 00:29:23,860
and the gray portion in that log tail is sitting in D-Rap.

136
00:29:23,860 --> 00:29:27,460
We'll have this flush LSN to keep track of.

137
00:29:27,460 --> 00:29:31,460
If I'm looking for a log record that is less than the flush LSN,

138
00:29:31,460 --> 00:29:32,900
I know I need to go to the disk.

139
00:29:32,900 --> 00:29:36,380
If it's greater than that, I need a SN memory.

140
00:29:36,380 --> 00:29:39,140
But this flush LSN will also get used in

141
00:29:39,140 --> 00:29:43,340
a critical way to ensure that right-hand logging protocol.

142
00:29:43,340 --> 00:29:48,100
All right. If it wasn't enough with just having a page LSN,

143
00:29:48,100 --> 00:29:52,299
flush LSN introduced,

144
00:29:52,299 --> 00:29:55,819
there's a little bit more extra stuff we need.

145
00:29:55,819 --> 00:30:01,939
So, flush LSN you saw, page LSN you saw,

146
00:30:01,939 --> 00:30:06,859
one most structural change we need to the page is this rec LSN.

147
00:30:06,859 --> 00:30:16,539
It's going to keep track of the log record that updated the page when it was flushed to disk.

148
00:30:16,539 --> 00:30:21,220
It's usually going to be less than or equal to the page LSN.

149
00:30:21,220 --> 00:30:27,100
So, when the best way and this would become clear in a little bit,

150
00:30:27,100 --> 00:30:32,220
each page is going through different version changes.

151
00:30:32,220 --> 00:30:37,940
Those version changes are being recorded in the log records corresponding to that page.

152
00:30:37,940 --> 00:30:41,900
Now, rec LSN effectively says,

153
00:30:41,900 --> 00:30:48,579
what's the oldest change that was applied to this page that

154
00:30:48,579 --> 00:30:53,699
since it was flushed out to disk and it'll all become obvious in a little bit.

155
00:30:53,699 --> 00:30:58,659
But effectively, logically what it means is that between the rec LSN and the page LSN,

156
00:30:58,659 --> 00:31:01,859
those changes may not have made it to disk.

157
00:31:01,859 --> 00:31:06,299
So, is the rec LSN and page LSN the same as this?

158
00:31:06,299 --> 00:31:12,339
No. On disk, they can be the same when you're flushing it out. Yes.

159
00:31:12,339 --> 00:31:15,899
So, then how can there ever be different on you?

160
00:31:15,940 --> 00:31:19,220
In the buffer pool. So, I brought a page from yep, great question.

161
00:31:19,220 --> 00:31:21,420
So, when can the rec and page LSN be different?

162
00:31:21,420 --> 00:31:25,740
I bring a page from disk. I now have the rec LSN.

163
00:31:25,740 --> 00:31:27,580
Now, it keeps applying changes to it.

164
00:31:27,580 --> 00:31:29,220
I'll keep updating the page LSN.

165
00:31:29,220 --> 00:31:31,180
Now, they've gotten further away.

166
00:31:31,180 --> 00:31:33,860
At some point, I might flush this page out to disk.

167
00:31:33,860 --> 00:31:36,980
I will go make changes to that as I do it.

168
00:31:36,980 --> 00:31:41,780
But then again, if I bring it back, I'm going to start to see this thing separate out.

169
00:31:41,779 --> 00:31:46,899
But as the recovery protocol, we have to be ready to bring up a page where these things

170
00:31:46,899 --> 00:31:49,700
can be different and then deal with that.

171
00:31:49,700 --> 00:31:52,579
Now, we're going to keep track of another data structure.

172
00:31:52,579 --> 00:31:56,460
So, remember, we have a log, if you're doing a log-based scheme,

173
00:31:56,460 --> 00:31:58,220
then you have a log manager.

174
00:31:58,220 --> 00:32:00,379
And the buffer manager also has its own metadata.

175
00:32:00,379 --> 00:32:03,059
We're going to keep track of one more metadata in memory.

176
00:32:03,059 --> 00:32:05,819
It's called the active transaction table.

177
00:32:05,819 --> 00:32:08,139
And it's going to keep track of which transactions are active,

178
00:32:08,139 --> 00:32:09,579
what the current state is.

179
00:32:09,579 --> 00:32:15,179
And in there, too, will be an LSN which was the last LSN that was created by that transaction.

180
00:32:15,179 --> 00:32:16,779
Multiple transactions could be running.

181
00:32:16,779 --> 00:32:21,339
Every transaction and wants to create a log record will get it from that LSN counter.

182
00:32:21,339 --> 00:32:25,460
But you need to know for each transaction which was the last counter for that.

183
00:32:25,460 --> 00:32:28,619
Okay, and you'll see why we need that in a little bit.

184
00:32:28,619 --> 00:32:32,659
Last piece of information we need is something called the master record.

185
00:32:32,659 --> 00:32:35,899
This is something that will stay on disk.

186
00:32:35,900 --> 00:32:41,460
And when we start recovery, the first thing that recovery manager does is go pull up the master record,

187
00:32:41,460 --> 00:32:44,259
which is always at a known location on disk.

188
00:32:44,259 --> 00:32:47,100
Okay, that's hardwired into the database system.

189
00:32:47,100 --> 00:32:50,580
Okay, and so it will always go to the disk, build that up.

190
00:32:50,580 --> 00:32:54,980
And that will contain the location of the checkpoint record.

191
00:32:54,980 --> 00:32:58,220
More precisely, the LSN of the checkpoint record,

192
00:32:58,220 --> 00:33:02,300
because LSN is effectively a logical pointer to a record, right?

193
00:33:02,300 --> 00:33:05,580
So, that master record will say, here's the checkpoint record.

194
00:33:05,579 --> 00:33:08,859
You start the recovery protocol from this point on.

195
00:33:08,859 --> 00:33:12,699
All right, a lot that's been thrown at you,

196
00:33:12,699 --> 00:33:16,939
but as we go through examples, it'll become clear to make matters worse.

197
00:33:16,939 --> 00:33:18,579
Sometimes you have more than this information,

198
00:33:18,579 --> 00:33:22,579
but this is all that we need to cover the basics of what we need.

199
00:33:22,579 --> 00:33:27,980
Just like I said, we started and say, oh, there's an SNX log and that is simple.

200
00:33:27,980 --> 00:33:31,259
And then we threw up and said, you know, real systems have a lot more stuff.

201
00:33:31,259 --> 00:33:34,339
Real systems have a lot more stuff.

202
00:33:34,339 --> 00:33:37,179
Okay, and some of it comes from beefries have all kinds of crazy stuff

203
00:33:37,179 --> 00:33:40,139
that can happen to it and you'll do special stuff and things like that.

204
00:33:40,139 --> 00:33:42,059
So we'll ignore all of that.

205
00:33:42,059 --> 00:33:45,220
So let's just look at normal operation, what's happening?

206
00:33:45,220 --> 00:33:51,699
So on the left side here is what's sitting in DRAM, right?

207
00:33:51,699 --> 00:33:54,059
That's the symbol for that.

208
00:33:54,059 --> 00:33:58,220
That side is sitting on disk in non-volatile storage.

209
00:33:58,220 --> 00:33:59,099
And then we'll start.

210
00:33:59,099 --> 00:34:00,459
We are creating for the purpose.

211
00:34:00,459 --> 00:34:02,619
I'm not showing any pages and stuff right now.

212
00:34:02,619 --> 00:34:05,219
Today we just care about what's happening to the logs.

213
00:34:05,219 --> 00:34:07,099
So a log tail, right?

214
00:34:07,099 --> 00:34:10,819
Remember the one about the flushed LSN is sitting on the left side.

215
00:34:10,819 --> 00:34:14,059
We have a buffer pool with a page that has a couple values.

216
00:34:14,059 --> 00:34:15,980
Now everything has a log sequence number.

217
00:34:15,980 --> 00:34:17,900
It's monotonically increasing.

218
00:34:17,900 --> 00:34:22,139
And when we go make a change to the page,

219
00:34:22,139 --> 00:34:25,539
we are going to start making changes to the page LSN, right?

220
00:34:25,539 --> 00:34:28,059
Every time we grab a new log record, update a page,

221
00:34:28,059 --> 00:34:31,779
we'll also do the page LSN, but notice the page also has a record LSN,

222
00:34:31,780 --> 00:34:37,220
which was the last log record whose changes have made it to disk.

223
00:34:37,220 --> 00:34:43,220
Now, when we also have this flushed LSN that is sitting in memory,

224
00:34:43,220 --> 00:34:45,780
and that's just telling where the tail of the log is.

225
00:34:45,780 --> 00:34:50,660
So it's just revisiting what we said before with the diagram.

226
00:34:50,660 --> 00:34:52,980
Master record says where the checkpoint record is,

227
00:34:52,980 --> 00:34:55,780
and we'll talk about creating checkpoint records in a little bit.

228
00:34:55,780 --> 00:34:59,500
And essentially what you do is let's say, yep, question.

229
00:35:01,780 --> 00:35:10,340
On disk, they could be different, but just hold on to that for a little bit.

230
00:35:10,340 --> 00:35:14,500
Yeah, it need not be because it's okay.

231
00:35:14,500 --> 00:35:16,660
I can recover from it if it is different.

232
00:35:16,660 --> 00:35:20,900
So if a page on disk didn't have the same page LSN and recalesson,

233
00:35:20,900 --> 00:35:25,380
I can recover that from disk as long as I follow the right-hand logging protocol.

234
00:35:25,380 --> 00:35:28,540
So as long as the logs are in disk,

235
00:35:28,539 --> 00:35:30,860
the best way to think about it is,

236
00:35:30,860 --> 00:35:32,300
you could also ask the question,

237
00:35:32,300 --> 00:35:36,380
should I enforce that to be the same on disk you could, but you don't have to.

238
00:35:36,380 --> 00:35:38,619
As long as you follow the right-hand logging protocol,

239
00:35:38,619 --> 00:35:42,139
that says the logs must hit the disk before the page hits,

240
00:35:42,139 --> 00:35:46,860
then you are fine, but you may want to optimize that further by fixing certain things.

241
00:35:46,860 --> 00:35:49,019
So in general, yes, that's what you would do.

242
00:35:49,019 --> 00:35:52,300
You would go and fix the recalesson when you flush it out to disk.

243
00:35:52,300 --> 00:35:54,779
But after the logs have hit the disk.

244
00:35:54,779 --> 00:35:55,340
Okay, yep.

245
00:35:55,340 --> 00:35:59,500
It's logically the question of how could it ever get out of disk.

246
00:35:59,500 --> 00:36:03,420
Yeah, logically, the question is when can the recalesson and

247
00:36:03,420 --> 00:36:06,860
page LSN for something that's been just flushed out to disk get out of sync,

248
00:36:06,860 --> 00:36:08,539
it'll be based on the implementation.

249
00:36:08,539 --> 00:36:12,380
So generally, you would not make that happen.

250
00:36:12,380 --> 00:36:15,420
Yeah, but all I'm saying is the mechanisms are generally enough that

251
00:36:15,420 --> 00:36:17,579
if you want to use in a different way, you could.

252
00:36:17,579 --> 00:36:20,460
Okay, and we'll just punt on that on that question,

253
00:36:20,460 --> 00:36:24,780
but you can assume for today's lecture that they will be synchronized at that point.

254
00:36:24,780 --> 00:36:26,380
Okay, that's a good question.

255
00:36:26,380 --> 00:36:27,019
Other questions?

256
00:36:29,180 --> 00:36:34,460
All right, so now if this puff of pool page has to be flushed out to disk,

257
00:36:34,460 --> 00:36:37,340
the first part of right-ahead logging protocol says,

258
00:36:37,340 --> 00:36:41,019
I check whether I can, it's log better be sitting on disk,

259
00:36:41,019 --> 00:36:42,940
and we will do that check.

260
00:36:42,940 --> 00:36:47,500
I know in that page, I will look at the page LSN, that's all I look at.

261
00:36:47,500 --> 00:36:49,980
And say, is it less than the flushed LSN?

262
00:36:49,980 --> 00:36:52,220
If it is, that means the log is sitting on disk, right?

263
00:36:53,019 --> 00:36:54,059
Which means it's safe.

264
00:36:54,059 --> 00:36:55,019
I can go flush it.

265
00:36:55,019 --> 00:36:56,779
At that point, you could update the record LSN.

266
00:36:57,819 --> 00:37:02,939
Okay, and then I come back up over here,

267
00:37:03,739 --> 00:37:08,779
and basically my page LSN is referring to log number 19.

268
00:37:08,779 --> 00:37:11,739
If that is what the page LSN is in the second example,

269
00:37:12,459 --> 00:37:17,980
if that is not flushed out to disk because the LSN on disk is 16,

270
00:37:17,980 --> 00:37:22,780
I have to flush logs 17, 18, and 19 before I can do anything else.

271
00:37:22,780 --> 00:37:25,099
Now you might say, oh, I don't need to flush.

272
00:37:25,099 --> 00:37:28,059
I only want to flush the log records corresponding to this page,

273
00:37:28,059 --> 00:37:31,740
which is true, but we'll always treat the right-ahead log file as a sequential file,

274
00:37:31,740 --> 00:37:34,699
so we'll flush everything up to the log record debug.

275
00:37:34,699 --> 00:37:37,340
We are not going to try to break apart the logs, okay?

276
00:37:38,219 --> 00:37:39,500
We'll just keep it simple.

277
00:37:39,500 --> 00:37:41,659
Things can get super complicated and you'll have subtle bugs,

278
00:37:41,659 --> 00:37:43,500
so we are just going to flush everything,

279
00:37:43,500 --> 00:37:46,219
just going to treat the log file as a sequential file.

280
00:37:46,219 --> 00:37:48,859
So we flush everything up to that 19,

281
00:37:48,859 --> 00:37:50,459
and once that is in there,

282
00:37:50,459 --> 00:37:53,659
we can go flush the buffer pool out, right?

283
00:37:53,659 --> 00:37:56,539
So that's just the thing is the first part of right-ahead logging protocol,

284
00:37:56,539 --> 00:37:59,179
before you make changes to a disk permanent,

285
00:37:59,179 --> 00:38:00,379
to a page permanent,

286
00:38:00,379 --> 00:38:02,939
it's log better have hit the disk before you do that.

287
00:38:02,939 --> 00:38:03,259
Question?

288
00:38:03,980 --> 00:38:06,059
Yes, this is the first like intermediate question.

289
00:38:06,059 --> 00:38:09,899
Do you generally flush anything that you have in the buffer pool when you're like...

290
00:38:09,899 --> 00:38:11,659
In the log buffer pool, yes.

291
00:38:13,099 --> 00:38:15,419
Only it's left and the point that he wants.

292
00:38:15,420 --> 00:38:16,940
Yeah, so the question is,

293
00:38:16,940 --> 00:38:21,659
do you flush everything in the log buffer pool or only up to the point you want?

294
00:38:21,659 --> 00:38:24,059
So generally only up to the point you want.

295
00:38:24,059 --> 00:38:26,780
Now, then you will not go wrong if you flush more.

296
00:38:28,300 --> 00:38:32,300
And so, you know, usually that's also page-ified at page boundary,

297
00:38:32,300 --> 00:38:34,539
so you might flush up to the next page boundary,

298
00:38:34,539 --> 00:38:35,980
but you don't have to.

299
00:38:35,980 --> 00:38:38,059
Correctness will ensure as long as you make sure

300
00:38:39,019 --> 00:38:40,780
at least 19 is flush to disk,

301
00:38:41,500 --> 00:38:44,300
and doesn't matter if 20 also got flush to disk,

302
00:38:44,300 --> 00:38:45,660
because you're trying to write 19 on.

303
00:38:45,660 --> 00:38:46,460
That will be okay.

304
00:38:46,460 --> 00:38:47,420
You'll still be correct.

305
00:38:47,420 --> 00:38:52,300
You're not going to do damage by writing more logs to disk than you absolutely need to.

306
00:38:53,580 --> 00:39:02,060
So, the question is, why do we need a recalescent?

307
00:39:02,060 --> 00:39:04,700
That's going to come when we try to do the recovery protocol.

308
00:39:04,700 --> 00:39:05,820
So, just wait for that.

309
00:39:05,820 --> 00:39:06,060
Yep.

310
00:39:08,780 --> 00:39:12,700
So, the flush and flush centers will be the latest thing in the case, right?

311
00:39:12,699 --> 00:39:15,579
The flush tell us in, so here, let me go back to this diagram.

312
00:39:15,579 --> 00:39:18,139
Right now, maybe this makes a little bit more clear.

313
00:39:18,139 --> 00:39:21,500
The flush tell us in is that it's saying, where's the tail of the log?

314
00:39:24,460 --> 00:39:25,099
Oh, right.

315
00:39:25,099 --> 00:39:28,939
It's the latest thing that we've left inside disk.

316
00:39:28,939 --> 00:39:30,139
In disk, yeah, it's safe.

317
00:39:30,139 --> 00:39:32,139
Everything after that is not on disk.

318
00:39:32,139 --> 00:39:33,259
I don't have a record for it.

319
00:39:33,899 --> 00:39:35,259
Why do we need to keep track of it?

320
00:39:35,259 --> 00:39:36,939
Like, I guess like,

321
00:39:37,659 --> 00:39:39,179
we're going back to the other slide.

322
00:39:39,500 --> 00:39:44,460
Do we need granularity of like being able to choose exactly which logs you want to push?

323
00:39:44,460 --> 00:39:47,500
But what are the basic features of flush everything that we have?

324
00:39:47,500 --> 00:39:50,379
Yeah, the question is, can I flush everything I have all the time?

325
00:39:50,379 --> 00:39:50,619
Yes.

326
00:39:51,500 --> 00:39:52,379
It'll be inefficient.

327
00:39:52,379 --> 00:39:55,019
You'll be writing more log IOs than you need to.

328
00:39:55,019 --> 00:39:58,460
You could in fact say, oh, the logs records are always created on disk.

329
00:39:58,460 --> 00:39:59,659
I have no log buffer pool.

330
00:39:59,659 --> 00:40:01,339
That would be correct, but it would be very slow.

331
00:40:03,819 --> 00:40:09,019
So, in this case, you're saying that we're not allowed to flush simply long nights.

332
00:40:09,579 --> 00:40:11,500
Or, yeah, I'm saying,

333
00:40:13,419 --> 00:40:16,779
we will flush everything including 17, 18, and 19.

334
00:40:16,779 --> 00:40:22,940
Perhaps even 20 to disk, I'm not going to try and pull out just 19 because that's the change

335
00:40:22,940 --> 00:40:24,539
to the page.

336
00:40:24,539 --> 00:40:28,779
Because, you know, there might be seven, there might be record 17 that is also,

337
00:40:29,339 --> 00:40:31,339
records 18 that is related to the page.

338
00:40:31,339 --> 00:40:34,779
I don't want to go and try and grab all of that stuff and the protocol will get completely

339
00:40:34,779 --> 00:40:35,579
complicated.

340
00:40:35,579 --> 00:40:38,940
So, I guess what my question is, why do we need to close the O7?

341
00:40:39,019 --> 00:40:40,460
Why do you need the flush LSN?

342
00:40:40,460 --> 00:40:43,740
So that you can check whether the changes have been made to this.

343
00:40:43,740 --> 00:40:49,500
So, for example, if, imagine I had log 21, 22, and 23,

344
00:40:49,500 --> 00:40:53,740
and just because I needed to flush 19, I also flushed 20, 21, and 22 to disk.

345
00:40:53,740 --> 00:40:55,500
Because it was on the same page.

346
00:40:55,500 --> 00:40:58,619
Then, a next buffer pool page that has LSN,

347
00:40:58,619 --> 00:41:00,780
a page LSN of 20 comes in.

348
00:41:00,780 --> 00:41:01,820
You will say, oh, you know what?

349
00:41:02,460 --> 00:41:06,780
Flush LSN tells me that I don't need to do any flushing of logs for you because you already done.

350
00:41:08,940 --> 00:41:15,420
So, we don't necessarily have to write out the logs in a strictly second goal.

351
00:41:15,420 --> 00:41:16,619
The logs are written out.

352
00:41:16,619 --> 00:41:19,099
So, the question is, do we have to write the logs in sequential order?

353
00:41:19,099 --> 00:41:21,420
The logs are going to get written in sequential order.

354
00:41:24,700 --> 00:41:25,659
What's the confusion?

355
00:41:25,659 --> 00:41:27,019
There's some other confusion you have.

356
00:41:28,619 --> 00:41:28,940
Okay.

357
00:41:29,900 --> 00:41:33,740
So, is it true that the flush tells and always be close to the tail?

358
00:41:35,579 --> 00:41:38,059
The flush LSN is always pointing to the tail.

359
00:41:38,059 --> 00:41:39,900
Exactly as this diagram says.

360
00:41:39,900 --> 00:41:41,500
That's what it is keeping track of.

361
00:41:41,500 --> 00:41:45,019
Like, what portion, what log sequence number has made it to disk?

362
00:41:47,179 --> 00:41:49,900
But you'll have to go read the tail from somewhere and you'll make a disk I.O.

363
00:41:51,019 --> 00:41:53,500
You don't want to take a disk I.O. to find out where the tail is.

364
00:41:54,699 --> 00:41:55,179
Yeah.

365
00:41:55,179 --> 00:41:55,900
Yep.

366
00:41:55,900 --> 00:41:57,259
That's why you're keeping it in memory.

367
00:41:57,259 --> 00:42:00,699
As I said, you could come up with a protocol that says there's no log buffer pool.

368
00:42:00,699 --> 00:42:01,340
Everything is on.

369
00:42:01,900 --> 00:42:04,219
Logs always hit stable storage, but that will be very slow.

370
00:42:04,219 --> 00:42:04,860
It will be correct.

371
00:42:05,500 --> 00:42:06,059
Okay.

372
00:42:06,139 --> 00:42:10,779
So, a lot of this is efficiency mixed with making the protocol work correctly.

373
00:42:10,779 --> 00:42:14,219
And simply, that simple part is super important.

374
00:42:14,779 --> 00:42:18,940
And that's why we are not trying to optimize exactly which log records to write.

375
00:42:18,940 --> 00:42:20,380
We're just going to write it sequentially.

376
00:42:21,019 --> 00:42:23,019
By the way, sequential writes are anyways pretty efficient.

377
00:42:23,019 --> 00:42:25,820
So, it's actually going to be the right thing to do.

378
00:42:27,099 --> 00:42:27,420
Okay.

379
00:42:28,299 --> 00:42:30,460
So, we keep writing these log records.

380
00:42:31,340 --> 00:42:34,380
Just to get everyone reset, we'll update the page.

381
00:42:34,380 --> 00:42:40,860
LSN every time a transaction modifies and update the flushed LSN in memory every time we flushed

382
00:42:40,860 --> 00:42:42,619
logs so that we know where the new tail is.

383
00:42:43,180 --> 00:42:43,340
Okay.

384
00:42:43,340 --> 00:42:48,059
Because that's against which we are checking to figure out whether the first part of right-hid login

385
00:42:48,059 --> 00:42:51,820
protocol has to be taken care of when we flush the page out to test.

386
00:42:52,860 --> 00:42:55,420
So, normal execution, we're going to simplify even further.

387
00:42:55,980 --> 00:43:01,500
We're going to assume that all log records fit in a single page in the log file is also

388
00:43:01,500 --> 00:43:06,380
pageified. If it doesn't, there are little sort of straightforward extensions to deal with,

389
00:43:06,380 --> 00:43:07,579
but you have to worry about it.

390
00:43:07,579 --> 00:43:08,780
Kind of what you have to worry about it.

391
00:43:08,780 --> 00:43:11,179
The log record spans four pages.

392
00:43:11,900 --> 00:43:14,860
You know, what does it mean for a log record to have hit disk and come back?

393
00:43:14,860 --> 00:43:19,099
All those four pages, quote unquote, have to be atomically written to disk and come back.

394
00:43:19,099 --> 00:43:20,860
And the operating system doesn't provide you that.

395
00:43:20,860 --> 00:43:23,260
So, you have to provide other mechanisms to deal with it.

396
00:43:23,260 --> 00:43:26,699
Sidebar, I don't want to go down a rabbit hole to go to drum and that.

397
00:43:26,699 --> 00:43:28,380
Our disks writes atomic.

398
00:43:28,700 --> 00:43:30,780
If not, there are other mechanisms to deal with that.

399
00:43:30,780 --> 00:43:33,420
We're going to assume all of that stuff is okay for us today.

400
00:43:34,619 --> 00:43:36,140
That disk could also fail, as I said.

401
00:43:36,140 --> 00:43:37,019
You could mirror it.

402
00:43:37,019 --> 00:43:42,619
You could replicate it in a geographically distributed area to get that log to be available to you.

403
00:43:43,980 --> 00:43:48,460
We're going to assume that we are operating with single version of records.

404
00:43:48,460 --> 00:43:51,740
There are multiple versions if we are doing MECC based protocols.

405
00:43:51,740 --> 00:43:54,059
Kind of the straightforward way of things apply.

406
00:43:54,539 --> 00:43:56,699
Not going to test you in the exam.

407
00:43:56,699 --> 00:43:59,099
But you can just think of a firm doing physiological logging.

408
00:43:59,659 --> 00:44:02,619
And if I've made it work with records that span multiple pages,

409
00:44:02,619 --> 00:44:04,460
the versioning stuff works out in a similar way.

410
00:44:05,500 --> 00:44:10,779
So, the basic point is this is all compatible with all the version creation stuff that we were doing.

411
00:44:11,980 --> 00:44:16,539
Okay, with the different types of storage structures that we had for version management.

412
00:44:16,539 --> 00:44:18,940
And of course, we are doing steel and no force.

413
00:44:18,940 --> 00:44:21,179
So, that's just saying a lot of simplifications.

414
00:44:22,619 --> 00:44:24,059
Straight forward ways to go.

415
00:44:24,059 --> 00:44:29,659
Not straight forward, but you can extend it to deal with the other types of complexity that might come in the system.

416
00:44:31,420 --> 00:44:38,380
Now, we are going to introduce one more type of log record called the transaction end.

417
00:44:38,380 --> 00:44:41,579
But before that, just to re-trade that, when the transaction come in,

418
00:44:41,579 --> 00:44:43,420
it's going to create a commit log record.

419
00:44:43,980 --> 00:44:46,780
And if a transaction abort says going to be an abort log record.

420
00:44:47,420 --> 00:44:52,700
And those, all these log flushes are happening to this log file, which is just sequentially getting flushed.

421
00:44:53,580 --> 00:44:58,940
Okay. Now, this at the, when the transaction comets,

422
00:44:59,500 --> 00:45:05,580
the second part of right-ahead logging protocol says that commit log record must hit the stable storage,

423
00:45:05,580 --> 00:45:06,620
must hit the log disk.

424
00:45:07,180 --> 00:45:12,940
It's at that magical moment when you get that reply back from the log disk saying,

425
00:45:12,940 --> 00:45:17,579
a commit log record has hit disk and you could have written a few more log records after the commit log record.

426
00:45:17,579 --> 00:45:18,059
We don't care.

427
00:45:18,940 --> 00:45:25,420
But as soon as that commit log record, the page corresponding to the way that commit log record is,

428
00:45:25,420 --> 00:45:29,740
hits disk, you can say, this transaction is committed, you can declare that to the outside world.

429
00:45:29,740 --> 00:45:32,619
And recovery will take care of the atomicity and durability part of it.

430
00:45:34,139 --> 00:45:41,500
Okay. But we will also do something for various bookkeeping purposes that become super important

431
00:45:41,500 --> 00:45:46,780
for efficiency where we will write the commit log record. That's when the commit happened.

432
00:45:46,780 --> 00:45:51,579
But even for committed transactions, we'll do all kinds of cleanup that we might have.

433
00:45:51,579 --> 00:45:57,739
For example, if I'm using OCC or some form of that, I'm going to clean up all my workspace in which I've

434
00:45:57,739 --> 00:46:02,059
checked out and kept all my read copies and stuff. I allocated a bunch of memory. I will throw away all of

435
00:46:02,059 --> 00:46:07,900
that, deallocate that memory. And when I'm completely done, I will write a end transaction log record.

436
00:46:07,900 --> 00:46:12,059
Even if you're not doing OCC, there's cleanup that you often need to do. You'll do all of that and

437
00:46:12,059 --> 00:46:19,260
write the end log record. This does not have to be forced to disk. The commit log record has to be

438
00:46:19,260 --> 00:46:24,460
forced to disk to declare the transaction committed. Bookkeeping cleanup that you need it to do can be done

439
00:46:24,460 --> 00:46:29,740
later. This end log record, we will write that. But it will just help us when we're doing the recovery

440
00:46:29,740 --> 00:46:34,619
protocol to say, you know what? I don't need to worry about it. So as far as the recovery protocol

441
00:46:34,619 --> 00:46:39,500
that we are looking at, that we'll look at shortly, it's the end log record which will say, I'm done

442
00:46:39,500 --> 00:46:46,859
with you completely. So Chattish, want you to know there's an end log record, but it doesn't have to be

443
00:46:47,420 --> 00:46:52,380
flush to disk. Is the commit log records flush? That is the magical commit point for the transaction.

444
00:46:54,619 --> 00:47:00,219
All right. So let's see what happens when regular commit. We are going to start. Let's say we get to

445
00:47:00,219 --> 00:47:04,699
this commit point. We create this commit log record that's sitting in the log buffer pool.

446
00:47:05,339 --> 00:47:12,539
Now what we are going to do is go and flush that out to disk to the log disk. Once that reply comes

447
00:47:12,539 --> 00:47:18,219
back, that's when the commit has actually happened. We have that magical moment that we were looking for.

448
00:47:19,259 --> 00:47:24,939
Now what we'll start to do is keep processing further. We'll adjust the flush tell us in of course.

449
00:47:24,939 --> 00:47:29,899
We have to keep track of the tail. Notice how we do that. We flush the log first, then update the

450
00:47:29,900 --> 00:47:34,460
flush tell us in. It's okay if your flush tell us in is a little bit off. Don't do it the other way

451
00:47:34,460 --> 00:47:42,059
wrong. Just make sure the log is done before you adjust the tail. At some point we'll clean up and

452
00:47:42,059 --> 00:47:46,220
write our end transaction log record. So recovery protocol has to be ready to look at these end

453
00:47:46,220 --> 00:47:52,860
transaction log records which is important. At this point, we could choose to trim away the

454
00:47:52,860 --> 00:47:59,660
flush tell the log that is in the buffer pool. We can make space for it. If it's a buffered log

455
00:48:00,139 --> 00:48:03,579
file widget is, then we now have space to create new log pages.

456
00:48:06,299 --> 00:48:12,699
All right. For a botz, we have to do a little bit more work. So I'm going to introduce one more

457
00:48:12,699 --> 00:48:23,099
relic in type. So a transaction like T4 that we had in this schematic example a little while back.

458
00:48:24,460 --> 00:48:29,579
T4 that was running at the time of transaction and T3 that was explicitly aborted. They are both

459
00:48:29,579 --> 00:48:34,460
going to be treated as a botz transaction as far as A vs is concerned.

460
00:48:35,659 --> 00:48:45,340
So now for these botz transactions, excuse me, we are going to do the following. We are going to add

461
00:48:45,340 --> 00:48:53,579
one more field to a log record and this field is going to be called previous LSN and its job is to

462
00:48:53,579 --> 00:49:00,699
keep track. It's not strictly needed, but it makes things more efficient. Its purpose is to allow

463
00:49:00,699 --> 00:49:07,739
me, if I'm undoing transaction T4 and I look at a log record which is a apply and update to a page,

464
00:49:07,739 --> 00:49:13,500
I will undo it and create a new log record for that called CLR that's coming. But I'll undo that

465
00:49:13,500 --> 00:49:17,819
and then I have to figure out what's the other change that this transaction made and this previous

466
00:49:17,819 --> 00:49:22,940
LSN allows me to string together the log records of the same transaction. So it's like a linked list

467
00:49:22,940 --> 00:49:27,500
for all the log records. Remember I may have hundreds of transactions happening. They are all doing

468
00:49:27,500 --> 00:49:32,700
their work, they are grabbing this LSN. So for a given transaction, its logs are scattered all

469
00:49:32,700 --> 00:49:36,940
across this LSN. They are monotonically increasing, but they are not sequentials, strictly sequential.

470
00:49:38,460 --> 00:49:43,260
So this is just an optimization, very important optimizations without that your recovery protocol

471
00:49:43,260 --> 00:49:50,059
will be really slow and this picture I'll come back again to in a little bit, but the part,

472
00:49:50,299 --> 00:49:56,860
so ignore this undo next LSN just hinting one more LSN type is coming. I know your head is probably

473
00:49:56,860 --> 00:50:03,820
spinning at this point, right? I promise that's the last LSN we need. But to demonstrate the previous

474
00:50:03,820 --> 00:50:09,579
LSN, so imagine I've got a transaction that did an update, some other transaction ran, then this

475
00:50:09,579 --> 00:50:14,380
this a red transaction and a blue transaction, then the red transaction did a second update,

476
00:50:14,380 --> 00:50:21,019
then a few log records later did a third update. So its action was one, two, and three, but its

477
00:50:21,019 --> 00:50:26,700
LSNs are not sequential, right? There's gaps, gap of one here, gap of two here and so on.

478
00:50:27,579 --> 00:50:33,099
When you undo the transaction's work for an abotting transaction, you'll undo it in the

479
00:50:33,099 --> 00:50:38,140
reverse order. We'll talk about that in a little bit more detail, but intuitively we'll undo

480
00:50:38,140 --> 00:50:44,140
this update first for which we'll write a compensating log record, which will also have a

481
00:50:44,139 --> 00:50:50,460
previous LSN that says that's what I untied. And now when you undo that, this thing had a previous

482
00:50:50,460 --> 00:50:55,019
LSN that points to you too, and that's going to make it easy when you're doing the undo to say

483
00:50:55,019 --> 00:50:59,819
which action do I want to do next? Oh, I know where that record is. Otherwise, you have to traverse

484
00:50:59,819 --> 00:51:04,699
this chain backward and these two could be spread hundreds or millions of log records apart. It'll

485
00:51:04,699 --> 00:51:11,019
just be very expensive IO because all of that may not even fit on in memory, right? So it's just a

486
00:51:11,019 --> 00:51:16,699
chain. The previous LSN just changed together the transactions. The log records created by the

487
00:51:16,699 --> 00:51:22,460
same transaction. It's not essential, but will allow us to go back and figure out what were the

488
00:51:22,460 --> 00:51:27,179
log records for an individual transaction much more easily because these pointers help us.

489
00:51:29,980 --> 00:51:38,940
And we'll talk about undo LSNs and CLR in two slides. So what does it look like? I've got the,

490
00:51:38,940 --> 00:51:42,059
what is the abort scenario look like? Here, I've got the tail of the log.

491
00:51:43,820 --> 00:51:52,940
And now, besides the LSN, there's a previous LSN. In this case, there's no gaps in between just

492
00:51:52,940 --> 00:51:59,019
to make it all work in PowerPoint, but you saw that picture. There could be gaps. And when an abort

493
00:51:59,019 --> 00:52:05,579
happens, a bots don't have to be flushed to disk because if a transaction state is unknown,

494
00:52:05,579 --> 00:52:08,860
after a cover time, we're going to treat it like an abort. So unlike Comet, you don't flush

495
00:52:08,860 --> 00:52:14,460
about log records to disk. Eventually, we will end it, but in this case, when it's an abort,

496
00:52:15,099 --> 00:52:20,219
between the abort log record and the end log record are going to be a bunch of other log records,

497
00:52:20,219 --> 00:52:24,940
those are going to be the compensating log records. Okay? So that is the work and the

498
00:52:24,940 --> 00:52:29,500
aborting transaction has to do. And there'll be more log records that will be created over there.

499
00:52:30,779 --> 00:52:35,179
Okay. Question. Before we go to the compensating log records. And I promise that's the

500
00:52:35,179 --> 00:52:39,579
last log type because I've already introduced the checkpoint log records to you.

501
00:52:41,099 --> 00:52:46,059
Why do we need the previous LSN for this? Yeah. Don't need the previous LSN for this. We needed

502
00:52:46,059 --> 00:52:47,179
it in the recovery protocol.

503
00:52:52,699 --> 00:52:52,940
Yeah.

504
00:52:53,739 --> 00:52:56,859
Before the report details. Yes. We know in between the

505
00:52:58,139 --> 00:53:04,619
aborting transaction, there would be log records. Yeah. Got it. So the question is,

506
00:53:04,619 --> 00:53:08,299
can you clarify that aborted log transactions don't have to be flushed to disk?

507
00:53:08,299 --> 00:53:12,219
The abort doesn't have to be flushed to disk. And we'll see that in the recovery protocol

508
00:53:12,219 --> 00:53:17,659
in a little bit because we'll just redo and undo it. But if between the abort and the transaction

509
00:53:17,659 --> 00:53:21,179
and there was a Comet transaction of some of the transaction, then we would definitely have

510
00:53:21,179 --> 00:53:25,500
to flush that to disk. Right? And as we flushed that to disk, we left flushed everything,

511
00:53:25,500 --> 00:53:30,299
including the abort log record. And maybe part of the CLR for this transaction. And that's okay.

512
00:53:31,100 --> 00:53:35,580
So you won't go wrong ever flushing more to disk, but we're trying to minimize how much

513
00:53:35,580 --> 00:53:40,539
you have to flush because the disk I was expensive. Yeah. So it wouldn't be incorrect. But of course,

514
00:53:40,539 --> 00:53:44,140
if there's a Comet between those two, the Comet has to follow that second part of the right-hand

515
00:53:44,140 --> 00:53:46,780
log protocol. Questions? Yep.

516
00:53:52,460 --> 00:53:56,860
Very good. The question is, in the recovery phase, can other transactions be admitted?

517
00:53:56,860 --> 00:54:01,660
For this entire course, we're going to assume they cannot, but there are ways you can do certain

518
00:54:01,660 --> 00:54:08,300
things even at that stage. But we will say no right now. Okay? But it gets tricky pretty fast and

519
00:54:09,180 --> 00:54:13,980
certainly not during the analysis phase. Maybe during the undo phase, you can start to get a

520
00:54:13,980 --> 00:54:18,380
little crazier, but maybe even not there. You have to acquire the appropriate logs to lock the pages

521
00:54:18,380 --> 00:54:23,260
out into the dirty page table and not have anyone do anything with that. That's a quick answer.

522
00:54:23,260 --> 00:54:28,620
Doesn't make sense after you look at the video on Zoom, come talk to me during my office hours.

523
00:54:28,620 --> 00:54:31,900
So there are certain points where you can start to admit transactions even before the recovery is

524
00:54:31,900 --> 00:54:41,020
completely done. But ignore that if you didn't understand it. Okay. So last type of log record,

525
00:54:41,820 --> 00:54:47,180
the checkpoint log records are coming, but that you already kind of know is the compensating log

526
00:54:47,180 --> 00:54:53,100
record. And it has the last lesson that we need, which is the undo next lesson. Again, it's a

527
00:54:53,099 --> 00:55:01,339
convenience mechanism. An effectory what it says is if we go to the diagram that we have just a

528
00:55:01,339 --> 00:55:09,500
little a few slides ago. Here, as you can see, imagine I am CLR3, which is undying the update to

529
00:55:10,299 --> 00:55:14,860
the update third update that happened in this transaction. And let's say I crash here.

530
00:55:15,980 --> 00:55:22,539
I want to I will start by reading the end of the log and imagine CLR3 made it to this, to the log

531
00:55:23,340 --> 00:55:27,980
disc. This pointer simply helps me find you too fast. The next thing I need to undo.

532
00:55:27,980 --> 00:55:33,659
Otherwise, I have to follow this chain and imagine if I were over here, because I'm the second undo,

533
00:55:33,659 --> 00:55:38,699
I have to follow this chain counting how many CLRs I need. So it's one, and I have to skip that many

534
00:55:38,699 --> 00:55:44,460
to get to the next one. But CLR2 directly tells me that it's the next one to do. So again, it is not

535
00:55:45,179 --> 00:55:50,380
important, but it helps with all of these things, including and especially when you're trying to

536
00:55:50,380 --> 00:55:55,420
recover from during a crash. And by the way, that sounds like a made-up scenario, but it's extremely

537
00:55:55,420 --> 00:55:59,660
common because sometimes many times when something fails, the likelihood of that failure happening

538
00:55:59,660 --> 00:56:04,380
again is pretty high. Especially if the failure happened because the disc went bad. Once it starts

539
00:56:04,380 --> 00:56:11,900
to go bad, the second failure probably comes pretty fast. So it's again a convenient stop to go find

540
00:56:11,900 --> 00:56:18,059
these pointers back so that you know where to pick up work from. All right, so if you understand

541
00:56:18,059 --> 00:56:22,059
the diagram, then the rest of it is pretty straightforward. So let's just go through what the

542
00:56:22,059 --> 00:56:28,539
example looks like as we create these CLRs. So we'll start. In this case, we have transaction T1.

543
00:56:28,539 --> 00:56:35,259
We'll create, we are trying to abort it. So we will create a CLR, just given it a type CLR,

544
00:56:35,259 --> 00:56:40,699
and then it will have the before and after values, right? So that CLR is for that update, the last

545
00:56:40,699 --> 00:56:47,179
update that happened. And basically the before after values are essentially cross of what the

546
00:56:47,179 --> 00:56:55,500
update log record was. Okay? So we will, we will basically do that. And then this is the chain that

547
00:56:55,500 --> 00:56:59,819
I was talking about pictorially that you just saw again a convenient stop. If you didn't have the

548
00:56:59,819 --> 00:57:03,659
undue next cell lesson, you can still get a correct protocol. But these log chains can be large,

549
00:57:03,659 --> 00:57:08,460
right? In a heavy transaction system, for example, many of the in-memory database transaction systems

550
00:57:08,460 --> 00:57:16,379
will do hundreds of thousands, maybe millions of transactions per second. So logs can get very large,

551
00:57:16,380 --> 00:57:25,660
very fast. Okay? All right. And that's the picture that we are now familiar with. Okay? So CLRs

552
00:57:25,660 --> 00:57:33,500
are these things that will have these two log pointers. All right. So we'll write the log record

553
00:57:33,500 --> 00:57:41,260
when we do the abort. Then we'll analyze the transactions updates in reverse order. So in the slide

554
00:57:41,340 --> 00:57:47,020
as you saw, if I had an update followed by a second update and a third update, we'll undo the

555
00:57:47,020 --> 00:57:51,980
third update first, then the second, then the first. We'll update in reverse order.

556
00:57:53,340 --> 00:58:00,460
Okay? To get the correct result. And sidebar, if you didn't, don't understand the next sentence,

557
00:58:00,460 --> 00:58:05,900
we'll just let it be. Why do you have to strictly do in the reverse order? Because it may be that

558
00:58:05,900 --> 00:58:11,900
this update and this update were updating overlapping bytes. And if you didn't update in the exact

559
00:58:11,900 --> 00:58:16,539
reverse order, you won't reconstruct the world as of before. And if you didn't get that comment,

560
00:58:16,539 --> 00:58:19,660
let it be because it's going to be a 30-minute sidebar. Yep, question.

561
00:58:22,059 --> 00:58:27,900
What is that? The prevalescent is pointing to the previous log record that was created by that

562
00:58:27,900 --> 00:58:35,900
transaction. So for update log record 2, or if you see, in this example, the prevalescent is 11 saying

563
00:58:35,900 --> 00:58:42,940
I'm CLR1 and that was my previous log record in transaction T1, the whole bunch of other log records

564
00:58:42,940 --> 00:58:48,460
in between from 11 to 26. It's just reconstructing my chain of log records for me. Others have to

565
00:58:48,460 --> 00:58:52,059
reverse troubles back this log all the time, which is very expensive.

566
00:58:58,780 --> 00:59:05,740
Yeah, why do we need undue backs next to a lesson? So imagine I'm at CLR2 and that's where I pick up

567
00:59:05,740 --> 00:59:10,940
because you know maybe the transaction was partially aborted and system crashed. So if I'm at CLR2,

568
00:59:10,940 --> 00:59:19,420
now I need to find U1 to go apply CLR1. I could do that by chasing previous a lessons, but

569
00:59:19,420 --> 00:59:23,740
imagine instead of three updates, there were a million updates in this transaction. I love a long

570
00:59:23,739 --> 00:59:29,659
link list to traverse on disk. That'll be very slow. These link list are being traversed on disk.

571
00:59:30,379 --> 00:59:36,139
So this just gives me a fast pointer to get there. So it's an efficiency stuff not essential

572
00:59:37,099 --> 00:59:38,379
optimization. Yep.

573
00:59:41,019 --> 00:59:45,579
Are this CLR and to the restoring an actual operation that undoes something?

574
00:59:45,579 --> 00:59:50,859
Yeah, no, no, this is a CLR record. So it will say here's my before and after image,

575
00:59:50,860 --> 00:59:55,900
very much like you have your update stuff. So it will basically have the same thing as an update

576
00:59:55,900 --> 01:00:05,099
log record has. Yeah, sorry. Because it is a special type called CLR, which is have to be

577
01:00:05,099 --> 01:00:13,500
treated differently when you're dealing with the recovery protocol. It's semantically like an update

578
01:00:13,500 --> 01:00:22,059
log record, except it's saying I am an undo. So because you will undo, when you start, let's say I'm

579
01:00:22,619 --> 01:00:28,619
take this example, right? You don't want to you don't want to undo an undo, which also you can do,

580
01:00:28,619 --> 01:00:33,099
but essentially you don't want to undo an undo unnecessarily, right? It's the better answer.

581
01:00:33,099 --> 01:00:38,300
So here is the update log record. I'm going to undo that and I'm going to keep track of that.

582
01:00:38,300 --> 01:00:43,019
For all purpose, it is similar to that, except this will also have that undo next lesson.

583
01:00:43,019 --> 01:00:49,820
And it will also have that only the CLR log records are going to have this extra piece of

584
01:00:49,820 --> 01:00:56,380
information. All log records don't have that. So CLR is a little bit bigger. And right now in the

585
01:00:56,380 --> 01:01:00,940
diagram, it feels like all log records, including bigger than comment are the same size, but log files

586
01:01:00,940 --> 01:01:05,739
are usually variable length records and you won't unnecessarily waste fields because you're trying to

587
01:01:05,739 --> 01:01:12,779
be efficient with the log record size. Okay. All right. So now let's get to the checkpoints.

588
01:01:13,899 --> 01:01:17,579
We'll start with a very simple checkpoint. As I said at the beginning of the lecture,

589
01:01:17,579 --> 01:01:23,099
the checkpoints purpose is to tell the master log record tells you where to start the recovery

590
01:01:23,099 --> 01:01:29,579
process from. So it's to limit the amount of work that you have to do. So the simplest way to do

591
01:01:29,579 --> 01:01:35,819
the checkpoint, that algorithm, I know that, but just introducing the idea is to say, all right,

592
01:01:36,380 --> 01:01:40,779
I've got a million transactions running in the system right now. I'm going to stop any new

593
01:01:40,779 --> 01:01:45,340
transactions from coming in. I'm going to drain out all these transactions. Let them finish.

594
01:01:45,340 --> 01:01:50,059
Right. So drain out. Let them finish. It'll create their log records, they'll get flush, whatever

595
01:01:50,059 --> 01:01:56,380
they need to flush out to disk. And then I have a state of the world. What I'll do at that point

596
01:01:56,380 --> 01:02:01,180
is I can take all the dirty pages that are in the buffer pool. I've stopped everyone right from

597
01:02:01,180 --> 01:02:09,900
running. Flush it out to disk. So everything that is committed is all on disk. Everything is clean.

598
01:02:09,900 --> 01:02:15,019
Nothing too undue. Nothing too worry about. I've got a clean snapshot of a database that is correct

599
01:02:15,019 --> 01:02:20,860
effectively. But what the challenge with that is if I've got a buffer pool that's a million pages,

600
01:02:20,860 --> 01:02:25,500
it'll take a, you know, writing a million pages out. And sometimes you might have buffer pools that

601
01:02:25,500 --> 01:02:30,380
are even larger than that because you have terabyte memories. You will have stopped the world for

602
01:02:30,380 --> 01:02:34,300
a very long time. So there was a question that was asked about like when can transactions start to

603
01:02:34,300 --> 01:02:38,860
run? You don't want to check point, which is an efficiency thing to stop the world for a long time.

604
01:02:38,860 --> 01:02:46,219
Could be hours. All right. So the other way you can do, which is also a bad protocol, is to say,

605
01:02:46,219 --> 01:02:51,900
I've got, let's say three pages in memory and transaction that is running is updating page three

606
01:02:51,900 --> 01:02:58,780
and will eventually go and update page one. What I'll do is I will not stop everything as we were

607
01:02:58,780 --> 01:03:05,740
doing before, but I will pause everything. I don't have to do the draining business, right? But I'll

608
01:03:05,740 --> 01:03:10,380
pause everything and then either checkpoint record is just going to go through all the pages is one to

609
01:03:10,380 --> 01:03:15,099
three. Usually you'll go through it in the sequential order, flush them out to disk. But then once my

610
01:03:15,099 --> 01:03:20,139
checkpoint is done, transaction T1 comes in and updates page one. Effectively what you have on disk

611
01:03:20,139 --> 01:03:25,579
is not a stable snapshot. It has got partially committed changes. So it's not as clean. Your recovery

612
01:03:25,579 --> 01:03:30,619
protocol is still complicated, but you pause for a little amount of time. Little better, but still

613
01:03:30,619 --> 01:03:35,420
pretty bad. We're going to do something that's going to make the recovery protocol a little bit more

614
01:03:35,420 --> 01:03:41,099
complicated, but we'll make checkpointing a lot faster. So to do that, we're going to introduce

615
01:03:41,099 --> 01:03:46,779
the final two data structures, which is an active transaction table and a dirty page table.

616
01:03:46,940 --> 01:03:56,620
Every time a new transaction comes into the system, we're going to create its entry in a table that

617
01:03:56,620 --> 01:04:02,140
is called an active transaction table. We'll just say this is the transaction ID that was assigned to

618
01:04:02,140 --> 01:04:08,140
you. That's a different number, right, from the log sequence number. Your status at this point,

619
01:04:08,140 --> 01:04:15,340
you're active or you could have committed a botted or ended. And the last lesson that you grab as a

620
01:04:15,340 --> 01:04:20,860
transaction to do some change. Initially that field is empty. And then the transaction status could

621
01:04:20,860 --> 01:04:29,740
be I'm running, completed or I need to be undone. The dirty page table is going to keep track of

622
01:04:29,740 --> 01:04:36,780
every page in the buffer pool that has been dirty, but whose changes have not been flushed out to

623
01:04:36,780 --> 01:04:41,340
disk. And you can see how it would be pretty easy to keep track of this information in the buffer

624
01:04:41,340 --> 01:04:48,220
pool manager that you build. And that will keep track in the dirty page table of recalesson,

625
01:04:49,500 --> 01:04:56,380
which is the log record that first calls that entry to be dirty. And effectively that recalesson

626
01:04:56,380 --> 01:05:02,620
will be kept over there. And when you flush the page out, you will add it to that page's recalesson.

627
01:05:02,620 --> 01:05:06,300
Like we talked about, you can update it at that point, which is usually what you would end up doing.

628
01:05:07,260 --> 01:05:13,019
So now we have a slightly better checkpoint where here's the log record on the right hand side.

629
01:05:13,019 --> 01:05:17,100
As you can see, there's a bunch of big ins and comets and there's a checkpoint log record that is

630
01:05:17,100 --> 01:05:23,340
created. Now this checkpoint log record is going to have copies of that ATT and DPT

631
01:05:23,980 --> 01:05:30,220
as part of its log record. So that log record is big. Imagine I have a million active transaction

632
01:05:30,219 --> 01:05:36,939
that ATT table is a million entries long. So it could be megabytes in size. The dirty page table

633
01:05:36,939 --> 01:05:41,019
could be pretty large too. If I've got a very large buffer pool and everything is dirty,

634
01:05:41,019 --> 01:05:48,379
that could be megabytes, hundreds of megabytes maybe even more. But what I'll do is I'll have in

635
01:05:48,379 --> 01:05:53,980
that checkpoint record my ATT and DPT. So in this case, let's assume there was T1 and T2.

636
01:05:54,940 --> 01:06:01,099
At the first checkpoint, assuming P11 was plus to this, in my DPT, what is only left when I'm doing

637
01:06:01,099 --> 01:06:06,539
the checkpoint is 22. So it's only what's in the DPT, which I'm maintaining is what will get stored.

638
01:06:07,179 --> 01:06:12,699
And I'll keep creating these checkpoint periodically based upon some criteria. Maybe it's like

639
01:06:12,699 --> 01:06:18,780
every five minutes. If I really want recovery to be fast. And essentially, whatever is active in

640
01:06:18,860 --> 01:06:24,220
those tables will be what we'll go create. So no real rocket science here. The magic is going to

641
01:06:24,220 --> 01:06:30,380
start coming in a little bit. Okay, so the next step is what people end up really doing. And that is

642
01:06:30,380 --> 01:06:36,540
called a fuzzy checkpoint. So the previous technique that I told you was much better than stopping the

643
01:06:36,540 --> 01:06:42,540
whole world and draining all the transactions. But it still required us to grab that dirty page table

644
01:06:42,779 --> 01:06:49,820
and other table and basically do all of that work. We're going to optimize that a little bit and say

645
01:06:50,619 --> 01:06:55,900
because that checkpoint, when it started, it will basically copy all of that stuff, write all of

646
01:06:55,900 --> 01:07:02,380
that out to disk and then be done. But that disk I was going to be super expensive. So what if we

647
01:07:02,380 --> 01:07:06,380
could do something really simple, which is to say, I need to pause, but I'll pause for a very

648
01:07:06,380 --> 01:07:12,700
little amount of time. I've got a hundred megabyte and a one gigabyte ATT and DPT respectively.

649
01:07:12,700 --> 01:07:17,340
So I'll latch both those structures for a short amount of time, make copies of that in memory.

650
01:07:19,099 --> 01:07:22,860
And just while doing that, and copying memory is much faster than writing to disk, right?

651
01:07:22,860 --> 01:07:28,140
Autos of magnitude. So yeah, I'll stop the world, but for a very little amount of time, I will

652
01:07:28,780 --> 01:07:34,300
then start writing that to disk in a separate checkpoint record. So when I start my checkpoint,

653
01:07:34,300 --> 01:07:39,740
I'll grab the big and checkpoint record, write that to the log buffer pool. Don't have to flush it.

654
01:07:41,580 --> 01:07:49,180
I'll make copies, then prepare my commit log record, which is big. But after my big and commit log

655
01:07:49,180 --> 01:07:53,500
record, I've unlatched both the ATT and DPT. I just got a consistent snapshot of both of those.

656
01:07:54,060 --> 01:07:58,539
Other transactions can keep making changes to it and then eventually I will write, I'll get a chance

657
01:07:58,539 --> 01:08:06,139
to write my commit, checkpoint end log record, which is this massive log record with all this

658
01:08:06,139 --> 01:08:12,300
information. None of this has to be flushed to disk by the way. You may want to flush the checkpoint

659
01:08:12,300 --> 01:08:16,539
log record to disk for efficiency to really get that recovery guarantee. That's typically what

660
01:08:16,539 --> 01:08:23,100
is done. The end checkpoint log record is often flushed to disk. And if you did, if it didn't make it

661
01:08:23,100 --> 01:08:29,100
to disk, you'll just have to start recovery from way further back. So that's what we'll do. So if you

662
01:08:29,100 --> 01:08:35,020
look at this example, we'll start. And you can see now there's a big and checkpoint log record,

663
01:08:35,020 --> 01:08:41,180
which is where those copies will only pause for that short amount of time to make that copy.

664
01:08:41,180 --> 01:08:46,940
And then the IO disk IO for this or preparing that log record, even preparing that log record may

665
01:08:46,939 --> 01:08:58,139
take you a bunch of time. The checkpoint is correct as of this time point in the LSN sequence number,

666
01:08:58,139 --> 01:09:02,859
except the information for this is coming late. So all that we did is split that work into two parts

667
01:09:02,859 --> 01:09:08,139
and allow the checkpointing process to be more efficient and block the world for as little time as we can.

668
01:09:09,339 --> 01:09:13,259
And there are things you can do to block it for even less because if I've got a million entries in

669
01:09:13,260 --> 01:09:18,539
the buffer pool, even doing that, you can latch and pieces in portions of it and have everyone

670
01:09:18,539 --> 01:09:23,820
going the right direction, but again, there are optimizations to make this even better and to stop

671
01:09:23,820 --> 01:09:28,619
the world for even less amount of time. But already we've gotten a lot better from where we are.

672
01:09:28,619 --> 01:09:32,940
And by and large, this fuzzy checkpoint gives you the biggest efficiency from the other

673
01:09:32,940 --> 01:09:42,300
simpler types of checkpoints that we talked about. And then we will record the checkpoint in the master

674
01:09:42,300 --> 01:09:47,100
record, you're going to record the begin checkpoint log number because that's really where the

675
01:09:47,100 --> 01:09:53,340
checkpoint happened. So we'll flush that, flush these things out to this typically, the end checkpoint,

676
01:09:53,340 --> 01:09:57,420
but record in the master the begin checkpoints location because that's from where the recovery needs

677
01:09:57,420 --> 01:10:05,420
to start. All right, so now, and this is basically just saying the ATT and DPT are constructed

678
01:10:05,739 --> 01:10:11,579
based on that. So if you see here in ATT, it is T2 because T1 ended, so it didn't need to be in the

679
01:10:11,579 --> 01:10:18,380
ATT, right? That could have been removed from the ATT in the ATT that we create when you see the end

680
01:10:18,380 --> 01:10:26,060
is when you can remove it from the ATT table. And T2 is in the ATT in that end checkpoint log record.

681
01:10:27,260 --> 01:10:31,500
Even if it had committed, it doesn't have a commit here, but if it had a commit here, but the end

682
01:10:31,500 --> 01:10:36,460
wasn't there, it would still be in the ATT. So the end log record is just for ATT management.

683
01:10:36,460 --> 01:10:40,939
It's to remove it from the ATT after which you don't have to worry about it. And again,

684
01:10:40,939 --> 01:10:45,260
that details as to why you do that. We are not going to worry excessively about that in this class,

685
01:10:45,260 --> 01:10:52,539
beyond just that statement of M8. Okay? There are no answers even there. All right. So we have to get

686
01:10:52,539 --> 01:10:57,420
to the recovery protocol. It's pretty fast now, even though it's only 10 minutes left because if

687
01:10:57,420 --> 01:11:03,260
you understood everything so far, it's really simple and that's all the machinery we needed to make

688
01:11:03,260 --> 01:11:07,899
this aeries work really well. We already talked about their three phases, so let's just get to it.

689
01:11:08,619 --> 01:11:14,220
We'll start. So we've got all these log records. We followed right-hand logging protocol. We've got

690
01:11:14,220 --> 01:11:18,619
these different types of log types and we've got checkpoints and we're going to start by recovering

691
01:11:18,619 --> 01:11:25,020
from a crash. So at the crash point, we will go and consult the master log record to figure out where

692
01:11:25,020 --> 01:11:30,060
the checkpoint log record is. If one doesn't exist, we'll start from the fullest log record in the file.

693
01:11:31,020 --> 01:11:37,660
Okay? Then we will go and analyze the system from top to bottom from that start checkpoint

694
01:11:37,660 --> 01:11:42,860
all the way up to the last log record we have to reconstruct the ATT and DPT. We'll see that in

695
01:11:42,860 --> 01:11:49,660
our next slide. Then we will find from the dirty page table that we reconstructed, which is the

696
01:11:49,659 --> 01:11:57,739
smallest recalism, which is the largest log record that costs some page potentially to be dirty

697
01:11:57,739 --> 01:12:03,500
in the buffer pool that we have to reapply changes to. We'll reapply all of those changes even though

698
01:12:03,500 --> 01:12:08,059
there might be stuff here that we don't need to apply to keep the algorithm simple. As you revisit

699
01:12:08,059 --> 01:12:11,899
this lecture, you'll say, I could have optimized something here to keep it simple. We are going to

700
01:12:11,899 --> 01:12:16,220
reapply in the whole world as that. Try to optimize the hell out of this your protocol. That's already

701
01:12:16,220 --> 01:12:20,380
complicated. We'll get so complicated. You're very likely to have a subtle bug that's going to

702
01:12:20,380 --> 01:12:25,980
break your system. So don't muck with it. Just reapply. Maybe you'll do a little extra work. It's worth it.

703
01:12:25,980 --> 01:12:30,220
Just take more frequent checkpoints that will help flush pages from the buffer pool that will help

704
01:12:30,220 --> 01:12:37,180
reduce all this work. Then we'll do the undo, which is going to go backwards and that's going to go

705
01:12:37,180 --> 01:12:42,539
up to the oldest log record of a transaction that was active and needs to be aborted at the time of

706
01:12:42,539 --> 01:12:49,180
the crash. So let's go through each of these. Analysis space is going to, I'll just explain this with

707
01:12:49,180 --> 01:12:55,979
a picture. Then I'll come back to that slide. Analysis space is going to start with, let's say we have

708
01:12:56,619 --> 01:13:03,260
checkpoint record and the end checkpoint log record. We'll start to reconstruct the ATT and DPT.

709
01:13:03,260 --> 01:13:07,500
We'll start here. Just a checkpoint record. That's where the master record points us, right?

710
01:13:08,140 --> 01:13:12,380
Then we'll come here and say, oh, this is the first time I'm seeing transaction T96.

711
01:13:13,420 --> 01:13:18,220
I'm in the recovery protocol. My ATT has been destroyed. It's been lost because it was in DRAB

712
01:13:18,220 --> 01:13:23,739
and reconstructing it. So I'll say, I know what must have happened. The transaction table at that point

713
01:13:23,739 --> 01:13:29,020
must have T96. But at this point, I don't know what happens to T96. Maybe I'll see a commit later.

714
01:13:29,020 --> 01:13:34,060
Maybe I won't. Right now, I'm just going to say I don't know what the status is. I'm going to mark

715
01:13:34,140 --> 01:13:41,100
you as a U, which means you need to be under. Then I also noticed that page 33 is modified.

716
01:13:41,100 --> 01:13:46,620
It must have existed in the dirty page table. Now I will record the record lesson, which is the

717
01:13:47,900 --> 01:13:53,740
log record 20. Remember that would also be in the page itself, but we are not fetching the page.

718
01:13:53,740 --> 01:13:58,620
We are just looking at the log record right now. Only looking at the logs, we are not fetching the page yet.

719
01:13:59,500 --> 01:14:06,059
We'll say, I'm going to guess you were about 20. You were exactly 20. That's fine. I could be

720
01:14:06,059 --> 01:14:13,340
conservative, but I'll be correct. Then keep moving forward. I'll hit the checkpoint log record.

721
01:14:13,340 --> 01:14:19,739
That's what my ATT looked like. You'll say, oh, there's a 97 there. I'm going to add you here.

722
01:14:20,300 --> 01:14:25,260
I'm going to mark you as a U. Then I'll also notice the dirty page table, which is part of the

723
01:14:25,260 --> 01:14:33,420
log record. I'll update my dirty page table to have page 20. I'm assuming this 0.8 came in from

724
01:14:33,420 --> 01:14:41,340
this DPT. I couldn't fit it all in this slide. Then I get to this summit log record, which tells me

725
01:14:41,340 --> 01:14:49,180
that 96 has to be committed. It gets a C level. Then we keep going up to the transaction.

726
01:14:49,180 --> 01:14:55,100
It says, oh, I can actually remove 96 from the transaction table. Don't need to worry about it,

727
01:14:55,100 --> 01:15:00,140
but pages it may have changes still here. That's okay. Transaction table just needs to,

728
01:15:00,140 --> 01:15:03,659
ATT just needs to keep track of the transactions that I still need to worry about.

729
01:15:06,220 --> 01:15:12,780
That's all the analysis based on. It's going to reconstruct the ATT and DPT.

730
01:15:13,739 --> 01:15:18,619
Again, if this phrase doesn't make sense, conservatively, it might be overly conservative,

731
01:15:18,619 --> 01:15:21,259
but it'll be correct as of the time of the crash.

732
01:15:21,260 --> 01:15:28,460
So, can that definitely be modified or could have modified?

733
01:15:34,860 --> 01:15:41,980
Transaction 96 may have modified P33. That doesn't matter because P33 changes,

734
01:15:41,980 --> 01:15:46,380
we will flush to this. So just wait for the redo phase. The ATT is simply saying,

735
01:15:46,380 --> 01:15:53,180
what transactions do I need to worry about? It doesn't say that undo transaction 96 is work.

736
01:15:53,180 --> 01:15:57,180
Transactions 96 work will show up in the redo phase. So just hold on to that for a minute.

737
01:15:57,180 --> 01:16:00,699
It's just saying what transactions do I need to worry about further? It is not changing the

738
01:16:00,699 --> 01:16:07,340
commit status of that transaction. All right, redo phase best to go through it with an example,

739
01:16:07,340 --> 01:16:14,060
and then I'll come back to it if it's not clear. So here is, maybe I actually might need to do this

740
01:16:15,020 --> 01:16:18,780
part. This part is important. So the redo phase, we are going to reapply the log records from

741
01:16:18,780 --> 01:16:27,580
start to the end, and the critical part is that as I do need this part here. We are going to

742
01:16:27,580 --> 01:16:33,420
reapply all the history, and you saw this dirty page table that we have here, which is 33 and

743
01:16:33,420 --> 01:16:42,220
page 20, and it tells me the log records here are 20 and 08. What does that 08 tell you? That's

744
01:16:42,220 --> 01:16:51,659
a recalessant saying page 20, 08 was the first log record after the checkpoint record that

745
01:16:51,659 --> 01:16:57,420
messed it up, that made some change to it. That may not or may have made it to this, but everything

746
01:16:57,420 --> 01:17:03,740
before 08 is on this, I know that for sure. Now, 08 may also be on this, and if 10 was a log

747
01:17:03,740 --> 01:17:08,140
record for that page that may also be on this, I don't know that till I find the page.

748
01:17:08,700 --> 01:17:13,020
But it tells me I don't need to go any further than the smallest of these two numbers,

749
01:17:13,020 --> 01:17:17,100
there could be a large number of pages in my log record to reapply all the changes.

750
01:17:17,740 --> 01:17:23,180
And imagine page 20 had 8 applied to it. When I bring the page up, I will look at the page

751
01:17:23,180 --> 01:17:29,420
LSN, and if it says I am 10, I will not apply the 8 log record. I'll just throw it away.

752
01:17:29,900 --> 01:17:35,579
But at this point in the analysis phase, all I've done is collected that piece of information,

753
01:17:35,659 --> 01:17:40,699
but that 30 page table tells me I do not need to go any further back than the

754
01:17:40,699 --> 01:17:46,779
min of those numbers in the 30 page table, in this case min of 28, and from that I'll just

755
01:17:46,779 --> 01:17:50,699
blindly start reapplying all of the log records to get my redo phase.

756
01:17:52,619 --> 01:17:59,340
And in this redo phase, we will do the following, which is apply all these transactions,

757
01:18:00,060 --> 01:18:01,579
and whoops.

758
01:18:05,420 --> 01:18:15,020
And as we see the update log record, we will see is that page in the dirty page table. So

759
01:18:15,020 --> 01:18:18,699
at this point, we are still going through the logs from that 0, 8 in that example,

760
01:18:19,340 --> 01:18:25,180
and say, okay, is the page that this log record refers to in the dirty page table? If it is not,

761
01:18:25,659 --> 01:18:31,980
its changes are safe. I don't need to worry about it. If it is, so far we are only reading logs,

762
01:18:32,700 --> 01:18:37,740
now I go fetch the page in question, expensive, right? So we're trying to avoid doing this as much as

763
01:18:37,740 --> 01:18:44,380
possible. And then we are going to check, when we bring that log record, we will say,

764
01:18:44,380 --> 01:18:50,619
is the affected page, it's in the dirty page table, but the log records LSN, the log that I've

765
01:18:50,699 --> 01:18:56,699
just encountered in the redo phase, if it is less than the page, the recollection on the page that

766
01:18:56,699 --> 01:19:02,699
I just fetched from disk. So this came to us from the recollection on that page. And this

767
01:19:03,420 --> 01:19:08,619
comes from the log record that we are trying to redo, if that is behind it, then I know this has

768
01:19:08,619 --> 01:19:14,859
been applied already. Otherwise, I will apply it. Now, I have a modified version of that page in

769
01:19:14,859 --> 01:19:20,140
the buffer pool, right? So I'm doing all the work that I do as my transaction was going forward,

770
01:19:20,140 --> 01:19:25,180
and I will proceed to go do all of that. So I'll just explain that with an example, and then I'll

771
01:19:25,180 --> 01:19:32,940
talk about the undo phase. So here, I've got this checkpoint log record. I have got this abort.

772
01:19:33,900 --> 01:19:40,780
Sorry, I will have to do the undo phase to make that example work. So redo, as we'll see in a little

773
01:19:40,780 --> 01:19:46,460
bit, is going to the analysis phase reconstructed the dirty page table and ATT as of the time of the

774
01:19:46,460 --> 01:19:51,819
crash. redo is going to reconstruct the database as of the time of the crash. Now, the last thing we

775
01:19:51,819 --> 01:19:58,300
need to do is we need to undo all the transactions that are explicitly aborted. They will have an U

776
01:19:58,300 --> 01:20:03,659
in the ATT or transactions that were running at the time of the crash, which will also be a U in the

777
01:20:03,659 --> 01:20:09,100
ATT because when we started the analysis phase, every transaction got a U with it. So all the U's in

778
01:20:09,100 --> 01:20:16,300
the ATT now have to be undone. So now, what we'll do is the transaction table tells us the last log

779
01:20:17,100 --> 01:20:24,060
record for each of the transactions that need to be undone. Let's say it is 9 and 14. We will take

780
01:20:24,060 --> 01:20:32,300
the max of those two, which is 14, undo that, and then write a CLR. From that CLR, we'll say for that

781
01:20:32,300 --> 01:20:38,140
transaction that we just undid what is the next update log record we need to undo. Let's say that

782
01:20:38,140 --> 01:20:45,020
is 6. So now, we have 6 and 9. As the next log we need to undo. We'll do 9. So we can mix and match

783
01:20:45,020 --> 01:20:49,580
the log changes from other transactions. Basically, you're picking the largest number first

784
01:20:51,100 --> 01:20:56,780
in this reverse order. And that's all to allow the safe way so that if two transactions now

785
01:20:56,780 --> 01:21:01,660
had changes happening to overlapping bytes of data, you get that correctly. So this reverse thing

786
01:21:01,660 --> 01:21:05,740
has to happen by looking at the max transaction number that we have to undo.

787
01:21:06,380 --> 01:21:10,460
And you can look at the slide later on to get that idea. Now, let's go to this example.

788
01:21:11,260 --> 01:21:16,060
We'll start. And I'll see if Andy wants to redo this for example in the next class. I'll just take

789
01:21:16,060 --> 01:21:21,659
one moment. I know I'm over time. So I'll stop. But we'll create that compensating log record for

790
01:21:21,659 --> 01:21:29,100
transaction T1. Basically, we'll undo this update that happened here. And we'll mark that LSN

791
01:21:29,100 --> 01:21:35,659
as 10 saying that's the next one I want to undo, which basically that was for T2. So we simply end

792
01:21:36,300 --> 01:21:41,899
it. And then this is the previous LSN chain. Now we can go and undo the other transaction. And then

793
01:21:41,899 --> 01:21:48,139
so on. Okay. So that was just the abort for T2 that happened followed by the changes to T1.

794
01:21:48,139 --> 01:21:53,500
Now if I crashed over here, I can come back. So that's the same thing as before. Imagine I'm doing

795
01:21:53,500 --> 01:21:59,260
that undo phase. I've crashed over here. I've reconstructed my ATT and DPT. So assume that is

796
01:21:59,260 --> 01:22:04,460
correct. I have got 50 and 60 as the ones that I need to undo next because that's what the

797
01:22:04,539 --> 01:22:11,180
last LSN is. We'll take the max, which is 60. Find that log record. Undo that. Write it CLR.

798
01:22:11,819 --> 01:22:18,939
Then keep going on until we are done with all of that. And we are done. So basically at the end of

799
01:22:18,939 --> 01:22:23,659
this, the nice thing about this is that it crashes even during restart because we are repeating

800
01:22:23,659 --> 01:22:29,819
history and redoing everything. Life is going to be safe and it all works out. All right. I know I'm

801
01:22:29,819 --> 01:22:34,219
over time. I'll see if Andy can go through this full example one more time because it would probably

802
01:22:34,219 --> 01:22:39,979
make sense to take five minutes in there. I'll let you read slide 44 and slide 45 as to

803
01:22:39,979 --> 01:22:44,059
additional things that you can do for performance improvement because you might have questions related

804
01:22:44,059 --> 01:22:49,979
to that. But hopefully you got a decent idea for the mechanisms of what Aries has of log gain

805
01:22:49,979 --> 01:22:56,699
following right ahead, logging protocol and having this three phase algorithm. So Andy will start the

806
01:22:56,779 --> 01:23:00,779
last three lectures, which is about distributed database. Sorry, we went a little bit over time,

807
01:23:00,779 --> 01:23:11,659
but we'll end this with music and I hope I see you guys around the database corridor.

