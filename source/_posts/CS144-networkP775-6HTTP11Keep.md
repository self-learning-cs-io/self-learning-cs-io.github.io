---
title: CS144 NetworkP775 6HTTP11Keep
---

1
00:00:00,000 --> 00:00:06,000
In this segment, I'm going to cover one very important optimization that occurred in HTTP1.1,

2
00:00:06,000 --> 00:00:09,000
something called the Keep Alive header.

3
00:00:09,000 --> 00:00:12,000
HTTP is a basic request response protocol.

4
00:00:12,000 --> 00:00:14,000
HTTP1.0 is very simple.

5
00:00:14,000 --> 00:00:18,000
A client wanting to request a document opens a connection.

6
00:00:18,000 --> 00:00:20,000
It sends a get request.

7
00:00:20,000 --> 00:00:24,000
The server responds to the status code, such as 200 OK, the document,

8
00:00:24,000 --> 00:00:27,000
and closes the connection once the response is complete.

9
00:00:28,000 --> 00:00:32,000
If the client wants to request a second document, it must open a second connection.

10
00:00:32,000 --> 00:00:35,000
When the web was mostly text, would maybe be an image or two,

11
00:00:35,000 --> 00:00:37,000
this approach worked just fine.

12
00:00:37,000 --> 00:00:41,000
People handraped their web pages, putting in all of the formatting.

13
00:00:41,000 --> 00:00:45,000
Recall our results from analyzing HTTP1.0.

14
00:00:45,000 --> 00:00:49,000
Loading a single page with these parameters takes 230 milliseconds.

15
00:00:49,000 --> 00:00:52,000
Loading a page with two images takes over twice as long.

16
00:00:53,000 --> 00:00:57,000
Law of this time is spent opening connections, and if we could request more documents at once,

17
00:00:57,000 --> 00:00:59,000
it could be much faster.

18
00:00:59,000 --> 00:01:03,000
So the approach HTTP1.0 uses can be really wasteful.

19
00:01:03,000 --> 00:01:06,000
A client spent a lot of time opening connections.

20
00:01:06,000 --> 00:01:10,000
Furthermore, the TCP congestion window doesn't get a chance to grow,

21
00:01:10,000 --> 00:01:13,000
since each connection has a new window.

22
00:01:13,000 --> 00:01:19,000
HTTP1.1 solves this problem by adding a few headers to requests and responses.

23
00:01:19,000 --> 00:01:23,000
Our requests can include a connection header, which tells the server

24
00:01:23,000 --> 00:01:27,000
whether it would like the connection to be kept open after the response, or closed.

25
00:01:27,000 --> 00:01:30,000
The server can do whatever it wants, but the client can give it a hint.

26
00:01:30,000 --> 00:01:35,000
For example, if you're requesting a basic text file, there's no reason to keep the connection open,

27
00:01:35,000 --> 00:01:39,000
as the text file won't reference other things to load.

28
00:01:39,000 --> 00:01:44,000
Our response includes a connection header, which tells the client what the server decided to do.

29
00:01:44,000 --> 00:01:48,000
If it decided to keep alive the connection, then the keep alive header tells the client for how long.

30
00:01:49,000 --> 00:01:53,000
Now, the client can send further requests on the same connection.

31
00:01:53,000 --> 00:01:57,000
It can also open more connections if it wants, but it doesn't have to.

32
00:01:57,000 --> 00:01:59,000
So it turns out this is a big deal.

33
00:01:59,000 --> 00:02:02,000
Let's consider a more realistic case than before,

34
00:02:02,000 --> 00:02:07,000
with a packetization delay is only one millisecond, and the page loads 11 images.

35
00:02:07,000 --> 00:02:10,000
Now browsers today usually have more than two open connections,

36
00:02:10,000 --> 00:02:13,000
but they also load more than 11 resources on a typical page,

37
00:02:13,000 --> 00:02:16,000
so we'll just keep these numbers small for simplicity.

38
00:02:17,000 --> 00:02:22,000
We're going to use the same analysis we use when looking at HTTP1.0 in the HTTP1.0 video.

39
00:02:22,000 --> 00:02:27,000
The slow start window is big enough that we'll never hit congestion control.

40
00:02:27,000 --> 00:02:33,000
For HTTP1.0, this will take 1,421 milliseconds.

41
00:02:33,000 --> 00:02:36,000
There are seven rounds, and the first round we request a page.

42
00:02:36,000 --> 00:02:39,000
This takes 203 milliseconds.

43
00:02:39,000 --> 00:02:42,000
In the next six rounds, we request two images each,

44
00:02:42,000 --> 00:02:45,000
except for the last round where we request only one image.

45
00:02:46,000 --> 00:02:51,000
Each round takes 203 milliseconds, so the total time is 203 milliseconds,

46
00:02:51,000 --> 00:02:56,000
plus 1,000 to 180 milliseconds, for 1.421 seconds.

47
00:02:58,000 --> 00:03:04,000
Now for HTTP1.1, this will take only 326 milliseconds.

48
00:03:04,000 --> 00:03:07,000
We set up the connection that takes 100 milliseconds,

49
00:03:07,000 --> 00:03:10,000
requesting the page takes another 103 milliseconds.

50
00:03:11,000 --> 00:03:16,000
Requesting the 11 images, though, takes only 123 milliseconds.

51
00:03:16,000 --> 00:03:19,000
That's 51 milliseconds for the first request,

52
00:03:19,000 --> 00:03:23,000
and 72 milliseconds for the 11 responses.

53
00:03:23,000 --> 00:03:28,000
The female seconds of latency, plus 22 milliseconds of packetization delay.

54
00:03:28,000 --> 00:03:33,000
So HTTP1.1 is over 4 times faster,

55
00:03:33,000 --> 00:03:37,000
because we can send these requests back to back in a single connection

56
00:03:37,000 --> 00:03:40,000
and don't have to open new connections.

57
00:03:43,000 --> 00:03:47,000
HTTP1.1 has been around for a while since 1997 or so.

58
00:03:47,000 --> 00:03:51,000
Very recently, Google has developed a new protocol called Speedy

59
00:03:51,000 --> 00:03:54,000
that improves on HTTP.

60
00:03:54,000 --> 00:03:57,000
It does things like allow request pipelining,

61
00:03:57,000 --> 00:04:03,000
so one issue HTTP sometimes run into is that the order in which a client request resources

62
00:04:03,000 --> 00:04:06,000
is the same that the server responds.

63
00:04:06,000 --> 00:04:10,000
So this can be a problem with some resources required a lot of processing.

64
00:04:10,000 --> 00:04:13,000
Say you have a dynamically generated web page

65
00:04:13,000 --> 00:04:16,000
through something like Ruby on Rails or Django.

66
00:04:16,000 --> 00:04:18,000
Your database is overloaded,

67
00:04:18,000 --> 00:04:21,000
and so it's going to take a while to generate the page.

68
00:04:21,000 --> 00:04:26,000
But most of the resources are just images that can be sent quickly.

69
00:04:26,000 --> 00:04:29,000
If the client requests the slow page first,

70
00:04:29,000 --> 00:04:33,000
it won't receive any of the images until it receives the page.

71
00:04:33,000 --> 00:04:36,000
It would be nice if the server could respond in a different order

72
00:04:36,000 --> 00:04:40,000
and say start sending the images while the page is being generated.

73
00:04:40,000 --> 00:04:43,000
Speedy also removes redundant headers.

74
00:04:43,000 --> 00:04:47,000
Open up WireShark and look some HTTP requests and responses.

75
00:04:47,000 --> 00:04:51,000
Very often, there's a lot of redundant information each response and request.

76
00:04:51,000 --> 00:04:55,000
If you could just set some parameters such as the browser type for the duration of the session,

77
00:04:55,000 --> 00:05:00,000
rather than send it each time, that would speed things up a lot.

78
00:05:00,000 --> 00:05:04,000
So speedy has been a little while, and it's becoming the basis of HTTP 2.0.

79
00:05:04,000 --> 00:05:08,000
In a few years, I suspect most sites will be using HTTP 2.0

80
00:05:08,000 --> 00:05:12,000
because the speed to benefit the brain, especially for mobile devices.

