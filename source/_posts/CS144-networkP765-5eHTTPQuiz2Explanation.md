---
title: CS144 NetworkP765 5eHTTPQuiz2Explanation
---

1
00:00:00,000 --> 00:00:06,240
The answer to case 1 is 95 milliseconds. The setup is 20 milliseconds. The act

2
00:00:06,240 --> 00:00:11,519
requests is 25 milliseconds and the response is 30 milliseconds. So 95 milliseconds

3
00:00:11,519 --> 00:00:20,640
total. The answer to case 2 is 380 milliseconds. It takes 95 milliseconds to load

4
00:00:20,640 --> 00:00:26,280
the initial page. It then takes 95 milliseconds to load image 1. When image 1

5
00:00:26,280 --> 00:00:32,120
finishes, image 3 starts. Meanwhile, image 2 is already in flight. So that's 95

6
00:00:32,120 --> 00:00:37,520
milliseconds. When image 3 completes, that's another 95 milliseconds. Since image 2

7
00:00:37,520 --> 00:00:42,640
has already completed, image 4 is in flight. It takes a final 95 milliseconds for

8
00:00:42,640 --> 00:00:49,840
image 5 for a total of 380 milliseconds. Let's look at this pictorially to see

9
00:00:49,840 --> 00:00:55,159
what's happening. This picture starts after the first initial page request. It

10
00:00:55,159 --> 00:01:01,039
showing what happens as the client requests images. So we start at 95 milliseconds.

11
00:01:01,039 --> 00:01:06,079
There's a pair of sin x. Sin x as the two connections start their three-way

12
00:01:06,079 --> 00:01:10,959
handshake. So 40 milliseconds later, at 135 milliseconds, the client sends

13
00:01:10,959 --> 00:01:19,159
request 1 at 135 milliseconds and then requests 2 at 140 milliseconds. Request 1

14
00:01:19,159 --> 00:01:23,879
arrives with the server at 165 milliseconds. 20 milliseconds of latency and

15
00:01:23,879 --> 00:01:28,920
5 milliseconds of packetization delay. The server starts sending the response.

16
00:01:28,920 --> 00:01:35,879
It's sent one segment of the response 1A when the second request arrives. The

17
00:01:35,879 --> 00:01:41,280
response segments for the second request are in queue and sent after response 1b.

18
00:01:41,280 --> 00:01:49,519
Response 1b arrives at the client at 190 milliseconds. At this point, the client

19
00:01:49,519 --> 00:01:55,399
opens a new connection through 3-way handshake. But note how long this took. The

20
00:01:55,399 --> 00:02:01,319
client is requesting the third image at 190 milliseconds. 95 milliseconds after

21
00:02:01,319 --> 00:02:08,120
the first request started. Because the second request is going in parallel, the

22
00:02:08,120 --> 00:02:11,319
client doesn't have to wait for it to complete before starting the third request.

23
00:02:11,319 --> 00:02:18,199
It will start the fifth request immediately after the third one completes. So

24
00:02:18,199 --> 00:02:24,679
these three rounds take on 95 milliseconds each. If we'd requested six images,

25
00:02:24,679 --> 00:02:30,959
then the final round would take 105 milliseconds. Look at this figure carefully

26
00:02:30,959 --> 00:02:36,079
until you understand what's going on. As requests are delayed from

27
00:02:36,079 --> 00:02:41,560
delay going out from queuing, they delay the responses. As responses are delayed

28
00:02:41,560 --> 00:02:47,079
from going out due to queuing, they delay further requests. Over time, this causes

29
00:02:47,080 --> 00:02:50,719
the request and responses to naturally space themselves out, reducing queuing

30
00:02:50,719 --> 00:02:55,120
delay. And because we have multiple operations in parallel, they can mask

31
00:02:55,120 --> 00:03:00,120
each other's latencies. If you look at these numbers and think about them a bit,

32
00:03:00,120 --> 00:03:04,439
you should see that the requesting multiple resources in parallel doesn't take

33
00:03:04,439 --> 00:03:07,760
much longer than requesting a single resource. There's additional

34
00:03:07,760 --> 00:03:11,600
packetization delay. But in most networks today, packetization delay is a tiny

35
00:03:11,600 --> 00:03:15,320
fraction of the overall time. A single request can't follow the network capacity,

36
00:03:15,319 --> 00:03:20,359
but many requests might be able to. HTTP only allows a single request per

37
00:03:20,359 --> 00:03:22,759
connection though.

