---
title: CS144 NetworkP745 5cHTTPQuiz1Explanation
---

1
00:00:00,000 --> 00:00:07,000
The answer is that it will take 150 milliseconds, so 250 milliseconds in total.

2
00:00:07,000 --> 00:00:14,000
In this figure, blue lines are segments from the client to server, and red are from the server to client.

3
00:00:14,000 --> 00:00:19,000
The SIN-SINAC exchange takes 100 milliseconds.

4
00:00:19,000 --> 00:00:23,000
The first request takes 60 milliseconds to arrive.

5
00:00:23,000 --> 00:00:28,000
At which point 160 milliseconds, the server can begin sending a response.

6
00:00:28,000 --> 00:00:32,000
It incuses two segments to send.

7
00:00:32,000 --> 00:00:41,000
As the first response segment goes out over the link, the server receives the second request, and it incuses two more response segments.

8
00:00:41,000 --> 00:00:49,000
This means that the responses will take a total of 90 milliseconds to arrive after the first request arrives.

9
00:00:49,000 --> 00:00:56,000
The additional packetization delay of the second request is masked by the queuing of responses.

10
00:00:56,000 --> 00:01:00,000
So this means that it will take a total of 480 milliseconds.

11
00:01:00,000 --> 00:01:08,000
230 milliseconds for the initial request response of the HTTP page, then an additional 250 milliseconds to fetch the two images.

