---
title: CS144 NetworkP282 6aFinitestatemachines1
---

1
00:00:00,000 --> 00:00:05,120
I'm going to explain finite state machines, something very commonly used when specifying network

2
00:00:05,120 --> 00:00:06,120
protocols and systems.

3
00:00:06,120 --> 00:00:09,960
I'll also explain the common way they're drawn in network protocols.

4
00:00:09,960 --> 00:00:14,439
I'll conclude by showing you the finite state machine that's part of the TCP specification,

5
00:00:14,439 --> 00:00:18,839
which defines how TCP connections are set up and torn down.

6
00:00:18,839 --> 00:00:23,640
So you'll see how you can describe something like the three-way handshake of TCP in a finite

7
00:00:23,640 --> 00:00:24,960
state machine.

8
00:00:24,960 --> 00:00:29,760
As the name suggests, a finite state machine is composed of a finite number of states,

9
00:00:29,760 --> 00:00:32,560
a state is a particular configuration of the system.

10
00:00:32,560 --> 00:00:35,160
I'm going to start with an abstract example.

11
00:00:35,160 --> 00:00:41,400
In this example, we have three states, state 1, state 2, and state 3.

12
00:00:41,400 --> 00:00:44,520
So our system can be in one of these three states.

13
00:00:44,520 --> 00:00:48,200
Edges between the states define how we transition between them.

14
00:00:48,200 --> 00:00:54,120
When we draw an edge, we first specify what events cause the transition to occur.

15
00:00:54,120 --> 00:00:58,600
Below this, we can state what actions the system will take when that transition occurs.

16
00:00:59,079 --> 00:01:02,439
The second part is optional because not all transitions have actions associated with

17
00:01:02,439 --> 00:01:03,439
them.

18
00:01:03,439 --> 00:01:07,200
But if there is an action, you should specify it.

19
00:01:07,200 --> 00:01:11,640
Otherwise, you have an incomplete specification and people might not test or implement it

20
00:01:11,640 --> 00:01:12,960
correctly.

21
00:01:12,960 --> 00:01:17,799
If the system is in a state and an event arrives for which there is no transition described,

22
00:01:17,799 --> 00:01:21,240
then the behavior of the FSM is undefined.

23
00:01:21,240 --> 00:01:24,640
There could be multiple transitions from a single state.

24
00:01:24,640 --> 00:01:29,079
To hear we have a second transition from state 1, a different event that will take the

25
00:01:29,079 --> 00:01:31,519
system into state 3.

26
00:01:31,519 --> 00:01:36,439
For any given state, the transition for an event must be unique.

27
00:01:36,439 --> 00:01:43,120
In this example, an event can cause state 1 to transition to state 2 or transition to

28
00:01:43,120 --> 00:01:44,439
state 3.

29
00:01:44,439 --> 00:01:47,799
But you can't have the same event associated with both transitions, otherwise the transition

30
00:01:47,799 --> 00:01:49,200
is ambiguous.

31
00:01:49,200 --> 00:01:52,079
If the event occurs, would you be in state 2 or state 3?

32
00:01:52,079 --> 00:01:56,200
The system can only be in one state.

33
00:01:56,200 --> 00:01:59,679
So let's walk through an example in HTTP request.

34
00:01:59,679 --> 00:02:02,840
In practice, HTTP requests are a bit more complex than this.

35
00:02:02,840 --> 00:02:04,319
They're all kinds of options.

36
00:02:04,319 --> 00:02:08,319
So for this example, we'll use a very simple form.

37
00:02:08,319 --> 00:02:10,479
Let's describe our system this way.

38
00:02:10,479 --> 00:02:14,599
In our starting state, we are viewing a page or otherwise idle.

39
00:02:14,599 --> 00:02:16,159
We want to load a new page.

40
00:02:16,159 --> 00:02:19,400
We transition to the page requesting state.

41
00:02:19,400 --> 00:02:26,520
So the event is load new page and the action is open a connection to the web server.

42
00:02:26,520 --> 00:02:30,240
Once we've opened a connection, we're now in the page requesting state.

43
00:02:30,240 --> 00:02:34,040
We'll transition back to the idle state when the connection closes, or when we finish

44
00:02:34,040 --> 00:02:38,159
requesting every resource on the page.

45
00:02:38,159 --> 00:02:43,560
We need one more state, which describes where we are in requesting a page.

46
00:02:43,560 --> 00:02:48,120
On the event of having more resources to request, we take the action of requesting a resource

47
00:02:48,120 --> 00:02:50,280
within HTTP get.

48
00:02:50,280 --> 00:02:54,039
This puts us in the requesting pending state.

49
00:02:54,039 --> 00:02:58,200
On the event of receiving the response, our system transitions back to the page requesting

50
00:02:58,200 --> 00:03:00,200
state.

51
00:03:00,200 --> 00:03:08,759
So here we have a three state system, idle, page requesting, and request pending.

52
00:03:08,759 --> 00:03:10,520
On one hand, this is a nice simple FSM.

53
00:03:10,520 --> 00:03:13,879
But if you're trying to implement it, it leaves a lot unsaid.

54
00:03:13,879 --> 00:03:17,719
Specifically, we have four events in the system, page request, more requests, we've received

55
00:03:17,719 --> 00:03:20,319
response, and connection closed.

56
00:03:20,319 --> 00:03:24,680
So what happens if the connection close event arrives when we're in the request pending

57
00:03:24,680 --> 00:03:30,120
state, or when we receive a page request while on the page requesting state, or receive

58
00:03:30,120 --> 00:03:33,680
response while on the idle state?

59
00:03:33,680 --> 00:03:38,000
If you want to be completely explicit and careful, you should specify what happens on each

60
00:03:38,000 --> 00:03:39,759
state for every event.

61
00:03:40,560 --> 00:03:44,799
But this can lead to complicated FSM which have tons of edges.

62
00:03:44,799 --> 00:03:51,599
So often, instead, you'll write down just the common cases in the FSM for ease of understanding

63
00:03:51,599 --> 00:03:55,519
and have some supporting text about other transitions.

64
00:03:55,519 --> 00:03:59,919
Or in some cases, it can even be acceptable to leave something undefined.

65
00:03:59,919 --> 00:04:04,719
The Internet Engineering Task Force, for example, the ITF, often doesn't completely specify

66
00:04:04,719 --> 00:04:05,719
every FSM.

67
00:04:06,359 --> 00:04:10,039
The idea is that by specifying only the parts that are necessary for interoperability,

68
00:04:10,039 --> 00:04:12,919
you can leave the specification flexible for future exploration.

69
00:04:12,919 --> 00:04:17,800
As people use the protocol, they'll figure out if something is important and if so,

70
00:04:17,800 --> 00:04:19,600
can specify that extra part later.

71
00:04:21,800 --> 00:04:25,839
So let's walk through a real example of an FSM, probably the most famous FSM on the

72
00:04:25,839 --> 00:04:27,120
Internet.

73
00:04:27,120 --> 00:04:31,720
This diagram here describes the finite state machine of TCP.

74
00:04:31,720 --> 00:04:33,199
I know it looks very complicated.

75
00:04:33,199 --> 00:04:38,199
It has 12 states, but it'll walk through it bit by bit and you'll see how it all fits

76
00:04:38,199 --> 00:04:39,199
together.

77
00:04:39,199 --> 00:04:45,000
First off, the diagram really has four parts which we can look at separately.

78
00:04:45,000 --> 00:04:52,120
These top four states are what describe how you open a TCP connection.

79
00:04:52,120 --> 00:04:59,039
This center state established is when TCP is sending and receiving data.

80
00:04:59,040 --> 00:05:03,439
This after the connection has been established, but before it's been closed.

81
00:05:03,439 --> 00:05:09,040
These six states describe how connections close.

82
00:05:09,040 --> 00:05:14,600
This state at the bottom closed denotes the connection as closed and the node can forget

83
00:05:14,600 --> 00:05:15,600
about it.

84
00:05:15,600 --> 00:05:20,360
Note that the top state is also the closed state before we open the connection.

85
00:05:20,360 --> 00:05:26,320
We'll call that you start a TCP connection with a three-way handshake, sin, sin-ac,

86
00:05:26,319 --> 00:05:34,360
the client or active opener sends a sin synchronization message to a program listening for connection

87
00:05:34,360 --> 00:05:36,360
requests.

88
00:05:36,360 --> 00:05:40,719
When this node receives a sin, it responds with a sin-ac synchronizing and acknowledging

89
00:05:40,719 --> 00:05:42,800
the original synchronization.

90
00:05:42,800 --> 00:05:49,319
The active opener on receiving the sin-ac responds with an acknowledgement and act.

91
00:05:49,319 --> 00:05:56,279
The state diagram here describes how TCP behaves on both sides of the TCP three-way handshake.

92
00:05:56,559 --> 00:06:00,399
A passive opener is a listener, it's a server.

93
00:06:00,399 --> 00:06:04,359
It listens for requests for connections from active openers clients.

94
00:06:04,359 --> 00:06:11,559
So in a program calls listen, the socket transition from the orange closed state to the yellow

95
00:06:11,559 --> 00:06:14,039
listen state.

96
00:06:14,039 --> 00:06:16,159
The protocol takes no actions when this happens.

97
00:06:16,159 --> 00:06:17,719
It doesn't send any messages.

98
00:06:17,719 --> 00:06:22,799
If the server calls close on the socket when it's in the listen state, it transitions immediately

99
00:06:22,799 --> 00:06:26,199
to the closed state.

100
00:06:26,199 --> 00:06:30,439
Let's walk through the three-way handshake starting with a first step when a client tries

101
00:06:30,439 --> 00:06:34,839
to open a connection and sends a sin-packed server.

102
00:06:34,839 --> 00:06:39,000
We can see that this first transition for the client side of the connection is this orange

103
00:06:39,000 --> 00:06:45,680
arrow from closed to the sin-sense state.

104
00:06:45,680 --> 00:06:53,000
This happens when the client program calls connect, the event, and the client sends a sin

105
00:06:53,000 --> 00:06:56,159
message.

106
00:06:56,160 --> 00:07:01,120
Once the first sin is sent, the client is in the sin-sense state and the server is in

107
00:07:01,120 --> 00:07:03,560
the listen state.

108
00:07:03,560 --> 00:07:10,720
When the sin arrives at the server, this leads to this blue transition.

109
00:07:10,720 --> 00:07:14,440
You can see the event is receiving a sin message.

110
00:07:14,440 --> 00:07:19,600
The actions to send a sin-ack message in response, now the server is in the sin-received

111
00:07:19,600 --> 00:07:21,600
state.

112
00:07:21,600 --> 00:07:23,600
Let's jump back to the client.

113
00:07:23,600 --> 00:07:26,720
Remember it was in the sin-sense state.

114
00:07:26,720 --> 00:07:33,160
Now when it receives the sin-ack from the server, it transitions to the established state.

115
00:07:33,160 --> 00:07:38,240
It's actions to send an act message, the third message of the sin-sense-ack-ack handshake.

116
00:07:38,240 --> 00:07:41,640
Now the client can start sending data to the server.

117
00:07:41,640 --> 00:07:44,879
Finally, let's go back to the server, which is in the sin-received state.

118
00:07:44,879 --> 00:07:48,760
When it receives the act from the client, it transitions to the established state and

119
00:07:48,759 --> 00:07:49,759
can send data.

