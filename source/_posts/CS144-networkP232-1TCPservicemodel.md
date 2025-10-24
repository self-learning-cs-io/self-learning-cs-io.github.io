---
title: CS144 NetworkP232 1TCPservicemodel
---

1
00:00:00,000 --> 00:00:05,000
In this video, you're going to be learning about TCP, the transmission control protocol,

2
00:00:05,000 --> 00:00:09,000
which is used by over 95% of all internet applications.

3
00:00:09,000 --> 00:00:13,000
TCP is almost universally used because it provides the reliable, end-to-end,

4
00:00:13,000 --> 00:00:18,000
bidirectional, byte stream service that almost all applications want.

5
00:00:18,000 --> 00:00:21,000
TCP is an example of the transport layer.

6
00:00:21,000 --> 00:00:26,000
When an application calls TCP, it hands its invites that it wants delivered to the other end.

7
00:00:26,000 --> 00:00:31,000
TCP places these bytes into a TCP segment and then takes it from there.

8
00:00:31,000 --> 00:00:36,000
TCP hands the segments to the IP layer, which encapsulates it into an IP datagram.

9
00:00:36,000 --> 00:00:39,000
The IP addresses are added.

10
00:00:39,000 --> 00:00:43,000
The IP datagram is handed in turn to the link layer, which builds the link frame,

11
00:00:43,000 --> 00:00:50,000
adds the link address, for example, the Ethernet addresses, and then sits sends it onto the wire.

12
00:00:50,000 --> 00:00:54,000
When two applications use TCP, they establish a two-way communication channel

13
00:00:54,000 --> 00:00:57,000
between the TCP and P peers at both ends.

14
00:00:57,000 --> 00:01:01,000
First, TCP establishes a communication channel from A to B.

15
00:01:01,000 --> 00:01:04,000
Then, it establishes the channel from B to A.

16
00:01:04,000 --> 00:01:07,000
We call the two-way communication a connection.

17
00:01:07,000 --> 00:01:13,000
At both ends of the connection, TCP keeps a state machine to keep track of how the connection is doing.

18
00:01:13,000 --> 00:01:16,000
We'll see how the state machine works in a separate video.

19
00:01:17,000 --> 00:01:22,000
The TCP connection is established using a three-way handshake between hosts A and B.

20
00:01:22,000 --> 00:01:30,000
First of all, host A sends a message to B, indicating that the TCP layer at A wants to establish a connection with the TCP layer at B.

21
00:01:30,000 --> 00:01:35,000
The message is called the Sin message, SYN, which is short for synchronize,

22
00:01:35,000 --> 00:01:40,000
because A also sends along the base number it will use to identify bytes in the byte stream.

23
00:01:40,000 --> 00:01:43,000
If it sends 0, then the numbers will start at 0.

24
00:01:43,000 --> 00:01:47,000
If it sends a thousand, then they will start at 1,000.

25
00:01:47,000 --> 00:01:50,000
B responds with what we call the Sin plus AC.

26
00:01:50,000 --> 00:01:57,000
B signals an AC because B is a acknowledging A's request and a green to establish the communication from A to B.

27
00:01:57,000 --> 00:02:07,000
The TCP layer at B also sends a Sin back to A to indicate that the TCP layer at B wants to establish a connection with the TCP layer at A.

28
00:02:07,000 --> 00:02:12,000
It sends a number two indicating the starting number for the byte stream in the reverse direction.

29
00:02:12,000 --> 00:02:19,000
Finally, A responds with an AC to indicate that it is accepting the request for communication in the reverse direction.

30
00:02:19,000 --> 00:02:25,000
The connection is now set up in both directions, they are now ready to start sending data to each other.

31
00:02:25,000 --> 00:02:32,000
The hosts send data to each other as if it were from a continuous stream of bytes.

32
00:02:32,000 --> 00:02:40,000
Assume time is increasing from left to right and the stream of bytes next to A represents the bytes it wants to send to B.

33
00:02:40,000 --> 00:02:43,000
The stream of bytes might exist in advance.

34
00:02:43,000 --> 00:02:48,000
For example, they are read from an HTML file describing a static web page.

35
00:02:48,000 --> 00:02:53,000
Or it could be a stream being generated on the fly, for example from a video camera.

36
00:02:53,000 --> 00:02:56,000
Either way, TCP sees it as a stream of bytes.

37
00:02:56,000 --> 00:03:01,000
Data from the application on A is delivered to the application at B.

38
00:03:01,000 --> 00:03:09,000
The TCP layers on A and B work together to make sure the stream of bytes is delivered correctly in order to the application at B.

39
00:03:10,000 --> 00:03:14,000
The stream of bytes is delivered by TCP segments.

40
00:03:14,000 --> 00:03:22,000
A puts bytes from the stream into a TCP segment, hands it to the IP layer which delivers it to B.

41
00:03:22,000 --> 00:03:30,000
The TCP layer at B extracts the bytes to recreate the byte stream and delivers them to the application at B.

42
00:03:30,000 --> 00:03:38,000
In practice, the TCP segment may need to be transmitted multiple times, in the case a segment is dropped along the way or if A doesn't receive an acknowledgement.

43
00:03:39,000 --> 00:03:42,000
The TCP segment could be as small as one byte.

44
00:03:42,000 --> 00:03:51,000
For example, if you're typing characters in an SSH session, each character is sent one at a time rather than waiting for the whole segment to fill up.

45
00:03:51,000 --> 00:03:59,000
This isn't very efficient when we have lots of data to send, so we can fill the TCP segment all the way up to a maximum IP data ground size.

46
00:03:59,000 --> 00:04:04,000
When A and B have finished sending data to each other, they need to close the connection.

47
00:04:04,000 --> 00:04:13,000
We say they tear down the connection, which means they tell each other they are closing the connection and both ends can clean up the state associated with the state machine.

48
00:04:13,000 --> 00:04:20,000
The TCP layer at host A can close the connection by sending a thin message, which is short for finish.

49
00:04:20,000 --> 00:04:27,000
Host B acknowledges that A no longer has data to send and stops looking for new data from A.

50
00:04:27,000 --> 00:04:30,000
This closes down the data stream from A to B.

51
00:04:31,000 --> 00:04:37,000
But B might still have new data to send to A and is not ready to close down the channel from B to A yet.

52
00:04:37,000 --> 00:04:43,000
So the message from B to A carrying the AC can also carry new data from B to A.

53
00:04:43,000 --> 00:04:48,000
B can keep sending new data to A as long as it needs to.

54
00:04:48,000 --> 00:04:57,000
Sometime later, B finishes sending data to A and now sends its own thin to tell A they can close the connection.

55
00:04:57,000 --> 00:05:02,000
Host A replies by sending an AC to acknowledge that the connection is now closed.

56
00:05:02,000 --> 00:05:09,000
Because both directions have finished, the connection is now fully closed and the state can be safely removed.

57
00:05:09,000 --> 00:05:14,000
Here is a table summarizing the services provided by TCP.

58
00:05:14,000 --> 00:05:18,000
The first three are services TCP provides to the application.

59
00:05:18,000 --> 00:05:25,000
As we just saw, it provides a reliable stream of bytes between two applications.

60
00:05:25,000 --> 00:05:29,000
TCP uses four mechanisms to make the communication reliable.

61
00:05:29,000 --> 00:05:33,000
In other words, to make sure the data is correctly delivered.

62
00:05:33,000 --> 00:05:40,000
When a TCP layer receives data, it sends an acknowledgement pack to the sender to let it know the data arrived correctly.

63
00:05:40,000 --> 00:05:43,000
Check sums detect corrupted data.

64
00:05:43,000 --> 00:05:48,000
The TCP header carries a checksum covering the header and the data inside the segment.

65
00:05:48,000 --> 00:05:52,000
The checksum is there to detect if the segment is corrupted along the way.

66
00:05:52,000 --> 00:05:57,000
For example, by a bit error on the wire or by a memory fault inside a router.

67
00:05:57,000 --> 00:06:00,000
Sequence numbers detect missing data.

68
00:06:00,000 --> 00:06:06,000
Every segment's header carries the sequence number in the stream of bytes of the first byte in the segment.

69
00:06:06,000 --> 00:06:14,000
For example, if the two sides agree that the sequence starts at 1000, then the first segment will have a sequence number of 1000.

70
00:06:14,000 --> 00:06:21,000
If the segment carries 500 bytes of data, then the next segment will carry the sequence number 1500.

71
00:06:22,000 --> 00:06:28,000
If a segment gets lost, then the sequence number will be incorrect, and the TCP layer knows some data is missing.

72
00:06:28,000 --> 00:06:36,000
It is possible that we'll show up later, perhaps it took a longer path, or it might have gone missing, in which case the sender will need to resend the data.

73
00:06:36,000 --> 00:06:40,000
Flow control prevents overrunning the receiver.

74
00:06:40,000 --> 00:06:50,000
If host A is much faster than host B, then it's possible for host A to completely overwhelm host B by sending data so fast that host B can't keep up.

75
00:06:50,000 --> 00:06:55,000
TCP prevents this from happening using something we call flow control.

76
00:06:55,000 --> 00:07:00,000
In TCP, the receiver keeps telling the sender if it can keep sending.

77
00:07:00,000 --> 00:07:05,000
Specifically, it tells the sender how much room it has in its buffers to accept new data.

78
00:07:05,000 --> 00:07:10,000
If host B is falling behind, the space drops, possibly all the way to zero.

79
00:07:10,000 --> 00:07:15,000
When it has more room, it tells A and it can send more data.

80
00:07:15,000 --> 00:07:20,000
TCP delivers data to the application in the right sequence.

81
00:07:20,000 --> 00:07:30,000
In other words, whatever sequence the data was delivered from the application to TCP at host A, this is the same order in which it is sent from TCP to the application at B.

82
00:07:30,000 --> 00:07:38,000
If segments arrive at B out of order, the TCP layer re-sequences them to the correct order using the sequence number.

83
00:07:38,000 --> 00:07:44,000
Finally, TCP is the same order in which it is sent from TCP to the application at B.

84
00:07:44,000 --> 00:07:49,000
Finally, TCP provides a service to the whole network by controlling congestion.

85
00:07:49,000 --> 00:07:55,000
TCP tries to divide up the network capacity equally among all the TCP connections using the network.

86
00:07:55,000 --> 00:08:05,000
The congestion control mechanisms in TCP are very complicated and will devote a whole of unit 4 to studying congestion control.

87
00:08:05,000 --> 00:08:12,000
The TCP segment header is much longer and more complicated than say the IP and Ethernet headers.

88
00:08:12,000 --> 00:08:16,000
That is because a TCP connection is reliable.

89
00:08:16,000 --> 00:08:25,000
In order to make the communication reliable, the two ends of the connection need to exchange more information so they know which bytes have arrived, which are missing and the status of the connection.

90
00:08:25,000 --> 00:08:29,000
Here's a quick summary of the most important fields in the TCP header.

91
00:08:29,000 --> 00:08:34,000
You don't need to remember the layout of the header, but you should learn what each field does.

92
00:08:34,000 --> 00:08:39,000
If you need a reference, I'd recommend Wikipedia or the Chrosie and Ross textbook.

93
00:08:40,000 --> 00:08:47,000
The destination port tells the TCP layer which application the bytes should be delivered to at the other end.

94
00:08:47,000 --> 00:08:53,000
When a new connection starts up, the application tells TCP which service to open a connection with.

95
00:08:53,000 --> 00:08:59,000
For example, if TCP is carrying web data, it uses port 80, which is the port number for TCP.

96
00:08:59,000 --> 00:09:07,000
You'll learn more about port numbers later, but if you're curious, you can look up the well-known port numbers at the IANA that's spelled I-A-N-A website.

97
00:09:07,000 --> 00:09:10,000
Search for IANA port numbers.

98
00:09:10,000 --> 00:09:14,000
You'll find thousands of port numbers defined for different well-known services.

99
00:09:14,000 --> 00:09:19,000
For example, when we open a connection to an SSH server, we use destination port 22.

100
00:09:19,000 --> 00:09:24,000
For SMTP, the simple mail transfer protocol, we use port 23.

101
00:09:24,000 --> 00:09:31,000
Using a well-known port number lets host B identify the application it should establish the connection with.

102
00:09:32,000 --> 00:09:38,000
The source port tells the TCP layer at the other end which port it should use to send data back again.

103
00:09:38,000 --> 00:09:50,000
In our example, when host B replies to host A, it should place host A's source port number in the destination port field, so that host A's TCP layer can deliver the data to the correct application.

104
00:09:50,000 --> 00:10:00,000
When a new application starts, the initiator of the connection, in our case, host A, generates a unique source port number.

105
00:10:00,000 --> 00:10:07,000
To differentiate the connection from any other connections between host A and B to the same service.

106
00:10:07,000 --> 00:10:13,000
The sequence number indicates the position in the byte stream of the first byte in the TCP data field.

107
00:10:13,000 --> 00:10:20,000
For example, if the initial sequence number is 1000 and this is the first segment, then the sequence number is 1000.

108
00:10:20,000 --> 00:10:25,000
The acknowledgement sequence number tells the other end which byte we're expecting next.

109
00:10:25,000 --> 00:10:31,000
It also says that we've successfully received every byte up until the one before this byte number.

110
00:10:31,000 --> 00:10:40,000
So for example, if the acknowledgement sequence number is 751, it means we've received every byte up to an including byte 750.

111
00:10:40,000 --> 00:10:51,000
Notice that there are sequence numbers for both directions in every segment, this way TCPP backs acknowledgments on the data segments travelling in the other direction.

112
00:10:51,000 --> 00:10:58,000
The 16 bits checksum is calculated over the entire header and data and helps the receiver detect corrupt data.

113
00:10:58,000 --> 00:11:02,000
For example, bit errors on the wire or a faulty memory in a router.

114
00:11:02,000 --> 00:11:08,000
You'll learn more about error detection and checksums in a later video.

115
00:11:08,000 --> 00:11:13,000
The header length field, the one on the far left, tells us how long the TCP header is.

116
00:11:13,000 --> 00:11:18,000
The TCP options fields are, well, optional.

117
00:11:18,000 --> 00:11:24,000
They carry extra new header fields that were thought of and added after the TCP standard was created.

118
00:11:24,000 --> 00:11:30,000
The header length field tells us how many option fields are present. Usually there are none.

119
00:11:30,000 --> 00:11:36,000
Finally, there are a bunch of flags used to signal information from one end of the connection to the other.

120
00:11:36,000 --> 00:11:43,000
The act flag tells us that the acknowledgement sequence number is valid and we're acknowledging all of the data up until this point.

121
00:11:43,000 --> 00:11:49,000
The sin flag tells us that we are signaling a synchronize, which is part of the three-way handshake to set up a connection.

122
00:11:49,000 --> 00:11:54,000
And the sin flag signals the closing of one direction of the connection.

123
00:11:54,000 --> 00:12:03,000
Finally, the push flag, PSH, tells us the TCP layer at the other end to deliver the data immediately upon arrival, rather than wait for more data.

124
00:12:03,000 --> 00:12:09,000
This is useful for sending short segments carrying time-critical data, such as a keystroke.

125
00:12:09,000 --> 00:12:15,000
We don't want the TCP layer to wait to accumulate many keystrokes before delivering them to the application.

126
00:12:15,000 --> 00:12:22,000
A TCP connection is uniquely identified by five pieces of information in the TCP and IP headers.

127
00:12:22,000 --> 00:12:32,000
The IP source and destination address uniquely identify the endpoints, and the IP protocol ID for TCP tells us the connection is TCP.

128
00:12:33,000 --> 00:12:38,000
The TCP source and destination ports identify the application processes on the end hosts.

129
00:12:38,000 --> 00:12:46,000
Together, at any instant, all five fields uniquely identify the TCP connection internet-wide.

130
00:12:46,000 --> 00:12:50,000
Now, the unique ID only holds a few things hold.

131
00:12:50,000 --> 00:12:57,000
First, we need to make sure Host A, the initiator of the connection, picks a unique source port ID.

132
00:12:57,000 --> 00:13:05,000
We need to make sure it doesn't accidentally pick the same source port number it already used with another connection to the same service on Host B.

133
00:13:05,000 --> 00:13:12,000
Host A uses a simple method to minimise the chances. It increments the source port number for every new connection.

134
00:13:12,000 --> 00:13:19,000
The field is 16 bits, so it takes 64k new connections before the new field grabs around.

135
00:13:20,000 --> 00:13:31,000
There's also a very slight danger that if Host A suddenly creates a lot of new connections to Host B, it might still wrap around and try to create two connections with the same global ID.

136
00:13:31,000 --> 00:13:36,000
If this happened, the bytes from one connection might become confused with the bytes from another connection.

137
00:13:36,000 --> 00:13:46,000
This could happen, for example, if a TCP segment somehow lived for a very long time in the network, stuck inside a router buffer or circulating in a temporary loop.

138
00:13:46,000 --> 00:13:54,000
To reduce the chances of confusion, TCP connections initialise with a random initial sequence number to refer to bytes in the bytes stream.

139
00:13:54,000 --> 00:13:59,000
While not totally foolproof, it does reduce the chances of confusion.

140
00:13:59,000 --> 00:14:07,000
When Host A initiates the connection to B, it includes the initial sequence number it will use in the stream of bytes from A to B.

141
00:14:07,000 --> 00:14:19,000
When B replies and initiates the connection from B to A, it supplies its own sequence number, initial sequence number from the stream of bytes from B to A.

142
00:14:22,000 --> 00:14:33,000
To summarise how sequence numbers work, the sequence number in a segment from A to B includes the sequence number of the first byte, offset by the initial sequence number.

143
00:14:34,000 --> 00:14:45,000
The acknowledgement sequence number in the segment from B back to A tells us which byte B is expecting next, offset by A's initial sequence number.

144
00:14:47,000 --> 00:14:50,000
Let's summarise how TCP port numbers work.

145
00:14:50,000 --> 00:14:57,000
Imagine the host that host B on the right offers two services, a web server and a mail server.

146
00:14:58,000 --> 00:15:07,000
When the web client, for example a Chrome browser on host A, wants to request a page from the web server on B, it sends the data to TCP.

147
00:15:07,000 --> 00:15:13,000
We'll assume TCP has already established a connection with B, so now it just needs to send the data.

148
00:15:13,000 --> 00:15:20,000
It creates a segment and uses destination port 80 to tell B it is requesting the data to be sent to the web server.

149
00:15:21,000 --> 00:15:27,000
Host A uses a locally generated source port number for B to use when sending data and acknowledgments back again.

150
00:15:29,000 --> 00:15:34,000
As usual, the TCP segment is encapsulated into an IP datagram and sent to B.

151
00:15:36,000 --> 00:15:41,000
The IP and TCP headers carry the unique ID of the TCP connection internet-wide.

152
00:15:42,000 --> 00:15:47,000
When the IP datagram arrives at B, the TCP segment is removed.

153
00:15:47,000 --> 00:15:53,000
The TCP layer sees that the segment is for port 80 and sends the data to the web server.

154
00:15:54,000 --> 00:15:56,000
The TCP sliding window.

155
00:15:57,000 --> 00:16:00,000
You'll learn about other TCP features in upcoming videos.

156
00:16:00,000 --> 00:16:05,000
You'll learn about window-based flow control to stop us from overwhelming the receiver.

157
00:16:06,000 --> 00:16:11,000
You'll learn about retransmission and timeouts and different mechanisms to accomplish it.

158
00:16:12,000 --> 00:16:15,000
And you'll learn about congestion control in Unit 4.

159
00:16:16,000 --> 00:16:25,000
So, in summary, TCP provides in order reliable delivery of a stream of bytes between application processes.

