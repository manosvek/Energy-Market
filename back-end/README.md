### Απαιτούμενα εργαλεία
Χρειάζεται να έχουμε εγκατεστημένα τα εξής:
* MySQL
* Node.js και Node.js Package Manager (npm)

Αυτό γίνεται εύκολα αν εκτελέσει κανείς τα παρακάτω: 
```console 
panos@panos-PC:~$ sudo apt update
panos@panos-PC:~$ sudo apt install nodejs
panos@panos-PC:~$ sudo apt install npm
panos@panos-PC:~$ nodejs -v
panos@panos-PC:~$ sudo apt install mysql-server
panos@panos-PC:~$ sudo mysql_secure_installation
```

### Εγκατάσταση RESTapi
Στο directory *TL19-62/back-end* ανοίγουμε ένα terminal και τρέχουμε:
```console
panos@panos-PC:~/Desktop/TL19-62/back-end$ bash init.sh
```
Η εντολή αυτή τεστάρει και αρχικοποιεί τον server. Σημειώνουμε ότι για να τρέξει τα tests η δεύτερη εντολή πρέπει να έχουμε τα αντίστοιχα datasets στο Desktop. Ενδέχεται το init.sh να χρειάζεται τροποποίηση στα paths του αν η χρήση γίνει σε διαφορετικό υπολογιστή.


