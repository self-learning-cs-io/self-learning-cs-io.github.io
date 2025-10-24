---
title: MIT6824 P12Lecture12 CacheConsistency Frangipani
---

1
00:00:00,000 --> 00:00:07,000
Okay, so good morning, good afternoon or good evening or wherever you are.

2
00:00:07,000 --> 00:00:11,000
So the point for today is to talk about the frontier pony.

3
00:00:11,000 --> 00:00:17,000
This is a paper from 1997. So it's a bit of an older paper.

4
00:00:17,000 --> 00:00:29,000
The context of this paper is network file systems.

5
00:00:29,000 --> 00:00:40,000
And you should think about systems such as, you know, a FINA AFS, you know, then do a file system and a FINA Dropbox or a more modern version of this.

6
00:00:40,000 --> 00:00:46,000
But the general goal here is to basically share files between a collection of users.

7
00:00:46,000 --> 00:00:53,000
The frontier pony itself is not widely used or wasn't widely used outside of the deck.

8
00:00:53,000 --> 00:01:01,000
And so the real, the focus of the things that you should get out of this paper today are free ideas.

9
00:01:01,000 --> 00:01:05,000
An idea is that actually we'll show up over and over in the couple next couple weeks.

10
00:01:05,000 --> 00:01:09,000
First of all, cash coherence.

11
00:01:09,000 --> 00:01:14,000
Protocols for cash coherence.

12
00:01:14,000 --> 00:01:22,000
Second distributed locking.

13
00:01:22,000 --> 00:01:33,000
And third distributed crash recovery.

14
00:01:33,000 --> 00:01:38,000
And these are going to be free ideas that are going to be as I mentioned show up in the next couple of weeks.

15
00:01:38,000 --> 00:01:44,000
In the particular, we're going to read, you know, starting next week to sort of heavy duty transaction systems.

16
00:01:44,000 --> 00:01:54,000
And they build a lot on, again, some of the technique or the use of the techniques that actually a frontier pony also uses.

17
00:01:54,000 --> 00:02:03,000
And so frontier ponies are a more gently introduction to these free topics before we get to heavy duty transaction systems.

18
00:02:03,000 --> 00:02:07,000
And the idea is also in front of itself is an interesting design.

19
00:02:07,000 --> 00:02:12,000
And so from a distributed system perspective, it is a cool system.

20
00:02:12,000 --> 00:02:20,000
And let me make that point by sort of trusting sort of the traditional designs for a network file system.

21
00:02:20,000 --> 00:02:26,000
So traditional or the most common network file system designs.

22
00:02:26,000 --> 00:02:34,000
And so if you think about like, and a F S on a few, you know, you have a set of clients.

23
00:02:34,000 --> 00:02:36,000
And this is going to make a very simple picture.

24
00:02:36,000 --> 00:02:45,000
You have a set of clients connected to some network represent the network basically is a single wire, you know, sharing, you know, a number of file servers.

25
00:02:45,000 --> 00:02:47,000
And then file servers.

26
00:02:47,000 --> 00:02:53,000
There desk.

27
00:02:53,000 --> 00:02:58,000
And basically, all the complexity.

28
00:02:58,000 --> 00:03:04,000
Okay, I'll get to catch me here in detail in a second.

29
00:03:04,000 --> 00:03:09,000
All the complexity in this design is basically here at the file server.

30
00:03:09,000 --> 00:03:15,000
So the file server is implementing all the file system operations open closed reach right, you know, stat or everything.

31
00:03:15,000 --> 00:03:19,000
And they write, you know, things to disk in the crash.

32
00:03:19,000 --> 00:03:21,000
Resilient the resistant way.

33
00:03:21,000 --> 00:03:24,000
And the clients are really sort of dumb or simple.

34
00:03:24,000 --> 00:03:28,000
They don't really do much, you know, perhaps they do some cashing us they do in a S.

35
00:03:28,000 --> 00:03:37,000
But you know, most of it is they're relaying, you know, file system operations from clients from programs that are running like whatever the irons on your client one.

36
00:03:37,000 --> 00:03:39,000
And open closed.

37
00:03:39,000 --> 00:03:43,000
And most of what the client does is relaying this operations to file servers.

38
00:03:43,000 --> 00:03:49,000
In one reason that the design is, you know, popular is the because you know, like in terms of a security perspective.

39
00:03:49,000 --> 00:03:57,000
And the client is a nice design because most of the, you know, the file servers have to be trusted, but the clients don't have to be trusted.

40
00:03:57,000 --> 00:04:04,000
And so, you know, setting like MIT were like the machines are just in public and you know, who is what kind of software on it.

41
00:04:04,000 --> 00:04:07,000
You know, that is a nice property.

42
00:04:07,000 --> 00:04:15,000
And there's a very different design and much more decentralized design.

43
00:04:15,000 --> 00:04:19,000
And in front of the body actually a lot of the file server.

44
00:04:19,000 --> 00:04:23,000
It's really there's actually no real file server in the sort of little sense the word.

45
00:04:23,000 --> 00:04:26,000
But the clients basically implement.

46
00:04:26,000 --> 00:04:29,000
Run the file server code itself.

47
00:04:29,000 --> 00:04:32,000
So let's say we have two, you know, clients.

48
00:04:32,000 --> 00:04:46,000
And most of the file system code itself like the thing that actually has I know manages I know updates and files creates directories all the code instead of living on the file server looks like lives on the clients.

49
00:04:46,000 --> 00:04:59,000
And the only thing that really the file server share is a big virtual disk.

50
00:04:59,000 --> 00:05:08,000
And if you will, you know, maybe a good image to have a year ahead or some conceptual image to have the ahead is that the virtual disk is basically like a big SSD drive.

51
00:05:08,000 --> 00:05:16,000
And so the file servers, there's basically share one SSD, you know, one disk with each other.

52
00:05:16,000 --> 00:05:26,000
Now, of course, internally this virtual disk is implemented using a system called pedal and you know consists actually of many machines.

53
00:05:26,000 --> 00:05:36,000
And you know, you know, you get another machine replicate you know disc blocks, you know, there are taxes internally to make sure that like it's a lot of praises could apply in the right order and all what kind of stuff.

54
00:05:36,000 --> 00:05:43,000
But from the outside perspective, you know, the interface is really read a block right a block.

55
00:05:43,000 --> 00:05:46,000
And so it just looks like an ordinary disk.

56
00:05:46,000 --> 00:05:56,000
And so where there's interesting in this you know design you can contrast the two designs actually a lot of the complexity in this design is on the client side.

57
00:05:56,000 --> 00:06:13,000
And you know, one reason they like that or why the is that you know you can grow the file system with the number of workstation, so if you increase the number of clients, you know, they're basically get more CPU bar because you get more clients and then each of the clients can go around its own file system.

58
00:06:13,000 --> 00:06:20,000
So a lot of the really happy to do the computation can just all be done on the client machines and doesn't involve you know any file server at all.

59
00:06:20,000 --> 00:06:25,000
And it's true that in sort of in the left side, the network traditional network file system design.

60
00:06:25,000 --> 00:06:41,000
It's often the case that you know the performance bottom extra right, you know, in the in the file server, you know, one of the number of clients actually becomes too much often in that case, for example, we split the file system in across different file server version.

61
00:06:41,000 --> 00:06:56,000
Okay, so that's sort of the sort of from our perspective or least from the distributed systems design front to ponies, interesting because there's like much more decentralized than sort of the traditional network file system designs.

62
00:06:56,000 --> 00:07:06,000
And the reason you know they sort of wanted to explore this design is a lot to do with the use case that they imagine or that they were targeting.

63
00:07:06,000 --> 00:07:11,000
And so I want to say a little bit about the use case because there were a lot of questions related to that in that of the email.

64
00:07:11,000 --> 00:07:15,000
So, so what is the use case?

65
00:07:15,000 --> 00:07:25,000
The use case is basically a number of researchers, where an engineer.

66
00:07:25,000 --> 00:07:29,000
You know compiling.

67
00:07:29,000 --> 00:07:40,000
Compiling editing, you know, their programs were writing documents.

68
00:07:40,000 --> 00:07:52,000
And it's really designing, you know, the papers from things research lab, that's high tech, and tech, and tech, so it's like tens of research like 50 to 100.

69
00:07:52,000 --> 00:07:57,000
And they're really worth it is designing a file system for their use case.

70
00:07:57,000 --> 00:08:03,000
And so everybody is trusted. All the machines are trusted, all the software running that are untrusted.

71
00:08:03,000 --> 00:08:07,000
And so the security side of things is really not an issue for that.

72
00:08:07,000 --> 00:08:21,000
All the research are sort of heavy duty computer users and you know, and they want to, but mostly they're working on their own private files and they're writing their own programs, they're writing their own documents.

73
00:08:21,000 --> 00:08:26,000
And so there's one to interact with the files with a high performance file system.

74
00:08:26,000 --> 00:08:33,000
Of course, you know, they might share otherwise sharing would not be interesting.

75
00:08:33,000 --> 00:08:37,000
So they post potentially share files and directories.

76
00:08:37,000 --> 00:08:39,000
It shows up in sort of two ways.

77
00:08:39,000 --> 00:08:45,000
You know, they may work together to collaborate together on writing a paper like the paper that we're reading today.

78
00:08:45,000 --> 00:08:52,000
And so they want to access the shared files, you know, for the director that holds that particular paper.

79
00:08:52,000 --> 00:08:58,000
So use the user sharing.

80
00:08:58,000 --> 00:09:11,000
And then there's a second form of sharing that like the same user might log into multiple workstations.

81
00:09:11,000 --> 00:09:13,000
One more workstation.

82
00:09:13,000 --> 00:09:16,000
You know, there's a lot of different ways of getting whatever.

83
00:09:16,000 --> 00:09:22,000
You're one of the research goes to the public library of Dexerrk or their library and the logs in one of the public workstation within Dexerrk.

84
00:09:22,000 --> 00:09:24,000
And it wants to be able to be the right there.

85
00:09:24,000 --> 00:09:26,000
Their files from that, you know, that machine too.

86
00:09:26,000 --> 00:09:28,000
So that's the use case.

87
00:09:28,000 --> 00:09:35,000
And this use case has sort of a number of design implications.

88
00:09:35,000 --> 00:09:41,000
Or you know design choices that were motivated by the use case.

89
00:09:41,000 --> 00:09:52,000
And one of the primary ones that was motivated by this use case is caching.

90
00:09:52,000 --> 00:09:58,000
So instead of leaving the data for example, all in pedal and every read and write operation goes through pedal.

91
00:09:58,000 --> 00:10:02,000
They want to arrange it so that most of actually the action happens on the workstations.

92
00:10:02,000 --> 00:10:08,000
And so that the researchers, since they're mostly working on their own private files, you know, since it's like make a lot of sense.

93
00:10:08,000 --> 00:10:16,000
And if you're able to make a lot of data locally on the workstation, then as you read the right files, there's like basically no network traffic really necessary.

94
00:10:16,000 --> 00:10:19,000
And you can sort of write at high performance.

95
00:10:19,000 --> 00:10:29,000
And you know, one reason one way they avoid, you know, having seen a lot of traffic to pedal is they have a right back cash instead of a right through.

96
00:10:29,000 --> 00:10:35,000
And so if operations happen actually, they just stay in the cash and at some point later they're frequently related to pedal us.

97
00:10:35,000 --> 00:10:38,000
And so that's what I mean in the second one.

98
00:10:38,000 --> 00:10:46,000
And so combined with that, like even though they're doing mostly, you know, workloads are going to be sort of private where there's not sharing going on.

99
00:10:46,000 --> 00:11:02,000
Of course, indicates they do share they want to have strong consistency or sometimes called you know career is.

100
00:11:02,000 --> 00:11:18,000
And so meaning, for example, if one user writes a file, then another user on the auto workstation reads the file, the great if that user actually saw the changes that the other workstation, the other user has made.

101
00:11:18,000 --> 00:11:23,000
And so they want strong consistency.

102
00:11:23,000 --> 00:11:43,000
So those are the two design choices that really drive this design as well as this, you know, basically performance.

103
00:11:43,000 --> 00:11:55,000
And maybe it's helpful, you know, to think a little bit about like what other use cases could you have a file system. So maybe one good one that we talked a lot about is to think about gfs.

104
00:11:55,000 --> 00:12:01,000
You know, would gfs be substitute from front to bottom or the other way around like how do they contrast.

105
00:12:01,000 --> 00:12:07,000
And one way to think about this is that you know gfs is really file system designed from that produce applications.

106
00:12:07,000 --> 00:12:13,000
And so it's a file system where files are not cashed.

107
00:12:13,000 --> 00:12:19,000
And in fact, you know, the file system tend to be so big that they wouldn't even fit in the type of cashers that we're talking about.

108
00:12:19,000 --> 00:12:23,000
The files are basically sort of wrapped in sequentially from beginning to end. And that's it.

109
00:12:23,000 --> 00:12:29,000
And then maybe you know some other computer will read that file because some other map produce application running on it.

110
00:12:29,000 --> 00:12:31,000
And so I think you think about gfs.

111
00:12:31,000 --> 00:12:39,000
There's really no data cash going on at all. There was a little bit of cash going on to keep track of where the trunk servers were.

112
00:12:39,000 --> 00:12:45,000
But there's actually no cash from data going on at all in gfs. And so there's also no cash consistency problem in gfs.

113
00:12:45,000 --> 00:12:50,000
And so there's a type of applications that they were targeting that just didn't make a sense at all.

114
00:12:50,000 --> 00:12:56,000
Similarly in gfs, gfs actually is not really a real file system in the sense of the here.

115
00:12:56,000 --> 00:13:00,000
There's not intended to run like vi gcc.

116
00:13:00,000 --> 00:13:08,000
And so it didn't provide like strips or it's a positive or unique compatibility in the front of the you can just run your standard units applications.

117
00:13:08,000 --> 00:13:17,000
And things just work out and the application behave in the same way as if there was not a distributed file system but basically single file system.

118
00:13:17,000 --> 00:13:32,000
And again, in gfs, you know, there's the there was not where there's a little library, you know, not actually application use this for read or write files in gfs, but it was not like you know 100% doing this compatible at all.

119
00:13:32,000 --> 00:13:36,000
So let me give you a sense that we're going to these workloads.

120
00:13:36,000 --> 00:13:44,000
And so it's a very bright, you know, really the design of these different of these systems in the case of duty fast, and it's the map reduce application that drove the design.

121
00:13:44,000 --> 00:13:55,000
In the case of frontipani of the shared files is literally collection users working on some shared file system with most of the operations, you know, they're performing a probably just on files day on.

122
00:13:55,000 --> 00:13:58,000
And sort of getting the before we look at it.

123
00:13:58,000 --> 00:14:16,000
Does that make sense? In turn for contrast and settings. So you see actually there are quite a different number of file systems around like a zookeeper's yet another sort of provides this file system interface, but it's not really a file system, you know, it's like more of a tenant as a coordination service, you wouldn't store big files in zookeeper.

124
00:14:16,000 --> 00:14:22,000
Any questions about this setting.

125
00:14:22,000 --> 00:14:35,000
Can you briefly repeat why having the file server code running on the client machine enhances scalability versus having the client and the file server being on different machines or on different.

126
00:14:35,000 --> 00:14:43,000
Yeah, so for example, if you know that like to go back to this previous slide here, you know on the left, this the network file system and character, even there's many, many, many clients.

127
00:14:43,000 --> 00:14:53,000
Let's think of there's only one, you know, there's let me simplify this picture for a second and look at the second file server there's one file server so everybody can share the files and the free file server.

128
00:14:53,000 --> 00:14:56,000
Then all these clients will be hammering on that single file server.

129
00:14:56,000 --> 00:15:03,000
And so all the read and write-out breaks quick are going to be sent to the file server, the file server does the directory look up.

130
00:15:03,000 --> 00:15:15,000
It opens files and just the security checks and all the kind of stuff so all the computation really for the file system itself is all happening on the file server itself in the sort of traditional network file system design.

131
00:15:15,000 --> 00:15:17,000
In the front of Pony that's not the case.

132
00:15:17,000 --> 00:15:21,000
In front of Pony all the file system operations are executed on the workstations.

133
00:15:21,000 --> 00:15:31,000
And so we have multiple workstations that are basically the workload that this file system can scale or can support scales with the number of workstations.

134
00:15:31,000 --> 00:15:47,000
I see and in the traditional architecture so every file server contains or stores let's say a section of the entire file system right so it does so it's not the case that every single file server has a copy of the entire system.

135
00:15:47,000 --> 00:15:49,000
It's that it might be partitioned across.

136
00:15:49,000 --> 00:16:02,000
Yeah, it might be a approximate example in a fast break, you know, there are different volumes and you know file servers manage different volumes and the data of all the users and my team spread across the different volumes.

137
00:16:02,000 --> 00:16:05,000
But all the data like for one volume is going to be in one file server.

138
00:16:05,000 --> 00:16:10,000
And so that file volume gets hit hard, you know, you're going to get the forms bottom next.

139
00:16:10,000 --> 00:16:14,000
Okay, awesome. Thank you.

140
00:16:14,000 --> 00:16:26,000
Any more questions about sort of the setting here before we dive in to more front and pine.

141
00:16:26,000 --> 00:16:28,000
Okay, good.

142
00:16:28,000 --> 00:16:34,000
So now the design choices they made, I mean, it leads to a number of challenges.

143
00:16:34,000 --> 00:16:42,000
So I want to talk a little bit about the challenges.

144
00:16:42,000 --> 00:16:52,000
And the main one, you know, the drives almost a ton of the design is like so you have one workstations workstation one.

145
00:16:52,000 --> 00:16:58,000
And those days when people have workstations and laptops were actually not really existed yet.

146
00:16:58,000 --> 00:17:05,000
Today probably will be all kinds of laptops, but you know, so there's a workstation and somebody like whatever reach a file.

147
00:17:05,000 --> 00:17:10,000
Whatever, you know, maybe the great day to day today. So the great file.

148
00:17:10,000 --> 00:17:16,000
And so that basically that means that that file actually is cashed inside of the workstation.

149
00:17:16,000 --> 00:17:23,000
And so the client, you know, whatever program running, you know, the I you know, get an update and manipulate the file.

150
00:17:23,000 --> 00:17:30,000
And then you know, sometimes later the result will be written back, you know, to pedal the disk, if you will.

151
00:17:30,000 --> 00:17:35,000
And so the challenges that are basically run this model at free fault.

152
00:17:35,000 --> 00:17:42,000
One somebody else in workstation to maybe at some point do a cat of F.

153
00:17:42,000 --> 00:17:54,000
And get it the file F. And of course, it should be the case that you know, at least like normally expected we have a traditional unit file system that you know you will see the last right to that particular F.

154
00:17:54,000 --> 00:18:04,000
So even though the right might have happened at a different workstation, when the second workstation reach the file, we would like to see that data show up.

155
00:18:04,000 --> 00:18:11,000
And this is what they, you know, we're going to be roughly this broadly comes to cash to hear us.

156
00:18:11,000 --> 00:18:22,000
And other war synonyms for coherence are cash consistency, which is like the term that we have seen more in the previous papers, but in the sort of the

157
00:18:22,000 --> 00:18:28,000
architecture world actually the term coherence comes comes from that world.

158
00:18:28,000 --> 00:18:33,000
And so you can think about that as a synonyms.

159
00:18:33,000 --> 00:18:43,000
To the second problem that you know, you that's going to occur and we need to deal with is that let's say that workstation one.

160
00:18:43,000 --> 00:18:48,000
And workstation two both want to create a file in the particular in the shared directory.

161
00:18:48,000 --> 00:18:58,000
So like when you're in workstation one creates the file F in the directory D and workstation two also creates a file say G in directory D.

162
00:18:58,000 --> 00:19:11,000
And we want to be arranged it at least that like it works as you want makes the changes and then workstation two makes the changes that like both files appear and that like one file doesn't overwrite say the directory.

163
00:19:11,000 --> 00:19:17,000
And the other or basically overwrite the directory in a way that actually the other files of disappears.

164
00:19:17,000 --> 00:19:24,000
So this has to sort of second topic you really is on the city.

165
00:19:24,000 --> 00:19:33,000
These operations of creating a file really has to be has to be sort of an atomic operation so that they don't get introduced and we get wrong results.

166
00:19:33,000 --> 00:19:41,000
So that's a problem that we need to deal with is that you know workstation one.

167
00:19:41,000 --> 00:19:51,000
You know my crash while doing one of these complex file system operations.

168
00:19:51,000 --> 00:19:56,000
And so that has to be a story you know how actually the file system recovers.

169
00:19:56,000 --> 00:20:02,000
And so this is really story about crash recovery.

170
00:20:02,000 --> 00:20:07,000
So for example like in this first case where like workstation makes a file in a directory D.

171
00:20:07,000 --> 00:20:14,000
Now there's actually a complex operation you know the director needs to be modified and I know needs to be allocated and I know needs to be initialized.

172
00:20:14,000 --> 00:20:17,000
And then the I know number needs to be written into the directory.

173
00:20:17,000 --> 00:20:27,000
So there's multiple sort of file system operation involved in it and we wanted to be the case that you know if the files through crashes between any of these steps in this sort of complex file system operation.

174
00:20:27,000 --> 00:20:30,000
The better the case that the file system recovers correctly.

175
00:20:30,000 --> 00:20:35,000
And more meaning we file some recovery correctly at least that it's internal data structure are correct.

176
00:20:35,000 --> 00:20:40,000
And so again, well that the I know is not lost because it doesn't show up in the directory, etc, etc.

177
00:20:40,000 --> 00:20:44,000
Or like even that the whole sort of internal structure is consistent.

178
00:20:44,000 --> 00:20:46,000
So this is a topic of crash recovery.

179
00:20:46,000 --> 00:20:54,000
And so panel basically were for defining each the address in all of these through problems and my client assistant go.

180
00:20:54,000 --> 00:21:01,000
Walk through them one by one and discuss how front to party address system.

181
00:21:01,000 --> 00:21:10,000
Any questions about the top level challenges.

182
00:21:10,000 --> 00:21:28,000
Okay, let's proceed. So the first thing is cash ringer for cash consistency.

183
00:21:28,000 --> 00:21:39,000
And so the key aspect in the solution that front to bottom uses is that actually use a lock server somewhere.

184
00:21:39,000 --> 00:21:46,000
And so and the lock server basically has a table.

185
00:21:46,000 --> 00:21:52,000
And for every file and an X instance, I know number but for every file.

186
00:21:52,000 --> 00:21:58,000
Who has to walk at this particular point of time. So who's the owner.

187
00:21:58,000 --> 00:22:08,000
So we might have a file F and basically says work and for which the lock server has a record that the work station one own staff particular why.

188
00:22:08,000 --> 00:22:17,000
And the lock server itself is a distributed service and you can almost think about it or sort of almost like zookeeper.

189
00:22:17,000 --> 00:22:21,000
And it is that it provides your acquire your leasing of locks.

190
00:22:21,000 --> 00:22:29,000
It's fault tolerance in the case of front to bunny that use some taxes based implementation.

191
00:22:29,000 --> 00:22:36,000
But it's spread over across multiple machines highly fault tolerance, etc, etc.

192
00:22:36,000 --> 00:22:41,000
So that's the lock server.

193
00:22:41,000 --> 00:22:47,000
The turns out that the work station sort of also keep a table for their locks.

194
00:22:47,000 --> 00:22:56,000
So here's work station one. And you know, that might be, you know, let's say work station one cash is filed F and G.

195
00:22:56,000 --> 00:23:03,000
Maybe age is cash by work station works, station one, ages maybe cash by work station two.

196
00:23:03,000 --> 00:23:15,000
And then work station one has a similar table and that list for every file, every lock that it holds when it's either busy or idle.

197
00:23:15,000 --> 00:23:19,000
So like it may be F, you know, the lock status is busy.

198
00:23:19,000 --> 00:23:26,000
And that really means that actually the file servers just operating on that file. So it's actively using that file.

199
00:23:26,000 --> 00:23:34,000
But there's a second state, namely, let's say we have filed G was also cash there. And maybe G is actually in the state, but they call idle.

200
00:23:34,000 --> 00:23:44,000
That means actually the G at that point is not being modified and we're not being worked on by the file server that particular instant time.

201
00:23:44,000 --> 00:23:48,000
But it's basically what they call a sticky lock.

202
00:23:48,000 --> 00:24:07,000
If you know the file server at some point soon, you know, it's going to use a G again, it can actually do so without actually having to communicate the pedal or reload its cash or anything like that at all, because it has a sticky lock knows that nobody else actually has acquired no other work station has required the lock in the meantime.

203
00:24:07,000 --> 00:24:27,000
That's the sticky lock and turns out that the the the these are just two building blocks that then are then being used to what they call what's what's called a cash be here protocol and set a message is worse and a rules that are being followed to actually get cash consistency.

204
00:24:27,000 --> 00:24:39,000
And the basic rule is that you know the guiding rule is to cash a file.

205
00:24:39,000 --> 00:24:44,000
You first must acquire the lock.

206
00:24:44,000 --> 00:24:53,000
So you know that rule is sort of the stepping stone for actually getting cash to his consistency or cash be here.

207
00:24:53,000 --> 00:25:02,000
And I'm going to make a small simplification in the paper to describe the blocks basically being exclusive or read or write or walks.

208
00:25:02,000 --> 00:25:13,000
I'm just going to assume for the rest of the lecture that they're exclusive doesn't really matter, but there's an optimization that basically multiple workstations can have a file cash in read only mode.

209
00:25:13,000 --> 00:25:23,000
So with that, let me talk a little bit about the cut shout out of the protocol that for him to finally uses.

210
00:25:23,000 --> 00:25:28,000
And again, you know, cash coherence or cash consistency.

211
00:25:28,000 --> 00:25:35,000
The goal actually for even though the file system is distributed should behave like a single file system.

212
00:25:35,000 --> 00:25:41,000
So one file server you want to basically that the same results would be returned by the distributed file system.

213
00:25:41,000 --> 00:25:45,000
So you can't cut the difference where it's distributed or not.

214
00:25:45,000 --> 00:25:53,000
And so this is a sure you remind me of like linearizability. So I think you know I believe actually what from Japan.

215
00:25:53,000 --> 00:25:57,000
So it's actually a linearizable file system operations.

216
00:25:57,000 --> 00:26:01,000
Okay, so we got the lock server.

217
00:26:01,000 --> 00:26:04,000
We got workstation one.

218
00:26:04,000 --> 00:26:08,000
And there's workstations to.

219
00:26:08,000 --> 00:26:19,000
And there's sort of four messages that are important to hear does not namely requesting the lock granting the lock and revoking a lock and actually releasing the locks.

220
00:26:19,000 --> 00:26:27,000
And the message is the flyer between back and forward between workstations and lock server and lock server and other workstations.

221
00:26:27,000 --> 00:26:35,000
So let's look at this. Let's say the lock server has nobody has any locks at any time. So let's trust and timelines.

222
00:26:35,000 --> 00:26:47,000
And workstation in one wants the request wants to reach right file F, you know, basically sense and request for the lock to the lock server for file F.

223
00:26:47,000 --> 00:26:51,000
So workstation can do anything really at this point yet.

224
00:26:51,000 --> 00:27:04,000
The lock server no checks, it's table and sees that F actually is not used by anybody else, you know, less workstation one as the lock owner and sends basically invested back and granting.

225
00:27:04,000 --> 00:27:07,000
The lock for F.

226
00:27:07,000 --> 00:27:20,000
And then you know, workstation one required to walk for F now it can actually read a right or not it can actually read the file from pedal.

227
00:27:20,000 --> 00:27:29,000
And actually can make modifications to it to know those part of the case and just stay local, nothing really happens is right back cash, not a right through catch.

228
00:27:29,000 --> 00:27:33,000
So just this stays happily on the decline side.

229
00:27:33,000 --> 00:27:43,000
In fact, the workstation can even release the lock, you know, here and basically go from busy to idle.

230
00:27:43,000 --> 00:27:53,000
And so we have it actually would need to walk again, for example, once the right F where we write F again, you know, you can actually do the completely local without any interaction with the lock server.

231
00:27:53,000 --> 00:27:59,000
And there's slight simplification here, you know, there's as we'll see in a second that the lock has a least associated with it.

232
00:27:59,000 --> 00:28:09,000
So the client at least has to refresh the least periodically, but it doesn't have to rewrite re re re re re re re re file F from actually pedal if the least hasn't expired.

233
00:28:09,000 --> 00:28:16,000
Okay, so so the instant case of course happens like, you know, what if workstation two wants to read the file F.

234
00:28:16,000 --> 00:28:28,000
And so, you know, what happened when I say workstation two wants to read and basically it will do the same thing it will send in an acquire or a request message, sorry request message to lock server for saying I want F.

235
00:28:28,000 --> 00:28:43,000
And the way it then works is that the lock server actually looks at the stable sees that the F is actually owned by workstation one and then we'll send the revoke message to workstation one asking the lock back.

236
00:28:43,000 --> 00:28:57,000
So the revoke F and at this point, pedal actually has to be a little bit of from defining actually a little bit of work, because then we have to make sure that workstation two observes the rights that workstation one is done.

237
00:28:57,000 --> 00:29:02,000
And so the way that is done is the basically this instant of time.

238
00:29:02,000 --> 00:29:06,000
The workstation one writes actually F, you know, two pedal.

239
00:29:06,000 --> 00:29:13,000
And we'll see in a second that actually writing F to pedals actually slightly complicated operations more sophisticated than I'm just making it out to be.

240
00:29:13,000 --> 00:29:20,000
But just think about it like at this point workstation one is basically flashing it state related to F to pedal.

241
00:29:20,000 --> 00:29:32,000
Once that actually is completed so like once pedal for the knowledge that actually it actually has received all the data and actually sends a message back releasing F.

242
00:29:32,000 --> 00:29:45,000
And you know once locks are because the release of F you know that can update it's stable you know and allocate the lock to workstation two and since you know a grant for F to two.

243
00:29:45,000 --> 00:30:01,000
And at this point the workstation two requires lock and now it can actually read all the information from the file F and pedal.

244
00:30:01,000 --> 00:30:18,000
At that point it is guaranteed that we'll see the latest changes to the file F because the previous owner must have flush you know the state you know to the to pedal before it actually released the lock and get it back to the lock server.

245
00:30:18,000 --> 00:30:30,000
And so workstation two is guaranteed to actually observe those changes and so the usual are strong consistency comes in these strong consistency are tight into the lock management.

246
00:30:30,000 --> 00:30:35,000
And of course it's about this.

247
00:30:35,000 --> 00:30:37,000
There's a question.

248
00:30:37,000 --> 00:30:40,000
Yeah okay.

249
00:30:40,000 --> 00:30:52,000
We need to write what one question in the chat let me do the address the first would we need to write to pedal when releasing both read and write locks why we need to write to pedal when releasing a read lock.

250
00:30:52,000 --> 00:31:17,000
Let's ignore read write read the things in between read and write exclusive locks and read right locks in the and just focus on exclusive locks read read read things just a small up you know it's an important optimization but it doesn't really change the designer system doctor mad.

251
00:31:17,000 --> 00:31:20,000
And the other questions.

252
00:31:20,000 --> 00:31:27,000
So this sort of design would be really inefficient if we have like two different workstations that are both modifying the same file.

253
00:31:27,000 --> 00:31:30,000
Yeah you just get like cash bouncing back and forth.

254
00:31:30,000 --> 00:31:40,000
Yeah you would be if you're two board stations or two different engineers at the expert will be banging on the same file you know the file would go back or forth.

255
00:31:40,000 --> 00:31:52,000
And so it is not really suitable so you can see here the influence of like the workload that they're designing for you know the really assumption is that basically you know most engineers are working on their private files.

256
00:31:52,000 --> 00:32:03,000
And you know once a while they'll share files but they're probably not banging on the same shared file.

257
00:32:03,000 --> 00:32:15,000
And then we're not using it but like you could imagine like if they have a shared code repository you check out your own copy of the code repository make all the modifications and at some point get right to back.

258
00:32:15,000 --> 00:32:23,000
I'm sorry just to make sure you say you can release the lock while you still have the file in a cash rate.

259
00:32:23,000 --> 00:32:26,000
You can.

260
00:32:26,000 --> 00:32:37,000
Okay so I'm going to be very careful with what I meant with releasing the lock there is not releasing it to the lock server but locally you know changing the status from busy to idle.

261
00:32:37,000 --> 00:32:49,000
And since you know the lock is sticky you know it still sits at workstation one and the lock server still things that actually workstation one has to lock.

262
00:32:49,000 --> 00:32:52,000
Not answering your question.

263
00:32:52,000 --> 00:32:55,000
Yeah yeah thank you.

264
00:32:55,000 --> 00:33:02,000
So what happens if the request from two comes a while busy.

265
00:33:02,000 --> 00:33:10,000
Yeah it's a good question what do you think that happens.

266
00:33:10,000 --> 00:33:12,000
Is it just rejected?

267
00:33:12,000 --> 00:33:30,000
No that's I think it doesn't reject it but just waits and wait until workstation one is done you know modifying the file after executing its file system operation and then the france upon the code will release locally the lock will see that somebody is waiting for it.

268
00:33:30,000 --> 00:33:38,000
And so that doesn't change it into busy but actually starts flushing all the operations to pedal and then releases the lock.

269
00:33:38,000 --> 00:33:46,000
So this comes actually nicely to the second point which is this automissory point so maybe that will make it more clear.

270
00:33:46,000 --> 00:33:57,000
Let me talk a little bit about the missity because they're also use of the same walks to actually achieve atomic after file system operations.

271
00:33:57,000 --> 00:34:03,000
So using locks.

272
00:34:03,000 --> 00:34:13,000
So when, for example, you do a create operation like you execute to create file system operation, whatever create F.

273
00:34:13,000 --> 00:34:16,000
You know what are the usual arguments.

274
00:34:16,000 --> 00:34:25,000
So if you work internally even though the application makes this create file system called this internally actually has multiple file system modifications.

275
00:34:25,000 --> 00:34:31,000
For example, the directory needs to be modified actually let me do it in a slightly different order.

276
00:34:31,000 --> 00:34:35,000
You need to allocate an I note for F.

277
00:34:35,000 --> 00:34:38,000
You need to initialize that I note.

278
00:34:38,000 --> 00:34:44,000
And then you know update the directory.

279
00:34:44,000 --> 00:34:53,000
Update the directory to happen at an entry basically for you know the cheap old F and whatever I know number was allocated for F.

280
00:34:53,000 --> 00:34:57,000
So stick away in which a unique file system that I implement files.

281
00:34:57,000 --> 00:35:02,000
And so we need the range that these operations happen atomically.

282
00:35:02,000 --> 00:35:10,000
Because we don't want to sort of intermediate results be visible to other workstations in the way that happens is using you know by acquiring those locks.

283
00:35:10,000 --> 00:35:14,000
Required the lock.

284
00:35:14,000 --> 00:35:19,000
For this particular I note, you know, for example, I know 10 so you're quite a lot of ref.

285
00:35:19,000 --> 00:35:27,000
I'm just going to use half as the lock thing but you know it's going to be an I know number and then at some point the releases.

286
00:35:27,000 --> 00:35:31,000
So the system at the implementation itself releases the lock.

287
00:35:31,000 --> 00:35:43,000
And again this releases a local release operation that doesn't really mean immediately releasing it back to the lock server just made changing the status from PC to idle.

288
00:35:43,000 --> 00:35:51,000
And so, so if at any particular point of time, as we just ask, you know there's a request coming in for.

289
00:35:51,000 --> 00:36:06,000
So if you have a request for a local release operation that is not actually being served into the local file system that is not actually being served into the file system the local front simply file system of workstation one.

290
00:36:06,000 --> 00:36:09,000
Has calls the local release operation.

291
00:36:09,000 --> 00:36:15,000
And then it sees that when the dust or local release operation it sees that there's a revoke waiting.

292
00:36:15,000 --> 00:36:22,000
And at this point it's going to flush, you know, is cast state.

293
00:36:22,000 --> 00:36:26,000
Is cast state to pedal.

294
00:36:26,000 --> 00:36:44,000
And once it actually has a faucet cast state to pedal it will grant basically the revoke or accept the revoke and send back a release to the locks server so that then the lock can be assigned to workstation to.

295
00:36:44,000 --> 00:37:04,000
So just to make sure so in this create operation here we have to modify the I node for so we have to modify the I node for F and the I node for the directory that contains F because we have to update the references and so that means that.

296
00:37:04,000 --> 00:37:12,000
Like technically speaking we're actually holding two locks and we have to release both of them before we reply back to the revoke.

297
00:37:12,000 --> 00:37:27,000
Yes, absolutely so so again there's a whole section about this over in the paper and then really talk about this and do but basically they sort of have not very of course great locks but also not very fine grained plot of garage locks that basically have a lock in a prior I know.

298
00:37:27,000 --> 00:37:52,000
The director's nine out files and I know and in fact the director's nothing else than a file with sort of specific format format and so we really to create F you know we actually have to allocate first allocate the lock or acquired the lock in the directory D and then you know would allocate or acquired the walk on I note for F and so hold two locks.

299
00:37:52,000 --> 00:38:14,000
And as you probably have noticed you know the course of your shoes you have to acquire multiple locks there's a potential risk of debt lock you know you have like one workstation allocates locks into different order you could have that lock and so for Japan you follow rules that basically all walks are ordered in a particular way and you acquired the locks in the fixed order.

300
00:38:14,000 --> 00:38:21,000
I see thank you I think the locks are ordered by walk number I know number.

301
00:38:21,000 --> 00:38:28,000
So I know they said yeah so there's a bunch of more complexity there.

302
00:38:28,000 --> 00:38:50,000
Okay so the you know so having discussed sort of the other misidio file system operations at least during crashes you know if there's no crashes you know at least it's guaranteed that these operations happen automatically because the locks ensure automaticity of course it could be the case that like we're unlucky right and so the work.

303
00:38:50,000 --> 00:39:04,000
The workstation one crashes like right in the middle of these operations for example it has allocated allocated the I note actually has not updated the directory and let's say the crash happens here.

304
00:39:04,000 --> 00:39:17,000
You know and if we don't do anything special like what about us to concern that we might have.

305
00:39:17,000 --> 00:39:25,000
Okay let me concern that we might have is that you know some file system operation actually is only partially applied to pedal.

306
00:39:25,000 --> 00:39:40,000
And that becomes more clear if we actually think about the scenario what actually happens in this particular state like when the state of the cash actually flushed you know to pedal and so this is the topic of correction covering.

307
00:39:47,000 --> 00:39:53,000
It turns out that actually updating the state in.

308
00:39:53,000 --> 00:40:22,000
In updating the state in that pedal also follows actually pretty careful protocol in this protocol so it's a typically called right ahead logging.

309
00:40:22,000 --> 00:40:51,000
This is probably the term you already have seen many have seen the probably six or three three and you know pedal uses the two which are a very common technique and it will also play a big important role in subsequent papers that we'll see and so pedals actually nice reintroduction to this idea of right ahead logging and the way to think about right now you know it's a pedals designed right to let it hog use of right ahead logging is very similar to any other right ahead logging scheme.

310
00:40:51,000 --> 00:41:08,000
And so you know the way to think about it is as follows you know we have our disk a virtual disk and we just think about the disk as like a long gene long array of blocks and what they've done is part of the disk is reserved as a log.

311
00:41:08,000 --> 00:41:17,000
In fact in the case of pedal there's a lot of per server but let's refer now let's just assume there's like one single log and then there's the file system.

312
00:41:17,000 --> 00:41:38,000
So there's part of the disk is the reserve for the logging you know part of the disk is the file system in the file system contains the I notes you know some data blocks etc etc and and the rule is that when you update the state and pedal first thing you do is actually your first log update.

313
00:41:38,000 --> 00:41:50,000
So when if we go back to the previous picture and after at the point the.

314
00:41:50,000 --> 00:42:19,000
The front of the workstation one I want to give back the lock you know to the lock server it first has to write it state you know to pedal and that goes in two steps the first step is what the update description of the update you know to the log to the lock version so you have example you know we'll get a record that says like you know create basically describes the create operation so that we'll have you know whatever allocate I note.

315
00:42:19,000 --> 00:42:31,000
I know number whatever it basically the result of what happened if you allocate it I know number and the directory change.

316
00:42:31,000 --> 00:42:57,000
And will be a little bit more specific in a second that's sort of the update contains the modifications need to be made to happen to the file system blocks to actually reflect the change so you first you know walk to the first log the update and then once you have updated the log then we the second operation of the client executes the word station executes is actually installing the update.

317
00:43:01,000 --> 00:43:23,000
And the reason you know for doing it in sort of two steps is that you know once you know you've logged all your changes then it's completely safe to update the data box because they always will end up in all the data files and workers are always will end up in a consistent state.

318
00:43:23,000 --> 00:43:33,000
And the way to see this is basically let's assume you know the client workstation that was actually flashing it state to the pedal you know crashes right here.

319
00:43:37,000 --> 00:43:37,599
Is that okay.

320
00:43:37,599 --> 00:43:51,599
Yes, because since everything is locked the what was it called like the demon recovery service.

321
00:43:51,599 --> 00:44:02,599
Yeah, correct. So yeah, the demon is going to go back to there's going to be a demon or when there's a crash there's basically demons sees if there's anything in the log if there's anything in the log of use of quite to file system.

322
00:44:03,599 --> 00:44:09,599
And why actually do this in this way why not just write immediately update the file system.

323
00:44:14,599 --> 00:44:19,599
Because we can crash in the middle of the update and we don't know what we've done and we didn't.

324
00:44:19,599 --> 00:44:29,599
Yeah, exactly right so we've been in this or been there's our previous example you know the allocating and I noticed usually you know to making some change somewhere like to an I know block.

325
00:44:29,599 --> 00:44:38,599
And actually adding the directory to add in the file after you know to a particular directory of data directory block or a data block somewhere.

326
00:44:38,599 --> 00:44:47,599
And so these are two separate rights right to separate this watch and they're not atomic so we would crash between one of the two then we might have allocated the I know but not stuck in the directory.

327
00:44:47,599 --> 00:44:56,599
And basically what will happen if we crash and recover is basically we lose the I know unless you know we can scan the whole disk but that's very expensive.

328
00:44:57,599 --> 00:45:08,599
And so instead we're doing is we're basically logging the two changes first where we were logging a record describing both changes first and then you know apply the changes.

329
00:45:08,599 --> 00:45:20,599
So how do we ensure that operation one is atomic so the first log to update the first log update yeah that's interesting so the paper section down 100% crisp on this but there's a couple ways of doing it.

330
00:45:20,599 --> 00:45:38,599
They mentioned that every log record has a check zone and so they use the check zone to see if there's actually so before the read the log record you know the read the log record we compute to check some just to make sure that the whole record is complete.

331
00:45:38,599 --> 00:45:39,599
I see thank you.

332
00:45:39,599 --> 00:45:46,599
Another way of doing it which is a couple of ways doing it is you're right you know a couple blocks like one to you and then you write a commit record.

333
00:45:46,599 --> 00:45:54,599
And the assumption is that writing a single block a single five in the 12 sector is an atomic operation so it either happens that it doesn't happen.

334
00:45:54,599 --> 00:45:58,599
And so you do commit records says rights are done or rights are not done.

335
00:45:58,599 --> 00:46:09,599
And so you can just look at the commit record and if the commit records is not there then you know that you know the operation is not completely recorded yet and you should not execute any effect.

336
00:46:09,599 --> 00:46:25,599
I see and also to double check to the previous slide if the crash happens before we flush things to pedal then this is not a problem right because if the workstation crashes will the cash goes with the workstation but there's no you can still stay for any other workstation.

337
00:46:25,599 --> 00:46:36,599
That's correct. Yeah just the data would be lost that's it and but it will since it's not written that will be any visibility problem so it's really you know the crash crash here correct.

338
00:46:36,599 --> 00:46:43,599
Not one doesn't really matter in some ways the one actually matters is the crash during this flush operation.

339
00:46:43,599 --> 00:46:50,599
Thank you.

340
00:46:50,599 --> 00:47:03,599
Okay so there's a warning subtly in front of panee which we'll talk about in a second a little bit more deeper detail namely that in front of panee there's a

341
00:47:03,599 --> 00:47:09,599
unlock per server and that's sort of unusual.

342
00:47:09,599 --> 00:47:22,599
And we'll see in a second you know how that one that actually creates some problems and so we'll see those are there's a small extension to the protocol to actually make this all work at.

343
00:47:22,599 --> 00:47:32,599
Okay let me say a little bit about what is in one of those lock records.

344
00:47:32,599 --> 00:47:43,599
That turns out to be important for the crash recovery particularly because we have front to panee is multiple logs per server.

345
00:47:43,599 --> 00:48:00,599
So here we log as a so you're our log basically you know the records in it they have a sequence number and whatever it's a good number to one to and you know what the end of the log is if the next sequence number is not hired one hired in the

346
00:48:00,599 --> 00:48:03,599
order.

347
00:48:03,599 --> 00:48:13,599
So there's an other way they market up and basically in one of these records you know is an array is an array of updates.

348
00:48:13,599 --> 00:48:38,599
So we have to describe the file system operation and so it contains the block number that needs to be updated to example in our case that would be would be the I know number the block that contains the I note that would be allocated a version number is in that record and we'll see in second why that is important and basically the new bytes for that block number.

349
00:48:38,599 --> 00:48:49,599
For example in the case of creating in a file creating F there's going to be two entries in this array you know two entries.

350
00:48:49,599 --> 00:49:05,599
One describing you know the update to the I know block and one describing you update to the directory block the data block of the directory.

351
00:49:05,599 --> 00:49:19,599
So basically what happens on the replication just to make you know the abundantly clear right when a request to record local lock comes in you know the first thing that happens is for the log.

352
00:49:19,599 --> 00:49:34,599
To pedal once then is done send the updates or send the blocks the updated blocks to pedal.

353
00:49:34,599 --> 00:49:41,599
And then release the lock.

354
00:49:41,599 --> 00:49:47,599
And then disinsure that you know there's a couple things that we need to sort of think about.

355
00:49:47,599 --> 00:50:02,599
If there's no crashes in the middle then you know this is always a pretty discreet really you know the interesting case is one crash happens right after forcing the law to be before updating pedal.

356
00:50:02,599 --> 00:50:06,599
So let's talk a little bit about that.

357
00:50:06,599 --> 00:50:10,599
Sorry what do you mean by new bytes.

358
00:50:10,599 --> 00:50:20,599
Let me go back so we've been out of meaning the changes to do I know block so for example the I know block.

359
00:50:20,599 --> 00:50:36,599
Maybe you updating you know some part of the I know that you sort of write down what the what the bytes have changed like you know the bytes zero to five and a 12 at the volume value or bytes you know 10 to 20 half the volume value.

360
00:50:36,599 --> 00:50:48,599
So can those changes be like because each one of these blocks is at most 512 bytes right yeah but the modifications that you make to be like a lot larger than 512 bytes.

361
00:50:48,599 --> 00:50:52,599
There's going to be a record for every block.

362
00:50:52,599 --> 00:50:55,599
So in fact, the okay so a couple points.

363
00:50:55,599 --> 00:50:58,599
First of all.

364
00:50:58,599 --> 00:51:03,599
Data rights actually are not going through the lock. So there's actually important points for thank you for asking that question.

365
00:51:03,599 --> 00:51:12,599
So when you write a file in the application recalls like right file F and a whole bunch of data all that data actually does not go through the lock.

366
00:51:12,599 --> 00:51:17,599
That just goes straight to pedal like once you're flush state.

367
00:51:17,599 --> 00:51:25,599
The only changes that go through the log are meta update changes so meta data changes.

368
00:51:25,599 --> 00:51:30,599
And what metadata means is really information about files.

369
00:51:30,599 --> 00:51:35,599
So I know it's directories not kind of stuff that actually goes through the lock.

370
00:51:35,599 --> 00:51:43,599
And so the description that you see in here is really you know the updates to the metadata blocks in our file system.

371
00:51:43,599 --> 00:51:48,599
So I know it's and directory data.

372
00:51:48,599 --> 00:51:59,599
And the application level data like the file blocks that actually constitute a file that actually those blocks are just written straight to pedal and don't go for the lock.

373
00:51:59,599 --> 00:52:06,599
So it's interesting to contemplate and what is the implications of that like that design choice.

374
00:52:06,599 --> 00:52:12,599
What's the downside of not writing everything through the log.

375
00:52:12,599 --> 00:52:17,599
First.

376
00:52:17,599 --> 00:52:21,599
The case of the data can be lost.

377
00:52:21,599 --> 00:52:23,599
Did it get good luck.

378
00:52:23,599 --> 00:52:29,599
What other sort of scenarios are possible. So let's say you know the file consists of 10 blocks.

379
00:52:29,599 --> 00:52:31,599
We're starting writing the 10 blocks.

380
00:52:31,599 --> 00:52:37,599
You know what's in what what states can the file actually end up.

381
00:52:37,599 --> 00:52:39,599
Being consistent.

382
00:52:39,599 --> 00:52:42,599
Yeah, well, yeah, consistent. You could have some of the rights none of the rights.

383
00:52:42,599 --> 00:52:44,599
You know what correct.

384
00:52:44,599 --> 00:52:48,599
But it's not guaranteed that all 10 of them will be applied together.

385
00:52:48,599 --> 00:52:57,599
Um, so is this important when you have like, like this like need for atomic rights.

386
00:52:57,599 --> 00:52:58,599
Yeah.

387
00:52:58,599 --> 00:53:02,599
Like if you didn't need at the, at the messity.

388
00:53:02,599 --> 00:53:08,599
What this like, could we get rid of that of the log.

389
00:53:08,599 --> 00:53:11,599
I think it's a whole not a whole lot of questions in a second.

390
00:53:11,599 --> 00:53:14,599
Let's first talk into the applications. And then we'll come back to that.

391
00:53:14,599 --> 00:53:17,599
So, um,

392
00:53:17,599 --> 00:53:20,599
the,

393
00:53:20,599 --> 00:53:23,599
the.

394
00:53:23,599 --> 00:53:26,599
So the applications can really write, you know, their data, atomically,

395
00:53:26,599 --> 00:53:30,599
for the log because the data is now written through the log and,

396
00:53:30,599 --> 00:53:32,599
so not written to the log and then applied.

397
00:53:32,599 --> 00:53:37,599
So, so that means that, for example, if some application you want on the missity of,

398
00:53:37,599 --> 00:53:41,599
of your rights, you know, to a particular file, then you have to arrange that for that yourself.

399
00:53:41,599 --> 00:53:45,599
And this actually turns out to be the case on most units files in any way.

400
00:53:45,599 --> 00:53:49,599
And so like in that way from Japan, it doesn't really change the game.

401
00:53:49,599 --> 00:53:52,599
You know, if you write a file on the unit file system,

402
00:53:52,599 --> 00:54:01,599
you write like a Vm image, you know, it's not guaranteed that like the whole image is written consistently in one single shot, you know, to the file system.

403
00:54:01,599 --> 00:54:03,599
Even when there are crashes.

404
00:54:03,599 --> 00:54:10,599
And so the typical way, you know, people solve this problem in applications is that if you first write a temporary file, right,

405
00:54:10,599 --> 00:54:15,599
everything in the temporary file and then do an atomic rename, you know, to the destination file.

406
00:54:15,599 --> 00:54:23,599
And so, front to party basically relies exactly on the same setup, sort of normal units would do.

407
00:54:23,599 --> 00:54:26,599
So like the front to party doesn't change the game. And this is why,

408
00:54:26,599 --> 00:54:31,599
the rights of files are actually not logged, you know, through the log.

409
00:54:31,599 --> 00:54:37,599
And what does the advantage of not logging so clearly there's a downside, right, because you can't do a file right,

410
00:54:37,599 --> 00:54:41,599
automatically using the log, you have to have your own plan for doing not amicity.

411
00:54:41,599 --> 00:54:45,599
And what does the advantage?

412
00:54:45,599 --> 00:54:50,599
Well, performance because metadata is very small compared to the actual user data.

413
00:54:50,599 --> 00:54:53,599
Yeah, and also memory as well.

414
00:54:53,599 --> 00:54:59,599
Yeah, exactly. So the, so like if you write like a gigantic file, correct, you're like saying gigabyte file,

415
00:54:59,599 --> 00:55:03,599
and it really means you have to write two gigabytes, right, first, you know, write the gigabytes through the log,

416
00:55:03,599 --> 00:55:05,599
and then you write a gigabyte through the disk.

417
00:55:05,599 --> 00:55:09,599
And so basically this cuts, you know, performance in pretty dramatically.

418
00:55:09,599 --> 00:55:16,599
And so which is why, you know, typically, you know, the user data that is not written for the law.

419
00:55:16,599 --> 00:55:23,599
You know, it's very important of course when I come back to this earlier question, it's very important that the internal file system structures are kept consistent, right.

420
00:55:23,599 --> 00:55:27,599
And so, you know, the data is not, you know, are not inconsistent.

421
00:55:27,599 --> 00:55:32,599
And so therefore the metadata updates all go through the log.

422
00:55:32,599 --> 00:55:37,599
And so that basically, you know, like when you create a file, you need to update the idle block, and you need to update the directory block.

423
00:55:37,599 --> 00:55:42,599
That's guaranteed to happen together.

424
00:55:42,599 --> 00:55:50,599
So the data blocks of dates go between step 23.

425
00:55:50,599 --> 00:56:13,599
I think the user sent them out, and they probably after one they probably sent the data blocks in parallel to, you know, as part of step two and straight to add up to the file system area.

426
00:56:13,599 --> 00:56:15,599
Okay.

427
00:56:15,599 --> 00:56:26,599
So I had a question. I think I don't remember exactly how big the log was, but I believe it could span like two blocks.

428
00:56:26,599 --> 00:56:30,599
Is that possible? Yeah, the log is multiple records.

429
00:56:30,599 --> 00:56:34,599
Oh yeah, yeah, that's right.

430
00:56:34,599 --> 00:56:44,599
Up to two terrible. So what happens if we, if we send like a lot like part of a log and then it crashes as you send the log.

431
00:56:44,599 --> 00:56:51,599
When we get like an issue with like, I don't know, it's exactly this is one of the.

432
00:56:51,599 --> 00:56:53,599
Thank you.

433
00:56:53,599 --> 00:56:57,599
So there was a bunch of crashes that could happen, correct? Like so.

434
00:56:57,599 --> 00:57:11,599
So if we crash, so it's considered a bunch of cases like we read crashed before writing to the law.

435
00:57:11,599 --> 00:57:19,599
So what in that case, what's the outcome?

436
00:57:19,599 --> 00:57:25,599
It's lost. Yeah, lost.

437
00:57:25,599 --> 00:57:39,599
So then we're going to scenario like we crash after writing the lock.

438
00:57:39,599 --> 00:57:42,599
What happens then?

439
00:57:42,599 --> 00:57:45,599
Is actually slightly complicated scenario.

440
00:57:45,599 --> 00:57:49,599
Is this after writing like the log to pedal?

441
00:57:49,599 --> 00:57:51,599
Yeah.

442
00:57:51,599 --> 00:57:53,599
Then the demon steps in.

443
00:57:53,599 --> 00:57:55,599
Yes, the demon steps in.

444
00:57:55,599 --> 00:57:58,599
And there's a little bit of a complicated story, correct? Because you know, what?

445
00:57:58,599 --> 00:58:02,599
So how does this all discovered? Like what actually happens?

446
00:58:02,599 --> 00:58:05,599
So presumably what happens is somebody else wants the law, the lock, correct?

447
00:58:05,599 --> 00:58:10,599
So that you know, that the crashed workstation holds.

448
00:58:10,599 --> 00:58:15,599
And you know, here's where at least it's coming in importance for it's sort of every lock has a lease.

449
00:58:15,599 --> 00:58:24,599
And what the lockshift will do, it will not grant, you know, the lockshift will ask and workstation one, please give me your lock.

450
00:58:24,599 --> 00:58:27,599
Workstation one and what doesn't respond because it's crashed.

451
00:58:27,599 --> 00:58:36,599
And what the lockshift does it waits until the lease expires on the lock.

452
00:58:36,599 --> 00:58:44,599
And why doesn't wait until the lock the lease is expired?

453
00:58:44,599 --> 00:59:00,599
I think I think in this case, the, the server that or yeah, the server that crashed like also knows it didn't like renew its lease so it can clean up by it like its own.

454
00:59:00,599 --> 00:59:10,599
Yeah, can clean up his own stuff. So like what is the sort of what's the fundamental problem here that we're actually trying to challenge almost like the scenario that we've seen over and over in previous lectures that there's always a challenge.

455
00:59:10,599 --> 00:59:13,599
Partition, no.

456
00:59:13,599 --> 00:59:28,599
It could be the case that you know, actually workstation one did not crash, but the lockshift can't talk to the workstation because of the network petition, but the one and the workstation can talk to pedal.

457
00:59:28,599 --> 00:59:31,599
And so it might not still may may may may may may changes, right.

458
00:59:31,599 --> 00:59:39,599
But whatever we guaranteed as you just pointed out once the lease expires workstation one will definitely not make any changes.

459
00:59:39,599 --> 00:59:44,599
It is not allowed to, you know, follows the protocol is not allowed to make any changes anymore.

460
00:59:44,599 --> 00:59:55,599
And so this is so why the lockshift awaits until the lease expires now in that point and knows for sure that nobody else is locking them more or couldn't hold the lock if nobody's writing to pedal anymore.

461
00:59:55,599 --> 01:00:06,599
At this point, it will ask one of the remaining workstations to basically what they call the demon.

462
01:00:06,599 --> 01:00:22,599
The recovery demon, the recovery, the recovery demon and the recovery demon basically will apply will read the log of the workstation one, you know, its log and basically apply the operation that are in that lock.

463
01:00:22,599 --> 01:00:31,599
And the way to think about the demon, it's just sort of like this is like terminology.

464
01:00:31,599 --> 01:00:43,599
It's typically just a surface or server or serve a process that basically does sort of house cleaning or house cleaning tasks and those kind of services that are sort of not really used.

465
01:00:43,599 --> 01:00:49,599
But then, you know, they're often called demons.

466
01:00:49,599 --> 01:00:59,599
So once the demon is done, then actually the lock, you know, can be the lock server can reassign the lock or grant the lock to somebody to another workstation.

467
01:00:59,599 --> 01:01:10,599
But just to double check. So if you crash after writing the log, then you'll get you're going to have a consistent state to come to the metadata, but the user's not guaranteed to have finished writing the user data.

468
01:01:10,599 --> 01:01:23,599
So there's no guarantees about the user data. So the only thing the guarantees that like really the logging system helps achieving is basically consistency of the internal file system data structures.

469
01:01:23,599 --> 01:01:26,599
Okay, sounds.

470
01:01:26,599 --> 01:01:37,599
Which is important, correct, because we'd be pretty bad if the internal file system data structures are messed up, you know, everybody might lose their data.

471
01:01:37,599 --> 01:01:42,599
Okay, so then there's another instant case.

472
01:01:42,599 --> 01:02:05,599
What can happen, okay, so writing the lock to you, what happens if we crash during writing the law.

473
01:02:05,599 --> 01:02:12,599
So this is what you mentioned before that there are checksums and we can check whether it was like completed or not.

474
01:02:12,599 --> 01:02:25,599
Yeah, so what, okay, so good point. So, so what happens in this case, correct, is that a prefix might end up in the prefix in my end up in the log, correct.

475
01:02:25,599 --> 01:02:36,599
But each of the prefix might contain multiple log records of multiple operations, correct, like, you know, whatever sequence number one, six number two, the multiple records.

476
01:02:36,599 --> 01:02:47,599
If we crash during one of these records updates, you know, then the checksums will check out and so we'll basically stop the recovery team and stop at that record.

477
01:02:47,599 --> 01:02:53,599
What will be in the log will be a correct prefix of the operations.

478
01:02:53,599 --> 01:03:02,599
So, for example, you know, the create of file F is in there, maybe the create file, file G is in there, not the creative file H is not in there.

479
01:03:02,599 --> 01:03:10,599
But each individual record that describes one atomic, you know, file system operation is in there and is complete.

480
01:03:10,599 --> 01:03:31,599
What will happen is that basically will apply a prefix of the operations that the workstation is doing and we basically lose the end of the prefix or the end of the its updates, we don't know, indesirable, but you know totally okay because, you know, in the other case, we might have lost all of this.

481
01:03:31,599 --> 01:03:40,599
In the first case, we were crashed before the log, we would have nothing on this.

482
01:03:40,599 --> 01:03:46,599
Does it all make sense?

483
01:03:46,599 --> 01:03:52,599
Okay, then there's one one more tricky case that we need to consider.

484
01:03:52,599 --> 01:03:59,599
And that has to do with the fact that actually pedal has a walk per server or log per server.

485
01:03:59,599 --> 01:04:06,599
So I thought a little bit about that and this is related to the question in a post, you know, for the reading.

486
01:04:06,599 --> 01:04:13,599
This is about many logs and so let's say we have workstations between their own log.

487
01:04:13,599 --> 01:04:19,599
So here's workstation one workstation two workstation three.

488
01:04:19,599 --> 01:04:27,599
And workstation one at some point does a delete of a file F that happened to exist before.

489
01:04:27,599 --> 01:04:33,599
Then workstation to create.

490
01:04:33,599 --> 01:04:38,599
And that's created remember is written to its own log.

491
01:04:38,599 --> 01:04:47,599
This delete is written to the log of workstation one. This create is written to the log of workstation two.

492
01:04:47,599 --> 01:04:53,599
And now let's say workstation one crashes.

493
01:04:53,599 --> 01:05:07,599
And then workstation three, you know, basically, you know, the recovery team to runs.

494
01:05:07,599 --> 01:05:14,599
For workstation one.

495
01:05:14,599 --> 01:05:19,599
And you know, the bad possible outcome correct is that it would would would replay the delete.

496
01:05:19,599 --> 01:05:25,599
Which would overwrite, you know, the changes that workstation two made to pedal.

497
01:05:25,599 --> 01:05:27,599
So that's the context.

498
01:05:27,599 --> 01:05:41,599
And the question is how is this fixed and I think this the way I would like to address this is by actually having you spend a couple of minutes in the breakout room debate this with each other or any other aspect of pedal if you want to.

499
01:05:41,599 --> 01:05:47,599
So, uh, Lily or anybody else any of the other T.

500
01:05:47,599 --> 01:06:01,599
So you sign people do break up rooms.

501
01:06:01,599 --> 01:06:06,599
So, uh, I think that's the way I would like to do it.

502
01:06:06,599 --> 01:06:07,599
Try to do it or.

503
01:06:07,599 --> 01:06:08,599
Yeah, that'd be great.

504
01:06:08,599 --> 01:06:09,599
Okay.

505
01:06:09,599 --> 01:06:16,599
All right.

506
01:06:16,599 --> 01:06:19,599
I'll close them in about five minutes.

507
01:06:19,599 --> 01:06:29,599
Okay.

508
01:06:49,599 --> 01:06:52,599
You

509
01:07:19,599 --> 01:07:22,599
You

510
01:07:49,599 --> 01:07:52,599
You

511
01:08:19,600 --> 01:08:22,600
You

512
01:08:49,600 --> 01:08:52,600
You

513
01:09:19,600 --> 01:09:21,600
You

514
01:09:49,600 --> 01:09:51,600
You

515
01:10:20,600 --> 01:10:21,600
You

516
01:10:21,600 --> 01:10:22,600
You

517
01:10:22,600 --> 01:10:23,600
You

518
01:10:23,600 --> 01:10:24,600
You

519
01:10:24,600 --> 01:10:25,600
You

520
01:10:25,600 --> 01:10:26,600
You

521
01:10:26,600 --> 01:10:27,600
You

522
01:10:27,600 --> 01:10:28,600
You

523
01:10:28,600 --> 01:10:29,600
You

524
01:10:29,600 --> 01:10:30,600
You

525
01:10:30,600 --> 01:10:31,600
You

526
01:10:31,600 --> 01:10:32,600
You

527
01:10:32,600 --> 01:10:33,600
You

528
01:10:33,600 --> 01:10:34,600
You

529
01:10:34,600 --> 01:10:35,600
You

530
01:10:35,600 --> 01:10:36,600
You

531
01:10:36,600 --> 01:10:37,600
You

532
01:10:37,600 --> 01:10:38,600
You

533
01:10:38,600 --> 01:10:39,600
You

534
01:10:39,600 --> 01:10:40,600
You

535
01:10:40,600 --> 01:10:41,600
You

536
01:10:41,600 --> 01:10:42,600
You

537
01:10:42,600 --> 01:10:43,600
You

538
01:10:43,600 --> 01:10:44,600
You

539
01:10:44,600 --> 01:10:45,600
You

540
01:10:45,600 --> 01:10:46,600
You

541
01:10:46,600 --> 01:10:47,600
You

542
01:10:47,600 --> 01:10:48,600
You

543
01:10:48,600 --> 01:10:49,600
You

544
01:10:49,600 --> 01:10:50,600
You

545
01:10:50,600 --> 01:10:51,600
You

546
01:10:51,600 --> 01:10:52,600
You

547
01:10:52,600 --> 01:10:53,600
You

548
01:10:53,600 --> 01:10:54,600
You

549
01:10:54,600 --> 01:10:55,600
You

550
01:10:55,600 --> 01:10:56,600
You

551
01:10:56,600 --> 01:10:57,600
You

552
01:10:57,600 --> 01:10:58,600
You

553
01:10:58,600 --> 01:10:59,600
You

554
01:10:59,600 --> 01:11:00,600
You

555
01:11:00,600 --> 01:11:01,600
You

556
01:11:01,600 --> 01:11:02,600
You

557
01:11:02,600 --> 01:11:03,600
You

558
01:11:03,600 --> 01:11:04,600
You

559
01:11:04,600 --> 01:11:05,600
You

560
01:11:05,600 --> 01:11:06,600
You

561
01:11:06,600 --> 01:11:07,600
You

562
01:11:07,600 --> 01:11:08,600
You

563
01:11:08,600 --> 01:11:09,600
You

564
01:11:09,600 --> 01:11:10,600
You

565
01:11:10,600 --> 01:11:11,600
You

566
01:11:11,600 --> 01:11:12,600
You

567
01:11:12,600 --> 01:11:13,600
You

568
01:11:13,600 --> 01:11:14,600
You

569
01:11:14,600 --> 01:11:15,600
You

570
01:11:15,600 --> 01:11:16,600
You

571
01:11:16,600 --> 01:11:17,600
You

572
01:11:17,600 --> 01:11:18,600
You

573
01:11:18,600 --> 01:11:19,600
You

574
01:11:19,600 --> 01:11:20,600
You

575
01:11:20,600 --> 01:11:21,600
You

576
01:11:21,600 --> 01:11:22,600
You

577
01:11:22,600 --> 01:11:23,600
You

578
01:11:23,600 --> 01:11:24,600
You

579
01:11:24,600 --> 01:11:25,600
You

580
01:11:25,600 --> 01:11:26,600
You

581
01:11:26,600 --> 01:11:27,600
You

582
01:11:27,600 --> 01:11:28,600
You

583
01:11:28,600 --> 01:11:29,600
You

584
01:11:29,600 --> 01:11:30,600
You

585
01:11:30,600 --> 01:11:31,600
You

586
01:11:31,600 --> 01:11:32,600
You

587
01:11:32,600 --> 01:11:33,600
You

588
01:11:33,600 --> 01:11:34,600
You

589
01:11:34,600 --> 01:11:35,600
You

590
01:11:35,600 --> 01:11:36,600
You

591
01:11:36,600 --> 01:11:37,600
You

592
01:11:37,600 --> 01:11:38,600
You

593
01:11:38,600 --> 01:11:39,600
You

594
01:11:39,600 --> 01:11:40,600
You

595
01:11:40,600 --> 01:11:41,600
You

596
01:11:41,600 --> 01:11:42,600
You

597
01:11:42,600 --> 01:11:43,600
You

598
01:11:43,600 --> 01:11:44,600
You

599
01:11:44,600 --> 01:11:45,600
You

600
01:11:45,600 --> 01:11:46,600
You

601
01:11:46,600 --> 01:11:47,600
You

602
01:11:47,600 --> 01:11:48,600
You

603
01:11:48,600 --> 01:11:49,600
You

604
01:11:49,600 --> 01:11:50,600
You

605
01:11:50,600 --> 01:11:51,600
You

606
01:11:51,600 --> 01:11:52,600
You

607
01:11:52,600 --> 01:11:53,600
You

608
01:11:53,600 --> 01:11:54,600
You

609
01:11:54,600 --> 01:11:55,600
You

610
01:11:55,600 --> 01:11:56,600
You

611
01:11:56,600 --> 01:11:57,600
You

612
01:11:57,600 --> 01:11:58,600
You

613
01:11:58,600 --> 01:11:59,600
You

614
01:11:59,600 --> 01:12:00,600
You

615
01:12:00,600 --> 01:12:01,600
You

616
01:12:01,600 --> 01:12:02,600
You

617
01:12:02,600 --> 01:12:03,600
You

618
01:12:03,600 --> 01:12:04,600
You

619
01:12:04,600 --> 01:12:05,600
You

620
01:12:05,600 --> 01:12:06,600
You

621
01:12:06,600 --> 01:12:07,600
You

622
01:12:07,600 --> 01:12:08,600
You

623
01:12:08,600 --> 01:12:09,600
You

624
01:12:09,600 --> 01:12:10,600
You

625
01:12:10,600 --> 01:12:11,600
You

626
01:12:11,600 --> 01:12:12,600
You

627
01:12:12,600 --> 01:12:13,600
You

628
01:12:13,600 --> 01:12:14,600
You

629
01:12:14,600 --> 01:12:15,600
You

630
01:12:15,600 --> 01:12:16,600
You

631
01:12:16,600 --> 01:12:17,600
You

632
01:12:17,600 --> 01:12:18,600
You

633
01:12:18,600 --> 01:12:22,600
You

634
01:12:22,600 --> 01:12:23,600
You

635
01:12:23,600 --> 01:12:24,600
You

636
01:12:24,600 --> 01:12:25,600
You

637
01:12:25,600 --> 01:12:26,600
You

638
01:12:26,600 --> 01:12:28,600
You

639
01:12:28,600 --> 01:12:29,600
You

640
01:12:29,600 --> 01:12:30,600
You

641
01:12:30,600 --> 01:12:31,600
Ok.

642
01:12:31,600 --> 01:12:32,600
I

643
01:12:32,600 --> 01:12:33,600
Just

644
01:12:33,600 --> 01:12:34,600
Just

645
01:12:34,600 --> 01:12:35,600
Quickly

646
01:12:35,600 --> 01:12:36,600
Summarise.

647
01:12:36,600 --> 01:12:38,600
So we have free workstations.

648
01:12:38,600 --> 01:12:39,600
Workstation

649
01:12:39,600 --> 01:12:40,600
One

650
01:12:40,600 --> 01:12:42,600
It's

651
01:12:42,600 --> 01:12:43,600
Light

652
01:12:43,600 --> 01:12:44,600
The

653
01:12:44,600 --> 01:12:49,600
at some point later created a file F, it is in this log.

654
01:12:49,800 --> 01:12:52,800
And then one crashes and workstation free action runs

655
01:12:52,800 --> 01:12:56,000
and recovery demon on the log of workstation one.

656
01:12:56,000 --> 01:12:59,840
And of course, we be disaster if the lead would be replayed

657
01:12:59,840 --> 01:13:02,079
because the later create has happened on another workstation

658
01:13:02,079 --> 01:13:03,120
but it's in another log.

659
01:13:03,120 --> 01:13:06,600
So the demon doesn't know how is this problem solved

660
01:13:07,880 --> 01:13:10,680
or how is this potentially disaster avoided?

661
01:13:15,560 --> 01:13:17,240
We said version numbers.

662
01:13:17,240 --> 01:13:18,079
Yeah.

663
01:13:19,560 --> 01:13:22,000
Yeah, so can you say a little bit more if you want to?

664
01:13:22,000 --> 01:13:23,240
Sure.

665
01:13:23,240 --> 01:13:27,079
So it's guaranteed because we had the log

666
01:13:27,079 --> 01:13:32,079
that the operations have already completed for server one.

667
01:13:35,079 --> 01:13:40,280
And so the version number for the log

668
01:13:40,280 --> 01:13:43,880
is written in a pedal like the last operation.

669
01:13:43,880 --> 01:13:47,960
And so the recovery demon won't do anything previous

670
01:13:47,960 --> 01:13:50,880
to the current version number.

671
01:13:50,880 --> 01:13:53,239
Yeah, guys, let's say we have absolute right.

672
01:13:53,239 --> 01:13:54,640
So we'll just summarize these.

673
01:13:54,640 --> 01:13:58,800
So we have two logs that actually have importance

674
01:13:58,800 --> 01:14:01,400
and we have some file system state

675
01:14:01,400 --> 01:14:02,640
that sits in the pedal.

676
01:14:02,640 --> 01:14:05,480
So these are the logs and then here's the actual file system.

677
01:14:07,840 --> 01:14:11,440
And here was like this is directory D.

678
01:14:12,439 --> 01:14:15,239
So that your D was modified in the file F was deleted

679
01:14:15,239 --> 01:14:18,439
and that has a log number I say the 10.

680
01:14:20,039 --> 01:14:22,879
And this is a workstation two.

681
01:14:22,879 --> 01:14:27,199
And here is a D that was deleting the F and D

682
01:14:27,199 --> 01:14:28,479
and he was creating F and D.

683
01:14:28,479 --> 01:14:32,319
And what log number will be in this entry?

684
01:14:34,639 --> 01:14:35,719
Version number, sorry.

685
01:14:38,000 --> 01:14:38,960
11.

686
01:14:38,960 --> 01:14:40,079
I'm loving, yeah.

687
01:14:40,079 --> 01:14:40,919
Right.

688
01:14:41,519 --> 01:14:43,799
Basically total order in the locking protocols

689
01:14:43,799 --> 01:14:45,719
were insured at the total order.

690
01:14:45,719 --> 01:14:49,199
And on the in the file system with the metadata blocks,

691
01:14:49,199 --> 01:14:51,359
like for example, with the I node block for F.

692
01:14:52,439 --> 01:14:56,000
I know that what version number is going to be on the disk

693
01:14:56,000 --> 01:14:56,839
or in pedal.

694
01:15:04,639 --> 01:15:06,119
11.

695
01:15:06,119 --> 01:15:08,799
Yeah, in the case that actually the operation was applied

696
01:15:08,799 --> 01:15:10,319
to the file system and it would be 11.

697
01:15:10,319 --> 01:15:11,719
Correct.

698
01:15:11,719 --> 01:15:17,719
And so when the demon re what rule does the demon follow?

699
01:15:20,719 --> 01:15:25,359
Never replace something that's already been applied.

700
01:15:25,359 --> 01:15:27,199
Yeah, now just decided to apply.

701
01:15:28,799 --> 01:15:30,239
Like a version number.

702
01:15:30,239 --> 01:15:31,199
Yeah, the version number, correct?

703
01:15:31,199 --> 01:15:33,880
So if the version of it only reapplies in entry

704
01:15:33,880 --> 01:15:36,239
if the version number in the log record,

705
01:15:37,199 --> 01:15:41,479
a lot of the version number is higher than the I node

706
01:15:41,479 --> 01:15:43,359
when the metadata version number.

707
01:15:46,159 --> 01:15:47,319
Then replay.

708
01:15:48,559 --> 01:15:50,079
Okay.

709
01:15:50,079 --> 01:15:52,399
So in this case, you know, the recovery demon

710
01:15:52,399 --> 01:15:55,319
will see that the version number in the log record

711
01:15:55,319 --> 01:15:59,199
is 10, which is smaller than 11 or equal to 11 doesn't matter.

712
01:15:59,199 --> 01:16:00,319
And so it won't replay it.

713
01:16:00,319 --> 01:16:02,519
And so this problem cannot appear.

714
01:16:02,519 --> 01:16:04,559
So does the 10 necessarily not?

715
01:16:04,640 --> 01:16:09,560
Does is it okay, such that like the 10 is not on the WS workspace

716
01:16:09,600 --> 01:16:10,760
to log?

717
01:16:12,160 --> 01:16:14,680
Yeah, it's not there.

718
01:16:14,680 --> 01:16:17,039
So like in the work because the workstation two,

719
01:16:17,039 --> 01:16:21,560
road actually the I node after, you know,

720
01:16:21,560 --> 01:16:25,000
workstation one and so it's version number 11.

721
01:16:25,000 --> 01:16:27,240
Basically, when you do a preparing update,

722
01:16:27,240 --> 01:16:32,080
the version number in the update record is always one flush,

723
01:16:32,080 --> 01:16:34,160
you know, the current version number in the I node.

724
01:16:35,240 --> 01:16:36,240
Okay.

725
01:16:36,240 --> 01:16:40,960
This is a small question, but what is the D stand for?

726
01:16:40,960 --> 01:16:42,960
And the directory.

727
01:16:42,960 --> 01:16:44,480
Okay.

728
01:16:44,480 --> 01:16:45,360
Okay.

729
01:16:45,360 --> 01:16:47,039
We're creating a file in the directory D.

730
01:16:47,039 --> 01:16:48,960
We're deleting a file from the directory D.

731
01:16:50,000 --> 01:16:52,000
And the update must include, you know,

732
01:16:52,000 --> 01:16:53,800
the so many information about the directory.

733
01:16:57,600 --> 01:16:58,600
Okay.

734
01:16:58,600 --> 01:17:00,400
So I had a quick question.

735
01:17:00,400 --> 01:17:03,360
So are the best version numbers like always tied

736
01:17:03,359 --> 01:17:06,119
to the specific I node that's being edited?

737
01:17:06,119 --> 01:17:07,159
Yes.

738
01:17:07,159 --> 01:17:08,159
Okay.

739
01:17:08,159 --> 01:17:11,159
That doesn't mean the version number for every update,

740
01:17:11,159 --> 01:17:13,079
correct? Like there's a version number for the directory,

741
01:17:13,079 --> 01:17:14,319
there's a version number for the file.

742
01:17:14,319 --> 01:17:16,559
I'm like showing this a little bit wrong here.

743
01:17:16,559 --> 01:17:18,239
Like if you go back to the log record,

744
01:17:20,199 --> 01:17:23,319
here basically there's a array of updates and every update

745
01:17:23,319 --> 01:17:25,119
in the array, you know, contains block number,

746
01:17:25,119 --> 01:17:26,599
the version number in the new bytes.

747
01:17:28,799 --> 01:17:29,639
Thanks.

748
01:17:30,640 --> 01:17:31,640
Okay.

749
01:17:31,640 --> 01:17:34,640
So just stepping back and closing off

750
01:17:34,640 --> 01:17:36,640
this discussion of this paper.

751
01:17:36,640 --> 01:17:39,640
It's probably the first paper that we've read,

752
01:17:39,640 --> 01:17:42,640
that basically in order to system itself is not the one,

753
01:17:42,640 --> 01:17:44,640
you know, it's not going to be dominant use.

754
01:17:44,640 --> 01:17:46,640
And therefore it's really interesting to talk about.

755
01:17:46,640 --> 01:17:50,640
But what is interesting about the system is the ideas in it.

756
01:17:50,640 --> 01:17:53,640
And so cash per hearing protocol.

757
01:17:55,640 --> 01:17:57,640
More cash persistence.

758
01:17:58,640 --> 01:17:59,640
See protocol.

759
01:18:03,640 --> 01:18:04,640
Distributed locking.

760
01:18:07,640 --> 01:18:09,640
Lock servers, leases.

761
01:18:11,640 --> 01:18:15,640
Grantee and acquiring and revoking.

762
01:18:15,640 --> 01:18:18,640
And distributed recovery.

763
01:18:18,640 --> 01:18:20,640
You know, we're one workstation crashes,

764
01:18:20,640 --> 01:18:24,640
but again, demon on another workstation actually does the recovery.

765
01:18:25,640 --> 01:18:27,640
And what particularly interesting is it,

766
01:18:27,640 --> 01:18:30,640
what's interesting is sort of the interaction between the three pieces.

767
01:18:32,640 --> 01:18:33,640
Then they interact.

768
01:18:35,640 --> 01:18:39,640
And what we'll see in the next couple of papers next week,

769
01:18:39,640 --> 01:18:41,640
particularly not not the first day,

770
01:18:41,640 --> 01:18:43,640
but the papers after that,

771
01:18:43,640 --> 01:18:45,640
which we're going to talk about some heavy duty,

772
01:18:45,640 --> 01:18:47,640
pretty involved, you know, to exact systems.

773
01:18:47,640 --> 01:18:49,640
We'll see these free topics come up.

774
01:18:50,640 --> 01:18:51,640
Two.

775
01:18:51,640 --> 01:18:53,640
And so hopefully this will help you when reading those papers,

776
01:18:53,640 --> 01:18:55,640
and understand actually what cash per hearing is,

777
01:18:55,640 --> 01:18:57,640
what, you know, crash recovery is,

778
01:18:57,640 --> 01:19:00,640
and, you know, distributed locks are.

779
01:19:02,640 --> 01:19:03,640
And the other thing probably point,

780
01:19:03,640 --> 01:19:06,640
and that's interesting to make is that, you know,

781
01:19:06,640 --> 01:19:08,640
you know, pedal is really good, you know,

782
01:19:08,640 --> 01:19:12,640
for useful for the particular setting they designed it for.

783
01:19:13,640 --> 01:19:15,640
And the performance part of the papers,

784
01:19:15,640 --> 01:19:18,640
we've been hard to understand because it's like for 99,

785
01:19:18,640 --> 01:19:20,640
but now I give you look at the graphs,

786
01:19:20,640 --> 01:19:24,640
you'll see that the file system basically workload can increase

787
01:19:24,640 --> 01:19:26,640
with the number of workstations.

788
01:19:26,640 --> 01:19:29,640
And you know, that's exactly where they were shooting for.

789
01:19:29,640 --> 01:19:32,640
And, you know, they achieved that goal.

790
01:19:32,640 --> 01:19:34,640
Anyway, I hope you find this interesting,

791
01:19:34,640 --> 01:19:36,640
sort of not your usual design.

792
01:19:36,640 --> 01:19:38,640
And so hopefully I'll say that thought perfectly.

793
01:19:39,640 --> 01:19:41,640
And with that, I'll stop.

794
01:19:41,640 --> 01:19:44,640
Of course, you know, stick around if you want to ask more questions.

795
01:19:44,640 --> 01:19:46,640
And otherwise, we'll see you first day.

796
01:19:50,640 --> 01:19:53,640
Can I can ask two questions?

797
01:19:53,640 --> 01:19:55,640
My first question was just in general,

798
01:19:55,640 --> 01:19:58,640
the cash coherence protocol here,

799
01:19:58,640 --> 01:20:02,640
is to not have one file cash.

800
01:20:02,640 --> 01:20:04,640
Into places, right?

801
01:20:04,640 --> 01:20:05,640
Yeah.

802
01:20:06,640 --> 01:20:07,640
Okay.

803
01:20:07,640 --> 01:20:09,640
And my other question was about the,

804
01:20:09,640 --> 01:20:11,640
there was a,

805
01:20:11,640 --> 01:20:14,640
a page with the log.

806
01:20:14,640 --> 01:20:18,640
And you had the log records there.

807
01:20:18,640 --> 01:20:19,640
Yep.

808
01:20:19,640 --> 01:20:20,640
Let me go back here.

809
01:20:20,640 --> 01:20:21,640
Yeah, yeah, yeah.

810
01:20:21,640 --> 01:20:22,640
And I was,

811
01:20:22,640 --> 01:20:23,640
I was wondering,

812
01:20:23,640 --> 01:20:25,640
you said that each,

813
01:20:25,640 --> 01:20:30,640
each like record is atomic.

814
01:20:30,640 --> 01:20:32,640
But it's not like that.

815
01:20:32,640 --> 01:20:33,640
It's not like that.

816
01:20:33,640 --> 01:20:35,640
It's not like that.

817
01:20:35,640 --> 01:20:36,640
It's not like that.

818
01:20:36,640 --> 01:20:38,640
Is atomic.

819
01:20:38,640 --> 01:20:41,640
But each record has a number of updates.

820
01:20:41,640 --> 01:20:42,640
Two, right?

821
01:20:42,640 --> 01:20:43,640
Yes.

822
01:20:43,640 --> 01:20:45,640
Again, I think the paper slide.

823
01:20:45,640 --> 01:20:46,640
We've been here,

824
01:20:46,640 --> 01:20:47,640
what exactly what it does.

825
01:20:47,640 --> 01:20:49,640
Either it always states in five or 12 bytes.

826
01:20:49,640 --> 01:20:52,640
And then the single sector for five or 12 bytes just is,

827
01:20:52,640 --> 01:20:55,640
atomic or they use this checksum trick.

828
01:20:55,640 --> 01:20:57,640
So you read two and five,

829
01:20:57,640 --> 01:20:58,640
the final bytes.

830
01:20:58,640 --> 01:21:04,640
Okay.

831
01:21:04,640 --> 01:21:06,640
So if it's shorter than good,

832
01:21:06,640 --> 01:21:07,640
if it's not,

833
01:21:07,640 --> 01:21:08,640
you do the check.

834
01:21:08,640 --> 01:21:09,640
Okay.

835
01:21:09,640 --> 01:21:11,640
I see.

836
01:21:11,640 --> 01:21:12,640
Yeah.

837
01:21:12,640 --> 01:21:14,640
You're not sure what they are.

838
01:21:14,640 --> 01:21:15,640
I'll do.

839
01:21:15,640 --> 01:21:16,640
Oh, okay.

840
01:21:16,640 --> 01:21:17,640
Okay.

841
01:21:17,640 --> 01:21:18,640
Thank you so much.

842
01:21:18,640 --> 01:21:19,640
You're welcome.

843
01:21:19,640 --> 01:21:21,640
Any more questions.

844
01:21:21,640 --> 01:21:22,640
Thank you.

845
01:21:22,640 --> 01:21:28,640
Any more questions.

846
01:21:28,640 --> 01:21:31,640
Oh, if you go back or forward,

847
01:21:31,640 --> 01:21:32,640
three slides.

848
01:21:32,640 --> 01:21:33,640
Yep.

849
01:21:33,640 --> 01:21:34,640
Here.

850
01:21:34,640 --> 01:21:35,640
Because this.

851
01:21:35,640 --> 01:21:37,640
Maybe back one slide.

852
01:21:37,640 --> 01:21:40,640
There's a section where you talked about how.

853
01:21:40,640 --> 01:21:41,640
If.

854
01:21:41,640 --> 01:21:44,640
Crash happens during the middle of the right.

855
01:21:44,640 --> 01:21:45,640
And we get like,

856
01:21:45,640 --> 01:21:46,640
yeah, a prefix in the log.

857
01:21:46,640 --> 01:21:47,640
That's like,

858
01:21:47,640 --> 01:21:48,640
okay or something.

859
01:21:48,640 --> 01:21:50,640
Do you mind repeating what you meant there?

860
01:21:50,640 --> 01:21:51,640
Yeah.

861
01:21:51,640 --> 01:21:52,640
Okay.

862
01:21:52,640 --> 01:21:53,640
So.

863
01:21:53,640 --> 01:21:55,640
So let's go back to this last picture.

864
01:21:55,640 --> 01:21:56,640
I just showed.

865
01:21:56,640 --> 01:21:57,640
Here.

866
01:21:57,640 --> 01:22:00,640
So you have our show.

867
01:22:00,640 --> 01:22:01,640
The.

868
01:22:01,640 --> 01:22:03,640
The workstation one could have executed many,

869
01:22:03,640 --> 01:22:05,640
many file system operations.

870
01:22:05,640 --> 01:22:06,640
Correct.

871
01:22:06,640 --> 01:22:07,640
Each one of them.

872
01:22:07,640 --> 01:22:10,640
Described by one of these log by an entry in the log.

873
01:22:10,640 --> 01:22:13,640
So like the first entry might be creating file F.

874
01:22:13,640 --> 01:22:16,640
You know, second entry in the log might be creating file G.

875
01:22:16,640 --> 01:22:17,640
You know,

876
01:22:17,640 --> 01:22:19,640
one of the third line might creating a deleting file F.

877
01:22:19,640 --> 01:22:22,640
And so there's a whole sequence of operations.

878
01:22:22,640 --> 01:22:27,640
Because we remember the workstation just keeps executing file system operations.

879
01:22:27,640 --> 01:22:31,640
As long as it holds the locks and nobody else wants to the locks.

880
01:22:31,640 --> 01:22:37,640
And so the log could be containing a whole bunch of file system operations.

881
01:22:37,640 --> 01:22:40,640
Now for each file system operation for each individual one,

882
01:22:40,640 --> 01:22:42,640
there's a wall direct.

883
01:22:42,640 --> 01:22:48,640
And the log record is the atomic file system operations description of the changes

884
01:22:48,640 --> 01:22:52,640
and the actual file system blocks to reflect, you know,

885
01:22:52,640 --> 01:22:54,640
that file system operation.

886
01:22:54,640 --> 01:22:57,640
And so what could happen correct is that.

887
01:22:57,640 --> 01:23:02,640
The revoke message comes in the workstation one starts writing its log,

888
01:23:02,640 --> 01:23:04,640
you know, to pedal.

889
01:23:04,640 --> 01:23:06,640
But it just doesn't get all the way to the end.

890
01:23:06,640 --> 01:23:09,640
It just happens to crash like somewhere in the middle, like anywhere.

891
01:23:09,640 --> 01:23:10,640
Right.

892
01:23:10,640 --> 01:23:16,640
And that case, this prefix of the workstation log is on the disk.

893
01:23:16,640 --> 01:23:18,640
Or in pedal.

894
01:23:18,640 --> 01:23:27,640
And that means that basically the last couple of file system operation are just walks.

895
01:23:27,640 --> 01:23:31,640
And only the prefix will be replaced.

896
01:23:31,640 --> 01:23:33,640
I see and we're just saying that's okay.

897
01:23:33,640 --> 01:23:35,640
Yeah, we're accepting that outcome.

898
01:23:35,640 --> 01:23:36,640
Got it. Thank you.

899
01:23:36,640 --> 01:23:39,640
Because we already accepted to that outcome earlier, right?

900
01:23:39,640 --> 01:23:42,640
Because it could have been the case that we got the file system crashed.

901
01:23:42,640 --> 01:23:45,640
And we got the file system.

902
01:23:45,640 --> 01:23:46,640
And we got the file system.

903
01:23:46,640 --> 01:23:48,640
Right before it or right after you got the revoke message,

904
01:23:48,640 --> 01:23:56,640
but it actually didn't write any log entry yet to the to pedal.

905
01:23:56,640 --> 01:24:02,640
Any more questions.

906
01:24:02,640 --> 01:24:05,640
I have completely unrelated question.

907
01:24:05,640 --> 01:24:06,640
Sure.

908
01:24:06,640 --> 01:24:08,640
I've been looking forward to it.

909
01:24:08,640 --> 01:24:10,640
I'm sorry.

910
01:24:10,640 --> 01:24:11,640
I've had a lot of questions.

911
01:24:11,640 --> 01:24:12,640
I'm thinking about a.

912
01:24:12,640 --> 01:24:13,640
A to four.

913
01:24:13,640 --> 01:24:16,640
But I was wondering if you knew.

914
01:24:16,640 --> 01:24:18,640
Anything about six.

915
01:24:18,640 --> 01:24:19,640
A five.

916
01:24:19,640 --> 01:24:20,640
Eight.

917
01:24:20,640 --> 01:24:21,640
For next semester.

918
01:24:21,640 --> 01:24:23,640
So, professor Saldo, it's just going to be teaching.

919
01:24:23,640 --> 01:24:24,640
Six.

920
01:24:24,640 --> 01:24:25,640
So, eight.

921
01:24:25,640 --> 01:24:26,640
Sixty.

922
01:24:26,640 --> 01:24:27,640
Yeah.

923
01:24:27,640 --> 01:24:28,640
I think we're,

924
01:24:28,640 --> 01:24:30,640
the current plan is not offer eight five eight in the fall.

925
01:24:30,640 --> 01:24:32,640
But we're hoping to offer it in the spring.

926
01:24:32,640 --> 01:24:33,640
Okay.

927
01:24:33,640 --> 01:24:38,640
What 660 is, I couldn't find much information.

928
01:24:38,640 --> 01:24:40,640
There's no reason to do that.

929
01:24:40,640 --> 01:24:43,640
That's a good question.

930
01:24:43,640 --> 01:24:48,640
It's intended to be an undergrad security class.

931
01:24:48,640 --> 01:24:49,640
Okay.

932
01:24:49,640 --> 01:24:51,640
Okay. Nice.

933
01:24:51,640 --> 01:24:57,640
So, like 685, 685, 858, but undergrad?

934
01:24:57,640 --> 01:25:04,640
I thought it was sort of like maybe a name throw to both 685, 7 and 685, 8.

935
01:25:04,640 --> 01:25:06,640
Okay.

936
01:25:06,640 --> 01:25:08,640
Who has the number?

937
01:25:08,640 --> 01:25:12,640
It's an experimental number. It's one of these experimental ones because the class doesn't exist.

938
01:25:12,640 --> 01:25:17,640
And it will be offered for the goals to offer it for the first time in a fall.

939
01:25:17,640 --> 01:25:18,640
Okay.

940
01:25:18,640 --> 01:25:27,640
So, is it going to be mostly like content from like is 858 going to keep its original form or is it?

941
01:25:27,640 --> 01:25:30,640
I mean, you're asking me questions.

942
01:25:30,640 --> 01:25:33,640
Sorry.

943
01:25:33,640 --> 01:25:41,640
I think the people involved in designing the class are people that are involved in 857 and the people involved in a fight.

944
01:25:41,640 --> 01:25:42,640
Yeah.

945
01:25:42,640 --> 01:25:44,640
I'm not actually involved.

946
01:25:45,640 --> 01:25:46,640
I'm not really involved.

947
01:25:46,640 --> 01:25:47,640
I don't know if I can help you.

948
01:25:47,640 --> 01:25:50,640
I mean, I think it's going to be a great question.

949
01:25:50,640 --> 01:25:54,640
But, um,

950
01:25:54,640 --> 01:25:57,640
and they're trying to work out what the curriculum exactly is going to be.

951
01:25:57,640 --> 01:26:01,640
And then, of course, you're going to have some percolations for 858 and 857.

952
01:26:01,640 --> 01:26:02,640
Okay.

953
01:26:02,640 --> 01:26:03,640
Sounds good.

954
01:26:03,640 --> 01:26:05,640
But 858 and 857 are not going to go away.

955
01:26:05,640 --> 01:26:06,640
That's the.

956
01:26:06,640 --> 01:26:07,640
Great.

957
01:26:07,640 --> 01:26:08,640
Thanks.

958
01:26:08,640 --> 01:26:09,640
You're welcome.

959
01:26:09,640 --> 01:26:10,640
That's a question.

960
01:26:10,640 --> 01:26:11,640
I don't know how quick it is.

961
01:26:11,640 --> 01:26:19,640
Or like right before section seven, they talk about a case, a failure where with like the

962
01:26:19,640 --> 01:26:22,720
least expiring and the server not really crashing.

963
01:26:22,720 --> 01:26:23,720
Yeah.

964
01:26:23,720 --> 01:26:29,079
And then talk about like basically that there's no real solution.

965
01:26:29,079 --> 01:26:31,240
Well, there's a solution.

966
01:26:31,240 --> 01:26:33,079
There's a real solution.

967
01:26:33,079 --> 01:26:35,079
The human intervention.

968
01:26:35,079 --> 01:26:36,079
Yeah, okay.

969
01:26:36,079 --> 01:26:40,600
So I think the problem here really is in this sort of the theme of the paperwork, like

970
01:26:40,600 --> 01:26:44,000
you know, pedal and front Japan, you have designed independently.

971
01:26:44,000 --> 01:26:46,560
And that has a lot of nice properties.

972
01:26:46,560 --> 01:26:49,680
And this is one where one one plays where it would be very helpful.

973
01:26:49,680 --> 01:26:53,000
Hopefully that your pedal has some support, you know, to help from Japan.

974
01:26:53,000 --> 01:26:58,280
You walk and that support would be actually half a time stamp on the right to pedal so

975
01:26:58,280 --> 01:27:02,360
that pedal can see when it right actually is out of you know, basically tool.

976
01:27:02,360 --> 01:27:03,360
Okay.

977
01:27:03,360 --> 01:27:08,920
So unless you do that, you need to like fiddle around with like the margin.

978
01:27:08,920 --> 01:27:09,920
Yes.

979
01:27:09,920 --> 01:27:10,920
Exactly.

980
01:27:10,920 --> 01:27:11,920
Okay.

981
01:27:11,920 --> 01:27:20,560
And what happens if like that error occurs like outside of the bounds of the margin?

982
01:27:20,560 --> 01:27:24,119
I mean, that's a cool.

983
01:27:24,119 --> 01:27:29,319
Basically you get an older right showing up in the basically somebody else might have

984
01:27:29,319 --> 01:27:31,480
that point gotten the walk on the file, correct?

985
01:27:31,480 --> 01:27:32,840
You're starting writing to it.

986
01:27:32,840 --> 01:27:37,440
And there's old right shows up and basically it's only overwrite some part of it.

987
01:27:37,440 --> 01:27:38,440
Okay.

988
01:27:39,000 --> 01:27:41,000
So we'll break consistency.

989
01:27:41,000 --> 01:27:43,000
So thank you.

990
01:27:43,000 --> 01:27:44,000
You're welcome.

991
01:27:44,000 --> 01:27:45,000
Okay.

992
01:27:45,000 --> 01:27:53,000
I guess we'll stop with that.

