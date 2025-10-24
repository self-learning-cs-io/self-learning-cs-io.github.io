---
title: MIT6824 P4Lecture4Primary BackupReplication
---

1
00:00:00,000 --> 00:00:09,000
Okay, good afternoon, good morning or good evening, where you are.

2
00:00:09,000 --> 00:00:12,000
I want to talk today about the primary backup replication.

3
00:00:12,000 --> 00:00:16,000
We have sort of an introduction to primary backup replication.

4
00:00:16,000 --> 00:00:21,000
We'll come back to this in multiple lectures during semester.

5
00:00:21,000 --> 00:00:26,000
But this is the FMT, the virtual memory or VN,

6
00:00:26,000 --> 00:00:31,000
the VRFV, the paper is a really nice introduction that brings out a lot of issues

7
00:00:31,000 --> 00:00:36,000
that are going to come up throughout the semester.

8
00:00:36,000 --> 00:00:41,000
The plan for lecture today is as follows.

9
00:00:41,000 --> 00:00:48,000
I'm just going to talk about failures that you might hope to tolerate using primary backup replication

10
00:00:48,000 --> 00:00:52,000
and some that you might not be able to.

11
00:00:52,000 --> 00:00:59,000
Then I want to talk a little bit about the main challenges in sort of any backup scheme.

12
00:00:59,000 --> 00:01:08,000
So we're also speaking, they talk about two dominant approaches to replication.

13
00:01:08,000 --> 00:01:15,000
One is what's typically called state transfer replication.

14
00:01:15,000 --> 00:01:25,000
And the second is typically called replication state machines.

15
00:01:25,000 --> 00:01:29,000
And today's paper is an example of a replicated state machine approach.

16
00:01:29,000 --> 00:01:35,000
In fact, you know, a lot of three and a lot four, you know, also will be using replicated state machine approach.

17
00:01:35,000 --> 00:01:42,000
And the fact that the GFS paper for replicating chunks was using a replicated state machine approach.

18
00:01:42,000 --> 00:01:52,000
So it's quite a common approach. And then you know, one I sort of make every little bit agreed by looking at this case to the case study.

19
00:01:52,000 --> 00:02:00,000
Of the VM, VMware, full tolerance scheme or implementation or system.

20
00:02:00,000 --> 00:02:06,000
So any questions before I get started just to put up.

21
00:02:06,000 --> 00:02:10,000
I have tried to answer all the questions that you sent by email.

22
00:02:10,000 --> 00:02:18,000
The ones that come in before midnight, I generally all answer the ones that come in after midnight, you know, try to answer as many as I can.

23
00:02:18,000 --> 00:02:27,000
But if I didn't answer your question, then you in the topic comes up in lecture at any point of time, you know, two, three to interrupt and ask it.

24
00:02:27,000 --> 00:02:39,000
Okay, any questions before we dive in.

25
00:02:39,000 --> 00:02:42,000
Okay.

26
00:02:42,000 --> 00:02:46,000
So let's talk about failures in a very broad sense.

27
00:02:46,000 --> 00:02:58,000
You get a sense of what we might hope for that the replication scheme can handle.

28
00:02:58,000 --> 00:03:04,000
So the first of all, the typically the papers that we're in the system, they're going to be a building.

29
00:03:04,000 --> 00:03:14,000
We only deal with what some things called or typically called fail stop failures.

30
00:03:14,000 --> 00:03:20,000
And the basic idea is that there if there's a failure or a component of the computer doesn't really work well.

31
00:03:20,000 --> 00:03:27,000
That actually stops the computer.

32
00:03:27,000 --> 00:03:33,000
So the assumption is that basically the computer goes from working to not working sort of instantaneously.

33
00:03:33,000 --> 00:03:37,000
It doesn't produce like weird results because the computer's not working correctly.

34
00:03:37,000 --> 00:03:39,000
So it just follows the protocols.

35
00:03:39,000 --> 00:03:45,000
You know, when it does to add it adds it to a register value, you know, that produces a correct, you know, add value.

36
00:03:45,000 --> 00:03:53,000
And so we're just assuming that when the computer works, you know, it works correctly and one there's a failure, it just stops.

37
00:03:53,000 --> 00:04:01,000
And this covers in many scenarios, you know, for example, like whatever you fan of the computer fails, you know, the computer overheats.

38
00:04:01,000 --> 00:04:06,000
And then the computer shuts down in itself.

39
00:04:06,000 --> 00:04:12,000
The other cases are where like, you know, somebody steps over to power court and boom, you know, the whole computer disappears.

40
00:04:12,000 --> 00:04:21,000
Or you know, open and you know cuts the network link and you know, the point, you know, the computer might keep you running, but it's completely disconnected.

41
00:04:21,000 --> 00:04:30,000
Sometimes you know, systems or software on the computer cell does it the best, you know, to turn these partial failures into stop fail stop failures.

42
00:04:30,000 --> 00:04:40,000
So example, you might, you know, the software might compute checksums on data and then if it sees that the checksum is incorrect, you know, just stop, you know, the computer.

43
00:04:40,000 --> 00:04:43,000
And so that's sort of quite common.

44
00:04:43,000 --> 00:04:49,000
So the basic model of the world is, the computer works correctly, then the computer stops.

45
00:04:49,000 --> 00:04:57,000
So what does this exclude, you know, there's a whole bunch of sort of failures that is excludes, for example, it doesn't really deal well with logic bucks.

46
00:04:57,000 --> 00:05:10,000
Like if you have an error in your software, you know, whatever you divide by zero and incorrectly or in the where you shouldn't have, then there's very likely that the back of will do exactly the same thing because the software is broken.

47
00:05:10,000 --> 00:05:19,000
And so it's broken on the primary, it's broken on the back. And so nothing, you know, basically replication really not does not solve that problem for you.

48
00:05:19,000 --> 00:05:23,000
Similarly, you know, if you have configuration errors,

49
00:05:26,000 --> 00:05:29,000
rendering backup is not going to solve you, not problem for you.

50
00:05:29,000 --> 00:05:38,000
You know, the files that specify the replica said are just incorrect, then the system will not work correctly.

51
00:05:38,000 --> 00:05:48,000
Similarly, we're not really in this class, we'll talk a little bit at the end of the semester, but we're not dealing with malicious errors.

52
00:05:48,000 --> 00:05:59,000
So we're not dealing with attackers that, you know, try to fake the protocol, you know, have run servers that send incorrect messages and try to sort of spoof the whole system.

53
00:05:59,000 --> 00:06:05,000
We're just not in consideration. So in the, for most of the semester, we're assuming that the software works correctly.

54
00:06:05,000 --> 00:06:12,000
There's not have logic bugs, the no particular Asian areas, the thing that we're focusing on is actually handling stop failures.

55
00:06:12,000 --> 00:06:23,000
There's some failures that sort of fall, you know, the could be handled or maybe handled with primary backup replication or not.

56
00:06:23,000 --> 00:06:28,000
And as a example, you might think about like an earthquake.

57
00:06:29,000 --> 00:06:50,000
Now, if the primary and backup are physically, you know, separated in a completely different parts, you know, in different continents or maybe different parts of the same continent, when I'm not, you might hope that you might have some hope that the backup could take over if the primary fails due to an earthquake, but, you know, some other primary replication schemes.

58
00:06:50,000 --> 00:06:59,000
You know, this is not going to be the case, you know, what are the general of the primary and the backup on the same data center and the whole data center disappears, then, you know, sort of end of story.

59
00:07:00,000 --> 00:07:01,000
Okay.

60
00:07:01,000 --> 00:07:05,000
The whole thing is a little bit of context of sort of the type of failures that we're trying to shoot for.

61
00:07:06,000 --> 00:07:14,000
Now, even with this sort of just focusing on stop to stop failures, turns out to be difficult, they'll, you know, fault, all of systems.

62
00:07:14,000 --> 00:07:22,000
You know, we're going to talk a little bit about sort of the general issues that will show up, you know, if we're going to build a primary backup system.

63
00:07:24,000 --> 00:07:30,000
And you know, we'll see concrete exam instances of these problems in the VM FTP paper.

64
00:07:31,000 --> 00:07:38,000
So, you know, one challenge is, you know, if a failure happens, you know, has the primary actually failed.

65
00:07:45,000 --> 00:08:04,000
An easier year, you know, that makes this challenging is that in a distributed system, you can tell the difference between a network petition and a machine failed. So it might be personally possible that the network that the primary still up, but you know, that some computers cannot talk to the primary because the network expectation.

66
00:08:04,000 --> 00:08:10,000
And so, for example, the backup may decide that, you know, the primary is dead because the network's petition, but that fact the primary is not that.

67
00:08:10,000 --> 00:08:13,000
And maybe some of the clients are still able to talk to the primary.

68
00:08:13,000 --> 00:08:20,000
And so you have to have some story of making sure that you're, you don't end up in the situation where you have two primaries.

69
00:08:21,000 --> 00:08:31,000
And again, you know, we talked a little bit about last time that shows up in this paper again, we'll show up next week too, which is like, we want to avoid that we get into a situation where there's sort of a split brain system.

70
00:08:35,000 --> 00:08:42,000
Where we're they to live to a primary and like one subset of the client products to one primary and the other subset of the client talks to the other prime.

71
00:08:42,000 --> 00:08:53,000
And clearly that's going to diverge in the state of the system. And when the network heals, we are in an incorrect state. So we have to avoid this at all cost.

72
00:08:54,000 --> 00:09:04,000
The second general challenge is, you know, how do we keep the, you know, how do we keep the primary and the backup in sync.

73
00:09:05,000 --> 00:09:06,000
Yeah.

74
00:09:14,000 --> 00:09:23,000
Our goal is going to be to, if the primary fails, then we can just gracefully fill it over to the backup and the backup just picks up right where the primary left off.

75
00:09:24,000 --> 00:09:38,000
And that requires that the backup actually is up to date, we have like the latest things that the primary action is written to state so that an action can pick up seamlessly and don't return errors from responses to the client that are completely unexpected.

76
00:09:39,000 --> 00:09:47,000
And from the client's perspective, it really should look like the whole thing even though it's replicated. It's like a single computer just happens to be a little bit more fall tolerant than a single computer.

77
00:09:48,000 --> 00:09:56,000
And that turns out to be difficult, you know, first of all, we have to make sure that we apply all changes. We have to apply to change in the right order.

78
00:10:02,000 --> 00:10:11,000
And in a continuous issue and that is that we have to sort of avoid non determinism, where we have the deal with non determinism.

79
00:10:12,000 --> 00:10:25,000
And if the same change on the primary, the age of different than on the backup, because for some reason that would be not good, you know, we got to make sure that we make a change in the primary backup, they're identical effects to the primary and the backup.

80
00:10:27,000 --> 00:10:32,000
Similar sort of issue that I want to show up, you know, some challenges fail over.

81
00:10:33,000 --> 00:10:45,000
You have actually the primary fails and we need to fail over to the backup. And we have to make sure that the other primary is definitely dead.

82
00:10:46,000 --> 00:10:54,000
But the example the primary might have was in the middle of an operation and it was about to send a packet out to the response to the client or maybe not.

83
00:10:55,000 --> 00:11:00,000
And so we got to figure out what have that response if you send or not being sent or is the cave for us to send it again.

84
00:11:03,000 --> 00:11:10,000
There's a question here in the chat, like when would fail over need to be happened, no fail need to happen when the primary is gone.

85
00:11:11,000 --> 00:11:14,000
Because then we want to fail over to the backup that's the terminology used.

86
00:11:17,000 --> 00:11:23,000
And then often another issue we fail over is like who actually has to know we have multiple backups, which is not the case in today's paper.

87
00:11:24,000 --> 00:11:36,000
And we actually ask the latest state, like for example, maybe they all crash after a few operations, they come back up and and and and we are going to make sure that we actually talking to the one next to the most recent state.

88
00:11:37,000 --> 00:11:43,000
This is going to be not an issue today too much, so much. That's what we'll see in a second why a bit of will come up later in other replication protocols.

89
00:11:46,000 --> 00:11:48,000
Yeah, so basically fail over means the backup takes over.

90
00:11:49,000 --> 00:12:01,000
Okay, so that's sort of the main failure that we hope to handle the main challenges in the will deepen those challenges out as we go.

91
00:12:02,000 --> 00:12:10,000
And you know, I want to talk about sort of to the two main approaches that we'll see in the semester for dealing with primary backup replication.

92
00:12:19,000 --> 00:12:23,000
One is a mentioned earlier that is state transfer.

93
00:12:28,000 --> 00:12:32,000
I use a regional at a high level very straightforward, you know, we got a primary.

94
00:12:33,000 --> 00:12:43,000
It's you know the clients talk to the primary the primary updated state wants a data stage in response to client request. And once a while it sort of makes a check point.

95
00:12:48,000 --> 00:12:51,000
Once a while basically check points state.

96
00:12:56,000 --> 00:12:58,000
It's state to the backup.

97
00:13:01,000 --> 00:13:14,000
And of course, if you want to the backup in the primary to be in sync, you know, that means that every time the primary actually performs an operation, I before it responds to the client, it basically has to transfer whatever state changes that were made by that operation to the backup.

98
00:13:15,000 --> 00:13:17,000
So that's one scheme.

99
00:13:18,000 --> 00:13:24,000
One high level approach, a second approach is what it's called replicated state machine.

100
00:13:27,000 --> 00:13:28,000
State machine replication.

101
00:13:32,000 --> 00:13:34,000
Often shortened to RGM.

102
00:13:35,000 --> 00:13:43,000
And here, you know, the picture is, you know, we've still got a primary, we've got the client talking to the primary. And of course, you know, we've got the primary.

103
00:13:44,000 --> 00:13:57,000
We have the primary talking to the backup to keep the backup in sync, but instead of sending the state changes, or modifications to the state from the primary to the backup, but we do actually we sent the operations to the backup.

104
00:13:59,000 --> 00:14:13,000
So before the primary response to the client, you know, actually getting its operation, you know, we sent the operation that the client sent to us, you know, to the backup to the backup can execute the operation to update state, you know, acknowledge it to the primary primary updates.

105
00:14:14,000 --> 00:14:18,000
So we're going to execute the operation and then sends the response back to the to the client.

106
00:14:20,000 --> 00:14:31,000
And sort of in all these sort of in all these in both approaches, you know, the sort of the scheme is like the primary to some particular state, we apply changes to the state.

107
00:14:32,000 --> 00:14:42,000
And we do exactly the same thing at the back of the backup is in the start out in the same state as the primary, we apply the same changes to the state where it's through an operational or state term for we end up in a new state.

108
00:14:42,000 --> 00:14:54,000
And that state has to be identical to the state that the primary has. And so we have been ever goes a failure, you know, we know that when we feel over to the backup, it is exactly in the same state as the primary and so it can take over.

109
00:14:57,000 --> 00:15:01,000
And we'll see, you know, this is actually challenging to actually make happen, but that's sort of the basic plan.

110
00:15:01,000 --> 00:15:14,000
The primary, both approach is actually a reasonable popular, the primary disadvantage of the state transfer approach is that like if an operation generates a lot of state, then it's going to be expensive.

111
00:15:15,000 --> 00:15:21,000
Like a single operation right to gigabyte of data, then gigabyte of data needs to be transferred to the primary, to the backup.

112
00:15:22,000 --> 00:15:29,000
And it might be much more expensive and much more less expensive to basically just send over the operation through the backup, so the backup, the backup connection to the operation.

113
00:15:29,000 --> 00:15:39,000
So many of the systems that were talking about actually there for follow the second approach, you know, where they sent the operation, but not the state transfer.

114
00:15:40,000 --> 00:15:58,000
And, in fact, you know, if you think about GFS, the discussion from last week, and we just saw that basically the primary sends the append operations or the right operations to the backups, doesn't do the append and then sent the result, you know, to the backups that actually sends the backup.

115
00:15:59,000 --> 00:16:19,000
So that's an example of a replicated state machine approach, where we'll be sending operations and the paper of today also follows this replicated state machine approach where the operations are not, you know, append and write file system append to file system right, but the operations are actually x86 instructions, you know, that's what we'll see later.

116
00:16:20,000 --> 00:16:23,000
But they both send to operations.

117
00:16:24,000 --> 00:16:35,000
In labs, as I mentioned earlier, labs free and poor are also replicated state machine approach, where you know, we're going to be sending operations from the primary to the backup.

118
00:16:35,000 --> 00:16:41,000
As a.

119
00:16:47,000 --> 00:16:57,000
Because there's a question that Chad, why does the client do not send not need to send the data to the backup in our replicated state machine, because the idea is that these operations are deterministic.

120
00:16:57,000 --> 00:17:04,000
And so the primary and this, you know, remember the primary, we'll talk about this in much more detail, but the primary and backup are in the same state same state s.

121
00:17:05,000 --> 00:17:12,000
The, if the operation is deterministic and you apply to the same state, you know, they will end up in the same state as prime.

122
00:17:13,000 --> 00:17:22,000
And so there's no reason for the apple to the client sent the data in this case, because by just sending this deterministic operation, it is guaranteed that operation will generate the same data.

123
00:17:22,000 --> 00:17:34,000
So subsequent questions, how do you know for all programs in their operations, whether they are just deterministic or non deterministic to know what information need to be sent.

124
00:17:35,000 --> 00:17:44,000
So the typical approach is to replicate a state machine approach is to make all operations deterministic, non deterministic operations are not allowed. And we'll see in a second how you do that.

125
00:17:44,000 --> 00:17:52,000
Okay, so before going through a little bit more specific.

126
00:17:53,000 --> 00:18:03,000
Under hybrid approaches, yes, you know, there are hardback approaches, you know, for example, you can run sort of by default in a replicated state machine approach.

127
00:18:03,000 --> 00:18:25,000
In effect, some ways the paper dust this, then if if the backup fails or primary fails and you go back to a single machine, then you need to create a new replica and I think for the new replica, the way you do it is actually by transferring the state from the existing replica or a copy of the state of the existing replica to the new replica.

128
00:18:26,000 --> 00:18:37,000
But as it likes hopefully less frequent operation, then actually, you know, during the, then replicating operations, they're doing much more frequently.

129
00:18:39,000 --> 00:18:46,000
Also free, feel free to ask the questions, you know, in real time, as opposed to chatting type of time in a chat either way is fine, but.

130
00:18:47,000 --> 00:19:00,000
Okay, so as I hinted, you know, with this replicate your state machine approach, you know, there's a question about what level of replication or do you what level of operations.

131
00:19:04,000 --> 00:19:05,000
To replicate.

132
00:19:05,000 --> 00:19:18,000
So, one, one, one are possibilities sort of application level operations.

133
00:19:36,000 --> 00:19:42,000
So what I mean is, you know, think, think back at gfs, like whether it's a pen file a pen.

134
00:19:47,000 --> 00:19:48,000
Or right.

135
00:19:49,000 --> 00:20:04,000
Another, and if you're playing that game sort of replicate state machine game at the level of these sort of application level operations that means that the application has to be involved, you know, because it knows what the semantics of these operations are.

136
00:20:05,000 --> 00:20:17,000
And it knows what an append actually supposed to do or what a right is supposed to do. And so if you're playing a replicate state machine approach at that kind of application level, then the application itself needs to be modified, you know, to.

137
00:20:18,000 --> 00:20:24,000
And so, you know, the application is actually performed or played part of the replicate state machine approach.

138
00:20:24,000 --> 00:20:28,000
One thing that's cool about the paper today that we're looking at to.

139
00:20:28,000 --> 00:20:38,000
And looking at today is it, you know, does the operations at the machine level or the processor level or the computer level.

140
00:20:38,000 --> 00:20:46,000
And so the state is register, you know, the x86 registers and the memory state.

141
00:20:46,000 --> 00:20:58,000
And the applications are just ordinary computer instructions. And by replicating at that level, then you can basically make no replication complete your transparent.

142
00:20:58,000 --> 00:21:05,000
Because you can take one computer run the application or an operating system on top of it, but there's some runs in x86 instructions.

143
00:21:05,000 --> 00:21:19,000
And this replicated state machine approach automatically creates a backup of that of that particular execution. So the application doesn't have to be modified at all. In fact, in this paper, the operating system is not modified.

144
00:21:19,000 --> 00:21:30,000
The application is not modified. You can take an ordinary application, not even written with fault tones in mind and using this sort of machine level over instruction level replication.

145
00:21:30,000 --> 00:21:42,000
It can be transparently replicated. One of the things that is very cool about the paper of today is it's just completely transparent.

146
00:21:42,000 --> 00:21:45,000
Now,

147
00:21:45,000 --> 00:21:57,000
the maker wonder like, you know, how to do that because like what happens to you like a machine and an interrupt happens, you know, that interrupt needs to be propagated in some way directly to the backup.

148
00:21:57,000 --> 00:22:11,000
So if you think about the x86 machine, you know, of course, the regular instructions that the applications execute like ads, whatever divide, you know, conditional branch branching, procedure calls, but there are also other events like interrupts.

149
00:22:11,000 --> 00:22:31,000
They need to be, you know, handled with. And so how do you do that? And so the traditional way of doing through machine level replication used to be sort of quite expensive in the sense that the, you could be like computers, there were the processors like maybe replicated twice or three times.

150
00:22:31,000 --> 00:22:39,000
And the hardware itself will organize, you know, that these processors ran exactly lockstep.

151
00:22:39,000 --> 00:22:49,000
And you know, there's a lot of hardware machinery to actually make this happen. And this paper has a cool observation that you don't really need to do really hardware replication.

152
00:22:49,000 --> 00:22:58,000
Instead, you can actually use virtual machines.

153
00:22:58,000 --> 00:23:00,000
That's the way to do it.

154
00:23:00,000 --> 00:23:23,000
The pure hardware replication happens to, you know, example in in in a erinotics or, you know, whatever in more rover, you know, often the hardware modules are just like double duplex replicated or triple replicages and have a hardware voting scheme to keep sure the processors in sync and detect failures.

155
00:23:23,000 --> 00:23:33,000
But a sort of a level of fault tolerance that, you know, that's not what this this level of fault tolerance that this VM FTP paper is not actually shooting for.

156
00:23:33,000 --> 00:23:42,000
It's really thinking about like, you know, you got a, in a business application running on the computer and now you want to make a business application with fault tolerance.

157
00:23:42,000 --> 00:23:48,000
And the approach to take this to, you know, exploit the fertilization.

158
00:23:48,000 --> 00:24:04,000
For the customer to VM FTP and exploit virtualization. That's the main big idea that they bring what are going to the problem.

159
00:24:04,000 --> 00:24:17,000
And you know, by doing so, they can make this replication transparent to the application.

160
00:24:17,000 --> 00:24:25,000
And you don't have to design as an application design and then replication scheme, you know, for example, the way he's done in.

161
00:24:25,000 --> 00:24:33,000
In gfs at a pier, you know, using the scheme that is replicate scheme that the VM FTP uses.

162
00:24:33,000 --> 00:24:38,000
And there's basically that the beer should recline.

163
00:24:38,000 --> 00:24:45,000
But the services are single machine.

164
00:24:45,000 --> 00:24:51,000
Meaning it just, you know, we'll see in second how, but you know, basically they're going to provide very strong consistency.

165
00:24:51,000 --> 00:24:54,000
And I'll find in the outside can't even tell.

166
00:24:54,000 --> 00:25:05,000
And it actually, you know, the paper should cool paper because it actually is it's a real product.

167
00:25:05,000 --> 00:25:08,000
And it's still in use.

168
00:25:08,000 --> 00:25:12,000
You can, you know, get this.

169
00:25:12,000 --> 00:25:15,000
There's a support. If you want to.

170
00:25:15,000 --> 00:25:20,000
I think it's quite different from the one that we actually read about in the paper.

171
00:25:20,000 --> 00:25:25,000
But you know, at the very high level, you know, the issues are very similar.

172
00:25:25,000 --> 00:25:32,000
In fact, you know, the one of the big shortcomings as many of you noted into questions.

173
00:25:32,000 --> 00:25:36,000
The one that's got paper, it's like a single core solution.

174
00:25:36,000 --> 00:25:38,000
So there's no multi core support.

175
00:25:38,000 --> 00:25:42,000
So multiple applications and multiple threats on one computer cannot run in parallel.

176
00:25:42,000 --> 00:25:49,000
And we'll talk about in second why that this solution doesn't really support that in the later later versions of.

177
00:25:49,000 --> 00:25:51,000
Ft does actually works.

178
00:25:51,000 --> 00:25:56,000
And I think there's no pay real detail paper that describes it.

179
00:25:56,000 --> 00:26:03,000
But I actually think that instead of using actual replicate state machine approach to actually using a state transfer approach.

180
00:26:03,000 --> 00:26:08,000
But I really don't know any really of the details.

181
00:26:08,000 --> 00:26:16,000
The focus on the replicate state machine approach because one reason I like this paper is because of sort of illustrates replicate state machine approach in a very clean manner.

182
00:26:16,000 --> 00:26:26,000
And all the, you know, all the subsequent replication schemes that we're going to be looking at are replicate state machine approaches.

183
00:26:26,000 --> 00:26:28,000
Okay.

184
00:26:28,000 --> 00:26:31,000
So.

185
00:26:31,000 --> 00:26:36,000
So let us sketch out the overview.

186
00:26:36,000 --> 00:26:39,000
And so the first thing.

187
00:26:39,000 --> 00:26:44,000
You sort of need to realize is that there's a virtual there's a virtual machine monitor involved.

188
00:26:44,000 --> 00:26:46,000
So what is a virtual machine monitor?

189
00:26:46,000 --> 00:26:50,000
Well, virtual machine monitor basically takes a piece of hardware and.

190
00:26:50,000 --> 00:26:55,000
It makes it appear, you know, basically makes and pieces are hard work out of it.

191
00:26:55,000 --> 00:27:03,000
So if we like at the next 86 box, you know, we can take a virtual machine monitor, run it on top of it.

192
00:27:03,000 --> 00:27:08,000
And you know, top of it, we can have virtual machines and machine.

193
00:27:08,000 --> 00:27:16,000
We're going to multiple virtual machines, although in most of this paper, we're going to be talking about running one virtual machine in top of the virtual machine monitor.

194
00:27:16,000 --> 00:27:29,000
And so, for example, we might actually have a Linux, you know, operating system running on top of the virtual machine, you know, with its applications.

195
00:27:29,000 --> 00:27:32,000
And so here's actually the actual hardware.

196
00:27:32,000 --> 00:27:42,000
And why, you know, and so the VM, the terminal years to years, sometimes called a hypervisor, it's called a virtual machine monitor.

197
00:27:42,000 --> 00:27:50,000
And so in our case, you know, really the hypervisor here, this is actually the VM FT.

198
00:27:50,000 --> 00:27:58,000
So it's a hypervisor modified, you know, to include, you know, the ideas that VM FT has.

199
00:27:58,000 --> 00:28:10,000
And so, the reason this is cool, well, the reason this is cool because we're useful for replicate state machines is because if an hardware, you know, interrupt actually happens that hardware interrupt doesn't really go straight to Linux.

200
00:28:10,000 --> 00:28:13,000
In fact, the hardware interrupt goes through the VM monitor.

201
00:28:13,000 --> 00:28:19,000
And the VM monitor actually decides, you know, when to deliver, you know, that interrupt, you know, to Linux.

202
00:28:19,000 --> 00:28:30,000
And so, you know, the external events, you know, before to actually sort of observe to, you know, by the virtual machine are actually captured by or can be captured by the hypervisor.

203
00:28:30,000 --> 00:28:40,000
And so this gets us out of this mess, you know, like what I mentioned a little bit earlier where, you know, what happens if there's an external interrupt, you know, how can we sort of replicate that.

204
00:28:40,000 --> 00:28:46,000
And the way we can replicate it here is because the virtual machine monitor just gets controlled.

205
00:28:46,000 --> 00:28:56,000
So this is going to be an extremely powerful tool to actually make instruction deterministic, you know, handle external operations, et cetera, et cetera.

206
00:28:56,000 --> 00:29:09,000
So the basic plan is like if an interrupt comes in, you know, whether there's an interrupt from the network or from the hardware itself, like a timer interrupt.

207
00:29:09,000 --> 00:29:15,000
The timer interrupt is delivered, you know, to the virtual machine monitor, the virtual machine monitor.

208
00:29:15,000 --> 00:29:25,000
And then in the case of F and T, just two fix, you know, not only delivers it at some point to the application, it also sends over a logging channel to a backup computer.

209
00:29:25,000 --> 00:29:29,000
And the backup user is instructed in the same way, you know, as hardware.

210
00:29:29,000 --> 00:29:49,000
So it has the virtual machine monitor sitting at top of it. So there's another copy of F and F T. And, you know, top of this virtual machine, you know, where identical software running on it, like Linux, same version of Linux, you know, with, you know, whatever some set of applications.

211
00:29:49,000 --> 00:29:58,000
And so, like, you know, these machines both on, you know, some networks, we use the logging channel.

212
00:29:58,000 --> 00:30:10,000
And maybe years of client, you know, talking basically to the hardware, do you know, sense of packet over the network, the actual hardware, you know, see step packet.

213
00:30:10,000 --> 00:30:22,000
And then they'll, and deliver it, you know, and the virtual machine monitor, just gets control and delivers it in the hardware delivery to the virtual machine monitor or the virtual machine monitor, if you will, picks it up.

214
00:30:22,000 --> 00:30:34,000
And so, I should think about it, you know, this packet, you know, Joltz in an interrupt that's delivered to the virtual machine monitor.

215
00:30:34,000 --> 00:30:46,000
The virtual machine monitor will send that interrupt. You know, see in the second, you know, forward to the backup, deliver it, deliver it also to the local virtual machine.

216
00:30:46,000 --> 00:30:57,000
The local virtual machine, you know, there's just Linux running. She saw I got an interrupt. And so it does its normal processing. You'd always were doing interrupt. And so at some point, you know, maybe it will generate a response.

217
00:30:57,000 --> 00:31:10,000
And also, for example, right, you know, to the network card, at least it will think it's writing to the network interface card. But really what it is is a virtual network interface card that is like emulated, you know, by the virtual machine monitor.

218
00:31:10,000 --> 00:31:19,000
So when it writes actually, you know, bunch of instructions to this, you know, virtual card, really what it is is actually writing to the virtual machine monitor.

219
00:31:19,000 --> 00:31:36,000
And so the virtual machine monitor, you know, can actually send the packet and they have the operating system by programming the real hardware. And then the real hardware sends off, you know, response to the client.

220
00:31:36,000 --> 00:31:44,000
So that's the normal execution for what years the primary years are backup.

221
00:31:44,000 --> 00:31:51,000
And basically the backup, the same thing happens, you know, if you know, the machine started exactly in the same stage, you know, they take the interrupt.

222
00:31:51,000 --> 00:32:03,000
You know, at the same time and the virtual machine monitor can control when to deliver the interrupt. So it can arrange, you know, to make sure that interrupt is if we delivered exactly at the same time exactly at the same instruction that the primary got it.

223
00:32:03,000 --> 00:32:10,000
So we'll deliver the interrupt, you know, through the, you know, we'll receive the interrupt from the primary, maybe buffer it for a while until the backup.

224
00:32:10,000 --> 00:32:16,000
So we're seeing the second hits, you know, sort of the same instruction that the primary dot then delivers the interrupt, you know, to Linux.

225
00:32:16,000 --> 00:32:23,000
Linux does this usual way. It will be, you know, since it's exactly in the same state as in the primary, it will do exactly the same thing as the primary dust.

226
00:32:23,000 --> 00:32:31,000
So at some point, you know, it will, you know, program the virtual network card to actually send a response packet, you know, all that stuff will happen.

227
00:32:31,000 --> 00:32:36,000
And at some point says like, you know, sent that packet, you know, the virtual machine monitor will get control.

228
00:32:36,000 --> 00:32:43,000
It knows it's a backup. And so it doesn't, it doesn't do anything. It actually doesn't send packet on the network because it's the backup.

229
00:32:43,000 --> 00:32:56,000
Okay, that's the basic plan. Then there's one more component in this story that is important to realize, which is that there is on the site, on the site.

230
00:32:56,000 --> 00:33:08,000
On the same network, there is a storage server.

231
00:33:08,000 --> 00:33:14,000
What you can think about this is the hard disk for these two virtual machines.

232
00:33:14,000 --> 00:33:31,000
And so when an application here writes to a file, really what it turns into is the kernel will, you know, the file system is maybe mounted on the local Linux operating system, the Linux operating system sees how this is like a remote disk.

233
00:33:31,000 --> 00:33:40,000
And so it will form a packet and then we'll send that packet, you know, to, you know, let me drop it maybe in a slightly different way, send the packet, you know, through the virtual machine monitor.

234
00:33:40,000 --> 00:33:49,000
Let's say place in a virtual machine monitor like send it off the virtual machine monitor, I think I will go off and send nobody network to the storage server.

235
00:33:49,000 --> 00:33:57,000
This sort of server will respond at some point in some ways, this communication looks identical as if there's a client sitting the other side of the network.

236
00:33:57,000 --> 00:34:07,000
And so we're seeing that in the storage server case, the Linux sort of starts the communication while in the other case, the client starts the communication.

237
00:34:07,000 --> 00:34:16,000
Green air is represent communication to the storage server. So a network packets being sent from through Linux, through the virtual machine monitor to the storage server.

238
00:34:16,000 --> 00:34:30,000
So I'm right by an application through a file basically results in these messages and then it will whatever update any state, you know, persistent state that you know on the on the storage server.

239
00:34:30,000 --> 00:34:44,000
Now, as we saw in the paper, the storage server plays an additional role on top of a top of a basically being stored server, namely there's sort of a spectral flag.

240
00:34:44,000 --> 00:34:56,000
So it's on the site, or there's a block in the storage server that's being used to arbitrate who becomes the primary after failure.

241
00:34:56,000 --> 00:35:02,000
So, so this all comes down to this is the part of the failure over plan.

242
00:35:02,000 --> 00:35:15,000
So let's say, you know, the logging standard breaks or in the way, you know, this manifests in or through the virtual machine monitor is that didn't sense periodically packets over it is logging channel.

243
00:35:15,000 --> 00:35:24,000
And it doesn't get any responses from the other site, then it assumes that the other side, there's a problem.

244
00:35:24,000 --> 00:35:33,000
So, of course, you can't decide whether, you know, just the network is not working or whether it actually the virtual machine monitor, you know, the computer is really crashed.

245
00:35:33,000 --> 00:35:42,000
And if it's really crashed, of course, it should, you know, take over and if it's really not crashed, then, you know, we have to arbitrate it some way and we make sure that only one of them actually proceeds.

246
00:35:42,000 --> 00:35:45,000
So let's say the network petitions.

247
00:35:45,000 --> 00:35:50,000
So this is the harder case when the network petitions instead of like one of them to crash us.

248
00:35:50,000 --> 00:35:53,000
So, you're network petitions.

249
00:35:53,000 --> 00:36:00,000
What can you notice that the two can still communicate both the primary and the backup can communicate to the store chart.

250
00:36:00,000 --> 00:36:07,000
And so in this particular case, and what will happen is they will notice, you know, both sites will notice the primary and the backup will notice.

251
00:36:07,000 --> 00:36:11,000
So, there's some problem we can't talk to the primary anymore of these affairs.

252
00:36:11,000 --> 00:36:15,000
And so, at some point they said, well, the other guy must probably could be dead.

253
00:36:15,000 --> 00:36:17,000
And I want to promote myself to primary.

254
00:36:17,000 --> 00:36:25,000
So the backup says, like, I'm going to promote myself to primary or the primary says, like, well, I really want to continue serving client requests.

255
00:36:25,000 --> 00:36:28,000
And I just want to ignore the backup from now.

256
00:36:28,000 --> 00:36:33,000
And so basically, it says, this is what they call, they want to go live.

257
00:36:33,000 --> 00:36:38,000
Basically, go back into single mode and we want to do and we've won primary.

258
00:36:38,000 --> 00:36:49,000
And so the way that this happens is that, you know, both of them, you know, send try to read the call is a test set operation.

259
00:36:49,000 --> 00:36:58,000
Now, talk a little bit about it in more detail, but both basically both reach out to the store server and try to write a flag saying instead of to one.

260
00:36:58,000 --> 00:37:05,000
And if the flag was already set to one, they'd amend like the other guy one was earlier.

261
00:37:05,000 --> 00:37:07,000
So it goes from zero to one.

262
00:37:07,000 --> 00:37:09,000
They both try to do this atomically.

263
00:37:09,000 --> 00:37:16,000
One of them is going to go first, you know, that will succeed, you know, setting to one and look at return to old value zero.

264
00:37:16,000 --> 00:37:20,000
So it knows that, you know, nobody else succeeded actually writing the flag to one yet.

265
00:37:20,000 --> 00:37:23,000
And therefore, you know, I should become the primary to keep running.

266
00:37:23,000 --> 00:37:36,000
And the second guy, you know, what if the primary or the backup, you know, that comes in second, you know, we'll see you will try to set the flag to one is already set to one, the return value be one because that was people value by the time it, you know, data is test set operation.

267
00:37:36,000 --> 00:37:44,000
And therefore it will decide, well, I'm just going to give up because, you know, there's already somebody else to go for.

268
00:37:44,000 --> 00:37:50,000
And basically, you know, it's the paper calls, you know, they terminates itself.

269
00:37:50,000 --> 00:37:56,000
Okay. So that's sort of the high level operation.

270
00:37:56,000 --> 00:37:58,000
The high level of operation for failure.

271
00:37:58,000 --> 00:38:01,000
You know, there's a question in the chat, which is a good question.

272
00:38:01,000 --> 00:38:03,000
When is the flag reset to zero?

273
00:38:03,000 --> 00:38:08,000
Well, there's not basically a whole separate story that I haven't talked about yet.

274
00:38:08,000 --> 00:38:15,000
And so you'll get through is that in one, you know, the primary runs on one, we have one server running now.

275
00:38:15,000 --> 00:38:20,000
We'd like to make a second backup, you know, and sort of get into position that we're basically half a backup again.

276
00:38:20,000 --> 00:38:23,000
You know, we have to do what's called repair because we don't do repair.

277
00:38:23,000 --> 00:38:29,000
Then, you know, the we start every two computers, one fails and we have one computer and a little bit later that one computer may fail.

278
00:38:29,000 --> 00:38:30,000
No, we have no computers anymore.

279
00:38:30,000 --> 00:38:33,000
And so it has to be the case that has to be so repair plan.

280
00:38:33,000 --> 00:38:37,000
And in, you know, the empty tea is repair plan is executed manually.

281
00:38:37,000 --> 00:38:47,000
So, somebody, you know, monitors where the monitor software sort of notice this and basically creates then a new replica.

282
00:38:47,000 --> 00:38:52,000
Or based on the VM image of the first one.

283
00:38:52,000 --> 00:39:02,000
Assures as in sync and then, you know, it resets that flag and, you know, and what it's logging starts again and then the flag is reset.

284
00:39:02,000 --> 00:39:09,000
Once that second primary is completely backup and following the protocol, then the flag can be reset.

285
00:39:09,000 --> 00:39:14,000
OK.

286
00:39:14,000 --> 00:39:17,000
OK.

287
00:39:17,000 --> 00:39:19,000
OK, good. There's a great question.

288
00:39:19,000 --> 00:39:28,000
Like, and why it would maybe the logging channel broke, but maybe the, the, the, the, the, the, the, the, the, the, the, the, the channel to the server broke too.

289
00:39:28,000 --> 00:39:32,000
And so, you know, we're not getting to get the response.

290
00:39:32,000 --> 00:39:38,000
And that basically that point of system just stops, if you will, until something repairs.

291
00:39:38,000 --> 00:39:43,000
Because nothing can be done. So at that point for men on no clients request are actually processed.

292
00:39:43,000 --> 00:39:46,000
Because we just don't know what state we are.

293
00:39:46,000 --> 00:39:53,000
And maybe at some point in that work link will get repaired and then point, you know, things get moving forward again.

294
00:39:53,000 --> 00:40:14,000
So we can only just use a 1 a.m.

295
00:40:14,000 --> 00:40:16,659
is reading from the storage server?

296
00:40:16,659 --> 00:40:18,659
The client never reads really from the storage server.

297
00:40:18,659 --> 00:40:22,460
It's the Linux that might or the application running

298
00:40:22,460 --> 00:40:24,619
on top of the Linux might be running from the storage server.

299
00:40:24,619 --> 00:40:25,539
And that's the one case.

300
00:40:25,539 --> 00:40:28,619
And the second case, the MFT might be running from the storage

301
00:40:28,619 --> 00:40:31,860
server to read that flag, where it tests and set that flag.

302
00:40:31,860 --> 00:40:34,179
So that green arrow at the bottom from the storage server

303
00:40:34,179 --> 00:40:38,260
to see is a.

304
00:40:38,260 --> 00:40:39,139
Oh, sorry.

305
00:40:39,139 --> 00:40:40,900
Now green.

306
00:40:40,900 --> 00:40:42,059
That's a bad green arrow.

307
00:40:42,059 --> 00:40:43,860
That's just gone like all the way.

308
00:40:43,860 --> 00:40:44,380
Oh, OK.

309
00:40:44,380 --> 00:40:45,139
Thank you.

310
00:40:45,139 --> 00:40:47,420
You just go over to network and not intended to go to see.

311
00:40:47,420 --> 00:40:50,019
It was intended to go over to network.

312
00:40:50,019 --> 00:40:52,259
Thanks for clarifying that.

313
00:40:52,259 --> 00:40:53,500
I hadn't realized that.

314
00:40:53,500 --> 00:40:54,299
OK.

315
00:40:54,299 --> 00:41:02,659
So what I like, so I want to maybe take a quick break at this point

316
00:41:02,659 --> 00:41:04,699
or do a breakout room.

317
00:41:04,699 --> 00:41:06,420
And in particular, would like you to do

318
00:41:06,420 --> 00:41:09,340
and stop a little bit about the homework question,

319
00:41:09,340 --> 00:41:12,940
which we're sort of covered at this instance.

320
00:41:12,940 --> 00:41:17,700
But I want you to think about understand or argue with each other

321
00:41:17,700 --> 00:41:20,500
and convince yourself that the scheme actually

322
00:41:20,500 --> 00:41:26,340
provides a voice to sort of a sply brain syndrome in a sense

323
00:41:26,340 --> 00:41:28,780
that there's never going to be two primaries.

324
00:41:28,780 --> 00:41:31,019
And the second thing, maybe to debate,

325
00:41:31,019 --> 00:41:33,500
is this is a reasonable design because it looks

326
00:41:33,500 --> 00:41:36,700
like what we've done is we push all the real hard part

327
00:41:36,700 --> 00:41:38,380
of the fault towns into the storage server.

328
00:41:38,380 --> 00:41:39,420
And it's not really the case.

329
00:41:39,420 --> 00:41:41,180
Where's that not the case?

330
00:41:41,180 --> 00:41:43,300
So that seems like two things I don't really

331
00:41:43,300 --> 00:41:46,099
like you to discuss in these breakout rooms.

332
00:41:46,099 --> 00:41:47,380
So I'm going to stop the sharing.

333
00:41:51,220 --> 00:41:56,220
And I'm going to participate.

334
00:41:56,220 --> 00:41:59,700
And I'm going to make Lily host so that she

335
00:41:59,700 --> 00:42:05,820
can set up the breakout rooms and enjoy talking to each other.

336
00:42:08,380 --> 00:42:09,220
Lily, you got this?

337
00:42:09,220 --> 00:42:10,820
I'm going to control.

338
00:42:38,380 --> 00:42:40,380
I'm going to start with the first one.

339
00:42:40,380 --> 00:42:42,380
I'm going to start with the first one.

340
00:42:42,380 --> 00:42:44,380
I'm going to start with the first one.

341
00:42:44,380 --> 00:42:46,380
I'm going to start with the first one.

342
00:42:46,380 --> 00:42:48,380
I'm going to start with the first one.

343
00:42:48,380 --> 00:42:50,380
I'm going to start with the first one.

344
00:42:50,380 --> 00:42:52,380
I'm going to start with the first one.

345
00:42:52,380 --> 00:42:54,380
I'm going to start with the first one.

346
00:42:54,380 --> 00:42:56,380
I'm going to start with the first one.

347
00:42:56,380 --> 00:42:58,380
I'm going to start with the first one.

348
00:42:58,380 --> 00:43:00,380
I'm going to start with the first one.

349
00:43:00,380 --> 00:43:02,380
I'm going to start with the first one.

350
00:43:02,380 --> 00:43:04,380
I'm going to start with the first one.

351
00:43:04,380 --> 00:43:06,380
I'm going to start with the first one.

352
00:43:06,380 --> 00:43:08,380
I'm going to start with the first one.

353
00:43:08,380 --> 00:43:10,380
I'm going to start with the first one.

354
00:43:10,380 --> 00:43:12,380
I'm going to start with the first one.

355
00:43:12,380 --> 00:43:14,380
I'm going to start with the first one.

356
00:43:14,380 --> 00:43:16,380
I'm going to start with the first one.

357
00:43:16,380 --> 00:43:18,380
I'm going to start with the first one.

358
00:43:18,380 --> 00:43:20,380
I'm going to start with the first one.

359
00:43:20,380 --> 00:43:22,380
I'm going to start with the first one.

360
00:43:22,380 --> 00:43:24,380
I'm going to start with the first one.

361
00:43:24,380 --> 00:43:26,380
I'm going to start with the first one.

362
00:43:26,380 --> 00:43:28,380
I'm going to start with the first one.

363
00:43:28,380 --> 00:43:30,380
I'm going to start with the first one.

364
00:43:30,380 --> 00:43:32,380
I'm going to start with the first one.

365
00:43:32,380 --> 00:43:34,380
I'm going to start with the first one.

366
00:43:34,380 --> 00:43:36,380
I'm going to start with the first one.

367
00:43:36,380 --> 00:43:38,380
I'm going to start with the first one.

368
00:43:38,380 --> 00:43:40,380
I'm going to start with the first one.

369
00:43:40,380 --> 00:43:42,380
I'm going to start with the first one.

370
00:43:42,380 --> 00:43:44,380
I'm going to start with the first one.

371
00:43:44,380 --> 00:43:46,380
I'm going to start with the first one.

372
00:43:46,380 --> 00:43:48,380
I'm going to start with the first one.

373
00:43:48,380 --> 00:43:50,380
I'm going to start with the first one.

374
00:43:50,380 --> 00:43:52,380
I'm going to start with the first one.

375
00:43:52,380 --> 00:43:54,380
I'm going to start with the first one.

376
00:43:54,380 --> 00:43:56,380
I'm going to start with the first one.

377
00:43:56,380 --> 00:43:58,380
I'm going to start with the first one.

378
00:43:58,380 --> 00:44:00,380
I'm going to start with the first one.

379
00:44:00,380 --> 00:44:02,380
I'm going to start with the first one.

380
00:44:02,380 --> 00:44:04,380
I'm going to start with the first one.

381
00:44:04,380 --> 00:44:06,380
I'm going to start with the first one.

382
00:44:06,380 --> 00:44:08,380
I'm going to start with the first one.

383
00:44:08,380 --> 00:44:10,380
I'm going to start with the first one.

384
00:44:10,380 --> 00:44:12,380
I'm going to start with the first one.

385
00:44:12,380 --> 00:44:14,380
I'm going to start with the first one.

386
00:44:14,380 --> 00:44:16,380
I'm going to start with the first one.

387
00:44:16,380 --> 00:44:18,380
I'm going to start with the first one.

388
00:44:18,380 --> 00:44:20,380
I'm going to start with the first one.

389
00:44:20,380 --> 00:44:22,380
I'm going to start with the first one.

390
00:44:22,380 --> 00:44:24,380
I'm going to start with the first one.

391
00:44:24,380 --> 00:44:26,380
I'm going to start with the first one.

392
00:44:26,380 --> 00:44:28,380
I'm going to start with the first one.

393
00:44:28,380 --> 00:44:30,380
I'm going to start with the first one.

394
00:44:30,380 --> 00:44:32,380
I'm going to start with the first one.

395
00:44:32,380 --> 00:44:34,380
I'm going to start with the first one.

396
00:44:34,380 --> 00:44:36,380
I'm going to start with the first one.

397
00:44:36,380 --> 00:44:38,380
I'm going to start with the first one.

398
00:44:38,380 --> 00:44:40,380
I'm going to start with the first one.

399
00:44:40,380 --> 00:44:42,380
I'm going to start with the first one.

400
00:44:42,380 --> 00:44:44,380
I'm going to start with the first one.

401
00:44:44,380 --> 00:44:46,380
I'm going to start with the first one.

402
00:44:46,380 --> 00:44:48,380
I'm going to start with the first one.

403
00:44:48,380 --> 00:44:50,380
I'm going to start with the first one.

404
00:44:50,380 --> 00:44:52,380
I'm going to start with the first one.

405
00:44:52,380 --> 00:44:54,380
I'm going to start with the first one.

406
00:44:54,380 --> 00:44:56,380
I'm going to start with the first one.

407
00:44:56,380 --> 00:44:58,380
I'm going to start with the first one.

408
00:44:58,380 --> 00:45:00,380
I'm going to start with the first one.

409
00:45:00,380 --> 00:45:02,380
I'm going to start with the first one.

410
00:45:02,380 --> 00:45:04,380
I'm going to start with the first one.

411
00:45:04,380 --> 00:45:06,380
I'm going to start with the first one.

412
00:45:06,380 --> 00:45:08,380
I'm going to start with the first one.

413
00:45:08,380 --> 00:45:10,380
I'm going to start with the first one.

414
00:45:10,380 --> 00:45:12,380
I'm going to start with the first one.

415
00:45:12,380 --> 00:45:14,380
I'm going to start with the first one.

416
00:45:14,380 --> 00:45:16,380
I'm going to start with the first one.

417
00:45:16,380 --> 00:45:18,380
I'm going to start with the first one.

418
00:45:18,380 --> 00:45:20,380
I'm going to start with the first one.

419
00:45:20,380 --> 00:45:22,380
I'm going to start with the first one.

420
00:45:22,380 --> 00:45:24,380
I'm going to start with the first one.

421
00:45:24,380 --> 00:45:26,380
I'm going to start with the first one.

422
00:45:26,380 --> 00:45:28,380
I'm going to start with the first one.

423
00:45:28,380 --> 00:45:30,380
I'm going to start with the first one.

424
00:45:30,380 --> 00:45:32,380
I'm going to start with the first one.

425
00:45:32,380 --> 00:45:34,380
I'm going to start with the first one.

426
00:45:34,380 --> 00:45:36,380
I'm going to start with the first one.

427
00:45:36,380 --> 00:45:38,380
I'm going to start with the first one.

428
00:45:38,380 --> 00:45:40,380
I'm going to start with the first one.

429
00:45:40,380 --> 00:45:42,380
I'm going to start with the first one.

430
00:45:42,380 --> 00:45:44,380
I'm going to start with the first one.

431
00:45:44,380 --> 00:45:46,380
I'm going to start with the first one.

432
00:45:46,380 --> 00:45:48,380
I'm going to start with the first one.

433
00:45:48,380 --> 00:45:50,380
I'm going to start with the first one.

434
00:45:50,380 --> 00:45:52,380
I'm going to start with the first one.

435
00:45:52,380 --> 00:45:54,380
I'm going to start with the first one.

436
00:45:54,380 --> 00:46:10,380
up.

437
00:46:10,380 --> 00:46:20,380
Up.

438
00:46:20,380 --> 00:46:22,380
and not enjoying a different room this time.

439
00:46:27,980 --> 00:46:29,980
It's not looking good though.

440
00:46:50,380 --> 00:47:06,380
I guess I'm stuck here.

441
00:48:20,380 --> 00:48:24,380
I'm not sure if I'm going to be able to get out of here.

442
00:48:24,380 --> 00:48:28,380
I'm not sure if I'm going to be able to get out of here.

443
00:48:28,380 --> 00:48:32,380
I'm not sure if I'm going to be able to get out of here.

444
00:48:32,380 --> 00:48:36,380
I'm not sure if I'm going to be able to get out of here.

445
00:48:36,380 --> 00:48:40,380
I'm not sure if I'm going to be able to get out of here.

446
00:48:40,380 --> 00:48:44,380
I'm not sure if I'm going to be able to get out of here.

447
00:48:44,380 --> 00:48:48,380
I'm not sure if I'm going to be able to get out of here.

448
00:48:48,380 --> 00:48:52,380
I'm not sure if I'm going to be able to get out of here.

449
00:48:52,380 --> 00:48:56,380
I'm not sure if I'm going to be able to get out of here.

450
00:48:56,380 --> 00:49:00,380
I'm not sure if I'm going to be able to get out of here.

451
00:49:00,380 --> 00:49:04,380
I'm not sure if I'm going to be able to get out of here.

452
00:49:04,380 --> 00:49:08,380
I'm not sure if I'm going to be able to get out of here.

453
00:49:08,380 --> 00:49:12,380
I'm not sure if I'm going to be able to get out of here.

454
00:49:12,380 --> 00:49:16,380
I'm not sure if I'm going to be able to get out of here.

455
00:49:16,380 --> 00:49:20,380
I'm not sure if I'm going to be able to get out of here.

456
00:49:20,380 --> 00:49:24,380
I'm not sure if I'm going to be able to get out of here.

457
00:49:24,380 --> 00:49:28,380
I'm not sure if I'm going to be able to get out of here.

458
00:49:28,380 --> 00:49:32,380
I'm not sure if I'm going to be able to get out of here.

459
00:49:32,380 --> 00:49:36,380
I'm not sure if I'm going to be able to get out of here.

460
00:49:36,380 --> 00:49:40,380
I'm not sure if I'm going to be able to get out of here.

461
00:49:40,380 --> 00:49:44,380
I'm not sure if I'm going to be able to get out of here.

462
00:49:44,380 --> 00:49:48,380
I'm not sure if I'm going to be able to get out of here.

463
00:49:48,380 --> 00:49:52,380
It's too colorful.

464
00:49:52,380 --> 00:49:56,380
It's too colorful.

465
00:49:56,380 --> 00:50:00,380
The screen again.

466
00:50:00,380 --> 00:50:04,380
Can everyone get more screen?

467
00:50:04,380 --> 00:50:08,380
Yes.

468
00:50:08,380 --> 00:50:10,380
Okay. Good.

469
00:50:10,380 --> 00:50:16,460
you had a good discussion and hopefully that's some more new students in the class than they knew

470
00:50:16,460 --> 00:50:28,380
before. And let's sort of proceed talking a little bit about the design of the Mpt and it's like

471
00:50:28,380 --> 00:50:34,140
summarized quickly, you know, this. Could you repeat like when the flag is reset to zero? I feel

472
00:50:34,139 --> 00:50:40,460
like some of us might have missed explanation. Okay. Okay, so okay, good, good, good, good. Okay, so let

473
00:50:40,460 --> 00:50:46,539
the, okay, so here let's draw the picture again. And that's sort of simpler way. Here's our primary

474
00:50:46,539 --> 00:50:51,900
with the VM, everything in it. Here's the backup with the everything in it, you know, and just

475
00:50:51,900 --> 00:50:57,339
log in channel in between, connected, you know, to a storage server. And you know, one thing to think

476
00:50:57,339 --> 00:51:02,779
about is that the storage server is doing playing tool rolls. So let's separate the two roles. One is

477
00:51:02,780 --> 00:51:07,100
just going to storage, you know, for, you know, a disk basically for, you know, the primary and the

478
00:51:07,100 --> 00:51:12,620
backup, and then we can just split that and just attach the disk to the primary and backup. And then

479
00:51:12,620 --> 00:51:15,980
we're basically have the role here is really the arbitration server.

480
00:51:20,460 --> 00:51:27,500
And it has a flag. And the flag was initially zero, right? And so now, let's say there's a,

481
00:51:28,300 --> 00:51:33,579
a petition of primary backup can actually not talk to the, to each other anymore. So they're going

482
00:51:33,579 --> 00:51:37,900
to talk to the arbitration server basically to try to promote themselves through the single,

483
00:51:38,940 --> 00:51:44,219
to go live and sort of be the single server, the service, the client request. So they both sent the

484
00:51:44,219 --> 00:51:48,860
backup to the test to set operation. One gets a zero back, you got one gets a one back,

485
00:51:48,860 --> 00:51:52,780
the one gets a one back knows that it was actually the second to try it. And then,

486
00:51:53,740 --> 00:51:57,900
and so the first one will succeed and will go live. So let's say this guy goes live,

487
00:51:58,700 --> 00:52:05,420
and this guy just, you know, disappears. This virtual machine is terminates itself and is done.

488
00:52:06,860 --> 00:52:13,900
And so another flag is set to one. And of course, now at this point, there's no arbitration and

489
00:52:13,900 --> 00:52:18,380
necessary anymore because there's no secondary replica. There's no backup at all. So really,

490
00:52:18,380 --> 00:52:22,860
the question is like, you know, what happens next? And in terms of repair, it has to be decays

491
00:52:22,860 --> 00:52:27,820
that the second backup and new backup is brought up to a life, right? And this section 3-1 at the

492
00:52:27,820 --> 00:52:33,180
paper talks about this in quite a bit of detail. And the way it works is that, you know, on the

493
00:52:33,180 --> 00:52:37,900
user interface, you know, through the system, you know, VMware motion, you basically say like,

494
00:52:37,900 --> 00:52:46,539
hey, I want to clone this primary. And the cloning operation basically will, we all basically

495
00:52:46,539 --> 00:52:52,779
stop processing client here. You're including the primary wound X and you're the one system still

496
00:52:52,779 --> 00:53:01,420
running. One X and 0 of any client request. The, the, the, the emotion thing makes an VM clone.

497
00:53:01,420 --> 00:53:06,460
And basically copies, you know, the state of this VM up to the backup. And so here, we have an

498
00:53:06,460 --> 00:53:12,219
identical copy of the backup of the primary that becomes the backup. So this state of the

499
00:53:12,219 --> 00:53:16,779
virtual machine is identical. One thing, you know, the sort of this cloning operation has happened.

500
00:53:17,339 --> 00:53:22,699
Then it's free, you know, the user interface is free to set the action this guy back to 0-2.

501
00:53:24,379 --> 00:53:29,339
Client requests are still not being processed. When that has happened, then the system can go

502
00:53:29,339 --> 00:53:34,619
sort of live again. But now with two machines, with the primary and backup, and the client requests

503
00:53:34,619 --> 00:53:38,379
are being processed, you know, they're sent over the channel, et cetera, et cetera. So we're back in

504
00:53:38,380 --> 00:53:52,140
business. Is that answered a question? I hope it does. If not, I'm happy to revisit this actually

505
00:53:52,140 --> 00:54:00,220
at the end of the lecture if they're still confusing. Okay, good. Okay, well, I want to go back now to

506
00:54:00,220 --> 00:54:05,019
sort of this sort of like the overall architecture graph of the system. I now want to dive into

507
00:54:05,019 --> 00:54:09,659
whether they had more and talk. You know, we have decided, I think, you know, that, you know,

508
00:54:09,659 --> 00:54:14,059
this arbitration scheme allows you to, it's for it to split brainstorm room. But, you know,

509
00:54:14,059 --> 00:54:19,259
this sort of just still there's a larger issue that if you know two machines are running, you know,

510
00:54:19,259 --> 00:54:24,619
our goal is going to be, you know, basically behave like a single machine.

511
00:54:29,900 --> 00:54:34,699
So from the client perspective, it should not be possible to really discern or at least

512
00:54:35,019 --> 00:54:38,939
in a sort of a demonstrated bad way that, you know, we actually happen to machines.

513
00:54:39,819 --> 00:54:45,099
Great. And so just to stick a step back, you know, we think at a very high level, you know,

514
00:54:45,099 --> 00:54:49,579
we have here our primary in the house, you know, like machine registers, the virtual machine,

515
00:54:50,939 --> 00:54:56,939
the other series, the memory. And our basic plan is to sort of forward, you know, make sure that

516
00:54:56,940 --> 00:54:59,260
basically execute exactly the same structures.

517
00:55:03,099 --> 00:55:09,340
Boom, boom, boom. Here's our own, here's your backup, here's your primary. And, you know,

518
00:55:09,340 --> 00:55:15,980
basically, you know, when the, you know, when the primary, so we start to mount in the same state,

519
00:55:15,980 --> 00:55:19,340
and they start executing structures, you know, so like maybe the first and structures in

520
00:55:19,340 --> 00:55:23,820
the name, second, the structures in deck, you know, through the structures of branch.

521
00:55:24,940 --> 00:55:28,700
And if they, you know, start all in the same state, correct? Then at the third

522
00:55:28,700 --> 00:55:32,380
destruction, this branch, then we'll branch into the same direction. And so, well, maybe the

523
00:55:32,380 --> 00:55:36,300
branch through some instruction and then we get on whatever, the next instructions and divide,

524
00:55:37,340 --> 00:55:41,740
et cetera, et cetera, et cetera. Now all these structures are sort of detour monistics.

525
00:55:41,740 --> 00:55:45,420
So that's pretty straightforward, right? Like if, you know, we both start at the same

526
00:55:45,980 --> 00:55:51,019
state, they execute exactly these, you know, same set of instructions in the same order,

527
00:55:51,019 --> 00:55:56,300
then we're going to end up in a state S prime. And those two states are going to be identical.

528
00:55:57,579 --> 00:56:05,099
Right? Now, the thing that is sort of the challenge in this design where like any sort of

529
00:56:05,099 --> 00:56:10,380
replication scheme is there might be sources of divergence, you know, so our goals to actually

530
00:56:10,380 --> 00:56:16,539
get them exactly to the same state S prime, but you know, there are sort of sources of divergence.

531
00:56:22,780 --> 00:56:26,619
And it's pretty good. I've just great that what those are, you know, for example, instructions

532
00:56:26,619 --> 00:56:28,700
that are non-deterministic are a problem.

533
00:56:35,340 --> 00:56:38,700
And so, what are, what's an example of a non-deterministic instruction?

534
00:56:40,460 --> 00:56:46,140
Getting the time. Yeah, getting the time. Why is that non-deterministic?

535
00:56:47,340 --> 00:56:54,300
Because the machines are not like the backup is not executing.

536
00:56:57,980 --> 00:57:03,260
Yeah, the, the, the, the, the, the, the, the, the issue here, correct, is that if, you know, the

537
00:57:03,820 --> 00:57:06,940
primary and the backup, you know, at some point they'll execute this, you know,

538
00:57:07,019 --> 00:57:11,420
get time of the instruction, it will. And they might not execute it exactly at the same time.

539
00:57:11,420 --> 00:57:14,619
So the value is returned, you know, by that instruction is going to be different.

540
00:57:15,659 --> 00:57:23,579
Right? So that's an source of non-deterministic, a potential source of divergence that we need to control.

541
00:57:24,139 --> 00:57:27,820
In fact, we basically have to turn every non-deterministic instruction into the

542
00:57:27,820 --> 00:57:31,579
inter-interinistic instruction. And we'll see you second in how this, how could that be done?

543
00:57:32,539 --> 00:57:39,420
Similarly, inputs, right? Or packet inputs. Like when the packet arrives over the network, you know, at the primary,

544
00:57:40,539 --> 00:57:45,659
you know, we got to make sure that, you know, the, that packet is executed or processed,

545
00:57:46,139 --> 00:57:51,340
or the interrupt that goes along with that packet is exactly delivered at exactly the same point in the

546
00:57:51,340 --> 00:57:56,219
instruction steam. Right? So we go back to our previous paper that they page. And like, you know, the

547
00:57:56,219 --> 00:58:01,259
backups also executing these instructions. And deck blah, blah, blah, blah, we're going to

548
00:58:01,259 --> 00:58:05,899
eject in the same order. So if the primary, for example, you know, we get the, you know, the interrupt is

549
00:58:05,899 --> 00:58:10,539
delivered between instruction one and two, we got to make sure that at the backup, it also is delivered

550
00:58:10,539 --> 00:58:15,819
between one and two. Because it's delivered exactly in the same point in the instruction stream,

551
00:58:15,819 --> 00:58:20,139
then the interrupt hand will run and will, you know, do the, they both execute the same instructions

552
00:58:20,139 --> 00:58:27,019
again. However, if, you know, example of the backup, you know, we process, you know, this timer

553
00:58:27,019 --> 00:58:30,940
interrupt, you know, where this packet arrives interrupt in a little bit later in the different side

554
00:58:30,940 --> 00:58:34,779
of the machine, then the state of the system might be different and therefore the result of that,

555
00:58:34,779 --> 00:58:39,339
you know, a competition might be different. And so we can't have that. So it has to be the case that

556
00:58:39,339 --> 00:58:44,379
it interrupts when it's packets at timers, all get delivered exactly at the same time.

557
00:58:45,180 --> 00:58:51,740
The same put in the instruction stream. So input packets or timer interrupts.

558
00:58:56,380 --> 00:58:59,180
We need to basically be delivered at the same point in the instruction stream.

559
00:59:02,780 --> 00:59:07,980
So those are sources of divergence that we need to handle. Any other sources of divergence that

560
00:59:08,860 --> 00:59:15,340
I think it was mentioned in the paper that concurrency also can produce non-determinism.

561
00:59:15,340 --> 00:59:20,139
But from my understanding here, since the hypervisor actually controls the interrupts and since we

562
00:59:20,139 --> 00:59:26,539
have a unique processor, wouldn't the thread switch be conducted through the hypervisor by interrupts?

563
00:59:26,539 --> 00:59:33,179
So if we control the interrupts and we can transmit them exactly at the right location, wouldn't we also

564
00:59:33,179 --> 00:59:38,379
control the non-determinism for concurrency? Yeah, so I think there's a great oxidation. So let me,

565
00:59:38,379 --> 00:59:42,299
it's a potential devoid. Okay, so first of all, let's first agree that it's a potential source of

566
00:59:44,219 --> 00:59:53,099
divergence. So multi-core. And let's say, you know, and basically the way the solution in this

567
00:59:53,099 --> 00:59:56,460
particular paper, if you avoid this problem is to say like, well, just disallow.

568
00:59:56,699 --> 01:00:04,380
We're not allowed to have that. And so just only unit processor. Let's say we had multi-core and

569
01:00:04,380 --> 01:00:09,179
you know, just to make sure that we understand what the issue is, the issue here is correct, we have

570
01:00:09,179 --> 01:00:15,179
two threads running on the same processor from them, different cores. And they erase, for

571
01:00:15,179 --> 01:00:20,699
example, the grab a lock. And one of them is going to win. And so that that's the front that's

572
01:00:20,699 --> 01:00:24,860
going to run next. And the other one is going to be stopped for a little while. If we want to do

573
01:00:24,860 --> 01:00:28,539
this replicated state machine approach at the back of the same thing, we'd have to have happen,

574
01:00:28,539 --> 01:00:33,740
right? Where if the two threads run, you know, erase for that lock at the same time, then we got to

575
01:00:33,740 --> 01:00:38,940
be arranged that the whatever winner on the primary is also the winner in the back up. And so that

576
01:00:38,940 --> 01:00:44,380
requires a whole bunch of machinery that, you know, additional machinery of complexities that

577
01:00:44,380 --> 01:00:48,460
the, you know, the paper clearly didn't want to address or didn't know how to address. And basically

578
01:00:48,460 --> 01:00:52,620
just said like, okay, well, it's just going to exclude that possibility of divergence. But just

579
01:00:52,619 --> 01:00:57,179
declaring that the processor is a unit processor. And so then in Fred switching and all the kind of

580
01:00:57,179 --> 01:01:00,779
stuff doesn't matter anymore. There's always one, you know, computation running on the computer on

581
01:01:00,779 --> 01:01:05,259
the processor. And it will switch, you know, if the primary switch is doing different thread,

582
01:01:05,259 --> 01:01:08,779
the back of the switch also to the same thing different thread because it's like a single

583
01:01:08,779 --> 01:01:12,380
instruction state. And they get their external inputs exactly at the same time.

584
01:01:15,500 --> 01:01:20,059
Does that make sense? So in some ways, it's a little bit lame, you know, they're just give up on

585
01:01:20,059 --> 01:01:27,900
multi-core. And as I mentioned, later systems, in the more recent systems of this product,

586
01:01:27,900 --> 01:01:33,579
do handle multi-core. And, you know, and I don't know when I'm talking to you. I don't really

587
01:01:33,579 --> 01:01:37,659
actually understand exactly how they do it. There's a potential difference, potential different

588
01:01:37,659 --> 01:01:43,179
schemes that you can think of doing. Now, people have done multi-core replay, which is really

589
01:01:43,179 --> 01:01:47,099
what's the thing that is necessary. And so, but I don't really know exactly. So I'm not going to talk

590
01:01:47,179 --> 01:01:50,860
about that at all. I'm just going to talk about that focusing on the first three items.

591
01:01:52,139 --> 01:01:53,819
And see how they handle it in this case.

592
01:01:58,299 --> 01:01:59,900
Okay. Any questions?

593
01:02:02,699 --> 01:02:11,019
Oh, sorry, just to make sure it only transmits the instructions that the application makes,

594
01:02:11,099 --> 01:02:16,059
right? It doesn't transmit the instructions that place makes.

595
01:02:16,940 --> 01:02:23,739
I certainly use an interesting, we'll see in a second, but let me make that more clear right away.

596
01:02:25,259 --> 01:02:30,059
The, in fact, these instructors in Kentucky and Decker Branch are not sent to the primary back of

597
01:02:30,059 --> 01:02:33,340
at all. They basically have their own copy, correct? And we're just starting them at the same

598
01:02:33,340 --> 01:02:37,420
point in the program. And so therefore, they run exactly in the sort of lockstep almost,

599
01:02:37,420 --> 01:02:41,019
people up, they know what are in the lockstep, but they actually get them in the same order.

600
01:02:41,820 --> 01:02:46,139
Only some special has to happen at these points of the verge, possible divergence.

601
01:02:47,099 --> 01:02:50,460
And the assumption that sort of the paper makes is that these are most instructions

602
01:02:50,460 --> 01:02:54,059
of Decker monistics, so we don't really have to do anything. And it's only if the instruction

603
01:02:54,059 --> 01:02:58,300
for things to go potentially go wrong, we have to do something. And so one of those sorts of

604
01:02:58,300 --> 01:03:03,019
where something goes wrong is interrupts. So let's talk a little bit about interrupts.

605
01:03:07,900 --> 01:03:17,340
So here, it really makes the virtual machine sort of comes to rescue and really helps

606
01:03:17,340 --> 01:03:21,099
you know, solve this problem. So let's say here we have our hypervisor.

607
01:03:23,500 --> 01:03:27,740
An interrupt happens that the interrupt will show up at the hypervisor.

608
01:03:28,860 --> 01:03:35,420
And the hypervisor knows exactly at which instruction the application was, or the VM was at this

609
01:03:35,420 --> 01:03:41,099
level. So here, Linux is running inside of this VM. The interrupt happens. Of course, the

610
01:03:44,139 --> 01:03:49,340
the hypervisor already has taken over control. And it knows where it stopped, you know, Linux actually

611
01:03:49,340 --> 01:03:54,619
take the interrupts. So maybe you know, whatever it took it is, it has executed a hundred instructions

612
01:03:54,619 --> 01:04:02,220
so far. And then this interrupt comes in and the hypervisor now wants to deliver that interrupt,

613
01:04:02,219 --> 01:04:06,299
basically at the instruction hundred. And before doing that, actually, it just sends over the

614
01:04:06,299 --> 01:04:14,699
logging channel a message to the backup. Here's the backup, FT, and in that message it basically says

615
01:04:14,699 --> 01:04:19,500
like, okay, add instruction hundred. You know, when you get to the instruction hundred, you know,

616
01:04:19,500 --> 01:04:23,179
deliver this interrupt. And you know, maybe some data that's associated with the interrupt.

617
01:04:24,619 --> 01:04:28,219
Right, so this does two things. The interrupt comes in, sees what the instruction number was,

618
01:04:28,219 --> 01:04:32,539
and then it sends the backup this message saying like, hey, you know, at some point, when you get to

619
01:04:32,539 --> 01:04:38,139
an extra hundred, you know, process, you know, this interrupt. And you know, some point later,

620
01:04:38,139 --> 01:04:44,379
you know, this interrupt one, and interrupt two comes in. And so, you know, the hypervisor does exactly

621
01:04:44,379 --> 01:04:52,139
the same thing. Again, we'll send all that, say, this is at the instruction 200. You know, we send

622
01:04:52,139 --> 01:04:56,459
the message 200 interrupt, you know, get perhaps for any data associated with the interrupt, you know,

623
01:04:56,460 --> 01:05:05,820
to the FT. So when, you know, the backup gets the first message, it just bovers the message.

624
01:05:07,019 --> 01:05:12,699
Because it doesn't know how long it can run after that message until it knows what the next point is

625
01:05:12,699 --> 01:05:17,260
that it has to deliver something. So at the point that the second message comes in, you know, for the

626
01:05:17,260 --> 01:05:22,539
second interrupt, it knows, you know, it's perfectly fine to start the computer at instruction

627
01:05:22,539 --> 01:05:26,699
100, deliver the interrupt, and basically keep running until instruction 200.

628
01:05:28,219 --> 01:05:32,699
And the way it does it is there's basically most processes have this, but x86 has this too,

629
01:05:32,699 --> 01:05:37,099
where you can basically program the x86 and say like, well, you should stop after executing

630
01:05:37,099 --> 01:05:41,980
your hundred instructions. And so the process will stop or executing after hundred instructions

631
01:05:41,980 --> 01:05:46,460
and it's give back the role to the operating system, in this case, the virtual machine monitor.

632
01:05:47,420 --> 01:05:54,699
And so, you know, and so this is the scheme, this is the scheme that the, the MFT uses to basically,

633
01:05:54,699 --> 01:06:00,139
you know, deliver interrupts both at the primary and the backup exactly at the same instruction,

634
01:06:00,139 --> 01:06:04,780
so that they sort of stay in this and exactly execute the instructions in exactly the same order.

635
01:06:06,139 --> 01:06:10,139
To arrange this, of course, you know, the backup needs to lag next behind one,

636
01:06:10,139 --> 01:06:14,699
then, next behind one message.

637
01:06:20,059 --> 01:06:20,299
Okay.

638
01:06:23,980 --> 01:06:28,699
So just to be clear, so the deterministic operations don't get communicated through the

639
01:06:28,699 --> 01:06:33,500
log-in channel. It's only the operations that perhaps might diverge.

640
01:06:34,059 --> 01:06:37,819
Exactly. You've got it. That's exactly what it does. So let's look at one more,

641
01:06:37,820 --> 01:06:41,820
you know, just to get the flavor, then we'll talk about it. Yeah, go ahead.

642
01:06:41,820 --> 01:06:48,059
Sorry. So deterministic operations, you said, don't get communicated through the log-in channel.

643
01:06:48,059 --> 01:06:53,019
Nope. There's no need for them because, you know, because both of them, of course, have a copy of

644
01:06:53,019 --> 01:06:57,660
all the instructions of like the binary that like whatever Linux runs, correct? But, you know,

645
01:06:57,660 --> 01:07:01,580
the instructions are not communicated to over the logging channels. It's only the numbed-in-derministic

646
01:07:01,580 --> 01:07:06,300
watch. So like this interrupt, and we'll see you in a second. You know, let's talk about the

647
01:07:06,300 --> 01:07:13,260
second one, numbed-in-derministic instructions. Like, you know, get the time, or get time of day.

648
01:07:14,140 --> 01:07:20,060
So the way that works is, so years we got our Linux running in the VM. You know, we got our

649
01:07:20,060 --> 01:07:27,180
FT running. And basically when, you know, this Linux, you know, use sort of the image, you know,

650
01:07:27,180 --> 01:07:32,700
the program image that Linux runs. And maybe, you know, years are numbed-in-derministic instructions.

651
01:07:32,859 --> 01:07:40,939
And basically what FT has done before it started Linux, it sort of gone through like the Linux binary

652
01:07:40,939 --> 01:07:45,179
and found all the instructions that the numbed-in-derministic like, you know, get time of day. And

653
01:07:45,179 --> 01:07:51,500
basically ensure, you know, turn them in sort of an invalid instruction. And so when Linux executes

654
01:07:51,500 --> 01:07:57,099
that numbed-in-derministic instruction, it actually controls transfers control through the hypervisor.

655
01:07:57,819 --> 01:08:03,259
This is the trap. And now the hypervisor knows, okay, well, this is, you know, whatever instruction

656
01:08:03,259 --> 01:08:09,179
free of 141. I know that is a numbed-in-derministic instruction because I wrote, you know, those bits,

657
01:08:09,179 --> 01:08:15,179
you know, that cost the trap. And it will emulate, you know, that instruction. And so it will do all

658
01:08:15,179 --> 01:08:20,619
the effects that that instruction has, but record what the results of this effects are. So, for example,

659
01:08:20,619 --> 01:08:25,100
you know, whatever, and we record what the result, you know, executes instruction, the result says

660
01:08:25,100 --> 01:08:32,220
it goes into A0, it records the valid to A0, and then basically sends to the backup, you know,

661
01:08:32,220 --> 01:08:37,020
the outcome, you know, of that instruction. So whatever it is like, it's the value in A0, we ask,

662
01:08:37,020 --> 01:08:41,660
you know, whatever, 221, then it will, you know, send back, you know, saying, you know, there's

663
01:08:41,660 --> 01:08:48,460
numbed-in-derministic instruction. The result of it is, you know, 221. And at some point, correct,

664
01:08:48,460 --> 01:08:54,380
you know, it's in the backup lags behind, it will, you know, execute because it's executing

665
01:08:54,380 --> 01:08:59,180
the instructions in the same order in the same way. It will also execute the numbed-in-derministic

666
01:08:59,180 --> 01:09:04,940
instruction. That will trap into the kernel. And now you just will wait until, you know, since it

667
01:09:04,940 --> 01:09:09,180
likes behind it already has received probably the message. And basically, you make sure that, you

668
01:09:09,180 --> 01:09:13,500
know, it sticks the same value, you know, or returns the same value as it did on the primary.

669
01:09:14,380 --> 01:09:17,180
Right? So this is how non-deterministic instructions are handled.

670
01:09:17,340 --> 01:09:29,180
Sorry. So that happens, like, the modification of the binary, it happens when it creates the

671
01:09:30,860 --> 01:09:34,460
Yeah, we think about it, then, when it boots to the end. Okay.

672
01:09:35,579 --> 01:09:44,539
So the backup reexecutes the non-deterministic instruction and then just verifies the result?

673
01:09:44,539 --> 01:09:50,140
No, what it actually does is if the virtual machine miner executes the instruction,

674
01:09:51,019 --> 01:09:55,420
and then, you know, actually, the virtual machine miner doesn't execute the instruction at all,

675
01:09:56,619 --> 01:10:01,260
it knows that this instruction needs to be executed, and it knows what things will be changed,

676
01:10:01,260 --> 01:10:06,619
like what registers need to be updated as a result of this instruction, and it sticks the value

677
01:10:06,619 --> 01:10:11,819
from the message into the right register so that the, you know, the lineage running on the backup

678
01:10:11,819 --> 01:10:15,579
sees exactly the same effect as the, the, the Linux running on the primary.

679
01:10:20,460 --> 01:10:23,899
And so like this assumes that the hypervisor will do some work before even,

680
01:10:24,699 --> 01:10:28,619
or while booting up to the, just to move where the locations of the non-deterministic.

681
01:10:28,619 --> 01:10:31,019
Yeah, yeah, yeah, yeah, we try any hypervisor dust in these days.

682
01:10:32,779 --> 01:10:36,539
So this is our standard hypervisor stuff. This is nothing new to FT,

683
01:10:37,500 --> 01:10:41,340
other than these guys at the tunnel who are the scares doing hypervisor stuff because it's being

684
01:10:41,340 --> 01:10:47,579
anywhere, and so they understand what it takes and which instructions are non-deterministic.

685
01:10:51,420 --> 01:11:01,579
Okay, I had one more question. So if, you know, it's a program of fully like deterministic instructions,

686
01:11:02,539 --> 01:11:06,859
could, could the backup run faster than the primary?

687
01:11:09,260 --> 01:11:12,699
Okay, so, you know, there's a whole discussion in the paper about like the speed of the primary

688
01:11:12,699 --> 01:11:16,059
and the backup and making sure that they run the roughly at the same speed because you know,

689
01:11:16,059 --> 01:11:21,340
want to get one far ahead and one not far behind. I think you should think about them,

690
01:11:21,340 --> 01:11:24,699
they're running on a sort of identical hardware and so they run roughly at the same speed.

691
01:11:25,579 --> 01:11:31,260
It's also the case that there's going to be always some communication over this channel.

692
01:11:32,380 --> 01:11:37,180
Because interrupts are happened periodically, right? Every, you know, whatever, you know,

693
01:11:37,899 --> 01:11:42,220
couple milliseconds, you're maybe 100 milliseconds or tens of milliseconds depending on what

694
01:11:42,220 --> 01:11:46,699
Linux and what RAID Linux program to hardware timer, there will be a timer interrupt.

695
01:11:46,699 --> 01:11:51,100
And a timer interrupt will be propagated, you know, to the backup and sort of be a sync point.

696
01:11:53,659 --> 01:11:59,579
Right, but my question is like, for example, say you have a bunch of like deterministic

697
01:11:59,579 --> 01:12:02,779
instructions, right? Instructions that aren't sent through the login channel.

698
01:12:04,380 --> 01:12:10,300
Which means, you know, the primary and backup can run those instructions at their own pace.

699
01:12:10,300 --> 01:12:15,500
Correct? Yes. So, say, I mean, I don't know if this could happen, but say like,

700
01:12:16,619 --> 01:12:26,220
it's, you know, 100 instructions and the primary goes to like instruction 50 and gets a timer interrupt.

701
01:12:27,100 --> 01:12:31,500
But the backup is already a timer like 60 or something. Could that like...

702
01:12:31,500 --> 01:12:35,820
No, could not happen, great, because remember, the backup legs behind one of these messages.

703
01:12:38,220 --> 01:12:42,460
So the backup won't start executing the next block until the primary RAID has finished it.

704
01:12:43,020 --> 01:12:43,340
Okay.

705
01:12:44,300 --> 01:12:46,860
Now this is why this is why the legs behind one.

706
01:12:46,859 --> 01:12:47,899
Mm-hmm.

707
01:12:51,420 --> 01:12:56,299
Like to ensure that the backup is like lagging behind one instruction, does that mean...

708
01:12:56,299 --> 01:12:59,019
No, not one instruction, more message on the channel.

709
01:13:00,219 --> 01:13:05,420
But the internet is unexpected, right? So if we have, as you say, if you have 100 lines of instructions

710
01:13:06,139 --> 01:13:09,579
and running on the backup as well as on the primary, then...

711
01:13:09,579 --> 01:13:13,739
The primary route in the backup would not have started yet, right? So the primary runs the

712
01:13:13,739 --> 01:13:20,139
100 instructions. The backup actually waits until the primary has just completed,

713
01:13:20,139 --> 01:13:24,139
you know, whatever those 100 instructions before it starts running those 100 instructions.

714
01:13:25,500 --> 01:13:28,859
So just one way to think about it is like always runs like one F-Fuck behind.

715
01:13:29,340 --> 01:13:32,380
Oh, so it's kind of a batching kind of scheme.

716
01:13:32,380 --> 01:13:33,819
Yep. All right, thank you.

717
01:13:34,779 --> 01:13:37,500
Okay, so I want to talk a little bit about failover because there's a lot of

718
01:13:37,500 --> 01:13:42,219
the couple interesting... there's one more rule that needs to be insured that we actually get the

719
01:13:42,220 --> 01:13:48,780
right behavior. And so... so let's walk through some scenarios. Here's the primary. Here's our

720
01:13:48,780 --> 01:13:57,820
hypervisor, right? F-T. Here's our lagging channel. F-T, the boasts it in the network. Here's a client.

721
01:13:59,500 --> 01:14:06,140
And here's our backup. And I'm going to talk about a couple of all sort of scenarios.

722
01:14:06,860 --> 01:14:15,980
So the first scenario is the normal case. You're a client, you know, sends a message to the primary,

723
01:14:15,980 --> 01:14:21,500
or like the server is running on the primary. That's delivered, of course. To the primary, it's also

724
01:14:21,500 --> 01:14:29,180
sent to the channel. And let's assume for a second that actually the message arrives at the

725
01:14:30,140 --> 01:14:33,980
hypervisor. So it actually knows that there's also an interrupt and some packets arrived.

726
01:14:34,139 --> 01:14:43,179
And so now let's say the primary sensor responds back in that point to the computer crashes.

727
01:14:44,859 --> 01:14:49,979
So if the primary fails, the client has not gotten response yet. Now this turns out to work out

728
01:14:49,979 --> 01:14:55,579
perfectly fine, right? Because before the backup XM takes over, it first processes all its

729
01:14:57,419 --> 01:15:01,099
messages that hasn't received yet because the lag's one behind, you know, as we've talked before.

730
01:15:01,579 --> 01:15:06,620
So, you know, this thing will be delivered. So it will, sorry.

731
01:15:12,539 --> 01:15:18,220
Okay, let me be a little bit more careful. Okay, so it gets delivered to the primary backup does it,

732
01:15:18,220 --> 01:15:23,500
but it actually won't send any response. Because it still sort of, you know, doing exactly what

733
01:15:23,500 --> 01:15:28,460
the primary has done, you know, gets through that particular point and stops. Then point, you know,

734
01:15:28,460 --> 01:15:32,939
they raise, you know, or like the backup XM comes to primary, you know, from the arbitration server.

735
01:15:32,939 --> 01:15:37,500
And the client will just time out and retry, right? Because like TCP packet them, get a response,

736
01:15:37,500 --> 01:15:45,020
so the retry. So that's been more try perfect. The interesting case is what happens in the

737
01:15:45,020 --> 01:15:52,380
following scenario where the client sends the request, it becomes arrives at the primary,

738
01:15:52,380 --> 01:15:57,420
the primary, uh, dust the operation or whatever process the client request sends the message to the

739
01:15:57,420 --> 01:16:03,340
fault tunnel server. In the meantime, okay, it was also sent on the logging channel, but let's say

740
01:16:03,340 --> 01:16:09,020
we got unlucky. The message is actually never made it over the logging channel. And, um,

741
01:16:13,659 --> 01:16:21,180
but the primary actually, you know, sends a response before, um, just sends a response and then it fails.

742
01:16:21,659 --> 01:16:26,700
Right? And so, for example, like maybe, you know, this request was like increased, you know,

743
01:16:26,700 --> 01:16:33,740
the variable from 10, you know, to a lot. So ink, you know, the old state was 10, and now the new state is 11.

744
01:16:36,140 --> 01:16:40,460
Right? And is this problematic? The scenario?

745
01:16:41,820 --> 01:16:49,980
Um, yeah, because when the backup takes over, it won't, uh, know about that increase, um,

746
01:16:50,619 --> 01:16:56,619
and so it'll just continue execution as if it didn't happen, and this provides, um, like,

747
01:16:56,619 --> 01:17:02,379
inconsistent, uh, output to the external, um, like, facing world, I guess.

748
01:17:02,379 --> 01:17:06,139
Yeah, exactly. Right? Because the primary will take over, the backup will take over the value,

749
01:17:06,139 --> 01:17:10,939
we still we 10, uh, and now if the client does an ink, it can actually, uh,

750
01:17:10,939 --> 01:17:16,539
gets 11 back instead of 10 over instead of 12. Right? And so this is no good. And so how is this

751
01:17:16,539 --> 01:17:24,619
avoided? Is problem? Um, the primary will send things to the backup and then wait for

752
01:17:24,619 --> 01:17:29,100
acknowledgement and once that, and, uh, once that acknowledgement is received, it can, uh,

753
01:17:29,979 --> 01:17:35,739
send output. Um, and it doesn't matter whether the backup actually runs the command, it just has to

754
01:17:35,739 --> 01:17:42,140
like, have it so that if it ever needs to take over as primary, it has that in its logs, and it will

755
01:17:42,140 --> 01:17:47,740
catch up before actually like becoming the primary. This is exactly right. So this is what's called

756
01:17:47,740 --> 01:17:56,140
the output rule, right? And rule is that, you know, before you can output, you got to make sure that

757
01:17:56,140 --> 01:18:01,740
the preceding messages that you were sent to the backup actually have been received by the backup.

758
01:18:02,539 --> 01:18:07,579
And so the snare that just drew out can actually not happen because, you know, at the point,

759
01:18:07,579 --> 01:18:13,500
you know, the primary wants to send the response out on the network, the FT, the primary FT,

760
01:18:13,500 --> 01:18:20,300
well, wait until this message actually has been received by the backup. And only when it receives

761
01:18:20,300 --> 01:18:28,779
an acknowledgement from the backup FT, uh, and now knows, you know, that basically the backup has,

762
01:18:29,420 --> 01:18:35,579
a copy of this input. Uh, and so whatever, you know, whatever it fails, you know, the backup will,

763
01:18:35,579 --> 01:18:40,220
you know, process that input and basically get the computer in the same status in the primary.

764
01:18:40,220 --> 01:18:46,539
So at that point, it actually saves, you know, to send out the reply. And so this is the output rule

765
01:18:46,539 --> 01:18:53,019
is that you don't output until all preceding messages that you send over the log channel actually

766
01:18:53,019 --> 01:19:00,220
have been received by the backup. And so just to clarify, it seems that the output rule is here to

767
01:19:00,940 --> 01:19:06,780
resolve the inconsistency that could happen if we have some non-determinism. So like, let's say that

768
01:19:06,780 --> 01:19:14,060
we have the output operation to be instruction 60. And we did not have the output rule. And so the

769
01:19:14,060 --> 01:19:21,820
backup actually did not, let's say for some reason did not receive the output operation, or it did not

770
01:19:21,820 --> 01:19:26,780
receive up until the output operation. If the instructions are deterministic between the point

771
01:19:26,779 --> 01:19:32,939
where the backup did not receive messages until the point where we have an output operation,

772
01:19:32,939 --> 01:19:37,340
do we still write into the problem of the inconsistency? Yeah, because the client might have

773
01:19:37,340 --> 01:19:41,819
reserved it, right? The client might have reserved that actually the value is 9.11.

774
01:19:43,579 --> 01:19:49,659
And so when it actually talks to the backup after the primary has failed, you know, the value is

775
01:19:49,659 --> 01:19:56,859
certainly 10. And it just can't be true. So that reveals that there's not behaving like a single

776
01:19:56,859 --> 01:20:03,819
system. It's really the external thing, you know, the external client that will adjourn something

777
01:20:03,819 --> 01:20:08,859
wrong. And this is why the output rule exists. And any repopacit system that we'll see this semester

778
01:20:08,859 --> 01:20:13,819
has something like the output rule. It turns out to be, you know, for example, we'll see in the

779
01:20:14,779 --> 01:20:21,099
even in the graph paper, but also in the zookeeper, there's sort of this notion that, you know,

780
01:20:21,099 --> 01:20:26,299
sometimes you want to like respond to reach immediately, but you can't really do that because

781
01:20:26,299 --> 01:20:30,699
you're on this risk and you're sort of sort of an equivalent of an output rule that tries to avoid,

782
01:20:30,699 --> 01:20:36,939
you know, problems like like that. So does the client

783
01:20:37,659 --> 01:20:45,419
execute the command? Like, do they get some sort of signal that because the command was never

784
01:20:45,419 --> 01:20:53,500
act by the backup? Okay, okay. So let's say you did not get the act, right? So I've got to the

785
01:20:53,500 --> 01:21:00,139
backup, but not to the act. Then the client will have not, you know, this response would have not

786
01:21:00,140 --> 01:21:06,539
resent to decline yet, right? The backup will take over, the client presumably will time out and

787
01:21:06,539 --> 01:21:11,500
do whatever it needs to do. Either, you know, does nothing, you know, if, you know, that's part of the

788
01:21:11,500 --> 01:21:15,740
there, that's part of the vertical between the servers and the client. Most likely, the client will

789
01:21:15,740 --> 01:21:22,539
reset, right? Like as a TCP connection, the response packet didn't get received, and so it will,

790
01:21:22,539 --> 01:21:29,100
you know, try to reset, and so it will reset to the backup, and then finish the operation.

791
01:21:30,460 --> 01:21:32,300
But it won't observe an old value.

792
01:21:38,460 --> 01:21:40,460
Okay.

793
01:21:50,860 --> 01:21:58,860
Okay. Now, I want to talk about one thing a little bit. So this system, I think is actually very

794
01:21:58,859 --> 01:22:06,539
cool. It's a very clean version of sort of state machine replication. It brings out this

795
01:22:06,539 --> 01:22:11,819
issues of non-determinism. The issues like the output rule that we'll see in the version of that

796
01:22:11,819 --> 01:22:18,779
we'll see in similar in other systems. But I want to talk a little bit about performance,

797
01:22:19,259 --> 01:22:26,139
because one downside of the system is, you know, because you're doing things at the level of the

798
01:22:26,140 --> 01:22:31,980
machine instructions, or like at level of interrupts, you pay performance hit.

799
01:22:33,820 --> 01:22:36,700
And so like, you want to point to the two tables that are in the paper.

800
01:22:38,380 --> 01:22:42,460
And one, you know, first thing to observe is that actually the left table is extremely good.

801
01:22:43,660 --> 01:22:48,220
So the backup and the primary, if you run the backup and primary performance, it's very close

802
01:22:48,220 --> 01:22:54,300
as if you were not running the backup, which is very, very impressive, including the fact that

803
01:22:54,300 --> 01:23:03,420
you're running a virtual machine. The more troublesome part is this side of the things where

804
01:23:04,699 --> 01:23:09,260
if you don't run in a primary backup mode, you know, like you're bandwidth and receiving and

805
01:23:09,260 --> 01:23:13,579
sending actually is pretty high, you know, at least in the particular experiment they did. But,

806
01:23:13,579 --> 01:23:17,900
you know, when you run in the backup mode, things are actually not so good. You know, these numbers

807
01:23:17,899 --> 01:23:23,739
are quite different. In fact, it's sort of like a 30% reduction in performance. And where is that

808
01:23:23,739 --> 01:23:26,139
30% coming from? Like, why is that the case?

809
01:23:34,539 --> 01:23:38,139
Is it because the primary is actually the one receiving inputs from outside?

810
01:23:39,019 --> 01:23:44,859
Yeah, I think there's two cases on the receiving case for it to probably be receiving input from

811
01:23:44,859 --> 01:23:51,259
the outside. And where does that need to go? If you see, you should pack it from the client. And so

812
01:23:51,259 --> 01:23:58,139
the packet has to be sent to the backup and through the more.

813
01:23:58,139 --> 01:24:04,539
Right, but the primary is also the one sending output back to the client. So is that what's using the

814
01:24:04,539 --> 01:24:11,420
bandwidth? Well, that's one reason, that's part of the bandwidth. But the real thing, I think it's

815
01:24:11,420 --> 01:24:18,380
the wrong here is that the primary has to wait until it can send a response to the client until

816
01:24:18,380 --> 01:24:23,500
the backup actually has acknowledged it. And so it just can't like process packet at the same

817
01:24:23,500 --> 01:24:29,500
speed as it could without actually a backup. And therefore, you know, we should have seen a reduction

818
01:24:29,500 --> 01:24:34,460
in performance. Nevertheless, this performance is pretty impressive, but, you know,

819
01:24:35,739 --> 01:24:41,100
the result performance cost. And this is one reason that people play this game of

820
01:24:41,100 --> 01:24:46,140
replicate state machines not at the instruction level, but at the application level. And you're

821
01:24:46,140 --> 01:24:50,940
basically be able to get higher performance, but that requires modification to the applications

822
01:24:50,940 --> 01:24:59,260
if we saw in GFS. Okay, I think I've run a little bit over time, so I'm going to stop right now.

823
01:25:00,060 --> 01:25:06,060
I hope people that actually needed to leave already left. But I will stick around. And so if people

824
01:25:06,060 --> 01:25:13,900
have more questions, I'll be happy to answer those. And I'll talk to you on Tuesday.

825
01:25:18,060 --> 01:25:28,300
Thank you. I had a question about the previous image that you drew with the, yeah, yeah, that one.

826
01:25:28,619 --> 01:25:37,739
I was confused because wasn't it the case that if that number 10, it just sits in the memory,

827
01:25:37,739 --> 01:25:43,980
then when we do an increment, we don't need to send anything to the backup, right?

828
01:25:45,739 --> 01:25:50,940
There are okay, so there's two things going on here. So we do at the point that the message comes in,

829
01:25:51,019 --> 01:26:00,299
like this increment comes in from the client, the rise at the FT, at the primary hypervisor,

830
01:26:01,179 --> 01:26:08,699
it needs to forward that message to the backup FT so that it can, you know, process it, it needs to be

831
01:26:08,699 --> 01:26:12,859
process, what it needs to be processed, you know, when it, you know, it processes exactly the same

832
01:26:12,859 --> 01:26:19,259
point in its instruction street, right? So it sends it off and then, you know, it delivers it to

833
01:26:19,260 --> 01:26:24,300
the primary. And then the primary goes off and does its thing, primary, you may respond with a message.

834
01:26:24,860 --> 01:26:29,020
And so the, if the primary response with the message, the output, you know, of that message,

835
01:26:29,020 --> 01:26:35,980
is stopped or held, on hold, into the backup, actually acknowledge the reception of this increment.

836
01:26:39,739 --> 01:26:43,739
We should ensure that if the backup has to take over, you know, whatever it will process,

837
01:26:43,739 --> 01:26:47,820
that increment first, and it also will be 11 before it responses sent.

838
01:26:50,140 --> 01:26:53,659
Okay. Okay. Thank you.

839
01:26:53,659 --> 01:26:55,659
You're welcome.

840
01:26:55,659 --> 01:27:00,860
One thing I was kind of confused about is, is that goal of the system to,

841
01:27:02,780 --> 01:27:07,900
to help with like, blocking up an actual server, we're like, because it's not easy to handle the

842
01:27:07,900 --> 01:27:15,500
interrupts without a hypervisor, or is it actually to help distribute virtual missions themselves?

843
01:27:16,300 --> 01:27:21,420
It is purely to make an app, you have a business application that runs on this single machine,

844
01:27:21,420 --> 01:27:28,220
and you want to make it more fault tolerant. But this scheme does, it makes it fault-tolerant for

845
01:27:28,220 --> 01:27:34,859
you, transparently. You run the business applications and both machines on the FT hypervisor,

846
01:27:34,859 --> 01:27:39,020
and FT-havy-artisizer will ensure that, you know, basically these applications more or less,

847
01:27:39,180 --> 01:27:45,580
not literally running walkstep, but basically, you know, fault-tolerant really replicated.

848
01:27:46,780 --> 01:27:50,060
So using the VM itself was kind of the design decision?

849
01:27:50,060 --> 01:27:55,660
Yes. And that is a good design decision, because it allows you to do this sort of replication

850
01:27:55,660 --> 01:27:59,500
at a transparent level. Okay. Thanks so much. You're welcome.

851
01:28:02,620 --> 01:28:07,100
Yeah, there's a question in the chat about the, the output rule is possible,

852
01:28:07,100 --> 01:28:11,740
that the client sees the same response twice. And the answer is yes. It's absolutely possible

853
01:28:11,740 --> 01:28:16,700
that the client will see you get the response twice. And basically, what they argue,

854
01:28:17,500 --> 01:28:22,539
that's okay, because in sort of the fault-tolerant model of the network, it is always or

855
01:28:22,539 --> 01:28:28,460
shunned the network and actually duplicate messages anyway. And so protocols like TCP are totally

856
01:28:28,460 --> 01:28:36,060
designed to deal with duplicate messages. So yes, it's okay because of TCP, or whatever,

857
01:28:37,740 --> 01:28:41,260
replication duplication scheme, the application uses for the client uses.

858
01:28:43,260 --> 01:28:49,500
I was curious about Kat's question, which is, if the primary, like, sort of like goes down for a few

859
01:28:49,500 --> 01:28:59,660
minutes, backup goes live, then sets up, it's a, it's a tone backup, you know, switches the bit back

860
01:28:59,659 --> 01:29:08,539
to like, to zero. And then suddenly, somehow, the first primary goes back, like goes back

861
01:29:08,539 --> 01:29:11,340
to the work. Oh yeah, it's something that has to be decays. The first primary is definitely

862
01:29:11,340 --> 01:29:19,019
terminated, cleaned up, cleaned up, and gone. Mm-hmm. Nice. Yep. Thanks.

863
01:29:21,659 --> 01:29:26,059
I was going to ask, I think something similar, maybe two questions, but like, will you

864
01:29:26,060 --> 01:29:32,300
I really just store more things besides like arbitrations, flag and the server, and

865
01:29:33,260 --> 01:29:40,539
decide to flag an arbitration server, if you have like multiple, like, backups.

866
01:29:41,500 --> 01:29:46,460
Oh yeah, like, this is the scheme tailored to one backup, not more than one backup. So if you

867
01:29:46,460 --> 01:29:52,539
had more backups, you know, the other issues that we need to resolve. And in fact, we'll come

868
01:29:52,539 --> 01:29:56,699
back to this on Tuesday, you know, with more sophisticated protocols that, you know, handle those

869
01:29:56,699 --> 01:30:06,140
cases much cleaner. Okay. Very, very close. I have one question about the performance.

870
01:30:06,699 --> 01:30:14,300
Yeah. Um, so can you go back to that table? Yeah, so my question is, is it the delay only be

871
01:30:14,300 --> 01:30:19,659
viewed on the first packet? Like, after the first packet, it will just flow through the channel,

872
01:30:19,659 --> 01:30:26,220
and there is no extra delay on the link. So the bandwidth should be roughly the same, but no,

873
01:30:26,939 --> 01:30:31,260
I guess for every packet received, correct? By the primary, you know, that packet has to be forward

874
01:30:31,260 --> 01:30:35,420
to the backup. Mm-hmm. Yeah. And for every response, you know, the backup will have to wait.

875
01:30:35,420 --> 01:30:39,739
Over the primary has to wait until the output rule is satisfied, and then it can send the response.

876
01:30:42,220 --> 01:30:49,019
So there is some like processing on the backups backup server too, before getting back to the

877
01:30:49,020 --> 01:30:52,460
primary. Yeah. So again, they talk a little bit about that, correct? Like, if the particular processing

878
01:30:52,460 --> 01:30:57,660
that needs to be done is actually acknowledging the, uh, reception of the packet on the logging channel.

879
01:30:58,300 --> 01:31:03,820
And they talk a little bit about like how to reduce the delay to make sure that that, uh, sort of,

880
01:31:03,820 --> 01:31:10,940
the announcement is very quick. I see, I see. Okay. Thank you. You're welcome. I have a question

881
01:31:10,940 --> 01:31:17,340
about the, uh, the logging channel. So they, they mentioned that they use UDP, um, and I assume that's

882
01:31:17,340 --> 01:31:23,659
mostly for performance. But then, so basically if a single failure happens, the primary,

883
01:31:24,220 --> 01:31:29,980
like if a single packet is unacknowledged, then it assumes that the backup failed without any,

884
01:31:29,980 --> 01:31:35,100
like, retransmission. No, no, no, no. Uh, because of, there's a time rate interrupt,

885
01:31:36,300 --> 01:31:41,900
and the time rate interrupt goes up like every 10 milliseconds or something. Uh, there's always

886
01:31:41,899 --> 01:31:46,699
sort of multiple, you know, one packet to send. If that packet doesn't get, uh, uh, there's no hard

887
01:31:46,699 --> 01:31:52,299
beat coming back, then it will do a couple of these time interrupts before it gives up. Okay.

888
01:31:52,299 --> 01:31:58,539
And the, the, the hard beats are they're saving from the primary or it was like sort of implied.

889
01:31:58,539 --> 01:32:01,899
It was like from somewhere else in the system. Well, they sort of come from the time,

890
01:32:01,899 --> 01:32:06,619
or the hard beats, uh, basically have an indirect side effect, uh, because every 10 milliseconds,

891
01:32:06,619 --> 01:32:09,659
you're going to send an interrupt message to the over-logging channel anyway.

892
01:32:12,379 --> 01:32:13,739
I see. Okay.

893
01:32:15,979 --> 01:32:17,979
All right. Thank you. Thank you. Welcome.

894
01:32:21,659 --> 01:32:26,779
Actually, I wanted to follow up on that. I think it said that it's going to wait a couple

895
01:32:26,779 --> 01:32:31,979
a few seconds to, yeah, yeah, it will wait a while. You know, what they do, a couple hard beats

896
01:32:31,979 --> 01:32:35,339
and wait a while, and if there really none of them go through, then it will stop.

897
01:32:36,619 --> 01:32:40,460
Okay. And is there, is a few seconds that's, that's a lot, right?

898
01:32:41,100 --> 01:32:44,380
Yeah, I don't remember exactly all the numbers. So you could be right in a few seconds.

899
01:32:44,380 --> 01:32:49,579
I would imagine it's a little bit shorter, but maybe it's not clear. I think is that like something

900
01:32:49,579 --> 01:32:55,579
in the order of a few seconds, but is it bad? That was for the cloning.

901
01:32:56,779 --> 01:32:59,500
But, you know, I can remiss remember, right?

