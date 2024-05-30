<?php
    class Branch {
        public function __construct()
        {
            add_action('rest_api_init', [$this, 'createBranchRoute']);
        }
        function createBranchRoute(){
            register_rest_route('v1', '/getBranches', [
                'methods' => 'GET',
                'callback' => [$this, 'getBranch'],
                'permission_callback' => [$this, 'getPermission']
            ]);
            register_rest_route('v1', '/getRestaurantInfoByBranchId/(?P<id>\d+)', [
                'methods' => 'GET',
                'callback' => [$this, 'getRestaurantInfoByBranchId'],
                'permission_callback' => [$this, 'getPermission'],
                'args' => [
                    'id' => [
                        'validate_callback' => function ($param, $request, $key) {
                            return is_numeric($param);
                        }
                    ]
                ]
            ]);
            register_rest_route('v1', '/saveBranches', [
                'methods' => 'POST',
                'callback' => [$this, 'saveBranch'],
                'permission_callback' => [$this, 'savePermission']
            ]);
            register_rest_route('v1', '/deleteBranch', [
                'methods' => 'DELETE',
                'callback' => [$this, 'deleteBranch'],
                'permission_callback' => [$this, 'deletePermission']
            ]); 
            register_rest_route('v1', '/updateRestaurantInfo', [
                'methods' => 'POST',
                'callback' => [$this, 'updateRestaurantInfo'],
                'permission_callback' => [$this, 'updatePermission']
            ]);     
        }
        public function getPermission()
        {
            return true;
        }
        public function savePermission()
        {
            return true;
        }
        public function deletePermission()
        {
            return true;
        }
        public function updatePermission()
        {
            return true;
        }
        public function getBranch(){
            global $wpdb;
            $branches = $wpdb->get_results("SELECT * FROM branches");
            $response = [
                'branches' => $branches
            ];

            return rest_ensure_response($response);
        }
        public function getRestaurantInfoByBranchId($req){
            $id = $req["id"];
            global $wpdb;
            $branches = $wpdb->get_results("SELECT * FROM branches where id= $id");
            $response = [
                'branch' => $branches 
            ];

            return rest_ensure_response($response);
        }
      
        public function saveBranch()
        {
            try {
                $data = json_decode(file_get_contents("php://input"), true);
                $branchName = $data["branchName"];
                $currencyUnit = $data["currencyUnit"];
                $language = $data["language"];
             
              
                
                global $wpdb;
                $result = $wpdb->insert(
                    'branches',
                    array(
                        'BranchName' => $branchName,
                        'CurrencyUnit' => $currencyUnit,
                        'Language' => $language,
                        'Address' => "test",
                        'Country' => "test",
                        'City' => "test",
                        'District' => "test",
                        'Telephone' => "test",
                        'Email' => "test"

                    )
                );
             
                
                return rest_ensure_response($result);
            } catch (\Throwable $th) {
                return rest_ensure_response(array("error" => $th->getMessage()), 500);
            }
        }
        public function updateRestaurantInfo(){
            try {
                $data = json_decode(file_get_contents("php://input"), true);
                $branchName = $data["branchName"];
                $address = $data["address"];
                $country = $data["country"];
                $city = $data["city"];
                $district = $data["district"];
                $telephone = $data["telephone"];
                $email = $data["email"];
                $Id = $data["id"];
                
                global $wpdb;
                $result = $wpdb->update(
                    'branches',
                    array(
                        'BranchName' => $branchName,
                        'Address' => $address,
                        'Country' => $country,
                        'City' => $city,
                        'District' => $district,
                        'Telephone' => $telephone,
                        'Email'=> $email
                    ),
                    array('id' => $Id),
                );
                return rest_ensure_response($result);
            }catch (\Throwable $th) {
                return rest_ensure_response(array("error" => $th->getMessage()), 500);
            }
        }

        public function deleteBranch(){
            try {
                $data = json_decode(file_get_contents("php://input"), true);
                $id = $data['id'];
                global $wpdb;
                 $result =  $wpdb->delete(
                   "branches",
                    array('id'=>$id)
                );
               return rest_ensure_response("deleted");
            } catch (\Throwable $th) {
                return rest_ensure_response(array("error" => $th->getMessage()), 500);
            }
            
        }
    }
new Branch();