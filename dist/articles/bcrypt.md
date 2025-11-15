# Storing Passwords Securely in Databases

Suppose you need to store user passwords in a database. Let’s go step by step to make it cryptographically secure.

### 1. Storing as Plaintext

If you store passwords directly in plaintext — congratulations! You’re saving hackers a lot of time. Why make it hard for them when you can just hand everything over yourself?

### 2. Encrypting Passwords

You might encrypt passwords using, for example, asymmetric encryption and store them in your database.  
The idea: encrypt with a **public key**, and decrypt with a **private key** for verification.

Even if you use an incredibly strong encryption algorithm that could take billions of years to crack, if the **private key** is leaked, get ready to send apology emails to all your users.

### 3. Hashing Passwords

A better approach is to hash the user’s password and store that hash in your database.  
But what if the password is something like **“password123”**, or maybe based on public info like the user’s dog’s name and birthdate?  
Or what if multiple users share the same password? In that case, the same string produces the same hash.

This exposes vulnerabilities to **rainbow table** attacks (precomputed hash values) or **dictionary attacks** (trying many combinations and comparing hashes).

### 4. Hashing with Salt

We can fix most hashing problems by adding a **salt** — a unique random value added to each password before hashing.  
This ensures that identical passwords result in different hashes.

However, attackers can still perform **millions of salted hash guesses per second** with modern hardware.  
Most hashing algorithms are designed to be **fast**, which makes them vulnerable to **brute-force attacks**.

So — the strength of fast hashing is also its biggest weakness.

### 5. Using Slow/Adaptive Hashing

This brings us to the real solution.

Even with salt, attackers can still brute-force hashes if they have enough computing power.  
What we need is **time** — slow hashes.

If we make hashing slower, attackers will also have to work slower.  
That’s why we use algorithms like **bcrypt**, **scrypt**, and **Argon2**.

---

### Why It Makes Sense

Let’s do a simple math example.

Suppose an attacker can compute **1 million hashes per second**.  
They could still try billions of guesses fairly quickly.

But what if just **one hash** took **one second** to compute?  
Then 1 million hashes would take **11 days**, 1 billion would take **32 years**, and 100 billion — well, forget it. Nobody lives that long.

### How Bcrypt Works

The **“B”** in **bcrypt** comes from the **Blowfish** block cipher.  
Bcrypt uses an expensive variant of Blowfish’s **key schedule** algorithm — called **EksBlowfish** (“Expensive key schedule Blowfish”).

But just having a hash and salt (and sometimes pepper) isn’t enough.  
We need **brakes** — something to slow attackers down.

### How It Slows Down

Bcrypt’s slowness comes from repeating the key-schedule process many times — controlled by a **cost factor (work factor)**.  
Each increase in the cost factor doubles the work needed to compute a hash.

![Time vs Cost Factor](/article-images/cryptography/bcrypt/bcrypt1.webp)

For example, if cost factor = 12, the key expansion runs **2¹² = 4096 times** for each password.  
Attackers need to repeat this for every guess — exponentially slowing them down.

Increasing the cost factor by 1 makes hashing **twice as slow**.  
A user can wait 1–2 seconds, but a hacker waiting 1000 years is another story.

### Example Python Code

```python
import bcrypt
import time

passwd = b'verystrongpassword'
for i in range(5, 20):
    start = time.time()
    salt = bcrypt.gensalt(rounds=i)
    hashed = bcrypt.hashpw(passwd, salt)
    end = time.time()
    print(f'Rounds:{i} | Time: {end - start:.4f} s')
```

### Example Results

```
Rounds:5  | Time: 0.0014 s
Rounds:6  | Time: 0.0027 s
Rounds:7  | Time: 0.0056 s
Rounds:8  | Time: 0.0107 s
Rounds:9  | Time: 0.0218 s
Rounds:10 | Time: 0.0429 s
Rounds:11 | Time: 0.0843 s
Rounds:12 | Time: 0.1672 s
Rounds:13 | Time: 0.3361 s
Rounds:14 | Time: 0.6713 s
Rounds:15 | Time: 1.3390 s
Rounds:16 | Time: 2.6902 s
Rounds:17 | Time: 5.3615 s
Rounds:18 | Time: 10.8276 s
Rounds:19 | Time: 21.4712 s
```

Even though results vary by hardware, this shows that increasing the cost factor greatly improves security by making brute-forcing impractical.

### Bcrypt History and Recommended Cost Factors

When bcrypt was introduced (1999), cost factors of **6** for normal users and **8** for admins were recommended.  
Today, with faster CPUs, **12** is recommended for normal users and **14** for admins.

### Example Hash Breakdown

```
Hash: $2b$12$GuxbclBlszKP8a2DLH6uReLtFZXdV7c0ULWqBfO3x7gx7G8ucUl/q
Salt:        GuxbclBlszKP8a2DLH6uRe
```

Format explanation:

- $2b → bcrypt version  
- $12 → cost factor  
- GuxbclBlszKP8a2DLH6uRe → 22-character salt  
- LtFZXdV7c0ULWqBfO3x7gx7G8ucUl/q → 31-character hash

Total 60 characters — safe to store in your database.

### Bcrypt’s Limitations

Bcrypt’s slowness comes from **CPU workload**, not **RAM usage**.  
Modern attackers use **GPUs** or **ASICs** that can perform thousands of hashes in parallel — since bcrypt isn’t memory-intensive, it’s somewhat vulnerable to such attacks.

### Takeaway

We’ve seen that encryption, plain hashing, or salted hashing all have weaknesses.  
Bcrypt improves upon them, but it’s not perfect — attackers keep evolving.

Still, bcrypt remains strong and widely used.  
For even higher security, use **memory-hard** algorithms like **scrypt** or **Argon2**, which also require large amounts of RAM, making them harder to parallelize.

---

### Summary

- **Bcrypt** is still a strong and widely-used hashing algorithm.  
- **Salt** and **cost factor** provide strong protection against brute-force attacks.  
- Bcrypt’s slowness depends on CPU, so it’s less resistant to GPU-based attacks.  
- For maximum security, prefer **memory-hard algorithms** like **scrypt** or **Argon2**.  
- Still, for most applications, bcrypt with a proper cost factor keeps passwords safe.
