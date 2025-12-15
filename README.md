# Piattaforma di Gestione Attività (To-Do List)

## 1. Requisiti Funzionali

### Funzionalità principale

Il presente progetto mira alla realizzazione di una soluzione software *web* dedicata alla gestione delle attività. L'applicazione dovrà fornire all'utente finale le seguenti funzionalità fondamentali (CRUD e Scadenze):

* **Creazione:** Inserimento di nuove attività.
* **Lettura/Elencazione:** Visualizzazione completa dell'elenco delle attività.
* **Aggiornamento/Modifica:** Modifica dei dettagli di un'attività esistente.
* **Eliminazione:** Rimozione logica o fisica delle attività.
* **Gestione Scadenze:** Possibilità di associare una data di scadenza a ciascuna attività.

Gestire più utenti tramite registrazione e login così da garantire l'accesso da remoto alle proprie note.

### Microfunzionalità

Implementazioni di contorno con obbiettivo di rendere l'applicativo più user-friendly

- Filtri di ricerca per:
  - nome
  - descrizione
  - data di scadenza
  - completate / non completate

---

## 2. Architettura e Implementazione Tecnica

### 2.1. Scelte Tecnologiche

Per garantire robustezza, scalabilità e manutenibilità del sistema, sono state selezionate le seguenti tecnologie:

* **Logica di Business (Backend):** **C#**.
* **Gestione Dati (DBMS):** **SQL Server**, scelto come sistema di gestione di database relazionale.
* **Interfaccia Utente (Frontend):** **Web Stack** HTML, CSS, JavaScript con libreria [Handlebar](https://handlebarsjs.com/guide/) specifica per la creazione **semplificata** di un'interfaccia utente.

### 2.2. Modello Architetturale

L'approccio architetturale adottato è quello delle **Restful API** in aggiunta al pattern **MVC**. Questo modello consente una netta separazione tra il *frontend* (l'interfaccia utente) e nel *backend* fra la logica di business, l'accesso e la gestione dei dati, facilitando lo sviluppo modulare e la futura implementazione *multi-users*.

## 3 Setup dell'environment

### 3.1 C#
La soluzione utilizzata nel progetto corrisponde alla versione 10.0 del framework .NET in particolare l'adozione di **ASP.NET Core Web API** con la configurazione per connessioni sicure con HTTPS. Per venire in contro alle esigenze del team e vista la deprecazione di Swagger nella versione 10 abbiamo scelto di usare il pacchetto **Scalar.AspNetCore** facilitando la fase di testing.

Oltre a questi sono necessari i pacchetti:

- [x] Microsoft.EntityFrameworkCore
- [x] Microsoft.EntityFrameworkCore.SqlServer
- [x] Microsoft.EntityFrameworkCore.Tools
- [x] Bcrypt per hashing password

> [!CAUTION]
>
> L'installazione di tali pacchetti necessita una procedura di installazione manuale sulla propria macchina.

### 3.2 SQL SERVER

> [!NOTE]
> È fortemente consigliato installare la versione 2025 di [SQL SERVER versione **EXPRESS**](https://www.microsoft.com/it-it/sql-server/sql-server-downloads). Le versioni precedenti potrebbero avedere diverse configurazioni di accesso e causare rotture nel sistema.

La procedura per accedere all'istanza remota del database richiede i seguenti parametri da inserire nella fase di autenticazione a SQL SERVER:

```bash
Data Source=.\SQLEXPRESS;Integrated Security=True;Persist Security Info=False;Pooling=False;MultipleActiveResultSets=False;Encrypt=True;TrustServerCertificate=True;Application Name="SQL Server Management Studio";Command Timeout=0
```

### 3.3 Database scaffolding

Questa funzionalità permette di mappare i model in maniera automatizzata e sicura partnedo dal database (denominata comunemente database first). 

Incollare la seguente riga di comando nella Package Manager Console:

```bash
Scaffold-DbContext "Server=10.8.14.x;Database=tododb;User Id=stagisti;Password=stagisti;TrustServerCertificate=True;" Microsoft.EntityFrameworkCore.SqlServer -OutputDir Models
```

---

### Licenza d'uso

[MIT](./LICENSE)
