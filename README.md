# React és ASP .NET Core alapú webalkalmazás fejlesztése
# Todo-App

## Az alkalmazás rövid bemutatása
Az alkalmazás teendők (todo-k) kezelésére alkalmas. Az alkalmazás által tárolt teendőkkel a következő műveleteket végezheti a felhasználó:
- hozzáad a listához egy új teendőt
- töröl teendőt, akár az összeset egyszerre
- egy meglévő teendőt módosít
- a teendők között prioritást határoz meg a prioritás attribútum értékének megadásával az egyes elemek esetén
- összesített listaként vagy státus szerint csoportosítva tekintheti meg és kezelheti a tárolt datokat.

## Az alkalmazás beüzemeltetése
A todoapp.sln projekt file megnyitása és elindítása Visual Studio fejlesztőkörnyezetben lehetséges. A projekt futtatásához szükséges az *ASP .NET and web development* csomag telepítése Visual Studioban.
1. A perzisztens adattárolás érdekében adatbázis létrehozása is szükséges. Szintén a Visual Studio fejlesztőkörnyezeten belül létrehozandó egy új adatbázis, *Todos* néven. 
2. Ez az SQL Server Object Explorer nézetben lehetséges, a (localdb)\MSSQLLocalDB Database mappájához hozzáadva. A *Todos* adatbázishoz továbbá létre kell hozni a *Todo* táblázatot, amelynek létrehozási script-je a *dbo.Todo.sql* file-ban található.
3. Az alkalmazás elindítható az F5-ös billentyű lenyomásával, majd ezt követően a megnyílt weboldalon elérhető a felhasználói felület.
## Az alkalmazás architektúrája
Az alkalmazás többrétegű architektúra mintájára lett megvalósítva. 
A weboldalon a felhasználó által végzett módosításokat a felhasználói felület kezeli első sorban. A felhasználó műveleteinek adatait ezután az üzleti réteg is kezeli, további validáció ellenőrzést biztosítva. Az adatelérési réteg felel az adatok be és kiírásáért az adatbázisba.
Az adatbázis szerepe a felhasználó által rögzített adatok perzisztens tárolása.
Az architektúrához továbbá tartozik egy, az üzleti réteg metódusait tesztelő tesztelési réteg.
A program kiinduló pontja a *Program.cs* osztályban található.
A *Startup.cs* az alapbeállítások megvalósítását írja le.

---
### Adatelérési réteg. 
A  réteg a projekt DAL mappájában kerül megvalósításra
- ***TodoDBContext.cs***: a DBContext osztály leszármazottja, az adatelérési rétegnek biztosítja az adatbázis elérését.
- ***ITodos.cs***: interface, amely összefoglalja az adatbázist kezelő függvényeket. 
    - ***Task<ActionResult<IEnumerable<Todo>>> GetTodos(string name = null)*** - lekérdezi az adatbázisban tárolt összes todo elem listáját.
    - **Task<Todo> GetTodo(int id)***- egy teendőt kérdez le, a paraméterként megadott id-ja alapján azonosítva.
    - ***void AddTodo([FromForm] Todo todo)*** - megvalósítja a paraméterben kapott todo hozzáadását az  adatbázishoz.
    - ***void DeleteTodo(Todo todo)*** - megvalósítja a paraméterben kapott todo törlését az adatbázisból.
    - ***Task<int> SaveChanges()*** - elmenti a megvalósított változásokat.
    - ***void Update([FromForm] Todo todo)*** - megváltoztat egy todo elemet, amely már létezet az adatbázisban.
    - ***bool Exists(int todo_id)*** - megvizsgálja, ha a paraméterben megadott id-jú todo létezik-e az adatbázisban.
- ***Todos.cs***: megvalósítja az *Itodos.cs* interface osztályait.
---
### Üzleti réteg
A *Todos_BL* mappa tartalmazza az üzleti (logikai) réteget megvalósító *TodoManager.cs* osztályt.
- A ***TodoManager.cs*** osztály metódusai biztosítják a megjelenítési rétegből érkező adatok validált változatát továbbadni az adatelérési rétegnek. Az osztály metódusai:
    - ***public async Task<ActionResult<IEnumerable<Todo>>> GetSet(string nameToSearchFor = null)***:  visszaadja az adatelérés rétegben megvalósított *GetTodos* metódus eredményét.
    - ***public  Task<Todo> GetTodo(int id)***: lekérdezi az adatelérési rétegtől a paraméterben kapott id-jú teendőt.
    - ***public bool AddTodo([FromForm] Todo todo)*** : továbbadja az adatelérési rétegnek a paraméterben kapott teendőt, ha megfelel az ellenőrzési feltételeknek. A metódus megvizsgálja, hogy a todo-nak be vannak-e állítva a kötelező tulajdonságai. Ha legalább egy kötelező tulajdonságának nincs értéke, a todo nem kerül tövábbadásra az adatelérési réteghez és a metódus false visszatérési értékkel tér vissza a megjelenítési rétegbe.
    -  ***public bool DeleteTodo(Todo todo)***: a paraméterben kapot teendőről megviszgálja ha létezik-e az id-ja alapján. Csak akkor továbbítja a törlési kérést az adatelérési rétegnek, ha létezik a todo.
    -  ***public async Task<int> SaveChanges()***: meghívja az adatelérési rétegben a művelet mentését megvalósító függvényt.
    -  ***public void UpdateTodo([FromForm] Todo todo)***: a paraméterben kapott teendőt továbbadja módosításra az adatelérési rétegnek, ha létezik már a teendő és a kötelező paramétereinek új értékei be vannak állítva. 
    -  ***public bool  ExistTodo(int id)***: lekérdezi az adatelérési rétegtől, ha létezik a paraméterben megadott id-jú todo és ennek igazságértékét visszaadja a megjelenítési rétegnek.
---
### Megjelenítési réteg
A megjelenítési réteg közvetlenül dolgozza fel a felhasználó által végzett műveleteket és ugyanakkor felel az adatok kilistázásáért, megfelelő design mellett a weboldalra. 

A Controllers mappában található *TodoesController.cs* osztály, függvényei valósítják meg a REST Api végpontokat, amelyek REST kérések kiszolgálását teszik lehetővé.
- ***public async Task<ActionResult<IEnumerable<Todo>>> GetTodosSet()*** : visszaadja a weboldalnak a todo elemek listáját. GET kérésre válaszoló metódus.
- ***public async Task<ActionResult<Todo>> GetTodo(int id)***: visszaadja a weboldalnak a paraméterben megadott id-jú elemet. GET kérésre válaszoló metódus.
- ***public async Task<IActionResult> PutTodo(int id, [FromForm] Todo todo)***: PUT kérést kiszolgáló metódus. Kezeli a felhasználó által a weboldalon végzett todo módosításokat, továbbadja a módosítási feladatot az üzleti rétegnek, további validációk elvégzése céljából.
- ***public async Task<ActionResult<Todo>> PostTodo([FromForm] Todo todo)***: POST kérést kiszolgáló metódus. Kezeli a felhasználó által a weboldalon végzett megadott új adat elmentését. Továbbítja a hozzáadási feladatot az üzleti rétegnek, további validációk elvégzése céljából.
- ***public async Task<ActionResult<Todo>> DeleteTodo(int id)***: DELETE kérést kiszolgáló metódus. Kezeli a felhasználó által a weboldalon kiválasztott adat törlését. Továbbítja a törlési feladatot az üzleti rétegnek, további validációk elvégzése céljából.

A ClientApp mappa tartalmazza a megjelenítés megvalósításához szükséges osztályokat.
- ***index.js***: a megjelenítendő fő oldal struktúráját tartamazza.
- ***App.js***: a webalkalmazás keretrendszerét alkotja, összefoglalja az elérhető oldalak útvonalát.
- ***page1.js***: az eslő oldal megjelenítését írja le.
- ***page2.js***: a második oldal megjelenítésééert felel.
    -  ***getData***: a megjelenítendő adatok (teendők listájának) lekérdezése.
    -  ***handleDeleteAll***: az összes megjelenített adat törlése.
    -  ***handleDelete = (todoID)***: a paraméterben megadott id-jú megjelenített tárgy törlése.
    -  ***render***: a html kód alapján,a megjelenítés megvalósítása a weboldalon.
- ***Form.js***: új todo hozzáadását kezelő form elem megvalósítása. A form bekéri a felhasználótól az adatokat, majd az elsődleges validációs műveletek igazértékű kimenetelei esetén, elmenti az adatokat a megjelenítési réteg számára.
- ***FormUpdate.js***: egy kilistázott todo módosítását megvalósító form elem leírása. Hasonlóan validál és módosításokat ment el a megjelenítési réteg számára, mint a Form.js osztályban megvalósított form.
    - ***handleSave(event)*** és ***handleSaveUpdate(event)***: a formban megadott adatok elmentése.
---
### Tesztelés
A *UnitTest* mappában található *TodoTest.cs* osztály tartalmaza a megvalósított teszt kódját. 
A  *public void TestAddTodoWithNullStatus()* teszt metódus az üzleti rétegbeli AddTodo metódus helyes működését ellenőrzi. A teszt sikeres lefutása azt igazolja, hogy az AddTodo metódus sikeresen kiszűrte és nem engedte tovább az adatkezelő réteg felé az egy, nem megfelelően megadott Todo objektumot.

---





