---
title: CMU15445 P20F202319 DatabaseLogging
---

1
00:00:00,000 --> 00:00:28,000
All right, Shubham, I think you have a couple announcements.

2
00:00:28,000 --> 00:00:30,000
You had something to share with the class?

3
00:00:30,000 --> 00:00:32,000
Yeah, happy Diwali to everyone.

4
00:00:32,000 --> 00:00:33,000
How was your Diwali?

5
00:00:33,000 --> 00:00:36,000
It was good, it was good, but it's like shifted, right?

6
00:00:36,000 --> 00:00:42,000
So the Diwali in India just happened, but then there's a US Diwali that's happening the next weekend, because everyone has to do it twice.

7
00:00:42,000 --> 00:00:43,000
So yeah.

8
00:00:43,000 --> 00:00:45,000
I mean, that was nice.

9
00:00:45,000 --> 00:00:50,000
And my goal was to visit me all the weekend and she was really interested in finding goals and in flowering.

10
00:00:50,000 --> 00:00:54,000
And we came into the lab, so there was an interesting conversation.

11
00:00:54,000 --> 00:00:57,000
Thank you, Andy, and you did that.

12
00:00:57,000 --> 00:01:03,000
And I might be playing a couple of shows next weekend, so I'll post you guys on that as well.

13
00:01:03,000 --> 00:01:04,000
Great, wonderful.

14
00:01:04,000 --> 00:01:06,000
Thank you.

15
00:01:06,000 --> 00:01:09,000
All right, we have a bunch to cover today.

16
00:01:09,000 --> 00:01:17,000
So we have a few things left over from the multi-version concurrency control part that we just started discussing last class.

17
00:01:17,000 --> 00:01:22,000
And I'm going to spend about like 20, 25 minutes on the MVCC.

18
00:01:22,000 --> 00:01:29,000
And there's some portions of this that, depending on how much we make through today,

19
00:01:29,000 --> 00:01:36,000
might just relegate to stuff that you read on your own that won't be material for the exam, but I'll tell you when we hit that point.

20
00:01:36,000 --> 00:01:45,000
And then what you want to do for the bulk of today is to get started on the recovery component, which is going to be split across today and the next lecture.

21
00:01:45,000 --> 00:01:49,000
So if you remember, we were doing this multi-version concurrency control.

22
00:01:49,000 --> 00:01:57,000
So if I go back a couple of slides, we were essentially doing things where as changes were happening to these objects,

23
00:01:57,000 --> 00:02:00,000
we were creating these chains of objects.

24
00:02:00,000 --> 00:02:04,000
So let's go to slides seven, where there you go.

25
00:02:04,000 --> 00:02:08,000
So you saw how in this case, A was being read and written a bunch of times.

26
00:02:08,000 --> 00:02:12,000
And what was happening in the databases, we were keeping track of all those versions.

27
00:02:12,000 --> 00:02:21,000
We had to begin an end time stamp that basically told us, what is that value like A zero is valid from 0 to 1, from 1 to 2.

28
00:02:21,000 --> 00:02:25,000
There's a different value and two onwards till sometime in the future.

29
00:02:25,000 --> 00:02:27,000
There's a third value.

30
00:02:27,000 --> 00:02:29,000
So that's what multi-version does.

31
00:02:29,000 --> 00:02:31,000
It's going to create these different versions.

32
00:02:31,000 --> 00:02:36,000
And now we, the readers are going to come in and find the right versions to work with.

33
00:02:36,000 --> 00:02:40,000
So multi-version is really, really popular.

34
00:02:40,000 --> 00:02:49,000
And in fact, if you look at the systems that use it, just about every modern system will use multi-version concurrency control.

35
00:02:49,000 --> 00:02:56,000
Now, we'll go and dig into the details of the other components that we need besides MVCC.

36
00:02:56,000 --> 00:02:59,000
We need a version management component as we talked about.

37
00:02:59,000 --> 00:03:04,000
And with those versions, you can decide which version of readers are allowed to see based upon their time stamp.

38
00:03:04,000 --> 00:03:09,000
But we have a couple of other things to discuss about the MVCC design considerations.

39
00:03:09,000 --> 00:03:15,000
So you're going to try and knock through most of this today and see how far we can get.

40
00:03:15,000 --> 00:03:20,000
And we are time-bucketing about 25 minutes to cover this component.

41
00:03:20,000 --> 00:03:28,000
So we've talked about a whole bunch of concurrency control protocols, optimistic concurrency control, two-faced locking.

42
00:03:28,000 --> 00:03:33,000
So the natural question you may be asking is, how is this related to MVCC?

43
00:03:33,000 --> 00:03:39,000
So the best way to think about this is that MVCC is a mechanism that tells you how to maintain multiple versions.

44
00:03:39,000 --> 00:03:45,000
You still need a way to protect that mechanism with a concurrency control protocol.

45
00:03:45,000 --> 00:03:51,000
Multi-version basically creates a linked list of different versions.

46
00:03:51,000 --> 00:03:56,000
And at some point, there is some writer that's potentially writing and creating a new version.

47
00:03:56,000 --> 00:03:58,000
We saw in those examples.

48
00:03:59,000 --> 00:04:04,000
So obviously, we have to guard against things like two people trying to write and create new values.

49
00:04:04,000 --> 00:04:08,000
Like if you have a single linked list, only one person can add to that linked list at the time.

50
00:04:08,000 --> 00:04:11,000
So only one person can be creating a new version at the time.

51
00:04:11,000 --> 00:04:19,000
And so we're going to have a concurrency control mechanism that we need in addition to the mechanism of keeping these versions.

52
00:04:19,000 --> 00:04:27,000
What this version stuff allows is that if I am a transaction that is reading something and my timestamp allows me to do that,

53
00:04:27,000 --> 00:04:31,000
I can read an older version and the readers can get past the writers.

54
00:04:31,000 --> 00:04:33,000
The writers don't block the readers.

55
00:04:33,000 --> 00:04:40,000
If the readers have the right timestamp or they have the appropriate serialization, serialization order, where they can pass through.

56
00:04:40,000 --> 00:04:45,000
In two-faced locking, if I grab the right lock, there's only one version.

57
00:04:45,000 --> 00:04:46,000
Everyone has to wait for it.

58
00:04:46,000 --> 00:04:48,000
A reader has to wait for it.

59
00:04:48,000 --> 00:04:53,000
And that's where we started to relax things with the intentional locking and things like that.

60
00:04:53,000 --> 00:04:59,000
But still, writers will block readers in the end case with two-faced locking.

61
00:04:59,000 --> 00:05:07,000
So the concurrency control protocols you have, you can see I can do a multi-version, which is a mechanism to allow what can be read at what time.

62
00:05:07,000 --> 00:05:09,000
You're keeping these different versions around.

63
00:05:09,000 --> 00:05:17,000
Can be combined with optimistic concurrency control, where you'll just run the three-faced protocol, except in the private workspaces, where you'll keep these new versions.

64
00:05:17,000 --> 00:05:24,000
Or two-faced locking, where you'll use locking for objects that are getting created like the writers, not interfering with writers.

65
00:05:24,000 --> 00:05:33,000
Or if a reader needs to read that version that is being written because the timestamp says you need to be at a version that has been written, they'll have to wait for that.

66
00:05:33,000 --> 00:05:36,000
So locking can be used to do that.

67
00:05:36,000 --> 00:05:38,000
You can also do something very simple.

68
00:05:38,000 --> 00:05:43,000
You're not going to talk about that, but timestamp ordering where you have some mechanism for picking a timestamp.

69
00:05:43,000 --> 00:05:46,000
And then use that to determine the serial order.

70
00:05:46,000 --> 00:05:57,000
Effectively, all that says you can come up with even simpler mechanisms where you say, I grab a timestamp, let's say at the beginning of the transaction, and I only read versions as of my timestamp, which is kind of what snapshot isolation does.

71
00:05:57,000 --> 00:06:00,000
So you can get that data protocol.

72
00:06:00,000 --> 00:06:04,000
What we're going to concern ourselves with is these other topics now, right?

73
00:06:04,000 --> 00:06:10,000
There are five things we need to talk about in addition to MVCC as a mechanism that creates this version.

74
00:06:10,000 --> 00:06:14,000
The first one was concurrency control. They're going to start knocking these other things down.

75
00:06:14,000 --> 00:06:18,000
Like, next thing we're going to look at is, how is the storage for this version maintained?

76
00:06:18,000 --> 00:06:21,000
It's a single link list that we are maintaining.

77
00:06:21,000 --> 00:06:23,000
What are the different ways of organizing that?

78
00:06:23,000 --> 00:06:29,000
Just as we looked at what are different ways of organizing records and pages and structures like that.

79
00:06:29,000 --> 00:06:33,000
So let's get to the version storage.

80
00:06:33,000 --> 00:06:42,000
Now, we are creating these version chains and these version chains have these beginning and timestamps that are associated with it.

81
00:06:42,000 --> 00:06:46,000
And there are different ways in which we could create these version chains.

82
00:06:46,000 --> 00:06:51,000
As we'll see, for all of the remainder topics that we have for MVCC for each of those mechanisms,

83
00:06:51,000 --> 00:06:57,000
each of these addition things that we need to consider for MVCC, we'll see there are some number of options.

84
00:06:57,000 --> 00:07:02,000
There'll be three, four, five options, and then each one of them will have their pros and cons.

85
00:07:02,000 --> 00:07:07,000
So the first question we are going to look at with version storage is, how do we store these versions?

86
00:07:07,000 --> 00:07:10,000
Guess what? There are three ways to do it.

87
00:07:10,000 --> 00:07:14,000
Both of them have their pros and cons and some historical context.

88
00:07:14,000 --> 00:07:21,000
The first one is a Pandone Lee storage where I'm going to create the chains, kind of like what we've been seeing in the diagram so far.

89
00:07:21,000 --> 00:07:30,000
We're in the same table where the record is, you're going to create the version way, the components of those records.

90
00:07:30,000 --> 00:07:40,000
Time travel, which is used by systems that didn't have MVCC, but then realize that, wow, with MVCC you can get a lot more concurrency, especially for the readers.

91
00:07:40,000 --> 00:07:48,000
So they slapped on a mechanism to keep versions by saying, I'll just create a second copy of the table where all my versions are maintained and we'll see that in a little bit.

92
00:07:48,000 --> 00:07:54,000
The preferred way is delta storage. If you're building an MVCC system from scratch, that's kind of what you will use.

93
00:07:54,000 --> 00:07:59,000
So what's the simplest? It's kind of what our diagrams have been.

94
00:07:59,000 --> 00:08:12,000
So here I've got two records A and B and the entire records, even though only one value is being shown, like 111 in the first one, think of it as being the entire record.

95
00:08:12,000 --> 00:08:25,000
That's what's getting stored in the table. And as you create new versions, you will create that essentially as a new record in that same table, in that same physical table or the physical file that is keeping track of all the records in there.

96
00:08:25,000 --> 00:08:36,000
That's because the new record has the same schema. All of them now have this additional, what is shown as a pointer, but that pointer is like that big and end time stamp and bunch of other information that's associated with it.

97
00:08:36,000 --> 00:08:45,000
So you'll just create the new version and then you'll maintain the pointers internal, right? So you can think of it as your slotted page organization being used to create a file.

98
00:08:45,000 --> 00:08:56,000
And in that file, you have record IDs. So A0 is a record ID. A1 is a different record ID, but this is extra field of pointer that chains them together and allows you to maintain your singly linked list.

99
00:08:56,000 --> 00:09:10,000
Right? Pretty straightforward. Easy to implement if you start with this slotted page organization and you had extra fields that you're designing the first place with this big and end time stamp to keep track of all these pointers.

100
00:09:10,000 --> 00:09:30,000
There is an interesting question where the version chain is a singly linked list. The question is where does a new version sit? Is it at the end of the chain or is there at the beginning of the chain and you could decide the implementation and their pros and cons to that from a perspective of what is easy to implement.

101
00:09:30,000 --> 00:09:47,000
It's very easy to implement something that goes from oldest to the new us because you just create a new record as we were just doing up over here. A new value, a value needs to be created, a new tuple, you just created at the end and then connect everything back to it like that.

102
00:09:47,000 --> 00:10:05,000
So oldest to new us is the easiest and that's what will get used as the mechanism in this last project assignment that you have in bus stop. But obviously the downside of that is if I have to find the latest version, I have to traverse the chain and notice these chains may actually be spread across multiple pages.

103
00:10:05,000 --> 00:10:12,000
So you may have to go through multiple pages to go get a record ID that you're interested in.

104
00:10:13,000 --> 00:10:26,000
The other way is new as to all this but that's more difficult to implement. It's kind of logically you have to create the new record, move everything around to get that the change to work in the reverse direction.

105
00:10:26,000 --> 00:10:35,000
And you'll see there's a circle point associated with both of these as to how does an index refer to the record ID right so if I create a three version.

106
00:10:36,000 --> 00:10:48,000
The chain for the record a as you saw in the slides a little while back is like I have an index which one does it point to and the implications of this oldest to newest to oldest will become a little bit more apparent as we go through some of that.

107
00:10:48,000 --> 00:10:57,000
But there are two ways that's all we need to know of organizing this list and it can go from one forward to backward or the other way around.

108
00:10:58,000 --> 00:11:01,000
So all the later the point to the question.

109
00:11:02,000 --> 00:11:12,000
Yeah so are you in the newest to oldest the question is how are you updating that so imagine this is you can just think of it as a single link list.

110
00:11:12,000 --> 00:11:24,000
And so here is a single link list maintained in a pen only storage going from oldest to newest if it's the other way around you just have to flip the pointers around so there's more pointer management stuff that you end up having to do.

111
00:11:25,000 --> 00:11:32,000
You create a new record that becomes the head and what does it mean to be at the head it means that's what someone else refers to if they're coming from outside.

112
00:11:33,000 --> 00:11:41,000
So it will become clear in a second as we get to the index box right the only thing you need to know is that yeah I can when I get to a record from somewhere else most of the time.

113
00:11:42,000 --> 00:12:03,000
Often from an index do I land on the oldest or the newest and depending on the scheme to find my newest record have to chase down the chain if it's newest to oldest if I'm only looking for new stuff which is often the most common pattern I'll find it right away I don't have to access a chain and these change can span across pages so it can be very expensive to chase this chain down.

114
00:12:03,000 --> 00:12:10,000
Okay all right second type of storage is time travel and this is systems that.

115
00:12:11,000 --> 00:12:32,000
Globden and NBCC system when they didn't have one before will use something like that which requires the least destructive change to your existing storage structure so here if I have a record and I create a new record a two it will get put in the main table and then I've got a time travel table and that time travel table I'll put the old values and the old values keep will keep getting accumulated.

116
00:12:33,000 --> 00:12:58,000
In that second table so now if I need if I'm a reader and I'm only allowed to read a two I will start from the main table go down to a second table which is a different file so obviously that's more expensive that way you won't ever get locality to chase down that you're crossing table boundaries but it doesn't disrupt the main table with just has a single copy the most recent copy and as you can see over here.

117
00:12:58,000 --> 00:13:07,000
And that most recent copy may not be the one that eventually gets committed will start talking about the recovery protocols a little bit but it's the most recent copy in the chain.

118
00:13:07,000 --> 00:13:10,000
At exists at that point in time.

119
00:13:10,000 --> 00:13:19,000
If you do time travel storage it implicitly gives you new us to all this yes that's correct that's a good observation.

120
00:13:19,000 --> 00:13:30,000
That's correct and basically it's done as you can imagine if you had a 30 year old database system and all of a seven NBC see is the way you get more

121
00:13:30,000 --> 00:13:35,000
concurrency especially for the readers this is the least disruptive change you would make to your system.

122
00:13:35,000 --> 00:13:39,000
Okay because your indices can keep pointing to the latest copy in the main table.

123
00:13:39,000 --> 00:13:43,000
All right and the record ID hasn't changed it's still in the same slot in the same page.

124
00:13:43,000 --> 00:13:48,000
Why is it a new installments like I get the head the service in the same version.

125
00:13:48,000 --> 00:13:52,000
The newest is there yeah so.

126
00:13:52,000 --> 00:14:02,000
Yeah and so here in this diagram as you can see it's a little weird a two is the oldest which is wanting to a one which is which is not necessarily the old the newest but.

127
00:14:02,000 --> 00:14:06,000
And you can flip it around and switch it around in a different way.

128
00:14:06,000 --> 00:14:17,000
So it's it can be hybrid between newest to oldest and oldest to newest but the newest copies always going to be in the main table through which you saw the access and that's the main point.

129
00:14:17,000 --> 00:14:33,000
A two is the newest one but you can imagine a weird scheme in which a two is in the main table but that points to something else that you know the chain for it become a one a two a three and a three is in the main table you could say yeah a three points to a one from the main table to the

130
00:14:33,000 --> 00:14:41,000
time travel table you can come up with schemes like that to be not purely newest to oldest but if you have to say which one it sort of makes more sense it's like the main table has a new

131
00:14:41,000 --> 00:14:50,000
way stuff right which is where you're starting your access from so you can do all kinds of fiber and with all of this stuff that's I'm going to speed through it a little bit even find like 50 different schemes and there's a full

132
00:14:50,000 --> 00:14:56,000
pledge paper which I'll leave you with because we could spend like four weeks just talking about NBC see.

133
00:14:56,000 --> 00:15:02,000
All right so master version in this case is going to be get written in place.

134
00:15:02,000 --> 00:15:14,000
All right so now let's go on and so here that just showing that the master is getting written the preferred ways this delta storage so far all of this storage if I made

135
00:15:14,000 --> 00:15:25,000
change to a single column I was actually making a full copy of the record and the record may have hundreds of columns so if I just changed one I'm doing everything I'm making a large amount of copy where the

136
00:15:25,000 --> 00:15:36,000
difference really small so delta storage is essentially that keyword diff and I'll only take the value the column that I'm changing which could be more than one in a given record depending upon what that

137
00:15:36,000 --> 00:15:53,000
update query is and I'm going to store in delta storage that the value that has changed and then keep track of that through through a pointer right so essentially the big difference between the delta storage and the other

138
00:15:53,000 --> 00:16:03,000
method is here you just keep track of just the value that has changed and this can get complicated to because there could be multiple values in a column that has changed as you can imagine you can

139
00:16:03,000 --> 00:16:08,000
generalize that stuff to only keep in track of the change that you've made.

140
00:16:08,000 --> 00:16:19,000
So I noticed that whether you use delta storage for our time travel you always keep the content of the data values in the other.

141
00:16:19,000 --> 00:16:27,000
When you update the main table or do you add it like after you update the main.

142
00:16:27,000 --> 00:16:37,000
Yeah yeah yeah so you're asking when do I make a change in the main table versus the delta storage table so again there's going to be a bunch of details but most of the time what you're going to do is you

143
00:16:37,000 --> 00:16:48,000
take the copy put it over there then update the value in that you'll move the old one step out to the where is your backup storage or where is the change storage before you make it because you

144
00:16:48,000 --> 00:16:58,000
remember that and you have to make that copy before because what happens if there's a crash between you making those changes and both the values are the same they'll have the same time stamp you can go clean some of that stuff if you needed to.

145
00:16:58,000 --> 00:17:18,000
Yeah yeah yeah and so you're getting into a little bit of this recovery protocols and the fact that sometimes you may want to undo some change because something about it absolutely all of that will happen with

146
00:17:18,000 --> 00:17:46,000
versioning too and you'll get to what we'll do like literally what we'll do is before we go and along with the changes that we make we'll also write what we are going to talk about next which is log records to maintain the change and then depending upon how you're using those log records you could do one of different schemes but we'll record stuff to undo things so all you need to know now is yeah that things can happen while you're making these changes that's the recovery stuff we'll start talking about where we'll keep track of logs to to be able to back ourselves out of some unsafe state if we see some changes.

147
00:17:46,000 --> 00:17:55,000
So that's out of some unsafe state if we started to make this change and things crash in the middle or the transaction about it right yeah good question.

148
00:17:55,000 --> 00:18:14,000
All right so delta storage is that transactions can recreate in all of these things transactions can recreate old values in the tuple based schemes which is go to the tuple and they get the whole thing here you can create old versions by applying the delta in the reverse order because it's creating is keeping track of the delta right even though it's not quite shown value is being changed.

149
00:18:14,000 --> 00:18:25,000
It will say it might have some sort of a delta associated with it and we'll talk about that from the logging perspective to with that notion of delta is effectively the same.

150
00:18:25,000 --> 00:18:43,000
Now the minute you have versions you also need to do garbage collection and because as you keep building the version chains lots of updates let's say happen to a record at some point the version chains will build up new readers are coming in they have a new time stamp no one's reading no reader has a time stamp that was really really old.

151
00:18:43,000 --> 00:18:59,000
So we need to clean up those versions and so there are again multiple ways in which you can go do this and you have to look for these expired versions and then we have to decide when it is safe to go and reclaim that.

152
00:18:59,000 --> 00:19:20,000
Now when it is safe to do this expired version is typically you're going to say I have some sort of transaction number or time stamp that I'm assigning to transactions and I kind of know what's the oldest transaction that is running in the system anything older than that I don't need so you have a way to go and figure out what portion of the tail of this version chain you can throw away.

153
00:19:20,000 --> 00:19:49,000
Now the question is when you have this type of garbage collection that you need now you determine what you can throw away when do you go about doing that again there are two approaches you can do it at the top level going through the chains and I'm just going to assume everything is at the top level the same thing will generalize if it's not and the two methods for the top level background vacuuming background thread does this cooperative cleaning is kind of where you bust your own tables right so when you see something wrong you go fix it that's the second approach.

154
00:19:50,000 --> 00:20:19,000
And then there's something to do at the transaction now so let's go through each of those techniques the top level GC is pretty straightforward I've got some background vacuuming thread that starts up every once in a while it goes and looks through all the place where the versions are right depending on the scheme is going to be in a different place and then it's going to say I know what the latest transactions are so as these things are getting changed you end up with a place where you say at this point I can determine.

155
00:20:20,000 --> 00:20:49,000
So I'm saying that a one the hundred anything with the version of hundred is no longer needed because I know all the transactions that are in the system no one needs a value older than hundred and I can basically go and start to vacuum those out and remove that now remember these version chains could be long they could be spread across different pages and things like that so this vacuuming process can be pretty expensive and making extensive changes to that entire database which should obviously is not just one file one table but it's just one table.

156
00:20:50,000 --> 00:21:20,000
So all the tables could have had this type of version management that is needed one optimization you could do in surf saying I'm always going to scan all the files from start to the end from the first page to the last page every time some update happens to a page will keep track of a simple metadata which might have one bit per page that marks the page as dirty so you've got a billion pages in your database and only 1000 of them were touched the vacuum process doesn't need to go and read the billion pages to determine have you been touched right is there a version tail in the

157
00:21:20,000 --> 00:21:29,000
are page that I need to clean up it will just go and look at the pages that are the ones that need this cleanup and only go and change those.

158
00:21:29,000 --> 00:21:43,000
Okay so that's an obvious optimization you build especially if you're doing this on a large scale cooperative cleaning is you know if you don't if you go to a sit down restaurant they'll bring all the food for you and take away the plates from you but if you go to a place where you're

159
00:21:43,000 --> 00:22:12,000
busing it yourself you'll go to the counter pick up your food and clean up your tray it's kind of like that with cooperative cleaning as you do the work the workers as they do the work will identify if they see something that needs to be cleaned up and they will do the cleanup themselves and sometimes it's like when do you do the cleanup while you're doing the work or after transaction comments those are the choices that we can make will ignore those comments but the difference is that you don't have a separate background thread that's doing that you basically do.

160
00:22:12,000 --> 00:22:40,000
You basically do a page forward style of work where imagine I am a transaction that wants to get a value a use an index to get to that that index now gets me to the a record but that a record imagine the chaining technique that we use is oldest to newest so it brings me to the head of the oldest I know what my time stamp is right so I know I don't need that I need to keep chasing it down till I get to the one that I should be reading.

161
00:22:40,000 --> 00:23:08,000
But as I do that since I'm already chasing down the version chain I'm bringing the pages into this if I need to might as a goal and help clean up till I get to the the value the record that I need to read which may by the way not be at the end of the chain right because it may be depending on what my transaction number is I should be reading that value a to and there may be newer versions behind it but whenever I need to stop I'll stop and clean up stuff before me.

162
00:23:10,000 --> 00:23:39,000
So I'm sure some some chain is really long that you never access yes so it can even happen that if I've got a chain that is really long and that record is no longer access it was very hot in 2020 and a billion you know Taylor Swift ticket counter and the Taylor Swift ticket counter for a venue was really popular and had a billion version chains million entries built up in the version chain now she is a very popular person.

163
00:23:40,000 --> 00:23:55,000
There's a new venue and no one's going and cleaning that up and that could happen you could ask a more philosophical question is why did the chains build up if everyone is cleaning up on the fly but will defer that sometimes they may be deferring that I thought that's what you're going to ask but that can that can happen.

164
00:23:55,000 --> 00:24:09,000
Okay and again as I said there are like so many million ways of combining these things in different ways that all you need to know is that there are these different schemes to do it and there are exclusive exclusive large number of ways in which you could combine all of this.

165
00:24:09,000 --> 00:24:23,000
I do want to get to the indexing part which is important but before we do that remember two slides ago we said garbage collection tuple level and transaction level right so we finished the tuple level stuff now let's go to the transaction level stuff.

166
00:24:23,000 --> 00:24:36,000
The transaction level stuff is very is different every transaction is going to keep track of all the stuff that it is doing including things that it is now out dating because it created new versions.

167
00:24:36,000 --> 00:24:52,000
A transaction knows right when it has added something to the version chain so in this approach as a transaction proceeds it's doing an update and then the second operation comes in it's creating these old versions the basic thing is when a transaction is done it knows that it's going to be a new version.

168
00:24:52,000 --> 00:25:21,000
It knows I created two versions one for record a one for record B and at that point a vacuum process can be handed over those versions and now that can determine saying by old is version I need is 10 onwards if all of these are less than 10 I can go clean it up right so the vacuum process doesn't have to go through each and every page even with that dirty page marker to German where these versions are transaction just handed over to you so the and those are the things that I'm going to do.

169
00:25:21,000 --> 00:25:33,000
And those are the things that need to get cleaned up so just a different way of doing that at clearing up the versions now this I want to suspend a little bit of time.

170
00:25:33,000 --> 00:25:53,000
The rest of this material I'll just basically leave it in slides and let you worry about it in other words index management is stuff up to all of this material material for exam questions with the last part I'm going to skim over and you don't need to worry about so pay attention now all right so

171
00:25:54,000 --> 00:26:02,000
indices point to object ideas to record ideas right imagine you have a slaughter page organization is going to say page number and the slot number.

172
00:26:03,000 --> 00:26:19,000
Now if I've got the primary key index and I could be updating the primary key and I'm making changes to that I now need to figure out how I'm going to keep track of that version chain and version chain stuff we can keep track of the techniques we talked about but now I have to go and update that primary key.

173
00:26:19,000 --> 00:26:37,000
That gets very tricky so often what happens when you're doing this versioning type of mechanism for primary key updates you'll basically treat it like a delete followed by an insert it makes the semantic clean and you won't have that version chain develop right because you delete everything's gone and do an insert.

174
00:26:37,000 --> 00:27:06,000
The problem becomes more interesting with secondary keys because they are more complicated right in some sense the primary key controls the record right because you're accessing the record the record idea and the primary key in many ways are analogous you can do these things like insert delete but for the secondary keys you can't do that right it is a secondary key and there's a very famous incident that happened at over a few years ago where they used to be on my sequel that had a good way of doing secondary indices.

175
00:27:07,000 --> 00:27:32,000
And Postgres doesn't have a good way so it is multi version both of them are multi version and as a result if you have lots of updates happening in your system the performance will go down quite poorly unless you have the good way of doing secondary indices so we'll talk about the good and the bad way and so Uber went back and changed it again to Postgres from Postgres to my sequel because they realize that this was a problem so you know they hadn't taken this class.

176
00:27:32,000 --> 00:28:01,000
So secondary indices are going to point to logical pointers and herons some is going to be the problem is like those are think of it as surrogate pointers they can control the object they can't really need to do this delete followed by an insert technique and the two approaches one is a logical pointer in a physical pointer so just look at it with a diagram I've got a version chain a for to a one and if I have a pendant stuff to it and let's assume this is newest to us.

177
00:28:02,000 --> 00:28:31,000
And same things will apply for other schemes but newest to all this is the is the interesting one I say get this value a from this primary key and I will go I'll get the record ID right that's what the index is going to have the record ID and I'll go find the record a for which is the fourth version of the record a but it's a physical record that I'm going to get I'm going to get a physical record ID and I can locate a for so far everything is good no problem but now you can see if the primary key is getting updated if I delete an insert it.

178
00:28:32,000 --> 00:29:01,000
Then I don't have to worry about a bunch of this the secondary indices however if I say get something which has to get to this record a the record ID is going to point to a for and that's okay except I could have multiple secondary indices on the record a you know it has five columns I could have built a secondary index on each of those five columns now each of these secondary indices is going to point to that first record for older the newest.

179
00:29:02,000 --> 00:29:28,000
So far everything is good nothing nothing bad has happened so far now you start to get into some issues which is if I have to go and update this value and create a new version a five what's going to happen and have to update a five I'll get a new record in a page fix the version change using these

180
00:29:28,000 --> 00:29:47,000
that we discussed maybe a delta storage now I have to go and update each of the secondary indices to have the record ID is point to the new a five which is a lot of updates so one update to the record will cause every secondary index to be updated.

181
00:29:47,000 --> 00:29:59,000
So you can see how this starts to become a huge problem right what would be the way to avoid it.

182
00:29:59,000 --> 00:30:15,000
I already showed you yeah good good good but you're paying attention that's great seen computer science in direction is a very powerful technique you know 50% of problems can be solved with in direction right so instead of secondary indices pointing to the record IDs what you would do is you would say.

183
00:30:15,000 --> 00:30:42,000
Because the primary key is kind of like a record ID the secondary index will say i'm just going to point to the primary key which does mean that when i'm accessing a record through the secondary key I have to go to the primary key and then get the record ID one extra hop if it's if it's hot that probably the primary key index is already in the buffer pool so it's not too bad but what that gives me is that now if I change a record all I do is make the changes in the primary index the secondary index stuff doesn't have to change.

184
00:30:42,000 --> 00:31:00,000
So single update to a single column think about an ubers case if they change the rate for a taxi service and that's changing all the time and that's one field that was changed in a record now all the indices have to change that just causes the massive problem enhance that huge performance problem.

185
00:31:00,000 --> 00:31:28,000
There's another way to do the in direction which is to say what if you had a global structure that converted double ID to the to some sort of an address in every one went to that into the primary key you could do that but no one does that because the primary key index is essentially that they've been proposals that talk about doing that because hey does this mean if I've to use this more fancy scheme which is better for performance with the secondary key indices that I must have a primary key index the answer is yes.

186
00:31:28,000 --> 00:31:41,000
The primary key index is typically always built because that's how the system enforces primary key constraint so you can assume special in that environment you have that so that scheme is basically the preferred scheme to do it.

187
00:31:41,000 --> 00:31:48,000
So if you're doing versioning with just about every system does you have to be careful as to what your secondary indices point to.

188
00:31:48,000 --> 00:31:51,000
Okay question.

189
00:31:51,000 --> 00:32:17,000
So this works well when you're new as to old as if my newest comes in an A5 it's got a new record ID right so in this case it'll have a new record ID that I need to point to.

190
00:32:17,000 --> 00:32:24,000
You could have said if I had oldest to newest I wouldn't have this problem which.

191
00:32:24,000 --> 00:32:37,000
So the primary key point was when it's point was the table index like where in the table you have to work yourself or do you have the point that actually.

192
00:32:38,000 --> 00:32:53,000
Yeah so depends on the scheme if I've newest to oldest every index is going to point to the newest head of the leg okay and so we said look for primary key updates we're going to assume that it's delete followed by an insert so ignore that case right we swept it away by.

193
00:32:53,000 --> 00:33:03,000
Different type of implementation so in this case now I've got newest to oldest and the version chain has build up a for is a new is which is being referred to by all the indices.

194
00:33:03,000 --> 00:33:13,000
Right so now if I add let's say a new a five version then all the secondary indices have to point to a five because you know they have to see the whole version chain to traverse through it.

195
00:33:13,000 --> 00:33:26,000
But in the time time version that in the same position you are saying in the time travel where I had my you're talking about the scheme number two where the main table had it yep.

196
00:33:26,000 --> 00:33:50,000
So that's right so in that scheme and you're exactly right in the scheme where we had a separate time travel table that was the lowest lift for someone to go and get MVCC they're the appointing to that main table so the record ID hasn't moved it's the same page ID slot ID and this problem is is is simpler over there absolutely.

197
00:33:50,000 --> 00:34:06,000
But as I said look there are all kinds of schemes that will go through that I don't want to spend an infinite amount of time in looking through all the combinations I believe you with a paper that talks about a lot of these combinations okay and then what are the different pros and cons but I'll take that final question before you move on.

198
00:34:06,000 --> 00:34:27,000
So you said for time travel you know but for Delta and you know again it will get into some other nuances even for time travel you can think about there's a version chain that's maintained but the head if it remains over there in the page ID and the record ID and it's updated in place then this problem doesn't happen if you have update in place and that's the head of that table.

199
00:34:27,000 --> 00:34:30,000
So how they have played for itself.

200
00:34:30,000 --> 00:34:49,000
You can come up with all kinds of schemes to avoid this problem but most systems will do some sort of version management that may end up having this problem just need you to be aware that if your record IDs are moving around then if you're using any sort of version management scheme and you're going to run to trouble like this okay.

201
00:34:49,000 --> 00:34:59,000
Okay good the rest of it from here onwards slide 27 onwards it's not going to be material for the exam so I'm just going to skim through it really fast.

202
00:34:59,000 --> 00:35:18,000
Because MVCC looks like the keys can be duplicate it turns out that even the primary keys if I'm using the scheme in which I'm updating a primary key and I have versions it'll kind of look like if you think about the implementation of B tree for typically for a primary key you have implemented to say I can never have a duplicate key but in some sense I'm going to do it.

203
00:35:18,000 --> 00:35:32,000
But in some sense the keys can have you may need duplicates for a little bit of time okay so again is a said I'm not going to go into the details for it but let you look for that and you can read the chapter in the book that talks about that but you have to worry about those components.

204
00:35:32,000 --> 00:35:45,000
There's also the issue of deletes again I'll let you read that by yourself but there are different ways to implement the delete function by keeping a delete flag or a tombstone flag this has to do with I've got a version chain and if I've deleted.

205
00:35:45,000 --> 00:36:14,000
There are different ways of deleting that and sometimes it's better to just mark a record has been deleted and then eventually it can get cleaned up or you can have a tombstone based approach to basically clean up this version within a in a two step process so again the details for this not material for the exam but I encourage you to read the textbook but up to here the key problem I do want you to know and we may ask you questions about that okay.

206
00:36:14,000 --> 00:36:37,000
Last piece over here just for those of you who have vocary or city is the there's an explosion in the combinations as you can achieve with all of these different ways what's my garbage collection what's my index doing is it pointing to a physical record ID or is it pointing to a logical record ID that I can create in one of many different ways including pointing to the primary index.

207
00:36:37,000 --> 00:37:06,000
What's the protocol I use to protect the right objects right as versions are getting created I still need to protect that new versions getting created and you can do two face walking or optimistic concurrency control post cases some combination is to PL and also a time order protocol so a lot of these things are feasible as combination if you're curious about the types of things that are feasible there are two papers that you may want to read that one is Andy had a beautiful paper on in memory MVCC so even a small number of people are going to be able to see the picture.

208
00:37:07,000 --> 00:37:36,000
The smaller version then on this based MVCC which is even more choices for you but even in that the explosion number of choices is huge and it is an excellent job here in a students of cataloging the different mechanisms giving them proper names and categories is a beautiful paper to read if you're interested in that and in memory MVCC super interesting because a lot of transactional databases fit in memory because today you can get a photo by server and very few transactional databases need a lot more than eight or 10 of them.

209
00:37:37,000 --> 00:37:45,000
So I think that's one of the things that I think is really important to me is to really do all of the work load including with replication and a little bit of fault tolerance.

210
00:37:46,000 --> 00:37:53,000
There's another paper if you wanted to go into a depth of one specific protocol I'd recommend the hackathon paper which is very clean.

211
00:37:53,000 --> 00:38:18,000
There's a guy that's got these guys at Microsoft including Paul Larson who's a giant in that field he's since retired but one of my students worked on this it's a very clean protocol as simple as all could make it without from others and it also has an interesting aspect because they had SQL server which is an on this stuff and they wanted to add this MVCC in memory stuff and they're very interesting ways in which they could clean the put that together.

212
00:38:18,000 --> 00:38:31,000
So hackathon is the in memory MVCC which can be put as an extension to SQL server which is an on this system so very clever engineering and a very clean protocol for the in memory case.

213
00:38:31,000 --> 00:38:47,000
So those of you have been asking a million questions I love that please go take a look at that these papers won't be covered in the graduate database class but if you're interested stop by my office or I'd be happy to walk you to the paper and take questions and I'm sure Andy would too.

214
00:38:48,000 --> 00:39:02,000
Alright you guys are doing a good job of making sure the exam is not going to have a lot of material so great but let's keep moving.

215
00:39:02,000 --> 00:39:13,000
Alright and let me just make sure sharing is still working great.

216
00:39:14,000 --> 00:39:37,000
Alright so we're going to talk about logging next and it's part of a two piece component we'll figure out how to log things so that we can make changes but if something crashes like some of the questions that were asked is like what happens if I'm adjusting this chain but I haven't finished fixing the chain or I fixed the chain and something bad happens.

217
00:39:37,000 --> 00:40:07,000
So I'm just going to talk about the things that are going to happen and I'm going to talk about the things that are going to happen and I'm going to talk about the things that are going to happen and I'm going to talk about the things that are going to happen and I'm going to talk about the things that are going to happen and I'm going to talk about the things that are going to happen and I'm going to talk about the things that are going to happen and I'm going to talk about the things that are going to happen and I'm going to talk about the things that are going to happen and I'm going to talk about the things that are going to happen and I'm going to talk about the things that are going to happen and I'm going to talk about the things that are going to happen and I'm going to talk about the things that are going to happen and I'm going to talk about the things that are going to happen and I'm going to talk about the things that are going to happen and I'm going to talk about the things that

218
00:40:07,000 --> 00:40:28,639
you've needed 4000 and I've earlier prepared all these things, but you haven't been able to pass through an online course or or actually it can be used for updates and Video Ads. there, and you can use

219
00:40:28,639 --> 00:40:30,119
Project 4 is on Conquerancy Control.

220
00:40:30,119 --> 00:40:33,960
It's going to be out today and that's due December 10th.

221
00:40:33,960 --> 00:40:35,480
So you have a little bit of time for it,

222
00:40:35,480 --> 00:40:36,559
but there's a bunch in there.

223
00:40:36,559 --> 00:40:39,920
So don't wait again to the last minute for going through that.

224
00:40:39,920 --> 00:40:43,319
And the write up on Fortune is going to be a little bit

225
00:40:43,319 --> 00:40:45,799
detailed because getting into Conquerancy Control,

226
00:40:45,799 --> 00:40:47,719
like optimization, it's hard.

227
00:40:47,719 --> 00:40:50,159
The optimization piece that you did was very light.

228
00:40:50,159 --> 00:40:54,119
But here we're going to have to get you into MVCC

229
00:40:54,119 --> 00:40:55,039
and stuff like that.

230
00:40:55,039 --> 00:40:57,599
So buckle up, it's going to be fun.

231
00:40:57,599 --> 00:41:00,679
But you're going to get to do some interesting things

232
00:41:00,679 --> 00:41:04,839
with MVCC and O2N type of version chains.

233
00:41:04,839 --> 00:41:06,400
A bunch of database talks.

234
00:41:06,400 --> 00:41:08,279
There are three more left in this.

235
00:41:08,279 --> 00:41:12,839
And I think this is the last three in the semester.

236
00:41:12,839 --> 00:41:16,239
I strongly recommend not missing, especially the Alibaba talk,

237
00:41:16,239 --> 00:41:19,039
because they're doing something at a massive scale.

238
00:41:19,039 --> 00:41:21,679
And it'll be super interesting to see what they talk about.

239
00:41:21,679 --> 00:41:25,360
The PG vector stuff and Chroma is coming after that.

240
00:41:25,360 --> 00:41:25,679
All right.

241
00:41:25,679 --> 00:41:28,399
So let's get to recovery protocols today.

242
00:41:28,399 --> 00:41:29,719
Really fun stuff.

243
00:41:29,719 --> 00:41:33,719
So you remember we had the asset components?

244
00:41:33,719 --> 00:41:37,159
So far, we've only done I, which is the isolation stuff.

245
00:41:37,159 --> 00:41:38,879
We still have A and D to cover.

246
00:41:38,879 --> 00:41:42,559
And C, as we talked about, is consistency based upon databases

247
00:41:42,559 --> 00:41:44,719
and integric constraints and other forms

248
00:41:44,719 --> 00:41:48,039
of defining what semantics need to be enforced and we

249
00:41:48,039 --> 00:41:48,839
will enforce that.

250
00:41:48,839 --> 00:41:52,399
So let's start getting into the recovery component,

251
00:41:52,399 --> 00:41:55,599
which is the last missing piece, to complete the asset components.

252
00:41:56,559 --> 00:42:00,000
So we're going to want transactions to be all or nothing.

253
00:42:00,000 --> 00:42:04,360
And we want to A part and we need transactions to be durable.

254
00:42:04,360 --> 00:42:07,239
So if transaction is declared committed,

255
00:42:07,239 --> 00:42:09,079
even after that, if the system crashes,

256
00:42:09,079 --> 00:42:12,799
the changes are recorded in the state of the database.

257
00:42:12,799 --> 00:42:17,759
So we'll start simple with motivation, simple transaction,

258
00:42:17,759 --> 00:42:19,519
reading writing stuff.

259
00:42:19,519 --> 00:42:21,839
And now we have a buffer pool, which obviously

260
00:42:21,839 --> 00:42:23,279
database systems have.

261
00:42:23,279 --> 00:42:25,400
But now we're going to make it explicit in our diagrams

262
00:42:25,400 --> 00:42:27,559
because it's because of the buffer pool

263
00:42:27,559 --> 00:42:30,280
that we're going to have to worry about a lot of things.

264
00:42:30,280 --> 00:42:32,280
So we bring in a page.

265
00:42:32,280 --> 00:42:34,639
The page has a lot of stuff, a lot of records,

266
00:42:34,639 --> 00:42:36,200
a lot of columns in each record.

267
00:42:36,200 --> 00:42:39,800
But one of them is that value A that we are trying to write,

268
00:42:39,800 --> 00:42:43,440
the column A. And we'll go bring that in.

269
00:42:43,440 --> 00:42:46,720
And then when we write it, we will go and update that

270
00:42:46,720 --> 00:42:48,599
in the buffer pool.

271
00:42:48,599 --> 00:42:49,760
That's what we do.

272
00:42:49,760 --> 00:42:51,840
The updates happen in the buffer pool.

273
00:42:51,840 --> 00:42:57,640
Now, at the time that we get to do a commit, what do we do?

274
00:42:57,640 --> 00:43:02,160
To get durability, we could insist on taking any change

275
00:43:02,160 --> 00:43:04,960
that has been made and push it out to disk.

276
00:43:04,960 --> 00:43:07,160
And if we do that, we will get durability.

277
00:43:07,160 --> 00:43:09,360
But it will be very slow.

278
00:43:09,360 --> 00:43:11,200
But let's say we have other protocols

279
00:43:11,200 --> 00:43:14,519
that don't require us to flush everything to disk at

280
00:43:14,519 --> 00:43:16,039
commit time because this transaction could

281
00:43:16,039 --> 00:43:18,480
have touched the billion records and the billion pages.

282
00:43:18,480 --> 00:43:20,240
You don't want to flush a billion pages.

283
00:43:20,239 --> 00:43:22,119
But what happens if the power goes out?

284
00:43:22,119 --> 00:43:24,799
Or someone zaps the memory?

285
00:43:24,799 --> 00:43:27,879
And if they zaps the memory, we've committed the transaction.

286
00:43:27,879 --> 00:43:31,519
But the change was only in the buffer pool and we've lost it.

287
00:43:31,519 --> 00:43:35,599
So we don't have a durable transaction anymore.

288
00:43:35,599 --> 00:43:38,959
There is Andy's picture of saying a bad guy comes and zaps it.

289
00:43:38,959 --> 00:43:40,759
So all right.

290
00:43:40,759 --> 00:43:43,039
So that's what crash recovery is all about.

291
00:43:43,039 --> 00:43:46,279
And we have to go and get this atomicity and durability

292
00:43:46,279 --> 00:43:47,399
components.

293
00:43:47,399 --> 00:43:49,199
And we're going to do this in two parts.

294
00:43:49,199 --> 00:43:50,079
So there are two lectures.

295
00:43:50,079 --> 00:43:52,839
Today we'll talk about the first part is what actions

296
00:43:52,839 --> 00:43:56,199
do we need to take during regular transaction processing

297
00:43:56,199 --> 00:43:59,279
to create stuff that we need to recover from.

298
00:43:59,279 --> 00:44:01,279
The second part, which is once you have

299
00:44:01,279 --> 00:44:04,960
kept stuff that you need to keep around, how do you recover?

300
00:44:04,960 --> 00:44:07,879
That's the second lecture on Wednesday.

301
00:44:07,879 --> 00:44:11,319
So today, what do we need to do?

302
00:44:11,319 --> 00:44:16,079
So here are the six things that we need to worry about.

303
00:44:16,079 --> 00:44:18,399
First, we'll talk about why failures happen.

304
00:44:18,400 --> 00:44:20,440
Then we'll talk about buffer pool policies

305
00:44:20,440 --> 00:44:21,920
because that is at the heart of why

306
00:44:21,920 --> 00:44:24,400
we need to do these fancy new things.

307
00:44:24,400 --> 00:44:26,119
And then we'll talk about two different mechanisms,

308
00:44:26,119 --> 00:44:27,960
shadow paging and right-ahead logging

309
00:44:27,960 --> 00:44:30,840
as a way of keeping track of changes that we make.

310
00:44:30,840 --> 00:44:32,960
And I'll tell you, shadow paging is a bad idea.

311
00:44:32,960 --> 00:44:34,880
It's what old system you use.

312
00:44:34,880 --> 00:44:36,680
It has all kinds of issues.

313
00:44:36,680 --> 00:44:38,599
I will only touch upon it and then

314
00:44:38,599 --> 00:44:41,920
move to right-ahead logging, which is the main part that we need.

315
00:44:41,920 --> 00:44:43,680
And then we'll talk about some of the logging schemes,

316
00:44:43,680 --> 00:44:47,240
what do you put in these logs and then checkpointing.

317
00:44:47,239 --> 00:44:50,799
So first, we're going to have to concern ourselves

318
00:44:50,799 --> 00:44:52,919
with these different storage types.

319
00:44:52,919 --> 00:44:54,519
And we've talked about this.

320
00:44:54,519 --> 00:44:56,839
I'm going to go to the next slide and come back to it.

321
00:44:56,839 --> 00:44:58,919
You remember this slide on the right that we had,

322
00:44:58,919 --> 00:45:02,279
which is, which talked about data is in different places.

323
00:45:02,279 --> 00:45:05,079
And there's a reason why we have processor caches and DRAM

324
00:45:05,079 --> 00:45:08,679
and SSDs and slow SSDs and fast SSDs.

325
00:45:08,679 --> 00:45:10,679
Because as you go down this hierarchy,

326
00:45:10,679 --> 00:45:13,919
you get more capacity, but it's also slower.

327
00:45:13,919 --> 00:45:16,519
And you don't want to have all the data

328
00:45:16,519 --> 00:45:19,840
be in the lowest capacity, let's say SSD or a spinning disk.

329
00:45:19,840 --> 00:45:21,599
If you didn't have a buffer pool, the database system

330
00:45:21,599 --> 00:45:22,679
would be very slow.

331
00:45:22,679 --> 00:45:25,400
So we want to use the highest level, which

332
00:45:25,400 --> 00:45:28,639
is going to be volatile storage, which is DRAM.

333
00:45:28,639 --> 00:45:30,639
Because that's where you want to make all of your changes.

334
00:45:30,639 --> 00:45:32,400
That's fast.

335
00:45:32,400 --> 00:45:34,440
But it's volatile.

336
00:45:34,440 --> 00:45:36,759
The non-volatile storage, the SSD layer,

337
00:45:36,759 --> 00:45:40,759
is where you want to make sure you put your changes in there

338
00:45:40,759 --> 00:45:44,280
so that if the bad guy comes in and zaps the DRAM,

339
00:45:44,280 --> 00:45:47,120
the volatile storage, you still can provide this durability

340
00:45:47,120 --> 00:45:50,600
property that you have to guarantee.

341
00:45:50,600 --> 00:45:51,920
Now, this is a third type of storage

342
00:45:51,920 --> 00:45:55,480
described in the text book, which is real, called stable storage.

343
00:45:55,480 --> 00:45:58,120
And that basically is something that

344
00:45:58,120 --> 00:46:00,680
survives all possible failure scenarios.

345
00:46:00,680 --> 00:46:02,640
Such a theoretical storage doesn't exist,

346
00:46:02,640 --> 00:46:06,440
but you can come close by making replicas of everything

347
00:46:06,440 --> 00:46:06,960
that you do.

348
00:46:06,960 --> 00:46:09,280
You can replicate the disk and synchronize

349
00:46:09,280 --> 00:46:12,360
the replicas using distributed transaction protocols.

350
00:46:12,360 --> 00:46:15,160
We'll talk about that in the last three lectures of the class

351
00:46:15,160 --> 00:46:16,760
briefly.

352
00:46:16,760 --> 00:46:19,960
So stable storage, we won't touch at all today.

353
00:46:19,960 --> 00:46:22,920
So we want dirty pages to sit.

354
00:46:22,920 --> 00:46:24,160
Now, we'll just concern ourselves

355
00:46:24,160 --> 00:46:26,360
with the two-tier scenario for the remainder

356
00:46:26,360 --> 00:46:30,599
of today's lecture and tomorrow, which is buffer pool in DRAM.

357
00:46:30,599 --> 00:46:33,800
And that gets spilled out to some stable storage, like SSD

358
00:46:33,800 --> 00:46:38,400
or disk, which can survive a power failure.

359
00:46:38,400 --> 00:46:40,039
So let's begin.

360
00:46:40,039 --> 00:46:41,720
Why do transactions fail?

361
00:46:41,719 --> 00:46:43,359
There are multiple reasons.

362
00:46:43,359 --> 00:46:46,039
First, transactions can fail because there

363
00:46:46,039 --> 00:46:48,559
are logical errors in the transaction.

364
00:46:48,559 --> 00:46:54,480
I updated a record and ops the integrity constraint

365
00:46:54,480 --> 00:46:58,039
fail or a constraint on the database fail, the C part.

366
00:46:58,039 --> 00:47:00,759
So now I need to abort this transaction.

367
00:47:00,759 --> 00:47:03,919
Or it could be the transaction failed

368
00:47:03,919 --> 00:47:05,919
because everything that it's doing is fine,

369
00:47:05,919 --> 00:47:08,439
but it's deadlocking with another transaction.

370
00:47:08,439 --> 00:47:10,759
And sorry, but you got picked as a transaction

371
00:47:10,760 --> 00:47:12,600
that needs to be killed.

372
00:47:12,600 --> 00:47:15,320
So transactions can fail for a variety of reasons.

373
00:47:15,320 --> 00:47:19,000
And that will all get part of the atomicity and durability

374
00:47:19,000 --> 00:47:21,040
that we are doing because a transaction that has failed

375
00:47:21,040 --> 00:47:23,000
may have already started to make some changes.

376
00:47:23,000 --> 00:47:26,640
We'll have to undo all of those changes.

377
00:47:26,640 --> 00:47:31,000
They can also be system failures, such as surprise, surprise,

378
00:47:31,000 --> 00:47:32,800
software sometimes have bugs.

379
00:47:32,800 --> 00:47:34,960
Operating systems sometimes has bugs.

380
00:47:34,960 --> 00:47:37,560
So your system could crash for a software failure.

381
00:47:37,560 --> 00:47:39,080
And part of the work may have been done.

382
00:47:39,080 --> 00:47:40,560
Transaction has not committed.

383
00:47:40,559 --> 00:47:43,279
Or it has committed the changes were in buffer pool.

384
00:47:43,279 --> 00:47:45,960
And we still need to make sure the right thing happens.

385
00:47:45,960 --> 00:47:47,639
There could be hardware failures.

386
00:47:47,639 --> 00:47:49,599
In the early days of data centers,

387
00:47:49,599 --> 00:47:53,000
there is to be a failure that the meta guys then

388
00:47:53,000 --> 00:47:55,480
called Facebook had written papers about saying,

389
00:47:55,480 --> 00:47:57,159
the DRAMs that were put on the servers

390
00:47:57,159 --> 00:47:59,079
because all of them were so close by.

391
00:47:59,079 --> 00:48:00,599
And they hadn't really figured it out

392
00:48:00,599 --> 00:48:02,400
as to what happens at that scale, not just them,

393
00:48:02,400 --> 00:48:03,279
but everyone.

394
00:48:03,279 --> 00:48:04,920
The DRAM chips would come off.

395
00:48:04,920 --> 00:48:06,799
And one of the common failures was after a little while,

396
00:48:06,799 --> 00:48:08,159
live into everything was fine.

397
00:48:08,159 --> 00:48:10,159
The DRAM chips would just come off their slots.

398
00:48:10,159 --> 00:48:12,679
Now they glue it most of the time.

399
00:48:12,679 --> 00:48:14,399
Don't want that to happen.

400
00:48:14,399 --> 00:48:16,199
So hardware could fail for a variety of reasons.

401
00:48:16,199 --> 00:48:17,639
It could be something like that.

402
00:48:17,639 --> 00:48:21,639
Or it could be the part actually failed, the system crashes,

403
00:48:21,639 --> 00:48:23,199
all kinds of things that happen.

404
00:48:23,199 --> 00:48:24,559
One thing we're going to assume today

405
00:48:24,559 --> 00:48:27,559
is that the non-walletized storage, the SSD or the disk,

406
00:48:27,559 --> 00:48:29,000
does come back and has the contents

407
00:48:29,000 --> 00:48:30,559
because we don't have this ideal storage

408
00:48:30,559 --> 00:48:32,039
with the replication stuff.

409
00:48:32,039 --> 00:48:34,960
So just reiterating that component.

410
00:48:34,960 --> 00:48:39,199
The storage media could fail, where you thought

411
00:48:39,199 --> 00:48:41,559
you wrote a page to disk, but it actually didn't get rid

412
00:48:41,559 --> 00:48:42,079
in the disk.

413
00:48:42,079 --> 00:48:43,960
Driver came back and said, yeah, it's written.

414
00:48:43,960 --> 00:48:45,759
But the bit Scott corrupted on that.

415
00:48:45,759 --> 00:48:48,119
We've talked about bit rotting and other kinds of things.

416
00:48:48,119 --> 00:48:49,960
You will need other types of mechanisms

417
00:48:49,960 --> 00:48:51,879
with the replication to deal with that.

418
00:48:51,879 --> 00:48:53,119
And again, we won't cover that.

419
00:48:53,119 --> 00:48:55,799
We will assume that something else takes care of that.

420
00:48:55,799 --> 00:48:57,960
We'll concern ourselves with just this two-tier stuff

421
00:48:57,960 --> 00:49:00,000
that we talked about, OK?

422
00:49:00,000 --> 00:49:03,199
Where the primary storage is in this non-walletized DRAM

423
00:49:03,199 --> 00:49:06,759
storage and the main storage is in this walletile storage.

424
00:49:06,760 --> 00:49:09,360
Now what we need to do as a database system

425
00:49:09,360 --> 00:49:12,120
is to make sure committed transactions

426
00:49:12,120 --> 00:49:15,160
changes make it to the stable storage.

427
00:49:15,160 --> 00:49:16,880
And no partial changes are left around.

428
00:49:16,880 --> 00:49:18,680
Even if they made it to durable storage,

429
00:49:18,680 --> 00:49:22,680
we can unwind ourselves from that.

430
00:49:22,680 --> 00:49:25,440
We need two key mechanisms to do this.

431
00:49:25,440 --> 00:49:28,640
One is called undo, which is whoops.

432
00:49:28,640 --> 00:49:31,840
I put something into stable storage,

433
00:49:31,840 --> 00:49:35,280
into the non-walletile storage, that

434
00:49:35,280 --> 00:49:38,720
was changes made by a transaction that got aborted,

435
00:49:38,720 --> 00:49:40,240
because it was a transaction failure.

436
00:49:40,240 --> 00:49:42,360
One of these are the failures we talked about.

437
00:49:42,360 --> 00:49:44,040
And now I need to undo that.

438
00:49:44,040 --> 00:49:46,840
And the other one is redo, which is, oh, the committed

439
00:49:46,840 --> 00:49:49,320
transaction made changes that were just in the buffer pool.

440
00:49:49,320 --> 00:49:50,680
But the transaction is committed.

441
00:49:50,680 --> 00:49:53,640
We told the world that the transaction has committed.

442
00:49:53,640 --> 00:49:57,920
But now we need to go and reapply those changes.

443
00:49:57,920 --> 00:50:00,640
So those are the two mechanisms that we need to build

444
00:50:00,640 --> 00:50:02,640
into our system.

445
00:50:02,639 --> 00:50:05,960
So another example is start with the buffer pool.

446
00:50:05,960 --> 00:50:07,440
And you read a page.

447
00:50:07,440 --> 00:50:09,719
You get the page, which has a bunch of things in it,

448
00:50:09,719 --> 00:50:11,480
including the A value.

449
00:50:11,480 --> 00:50:12,279
You write it.

450
00:50:12,279 --> 00:50:13,719
You have a new value.

451
00:50:13,719 --> 00:50:16,839
Then stuff happens where these change

452
00:50:16,839 --> 00:50:20,440
by a different transaction on the same page,

453
00:50:20,440 --> 00:50:23,079
as where A is that was updated by transaction T1.

454
00:50:23,079 --> 00:50:26,599
So now two transactions have made changes to the same page.

455
00:50:26,599 --> 00:50:28,440
And remember, we moved stuff from the buffer pool

456
00:50:28,440 --> 00:50:30,879
to the disk in pages.

457
00:50:30,880 --> 00:50:33,360
So now this page has two different things

458
00:50:33,360 --> 00:50:35,000
from two different transactions.

459
00:50:35,000 --> 00:50:38,760
T2 commits, what do we do at this point?

460
00:50:38,760 --> 00:50:42,320
If we said we can flush that page to disk

461
00:50:42,320 --> 00:50:46,119
to ensure that T2's changes are durable,

462
00:50:46,119 --> 00:50:49,400
we will also carry along with us A's changes.

463
00:50:49,400 --> 00:50:53,760
And A's outcome is T1's outcome to A is not yet known.

464
00:50:53,760 --> 00:50:54,840
We don't know what's going to happen.

465
00:50:54,840 --> 00:50:57,960
Because if we flush all of that to disk,

466
00:50:57,960 --> 00:50:59,920
ultimately, T2 could abort.

467
00:50:59,920 --> 00:51:04,280
And we need to go unwind the changes that made it to disk.

468
00:51:04,280 --> 00:51:06,360
So there'll be all kinds of schemes you can come up with.

469
00:51:06,360 --> 00:51:09,639
We'll categorize this into a nice quad chart shortly.

470
00:51:09,639 --> 00:51:13,360
But basically saying, because things are on the same page

471
00:51:13,360 --> 00:51:16,000
and the buffer pool can move things around in pages,

472
00:51:16,000 --> 00:51:17,880
in a given page, might be changes

473
00:51:17,880 --> 00:51:20,039
for multiple transactions in different states.

474
00:51:20,039 --> 00:51:24,760
And we have to make everything work with that scenario.

475
00:51:24,760 --> 00:51:25,519
All right?

476
00:51:25,519 --> 00:51:27,280
So if T2 needs to be rolled back, I

477
00:51:27,280 --> 00:51:30,240
needed to know that the previous value was not A3.

478
00:51:30,240 --> 00:51:31,840
Now that may be sitting in a version chain.

479
00:51:31,840 --> 00:51:34,280
If that's the storage technique that I'm using,

480
00:51:34,280 --> 00:51:37,120
but I have to go chase it down and I have to go figure it out.

481
00:51:37,120 --> 00:51:40,080
I still have to keep track of the changes that I made,

482
00:51:40,080 --> 00:51:41,519
which is the logging stuff, which

483
00:51:41,519 --> 00:51:43,040
works with all of these techniques

484
00:51:43,040 --> 00:51:44,400
that we've discussed before.

485
00:51:44,400 --> 00:51:47,000
It's orthogonal to all of that.

486
00:51:47,000 --> 00:51:48,560
But as I said, today, if you just concern

487
00:51:48,560 --> 00:51:52,480
yourself with a single version component of this,

488
00:51:52,480 --> 00:51:54,519
you can do all kinds of a little bit more interesting thing

489
00:51:54,519 --> 00:51:55,280
with multi-version.

490
00:51:55,280 --> 00:51:57,560
But let's get the single version foundation in first.

491
00:52:01,240 --> 00:52:07,000
The other complication arises from the buffer pools

492
00:52:07,000 --> 00:52:08,480
replacement policy.

493
00:52:08,480 --> 00:52:10,600
So you guys implemented the LREU2 policy

494
00:52:10,600 --> 00:52:12,080
when you wrote the buffer pool.

495
00:52:12,080 --> 00:52:14,480
And that gave a lot of freedom to the buffer manager,

496
00:52:14,480 --> 00:52:16,519
simple piece of code that can decide,

497
00:52:16,519 --> 00:52:19,519
I'll keep track of the recency of a page based

498
00:52:19,519 --> 00:52:22,000
on the LREU2 counters.

499
00:52:22,000 --> 00:52:23,920
And I'll decide when to kick something out,

500
00:52:23,920 --> 00:52:25,440
when an eviction needs to happen.

501
00:52:25,440 --> 00:52:27,680
The only thing we said is that if a page is spin,

502
00:52:27,680 --> 00:52:29,880
someone's actually using it, can't kick it out.

503
00:52:29,880 --> 00:52:33,039
But if a page is unpin, it could be dirty,

504
00:52:33,039 --> 00:52:34,360
and I can kick it out.

505
00:52:34,360 --> 00:52:37,240
So the buffer pool to get maximum performance,

506
00:52:37,240 --> 00:52:43,240
maximum use of the space is a cache of that caching efficiency

507
00:52:43,240 --> 00:52:46,039
is saying I'm allowed to kick things out,

508
00:52:46,039 --> 00:52:49,960
even if there are dirty changes that are made to that page.

509
00:52:49,960 --> 00:52:53,079
So that we'll call as the steel policy.

510
00:52:53,079 --> 00:52:57,319
There's a second component that's one dimension

511
00:52:57,319 --> 00:52:58,319
to this problem.

512
00:52:58,319 --> 00:52:59,880
And stealing is saying the buffer manager

513
00:52:59,880 --> 00:53:02,920
can take a page that is unpin and flush it to disk,

514
00:53:02,920 --> 00:53:05,840
even if it's dirty, and the transaction that's dirty

515
00:53:05,840 --> 00:53:07,960
that hasn't committed yet.

516
00:53:07,960 --> 00:53:12,239
So we'll write uncommitted changes to the stable storage,

517
00:53:12,239 --> 00:53:14,360
and that's OK.

518
00:53:14,360 --> 00:53:16,079
No steel is saying, no, no, I'm going

519
00:53:16,079 --> 00:53:18,199
to take away this power of replacement policy

520
00:53:18,199 --> 00:53:18,799
from you.

521
00:53:18,799 --> 00:53:21,360
Certain things besides spin pages, you

522
00:53:21,360 --> 00:53:24,000
can't steal pages for transactions that are running.

523
00:53:24,000 --> 00:53:26,599
And that's obviously going to give you a lot less flexibility.

524
00:53:26,599 --> 00:53:29,440
It'll be a poorer performing system.

525
00:53:29,440 --> 00:53:31,480
The second dimension to steal, no steal,

526
00:53:31,480 --> 00:53:34,200
is the force policy, which is at the commit time.

527
00:53:34,200 --> 00:53:35,920
What do I do?

528
00:53:35,920 --> 00:53:38,840
At the commit time, if I say all the changes that were made

529
00:53:38,840 --> 00:53:40,480
by the transaction that is committing

530
00:53:40,480 --> 00:53:44,400
must be forced into disk before committing,

531
00:53:44,400 --> 00:53:46,559
then I'll get durability.

532
00:53:46,559 --> 00:53:50,599
But it will be very expensive, because imagine

533
00:53:50,599 --> 00:53:53,960
I'm a transaction that's touching one byte

534
00:53:53,960 --> 00:53:57,400
in 100 byte records for a billion records.

535
00:53:57,400 --> 00:53:59,159
I'm just changing one billion bytes,

536
00:53:59,159 --> 00:54:02,119
but I've touched everything, and I have to bring everything

537
00:54:02,119 --> 00:54:04,839
into memory, update all of that stuff,

538
00:54:04,839 --> 00:54:07,759
and then write all of that stuff at commit time.

539
00:54:07,759 --> 00:54:10,000
So that will be a lot of changes that

540
00:54:10,000 --> 00:54:13,119
have to be flushed at commit time, and you have a slow system,

541
00:54:13,119 --> 00:54:16,719
but that could be how you could work in that case.

542
00:54:16,719 --> 00:54:19,839
So force says at commit time, I will force the committed

543
00:54:19,840 --> 00:54:22,559
transaction changes to disk, no force says no, no, no,

544
00:54:22,559 --> 00:54:25,200
don't force that, find a better way to do the commit

545
00:54:25,200 --> 00:54:28,480
that is more efficient, and then deal with that things

546
00:54:28,480 --> 00:54:30,160
that can happen in a different way,

547
00:54:30,160 --> 00:54:31,920
which is where logging is going to commit.

548
00:54:34,039 --> 00:54:36,680
So let's look at one of the simplest policies

549
00:54:36,680 --> 00:54:40,240
of these combinations of steal, no steal, force, no force.

550
00:54:40,240 --> 00:54:43,120
The easiest one is no steal, but for who can do much,

551
00:54:43,120 --> 00:54:46,400
it can steal a page, and forces you write stuff.

552
00:54:46,400 --> 00:54:49,079
So it's this combination that works,

553
00:54:49,079 --> 00:54:50,799
but it's obviously pretty slow.

554
00:54:50,799 --> 00:54:52,960
But let's see in that, just an example

555
00:54:52,960 --> 00:54:55,319
as to what happens with this simple scheme,

556
00:54:55,319 --> 00:54:56,440
which is not realistic, right?

557
00:54:56,440 --> 00:54:58,400
We want to do better and V-ville.

558
00:54:58,400 --> 00:55:01,119
So you have a read of A, bring that page in,

559
00:55:01,119 --> 00:55:03,039
you've seen this page multiple times now,

560
00:55:03,039 --> 00:55:05,599
you go right to that, second transaction comes in,

561
00:55:05,599 --> 00:55:07,880
makes it's right, and force means,

562
00:55:07,880 --> 00:55:11,279
I will now force the changes of this page to disk,

563
00:55:11,279 --> 00:55:16,279
but because I have changes to A that was made by T1,

564
00:55:17,200 --> 00:55:19,880
which is not done, if I'm doing a force policy,

565
00:55:19,880 --> 00:55:21,400
I'm still going to need to figure out

566
00:55:21,400 --> 00:55:23,960
what's the older version of this page,

567
00:55:23,960 --> 00:55:26,760
I need some mechanism to go keep track of that,

568
00:55:26,760 --> 00:55:29,440
and then only flush that out to disk.

569
00:55:30,960 --> 00:55:33,280
So just want to know, even if it's in simplest scheme

570
00:55:33,280 --> 00:55:36,120
that you can think of, you're gonna have a little complication.

571
00:55:37,120 --> 00:55:38,440
But we'll do much better than that.

572
00:55:38,440 --> 00:55:40,640
This just an example, no one implements it like that,

573
00:55:40,640 --> 00:55:43,040
because this will still be a very slow system.

574
00:55:44,039 --> 00:55:46,320
Okay, but there's no free lunch,

575
00:55:46,320 --> 00:55:47,920
even with the simplest combination,

576
00:55:47,920 --> 00:55:49,400
you still have complications.

577
00:55:50,719 --> 00:55:54,320
All right, so easier scheme to implement,

578
00:55:55,679 --> 00:55:57,719
it has a couple other problems with it.

579
00:55:57,719 --> 00:56:01,199
One is if the number of objects that I'm writing to,

580
00:56:01,199 --> 00:56:04,000
imagine you have a buffer pool with a million pages,

581
00:56:04,000 --> 00:56:08,119
and you want to update in a transaction,

582
00:56:08,119 --> 00:56:11,320
a table that then you want to update a field

583
00:56:11,320 --> 00:56:14,280
for all the records in a table,

584
00:56:14,280 --> 00:56:16,720
and the table has a million plus one pages,

585
00:56:16,720 --> 00:56:21,120
you can do this because according to no steel force policy,

586
00:56:21,120 --> 00:56:23,440
every page has to be brought into memory

587
00:56:23,440 --> 00:56:26,039
and can we push out till,

588
00:56:26,039 --> 00:56:27,640
because of the no steel part,

589
00:56:27,640 --> 00:56:30,680
can we push out to disk till the transaction is done?

590
00:56:30,680 --> 00:56:33,640
So this just to say that the no steel part

591
00:56:33,640 --> 00:56:35,160
can be really problematic,

592
00:56:35,160 --> 00:56:38,080
the force part is not trivial to,

593
00:56:38,080 --> 00:56:39,400
because you have to go figure out

594
00:56:40,360 --> 00:56:42,280
which part of that page changed.

595
00:56:42,280 --> 00:56:45,840
So we need to ultimately live in a world

596
00:56:45,840 --> 00:56:48,320
where we have to try to make the opposite of this happens,

597
00:56:48,320 --> 00:56:51,320
which is to have the most high-performance scheme,

598
00:56:51,320 --> 00:56:53,320
which is to do steel no force.

599
00:56:55,160 --> 00:56:57,480
Now, as we start to make changes,

600
00:56:57,480 --> 00:56:59,960
we'll have to keep track of what we have changed

601
00:56:59,960 --> 00:57:02,200
and work with that.

602
00:57:02,200 --> 00:57:05,280
So one of the options that we will have to do,

603
00:57:05,280 --> 00:57:07,400
and this is running out of battery for some reason,

604
00:57:07,400 --> 00:57:08,840
even though I've got this plugged in.

605
00:57:08,840 --> 00:57:10,920
So hold on, before everything dies out here.

606
00:57:12,920 --> 00:57:15,160
Maybe this thing is broken here.

607
00:57:20,079 --> 00:57:20,920
Geez.

608
00:57:23,360 --> 00:57:26,240
Not good, it's saying I'm gonna shut you down in a minute,

609
00:57:27,200 --> 00:57:28,039
but,

610
00:57:32,119 --> 00:57:34,360
yeah, it should power through it.

611
00:57:35,360 --> 00:57:38,400
Otherwise, I'm gonna have to take a little time

612
00:57:38,400 --> 00:57:40,440
in this a series.

613
00:57:40,440 --> 00:57:41,280
So hold on.

614
00:57:43,280 --> 00:57:44,280
There we go.

615
00:57:44,280 --> 00:57:45,880
Now, I have to switch this guy out here

616
00:57:45,880 --> 00:57:47,519
and then set everything back up again.

617
00:57:47,519 --> 00:57:48,440
Give me a minute.

618
00:57:49,840 --> 00:57:50,680
Fun.

619
00:57:53,280 --> 00:57:54,640
That gives you a little bit of downtime

620
00:57:54,640 --> 00:57:55,760
to think about all this stuff.

621
00:57:55,760 --> 00:57:56,599
So,

622
00:57:57,800 --> 00:58:00,519
let's stop for the final.

623
00:58:00,519 --> 00:58:03,599
I have half a mind to record a 20 minute lecture

624
00:58:03,599 --> 00:58:05,519
and make it part of it, but you guys will kill me.

625
00:58:05,519 --> 00:58:06,440
So I won't do that.

626
00:58:06,440 --> 00:58:08,119
I won't do that.

627
00:58:08,119 --> 00:58:10,519
But I was thinking, ways to get out of this.

628
00:58:13,599 --> 00:58:14,440
Sorry.

629
00:58:16,480 --> 00:58:18,759
No, no, no, I'm nearly there.

630
00:58:18,759 --> 00:58:20,679
I'm fighting here, guys, for every minute.

631
00:58:20,679 --> 00:58:21,880
Thanks for all the help.

632
00:58:25,920 --> 00:58:28,079
Okay, I think we are back.

633
00:58:28,079 --> 00:58:29,360
Let's make sure,

634
00:58:31,039 --> 00:58:32,519
oh, good.

635
00:58:32,519 --> 00:58:36,000
Now, this thing, today this connector

636
00:58:36,000 --> 00:58:38,679
to the external monitors, very finicky.

637
00:58:40,079 --> 00:58:43,199
It seems to not want to do that.

638
00:58:43,199 --> 00:58:44,440
Okay, there we go.

639
00:58:44,440 --> 00:58:46,880
I think we are back in business.

640
00:58:46,880 --> 00:58:49,599
And hopefully the lecture is still recording.

641
00:58:49,599 --> 00:58:51,360
So there's all recorded at home

642
00:58:51,360 --> 00:58:53,280
and add extra material for the exam.

643
00:58:53,280 --> 00:58:54,400
Just kidding.

644
00:58:54,400 --> 00:58:55,559
Won't do that.

645
00:58:55,559 --> 00:58:56,400
All right.

646
00:58:56,400 --> 00:58:58,960
So we still have to record what we need

647
00:58:58,960 --> 00:59:02,480
to unwind from or make sure it made it to disk.

648
00:59:02,800 --> 00:59:05,119
The two techniques, one is shadow paging.

649
00:59:05,119 --> 00:59:06,239
It's a bad idea.

650
00:59:06,239 --> 00:59:07,199
No one does it.

651
00:59:07,199 --> 00:59:09,000
This was the first thing that people did

652
00:59:09,000 --> 00:59:11,239
when they realized they need recovery protocol.

653
00:59:11,239 --> 00:59:13,920
So I'll describe it, but I'm gonna skip through

654
00:59:13,920 --> 00:59:16,759
the slides that are in there over here

655
00:59:16,759 --> 00:59:19,119
and I will refer you to the deck

656
00:59:19,119 --> 00:59:20,719
if you needed to go to the cap.

657
00:59:20,719 --> 00:59:22,039
What shadow paging?

658
00:59:22,039 --> 00:59:24,159
So remember we ran into this trouble

659
00:59:24,159 --> 00:59:27,599
where two transactions that changes were on the same page

660
00:59:27,599 --> 00:59:29,440
and we had to worry about that.

661
00:59:29,440 --> 00:59:32,000
There's a bigger version of this problem

662
00:59:32,679 --> 00:59:35,320
where I've got bunch of changes that I'm making

663
00:59:35,320 --> 00:59:36,400
and shadow paging.

664
00:59:36,400 --> 00:59:38,280
Effectively what we need is we need to keep track

665
00:59:38,280 --> 00:59:41,480
of a before and after version of the changes we are making.

666
00:59:41,480 --> 00:59:42,320
Okay.

667
00:59:42,320 --> 00:59:47,480
One way to do that is to keep track of a scheme

668
00:59:47,480 --> 00:59:51,320
in which I have all the pages that I have on disk

669
00:59:51,320 --> 00:59:53,880
and I'll keep track in memory something

670
00:59:53,880 --> 00:59:55,760
called a master page table.

671
00:59:55,760 --> 00:59:57,920
Kind of like your operating system,

672
00:59:57,920 --> 00:59:59,960
those of you who've taken an operating system class

673
00:59:59,960 --> 01:00:01,760
know that there's a page mapping table

674
01:00:01,760 --> 01:00:04,559
from your virtual address space to a physical address space.

675
01:00:04,559 --> 01:00:05,559
Right.

676
01:00:05,559 --> 01:00:09,800
Kind of like that, but not that complicated here is just saying

677
01:00:09,800 --> 01:00:14,800
page one is disk position in my stable storage.

678
01:00:17,199 --> 01:00:21,360
It's just a pointer, it's just a list of where the pages are.

679
01:00:21,360 --> 01:00:23,519
And when a transaction comes in,

680
01:00:23,519 --> 01:00:26,360
it will make a copy of that page table.

681
01:00:26,360 --> 01:00:28,480
Effectively think of it as getting a snapshot

682
01:00:28,480 --> 01:00:30,320
by virtue of copying this.

683
01:00:30,320 --> 01:00:32,360
And now when it makes changes,

684
01:00:32,360 --> 01:00:36,440
it's going to make changes if page one has to be updated.

685
01:00:36,440 --> 01:00:38,960
It'll make a new copy of that page a shadow,

686
01:00:38,960 --> 01:00:42,159
make a full new copy of itself of that page.

687
01:00:42,159 --> 01:00:43,960
Make changes just there.

688
01:00:43,960 --> 01:00:46,519
So if some of the transactions making changes to page one,

689
01:00:46,519 --> 01:00:48,480
it'll make another full copy of page one.

690
01:00:49,719 --> 01:00:51,440
And there are ways to merge it and combine that

691
01:00:51,440 --> 01:00:54,039
but assume it just as one at a time.

692
01:00:54,039 --> 01:00:57,960
And then effectively all the changes will create new pages.

693
01:00:57,960 --> 01:01:01,280
Those are only pointed to by my shadow page table copy.

694
01:01:02,400 --> 01:01:04,920
And then ultimately when I'm ready to commit,

695
01:01:04,920 --> 01:01:06,280
I will do the following,

696
01:01:06,280 --> 01:01:08,599
which is I take the, there's a pointer in memory

697
01:01:08,599 --> 01:01:10,440
to the root of the master page table,

698
01:01:10,440 --> 01:01:12,960
which is pointing to the old page table.

699
01:01:12,960 --> 01:01:14,920
A copy of that is also kept on disk, right?

700
01:01:14,920 --> 01:01:16,920
Because that's the stable point when the disk,

701
01:01:16,920 --> 01:01:19,119
when the database system starts from scratch,

702
01:01:19,119 --> 01:01:22,960
it'll read that stuff because it knows kind of where everything is.

703
01:01:22,960 --> 01:01:26,280
And then I will go flush that out over there,

704
01:01:26,280 --> 01:01:29,360
then switch the pointer to the new shadow page.

705
01:01:29,360 --> 01:01:31,040
And now that becomes the master

706
01:01:31,040 --> 01:01:33,600
and eventually some background stuff goes clean stuff, things up.

707
01:01:34,519 --> 01:01:37,600
So this was the easiest implementation as you can imagine.

708
01:01:37,600 --> 01:01:41,040
Someone who wanted to get this type of recovery protocol.

709
01:01:41,040 --> 01:01:41,880
No one does that.

710
01:01:41,880 --> 01:01:43,880
I guess there are some systems to do that,

711
01:01:43,880 --> 01:01:45,120
where it's a bad idea.

712
01:01:45,120 --> 01:01:47,519
The better approach is what we are going to talk about

713
01:01:47,519 --> 01:01:49,160
with the right to head logging protocol.

714
01:01:49,160 --> 01:01:50,600
Obviously massive problems, right?

715
01:01:50,600 --> 01:01:51,680
Use fragmentation.

716
01:01:51,680 --> 01:01:54,519
Now you're doing this garbage collection at the page level

717
01:01:54,519 --> 01:01:57,360
and you'll make copies and copies of pages and stuff like that.

718
01:01:57,360 --> 01:01:59,039
So lots and lots of problems.

719
01:01:59,039 --> 01:02:00,480
We won't talk about that.

720
01:02:00,480 --> 01:02:03,960
But as I said here, you can look at last year's lecture

721
01:02:03,960 --> 01:02:06,719
on this, which spends about 10, 15 minutes

722
01:02:06,719 --> 01:02:08,239
on the next two slides.

723
01:02:08,239 --> 01:02:10,800
Including, this I would recommend just for learning purposes

724
01:02:10,800 --> 01:02:13,320
to go back and look at what SQLite used to do.

725
01:02:13,320 --> 01:02:15,960
They had the old scheme with shadow pageing

726
01:02:15,960 --> 01:02:17,880
because they started in 2000.

727
01:02:17,880 --> 01:02:21,360
People hadn't advanced in all these protocols as much at that time.

728
01:02:21,360 --> 01:02:23,759
But then they switched over to right head logging,

729
01:02:23,760 --> 01:02:26,280
which we're going to talk about next.

730
01:02:26,280 --> 01:02:27,800
And so it makes copies and copies where

731
01:02:27,800 --> 01:02:29,360
it does copies in a slightly different way,

732
01:02:29,360 --> 01:02:31,480
but effectively the same time.

733
01:02:31,480 --> 01:02:33,880
All right, this is what we need to pay attention to.

734
01:02:33,880 --> 01:02:36,360
Material for exam starts back again.

735
01:02:36,360 --> 01:02:40,000
We won't ask you questions on shadow pageing.

736
01:02:40,000 --> 01:02:44,160
Right ahead log is the way you implement the Bay Foundation

737
01:02:44,160 --> 01:02:46,480
for the recovery protocol.

738
01:02:46,480 --> 01:02:49,880
The idea is we want to make the steel no force,

739
01:02:49,880 --> 01:02:53,160
the opposite of the easiest scheme, the hardest scheme,

740
01:02:53,159 --> 01:02:54,839
the steel no force work.

741
01:02:54,839 --> 01:02:58,799
And for that, we'll have to keep track of what changes

742
01:02:58,799 --> 01:03:02,559
are being made and use those changes in two different ways.

743
01:03:02,559 --> 01:03:05,079
So we'll create something called a log file.

744
01:03:05,079 --> 01:03:08,480
Don't confuse this with a log structured file system.

745
01:03:08,480 --> 01:03:11,759
I'll make a comment about that in a little bit.

746
01:03:11,759 --> 01:03:16,480
Quick preview of that is even a log structured file system

747
01:03:16,480 --> 01:03:19,359
for the men table will do logging like this, the right ahead

748
01:03:19,359 --> 01:03:20,440
logging.

749
01:03:20,440 --> 01:03:22,319
So this is database logs.

750
01:03:22,320 --> 01:03:25,120
And we'll keep that in a database log file,

751
01:03:25,120 --> 01:03:27,039
which is a different file.

752
01:03:27,039 --> 01:03:30,200
And the log records, we are going to create log records

753
01:03:30,200 --> 01:03:34,280
and they'll get created in the buffer pool in pages that

754
01:03:34,280 --> 01:03:36,760
will eventually get flushed out to the log file.

755
01:03:36,760 --> 01:03:39,240
OK, so there's a separate file called the log file.

756
01:03:39,240 --> 01:03:41,240
OK, and it will go through the buffer pool too.

757
01:03:41,240 --> 01:03:43,200
And usually there's a separate place in the buffer pool

758
01:03:43,200 --> 01:03:46,080
for buffering log pages.

759
01:03:46,080 --> 01:03:50,000
So you can think of a design space as having these two

760
01:03:50,000 --> 01:03:53,440
dimensions, force, yes, no, at transaction

761
01:03:53,440 --> 01:03:57,000
commit time to a force, the changes to disk,

762
01:03:57,000 --> 01:04:00,280
or how flexible is the buffer pool?

763
01:04:00,280 --> 01:04:01,840
Does it allow to steal pages?

764
01:04:01,840 --> 01:04:04,480
We want that because that makes it more efficient

765
01:04:04,480 --> 01:04:05,519
or not allowed to steal.

766
01:04:05,519 --> 01:04:08,639
And we already talked about the no-steel force policy

767
01:04:08,639 --> 01:04:10,079
has been trivial.

768
01:04:10,079 --> 01:04:13,000
And what we want is that desired space.

769
01:04:13,000 --> 01:04:16,000
So no force steal policy on the force aspect basically

770
01:04:16,000 --> 01:04:19,400
says for every update, flushed the updated page to disk.

771
01:04:19,400 --> 01:04:21,920
And this means transactions are durable.

772
01:04:21,920 --> 01:04:23,720
Committed transactions changes are on disk.

773
01:04:23,720 --> 01:04:25,240
So for committed transaction, you can say,

774
01:04:25,240 --> 01:04:28,280
I've met the D property for you.

775
01:04:28,280 --> 01:04:29,840
But it'll be poor response time because you've

776
01:04:29,840 --> 01:04:32,440
to flush a lot of pages to disk for transactions

777
01:04:32,440 --> 01:04:34,760
that update a lot.

778
01:04:34,760 --> 01:04:37,800
The steal policy and the force plus no-steel

779
01:04:37,800 --> 01:04:39,119
is the easiest combination, right?

780
01:04:39,119 --> 01:04:42,079
But all no-steel policies, what they will say

781
01:04:42,079 --> 01:04:45,840
is the buffer manager cannot take a page away for a transaction

782
01:04:45,840 --> 01:04:47,240
that is still working.

783
01:04:47,239 --> 01:04:49,919
And that works for a bought-it transaction

784
01:04:49,919 --> 01:04:53,239
because their changes will make it to disk, right?

785
01:04:53,239 --> 01:04:56,239
But it will be a low throughput because very soon,

786
01:04:56,239 --> 01:04:59,919
the buffer manager has very few degrees of freedom

787
01:04:59,919 --> 01:05:03,519
to take pages and do the replacement policy.

788
01:05:03,519 --> 01:05:06,679
So we really want the no force and steal policy.

789
01:05:06,679 --> 01:05:09,159
What's the complication with the no force?

790
01:05:09,159 --> 01:05:13,919
So remember, no force are concern is that, at commit time,

791
01:05:13,919 --> 01:05:16,799
I'm not requiring the dirty pages we flush to disk.

792
01:05:16,800 --> 01:05:19,680
We let the allowed U time send dictate that

793
01:05:19,680 --> 01:05:21,840
when the pages written out.

794
01:05:21,840 --> 01:05:23,960
But what happens if a page crashes

795
01:05:23,960 --> 01:05:25,400
before it changes make it to disk?

796
01:05:25,400 --> 01:05:27,640
The example we started out with Putin

797
01:05:27,640 --> 01:05:30,519
zapping up the page that we have to go deal with that.

798
01:05:30,519 --> 01:05:34,280
So what we'll do is we'll write these things called logs,

799
01:05:34,280 --> 01:05:38,480
which are essentially diffs of changes that we made.

800
01:05:38,480 --> 01:05:42,120
And we'll use that at recovery protocol time,

801
01:05:42,120 --> 01:05:44,640
next lecture, to redo the changes that

802
01:05:44,639 --> 01:05:47,759
should have been in the stable storage in the first place.

803
01:05:47,759 --> 01:05:52,119
So we need logs to redo changes that we should do.

804
01:05:53,359 --> 01:05:56,879
The steal policy, we want stealing allowed.

805
01:05:56,879 --> 01:05:59,559
And this is like 2023.

806
01:05:59,559 --> 01:06:02,159
So probably if all of these techniques were invented now,

807
01:06:02,159 --> 01:06:04,000
we'd probably not call it steal and force.

808
01:06:04,000 --> 01:06:07,079
But there's a non-PC times when these terms were invented.

809
01:06:07,079 --> 01:06:08,639
So part of that.

810
01:06:08,639 --> 01:06:11,239
But we'll stay with the terms that are in the literature.

811
01:06:11,239 --> 01:06:13,839
So with the steal policy, our concern is that a page

812
01:06:13,840 --> 01:06:16,960
that was stolen and flushed to disk may have changes

813
01:06:16,960 --> 01:06:19,160
that were made by an uncommitted transaction.

814
01:06:19,160 --> 01:06:20,640
Now we need to undo that.

815
01:06:20,640 --> 01:06:23,840
So we're going to need logging to allow us to undo that.

816
01:06:23,840 --> 01:06:26,240
So logging is going to be used.

817
01:06:26,240 --> 01:06:29,240
Logging must have enough information to allow us to redo

818
01:06:29,240 --> 01:06:31,880
and undo and the recovery protocol that we'll talk about

819
01:06:31,880 --> 01:06:35,640
in the next class will decide whether it deeds a log record,

820
01:06:35,640 --> 01:06:37,440
whether it has to redo or undo.

821
01:06:38,920 --> 01:06:42,440
But along with that, there's another fundamental protocol

822
01:06:42,440 --> 01:06:43,440
that we need.

823
01:06:43,440 --> 01:06:46,159
And that is called right ahead logging.

824
01:06:46,159 --> 01:06:49,679
The two very foundational pieces that you need in databases

825
01:06:49,679 --> 01:06:52,159
one is this notion of two-phase logging

826
01:06:52,159 --> 01:06:54,360
because from that you've got the dependence graph

827
01:06:54,360 --> 01:06:55,880
of which everything is based for you

828
01:06:55,880 --> 01:06:58,360
to understand how to get isolation.

829
01:06:58,360 --> 01:07:00,360
The other piece is right ahead logging,

830
01:07:00,360 --> 01:07:04,840
which is the protocol that says, what at what point

831
01:07:04,840 --> 01:07:09,960
can I declare a transaction status to be committed or important?

832
01:07:09,960 --> 01:07:13,639
There's a magical moment in the protocol where you say,

833
01:07:13,639 --> 01:07:16,320
at the point where x happens that x is going to be

834
01:07:16,320 --> 01:07:19,880
when the commit log hits disk,

835
01:07:19,880 --> 01:07:23,079
the transaction changes its status from active to committed.

836
01:07:23,079 --> 01:07:26,119
It has to be one very finite boundary

837
01:07:26,119 --> 01:07:28,159
in that magical moment is determined

838
01:07:28,159 --> 01:07:30,320
by this right ahead logging protocol.

839
01:07:30,320 --> 01:07:34,039
And what that says is that the database system is going

840
01:07:34,039 --> 01:07:37,400
to log records, this stays in volatile storage,

841
01:07:37,400 --> 01:07:41,200
and all records updated to a page are stayed

842
01:07:41,200 --> 01:07:45,039
in this non-volatile log buffer pool storage.

843
01:07:45,039 --> 01:07:49,840
But before I write a page to stable storage,

844
01:07:49,840 --> 01:07:53,880
I must make sure its log is written before I can write the page.

845
01:07:53,880 --> 01:07:56,800
That's the right ahead logging protocol says,

846
01:07:56,800 --> 01:08:00,119
that way I have the log information to undo and redo.

847
01:08:02,320 --> 01:08:04,840
So before I can write the page

848
01:08:04,840 --> 01:08:07,800
and overwrite it in stable storage,

849
01:08:07,800 --> 01:08:10,200
all of its log must hit the disk.

850
01:08:10,200 --> 01:08:12,240
And without that, all of the stuff that we'll talk about

851
01:08:12,240 --> 01:08:12,920
will fail.

852
01:08:12,920 --> 01:08:14,280
So right ahead logging protocol says,

853
01:08:14,280 --> 01:08:17,079
this is the way you're going to get that log information.

854
01:08:17,079 --> 01:08:19,279
And intuitively it makes sense, right?

855
01:08:19,279 --> 01:08:22,319
If I wrote the page and then crashed before the log hit it,

856
01:08:22,319 --> 01:08:26,079
I don't know how to redo and undo the things that I may need to.

857
01:08:28,119 --> 01:08:31,680
So, record your changes, record,

858
01:08:31,680 --> 01:08:34,119
take that record of changes, put it in some place,

859
01:08:34,119 --> 01:08:37,000
save that is stable before you can make the page,

860
01:08:37,000 --> 01:08:40,520
the changes pushed out to stable storage.

861
01:08:40,520 --> 01:08:41,720
What's the stable storage?

862
01:08:41,720 --> 01:08:42,720
Yes, log width.

863
01:08:42,720 --> 01:08:43,720
So there are two things happening.

864
01:08:43,720 --> 01:08:45,960
I've got a table in which I'm making changes

865
01:08:45,960 --> 01:08:47,720
or bunch of tables in the database.

866
01:08:47,720 --> 01:08:50,119
All of those changes we're going to record in a log

867
01:08:50,119 --> 01:08:51,680
that is sitting in the buffer pool,

868
01:08:51,680 --> 01:08:53,800
because we also don't want the log to be written

869
01:08:53,800 --> 01:08:55,600
to disk every time that's slow.

870
01:08:55,600 --> 01:08:58,600
But in that buffer pool, we'll flush the buffer pool,

871
01:08:58,600 --> 01:09:01,200
the logs portion of the buffer pool to disk.

872
01:09:02,480 --> 01:09:07,320
So if I'm page 13 and the buffer manager says,

873
01:09:07,320 --> 01:09:09,400
I want to evict page 13.

874
01:09:09,400 --> 01:09:11,880
First, I'm going to say to the log manager,

875
01:09:11,880 --> 01:09:13,720
which is managing the log buffer pool,

876
01:09:13,720 --> 01:09:15,280
different buffer pool, right?

877
01:09:15,280 --> 01:09:16,640
Make them from the same memory space,

878
01:09:16,640 --> 01:09:18,440
where it's a different manager and say,

879
01:09:18,440 --> 01:09:23,480
hey, log manager, flush all your logs for page 13.

880
01:09:23,480 --> 01:09:24,880
And tell me when you're done,

881
01:09:24,880 --> 01:09:28,480
the log manager will flush it to the log file

882
01:09:28,479 --> 01:09:30,279
and it'll all the rights to this log file

883
01:09:30,279 --> 01:09:32,239
are going to be sequential.

884
01:09:32,239 --> 01:09:35,599
And then basically come back and now the buffer manager

885
01:09:35,599 --> 01:09:37,279
can go and evict page 13.

886
01:09:41,599 --> 01:09:43,799
Yeah, we'll see the logs, the structure of that log.

887
01:09:43,799 --> 01:09:44,719
So that's coming.

888
01:09:44,719 --> 01:09:48,000
What's in the logs and what that looks like is coming.

889
01:09:49,000 --> 01:09:50,599
But basically just think about it that way.

890
01:09:50,599 --> 01:09:54,599
When a buffer pool, a dirty page, only on a dirty page,

891
01:09:54,599 --> 01:09:55,839
if it's a clean page, you don't have to talk

892
01:09:55,839 --> 01:09:57,519
to the log manager, you as the buffer manager.

893
01:09:57,520 --> 01:10:01,960
But the buffer pool manager on evicting a dirty page

894
01:10:01,960 --> 01:10:04,840
has to first tell the log manager, please flush everything

895
01:10:04,840 --> 01:10:07,560
because the right-hand protocol requires you to do that

896
01:10:07,560 --> 01:10:09,200
before you can do anything else.

897
01:10:09,200 --> 01:10:12,520
So to say that the page already has a stable storage,

898
01:10:12,520 --> 01:10:15,800
then you can say that all records pertinent

899
01:10:15,800 --> 01:10:18,720
to an updated page are written to non-volatile storage.

900
01:10:18,720 --> 01:10:20,000
It says non-volatile storage.

901
01:10:20,000 --> 01:10:21,160
Non-volatile is stable.

902
01:10:21,160 --> 01:10:23,200
Yeah, the disk and SSDs.

903
01:10:23,200 --> 01:10:25,360
Yeah, I know that textbooks say it's non-volatile.

904
01:10:25,359 --> 01:10:27,159
Previously, people used to call it stable

905
01:10:27,159 --> 01:10:28,679
before that they used to call it disk.

906
01:10:28,679 --> 01:10:30,639
So terms are changing like every few years

907
01:10:30,639 --> 01:10:32,960
because the storage hierarchy is changing.

908
01:10:32,960 --> 01:10:35,599
Yeah, so non-volatile is a good stuff

909
01:10:35,599 --> 01:10:36,880
that will not get zapped.

910
01:10:40,199 --> 01:10:41,559
So the slide is correct.

911
01:10:41,559 --> 01:10:42,399
Great.

912
01:10:42,399 --> 01:10:46,119
So besides this, we're gonna do a couple more things.

913
01:10:46,119 --> 01:10:48,239
We're going to write a special type of a log record

914
01:10:48,239 --> 01:10:49,839
called a begin log record.

915
01:10:49,839 --> 01:10:51,639
And when a transaction finishes,

916
01:10:51,639 --> 01:10:53,960
with the commit status, we'll write a commit log record.

917
01:10:53,960 --> 01:10:55,199
This is also in a bot log record.

918
01:10:55,199 --> 01:10:57,039
We'll see that in the next class.

919
01:10:57,039 --> 01:11:02,119
And then again, this says before I commit the transaction,

920
01:11:02,119 --> 01:11:04,239
this magical moment for a commit,

921
01:11:04,239 --> 01:11:05,239
right?

922
01:11:05,239 --> 01:11:06,079
A protocol has two components.

923
01:11:06,079 --> 01:11:08,480
One is a mixture of a dirty page.

924
01:11:08,480 --> 01:11:11,119
Please flush your logs before you flush the page.

925
01:11:11,119 --> 01:11:12,920
And the other thing it says,

926
01:11:12,920 --> 01:11:14,279
when you commit a transaction,

927
01:11:14,279 --> 01:11:17,239
that commit log record must be created,

928
01:11:18,239 --> 01:11:22,439
written in the log buffer pool.

929
01:11:22,439 --> 01:11:26,519
And that log page must be flushed to disk

930
01:11:26,519 --> 01:11:28,759
into this non-volatile storage.

931
01:11:28,759 --> 01:11:30,639
When you get the signal back,

932
01:11:30,639 --> 01:11:32,479
that the page has been written correctly,

933
01:11:32,479 --> 01:11:35,119
that's the magical moment when the commit happens.

934
01:11:35,119 --> 01:11:37,759
And now you can tell the world that transactions come in.

935
01:11:37,759 --> 01:11:38,919
So right now, the logging protocol

936
01:11:38,919 --> 01:11:40,439
will have those two components.

937
01:11:40,439 --> 01:11:42,960
Dirty pages, essentially it says,

938
01:11:42,960 --> 01:11:46,599
the when a log of the change you're trying to make,

939
01:11:46,599 --> 01:11:48,199
hits stable storage.

940
01:11:48,199 --> 01:11:51,479
At that point, we can declare that we now have a mechanism

941
01:11:51,479 --> 01:11:55,319
to unwind ourselves out from any changes that we need to move out to,

942
01:11:55,319 --> 01:11:56,799
or reapply changes as we need to,

943
01:11:56,799 --> 01:11:59,559
because logs will have the redo and undo information.

944
01:12:01,039 --> 01:12:02,039
Okay?

945
01:12:03,079 --> 01:12:04,799
All right, questions?

946
01:12:05,719 --> 01:12:06,959
I want to make sure I get this part

947
01:12:06,959 --> 01:12:09,599
because this is the foundation for understanding everything

948
01:12:09,599 --> 01:12:11,919
today and the rest of the next lecture.

949
01:12:11,919 --> 01:12:16,359
I get why we can put the binary key first.

950
01:12:16,359 --> 01:12:18,719
The begin bracket is just to say this is the markup.

951
01:12:18,719 --> 01:12:20,159
And you'll see when we get to check pointing

952
01:12:20,159 --> 01:12:22,199
to help us figure out what's the boundary of that.

953
01:12:22,199 --> 01:12:24,399
Otherwise, if you have to scan a big log file,

954
01:12:24,399 --> 01:12:26,680
the log file can have millions of billions of records.

955
01:12:26,680 --> 01:12:29,119
You'll say, where did transaction T1 start?

956
01:12:29,119 --> 01:12:30,599
You have to scan everything.

957
01:12:30,599 --> 01:12:33,079
This tells you, oh, I don't need to go any further

958
01:12:33,079 --> 01:12:34,720
if I'm worried about transaction T1.

959
01:12:36,039 --> 01:12:36,960
So you want that.

960
01:12:38,000 --> 01:12:41,399
All right, so what's in this log, records?

961
01:12:42,639 --> 01:12:45,199
I'm going to simplify it at a big dramatic level.

962
01:12:45,199 --> 01:12:48,399
There's a whole set of papers on what to put in the log records,

963
01:12:48,399 --> 01:12:50,319
but they all pretty much have this

964
01:12:50,319 --> 01:12:51,799
in the different type of log records too,

965
01:12:51,799 --> 01:12:54,639
besides begin, commit, and the ones I'm telling you.

966
01:12:54,639 --> 01:12:55,839
Again, we're going to ignore that.

967
01:12:55,839 --> 01:12:59,159
There's a big fact textbook they can come that Jim Gray wrote

968
01:12:59,159 --> 01:13:01,679
on all the details you'd ever want to know about transactions

969
01:13:01,679 --> 01:13:02,879
and logging.

970
01:13:02,879 --> 01:13:05,359
Borrow it from me if you're interested in that.

971
01:13:05,359 --> 01:13:09,000
For this course, we are going to assume logs

972
01:13:09,000 --> 01:13:11,519
have this common structure.

973
01:13:11,519 --> 01:13:13,799
They'll record which transaction do I belong to?

974
01:13:13,799 --> 01:13:15,879
What object am I logging?

975
01:13:15,879 --> 01:13:16,559
Record.

976
01:13:16,559 --> 01:13:18,279
And we're just going to assume its record level

977
01:13:18,279 --> 01:13:19,359
for this class.

978
01:13:19,359 --> 01:13:21,840
And then what type of information am I logging?

979
01:13:21,840 --> 01:13:24,960
Is it something that I use for undo or for redo?

980
01:13:24,960 --> 01:13:28,519
And obviously, the undo stuff, which means give me my old value,

981
01:13:28,519 --> 01:13:30,039
is something you wouldn't do if you're working

982
01:13:30,039 --> 01:13:32,119
with an NBCC based storage system.

983
01:13:33,519 --> 01:13:36,399
So little connection across that.

984
01:13:36,399 --> 01:13:37,880
But rest of it again, we are going to work

985
01:13:37,880 --> 01:13:39,479
with a single version system to keep

986
01:13:39,479 --> 01:13:42,399
all the PowerPoints sensible.

987
01:13:42,399 --> 01:13:46,239
So right ahead, logging example, start with the transaction.

988
01:13:46,239 --> 01:13:49,039
Now, as you can see, the Buffer Pool has a Buffer Pool

989
01:13:49,039 --> 01:13:50,159
for your pages.

990
01:13:50,159 --> 01:13:53,719
And a little additional thing called the right ahead buffer.

991
01:13:53,719 --> 01:13:57,479
So it's a Buffer Pool like your page-oriented Buffer Pool

992
01:13:57,479 --> 01:13:59,679
probably much smaller.

993
01:13:59,679 --> 01:14:03,479
And it's things from that get evicted from top to end.

994
01:14:03,479 --> 01:14:07,519
It's the log, as you'll see, is a linear sequence of log records

995
01:14:07,519 --> 01:14:08,840
they're ordered.

996
01:14:08,840 --> 01:14:10,920
And so effectively, the right ahead Buffer Pool

997
01:14:10,920 --> 01:14:12,079
is typically pretty small.

998
01:14:12,079 --> 01:14:15,559
It might just have a small number of pages

999
01:14:15,560 --> 01:14:16,840
you need at least two.

1000
01:14:16,840 --> 01:14:18,320
It might have a few hundred.

1001
01:14:18,320 --> 01:14:20,640
And everything's going to get flushed from top to bottom.

1002
01:14:20,640 --> 01:14:22,640
And that will become more clear when we talk about the recovery

1003
01:14:22,640 --> 01:14:24,760
protocol in the next class.

1004
01:14:24,760 --> 01:14:26,560
So it's a sequential file.

1005
01:14:26,560 --> 01:14:28,200
Little bit different than the other files.

1006
01:14:28,200 --> 01:14:29,440
But it has a Buffer Pool.

1007
01:14:29,440 --> 01:14:31,400
So that when log records are created,

1008
01:14:31,400 --> 01:14:33,240
they get created in the Buffer Pool.

1009
01:14:33,240 --> 01:14:36,200
So transaction T1 started, has a begin.

1010
01:14:36,200 --> 01:14:38,039
Now, T1 is getting written.

1011
01:14:38,039 --> 01:14:39,400
So that transaction is recording.

1012
01:14:39,400 --> 01:14:40,720
Your old value is one.

1013
01:14:40,720 --> 01:14:42,360
New value is eight.

1014
01:14:42,359 --> 01:14:44,119
Sorry, old value is eight.

1015
01:14:44,119 --> 01:14:45,559
New value is one.

1016
01:14:45,559 --> 01:14:48,759
And so that's why that record has T1 and 8,

1017
01:14:48,759 --> 01:14:49,960
because 8 was the old values.

1018
01:14:49,960 --> 01:14:54,279
Now, in the log record, I'm keeping track of my old and new value.

1019
01:14:54,279 --> 01:14:55,960
New pins, as we just talked about,

1020
01:14:55,960 --> 01:14:59,519
you can optimize that stuff if you're in NBCC.

1021
01:14:59,519 --> 01:15:01,039
And now, we got written.

1022
01:15:01,039 --> 01:15:04,199
Again, I've got old and new value when I write,

1023
01:15:04,199 --> 01:15:05,880
when the transaction is ready to commit.

1024
01:15:05,880 --> 01:15:09,000
Even though that log Buffer Pool page is not full for that

1025
01:15:09,000 --> 01:15:11,719
right ahead blog file, I will flush that

1026
01:15:11,720 --> 01:15:16,560
half full page to disk before I can declare from it.

1027
01:15:16,560 --> 01:15:20,159
When that page comes back with a OK, the page was written,

1028
01:15:20,159 --> 01:15:22,800
the transaction is declared committed.

1029
01:15:22,800 --> 01:15:25,079
Now, obviously, at the time we've

1030
01:15:25,079 --> 01:15:26,560
optimized a lot of things.

1031
01:15:26,560 --> 01:15:29,560
If this transaction were touching a million objects,

1032
01:15:29,560 --> 01:15:32,840
then it may have just created, if it were touching just one byte

1033
01:15:32,840 --> 01:15:36,159
in the million objects, it may have just created a few log pages,

1034
01:15:36,159 --> 01:15:39,920
as opposed to having to write million data pages to disk.

1035
01:15:39,920 --> 01:15:42,079
That's why you can see why this is faster.

1036
01:15:42,079 --> 01:15:46,239
But it's still slow, because at commit time,

1037
01:15:46,239 --> 01:15:49,079
I still have to wait for that disk I ought to come back.

1038
01:15:49,079 --> 01:15:53,640
And those are, as you know, many tens of milliseconds, right?

1039
01:15:53,640 --> 01:15:56,840
And so, even though it is safe, this can be slow.

1040
01:15:59,840 --> 01:16:03,840
And if the, now at that commit time, if the Buffer Pool gets

1041
01:16:03,840 --> 01:16:07,000
zapped out, the DRAM gets zapped out, which means I've lost both

1042
01:16:07,000 --> 01:16:10,479
Buffer Pool and can reconstruct from that log file.

1043
01:16:10,479 --> 01:16:13,439
But it's still slow, because for each commit,

1044
01:16:13,439 --> 01:16:16,000
I have to wait for the disk to finish.

1045
01:16:16,000 --> 01:16:18,039
Now, imagine I've got 100 transactions running.

1046
01:16:18,039 --> 01:16:20,399
They all are ready to commit.

1047
01:16:20,399 --> 01:16:22,720
The first transaction will come at, wait for that page

1048
01:16:22,720 --> 01:16:24,680
to come back.

1049
01:16:24,680 --> 01:16:26,960
The other transaction cannot come at till the page comes back.

1050
01:16:26,960 --> 01:16:29,960
So now, you're blocking transactions from tens of milliseconds,

1051
01:16:29,960 --> 01:16:31,000
which is an eternity.

1052
01:16:31,000 --> 01:16:34,079
I still have a pretty slow system, much better

1053
01:16:34,079 --> 01:16:37,159
than the no-steel force policy that we had,

1054
01:16:37,159 --> 01:16:39,119
but can be make it better.

1055
01:16:39,119 --> 01:16:42,319
So, most systems for high performance

1056
01:16:42,319 --> 01:16:44,479
will do something called group commit.

1057
01:16:44,479 --> 01:16:47,159
It's a very simple idea, is that I'm

1058
01:16:47,159 --> 01:16:50,760
going to batch up the commits that are coming together.

1059
01:16:50,760 --> 01:16:52,920
I'm going to pick an intro of like five milliseconds

1060
01:16:52,920 --> 01:16:53,640
or something like that.

1061
01:16:53,640 --> 01:16:54,800
It's pretty common.

1062
01:16:54,800 --> 01:16:56,519
And even though a transaction is ready to commit,

1063
01:16:56,519 --> 01:17:01,319
like T1 comes in, creates that stuff in the Buffer Pool here.

1064
01:17:01,319 --> 01:17:03,479
It's in the right-ahead Buffer Pool.

1065
01:17:03,479 --> 01:17:05,679
Now, I'm not showing the data Buffer Pool.

1066
01:17:05,679 --> 01:17:08,000
Remainter of this class will only

1067
01:17:08,000 --> 01:17:10,759
care about the right-ahead log Buffer Pool,

1068
01:17:10,759 --> 01:17:13,519
or the log manager's Buffer Pool.

1069
01:17:13,519 --> 01:17:17,959
This comes in, starts to go, and that page gets flushed

1070
01:17:17,959 --> 01:17:21,039
to disk, and that's fine, because maybe we need that page.

1071
01:17:21,039 --> 01:17:23,279
We start writing to that new page.

1072
01:17:23,279 --> 01:17:26,079
And one of the transactions is ready to commit.

1073
01:17:26,079 --> 01:17:28,519
As you can see, the other transaction

1074
01:17:28,519 --> 01:17:30,279
is going to come at very shortly.

1075
01:17:30,279 --> 01:17:32,719
We don't know that, but with the group commit,

1076
01:17:32,720 --> 01:17:34,800
what you do is you'll say, I as a transaction

1077
01:17:34,800 --> 01:17:36,079
and ready to commit.

1078
01:17:36,079 --> 01:17:36,680
But you know what?

1079
01:17:36,680 --> 01:17:39,079
I'm going to hold off for five milliseconds,

1080
01:17:39,079 --> 01:17:40,520
whatever is the timeout.

1081
01:17:40,520 --> 01:17:43,520
And wait for anyone else who wants to write a commit log

1082
01:17:43,520 --> 01:17:47,199
record to everything that's in the Buffer Pool.

1083
01:17:47,199 --> 01:17:48,960
And then every five milliseconds, I'm going to take

1084
01:17:48,960 --> 01:17:51,320
everyone that is waiting to be committed,

1085
01:17:51,320 --> 01:17:53,720
because they've declared, I've thrown my commit flag,

1086
01:17:53,720 --> 01:17:56,600
tell me when I'm done, you collect all of their log records,

1087
01:17:56,600 --> 01:17:58,880
and then you'll flush that out to disk.

1088
01:17:58,880 --> 01:18:01,520
And so effectively, when you write that page,

1089
01:18:01,520 --> 01:18:04,640
everything that you've written, all the transactions

1090
01:18:04,640 --> 01:18:06,320
that were ready to commit, they'll

1091
01:18:06,320 --> 01:18:10,160
wait an average of five milliseconds is your timeout interval.

1092
01:18:10,160 --> 01:18:12,560
They'll wait an average of 2.5 milliseconds.

1093
01:18:12,560 --> 01:18:16,800
But what you'll get is a much higher throughput system,

1094
01:18:16,800 --> 01:18:19,040
though you've added a little bit of latency

1095
01:18:19,040 --> 01:18:21,960
to each transaction on average 2.5 in this case.

1096
01:18:21,960 --> 01:18:24,280
But the throughput of the system will be much higher.

1097
01:18:24,280 --> 01:18:26,920
Because one disk I will commit a whole bunch of transactions.

1098
01:18:26,920 --> 01:18:29,240
If lots of transaction systems are active,

1099
01:18:29,240 --> 01:18:31,000
maybe you've got 100 transactions

1100
01:18:31,000 --> 01:18:33,640
that were ready to commit in that five milliseconds period.

1101
01:18:33,640 --> 01:18:36,399
So you'll get a much higher throughput system than you have.

1102
01:18:36,399 --> 01:18:38,920
So pretty much everyone does some form of group commit

1103
01:18:38,920 --> 01:18:39,640
to do that.

1104
01:18:39,640 --> 01:18:41,840
Some might even play around with a little bit of tricks,

1105
01:18:41,840 --> 01:18:44,920
like, oh, that I won't even wait.

1106
01:18:44,920 --> 01:18:46,119
They will go even further.

1107
01:18:46,119 --> 01:18:48,560
You'll see, I will write this out to disk.

1108
01:18:48,560 --> 01:18:52,079
I've initiated the disk I.O. I won't even wait for the I.O.

1109
01:18:52,079 --> 01:18:53,760
to come back and tell you it's committed.

1110
01:18:53,760 --> 01:18:54,840
And you can read the manuals.

1111
01:18:54,840 --> 01:18:57,399
And sometimes you'll see that in all the database vendors,

1112
01:18:57,399 --> 01:18:59,640
like, oh, you could set it up that way, which means it's

1113
01:18:59,640 --> 01:19:01,920
like what's your tolerance to that failure

1114
01:19:01,920 --> 01:19:05,119
in that short amount of time while that I.O. happens?

1115
01:19:05,119 --> 01:19:08,119
There are options like that, you will see.

1116
01:19:08,119 --> 01:19:08,880
A couple more slides.

1117
01:19:08,880 --> 01:19:11,000
And then I promise I will stop.

1118
01:19:11,000 --> 01:19:14,640
The logging schemes are, I want to finish the logging schemes

1119
01:19:14,640 --> 01:19:16,280
and then they'll stop.

1120
01:19:16,280 --> 01:19:17,920
There are three different types of logging schemes.

1121
01:19:17,920 --> 01:19:19,280
Let's just go through that.

1122
01:19:19,280 --> 01:19:21,480
The first one is physical logging, which

1123
01:19:21,480 --> 01:19:25,079
is to say, what I'm going to record is effectively

1124
01:19:25,079 --> 01:19:26,600
like a good diff.

1125
01:19:26,600 --> 01:19:30,960
I'm going to record in the log, the before and after image

1126
01:19:30,960 --> 01:19:32,760
of what was changed.

1127
01:19:32,760 --> 01:19:36,640
Now, usually that is done at the value level.

1128
01:19:36,640 --> 01:19:38,400
But as you can imagine, this diff can start

1129
01:19:38,400 --> 01:19:40,440
to become really large.

1130
01:19:40,440 --> 01:19:42,800
Now, the challenge with this scheme

1131
01:19:42,800 --> 01:19:46,280
is that if I'm doing this, imagine I've got a page.

1132
01:19:46,280 --> 01:19:49,920
And that page is a slotted page structure.

1133
01:19:49,920 --> 01:19:53,440
And records can move around in a slotted page structure

1134
01:19:53,440 --> 01:19:55,240
while still keeping the slot ID.

1135
01:19:55,239 --> 01:19:58,479
You might have compaction happening inside the page, for example.

1136
01:19:58,479 --> 01:20:01,039
This physical logging, when I'm keeping

1137
01:20:01,039 --> 01:20:03,800
before and after images might record changes

1138
01:20:03,800 --> 01:20:06,399
at the page level of stuff that is not even changed

1139
01:20:06,399 --> 01:20:07,479
by this transaction.

1140
01:20:07,479 --> 01:20:10,479
Because it was just the before and after images

1141
01:20:10,479 --> 01:20:13,559
might have physically looking at the bytes that

1142
01:20:13,559 --> 01:20:16,359
have been changed on the page before and after

1143
01:20:16,359 --> 01:20:17,639
and might get a whole bunch of stuff that

1144
01:20:17,639 --> 01:20:19,599
is irrelevant to the actual changes,

1145
01:20:19,599 --> 01:20:23,439
which is a cue to the physiological logging that is coming next.

1146
01:20:23,439 --> 01:20:26,279
As the other extreme, which is to say logical logging,

1147
01:20:26,279 --> 01:20:29,279
I'm just going to record the data function

1148
01:20:29,279 --> 01:20:32,279
that caused this value to change.

1149
01:20:32,279 --> 01:20:35,239
In a very simple form, it is recording the query.

1150
01:20:35,239 --> 01:20:39,319
More often, it's going to be, I incremented the value by 10.

1151
01:20:39,319 --> 01:20:42,119
If that was an update like that, if the update query

1152
01:20:42,119 --> 01:20:44,759
is at 8 plus 10, this would actually record,

1153
01:20:44,759 --> 01:20:46,079
I'm an increment function.

1154
01:20:46,079 --> 01:20:48,239
And my parameter was 10 to this record.

1155
01:20:48,239 --> 01:20:52,319
So it would logically record what was changed.

1156
01:20:52,319 --> 01:20:55,079
Or it might say, I updated 10 for everything

1157
01:20:55,079 --> 01:20:58,000
that has a predicate of B greater than 10.

1158
01:20:58,000 --> 01:21:00,239
Effectively, take whatever is in the query,

1159
01:21:00,239 --> 01:21:02,159
find some representation for that,

1160
01:21:02,159 --> 01:21:05,799
and represent that in the logical structure, in the log.

1161
01:21:05,799 --> 01:21:12,799
Now, you can get a much more compact log record.

1162
01:21:12,799 --> 01:21:16,239
But when you have to go and apply these changes,

1163
01:21:16,239 --> 01:21:19,159
you have to actually go run that query again to redo it.

1164
01:21:19,159 --> 01:21:21,079
And if that query took an hour to run,

1165
01:21:21,079 --> 01:21:22,880
while applying the log, you're going to have to take an hour

1166
01:21:22,880 --> 01:21:23,880
to run.

1167
01:21:23,880 --> 01:21:25,600
And so that could be very expensive.

1168
01:21:25,600 --> 01:21:27,199
So people don't do logical logging.

1169
01:21:27,199 --> 01:21:30,439
What people do is this, basic theological logging, which

1170
01:21:30,439 --> 01:21:32,640
basically, going back to the previous slide,

1171
01:21:32,640 --> 01:21:35,239
is it's physical to a page.

1172
01:21:35,239 --> 01:21:41,199
So at the page level, you'll keep track of the before and after

1173
01:21:41,199 --> 01:21:42,039
images.

1174
01:21:42,039 --> 01:21:46,559
But for every page that you change,

1175
01:21:46,559 --> 01:21:48,600
you're going to create a log record.

1176
01:21:48,600 --> 01:21:50,359
But within the page, you'll just say

1177
01:21:50,439 --> 01:21:51,439
what was the update made?

1178
01:21:51,439 --> 01:21:54,759
So if the records got moved around, you won't have that.

1179
01:21:54,759 --> 01:21:57,559
The downside is that a given operation log record

1180
01:21:57,559 --> 01:21:59,359
might now generate multiple log records.

1181
01:21:59,359 --> 01:22:04,159
So if something changed an update to a record

1182
01:22:04,159 --> 01:22:06,960
might have involved or updated to in the transaction,

1183
01:22:06,960 --> 01:22:09,159
might have involved changes to multiple pages.

1184
01:22:09,159 --> 01:22:11,679
You'll have one log record per page.

1185
01:22:11,679 --> 01:22:14,519
The bottom line is there are different logging schemes.

1186
01:22:14,519 --> 01:22:16,359
And what we will use this logging schemes

1187
01:22:16,359 --> 01:22:19,599
is to do the redo and undo, and we'll pick up on that

1188
01:22:19,600 --> 01:22:20,600
in the next class.

1189
01:22:21,600 --> 01:22:23,600
I'm the poppy with the motherfucking hog.

1190
01:22:23,600 --> 01:22:26,600
28 gram, the pen and all, if it's the pop.

1191
01:22:26,600 --> 01:22:28,600
You ain't hit the mob yet.

1192
01:22:28,600 --> 01:22:30,600
Still got your shut up.

1193
01:22:30,600 --> 01:22:32,600
I smack you with the bottom of the clip.

1194
01:22:32,600 --> 01:22:33,600
I'll tell you, little dog.

1195
01:22:33,600 --> 01:22:35,600
Show me what it's safe set.

1196
01:22:35,600 --> 01:22:39,200
For I blow your face, I'm the poppy with the

1197
01:22:39,200 --> 01:22:40,600
motherfucking hog.

1198
01:22:40,600 --> 01:22:42,600
28 gram, the pen and all, if it's the pop.

1199
01:22:42,600 --> 01:22:44,600
You ain't hit the mob yet.

1200
01:22:44,600 --> 01:22:45,600
Still got your shut up.

1201
01:22:45,600 --> 01:22:47,600
I smack you with the bottom of the clip.

1202
01:22:47,600 --> 01:22:48,600
I'll tell you, little dog.

1203
01:22:48,600 --> 01:22:49,600
Show me what it's safe set.

1204
01:22:49,600 --> 01:22:50,600
For I blow your face back.

1205
01:22:50,600 --> 01:22:51,600
I got a block on top.

1206
01:22:51,600 --> 01:22:53,600
The feds can't trace that.

1207
01:22:53,600 --> 01:22:55,600
Style is like temp, but proof.

1208
01:22:55,600 --> 01:22:57,600
You can't lace that at the Dominican.

1209
01:22:57,600 --> 01:22:59,600
Oh, you could call me Dominican.

1210
01:22:59,600 --> 01:23:00,600
Black Skelly, black, nothing.

1211
01:23:00,600 --> 01:23:01,600
Blacks, sweat, dimmelons.

1212
01:23:01,600 --> 01:23:04,600
My whole black, dirty eight, send you to the purly gates.

1213
01:23:04,600 --> 01:23:05,600
You get the slumber, trying to skate.

1214
01:23:05,600 --> 01:23:06,600
And that's your first mistake.

1215
01:23:06,600 --> 01:23:08,600
I ain't lying for that cake.

1216
01:23:08,600 --> 01:23:09,600
You're famous.

1217
01:23:09,600 --> 01:23:10,600
See you, wait.

1218
01:23:10,600 --> 01:23:11,600
My grandson's happy, wait.

1219
01:23:11,600 --> 01:23:12,600
The ran through every state.

1220
01:23:12,600 --> 01:23:14,600
When they asked me how I'm living, I tell them I'm living great.

