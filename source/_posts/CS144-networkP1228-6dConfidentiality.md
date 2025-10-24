---
title: CS144 NetworkP1228 6dConfidentiality
---

1
00:00:00,000 --> 00:00:05,000
So one time paths are generally impractical.

2
00:00:05,000 --> 00:00:13,000
Instead, what we want is a cryptosystem where we can distribute a small key K, say 128 or 256 bits.

3
00:00:13,000 --> 00:00:18,000
We somehow share this key beforehand, for example, over the phone or write it down in exchange with a handshake.

4
00:00:18,000 --> 00:00:23,000
We then use this K to encrypt a much larger message M.

5
00:00:23,000 --> 00:00:31,000
We then call encrypt e, pass in the plain text message M and declare K to produce the ciphertext c.

6
00:00:31,000 --> 00:00:37,000
Now, unlike a one-time pad, it might be there's only one possible M that produces the ciphertext.

7
00:00:37,000 --> 00:00:42,000
But we believe it's computational and tractable to find this M.

8
00:00:42,000 --> 00:00:50,000
You could try out possible keys, but decrypting 220 at their 300 undiscillion keys would take a very, very long time.

9
00:00:50,000 --> 00:00:54,000
Supposedly it will take you only a single instruction to decrypt the message.

10
00:00:54,000 --> 00:01:00,000
Let's suppose your processor core is 4 gigahertz, and let's suppose your processor is 4 billion cores.

11
00:01:00,000 --> 00:01:07,000
We'll still take 4 billion of these computers 31 years to decrypt such a message.

12
00:01:07,000 --> 00:01:11,000
Now there are two kinds of symmetric ciphers, stream and block.

13
00:01:11,000 --> 00:01:17,000
Stream ciphers generate a pseudo-random pad, a pseudo-random sequence of bits based on the key.

14
00:01:17,000 --> 00:01:21,000
You then encrypt e-crypt by exorring with a stream like a one-time pad.

15
00:01:21,000 --> 00:01:23,000
But it is not a one-time pad.

16
00:01:23,000 --> 00:01:27,000
Immediately mistrust anyone who says it is because they don't know what they're talking about.

17
00:01:27,000 --> 00:01:31,000
Generally speaking, stream ciphers have run into lots of problems in practice.

18
00:01:31,000 --> 00:01:34,000
Problems with stream ciphers typically stem from repetition.

19
00:01:34,000 --> 00:01:41,000
If you reuse the same pseudo-random sequence of bits, for example, reuse the same key out of two different messages,

20
00:01:41,000 --> 00:01:45,000
then adversaries can launch attacks like I showed with a two-time pad.

21
00:01:45,000 --> 00:01:49,000
The initial Wi-Fi encryption protocol wept, for example, used the stream cipher.

22
00:01:49,000 --> 00:01:58,000
It was shown to be broken about 2001 when Wi-Fi was starting to take off, and was replaced by WPA in 2003 and WPA2 in 2004.

23
00:01:58,000 --> 00:02:03,000
Now WPA2 uses something called a block cipher.

24
00:02:03,000 --> 00:02:10,000
A block cipher operates on fixed-sized blocks of data, say 64 bits or 128 bits.

25
00:02:11,000 --> 00:02:15,000
A block cipher maps a plain text block to a cipher text block.

26
00:02:15,000 --> 00:02:17,000
There are many block ciphers.

27
00:02:17,000 --> 00:02:22,000
Today, you should generally use AES, the advanced encryption standard.

28
00:02:26,000 --> 00:02:31,000
I'm going to walk through the basis of how one block cipher blowfish works, but be careful.

29
00:02:31,000 --> 00:02:34,000
I'm not explaining the algorithm in its entirety.

30
00:02:34,000 --> 00:02:38,000
I'm just trying to give you a feel for what a block cipher looks like and how it works.

31
00:02:38,000 --> 00:02:43,000
You'll have to have a lot of details which if you don't pay attention to, the cipher might not be secure.

32
00:02:43,000 --> 00:02:48,000
You should rely on existing implementations and use suggestions.

33
00:02:51,000 --> 00:02:54,000
Here are the basics of the blowfish block cipher.

34
00:02:54,000 --> 00:02:56,000
It uses something called a Feistle network.

35
00:02:56,000 --> 00:03:01,000
A Feistle network or a Feistle cipher is one where encryption decryption uses the same computational structure.

36
00:03:01,000 --> 00:03:07,000
Specifically, decrypting blowfish looks just like the adverse of encrypting, except that the function F is different.

37
00:03:08,000 --> 00:03:15,000
So, decrypt if you decipher text C at the bottom and reversal the arrows and the clear text M comes out at top.

38
00:03:16,000 --> 00:03:24,000
To use blowfish, you take the original key and derive the function F and 18 subkeys P1 through P18.

39
00:03:25,000 --> 00:03:33,000
You take your plain text block of 64 bits and divide it into two parts, the left hand, left half L0 and the right hand R0.

40
00:03:34,000 --> 00:03:37,000
Both L0 and R0 are 32 bits long.

41
00:03:38,000 --> 00:03:45,000
You then process L0 and R0 through 16 iterations of the structure shown here on the left.

42
00:03:45,000 --> 00:03:49,000
You XOR the left hand with the key P, without key P.

43
00:03:49,000 --> 00:03:54,000
You pass this value through the function F and XOR that with the right hand value.

44
00:03:54,000 --> 00:03:57,000
The right hand value becomes the left hand value and vice versa.

45
00:03:58,000 --> 00:04:04,000
Then, in the final step, you XOR the left hand value with P18 and the right hand value with P17.

46
00:04:04,000 --> 00:04:10,000
This produces two 32 bit values which can catenate into the cipher text C.

