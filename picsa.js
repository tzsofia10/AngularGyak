// AngularJS modul létrehozása 'picsaApp' néven, nincs külső függősége (üres tömb)
angular.module('picsaApp', [])

// Controller létrehozása: 'picsController', amelyhez hozzáadjuk a $scope és $http szolgáltatásokat
.controller('picsController', function($scope, $http) {

  // autok tömb inicializálása, ide töltjük majd be az autókat az API-ból
  $scope.autok = []

  // Lekérdezi az összes járművet a megadott API-ról
  $scope.getjarmu = function(){
    $http.get("https://banktrade.api.teamorange.hu/jarmuvek").then(function(response){
      $scope.autok = response.data // az autók tömb feltöltése az API válaszával
    })
  }

  // Minden járműhöz modált generál, amit HTML-be szúr be
  $scope.initmodal = function(){
    for (const jarmu of $scope.autok) {
      let eredmeny = document.getElementById("jarmu-" + jarmu.id) // kiválasztja a megfelelő divet
      eredmeny.innerHTML = `

        <!-- Gomb, ami megnyitja a modált -->
        <button type="button" class="btn btn-primary" data-bs-toggle="modal" data-bs-target="#exampleModal${jarmu.id}">
          Launch demo modal
        </button>

        <!-- Bootstrap modal sablon, egyedi azonosítóval -->
        <div class="modal fade" id="exampleModal${jarmu.id}" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
          <div class="modal-dialog">
            <div class="modal-content">
              <div class="modal-header">
                <h1 class="modal-title fs-5" id="exampleModalLabel${jarmu.id}">Modal title</h1>
                <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
              </div>
              <div class="modal-body">
                ...
              </div>
              <div class="modal-footer">
                <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Close</button>
                <button type="button" class="btn btn-primary">Save changes</button>
              </div>
            </div>
          </div>
        </div>`
    }
  }

  // Törli a megadott id-jű járművet az API-ból
  $scope.deletejarmu = function(id){
    $http.delete("https://banktrade.api.teamorange.hu/jarmuvek/" + id).then(function(){
      $scope.getjarmu() // újratölti a járművek listáját
    })
  }

  // Alkalmazás indulásakor betölti az autókat
  $scope.getjarmu()

  // Új jármű hozzáadása az API-hoz
  $scope.addjarmu = function(){
    // Átalakítja a dátumot a megfelelő formátumba
    let datum = new Date(Date.parse($scope.jarmu.muszaki_ervenyesseg))
    
    // POST kérés elküldése az API-nak
    $http.post("https://banktrade.api.teamorange.hu/jarmuvek", {
      "rendszam": $scope.jarmu.rendszam,
      "tipus": $scope.jarmu.tipus,
      "modell": $scope.jarmu.modell,
      // Új dátum objektum, hogy fix 2:00-kor legyen az idő
      "muszaki_ervenyesseg": new Date(datum.getFullYear(), datum.getMonth(), datum.getDay(), 2, 0, 0, 0)
    }).then(function(){
      $scope.getjarmu() // újratöltés a listához
    })
  }

  // Meglévő jármű módosítása PUT-tal
  $scope.putjarmu = function(id){
    let datum = new Date(Date.parse($scope.jarmu.muszaki_ervenyesseg))
    
    $http.put("https://banktrade.api.teamorange.hu/jarmuvek" + id, {
      "rendszam": $scope.jarmu.rendszam,
      "tipus": $scope.jarmu.tipus,
      "modell": $scope.jarmu.modell,
      "muszaki_ervenyesseg": new Date(datum.getFullYear(), datum.getMonth(), datum.getDay(), 2, 0, 0, 0)
    }).then(function(){
      $scope.getjarmu() // újratöltés friss adatokkal
    })
  }

});
