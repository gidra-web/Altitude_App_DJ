Implementirajte web aplikaciju sa sledećim funkcionalnostima:
- [x] Registracija i prijava korisnika: Korisnici mogu da se registruju i prijave koristeći svoju email adresu i lozinku. Tokom registracije, korisnik mora da unese ime, prezime i datum rođenja.
- [x] Upravljanje profilom korisnika: Prijavljeni korisnici mogu da pregledaju i menjaju podatke na svom profilu, uključujući ime, prezime i datum rođenja.
- [ ]Takođe, korisnici mogu da dodaju i ažuriraju profilnu sliku. 
- [x] Korisnik moze da promeni svoju lozinku, prilikom cega je neophodno da unese validnu postojecu lozinku.
- [x] Tipovi korisnika: Postoje dve vrste korisnika - admin i običan korisnik. Admin ima mogućnost da vidi listu svih korisnika, ali ne može samostalno da kreira svoj nalog; mora biti "ručno" dodat u bazu podataka.
- [x] Admin moze da obrise profil korisnika. Korisnik ciji je profil obrisan mora da dobije notifikaciju o tome prilikom sledeceg pokusaja prijave.
- [x] Admin moze da filtrira i pretrazuje korisnike po emailu ili datumu rodjenja.
Bonus funkcionalnosti:
- [x] Mogucnost prijave i putem Google naloga.
- Verifikacija putem emaila: Nakon registracije, korisnik dobija email sa potvrdom registracije. U sistem treba integrisati mehanizam za verifikaciju putem emaila (npr. kod koji korisnik mora da unese pri prijavi ako još uvek nije verifikovan). Admin moze da filtrira korisnike po statusu verifikacije.
- Dvosmerna autentifikacija (2FA): Implementirati opciju dvosmerne autentifikacije (korisnici mogu da omoguće ili onemoguće ovu funkciju u podešavanjima profila). Koristeći email ili aplikaciju za autentifikaciju. 
`   
Srećno! :)

login admin inputs:
### admin@admin
### admin123

PORT=3000
MONGODB_URI='mongodb://root:example@localhost:27017'
SALT_ROUND=10
ACCESSTOKENTTL='15min'
REFRESHTOKEN='1y'
ADMIN_EMAIL=admin@admin
ADMIN_USERNAME=admin
ADMIN_PASSWORD=admin123