---
title: CS144 NetworkP1288 8PublicKeyCryptography
---

1
00:00:00,000 --> 00:00:06,000
Public key cryptography is a critical part of most secure systems today.

2
00:00:06,000 --> 00:00:10,000
It's different than symmetric cryptography, and that there's what's called a public key,

3
00:00:10,000 --> 00:00:12,000
a key that doesn't have to be secret.

4
00:00:12,000 --> 00:00:16,000
You can distribute this public key freely and still communicate securely.

5
00:00:16,000 --> 00:00:19,000
So how does that work?

6
00:00:19,000 --> 00:00:24,000
Like symmetric cryptography, public key ciphers have three algorithms,

7
00:00:24,000 --> 00:00:28,000
one to generate keys, one to decrypt, and one to encrypt.

8
00:00:28,000 --> 00:00:31,000
They differ from symmetric cryptography in two ways.

9
00:00:31,000 --> 00:00:39,000
First, the generate algorithm generates two keys, a public key k, and a private key k inverse.

10
00:00:39,000 --> 00:00:44,000
To encrypt, you pass the public key in a plaintext to obtain a ciphertext.

11
00:00:44,000 --> 00:00:50,000
To decrypt, you pass the private key and the ciphertext to obtain the plaintext.

12
00:00:50,000 --> 00:00:55,000
Therefore, if you generate the keys, you can give out the public key freely, hence its name,

13
00:00:55,000 --> 00:01:01,000
and know that only someone with a private key can decrypt something sent with the public key.

14
00:01:01,000 --> 00:01:08,000
Because the public key is reused many times, though, this means the encryption process has to include randomization.

15
00:01:08,000 --> 00:01:12,000
Otherwise, two parties that send the same message will produce the same ciphertext,

16
00:01:12,000 --> 00:01:17,000
if you're dealing with small messages, and adversary could just exhaustively try all the messages.

17
00:01:17,000 --> 00:01:23,000
So, for example, you can prepend some random data to the plaintext to generate the ciphertext.

18
00:01:23,000 --> 00:01:29,000
So, this kind of magic. You can generate two keys, one public, one private.

19
00:01:29,000 --> 00:01:34,000
People with a public key can send data only someone with a private key can decrypt.

20
00:01:34,000 --> 00:01:40,000
If each side had the other's public key, then we wouldn't need symmetric cryptography at all.

21
00:01:40,000 --> 00:01:44,000
So, it turns out that's not quite the case, and I'll explain why in a little bit.

22
00:01:44,000 --> 00:01:52,000
Public cryptography is much, much more computationally expensive than symmetric cryptography, so we can't just use it all the time.

23
00:01:54,000 --> 00:02:00,000
You can use public key cryptography for integrity as well, using something called a signature.

24
00:02:00,000 --> 00:02:05,000
Again, you have three functions. Generate, generate a pair of keys.

25
00:02:05,000 --> 00:02:11,000
Sign, which takes the private key, and verify, which takes the public key.

26
00:02:11,000 --> 00:02:18,000
A signature provides integrity like a Mac. You can't produce a valid signature for a message M without the private key,

27
00:02:18,000 --> 00:02:22,000
but anyone can verify it with the public key.

28
00:02:22,000 --> 00:02:29,000
Furthermore, you can't derive the public key from the private one.

29
00:02:29,000 --> 00:02:33,000
So, there are a lot of public key algorithms out there.

30
00:02:33,000 --> 00:02:40,000
For encryption, we have RSA, Rabin, and Elk Amal. For signatures, we have RSA, Rabin, and Elk Amal, and DSA.

31
00:02:40,000 --> 00:02:44,000
But public key algorithms work differently than symmetric ones.

32
00:02:44,000 --> 00:02:48,000
The basic idea behind RSA, for example, is really simple.

33
00:02:48,000 --> 00:02:52,000
Modular exponentiation of large integers.

34
00:02:52,000 --> 00:02:57,000
However, simple transformations of a message to a number is not necessarily secure.

35
00:02:57,000 --> 00:03:00,000
So you have to be careful in how to use them.

36
00:03:00,000 --> 00:03:03,000
I gave one example of that earlier how you have to add randomness.

37
00:03:03,000 --> 00:03:10,000
So generally speaking, it's good to use existing, tested implementations of these algorithms rather than try to re-implement them yourself.

38
00:03:10,000 --> 00:03:15,000
Or you can re-implement them, but then don't use your implementation in a secure system.

39
00:03:16,000 --> 00:03:20,000
For many of these algorithms, we can use the same key for encryption and for signing.

40
00:03:20,000 --> 00:03:24,000
While they use the same key, though, they use very different algorithms.

41
00:03:24,000 --> 00:03:29,000
You can't, for example, sign a document by encrypting it with the private key.

42
00:03:29,000 --> 00:03:36,000
So I'm not going to go into all of the details, but I just want to give you a sense of how one very famous of these algorithms RSA works.

43
00:03:36,000 --> 00:03:40,000
RSA is named for its co-creators, Revesht, Shamir, and Alman.

44
00:03:40,000 --> 00:03:43,000
They won a Turing Award, the highest award in computing for it.

45
00:03:43,000 --> 00:03:48,000
I'm presenting RSA because conceptually it's very simple.

46
00:03:48,000 --> 00:03:55,000
To generate RSA keys, you choose two distinct, very large, prime numbers, P and Q.

47
00:03:55,000 --> 00:04:06,000
From P and Q, you compute their product, N. You then use P and Q to derive K and K inverse the public and private keys.

48
00:04:07,000 --> 00:04:11,000
You advertise N and K as the public key.

49
00:04:11,000 --> 00:04:20,000
To encrypt a message, consider the message M as a large number and raise it to the K power and take it modulo N.

50
00:04:20,000 --> 00:04:23,000
You send that Cypher text number.

51
00:04:23,000 --> 00:04:35,000
To decrypt, you consider the Cypher text message M as a large number, the Cypher text message C as a large number and raise it to the K inverse power that take it modulo N.

52
00:04:35,000 --> 00:04:40,000
It turns out that if you do this, you will recover the original plain text message.

53
00:04:40,000 --> 00:04:50,000
So you derive K and K inverse from P and Q. If an adversary learns P and Q, then they can generate the private key and break the system.

54
00:04:50,000 --> 00:04:57,000
You can't derive P and Q from K. It turns out you also can't derive P and Q from N.

55
00:04:57,000 --> 00:05:03,000
N is the product of two primes. Factoring N into P and Q turns out to be computationally hard.

56
00:05:03,000 --> 00:05:07,000
If someone figured out how to do it quickly, then all of RSA crashes down.

57
00:05:07,000 --> 00:05:15,000
As you can imagine, a lot of people put a huge amount of effort to understand exactly how hard it is to factor a product with two prime numbers.

58
00:05:15,000 --> 00:05:20,000
For those of you who know a bit about computational complexity, we know that the problem is in the computational class NP.

59
00:05:20,000 --> 00:05:26,000
It's suspected to be outside class P, but it's suspected to not be NP-complete.

60
00:05:26,000 --> 00:05:35,000
So that means our best guess is that you can't do it in polynomial time, but it's not as hard as the hardest problems in NP like traveling salesman.

61
00:05:35,000 --> 00:05:44,000
So public key cryptography seems pretty amazing. You can generate two keys, distribute one publicly, that have confidentiality, integrity, and authenticity.

62
00:05:44,000 --> 00:05:51,000
So why do we use symmetric cryptography at all?

63
00:05:52,000 --> 00:06:00,000
There is, of course, a catch. Public key cryptography is much, much slower than symmetric ciphers. We can do symmetric cryptography at line rate.

64
00:06:00,000 --> 00:06:11,000
Public key systems, though, have execution times in milliseconds. For example, if you were on RSA with a 2048-bit key, technically six milliseconds had decrypt a message.

65
00:06:11,000 --> 00:06:23,000
And remember, the party has the private key as the decrypting. So if you distribute your public key widely so lots of other parties can communicate with you, you're the bottleneck on how many messages can be handled.

66
00:06:23,000 --> 00:06:33,000
So this is why hybrid schemes are very popular today. The idea is that you start with public key cryptography and use it to encrypt a symmetric key.

67
00:06:33,000 --> 00:06:44,000
Or you use it to exchange some information, a secret session key that you use to generate symmetric keys. You bootstrap the secure session with public key cryptography to exchange a secret.

68
00:06:44,000 --> 00:06:52,000
Then use that secret for much more efficient symmetric cryptography. If you want to see a detailed example of this, I'll cover it in the TLS video.

69
00:06:53,000 --> 00:07:06,000
Now, one big pitfall people weren't into with public key cryptography is signing an under specified message. For example, if I sign a message, I should specify who in the message is for and give it a lifetime.

70
00:07:06,000 --> 00:07:15,000
Otherwise, simply, someone can simply replay the message. Since my public key is in change very often, I sign a message is valid as long as people are using my public key.

71
00:07:16,000 --> 00:07:23,000
By valid, I mean you'll properly pass the verify function. So you want to limit its use at the application level.

72
00:07:23,000 --> 00:07:34,000
Otherwise, a sign message saying you can access this file to be taken by an adversary and used. Instead, you should say something like, Nick can access this file until noon on Halloween.

