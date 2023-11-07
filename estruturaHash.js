class No{
  constructor(key, valor) {
    this.key = key;
    this.valor = valor;
    this.next = null;
  }
}

class HashTable {
  constructor(tam) {
    this.tam = tam;
    this.table = new Array(tam);
  }

  hash(key) {
    let hash = 0;
    for (let i = 0; i < key.length; i++) {
      hash += key.charCodeAt(i);
    }
    return hash % this.tam;
  }

  insert(key, valor) {
    const index = this.hash(key);
    const newNo = new No(key, valor);

    if (!this.table[index]) {
      this.table[index] = newNo;
    } else {
      let curNo = this.table[index];
      while (curNo.next) {
        if (curNo.key === key) {
          curNo.valor = valor;
          return;
        }
        curNo = curNo.next;
      }
      curNo.next = newNo;
    }
  }

  search(key) {
    const index = this.hash(key);
    let curNo = this.table[index];
    while (curNo) {
      if (curNo.key === key) {
        return curNo.valor;
      }
      curNo = curNo.next;
    }
    return null;
  }

  remove(key) {
    const index = this.hash(key);
    let curNo = this.table[index];
    let prevNo = null;
    while (curNo) {
      if (curNo.key === key) {
        if (prevNo) {
          prevNo.next = curNo.next;
        } else {
          this.table[index] = curNo.next;
        }
        return;
      }
      prevNo = curNo;
      curNo = curNo.next;
    }
  }
}

const exemplo = new HashTable(10);

exemplo.insert("Futebol", "Esporte em que se joga com os pés e é 11x11");
exemplo.insert("Basquete", "Esporte em que se joga com as mãos e é 5x5");
exemplo.insert("Vôlei", "Esporte em que se joga com as mãos e é 6x6");

console.log(exemplo.search("Basquete"));

exemplo.remove("Vôlei");
console.log(exemplo.search("Vôlei"));
