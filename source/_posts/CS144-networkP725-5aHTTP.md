---
title: CS144 NetworkP725 5aHTTP
---

1
00:00:00,000 --> 00:00:12,000
The Hypertext Transfer Protocol, or ACTP, is a cornerstone of the modern internet.

2
00:00:12,000 --> 00:00:16,000
Originally intended to transfer documents, it's now used for so much more, such as streaming

3
00:00:16,000 --> 00:00:22,000
media from companies like Netflix and applications through scripts that your browser downloads and runs.

4
00:00:22,000 --> 00:00:29,000
In this segment, I'll explain the basic conceptual model behind ECTP and present some analytical tools for understanding how it performs.

5
00:00:29,000 --> 00:00:48,000
ACTP stands for Hypertext Transfer Protocol. So what's Hypertext? Hypertext is a document format that lets you include formatting and content information inside a document.

6
00:00:48,000 --> 00:00:57,000
Whenever you download a web page, you're downloading a Hypertext document. Unlike many other document formats, such as Microsoft Word or PDF,

7
00:00:57,000 --> 00:01:07,000
Hypertext is all ASCII text. If you look at a document, the generally speaking aren't any characters you regular text reader can't display.

8
00:01:07,000 --> 00:01:18,000
So let's take as an example this excerpt from the Wikipedia page on HTTP's history. It has the word history in a larger font, some links shown in blue, an embedded image,

9
00:01:18,000 --> 00:01:24,000
and a few other nice bits of formatting such as the line under history that make it easier to read.

10
00:01:24,000 --> 00:01:32,000
Under the covers, the document looks like this. This is the Hypertext my browser downloaded to display this section.

11
00:01:32,000 --> 00:01:43,000
All of the formatting information is inside angle brackets. This less than H2 greater than, for example, means that this is a heading, so should be displayed bigger.

12
00:01:43,000 --> 00:01:53,000
You can see the word history outside any such formatting information. The word history on this snippet is displayed as a header, as you can see.

13
00:01:53,000 --> 00:02:03,000
So the basic level, a Hypertext document is just a text document, which your browser displays based on these special formatting commands and controls called tags.

14
00:02:03,000 --> 00:02:12,000
A Hypertext link, for example, is just a formatting tag that says, this stuff inside the tag, if clicked, should load this URL.

15
00:02:12,000 --> 00:02:23,000
The tag that does this is the A tag. See here, for an example, the A tag, on line 227, for a link to the HTTP version 0.9.

16
00:02:23,000 --> 00:02:32,000
When you click on that link, it takes you to this URL, HTTP www.w3.org, Pug, etc.

17
00:02:43,000 --> 00:02:54,000
But there's one way in which a Hypertext document is more than just formatting. With Hypertext, you can embed documents or files inside other files.

18
00:02:54,000 --> 00:03:04,000
The simplest example of this on the Wikipedia page is the image. The bits of this image aren't stored in the Hypertext document that wouldn't be human readable ASCII text.

19
00:03:05,000 --> 00:03:16,000
Instead, there's a way to, in a Hypertext document, say, load this other document and put it there. Take a look at line 220. You'll see an image, or IMG tag.

20
00:03:19,000 --> 00:03:30,000
The IMG tag says, load the image from this URL and displayed here. When your browser loads the Hypertext for the Wikipedia page, it sees tags like this one and automatically requests the files they reference.

21
00:03:31,000 --> 00:03:42,000
So when you load the page, your browser automatically requests the image and displays it. There are all kinds of resources, besides images, that a web page can reference.

22
00:03:42,000 --> 00:03:56,000
Other pages, style sheets, fonts, scripts, and more. Let's look at an example. I'm going to request the web page for the New York Times and use my browser's developer tools to see all of the requests this results in.

23
00:03:56,000 --> 00:04:05,000
As you can see, I request something on the order of 20 documents ranging from Hypertext to images to ads.

24
00:04:05,000 --> 00:04:17,000
In HTTP, a client opens a TCP connection to a server and sends commands to it. The most common command is GET, which requests the page.

25
00:04:18,000 --> 00:04:32,000
HTTP is designed to be a document-centric way for programs to communicate. For example, if I type HTTP www.stanford.edu in my browser, the browser opens a connection to the server www.stanford.edu and sends a GET request for the root page of that site.

26
00:04:32,000 --> 00:04:38,000
The server receives the request, checks if it's valid, if the user can access that page and sends a response.

27
00:04:39,000 --> 00:04:52,000
The response has an America code associated with it. For example, if the server sends a 200 OK response to a GET, this means that the request was accepted and the rest of the responses in the document data.

28
00:04:55,000 --> 00:05:02,000
In the example of www.stanford.edu, a 200 OK response would include the Hypertext that describes the main Stanford page.

29
00:05:03,000 --> 00:05:08,000
There are other kinds of requests such as put, delete, and info, as well as other responses such as 400 bad requests.

30
00:05:09,000 --> 00:05:22,000
Like Hypertext itself, HTTP is all-and-asky text. It's human readable. For example, the beginning of a GET request for the New York Times looks like this. Get slash HTTP 1.1.

31
00:05:22,000 --> 00:05:37,000
The beginning of a response to a successful request looks like this. HTTP 1.1, 200 OK.

32
00:05:40,000 --> 00:05:49,000
But the basic model is simple. Client sends a request by writing to the connection. The server reads the request, processes it, and reads a response to the connection, which the client then reads.

33
00:05:50,000 --> 00:05:54,000
The data of the client reads might then cause it to issue more GET requests.

34
00:05:56,000 --> 00:06:04,000
This is what an HTTP request looks like. The first line, ASCII text, says the method such as GET, the URL for the method, and then the version of the HTTP being used.

35
00:06:05,000 --> 00:06:10,000
The white boxes represent spaces, such as space between method and URL, as well as between URL and version.

36
00:06:11,000 --> 00:06:18,000
The left arrow means carriage return, a way to say go to the beginning of the line, and the down arrow means new line, a way to say go to a new line.

37
00:06:19,000 --> 00:06:30,000
So, for example, my prior example requesting the URL, the method will be GET, the URL will be, say, full duplex index.html, and the version will be most likely the HTTP 1.1.

38
00:06:31,000 --> 00:06:40,000
After this first line, the request itself, there's zero or more headers. There's one header per line. Each header line starts with a header field name, followed by the value.

39
00:06:41,000 --> 00:06:45,000
After the headers, there's an empty line, followed by the body of the message.

40
00:06:46,000 --> 00:06:50,000
Wait, why might a request have a body? What's the body of a request?

41
00:06:51,000 --> 00:07:02,000
In the case of the GET method, to request a page, the body is empty, but HTTP supports other requests, other methods, such as post, which sends data, for example, when you fill out a form and submit it.

42
00:07:03,000 --> 00:07:05,000
Post requests often have a body.

43
00:07:06,000 --> 00:07:14,000
So, let's see what this looks like. I'm going to request HTTP www.sing.edu slash full duplex slash index.html.

44
00:07:15,000 --> 00:07:20,000
There's a web page on my now-graduated PhD students wrote to describe some neat research they didn't wireless networks.

45
00:07:21,000 --> 00:07:25,000
I'm going to open up the developer tools and Firefox, which lets me see requests and responses.

46
00:07:26,000 --> 00:07:33,000
You can see these are requests for a full duplex slash index.html, HTTP 1.1, followed by a bunch of headers.

47
00:07:34,000 --> 00:07:42,000
One header that's important for this request is if modified sense. This is a way for the client to tell the server to only give the document if it's been modified since that time.

48
00:07:43,000 --> 00:07:49,000
If the document has been modified since that time stamp, the server responds to the 200 OK, the new copy of the document.

49
00:07:50,000 --> 00:07:52,000
Otherwise, it responds to the 304 not modified.

50
00:07:53,000 --> 00:07:56,000
This header is useful when your client caches pages, which most web browsers do.

51
00:07:57,000 --> 00:08:01,000
Rather than transfer the same document again and again, the client can tell the server to transfer it conditionally.

52
00:08:02,000 --> 00:08:06,000
If the server responds to the 304, the client just can use its cached copy.

53
00:08:07,000 --> 00:08:16,000
An HTTP response looks similar. The first line has the HTTP version, the status code, and the phrase associated with that status code, such as 200 OK or 404 not found.

54
00:08:17,000 --> 00:08:20,000
Then there's zero more headers of blank line in the body of the response.

55
00:08:21,000 --> 00:08:24,000
Let's see what the response to my get request looks like.

56
00:08:25,000 --> 00:08:30,000
It's a 304. This web page has not been modified since my browser first put it in its cache.

57
00:08:31,000 --> 00:08:38,000
Now if I clear my browser cache and request the page again, the request doesn't have a modified since header, so the response is a 200 OK.

58
00:08:39,000 --> 00:08:44,000
The developer tools on Firefox let you see the request response pair, but not their actual formats.

59
00:08:45,000 --> 00:08:47,000
For that, I'm going to do something much simpler.

60
00:08:48,000 --> 00:08:50,000
I'm going to use the TellNet program to connect to a web server.

61
00:08:51,000 --> 00:08:55,000
TellNet opens the TCP connection. It writes what you type to the socket and prints out what it reads.

62
00:08:56,000 --> 00:09:06,000
So tellNet to sing.stantford.edu, port 80, and type get slash full duplex slash index.html, HTTP slash 1.0.

63
00:09:07,000 --> 00:09:16,000
A lot of HTML comes back. If I scroll to the top, I can see the HTTP response 200 OK with a bunch of headers, a new line, then the body, the HTML, the page.

64
00:09:17,000 --> 00:09:20,000
The content length header tells me how long the body is.

65
00:09:20,000 --> 00:09:28,000
HTTP is a cornerstone protocol of the modern internet. When it was originally document-centric designed to fetch pages and documents, today it's used for much more.

66
00:09:29,000 --> 00:09:32,000
A document, for example, can be a script that your browser executes as part of an application.

67
00:09:33,000 --> 00:09:38,000
The basic model, however, of requesting URLs and receiving responses still holds.

68
00:09:39,000 --> 00:09:47,000
One nice thing about HTTP is that it's human readable text. You can type in HTTP request and read the response as you saw me doing by town letting to port 80.

69
00:09:48,000 --> 00:09:54,000
And encourage you to play around a bit to use the developer tools near Bowser to see what's requested and learn more about the details of the protocol.

70
00:09:55,000 --> 00:10:00,000
So that's the basics of the protocol, request, response. HTTP 1.0 is very simple.

71
00:10:01,000 --> 00:10:12,000
A client wanting to request a document opens a connection, it sends a get request, the server responds to the status code such as 200 OK, the document, and closes the connection once the response is complete.

72
00:10:13,000 --> 00:10:17,000
If the client wants to request a second document, it must open a second connection.

73
00:10:18,000 --> 00:10:26,000
When the web is mostly text, with maybe an image or two, this approach works just fine. People hand wrote their web pages, putting in all of the formatting.

74
00:10:27,000 --> 00:10:34,000
So let's walk through how long this takes. Let's make some simplifying assumptions. The web server can respond immediately so there's no process in delay.

75
00:10:35,000 --> 00:10:42,000
The latency between the client and server is 50 milliseconds. An HTTP request is a full TCP segment.

76
00:10:43,000 --> 00:10:51,000
Response is two full segments to the size of a small initial slow start congestion window. That way we're not going to have to worry about window sizes or congestion control.

77
00:10:52,000 --> 00:11:01,000
The packetization delay before segment is 10 milliseconds. So the total packetization delay request is 10 milliseconds and a reply is 20 milliseconds.

78
00:11:02,000 --> 00:11:08,000
It can assume that the links are full duplex, such that a node can simultaneously receive and transmit all on the same link.

79
00:11:09,000 --> 00:11:13,000
This means the packetization delay of a request does not affect the packetization delay of a response.

80
00:11:14,000 --> 00:11:21,000
Let's finally assume that TCP segments with no data, such as a three-way hench-jake and act packets, have a packetization delay of zero.

81
00:11:22,000 --> 00:11:25,000
Finally, we can have up to two open connections.

82
00:11:26,000 --> 00:11:32,000
So let's consider a first case. You want to load a single page. How long will this take?

83
00:11:33,000 --> 00:11:42,000
First, there is the latency of sending a sin to 50 milliseconds. There's the latency of the set-ac, so another 50 milliseconds.

84
00:11:43,000 --> 00:11:48,000
On receiving the sin-ac, the client can send the act of the three-way hench-jake followed by the request.

85
00:11:49,000 --> 00:11:57,000
The request has a packetization delay of 10 milliseconds, so this takes 60 milliseconds. The server then needs to send the response back.

86
00:11:58,000 --> 00:12:03,000
The packetization delay of the response is 20 milliseconds, so this step takes 70 milliseconds.

87
00:12:05,000 --> 00:12:13,000
So the total delay is 50 milliseconds plus 50 milliseconds plus 60 milliseconds plus 70 milliseconds or 230 milliseconds.

88
00:12:14,000 --> 00:12:19,000
Let's look at a more complex example. There's a page that loads two images.

89
00:12:20,000 --> 00:12:27,000
We can break this into two steps. In the first step, the client requests the page. In the second step, it uses two connections to request the images.

90
00:12:28,000 --> 00:12:38,000
The first step will take a same length as our single page example. There's 100 milliseconds for the setup, then 130 milliseconds for the request in response.

91
00:12:39,000 --> 00:12:46,000
The second step is a bit trickier. Remember, when we have separate TCP connections, they are sharing the same length.

92
00:12:47,000 --> 00:12:54,000
This means that the packetization delay of one request affects the other. Setting up the two connections will take 100 milliseconds.

93
00:12:55,000 --> 00:12:58,000
But how long will it take for the two request responses to complete?

