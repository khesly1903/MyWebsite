# Açık Anahtarlı Kriptografinin Temel Taşı: ElGamal

Diffie-Hellman, iki tarafın güvensiz bir kanal üzerinden iletişim kurarak üçüncü kişilerin öğrenemeyeceği şekilde ortak bir gizli anahtar üretmesini sağlayan bir anahtar değişim protokolüdür. Ancak bu sadece bir anahtar değişim protokolüdür, yani doğrudan bir şifreleme ve deşifreleme işlemleri yapmaz, sadece bu işlemlerde kullanılabilecek bir anahtar üretir.

Tabii ki de bu ortak anahtarı belirlediğimiz bir şifrleme algoritmasında kullanılabilir ve bu sayede bir şifreleme ve deşifreleme yapabiliriz. Bu yapıdan doğan en etkili yöntemlerden bir tanesi ise ElGamal kriptosistemidir. Diffie-Hellmanın güçlü matematiksel yapısını kullanarak üstüne bir şifrleme katmanı ekler. Bu sayede bir kriptosistem haline gelir.

---

Algoritmayı tanımak için Alice ve Bob olmazsa olmazdır. Alice ve Bob, bu sefer de haberleşmelerinde ElGamal kriptosistemini kullanmaya karar verirler. Elbette bu sırada Eve, her zamanki gibi iletişimi gizlice dinlemeye çalışmaktadır.

ElGamal algoritması kullanılmadan önce, bazı açık parametrelerin belirlenmesi gerekir.Bu parametreler sadece Alice ve Bob tarafından değil, bir saldırgan olan Eve tarafından da bilinebilir, çünkü ElGamal’ın güvenliği, bu bilgilerin gizliliğine değil, altında yatan matematiksel problemlerin çözülmesinin zorluğuna dayanır.

### Açık Parameters (Public Parameters)
Büyük bir p asal sayısı belirlenir. Sonrasında bu asal sayıya göre tanımlı çarpma grubu ℤₚ = {0,1,2,…,p-1} oluşturur ve g ilkel kökü (primitive root) seçilir. Bu g sayısı ℤₚ* = {1,2,…,p-1} içinde olmalıdır ve bu gruptaki tüm elemanları üretebilmelidir. Yani g sayısının kuvvetleri ℤₚ* ’yi üretilebilmelidir.

### Anahtar Üretimi (Key Generation)
Örneğin Alice anahtar üretiminden sorumlu olsun. Gizli anahtarı (private key) seçer ve bu gizli anahtarı kullanarak açık anahtarı (public key) oluşturur.
Gizli anahtar: x ∈ {1,2,…,p-2}
Açık anahtar: y = gˣ (mod p)
Sonrasında açık anahtar y’yi Bob’a gönderir.

### Şifreleme (Encryption)
Bob Alice’e m ∈ ℤₚ mesajını göndermek istiyor olsun. Rastgele bir
k ∈ {1,2,…,p-2} sayısı seçer ve şu iki hesabı yapar:
c₁ = gᵏ (mod p)
c₂ = m · yᵏ (mod p)
Oluşan şifreli mesaj çifti (c₁,c₂)’yi Alice’e gönderir.

### Deşifreleme (Decryption)
Alice özel anahtarını kullanarak s = c₁ˣ (mod p) hesabını yapar. Sonrasında bu s’in mod p’ye göre tersini alır: s⁻¹ (mod p). Son olarak orjinal mesajı geri elde eder: m = c₂ · s⁻¹ (mod p).

![ElGamal Schema](/article-images/cryptography/elgamal/elgamal-schema.webp)


### Peki nasıl çalışıyor ve neden güvenli?
Bob’un Alice’e gönderdiği şifrelenmiş mesajına bakarsak tatlı bir sadeleşme görürüz. Alice’nin s hesabını yerine koyarsak:
m = c₂ · (c₁ˣ)⁻¹ (mod p)
c₁ = gᵏ (mod p) ve c₂ = m · yᵏ (mod p) olduğunu biliyoruz. O halde c₁ ve c₂’yi yerine koyarsak:
m = m · yᵏ · ((gᵏ)ˣ)⁻¹ (mod p)
Sonrasında y = gˣ (mod p) bilgisini kullanırsak:
m = m · (gˣ)ᵏ · ((gᵏ)ˣ)⁻¹ (mod p)
Birazda parantezlerden kurtulursak şöyle bir sonuç elde ederiz:
m = m · gᵏˣ · g⁻ᵏˣ (mod p) ⇒ m = m (mod p)

Biraz sadeleştirme ve bazı değişkenleri yerine koyarak nasıl çalıştığını anldık. Peki güvenlik nerede sağlanıyor? Aslında bunun iki kısmı var.
*1- Ayrık Logaritma Problemi:* Alice’in hesapladığı açık anahtar y = gˣ (mod p) ‘den x’i bulmak bir ayrık logaritma problemidir. Yani Eve, y,g,p parametrelerini bilmesine rağmen x’i bulabilmek için çok yüksek hesaplama gücüne sahip olması gerekir.
*2- Rastgelelik ve Hesaplanamazlık:* Bob Alice’e c₁’i gönderdiğinde Eve bunu ele geçirse bile, Bob’un rastgele ürettiği k’yı bilmediği sürece deşifreleme işlemini yapamaz. Her mesajda yeniden bir rastgele k üretildiğini düşününce Eve’in işi gittikçe zorlaşır. Zaten x’i de bilmediğine göre günün sonunda gᵏˣ ifadesini bulamayacaktır.

Güvenliği arttırmak için p’yi çok büyük seçmeli (2048 bit ve üzeri) ve rastgele üretilen k sayısı tekrarlanmamalıdır.

---

ElGamal kriptosistemi her ne kadar teorik olarak güvenli kabul edilse de, pratik uygulamalarda doğrudan bu versiyonu yaygın olarak kullanılmaz.

Bunun başlıca nedenlerinden biri, şifrelenecek mesaj m’nin doğrudan sayısal bir değer olması zorunluluğudur. ElGamal, mesajın ℤₚ içinde bir elemana dönüştürülmesini gerektirir. Ancak uzun metinler, görseller veya videolar gibi karmaşık yapılar tek bir sayıya indirgenmek zorunda kaldığında, bu hem veri işlemede zorluk yaratır hem de sistemin karmaşıklığını artırır.

İkinci önemli neden ise performans sınırlamalarıdır. Her şifreleme işlemi için güvenli, tekrar etmeyen bir rastgele sayı k üretmek gerekir. Bu rastgelelik düzgün sağlanamazsa sistemin güvenliği tehlikeye girer. Ayrıca, şifreli mesaj çifti (c₁,c₂), orijinal mesajdan yaklaşık iki kat daha fazla yer kaplar. Bu da özellikle büyük veri setlerinde verimsizlik oluşturur.

---

Peki, eliptik eğriler ile ElGamal birleşirse ne olur? İşte o zaman elimizde, klasik ElGamal’ın performans kaygılarını ortadan kaldıran, daha küçük anahtar boyutlarıyla (örneğin 256 bit) benzer güvenlik seviyeleri sunan ve çok daha hızlı çalışan bir kriptosistem olur. Buna Eliptik Eğri ElGamal (Elliptic Curve ElGamal — EC-ElGamal) denir.

EC-ElGamal doğrudan mesaj şifreleme için her zaman kullanılmasa da; IoT cihazlarında, blockchain sistemlerinde, şifreli makine öğrenmesi uygulamalarında ve çeşitli kriptografik protokollerde yaygın şekilde kullanılır.Düşük kaynak tüketimi ve eliptik eğri üzerindeki matematiksel yapı sayesinde, hem güvenli hem de verimli bir çözüm sunar.

Sonuç olarak ElGamal, hem klasik hem de eliptik eğrili versiyonuyla, kriptografi dünyasında önemli bir temel taşı olmayı sürdürmektedir.