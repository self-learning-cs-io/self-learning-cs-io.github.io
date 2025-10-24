---
title: CS144 NetworkP1198 6aConfidentiality
---

1
00:00:00,000 --> 00:00:08,000
Let's look at the first of three properties the cryptography can provide.

2
00:00:08,000 --> 00:00:12,000
Confidentiality also called secrecy.

3
00:00:12,000 --> 00:00:18,000
The basic way you achieve confidentiality is through encryption.

4
00:00:18,000 --> 00:00:22,000
Because cryptography has a firm mathematical basis and because it's important to be precise,

5
00:00:22,000 --> 00:00:27,000
given the dangers of using it haphazardly, I'm going to introduce some terms.

6
00:00:27,000 --> 00:00:30,000
I'm going to start with symmetric encryption.

7
00:00:30,000 --> 00:00:36,000
In symmetric encryption, two parties share some secret key K.

8
00:00:36,000 --> 00:00:42,000
So let's suppose we have a message M. We want to transmit confidentially and the key K.

9
00:00:42,000 --> 00:00:45,000
M is called the plain text or clear text.

10
00:00:45,000 --> 00:00:47,000
It's the thing we want to keep secret.

11
00:00:47,000 --> 00:00:54,000
To encrypt, we call a function E, passing the message M and the key K.

12
00:00:54,000 --> 00:00:57,000
This produces a cipher text C.

13
00:00:57,000 --> 00:01:06,000
If our encryption algorithm is secure, then it's intractable for someone to figure out the clear text from the cipher text unless they have the key.

14
00:01:06,000 --> 00:01:10,000
So we can transfer the cipher text C over the network.

15
00:01:10,000 --> 00:01:15,000
Adversaries can look at it, but they can't read the original message M.

16
00:01:15,000 --> 00:01:22,000
To decrypt the cipher text, we call the decrypt function D, also passing the key K.

17
00:01:22,000 --> 00:01:25,000
This returns the original clear text M.

18
00:01:25,000 --> 00:01:32,000
The goal is that you can only decrypt the message or learn anything about it if you have the right key K.

19
00:01:32,000 --> 00:01:39,000
Of course, someone could try every K, so you pick a key big enough that exhaustively surging the spaces intractable.

20
00:01:39,000 --> 00:01:45,000
For example, make the key 128 or 256 bits.

21
00:01:45,000 --> 00:01:52,000
Because E and D take the same key K, we call this symmetric or shared key encryption.

22
00:01:52,000 --> 00:01:56,000
There are other cryptosystems that don't use symmetric keys and we'll cover them later.

23
00:01:56,000 --> 00:02:07,000
Examples of symmetric encryption algorithms are AES, Blowfish, DES, and RC4.

24
00:02:07,000 --> 00:02:13,000
A one-time pad is a perfectly secret, but generally impractical encryption algorithm.

25
00:02:13,000 --> 00:02:17,000
We generate perfectly random stream of bits as our key K.

26
00:02:17,000 --> 00:02:21,000
The sender and receiver somehow exchanges key securely beforehand.

27
00:02:21,000 --> 00:02:25,000
For example, through a handshake at a USB drive.

28
00:02:25,000 --> 00:02:30,000
To encrypt, we XOR our message M with the key K.

29
00:02:30,000 --> 00:02:36,000
To decrypt, we XOR our cipher text C with the key K.

30
00:02:36,000 --> 00:02:44,000
This algorithm is perfectly secure and that if we have the cipher text but not the key, then any M is equally likely.

31
00:02:44,000 --> 00:02:50,000
Furthermore, this algorithm is really fast. All we have to do is XOR.

32
00:02:50,000 --> 00:02:58,000
So if you're a super-secret spy who wants to send a short message, one-time pads are great, but not so in general practice.

33
00:02:58,000 --> 00:03:03,000
The problem with one-time pads is that your key K is the same size as the message M.

34
00:03:03,000 --> 00:03:09,000
To send a gigabyte of data, you need a gigabyte long key. This is not practical.

35
00:03:09,000 --> 00:03:16,000
We'd like to be able to send small keys that encrypt large amounts of data yet are still intractable to crack.

