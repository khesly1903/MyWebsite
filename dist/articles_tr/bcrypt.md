# Şifreleri Veritabanında Güvenli Şekilde Saklamak

Diyelim ki kullanıcı şifrelerini veritabanında saklamanız gerekiyor. Kriptografik olarak daha güvenli hale getirmek için adım adım neler yapabileceğimize bakalım:

### 1. Plaintext olarak saklamak

Şifreyi olduğu gibi veritabanınızda saklarsanız tebrikler! Şifreleri çalmaya çalışan kişiyi hiç yormayın ve kendiniz direkt teslim edin. Siz uğraşmadınız o da uğraşmasın.

### 2. Şifreleri şifrelemek

Şifrelerinizi örneğin asimetrik bir şifreleme ile şifreleyip veritabanınızda tutunuz.  
Bunu yapmanın en iyi yolu bir public key ile kullanıcı şifresini şifreler ve siz de private key ile çözüp şifreleri karşılaştırırsınız.

İnanılmaz güvenilir ve kırılması milyar yıllar alabilecek bir şifreleme algoritması kullanmış olsanız bile private key’in açığa çıkması ve ele geçirilmesi durumunda kullanıcılarınıza özür maili atmaya hazır olmalısınız.

### 3. Şifreleri hashleyip saklamak

Kullanıcının şifresini hashleyip veritabanınızda tutabilirsiniz. Güzel bir yöntem.  
Peki kullanıcının şifresi “password123” ise? Veya public bir şekilde erişilebilecek bilgilerinden, örneğin köpeğinin adı ve kendi doğum tarihi kombinasyonu ise?  
Veya başka bir kullanıcı ile aynı şifreyi kullanıyorsa ve diğer kullanıcının şifresi açığa çıktıysa, sonuçta aynı string aynı hashi verir.

Yani bu zaafiyetler **rainbow table** (önceden hesaplanmış hash değerleri) veya **dictionary attack** (farklı kombinasyonlarla parola elde etmek ve hashlerini karşılaştırmak) gibi tekniklere karşı yetersiz kalıyor.

### 4. Şifreleri salt ile hashlemek

Hashlemedeki sorunların büyük çoğunluğunu **salt** katarak çözebiliriz.  
Bu sayede aynı stringlere farklı saltlar (unique salt) geleceği için ve şifresi basit olsa bile saltlandığı için çok farklı değer olacağından sorunlarımızın büyük çoğunluğu çözülebilir.

Ama bir problem var:  
Çok güçlü sistem ve özel yazılımlarla saniyede milyonlarca hash + salt tahmini yapılabilir.  
Zaten genelde hashing algoritmaları hızlı hesaplanmasına yönelik yapıldığı için bir nebze zor olsa da hala tam güvenilir bir saklama elde edemeyiz.

Yani hızlı hashing algoritmaları hızlı hesaplanıp **brute-force** ataklarına dayanıksız kalabiliyor — en büyük gücü aslında onun zayıflığı.

### 5. Şifreleri slow/adaptive hashing ile hashleyip saklamak

Asıl konumuza geldik.

Hashleyip saltlamanın asıl sorunu yeterince hesaplama gücü sahibi insanların bunu bile bazı yollarla düşük ihtimalle de olsa kırabilecek olabilmeleri.  
Bize zaman kazandıracak bir şey lazım: **yavaş hashler**.

Evet hashler hızlı bir şekilde oluşturulmalı ama bunlar değil.  
Biz yavaş hesaplarsak şifremizi kırmaya çalışanlar da yavaş hesaplar.  
Bu sebeple **bcrypt**, **scrypt**, **Argon2** gibi algoritmalar kullanılıyor.

---

### Neden mantıklı?

Basit bir matematik hesabı yapalım.  
Diyelim ki bir şifremiz var ve salt ile birlikte hashledik.  
Şifremizi ele geçirmeye çalışan kişi bir milyon tane hash kombinasyonunu ortalama bir saniyede hesaplıyor olsun.

Belki bir milyon tahminde bulamaz, bir milyar tahminde bulamaz, yüz milyar tahminde belki...  
Ama günün sonunda çok da bir zaman gerektirmeden, hele de elinde biraz bilgi varsa kombinasyonları düzenleyerek şifreyi tahmin edebilir.

Peki sadece bir hash’i hesaplamak **bir saniye** sürseydi?  
O zaman bir milyon hash için yaklaşık **11 gün**, bir milyar için **32 yıl** gerekirdi.  
Yüz milyar yılı zaten boşverin, kimsenin ömrü yaklaşık 3200 yıl değil.

### Bcrypt nasıl çalışır?

**Bcrypt**’in “B”si **Blowfish** blok şifreleme algoritmasından gelmektedir.  
Blowfish’in anahtar-genişletme (_key-schedule_) mekanizmasının daha pahalı versiyonu **EksBlowfish** (_Expensive key schedule Blowfish_) ile parola için hashleme fonksiyonunu oluşturur.

Ama elimizde hash fonksiyonu ve salt olmasının (hatta bazen pepper) yeterli olmadığını biliyoruz.  
Bize **frenler** lazım.

### Peki nasıl yavaş çalışıyor?

Bcrypt’i yavaşlatan şey, defalarca key-schedule ve bazı iç işlemlerin tekrarlı olarak çalıştırılmasıdır, yani **cost factor (veya work factor)**.  
Yani hash hesaplanırken kullanılan Expensive key schedule ile şifre ve salt 2^cost_factor kadar anahtar-genişletme işlemine sokulur, bu sayede CPU’ya yük biner ve hash’in hesaplanma hızı yavaşlar.

![Cost factor artışına bağlı zaman artışı](/article-images/cryptography/bcrypt/bcrypt1.webp)

Örneğin cost factor = 12 ise anahtar-genişletme fonksiyonu 2¹² = 4096 kez çalıştırılıyor ve tek bir hash elde ediliyor.  
Milyarlarca deneme yapacak saldırgan her bir tahmin için 2¹² kez çalıştırırsa uzun bir ömüre sahip olsa iyi olur.

Cost factor’ü 1 arttırmak 2 kat yavaşlamaya sebep olacaktır.  
Kullanıcı girerken 1–2 saniye beklese sorun olmaz ama hacker 1000 yıl beklerse ona sorun olabilir.  
Ne kadar eksponansiyel olduğuna bakın!

### Örnek Python kodu

```python
import bcrypt
import time

passwd = b'verystrongpassword'
for i in range(5, 20):
    start = time.time()
    salt = bcrypt.gensalt(rounds=i)
    hashed = bcrypt.hashpw(passwd, salt)
    end = time.time()
    # print(f'Hash: {hashed}')
    print(f'Rounds:{i} | Time: {end - start:.4f} s')
```

### Örnek Sonuçlar

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

Tabii ki hesaplama gücüne göre sonuçlar değişecek olsa da sonuçlar bize şunu gösteriyor:  
Cost factor’ü arttırmak bizim güvenliğimizi arttırıp şifremizi çalmaya çalışanın işini zorlaştırıyor.

### Bcrypt tarihçesi ve önerilen cost faktörleri

Bcrypt ilk çıktığı zamanlarda (1999) önerilen cost factor normal kullanıcı için 6, admin kullanıcılar için 8 idi.  
Hesaplama gücümüz arttığı için günümüzde önerilen cost factor **12**, admin kullanıcılar için **14** ideal gözüküyor.

### Örnek hash çözümlemesi

```
Hash: $2b$12$GuxbclBlszKP8a2DLH6uReLtFZXdV7c0ULWqBfO3x7gx7G8ucUl/q
Salt:        GuxbclBlszKP8a2DLH6uRe
```

Formül şu:

- $2b : bcrypt versiyonu
- $12 : cost factor
- $GuxbclBlszKP8a2DLH6uRe : 22 karakterlik salt değeri
- LtFZXdV7c0ULWqBfO3x7gx7G8ucUl/q : 31 karakterlik hash değeri

Yani 60 karakterlik bu bilgiyi içiniz rahat bir şekilde veritabanınızda saklayabilirsiniz.

### Bcrypt’in sınırlamaları

Fakat şunu da bilmelisiniz:  
Bcrypt’in yavaşlığı **CPU’ya yük bindirmesinden** kaynaklanır; yani çok fazla RAM kullanmaz.  
Modern saldırganlar ise **GPU’lar** veya **ASIC** donanımları kullanarak aynı anda çok sayıda paralel hash hesaplayabilirler, çünkü bu tür donanımlar binlerce küçük işlemi eşzamanlı yapmaya uygundur.

### Sonuç

Şifrelemeyi, düz hashlemeyi veya salt ile hashlemeyi çok güvenli değil diye reddettik ve yazı boyunca bcrypt’i inceledik.  
Sonunda zaafiyetini gördük. Bu bcrypt’in güvensiz ve kullanılamayacağı anlamına gelmiyor (ki zaten yaygın olarak kullanılıyor), ancak ortaya çıkan tehdide karşı **ek önlem almak** mantıklıdır.

Yani önceki paragraflarda 3200 yıl gibi süreler bu gibi tekniklerle 32 yıla, hatta 11 güne bile indirilebilir.  
Bu yüzden **memory-hard algoritmalar**, yani sadece CPU zamanı değil aynı zamanda **RAM kullanımını** da zorlayan algoritmalar tercih edilebilir.

Bu noktada **scrypt** ve **Argon2** en popüler seçeneklerdir.

---

### Özetle

- **Bcrypt** hala çok güçlü ve yaygın kullanılan bir hash algoritmasıdır.
- **Salt** ve **cost factor** ile brute-force saldırılara karşı ciddi bir koruma sağlar.
- Ancak bcrypt’in yavaşlığı yalnızca CPU’ya bağlı olduğu için paralel hesaplamalara karşı sınırlı direnç gösterebilir.
- Yüksek güvenlik gerektiren projelerde **memory-hard algoritmalar** (örneğin scrypt veya Argon2) tercih edilmelidir.
- Yine de çoğu uygulama için uygun bir cost factor değeri ile şifrelerimizi güvende tutmaya devam edecektir.
