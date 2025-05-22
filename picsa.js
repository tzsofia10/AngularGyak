angular.module('picsaApp', [])
  .controller('picsController', function($scope, $http) {
    $scope.autok = []
   

    $scope.getjarmu = function(){
        $http.get("https://banktrade.api.teamorange.hu/jarmuvek").then(function(response){
            $scope.autok = response.data
            
        })
            
        
    }
    $scope.initmodal = function(){
        for (const jarmu of $scope.autok) {
            let eredmeny = document.getElementById("jarmu-" + jarmu.id)
            eredmeny.innerHTML = `
                           
            <button type="button" class="btn btn-primary" data-bs-toggle="modal" data-bs-target="#exampleModal${jarmu.id}">
            Launch demo modal
            </button>

            <!-- Modal -->
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
    $scope.deletejarmu = function(id){
        $http.delete("https://banktrade.api.teamorange.hu/jarmuvek/"+ id).then(function(){
            $scope.getjarmu()
        })
    }
    $scope.getjarmu()
    $scope.addjarmu = function(){
        let datum = new Date(Date.parse($scope.jarmu.muszaki_ervenyesseg))
        $http.post("https://banktrade.api.teamorange.hu/jarmuvek", {
            "rendszam": $scope.jarmu.rendszam,
            "tipus": $scope.jarmu.tipus,
            "modell": $scope.jarmu.modell,
            "muszaki_ervenyesseg": new Date(datum.getFullYear(), datum.getMonth(), datum.getDay(), 2, 0, 0, 0)
          }).then(function(){
            $scope.getjarmu()
          })
    }
   $scope.putjarmu = function(id){
    let datum = new Date(Date.parse($scope.jarmu.muszaki_ervenyesseg))
        $http.put("https://banktrade.api.teamorange.hu/jarmuvek" + id, {
            "rendszam": $scope.jarmu.rendszam,
            "tipus": $scope.jarmu.tipus,
            "modell": $scope.jarmu.modell,
            "muszaki_ervenyesseg": new Date(datum.getFullYear(), datum.getMonth(), datum.getDay(), 2, 0, 0, 0)
          }).then(function(){
            $scope.getjarmu()
          })
   } 
  });