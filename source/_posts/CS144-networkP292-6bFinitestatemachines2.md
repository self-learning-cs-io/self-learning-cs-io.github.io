---
title: CS144 NetworkP292 6bFinitestatemachines2
---

1
00:00:00,000 --> 00:00:05,280
Here's a quiz. For this quiz, assume there is no other documentation of the

2
00:00:05,280 --> 00:00:09,240
TCP finite state machines. There's no supporting textual description which defines

3
00:00:09,240 --> 00:00:15,259
other state transitions. In this first question, suppose the finite state

4
00:00:15,259 --> 00:00:19,240
machine starts in the closed state, and the user program calls listen on the

5
00:00:19,240 --> 00:00:24,240
socket. The socket receives a sin message before any other event arrives the user

6
00:00:24,239 --> 00:00:30,239
program calls closed. What state will the socket be in? For the second question,

7
00:00:30,239 --> 00:00:33,879
suppose the finite state machine starts in the closed state, then the user

8
00:00:33,879 --> 00:00:37,879
program calls connect, and before any other event arrives, the user program calls

9
00:00:37,879 --> 00:00:41,640
close. What state will the socket be in?

