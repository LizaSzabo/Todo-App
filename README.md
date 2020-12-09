# Todo-App
React frontend and  ASP.NET Core backend App

## Az alkalmazás rövid bemutatása
Az alkalmazás teendők (todo-k) kezelésére alkalmas. Az alkalmazás által tárolt teendőkkel a következő műveleteket végezheti a felhasználó:
- hozzáad a listához egy új teendőt
- töröl teendőt, akár az összeset egyszerre
- egy meglévő teendőt módosít
- a teendők között prioritást határoz meg a prioritás attribútum értékének megadásával az egyes elemek esetén
- összesített listaként vagy státus szerint csoportosítva tekintheti meg és kezelheti a tárolt datokat.

## Az alkalmazás beüzemeltetése
A todoapp.sln projekt file megnyitása és elindítása Visual Studio fejlesztőkörnyezetben lehetséges. A projekt futtatásához szükséges az *ASP .NET and web development* csomag telepítése Visual Studioban.
A perzisztens adattárolás érdekében adatbázis létrehozása is szükséges. Szintén a Visual Studio fejlesztőkörnyezeten belül létrehozandó egy új adatbázis, *Todos* néven. Ez az SQL Server Object Explorer nézetben lehetséges, a (localdb)\MSSQLLocalDB Database mappájához hozzáadva. A *Todos* adatbázishoz továbbá létre kell hozni a *Todo* táblázatot, amelynek létrehozási script-je ....
Az alkalmazás elindítható az F5-ös billentyű lenyomásával, majd ezt követően a megnyílt weboldalon elérhető a felhasználói felület.
## Az alkalmazás architektúrája
Az alkalmazás többrétegű architektúra mintájára lett valósítva. 
A weboldalon a felhasználó által végzett módosításokat a frontent kezeli első sorban. A felhasználó műveleteinek adatait ezután az üzleti réteg is kezeli, további validáció ellenőrzést biztosítva. Az adatelérési réteg felel az adatok be és kiírásáért az adatbázisba.
Az adatbázis szerepe a felhasználó által rögzített adatok perzisztens tárolása.
Az architektúrához továbbá tartozik egy, az üzleti réteg metódusait tesztelő tesztelési réteg.
### DAL

### Business Layer

### Frontend

### Tesztelés
A UnitTest mappában található TodoManager.cs osztály tartalmaza a megvalósított teszt kódját. 
A TestAddTodoWithNullStatus teszt metódus az üzleti rétegbeli AddTodo metódus helyes működését ellenőrzi. A teszt sikeres lefutása azt igazolja, hogy az AddTodo metódus sikeresen kiszűrte és nem engedte tovább az adatkezelő réteg felé az egy, nem megfelelően megadott Todo objektumot.





