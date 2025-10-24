---
title: CS144 NetworkP1158 2dTCPHijack
---

1
00:00:00,000 --> 00:00:06,000
By now you've seen several different ways to attack a computer. Pretty scary stuff.

2
00:00:06,000 --> 00:00:13,000
We can force the network to broadcast packets or reroute packets to a malicious server.

3
00:00:13,000 --> 00:00:21,000
And in this video we're going to see another scary example. In this case, Alison Bob are happily communicating over a TCP connection.

4
00:00:21,000 --> 00:00:27,000
And Evie is going to step in right into the middle of that TCP connection and hijack it after it started.

5
00:00:27,000 --> 00:00:33,000
She's going to manipulate the data inside the connection without either side knowing that she's doing it.

6
00:00:33,000 --> 00:00:42,000
The attack is pretty tricky. It's more tricky than the other ones because Evie has to figure out the current state of the TCP connection between Alison Bob.

7
00:00:42,000 --> 00:00:52,000
In order to send data and acts that fall into the right range of sequence numbers and don't screw up the TCP state of the state machines at both ends of the connection.

8
00:00:52,000 --> 00:00:55,000
Let's see how this works.

9
00:00:56,000 --> 00:01:11,000
Just as we saw in the SSH Man in the Middle Attack, Evie the attacker is going to broadcast falsified art messages over the local area network, causing Alice to think that she should use Evie's MAC address to reach Bob.

10
00:01:11,000 --> 00:01:20,000
At the same time, the falsified art packets cause Bob to think that he should also use Evie's MAC address to reach Alice.

11
00:01:20,000 --> 00:01:26,000
Therefore, all of the TCP traffic between Alison Bob will actually be routed through Evie.

12
00:01:26,000 --> 00:01:32,000
Evie will simply act as a bridge between Alison Bob passing TCP requests and responses back and forth.

13
00:01:32,000 --> 00:01:39,000
And Evie will look for patterns in the TCP segments waiting for the chance to hijack and manipulate the connection.

14
00:01:39,000 --> 00:01:42,000
Let's take a look in more detail.

15
00:01:43,000 --> 00:01:49,000
Just like with the other demos, I'm going to demonstrate the example using the Mininet Emulation System.

16
00:01:49,000 --> 00:01:55,000
You can easily and safely run this one yourself on your own computer and in a minute I'll tell you how.

17
00:01:55,000 --> 00:01:59,000
This example was created by Sean Choi, shown here.

18
00:01:59,000 --> 00:02:06,000
First, let's verify that under normal conditions, Evie cannot hijack and manipulate TCP connections between Alison Bob.

19
00:02:06,000 --> 00:02:14,000
The type of TCP application we're going to use is HTTP, an application protocol that of course we're all very familiar with by now.

20
00:02:15,000 --> 00:02:26,000
Alice is requesting a web page from Bob and Bob is running a simple HTTP server on his computer and will respond with a static web page from his local file system.

21
00:02:26,000 --> 00:02:33,000
As we can see, Alice has received a correct web page with no malicious information.

22
00:02:33,000 --> 00:02:45,000
Next, Ev runs an attack in which she sends falsified ARP packets, causing both Alison Bob to think that they should use Evie's MAC address to reach each other.

23
00:02:45,000 --> 00:02:50,000
All traffic meant for Alice and Bob now goes to Evie instead.

24
00:02:50,000 --> 00:03:01,000
Eticaap is a nice tool that lets us easily perform this attack. Eticaap also helps us to hijack TCP connections and manipulate what is sent to the receiver.

25
00:03:02,000 --> 00:03:07,000
We now turn on ARP spoofing and start sniffing the network using Eticaap.

26
00:03:07,000 --> 00:03:12,000
Now we'll send another HTTP request from Alice to Bob.

27
00:03:12,000 --> 00:03:19,000
Detecting some packets as defined in our filter, Evie will capture the packet and manipulate the contents of the web page.

28
00:03:19,000 --> 00:03:24,000
We can now see the manipulated pay arriving at Alice.

29
00:03:24,000 --> 00:03:32,000
Also, we can see the connection information between Alice and Bob on Eticaap, indicating that Ev's dropping is also possible.

30
00:03:32,000 --> 00:03:36,000
We have successfully hijacked the TCP connection.

31
00:03:36,000 --> 00:03:43,000
If you would like, you can reproduce this demo by following the detailed instructions at the following GitHub location.

