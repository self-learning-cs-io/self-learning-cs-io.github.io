---
title: CS144 NetworkP131 9aIPv4addresses
---

1
00:00:00,000 --> 00:00:06,000
The Internet Protocol has two computers to exchange messages across a network that's built up out of many different link layers.

2
00:00:06,000 --> 00:00:12,000
It does so through addresses. An IP packet has a source and a destination address.

3
00:00:12,000 --> 00:00:17,000
Router should decide which link to forward a packet based on the Pets Packets destination address.

4
00:00:17,000 --> 00:00:23,000
Let's look in detail what IP version for addresses look like, how they're formatted, and how they're allocated.

5
00:00:23,000 --> 00:00:28,000
The original goal of the Internet Protocol was to take many different networks and stitch them together.

6
00:00:28,000 --> 00:00:35,000
For this to work, the protocol needed a way to refer to a computer that was independent of the network it was on and was unique.

7
00:00:35,000 --> 00:00:42,000
So, computer on IBM network and a computer connected to a router or a serial line can talk to each other and need a way to address each other.

8
00:00:42,000 --> 00:00:50,000
Today, IPv4 addresses are a bit more complicated. They're not totally unique due to a bunch of special cases and uses, but for now less to assume that they're unique.

9
00:00:51,000 --> 00:01:01,000
An Internet Protocol version for address is 32 bits long. These 32 bits are often written as 4 octets. That is 4 8-bit values in the form a.b.c.d.

10
00:01:01,000 --> 00:01:13,000
Here are three examples, 171.64.64.64.128.30.76.82 and 12.22.58.30.

11
00:01:14,000 --> 00:01:24,000
Every device connected through IPv4 has an IPv4 address. The IP layer delivers packets whose destination is this address to that device.

12
00:01:24,000 --> 00:01:37,000
In addition to an address, a device typically also has something called a netmask. A netmask tells you which IP addresses are local on the same length of the same network and which require going through an IP router.

13
00:01:37,000 --> 00:01:46,000
For example, a lot think of a laptop on a wireless network. In order to send a packet to another device in the same wireless network, you don't need to go through an IP router.

14
00:01:46,000 --> 00:01:51,000
You can theory just send a packet directly to the other device since it's in the same wireless network.

15
00:01:52,000 --> 00:02:06,000
A netmask is written as a string of consecutive ones starting with the most significant bit. A netmask of 255.255.255.0 for example means the first three octets are all ones. 2 to the 8th minus 1 is 255.

16
00:02:07,000 --> 00:02:15,000
And the last octet is 0. This means that an IP address of its mass is the first three octets. 24 bits of your IP address is on the same network.

17
00:02:15,000 --> 00:02:25,000
A netmask of 255.255.252.0 means the netmask is 22 bits long while 255.128.0.0 is a 9 bit netmask.

18
00:02:25,000 --> 00:02:34,000
You can tell whether two computers are in the same network by taking a bitwise and of their addresses within netmask. If the resulting addresses are equal, they are in the same network.

19
00:02:35,000 --> 00:02:44,000
Let's see what this looks like on my computer. I'm going to open up a terminal and use the IF config program. My computer is connected to the internet over Wi-Fi which happens to be the link named EN1.

20
00:02:44,000 --> 00:02:52,000
If we look inside the information for EN1, we can see that my internet protocol version for our address is 192.168.0.106.

21
00:02:53,000 --> 00:03:00,000
My netmask is 0xFFFFFF00 which is hexadecimal for 255.255.255.0.

22
00:03:00,000 --> 00:03:11,000
This means that if I send an IP package to an address beginning with 192.168.0, I should send it directly. But if it doesn't begin with 192.168.0, I need to send it through a router.

