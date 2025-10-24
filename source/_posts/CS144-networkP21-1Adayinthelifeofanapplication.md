---
title: CS144 NetworkP21 1Adayinthelifeofanapplication
---

1
00:00:00,000 --> 00:00:06,000
What ultimately makes networks interesting are the applications that use them.

2
00:00:06,000 --> 00:00:10,000
David Clark, one of the key contributors to the Internet's design, once wrote,

3
00:00:10,000 --> 00:00:15,000
the current exponential growth of the network seems to show that connectivity is its own reward,

4
00:00:15,000 --> 00:00:21,000
and it is more valuable than any individual application such as mail or the World Wide Web.

5
00:00:21,000 --> 00:00:27,000
Connectivity is the idea that two computers in different parts of the world can connect to one another and exchange data.

6
00:00:27,000 --> 00:00:33,000
If you connect your computer to the Internet, you can suddenly talk with all of the other computers connected to the Internet.

7
00:00:33,000 --> 00:00:40,000
Let's look at exactly what that means and how some modern applications at the World Wide Web Skype and BitTorrent use it.

8
00:00:40,000 --> 00:00:46,000
The tremendous power of network applications is that you can have multiple computers, each with their own private data,

9
00:00:46,000 --> 00:00:50,000
each perhaps owned and controlled by different people, exchange information.

10
00:00:50,000 --> 00:00:55,000
Unlike your local applications, which can only access data that resides on your local system,

11
00:00:55,000 --> 00:00:58,000
network applications can exchange data across the world.

12
00:00:58,000 --> 00:01:02,000
For example, think of using a web browser to read a magazine.

13
00:01:02,000 --> 00:01:09,000
The server is run by the publisher and has all of the magazine articles, and it might also have all the articles from past issues.

14
00:01:09,000 --> 00:01:13,000
As articles are corrected or added, you can immediately see the newer versions and newer content.

15
00:01:13,000 --> 00:01:18,000
The entire back catalog of articles might be too much free to download so you can load them on demand.

16
00:01:18,000 --> 00:01:23,000
If you didn't have a network, then you need someone to send you a DVD or a USB stick with the latest issue.

17
00:01:24,000 --> 00:01:31,000
So the basic model is that you have two computers, each running a program locally, and these two programs communicate over the network.

18
00:01:31,000 --> 00:01:37,000
The most common communication model used is a bidirectional, reliable stream of bytes.

19
00:01:39,000 --> 00:01:48,000
So program A, running on computer A, can write data, which goes over the network, such that then program B, running on computer B, can read it.

20
00:01:49,000 --> 00:01:54,000
Similarly, program B can write data that program A can read.

21
00:01:54,000 --> 00:02:04,000
There are other modes of communication, which we'll talk about later in the course, but a reliable bidirectional byte stream is by far the most common one used in networks today.

22
00:02:04,000 --> 00:02:06,000
Let's walk through what this looks like.

23
00:02:06,000 --> 00:02:12,000
Computer B, on the right, is waiting for other computers to connect to it.

24
00:02:12,000 --> 00:02:17,000
Computer A, on the left, wants to communicate with B.

25
00:02:18,000 --> 00:02:24,000
For example, though it's drawn here as a server, it could be a mobile phone running a web browser.

26
00:02:24,000 --> 00:02:27,000
A and B set up a connection.

27
00:02:27,000 --> 00:02:34,000
Now, when A writes data to the connection, this data travels over the network and B can read it.

28
00:02:34,000 --> 00:02:43,000
Similarly, if B writes data to the connection, that data travels over the network and A can read it.

29
00:02:43,000 --> 00:02:46,000
Either side can close the connection.

30
00:02:46,000 --> 00:02:53,000
For example, when the web browser is done requesting data from the web server, it can close the connection.

31
00:02:53,000 --> 00:02:58,000
Similarly, if the server wants to, it can close the connection as well.

32
00:02:58,000 --> 00:03:03,000
If you've ever seen an error message in a web browser saying connection reset by here, that's what this means.

33
00:03:03,000 --> 00:03:07,000
The web server closed the connection when the web browser wasn't expecting it.

34
00:03:07,000 --> 00:03:09,000
Of course, the server can refuse the connection as well.

35
00:03:09,000 --> 00:03:16,000
You've probably seen connection refuse messages or have a browser wait for a long time because the server isn't even responding with the refusal.

36
00:03:16,000 --> 00:03:23,000
Now that we've seen the basic way networked applications communicate, let's look at our first example, the World Wide Web.

37
00:03:23,000 --> 00:03:29,000
The World Wide Web uses something called ACTP, which stands for Hypertext Transfer Protocol.

38
00:03:29,000 --> 00:03:37,000
When you see ACTP, colon slash slash in your browser, that means it's communicating using ACTP.

39
00:03:37,000 --> 00:03:42,000
We'll dig much deeper into the details of ACTP later in the course when we cover applications.

40
00:03:42,000 --> 00:03:45,000
For now, I'm just going to give a very high level overview.

41
00:03:45,000 --> 00:03:50,000
An HTTP client opens a connection to a server and sends commands to it.

42
00:03:50,000 --> 00:03:55,000
The most common command is Get, which requests a page.

43
00:03:55,000 --> 00:03:59,000
HTTP was designed to be a document-centric way for programs to communicate.

44
00:03:59,000 --> 00:04:05,000
For example, if I type HTTP www.stanford.edu in my browser,

45
00:04:05,000 --> 00:04:13,000
the browser opens a connection to the server, www.stanford.edu, and sends a Get request for the root page of the site.

46
00:04:13,000 --> 00:04:20,000
The server receives the request, checks if it's valid, and the user can access that page and sends a response.

47
00:04:20,000 --> 00:04:23,000
The response has an America Code associated with it.

48
00:04:23,000 --> 00:04:33,000
For example, if the server sends a 200 OK response to it get, this means that the request was accepted and the rest of the response has the document data.

49
00:04:33,000 --> 00:04:41,000
In the example of the www.stanford.edu webpage, a tournoor OK response would include the hypertext that describes the main Stanford page.

50
00:04:41,000 --> 00:04:50,000
The other kinds of requests such as put, delete, and info, as well as other responses such as 400, which means that there was a bad request, maybe it was malformed.

51
00:04:50,000 --> 00:04:56,000
Because HTTP is document-centric, clients, client requests name a file.

52
00:04:57,000 --> 00:05:05,000
HTTP is all an ASCII text, it's human readable. For example, the beginning of a Get request for Stanford looks like this.

53
00:05:05,000 --> 00:05:11,000
The beginning of a response to a successful request looks like this.

54
00:05:11,000 --> 00:05:14,000
The basic model is simple.

55
00:05:14,000 --> 00:05:24,000
Client, a client sends a request by writing to the connection, the server reads this request, process it, and writes a response to the connection which the client then reads.

56
00:05:25,000 --> 00:05:28,000
Let's look at a second application, BitTorrent.

57
00:05:28,000 --> 00:05:37,000
BitTorrent is a program that allows people to share and exchange large files, unlike the web, or a client request documents from a server, in BitTorrent, a client request documents from other clients.

58
00:05:37,000 --> 00:05:45,000
So there's single client can request from many others in parallel, BitTorrent breaks files up into chunks of data called pieces.

59
00:05:45,000 --> 00:05:52,000
When a client downloads a complete piece from another client, it then tells other clients it has that piece they can download it to.

60
00:05:52,000 --> 00:05:59,000
These collections of collaborating clients are called swarms. So we talk about a client joining or leaving the swarm.

61
00:05:59,000 --> 00:06:08,000
BitTorrent uses the exact same mechanism as the World Wide Web, our reliable, bidirectional byte stream, but it uses it in a slightly more complex way.

62
00:06:08,000 --> 00:06:13,000
When the client wants to download a file, it first has to find something called a torrent file.

63
00:06:13,000 --> 00:06:19,000
Usually you find this using the World Wide Web, and download it using, you guessed it, HTTP.

64
00:06:19,000 --> 00:06:28,000
The torrent file describes some information about the data file you want to download. It also tells BitTorrent about who the tracker is for that torrent.

65
00:06:28,000 --> 00:06:35,000
A tracker is a node that keeps track, hence the name, of what clients are members of the swarm.

66
00:06:35,000 --> 00:06:44,000
To join a torrent, your client contacts the tracker, again, over HTTP, to request the list of other clients.

67
00:06:44,000 --> 00:06:50,000
Your client opens connections to some of these other clients and starts requesting pieces of the file.

68
00:06:50,000 --> 00:06:59,000
These clients in turn can request pieces on their own. Furthermore, when a new client joins this swarm, the tracker might tell this new client to connect to your client.

69
00:06:59,000 --> 00:07:07,000
So rather than a single connection between a client and a server, you have a dense graph of connections between clients dynamically exchanging data.

70
00:07:08,000 --> 00:07:12,000
For a third and final application, let's look at Skype, the popular Voice Chat and Video Service.

71
00:07:12,000 --> 00:07:17,000
Skype's proprietary system doesn't have any official documentation on how it works internally.

72
00:07:17,000 --> 00:07:23,000
In 2008, some researchers at Columbia figured out mostly how it works by looking at where and when Skype clients send messages.

73
00:07:23,000 --> 00:07:26,000
The messages were encrypted, though, so they couldn't look inside.

74
00:07:26,000 --> 00:07:34,000
In 2011, however, a theme bush went off, reverse engineered the protocol and published open source code, so now it has a better sense of how the protocol works.

75
00:07:35,000 --> 00:07:41,000
In its most simple mode, when you want to call someone in Skype, it's a simple client server exchange, sort of like HTTP.

76
00:07:41,000 --> 00:07:46,000
You, the caller, open a connection to the recipient.

77
00:07:46,000 --> 00:07:52,000
If the recipient accepts your call, you start exchanging Voice, Video, or Chat data.

78
00:07:52,000 --> 00:07:57,000
But unlike the web, when there's a client and a server, in the Skype case, you have two clients.

79
00:07:57,000 --> 00:08:04,000
So rather than having a personal computer request something from a dedicated server, you have two personal computers requesting data from each other.

80
00:08:04,000 --> 00:08:08,000
This difference turns out to have a really big implication to how Skype works.

81
00:08:10,000 --> 00:08:14,000
The complication comes from something called a NAT, or network address translator.

82
00:08:15,000 --> 00:08:22,000
Nats are everywhere today. A small, home wireless router is a NAT. When a mobile phone connects the internet, it's behind a NAT.

83
00:08:22,000 --> 00:08:30,000
We'll cover them in greater detail later in the course, but for now, all you need to know is that if you're behind a NAT, then you can open connections out to the internet.

84
00:08:30,000 --> 00:08:34,000
But other nodes on the internet can't easily open connections to you.

85
00:08:34,000 --> 00:08:43,000
In this example, this means that client B can open connections to other nodes freely, but it's very hard for other nodes to open connections to client B.

86
00:08:43,000 --> 00:08:50,000
That's what this red-green gradient is showing. Connections coming from the green side work find, but connections coming from the red side don't.

87
00:08:50,000 --> 00:08:59,000
So the complication here is that if client A wants to call client B, it can't open a connection. It can't go through the NAT. Skype has to work around this.

88
00:09:00,000 --> 00:09:06,000
It does so using something called a rendezvous server. When you log into Skype, your client opens connections to a network of control servers.

89
00:09:06,000 --> 00:09:16,000
In this case, client B opens a connection to the rendezvous server. This works fine because the server isn't behind a NAT, and so client B can open connections without any problems.

90
00:09:16,000 --> 00:09:27,000
When a client A calls client B, it sends a message to the rendezvous server. Since the server has an open connection to client B, it tells B that there's a call request from A.

91
00:09:27,000 --> 00:09:34,000
The call dialog pops up on client B. If client B accepts the call, then it opens a connection to client A.

92
00:09:35,000 --> 00:09:46,000
Client A was trying to open a connection to client B, but since B is behind a NAT, it couldn't. So instead, it sends a message to a computer that client B is already connected to, which then asks client B to open a connection back to client A.

93
00:09:46,000 --> 00:09:55,000
Since client A isn't behind a NAT, this connection can open normally. This is called a reverse connection, because it reverses the expected direction for initiating the connection.

94
00:09:56,000 --> 00:10:01,000
Client A is trying to connect to client B, but instead client B opens a connection to client A.

95
00:10:01,000 --> 00:10:08,000
This happens in Skype, because Skype clients are typically personal machines. It's rare for publicly accessible web servers to be behind NATs.

96
00:10:08,000 --> 00:10:13,000
Since you want the server to be accessed by everyone on the internet, putting it behind a NAT is a bad idea.

97
00:10:13,000 --> 00:10:23,000
Therefore, opening connections to web servers is easy. Personal computers, however, often behind NATs for security and other reasons. Therefore, Skype has to incorporate some new communication patterns to work around them.

98
00:10:24,000 --> 00:10:34,000
So what does Skype do if both clients are behind NATs? We can't reverse the connection. Client A can't open a connection to client B, and client B can't open a connection to client A.

99
00:10:34,000 --> 00:10:48,000
To handle this case, Skype introduces a second kind of server called a relay. Relays can't be behind NATs. If both client and client B are behind NATs, then they communicate through a relay. They both open connections to the relay.

100
00:10:49,000 --> 00:11:01,000
When client A sends data, the relay forwards it to client B through the connection that B opened. Similarly, when client B sends data, the relay forwards it to client A through the connection client A opened.

101
00:11:02,000 --> 00:11:15,000
In summary, we've seen the most common communication model network applications, are reliable bidirectional byte stream. This allows two programs running on different computers to exchange data. It abstracts away the entire network to a simple read-write relationship.

102
00:11:15,000 --> 00:11:29,000
Although it's a very simple communication model, it can be used in very inventive and complex ways. We looked at three examples, the World Wide Web, BitTorrent, and Skype. The World Wide Web is a client server model. The client opens a connection to a server and requests documents. The server responds with the documents.

103
00:11:30,000 --> 00:11:37,000
BitTorrent is a peer-to-peer model where swarms of clients open connections to each other in exchange pieces of data creating a dense network of connections.

104
00:11:37,000 --> 00:11:48,000
Skype is a mix of the two. When Skype clients can communicate directly, they do so in a peer-to-peer fashion. But sometimes the clients aren't able to open connections directly and instead go through rendezvous or relay servers.

105
00:11:48,000 --> 00:11:58,000
You can see how what looks like a very simple abstraction, a bidirectional reliable byte stream, can be used in many interesting ways by changing how programs open connections and what different programs do.

106
00:11:58,000 --> 00:12:11,000
When you create complex applications ranging from document retrieval to swarming downloads to IP to left knee. Trackers in BitTorrent, for example, have very different data and a very different role than the clients. Just to Skype has realized in rendezvous servers in addition to its clients.

