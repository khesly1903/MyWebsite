# Diffie-Hellman Anahtar Değişimi: Güvenli İletişimin İlk Adımı

Diyelim ki elinizde son derece önemli bir belge var ve bunu şifreleyerek bir başkasına göndermek istiyorsunuz. Bir kriptografla görüşseniz, size iki temel seçenek sunardı: anahtarlı (key-based) ve anahtarsız (keyless) şifreleme yöntemleri.

Muhtemelen size, günümüzde anahtarsız şifrelemenin artık eski moda olduğunu ve anahtarlı şifrelemenin çok daha güçlü bir güvenlik sunduğunu söylerdi. Ancak hemen bir problemle karşılaşırsınız: Mesajı göndereceğiniz kişi uzakta, ve önceden aranızda ortak bir anahtar belirlemediniz.

İşte tam bu noktada kriptografınız devreye girer ve size bir çözüm sunar: Diffie-Hellman Anahtar Değişimi (Diffie-Hellman Key Exchange). Bu yöntem sayesinde, daha önce hiç tanışmamış olsanız bile, kimse sizin bu belgenizi anlayamaz, tabii ki gönderdiğiniz kişi hariç.

Ve böylece şifreleme maceranız başlar…

---

Whitfield Diffie ve Martin Hellman’ın da amacı tam olarak buydu. Birbirinden bağımsız iki kişi bir araya gelmeden ve güvensiz bir iletişim kanalı üzerinden (unsecure channel) nasıl bir anahtar oluşturabilirdi. Bu basit ama yeni bir kriptografi çağı açan soru, modern asimetrik kriptografinin ve açık anahtar (public key) kriptografisinin temellerini atmıştır.

Aslında ilk olarak İngiliz istihbarat kuruluşunda (GCHQ) ilk matematiksel adımları atılmıştır. Ancak bu çalışmalar uzun yıllar boyunca gizli tutulmuş ve kamuoyuna açıklanmamıştır. Bu yüzden, bu devrim niteliğindeki fikirleri ilk kez açık bir şekilde yayımlayan iki Amerikalının soyadlarıyla anılır hale gelmiştir.

---

Peki birbirinden uzakta iki kişi nasıl ortak bir anahtar üretebilir? Bu noktada sahneye, kriptografinin efsanevi karakterleri Alice ve Bob çıkar.

**Açık parametreler (Public Parameters)**
Alice ve Bob büyük bir asal sayı üzerinde karar kılsın ve bu sayı p olsun. Bu p sayısı modulo olarak kullanılacaktır ve bu modüler kalanları elde edebilecekleri bir g sayısı seçsinler. Yani g sayısı, p modüler aralığında tüm farklı sonuçları-kalanları oluşturabilecek bir ilkel kök (primitive root) olsun. Veya öncesinde, mesala Alice, p ve g sayılarına karar verip Bob’a gönderir.

**Özel hesaplamalar (Private Computations)**
Alice rastgele bir a sayısı seçer ve şu hesabı yapar: 𝐴 ≡ 𝑔ᵃ (mod 𝑝)
Bob rastgele bir b sayısı seçsin ve şu hesabı yapar: 𝐵 ≡ 𝑔ᵇ (mod 𝑝)
Bu a ve b sayılarına gizli anahtar (private key) denir ve gizli tutulur, kimseyle paylaşılmaz.

**Açık Değişim (Public Exchange)**
Alice kendi hesapladığı A değerini Bob’a gönderir.
Bob da kendi hesapladığı B değerini Alice’e gönderir.
Bu A ve B sayılarının güvensiz bir kanal üzerinden gönderilmesinde bir sorun yoktur.

**Gizli Anahtar Hesaplaması (Private Key Compuation)**
Alice teslim aldığı B ve önceden belirlediği a ile şu hesabı yapar: 𝐵ᵃ (mod 𝑝)
Bob teslim aldığı A ve önceden belirlediği b ile şu hesabı yapar: 𝐴ᵇ (mod 𝑝)
Bu yapılan işlemler sonucunda Alice ve Bob aynı sayıyı yani K gizli anahtarını (secret key) elde eder.
Şöyle gösterebiliriz: 𝐾 ≡ 𝐵ᵃ ≡ (𝑔ᵇ)ᵃ ≡ 𝑔ᵃᵇ ≡ (𝑔ᵃ)ᵇ ≡ 𝐴ᵇ (mod 𝑝)

![Diffie-Hellman Schema](/article-images/cryptography/diffie-hellman/diffie-hellman-schema.webp)

Bir diğer kriptografi efsanesi Eve ise bu değişimi gözlemlemiş olsun. Eve bu durumda asal sayı p, ilkel kök g, Alice’nin Bob’a gönderdiği A ve Bob’un Alice’ye gönderdiği B sayılarını ele geçirmiş olsun. Elinde bu kadar bilgi olmasına rağmen, Eve K’yı hesaplamak için inanılmaz büyük bir hesaplama gücüne sahip olmalıdır. Çünkü K’yı hesaplaması için Alice ve Bob’un a ve b gizli anahtarlarından birine ihtiyacı vardır. Yani 𝐾 = 𝑔ᵃᵇ (mod p) veya örneğin 𝐾 ≡ 𝐵ᵃ (mod 𝑝) hesabını yapamaz.

Eve’in karşılaştığı probleme Ayrık Logaritma Problemi (Discrete Logarithm Problem — DLP) denir. Bu problem, yeterince büyük sayılar kullanıldığı dairde bilgisayarlarımızın çözmesinin neredeyse imkansız olduğu bir matematik problemidir.

Örneğin Eve önce a’yı hesaplamaya çalışsın. Elindeki 𝐴 ≡ 𝑔ᵃ (mod 𝑝) denklemini çözmek zorundadır. DLP problemini çözmek için bir algoritma kullanmadığını varsayarsak tek tek denemek zorundadır. 

p sayısının inanılmaz büyük bir sayı olduğunu hatırlatmakta fayda var. 2048 bitlik bir sayı yaklaşık 617 basamaklı bir sayıdır. Yani Eve’in a ve b yi bulabilmesi için elinde bir kuantum bilgisayarı veya ölümsüzlük iksiri olmalıdır.

---

Günümüzde, klasik Diffie-Hellman yerine Elliptic Curve Diffie-Hellman (ECDH) çok daha yaygın olarak kullanılmaktadır. Bunun temel sebebi, ECDH’nin aynı güvenlik seviyesini çok daha küçük anahtar boyutlarıyla sağlayabilmesidir.

Klasik Diffie-Hellman algoritması, güvenliğini Ayrık Logaritma Problemi (DLP)’ne dayandırır ve bu problemin zorluğunu sağlamak için çok büyük asal sayılar gereklidir — genellikle 2048 bit ve üzeri.

Öte yandan, ECDH, güvenliğini Eliptik Eğri Ayrık Logaritma Problemi (Elliptic Curve Discrete Logarithm Problem — ECDLP) üzerine kurar. Bu problem, klasik DLP’ye göre çok daha karmaşıktır, bu sayede aynı güvenlik seviyesi için çok daha küçük anahtarlar yeterli olur. Örneğin 2048 bitlik klasik DH güvenliği 224 bitlik ECDH güvenliğine denk gelir.

---

Böylece elinizde, istediğiniz kişinin haricinde kimsenin elde edemeyeceği bir anahtara sahip oldunuz. Fakat henüz anahtara sahipsiniz, bir şifreleme algoritmasına karar vermediniz. Kriptografınız birde şifreleme algoritması önermeli. En azından yolu yarıladınız.


