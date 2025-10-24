---
title: CS144 NetworkP1148 2cDemoSSHManintheMiddleAttack
---

1
00:00:00,000 --> 00:00:06,000
In this video, I'm going to show you a demo of SSH Man in the Middle Attack.

2
00:00:06,000 --> 00:00:11,000
Sean, who's sitting here with me, created this demo in MiniNet.

3
00:00:11,000 --> 00:00:16,000
In the demo, we're going to demonstrate how a malicious attacker can eavesdrop on the traffic

4
00:00:16,000 --> 00:00:20,000
between an SSH client and an SSH server.

5
00:00:20,000 --> 00:00:25,000
There's going to use a method that we call up spoofing, which allows the attacker

6
00:00:25,000 --> 00:00:31,000
to become the so-called Man in the Middle between two communicating parties.

7
00:00:31,000 --> 00:00:36,000
In the demo, eaves the attacker is going to broadcast falsified art messages

8
00:00:36,000 --> 00:00:42,000
over the local area network, causing Alice to think that she should use eavesmacadress

9
00:00:42,000 --> 00:00:44,000
to reach Bob.

10
00:00:44,000 --> 00:00:50,000
Similarly, and at the same time, these falsified art messages cause Bob to think

11
00:00:50,000 --> 00:00:55,000
that he should also use eavesmacadress to reach Alice.

12
00:00:55,000 --> 00:01:00,000
And so, when Alice requests an SSH connection to Bob,

13
00:01:00,000 --> 00:01:06,000
the switch will instead route the connection request to Eve instead of Bob.

14
00:01:06,000 --> 00:01:11,000
Eve is going to make herself the Man in the Middle, or more precisely the woman in the Middle,

15
00:01:11,000 --> 00:01:19,000
by simply forwarding the packet's unchanged to Bob, while eavesdropping and storing SSH data in the Middle.

16
00:01:19,000 --> 00:01:26,000
This technique is called a Man in the Middle attack, as described in the class video.

17
00:01:26,000 --> 00:01:29,000
Okay, let's see how this works in more detail.

18
00:01:29,000 --> 00:01:33,000
Just like in the other demos, we're going to demonstrate the example on the MiniNet emulation system.

19
00:01:33,000 --> 00:01:37,000
This means you can easily and safely run it yourself on your own computer.

20
00:01:37,000 --> 00:01:40,000
I'll tell you shortly how you do that.

21
00:01:40,000 --> 00:01:47,000
Okay, first, let's verify that under normal conditions, Eve cannot eavesdrop on Alice.

22
00:01:47,000 --> 00:01:53,000
Alice is sending Pings to Bob, while Eve is running TCP dump on her machine,

23
00:01:53,000 --> 00:01:57,000
trying to listen in on traffic from Alice's IP address.

24
00:01:57,000 --> 00:02:02,000
Alice's IP address is 192.168.0.3.

25
00:02:02,000 --> 00:02:07,000
As you can see, TCP dump running on Eve's machine doesn't capture any traffic at all.

26
00:02:07,000 --> 00:02:13,000
Eve can't see any of the traffic that is going between Alice and Bob.

27
00:02:13,000 --> 00:02:18,000
Whereas TCP dump running on Bob's machine correctly sees the packets from Alice,

28
00:02:18,000 --> 00:02:22,000
as we would expect everything is working as it should.

29
00:02:22,000 --> 00:02:29,000
Next, Eve is going to run her attack by sending falsified app data,

30
00:02:29,000 --> 00:02:35,000
which causes the switch to learn that both Alice and Bob have eaves, MAC address.

31
00:02:35,000 --> 00:02:42,000
This causes all traffic meant for Alice and Bob to go to Eve instead.

32
00:02:42,000 --> 00:02:45,000
Etcapp is a nice tool that lets us easily perform this attack.

33
00:02:45,000 --> 00:02:52,000
It also helps us decrypt SSH data by forcing clients and servers to use SSH version 1,

34
00:02:52,000 --> 00:02:56,000
which is an older and less secure version of SSH.

35
00:02:56,000 --> 00:03:03,000
Etcapp also saves the decoded SSH data locally for us so we can inspect it.

36
00:03:03,000 --> 00:03:11,000
So we now turn on our spoofing and start sniffing the network using Etcapp.

37
00:03:11,000 --> 00:03:17,000
After starting the up spoofing, Eve's TCP dump can now successfully see the packets

38
00:03:17,000 --> 00:03:20,000
that are sent by Alice to Bob.

39
00:03:20,000 --> 00:03:26,000
Next, let's create an SSH connection from Alice to Bob.

40
00:03:26,000 --> 00:03:30,000
We can already see that Etcapp has captured the connection

41
00:03:30,000 --> 00:03:35,000
and decoded the username and password that Alice has provided for authentication.

42
00:03:36,000 --> 00:03:43,000
Also, we can view all the decoded SSH activity between Alice and Bob in a log file on Eve's machine.

43
00:03:43,000 --> 00:03:52,000
And so with successfully Eve's drop in SSH connection using a so-called man in the middle attack.

44
00:03:52,000 --> 00:03:57,000
If you would like, you can reproduce this demo by following the detailed instructions

45
00:03:57,000 --> 00:04:01,000
at the following GitHub location.

